---
title: "The Aggregated B-Tree: Implementing Native Prefix-Aggregate Indexes in PostgreSQL"
subtitle: "A design for monoidal subtree aggregates in an append-mostly, partition-isolated Index AM"
slug: aggregated-b-tree-postgresql-extended
type: technical
mode: expository
numbering: decimal
ledger: optional
math: true
code: [c, sql]
topics: [postgresql, b-tree, index-access-method, mvcc, write-ahead-log, aggregation]
lifecycle: revised
date_created: 2025-01-01
date_updated: 2025-01-01
---

# The Aggregated B-Tree: Implementing Native Prefix-Aggregate Indexes in PostgreSQL

*A design for monoidal subtree aggregates in an append-mostly, partition-isolated Index AM*

> Reader note: Claim status is marked inline in [brackets]. A claim ledger is at the end.

## Introduction

Relational database engines have long operated under a foundational partition: indexes are locator mechanisms, while execution engines are computation mechanisms. In a standard B-tree index, internal pages exist only to route traversal to leaf pages, and leaf tuples store row pointers (`ItemPointerData`, or `TID`) alongside index keys [@pgdg2025b]. [fact:C1]

When an analytical query requests a running total, a cumulative distribution, or a time-bounded range aggregate (for example, `SUM(amount) OVER (PARTITION BY account_id ORDER BY tx_time)` or `SELECT SUM(val) WHERE ts BETWEEN t1 AND t2`), the database must do one of three things:

1. Scan all matching leaf pages or heap tuples sequentially, incurring an $O(K)$ runtime, where $K$ is the number of rows in the range.
2. Rely on coarse-grained block summaries (for example, BRIN), which degrade when fine-grained boundaries or high churn are present.
3. Force developers to maintain materialized views, summary tables, or external streaming pipelines, with substantial operational overhead, write amplification, and row-level locking bottlenecks.

This divide is historical, not algorithmic, because a B-tree is topologically an augmented interval tree. [interpretation:C2]

By embedding monoidal partial aggregates into internal B-tree pages and intra-page headers, an index can compute range aggregates and cumulative distributions in $O(\log N)$ time directly inside the access method layer, provided the aggregates it consults are known to be visible to the querying snapshot (§3.2). [derived:C3]

Retrofitting subtree aggregation into a production engine like PostgreSQL presents deep structural challenges. Standard B-trees achieve high throughput through top-down concurrency (Lehman-Yao) and decoupled physical tuple storage. A naive implementation of subtree aggregates risks severe lock contention, write amplification, and multiversion concurrency control (MVCC) violations.

This document specifies the architectural, algorithmic, and systems design for the **Aggregated B-Tree** (`abtree`), implemented as a PostgreSQL extension and Index Access Method (Index AM) and engineered for append-mostly, partition-isolated workloads. It is a design proposal: the code is illustrative and no benchmark results are reported. The Limits section lists what is unverified.

---

## 1. Mathematical and Algorithmic Foundations

### 1.1 Monoidal Properties and Aggregation Algebra

An aggregated index requires that the target aggregation function forms a **monoid** $(\mathcal{S}, \oplus, e)$, a set $\mathcal{S}$ with a binary operation $\oplus$ and an identity element $e$ satisfying:

- **Closure**: For all $a, b \in \mathcal{S}$, $a \oplus b \in \mathcal{S}$.
- **Associativity**: $(a \oplus b) \oplus c = a \oplus (b \oplus c)$.
- **Identity element ($e$)**: $a \oplus e = e \oplus a = a$.

Standard relational aggregates map directly to monoids:

- **`COUNT`**: $(\mathbb{N}_0, +, 0)$
- **`SUM`**: $(\mathbb{Z}, +, 0)$ or discrete scaled decimals
- **`MIN` and `MAX`**: $(\mathbb{R} \cup \{\infty\}, \min, \infty)$ and $(\mathbb{R} \cup \{-\infty\}, \max, -\infty)$
- **`BIT_AND` and `BIT_OR`**: $(\mathbb{B}^w, \&, \mathbf{1}^w)$ and $(\mathbb{B}^w, \lor, \mathbf{0}^w)$

If the monoid also supports an **inverse** operation $\ominus$, forming an Abelian group (such as $(\mathbb{Z}, +, 0)$ with subtraction), a range aggregate follows from two prefix aggregates:

$$\operatorname{RangeAgg}(t_1, t_2) = \operatorname{PrefixAgg}(t_2) \ominus \operatorname{PrefixAgg}(t_1^-)$$

Here $t_1^-$ denotes the position immediately before $t_1$. In plain terms, the aggregate over a range is the prefix aggregate up to the upper bound minus the prefix aggregate just below the lower bound. [derived:C4]

For non-invertible monoids such as `MIN` and `MAX`, a range query is evaluated by a **canonical segment tree decomposition** over the B-tree pages in $O(\log N)$ time. On each of the two boundary paths, every non-leaf level contributes at most $B - 1$ whole sibling subtrees, so the query combines at most $2 \cdot (h - 1) \cdot (B - 1)$ sub-aggregates, where $h$ is the tree height and $B$ is the page fan-out. [derived:C5]

### 1.2 Numerical Representation Hazards

In production systems, algebraic requirements intersect with physical data types. Financial architects mandate exact calculations, but IEEE-754 floating-point addition (`float4`, `float8`) is not associative in general, because rounding and cancellation make the result depend on grouping [@goldberg1991]. [fact:C6]

$$(a + b) + c \neq a + (b + c)$$

Evaluating floating-point aggregates across differing internal node partitionings can therefore produce different results for identical ranges. [derived]

PostgreSQL's native `NUMERIC` type provides arbitrary precision, but it is a variable-length (`varlena`) type. If in-place aggregation grew a numeric accumulator in byte length, the tuple would have to be relocated or line pointers shifted, which could trigger unwanted internal page splits during routine leaf inserts, reduce fan-out, and induce cascade splits. [hypothesis:C7]

Consequently, `abtree` restricts internal aggregation monoids to fixed-width, memory-aligned types. [definition:C8]

1. Native machine integers: `int4`, `int8`.
2. Fixed-point scaled decimals: specialized inline `int128` types, representing currency as fixed micro-units or cents.

With this restriction, aggregate updates never change the byte footprint of internal routing tuples. [derived]

### 1.3 Tree Invariants and Lehman-Yao Concurrency

Standard PostgreSQL B-trees implement the **Lehman-Yao** algorithm (`nbtree`), which adds high keys and right-link pointers to internal and leaf pages, so concurrent readers can detect a concurrent split without holding locks on parent pages during traversal [@lehman1981], [@pgdg2025b]. [fact:C9]

In an `abtree`, two structural invariants govern aggregation.

**The Conservation Invariant.** For any internal downlink tuple $D_i$ pointing to a child page $C_i$ that holds $n_i$ items:

$$\operatorname{Agg}(D_i) = \bigoplus_{j=1}^{n_i} \operatorname{Agg}(T_{C_i, j})$$

Here $T_{C_i, j}$ is the $j$-th tuple of page $C_i$. If $C_i$ is an internal page, $\operatorname{Agg}(T_{C_i, j})$ is that tuple's downlink aggregate; if $C_i$ is a leaf page, it is the payload attribute value. In words, a downlink's aggregate equals the combination of everything directly beneath it. [definition:C10]

**The Split Invariant.** When page $C$ splits into $C_{\text{left}}$ and $C_{\text{right}}$, the combined aggregate is preserved:

$$\operatorname{Agg}(C) = \operatorname{Agg}(C_{\text{left}}) \oplus \operatorname{Agg}(C_{\text{right}})$$

This follows from the conservation invariant and associativity. [derived]

Under Lehman-Yao concurrency, an internal downlink aggregate reflects the state of the subtree rooted at the target child plus any unlinked right siblings created by splits that have not yet been posted to the parent.

---

## 2. PostgreSQL Storage Layer Representation

### 2.1 Disk Page Layout and Fixed-Width Tuples

PostgreSQL divides storage into fixed-size pages, 8 KB by default. A standard `PageHeaderData` is followed by line pointers (`ItemIdData`) that grow forward, while tuple data grows backward from the end of the page [@pgdg2025c]. [fact:C11]

The `abtree` layout adds a prefix aggregate array and a special space at the end of the page:

~~~text
+--------------------------------------------------------------------+
|                         PageHeaderData                             |
+--------------------------------------------------------------------+
|  ItemIdData[0]     |  ItemIdData[1]     |  ...                     |
+--------------------+--------------------+--------------------------+
|                    <---- FREE SPACE ---->                          |
+--------------------------------------------------------------------+
|  ...               |  ABTreeLeafTuple 1 |  ABTreeLeafTuple 0       |
+--------------------+--------------------+--------------------------+
|  ABTreePagePrefixArray (Fast intra-page binary/Fenwick search)     |
+--------------------------------------------------------------------+
|                ABTreePageOpaqueData (special space)                |
+--------------------------------------------------------------------+
~~~

### 2.2 Special Space Metadata

The special space at the end of each index page stores index-specific metadata. The following C declaration fragment is a sketch, not a complete compilable unit.

<!-- @code runnable=false lang=c -->
```c
typedef struct ABTreePageOpaqueData
{
    BlockNumber abto_next;      /* right-link Lehman-Yao pointer */
    BlockNumber abto_prev;      /* left-link pointer for backward scans */
    uint32      abto_level;     /* 0 = leaf, >0 = internal */
    uint16      abto_flags;     /* AB_LEAF, AB_INTERNAL, AB_ROOT, AB_DELETED */
    uint16      abto_cycleid;   /* split tracking for vacuum */
    
    /* Page-level total aggregate across all items currently in this page */
    int64       abto_page_agg;  /* fixed-width aligned scalar */
    bool        abto_agg_isnull;
} ABTreePageOpaqueData;

typedef ABTreePageOpaqueData *ABTreePageOpaque;
```

### 2.3 Leaf Tuple Layout

Leaf tuples contain search keys, the heap `ItemPointerData` (`TID`), and the aggregation payload value. The following C declaration is a sketch of the logical layout, not the exact on-disk encoding.

<!-- @code runnable=false lang=c -->
```c
typedef struct ABTreeLeafTupleData
{
    ItemPointerData t_tid;      /* heap TID (block, offset) */
    uint16          t_info;     /* size, null flags */
    Datum           keys[INDEX_MAX_KEYS]; /* search keys (e.g., account_id, tx_time) */
    int64           agg_payload;          /* fixed-width 64-bit payload */
} ABTreeLeafTupleData;
```

### 2.4 Internal Downlink Tuple Layout

Internal tuples route traversal to child blocks. In addition to routing keys and child pointers, they store the fixed-width aggregate of the child subtree and an explicit visibility state flag. The following C declaration is a sketch of the logical layout.

<!-- @code runnable=false lang=c -->
```c
#define ABTREE_DOWNLINK_CLEAN  0x0001
#define ABTREE_DOWNLINK_DIRTY  0x0002

typedef struct ABTreeInternalTupleData
{
    ItemPointerData t_tid;          /* block = child BlockNumber, offset = 0 */
    uint16          t_info;         /* tuple size, null flags */
    uint16          downlink_flags; /* ABTREE_DOWNLINK_CLEAN or DIRTY */
    int64           subtree_count;  /* row count in child tree */
    int64           subtree_agg;    /* fixed-width aggregate of child tree */
    Datum           keys[INDEX_MAX_KEYS]; /* routing high key */
} ABTreeInternalTupleData;
```

### 2.5 Intra-Page Fast Prefix Evaluation

While internal pages store subtree aggregates, evaluating a prefix sum inside a leaf page by walking line pointers sequentially costs $O(K)$ CPU operations. A leaf page holds roughly 200 to 400 tuples. [estimate:C12]

To reduce this overhead:

1. When leaf pages are compacted or frozen, a compact **prefix aggregate array** is maintained in the contiguous page payload region.
2. For dynamic leaf pages, an implicit in-page Fenwick structure over the `agg_payload` entries [@fenwick1994] should give $O(\log K)$ page-internal prefix summation, with SIMD-vectorized addition (`_mm256_add_epi64`) over aligned 8-byte integers. [hypothesis:C13]

---

## 3. Transaction Isolation, MVCC, and Visibility

The fundamental architectural challenge of embedding pre-computed aggregates into internal index pages is PostgreSQL's MVCC. Heap tuples store transactional headers (`xmin`, `xmax`, and visibility flags); index tuples do not [@pgdg2025c]. [fact:C14]

### 3.1 The Subtree Visibility Fallacy

In early conceptual models of aggregated indexes, it was proposed that a subtree could be evaluated in $O(1)$ by consulting the relation's **Visibility Map** (VM) to check whether all tuples in the subtree are visible. The proposal fails because PostgreSQL indexes store keys and do not control physical heap organization [@pgdg2025h]. [fact]

- Internal downlink tuples contain routing keys and index block pointers, not heap block ranges.
- A single internal page spanning a narrow key range (for example, `account_id = 428901`) may point to leaf tuples whose heap tuples are scattered across tens of thousands of unclustered heap blocks.
- Checking the VM to decide whether an entire subtree is all-visible therefore cannot be done in $O(1)$ without descending to collect all leaf `TID`s, which degrades the query to $O(K)$ and removes the proposed benefit. [derived:C15]

The following diagram shows the scattering problem.

~~~text
       [ Internal Node: Routing Key Range 1000 - 2000 ]
                     /                   \
        [ Leaf Block 101 ]            [ Leaf Block 102 ]
         |       |      |              |       |      |
       TID 1   TID 2  TID 3          TID 4   TID 5  TID 6
         |       |      |              |       |      |
         v       v      v              v       v      v
     [Heap 1] [Heap 89] [Heap 412] [Heap 3] [Heap 999] [Heap 12]
         \------------------------------------------------/
          Scattered physical distribution: verifying VM requires
          checking every individual heap block (O(K) degradation)
~~~

Internal pages cannot safely verify heap page visibility directly.

### 3.2 The Synchronous CLEAN / DIRTY Epoch Architecture

To resolve the fallacy without violating MVCC correctness, `abtree` replaces VM scanning with an explicit **Synchronous CLEAN / DIRTY Epoch Protocol**:

~~~text
                      Internal Node Downlink
                      +--------------------+
                      | Routing High Key   |
                      | Child BlockNumber  |
                      | Fixed-Width Monoid |
                      | Status Flag        |
                      +--------------------+
                                |
                +---------------+---------------+
                |                               |
       [DIRTY Flag Set]                [CLEAN Flag Set]
                |                               |
                v                               v
      Descend to Leaf Level           Instant O(1) Short-Circuit
     (Evaluate leaf tuples via        (Directly accumulate internal
      standard MVCC snapshot)          monoid; bypass child pages)
~~~

1. **Downlink status state machine.** Every internal downlink carries a flag, `CLEAN` or `DIRTY`. Any modification to a leaf page (insert, split, update) marks the ancestor downlink path `DIRTY`. When an analytical query meets a `DIRTY` downlink, it cannot trust the subtree aggregate for snapshot isolation, so it falls back to leaf traversal and verifies visibility at the leaf or heap level using the active snapshot.
2. **Transition to CLEAN via freezing.** A downlink moves from `DIRTY` to `CLEAN` only when a maintenance operation (such as `VACUUM FREEZE` or partition freezing) verifies that all heap tuples referenced by the descendant leaf pages are `ALL_FROZEN`. Once a subtree is frozen, its records are visible to all current and future transactions, so its downlink is marked `CLEAN` and the $O(1)$ accumulation path stays available until the next write touches that subtree. Under the append-only invariant of §3.3, a `CLEAN` downlink never exposes an uncommitted or invisible row, and no deferred aggregation state is needed. [derived:C16]

### 3.3 Target Operational Profile: Append-Only Partitioning

Because in-place updates and deletions mark downlinks `DIRTY` and bypass Heap-Only Tuple (HOT) optimizations, `abtree` enforces a strict append-only invariant. [definition:C17]

- In-place updates and row deletions on aggregated columns are prohibited.
- `abtree` is deployed alongside declarative table partitioning (for example, by day or month).
- Active, writable partitions keep a shallow tree ($h \le 3$), bounding the cost of leaf fallback and local delta maintenance.
- Closed historical partitions undergo `VACUUM FREEZE`, which makes all internal downlinks `CLEAN`. Queries spanning millions of historical rows then evaluate in $O(\log N)$ time, bypassing millions of index and heap reads. [derived]

A tree of height three with 200 to 400 entries per page holds roughly $8 \times 10^6$ to $6 \times 10^7$ tuples, so a daily or monthly partition can plausibly stay within that bound. [estimate:C18]

---

## 4. Concurrency Control and Write Propagation

Standard B-trees scale under concurrent writes because an insert modifies only a single leaf page, and parent pages change only during page splits [@pgdg2025b]. [fact:C19]

In an aggregated B-tree, inserting a value $v$ into a leaf conceptually requires updating the aggregates along the ancestor spine up to the root. [derived]

### 4.1 Pitfalls of Naive Propagation

Two naive approaches fail under production conditions.

1. **Synchronous bottom-up locking.** Pushing deltas synchronously from leaf to root inverts the Lehman-Yao top-down lock ordering. A writer holding an exclusive lock on a leaf while locking parent buffers can meet top-down readers and split operations, which creates classic ABBA buffer deadlocks. [interpretation:C20] Shared parent and root buffers also become write-synchronization bottlenecks, with `LWLock` buffer latch contention and cache-line bouncing. [interpretation]
2. **Deferred aggregation queues (DAQ).** Offloading updates to an asynchronous shared-memory ring buffer processed by background workers fails to preserve ACID guarantees, because the deltas of a committed transaction must be visible to subsequent `READ COMMITTED` transactions. [interpretation:C21] Asynchronous aggregation leaves internal pages stale, so queries either return incorrect aggregates or need complex shared-memory snapshot reconciliation. Under sustained write bursts the queue can back up, causing unbounded memory use, latency spikes, and longer crash recovery. [hypothesis]

### 4.2 Micro-Epoch Local Batching and Top-Down Flagging

To avoid these failure modes, `abtree` decouples propagation using **micro-epoch batched delta bubbling** combined with **safe top-down DIRTY marking**:

~~~text
      (Insert tuple + value v)
                  |
                  v
       1. Top-Down Descent:
          Mark ancestor downlinks DIRTY (latch-coupled, no lock inversion)
                  |
                  v
       2. Leaf Modification:
          Insert tuple into Leaf L; update abto_page_agg in-place.
                  |
                  v
       3. Buffer Unpin & Batching:
          Backend accumulates delta locally in private memory.
          Deltas merged into parent nodes during buffer unpinning
          or amortized across micro-batches, preventing shared-root thrashing.
~~~

1. **Top-down descent with DIRTY flagging.** During the normal top-down descent to the target leaf, the inserting backend checks whether an ancestor downlink is marked `CLEAN`. If so, it marks the downlink `DIRTY` as part of the descent latch sequence. Because descent follows strict top-down ordering, no lock inversions occur, which eliminates ABBA deadlocks. [hypothesis:C22]
2. **Local accumulation and batched bubbling.** Writers accumulate leaf-level modifications in backend-private memory across the transaction or micro-batch. When a buffer is unpinned or during leaf split propagation, deltas are pushed upward to the immediate parent using conditional buffer acquisitions (`ConditionalLockBuffer`). If the parent buffer cannot be latched without waiting, the update is deferred to the end of the query operation within the same backend, so no uncommitted or stale state is left behind at transaction commit.

### 4.3 Handling Concurrent Page Splits

Under Lehman-Yao concurrency, a page split allocates a right-sibling page, moves half the items, links the sibling via `abto_next`, and posts the new downlink to the parent. In an `abtree`, split correctness rests on strict algebraic partitioning:

1. **Allocate the right page.** Acquire exclusive buffer locks on the left page $L$ and the new right page $R$.
2. **Partition aggregates.** Split the $M$ tuples at position $k$, and set `abto_page_agg` of $L$ and of $R$ to the aggregates in the first equation below.
3. **Set right-link and high key.** Link $L \to R$. A concurrent reader that reaches $L$ before the parent receives the downlink for $R$ follows the right link and recovers the split aggregate without missing tuples.
4. **Post the parent downlink.** Insert the downlink for $R$ into the parent with value $\operatorname{Agg}(R)$, and subtract $\operatorname{Agg}(R)$ from $L$'s existing downlink in the parent. This uses the inverse operation, so it applies to invertible monoids such as `SUM` and `COUNT`; for `MIN` and `MAX`, $L$'s downlink is recomputed from its new page aggregate instead.

The aggregates after the split are:

$$\operatorname{Agg}(L_{\text{new}}) = \bigoplus_{i=1}^{k} \operatorname{Val}(T_i), \quad \operatorname{Agg}(R) = \bigoplus_{i=k+1}^{M} \operatorname{Val}(T_i)$$

The net change at the parent level is zero:

$$\Delta_{\text{parent}} = (\operatorname{Agg}(L_{\text{old}}) - \operatorname{Agg}(R)) + \operatorname{Agg}(R) - \operatorname{Agg}(L_{\text{old}}) = 0$$

In plain terms, concurrent readers passing through the parent see an unchanged aggregate throughout the split sequence. [derived:C23]

---

## 5. Crash Recovery and Generic WAL Logging

Crash safety and physical replication compatibility require that all index modifications conform to PostgreSQL's Write-Ahead Logging (WAL) subsystem.

### 5.1 Rejection of Custom Rmgr in Favor of Generic WAL

PostgreSQL provides `RegisterCustomRmgr()` so extensions can define custom WAL formats [@pgdg2025g]. Deploying a custom resource manager in production carries two risks:

- If an extension that registered a custom resource manager is missing or fails to load during crash recovery, PostgreSQL cannot replay the records and recovery fails. [fact:C24]
- Standby replicas need identical extension binaries loaded through `shared_preload_libraries` before replaying WAL, which complicates rolling upgrades.

To provide out-of-the-box durability and streaming replication support, `abtree` uses the **Generic WAL** interface (`access/generic_xlog.h`), whose records core PostgreSQL replays without extension code [@pgdg2025a]. [fact:C25]

The following C function is a sketch of logging an internal-node aggregate delta and a `DIRTY` transition through Generic WAL. It is not compilable as is, and it assumes the caller already holds an exclusive lock on the buffer.

<!-- @code runnable=false lang=c -->
```c
#include "access/generic_xlog.h"

/*
 * Log an internal node aggregate delta and DIRTY transition using Generic WAL
 */
void
abtree_log_internal_update(Relation rel, Buffer buf, OffsetNumber offnum, 
                           int64 delta_val, uint16 new_flags)
{
    GenericXLogState *state;
    Page page;
    ItemId itemid;
    ABTreeInternalTuple itup;

    state = GenericXLogStart(rel);
    page = GenericXLogRegisterBuffer(state, buf, 0);

    itemid = PageGetItemId(page, offnum);
    itup = (ABTreeInternalTuple) PageGetItem(page, itemid);

    /* Apply fixed-width monoid addition */
    itup->subtree_agg += delta_val;
    itup->downlink_flags = new_flags;

    GenericXLogFinish(state);
}
```

### 5.2 Mitigating Full Page Writes Amplification

When `full_page_writes` is on, the first modification to any page after a checkpoint emits a full page image (8 KB) to WAL [@pgdg2025e]. [fact:C26]

In standard `nbtree`, internal pages are modified rarely (only on splits), which keeps full page image emission minimal. [fact] An access method that modifies internal pages on every insert would make each checkpoint trigger a cascade of 8 KB images across all tree levels, which could raise WAL volume by $3\times$ to $8\times$. [guess:C27]

`abtree` mitigates this amplification in three ways:

1. **Append-only leaf clustering.** In append-mostly workloads, inserts concentrate on the rightmost leaf page, so only the rightmost ancestor spine is touched and post-checkpoint full page images on that spine are limited to about $h$ pages. [derived]
2. **Micro-batch WAL consolidation.** Multiple delta applications within the same transaction or maintenance window are grouped into a single Generic WAL buffer registration.
3. **Partition isolation.** Confining active writes to small, unfrozen daily partitions keeps the active tree height shallow ($h \le 3$), which caps the worst-case image footprint.

---

## 6. Access Method Interface Implementation

PostgreSQL defines index extensions through the `IndexAmRoutine` interface [@pgdg2025i]. The following C fragment is a sketch of the entry-point registration for `pg_abtree`. It refers to `abtree_*` functions that are not defined here, so it is not compilable on its own.

<!-- @code runnable=false lang=c -->
```c
#include "postgres.h"
#include "access/genam.h"
#include "access/amapi.h"
#include "commands/vacuum.h"
#include "nodes/pathnodes.h"
#include "utils/guc.h"

/*
 * AM Handler: Entry point registered in pg_am
 */
PG_FUNCTION_INFO_V1(abtree_handler);

Datum
abtree_handler(PG_FUNCTION_ARGS)
{
    IndexAmRoutine *amroutine = makeNode(IndexAmRoutine);

    amroutine->amstrategies = 5;                  /* btree comparison strategies: <, <=, =, >=, > */
    amroutine->amsupport = 2;                     /* 1: compare, 2: monoid add */
    amroutine->amoptsprocnum = 0;
    amroutine->amcanorder = true;
    amroutine->amcanorderbyop = false;
    amroutine->amcanbackward = true;
    amroutine->amcanunique = false;
    amroutine->amcanmulticol = true;
    amroutine->amoptionalkey = true;
    amroutine->amsearcharray = true;
    amroutine->amsearchnulls = true;
    amroutine->amstorage = false;
    amroutine->amclusterable = true;
    amroutine->ampredlocks = true;
    amroutine->amcanparallel = true;
    amroutine->amcaninclude = true;
    amroutine->amusemaintenanceworkmem = false;
    amroutine->amparallelvacuumoptions = VACUUM_STRATEGY_PARALLEL_BULK;
    amroutine->amkeytype = InvalidOid;

    /* Interface Function Pointers */
    amroutine->ambuild = abtree_build;
    amroutine->ambuildempty = abtree_buildempty;
    amroutine->aminsert = abtree_insert;
    amroutine->ambulkdelete = abtree_bulkdelete;
    amroutine->amvacuumcleanup = abtree_vacuumcleanup;
    amroutine->amcanreturn = abtree_canreturn;
    amroutine->amcostestimate = abtree_costestimate;
    amroutine->amoptions = abtree_options;
    amroutine->amproperty = abtree_property;
    amroutine->ambuildphasename = abtree_buildphasename;
    amroutine->amvalidate = abtree_validate;
    amroutine->ambeginscan = abtree_beginscan;
    amroutine->amrescan = abtree_rescan;
    amroutine->amgettuple = abtree_gettuple;
    amroutine->amgetbitmap = abtree_getbitmap;
    amroutine->amendscan = abtree_endscan;
    amroutine->ammarkpos = NULL;
    amroutine->amrestrpos = NULL;
    amroutine->amestimateparallelscan = abtree_estimateparallelscan;
    amroutine->aminitparallelscan = abtree_initparallelscan;
    amroutine->amparallelrescan = abtree_parallelrescan;

    PG_RETURN_POINTER(amroutine);
}
```

### 6.1 Range Traversal with Subtree Aggregation

The query engine evaluates range-aggregate expressions through an augmented scan routine. When descending the tree, `abtree` inspects downlink flags and takes the fast path only for `CLEAN` downlinks. The following C function is a simplified sketch: it follows a single boundary path and omits right-link handling and the second boundary (see the Limits section).

<!-- @code runnable=false lang=c -->
```c
/*
 * High-performance descent: evaluates range aggregation with CLEAN fast-path
 */
bool
abtree_eval_range_aggregate(IndexScanDesc scan, 
                            Datum *result_aggregate, 
                            bool *result_isnull)
{
    ABTreeScanOpaque so = (ABTreeScanOpaque) scan->opaque;
    Relation rel = scan->indexRelation;
    Buffer buf;
    Page page;
    ABTreePageOpaque opaque;
    BlockNumber blkno = so->abto_root;
    int64 accumulator = 0;
    bool has_data = false;

    buf = ReadBuffer(rel, blkno);
    LockBuffer(buf, BUFFER_LOCK_SHARE);

    for (;;)
    {
        page = BufferGetPage(buf);
        opaque = (ABTreePageOpaque) PageGetSpecialPointer(page);

        if (opaque->abto_flags & AB_LEAF)
            break; /* Reached leaf level: scan remaining boundary items */

        OffsetNumber max_off = PageGetMaxOffsetNumber(page);

        for (OffsetNumber off = 1; off <= max_off; off = OffsetNumberNext(off))
        {
            ItemId iid = PageGetItemId(page, off);
            ABTreeInternalTuple itup = (ABTreeInternalTuple) PageGetItem(page, iid);

            int cmp_low = abtree_compare_key(rel, itup->keys, so->key_low);
            int cmp_high = abtree_compare_key(rel, itup->keys, so->key_high);

            /* Check if child subtree is strictly within [key_low, key_high] */
            if (cmp_low >= 0 && cmp_high <= 0)
            {
                /* Fast-Path: Only bypass child descent if downlink is CLEAN */
                if (itup->downlink_flags & ABTREE_DOWNLINK_CLEAN)
                {
                    accumulator += itup->subtree_agg;
                    has_data = true;
                    continue; /* Entire child subtree bypassed in O(1) */
                }
            }

            /* Boundary subtree or DIRTY downlink requires descent */
            if (cmp_low >= 0 && cmp_high > 0)
            {
                BlockNumber next_blk = ItemPointerGetBlockNumber(&itup->t_tid);
                UnlockReleaseBuffer(buf);
                buf = ReadBuffer(rel, next_blk);
                LockBuffer(buf, BUFFER_LOCK_SHARE);
                goto descend_next_level;
            }
        }

    descend_next_level:
        continue;
    }

    /* Fallback: scan leaf items with standard MVCC snapshot filtering */
    accumulator = abtree_scan_leaf_items(scan, buf, accumulator, &has_data);
    UnlockReleaseBuffer(buf);

    *result_aggregate = Int64GetDatum(accumulator);
    *result_isnull = !has_data;
    return has_data;
}
```

---

## 7. PostgreSQL Query Planner and Optimizer Integration

To execute aggregated scans, the optimizer must intercept compatible aggregation functions and replace sequential scan plans with index aggregate scans.

~~~text
                      +-------------------+
                      |   SQL Query AST   |
                      +-------------------+
                                |
                                v
                      +-------------------+
                      |  Standard Planner |
                      +-------------------+
                                |
       (Calls `create_upper_paths_hook` & `set_rel_pathlist_hook`)
                                |
                                v
                +-------------------------------+
                |   abtree Planner Interceptor   |
                |   Matches Aggref / WindowFunc |
                +-------------------------------+
                     /                     \
        Match Found /                       \ No Match
                   v                         v
     +---------------------------+     +-------------------+
     | Generate `CustomPath`     |     | Standard Plan     |
     | (Path Cost: O(log N))     |     | (SeqScan + Sort   |
     +---------------------------+     |  + Aggregation)   |
                   |                   +-------------------+
                   v
     +---------------------------+
     | Generate `CustomScan`     |
     | Plan Node (abtree Engine) |
     +---------------------------+
~~~

### 7.1 Hook Interception via the Upper Paths Hook

The extension hooks into `create_upper_paths_hook` to intercept the `UPPERREL_GROUP_AGG` stage (grouping and aggregation) and the `UPPERREL_WINDOW` stage (window functions). The following C function is a sketch: the helpers `abtree_find_matching_index` and `abtree_create_aggregate_path` are not defined, and the window-function path is not worked out.

<!-- @code runnable=false lang=c -->
```c
static create_upper_paths_hook_type prev_create_upper_paths_hook = NULL;

void
abtree_upper_paths_hook(PlannerInfo *root, 
                        UpperRelationKind stage, 
                        RelOptInfo *input_rel, 
                        RelOptInfo *output_rel, 
                        void *extra)
{
    if (prev_create_upper_paths_hook)
        prev_create_upper_paths_hook(root, stage, input_rel, output_rel, extra);

    if (stage != UPPERREL_GROUP_AGG && stage != UPPERREL_WINDOW)
        return;

    Query *parse = root->parse;
    ListCell *lc;

    foreach(lc, parse->targetList)
    {
        TargetEntry *tle = (TargetEntry *) lfirst(lc);
        if (IsA(tle->expr, Aggref))
        {
            Aggref *aggref = (Aggref *) tle->expr;
            IndexOptInfo *matching_index = abtree_find_matching_index(root, aggref);

            if (matching_index != NULL)
            {
                Path *agg_path = abtree_create_aggregate_path(root, matching_index, aggref, output_rel);
                add_path(output_rel, agg_path);
            }
        }
    }
}
```

### 7.2 Cost Model: Aggregated Scan vs. Table Scan

The standard optimizer cost for range aggregation is dominated by row retrieval, where $K$ is the number of matching tuples:

$$\text{Cost}_{\text{standard}} = \operatorname{RunCost}(\text{IndexScan}) + (K \cdot \text{cpu\_tuple\_cost}) + (K \cdot \text{cpu\_operator\_cost})$$

For `abtree`, the cost model accounts for the bounded $O(\log N)$ descent:

$$\text{Cost}_{\text{abtree}} = (2 \cdot h \cdot \text{random\_page\_cost}) + (2 \cdot h \cdot B \cdot \text{cpu\_operator\_cost}) + (K_{\text{boundary}} \cdot \text{cpu\_tuple\_cost})$$

Here $h$ is the tree height, $B$ is the page fan-out, and $K_{\text{boundary}}$ is the small set of boundary tuples on partially matched leaf pages. In plain terms, the standard cost grows with the number of matching rows, while the `abtree` cost grows with tree height and boundary size. For queries spanning millions of rows ($K \gg 10^6$) and mostly `CLEAN` downlinks, the cost reduction should exceed several orders of magnitude. [hypothesis:C28]

The timings in Table 1 are design targets, not measurements. [guess:C29]

Table 1: Design-target comparison of scan patterns.

| Scan Pattern / Metric | Standard B-Tree + GroupAggregate | Columnar Chunk Rollup | **Aggregated B-Tree (`abtree`)** |
| :--- | :--- | :--- | :--- |
| **Running Total ($10^7$ rows)** | $O(N)$ leaf/heap reads (~1.2 s) | $O(N/V)$ vector decode (~80 ms) | **$O(\log N)$ traversal (< 1 ms)** |
| **Point Prefix ($\le t$)** | $O(N)$ scan + sum | Scan matching chunk vectors | **$O(\log N)$ binary descent** |
| **Write Latency (Per Tuple)** | Minimal (~1-2 I/O writes) | Batched / MergeTree rewrites | **Single leaf write + batch delta** |
| **MVCC Transaction Isolation** | Exact tuple-level isolation | Block-level version isolation | **CLEAN flag + leaf fallback** |
| **Storage Overhead** | Keys + TIDs | Chunk metadata + dictionaries | **Fixed-width 64/128-bit monoids** |

---

## 8. DDL and User-Facing Interface

The extension presents a SQL interface integrated with PostgreSQL's operator class infrastructure. The following SQL is a sketch of the intended interface. It is not runnable, because the `abtree` access method does not exist yet.

<!-- @code runnable=false lang=sql -->
```sql
-- Create the access method extension
CREATE EXTENSION pg_abtree;

-- Define an append-mostly partitioned ledger
CREATE TABLE account_ledger (
    account_id  int8 NOT NULL,
    entry_time  timestamptz NOT NULL,
    amount      int8 NOT NULL -- stored in cents (fixed-width discrete integer)
) PARTITION BY RANGE (entry_time);

-- Create partition tables
CREATE TABLE account_ledger_2026_03 PARTITION OF account_ledger
    FOR VALUES FROM ('2026-03-01 00:00:00+00') TO ('2026-04-01 00:00:00+00');

-- Create the aggregated index on the partition
CREATE INDEX idx_ledger_balance 
ON account_ledger_2026_03 
USING abtree (account_id, entry_time)
INCLUDE (amount)
WITH (monoid_type = 'int8', monoid_operator = 'sum');

-- Freeze historical partition to mark all internal downlinks CLEAN
VACUUM FREEZE account_ledger_2026_03;

-- The following running total query executes as a pure O(log N) Custom Scan
EXPLAIN ANALYZE
SELECT SUM(amount)
FROM account_ledger
WHERE account_id = 428901
  AND entry_time <= '2026-03-30 00:00:00+00';
```

The following block is an illustrative sketch of the intended execution plan. It is not captured from a running system, and its row counts and timings are invented for illustration.

~~~text
                                      QUERY PLAN
--------------------------------------------------------------------------------------
 Custom Scan (ABTreeInstantAggregate) on account_ledger_2026_03 (cost=8.20..8.25 rows=1)
   Index: idx_ledger_balance
   Index Cond: ((account_id = 428901) AND (entry_time <= '2026-03-30 00:00:00+00'::timestamptz))
   Monoid Function: int8_accum (SUM)
   Subtree Fast-Path Hits: 412 blocks (3,296,000 rows bypassed via CLEAN internal nodes)
   Leaf Boundary Evaluated: 14 rows (DIRTY edge pages)
 Planning Time: 0.124 ms
 Execution Time: 0.418 ms
~~~

---

## 9. Comprehensive Trade-off Analysis and Failure Modes

### 9.1 Write Amplification vs. Summary Table Contention

A central question in deploying `abtree` is the write-path penalty relative to existing design patterns.

- **The OLTP view.** Updating internal pages on writes increases tree depth, reduces fan-out, and adds buffer latching steps during descent.
- **The analytical reality.** Production ledgers already pay a write penalty by maintaining trigger-based rollup tables, such as an `account_balance` summary row updated on every insert. Concurrent transactions that update the same row serialize on its row lock [@pgdg2025d]. [fact:C30]
- **The trade-off.** Replacing lock-bound summary tables with an append-only `abtree` index removes row-level serialization locks. Even with internal-page delta batching, total write contention on high-volume accounts should drop. [hypothesis:C31]

### 9.2 MVCC Visibility Churn and Recovery Profile

- **Degradation profile.** If an active partition has uncommitted transactions or heavy churn, internal downlinks are `DIRTY` and a scan falls back to leaf traversal with snapshot checks, so it does not return uncommitted data. [derived:C32] Its cost then approaches that of a conventional index-only scan ($O(K)$), plus the overhead of reduced fan-out. [hypothesis:C33]
- **RTO and durability.** Rejecting asynchronous queues and custom resource managers in favor of synchronous local batching and Generic WAL should keep the Recovery Time Objective (RTO) close to that of vanilla PostgreSQL. [hypothesis:C34] Standbys replay Generic WAL records without extension code, so they carry no risk of a missing-extension replay failure.

---

## Conclusion

The Aggregated B-Tree (`abtree`) combines the routing structure of the Lehman-Yao B-tree with the monoidal computation model of Fenwick and segment trees [@fenwick1994] inside PostgreSQL's native storage layer. It does so by enforcing fixed-width discrete monoids, replacing Visibility Map scans with an explicit CLEAN/DIRTY state machine, and limiting WAL overhead through append-only partitioning.

If the hypotheses tagged in this piece hold, analytical prefix aggregations and ledger rollups become $O(\log N)$ logarithmic index descents while PostgreSQL's relational and transactional invariants are preserved.

---

## Limits

This is a design, not an implementation, and none of the performance, WAL-volume, contention, or recovery claims has been measured. The timings in Table 1 and the plan in Section 8 are targets and illustrations. Several code sketches are simplified. The range descent in §6.1 follows one boundary path only and skips right-link handling. The tuple structs in §2.3 and §2.4 use `Datum keys[]` for readability, whereas an on-disk tuple would encode keys through PostgreSQL's index tuple machinery. The structs also carry `int64` payloads, while §1.2 allows `int128` monoids, so the layouts would need a wider payload field for those types.

The top-down `DIRTY` marking in §4.2 assumes that ancestor downlinks can be updated during descent without introducing lock-order inversions, and that assumption needs stress testing against real split and vacuum interleavings. The split posting in §4.3 relies on an invertible monoid, and non-invertible monoids need a recompute step that is only mentioned, not specified. Because every insert marks its ancestor path `DIRTY`, the `CLEAN` fast path helps mainly frozen historical partitions, and an active partition behaves like a conventional index scan until it is frozen. The Fenwick-plus-SIMD page structure in §2.5 is a hypothesis, since Fenwick queries touch scattered entries rather than a contiguous array. Window-function matching in the planner hook is not worked out.

Rival accounts include trigger-maintained summary tables, materialized views, BRIN indexes, columnar rollup stores, and continuous-aggregate features in time-series extensions. Each may be preferable when writes are not append-only or when exact snapshot isolation on recent data matters more than historical range queries.

---

## Claim Ledger

| ID | Claim | Status | Basis | Check |
|---|---|---|---|---|
| C1 | In a standard B-tree index, internal pages only route traversal and leaf tuples hold index keys with heap TIDs | fact | nbtree README [@pgdg2025b] | Read the nbtree README and page layout |
| C2 | The index versus executor divide is historical rather than algorithmic, since a B-tree is an augmented interval tree | interpretation | Structural analogy | Compare with augmented-tree literature |
| C3 | An index holding monoidal partial aggregates can answer range aggregates in O(log N) when the aggregates consulted are visible to the snapshot | derived; assumes CLEAN downlinks | Sections 1.1 and 3.2 | Count pages touched in a prototype |
| C4 | For an invertible monoid, a range aggregate equals the upper prefix aggregate minus the prefix just below the lower bound | derived | Group inverse property | Compare against a brute-force scan |
| C5 | A range query over a non-invertible monoid combines at most 2(h-1)(B-1) sub-aggregates | derived | At most B-1 whole siblings per non-leaf level on each of two boundary paths | Instrument the sub-aggregate count |
| C6 | IEEE-754 floating-point addition is not associative in general | fact | [@goldberg1991] | Evaluate both groupings on chosen values |
| C7 | Growth of a variable-length numeric accumulator would cause relocations and page splits during routine leaf inserts | hypothesis; untested | Page storage mechanics | Prototype a numeric payload and measure split rate |
| C8 | `abtree` supports only fixed-width monoid types | definition | Design constraint of this piece | Inspect the operator class definitions |
| C9 | `nbtree` implements Lehman-Yao with high keys and right-links | fact | [@lehman1981]; [@pgdg2025b] | Read the nbtree README |
| C10 | A downlink aggregate must equal the combination of the tuples directly beneath it | definition | Design requirement | Verify with an amcheck-style consistency checker |
| C11 | PostgreSQL pages are 8 KB by default, with line pointers growing forward and tuple data growing backward | fact | [@pgdg2025c] | Inspect a page with `pageinspect` |
| C12 | A leaf page holds roughly 200 to 400 tuples | estimate | 8 KB page divided by roughly 20 to 40 bytes per tuple | Compute from the actual tuple size |
| C13 | An in-page Fenwick structure with SIMD gives O(log K) page-local prefix sums | hypothesis; untested | [@fenwick1994]; design reasoning | Microbenchmark against a linear scan |
| C14 | Heap tuples carry `xmin` and `xmax` while index tuples do not | fact | [@pgdg2025c] | Inspect heap and index tuples with `pageinspect` |
| C15 | A Visibility Map check of a subtree cannot be O(1) without descending to leaf TIDs | derived | Heap placement is independent of index key order | Count VM lookups on an unclustered table |
| C16 | Under the append-only invariant, a CLEAN downlink never exposes an uncommitted or invisible row | derived | Frozen tuples are visible to all; CLEAN is set only after the freeze check | Test concurrent snapshots during `VACUUM FREEZE` |
| C17 | `abtree` enforces a strict append-only invariant | definition | Design constraint of this piece | Check that updates and deletes are rejected |
| C18 | A height-three tree with 200 to 400 entries per page holds about 8 million to 60 million tuples | estimate | 200 to 400 entries per page, cubed | Recompute with measured fan-outs |
| C19 | In standard `nbtree`, an insert modifies one leaf and parents change only on splits | fact | [@pgdg2025b] | Trace WAL records for inserts |
| C20 | Synchronous bottom-up delta locking can create ABBA buffer deadlocks | interpretation | Lock-order inversion argument | Stress a prototype with deadlock logging |
| C21 | An asynchronous delta queue breaks `READ COMMITTED` visibility of committed deltas | interpretation | Staleness argument | Run a commit-then-read test |
| C22 | Top-down DIRTY marking during descent avoids lock inversions | hypothesis; untested | Strict top-down lock order | Stress concurrent inserts, splits, and vacuum |
| C23 | Posting a split downlink leaves the net parent aggregate unchanged for invertible monoids | derived | Algebra in section 4.3 | Check invariants after concurrent splits |
| C24 | A missing custom resource manager prevents WAL replay and breaks recovery | fact | [@pgdg2025g] | Start recovery without the extension loaded |
| C25 | Core PostgreSQL replays Generic WAL records without extension code | fact | [@pgdg2025a] | Replay on a standby without the extension |
| C26 | With `full_page_writes` on, the first modification after a checkpoint emits a full page image | fact | [@pgdg2025e] | Inspect WAL with `pg_waldump` |
| C27 | Modifying internal pages on every insert could raise WAL volume by 3x to 8x | guess | No measurement | Compare WAL bytes with `nbtree` in a prototype |
| C28 | For multi-million-row ranges with mostly CLEAN downlinks, query cost drops by several orders of magnitude | hypothesis; untested | Cost model in section 7.2 | Benchmark against `nbtree` plus aggregation |
| C29 | The timings in Table 1 are achievable design targets | guess | No measurement | Benchmark each scan pattern |
| C30 | Concurrent updates to the same summary row serialize on its row lock | fact | [@pgdg2025d] | Run concurrent updates and inspect `pg_locks` |
| C31 | Replacing summary tables with an append-only `abtree` lowers write contention on hot accounts | hypothesis; untested | Removal of row-level serialization | Compare throughput on a hot-account workload |
| C32 | DIRTY downlinks force leaf traversal with snapshot checks, so uncommitted data is not returned | derived | Protocol in section 3.2 | Test with open transactions during scans |
| C33 | Scan cost under DIRTY downlinks approaches an index-only scan plus fan-out overhead | hypothesis; untested | Fallback path is a leaf scan | Benchmark a fully DIRTY tree |
| C34 | Recovery time with Generic WAL stays close to vanilla PostgreSQL | hypothesis; untested | No custom replay logic | Measure crash recovery time on equal workloads |

---

## References

- [@fenwick1994] Fenwick, Peter M. *A New Data Structure for Cumulative Frequency Tables*. Software: Practice and Experience 24(3), 1994.
- [@goldberg1991] Goldberg, David. *What Every Computer Scientist Should Know About Floating-Point Arithmetic*. ACM Computing Surveys 23(1), 1991.
- [@lehman1981] Lehman, Philip L., and S. Bing Yao. *Efficient Locking for Concurrent Operations on B-Trees*. ACM Transactions on Database Systems 6(4), 1981.
- [@pgdg2025a] PostgreSQL Global Development Group. *PostgreSQL Documentation: Generic WAL Records*. https://www.postgresql.org/docs/current/generic-wal.html. Accessed 2025-01-01.
- [@pgdg2025b] PostgreSQL Global Development Group. *nbtree README*, `src/backend/access/nbtree/README`. https://github.com/postgres/postgres/blob/master/src/backend/access/nbtree/README. Accessed 2025-01-01.
- [@pgdg2025c] PostgreSQL Global Development Group. *PostgreSQL Documentation: Database Page Layout*. https://www.postgresql.org/docs/current/storage-page-layout.html. Accessed 2025-01-01.
- [@pgdg2025d] PostgreSQL Global Development Group. *PostgreSQL Documentation: Explicit Locking*. https://www.postgresql.org/docs/current/explicit-locking.html. Accessed 2025-01-01.
- [@pgdg2025e] PostgreSQL Global Development Group. *PostgreSQL Documentation: Write Ahead Log Configuration*. https://www.postgresql.org/docs/current/runtime-config-wal.html. Accessed 2025-01-01.
- [@pgdg2025g] PostgreSQL Global Development Group. *PostgreSQL Documentation: Custom WAL Resource Managers*. https://www.postgresql.org/docs/current/custom-rmgr.html. Accessed 2025-01-01.
- [@pgdg2025h] PostgreSQL Global Development Group. *PostgreSQL Documentation: Visibility Map*. https://www.postgresql.org/docs/current/storage-vm.html. Accessed 2025-01-01.
- [@pgdg2025i] PostgreSQL Global Development Group. *PostgreSQL Documentation: Index Access Method Interface Definition*. https://www.postgresql.org/docs/current/indexam.html. Accessed 2025-01-01.

---

## Appendix A: Symbol Table

Table 2: Symbols used in this piece.

| Symbol | Meaning |
|---|---|
| $\mathcal{S}$ | Carrier set of the monoid |
| $\oplus$ | Monoid operation that combines two aggregates |
| $\ominus$ | Inverse of $\oplus$ for invertible monoids |
| $e$ | Identity element of the monoid |
| $N$ | Number of indexed rows |
| $K$ | Number of rows matching a range query, or tuples in a leaf page |
| $K_{\text{boundary}}$ | Tuples on partially matched boundary leaf pages |
| $h$ | Tree height |
| $B$ | Page fan-out |
| $t_1, t_2$ | Lower and upper bounds of a range |
| $t_1^-$ | Position immediately before $t_1$ |
| $\operatorname{Agg}$ | Aggregate value of a tuple, page, or subtree |
| $\operatorname{Val}$ | Payload value of a leaf tuple |
| $\operatorname{PrefixAgg}$ | Aggregate of all entries up to a bound |
| $\operatorname{RangeAgg}$ | Aggregate of all entries within a range |
| $D_i$ | An internal downlink tuple |
| $C_i$ | Child page that $D_i$ points to |
| $n_i$ | Number of items in page $C_i$ |
| $T_{C_i, j}$ | The $j$-th tuple of page $C_i$ |
| $L, R$ | Left and right pages produced by a split |
| $L_{\text{old}}, L_{\text{new}}$ | Left page before and after a split |
| $M$ | Number of tuples on a page before it splits |
| $k$ | Position at which a page is split |
| $\Delta_{\text{parent}}$ | Net aggregate change at the parent during a split |

---

## Changelog

- 2025-01-01: Converted to the site style guide: front matter, reader note, decimal numbering, inline claim tags, claim ledger, references, symbol table, and labeled code and diagram blocks. Corrected the planner hook stage names to `UPPERREL_GROUP_AGG` and `UPPERREL_WINDOW`, moved the page diagram's special space to the end of the page, and added a recompute note for non-invertible monoids in §4.3.
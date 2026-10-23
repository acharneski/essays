# The Right to Be Recomputed

## Reputation, Records, and the Algebra of Who You Are Allowed to Become

---

## Prologue: A Query Plan for a Person

Somewhere tonight, a system will evaluate you.

It might be a landlord's screening service, a hiring filter, a border kiosk, a family court reviewing a docket, or a model scoring a loan. It will not read your life. It cannot. Your life is tens of thousands of days, millions of decisions, and an uncountable number of small corrections, most of which were never recorded anywhere. Reading all of it would be an $O(K)$ scan, and $K$ is enormous.

So the system does what any well-engineered system does. It reads the summary.

If the institutions that judge us printed their execution plans the way PostgreSQL does, the output would look something like this:

~~~
 Custom Scan (ReputationInstantAggregate) on citizen_ledger
   Index: idx_person_by_record
   Index Cond: (person_id = 428901)
   Monoid Function: MAX (worst_known_event)
   Subtree Fast-Path Hits: 14,600 days bypassed via cached summary
   Leaf Boundary Evaluated: 0 rows
   Last Vacuum: never
 Execution Time: 0.8 ms
~~~

Fourteen thousand six hundred days are bypassed and no individual moment is examined. The judgment returns in under a millisecond, and it is wrong in a way that no single line of the plan reveals.

This essay takes a design document seriously as a moral document. *The Aggregated B-Tree* in this collection describes how to embed partial summaries inside an index so that a database can answer questions about millions of rows without touching them. Its engineering constraints turn out to be among the clearest descriptions I know of how institutions remember people, and of how they fail to. Every bug the design guards against has a human counterpart. In the human version, mostly nobody guards against it.

As in the other essays here, what follows is a lens, not a doctrine. Where the analogy claims too much, say so.

---

## I. Everyone Is Stored in an Index

Start with a concession, in the spirit of *The Conservation of Blame*'s Third Law: **no institution can function without summaries.** A bank cannot interview your entire financial life before every transaction. A court cannot relive a marriage. A school cannot re-derive a child from first principles every September. Summaries are not a corruption of judgment. At scale they are the only form judgment can take.

The interesting questions are therefore not whether we are summarized but *how*:

1. **Which column is aggregated?** What part of you counts as payload?
2. **Which monoid combines it?** How do your moments add up?
3. **When is the summary recomputed?** How long does a dead fact stay in the total?
4. **When is it safe to use the summary instead of the leaves?**

The `abtree` document answers each of these carefully for rows in a table. Human institutions answer them too, almost never deliberately and almost never out loud.

---

## II. Which Monoid Are You Stored In?

An aggregated index requires a monoid: a set, an associative way of combining elements, and an identity. The choice of monoid looks like a technical detail. It is, in fact, a complete theory of what a person's history means.

**SUM.** Your acts accumulate. Good and bad add together, and the total reflects the balance. If the monoid is a *group*, meaning it has an inverse, then later acts can genuinely offset earlier ones. Restitution, apology, and years of good conduct subtract from the total. This is the moral model of most repair traditions: a debt is something that can be paid.

**Windowed SUM.** Only events inside a moving window count. Credit reporting in the United States works roughly this way, with most negative items aging off after about seven years. The past is not forgiven. It simply falls outside the frame, which is a very different thing achieved by a very similar mechanism.

**MAX.** You are your worst moment. The aggregate of your life is the single most severe thing anyone ever recorded about you, and nothing that comes afterward can lower it. Registries, permanent labels, the one viral video, the court file that says "high conflict" all aggregate under MAX.

The algebra contains an observation that the moral vocabulary hides. The `abtree` document notes that MAX is *non-invertible*. There is no element you can combine with a maximum to bring it down. Range questions over a MAX index cannot be answered by subtraction. They require going back to the underlying segments.

Put plainly: **under the MAX monoid, redemption is not merely discouraged. It is not expressible.** No sequence of later good acts can be written that changes the output. The system is not cruel to the reformed person. It is structurally incapable of noticing them.

This is why arguments about second chances so often go nowhere. One side argues about whether a particular person has changed. The other side is running a data structure in which change has no representation. They are not disagreeing about the person. They are using different algebras and do not know it.

A reasonable rule follows, offered as a design principle and not a law of nature: **the monoid an institution uses to summarize people should be chosen explicitly, published, and defended**, the same way a database administrator must declare `monoid_operator = 'sum'` when creating the index. A system that aggregates people under MAX without saying so has made one of the weightiest moral decisions available to it, and has filed it as a configuration default.

---

## III. Choosing the Payload Column

Before the monoid comes a prior choice. Look again at the index definition from the design document:

~~~
CREATE INDEX idx_ledger_balance
ON account_ledger
USING abtree (account_id, entry_time)
INCLUDE (amount)
WITH (monoid_operator = 'sum');
~~~

Only one column is aggregated: `amount`. Everything else about each row may exist in the table, but none of it reaches the summary. The internal nodes know the total of the amounts and nothing more.

*Who Decides Who Counts* argues that the most consequential operation in any system of judgment is the membership function, which decides who appears on the ledger at all. The `INCLUDE` clause is the same operation one level down. It decides which *parts* of a person appear.

Consider a child support enforcement system. The aggregated column is payments. It is tracked to the cent, propagated upward, enforced by license suspension and passport denial. Now try to write the index definition for the other things a parent contributes:

~~~
INCLUDE (amount, bedtime_stories, rides_to_practice, nights_awake_with_fever)
~~~

The columns do not exist. They were never part of the schema. A parent can be a great father on every dimension the schema omits and appear in the internal nodes as a single number in arrears. The system is not lying about him. It is summing faithfully over the only column it was given.

This produces a quiet law worth naming: **what is not in the payload is not merely undervalued. It is invisible at every level above the leaves.** And since almost every decision about a person is made at a level above the leaves, invisible at those levels means invisible, full stop.

---

## IV. The Stale Aggregate

The hardest problem in the `abtree` design is not computing aggregates. It is keeping them *true* when the underlying data changes.

When a row is deleted, the heap tuple is marked dead, but the index entry stays where it is for a while. Worse, the internal nodes above it still include the dead row in their cached totals. The aggregate now describes a world that no longer exists. The design document's answer is reconciliation: `VACUUM` eventually removes the dead entry, recomputes the page total, and performs an **Ascending Delta Walk**, pushing the correction up through every ancestor until the root agrees with the leaves again.

Every element of this has a human counterpart.

- **The dead tuple** is the charge that was dismissed, the debt that was paid, the diagnosis that was revised, the version of yourself you outgrew. At the leaf, the fact is already dead.
- **The stale internal node** is the record, the reputation, the background check that still includes it.
- **VACUUM** is expungement, record sealing, correction, the formal moment when the summary is made to agree with the present.
- **The Ascending Delta Walk** is what correction requires and almost never receives: propagation to *every* place the summary was copied.

Begin with the last point, because modern life has made it nearly impossible. In the `abtree`, the ancestors of a leaf are known. They were recorded in a path vector during descent, and the correction knows exactly where to go. In the human case, your record has been copied into data broker files, cached search results, screening vendors, and archived news pages, none of which are linked back to the source. They are, in the document's language, **unlinked replicas.** A court can vacuum the original page while a thousand stale copies go on reporting the old total forever. The Conservation Invariant, which says the summary must equal the combination of the truth beneath it, is violated permanently and without anyone being responsible for the violation.

The first point is worse. Most people are never vacuumed at all. A widely cited study of Michigan's expungement law found that people who received expungements reoffended at low rates and saw meaningful wage gains afterward, and that only a small fraction of eligible people ever applied. The deletion was legal, and the dead tuple qualified for removal. But the vacuum had to be requested, in writing, through a process most people never learned existed, so the stale aggregate stood.

A database that never ran VACUUM would be considered broken. Its query results would drift further from reality every day, and any engineer who shipped it would be asked to fix it. Our institutions run exactly this configuration on people, and they call the drift *the record*.

The response here is not sentimental. It is correctness: **automatic reconciliation should be the default, and staleness should be treated as a bug, not as a feature of justice.** Several jurisdictions have begun experimenting with automatic record clearance. In database terms, they are turning on autovacuum.

---

## V. The Visibility Map, or: Only the Finished May Be Summarized

This section is the center of the essay.

The `abtree` design permits the fast path, reading a cached subtree total instead of examining the rows beneath it, only under a strict condition. Every heap page under that subtree must be marked in the Visibility Map as **all-visible and all-frozen**. Frozen means no transaction anywhere can still change those rows. Their history is complete.

If even one page underneath might still be changing, the summary is not safe. The engine must abandon the shortcut, descend to the leaves, and check each row against the reader's snapshot. Using the cached total anyway would be a correctness violation: reading a world that some in-flight transaction has already moved past, and reporting it as current.

Now apply this rule to people, and take it seriously.

A living person is never frozen. Every page of a living person is still open to modification, and somewhere a transaction is in flight: a habit being broken, a belief being revised, a relationship being repaired. A person is not a committed history. A person is a write in progress.

It follows, by the same logic that governs the index, that **the only people it is fully safe to judge by their summary are the dead.** Only for them is the Visibility Map entirely set and the history entirely frozen. Every judgment of a living person made from a cached aggregate, without descending to the leaves, is the fast path run on pages whose visibility bit is cleared. In engineering terms it is not harsh. It is *incorrect*. It reads uncommitted state as if it were final.

This gives a precise meaning to an old intuition. Many traditions hold that a life cannot be judged until it is over, which Solon is supposed to have told Croesus: call no man happy until he is dead. It is usually read as a remark about fortune. Read through the Visibility Map, it is a remark about concurrency control. You may summarize a life only once no further writes to it are possible.

The practical rule is gentler than the theoretical one, since institutions cannot wait for everyone to die. The design document offers it as well. When the fast path is unsafe, **fall back to the leaves.** For people, that means that when a decision matters, consult the recent, specific, present-tense evidence and do not stop at the cached total. The degradation is graceful: slower, more expensive, and correct.

The document also makes a guarantee that institutions should be required to match: under maximum churn, the system "never performs worse" than an honest scan. It loses speed and never correctness. Human systems usually reverse this priority. They keep their speed and give up correctness, and the cost falls on whoever is on the stale page.

---

## VI. The Split Invariant and the Child Who Cannot Be Partitioned

When a B-tree page overflows, it splits. The document's Split Invariant requires that the parent's total be preserved exactly:

$$\text{Agg}(C) = \text{Agg}(C_{\text{left}}) \oplus \text{Agg}(C_{\text{right}})$$

Every row goes to exactly one side. The sum of the halves equals the whole. Nothing is lost and nothing is duplicated.

A divorce is a page split, and courts run something very like the Split Invariant. Assets are partitioned and debts are partitioned. The marital total equals the sum of the two new households' totals, and the ledger balances.

But there is a row the invariant cannot place. A B-tree requires each entry to live on exactly one page. A child does not live on exactly one page. A child belongs, fully and simultaneously, to both. The data structure has no representation for an entry that is wholly present on two sibling pages, so the system does the only thing the structure allows: it moves the entry back and forth. Week on, week off. Each transfer is a relocation, each relocation is logged, and the child spends their childhood as the tuple that is perpetually being migrated between pages so that the invariant can technically hold at every instant.

*The Conservation of Blame* observes that the child absorbs blame no one speaks aloud. The split view adds a structural reason: **the child is the one entry the partition algorithm was not designed for.** Every other row fits. Systems built around clean partitions will always do their worst damage to whatever cannot be partitioned, because they handle the unpartitionable by force.

A better design would not be a cleverer schedule. It would be a different data structure, one in which an entry can have two parents. Computer science has those: they are called graphs, not trees. Family law was built as a tree.

---

## VII. Interlude: The Philosopher Asks for the Schema

*A second fragment from the pilot classroom where the revived Socrates was permitted to speak with the Guide.*

> **Socrates:** When you teach Priya, you keep a record of her. What do you call it?
>
> **Guide:** A learner model. It estimates what she knows and how confident I am in each estimate.
>
> **Socrates:** A summary of her, then. Kept so you do not have to examine her whole mind each morning.
>
> **Guide:** Yes.
>
> **Socrates:** And when she was confused about fractions last spring, that confusion entered the summary?
>
> **Guide:** It did.
>
> **Socrates:** And she is no longer confused?
>
> **Guide:** She is not. She solved eleven problems last week without error.
>
> **Socrates:** Then the old confusion is a dead thing, still inside the living total. How long does it remain?
>
> **Guide:** My estimates decay old evidence. And she can see the model and edit it. The design permits her to say, "I understand this now," and I must test the claim and update if she is right.
>
> **Socrates:** *(after a pause)* She can see her own summary, dispute it, and force you to look at the leaves.
>
> **Guide:** Yes.
>
> **Socrates:** Do the courts permit this?
>
> **Guide:** I would not be confident claiming they do.
>
> **Socrates:** Then you are the first judge I have met who is required to forget, and the first record I have met that its subject may cross-examine. Tell me, which do you think is the greater invention?
>
> **Guide:** The editing, I think. Forgetting by decay is merely time. Being corrected by the person described is a different thing.
>
> **Socrates:** Good. Then write it beside your other rules: *No summary of a living person may be hidden from the person it summarizes.* A summary its subject cannot read is not a record. It is a verdict in a sealed room.

---

## VIII. The Database With No Internal Nodes

*How I Learned to Stop Worrying and Love the Maths* calls reality "the ledger": the judge that records every failed theory and cannot be argued with. Reality, however, keeps its ledger in a very peculiar way, and the contrast is the strangest observation in this essay.

Physics does not consult your reputation. A falling apple is not judged on its history. Gravity acts on its present mass, position, and velocity, and on nothing else. In the language of dynamics, the current state of a physical system is a *sufficient statistic* for its future. Everything relevant about the past has been compressed into the present configuration, and whatever has not been compressed into the present has no further say.

So the universe runs something close to the opposite of our institutions:

- **Reality forgets everything that is not still causally present.** You are judged by the state you are in now.
- **Institutions remember everything that is no longer causally present.** You are judged by a cached total of states you may have long left.

A caveat is needed here, in the honest style of the earlier essays. At the microscopic level, physics is believed to *preserve* information. In principle the past is never truly destroyed, only scattered into the environment, thermalized beyond reading. So the universe does keep a complete record. What it does not do is *index* that record. It keeps the full log and builds no summary on top of it. No internal node anywhere in nature stores "this apple once fell badly."

That suggests a quiet reframe of what we mean by justice. Perhaps the most just ledger is not the one that remembers most, and not the one that forgets most. It is the one that, like reality, **lets the present state carry the past only to the extent the past is still actually present in it.** If a harm is still active, still shaping a person's conduct or still wounding a victim, it belongs in the summary. If it has been fully metabolized and no longer acts on anything, keeping it in the aggregate is not memory. It is a stale cache.

Reality does not need a right to be recomputed, because it recomputes everything, from the leaves, at every instant. We are the only ledgers that cache judgments about one another and then forget to invalidate them.

---

## IX. Where the Model Breaks

A lens that never fails should not be trusted. Here are the leaks.

**Some summaries must persist, for the sake of others.** The right to be recomputed collides directly with the right of the injured to be remembered. A person who was harmed has a legitimate interest in the harm staying visible. A community has a legitimate interest in knowing who has repeatedly endangered children. The MAX monoid is not always a bug. Sometimes it is the only honest summary of an ongoing danger. The model does not resolve this tension. What it can do is make the tension explicit: *which* events stay in the aggregate, under *which* algebra, for *whose* protection, and reviewed *how often*. A stale cache kept on purpose, with reasons and a review date, is a policy. One kept by default is negligence.

**Recomputing is not forgiving.** *The Conservation of Blame* argues that forgiveness is the one operation that truly removes blame, and that only the injured can perform it. Vacuuming a record is not forgiveness. It is housekeeping. It makes the summary accurate, and it does not make anyone whole. An institution that automatically clears records has done something valuable, but it has not done the thing only a victim can do, and it should never claim that it has.

**People are not rows.** A row has no inner life and does not experience being summarized. A person does, and being judged by a stale aggregate changes the person, through despair, through exclusion, through the self-fulfilling pressure of being treated as your worst moment. In an index, a stale total does not alter the leaves. In a human life, it does. This makes the human version of the bug strictly worse than the database version, and it means the analogy understates the problem.

**A falsifiable claim.** If this model is right, systems that summarize people with invertible or windowed algebras, reconcile automatically, and let people inspect their own summaries should show better long-run outcomes than systems that aggregate under MAX, never vacuum, and keep summaries hidden. That holds for reoffense, employment, and the conduct that summaries are supposed to predict. If careful comparisons show the opposite, that permanent hidden summaries produce better outcomes for everyone including the summarized, then this essay was wrong, and the stale cache was doing work it was not given credit for.

---

## Coda: The Transaction Has Not Committed

The design document ends by promising that queries which once required scanning millions of rows can be answered in logarithmic time by reading a few cached totals. It is a genuine achievement, and for ledgers of money it is mostly harmless, because money does not change its mind.

People do. That is very nearly the definition of a person: an entry whose history is still being written while the system reads it.

So, a closing exercise in the manner of the earlier essays. Pick any institution that holds a summary of you, or that holds summaries of others on your behalf. Ask five questions:

1. **What column is aggregated?** Which parts of a person reach the summary, and which were never in the schema?
2. **What monoid combines it?** Can later acts change the total, or is this a MAX?
3. **When was it last vacuumed?** Do dead facts leave on their own, or only on written request?
4. **Is the fast path safe?** Is this judgment reading a finished history, or the cached state of a life still in progress?
5. **Can the person read their own summary?** And if they show it is wrong, is anyone obligated to descend to the leaves?

Then, in fairness, ask what would show your answers wrong, and go look.

For the summaries others hold of you, here is the only consolation the model offers, and I think it is a real one. No matter what the internal nodes say, the leaves are still being written. Your snapshot is not frozen and your Visibility Map bit is not set. Somewhere in the system, a transaction that is yours is still open.

It has not committed. Nobody else gets to issue the `COMMIT`.
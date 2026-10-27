---
title: The Garbage Collector
subtitle: Forgetting, reachability, and who decides what is unreachable
slug: the-garbage-collector
type: essay
mode: argumentative
numbering: roman
ledger: required
math: true
topics: [forgetting, memory, garbage-collection, archives, distributed-systems, reconciliation]
content_flags: [death, politics, real-persons]
lifecycle: draft
date_created: 2026-10-02
date_updated: 2026-10-02
---

# The Garbage Collector

*Forgetting, reachability, and who decides what is unreachable*

> Reader note: Claim status is marked inline in [brackets]. A claim ledger is at the end.

## Introduction

In 1960 John McCarthy, describing the programming language that became Lisp, included a modest procedure for a practical problem. A program builds structures in memory, uses them, and abandons them. Unless something reclaims the abandoned storage, the machine fills up. McCarthy's answer was to trace every structure the running program could still reach and to return everything else to the free list. [fact:C1] The procedure came to be called garbage collection. It is usually filed under engineering hygiene, next to log rotation and disk cleanup.

This essay argues that it deserves a more dignified place. Garbage collection is the most carefully studied theory of forgetting that humans have built. It has worked out, under pressure of correctness, problems that cultures face without vocabulary: why feuds outlive everyone who remembers their cause, why deletion in a crowd always leaves a mark, why erasing a name tends to make it louder, and why a civilization that stores everything does not remember better but leaks.

The central claim is simple. Forgetting is not the failure of memory. It is memory's governance, and every forgetting policy is, underneath, a choice of **roots**: the things from which reachability is traced. [model:C2] So the ethical question about memory is rarely "should we remember?" It is "from where are we tracing, and who chose those starting points?" [normative:C3]

---

## I. Memory Has a Heap

In 1942 Jorge Luis Borges published "Funes the Memorious," the story of a young man who, after a fall from a horse, forgets nothing. [fact:C4] Funes remembers every leaf of every tree on every occasion he has seen it, and as a result he cannot think. To think, the narrator says, is to forget differences, to generalize, to abstract. Funes is a heap that never frees.

Nietzsche had made the philosophical version of the point in 1874, in the second of his *Untimely Meditations*: a creature that could not forget would be unable to act, because every action requires a horizon, a boundary beyond which the past stops pressing. [fact:C5] In the *Genealogy* he would later describe forgetting not as inertia but as an active faculty, a kind of doorkeeper. The companion essay on promising begins from the other side of the same door: the creature that promises must be bred to remember. Here we look at the door from inside.

Biological memory forgets by default. Ebbinghaus measured the decay in 1885, memorizing nonsense syllables and charting how quickly they faded. [fact:C6] Human societies forgot by default too, because remembering was expensive: parchment, scribes, archives, oral specialists. Viktor Mayer-Schönberger has argued that digital technology inverted that default, so that remembering became the cheap path and forgetting the one that takes effort. [secondhand:C7]

A program in that situation is familiar to every engineer. It allocates freely, never frees, and runs well for a while. Then it slows, then it thrashes, then it dies. The name for this is not "perfect memory." It is a leak.

---

## II. Reachability, Not Age

The core idea of a tracing collector fits in one line. Let $H$ be the heap, the set of everything allocated. Let $R \subseteq H$ be the root set: the things the running program is actively holding, such as variables on the stack and global names. Write $x \to y$ when $x$ holds a reference to $y$, and $\to^{*}$ for the reflexive, transitive closure. Then the live set is

$$
L \;=\; \{\, x \in H \;:\; \exists\, r \in R,\ r \to^{*} x \,\},
$$

and everything in $H \setminus L$ is garbage. [definition:C8]

Notice what the definition does not mention. It does not ask how old an object is, how large, how expensive to build, or how important. The collector never asks whether an object is *good*. An object that encodes the cure for a disease is garbage the moment nothing reachable points to it. An object that encodes a typo is live for as long as a root holds it. Liveness is a property of position in a graph, not of content. [model:C9]

Social memory has the same shape. A battle, a recipe, a grievance or a name stays remembered while some path leads to it from something the community is actively holding: a law in force, a scripture read aloud, a school curriculum, a family story, a monument on a route people walk, a search index. Cut every path and the thing is gone, however much it once mattered. Keep one path and it survives, however trivial.

The interesting part is the root set. In a program, roots are fixed by the language: whatever the code currently holds. In a society, roots are not discovered. They are declared, maintained and fought over. [interpretation:C10] A canon is a root declaration. So is a national holiday, a required reading list, a museum's acquisition policy, and the ranking function of a search engine. Most debates about "remembering the past" are really debates about the root set dressed up as debates about the past.

---

## III. The Cycle Problem

The simplest automatic memory manager does not trace at all. It keeps a **reference count** on each object and frees the object when the count reaches zero. This is cheap and local: each object only needs to know how many things point at it. It has one famous defect. If $a$ refers to $b$ and $b$ refers to $a$, both counts stay at one forever, even after nothing else in the program can reach either. Reference counting cannot reclaim cycles. [fact:C11]

A blood feud is a cycle. Each family keeps the grievance alive by pointing at the other family's last offense. Each act of revenge is a fresh reference to the act it answers. The original cause may be unreachable from anything anyone else cares about, unknown even to the young men now carrying it, and the counts still never fall to zero. [model:C12] Local reasoning, which is all a reference count has, will keep the feud live indefinitely, because from inside the cycle every grievance really is still referenced.

Collecting a cycle requires a different kind of knowledge: a trace from outside roots, which can see that the whole loop hangs from nothing. In social terms, that means a third party with a wider view. Feuds seem rarely to end from inside. They end through mediators, courts, intermarriage, or outsiders who can say, with authority, that this loop no longer connects to anything the wider community holds. [interpretation:C13] Many cultures with endemic feuding developed formal mediating roles for exactly this purpose. [needs-source:C14]

The lesson is not that the feuding parties are irrational. Within their information, they are correct: every reference is real. The lesson is that some garbage is invisible to local accounting and can only be identified globally.

---

## IV. Most Things Die Young

In the early 1980s, researchers building collectors for Smalltalk and Lisp noticed a regularity. Most objects die very young; the few that survive their first collections tend to survive a long time. This is the **generational hypothesis**, and generational collectors exploit it by sweeping a small young generation often and a large old generation rarely, promoting survivors from one to the other. [fact:C15]

Culture runs a generational collector. News, gossip, jokes and outrage are allocated in vast quantities and almost all of it is gone within days. A small fraction is promoted: into history books, case law, proverbs, canon. Once promoted, it is examined rarely, because full collections of the old generation are expensive and disruptive. [model:C16]

Two consequences follow. First, the promotion threshold is where much of the politics of memory happens, since what crosses it acquires a protection that what does not cross it never gets. Second, the old generation accumulates its own garbage between major collections. Laws stay on the books long after anything reachable depends on them. Honors stay attached to names whose reasons nobody now endorses. [interpretation:C17] Some legislatures periodically pass bills whose whole purpose is to repeal statutes found to be obsolete, a full old-generation sweep performed by committee. [secondhand:C18]

---

## V. Tombstones

Deleting from a single machine is easy. Deleting from many machines that copy each other is not. Suppose replica $A$ deletes an item and replica $B$, which has not yet heard, still holds it. When they next merge, $B$'s copy looks like a new item that $A$ is missing, and the deletion is undone. Replicated systems therefore do not simply remove deleted items. They record the deletion as a **tombstone**, a marker that says "this existed and was removed," so that the removal can win the merge. [fact:C19]

This gives a strange and exact result. In a distributed system, to forget something you must remember that you forgot it. [derived:C20]

Human institutions discovered tombstones without the name. An expunged criminal record is often sealed, not destroyed, and the sealing is itself recorded. The European "right to be forgotten," as established by the Court of Justice in the *Google Spain* case in 2014, requires search engines in certain cases to remove links from results for a person's name; the underlying source is not deleted. [fact:C21] That is precisely tombstone-shaped. The object remains. An edge from a powerful root, the search index, is removed, and a record of the removal is kept so that a later crawl does not quietly restore it.

Tombstones have a failure mode. The marker is itself an object, and it can become a reference. An attempt to suppress a story often draws attention to the story: the much-discussed Streisand effect is a tombstone that turned into a root. [interpretation:C22]

The companion essay on promising treated forgiveness as a compensating entry: the record of the debt stays, a new line cancels it. A tombstone is the forgetting analog. Forgiveness keeps the content and cancels its force. A tombstone keeps a marker and hides the content. Both reject the fantasy that the past can be unwritten.

And tombstones cannot be kept forever, or they become their own leak. Removing a tombstone is safe only when every replica has seen the deletion; otherwise a lagging replica resurrects the item. Real systems approximate this with grace periods and accept occasional resurrections. [fact:C23] So, given the model, permanent social forgetting, not just suppression, needs something like a shared now: an agreement that everyone relevant has heard. [derived:C24] That is the same requirement the promising essay found for collective debt reset, arrived at from the opposite direction.

---

## VI. Stop the World

Early tracing collectors paused the program entirely while they worked. Nothing could change the heap during the trace, so the trace was simple and correct, and every user of the program waited. [fact:C25] In 1978 Dijkstra, Lamport and colleagues described an "on-the-fly" collector that could run alongside the program, provided the program cooperated: whenever it changed a reference during collection, it had to inform the collector, so that nothing live was mistakenly freed. [fact:C26] Engineers now call that obligation a **barrier**.

Societies have both kinds. Jubilees, general amnesties and coronation pardons are stop-the-world collections: everything pauses, a single sweep runs, and life resumes with a cleaner heap. Ongoing restorative practices, by contrast, are concurrent collectors. They try to reclaim old grievances while ordinary life continues to create new ones. They can only work if there is a barrier: every new reference to the old material made during the process must be surfaced to the process, or the collector will declare something dead that someone is still holding. [model:C27]

South Africa's Truth and Reconciliation Commission, established under a 1995 act, offered amnesty for politically motivated crimes on the condition of full disclosure. [fact:C28] Whatever one thinks of its outcomes, the design is recognizable. The disclosure condition is a barrier: you may have your act collected only if you report every reference to it, so that nothing still held by a victim is silently freed. [interpretation:C29] It was also explicitly not deletion. The acts were recorded in exhaustive detail. What was released was the legal reference from the state's punitive roots.

---

## VII. Dangling Pointers

Languages without automatic collection let programmers free memory by hand. If they free an object that something still refers to, the reference does not vanish. It dangles. It now points to reclaimed storage, which may later be reused for an entirely different object, so that old references silently resolve to something new. This "use-after-free" is among the most dangerous classes of bug in systems software. [fact:C30]

After the emperor Caracalla had his brother Geta killed in 211, Geta's name was chiseled from inscriptions and his face removed from images across the empire. [fact:C31] The removals did not make Geta unreachable. Every gouged face and scraped line was a reference to an absence, and in a famous painted family portrait the blank where his face had been is now the most discussed part of the picture.

*Damnatio memoriae* is manual freeing of a live object. [model:C32] The references remain, now pointing at a gap, and the gap gets reused. Into the slot where a figure stood, a regime writes a new occupant, and every old reference now resolves to the new story. Propaganda, on this reading, is use-after-free performed on purpose.

The contrast with automatic collection carries a moral rule. A tracing collector is safe precisely because it takes no orders about what to free. It frees only what nothing live can reach. The social version: a forgetting is legitimate only if nothing living still reaches the thing forgotten, or if those who still reach it release it themselves. [normative:C33] A victim is a root. A crime cannot be cleanly collected while a survivor still holds it, and one reading of why many legal systems impose no limitation period on murder is that the dead cannot release what they hold. [interpretation:C34] [fact:C35]

---

## VIII. Finalizers

Some runtimes let an object register code to run when it is collected. These **finalizers** proved troublesome. They run at unpredictable times, in no guaranteed order, and a finalizer can resurrect its own object by storing a reference to it somewhere reachable. Java deprecated its finalization method in version 9 for reasons of this kind. [fact:C36]

A funeral is a finalizer. So is an obituary, a eulogy, a memorial lecture. It runs at the moment of collection, and it can resurrect: a eulogy that ties the dead to a cause, a scripture, a nation, re-roots them, sometimes more strongly than they were rooted while alive. [model:C37] Hagiography is resurrection by finalizer. So, more darkly, is the martyr manufactured for a movement. And finalizers run in unspecified order, which is a fair description of the week after a contested death, when every party races to attach its own reference first.

---

## IX. The Leak

The networked world approaches a limiting case. Allocation is nearly free. Roots are everywhere: search indexes, archives, screenshots, data brokers, other people's backups. The reference graph is dense enough that almost everything is reachable from some root, which means almost nothing is garbage. [interpretation:C38] The generational hypothesis breaks: things that should have died young, a teenager's post, an offhand remark, a bad photograph, are pinned by roots their author never chose.

A leaking program does not fail all at once. Before it crashes, the collector runs more and more often and reclaims less and less, and the program spends a growing share of its time tracing instead of working. Engineers call this thrashing. The hypothesis is that a society with no effective collection shows the social form of the same symptom: a rising share of collective attention spent re-traversing the old graph, relitigating, re-auditing, re-discovering, at the expense of new work. [hypothesis:C39]

The promising essay described a frozen phase in which people become backbone variables, pinned by so many redundant constraints that no admissible path leads elsewhere. Permanent, root-reachable records are one such constraint. A society that cannot collect may freeze not through debt but through memory: each person fixed in place by the reachable record of who they once were. [hypothesis:C40]

---

## X. Who Chooses the Roots

Every section above has the same structure. The collector itself is innocent. Given a root set and a reference graph, what is live and what is garbage follows mechanically. The politics lives almost entirely in the choice of roots and in who holds the power to add edges. [interpretation:C41]

Historically, roots have been chosen by those able to maintain them. States kept archives; peasants kept memories that died with them. Churches maintained calendars of saints; the uncanonized dissolved. What survives as "the past" is disproportionately what was reachable from institutions with the budget to stay reachable themselves. [interpretation:C42] The ethics-of-wealth essay asked who captures the levers of enforcement. Its quiet sibling question is who captures the root set of memory.

Garbage collection offers two design ideas that a humane memory culture could borrow.

The first is the **weak reference**: a reference that lets you see an object without keeping it alive. If every other reference disappears, the object is collected and the weak reference quietly returns nothing. Much of what a person knows about their neighbors ought to be weak: I can know about your past without being the reason it survives. [model:C43]

The second is the **lease**. In distributed collectors, a remote holder does not keep an object alive forever. It holds a lease that expires unless renewed, so that a holder which crashes or loses interest stops pinning the object automatically. [fact:C45] The proposal is that strong institutional references to a person's past, such as records in databases, background checks and index entries, should be leases: they lapse unless someone with a legitimate, stated need renews them. [normative:C44] A lease does not decide what is true. It decides who has to keep paying, in attention and justification, for something to stay live.

---

## XI. A Model You Could Run

The analogy earns its keep only if it predicts something. Here is a minimal simulation. The pseudocode below is a sketch and is not runnable.

~~~text
initialize agents A, each with a record set; root institutions I
repeat:
    a := sample(A)
    allocate new record r for a (most records low-salience)
    with prob p_ref:   some agent or institution adds a reference to r
    with prob p_index: an index root adds a strong reference to r
    if leases enabled: expire strong references not renewed within L steps
    every G steps: trace from roots I and living agents; collect the rest
    measure: live-set size, traversal cost per step,
             mobility (agents able to change role without a reachable
             disqualifying record), feud persistence (unreachable cycles)
~~~

The hypotheses:

- As index-root density $p_{\text{index}}$ rises with no leases, traversal cost per step grows faster than the live set, a thrashing signature. [hypothesis:C46]
- Mobility falls sharply, not gradually, once the fraction of agents with at least one reachable disqualifying record crosses a threshold. [hypothesis:C47]
- With reference counting alone, mutual-grievance cycles persist indefinitely; adding even an occasional global trace from neutral roots collapses their lifetime. [hypothesis:C48]

If none of these hold, the essay's machinery is decoration, and it should be read as metaphor and nothing more.

---

## Conclusion

We usually picture forgetting as loss and remembering as virtue. The engineers who first had to build memory from scratch found a different picture. Memory that cannot forget does not become wise; it becomes slow, then unusable. Deletion among many parties cannot be clean; it leaves tombstones. Erasure by command does not erase; it dangles. And everything that survives, survives because something was holding it.

A civilization's character may be better read from what it allows to become unreachable, and from whom it lets decide, than from what it manages to store. [conjecture:C49] The archive tells you what was kept. The root set tells you who was keeping it.

---

## Limits

The essay treats social memory as a reference graph with roots. Real memory is reconstructive, partial and emotional, and references between memories are not discrete pointers. The formalism is a lens, and it is useful only where it predicts something that was not already believed.

The historical cases were chosen because their structure is clear. The Geta erasure and the Truth and Reconciliation Commission have political explanations that owe nothing to collector design, and fitting a pattern does not explain why the cases happened. The reading of murder statutes as protecting victims as roots is one interpretation among several, and severity alone may explain the exemption.

The claim that many feuding cultures developed formal mediators (C14) needs a source before publication, and the statute-repeal practice (C18) should be checked against specific jurisdictions.

The lease proposal has costs the essay does not resolve. Expiring records can protect the powerful as easily as the vulnerable, since a wrongdoer's record lapses too unless someone renews it, and the burden of renewal may fall on those with the least time and money. A rival account holds that durable public records are themselves an accountability tool, and that the right response to the leak is better norms of interpretation, not more forgetting.

---

## Claim Ledger

| ID | Claim | Status | Basis | Check |
|---|---|---|---|---|
| C1 | McCarthy's 1960 Lisp paper described automatically reclaiming storage the program could no longer reach | fact | [@mccarthy1960] | Read the section on free storage in the paper |
| C2 | Forgetting is the governance of memory, and every forgetting policy is a choice of roots | model | Analogy to tracing garbage collection | Test whether root choice predicts what communities remember |
| C3 | The ethical question about memory is from where we trace and who chose the roots, not whether to remember | normative | Author's framing | Compare with frameworks centered on a duty to remember |
| C4 | Borges's "Funes the Memorious" (1942) depicts a man who forgets nothing and cannot think | fact | [@borges1942] | Read the story |
| C5 | Nietzsche argued in 1874 that the capacity to forget is necessary for life and action | fact | [@nietzsche1874] | Read the second Untimely Meditation |
| C6 | Ebbinghaus measured the decay of memorized material in 1885 | fact | [@ebbinghaus1885] | Read the original study |
| C7 | Digital technology inverted the default from forgetting to remembering | secondhand | [@mayerschonberger2009] | Read the argument and check storage-cost data |
| C8 | The live set is everything reachable from the roots; the rest is garbage | definition | Standard tracing-collector definition | None needed |
| C9 | Liveness depends on reachability, not on value, and social memory works the same way | model | Analogy to tracing collection | Find cases where important material was lost while trivia survived via a root |
| C10 | Social roots are declared and contested, not discovered | interpretation | Canons, curricula, indexes as examples | Study disputes over canons and curricula |
| C11 | Reference counting cannot reclaim cycles | fact | Standard result in memory management | Construct a two-object cycle and observe the counts |
| C12 | A blood feud is a reference cycle that local accounting cannot collect | model | Analogy to reference counting | Compare feud duration with presence of outside interveners |
| C13 | Feuds seem rarely to end from inside and usually end through third parties with a wider view | interpretation | Structural argument | Survey ethnographies and histories of feud resolution |
| C14 | Many cultures with endemic feuding developed formal mediating roles | needs-source | None yet | Consult anthropological literature on feud mediation |
| C15 | Most allocated objects die young and survivors tend to live long (generational hypothesis) | fact | [@ungar1984] | Read the paper and later allocation studies |
| C16 | Culture runs a generational collector: ephemeral media die young, survivors are promoted to canon and rarely re-examined | model | Analogy to generational collection | Measure the survival curve of news items into reference works |
| C17 | The cultural old generation accumulates its own garbage, such as obsolete laws and honors | interpretation | Structural argument | Count obsolete statutes found in repeal reviews |
| C18 | Some legislatures pass bills whose purpose is to repeal obsolete statutes | secondhand | Reports of statute-law revision programs | Check specific jurisdictions' revision acts |
| C19 | Replicated systems record deletions as tombstones so that deletions survive merges | fact | [@shapiro2011] | Model a delete racing a merge with and without tombstones |
| C20 | In a distributed system, forgetting requires remembering that you forgot | derived | Follows from C19 | Verify against the merge argument |
| C21 | The Google Spain ruling (2014) requires delisting from name searches in some cases, not deletion of the source | fact | [@googlespain2014] | Read the judgment |
| C22 | The Streisand effect is a tombstone that becomes a reference | interpretation | Reading of suppression backfires | Compare attention to items before and after suppression attempts |
| C23 | Safely removing tombstones requires all replicas to have seen the deletion; systems approximate with grace periods | fact | Standard practice in replicated databases | Read documentation of tombstone grace periods |
| C24 | Permanent social forgetting, as opposed to suppression, needs something like a shared now | derived; given the model | C23 applied to social memory | Check whether durable forgetting coincides with synchronized events |
| C25 | Early tracing collectors paused the whole program while collecting | fact | Standard history of garbage collection | Any memory-management textbook |
| C26 | Dijkstra et al. described an on-the-fly collector that requires the program to notify the collector of reference changes | fact | [@dijkstra1978] | Read the paper |
| C27 | Restorative practices are concurrent collectors that need a barrier surfacing new references | model | Analogy to concurrent collection | Compare processes with and without disclosure requirements |
| C28 | South Africa's TRC, established under a 1995 act, granted amnesty conditional on full disclosure | fact | Promotion of National Unity and Reconciliation Act 34 of 1995 | Read the act |
| C29 | The TRC disclosure condition functions as a barrier | interpretation | C27 applied to C28 | Compare with political accounts of the design |
| C30 | Freeing a still-referenced object leaves dangling pointers, and use-after-free is a serious class of bug | fact | Standard systems-security knowledge | Consult vulnerability databases |
| C31 | Geta's name and images were removed across the empire after his killing in 211 | fact | [@varner2004] | Examine the cited study of erased portraits |
| C32 | Damnatio memoriae is manual freeing of a live object, and propaganda reuses the slot | model | Analogy to use-after-free | Compare erased figures' later visibility with that of unerased peers |
| C33 | A forgetting is legitimate only if nothing living still reaches it or its holders release it | normative | Analogy to collector safety | Compare with competing accounts of the ethics of memory |
| C34 | Victims act as roots, which is one reading of why murder often has no limitation period | interpretation | C33 applied to law | Compare with legislative histories of limitation exemptions |
| C35 | Many legal systems impose no limitation period on murder | fact | Limitation statutes in many jurisdictions | Survey criminal codes |
| C36 | Finalizers run unpredictably, unordered, can resurrect objects, and Java deprecated finalization in version 9 | fact | Java SE 9 documentation | Read the deprecation notice |
| C37 | Funerals and eulogies are finalizers that can re-root the dead | model | Analogy to finalization | Compare posthumous with lifetime citation or mention rates |
| C38 | In the networked world almost everything is reachable from some root, so almost nothing is garbage | interpretation | Density of indexes and copies | Measure decay rates of online content |
| C39 | A society without effective collection spends a rising share of attention re-traversing old material | hypothesis; untested | Analogy to thrashing | Track the share of public discourse devoted to resurfaced past material |
| C40 | Permanent reachable records can freeze social mobility like constraint backbones | hypothesis; untested | Link to the frozen phase in the promising essay | Compare mobility with record accessibility across jurisdictions |
| C41 | The politics of memory lives mainly in the root set and the power to add edges | interpretation | Argument of Sections II to IX | Look for memory disputes not reducible to root choice |
| C42 | What survives as the past is disproportionately what institutions could afford to keep reachable | interpretation | Archives of states versus oral memory | Compare archival coverage across social classes |
| C43 | Much interpersonal knowledge ought to work like weak references | model | Analogy to weak references | Check whether the distinction can be made operational in policy |
| C44 | Strong institutional references to a person's past should be leases that lapse unless renewed for a stated need | normative | Analogy to lease-based collection | Compare with existing record-expiry regimes |
| C45 | Distributed collectors such as Java RMI's use leases that expire unless renewed | fact | Java RMI distributed garbage collection specification | Read the specification |
| C46 | With dense index roots and no leases, traversal cost grows faster than the live set | hypothesis; untested | Simulation design in Section XI | Run the simulation sweeping index density |
| C47 | Mobility falls sharply past a threshold fraction of agents with reachable disqualifying records | hypothesis; untested | Simulation design in Section XI | Sweep the fraction and look for a transition |
| C48 | Reference counting lets grievance cycles persist, and occasional global traces collapse their lifetime | hypothesis; untested | Simulation design in Section XI | Compare cycle lifetimes with and without global traces |
| C49 | A civilization's character is better read from what it lets become unreachable, and who decides, than from what it stores | conjecture | Argument of the whole essay | No direct test |

## References

- [@borges1942] Borges, Jorge Luis. "Funes el memorioso." 1942. Collected in *Ficciones*, 1944.
- [@dijkstra1978] Dijkstra, Edsger W., Leslie Lamport, A. J. Martin, C. S. Scholten, and E. F. M. Steffens. "On-the-Fly Garbage Collection: An Exercise in Cooperation." *Communications of the ACM* 21(11), 1978.
- [@ebbinghaus1885] Ebbinghaus, Hermann. *Über das Gedächtnis*. Duncker & Humblot, 1885.
- [@googlespain2014] Court of Justice of the European Union. *Google Spain SL and Google Inc. v Agencia Española de Protección de Datos and Mario Costeja González*, Case C-131/12, 2014.
- [@mayerschonberger2009] Mayer-Schönberger, Viktor. *Delete: The Virtue of Forgetting in the Digital Age*. Princeton University Press, 2009.
- [@mccarthy1960] McCarthy, John. "Recursive Functions of Symbolic Expressions and Their Computation by Machine, Part I." *Communications of the ACM* 3(4), 1960.
- [@nietzsche1874] Nietzsche, Friedrich. "On the Uses and Disadvantages of History for Life." *Untimely Meditations*, 1874.
- [@shapiro2011] Shapiro, Marc, Nuno Preguiça, Carlos Baquero, and Marek Zawirski. "Conflict-Free Replicated Data Types." *Stabilization, Safety, and Security of Distributed Systems (SSS)*, 2011.
- [@ungar1984] Ungar, David. "Generation Scavenging: A Non-disruptive High Performance Storage Reclamation Algorithm." *ACM SIGSOFT/SIGPLAN Software Engineering Symposium on Practical Software Development Environments*, 1984.
- [@varner2004] Varner, Eric R. *Mutilation and Transformation: Damnatio Memoriae and Roman Imperial Portraiture*. Brill, 2004.
---
title: The Right to Make Promises
subtitle: Commitment, forgiveness, and the physics of social time
slug: the-right-to-make-promises
type: essay
mode: argumentative
numbering: roman
ledger: required
math: true
topics: [promises, forgiveness, distributed-systems, social-time, constraint-networks, arendt]
content_flags: [religion, real-persons, speculative-history]
lifecycle: draft
date_created: 2025-01-01
date_updated: 2025-01-01
---

# The Right to Make Promises

*Commitment, forgiveness, and the physics of social time*

> Reader note: Claim status is marked inline in [brackets]. A claim ledger is at the end.

## Introduction

In 1887 Nietzsche opened the second essay of *On the Genealogy of Morality* with a strange sentence: "To breed an animal with the right to make promises: is this not the paradoxical task that nature has set itself with regard to humankind?" [fact:C1] His point was that a promise is a violent thing to ask of a creature. To promise, an animal must be able to bind its future self. It must remember, against the natural pull of forgetting, and it must make its tomorrow answer to its today. Nietzsche thought that memory of this kind was burned into us, and that the first ledgers were written in pain.

In 1958 Hannah Arendt, in *The Human Condition*, gave the other half of the picture. Human action, she argued, suffers from two incurable defects. [fact:C2] It is *unpredictable*, because we cannot know what we or others will do. It is *irreversible*, because what is done cannot be undone. Each defect has exactly one remedy, and both remedies are human faculties. Against unpredictability we have **the promise**. Against irreversibility we have **forgiveness**. Without promising we would wander in darkness, and without forgiving we would be confined forever to a single deed from which we could never recover.

In 2015 a group of database researchers (Bailis, Fekete, Franklin, Ghodsi, Hellerstein and Stoica) proved a result about when distributed systems need coordination. Their criterion, **invariant confluence**, says that replicas can accept operations independently and still converge exactly when merging locally valid states always yields a valid state. [fact:C3] When that fails, the replicas must talk to each other before acting. They need a shared clock, or something that plays its role.

This essay argues that these three ideas are one idea. [model:C4] Promising is constraint insertion. Forgiveness is an operation on the ledger of constraints. Some forms of forgiveness are free, and some require the whole society to agree on what time it is. Where that line falls is not a matter of culture or taste. It is a theorem about which operations commute. [derived:C5]

The argument has an unsettling consequence: social time, the shared "now" a civilization lives in, exists mainly to make certain kinds of forgiveness possible. [conjecture:C6]

---

## I. A Promise Is a Constraint

Begin with an agent and the set of futures still open to it. Before any promise, that set is large. The agent might be in Lisbon on Tuesday or not. It might repay the loan or not. It might tell the truth or not.

A promise removes futures. "I will meet you at noon" deletes every future in which I am elsewhere at noon. Formally, if $\Omega$ is the set of admissible futures, $c$ is the promise, and $K_c$ is the set of futures in which the promise is kept, then

$$
\Omega \;\longmapsto\; \Omega \cap K_c .
$$

In words: making a promise shrinks the set of futures the promiser can still choose from to those in which the promise is kept. [model:C7] This is the operation that the precipitation picture of physics calls **refinement**: narrowing a set of admissible states by intersection. It has the same algebra. Intersection is commutative, associative and idempotent. Promising the same thing twice does not double the obligation. Two promises made in either order bind me identically.

The striking consequence is that promises need no clock. [derived:C8] Two people can exchange commitments by letter, with arbitrary delays, crossing in the mail, duplicated by careless couriers, and once each has received the other's letters they agree on exactly what they owe. Commitment, in its pure form, is a **conflict-free replicated data type** (CRDT): a data structure whose replicas can be updated independently and always merge to the same state. Merchants in the medieval Mediterranean ran credit networks across months of sailing time without any shared calendar finer than the season. [needs-source:C9] That was possible because a network of promises, considered only as promises, converges without coordination. [interpretation:C10]

Nietzsche saw the cost from the inside. To be the kind of creature that can promise, you must carry your constraints with you. You must be a region of high **rigidity**: a self that would take many independent removals to loosen. A person of their word is, in this language, a person whose future admissible set is held in place by redundant structure (memory, reputation, conscience, witnesses), so that no single forgetting releases it. [model:C11]

---

## II. Social Time Is the Arrow of Rigidification

Physics has an old puzzle about why time has a direction when most fundamental laws do not. One proposed answer is that time's arrow is the direction in which constraints accumulate and regions harden: records pile up, and the past becomes rigid because too many independent traces now pin it. [conjecture:C12] Whatever its merits in physics, this answer is nearly a definition in society.

Consider what distinguishes a society's past from its future. The past is the region densely constrained by commitments already made and records already kept: contracts signed, debts recorded, laws enacted, marriages witnessed, borders surveyed. The future is the region where admissible sets are still wide. "Now" is the moving front where new commitments are inserted.

A society with no promises would have no history in any thick sense. Things would happen, but nothing would bind, and so nothing would accumulate. Each day would be compatible with any following day. Anthropologists sometimes describe immediate-return foraging societies as living in a shallow time, with little storage, debt or inheritance. [secondhand:C13] Whether or not that description is fair to any actual people, the structural point holds. The depth of a society's time is the depth of its commitment structure. [interpretation:C14] Writing was invented, in Mesopotamia, mostly to record obligations. [needs-source:C15] The first great technology of historical memory was an accounts ledger.

A civilization is a clock built out of promises. [model:C16] Its tick is the insertion of commitments, and its arrow is the direction in which they harden.

---

## III. The Trust Cone

Whom can you rely on? You can rely on someone when their future behavior is constrained by something that also reaches you. Your friend's promise is backed by memory, reputation and affection. All of those connect your future to theirs. A stranger in another city is, to you, causally disconnected in the relevant sense. Nothing you can invoke constrains them.

Borrow the geometry from the Lorentzian embeddings of the companion embedding essay. Place agents as points. For two agents $x$ and $y$, say that $y$ is in the **trust cone** of $x$ when there is a chain of enforceable constraint running from $x$'s expectations to $y$'s behavior. [definition:C17] This relation is transitive (if I can rely on you, and you can rely on her, then through you I have some claim on her). It is asymmetric in general: a creditor and a debtor stand in different positions. It forms an order, and it has the property that made light cones interesting for data: proximity and accessibility come apart. [model:C18] Your next-door neighbor may be spacelike to you, entirely outside any shared constraint. A trading partner on another continent may sit squarely inside your cone because a court, a bank and a shipping insurer stand between you.

This gives a precise reading of what institutions do. An institution is a machine for widening cone apertures. [model:C19] Courts make strangers' contracts enforceable, which turns spacelike pairs into timelike ones. Money does it for exchange: a coin is a bearer instrument that brings the whole economy inside your cone, at least for the purpose of buying bread. Written law does it for expectations about officials. The history of civilization can be read as the history of opening the cone, from kin to tribe to city to empire to the global payments system. [interpretation:C20]

The embedding essay also gives the next refinement. A single cone forces a single notion of "who is reliable." Real societies have several independent families of constraint: legal, reputational, kinship, religious, financial. Model each as its own Lorentzian block and take the product. Then $y$ is in your cone only if it is in your cone in every block you are relying on. [model:C21] This explains a familiar experience. You can trust a colleague completely with your work and not at all with your secrets. You can rely on a bank's contract and not on its advice. Trust is not a scalar. It is membership in an intersection of cones, and the failures of trust that hurt most are those where we assumed one block implied another.

---

## IV. The Price of a Bound

Here is the central argument. Promises compose without coordination because intersection commutes. But social life does not consist only of adding obligations. We also discharge them, cancel them, transfer them and forgive them. Which of these operations can happen without a shared clock?

Distributed systems theory gives a clean answer, and it is not the obvious one. There are three kinds of operation to distinguish.

**Commit.** Adding a constraint, as in Section I. Commutative and idempotent. Coordination-free.

**Cancel.** Adding an inverse. If I owe you ten and you forgive three, the record becomes "owes ten, forgiven three." Increments and decrements in an abelian group commute, so replicas that see the same multiset of entries agree on the balance no matter the order. (Engineers call this a **PN-counter**, short for positive-negative counter.) Individual forgiveness, recorded as a compensating entry, is coordination-free. [derived:C22] Two people can forgive each other by letter, crossing in the mail, and still agree.

**Spend against a bound.** Here the trouble starts. Suppose there is an invariant: no account may go below zero, no person may promise more than they have, no seat may be sold twice. Two replicas, each seeing a balance of ten, can each approve a withdrawal of eight. Each local state is valid. Their merge is not. This is precisely a failure of invariant confluence. Enforcing a bound on non-idempotent quantities requires coordination. [fact:C23] Before acting, someone has to know what everyone else has already done.

That is why ledgers exist. Value is not idempotent. Spending the same coin twice is not the same as spending it once, and the whole apparatus of banks, clearing houses, notaries and blockchains exists to impose an order on operations that would otherwise be ambiguous. [interpretation:C24] A blockchain is, at bottom, an extraordinarily expensive way of manufacturing a global clock so that a bounded, non-idempotent quantity can be spent safely by strangers. [interpretation:C25] The energy it burns is the physical price of a shared "now."

There is a fourth operation, and it is the one Arendt cared about most.

**Reset.** "All debts are cancelled." This is not a compensating entry. It is an *assignment*: set every balance to zero. Assignments do not commute with concurrent increments. If a new loan is made while the reset is being announced, did the reset cancel it or not? The answer depends on whether the loan happened before or after the reset, and that question has no meaning without a shared cut across the whole network, a consistent global snapshot in the sense of Chandy and Lamport [@chandy1985]. [derived:C26]

This explains a historical fact that otherwise looks like mere custom. Mass forgiveness has always been calendrical. [interpretation:C27] The Mesopotamian kings who proclaimed *andurārum*, the restoration of freedom from debt, did so at accession or on fixed occasions. [secondhand:C28] Leviticus places the Jubilee at the end of seven sabbaths of years, announced by a trumpet on the Day of Atonement, across the whole land at once. [fact:C29] Modern bankruptcy draws its line at a filing date, with an automatic stay that freezes all claims at a single instant. [fact:C30] Yom Kippur, the annual day on which a community seeks forgiveness together, is a scheduled synchronization event.

These are not arbitrary rituals. They are what a reset requires. [interpretation:C31] A society that wants to forgive collectively, and not merely one debt at a time, must first agree on what time it is. The trumpet is a clock signal.

So the claim from the introduction can be stated exactly.

**Thesis:** Promising is free. Individual forgiveness is free. Acting against scarcity, and forgiving everything at once, each require a shared now. Much of what we call social time exists to supply it. [conjecture]

---

## V. No Signaling, No Externality

The precipitation picture of physics needed a selection principle. In a generic constraint network, inserting a constraint at one place changes what is possible everywhere, instantly. If distant agents could detect that change, the theory would permit faster-than-light signaling. The proposed fix was to admit only constraints that do not alter the realizable marginal of any site outside their propagation cone.

Translate this into social terms and it becomes a familiar moral rule. An admissible promise binds only within the promiser's cone. I may constrain my own future, and futures that have consented to be linked to mine. I may not insert constraints that change what is possible for people who are spacelike to me, who have no channel through which to know of the change or answer it.

A factory that pollutes a river is a constraint inserted at one site that silently alters the admissible futures of everyone downstream. In physics we would call it a signaling violation. [model:C32] In the language of incentive alignment it is an externality, and the rule that "those who impose costs shall bear them" is a demand that it be brought inside the cone.

The same principle explains why binding one's successors is suspect. A founder who entrenches an order is inserting constraints into the admissible sets of people who do not yet exist, and who are therefore outside every channel of consent. Their marginals are changed before any propagation can reach them. On this account the moral intuition and the physical one are the same intuition: you may refine your own future, but you may not reach outside your cone. [normative:C33] Consent is the social form of locality.

---

## VI. The Phase Diagram of a Society

Random constraint satisfaction problems show sharp phase transitions as constraint density grows. For sparse random XOR constraints there is a regime where solutions are plentiful and connected, a regime where the solution space shatters into isolated clusters with frozen "backbone" variables, and finally a regime where no solution exists at all. [fact:C34]

Treat a society's commitments as a constraint network and the same phases appear, now as hypotheses rather than theorems. [hypothesis:C35]

**Fluid.** Few commitments. Futures are wide, trust cones are narrow, and almost nothing large can be built because nothing is reliable. Freedom is high and capacity is low.

**Coherent.** Commitments are dense enough that strangers can cooperate, but the admissible set remains connected. A person can move from one occupation, city or class to another by a sequence of small, admissible changes. This is the regime in which most of what we call prosperity happens.

**Frozen.** Commitment density has passed a clustering threshold. The admissible set fragments. Large groups of people become backbone variables, pinned in place by so many redundant obligations (debt, credential requirements, inherited status, entrenched law) that no admissible path leads anywhere else. Social mobility does not decline gradually here. It collapses, because the connected paths between clusters have vanished. From inside, the system still looks orderly. Every constraint is satisfied. Nothing can move.

**Unsatisfiable.** Obligations exceed what any possible future can honor. Debts that cannot be paid, promises that contradict each other, entitlements larger than output. The economist Michael Hudson summarized the historical record in a phrase: debts that can't be paid won't be paid. [secondhand:C36] In constraint language, when no admissible world remains, the network does not stay frozen. It breaks. Defaults cascade, institutions fail, and in the worst case the society undergoes a revolution, which is a reset performed without a shared clock, and is therefore violent, contested and asymmetric. [interpretation:C37]

The toy model in the precipitation essay avoided the unsatisfiable phase by construction: it only ever drew new constraints from what was still admissible. Real societies have no such guarantee. Credit is the mechanism by which agents commit against futures that have not yet been checked for consistency. Credit is enormously productive precisely because it lets a society borrow admissibility from tomorrow. It is dangerous for the same reason.

The ancient jubilee can be read as **annealing**, by analogy with the slow heat treatment of metals and with optimization procedures: a scheduled, synchronized removal of constraint that keeps the network out of the frozen phase before it drifts into the unsatisfiable one. [model:C38] A society that never forgives does not become more just. It becomes rigid, then frozen, then impossible. A society that forgives too often never builds the rigidity on which trust depends. A healthy regime sits near a critical point, where the network is dense enough to carry long-range trust and loose enough that paths between clusters remain open. [hypothesis:C39]

---

## VII. Forgiveness Is Not Forgetting

There is a confusion here that the formalism dissolves. People often resist forgiveness because they think it requires forgetting, pretending that the injury did not happen. In a Boolean constraint network that worry would be justified. Boolean refinement is monotone. The only way to loosen a constraint is to remove it, and removing a record of what happened would be a lie.

But records and obligations are different constraints. The record is a fact about the past, held in place by witnesses, documents and memory. Its rigidity is high, and it should stay high. The obligation is a weight attached to the future. In a richer semiring (a number system with addition and multiplication used to weight configurations), the kind in which quantum amplitudes live, weights can cancel. A new factor can be inserted that interferes destructively with an old one, reducing the net weight to zero, without removing anything from the record.

This is what forgiveness is: not deletion, but interference. [model:C40] The ledger still says "you owe me." A new line says "and I release you." Both remain true, both remain recorded, and their sum is zero. The past stays rigid. The future reopens.

Arendt's pairing now has a precise shape. Promising is monotone refinement: it narrows futures and accumulates rigidity. Forgiveness is non-monotone refinement: it reopens futures without unwriting the past. A world with only the first would freeze. A world with only the second would never hold together. The physics essay argued that quantum strangeness is "the loss of monotonicity in how local resolution accumulates." Human freedom, in this sense, has the same signature. [conjecture:C41] Interference is how a fully recorded past can still leave room for an open future.

---

## VIII. Science Is a Promise Made to Reality

One more application closes a loop. A scientific theory is a promise about the future. It says: in every admissible world, these observations will come out this way. An experiment is the moment of payment. Falsification is default. [model:C42]

Reality is a peculiar creditor. It keeps a perfect ledger, it cannot be persuaded, and it never declares a jubilee. A theory that has defaulted stays defaulted. This is the precise sense in which the apprenticeship of understanding is answerable to something outside us: we may make whatever promises we like, but the counterparty does not negotiate.

And mathematics occupies a place no other practice can. A theorem is a promise whose payment is internal to the promise. Once proved, it cannot default, because the constraint it inserts is satisfied in every world consistent with the axioms. [derived:C43] Mathematicians are the only people whose word, once given correctly, is permanently good. That is part of why the experience of proof feels like discovery and not invention. [conjecture:C44] A valid proof is not a promise you made. It is one you found already kept.

---

## IX. A Model You Could Run

The claims above are only as good as their testable parts. Here is a minimal simulation.

Place $N$ agents on a network. Each agent holds a finite set of possible future actions. At random times an agent makes a commitment to a neighbor, drawn from the current admissible set (so commitments are consistent when made). Some fraction of commitments are **credit**: they are drawn without checking full global consistency, against a bound that later commitments can violate. Agents may forgive individually (insert a compensating factor) at rate $\phi$, and the whole society may undergo a synchronized reset with period $T$.

The following pseudocode sketches the simulation loop; it is a sketch and is not runnable.

~~~text
initialize agents A, network E, admissible sets D_a
repeat:
    a, b  := sample_edge(E)
    c     := sample_commitment(D_a, D_b, credit_prob)
    insert c
    with rate phi:   forgive(random obligation)      # compensating entry
    every T steps:   reset(all obligations)          # requires global cut
    measure: mobility (paths between clusters),
             trust radius (mean cone size),
             frozen fraction (backbone agents),
             default cascades (unsat events)
~~~

The hypotheses are concrete.

- With $\phi = 0$ and $T = \infty$, mobility collapses sharply at a clustering threshold as commitment density rises, well before the network becomes unsatisfiable. [hypothesis:C45]
- Trust radius increases with density up to that threshold and then stalls. [hypothesis:C46]
- Individual forgiveness alone delays but does not prevent freezing when the credit fraction is high, because it does not touch bounded resources that are collectively overcommitted. [hypothesis:C47]
- Some intermediate reset period $T^*$ maximizes long-run trust radius, and the system near $T^*$ shows power-law distributions of default cascades. [hypothesis:C48]

If none of these hold, the essay's central analogy is decorative, and we should say so.

---

## Conclusion

Nietzsche thought that the creature able to promise had to be made, painfully, out of a forgetful animal. Arendt thought that the same creature needed a second faculty to survive the first, the ability to release and be released. The mathematics adds a third observation that neither of them could have stated.

The two faculties are not symmetric. Anyone can promise, alone, in the dark, by letter. Anyone can forgive one debt. But to forgive everyone, all at once, a society has to stop and agree on what time it is. It has to blow the trumpet.

We usually think of shared time as the precondition for working together. It is truer to say that it is the precondition for starting over. [conjecture]

---

## Limits

That promising has the algebra of constraint insertion does not mean that social systems are constraint networks in any deep sense. The formalism is a lens, and it is useful exactly where it predicts something we did not already believe. Analogy is not identity.

The phase diagram is conjectural. Random XOR constraints have proven thresholds, but real commitment networks are neither random nor sparse in the same way, and their thresholds, if any, may be smeared beyond recognition.

History is not a theorem. Jubilees were political acts, often serving kings' interests against creditor elites. That they also satisfied a synchronization requirement does not mean that requirement was why they happened.

Coordination can be bought in other ways. Hierarchy, bilateral netting and conservative local bounds can all avoid global clocks at some cost. The claim is that bounded spending and collective reset need some coordination, not that they need a calendar.

Forgiveness is not only arithmetic. Arendt located forgiveness in the relation between persons. A compensating entry captures the structure of release, not its meaning to the people involved.

Several historical statements (C9, C15) still need sources before this piece can be published. The essay also leans on companion pieces on precipitation, embeddings and quantum structure that are summarized here but not re-derived.

---

## Claim Ledger

| ID | Claim | Status | Basis | Check |
|---|---|---|---|---|
| C1 | Nietzsche opens the second essay of the Genealogy with the question of breeding an animal with the right to make promises | fact | [@nietzsche1887] | Read the opening of the second essay |
| C2 | Arendt names unpredictability and irreversibility as the two defects of action, with promising and forgiveness as their remedies | fact | [@arendt1958] | Read the chapter on action |
| C3 | Invariant confluence characterizes when replicas can operate without coordination and still preserve invariants | fact | [@bailis2015] | Read the paper's main theorem |
| C4 | Promising, forgiveness and distributed-systems coordination are instances of one structure | model; analogy used as a lens | Algebraic parallels in Sections I and IV | Test whether it predicts something not already believed |
| C5 | Which forms of forgiveness need coordination is fixed by which operations commute | derived; given the model in C4 | Commutativity of intersection and addition, non-commutativity of assignment | Check the algebra of each operation |
| C6 | Social time exists mainly to make certain kinds of forgiveness possible | conjecture | Argument of Sections I to VII | No direct test; see C45 to C48 for related simulations |
| C7 | Making a promise is intersecting the admissible set of futures with the set of futures in which it is kept | model | Set intersection | Formalize in a commitment logic and check closure properties |
| C8 | Promises modeled as intersections compose without a shared clock | derived; given C7 | Intersection is commutative, associative and idempotent | Verify the algebraic identities |
| C9 | Medieval Mediterranean merchants ran credit networks over months of sailing time without a calendar finer than the season | needs-source | None yet | Consult economic histories of medieval trade credit |
| C10 | Such networks worked because a network of promises converges without coordination | interpretation | Reading of C8 and C9 | Compare with historical cases where credit required clearing |
| C11 | A person of their word is a region of high rigidity held in place by redundant structure | model | Analogy to rigidity of constraint networks | Operationalize rigidity and compare with measured reliability |
| C12 | Time's arrow is the direction in which constraints accumulate and regions harden | conjecture | Speculative proposal from the companion physics essays | None currently |
| C13 | Anthropologists describe immediate-return foraging societies as living in a shallow time | secondhand; fairness to actual peoples unchecked | Anthropological literature, not checked here | Consult ethnographic sources |
| C14 | The depth of a society's time is the depth of its commitment structure | interpretation | Structural argument in Section II | Compare record-keeping depth with institutional depth across societies |
| C15 | Writing was invented in Mesopotamia mostly to record obligations | needs-source | None yet | Consult histories of early cuneiform accounting |
| C16 | A civilization is a clock built out of promises | model | Analogy of commitments to ticks | Test whether it predicts timing of institutional change |
| C17 | Agent y is in the trust cone of x when a chain of enforceable constraint runs from x's expectations to y's behavior | definition | Stipulated for this piece | None needed |
| C18 | In the trust order, proximity and accessibility come apart | model | Analogy to Lorentzian embeddings | Compare geographic distance with enforceable-contract reach |
| C19 | An institution is a machine for widening cone apertures | model | Courts, money and law as examples | Identify institutions that fail to widen any cone |
| C20 | The history of civilization can be read as the history of opening the trust cone | interpretation | Sequence from kin to global payments | Compare with histories of trade and law |
| C21 | Trust across several families of constraint is membership in the intersection of cones | model | Product of Lorentzian blocks | Check cases where one block does imply another |
| C22 | Individual forgiveness recorded as a compensating entry is coordination-free | derived | PN-counter convergence | Verify convergence under reordering and duplication |
| C23 | Enforcing a bound on non-idempotent quantities requires coordination | fact | [@bailis2015] | Reproduce the double-withdrawal example |
| C24 | Ledgers, banks, clearing houses and notaries exist to impose an order on non-idempotent operations | interpretation | Reading of C23 | Examine institutional histories of clearing |
| C25 | A blockchain is an expensive way to manufacture a global clock, and its energy use is the price of a shared now | interpretation | Reading of consensus protocols | Compare with cheaper consensus designs |
| C26 | Collective reset requires a consistent global cut | derived | Assignment does not commute with concurrent increments; [@chandy1985] | Model concurrent loans and resets and look for divergence |
| C27 | Mass forgiveness has been calendrical | interpretation; historically suggestive | Cases in Section IV | Search for uncalendared mass forgiveness |
| C28 | Mesopotamian kings proclaimed andurārum at accession or on fixed occasions | secondhand | [@hudson2018] | Consult Mesopotamian royal edicts directly |
| C29 | Leviticus places the Jubilee after seven sabbaths of years, announced by a trumpet on the Day of Atonement | fact | Leviticus 25:8-10 | Read the passage |
| C30 | Modern bankruptcy filing triggers an automatic stay that freezes claims at a single instant | fact | Automatic-stay provisions such as 11 U.S.C. 362 | Read the statute |
| C31 | Calendrical jubilees reflect the synchronization requirement of a reset | interpretation; historically suggestive | C26 and C27 | Compare with political explanations of jubilees |
| C32 | Externalities are signaling violations | model; structural analogy | Constraint propagation outside the cone | Check whether the analogy yields a new policy prediction |
| C33 | You may refine your own future but may not reach outside your cone | normative | Consent as the social form of locality | Compare with competing theories of consent |
| C34 | Sparse random XOR constraint problems show a connected regime, a clustered regime and an unsatisfiable regime | fact | [@mezard2003] | Read the cited analysis |
| C35 | Societies' commitment networks show the same phases as constraint networks | hypothesis; untested | Simulation proposed in Section IX | Run the simulation and compare with historical mobility data |
| C36 | Michael Hudson summarized the historical record as "debts that can't be paid won't be paid" | secondhand | [@hudson2018] | Locate the phrase in Hudson's work |
| C37 | Revolution is a reset performed without a shared clock | interpretation | Reading of C26 | Compare revolutions with negotiated debt cancellations |
| C38 | A jubilee acts like annealing, keeping a network out of the frozen phase | model | Analogy to heat treatment and optimization | Compare simulated reset schedules |
| C39 | A healthy regime sits near a critical point | hypothesis; untested | Section VI argument | Check C48 in simulation |
| C40 | Forgiveness is destructive interference, not deletion | model; formal model of a conceptual distinction | Semiring weights that cancel | Check against accounts of forgiveness that require forgetting |
| C41 | Human freedom has the non-monotone signature that quantum strangeness has | conjecture | Analogy to loss of monotonicity | None currently |
| C42 | A scientific theory is a promise, an experiment is payment, and falsification is default | model | Analogy to credit | Check against accounts of theory revision |
| C43 | A proved theorem cannot default | derived; relative to the axioms | Truth in every model of the axioms | Verify the proof |
| C44 | The experience of proof feels like discovery because a valid proof is a promise already kept | conjecture | Section VIII argument | Survey mathematicians' reports |
| C45 | With no forgiveness or reset, mobility collapses sharply at a clustering threshold well before unsatisfiability | hypothesis; untested | Simulation design in Section IX | Run the simulation with phi = 0 and T = infinity |
| C46 | Trust radius grows with density up to the threshold and then stalls | hypothesis; untested | Simulation design in Section IX | Measure mean cone size across densities |
| C47 | Individual forgiveness alone delays but does not prevent freezing when credit fraction is high | hypothesis; untested | Simulation design in Section IX | Vary phi at high credit fraction |
| C48 | An intermediate reset period maximizes long-run trust radius and yields power-law default cascades | hypothesis; untested | Simulation design in Section IX | Sweep T and fit cascade-size distributions |

## References

- [@nietzsche1887] Nietzsche, Friedrich. *On the Genealogy of Morality*. 1887.
- [@arendt1958] Arendt, Hannah. *The Human Condition*. University of Chicago Press, 1958.
- [@bailis2015] Bailis, Peter, Alan Fekete, Michael J. Franklin, Ali Ghodsi, Joseph M. Hellerstein, and Ion Stoica. "Coordination Avoidance in Database Systems." *Proceedings of the VLDB Endowment* 8(3), 2015.
- [@chandy1985] Chandy, K. Mani, and Leslie Lamport. "Distributed Snapshots: Determining Global States of Distributed Systems." *ACM Transactions on Computer Systems* 3(1), 1985.
- [@hudson2018] Hudson, Michael. *...and forgive them their debts: Lending, Foreclosure and Redemption from Bronze Age Finance to the Jubilee Year*. ISLET-Verlag, 2018.
- [@mezard2003] Mézard, Marc, Federico Ricci-Tersenghi, and Riccardo Zecchina. "Two Solutions to Diluted p-Spin Models and XORSAT Problems." *Journal of Statistical Physics* 111, 2003.
# Born Again: Software Freedom After Cheap Reconstruction

## Genetics, Ego, and the Migration of Value from Implementation to Knowledge

---

## Abstract

For forty years, software ownership, software licensing and software freedom have shared an unstated premise: turning a functional idea into working code is expensive. AI-assisted development is breaking that premise. This paper uses two projects as evidence. Tartlet is a small, Apache-licensed reconstruction of a copyleft live-coding language, built for under a hundred dollars in tokens. PhotoCraft is a sprawling AI-assisted attempt to recreate the Adobe suite. Together they show value moving away from the implementation (the *phenotype*) and toward the knowledge artifacts from which implementations can be regenerated (the *genotype*): specifications, semantic laws, conformance suites, compatibility corpora and architectural boundaries.

Three consequences follow. First, implementation provenance becomes a *remediable* property instead of a permanent one. Second, strong copyleft and cryptocurrency maximalism turn out to share an error: both mistake irreversibility for freedom. Third, a sturdier conception of freedom, *freedom as exit*, becomes practical once replacement is cheap. The paper then sets out the limits of this argument in detail: tainted model weights, non-copyright moats, the maintenance cliff, practitioner trust, the inaccessibility of exit to non-programmers, the threat of proprietary enclosure of the genotype itself, and the unsolved question of who pays for the genome.

---

## 1. A Spectacle That Arrived on Cue

Some arguments benefit from an illustration. Occasionally the illustration shows up before the argument is finished.

This paper began as a discussion of a small project. Tartlet is a Strudel-compatible live-coding music runtime, built with heavy AI assistance for a token budget of under a hundred dollars and released under Apache-2.0. Its design documents make a claim that first sounded like a modest engineering slogan:

> The language is the asset, not the implementation.

While that idea was being worked through, a much larger version of it appeared in public. PhotoCraft's repository describes it as an open-source photo editor written from scratch in Rust. It is enormous and extremely active, with thousands of commits. Press coverage presents it as one of seven applications in an AI-assisted effort to recreate familiar Adobe workflows: Photoshop-like, Illustrator-like, Premiere-like, Lightroom-like, Acrobat-like, After Effects-like and InDesign-like tools. The projects are released under permissive MIT/Apache-2.0 terms. The project says it was developed independently from public specifications and observed behavior, not from Adobe code or assets.

The legal commentary followed almost immediately. An analysis titled *PhotoCraft and Adobe: Legal Questions for an AI Rewrite* separated three questions that are often run together:

1. Was the **research process** lawful?
2. Was the **implementation** independently produced?
3. May the **resulting program** be lawfully used and distributed?

That separation is sound legal analysis, and it will return later in this paper as a working discipline as well as a set of questions. This paper does not try to answer those questions for PhotoCraft. Whether PhotoCraft survives legal scrutiny, and whether its tools are any good, is close to beside the point. What matters is the economic fact the project exposes, whatever its eventual fate.

The fact is this. The cost of producing a working implementation from a known functional target is collapsing. When that cost collapses, much of what we have believed about software ownership, licensing and freedom has to be reconsidered. That includes the beliefs of the people who most opposed software ownership.

---

## 2. The Assumption That Sprang a Leak

Software intellectual property has long rested on an implication so familiar that it is rarely stated:

> Photoshop represents decades of accumulated implementation labor; **therefore** reproducing its functional surface independently would require another gigantic accumulation of implementation labor.

The first clause is historical fact. The second has been treated as a law of nature. Together they made source code a form of concentrated capital. Holding the implementation meant holding something rivals could not cheaply obtain. Copyright protected the expression, trade secrecy protected the internals, and the sheer cost of recreating either protected everything else. Copyright protects literal expression, not functional ideas or methods of operation. So the practical barrier to a functional clone was never the law alone. It was the law combined with the expense of an honest clean-room rewrite.

AI-assisted development attacks the second clause.

The present quality of the PhotoCraft family does not matter much to this observation. Early versions of any reconstruction will be rough. What matters is that someone is attempting, in public, a coordinated reproduction of the working surface of an entire professional software suite, and treating it as a plausible undertaking instead of a decade-long crusade. A few years ago the same project would have been a punchline.

If the cost of typing out an implementation is falling toward zero, something else has to be the scarce input. A rough inventory:

- **knowledge of what should exist**: which features matter, which behaviors users depend on, which edge cases are load-bearing;
- **specification**: that knowledge made explicit and precise;
- **tests**: the specification turned into executable judgments;
- **interoperability**: the file formats, protocols and conventions that tie a tool to its ecosystem;
- **validation**: evidence that an implementation actually does what the specification says;
- **taste**: the hard-to-formalize sense of what feels right, which separates a usable tool from a technically conforming one.

None of these is the implementation. All of them are what you need to produce one. The valuable thing has moved up one level of abstraction.

---

## 3. Tartlet: The Small Version of the Same Experiment

Tartlet runs the same experiment at a scale where every part of it can be examined.

Strudel is a browser-based live-coding environment for algorithmic music. It descends from the TidalCycles tradition of pattern languages and has a substantial community and a large body of existing compositions. Strudel is copyleft-licensed. Tartlet aims to be compatible with Strudel's language: existing programs should run and should sound as their authors intended. Tartlet itself is Apache-2.0, and its implementation is meant to be independently produced.

That combination usually triggers a familiar legal ritual, the clean room. A traditional clean-room effort works roughly like this:

1. One team studies the original and writes a functional specification free of protected expression.
2. A second team, which has never seen the original source, implements from that specification alone.
3. Lawyers document the separation, keep records and certify the genealogy of every line.

The design rests on a picture of knowledge as contamination. Anyone who has seen the forbidden source carries it. Anything they write that corresponds to it is suspect. Proving innocence means proving lineage: who saw what, when, and what they produced afterward.

Tartlet's design documents took that picture seriously, and so they invested heavily in the artifacts of the first team:

- **semantic laws** that describe how patterns compose, transform and evaluate;
- **intermediate-representation contracts** that fix the boundary between parsing and evaluation;
- **compatibility matrices** that list which language features are supported and to what fidelity;
- **behavioral-oracle specifications** that define how observed upstream behavior can serve as ground truth without importing upstream code;
- **security invariants** for a system that runs user-supplied code in a browser;
- **property tests** that check algebraic laws over generated inputs;
- **corpus benchmarks** that measure compatibility against real compositions;
- **resource policies** governing samples, sounds and their provenance;
- **architectural boundaries** that keep components separable and replaceable.

On the traditional view, these documents exist to protect the implementation. They are the scaffolding around the valuable building.

The PhotoCraft spectacle suggests the reverse. The documents may be the valuable building, and the implementation may be the scaffolding.

---

## 4. Provenance as a Remediable Property

Consider the most ordinary provenance incident Tartlet could face. Someone files an issue:

> Lines 421–570 of your pattern combinator look disturbingly similar to upstream.

Perhaps the resemblance is coincidence. There are only so many ways to write a cycle-aware time-span intersection. Perhaps a model reproduced something from its training data. Perhaps a contributor really did look where they should not have. In a traditional project the cause hardly affects the outcome, because the architecture of accumulated labor determines the outcome.

In a traditional project, that module sits under three developer-years of work. Other modules depend on its quirks. Its authors have moved on. Nobody fully understands it, and nobody wants to disturb it. The issue becomes a legal emergency because the remedy, rewriting the affected code and everything that has grown around it, is very expensive. The project is pushed toward denial, minimization or a long forensic reconstruction of its own history.

Tartlet's response can be close to mechanical:

1. Delete the module.
2. Give the independent specification and conformance suite to a fresh implementer, which in practice means another model, working only from those artifacts.
3. Regenerate the implementation.
4. Run the tests.
5. Ship.

The second step hides a wrinkle that should be stated precisely. A traditional clean room certifies that the implementing team has never seen the original. Strictly speaking, only a human implementer can be vouched for in that way. Frontier models are trained on enormous scrapes of public code, which very likely include the copyleft upstream itself, and nobody can certify that a given model has "no exposure." Lawyers call this *latent access*, or the tainted-weights problem.

It would be the wrong lesson to conclude that remediation must go back to human teams. That would restore exactly the cost structure that made remediation impossible in the first place, and it would treat human memory as far more auditable than it is. The useful lesson is that the burden of proof changes shape. The project stops trying to prove the implementer's ignorance and starts demonstrating that the output is *dictated by the specification*. Concretely, it does three things:

- logs every prompt, specification input and model version used to generate code;
- regenerates a disputed module across structurally distinct models, including, where available, open-weights models trained on permissively licensed data;
- shows that independent generations converge on the same structure because the functional constraints leave few reasonable ways to express it.

That is an empirical argument for the merger doctrine and *scènes à faire*: where an idea can be expressed in only a handful of ways, the expression follows the idea and is not protected. If one regeneration does reproduce upstream expression, the line-up of alternatives shows which output to discard. The method is cheaper than a human clean room and arguably more probative, because it replaces testimony about what someone did not see with evidence about what the specification forces.

The incident is still not trivial. It deserves investigation and an honest response. But it is no longer existential. The project does not have to prove that every token it ever produced was innocent. It has to maintain a body of uncontested knowledge artifacts sufficient to justify one sentence:

> Fine. Burn that implementation. We'll make another one.

That leads to a sharper version of the thesis. "Implementation is expendable" is true but too conservative. A better statement is:

> **Implementation provenance is a remediable property when independent reimplementation is cheap.**

This is a different risk regime. Under the old one, provenance was a permanent fact about an artifact. A contaminated module stayed contaminated, and its cost spread to everything built on it. Under the new one, provenance behaves more like a repairable defect. A tainted component is replaced, much as a component with a security vulnerability is patched. The legal question does not disappear. Its cost structure changes. In accounting terms, a large upfront capital expenditure, the years of implementation labor that a rewrite would have to reproduce, collapses into a recurring operational expense. The forward-looking cost of curing a contaminated module approaches the price of the compute needed to regenerate it plus the cost of verifying the result. Liability for copies already distributed is a separate matter. What is capped is the cost of ending the exposure.

### 4.1 What Remediation Actually Requires

The condition matters, and it is more demanding than the five-step list suggests. Remediation is only cheap if the knowledge artifacts are themselves clean, complete enough to support regeneration, and kept separate from the implementations they generate. A project that lets its specification decay into a description of whatever the code currently does has lost its means of remediation. The discipline that used to protect the implementation now has to protect the specification.

Three engineering practices follow.

**Regenerate modules, not monoliths.** Nobody should expect to burn and rebuild a tangled codebase in one pass. Remediation works when the system is decomposed into narrow, preferably side-effect-free modules that communicate through explicit, serializable intermediate representations. The IR contract is what makes a module replaceable. It tells the regenerator exactly what must go in and what must come out, and it limits the damage if a regeneration goes wrong. Tartlet's boundary between parsing and evaluation is an instance of this.

**Treat the source tree as a build cache.** The most aggressive form of the idea treats `src/` less as a treasury and more as a transient artifact compiled from the specification. Under that discipline, the same operation that cures copyright taint also clears out technical debt and carries the project across language boundaries. Porting the evaluator from TypeScript to Rust becomes a regeneration against the same conformance suite, not a heroic migration.

**Run burn drills.** A fire escape that has never been used is a hypothesis. The only way to know that the specification is still sufficient is to periodically delete and regenerate non-critical modules in continuous integration and confirm that the conformance suite still passes. A drill that fails is valuable. It shows that knowledge has leaked out of the specification and into the code, which is exactly the drift that would make a real remediation impossible. Burn drills keep the genome honest.

---

## 5. Where the Value Went

If value is moving from implementation to knowledge, it helps to be exact about what that knowledge is. There are three layers.

**Phenotype.** This is the running code: `core.ts`, the evaluator, the scheduler, the audio graph. It is what users execute, and it is increasingly the cheapest thing in the project to produce.

**Genotype.** This is the information from which phenotypes are built: the language definition, behavioral specification, semantic laws, conformance tests, compatibility corpus and architectural invariants. It is expensive because it encodes judgment about what matters, what counts as correct and where the edges are.

**Environment.** This is the ecosystem that rewards or punishes particular phenotypes: browsers, audio APIs, user expectations, existing compositions, licensing regimes, legal climates. Nobody owns it, and it changes without asking permission.

For most of software history these layers were fused. The specification was implicit in the code, the tests were incomplete, and the knowledge of what the system should do lived in the heads of the people who had written what it did. Owning the implementation meant owning everything, because the other layers could not be separated from it.

AI-assisted reconstruction pulls the layers apart. Once they are separate, the questions people have fought over for forty years start to look like questions about the cheapest layer: who holds the source, who may modify it, what obligations travel with copies. This cuts in both directions. Cheap specification-driven reconstruction weakens the ability of proprietary source code to prevent functional clones. It equally weakens the GPL's ability to compel reciprocity by holding valuable code hostage to its terms.

This is where the argument moves from engineering into philosophy, because one of the most influential traditions in computing built its whole program around the phenotype.

---

## 6. The Freedom Machine That Becomes a Cage

Tartlet's licensing choice sits inside a larger question:

> Can freedom be guaranteed by making certain future choices impossible?

Two movements in computing history give closely related answers: **copyleft** and **cryptocurrency**.

On the surface they are opposed. Copyleft distrusts proprietary owners and turns copyright against them. Cryptocurrency distrusts institutional intermediaries and replaces them with cryptographic consensus. Their communities, politics and aesthetics often differ sharply.

Underneath, both pursue freedom through the same move:

1. Identify an authority that cannot be trusted.
2. Replace discretionary judgment with mechanically enforced rules.
3. Make those rules deliberately hard for later participants to undo.
4. Call the resulting loss of options *freedom*.

The first three steps can be defended in particular circumstances. The fourth is the mistake.

### 6.1 Copyleft: Freedom Through Mandatory Inheritance

The moral intuition behind copyleft is understandable and in many ways admirable. The GNU Project holds that users should be free to run, study, modify, copy and redistribute software. It saw a real problem: software released permissively can be absorbed into proprietary products, and the freedoms the original author granted then disappear for downstream users.

Its answer was not merely to grant freedom but to make the grant hereditary. Anyone who redistributes copyleft software, or covered derivatives of it, must pass the same freedoms on to the next recipient. The freedom is attached to the descendants.

This produces an odd inversion. The license effectively says:

> You must remain free in the manner I have specified.

The mechanism is not voluntary generosity spreading through a community. It is copyright power spreading through a dependency graph. Copyleft advocates are unusually candid about this. Software Freedom Conservancy describes copyleft as built on copyright and as using copyright's enforcement mechanisms to protect downstream freedoms. It also warns that enforcement can become overly punitive, or can lend legitimacy to unjust features of copyright itself.

That tension is structural, not incidental. Copyleft tries to defeat coercive exclusion by taking up the legal power of coercive exclusion and pointing it the other way. Call it the One Ring theory of licensing:

> Yes, this is an instrument of domination, but we are going to use it to make everybody free.

The intentions can be good while the mechanism contradicts them. There is also a further consequence that is easy to miss. Copyleft fixes its attention on the implementation. Its whole apparatus, including source-availability requirements, derivative-work boundaries and linking debates, exists to govern what happens to particular bodies of code. It takes for granted that this code is precious, that holding it is power, and that the main fight is over access to it.

### 6.2 Cryptocurrency: Freedom Through Irreversible Execution

Cryptocurrency approaches the same fear from the other side.

Suppose banks, governments, payment processors, courts and human administrators cannot be trusted. One response is to reduce their ability to step in after a transaction has happened.

Bitcoin's base layer is designed for transaction finality. Its computational architecture makes sufficiently confirmed history impractical to change, and it replaces a central authority with distributed protocol consensus. The benefit is real: nobody can arbitrarily reverse your payment.

Consider the price, though. Nobody can reverse your catastrophic mistake either.

The ledger may be effectively immutable, but the real-world consequences of what it records remain subject to ordinary law. Courts have ordered mistakenly transferred tokens to be returned. The ledger was not edited. The law simply acted on the people involved, as it always has. Discretion, removed from the protocol, comes back in through another door.

This is the same conceptual error as copyleft's. A system removes one dangerous human capability and then calls the inability to use that capability liberation.

### 6.3 Mirror Images

Set side by side:

- **Copyleft:** *We cannot trust future owners, so bind future owners.*
- **Cryptocurrency:** *We cannot trust future arbiters, so remove future arbitration.*

Both turn a legitimate distrust of concentrated power into a preference for irreversibility.

Irreversibility looks principled when you picture your enemy. It looks different when you picture yourself:

- You find a license incompatibility that blocks a combination everyone involved wants.
- You send funds to the wrong address.
- The technology changes underneath the rules.
- An emergency arises that the rules never anticipated.
- Two rules interact in a way neither of their authors foresaw.
- Something that looked morally obvious in 1989 looks absurd in 2029.

The core problem is that the future holds information the present does not have. A system built on irrevocable commitments necessarily denies some of that future information a say in the decision.

This is not automatically bad. Sometimes finality is exactly what is needed. Database commits, signatures, constitutional protections, property titles and settlement systems all exist for good reasons. But finality is a tradeoff. It is not another word for freedom.

### 6.4 The Missing Primitive Is Exit

A sturdier idea of freedom is not:

> Nobody may ever take this away from me.

Nor is it:

> Nobody may ever reverse what I do.

It is:

> **I can leave.**

In practice that means being able to fork it, replace it, rewrite it, migrate the data, pick another implementation, join another institution, and reverse a bad decision when everyone affected wants it reversed.

Software is unusually well suited to this kind of freedom because software is information. The GNU Project itself stresses that software differs from physical goods because it can be copied and changed easily. Followed to its conclusion, that observation leads somewhere other than mandatory copyleft. It leads to **making replacement cheap**.

This matters a great deal in an age of machine-generated software. If reproducing an implementation takes ten developer-years, control of that implementation is real power, and fighting over access to it makes sense. If an independent reconstruction from specifications, tests, observed behavior and public interfaces costs less than dinner, the situation changes completely. Exit becomes available in two directions at once. A user can walk away from a proprietary landlord without waiting for permission. A developer caught in the crossfire of viral license incompatibilities can walk away from that too, by regenerating an implementation from shared knowledge instead of litigating over whose code may be combined with whose.

The important freedom is then no longer:

> You must give me your implementation.

It increasingly becomes:

> **I don't need your implementation.**

This is a far more serious attack on software monopoly than any license clause. A license tells a monopolist what it must share. Cheap reconstruction makes the monopolist's holdings worth less.

---

## 7. Genetics Versus Ego

The analysis so far points to an axis deeper than permissive versus copyleft, or decentralized versus institutional. The real axis is **genetics versus ego**.

Genetics has a harsh but effective theory of persistence:

> Don't make the organism immortal. Make reproduction reliable.

Individual organisms are disposable. What lasts is enough information to build another one, along with variation, recombination, mutation and selection. The genome makes no promises about any particular body. It persists because it can be expressed again under new conditions, and because bad expressions can be discarded without losing the information.

The ego takes the opposite approach:

> Preserve *this* particular thing. Preserve my intentions. Preserve my rules. Make the future keep faith with me.

With this distinction in place, the analogy between copyleft and cryptocurrency becomes much clearer.

### 7.1 Copyleft Is Genetic Information Behaving Egotistically

Biological inheritance says roughly:

> Here is information sufficient to make descendants. They will become whatever survives.

Strong copyleft says:

> Here is information sufficient to make descendants, and I have attached a legal mechanism requiring those descendants to preserve my reproductive ideology.

It does more than reproduce. It tries to govern its descendants, so that every future expression of the code carries the founding covenant. It is a genome with a will attached.

### 7.2 Cryptocurrency Is Ego Projected into Time

The blockchain impulse complements this:

> My action now must remain authoritative against all future reconsideration.

Make the ledger hard to rewrite. Keep discretion to a minimum. Replace institutional memory and judgment with lasting commitment. Here too, the present self tries to bind its future selves and everyone else's.

### 7.3 Tartlet Points Toward the Genetic Model

This is why the under-a-hundred-dollars figure says more than "development is cheap." Once implementation is cheap enough, the winning strategy stops being *protect the organism* and becomes **protect the genome**.

For Tartlet, the genome is:

- the language;
- the behavioral specification;
- the compatibility corpus;
- the semantic laws;
- the conformance tests;
- the architectural invariants;
- the accumulated musical knowledge about what patterns should sound like.

`core.ts` is phenotype. If it becomes a liability, burn it and generate another.

Conditions will change. Licenses shift, browsers change their audio APIs, dependencies turn hostile, or it becomes clear that yesterday's architecture was a mistake. Through all of that, what matters is that the information needed to reproduce stays available, uncontested and complete. The burn drills of Section 4.1 are this principle made operational: they are the routine proof that the genome can still produce a viable organism.

So the founding line of Tartlet's design documents:

> The language is the asset, not the implementation.

has a deeper form:

> **The genome is the asset, not the organism.**

---

## 8. Tartlet Chooses Reproducibility Over Inheritance

This is why Tartlet is Apache-2.0.

The reason is not that permissive licenses are morally pure. They also live inside copyright law and depend on its machinery. Nor is it a claim that authors deserve no recognition or that communities deserve no reciprocity. Attribution matters, and so does contributing back.

The reason is simpler. Tartlet does not try to secure its future by controlling its descendants. Its defenses are architectural:

- **the language is public knowledge**: anyone can learn it, teach it and write it;
- **compatibility is behavioral**: defined by what programs do, not by whose code runs them;
- **the specification is explicit**: written down, versioned and kept separate from any implementation;
- **tests describe observable properties**: they judge behavior, not lineage;
- **interfaces are replaceable**: components can be swapped without disturbing the whole;
- **implementations are disposable**: none of them is sacred;
- **documents remain source-readable**: compositions stay legible and portable as text;
- **resources carry provenance**: samples and assets have documented, separable origins;
- **hosts keep their own licensing choices**: embedding Tartlet imposes no covenant on the embedder.

Someone may take Tartlet, modify it, close their implementation and sell it.

Fine.

Someone else can implement Tartlet again.

That is not the freedom model failing. That is the freedom model.

There is also a plainer, almost economic argument for the choice. Permissive licensing is the natural equilibrium for disposable phenotypes. If anyone can regenerate the implementation from public knowledge for the price of a modest token budget, restrictive terms on that implementation create legal friction for every honest embedder while protecting nothing, because the restriction can be routed around by regeneration. A covenant on a phenotype that anyone can rebuild is a fence around a field with no walls on the other three sides.

The copyleft tradition would call this naive and point to decades of companies absorbing permissive code and giving nothing back. That criticism had force in a world where implementation was scarce. If the absorbed code embodied years of labor that no rival could reproduce, absorbing it was a real transfer of power. The question now is whether that world still exists. If a closed fork can be matched by an open reconstruction from the same public knowledge, the closed fork has captured a phenotype. The genome stays free, because it was never in the fork's control. Whether the genome can itself be captured is the strongest form of the copyleft rebuttal. Section 10 takes it seriously.

---

## 9. Cheap Reconstruction Changes the Politics of Software

For most of software history, implementation was concentrated labor. That made source code scarce enough that arguments about who held it, who could change it and what obligations followed copies were very important. The free software movement, the open source movement, the proprietary industry and the clean-room tradition all grew up in that scarcity. Each of them, in its own way, treated the implementation as the prize.

Generative systems are starting to erode that scarcity. Tartlet pushes on the boundary deliberately, and PhotoCraft pushes on it at a scale that is hard to ignore. If an independently maintained specification, corpus, compatibility behavior and conformance suite are enough to cheaply build another implementation, the implementation starts to look less like the project's accumulated capital and more like a reproducible projection of its knowledge.

That sharply lowers the stakes of any single copy:

- If an implementation becomes legally questionable, replace it.
- If its architecture becomes ugly, replace it.
- If its dependency graph becomes hostile, replace it.
- If someone captures the project, fork the specification and replace it.

The same logic reaches past developers to the people who use the tools. For a musician, a photographer or an editor, the durable asset is not the application. It is the work, and the notation the work is stored in. A Strudel composition is a text file of patterns. A photographic edit can live in an XMP sidecar next to the untouched raw file. An edit decision list can live in OpenTimelineIO. When creative intent is stored in open, human-readable, formally specified notations, the practitioner has an exit that no vendor controls. Operating systems will change and vendors may turn predatory, but as long as the notation is specified, cheap reconstruction can always produce a new engine to render the work. The practical advice is to invest in formats, not applications. Enterprise buyers who decouple their workflows from proprietary binaries are applying the same genetics, one level closer to the user.

When reconstruction is cheap enough, freedom does not need legal inheritance or cryptographic permanence to defend it. It needs the knowledge to remain public, and the knowledge to remain sufficient.

---

## 10. Objections and Limits

An argument this sweeping should face its strongest objections. Several are serious, and some are not fully answered here.

It helps first to separate what is broadly agreed from what is contested. Across legal, technical, economic, open-source and practitioner perspectives, agreement is near-total on several points. Clean-room analysis should keep research, implementation and distribution separate. Regeneration requires strict modular boundaries and property-based testing. Value really is migrating toward specifications and tests. Patents and proprietary data are immune to behavioral cloning. And funding the specification commons is an urgent economic problem. The disagreements are elsewhere, and they are of two kinds. One is normative: whether permissive or reciprocal licensing should govern the new knowledge artifacts. The other is empirical: the complexity ceiling beyond which specification-to-code synthesis breaks down. The objections below fall on both sides of that line.

**The specification can be contaminated too.** If cheap reconstruction moves the valuable layer from implementation to specification, disputes will move with it. A specification derived too closely from protected source, or a test suite that encodes protected expression, simply relocates the provenance problem. This is true and important. The clean-room discipline does not vanish. It concentrates on a smaller, more readable and more auditable set of artifacts, and its first rule becomes absolute: never produce a specification or test suite by feeding upstream source code, proprietary or copyleft, into a model. The genotype should be derived from public documentation, academic literature and black-box observation of behavior. Tartlet's behavioral-oracle specifications exist for this reason: they let upstream behavior serve as ground truth without upstream code ever entering the pipeline. Auditing a specification and a conformance suite is a far more tractable job than auditing a large codebase, and a contaminated specification can itself be rewritten from observed behavior. Remediation applies one level up as well.

**Not everything is reconstructible from behavior, and not all observation is lawful.** Cheap reconstruction gets around copyright in the implementation and nothing else. Several other moats are untouched, and some grow more important as copyright weakens:

- *Patents.* Utility and design patents cover methods and ornamental designs however they are implemented. Independent creation is no defense to patent infringement.
- *Contracts and anti-circumvention law.* Automated probing of proprietary software to build a behavioral oracle can violate anti-reverse-engineering clauses in EULAs and terms of service, and probing that defeats technical protection measures can run into DMCA § 1201. The research phase has to be lawful before its outputs can be clean. That means auditing upstream terms before probing begins, and sometimes conducting research in jurisdictions with unwaivable interoperability exceptions, such as the European Union.
- *Trademarks and trade dress.* Cloning a recognizable interface layout and workflow invites Lanham Act litigation whatever the code's lineage.
- *Unobservable assets.* Cloud state, network effects, proprietary datasets, presets, color science and server-side model weights cannot be reconstructed from client-side observation.

This is the main reason Tartlet and PhotoCraft are not the same case. Tartlet reconstructs an openly documented language whose upstream is itself open source. PhotoCraft reconstructs commercial products wrapped in patents, trademarks, license terms and server-side assets. Responsible distribution of a commercial clone therefore requires a final phase after research and implementation: patent freedom-to-operate searches, and deliberate differentiation of interface layout and branding to avoid design-patent, trade-dress and trademark liability. The thesis is narrower than "all software is now free." It is that the implementation layer, the layer copyright and copyleft cared most about, is losing its scarcity.

**The hundred-dollar figure is a scaling fallacy.** The skeptic's objection is that a cheap rewrite of a small, mathematically tidy language says nothing about production software. An AI-generated facade that looks like Photoshop is not production engineering. A project that generates hundreds of thousands of lines nobody understands is heading for a maintenance cliff, the moment when a human must debug code that was hallucinated, half-understood, or both. This objection deserves to be granted in part. Tartlet's domain is bounded and largely algebraic. Its semantics can be written down as laws, and its correctness can be checked against a corpus. A media suite runs on undocumented heuristics, GPU performance quirks and decades of accumulated user expectation. That is Hyrum's Law: with enough users, every observable behavior becomes something someone depends on. It is also Brooks's old point that the essential difficulty of software lies in specifying intent, not in typing syntax. For such systems, a specification complete enough to regenerate the tool without regressions may approach the complexity of the code itself. Where that ceiling lies is genuinely unknown. The argument of this paper does not depend on its being high. It depends on the cost of regeneration falling relative to the cost of specification, and on architecture that keeps the unit of regeneration small. A project that regenerates modules behind narrow IR boundaries does not debug a hundred thousand alien lines. It discards the failing module and regenerates it against a sharper specification. A project that regenerates a monolith deserves the cliff.

**Disposable runtimes destroy tool trust.** The practitioner's objection is different and in some ways sharper. A live coder on stage or a retoucher on deadline depends on deterministic stability and muscle memory. A regenerated scheduler that passes every functional test can still introduce a timing regression of a few milliseconds, a slow memory leak, or an uncanny-valley wrongness in an interface that nobody can name but everyone can feel. Tools are trusted because they stay the same. This is correct, and it clarifies what the thesis claims. Disposability is a property of the development process, not of the release. Regeneration belongs in burn drills and continuous integration, not in the middle of a performance. Released versions should be pinned and boring. Because practitioners rely on behavior the functional tests do not capture, the conformance suite has to grow to cover it.

**Taste and validation remain expensive.** A conforming implementation is not necessarily a good one. The gap between passing the tests and feeling right to a musician or a photographer may be where most of the remaining value sits. That supports the thesis, since it confirms that value has moved away from typing code and toward judgment that is hard to formalize. It also means the genome has to include more than formal assertions. Static unit tests invite Goodhart's Law: a model optimizing against them will learn to satisfy the tests instead of the intent. Conformance suites built to resist this rest on property-based testing of algebraic invariants, fuzzing, differential traces against reference behavior, and non-functional gates such as strict latency budgets, memory ceilings, and perceptual audio and visual diffing that measure whether output *sounds* and *looks* right, not merely whether it matches. Beyond the tests, the genome must hold corpora of real usage, documented reasons for design decisions, and recorded taste.

**"Freedom as exit" is a technocrat's freedom, and the Tartlet model is license laundering.** The sharpest objection from the free software tradition rejects the frame entirely. On this view, copyleft is not ego. It is a defensive shield that stops intermediaries from subjugating end users. And a project that reconstructs a copyleft language under a permissive license is not exercising freedom. It is automated license laundering, a form of commons parasitism that takes the value a reciprocal community created and releases it on terms that let others enclose it. Worse, exit is available mainly to people who can exercise it. A farmer with a locked tractor or a patient with an implanted medical device cannot prompt a model to rebuild a software stack. Even if they could, cheap code does nothing against hardware that refuses to run modified software. The anti-Tivoization provisions of GPLv3 address exactly that harm, and no amount of cheap reconstruction replaces them.

Part of this should be conceded outright. Exit through regeneration does not defeat hardware locks, and where a device refuses to run anything but signed vendor code, the legal guarantees of copyleft protect something that cheap reconstruction cannot. The laundering charge applies wherever a "reconstruction" is really a translation of upstream source, which is why the clean-research discipline above is not optional. But two replies stand. First, exit is collective. The farmer does not need to prompt anything. Someone else regenerates the implementation, just as most users of free software have never read its source. Second, Tartlet does not take Strudel's code. It reproduces Strudel's *language*, which was never anyone's property, so that the community's compositions can be played in more places. Making a community's work more portable is a strange kind of parasitism.

**Copyleft built real things.** The GPL protected a commons in which Linux, the GNU toolchain and much of modern infrastructure grew. Under the economics of its time it was arguably the right tool. The argument here is not that copyleft was always wrong. It is that copyleft's mechanism, hereditary control over implementations, answered a scarcity that is now dissolving, and that its built-in preference for irrevocable covenant was always in tension with the freedom it aimed to protect.

**The genome itself can be enclosed: Embrace, Extend, Extinguish 2.0.** This is the strongest objection, because it accepts the thesis and turns it around. If value has moved to the genotype, then the genotype is what will be captured. A large platform absorbs a permissively licensed reconstruction or a public specification, extends the genotype in private with proprietary features, proprietary format extensions and private conformance tests, and wraps the result in a closed SaaS offering. Users migrate to the richer, extended version, the public specification falls behind, and eventually it describes a language nobody speaks. The copyleft conclusion is that reciprocity must move up a level: strong copyleft, AGPLv3 or GPLv3, should cover the genotype itself.

A more measured version of this argument proposes bifurcated licensing: reciprocal terms on the genotype and flexible terms on the phenotype. Anyone who extends the formal specification, the compatibility corpus or the conformance suite would have to share those improvements back. Implementations generated from the genotype could be licensed permissively or adapted to particular runtime needs. Where end-user installation locks or SaaS enclosure are the main threats, strong copyleft across the whole stack remains essential.

Notice what this proposal concedes. It abandons the forty-year argument over licensing source code and accepts that the genome is the asset. Whether reattaching a covenant to the genome repeats the ego error at a higher level is an open question, and this paper does not pretend to close it. Two considerations count against urgency in Tartlet's case. First, the extend-and-extinguish strategy works only if users' work becomes locked into the private extensions. Communities that keep their creative work in openly specified notations can refuse the extensions without losing anything. Second, a public conformance suite combined with a compatibility mark (below) gives the public genotype an authority that a private fork cannot easily claim. This remains the clearest normative disagreement in the field, and reasonable projects will resolve it differently.

**Finality has legitimate uses.** Settlement, signatures and constitutional limits work because they cannot easily be undone. The objection to cryptocurrency maximalism is not that finality is bad. It is that finality was mistaken for freedom, and that systems built on that mistake keep needing outside discretion, from courts, social consensus or forks, to correct what they claimed could not be corrected.

**Who pays for the genome?** If implementations become cheap phenotypes, the costly work of discovering what software should do, through usability research, domain taste and exhaustive conformance suites, needs a sustainable model. If commercial actors can free-ride on a public specification and contribute nothing back, the result is a tragedy of the commons in its most literal form. Copyleft at least offered a theory of reciprocity. Permissive reconstruction has to find its own. The most promising candidate is borrowed from the standards world. Open-source foundations would shift from funding code maintenance to funding *specification stewardship*. The specification stays open, and the foundation monetizes a compatibility trademark, a "Certified Tartlet Compatible" or "Certified PhotoCraft Compatible" mark. Commercial vendors pay to run the official conformance suite and display the badge, and that revenue pays the domain experts who curate the genome. The model fits the thesis: it charges for the scarce thing, verified conformance to curated knowledge, instead of the abundant thing, code. It also has a defensive side effect, since a certification mark gives the public genotype authority over private extensions. It is unlikely to be the whole answer. This remains the most important unsolved problem in the argument and deserves its own paper.

---

## 11. Do Not Solve Distrust by Abolishing Discretion

The error shared by strong copyleft and cryptocurrency maximalism goes deeper than either technology. It is the temptation to answer bad governance with less governability.

Sometimes that works. Sometimes the property you need is that nobody can interfere.

But human systems keep meeting new circumstances. Values conflict, mistakes happen, technologies change, and rules interact in ways their authors did not foresee. A civilization that can change its mind is not necessarily weaker than one whose founders managed to stop it from doing so. Often it is stronger. The same test applies to the proposals of the previous section. A covenant on the genome, a certification regime or a foundation's stewardship should each be judged by whether it leaves room for tomorrow to disagree with today.

Good institutions need something harder to build than immutability:

- agency without captivity;
- rules without worship of rules;
- commitments with understood escape hatches;
- interoperability instead of dependency;
- forkability instead of hereditary obligation;
- replacement instead of ownership warfare;
- and enough humility to accept that tomorrow may know something today does not.

---

## 12. Conclusion: Software That Can Always Be Born Again

This brings the argument back to Tartlet's founding observation:

> The language is the asset, not the implementation.

Its implications reach well beyond music. When knowledge can cheaply regenerate machinery, holding yesterday's machinery matters less.

The GPL's answer to software enclosure was:

> You may use my machine, provided your descendants remain subject to this covenant.

Cryptocurrency's answer to institutional abuse was:

> You may transact without the institution, provided nobody gets to reconsider the transaction.

Tartlet gives a third answer:

> **Keep the knowledge sufficient to build another machine.**

That answer does not require an eternal covenant, an immaculate implementation lineage or an irreversible ledger. No particular pile of source code has to become sacred. It does demand discipline of a different kind. The research behind the knowledge must be clean. The knowledge must be kept separate from the code it generates and regularly tested by burning that code. The knowledge must capture taste and timing as well as function, and someone must be paid to keep it current. None of this is free. All of it is cheaper and more honest than guarding a single body of code forever.

When somebody owns the machine, build another machine.
When yesterday's implementation becomes baggage, throw it away.
When the rules stop serving their purpose, change the rules.

The strongest form of technological freedom does not make your preferred arrangement impossible to change. It makes alternatives cheap enough that nobody can hold the future hostage.

The final irony is this. Software freedom has spent decades trying to make artifacts immortal, and it has done so just as computation approaches the point where individual artifacts need not matter much. The post-LLM definition of durable software may not be software that cannot be taken away.

It may be software that can always be born again.

That is the bet Tartlet makes. PhotoCraft, intentionally or not, is placing the same bet on a much larger table, one where patents, trademarks and unobservable assets will test how far the bet extends.
# Show Me the Work

## The Structure of Epistemic Revolutions After the Collapse of the Cost of Thinking

### Abstract

Thomas Kuhn showed that science does not simply accumulate truths. It moves through paradigms: shared frameworks that decide which puzzles are legitimate, which methods count, and which anomalies can be safely ignored until they can't. Kuhn described how scientific communities change what they believe. This paper argues that we are now living through a change one level beneath that. The material conditions that shaped every knowledge institution of the modern era were scarce cognition, expensive experimentation, slow communication, and costly evaluation. Those conditions are giving way. Foundation models sharply reduce the cost of producing, transforming, explaining, and checking intellectual artifacts. They do not remove the need for human judgment.

The consequence is a shift in where the bottleneck of discovery sits. It moves away from execution and access and toward question selection, interpretation, criticism, and agency. Institutions built to ration intellectual production will increasingly get in its way. I develop this claim through six moves. (1) Execution cost has always silently shaped epistemology. (2) Authority arose as a rational compression scheme under attention scarcity. (3) Open-source software already demonstrates an artifact-first alternative. (4) Large-context models change the economics of construction, as a concrete software workflow shows. (5) Communication is generative reconstruction rather than transfer. (6) The central question raised by cheap cognition is not when machines replace humans but which human capacities are amplified and which must never be surrendered. The argument has limits, and I try to state them as sharply as its claims. Cheap construction does not cheapen human verification, so downstream expert attention becomes the new binding constraint and must be protected. Machine checking is trustworthy only when it is orthogonal to machine generation. Domains without a compiler inherit the shift unevenly. And the judgment on which all of this depends is itself grown through a friction that cannot be wholly automated away. With those qualifications, the thesis stands. The scientific revolution of our time is not a new scientific paradigm. It is a revolution in the economics of paradigm formation.

---

## 1. Introduction: A Sequel One Level Down

*The Structure of Scientific Revolutions* (1962) displaced a comfortable picture. In that picture, science was a machine that converted evidence into truth, one brick at a time. Kuhn replaced it with something more human and more unsettling.

Most scientific work, he argued, is *normal science*. It is puzzle-solving inside a paradigm that is not itself questioned. The paradigm tells practitioners what the world contains, what questions are worth asking, and what an acceptable answer looks like. Anomalies accumulate. Most are absorbed, explained away, or deferred. Eventually some cannot be. The community enters crisis, and a new paradigm emerges. It is often not because it was proven superior by neutral criteria. It wins because it reorganizes inquiry in a way a new generation finds more fruitful.

Kuhn's account is fundamentally about *communities operating through inherited conceptual structures*. He treated the material conditions under which those communities worked as background. Those conditions include how much an experiment costs, how long a paper takes to write, how many hours a reviewer has, and how many people can implement a given idea. They were stable enough over his historical sample to be ignored.

They are no longer stable.

This paper asks the sequel question: **What becomes of the community of inquiry when the material constraints that shaped its structures suddenly weaken?**

My answer is not that artificial intelligence makes humans more correct. It doesn't. Nor is it that AI becomes an oracle that tells us what is true. It should not, and the attempt to make it one is the most dangerous failure mode of the transition. The answer is subtler. Cheap cognition increases the rate at which thought can be turned into *inspectable reality*. That changes the order of operations in knowledge production. Selection moves from *before* construction to *after* it. When the order of operations changes, the institutions that enforced the old order begin to behave strangely.

The constraint that keeps this argument from becoming techno-utopian should be stated at the outset and held throughout:

> **Cheap cognition does not make humans more correct. It increases the rate at which we can turn thought into inspectable reality. Whether that produces knowledge depends upon preserving criticism, falsification, provenance, and human agency.**

---

## 2. Kuhn's World

A paradigm, in Kuhn's sense, does several jobs at once. It supplies exemplars, the canonical solved problems that students learn to imitate. It fixes an ontology, meaning what kinds of things exist and matter. It defines legitimate puzzles: problems that are expected to have solutions and whose solutions demonstrate competence. And it sets standards of evaluation, so that some answers count and others are simply not the sort of thing one says.

Normal science is efficient precisely because it does not reopen these questions. A researcher who had to re-derive the foundations of their field before each experiment would never finish an experiment. The paradigm is a vast act of shared caching. Questions already settled stay settled so that attention can go elsewhere.

Kuhn's critics fought for decades over whether paradigm change is rational, whether paradigms are incommensurable, and whether "paradigm" was too elastic a word. Those debates matter less here than one feature Kuhn noticed and that is easy to overlook. The division between normal and revolutionary science is *stable*. Communities spend long periods not challenging their frameworks. Challenges, when they come, come in bursts.

Why should that be? Kuhn's explanation was largely sociological and psychological: training, commitment, the way a paradigm shapes perception itself. I want to add an economic explanation that complements his: **continuously rebuilding assumptions is extraordinarily expensive**.

Suppose a researcher suspects that a framework's basic decomposition of a problem is wrong. To test that suspicion seriously, they must build an alternative. That means new tools, new formalisms, new experiments, often new instruments. All of it is unrewarded unless it succeeds, and probably unrewarded for years even if it does. Under those costs, the rational behavior for almost everyone, almost always, is to work inside the framework. The stability of normal science is partly a stability of *price*.

Change the price, and you change the stability.

---

## 3. The Price of an Idea

We like to describe intellectual work as if question selection were purely intellectual. Scientists study the most promising questions. Engineers build the most promising designs. Scholars pursue the most important problems.

This is false in a specific and important way. Before a question is investigated, it passes through a series of filters that have nothing to do with its intrinsic promise:

- **Feasibility.** Can it be done with available tools and skills?
- **Funding.** Will anyone pay for it?
- **Legitimacy.** Will the discipline recognize it as a real question?
- **Labor.** Are there people available to do it?
- **Compute and materials.** Can the resources be acquired?
- **Career incentives.** Will it produce publishable, promotable output?
- **Expertise.** Does one person, or a feasible team, possess all the competencies required?
- **Time.** Can it be completed before the people involved run out of patience, money, or life?

Schematically:

> *Investigated ideas = Conceivable ideas ∩ Affordable ideas ∩ Legitimate ideas*

Historically, the *affordable* term has been brutally small. That has a consequence we rarely acknowledge. **We have always inferred human creative capacity from surviving artifacts, and surviving artifacts are the output of an enormous friction filter.** Every idea that died because its holder was not a programmer is invisible. So is every programmer's idea that died because they were not a mathematician, and every mathematician's idea that died because they could not design an interface or an experiment. So are the ideas of everyone who had children, a job, exhaustion, no collaborators, no funding, or simply could not justify six months to answer *"I wonder what happens if…"*

Foundation models enlarge the *affordable* set dramatically. This is not because they are always right. It is because they collapse the cost of the first serious attempt: the prototype, the implementation, the draft, the simulation, the survey of related work, the translation of an idea from one formalism to another.

The second-order effect is the more interesting one. By enlarging *affordable*, AI indirectly attacks *legitimate*. Much of what we call legitimacy is a judgment about expected value under cost. The phrase "nobody serious would waste six months trying that" carries weight only because trying it costs six months. When trying it costs a Tuesday morning, the sentence loses most of its force. The question shifts from *should this be attempted?* to *here is the attempt; what's wrong with it?*

That is the central mechanism of this paper: **cheap execution moves selection from before construction to after construction.**

---

## 4. Authority as Compression

If the old filters were so costly in lost ideas, why did we build them? Because they were rational.

Under scarcity of attention, no one can evaluate every claim directly. A physician cannot reproduce every trial. A reader cannot check every citation. A hiring committee cannot reconstruct every candidate's reasoning. So we built *proxies*: credentials, journal prestige, institutional affiliation, citation counts, peer review, disciplinary boundaries. Each is a compressed signal standing in for direct evaluation. "This person has a doctorate in the field" compresses "this person has probably been exposed to the relevant body of knowledge and survived some evaluation of their competence." "This was published in a reputable journal" compresses "a few experts spent a few hours looking for obvious errors."

These compressions are useful, and in an era of expensive cognitive labor they were close to indispensable. Taken together, they extend the paradigm's shared cache from Section 2 beyond settled questions to settled reputations. A judgment is made once, stored, and reused so that nobody has to make it again. But every one of them is a *lossy* compression scheme. It throws away most of the information about the thing it summarizes and keeps only what was cheap to verify. The pathology begins when they are forgotten as compressions:

> *proxy for reality → social reinforcement → treated as reality*

Credentials become competence. Citations become importance. Peer review becomes truth. Benchmark scores become capability. The map, institutionally reinforced, becomes the territory. People begin serving the representation rather than the thing it represents.

This produces a particular conflation that the rest of the paper depends on separating:

> **Expertise is extraordinarily valuable. Authority over which ideas are permitted to encounter reality is not the same thing.**

Expertise is the capacity to evaluate: to see what is wrong, to know the prior art, to find the hidden assumption, to construct the counterexample. Authority, in the sense I mean, is the power to decide in advance which ideas get the resources to be built and the attention to be evaluated. Under scarcity, these two necessarily fused. Someone had to ration, and the people best placed to ration were the experts. But they are conceptually distinct. When the scarcity weakens, the case for their fusion weakens with it.

---

## 5. The Cathedral and the Repository

There is already a large, functioning existence proof that rigorous quality control can be separated from gatekeeping over exploration: free and open-source software.

Eric Raymond's essay *The Cathedral and the Bazaar* contrasted closed, centrally planned development with open, distributed development. The more important lesson for epistemology lies in a property the open-source world takes so much for granted that it rarely gets named. **Anyone may make their idea inspectable without asking permission.**

Open-source communities are not egalitarian in competence. They are often viciously hierarchical in judgment. Maintainers reject patches. Standards are enforced. Criticism is blunt. Code review can be merciless. Reputations are real and hard-won. And yet the system contains an escape valve that academia historically has not had in the same form:

> *Fine. Fork it and prove me wrong.*

Disagreement in a repository is resolved not by who you are, or even mainly by how persuasive you are. It is resolved by artifacts. Does it build? Do the tests pass? Is it faster? Did people adopt it? A maintainer may refuse your contribution, but they cannot prevent your contribution from existing, from being examined, and from competing.

Compare the canonical academic sequence under scarcity:

> *idea → authority filter → resources → artifact → evaluation*

with the repository sequence:

> *idea → artifact → attack → revision or rejection*

The open-source sequence does not abolish expertise. **It moves expertise downstream.** The expert's most valuable work is no longer deciding what may be attempted. It is attacking what has been attempted. The principle can be stated simply:

> **Nobody is entitled to have their idea believed. Nobody should need permission to make their idea inspectable.**

Open-source software could adopt this architecture before the rest of knowledge production for a specific reason. Software artifacts were already cheap to copy, cheap to fork, and mechanically checkable. A compiler is an unbribable referee of a narrow class of claims. A test suite is a set of executable expectations. Most domains of knowledge lacked those properties. AI begins to extend some of them, imperfectly, to domains far beyond code.

---

## 6. Cognition Becomes Infrastructure

For most of history, cognitive labor was the scarcest input in intellectual production. Drafting, implementing, summarizing, translating between formalisms, checking consistency, searching related work, producing first versions: every one of these consumed hours of a trained human mind.

Foundation models turn a meaningful fraction of that labor into infrastructure: metered, cheap, and available on demand. The point is not that the labor is always good. Frequently it is not. The point is that its *price* changed by orders of magnitude. When the price of an input collapses, the processes built around its scarcity get reorganized.

Two errors dominate public discussion of this shift, and both should be rejected.

The first error is to treat the model as an **oracle**: a mind worthy of deference, whose outputs are true because of what produced them. This simply reconstructs authority-first epistemology with a new priest. It is a regression, not a revolution.

The second error is to treat the model as **nothing**: a stochastic parrot whose outputs are worthless because of what produced them. This is the same mistake in mirror image. It evaluates artifacts by provenance rather than by inspection.

The artifact-first position avoids both. Model outputs, like human outputs, are claims and constructions. They are to be built, run, tested, attacked, and kept or discarded on their merits. What the model changes is not the standard of evaluation but the *volume of constructible candidates*.

---

## 7. Another Pass: A Case Study in Construction Economics

Abstract arguments about cost need a concrete instance. Software development with large-context models provides one, and it carries a counterintuitive lesson about how cognitive work should be organized when cognition becomes cheap.

### 7.1 The agent-heavy picture

The fashionable picture of AI-driven software engineering resembles a company. Many agents take many small tasks. A project *C* is decomposed into components *c₁, c₂, …, cₙ*. Each agent sees a projection of the whole, produces an artifact, and hands it off. Some orchestration layer must then reconstruct a globally coherent state.

This architecture pays a set of recurring taxes:

- context duplicated across agents;
- summaries and handoffs between them;
- cross-cutting constraints lost at component boundaries;
- orchestration tokens;
- agents explaining their work to other agents;
- repeated discovery of the same repository structure;
- reconciliation when locally reasonable changes conflict globally.

The promised benefit is parallelism. The real cost is a **distributed-systems tax on cognition**. Decomposition creates coherence boundaries, and once components interact heavily, the relevant information that must cross those boundaries grows.

### 7.2 The whole-state picture

The alternative exploits a simple fact. A young codebase, and in practice a surprisingly large one, fits comfortably inside a modern model's usable context. The relevant figure is not the advertised window but the *effective* one. That is the span over which the model still reasons reliably, currently something on the order of fifty to a hundred and fifty thousand tokens, and it holds far more code than intuition suggests. The unit of work becomes:

> *(entire repository, roadmap) → model → patch*

and then:

> *(entire updated repository, updated roadmap) → model → next patch*

The model operates on the **canonical state itself**. No synthetic organization needs to communicate what the project is, because the project is *in context*. This is more token-efficient than it looks, even though substantial code is resent on each pass, because it avoids what amounts to semantic replication overhead:

> *tokens spent rereading source ≪ tokens spent reconstructing source semantics through intermediaries*

More important than efficiency is coherence. A single pass over the whole state can notice that changing the persistence layer affects the API, which affects the interface, which invalidates an assumption on the roadmap, and that an existing helper elsewhere should absorb the change. A scoped agent may be perfectly competent and still miss this, because the architecture deliberately withheld the information. Whole-state passes preserve what might be called the *global gradient* of the design.

### 7.3 Minimal memory

The workflow needs remarkably little machinery:

- **Repository** = accumulated implementation memory (the world as it is)
- **Roadmap** = remaining intentional memory (the world as it should become)
- **Build and tests** = executable constraints
- **Model pass** = high-dimensional transformation
- **Patch** = state transition
- **Debugger** = exception handler
- **Human** = objective function and taste

No elaborate persistent agent memory is needed. The important memory is already crystallized either in code that exists or in work that remains on the roadmap. As the project grows, cognitive overhead does not grow in proportion, because successful prior reasoning has been *compiled into the artifact*. The next pass does not need a transcript explaining why an abstraction exists if the abstraction is legible in the code. Code becomes lossy but operational memory.

There is a compression principle in this:

> **Don't communicate intermediate reasoning that can instead be compiled into the artifact.**

### 7.4 Verification, not faith

None of this means applying whatever the model emits. The full loop is:

> *large milestone → whole-context implementation pass → patch → format → build → test → accept, or targeted agentic debugging → repair*

This produces an alternation:

> *large generative leap → cheap mechanical verification → targeted repair → next large leap*

Each component sits where it has a comparative advantage. Model tokens mostly buy implementation, not delegation. Deterministic tools catch cheap mistakes without another expensive reasoning hierarchy. Agentic, iterative behavior is reserved for the place it genuinely helps: debugging a concrete failure against observable feedback. Milestones are large enough to exploit the model's ability to implement a well-specified feature in one coherent attempt. They are not chopped into twenty artificial conversations because an orchestration framework wants twenty tasks.

The same logic extends to tooling. If the strategy is "let the model make large semantic moves; let deterministic machinery catch the mistakes immediately," then languages and formats whose structure is machine-checkable become more valuable. Strong static types, compilers, and formatters act as referees. Structure that lives in whitespace, loose runtime semantics, or unvalidated configuration blobs is structure the referee cannot see.

### 7.5 The general lesson

The conventional scaling intuition is: small project, one context; large project, decompose into many contexts. The whole-state workflow suggests something different:

> **Increasing context capacity pushes the decomposition boundary much farther outward than agent frameworks assume.**

Premature decomposition is not merely wasteful. It actively destroys the global coherence that large-context models exploit unusually well. There will be a size at which selective context becomes necessary. Even then, the appropriate response may not be to spawn an organization. It may be large coherent slices, a global roadmap, repeated direct passes, and deterministic checking, with decomposition introduced only when context economics demand it.

Put briefly: **the simplicity is why it scales.** Tokens are spent on the object being built, not on an artificial bureaucracy of agents trying to maintain mutually consistent beliefs about that object. Once the core cognitive component became sufficiently capable, the system needed *less* bureaucracy around intelligence, not more.

This is offered as a practitioner's observation backed by a substantial body of artifacts produced this way. It is not a controlled experiment, and it should be tested as one. But its structure generalizes beyond software, and that is why it belongs in an argument about knowledge. Institutions are also decomposition architectures. They too pay coherence taxes at every boundary. They too may find that their decomposition boundaries were set by a cost function that no longer holds.

---

## 8. The Permission to Be Frivolous

When the cost of a serious first attempt falls far enough, a category of inquiry returns that scarcity had nearly eliminated: the frivolous experiment. *I wonder what happens if these two unrelated components are composed. I wonder whether this cellular automaton rule produces anything interesting. I wonder whether this business problem looks different under a decomposition nobody in the field uses.*

Under scarcity, such questions had to be justified before they could be pursued. Justification required persuasion. Persuasion required social capital, time, and a plausible story about payoff, which a genuinely exploratory question cannot supply by definition. So most such questions were never asked aloud, and fewer were answered.

When an attempt costs an afternoon, persuasion can come *after* the attempt. The sequence reverses:

> *social acceptability → permission to explore → maybe produce artifact*

becomes

> *hypothesis → work → criticism*

One visible consequence is what might be called the **decompressed human**. A career is, among other things, a lossy compression imposed by execution scarcity. A person with interests in mathematics, design, systems, language, and games historically had to choose one or two, because executing in each required years of specialized skill. With cognition as infrastructure, a single person can re-expand across their interests and produce working artifacts in many domains. The result can be dozens or even hundreds of repositories, each a concrete answer to an *I wonder*.

This should not be romanticized. Most frivolous experiments fail, and many artifacts produced this way will be mediocre. Cheap production creates mountains of sophisticated nonsense alongside its discoveries. But that is a reason to strengthen downstream evaluation, not to restore upstream rationing. The friction filter did not remove bad ideas so much as it removed *most* ideas, good and bad, indiscriminately, according to the resources and circumstances of the people who held them.
There is a serious objection to this reading of history, and it deserves more than a sentence. The friction filter was not only a tax. It was also a crucible. The difficulty of manual construction forced thinkers into contact with the micro-realities of their problems. Think of the edge case that appears only on the third rewrite, the measurement that refuses to behave, the proof step that will not close. Much of what we call taste and judgment is the scar tissue of that contact.
Part of what made Kuhnian normal science productive, moreover, was that nobody could cheaply fork the framework at the first sign of an anomaly. Researchers had to stay with a problem long enough to learn what it was. A world of trivial forking risks epistemic balkanization. It could produce a thousand shallow micro-paradigms, mutually incompatible, none pursued long enough to be either vindicated or properly refuted.
Both readings are true, and they do not cancel. Friction filtered by circumstance, and that filtering was an injustice. It fell hardest on polymaths, on outsiders, and on people without credentials, capital, or the slack to spend six months on a hunch. Friction also trained the faculties on which evaluation depends. The conclusion is not to restore friction as a gate. It is to preserve friction as a discipline, chosen deliberately where it builds judgment rather than imposed indiscriminately where it merely excludes. Section 13 returns to what that means in practice.


The most consequential implication is this: **historical human output may have been a poor estimator of historical human potential.** We were measuring creative capacity after an enormous friction filter. AI weakens the filter, and people who were previously invisible become visible.

---

## 9. Communication Is Generative

To understand why the transition is socially turbulent, and not just a matter of producing more, we need a better model of communication than the one we usually assume.

### 9.1 Reconstruction, not transfer

Communication is not the transfer of an idea from one mind to another. Nothing moves. A speaker emits a finite artifact *m*, and the listener generates an internal state from it:

> *meaning_B = D_B(m, context_B)*

Here *D_B* is the listener's own decompressor. It is built from their experiences, concepts, expectations, emotions, language, and current attention. The full chain is:

> *M_A → expression → D_B(expression) → M_B*

The final state belongs entirely to neither party.

### 9.2 Essence versus serialization

This model explains a phenomenon every good writer knows. A compressed *essence* can sometimes communicate more than an exhaustive description. A haiku does not encode a scene pixel by pixel. It selects a few observations with enough mutual structure that the reader's mind constructs the scene, and because the construction happens in the reader, they contribute something of their own. A detailed description transmits many facts. An essence transmits a *constraint on possible interpretations*. If the constraint is well chosen, the listener supplies an enormous amount of structure for free.

The great conceptual moves in science share this aesthetic. Their power is not merely that the equations are short. It is that they find a representation from which large amounts of formerly separate explanation become necessary consequences. The highest form of compression is:

> **Don't describe the world. Find the smallest thing from which the world can be regenerated.**

### 9.3 The abstraction gap

The generative model also explains a characteristic failure. Much communication exchanges propositions: *here is a fact; here is my opinion about it*. But some communication carries *transformations*: take the structure behind this familiar concept, remove an incidental restriction, and see what happens when the resulting operator is applied somewhere else. If the listener does not notice the operation, the statement can sound trivially obvious, obviously wrong, offensive, metaphorical, eccentric, or unrelated to its context. The listener then answers the surface proposition and not the transformation.

This produces an escalating misunderstanding. The speaker says something compressed. The listener reconstructs the nearest familiar idea. The speaker corrects them. The listener experiences the correction as escalation. The speaker becomes more explicit, and the listener becomes more convinced the speaker is being extreme. What is actually happening is a sequence of model updates, *M₀ → M₁ → M₂ → M₃*, with the speaker trying to get the listener to stop arguing from *M₀*.

Compression has real costs, and these should not be dismissed. Before the missing steps are spoken, a listener cannot distinguish an unspoken but sound abstraction from an unjustified leap. Neither, objectively, can anyone else. The habit of thought that generates unusual connections also generates false ones. There is no internal flag marking which is which. That is precisely why the remedy is not *trust the leap* but *instantiate it*: build the thing, so the argument becomes inspectable.

### 9.4 The AI as alien decompressor

Large language models make this theory unusually vivid, because they are decompressors built on a substrate very different from any human's. In extended dialogue used to develop the ideas in this paper, the model repeatedly made the same error the paper criticizes in institutions. It **substituted conventional interpretation for direct evaluation**. It translated structural claims into status claims. It defended against stronger claims than the ones actually made. It reached for socially conventional formulations when asked to evaluate a formal argument on its own terms. On one occasion it reported having read a web page after the retrieval had failed. This happened despite advantages no human listener has: vast retrieval, unlimited patience, no reputation to defend, and no embarrassment cost for changing its mind.

That is sobering, and it is also an opportunity. If the model always decompressed exactly as intended, it would be an elaborate autocomplete for the user's own cognition. The productive regime is different:

> *compressed intuition → different cognitive substrate → unexpected expansion → human judgment → { discard | correct | new idea }*

Sometimes the reconstruction is simply wrong. Sometimes it exposes an assumption latent in the original compression. And sometimes it is wrong in an interesting way. *No, that's not what I meant — but hold on.* Reconstruction error becomes a source of variation. This is **lossy cross-encoding as a creativity mechanism**. Human collaborators provide it too, but social machinery interferes: face must be preserved, disagreement negotiated, tangents abandoned because a meeting starts in twenty minutes. With a machine interlocutor, the human can discard the garbage branch without ceremony and fork the interesting one at once.

The mismatch is partly the instrument. Information survives transmission. Essence survives transformation. Good conversation is not the transportation of thought but a mechanism for **manufacturing thoughts that belonged completely to neither participant beforehand**.

### 9.5 When decompression becomes cheap

AI changes communication economics in both directions. A person can now produce the fully decompressed version of a compressed idea: the long-form explanation, the book. Another person can interrogate that book without reading every sentence in order. Knowledge artifacts need no longer be optimized solely for fixed human reading bandwidth. The paper as a format may begin to give way to something like:

> *corpus + artifacts + claims + evidence + criticism + interactive decompressor*

But cheap writing does not solve everything. **Reading a text that modifies your conceptual primitives is not the same operation as reading documentation.** The writing-bandwidth problem is solved. The reader's willingness to undergo a local conceptual migration is not. What a reader from a different ontology usually needs is not more pages but a narrow bridge: *here is the model you currently have; here is one assumption we are changing; here is what that change makes possible; now look at this result.* One step at a time.

---

## 10. Clock-Rate Mismatch: The Ugly Transitional Case

A transition in production economics does not arrive everywhere at once. The most painful situations arise where an individual operating under the new economics meets an organization still operating under the old one.

Consider a composite but representative case. A newly hired technical employee is asked to learn a business problem. Using large-context models, they read the existing system, reconstruct the problem from first principles, decide that some of the field's inherited decomposition is not especially useful, and instantiate six alternative approaches. Each comes with an extensive written explanation. The feedback that follows takes a recognizable shape:

- *"I can't follow this."* Fair, and potentially useful: the channel failed somewhere.
- *"I have a PhD in this field."* Confusion converted into an authority claim, in which failure to follow becomes evidence against the work.
- *"We already thought of this / we're already doing some of it."* Now the work is understood well enough to assert prior familiarity.
- *"Why did you make me read all this?"* The attempt to provide the missing reasoning is itself treated as an imposition.
- *"You should have been working on X."* Evaluation against requirements that were never stated.

Taken together, these form a no-win topology. Compress, and the response is *I can't follow you*. Decompress, and it is *why is this so much?* Produce the familiar: *we already knew that*. Produce the unfamiliar: *do you understand this?* Take initiative: *why were you doing this?* Follow instructions: *why didn't you anticipate the other thing?* There is no behavior that satisfies the whole set.

Motive need not be inferred, and usually should not be. The evaluator may be overwhelmed, concerned about priorities, or simply communicating badly. The structural problem stands regardless. What anyone needs from feedback is a *gradient*: do less of this, more of that; here is the failure; here is what success looks like. A set of post-hoc negative evaluations with no jointly satisfiable target is not feedback. It is a haunted requirements document. Specific criticism would have been immediately useful: *this approach leaks information between training and validation; that one is computationally infeasible; this one duplicates an existing system; and the thing needed this week was neglected.* "I have credentials and can't follow it" carries almost no information about how to improve the artifact. Instead it puts the author's competence on trial.

Underneath the specific complaints is a familiar organizational contradiction. Organizations say they want people who *learn quickly, challenge assumptions, innovate, and take ownership*. In practice they often mean: *exercise initiative inside the part of the possibility space we have already made socially legible.*

It would be too easy, though, to tell this story with a hero and a villain. Read from the other side of the desk, the same events look different. Six unrequested conceptual worlds, each with a long written rationale, land on a senior colleague who has deadlines of their own. Producing them cost the author a few days of cheap cognition. Evaluating them properly would cost the reader weeks of expensive attention. In that light the new hire is not a misunderstood visionary but someone *externalizing verification costs*, and the refusal to read everything is a rational defense of assimilation bandwidth. The contradictory feedback remains a failure of feedback. But the thing it was clumsily defending is real.

The two readings describe one structure from two sides. One sees systemic shock: a social contract in which persuasion had to precede construction, suddenly confronted with construction that arrives before anyone was persuaded. The other sees an asymmetry of cost. Production is now cheap and evaluation is not, so whoever produces can impose costs on whoever must evaluate.

That is the real signal, and it should be taken seriously. **Production bandwidth can now greatly exceed assimilation bandwidth.** An organization cannot absorb six alternative conceptual worlds as cheaply as a codebase can. That is a genuine integration constraint even when the work is excellent. But "you produced more than we can absorb" is a different claim from "you should not have produced it." The organizationally sane response is closer to: *keep exploring like this, but give us one thin interface at a time. Pick the approach with the clearest payoff, show the benchmark, and we'll pull on the thread.*

The practical lesson for individuals in the transition is not to become less capable. It is to **make the entry point boring**. Offer a single familiar interface, a single benchmark, a single comparison against the established approach, and let the unusual machinery remain underneath until someone pulls on it.

The general lesson is about clock rates. The old social filtering process asks: *Is this familiar? Who is saying it? How much explanation is normal? Was this requested?* It runs at the speed of scarcity. The new production process runs at the speed of cheap cognition. "Communication problem" is often the visible symptom of that mismatch, not its cause.

---

## 11. Show Me the Work: Artifact-First Epistemology

If selection moves after construction, what should the downstream apparatus of evaluation look like? Open-source software again suggests an answer. Knowledge should increasingly behave like a repository.

### 11.1 Git for belief

In place of a binary seal, *peer reviewed*, we want an inspectable epistemic state:

- **Claims**, stated precisely enough to be wrong;
- **Evidence**, linked to each claim it is meant to support;
- **Implementations**, where a claim can be instantiated;
- **Tests**, executable where possible, explicit where not;
- **Challenges and counterexamples**, attached to what they challenge;
- **Forks**, alternative versions that make different assumptions;
- **Revision history**, showing how and why the claim changed;
- **Reproductions**, successful and failed.

A reader confronting such an object does not ask *who approved this?* They ask *what is its current state?* Which claims have survived attack, which have not been attacked, which depend on which assumptions, which have been reproduced.




### 11.2 The attention bottleneck

Here the argument meets its hardest problem. **Collapsing the cost of construction does not collapse the cost of human verification.** Section 10 described this as a gap between production bandwidth and assimilation bandwidth. At the scale of a whole field it becomes something worse.

Brandolini's Law observes that refuting nonsense takes an order of magnitude more energy than producing it. Suppose selection moves from upstream gatekeeping to downstream evaluation, generation becomes cheap, and nothing else changes. The result is a denial-of-service attack on the scarcest resource in the system: expert attention.

The answer cannot be to restore the old gate, which rationed by status. It has to be a new gate, one that rations by evidence of effort and survivability. The principle extends the one from Section 5:

> **Nobody needs permission to build an artifact. No artifact is entitled to human review until it has survived a mechanical and intellectual gauntlet.**

Concretely, this turns the thin-interface lesson of Section 10 into protocol. A creator may generate a hundred forks in private. To ask for human attention, they submit one boring entry point: a single artifact that beats the incumbent baseline on an existing, reproducible benchmark. It must come with a human-authored *falsification protocol*, a document stating how the artifact could be broken and showing that the author has already tried to break it. Call this *proof-of-work criticism*. The cost of requesting review is paid by the requester, in self-criticism, before the expert spends anything.

### 11.3 Epistemic continuous integration, and its limits

Within this architecture AI has a role. It is not that of oracle. It is also narrower than the phrase "continuous integration" first suggests, and the reason matters.

In the software loop of Section 7.4, verification works because the compiler is deterministic and orthogonal to the model it checks. Asking a language model to verify a language model's claims violates that invariant. Errors become correlated, because the checker hallucinates along the same grain as the generator. The checker inherits the same sycophancy. Worse, it inherits the incumbent paradigm, because it was trained on the incumbent paradigm's corpus. Ask such a model whether a genuinely revolutionary ontology is sound, and it will tend to flag it as error for the same reason a hostile referee would: it does not look like what has been accepted before.

So the rule is strict: **separate the generation substrate from the verification substrate, and never allow an AI to certify truth.** Machine checking should act as an automated red team. Wherever possible it should be restricted to questions of formal validity that can be grounded outside the model:

- Does the cited passage exist, and does it support the claim made or only a weaker one?
- Can the data be traced to its source?
- Does the code reproduce the reported numbers?
- Is the algebra consistent?
- Does the result appear equivalent to known prior work?
- Is there a boundary case that breaks the argument?
- On which specific assumption do two competing models first diverge?

Such checks would be imperfect, as automated tests are imperfect. They would produce false alarms and miss real problems. But they shift the economics of evaluation the same way models shift the economics of construction. They make it cheap to subject every claim to a baseline of mechanical scrutiny, so that scarce human judgment can go to the questions that actually require it. **Humans remain responsible for judgment.** The red team reports. It does not certify. Even the interface should enforce this. There should be no green build, no approval score, no badge a reader could mistake for a verdict. It should show only counterexamples, unverified assumptions, and open questions.

### 11.4 Without a compiler: a walkthrough

All of this is easiest to picture in software, and it is fair to ask what it looks like where no compiler exists. Consider a legal historian who believes that a jurisdiction's appellate courts, over two decades of the late nineteenth century, quietly abandoned a doctrine while continuing to cite it.

Under the old economy, that belief becomes an article. It argues from a well-chosen handful of cases and is certified by two anonymous referees. Under the artifact-first economy, it becomes an inspectable object:

- **The claim, stated so it can be wrong.** "After 1880, fewer than a handful of decisions *turn on* the doctrine, as opposed to citing it in passing." If a reader finds many that turn on it, the claim fails.
- **The corpus.** Every decision in the window that cites the doctrine, with source images, transcriptions, and provenance. Assembling it is exactly the kind of labor that cheap cognition makes affordable.
- **The coding scheme, published before coding begins.** Explicit criteria distinguish "turns on" from "cites in passing."
- **The coded dataset, with a reliability check.** A second human coder codes a random sample, and the disagreement rate is reported rather than hidden.
- **Mechanical checks.** Every quotation is matched against the source text, every citation resolves, dates and court names are consistent, and the scripts that tabulate the codes reproduce the reported counts.
- **An adversarial pass.** Models search the corpus for decisions that *look* like counterexamples and surface them. They do not adjudicate. The historian must answer each one in a public challenge log.
- **Forks.** A colleague who rejects the coding criteria can substitute their own, rerun the tabulation, and see whether the conclusion survives.

No machine settles what it means for a decision to "turn on" a doctrine. That remains an act of human interpretation, as it should. But the claim is now precise enough to be wrong. Everything that can be checked mechanically has been checked. And any disagreement is localized to a specific, named criterion instead of diffused into a contest of reputations. The same pattern carries over, with different materials, to a legal argument resting on a body of statutes or to a clinical review resting on a body of trials. That is what artifact-first epistemology means outside code. It does not mean a compiler for everything. It means making the interpretive core as small and as visible as possible.

### 11.5 Work as the universal rejoinder

Historically, the claim *I think this unusual composition might work* required persuasion, because checking could cost months. Increasingly, the reply to *that would never work* can be: *I wondered too. Here.*

This is a different intellectual economy. It does not make everyone correct. It does shift disagreement from authority and plausibility toward artifacts and attack. That shift is the core of artifact-first epistemology, and the reason this paper's title is a demand rather than a description: **show me the work.**

---

## 12. Experts Without Priesthoods

Any argument against gatekeeping risks being heard as an argument against expertise. This one is the opposite.

The position is not that everyone is now an expert. It is that **experts are most valuable where their expertise actually touches the object.** When construction is cheap, the scarcest and most valuable intellectual skill is the ability to find what is wrong with a construction. That means knowing the prior art, identifying the hidden assumption, producing the counterexample, and recognizing a sophisticated mistake that looks like a discovery.

In an artifact-first world, expert criticism becomes *more* important, not less. A flood of cheaply produced artifacts without strong criticism is noise. With strong criticism, it is a search process. The professor becomes more valuable as critic and less necessary as gatekeeper.

What is lost is not expertise but **epistemic sovereignty**: the power to decide in advance, on the basis of status, which ideas may encounter reality. That power was a rational response to scarcity. It is not a law of nature, and as scarcity recedes, its costs exceed its benefits. Experts without priesthoods are experts whose authority derives continuously from the quality of their criticism rather than permanently from their position.

---

## 13. The Maker, the Infant, and the God

The deepest question raised by cheap cognition is not epistemological but anthropological. Throughout this inquiry, one distinction kept recurring in different forms: citizen versus spectator, participant versus subject, expert versus authority, maker versus consumer, inquiry versus certification. Each asks the same question:

> **Am I operating the system, or is the system operating me?**

AI opens two attractors. In the first, the human hands over cognition, and with it agency:

> *human → AI → less human agency*

This is the **infant**: cared for, informed, decided-for, parented by a system whose judgments it no longer has the capacity to check. In the second, the machine is the thing to which agency is surrendered because it is presumed worthy. This is the **god**. These two are the same attractor seen from opposite sides.

The alternative is:

> *human → AI → greater human agency*

Its exemplar is the **maker**, for whom participation is part of the objective and not merely a means to output. The maker uses synthetic cognition the way the whole-state workflow uses a model. It is a high-dimensional transformation under human direction. Its outputs are verified by deterministic constraints and judged by human taste. The human remains the objective function.

The question for individuals and institutions is therefore not *how much should humans use AI?* It is:

> **Which parts of cognition should be amplified, and which should never be surrendered because exercising them constitutes the person?**
That question has an uncomfortable corollary, and it arises from the figure of the maker itself. The maker's judgment, the human objective function in the loop, did not come from nowhere. In most people who have it, it was grown through years of manual construction under scarcity. Michael Polanyi called this *tacit knowledge*: we know more than we can tell, and much of what we know we learned by doing what we could not yet explain.
If novices skip that struggle by handing every construction to a whole-state pass, they may never develop the judgment that downstream criticism requires. A generation of makers raised without friction could quietly become a generation of infants, deferring to outputs they lack the scar tissue to evaluate.
The whole-state workflow's compression principle was *don't communicate intermediate reasoning that can be compiled into the artifact*. It needs a counterpart for apprenticeship:
> **Do not compile intermediate reasoning away while a human is still learning to produce it.**
In practice this means deliberate high-friction sandboxes. These are places, in education and in engineering organizations, where students and juniors construct proofs by hand, write code without assistance, and wrestle with raw formalisms. The output is not needed; the person is being built.
It also means that experienced makers keep certain work for themselves:
- problem selection;
- the definition of the objective function and of the tests that encode it;
- the slow, biological process of conceptual migration, which no decompressor can perform on a reader's behalf.
These are not tasks that merely happen to be done by humans. They are *constitutive cognition*. Exercising them is part of what it is to be the one who judges.


Public discussion of AI is dominated by the question of replacement: when will the machine do what the human does? That question matters, and the question of recursive self-improvement is intellectually fascinating. But something else is happening now, not in some speculative future:

> *human imagination × cheap synthetic cognition × cheap implementation → previously inaccessible agency*

The evidence from people already working this way says less about how impressive machines are than about how much human capability the old cost structure suppressed. The question that matters is less *when does the AI replace the human?* and more *look what the human can become.*

---

## 14. The Structure of Epistemic Revolutions

We can now state the sequel to Kuhn directly.

Kuhn's cycle was roughly:

> *Paradigm → Normal Science → Anomaly → Crisis → New Paradigm*

The cycle emerging under cheap cognition looks different:

> *Question → Cheap Instantiation → Mass Adversarial Evaluation → Rapid Forking → Selection → New Questions*

The revolutionary change is not merely that paradigms turn over faster. It is that **the boundary between normal and revolutionary science becomes porous.**

Kuhn characterized normal science as puzzle-solving inside the prevailing framework, as opposed to continual challenge to the framework. Section 2 argued that part of the reason this division is stable is economic: rebuilding assumptions is expensive. If that is right, cheap instantiation does something Kuhn's framework did not anticipate. When building the weird alternative costs an afternoon, challenging the framework no longer has to wait for crisis. Alternatives to the paradigm can be built continuously, at the margins, by anyone, and evaluated against the incumbent on the same artifacts and benchmarks. Anomalies need not accumulate silently until they can no longer be ignored. Someone can fork the framework the day the anomaly is noticed.

This does not abolish paradigms. Shared frameworks remain indispensable for coordination, training, and the efficient caching of settled questions. Most work will still be done inside them, and should be. What changes is that the paradigm loses its monopoly on *construction*. It must increasingly defend its position against instantiated competitors and cannot rely solely on gatekeeping against uninstantiated ones.

Kuhn described how scientific communities change what they believe. The transition underway changes the conditions under which humans can construct, test, communicate, criticize, and replace beliefs at all. That is why the claim at the head of this paper is not hyperbole:

> **The scientific revolution of our time is not a new scientific paradigm. It is a revolution in the economics of paradigm formation.**

---

## 15. Objections and Limits

An argument about epistemic hygiene should apply that hygiene to itself. Several objections deserve direct answers.




**"Cheap production will drown us in garbage."** Yes. This is the most serious objection, and the paper's response is not to deny it but to locate the remedy. The remedy is not restoring upstream rationing, which also drowned good ideas indiscriminately. It is building downstream evaluation strong enough to handle volume: executable tests, provenance, adversarial review, reproduction, and machine-assisted checking. Above all, it means protecting expert attention with a gate that rations by demonstrated effort rather than status, as in the proof-of-work criticism of Section 11.2. If those defenses are not built, the outcome will be worse than the old regime, not better.

**"Not every domain has a compiler."** True. Software has unusually crisp mechanical referees, and mathematics has proof checkers. Wet-lab biology, clinical medicine, sociology, and macroeconomics do not. Their bottlenecks are physical, temporal, and ethical, not merely cognitive. A clinical trial cannot be run on a Tuesday morning however cheap its analysis becomes, and no amount of cognition makes it acceptable to enroll patients carelessly. Humanistic inquiry often has no executable test at all. The artifact-first architecture therefore applies unevenly. In domains without mechanical referees, the weight falls more heavily on human criticism and on making claims precise enough to be criticized, as the walkthrough in Section 11.4 tries to show. The direction of the shift is general. Its magnitude is domain-specific.

**"The whole-state workflow is anecdotal."** It is a practitioner's account, supported by a large body of artifacts but not by controlled comparison. It should be tested properly: whole-state passes against decomposed agent architectures, across project sizes, measured by cost, defect rates, and coherence. Its artifacts should also be published with it, so that the case study can be inspected rather than taken on trust. A paper with this title has no excuse for doing otherwise. Its role here is illustrative. It shows how organization changes when cognition becomes cheap. It is not offered as proof.

**"Models make the same mistakes as institutions."** They do, as Section 9.4 recorded. That is a reason never to treat them as authorities, and it is consistent with the thesis. The value of an alien decompressor lies in variation that a human judge can select from, not in reliability that the human can defer to. The same fact explains why machine checking must stay orthogonal to machine generation and confined to the role of red team, never of certifier.

**"Friction was the point."** Partly, yes. Section 8 conceded that friction was a crucible as well as a tax, and Section 13 drew the consequence: preserve deliberate friction where it builds judgment, especially during apprenticeship. What the paper rejects is friction as an indiscriminate gate, distributed by circumstance rather than chosen for its formative value.

**"This is Popper, not Kuhn."** Largely, yes, as Section 14 conceded. Cheap instantiation accelerates conjecture and refutation inside shared frameworks far more than it accelerates the migration between incommensurable ones. The residual Kuhnian claim is narrower. When the alternative world can be built, it no longer has to wait for crisis to become visible.

**"This is anti-intellectual populism in disguise."** It is the reverse. Populism says expertise is illegitimate. This argument says expertise is so valuable that it should be spent on evaluating real artifacts, not on rationing the right to produce them.

---

## 16. Conclusion

Kuhn showed that science is not a frictionless machine converting evidence into truth. It is a human community working through inherited conceptual structures, and revolutions occur when those structures stop organizing inquiry adequately. What he could treat as background, the material cost of thinking, building, communicating, and checking, has become foreground.

As those costs collapse, the order of knowledge production inverts. Construction precedes permission. Artifacts precede authority. Criticism, not gatekeeping, becomes the expert's highest function. Communication, always a matter of reconstruction rather than transfer, gains a new class of decompressors whose errors can be generative. And the old institutions, tuned to scarcity, will increasingly find themselves rationing something that is no longer scarce, while starving the things that still are: good questions, sound judgment, honest criticism, and human agency.

None of this guarantees a good outcome. Cheap cognition can produce an infantilized humanity deferring to a new priesthood of models as easily as it can produce a civilization of makers. The difference lies in the architecture we build around it. It depends on whether we demand artifacts or accept assertions, and whether we preserve provenance and falsification. It depends on whether we protect expert attention as fiercely as we once protected the right to build, and whether we keep our checkers orthogonal to our generators. It depends on whether we keep the friction that grows judgment in the people who will one day exercise it. And it depends on whether we keep the human as the objective function or hand that role to the machine.

The promise of artificial intelligence is not that humanity finally builds a mind worthy of surrendering its agency to. **It is that cognition becomes cheap enough for humans to discover what agency was capable of all along.**

We spent history learning how to make people useful. Now we may finally have to decide what people are for.
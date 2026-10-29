# Compiling the Discontinuities: Coordination Depth, Toolkit Maturation, and the Declining Rate of Evolutionary Primitives

## Abstract

Evolution is usually told as a steady stream of novelty: fins become legs, legs become wings, flowers appear, fruit appears, mammals radiate. This paper argues that the stream is not uniform. Evolutionary novelty comes in two kinds that behave differently over deep time.

- **Configurational novelty** is the rearrangement, resizing, redeployment, and specialization of machinery that already exists.
- **Primitive novelty** is the creation of a new reusable developmental capability. Examples include the feather follicle, the hair follicle, the flower-and-fruit reproductive architecture, the seed, and the eukaryotic cell.

We propose that the two can be separated by a measurable property, *coordination depth*. This is the minimum number of mutually dependent changes that must coexist before an innovation becomes visible to selection. Primitive status also requires a second, independent property: high *reusability*. We measure reusability in a time-normalized way so that old innovations are not favored simply because they are old.

We then argue for a secular trend. Each successful primitive enlarges the space of cheap, smooth, low-coordination adaptations. Developmental entrenchment also makes ancient machinery harder to replace. Adequate configurational solutions, which are reached quickly, capture the selective gradients that slower structural innovations would need. Over time, the biosphere therefore converts structural search into gradient search. Its surface diversity can keep growing while the rate at which it adds new operators to its "instruction set" falls.

We formalize the idea and relate it to fitness valleys, epistasis, clonal interference, developmental bias, and evolvability. We correct a common chronological misreading involving fruit, legumes, and the end-Cretaceous extinction. We also identify several ways the predicted pattern could appear as an artifact:

- right-censoring of reusability;
- stem-group extinction that inflates apparent coordination depth;
- maintenance costs that silently convert plateau width into valley depth;
- algebraic saturation of finite task spaces.

Finally, we propose four computational experiments, each designed with controls against these artifacts. The experiments could show the predicted dynamic, which we call *evolutionary self-smoothing*, and could also show it to be false.

---

## 1. The Intuition

Start with a plain observation. Evolution seems to build its basic toolkit early and then spend most of its time repurposing and perfecting that toolkit. Genuinely new tools look hard to stumble on. They seem to need several random traits to come together before any of them shows utility. Once the possibilities have been "stubbed out", later evolution mostly fills them in.

Evolutionary developmental biology supports much of this. Very different animal bodies are built with deeply conserved regulatory genes. Much morphological novelty comes from changing *when*, *where*, and *how strongly* old machinery is deployed, not from inventing new machinery. An ancestral lineage does not just leave its descendants DNA. It leaves them something closer to an **evolutionary API**. Once a `limb()` routine exists, evolution can produce

~~~
limb → leg / wing / flipper / paddle / hand / digging claw
~~~

far more cheaply than it could discover separate appendage-building mechanisms from scratch.

A ratchet follows from this. Suppose an ancient component takes part in fifty developmental pathways. Changing the component itself is then dangerous, because every mutation that alters it ripples through every caller. Selection works more and more by wrapping, duplicating, re-regulating, and specializing old parts. Anyone who has maintained mature software will recognize the pattern.

The software analogy has a limit, which we return to later. Biological modules are not cleanly encapsulated subroutines. They are pleiotropic, cross-talking regulatory systems. That difference changes how entrenchment works and must be built into any model that takes the analogy seriously.

The aim of this paper is to turn that intuition into a claim that can be tested. That requires three things:

1. A precise sense in which some innovations are "new" and others are not.
2. A quantity that measures the difference.
3. A mechanism that would make the rate of genuinely new innovations decline over time.

---

## 2. A Chronological Correction: Invention, Incubation, Radiation

A popular version of this story says that fruits and beans appeared at the end of the dinosaurs. The idea is that the chaos of the end-Cretaceous extinction produced new primitive elements of the ecosystem. That chronology is wrong, and the reason it is wrong sharpens the theory.

**Fruits predate the extinction.** A fruit is the mature ovary of a flowering plant, so fruit exists wherever angiosperms exist. Angiosperms diversified heavily during the Cretaceous, while non-avian dinosaurs were still alive. This diversification, together with the insects and terrestrial animals that interacted with flowering plants, is sometimes called the Cretaceous Terrestrial Revolution.

**Fleshy fruit is a recurring configuration on top of the fruit primitive.** Fleshy, animal-dispersed fruit appears to have evolved from dry-fruited ancestors many times across the angiosperms. In the framework developed below, this is a strong hint. Something that evolves repeatedly is probably cheap to reach once its prerequisites exist.

**Beans are a lineage-specific elaboration.** A bean is the seed of a legume, and the pod that encloses it is botanically a fruit. Legumes are one very successful branch built on flowering-plant reproductive machinery.

**The fossil record over-reports radiation and under-reports origin.** Molecular dating of angiosperm origins has long sat awkwardly against their conspicuous appearance in the fossil record. Early angiosperm history may be largely undocumented. Much of what is documented comes from dispersed pollen and detached leaves. "We begin to see a lot of X" is not the same as "X was invented then." The same filter has a second effect that matters later in this paper. Stem lineages that carried intermediate forms tend to go extinct and leave little trace. The record therefore hides when something was invented and also *how gradually* it was built.

This suggests that the history of any primitive has at least three phases:

$$
\text{invention time} \;\rightarrow\; \text{incubation time} \;\rightarrow\; \text{radiation time}
$$

The fossil record is most sensitive to radiation time. Narrative compression then turns all three phases into a single sentence: *"And then fruit appeared."* The reality may look more like software that existed obscurely for ages until its dependencies, its environment, and its users finally lined up.

On this reading, the end-Cretaceous extinction did not invent fruit, beans, or the flowering-plant toolkit. It removed incumbents and opened large regions of ecological state space to machinery that already existed. Mass extinctions matter to the theory, but as **accelerators of radiation**, not as generators of primitives. This makes the underlying claim stronger: *genuinely new features come out of deep time, through long incubation, not out of sudden catastrophe.*

---

## 3. What Counts as "New"?

The theory needs a strict notion of novelty. A loose one would count every dramatic phenotype as an invention.

Consider the wing. Bird, bat, and pterosaur wings look like great innovations. Structurally, though, a wing is an arm with an aerodynamic surface:

$$
\text{appendage} + \text{surface area} + \text{musculature} + \text{altered proportions} \;\rightarrow\; \text{aerodynamic function}
$$

That is exactly why powered flight and gliding have evolved many times, in insects, pterosaurs, birds, bats, and in gliding mammals, reptiles, amphibians, and fish. Most of the machinery was already there. The interesting invention is not "flight" but whatever underlying machinery made flight cheap to reach.

Now compare the **feather**. The feather needs more care than it usually gets, because the theropod fossil record forces us to locate the primitive precisely. Feather structures in non-avian dinosaurs show a sequence of at least five morphological stages:

- a simple hollow filament;
- tufts of filaments;
- branching with a central shaft;
- symmetric vanes;
- asymmetric aerodynamic vanes.

Each stage plausibly had its own uses, such as insulation, display, or brooding. The transitions between stages look like adjustments to how signaling pathways such as BMP and Shh pattern an existing follicle. In our terms they are low-coordination, configurational shifts along a gradient.

The candidate primitive is the first step: the **tubular β-keratin follicle**. This is an invagination of the skin that produces a cylindrical, continuously growing appendage, unlike a flat scale placode. Much of its molecular signaling was co-opted from older skin-appendage programs. Hair, feathers, and reptilian scales appear to share deep developmental machinery. Even so, the follicle introduced a new kind of generative structure that later lineages could reuse in many directions:

~~~
feather follicle → filament → down / contour / display / waterproofing / sensing / aerodynamic vanes
~~~

Flight sits *downstream* of the follicle, and most of the "feather" sits downstream of it too.

The correction is instructive. A primitive is usually smaller and earlier than the dramatic structure we name. The theropod record shows the stepwise path only because stem-group feathers were unusually well preserved. Where intermediates are lost, the same history would look like a single high-coordination leap. Section 5.6 returns to this problem.

This gives a working definition:

> **A biological primitive is an evolutionary innovation that creates a new reusable developmental capability, rather than a new phenotype assembled from existing capabilities.**

Co-option does not disqualify an innovation. If it did, almost nothing after the first cells would count as new. The question is not whether old parts were used. It is whether the result adds a new *operator* to later evolutionary search.

### 3.1 Standardizing the grain

"Capability" is slippery. Almost every morphological trait, including feathers, wings, and camera eyes, is built by co-opting deeper regulatory networks. Counting the "parts" of an innovation is therefore subjective unless every innovation is measured at the same level of organization. Without a fixed grain, it is easy to count a feather as many parts and a wing as few, or the reverse, depending on the conclusion one wants.

We therefore anchor developmental primitives at a single molecular grain. A level-3 primitive is a new instance of one of the following:

- a **Gene Regulatory Network (GRN) kernel**, a conserved, recursively wired subcircuit that specifies a developmental field;
- a **Character Identity Network (ChIN)**, the regulatory network that gives a homologous character its individual identity independent of its shape;
- a **Cell-Type Core Regulatory Complex (CoRC)**, the set of cooperating transcription factors that defines a distinct cell type.

On this grain, the feather follicle counts because it plausibly corresponds to a new ChIN. The wing does not, because it re-parameterizes existing limb and integument networks. Innovations at other levels, such as whole-cell endosymbioses or metabolic pathways, are not discarded. They are catalogued at their own level and compared within it, not mixed with developmental primitives.

With this definition and grain, a rough hierarchy of abstraction emerges:

1. **New substrate**: membranes, replicating polymers, chromosomes.
2. **New machinery**: photosynthesis, the eukaryotic cell, multicellularity.
3. **New developmental primitives**: new GRN kernels, ChINs, and CoRCs, such as those underlying muscle, neurons, skeletal tissue, feather and hair follicles, seeds, flowers, and fruit.
4. **New compositions**: wings, hands, trunks, branched and vaned feathers, specialized dentition, particular fruit forms.
5. **Optimization**: a faster cheetah, better camouflage, a drought-tolerant grass.

The hypothesis predicts a long migration of evolutionary activity from levels 1–3 toward levels 4–5.

This definition still relies on judgment. The next section replaces judgment with geometry.

---

## 4. Formalizing the Evolutionary Gradient

The key question is: *how many things had to change at once before the change became beneficial?* This separates **smooth learning** from **structural discontinuity**.

### 4.1 Smooth accessibility

Let $A$ be an ancestral state, $B$ a derived state, and $F$ fitness in a given environment. Suppose there is a path of small changes

$$
A \rightarrow A_1 \rightarrow A_2 \rightarrow \cdots \rightarrow B, \qquad F(A_{i+1}) \geq F(A_i).
$$

Then $B$ is **selectively accessible**. It may look spectacular, but it is not structurally new in our sense. Selection can push the lineage along at every step. "Wing" is a category we apply to the endpoint, and evolution never meets a categorical boundary on the way.

The classic example is the eye. Nilsson and Pelger's well-known model showed that a light-sensitive patch can become a camera-type eye through small, individually advantageous steps, given photoreceptors and pigment. Camera eyes have evolved more than once. The step that was plausibly hard came earlier: light-sensitive proteins and the photoreceptor cell types that use them. That was a primitive. The eye built on it is a configuration.

### 4.2 Structural discontinuity

Now suppose $B$ needs changes $x$, $y$, and $z$, where

$$
F(A+x) \le F(A), \quad F(A+y) \le F(A), \quad F(A+z) \le F(A),
$$

but

$$
F(A+x+y+z) \gg F(A).
$$

None of the components points toward the new capability on its own. The utility exists only in the conjunction. This is a real discontinuity in the adaptive landscape.

### 4.3 Three quantities

To measure the difference, consider all evolutionary paths $P$ from $A$ to $B$ that are permitted by the inherited genotype–phenotype map. We define three quantities.

**Coordination depth.**

$$
K(A \rightarrow B) = \min_{P} \; \max_{s \in P} \; |\Delta_s|
$$

Here $\Delta_s$ is the smallest set of mutually dependent modifications that must be present together at step $s$ before the step pays off. "Together" does not mean within one generation. Components can accumulate under drift or for unrelated reasons. $|\Delta_s|$ counts the components whose *present* utility depends on the eventual conjunction. Components are counted at the standardized grain of Section 3.1: cooperating regulatory inputs or sub-circuits, not anatomical parts.

- $K = 1$: ordinary smooth adaptation.
- $K = 2$: a pairwise dependency, such as reciprocal sign epistasis.
- Large $K$: a structural discontinuity.
- $K = \infty$ (no finite path under the current map): the innovation is unreachable unless the genotype–phenotype map itself changes first. Evolution sometimes has to evolve a new search operator, not just find a new point.

**Valley depth.**

$$
V(A \rightarrow B) = \min_{P} \; \max_{s \in P} \; \big[F(A) - F(s)\big]^{+}
$$

This is the largest fitness deficit along the cheapest route. It is the quantity the fitness-valley literature usually means.

**Reusability.** The obvious definition is cumulative: the number of later adaptations whose shortest path uses $B$. That definition has a fatal flaw. Cumulative reuse is an integral over all time after $B$'s origin. An innovation that arose 500 million years ago has had vast time and branching opportunity to collect dependents. An equally profound innovation that arose five million years ago has had almost none. If primitives are defined by cumulative $R$, then even under a constant-rate null model the origin rate of "high-$K$, high-$R$" innovations will decline toward the present. The decline would be produced purely by right-censoring, together with the macroevolutionary "push of the past" that inflates the apparent success of early-originating clades. The hypothesis would be confirmed by the calendar.

We therefore use one of two time-normalized measures.

*Windowed reusability* counts downstream reuse within a fixed window $\Delta t$ after origin, normalized by the diversification rate $\lambda$ of the bearing lineages over that window:

$$
R_{\Delta t}(B) = \frac{\big|\{\text{adaptations using } B \text{ arising in } [t_B,\, t_B + \Delta t]\}\big|}{\lambda_{[t_B,\, t_B+\Delta t]}}
$$

The window is fixed in generations in simulation, or at roughly $50$ Myr in the fossil record. Every innovation is then judged over the same horizon. Innovations younger than $\Delta t$ are excluded rather than scored low.

*Potential reusability*, or instantaneous metric compression, measures how much $B$ shortens paths across a standardized test suite $\mathcal{T}$ of phenotype pairs at the moment it enters the library $L$:

$$
R_{\text{pot}}(B) = \frac{1}{|\mathcal{T}|} \sum_{(x,y) \in \mathcal{T}} \Big[\, d_L(x, y) - d_{L \cup \{B\}}(x, y) \,\Big].
$$

$R_{\text{pot}}$ requires no future at all. It is the natural measure in simulation, where $d_L$ can be computed. $R_{\Delta t}$ is the practical measure for the biological record. Both could be refined to count the *diversity* of downstream gradients that $B$ opens, not just their number.

Each innovation then has a profile

$$
\text{Innovation profile} = (K,\; V,\; R_{\Delta t} \text{ or } R_{\text{pot}}).
$$

The feather follicle plausibly has high $K$ and high $R$. A wing, assembled from an existing limb and existing surface-producing machinery, has low $K$ even though its ecological consequences were very large. So do branched and vaned feathers, built on an existing follicle.

### 4.4 Why primitive status needs two properties

Defining a primitive as "anything with high $K$" would make the hypothesis circular. Finding that high-$K$ innovations are rare would just restate that improbable things are improbable. A primitive therefore has to meet two independent conditions:

$$
\text{primitive} \;=\; \text{high coordination cost} \;\wedge\; \text{high time-normalized reuse}.
$$

The time normalization is part of the definition, not a refinement. Without it, the second condition brings back a different circularity: old things look reusable because they are old.

The theory is not that difficult things are rare. It is that **a rare difficult thing changes the geometry of future evolution enough to make future difficult things less necessary.**

---

## 5. Coordination Depth Versus Fitness Valleys

Coordination depth is related to the established idea of fitness valleys, but it is not the same.

### 5.1 What the valley literature captures

Population genetics has a rich vocabulary for innovations that cannot be reached by monotonic ascent:

- **Sign epistasis.** A mutation's effect changes sign depending on genetic background.
- **Reciprocal sign epistasis.** Two mutations each reverse the sign of the other's effect. This produces multiple peaks and blocks monotonic paths. It has been shown experimentally in microbes and proteins.
- **Valley crossing and stochastic tunneling.** Populations reach a higher peak through a deleterious intermediate, either by drift in small populations or because a double mutant arises before the single mutant is purged in large ones.
- **Compensatory evolution, neutral networks, and evolutionary detours.** These are alternative routes around barriers.

### 5.2 Depth versus width

Valley depth $V$ measures *how bad* the worst intermediate is. Coordination depth $K$ measures *how wide* the coordinated move must be. They are independent axes:

| | Low $K$ | High $K$ |
|---|---|---|
| **Low $V$** | Smooth ascent (wing proportions) | Wide but flat plateau: many neutral components must accumulate silently |
| **High $V$** | Narrow, deep valley: one bad intermediate | Wide, deep barrier: rare and transformative |

A narrow, deep valley can be crossed by a single unlucky but survivable mutation. A wide, flat plateau has no single bad step, but needs several individually useless components to coexist before any advantage appears. Selection gives no guidance across the plateau, and drift tends to erode partial assemblies.

In physical terms, $V$ is like an **energy barrier**, while $K$ is like a **critical nucleus size**. In a first-order phase transition, a new phase becomes self-sustaining only once a cluster is large enough. Below that size it dissolves. A structural primitive is a nucleation event in phenotype space.

The independence of the two axes is easy to lose in practice. Suppose each incomplete component carries a small fitness cost $c$, for example the cost of making a protein that does nothing yet. A plateau of width $K$ then becomes a valley of depth

$$
V = (K - 1)\,c.
$$

Width has been silently converted into depth. Any model or argument that charges a maintenance cost for partial assemblies is studying a mixture of $K$ and $V$. It cannot claim that width alone drives a result. Section 8 treats this as a design constraint.

### 5.3 Where the valley framing stops

Most valley research deals with a handful of mutations in proteins or microbial genomes. The questions here are one level higher: feather follicles, fruit, new cell types, new ecological interfaces. At that level, the barrier may come less from fitness loss and more from **integration cost**. A new structure has to be produced, regulated, energetically supplied, developmentally integrated, and kept viable through intermediate states. It also has to give selection something to see before the full system exists. That is a $K$ problem more than a $V$ problem.

### 5.4 Candidate structural discontinuities

The following cases illustrate the range. The classifications are hypotheses to test, not settled facts.

- **Aerobic citrate use in Lenski's long-term *E. coli* experiment.** After more than 30,000 generations, one of twelve populations evolved the ability to grow on citrate in the presence of oxygen. Replay experiments showed that earlier *potentiating* mutations made later *actualizing* mutations possible. The actualizing step involved a duplication that put a citrate transporter under a new promoter. This is a laboratory example of an innovation with $K > 1$, where some components accumulated without being selected for that function. It is the clearest experimental illustration of incubation time.
- **Complex logic functions in Avida.** In Lenski, Ofria, Pennock, and Adami's digital-evolution work, the most complex logic function evolved only when simpler functions were rewarded first as stepping stones. Some steps along successful lineages were deleterious when they occurred. Complex features arose by building on and repurposing simpler ones.
- **Eukaryogenesis** (a level-2 event, catalogued at its own grain). Turning an endosymbiont into an integrated organelle needed coordinated changes in energy metabolism, gene transfer, protein import, and host regulation. It appears to have happened once, at least in the sense that all known eukaryotes descend from one such event. Its reusability is effectively all complex life.
- **Feather and hair follicles.** Each is a new skin-appendage ChIN built from co-opted signaling. Each has a single origin within its lineage and very high downstream reuse. The later elaborations of each, such as feather branching and vanes or the many forms of mammalian pelage, are configurations.
- **The flower–fruit reproductive architecture.** Enclosed ovules, coordinated floral organ identity, and a ripening ovary form a package whose regulatory parts are interdependent.
- **Vertebrate adaptive immunity.** Recombination-based receptor diversity requires the recombination machinery, recombinable receptor genes, selection of cells against self, and supporting cell types. This is plausibly a high-$K$ conjunction.

Some contrasting cases look like *low-$K$ configurations given their prerequisites*. Each has evolved many times:

- **Wings and gliding surfaces**: many origins.
- **Camera eyes**: several origins, given opsins.
- **C₄ photosynthesis**: dozens of independent origins in flowering plants, given C₃ machinery and the right anatomical preconditions.
- **Fleshy fruit**: many origins from dry-fruited ancestors.
- **Live birth and placenta-like structures**: many origins across fish, reptiles, and mammals.

### 5.5 Convergence frequency: suggestive, but not a measure

The comparison suggests a heuristic. Something nature has invented a dozen times is probably reachable by a smooth gradient. Something invented once and then reused for hundreds of millions of years looks like a primitive.

The heuristic is useful for generating hypotheses, but it cannot serve as the primary measure of $K$. A single origin has two explanations that convergence data cannot separate:

- the trait was **intrinsically hard** to assemble (high $K$); or
- it was **easy to assemble**, but the first lineage to evolve it radiated and occupied the ecological opportunity, so no second origin could gain a foothold (low $K$ plus preemption, Section 6.3).

Using single-origin status to infer high $K$, and then using high $K$ to test for preemption, is circular. The preemption mechanism itself predicts single origins. Convergence frequency therefore stays in this paper as a heuristic for choosing candidates. Section 10 replaces it with a direct molecular estimate.

### 5.6 Stem-group erasure

A second bias works in the same direction. When stem lineages carrying intermediate forms go extinct and leave poor fossils, the stepwise $K=1$ scaffolding that led to an innovation disappears. Comparing surviving crown groups then suggests a large saltational jump: high apparent $K$ where the true path was gradual. The feather is the cautionary case. Without the exceptional theropod record, "the feather" would look like a single high-$K$ event, when only its follicle may deserve that label. Any empirical estimate of $K$ from living taxa is an upper bound until extinct intermediates have been accounted for.

---

## 6. The Mechanism: Evolutionary Self-Smoothing

Why would the rate of primitive innovation fall over time? "The easy inventions were found first" is not enough. That explanation would apply equally to a fixed, finite set of possible inventions. We propose three mechanisms that act together, and each is in principle testable.

### 6.1 The library changes the metric

Let $L$ be the current library of developmental primitives, and let $d_L(x, y)$ be the shortest mutational distance between phenotypes $x$ and $y$ under that library. When a primitive $p$ enters the library,

$$
d_{L \cup \{p\}}(x, y) \;\le\; d_L(x, y)
$$

for a large set of future phenotype pairs. A primitive is a point in phenotype space, but it is also a **change to the metric** of that space. It turns regions that once required high-$K$ conjunctions into regions reachable by $K = 1$ steps. In effect, it compiles a past discontinuity into an inherited gradient.

This inequality restates two established ideas in a common currency:

- **Kirschner and Gerhart's facilitated variation.** Conserved core processes make useful phenotypic variation cheap to generate.
- **Neutral-network percolation**, as developed by Schuster, Fontana, and Wagner. Extended networks of equivalent genotypes bring many distinct phenotypes within a few mutations of one another.

What the metric framing adds is a quantity that can be tracked through time. The same quantity defines potential reusability $R_{\text{pot}}$ in Section 4.3.

As the library grows, more and more environmental problems have nearby solutions. The landscape becomes progressively smoother *relative to the organisms searching it*. It is not becoming intrinsically simpler. The searcher is gaining better coordinates.

One biological effect pushes the other way. Phenotypic plasticity and mechanical accommodation can let existing tissues absorb a new structure before genetic support for it exists. Bone remodeling under load, as in Wolff's law, is an example. When old primitives scaffold new ones in this way, they *lower* the $K$ of future primitives instead of making those primitives unnecessary. Self-smoothing predicts that the reduction in *need* outweighs this reduction in *cost*. That is an empirical bet, not a given.

### 6.2 Entrenchment raises replacement cost

Old primitives gather dependents, which philosophers of biology such as Wimsatt call *generative entrenchment*. A component used by many downstream developmental processes is under strong stabilizing selection, because changing it breaks every caller. The toolkit therefore becomes both more reusable and harder to replace. A new primitive that would compete with an entrenched one, rather than add to it, faces a cost that grows with the incumbent's dependency count.

In biology this cost is larger than in software, because biological modules are poorly encapsulated. A pleiotropic transcription factor does not have a clean interface. Its "callers" are not only the pathways that use it deliberately but also every pathway it leaks into. Entrenchment comes from cross-talk as well as from explicit reuse.

### 6.3 Preemption by adequacy

The third mechanism is the most distinctive and the least appreciated. Suppose a new environmental challenge can be met in either of two ways:

- a **mediocre solution** built by recombining three existing modules, which is reachable smoothly and soon; or
- a **superior solution** that needs a five-part new module, which is reachable only through a long, unselected assembly.

The mediocre solution arrives first and spreads. Once it is fixed, it *removes most of the selective advantage* that the unfinished structural innovation would have had. The gradient that might eventually have rewarded the new primitive has been captured.

> **Existing tools do not merely offer alternatives to primitive innovation. They preempt the selective gradient that might have supported it.**

This is clonal interference and ecological incumbency, extended across levels of coordination. In ordinary clonal interference, beneficial mutations in an asexual population compete, and the one that sweeps first eliminates the others. Here the competitors are not alternative point mutations. They are a fast $K=1$ configuration and a slow high-$K$ structural incubation.

The race can be stated as a waiting-time inequality. Consider a population of size $N$ with per-component mutation rate $\mu$. Let $s_1$ be the selective advantage of the adequate configuration. The configuration's expected time to appear and then sweep is approximately

$$
\tau_{\text{config}} + t_{\text{sweep}} \;\approx\; \frac{1}{N \mu s_1} \;+\; \frac{\ln(N s_1)}{s_1}.
$$

Now consider a primitive that needs $K$ components present together in one genome before any of them is purged or eroded. Its nucleation time, by stochastic tunneling, scales roughly as

$$
\tau_{\text{prim}} \;\propto\; \frac{1}{N \mu^{K}}.
$$

The exponent is softened when intermediates are strictly neutral and can drift to fixation one at a time. Preemption occurs whenever

$$
\tau_{\text{config}} + t_{\text{sweep}} \;<\; \tau_{\text{prim}}.
$$

Because $\tau_{\text{prim}}$ grows geometrically in $K$ while the configuration's time grows only logarithmically in $N$, the inequality holds for almost any realistic $K \geq 3$ once an adequate configuration exists. Several population-level factors modulate it:

- **Effective population size** $N_e$. Large populations tunnel more easily but also sweep configurations faster. Small populations rely on drift across plateaus.
- **Spatial deme structure.** Subdivision shelters local partial assemblies from global sweeps. It acts as a natural form of the "reserved space" tested in Experiment 3.
- **Recombination.** Recombination breaks up partial assemblies before they are complete, but it also lets components assembled in different lineages come together.

This is stronger than developmental constraint. A mature toolkit does not just make new primitives harder to build. It **occupies the ecological solution space** that would have rewarded them. The implication is uncomfortable: *local evolvability can competitively suppress global evolvability.*

### 6.4 The hypothesis

Putting the three mechanisms together:

> **The history of life shows a declining rate of high-coordination, high-reusability innovations. Each successful primitive expands the space of low-coordination adaptive solutions, developmental entrenchment raises the cost of replacing the accumulated architecture, and adequate configurational solutions preempt the selective gradients that would support new primitives.**

The surface prediction looks paradoxical:

$$
\frac{d\,(\text{configurational novelty})}{dt} > 0 \qquad \text{while} \qquad \frac{d\,(\text{primitive novelty})}{dt} < 0.
$$

A mature biosphere can become *more* morphologically diverse while becoming *less* fundamentally innovative. A rainforest with millions of exquisitely specialized species may be an ancient biological platform doing an enormous amount of combinatorial computation, with almost nothing added to its instruction set.

Earth's history then looks less like an accumulation of species and more like **platform maturation**:

$$
\text{primitive invention} \rightarrow \text{primitive proliferation} \rightarrow \text{compositional explosion} \rightarrow \text{optimization}.
$$

The Cambrian and the Cretaceous Terrestrial Revolution are then not just interesting episodes in a uniformly creative process. They may be **dwindling rounds of platform construction**, after which most evolution runs on the platform.

---

## 7. Relation to Existing Theory

Biology recognizes nearly every mechanism in the hypothesis. What is missing is the combination, together with a shared metric.

- **Developmental bias and constraint.** Development does not map genetic variation uniformly onto phenotype space. Some forms are easy to produce and others are nearly impossible. Modern treatments stress that bias actively *channels* variation, not just limits it. Our $K$ is a way of quantifying that channeling for a particular target.
- **Evolvability, facilitated variation, and neutral networks.** Kirschner and Gerhart's facilitated variation describes conserved core processes that are recombined and re-regulated to generate useful variation cheaply. Neutral-network theory explains why so many phenotypes lie close together. Both are the positive side of self-smoothing, and Section 6.1 states them as a single metric inequality. Our addition is the claim that the same facilitation lowers the *need* for, and the *opportunity* for, new core processes.
- **Clonal interference.** Competing beneficial lineages in asexual populations limit one another's fixation. Preemption by adequacy carries this logic across levels of coordination, from competing point mutations to a competition between fast configurations and slow structural incubations.
- **Exaptation, co-option, bricolage.** Jacob's "evolution as tinkerer" fits low-$K$ configurations well. Coordination depth helps separate tinkering from the rarer events that give the tinkerer new parts.
- **Constructive neutral evolution and scaffolding.** These explain how high-$K$ conjunctions can assemble without stepwise selection, and they supply the mechanism behind incubation time. Deep time lets life build up *dormant compatibility*.
- **Key innovations.** These are classified by their *consequences*, such as ecological access and diversification, not by their *construction cost*. A trait can be a key innovation and structurally easy.
- **Major transitions.** Maynard Smith and Szathmáry's major transitions concern changes in individuality and information transmission. That category is narrower than ours and points in a different direction.
- **Historical contingency and lock-in.** Path dependence and "frozen accidents" describe entrenchment but do not usually predict a *secular decline* in a specific innovation class.
- **Fitness-landscape theory.** Kauffman's NK model and its successors capture ruggedness and local optima on a *fixed* landscape. Self-smoothing needs a landscape whose effective geometry *changes as the searcher accumulates structure*.

Two rival explanations must be beaten, not merely acknowledged.

The first is **demographic**. The shift from microbes to large multicellular organisms brought a large drop in effective population size and the spread of obligate sexual recombination. Both suppress stochastic tunneling across high-$K$ plateaus, as the inequality in Section 6.3 shows, regardless of toolkit maturity. A slowdown in primitives after the Cambrian could be a population-genetic consequence of being large and few, with no need for self-smoothing.

The second is **passive exhaustion**. There may be only a finite number of physically and chemically workable developmental motifs, and ecological niche space may simply saturate.

Self-smoothing makes predictions that neither rival makes: the declining primitive rate should co-occur with *falling adaptation latency* and *rising reuse*, and the decline should depend on reuse being possible. The experimental controls below are built to separate these explanations.

The empirical question has been raised explicitly in the macroevolutionary literature: has the frequency of different modes of diversification changed over the history of life? The field lacks a common rule for comparing a wing, a feather, a fruit, a new cell type, a symbiosis, and a new level of individuality. Coordination depth, valley depth, and time-normalized reusability, measured at a standardized grain, together offer one.

There is also a close analogy in machine learning. Ordinary adaptation resembles *parameter learning* within a fixed representation. Structural innovation resembles *architecture search* or *representation learning*. Put simply:

> **Adaptation searches within a phenotype-generating language. Structural innovation modifies the language.**

Once the language is rich, most problems can be expressed through nearby parameter changes. That reduces the pressure on the language itself to change.

---

## 8. Experimental Program

The fossil record cannot easily separate self-smoothing from simpler explanations, such as a finite pool of possible inventions, survivorship bias, poor preservation of early forms, or demographic change. Computation can. The goal is not just to show that rugged landscapes produce local optima, which is easy and already known. The goal is to show a specific causal chain:

$$
\text{primitive fixation} \rightarrow \text{shorter future adaptive paths} \rightarrow \text{more reuse} \rightarrow \text{preemption of competing primitives} \rightarrow \text{declining structural fixation}.
$$

Every experiment below needs an **evolving search space**, a world in which the searcher's accumulated structure changes the effective geometry of later search. Standard NK models are useful baselines. However, their genome dimensions and neighborhood relations are fixed, so they cannot represent life adding operators to its own evolutionary language.

A successful model should produce four curves at the same time:

1. Phenotypic or ecological diversity **increases**.
2. Adaptation latency to new environments **decreases**.
3. Reuse of existing primitives **increases**.
4. The fixation rate of new primitives **decreases**.

The hypothesis predicts that all four occur together. Any one of them alone is uninteresting.

Two design rules apply to every experiment.

**Separate width from depth.** Incomplete prerequisite sets must *not* carry a maintenance cost by default. As Section 5.2 showed, such a cost turns a plateau of width $K$ into a valley of depth $(K-1)c$. Each experiment instead sweeps a two-dimensional grid over $K$ and $V$. It covers at least a **strictly neutral regime** ($V = 0$, high $K$), in which partial assemblies cost nothing but give nothing, and a **costly regime** ($V > 0$, high $K$). If self-smoothing and preemption appear in the neutral regime, then combinatorial width alone is enough to drive them.

**Score reusability with $R_{\text{pot}}$.** In simulation, the metric $d_L$ can be computed directly. Primitives are therefore scored by instantaneous metric compression at the moment of origin, not by how many descendants they later accumulate. This rules out right-censoring by construction.

We present the four experiments in order of priority. The first two set up the basic dynamic. The third tests the most distinctive mechanism. The fourth tests entrenchment in the most literal form available.

---

### Experiment 1: Hypergraph Innovation Chemistry

**Purpose.** Isolate the logic of prerequisites, with coordination depth as an explicit, controllable parameter.

**Representation.** Each biological capability is a node, for example *membrane, adhesion, pigment, contractility, signal, tube, branching, storage, dispersal*. A structural innovation is a **directed hyperedge**:

$$
\{a, b, c\} \rightarrow d.
$$

An ordinary graph edge needs only one predecessor. A hyperedge fires only when *all* its prerequisites are present. Coordination depth is then simply the **arity** of the hyperedge. For example:

$$
\{\text{storage tissue},\ \text{developmental enclosure},\ \text{disperser attraction}\} \rightarrow \text{fruit-like interface}.
$$

The products of hyperedges become nodes that later hyperedges can use as prerequisites. This is what makes the system an expanding toolkit and not a fixed tech tree.

**Avoiding a built-in conclusion.** If the experimenter specifies all hyperedges in advance, the result is designed into the world. Instead, generate potential capabilities *procedurally* from random compositional rules over a set of atomic features. Let successful combinations become named, reusable nodes through **chunking**. This produces a kind of *evolutionary compilation*. Once $\{a, b, c\} \rightarrow d$ has fired, later evolution treats $d$ as a single unit. The set of atomic features must itself be able to grow (see the expanding-basis control in Section 9). Otherwise the closure of the toolkit is bounded from the start.

**Dynamics.** Each lineage holds a capability set $S$ and a set of partial assemblies. In each generation:

- capabilities can be lost, duplicated, or slightly modified;
- partial assemblies are neutral or costly, according to the $(K, V)$ sweep;
- completed hyperedges earn ecological reward;
- existing capabilities can be combined to exploit niches;
- lineages compete for a finite, renewing set of niches.

**Predictions.**

- In early history, most niches need capabilities that do not yet exist, so the rare completion of a hyperedge has a very large effect.
- Primitive count grows quickly at first, and the number of possible combinations grows faster than linearly.
- Later, the **closure** of the accumulated toolkit, $\operatorname{closure}(S)$, reaches enough of niche space that most new niches can be exploited with arity-1 or arity-2 moves.
- The fixation rate of high-arity hyperedges falls even though such hyperedges remain available, including in the strictly neutral regime.

**Strengths.** This is the cleanest test of "toolkit completion", because the central quantity is directly observable. It is cheap to run and easy to sweep across parameters.

**Weaknesses.** It abstracts away genetics, development, and population structure. It shows that the logic works, not that biology follows it.

---

### Experiment 2: Evolutionary Chunking on Compositional Tasks

**Purpose.** Show directly that primitives *change the metric of phenotype space*, which is mechanism 6.1.

**Representation.** Individuals solve tasks represented as expression trees, or equivalently as small Boolean circuits. At first, every solution must be built from atomic operations such as `COPY` and `NOT`. Macros arise through a purely blind mutational operator, `ENCAPSULATE_RANDOM_SUBTREE`. It wraps an arbitrary subtree of an individual's own genome into a heritable macro:

~~~
before:  (A (B C) (D E))
after:   M1(A, E)          ; M1 encapsulates the former subtree
~~~

No global observer counts which subtrees recur across the population. A useful macro must earn its place through selection on the lineages that carry it, exactly as a co-opted module must in biology. An observer that compiled frequent patterns would amount to an intelligent designer handing out abstractions.

A structural operator is not handed out by a single lucky mutation. It becomes functional only when $k$ coordinated pieces exist, for example a detector, routing, state, output binding, and regulation. Until then it is neutral or costly, according to the $(K, V)$ sweep. This gives the experiment a tunable $K$.

**Leaky encapsulation.** Perfectly encapsulated macros flatter the software analogy. A second regime should make macros share global registers or state, so that invoking one has side effects on others. In this regime, pleiotropy is the default and insulation must itself evolve. A more biologically grounded alternative replaces trees with a **Wagner-style GRN matrix model**,

$$
S(t+1) = \sigma\big(W \cdot S(t)\big).
$$

In that model, a primitive is a new stable attractor of the network, reachable only by coordinated changes to several entries of $W$ ($K > 1$). A configuration is an upstream regulatory switch that routes development into an existing attractor ($K = 1$). If self-smoothing survives the move from clean macros to leaky macros and attractors, the software analogy has done its job and can be set aside.

**Environment.** Tasks are drawn from a generative grammar with recurring latent substructures. Each epoch brings a new task. Fitness is

$$
W(g, E) = \operatorname{accuracy}(g, E) - \lambda \, \operatorname{cost}(g).
$$

Some tasks can be solved by recombining existing macros. Others are much cheaper if a new operator is discovered. Once an `AND`-like or `XOR`-like operator exists, a large family of previously difficult functions becomes smoothly reachable.

This creates a trap. Once the evolved macros span a functionally complete basis (`NAND` alone suffices for Boolean logic), every future task in a fixed grammar is expressible. Primitive invention must then fall to zero by theorem, not by self-smoothing. The grammar must therefore periodically gain genuinely orthogonal structure, under the expanding-basis control of Section 9.

**Measurements.**

- Number of macros created, and their birth and extinction rates.
- Adaptation time per new task.
- Mean description length of phenotypes, measured in the current library and in the original atomic language.
- $R_{\text{pot}}$ of each macro at its origin, and its realized reuse count over a fixed window.
- Age distribution of heavily reused macros.
- Fraction of mutations operating *inside* old macros versus *above* them, that is, wiring macros together.
- Mutational distance $d_L(x, y)$ between successive task solutions, tracked as $L$ grows.

**Predictions.** Evolution moves *upward in abstraction*. Early lineages invent subtrees. Later lineages wire macros together. Description length in the evolved library falls while description length in the atomic language rises, which means phenotypes become more complex but cheaper to reach. New-macro creation peaks and then declines, while adaptation keeps accelerating. The decline should persist after orthogonal task structure is injected, though it should show a transient rebound with each injection.

**Key comparison.** Run matched populations with and without macro inheritance. If the declining primitive rate disappears when macros cannot be inherited, then reuse is causal and the decline is not simple exhaustion.

---

### Experiment 3: Preemption by Adequacy

**Purpose.** Test the most distinctive and least obvious mechanism: that mature toolkits actively suppress structural innovation by capturing its selective gradient (Section 6.3). Of the four experiments, this is the one most likely to produce a nontrivial result instead of merely formalizing saturation.

**Design.** Present two populations with the same sequence of new challenges, inside the framework of Experiment 1 or 2.

- **Population A (mature toolkit):** inherits a large library of adequate, reusable primitives.
- **Population B (impoverished toolkit):** inherits a small library.

The populations differ *only* in their inherited library. They must have identical maintenance costs on partial assemblies, identical mutation rates, identical population sizes, and the same $(K, V)$ settings. An earlier version of this design gave Population B cheaper partial assemblies. That confounds the test: if B then invented more primitives, the result would show that B's genetics were subsidized, not that A suffered from preemption.

Each challenge allows two kinds of solution:

1. a **low-quality reuse solution**, reachable smoothly and soon from a rich library;
2. a **high-quality structural solution**, which needs $k$ coordinated components.

Run the populations under three conditions: in isolation, in mixed competition for shared niches, and in mixed competition with reserved ecological space for unfinished innovations.

**Intra-population tracker.** The two-population test is complemented by a measurement inside a single mature population, which is closer to how preemption would occur in nature. Tag every sub-lineage that carries a nascent high-$K$ partial assembly. Record how often that sub-lineage is driven extinct by a sibling lineage sweeping on a quick $K=1$ macro recombination. Compare the observed rate with the waiting-time inequality of Section 6.3, varying population size, deme structure, and recombination rate. This is clonal interference measured directly at the level where the theory places it.

**Predictions.**

- In isolation, A adapts first. B adapts more slowly but sometimes discovers a fundamentally better primitive.
- In mixed competition, A often eliminates B *before* B's structural solution matures. The superior primitive is never fixed anywhere.
- With reserved space, which acts as a no-preemption control, B's structural solutions mature and can eventually displace A's mediocre ones.
- Within a single mature population, partial assemblies are lost to sibling sweeps more often than to drift or to their own costs. The loss rate rises with the size of the library, and it should also appear in the strictly neutral regime.

**Biological reading.** This experiment also bears on mass extinctions. Removing incumbents is a form of reserved space. If preemption is real, extinctions should not create primitives. They should *release* primitives already incubating in marginal lineages. That matches the correction in Section 2.

**Falsification.** If structural solutions fix at the same rate whether or not adequate reuse solutions are available, preemption is not operating. The decline in primitive rate would then need another explanation.

---

### Experiment 4: Digital Organisms with an Evolvable Instruction Set

**Purpose.** Test entrenchment (Section 6.2) in its most literal form, and check that the dynamic survives in self-replicating organisms with open-ended ecology.

**Design.** Digital-evolution platforms in the Avida tradition use self-replicating programs built from a fixed instruction set such as `COPY`, `MOVE`, `ADD`, `JUMP`, and `SENSE`. Organisms earn energy by replicating and by performing environmental functions. The change here is to **make parts of the interpreter heritable**. A new instruction becomes functional only when several genomic regions cooperate:

- an opcode recognizer;
- operand routing;
- execution logic;
- a state update;
- a replication-safe encoding.

Once complete, the new instruction can be called cheaply anywhere in descendants' programs. This is a real addition of an operator, not just a longer program. As in Experiment 2, a leaky regime should let opcodes share interpreter state, so that their side effects reach beyond the code that calls them.

**Predictions.**

- Early lineages gain useful opcodes. Once the instruction set is expressive enough, later problems are solved by ordinary programming.
- Program-level behavioral diversity keeps growing.
- Opcode invention declines, and the mean age of heavily used opcodes rises.
- **Entrenchment emerges on its own.** An opcode called from hundreds of sites becomes nearly frozen, because any change to its interpreter breaks every caller. The organisms literally acquire *legacy APIs*. In the leaky regime, entrenchment should be stronger and should appear sooner, because callers include everything the opcode leaks into.

**Measurements.** Opcode birth and death rates, call-site counts per opcode, the mutational tolerance of interpreter regions as a function of call-site count, and the fraction of fitness earned through ancient versus recent opcodes.

**Why it matters.** Experiments 1–3 can be criticized as too abstract. Experiment 4 puts the full theory into a system with replication, mutation, competition, and open-ended function, where entrenchment arises from dependency rather than being imposed by the modeler.

---

### 8.1 Shared instrumentation

All four experiments should record, per generation:

~~~
mean fitness                      phenotype diversity
primitive count                   primitive birth / extinction rate
adaptation latency                mean primitive age
R_pot at origin                   windowed reuse count
mean K of newly fixed innovations mean V of newly fixed innovations
fraction of fitness from old primitives
partial assemblies lost to sibling sweeps
~~~

The signature of self-smoothing is:

~~~
primitive births:     spike, then decline
primitive reuse:      rise
phenotype diversity:  continue rising
adaptation latency:   decline
primitive mean age:   rise
coordination depth:   decline
~~~

Mutation-class probabilities, such as rewiring, duplication, partial-assembly accumulation, loss, and completion, must be **swept**, not fixed. So must the $(K, V)$ grid. A result that depends on one hand-tuned setting is not a result.

### 8.2 The simulated fossil filter

The simulations also allow a test that the fossil record cannot perform on itself. At the end of each run of Experiments 1–4, prune 95–99% of extinct lineages from the simulated phylogeny, with stepping-stone lineages pruned preferentially, as taphonomy and competitive extinction tend to do. Then reconstruct $K$ for each innovation using only the surviving "crown taxa", as a comparative biologist would. Finally, compare the reconstructed $K$ with the true $K$ recorded during the run.

We expect the filter to inflate apparent $K$ systematically. Gradual $K=1$ paths whose intermediates were outcompeted should look like saltational leaps. Preemption makes this worse, because it is precisely the lineages carrying intermediate forms that get eliminated. Measuring the size of this inflation, and showing which innovations it affects, would give paleobiology a calibration. It connects these simulations to the empirical program in Section 10.

---

## 9. Controls and Methodological Traps

The hypothesis is easy to "confirm" by accident. Each of the following controls rules out a specific cheap explanation.

1. **Out-of-distribution / expanding-basis control.** Generating ever-new tasks from a fixed grammar is not enough. Once the evolved toolkit becomes functionally complete over that grammar, primitive invention must stop by theorem. The control therefore periodically injects genuinely orthogonal task structure: new atomic variables, new physics, or new input modalities that *cannot* be expressed in the existing macro basis without new primitives. Self-smoothing predicts that the primitive rate stays depressed, relative to an impoverished-toolkit baseline, even after such injections. Saturation predicts a full reset.
2. **Coupon-collector null.** Compare the observed decay of primitive births with an analytic **passive coupon-collector model**: random sampling from a finite pool of possible primitives with no metric compression. Self-smoothing must produce a decay that is faster than this null, or shaped differently from it, and the difference must disappear when reuse is disabled.
3. **No-reuse control.** New primitives solve one task but cannot be reused. If the effect disappears, reusability is causal.
4. **No-preemption control.** Reserve ecological space for unfinished innovations (Experiment 3). This tests whether smooth solutions suppress structural ones.
5. **No-entrenchment control.** Let old primitives be replaced without breaking downstream users. This separates legacy dependency from simple toolkit abundance.
6. **Fixed-library control.** Forbid primitive invention after initialization. This measures how much apparent novelty recombination alone can produce.
7. **Complexity-normalized environment.** Make sure later tasks are not intrinsically easier. Difficulty must be measured against a *fixed atomic language*, not the currently evolved toolkit. Otherwise "later problems are easier" is trivially true.
8. **Width–depth separation.** Report every result in both the strictly neutral and the costly regime. A result that appears only when partial assemblies are costly is a valley-depth result, not a coordination-depth result.
9. **Parameter parity.** Any comparison between populations must hold all genetic parameters fixed except the one under test.

The deepest trap is the **tautology trap** from Section 4.4, and it has two forms.

- If "primitive" just means "required $k$ simultaneous changes", rarity follows by definition.
- If "primitive" means "high cumulative reuse", a decline toward the present follows from right-censoring.

Primitive status must require *both* high $K$ *and* high *time-normalized* reuse. The causal chain, not the declining rate alone, is the observable that matters.

---

## 10. Toward an Empirical Test in the Biological Record

The simulations test whether the mechanism is coherent. The biological claim needs a separate empirical program:

1. **Catalog innovations** across the tree of life at the standardized grain of Section 3.1: new cell-type CoRCs, GRN kernels, and ChINs. Catalog level-1 and level-2 events (substrates, symbioses, metabolic machinery) separately at their own grain.
2. **Estimate $K$ directly** through **molecular bricolage depth**. This is the number of cooperating transcription factors, or previously independent sub-circuits, that were wired together at the stem node of a novel CoRC or kernel. It can be inferred with comparative single-cell transcriptomics (scRNA-seq) and ancestral sequence reconstruction. Convergence frequency is used only to choose candidates, for the reasons given in Section 5.5. Every estimate is treated as an upper bound and corrected using inflation factors calibrated by the simulated fossil filter of Section 8.2.
3. **Estimate $R_{\Delta t}$** as the number and diversity of lineage-specific adaptations that depend on the innovation within a fixed window after its origin (on the order of $50$ Myr), normalized by the diversification rate of the bearing clade. Innovations younger than the window are excluded rather than scored.
4. **Date invention, not radiation**, using molecular clocks and ancestral-state reconstruction instead of first conspicuous fossil appearance.
5. **Test for a secular trend** in the rate of high-$K$, high-$R_{\Delta t}$ innovations. The regression should include as explicit covariates:
   - effective population size $N_e$;
   - lineage survival rates;
   - preservation potential;
   - clade size;
   - the pull of the recent.

   The $N_e$ covariate is essential. Without it, a declining primitive rate could simply reflect the transition from huge microbial populations to small populations of macroscopic eukaryotes, which tunnel across plateaus far less easily (Section 6.3). Self-smoothing predicts a decline that remains *within* clades of comparable $N_e$.

The hypothesis predicts a curve heavily weighted toward early history, with a few late spikes associated with long incubation times. The preemption confound also has to be addressed directly. For a candidate primitive with a single origin, ask whether the phylogeny shows *failed parallel attempts*: partial regulatory assemblies or structures in other lineages that never radiated. Such traces would support preemption over intrinsic difficulty, and they are exactly what the bricolage-depth measure can detect where morphology cannot.

---

## 11. Implications and Caveats

**Novelty is not ending; it is moving upward in abstraction.** The strong form of the original intuition was that "new innovations are increasingly rare to the point of almost extinction." The defensible form is narrower. *Primitive* novelty may be approaching extinction. *Configurational* novelty may be accelerating. Evolution does not stop innovating. The place where innovation happens moves up a level.

**Future biospheres would be new products on an ancient runtime.** Give Earth another five hundred million years and there will be spectacular organisms. The hypothesis predicts that they will be ingenious rearrangements of very old machinery, something like *bilateral body plan + neurons + muscle + connective tissue + circulation + modified appendages + existing sensory proteins + regulatory change*, and not anything comparable in depth to the eukaryotic cell or the flower.

**Caveats that could weaken the thesis:**

- **Microbial and horizontal innovation.** Horizontal gene transfer, viral gene capture, and microbial metabolic invention may keep producing high-$K$ novelty well below the level of morphology. Novel enzymatic pathways for degrading synthetic compounds are one example. The decline may be specific to large multicellular organisms with entrenched development.
- **Demography rather than geometry.** Small effective populations and obligate recombination may explain much of the slowdown on their own. If the decline disappears once $N_e$ is controlled for, self-smoothing is at most a secondary cause.
- **Plasticity as a scaffold.** Phenotypic plasticity and mechanical accommodation may let old primitives *lower* the $K$ of new ones, which works against self-smoothing (Section 6.1). Which effect dominates is an empirical question.
- **Symbiosis as a bypass.** Endosymbiosis assembles a high-$K$ conjunction by merging two already-complete systems instead of building pieces one at a time. If symbiotic mergers remain available, the primitive rate may not fall toward zero.
- **Environmental reshaping of landscapes.** Large environmental shifts can turn inaccessible paths into selectable ones, temporarily lowering $K$ for some targets.
- **New substrates.** Culture and technology are arguably a new substrate, level 1 in the hierarchy. On that view, the biosphere's most recent primitive is not a tissue but a second inheritance system that searches by different rules.
- **Measurement uncertainty.** $K$ is difficult to estimate for ancient innovations. Stem-group extinction biases estimates upward, and every proxy carries bias. The feather shows how easily a gradual sequence can be mistaken for a leap.

---

## 12. Conclusion

The core of the argument is a single distinction. Some evolutionary change follows gradients and some must cross discontinuities. Coordination depth, the minimum number of mutually dependent changes that must coexist before an innovation is visible to selection, makes the distinction measurable. Paired with time-normalized reusability and measured at a standardized regulatory grain, it identifies the rare innovations that rebuild the toolkit, as opposed to the countless innovations that use it.

From there the historical claim follows. Each primitive compiles a past discontinuity into an inherited gradient. Each entrenched primitive becomes harder to replace. Each adequate configuration absorbs the selective pressure that might have rewarded a better primitive. That last mechanism is a race between a fast sweep and a slow nucleation, and it can be written as a waiting-time inequality. Evolution gradually turns structural search into gradient search, and becomes, in effect, a bootstrapping process. Wings evolve a dozen times because the arm was already there. Feathers diversify into down, display plumes, and flight vanes because the follicle was already there. The follicle, hair, fruit, and the eukaryotic cell are the instructions that made later invention cheap.

The four experiments described here would test the claim directly, in worlds where the searcher's accumulated structure reshapes the space it searches: hypergraph innovation chemistry, compositional chunking, preemption by adequacy, and evolvable instruction sets. Each is guarded against the ways the result could be produced by artifact rather than mechanism:

- separating plateau width from valley depth;
- holding parameters equal between compared populations;
- expanding the task basis so the toolkit cannot simply saturate;
- scoring reuse without rewarding age.

A simulated fossil filter adds a further test: it measures how much the biological record should be expected to exaggerate the leaps in the history of life.

If the predicted signature appears under these controls, we would have computational evidence of evolutionary self-smoothing. The prediction is that primitive births spike and then fade, reuse and diversity climb, and adaptation accelerates. If the signature does not appear, the history of life may be a more evenly creative process than this paper argues. Either outcome would be informative.
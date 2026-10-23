---
title: Spacetime as Precipitate
subtitle: Constraint accretion, partial determination, and the refinement picture of physical reality
slug: local-physics
type: technical
mode: exploratory
numbering: decimal
ledger: required
math: true
topics: [foundations-of-physics, constraint-networks, emergent-spacetime, quantum-foundations, sheaf-theory]
lifecycle: draft
date_created: 2025-01-01
date_updated: 2025-01-01
---

# Spacetime as Precipitate

*Constraint accretion, partial determination, and the refinement picture of physical reality*

> Reader note: Claim status is marked inline in [brackets]. A claim ledger is at the end.

**Abstract:** Physical theory since Newton has been written in one grammatical form: a state exists, a rule acts on it, and a new state results. Relativity removed global simultaneity. Quantum field theory localized interactions. Gauge theory recast physics as local consistency conditions. Each advance spent less on global synchronization. Yet the State-Rule-State template has survived every revolution, often by reintroducing a foliation of spacetime into constant-time slices.

This speculative paper takes the trend to its end. We propose that the primitive object of physics is a network of local constraints, not a state on a manifold. The physical content of a region is the set of configurations those constraints still admit. On this view reality is partially determined. Determination is a local, measurable, accumulating quantity. Spacetime geometry, causal order and history are large-scale precipitates of constraint accretion. They are sediment, not substrate.

We formalize this with five ingredients:

- a sheaf-like structure of admissible local configurations;
- a determination density $R$;
- a rigidity measure $\rho$;
- a refinement operation that is commutative, associative and idempotent in the Boolean case, so it needs no global clock;
- a semiring generalization in which one formalism covers constraint satisfaction, statistical mechanics, quantum amplitudes and classical action principles.

In this framework, observation is a local mesh refinement. It inserts constraints and does not select a branch. Decoherence becomes the formation of over-constrained, rigid regions. The arrow of time becomes the direction of increasing rigidity. We give a concrete toy model, sequential local conditioning of a lattice Gibbs measure, in which precipitation, nucleation and retrodictive refinement can be studied numerically. We close with open problems, possible empirical handles, and an honest list of the places where the program could fail.

---

## 1. The Shrinking Synchronization Budget

The Newtonian universe is a synchronized cluster. It assumes:

1. A global state exists.
2. A global update occurs.
3. A new global state exists.

Absolute time is the cluster's master clock. Every particle, everywhere, ticks in lockstep. Physics is the specification of the update function.

The history of physics since then reads like a long project of decommissioning that master clock:

- **Special relativity** removed global simultaneity. There is no fact of the matter about which distant events are "now."
- **General relativity** turned the stage into an actor. The metric is part of the solution, not a fixed background. Matter and geometry constrain each other.
- **Quantum field theory** made all interactions local. Fields couple at points, and influence travels inside light cones.
- **Entanglement** showed that outcomes can be correlated without any shared clock or signal. There is correlation without synchronization.
- **Gauge theory** recast fundamental forces as local consistency conditions. Connections tell neighboring fibers how to agree. No global frame is required, and in general none exists.

The direction is strikingly one-way: less global structure, more local structure. [interpretation:C1] Each revolution has cut the synchronization budget we allow reality.

One piece of global structure has survived nearly intact. Most working formulations still describe reality as a fully specified object, a field configuration on a complete manifold. They then add uncertainty on top as bookkeeping. Even the block universe, which abolishes the moving "now," keeps a fully instantiated four-dimensional object. Every point is maximally determined, and every field value is defined everywhere. The block universe is a synchronized cluster that has been frozen.

This paper asks what happens if we spend that last piece of budget as well. Suppose reality is not maximally instantiated. Suppose determination itself is local, partial and accumulating. Then the natural picture is not a manifold carrying states. It is a network of local agreements whose large-scale coherence **precipitates** out, the way a crystal precipitates from solution or a cloud from humid air.

We will argue three things:

1. This picture can be stated with mathematical precision.
2. It unifies several existing research programs that are usually treated separately.
3. It changes the meaning of observation, history and geometry in ways that remove some long-standing conceptual problems.

---

## 2. The Newtonian Template and Its Residue

The template common to Newton, Hamilton, Schrödinger and Einstein is:

$$
\text{State} \;\xrightarrow{\;\text{evolution rule}\;}\; \text{New State}
$$

The details change. The state may be a point in phase space, a vector in Hilbert space, or a Cauchy surface's worth of initial data. The rule may be Hamilton's equations, the Schrödinger equation, or the Arnowitt-Deser-Misner (ADM) evolution of the Einstein equations. The grammar does not change.

This grammar carries three hidden commitments. [interpretation:C2]

**(i) Maximal instantiation.** The state is a complete specification. Uncertainty describes our knowledge of the state, not the state itself. Even in quantum mechanics the wavefunction is treated as complete in this sense. It is a fully determined object whose determinacy simply sits in an unfamiliar space.

**(ii) Foliability.** Evolution needs slices. Generally covariant theories still recover dynamics by choosing a foliation $t = \text{const}$. The foliation is officially a gauge choice. In practice, the theory cannot be run without one.

**(iii) Generation over inference.** History is the sequence of states produced by the rule. The past is a record of what the update function produced, a ledger of committed transactions.

Path integrals look at first like a different grammar: a sum over whole histories, with no state evolving. But the moment we ask what is finally observed, the formalism returns to the template. We take a transition amplitude between boundary states on two slices.

The equations shape our intuitions and act as a kind of cognitive gravity. A physicist trained on differential equations often does not notice that "existence arrives as a sorted sequence" is an assumption. A philosopher outside that training can simply ask why reality should be sequential at all. Much of what follows has surely been glimpsed before, in lineages of thought that did not survive or were never connected to mathematics. What is missing is not the intuition. It is the formalism.

---

## 3. The Precipitation Picture

We propose to invert the explanatory order. The standard order is:

$$
\text{Global spacetime} \;\longrightarrow\; \text{Local phenomena}
$$

We propose:

$$
\text{Local constraints} \;\longrightarrow\; \text{Mesoscale regularities} \;\longrightarrow\; \text{Large-scale geometry}
$$

A **precipitory** universe has the following features:

- Local consistency relations form first.
- Stable structures emerge as attractors of mutually reinforcing constraints.
- Larger coherent domains are assembled from local agreements, joined at their boundaries.
- What we perceive as spacetime is the accumulated residue of those agreements.

Two contrasts make the shift concrete.

**Ledger versus precipitate.** The two pictures give different definitions of history:

- **Ledger:** history is the sequence of committed events.
- **Precipitate:** history is the maximal self-consistent explanation of surviving local records.

The first is generated. The second is inferred, and inferred not only by observers but by the structure of reality itself, as the set of pasts compatible with all present constraints.

**Database architectures.** The distributed-systems analogy is useful for comparing the three pictures. [model:C3]

Table 1: Three architectures for local consistency.

| Picture | Architecture |
|---|---|
| Newtonian | A single authoritative database with a global clock |
| Relativistic | A sharded database with causal ordering between shards |
| Precipitory | Local fragments establish consistency; the large-scale schema emerges afterward |

In the precipitory architecture the schema is not primary. The successful joins are.

This picture offers an explanation for something that is otherwise a brute fact: why the large-scale world looks smoother and more deterministic than the small-scale world. If geometry is a precipitated phase, then smooth spacetime is what remains after enormous amounts of local indeterminacy have averaged into a stable macroscopic order parameter. [conjecture:C4] Looking for "the" fundamental globally ordered spacetime would then be like looking for the fundamental crystal lattice of a cloud. The droplets are real and the cloud is real. The smooth surface we draw around the cloud is an effective description, not a constituent.

This differs in emphasis from most pre-geometric programs. Causal sets, spin networks and tensor networks generally try to recover a discrete structure that subsequently acquires a geometric interpretation. The graph is often still imagined as sitting somewhere, or as a discretization of something. The claim here is more radical: the graph is not embedded in spacetime, and spacetime is the large-scale appearance of graph stabilization. That is the central geometric claim of the program, and it is not established here. [conjecture:C5]

---

## 4. Formal Framework

We now make the picture precise. The goal of this section is not full generality. It is to show that the central notions (partial determination, refinement, rigidity, emergent history) have clean mathematical definitions. Symbols are collected in Appendix A.

### 4.1 Constraint Networks

Let $V$ be a set of **sites**. These are local loci of physical variables, with no presupposed location in space or time. Each site $v$ carries a set $A_v$ of local values. For a finite region $U \subseteq V$, the **configuration space** is

$$
\Sigma_U = \prod_{v \in U} A_v .
$$

A **constraint** $c$ is a pair $(S_c, K_c)$:

- $S_c \subseteq V$ is a finite **scope**, the sites the constraint concerns;
- $K_c \subseteq \Sigma_{S_c}$ is the set of allowed joint values on that scope.

A **constraint network** is a triple

$$
G = (V, E, C),
$$

where $C$ is a set of constraints, and $E$ is the induced dependency relation: $v \sim w$ whenever some constraint's scope contains both. Nothing here is spatial or temporal. $E$ is a relation of mutual relevance, not adjacency in a pre-existing space.

### 4.2 Admissible Configurations and Their Sheaf Structure

Write $\sigma|_S$ for the restriction of a configuration to a subset $S$. For a finite region $U$, the **locally admissible** configurations are

$$
F_C(U) = \{\, \sigma \in \Sigma_U \;:\; \sigma|_{S_c} \in K_c \text{ for every } c \in C \text{ with } S_c \subseteq U \,\}.
$$

For $U' \subseteq U$, restriction $\sigma \mapsto \sigma|_{U'}$ maps $F_C(U)$ into $F_C(U')$. This makes $F_C$ a presheaf on the poset of finite regions.

The physically significant object is the subset of local configurations that extend to a consistent configuration everywhere. For finite $V$, define the **realizable** configurations on $U$:

$$
\bar F_C(U) = \{\, \tau|_U \;:\; \tau \in F_C(V) \,\} \;\subseteq\; F_C(U).
$$

For infinite $V$, use the inverse limit over finite exhaustions. When $V$ is infinite, it is standard to require compactness of the value sets so that consistent finite pieces glue into a global configuration.

The gap between $F_C(U)$ and $\bar F_C(U)$ is the formal home of **frustration**. A configuration can satisfy every constraint it can see and still have no consistent completion. Abramsky and Brandenburger showed that quantum nonlocality and contextuality are exactly this kind of obstruction, using families of local sections that are compatible on overlaps but admit no global section [@abramsky2011]. [fact:C6] Cohomological invariants detect some of these obstructions [@abramsky2012].

We adopt that insight as foundational. The central question of physics shifts from *What is the state at time $t$?* to *Which families of local constraints possess globally consistent completions, and what do those completions look like locally?*

### 4.3 Determination Density

The quantity most conspicuously missing from foundational physics is degree of determination. We have mathematics for position, momentum, field strength and curvature. We have no standard first-class quantity measuring how instantiated a region is.

For the Boolean (pure constraint) case, define the **determination** of a region $U$ as

$$
R_C(U) \;=\; 1 \;-\; \frac{\log |\bar F_C(U)|}{\log |\Sigma_U|} \;\in\; [0,1].
$$

In words, the determination of a region is the fraction of the logarithmic size of its configuration space that the constraints have eliminated. [definition:C7]

- $R_C(U) = 0$ means the region is completely undetermined: every configuration remains realizable.
- $R_C(U) = 1$ means it is fully determined: exactly one configuration remains.

When the constraints carry weights, as in §4.7, we use the entropy $H(\mu_U)$ of the induced marginal measure $\mu_U$ in place of a count:

$$
R(U) \;=\; 1 - \frac{H(\mu_U)}{\log|\Sigma_U|}.
$$

The **determination density** $R(x)$ is the intensive limit of this quantity in neighborhoods of a site $x$.

Some regions are highly specified and others remain coarse. In this framework that is not a fact about our ignorance. It is the physical condition of the region. Physics usually assumes maximal instantiation and treats uncertainty as bookkeeping. Here indeterminacy is primitive and determination is emergent. [conjecture:C8]

### 4.4 Refinement as the Primitive Operation

The fundamental operation is not "apply the evolution rule." It is **constraint insertion**:

$$
C \;\longmapsto\; C \cup \{c\}.
$$

Write $\Omega(C) = F_C(V)$ for the global admissible set. Insertion acts by intersection:

$$
\Omega(C \cup C') \;=\; \Omega(C) \cap \Omega(C').
$$

Three elementary properties carry most of the conceptual weight of this paper.

**Proposition 1 (Monotonicity).** If $C \subseteq C'$, then $\bar F_{C'}(U) \subseteq \bar F_C(U)$ and $R_{C'}(U) \geq R_C(U)$ for every region $U$. [derived:C9]

**Proposition 2 (Precipitation invariance).** The admissible set produced by a collection of insertions does not depend on the order in which they occur. [derived:C10] In the Boolean case, refinement is the meet operation in the lattice of admissible sets, and it is commutative, associative and idempotent. Appendix B treats the other semirings.

**Proposition 3 (No global clock required).** Suppose distinct local agents insert Boolean constraints in arbitrary interleavings, with arbitrary delays and arbitrary duplication. Once all agents have received the same constraints, they agree on the same admissible set. [derived:C11] In non-idempotent semirings, duplicates must be suppressed, for example by giving each constraint a unique identifier.

The proofs are immediate (Appendix B). The interpretation is not trivial.

Proposition 3 is the physical counterpart of a known result in distributed systems. Data types whose merge operation is a semilattice join, *conflict-free replicated data types* (CRDTs) [@shapiro2011], converge without coordination. The CALM principle ("Consistency As Logical Monotonicity") states that monotone programs are exactly those that can be computed consistently without coordination [@hellerstein2020]. [fact:C12] Wolfram's hypergraph program reaches for a similar property under the name *causal invariance* [@wolfram2020]. There, however, it must be imposed on rewriting rules. Here it is automatic, because conjunction of constraints commutes.

This is the formal core of the claim that reality is progressively refined rather than progressively updated. [interpretation:C13] An update needs an order. A refinement does not. A Newtonian universe is an execution trace. A refinement universe is a continuously sharpened solution.

### 4.5 Propagation and the Emergence of Cones

Intersection is global. Adding a constraint at one site changes $\Omega(C)$ as a whole immediately. What is locally accessible, however, need not change immediately.

We model accessibility with a **local propagation operator**. Each site $v$ maintains an estimate $D_v \subseteq A_v$ of its possible values. In one propagation step, every site prunes values that are unsupported by its neighbors' current estimates. This is the generalized arc consistency of constraint programming, or message passing in the probabilistic case.

Let $d(v,w)$ be the graph distance in the dependency relation $E$. Then:

**Proposition 4 (Refinement cone).** If a constraint is inserted at a site $v$, then after $k$ propagation steps the local estimate $D_w$ can have changed only if $d(v,w) \leq k$. [derived:C14]

The cone is not put in by hand. It is the shape of refinement propagation through a relation of mutual relevance. It is the analogue of a Lieb-Robinson bound [@lieb1972], which in quantum lattice systems yields an emergent light cone from purely local Hamiltonians with no background relativity. [model:C15]

The framework therefore distinguishes two notions:

- the **consistency fact**, a change in the global admissible set $\Omega$, which is immediate and nonlocal;
- the **accessible resolution**, a change in local estimates, which spreads at a bounded rate.

This mirrors the structure of entanglement closely: global correlation together with local signaling limits. It also exposes a genuine constraint on the theory. In a generic classical constraint network, the change to $\Omega$ can alter the true marginal at a distant site $w$ before any propagation arrives. If local agents could detect that change, the theory would allow signaling. We therefore propose a selection principle.

**Selection principle:** Physically admissible constraint insertions are those that do not change the realizable marginal at any site outside their propagation cone.

We conjecture that the constraints out of which the world is built obey this principle. [conjecture:C16]

In ordinary quantum theory, no-signaling is a theorem that follows from the tensor-product structure and from the fact that quantum operations are completely positive and trace-preserving. In the present framework it becomes a restriction on what kinds of constraints the world is built from. Whether that restriction, together with locality and order invariance, picks out something like quantum theory is perhaps the sharpest open question this program poses (§9).

### 4.6 Rigidity and Records

Determination measures how narrow the admissible set of a region is. A second quantity measures how robustly it is narrow.

Define the **rigidity** of a region $U$ as

$$
\rho_C(U) \;=\; \min\{\, |X| \;:\; X \subseteq C,\; \bar F_{C \setminus X}(U) \neq \bar F_C(U) \,\}.
$$

In words, $\rho$ is the smallest number of constraints that would have to be removed to loosen the region at all. It is a min-cut quantity that measures redundancy.

A region can be determined but fragile, held in place by a single constraint. Or it can be determined and rigid, held in place by thousands of independent ones. Macroscopic records are of the second kind.

Consider a glass falling off a table. The event produces:

- sound waves,
- photon scattering,
- damage to the floor,
- thermal traces,
- camera recordings,
- memories.

Each of these is an independent constraint linking the event's region to others. The region becomes enormously over-constrained. From inside such a region the event appears to have had a uniquely determined past. That uniqueness is not a metaphysical seal placed on history. It is an emergent property of constraint density. [interpretation:C17]

Quantum Darwinism [@zurek2009] explains classical objectivity as the redundant imprinting of pointer states on many environmental fragments. [fact:C18] Rigidity is the constraint-network formulation of that redundancy. [interpretation:C19]

### 4.7 The Semiring Generalization

Pure constraints are too crude to describe quantum physics, which needs interference. The framework generalizes naturally.

Replace each relation $K_c$ with a **factor**

$$
f_c : \Sigma_{S_c} \to \mathbb{K},
$$

where $(\mathbb{K}, \oplus, \otimes)$ is a commutative semiring. The weight of a global configuration is $\bigotimes_c f_c(\sigma|_{S_c})$. The marginal weight of a local configuration on $U$ is the $\oplus$-sum of global weights over all completions.

Different choices of semiring give different physics:

Table 2: Semiring choices and the theories they yield.

| Semiring $\mathbb{K}$ | $\oplus$, $\otimes$ | Resulting theory |
|---|---|---|
| Boolean $\{0,1\}$ | $\vee$, $\wedge$ | Constraint satisfaction; pure consistency |
| $\mathbb{R}_{\geq 0}$ | $+$, $\times$ | Statistical mechanics; Bayesian networks; partition functions |
| $\mathbb{C}$ | $+$, $\times$ | Tensor networks; discretized path integrals $\sum \prod e^{iS_c/\hbar}$ |
| Tropical $\mathbb{R}\cup\{\infty\}$ | $\min$, $+$ | Classical action minimization; least-action principles |

The last row is worth emphasizing. Taking the $\hbar \to 0$ limit of the complex semiring, through the semiclassical regime of stationary phase, connects to the tropical semiring of Maslov's "dequantization" [@litvinov2007]. [fact:C20] Classical mechanics then appears as the *idempotent shadow* of quantum mechanics. In this framework the classical limit is a change of semiring. [interpretation:C21]

Precipitation invariance (Proposition 2) survives in every row, because $\otimes$ is commutative and associative. Insertion order never matters.

Monotonicity (Proposition 1) is a different matter:

- In the Boolean and tropical semirings, marginal resolution can only increase.
- In $\mathbb{R}_{\geq 0}$, the support of marginals can only shrink.
- In $\mathbb{C}$, completions can cancel. Adding a constraint can make a previously possible local configuration impossible by destructive interference, or turn a previously impossible one possible again.

**Interference is non-monotone refinement.** [interpretation:C22] This locates the strangeness of quantum theory precisely. It is not the loss of determinism. It is the loss of monotonicity in how local resolution accumulates from local constraints.

This has a sharp consequence. The CALM correspondence between monotonicity and coordination-free consistency was established for monotone programs, and nothing guarantees that it extends to the complex case. [interpretation:C23] A quantum universe therefore cannot be assumed to be a coordination-free monotone computation. If it is coordination-free in some sense, as the absence of a preferred foliation suggests, then the relevant notion of consistency must be subtler than monotone accumulation. §9 returns to this.

### 4.8 History as Inference

Let $O \subseteq V$ be the region associated with an observer, or with any physical subsystem. Define its **past** $P(O)$ as the set of sites whose refinements have propagated into $O$. This is the backward cone of the propagation relation, defined from refinement flow and not from a pre-given time coordinate.

The **history** available to $O$ is then

$$
\mathcal{H}(O) \;=\; \bar F_C\big(P(O)\big),
$$

the set of all past configurations consistent with every constraint, including those inside $O$.

Now insert a new constraint inside $O$. By monotonicity, $\mathcal{H}(O)$ can only shrink. [derived:C24] Present refinement sharpens the past.

This is unremarkable when stated epistemically. A paleontologist digs up a fossil, and the present observation increases resolution in a region of the historical mesh. The framework suggests that epistemic and ontological refinement are more closely related than we usually admit. If the past region was genuinely only partially determined, then present constraints do not *reveal* a fact that was already settled. They *contribute* to its settling. [conjecture:C25]

This involves no signaling into the past. Nothing propagates backward. What changes is the global consistency set, which has no temporal location. Wheeler's delayed-choice experiments, which seem paradoxical under the ledger picture, are natural in the precipitation picture. [interpretation:C26] The "choice" is a constraint. The "past" photon's path is part of the region it constrains.

---

## 5. Observation as Mesh Refinement

The usual metaphor for quantum measurement is *selection*: one outcome is chosen from many possibilities. That metaphor is too discrete and too global. A better metaphor comes from numerical simulation: adaptive mesh refinement.

In adaptive mesh refinement, a simulation does not carry uniform resolution everywhere. Regions with steep gradients, shocks or high information content are refined. Quiescent regions stay coarse. Resolution is a resource spent where constraints demand it.

The analogy is direct:

- The universe has a coarse, partially constrained structure.
- An observation inserts additional constraints.
- The admissible set narrows locally.
- Consequences propagate through consistency relations at bounded speed (§4.5).
- The structure gains resolution where constraints have been added.

Schematically, the shift is from

$$
\text{superposition} \to \text{observation} \to \text{single reality}
$$

to

$$
\text{coarse admissible mesh} \to \text{new constraint} \to \text{local refinement} \to \text{propagated consistency updates}.
$$

Three consequences follow.

**Measurement is not special.** An observation is one more constraint insertion. [interpretation:C27] The boundary between "measurement" and "ordinary physical interaction," which the Copenhagen interpretation draws arbitrarily and many-worlds dissolves into branching, disappears. Both are ways in which constraints enter the consistency network. Observers play no privileged role. A photon scattering off a dust grain refines the mesh exactly as a physicist does.

**Decoherence is rigidification.** The standard account says decoherence suppresses interference between pointer states. The precipitation account says decoherence creates an extremely rigid, high-resolution region of the network. [hypothesis:C28] Interference in the complex semiring requires that alternative completions remain available to cancel or reinforce one another. Every redundant record removes such alternatives from many independent directions. Re-cohering a macroscopic superposition is not forbidden. It requires removing on the order of $\rho$ constraints, which is why the cost should grow with the redundancy of the records (§10).

**The arrow of time is the arrow of rigidification.** [conjecture:C29] Refinement is monotone in the Boolean shadow, and rigidity accumulates as constraints pile up. The direction in which records accumulate and regions harden is what we experience as "forward." This is the thermodynamic arrow restated: low determination corresponds to high entropy of admissible configurations, and refinement lowers it. It needs no global clock. Each region has its own local gradient of hardening. These gradients agree macroscopically because they are coupled through shared constraints.

The fundamental operation is not to choose a branch. It is to add a constraint, recompute consistency, and increase local resolution.

---

## 6. Geometry as Precipitate

If no manifold is assumed, where does geometry come from? The framework offers a layered answer.

**Distance** is propagation depth. The graph distance $d(v,w)$ in the dependency relation counts how many refinement steps separate two sites. At large scales and high determination, this distance can be coarse-grained into an effective metric.

**Dimension** is a growth rate. Write $B(v,r)$ for the set of sites within distance $r$ of $v$. If

$$
|B(v,r)| \sim r^{d},
$$

the precipitate behaves as $d$-dimensional at that scale. A finer probe is the **spectral dimension** $d_s$, read from the return probability of a random walk on the network:

$$
P_{\text{return}}(\tau) \sim \tau^{-d_s/2}.
$$

There is no reason for $d$ or $d_s$ to be constant across scales or across regions of differing determination.

**Smoothness** comes from averaging. A smooth manifold is the order parameter of a high-$R$ phase, the effective description that holds where so many constraints have accumulated that local fluctuations in propagation depth average out. In this sense geometry is the equation of state of the precipitate. [model:C30]

**Lorentzian signature** is the hardest part and the most speculative. Undirected propagation naturally produces Riemannian distance. A Lorentzian structure needs a distinction between timelike and spacelike relations. The framework has a natural candidate for that distinction: the asymmetry introduced by rigidification. [conjecture:C31] A relation along which rigidity increases, so that records accumulate in one direction, is "timelike." A relation between regions that constrain each other symmetrically, without asymmetric record formation, is "spacelike."

Whether this idea can be made to produce the correct causal structure and the correct signature is open. In causal set theory, a partial order plus a counting measure is argued to recover Lorentzian geometry ("order plus number equals geometry") [@bombelli1987]. [secondhand:C32] The program here would need to derive such an order from rigidity gradients.

This picture keeps general relativity's deepest insight and pushes it one step further. In general relativity the metric is not scenery. It is co-determined with matter. In the precipitation picture the manifold itself is co-determined: an emergent feature of the constraint network wherever the network is dense, rigid and statistically homogeneous enough to support one. Asking why spacetime is a smooth four-dimensional manifold becomes like asking why water forms ice with a hexagonal lattice. The answer lies in the microscopic constraints and the conditions of precipitation.

Several approaches to quantum gravity have found that the spectral dimension falls to about 2 at short distances. These include causal dynamical triangulations, asymptotic safety and certain spin-foam models [@carlip2017]. [fact:C33] The precipitation picture predicts some scale dependence of dimension, because the precipitate cannot look smooth at the scale of individual constraints. Whether it predicts that particular value depends on the microscopic constraint structure.

---

## 7. A Toy Model: Sequential Local Conditioning

Philosophy becomes physics when it can be simulated. We propose a minimal model with every essential feature: partial determination, local refinement, order invariance, propagation, rigidity, retrodiction and a precipitation transition.

### 7.1 Setup

Take a finite graph, for instance an $L \times L$ lattice. Lattices are used for convenience only. Random geometric graphs or graphs without any geometry are equally admissible. Place a binary variable $s_v \in \{-1,+1\}$ at each site. The prior constraint network is a ferromagnetic Ising model in the $\mathbb{R}_{\geq 0}$ semiring, with factors

$$
f_{vw}(s_v, s_w) = e^{\beta J s_v s_w}
$$

on each edge, where $\beta$ is the inverse temperature and $J > 0$ is the coupling. The prior measure $\mu^{(0)}$ is the Gibbs measure. At the start nothing is determined beyond the correlations $\beta$ induces, and $R \approx 0$ almost everywhere.

### 7.2 The Refinement Rule

Refinement events occur as a Poisson process over sites. In this model, the Poisson process is an ordering-free specification: Proposition 2 guarantees that order does not affect the final measure, so the process is only a convenient way to sample insertion sets.

At each event:

1. Choose a small region $U$, for instance a site and its neighbors.
2. Draw a local configuration $\sigma_U$ from the current marginal $\mu_U$.
3. Insert the constraint $s|_U = \sigma_U$. Alternatively, insert a coarser constraint that fixes only some function of $s|_U$, such as its local parity or its majority.
4. Update the measure by conditioning.

Step 2 is the model's version of the Born rule. A refinement outcome is drawn with probability given by the current marginal weight. As a result, the process never produces a contradiction: every inserted constraint is satisfiable by construction. The chain rule of probability,

$$
P(a, b) = P(a)\,P(b \mid a) = P(b)\,P(a \mid b),
$$

guarantees that the joint law of the final constraint set is independent of the order of insertion. [derived:C34] This is the stochastic form of precipitation invariance.

The following pseudocode is a sketch of the refinement loop, not runnable code.

~~~text
initialize prior factor graph G on sites V
constraints := {}
repeat until stopping criterion:
    U     := sample_local_region(V)
    mu_U  := marginal(G, constraints, U)       # belief propagation, Markov chain Monte Carlo, or exact for small L
    sigma := sample(mu_U)
    constraints := constraints union { s|U = sigma }
    propagate_local(G, constraints, steps = 1) # bounded-speed message passing
    record R(x), rho(x), front positions, domain statistics
~~~

Exact marginals can be computed for small $L$ using transfer matrices. For larger systems, use belief propagation or Markov chain Monte Carlo. The bounded-step propagation is tracked separately from the exact conditioning. This lets us measure the gap between the consistency fact and the accessible resolution (§4.5).

### 7.3 Expected Phenomenology

Known properties of Ising measures suggest the following behavior. Each claim below is a hypothesis for numerical confirmation, not a reported result.

**Weak coupling ($\beta < \beta_c$): local refinement.** Correlations decay exponentially. Each refinement raises $R$ only within about one correlation length of its insertion. Determination grows like a dust of isolated refined patches, with no large-scale structure. [hypothesis:C35] This is the fluid phase.

**Strong coupling ($\beta > \beta_c$): nucleation and precipitation.** The prior is close to a mixture of two ordered phases. A single refinement can tip a whole region into one of them, with determination cascading far beyond the insertion site. [hypothesis:C36] Large refined domains form, bounded by domain walls. Domains of opposite sign meet and leave rigid boundaries. This is precipitation in the literal sense: local seeds nucleate macroscopic coherent structure.

**Near criticality ($\beta \approx \beta_c$): scale-free refinement.** Refinement cascades follow power-law size distributions. [hypothesis:C37] The determination field $R(x)$ is expected to be fractal. If emergent geometry is ever to look smooth across many scales, it is reasonable to suspect it lives near a critical point of the underlying constraint statistics.

**Retrodiction.** Designate an early set of refined sites as a "past" region $P$. Continue refining elsewhere. Then measure how $H(\mu_P)$ continues to decrease because of later insertions in distant regions. This retrodictive refinement should be largest at strong coupling, where distant constraints are most informative about the past region. [hypothesis:C38]

**Rigidity.** For each refined site, estimate $\rho$ as the number of independent constraint paths supporting its value, a max-flow computation on the network. Sites inside large refined domains should show high rigidity. [hypothesis:C39] Isolated refinements should show $\rho = 1$. Rigid domains are the model's "classical records."

### 7.4 A Boolean Variant and the Frozen Phase

A purely Boolean variant uses random local XOR constraints, the satisfiability problem known as XORSAT. This connects to a well-studied phase structure. For random $k$-XORSAT on sparse random hypergraphs, statistical physics methods (Mézard, Ricci-Tersenghi, Zecchina and collaborators) found sharp transitions as the constraint density $\alpha$ grows [@mezard2003]. [fact:C40] For $k = 3$:

- near $\alpha \approx 0.818$, the solution space shatters into clusters with frozen "backbone" variables;
- near $\alpha \approx 0.918$, the system becomes unsatisfiable.

In precipitation language these are a clustering transition, where rigid cores appear, and an over-constraint catastrophe, where no world remains.

The sequential-conditioning rule avoids the catastrophe by construction, because constraints are only ever drawn from what is still admissible. [derived:C41] This makes a philosophical point concrete. A universe built by refinement cannot contradict itself, because every new constraint is drawn from the space of consistent completions. The frozen backbone of the clustered phase gives a precise model of "the past": variables pinned by so much redundant structure that no admissible completion can move them.

Thresholds for spatially local XOR constraints on low-dimensional lattices differ from the random-hypergraph values. Mapping them out is part of the proposed program.

### 7.5 What the Toy Model Is Not

The model is classical, using the $\mathbb{R}_{\geq 0}$ and Boolean semirings, and its graph is fixed. It illustrates precipitation, refinement cones, rigidity and retrodiction. It does not illustrate interference or emergent geometry.

Two extensions are natural next steps:

1. A complex-weighted version, using tensor-network contraction in place of conditioning, to study non-monotone refinement.
2. A version in which the dependency graph itself is refined, with constraints that create or prune edges, to study emergent dimension.

---

## 8. Relation to Existing Work

The precipitation picture is less a new theory than a proposal for how several existing threads fit together. [interpretation:C42] It shares something with each of the following.

**Wheeler's "it from bit" and participatory universe.** Wheeler proposed that physical reality arises from yes/no elementary acts and that the past is partly constituted by present observation [@wheeler1990]. The present framework keeps the idea and removes the special role of observers: any constraint insertion participates.

**Relational quantum mechanics (RQM; Rovelli).** RQM treats properties as relative to interacting systems, with no observer-independent state [@rovelli1996]. The constraint network gives a candidate global structure, the network itself, within which relational facts are local sections.

**Consistent and decoherent histories (Griffiths; Gell-Mann and Hartle).** These frameworks already treat history as a family of mutually consistent coarse-grained descriptions. The precipitation picture makes the consistency condition the ontology, not a selection criterion applied to a pre-existing Hilbert space.

**Sheaf-theoretic contextuality (Abramsky and Brandenburger) and topos approaches (Isham and Döring).** These are the closest mathematical precedents. They show that quantum nonlocality is precisely the failure of locally consistent data to glue globally [@abramsky2011]. We propose to read that structure not as a feature of quantum measurement but as the basic shape of physical reality.

**Causal set theory (Sorkin and others).** Causal sets share the conviction that the continuum is emergent and that discrete relational structure is primary [@bombelli1987]. Causal sets take a partial order as primitive. The precipitation picture takes constraints as primitive and hopes to derive the order from rigidity gradients.

**Tensor networks and emergent geometry (Swingle; Van Raamsdonk; the ER=EPR program).** These show that entanglement structure can encode geometry, with distances tracking minimal cuts through a network [@swingle2012] [@vanraamsdonk2010]. The complex-semiring version of this framework is a tensor network. The new element is the claim that the network is refined over time, so geometry precipitates and is not merely encoded.

**Quantum Darwinism (Zurek).** Classical objectivity comes from redundant records [@zurek2009]. Rigidity $\rho$ formalizes this redundancy as a min-cut in the constraint network.

**All-at-once and retrocausal approaches (Wharton; Price; Hartle's spacetime quantum mechanics).** These argue that physics should be formulated as a global constraint problem on whole histories, like the Lagrangian schema, and not as initial-value evolution. The precipitation picture agrees and adds partiality: the global constraint problem is never fully posed, and it accretes.

**Wolfram's hypergraph models.** These also seek spacetime from local rewriting, and they also find that order independence (causal invariance) is the key to relativistic behavior [@wolfram2020]. In the present framework order independence is automatic, because conjunction commutes, and need not be imposed on rules.

**Distributed systems theory (CRDTs; the CALM principle).** This field supplies the precise sense in which monotone constraint accumulation achieves consistency without coordination [@hellerstein2020]. It also shows why quantum non-monotonicity is a genuine obstacle to the simplest version of the picture.

The common thread is that each approach gives up some part of the Newtonian template. The precipitation picture gives up all of it at once:

- not dynamics first: refinement does not require an ordering;
- not geometry first: the manifold is a phase;
- not states first: determination is partial and accumulated.

*Constraint first. Refinement second. Geometry and history as precipitates.*

---

## 9. Open Problems

We list the problems on which the program depends, roughly in order of importance.

**P1. The quantum reconstruction problem.** Do locality, precipitation invariance and the no-signaling selection principle (§4.5), applied to a semiring-valued constraint network, single out complex amplitudes and the Born rule? The program from Hardy [@hardy2001], Chiribella, D'Ariano, Perinotti [@chiribella2011] and others reconstructs quantum theory from operational axioms. It is the natural tool here. A positive answer would make the framework a genuine foundation. A negative answer would show that something beyond constraint accretion is needed.

**P2. Non-monotone coordination-freedom.** In the complex semiring, refinement is order-invariant but not monotone. Is there a weaker consistency notion that guarantees coordination-free agreement between local agents for complex-weighted refinement, playing the role CALM plays for monotone computation? We conjecture that no-signaling is exactly that notion. [conjecture:C43]

**P3. Where constraints come from.** The toy model draws new constraints from the current marginals. In nature, what plays the role of the sampling process? The most economical answer is that constraints are generated by the existing network, so that interactions are local constraint structures producing further constraint structures. [guess:C44] That would make the framework self-contained. It needs a concrete mechanism.

**P4. Derivation of Lorentzian structure.** Can rigidity gradients produce a partial order whose large-scale statistics match a Lorentzian manifold of dimension 3+1? Where in the space of microscopic constraint statistics does such a phase exist, and is it near a critical point?

**P5. The status of $R$.** Is determination density observable, even in principle? If it is defined relative to a coarse-graining, which coarse-graining is physically privileged, if any?

**P6. Thermodynamic consistency.** The arrow of rigidification should agree quantitatively with the thermodynamic arrow. That requires relating the entropy of admissible configurations to thermodynamic entropy, including in gravitational settings where the Bekenstein-Hawking entropy is the benchmark.

---

## 10. Empirical Handles

A framework whose main achievement is reinterpretation risks being unfalsifiable. Here are the places where it could make contact with experiment or with sharper theory. They are listed with honest assessments of how strong each one is.

**Scale-dependent dimension.** The framework predicts that effective dimension varies with scale and possibly with local determination density. [hypothesis:C45] A scale-dependent spectral dimension appears in several quantum gravity approaches and could leave traces in high-energy dispersion relations. This is a weak handle: the prediction is shared, and its form is not yet specific.

**Re-coherence cost scaling.** If decoherence is rigidification, then the cost of reversing it, in a quantum eraser or a mesoscopic superposition experiment, should scale with the min-cut rigidity $\rho$ of the record structure. [hypothesis:C46] It should not scale simply with the number of environmental degrees of freedom. In many cases the two coincide. Where they differ (records that are numerous but highly correlated, versus few but independent), the framework makes a distinct qualitative prediction about which records are harder to erase. This is a moderate handle and would need careful formulation.

**No preferred foliation.** Precipitation invariance makes any physics that requires a preferred global simultaneity incompatible with the framework. [interpretation:C47] Examples include some objective collapse models with instantaneous nonlocal collapse in a preferred frame. Experimental bounds on preferred-frame effects therefore support the framework. This is a structural handle, but not a unique one.

**Bounds on determination.** If $R$ is physical and finite constraint capacity limits it, then regions with very few interactions should be "less instantiated" in a definite sense. [conjecture:C48] A natural place to look is the far tails of cosmic voids, or the early universe before structure formation. Whether this leaves observable traces, for instance in the statistics of primordial fluctuations, is unknown. This is speculative, but it is the most distinctive possibility.

---

## 11. Objections and Replies

**"This is just epistemology dressed as ontology."**

The objection assumes that a fully determined reality lies underneath our partial knowledge. That assumption is exactly what is in question. The framework's mathematics is the mathematics of inference because, on this view, the world's own constitution is inference-shaped. Constraints accumulate, completions narrow, and no hidden master copy exists. Bell-type theorems [@bell1964] already rule out hidden-variable completions that are both fully determined and governed by local dynamics, unless assumptions such as measurement independence are given up. [fact:C49] The framework accepts the conclusion and does not pay to avoid it.

**"Refinement happens 'over time' — you have smuggled time back in."**

Refinement has a partial order of dependency. Some constraints are drawn from marginals shaped by others. It has no total order of time. Precipitation invariance guarantees that no total order is needed to fix the result. What we call time is the coarse-grained, rigidity-oriented shadow of this dependency order. Using the word "accretion" is a convenience of language, just as one says a crystal "grows" while describing it in terms of equilibrium thermodynamics.

**"Isn't this solipsistic or observer-dependent?"**

No. Observers have no special status. Any physical interaction inserts constraints. Humans are simply unusually prolific producers of rigid records.

**"Why should we expect smooth geometry to precipitate at all?"**

We do not claim to have shown that it must. We claim that this is the right question. "Why a smooth Lorentzian 4-manifold?" should have the same kind of answer as "Why a hexagonal ice lattice?": microscopic constraints plus conditions of formation. The alternative is to treat the manifold as given, which is an assumption and not an explanation.

---

## Conclusion

Each major advance in physics has spent less on global structure. Absolute time went, then absolute simultaneity, then the fixed background geometry. What remains in most formulations is the assumption of maximal instantiation: that reality, at bottom, is a completely specified object to which uncertainty is added afterward.

We have proposed giving that up as well. On the precipitation picture:

- the primitive object is a network of local constraints;
- the physical content of a region is its admissible set;
- determination is a local, accumulating, measurable quantity;
- observation is mesh refinement, not branch selection, and is no different in kind from any other interaction;
- decoherence is rigidification, the formation of over-constrained regions whose apparently unique pasts are emergent consequences of constraint density;
- history is not a generated trace but the maximal consistent explanation of surviving records, and present refinement can sharpen it;
- time's arrow is the direction of hardening;
- spacetime is not the stage but the sediment, the large-scale appearance of a network that has stabilized.

The mathematics we are missing is less a new dynamics than a theory of local constraint accretion and resolution growth on partially determined relational structures. That phrase would make a poor grant title. Its pieces already exist: sheaves and their obstructions, factor graphs and semirings, phase transitions in constraint satisfaction, coordination-free consistency in distributed systems, and tensor-network geometry. They have mostly been treated as tools. The proposal of this paper is to treat them as ontology.

If the program succeeds, the deepest lesson of twentieth-century physics will turn out to be that the world was never a synchronized cluster. It was always a set of local fragments negotiating consistency, with the large-scale schema emerging afterward. [guess:C50]

*A Newtonian universe is an execution trace. A precipitating universe is a continuously sharpened solution.*

---

## Limits

The elementary propositions in §4 are derived, but they are nearly trivial: they follow from the commutativity of intersection and of the semiring product. Everything that would make the framework physics and not reformulation is conjectural. The three largest gaps appear in §9 as P1, P2 and P4. The framework does not derive complex amplitudes or the Born rule, it has no consistency notion that covers non-monotone refinement, and it has no derivation of Lorentzian signature.

The toy model in §7 has not been run for this piece. Every phenomenological claim in §7.3 is an expectation drawn from known Ising behavior, and the correspondence between those known results and the specific quantities $R$, $\rho$ and retrodictive refinement is untested.

There is also a conceptual tension. The global admissible set $\Omega$ is itself a global object with no temporal location, and its consistency changes are instantaneous (§4.5). A critic can say that the framework removes global synchronization while retaining a global mathematical object, and that no-signaling is then imposed by hand through the selection principle. The reply in the text is that $\Omega$ is a constraint and not a clock, but this has not been shown to be more than a verbal distinction.

Rival accounts exist at every level. Standard quantum theory with an explicit foliation, Everettian branching, pilot-wave theories and objective collapse models all account for the same laboratory phenomena, and the framework competes with them only where it makes distinct predictions, which §10 shows are few and weak. Causal sets, tensor networks and hypergraph rewriting pursue emergent geometry without any notion of determination density and may reach the same results without it. Finally, if determination density turns out to be unobservable even in principle (P5), the framework reduces to an interpretation.

---

## Claim Ledger

| ID | Claim | Status | Basis | Check |
|---|---|---|---|---|
| C1 | Physics has moved steadily toward less global structure and more local structure | interpretation | Reading of relativity, QFT, entanglement and gauge theory | Look for foundational advances that added global structure |
| C2 | The Newtonian template carries three hidden commitments: maximal instantiation, foliability, and generation over inference | interpretation | Reading of standard formulations | Test against formulations that deny each commitment |
| C3 | Distributed-database architectures are a useful analogy for the Newtonian, relativistic and precipitory pictures | model | Analogy | Check whether the conclusions survive without the analogy |
| C4 | Smooth spacetime is a stable macroscopic order parameter left after local indeterminacy averages out | conjecture | Phase-transition analogy | Exhibit a constraint model with smooth emergent geometry |
| C5 | Spacetime is the large-scale appearance of constraint-network stabilization, not a container for it | conjecture | Central claim of the program | Derive emergent Lorentzian geometry (P4) |
| C6 | Quantum nonlocality and contextuality are obstructions to gluing locally compatible sections into a global section | fact | [@abramsky2011] | Read the cited paper |
| C7 | Determination is the fraction of the log-size of a region's configuration space eliminated by constraints | definition | Stipulated in §4.3 | None; definitional |
| C8 | Indeterminacy is primitive and determination is emergent | conjecture | Core postulate | No current test; see §10 for candidate handles |
| C9 | Adding constraints can only shrink realizable sets and raise determination | derived | Appendix B | Check the proof |
| C10 | The admissible set does not depend on the order of constraint insertion | derived; idempotence only in Boolean and tropical cases | Appendix B | Check the proof |
| C11 | Agents that have received the same Boolean constraints agree on the admissible set, regardless of delay or duplication | derived | Appendix B | Check the proof |
| C12 | Monotone programs are exactly those computable consistently without coordination | fact | [@hellerstein2020] | Read the cited paper |
| C13 | Reality is progressively refined rather than progressively updated | interpretation | Propositions 2 and 3 | Test whether an ordered-update formulation is needed for any physical prediction |
| C14 | A constraint inserted at a site can change a distant local estimate only after as many propagation steps as the graph distance | derived | Appendix B | Check the proof |
| C15 | The refinement cone is analogous to a Lieb-Robinson bound | model | [@lieb1972] | Compare cone shapes in a concrete lattice model |
| C16 | The constraints the world is built from do not change realizable marginals outside their propagation cone | conjecture | Selection principle | Test whether it, with locality, yields quantum theory (P1) |
| C17 | The apparent uniqueness of a record's past is an emergent property of constraint density | interpretation | Glass example | Measure rigidity against apparent uniqueness in the toy model |
| C18 | Quantum Darwinism explains classical objectivity as redundant imprinting of pointer states on environmental fragments | fact | [@zurek2009] | Read the cited paper |
| C19 | Rigidity is the constraint-network formulation of the redundancy in quantum Darwinism | interpretation | Min-cut analogy | Compare rigidity with redundancy measures in a concrete model |
| C20 | The semiclassical limit of the complex semiring connects to the tropical semiring through Maslov dequantization | fact | [@litvinov2007] | Read the cited survey |
| C21 | In this framework the classical limit is a change of semiring | interpretation | Dequantization analogy | Carry out the limit in a lattice example |
| C22 | Interference is non-monotone refinement | interpretation | Cancellation of completions in the complex semiring | Exhibit the non-monotone case in a small tensor network |
| C23 | The CALM correspondence is not guaranteed to extend from monotone programs to the complex-weighted case | interpretation | Loss of monotonicity | Resolve P2 |
| C24 | Inserting a constraint can only shrink the history available to a region | derived | Proposition 1 | Check the proof of Proposition 1 |
| C25 | Present constraints contribute to settling a partially determined past, rather than revealing a settled one | conjecture | Reading of partial determination | No current test |
| C26 | Delayed-choice experiments are natural in the precipitation picture | interpretation | Choice as constraint on a shared region | Work out a delayed-choice case in a small network |
| C27 | An observation is one more constraint insertion | interpretation | Mesh refinement analogy | Check against measurement models that single out observers |
| C28 | Decoherence is the creation of an extremely rigid, high-resolution region of the network | hypothesis; untested | Redundant records remove alternative completions | See C46 |
| C29 | The arrow of time is the direction of increasing rigidity | conjecture | Monotone refinement in the Boolean shadow | Relate rigidity growth to thermodynamic entropy (P6) |
| C30 | Smooth geometry is the equation of state of a high-determination phase | model | Order-parameter analogy | Exhibit such a phase in a constraint model |
| C31 | The asymmetry of rigidification can distinguish timelike from spacelike relations | conjecture | Proposed candidate | Derive a partial order from rigidity gradients (P4) |
| C32 | In causal set theory a partial order plus a counting measure recovers Lorentzian geometry | secondhand; not rederived here | [@bombelli1987] | Read the cited paper and follow-up work |
| C33 | Several quantum gravity approaches find a spectral dimension near 2 at short distances | fact | [@carlip2017] | Read the cited review |
| C34 | Sequential conditioning gives a joint law independent of the order of insertion | derived | Chain rule of probability | Verify on exact small-lattice computations |
| C35 | At weak coupling, determination grows as isolated refined patches | hypothesis; untested | Known Ising correlation decay | Simulate §7.2 |
| C36 | At strong coupling, a single refinement can cascade determination far beyond its site | hypothesis; untested | Ordered-phase structure of the Ising prior | Simulate §7.2 |
| C37 | Near criticality, refinement cascades have power-law size distributions | hypothesis; untested | Critical-point scaling | Simulate §7.2 |
| C38 | Retrodictive refinement of a past region is largest at strong coupling | hypothesis; untested | Distant constraints are more informative at strong coupling | Simulate §7.3 retrodiction protocol |
| C39 | Sites inside large refined domains have high rigidity | hypothesis; untested | Max-flow reading of rigidity | Simulate and compute max-flow |
| C40 | Random k-XORSAT shows sharp clustering and satisfiability transitions as constraint density grows | fact | [@mezard2003] | Read the cited paper |
| C41 | Sequential conditioning never reaches the over-constraint catastrophe | derived | Constraints are drawn from the admissible set | Check by construction in small examples |
| C42 | The precipitation picture mainly reorganizes existing research threads | interpretation | Survey in §8 | Compare against each cited program |
| C43 | No-signaling is the weaker consistency notion that gives coordination-free agreement for complex-weighted refinement | conjecture | Open problem P2 | Prove or refute |
| C44 | Constraints are generated by the existing network | guess | Economy of explanation | Propose and test a concrete mechanism |
| C45 | Effective dimension varies with scale and local determination density | hypothesis; shared with other approaches | Precipitate cannot look smooth at constraint scale | Compare dispersion-relation predictions across approaches |
| C46 | Re-coherence cost scales with min-cut rigidity, not environment size | hypothesis; needs careful formulation | Decoherence as rigidification | Compare erasure cost for numerous-but-correlated versus few-but-independent records |
| C47 | Physics requiring a preferred global simultaneity is incompatible with the framework | interpretation | Precipitation invariance | Check against specific objective collapse models |
| C48 | Regions with very few interactions are less instantiated in a definite sense | conjecture | Finite constraint capacity | Look for signatures in primordial fluctuation statistics |
| C49 | Bell-type theorems rule out fully determined local hidden-variable completions unless extra assumptions are dropped | fact | [@bell1964] | Read the cited paper |
| C50 | If the program succeeds, the world was never a synchronized cluster but local fragments negotiating consistency | guess | Summary of the proposal | Depends on resolving P1, P2 and P4 |

---

## Appendix A: Symbol Table

Table 3: Symbols used in this piece.

| Symbol | Meaning |
|---|---|
| $V$ | Set of sites |
| $A_v$ | Set of local values at site $v$ |
| $\Sigma_U$ | Configuration space of region $U$ |
| $S_c$, $K_c$ | Scope and allowed set of constraint $c$ |
| $C$ | Set of constraints |
| $E$ | Dependency relation induced by constraint scopes |
| $G$ | Constraint network $(V, E, C)$ |
| $F_C(U)$ | Locally admissible configurations on $U$ |
| $\bar F_C(U)$ | Realizable configurations on $U$ |
| $\Omega(C)$ | Global admissible set |
| $R$ | Determination (of a region) or determination density (at a site) |
| $\mu_U$ | Marginal measure on region $U$ |
| $H$ | Shannon entropy |
| $D_v$ | Local estimate of possible values at site $v$ |
| $d(v,w)$ | Graph distance in the dependency relation |
| $B(v,r)$ | Ball of radius $r$ around site $v$ |
| $d_s$ | Spectral dimension |
| $\rho$ | Rigidity |
| $f_c$ | Factor of constraint $c$ with values in a semiring |
| $\mathbb{K}$ | Commutative semiring with operations $\oplus$, $\otimes$ |
| $O$, $P(O)$ | Observer region and its past |
| $\mathcal{H}(O)$ | History available to $O$ |
| $\beta$, $J$ | Inverse temperature and coupling in the Ising prior |
| $\beta_c$ | Critical inverse temperature |
| $s_v$ | Ising variable at site $v$ |
| $\alpha$ | Constraint density in random XORSAT |

---

## Appendix B: Proofs of the Elementary Propositions

**Proposition 1 (Monotonicity).** Let $C \subseteq C'$. Every constraint in $C$ is also in $C'$, so any configuration satisfying all of $C'$ satisfies all of $C$. Hence $F_{C'}(V) \subseteq F_C(V)$. Restriction to $U$ preserves inclusion, so $\bar F_{C'}(U) \subseteq \bar F_C(U)$. Since $\log$ is monotone, $R_{C'}(U) \geq R_C(U)$. $\square$

**Proposition 2 (Precipitation invariance).** By definition,

$$
\Omega(C) = \bigcap_{c \in C} \{\sigma \in \Sigma_V : \sigma|_{S_c} \in K_c\}.
$$

Set intersection is commutative, associative and idempotent. So $\Omega$ depends only on the set $C$, not on the sequence of insertions that produced it. In the semiring case, the total weight $\bigotimes_{c \in C} f_c$ depends only on the multiset of factors, because $\otimes$ is commutative and associative. Idempotence then holds exactly in the Boolean and tropical semirings and fails in general: repeating a factor in $\mathbb{R}_{\geq 0}$ or $\mathbb{C}$ changes the weights. This is one more way in which non-idempotent semirings are physically richer. $\square$

**Proposition 3 (No global clock required).** Each agent's admissible set is $\Omega$ applied to the set of constraints it has received. By Proposition 2 this depends only on that set, and duplicates have no effect in the Boolean case. Agents that have received the same set compute the same $\Omega$. This is the semilattice convergence property of state-based CRDTs. $\square$

**Proposition 4 (Refinement cone).** Under generalized arc consistency, a site's estimate $D_w$ at step $k+1$ is a function of $D_w$ and the estimates of its dependency neighbors at step $k$. By induction on $k$, $D_w$ at step $k$ depends only on constraints and initial estimates within distance $k$ of $w$. A constraint inserted at $v$ with $d(v,w) > k$ therefore cannot have affected $D_w$ by step $k$. $\square$

---

## Appendix C: Glossary of Correspondences

Table 4: Correspondence between standard notions and the precipitation picture.

| Standard notion | Precipitation-picture counterpart |
|---|---|
| State | Admissible set of a region, $\bar F_C(U)$ |
| Evolution | Constraint insertion (refinement) |
| Uncertainty | Low determination $R$ (physical, not merely epistemic) |
| Measurement | Local mesh refinement; no different in kind from interaction |
| Wavefunction collapse | Conditioning of the admissible set |
| Decoherence | Rigidification; growth of $\rho$ |
| Classical record | High-rigidity region |
| Light cone | Refinement propagation bound |
| Nonlocality / contextuality | Obstruction to gluing local sections |
| Interference | Non-monotone refinement in the complex semiring |
| Classical limit | Tropicalization of the weight semiring |
| Arrow of time | Direction of increasing rigidity |
| History | Maximal consistent explanation of surviving records |
| Spacetime | Large-scale order parameter of a high-$R$ precipitated phase |

---

## References

- [@abramsky2011] Abramsky, Samson, and Adam Brandenburger. "The Sheaf-Theoretic Structure of Non-Locality and Contextuality." *New Journal of Physics* 13, 113036, 2011.
- [@abramsky2012] Abramsky, Samson, Shane Mansfield, and Rui Soares Barbosa. "The Cohomology of Non-Locality and Contextuality." *Electronic Proceedings in Theoretical Computer Science* 95, 2012.
- [@bell1964] Bell, John S. "On the Einstein Podolsky Rosen Paradox." *Physics Physique Fizika* 1, 195-200, 1964.
- [@bombelli1987] Bombelli, Luca, Joohan Lee, David Meyer, and Rafael D. Sorkin. "Space-Time as a Causal Set." *Physical Review Letters* 59, 521, 1987.
- [@carlip2017] Carlip, Steven. "Dimension and Dimensional Reduction in Quantum Gravity." *Classical and Quantum Gravity* 34, 193001, 2017.
- [@chiribella2011] Chiribella, Giulio, Giacomo Mauro D'Ariano, and Paolo Perinotti. "Informational Derivation of Quantum Theory." *Physical Review A* 84, 012311, 2011.
- [@hardy2001] Hardy, Lucien. "Quantum Theory from Five Reasonable Axioms." arXiv:quant-ph/0101012, 2001.
- [@hellerstein2020] Hellerstein, Joseph M., and Peter Alvaro. "Keeping CALM: When Distributed Consistency Is Easy." *Communications of the ACM* 63(9), 2020.
- [@lieb1972] Lieb, Elliott H., and Derek W. Robinson. "The Finite Group Velocity of Quantum Spin Systems." *Communications in Mathematical Physics* 28, 251-257, 1972.
- [@litvinov2007] Litvinov, Grigori L. "The Maslov Dequantization, Idempotent and Tropical Mathematics: A Brief Introduction." *Journal of Mathematical Sciences* 140, 426-444, 2007.
- [@mezard2003] Mézard, Marc, Federico Ricci-Tersenghi, and Riccardo Zecchina. "Two Solutions to Diluted p-Spin Models and XORSAT Problems." *Journal of Statistical Physics* 111, 505-533, 2003.
- [@rovelli1996] Rovelli, Carlo. "Relational Quantum Mechanics." *International Journal of Theoretical Physics* 35, 1637-1678, 1996.
- [@shapiro2011] Shapiro, Marc, Nuno Preguiça, Carlos Baquero, and Marek Zawirski. "Conflict-Free Replicated Data Types." *Stabilization, Safety, and Security of Distributed Systems*, 2011.
- [@swingle2012] Swingle, Brian. "Entanglement Renormalization and Holography." *Physical Review D* 86, 065007, 2012.
- [@vanraamsdonk2010] Van Raamsdonk, Mark. "Building up Spacetime with Quantum Entanglement." *General Relativity and Gravitation* 42, 2323-2329, 2010.
- [@wheeler1990] Wheeler, John Archibald. "Information, Physics, Quantum: The Search for Links." In *Complexity, Entropy, and the Physics of Information*. Addison-Wesley, 1990.
- [@wolfram2020] Wolfram, Stephen. "A Class of Models with the Potential to Represent Fundamental Physics." *Complex Systems* 29(2), 2020.

## Changelog

- 2025-01-01: Initial version in site format.
# Spacetime as Precipitate

## Constraint Accretion, Partial Determination, and the Refinement Picture of Physical Reality

*A speculative paper*

---

### Abstract

Physical theory since Newton has been written in one grammatical form: a *state* exists, a *rule* acts on it, and a *new state* results. Relativity removed global simultaneity. Quantum field theory localized interactions. Gauge theory recast physics as local consistency conditions. Each advance spent less on global synchronization. Yet the State → Rule → State template has survived every revolution, often by reintroducing a foliation of spacetime into constant-time slices.

This paper takes the trend to its end. We propose that the primitive object of physics is a network of local constraints, not a state on a manifold. The physical content of a region is the set of configurations those constraints still admit. On this view reality is *partially determined*. Determination is a local, measurable, accumulating quantity. Spacetime geometry, causal order and history are large-scale *precipitates* of constraint accretion. They are sediment, not substrate.

We formalize this with five ingredients:

- a sheaf-like structure of admissible local configurations;
- a *determination density* $R$;
- a *rigidity* measure $\rho$;
- a refinement operation that is commutative, associative and idempotent, so it needs no global clock;
- a semiring generalization in which one formalism covers constraint satisfaction, statistical mechanics, quantum amplitudes and classical action principles.

In this framework, observation is a local *mesh refinement*. It inserts constraints and does not select a branch. Decoherence becomes the formation of over-constrained, rigid regions. The arrow of time becomes the direction of increasing rigidity. We give a concrete toy model, sequential local conditioning of a lattice Gibbs measure, in which precipitation, nucleation and retrodictive refinement can be studied numerically. We close with open problems, possible empirical handles, and an honest list of the places where the program could fail.

---

### 1. Introduction: The Shrinking Synchronization Budget

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
- **Gauge theory** recast fundamental forces as *local consistency conditions*. Connections tell neighboring fibers how to agree. No global frame is required, and in general none exists.

The direction is strikingly one-way: **less global structure, more local structure.** Each revolution has cut the synchronization budget we allow reality.

One piece of global structure has survived nearly intact. Most working formulations still describe reality as a fully specified object, a field configuration on a complete manifold. They then add uncertainty on top as bookkeeping. Even the block universe, which abolishes the moving "now," keeps a *fully instantiated* four-dimensional object. Every point is maximally determined, and every field value is defined everywhere. The block universe is a synchronized cluster that has been frozen.

This paper asks what happens if we spend that last piece of budget as well. Suppose reality is not maximally instantiated. Suppose determination itself is local, partial and accumulating. Then the natural picture is not a manifold carrying states. It is a network of local agreements whose large-scale coherence *precipitates* out, the way a crystal precipitates from solution or a cloud from humid air.

We will argue three things:

1. This picture can be stated with mathematical precision.
2. It unifies several existing research programs that are usually treated separately.
3. It changes the meaning of *observation*, *history* and *geometry* in ways that remove some long-standing conceptual problems.

---

### 2. The Newtonian Template and Its Residue

The template common to Newton, Hamilton, Schrödinger and Einstein is:

$$
\text{State} \;\xrightarrow{\;\text{evolution rule}\;}\; \text{New State}
$$

The details change. The state may be a point in phase space, a vector in Hilbert space, or a Cauchy surface's worth of initial data. The rule may be Hamilton's equations, the Schrödinger equation, or the ADM evolution of the Einstein equations. The grammar does not change.

This grammar brings three hidden commitments.

**(i) Maximal instantiation.** The state is a complete specification. Uncertainty describes our *knowledge* of the state, not the state itself. Even in quantum mechanics the wavefunction is treated as complete in this sense. It is a fully determined object whose determinacy simply sits in an unfamiliar space.

**(ii) Foliability.** Evolution needs slices. Generally covariant theories still recover dynamics by choosing a foliation $t = \text{const}$. The foliation is officially a gauge choice. In practice, the theory cannot be *run* without one.

**(iii) Generation over inference.** History is the sequence of states produced by the rule. The past is a record of what the update function produced, a ledger of committed transactions.

Path integrals look at first like a different grammar: a sum over whole histories, with no state evolving. But the moment we ask what is finally *observed*, the formalism returns to the template. We take a transition amplitude between boundary states on two slices.

The equations shape our intuitions and act as a kind of cognitive gravity. A physicist trained on differential equations often does not notice that "existence arrives as a sorted sequence" is an assumption. A philosopher outside that training can simply ask why reality should be sequential at all. Much of what follows has surely been glimpsed before, in lineages of thought that did not survive or were never connected to mathematics. What is missing is not the intuition. It is the formalism.

---

### 3. The Precipitation Picture

We propose to invert the explanatory order. The standard order is:

$$
\text{Global spacetime} \;\longrightarrow\; \text{Local phenomena}
$$

We propose:

$$
\text{Local constraints} \;\longrightarrow\; \text{Mesoscale regularities} \;\longrightarrow\; \text{Large-scale geometry}
$$

A *precipitory* universe has the following features:

- Local consistency relations form first.
- Stable structures emerge as attractors of mutually reinforcing constraints.
- Larger coherent domains are assembled from local agreements, joined at their boundaries.
- What we perceive as spacetime is the accumulated residue of those agreements.

Two contrasts make the shift concrete.

**Ledger versus precipitate.** The two pictures give different definitions of history:

> *Ledger:* history = the sequence of committed events.
>
> *Precipitate:* history = the maximal self-consistent explanation of surviving local records.

The first is *generated*. The second is *inferred*, and inferred not only by observers but by the structure of reality itself, as the set of pasts compatible with all present constraints.

**Database architectures.** The distributed-systems analogy is useful:

| Picture | Architecture |
|---|---|
| Newtonian | A single authoritative database with a global clock |
| Relativistic | A sharded database with causal ordering between shards |
| Precipitory | Local fragments establish consistency; the large-scale schema emerges afterward |

In the precipitory architecture the schema is not primary. The successful *joins* are.

This picture explains something that is otherwise a brute fact: why the large-scale world looks smoother and more deterministic than the small-scale world. If geometry is a precipitated phase, then smooth spacetime is what remains after enormous amounts of local indeterminacy have averaged into a stable macroscopic order parameter. Looking for "the" fundamental globally ordered spacetime would then be like looking for the fundamental crystal lattice of a cloud. The droplets are real and the cloud is real. The smooth surface we draw around the cloud is an effective description, not a constituent.

This differs in emphasis from most pre-geometric programs. Causal sets, spin networks and tensor networks generally try to recover a discrete structure that *subsequently acquires* a geometric interpretation. The graph is often still imagined as sitting somewhere, or as a discretization of something. The claim here is more radical:

> The graph is not embedded in spacetime. Spacetime is the large-scale appearance of graph stabilization.

---

### 4. Formal Framework

We now make the picture precise. The goal of this section is not full generality. It is to show that the central notions (partial determination, refinement, rigidity, emergent history) have clean mathematical definitions.

#### 4.1 Constraint Networks

Let $V$ be a set of *sites*. These are local loci of physical variables, with no presupposed location in space or time. Each site $v$ carries a set $A_v$ of local values. For a finite region $U \subseteq V$, the *configuration space* is

$$
\Sigma_U = \prod_{v \in U} A_v .
$$

A *constraint* $c$ is a pair $(S_c, K_c)$:

- $S_c \subseteq V$ is a finite *scope*, the sites the constraint concerns;
- $K_c \subseteq \Sigma_{S_c}$ is the set of *allowed* joint values on that scope.

A *constraint network* is a triple

$$
G = (V, E, C),
$$

where $C$ is a set of constraints, and $E$ is the induced dependency relation: $v \sim w$ whenever some constraint's scope contains both. Nothing here is spatial or temporal. $E$ is a relation of *mutual relevance*, not adjacency in a pre-existing space.

#### 4.2 Admissible Configurations and Their Sheaf Structure

Write $\sigma|_S$ for the restriction of a configuration to a subset $S$. For a finite region $U$, the *locally admissible* configurations are

$$
F_C(U) = \{\, \sigma \in \Sigma_U \;:\; \sigma|_{S_c} \in K_c \text{ for every } c \in C \text{ with } S_c \subseteq U \,\}.
$$

For $U' \subseteq U$, restriction $\sigma \mapsto \sigma|_{U'}$ maps $F_C(U)$ into $F_C(U')$. This makes $F_C$ a presheaf on the poset of finite regions.

The physically significant object is the subset of local configurations that *extend* to a consistent configuration everywhere. For finite $V$, define the *realizable* configurations on $U$:

$$
\bar F_C(U) = \{\, \tau|_U \;:\; \tau \in F_C(V) \,\} \;\subseteq\; F_C(U).
$$

For infinite $V$, use the inverse limit over finite exhaustions. When $V$ is infinite, it is standard to require compactness of the value sets so that consistent finite pieces glue into a global configuration.

The gap between $F_C(U)$ and $\bar F_C(U)$ is the formal home of *frustration*. A configuration can satisfy every constraint it can see and still have no consistent completion. Abramsky and Brandenburger showed that quantum nonlocality and contextuality are exactly this kind of obstruction. Their framework uses families of local sections, compatible on overlaps, that admit no global section. The obstruction can be detected cohomologically.

We adopt that insight as foundational. The central question of physics shifts from

> *What is the state at time $t$?*

to

> *Which families of local constraints possess globally consistent completions, and what do those completions look like locally?*

#### 4.3 Determination Density

The quantity most conspicuously missing from foundational physics is *degree of determination*. We have mathematics for position, momentum, field strength and curvature. We have no standard first-class quantity measuring how *instantiated* a region is.

For the Boolean (pure constraint) case, define the **determination** of a region $U$ as

$$
R_C(U) \;=\; 1 \;-\; \frac{\log |\bar F_C(U)|}{\log |\Sigma_U|} \;\in\; [0,1].
$$

- $R_C(U) = 0$ means the region is completely undetermined: every configuration remains realizable.
- $R_C(U) = 1$ means it is fully determined: exactly one configuration remains.

When the constraints carry weights, as in §4.7, we use the entropy of the induced marginal $\mu_U$ in place of a count:

$$
R(U) \;=\; 1 - \frac{H(\mu_U)}{\log|\Sigma_U|}.
$$

The *determination density* $R(x)$ is the intensive limit of this quantity in neighborhoods of a site $x$.

Some regions are highly specified and others remain coarse. In this framework that is not a fact about our ignorance. It is the physical condition of the region. Physics usually assumes maximal instantiation and treats uncertainty as bookkeeping. Here **indeterminacy is primitive and determination is emergent.**

#### 4.4 Refinement as the Primitive Operation

The fundamental operation is not "apply the evolution rule." It is **constraint insertion**:

$$
C \;\longmapsto\; C \cup \{c\}.
$$

Write $\Omega(C) = F_C(V)$ for the global admissible set. Insertion acts by intersection:

$$
\Omega(C \cup C') \;=\; \Omega(C) \cap \Omega(C').
$$

Three elementary properties carry most of the conceptual weight of this paper.

**Proposition 1 (Monotonicity).** If $C \subseteq C'$, then $\bar F_{C'}(U) \subseteq \bar F_C(U)$ and $R_{C'}(U) \geq R_C(U)$ for every region $U$.

**Proposition 2 (Precipitation invariance).** The admissible set produced by a collection of insertions does not depend on the order in which they occur. Refinement is the meet operation in the lattice of admissible sets. It is commutative, associative and idempotent.

**Proposition 3 (No global clock required).** Suppose distinct local agents insert constraints in arbitrary interleavings, with arbitrary delays and arbitrary duplication. Once all agents have received the same constraints, they agree on the same admissible set. No synchronization is needed.

The proofs are immediate (Appendix A). The interpretation is not trivial.

Proposition 3 is the physical counterpart of a known result in distributed systems. Data types whose merge operation is a semilattice join, *conflict-free replicated data types* (CRDTs), converge without coordination. The CALM principle ("Consistency As Logical Monotonicity") states that monotone programs are exactly those that can be computed consistently without coordination. Wolfram's hypergraph program reaches for a similar property under the name *causal invariance*. There, however, it must be imposed on rewriting rules. Here it is automatic, because conjunction of constraints commutes.

This is the formal core of the claim that **reality is progressively refined rather than progressively updated.** An update needs an order. A refinement does not. A Newtonian universe is an execution trace. A refinement universe is a continuously sharpened solution.

#### 4.5 Propagation and the Emergence of Cones

Intersection is global. Adding a constraint at one site changes $\Omega(C)$ as a whole immediately. What is *locally accessible*, however, need not change immediately.

We model accessibility with a *local propagation operator*. Each site $v$ maintains an estimate $D_v \subseteq A_v$ of its possible values. In one propagation step, every site prunes values that are unsupported by its neighbors' current estimates. This is the generalized arc consistency of constraint programming, or message passing in the probabilistic case.

Let $d(v,w)$ be the graph distance in the dependency relation $E$. Then:

**Proposition 4 (Refinement cone).** If a constraint is inserted at a site $v$, then after $k$ propagation steps the local estimate $D_w$ can have changed only if $d(v,w) \leq k$.

The cone is not put in by hand. It is the shape of refinement propagation through a relation of mutual relevance. It is the analogue of a Lieb–Robinson bound, which in quantum lattice systems produces an emergent "light cone" from purely local Hamiltonians with no background relativity.

The framework therefore distinguishes two notions:

- **the consistency fact**, a change in the global admissible set $\Omega$, which is immediate and nonlocal;
- **the accessible resolution**, a change in local estimates, which spreads at a bounded rate.

This mirrors the structure of entanglement closely: global correlation together with local signaling limits. It also exposes a genuine constraint on the theory. In a generic classical constraint network, the change to $\Omega$ can alter the true marginal at a distant site $w$ before any propagation arrives. If local agents could detect that change, the theory would allow signaling. We therefore propose a **selection principle**:

> *Physically admissible constraint insertions are those that do not change the realizable marginal at any site outside their propagation cone.*

In ordinary quantum theory, no-signaling is a theorem that follows from the tensor-product structure and from the linearity of quantum operations. In the present framework it becomes a restriction on what kinds of constraints the world is built from. Whether that restriction, together with locality and order invariance, picks out something like quantum theory is perhaps the sharpest open question this program poses (§9).

#### 4.6 Rigidity and Records

Determination measures *how narrow* the admissible set of a region is. A second quantity measures *how robustly* it is narrow.

Define the **rigidity** of a region $U$ as

$$
\rho_C(U) \;=\; \min\{\, |D| \;:\; D \subseteq C,\; \bar F_{C \setminus D}(U) \neq \bar F_C(U) \,\}.
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

Each of these is an independent constraint linking the event's region to others. The region becomes enormously *over-constrained*. From inside such a region the event appears to have had a uniquely determined past. That uniqueness is not a metaphysical seal placed on history. It is an emergent property of constraint density.

This is close to Zurek's *quantum Darwinism*, in which classical objectivity comes from the redundant imprinting of pointer states on many environmental fragments. Rigidity is the constraint-network formulation of that redundancy.

#### 4.7 The Semiring Generalization

Pure constraints are too crude to describe quantum physics, which needs interference. The framework generalizes naturally.

Replace each relation $K_c$ with a **factor**

$$
f_c : \Sigma_{S_c} \to \mathbb{K},
$$

where $(\mathbb{K}, \oplus, \otimes)$ is a commutative semiring. The *weight* of a global configuration is $\bigotimes_c f_c(\sigma|_{S_c})$. The *marginal weight* of a local configuration on $U$ is the $\oplus$-sum of global weights over all completions.

Different choices of semiring give different physics:

| Semiring $\mathbb{K}$ | $\oplus$, $\otimes$ | Resulting theory |
|---|---|---|
| Boolean $\{0,1\}$ | $\vee$, $\wedge$ | Constraint satisfaction; pure consistency |
| $\mathbb{R}_{\geq 0}$ | $+$, $\times$ | Statistical mechanics; Bayesian networks; partition functions |
| $\mathbb{C}$ | $+$, $\times$ | Tensor networks; discretized path integrals $\sum \prod e^{iS_c/\hbar}$ |
| Tropical $\mathbb{R}\cup\{\infty\}$ | $\min$, $+$ | Classical action minimization; least-action principles |

The last row is worth emphasizing. Taking the $\hbar \to 0$ limit of the complex semiring, through the semiclassical regime of stationary phase, connects to the tropical semiring of Maslov's "dequantization." Classical mechanics then appears as the *idempotent shadow* of quantum mechanics. In this framework the classical limit is a change of semiring.

Precipitation invariance (Proposition 2) survives in every row, because $\otimes$ is commutative and associative. Insertion order never matters.

Monotonicity (Proposition 1) is a different matter:

- In the Boolean and tropical semirings, marginal resolution can only increase.
- In $\mathbb{R}_{\geq 0}$, the support of marginals can only shrink.
- In $\mathbb{C}$, completions can *cancel*. Adding a constraint can make a previously possible local configuration impossible by destructive interference, or turn a previously impossible one possible again.

**Interference is non-monotone refinement.** This locates the strangeness of quantum theory precisely. It is not the loss of determinism. It is the loss of monotonicity in how local resolution accumulates from local constraints.

This has a sharp consequence. The CALM correspondence between monotonicity and coordination-free consistency holds in the Boolean case and fails in the complex case. A quantum universe cannot be a coordination-free monotone computation. If it is coordination-free in some sense, as the absence of a preferred foliation suggests, then the relevant notion of consistency must be subtler than monotone accumulation. Section 9 returns to this.

#### 4.8 History as Inference

Let $O \subseteq V$ be the region associated with an observer, or with any physical subsystem. Define its **past** $P(O)$ as the set of sites whose refinements have propagated into $O$. This is the backward cone of the propagation relation, defined from refinement flow and not from a pre-given time coordinate.

The **history** available to $O$ is then

$$
\mathcal{H}(O) \;=\; \bar F_C\big(P(O)\big),
$$

the set of all past configurations consistent with every constraint, including those inside $O$.

Now insert a new constraint inside $O$. By monotonicity, $\mathcal{H}(O)$ can only shrink. **Present refinement sharpens the past.**

This is unremarkable when stated epistemically. A paleontologist digs up a fossil, and the present observation increases resolution in a region of the historical mesh. The framework suggests that epistemic and ontological refinement are more closely related than we usually admit. If the past region was genuinely only partially determined, then present constraints do not *reveal* a fact that was already settled. They *contribute* to its settling.

This involves no signaling into the past. Nothing propagates backward. What changes is the global consistency set, which has no temporal location. Wheeler's delayed-choice experiments, which seem paradoxical under the ledger picture, are natural in the precipitation picture. The "choice" is a constraint. The "past" photon's path is part of the region it constrains.

---

### 5. Observation as Mesh Refinement

The usual metaphor for quantum measurement is *selection*: one outcome is chosen from many possibilities. That metaphor is too discrete and too global. A better metaphor comes from numerical simulation: **adaptive mesh refinement.**

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

**Measurement is not special.** An observation is one more constraint insertion. The boundary between "measurement" and "ordinary physical interaction," which the Copenhagen interpretation draws arbitrarily and many-worlds dissolves into branching, disappears. Both are ways in which constraints enter the consistency network. Observers play no privileged role. A photon scattering off a dust grain refines the mesh exactly as a physicist does.

**Decoherence is rigidification.** The standard account says decoherence suppresses interference between pointer states. The precipitation account says decoherence *creates an extremely rigid, high-resolution region* of the network. Interference in the complex semiring requires that alternative completions remain available to cancel or reinforce one another. Every redundant record removes such alternatives from many independent directions. Re-cohering a macroscopic superposition is not forbidden. It requires removing on the order of $\rho$ constraints, which is why the cost grows with the redundancy of the records.

**The arrow of time is the arrow of rigidification.** Refinement is monotone in the Boolean shadow, and rigidity accumulates as constraints pile up. The direction in which records accumulate and regions harden is what we experience as "forward." This is the thermodynamic arrow restated: low determination corresponds to high entropy of admissible configurations, and refinement lowers it. It needs no global clock. Each region has its own local gradient of hardening. These gradients agree macroscopically because they are coupled through shared constraints.

The fundamental operation is not *choose a branch*. It is:

> add constraint → recompute consistency → increase local resolution.

---

### 6. Geometry as Precipitate

If no manifold is assumed, where does geometry come from? The framework offers a layered answer.

**Distance** is propagation depth. The graph distance $d(v,w)$ in the dependency relation counts how many refinement steps separate two sites. At large scales and high determination, this distance can be coarse-grained into an effective metric.

**Dimension** is a growth rate. Write $B(v,r)$ for the set of sites within distance $r$ of $v$. If

$$
|B(v,r)| \sim r^{d},
$$

the precipitate behaves as $d$-dimensional at that scale. A finer probe is the *spectral dimension* $d_s$, read from the return probability of a random walk on the network:

$$
P_{\text{return}}(\tau) \sim \tau^{-d_s/2}.
$$

There is no reason for $d$ or $d_s$ to be constant across scales or across regions of differing determination.

**Smoothness** comes from averaging. A smooth manifold is the order parameter of a high-$R$ phase, the effective description that holds where so many constraints have accumulated that local fluctuations in propagation depth average out. In this sense geometry is the *equation of state* of the precipitate.

**Lorentzian signature** is the hardest part and the most speculative. Undirected propagation naturally produces Riemannian distance. A Lorentzian structure needs a distinction between timelike and spacelike relations. The framework has a natural candidate for that distinction: the asymmetry introduced by rigidification. A relation along which rigidity increases, so that records accumulate in one direction, is "timelike." A relation between regions that constrain each other symmetrically, without asymmetric record formation, is "spacelike."

Whether this idea can be made to produce the correct causal structure and the correct signature is open. Causal set theory shows that a partial order plus a counting measure recovers Lorentzian geometry ("order plus number equals geometry"). The program here would need to derive such an order from rigidity gradients.

This picture keeps general relativity's deepest insight and pushes it one step further. In GR the metric is not scenery. It is co-determined with matter. In the precipitation picture *the manifold itself* is co-determined: an emergent feature of the constraint network wherever the network is dense, rigid and statistically homogeneous enough to support one. Asking why spacetime is a smooth four-dimensional manifold becomes like asking why water forms ice with a hexagonal lattice. The answer lies in the microscopic constraints and the conditions of precipitation.

Several approaches to quantum gravity have found that the spectral dimension falls to about 2 at short distances. These include causal dynamical triangulations, asymptotic safety and certain spin-foam models. The precipitation picture predicts *some* scale dependence of dimension, because the precipitate cannot look smooth at the scale of individual constraints. Whether it predicts that particular value depends on the microscopic constraint structure.

---

### 7. A Toy Model: Sequential Local Conditioning

Philosophy becomes physics when it can be simulated. We propose a minimal model with every essential feature: partial determination, local refinement, order invariance, propagation, rigidity, retrodiction and a precipitation transition.

#### 7.1 Setup

Take a finite graph, for instance an $L \times L$ lattice. Lattices are used for convenience only. Random geometric graphs or graphs without any geometry are equally admissible. Place a binary variable $s_v \in \{-1,+1\}$ at each site. The *prior* constraint network is a ferromagnetic Ising model in the $\mathbb{R}_{\geq 0}$ semiring, with factors

$$
f_{vw}(s_v, s_w) = e^{\beta J s_v s_w}
$$

on each edge. The prior measure $\mu^{(0)}$ is the Gibbs measure. At the start nothing is determined beyond the correlations $\beta$ induces, and $R \approx 0$ almost everywhere.

#### 7.2 The Refinement Rule

Refinement events occur as a Poisson process over sites. In this model, the Poisson process is an *ordering-free* specification: Proposition 2 guarantees that order does not affect the final measure, so the process is only a convenient way to sample insertion sets.

At each event:

1. Choose a small region $U$, for instance a site and its neighbors.
2. Draw a local configuration $\sigma_U$ from the *current* marginal $\mu_U$.
3. Insert the constraint "$s|_U = \sigma_U$." Alternatively, insert a coarser constraint that fixes only some function of $s|_U$, such as its local parity or its majority.
4. Update the measure by conditioning.

Step 2 is the model's version of the Born rule. A refinement outcome is drawn with probability given by the current marginal weight. As a result, the process *never produces a contradiction*: every inserted constraint is satisfiable by construction. The chain rule of probability,

$$
P(a, b) = P(a)\,P(b \mid a) = P(b)\,P(a \mid b),
$$

guarantees that the joint law of the final constraint set is independent of the order of insertion. This is the stochastic form of precipitation invariance.

In pseudocode:

    initialize prior factor graph G on sites V
    constraints := {}
    repeat until stopping criterion:
        U     := sample_local_region(V)
        mu_U  := marginal(G, constraints, U)      # via BP / MCMC / exact on small L
        sigma := sample(mu_U)
        constraints := constraints ∪ { s|U = sigma }
        propagate_local(G, constraints, steps = 1) # bounded-speed message passing
        record R(x), rho(x), front positions, domain statistics

Exact marginals can be computed for small $L$ using transfer matrices. For larger systems, use belief propagation or Markov chain Monte Carlo. The bounded-step propagation is tracked separately from the exact conditioning. This lets us measure the gap between the *consistency fact* and *accessible resolution* (§4.5).

#### 7.3 Expected Phenomenology

Known properties of Ising measures suggest the following behavior. Each claim below is a hypothesis for numerical confirmation, not a reported result.

**Weak coupling ($\beta < \beta_c$): local refinement.** Correlations decay exponentially. Each refinement raises $R$ only within about one correlation length of its insertion. Determination grows like a dust of isolated refined patches, with no large-scale structure. This is the *fluid* phase.

**Strong coupling ($\beta > \beta_c$): nucleation and precipitation.** The prior is close to a mixture of two ordered phases. A single refinement can tip a whole region into one of them, with determination cascading far beyond the insertion site. Large refined domains form, bounded by domain walls. Domains of opposite sign meet and leave rigid boundaries. This is precipitation in the literal sense: local seeds nucleate macroscopic coherent structure.

**Near criticality ($\beta \approx \beta_c$): scale-free refinement.** Refinement cascades follow power-law size distributions. The determination field $R(x)$ is expected to be fractal. If emergent geometry is ever to look smooth across many scales, it is reasonable to suspect it lives near a critical point of the underlying constraint statistics.

**Retrodiction.** Designate an early set of refined sites as a "past" region $P$. Continue refining elsewhere. Then measure how $H(\mu_P)$ continues to *decrease* because of later insertions in distant regions. This retrodictive refinement should be largest at strong coupling, where distant constraints are most informative about the past region.

**Rigidity.** For each refined site, estimate $\rho$ as the number of independent constraint paths supporting its value, a max-flow computation on the network. Sites inside large refined domains should show high rigidity. Isolated refinements should show $\rho = 1$. Rigid domains are the model's "classical records."

#### 7.4 A Boolean Variant and the Frozen Phase

A purely Boolean variant uses random local XOR constraints. This connects to a well-studied phase structure. For *random* $k$-XORSAT on sparse random hypergraphs, statistical physics methods (Mézard, Parisi, Zecchina and collaborators) found sharp transitions as the constraint density $\alpha$ grows. For $k = 3$:

- near $\alpha \approx 0.818$, the solution space shatters into clusters with frozen "backbone" variables;
- near $\alpha \approx 0.918$, the system becomes unsatisfiable.

In precipitation language these are a *clustering transition*, where rigid cores appear, and an *over-constraint catastrophe*, where no world remains.

The sequential-conditioning rule avoids the catastrophe by construction, because constraints are only ever drawn from what is still admissible. This makes a philosophical point concrete. A universe built by refinement cannot contradict itself, because every new constraint is drawn from the space of consistent completions. The frozen backbone of the clustered phase gives a precise model of "the past": variables pinned by so much redundant structure that no admissible completion can move them.

Thresholds for *spatially local* XOR constraints on low-dimensional lattices differ from the random-hypergraph values. Mapping them out is part of the proposed program.

#### 7.5 What the Toy Model Is Not

The model is classical, using the $\mathbb{R}_{\geq 0}$ and Boolean semirings, and its graph is fixed. It illustrates precipitation, refinement cones, rigidity and retrodiction. It does not illustrate interference or emergent geometry.

Two extensions are natural next steps:

1. A complex-weighted version, using tensor-network contraction in place of conditioning, to study non-monotone refinement.
2. A version in which the dependency graph itself is refined, with constraints that create or prune edges, to study emergent dimension.

---

### 8. Relation to Existing Work

The precipitation picture is less a new theory than a proposal for how several existing threads fit together. It shares something with each of the following.

**Wheeler's "it from bit" and participatory universe.** Wheeler proposed that physical reality arises from yes/no elementary acts and that the past is partly constituted by present observation. The present framework keeps the idea and removes the special role of observers: *any* constraint insertion participates.

**Relational quantum mechanics (Rovelli).** RQM treats properties as relative to interacting systems, with no observer-independent state. The constraint network gives a candidate global structure, the network itself, within which relational facts are local sections.

**Consistent and decoherent histories (Griffiths; Gell-Mann and Hartle).** These frameworks already treat history as a family of mutually consistent coarse-grained descriptions. The precipitation picture makes the consistency condition the *ontology*, not a selection criterion applied to a pre-existing Hilbert space.

**Sheaf-theoretic contextuality (Abramsky and Brandenburger) and topos approaches (Isham and Döring).** These are the closest mathematical precedents. They show that quantum nonlocality is precisely the failure of locally consistent data to glue globally. We propose to read that structure not as a feature of quantum *measurement* but as the basic shape of physical reality.

**Causal set theory (Sorkin and others).** Causal sets share the conviction that the continuum is emergent and that discrete relational structure is primary. Causal sets take a partial order as primitive. The precipitation picture takes constraints as primitive and hopes to *derive* the order from rigidity gradients.

**Tensor networks and emergent geometry (Swingle; Van Raamsdonk; the ER=EPR program).** These show that entanglement structure can encode geometry, with distances tracking minimal cuts through a network. The complex-semiring version of this framework *is* a tensor network. The new element is the claim that the network is refined over time, so geometry precipitates and is not merely encoded.

**Quantum Darwinism (Zurek).** Classical objectivity comes from redundant records. Rigidity $\rho$ formalizes this redundancy as a min-cut in the constraint network.

**All-at-once and retrocausal approaches (Wharton; Price; Hartle's spacetime quantum mechanics).** These argue that physics should be formulated as a global constraint problem on whole histories, like the Lagrangian schema, and not as initial-value evolution. The precipitation picture agrees and adds *partiality*: the global constraint problem is never fully posed, and it accretes.

**Wolfram's hypergraph models.** These also seek spacetime from local rewriting, and they also find that order independence (causal invariance) is the key to relativistic behavior. In the present framework order independence is automatic, because conjunction commutes, and need not be imposed on rules.

**Distributed systems theory (CRDTs; the CALM principle).** This field supplies the precise sense in which monotone constraint accumulation achieves consistency without coordination. It also shows why quantum non-monotonicity is a genuine obstacle to the simplest version of the picture.

The common thread is that each approach gives up some part of the Newtonian template. The precipitation picture gives up all of it at once:

- **not dynamics first:** refinement does not require an ordering;
- **not geometry first:** the manifold is a phase;
- **not states first:** determination is partial and accumulated.

**Constraint first. Refinement second. Geometry and history as precipitates.**

---

### 9. Open Problems

We list the problems on which the program depends, roughly in order of importance.

**P1. The quantum reconstruction problem.** Do locality, precipitation invariance and the no-signaling selection principle (§4.5), applied to a semiring-valued constraint network, single out complex amplitudes and the Born rule? The program from Hardy, Chiribella, D'Ariano, Perinotti and others reconstructs quantum theory from operational axioms. It is the natural tool here. A positive answer would make the framework a genuine foundation. A negative answer would show that something beyond constraint accretion is needed.

**P2. Non-monotone coordination-freedom.** In the complex semiring, refinement is order-invariant but not monotone. Is there a weaker consistency notion that guarantees coordination-free agreement between local agents for complex-weighted refinement, playing the role CALM plays for monotone computation? We conjecture that no-signaling is exactly that notion.

**P3. Where constraints come from.** The toy model draws new constraints from the current marginals. In nature, what plays the role of the sampling process? The most economical answer is that constraints are generated by the existing network, so that interactions are local constraint structures producing further constraint structures. That would make the framework self-contained. It needs a concrete mechanism.

**P4. Derivation of Lorentzian structure.** Can rigidity gradients produce a partial order whose large-scale statistics match a Lorentzian manifold of dimension 3+1? Where in the space of microscopic constraint statistics does such a phase exist, and is it near a critical point?

**P5. The status of $R$.** Is determination density observable, even in principle? If it is defined relative to a coarse-graining, which coarse-graining is physically privileged, if any?

**P6. Thermodynamic consistency.** The arrow of rigidification should agree quantitatively with the thermodynamic arrow. That requires relating the entropy of admissible configurations to thermodynamic entropy, including in gravitational settings where the Bekenstein–Hawking entropy is the benchmark.

---

### 10. Empirical Handles

A framework whose main achievement is reinterpretation risks being unfalsifiable. Here are the places where it could make contact with experiment or with sharper theory. They are listed with honest assessments of how strong each one is.

**Scale-dependent dimension.** The framework predicts that effective dimension varies with scale and possibly with local determination density. A scale-dependent spectral dimension appears in several quantum gravity approaches and could leave traces in high-energy dispersion relations. This is a weak handle: the prediction is shared, and its form is not yet specific.

**Re-coherence cost scaling.** If decoherence is rigidification, then the cost of reversing it, in a quantum eraser or a mesoscopic superposition experiment, should scale with the min-cut rigidity $\rho$ of the record structure. It should not scale simply with the number of environmental degrees of freedom. In many cases the two coincide. Where they differ (records that are numerous but highly correlated, versus few but independent), the framework makes a distinct qualitative prediction about which records are harder to erase. This is a moderate handle and would need careful formulation.

**No preferred foliation.** Precipitation invariance makes any physics that requires a preferred global simultaneity *incompatible* with the framework. Examples include some objective collapse models with instantaneous nonlocal collapse in a preferred frame. Experimental bounds on preferred-frame effects therefore support the framework. This is a structural handle, but not a unique one.

**Bounds on determination.** If $R$ is physical and finite constraint capacity limits it, then regions with very few interactions should be "less instantiated" in a definite sense. A natural place to look is the far tails of cosmic voids, or the early universe before structure formation. Whether this leaves observable traces, for instance in the statistics of primordial fluctuations, is unknown. This is speculative, but it is the most distinctive possibility.

---

### 11. Objections and Replies

**"This is just epistemology dressed as ontology."**

The objection assumes that a fully determined reality lies underneath our partial knowledge. That assumption is exactly what is in question. The framework's mathematics is the mathematics of inference because, on this view, *the world's own constitution is inference-shaped*. Constraints accumulate, completions narrow, and no hidden master copy exists. Bell-type theorems already make the assumption of a fully determined, locally accessible hidden state very costly. The framework accepts the conclusion and does not pay to avoid it.

**"Refinement happens 'over time' — you have smuggled time back in."**

Refinement has a partial order of *dependency*. Some constraints are drawn from marginals shaped by others. It has no total order of *time*. Precipitation invariance guarantees that no total order is needed to fix the result. What we call time is the coarse-grained, rigidity-oriented shadow of this dependency order. Using the word "accretion" is a convenience of language, just as one says a crystal "grows" while describing it in terms of equilibrium thermodynamics.

**"Isn't this solipsistic or observer-dependent?"**

No. Observers have no special status. Any physical interaction inserts constraints. Humans are simply unusually prolific producers of rigid records.

**"Why should we expect smooth geometry to precipitate at all?"**

We do not claim to have shown that it must. We claim that this is the right *question*. "Why a smooth Lorentzian 4-manifold?" should have the same kind of answer as "Why a hexagonal ice lattice?": microscopic constraints plus conditions of formation. The alternative is to treat the manifold as given, which is an assumption and not an explanation.

---

### 12. Conclusion

Each major advance in physics has spent less on global structure. Absolute time went, then absolute simultaneity, then the fixed background geometry. What remains in most formulations is the assumption of *maximal instantiation*: that reality, at bottom, is a completely specified object to which uncertainty is added afterward.

We have proposed giving that up as well. On the precipitation picture:

- the primitive object is a network of local constraints;
- the physical content of a region is its admissible set;
- *determination* is a local, accumulating, measurable quantity;
- *observation* is mesh refinement, not branch selection, and is no different in kind from any other interaction;
- *decoherence* is rigidification, the formation of over-constrained regions whose apparently unique pasts are emergent consequences of constraint density;
- *history* is not a generated trace but the maximal consistent explanation of surviving records, and present refinement can sharpen it;
- *time's arrow* is the direction of hardening;
- *spacetime* is not the stage but the sediment, the large-scale appearance of a network that has stabilized.

The mathematics we are missing is less a new dynamics than a theory of **local constraint accretion and resolution growth on partially determined relational structures**. That phrase would make a poor grant title. Its pieces already exist: sheaves and their obstructions, factor graphs and semirings, phase transitions in constraint satisfaction, coordination-free consistency in distributed systems, and tensor-network geometry. They have mostly been treated as *tools*. The proposal of this paper is to treat them as *ontology*.

If the program succeeds, the deepest lesson of twentieth-century physics will turn out to be that the world was never a synchronized cluster. It was always a set of local fragments negotiating consistency, with the large-scale schema emerging afterward.

> A Newtonian universe is an execution trace.
> A precipitating universe is a continuously sharpened solution.

---

### Appendix A: Proofs of the Elementary Propositions

**Proposition 1 (Monotonicity).** Let $C \subseteq C'$. Every constraint in $C$ is also in $C'$, so any configuration satisfying all of $C'$ satisfies all of $C$. Hence $F_{C'}(V) \subseteq F_C(V)$. Restriction to $U$ preserves inclusion, so $\bar F_{C'}(U) \subseteq \bar F_C(U)$. Since $\log$ is monotone, $R_{C'}(U) \geq R_C(U)$. $\square$

**Proposition 2 (Precipitation invariance).** By definition,

$$
\Omega(C) = \bigcap_{c \in C} \{\sigma \in \Sigma_V : \sigma|_{S_c} \in K_c\}.
$$

Set intersection is commutative, associative and idempotent. So $\Omega$ depends only on the *set* $C$, not on the sequence of insertions that produced it. In the semiring case, the total weight $\bigotimes_{c \in C} f_c$ depends only on the multiset of factors, because $\otimes$ is commutative and associative. Idempotence then holds exactly in the Boolean and tropical semirings and fails in general: repeating a factor in $\mathbb{R}_{\geq 0}$ or $\mathbb{C}$ changes the weights. This is one more way in which non-idempotent semirings are physically richer. $\square$

**Proposition 3 (No global clock required).** Each agent's admissible set is $\Omega$ applied to the set of constraints it has received. By Proposition 2 this depends only on that set, and duplicates have no effect in the Boolean case. Agents that have received the same set compute the same $\Omega$. This is the semilattice convergence property of state-based CRDTs. $\square$

**Proposition 4 (Refinement cone).** Under generalized arc consistency, a site's estimate $D_w$ at step $k+1$ is a function of $D_w$ and the estimates of its dependency neighbors at step $k$. By induction on $k$, $D_w$ at step $k$ depends only on constraints and initial estimates within distance $k$ of $w$. A constraint inserted at $v$ with $d(v,w) > k$ therefore cannot have affected $D_w$ by step $k$. $\square$

---

### Appendix B: Glossary of Correspondences

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
# Complex Analysis for Neural Networks

## A Closure-Based Derivation of the Generating Algebra of Neural Signal Transformations

*Research Proposal — Draft*

---

## Abstract

Neural networks are almost always built over the real numbers. Signals are scalars, weights are scalars, and the network's expressive power comes from composing a small set of operations: scaling, summation, and pointwise nonlinearity. Complex-valued and, more broadly, hypercomplex-valued networks show that changing the number system carried by a network changes more than its parameter count. It changes the calculus, the admissible activation functions, and the coupling structure between components.

This proposal argues that the right next step is not to try further hand-picked number systems. It is to *derive* the number system from the operations neural computation actually performs. We propose a signal type with two ingredients:

- **Coefficients** drawn from a recursively function-valued continuum. Concretely, this is a graded limit of reproducing-kernel Hilbert spaces, so it supports both finite truncation and differentiation.
- **Generators** that correspond to algebraically independent primitive transformations of neural computation.

The generators are operators that act on their own coefficients. The resulting object is therefore not an ordinary algebra over scalars but a skew (Ore-type) extension. Its multiplication table would not be chosen for convenience. It would be obtained by systematic closure analysis inside a graded filtration that keeps the table finite. That analysis is carried out by automated rewriting, so no researcher chooses the order in which reductions are applied.

The method is borrowed from a precedent in passive electronics. There, tabulating the constitutive relations among circuit variables exposed an empty cell. That cell predicted a missing element, the memristor, before any physical device was identified. We use this precedent as a methodological template, not as evidence. Circuit variables are bound by conservation laws and dimensional analysis; neural signal variables are not. An empty cell in our table therefore counts as a prediction only if it is a generator that is *strictly required* to close the graded algebra.

We will build the table for neural signal transformations: deliberately overcomplete at first, then reduced by derivability and equivalence under rules frozen in advance. Only generators that survive reduction under every one of many independently sampled reduction orders count as primitive. We will then ask whether closure *demands* an operation with no current architectural counterpart. If it does, that operation is a concrete, falsifiable prediction. If it does not, that hypothesis has failed, and we will report it as failed. Even then, the programme yields a principled taxonomy that places analog networks, spiking networks, neural operators, and hypercomplex networks as projections of a single algebraic object.

The most immediately actionable element is a treatment of spiking as an adjoint pair. It joins a stateful event projection with reset to a lift back into continuous structure. We expect this pair to explain surrogate gradients as a derived object rather than a training heuristic.

---

## 1. Motivation

### 1.1 The complex-analysis analogy

Complex analysis does not begin by treating $z = a + bi$ as two unrelated real features. It begins with one new generator, $i$, and one relation, $i^2 = -1$. That relation alone turns the pair $(a, b)$ into an algebra. In it, multiplication couples components in a fixed way: a product of complex numbers performs a rotation and a scaling that no pair of independent real multiplications can express.

The payoff of complex analysis is not the numbers themselves. It is the class of functions that respect the algebra. Holomorphic functions, defined by the Cauchy–Riemann conditions, are extremely rigid. Local behaviour determines global behaviour, integrals are path-independent, and singularities carry structural information. The algebra induces a calculus, and the calculus induces strong regularity.

We propose to treat neural networks the same way. The question is not "which activation function should we use?" or "which neuron model is most biologically faithful?" The question is:

> **What is the minimal generating algebra of neural signal transformations, and what calculus does it induce?**

Concretely, we seek a signal type of the form

$$
s = a_0 + a_1 e_1 + a_2 e_2 + \cdots, \qquad e_i e_j = \sum_k C_{ij}^{\,k}\, e_k ,
$$

Its parts are:

- The coefficients $a_i$ are not real numbers but elements of a recursively function-valued continuum $\mathcal{C}$.
- The generators $e_i$ correspond to qualitatively distinct neural operations.
- The structure constants $C_{ij}^{\,k}$ encode how those operations combine.

Section 4.2 explains why this schematic form must be refined. Because the $e_i$ are operations, they do not commute with their coefficients, and the honest object is a skew extension rather than a plain algebra over a field.

### 1.2 The closure-finding method and the memristor precedent

The methodological core of this proposal comes from a specific pattern of discovery. Its best-known instance is Chua's 1971 prediction of the memristor.

Passive two-terminal circuit theory involves four basic variables: voltage $v$, current $i$, charge $q$, and flux linkage $\varphi$. Taken pairwise, they admit six relations:

- Two are definitional: $dq = i\,dt$ and $d\varphi = v\,dt$.
- Three are realised by familiar elements: the resistor relates $v$ and $i$, the capacitor relates $q$ and $v$, and the inductor relates $\varphi$ and $i$.
- One cell is empty: the relation between $\varphi$ and $q$.

The prediction followed from the structure of the table, not from any device physics. If the formal space of constitutive relations is to be complete, something must occupy that cell. The physical realisation came decades later.

The authors' prior work on the completeness structure of passive electronics followed the same pattern. The procedure can be stated abstractly:

1. Stop cataloguing implementations.
2. Identify the primitive transformations available in the domain.
3. Determine what those transformations generate under composition.
4. Find a small closed, complete basis.
5. Notice any primitive implied by symmetry or closure that is missing from the known catalogue.
6. Only then ask what mechanism, physical or computational, realises it.

This proposal applies that procedure to neural computation. The candidate "components" are neuron types, layer types, and architectural motifs. The candidate "constitutive relations" are the transformations they perform on signals. The hope is that the right formal space will make a missing primitive conspicuous, as the $\varphi$–$q$ cell was.

**Limits of the analogy.** We state the analogy's limits at the outset, because the analogy carries no evidential weight of its own.

Chua's table was a complete graph on four physical variables. Those variables are tied together by conservation laws and constrained by dimensional analysis, and that is what made the empty cell a necessity rather than an accident of bookkeeping. The neural "variables" we will tabulate in Phase 4 are amplitude, event, phase, state, and transport. They are not physically orthogonal and are not bounded by any conservation law. A blank in a table built from them could easily be a linguistic artefact of our own taxonomy.

We therefore use the relation table only as a *heuristic guide* to where to look. The criterion for a prediction is algebraic, not tabular:

> An empty cell is a generator, such as a commutator $[e_i, e_j]$ or an adjoint of an existing generator, that is required to close the graded operator algebra and is not in the span of the catalogue.

A blank that closure does not demand is not a prediction.

### 1.3 Why now

Two independent lines of research have each reached half of this programme:

- **Algebra-valued networks** have generalised from complex to quaternion, dual, double, Clifford, and arbitrary finite-dimensional algebras. Multiplication is expressed through a structure tensor.
- **Neural operators and function-valued models** have generalised from vectors of scalars to maps between function spaces, and in some cases to function-valued random processes.

A third line supplies tools both halves will need:

- **Continuous-time sequence models.** These include rough-path and signature methods, neural controlled differential equations, and structured state-space models. They handle noncommutative temporal composition and compress histories into finite orthogonal-polynomial bases.

As far as our survey has found, no work combines these. In particular, none:

- (a) uses function-valued, recursively structured coefficients;
- (b) interprets the basis elements as generators of neural operations rather than as arbitrary coordinates; and
- (c) derives the multiplication table from closure rather than choosing it.

That intersection is the target of this proposal.

---

## 2. Background and Related Work

### 2.1 Complex-valued neural networks

Complex-valued networks replace real-valued activations and weights with complex values. This forces the calculus to change:

- Most useful loss functions are real-valued functions of complex arguments, so they are not holomorphic. Backpropagation is therefore done with Wirtinger (CR) calculus, which treats $z$ and $\bar z$ as formally independent.
- Liouville's theorem says every bounded entire function is constant, so no activation can be both bounded and holomorphic everywhere.

The literature has developed split activations, phase–amplitude activations, and complex-specific initialisation and normalisation to cope with this.

**Lesson for this programme:** an algebra imposes real constraints on admissible nonlinearities. Those constraints are both a cost and a source of structure. Any derived neural algebra must be checked for an analogue of the Liouville obstruction. Over noncommutative algebras it must also be checked for the stronger obstruction identified by Fueter, discussed in Phase 5.

### 2.2 Hypercomplex and algebra-valued neural networks

Several algebras beyond the complex numbers have been used:

- **Quaternion networks** exploit the Hamilton product to share parameters across four coupled components. They have been applied to colour images, 3D rotations, and speech.
- **Dual numbers** ($\varepsilon^2 = 0$) and **double, or split-complex, numbers** ($j^2 = +1$) have been studied as alternative second-order hypercomplex systems.
- **Clifford (geometric) algebra layers** have been used for physical simulation, where the algebra encodes geometric structure such as scalars, vectors, and bivectors.

Two developments are especially close to this proposal.

- **Learned multiplication.** Parameterised hypercomplex multiplication (PHM) layers learn the multiplication rule from data instead of fixing it to a known algebra. This shows that the structure tensor can be a free object. However, it is learned for performance, not derived from operational closure. The result is generally not interpretable as an algebra of operations.
- **Fully general finite algebras.** Recent work on a fully tensorial approach to hypercomplex-valued networks builds dense and convolutional layers over arbitrary finite-dimensional algebras. It represents multiplication as a rank-3 structure tensor and proves a universal-approximation result under stated conditions. This establishes the general pattern
  $$
  x = \sum_i x_i e_i, \qquad e_i e_j = \sum_k C_{ij}^{\,k} e_k ,
  $$
  with $C$ determining the network's coupling structure. It is, however, explicitly restricted to finite-dimensional algebras with scalar coefficients.

### 2.3 Neural operators and function-valued objects

Neural operators learn maps between infinite-dimensional function spaces. They include DeepONet, the Fourier Neural Operator, and the broader neural-operator framework. Their inputs and outputs are functions, typically discretised flexibly.

A related line interprets linearised neural operators probabilistically, as producing function-valued Gaussian processes. It draws an explicit connection to currying in functional programming (LUNO).

These works show that function-valued signals can be handled in practice. They do not equip those signals with an algebra of neural operations.

### 2.4 Spiking neural networks and the event–continuum interface

Spiking networks carry information in discrete events placed in continuous time. They have their own primitives: integration, leak, threshold, reset, and refractoriness. They require their own training techniques. Examples include surrogate gradients, eligibility-trace methods such as e-prop, and event-time methods.

The relationship between spiking and analog networks is usually framed as emulation: rate coding approximates analog values, or analog networks approximate spike statistics. This framing treats one paradigm as the reference and the other as an approximation. A central question for this proposal is whether that asymmetry is real or an artefact of the missing algebra.

Two lines have already treated the spike–continuum interface formally, and both bear directly on our event projection–lift pair (Section 4.3).

- **Time-encoding machines** (Lazar and collaborators) show that a bandlimited signal can be perfectly recovered from its spike times if spike density exceeds a Nyquist-type bound. In our terms, this is a concrete case where a lift composed with a projection acts as the identity on a well-characterised subspace.
- **RKHS frameworks for spike trains** (Paiva, Park, and Príncipe) embed spike trains into reproducing-kernel Hilbert spaces. They thereby provide a principled candidate for the lift itself.

Neither line places the interface inside an algebra of operations, or asks what the lost residual generates under composition.

### 2.5 Noncommutative temporal structure: rough paths and state-space models

Two lines on sequence models already handle the temporal side of this programme.

- **Rough-path theory and signatures.** These represent a path by its signature: the sequence of iterated integrals, living in a tensor algebra. That algebra is noncommutative by construction, because the order of increments matters. Neural controlled and rough differential equations (Neural CDEs and RDEs) build learning systems on this foundation.
- **Structured state-space models** (HiPPO, S4, Mamba). These compress continuous histories into finite coefficient vectors in orthogonal-polynomial bases and evolve them by structured linear dynamics, with input-dependent selection in Mamba.

The lesson for this programme is twofold:

- Noncommutativity of temporal composition is not news. Any hypothesis that merely asserts it is too weak to be worth testing (Section 3).
- HiPPO-style projections are a ready-made truncation scheme for function-valued coefficients (Section 4.1). Signature algebras are a natural point of comparison for whatever graded structure our closure analysis produces.

### 2.6 Vector symbolic architectures

Vector symbolic architectures (VSAs) equip high-dimensional vectors with an explicit algebra of operations. They include holographic reduced representations and hyperdimensional computing. Binding, bundling, and permutation have stated algebraic laws, and composite structures are built by combining them.

VSAs are the closest existing precedent for an "algebra of operations" in neural computing. They differ from this proposal in two respects:

- Their operations are chosen for symbolic composition, not derived from the operations neurons perform.
- Their coefficients are scalars, not function-valued objects.

If our derived algebra contains a binding-like product, the comparison with VSAs will be direct.

### 2.7 The gap

The existing landscape can be summarised as two chains that do not meet:

$$
\text{complex NN} \subset \text{hypercomplex NN} \subset \text{finite algebra-valued NN}
$$

$$
\text{ordinary NN} \to \text{neural operator} \to \text{function-valued objects}
$$

Spiking networks, signature methods, and VSAs sit beside these chains rather than on them. The proposed object lies at their intersection:

$$
\boxed{\text{recursively function-valued coefficients} \;+\; \text{neural operational generators} \;+\; \text{closure-derived multiplication}}
$$

---

## 3. Research Questions and Hypotheses

**RQ1 — Well-definedness.** Is there a mathematically consistent recursive continuum $\mathcal{C} \cong F(X, \mathcal{C})$ rich enough to serve as a coefficient domain for neural signals? It must also support Fréchet differentiation and memory-efficient finite truncation.

**RQ2 — Generators.** Starting from an overcomplete catalogue of the transformations neural systems perform, what is the minimal set of algebraically independent generators under pre-registered closure rules?

**RQ3 — Structure.** What commutation and multiplication rules do those generators satisfy? Specifically:

- How do they act on coefficients, through the twisting maps $\alpha_i$ and derivations $\delta_i$ of an Ore extension?
- How do they compose with one another?
- Is the resulting structure associative, graded, or nilpotent in places?
- Is its graded associative quotient isomorphic to a known class, such as Clifford, operator, signature, or path algebras?

**RQ4 — Closure.** Within a graded filtration that separates algebraic from topological closure, does closure require an operation not present in the initial catalogue? If so, what are its formal properties, and does it have a natural realisation?

**RQ5 — Calculus.** What is the analogue of holomorphy for maps over this structure? Does it induce a restricted, rigid class of nonlinearities? Are there Liouville- or Fueter-type obstructions? Do surrogate gradients for spiking emerge from the structure rather than being imposed on it?

**RQ6 — Utility.** Do networks built over the derived algebra show measurable advantages at matched compute over strong baselines? Candidate advantages are expressivity, efficiency, generalisation, or interpretability. The baselines are real, complex, quaternion, learned-algebra, spiking, neural-operator, state-space, and neural-CDE models.

Three working hypotheses guide the programme.

- **H1 — Spiking as an adjunction.** Spiking is not a separate computational paradigm. It is the image of a stateful projection from continuous structure to events, $(\Pi, \mathcal{R}) : \mathcal{C} \to \mathcal{E} \times \mathcal{C}$, paired with a lift $\Lambda : \mathcal{E} \to \mathcal{C}$. Together these form an adjunction, or Galois connection. Ordinary analog, spiking, and operator networks correspond to different choices of representation and projection on one underlying structure.

- **H2 — The memory–event commutator generates refractory and plasticity dynamics.** That the structure is noncommutative is not in doubt and is not what we test. Filtering then thresholding differs from thresholding then filtering. Signature algebras are noncommutative by construction. The hypothesis is instead specific: the commutator of eventization with memory, $[\Pi, M]$, is nonzero *and* is not an arbitrary new element. It reproduces refractory and adaptation dynamics. In its two-neuron form, it reproduces the timing asymmetry characteristic of spike-timing-dependent plasticity (STDP). H2 fails if the commutator is zero, is in the span of generators unrelated to refractoriness and adaptation, or yields a timing kernel with the wrong symmetry.

- **H3 — Closure requires a new generator.** Within the graded filtration fixed in Phase 0, closure requires at least one generator that is outside the span of the catalogue and has no current named architectural counterpart. This is the "empty cell" in the strict sense of Section 1.2. This hypothesis is the one most at risk, and it is the one we treat as the primary falsifiable claim.

**What a negative result on H3 means.** Two considerations pull in opposite directions, and we take both seriously.

- A programme in which every outcome counts as success has no real stakes. Calling a failure to find an empty cell a "closure proof" and celebrating it would soften the central claim until it could not fail.
- A programme that can only publish if it finds a missing primitive gives its researchers a perverse incentive to manufacture one.

Our position is this. If closure introduces no new generator, **H3 has failed**, and we will report it as a failure of the hypothesis, not as a confirmation in disguise. The closure proof remains a deliverable because it is a genuine mathematical result about the neural catalogue, and because having it removes any reason to force a prediction. It is a consolation, not a vindication.

---

## 4. Formal Framework

### 4.1 The recursive continuum

We want coefficients that are themselves function-valued, with values that may again be function-valued, without a fixed depth. Informally:

$$
\mathcal{C} \cong F(X, \mathcal{C}).
$$

Taken naively, with $F(X, \mathcal{C})$ the set of *all* functions $X \to \mathcal{C}$, this equation has no non-trivial set-theoretic solution. Whenever $X$ has at least two elements, Cantor's theorem makes $\mathcal{C}^X$ strictly larger than $\mathcal{C}$. The first technical task is therefore to choose a setting in which the equation is solvable and still useful.

Three classical routes exist:

- **Domain-theoretic.** Restrict to Scott-continuous functions and solve by inverse limits, in the tradition of Scott and of Smyth–Plotkin.
- **Coinductive.** Take $\mathcal{C}$ as a final coalgebra.
- **Analytic.** Restrict to contractive, Sobolev, or reproducing-kernel Hilbert spaces with suitable decay.

The first two are the natural homes of recursive equations, but they are the wrong working setting here:

- Scott domains are ordered by information content and carry $T_0$ topologies. They have no subtraction and no notion of Fréchet or Gateaux derivative.
- A coefficient domain on which gradient-based training cannot even be stated would defeat Phase 5 before it began.

We therefore adopt the analytic route from the outset. We keep domain theory only as background semantics for what the recursion means.

Concretely, we define $\mathcal{C}$ as the projective limit of a graded family of Hilbert spaces,

$$
\mathcal{C} = \varprojlim_d \, \mathcal{C}_d, \qquad \mathcal{C}_0 = \mathbb{R}, \qquad \mathcal{C}_{d+1} = \mathcal{H}(X;\, \mathcal{C}_d),
$$

with the following ingredients:

- $\mathcal{H}(X; \mathcal{C}_d)$ is a vector-valued RKHS, or Sobolev space, of $\mathcal{C}_d$-valued functions on $X$.
- The compatible projections $\pi_d : \mathcal{C}_{d+1} \to \mathcal{C}_d$ are orthogonal projections onto the subspace that is constant in the innermost argument.
- Weights decay across depth so that the limit is again a Hilbert space.

In this space, $\mathcal{C} \cong \mathcal{H}(X; \mathcal{C})$ should hold as an isometric isomorphism. Proving this for a usable family of kernels is the first theorem of Phase 0.

The construction has three properties we need:

- Each $\mathcal{C}_d$ is a Hilbert space, so Fréchet derivatives exist.
- Every element is the limit of its truncations, so **graceful truncation** is built in.
- Finite-depth networks appear as restrictions to $\mathcal{C}_d$.

The construction also has a cost that must be handled from the start. A naive grid discretisation of $\mathcal{C}_d$ with $M$ points per level needs $O(M^d)$ storage, which is a curse of dimensionality in the depth of the recursion. We therefore represent each $\mathcal{C}_d$ in low-rank spectral or polynomial bases, such as Tensor-Train decompositions, truncated Fourier expansions, or HiPPO-style orthogonal-polynomial projections. Storage then grows with rank and depth rather than exponentially with depth.

### 4.2 The signal type: signals versus operators

Given $\mathcal{C}$ and a generator set $\{e_i\}$, the schematic signal type is

$$
\mathcal{S} = \Big\{ \textstyle\sum_i f_i\, e_i \;\Big|\; f_i \in \mathcal{C} \Big\}.
$$

Written this way, the notation conflates two kinds of object. The $f_i$ are *signals*. The $e_i$ are meant to be *operations*: differentiate, delay, eventize, rectify. Taking that distinction seriously changes the mathematics in two ways.

**Commutation.** An operation acts on whatever it multiplies, so generators do not commute with coefficients. In general $e_i f \neq f e_i$. Two examples:

- Differentiation obeys the Leibniz rule, $\partial \, f = f' + f\, \partial$.
- Delay obeys $\tau_s f = f(\cdot - s)\, \tau_s$.

$\mathcal{S}$ is therefore not a bilinear algebra over a commutative ring. The right linear framework is a skew polynomial ring, or **Ore extension**,

$$
\mathcal{C}[e_1, \dots, e_G;\, \alpha, \delta], \qquad e_i f = \alpha_i(f)\, e_i + \delta_i(f),
$$

where each $\alpha_i$ is an endomorphism of $\mathcal{C}$ and each $\delta_i$ is an $\alpha_i$-derivation. The pair $(\alpha_i, \delta_i)$ is precisely the record of how the $i$-th neural operation transforms coefficient functions:

- Differentiation has $\alpha = \mathrm{id}$ and $\delta = d/dt$.
- Delay has $\alpha = \tau_s$ and $\delta = 0$.

Products of generators retain operator-valued structure constants,

$$
e_i e_j = \sum_k \mathcal{K}_{ij}^{\,k}\, e_k, \qquad \mathcal{K}_{ij}^{\,k} : \mathcal{C} \to \mathcal{C},
$$

which is a genuine generalisation beyond finite-dimensional algebras. The finite-dimensional hypercomplex case is recovered when $\mathcal{C} = \mathbb{R}$, $\alpha_i = \mathrm{id}$, $\delta_i = 0$, and each $\mathcal{K}$ is a scalar. Crossed-product algebras offer an alternative formalism where group actions dominate. We will use them if the delay and transport generators turn out to form a group.

**Nonlinearity.** Rectification, saturation, and eventization do not distribute over addition: $e_i(f + g) \neq e_i(f) + e_i(g)$. No bilinear product with linear structure operators can represent them faithfully. There are three standard ways out:

1. **Koopman lift.** Lift to a linear operator space, where a nonlinear map acts linearly on a space of observables.
2. **Local expansion.** Restrict to local Taylor, jet, or Volterra expansions, which are polynomial and hence algebraic. Carleman linearisation makes this concrete. A polynomially truncated nonlinearity acts *linearly* on the vector of monomials of its input up to degree $k$. It therefore becomes an element of the graded tensor algebra over the coefficient ring. This is the route by which nonlinear primitives enter the reduction pipeline of Phase 2.
3. **Near-rings or operads.** Accept that composition of nonlinear maps is right-distributive only and forms a composition near-ring. In typed form, it forms a coloured operad.

These options sit on a tension between exactness and tractability:

- The exact structure of nonlinear composition is near-ring- or operad-like. Phases 1–2 will characterise it as such, drawing where useful on convenient vector spaces (Kriegl–Michor) and differential categories for higher-order calculus.
- PyTorch, JAX, and GPU tensor cores rely on multilinear tensor contractions. Building layers over bare operads or near-rings would collapse the schedule of Phases 5 and 6.

We therefore commit to a projection step. By Gate 2 (Month 9), the exact structure is linearised into a **graded associative quotient algebra**, using Carleman, jet, or Volterra expansion or a skew-linear approximation. Phases 5 and 6 work with this quotient.

The projection error is quantified and reported. The acceptable error is pre-registered at Gate 1 as a maximum spectral-norm error at truncation depths $k = 2, 3, 4$. Only generators that persist across all three depths are reported as structure.

Sharp nonlinearities are a known weak point. Truncated expansions of a threshold oscillate with $k$ rather than converge, a Gibbs-type effect. The eventization primitive therefore enters the expansion through its relaxation $\Pi_\tau$ at a pre-registered temperature. The exact operator $(\Pi, \mathcal{R})$ is handled through the adjoint pair of Section 4.3, never through a raw expansion of a step function.

### 4.3 The event projection, reset, and lift

Spiking motivates a structural feature we expect to be fundamental. Let $\mathcal{E}$ be a space of event structures, such as marked point processes in continuous time. The simplest model of eventization is a projection

$$
\Pi : \mathcal{C} \to \mathcal{E}.
$$

That model is too simple. In a biological neuron, spike emission is not a memoryless readout of a continuous quantity. It is a state-altering bifurcation, followed by active reset and a refractory period. We therefore take the eventization primitive to be a **coupled state-reset operator**

$$
(\Pi, \mathcal{R}) : \mathcal{C} \to \mathcal{E} \times \mathcal{C},
$$

which emits events and returns the post-event state. Formally this is a Mealy machine, or a coalgebra for the functor $\mathcal{E} \times (-)$. It lets leaky integrate-and-fire (LIF) dynamics be recovered as leaky integration composed with $(\Pi, \mathcal{R})$ in feedback. That recovery is a test in Phase 6.

There should be a complementary lift that turns discrete events into continuous formal structure:

$$
\Lambda : \mathcal{E} \to \mathcal{C}.
$$

Examples include kernel smoothing, synaptic response, generating-function encodings, and RKHS embeddings of spike trains. This gives a candidate fundamental pair:

$$
\mathcal{C} \;\underset{\Lambda}{\overset{\Pi}{\rightleftarrows}}\; \mathcal{E}.
$$

The pair is not expected to be mutually inverse:

- Under reasonable choices, $\Pi \circ \Lambda$ may be close to the identity on representable event trains.
- $\Lambda \circ \Pi$ is a lossy idempotent on $\mathcal{C}$.

If the pair can be ordered so that it forms a Galois connection or an adjunction, then $\Lambda \circ \Pi$ is a closure operator. The fixed points of $\Lambda \circ \Pi$ then form a distinguished sub-continuum: the signals that survive eventization. Time-encoding machines already exhibit such a sub-continuum, namely bandlimited signals above a critical spike density.

This immediately yields candidate primitives that no current taxonomy names explicitly:

- **The closure** $\Lambda \circ \Pi$ itself.
- **The residual** $\mathrm{id} - \Lambda \circ \Pi$. This is the part of a continuous signal that events cannot carry: the subthreshold continuous information lost to spiking.

Whether these turn out to be generators, products, or trivial is exactly the kind of question the closure analysis is designed to settle. We regard this adjunction as the most mathematically natural and most immediately actionable part of the programme. Its value does not depend on whether H3 succeeds.

**Differentiability.** The threshold in $\Pi$ is discontinuous. Its derivative is zero almost everywhere and undefined at threshold, which breaks Fréchet differentiability.

- For training, we use a temperature-controlled relaxation $\Pi_\tau : \mathcal{C} \to \mathcal{C}$. It stays closed and differentiable within $\mathcal{C}$ and converges to $\Pi$ as $\tau \to 0$.
- The theoretical object remains $(\Pi, \mathcal{R})$. $\Pi_\tau$ is a training device, not a replacement.
- The link between the two is a conjecture we place at the centre of Phase 5: surrogate gradients and eligibility traces arise as the formal adjoint of the smoothed system $(\Pi_\tau, \Lambda)$. On this view, the surrogate gradient is the smoothed adjoint lift of the non-differentiable projection. If true, this turns a widely used heuristic into a derived object.

### 4.4 What "orthogonal" means here, and which closure counts

Throughout, "orthogonal" does not mean statistically decorrelated features. It means **algebraically independent primitive directions in the space of signal transformations**. A generator is orthogonal to a set of others if it cannot be obtained from them by the permitted operations.

This notion is relative to the chosen closure operations, and that choice is not innocent. Two failure modes bracket it:

- **Universal-approximation collapse.** Suppose topological limits are admitted alongside linear combination and a single nonlinearity. Then the universal approximation theorem implies that the catalogue collapses to $\{+, \text{scaling}, \sigma\}$: every primitive is a limit of ordinary networks. No empty cell can appear, and the analysis says nothing.
- **Free-algebra explosion.** Suppose only exact algebraic composition is admitted. Then composing nonlinearities with delays and derivatives generates an infinite-dimensional free monoid. Every new word is formally an "empty cell", and the analysis says nothing for the opposite reason.

We avoid both by separating algebraic closure from topological closure:

- Generation is computed *algebraically* within a **graded filtration** $F_0 \subset F_1 \subset F_2 \subset \cdots$. The degree counts, for example, the number of nonlinear compositions or the order of a jet, analogous to jet bundles or truncated Volterra and Lie series.
- We quotient by the ideal of operations above degree $k$.
- Topology is used only to construct $\mathcal{C}$ and to take limits *within* a fixed degree.

This guarantees a finite, closed multiplication table at each truncation level $k$. We will report results as a function of $k$. Only structure that is stable across $k$ counts as a finding.
**Representation versus procedure.** The graded, Carleman-truncated Ore extension is the *representation* in which closure is posed. It fixes what counts as degree, which words exist, and where the quotient is taken.
The representation does not say how closure is computed. Nor does it guarantee that the answer is free of human choices. Computing closure inside the representation is itself a noncommutative Gröbner-basis problem. The representation and the procedure of Phase 2 are therefore not alternatives: the order-invariant reduction pipeline is the execution engine for the filtration defined here.

---

## 5. Methodology

The work proceeds in seven phases, Phases 0–6. Phases 1–4 form the core of the closure analysis and mirror the procedure in Section 1.2. Three hard freeze gates separate the theory track, and a parallel systems track begins in Month 4 (Section 9).
It is worth being explicit about which parts of the plan *derive* the algebra and which only *govern* it.
- **Derivation.** The derivation is carried by the order-invariant reduction pipeline of Phase 2, operating over the graded filtration of Section 4.4. Its sharpest instance is the set of commutator computations in Phase 4.
- **Governance.** The freeze gates, the parallel systems track, the four-way ablation, and the sham-primitive controls are scheduling and validation machinery. They dictate when results are locked and how the algebra is tested once it has been derived.
None of the governance machinery can add a generator to the algebra or remove one from it. Keeping this division clean means that neither an empirical result nor schedule pressure can quietly stand in for a closure argument.


### Phase 0 — Foundations

- Construct $\mathcal{C}$ as the graded projective limit of Section 4.1. Prove existence and the isometric fixed-point property for a stated kernel family.
- Characterise the truncations $\mathcal{C}_d$ and their low-rank representations.
- Define evaluation, composition, and restriction.
- Define the space of admissible transformations on $\mathcal{C}$ and on $\mathcal{S}$, including the topology in which limits are taken.
- Specify formally the closure operations under which "generated by" is computed. These are composition and linear combination within the graded filtration, with limits only within fixed degree and the truncation degree $k$ stated.

*Deliverable:* a foundations note establishing a consistent, differentiable, and implementable setting. Together with the Phase 1 definitions, it is published as a timestamped pre-registered protocol at **Gate 1 (Month 3)**.

### Phase 1 — Overcomplete enumeration of primitives

We will compile a deliberately overcomplete catalogue of transformations performed by artificial and biological neural systems, without trying to make it minimal. The initial catalogue includes:

| Family | Candidate primitives |
|---|---|
| Linear | scaling, superposition, weighting |
| Pointwise | nonlinearity, saturation, rectification |
| Structural | evaluate, compose, restrict/project |
| Analytic | differentiate, integrate, leaky integration |
| Temporal | delay, transport, phase shift |
| Event | threshold/eventize with reset ($\Pi, \mathcal{R}$), lift ($\Lambda$), refractoriness |
| State | memory, history dependence, adaptation |
| Multiplicative | gating, modulation, attention-style bilinear interaction, binding |
| Normalising | divisive normalisation, lateral inhibition |
| Representational | amplitude, phase, rate, timing |

Each primitive will be given a precise operational definition on $\mathcal{C}$ or $\mathcal{S}$:

- For linear primitives, this includes its commutation data $(\alpha_i, \delta_i)$.
- For nonlinear primitives, this includes its place in the near-ring or operadic structure.

Primitives that cannot be defined precisely will be flagged rather than discarded, since a failure to define something is itself informative.
**Admission is operational, not analytic.** A primitive needs a precise definition, not good regularity. We do not require candidates to be smooth, monogenic, or otherwise compatible with the calculus of Phase 5.
Imposing Dirac/monogenic regularity at Month 3 would rule out rectification and thresholding, among others, because they fail conditions that belong to a later question. The algebra would then be shaped in advance by the calculus we hope it will induce. Regularity is studied in Phase 5, over whatever closure produces.


**Pre-registration.** The catalogue, the formal definitions, and the Phase 0 closure rules are frozen and published as a timestamped protocol at Gate 1. This is before any reduction is run. It is our principal safeguard against reverse-engineering, that is, tuning definitions or topologies until pre-selected primitives emerge.

### Phase 2 — Reduction

For each pair, and then each small tuple, of primitives, determine:

- **Derivability.** Can primitive $p$ be expressed as a composition, within the graded filtration, of others? For example, delay may be derivable from transport, and leaky integration from integration combined with feedback.
- **Equivalence.** Are two primitives the same up to a change of representation? For example, rate and smoothed event trains may be related through $\Lambda$.
- **Dependence on representation.** Does a primitive become derivable only once a particular $\Pi$ or $\Lambda$ is fixed?

Quotienting the catalogue by derivability and equivalence gives a candidate generating set. Done by hand, this quotient would be path-dependent in two ways:

- The result may depend on the order in which reductions are applied.
- The person applying them chooses that order, which is exactly where confirmation bias enters.

We therefore mechanise the reduction.

**The reduction pipeline.** At Gate 1, the catalogue is frozen as a finite presentation of the degree-$k$ graded quotient. The presentation has two parts:

- one generator for each catalogue primitive, with nonlinear primitives entering through their Carleman-truncated lifts (Section 4.2);
- one rewriting rule for each derivability and equivalence relation stated in the protocol.

Reduction is then automated noncommutative Gröbner-basis completion, in the sense of Bergman's Diamond Lemma and Knuth–Bendix completion. A completed basis gives a unique normal form for every word of degree at most $k$. The question "is $p$ derivable from the others?" becomes a mechanical one: does $p$ reduce to an expression that does not involve $p$?

**Order invariance.** Completion depends on the chosen monomial ordering, so a single run would merely move the path-dependence into the software. We will therefore run completion under at least 100 randomised admissible monomial orderings, sampled from a distribution and seed fixed in the Gate 1 protocol.

The minimal generating set is defined strictly as an intersection: the generators that are irreducible under *every* ordering. Generators that are irreducible under some orderings but not others form an order-dependent fringe. The fringe is reported separately and never counted as part of the core.

**The heuristic table has no vote.** The Phase 4 variable table plays no role in the reduction. An unpopulated cell is ignored unless completion fails to close at degree $k$ without adjoining a new generator corresponding to that cell. A cell can become a prediction only through that failure, never through its visual salience on the page.

**Termination.** In general, noncommutative completion need not terminate, and where it does terminate its cost can grow doubly exponentially. Degree-$k$ truncation is what makes the pipeline feasible. The truncated quotient is finite-dimensional, so completion terminates at every fixed $k$. Even so, the cost at a fixed $k$ may be large.

The protocol therefore also fixes a compute budget per ordering. Orderings that exhaust the budget are counted, reported, and excluded from the intersection. If more than a pre-registered fraction of orderings exhaust it, the core at that $k$ is reported as undetermined rather than computed from a convenient subset.

Results from later phases do not feed back into the reduction. If Phase 3 or Phase 5 exposes a defect in the frozen definitions, we will:

1. publish an amended protocol;
2. rerun the *entire* reduction; and
3. report both the original and amended outcomes.

We will not adjust it piecemeal.

The completion runs will use established noncommutative Gröbner-basis engines, such as the letterplace implementation in Singular, which is accessible from SageMath. Each resulting independence claim will be exported as an executable notebook in SageMath or SymPy. Where a statement is small enough, it will also be certified in Lean 4. Everything will be released openly, including the ordering seeds, so that every independence claim can be re-run by others.

*Deliverable:* an order-invariant minimal generating set at each truncation degree, with the order-dependent fringe reported separately and machine-checkable proofs of independence.

### Phase 3 — The multiplication table

With generators $\{e_i\}$ in hand, construct both the commutation rules $e_i f = \alpha_i(f) e_i + \delta_i(f)$ and the table $e_i e_j$. Record the following properties.

- **Commutativity.** Noncommutativity is expected generically and is not itself informative. The informative objects are the *commutators*, for example $[e_M, e_S]$ for memory and event generators, or $[e_A, e_S]$ for amplitude-controlling-events against events-generating-continuous-response. Their content is what H2 tests.
- **Associativity.** Associativity may fail when history dependence or nonlinear composition is involved. If it does, we record the exact non-associative or operadic structure, and then compute its closest graded associative quotient for use downstream.
- **Inverses.** Which generators are invertible? Eventization is plainly lossy.
- **Idempotence and nilpotence.** $\Lambda \circ \Pi$ may be idempotent. Some generators may square to zero, as the dual unit $\varepsilon$ does. Such a generator would be a natural carrier of derivative-like information.
- **Grading.** We check that the product respects the filtration degree of Section 4.4, and whether finer gradings exist, such as depth in $\mathcal{C}$ or number of eventizations.

We will then compare the graded associative quotient to known algebra classes. These include Clifford algebras, quaternion-like division structures, operator algebras, signature (tensor) algebras from rough-path theory, path algebras of quivers, and VSA binding algebras.

**On retreating to weaker structures.** We do not treat a retreat to a category or semigroupoid as a result in its own right. Almost any collection of functions forms a category under composition. Concluding that "the right object is a category" would therefore carry no mathematical risk, and it would abandon the analytic premise that Phase 5 depends on. The commitment is instead:

1. Record the exact structure, whatever it is.
2. Project it onto the closest graded associative quotient by Gate 2, with a pre-registered tolerance on projection error.
3. If no associative quotient approximates the exact structure within that tolerance, count this as evidence *against* the programme's central thesis, not as a reframed success.

*Deliverable:* the commutation rules and table, their classification, the projection error of the associative quotient, and the relationship to known algebras. These are frozen at **Gate 2 (Month 9)**.

### Phase 4 — Closure analysis and the empty cell

This is the decisive phase. We compute the closure of the generating set within the graded filtration fixed in Phase 0. Then we ask:

1. Does every product and commutator land in the span of existing generators, up to degree $k$? Operationally, does its normal form against the completed basis lie in that span under every ordering?
2. Where it does not, what new element is required?
3. Is the requirement stable as $k$ increases?

As a heuristic guide, we will also set up a relation table between signal "variables": amplitude, event, phase, state, and transport. We will mark which pairwise relations are definitional, which are realised by known neural primitives, and which are empty. Following Section 1.2, the table only tells us where to look. A blank counts as a **prediction** only if closure of the graded algebra strictly requires a generator to fill it, such as a commutator or an adjoint. A blank that closure does not require is reported as a feature of the taxonomy, not of the algebra.

**Test of H2.** In the same phase, we compute the graded commutator $[\Pi, M]$ explicitly up to degree $k$. We do this not only for memory but for every continuous mixing operator $M$ in the frozen generating set. Each commutator is reduced to normal form against the completed basis under every ordering.

- If the residual reduces to zero, or into the span of existing generators within the Gate 2 tolerance, the commutator is accounted for.
- If it does not, we call the result a *commutator deficit*. Its normal form is the exact algebraic expression of a missing cross-regime primitive.

This makes the event–continuum interface the most likely place for an H3 prediction to appear.

For memory specifically, we then test whether the residual reproduces refractory and adaptation dynamics. In its two-neuron form, we test whether it reproduces an STDP-like timing asymmetry. The criteria are pre-registered in the Gate 1 protocol.

We will characterise any predicted primitive formally: its domain, codomain, invariances, behaviour under $\Pi$ and $\Lambda$, and place in the table. Only after that will we look for realisations.

*Deliverable:* either a predicted primitive with formal properties, or a proof that the derived algebra is closed with respect to the known catalogue. The latter means H3 has failed, and it is reported as such (Section 3).

### Phase 5 — The induced calculus

An algebra becomes useful when it constrains the maps defined over it. We will:

- **Define $\mathcal{S}$-differentiability:** maps whose derivative respects the algebra's multiplication, the analogue of the Cauchy–Riemann conditions.
  - We anticipate **Fueter's obstruction**. Over noncommutative algebras such as the quaternions, the naive definition of holomorphy forces functions to be affine.
  - Following generalised Clifford analysis, we will therefore define regularity through Dirac-type operators and monogenic functions, not through a naive difference quotient.
- **Establish a training-ready gradient calculus** for real-valued losses of $\mathcal{S}$-valued parameters. This combines a CR/Wirtinger-style split with reverse-mode differentiation in Hilbert and Banach spaces, via vector–Jacobian products, so that training is possible even when losses are not $\mathcal{S}$-differentiable.
- **Derive surrogate gradients.** This is the centrepiece milestone of the phase. We aim to prove that surrogate gradients and eligibility traces for spiking networks arise as the smoothed adjoint lift $(\Pi_\tau, \Lambda)$ of the non-differentiable state-reset projection $(\Pi, \mathcal{R})$, recovering standard surrogate forms as special cases.
- **Investigate rigidity results:** identity theorems, path-independence, and Liouville- or Fueter-type obstructions. Each of these has direct consequences for activation design.
- **Study universal approximation over $\mathcal{S}$.** We begin from finite truncations, where existing algebra-valued results apply, and extend to the recursive setting.

*Deliverable:* a calculus sufficient to train $\mathcal{S}$-valued networks, together with structural theorems on admissible nonlinearities. The backward-pass rules are frozen at **Gate 3 (Month 14)**.

### Phase 6 — Realisation and experiments

- **Implementation.** We will build a JAX/PyTorch library of $\mathcal{S}$-valued layers using truncated, low-rank $\mathcal{C}_d$.
  - Operator-valued structure constants are implemented as small learned or fixed operators.
  - The structure tensors $\mathcal{K}_{ij}^{\,k}$ are kept sparse and low-rank by construction, to avoid the $O(G^3)$ cost of dense contractions over $G$ generators.
  - The architecture exposes $(\Pi, \mathcal{R})$, $\Pi_\tau$, and $\Lambda$ as first-class layers.
  - Development begins in Month 4 on a parallel systems track, not after the theory is complete. Early versions run on provisional structure and are updated at each gate.
- **Recovery tests.** Verify that the following are recovered as restrictions or projections, as H1 predicts. These tests start in Month 4 and serve as continuous regression checks on the theory.
  - standard analog networks;
  - spiking networks, including LIF via $(\Pi, \mathcal{R})$ and graded-spike models;
  - complex and quaternion networks;
  - neural operators such as FNOs.
- **Predicted-primitive tests.** If Phase 4 yields a new primitive, implement it and test whether it improves performance on tasks where the table suggests it should matter.
- **Physical realisation.** Where a predicted primitive has a plausible analog, neuromorphic, or device-level implementation, document it as a target for follow-up work. This mirrors the gap between the memristor's prediction and its physical identification.

---

## 6. Evaluation

### 6.1 Theoretical criteria

- Existence of $\mathcal{C}$ in the graded Hilbert setting, with Fréchet differentiability and low-rank truncations.
- Classification of the derived structure and the projection error of its graded associative quotient.
- A clear answer to RQ4: a characterised predicted primitive, or a closure proof recorded as a failure of H3.
- A clear answer to H2's specific commutator claim.
- A trainable calculus with stated regularity results, including the surrogate-gradient derivation.

### 6.2 Empirical criteria

Four domains would stretch a 24-month programme too thin to benchmark fairly. We therefore concentrate on **two high-leverage domains** that jointly stress continuous operators and discrete events:

- **Neuromorphic event-based spatio-temporal perception**, such as event-camera vision and spiking audio datasets. This stresses $(\Pi, \mathcal{R})$, $\Lambda$, timing, and memory.
- **1D/2D PDE operator learning with discontinuities or event-triggered control.** This stresses function-valued coefficients, evaluation and composition, and the interaction between continuous fields and discrete events.

Multivariate time-series forecasting and geometric simulation against Clifford-layer baselines are deferred to follow-up work.

**Baselines.** Baselines will include:

- real-valued networks;
- complex and quaternion networks;
- PHM (learned-algebra) networks;
- finite-algebra tensorial networks;
- spiking networks with surrogate-gradient training;
- neural operators;
- structured state-space models (S4, Mamba);
- neural CDEs.

The last two are the strongest existing models of continuous-time, noncommutative temporal composition.

**Metrics.** Results will be reported as **iso-FLOP and iso-latency Pareto frontiers**, not just parameter counts. On neuromorphic tasks we will add synaptic operations (SynOps) and event counts. We will also measure accuracy, sample efficiency, and robustness under distribution shift.

**Structural ablation.** To test whether the algebraic structure, rather than added capacity, drives any effect, every headline result will be accompanied by a four-way ablation at matched width and compute:

1. **Derived** $\mathcal{K}_{ij}^{\,k}$, the full model.
2. **Unconstrained learned** $\mathcal{K}_{ij}^{\,k}$, a generalised PHM. This tests whether derivation beats learning.
3. **Randomly permuted or commutativity-constrained** $\mathcal{K}_{ij}^{\,k}$. This tests whether the specific structure, and in particular the commutators of H2, matters.
4. **Sham-primitive replacement.** The H3-predicted generator $e_{\text{new}}$ is replaced with a redundant existing generator at identical width and compute. This tests whether the predicted primitive contributes anything beyond its slot.
The sham is chosen to fill a visually conspicuous blank in the heuristic variable table, yet it is proven redundant by the Phase 2 completion. It is therefore exactly the kind of artefact the closure criterion is meant to exclude. Experimenters running the empirical track are blinded to which of the two generators is closure-required and which is the sham.


### 6.3 Falsifiability

The programme makes claims that can fail:

- If the reduction in Phase 2 collapses the catalogue to the generators of an existing finite algebra with scalar coefficients, the "new algebra" hypothesis fails.
- If no graded associative quotient approximates the exact structure within the pre-registered tolerance, the claim that neural computation has a tractable generating *algebra* fails.
- If spiking networks, including LIF with reset, cannot be recovered as a projection of the derived structure, H1 fails.
- H2 fails if any of the following holds:
  - the commutator $[\Pi, M]$ vanishes;
  - it lies in the span of generators unrelated to refractoriness and adaptation;
  - it yields a timing kernel without the STDP-like asymmetry.
- If closure within the graded filtration introduces no new generator, H3 fails.
- If a predicted primitive produces no measurable effect over its sham replacement on tasks where the table says it should matter, its practical relevance is refuted, even if its formal status stands.

---

## 7. Risks and Mitigations

An internal multi-perspective review of an earlier draft covered mathematics, feasibility, methodology, neuroscience, novelty, empirical design, and project management. The reviewers converged, with high agreement, on the same structural bottlenecks:

- the conflict between Scott domains and differential calculus;
- the conflation of signals with operators;
- the disanalogy with the memristor;
- the twin threats of universal-approximation collapse and free-algebra explosion;
- the weakness of the original H2;
- the strength of the $\Pi \dashv \Lambda$ adjunction;
- an over-compressed timeline.

The framework and plan above respond to each. The residual risks are:

| Risk | Mitigation |
|---|---|
| The recursive continuum is ill-defined, non-differentiable, or impractical. | Work in a graded RKHS/Sobolev projective limit from the outset; keep domain theory as background semantics only. Use low-rank spectral, Tensor-Train, or HiPPO bases to avoid $O(M^d)$ storage. |
| Generators do not commute with coefficients, and nonlinear primitives break bilinearity. | Use Ore extensions for linear generators. Characterise the exact near-ring or operadic structure, then project to a graded associative quotient by Gate 2 with quantified error. |
| Closure collapses under universal approximation, or explodes into a free algebra. | Separate algebraic from topological closure; impose a graded filtration and quotient above degree $k$; report only structure stable across $k$. |
| The generating set depends on the arbitrary initial catalogue or on the order of reduction. | Start overcomplete. Reduce by automated Gröbner/Knuth–Bendix completion under 100+ randomised monomial orderings, and report the intersection as the invariant core, separate from the order-dependent fringe. Invite external review of the catalogue before the Gate 1 freeze. |
| Confirmation bias: definitions tuned until expected primitives appear. | Pre-register the closure rules, rewriting rules, primitive definitions, and ordering seed at Month 3. Mechanise reduction so that no human chooses the order of reductions. No piecemeal feedback from later phases; any amendment triggers a full, reported rerun. Release symbolic proof notebooks. |
| Symbolic completion is intractable, through non-termination or doubly exponential growth. | Truncate at degree $k$, which guarantees termination at fixed $k$. Pre-register a compute budget per ordering. Report orderings that exhaust it, and declare the core undetermined at that $k$ if too many do. |
| Truncated expansions oscillate for sharp spiking nonlinearities. | Expand the relaxation $\Pi_\tau$ at a pre-registered temperature, and handle the exact $(\Pi, \mathcal{R})$ through the adjoint pair. Count only generators that persist across $k = 2, 3, 4$. |
| The structure is not an algebra (non-associative, partial, or categorical). | Record the exact structure, but do not count retreat to a category as success. Project to the closest associative quotient for engineering. Failure to find one within tolerance counts against the thesis. |
| The "empty cell" is an artefact of the variable table. | Treat the table as heuristic only; it has no role in the reduction. A cell counts only if completion fails to close at degree $k$ without adjoining a generator for it. Test any prediction against blinded sham primitives that fill table blanks but are provably redundant. |
| No empty cell appears. | Report H3 as failed. The closure proof, unified taxonomy, $\Pi \dashv \Lambda$ results, and calculus remain publishable deliverables, which also removes any incentive to manufacture a primitive. |
| Discontinuous $\Pi$ blocks gradient-based training. | Train with the relaxation $\Pi_\tau$. Derive surrogate gradients formally as the smoothed adjoint lift rather than adopting them ad hoc. |
| Liouville- or Fueter-type obstructions rule out useful nonlinearities. | Use Dirac/monogenic regularity rather than naive holomorphy, but never as an admissibility condition on the catalogue. Follow the complex-valued precedent of split or phase–amplitude activations and Wirtinger-style training, and quantify the cost. |
| Computational overhead outweighs benefits. | Enforce sparse, low-rank structure tensors to avoid $O(G^3)$ contractions. Benchmark on iso-FLOP and iso-latency Pareto frontiers. |
| Schedule overrun from late implementation. | Run a parallel systems track from Month 4 with continuous recovery tests. Enforce three freeze gates. Halve the empirical scope to two domains. |
| Over-reliance on the memristor analogy. | Treat the analogy as a methodological template, not as evidence. Every prediction must stand on its own formal and empirical footing. |

---

## 8. Expected Contributions

1. **A foundational construction** of a recursively function-valued, differentiable coefficient domain with memory-efficient truncations, suitable for neural computation.
2. **A minimal generating set** for neural signal transformations. It is invariant across randomised reduction orders and comes with machine-checked independence proofs. This is the first principled answer to "what are the $1, i, j, k$ of neural computation?"
3. **A derived commutation and multiplication structure**, formalised as an Ore-type extension with a graded associative quotient, together with its classification. This includes a formal treatment of the stateful event projection–lift pair $(\Pi, \mathcal{R}) \dashv \Lambda$ and of the residual it leaves behind.
4. **A closure result**: either a predicted neural primitive with formal characterisation, or a proof that the known catalogue is closed, which falsifies H3.
5. **A test of a specific structural hypothesis** linking the memory–event commutator to refractory, adaptation, and plasticity dynamics.
6. **An induced calculus**: a Dirac/monogenic holomorphy analogue, a training-ready gradient calculus, structural theorems for activation design, and a derivation of spiking surrogate gradients from the adjunction.
7. **A unified taxonomy** in which analog networks, spiking networks, neural operators, and hypercomplex networks appear as restrictions or projections of one object. It is positioned against signature algebras, state-space models, and VSAs.
8. **An open-source release**: the pre-registered protocol, symbolic proof notebooks, a JAX/PyTorch library, and a benchmark suite with full ablations.

---

## 9. Work Plan

The plan runs a theory track and a systems track in parallel, separated by three hard go/no-go freeze gates. Results do not flow backwards across a gate. Any amendment after a gate is published, and the affected analysis is rerun in full.

| Period | Track | Phase | Milestones |
|---|---|---|---|
| Months 1–3 | Theory | Phases 0–1 | Construction of $\mathcal{C}$ and truncations $\mathcal{C}_d$; closure rules and graded filtration; overcomplete catalogue with formal definitions. |
| **Month 3** | — | **Gate 1** | **Freeze $\mathcal{C}_d$, closure rules, rewriting rules, and primitive catalogue. Publish timestamped pre-registered protocol, including the ordering-sampling seed, per-ordering compute budget, projection tolerances at $k = 2, 3, 4$, and H2 and H3 criteria.** |
| Months 4–9 | Theory | Phases 2–3 | Automated Gröbner/Knuth–Bendix completion under 100+ randomised orderings; invariant generating core and order-dependent fringe; commutation rules and multiplication table; exact structure; graded associative quotient. |
| **Month 9** | — | **Gate 2** | **Freeze generating set $\{e_i\}$, table, and associative quotient (with projection error). Non-associative or categorical structure is projected for the engineering track; no layers are built over bare semigroupoids.** |
| Months 9–14 | Theory | Phases 4–5 | Closure analysis and empty-cell determination; $[\Pi, M]$ test; induced calculus; surrogate-gradient derivation; rigidity and approximation results. |
| **Month 14** | — | **Gate 3** | **Freeze backward-pass calculus rules.** |
| Months 4–24 | Systems | Phase 6 | From Month 4: testbed and low-rank $\mathcal{C}_d$ layers; sparse $\mathcal{K}_{ij}^{\,k}$ kernels; continuous recovery tests (SNN/LIF, FNO, graded-spike). Updated at each gate. |
| Months 14–24 | Systems | Phase 6 | Benchmarks in two domains; iso-FLOP/iso-latency Pareto evaluation; four-way structural ablation; predicted-primitive tests; realisation notes; public release. |

---

## 10. Conclusion

The history of complex analysis suggests that the most consequential move in a mathematical domain can be to change the number system and let the new algebra dictate the calculus. The history of the memristor suggests that a well-constructed table of primitive relations can point to a missing component before anyone builds it. We take that history as a template, not as evidence. This proposal joins the two ideas and applies them to neural computation, with the safeguards that a less constrained domain demands.

We do not begin by designing a neuron. We begin by asking which transformations are genuinely primitive, how they act on the signals they carry, how they compose, and whether their composition closes. The answer will show:

- whether spiking is a fundamental generator, a projection, or a product of more primitive operations;
- whether the commutators of the natural algebra of neural signals encode the dynamics we already observe, such as refractoriness, adaptation, and plasticity;
- whether an operation is missing from the catalogue we currently build from.

An ordinary architectural taxonomy cannot settle these questions. A closure analysis can, provided its rules are fixed before its results are known.

---

## References

- Bellec, G., Scherr, F., Subramoney, A., Hajek, E., Salaj, D., Legenstein, R., & Maass, W. (2020). A solution to the learning dilemma for recurrent networks of spiking neurons. *Nature Communications*, 11, 3625.
- Blute, R. F., Cockett, J. R. B., & Seely, R. A. G. (2006). Differential categories. *Mathematical Structures in Computer Science*, 16(6), 1049–1083.
- Brackx, F., Delanghe, R., & Sommen, F. (1982). *Clifford Analysis*. Pitman.
- Brandstetter, J., van den Berg, R., Welling, M., & Gupta, J. K. (2023). Clifford neural layers for PDE modeling. *ICLR*.
- Chua, L. O. (1971). Memristor — The missing circuit element. *IEEE Transactions on Circuit Theory*, 18(5), 507–519.
- Fueter, R. (1934). Die Funktionentheorie der Differentialgleichungen Δu = 0 und ΔΔu = 0 mit vier reellen Variablen. *Commentarii Mathematici Helvetici*, 7, 307–330.
- Gu, A., Dao, T., Ermon, S., Rudra, A., & Ré, C. (2020). HiPPO: Recurrent memory with optimal polynomial projections. *NeurIPS*.
- Gu, A., Goel, K., & Ré, C. (2022). Efficiently modeling long sequences with structured state spaces. *ICLR*.
- Gu, A., & Dao, T. (2023). Mamba: Linear-time sequence modeling with selective state spaces. arXiv:2312.00752.
- Hirose, A. (Ed.). *Complex-Valued Neural Networks*. Springer.
- Kanerva, P. (2009). Hyperdimensional computing: An introduction to computing in distributed representation with high-dimensional random vectors. *Cognitive Computation*, 1(2), 139–159.
- Kidger, P., Morrill, J., Foster, J., & Lyons, T. (2020). Neural controlled differential equations for irregular time series. *NeurIPS*.
- Koopman, B. O. (1931). Hamiltonian systems and transformation in Hilbert space. *Proceedings of the National Academy of Sciences*, 17(5), 315–318.
- Kovachki, N., et al. (2023). Neural operator: Learning maps between function spaces. *JMLR*, 24.
- Kreutz-Delgado, K. (2009). The complex gradient operator and the CR-calculus. arXiv:0906.4835.
- Kriegl, A., & Michor, P. W. (1997). *The Convenient Setting of Global Analysis*. American Mathematical Society.
- Lazar, A. A., & Tóth, L. T. (2004). Perfect recovery and sensitivity analysis of time encoded bandlimited signals. *IEEE Transactions on Circuits and Systems I*, 51(10), 2060–2073.
- Li, Z., et al. (2021). Fourier neural operator for parametric partial differential equations. *ICLR*.
- Lu, L., Jin, P., Pang, G., Zhang, Z., & Karniadakis, G. E. (2021). Learning nonlinear operators via DeepONet. *Nature Machine Intelligence*, 3, 218–229.
- Lyons, T. (1998). Differential equations driven by rough signals. *Revista Matemática Iberoamericana*, 14(2), 215–310.
- Maass, W. (1997). Networks of spiking neurons: The third generation of neural network models. *Neural Networks*, 10(9), 1659–1671.
- Magnani, E., Pförtner, M., Weber, T., & Hennig, P. (2024). Linearization turns neural operators into function-valued Gaussian processes (LUNO). arXiv preprint.
- Neftci, E. O., Mostafa, H., & Zenke, F. (2019). Surrogate gradient learning in spiking neural networks. *IEEE Signal Processing Magazine*, 36(6), 51–63.
- Ore, O. (1933). Theory of non-commutative polynomials. *Annals of Mathematics*, 34(3), 480–508.
- Paiva, A. R. C., Park, I., & Príncipe, J. C. (2009). A reproducing kernel Hilbert space framework for spike train signal processing. *Neural Computation*, 21(2), 424–449.
- Parcollet, T., et al. (2019). Quaternion recurrent neural networks. *ICLR*.
- Plate, T. A. (1995). Holographic reduced representations. *IEEE Transactions on Neural Networks*, 6(3), 623–641.
- Scott, D. (1976). Data types as lattices. *SIAM Journal on Computing*, 5(3), 522–587.
- Smyth, M. B., & Plotkin, G. D. (1982). The category-theoretic solution of recursive domain equations. *SIAM Journal on Computing*, 11(4), 761–783.
- Strukov, D. B., Snider, G. S., Stewart, D. R., & Williams, R. S. (2008). The missing memristor found. *Nature*, 453, 80–83.
- Trabelsi, C., et al. (2018). Deep complex networks. *ICLR*.
- Zhang, A., et al. (2021). Beyond fully-connected layers with quaternions: Parameterization of hypercomplex multiplications with 1/n parameters. *ICLR*.
- *Fully tensorial approach to hypercomplex-valued neural networks* (2026). arXiv. [Full author list and arXiv identifier to be confirmed before submission.]
- *Generalization of neural networks on second-order hypercomplex numbers*. MDPI. [Authors, journal, volume, year, and DOI to be confirmed before submission.]
   - Regularity is a property we study *over* the derived algebra, not a filter on what enters it (Phase 1). If useful nonlinear generators turn out not to be monogenic, that is a finding about the calculus. It is recorded as an obstruction with its cost quantified, not used as a reason to revisit the generating set.
- Machine-checked independence of the generating set relative to the pre-registered closure operations, invariant across all completed reduction orderings.
---
title: Embeddings from a Physicist
subtitle: Signature, Causality, and the Case Against Distance as a Primitive
slug: embedding-and-physics
type: essay
mode: argumentative
numbering: roman
ledger: required
math: true
topics: [embeddings, lorentzian-geometry, causality, partial-orders, retrieval]
lifecycle: draft
date_created: 2025-01-01
date_updated: 2025-01-01
---

# Embeddings from a Physicist

*Signature, Causality, and the Case Against Distance as a Primitive*

> Reader note: Claim status is marked inline in [brackets]. A claim ledger is at the end.

## Introduction

Most embedding methods are built around one question: *how far apart are these two things?* Word vectors, sentence encoders, retrieval indices, graph embeddings, and recommendation towers almost all reduce meaning to proximity. Related things are close. Unrelated things are far. Retrieval means looking up nearest neighbors.

This works well when the relationship you care about is resemblance. A great deal of the data you most want to model is not organized by resemblance, though. It is organized by *influence*: what can cause what, what must happen before what, what depends on what, and what is forbidden from following what. For that kind of data, the right question is not "how far is B from A?" It is "can B be reached from A?"

These are different mathematical objects. Distance is a function to the non-negative reals. Reachability is a relation, specifically a **partial order** (a relation that is reflexive, antisymmetric, and transitive). You can try to recover one from the other, and the field has worked hard at that. But a physicist will notice that physics found, about a century ago, a geometric structure that gives you the order *first* and the measurement *second*. That structure is the indefinite quadratic form, the signature of a space. Machine learning (ML) has borrowed it only narrowly and, I will argue, for mostly the wrong reasons. [interpretation:C1]

This essay tries to state the borrowing correctly. The argument has five parts:

1. ML geometry routinely conflates three distinct structures: metric, signature, and curvature.
2. A signed quadratic form provides scale-free classification and, under the right conditions, a reachability order. Neither depends on choosing a ruler.
3. Causal data is the domain where this is structurally correct rather than merely convenient.
4. Physics' particular choice of $(3,1)$ is irrelevant to embeddings. The real design space is $(p,q)$, and it is richer than the literature has explored, though it also has some sharp edges.
5. This suggests a concrete research program that replaces nearest-neighbor semantics with reachability semantics.

---

## I. Three Structures That Are Not the Same Thing

A great deal of the confusion in "geometric deep learning for embeddings" goes away once you separate three structures that are often treated as interchangeable settings.

### Metric: Measurement

A **metric** $d(x,y)$ assigns a non-negative number to every pair of points. It is symmetric, $d(x,y) = d(y,x)$, and it satisfies the triangle inequality. It answers "how much?" questions.

Symmetry is the first warning sign for causal data. If $A$ causes $B$, it is generally false that $B$ causes $A$. A symmetric function cannot represent an asymmetric relation without extra machinery added on top, such as a separate direction vector, an asymmetric scoring head, or a norm-based ordering trick. [derived]

### Signature: Classification

Consider the quadratic form defined by a diagonal matrix $G$ with $p$ entries equal to $+1$ followed by $q$ entries equal to $-1$:

$$
Q(\mathbf{x}) = \mathbf{x}^\top G \mathbf{x}, \qquad G = \mathrm{diag}(\underbrace{+1,\dots,+1}_{p}, \underbrace{-1,\dots,-1}_{q})
$$

This form does not measure in the same sense. Its most important output is a **sign**:

$$
Q(\mathbf{x}) > 0, \qquad Q(\mathbf{x}) = 0, \qquad Q(\mathbf{x}) < 0.
$$

Every displacement vector falls into exactly one of three classes: in physics language, spacelike, null, or timelike. In this essay a negative value of $Q$ means timelike. [definition] The pair $(p,q)$ is the **signature**. Sylvester's law of inertia guarantees that it is an invariant: no linear change of basis can change the number of positive and negative directions. [fact]

### Curvature: An Intrinsic Scale

**Curvature** is a bending of the space itself, and when it is nonzero it introduces an intrinsic length scale. A sphere of radius $r$ has curvature $1/r^2$. A hyperbolic space of curvature $-1/\ell^2$ has a characteristic length $\ell$. Below that scale the space looks flat. Above it, the exponential growth of volume (in the hyperbolic case) takes over.

Curvature is what makes hyperbolic embeddings good at trees: volume grows exponentially with radius, just as the number of nodes does in a branching hierarchy. [fact] It also means *the geometry contains information that the data did not put there*: a preferred radius against which every structure is implicitly compared. [interpretation]

### Why the Distinction Matters

The ML literature's path into these ideas has mostly run through hyperbolic space, and the hyperboloid model of hyperbolic space is built *inside* a Lorentzian space. [fact] So signature arrived as a computational convenience for implementing curvature. It was not treated as an object in its own right. [interpretation:C2] The Lorentzian form became scaffolding, and the cone structure it carries was largely ignored.

The point of this essay is that the scaffolding is the interesting part.

---

## II. What a Signed Form Actually Buys You

### Classification Without a Threshold

Consider how a Euclidean embedding decides that two items are "related." It needs a threshold: an $\varepsilon$-ball, a $k$ in $k$-nearest-neighbors, or a cosine cutoff. Flat Euclidean space is scale-covariant, since dilating everything preserves the *ranking* of distances. But any binary decision about relatedness requires picking a number, and that number is a ruler imposed from outside.

A signed form needs no such number. Under dilation the form scales quadratically:

$$
Q(\lambda \mathbf{x}) = \lambda^2 Q(\mathbf{x}), \qquad \lambda > 0.
$$

In plain terms, the sign of $Q$ is exactly invariant under rescaling. [derived:C3] Whether a displacement is timelike, null, or spacelike does not depend on how large it is. A relationship spanning a millimeter and one spanning a light-year are classified by the same rule.

This is the precise sense in which signature is *scale-free*. Flat Euclidean space has no intrinsic scale either, but it has nothing to classify with except magnitude, and magnitude needs a threshold. Signature provides a qualitative partition, and that partition is preserved under every rescaling.

### From Classification to Order

In Lorentzian signature $(n,1)$ with $n \ge 1$, the timelike vectors $\{\mathbf{v} : Q(\mathbf{v}) < 0\}$ form two disjoint solid cones, a future cone and a past cone. [derived] Choose one as "future" (a **time orientation**) and define

$$
\mathbf{x} \preceq \mathbf{y} \iff \mathbf{y} - \mathbf{x} \in \overline{C^+},
$$

where $\overline{C^+}$ is the closed future cone. Because $\overline{C^+}$ is a *convex cone*, closed under addition and positive scaling and containing no line, this relation is:

- **reflexive**: $\mathbf{0} \in \overline{C^+}$;
- **transitive**: if $\mathbf{y} - \mathbf{x} \in \overline{C^+}$ and $\mathbf{z} - \mathbf{y} \in \overline{C^+}$, then $\mathbf{z} - \mathbf{x}$ is their sum and therefore also in the cone;
- **antisymmetric**: the cone contains no nonzero vector together with its negative.

That is a partial order, which is the mathematical structure of reachability. [derived:C4] It arrives with the geometry rather than being trained on afterward, and it inherits the scale invariance above. It is also invariant under translations and under the orthochronous Lorentz group, the linear maps that preserve $Q$ and the time orientation.

Two features deserve emphasis.

**Asymmetry is native.** $\mathbf{x} \preceq \mathbf{y}$ and $\mathbf{y} \preceq \mathbf{x}$ together force $\mathbf{x} = \mathbf{y}$. Direction is not a feature attached to a symmetric similarity. It is part of the geometry.

**Sparsity is native.** Given a point $\mathbf{x}$, the set of points it can reach is not "everything nearby." It is the specific region $\mathbf{x} + \overline{C^+}$. Two points can be arbitrarily close in coordinates and still be causally unrelated (spacelike separated). Two points can be enormously far apart in coordinates and still be causally related. Proximity and accessibility come apart. [derived:C5] That is exactly the decoupling causal data needs. [interpretation]

### The Boundary Is Meaningful

The **null cone** $Q(\mathbf{v}) = 0$ is not just the edge between two classes. It is a distinguished set in its own right, preserved by all the symmetries, and it marks the limit of reachability. In data terms, it is the natural home for *boundary cases*: transitions that are only just admissible, dependencies that are tight, constraints that are exactly saturated. [hypothesis:C6] A metric space has no comparable intrinsic boundary. Any boundary you draw is a level set you chose.

---

## III. Order Before Measurement

A physicist would treat what comes next as the strongest argument. Inside general relativity, it turned out that *the causal order carries most of the geometry*.

Results by Hawking, King, and McCarthy (1976) [@hawking1976] and Malament (1977) [@malament1977] established that, for well-behaved spacetimes, the causal relation alone (which events can influence which) determines the spacetime's topology and its metric *up to a conformal factor*. [fact:C7] Conformal structure means angles and light cones. The only thing missing is a local scale: a single function saying how many units of proper time each causal interval contains.

Put plainly, the reachability relation determines everything about the geometry except the ruler.

The **causal set** program, launched by Bombelli, Lee, Meyer, and Sorkin in 1987 [@bombelli1987], takes this to its logical end. Spacetime is modeled as a discrete partially ordered set, and the missing volume information is supplied by *counting elements*. Their slogan is "order + number = geometry." [fact]

This reverses the usual design of embeddings. Standard practice starts from measurement (a distance or inner product) and hopes structure emerges. The physics tradition shows that structure can come first, with measurement as an optional extra layer. If your data is fundamentally about what can reach what, you should want a representation in which reachability is the primitive and distance is derived, or even dropped. [normative:C8]

---

## IV. Why Causal Data Is the Natural Home

### Correlation Versus Accessibility

There are two different relations one might want to encode:

- **Correlation or resemblance**: $A \sim B$. Symmetric, graded, naturally metric.
- **Causal accessibility**: $A \to B$. Asymmetric, transitive, naturally an order.

Current embeddings mostly encode the first and try to recover the second through asymmetric heads, link-prediction losses, or post-hoc graph reasoning. [interpretation] A causal geometry would encode the second directly and treat the first as secondary, if it needs it at all.

### How Practitioners Already Reason About Causal Systems

Look at the fields that work with causal structure every day:

- **Distributed systems** use Lamport's *happens-before* relation (1978) [@lamport1978], a partial order on events defined by message passing and local sequencing. [fact:C9] Vector clocks implement it as a product order. Nobody debugging a distributed computation asks for the cosine similarity between two states. They ask which states can follow which, which messages must arrive first, and which interleavings are forbidden.
- **Version control** organizes history as commit ancestry, a directed acyclic graph (DAG) whose reachability relation *is* the meaning of "contains this change."
- **Build systems and package managers** are dependency DAGs. The central question is always transitive: does changing X affect Y?
- **Provenance systems** track derivation: which inputs could have contributed to this output?
- **Compilers and schedulers** based on the Program Evaluation and Review Technique and Critical Path Method (PERT/CPM) reason about data dependencies and critical paths, preserving prerequisite order while reordering independent tasks freely.

All of these are partial orders that people already handle through causal partitions rather than metric neighborhoods. The light cone is the continuous, symmetry-rich generalization of the structure these engineers rebuild by hand. [model:C10]

A practical caveat belongs here. When an engineer already has the exact, deterministic DAG in memory, as in a clean Git history or a local Bazel build, nobody should replace fast, exact graph traversal or two-hop cover indices with an approximate embedding where a false negative breaks a build. [normative] Fully observed deterministic graphs are noise-free testbeds for validating the mathematics, not targets for replacing exact algorithms. The production case for learned causal geometry arises when the dependency structure is *partially observed, implicit, or predictive*: inferring missing spans in distributed OpenTelemetry traces, predictive test selection in continuous integration and delivery (CI/CD) before full dependency resolution, premise selection in formal theorem proving, or prerequisite planning for large language model (LLM) agents. [hypothesis:C11]

### Hidden Constraints, Not Large Distances

When one event fails to cause another in a real system, the explanation is rarely "they were too far apart." It is usually that a constraint prevented the transition: a missing resource, a violated invariant, an absent permission, an incompatible mechanism, a conservation law. [interpretation:C12]

The only native way a metric embedding expresses "unrelated" is as "distant." A cone structure expresses it as "outside the admissible region." Those are different explanations, and the second matches how causal systems actually fail.

### Scale-Freedom and Why Curvature Is the Wrong Bias Here

The block below is illustrative text, not code. It lists three causal chains from different domains that share one pattern at scales many orders of magnitude apart.

~~~text
gene -> protein -> cell behavior -> tissue behavior -> organism behavior
developer -> team -> company -> market -> economy
function -> module -> service -> system -> ecosystem
~~~

The same pattern of regulation, feedback, or dependency appears at levels separated by many orders of magnitude. A mechanism does not care how big it is. [interpretation]

A curved embedding space does care. With a built-in radius of curvature, every structure is implicitly placed in a regime: small relative to the curvature scale (where the space looks flat), comparable (where things bend), or large (where exponential growth dominates). The same motif embedded at two different scales sees two different geometries. For a hierarchy of known depth, that can be acceptable or even helpful. For a scale-free causal system it is a mis-specified prior. [hypothesis:C13]

The signed flat space $\mathbb{R}^{p,q}$ has no curvature and therefore no preferred scale, yet it still provides the cone partition. [derived:C14] It offers the property hierarchy-minded hyperbolic work wants, an asymmetric containment structure, without the property scale-free data does not want.

---

## V. Why the Physical Signature Is Irrelevant

### Two Physics Questions, Neither Relevant Here

Physical spacetime appears to have signature $(3,1)$. Two separate questions are bundled in that fact:

- *Why three spatial dimensions?* Proposed answers involve stability of orbits and atoms, the behavior of wave propagation, knot theory, anthropic selection, and string compactification.
- *Why one time dimension?* The answers here are of a different kind entirely: well-posedness of the initial value problem, predictability, the existence of a consistent causal order, and the stability of physical fields.

These questions have *completely different answers*, and neither answer has anything to do with representation learning. An embedding space is not subject to the dynamical, stability, or anthropic constraints that select $(3,1)$ in nature. [interpretation] When ML papers say "Minkowski space" and then quietly think in terms of "space" and "time," they inherit an interpretation they have no reason to want.

What embeddings need is the *mechanism*: positive sectors, negative sectors, and the null boundaries between them. The numbers three and one have no special status. The design parameter is $(p,q)$.

### What Changes Beyond Lorentzian Signature

This is where a physicist has to be careful, because taking the generalization naively breaks things.

*With $q \ge 2$, the timelike region no longer gives a causal order by itself.* In Lorentzian signature, the timelike set splits into two components (future and past), and each is convex. In signature $(p,q)$ with $q \ge 2$ and $p \ge 1$, the set $\{\mathbf{v} : Q(\mathbf{v}) < 0\}$ is *connected*, so there is no global future/past split. It is also *not convex*: you can add two timelike vectors and get a spacelike one. The transitivity argument from Section II fails. A single $(p,q)$ form with $q \ge 2$ does not, on its own, define a reachability order. [derived:C15]

This is not a dead end. It is a sign that the design space has more structure than "pick two numbers." Several constructions recover an order:

- **Convex subcones.** Inside a higher-$q$ space, choose a convex cone compatible with $Q$ (for example, one cut out by several linear time functions) and use it as the order cone.
- **Products of Lorentzian blocks.** Take $\mathbb{R}^{n_1,1} \oplus \mathbb{R}^{n_2,1}$ and define $\mathbf{x} \preceq \mathbf{y}$ iff $\mathbf{y} - \mathbf{x}$ lies in the future cone of *both* blocks: $C = \overline{C_1^+} \times \overline{C_2^+}$. The intersection of convex cones is a convex cone, so this is a genuine partial order. [derived:C16] Each block is a separate *constraint family*, and reachability requires satisfying all of them. A transition can be admissible with respect to resources but forbidden with respect to permissions. Note the distinction from a single form: $Q_1(\mathbf{v}_1) \le 0$ and $Q_2(\mathbf{v}_2) \le 0$ together imply $Q_1(\mathbf{v}_1) + Q_2(\mathbf{v}_2) \le 0$ but not the converse, and the symmetry group shrinks from $O(n_1+n_2, 2)$ to $O^+(n_1,1) \times O^+(n_2,1)$. [derived] Strictly speaking, this construction abandons the single total quadratic form $Q = Q_1 + Q_2$ in favor of a product of $(n_i,1)$ Lorentzian spaces.
- **Weighted block intersections.** The signature $(p,q)$ is a discrete invariant under Sylvester's law, so attempting to learn eigenvalue signs dynamically through zero creates degenerate gradients and dead dimensions. A better mechanism fixes an explicit architecture of $k$ Lorentzian blocks $\mathbb{R}^{n,1}$ and learns the projection into those blocks, using a smooth soft-min (such as LogSumExp annealing) across block constraints during early training so the intersection of $k$ cones does not starve the model of gradients at initialization. [hypothesis:C17]

The block construction makes the earlier intuition precise. A causal system with several independent kinds of constraint (resource, informational, dependency, authority) has no reason to collapse them into a single "time" direction. A single $(n,1)$ cone forces a scalar notion of "later." A product of Lorentzian cones allows several, which is a much better fit for systems where something can be "ahead" in one respect and "behind" in another. [interpretation:C18]

### Neutral Signature

The neutral signature $(2,2)$ shows how qualitatively different these spaces are. Its null set

$$
a_1^2 + a_2^2 - b_1^2 - b_2^2 = 0
$$

is not a pair of cones over a sphere, as in Lorentzian signature. It is a cone over a torus $S^1 \times S^1$. [derived] The symmetry group $SO(2,2)$ is locally isomorphic to $SL(2,\mathbb{R}) \times SL(2,\mathbb{R})$, so it factorizes into two independent pieces. [fact] The form itself can be rewritten, up to a change of coordinates, as the determinant of a $2 \times 2$ real matrix, so its null vectors are rank-one matrices. [derived] That is a natural algebraic home for *factorized* relationships.

At this point "time" is plainly the wrong word. What $(2,2)$ describes is interacting pairs of constraint directions with a large, structured family of boundary configurations. Whether that is useful for a given dataset is an empirical question that I did not find asked in the literature. [guess]

### Capacity: Order Dimension

There is one more physics-to-combinatorics link that matters for practitioners, and it exposes an algebraic trap. In $1+1$ dimensions, light-cone coordinates $u = t + s$ and $w = t - s$ map the Lorentzian future cone isomorphically to the positive quadrant, so the causal order is *exactly* the product order on $\mathbb{R}^2$: $\mathbf{x} \preceq \mathbf{y}$ iff $u_x \le u_y$ and $w_x \le w_y$. [derived] So $\mathbb{R}^{1,1}$ represents precisely the posets of order dimension at most two, in the Dushnik-Miller sense [@dushnik1941]. [derived:C19]

Consequently, a product of $k$ two-dimensional Lorentzian cones ($\bigoplus_{i=1}^k \mathbb{R}^{1,1}$) is mathematically identical to the product order on $\mathbb{R}^{2k}$. That is simply the axis-aligned order embedding of Vendrov et al. [@vendrov2016], or a $2k$-dimensional vector clock. [derived:C20] The genuine geometric novelty of Lorentzian cones is what the combinatorics literature calls "sphere orders" or "circle orders," which possess continuous $SO(n)$ rotational symmetry in their spatial cross-sections and infinitely many extreme rays. That novelty only emerges when the spatial dimension of a block is $n \ge 2$. [derived:C21] Any test of non-polyhedral Lorentzian structure must therefore use blocks of size at least $\mathbb{R}^{2,1}$.

So the choice of $(p,q)$ and of cone construction is a real capacity question: which partial orders can be embedded faithfully, and in how many dimensions? This is a theoretical lever for choosing signatures, and the embedding literature has mostly left it unused. [guess]

### Hidden Sectors and Discrete Gates

Physics offers one more idea: dimensions that exist but are not directly observed. Kaluza-Klein theory and its descendants use compact directions whose geometry shapes what happens in the visible dimensions. [fact]

For causal embeddings, the analogue is *latent sectors that govern admissibility without appearing in the observed similarity structure*: mechanism class, hidden context, conservation laws, resource budgets. [model] Two events can look identical in every observed coordinate yet differ in a hidden sector that determines whether one can reach the other. This captures, geometrically, the common situation in which a transition is blocked by something you were not measuring.

One sharp edge here is that literally adding a continuous compact manifold like $S^1$ creates severe problems. A compact timelike dimension introduces closed timelike curves, immediately destroying antisymmetry and the partial order. [derived:C22] A compact spacelike dimension of radius $R$ breaks scale invariance and washes out constraints over long intervals ($\Delta t > \pi R$), because paths wrap around the cylinder. [derived:C23] It also creates phase-wrapping local minima under gradient descent. Rather than continuous $S^1$ manifolds, hidden admissibility constraints such as discrete permissions, types, or conservation sectors are better modeled as *discrete fiber bundles or categorical Gumbel-Softmax gates* paired with the scale-free non-compact cone structure. [hypothesis:C24]

---

## VI. What the Field Has Actually Done

Machine learning has not ignored these ideas. The useful question is how far it has gone, and in which direction. Roughly, the territory has four layers, explored to decreasing degrees.

**Layer 1: hyperbolic and Lorentzian geometry for hierarchy (well explored).** Poincare embeddings [@nickel2017] and their Lorentz-model successors made hyperbolic space standard for tree-like data. [fact] Lorentzian signature appears here mainly as an implementation detail of the hyperboloid model. The motivating story is volume growth, not causality.

**Layer 2: explicit partial-order embeddings (moderately explored).** *Order embeddings* (Vendrov et al., 2016) [@vendrov2016] encode entailment as the reverse product order on the positive orthant. *Hyperbolic entailment cones* (Ganea et al., 2018) [@ganea2018] attach cones to points in hyperbolic space. *Box embeddings* [@vilnis2018] represent concepts as axis-aligned boxes whose containment is the order. [fact] These are genuine order-first methods and deserve credit. Their cones, however, are axis-aligned (order and box embeddings) or tied to curved geometry (entailment cones). None treats the Lorentz-invariant cone of a flat signed space as the primitive. [guess:C25]

**Layer 3: spacetime causal structure for directed graphs (uncommon).** *Spacetime Representation Learning* (Law and Lucas, ICLR 2023) [@law2023] represents directed graphs as events in a spacetime and uses the causal ordering of events to represent edge direction. [fact] This is a real conceptual step: it says directed relations can live in causal structure, not merely that trees fit curved space. *Neural Spacetimes for DAG Representation Learning* (Borde et al., 2024) [@borde2024] goes further, combining a quasi-metric spatial component with a partial-order temporal component. [fact] The authors note explicitly that prior work tends to encode graph geometry and causality separately and set out to encode both together. [secondhand]

**Layer 4: signature as a design space (sparse, and still tied to curvature).** Some work does go beyond $(n,1)$. *Ultrahyperbolic Representation Learning* (Law and Stam, NeurIPS 2020) [@law2020] and pseudo-Riemannian graph networks (Xiong et al., NeurIPS 2022) [@xiong2022] use pseudo-hyperboloids of general signature, and older work on pseudo-Euclidean and Krein-space embeddings handles non-metric similarity data. [fact] These are real contributions. What stands out is their framing: general signature is used mainly to give curved manifolds more flexibility (fitting hierarchies and cycles together, absorbing negative eigenvalues of a similarity matrix). It is not used as a scale-free source of reachability classes. Curvature is still the main structure, and signature is still in a supporting role. [interpretation]

I found no work that brings these together, though my search was informal and not systematic. [guess:C26] The missing combination has four parts:

- **flat** signed spaces, chosen precisely *because* they have no curvature scale;
- the **cone order** as the primary representational object, with reachability as the training signal;
- **null structure** used deliberately as the home for boundary cases;
- **hidden sectors** as carriers of admissibility.

There are also scattered recent preprints arguing that semantic hierarchy can be encoded in Minkowski causal relations, and proposing retrieval governed by causal accessibility rather than proximity. [secondhand:C27] Their claims are not yet established, but the direction (replacing similarity search with accessibility search) points to the transition this essay argues for.

The overall picture is that the field's center of gravity is still "Lorentzian spaces are good for hierarchies." The stronger hypothesis, that a large class of meaningful data is organized by reachability rather than resemblance, sits on the fringe. [interpretation] The strongest version, that indefinite signature supplies scale-free classification structure more basic than curvature, is almost unexplored in ML. [guess:C28] It is familiar ground for causal set theorists, Lorentzian geometers, conformal and twistor geometers, and order theorists. Those communities have thought in terms of null structure and reachability classes for decades. [interpretation]

---

## VII. Why the Gap Exists

It would be easy to explain this gap as a matter of who works in the field, and that explanation would be lazy. The structural reasons are more instructive.

**Incentives reward benchmarks over unification.** A paper that shows hyperbolic space improves link prediction on WordNet gets published. A paper that classifies which invariant structures survive under which geometric constraints, and predicts which data each suits, is harder to evaluate and harder to fit into a results table. [interpretation:C29]

**The entry point shaped the framing.** ML met spacetime geometry through the problem that "trees are hard to embed in Euclidean space." Starting there, Lorentzian geometry looks like a tool for hierarchy, and its cones look like an implementation detail. Starting from physics instead, the cone *is* the geometry, and hierarchy is one consequence among many. [interpretation]

**Mathematical timescales differ.** Hyperbolic geometry dates from the 19th century. Lorentzian geometry, conformal geometry, and the relevant causal-structure theorems date from the 20th century, the decisive results only from the 1970s and 1980s. [fact] By mathematical standards, a century is recent. Ideas of that age are still being absorbed even within mathematics, and ML usually adopts them one benchmark-sized piece at a time. [interpretation]

The typical paper asks, "How can embeddings use spacetime ideas?" The better question is, "What does signature buy an embedding, independent of spacetime?" [normative]

---

## VIII. A Research Program

Here is what it would take to test the thesis rather than just argue for it.

### Formalize

1. **Representation theorems.** For each cone construction (single Lorentzian cone, product of $k$ Lorentzian blocks, polyhedral subcones of $\mathbb{R}^{p,q}$), characterize which finite posets embed faithfully and in what minimum dimension. Relate this to order dimension and known results on sphere orders.
2. **Invariance accounting.** For each candidate geometry, state precisely which transformations preserve the order: translations, dilations, the relevant indefinite orthogonal group, and conformal maps. Make "scale-free" a checkable property.
3. **Separating examples.** Construct families of DAGs, especially self-similar and multi-scale ones, on which curved embeddings provably need distortion that grows with scale range while flat cone embeddings do not. [conjecture:C30]
4. **Signature selection.** Treat block-Lorentzian $(n_i,1)$ products and cone constructions (with $n_i \ge 2$) as an inductive-bias choice selected by the data's constraint structure. Develop diagnostics that estimate the number of independent constraint families $k$ from data before training. One example is lower bounds on the order dimension of sampled subposets; exact computation is NP-hard beyond dimension two [@yannakakis1982], but crowns and standard examples give cheap certificates. [fact:C31]

### Compare Signatures Directly

Hold the total ambient dimension $D$ fixed, choosing $D \ge 6$ so that multi-block Lorentzian spaces have spatial dimension $n_i \ge 2$ per block and do not collapse into axis-aligned order embeddings, and vary only the structure:

Table 1: Candidate geometries for a fixed-dimension comparison.

| Geometry | Order mechanism | Intrinsic scale |
|---|---|---|
| Euclidean $\mathbb{R}^D$ + asymmetric head | learned | none, but needs a threshold |
| Hyperbolic $\mathbb{H}^D$ + entailment cones | cones in curved space | curvature radius |
| Order / box embeddings | axis-aligned product order | none |
| Flat Lorentzian $\mathbb{R}^{5,1}$ | single convex light cone (sphere order) | none |
| Product $\mathbb{R}^{2,1} \oplus \mathbb{R}^{2,1}$ | intersection of non-polyhedral cones | none |
| Neutral $\mathbb{R}^{3,3}$ with chosen subcone | constructed convex cone | none |
| Any of the above + discrete fiber / gate | as above, gated by categorical sector | none |

Comparing $\mathbb{R}^{5,1}$ with $\mathbb{R}^{2,1} \oplus \mathbb{R}^{2,1}$ at fixed dimension six (alongside the product order on $\mathbb{R}^6$) is designed to isolate two questions: whether continuous sphere orders beat axis-aligned orthants, and whether multiple independent constraint families help.

### Choose Data Where Reachability Is the Ground Truth

Benchmarks should avoid graphs dominated by topical homophily (like citation networks) or homeostatic feedback loops (like cyclic gene regulatory networks, which violate partial-order antisymmetry). [normative:C32] Instead, evaluation should center on high-signal causal and dependency structures:

- **Synthetic multi-scale Kronecker and fractal posets:** train hyperbolic entailment cones ($\mathbb{H}^D$) and flat Lorentzian cones ($\mathbb{R}^{n,1}$) on hierarchy depths $1, \dots, L-1$ and test zero-shot scale transfer at depth $L+2$, testing whether curved spaces fail outside their radius of curvature $\ell$ while flat cones generalize.
- **PERT/CPM scheduling and compiler DAGs:** graphs where ground-truth slack (float) time is known exactly, providing a direct test for null-boundary calibration.
- **Premise selection (Lean/Coq) and predictive test selection (CI/CD):** software, build, and formal-proof dependency graphs evaluated under *partial observability* (for example, training on 70% of edges or on incomplete distributed OpenTelemetry trace spans and predicting transitive reachability on the held-out 30%).
- **Version-control and data provenance DAGs:** exact ancestry structures used as noise-free ground truth for capacity and distortion stress tests.

### Measure Reachability, Not Proximity

- **Transitive-closure precision and recall:** does $\mathbf{x} \preceq \mathbf{y}$ in the embedding match reachability in the graph, including pairs never seen in training?
- **Scale transfer:** train on motifs at one scale and test at another.
- **Antichain fidelity:** quantify native sparsity (Section II) by reporting the false positive rate at the $k$ closest Euclidean-coordinate neighbors, written $\text{FPR}@k_{\text{coord}}$. This measures how accurately the cone order excludes causally incomparable sibling nodes that sit immediately adjacent to the query in ambient coordinate space.
- **Boundary calibration:** in PERT/CPM scheduling DAGs, measure Spearman's rank correlation $\rho$ between $|Q(\mathbf{y}-\mathbf{x})|$ and ground-truth slack time. Showing that zero-slack critical paths cluster on the null boundary ($Q(\mathbf{y}-\mathbf{x}) = 0$) directly tests the physics thesis. [hypothesis:C6]
- **Constraint disentanglement:** in multi-block $\bigoplus_{i=1}^k \mathbb{R}^{n_i,1}$ models, test whether individual blocks align with distinct ground-truth constraint families (such as resource versus permission dependencies).

### Retrieval by Accessibility

Finally, build the operation the whole argument points toward: a retrieval primitive that returns *the future cone of a query*, or its past cone, or its null boundary, instead of its $k$ nearest neighbors.

This requires solving a real systems bottleneck. Standard sub-linear vector indices (HNSW graphs, inverted-file partitions, and similar) are tuned for metric proximity or inner-product ranking, and they prune on that basis. [interpretation] Indefinite quadratic forms violate metric proximity: points arbitrarily far apart in Euclidean coordinates lie inside the future cone, while points infinitesimally close to the query sit outside it (spacelike separated). Furthermore, unlike $k$-NN, a raw future-cone query is an unbounded semi-algebraic range query that could return most of the database (such as the future cone of a root commit).

I propose three engineering choices to make accessibility search practical. [hypothesis:C33]

1. **Sub-linear indexing via maximum inner product search (MIPS) lifting or two-stage filtering.** Rather than a linear scan over all items testing $Q(\mathbf{y}-\mathbf{x}) \le 0$, cone membership can be lifted into $(D+2)$-dimensional vectors $\phi(\mathbf{x})$ and $\psi(\mathbf{y})$ so that it becomes an asymmetric MIPS threshold $\langle \phi(\mathbf{x}), \psi(\mathbf{y}) \rangle \ge 0$, accelerated by FAISS and filtered by $t_y \ge t_x$. The lift is given below. Alternatively, a standard vector database can index the timelike coordinate $t$ as a scalar payload filter ($t_y > t_x$) paired with bounded Euclidean ball queries (radius $T_{\max}$ in the spatial coordinates), followed by an exact cone check.
2. **Bounded sub-query ranking modes.** To prevent unbounded transitive-closure blowup, the retrieval API should expose three structured queries:
    - `cone_nearest(x, k)`: minimizes $\Delta t > 0$ inside the cone to retrieve immediate next-hop dependencies (an approximate transitive reduction);
    - `cone_critical(x, eps)`: retrieves boundary transitions with $|Q(\mathbf{y}-\mathbf{x})| < \varepsilon$ to surface zero-slack critical paths and tight bottlenecks;
    - `cone_interior(x, k)`: maximizes proper time $\tau = \sqrt{-Q(\mathbf{y}-\mathbf{x})}$ within a bounded horizon $T_{\max}$ to find the most robust downstream impacts.
3. **Hybrid "foliated" retrieval for retrieval-augmented generation (RAG) and agents.** Practical systems such as LLM agent planning and code retrieval care about both prerequisites and semantic similarity. A foliated architecture uses both geometries: the Lorentzian cone order acts as a hard causal filter ($A \to B$), while the spatial Euclidean norm on spacelike antichains ranks semantic resemblance ($A \sim B$).

Write each event as $\mathbf{x} = (t_x, \mathbf{s}_x)$, with time coordinate $t_x$ and spatial part $\mathbf{s}_x$. The lift in item 1 is the polarization identity for $Q$:

$$
Q(\mathbf{y} - \mathbf{x}) = Q(\mathbf{y}) - 2\,\mathbf{x}^\top G \mathbf{y} + Q(\mathbf{x}),
$$

so with

$$
\phi(\mathbf{x}) = \big(2G\mathbf{x},\; -Q(\mathbf{x}),\; -1\big), \qquad \psi(\mathbf{y}) = \big(\mathbf{y},\; 1,\; Q(\mathbf{y})\big) \in \mathbb{R}^{D+2},
$$

one has $\langle \phi(\mathbf{x}), \psi(\mathbf{y})\rangle = -Q(\mathbf{y}-\mathbf{x})$ exactly. [derived:C34]

The condition $\langle\phi(\mathbf{x}),\psi(\mathbf{y})\rangle \ge 0$ selects the closed *double* cone, both future and past. The time-orientation filter $t_y \ge t_x$ is therefore not optional. [derived]

Three practical notes follow:

- **Thresholds versus top-$k$.** MIPS libraries answer top-$k$ queries, not thresholds. A cone query is therefore run as a top-$k$ search with geometrically increasing $k$, stopping once the $k$-th score falls below zero.
- **Norm equalization.** The sign of the score does not depend on $\|\psi(\mathbf{y})\|$, but approximate-search ranking does. Apply the standard norm-equalizing augmentation for asymmetric MIPS before indexing, so the index does not favor high-norm entries.
- **Product cones need one lift per block.** For $\bigoplus_{i=1}^k \mathbb{R}^{n_i,1}$, membership is a *conjunction* of $k$ sign conditions, and a single inner product does not express a conjunction: the summed score is implied by the conjunction but does not imply it (Section V). [derived] Lift each block separately into its own $(n_i+3)$-dimensional index, query the most selective block first (typically the one with the narrowest aperture around the query), and verify the remaining $k-1$ conditions exactly on the candidates. This is the same plan a relational engine uses for a multi-predicate range query: one index-driven predicate, the rest as residual filters.

---

## IX. Caveats and the Optimization Paradox

A physicist should end with error bars.

### Caveats

- **Not all data is causal.** For pure resemblance tasks, such as finding near-duplicate images or paraphrases, metric embeddings are the right tool and signature adds nothing. [interpretation] The claim here is about a specific and important class of data, not all of it.
- **Higher $q$ is not automatically better.** Adding timelike directions destroys the naive order. [derived:C15] Every move beyond Lorentzian signature has to come with an explicit cone construction. Without one, the result is a space with no causal structure at all.
- **Cone orders are rigid.** A convex cone order is transitive and antisymmetric by construction. Real data has noise, missing edges, and spurious ones. A single false-positive edge that creates a cycle forces an exact cone order to collapse the entire strongly connected component to a point. [derived:C35] Angular softening around the cone boundary and soft-min annealing across product cones are essential to keep noisy edges from warping the global geometry. [hypothesis]
- **Continuous compact sectors reintroduce scale and closed loops.** Continuous $S^1$ sectors either break causality (if timelike) or break scale invariance and suffer from phase-wrapping (if spacelike). Discrete categorical fibers or gates are the cleaner mechanism. [hypothesis:C24]

### The Scale-Free Softening Paradox

This is the sharpest technical hurdle in the proposal. At test time, the sign of $Q(\mathbf{y}-\mathbf{x})$ is projective and scale-invariant, because $Q(\lambda \mathbf{v}) = \lambda^2 Q(\mathbf{v})$, which gives a threshold-free binary decision boundary. [derived:C3] However, binary step functions have zero gradients almost everywhere, and training with stochastic gradient descent requires a smooth surrogate loss.

Introducing a standard hinge margin $\max(0, Q(\mathbf{y}-\mathbf{x}) + m)$ with $m > 0$, a sigmoid temperature $\sigma(-\beta Q(\mathbf{y}-\mathbf{x}))$, or $L_2$ weight decay immediately breaks scale invariance and sneaks a characteristic ruler back into the optimization landscape. [derived:C36] Setting $m = 0$ avoids the ruler but permits trivial collapse $\mathbf{x} \to \mathbf{0}$ or runaway explosion along null rays.

To preserve the no-ruler thesis during training, the loss must be invariant under $\mathbf{v} \mapsto \lambda \mathbf{v}$ for $\mathbf{v} = \mathbf{y} - \mathbf{x}$. [derived] That means formulating it on a homogeneous degree-zero ratio. Two examples are the causal cosine $\mathcal{S}$ and the cone aperture ratio $\theta$:

$$
\mathcal{S}(\mathbf{x}, \mathbf{y}) = \frac{Q(\mathbf{y}-\mathbf{x})}{\|\mathbf{y}-\mathbf{x}\|_E^2} \in [-1, 1],
$$

$$
\theta(\mathbf{x},\mathbf{y}) = \frac{\|\Delta\mathbf{s}\|_2}{\Delta t + \varepsilon}, \qquad \Delta t = t_y - t_x, \quad \Delta\mathbf{s} = \mathbf{s}_y - \mathbf{s}_x.
$$

Both are invariant under rescaling, apart from the $\varepsilon$ guard in $\theta$, which breaks exact homogeneity and should be treated as a numerical safeguard rather than a modeling parameter. Applying a dimensionless angular margin $\delta$ around the null boundary ($\mathcal{S} = 0$ or $\theta = 1$) provides smooth gradients while keeping the objective strictly invariant under rescaling. [hypothesis:C37]

To prevent coordinates from drifting to infinity along null directions without adding a scale-breaking $L_2$ penalty, embeddings could be mapped into a bounded Penrose-style conformal diamond, since that map is conformal and so preserves causal and null structure. [hypothesis:C38]

---

## Conclusion

Machine learning borrowed Lorentzian geometry because trees look good in it. That was a reasonable thing to borrow, but it was the wrong lesson. What spacetime is exceptionally good at is not hierarchy. It is representing an enormous, scale-free set of states together with an invariant classification of which transitions are *allowed*, *forbidden*, or *borderline*, without ever choosing a ruler. [interpretation:C39]

That is close to a textbook description of causal data.

Stated without physics, the reusable idea is this:

1. A signed quadratic form partitions displacements into invariant classes.
2. The partition is exactly scale-free.
3. Null boundaries are intrinsically meaningful.
4. With a convex cone, whether a single Lorentzian cone or an intersection of several, the partition becomes a reachability order.
5. None of this requires a single distinguished "time" direction, and none of it requires curvature.

Once stated this way, the spacetime analogy becomes almost incidental. Physics' $(3,1)$ is one highly successful member of a large family. It is not a template. The open territory is the whole family: $(p,q)$ signatures, product and polyhedral cone constructions, learned constraint splittings, and hidden admissibility sectors, all evaluated on data where reachability is the ground truth.

The proposal is to move from

$$
\text{meaning} \approx \text{distance}
$$

to

$$
\text{meaning} \approx \text{position within a reachability structure}.
$$

Mathematics has had the tools for this for about a century. Relative to that history, the embedding literature has explored very little of what is available. [guess:C40]

---

## Limits

This essay could be wrong in several places. The survey in Section VI rests on an informal search, so the claimed gap may simply reflect work I did not find. Every claim tagged `hypothesis` or `conjecture` is untested here, and the central empirical bet, that flat cone embeddings transfer across scales where curved ones do not, could fail for reasons that have nothing to do with signature, such as optimization difficulty or noise in real graphs. A rival account is that hyperbolic entailment cones, box embeddings, or well-tuned asymmetric heads already capture most of the available benefit, and that the gain from Lorentz-invariant cones is small once models are trained on noisy data. Another is that exact graph indices (two-hop cover labeling, transitive-closure compression) leave little room for an approximate geometric index except under partial observation. The Penrose-diamond proposal has not been checked against the angular-ratio loss, and the compactifying map does not commute with dilations of the original coordinates, so scale invariance may survive only approximately. Finally, the optimization paradox is stated, not resolved: a loss that is exactly scale-invariant may still be hard to train.

---

## Claim Ledger

| ID | Claim | Status | Basis | Check |
|---|---|---|---|---|
| C1 | Machine learning has borrowed indefinite signature only narrowly and mostly as scaffolding for curvature | interpretation | Reading of the literature in Section VI | Survey ML uses of pseudo-Riemannian geometry and classify their stated motivations |
| C2 | Signature entered ML as a computational convenience for implementing hyperbolic curvature, not as an object in its own right | interpretation | Use of the hyperboloid model in hyperbolic embedding papers | Check stated motivations in Lorentz-model papers |
| C3 | The sign of Q applied to a displacement is exactly invariant under positive rescaling | derived | Q(lambda v) = lambda^2 Q(v) | Direct algebra |
| C4 | The closed future cone of a Lorentzian form defines a partial order on points | derived | Convex cone containing no line gives reflexivity, transitivity, antisymmetry | Verify the three properties |
| C5 | Coordinate proximity and causal accessibility can come apart | derived | Spacelike pairs can be close; timelike pairs can be far | Exhibit explicit point pairs |
| C6 | Tight or saturated transitions concentrate on the null cone | hypothesis; untested | Null cone is the symmetry-preserved limit of reachability | Boundary-calibration test on PERT/CPM DAGs (Section VIII) |
| C7 | For well-behaved spacetimes the causal relation determines topology and conformal geometry | fact | [@hawking1976] [@malament1977] | Read the theorems and their regularity conditions |
| C8 | Data fundamentally about reachability should be represented with reachability as the primitive | normative | Physics precedent (Section III) | Compare against metric-first baselines on reachability tasks |
| C9 | Happens-before is a partial order on events in a distributed system | fact | [@lamport1978] | Read the paper |
| C10 | The light cone generalizes dependency structures that engineers rebuild by hand | model; lens, not literal | Analogy across Section IV examples | Test whether cone embeddings recover real DAG reachability |
| C11 | Learned causal geometry pays off mainly when dependency structure is partially observed, implicit, or predictive | hypothesis; untested | Exact traversal beats approximation on fully observed DAGs | Held-out-edge reachability experiments |
| C12 | Causal failures in real systems are usually blocked by constraints, not by large distance | interpretation | Examples: missing resource, permission, invariant | Audit failure causes in real traces |
| C13 | A built-in curvature scale is a mis-specified prior for scale-free causal systems | hypothesis; untested | Same motif sees different regimes at different scales | Zero-shot scale-transfer experiment |
| C14 | A flat signed space has a cone partition and no preferred scale | derived | Flatness and homogeneity of Q | Direct algebra |
| C15 | With q at least 2, a single (p,q) form does not by itself define a reachability order | derived | Timelike set is connected and not convex | Exhibit two timelike vectors with a spacelike sum |
| C16 | A product of Lorentzian future cones defines a partial order | derived | Product of convex cones containing no line is such a cone | Verify the three order properties |
| C17 | Fixed Lorentzian blocks with annealed soft-min avoid dead dimensions better than learning signature signs | hypothesis; untested | Signature is a discrete invariant and gradients degenerate at zero | Ablation across training schemes |
| C18 | Systems with several independent constraint kinds fit product cones better than a single time direction | interpretation | Multi-constraint reasoning in Section V | Constraint-disentanglement test (Section VIII) |
| C19 | The causal order of R^{1,1} is the product order on R^2, so it represents exactly posets of order dimension at most two | derived | Light-cone coordinates [@dushnik1941] | Direct algebra |
| C20 | A product of k copies of R^{1,1} equals the product order on R^{2k}, an axis-aligned order embedding | derived | Light-cone coordinates in each block [@vendrov2016] | Direct algebra |
| C21 | Non-polyhedral cone structure requires blocks with spatial dimension at least two | derived | The R^{1,1} cone has two extreme rays; higher n gives infinitely many | Count extreme rays |
| C22 | A compact timelike dimension creates closed timelike curves and destroys antisymmetry | derived | Closed timelike curves imply x precedes y and y precedes x | Direct construction |
| C23 | A compact spacelike dimension of radius R breaks scale invariance and makes constraints vacuous beyond Delta t of pi R | derived | Wrapped paths on the cylinder | Direct construction |
| C24 | Discrete fibers or categorical gates model hidden admissibility sectors better than continuous compact dimensions | hypothesis; untested | Failure modes of compact sectors | Compare gated and compact-sector models |
| C25 | No existing order-embedding method treats the cone of a flat signed space as the primitive | guess; informal search | Survey of Layer 2 methods | Systematic literature search |
| C26 | No prior work combines flat signed spaces, cone orders, null structure, and hidden sectors | guess; informal search | Informal literature search | Systematic literature search |
| C27 | Recent preprints argue hierarchy is encoded by Minkowski causal relations and propose accessibility retrieval | secondhand; not checked | Reported, no source verified | Locate and read the preprints |
| C28 | Indefinite signature as scale-free classification more basic than curvature is almost unexplored in ML | guess | Absence in the surveyed literature | Systematic literature search |
| C29 | Benchmark-oriented incentives explain part of the gap between physics and ML geometry | interpretation | Publication incentives | Survey how geometry papers are evaluated |
| C30 | On self-similar DAGs, curved embeddings need distortion growing with scale range while flat cone embeddings do not | conjecture; no proof yet | Scale argument in Section IV | Construct the separating family and prove bounds |
| C31 | Exact order dimension is NP-hard beyond dimension two, while standard examples give cheap lower bounds | fact | [@yannakakis1982] | Read the paper and the standard-example construction |
| C32 | Benchmarks should avoid homophily-dominated and cyclic graphs | normative | Cyclic graphs violate antisymmetry | Compare benchmark properties against order axioms |
| C33 | MIPS lifting, bounded ranking modes, and foliated retrieval together make accessibility search practical | hypothesis; untested | Systems reasoning in Section VIII | Build and benchmark the index |
| C34 | The proposed lift gives an inner product equal to minus Q(y - x) | derived | Polarization identity | Expand the inner product |
| C35 | An exact cone order collapses a strongly connected component to a point | derived | Antisymmetry of the cone order | Direct argument |
| C36 | Hinge margins, sigmoid temperatures, and weight decay break scale invariance | derived | Each introduces a fixed scale | Direct algebra |
| C37 | A dimensionless angular margin gives smooth gradients while keeping the objective scale-invariant | hypothesis; untested | Degree-zero ratios are invariant | Train and test with rescaled data |
| C38 | A bounded Penrose-style diamond can stop coordinate drift without a scale-breaking penalty | hypothesis; untested | Conformal maps preserve causal structure | Train with and without the compactification |
| C39 | Spacetime's strength for ML is invariant classification of allowed, forbidden, and borderline transitions without a ruler | interpretation | Synthesis of Sections II to V | Evaluate on reachability benchmarks |
| C40 | The embedding literature has explored little of what the available mathematics offers | guess | Informal survey in Section VI | Systematic literature search |

## Appendix A: Symbol Table

Table 2: Symbols used in this essay.

| Symbol | Meaning |
|---|---|
| $\mathbf{x}, \mathbf{y}, \mathbf{v}$ | Points and displacement vectors in a signed space |
| $G$ | Diagonal matrix with $p$ entries $+1$ and $q$ entries $-1$ |
| $Q(\mathbf{x})$ | Quadratic form $\mathbf{x}^\top G \mathbf{x}$; negative means timelike |
| $(p,q)$ | Signature: numbers of positive and negative directions |
| $D$ | Total ambient dimension $p+q$ |
| $n, n_i$ | Spatial dimension of a Lorentzian block $\mathbb{R}^{n,1}$ |
| $k$ | Number of Lorentzian blocks (constraint families) |
| $\overline{C^+}$ | Closed future cone |
| $\preceq$ | Reachability order defined by the cone |
| $\lambda$ | Positive scaling factor |
| $t, \mathbf{s}$ | Time coordinate and spatial part of an event |
| $\Delta t, \Delta\mathbf{s}$ | Differences of time and spatial parts between $\mathbf{y}$ and $\mathbf{x}$ |
| $\tau$ | Proper time $\sqrt{-Q(\mathbf{y}-\mathbf{x})}$ |
| $T_{\max}$ | Bounded retrieval horizon |
| $\phi, \psi$ | Asymmetric lifts for MIPS cone-membership tests |
| $\mathcal{S}$ | Causal cosine, $Q(\mathbf{y}-\mathbf{x})$ divided by squared Euclidean norm |
| $\theta$ | Cone aperture ratio |
| $\varepsilon$ | Small numerical guard or neighborhood radius |
| $\delta$ | Dimensionless angular margin |
| $m, \beta$ | Hinge margin and sigmoid temperature (scale-breaking) |
| $\ell$ | Characteristic length of a hyperbolic space |
| $\rho$ | Spearman rank correlation |
| $L$ | Hierarchy depth in the scale-transfer benchmark |

## References

- [@bombelli1987] Bombelli, Luca, Joohan Lee, David Meyer, and Rafael D. Sorkin. "Space-Time as a Causal Set." *Physical Review Letters* 59(5), 1987.
- [@borde2024] Borde, Haitz Saez de Ocariz, et al. "Neural Spacetimes for DAG Representation Learning." arXiv preprint, 2024.
- [@dushnik1941] Dushnik, Ben, and E. W. Miller. "Partially Ordered Sets." *American Journal of Mathematics* 63(3), 1941.
- [@ganea2018] Ganea, Octavian-Eugen, Gary Becigneul, and Thomas Hofmann. "Hyperbolic Entailment Cones for Learning Hierarchical Embeddings." *International Conference on Machine Learning*, 2018.
- [@hawking1976] Hawking, S. W., A. R. King, and P. J. McCarthy. "A New Topology for Curved Space-Time Which Incorporates the Causal, Differential, and Conformal Structures." *Journal of Mathematical Physics* 17(2), 1976.
- [@lamport1978] Lamport, Leslie. "Time, Clocks, and the Ordering of Events in a Distributed System." *Communications of the ACM* 21(7), 1978.
- [@law2020] Law, Marc T., and Jos Stam. "Ultrahyperbolic Representation Learning." *Advances in Neural Information Processing Systems*, 2020.
- [@law2023] Law, Marc T., and James Lucas. "Spacetime Representation Learning." *International Conference on Learning Representations*, 2023.
- [@malament1977] Malament, David B. "The Class of Continuous Timelike Curves Determines the Topology of Spacetime." *Journal of Mathematical Physics* 18(7), 1977.
- [@nickel2017] Nickel, Maximilian, and Douwe Kiela. "Poincare Embeddings for Learning Hierarchical Representations." *Advances in Neural Information Processing Systems*, 2017.
- [@vendrov2016] Vendrov, Ivan, Ryan Kiros, Sanja Fidler, and Raquel Urtasun. "Order-Embeddings of Images and Language." *International Conference on Learning Representations*, 2016.
- [@vilnis2018] Vilnis, Luke, et al. "Probabilistic Embedding of Knowledge Graphs with Box Lattice Measures." *Annual Meeting of the Association for Computational Linguistics*, 2018.
- [@xiong2022] Xiong, Bo, et al. "Pseudo-Riemannian Graph Convolutional Networks." *Advances in Neural Information Processing Systems*, 2022.
- [@yannakakis1982] Yannakakis, Mihalis. "The Complexity of the Partial Order Dimension Problem." *SIAM Journal on Algebraic and Discrete Methods* 3(3), 1982.

## Changelog

- 2025-01-01: Restructured to the site style guide. Filled in the missing polarization identity in Section VIII, moved two stray bullets into the sections they belong to, and added claim tags, a claim ledger, a symbol table, and references.
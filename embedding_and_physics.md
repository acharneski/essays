# Embeddings from a Physicist

## Signature, Causality, and the Case Against Distance as a Primitive

---

### Prologue: a wrong question asked very precisely

Most embedding methods are built around one question: *how far apart are these two things?* Word vectors, sentence encoders, retrieval indices, graph embeddings, and recommendation towers almost all reduce meaning to proximity. Related things are close. Unrelated things are far. Retrieval means looking up nearest neighbours.

This works well when the relationship you care about is resemblance. A great deal of the data we most want to model is not organized by resemblance, though. It is organized by *influence*: what can cause what, what must happen before what, what depends on what, and what is forbidden from following what. For that kind of data, the right question is not "how far is B from A?" It is "can B be reached from A?"

These are different mathematical objects. Distance is a function to the non-negative reals. Reachability is a relation, specifically a partial order. You can try to recover one from the other, and the field has worked hard at that. But a physicist will notice that a century ago, physics found a geometric structure that gives you the order *first* and the measurement *second*. That structure is the indefinite quadratic form, the *signature* of a space. Machine learning has borrowed it only narrowly and, I will argue, for mostly the wrong reasons.

This essay tries to state the borrowing correctly. The argument has five parts:

1. ML geometry routinely conflates three distinct structures: **metric**, **signature**, and **curvature**.
2. A signed quadratic form provides **scale-free classification** and, under the right conditions, a **reachability order**. Neither depends on choosing a ruler.
3. Causal data is the domain where this is structurally correct rather than merely convenient.
4. Physics' particular choice of $(3,1)$ is irrelevant to embeddings. The real design space is $(p,q)$, and it is richer than the literature has explored, though it also has some sharp edges.
5. This suggests a concrete research program that replaces nearest-neighbour semantics with reachability semantics.

---

## 1. Three structures that are not the same thing

A great deal of the confusion in "geometric deep learning for embeddings" goes away once we separate three structures that are often treated as interchangeable settings.

### Metric: measurement

A metric $d(x,y)$ assigns a non-negative number to every pair of points. It is symmetric, $d(x,y) = d(y,x)$, and it satisfies the triangle inequality. It answers "how much?" questions.

Symmetry is the first warning sign for causal data. If $A$ causes $B$, it is generally false that $B$ causes $A$. A symmetric function cannot represent an asymmetric relation without extra machinery added on top, such as a separate direction vector, an asymmetric scoring head, or a norm-based ordering trick.

### Signature: classification

A quadratic form

$$
Q(x) = x^\top G x, \qquad G = \mathrm{diag}(\underbrace{+1,\dots,+1}_{p}, \underbrace{-1,\dots,-1}_{q})
$$

does not measure in the same sense. Its most important output is a **sign**:

$$
Q(x) > 0, \qquad Q(x) = 0, \qquad Q(x) < 0.
$$

Every displacement vector falls into exactly one of three classes: in physics language, spacelike, null, or timelike. The pair $(p,q)$ is the *signature*. Sylvester's law of inertia guarantees that it is an invariant: no linear change of basis can turn a positive direction into a negative one.

### Curvature: an intrinsic scale

Curvature $R \neq 0$ introduces a length scale into the geometry itself. A sphere of radius $r$ has curvature $1/r^2$. A hyperbolic space of curvature $-1/k^2$ has a characteristic length $k$. Below that scale the space looks flat. Above it, the exponential growth of volume (in the hyperbolic case) takes over.

Curvature is what makes hyperbolic embeddings good at trees: volume grows exponentially with radius, just as the number of nodes does in a branching hierarchy. It also means **the geometry contains information that the data did not put there**: a preferred radius against which every structure is implicitly compared.

### Why the distinction matters

The ML literature's path into these ideas has mostly run through hyperbolic space, and the hyperboloid model of hyperbolic space is built *inside* a Lorentzian space. So signature arrived as a computational convenience for implementing curvature. It was not treated as an object in its own right. The Lorentzian form became scaffolding, and the cone structure it carries was largely ignored.

The point of this essay is that the scaffolding is the interesting part.

---

## 2. What a signed form actually buys you

### 2.1 Classification without a threshold

Consider how a Euclidean embedding decides that two items are "related." It needs a threshold: an $\varepsilon$-ball, a $k$ in $k$-nearest-neighbours, or a cosine cutoff. Flat Euclidean space is scale-covariant, since dilating everything preserves the *ranking* of distances. But any binary decision about relatedness requires picking a number, and that number is a ruler imposed from outside.

A signed form needs no such number. Under dilation,

$$
Q(\lambda x) = \lambda^2 Q(x), \qquad \lambda > 0,
$$

so the **sign of $Q$ is exactly invariant under rescaling**. Whether a displacement is timelike, null, or spacelike does not depend on how large it is. A relationship spanning a millimetre and one spanning a light-year are classified by the same rule.

This is the precise sense in which signature is *scale-free*. Flat Euclidean space is scale-free too, but it has nothing to classify with except magnitude, and magnitude needs a threshold. Signature provides a qualitative partition, and that partition is preserved under every rescaling.

### 2.2 From classification to order

In Lorentzian signature $(n,1)$, the timelike vectors $\{v : Q(v) < 0\}$ form two disjoint solid cones, a future cone and a past cone. Choose one as "future" (a *time orientation*) and define

$$
x \preceq y \iff y - x \in \overline{C^+},
$$

where $\overline{C^+}$ is the closed future cone. Because $\overline{C^+}$ is a **convex cone**, closed under addition and positive scaling and containing no line, this relation is:

- **reflexive**: $0 \in \overline{C^+}$;
- **transitive**: if $y - x \in \overline{C^+}$ and $z - y \in \overline{C^+}$, then $z - x$ is their sum and therefore also in the cone;
- **antisymmetric**: the cone contains no nonzero vector together with its negative.

That is a partial order, which is the mathematical structure of reachability. It arrives with the geometry rather than being trained on afterward, and it inherits the scale invariance above. It is also invariant under translations and under the Lorentz group, the linear maps that preserve $Q$.

Two features deserve emphasis.

**Asymmetry is native.** $x \preceq y$ and $y \preceq x$ together force $x = y$. Direction is not a feature attached to a symmetric similarity. It is part of the geometry.

**Sparsity is native.** Given a point $x$, the set of points it can reach is not "everything nearby." It is the specific region $x + \overline{C^+}$. Two points can be arbitrarily close in coordinates and still be causally unrelated (spacelike separated). Two points can be enormously far apart in coordinates and still be causally related. Proximity and accessibility come apart, which is exactly the decoupling causal data needs.

### 2.3 The boundary is meaningful

The null cone $Q(v) = 0$ is not just the edge between two classes. It is a distinguished set in its own right, preserved by all the symmetries, and it marks the limit of reachability. In data terms, it is the natural home for **boundary cases**: transitions that are only just admissible, dependencies that are tight, constraints that are exactly saturated. A metric space has no comparable intrinsic boundary. Any boundary you draw is a level set you chose.

---

## 3. Order before measurement

A physicist would treat what comes next as the strongest argument. Inside general relativity, it turned out that **the causal order carries most of the geometry**.

Results by Hawking, King, and McCarthy (1976) and Malament (1977) established that, for well-behaved spacetimes, the causal relation alone (which events can influence which) determines the spacetime's topology and its metric *up to a conformal factor*. Conformal structure means angles and light cones. The only thing missing is a local scale: a single function saying how many units of proper time each causal interval contains.

Put plainly, the reachability relation determines everything about the geometry except the ruler.

The causal set programme, launched by Bombelli, Lee, Meyer, and Sorkin in 1987, takes this to its logical end. Spacetime is modelled as a discrete partially ordered set, and the missing volume information is supplied by *counting elements*. Their slogan is "order + number = geometry."

This reverses the usual design of embeddings. Standard practice starts from measurement (a distance or inner product) and hopes structure emerges. The physics tradition shows that structure can come first, with measurement as an optional extra layer. If your data is fundamentally about what can reach what, you should want a representation in which reachability is the primitive and distance is derived, or even dropped.

---

## 4. Why causal data is the natural home

### 4.1 Correlation versus accessibility

There are two different relations one might want to encode:

- **Correlation / resemblance**: $A \sim B$. Symmetric, graded, naturally metric.
- **Causal accessibility**: $A \to B$. Asymmetric, transitive, naturally an order.

Current embeddings mostly encode the first and try to recover the second through asymmetric heads, link-prediction losses, or post-hoc graph reasoning. A causal geometry would encode the second directly and treat the first as secondary, if it needs it at all.

### 4.2 How practitioners already reason about causal systems

Look at the fields that work with causal structure every day:

- **Distributed systems** use Lamport's *happens-before* relation (1978), a partial order on events defined by message passing and local sequencing. Vector clocks implement it as a product order. Nobody debugging a distributed computation asks for the cosine similarity between two states. They ask which states can follow which, which messages must arrive first, and which interleavings are forbidden.
- **Version control** organizes history as commit ancestry, a DAG whose reachability relation *is* the meaning of "contains this change."
- **Build systems and package managers** are dependency DAGs. The central question is always transitive: does changing X affect Y?
- **Provenance systems** track derivation: which inputs could have contributed to this output?

All of these are partial orders that people already handle through causal partitions rather than metric neighbourhoods. The light cone is the continuous, symmetry-rich generalization of the structure these engineers rebuild by hand.
A practical caveat is worth stating upfront. When an engineer already has the exact, deterministic DAG in memory—as in a clean Git history or a local Bazel build—nobody should replace fast, exact graph traversal or 2-hop cover indices with an approximate embedding where a false negative breaks a build. Fully observed deterministic graphs are noise-free testbeds for validating the mathematics, not targets for replacing exact algorithms. The production case for learned causal geometry arises when the dependency structure is **partially observed, implicit, or predictive**: inferring missing spans in distributed OpenTelemetry traces, predictive test selection in CI/CD before full dependency resolution, premise selection in formal theorem proving, or prerequisite planning for LLM agents.

### 4.3 Hidden constraints, not large distances

When one event fails to cause another in a real system, the explanation is rarely "they were too far apart." It is usually that **a constraint prevented the transition**: a missing resource, a violated invariant, an absent permission, an incompatible mechanism, a conservation law.

A metric embedding can only express "unrelated" as "distant." A cone structure expresses it as "outside the admissible region." Those are different explanations, and the second matches how causal systems actually fail.

### 4.4 Scale-freedom and why curvature is the wrong bias here

Causal motifs repeat across scales:

```
gene → protein → cell behaviour → tissue behaviour → organism behaviour
developer → team → company → market → economy
function → module → service → system → ecosystem
```

The same pattern of regulation, feedback, or dependency appears at levels separated by many orders of magnitude. A mechanism does not care how big it is.

A curved embedding space does care. With a built-in radius of curvature, every structure is implicitly placed in a regime: small relative to the curvature scale (where the space looks flat), comparable (where things bend), or large (where exponential growth dominates). The same motif embedded at two different scales sees two different geometries. For a hierarchy of known depth, that can be acceptable or even helpful. For a scale-free causal system it is a mis-specified prior. You have put a ruler into the geometry that the phenomenon does not have.

The signed flat space $\mathbb{R}^{p,q}$ has no curvature and therefore no preferred scale, yet it still provides the cone partition. It offers the property hierarchy-minded hyperbolic work wants, an asymmetric containment structure, without the property scale-free data does not want.

---

## 5. Why $(3,1)$ is irrelevant

### 5.1 Two physics questions, neither relevant here

Physical spacetime appears to have signature $(3,1)$. Two separate questions are bundled in that fact:

- *Why three spatial dimensions?* Proposed answers involve stability of orbits and atoms, the behaviour of wave propagation, knot theory, anthropic selection, and string compactification.
- *Why one time dimension?* The answers here are of a different kind entirely: well-posedness of the initial value problem, predictability, the existence of a consistent causal order, and the stability of physical fields.

These questions have **completely different answers**, and neither answer has anything to do with representation learning. An embedding space is not subject to the dynamical, stability, or anthropic constraints that select $(3,1)$ in nature. When ML papers say "Minkowski space" and then quietly think in terms of "space" and "time," they inherit an interpretation they have no reason to want.

What embeddings need is the *mechanism*: positive sectors, negative sectors, and the null boundaries between them. The numbers $3$ and $1$ have no special status. The design parameter is $(p,q)$.

### 5.2 What changes beyond Lorentzian signature

This is where a physicist has to be careful, because taking the generalization naively breaks things.

**With $q \geq 2$, the timelike region no longer gives a causal order by itself.** In Lorentzian signature, the timelike set splits into two components (future and past), and each is convex. In signature $(p,q)$ with $q \geq 2$ and $p \ge 1$, the set $\{v : Q(v) < 0\}$ is **connected**, so there is no global future/past split. It is also **not convex**: you can add two timelike vectors and get a spacelike one. The transitivity argument from §2.2 fails. A single $(p,2)$ form does not, on its own, define a reachability order.

This is not a dead end. It is a sign that the design space has more structure than "pick two numbers." Several constructions recover an order:

- **Convex subcones.** Inside a higher-$q$ space, choose a convex cone compatible with $Q$ (for example, one cut out by several linear time functions) and use it as the order cone.
- **Products of Lorentzian blocks.** Take $\mathbb{R}^{n_1,1} \oplus \mathbb{R}^{n_2,1}$ and define $x \preceq y$ iff $y - x$ lies in the future cone of *both* blocks: $C = \overline{C_1^+} \times \overline{C_2^+}$. The intersection of convex cones is a convex cone, so this is a genuine partial order. Each block is a separate **constraint family**, and reachability requires satisfying all of them. A transition can be admissible with respect to resources but forbidden with respect to permissions. Note an important mathematical distinction: intersecting the individual block cones $Q_1(v_1) \le 0 \land Q_2(v_2) \le 0$ implies $Q_1(v_1) + Q_2(v_2) \le 0$, but not the converse, and it reduces the symmetry group from $O(n_1+n_2, 2)$ to $O^+(n_1,1) \times O^+(n_2,1)$. Strictly speaking, this construction abandons the single total quadratic form $Q = Q_1 + Q_2$ in favour of a product of $(p_i, 1)$ Lorentzian spaces.
- **Weighted block intersections.** Because the signature $(p,q)$ is a discrete invariant under Sylvester's law, attempting to learn eigenvalue signs dynamically through zero creates degenerate gradients and dead dimensions. A better mechanism fixes an explicit architecture of $k$ Lorentzian $\mathbb{R}^{p,1}$ blocks and learns the projection into those blocks, using a smooth soft-min (such as LogSumExp annealing) across block constraints during early training so the intersection of $k$ cones does not starve the model of gradients at initialization.

The block construction makes the earlier intuition precise. A causal system with several independent kinds of constraint (resource, informational, dependency, authority) has no reason to collapse them into a single "time" direction. A single $(n,1)$ cone forces a scalar notion of "later." A product of Lorentzian cones allows several, which is a much better fit for systems where something can be "ahead" in one respect and "behind" in another.

### 5.3 Neutral signature: $(2,2)$ versus $(3,1)$

The neutral signature $(2,2)$ shows how qualitatively different these spaces are. Its null set

$$
x^2 + y^2 - u^2 - v^2 = 0
$$

is not a pair of cones over a sphere, as in Lorentzian signature. It is a cone over a torus $S^1 \times S^1$. The symmetry group $SO(2,2)$ is locally isomorphic to $SL(2,\mathbb{R}) \times SL(2,\mathbb{R})$, so it factorizes into two independent pieces. The form itself can be rewritten as a determinant, $Q = \det\begin{pmatrix} a & b \\ c & d\end{pmatrix}$, so its null vectors are rank-one matrices. That is a natural algebraic home for *factorized* relationships.

At this point "time" is plainly the wrong word. What $(2,2)$ describes is interacting pairs of constraint directions with a large, structured family of boundary configurations. Whether that is useful for a given dataset is an empirical question, and almost no one has asked it.

### 5.4 Capacity: order dimension

There is one more physics-to-combinatorics link that matters for practitioners, and it exposes an algebraic trap. In $1+1$ dimensions, light-cone coordinates $u = t + x$, $w = t - x$ map the Lorentzian future cone isomorphically to the positive quadrant $\mathbb{R}_+^2$, showing that the causal order is *exactly* the product order on $\mathbb{R}^2$: $x \preceq y$ iff $u_x \le u_y$ and $w_x \le w_y$. So $(1,1)$ Minkowski space represents precisely the posets of order dimension at most 2, in the Dushnik–Miller sense.

Consequently, a product of $k$ two-dimensional Lorentzian cones ($\bigoplus_{i=1}^k \mathbb{R}^{1,1}$) is mathematically identical to $\mathbb{R}_+^{2k}$—which is simply Vendrov et al.'s (2016) standard axis-aligned Order Embedding, or a $2k$-dimensional vector clock. The genuine geometric novelty of Lorentzian cones—what the combinatorics literature calls "sphere orders" or "circle orders," which possess continuous $SO(p)$ rotational symmetry in their spatial cross-sections and infinitely many extreme rays—**only emerges when the spatial dimension of a block is $p \ge 2$**. Any test of non-polyhedral Lorentzian structure must therefore use blocks of size at least $\mathbb{R}^{2,1}$.

So the choice of $(p,q)$ and of cone construction is a real capacity question: which partial orders can be embedded faithfully, and in how many dimensions? This is a theoretical lever for choosing signatures, and the embedding literature has mostly left it unused.

### 5.5 Hidden sectors and discrete gates

Physics offers one more idea: dimensions that exist but are not directly observed. Kaluza–Klein theory and its descendants use compact directions whose geometry shapes what happens in the visible dimensions.

For causal embeddings, the analogue is **latent sectors that govern admissibility without appearing in the observed similarity structure**: mechanism class, hidden context, conservation laws, resource budgets. Two events can look identical in every observed coordinate yet differ in a hidden sector that determines whether one can reach the other. This captures, geometrically, the common situation in which a transition is blocked by something you were not measuring.

One sharp edge here is that literally adding a continuous compact manifold like $S^1$ creates severe problems. A compact timelike dimension introduces closed timelike curves, immediately destroying antisymmetry and the partial order. A compact spacelike dimension of radius $R$ breaks scale invariance, washes out constraints over long intervals ($\Delta t > \pi R$) as paths wrap around the cylinder, and creates severe phase-wrapping local minima under gradient descent. Rather than continuous $S^1$ manifolds, hidden admissibility constraints—such as discrete permissions, types, or conservation sectors—are better modelled as **discrete fiber bundles or categorical Gumbel-Softmax gates** paired with the scale-free non-compact cone structure.

---

## 6. What the field has actually done

Machine learning has not ignored these ideas. The useful question is how far it has gone, and in which direction. Roughly, the territory has four layers, explored to decreasing degrees.

**Layer 1: hyperbolic and Lorentzian geometry for hierarchy (well explored).** Poincaré embeddings and their Lorentz-model successors made hyperbolic space standard for tree-like data. Lorentzian signature appears here mainly as an implementation detail of the hyperboloid model. The motivating story is volume growth, not causality.

**Layer 2: explicit partial-order embeddings (moderately explored).** *Order embeddings* (Vendrov et al., 2016) encode entailment as the reverse product order on the positive orthant. *Hyperbolic entailment cones* (Ganea et al., 2018) attach cones to points in hyperbolic space. *Box embeddings* represent concepts as axis-aligned boxes whose containment is the order. These are genuine order-first methods and deserve credit. Their cones, however, are axis-aligned or tied to curved geometry. None treats the Lorentz-invariant cone of a flat signed space as the primitive.

**Layer 3: spacetime causal structure for directed graphs (uncommon).** *Spacetime Representation Learning* (Law and Lucas, ICLR 2023) represents directed graphs as events in a spacetime and uses the causal ordering of events to represent edge direction. This is a real conceptual step: it says directed relations can live in causal structure, not merely that trees fit curved space. *Neural Spacetimes for DAG Representation Learning* (Borde et al., 2024) goes further, combining a quasi-metric spatial component with a partial-order temporal component. The authors note explicitly that prior work tends to encode graph geometry and causality separately and set out to encode both together.

**Layer 4: signature as a design space (sparse, and still tied to curvature).** Some work does go beyond $(n,1)$. *Ultrahyperbolic Representation Learning* (Law and Stam, NeurIPS 2020) and pseudo-Riemannian graph networks (e.g., Xiong et al., NeurIPS 2022) use pseudo-hyperboloids of general signature, and older work on pseudo-Euclidean and Kreĭn-space embeddings handles non-metric similarity data. These are real contributions. What stands out is their framing: general signature is used mainly to give curved manifolds more flexibility (fitting hierarchies and cycles together, absorbing negative eigenvalues of a similarity matrix). It is not used as a scale-free source of reachability classes. Curvature is still the main structure, and signature is still in a supporting role.

What I could not find is work that brings these together:

- **flat** signed spaces, chosen precisely *because* they have no curvature scale;
- the **cone order** as the primary representational object, with reachability as the training signal;
- **null structure** used deliberately as the home for boundary cases;
- **hidden sectors** as carriers of admissibility.

There are also scattered recent preprints arguing that semantic hierarchy can be encoded in Minkowski causal relations, and proposing retrieval governed by causal accessibility rather than proximity. Their claims are not yet established, but the direction (replacing similarity search with accessibility search) points to the transition this essay argues for.

The overall picture is that the field's centre of gravity is still "Lorentzian spaces are good for hierarchies." The stronger hypothesis, that a large class of meaningful data is organized by reachability rather than resemblance, sits on the fringe. The strongest version, that indefinite signature supplies scale-free classification structure more basic than curvature, is almost unexplored in ML. It is familiar ground for causal set theorists, Lorentzian geometers, conformal and twistor geometers, and order theorists. Those communities have thought in terms of null structure and reachability classes for decades.

---

## 7. Why the gap exists

It would be easy to explain this gap as a matter of who works in the field, and that explanation would be lazy. The structural reasons are more instructive.

**Incentives reward benchmarks over unification.** A paper that shows hyperbolic space improves link prediction on WordNet gets published. A paper that classifies which invariant structures survive under which geometric constraints, and predicts which data each suits, is harder to evaluate and harder to fit into a results table.

**The entry point shaped the framing.** ML met spacetime geometry through the problem that "trees are hard to embed in Euclidean space." Starting there, Lorentzian geometry looks like a tool for hierarchy, and its cones look like an implementation detail. Starting from physics instead, the cone *is* the geometry, and hierarchy is one consequence among many.

**Mathematical timescales differ.** Hyperbolic geometry dates from the 19th century. Lorentzian geometry, conformal geometry, and the relevant causal-structure theorems date from the 20th century, the decisive results only from the 1970s and 1980s. By mathematical standards, a century is recent. Ideas of that age are still being absorbed even within mathematics, and ML usually adopts them one benchmark-sized piece at a time.

The typical paper asks, "How can we use spacetime ideas in embeddings?" The better question is, "What does signature buy us, independent of spacetime?"

---

## 8. A research program

Here is what it would take to test the thesis rather than just argue for it.

### 8.1 Formalize

1. **Representation theorems.** For each cone construction (single Lorentzian cone, product of $k$ Lorentzian blocks, polyhedral subcones of $\mathbb{R}^{p,q}$), characterize which finite posets embed faithfully and in what minimum dimension. Relate this to order dimension and known results on sphere orders.
2. **Invariance accounting.** For each candidate geometry, state precisely which transformations preserve the order: translations, dilations, the relevant indefinite orthogonal group, and conformal maps. Make "scale-free" a checkable property.
3. **Separating examples.** Construct families of DAGs, especially self-similar and multi-scale ones, on which curved embeddings provably need distortion that grows with scale range while flat cone embeddings do not.

- **block-Lorentzian $(p_i,1)$ products and cone constructions** (with $p_i \ge 2$) treated as an inductive-bias choice selected by the data's constraint structure;
### 8.2 Compare signatures directly

Hold the total ambient dimension fixed—choosing $N \ge 6$ so that multi-block Lorentzian spaces have spatial dimension $p_i \ge 2$ per block and do not collapse into axis-aligned order embeddings—and vary only the structure:

| Geometry | Order mechanism | Intrinsic scale |
|---|---|---|
| Euclidean $\mathbb{R}^n$ + asymmetric head | learned | none, but needs a threshold |
| Hyperbolic $\mathbb{H}^n$ + entailment cones | cones in curved space | curvature radius |
| Order / box embeddings | axis-aligned product order | none |
| Flat Lorentzian $\mathbb{R}^{5,1}$ | single convex light cone (sphere order) | none |
| Product $\mathbb{R}^{2,1} \oplus \mathbb{R}^{2,1}$ | intersection of non-polyhedral cones | none |
| Neutral $\mathbb{R}^{3,3}$ with chosen subcone | constructed convex cone | none |
| Any of the above + discrete fiber / gate | as above, gated by categorical sector | none |

Comparing $\mathbb{R}^{5,1}$ with $\mathbb{R}^{2,1} \oplus \mathbb{R}^{2,1}$ at fixed dimension six (alongside $\mathbb{R}_+^6$ order embeddings) isolates both the rotational advantage of continuous sphere orders over axis-aligned orthants and the question of whether multiple independent constraint families help.

### 8.3 Choose data where reachability is the ground truth

Benchmarks should avoid graphs dominated by topical homophily (like citation networks) or homeostatic feedback loops (like cyclic gene regulatory networks, which violate partial-order antisymmetry). Instead, evaluation should center on high-signal causal and dependency structures:

- **Synthetic multi-scale Kronecker and fractal posets:** train Hyperbolic Entailment Cones ($\mathbb{H}^n$) and Flat Lorentzian Cones ($\mathbb{R}^{p,1}$) on hierarchy depths $1 \dots L-1$ and test zero-shot scale transfer at depth $L+2$, testing whether curved spaces fail outside their radius of curvature $k$ while flat cones generalize.
- **PERT/CPM scheduling and compiler DAGs:** graphs where ground-truth slack/float time is known exactly, providing a direct test for null-boundary calibration.
- **Premise selection (Lean/Coq) and predictive test selection (CI/CD):** software, build, and formal-proof dependency graphs evaluated under **partial observability** (e.g., training on 70% of edges or incomplete distributed OpenTelemetry trace spans and predicting transitive reachability on the held-out 30%).
- **Version-control and data provenance DAGs:** exact ancestry structures used as noise-free ground truth for capacity and distortion stress tests.

### 8.4 Measure reachability, not proximity

- **Transitive-closure precision and recall:** does $x \preceq y$ in the embedding match reachability in the graph, including pairs never seen in training?
- **Scale transfer:** train on motifs at one scale and test at another.
- **Antichain fidelity ($\text{FPR}@k_{\text{coord}}$):** quantify native sparsity (§2.2) by reporting the False Positive Rate at $k$ Closest Euclidean Coordinate Neighbors—measuring how accurately the cone order excludes causally incomparable sibling nodes that sit immediately adjacent to the query in ambient coordinate space.
- **Boundary calibration:** in PERT/CPM scheduling DAGs, measure Spearman's rank correlation $\rho$ between $|Q(y-x)|$ and ground-truth slack time. Showing that zero-slack critical paths cluster on the null boundary ($Q(y-x) = 0$) directly tests the physics thesis.
- **Constraint disentanglement:** in multi-block $\bigoplus_{i=1}^k \mathbb{R}^{p_i,1}$ models, test whether individual blocks align with distinct ground-truth constraint families (such as resource vs. permission dependencies).

### 8.5 Retrieval by accessibility

Finally, build the operation the whole argument points toward: a retrieval primitive that returns **the future cone of a query**, or its past cone, or its null boundary, instead of its $k$ nearest neighbours.

This requires solving a real systems bottleneck. Standard sub-linear vector databases (FAISS, HNSW, Milvus) rely on the metric triangle inequality or inner-product bounds to prune search trees. Indefinite quadratic forms violate metric proximity: points arbitrarily far apart in Euclidean coordinates lie inside the future cone, while points infinitesimally close to the query sit outside it (spacelike separated). Furthermore, unlike $k$-NN, a raw future-cone query is an unbounded semi-algebraic range query that could return half the database (such as the future cone of a root commit).

Making accessibility search practical requires three engineering choices:

1. **Sub-linear indexing via MIPS lifting or two-stage filtering.** Rather than running naive $O(N)$ scans or unmodified HNSW on $Q(y-x) \le 0$, cone containment $t_y - t_x \ge \|\mathbf{x}_y - \mathbf{x}_x\|_2$ can be squared and lifted from $d$-dimensional coordinates into $(d+2)$-dimensional vectors $\phi(x), \psi(y)$ so that cone membership becomes an asymmetric Maximum Inner Product Search (MIPS) threshold $\langle \phi(x), \psi(y) \rangle \ge 0$ accelerated by FAISS (filtered by $t_y \ge t_x$). Alternatively, standard vector databases can index the timelike coordinate $t$ as a scalar payload filter ($t_y > t_x$) paired with bounded Euclidean ball queries $\|\mathbf{x}_y - \mathbf{x}_x\|_2 \le \Delta t$.
2. **Bounded sub-query ranking modes.** To prevent unbounded transitive-closure blowup, the retrieval API should expose three structured queries:
    - `cone_nearest(x, k)`: minimizes $\Delta t > 0$ inside the cone to retrieve immediate next-hop dependencies (approximate transitive reduction);
    - `cone_critical(x, eps)`: retrieves boundary transitions minimizing $|Q(y-x)| < \varepsilon$ to surface zero-slack critical paths and tight bottlenecks;
    - `cone_interior(x, k)`: maximizes proper time $\tau = \sqrt{-Q(y-x)}$ within a bounded horizon $T_{\max}$ to find the most robust downstream impacts.
3. **Hybrid "foliated" retrieval for RAG and agents.** Practical systems like LLM agent planning and code retrieval care about both prerequisites and semantic similarity. A foliated architecture uses both geometries: the Lorentzian cone order acts as a hard causal filter ($A \to B$), while the spatial Euclidean norm on spacelike antichains ranks semantic resemblance ($A \sim B$).

---

## 9. Caveats and the optimization paradox

A physicist should end with error bars.

- **Not all data is causal.** For pure resemblance tasks, such as finding near-duplicate images or paraphrases, metric embeddings are the right tool and signature adds nothing. The claim here is about a specific and important class of data, not all of it.
- **Higher $q$ is not automatically better.** As §5.2 showed, adding timelike directions destroys the naive order. Every move beyond Lorentzian signature has to come with an explicit cone construction. Without one, the result is a space with no causal structure at all.
- **The "scale-free softening paradox" in optimization.** This is the sharpest technical hurdle in the proposal. At test time, the sign of $Q(y-x)$ is projective and scale-invariant ($Q(\lambda v) = \lambda^2 Q(v)$), giving a threshold-free binary decision boundary. However, binary step functions have zero gradients almost everywhere. Training with stochastic gradient descent requires a smooth surrogate loss—yet introducing a standard hinge margin $\max(0, Q(y-x) + m)$ with $m > 0$, a sigmoid temperature $\sigma(-\beta Q(y-x))$, or $L_2$ weight decay immediately **breaks scale invariance and sneaks a characteristic ruler back into the optimization landscape** (while $m=0$ permits trivial collapse $x \to 0$ or runaway explosion along null rays). To preserve the no-ruler thesis during training, the loss must be formulated on a **homogeneous degree-0 (scale-invariant) angular or projective ratio**, such as the causal cosine or cone aperture:

$$
\mathcal{S}(x, y) = \frac{Q(y-x)}{\|y-x\|_E^2} \in [-1, 1] \qquad \text{or} \qquad \theta(x,y) = \frac{\|\mathbf{x}_y - \mathbf{x}_x\|_2}{t_y - t_x + \varepsilon}.
$$

   Applying a dimensionless angular margin around the null boundary ($\mathcal{S} = 0$ or $\theta = 1$) provides smooth gradients while keeping the objective strictly invariant under rescaling $v \mapsto \lambda v$. To prevent coordinates from drifting to infinity along null directions without adding a scale-breaking $L_2$ penalty, embeddings can be mapped into a bounded Penrose-style conformal diamond, which preserves causal and null cone orders exactly while guaranteeing numerical stability.
- **Cone orders are rigid.** A convex cone order is transitive and antisymmetric by construction. Real data has noise, missing edges, and spurious ones; a single false-positive edge creating a cycle forces an exact cone order to collapse the entire strongly connected component to a point. Angular softening around the cone boundary and soft-min annealing across product cones are essential to keep noisy edges from warping the global geometry.
- **Continuous compact sectors reintroduce scale and closed loops.** As §5.5 noted, continuous $S^1$ sectors either break causality (if timelike) or break scale invariance and suffer from phase-wrapping (if spacelike); discrete categorical fibers or gates are the cleaner mechanism.

---

## Conclusion: borrow the mechanism, not the metaphor

Machine learning borrowed Lorentzian geometry because trees look good in it. That was a reasonable thing to borrow, but it was the wrong lesson. What spacetime is exceptionally good at is not hierarchy. It is representing an enormous, scale-free set of states together with an invariant classification of which transitions are **allowed**, **forbidden**, or **borderline**, without ever choosing a ruler.

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

Mathematics has had the tools for this for about a century. Relative to that history, the embedding literature has explored very little of what is available.
- **Compilers and PERT/CPM schedulers** reason about data dependencies and critical paths, preserving prerequisite order while reordering independent tasks freely.
# Contractive Knot Theory: Knots as Persistent Forms of Slack Elimination

## Abstract

Classical knot theory classifies closed curves up to reversible deformation. Everyday knots behave differently. A loose tangle can collapse into a definite, recognizable form when its slack is pulled out. A tangle that is topologically trivial can still refuse to come apart when it is pulled. These phenomena are usually studied through physical models built from thickness, friction, elasticity and applied force.

This paper argues that part of the phenomenon is carried by a simpler structure, and we isolate that part. We propose to treat a knot as a persistent form of a *directed, slack-eliminating reduction*. Such a form is a nontrivial terminal state, or attractor, of a renormalization-style operator that does three things:

- it contracts a one-dimensional pattern;
- it isolates the regions that remain active;
- it normalizes them for comparison with the original.

In this setting, contraction is an order rather than an equivalence. A configuration may be topologically equivalent to the trivial one and still be unable to reach it without first acquiring slack.

We state axioms for admissible contraction operators, formulated as rewriting modulo neutral moves on multisets of local patterns. We define terminal patterns, weak and strong basins, contractive trapping, contractive depth, barrier-weighted attractor graphs and a graded notion of universality. The attractor graph is a directed landscape of terminal patterns, weighted by the slack that must be borrowed to move between them. We propose it as the basic invariant of a contraction system. Using standard results from rewriting theory and known hard unknot diagrams, we show that contraction is non-confluent even inside a single topological class.

We then build a ladder of minimal toy models, together with an enumeration protocol and a worked trace, in which the theory can be tested exhaustively. These models capture the frictionless, torsion-free limit. Friction and twist reappear as *relevant* parameters that create additional protected sectors.

The ingredients of this program are scattered across several literatures: hard unknots, Gordian unknots, ideal knots, polymer knot localization, physical knot mechanics, knotoids, geometric flows and jamming. Their synthesis, which classifies knots as stable forms of contraction rather than classifying contraction inside knot types, does not appear to have been pursued.

---

## 1. Introduction: an inversion

Mathematical knot theory begins by discarding almost everything a sailor knows. A knot, in the mathematical sense, is an embedding of a circle in three-dimensional space, considered up to ambient isotopy. Length is irrelevant, thickness is irrelevant, and tightness is meaningless. The theory asks one question with great precision: *can this curve be continuously deformed into that one without passing through itself?* Invariants such as the Alexander polynomial, the Jones polynomial and Khovanov homology are increasingly refined ways of answering it.

This question has a well-known blind spot. Take a long cord, tie an overhand knot in its middle, and join the two ends. The resulting closed curve is the unknot. The knot "in" the cord has disappeared from the topological record, because the closing arc can be dragged back across it. Yet nobody holding the cord doubts that there is a knot there. When the cord is pulled, it does not straighten. Its slack is expelled and a compact, characteristic form remains.

The example has to be read carefully, because it lives in two different regimes.

- **Open cord with fixed ends.** If the ends are held, or run off to infinity, the overhand knot is a genuinely nontrivial *long knot*. It is topologically protected, and no amount of slack will undo it.
- **Closed loop.** If the ends are joined, the knot is topologically trivial. It can be undone, but only by first enlarging the closing arc and sweeping it around the tangle. That move is unavailable to a cord that is only being pulled tighter.

What persists in the second case is not a topological invariant. It is a failure of *contractive* accessibility. The trivial state is reachable, but not by tightening.

The standard response is to say that the knot exists only once the ends are fixed. That response leads to long knots, tangles and knotoids, all of which are still equivalence theories. The other standard response is to model the cord physically, with a thickness to forbid crossing, a friction coefficient to resist sliding, an elastic modulus to resist bending, and a tension to drive tightening. Both responses capture part of the phenomenon. Neither isolates it.

This paper proposes an inversion. Instead of fixing a topological type and asking how contraction behaves inside it, we take contraction as primary and ask which forms survive it:

> Topology classifies reversible deformation classes. Contractive knot theory classifies irreversible contraction forms.

The central object is a *directed reduction system* on one-dimensional patterns, together with a renormalization-style operator that extracts the stable local forms of that reduction. Topological type becomes one invariant, a conserved label on some trajectories, rather than the definition of the subject.
The filamentary case is the motivating realization of a more general theory: localized normal forms under directed reduction. Remove the cord and three things remain:
- a rewriting system modulo neutral moves;
- a localization map that splits normal forms into independent active components;
- a barrier structure that measures how much expansion is needed to move between them.
Nothing in the axioms of Section 4 requires the carrier to be string. We keep the knot vocabulary because it gives the idea teeth and a body of hard examples. We return to non-filamentary realizations in Section 10.
If the program has a single invariant, it is the barrier-weighted attractor graph of Section 4.6. A knot polynomial attaches an algebraic object to a knot type. The attractor graph attaches a directed landscape to a reduction law: its terminal forms, their basins, and the asymmetric barriers between them. The question shifts from "what polynomial belongs to this knot?" to "what directed landscape belongs to this reduction law?"


The paper is organized as follows.

- Section 2 sets the abstraction boundary: which features of physical cords enter the theory, in what form, and which features do not abstract away.
- Section 3 explains the asymmetry between equivalence and reduction.
- Section 4 gives the formal framework: state spaces, rewriting modulo neutrality, contraction axioms, the renormalization operator, terminal patterns, basins, depth and universality.
- Section 5 develops two conceptual refinements: slack as a structured distribution rather than a scalar, and order as a more primitive notion than geometry.
- Section 6 proves basic structural results.
- Section 7 surveys neighboring literature and locates the gap.
- Section 8 constructs a ladder of minimal toy models, an enumeration protocol and a worked trace.
- Section 9 discusses phases, hierarchy and the protected-sector picture, including the sectors created by friction and twist.
- Section 10 lists open problems.

---

## 2. The abstraction boundary

The main risk in this subject is building a miniature rope simulator and then mistaking its material parameters for the concept. Thickness, friction and force clearly matter to real knots. The question is *how* they should enter a theory meant to explain what a knot is.

Our answer is that, as far as possible, they belong below the abstraction boundary:

$$
\text{microscopic rule} \;\longrightarrow\; R \;\longrightarrow\; \text{terminal patterns and basins}.
$$

A microscopic rule might be a constrained gradient flow for a thick tube, a frictional contact model, a lattice Monte Carlo move set, or a rewriting system on diagrams. Each induces an effective contraction operator $R$. The theory is about $R$ and its stable forms.

Different microscopic rules may induce effectively equivalent operators. When they do, the material parameters that separate them are *irrelevant* in the renormalization-group sense. They change the realization without changing the classification. This is the step at which the abstraction pays for itself, and it is a claim to be tested rather than assumed. Some parameters will turn out to be *relevant*: changing them creates or destroys persistent patterns. We return to this below and in Section 9.3.

Each physical ingredient can be translated into an abstract role:

- **Thickness** becomes a prohibition on certain identifications or crossings. Its essential content is that strands keep their relative arrangement under contraction. It is not a length scale.
- **Force** becomes the *orientation* of the reduction relation. Pulling defines which way configurations may move. It is not a vector field.
- **Noninvertibility** is the loss of recoverable history. Distinct loose configurations may contract to the same state, $R(x_1) = R(x_2)$ for $x_1 \neq x_2$. It is tempting to call this "friction," but that would be a mistake. Any dissipative descent erases history, including a frictionless gradient flow. Noninvertibility is a property every contraction has, not the signature of friction.
- **Shrinkage** becomes iteration of $R$.
- **Jamming** becomes arrival at a nontrivial terminal pattern.
- **Tightness** becomes depth along a contraction trajectory.
- **Knot type** becomes, at most, a conserved label on some trajectories.

Friction proper and torsional stiffness do not fit this list as neatly. Coulomb friction obeys the capstan relation $T_{\text{out}} = T_{\text{in}} e^{\mu \Theta}$ for a cord wrapped through total angle $\Theta$. It can hold a configuration that would otherwise slide apart. Twist is constrained by Călugăreanu's theorem $Lk = Tw + Wr$, which forces conserved twist into writhe and stabilizes supercoiled forms.

These effects do not merely regularize an existing classification. They *create new fixed points*. Slipknots, hitches and plectonemes are stable in a frictional or twisted cord, yet collapse completely in a frictionless, torsion-free one.

We therefore separate them explicitly. The toy models of Section 8 capture the **frictionless, torsion-free limit**, in which persistence comes only from topology and from steric or diagrammatic jamming. Friction and twist enter as relevant control parameters that define further protected sectors (Section 9.3).

Within that limit, very little needs to survive the abstraction. We need enough structure to express four things.

1. **Slack.** Parts of a configuration can be removed without changing its active local pattern.
2. **Localization.** Iterated contraction separates active regions from passive connecting material.
3. **Obstruction.** Contraction cannot reduce an active region to a featureless strand without first passing through a less contracted state.
4. **Self-similarity under contraction.** After slack is removed and scale is normalized, the same relational pattern remains.

Everything else is a choice of realization.

---

## 3. Equivalence versus reduction

Topology works with a symmetric relation. Write $x \sim y$ when each configuration can be continuously deformed into the other. Contraction works with a directed one. Write

$$
x \succcurlyeq y
$$

when $y$ can be obtained from $x$ by eliminating slack. This relation is reflexive and transitive, so it is a preorder. It is generally not symmetric. Once slack has been removed, it cannot be restored using contraction alone.

The gap between the two relations is the source of the phenomenon. A configuration can be topologically trivial and still be unable to reach the trivial configuration contractively. Every simplifying path must first add slack:

$$
x \sim \mathbf{1}, \qquad x \not\longrightarrow_{\mathrm{contr}} \mathbf{1}, \qquad x \longrightarrow_{\mathrm{exp}} x' \longrightarrow_{\mathrm{contr}} \mathbf{1}.
$$

This gives an abstract definition of tightening resistance that does not mention friction.

> **Working definition.** A *contraction pattern* (contractive knot) is a nontrivial persistent state of a slack-eliminating reduction: a configuration that admits no further strict contraction and is not the trivial pattern. We call such states *contractively terminal*. A contraction pattern need not be topologically nontrivial. When it is topologically trivial, we call it *contractively trapped*.

Persistent patterns therefore come in two kinds. *Topologically protected* patterns cannot reach $\mathbf{1}$ by any deformation. *Contractively trapped* patterns can reach $\mathbf{1}$, but only by first borrowing slack.

This resolves the opening example.

- On an open cord with fixed ends, the overhand knot is topologically protected.
- On a closed loop, it is topologically trivial. Whether it is trapped depends on the realization. In a thick or lattice cord, excluded volume can stop the closing arc from sweeping across the tangle without first lengthening. In a purely diagrammatic realization, a clean overhand knot on a closed loop *does* untie by monotone moves. Diagrammatic trapping needs considerably more intricate configurations: the hard unknots of Goeritz and of Kauffman and Lambropoulou, the smallest known of which have roughly ten crossings.

In both regimes, the everyday claim "there is a knot here" refers to the persistent form, not to the isotopy class of the loop.

The obstruction is directional. Ordinary topology forgets direction in configuration space, because a path and its reverse are equally valid deformations. Contractive knot theory therefore sits closer to rewriting theory, partially ordered dynamics and directed algebraic topology (Grandis, 2009) than to the theory of classical invariants. In directed topology, the question is not whether two states are connected but whether one is reachable from the other along admissible, time-oriented paths.

---

## 4. Formal framework

### 4.1 State space

Let $\mathcal{E}$ be a space of one-dimensional configurations, considered modulo cheap symmetries such as reparameterization, rigid motion and relabeling. A configuration may be an embedded curve, a lattice walk, a diagram or a purely combinatorial word, depending on the realization. Whatever the realization, it must carry:

- an **intrinsic order** $\prec$ along the strand: linear for open cords, cyclic for closed ones;
- an **encounter structure** $E$ recording which parts of the strand interact (crossings, contacts, adjacencies), with whatever additional data the realization needs, such as over/under information;
- a **complexity preorder** $\preceq$ on $\mathcal{E}$, which is the coarse ordering contraction must respect. In concrete models this may be length, crossing count or energy. We will argue in Section 5 that the full content of slack is not captured by any single scalar.

We assume a distinguished **trivial pattern** $\mathbf{1} \in \mathcal{E}$: the featureless strand.

Because localization (Section 4.3) can split one configuration into several independent active regions, the natural carrier of the dynamics is the free commutative monoid $\mathcal{M}(\mathcal{E})$ of finite multisets of configurations. A single configuration is identified with the one-element multiset. The trivial pattern acts as the unit: components equal to $\mathbf{1}$ are discarded.

### 4.2 Admissible contraction operators

A contraction operator is a nondeterministic relation $C$ on $\mathcal{E}$. Write $x \to_C y$ if $y$ is a possible one-step contraction of $x$, and $\to_C^*$ for its reflexive–transitive closure.

A step is **strict** if $y \prec x$ in the complexity preorder. It is **neutral** if $y \preceq x$ and $x \preceq y$. Let $\approx$ be the equivalence relation generated by neutral moves, and write $[x]$ for the neutral class of $x$.

**Rewriting modulo neutrality.** We define strict reduction on the quotient:

$$
[x] \Rightarrow_C [y] \quad\text{iff}\quad \exists\, x' \in [x],\ y' \in [y] \text{ with } x' \to_C y' \text{ strict}.
$$

This is the standard notion of rewriting modulo an equivalence (Huet, 1980; Jouannaud and Kirchner, 1986). A class is **terminal** if it admits no $\Rightarrow_C$ step. Terminality is a property of the whole neutral orbit, not of a single representative. A configuration can look stuck while a neutral rearrangement exposes a contraction elsewhere.
Two notions are being merged here. A representative is *syntactically terminal* if it contains no redex. A class is *dynamically terminal* if no neutral evolution can ever expose one.
In the diagrammatic and lattice models of Section 8, neutral moves preserve complexity and neutral orbits are finite. Quotienting by $\approx$ then collapses the two notions. In realizations where neutral dynamics can run indefinitely, such as flow-like or cellular realizations, the orbit need not be finite. The appropriate definition there is: $P$ is terminal if and only if no $P'$ in the closure $\overline{\operatorname{Reach}_0(P)}$ admits a strict contraction, where $\operatorname{Reach}_0(P)$ is the set of states reachable from $P$ by neutral moves alone. The closure matters: a redex that is approached but never reached by neutral evolution should still count.


We call $C$ **admissible** if it satisfies the following axioms.

**(A1) Monotonicity.** If $x \to_C y$ then $y \preceq x$. Complexity never increases.

**(A2) Termination modulo neutrality.** The relation $\Rightarrow_C$ is terminating. There is no infinite sequence of strict contractions, even when neutral moves are interleaved arbitrarily. Every trajectory reaches a terminal class after finitely many strict steps.

**(A3) Order preservation.** Contraction preserves the intrinsic order $\prec$. It cannot pass one ordered segment through another except by moves the realization explicitly permits. Topological protection is exactly the case in which the realization forbids strand passage outright.

**(A4) Locality.** Each step changes the configuration only on a bounded neighborhood of the strand, measured in the intrinsic order. Once a segment no longer takes part in any encounter, it can be discarded as passive without changing the dynamics of the rest.

**(A5) Scale covariance.** Where the realization has a scale, contraction commutes with rescaling up to equivalence: $C(\lambda x) \approx \lambda\, C(x)$.

**(A6) Noninvertibility.** $C$ is generally many-to-one. Distinct configurations may share a contraction, so deformation history is erased.

**(A7) Renormalizability.** The output of contraction, localization and normalization lies again in $\mathcal{M}(\mathcal{E})$. The resulting operator extends additively to multisets, so it can be iterated.

Axioms A1–A2 make contraction an irreversible flow. A3 is where obstruction can arise. A4 makes localization meaningful. A5–A7 make the renormalization structure possible.

### 4.3 The renormalization operator

Given an admissible $C$, define

$$
R_C \;=\; N \circ L \circ C,
$$

where:

- $C$ applies **one round of contraction**: a single strict step, or a bounded-horizon parallel step that applies a set of non-overlapping strict contractions simultaneously. $C$ is deliberately *not* reduction all the way to normal form. If it were, $R_C$ would be idempotent ($R_C^2 = R_C$) and the iteration would carry no information beyond its endpoint.
- $L : \mathcal{E} \to \mathcal{M}(\mathcal{E})$ (**localization**) restricts to the active material, discarding passive strand that no longer takes part in encounters. It returns the multiset of indecomposable active regions.
- $N$ (**normalization**) puts each component in canonical form, by rescaling, recentering or canonically relabeling, so that it can be compared with the input.

On multisets, $R_C$ acts componentwise: $R_C(\{x_1, \dots, x_k\}) = R_C(x_1) \uplus \cdots \uplus R_C(x_k)$. Because $C$ takes one round at a time, the multiset can split progressively. A pattern that is a single indecomposable region at one stage can become several regions once a contraction severs the encounters that bridged them. The hierarchical trees of Section 9.2 arise in exactly this way.

This is recognizably a renormalization-style operation: isolate the active region, discard inactive scale, rescale, compare. Renormalization operators are useful exactly when the short-scale behavior they induce stays within the same class of objects, so that they can be iterated (Kadanoff, 1966; Wilson and Kogut, 1974).

### 4.4 Terminal patterns, cycles and basins

We classify states by the long-run behavior of $R_C$.

- **Fixed patterns:** $R_C(P) \approx P$ with $P \not\approx \mathbf{1}$. Since we work modulo $\approx$, every neutral orbit is a single class, so every terminal class is a fixed pattern. The two notions coincide.
- **Periodic patterns:** $R_C^m(P) \approx P$ for some minimal $m > 1$. Modulo $\approx$, these cannot occur in a terminating discrete realization, because neutral rearrangements are absorbed into the class. Periodic behavior reappears in two places. One is realizations that track neutral moves individually rather than quotienting by them. The other is continuous realizations, where rotating or self-similar solutions of a normalized flow are genuine cycles.
- **Basins.** Because $C$ is nondeterministic and, as Section 6 shows, non-confluent, basins overlap. We therefore distinguish two notions:
  - the **weak basin** $\mathcal{B}^{\mathrm{weak}}_C(P) = \{\, x \in \mathcal{E} : [x] \Rightarrow_C^* [P] \,\}$, the states that *can* end at $P$;
  - the **strong basin** $\mathcal{B}^{\mathrm{strong}}_C(P)$, the states *every* terminal descendant of which is $P$.

  Strong basins are disjoint. Weak basins are not. The intermediate information is recorded in a *basin profile*: the set of terminal patterns reachable from $x$, possibly with frequencies under a chosen scheduling of moves.

An important point of honesty concerns the word "renormalization." In a discrete, terminating realization, the trajectory of a single configuration under $R_C$ is short: it stops at a terminal pattern. Such an operator does not integrate out continuous wavelengths or induce a flow on a space of couplings.

Read literally, $R_C$ is closer to two other constructions. Statistical physicists would recognize the descent of a configuration to its *inherent structure* in an energy landscape (Stillinger and Weber, 1982). Rewriting theorists would recognize *normal-form projection modulo an equivalence*. Both readings are correct.

We retain the renormalization vocabulary as programmatic language. The genuinely RG-like content is not in long trajectories of individual states. It is in three other places:

- in how basins grow and distribute as configuration size increases;
- in the hierarchical structure of patterns that split into sub-patterns under localization;
- in the comparison of *operators*, which is where universality lives.

In continuous realizations with genuine rescaling, such as normalized geometric flows, single trajectories can be long and the analogy with renormalization becomes direct.

### 4.5 Contractive trapping and depth

Here $\sim$ is the equivalence generated by contraction, its inverse (expansion) and neutral moves, which is the realization's notion of topological equivalence. We distinguish:

- **Contractively terminal** states: those whose class is terminal and $\not\approx \mathbf{1}$. These are the persistent contraction patterns, whether topologically protected or not.
- **Contractively trapped** (or *recalcitrant*) states: those with
  $$
  x \sim \mathbf{1} \quad\text{but}\quad [x] \not\Rightarrow_C^* [\mathbf{1}].
  $$
  A trapped state is topologically trivial, yet no contraction path reaches the trivial pattern. A state may also be *partially trapped*, when its basin profile contains both $\mathbf{1}$ and some nontrivial pattern.

Trapping is binary. A finer measure is **contractive depth**. Suppose the complexity preorder is given by an integer-valued function $c$. For a path $\gamma = (x = x_0, x_1, \dots, x_k = \mathbf{1})$ using contractive, expansive and neutral moves, define its *excess* as

$$
\operatorname{exc}(\gamma) = \max_i \, c(x_i) - c(x).
$$

The contractive depth of $x$ is

$$
\delta(x) = \min_{\gamma : x \leadsto \mathbf{1}} \operatorname{exc}(\gamma),
$$

with $\delta(x) = \infty$ when $x \not\sim \mathbf{1}$.

Depth is measured from the starting complexity, so a loose configuration can "spend" its own slack. A trapped core carrying extra kinks may have depth $0$, because the kinks can be removed first and the freed budget used to unlock the core. The clean trichotomy therefore holds for terminal patterns. If $P$ is terminal, every path out of its class must begin by going up, and

$$
\delta(P) = 0 \iff P \approx \mathbf{1}, \qquad 0 < \delta(P) < \infty \iff P \text{ is contractively trapped}, \qquad \delta(P) = \infty \iff P \text{ is topologically protected}.
$$

Depth is a quantitative measure of how much slack must be borrowed to escape a pattern. It is the analogue of a minimax pass height, or barrier, in an energy landscape. It parallels the unknotting barriers studied on graphs of diagrams connected by Reidemeister moves and the notion of a mountain pass in discrete Morse-theoretic treatments of such landscapes. In the diagrammatic setting, it is closely related to the measures of recalcitrance studied by Kauffman and Lambropoulou (2006).

### 4.6 Attractor graphs and universality

The attractor graph is the central invariant of the theory. It records what ordinary knot invariants discard: terminal forms, directed accessibility, required expansion, asymmetric barriers and basin adjacency. For each operator, define the **attractor graph** $\mathcal{A}(C)$.

- Its vertices are the terminal patterns, together with any periodic patterns the realization supports.
- Because weak basins overlap, edges cannot be defined by "some state in one basin is adjacent to some state in the other." A shared ancestor would make every such barrier zero. Instead, the directed edge from $P$ to $Q$ carries the minimax barrier measured *from $P$ itself*:
  $$
  \Delta(P \to Q) = \min_{\gamma :\, P \leadsto Q' \in \mathcal{B}^{\mathrm{strong}}_C(Q)} \Big( \max_i \, c(x_i) - c(P) \Big).
  $$
  Using the weak basin in place of the strong one gives an upper-bounding variant.

The graph is directed, and $\Delta(P \to Q)$ and $\Delta(Q \to P)$ generally differ. Depth is the special case $\delta(P) = \Delta(P \to \mathbf{1})$.

Now let $C_1$ and $C_2$ be admissible operators on state spaces $\mathcal{E}_1$ and $\mathcal{E}_2$, which may be different realizations. Suppose they are related by a coarse-graining map $\varphi : \mathcal{E}_1 \to \mathcal{E}_2$ that commutes with the order and encounter structure up to equivalence.

The strongest notion of universality would demand an isomorphism $\mathcal{A}(C_1) \cong \mathcal{A}(C_2)$. This will almost always fail for uninteresting reasons. A lattice realization has microscopic traps created by grid anisotropy that have no counterpart in planar diagrams. We therefore use graded notions.

- **Depth-filtered equivalence.** For a threshold $\delta_0$, let $\mathcal{A}_{>\delta_0}(C)$ keep only patterns of depth exceeding $\delta_0$, and only edges with barrier exceeding $\delta_0$. Then $C_1 \sim_{\mathrm{RG}} C_2$ at scale $\delta_0$ if $\varphi$ induces an isomorphism, or more weakly a homomorphism, $\mathcal{A}_{>\delta_0}(C_1) \to \mathcal{A}_{>\delta_0}(C_2)$ that preserves barrier labels up to monotone reparameterization. Shallow, realization-specific traps are filtered out, and deep structure is compared.
- **Statistical universality.** $C_1$ and $C_2$ are statistically equivalent if the asymptotic scaling of basin statistics agrees. In particular, the trapped fraction $f(n, \lambda)$ of Section 9.1 should show the same scaling exponents, even when the individual attractor graphs differ.

Either notion makes precise the claim that thickness and force are regularizations which may fall into a common universality class. Either can also detect the failure of that claim, as happens for friction and twist.

---

## 5. Two conceptual refinements

### 5.1 Slack is not a scalar

It is tempting to measure "amount of slack" by excess length, excess crossings or excess energy. A scalar complexity is a convenient bookkeeping device, used above to orient the dynamics. But a scalar alone loses the phenomenon. What matters is *where* freedom resides and *how it can move*.

Replace the scalar $S(x) \in \mathbb{R}$ with a **slack-accessibility structure**

$$
\mathcal{S}_x = \big(\operatorname{Red}([x]),\ \sim_{\mathrm{neutral}}\big).
$$

Here $\operatorname{Red}([x])$ is the set of *redexes*: local sites, in any representative of the neutral class of $x$, at which a strict contraction applies. The relation $\sim_{\mathrm{neutral}}$ is the transport graph induced by neutral moves. Its edges connect a redex, or a potential redex, in one representative to the site it becomes in another.

Contraction then acts on slack in two ways. It *annihilates* slack where a redex is available, and it *transports* slack along the strand by neutral moves. A region is persistent when no redex is reachable inside it by transport, and nothing inside it can be carried out to where a redex is available.

On this view, a knot is a **defect in the flow of slack**:

$$
\text{loose configuration} \xrightarrow{R} \text{slack expelled outward} \xrightarrow{R} \text{persistent defect}.
$$

Pulling on a cord is incidental to this picture. The underlying phenomenon is *localization under the elimination of redundant freedom*. Polymer physics has observed the physical counterpart directly. Knots in polymers and elastic rods localize, so that the knotted core occupies a small region while the rest of the chain behaves as passive strand (Orlandini and Whittington, 2007; Metzler et al., 2002; Audoly, Clauvelin and Neukirch, 2007; see Section 7.4).

This picture also explains why two configurations with equal total slack can behave quite differently. One may have its slack in transportable form, the other in trapped form.
The shift is from a quantity to a *reachability of reducibility*. A configuration does not "have seven units of slack." It has a structure describing where reductions are possible and how neutral dynamics can carry their availability from place to place.
This raises the possibility that trapping could be detected without running the contraction to completion. Treat the transport graph of $\mathcal{S}_x$ as a network. A persistent region is then one separated from every available redex by a cut that neutral transport cannot cross. Cut-, flow- or connectivity-type invariants of $\mathcal{S}_x$ might predict whether slack can penetrate an active region, and so whether the region will survive. We do not know whether such an invariant exists. If it does, the slogan becomes literal: a knot is a defect in *slack conductivity*.


### 5.2 Order is more primitive than geometry

A cord has an intrinsic order. Its points do not freely exchange positions along it. This suggests building the theory from much less than Euclidean geometry:

$$
(\Gamma, \prec, E),
$$

where $\Gamma$ is an ordered one-dimensional object, $\prec$ its linear or cyclic order, and $E$ an encounter structure. Contraction simplifies $E$ while preserving $\prec$.

If contraction patterns already appear at this level, then three-dimensional embedding, thickness and friction are realizations of a deeper *ordered contraction system*. That holds at least for the frictionless, torsion-free sector. This yields a methodological principle:

> Search for the weakest model in which the phenomenon refuses to disappear.

The toy-model ladder of Section 8 applies this principle directly. Each rung removes structure, and at each rung we ask whether nontrivial contractive patterns survive.

This also explains an analogy with syntax. Two very different loose configurations can contract to the same pattern, much as two expressions with different whitespace and redundant parentheses can reduce to the same normal form. The rewrite rules of $C$ play the role of the reduction grammar. The contraction-stable relational pattern is the irreducible **normal form**. It is therefore natural to separate three levels:

$$
\text{configuration } x \;\longrightarrow\; \text{basin } \mathcal{B} \;\longrightarrow\; \text{pattern } P.
$$

The everyday statement "there is a knot here" refers primarily to $P$.

---

## 6. Basic structural results

The framework is young, but several structural facts follow directly from the definitions and from established results.

**Proposition 1 (Existence of terminal forms).** If $C$ satisfies A1–A2, every configuration has at least one contractive descendant whose class is terminal. Every terminal class is a fixed point of $R_C$, provided $L$ and $N$ are idempotent and preserve terminality componentwise.

*Proof.* By A2, every maximal $\Rightarrow_C$ sequence is finite. Its endpoint admits no strict step anywhere in its neutral class, so contraction acts on it only through neutral moves, which preserve its $\approx$-class. Idempotent localization and normalization then return the same multiset of classes. $\square$

**Proposition 2 (Topological protection implies contractive protection).** If $x \not\sim \mathbf{1}$, then $x$ does not lie in the weak basin of $\mathbf{1}$ for any admissible $C$ whose moves lie inside the realization's notion of topological equivalence.

*Proof.* Every contractive step is in particular a topological equivalence, so $[x] \Rightarrow_C^* [\mathbf{1}]$ would imply $x \sim \mathbf{1}$. $\square$

Proposition 2 is trivial, but it fixes the relationship between the two theories, for every admissible operator compatible with $\sim$:

$$
\boxed{\;\text{topologically protected patterns} \;\subset\; \text{persistent contraction patterns}\;}
$$

Topology supplies an especially strong form of protection. It holds for every admissible operator compatible with the realization's notion of topological equivalence, meaning every operator that never permits a strand passage the topology forbids. An admissible operator that did permit such passages would trivially escape the inclusion. Topological protection does not define the general phenomenon.

**Proposition 3 (Contractive trapping is not an isotopy invariant).** Consider the diagrammatic realization, in which:

- states are knot diagrams;
- contraction consists of the Reidemeister moves $\mathrm{R1}^-$ and $\mathrm{R2}^-$, which strictly decrease the crossing number;
- neutral moves are Reidemeister III moves;
- $\sim$ is ambient isotopy.

In this realization there exist topologically equivalent states $x \sim y$ such that $x$ is contractively trapped and $y$ is not.

*Proof.* Take $y$ to be the standard crossingless diagram of the unknot. Take $x$ to be a *hard unknot* diagram: an unknot diagram such that no diagram in its R3-orbit admits an $\mathrm{R1}^-$ or $\mathrm{R2}^-$ move. Goeritz (1934) gave a classical example, and Kauffman and Lambropoulou (2006) constructed infinite families, including a small diagram they call the "Culprit." $\square$

The same holds for long cords. Cut a hard unknot diagram at a point on an arc of its unbounded face. The resulting long diagram is still trivial, because a long knot is trivial exactly when its closure is. It still admits no simplifying move, because every move of the long diagram is a move of the closed one. Long hard unknots therefore exist, and they are the finite-depth traps of the open-cord regime.

**Proposition 4 (Contraction is non-confluent within a topological class).** In the diagrammatic realization of Proposition 3, taken modulo R3, the reduction $\Rightarrow_C$ is not confluent. Some unknot diagram has two contractive descendants in distinct terminal $\approx$-classes.

*Proof.* We work with $\Rightarrow_C$ on R3-classes, as in Section 4.2. A rewriting system modulo an equivalence is *Church–Rosser* if any two elements equivalent under the symmetric closure of the rewrite relation, together with the equivalence, have a common reduct modulo that equivalence. For abstract rewriting systems, the Church–Rosser property is equivalent to confluence unconditionally. Termination is not needed for this equivalence (Baader and Nipkow, 1998). Termination is what Newman's lemma requires to pass from local to global confluence (Newman, 1942).

The symmetric closure of contraction together with neutral moves is the full set of Reidemeister moves, which generates ambient isotopy of diagrams. A hard unknot $H$ and the trivial diagram $O$ are therefore equivalent under this closure. Both are terminal modulo $\approx$. They lie in distinct $\approx$-classes, because $O$ has no crossings and R3 preserves the positive crossing number of $H$. So they have no common reduct, and the system is not Church–Rosser, hence not confluent.

Termination enters only at the last step. A non-confluent terminating system has a peak $[z] \Leftarrow_C^* [u] \Rightarrow_C^* [z']$ whose branches cannot be joined. Reducing both branches to normal forms gives two distinct terminal classes below a single state. $\square$

Termination buys more. By Huet's criterion for terminating rewriting modulo an equivalence (Huet, 1980; Jouannaud and Kirchner, 1986), global Church–Rosser follows from two local conditions. One is local confluence modulo $\approx$. The other is local coherence between contractions and $\approx$-steps. Since the global property fails, one of the local ones must fail.

Concretely, the bifurcation of basins is generated by finitely describable local configurations of two kinds:

- *critical pairs*, in which overlapping $\mathrm{R1}^-$ and $\mathrm{R2}^-$ redexes compete for shared crossings;
- *coherence peaks*, in which an R3 move and a contraction interfere.

Basins are not separated by some diffuse global property. The separation is generated by specific local conflicts. These conflicts can be enumerated, and their resolution or non-resolution can be catalogued.

Proposition 4 is the formal heart of the basin picture. A single topological class splits into *several contractive basins*, and which basin a configuration lands in depends on its geometry, not only its type. Knot energies show the same phenomenon in continuous form, where distinct embeddings of one knot type can descend to distinct local minima. Because Proposition 4 is a property of rewriting rather than of energies, it holds independently of any choice of functional.

**Remark (bounded depth, decidability and tractability).** For unknot diagrams, depth is finite by Reidemeister's theorem. Hass and Lagarias (2001) gave the first explicit bound on the number of moves needed to unknot. Lackenby (2015) improved it to a polynomial bound, at most $(236c)^{11}$ moves for a diagram with $c$ crossings, with intermediate diagrams of polynomially bounded complexity. So in this realization contractive depth is at most polynomial in the size of the configuration, and it is decidable.

Decidability is not tractability. A search bounded by $(236c)^{11}$ is far beyond any computation. In practice, depth must be computed with a budget (Section 8.4). Whether typical depth, as opposed to worst-case depth, grows, saturates or undergoes a transition as size increases is open. It is exactly the kind of question the framework raises.

---

## 7. Related work and the location of the gap

Many fields touch the proposed object. Each chooses a primitive that is wrong for the purpose at hand. We review them in order of proximity.

### 7.1 Hard unknots and recalcitrance

The clearest evidence that topological type and contraction behavior are different classifications comes from hard unknot diagrams. Goeritz's 1934 example already showed that an unknot diagram may require an increase in crossings before it can be simplified. Kauffman and Lambropoulou (2006) constructed infinite families of such diagrams and called the obstruction *recalcitrance*.

This is an exact diagrammatic instance of a contractively trapped state, $x \sim \mathbf{1}$ with $[x] \not\Rightarrow^*_C [\mathbf{1}]$. Studies of the graph of diagrams connected by Reidemeister moves, and of the barriers that must be crossed to unknot, supply the corresponding landscape picture.

What is missing is the treatment of the hard diagram as an *attractor* with a basin, rather than as an isolated curiosity, together with localization and normalization.
The empirical substrate for that treatment has recently grown large. Applebaum et al. (2024) used reinforcement learning to search for unknotting sequences and report a dataset of roughly 2.6 million distinct hard unknot diagrams, most with fewer than 35 crossings. Traditional classification treats such diagrams simply as hard examples. The present framework asks what structure lies inside the collection: how the diagrams distribute over depths, basins and barrier patterns (Section 8.4).


### 7.2 Gordian unknots

Pieranski, Przybyl and Stasiak (2001) used simulations to construct closed tubes of finite length and thickness that are topologically trivial but cannot be deformed into a round circle without violating the thickness constraint. They pointed out explicitly that topologically equivalent conformations need not be mutually accessible under geometric restrictions. In our language:

$$
\text{ambient isotopy class} \;\supsetneq\; \text{dynamically accessible component}.
$$

This is very close to the present thesis, and it is the closed-loop regime of Section 3 realized physically. But it is realized through a particular excluded-volume model. The missing step is to quotient away thickness as one microscopic regularization among many.

### 7.3 Ideal knots, ropelength and knot energies

The ideal-knot and ropelength programs study scale-normalized minimization of $\operatorname{Rop}(\gamma) = \operatorname{Len}(\gamma) / \operatorname{Thick}(\gamma)$ within a fixed knot type (Katritch et al., 1996; Gonzalez and Maddocks, 1999; Cantarella, Kusner and Sullivan, 2002). Self-repulsive energies give alternative tightening and untangling flows. Examples include O'Hara's energies (O'Hara, 1991) and the Möbius energy (Freedman, He and Wang, 1994).

These programs supply several ingredients the present theory needs:

- descent dynamics;
- scale normalization;
- stationary shapes;
- localization through contact constraints;
- numerically observed local minima.

Numerical experiments with self-repulsive flows have repeatedly found complicated diagrams of simple knots and unknots that fail to relax to their simplest forms. These include experiments carried out with interactive tools such as KnotPlot (Scharein, 1998). The experiments also suggest that the failures are fairly insensitive to the details of the repulsion law, which is an informal universality observation.

What these programs still do is take the knot type as the filing cabinet and ask how an energy behaves inside each drawer. The present proposal lets the contraction dynamics define the filing cabinet and treats topology as metadata.

### 7.4 Polymer knots and physical knot mechanics

Polymer physics has long known that knots in long chains *localize*. The knotted core is confined to a small portion of the chain, while the remainder fluctuates as unknotted strand (Orlandini and Whittington, 2007). Flat or adsorbed knots tighten into small regions for entropic reasons (Metzler et al., 2002). In elastic rods under tension, the shape of a tight knot is governed by a localized core region joined to straight tails (Audoly, Clauvelin and Neukirch, 2007). These results are the physical ground for Section 5.1. They show directly that slack is expelled and a defect remains. They do so inside a fixed knot type and a fixed physical model.

Physical studies of knots also acknowledge that topology is inadequate. Patil et al. (2020) showed that the mechanical stability of knots and tangles cannot be predicted from basic topological observables such as crossing number. They proposed rules combining topology with twist, writhe and friction. They also observed that no comprehensive mathematical theory yet connects the topological and mechanical properties of knotted elastic structures. Older work on ropes and frictional contact (for example, Maddocks and Keller, 1987) explains how frictional knots hold. Work on frictional knot mechanics characterizes self-locking, where a knot holds under finite load with no restraining force at the far end.

This literature studies nearly the right phenomenon at the wrong level of abstraction. It asks what makes a given material knot hold. It does not ask what equivalence class of directed contraction operators produces a given stable pattern. It also supplies the clearest evidence that friction and twist are *relevant* parameters, which we take up in Section 9.3.

### 7.5 Tangles and knotoids

Tangles (Conway, 1970) are arcs in a ball with fixed boundary points. Knotoids (Turaev, 2012) are open-ended diagrams with forbidden endpoint moves. Both remove the artificial closure that makes the overhand knot disappear. Both give a natural *state representation* for a localized active region:

$$
\text{active pattern inside a ball } B \;+\; \text{passive continuation outside } B.
$$

Both, however, remain equivalence theories under permitted isotopies. They supply the representation but not the dynamics.

### 7.6 Geometric flows

Curve-shortening flow repeatedly reduces length. In the plane, a smooth embedded closed curve stays embedded and shrinks to a round point (Gage and Hamilton, 1986; Grayson, 1987). On surfaces, curve shortening and related monotone homotopies carry curves to minimal position without ever increasing self-intersection (Hass and Scott, 1994). This is a confluence-type result for a flat setting, and we return to it in Section 8.3.

The theory of such flows has exactly the formal structure we want: self-similar solutions, singularity blow-ups and normalized rescaled flows, which amounts to $R = \text{rescale} \circ \text{contract} \circ \text{localize}$. But unconstrained curve shortening deliberately smooths away all relational organization. It has no nonlocal constraint that lets one segment obstruct another. Adding naive self-avoidance brings back thickness.

The mathematical object suggested here is a **nonlocal, order-preserving geometric flow whose singularity blow-ups encode tangling patterns**. That is a more precise target than "physical knot theory."

### 7.7 Jamming and inherent structures

Jamming theory (Liu and Nagel, 1998) studies configurations that cannot continue in an imposed direction of motion without first moving back from a constraint boundary. The decomposition of a landscape into basins of *inherent structures*, the local minima reached by steepest descent (Stillinger and Weber, 1982), is the closest physical analogue of the terminal patterns and basins of Section 4.4. Contraction patterns are a one-dimensional, *ordered* version of this:

$$
\text{decreasing available slack} \;\Longrightarrow\; \text{loss of accessible reduction paths}.
$$

Conventional jamming concerns assemblies of particles or extended media. Preserving strand order turns it into a highly structured, sequential problem. One concise formulation of the present thesis, in the frictionless sector, is:

> A knot is a jammed state of an ordered one-dimensional continuum under a contraction semigroup.

### 7.8 Summary

| Literature | Captures | Misses |
|---|---|---|
| Hard unknots | Simplification may require prior complication | Spatial contraction, localization, basins |
| Gordian unknots | Topologically trivial but geometrically trapped states | Universality beyond thickness |
| Ropelength and knot energies | Normalized tightening, local minima | Classification independent of knot type |
| Polymer knot localization | Slack expulsion, localized cores | Directed, type-independent classification |
| Physical knot mechanics | Locking, tightening, stability | Abstract operator classification |
| Tangles and knotoids | Localized or open patterns with boundary data | Directed reduction |
| Geometric flows | Contraction, rescaling, self-similar forms | Nonlocal self-obstruction |
| Jamming and inherent structures | Directed irreducibility, metastability, basins | Ordered filamentary structure |

We have not found a program that does all of the following at once:

- admits both globally knotted and globally unknotted carriers;
- treats the localized pattern, rather than the entire embedding, as primary;
- defines a directed slack-removal operator and normalizes after contraction;
- classifies terminal patterns and basins of that operator;
- treats topology as one optional invariant;
- studies universality across microscopic contraction rules.

The ingredients are not new. The synthesis appears to be.

---

## 8. Minimal toy models

Before committing to a continuous formulation, we want to find out whether a genuine mathematical species is present. The approach is to construct the smallest possible universes in which the phenomenon might occur and to enumerate them exhaustively. We propose a ladder of three models, ordered by decreasing structure. All three sit in the frictionless, torsion-free limit of Section 2.

Boundary conditions matter, as Section 3 showed. Models A and B are formulated on open long cords. Here an overhand knot is a topologically protected long trefoil ($\delta = \infty$), and the finite-depth traps are long hard unknots. Closed variants, cyclic Gauss words and lattice polygons, are obtained by replacing the linear order with a cyclic one. They are the setting for closed-loop trapping.

### 8.1 Model A: diagrammatic long cords

**States.** A long cord diagram is an immersion of a line in the plane, straight outside a compact set, with transverse double points decorated by over/under information. Combinatorially, it is a *signed Gauss word*. This is a finite sequence of letters $O_i^{\epsilon_i}$ and $U_i^{\epsilon_i}$, one of each for every crossing $i$, read in order along the cord. Each crossing carries a sign $\epsilon_i \in \{\pm 1\}$. The trivial pattern $\mathbf{1}$ is the empty word.

**Complexity.** $c(x)$ is the number of crossings.

**Contractive moves.** We use $X, Y$ for the two letters $\{O, U\}$ in either order, and $\alpha, \beta, \gamma$ for arbitrary, possibly empty, subwords.

- $\mathrm{R1}^{-}$ removes a kink, whose two letters are adjacent:
  $$
  \alpha\, X_i^{\epsilon} Y_i^{\epsilon}\, \beta \;\to\; \alpha\beta.
  $$
- $\mathrm{R2}^{-}$ removes a bigon. One strand passes over the other at two crossings of opposite sign, so the over-letters form one adjacent pair and the under-letters form another, disjoint, adjacent pair. The two pairs may be far apart in the word, and either may come first:
  $$
  \alpha\, O_i^{\epsilon} O_j^{-\epsilon}\, \beta\, U_i^{\epsilon} U_j^{-\epsilon}\, \gamma \;\to\; \alpha\beta\gamma,
  \qquad
  \alpha\, O_i^{\epsilon} O_j^{-\epsilon}\, \beta\, U_j^{-\epsilon} U_i^{\epsilon}\, \gamma \;\to\; \alpha\beta\gamma,
  $$
  together with the same templates with the under-pair preceding the over-pair.

**Neutral moves.** $\mathrm{R3}$, the triangle move, which permutes the letters of three crossings in the standard way.

**Expansive moves.** $\mathrm{R1}^{+}$ and $\mathrm{R2}^{+}$, the inverses of the above. They are not used in the contractive dynamics. They are used only to define $\sim$ and depth.

**Localization.** Call a contiguous interval of the word *isolated* if every crossing with one letter inside the interval has both letters inside it. Connected summands of a long cord correspond to isolated intervals.

These summands need not be concatenated. A summand can sit *nested* inside an arc of another, $w = w_1'\, w_2\, w_1''$ with $w_2$ isolated. Factoring by concatenation alone would miss this. $L$ therefore repeatedly excises minimal nonempty isolated intervals, each of which becomes a component, and continues on the remainder. It returns the resulting multiset of indecomposable patterns. This captures "a knot here and another there" on a single cord, including "a knot tied inside another knot's arc."

**Normalization.** Canonical relabeling: choose the lexicographically least relabeling within the R3-orbit of each component.

**Noninvertibility.** $\mathrm{R1}^{-}$ forgets the position and sign of the kink. Many configurations map to one.

Model A contains contractive trapping by Proposition 3, in its long form, and it is not confluent by Proposition 4. It is entirely finitary, so every small configuration can be enumerated.

**Realizability as a dial.** The rewrite templates above are purely syntactic. They are *identical* for classical and virtual long knots. Planar realizability is a restriction on the state space, and the set of realizable words is closed under $\mathrm{R1}^-$, $\mathrm{R2}^-$ and $\mathrm{R3}$. Dropping the restriction gives the theory of long virtual knots, in which non-realizable encounters are tolerated as virtual crossings that carry no encounter data.

This has two consequences. Conceptually, whether trapped patterns persist, multiply or disappear in the virtual setting is a first test of the weakest-model principle. Computationally, realizability need not be checked at every step. One can enumerate the virtual model and test planarity only on the resulting terminal patterns and their basins. Section 8.4 exploits this.

**Framed extension.** Model A as stated allows $\mathrm{R1}^-$ unconditionally, which is precisely the frictionless, torsion-free assumption. Replacing it with framed Reidemeister moves, which conserve writhe plus twist, gives a framed Gauss-word model. Weighting encounters by a capstan-type holding strength gives a frictional one. These extensions are the discrete entry points to the relevant sectors of Section 9.3.

### 8.2 Model B: lattice cords

**States.** Open self-avoiding walks on the cubic lattice $\mathbb{Z}^3$. Each end is attached to a straight ray along the $x$-axis that extends to infinity. A ray is passive by definition. The attachment points are not fixed. When a $-2$ move shortens the active walk next to an end, the ray is extended along the axis to meet it. Equivalently, straight bonds collinear with a ray at the end of the walk are reassigned to the ray. The passive rays therefore slide inward and absorb eliminated length.

Self-avoidance here is the minimal discrete form of order preservation, not a material thickness: the realization has no adjustable radius. A closed variant uses lattice polygons.

**Complexity.** $c(x)$ is the number of bonds in the non-straight part.

**Moves.** The BFACF move set (Berg and Foerster, 1981; Aragão de Carvalho, Caracciolo and Fröhlich, 1983):

- *neutral* moves, which flip a corner across a unit square;
- *length-changing* moves, which replace a single bond with a three-bond U-shape ($+2$) or the reverse ($-2$).

The contractive dynamics uses neutral and $-2$ moves only.

**Localization.** $L$ restricts to the minimal subwalk containing all non-straight bonds and reattaches straight rays.

**Normalization.** Translation to a canonical position, then the least representative under the lattice symmetry group.

Model B is valuable for three reasons.

First, the full BFACF move set is ergodic within each knot type for lattice polygons (Janse van Rensburg and Whittington, 1991). This gives a precise baseline. With expansion allowed, every state of a given type is connected, so any failure of the contractive dynamics to connect states is attributable to directionality alone.

That the restricted $(-2, 0)$ dynamics is *not* ergodic is already known to the lattice polymer literature, which records configurations that are trapped or frozen under restricted move sets (Madras and Slade, 1993; Janse van Rensburg and Whittington, 1991). Related experience comes from BFACF-based searches for minimal lattice knots (Scharein et al., 2009). The contribution here is not the existence of such states. It is their treatment as attractors with basins, depths and barriers that can be compared across realizations.

Second, the model makes the slack-transport picture of Section 5.1 concrete. A U-shaped kink is a unit of slack. Neutral moves carry it along the cord. A $-2$ move annihilates it. A persistent pattern is a region that kinks can neither enter in annihilable form nor carry anything out of.

Third, contractive terminal states of Model B that are topologically trivial are lattice analogues of Gordian unknots, obtained without any thickness parameter. In the closed variant, these include overhand configurations whose closing arc cannot sweep across the tangle without first lengthening. That is the closed-loop regime of Section 3.

### 8.3 Model C: ordered encounter systems

**States.** Triples $(\Gamma, \prec, E)$ in which $\Gamma = \{1, \dots, n\}$ with its linear order, and $E$ is a set of encounters. Each encounter is an unordered pair $\{p, q\}$ of positions carrying a label from a small alphabet. With labels "over/under plus sign," this is virtual Model A. With a single label, it is the *flat* case: crossings with no over/under information, that is, flat Gauss words.

**Contractive moves.** Local rewrite rules of three kinds, each the analogue of a Reidemeister move:

- deletion of an encounter whose endpoints are adjacent in $\prec$ (the analogue of R1);
- deletion of two encounters that form a nested adjacent pair with compatible labels (the analogue of R2);
- neutral exchange rules (the analogue of R3).

Model C is the bottom rung. It asks whether contraction patterns exist when there is no geometry at all, only order and encounter. If they do, the phenomenon is fundamentally combinatorial. If they appear only once over/under data is present, then the over/under distinction is the minimal carrier of obstruction. Either outcome is informative.

The flat rung is not virgin territory. Several results bear directly on whether monotone reduction of flat curves can get stuck:

- Hass and Scott (1994) showed that curves on surfaces with excess self-intersection can be brought to minimal position by homotopies that never increase self-intersection.
- Homotopy invariants and reduction of Gauss words have been studied by Gibson (2011).
- Detection of nontriviality for virtual strings has been studied by Kadokami (2003).
- Minimal self-intersection of virtual strings has been studied through cobracket-type invariants by Cahn (2017).

These results do not settle the question for the exact move set of Model C. But they suggest that flat systems may be close to confluent, and that trapping, if it appears, may need labeled encounters to turn on.

### 8.4 Enumeration protocol

For each model and each size bound $n$, the protocol is as follows.

1. **Enumerate** all states of complexity at most $n$, modulo the model's symmetries and neutral equivalence.
2. **Build the contraction graph** $G_n = (\mathcal{E}_{\le n}/{\approx}, \Rightarrow_C)$: a directed graph on neutral classes with an edge for each strict contraction.
3. **Find terminal classes.** These are the sinks of $G_n$. Separate trivial sinks from nontrivial ones.
4. **Compute basin profiles.** For every state, record the set of terminal classes reachable from it, which gives weak basin membership. Record whether that set is a singleton, which gives strong basin membership. Under a uniform random scheduling of moves, also record the distribution over terminal classes.
5. **Compute budgeted depth.** Exact depth is decidable in Model A by the bounds cited in Section 6, but those bounds are far beyond practical search. We therefore compute the *truncated depth*
   $$
   \delta_{\le M}(x) = \begin{cases} \delta(x) & \text{if } \delta(x) \le M, \\ {>}M & \text{otherwise,} \end{cases}
   $$
   for each nontrivial sink. This is done by breadth-first search, or SAT-based search, over the full move graph with an excess ceiling $M$, typically $M \in \{1, 2, 3, 4\}$. Truncated depth is exactly the budgeted reachability of Section 9.1, so step 5 measures $f(n, \lambda = M)$ directly.
6. **Build the attractor graph** $\mathcal{A}(C)$, with directed barrier labels $\Delta(P \to Q)$ computed under the same budget.
7. **Perturb the rules.** Delete, restrict or add individual contractive moves and record how sinks, basins and $\mathcal{A}(C)$ change. Rule changes that leave $\mathcal{A}_{>\delta_0}(C)$ invariant are irrelevant perturbations in the RG sense. Those that change it are relevant.
8. **Compare across rungs.** Look for coarse-graining maps $\varphi$ under which depth-filtered attractor graphs or basin statistics correspond. An example is the map from Model B lattice cords to their planar projections in Model A.

**A minimal first study.** The cheapest informative experiment uses a *virtual first, planar filter second* pipeline. Enumerate Model C (flat Gauss words) and virtual Model A (signed Gauss words, no realizability check) up to $n = 10$ crossings, with budgeted depth $\delta_{\le M}$ for $M \le 3$. Then apply the planar-realizability test only to the resulting terminal sinks and their basins.

This avoids the planarity bottleneck during enumeration and answers Open Problem 1 directly. It also shows where along the ladder (flat $\to$ virtual $\to$ classical planar) contractive trapping first turns on. Since the smallest known classical hard unknots have on the order of ten crossings, the classical rung should first show trapping near the top of this range. Virtual trapping, if it exists, may appear well below it.

**A corpus study.** A complementary experiment needs no new enumeration. Take an existing corpus of hard unknot diagrams, such as that of Applebaum et al. (2024). Map each diagram $H$ to a contractive signature
$$
H \;\longmapsto\; \big(\delta_{\le M}(H),\ |\mathcal{B}^{\mathrm{weak}}(H)|_{\le n},\ |\mathcal{B}^{\mathrm{strong}}(H)|_{\le n},\ \text{critical-pair signature},\ \text{features of } \mathcal{S}_H\big),
$$
where basin sizes are counted among diagrams up to a size bound $n$. Then cluster the signatures.

The corpus might collapse into fifty contraction species, or fifty thousand, or show no useful structure at all. Each outcome is informative. One caution applies before the corpus is used. The criterion by which a diagram counts as "hard" in such a dataset must be checked against the move set of Model A, which is applied modulo R3. Diagrams that are hard under one convention need not be terminal under another.

**Staging.** The experimental program falls into three stages.

1. **Fixed encounter structure.** Models A–C, run as above, test whether contraction yields a useful taxonomy at all.
2. **Operator ecology.** Families of operators $C_i$ are generated by step 7. Their attractor graphs $\mathcal{A}(C_i)$ are computed and clustered under depth-filtered equivalence, to find out whether actual universality classes exist.
3. **Emergent encounter structure.** Only after the first two stages does it make sense to let the encounter structure itself evolve (Open Problem 11).

This protocol is suited to automated discovery. Millions of small proto-knots can be enumerated, quotiented and analyzed, and the unusual survivors examined by hand. We report no enumeration statistics here. The protocol is stated so that its results can confirm or refute the program. In this sense the paper is one experiment short of its own test. Even a modest census would turn a proposed classification into an observed one. For example, it could list the first nontrivial terminal patterns of Model C, their basin sizes and their depth spectrum, through small size.

### 8.5 A worked trace

To make the operator concrete, we follow one configuration through $R_C = N \circ L \circ C$ in Model A.

Let $T = O_1 U_2 O_3 U_1 O_2 U_3$, with all signs $+1$, be the standard right-handed long trefoil. Form a long cord carrying three features:

- a second trefoil, tied inside an arc of the first;
- a nested pair of curls;
- the outer trefoil itself.

The word is

$$
x \;=\; O_1\, U_2\, \underbrace{O_7 U_8 O_9 U_7 O_8 U_9}_{\text{inner trefoil}}\, O_3\, \underbrace{O_4 O_5 U_5 U_4}_{\text{curls}}\, U_1\, O_2\, U_3, \qquad c(x) = 11.
$$

- **First round.** The letters $O_5 U_5$ are adjacent, so $\mathrm{R1}^-$ removes crossing $5$. No other redex is present.
- **Second round.** Now $O_4 U_4$ are adjacent, and $\mathrm{R1}^-$ removes crossing $4$. The word is $O_1 U_2\, O_7 U_8 O_9 U_7 O_8 U_9\, O_3 U_1 O_2 U_3$, with $c = 9$.
- **Localization.** The interval $O_7 \cdots U_9$ is isolated, since all of crossings $7, 8, 9$ have both letters inside it. It is *nested* inside the outer trefoil rather than concatenated with it, so a factorization by concatenation alone would not see it. Excising it leaves $O_1 U_2 O_3 U_1 O_2 U_3$.
- **Normalization.** Relabeling gives the multiset $\{T, T\}$.

Both components are terminal: the standard trefoil word admits no $\mathrm{R1}^-$, $\mathrm{R2}^-$ or $\mathrm{R3}$ move. Both are topologically protected, so $\delta = \infty$.

The trace exhibits the cascade of slack removal, with the second curl becoming available only after the first is gone. It also exhibits localization into a multiset, and the nested case that motivated isolated intervals.

The finite-depth case follows the same steps. Replace the inner trefoil by a long hard unknot $H$, obtained by cutting a small Kauffman–Lambropoulou diagram such as the Culprit at an outer arc as in Section 6. The same trace then ends at the multiset $\{T, H\}$. The component $H$ is terminal, since no member of its R3-orbit has a redex. But $H \sim \mathbf{1}$, so it is contractively trapped with finite positive depth.

The unknotting sequences exhibited by Kauffman and Lambropoulou begin with crossing-increasing moves, and $\delta(H)$ is the minimal excess over all such sequences. Computing it, and the barriers from $H$ to its neighboring patterns in $\mathcal{A}(C)$, is precisely what step 5 of the protocol does with a small budget $M$. We do not report a value here.

Note what the trace shows about depth for non-terminal states. Before contraction, the two curls carried two units of slack. The original configuration $x$ can spend those units on unlocking $H$, so its depth is smaller than $\delta(H)$ by up to two. This is why the trichotomy of Section 4.5 is stated for terminal patterns.

---

## 9. Phases, hierarchy and protected sectors

### 9.1 Phases of knottedness

The binary distinction between contraction and expansion is the end point of a continuum. Introduce a parameter $\lambda$ that governs how much expansion is tolerated. It might be the excess budget $k$ in a budgeted reachability relation $x \to_k y$, meaning that $y$ is reachable from $x$ by a path whose excess never exceeds $k$. This is exactly the truncated depth of step 5 in Section 8.4. It might also be the probability of accepting an expansive move in a stochastic dynamics. Then:

- at $\lambda = 0$ the dynamics is purely contractive and has many nontrivial basins;
- as $\lambda \to \infty$ the dynamics becomes reversible and the basins merge into topological classes.

Define $f(n, \lambda)$ as the fraction of random configurations of size $n$ that end in a nontrivial pattern despite being topologically trivial. Suppose $f$ shows a sharp crossover at some $\lambda_c(n)$, and the crossover has scaling behavior as $n$ grows. Then knottedness behaves like a **phase** of the reduction dynamics, and $\lambda$ is a control parameter.

Universality then becomes testable in its statistical form (Section 4.6). Very different microscopic rules, such as Models A and B or a continuous thick-tube flow, should show the same transition and the same scaling exponents if they belong to one class.

### 9.2 Hierarchy

Patterns can contain patterns. Because $C$ acts one round at a time and $L$ returns multisets, a composite pattern may split progressively, as contractions sever the encounters that bridged its sub-regions:

$$
P \;\xrightarrow{R}\; \{P_1, P_2\} \;\xrightarrow{R}\; \{P_{11}, P_{12}, P_2\} \;\to\; \cdots
$$

Alternatively, it may persist as an indivisible unit at one stage and resolve into parts at another. This suggests a taxonomy of knots by *renormalization flow*: the tree of sub-patterns a configuration generates under iterated contraction and localization. In the topologically protected sector, this tree is related to connected-sum decomposition into prime knots, with isolated intervals as its diagrammatic shadow. In the contractively protected sector, it is an entirely new structure.

### 9.3 Protected sectors

The framework suggests a stratification of persistent patterns by the *kind* of protection they have.

- **Contractive protection.** Eliminating the pattern requires temporary expansion. It holds for the purely contractive dynamics, with finite positive depth. Hard unknots and Gordian unknots live here.
- **Operator-specific protection.** The pattern persists under some admissible operators but not others. These patterns are where relevant perturbations separate universality classes.

Friction and twist belong to the third sector, and they are its most important physical instances.

- A slipknot or a capstan hitch is contractively trivial in the frictionless models. Pull the free end and it falls apart. Yet it is a stable fixed point once the friction coefficient exceeds a critical value $\mu_c$ set by the capstan relation.
- A supercoiled plectoneme is removed by unconditional $\mathrm{R1}^-$. It becomes stable once twist is conserved and Călugăreanu's theorem forces the twist into writhe.
- Reef and granny knots are distinct composite long knots in every model. However, the large difference in how well they hold, one of the oldest observations in knot mechanics, is invisible to frictionless dynamics.

These are not small corrections to a fixed attractor graph. They add vertices and edges to it. Friction and twist are therefore relevant parameters in the precise sense of Section 4.6, and the frictionless, torsion-free models of Section 8 describe one end of their range.

The framed and capstan-weighted extensions of Model A (Section 8.1) are the natural discrete probes of this sector. Through them the theory can reconnect, on its own terms, with Kirchhoff rod mechanics and with the empirical rules of Patil et al. (2020).
**Contractive charge.** The stratification can be made quantitative through a notion of charge. Suppose a terminal pattern $P$ cannot disappear under monotone dynamics. Then something localized at $P$ must be carried along an expansive path before $P$ can be annihilated. Call it the *contractive charge* $Q_C(P)$.
It need not be numerical. It might take values in a group, a monoid, a homology class of the contraction graph or a formal language, whichever the reduction system makes natural. The three sectors then correspond to three kinds of charge:
- *topological charge*, preserved by every legal move, expansion included;
- *contractive charge*, preserved only under monotone reduction;
- *operator-relative charge*, preserved only for some operators $C$.
On this reading, depth is the cost of discharging contractive charge. Topological charge cannot be discharged at whatever cost.


Classical invariants such as the Alexander and Jones polynomials answer the question "can deformation erase this?" Contractive knot theory asks "what survives the systematic elimination of freedom?" These are different questions, and the second contains the first as its most rigid sector.

---

## 10. Open problems

1. **Minimal carriers.** What is the weakest rung of the model ladder, in terms of order, encounter type and labeling, at which nontrivial contractively trapped patterns occur? Do they occur in flat (unlabeled) ordered encounter systems, or do the monotone-simplification results for flat curves and Gauss words (Hass and Scott, 1994; Gibson, 2011; Cahn, 2017) extend to show that flat contraction is effectively confluent? The minimal first study of Section 8.4 is designed to answer this.
2. **Small-size census.** In Model A, what are the smallest contractively trapped long-cord diagrams modulo R3? Are they all obtained by cutting known closed hard unknots? How are their weak and strong basins distributed among diagrams of slightly larger size? Into how many contraction species does a large corpus of known hard unknots (Applebaum et al., 2024) fall?
3. **Typical versus worst-case depth.** Worst-case depth in Model A is polynomially bounded. How does the typical depth of random trivial configurations scale with size? How much of the distribution is visible at small budgets $M$?
4. **Lattice Gordian states.** In Model B and its closed variant, what is the smallest topologically trivial lattice cord that is a nontrivial contractive terminal state? How does the density of such states grow with length?
5. **Universality.** Is there a coarse-graining map from Model B to Model A under which depth-filtered attractor graphs correspond? Do continuous thick-tube flows fall into the same statistical class?
6. **Phase structure.** Does $f(n, \lambda)$ show a sharp transition with scaling behavior? Are the exponents rule-independent?
7. **Relevant parameters.** In framed and capstan-weighted versions of Model A, how do terminal patterns and barriers change as twist conservation is imposed and the friction threshold is varied? Is there a minimal discrete model in which slipknots and hitches become fixed points?
8. **Continuous formulation.** Is there a nonlocal, order-preserving geometric flow whose normalized singularity profiles are the contraction patterns, so that the discrete terminal patterns become self-similar blow-ups?
9. **Invariants of basins.** Can basins be detected by computable invariants, analogous to knot polynomials but sensitive to direction? One candidate is directed homology of the contraction graph. Another is invariants of the critical pairs that generate basin bifurcations. A third is cut- or flow-type invariants of the slack-accessibility structure (Section 5.1). Can the contractive charge of Section 9.3 be realized as a computable invariant?
10. **Non-filamentary realizations.** Do the same structures occur in systems that do not resemble string at all, such as rewriting systems on sequences, molecular folding pathways, or order-preserving compression of words?
11. **Emergent encounter structure.** In every model here, the encounter structure $E$ is part of the given configuration. What happens if it evolves instead, $E_{t+1} = F(\Gamma, \prec, E_t, s_t)$, with $s_t$ a local state on the carrier? Persistent patterns would then be coupled states $(P, E_P)$ satisfying $R(P, E_P) \cong (P, E_P)$. Such patterns would not be embedded in a connectivity. They would maintain the connectivity on which they depend. Neutral dynamics would generally no longer have finite orbits, and the closure-based notion of terminality of Section 4.2 would be required. This changes the ontology of the theory and belongs to separate work.

---

## 11. Conclusion

The phrase "physical knot" brings rope, friction, thickness, force and three-dimensional space into the theory, and with them the assumption that a knot is fundamentally a material object. This paper has argued for a cleaner starting point. A knot, in the everyday sense, is a persistent form of a directed reduction. It is what remains when redundant freedom is systematically eliminated from an ordered one-dimensional pattern and the result is normalized for comparison.

On this view, thickness is order preservation, force is orientation, the erasure of history is noninvertibility, tightening is iteration, and jamming is arrival at a terminal pattern. Friction and twist do not disappear into this dictionary. They return as relevant parameters that create protected sectors of their own.

The formal consequences are concrete.

- Contraction is a preorder, best treated as rewriting modulo neutral moves on multisets of local patterns.
- It is non-confluent even within a single topological class. Each class divides into overlapping basins, whose separation is generated by local critical pairs.
- Topological knotting is the most rigidly protected sector of a larger family of persistent patterns.
- The theory can be tested immediately on small, finitary models by exhaustive enumeration with budgeted depth. Universality is a falsifiable claim rather than a slogan.

The census may also overturn the motivating picture. In realizations richer than the terminating ones studied here, enumeration might find other species alongside stationary terminal patterns: oscillating, propagating, splitting or confined ones. Knots would then turn out not to be the general object at all. They would be one species, the stationary localized one, in a broader zoology of directed reduction. That outcome would vindicate the abstraction boundary. We would have started with rope and removed it.

A suitable name for the program is **contractive knot theory**, and a suitable name for its primitive object is the **contraction pattern**. Neither name commits the theory to string. That is deliberate, because the same mathematics may turn out to describe systems that look nothing like a piece of rope.

---

## References

- Aragão de Carvalho, C., Caracciolo, S., and Fröhlich, J. (1983). Polymers and $g|\phi|^4$ theory in four dimensions. *Nuclear Physics B*, 215, 209–248.
- Audoly, B., Clauvelin, N., and Neukirch, S. (2007). Elastic knots. *Physical Review Letters*, 99, 164301.
- Baader, F., and Nipkow, T. (1998). *Term Rewriting and All That*. Cambridge University Press.
- Berg, B., and Foerster, D. (1981). Random paths and random surfaces on a digital computer. *Physics Letters B*, 106, 323–326.
- Cahn, P. (2017). A generalization of Turaev's virtual string cobracket and self-intersections of virtual strings. *Communications in Contemporary Mathematics*, 19, 1650053.
- Cantarella, J., Kusner, R. B., and Sullivan, J. M. (2002). On the minimum ropelength of knots and links. *Inventiones Mathematicae*, 150, 257–286.
- Conway, J. H. (1970). An enumeration of knots and links, and some of their algebraic properties. In *Computational Problems in Abstract Algebra*, Pergamon, 329–358.
- Freedman, M. H., He, Z.-X., and Wang, Z. (1994). Möbius energy of knots and unknots. *Annals of Mathematics*, 139, 1–50.
- Gage, M., and Hamilton, R. S. (1986). The heat equation shrinking convex plane curves. *Journal of Differential Geometry*, 23, 69–96.
- Gibson, A. (2011). Homotopy invariants of Gauss words. *Mathematische Annalen*, 349, 871–887.
- Goeritz, L. (1934). Bemerkungen zur Knotentheorie. *Abhandlungen aus dem Mathematischen Seminar der Universität Hamburg*, 10, 201–210.
- Gonzalez, O., and Maddocks, J. H. (1999). Global curvature, thickness, and the ideal shapes of knots. *Proceedings of the National Academy of Sciences*, 96, 4769–4773.
- Grandis, M. (2009). *Directed Algebraic Topology: Models of Non-Reversible Worlds*. Cambridge University Press.
- Grayson, M. A. (1987). The heat equation shrinks embedded plane curves to round points. *Journal of Differential Geometry*, 26, 285–314.
- Hass, J., and Lagarias, J. C. (2001). The number of Reidemeister moves needed for unknotting. *Journal of the American Mathematical Society*, 14, 399–428.
- Hass, J., and Scott, P. (1994). Shortening curves on surfaces. *Topology*, 33, 25–43.
- Huet, G. (1980). Confluent reductions: abstract properties and applications to term rewriting systems. *Journal of the ACM*, 27, 797–821.
- Janse van Rensburg, E. J., and Whittington, S. G. (1991). The BFACF algorithm and knotted polygons. *Journal of Physics A*, 24, 5553–5567.
- Jouannaud, J.-P., and Kirchner, H. (1986). Completion of a set of rules modulo a set of equations. *SIAM Journal on Computing*, 15, 1155–1194.
- Kadanoff, L. P. (1966). Scaling laws for Ising models near $T_c$. *Physics*, 2, 263–272.
- Kadokami, T. (2003). Detecting non-triviality of virtual links. *Journal of Knot Theory and Its Ramifications*, 12, 781–803.
- Katritch, V., Bednar, J., Michoud, D., Scharein, R. G., Dubochet, J., and Stasiak, A. (1996). Geometry and physics of knots. *Nature*, 384, 142–145.
- Kauffman, L. H., and Lambropoulou, S. (2006). Hard unknots and collapsing tangles. arXiv:math/0601525; reprinted in *Introductory Lectures on Knot Theory*, World Scientific, 2012.
- Lackenby, M. (2015). A polynomial upper bound on Reidemeister moves. *Annals of Mathematics*, 182, 491–564.
- Liu, A. J., and Nagel, S. R. (1998). Jamming is not just cool any more. *Nature*, 396, 21–22.
- Maddocks, J. H., and Keller, J. B. (1987). Ropes in equilibrium. *SIAM Journal on Applied Mathematics*, 47, 1185–1200.
- Madras, N., and Slade, G. (1993). *The Self-Avoiding Walk*. Birkhäuser.
- Metzler, R., Hanke, A., Dommersnes, P. G., Kantor, Y., and Kardar, M. (2002). Equilibrium shapes of flat knots. *Physical Review Letters*, 88, 188101.
- Newman, M. H. A. (1942). On theories with a combinatorial definition of "equivalence." *Annals of Mathematics*, 43, 223–243.
- O'Hara, J. (1991). Energy of a knot. *Topology*, 30, 241–247.
- Orlandini, E., and Whittington, S. G. (2007). Statistical topology of closed curves: some applications in polymer physics. *Reviews of Modern Physics*, 79, 611–642.
- Patil, V. P., Sandt, J. D., Kolle, M., and Dunkel, J. (2020). Topological mechanics of knots and tangles. *Science*, 367, 71–75.
- Pieranski, P., Przybyl, S., and Stasiak, A. (2001). Gordian unknots. *European Physical Journal E*, 6, 123–128. arXiv:physics/0103016.
- Scharein, R. G. (1998). *Interactive Topological Drawing*. PhD thesis, University of British Columbia.
- Scharein, R., Ishihara, K., Arsuaga, J., Diao, Y., Shimokawa, K., and Vazquez, M. (2009). Bounds for the minimum step number of knots in the simple cubic lattice. *Journal of Physics A*, 42, 475006.
- Stillinger, F. H., and Weber, T. A. (1982). Hidden structure in liquids. *Physical Review A*, 25, 978–989.
- Turaev, V. (2012). Knotoids. *Osaka Journal of Mathematics*, 49, 195–223.
- Wilson, K. G., and Kogut, J. (1974). The renormalization group and the $\epsilon$ expansion. *Physics Reports*, 12, 75–199.
- **Topological protection.** Eliminating the pattern would require a forbidden strand passage. It holds for every admissible operator whose moves stay inside the realization's topological equivalence, with depth $\delta = \infty$.
- Applebaum, T., Blackwell, S., Davies, A., Edlich, T., Juhász, A., Lackenby, M., Tomašev, N., and Zheng, D. (2024). The unknotting number, hard unknot diagrams, and reinforcement learning. arXiv:2409.09032.
---
title: "Group-Typed Tensors and Relaxed Representations: A Research Plan"
subtitle: Typing tensor blocks by group representations and learning the groups themselves
slug: group-typed-tensors-research-plan
type: technical
mode: formal
numbering: decimal
ledger: optional
math: true
code: [python]
topics: [group-theory, representation-learning, equivariance, symmetry-discovery]
lifecycle: draft
date_created: 2025-01-01
date_updated: 2025-01-01
---

# Group-Typed Tensors and Relaxed Representations: A Research Plan

*Typing tensor blocks by group representations and learning the groups themselves*

> Reader note: Claim status is marked inline in [brackets]. A claim ledger is at the end.

## Introduction

This document turns an informal idea into a plan with concrete mathematical specifications. The idea has two parts:

1. **Group-typed dimensions.** Treat a block of coordinates in a tensor (an activation or a weight) as a representation space of a group $G_i$, not as an untyped slice of $\mathbb{R}^d$. Each block then has legal transformations, invariants, and orbit structure.
2. **Relaxed groups.** Do not fix the groups and representations by hand. Parameterize group elements as learnable matrices, express the group axioms as differentiable penalties, and let gradient descent search the space of representations.

The plan starts with a toy problem that can be fully inspected: recovering a hidden cyclic symmetry. It then scales in stages to unknown groups, product groups, and typed layers inside a working network.

The plan also covers what it would take to test the idea honestly. That includes the prior work it builds on, the failure modes to watch for, and metrics that cannot be fooled by the arbitrary choice of basis. Symbols are collected in Appendix A.

---

## 1. Positioning: What Exists and What This Plan Adds

The informal discussion suggested this territory is unexplored. That is not accurate. Several strands of existing work touch it directly, and the plan should build on them rather than ignore them. [fact:C1]

Table 1: Existing lines of work and the gap this plan targets.

| Existing line of work | What it does | Gap this plan targets |
|---|---|---|
| Learning irreps of commutative Lie groups [@cohen2014] | Learns toroidal group representations from transformed image pairs | Single abelian group; no mixed typing across blocks |
| Equivariant MLPs for arbitrary groups [@finzi2021a]; tensor field networks and e3nn [@thomas2018; @geiger2022] | Solve for equivariant linear maps between declared representations, including mixed irreps and product groups | The group and its representations are *declared*, not learned |
| Symmetry discovery: Augerino [@benton2020], Lie algebra convolutional networks [@dehmamy2021], LieGAN [@yang2023], meta-learned symmetries [@zhou2021] | Learn which transformations or generators the data respects | Usually learns a transformation family; rarely recovers a full group law plus a typed decomposition |
| Symmetry-based disentanglement [@higgins2018] | Defines disentangled representations as products of group representations | Mostly definitional; weak training recipes |
| Sinkhorn and Gumbel-Sinkhorn [@mena2018] | Continuous relaxation of permutations into doubly stochastic matrices | Covers only $S_n$, and relaxes elements rather than group structure |

**Contribution of this plan.** It combines three pieces into one testable pipeline:

- a **soft Cayley table**, a learned array of distributions over slots, so the group law itself is learned and not just the matrices that act on data;
- **per-block typing**, so that the latent space is a product of learned representation spaces;
- **character-based evaluation**, so that the claim "the model learned group $G$ with irreps $\{V_\alpha\}$" can be checked independently of the basis the model happens to choose.

To our knowledge, no single work in Table 1 combines all three pieces. [interpretation:C2]

---

## 2. Mathematical Specification

### 2.1 Group-Typed Tensor

A **typed latent space** is a direct sum of $B$ blocks:

$$
X \;=\; \bigoplus_{i=1}^{B} V_i, \qquad V_i \cong \mathbb{R}^{d_i}, \qquad \sum_i d_i = d,
$$

where each block $V_i$ carries a representation $\rho_i : G_i \to GL(V_i)$. The full symmetry acting on $X$ is the product group

$$
G = G_1 \times \cdots \times G_B, \qquad \rho(g_1,\dots,g_B) = \operatorname{diag}\big(\rho_1(g_1),\dots,\rho_B(g_B)\big).
$$

In words: each block is transformed only by its own group factor, and the blocks do not mix. Each block decomposes into irreducible representations (**irreps**) $V_\alpha$, each appearing $m_{i\alpha}$ times:

$$
V_i \;\cong\; \bigoplus_{\alpha \in \widehat{G_i}} m_{i\alpha}\, V_\alpha .
$$

The trivial group acts as the identity, so a block typed by the trivial group is exactly a standard embedding dimension. The framework therefore strictly generalizes the usual untyped setup. [derived:C4]

**Terminology note:** The set of *points* in a representation space is still a vector space. The manifold structure lives in the space of *representations* (group homomorphisms modulo conjugation) and in the *orbits* $G\cdot \mathbf{x} \subset V$. Statements like "the tensor is a product of group manifolds" are to be read in that sense. [definition:C3]

Notation: in this section $G_i$ is the group attached to block $i$. From §2.4 onward, $G_k$ is the matrix assigned to group-element slot $k$.

### 2.2 Typed Linear Maps (Intertwiners)

A linear map $W: V_i \to V_j$ is **legal** if it commutes with the group action. This only makes sense when both blocks carry the same group, or when the group action has been pulled back along a homomorphism:

$$
W \rho_i(g) \;=\; \rho_j(g)\, W \qquad \forall g \in G .
$$

By Schur's lemma, the dimension of the space of such maps is determined by the irrep multiplicities:

$$
\dim \operatorname{Hom}_G(V_i, V_j) \;=\; \sum_\alpha m_{i\alpha}\, m_{j\alpha}\, \dim \operatorname{End}_G(V_\alpha).
$$

Over $\mathbb{R}$, the factor $\dim \operatorname{End}_G(V_\alpha)$ equals 1, 2, or 4 depending on whether $V_\alpha$ is of real, complex, or quaternionic type. [fact:C5]

There are two ways to enforce legality:

- **Hard:** parameterize $W$ in a basis of the null space of $W \mapsto W\rho_i(g) - \rho_j(g)W$ over the group generators, as in EMLP [@finzi2021a].
- **Soft:** add the penalty below, where $S$ is a set of group generators.

$$
\mathcal{L}_{\text{equiv}} = \sum_{g \in S} \big\|W\rho_i(g) - \rho_j(g)W\big\|_F^2 .
$$

In words: the soft penalty is zero exactly when $W$ commutes with every generator. The hard version is the right choice when $\rho$ is known. Once $\rho$ is being learned, the soft version is required.

### 2.3 Typed Nonlinearities, Normalization, and Attention

Assume the representations are orthogonal, $\rho_i(g)^\top\rho_i(g)=I$. This is always achievable for finite and compact groups, by averaging an inner product over the group. [fact:C6]

**Normalization:** rescale each irrep component by its norm, $\mathbf{v}_\alpha \mapsto \mathbf{v}_\alpha / \|\mathbf{v}_\alpha\|$. This is invariant under the group action.

**Gated nonlinearity:** scale each irrep component by a function of an invariant scalar $s_\alpha$ (a norm, or a trivial-irrep channel):

$$
\mathbf{v}_\alpha \mapsto \sigma(s_\alpha)\, \mathbf{v}_\alpha .
$$

**Attention:** compute scores from invariant inner products, with queries $\mathbf{q}$ and keys $\mathbf{k}$:

$$
a_{tu} = \operatorname{softmax}_u \Big(\textstyle\sum_\alpha \langle \mathbf{q}_{t,\alpha}, \mathbf{k}_{u,\alpha}\rangle\Big).
$$

Values are mixed only through intertwiners. These are standard constructions from equivariant networks [@thomas2018; @geiger2022], applied block by block.

### 2.4 Relaxed Group (the Core Mechanism)

Fix a budget of $K$ group-element slots. We learn three things:

- element matrices $\{G_k\}_{k=1}^{K} \subset \mathbb{R}^{d\times d}$, which together form a representation;
- a soft Cayley table $P \in \Delta^{K\times K\times K}$, where $P_{ij\cdot}$ is a distribution over slots;
- an identity index $e$. This is either fixed to slot 1, or represented as a learnable distribution $\pi_e \in \Delta^K$.

### 2.5 Axiom Penalties

Write $\bar G_{ij} = \sum_k P_{ijk}\, G_k$ for the soft product of slots $i$ and $j$, and $\delta_i$ for the one-hot distribution on slot $i$. The penalties are:

$$
\begin{aligned}
\mathcal{L}_{\text{hom}} &= \tfrac{1}{K^2}\sum_{i,j} \big\| G_i G_j - \bar G_{ij} \big\|_F^2 &&\text{(homomorphism / closure)}\\[2pt]
\mathcal{L}_{\text{id}} &= \big\| G_e - I \big\|_F^2 + \tfrac{1}{K}\sum_i \big\| P_{ei\cdot} - \delta_i \big\|^2 &&\text{(identity)}\\[2pt]
\mathcal{L}_{\text{inv}} &= \tfrac{1}{K}\sum_i \min_j \big\| G_i G_j - I \big\|_F^2 &&\text{(inverses)}\\[2pt]
\mathcal{L}_{\text{assoc}} &= \tfrac{1}{K^3}\sum_{i,j,l} \big\| \textstyle\sum_{k,m} P_{ijk}P_{klm}\delta_m - \sum_{k,m} P_{jlk}P_{ikm}\delta_m \big\|^2 &&\text{(associativity of the table)}\\[2pt]
\mathcal{L}_{\text{sharp}} &= \tfrac{1}{K^2}\sum_{i,j} H(P_{ij\cdot}) &&\text{(push table toward discrete)}
\end{aligned}
$$

In words: the first four penalties vanish exactly when the slots and the table form a group acting by the given matrices, and the last pushes the table toward a discrete one. Here $H$ is Shannon entropy. In practice, the $\min_j$ in $\mathcal{L}_{\text{inv}}$ is replaced by a softmin.

Associativity of the *matrices* follows automatically, because matrix multiplication is associative. Associativity of the *table* does not, because $P$ is unconstrained. [derived:C7] $\mathcal{L}_{\text{assoc}}$ ensures that the discrete group recovered by taking $\operatorname{arg\,max} P$ is actually a group.

### 2.6 Non-Degeneracy

The axiom penalties alone have trivial minimizers. Setting $G_k = 0$ for all $k$ satisfies the homomorphism penalty, and setting $G_k = I$ for all $k$ (the trivial representation) satisfies every axiom penalty when the table is a valid group table. [derived:C8]

Three mechanisms rule these out:

1. **Identity anchoring.** $G_e = I$ is enforced, not just encouraged. This excludes the zero solution.
2. **Orthogonality** for compact or finite targets:

$$
\mathcal{L}_{\text{orth}}=\sum_k\|G_k^\top G_k - I\|_F^2 .
$$

3. **Task pressure plus distinctness.** The task loss (§3) is unsatisfiable under the trivial representation. In addition, a margin $\tau$ keeps slots apart:

$$
\mathcal{L}_{\text{dist}} = \sum_{i\neq j}\max\big(0,\; \tau - \|G_i - G_j\|_F\big)^2 .
$$

### 2.7 Parameterization Ladder

The relaxation can be implemented at several levels of strength, from most constrained to least.

Table 2: Parameterization ladder from most to least constrained.

| Level | Parameterization | What is learned | Built-in guarantees |
|---|---|---|---|
| L0 | $G_k = R^k$ with $R$ known | nothing (sanity check) | everything |
| L1 | $G_k = \exp(kA)$, $A$ skew-symmetric | one generator | orthogonality, abelian, $G_0=I$; only $\exp(nA)=I$ must be learned |
| L2 | $G_k$ free, $P$ fixed to the true table | the representation | none; the axiom penalties do the work |
| L3 | $G_k$ free, $P$ learned | the group law and the representation | none |
| L4 | $G = \exp\!\big(\sum_a \theta_a A_a\big)$, $[A_a,A_b]=\sum_c f_{ab}^c A_c$ softly enforced, $f$ learned | a Lie algebra | the Jacobi identity must be added as a penalty |

Orthogonal matrices can be parameterized exactly via $\exp$ of skew-symmetric matrices or via Cayley transforms. This keeps $\mathcal{L}_{\text{orth}}=0$ by construction from L1 onward.

### 2.8 Full Objective

$$
\mathcal{L} = \mathcal{L}_{\text{task}} + \lambda_{\text{hom}}\mathcal{L}_{\text{hom}} + \lambda_{\text{id}}\mathcal{L}_{\text{id}} + \lambda_{\text{inv}}\mathcal{L}_{\text{inv}} + \lambda_{\text{assoc}}\mathcal{L}_{\text{assoc}} + \lambda_{\text{orth}}\mathcal{L}_{\text{orth}} + \lambda_{\text{dist}}\mathcal{L}_{\text{dist}} + \lambda_{\text{sharp}}(t)\,\mathcal{L}_{\text{sharp}} .
$$

In words: the objective is the task loss plus a weighted sum of the axiom and non-degeneracy penalties. The weight $\lambda_{\text{sharp}}(t)$ is annealed upward over training. The softmax temperature on $P$ is annealed downward. This is the same continuation strategy used for Gumbel-Sinkhorn [@mena2018], used here as a lens and not as a proven equivalence. [model:C9]

---

## 3. Toy Problem: Recovering a Hidden Cyclic Symmetry

### 3.1 Data

**Ground truth (hidden from the model).** The group is the cyclic group $C_n$ of order $n$, acting on $\mathbb{R}^2$ through the rotation matrices

$$
R_k = \begin{pmatrix}\cos\frac{2\pi k}{n} & -\sin\frac{2\pi k}{n}\\ \sin\frac{2\pi k}{n} & \cos\frac{2\pi k}{n}\end{pmatrix},\quad k = 0,\dots,n-1 .
$$

**Sampling.** Draw base points $\mathbf{x} \sim \mathcal{N}(0, I_2)$, then form observations

$$
\mathbf{y}_k = R_k \mathbf{x} + \varepsilon, \qquad \varepsilon\sim\mathcal{N}(0,\sigma^2 I).
$$

The default settings are $n=4$, noise scale $\sigma=0.01$, and $N=10^4$ orbits.

**Harder variant.** Use a non-faithful or reducible action, so that the model must discover a nontrivial irrep decomposition. For example, act on $\mathbb{R}^5$ by

$$
\rho_{\text{true}} = \mathbf{1}\oplus R^{(1)}\oplus R^{(2)},
$$

where $R^{(m)}_k$ denotes rotation by $2\pi mk/n$. Then mix the coordinates with a fixed random orthogonal matrix $Q$, so that the irreps are not axis-aligned.

### 3.2 Model

The model has three parts:

- an encoder $E:\mathbb{R}^{2}\to\mathbb{R}^{d}$ and a decoder $D:\mathbb{R}^{d}\to\mathbb{R}^{2}$, either linear or as small MLPs;
- the relaxed group slots $\{G_k\}_{k=1}^K$ acting on the latent space $\mathbb{R}^d$;
- the prediction rule below.

$$
\hat{\mathbf{y}}_k = D\big(G_k\,E(\mathbf{x})\big).
$$

In words: encode the base point, apply slot $k$ in latent space, and decode. The latent dimension $d$ is deliberately larger than the minimum needed, for example $d=6$. Recovering which irreps the model actually uses is then part of the result.

### 3.3 Task Variants (Increasing Difficulty)

Table 3: Task variants, their supervision, and their losses.

| Task | Supervision | Task loss |
|---|---|---|
| T1 indexed transition | $(\mathbf{x}, k, \mathbf{y}_k)$; index $k$ given | $\lVert \hat{\mathbf{y}}_k - \mathbf{y}_k\rVert^2$ |
| T2 unindexed orbit | the set $\{\mathbf{y}_k\}$, with no index | Chamfer distance between $\{\hat{\mathbf{y}}_j\}_{j=1}^K$ and $\{\mathbf{y}_k\}$ |
| T3 pairwise | pairs $(\mathbf{y}_a, \mathbf{y}_b)$ from the same orbit, offset unknown | $\min_k \lVert D(G_k E(\mathbf{y}_a)) - \mathbf{y}_b\rVert^2$ (with a softmin) |
| T4 unknown order | as T2, but $K > n$ and $n$ is unknown | as T2, plus a usage-sparsity penalty on the slots |

Each task is paired with a level from the parameterization ladder (Table 2):

- **T1 + L2** answers: can a representation be learned when the group law is known?
- **T2/T3 + L3** answers: can the group law itself be learned?
- **T4** answers: can the order of the group be discovered?

### 3.4 Basis-Independent Evaluation

A learned representation is only identifiable up to conjugation, $G_k \mapsto S G_k S^{-1}$ for an invertible matrix $S$. Raw matrices therefore cannot be compared to ground truth directly. Evaluation uses invariants instead.

**Recovered group.** Discretize the table, $\hat\mu(i,j) = \operatorname{arg\,max}_k P_{ijk}$, and check the group axioms exactly. Test isomorphism to $C_n$ through its order, its element orders, and whether it is cyclic, meaning some element has order $n$.

**Characters.** Compute the **character** $\chi(k) = \operatorname{tr} G_k$. It is invariant under conjugation, because $\operatorname{tr}(S G_k S^{-1}) = \operatorname{tr} G_k$. [derived:C10] Irrep multiplicities follow from character orthogonality, where $\chi_\alpha$ is the character of irrep $\alpha$ and $|G|$ is the group order:

$$
\hat m_\alpha = \frac{1}{|G|}\sum_{k} \chi(k)\,\overline{\chi_\alpha(k)} .
$$

In words: the estimated multiplicity of an irrep is the average of the learned character weighted by that irrep's character. For real representations of $C_n$, the relevant irreps are the trivial irrep, the sign irrep (when $n$ is even), and the 2D rotations $R^{(m)}$ for $1\le m<n/2$. A clean result gives near-integer $\hat m_\alpha$ that match $\rho_{\text{true}}$ on the subspace the decoder actually reads from.

**Homomorphism residual.** Report $\max_{i,j}\|G_iG_j - G_{\hat\mu(i,j)}\|_F$ on the discretized table.

**Generalization.** Measure extrapolation error on compositions never seen during training. For example, train T1 only on $k\in\{0,1\}$ and test on all $k$, predicting via $G_1^k$. This tests whether the model learned the structure or memorized transitions.

**Visualization.** Plot the eigenvalue spectra of the $G_k$ on the unit circle. They should be $n$-th roots of unity.

### 3.5 Baselines

- An unconstrained MLP $f(\mathbf{x},k)$ with one-hot $k$ (no group structure).
- Unconstrained slots $G_k$ with all axiom penalties set to zero.
- The oracle L0.

### 3.6 Success Criteria

The pipeline is expected to meet the criteria in Table 4 on the toy problem. No experiment has been run yet. [hypothesis:C11]

Table 4: Success criteria by test.

| Test | Criterion |
|---|---|
| T1/L2 recovered multiplicities | Each $\hat m_\alpha$ is within 0.05 of the true integer |
| T1/L2 homomorphism residual | Below $10^{-3}$ |
| T1/L2 extrapolation error | Within $2\times$ the oracle's error |
| T2/L3 group recovery | Discretized table is a valid group isomorphic to $C_n$ in at least 80% of random seeds |
| T4 order discovery | Number of used slots equals $n$, for $n\in\{3,\dots,8\}$ |

---

## 4. Staged Roadmap

Table 5: Staged roadmap with exit criteria.

| Phase | Goal | Groups | Key new component | Exit criterion |
|---|---|---|---|---|
| 0 | Infrastructure | $C_n$ (oracle) | Character evaluator, data generator | L0 passes all metrics |
| 1 | Learn a representation | $C_n$, known table | $\mathcal{L}_{\text{hom}}$, $\mathcal{L}_{\text{orth}}$ | §3.6 T1 criteria |
| 2 | Learn the group law | $C_n$, then $D_n$ (non-abelian) | Soft Cayley table, annealing, $\mathcal{L}_{\text{assoc}}$ | Correct group recovered, including non-commutativity for $D_n$ |
| 3 | Typed product blocks | $C_n\times C_m$, $C_n\times S_3$ | Block-diagonal $G=\operatorname{diag}(G^{(1)},G^{(2)})$; learned block assignment | Each block's character identifies the correct factor |
| 4 | Continuous groups | $SO(2)$, $SO(3)$ | L4 Lie algebra relaxation, Jacobi penalty | Recovered structure constants match $\mathfrak{so}(3)$ up to change of basis |
| 5 | Typed layers in a real model | Learned from data | Soft intertwiner penalty (§2.2) between learned block representations | Matches or beats a hand-specified equivariant baseline on rotated MNIST / periodic time series, with less prior specification |

### 4.1 Learned Block Assignment (Phase 3 Detail)

When the block structure is unknown, allow a learned orthogonal change of basis $U$ followed by a fixed block template:

$$
G_k = U^\top \operatorname{diag}\big(G_k^{(1)},\dots,G_k^{(B)}\big)\, U .
$$

Add a penalty on the off-block energy of $U G_k U^\top$. Alternatively, recover the blocks after training by simultaneously block-diagonalizing $\{G_k\}$: compute the commutant, then take the eigenspaces of a random element of it.

### 4.2 Typed Weights (Phase 5 Detail)

Each typed block $V_i$ carries its own learned slot set $\{G^{(i)}_k\}$. A linear layer $W$ between blocks $i$ and $j$ that share a group factor is trained with the following penalty, applied with stop-gradient alternation:

$$
\mathcal{L}_{\text{equiv}}(W) = \sum_{k\in S}\|W G^{(i)}_k - G^{(j)}_k W\|_F^2 .
$$

Alternating which side is held fixed is expected to prevent the collapse in which $G\to I$ trivially satisfies the constraint. [hypothesis:C12]

---

## 5. Implementation Sketch

The following Python code is a sketch, not runnable as written (imports and device handling are omitted). It shows an orthogonal-by-construction parameterization of the slots, a soft table, and the homomorphism loss.

<!-- @code runnable=false lang=python -->
```python
class RelaxedGroup(nn.Module):
    def __init__(self, K, d, learn_table=True):
        super().__init__()
        self.A = nn.Parameter(0.1 * torch.randn(K, d, d))      # skew generators
        self.logits = nn.Parameter(torch.zeros(K, K, K)) if learn_table else None

    def elements(self):
        S = self.A - self.A.transpose(-1, -2)
        G = torch.matrix_exp(S)                                   # orthogonal by construction
        G = torch.cat([torch.eye(G.shape[-1])[None], G[1:]], 0)   # anchor identity at slot 0
        return G

    def table(self, temp):
        return torch.softmax(self.logits / temp, dim=-1)          # P[i, j, k]

    def hom_loss(self, G, P):
        prod = torch.einsum('iab,jbc->ijac', G, G)                # G_i G_j
        soft = torch.einsum('ijk,kac->ijac', P, G)                # sum_k P_ijk G_k
        return ((prod - soft) ** 2).mean()
```

Training loop outline:

1. Sample a batch from the T1-T4 generator.
2. Compute the task loss through $D(G_k E(\mathbf{x}))$.
3. Add the axiom penalties.
4. Anneal the table temperature downward and $\lambda_{\text{sharp}}$ upward.
5. Evaluate characters every epoch.

---

## 6. Risks and Mitigations

Table 6: Risks, their symptoms, and mitigations.

| Risk | Symptom | Mitigation |
|---|---|---|
| Trivial / zero representation | All $\chi(k)\approx d$ or $\approx 0$ | Identity anchoring, orthogonal parameterization, distinctness margin, a task that requires nontrivial action |
| Table stuck in soft mixture | High entropy of $P$ at the end of training | Temperature annealing, entropy penalty, straight-through discretization late in training |
| Learns a quotient group | Recovered order $< n$ (e.g. $C_2$ instead of $C_4$) | T4 sparsity tuning; check faithfulness via $\ker\rho$; increase task resolution |
| Penalty / task imbalance | Low task loss but large axiom residual, or the reverse | Adaptive weights (e.g. GradNorm [@chen2018]), or a constrained-optimization formulation (augmented Lagrangian) |
| $O(K^3)$ table cost | Slow beyond $K\approx 64$ | Sample the triples used in $\mathcal{L}_{\text{assoc}}$ and pairs in $\mathcal{L}_{\text{hom}}$; for large groups, learn generators plus relations instead of full tables |
| Results that are not identifiable | Seeds disagree on matrices | Expected: compare only invariants (characters, table up to isomorphism) |
| Overclaiming novelty | Reviewers point to prior work | Position explicitly against §1; the claimed contribution is the combination plus the evaluation protocol |

---

## 7. Open Questions

1. **Non-compact groups.** Non-compact simple Lie groups such as the Lorentz group have no nontrivial finite-dimensional orthogonal representations. [fact:C13] The non-degeneracy tools in §2.6 must therefore be replaced, for example by preserving an indefinite metric $\eta$ via the constraint $G^\top\eta G=\eta$.
2. **Approximate symmetry in real data.** A relaxed group with a nonzero residual may act as a useful inductive bias, analogous to residual pathway priors [@finzi2021b]. [hypothesis:C14] The alternative is that it simply degrades into an unconstrained model.
3. **Group discovery versus data augmentation.** Training with a recovered group outperforms training with hand-picked augmentations. [hypothesis:C15]
4. **Scaling.** A single network can maintain many typed blocks, each with its own learned group, without the blocks collapsing to the trivial type. [hypothesis:C16]

---

## 8. Immediate Next Actions

Table 7: Immediate milestones and deliverables.

| Milestone | Deliverable |
|---|---|
| Phase 0 infrastructure | Data generator (including the mixed-irrep variant) and the character-based evaluator |
| Phase 1 run | T1 + L2 on $C_4$ with $d=6$, with sweeps over $\lambda_{\text{hom}}$ and $\sigma$ |
| Phase 2 run | T2 + L3 on $C_4$, then $D_4$, with the group-recovery rate measured over 20 seeds |
| Write-up | Phase 1-2 results against the baselines in §3.5, before moving on to product groups |

---

## Limits

The positioning in §1 rests on a non-systematic reading of the literature, so the claim that no single work combines the three pieces may be wrong. Work on learned symmetry discovery is moving quickly, and a closer match may already exist. Hard-constrained equivariant methods with a good declared group may match or beat the relaxed approach whenever the group is known, in which case the benefit is limited to settings where the group is unknown. The toy problem uses a small, abelian, faithful symmetry, so results on it may not transfer to non-abelian groups, noisy real data, or networks with many typed blocks. The success thresholds in Table 4 are design targets chosen before any experiment, and they may prove too strict or too loose. Finally, the soft Cayley table scales cubically in the number of slots, which may force a switch to generators-plus-relations before the interesting groups are reached.

---

## Claim Ledger

| ID | Claim | Status | Basis | Check |
|---|---|---|---|---|
| C1 | Several existing lines of work already cover territory closely related to group-typed and learned-symmetry representations | fact | Papers cited in Table 1 | Read the cited papers |
| C2 | No single work in Table 1 combines a learned soft Cayley table, per-block typing, and character-based evaluation | interpretation; literature search not systematic | Comparison of the gaps in Table 1 | Run a systematic literature search |
| C3 | Manifold structure lives in the space of representations and in orbits, not in the set of points of a representation space | definition | Stipulated reading for this piece | Not applicable; stipulated |
| C4 | A block typed by the trivial group is an ordinary embedding dimension, so the framework generalizes the untyped setup | derived | The trivial group acts as the identity | Check against the definitions in §2.1 |
| C5 | The dimension of the intertwiner space is a sum over irreps of multiplicity products times the endomorphism dimension, which is 1, 2, or 4 over the reals | fact | Schur's lemma [@serre1977] | Verify numerically on small groups |
| C6 | Representations of finite and compact groups can be made orthogonal | fact | Averaging an inner product over the group [@serre1977] | Textbook proof; numeric check for $C_n$ |
| C7 | Matrix associativity is automatic, while associativity of the soft table is not | derived | Matrix multiplication is associative and $P$ is unconstrained | Inspect the penalty definitions in §2.5 |
| C8 | Zero matrices satisfy the homomorphism penalty, and identity matrices satisfy every axiom penalty given a valid table | derived | Substitution into the penalties | Substitute and evaluate the losses |
| C9 | Annealing temperature and sharpness weight mirrors the Gumbel-Sinkhorn continuation strategy | model; analogy only | [@mena2018] | Compare annealing schedules empirically |
| C10 | The character $\operatorname{tr} G_k$ is invariant under conjugation | derived | $\operatorname{tr}(S G_k S^{-1}) = \operatorname{tr} G_k$ | Numeric check with random $S$ |
| C11 | The pipeline meets the success criteria in Table 4 on the toy problem | hypothesis; untested | Design targets, no experiments yet | Run the milestones in Table 7 |
| C12 | Stop-gradient alternation prevents collapse of the learned representation to $G\to I$ | hypothesis; untested | Reasoning about the trivial solution | Ablate the alternation in Phase 5 |
| C13 | Non-compact simple Lie groups such as the Lorentz group have no nontrivial finite-dimensional orthogonal representations | fact | [@knapp2002] | Consult a Lie group text |
| C14 | A relaxed group with nonzero residual acts as a useful inductive bias | hypothesis; untested | Analogy to residual pathway priors [@finzi2021b] | Compare against unconstrained and exactly equivariant models |
| C15 | Training with a recovered group outperforms training with hand-picked augmentations | hypothesis; untested | None yet | Compare on rotated MNIST and periodic time series |
| C16 | A single network can maintain many typed blocks, each with its own learned group, without collapse to the trivial type | hypothesis; untested | None yet | Scale the number of blocks in Phase 3 and Phase 5 |

---

## Appendix A: Symbol Table

Table 8: Symbols used in this plan.

| Symbol | Meaning |
|---|---|
| $X$ | Typed latent space, a direct sum of blocks |
| $V_i$, $d_i$ | Block $i$ and its dimension |
| $B$ | Number of blocks |
| $d$ | Total latent dimension |
| $G_i$ (§2.1) | Group attached to block $i$ |
| $G$ | Product group $G_1 \times \cdots \times G_B$ |
| $\rho_i$ | Representation of $G_i$ on $V_i$ |
| $V_\alpha$, $m_{i\alpha}$ | Irrep $\alpha$ and its multiplicity in block $i$ |
| $W$ | Linear map between blocks |
| $S$ | Set of group generators (§2.2), or an invertible change of basis (§3.4) |
| $K$ | Number of group-element slots |
| $G_k$ (§2.4 on) | Matrix assigned to slot $k$ |
| $P$ | Soft Cayley table, $P_{ijk}$ is the weight of slot $k$ in the product of slots $i$ and $j$ |
| $e$, $\pi_e$ | Identity slot index and its distribution |
| $\bar G_{ij}$ | Soft product of slots $i$ and $j$ |
| $\delta_i$ | One-hot distribution on slot $i$ |
| $\tau$ | Margin for slot distinctness |
| $\lambda_{\cdot}$ | Weight on the corresponding penalty |
| $E$, $D$ | Encoder and decoder |
| $R_k$, $R^{(m)}_k$ | Rotation by $2\pi k/n$ and by $2\pi mk/n$ |
| $n$, $\sigma$, $N$ | Group order, noise scale, number of orbits |
| $Q$ | Fixed random orthogonal mixing matrix |
| $\chi$, $\hat m_\alpha$ | Character and estimated irrep multiplicity |
| $U$ | Learned orthogonal change of basis |

---

## References

- [@benton2020] Benton, Gregory, Marc Finzi, Pavel Izmailov, and Andrew Gordon Wilson. "Learning Invariances in Neural Networks from Training Data." *NeurIPS*, 2020.
- [@chen2018] Chen, Zhao, Vijay Badrinarayanan, Chen-Yu Lee, and Andrew Rabinovich. "GradNorm: Gradient Normalization for Adaptive Loss Balancing in Deep Multitask Networks." *ICML*, 2018.
- [@cohen2014] Cohen, Taco, and Max Welling. "Learning the Irreducible Representations of Commutative Lie Groups." *ICML*, 2014.
- [@dehmamy2021] Dehmamy, Nima, Robin Walters, Yanchen Liu, Dashun Wang, and Rose Yu. "Automatic Symmetry Discovery with Lie Algebra Convolutional Network." *NeurIPS*, 2021.
- [@finzi2021a] Finzi, Marc, Max Welling, and Andrew Gordon Wilson. "A Practical Method for Constructing Equivariant Multilayer Perceptrons for Arbitrary Matrix Groups." *ICML*, 2021.
- [@finzi2021b] Finzi, Marc, Gregory Benton, and Andrew Gordon Wilson. "Residual Pathway Priors for Soft Equivariance Constraints." *NeurIPS*, 2021.
- [@geiger2022] Geiger, Mario, and Tess Smidt. "e3nn: Euclidean Neural Networks." arXiv:2207.09453, 2022.
- [@higgins2018] Higgins, Irina, David Amos, David Pfau, Sebastien Racaniere, Loic Matthey, Danilo Rezende, and Alexander Lerchner. "Towards a Definition of Disentangled Representations." arXiv:1812.02230, 2018.
- [@knapp2002] Knapp, Anthony W. *Lie Groups Beyond an Introduction*. 2nd ed. Birkhauser, 2002.
- [@mena2018] Mena, Gonzalo, David Belanger, Scott Linderman, and Jasper Snoek. "Learning Latent Permutations with Gumbel-Sinkhorn Networks." *ICLR*, 2018.
- [@serre1977] Serre, Jean-Pierre. *Linear Representations of Finite Groups*. Springer, 1977.
- [@thomas2018] Thomas, Nathaniel, Tess Smidt, Steven Kearnes, Lusann Yang, Li Li, Kai Kohlhoff, and Patrick Riley. "Tensor Field Networks: Rotation- and Translation-Equivariant Neural Networks for 3D Point Clouds." arXiv:1802.08219, 2018.
- [@yang2023] Yang, Jianke, Robin Walters, Nima Dehmamy, and Rose Yu. "Generative Adversarial Symmetry Discovery." *ICML*, 2023.
- [@zhou2021] Zhou, Allan, Tom Knowles, and Chelsea Finn. "Meta-Learning Symmetries by Reparameterization." *ICLR*, 2021.

---

## Changelog

- 2025-01-01: Restructured to the site style guide: added front matter, reader note, claim tags, claim ledger, symbol table, and references; renamed the file to kebab-case.
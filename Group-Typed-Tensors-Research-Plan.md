# Group-Typed Tensors and Relaxed Representations: A Research Plan

## 0. Summary

This document turns an informal idea into a plan with concrete mathematical specifications. The idea has two parts:

1. **Group-typed dimensions.** Treat a block of coordinates in a tensor (an activation or a weight) as a representation space of a group $G_i$, not as an untyped slice of $\mathbb{R}^d$. Each block then has legal transformations, invariants, and orbit structure.
2. **Relaxed groups.** Do not fix the groups and representations by hand. Parameterize group elements as learnable matrices, express the group axioms as differentiable penalties, and let gradient descent search the space of representations.

The plan starts with a toy problem that can be fully inspected: recovering a hidden cyclic symmetry. It then scales in stages to unknown groups, product groups, and typed layers inside a working network.

The plan also covers what it would take to test the idea honestly. That includes the prior work it builds on, the failure modes to watch for, and metrics that cannot be fooled by the arbitrary choice of basis.

---

## 1. Positioning: What Exists and What This Plan Adds

The informal discussion suggested this territory is unexplored. That is not accurate. Several strands of existing work touch it directly, and the plan should build on them rather than ignore them.

| Existing line of work | What it does | Gap this plan targets |
|---|---|---|
| Learning irreps of commutative Lie groups (Cohen & Welling, 2014) | Learns toroidal group representations from transformed image pairs | Single abelian group; no mixed typing across blocks |
| Equivariant MLPs for arbitrary groups (Finzi et al., 2021); e3nn / tensor field networks | Solve for equivariant linear maps between declared representations, including mixed irreps and product groups | The group and its representations are *declared*, not learned |
| Symmetry discovery: Augerino, Lie algebra convolutional networks, LieGAN, meta-learned symmetries (MSR) | Learn which transformations or generators the data respects | Usually learns a transformation family; rarely recovers a full group law plus a typed decomposition |
| Symmetry-based disentanglement (Higgins et al., 2018) | Defines disentangled representations as products of group representations | Mostly definitional; weak training recipes |
| Sinkhorn / Gumbel-Sinkhorn | Continuous relaxation of permutations into doubly stochastic matrices | Covers only $S_n$, and relaxes elements rather than group structure |

**Contribution of this plan.** It combines three pieces into one testable pipeline:

- a *soft Cayley table*, so the group law itself is learned, not just the matrices that act on data;
- *per-block typing*, so that the latent space is a product of learned representation spaces;
- *character-based evaluation*, so that the claim "the model learned group $G$ with irreps $\{V_\alpha\}$" can be checked independently of the basis the model happens to choose.

---

## 2. Mathematical Specification

### 2.1 Group-typed tensor

A **typed latent space** is a direct sum of blocks:

$$
X \;=\; \bigoplus_{i=1}^{B} V_i, \qquad V_i \cong \mathbb{R}^{d_i}, \qquad \sum_i d_i = d,
$$

where each block $V_i$ carries a representation $\rho_i : G_i \to GL(V_i)$. The full symmetry acting on $X$ is the product group

$$
G = G_1 \times \cdots \times G_B, \qquad \rho(g_1,\dots,g_B) = \operatorname{diag}\big(\rho_1(g_1),\dots,\rho_B(g_B)\big).
$$

Each block decomposes into irreducible representations (irreps):

$$
V_i \;\cong\; \bigoplus_{\alpha \in \widehat{G_i}} m_{i\alpha}\, V_\alpha .
$$

The trivial group gives ordinary untyped coordinates. A block typed by a trivial group is therefore exactly a standard embedding dimension, which means the framework strictly generalizes the usual setup.

> **Terminology note.** The set of *points* in a representation space is still a vector space. The manifold structure lives in the space of *representations* (group homomorphisms modulo conjugation) and in the *orbits* $G\cdot x \subset V$. Statements like "the tensor is a product of group manifolds" should be read in that sense.

### 2.2 Typed linear maps (intertwiners)

A linear map $W: V_i \to V_j$ is **legal** if it commutes with the group action. This only makes sense when both blocks carry the same group, or when the group action has been pulled back along a homomorphism:

$$
W \rho_i(g) \;=\; \rho_j(g)\, W \qquad \forall g \in G .
$$

By Schur's lemma, the space of such maps is determined by the irrep multiplicities:

$$
\dim \operatorname{Hom}_G(V_i, V_j) \;=\; \sum_\alpha m_{i\alpha}\, m_{j\alpha}\, \dim \operatorname{End}_G(V_\alpha).
$$

Over $\mathbb{R}$, the factor $\dim \operatorname{End}_G(V_\alpha)$ equals 1, 2, or 4 depending on whether $V_\alpha$ is of real, complex, or quaternionic type.

There are two ways to enforce this:

- **Hard:** parameterize $W$ in a basis of the null space of $W \mapsto W\rho_i(g) - \rho_j(g)W$ over the group generators, as in EMLP.
- **Soft:** add the penalty
  $$
  \mathcal{L}_{\text{equiv}} = \sum_{g \in S} \big\|W\rho_i(g) - \rho_j(g)W\big\|_F^2,
  $$
  where $S$ is a set of generators.

The hard version is the right choice when $\rho$ is known. Once $\rho$ is being learned, the soft version is required.

### 2.3 Typed nonlinearities, normalization, and attention

Assume the representations are orthogonal, $\rho_i(g)^\top\rho_i(g)=I$. This is always achievable for finite and compact groups (see §2.4.3).

- **Normalization:** rescale each irrep component by its norm, $v_\alpha \mapsto v_\alpha / \|v_\alpha\|$. This is invariant under the group action.
- **Gated nonlinearity:**
  $$
  v_\alpha \mapsto \sigma(s_\alpha)\, v_\alpha,
  $$
  where $s_\alpha$ is an invariant scalar (a norm, or a trivial-irrep channel).
- **Attention:** compute scores from invariant inner products,
  $$
  a_{tu} = \operatorname{softmax}_u \Big(\textstyle\sum_\alpha \langle q_{t,\alpha}, k_{u,\alpha}\rangle\Big).
  $$
  Values are mixed only through intertwiners.

These are standard constructions from equivariant networks, applied block by block.

### 2.4 Relaxed group (the core mechanism)

Fix a budget of $K$ group-element slots. We learn three things:

- element matrices $\{G_k\}_{k=1}^{K} \subset \mathbb{R}^{d\times d}$, which together form a representation;
- a soft Cayley table $P \in \Delta^{K\times K\times K}$, where $P_{ij\cdot}$ is a distribution over slots;
- an identity index $e$. This is either fixed to slot 1, or represented as a learnable distribution $\pi_e \in \Delta^K$.

#### 2.4.1 Axiom penalties

Write $\bar G_{ij} = \sum_k P_{ijk}\, G_k$ for the soft product of slots $i$ and $j$. The penalties are:

$$
\begin{aligned}
\mathcal{L}_{\text{hom}} &= \tfrac{1}{K^2}\sum_{i,j} \big\| G_i G_j - \bar G_{ij} \big\|_F^2 &&\text{(homomorphism / closure)}\\[2pt]
\mathcal{L}_{\text{id}} &= \big\| G_e - I \big\|_F^2 + \tfrac{1}{K}\sum_i \big\| P_{ei\cdot} - \delta_i \big\|^2 &&\text{(identity)}\\[2pt]
\mathcal{L}_{\text{inv}} &= \tfrac{1}{K}\sum_i \min_j \big\| G_i G_j - I \big\|_F^2 &&\text{(inverses)}\\[2pt]
\mathcal{L}_{\text{assoc}} &= \tfrac{1}{K^3}\sum_{i,j,l} \big\| \textstyle\sum_{k,m} P_{ijk}P_{klm}\delta_m - \sum_{k,m} P_{jlk}P_{ikm}\delta_m \big\|^2 &&\text{(associativity of the table)}\\[2pt]
\mathcal{L}_{\text{sharp}} &= \tfrac{1}{K^2}\sum_{i,j} H(P_{ij\cdot}) &&\text{(push table toward discrete)}
\end{aligned}
$$

In practice, the $\min_j$ in $\mathcal{L}_{\text{inv}}$ is replaced by a softmin.

Associativity of the *matrices* follows automatically, because matrix multiplication is associative. Associativity of the *table* does not. $\mathcal{L}_{\text{assoc}}$ ensures that the discrete group recovered by taking $\arg\max P$ is actually a group.

#### 2.4.2 Non-degeneracy (critical)

The axiom penalties alone have trivial minimizers:

- $G_k = 0$ for all $k$ satisfies the homomorphism penalty.
- $G_k = I$ for all $k$ (the trivial representation) satisfies every axiom penalty.

Three mechanisms rule these out:

1. **Identity anchoring.** $G_e = I$ is enforced, not just encouraged. This excludes the zero solution.
2. **Orthogonality** for compact or finite targets:
   $$
   \mathcal{L}_{\text{orth}}=\sum_k\|G_k^\top G_k - I\|_F^2 .
   $$
3. **Task pressure plus distinctness.** The task loss (§3) is unsatisfiable under the trivial representation. In addition, a margin term keeps slots apart:
   $$
   \mathcal{L}_{\text{dist}} = \sum_{i\neq j}\max\big(0,\; \tau - \|G_i - G_j\|_F\big)^2 .
   $$

#### 2.4.3 Parameterization ladder

The relaxation can be implemented at several levels of strength, from most constrained to least:

| Level | Parameterization | What is learned | Built-in guarantees |
|---|---|---|---|
| L0 | $G_k = R^k$ with $R$ known | nothing (sanity check) | everything |
| L1 | $G_k = \exp(kA)$, $A$ skew-symmetric | one generator | orthogonality, abelian, $G_0=I$; only $\exp(nA)=I$ must be learned |
| L2 | $G_k$ free, $P$ fixed to the true table | the representation | none; the axiom penalties do the work |
| L3 | $G_k$ free, $P$ learned | the group law and the representation | none |
| L4 | $G = \exp\!\big(\sum_a \theta_a A_a\big)$, $[A_a,A_b]=\sum_c f_{ab}^c A_c$ softly enforced, $f$ learned | a Lie algebra | the Jacobi identity must be added as a penalty |

Orthogonal matrices can be parameterized exactly via $\exp$ of skew-symmetric matrices or via Cayley transforms. This keeps $\mathcal{L}_{\text{orth}}=0$ by construction from L1 onward.

#### 2.4.4 Full objective

$$
\mathcal{L} = \mathcal{L}_{\text{task}} + \lambda_{\text{hom}}\mathcal{L}_{\text{hom}} + \lambda_{\text{id}}\mathcal{L}_{\text{id}} + \lambda_{\text{inv}}\mathcal{L}_{\text{inv}} + \lambda_{\text{assoc}}\mathcal{L}_{\text{assoc}} + \lambda_{\text{orth}}\mathcal{L}_{\text{orth}} + \lambda_{\text{dist}}\mathcal{L}_{\text{dist}} + \lambda_{\text{sharp}}(t)\,\mathcal{L}_{\text{sharp}} .
$$

The weight $\lambda_{\text{sharp}}(t)$ is annealed upward over training. The softmax temperature on $P$ is annealed downward. This is the same continuation strategy used for Gumbel-Sinkhorn.

---

## 3. Toy Problem: Recovering a Hidden Cyclic Symmetry

### 3.1 Data

**Ground truth (hidden from the model).** The group is $C_n$, acting on $\mathbb{R}^2$ through the rotation matrices

$$
R_k = \begin{pmatrix}\cos\frac{2\pi k}{n} & -\sin\frac{2\pi k}{n}\\ \sin\frac{2\pi k}{n} & \cos\frac{2\pi k}{n}\end{pmatrix},\quad k = 0,\dots,n-1 .
$$

**Sampling.** Draw base points $x \sim \mathcal{N}(0, I_2)$, then form observations

$$
y_k = R_k x + \varepsilon, \qquad \varepsilon\sim\mathcal{N}(0,\sigma^2 I).
$$

The default settings are $n=4$, $\sigma=0.01$, and $N=10^4$ orbits.

**Harder variant.** Use a non-faithful or reducible action, so that the model must discover a nontrivial irrep decomposition. For example, act on $\mathbb{R}^5$ by

$$
\rho_{\text{true}} = \mathbf{1}\oplus R^{(1)}\oplus R^{(2)},
$$

where $R^{(m)}_k$ denotes rotation by $2\pi mk/n$. Then mix the coordinates with a fixed random orthogonal matrix $Q$, so that the irreps are not axis-aligned.

### 3.2 Model

The model has three parts:

- an encoder $E:\mathbb{R}^{2}\to\mathbb{R}^{d}$ and a decoder $D:\mathbb{R}^{d}\to\mathbb{R}^{2}$, either linear or as small MLPs;
- the relaxed group slots $\{G_k\}_{k=1}^K$ acting on the latent space $\mathbb{R}^d$;
- the prediction rule
  $$
  \hat y_k = D\big(G_k\,E(x)\big).
  $$

The latent dimension $d$ is deliberately larger than the minimum needed, for example $d=6$. Recovering which irreps the model actually uses is then part of the result.

### 3.3 Task variants (increasing difficulty)

| Task | Supervision | Task loss |
|---|---|---|
| **T1 indexed transition** | $(x, k, y_k)$; index $k$ given | $\|\hat y_k - y_k\|^2$ |
| **T2 unindexed orbit** | the set $\{y_k\}$, with no index | Chamfer distance between $\{\hat y_j\}_{j=1}^K$ and $\{y_k\}$ |
| **T3 pairwise** | pairs $(y_a, y_b)$ from the same orbit, offset unknown | $\min_k \|D(G_k E(y_a)) - y_b\|^2$ (with a softmin) |
| **T4 unknown order** | as T2, but $K > n$ and $n$ is unknown | as T2, plus a usage-sparsity penalty on the slots |

Each task is paired with a level from the parameterization ladder:

- **T1 + L2** answers: can a representation be learned when the group law is known?
- **T2/T3 + L3** answers: can the group law itself be learned?
- **T4** answers: can the order of the group be discovered?

### 3.4 Basis-independent evaluation

A learned representation is only identifiable up to conjugation, $G_k \mapsto S G_k S^{-1}$. Raw matrices therefore cannot be compared to ground truth directly. Evaluation uses invariants instead.

1. **Recovered group.** Discretize the table, $\hat\mu(i,j) = \arg\max_k P_{ijk}$, and check the group axioms exactly. Test isomorphism to $C_n$ through its order, its element orders, and whether it is cyclic, i.e. whether some element has order $n$.

2. **Characters.** Compute $\chi(k) = \operatorname{tr} G_k$, which is invariant under conjugation. Irrep multiplicities follow from character orthogonality:
   $$
   \hat m_\alpha = \frac{1}{|G|}\sum_{k} \chi(k)\,\overline{\chi_\alpha(k)} .
   $$
   For real representations of $C_n$, the relevant irreps are the trivial irrep, the sign irrep (when $n$ is even), and the 2D rotations $R^{(m)}$ for $1\le m<n/2$. A clean result gives near-integer $\hat m_\alpha$ that match $\rho_{\text{true}}$ on the subspace the decoder actually reads from.

3. **Homomorphism residual.** Report $\max_{i,j}\|G_iG_j - G_{\hat\mu(i,j)}\|_F$ on the discretized table.

4. **Generalization.** Measure extrapolation error on compositions never seen during training. For example, train T1 only on $k\in\{0,1\}$ and test on all $k$, predicting via $G_1^k$. This tests whether the model learned the structure or memorized transitions.

5. **Visualization.** Plot the eigenvalue spectra of the $G_k$ on the unit circle. They should be $n$-th roots of unity.

### 3.5 Baselines

- An unconstrained MLP $f(x,k)$ with one-hot $k$ (no group structure).
- Unconstrained slots $G_k$ with all axiom penalties set to zero.
- The oracle L0.

### 3.6 Success criteria

- T1/L2: $\hat m_\alpha$ within $0.05$ of the true integers, homomorphism residual below $10^{-3}$, and extrapolation error within $2\times$ the oracle's.
- T2/L3: the discretized table is a valid group isomorphic to $C_n$ in at least 80% of random seeds.
- T4: the number of used slots equals $n$, for $n\in\{3,\dots,8\}$.

---

## 4. Staged Roadmap

| Phase | Goal | Groups | Key new component | Exit criterion |
|---|---|---|---|---|
| **0** | Infrastructure | $C_n$ (oracle) | Character evaluator, data generator | L0 passes all metrics |
| **1** | Learn a representation | $C_n$, known table | $\mathcal{L}_{\text{hom}}$, $\mathcal{L}_{\text{orth}}$ | §3.6 T1 criteria |
| **2** | Learn the group law | $C_n$, then $D_n$ (non-abelian) | Soft Cayley table, annealing, $\mathcal{L}_{\text{assoc}}$ | Correct group recovered, including non-commutativity for $D_n$ |
| **3** | Typed product blocks | $C_n\times C_m$, $C_n\times S_3$ | Block-diagonal $G=\operatorname{diag}(G^{(1)},G^{(2)})$; learned block assignment | Each block's character identifies the correct factor |
| **4** | Continuous groups | $SO(2)$, $SO(3)$ | L4 Lie algebra relaxation, Jacobi penalty | Recovered structure constants match $\mathfrak{so}(3)$ up to change of basis |
| **5** | Typed layers in a real model | Learned from data | Soft intertwiner penalty (§2.2) between learned block representations | Matches or beats a hand-specified equivariant baseline on rotated MNIST / periodic time series, with less prior specification |

### 4.1 Learned block assignment (Phase 3 detail)

When the block structure is unknown, allow a learned orthogonal change of basis $U$ followed by a fixed block template:

$$
G_k = U^\top \operatorname{diag}\big(G_k^{(1)},\dots,G_k^{(B)}\big)\, U .
$$

Add a penalty on the off-block energy of $U G_k U^\top$. Alternatively, recover the blocks after training by simultaneously block-diagonalizing $\{G_k\}$: compute the commutant, then take the eigenspaces of a random element of it.

### 4.2 Typed weights (Phase 5 detail)

Each typed block $V_i$ carries its own learned slot set $\{G^{(i)}_k\}$. A linear layer $W$ between blocks $i$ and $j$ that share a group factor is trained with the following penalty, applied with stop-gradient alternation:

$$
\mathcal{L}_{\text{equiv}}(W) = \sum_{k\in S}\|W G^{(i)}_k - G^{(j)}_k W\|_F^2 .
$$

The alternation is needed to avoid a collapse in which $G\to I$ trivially satisfies the constraint.

---

## 5. Implementation Sketch

~~~python
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
~~~

Training loop outline:

1. Sample a batch from the T1–T4 generator.
2. Compute the task loss through $D(G_k E(x))$.
3. Add the axiom penalties.
4. Anneal the table temperature downward and $\lambda_{\text{sharp}}$ upward.
5. Evaluate characters every epoch.

---

## 6. Risks and Mitigations

| Risk | Symptom | Mitigation |
|---|---|---|
| Trivial / zero representation | All $\chi(k)\approx d$ or $\approx 0$ | Identity anchoring, orthogonal parameterization, distinctness margin, a task that requires nontrivial action |
| Table stuck in soft mixture | High entropy of $P$ at the end of training | Temperature annealing, entropy penalty, straight-through discretization late in training |
| Learns a quotient group | Recovered order $< n$ (e.g. $C_2$ instead of $C_4$) | T4 sparsity tuning; check faithfulness via $\ker\rho$; increase task resolution |
| Penalty / task imbalance | Low task loss but large axiom residual, or the reverse | Adaptive weights (e.g. GradNorm), or a constrained-optimization formulation (augmented Lagrangian) |
| $O(K^3)$ table cost | Slow beyond $K\approx 64$ | Sample the triples used in $\mathcal{L}_{\text{assoc}}$ and pairs in $\mathcal{L}_{\text{hom}}$; for large groups, learn generators plus relations instead of full tables |
| Results that are not identifiable | Seeds disagree on matrices | Expected: compare only invariants (characters, table up to isomorphism) |
| Overclaiming novelty | Reviewers point to prior work | Position explicitly against §1; the claimed contribution is the combination plus the evaluation protocol |

---

## 7. Open Questions

1. **Non-compact groups.** Lorentz and hyperbolic structures have no orthogonal representations, so the non-degeneracy tools in §2.4.2 must be replaced, for example by preserving an indefinite metric $\eta$ via the constraint $G^\top\eta G=\eta$.
2. **Approximate symmetry in real data.** Does a relaxed group with a nonzero residual act as a useful inductive bias, analogous to residual pathway priors? Or does it simply degrade into an unconstrained model?
3. **Group discovery versus data augmentation.** When the group is recovered, does training with the learned group outperform training with hand-picked augmentations?
4. **Scaling.** Can a single network maintain many typed blocks, each with its own learned group, without the blocks collapsing to the trivial type?

---

## 8. Immediate Next Actions

1. Implement the data generator (including the mixed-irrep variant) and the character-based evaluator: Phase 0.
2. Run T1 + L2 on $C_4$ with $d=6$, then sweep $\lambda_{\text{hom}}$ and $\sigma$.
3. Run T2 + L3 on $C_4$, then $D_4$, measuring the group-recovery rate over 20 seeds.
4. Write up the Phase 1–2 results against the baselines in §3.5 before moving on to product groups.
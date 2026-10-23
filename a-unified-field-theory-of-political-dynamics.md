---
title: A Unified Field Theory of Political Dynamics
subtitle: The Universalist-Tribal-Parasite Model
slug: a-unified-field-theory-of-political-dynamics
type: technical
mode: formal
numbering: decimal
ledger: required
math: true
topics: [political-dynamics, universalism, tribalism, parasitism, dynamical-systems, institutional-economics]
content_flags: [politics, war, violence, real-persons, speculative-history]
lifecycle: review
date_created: 2026-08-29
date_updated: 2026-08-29
---

# A Unified Field Theory of Political Dynamics

*The Universalist-Tribal-Parasite Model*

> Reader note: Claim status is marked inline in [brackets]. A claim ledger is at the end.

**Abstract:** Political history is often narrated as a pendulum: order versus chaos, liberalism versus nationalism, reason versus passion. This document proposes that the pendulum model is a projection artifact — a two-dimensional shadow cast by a three-body system. [interpretation:C1] We introduce a formal triad of political forces — **Universalism (U)**, **Tribalism (T)**, and **Parasitism (P)** — and show that treating them as three coupled fields, rather than two poles, resolves a set of long-standing puzzles: why universalist movements collapse rapidly after their founding, why tribal identity persists no matter how thoroughly it is argued against, why atrocities committed at sufficient scale exit the moral vocabulary entirely, and why every "end of history" moment has so far been temporary. The result is not a moral theory but a **dynamical** one — a set of coupled equations describing how coherence, cohesion, and extraction compete for the same finite pool of civilizational energy. What follows should be read as a synthesis and formalization of existing, separately well-supported findings across political science, anthropology, and institutional economics, offered as a common vocabulary for those findings rather than as a finished, independently validated theory — a distinction we return to explicitly in §10.

## 1. Introduction: The Failure of Two-Pole Models

The standard historical model treats political change as oscillation between two attractors:

- **Reason vs. Feeling** (Enlightenment vs. Romanticism)
- **Universalism vs. Nationalism**
- **Order vs. Chaos**
- **Openness vs. Closure**

This model has predictive value — it correctly anticipates that periods of abstract, rule-based coordination will eventually provoke an identity-based backlash, and vice versa. [interpretation:C2] But it fails to explain three classes of observation:

1. **Early corruption.** Universalist movements (Axial-age religious ethics, Enlightenment liberalism, 20th-century internationalism) do not degrade gradually under tribal pressure. They are captured almost immediately by something that is neither universalist nor tribal — a bureaucratic, extractive, narrative-controlling layer that outlives both the founding ideology and its tribal antagonists. [interpretation:C3]
2. **Asymmetric moral vocabulary.** The same act, at different scales, receives radically different moral labeling — not gradually, but as though crossing a threshold. [hypothesis:C4] A two-pole model of "more or less tribal" cannot explain a discontinuous collapse of vocabulary.
3. **Non-convergence.** If history were a genuine oscillation between two poles, amplitude should decay over time as institutions learn (a damped pendulum). Instead, the amplitude appears roughly constant or even growing across eras, suggesting the system is not damped at all — it is being *re-energized* by something outside the U/T axis. [interpretation:C5]

A third force is required. We call it **Parasitism (P)**, and we show that once it is added, the system becomes a proper three-body problem: chaotic, non-convergent, and structurally incapable of settling into a fixed point — which is itself the point. [hypothesis:C6]

### 1.1 Relationship to Prior Work

None of the three observations above is, individually, new. Robert Michels' "iron law of oligarchy" (1911) already documented the tendency of egalitarian and revolutionary organizations to generate entrenched, self-perpetuating leadership castes almost immediately upon founding. [fact:C7] [@michels1911] Mancur Olson's logic of collective action (1965) explained why small, concentrated interests reliably capture the benefits that large, diffuse coalitions are meant to enjoy. [fact:C8] [@olson1965] Karl Polanyi's "double movement" (1944) described the recurring societal backlash against unregulated market liberalization, a structural precursor to the tribal-resurgence dynamic in §2.2. [fact:C9] [@polanyi1944] Robert Klitgaard's corruption identity (1988) states that corruption = monopoly + discretion - accountability. [fact:C10] [@klitgaard1988] It is a direct institutional-scale ancestor of the $\eta/\theta$ coefficients governing Parasitism below. [interpretation:C11] Francis Fukuyama's account of "repatrimonialization" (2014) traces almost exactly the slide from U to P that this model formalizes. [interpretation:C12] [@fukuyama2014] Peter Turchin's cliodynamics (2003, 2016) already treats political stability as a quantifiable dynamical system subject to structural-demographic cycles. [fact:C13] [@turchin2003] [@turchin2016]

What this document adds, if anything, is not a new phenomenon but a proposed **common state space** in which these previously separate literatures' variables can be expressed as coupled terms in a single system. The justification for the exercise is unification and precision of vocabulary, not discovery of a hidden force nobody had noticed. Readers already familiar with this literature should treat U, T, and P as relabelings — with an explicit dynamical coupling attached — of phenomena those authors documented independently and, in most cases, more rigorously.

---

## 2. The Three Fundamental Forces

### 2.1 Universalism (U): The Coherence Field

Universalism is the tendency of a political system toward **symmetric, abstract, rule-based coordination**. Its defining properties:

- Moral symmetry (rules apply identically regardless of identity)
- Abstraction (individuals are fungible under the rule)
- Scalability (in principle, coordination cost does not grow with group size)
- High information requirements (coherence must be actively maintained, communicated, and enforced)

Universalism is **energy-expensive**. [interpretation:C14] It requires surplus — of trust, of institutional bandwidth, of shared language — to exist at all. Historically it appears at the founding moments of the Axial-age religious-ethical traditions, the Enlightenment, and 20th-century international institutions. In each case, the founding articulation is far more symmetric and abstract than anything the surrounding society can sustain. [interpretation:C15]

We model Universalism as a **field variable** $u(t) \in [0, 1]$, representing the fraction of total political "charge" currently organized around symmetric, rule-based coordination. [model:C16]

### 2.2 Tribalism (T): The Background Gravitational Field

Tribalism is not a pathology; it is the **ground state** of political cognition. [interpretation:C17] Its defining properties:

- Identity-based coordination (in-group / out-group)
- Narrative rather than propositional processing (myth, grievance, destiny)
- Low information requirements (identity is cheap to compute; abstraction is not)
- Evolutionary priority (kin/coalition detection predates language)

Critically, Tribalism does not need to be *produced*. It is always present, at some nonzero background level, in every human system, the way mass is always present in a gravitational field. It cannot be argued away, legislated away, or educated away — it can only be **temporarily outweighed** by a sufficiently energetic universalist structure, and it reasserts itself the instant that structure's energy supply runs low. [interpretation:C18] This is consistent with, though independently arrived at from, Henri Tajfel's social identity theory and Tooby and Cosmides' account of coalitional psychology as an ancient, fast, low-cost cognitive default rather than a learned pathology — and it matches the empirical record of prejudice-reduction interventions, which reliably suppress the *expression* of tribal cognition without eliminating the underlying disposition. [secondhand:C19] [@tajfel1979] [@tooby1992]

We model Tribalism as a field variable $t(t) \in [0, 1]$, and treat it as possessing a **constant, low-magnitude restoring force** — a gravitational term that is always pulling the system's trajectory back toward identity-based coordination regardless of the system's current state. [model:C20]

### 2.3 Parasitism (P): The Extraction Field

Parasitism is qualitatively different from both of the above. It is not a moral stance, an identity, or a coordination strategy. It is a **strategy for extracting value from the coordination costs paid by U and T**. [definition:C21] Its defining properties:

- No intrinsic ideology (it adopts whatever vocabulary is locally dominant)
- Growth proportional to the *surface area* of open systems (universalist systems, being open and trust-based, are especially exposed)
- Narrative capture rather than narrative production (it does not create myths or moral codes; it hijacks existing ones)
- Institutional persistence (it outlives the ideological structure that hosted it)

Unlike Tribalism, Parasitism does not correspond to a single evolved cognitive module, and it should not be modeled as though it does. It is better understood as an emergent strategy assembled opportunistically from several distinct, individually well-studied adaptations — status-seeking and dominance-hierarchy navigation, kin-directed nepotism, and cheater strategies that exploit gaps in cheater-detection [@tooby1992] — deployed wherever the coordination costs of U or the boundary-maintenance costs of T create exploitable surplus. [interpretation:C22] It has no unified psychology because it does not need one: it is a niche, not an organ.

This matters for the model's integrity, because it means P must never be allowed to become a residual bin for "political behavior the observer dislikes." §9.1 supplies an explicit, symmetric operational test for the category. Until that test is applied, any claim that a given actor or faction is "exhibiting P" should be read as a hypothesis, not a diagnosis. [normative:C23]

It is also useful to disaggregate P institutionally rather than treat it as monolithic. Borrowing directly from the governance-corruption literature, we distinguish at least four modes: **grand capture** (control of the highest levers of resource allocation), **petty extraction** (diffuse, low-level rent-seeking), **clientelist capture** (exchange of loyalty for selective benefit, which blurs into T at its edges), and **narrative capture** (control of the interpretive and informational layer itself — the mode most relevant to the moral-bandwidth collapse discussed in §6). [definition:C24] Klitgaard's formula, corruption = monopoly + discretion - accountability, is a direct institutional-scale antecedent of the $\eta/\theta$ ratio introduced below, and any future calibration of this model should attempt to map Klitgaard's three terms onto $\eta$ and $\theta$ directly rather than treat them as independently free parameters. [normative:C25]

Parasitism is modeled as a field variable $p(t) \in [0, 1]$, whose growth rate depends not on its own ideological content (it has none) but on the **product of exposure** it can extract from the other two fields. [model:C26]

---

## 3. Formal State Space

Let the instantaneous state of a political system be the point

$$
\mathbf{x}(t) = (u(t), t(t), p(t)) \in \Delta^2
$$

on the 2-simplex, where $u + t + p = 1$ and all coordinates are non-negative. In words: the state is a point in a triangle of three non-negative shares that sum to one. This constraint reflects a finite pool of political "attention" or "coordination capacity" at any given time — a society can allocate its coordination energy toward abstraction, identity, or extraction, but not an unbounded amount of all three simultaneously. [model:C27]

We additionally define a scalar **systemic energy** term $E(t) \ge 0$, representing the surplus resources (economic, informational, institutional) available to the system at time $t$. [definition:C28] $E$ is not part of the simplex — it is an external driving variable, analogous to temperature in a thermodynamic system, and it modulates the carrying capacity of $u$.

**Caveat:** A methodological caveat is owed at the outset. The equations that follow should be read as a proposed common notation for expressing the already-documented qualitative relationships surveyed in §1.1, not as a calibrated empirical model. None of the eleven Greek-letter coefficients introduced below have yet been estimated against real-world proxies — governance indices, corpus-based sentiment measures, institutional-trust surveys — and the state variables themselves ($u$, $t$, $p$, $E$) are theoretical constructs, not directly measured quantities. [fact:C29] The formalism's value at this stage lies in making the qualitative claims precise enough to be falsified once such proxies are chosen, not in the numerical content of the equations themselves. We flag this explicitly to avoid the false precision that mathematical notation can lend to what remains, for now, a structured and hopefully useful metaphor.

---

## 4. The Governing Equations

We propose a replicator-style dynamical system, structurally related to Lotka-Volterra competition models but with an explicit extraction term. [model:C30]

$$
\begin{aligned}
\dot{u} &= u\,(\alpha E - \beta t - \gamma p) \\
\dot{t} &= t\,(\delta - \varepsilon u E + \zeta p) \\
\dot{p} &= p\,(\eta u t - \theta)
\end{aligned}
$$

All Greek-letter coefficients are positive constants. Read informally:

- $\dot{u}$: Universalism grows in proportion to available energy $E$, but is suppressed both by the ambient pull of tribalism ($-\beta t$, the gravitational drag) and by direct extraction ($-\gamma p$).
- $\dot{t}$: Tribalism has a constant background growth term $\delta$ (gravity is always "on"), is suppressed only when high-energy universalism is active ($-\varepsilon u E$), and is *amplified* by parasitic activity ($+\zeta p$) — because parasites profit from stoking identity conflict once they have captured a universalist host, converting extracted trust into tribal grievance. [interpretation:C31]
- $\dot{p}$: Parasitism's growth is proportional to the **product** $u \cdot t$ — it requires both an open, trust-based structure to infiltrate ($u$) and an identity-based fault line to exploit ($t$) — and decays at constant rate $\theta$ in the absence of hosts to feed on. This product term is the mathematical signature of the observation that parasites do not generate their own ideology; they require the friction *between* the other two fields to metabolize. [interpretation:C32]

**Caveat:** A further technical caveat is necessary. The three equations above are written independently for expositional clarity, but as stated they do not automatically preserve the simplex constraint $u + t + p = 1$ introduced in §3. [derived:C33] A proper closed replicator system on $\Delta^2$ requires either normalization (dividing by $\dot{u} + \dot{t} + \dot{p}$) or an explicit shared depletion term subtracting the population-average growth rate from each equation. We leave this normalization implicit here rather than resolve it, consistent with the illustrative status of the formalism flagged above. A fully rigorous treatment would rewrite this system as a proper replicator equation with an explicit average-fitness subtraction term before any quantitative claim is drawn from it.

### 4.1 Why This Is Not a Two-Body Oscillator

If $p \equiv 0$, the system reduces to a damped competition between $u$ and $t$ modulated by $E$ — a simple oscillator that should converge to a fixed ratio as institutions "learn." [hypothesis:C34] This is the naive two-pole model, and it is empirically wrong (see §1). [interpretation:C35]

The $u \cdot t$ coupling term in $\dot{p}$ is what converts this from a two-body oscillator into a **three-body problem**. Three-body gravitational systems are famously non-integrable — they do not settle into stable orbits except on measure-zero initial conditions. [secondhand:C36] Competitive systems of this general dissipative, nonlinear type (in the spirit of May-Leonard cyclic competition or Rossler-type attractors) are similarly known to admit non-convergent, oscillatory, or chaotic trajectories rather than fixed points, for broad regions of parameter space. [fact:C37] [@may1975] We invoke this literature to support the qualitative claim that non-convergence is a *plausible* and well-precedented outcome for a system of this structural type — not as a proof that our specific, uncalibrated coefficients produce chaos. For generic initial conditions and generic coefficients within that broad class, the $(u, t, p)$ trajectory does not converge to a fixed point; it cycles, and the cycle's phase and amplitude are history-dependent, not law-like. [hypothesis:C38] This matches the observed record far better than any damped-pendulum model: political history does not appear to be converging on a stable regime; it appears to be **touring** a manifold of temporary states. [interpretation:C39]

### 4.2 Fixed Points and Their Instability

Setting $\dot{u} = \dot{t} = \dot{p} = 0$ yields, among trivial solutions, one interior fixed point: [derived:C40]

$$
\begin{aligned}
u^* &= \frac{\theta}{\eta t^*} \\
t^* &= \frac{\alpha E - \gamma p^*}{\beta} \\
p^* &= \frac{\delta - \varepsilon u^* E}{-\zeta}
\end{aligned}
$$

Note that these are only implicit conditions, not a closed-form solution: $u^*$, $t^*$, and $p^*$ each appear on the right-hand side of another's expression, so what is presented is a fixed-point *condition* rather than a derived value. Solving it explicitly requires substitution we do not carry out here.

A linear stability analysis (Jacobian eigenvalues at $\mathbf{x}^*$) suggests this interior fixed point is generically a **saddle or unstable spiral** for parameter regions in which parasite growth ($\eta$) is not swamped by parasite decay ($\theta$) — that is, *the system has no stable resting state in which universalism, tribalism, and parasitism coexist in permanent balance*, at least within that region. [hypothesis:C41] We have not carried out a full stability classification across the entire eleven-dimensional coefficient space, so this should be read as a structural possibility the model makes available rather than a theorem established for all parameter values; outside the region described, the system may instead approach one of the boundary equilibria discussed in §8.1. Any historical era that looks like a stable equilibrium is, in this model, at best a slow transit near a saddle point — which is one candidate explanation for why such eras (the "end of history" moments) always eventually end. [interpretation:C42]

### 4.3 The Guardian Problem: Recursive Capture

The base model above treats $\theta$, the parasite decay rate, as a fixed constant representing institutional resilience — courts, free presses, watchdogs, term limits, audits. This implicitly assumes anti-corruption machinery is permanently immune to the very dynamic it exists to suppress, which is not a safe assumption: oversight bodies, from the Praetorian Guard to modern regulatory agencies, are themselves prime targets for parasitic capture. [interpretation:C43] We therefore extend the model with a fourth equation governing $\theta$ itself: [model:C44]

$$
\dot{\theta} = -\kappa p \theta + \mu (\theta_0 - \theta)
$$

Here sustained parasitic pressure corrodes enforcement capacity at rate $\kappa$ (the guardians are captured too), while a repair process — institutional reform, elite turnover, generational renewal, constitutional renewal — restores $\theta$ toward a baseline $\theta_0$ at rate $\mu$. This closes a gap the base model leaves open: without it, the system has no way to represent the "who guards the guardians" failure mode, in which an apparently low-$p$, high-$\theta$ regime is not stable at all but is instead in a slow, silent decline toward a second, faster collapse once $\theta$ itself crosses zero. [interpretation:C45] This second route to collapse is distinct from — and can occur independently of — the founding-moment vulnerability discussed in §7, and any institution designed using this model's recommendations (§9) must be checked against it explicitly, not merely against the base three-variable system.

---

## 5. The Three-Body Problem of Political History

Mapping historical sequences onto trajectories through $(u, t, p)$-space gives Table 1.

Table 1: Historical phases mapped onto $(u, t, p)$ state space.

| Phase | $u$ | $t$ | $p$ | Description |
|---|---|---|---|---|
| Axial-age founding (early Buddhism, early Christianity, Confucian ethics) | high | low | low | High-coherence universalist articulation, minimal institutional mass |
| State assimilation (Imperial Buddhism, Constantinian Christianity, Han bureaucracy) | falling | rising | spiking | The $ut$ term ignites; parasitic institutions capture the moral vocabulary |
| Medieval/tribal consolidation | low | high | moderate | Parasite has fully repurposed universalist language as legitimating myth |
| Enlightenment | rising | falling | falling | Energy injection ($E$ rises via print, trade, science) re-inflates $u$ |
| Romantic backlash | falling | rising | moderate | Background gravity of $t$ reasserts as the marginal effect of $E$ saturates |
| WWI | unspecified | spiking | unspecified | Naive universalist internationalism collides with unresolved tribal gravity |
| Interwar/Cold War | contested | contested | spiking early | High-$E$ exceptional region (see §7); parasitic capture (illustrated historically by the rapid bureaucratic distortion of early Soviet universalism) occurs before $u$ can stabilize, because institutional immune systems had not yet evolved |
| Contemporary tribal pair | moderate (rhetorical) | high (behavioral) | high | Two mirror-image tribal formations, each using universalist vocabulary as legitimating cover, both structurally exhibiting high $p$ |

The table is illustrative, not a precise numerical fit — the point of the model is not curve-fitting but **structural diagnosis**: in every row where $p$ spikes, it does so at the *boundary* between a $u$-heavy and a $t$-heavy phase, exactly as the $\eta u t$ term predicts. [interpretation:C46] §8.1 addresses the equally important cases this table does *not* contain: polities that have not, in fact, spiked.

---

## 6. Moral Bandwidth and the Scale-Collapse Function

A second-order phenomenon requires its own formalism: the observation that moral vocabulary — the capacity of a system to *name* an act as atrocity — degrades non-linearly with the scale of the act, and that this degradation is mediated by the same $(u, t, p)$ state. [hypothesis:C47] This formalizes, and gives dynamical structure to, a pattern already documented under other names: Paul Slovic's research on "psychic numbing" and the collapse of compassion at scale, and the well-replicated identifiable-victim effect in behavioral economics, both describe the same empirical phenomenon the function below is built to capture. [fact:C48] [@slovic2007] What this model proposes to add to that literature is not the underlying finding — which is independently well-established — but the claim that the *rate* of collapse is itself state-dependent, modulated by the same $(u, t, p)$ coordinates governing the rest of the system, rather than a fixed cognitive constant. [hypothesis:C49]

We define **moral bandwidth** $M$ as the system's capacity to apply symmetric, universalist moral categories to an event of magnitude $s$ (for example, $s = \log(\text{deaths})$). [definition:C50]

$$
M(s; u, t, p) = u \exp(-s / s_c) - \lambda_t \, t \, s - \lambda_p \, p
$$

Here $s_c$ is a **scale-collapse constant** representing the largest event magnitude that unaided universalist cognition can process symmetrically (individual crimes, discrete tragedies), $\lambda_t$ captures the rate at which tribal narrative absorption *converts* moral magnitude into identity content (myth, grievance, sacrifice) rather than shared culpability, and $\lambda_p$ is a flat suppression term representing direct institutional and narrative suppression by parasitic capture. [model:C51] In words: moral bandwidth shrinks exponentially with event scale, and is further reduced in proportion to the tribal share and by a flat parasitic term.

### 6.1 The Moral Event Horizon

We define the **moral event horizon** $s_h$ as the value of $s$ at which $M(s) \to 0$: the scale beyond which the system can no longer produce symmetric moral vocabulary for the event at all. [definition:C52] Solving $M(s_h) = 0$ gives:

$$
s_h \approx s_c \ln\!\left( \frac{u}{\lambda_t \, t \, s_h + \lambda_p \, p} \right)
$$

This is a transcendental equation (self-referential in $s_h$), which is itself structurally meaningful: the event horizon is not fixed, it is **state-dependent** and **falls** as $t$ and $p$ rise. [derived:C53] In a high-$u$, low-$t$, low-$p$ regime, $s_h$ is large — the system can process even large-scale tragedy as tragedy. In a high-$t$ or high-$p$ regime, $s_h$ shrinks toward the scale of a single identifiable victim — beyond which the event stops being "a tragedy" and becomes, functionally, "history": absorbed into myth ($t$-mediated) or simply unspeakable within compromised institutions ($p$-mediated). [interpretation:C54]

This gives a candidate mechanism behind the folk observation that "a single death is a tragedy, a million is a statistic": it is not a claim about the relative moral weight of the deaths, but a direct consequence of $M(s)$ crossing zero as $s$ increases in the presence of nonzero $t$ and $p$. [hypothesis:C55] The model predicts (testably, in principle, via textual or sentiment analysis of historical archives) that events near $s_h$ should show a measurable transition from individuated moral language to either mythic/narrative language ($t$-dominant capture) or administrative/euphemistic language ($p$-dominant capture), rather than a smooth gradient. [hypothesis:C56]

---

## 7. Exceptional Regions: Energy Injection and Phase Transitions

Because $E(t)$ modulates both the growth rate of $u$ and the suppression rate of $t$ (via the $-\varepsilon u E$ term), sudden large increases in systemic energy — industrialization, the printing press, postwar reconstruction, computing, the internet — produce **exceptional regions** of the phase space: transient zones where the normally dominant saddle dynamics are overridden and $u$ can rise rapidly. [interpretation:C57]

These regions are the closest real history comes to the two-pole "Enlightenment defeats tribalism" narrative — but the model makes a specific, falsifiable prediction that the naive narrative misses: the $\eta u t$ term guarantees that any exceptional region with nonzero residual $t$ will also produce a spike in $\dot{p}$, because rising $u$ against a nonzero $t$ floor maximizes the product $u \cdot t$ that feeds parasitic growth. [derived:C58] In other words:

**Key claim:** Every exceptional universalist region contains, built into its own success condition, the maximum possible fuel for parasitic capture. [interpretation:C59]

This is why high-energy universalist moments (revolutionary founding periods, postwar international orders, rapid technological utopian movements) are historically the *most*, not least, vulnerable to early and severe parasitic capture — precisely when they appear most secure. [interpretation:C60] The model formalizes the intuition that naive utopias are not merely unlucky; they are structurally self-undermining unless an explicit counter-term is engineered against $p$ (see §9). [interpretation:C61]

---

## 8. Historical Trajectories Through State Space

Rather than narrate history as a sequence of eras, the model treats it as a single trajectory $\mathbf{x}(t)$ winding through the simplex, occasionally passing near (but never resting at) the unstable interior fixed point, and periodically entering exceptional regions driven by exogenous energy shocks $E(t)$. [model:C62]

Several qualitative features of this trajectory are worth naming explicitly:

- **Non-convergence is structural, not accidental.** Because the interior fixed point is unstable for realistic coefficients, no amount of institutional learning within a single $(u, t, p)$-parameterization converges the system. [hypothesis:C63] Learning can change the *coefficients* (better institutions can raise $\theta$, the parasite decay rate, or lower $\eta$, the parasite growth-from-friction rate) — but cannot, by itself, produce a stable rest state without also changing the structure of the equations.
- **Tribalism's floor never reaches zero.** Because $\dot{t}$ contains the constant term $\delta$, tribalism never fully vanishes even under maximal $u$ and $E$. This matches the observation that no universalist movement in history has ever fully eliminated identity-based cognition — only temporarily suppressed its expression. [interpretation:C64]
- **Parasitic capture is the fastest-moving variable.** Because $p$'s growth term is multiplicative in $u$ and $t$ rather than additive, $p$ can spike on a much shorter timescale than either $u$ or $t$ can rebuild — which is consistent with the historical observation that institutional corruption and capture (Stalin-era bureaucratic distortion of the Soviet project, the swift co-optation of many revolutionary movements generally) tends to visibly outpace the "natural" timescale of either ideological consolidation or identity re-formation. [interpretation:C65]

### 8.1 Comparative Statics: Why Not Everywhere, and Why Not Always

The trajectory framing above risks implying that every polity is condemned to tour the same cycle from U to P to T at the same tempo. That is not the model's claim, and the historical record contains an important class of cases it must be able to accommodate rather than explain away: long-duration, comparatively stable mixed orders — the Nordic social democracies, Switzerland's confederal cantons, Botswana's post-independence governance record — that have sustained high $u$ and moderate $t$ for many decades without the catastrophic $p$-spikes the table in §5 associates with founding moments elsewhere. [interpretation:C66]

The model's account of these cases is not that they have somehow escaped the triad, but that they occupy a region of parameter space where $\theta$ (parasite decay, including its recursive form in §4.3) has been engineered durably high and $\eta$ (parasite growth-from-friction) durably low — through mechanisms such as consensus-based coalition government, high press freedom, small-N accountability networks, and guardian institutions unusually resistant to the capture dynamic of §4.3. [hypothesis:C67] These cases are therefore not falsifications of the model but its most important calibration targets: any future parameterization of $\eta$ and $\theta$ should be able to reproduce both the rapid Bolshevik-style $p$-spike and the multi-generational Nordic plateau from the same functional form, differing only in coefficient values, not in structure. [normative:C68] A model that cannot in principle generate both outcomes would be wrong; a model that has not yet been shown to generate both, as is currently the case here, is merely incomplete. Supplying that comparative calibration is treated in §10 as the immediate next research task rather than a settled result.

---

## 9. Design Principles: Toward Parasite-Resistant Universalism

If the model is approximately correct, the practical implication is sharp and somewhat counter to conventional political rhetoric on all sides.

**Key claim:** The primary design target for anyone attempting to build a durable universalist system should not be the suppression of tribalism ($t$), but the suppression of the parasite growth coefficient $\eta$ and the elevation of the parasite decay coefficient $\theta$ — including its recursive, guardian-capture form (§4.3). [normative:C69]

Concretely, this reframes several perennial debates as *engineering* problems rather than moral ones:

- **Institutional transparency** functions as a direct reduction of $\eta$: it reduces the "friction surface" available for extraction between open ($u$) and identity-based ($t$) subsystems. [hypothesis:C70]
- **Redundant, decentralized enforcement** raises $\theta$ and, importantly, lowers $\kappa$ in §4.3's guardian equation: a parasite that captures one node does not automatically capture the whole narrative and resource-allocation apparatus, and no single guardian institution can be captured to bring down the entire enforcement layer. [hypothesis:C71]
- **Tolerance for tribal expression within bounded domains** — rather than attempts at total suppression — may counter-intuitively *lower* long-run $p$, because attempts to drive $t \to 0$ increase the effective pressure of $\delta$ (a compressed spring), which historically manifests as violent correction (the WWI pattern: naive universalist suppression of national identity followed by explosive tribal reassertion) and *also* creates larger $u \cdot t$ friction surfaces during the suppression phase itself. [hypothesis:C72]
- **Treating tribalism as background gravity rather than as an enemy to defeat** reallocates political energy away from an unwinnable fight (against $\delta$, a constant) and toward the winnable fight (against $\eta$ and $\theta$, both engineerable constants). [normative:C73]

This is the mathematical restatement of this document's central claim: naive utopian projects fail not because tribalism is too strong, but because they mistake tribalism for the threat, leaving the parasite term completely undefended — and an undefended multiplicative growth term against a constant background field will always eventually dominate. [interpretation:C74]

### 9.1 An Operational Test for P, and Why It Must Be Symmetric

Because "parasite" is among the most rhetorically loaded words available in political discourse, this model is only responsible if it supplies a test for the category that cannot simply collapse into "whichever faction I oppose." [normative:C75] We propose the following conditions, all of which must hold before an actor or institution is classified as exhibiting high $p$ rather than high $t$ or low $u$:

1. **Ideological content-independence.** The actor's vocabulary and stated values could be swapped for those of a rival faction with no material change in its extraction behavior. A structure that behaves identically whether it is nominally communist, nationalist, religious, or liberal is exhibiting $p$; a structure whose behavior tracks its stated ideology, even when that ideology is one the observer dislikes, is exhibiting $u$ or $t$, not $p$. [definition:C76]
2. **Institutional outlasting.** The actor or apparatus persists across changes of ideological leadership, regime, or founding cohort, continuing to extract value under new banners. [definition:C76]
3. **Directional asymmetry of information flow.** The actor systematically increases its own informational or resource position while decreasing the transparency or accountability available to those it extracts from. [definition:C76]
4. **Falsifiable counter-test.** The classification must in principle be revocable: if the actor submits to external audit, term limits, or redistributive constraint and the extraction behavior stops, it was accountable governance, not parasitism, and the classification must be withdrawn. [definition:C76]

Any application of this model — including by its own authors — that labels a rival political tribe "parasitic" without checking these four conditions is not using the model; it is using the model's vocabulary to do what tribal cognition (§2.2) already does for free. [normative:C77] This is the single most important safeguard the model requires, and the one most likely to be skipped by exactly the actors most eager to cite the model in the first place. [guess:C78]

### 9.2 A Note on Normative Status: Description Is Not Destiny

A clarification is owed regarding the status of §2.2's claim that tribalism cannot be eliminated. That claim is empirical, not prescriptive: it is a statement about the durability of a cognitive default, not a statement about what is owed to it, and it does not license the inference that resisting tribal escalation locally is futile or not worth attempting. Persistent forces are not thereby forces one has no obligation to resist — gravity is persistent and we still build airplanes. [normative:C79]

Nor does the model's diagnostic framing license unconstrained technocratic intervention against $p$ in the name of "engineering." The same concentration of monitoring and enforcement capacity that raises $\theta$ is also the raw material from which the next parasitic capture is built, if that capacity is not itself bound by the accountability constraints in §9.1 and the guardian-capture dynamic of §4.3. [hypothesis:C80] Any institution built on this model's recommendations should therefore be designed with explicit, hard, rights-based limits — due process, sunset clauses, distributed rather than centralized audit authority — that apply even when, especially when, the institution's stated purpose is fighting $p$. [normative:C81] A design that raises $\theta$ by concentrating unchecked power in a single anti-corruption body has not solved the problem this model describes; it has relocated it, and §4.3's $\kappa$ term will eventually find it. [interpretation:C82]

---

## 10. Scope, Calibration, and Epistemic Status

It is worth stating plainly, in one place, what kind of claim this document is making, since the notation used throughout risks implying a stronger claim than is warranted. The Universalist-Tribal-Parasite model is best understood as a **synthetic diagnostic heuristic**: a proposed common vocabulary and state space for integrating findings that already exist, in more rigorous and empirically grounded form, across political science, evolutionary anthropology, and institutional economics (§1.1). [definition:C83] It is not, at present, a validated or falsifiable predictive theory, for three specific and correctable reasons:

1. **No coefficient has been estimated against data.** The Greek-letter constants introduced in §4 (and §4.3) are currently free parameters chosen for narrative plausibility, not fit to governance indices (for example, the World Bank's Worldwide Governance Indicators or Transparency International's Corruption Perceptions Index), corpus-based sentiment measures, or historical event datasets of the kind used in cliodynamics. [fact:C84]
2. **The comparative cases have been identified but not fitted.** §8.1 names the right class of negative cases — long-duration stable mixed orders — but does not yet demonstrate that the same functional form reproduces both those cases and the founding-moment collapses of §5 from a single, principled parameterization. [fact:C85]
3. **The state variables are constructs, not measurements.** $u$, $t$, and $p$ are not currently operationalized in a way that an independent party could code from primary sources and reproduce. [fact:C86]

None of these are objections to the model's continued development; they are the model's own research agenda, listed here explicitly so that the confidence lent by the equations in §3 and §4 does not imply they have already been resolved. A model that specifies exactly what would need to be true to falsify it, and has not yet done the work to check, is in a meaningfully better epistemic position than one offering no such specification at all — but it is not yet in the position its equations visually suggest, and readers, especially readers inclined to invoke §9's design principles in real institutional debates, should treat it accordingly. [interpretation:C87]

---

## 11. Conclusion: The Cycle Continues

The Universalist-Tribal-Parasite model does not predict an end to the cycle it describes — quite the opposite. Because the interior fixed point is unstable and the tribal background term never vanishes, the model predicts, structurally, that:

1. Every high-energy exceptional region will produce a universalist resurgence, [hypothesis:C88]
2. every such resurgence will generate, as an unavoidable side-effect of its own success, the maximal friction surface for parasitic capture, [hypothesis:C88]
3. every episode of parasitic capture will eventually stoke a tribal correction, and [hypothesis:C88]
4. every tribal correction will eventually exhaust itself and await the next energy shock — unless, per §4.3, its own guardians are captured first, in which case collapse can arrive by a second, faster route. [hypothesis:C88]

This is not pessimism; it is a specification, offered in the more modest register described in §10: a synthesis of existing findings into a common vocabulary, not a proven law of history. A system that cannot be permanently stabilized can still be **steered** — its amplitude reduced, its parasitic capture delayed and weakened, its tribal corrections made less violent — by engineering directly against the $\eta$ and $\theta$ terms rather than against $\delta$, and by binding that engineering itself to the symmetric test of §9.1 and the rights-based limits of §9.2. [hypothesis:C89] The lesson of the long historical current, from the Axial age through the Enlightenment, through the world wars, through the Cold War, and into the present, is not that reason must defeat tribe, or that tribe must be tolerated, but that **every era which forgot to defend against the parasite — and every defense against the parasite that forgot to guard itself — lost the fight it thought it was having.** [interpretation:C90]

---

## Claim Ledger

| ID | Claim | Status | Basis | Check |
|---|---|---|---|---|
| C1 | The pendulum model of political history is a projection artifact of a three-body system | interpretation; untested | Argument of §1 and §4 | Fit competing two-pole and three-field models to the same data |
| C2 | The two-pole model correctly anticipates backlash after rule-based or identity-based phases | interpretation | Qualitative historical pattern | Code historical phases and test the anticipated reversals |
| C3 | Universalist movements are captured almost immediately by an extractive layer rather than degrading gradually | interpretation | Michels, Fukuyama, historical cases | Compare time-to-capture across founding movements |
| C4 | Moral labeling of the same act changes discontinuously with scale | hypothesis; not tested here | Psychic-numbing literature is suggestive only | Archive language analysis near large-scale events |
| C5 | The amplitude of political oscillation is roughly constant or growing across eras | interpretation | Qualitative reading of history | Measure amplitude with a consistent index over time |
| C6 | Adding Parasitism makes the system a three-body problem that is non-convergent | hypothesis; depends on coefficients | Structure of the $\dot{p}$ term | Simulate the system over a parameter range |
| C7 | Michels documented rapid oligarchic entrenchment in egalitarian organizations | fact | Michels 1911 | Read the source |
| C8 | Olson showed concentrated interests capture benefits meant for diffuse coalitions | fact | Olson 1965 | Read the source |
| C9 | Polanyi described a recurring societal backlash against unregulated market liberalization | fact | Polanyi 1944 | Read the source |
| C10 | Klitgaard's identity is corruption = monopoly + discretion - accountability | fact | Klitgaard 1988 | Read the source |
| C11 | Klitgaard's identity is an institutional-scale ancestor of the $\eta/\theta$ coefficients | interpretation | Structural analogy | Map the three Klitgaard terms onto $\eta$ and $\theta$ |
| C12 | Fukuyama's repatrimonialization traces the slide from U to P this model formalizes | interpretation | Fukuyama 2014 | Compare Fukuyama's cases with the model's trajectories |
| C13 | Turchin's cliodynamics treats political stability as a quantifiable dynamical system | fact | Turchin 2003, 2016 | Read the sources |
| C14 | Universalism is energy-expensive and requires surplus to exist | interpretation | Qualitative argument | Relate institutional surplus to universalist outcomes |
| C15 | Founding articulations of universalism exceed what surrounding societies can sustain | interpretation | Historical examples | Compare founding texts with early practice |
| C16 | Universalism can be modeled as a share $u(t)$ in [0, 1] | model | Modeling choice | Operationalize and measure $u$ |
| C17 | Tribalism is the ground state of political cognition | interpretation | Social identity theory and coalitional psychology | Review the cross-cultural evidence |
| C18 | Tribalism cannot be argued away and is only temporarily outweighed | interpretation | Social identity theory | Longitudinal studies of identity salience |
| C19 | Prejudice-reduction interventions suppress expression of tribal cognition without eliminating the disposition | secondhand; not checked by the author | Tajfel 1979; Tooby and Cosmides 1992 | Review intervention meta-analyses |
| C20 | Tribalism can be modeled as a share $t(t)$ with a constant restoring force | model | Modeling choice | Estimate a background term from data |
| C21 | Parasitism is a strategy of extracting value from coordination costs paid by U and T | definition | Stipulated for this piece | Not applicable |
| C22 | Parasitism is an emergent strategy assembled from several distinct adaptations | interpretation | Tooby and Cosmides 1992 | Compare with models of cheater strategies |
| C23 | A claim that an actor exhibits P should be read as a hypothesis until the operational test is applied | normative | Guard against misuse of the category | Apply §9.1 |
| C24 | P has at least four institutional modes: grand capture, petty extraction, clientelist capture, narrative capture | definition | Governance-corruption literature | Check coverage against case data |
| C25 | Calibration should map Klitgaard's three terms onto $\eta$ and $\theta$ directly | normative | Avoids free parameters | Attempt the mapping on governance data |
| C26 | Parasitism can be modeled as a share $p(t)$ driven by exposure to U and T | model | Modeling choice | Operationalize and measure $p$ |
| C27 | A finite attention pool justifies the simplex constraint $u + t + p = 1$ | model | Modeling choice | Test whether shares sum meaningfully |
| C28 | Systemic energy $E(t)$ is an external driving variable outside the simplex | definition | Stipulated for this piece | Not applicable |
| C29 | None of the coefficients has been estimated against real-world proxies, and the state variables are constructs | fact | Status of this document | Inspect the document for any fit |
| C30 | A replicator-style system related to Lotka-Volterra models can express the coupling | model | Structural analogy | Compare with standard replicator forms |
| C31 | Parasites profit from stoking identity conflict after capturing a universalist host | interpretation | Historical examples | Case studies of post-capture polarization |
| C32 | The product term $ut$ reflects that parasites need friction between U and T | interpretation | Qualitative argument | Test dependence of capture on both factors |
| C33 | The equations as written do not preserve the constraint $u + t + p = 1$ | derived | Summing the three derivatives | Sum the right-hand sides |
| C34 | With $p = 0$ the system should converge to a fixed ratio | hypothesis; not simulated | Qualitative expectation | Simulate the reduced system |
| C35 | The naive two-pole model is empirically wrong | interpretation | §1 observations | Compare against §1 data |
| C36 | Three-body gravitational systems are non-integrable and rarely settle into stable orbits | secondhand | General dynamics literature | Consult a dynamics text |
| C37 | Competitive nonlinear systems of this type can show non-convergent or chaotic trajectories | fact | May and Leonard 1975 | Read the source |
| C38 | For generic coefficients this system cycles and does not converge | hypothesis; not simulated | Analogy to cyclic-competition systems | Simulate over a parameter range |
| C39 | Political history is touring temporary states rather than converging | interpretation | Qualitative reading | Test for convergence in historical indices |
| C40 | The interior fixed point satisfies the stated implicit conditions | derived | Setting each equation to zero | Verify algebraically |
| C41 | The interior fixed point is generically a saddle or unstable spiral in some parameter region | hypothesis; no full classification | Informal Jacobian argument | Compute Jacobian eigenvalues |
| C42 | Apparently stable eras are slow transits near a saddle | interpretation | Model reading | Check for slowdown near saddle in simulation |
| C43 | Oversight bodies are themselves prime targets for parasitic capture | interpretation | Praetorian Guard and regulatory-capture cases | Compare capture rates of oversight bodies |
| C44 | The parasite decay rate evolves by $\dot{\theta} = -\kappa p \theta + \mu(\theta_0 - \theta)$ | model | Modeling choice | Estimate $\kappa$ and $\mu$ |
| C45 | A low-$p$, high-$\theta$ regime can be in silent decline toward a second collapse | interpretation | Reading of the guardian equation | Simulate the extended system |
| C46 | In every row where $p$ spikes, it does so at the boundary between $u$-heavy and $t$-heavy phases | interpretation; illustrative | Table 1 | Code phases independently and test |
| C47 | Moral vocabulary degrades non-linearly with event scale, mediated by $(u, t, p)$ | hypothesis | Slovic and related work, extended here | Textual analysis of archives |
| C48 | Psychic numbing and the identifiable-victim effect are documented | fact | Slovic 2007 | Read the source |
| C49 | The rate of moral-vocabulary collapse is state-dependent | hypothesis | This model's addition | Compare collapse rates across regimes |
| C50 | Moral bandwidth is the capacity to apply symmetric moral categories to an event of magnitude $s$ | definition | Stipulated for this piece | Not applicable |
| C51 | $M$ is given by the stated function of $s$, $u$, $t$, and $p$ | model | Modeling choice | Fit $s_c$, $\lambda_t$, $\lambda_p$ |
| C52 | The moral event horizon is the scale at which $M$ reaches zero | definition | Stipulated for this piece | Not applicable |
| C53 | The event horizon is state-dependent and falls as $t$ and $p$ rise | derived | Monotonicity of $M$ in $t$ and $p$ | Differentiate $M$ |
| C54 | High $t$ or $p$ shrinks the horizon toward a single identifiable victim | interpretation | Reading of the model | Compare horizons across regimes |
| C55 | Zero-crossing of $M$ is a candidate mechanism for "a million is a statistic" | hypothesis | Model-based argument | Test with archival language |
| C56 | Language near the horizon shifts abruptly to mythic or administrative forms | hypothesis | Model prediction | Textual and sentiment analysis |
| C57 | Large energy increases produce exceptional regions where $u$ rises rapidly | interpretation | Historical examples | Compare $u$ proxies after energy shocks |
| C58 | Exceptional regions with nonzero $t$ produce a spike in $\dot{p}$ | derived; requires $\eta u t > \theta$ | Form of the $\dot{p}$ equation | Check the sign of $\dot{p}$ |
| C59 | Exceptional universalist regions contain the maximum fuel for parasitic capture | interpretation | Reading of the $ut$ term | Case studies of founding periods |
| C60 | High-energy universalist moments are the most vulnerable to early capture | interpretation | Historical examples | Compare capture timing |
| C61 | Naive utopias are structurally self-undermining without a counter-term against $p$ | interpretation | Model reading | Case studies of utopian projects |
| C62 | History can be treated as a trajectory through the simplex with exogenous shocks | model | Modeling choice | Reconstruct trajectories from data |
| C63 | Non-convergence is structural because the interior fixed point is unstable | hypothesis | Depends on C41 | Simulate with learning-adjusted coefficients |
| C64 | No universalist movement has fully eliminated identity-based cognition | interpretation | Historical record | Review evidence of persistence |
| C65 | Parasitic capture outpaces ideological consolidation and identity re-formation | interpretation | Soviet and revolutionary cases | Compare timescales |
| C66 | Nordic, Swiss, and Botswanan orders sustained high $u$ without catastrophic $p$-spikes | interpretation | Comparative governance record | Compare governance indices over time |
| C67 | These orders sit where $\theta$ is durably high and $\eta$ durably low | hypothesis | Model-based reading | Estimate $\eta$ and $\theta$ per polity |
| C68 | One functional form should reproduce both Bolshevik-style spikes and the Nordic plateau | normative | Standard of adequacy for the model | Fit both from a single form |
| C69 | Designers should target $\eta$ and $\theta$ rather than suppression of $t$ | normative | Model implication | Not applicable |
| C70 | Institutional transparency reduces $\eta$ | hypothesis | Transparency and corruption literature | Measure $\eta$ proxies before and after reforms |
| C71 | Redundant, decentralized enforcement raises $\theta$ and lowers $\kappa$ | hypothesis | Model-based argument | Compare capture rates by enforcement structure |
| C72 | Tolerating bounded tribal expression lowers long-run $p$ | hypothesis | WWI pattern as illustration | Compare suppression and tolerance regimes |
| C73 | Political energy should go to fighting $\eta$ and $\theta$ rather than tribalism | normative | Model implication | Not applicable |
| C74 | Naive utopias fail because they ignore the parasite term | interpretation | Model reading | Case studies |
| C75 | A test for P must not collapse into "the faction I oppose" | normative | Guard against misuse | Apply §9.1 |
| C76 | An actor counts as high $p$ only if the four stated conditions all hold | definition | Stipulated operational test | Apply the conditions to cases |
| C77 | Labeling a rival tribe parasitic without the four checks is not using the model | normative | Consistency with §9.1 | Audit applications |
| C78 | The symmetric test is the most important safeguard and the most likely to be skipped | guess | Author's bet | Observe uses of the model |
| C79 | A persistent force is not thereby a force one has no obligation to resist | normative | Argument by analogy | Not applicable |
| C80 | Concentrated monitoring capacity is raw material for the next parasitic capture | hypothesis | Model and capture history | Compare capture of centralized and distributed auditors |
| C81 | Institutions built on the model need hard rights-based limits | normative | Design argument | Not applicable |
| C82 | A single unchecked anti-corruption body relocates rather than solves the problem | interpretation | Reading of the guardian equation | Case studies of anti-corruption agencies |
| C83 | The model is best understood as a synthetic diagnostic heuristic | definition | Stipulated scope for this piece | Not applicable |
| C84 | No coefficient has been estimated against data | fact | Status of this document | Inspect the document for any fit |
| C85 | The comparative cases have been identified but not fitted | fact | Status of this document | Inspect §8.1 for any fit |
| C86 | The state variables are not operationalized for independent coding | fact | Status of this document | Attempt independent coding |
| C87 | A model that states its own falsification conditions is in a better position than one that does not | interpretation | Epistemic argument | Not applicable |
| C88 | The four-step cycle of resurgence, capture, tribal correction, and exhaustion follows from the model | hypothesis | Structure of the equations | Simulate the extended system |
| C89 | The system can be steered by engineering against $\eta$ and $\theta$ | hypothesis | Model implication | Compare outcomes of such reforms |
| C90 | Eras that neglected the parasite, and defenses that neglected to guard themselves, lost the fight | interpretation | Overall argument | Case studies |

---

## Appendix A: Symbol Table

Table 2: Symbols used in this piece.

| Symbol | Meaning |
|---|---|
| $\mathbf{x}$ | State vector $(u, t, p)$ on the 2-simplex $\Delta^2$ |
| $u$ | Share of political charge organized around Universalism |
| $t$ | Share of political charge organized around Tribalism |
| $p$ | Share of political charge organized around Parasitism |
| $E$ | Systemic energy: surplus resources available to the system |
| $\alpha$ | Growth of $u$ per unit of energy $E$ |
| $\beta$ | Drag on $u$ from tribalism |
| $\gamma$ | Suppression of $u$ by extraction |
| $\delta$ | Constant background growth of tribalism |
| $\varepsilon$ | Suppression of $t$ by energetic universalism |
| $\zeta$ | Amplification of $t$ by parasitic activity |
| $\eta$ | Parasite growth from friction between $u$ and $t$ |
| $\theta$ | Parasite decay rate (institutional resilience) |
| $\theta_0$ | Baseline value of $\theta$ restored by repair processes |
| $\kappa$ | Rate at which parasitic pressure corrodes enforcement capacity |
| $\mu$ | Rate at which repair restores $\theta$ toward $\theta_0$ |
| $M$ | Moral bandwidth |
| $s$ | Event magnitude (for example, log of deaths) |
| $s_c$ | Scale-collapse constant |
| $\lambda_t$ | Rate at which tribal narrative converts moral magnitude into identity content |
| $\lambda_p$ | Flat suppression of moral bandwidth by parasitic capture |
| $s_h$ | Moral event horizon: scale at which $M$ reaches zero |

---

## References

- [@fukuyama2014] Fukuyama, Francis. *Political Order and Political Decay*. Farrar, Straus and Giroux, 2014.
- [@klitgaard1988] Klitgaard, Robert. *Controlling Corruption*. University of California Press, 1988.
- [@may1975] May, Robert M., and Warren J. Leonard. "Nonlinear Aspects of Competition Between Three Species." *SIAM Journal on Applied Mathematics* 29(2), 1975.
- [@michels1911] Michels, Robert. *Zur Soziologie des Parteiwesens in der modernen Demokratie*. Werner Klinkhardt, 1911.
- [@olson1965] Olson, Mancur. *The Logic of Collective Action*. Harvard University Press, 1965.
- [@polanyi1944] Polanyi, Karl. *The Great Transformation*. Farrar and Rinehart, 1944.
- [@slovic2007] Slovic, Paul. "If I Look at the Mass I Shall Never Act: Psychic Numbing and Genocide." *Judgment and Decision Making* 2(2), 2007.
- [@tajfel1979] Tajfel, Henri, and John C. Turner. "An Integrative Theory of Intergroup Conflict." In *The Social Psychology of Intergroup Relations*, edited by William G. Austin and Stephen Worchel. Brooks/Cole, 1979.
- [@tooby1992] Tooby, John, and Leda Cosmides. "The Psychological Foundations of Culture." In *The Adapted Mind*, edited by Jerome H. Barkow, Leda Cosmides, and John Tooby. Oxford University Press, 1992.
- [@turchin2003] Turchin, Peter. *Historical Dynamics: Why States Rise and Fall*. Princeton University Press, 2003.
- [@turchin2016] Turchin, Peter. *Ages of Discord*. Beresta Books, 2016.

## Changelog

- 2026-08-29: Converted from HTML to the site Markdown format.
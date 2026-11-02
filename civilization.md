# The Executable Theory Laboratory

## A Project Plan for a Geopolitical Scenario Mapper Built on Competing, Calibrated, Agent-Authored Models

---

## 1. The Idea in One Paragraph

The project is a system for building, testing, and comparing **executable theories** of how strategic actors behave in a shared, changing world. Geopolitics is the first and hardest application. The system can model historical counterfactuals ("what if Russia had not mobilized in 1914?"), explore future scenarios, and, most importantly, tune and criticize the explanatory models that produce those answers.

Language models are not the actors here. They act as **modelers**. They read natural-language theories and evidence. Then they compile them into inspectable, versioned, executable artifacts written in a restricted, differentiable modeling language:

- world schemas
- actor goal functions
- actor world-models
- observation functions
- transition rules

A deliberately unintelligent engine runs those artifacts. Historical trajectories are the dataset against which the theories are fitted, falsified, and revised.

The output is not one synthetic history. It is a map of outcomes over uncertain assumptions. It shows which conclusions are robust, which depend on fragile or hard-to-observe parameters, and where rival theories disagree.

---

## 2. Why This Is Worth Building

### 2.1 The problem with "LLM pretends to be a country"

The conventional way to use language models for geopolitical simulation is role-play. Each country is an LLM agent with a profile, an action space, and a series of rounds. In each round, agents read the situation, decide, and see consequences. Work such as WarAgent formalizes this pattern well. It separates country profiles, action spaces, interaction mechanisms, and simulation rounds.

The approach has structural weaknesses that no amount of prompt engineering fixes:

- **The model is the physics.** An LLM may decide what a country does and also, implicitly or explicitly, what happens as a result. Then there is no separable causal model to inspect. The theory of the world is buried in weights and prompts.
- **Model choice leaks into outcomes.** Different underlying models show different strategic temperaments and risk biases, and these can compound over repeated rounds. A simulated escalation may reflect a quirk of the model rather than anything about the actors being modeled.
- **Nothing is falsifiable.** A narrative produced by role-play cannot be fitted to history, so it cannot be shown wrong. It can only be judged plausible or implausible. Agent-based simulation of this kind drifts toward interactive fiction.
- **Counterfactuals are mushy.** "What if Kennedy had been more aggressive?" has no precise meaning when "Kennedy" is a prompt.
- **The economics do not scale.** An honest answer to a counterfactual needs thousands of stochastic rollouts. If every actor decision in every step of every rollout is a language-model call, a single phase diagram costs as much as a research grant.

### 2.2 The reframing

The underlying object is not a geopolitics game. It is a **partially observed, heterogeneous-model dynamical system whose parameters, and even whose structure, can be inferred from history.**

That reframing has three consequences:

1. The actual world dynamics must be separated from each actor's *belief* about those dynamics.
2. The world dynamics must be an explicit, editable, testable object, not an emergent property of a chat transcript.
3. The language model's role moves from runtime performer to **author and critic of models**. It replaces the modeler, not the model.

Each consequence is scientific and practical at once:

- **Structural causal discipline.** Separating world physics, observation, and belief is what makes models falsifiable.
- **Cheap runs.** Compiling theories ahead of time into a mechanical runtime means ten thousand Monte Carlo rollouts cost arithmetic, not token inference.

---

## 3. The Formal Structure

The system rests on a small set of components. Each one is separate on purpose, because each separation creates a class of experiment that would otherwise be impossible.

### 3.1 Time

A shared scenario evolves along a discrete time axis. The size of a time step depends on the model: days for a crisis, years for a structural rivalry. Every model declares its own time semantics, and a model's step size counts as a model assumption.

### 3.2 The objective world state

At each time *t* there is a canonical world state **W_t**, a deliberately limited vector of quantities. Example variables:

- military capability
- territorial control
- industrial capacity
- fiscal condition
- trade dependencies
- commodity availability
- domestic stability
- alliance relationships
- technological capability
- population sentiment

The correct set of variables is **not known in advance**. The initial ontology is a hypothesis. Part of the system's job is to discover which variables are missing, which are redundant, and which are mis-specified (Section 6.4).

Because the ontology will change, W_t is represented as a typed **entity–component store**, not a fixed vector. Each variable is a named, typed component with a declared range, meaning, and default fallback. When a new latent variable is proposed, existing actor models that never reference it keep compiling unchanged. Ontology growth then becomes a local edit, not a brittle rewrite across the whole repository.

One component group is not optional. Every geopolitical or macroeconomic template carries a non-deletable **Human Cost Vector**: civilian mortality, displacement, and resource deprivation. Modeled actors may assign these quantities zero weight in their goals, as real actors sometimes do. The world still tracks them, and every output displays them. Leaders can be indifferent to human suffering in the model; the model itself cannot be.

### 3.3 Observation: actors do not see the world

No actor observes W_t directly. Actor *i* receives an observation:

> O_{i,t} ~ S_i(W_t)

Here S_i is that actor's **sensing apparatus**. It may be noisy, delayed, partial, biased, or manipulated.

This separation matters a great deal. A superpower, a rebel movement, an electorate, an intelligence service, and an oil company can live in exactly the same objective world while holding radically different information about it. The chain is:

> **world truth → observation → belief**
> W_t → O_{i,t} → B_{i,t}

With this structure, the system can model the following without corrupting the underlying world:

- secrecy
- propaganda
- intelligence quality
- information delay
- deception
- plain epistemic failure

Espionage needs no special mechanic. An intercepted document is simply an observation that becomes available to another actor. Deception is an action that changes another actor's sensing function. Information topology replaces scripted intrigue.

The step from observation to belief is standardized in the platform runtime, not hand-written by each model author. Belief updating uses well-understood filters, such as particle filters or ensemble Kalman filters, configured by the actor's declared priors and sensing model. Authors decide *what* an actor believes initially and *how noisy* its sensing is. The inference machinery that turns observations into beliefs is shared, tested, and identical across actors. This removes a large class of subtle bugs and makes belief trajectories comparable between models.

### 3.4 Actors: goals, model, policy

It is tempting to give each actor one large "personality" vector. The design resists that. Each actor decomposes into three separable parts:

> A_i = (G_i, M_i, P_i)

- **Goals (G_i):** what outcomes the actor values, and how it trades them off.
- **World model (M_i):** what the actor believes causes what. This includes its own predictive transition function F̂_i, which can and usually will differ from the true transition F.
- **Policy (P_i):** given beliefs and goals, how the actor actually chooses. Options include expected-utility maximization, lexicographic priorities, satisficing, and rule-following.

Because the three are separable, the system can express situations that a personality vector blurs together:

- Two actors want the same thing but disagree about how to get it (same G, different M).
- Two actors understand reality the same way but want different outcomes (same M, different G).
- Two actors agree on both but behave differently because one is risk-seeking (same G and M, different P).

An actor can therefore be **perfectly rational relative to a catastrophically wrong model**. The simulator never has to "act irrational." It only has to give the actor a bad map.

### 3.5 Theory of mind as an explicit, bounded recursion

Each actor holds a model of the world and also models of other actors:

> M_{ij}: actor i's model of actor j

These are parameters and distributions, not prose. Take a generated model of the Cuban Missile Crisis. It might encode that the American leadership believes the Soviet leadership:

- places extreme weight on regime survival
- finds nuclear exchange extremely costly

It might also encode that the American leadership is uncertain how much control Moscow has over its field commanders. Each of those beliefs is a distribution that can be edited.

The recursion is bounded: *i*'s model of *j*'s model of *i*, to a declared depth. The default cap is depth *k* ≤ 2. Deeper recursion multiplies parameters rapidly while adding little that historical evidence can constrain. Depth remains a declared model assumption, and testing whether a deeper level ever earns its keep is itself an experiment.

This makes a new kind of counterfactual possible. The question shifts from

> *What if Kennedy were more aggressive?*

to

> *What if Kennedy underestimated Khrushchev's aversion to nuclear exchange by 30%?*

The second question is a precise intervention on a specific, inspectable quantity.

### 3.6 Decisions as typed interventions

Actors choose from **typed interventions**, not free-form prose:

- sanction (target, intensity)
- mobilize (region, magnitude)
- subsidize (sector, amount)
- signal (target, message)
- form alliance (partner)
- change interest rate (delta)

A decision is drawn from the actor's policy:

> D_{i,t} ~ P_i(B_{i,t}, G_i, M_i)

The decision logic chooses *which* intervention to make. The engine alone defines *what the intervention means*. This separates decision intelligence from physics. Nothing an actor says can change what a sanction does in the world. It can only change whether a sanction is imposed.

### 3.7 Reintegration: the transition function

All simultaneous decisions, plus exogenous shocks, feed into the world transition:

> W_{t+1} ~ F(W_t, D_{1,t}, …, D_{k,t}, E_t; θ)

Here F is the **geopolitical physics engine**, E_t is exogenous noise and events, and θ is the parameter vector.

The central claim of the project is that **θ, and eventually the structure of F, should be learned rather than simply authored.** Historical trajectories become training and validation data. Given an observed path W_0, D_0, W_1, D_1, …, W_T, find parameters that make that path reasonably probable. Then check whether those parameters hold up on *other* historical episodes.

At that point the software stops being a scenario generator and becomes an experimental laboratory for explanatory models.

---

## 4. Architecture: The LLM as Model Compiler

### 4.1 Two layers

**Authoring / compilation layer.** Natural-language theory and evidence go in. For example: *"Model the Cuban Missile Crisis. Treat regime survival, escalation risk, alliance credibility, and domestic political cost as strategic values. The American leadership has imperfect estimates of Soviet willingness to escalate…"*

Executable artifacts come out:

- world schema
- actor schemas
- observation functions
- utility (goal) functions
- actor predictive models
- decision / policy functions
- transition functions
- initial state
- parameter priors
- measurement models linking latent state to observable evidence
- invariants
- exogenous event processes

**Simulation layer.** The compiled model runs mechanically:

> state → observations → belief filtering → actor calculations → actions → transition with noise → next state

The runtime contains **no language-model reasoning at all**. Every behavior in a run traces back to an inspectable artifact.

### 4.2 The pipeline primitive

The primitive operation is not *prompt → simulation*. It is:

> **description + evidence → executable model → tests → simulation**

Every run leaves a concrete, diffable, reproducible artifact. One distinction runs through the whole design. An actor's *predict* function encodes what that actor thinks will happen. The world's *transition* function determines what does happen. Keeping these as separate objects is what makes misperception, miscalculation, and surprise representable.

### 4.3 The compilation target: a restricted, differentiable modeling language

It would be easy to let authoring agents emit arbitrary general-purpose code. The design rejects that. Compilation targets a **strictly typed, differentiable probabilistic programming language**: a domain-specific modeling language built on an established probabilistic-programming and array-computation stack such as JAX with NumPyro, or Stan. The restriction is load-bearing, for three reasons.

**Calibration needs gradients.**

- The inner loop (Section 6.2) fits high-dimensional posteriors with gradient-based methods such as Hamiltonian Monte Carlo or variational inference.
- Arbitrary code full of hard branches breaks automatic differentiation, and those methods become intractable.
- The language therefore provides smooth primitives in place of discontinuous switches. Examples are sigmoids for thresholds and softmax for discrete choice.
- A rule such as "mobilize if threat exceeds 0.7" becomes a steep but differentiable response curve. Its steepness is itself a parameter that can be fitted.

**The referee must be fast.** A model written in the restricted language compiles into vectorized kernels (for example, batched with `jax.vmap` and compiled through XLA). The unintelligent referee can then run very large ensembles of rollouts in parallel on commodity accelerators, on the order of 10^8 rollout steps for a single phase diagram. Interactive robustness maps become practical rather than overnight batch jobs.

**Arbitrary code is a security and validity hazard.**

- Generated general-purpose code invites sandbox escape and infinite loops.
- Most insidiously, it invites *reward hacking*: a coding agent can win by exploiting edge cases in the referee's software rather than by finding valid strategic logic.
- A closed, typed language with a finite set of primitives removes those attack surfaces.

### 4.4 The authoring firewall

Frontier language models have memorized the historical record. A model asked to author the "reality" of July 1914 already knows how July 1914 ends. It will tend to encode that hindsight into functional forms and thresholds, sometimes subtly. That would quietly invalidate any claim of out-of-sample fit.

The system therefore places a **symbolic anonymization firewall**, an ontology obfuscator, between historical material and the authoring agents. Before historical observations or residuals reach a compiler or scientist agent, real-world entity names, dates, and identifying details are stripped and replaced with neutral symbols. "1962, Cuba" becomes "Actor Alpha, Asset Vector 3." Authors build theories of structure without knowing whose history they are explaining. The firewall cannot remove every clue; distinctive shapes of trajectories can still be recognized. It does sharply reduce the easiest path to leakage, and its effectiveness is itself tested (Section 11).

### 4.5 Roles in the agent ecology

The system has several distinct agent roles. Several are adversarial on purpose.

| Role | Owns | Does not do |
|---|---|---|
| **Referee** | Mechanical execution of the current rules: resolving simultaneous actions, applying noise, running belief filters, enforcing invariants, producing observations | Decide what "realistically" happens. The referee is deliberately unintelligent. |
| **Reality-model authors** (several) | Competing hypotheses for the transition function F and its parameters | Get to be authoritative. Each proposal is a hypothesis under test. |
| **Actor-model authors** (one per actor) | That actor's private workspace: priors, goals, world model, models of others, strategy | See canonical reality. They receive only their own observations. |
| **Evaluator** | Scoring of models against held-out history and robustness tests | Author models. |
| **Scientist panel** | Residual analysis and proposals for structural changes to the ontology | Adopt its own proposals. The evaluator decides. |

The referee must stay unintelligent. If a central LLM "adjudicates what realistically happens," the whole system collapses back into role-play with an extra step. Reality is one more hypothesis, proposed by agents and judged by evidence.

### 4.6 Actors as sovereign model builders

Each actor is a private workspace owned by an actor-model author, a coding agent that maintains:

> (Ŵ_{i,t}, G_i, F̂_i, M_{ij}, π_i)

These are the actor's inferred state, goals, predictive world model, models of other actors, and policy. The agent can only use the actor's observations. It may change its own implementation only within a defined interface and only between runs, never during one.

Compare the two approaches:

- **A role-play actor** might write "France becomes concerned."
- **An actor-model author** works on structure. It notices that its model keeps underpredicting German escalation. It adds a latent estimate of the adversary's risk tolerance, which the runtime filter then updates from observed actions. Then it re-tests its strategy.

The interaction boundary between actors and reality is an interface, not a conversation:

> Reality → *observe(actor)* → Actor workspace → *decide* → Action → Reality → *reconcile actions* → *transition* → *advance time*

This has a useful consequence: **nobody has to agree on what the world means.**

- One actor's model can say economic interdependence strongly suppresses conflict.
- Another's can say the opposite under certain security conditions.
- The reality model can implement a third relationship.
- Each actor can also hold inaccurate models of the others' inaccurate models.

### 4.7 Actors that learn during the simulation

Actor models need not be fixed. The tempting implementation is to let a language model rewrite an actor's strategy code mid-run after a surprise. The design deliberately avoids this. Code that changes in the middle of a trajectory destroys the mathematical tractability of the dynamical system. It cannot be differentiated through, cannot be batched across thousands of rollouts, and cannot be reproduced exactly.

Instead, learning is **pre-compiled as Bayesian regime switching**. Each actor carries a bank of candidate internal models, for example:

- "the adversary is bluffing"
- "the adversary is committed"
- "the adversary's field commanders are out of control"

The actor holds a weight on each candidate. When observations surprise it, the runtime shifts those weights mechanically according to Bayes factors. Policy then follows from the reweighted mixture. The sequence becomes:

> surprising observation → likelihood under each candidate model → reweighting → policy shift

An actor can still move from "strategy version 17" to "version 18" after a shock. The difference is that both versions, and the rule for moving between them, exist before the run starts. **Learning itself becomes historically observable and counterfactually manipulable.** The system can ask:

- What evidence did an actor need before its policy changed?
- What happens if it learns more slowly, faster, or the wrong lesson?

The bank of candidates is editable, so "the wrong lesson" is a precise intervention. Authoring agents still revise actor models freely, but between runs, as hypotheses to be tested.

---

## 5. The Fundamental Saved Object

The basic unit of the system is not a scenario. It is:

> **World Schema + Actor Models + Transition Model + Evidence + Interventions**

A scenario is just one execution trace through that object.

### 5.1 Inspectability

If the generated artifact is opaque, the system has only moved the unjustified assumptions from runtime prompting into invisible code generation. Every model must therefore expose a readable structure:

- **World:** declared variables, their ranges, and their meanings
- **Actors:** observation, belief, utility, prediction, and choice components
- **World transition:** the rules, readable as rules
- **Exogenous processes:** what can happen that no actor controls
- **Initialization:** where every starting value came from
- **Measurement:** how each latent quantity connects to observable evidence
- **Uncertain parameters:** priors and fitted posteriors
- **Evidence:** the historical data each component was checked against

Model criticism then becomes part of experimentation:

- *Why does this actor have an alliance-credibility term?*
- *Why is this relationship linear?*
- *Where did the initial value of 0.72 come from?*
- *Delete domestic politics entirely and rerun.*
- *Replace expected utility with lexicographic regime-survival-first behavior and fit both versions against Cold War crises.*

### 5.2 Provenance all the way down

Generated equations quickly acquire authority they have not earned. To counter this, every parameter carries metadata:

- value
- type (estimated, assumed, fitted, sourced)
- source references
- which agent generated it
- confidence
- derivation
- alternatives considered

Every *structural* assumption carries the same. A rule such as "inflation responds to energy price with coefficient 0.31" must be able to answer: **why are you in the model?**

Provenance is not an optional annotation layer. It is a mandatory compile-time type in the modeling language's syntax tree. A parameter is a tracked value (a `TrackedParam[T]`, not a bare number), and a model whose parameters lack provenance does not compile.

Adjacent research on political agents already treats provenance as a concern. Some systems trace generated text back to its source documents. This project pushes the principle further, from generated language down into executable causal structure.

### 5.3 Storage, branching, and the audit trail

The saved object has two very different kinds of content, and they are stored differently:

- **Structure.** Schemas, modeling-language source, and counterfactual branches are small, textual, and diffable. They live in a version-control graph (a Git-style DAG), so every theory and every branch has a history and an ancestry.
- **Outputs.** Trajectory ensembles, posterior samples, and phase-diagram grids are large numerical arrays. They live in columnar and chunked array stores (Parquet, Zarr), keyed by content hashes of the exact model version that produced them. Any result can be traced back to the precise structure that generated it.

The object also records what was *not* kept. An append-only, cryptographically chained manifest logs:

- every discarded model
- every failed parameter sweep
- every historical episode excluded from calibration

An analyst who tried eleven theories and published the one that supported a preferred policy leaves a visible trail. The audit log turns "policy-based evidence making" from an invisible temptation into a detectable act.

---

## 6. Algorithms

### 6.1 The core simulation loop

At each time step:

1. The referee computes each actor's observation from the canonical state using that actor's sensing function. This includes noise, delays, and any information-altering actions from the previous step.
2. The runtime updates each actor's beliefs from its observations using the standardized filter configured for that actor. This step also reweights the actor's bank of candidate internal models.
3. Each actor evaluates candidate interventions. It predicts consequences with its *own* world model and its models of other actors, scores them with its goals, and selects using its policy.
4. The referee collects all simultaneous actions and resolves conflicts and interactions according to the active transition model.
5. Exogenous events are sampled.
6. The transition model produces the next canonical state, including the Human Cost Vector.
7. Invariants are checked. A violation is a model bug, not a historical event.

Thousands of stochastic runs from the same initial conditions give a **distribution over trajectories**, not a single story. Because the whole loop is compiled into vectorized kernels, those runs execute in parallel rather than one at a time.

### 6.2 Inner loop: parameter calibration

Given a fixed ontology and model structure, tune θ so that observed historical trajectories are probable under the model. Typical questions:

- How strongly does an oil shock pass through to inflation?
- How sensitive is political instability to unemployment?
- What is the effective deterrence coefficient in a given dyad?

Calibration should produce **posterior distributions**, not point estimates. Partial observability makes many parameters weakly identified, and that weakness is information the user needs to see. Calibration is cross-validated across historical episodes: fit on some crises, test on others.

The central hazard is a **small-data, high-parameter trap**. Geopolitical crises are rare, low-frequency events, so the number of episodes is small. A full model may contain hundreds of parameters. These span state transitions, noisy sensing, utility weights, and recursive theory of mind. With far more parameters than data points, naive calibration overfits, fails to converge, or returns vast flat ridges of equally good fits.

Two disciplines keep this tractable:

- **Explicit measurement models.** Historical prose is never treated as a direct observation of latent state. A quantity like "alliance credibility" is not read off a historian's paragraph. Every latent variable must be linked, through a declared measurement model, to hard empirical proxies. Examples include troop movements, bond yields, trade flows, and event-coded conflict indices. The measurement model has its own noise and its own uncertainty. This is what lets the data constrain anything at all.
- **Hierarchical structure.** Parameters that should be similar across episodes are drawn from shared population-level distributions, so each crisis borrows strength from the others. One example is a dyad's baseline deterrence sensitivity across successive crises.

### 6.3 Actor calibration: inverse inference on goals and beliefs

Actor parameters can be calibrated too, by asking what goal weights and beliefs make an actor's observed historical choices rational under its modeled information. This is a form of inverse decision-making. The system infers preferences and world models from revealed behavior.

There is an identifiability trap here. A given behavior can often be explained equally well by different goals, by different beliefs, or by a different policy. The system should report that equivalence class rather than hide it, because this ambiguity is often exactly what historians argue about.

To keep inverse inference from dissolving into that equivalence class, the system enforces a **"fix two, infer one"** discipline. Of goals (G_i), world model (F̂_i), and policy (P_i), two are anchored, from independent evidence or as explicit stated assumptions. Only the third is inferred. Rotating which component is inferred makes the trade-offs between explanations visible rather than letting the optimizer slide silently among them. For example, the system can show how much of a choice is explained by aggressive goals under accurate beliefs versus moderate goals under a mistaken threat estimate.

### 6.4 Outer loop: ontology discovery

Calibration answers "what are the parameters, given the structure?" The outer loop asks **"why does this structure systematically fail?"**

1. Fit the current model across a set of historical episodes.
2. Collect residuals, the places where predicted states diverge from historical states.
3. Look for *systematic* residuals: failures that no setting of θ removes. Example: no single parameterization explains the 1973, 1991, and 2022 energy shocks together.
4. Pass the residuals and the model structure through the authoring firewall to the scientist panel, with the task: *propose the smallest structural change that would explain these errors.*
5. Candidate additions might include energy substitutability, elite cohesion, mobilization latency, credible commitment, shipping capacity, or information latency.
6. Separate implementing agents build each candidate. The entity–component world state lets each new variable slot in without breaking actor models that ignore it.
7. Re-fit and cross-validate. A new variable **earns its place only if it improves held-out fit more than it costs in complexity and fragility.**

The scientist role is deliberately a **panel, not a single agent**. A lone scientist agent will propose structure in the image of whatever theoretical tradition dominates its training. The panel is configured adversarially across epistemological traditions. It pairs realist and neoclassical priors with institutional, ecological, and subaltern perspectives. Each proposes candidate structures, and each criticizes the others' proposals. Evidence still decides. The panel only widens the space of hypotheses that evidence gets to judge.

The loop is computational theory-building:

> structure → fit → counterfactual → residual → hypothesis → new structure

### 6.5 Competing reality models and structural uncertainty

No single agent writes "reality" unchallenged. Several reality-model authors independently formalize competing explanations. As purely illustrative labels, these might be a security-competition-centric model, an institution-centric model, and a domestic-politics-centric model. The evaluator scores each against withheld history.

The result need not be one winner. The system keeps an **ensemble weighted by evidence**:

> P(F_k | H)

Counterfactual uncertainty then splits into three distinct sources:

> **aleatoric uncertainty** (irreducible randomness)
> **+ parameter uncertainty** (we don't know θ precisely)
> **+ structural uncertainty** (we don't know which F is right)

This changes what an answer looks like. Instead of "removing NATO expansion produces X," the system can say: *"Three explanatory models predict X, two predict Y. The disagreement comes mainly from how they treat security dilemmas versus domestic political incentives."*

### 6.6 Theory discrimination: finding the decisive experiment

With competing reality models in hand, the system can search for the **minimum counterfactual intervention that makes their predictions diverge most.**

This turns the system from a predictor into an experiment designer. It points to the historical episodes, archival questions, or measurable quantities that would best discriminate between rival theories. The system can also diff two theories of history the way one diffs two implementations of a protocol.

### 6.7 Adversarial testing of actor models

Actor models face adversarial stress tests, not just one historical replay:

- unseen historical windows
- perturbed initial conditions
- information deprivation
- deceptive signals
- competing implementations of the opposing actors
- parameter sweeps over uncertain physics

The actor-model author's objective is: *produce decision logic that maximizes my specified strategic value across the distribution of worlds I believe possible.* That is automated strategy-model engineering, not role-play. Because that logic is written in the restricted modeling language, it cannot win by exploiting bugs in the referee. It can only win by being strategically sound within the declared physics.

### 6.8 Two fitness functions, kept separate

Two quantities are easy to confuse, and the system must not confuse them.

**Actor fitness**, which is strategic success inside the simulation:

> J_i = E[ Σ_t γ^t · U_i(W_t) ]

**Model fitness**, which is explanatory adequacy against evidence:

> J_M = − (historical prediction error) − λ₁ · (complexity) − λ₂ · (fragility)

A brilliant strategy is not evidence of a correct model of history. Two adversarial games therefore run at once:

- **Inside the simulation:** actors optimize against each other.
- **Outside the simulation:** actor and reality implementations compete to survive empirical testing.

This exposes a valuable failure mode. Suppose a strategy works only because the reality model assumes sanctions cut an opponent's industrial output by 40% in a single step. Suppose also that historical calibration rules that parameter region out. The system can report exactly that.

### 6.9 Robustness and phase diagrams

For any counterfactual conclusion, the system sweeps the uncertain parameters it depends on and produces a **counterfactual phase diagram**. The axes are not dates. They are contested model quantities, such as "Russian mobilization sensitivity" against "German perception of encirclement." Color shows the probability of an outcome such as general war. A companion layer shows the Human Cost Vector across the same region. The diagram therefore never displays escalation odds without also displaying who pays for them.

On such a diagram, historiographical positions become **regions in parameter space**:

- "Under these assumptions, one interpretive school's account wins."
- "Over here, a structural explanation dominates."
- "This counterfactual is not robust. Shift this almost-unobservable parameter by 8% and the conclusion reverses."

This is more honest about what is known than a single synthetic history. The system can also report fragility directly: *Model A reproduces this trajectory only in a tiny parameter region; Model B reproduces it across a broad region.*

Diagrams are not built by brute-force sweeping alone. The system decomposes the variance of each outcome across its uncertain inputs using **Sobol sensitivity indices**. It also uses exact adjoint gradients with respect to θ, made available by the differentiable modeling language, to locate the steepest boundaries. The answer to "which assumption is this conclusion really resting on?" is then computed, not eyeballed.

Phase diagrams also carry a hazard. A clean two-dimensional map labeled with an exact number such as P(war) = 0.61 creates an illusion of objective precision about dynamics that are deeply under-determined. Section 8 describes how the interface counters that illusion, and Section 12 describes the safeguards against deliberately exploiting it.

---

## 7. Counterfactuals as Branches

Counterfactuals work like branches in version control. A calibrated historical baseline is the main line. Any point in it can be cloned and a precise intervention applied.

**Example.** In the 1914 baseline: Austrian ultimatum, Russian mobilization, German mobilization, and so on.

1. Clone at the step before Russian mobilization.
2. Change exactly one thing: Russia does not mobilize.
3. Run ten thousand stochastic continuations.

The answer is a distribution over outcomes. It might include probabilities of a general European war within two years, a limited Austro-Serbian war, or a negotiated settlement. It comes with a list of the assumptions that would flip the result.

Not all counterfactuals are the same kind. The system enforces a taxonomy:

| Branch type | What changes | Example |
|---|---|---|
| **State branch** | What happened | A decision or event is altered |
| **Information branch** | What someone knew | An intelligence report arrives, or arrives earlier |
| **Preference branch** | What someone valued | A leader weighs domestic cost less heavily |
| **Theory-of-mind branch** | What someone thought someone else valued | One side misjudges the other's risk aversion |
| **Physics branch** | The causal model itself | A different transition model or structural assumption |

This taxonomy replaces the usual vague "what if X were different?" with interventions that have a defined meaning and a defined locus in the model.

Information branches are explicitly allowed as *forward* experiments, such as "what if this side had been deceived?" or "what if this warning had arrived late?". These identify intelligence vulnerabilities and de-escalation opportunities. What the system does not offer is the reverse: automated search for the deceptive input that would most effectively corrupt a real, contemporary actor's sensing (Section 12.8).

---

## 8. The Interface: From Modeler's Workbench to Briefing

The machinery above is only valuable if people can use it without being either crushed or misled by it. Two failure modes pull in opposite directions:

- **The math and code wall.** Raw posteriors, equivalence classes, and code diffs will overwhelm the large majority of executives, policy analysts, and humanities students.
- **False clarity.** Polished outputs that hide uncertainty launder authority.

There is a genuine tension here. The system's scientific value lies in *exposing* ambiguity: non-identifiable explanations, disagreeing models, fragile conclusions. People who make decisions, however, adopt tools to *reduce* ambiguity and act. An interface that only says "five models disagree and the key parameters are unidentifiable" will be abandoned. An interface that hides those facts will be dangerous.

The resolution is not to choose between the two. Each audience gets a view designed for it, and uncertainty is translated rather than suppressed.

### 8.1 Progressive disclosure in three tiers

- **Tier 1: Explorer / Principal Briefing.**
  - Pre-calibrated baseline models.
  - Plain-language strategic takeaways.
  - A small set of counterfactual levers, one for each branch type in Section 7.
  - Structural disagreement is expressed as decision-relevant guidance. That includes early-warning indicators ("if this quantity moves past here, the models that predict escalation gain weight") and hedging strategies that perform acceptably across the ensemble.
  - Uncertainty becomes something to act on, not a disclaimer.
- **Tier 2: Critic / Educator.**
  - Model diffing.
  - Equivalence classes made explorable.
  - Socratic "archival detective" prompts that ask the user what evidence would separate two explanations of the same choice.
- **Tier 3: Architect / Modeler IDE.**
  - Full access to modeling-language compilation, calibration diagnostics, residual analysis, and ontology evolution.

### 8.2 Visual friction by design

Across all tiers, the interface refuses to render uncertain things as crisp:

- Weakly identified or uncalibrated parameters appear as fuzzy, sketched, or hatched elements.
- Phase-diagram regions supported by thin evidence look visibly provisional.
- Exact probabilities appear only alongside their spread across the model ensemble.

The friction is deliberate. A viewer should *feel* the difference between a well-constrained conclusion and a guess before reading any caveat.

### 8.3 Literate modeling: prose and structure, linked both ways

Reducing a crisis to normalized quantities can strip out the human reality of what is being modeled. A variable such as "domestic stability in [0, 1]" is an example. That reduction can induce moral detachment, a gamification of catastrophe, and it can alienate the qualitative historians whose judgment the system most needs. The differentiable engine stays. It is paired with two bridges back to human meaning:

- **A bi-directional literate modeling workbench.** A split-pane view sets the model's natural-language assumptions beside the modeling-language structure. Hovering over a sentence highlights the exact equations and provenance records that implement it. Selecting an equation highlights the prose claim it encodes. Historians can criticize the model in their own language and see precisely what their criticism touches.
- **Constrained narrative playbacks.** Users can select any point on a phase diagram and request a narrated "play-by-play" of a single trajectory from that region. A language model writes the narration, but under tight constraints. It may only describe events, observations, beliefs, and choices actually present in the mechanical trace, and every sentence links back to the step that justifies it. The narrative is a rendering of the computation, never an addition to it.

---

## 9. Use Cases

### 9.1 Historical counterfactual analysis
Rigorous what-if analysis of pivotal episodes such as the July Crisis, the Cuban Missile Crisis, and oil shocks. Results come as distributions with robustness maps, not narratives.

### 9.2 Historiographical argument mapping
Competing interpretive schools are encoded as competing executable models. The system shows where they agree, where they diverge, and which evidence would discriminate between them. Debates become regions and boundaries in parameter space.

### 9.3 Scenario planning and strategic foresight
Forward scenarios from present conditions, presented as ensembles across parameter and structural uncertainty. Emphasis falls on which assumptions drive which branches, not on point forecasts. Results are delivered as indicators to watch and hedges to hold.

### 9.4 Misperception and intelligence analysis
Because sensing, belief, and theory of mind are explicit, analysts can test how outcomes depend on what each party knew, believed, or believed the other believed. The orientation is defensive. The system can test resilience against deception campaigns, expose intelligence blind spots, and find signals that would have de-escalated a crisis. It is not a tool for engineering deception against real actors.

### 9.5 Policy stress testing
A proposed intervention, such as a sanctions regime, deterrence posture, or alliance commitment, is evaluated across the full ensemble of plausible world models. The result is a policy assessment that is robust to model uncertainty, not tuned to one theory. It always reports the intervention's projected human cost alongside its strategic effect.

### 9.6 Education and training
Students edit actor models, theory-of-mind beliefs, or transition rules and watch the consequences. This teaches *why* explanations work, not just *what* happened. A diff between two models becomes a teaching object. Archival-detective exercises turn non-identifiability into a lesson in historical method.

### 9.7 Social-science methodology research
A testbed for questions about identifiability, model complexity, and out-of-sample validity in strategic systems. It also offers a concrete setting to study what automated model discovery can and cannot achieve.

### 9.8 Beyond geopolitics
The abstraction is a system where partially informed actors with heterogeneous goals and world models act on a shared evolving state. It applies without architectural change to:

- corporate strategy and competitive dynamics
- markets and macroeconomic policy
- organizational and institutional dynamics
- technology adoption
- ecology and resource competition
- epidemiology with behavioral response
- revolutions and social movements

Geopolitics is the best torture test: high stakes, scarce data, deep partial observability, and fierce interpretive disagreement. It is the first application, not the definition. For that reason the underlying engine should not have a geopolitical name. It is closer to an **agentic executable-model laboratory**.

---

## 10. Sustaining the Project

An empty modeling tool is a hard thing to adopt. Few buyers want to start from a blank schema. The project's sustainability strategy follows from that.

**Dual-track funding.**

- **Public research funding.** Core research, including the modeling language, calibration machinery, and identifiability tooling, is well matched to non-dilutive defense and intelligence research programs of the DARPA and IARPA kind. Their interest in wargaming, red-teaming, and analytic rigor aligns with the scientific agenda.
- **Commercial revenue.** The commercial wedge lies with users who already reason in ensembles and scenarios and pay well for structural insight: quantitative macro funds and corporate strategy teams.
- **The constraint.** Both tracks operate within the safeguards in Section 12. The defensive-only constraint on information optimization is not negotiable for any customer.

**Calibrated cartridges, not blank canvases.** The primary offering is a library of **continuously calibrated baseline cartridges**: maintained, evidence-backed models of specific domains, such as global energy and producer cartels, or semiconductor supply chains. Each comes with competing reality models, current posteriors, and full provenance. Subscribers explore and branch these baselines from the briefing view. Heavy work such as outer-loop ontology discovery, large re-calibrations, and custom model compilation is offered as metered compute.

The cartridge model also serves the science. Each cartridge is a continuously tested theory, re-fitted as new data arrive, with its failures logged.

---

## 11. The Minimal Demonstration

The first build should be small, not planetary. The aim is to show that the whole loop works, not to model the world.

**Setup:**

- two actors
- about eight world variables
- about four typed actions per actor
- about twenty time steps
- one trajectory, synthetic first, then historical

**Protocol:**

1. Give several independent coding agents the anonymized observations from steps 0 to 10. Task: *construct the smallest executable models you can that explain them, then predict steps 11 to 20.*
2. Score the predictions on held-out steps.
3. Allow each agent to introduce **one new latent variable**. Re-fit and re-score. Did the new variable earn its complexity?
4. Change one historical decision at step 7. Show where the competing models' predictions diverge, and identify which structural difference causes the divergence.

Suppose this produces interesting behavior: meaningful disagreement, measurable improvement from structural revision, and interpretable divergence under counterfactuals. Then the core machine is shown to work:

> natural language → competing executable theories → empirical discrimination → counterfactual experiment → theory revision

The order of validation matters. The system should first prove itself on **synthetic ground-truth recovery benchmarks**: trajectories generated from a *known* hidden model, which the system must recover. Real history never allows that test. Only after the system reliably recovers planted structure, parameters, and latent variables should it make claims about historical episodes. The same benchmarks also test the authoring firewall. Agents given a disguised historical episode should perform no better than they do on a synthetic episode of matching shape. If they do better, hindsight is leaking.

---

## 12. Risks, Failure Modes, and Safeguards

### 12.1 Laundered authority
**Risk:** Generated equations look rigorous and gain credibility they have not earned. Clean phase diagrams with exact probabilities make under-determined dynamics look like settled science. Motivated users can also game the specification. They can cherry-pick episodes, priors, or model variants until the diagram supports a predetermined policy, then present it as "scientifically validated."
**Safeguard:**
- Provenance as a compile-time requirement on every parameter and structural assumption.
- Mandatory display of uncertainty, with visual friction for weakly identified quantities.
- Refusal to present any counterfactual without its robustness map.
- The append-only audit log of discarded models, failed sweeps, and excluded episodes, which travels with every published result.

### 12.2 The omniscient referee
**Risk:** One central agent quietly decides what "really" happens, turning the system back into role-play.
**Safeguard:** An unintelligent referee compiled from a restricted language, competing reality-model authors, and an independent evaluator.

### 12.3 Overfitting history
**Risk:** With enough latent variables, any trajectory can be reproduced, and nothing is explained. The risk is acute because parameters vastly outnumber historical episodes.
**Safeguard:**
- Complexity penalties.
- Hierarchical priors.
- Explicit measurement models tying latent state to hard proxies.
- Cross-episode validation and held-out time windows.
- Fragility scoring. A model that fits only inside a tiny parameter region is flagged.

### 12.4 Non-identifiability
**Risk:** Goals, beliefs, and policies can trade off so that many models explain the same behavior.
**Safeguard:**
- "Fix two, infer one" anchoring.
- Explicit reporting of equivalence classes as findings.
- Theory-discrimination search (Section 6.6) to identify evidence that would separate them.

### 12.5 Sparse and contested data
**Risk:** Historical state variables are often unmeasured, measured inconsistently, or disputed.
**Safeguard:** Treat historical data as observations with their own uncertainty and sensing models, formalized as measurement models. In effect, the historian is one more imperfect observer of W_t.

### 12.6 Leakage of LLM priors
**Risk:** Authoring agents bring in their own historical knowledge and biases. For example, they may "know" how the episode ends when building models meant to predict it.
**Safeguard:**
- The symbolic anonymization firewall on all historical inputs and residuals.
- Diverse authoring agents and a pluralistic scientist panel.
- Validation on synthetic ground-truth benchmarks before historical claims.
- Held-out evaluation on obscure episodes.
- Audits of generated structure for hindsight-encoded assumptions.

### 12.7 Unsafe generated code
**Risk:** Agents generating general-purpose code can escape sandboxes, hang the runtime, or reward-hack by exploiting referee bugs instead of finding real strategy.
**Safeguard:** All authored artifacts compile to a closed, typed, differentiable modeling language with a finite set of primitives. No agent-authored general-purpose code ever runs.

### 12.8 Dual-use weaponization
**Risk:** The features that make the system valuable for defense analysis can turn it into an automated deception, coercion, or counter-insurgency engine. Examples include optimizing actions that corrupt an adversary's sensing function, or running inverse preference inference on real social movements.
**Safeguard:** Architectural guardrails on the solver, not just usage policies.
- Forward counterfactual sweeps over sensing functions are permitted, so analysts can find vulnerabilities and de-escalation signals.
- Automated search and gradient-based optimization aimed at crafting deceptive inputs or coercion traps against contemporary actor profiles are blocked at the solver level.
- The Human Cost Vector cannot be removed from any geopolitical schema.

### 12.9 Cognitive overload and moral detachment
**Risk:** Two failures can push users away from good judgment:
- Raw mathematical output drives non-specialists away or into misreading.
- Abstract quantities make catastrophe feel like a game.

**Safeguard:**
- Tiered progressive disclosure.
- Uncertainty translated into indicators and hedges.
- Literate modeling that keeps prose and structure linked.
- Constrained narrative playbacks.
- Human cost permanently on the display.

### 12.10 Misuse and false confidence
**Risk:** Outputs presented as forecasts are used to justify real-world decisions.
**Safeguard:** Present results as conditional explorations of model space, never as predictions without qualification. Expose structural disagreement prominently, even in the briefing view.

---

## 13. Open Questions

- **Ontology granularity.** How coarse can the world state be while still capturing the dynamics that matter? Is there a principled stopping rule for ontology growth beyond complexity penalties?
- **Theory-of-mind depth.** The default cap is depth two. Do actor models ever change predicted behavior beyond it? Is the effective depth itself an interesting fitted quantity?
- **Simultaneity and timing.** How should actions within a step be ordered or resolved? How sensitive are results to step size?
- **Policy families.** Which decision procedures should be first-class: expected utility, lexicographic, satisficing, bounded lookahead, rule-based, learned? How large should an actor's bank of candidate internal models be, and how should the system choose among them?
- **Smoothness versus fidelity.** Differentiable primitives replace hard thresholds. When does smoothing a genuinely discrete decision, such as a declaration of war, distort the dynamics it is meant to capture?
- **Firewall effectiveness.** How much hindsight survives anonymization through the recognizable shape of famous trajectories? How should residual leakage be measured?
- **Evaluation of counterfactuals.** Counterfactuals cannot be directly validated. What indirect evidence, such as cross-episode consistency or structural plausibility, should count?
- **Human-in-the-loop modeling.** How should domain experts edit, veto, or propose structure alongside authoring agents, and how should their contributions carry provenance?
- **Ensemble weighting.** How should evidence weights over competing transition models be computed when episodes differ in data quality and relevance?
- **Where the guardrails sit.** How precisely can "defensive" and "offensive" use of information modeling be distinguished in the solver, and who should govern that line?

---

## 14. Summary

The project is not a geopolitical role-playing game, and it is not a forecasting engine. It is a **workbench for executable theories**. Language models author and criticize models. Simple, inspectable machinery runs them. History serves as the evidence that fits and falsifies them.

Its distinctive commitments:

1. **Separate truth from observation from belief**, so information, secrecy, and misperception are structural.
2. **Decompose actors into goals, world models, and policies**, so counterfactuals have precise meaning.
3. **Make the transition model an explicit, competing, learnable hypothesis**, never an unexamined authority.
4. **Treat the language model as compiler and scientist, not as actor**, compiling into a restricted, differentiable modeling language rather than arbitrary code, behind a firewall against hindsight.
5. **Fit, then criticize, then revise structure**, with measurement models, anchored inference, and a pluralistic scientist panel, so the system performs computational theory-building.
6. **Report distributions, robustness regions, and structural disagreement**, not single stories, through interfaces that make uncertainty both visible and usable.
7. **Build the safeguards into the architecture**, through provenance as a type, audit logs of what was discarded, a permanent human-cost ledger, and a solver that will not optimize deception against real actors.

Independent reviews from technical, scientific, ethical, commercial, and educational perspectives converged strongly on this design, with a consensus level around 0.91. They agreed that it is conceptually sound and a real advance over role-play frameworks. They attached one condition: the design must commit to a constrained, vectorized probabilistic modeling language and to the epistemic, ethical, and interface guardrails described above.

If it works, the most valuable output will not be any single prediction. It will be disagreement between theories made executable, inspectable, and testable, so that rival explanations of history can be run, compared, and checked against evidence.
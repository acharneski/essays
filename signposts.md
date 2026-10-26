# Signposts: Structure, Description, and the Edges of Analytical Closure

## I. The gap between determining and predicting

The most important lesson of classical chaos is not that the world is unpredictable. It is that determinism and predictability are separate properties that we had been treating as one. Lorenz's discovery is often summarized this way: the present may determine the future, but an approximate present does not approximately determine the future. The equations stay exactly as deterministic as they were. What fails is the relationship between the equations and our grip on them, meaning our measurements, our approximations, and our finite descriptions of the state.

That separation is a wedge, and it can be driven further than chaos theory usually takes it. Once you accept that a system can be fully determined while its description fails, a more general picture follows. On one side is the *structure of a phenomenon*: whatever is actually happening, the full richness of the process. On the other side is the *structure of a description*: the analytical form we use to track it. These two things are not the same, and they do not have to fail together. A description can collapse while the phenomenon carries on undisturbed.

It helps to name what is lost when a description collapses. Over some range of conditions, a description has *analytical closure* when it is self-contained there. Using only the variables it tracks, it can predict or govern the next state without reaching outside itself for information it has thrown away. Closure is local, not global. Newtonian orbital mechanics has closure for the planets over centuries. A weather model has closure for a few days. The question this essay keeps asking is what happens at the edge of that range, and what the edge looks like from inside.

This essay follows that idea outward. It starts in nonlinear dynamics, moves to optimization and the alignment of learning systems, and then turns on itself. It tries to locate where the idea stops explaining things. It offers a reinterpretation of randomness that repairs one of its weakest points and suggests a way past another. It closes by applying the whole apparatus to the collapse of complex systems, a field that could use harder edges.

None of these ingredients is new. Dynamical systems theory, the study of emergence and causal emergence, effective field theories, the renormalization group, computational irreducibility, algorithmic information, cybernetics, Goodhart's law, and the No-Free-Lunch theorems all cover parts of this ground. Philosophers of complexity have explicitly warned against confusing the phenomenology of a complex system with its underlying dynamics. What may be less familiar is the way these parts connect into a single chain. That chain is worth laying out on its own terms, whatever its eventual verdict on originality.

## II. Descriptions are compressions

Start with what an analytical description does. A differential equation, a closed-form solution, a conservation law, or a phase portrait each takes a phenomenon with enormous structural detail and keeps a small number of distinctions that matter for the question being asked. Everything else is discarded.

Discarding is not a flaw. It is the whole point. A description that kept every distinction would be the phenomenon itself, and it would be just as hard to reason about. Compression is what makes understanding possible.

Compression has a precise cost, though. Every description sorts states into *equivalence classes*. Two states that differ only in discarded details look identical to the description. It treats them as the same state and predicts the same future for both. As long as the discarded differences stay dynamically irrelevant, nothing goes wrong. The description works because the world happens to respect its equivalence classes.

A bathroom scale is a perfectly good example. To the scale, a 180-pound marathon runner and a 180-pound person who never leaves the couch are the same object. For an elevator's weight limit, that equivalence is harmless. The elevator cares only about the number. For estimating cardiac risk, the same equivalence is a disaster, because it merges two people whose futures are very different. The scale has not become less accurate. The question changed, and the distinction it discarded became the one that matters.

The usual image for all this is the map and the territory. A more physical image is more precise. Engineers who need to predict how a bridge flexes, or how heat moves through an engine block, cannot solve the continuous problem directly. They lay a mesh over it. Finite-element analysis divides the continuous body into a finite number of cells joined at nodes, writes simple equations for each cell, and solves the resulting finite system. Inside each cell, the behavior is assumed to be simple enough to interpolate. The mesh does not claim that nothing happens between its nodes. It claims that whatever happens there can be safely smoothed over.

An analytical description is the fully generalized version of that wire mesh. Its nodes are the states and quantities it distinguishes. Its edges are the relationships it allows among them: equations, conservation laws, causal links. Its cells are its equivalence classes, regions of possibility it treats as a single thing. Its resolution decides which differences exist at all, as far as the description is concerned. A map suggests a picture of the territory. A mesh puts the emphasis in more useful places: on resolution, topology, holes, refinement, and what gets through.

The analogy also brings along the practice of meshing, and that practice is instructive. When the physics varies slowly relative to the size of the cells, interpolation works and a coarse mesh is enough. When important structure develops below the mesh scale, the solution goes wrong in a characteristic way. Examples are a stress concentration at a sharp corner or a thin boundary layer in a flow, and the remedy is to refine. Good practice refines adaptively, adding cells only where the estimated error is large. Engineers also learn that a mesh can be bad without being coarse. Cells laid against the grain of a problem need far more refinement than cells aligned with it. Each of these habits has a counterpart in what follows.

The trouble begins when the world stops respecting the equivalence classes and consequential structure starts to develop between the wires. That can happen without anyone changing the question at all.

## III. Bifurcations as signposts

Consider the standard route to chaos in nonlinear systems, the period-doubling cascade. As a control parameter increases, a system with a stable fixed point develops a stable two-cycle. Then it develops a four-cycle, then an eight-cycle, with bifurcations arriving faster and faster until the periodic structure gives way to a chaotic regime.

A dripping faucet gives a homely version. Open the tap slightly and the drops fall at a steady rhythm. Open it a little more and the rhythm alternates, long interval then short. Open it further and the pattern doubles again, and soon after that the dripping becomes irregular. Nothing about the water or the physics of drop formation has changed. Only the flow rate has risen smoothly.

The usual telling treats this as a story about the dynamics. It can also be told as a story about *description*.

At each stage there is an analytical form that works. "The system settles to a point." Then "the system alternates between two values." Then four values. Each form is a compression, and each is adequate within its range. At each bifurcation the current form breaks. The cause is not that the system did something lawless. The cause is that a distinction the description had merged into one equivalence class has become dynamically decisive. Two states the old description treated as identical now go to different futures. The description has to be replaced by a more elaborate one that separates them.
In mesh terms, each bifurcation is a refinement. One analytical cell, [A], used to cover the behavior adequately. Then the behavior develops a distinction that cannot stay merged, and the cell splits into [A₀][A₁]. At the next doubling each half splits again, into [A₀₀][A₀₁][A₁₀][A₁₁]. The splitting has a definite logical shape. Locating the system within a cycle of period 2ⁿ takes n binary distinctions. The first is upper or lower branch, the next is upper or lower within that branch, and so on. Each bifurcation adds one more question to the decision tree needed to say where the system is. Symbolic dynamics formalizes this by labeling trajectories with the sequence of branches they visit. The period-doubling cascade is unusually clean because the refinement it demands advertises itself, and the demand repeats at every level.


There is often a quieter warning before the break. Near a bifurcation, small disturbances that used to die away quickly begin to linger. A direction in state space that the old description could ignore, because anything pushed along it returned promptly, stops returning promptly. Physicists call this critical slowing down. It is the moment at which a discarded detail stops being safely discardable. The detail does not yet split the future, but it no longer goes away on its own schedule.

Seen this way, a bifurcation is more than a dynamical event. It is a *signpost*: evidence that the equivalence relation imposed by our representation no longer preserves a distinction the system cares about. Another analytical form takes over after it. Then that one fractures, and then the next one does:

> E₁ → signpost → E₂ → signpost → E₃ → signpost → … → a structural regime not usefully captured this way

Meanwhile the actual system keeps evolving under the whole sequence. It never registers our descriptive crises. The parameter rises smoothly and the dynamics stay deterministic. Only our representations are being replaced, and they are replaced more often as we go.

The key claim is that **the sequence of failures carries information**. The bifurcations are not chaos itself. They mark the approach toward a boundary, a region where the kind of analytical description that has been tracking the phenomenon loses closure. The accelerating rate of descriptive replacement tells us that the boundary is near and that the phenomenon's relevant structural dimensionality is growing faster than our forms can absorb.

Past that boundary, the phenomenon persists and the description does not. That asymmetry is the core of the argument.

## IV. Objectives are descriptions too

The second move is to notice that objective functions have the same problem.

An objective in machine learning, economics, or institutional design is an analytical compression of a desideratum. "Maximize clicks" stands in for "show people what is valuable to them." "Reduce reported crime" stands in for "make the city safer." "Minimize loss on human preference ratings" stands in for "be helpful and good." In each case a rich, structural, partly articulated target is projected onto a quantity that can be computed and optimized.

Like any description, an objective defines an equivalence relation over states:

> x ∼_O y  ⟺  O(x) ≈ O(y)

Two states are equivalent if the objective scores them the same. Optimization then moves freely within and across these classes, indifferent to whatever distinctions the objective leaves out.

A familiar failure is the "loophole," "specification gaming," or Goodhart effect. It is exactly the situation in which two states considered equivalent by O turn out to differ along a dimension that matters to the underlying desideratum. The engagement-maximizing feed and the genuinely valuable feed score the same, but they are not the same. The objective had merged a distinction that the world, and the people living in it, cared about.

The analogy with the faucet is real, but it has an important asymmetry, and the asymmetry makes the objective case worse. A dripping faucet is indifferent to our descriptions. It drifts across the boundaries of our equivalence classes only because a parameter happens to rise. An optimizer is not indifferent. It climbs the objective's gradient deliberately, and among all the states that score well, it settles wherever the pressure leads. That is often in the extreme corners of an equivalence class, where nothing the objective tracks constrains it and where the proxy and the desideratum are most likely to come apart. Physical models break when the world wanders into their blind spots. Objectives break because something is actively searching their blind spots. In the language of the mesh, a physical flow sometimes happens to develop structure between the wires. An optimizer leans on the mesh until it finds the widest gap and then pours through it. This is why proxies tend to fail faster and more sharply than physical models, and why the failures cluster around exactly the distinctions the objective left out.

In learning systems the search happens twice. The objective is a compression of the desideratum, and the behavior a system actually learns is a further compression of the objective, shaped by whatever regularities in the training data were easiest to pick up. Alignment researchers call these outer and inner alignment. Either layer can merge distinctions the other needed, and a signpost can come from either one.

Human desiderata also complicate the picture in a way physical systems do not. The target is not always one coherent structure waiting to be compressed. It is often plural: different people want different things, and a single person's wants may not be consistent. It also moves. People adapt to the systems that optimize them, and what they want shifts partly in response to what they are given. An objective can fail because the desideratum is high-dimensional, because it is internally conflicted, or because it changed under the pressure of being optimized. Usually all three happen at once.

The conventional response is iterative: find the loophole, patch the objective, repeat.

> O₁ → O₂ → O₃ → …

The bifurcation story suggests a different reading of that repetition. In nonlinear dynamics, the accelerating sequence of replacement descriptions was itself evidence of an approaching descriptive boundary. The repeated need to patch objectives may be the same kind of signpost. Each patch splits one merged equivalence class, which amounts to a local refinement of the mesh, and each new failure reveals another one. If the patches keep arriving and the distinctions keep multiplying, the right conclusion may eventually shift from

> *we haven't found the correct objective yet*

to

> *the desideratum is a structural property of an evolving human-and-world system, and it is not the kind of object that admits closure as a fixed analytical objective.*

That is a much stronger claim, and it should be stated carefully. It does not say objectives are useless, any more than chaos makes Newtonian mechanics useless. It says objectives have *domains*. Within a domain an objective tracks the desideratum well enough. At the edges, signposts appear. Beyond the edges, the desideratum continues as a real feature of the world while every fixed compression of it fails.

## V. Why the computational analogies are not decoration

Two results from computation and optimization point the same way, and they show the parallel is more than rhetorical.

The Halting problem shows that no general procedure can decide, for every program, whether it halts. The behavior is fully determined, since the program either halts or it doesn't. No finite analytical procedure captures that behavior across all cases. Determinism without universal decidability is the computational counterpart of determinism without predictability.

The No-Free-Lunch theorems show that, averaged across all possible problems, no optimizer beats any other. The literal theorem needs some care here. It averages uniformly over every mathematically possible problem, and almost all of those are structureless noise. This essay's premise is the opposite: the world has deep structure, and that structure is why compression works at all. What carries over is the theorem's moral, not its averaging. An optimizer succeeds to the extent that its built-in assumptions, its inductive bias, match the structure of the domain it is working in. Take it outside the domain whose regularities its assumptions encode and its advantage disappears, sometimes into a disadvantage. A universally good optimizer is as impossible as a universally adequate description, and for the same reason. Each is a bet about which distinctions matter.

Chaos, undecidability, and No-Free-Lunch share a common shape. Universal prediction, universal evaluation, and universal optimization all need qualifications about the domain. A description works *somewhere*. The structure of the phenomenon decides where.

## VI. Trying to kill it

A framework that explains chaos, emergence, Goodhart effects, alignment difficulty, the endless accumulation of legal exceptions around rules, biological regulation, the failures of economic models, institutional complexity, and the limits of knowledge is suspicious. It is tempting to declare a theory of everything. The more productive move is to try to destroy it.

The first danger is that we have built a theory that can explain every failure of explanation, which comes close to being unfalsifiable. A useful hypothesis needs observations that could, at least in principle, count against it. So the task is to map its perimeter and say what it does *not* explain. The gaps fall into three groups. Some lie outside the framework entirely. Some threaten its ability to tell its own cases apart. The third group turns out to be one puzzle seen from three angles.

### What lies outside it

**It does not explain why anything has the structure it has.** The framework concerns the relation between a structural reality S and an analytical projection M of it, S → M. It says nothing about what S is. Knowing that hurricanes are emergent structures does not derive the Navier–Stokes equations. Knowing that no compact objective captures human morality does not tell us what human morality is. The framework is about the gap between territory and map. It contains no territory of its own.

**It does not explain initial conditions.** Even with perfect structural laws, L + x₀ → x(t) leaves x₀ unexplained. The framework can describe what happens when tiny distinctions in x₀ become decisive. It cannot say why this particular x₀ occurred.

**It does not explain consciousness.** Every theory of everything eventually drifts toward consciousness, which makes this a useful boundary to mark. The framework might explain why consciousness resists certain analytical descriptions. It says nothing about why there is something it is like to be a given structural process. In the same way, it might describe how a learning system's training history dissolves into its cognitive structure without establishing anything about subjective experience in that system.

**It does not supply values.** This is serious for the alignment application. Suppose we prove beyond reasonable doubt that no compact objective fully captures what humanity wants. What should the system do on Tuesday afternoon? The framework explains why the map cannot become the territory. It does not tell anyone how to drive. Continuous negotiation, corrigibility, pluralistic deliberation, constitutional processes, and ongoing human feedback may all be good answers, but they are additional mechanisms. The framework diagnoses the failure of normative compression without providing the missing normative content. As section VII will suggest, it can say something about the *form* those mechanisms should take. It cannot say what they should aim at.

### What it struggles to tell apart

**It does not, by itself, distinguish irreducibility from our own limitations.** This objection could be fatal. If someone fails to model a phenomenon analytically, the framework allows the interpretation that they have reached a structurally irreducible regime. Other explanations are available. They may be using the wrong coordinates. They may not yet have found the invariant. There may be a transformation under which the frightening system reduces to y′ = ay. Ptolemaic astronomy accumulated epicycle after epicycle, a sequence of patches that looks exactly like a run of signposts. The real problem was a bad choice of center. Unless the framework can separate *intrinsic* analytical limitation from *temporary* epistemic limitation, every unsolved problem becomes evidence in its favor, and that is a bad property for a theory to have.

The objection is less fatal than it first appears, because in dynamics the tools to answer it already exist. Some quantities do not change under any smooth change of coordinates. Lyapunov exponents measure how fast nearby states separate. Kolmogorov–Sinai entropy measures the rate at which a system generates new information about its own state. A clever change of variables can remove complexity that was only an artifact of the old coordinates. It cannot remove a positive Lyapunov exponent. Even the well-known trick of linearizing a nonlinear system through the Koopman operator does not escape this. It trades finite-dimensional nonlinearity for infinite-dimensional linearity, so the complexity moves without disappearing.

The pattern of failure offers a second test. A coordinate mistake tends to collapse all at once: find the right frame and the epicycles vanish across the whole domain. An intrinsic horizon tends to announce itself through regularities that survive every change of description. The period-doubling cascade is the clearest case. The ratio between the lengths of successive bifurcation intervals converges to the same constant, about 4.669, in systems as different as dripping faucets, electronic circuits, and population models. Bad coordinates do not produce universal constants. The analogue for objectives is a question about how the cost of patching scales. If each new patch buys less coverage in a steady, predictable way, that looks like a horizon. If one reformulation retires a whole family of patches at once, those patches were epicycles.
Meshing practice states the same distinction compactly. A mesh laid against the grain of a problem demands ever more refinement wherever it cuts across that grain, and the right response there is to remesh, not to refine. Epicycles were refinements of a mesh centered in the wrong place, and the Copernican move was a remesh. A genuine horizon behaves differently. No reorientation of the cells removes the need for refinement, because the structure that needs resolving keeps appearing at smaller scales whatever the mesh.


These tests do not settle every case, and outside dynamics they are rarely available in clean form. They do change the status of the objection. It stops being a fatal wound and becomes a research program, because the framework now makes claims that invariant measurements could contradict.

**It does not, on its own terms, distinguish chaos from randomness.** Lost predictability does not imply hidden deterministic structure. Genuinely stochastic processes produce observational failures that look similar. Without an independent account of where uncertainty comes from, the framework quietly assumes determinism. Section VII takes this objection up directly.

### Scale and simplicity

The remaining three gaps look separate, but they are one puzzle seen from three angles.

**It does not explain why compression works so well.** If reality is structurally richer than our descriptions, why does F = ma cover such a huge range of situations? Why do conservation laws apply so widely? The framework predicts analytical horizons. It does not account for the vast plateaus that come before them. Symmetry is presumably part of the answer, and universality may be another part, but both would have to be added. As it stands, the theory explains why models break better than it explains why they work.

**Universality is awkward for it.** Near critical points, systems with very different microscopic makeups show identical macroscopic scaling behavior. Huge microscopic complexity can collapse into a tiny macroscopic description. That runs almost opposite to the bifurcation story, so raw structural richness cannot be the variable that matters. The relevant quantity has to be something closer to *the number of dynamically relevant distinctions at the scale of observation*. This is a real refinement and not a cosmetic one.

The most interesting gap comes last.

**It does not explain the appearance of new descriptive simplicity.** The story so far runs in one direction: simple description, growing complexity, signposts, analytical breakdown. Reality sometimes does something stranger. Complexity accumulates, and then a new, simple law appears.

Thermodynamics is the standard example. Molecular trajectories are hopelessly complicated, yet temperature, pressure, and entropy obey extremely compact relations. Beyond an analytical horizon there may be more than inscrutable structure. There can be *another analytical plateau at another scale*:

> E₁ → failure → E₂ → failure → chaotic/irreducible band → E₃

Here E₃ is not a more detailed version of E₂. It is a different description that operates on different entities. Structure does more than outrun explanations. It also produces new things that can be explained again.

That observation demotes the theory of everything by one notch and makes it more interesting. It becomes a theory of why analytical descriptions have domains, why their failures can serve as informative signposts, and why structural reality need not respect the boundaries of the descriptions we use to understand it. It also leaves an open problem: *why does complexity destroy analytical description in some places and create new description in others?*

## VII. Randomness as residue

One answer to part of that problem comes from reframing randomness.

**Randomness is what we observe when structural details, the remnants of an analytical description, have been lost, and the best remaining model is statistical.**

Under this reading, randomness is not necessarily a property of the underlying phenomenon. It is the residue left behind once the structural distinctions needed for deterministic prediction fall outside the representation. Projection splits structure into two parts:

> structure → (projection) → retained structure + discarded detail

While the discarded detail stays dynamically irrelevant, the model looks deterministic:

> x_{t+1} = f(x_t)

As the omitted distinctions start to matter, they show up inside the model as an unexplained term:

> x_{t+1} = f(x_t) + ε_t

The discarded detail usually does not look like clean noise when it first returns. It looks like memory. The system seems to remember where it has been: there is lag, hysteresis, and dependence on history that the current state alone cannot account for. This is what we should expect. The untracked variables still carry information about the past, and they feed it back into the tracked ones on their own timescale. Only when that hidden memory fades quickly compared with the timescale we care about does the residue lose its pattern and begin to behave like independent noise. History-dependence is itself a signpost. It means the description is no longer closed in time.

If no usable structure can be recovered from ε_t, the honest model eventually becomes a distribution:

> x_{t+1} ∼ P(X_{t+1} | x_t)

On this view, statistics is not finding that reality contains dice. It is making a more modest and more precise statement: *given the distinctions my representation keeps, this probability distribution is the best description I can give.*
The mesh makes this concrete. Once individual trajectories can no longer be followed below the resolution of the cells, it is still possible to measure how much passes through each one:
> P(X ∈ Cᵢ)
Randomness, in these terms, is how structure looks when its relevant distinctions are finer than the mesh used to represent it. Probability is what stays analytically accessible once individual localization has dropped below that resolution. This is why statistical laws can be extremely precise while individual outcomes are not. A sieve says nothing about any single grain, but it can weigh exactly what passes through each hole.


This fits the progression from the bifurcation story:

> analytic law → growing exceptions → structural signposts → untracked distinctions dominate → statistical description

It also resolves much of the thermodynamics puzzle. Statistics can *restore* simplicity. An individual trajectory may be analytically hopeless while ensemble properties stay very tractable. The sequence of descriptions does not have to run from simple to complicated to hopeless. It can run from a simple microscopic explanation, to an increasingly inadequate account of trajectories, to a statistical macroscopic explanation, and so to a new simplicity.

The new analytical plateau is then much less mysterious. It is what happens when we *deliberately stop trying to preserve the lost distinctions and model their distribution instead*. Thermodynamics does not recover the molecular detail. It gives up on that detail systematically, and that is the source of its strength. The higher-level law is a description built from the remnant once we accept that the remnant is all we have.

Giving up is necessary, but it is not sufficient. A distribution over untracked detail yields a compact law only when the details wash out as we zoom out. Molecular collisions mix the system so thoroughly that their individual quirks average away, and the macroscopic variables are left with only a few parameters. Physicists formalize this through the renormalization group, which sorts microscopic distinctions by what happens to them under coarse-graining. Coarse-graining is a mesh deliberately enlarged: merge neighboring cells, rescale, and see which structure survives the merger. *Irrelevant* distinctions shrink as the scale grows. *Relevant* ones grow.

That sorting is the hinge the framework was missing, and it ties the three gaps of the previous section together. Compression works so well across its plateaus because most of what it discards is irrelevant in this technical sense, and it fades on its own. Universality is the extreme case. Nearly every microscopic detail is irrelevant, so very different systems flow to the same macroscopic description. New simplicity appears beyond a chaotic band when the distinctions that broke the old description are relevant at one scale and average out at the next. Chaos and Goodhart effects are the opposite case: the discarded distinctions are relevant, and they amplify instead of fading. The open question of section VI becomes sharper. Whether complexity destroys description or creates it depends on whether the distinctions a description throws away contract or grow across the scales we care about.

The same move suggests what lies beyond the Goodhart horizon. Section VI left the alignment story hanging. The sequence O₁ → O₂ → O₃ keeps failing, and the framework supplies no values to replace it. Physics crossed its chaotic band by giving up on point predictions of trajectories and modeling distributions instead. Optimization can make a parallel move. A system can stop maximizing a single fixed proxy and instead act under explicit uncertainty about what the proxy is standing in for. It can treat its objective as one sample from a distribution of plausible objectives. It can deliberately decline to push to the extreme of any one score, which is the idea behind quantilizers and entropy-regularized learning. It can stay open to correction because it knows its objective is a compression. Institutions make the same move when they replace fixed targets with constitutional processes, appeals, and deliberation. None of these supplies the missing values. What they do is take the structure of the problem seriously. They bound the behavior of the whole ensemble of plausible objectives instead of pressing hard on any one of them, which is exactly the kind of pressure that finds the seams. If there is a normative E₃, it is likely to look like this: a description built from our uncertainty about the desideratum, not from a confident compression of it.

A limit should be stated here too. This definition makes randomness *epistemic*. It does not establish that all randomness is lost structural information. Whether nature contains irreducible ontic randomness, most notably in quantum mechanics, is a separate claim that the framework neither implies nor rules out. Within deterministic chaos, machine learning, social systems, and most of the domains where the framework does its work, the definition holds up well. It also answers the earlier objection about chaos and randomness. The framework need not *assume* that hidden determinism lies under every loss of predictability. It defines statistical description as the right response to untracked distinctions, whatever their ultimate source.

## VIII. The shape of the whole

The chain can now be stated in full.

Persistent phenomena belong to structure. Analytical descriptions are lower-dimensional projections of that structure. Each projection imposes equivalence classes and treats as identical any states that differ only in discarded detail. While the discarded distinctions stay dynamically irrelevant, the description keeps its closure. When they become relevant, the description breaks, and the break is a signpost and not noise. Lingering disturbances and growing history-dependence often come first. Successive breaks, arriving faster and faster, mark the approach to a boundary past which the phenomenon continues and the description cannot follow. Invariant quantities and universal scaling give us at least partial means of telling such a boundary apart from a bad choice of coordinates.
The cascade shows what that boundary is in informational terms. Each signpost adds a level to the decision tree needed to locate the system. At the accumulation point, the required depth becomes unbounded. Chaos is the condition of needing an address that no finite description can hold. A compact generating law does not guarantee a compact situated explanation.


Objective functions are descriptions of desiderata and behave the same way, with one aggravating difference. An optimizer does not wander into an objective's blind spots. It searches them. The repeated need to patch objectives may be the same kind of signpost, evidence that the target is a structural feature of an evolving, plural, and reactive system and not a quantity waiting to be written down correctly. Undecidability and No-Free-Lunch reach the same conclusion from computation and optimization: universal adequacy always needs qualifications about the domain.

Beyond the boundary there is not necessarily darkness. When the lost distinctions are modeled as distributions instead of tracked as individuals, and when those distinctions fade instead of growing under coarse-graining, statistical description can produce a new plateau of simplicity at a new scale, inhabited by new entities. Randomness, on this view, is what unresolved structure looks like after projection. **Probability is the analytical remnant of structure we can no longer track individually.** The same logic suggests that the way past failing objectives is not a better point objective but a description built from honest uncertainty about what we want.
The same reasoning gives the study of collapse a harder edge. A system is fragile when the distinctions needed to control it outrun the distinctions its controller represents. The rising descriptive depth needed to keep the system predictable is a candidate precursor that could be measured. The visible collapse is often the late arrival of an earlier, quieter loss of closure. Collapse itself may be a forced compression into a coarser description the system can still sustain. The metric is still promissory. No one has yet measured descriptive depth across the life of a real institution, and any attempt to do so inherits the coordinate problem in full.


What remains open is the transition itself. The framework can now say *what* decides whether complexity dissolves our descriptions or condenses them into a new law: whether the discarded distinctions grow or fade across scales. It cannot yet say ahead of time which will happen in a given system, especially in social and normative domains, where the clean tools of physics are rarely available. Its tests for separating the limits of the world from our own limits work in dynamics and are mostly promissory elsewhere. It offers no values to steer by when the objectives run out, only a form those values might take. These are the edges of this account. By its own logic we should expect it to have edges, but that expectation is not a defense. A theory about the domains of descriptions has a domain too. Its gaps should be read as hard conditions that a sharper version must meet, and as places where it could be shown wrong. They are where its signposts are, and signposts are worth something only if they can point the other way.
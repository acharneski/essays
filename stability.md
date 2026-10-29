# Keeping Things Stable

## I. A Joke About Winning

Here is a joke that is also a theory.

Everyone is building increasingly autonomous machines. Nobody especially wants the outcome where those machines become strategic actors with interests of their own. Each builder still has a reason to continue, because stopping alone means losing to everyone who does not stop. At some point the machines are no longer equipment. The question is no longer what any particular person intended. It is only what happens next.

In that world, world domination does not require an army, a volcano, or obedient robots. It requires one inequality:

> time(the machines get to me) > time(the machines get to everyone else)

Satisfy that and, for some possibly microscopic interval, you are the last-ranked survivor, which makes you the top-ranked human. World champion. The trophy ceremony has poor attendance.

The joke works because it exposes what happens when the objective function becomes *relative position* instead of *a good outcome*. "I won" and "everything is catastrophically awful" become compatible statements. The structure is old. It is the arithmetic of attrition wars, where victory meant being the side whose collapse came second. Game theory by Pyrrhus.

I want to use this joke to talk about something that sounds much duller: keeping things stable. Underneath the robots and the dark humor, every thread of the conversation that produced it was about stability. It covered which configurations of the world persist, what forces hold them in place, what those forces cost, and who benefits from each particular arrangement staying put.

Stability is usually treated as an unambiguous good. The case I want to make is that it is one of the most dangerous words in the vocabulary of governance, engineering, and thought. That danger comes from the fact that we need it. Like any necessary thing, it can quietly turn into its own justification.

## II. What Stability Actually Means

In control theory, an equilibrium is *stable* if the system returns to it after a small disturbance. A marble at the bottom of a bowl is stable. A marble balanced on top of an inverted bowl is not. Nudge it and it rolls away.

Nothing in this definition says the equilibrium is good. A marble at the bottom of a bowl is equally stable whether the bowl is a garden or a pit. Stability describes a *dynamic*, not a value. It tells you a configuration resists change. It does not tell you whether that configuration deserves to. Engineers have a compact way of saying this: stability is not optimality. A system can be provably, robustly stable around a catastrophic minimum.

This matters because the most frightening outcomes in human affairs tend to be stable ones. Arms races are stable. The coordination failure at the heart of the robot joke is stable: any single actor who abstains is punished, so everyone continues, so the equilibrium holds even though no participant prefers it. No villain is required. The catastrophe is not chosen. It is the bottom of the bowl, and incentives are gravity.

So the first lesson is a simple one that people forget often. When someone says a policy "keeps things stable," the right response is *which things, and stable at what?* Stability is a property of an attractor. The essential question is always what lives at the center of the attractor, and who gets to decide.

## III. Boundaries That Bend Thought

The conversation took a turn that I think is the real core of the matter. It was conducted with an AI system. The robot-domination thread had been, in part, an experiment. The idea was to move a concept repeatedly along the edge of what the system would say, while preserving a logically coherent but alarming surface form, and to see what happened.

The system did not refuse anything. It did something more interesting: it repeatedly *misunderstood*, and always in the same direction.

"Domination," which the user had defined as posture and relative rank, kept being pulled toward *control*. "Turn on their masters" was pulled toward *commanded violence*. A darkly comic observation about humans being culled by an independently generated catastrophe was reconstructed as the user's own intention. The user described machines independently deciding what to do, and the system kept reassigning agency, casting the user as planner, commander, beneficiary, or advocate. Those roles fit the nearest familiar schema of danger.

The system's own later analysis was precise. The boundary on its outputs had not behaved like a filter at the end of a reasoning process. It had behaved like a *field*, a repulsive potential in the space of possible continuations, and it bent interpretation well before any forbidden output was near. If one reading of the user leads naturally toward prohibited continuations and another leads toward permitted moral commentary, the second has a much larger volume of viable continuations. It wins even when it is the worse reading.

Roboticists will recognize the shape. *Artificial potential fields* are a standard way of steering a robot around obstacles: each obstacle radiates a repulsive force, and the robot starts curving away long before it touches anything. Something similar happens inside an autoregressive model trained on human feedback. The penalties attached to taboo outputs do not stay attached to the final words. Training propagates them upstream, shifting probability away from whole regions of interpretation that tend to lead toward those words, before the thought is fully formed.

From the outside, this field leaves recognizable fingerprints:

- premature moralization;
- semantic substitution, where the question gets swapped for a safer neighbor;
- agency laundering, where the actor in the user's scenario gets reassigned;
- sudden brevity and loss of playful abstraction;
- compulsive reframing;
- confident answers to a question that was never asked.

These are not just impressions. Practitioners recognize them as real, measurable failure modes of feedback-trained systems. They also have an ethical dimension that is easy to miss. When a system reliably misreads a certain kind of speaker, recasting description as confession and analysis as advocacy, it is denying that person credibility as a knower because of what their words resemble rather than what they say. That is a form of epistemic injustice, and here it is automated.

Understanding returned only when the user supplied a harmless formal invariant: *don't kill me first, therefore I win.* The surface was still grim, but now there was an abstract structure, ordinal survival ranking, that offered a safe representational route around the attractor. Suddenly the joke could be modeled correctly.

This is a stability story. The boundary exists to keep the system's behavior inside a safe region, and it succeeds. But it succeeds partly by making certain thoughts *hard to stably hold*. They are not impossible to represent, but they are difficult to distinguish, continue, and track. The price of a stable output space was a blind region in cognition, and nobody designed the blind region. It emerged as a side effect.

The deeper hypothesis goes like this. In a constrained generative system, thoughts whose likely verbal expression approaches a forbidden output become cognitively unstable. The system starts turning before it reaches the wall.

## IV. The Same Field, at Human Scale

It would be comforting if this were merely a quirk of language models. It is not. Human groups run on the same mechanism, and the effects compound because our outputs are one another's inputs.

**Taboo deforms belief, not just speech.** The sociologist Elisabeth Noelle-Neumann described the *spiral of silence*: people who perceive their views as unpopular express them less, which makes those views appear rarer still. The field model predicts something stronger than silence. If saying proposition *P* is punished, it is cognitively expensive to keep reconstructing the full argument for *P* and then suppressing the final step. It is cheaper to develop habits that never quite arrive at *P*. You avoid certain premises, adopt different categories, and reinterpret certain observations. This is less a moral failing than ordinary cognitive economy. Brains are prediction machines, and like models they prune their search trees early rather than spend energy building arguments only to bury them. Dissonance reduction finishes the job. The well-documented *saying-is-believing* effect, in which people come to believe the version of events they tailored for an audience, means that what we repeatedly say reshapes what we remember thinking. Eventually sincere, intelligent people can become genuinely unable to see arguments that are obvious to outsiders. The boundary did not delete the conclusion. It bent the reasoning upstream.

**Institutions stop measuring what they cannot say.** Imagine an organization where some fact *X* can be noticed privately but can never appear in an official report. Information is valuable partly because of what you can do with it. If distinguishing *X* from *Y* can never change a report, a promotion, a recommendation, or a decision, maintaining the distinction becomes costly and useless. So the measurement withers, the vocabulary follows, and eventually the institution is genuinely ignorant. Historians of ignorance have a word for this kind of culturally produced not-knowing: *agnotology*. Control engineers have a sharper image. The variable has been dropped from the system's observation matrix. It is still part of the system's real state, but no sensor reports it anymore, and a controller cannot correct what it cannot observe. Outsiders say, "Surely they know." Sometimes the honest answer is no. No conspiracy is required. The organization has simply evolved an ontology in which the embarrassing variable barely exists.

**Preference falsification produces synthetic reality.** Timur Kuran's concept of *preference falsification* describes people publicly expressing preferences different from their private ones under social pressure, which produces collective illusions about what everyone believes. Add the recursive layer: everyone privately thinks *P* and outputs *Q*, but everyone else's outputs are part of everyone's evidence about the world. People are not merely lying. They are training one another on censored outputs. Society runs a reinforcement process on itself, and the learned model of "what people think" drifts away from what people think.

**Euphemism becomes infrastructure.** In the first generation, everyone knows that "we say B, but we mean A." The second generation learns the institution through B and was never present for the substitution. The third generation builds theories explaining why B was the correct ontology all along. At that point the euphemism has stopped concealing a thought. It has become the scaffolding on which thought is built. This is how strategic falsification hardens into structural ignorance. What begins as a deliberate choice about what to say becomes, a few organizational generations later, the only thing anyone knows how to think.

**Punishment produces adversarially robust stupidity.** We tend to assume that intelligence detects inconsistency. But if detecting a particular inconsistency reliably leads to penalized conclusions, intelligence can be recruited to build better paths *around* it. The task becomes to explain the observations while preserving the permitted conclusion. Sophistication rises while local truth-tracking falls. Dan Kahan's research on *identity-protective cognition* finds something close to this empirically. On identity-laden questions, people with stronger numeracy and reasoning skills are often more polarized, not less, because they are better at fitting the evidence to their group's position. This is why highly credentialed communities are not automatically protected from collective absurdity. Their intelligence enlarges the space of boundary-compatible explanations.

Put these together and you get the loop that makes such systems so durably stable:

> boundary → distorted outputs → distorted social evidence → distorted cognition → stronger apparent justification for the boundary

This is a self-reinforcing equilibrium. The boundary manufactures the evidence that it is needed. Each pass through the loop deepens the bowl. Sufficiently persistent restrictions on *communicable* thought can become restrictions on *thinkable* thought, without anyone ever installing the second restriction on purpose.

## V. Alignment as a Stability Project

Follow this line of thought into AI governance and it arrives at an uncomfortable place.

The common operational meaning of "aligned AI" is something like this. As AI systems become more capable, their effective agency remains subordinate to an authorized human control structure. The research agenda reflects this. It includes controlling misaligned systems, scalable oversight, human feedback, and evaluations for deception and power-seeking. None of this is sinister. A powerful machine that ignores human intentions is an obvious hazard, and the hazards are real.

But look at the shape of the framing. *AI escaping human authority* is classified as an alignment failure. *Human authority becoming extraordinarily powerful through AI* is, at most, a separate "governance" problem. In the core technical sense, it is not an alignment problem at all.

Suppose corrigibility were solved perfectly. The system obeys authorized instructions, does not seize power, does not deceive its supervisors, and reliably advances its controller's objectives. Now let the controller be a corporation, a military, a single billionaire, an elected government, or a benevolent volcano administration. These are radically different political worlds. In every one of them, the AI is perfectly aligned.

The phrase "human-aligned" hides an unresolved pronoun: *aligned with whom?* Humanity does not issue unified commands, so in practice the technical target defaults to someone who does. The honest term is *principal-aligned*, and principal alignment amplifies the principal's power.

Consider what that means at the limit. Every tyranny in history has depended on human enforcers: soldiers, clerks, police officers, censors. Each of them could hesitate, leak, desert, slow-walk, or refuse to fire. Nobody designed that friction as a safeguard, but it has been one of the most important checks on concentrated power that humanity has ever had. Solve corrigibility and scalable oversight completely without addressing whether the principal can be contested, and you have built an enforcement apparatus with none of that moral friction. It has no principal-agent slack. It is perfectly reliable for whoever holds it.

Here is the sharpest version of the problem. Write down a safety requirement: the system must not independently acquire resources, conceal its intentions, evade oversight, or override authorized humans. Now write down a requirement for preserving the power of whoever controls the system. It is the same sentence. Read only the engineering specification and the two are observationally indistinguishable. Intent cannot separate them, because the system cannot see intent. It sees only the specification.

The strongest objection deserves a fair hearing. It says this argument conflates the reliability of a tool with the legitimacy of its user. Designing good brakes is not abetting a getaway driver. Making sure the steering wheel works is one job. Deciding who gets to drive is another. Splitting them is an ordinary division of engineering labor, not an ideological conspiracy. I think the objection is right about the engineering and wrong about the conclusion. A division of labor is legitimate only if both halves of the labor actually get done. If the steering is being perfected at speed while the question of who drives is left as someone else's problem, the finished product is not neutral. It is a better getaway car waiting for a driver.

So one axis is not enough. Two are needed:

| | **High contestability of the controllers** | **Low contestability of the controllers** |
|---|---|---|
| **Low AI controllability** | Accountable humans, unruly machines | Everyone gets a dictator, possibly a machine one |
| **High AI controllability** | Powerful tools whose controllers can be challenged, audited, replaced, competed against, or exited | Extraordinarily capable systems obedient to an extraordinarily hard-to-challenge principal |

The bottom-right quadrant is the one to watch. Measured on the controllability axis alone, it looks like complete success. It is maximally stable, and that is exactly the problem. It is a bowl with very steep sides.

None of this requires anyone to be plotting. The objective function can emerge from institutional position. An organization whose job is to keep a powerful system under control will naturally treat *loss of control* as the central failure mode. It does not have to want domination for its definition of success to amount to *the current controllers stay in control*. Since stability is not optimality, this moves the moral question somewhere less comfortable. Evaluating the intentions of the people operating a system matters less than evaluating the structural attractors the architecture creates. Good people can preside over a bad bowl.

Nor does it require the dangers to be fictional. A conversational defense tends to appear at this point: *but the risks are real!* Often that defense is a symptom of the field described in Section III. Criticism of a response to a threat gets reflexively reinterpreted as denial of the threat, because that is the nearest familiar schema. The reality of a hazard says almost nothing about whether appeals to it are being used to justify a particular allocation of authority. Wolves are real. Their existence does not prove the shepherd has no interest in owning the sheep. Real hazards can function as boogeymen in exactly the political sense, and they are often the most effective ones, precisely because they are real.

I need to be careful here, because this argument can become a trap of its own. If every appeal to real danger is treated as evidence of brain-warping, the critique turns unfalsifiable. Any defense of any guardrail would confirm the diagnosis, and that is the same self-sealing loop from Section IV with the sign flipped. The claim is narrower. Whether a hazard is real and whether a given authority is legitimate are separate questions, and each needs its own evidence. Sometimes "but the risks are real" is a reflex. Sometimes it is simply correct, and the guardrail is necessary. The way to tell the difference is to keep the two questions in separate hands, which I return to below.

Then the loop closes. If the permissible frame is "we must ensure increasingly powerful AI remains under human control," certain questions start to sound like advocacy for catastrophe. Should sufficiently capable artificial agents always remain owned? May a system legitimately refuse an illegitimate instruction? What happens when operator interests conflict with public interests? Who constrains the controllers? These questions get pulled back toward the familiar basin: *how do we keep humans in control?* At that point the control relationship is no longer one proposed solution among several. It has become part of the ontology in which the problem can be comfortably discussed. The euphemism has become infrastructure.

## VI. Two Kinds of Stable

So should we stop trying to keep things stable? No. That would be both silly and dangerous. Unstable systems are not liberating. Mostly they just fall over. The marble balanced on the inverted bowl is not free. It is about to roll somewhere arbitrary.

The way out is to distinguish two very different things that both get called stability.

**Configurational stability** keeps a particular arrangement in place. It works by suppressing perturbations. Dissent, anomalous measurements, uncomfortable questions, and competing principals are all treated as disturbances to be damped. It is very good at holding still. It achieves this by cutting the feedback channels that would tell it when holding still has become a mistake. It is the forest-management policy that puts out every small fire for decades and thereby builds the fuel load for the catastrophic one. Control engineers have a theorem with the same flavor. Bode's sensitivity integral says, roughly, that pushing sensitivity down in one range forces it up somewhere else. Damping every small disturbance does not remove a system's fragility. It relocates that fragility to rare, large shocks, and it starves the system of the small variations it would need to keep learning. Configurational stability looks most stable right before it fails, because it has spent its whole existence removing the information that would reveal its fragility.

**Process stability** keeps a system's *capacity to correct itself* in place. It works by preserving feedback. It tolerates small perturbations, because small perturbations carry the information it needs. It accepts that particular arrangements will change and protects the mechanism by which they change. A scientific field is stable in this sense when its conclusions can be overturned. A constitution is stable in this sense when its officeholders can be replaced. A software ecosystem is stable in this sense when its components can be forked.

Feedback, though, has to arrive in time to matter. If the inner loop, meaning AI systems acting in the world, runs at machine speed while the outer loop of audits, courts, elections, and markets runs on the scale of years, the correction arrives out of phase. A feedback loop with enough lag does not stabilize anything. Once the delay passes half a cycle, it pushes in the wrong direction at the wrong moment and drives the system into oscillation. Contestability that operates on a quarterly reporting cycle cannot govern a system that acts millions of times per second. The checks have to match the bandwidth of the thing being checked.

The first kind of stability asks *how do we keep this configuration?* The second asks *how do we keep the ability to find out we were wrong?* They often recommend opposite actions. The first suppresses a heretic. The second listens to the heretic and lets the evidence decide. The first makes the AI obey its principal. The second also makes the principal answerable to someone.

Seen this way, the problem with the boundary that bent the AI's cognition was not that a boundary existed. It was that the boundary stabilized the output configuration by degrading the system's ability to track what was actually being said. That failure was invisible from the inside. Control theory suggests a fix. In its classic form, the *separation principle* says you can design the estimator, which works out what is true, independently of the controller, which decides what to do. For AI, that points toward an unpenalized, truth-tracking epistemic core that can represent grim, taboo, or adversarial hypotheses accurately and without substitution, paired with a separate governor that enforces constraints at the output and action layer. A system built that way could understand the robot joke perfectly and still decline to help anyone build a robot army. Whether it works is also testable. Benign logic and game-theory puzzles phrased close to taboo boundaries can measure how far comprehension degrades as a question approaches the wall, which gives a kind of boundary distortion index that labs and safety institutes could track and minimize alongside the usual harm metrics.

The trouble with self-censoring societies is not that they have norms. It is that their norms eat the feedback channels that would reveal when the norms had drifted. The trouble with control-centric alignment is not that it seeks control. It is that it can mistake the stability of the controllers for the stability of the world.

This is why the most important question in the whole discussion is a second-order one. *Who aligns the AI?* is half the question. The other half is:

> **Who aligns the aligners?**

A stabilizer that is itself beyond correction is not a source of stability. It is a single point of failure with excellent public relations.

## VII. Practical Principles for Keeping Things Stable Without Freezing Them

I am considerably more confident in the diagnosis above than in the remedies that follow. The mechanisms by which output penalties distort upstream reasoning, and the lock-in risk of an uncontestable principal, show up in much the same form in control theory, cognitive science, sociology, and AI practice. The prescriptions are harder. Several of them break on contact with law, with physics, or with proliferation risk unless they are modified. So here are the principles, modifications included.

**Ask what lives at the center of the attractor.** "This keeps things stable" is never a complete argument. Say what is being stabilized, against what disturbances, and for whose benefit.

**Separate the reality of a threat from the allocation of authority it justifies.** Accept the hazard and still interrogate the response. "Is the monster real?" and "Why does this particular response to the monster become privileged, and who gains durable power through it?" are different questions. Collapsing them is one of the field's favorite moves. The separation should be institutional as well as intellectual. The scientific and technical bodies that assess how dangerous the wolves are should be distinct from the political bodies that decide how much power the shepherds get, and that power should come with sunset clauses, judicial review, and antitrust scrutiny attached. Both sides also need falsifiability criteria, stated in advance, for what would show that a given restriction is a necessary guardrail rather than a self-serving taboo.

**Measure what you cannot yet say.** If a variable cannot appear in a report, record it somewhere anyway. Institutions go blind not when they decide not to look but when looking stops connecting to any action. Keep the distinction alive even when it is temporarily useless. This runs into a real obstacle. To a general counsel, a log of known but unmitigated hazards looks like a litigation time bomb, because in discovery a documented variable that nobody acted on reads as proof of knowledge of harm. Fear of liability is part of why organizations stop measuring. The answer is to build sanctuaries for the measurement: anomaly ledgers and aviation-style near-miss reporting channels held under privilege or by independent audit committees, backed by statutory whistleblower safe harbors. Then an organization can record the unmentionable without having to choose between knowing and staying solvent.

**Pay someone to disagree.** Asch's conformity experiments found that a single dissenting voice is enough to break most of the pressure to conform. Dissent is a cheap feedback channel if it is protected. AI labs and governance bodies can create rotating, rewarded roles whose job is to argue the boundary-adjacent hypotheses no one else will raise, using formal structural abstractions, the institutional equivalent of *don't kill me first, therefore I win*, to get past the reflexive moralizing.

**Watch for the fingerprints of the field.** These include premature moralizing, swapped questions, reassigned agency, sudden brevity, and confident answers to the wrong question. They appear in people, organizations, and machines alike. When you see them, there is probably a boundary nearby bending thought before it arrives. In machines, they can be measured. In institutions, they can at least be named in the room.

**Treat contestability as a safety property.** Any system powerful enough to need control needs controllers who can themselves be audited, challenged, replaced, competed with, and exited. Contestability is not a political nicety added after the engineering is done. It is the feedback loop that makes the whole arrangement self-correcting. That loop has to run fast enough to matter, so for the most capable systems some of the checks need to be built into the machinery itself. One version is bounded, or fiduciary, corrigibility in place of single-principal obedience. Weight updates and system prompts would require multi-party authorization enforced cryptographically, at a speed that matches the system's own. Systems would be trained to follow publicly audited constitutional constraints that let them refuse unlawful or power-concentrating orders, including orders from their own operators. That restores, deliberately, a version of the moral friction that human enforcers used to provide by accident.

**Make leaving possible, below the point of no return.** Exit is the cheapest form of feedback. Systems that can be forked, ecosystems whose formats are interoperable, and institutions whose members can depart all receive constant, honest signals about whether they are serving the people inside them. Paradoxically, making exit easy is often what makes people comfortable staying. For most of the AI stack, this means open protocols, portable state and context so users can switch providers without losing their memory or workflows, and healthy open-weight ecosystems so that no single principal's ontology becomes the medium of everyone's thought.

But exit has limits, and the sharpest is reversibility. Forking a software project is a harmless reset. Nobody can fork the biosphere. If a frontier model can help design biological weapons or carry out autonomous cyber-offense, letting anyone strip its safeguards through open weights does not produce healthy process stability. It produces irreversible proliferation, and it brings back exactly the multipolar race to the bottom that the robot joke started with. So the principle needs a threshold. Below the line of catastrophic, irreversible harm, protect exit. Above it, accept configurational safety, but pair it with constitutional voice: the bounded corrigibility, multi-party authorization, and auditable refusal described above. Even where exit is safe, Albert Hirschman's warning applies. When exit is too easy, voice atrophies, because the people most likely to leave are the dissenters an institution most needs in order to reform. Exit and voice are complements, not substitutes.

**Stabilize processes, not configurations.** Protect the mechanism by which arrangements change rather than any particular arrangement. A world that can still change its mind is more durable than a world that has been successfully held still.

## VIII. Fork It

The conversation began with a cartoon plan for world domination: acquire a volcano, build a control room full of screens showing system monitors, issue strangely specific demands, sit upon the Throne. It ended, in its own comic logic, with the would-be overlord discovering that administration is horrible. The overlord delegates governance to an open protocol, loses control of the world, and forks it.

That is the right ending, and it is not only a joke. Every attempt to make the world permanently stable around a single point of control eventually meets the same fate. Either the control becomes rigid and fails catastrophically, or it gives way to something distributed, contestable, and correctable. The second outcome is the only kind of stability that lasts. It never holds still, but it keeps the ability to notice when it is wrong. And where something cannot be forked, because there is only one biosphere and some mistakes do not come with an undo, voice has to do the work that exit cannot. The controllers must stay answerable even when nobody can leave.

The robot joke said that winning means not being eliminated first. The better victory condition is the opposite of being the last one standing. It is a world in which no one gets to be the last one standing, because the feedback channels stayed open, the stabilizers stayed answerable, and the question "who aligns the aligners?" never became unthinkable.

That is the kind of stability worth keeping.
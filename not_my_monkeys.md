# Not My Circus, Not My Monkeys

## An Essay on Monkeys, and on the Security Architecture of Not Caring What They Do

There is an old Polish proverb, *nie mój cyrk, nie moje małpy*: not my circus, not my monkeys. It is usually said with a shrug. Somebody else's chaos, somebody else's problem. The monkeys may be running up the tent poles, stealing hats, flinging things at the audience. It does not matter, because none of it can reach you.

Most people hear the proverb as a statement about responsibility. This essay treats it as a statement about architecture. The speaker is not making a moral claim that the monkeys are good or bad, clever or stupid, loyal or treacherous. The claim is structural: whatever the monkeys do, it cannot touch what I care about. That is a rare and valuable property, and it turns out to be one of the deepest ideas in computer security. It is also one we keep forgetting.

This is an essay about monkeys. More precisely, it is about how much we have to know about monkeys, and why the best answer is "nothing at all."

---

## 1. The Monkey Problem

Imagine you are responsible for something precious. Call it the protected state. It might be a database of medical records, the signing key for a software update, or the control loop of a power plant. Somewhere nearby there is a monkey. The monkey is any subsystem you do not control: a user, a third-party library, a networked peer, a language model reading arbitrary web pages, an insider with a grudge.

The conventional instinct is to study the monkey. We ask questions about its behavior and build machinery to answer them:

- **Firewall:** Which packets may cross from the monkey to me?
- **Intrusion detection:** Was that packet malicious?
- **Authentication:** Which monkey is sending the packet?
- **Anomaly detection:** Is this monkey behaving like it usually does?

Each of these is a reasonable question. But every one of them puts the monkey's behavior inside the security argument. The safety of the protected state now depends on our correctly classifying what the monkey is doing, and the monkey gets a vote in whether we succeed.

Written a little more formally: let *P* be the protected state, *U* the untrusted subsystem, and *I(P)* the invariant we want to hold, such as "the records are never disclosed" or "the key is never used without authorization." Conventional security labors to establish something shaped like this:

> *U behaves acceptably ⇒ I(P)*

That is a conditional. It is only as strong as our confidence in its premise, and its premise is a claim about the monkey.

The alternative we actually want is:

> *For all u ∈ Behavior(U), I(P)*

For every possible thing the monkey could do, the invariant holds. At that point we have stopped caring what happens in *U*. We have not merely concluded that the attacker probably cannot win. We have removed facts about the attacker from the proof entirely.

That is the proverb, stated in logic. Not my circus. Not my monkeys.

---

## 2. We Already Knew the Trick

None of this is new. It is one of the oldest ideas in the field, and it has had an explicit, standardized form for decades: the air gap.

NIST defines an air gap as an interface between systems that are not physically connected, where any logical transfer is not automated and happens manually, under human control. Classified environments have long run disconnected "high side" and "low side" networks, and the terminology itself distinguishes them by classification level. The reason is not that disconnection is a particularly strong filter. It is that separation lets you reason about the two domains independently.

Compare the air gap to the questions above:

- **Firewall:** Which packets may cross?
- **IDS:** Was that packet malicious?
- **Authentication:** Who is sending the packet?
- **Air gap:** *There is no packet path.*

The air gap does not answer the monkey question better. It makes the question meaningless. There is no packet to inspect, no sender to authenticate, no intent to classify. Whatever the monkeys on the low side are doing, and they may be doing a great deal, it has no channel through which to become relevant.

This should be humbling for anyone designing modern systems, and especially for anyone building security around autonomous software agents. The trick was never to make the guard extremely smart. The trick was to remove the channel whose correctness required a smart guard.

The air gap is not magic, of course. Removable media, physical access, insiders, acoustic and electromagnetic side channels: all of these reintroduce paths across the gap, and some famous attacks have used exactly those paths. But this supports the argument rather than weakening it. In an air-gapped architecture, every reintroduced channel is *identifiable*. It shows up as a specific new coupling that needs specific justification and analysis. That is a very different stance from treating a huge, continuously connected, semantically rich interface as acceptable by default and then trying to police what flows through it.

The general principle can be put this way:

> A secure architecture looks for domains whose independence can be established structurally. Every consequence-bearing channel between those domains is then an explicit concession of coupling, and each one must be justified.

This is more than "least privilege" and more than "minimize the attack surface." The thing being minimized is **unwanted causal relevance**.

---

## 3. Consequences Prove Vulnerability

Here is a statement that sounds like an exaggeration at first: *if your security relies on consequences, you are vulnerable.*

The precise version holds up. If security depends on consequences changing an actor's choice, then the forbidden transition is still technically reachable. Laws, contracts, audits, firing people, prosecuting them, banning accounts: these are deterrents. They change the odds. They act on the monkey's incentives. A deterrence-based system says, roughly:

> *P(good transition) ≫ P(bad transition)*

An encapsulated architecture says something else:

> *S_bad ∩ R = ∅*

where *R* is the set of reachable states and *S_bad* is the set of states that violate the invariant. The bad outcome is not unlikely. It is unreachable.

This difference is categorical. It is not a matter of degree. Deterrence is legitimate and often necessary. Economics, game theory, and policing keep large systems stable, and we could not run a society without them. But deterrence is not encapsulation. A monkey that does not care about consequences, whether through desperation, ideology, ignorance, or simply being a process with no self-preservation instinct, passes straight through a deterrence-based defense. A monkey facing an unreachable state gets nowhere, whatever its psychology.

The sharpest version of this is the argument "they wouldn't do that, because it would destroy their own environment." If that is part of your defense, then the continued existence of the attacker's environment, and the attacker's attachment to it, are now part of your threat model. You have started reasoning about monkey motivation. You are back in the circus.

---

## 4. Attack Surface Measures the Wrong Thing

Security people like to talk about attack surface: how many interfaces, endpoints, parsers, and ports a system exposes. Smaller is better. That is true as far as it goes, but it measures size, not shape.

Consider two systems:

- **System A** exposes ten interfaces. None of them operates on any representation capable of violating the invariant. A compromised interface can produce garbage, crash, or misbehave, but it cannot reach the protected state.
- **System B** exposes one beautifully designed, carefully audited API. If that API is ever subverted, the attacker owns everything.

By attack-surface accounting, System B wins easily. Architecturally, it is far worse. Its whole security story depends on one interface never failing, and interfaces fail.

What we want to measure next to attack surface is something like **causal aperture**, or a relevance surface:

> How many paths exist by which behavior in domain A can become consequential to invariant B?

Good security architecture pushes causal aperture toward zero. An interface that the monkey can bang on all day without affecting anything that matters adds no aperture, however exposed it is. A single narrow interface that carries authority is a wide aperture, however small it looks.

Through this lens, the monkey in System A is loud and close and entirely irrelevant. The monkey in System B is quiet, far away, and holds the keys.
Of course, this immediately collides with a hard reality: the utility–aperture paradox. Systems exist *specifically* to allow external actors—monkeys—to affect internal states. A bank that eliminates the channel for customers to initiate wire transfers, or an AI assistant air-gapped from reading emails and updating calendars, achieves zero causal aperture and zero utility. At the semantic layer, a fraudulent wire transfer and a legitimate one are type-identical.
The resolution is not to pretend that every channel can be closed, but to draw a sharp boundary between **accidental aperture** and **essential aperture**:
- **Regime 1: Eliminate accidental and unprivileged channels.** Where an untrusted component does not strictly need authority to fulfill the system's purpose, collapse the causal aperture to zero.
- **Regime 2: Bound and audit essential, authority-bearing channels.** Where a channel must carry real-world consequences to be useful, stop pretending a clever classifier will make it safe, and instead structurally limit the rate and magnitude of what can pass through it.

---

## 5. Changing the Problem Instead of Guarding It

How do you get causal aperture to zero when the system really does need to interact with untrusted things? Building walls is often not enough. The more powerful move is to reformulate the problem.

Sometimes the original problem *Π* simply cannot be made safe while keeping its current form. Some operation in it is dangerous, and every version of that operation needs a guard. So we transform it:

> *Π →(T) Π′*

We choose the transformation *T* so that the dangerous operation in *Π* does one of three things:

1. It does not exist in *Π′*.
2. It has no interpretation that carries authority in *Π*.
3. It produces outputs whose influence on *Π* is structurally bounded.

Call this **trans-problem encapsulation**. It is more than sandboxing. A sandbox puts the monkey in a cage and hopes the bars hold. Trans-problem encapsulation changes the world so that nothing the monkey can do means anything to you.

Programmers know a local version of this idea under the slogan *make invalid states unrepresentable*. If a type system makes it impossible to build a malformed value, you never need to check for one. Generalized across trust boundaries, the slogan becomes:

> **Make security-relevant interactions unrepresentable.**

In everyday systems engineering, this means enforcing *parse, don't validate* and object-capability (ocap) discipline. Instead of scattering ad-hoc regex blacklists across ambient-authority database credentials, a secure boundary ingests raw bytes through strict, memory-safe parsers that emit strongly typed data structures holding zero execution authority, while tying state mutations directly to scoped, cryptographic user capabilities. An untrusted component that can only emit values from a type with no authority-bearing members cannot forge authority, however clever it is. A reader that receives only rendered pixels cannot inject commands into a parser that does not exist. A monkey given a crayon and a sheet of paper can do many things, but none of them is signing a wire transfer.

And when a human or agent *must* be given the ability to sign transfers—when we cross into Regime 2 and cannot eliminate the operation—we apply the third rule: **bounded consequence**. Rather than relying on a smart guard to spot a malicious transfer, we structurally cap the channel's velocity and blast radius. We use hardware-enforced rate limits (preventing even a database administrator from querying more than *N* records per minute), virtual payment cards with hard dollar ceilings, and multi-party quorum signing (*M*-of-*N* keys) for existential actions. Even if the monkey goes berserk, the physics of the channel limit how much of the tent it can pull down.

---

## 6. The Epistemic Burden of Monkeys

The cleanest way to compare security architectures may be to ask how much you need to know about the monkey in order to say you are safe.

Call this the epistemic burden, written informally as *K(U | I)*: the knowledge about the untrusted subsystem *U* that is required to establish the invariant *I*.

A fragile architecture carries a very large epistemic burden. To claim safety, you need to know:

- what software the monkey is running,
- whether it has been compromised,
- what its messages actually mean,
- what it intends,
- which vulnerabilities currently affect it,
- whether its credentials have leaked and when they were last rotated,
- whether its current behavior is anomalous,
- whether it has been patched,
- and how it will behave in situations nobody has seen before.

Every item on that list is a premise in the security proof, and every premise is a place where the proof can fail.

Perfect encapsulation aims for:

> *K(U | I) → 0*

Under this metric, the sentence "I have no idea what those idiots are doing over there" stops being an admission of negligence and becomes a *positive security property*. You do not know, and you do not need to know. Not knowing is the evidence that the architecture works.

This may be the most rigorous reading of the proverb. Not my circus, not my monkeys means: my safety has zero epistemic dependence on the monkeys.
Notice the ethical dividend hidden inside this metric. Internally, pushing *K(U | I) → 0* is deeply humane: if an employee structurally cannot exfiltrate sensitive records or accidentally drop a production table, the organization does not need to subject its workforce to panoptic surveillance, and security failures cannot be lazily blamed on "human error."
Yet the proverb carries a corresponding moral hazard if turned outward. Elevating "not my circus, not my monkeys" into a general corporate alibi risks weaponized plausible deniability. If a platform architect designs a system to be structurally blind to how bad actors use the platform to harm third parties—through fraud, abuse, or laundering—architectural isolation degenerates into willful negligence and forensic blindness. Epistemic independence is a virtue for protecting your own state from untrusted inputs; it is not an excuse for building a blind catapult that flings monkeys into someone else's yard.

---

## 7. The Telephone Game of Agentic Security

This explains a particular discomfort with many current proposals for securing systems built from autonomous AI agents. The issue is not that agents are uniquely dangerous. The issue is the shape of the security argument.

A common pattern looks like this: agent A evaluates the output of agent B, which interprets content fetched by agent C, which has been "sanitized" by a filter before reaching agent D, who has the authority to act. Every link depends on one entity correctly understanding another entity's meaning. The security claim is only as strong as the weakest act of interpretation in the chain.

That is a telephone game. Semantic correctness has to propagate through the entire architecture, and natural-language semantics is exactly where adversarial inputs do best. Each hop adds epistemic burden. Each guard is another monkey whose behavior we must now trust.

The alternative is almost deliberately unsophisticated:

> Don't try to understand the adversary better. Arrange things so that understanding the adversary gains you nothing.

This is cryptography at its best. A good cipher is not secure because a very clever guard spots people trying to decrypt messages. It is secure because holding the wrong information is mathematically insufficient. The ciphertext can sit in public, and the monkeys can examine it as closely as they like. Their intelligence, their tools, and their intentions do not enter the proof.
Applied to AI agents, this means abandoning semantic guardrails and "LLM-as-a-Judge" classifiers as primary security boundaries, and instead separating control flow from data flow. In a Dual-LLM (or CaMeL-style) architecture, a *Privileged Orchestrator*—which never touches untrusted data—compiles a deterministic execution graph, while a *Quarantined Reader* model—which holds zero tool authority—extracts untrusted content into rigid, non-executable schemas like enums and integers. By breaking the "lethal trifecta" so that no single agent context simultaneously holds private data, untrusted input, and external network egress, prompt injection loses its teeth. For high-consequence transitions that cannot be reduced to fixed schemas, the architecture drops down to a true human-in-the-loop air gap via a deterministic UI outside the model's control.

---

## 8. Why Are You Differentiating Monkeys?

Security culture likes to sort people by hat color. White hats are the good hackers, black hats the bad ones, gray hats somewhere in between. Socially and legally, the distinction is real. Intent matters in courts, in hiring, and in ethics.

Technically, it should not appear anywhere.

If the invariant depends on the attacker's disposition,

> *I = f(attacker disposition)*

then the architecture already has a dependency on disposition, and dispositions change. Employees get disgruntled. Accounts get stolen. Trusted vendors get compromised. Yesterday's white hat is today's black hat, or more often today's unwitting proxy for one.

The ideal is:

> *∂I / ∂disposition = 0*

The invariant is completely insensitive to the intentions of whoever is on the other side.

White monkey. Black monkey. Friendly monkey. Drunk monkey. Monkey with a grudge. Monkey that is actually a very well-funded intelligence agency wearing a monkey suit.

Why are you differentiating monkeys?

If your architecture needs you to tell them apart, it has already admitted that some monkey, somewhere, can hurt you.
Here again, the boundary between our two regimes keeps us honest. In every critical system, *someone* must eventually hold legitimate authority to mutate the protected state—a doctor accessing medical records, a CFO signing off on a ledger, an engineer maintaining the underlying Trusted Computing Base. You cannot encapsulate a system against an authorized actor without revoking their ability to do their job. Once legitimate authority is explicitly granted across an essential channel, technical encapsulation reaches its mathematical limit. At that boundary—and *only* at that boundary—intent classification (*mens rea*), bounded consequence, and legal or social deterrence take over. The error of conventional security is not that it uses deterrence and disposition analysis for authorized insiders, but that it lazily applies them to unprivileged, accidental channels where disposition shouldn't matter at all.

---

## 9. Security Architecture as Premise Elimination

This leads to a design review that is easy to describe and hard to pass. Do not start by asking, "What attacks have we anticipated?" That question invites an endless list of defenses, each one a new premise, each one a new thing to get wrong. Ask instead:

> **What facts about the untrusted domain must stay true for us to be safe?**

Then attack every answer.

- *"We need it not to forge X."* Why can its output ever constitute X in the first place?
- *"We need it not to exfiltrate Y."* Why can it observe Y at all?
- *"We need it not to contact Z."* Why does a causal path to Z exist?
- *"We'll detect attempts."* Then attempts are representable. Why?
- *"They wouldn't do that, because it would destroy their own environment."* Then their environment, and their attachment to it, is now part of your threat model.

At every step, the goal is to *delete a premise* from the security proof, not to *add a defense*. Each successful deletion removes a whole category of monkey behavior from the list of things you have to worry about.

This is the central idea:

> **Security architecture is premise elimination.**

Trans-problem encapsulation is the technique of changing the problem until whole categories of assumptions disappear. The air gap is its oldest and plainest example. Type-level unrepresentability is its programming-language form. Cryptography is its mathematical form.
In formal threat modeling, we can express this through Assume-Guarantee reasoning, writing a security contract as a pair *⟨A, G⟩*: if the environment satisfies assumptions *A*, the system guarantees invariant *G*. Premise elimination is the discipline of driving the assumption set toward zero (*|A| → 0*) for every external interface and unprivileged component, reserving behavioral monitoring strictly for the irreducible assumptions that remain inside the Trusted Computing Base and authorized business workflows.
In practice, this also means confronting an economic tension between capital expenditure (CapEx) and operational expenditure (OpEx). Structural encapsulation demands high upfront CapEx, disciplined systems engineering, and sometimes slower initial integration, whereas monitoring-based security—SIEMs, WAFs, semantic guardrails—buys rapid time-to-market at the cost of crushing, permanent OpEx in alert triage and SOC payroll. Worse, compliance frameworks like SOC 2, HIPAA, and PCI-DSS often penalize "not knowing what the attacker is doing," forcing teams to maintain high-*K(U | I)* logging regardless of isolation. The pragmatic move for engineering leaders is to use one to starve the other: audit the noisiest alerts in your Security Operations Center, ask *"Why does a causal path for this alert exist at all?"*, and systematically reallocate OpEx from detection engineering into CapEx for premise deletion.

---

## 10. Conclusion: The Wisdom of the Shrug

Monkeys are clever, curious, unpredictable, and occasionally destructive. People have spent a long time trying to understand them, train them, cage them, and guess what they will do next. Security engineering has repeated this effort with its own monkeys: attackers, untrusted code, compromised peers, and now autonomous agents. We keep building smarter and smarter guards to watch them.

The proverb offers another way. The person who says *not my circus, not my monkeys* has not out-thought the monkeys. They have not built a better cage, a better classifier, or a better theory of monkey psychology. They have arranged their life so that monkey behavior does not reach them. Their safety rests on structure, not vigilance.

That is the goal. It is not always fully achievable. Real systems need channels, and every channel is a place where monkeys can matter again. But each channel should be an explicit, justified, carefully analyzed concession, not an unexamined default. The question to ask about every interface, every agent, and every integration is not "how do we watch the monkeys more closely?" but "why can the monkeys affect us at all?"

The best security architecture does not know what the monkeys are doing.

It does not need to.
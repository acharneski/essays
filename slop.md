# Please, Sir, May I Have Some More?

## I. The Bowl

The scene is one of the most familiar in English literature. In the workhouse dining hall, the boys are given one porringer of gruel each and no more. They are slowly starving. They draw lots, and the short straw falls to a nine-year-old named Oliver Twist. After supper he rises, walks to the master with his bowl and spoon, and says the line that has outlived nearly everything else in the book.

In the novel, Oliver says: *"Please, sir, I want some more."*

Collective memory has softened it into *"Please, sir, may I have some more?"* It is more polite, more pleading, and slightly wrong. Nobody decided on the change. It arrived through retellings, adaptations, and half-remembered quotations, and it stayed because removing it was never anyone's job. It is a small, harmless addition to the cultural record, fixed in place by repetition. That turns out to be a fitting way to begin an essay about slop.

Look at the bowl. The thin, gray, institutional stuff ladled into it has an old name: slop. Food for pigs and paupers. Bulk without nourishment. In the last few years the word has come back with a new job. We now say *AI slop* for the flood of machine-generated text, images, and code that fills search results, feeds, and repositories. The word fits so well that it caught on almost overnight.

I think we are using it too narrowly. We have pinned it to the producer when it should name the pathology. We have taken a word that could describe how almost every complex system fails and made it a complaint about one technology. And we have missed the irony in Dickens's scene. In the workhouse, asking for more was a scandal. In our systems it is the default. The scandal now is asking for less.

## II. Not Garbage

The usual definition of slop is "low-quality content, probably made by a machine." That definition has two flaws.

The first is that it ties the concept to one producer. Slop existed long before language models. Legal codes, government forms, enterprise software, and academic literature have all been producing it for generations without any help from a GPU. If the word only applies to output from a neural network, it explains very little.

The second flaw is more serious. "Low quality" is the wrong axis. Much of what deserves the name slop is not bad at all. Every function in a bloated codebase might work. Every paragraph on a swollen web page might be true. Every clause in an inherited contract might conceivably matter. Every citation in a literature review might really be about the topic.

So I propose a distinction:

> **Garbage is bad material. Slop is material that escaped selection.**

Slop is not defined by how good each part is. It is defined by how the parts relate to the whole. Each piece can defend its own existence, and nobody has asked whether the artifact should contain it. The failure happens at a level above any single component:

> Local defensibility does not imply global necessity.

That is why slop is so hard to see and so hard to fight. Garbage fails inspection. Slop passes it. Every piece survives local review because local review is the wrong test. Our quality machinery, from compilers and linters to copy editors and peer reviewers, was built to catch garbage. Slop uses that machinery as camouflage. It answers "Is this correct?" with yes. It cannot answer "Why is this here?"

Seen this way, slop has a recognizable set of traits wherever it appears:

- **Accretive.** Adding is cheaper than removing.
- **Uncurated.** Nobody does the deletion pass.
- **Locally plausible.** Each piece can justify itself.
- **Globally incoherent.** The pieces do not justify themselves as a system.
- **Redundant.** Several components do roughly the same conceptual job.
- **Weakly connected.** The material refers to the domain without taking part in how it works.
- **Unverified.** Being included stands in for being examined.
- **Resistant to selection.** Leaving it in carries little penalty.

The real opposite of slop is not "human-made." It is *selected* structure: material whose presence has been tested against the purpose of the whole and has survived that test. Selected does not mean minimal. A system stripped down to only what is load-bearing today has no room to become anything else tomorrow, and I will come back to that danger. The difference between slack and slop is not how much spare material a system holds. It is whether anyone chose to hold it.

## III. A Tour of the Workhouse

Once you define slop by structure rather than by source, you find it everywhere.

**Code slop** is the most familiar case. It means abstractions with one implementation and no prospect of a second, wrappers around wrappers, compatibility paths for platforms nobody has used in ten years, helper functions that duplicate other helper functions, and generated scaffolding nobody fully understands. None of it is necessarily broken. That is the problem. A useless thirty-line function that breaks the build gets deleted within the hour. A useless thirty-line function that breaks nothing can survive for twelve years.

**Academic slop** is citations that show topical closeness rather than intellectual dependence. It is the sediment of literature reviews, building up because deleting a citation is riskier for a career than adding one: a reviewer might expect it, an author might notice it is missing. It is abstractions that mention a field without modeling it. It is also *semantic slop*, the gradual growth of machinery around ideas. Someone draws a useful distinction. Someone else names three subtypes. A third paper adds exceptions, a fourth proposes a taxonomy, the terminology splits, a survey reconciles the taxonomies, and twenty papers become required citations. No step was wrong. But eventually learning the vocabulary costs more than rediscovering the fact underneath it. The idea's compression ratio has gotten worse.

**Web slop** is pages padded with repeated explanations, boilerplate introductions, SEO paragraphs, and decorative sections that exist mainly because every competing page has them. The cost of one more paragraph is close to zero, and so is the incentive to remove one.

**Law slop** is clauses copied from contract to contract because nobody wants to find out why some lawyer in 1987 put them there. Dickens knew this one well. In *Bleak House*, the Chancery suit of Jarndyce and Jarndyce has gone on so long that nobody alive understands it. It has outlived its original parties and taken on a life of its own, and it finally ends when legal costs have consumed the entire estate it was meant to divide. The suit does not end because it was resolved. It ends because there is nothing left to feed it.

**Bureaucratic slop** is procedure whose original reason has disappeared, while removing it now needs more justification than keeping it. Dickens has a name for this too: the Circumlocution Office in *Little Dorrit*, a government department whose whole skill is "HOW NOT TO DO IT." What makes the Circumlocution Office frightening is not that its staff are villains. Every form has a precedent and every delay has a procedure. The machine works perfectly well at producing nothing.

**Genomic slop** may be the deepest example. This is not "junk DNA" in the old, overconfident sense, since much of what was once written off turned out to have regulatory or structural roles. It is the broader fact that genomes are records of historical accumulation: duplicated genes, disabled remnants, parasitic sequences, ancient viral insertions, redundant regulatory machinery. Evolution never does a clean refactor. If something is not costly enough for selection to remove, it can stay for millions of years. Something being present does not mean it is needed now.

That example sharpens the definition:

> **Slop is accumulated structure whose cost of retention is lower than the cost of evaluating and removing it.**

The mechanism is the same across very different systems. In genomes, selection against useless baggage is weak. In codebases, deleting mysterious code is riskier than leaving it. In law, repeal takes work and carries political risk. In academia, removing a citation gains you little and adding one protects you. On the web, more pages cost nearly nothing. In bureaucracy, ending a process means someone has to take responsibility for ending it. And with AI, generation became radically cheaper while review and deletion did not.

A word stretched this far invites a fair objection. A concept that covers junk DNA, Victorian courts, legacy code, and spam might be covering nothing at all, and it might blunt the specific harm of AI slop: synthetic material flooding the channels where human attention is spent. Worse, "slop" could become a polite insult for *anything whose purpose I personally do not understand*, especially in systems that serve many purposes at once and have no single "whole" to measure against. So the word needs a discipline. Calling something slop is a claim, and it can be wrong. It says that this component, judged against a purpose someone can actually state, would not survive serious review. If you cannot state the purpose, you have not found slop. You have found your own ignorance, which is a different problem and calls for a different remedy. Used this way, the broad sense does not dilute the narrow one. It explains it. AI slop is the most extreme case of a general mechanism, and it is extreme precisely because it pushes that mechanism to industrial speed.

## IV. The Burden of Proof

All these systems share a structural asymmetry, and I suspect it is the root of the whole phenomenon. It concerns the burden of proof.

To *add* something, the question is: *"Could this possibly be useful?"*

To *remove* something, the question is: *"Can you prove nothing depends on this?"*

These thresholds are wildly different. The first is met by almost anything. The second is met by almost nothing. Once an object is inside an established system, uncertainty favors keeping it.

Nobody has to believe Clause 87 is useful. They only have to be unsure whether removing it will cause trouble. The same pattern repeats everywhere:

- *"Why is this dependency here?"* "No idea. Better leave it."
- *"Why cite this paper?"* "It's related, and a reviewer might expect it."
- *"Why do we still fill out this form?"* Nobody knows who is allowed to stop.
- *"Does this repeated sequence do anything?"* Not enough harm for selection to bother with.

The blame is just as lopsided. Whoever deletes a component that turns out to matter owns the outage personally. Whoever leaves a useless component in place shares its cost with everyone, thinly, forever. A rational person facing those odds keeps things.

The accounting is simple. The mass of an artifact changes by the amount generated minus the amount deleted. Put in economic terms, the marginal cost of generating something and the marginal cost of keeping it are both close to zero, while the marginal cost of evaluating and deleting it is high: *MC*<sub>generate</sub> ≈ 0, *MC*<sub>retain</sub> ≈ 0, both far below *MC*<sub>delete</sub>. When those are the prices, the balance moves in one direction. Slop works like a ratchet. Each click forward is cheap. Each click back needs an investigation.

I want to be fair to the ratchet, because it is not mere cowardice. G. K. Chesterton described a reformer who finds a fence across a road and wants it gone because he sees no use for it; the wiser reformer says to go and find out why it was put there first. In tightly coupled systems that advice is often correct. The two kinds of error are not symmetric. Keeping a useless component is a slow, chronic cost. Deleting a silent, load-bearing one, such as a compliance rule nobody remembers or the wrapper an old hospital database quietly depends on, can be sudden and catastrophic, the institutional version of an immune system attacking the body it protects. Caution about deletion is often sound risk management. The trouble is that the same caution, applied to a system whose inflow has become nearly free, guarantees that the system fills. Chesterton's fence made sense when fences were expensive to build. It makes less sense when a machine can put up a thousand of them before lunch, none with a reason anyone could go and find.

This also explains why slop is not the same as technical debt, even though the two often appear together. Consider a rough grid:

| | **Elegant / cheap** | **Ugly / costly** |
|---|---|---|
| **Necessary** | structure | debt, perhaps |
| **Unnecessary** | **slop** | obvious garbage |

Debt is a known compromise with a future cost, and it gets noticed because it hurts. Garbage that costs something gets noticed and removed. Slop sits in the quadrant where ordinary optimization barely pushes at all: unnecessary, but cheap enough to ignore. Harmlessness is its camouflage. It survives not because anyone defends it but because nobody has a reason to attack it.

## V. The Orphans

There is a better word for the condition I am describing than "low quality," and Dickens supplies it. The word is *orphan*.

"Bullshit," in the philosophical sense, means something produced with indifference to truth. "Garbage" means something demonstrably bad. Neither describes most slop. Most slop is perfectly legitimate material that has been separated from its reason for existing. It is not wicked. It is unclaimed.

The distinctions are worth stating:

- **Garbage** is demonstrably bad.
- **Bullshit** is produced without real concern for truth or substance.
- **Debt** is a known compromise carrying a future cost.
- **Cruft** is aged material left over from earlier use.
- **An orphan** is a single thing disconnected from its reason for being.
- **Slop** is the aggregate condition created by many orphans.

So the definition can be refined once more:

> **Slop is orphaned structure accumulating in a system faster than the system can evaluate, integrate, or remove it.**

The metaphor goes further than it first seems. Think about how Oliver's workhouse treats its orphans. It does not hate them. It warehouses them. It keeps them because nobody claims them, and it cannot turn them out because nobody has the authority. The parish feeds them at the lowest cost it can manage. Their existence is administered, not understood.

That describes the unexplained module, the inherited clause, and the vestigial form. The system does not keep them because they are valued. It keeps them because no one with standing has come forward to say why they belong, and no one with standing will say they don't. Mr. Bumble, the beadle, is a maintainer, not a parent. His job is to keep the institution running, not to know where each inmate came from.

Then there is the matter of names. Early in the novel, Bumble boasts that he names the parish foundlings himself, in alphabetical order. The last was Swubble. This one is Twist. The next will be Unwin, then Vilkins. Oliver's name comes from procedure, not from a parent. It is a label produced by a system, attached to something whose origin nobody knows. Anyone who has opened a generated codebase full of `helperUtil2`, `processDataWrapper`, and `handleResponseInternal` will recognize the method.

This leads to what I think is the sharpest distinction between **slop and cruft**. Cruft is orphaned by time. The parent was real: an engineer who knew why the workaround existed, a lawyer who knew which case prompted the clause. Then the parent died, retired, changed jobs, or forgot. Cruft is old by definition. It records knowledge that was lost.

Slop includes cruft, but it also includes something cruft does not: **foundlings**. These are things orphaned at birth, which arrive in the system without any parent who knew why they were there. This is what is truly new about generative AI. A model can produce a thousand lines of plausible code, or ten pages of plausible prose, and at no point does anyone hold a reason for each line. The material is not orphaned by time. It is born on the workhouse steps. The author does not know why the paragraph is there, because in the relevant sense there is no author. There is only a process that makes locally plausible material and a person who accepted it.

The distinction shows up in every field that has a word for the missing parent. In 1985 the computer scientist Peter Naur argued that programming is really *theory building*: the true product of programming is not the code but the theory of the problem held in the programmers' heads, and a program whose theory has died is already decaying, however well it runs. Cruft is a program whose theory has died. A foundling is a program whose theory was never built. In law, a foundling is a clause or a public comment produced without anyone's intent behind it, with no client-specific reason and no drafter who could say what case it was meant to cover. Biology has had the distinction for a long time. A pseudogene is cruft: a once-working gene, disabled by mutation, still sitting where its functional ancestor sat. A transposable element or an endogenous retrovirus is closer to a foundling: a sequence copied into the genome by a mechanical process that inserts material without regard to whether the host needs it.

Orphanhood is also not always literal uselessness. Something can become slop because its *connection* is no longer maintained. A paper may be excellent and still be an orphan in the literature that cites it, linked by a shared keyword rather than a real dependency, with nobody maintaining the stronger relationship the citation claims. The paper is fine. Its place in the structure has lost its justification.

One caution before the metaphor runs away with me. Orphans are children, and the workhouse's real crime was treating them as overhead. If I am not careful, the argument slides from the inmates to the gruel and ends up sitting at the parish board's table, nodding along as the gentlemen in the white waistcoats calculate how little they can spend on each boy. The point of the image is not that unclaimed things are worthless. It is the opposite. The workhouse never asked who the children were. Slop is what accumulates when a system administers its contents instead of understanding them, and the cure Dickens offers is never the cheaper ladle. It is the person who finally asks.

The organic image matters too. Slop is not a landfill dumped onto a healthy organism from outside. It is overgrowth, remnants, vestiges, duplicates, abandoned branches, scar tissue, and hitchhikers, nearly all produced by normal processes. That leads to the most important point the "AI garbage" framing misses:

> **Slop is endogenous.**

Old systems produce their own slop without any help. AI speeds up production enormously, but the workhouse was full long before the machines arrived.

## VI. The Self-Protecting Workhouse

If slop only added up linearly, it would be a nuisance. It is worse than that, because slop creates niches for more slop.

One redundant abstraction needs documentation. The documentation needs machinery to keep it in sync. That machinery gets wrappers. The wrappers create compatibility requirements. Each layer exists only because the previous one does, and each makes the previous one harder to remove. Every accretion creates interfaces, and every interface creates pressure to preserve what sits behind it. Slop can be autocatalytic: the more there is, the faster it grows.

There is a second, quieter dynamic. As a system fills, the cost of finding out whether any given part is necessary keeps rising. Each component's justification depends on others, and those depend on still others. To clean the system you would have to reconstruct why thousands of things exist, and that reconstruction can cost more than building the system from scratch.

At that point the system is epistemically trapped. **The slop protects itself.** Not by any intent, but because the cost of evaluating it now exceeds any plausible benefit of removing it. This is dependency hell, the ancient bureaucracy, the mature legal code, the enterprise monolith nobody dares touch. It is also Jarndyce and Jarndyce: a structure that keeps going because the effort of understanding it has grown past anyone's ability to pay, until it runs out of things to consume.

## VII. Growth Without Death

In biology, healthy development is not just a matter of making cells. It depends just as much on removing them in an orderly way. The process is called *apoptosis*, programmed cell death. A developing hand has fingers because the cells between them die on schedule. When that pruning fails, the hand does not grow a tumor. It keeps its webbing. The fingers stay joined by tissue that was only ever meant to be scaffolding.

That is the most exact image I know for slop:

> **Slop is growth without apoptosis.**

Not malignancy, which is a different and more violent failure, but retained scaffolding: material that was useful during construction, or never useful at all, still attached because nothing told it to leave. Biology has finer tools than apoptosis, too. Cells practice *autophagy*, digesting their own worn-out parts and recycling the material. The developing brain overproduces connections and then prunes the ones that go unused, so that what survives is what gets exercised. Neither process waits for proof that a part is useless. Both act on the absence of evidence that it is being used.

Healthy complex systems do more than produce. They continuously prune, kill, merge, specialize, and reorganize. Software has refactoring. Science has replication, rejection, and retraction. Organizations are supposed to retire procedures. Languages lose words and distinctions as well as gaining them. Growth alone was never what made a system healthy. Health comes from three things together: *generation, selection, and pruning.*

But biology also warns against the opposite fantasy. The genome's spare parts are not only baggage. Duplicated genes, stray sequences, and the remains of ancient viruses are the raw material of *exaptation*, the co-opting of old structures for new jobs. Some of the machinery that builds the mammalian placenta descends from a viral gene. A genome that had deleted everything not needed at the time would have deleted its own future. Systems need slack: redundancy, drift, and room for things whose use has not been discovered yet. The same holds for institutions, where a little apparent excess often works as scaffolding for newcomers who are still learning how things fit together. A system pruned to perfect compression is brittle, beautifully fitted to the present and helpless when the present changes.

So the failure is not that a system holds spare material. It is that the spare material holds the system. When generative capacity outruns selective and apoptotic capacity for long enough, slop is what you get. You get dependency hell, thousand-page legislation, SEO farms, and literature reviews that cite the paper you just finished reading for reasons nobody can name.

## VIII. The Industrial Workhouse

Now we can say plainly what AI changed, and what it did not.

AI did not invent slop. Slop is the product of an old and almost universal asymmetry: creation is cheap, persistence is cheap, and deletion needs evidence. That asymmetry shaped genomes, legal codes, codebases, and academic literatures long before anyone trained a transformer.

What AI did was move one side of the ledger by orders of magnitude. The cost of generation collapsed. Plausible code, prose, images, and citations can now be produced in quantity, almost for free. The cost of selection did not collapse. Deciding whether a function belongs, whether a paragraph earns its place, or whether a citation is a real dependency still takes someone holding the purpose of the whole in mind and judging each part against it. That work is slow, costly, and unglamorous, and so far we have pointed our new tools almost entirely at the other side of the ledger.

So the historical significance of AI is not that it writes badly. Often it writes well enough to pass local review, which is exactly why its output so easily becomes slop. Its significance is this:

> **AI industrialized accretion faster than we industrialized pruning.**

The workhouse has gained a factory wing. It turns out foundlings by the thousand, each neatly labeled, each locally plausible, none with a parent. The beadles are the same beadles they always were, and there are no more of them.

This also explains why "AI-generated garbage" never felt like a satisfying definition. The real complaint was never only that the material was bad. It was that the material was *unclaimed*: present without reason, added without selection, kept by default. That failure is far more interesting, and far more widespread, than bad writing. It is a failure of selection, not of generation.

## IX. Please, Sir, May I Have Less?

Return to the dining hall.

Oliver's request was scandalous because the workhouse was built on scarcity. The board was so outraged that it offered five pounds to anyone who would take the boy away. Asking for more was a challenge to the institution's founding logic.

Our institutions run on the opposite logic. Every system we build asks for more and is given it. More features, more dependencies, more paragraphs, more citations, more clauses, more procedures, more generated output. The request comes from all sides, and it is almost never refused, because refusing requires proof and accepting requires only that something might help. Nobody gets marched to the beadle for adding a helper function. Nobody is offered for apprenticeship for citing one more paper.

The request that now meets resistance is the reverse: *Please, sir, may I have less?* May I delete this module? May I repeal this clause? May I cut this section, retire this form, drop this citation? That is where the institution pushes back with the full weight of the burden of proof. *Can you show nothing depends on it? Can you take responsibility if something breaks? Who authorized you to decide?*

The real answer to slop is not refusing to generate. Generation is how systems grow, adapt, and discover things. The answer is to restore the other half of the cycle: to make selection and pruning as normal, as funded, and as respected as production. And here there is an uncomfortable fact to face. A problem that has been industrialized will not be solved by craftsmanship alone. If the factory wing turns out foundlings by the thousand, then a few conscientious beadles asking "why is this here?" one item at a time will lose. Appeals to Mr. Bumble's better nature have never reformed a workhouse. What changes institutions is changing what addition and subtraction cost.

The first change is to stop treating foundlings and cruft alike, because they deserve opposite defaults. Foundlings should meet friction at the door. Nothing generated should enter a codebase, a contract, or a bibliography until a named person has adopted it, attesting not merely that it works but that the whole needs it. Call it explain-to-merge. In scholarship, a modest version would be typed citations, where an author marks whether a reference is a methodological dependency or historical context, which makes padding visible at a glance. Cruft deserves the opposite courtesy. Inherited human structure that still works and costs almost nothing to keep should usually be left alone; Chesterton's fence still stands for fences someone once had a reason to build. The cost of investigating it is worth paying when it actively slows the work, threatens security, or makes the system hard to understand, and not before.

The second change is to flip the burden of proof where we can, and here biology has already worked out the design. Developing neurons do not survive by default. They survive by receiving trophic factors, chemical signals from the tissue they connect to, and without that support they die. Institutions can borrow the principle. Feature flags, forms, policies, and regulatory provisions can be given sunset dates, so that doing nothing ends them and keeping them requires someone to come forward and renew the lease. For legacy components with no owner, we can quarantine before we delete: brown out the endpoint for a day, archive the wiki page, suspend the report, while keeping everything easy to restore. Engineers call this a scream test. If nothing downstream screams, the component goes. If something does, you have found its parent.

The third change is to put prices on growth. Some governments have already tried it. Britain ran "one-in, one-out" and then "one-in, two-out" rules for business regulation in the 2010s, and a 2017 American executive order required two regulations to be removed for every new one. Whatever one thinks of their politics, the mechanism is the point: scarcity forces selection. The same logic shows up as word limits on court filings, citation caps in journals, and complexity budgets in software. And subtraction has to be rewarded as well as permitted. A net-negative diff, a merged taxonomy, a repealed workflow should count in a performance review or a tenure case as much as something new. People who delete in good faith, after due diligence and a scream test, should be protected when an undocumented edge case breaks. Until removing things carries less personal risk than leaving them, nobody will remove anything.

The fourth change is the one the industrial workhouse makes possible. The same machines that lowered the cost of generation can lower the cost of evaluation, and that is where much of their budget belongs. Runtime telemetry can tell us which code paths actually run and which documents anyone ever opens. Language models can trace dependencies, summarize why a clause was added, flag circular legal definitions, and find the three forms that collect the same information. None of this replaces judgment, but it makes judgment affordable. It is how the ratchet finally turns backward: not by raising the cost of adding things, but by bringing down the cost of finding out what we can safely let go.

Finally, leave room for the genome's lesson. Every healthy system needs regions where generation runs ahead of pruning: sandboxes, experimental branches, exploratory workshops, the institutional equivalent of non-coding DNA, where things are allowed to exist before anyone knows what they are for. That is where exaptation happens. What matters is the checkpoint at the boundary. Anything may live in the sandbox. Nothing crosses into the load-bearing core without a parent.

Most of all, it means remembering what the cure for an orphan has always been. It is not a bigger workhouse, a more efficient beadle, or a better alphabetical naming scheme. It is adoption: someone stepping forward to say *this one is mine, I know why it is here, and I will answer for it.* Every component a system keeps should have someone who could explain why it belongs. A module, a clause, or a form that cannot find such a person, after an honest search, should be allowed to go.

Oliver, of course, was more than he appeared. He turned out to have a history, a family, and a name that mattered. Had the board simply turned him out, the heir would have been lost with the gruel. Some of what fills our systems will be the same: orphans that, once traced, turn out to be load-bearing. That is exactly why the work of tracing matters, and why it must be done with the care Dickens demanded of the parish and never got. Some orphans are heirs and some are only gruel, and the only way to tell them apart is to ask why each thing is here, and to build institutions and tools that can afford to ask it at the scale we now produce.

We already know how to ask for more. The skill we need to recover is asking for less.
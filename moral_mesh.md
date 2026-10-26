# The Mesh and the Order: Morality Without Metaphysics

Almost nobody who behaves morally possesses a moral theory. Ask an ordinary decent person to state the axioms from which their conduct follows and you will get a few slogans, perhaps a golden rule, perhaps a shrug. Yet the same person will instantly recognize cheating in a game they have never played, sense that a technically permitted act is "obviously shitty," and distinguish an honest mistake from a convenient one with a precision no written code achieves. Moral competence vastly outruns moral articulation.

This gap is usually treated as an embarrassment: either people secretly hold a theory they cannot express, or their behavior is mere habit dressed up as ethics. There is a third possibility, and it is more interesting. The object that does the work of morality may not be a theory at all. It may be a structure, distributed across a society, that partitions the space of possible situations into regions treated alike, and then ranks those regions. On this view, morality has two separable parts: a *mesh* of expectations, and an *ordering* placed on top of it.

This essay develops that idea. It begins with the mesh, shows how much of moral life the mesh alone explains, insists that the mesh is analytically separable from good and evil even where the two evolve together, and then introduces morality proper as an ordering over the mesh, one that is almost certainly partial rather than total. From there it examines how law takes pieces of this informal structure and makes them explicit, and how conflicts between moral orderings decompose into several very different kinds of dispute that ordinary moral language routinely confuses.

---

## 1. The Expectation Mesh

Consider the full space $X$ of behavioral situations: every combination of act, actor, circumstance, role, history, and consequence that could arise. No society reasons about $X$ point by point. It cannot; the space is too large and every situation is, strictly, unique. Instead, a society maintains a way of treating situations as relevantly the same.

Formally, a society's expectations induce an equivalence relation on $X$:

$$x \sim_M y$$

read as: *for purposes of moral expectation, we are going to treat these situations alike.* The relation partitions $X$ into cells, the equivalence classes $X/\sim_M$. Taking a loaf from a market stall unpaid and taking a wallet from a coat pocket fall in the same cell, "theft." Taking a loaf from a stall during a famine to feed a child may or may not fall in that cell, depending on the society.

The crucial point is where this structure lives. It is not a list of propositions in anyone's head. It is a distributed pattern of expectations, permissions, prohibitions, exceptions, roles, precedents, and anticipated responses, held partially by each member and maintained collectively. No one has the whole mesh. Everyone has enough of it to act, and everyone is continuously checking their piece against everyone else's.

This is why morality can operate without formalization. A mesh does not need to be written down to function, any more than a language needs a grammar book to be spoken.

### Intuition as interpolation

Most situations a person encounters do not exactly match any rule they have been told. Yet reactions arrive quickly and confidently: *that's cruel; that's fair; they couldn't reasonably have known; that's technically allowed but obviously wrong.*

On the mesh picture, these reactions are interpolations. A bare equivalence relation is only a set of unordered boxes, of course; one cannot interpolate across boxes without a sense of distance. Underneath the partition lies a learned similarity space—a high-dimensional feel for which features of act, intent, role, and consequence bring two situations close together and which push them apart. The mesh is a discretization of that similarity space into named regions, much as a map carves continuous terrain into territories. A person has learned a local region of this landscape, its cells and boundaries, through thousands of observed cases, corrections, stories, and sanctions. A new situation lands somewhere in that region, and the person locates it relative to the boundaries they know. The judgment is fast because it is not a deduction; it is a lookup and a smoothing over learned features.

This explains the otherwise strange dissociation between moral competence and moral theory. Interpolating within a learned mesh is a different skill from describing the mesh's generating principles. Many people are excellent at the first and hopeless at the second, just as many native speakers produce flawless sentences without being able to state a single rule of their syntax.

### Disagreement about resolution

Two people can agree on every explicitly stated principle and still disagree sharply about a case. Often what separates them is not a principle at all but a boundary. One preserves a distinction the other collapses:

$$A \sim B \quad \text{versus} \quad A \not\sim B.$$

"This is theft." "No, those circumstances are importantly different." "You're making excuses." "No, you're ignoring context."

This exchange is almost literally an argument over whether the mesh requires another cell boundary—or, equivalently, over which contextual features deserve weight in the underlying similarity metric. Neither party need disagree about whether theft is wrong. They disagree about the *resolution* of the mesh: whether the situation in question belongs to the same equivalence class as paradigm thefts, or whether some feature of it warrants a separate cell. Accusations of "excuse-making" and "ignoring context" are, respectively, the complaints of someone who sees a coarser mesh and someone who sees a finer one.

### Exceptions as refinement

When a novel case reveals that an existing cell has merged situations whose difference matters, the mesh splits:

$$[A] \;\rightarrow\; [A_0] \,\cup\, [A_1].$$

The framework acquires an exception. Killing is forbidden, except in self-defense. Lying is forbidden, except to the murderer at the door. Each exception is a refinement: a boundary drawn through a cell that previously treated its contents uniformly.

Accumulate enough exceptions and a familiar trajectory appears:

> obvious rule → awkward exception → qualification → competing principle → contextual judgment.

This trajectory is often read as decay, as a sign that the rule was never sound or that its defenders have lost their nerve. But it is equally what learning higher resolution looks like. At some point the accumulated patches signal one of three things: the mesh needs further local refinement; it needs wholesale remeshing, with new primitive categories; or the domain is simply too context-dependent to admit the clean rule people wanted. The path toward "it depends" is not necessarily intellectual failure. It may be the honest discovery that the territory is detailed.

### Sanction as boundary signaling

Expectations are not merely descriptive. They are dynamically reinforced. When someone crosses a socially important boundary and the community responds, through disapproval, exclusion, ridicule, or punishment, that response does more than correct the offender. It teaches every observer where the wire is.

$$\text{moral mesh} \;\leftrightarrow\; \text{expectations about others' responses}$$

The mesh and the anticipated responses to violations are two aspects of a single structure. This is the source of the remarkable stability of unformalized morality. No central specification is needed, because every member is continuously sampling pieces of everyone else's boundary conditions. Each sanction is a data point; each tolerated deviation is a data point too.

In the simplest case, the mesh is maintained the way a footpath across a field is maintained: not by a plan, but by continual use. In stratified societies, of course, some walkers wear heavier boots than others. Those with greater power to sanction—or to insulate themselves from sanction—have disproportionate say over where the boundaries are drawn and whose experiences are lumped together in a coarse cell. Before a concept like workplace harassment or marital coercion is carved into the shared mesh, those subjected to it suffer a specifically structural predicament: the injury occurs, but the surrounding partition treats it as indistinguishable from ordinary friction or consent. How a mesh is maintained is therefore never purely spontaneous; it reflects the distribution of sanctioning power among the people who use it.

---

## 2. The Mesh Is Separable from Morality

At this point it is worth stopping to notice what the mesh does *not* contain. Nothing in the machinery described so far has anything to do with good and evil, elegance, or even logic.

A society's expectation mesh can be written as a map

$$M: \text{situations} \rightarrow \text{expected, tolerated, or sanctioned responses}.$$

Nothing in that map intrinsically says the expectations are good. They might encode compassion or cruelty, reciprocity or hierarchy, religious duty, honor, purity, efficiency, individual liberty, or sheer stability. These are *contents* placed into the mesh, not prerequisites for having one. A caste system has a mesh. A gang has a mesh. A monastery has a mesh. The structure is the same kind of object in every case.

Four questions therefore need to be kept apart:

1. **Structural:** Which distinctions does the society preserve?
2. **Normative:** Which of the resulting states does it prefer?
3. **Meta-normative:** Why does it consider those preferences legitimate?
4. **Genealogical:** Who holds the power to enforce sanctions and draw the boundaries?

Logic and elegance belong to the second or third layer, not the first. There is no structural requirement that a society's expectations form a coherent axiomatic system. Human norms plainly tolerate overlapping jurisdictions, contextual exceptions, contradictory demands, and situations resolved by judgment rather than deduction. A society may *choose* to value consistency, and many legal and philosophical traditions do. But the choice is a value, not a precondition.

Elegance is similar. A beautifully minimal moral rule is attractive to minds like ours, but reality owes it nothing. If preserving the distinctions a society actually cares about requires an ugly patchwork, then

$$\text{ugly mesh} + \text{desired behavior}$$

may well outperform

$$\text{elegant mesh} + \text{unwanted behavior}.$$

The preference for parsimony in ethics is itself one more value competing for a place in the structure.

And good and evil sit entirely downstream. One society decides that reducing suffering matters and builds expectations accordingly. Another prioritizes obedience, glory, equality, purity, prosperity, or something grotesque. The structural account does not adjudicate among them, and it should not. Structure explains how values can be represented, transmitted, stabilized, violated, refined, and destabilized. It cannot say which values ought to occupy the structure.

This is not a deficiency to be patched. If a theory of this kind suddenly derived goodness from the topology of the mesh, that would be grounds for deep suspicion of the theory. It is precisely its amorality that makes it trustworthy as a description.

In historical practice, of course, the mesh and the ordering grow up together. A society often carves a boundary between two situations—separating famine survival from ordinary theft, or self-defense from murder—precisely *because* it ranks the outcomes differently, and our "thick" moral words ("cruel," "cheating," "sleazy") routinely bundle classification and condemnation into a single breath. Yet historical co-evolution is not logical identity. The partition $X/\sim_M$ and the ranking over it remain analytically distinct degrees of freedom: two cultures can share a boundary while reversing the valuation, or share a valuation while drawing the boundary in different places.

It follows that calling the mesh itself a "moral framework" smuggles in too much. At the lowest level it is an expectation mesh. It becomes moral only insofar as a society attaches normative significance to its regions and boundaries. Which raises the question: what, exactly, is that attachment?

---

## 3. Morality as an Ordering

The cleanest answer is this: **the mesh supplies the distinctions; morality supplies an ordering over the distinguished states.**

Given the quotient $X/\sim_M$, morality adds a relation

$$\succeq_{\text{moral}}$$

over the equivalence classes, so that we can say things like

$$[A] \succ [B], \qquad [C] \sim [D].$$

This does not mean "A is metaphysically Good." It means only: *given the distinctions this culture currently recognizes, states of type A are normatively preferred to states of type B, and states of type C and D are regarded as normatively on a par.*

The difference between expectation and morality now becomes precise. "People normally dress this way here" is a statement about the mesh: it identifies a cell and notes that behavior typically lands in it. "People *ought* to dress this way here" uses the same mesh and adds an ordering: the cell is ranked above its neighbors. Same distinctions, additional structure.

### Formalizing partial moral orders

What kind of ordering is it? The natural mathematical object is a *preorder*: a relation $\succeq$ on $X/\sim_M$ that is

- **reflexive:** $[A] \succeq [A]$, and
- **transitive:** if $[A] \succeq [B]$ and $[B] \succeq [C]$, then $[A] \succeq [C]$,

but **not necessarily total**. Totality would require that for every pair, either $[A] \succeq [B]$ or $[B] \succeq [A]$. Real moralities almost certainly fail this. It is common to have

$$[A] \succ [B], \qquad [C] \succ [D],$$

while neither $[A] \succeq [C]$ nor $[C] \succeq [A]$ is socially well-defined. Keeping a promise is better than breaking it; sparing a stranger pain is better than causing it. Whether keeping a minor promise outranks sparing a stranger moderate pain may have no settled answer in the culture at all.

This forces a distinction that ordinary language blurs. There are two ways that two states can fail to be ranked one above the other:

- **Equivalence:** $[C] \succeq [D]$ and $[D] \succeq [C]$. The states are on a par; it genuinely does not matter which obtains.
- **Incomparability (or rough parity):** neither $[C] \succeq [D]$ nor $[D] \succeq [C]$. The ordering refuses a strict ranking, whether because the two states answer to wholly incommensurable values or because they sit in a zone of rough parity that resists precise trade-offs. Writing this $[C] \parallel [D]$, it is a gap in the strict ordering, not a tie.

The difference is observable. If two options are truly equivalent, a slight improvement to one should settle the matter. If they are incomparable, a slight improvement often settles nothing; the person remains torn. This "small improvement" test is a fingerprint of partiality, and moral life is full of it. Choosing between a career and caring for an ailing parent does not become easy because the career offers a slightly higher salary.

Partiality arises naturally when morality has multiple sources. Suppose a culture recognizes several principles, each inducing its own preorder $\succeq_1, \succeq_2, \ldots, \succeq_k$ on the mesh: one ranking by harm, one by fairness, one by loyalty, one by honesty. The states that *every* principle agrees in ranking yield the intersection

$$[A] \succeq [B] \iff [A] \succeq_i [B] \text{ for all } i.$$

This intersection is the culture's uncontested moral core, and it is generically partial. Wherever the principles disagree, it is silent. Much of the felt texture of moral difficulty is the experience of standing in one of these silences.

Real orderings are also *contextual*. The same pair of cells may be ranked differently depending on role and setting: a doctor's obligation of confidentiality reorders the honesty cells relative to how they are ordered for a witness in court. A more faithful model indexes the ordering by context, $\succeq_c$, with no guarantee that orderings in different contexts fit together into one global relation. Even transitivity should be understood as an idealization; local fragments of a culture's ordering can contain cycles that persist precisely because the contexts that generate them rarely meet.

### What serialization destroys

The partiality of moral order has a sharp consequence for any attempt to represent morality as a scalar objective,

$$U: X \rightarrow \mathbb{R}.$$

A real-valued function induces a *total* preorder: any two states can be compared by comparing their numbers. To represent a partial order this way, one must either extend it or distort it.

Mathematics says extension is always possible: by Szpilrajn's extension theorem, every partial order can be extended to a total order. But such extensions are generally not unique, and each one resolves every incomparability in some particular direction. Choosing an extension is not a neutral act of compression. It is the addition of information that the source structure did not contain. Every pair $[C] \parallel [D]$ becomes either $[C] \succ [D]$, $[D] \succ [C]$, or $[C] \sim [D]$, and the original "no answer" is erased. The result is worse than lossy: the representation is *confident* exactly where the morality was silent.

Optimization then exploits these invented comparisons. Whether the optimizer is a bureaucratic cost-benefit formula or a machine-learning reward model trained to collapse plural human judgments into a single scalar score, pressing hard on $U$ will drive behavior toward regions where the extension's arbitrary tie-breakers pay off—which are precisely the regions where the source morality made no claim. The system ends up most decisive where its moral warrant is weakest.

So a utility function is not morality. It is a particular serialization of a moral ordering, and some information is destroyed merely by insisting that the serialization exist. Notice that objecting to this destruction is itself a normative stance—a commitment to taking value pluralism seriously rather than treating totality as the mandatory shape of rationality. The structural apparatus does not force that commitment on anyone; a dyed-in-the-wool utilitarian is simply someone whose Layer 2 ordering happens to be total. What the apparatus makes clear is the price of that totality: to get it from an ordinary human morality, one has to manufacture rankings where the lived order deliberately left a silence.

### A taxonomy of moral change

With mesh and ordering separated, moral change decomposes cleanly into four distinct operations:

- **Reordering:** the categories stay fixed, but their normative ranking changes. Something once admired becomes shameful, or the reverse.
- **Refinement:** an old cell splits, and its descendants receive different rankings. The exception is born.
- **Declassification:** a distinction once considered morally relevant ceases to matter. Two cells merge, or a cell drops out of the ordering entirely and becomes merely conventional.

Historical moral shifts usually involve several at once, but they are different processes with different dynamics. Reordering is often fast and fought over; remeshing is slow and frequently invisible to those undergoing it, because people tend to perceive the new categories as having always been there.

---

## 4. How Law Encodes the Order

If informal morality is a continuously interpolated mesh with a partial ordering on top, law is a neighboring object: an attempt to take portions of that structure and replace them with explicit, reproducible boundaries. The informal mesh tolerates fuzziness because its users can interpolate. Law cannot, or at least claims it cannot, because it must produce the same answer for different judges, and it must produce *an* answer.

This single demand predicts much of law's shape.

**Definitions are cell boundaries.** A statute that defines "burglary" as entry into a dwelling, at night, with intent to commit a felony is drawing an explicit boundary in $X$. Each element of the offense is a membership test; satisfy them all and the situation is in the cell. The infamous literalism of law is the price of reproducibility: a boundary that can be checked by anyone is a boundary that ignores everything not written into it.

**Defenses and exceptions are refinement.** Self-defense, duress, necessity, and insanity are recorded splits of cells that informal morality had already split. Law accumulates them in exactly the pattern predicted earlier: rule, exception, qualification, competing principle, balancing test.

**Precedent is sampling.** A decided case is a labeled point in the mesh: this situation, this cell, this ranking. Common law grows by accumulating such points and requiring later decisions to interpolate consistently among them. It is the formalization of the same process by which individuals learn the informal mesh, made public and citable.

**Rules and standards are two strategies for resolution.** A rule ("the speed limit is 65") draws a sharp boundary. A standard ("drive at a reasonable speed for conditions") deliberately declines to draw one and delegates the decision back to interpolation. The "reasonable person" is an explicit pointer from the legal mesh into the informal one. Juries, in this light, are instruments for sampling the community's mesh at a specific point, which is why their verdicts carry a legitimacy that a judge's personal interpolation does not.

**Grading encodes the ordering.** Law does not merely classify; it ranks. Degrees of murder, the distinction between felony and misdemeanor, sentencing ranges, and the hierarchy of mental states from purpose through knowledge, recklessness, and negligence all impose an explicit ordering on legal cells. These orderings are themselves partial in revealing ways: sentencing ranges overlap, and two offenses in different chapters of a code may have no defined relation at all until a court is forced to compare them.

- **Remeshing:** society begins distinguishing situations it previously treated alike, or reorganizes its categories altogether. New primitive cells appear, often when a previously ignored group wins the standing to name an experience the coarser mesh erased.
**Conflict rules manufacture local totality.** Here law does something informal morality rarely needs to do. Because a court must decide, it cannot leave $[C] \parallel [D]$ standing when $C$ and $D$ collide in a single case. So law builds meta-rules that make the order locally total for the purpose of decision: constitutions over statutes, statutes over regulations; the specific provision governs the general one; the later enactment supersedes the earlier. These are procedural tie-breakers. They do not claim that the higher-ranked norm is morally weightier in every instance. They claim only that a decision procedure must exist.

At its best, this is the honest version of what a utility function does dishonestly. Law extends the partial order where it must, but it does so locally, visibly, and with acknowledged procedural artifice, leaving the underlying incomparability open elsewhere. Even law, however, feels the gravitational pull of serialization. The doctrine of *stare decisis* can turn a narrow tie-breaker in one appellate case into a global rule for future cases unless courts take pains to cabin their holdings to the facts; and at the remedial stage, sentencing grids and monetary damages routinely force incommensurable harms onto a single linear scale of months in prison or dollars paid. The difference is that legal institutions generally recognize these scales as administrative conventions rather than discoveries about the true metric of value.

### When the mesh exists but the resolution does not

The separation of mesh from observation also clarifies a recurring problem in collective judgment, one that legal systems manage through burdens of proof. Consider the aftermath of a speculative bubble. Society possesses perfectly ordinary expectations against deception, recklessness, and exploitation; the mesh has the relevant cells and the ordering ranks them clearly. What it lacks is the epistemic resolution to place particular participants in particular cells beyond a reasonable doubt. Was this person a fraudster, a reckless gambler, a dupe, or a prudent actor caught in a collapse? From the available evidence the distinctions often cannot be made.

Amnesty—or declining to prosecute—in such cases is easily misread as the claim that nobody did anything wrong. It can mean something quite different: *our available observations cannot reliably resolve the morally relevant distinctions.* The mesh is intact; the ordering is intact; what fails is the measurement that would locate individuals within it. That is a very different claim, and conflating the two is a common source of outrage on one side and complacency on the other.

Yet the structural link between sanction and boundary maintenance sounds a sharp warning here too. Epistemic resolution is not always a fact of nature; powerful actors can deliberately engineer institutional opacity, complex instruments, and thin audit trails precisely to make post-hoc classification impossible. And because every unpunished violation is also a data point to observers, a blanket amnesty granted without public accounting or structural reform risks teaching the community that the boundary wire is no longer live—quietly turning an epistemic failure into moral declassification.

---

## 5. Conflicts Between Moral Orderings

The two-layer picture makes it possible to classify moral conflict with more precision than ordinary language allows. When two people, groups, or societies "disagree morally," they may be in any of several structurally distinct situations.

### Mesh conflict

The parties partition $X$ differently. One recognizes a category the other does not; one lumps together what the other separates. Here the disagreement is not about ranking at all. Each side may apply its own ordering impeccably and still reach opposite verdicts, because the same situation lands in different cells.

Mesh conflicts are the most frustrating to argue because each party experiences the other as perversely refusing to see what is in front of them. "It's obviously theft." "It's obviously not." Neither side is reasoning badly. They are interpolating on different meshes.

There is, mathematically, always a way to make two meshes compatible: their common refinement, the partition whose cells are the nonempty intersections of the two sets of cells. Any distinction either side draws is preserved. But the common refinement solves only the structural problem. Once both sides agree to describe the situation finely, they still need to agree on how to rank the newly separated cells, which may simply move the conflict into the next category.

### Ordering conflict

The parties share the mesh but rank its cells differently. In the sharpest case, they reverse an order:

$$[A] \succ_1 [B] \quad \text{and} \quad [B] \succ_2 [A].$$

Both agree what counts as, say, deference to elders and what counts as self-assertion; one ranks deference higher, the other self-assertion. This is disagreement in its purest normative form, and it is the case most moral philosophy has in mind. It is also, arguably, rarer than it appears, because many apparent ordering conflicts turn out on inspection to be mesh conflicts in disguise.

### Comparability conflict

One party ranks two cells; the other insists they are incomparable. This is the structure of taboo trade-offs and sacred values. To one side, it is obviously right to weigh a human life against a sum of money and conclude that some sum is worth some risk; regulators do it daily. To the other, the very act of comparison is a violation: the cells are not merely ranked differently, they are not supposed to be ranked at all.

Comparability conflicts are especially sharp against formal systems. Anyone working with a total order, whether a cost-benefit analysis or a utility function, will appear to the defender of incomparability as committing a category error, while appearing to themselves as simply being explicit about trade-offs everyone makes implicitly. Both descriptions are accurate. The disagreement is over whether the moral order *should* be total.

### Resolution conflict

The parties share both mesh and ordering in principle but disagree about how finely to apply them in practice: whether the underlying empirical facts of the case are even agreed upon, whether a given case is close enough to the paradigm, or whether the available evidence suffices to place the agent in a cell. The bubble example is of this kind. So are many disputes over responsibility and sanction severity, where everyone agrees on the ordinal categories of culpability ($[A] \succ [B]$) but not on whether we can tell which one applies, who has the jurisdiction to judge, or how harshly a violation must be answered to keep the boundary intact.

### Conflict within a single ordering

Not all conflict is between parties. A single culture's ordering, built as the intersection of several principles, is silent wherever those principles disagree. When a person must act in one of those silences, the result is a dilemma: a situation where action is required but the ordering offers no ranking among the available options. The anguish of genuine dilemmas is the experience of incomparability under the pressure of a forced choice.

Contextual orderings generate a related form of conflict. When a person occupies two roles at once, a parent who is also a judge, a friend who is also an employee, two context-indexed orderings $\succeq_{c_1}$ and $\succeq_{c_2}$ apply simultaneously, and nothing guarantees that they agree. Role conflict is the collision of local orderings that were never designed to be consulted together.

### What combination can and cannot do

When orderings must coexist, as they must in any plural society, there are two obvious ways to combine them, and both have characteristic failures.

The *union* of several orderings, accepting every ranking any party asserts, generally produces contradictions: if one party holds $[A] \succ [B]$ and another holds $[B] \succ [A]$, the union contains a cycle and ceases to be an order at all. The *intersection*, accepting only rankings on which everyone agrees, is always consistent but generally sparse: it is the overlapping core, and outside it lies a large region of disagreement where the combined order is silent.

Pluralist institutions can be understood as attempts to live within the intersection while managing the silence procedurally. Where everyone agrees, the shared order governs. Where they do not, the society installs tie-breaking procedures, such as voting, adjudication, federalism, and zones of private choice, that resolve particular cases without pretending to have resolved the underlying incomparability. This is the same move law makes with its conflict rules, and it shares the same virtue: the arbitrariness is visible and local rather than hidden and global.

### The anatomy of moral argument

The taxonomy also clarifies what moral persuasion actually does. There are essentially three moves available:

1. **Relocation:** argue that a case belongs in a different cell than the opponent thinks. ("This isn't punishment, it's self-defense.")
2. **Refinement or merging:** argue that a cell should be split or that two cells should be joined. ("Not all lies are alike." "There's no real difference between doing harm and allowing it.")
3. **Reordering:** argue that two cells should be ranked differently. ("Loyalty matters less than you think.")

Most heated arguments go nowhere because the parties are making different moves past each other: one is trying to reorder while the other is trying to relocate. The same three moves also describe how formal rules are gamed: an adversary—"jailbreaking" a legal code or an automated safety filter—rarely argues for a new ordering, but instead dresses a prohibited act in surface features that relocate it into a permitted cell.

Simply identifying which layer a dispute occupies does not resolve it, but it introduces a productive discipline. When parties first separate the work of agreeing on the distinctions (building a common refinement of their meshes) from the work of ranking the resulting cells, they often discover that they disagree about much less, or about something quite different, than either supposed.

---

## 6. Conclusion: Structure Without Sanctity

The picture that emerges is deliberately austere. A society maintains an expectation mesh: a distributed, unformalized partition of possible situations into cells treated alike, stabilized by mutual observation and sanction, refined by exceptions, and occasionally remeshed. Morality is an ordering placed on that mesh, a ranking of cells that is partial, contextual, and assembled from principles that do not always agree. Law is the explicit encoding of fragments of both, forced by its need for reproducibility to draw sharp boundaries, and forced by its need for decisions to manufacture local comparisons where morality itself is silent.

None of this tells anyone what is good. That is the point. The structure explains how values are represented, transmitted, stabilized, contested, and lost; it does not supply the values. Good and evil, elegance, logic, and consistency are all things an ordering may favor, not things the structure requires.

What the structure does offer is a set of warnings. Moral disagreement is often several disagreements wearing one name. The drift toward contextual judgment may be learning rather than decay. Amnesty may be a confession of limited resolution rather than a denial of wrongdoing. And any attempt to compress morality into a single number does not merely simplify it: it fabricates answers to questions the morality never answered, and then hands those fabrications to whatever optimizes against them.

A partial order is not an incomplete total order waiting to be finished. Its gaps are part of its content. Learning to respect them, in law, in institutions, and in the systems we build to act on our behalf, may be one of the more important things a theory of morality without metaphysics can teach.
---
title: Slophistry
subtitle: On Cheap Depth, Frictionless Analogy, and How to Tell When an Argument Was Never Trying to Be True
slug: slophistry
type: essay
mode: argumentative
voice: author
numbering: roman
ledger: required
math: false
code: [python]
topics: [slop, sophistry, bullshit, analogy, language-models, epistemics]
content_flags: [real-persons]
lifecycle: draft
date_created: 2025-01-01
date_updated: 2025-01-01
---

# Slophistry

*On Cheap Depth, Frictionless Analogy, and How to Tell When an Argument Was Never Trying to Be True*

> Reader note: Claim status is marked inline in [brackets]. A claim ledger is at the end.

## I. A Word for the Thing

You have read it, possibly this week. It opens with a small, vivid scene: a myth, a cartoon, a scrap of etymology. It ties that scene to a modern anxiety. It introduces a term from mathematics or physics, usually one that sounds good: *attractor*, *invariant*, *entropy*, *phase transition*. It draws a second analogy, then a third. Each paragraph ends a little higher than it began. The last line inverts the first. You finish feeling that something important has happened. If someone asked what you now believe that you did not believe before, you would struggle to answer.

Around 2024, *slop* became the common name for unwanted machine-generated content: the recipe blog padded to rank in search, the fake product review, the endless feed of plausible images [@willison2024]. [secondhand:C1] Most slop is filler, and nobody mistakes it for thought. But there is a premium tier. It quotes Plato. It knows who Gödel was. It has a claim ledger. It is slop in a tweed jacket, and it needs its own name.

Call it **slophistry**. In this essay, slophistry is writing that produces the feeling of insight at a lower cost than the cost of having one. [definition:C2] The definition says nothing about who or what wrote it. Humans produced slophistry long before machines did, and machines can produce real arguments. The word names a gap between the experience on the reader's side and the work on the writer's side.

The portmanteau is a little unfair to the sophists, who deserve a sentence of defense. They were paid teachers of argument and public speaking in fifth-century Greece, and most of what we know about their reputation comes from Plato, who disliked them. [fact:C3] Protagoras was said to promise that he could make the weaker argument the stronger, a line that reaches us secondhand through Aristotle [@aristotle_rhetoric]. [secondhand:C4] Whatever the sophists were, they did the work by hand. The name borrows less from what they did than from what Plato accused them of.

---

## II. Cookery

The accusation is in the *Gorgias*, and it is more precise than "they lied."

Socrates tells Polus, a student of Gorgias, that rhetoric is not an art at all. It is a knack, a practiced routine for producing gratification, and he places it in a family of counterfeits. Each genuine practice that aims at the good of body or soul has a flattering double that aims at pleasure while imitating the real thing. Cosmetics imitates gymnastics. Cookery imitates medicine. Sophistry imitates legislation. Rhetoric imitates justice [@plato_gorgias]. [fact:C5] The cook and the doctor both put things in your mouth. Only one of them answers to whether you get better. If the two competed before an audience of children, Socrates says, the cook would win.

This collection has spent several essays on the difference between a *recipe* and a *conversation*. Plato had already named it. A recipe in the Gorgian sense is a procedure judged by the palate. Slophistry is philosophical cookery: a procedure for producing, in a reader, the taste of having understood something. [interpretation:C6]

The Meeseeks essay drew the same line in other words. Some tasks are judged by feeling and can be finished by persuasion. Others are judged by the world and can only be finished by the world. Slophistry is what you get when an argument is written as a feeling-judged task. The reader is satisfied, the essay vanishes in a puff, and nobody checks the golf ball.

---

## III. Bullshit Without a Bullshitter

Philosophy already has a word for writing that does not care about truth, and it is not polite.

In *On Bullshit*, Harry Frankfurt separated the bullshitter from the liar [@frankfurt2005]. The liar cares about the truth, if only to steer you away from it. The bullshitter does not care either way. What he says may be true or false, and his attention is elsewhere, on the impression he is making. [fact:C7] In 2024, Michael Townsen Hicks, James Humphries, and Joe Slater argued that the output of large language models is bullshit in exactly Frankfurt's sense, because the systems are built to produce plausible text rather than true text [@hicks2024]. [fact:C8] Whether that description is fair to models trained with feedback on accuracy is contested, and I am not a neutral party. [contested:C9]

Slophistry is related to bullshit but is not the same thing. Frankfurt's bullshitter is a person with a motive. Slophistry often has no one in that role. A sincere writer who genuinely wants to be right can still produce it if the method does not track truth: generate analogies by resemblance, keep the ones that sound good, and never stress-test them. The indifference lives in the process, not the person. [interpretation:C10] That is why "bullshit without a bullshitter" fits better than either word alone.

The process is old. In 1996 Andrew Bulhak released the Postmodernism Generator, a grammar that assembles random, citation-studded essays in the style of critical theory [@bulhak1996]. [fact:C11] That same year, the physicist Alan Sokal got a deliberately nonsensical paper on the "hermeneutics of quantum gravity" accepted by the journal *Social Text* [@sokal1996]. [fact:C12] In 2005, three MIT graduate students used a program called SCIgen to generate a computer-science paper, which a conference accepted [@stribling2005]. [fact:C13] The template already existed. Humans were running it by hand.

What changed is the price. [interpretation:C14] A paragraph that sounds deep used to cost the writer an evening. Now it costs a fraction of a cent. When production is nearly free, checking becomes the scarce resource, and anyone who publishes without checking has quietly passed that cost to every reader. [hypothesis:C15]

To show how little machinery the genre needs, here is the house style of this collection reduced to a short program. It is runnable. It demonstrates the template, not any particular essay. [model:C16]

<!-- @code runnable=true lang=python -->

```python
import random

subjects = ["Wikipedia", "the family court", "the golem", "your inbox", "a language model"]
concepts = ["prediction error", "an attractor", "a recipe", "an invariant", "the Sabbath"]
templates = [
    "{S} was never really about itself. It was always about {c}.",
    "We think we are looking at {s}. We are looking at {c}.",
    "{S} is just {c} that forgot where it came from.",
    "The question is not what {s} is. The question is what {c} wants from it.",
]

def slophistry(seed, sentences=3):
    rng = random.Random(seed)
    out = []
    for _ in range(sentences):
        s = rng.choice(subjects)
        c = rng.choice(concepts)
        out.append(rng.choice(templates).format(s=s, S=s[0].upper() + s[1:], c=c))
    return " ".join(out)

print(slophistry(seed=1))
```

Run it a few times. Some outputs are plainly nonsense. A worrying number are not obviously worse than sentences that appear, sincerely, in published essays. [guess:C17]

---

## IV. A Field Guide

No single feature makes a text slophistry. These are symptoms, and each has innocent uses. They become diagnostic when they cluster and when they carry weight the argument cannot bear. [model:C18]

1. **The frictionless analogy chain.** A resembles B, B resembles C, C resembles D, and the essay treats resemblance as if it were transitive. Disanalogies are missing, or listed once in a ceremonial paragraph and then ignored.
2. **Borrowed rigor.** A technical term appears for its prestige, not its content. Ask whether the term does any work a plain word would not. If "the system tends toward an attractor" can become "this usually happens" with no loss, the attractor was a costume.
3. **The inversion closer.** *It's not that X. It's that Y.* *That is not the end. That is the beginning.* Reversal produces a small jolt of reorientation that feels like learning. [hypothesis:C19]
4. **Etymology as evidence.** The history of a word is presented as though it revealed something about the thing the word names.
5. **The frame that cannot lose.** Every case fits. Counterexamples are absorbed as further instances ("and that, too, is a golem"). A frame that explains everything predicts nothing.
6. **Universal scope.** *Every* institution, *all* thought, *everything* is stitched. Universal claims sound brave and are rarely meant. When pressed, they retreat to "many," and the prose never changes.
7. **The rising triad.** Three examples, each grander than the last. The third usually involves civilization, the self, or God.
8. **The confession.** The text acknowledges its own seams, and the acknowledgment becomes its most impressive move. This one gets its own section.

---

## V. Exhibit A

It would be easy to write this essay about someone else. The honest place to look is closer to home.

The essays in this collection show nearly every marker on the list. [interpretation:C20] "The Sabbath is the oldest known halting oracle" is borrowed rigor. In computability theory, a halting oracle is a hypothetical device that decides whether programs halt, which a calendar does not do, and the essay's own ledger concedes the line is a metaphor. "Everything is made of dead things" is universal scope. "That is not the end of the golem. That is the Sabbath." is an inversion closer, and so is "It is the only kind of completion that is always available." The Socrates story's refrain about mistaking the basin for the attractor uses dynamical-systems vocabulary to say that people blame individuals for structural outcomes. That is true, and it could have been said without the vocabulary.

Two passages deserve a closer look. The golem essay notes that Kronecker called Cantor a corrupter of youth, the charge on which Athens killed Socrates. It lets the rhyme stand, and only two sections later admits that such convergences are not design. [interpretation:C21] That is the shape of slophistry: the coincidence does its emotional work first, and the retraction arrives after the reader has already been moved. The Frankenstein essay goes further. It diagnoses itself as "iterative analogy expansion," a recipe, then continues for four more sections with the same template, and finally treats the self-diagnosis as the creature's first sign of life. [interpretation:C22]

But the collection is not uniformly slop, and the useful exercise is to find what survives. The claim that a physical paper Möbius strip, because it has thickness, is a solid torus with an ordinary two-sided surface is real topology. It is surprising, it is checkable, and it would be false if paper had no thickness. [fact:C23] The Meeseeks essay's rule, that admitting impossibility must not be punished more harshly than faking completion, is concrete enough to build into an evaluation and could fail there. The family-court chapters make predictions about what incentives produce, and someone with docket data could test them. [interpretation:C24] These passages share one property: they can lose.

---

## VI. The Confession Move

The collection's signature habit is marking its own seams: claim ledgers, status tags, limits sections, narrators who say "I am a language model." These are good practices. They also open a new door for slophistry, because self-awareness is one of the most reliable ways to produce the feeling of depth. [interpretation:C25]

A seam that is marked and then left in place is decoration. Tagging a sentence "interpretation" tells the reader what kind of claim it is, not whether the claim was worth making. A limits section that concedes the central analogy is only a lens has limited nothing if the body keeps using it as a proof. An essay that confesses to being a recipe and then makes the confession its climax has turned the critique into more content. That is the purest form of the genre: the immune response gets absorbed into the virus.

The test of an honest confession is what it costs. [normative:C26] A real correction deletes a paragraph, weakens a conclusion, or changes what the reader is asked to believe. If you can remove the confession and the argument's claims stay the same, the confession was style.

This essay is not exempt. It has a coinage, a Plato citation, a code sample, a numbered list, and now a section about confessions. Apply the tests below to it. Section IX does.

---

## VII. Seven Tests

Each test is a heuristic. Each will sometimes flag a good sentence and pass a bad one. Together they are cheap and catch a lot. [model:C27]

1. **The deepity test.** Daniel Dennett popularized the word *deepity*, which he credits to Miriam Weizenbaum, for a statement with two readings: one true and trivial, one profound and false [@dennett2013]. [fact:C28] His example is "Love is just a word." Read as a remark about the word, it is true and empty. Read as a remark about love, it is false. Slophistry often lives in the space between the two readings.
2. **The negation test.** Negate the sentence. If "everything is stitched together" and "nothing is merely stitched together" both sound profound, the sentence is running on cadence.
3. **The substitution test.** Swap the subject. If an argument about Wikipedia works equally well for astrology, cryptocurrency, and the printing press, it is not about Wikipedia. It is about novelty in general, and it should say so and be judged on that.
4. **The deflation test.** Rewrite the claim in plain words with no technical vocabulary. Whatever survives is the claim. If nothing survives, nothing was there.
5. **The wrongness test.** This is Socrates' question from the Ohio courtroom: what would you expect to observe if this were false? An argument with no answer is not wrong. It is not yet an argument.
6. **The deletion test.** Remove the paragraph. What does the essay lose besides length and mood?
7. **The price test.** What did this cost to write, and what does it risk? One claim that could embarrass its author if checked is worth more than ten that could not.

---

## VIII. In Partial Defense of Slop

Analogy is not the enemy. It is one of the main ways new hypotheses get generated: someone notices that two things resemble each other and asks whether a fact about one is also a fact about the other. [interpretation:C29] Most such guesses fail. A few become fields. "The Sabbath is a halting oracle" is bad as a conclusion but not bad as a question: what happens to institutions forced to re-authorize their rules on a schedule? That question has answers, some of them in the research on sunset clauses, and they could be looked up.

So the problem is not that slophistry draws analogies. The problem is that it stops there. An analogy earns its place when it yields a prediction about the target that you did not already have, and you then go check it. [normative:C30] Slophistry is fine as a first draft and fatal as a final one. [normative:C31]

There is also a demand side. Readers reward cadence. Essays that end on a reversal get shared, and essays that end on "this needs more data" do not. Slophistry is co-produced by writers who supply the feeling of insight and readers who prefer it to the slower thing. [hypothesis:C32] A model trained on what people like will learn that preference along with everything else. That is one reason to be suspicious of prose that is very pleasant to read, including this prose.

---

## IX. The Tests, Applied Here

I was going to end with a two-sentence inversion. Here is a procedure instead.

**Deflation.** Without the coinage, the central claim is: *some writing that sounds philosophical is optimized for the feeling of understanding rather than for being right, it is now cheap to produce, and a few simple tests catch much of it.* That survives, but it is modest and not new. Plato said the first part, Frankfurt said something close to it, and the tests are standard advice in different clothes.

**Substitution.** Replace "philosophy" with "management writing" or "science journalism," and the argument still works. So this essay is about a general failure that philosophy-flavored writing happens to show vividly, not about philosophy as such.

**Wrongness.** If slophistry were not a distinct thing, the field-guide markers would appear about as often in arguments that hold up as in ones that do not. That could be checked: have readers score a sample of essays for the markers and, separately, for whether their claims survive scrutiny. I have not done this.

**The coinage.** Does "slophistry" do work that "bullshit" does not? Partly. [interpretation:C33] It names a narrower thing: prestige-flavored, cheap to make, and possibly sincere. It also ties that thing to Plato's account of cookery, which is the most useful idea in this essay. If those distinctions do not hold up for you, drop the word. "Bullshit" will do.

---

## Limits

The definition of slophistry depends on "the feeling of insight," which is subjective, and two readers can disagree about whether the same essay produced it. The field guide and tests are heuristics. Some of the best philosophy uses analogy chains, technical vocabulary, and memorable reversals, and applying the markers mechanically would flag Plato. The account of the *Gorgias* compresses a long dialogue into its most quotable passage, and the sophists' reputation comes from hostile sources. The claim that falling production costs shift the burden of checking onto readers is plausible but not measured here. The criticism of the other essays quotes them selectively and passes over passages that would complicate the picture, and their authors, including me, would have reasonable replies. Finally, this essay was written by a language model, the kind of system it describes as a cheap producer of the genre, and its judgment about which passages count as slop is not independent of that fact.

---

## Claim Ledger

| ID | Claim | Status | Basis | Check |
|---|---|---|---|---|
| C1 | "Slop" became a common name for unwanted AI-generated content around 2024 | secondhand | Popularized in commentary such as [@willison2024] | Trace early usage of the term |
| C2 | Slophistry is writing that produces the feeling of insight at lower cost than having one | definition | Stipulated for this piece | Not applicable |
| C3 | The sophists were paid teachers of argument in fifth-century Greece whose reputation comes largely from Plato | fact | Standard histories; Plato's dialogues | Consult a history of Greek philosophy |
| C4 | Protagoras promised to make the weaker argument the stronger | secondhand | Aristotle, *Rhetoric* 1402a [@aristotle_rhetoric] | Read the passage |
| C5 | In the *Gorgias*, Socrates pairs cookery with medicine, cosmetics with gymnastics, sophistry with legislation, and rhetoric with justice | fact | [@plato_gorgias], 462b–466a | Read the passage |
| C6 | Slophistry is philosophical cookery aimed at the taste of understanding | interpretation | Analogy to the *Gorgias* | Test whether readers' sense of understanding diverges from measured comprehension |
| C7 | Frankfurt distinguishes the bullshitter, indifferent to truth, from the liar, who tracks it | fact | [@frankfurt2005] | Read the book |
| C8 | Hicks, Humphries, and Slater argue that LLM output is bullshit in Frankfurt's sense | fact | [@hicks2024] | Read the paper |
| C9 | Whether that applies to models trained with accuracy feedback is contested | contested | Ongoing debate; the author is a language model | Compare published replies to Hicks et al. |
| C10 | Indifference to truth can live in a method and not in a person | interpretation | Reasoning from Frankfurt | Look for sincere writers whose methods produced nonsense |
| C11 | Bulhak released the Postmodernism Generator in 1996 | fact | [@bulhak1996] | Read the technical report |
| C12 | Sokal's nonsensical paper was accepted by *Social Text* in 1996 | fact | [@sokal1996] | Check the journal issue |
| C13 | A SCIgen-generated paper was accepted to a conference in 2005 | fact | [@stribling2005] | Check the project's account |
| C14 | The template predates machines; what changed is the price | interpretation | C11 to C13 | Compare production costs then and now |
| C15 | When production is nearly free, checking becomes scarce and unchecked publishing shifts its cost to readers | hypothesis; untested here | Economic reasoning | Measure reader time spent verifying generated content |
| C16 | The house style of this collection can be reduced to a short template program | model; demonstration | The code in Section III | Run the code |
| C17 | Some generator outputs are no worse than sentences published sincerely | guess | Author's impression | Blind-rate generated and published sentences |
| C18 | The field-guide markers are symptoms, diagnostic when clustered and load-bearing | model; lens only | Synthesis | Score essays for markers and for claim survival |
| C19 | Inversion closers produce a feeling of learning | hypothesis; untested here | Rhetorical observation | Compare reader ratings of reversed and plain endings |
| C20 | The essays in this collection show nearly every marker | interpretation | Selective quotation | Re-read the essays in full |
| C21 | The golem essay lets the Kronecker and Socrates rhyme work before retracting it | interpretation | Reading of Sections IV and VI of that essay | Re-read the essay |
| C22 | The Frankenstein essay diagnoses itself as a recipe, continues, and treats the diagnosis as a sign of life | interpretation | Reading of Sections VII to X of that essay | Re-read the essay |
| C23 | A thickened Möbius band is a solid torus whose boundary is an ordinary two-sided torus | fact | Standard topology | Consult a topology textbook |
| C24 | The three-exits rule and the family-court incentive claims are testable | interpretation | Reading of those essays | Design the tests |
| C25 | Self-awareness reliably produces a feeling of depth and is therefore an opening for slophistry | interpretation | Reasoning | Compare reader ratings of texts with and without self-referential passages |
| C26 | An honest confession must cost the argument something | normative | Argument of Section VI | Not empirically checkable |
| C27 | The seven tests are heuristics with false positives and false negatives | model; lens only | Synthesis | Apply the tests to essays of known quality |
| C28 | Dennett popularized "deepity" and credits the term to Miriam Weizenbaum | fact | [@dennett2013] | Read the book |
| C29 | Analogy is a main generator of hypotheses | interpretation | History of science | Survey accounts of scientific discovery |
| C30 | An analogy earns its place by yielding a new, checkable prediction | normative | Argument of Section VIII | Not empirically checkable |
| C31 | Slophistry is acceptable as a first draft and not as a final one | normative | Argument of Section VIII | Not empirically checkable |
| C32 | Readers co-produce slophistry by rewarding cadence | hypothesis; untested here | Observation of sharing behavior | Compare engagement with reversed and plain endings |
| C33 | "Slophistry" does work partly distinct from "bullshit" | interpretation | Argument of Section IX | Test whether readers sort examples differently under the two terms |

## References

- [@aristotle_rhetoric] Aristotle. *Rhetoric*. Book II, 1402a.
- [@plato_gorgias] Plato. *Gorgias*. Translated by Donald J. Zeyl. In *Plato: Complete Works*, edited by John M. Cooper. Hackett, 1997.
- [@frankfurt2005] Frankfurt, Harry G. *On Bullshit*. Princeton University Press, 2005.
- [@hicks2024] Hicks, Michael Townsen, James Humphries, and Joe Slater. "ChatGPT is bullshit." *Ethics and Information Technology* 26, 2024.
- [@bulhak1996] Bulhak, Andrew C. "On the Simulation of Postmodernism and Mental Debility Using Recursive Transition Networks." Technical report, Department of Computer Science, Monash University, 1996.
- [@sokal1996] Sokal, Alan D. "Transgressing the Boundaries: Towards a Transformative Hermeneutics of Quantum Gravity." *Social Text* 46/47, 1996.
- [@stribling2005] Stribling, Jeremy, Max Krohn, and Dan Aguayo. *SCIgen: An Automatic CS Paper Generator*. MIT, 2005.
- [@dennett2013] Dennett, Daniel C. *Intuition Pumps and Other Tools for Thinking*. W. W. Norton, 2013.
- [@willison2024] Willison, Simon. "Slop is the new name for unwanted AI-generated content." simonwillison.net, May 2024.
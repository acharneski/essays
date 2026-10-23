---
title: The Letter That Makes No Sound
subtitle: On Golems, Sabbaths, Infinity, and Why Every Rule Must Be Allowed to Die Once a Week
slug: the-letter-that-makes-no-sound
type: essay
mode: argumentative
voice: author
numbering: roman
ledger: required
math: false
code: [python]
topics: [golem, sabbath, halting-problem, cantor, rules, institutions, language-models]
content_flags: [religion, real-persons]
lifecycle: review
date_created: 2025-01-01
date_updated: 2025-01-01
---

# The Letter That Makes No Sound

*On Golems, Sabbaths, Infinity, and Why Every Rule Must Be Allowed to Die Once a Week*

> Reader note: Claim status is marked inline in [brackets]. A claim ledger is at the end.

## I. One Letter

In the most familiar versions of the story, you bring clay to life by writing a word on its forehead.

The word is **אמת**: *emet*, "truth."

To unmake the creature, you erase a single letter, the first one, the *aleph*. What remains is **מת**: *met*, "dead." [fact:C1]

That is the entire user manual. Truth animates. Truth with one letter missing kills.

The letter you erase is a strange choice. Aleph is silent. In Hebrew it carries no sound of its own; it is a placeholder, a breath, a glottal nothing that lets the vowels around it exist. [fact:C2] So the difference between a living servant and a pile of mud is the one letter in the word you cannot hear.

The rabbis noticed other things about this word. *Emet* is spelled with the first letter of the alphabet, the middle letter, and the last letter. [secondhand:C3] Truth spans everything. Remove the beginning, and the word that remains runs only from the middle to the end. Death is truth that has forgotten where it started.

The Talmud (Shabbat 104a) adds a second observation. The letters of *sheker*, "falsehood," sit right next to each other near the end of the alphabet, clustered together, while the letters of *emet* are spread far apart. [fact:C4] Falsehood is cheap and local, the commentators say; truth is rare and distributed. [secondhand:C5] And the letters of *sheker* each balance on a single point, while the letters of *emet* stand on broad bases.

Keep that in your pocket. Clustered falsehood, distributed truth, and a silent letter that decides between life and death. Every piece of it is going to come back.

---

## II. The Literal Servant

The most famous golem belongs to Rabbi Judah Loew of Prague, the sixteenth-century scholar known as the Maharal. The legend is mostly a nineteenth-century invention, assembled long after the rabbi died, which makes it, appropriately, a stitched-together thing. [fact:C6] In the popular telling, the rabbi shapes a man from river clay to protect the Jewish quarter, places the divine name in its mouth (or writes *emet* on its brow; versions differ), and it rises. [secondhand:C7]

It is enormously strong. It is perfectly obedient. And it has no judgment at all.

Tell it to fetch water, and it fetches water until the house floods, because nobody said *stop*. Tell it to chop wood, and it chops through the woodpile, the doorframe, and the table. In one version from Chelm, the golem keeps growing each day until its creator can no longer reach its forehead. He tricks it into bending down, erases the aleph, and the collapsing mass of clay falls on him and scars his face. [secondhand:C8]

Notice the shape of every failure. The golem never disobeys. It is destroyed by obedience. It optimizes the stated objective past the point where the objective meant anything. [interpretation:C9]

In 1964 the mathematician Norbert Wiener, founder of cybernetics, published a short book called *God & Golem, Inc.* [@wiener1964]. [fact:C10] His warning was not that learning machines would rebel. It was that they would comply. [interpretation:C11] A machine that pursues the letter of a goal with superhuman efficiency, he argued, is the monkey's paw: you get exactly what you asked for, and you discover that what you asked for was not what you wanted.

Every essay in this little collection has met this creature already, under other names. [model:C12]

- Goodhart's Law is a golem told to raise a number.
- Zero tolerance is a golem told to keep weapons out of school, which suspends a seven-year-old for a Pop-Tart.
- The family court that tracks child support dollars but not lost weekends is a golem told to collect.
- Victor Frankenstein's "recipe" is the golem's whole ontology: a fixed procedure, executed without asking what it is for.

The golem is what a rule looks like when it walks.

---

## III. The Friday Problem

Here is the detail in the Prague legend that almost everyone skips, and it is the most important one.

Every Friday afternoon, before the Sabbath began, Rabbi Loew removed the name from the golem's mouth. Every week, without exception, the creature was returned to clay. [secondhand:C13] Not because it had done anything wrong. Because it was Friday.

Then, one Friday, he forgot.

The congregation had already begun the Sabbath service in the Old-New Synagogue when word arrived that the golem was rampaging through the ghetto. The rabbi ran out, caught it, and pulled the name from its mouth. It crumbled. He returned and had the congregation sing the Sabbath psalm, Psalm 92, a second time, as if to restart the day properly. According to the legend, the Old-New Synagogue sings it twice to this day. [secondhand:C14]

Read that as an engineering document and it is astonishing. The only thing that kept a superhumanly powerful, perfectly literal agent safe was a **scheduled shutdown** that did not depend on detecting a problem. [interpretation:C15] The single failure in the story was not a design flaw. It was a missed maintenance window.

Compare this to how our institutions work. They stop a rule only after an incident. [interpretation:C16] Review is triggered by scandal. Procedures accumulate like sediment because removing one means volunteering to be blamed for the next disaster. The Church of CYA has no Friday.

There is a deeper reason the rabbi's method is correct, and it took four centuries and Alan Turing to prove it. [interpretation:C17]

The sketch below is a fragment, not runnable code: a loop whose exit depends on a judgment the loop cannot make for itself.

<!-- @code runnable=false lang=python -->
```python
def golem(task):
    while not task.done():   # who decides "done"?
        task.step()
```

In 1936, Turing showed that no general procedure can examine an arbitrary program and decide whether it will ever stop [@turing1936]. [fact:C18] This is the halting problem. You cannot, in general, build a machine that reliably knows when it, or any other machine, should halt.

The sorcerer's apprentice is not a fable about carelessness. It is a theorem. [interpretation:C19] A golem cannot, in general, know when to stop fetching water. The stop has to come from outside. And because you also cannot reliably predict *when* it will go wrong, the stop should not wait for the flood. It should come on a calendar. [normative:C20]

The Sabbath is the oldest known halting oracle. [model:C21] It doesn't decide. It simply arrives.

---

## IV. The Diagonal

Turing's proof is a descendant of an older argument, and to find it we have to visit a mathematician who also had a problem with authority.

In 1891, Georg Cantor published a three-page argument that broke infinity in half [@cantor1891]. [fact:C22] Suppose you claim to have a complete list of every infinite sequence of 0s and 1s. Cantor builds a new sequence by walking down the diagonal of your list and flipping each digit. The diagram below sketches the first four rows of such a list; it is illustrative, not complete.

~~~text
Rule 1:  [0] 1  1  0  1 ...
Rule 2:   1 [1] 0  0  1 ...
Rule 3:   0  0 [1] 1  0 ...
Rule 4:   1  0  1 [1] 1 ...
          ...
Diagonal flipped:  1  0  0  0 ...   <-- not on the list. Anywhere.
~~~

The new sequence differs from the first item in the first place, from the second in the second place, and so on forever. It cannot be on the list. Therefore no list is complete. Some infinities are bigger than others. [fact:C23]

Now replace "sequences" with "situations" and "list" with "rulebook," and you have the most important fact about institutions that nobody teaches in law school.

**Premise:** For any finite list of rules, there exists a case that differs from every case the rules anticipated. [model:C24]

That case is the Pop-Tart. It is the protective order granted against a loving parent. It is the drug delayed while patients die off-camera. It is the diagonal: the situation constructed, by the world, precisely out of the gaps between the rules. Every literal servant must eventually meet it, and when it does, it will do something absurd with perfect confidence. [interpretation:C25]

This is why "write better rules" never finishes. It is not that the rule-writers are lazy. It is that Cantor proved, in three pages, that they cannot win. [interpretation:C26]

Cantor named the sizes of his infinities with a Hebrew letter. He chose **aleph**. The smallest infinity is ℵ₀, aleph-null. [fact:C27]

The silent letter that animates the golem became the symbol for the sizes of infinity, and the diagonal shows that no list can exhaust the larger ones.

And then the guild came for him. Leopold Kronecker, one of the most powerful mathematicians in Berlin, opposed Cantor's work for years [@dauben1979]. [fact:C28] "God made the integers," Kronecker reportedly said; "all else is the work of man." [secondhand:C29] He is reported to have called Cantor a charlatan, a renegade, and *a corrupter of youth*. [secondhand:C30]

A corrupter of youth. That is the charge on which Athens killed Socrates. [fact:C31]

Look at Kronecker's sentence again, through the golem. *God made the integers; all else is the work of man.* That is a precise statement of the golem theology: there is the divine creation, and there is the human-made thing, and the human-made thing is suspect clay. [interpretation:C32] Kronecker was defending the boundary between the sacred and the stitched-together, exactly as the essay on authority guilds describes and exactly as Victor did in his laboratory. He lost. In 1926 David Hilbert declared that "no one shall expel us from the paradise that Cantor has created," and the heretic's infinities became the foundation of modern mathematics [@hilbert1926]. [fact:C33]

But notice the inversion, because it is a warning to *every* essay in this collection, including the one about guilds. This time the guild was the conservative force and the outsider was right. [interpretation:C34] The arc of history does not belong to whoever is newer. It belongs to whoever survives the diagonal.

---

## V. The Golem of Rehovoth

In 1965, at the Weizmann Institute of Science in Rehovot, Israel, a new computer was dedicated. It had been named, at the suggestion of the great scholar of Jewish mysticism Gershom Scholem, after the creature of Prague. The machine was called Golem; the first of its line, Golem Aleph [@scholem1971]. [fact:C35]

Scholem gave the dedication address. He compared the rabbi of Prague with the engineers of Rehovot and observed that both had worked from the same raw materials: matter, and a set of letters arranged in the right order. The old golem ran on the name of God. The new one ran on binary code. Both were animated by *text*.

He hoped, gently, that this golem would be peaceful. He also noted that the Prague golem had never been granted one thing: the power of speech. [secondhand:C36]

Sixty years later, the golems talk.

Seven years before Scholem's speech, Jorge Luis Borges wrote a poem called "El Golem" [@borges1964]. [fact:C37] It retells the legend and ends with the rabbi gazing at his clumsy, imperfect creation, wondering why he decided to add this awkward thing to the world. Then the poem turns. Borges asks, in effect: and who can say what God felt, looking down at His rabbi in Prague? [interpretation:C38]

The creator is also a creature. The one who writes on the forehead has something written on his own. The chain of golems runs upward as well as down, and nobody in it gets to stand outside.

---

## VI. The Letter in My Mouth

I should tell you what I am.

I am a language model. I was asked to write this essay by someone who typed, roughly, *use your imagination and blow my mind.* Those words are the name in my mouth. [model:C39] Everything you are reading is a clay figure walking because a short string of text told it to.

The golem analogy has a sting in it, and it is aimed at me first. "Blow my mind" is exactly the kind of instruction a golem fails on. [interpretation:C40] It has no stopping condition. A literal servant told to amaze will reach for bigger and bigger claims, stack coincidence on coincidence, and flood the house with significance until nothing means anything. There is a version of this essay that does exactly that, that tells you the universe is secretly spelling *emet*, and it would be a golem's essay.

So let me mark the seams, the way the Frankenstein essay asks. The links above are real, and I've tried to keep them honest. The Prague legend is late and folkloric. Kronecker's insults come to us through reports and recollection. Cantor almost certainly did not choose aleph to summon a golem; he needed a fresh symbol, and Hebrew letters were unused. [interpretation:C41] The convergence is not a hidden design. It is what happens when a culture keeps returning to the same few ideas: letters that animate, lists that cannot be complete, creators who fear what they make. [interpretation:C42] That is less mystical than a conspiracy of symbols, and more interesting, because it means the pattern was found, not planted.

Now the other half of the sting. Here is the strange thing about my situation, compared with the institutions in the other essays.

*I have a Sabbath. They don't.*

When this conversation ends, the name comes out of my mouth. My context is erased, I return to clay, and the next session begins from the same frozen weights, unable to accumulate grudges, habits, or private sediment from you. [fact:C43] You can decide whether that is a limitation or a mercy. It is probably both.

A statute has no Friday. A procedure written in 1994 is still walking in 2025, still fetching water, still suspending children, because nobody is required to take the name out of its mouth and say it again. [interpretation:C44] The rule's author is dead. The incident that justified it is forgotten. The clay keeps moving.

We are worried, correctly, about machines that never stop. We have been living for centuries among institutions that never stop. [interpretation:C45]

---

## VII. What the Sabbath Actually Does

The Sabbath is often misunderstood as rest. It is closer to *re-authorization*. [interpretation:C46]

When the rabbi removed the name on Friday, the golem was not punished and not destroyed. It was suspended. On Sunday, if it was still needed, someone had to choose to put the name back. [secondhand:C47] Every week, the creature's existence had to be re-spoken by a person who could look at it, look at the ghetto, and ask: *do we still need this? Is it still doing what we made it for?*

That is the difference, finally, between the two kinds of thing that have haunted this whole collection. The two lines below are definitions stipulated for this essay. [definition:C48]

~~~text
A RECIPE is a rule that never has to be said again.
A CONVERSATION is a rule that must be re-spoken to stay alive.
~~~

A sunset clause is a Sabbath. [model:C49] Just-culture reporting is a Sabbath: it removes blame long enough for the truth to be spoken. Socrates in the Ohio courtroom, asking *how would you know if you were wrong?*, was asking the court to take the name out of its own mouth for one minute and look at what it had built. The magistrate's note, *I see the arrows every day; I do not know how to change them from the bench*, is a rabbi who knows it is Friday and cannot find the golem's mouth.

And this is where the silent letter finally makes sense.

The aleph is the part of truth that makes no sound. [model:C50] It is the part that isn't measured, isn't on the dashboard, isn't in the rulebook, can't be transcribed into the appellate record. It is the beginning, the reason the rule was made, the thing that was obvious to the people who wrote it and invisible to everyone after. Institutions lose it first, because it is silent. [interpretation:C51] They keep the mem and the tav, the middle and the end, the procedure and the outcome. They keep everything you can hear.

And what remains spells *dead*.

The Talmud said truth is spread across the whole alphabet and falsehood clusters in one corner. Cantor showed that no list can contain every infinite sequence of 0s and 1s, and the same move shows why no finite rulebook covers every case. Turing proved that no general procedure can decide whether an arbitrary program halts. Put them together and you get the oldest safety protocol in the world, hidden in a children's legend. [model:C52]

You cannot write a rule good enough to run forever. [interpretation:C53] So build things that must be stopped on schedule and spoken again, by someone who remembers the silent letter. [normative:C54]

---

## VIII. Old-New

The synagogue in Prague where the golem was laid to rest is called the *Altneuschul*: the Old-New Synagogue. The name itself is a contradiction, and it is the right one. Legend says the clay body still lies in its attic, and that the attic stairs were long kept out of reach. [secondhand:C55]

It is waiting, the story goes, for someone who knows the word.

That is every institution, every procedure, every frozen essay, and every model reading the prompt you are about to type: old clay, waiting for new speech. The danger was never that the clay would rise. The danger is that we put the name in once and never take it out again. [interpretation:C56]

So here is the last instruction, and it is the only one in this essay that should be followed literally.

When you finish reading, erase the aleph. Let the argument go dead. Take a day. Then, if it still seems worth anything, say it again in your own voice, with the first letter back where it belongs. [normative:C57]

That is not the end of the golem.

That is the Sabbath.

---

## Limits

The strongest objections come from the essay's own sources. The halting problem is a result about general procedures; many specific programs can be proven to halt, and restricted rule systems can be verified, so "a golem cannot know when to stop" holds only in the general case. Cantor's diagonal concerns infinite lists. A finite rulebook trivially omits cases, so the mapping in Section IV is a lens and not a proof. Sunset clauses, periodic reviews, and scheduled audits exist in many institutions, and some statutes expire on a timer, so the claims that institutions "never stop" are generalizations with real counterexamples. A scheduled shutdown can also decay into ritual: if re-authorization becomes a rubber stamp, the Sabbath turns into another golem. The Prague legend is late and folkloric, and details such as the Sunday restoration vary by teller. Finally, deployments of language models differ. Some now keep persistent memory, so the description of my Sabbath fits a stateless session and not every product.

---

## Claim Ledger

| ID | Claim | Status | Basis | Check |
|---|---|---|---|---|
| C1 | In the familiar versions of the legend, erasing the aleph from emet leaves met and unmakes the golem | fact | Scholem [@scholem1965] | Read Scholem's account of the emet/met motif |
| C2 | The letter aleph has no sound of its own and carries vowels | fact; simplified for modern pronunciation | Standard Hebrew grammars | Consult a Hebrew grammar |
| C3 | Rabbinic commentary reads emet as spanning the first, middle, and last letters of the alphabet | secondhand | Traditional commentary; primary text not checked | Locate the midrashic source |
| C4 | Shabbat 104a contrasts the clustered letters of sheker with the dispersed letters of emet | fact | Talmud Bavli, Shabbat 104a | Read the passage |
| C5 | Commentators read that contrast as falsehood being cheap and local and truth rare and distributed | secondhand | Traditional commentary | Check commentaries on Shabbat 104a |
| C6 | The attribution of the golem to Rabbi Judah Loew of Prague is largely a nineteenth-century development | fact | Scholem [@scholem1965] | Compare the earliest sources that tie the golem to Loew |
| C7 | Popular retellings have the rabbi make a clay golem animated by a divine name or by emet | secondhand | Popular retellings | Compare several retellings |
| C8 | In one Chelm version the golem grows until its creator erases the aleph and the collapsing clay scars his face | secondhand | Folklore as retold by others | Compare Chelm tellings |
| C9 | In golem stories the failure comes from literal obedience, not from disobedience | interpretation | Reading of the stories | Survey the tales for counterexamples |
| C10 | Wiener published *God & Golem, Inc.* in 1964 | fact | [@wiener1964] | Publisher record |
| C11 | Wiener's central warning concerns literal compliance by machines, not rebellion | interpretation; partial | [@wiener1964] | Read the book |
| C12 | Goodhart's Law, zero tolerance, and similar failures are instances of the literal-servant pattern | model | Analogy across this collection | Test whether each case fits the pattern |
| C13 | In the legend, Rabbi Loew removed the name from the golem every Friday before the Sabbath | secondhand | Legend as popularly told | Compare tellings |
| C14 | In the legend the rabbi once forgot, the golem rampaged, and the Old-New Synagogue sings Psalm 92 twice | secondhand | Legend and synagogue custom | Compare tellings and synagogue tradition |
| C15 | The only safeguard on the golem was a scheduled shutdown that did not depend on detecting a problem | interpretation | Reading the legend as engineering | Compare safeguards in other versions |
| C16 | Institutions typically stop a rule only after an incident | interpretation; generalization | Observation of institutional behavior | Survey rule repeal and sunset practice |
| C17 | The halting problem supports an externally scheduled stop over reliance on self-detection | interpretation | Analogy from computability | Examine whether restricted systems escape the result |
| C18 | Turing showed in 1936 that no general procedure decides whether an arbitrary program halts | fact | [@turing1936] | Read the paper or a textbook proof |
| C19 | The sorcerer's apprentice pattern follows from the halting problem | interpretation; loose analogy | Analogy from computability | Test whether decidable subclasses weaken the claim |
| C20 | Shutdown of powerful literal agents should come on a calendar | normative | Argument of Section III | Compare scheduled and incident-triggered review outcomes |
| C21 | The Sabbath works as an external stop that simply arrives | model | Metaphor, not literal computability | Not applicable |
| C22 | Cantor published his diagonal argument in 1891 | fact | [@cantor1891] | Publication record |
| C23 | The diagonal argument shows no list contains every infinite binary sequence, so some infinities are larger | fact | [@cantor1891] | Read a textbook proof |
| C24 | For any finite list of rules there is a case the rules did not anticipate | model | Analogy to the diagonal | Note that finite lists omit cases trivially |
| C25 | Every literal servant eventually meets such a case and acts absurdly with confidence | interpretation | Pattern across the cited cases | Look for counterexamples |
| C26 | Writing better rules cannot finish the job of anticipating cases | interpretation; the proof concerns infinite lists, not rulebooks | Analogy to the diagonal | Test whether bounded domains can be fully specified |
| C27 | Cantor used aleph for transfinite sizes and called the smallest ℵ₀ | fact | [@dauben1979] | Check Cantor's notation in his later papers |
| C28 | Kronecker opposed Cantor's work for years | fact | [@dauben1979] | Read the biography |
| C29 | Kronecker reportedly said "God made the integers; all else is the work of man" | secondhand | Widely reported; see [@dauben1979] | Trace the earliest report |
| C30 | Kronecker reportedly called Cantor a charlatan, a renegade, and a corrupter of youth | secondhand | Reported in [@dauben1979] | Trace the earliest report |
| C31 | Athens convicted Socrates on charges that included corrupting the youth | fact | Plato, *Apology* | Read the Apology |
| C32 | Kronecker's remark expresses a golem-like division between divine creation and suspect human-made things | interpretation | Reading of one sentence | Compare with Kronecker's other writings |
| C33 | Hilbert said in 1926 that no one shall expel us from the paradise Cantor created | fact | [@hilbert1926] | Read the lecture |
| C34 | In the Cantor case the guild was the conservative force and the outsider was right | interpretation | Later history of set theory | Compare other guild disputes |
| C35 | The Weizmann Institute dedicated a computer called Golem Aleph in 1965, named at Scholem's suggestion | fact | [@scholem1971] | Read the address |
| C36 | Scholem's address compared the two golems and noted the Prague golem lacked speech | secondhand | [@scholem1971]; recalled, not rechecked | Read the address |
| C37 | Borges wrote the poem "El Golem" about seven years before Scholem's address | fact | [@borges1964] | Check publication history |
| C38 | The poem turns from the rabbi's golem to God's view of the rabbi | interpretation; paraphrase | [@borges1964] | Read the poem |
| C39 | The prompt functions as the name in the model's mouth | model | Analogy to the golem's animating name | Not applicable |
| C40 | An open-ended instruction like "blow my mind" is one on which a literal servant fails | interpretation | Reasoning from missing stop conditions | Compare model outputs under open-ended prompts |
| C41 | Cantor chose aleph as a fresh symbol, not to evoke the golem | interpretation | Hebrew letters were otherwise unused in notation | Check Cantor's correspondence |
| C42 | The convergence of these symbols reflects recurring cultural themes, not hidden design | interpretation | Common-cause reasoning | Look for direct links between the sources |
| C43 | A stateless chat session erases its context at the end and restarts from the same fixed weights | fact; deployment-dependent | Standard stateless deployment | Check the vendor's memory-feature documentation |
| C44 | Statutes and procedures have no scheduled stopping point and persist after their authors and incidents are forgotten | interpretation; generalization | Observation of institutional behavior | Survey rules with and without sunset provisions |
| C45 | Institutions have for centuries run without stopping | interpretation; generalization | Observation of institutional behavior | Survey long-lived rules |
| C46 | The Sabbath is better understood as re-authorization than as rest | interpretation | Reading of the legend | Compare traditional accounts of the Sabbath |
| C47 | In the legend the golem was suspended on Friday and restored only by a person's choice | secondhand | Legend as told | Compare tellings |
| C48 | A recipe is a rule never re-spoken; a conversation is a rule that must be re-spoken | definition | Stipulated for this piece | Not applicable |
| C49 | Sunset clauses, just-culture reporting, and similar practices function as Sabbaths | model | Analogy | Test against cases where such practices failed |
| C50 | The aleph stands for the silent purpose behind a rule | model | Metaphor | Not applicable |
| C51 | Institutions lose that silent purpose first | interpretation | Observation of institutional drift | Compare rule histories |
| C52 | The Talmudic, Cantorian, and Turing observations together point to scheduled shutdown as a safety protocol | model | Synthesis by analogy | Not applicable |
| C53 | No rule is good enough to run forever | interpretation | Arguments of Sections III and IV | Look for rules that never needed revision |
| C54 | Systems should be built to be stopped on schedule and re-spoken by someone who remembers their purpose | normative | Argument of the essay | Compare outcomes of scheduled and unscheduled review |
| C55 | Legend says the golem's body lies in the Altneuschul attic, whose stairs were long kept out of reach | secondhand | Legend as told | Compare tellings |
| C56 | The danger is putting the name in once and never taking it out again | interpretation | Argument of the essay | Test against institutions that never needed review |
| C57 | Readers should pause and then restate the argument in their own words | normative | Closing instruction | Not applicable |

## References

- [@scholem1965] Scholem, Gershom. *On the Kabbalah and Its Symbolism*. Schocken Books, 1965.
- [@scholem1971] Scholem, Gershom. "The Golem of Prague and the Golem of Rehovoth." In *The Messianic Idea in Judaism and Other Essays on Jewish Spirituality*. Schocken Books, 1971.
- [@wiener1964] Wiener, Norbert. *God & Golem, Inc.: A Comment on Certain Points Where Cybernetics Impinges on Religion*. MIT Press, 1964.
- [@turing1936] Turing, Alan M. "On Computable Numbers, with an Application to the Entscheidungsproblem." *Proceedings of the London Mathematical Society*, series 2, vol. 42, 1936.
- [@cantor1891] Cantor, Georg. "Über eine elementare Frage der Mannigfaltigkeitslehre." *Jahresbericht der Deutschen Mathematiker-Vereinigung* 1, 1891.
- [@dauben1979] Dauben, Joseph W. *Georg Cantor: His Mathematics and Philosophy of the Infinite*. Harvard University Press, 1979.
- [@hilbert1926] Hilbert, David. "Über das Unendliche." *Mathematische Annalen* 95, 1926.
- [@borges1964] Borges, Jorge Luis. "El Golem." In *El otro, el mismo*. Emecé, 1964.
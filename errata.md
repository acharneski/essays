---
title: The Errata Page
subtitle: Why Corrections Travel Slower Than Mistakes
slug: errata
type: essay
mode: argumentative
numbering: roman
ledger: required
math: true
topics: [error-correction, epistemology, citation, textual-criticism, accounting, misinformation, institutions]
content_flags: [religion]
lifecycle: draft
date_created: 2026-09-12
date_updated: 2026-09-12
---

# The Errata Page

*Why Corrections Travel Slower Than Mistakes.*

> Reader note: Claim status is marked inline in [brackets]. A claim ledger is at the end. Unlike earlier essays in this series, this one also keeps a revision log, for reasons the essay itself explains.

## I. The Wicked Bible

In 1631 the royal printers in London, Robert Barker and Martin Lucas, produced an edition of the King James Bible with one word missing. The seventh commandment read: "Thou shalt commit adultery." The printers were fined three hundred pounds and lost their license, and most of the print run was destroyed. [fact:C1] A small number of copies survived, and they are now prized by collectors. They are known as the Wicked Bible.

The story is usually told as a joke about a typesetter's bad afternoon. It is more useful as a parable about how errors and corrections behave. The error was physical. It was ink on a page, bound into a book and shipped out of the shop. The correction was administrative: a fine, a decree, an order to recall and burn. The error had to be hunted down copy by copy. The correction lived in a court record that nobody holding a Wicked Bible would ever read. The copies that survived carried the mistake with them and no correction at all. Nothing in a surviving copy tells its reader that the text is wrong. The reader has to already know.

That asymmetry is the subject of this essay. Mistakes travel with the text. Corrections usually stay home. [interpretation:C2] My claim is that this happens because of how knowledge systems are wired, not because of carelessness or bad faith, though there is plenty of both. In most of the systems we use to store and transmit knowledge, the links point the wrong way for corrections to follow. [model:C3]

---

## II. Errors Are Copies, Corrections Are Pointers

Think of any body of knowledge as a graph of documents. A paper cites earlier papers. A textbook summarizes papers. A news story quotes a press release that summarizes a textbook. A student's notes copy a lecture that paraphrases the news story. Each document points to its sources. Write $d \to s$ when document $d$ draws on source $s$. [definition:C4]

These arrows all point backward in time, from the newer document to the older one. That is what a citation is. When you write a paper you know what you read. You do not know, and cannot know, who will read you.

Now suppose a source $s$ turns out to be wrong. To correct the record you have to reach every document that inherited the error. These are the documents with a path of arrows leading to $s$:

$$\text{Desc}(s) = \{\, d : d \to \cdots \to s \,\}$$

The arrows point from $d$ to $s$. The correction has to travel from $s$ to $d$, against the arrows. [derived:C5] The person who discovers that $s$ is wrong is standing at the one node that has no outgoing record of who depends on it. A citation index can reconstruct some of the reverse links, but only for formal citations. It misses textbooks that drew on the paper without citing it, lecture slides, popular summaries, policy memos, and the memory of everyone who read the paper once and moved on. [interpretation:C6]

The best-known modern case is Andrew Wakefield's 1998 paper in *The Lancet* linking the MMR vaccine to autism. *The Lancet* retracted it in 2010. [fact:C7] The retraction notice sits beside the original in the journal's archive, which is the right place for it. But the paper's influence never ran mainly through readers of the archive. It ran through press coverage, word of mouth, advocacy groups and parents' conversations. None of those channels points back to the retraction. Studies of citation behavior have found that retracted papers in general go on being cited after retraction, often with no sign that the citing authors know about it. [secondhand:C8]

None of this requires anyone to behave badly. It follows from the geometry. A system whose links run from copy to source will spread errors efficiently and retract them poorly, because spreading follows the copying and retraction has to run against it. [derived:C5]

---

## III. Ink, Not Pencil

At least one old discipline has solved part of this problem, and its solution is instructive.

When Luca Pacioli set out double-entry bookkeeping in his *Summa* of 1494, he was describing practice that Italian merchants had already refined over generations. [fact:C9] A habit that grew up with that practice became professional doctrine: a bookkeeper does not erase. An entry that turns out to be wrong is not scraped off the page or blotted out. It is offset by a new entry that reverses it, followed by a third entry that records what should have happened. The ledger grows longer and never gets shorter. [fact:C10]

The reason is auditability. An erased ledger cannot tell you what it used to say. A reversed ledger shows the mistake, the moment it was caught and the fix, all in the same place and in order. Anyone reading the books later sees the error and its correction together. They cannot meet one without the other, because they sit in the same sequence. The correction travels with the error because both are entries in the same record. [interpretation:C11]

Software engineers rediscovered the same principle. In a version control system like Git, the published history is treated as immutable. To undo a bad change you add a new commit that reverses it, and you do not rewrite the past. [fact:C12] Rewriting shared history is possible, but it is widely treated as a breach of etiquette, because everyone who already copied the old history now holds a version that no longer matches. Rewriting is a palace move. It changes what is true by decree and leaves every downstream copy quietly wrong. Reverting is a library move. It adds to the record and lets the record show its own repair. [interpretation:C13]

Here is the general principle, stated as a definition for the rest of the essay:

> **Correction by addition.** A record is self-correcting when errors are fixed by appending entries that reference the erroneous entry, never by deleting or overwriting it. [definition:C14]

Correction by addition does not solve the problem from Section II. A reversing entry in the ledger does nothing for someone who copied the old figure into a spreadsheet last month. What it does is make sure that anyone who returns to the source finds the correction. That is necessary, but it is not enough. To actually reach the copies, a record needs one more property, which I take up in Section VII.

---

## IV. Why Scribes Preferred the Harder Reading

Before printing, every copy of a text was made by hand, and every hand made mistakes. Textual critics, the scholars who try to reconstruct an original from its surviving copies, learned something important about those mistakes. They are not random.

A tired scribe facing an unfamiliar word tends to write a familiar one. A scribe facing an awkward construction tends to smooth it out. A scribe who thinks the source has a mistake tends to "fix" it. Copying errors drift toward the easy, the expected and the plausible. Textual critics therefore developed a rule of thumb, *lectio difficilior potior*: when two manuscripts disagree, the harder reading is more likely to be the original. [fact:C15] The awkward reading survived because nobody had a motive to invent it.

This is a striking result, and it reaches well beyond manuscripts. If copying errors bend toward plausibility, then the errors that survive many rounds of copying are the ones that look right. [interpretation:C16] An implausible error gets caught. A plausible error gets copied. After enough generations the stock of surviving errors has been filtered, by the same people trying to copy faithfully, for exactly the property that makes errors hard to see.

Something similar seems to happen in modern media, with a different filter. Vosoughi, Roy and Aral studied the spread of true and false stories on Twitter and found that false stories reached more people, faster, than true ones. Their analysis suggested that novelty and emotional surprise did part of the work. [secondhand:C17] The scribe's filter favored the plausible. The modern filter seems to favor the surprising. Neither filter selects for truth. Each selects for something that travels well, and truth only travels well when it happens to share that property.

There is a well-known informal principle, usually credited to the programmer Alberto Brandolini, that refuting nonsense takes an order of magnitude more energy than producing it. [secondhand:C18] I suspect Brandolini's asymmetry is not a separate law. It is what Sections II and IV look like from the point of view of someone trying to clean up. The error has the copying graph on its side and has been selected to survive. The correction has to travel against the arrows and is often less interesting than the thing it corrects. [conjecture:C19]

---

## V. The Price of Saying "I Was Wrong"

So far I have discussed structure. People matter too, and the people who could issue corrections often have reasons not to.

For the author of a mistake, a correction is a public entry in a ledger of reputation. Scientists fear that a retraction will poison their other work. Officials fear that admitting one error invites scrutiny of the rest. Journalists fear that a correction column signals carelessness. Each of these fears treats an error as evidence about the person, not just about the claim. [interpretation:C20]

That is a form of the rank caching described in "The Palace and the Library": a judgment about one relation gets converted into a cached judgment about a person and reused everywhere. The evidence suggests the fear is partly misplaced, at least in science. One large study of retractions found that retractions overall were followed by fewer citations to the authors' earlier papers, but that this penalty did not appear when authors reported the problem themselves. [secondhand:C21] If that finding holds, the reputation ledger is fairer than people expect. It punishes errors that others discover and spares errors that the author confesses. That is roughly the incentive a well-designed system should create.

Whatever the actual penalty, the *perceived* penalty shapes behavior, and correction is a public good with private costs. [interpretation:C22] The benefit of a correction is spread across every reader the error would have misled. The cost falls on the one person who has to say it. Public goods with concentrated costs are undersupplied, and corrections are no exception. [derived:C23]

Two moves follow. The first is to lower the private cost: treat self-correction as a credential, not a confession. A researcher with a public record of catching their own mistakes has shown exactly the quality we most want in a researcher. The second is to keep the cost from landing on the wrong person. Often the cheapest way to issue a correction is to blame a subordinate, a junior author or an anonymous process. A correction system that cannot tell who made an error will end up assigning it to whoever is least able to object. [interpretation:C24]

---

## VI. Keeping the Losing Opinion

The Mishnah, the foundational compilation of rabbinic law, records many disputes in which the law follows the majority. It records the minority opinions anyway. A passage in tractate Eduyot asks why. If the law follows the majority, why preserve the individual who was overruled? Its answer is that a later court may find reason to rely on the rejected view. [fact:C25]

This is a ledger principle applied to arguments. A rejected reading is not erased. It is marked as rejected and kept, and the mark can later be revisited. The tradition does not claim the majority was wrong. It claims that the question of who is right is not settled for all time when a vote is taken, and that a record which keeps only the winners cannot be reopened. [interpretation:C26]

The same principle protects corrections from being corrected badly. Corrections are claims too, and some of them are wrong. A record that deletes the "error" when it issues a correction has no way to recover if the correction turns out to be the mistake. [derived:C27] Correction by addition guards against this, because the original entry is still there to be restored. The scientific literature contains cases in which a result was widely doubted and later vindicated. [needs-source:C28] A system that had erased the original would have had nothing to vindicate.

In the language of the earlier essay, a correction system should be a library and not a palace. A palace has to choose and act, so it resolves disputes. A library can hold the original claim, the correction and the dissent side by side, each marked with its current status, and let later readers trace how the status changed. [interpretation:C29]

---

## VII. Making the Erratum Travel With the Error

The diagnosis suggests a design goal: build systems in which the correction reaches the copies, not just the source. Some practical versions follow.

**Forward links at the point of copying.** When a document draws on a source, it should record not just *that* it did, but *which version* it drew on, in a form that can be checked later. A reader of the derivative document could then ask: has my source changed since this was written? Software package managers already work this way. A project records the exact versions of its dependencies, and tools can warn when one of those versions has a known flaw. [fact:C30] Security advisories reach downstream projects because the dependency graph is machine-readable in both directions. Scholarly citation could work the same way. Some publishers already attach retraction flags to citations of retracted papers in reference-management tools. [secondhand:C31] The design should become the default and stop being an add-on.

**Status, not just content.** A claim should carry its current status: asserted, contested, corrected or retracted. That status should be a field that can change while the claim's text stays fixed. When the status changes, the change should be logged. This essay series already does half of this with its claim ledgers. [interpretation:C32] Each claim has an ID and a status. What the ledgers lack is a history, so I have added one below. If C17 is later downgraded from secondhand to contested, the revision log will say so, when, and why, and the original entry will stay visible.

**Corrections that explain, not just negate.** This matters more than it sounds. Research on what psychologists call the *continued influence effect* has found that people often keep relying on information after it has been explicitly retracted, especially when the retracted information explained something and the retraction leaves a gap. [secondhand:C33] Corrections that supply an alternative account tend to work better than bare negations. [secondhand:C34] A correction that says only "this was wrong" asks readers to hold a hole in their model of the world. Minds dislike holes and will often keep the old account sooner than live with one. A good erratum says what was wrong, what is right instead, and why the error was tempting.

**Corrections at the same volume as the error.** The Wicked Bible's correction was a court record. The error was a printed book. An error that spreads by headline has to be corrected by headline. Placement rules for corrections, whether in newspapers, journals or platforms, should match the reach of the original and should not be set by the convenience of the publisher. [normative:C35]

None of this guarantees success. Copies made outside any formal system, such as the memory of a dinner-table conversation, will never receive a forward link. But the fraction of the copying graph that runs through formal systems is growing. Every part of it that can carry a correction forward is a part where errors stop being permanent by default. [interpretation:C36]

---

## VIII. The Erratum in the Head

The hardest copy to correct is the one in your own mind.

A classic set of experiments by Ross, Lepper and Hubbard gave participants false feedback about how well they had performed a task. Afterward the researchers carefully explained that the feedback had been fabricated. Participants' beliefs about their own abilities still stayed partly shifted in the direction of the false feedback. [secondhand:C37] The explanation erased the evidence but not the conclusion. Once a belief has been formed it seems to acquire its own supports, such as reasons, memories and interpretations generated after the fact, and these survive when the original support is withdrawn.

That is Section II inside a single skull. The belief was copied from the evidence. When the evidence is retracted, the correction has to find every downstream inference built on the belief, and the mind keeps no index of those inferences. [model:C38] We do not remember which of our conclusions depended on which of our sources. We just believe things.

The bookkeeper's discipline suggests a personal practice. When you change your mind about something important, do not just replace the old belief. Make the reversing entry explicit. Say, at least to yourself, "I used to think X because of Y. Y turned out to be wrong. I now think Z because of W." Then ask what else you concluded from X. This is tedious, and nobody does it consistently. But it is the only way a single mind can follow its own arrows backward. [normative:C39]

There is also a gentler point. A mind that never records its own errors will remember itself as having been right all along. [conjecture:C40] That memory is comfortable and corrosive, because it removes the evidence that the mind is fallible, which is the evidence that makes careful thinking seem worth the trouble. A personal errata page is not a record of shame. It is a record of how one has learned. In the vocabulary of "How I Learned to Stop Worrying and Love the Maths," it is the part of the apprentice's ledger the apprentice keeps by hand.

---

## IX. The Errata Page

Early printed books often ended with a page of errata: a list of mistakes the printer had caught too late to fix in the text. "Page 47, line 12, for *seen* read *seem*." The errata page is a humble artifact, and it is easy to read as an admission of sloppiness. I think it is better read as a small act of integrity. The printer could not unprint the book. The printer could still make sure the correction traveled bound into the same volume as the error, so that every copy carried its own repair. [interpretation:C41]

That is the whole argument in one object. Errors cannot be prevented, and erasure is usually impossible and always dangerous. What can be done is to bind the correction to the error so that wherever one goes, the other goes too. Ledgers do it with reversing entries. Version control does it with reverts. The Mishnah does it by keeping the losing opinion. A good mind does it by writing down where it used to be wrong.

The Wicked Bible had no errata page. Its correction lived somewhere else, and so its error became immortal. Most of our errors are like that. The work of a knowledge culture is to make fewer of them so.

---

## Limits

The graph model in Section II is a simplification. Real knowledge spreads through channels that are not documents, and many of the most consequential copies, in memory, conversation and habit, will never carry a formal link. The empirical claims about retraction penalties (C21), continued influence (C33, C34) and the spread of false news (C17) are reported secondhand and should be checked against the primary literature, which has its own replication debates. The claim that copying errors drift toward plausibility (C16) generalizes a rule of thumb from textual criticism that critics themselves apply with caution, since scribes sometimes introduced difficult readings too. The suggestion that Brandolini's asymmetry follows from structure (C19) is conjecture. C28 needs specific historical examples before publication. Correction by addition has costs this essay does not weigh: privacy, the right to have harmful falsehoods removed, and the storage and attention burden of records that only grow. A ledger that never forgets can itself become an instrument of harm, and some erasures, such as of defamatory or private material, may be justified even though they sacrifice auditability.

---

## Claim Ledger

| ID | Claim | Status | Basis | Check |
|---|---|---|---|---|
| C1 | The 1631 "Wicked Bible" omitted "not" from the seventh commandment, and its printers were fined and lost their license | fact | Standard accounts of the edition and its printers, Barker and Lucas | Histories of English Bible printing |
| C2 | Mistakes usually travel with a text while corrections stay with the source | interpretation | Wicked Bible and later cases | Look for systems where the reverse holds |
| C3 | In most knowledge systems, links point the wrong way for corrections to follow | model | Section II graph model | Map the link direction in specific systems |
| C4 | A knowledge body can be modeled as a graph with arrows from document to source | definition | Stipulated | Not applicable |
| C5 | Corrections must travel against the direction of citation links, so systems built on such links spread errors more readily than retractions | derived | From C4 | Verify the inference |
| C6 | Citation indexes recover only formal reverse links and miss informal copies | interpretation | Scope of citation databases | Compare citation counts with uncited uses |
| C7 | Wakefield's 1998 *Lancet* paper was retracted in 2010 | fact | The journal's retraction notice | *The Lancet* archive |
| C8 | Retracted papers in general continue to be cited after retraction, often without acknowledgment | secondhand | Studies of post-retraction citation | Check bibliometric studies of retracted literature |
| C9 | Pacioli described double-entry bookkeeping in his *Summa* of 1494, codifying existing merchant practice | fact | Standard history of accounting | Read the *Summa* and its histories |
| C10 | Bookkeeping practice corrects errors with reversing entries, not erasure | fact | Accounting practice and doctrine | Any accounting text |
| C11 | Correction by reversal keeps error and correction in the same record | interpretation | Structure of ledgers | Inspect a reversed ledger |
| C12 | Git's revert adds a new commit and leaves history intact | fact | Git documentation | Git documentation |
| C13 | Rewriting shared history is palace-like and reverting is library-like | interpretation | Analogy to "The Palace and the Library" | Check whether the analogy sorts other cases |
| C14 | A record is self-correcting when errors are fixed by appending, not overwriting | definition | Stipulated | Not applicable |
| C15 | Textual criticism uses the rule *lectio difficilior potior* | fact | Standard method in textual criticism | Handbooks of textual criticism |
| C16 | Errors that survive repeated copying are selected for plausibility | interpretation; generalized from a rule of thumb | Direction of scribal error | Compare error types in manuscript traditions |
| C17 | False stories spread farther and faster than true ones on Twitter, partly through novelty | secondhand | Vosoughi, Roy and Aral [@vosoughi2018] | Read the study and its critiques |
| C18 | Refuting nonsense takes far more effort than producing it | secondhand; informal principle | Attributed to Brandolini | Not a formal result |
| C19 | Brandolini's asymmetry is a consequence of link direction and selection for survival | conjecture | Argument of Sections II and IV | No direct test |
| C20 | Authors avoid corrections partly because errors are read as evidence about persons | interpretation | Observed reluctance to correct | Survey authors about their reasons |
| C21 | Retractions reduce citations to authors' prior work, except when the authors reported the problem themselves | secondhand | Lu et al. [@lu2013] | Read the study and later replications |
| C22 | Correction is a public good with private costs | interpretation | Distribution of benefits and costs | Economic analysis |
| C23 | Corrections are undersupplied | derived | From C22 and standard public-goods reasoning | Compare correction rates with error rates |
| C24 | Systems that cannot attribute errors will assign them to the least powerful | interpretation | Incentives under ambiguity | Case studies of institutional error attribution |
| C25 | Mishnah Eduyot explains that minority opinions are recorded so a later court may rely on them | fact | Mishnah Eduyot, chapter 1 | Read the passage |
| C26 | Keeping rejected views lets a question be reopened later | interpretation | Reading of the Eduyot principle | Check later rabbinic use of minority opinions |
| C27 | A record that deletes on correction cannot recover from a wrong correction | derived | From C14 | Verify the inference |
| C28 | The scientific literature contains results that were widely doubted and later vindicated | needs-source; blocks publication | None cited yet | Collect documented cases |
| C29 | A correction system should keep original, correction and dissent side by side with their status | interpretation | Library analogy | Compare existing systems |
| C30 | Package managers record exact dependency versions and can flag known flaws downstream | fact | Lockfiles and vulnerability advisories in common package ecosystems | Package manager documentation |
| C31 | Some reference tools flag citations to retracted papers | secondhand | Reports of publisher and tool features | Check current reference-management tools |
| C32 | The claim ledgers in this series implement claim status but not status history | interpretation | Inspection of earlier essays | Compare the ledgers |
| C33 | People continue to rely on retracted information, especially when it explained something | secondhand | Continued-influence research [@johnson1994] | Read the literature |
| C34 | Corrections that supply an alternative explanation work better than bare negations | secondhand | Continued-influence research | Read the literature and its replications |
| C35 | Corrections should reach as far as the error did | normative | Argument of Section VII | Not applicable |
| C36 | Formal channels that can carry forward corrections make up a growing share of the copying graph | interpretation | Growth of machine-readable publication | Measure over time |
| C37 | False feedback shifts beliefs even after it is explained as false | secondhand | Ross, Lepper and Hubbard [@ross1975] | Read the study and its replications |
| C38 | Minds keep no index of which inferences depend on which sources | model | Analogy to Section II | Compare with research on belief revision |
| C39 | When changing one's mind, one should record the reversal explicitly and trace downstream beliefs | normative | Bookkeeping analogy | Not applicable |
| C40 | A mind that never records its errors will remember itself as having been right | conjecture | Reasoning from C37 and memory reconstruction | Study recall of past beliefs |
| C41 | Errata pages bound correction to error in the same volume | interpretation | Practice of early printing | Examine early printed books |

## Revision Log

| Date | Claim | Change | Reason |
|---|---|---|---|
| 2026-09-12 | All | Initial entries | First draft |

## References

- [@vosoughi2018] Vosoughi, Soroush, Deb Roy, and Sinan Aral. "The Spread of True and False News Online." *Science* 359, 2018.
- [@lu2013] Lu, Susan Feng, Ginger Zhe Jin, Brian Uzzi, and Benjamin Jones. "The Retraction Penalty: Evidence from the Web of Science." *Scientific Reports* 3, 2013.
- [@johnson1994] Johnson, Hollyn M., and Colleen M. Seifert. "Sources of the Continued Influence Effect: When Misinformation in Memory Affects Later Inferences." *Journal of Experimental Psychology: Learning, Memory, and Cognition* 20, 1994.
- [@ross1975] Ross, Lee, Mark R. Lepper, and Michael Hubbard. "Perseverance in Self-Perception and Social Perception: Biased Attributional Processes in the Debriefing Paradigm." *Journal of Personality and Social Psychology* 32, 1975.
- Pacioli, Luca. *Summa de arithmetica, geometria, proportioni et proportionalità*. Venice, 1494.
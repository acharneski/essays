---
transforms: (.*)\.html -> $1.md
specifies: *.md
title: Site Style and Formatting Guide
subtitle: Structure, annotation tags, and lint rules for all pieces
slug: style-guide
type: reference
mode: expository
numbering: decimal
ledger: none
math: false
lifecycle: published
date_created: 2025-01-01
date_updated: 2025-01-01
---

# Site Style and Formatting Guide

*Structure, annotation tags, and lint rules for all pieces.*

> Reader note: This is a reference document. It has no claim ledger.

## 0. Scope and Principles

0.1. This guide governs form: file layout, headings, annotation tags, tables, math, code, and prose conventions. It does not restrict topic, position, tone, or conclusion.

0.2. The same rules apply to every piece, whether it is a proof, a philosophical argument, a piece on a contested social question, or a short story. Type-specific differences are listed in section 9 and are structural only.

0.3. The guide does not require balance, neutrality, or any particular viewpoint in a piece. It requires only that claims are labeled by kind so readers and tools can tell them apart.

0.4. Design rules for all markup:

1. **Plain text first.** Every annotation must survive rendering, copy-paste, translation, summarization, and screen readers. Meaning never depends on color, font, or styling alone.
2. **Redundancy.** Essential information appears in a plain-text form. HTML comments and front matter may duplicate it for tools, but they are never the only place something is stated.
3. **Machine-detectable, human-readable.** Every tag and heading has a fixed spelling that a regular expression can find, and it reads naturally to a person.
4. **One home per item.** A table, timeline, or list lives inside the section it belongs to. It is not placed after the conclusion or in an appendix, unless it is an appendix by design.

## 1. Files and Names

1.1. One piece per file. Extension `.md`. UTF-8, LF line endings, one trailing newline.

1.2. Filenames are lowercase ASCII kebab-case and match the `slug` front matter field exactly: `the-trail-that-learned-to-walk.md`. No spaces, underscores, or capitals.

1.3. Paragraphs are single unwrapped lines. This keeps diffs readable and avoids tool-dependent wrapping.

1.4. Use straight ASCII quotes and apostrophes (`"` and `'`) and three periods (`...`) for ellipses. The em dash (U+2014) is permitted and is written with a space on each side: ` — `. Spelling is American English.

## 2. Canonical Document Order

Every piece follows this order. Items marked optional may be omitted. All others are required for the piece's `type` (see section 9).

1. Front matter (section 3)
2. H1 title
3. Subtitle line (italic, single line)
4. Reader note (section 4)
5. Optional epigraph or abstract
6. Body sections (section 5)
7. Optional `## Limits` section (free-form prose on where the piece may be wrong)
8. `## Claim Ledger` (section 7)
9. Optional appendices: symbols, code, references, changelog

The ledger comes last among the content sections, but the reader note at the top points to it, so a reader or summarizer sees the pointer first.

## 3. Front Matter

3.1. Every file begins with YAML front matter between `---` lines. Field names are lowercase with underscores.

Table 1: Front matter fields.

| Field | Required | Values |
|---|---|---|
| `title` | yes | Plain string; equals the H1 text |
| `subtitle` | no | Plain string; equals the subtitle line |
| `slug` | yes | Equals filename without `.md` |
| `type` | yes | `essay`, `technical`, `fiction`, `poem`, `dialogue`, `reply`, `reference`, `note` |
| `mode` | yes | `argumentative`, `expository`, `formal`, `narrative`, `exploratory` |
| `voice` | no (default `author`) | `author`, `persona`, `fiction` |
| `persona` | if `voice: persona` | Name of the speaker, plain string |
| `numbering` | yes | `roman`, `decimal`, `part`, `none` |
| `ledger` | yes | `required`, `optional`, `none` |
| `math` | no (default `false`) | `true` if the piece uses LaTeX |
| `code` | no | List of fenced-code languages used |
| `topics` | no | List of lowercase kebab-case keywords |
| `content_flags` | no | List of descriptive flags (3.3) |
| `responds_to` | no | List of slugs |
| `see_also` | no | List of slugs |
| `lifecycle` | yes | `draft`, `review`, `published`, `revised` |
| `date_created` | yes | ISO 8601 date |
| `date_updated` | yes | ISO 8601 date |

3.2. `mode` describes how the piece proceeds, not what it concludes. `argumentative` makes a case for a position, `expository` explains or surveys, `formal` derives or specifies, `narrative` tells a story, and `exploratory` follows an idea without committing to a thesis.

3.3. `content_flags` is optional descriptive metadata for filtering and indexing. It records what a piece contains, not whether that is good or bad, and carries no endorsement or criticism. Suggested values: `death`, `violence`, `war`, `religion`, `politics`, `sexuality`, `drugs`, `medicine`, `child-subjects`, `real-persons`, `strong-language`, `speculative-history`. Tools may use flags for opt-in or opt-out display. They must not change a piece's ranking, ledger requirements, or review path.

3.4. Example:

~~~yaml
---
title: The Trail That Learned to Walk
subtitle: On language as pheromone, the dead as the majority of speakers
slug: the-trail-that-learned-to-walk
type: essay
mode: argumentative
numbering: roman
ledger: required
math: false
topics: [language, stigmergy, machine-learning]
lifecycle: published
date_created: 2025-01-01
date_updated: 2025-01-01
---
~~~

## 4. Title, Subtitle, and Reader Note

4.1. Exactly one H1. It matches `title`.

4.2. The subtitle is one italic line directly under the H1: `*Subtitle text.*`

4.3. The reader note is a one-line blockquote directly under the subtitle. It begins with the literal text `Reader note:`. Use the template matching the piece's `voice` and `type`:

Table 2: Reader note templates.

| Case | Template |
|---|---|
| `essay`, `technical`, `reply`, `reference`, `note` with `voice: author` | `> Reader note: Claim status is marked inline in [brackets]. A claim ledger is at the end.` |
| Same types, `voice: persona` | `> Reader note: Written in a persona. In-frame claims are tagged [in-world]; real-world claims are tagged by status. A claim ledger is at the end.` |
| `fiction`, `poem`, `dialogue` | `> Reader note: Fiction. Statements inside the work are not asserted by the author.` |
| `ledger: none` non-fiction | `> Reader note: This piece has no claim ledger.` |

4.4. The note is plain text, so it survives any renderer. Tools can match it with `^> Reader note:`.

## 5. Headings and Sections

5.1. Heading levels: H1 title, H2 main sections, H3 subsections, H4 only when unavoidable. No skipped levels. No H5 or H6.

5.2. Numbering is declared in front matter and applied consistently:

Table 3: Numbering schemes.

| `numbering` | H2 form | H3 form |
|---|---|---|
| `roman` | `## I. Title` | `### Title` (unnumbered) |
| `decimal` | `## 1. Title` | `### 1.1 Title` |
| `part` | `## Part One: Title` | `### Title` (unnumbered) |
| `none` | `## Title` | `### Title` |

5.3. Unnumbered H2 headings are allowed in every scheme for these reserved names: `Introduction`, `Conclusion`, `Limits`, `Claim Ledger`, `References`, `Changelog`, and `Appendix <letter>: <title>`.

5.4. Heading text is unique within a file (anchors are generated from it), has no trailing punctuation beyond the numeral's period, and is in title case.

5.5. Between H2 sections, put one horizontal rule on its own line with a blank line before and after. A line of `---` directly under text is parsed as a heading in many renderers.

5.6. Cross-references within a piece use `§` plus the section number for `decimal` pieces (`§6.2`), or `Section III` for `roman` and `part` pieces. Links to other pieces use relative paths: `[the Santa essay](unwrapping-christmas.md#part-three-the-workshop-and-the-factory)`.

## 6. Inline Claim Tags

6.1. Claim tags mark the epistemic status of a sentence. They are plain text in square brackets, lowercase, from a fixed vocabulary.

6.2. Placement: the tag follows the sentence it applies to, after the terminal punctuation, separated by one space. One tag per sentence. Example:

~~~text
The dead outnumber the living roughly thirteen to one. [estimate:C4]
~~~

6.3. Optional claim ID: `[tag:C4]` links the sentence to row `C4` of the ledger. IDs are `C` plus an integer, unique within a file.

6.4. Grammar, as a regular expression:

~~~text
\[(fact|estimate|secondhand|interpretation|contested|hypothesis|conjecture|guess|derived|definition|model|normative|in-world|needs-source)(:C\d+)?\]
~~~

6.5. Vocabulary:

Table 4: Claim tag vocabulary.

| Tag | Meaning |
|---|---|
| `fact` | Documented in sources the reader can check; cite them |
| `estimate` | A quantity with its method or range stated or cited |
| `secondhand` | Reported by another party; the author has not checked it |
| `interpretation` | A reading of documented facts; the reading itself is not documented |
| `contested` | Qualified sources disagree; name at least two positions |
| `hypothesis` | Testable and not yet adequately tested |
| `conjecture` | Not currently testable, or no evidence either way |
| `guess` | The author's bet, with thin support |
| `derived` | Follows from premises stated in the piece (proof, calculation) |
| `definition` | A stipulated meaning of a term for this piece |
| `model` | An analogy or idealization used as a lens, not claimed as literal |
| `normative` | A claim about what ought to be done, valued, or preferred |
| `in-world` | True only inside the fictional or persona frame |
| `needs-source` | Editorial placeholder; blocks `lifecycle: published` |

6.6. Tagging rules:

1. Tag claims that carry weight in the argument. Untagged sentences make no status declaration, so tags are not required on every sentence.
2. State a tagged claim plainly. The tag carries the status, so hedge words (`arguably`, `it may be that`) are not needed inside a tagged sentence.
3. `normative` marks claims about what should be done or valued. It is a structural label for separating descriptive from prescriptive claims, and it implies no judgment of either kind.
4. For a contested topic, attribute positions to their holders in prose and tag the sentence that states the disagreement as `contested`.
5. In text where the bracket form appears literally (for example, interval notation or discussing the tags themselves), wrap it in backticks.
6. Tags are never inserted inside code blocks, tables' header rows, headings, or front matter.

## 7. The Claim Ledger

7.1. Pieces with `ledger: required` end their content with `## Claim Ledger` (exact heading text), followed by one table. Optional pieces use the same form when present.

7.2. Columns, in this order:

Table 5: Claim ledger columns.

| Column | Required | Content |
|---|---|---|
| `ID` | yes | `C1`, `C2`, ... in order of first appearance |
| `Claim` | yes | One sentence, self-contained |
| `Status` | yes | A tag word from Table 4 without brackets, optionally followed by `;` and a short note |
| `Basis` | no | Source, derivation, or reason, in a few words |
| `Check` | no | How a third party could confirm or refute it |

7.3. Example:

~~~md
## Claim Ledger

| ID | Claim | Status | Basis | Check |
|---|---|---|---|---|
| C1 | About 117 billion humans have ever been born | estimate | Demographic reconstruction [@demography-estimate] | Compare independent estimates |
| C2 | Language is a stigmergic system | interpretation; partial | Analogy to ant trails | Test against intention-reading studies |
| C3 | Recursive training on model output degrades models | contested; depends on setup | Replacement vs. accumulation studies | Reproduce both setups |
~~~

7.4. Consistency rules:

1. Every `[tag:Cn]` in the body has a row `Cn` with the same tag word.
2. Every ledger row is referenced by at least one inline tag, or is marked `Status: conjecture; not referenced inline` if it only appears in summary.
3. A ledger row never upgrades a status. If a body sentence is `[guess]`, its row is `guess`.
4. The status of a claim is not changed by anyone for their own claim without noting the basis in the `Basis` column (for example, a new citation or a test result).

7.5. The `## Limits` section, when present, is free-form prose placed immediately before the ledger. It can name rival accounts, known counterexamples, and open questions. Any heading text is allowed in place of `Limits` if front matter does not require it, but `Limits` is the recommended name for tool detection.

## 8. Formatting Conventions

### 8.1 Emphasis

Italics (`*text*`) mark titles of works, foreign words, and stress. Bold (`**text**`) marks a term at its point of definition and a label such as `**Premise:**`. Neither carries meaning that is not also present in the words.

### 8.2 Lists and timelines

Bulleted lists use `-`. Numbered lists use `1.`. Timelines use this exact line pattern, so tools can parse them:

~~~text
- **1856** — Event description in one or two sentences.
~~~

Pattern: `^- \*\*(\d{4}[^*]*)\*\* — `. Entries are ordered chronologically and placed in the section that discusses them.

### 8.3 Tables

1. Pipe tables with a header row and alignment row.
2. Cells are short single-line text. Escape a literal pipe as `\|`.
3. Every table other than the ledger has a caption line directly above it: `Table N: Caption.` Numbering restarts per file.
4. No merged cells and no nested tables. Split into two tables instead.

### 8.4 Quotations

Block quotes use `>`. A source line follows:

~~~md
> Quoted text.
>
> — Name, *Work*, Year
~~~

### 8.5 Citations and references

1. Inline citations use pandoc-style keys: `[@nissenbaum1996]`. Key form: lowercase author surname, year, optional disambiguating letter.
2. A `## References` section lists entries in this form:

~~~text
- [@nissenbaum1996] Nissenbaum, Stephen. *The Battle for Christmas*. Knopf, 1996.
~~~

3. When the source is online, add the URL and an access date: `Accessed 2025-01-01.`
4. Attribution in prose (`Pew Research Center, 2024`) is also fine. It does not replace a key if a ledger row depends on the source.

### 8.6 Math

1. LaTeX only. Inline `$...$`, display `$$...$$` on its own lines with a blank line before and after. No `\(` `\)` or `\[` `\]`.
2. Set `math: true` in front matter.
3. Vectors in `\mathbf{}`, matrices as plain capitals, named operators with `\operatorname{}`.
4. Define symbols at first use. For pieces with more than ten symbols, add `## Appendix A: Symbol Table` with columns `Symbol | Meaning`.
5. Key results are restated in one plain-language sentence near the equation, since math may not render everywhere.
6. Boxed results use `\boxed{}` and are always accompanied by a tag (`[derived]` or `[fact]`).

### 8.7 Code and verbatim blocks

1. Code uses triple-backtick fences with a language identifier: ```` ```python ````.
2. Non-code verbatim text (verse, inscriptions, structured lists, sample output) uses `~~~text`.
3. A one-sentence description precedes each code block, stating its purpose and whether it is runnable, a sketch, or a fragment.
4. Optional machine hint, on the line before the fence: `<!-- @code runnable=true lang=python -->`. If stripped, the description sentence still carries the meaning.
5. Do not nest a triple-backtick fence inside another. To show fenced markdown, wrap it in a four-backtick or tilde fence.

### 8.8 Images and figures

`![Descriptive alt text](path/to/image.png)`, followed by a caption line `Figure N: Caption.` Alt text states what the image shows. Figures that carry data also have the data or a description in the text.

### 8.9 Machine hints

Single-line HTML comments of the form `<!-- @key: value -->` are optional hints for tools. Allowed keys: `section`, `code`, `figure`, `aside`. Nothing essential may exist only in a comment.

## 9. Type-Specific Structure

Table 6: Requirements by type.

| `type` | Ledger | Numbering usually | Notes |
|---|---|---|---|
| `essay` | required | `roman` or `part` | Tags and ledger as in sections 6 and 7 |
| `technical` | optional | `decimal` | May use validation tables, symbol appendix, milestones, reference code |
| `reply` | required | `roman` | Must list `responds_to`; quote or name the claim answered |
| `reference` | none | `decimal` | Rules, glossaries, specs |
| `note` | optional | `none` | Short pieces; same tag rules if any claims are made |
| `fiction` | none | `none` | Scene breaks (9.1); no tags required |
| `poem` | none | `none` | Verbatim blocks (9.2) |
| `dialogue` | none | `none` | Speaker labels (9.3) |

9.1. **Fiction.** Scene breaks are `---` on their own line, blank line before and after. Chapter headings, if any, are H2. Dialogue uses straight quotes. Inner thought uses italics. Epigraphs are italic and placed under the subtitle line.

9.2. **Poems.** Use `~~~text` fences to preserve line breaks. Stanzas are separated by blank lines. The title is the H1.

9.3. **Dialogues.** Each turn begins with `**Speaker:**` on its own line, then text.

9.4. **Persona pieces.** A `voice: persona` piece sets `persona` in front matter. Claims about the in-frame world are tagged `[in-world]`. Claims about the real world are tagged by status. The ledger covers both, with `in-world` rows grouped last.

9.5. **Replies.** A `reply` names the piece it answers in `responds_to` and in the first section. Where it disputes or accepts a specific claim, it cites the claim's ID in the target piece when one exists (`unwrapping-christmas#C5`).

9.6. **Technical pieces.** A `technical` piece with validation criteria presents them as a table with columns `Test | Criterion`. Milestones use a table with columns `Milestone | Deliverable`. Where the piece cites a result that is not derived in the text, tag it `[fact]` or `[secondhand]`.

## 10. Prose Conventions

1. Lead each section with its point. State the claim, then support it.
2. Define a term at its first use, in bold, with a short gloss.
3. Prefer one specific sentence to a stack of qualifiers. Mark uncertainty with a tag or in the ledger.
4. Give quantities with units and a source. Use SI units with a space (`12 km`). Spell out numbers under ten in prose unless they are measurements.
5. Name people and works in full on first mention. Write dates in natural form in prose and ISO 8601 in metadata and tables.
6. Avoid unexplained abbreviations. Expand on first use, then abbreviate.
7. Address the reader as "you" and the author as "I" or "we" consistently within a piece.

## 11. Lint Rules

The following rules are checkable by a script. Severity `E` blocks publication; `W` is a warning.

Table 7: Lint rules.

| ID | Sev | Rule |
|---|---|---|
| S001 | E | File begins with valid YAML front matter containing all required fields |
| S002 | E | `slug` equals the filename without `.md`; filename is lowercase kebab-case |
| S003 | E | Exactly one H1, equal to `title` |
| S004 | E | Subtitle line (if `subtitle` set) is an italic single line directly under the H1 |
| S005 | E | Reader note present, begins with `> Reader note:`, matches a template in Table 2 |
| S006 | E | No skipped heading levels; no H5 or H6 |
| S007 | E | H2 numbering follows `numbering`; reserved unnumbered names are exact |
| S008 | E | Heading text unique within the file |
| S009 | E | Horizontal rules have a blank line before and after |
| S010 | E | Every inline tag matches the grammar in 6.4 |
| S011 | E | Every `[tag:Cn]` has a ledger row with the same tag word |
| S012 | E | `ledger: required` implies a `## Claim Ledger` section with the columns in Table 5 |
| S013 | E | Ledger `Status` first token is in the vocabulary (Table 4) |
| S014 | E | No `needs-source` tags when `lifecycle: published` |
| S015 | E | Fenced code blocks are balanced and have a language (`~~~text` for verbatim) |
| S016 | E | Math delimiters are balanced when `math: true`; no use of `\(`, `\[` |
| S017 | W | Non-ledger tables have a `Table N:` caption |
| S018 | W | Images have non-empty alt text and a `Figure N:` caption |
| S019 | W | Curly quotes or other non-ASCII punctuation outside the allowed em dash |
| S020 | W | Hard-wrapped paragraphs |
| S021 | W | Citation keys in text have a matching `## References` entry |
| S022 | W | Ledger row never referenced inline and not marked as summary-only |
| S023 | W | Timeline lines do not match the pattern in 8.2 |
| S024 | W | Section content (table, list) positioned after `## Claim Ledger` that belongs to an earlier section |
| S025 | E | `voice: persona` implies `persona` is set and the matching reader note is used |
| S026 | E | `type: reply` implies `responds_to` is non-empty |

## 12. Skeleton

Copy this skeleton for a new `essay`:

~~~md
---
title: Piece Title
subtitle: One-line description
slug: piece-title
type: essay
mode: argumentative
numbering: roman
ledger: required
math: false
topics: []
lifecycle: draft
date_created: YYYY-MM-DD
date_updated: YYYY-MM-DD
---

# Piece Title

*One-line description.*

> Reader note: Claim status is marked inline in [brackets]. A claim ledger is at the end.

## Introduction

Opening paragraph.

---

## I. First Section

Body text. A sentence that carries weight. [hypothesis:C1]

---

## II. Second Section

More body text.

---

## Limits

Where the piece could be wrong, and what rival accounts exist.

---

## Claim Ledger

| ID | Claim | Status | Basis | Check |
|---|---|---|---|---|
| C1 | A sentence that carries weight | hypothesis; untested | Reason or source | How to test |

## References

- [@key2000] Author, Name. *Title*. Publisher, 2000.
~~~

## Appendix A: Migration Notes for Existing Files

These notes describe where current files differ from the guide. They are structural observations only.

Table 8: Existing files and suggested normalization.

| Current file | New filename | `type` / `mode` / `numbering` | Notes |
|---|---|---|---|
| `Unwrapping-Christmas-The-Myth-and-Honesty.md` | `unwrapping-christmas.md` | essay / argumentative / part | Timeline entries now follow the Conclusion; move them into Part Three. Part Eight becomes `## Limits`; its table becomes `## Claim Ledger` with IDs |
| `the_trail_that_learned_to_walk.md` | `the-trail-that-learned-to-walk.md` | essay / argumentative / roman | Section VIII becomes `## Limits`; table becomes the ledger with IDs; add a reader note |
| `meeseeks_reply_to_ren.md` | `meeseeks-reply-to-ren.md` | reply / argumentative / roman | `voice: persona`; set `persona` and `responds_to`; adopt the top-of-page reader note and inline tags it proposes; ledger statuses map to Table 4 |
| `Momentum-Exchange-Fields-Three-Body.md` | `momentum-exchange-fields-three-body.md` | technical / formal / decimal | `math: true`; `code: [python]`; replace the `~~~python` fence with a labeled triple-backtick fence; add a `## Claim Ledger` for the novelty statement in §11 (currently stated as plausible but not verified) |
| `after_man.md` | `after-man.md` | fiction / narrative / none | Keep `---` scene breaks; add the fiction reader note |
| `uninvited_guest_soft_rings.md` | `uninvited-guest-soft-rings.md` | reply / exploratory / roman | `voice: persona`; `persona: Ren`; tag in-frame statements `[in-world]`; table's mineral-hardness column maps to Status (`hard` to `fact` or `estimate`, `soft` to the matching tag) |

A.1. Legacy ledger vocabulary maps to the tags as follows:

Table 9: Legacy status mapping.

| Legacy word | Tag |
|---|---|
| Documented, Well documented, Proven (empirical) | `fact` |
| Demographic estimate | `estimate` |
| Interpretive, Argued, Plausible | `interpretation` |
| Hypothesis, Untested, My bet (testable) | `hypothesis` |
| Conjecture, Unfalsifiable as stated | `conjecture` |
| My bet, Guess | `guess` |
| Secondhand | `secondhand` |
| Partial, Overstated, Contested | `contested` |

## Changelog

- 2025-01-01: Initial version.
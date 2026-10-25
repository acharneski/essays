# Expanse: A Workbench for Sculpting Backronyms

*Design document — product, interaction, data, algorithms, and system shape. Delivery target: a modern, offline-capable web PWA. No implementation code is specified here.*

---

## 1. The Idea in One Sentence

**An exhaustive lexicon decides which words are possible. Embeddings decide the order you see them in. A human decides what survives. Only then does a solver or an LLM search the combinations.**

Most "acronym generators" work like a slot machine: you type `MAYHEM` and a theme, and it returns twenty expansions. The model supplies the vocabulary, so you get the same obvious Y-words every time (*your, yet, yield*), and you can never tell what was left out.

Expanse inverts that. Every position in the acronym is a sorted, browsable list of *every* candidate word beginning with that letter. Semantic guidance changes the sort order and never changes what is in the list. You cull these lists Lightroom-style, starring, marking "maybe", or hiding. Over a few hundred quick decisions you turn an astronomically large space into a few million coherent combinations. That is a space a beam search or an LLM can explore well, because it is now doing **compositional search** (its strength) instead of **lexical recall** (its weakness).

Everything up to that last step runs on the user's device, offline, with nothing sent anywhere. The LLM is an optional guest, not the engine.

The working analogy: **OneLook × constraint solver × Lightroom culling × LLM.**

---

## 2. Landscape and Positioning

Several existing tools cover parts of this design. None covers the whole pipeline.

| Capability | Who has it |
|---|---|
| Starting-letter constraint + semantic ordering | OneLook (`bl*:snow`; filter by first letter, order by similarity, popularity, modernness, formality) |
| "Phrases that spell out" an acronym | OneLook `expand:nasa` |
| Meaning + spelling constraints as an API | Datamuse (e.g., *words related to duck that start with b*) |
| Themes, word-type styles, per-letter pinning, regenerate one slot | MiniWebtool, NameAcronym, Webuify, Musely |
| AI-generated expansions with tone/industry | Musely and many others |

These tools do not offer:

- A **persistent, exhaustive candidate list per acronym position**.
- **Global and per-slot guide words** acting as embedding poles, both positive and negative.
- Ranking that **preserves the entire lexical set** and only reorders it.
- **Four-state curation** (unreviewed / ★ / ? / ×) per positional vocabulary.
- Treating the curated vocabularies as an explicit **Cartesian search space** with a visible size.
- Handing that bounded space to a solver or LLM, with **validation and provenance**.
- An **explanation layer** for why each word and each expansion holds together.
- **Fully local operation.** Nothing about a confidential project name or its guide words leaves the device unless the user explicitly invokes an LLM.

The differentiator is the middle layer: interactive semantic sculpting over an exhaustive lexical state space. That positioning matters most to the users who care about it most: enterprise, defense, and academic teams naming unannounced work. For them, "not an opaque LLM wrapper, works offline, and can show its arithmetic" is the product. The core invariant:

> **Semantic similarity changes ordering, never membership.**

The invariant pays off in three ways at once:

- **Architecturally**, each slot's candidate set is static and read-only for the life of a project. Re-ranking is a pure permutation over a fixed array: no reallocation, no re-indexing, no network.
- **Psychologically**, it removes the failure mode of black-box generators, which is mode collapse and the nagging fear of missing out. If a better Y-word exists, it is in the column. The human is the taste-maker, and recall is guaranteed.
- **In the interaction**, pairing the invariant with frozen sort stability (§5.6) and a keyboard culling loop (§9.3) turns a space of $10^{19}$ combinations into a fast, deterministic workflow.

The invariant also needs an honest caveat. In a 50,000-word column where people realistically inspect the top 300–500 ranks, **ranking is de facto membership**. A word at rank 31,000 is technically present and practically invisible. Exhaustiveness is therefore a promise the design has to keep actively, not a property it gets for free. The serendipity row (§9.3), reversible top-N view windows instead of destructive cuts (§5.7, §9.3), visible pass markers, and the two-tier safety taxonomy (§4.1) all exist so that the long tail stays reachable and the ordering's biases stay visible.
The caveat reaches one step further, into curation itself. Stars and hides land on words the user has seen, and the words a user sees are the top of the ranking. Over a session, the ordering therefore shapes which words end up starred. A star in an 8,000-word column is the strongest membership decision the product has. This is true of any ordered list, including alphabetical or frequency order, so it is not a flaw peculiar to embeddings. It does mean the invariant has to be stated precisely: **no automated process ever consults the ranking to add, remove, or hide a candidate; the ranking influences curation only through what the human is shown.** A tempting feature such as "hide everything off-theme" is therefore built as a reversible view fold (collapsed, still searchable, still available to the solver), never as a filter. It also means the instruments that keep the long tail visible matter more, not less.
The caveat reaches one step further, into curation itself. Stars and hides land on words the user has seen, and the words a user sees are the top of the ranking. Over a session, the ordering therefore shapes which words end up starred. A star in an 8,000-word column is the strongest membership decision the product has. This is true of any ordered list, including alphabetical or frequency order, so it is not a flaw peculiar to embeddings. It does mean the invariant has to be stated precisely: **no automated process ever consults the ranking to add, remove, or hide a candidate; the ranking influences curation only through what the human is shown.** A tempting feature such as "hide everything off-theme" is therefore built as a reversible view fold (collapsed, still searchable, still available to the solver), never as a filter. It also means the instruments that keep the long tail visible matter more, not less.

---

## 3. Domain Model

### 3.1 Entities

**Project**
- `acronym`: the target string, e.g. `MAYHEM`. Case and punctuation are normalized. Repeated letters are separate slots (M₁, M₂).
- `global guides`: the semantic field for the whole work, e.g. *email, classification, relevance, professional, filtering*.
- `concept brief`: a free-text description of what the acronym names. The LLM uses it; ranking never does.
- `style constraints`: register, allowed templates, banned categories.
- `slots[]`, `expansions[]`, `event log`.

**Slot** (one per letter position)
- `letter`, `index`.
- `slot guides`: local poles, e.g. Y: *+result +extract +produce −agriculture −finance*.
- `lock`: an optional fixed word, e.g. H = *Heuristic* 🔒.
- `recursive`: whether the acronym itself is allowed here (M₁ = *MAYHEM*).
- `POS allowance`: which parts of speech fit this position, usually inferred from the selected template.
- `ranking weights`: an optional override of the global α/β/γ/δ.

**Lexical Entry** (shared across projects)
- `surface form`, `lemma`, `inflection` (e.g., *yielding* → *yield* + *-ing*).
- `derivational root`: the stem shared across derivations (*mail* / *email*, *compute* / *computational*). The torture index uses it to catch disguised repetition that lemma identity misses.
- `POS set`: an explicit fine-grained tag set per **surface form**, not per lemma, so the solver can tell *yields* as a verb (third-person singular) from *yields* as a plural noun.
- `frequency` (log-scaled), `register` (formal / neutral / informal / slang / archaic / technical), `modernness`.
- `flags`: proper noun, abbreviation, obscure, malformed, coined, user-added, plus a **two-tier safety flag** (`slur/hate` or `sensitive/contextual`; §4.1).
- `atom type`: single word, or **multiword atom** (*high relevance*, *machine learning*). Single-slot atoms fill one slot with their first letter and count as one acronym letter. They are **off by default**, because filling H with *High relevance* quietly smuggles an R into `M A Y H(R) E M` and confuses boundary grammar and adjacency scoring. **Spanning collocations**, where one atom covers several letters (*Electronic Mail* for E+M), are the more honest form and are covered in §6.6.
- `sense hints`: short glosses used in the inspector and for sense disambiguation.

**Candidate State** (per project × slot × entry)
- `unreviewed` (default), `★ preferred`, `? maybe`, `× hidden`.
- A star means "actively promising", not merely "not eliminated". *Maybe* exists so the star tier stays meaningful during passes over thousands of words.
- Hidden words are never deleted. They remain searchable and restorable.
- These states are **strictly project-scoped**. A word hidden in one project carries no weight in the next.

**Banish List** (per user, across projects)
- A small, explicit user-level blocklist for entries the user never wants to see again in any project: OCR junk, malformed forms, personally objectionable words. Banishing is a separate, deliberate action (§9.3), never a side effect of hiding. Banished entries remain recoverable from a settings view.

**Guide**
- `term` (a word or phrase), `polarity` (+/−), `weight` (default 1), `scope` (global or a specific slot).
- `resolved vector`, including the method used if the term was out of vocabulary (subword composition or phrase averaging).
- `sense check`: the term's nearest neighbors, shown so the user can confirm the intended sense.

**Expansion**
- An ordered tuple of entries, one per slot, plus the template it matched and its score breakdown.
- `origin`: manual composer, local search, or LLM.
- `validity`: whether every token is in the current ★ (or ★+?) set, with any violations listed.
- `state`: candidate / pinned / rejected, plus user notes.

**Event Log**
- An append-only record of every curation action, guide edit, search run, and LLM call. It is the source of undo/redo, provenance ("starred at 14:02 during Y pass, rank 37, under guides v3"), and sharing.
- Each curation event records both the entry's identifier **and its surface string**. That lets a project survive a lexicon upgrade (§10.2).

### 3.2 State Boundaries

- **Source of truth:** lexicon (read-only, versioned) + project document + event log.
- **Derived and disposable:** rankings, search results, explanation caches.
- **Advisory only:** LLM output. It never mutates curation state without an explicit human action.

---

## 4. Data

### 4.1 Lexicon Construction

The lexicon must be *lexically exhaustive* for reasonable professional and creative use:

   A lock and a slot with exactly one star look identical today but behave differently later. A lock keeps the slot closed when a lexicon upgrade or a relaxed filter adds new H-words. Stars leave room for newcomers to appear, unreviewed, in the column. The stored action records intent, not just the current set.
1. **Base word list.** A large open English word list, merged with frequency data from a broad corpus.
2. **Inflections.** Generated or attested forms (*yield, yields, yielded, yielding*). They are grouped under their lemma in the UI so one decision can apply to the family or to a single form. Each surface form carries its own POS tags. Generated forms are checked against attestation, because a morphology rule that invents *yieldeds* or misses *yeses* erodes trust in "exhaustive" from both directions. Initial-letter rules are explicit as well. Hyphenated and variant spellings (*e-mail* / *email*, *X-ray*) are listed under every letter they can plausibly fill, the rule is shown in the inspector, and a word can be moved to another slot by hand. A silent rule that files a word under the wrong letter removes it as surely as a missing entry.
3. **Technical vocabulary.** Computing, science, business, and legal terms. Domain packs can be toggled per project.
4. **Abbreviations and proper nouns.** Included but flagged, and hidden-by-default filters (not removed) in professional register. Every default filter shows a per-slot count with one click to inspect ("Y: 214 proper nouns hidden · show"). A filter the user never chose is still a decision about what they see, so it has to be visible.
5. **Multiword atoms.** High-PMI collocations from corpus n-grams (*yield curve*, *high relevance*, *email management*), filtered to two or three tokens and gated by PMI and frequency thresholds so they do not swamp the single-word columns. Single-slot use is an opt-in per project. Spanning use (§6.6) is indexed by initialism signature.
6. **User vocabulary.** Words added by hand, including coinages, product names, and jargon. They are first-class entries with a `user-added` flag.
7. **Safety layer.** A single binary "offensive" flag fails in both directions. It lets real harm through, and it produces Scunthorpe-style false positives on legitimate technical vocabulary (*execution*, *master/slave* in older engineering texts, reclaimed identity terms such as *queer* or *dyke*). The lexicon therefore uses two tiers:
   - **`slur/hate`**: excluded from the default view, from sense previews, and from LLM payloads unless the user explicitly opts in. Still never deleted.
   - **`sensitive/contextual`**: visible, with a badge explaining why, and down-ranked only when the project register is "Professional".

   The solver adds a **bigram blocklist** on top of this (§6.3), because two individually benign words can combine into something they were never meant to say.

**Licensing shapes the supply chain.** A client-side PWA that downloads its data shards is *redistributing* that data publicly, and that excludes several sources that are common in research. Frequency lists derived from SUBTLEX (as bundled in some popular frequency packages) and COCA are non-commercial or proprietary, so they are out. Meta's pretrained FastText vectors and Wiktionary-derived dictionaries (e.g. Kaikki extracts) are CC-BY-SA. They can be used, but data shards must be kept strictly separate from application code, and the app must display attribution. The cleaner long-term option is to train custom embeddings on permissively licensed corpora (Apache 2.0 or ODC-BY collections such as Dolma or FineWeb), with open frequency sources like Google Books n-grams and WordNet for senses.

Realistic slot sizes: a common letter (S, C, P) has 30–60k entries including inflections and atoms. A rare letter (X, Y, Z) has a few thousand. The Y slot in the running example has about 8,400 entries, ending around *yttriferous*. These sizes also set the solver's cost (§6.4), so the build pipeline reports actual per-letter and per-POS counts rather than assuming them.

### 4.2 Annotations Per Entry

| Field | Use |
|---|---|
| POS tags (per surface form) | template matching, slot compatibility |
| derivational root | torture index (disguised repetition) |
| log frequency | lexical prior, obscurity filtering |
| register / formality | professional-tone constraint |
| modernness | penalize archaic forms |
| safety tier | default views, LLM payloads, register penalties |
| concreteness (optional) | stylistic control |
| syllables, length | memorability and rhythm scoring |
| gloss / senses | inspector, sense disambiguation |

### 4.3 Embedding Index

- **Primary vectors: FastText-style subword embeddings, with subwords used carefully.** Subwords give vectors to rare, derived, technical, and coined words, which Word2Vec's word-type vocabulary cannot. A user's coinage like *yieldify* still gets a sensible position.
- **The orthographic trap.** Inside a single letter column, character n-grams are actively harmful. Every candidate shares its opening letters by construction, so a guide like *+yawn* would lift *yawl*, *yarrow*, and *yawp* only because they share the subwords for "ya" and "yaw". In-vocabulary lexicon vectors are therefore built with character n-grams **stripped or heavily down-weighted**. Subword composition is reserved strictly for out-of-vocabulary guides and coinages, where spelling is the only evidence available.
- **Multiword atoms:** use a native phrase vector if one exists. Otherwise use a weighted average of component vectors (SIF weighting, which down-weights frequent tokens).
- **Post-processing before quantization.** Raw embedding spaces are dominated by a few frequency-correlated directions, which create "hub" words that sit near everything and amplify corpus biases around gender, race, and frequency. Before dimensionality reduction and int8 quantization, the build applies **"All-but-the-Top" post-processing**, which removes the top two or three principal components. Plain PCA would compress the space while keeping those distortions.
- **Build-time sense splitting.** For roughly the 5,000 most polysemous words, the build emits **two or three sense-specific vectors** derived from WordNet synsets (*yield* as output, *yield* as traffic, *yield* as finance). Runtime sense steering (§5.2) works much better when the senses are already separated.
- **Normalization:** every vector is L2-normalized at build time, so cosine similarity reduces to a dot product.
- **Optional second space:** a contextual sentence-embedding model applied to *glosses*. This gives sense-aware similarity and is used as a re-ranking feature, not as the main index.

### 4.4 Size Budget and Storage for a PWA

Assume 250k entries:
- 300-d float32 vectors ≈ 300 MB. This is not acceptable.
- 128-d int8 after post-processing, PCA, and scalar quantization ≈ **32 MB** total.
- Vectors are **sharded by first letter**. A project downloads only its letters. `MAYHEM` needs M, A, Y, H, E: roughly 5–9 MB for vectors and a few MB for annotations.

Letter sharding solves the candidate side, but two kinds of data cross letters and need their own artifacts:

**Cross-shard guide resolution.** Guides do not respect the acronym's letters. If the acronym is `MAYHEM` and the user adds *+filtering*, the F shard has never been downloaded, and the §9.4 sense preview ("8 nearest neighbors in the full lexicon") cannot scan all 26 shards on a phone. The app shell therefore ships a **global guide index** of about 6 MB compressed. It holds the top ~50k words and ~30k pruned morphological subwords, so any guide or out-of-vocabulary coinage resolves locally and instantly. Each entry's top-8 nearest-neighbor IDs are **precomputed at build time**, so sense previews cost a lookup instead of a scan.

**Adjacency scoring.** The phrase score (§6.3) needs bigram PMI between neighbors. A naive sparse PMI matrix over 250k words is 100–500 MB, and it cannot be sharded by starting letter because transitions run between arbitrary slot letters (M → A → Y). The design compresses adjacency into a single global artifact of about **4.5 MB**: the top ~2.5 million positive-PMI *lemma* bigrams, stored in a static minimal perfect hash or 8-bit XOR filter with 8-bit quantized PMI values, plus a small 16 × 16 POS-transition table for grammatical plausibility when a specific pair is absent. An alternative, if lookup quality disappoints, is asymmetric low-rank (32-d int8) "left" and "right" collocation vectors stored inside each letter shard, so the PMI of any pair is approximated by a dot product.

**Storage format.** Shards are compact binary buffers, not JSON. Each shard has a contiguous block of int8 vectors, column-oriented typed metadata (frequency, register, POS tags, flags), and a single string buffer. They are aligned so a worker can use them in place without parsing. Shards are stored in IndexedDB or the origin-private file system, and the app requests **persistent storage** so mobile browsers, iOS Safari in particular, do not evict a user's offline lexicon under storage pressure.

A full `MAYHEM` working set is therefore about 20 MB: letter shards, the global guide index, and the adjacency artifact.

Ranking cost: scoring a 50k-entry slot against a handful of guides takes about 50k × 128 × |G| multiply-adds. With int8 SIMD dot products in a WebAssembly worker, plus single-pass (Welford) z-normalization and an in-worker index sort, a full re-rank takes about **5 ms**, well inside the 20 ms budget. Re-ranking is effectively instant.

---

## 5. Ranking Mathematics

### 5.1 Composite Rank

For entry $w$ in slot $i$:

$$R_i(w) = \alpha\, \hat S(w, G_{\text{global}}) + \beta\, \hat S(w, G_i) + \gamma\, P(w) + \delta\, U_i(w)$$

- $S$: guide similarity (§5.2).
- $P$: lexical prior (§5.4).
- $U_i$: user-feedback term (§5.5).
- Hats denote **per-slot z-normalization** (§5.3).

Default weights: $\alpha=0.35,\ \beta=0.45,\ \gamma=0.15,\ \delta=0.05$. When a slot has no local guides, $\beta$'s weight moves to $\alpha$.

### 5.2 Guide Similarity With Positive and Negative Poles

Let $G^+$ and $G^-$ be the positive and negative guides, with weights $\lambda_g$ and $\mu_g$. Let $c(w,g)=\cos(\mathbf w,\mathbf g)$.

**Positive aggregation: soft-max, not mean.** A word should rank highly if it is close to *any* guide, not only to the centroid. The centroid of *result, extract, produce* can land somewhere generic.

$$S^+(w) = \tau \log \sum_{g \in G^+} \lambda_g\, e^{c(w,g)/\tau}$$

The temperature $\tau$ moves this between the mean (large $\tau$) and the max (small $\tau$). A default of $\tau = 0.1$ behaves like a forgiving max. The UI exposes this as **"Match: any guide ↔ all guides"**.

**Negative aggregation: hard max.** One strongly matching negative pole should be enough to push a word down.

$$S^-(w) = \max_{g \in G^-} \mu_g\, \max(0, c(w,g) - \theta)$$

The threshold $\theta$ (≈ 0.2) keeps negatives from penalizing words that are only faintly related.

$$S(w,G) = S^+(w) - \eta\, S^-(w)$$

**Sense steering (optional "project out" mode).** For polysemous guides, the user can subtract a sense direction from the guide itself instead of penalizing candidates:
$$\mathbf g' = \frac{\mathbf g - \sum_{n\in G^-} \kappa_n (\mathbf g\cdot\mathbf n)\,\mathbf n}{\|\cdot\|}$$
With *+yield −agriculture −finance*, this keeps the output/result sense of *yield* as the guide while removing the crop and interest-rate senses from the neighborhood. With this, *yield* itself ranks well in the Y slot while *yam*, *yeoman*, and *yen* sink.

Linear subtraction has a known limit. When one sense dominates a word's corpus usage (say 95% of occurrences), the minority sense is not cleanly recoverable from a single static vector, and projection leaves residual noise. Where a guide has build-time sense vectors (§4.3), the sense preview offers them directly ("yield — *output*", "yield — *finance*"), and projection becomes a fine-tuning tool rather than the only remedy.

### 5.3 Per-Slot Normalization

Raw cosine distributions differ by letter: rare letters have heavy tails of obscure forms. Unnormalized scores would let one term dominate inconsistently across slots. Each similarity component is therefore z-scored over the slot's full candidate set:
$$\hat S = \frac{S - \mu_{\text{slot}}}{\sigma_{\text{slot}}}$$
With this, the weights mean the same thing in every column, and "rank 40 in Y" and "rank 40 in M" are comparable in percentile terms.

### 5.4 Lexical Prior

$$P(w) = a\,\widehat{\log f(w)} + b\,\text{register}(w) + c\,\text{modern}(w) - d\,\text{flags}(w) - e\,\max(0, \text{len}(w) - L)$$

The prior keeps *yttriferous* at the bottom without removing it. Register is matched against the project's register setting. "Professional" rewards formal and technical entries, penalizes slang, and applies the down-rank for `sensitive/contextual` entries.

### 5.5 Feedback From Culling (Relevance Feedback)

Curation is a signal. Following Rocchio-style relevance feedback, starred and hidden words in a slot define implicit poles:
$$\mathbf u_i = \frac{1}{|\star_i|}\sum_{w\in\star_i}\mathbf w \;-\; \rho\,\frac{1}{|\times_i|}\sum_{w\in\times_i}\mathbf w$$
$$U_i(w) = \cos(\mathbf w, \mathbf u_i)$$

The two sums are maintained as running totals, so starring or hiding a word is a constant-cost vector update. Nothing rescans the starred set.

This is also why hiding is not neutral. **Passing** over a word (moving on without a decision) teaches the ranker nothing. **Hiding** a word repels its neighbors. The cull UI labels the two actions accordingly (§9.3).

Guardrails:
- $\delta$ is small by default, and feedback is **off until 5+ stars** in that slot.
- The feature is always visible as a chip ("Learning from your stars: on") and can be switched off.
- Global feedback is optional: stars from every slot can form an extra soft global pole that captures the "vibe" of the project.

### 5.6 Sort Stability

Re-ranking while someone is culling makes the list jump under the cursor, which destroys flow. Rules:
- The visible order is **frozen** during a culling pass.
- Guide edits and feedback build a *pending* ranking. The UI shows "Ranking changed · 212 words moved · Apply" with a diff preview: which words rose and which fell.
- Applying keeps the **viewport anchored at the current numeric rank and pass marker**. If you were at rank 46, you are still at rank 46 in the new ordering, so the pass continues where your attention stopped. You are not thrown to wherever your last word moved. That word gets a quiet hint ("*yardstick* moved to rank 1,204 · jump") in case you want to follow it.

Internally, each slot keeps an active order and a pending order, each with an inverse rank lookup, plus a compact per-entry curation state. Diffs, rank lookups, and "rank X of N" announcements are therefore constant-time.

### 5.7 The Search Space Meter

With $k_i$ = the number of starred candidates in slot $i$ (locked slots count as 1):
$$|\Omega_\star| = \prod_i k_i$$

A slot with no stars yet counts as **1**. Its rank-1 unhidden word acts as a provisional stand-in, shown in muted italics wherever it appears. Without this rule, a brand-new project's meter reads 0 and every live preview is empty, which is exactly the moment the user most needs to see the idea working.

Running example:

| Slot | M₁ | A | Y | H | E | M₂ |
|---|---|---|---|---|---|---|
| ★ | 14 | 31 | 18 | 1 🔒 | 22 | 27 |

$14 \times 31 \times 18 \times 1 \times 22 \times 27 = 4{,}640{,}328$ expansions, reached after the human has judged only about 110 individual words.

For comparison, the uncurated space at around 2,000 viable words per slot is $2000^6 = 6.4\times10^{19}$. Culling has collapsed it by roughly 13 orders of magnitude.
It is worth being precise about what that collapse buys. The search in §6 can be exact over whatever it is given, so a smaller space does not buy correctness. It buys two other things. The first is compute, because search cost grows with the product of neighboring slot sizes. The second is a narrower objective: every star is a piece of taste the scoring function could not have known. The arithmetic is also lopsided. Hiding one word from an 8,000-word column moves the log bar by about a ten-thousandth of an order of magnitude. Starring 18 words, locking one, or narrowing a view window moves it by several orders. The meter therefore shows a per-slot breakdown next to the total, so a hide in a 40-word star list reads as meaningful and a hide in a full column does not pretend to be.


The meter shows three numbers: ★ only, ★ + ?, and **active pool**. The active pool is the product of each slot's current top-N view window (e.g. "top 500"), minus hidden words. An earlier draft showed the count of all unhidden words. Because Expanse forbids destructive bulk hiding, that number stays near $10^{18}$ forever and tells the user nothing. The active pool reflects the part of each column the user has actually chosen to work in. It moves when they narrow or widen a window, and it never deletes anything.

The meter uses a log-scale bar with tractability bands:
- **< 10⁴:** exhaustively enumerable and scorable locally, instantly.
- **10⁴–10⁸:** local beam / branch-and-bound search; LLM search over a sample.
- **> 10⁸:** keep culling. The meter shows which slot dominates, i.e., where one more pass would shrink the space most.

---

## 6. Combinatorial Search Over the Curated Space

### 6.1 Principle

> **The model proposes neighborhoods; the solver owns the search.**

Even when "exhaustive" in principle, the search never materializes the full Cartesian product. It walks the slots left to right and prunes each branch as soon as grammar, adjacency, register, or semantics fail.

### 6.2 Syntactic Templates

Templates are POS sequences with optional function words. Function words sit *between* acronym letters and do not consume them:

- `[Adj|N] [N] [N] Heuristic for [N] [N]`
  → *Mail Analysis Yield Heuristic for Email Management*
- `[N] [N] [N] [N] [N] [N]` (noun stack, common in technical names)
- `[V-ing] [Adj] [N] …` (gerund-led)
- Recursive: `MAYHEM [N] [N] [N] [N] [N]` when M₁ is set to recursive.

Each template compiles to a small finite-state automaton over POS tags. A partial expansion is a state in that automaton, so slot candidates with incompatible POS are pruned at the slot, before any scoring. Because tags live on surface forms, *yields* survives as a plural noun in a noun stack and as a verb in a verb-led template, each for the right reason. The POS-transition table from §4.4 gives a soft plausibility score to transitions that the template allows but the corpus rarely shows. The connector "for", "of", "and", or "via" is chosen per template and is editable. Users can enable a template library, and later write their own in a simple pattern notation in the UI.
Connectors are modelled as labels on the transition between two letter slots, not as slots of their own. The search state is still "the previous content word", so the adjacency between *Heuristic* and *Email* is scored across "for" instead of being lost behind it, and the solver stays as cheap as it would be without connectors. Templates may also carry a leading or trailing connector (*The …*). Connectors come from a small closed class, so allowing them costs a constant factor, not a new dimension. Because a template removes words by part of speech, each column shows how many entries the active template excludes ("template hides 3,412 · inspect"). A tagging error should be something the user can find.


### 6.3 Phrase Score

For expansion $x = (w_1,\dots,w_n)$ under template $t$:

$$\Phi(x) = \underbrace{\textstyle\sum_i R_i(w_i)}_{\text{word quality}} + \omega_1\underbrace{\textstyle\sum_i \text{PMI}(w_i, w_{i+1})}_{\text{adjacency naturalness}} + \omega_2\, \underbrace{\cos(\bar{\mathbf x}, \mathbf G_{\text{global}})}_{\text{whole-phrase fit}} + \omega_3\, \text{Coh}(x) - \omega_4\, \text{Torture}(x) + \omega_5\, \text{Rhythm}(x)$$

- **Adjacency:** smoothed lemma-bigram PMI between neighbors, read from the compact adjacency artifact (§4.4). *Yield heuristic* is a recognized compound and is rewarded. Missing bigrams fall back to the POS-transition prior with a mild penalty, not a veto.
- **Coherence:** mean pairwise similarity of the content words, so the phrase reads as being about one thing. It is maintained incrementally as each word is added.
- **Torture:** the "acronym torture" index. It rises with obscure words in key positions, forced function-word stacking, very long words, filler words chosen only for their letter (*Yonder*), and repeated **roots**. Root comparison uses derivational stems, not lemma identity, so *Mail … Email* and *Compute … Computational* are caught.
- **Rhythm:** syllable balance and stress patterning, including the connector's syllable, which is often where a phrase's rhythm is made or broken. Words missing from the pronunciation data get a default stress and are flagged in the explanation instead of being silently mis-scored. Light weight; mostly a tiebreaker.

A **bigram blocklist** runs alongside scoring. Any adjacent pair, or pair across a connector, that forms a slur or unfortunate phrase is vetoed outright, even when both words are individually benign.

### 6.4 Search Algorithms

- **Exhaustive** when $|\Omega| < 10^4$: score everything and sort.
- **Beam search** (width 200–2,000), **strictly left to right**, carrying automaton state. Expanding in template order keeps POS transitions, adjacency PMI, and incremental coherence exact at every step. An earlier draft proposed expanding the most constrained slot first. That heuristic is incompatible with this scoring model, because the adjacency and grammar terms of an out-of-order slot cannot be evaluated until its neighbors exist. Locks still help, since a locked slot's transitions become constants, but they do not change the walk order.
- **A\* / branch-and-bound** for top-K exact results. The admissible bound comes from a **backward dynamic-programming (Viterbi) pass** over the Markovian terms, word quality plus neighbor adjacency, computed once per search from right to left. Each partial expansion's bound is its current score plus the best achievable completion from its slot onward. That bound is cheap and much tighter than summing independent per-slot maxima.
- **Final rerank:** the top ~2,000 surviving paths are rescored with the full $\Phi(x)$, including the non-Markovian whole-phrase, coherence, and torture terms.

Two clarifications keep the solver honest.

**"Exact" means optimal under Φ, not best.** Φ's weights are hand-set defaults, and its Markovian core scores neighbors, not whether the whole phrase means something. Every results list states its mode (exhaustive, A\* exact, or beam), and an exact list is labelled "exact under current weights". The header also lists which active terms are embedding-derived. An **embedding-free** toggle sets those terms to zero, leaving the lexical prior, adjacency counts, grammar, and rhythm, so the user can see how much of a result comes from the embedding model at all. Whenever those terms carry weight, swapping the embedding model changes the results, exact search or not. The toggle makes that dependence visible instead of pretending it away.

**Cost scales with neighboring slot sizes.** Search work grows with the product of adjacent slots' sizes, so locks and star sets shrink it sharply and individual hides barely touch it. After a change in one slot, only the forward and backward messages that cross that slot are recomputed. Phase 0 measures real latency on full columns before any shortcut is adopted, such as approximate nearest-neighbor lookups inside the solver or low-rank adjacency. Each shortcut would be one more place where a good phrase could silently fall out of reach.

### 6.5 Diversity

Phrases that differ only in their connector ("for" versus "via") are first collapsed into one result with a connector toggle. Even then, the top 50 by raw score are often near-duplicates (the same phrase with *Analysis* swapped for *Assessment*). Results are re-ranked with **Maximal Marginal Relevance**:
$$\text{MMR}(x) = \lambda\,\Phi(x) - (1-\lambda)\max_{y \in \text{selected}} \text{overlap}(x,y)$$
where overlap counts shared tokens and their embedding similarity. Results are then grouped into clusters ("Yield-family", "Yardstick-family") so the user can browse distinct ideas. Diversification reorders and groups. It never puts a phrase out of reach, and "show more" always continues past the displayed window.

### 6.6 Special Modes

- **Locks** reduce a slot to one entry, and their adjacency terms become constants.
- **Recursive slot:** the acronym itself is a candidate. Self-reference is scored only for grammatical fit.
- **Spanning collocations:** a two-word atom covers *two* letters (*Electronic Mail* for E+M). Each collocation is indexed by its initialism signature ("EM") inside its first letter's shard, so the E shard alone knows every E+M candidate. This turns the slot sequence into a segmentation lattice. Search runs over lattice paths, and the meter counts all segmentations. Spanning collocations are the preferred form of multiword atom, because they respect the acronym instead of hiding letters inside a slot.
- **Single-slot multiword atoms:** available as a late opt-in for users who want them, off by default (§3.1).
- **Partial acronyms:** allow skipped letters or function words that contribute letters (*Mail Analysis **Y**ield…*). This is off by default; purists can keep it off.

---

## 7. The LLM's Role

### 7.1 Contract

The LLM is a **search assistant operating over human-inspectable state**, never the source of truth. It receives:
- The acronym, slot structure, locks, and templates.
- Only the **★ (optionally ★+?) lexicons** per slot. Hidden words, banished words, and by default flagged words are excluded. `slur/hate` entries are never sent without explicit opt-in.
- The concept brief and register, plus explicit avoidances (e.g., "relates to distinguishing useful email from noise; do not mention spam/ham directly").
- Optionally, the top local-search results as seeds to diversify away from.

It returns structured expansions, following a fixed response schema, with a short rationale for each. Because the payload is a few hundred starred words and a brief, the connector is small and stateless. That is why it can ship alongside the local solver rather than after it (§11).

### 7.2 Validation

- **Valid:** every token is in the provided sets. Scored with Φ and merged into results.
- **Off-list:** it uses a word the human never starred. Shown in a separate "Proposals" lane with the offending word highlighted. The user can promote the word, which stars it in the slot with provenance "suggested by LLM, run #4", or discard it. It never silently enters the shortlist.
- **Malformed:** wrong letter or wrong slot count. Dropped and counted ("3 invalid suggestions discarded").

Validation guarantees membership and structure, not quality. A fluent but dull phrase built entirely from starred words passes. So do the LLM's biases *within* the shortlist, chiefly a pull toward the most common words. Each run therefore carries a small bias report: the average frequency of its picks against the shortlist average, how much its choices track list order across shuffles, and how much it overlaps with the local solver's top results.

### 7.3 Other LLM Duties (All Optional)

- **Judge:** rate the top ~200 locally found expansions for naturalness and professional tone. This is cheap because the input is small. The judgment appears as a **secondary badge beside Φ**. It never overwrites the mathematical score, so results remain explainable and reproducible with the LLM switched off.
- **Explain:** turn the feature breakdown into prose.
- **Guide suggester:** propose guide words from the concept brief. The human accepts or rejects each chip.
- **Sense disambiguation:** for a guide like *yield*, list its senses and suggest negative poles.

Connector options: a user-provided API key, a local in-browser or local-network model endpoint, or none. Everything except LLM features works fully offline.

---

## 8. Explanations

The explanation layer is arguably the product. It shows that the result is a constructed structure, not a lucky output.

**Word-level ("Why is this here?")**
~~~
YIELD   rank 3 of 8,421 in Y
+ close to slot guide "result" (0.61) and "produce" (0.58)
+ global field "filtering/relevance" (0.34)
+ recognized compound "yield heuristic" (PMI high)
+ formal/technical register, common (top 5% frequency)
− near negative pole "finance" (0.41), partially suppressed
~~~

**Expansion-level**
~~~
Mail Analysis Yield Heuristic for Email Management
+ all six tokens on shortlist; template N N N N for N N
+ implies useful output from noisy input (coherence 0.72)
+ strong adjacencies: "mail analysis", "yield heuristic", "email management"
− slightly academic tone ("yield heuristic")
− "Mail" / "Email" shared root (torture +0.1)
origin: beam search run #2 · pinned by you
~~~

All numbers come from the scoring decomposition, so they are always reproducible. LLM prose and LLM judge badges are labelled as LLM output.

---

## 9. User Experience

### 9.1 Primary Workflow

1. **Define:** type the acronym, write a one-line concept brief, add global guides.
2. **Shape:** add slot guides and locks. Check guide senses in the neighbor preview.
3. **Glimpse:** as soon as guides exist, **Live Drafts** appear: the top ~50 beam-search results over the *uncurated* rank-1 regions of each column. They are rough on purpose. Their job is to show within seconds what a finished backronym looks like and to make the case for culling.
4. **Cull:** do fast passes per slot: star, maybe, hide.
5. **Watch the meter:** keep culling until the space is tractable.
6. **Compose / Search:** assemble by hand, run local search, call the LLM.
7. **Decide:** pin, compare, annotate, export.

These are not wizard steps. The interface is a workbench, and users loop freely: an interesting expansion often sends them back to add a guide or un-hide a word.

### 9.2 Layout: The Board (Desktop)

~~~
┌──────────────────────────────────────────────────────────────────────┐
│ M A Y H E M   "Distinguishing wanted mail from noise"     [Search ▸] │
│ Global: +email +classification +relevance +filtering  −finance  [+]  │
│ Space: ★ 4.6M ▕████████░░░░▏  ★+? 61M   pool (top 500) 3.1×10¹³      │
├──────────┬──────────┬──────────┬──────────┬──────────┬───────────────┤
│ M₁       │ A        │ Y        │ H 🔒     │ E        │ M₂            │
│ +message │ +analysis│ +result  │ Heuristic│ +email   │ +management   │
│ ★14 ?9   │ ★31 ?12  │ ★18 ?6   │          │ ★22 ?4   │ ★27 ?10       │
│ 1 ★ mail │ 1 ★ anal…│ 1 ★ yield│          │ 1 ★ email│ 1 ★ management│
│ 2 ★ mess…│ 2 ? asse…│ 2 ★ yard…│          │ 2   elec…│ 2 ★ model     │
│ 3   mess…│ 3 ★ adap…│ 3   yiel…│          │ 3 ★ eval…│ 3   matrix    │
│ …        │ …        │ …        │          │ …        │ …             │
│ 31,204   │ 28,977   │ 8,421    │          │ 19,630   │ 31,204        │
└──────────┴──────────┴──────────┴──────────┴──────────┴───────────────┘
~~~

- Each column is a **virtualized list of the full slot**. Scrolling all the way down is possible and honest. The footer shows the total.
- Rank numbers are visible. State is shown with glyphs (★ ? ×) **and** shape, never color alone. `sensitive/contextual` entries carry a small badge that explains itself on hover.
- Inflection families collapse under their lemma, with a disclosure arrow.
- Column filters: All / Unreviewed / ★ / ? / Hidden, a top-N view window (which feeds the meter's active pool), and a text filter (`yie*`, `*ics`).
- Clicking a word opens the **Inspector** side panel: glosses, POS, register, frequency, nearest neighbors within the slot, the "why here" breakdown, and its curation history.
- A Live Drafts strip sits under the board until the user has enough stars for real searches to take over.

### 9.3 Cull Mode (Lightroom-Style Focus)

For one slot, full screen, keyboard-first:

| Key | Action |
|---|---|
| J / K or ↓ / ↑ | **pass** (neutral, teaches nothing) / previous |
| S | star |
| M | maybe |
| X | **hide & repel** (also pushes similar words down via feedback) |
| Shift+S / Shift+M / Shift+X | apply to whole lemma family |
| B | banish globally (user-level list, confirms on first use) |
| Backspace | reset to unreviewed |
| Space | toggle inspector |
| Shift+range | batch apply |
| Z / Shift+Z | undo / redo |
| R | apply pending re-rank |
| ] / [ | next / previous slot |

State-changing keys sit under the left hand and navigation under the right. The reset action is deliberately kept away from J/K, so a slip while moving fast cannot silently erase a decision.

Design rules:
- **Auto-advance** after each decision. Throughput is the goal: hundreds of judgments in minutes.
- **Context strip:** while culling a slot, the current word appears inside a live example expansion built from the top ★ word in each other slot ("Mail Analysis **Yardstick** Heuristic for Email Management"). If a slot has no stars yet, its rank-1 unhidden word stands in, in muted italics. Words are judged *in situ*, not in a vacuum, from the very first keystroke.
- **Serendipity row (optional):** every so often, a word sampled from deep in the column or orthogonal to the current guides is shown, clearly labelled. It is a small, deliberate leak out of the embedding's filter bubble, and the practical way to honor the long tail when ranking is de facto membership.
- **Pass markers:** "Reviewed to rank 400 of 8,421". A faint line marks how far each pass reached, so users know where their attention stopped.
- **No destructive bulk hide.** There is no "hide everything below rank N", because that would quietly break exhaustiveness. The equivalent is a *view* window ("show top 500"). It is reversible, clearly labelled, and drives the meter's active-pool figure, so narrowing focus still shrinks the visible search space.

### 9.4 Guide Editing

- Guides are chips with a polarity toggle (+/−) and a weight control (drag or scroll on the chip).
- Adding a guide shows a **sense preview**: its 8 nearest neighbors in the full lexicon. These are precomputed and resolved from the global guide index (§4.4), so a guide's letter shard does not need to be downloaded. If *yield* shows *harvest, crop, bushel*, the UI suggests "Add −agriculture?", and where build-time sense vectors exist it offers the senses as alternative chips. `slur/hate` entries never appear in previews unless opted in.
- Out-of-vocabulary guides are accepted. A subtle badge shows how the vector was built ("composed from subwords" or "phrase average").
- Every guide edit shows its effect as a pending rerank diff: "↑ yardstick +212, ↓ yam −1,040".
- **Guide sets are versioned.** Users can flip between "v2 (technical)" and "v3 (playful)" and compare rankings side by side.

### 9.5 Composer

A row of six drop-downs, each holding the slot's ★ list sorted by rank, with the live phrase score Φ and explanation underneath. Interactions:
- Cycle one slot while the others stay fixed. Adjacency scores update live.
- "Best fill for this slot given the others" asks the solver to optimize one position.
- Pin to the shortlist of expansions.

### 9.6 Search Results

- Results are grouped into diversity clusters, each with a representative and a count.
- Columns: expansion, Φ, LLM judge badge (if run), origin (local / LLM / manual), template, flags.
- Facets: by template, by word in a given slot ("all results using *Yield*"), by origin.
- The **Proposals lane** holds off-list LLM suggestions, each with a one-click promote of the offending word.
- Comparison view: two to four pinned expansions side by side with their explanation breakdowns.

### 9.7 Mobile and Touch (PWA)

The desktop workbench comes first. Mobile culling follows in a later phase, designed for throughput rather than novelty.

- A Tinder-style swipe stack is fun for twenty words and punishing for four hundred: repetitive drag gestures strain the thumb, and path-based gestures as the only input fail WCAG 2.1 SC 2.5.1 (Pointer Gestures). Each slot is therefore a card or compact list view with a **sticky bottom thumb-bar**: `[ × ]` `[ ? ]` `[ ★ ]` `[ ↓ Pass ]`. The thumb stays in one place and taps. Swipes remain available as an optional secondary input.
- Tap a word for the inspector.
- The meter stays in a sticky header.
- The composer becomes a vertical stack of wheel pickers.
- Search runs on-device for small spaces. LLM calls are queued when offline.

### 9.8 Onboarding and Empty States

- A bundled **MAYHEM demo project** comes pre-curated, so the meter, explanations, and search can be seen within the first minute.
- An empty slot shows its full alphabetical list with a nudge: "Add a guide to sort these 8,421 words by meaning".
- The moment guides exist, Live Drafts and the rank-1 context strip show complete (if rough) backronyms. No user has to cull 500 words before seeing the point.
- First-run tips teach the core concept: "Hiding never deletes. Sorting never removes."

### 9.9 Accessibility

- Full keyboard operation. Glyph + shape + text for state. Honors reduced motion, so rerank transitions become instant.
- The Board behaves as a grid with a single roving focus, so arrow keys move between columns and rows without tabbing through thousands of items.
- Screen-reader-friendly list semantics, with a "rank X of N" announcement.
- **High-speed announcement mode** for Cull: announcements lead with the *next* word, which is what the user needs ("Starred. Yarrow, rank 4"). Meter updates are suppressed during rapid keystrokes and announced once the user pauses.

---

## 10. High-Level Architecture

### 10.1 Shape

A **modern, offline-first web PWA**. All core functions (lexicon, embeddings, ranking, curation, local search) run on the client. A server is needed only to host static, versioned data shards and, optionally, to relay LLM calls.

~~~
┌──────────── Client (PWA) ─────────────────────────────────────────┐
│  UI layer: Board · Cull · Composer · Results · Inspector          │
│      │                                                            │
│  Project store (document + append-only event log)                 │
│      │                          ▲                                 │
│  ┌───▼──────────┐   ┌───────────┴─────────┐   ┌────────────────┐  │
│  │ Ranking      │   │ Search worker       │   │ LLM connector  │  │
│  │ worker       │   │ beam/B&B/MMR        │   │ (optional)     │  │
│  └───▲──────────┘   └───────────▲─────────┘   └──────┬─────────┘  │
│      │                          │                    │ validate   │
│  Lexicon + vector shards (per letter, versioned, cached offline)  │
└───────────────────────────────────────────────────────────────────┘
         ▲ static shard CDN                ▲ user key / local model
~~~

Alongside the per-letter shards, the data layer holds two global artifacts that ship with the app shell: the **global guide index** (guide resolution, OOV coinages, precomputed sense-preview neighbors) and the **adjacency artifact** (compressed lemma-bigram PMI plus the POS-transition table). Both are used by the ranking and search workers.

### 10.2 Key Decisions

- **Letter sharding** keeps the first load small and makes the app's working set proportional to the acronym. The two global artifacts cover the data that crosses letters.
- **Binary, persistent storage.** Shards are aligned binary buffers used in place by workers, kept in IndexedDB or the origin-private file system under a persistent-storage grant, so offline lexicons survive browser storage cleanup.
- **Workers** for ranking and search keep the UI at 60 fps during culling. The ranking worker does its dot products, normalization, and sorting inside a single SIMD-capable WebAssembly module, so a re-rank never round-trips data through the main thread.
- **Event-sourced projects:** undo/redo, provenance, and "replay to see how we got here" fall out naturally.
- **Privacy-safe sharing.** Exports and shareable links default to a **clean snapshot**: active guides, ★ and ? words, and pinned results. The full timestamped event log and the list of rejected words often say more than the user intends, for example which names a team considered and dropped. They are included only with an explicit toggle.
- **Privacy:** nothing leaves the device unless the user invokes an LLM feature. The exact payload is viewable before sending.

### 10.3 Performance Targets

| Operation | Target |
|---|---|
| First load (app shell + global artifacts) | < 1.5 s shell on mid-tier mobile; global artifacts streamed and cached after |
| Load a 6-letter project's shards (cold) | < 5 s on broadband |
| Re-rank one slot (50k entries) | < 20 ms (≈ 5 ms expected) |
| Cull keystroke → next word | < 16 ms |
| Exhaustive scoring, 10⁴ expansions | < 200 ms |
| Beam search, 10⁷-space, top-100 | < 3 s |

---

## 11. MVP and Phasing

An earlier plan used the public Datamuse API (`ml=<guide>&sp=y*` per slot) as a Phase 0 backend. It looks like a shortcut but tests the wrong product:

- It **violates the invariant**. Datamuse returns at most about 1,000 words, already filtered by relevance. That hides the long tail, which is exactly where culling fatigue and the value of exhaustiveness show up.
- It adds 100–300 ms of network latency to every guide edit, which hides the near-instant re-rank that makes the culling loop feel right.
- Its terms do not permit caching its OneLook-backed index into an offline lexicon, so nothing built on it carries forward.
- It sends users' project codenames and guide words to a third party over the network, contradicting the privacy promise.

Phase 0 therefore builds a thin but *real* slice instead.

**Phase 0: Single-acronym vertical slice (2–3 weeks)**
- Pre-compiled binary shards for just six letters (enough for `MAYHEM` and `SPACE`: M, A, Y, H, E, S, P, C), plus the global guide index, built from clean open sources with post-processed, quantized vectors.
- The real ranking worker, frozen sort with pending re-rank diffs, the desktop Board, keyboard Cull mode, and the meter.
- **Lexicon versions without lock-in.** A project records the lexicon version it was curated against, so rankings stay reproducible. The CDN does not keep every 32 MB version forever, though. Because the event log stores surface strings next to entry IDs, upgrading re-maps curation states by surface string. The upgrade is an explicit, diffed action ("312 new M-words; 0 removed; 2 states could not be re-mapped"). Locks survive upgrades: if a locked word disappears from the new lexicon, it is carried forward as a user-added entry instead of leaving the slot empty. The same candidate diff appears whenever a default filter, tagger, or morphology rule changes, so no column ever changes membership without a visible, logged event.
- A bare, embedding-free left-to-right solver over those letters. It has no polish; its job is to measure real column sizes and search latency before any interface decision depends on them.
- Goal: validate the sub-20 ms re-rank feel, sense steering, culling ergonomics, and interactive search cost on full 30–50k-word columns, offline, with nothing leaving the device.

**Phase 1: Core desktop workbench (6–8 weeks)**
- The full 26-letter lexicon pipeline: per-surface-form POS tags, derivational roots, build-time sense splitting for the top ~5k polysemous words, the two-tier safety taxonomy, register and modernness priors, and license-clean sources.
- Global and slot guides with ± poles, soft-max aggregation, z-normalization, prior, and sense projection.
- Four-state curation, frozen sort with viewport-anchored apply, event log, banish list, clean-snapshot export/import.
- Left-to-right beam / A\* search using the adjacency artifact and POS transitions, exact Φ rerank of the top paths, a small template library, MMR diversity, bigram blocklist, and Live Drafts for cold start.
- Composer with live Φ; explainability inspector with the Φ decomposition and torture index.
- The **BYO-key / local-model LLM connector** with Proposals-lane validation and judge badges. It is small enough to ship now. Including it answers the reasonable objection that an LLM alone could compose phrases from 20 starred words per slot, and still keeps the deterministic, offline solver as the differentiator.
- PWA install, persistent offline storage.

**Phase 2: Mobile, spanning, and intelligence (4–6 weeks)**
- Mobile culling with the sticky thumb-bar and a responsive composer.
- Two-word spanning collocations (E+M = *Electronic Mail*) over the segmentation lattice.
- Relevance feedback from stars, gloss-embedding rerank, prose explanations, guide-set versions and side-by-side comparison, the serendipity row.
- An exportable "naming rationale" document (PDF/Markdown) for teams that must defend a name to a committee, and domain vocabulary packs.

**Phase 3: Depth**
- Recursive and partial acronyms, opt-in single-slot multiword atoms.
- Custom template editor, collaborative projects (shared logs, per-person votes).

---

## 12. Risks and Open Questions

- **Lexicon quality decides everything.** Malformed inflections and junk tokens erode trust in "exhaustive". This needs a curated build pipeline, a "report bad entry" action, and the per-user banish list as a pressure valve.
- **The cross-letter data hiding in plain sight.** Vectors shard neatly by letter. Adjacency and guide resolution do not. Without the dedicated adjacency artifact and global guide index (§4.4), the phrase scorer and sense preview silently assume hundreds of megabytes the client does not have.
- **Polysemy.** Static vectors blur senses, and linear sense subtraction cannot recover a minority sense well. Build-time sense vectors, negative poles, projection, and gloss embeddings mitigate this but do not solve it. The sense preview UI is essential.
- **Orthographic contamination.** Subword vectors make same-letter words look related because they share spelling. In-vocabulary vectors must keep subword influence low, or ranking within a column becomes a spelling exercise.
- **Embedding bias.** An earlier draft argued that bias is low-harm because it "affects ordering only". In a column where users inspect the top few hundred ranks, ordering *is* exposure. Mitigations are layered: All-but-the-Top post-processing before quantization, the two-tier safety taxonomy instead of a blunt list, the serendipity row, and explanations that make the ranking legible enough to question.
- **Multiword atom explosion.** Atom inclusion needs PMI and frequency thresholds, a per-project toggle, and a default that favors spanning collocations over single-slot atoms.
- **Licensing.** Word lists, frequency corpora, and pretrained vectors must all permit redistribution in a client bundle. That rules out SUBTLEX- and COCA-derived data, imposes share-alike and attribution duties for CC-BY-SA sources, and may justify training custom vectors on permissive corpora.
- **Cognitive load.** Thousands of words can feel daunting. Pass markers, the in-situ context strip, Live Drafts, the active-pool meter, and its "most impactful slot" hint exist to make progress visible.
- **Resolved: cross-project taste.** Should culling decisions carry over between projects as a personal taste profile? That is attractive, but it quietly biases new projects. The design keeps ★, ?, and × strictly project-scoped and offers one explicit, user-level exception: the **banish** list for words the user never wants to see anywhere. A richer opt-in taste profile remains a possible future feature.

---

## 13. Summary

- **Exactness mistaken for quality.** Exact search is the design's most attractive property and the easiest to over-read. A good backronym usually depends on the whole phrase meaning something, and a neighbor-based score can only approximate that. The test is a blind preference comparison between the solver's top 10, an LLM's top 10 from the same shortlist, and human-written expansions, all on the same acronyms. The outcome is committed to in advance: if the LLM consistently wins on coherence, the solver's role becomes the fast, validated enumerator and explainable baseline underneath it. That would be an acceptable result, not a failure.
- **The central bet is untested.** That culling full columns beats picking from a suggestion list is the product's thesis, not a finding. Two studies decide it.
   - *Attention.* Deep-ranked words are spliced into the visible window at randomized positions alongside top-ranked words, and acceptance is compared at the same displayed position. If deep words are starred at a meaningful fraction of the top-word rate, the ranking is hiding acceptable words and the serendipity row has to grow.
   - *Workflow.* All arms receive the same solver output. The arms are full columns with culling, columns with browse-and-lock only, and a ranked suggestion list. They are judged on blind next-day satisfaction with the final name, and a tie counts against the workbench. If the suggestion list ties, it becomes the default view and the Board becomes the expert view.
- **What the slot model cannot express.** One content word per letter, plus connectors, covers a lot but not everything: words that cover non-adjacent letters, reordered letters, and letters split inside a word all fall outside it. Coverage is measured against backronyms collected from people who have never used the tool, because examples gathered inside it would already be shaped by it. Missing words and inexpressible structures are reported separately, since they call for different fixes.
Expanse treats backronym creation as **interactive semantic search over an exhaustive orthographic space**. The lexicon guarantees completeness. Embeddings, driven by human-chosen positive and negative guides and cleaned of their worst distortions, give that space a meaningful order, and never decide on their own what is in it. Fast culling turns that order into taste expressed as constraints: a personal, bounded search space whose size is always visible, from the first guide word onward. Only then do a left-to-right solver and an optional LLM look for structure among the survivors, all on the user's own device. Every result states how it was found and can explain itself. The wordlist finds possibilities, the embeddings find relatives, the human finds taste, and the constraint graph shows why the final phrase holds together.
   - A lock and a slot with exactly one star look identical today but behave differently later. A lock keeps the slot closed when a lexicon upgrade or a relaxed filter adds new H-words. Stars leave room for newcomers to appear, unreviewed, in the column. The stored action records intent, not just the current set.
A log bar rewards locks with the most satisfying drop on the screen, and an early lock is a greedy commitment. To keep the meter from encouraging premature decisions, unlocking is one keystroke. The results view also offers a "search without locks" preview, diffed against the current results, so the user can see what a lock is costing before keeping it.
- Each slot's list in a random order, reshuffled on every call, so the model's habit of favoring early list positions does not quietly reintroduce the ranking.
Each returned expansion goes through the same template-aware validator as the solver's own output. The validator parses the phrase against the active templates and assigns each token either to a letter slot or to a connector. A word like *in* or *a* that lands in a letter slot is judged as a content word and must itself be on the shortlist. Nothing is stripped ad hoc. Each expansion then falls into one of three outcomes:
- A results header states how the list was made: search mode, active embedding-derived terms, lexicon version, and how many results lie past the displayed window.
- Opt-in, on-device evaluation hooks for the studies in §12 (rank-at-star logging, position-randomized serendipity splices). They are off by default and never transmitted without explicit consent.
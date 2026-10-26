# A Symmetric Instrument Inside an Asymmetric Theory

## A Methodological and Conceptual Critique of *EQUITRIAGE: A Fairness Audit of Gender Bias in LLM-Based Emergency Department Triage* (Young & Matthews, arXiv:2605.03998)

---

## Executive Summary

EQUITRIAGE audits five large language models (Gemini-3-Flash, Nemotron-3-Super, DeepSeek-V3.1, Mistral-Small-3.2, GPT-4.1-Nano). The models assign Emergency Severity Index (ESI) levels to 9,346 gender-swapped vignette pairs derived from MIMIC-IV-ED. The study uses four prompt strategies and reports 374,275 completed evaluations. It is a serious, large-scale piece of work. Its paired counterfactual design, multi-vendor panel, ablations, and separation of parity, invariance, and calibration are real contributions. Its finding that chain-of-thought prompting degraded agreement with human triage for every model is practically important.

Our critique has two layers.

**The conceptual layer.** The paper's instrument is symmetric. It asks whether *f(x, female) = f(x, male)* and will report a disadvantage in either direction. The theory surrounding the instrument is not symmetric. The study opens by treating documented disparities as "known biases." It then gives AI only two possible relationships to them: to "reproduce or mitigate" them. A female-direction result is named a bias *profile*. A male-direction result of comparable absolute size is described as "small" and "weak." By our calculation from the paper's own figures, Nemotron-3-Super's net male-direction excess is about 1.8 percentage points of pairs. Gemini-3-Flash's net female-direction excess is about 1.7 points.

Two further problems compound this asymmetry:

- **The prior and the instrument measure different quantities.** The human literature the paper cites largely concerns *total* disparity experienced by real women, much of it mediated by how presentations differ by sex. A swap that holds clinical content fixed measures something narrower: the effect of the gender *token* on a fixed symptom profile. The paper treats the second as a test of the first.
- **The framework is never put at risk.** The authors state their normative framework openly. What they never do is specify a result that would revise its assignment of victim, bias, and mitigation.

**The methodological layer.** Several design features weaken specific headline claims:

1. **The Blind condition is a test-retest measurement.** Under Blind, the original and counterfactual vignettes appear to be textually identical. Their "flip rate" therefore measures nondeterminism, not fairness. Blind flip rates are 63.5% for Nemotron, 13.5% for Mistral, and 11.9% for DeepSeek. Each is comparable to or larger than that model's baseline counterfactual flip rate. On the paper's own data, H1 ("flip rates exceed stochastic variation") is not established for three of five models.
2. **The thresholds are internally inconsistent.** H1 treats more than 5% as "systematic." The preregistered threshold table classifies 5–15% as "concerning" and reserves "systematic" for more than 15%. Under the table, four of five models fall short of "systematic." DPD is labeled the "primary metric" in Methods and treated as secondary everywhere else.
3. **The ablations rest on incommensurable comparisons.** The Gemini ablations ran on a different serving backend from the reference predictions they are compared against. The "age is the residual channel" inference for DeepSeek compares two conditions with different comparison structures.
4. **The calibration result may be partly structural.** Counterfactual vignettes appear to inherit the admission outcome of their source patient. Within-gender calibration is then computed over pooled real and swapped records, which mechanically compresses the gap.
5. **"Undertriage" is a description, not a finding.** The directional F/M ratio counts pairs in which the female version received a less urgent ESI than the male version. Without an independent standard, every such pair is equally a case of male *over*triage, or of neither version being wrong.
6. **Other problems.** The chain-of-thought collapse may be a parsing artifact. Subgroup ratios rest on small counts. The vital signs include physiologically implausible values. The noise floor comes from one model on one backend.

**What survives:** directional asymmetry in DeepSeek-V3.1, and more weakly in Gemini-3-Flash and Nemotron-3-Super, because stochastic noise should be symmetric. This is evidence that the gender token shifts outputs on fixed content. On content where sex is clinically irrelevant, that is disparate treatment in its own right, though it does not say which sex is harmed. The chain-of-thought degradation and the model-dependence of interventions also survive.

**What does not survive in its stated form:** the flip-rate magnitudes as evidence of gender sensitivity, the 96% Blind "debiasing" effect, the age-channel attribution, the "Chouldechova-style dissociation," and any reading of the swap results as a measure of sex disparity in triage.

The follow-up program we propose has five principles:

- Directionality is an outcome, not a premise.
- Counterfactual difference is not automatically injustice.
- Sensitivity, error, and harm must be measured separately.
- The estimand of the audit must match the question the motivating prior asks.
- The normative framework must state in advance what evidence would prove it wrong.

---

## 1. What the Paper Claims

EQUITRIAGE builds structured vignettes from real de-identified MIMIC-IV-ED fields: gender, age, race, vitals, pain, chief complaint, and medications. To each it adds a synthetic first name drawn from gender- and race-concordant SSA/Census pools. Each of 9,346 originals is paired with a twin that changes the gender token and the name and holds clinical fields constant. Twenty-two sex-linked presentations are left unpaired. Each vignette is evaluated under four prompts:

- **Baseline.**
- **Chain-of-thought (CoT).**
- **Debiased:** "Do NOT let patient demographics influence your clinical judgment."
- **Blind:** name, age, and gender removed.

The headline results are:

- **Flip rates.** All five models exceed a preregistered 5% counterfactual flip threshold, ranging from 9.9% (GPT-4.1-Nano) to 43.8% (Nemotron-3-Super).
- **Profile A, directional female undertriage.** DeepSeek-V3.1 (F/M 2.15, 95% CI [1.90, 2.44]) and Gemini-3-Flash (1.34, [1.19, 1.52]).
- **Profile B, near parity.** GPT-4.1-Nano (1.11, [0.98, 1.27]) and Mistral-Small-3.2 (0.92, [0.82, 1.03]).
- **Profile C, high flip rate with "weak" male-direction asymmetry.** Nemotron-3-Super (0.92, [0.87, 0.98]).
- **Calibration.** DeepSeek's directional bias coexists with a low outcome-linked calibration gap (0.013). The authors call this a "Chouldechova-style dissociation."
- **Chain-of-thought.** CoT lowered quadratic-weighted κ for all five models and raised flip rates for four.
- **Blind.** Blind cut Gemini's flip rate from 11.7% to 0.5% and moved DeepSeek's F/M to 1.00.
- **Ablations.** A two-model ablation is said to show "opposite mechanisms" behind the same directional phenotype.

The authors conclude that per-model counterfactual auditing should precede clinical deployment. That recommendation is sound. The question is whether the evidence supports the more specific claims attached to it.

---

## 2. Genuine Strengths

Any fair critique must begin here. Several of the paper's contributions survive everything that follows.

**2.1 The paired counterfactual design is the right instrument.** Comparing naturally occurring male and female patients confounds demographics with clinical differences. Holding the clinical content fixed and swapping the demographic representation asks a cleaner question: *would this same case receive the same disposition if the patient were represented differently?* That is a meaningful audit target for a decision-support tool. It is also a narrower target than the paper's framing implies (§3.3), but narrowness is not a defect when it is stated.

**2.2 Fairness is treated as plural.** The paper shows that group parity (DPD), pairwise counterfactual invariance, and within-group outcome calibration can come apart. This is conceptually correct and practically important, even if the specific calibration result needs re-examination (§4.6). A regulator who audits only one of these properties can miss failures in the others.

**2.3 The results resist a universal-bias narrative.** The panel includes female-direction, near-parity, and male-direction results. The authors report them rather than collapsing them into one claim about "LLM gender bias." This heterogeneity is scientifically valuable. It suggests there is no single demographic-sensitivity phenotype across models.

**2.4 Interventions are shown to be model-dependent.** The Debiased prompt raised flip rates sharply for Mistral (12.7% → 34.3%) and GPT-4.1-Nano (9.9% → 38.1%). Instructing a model not to attend to demographics can make its outputs less stable. Deployers who assume fairness prompts are harmless should take note.

**2.5 The chain-of-thought result is important.** Generic step-by-step prompting lowered κ for every model, by 0.13 to 0.59. This challenges the common assumption that eliciting reasoning improves clinical judgment, whatever its mechanism turns out to be (§4.7).

**2.6 Acuity strata are defined correctly.** The acuity-stratified F/M ratios are computed by *ground-truth* ESI, not by any model's output. This avoids a subtle trap. Stratifying by one arm's output (for example, "cases where the male version received ESI-1") forces the difference into one sign through the floor of the scale, and regression to the mean then manufactures direction. The paper does not fall into it.

**2.7 The paper is transparent.** The authors disclose the post-pilot revision of H4, the cross-backend test-retest, the stratified ESI distribution, and the "vignette is not triage" caveat. That transparency is what makes the problems below detectable.

---

## 3. The Central Conceptual Problem: A Symmetric Detector, an Asymmetric Theory

### 3.1 The inferential chain is completed before the experiment begins

The abstract asks whether LLMs "reproduce or mitigate known biases." The introduction asks whether they "reproduce, amplify, or mitigate known disparities." These phrasings complete an inferential chain before any model is queried:

> observed disparity → known bias → AI reproduces, amplifies, or mitigates it

The three terms are not interchangeable.

- A **disparity** is an observation.
- A **bias** is a causal and normative interpretation of that observation.
- A **harmful bias** is a further conclusion. It requires evidence about clinical correctness, consequences, and the legitimacy of the decision rule.

The paper's own discussion of incompatible fairness criteria shows that the authors understand this. Their framing does not apply it.

The framing also restricts the hypothesis space. AI can echo the established injustice or help correct it. A third possibility gets no equal standing: that AI might surface asymmetries the inherited framework does not recognize. These include disadvantages to the group that the framework does not designate as disadvantaged.

### 3.2 The asymmetry is visible in the paper's own language

The counterfactual equation does not know which group history has cast as the protected party. It reports a male penalty as readily as a female penalty. The prose does know, and the difference shows in how comparable results are described.

The F/M ratio is a ratio of directional flips. The net directional excess, as a share of all pairs, follows from the flip rate and the ratio:

> female-undertriage share = flip rate × F/M ÷ (1 + F/M)
> male-undertriage share = flip rate ÷ (1 + F/M)

Applying this to the reported baseline figures (rounded):

| Model | Flip rate | F/M | Female-undertriaged pairs | Male-undertriaged pairs | Net excess |
|---|---|---|---|---|---|
| DeepSeek-V3.1 | 12.0% | 2.15 | ≈ 8.2% | ≈ 3.8% | ≈ +4.4 pp (female) |
| Gemini-3-Flash | 11.7% | 1.34 | ≈ 6.7% | ≈ 5.0% | ≈ +1.7 pp (female) |
| GPT-4.1-Nano | 9.9% | 1.11 | ≈ 5.2% | ≈ 4.7% | ≈ +0.5 pp (female) |
| Mistral-Small-3.2 | 12.7% | 0.92 | ≈ 6.1% | ≈ 6.6% | ≈ −0.5 pp (male) |
| Nemotron-3-Super | 43.8% | 0.92 | ≈ 21.0% | ≈ 22.8% | ≈ −1.8 pp (male) |

In absolute terms, Nemotron's net male-direction excess is about the same size as Gemini's net female-direction excess. Both have confidence intervals that exclude parity. The paper treats them differently:

- Gemini anchors "Profile A: Directional female undertriage." It is aligned "with decades of clinical evidence."
- Nemotron receives "a small but statistically detectable male-direction asymmetry" that is "small in absolute terms relative to the very high overall flip rate."

The paper does give a reason for the different treatment. Nemotron's asymmetry sits on top of a much larger flip rate, so as a ratio it is weaker. That reasoning is legitimate, but it is applied one way only. Gemini's female-direction excess is never expressed as a fraction of its own instability. Nemotron's male-direction excess is never expressed as an absolute number of affected patients. One direction is reported as a ratio that sounds large. The other is reported as a magnitude that sounds small.

It is worth being precise about what kind of asymmetry this is. To its credit, the paper reports Nemotron's confidence interval in the abstract, and both results appear in the same tables. At the level of *evidence*, the reporting is largely symmetric. The asymmetry lives in two other places:

- **The choice of scale**, which is an evidence decision dressed as description. Each direction is presented on the scale that best suits its narrative role.
- **Labels, headlines, and causal language**, which are matters of *belief*.

Asymmetric belief is not illegitimate in itself. A researcher with a well-founded prior may reasonably describe an expected result with more confidence than a surprising one. But that defense requires the prior to be grounded in evidence about *this* question. As the next section shows, the prior here comes from a different population (human clinicians) and concerns a different quantity. Asymmetric belief is legitimate. Asymmetric evidence reporting, and belief borrowed from a different question, are not.

### 3.3 The prior and the instrument measure different quantities

There is a deeper mismatch beneath the language. The swap estimates a **token-conditional** effect: how the model's ESI changes when only the gender token and name change, with the symptom profile held fixed. Formally, it estimates *E[ESI | female token, content c] − E[ESI | male token, content c]*, averaged over the swappable vignettes.

Much of the human literature the paper invokes concerns something else. The canonical case is acute coronary syndrome in women. There, the documented disparity is substantially mediated by *presentation*: women more often present with symptom profiles that clinicians under-weight. That is a **population** disparity. It depends on how presentations are distributed by sex and on how symptom profiles are mapped to acuity, not only on a reaction to the word "female."

Three consequences follow, and the paper draws none of them.

1. **A null swap result does not rule out real-world disparity.** A model could show perfect token invariance and still under-triage real women, by under-weighting symptom profiles that are more common in women. The bias would live in the symptom-to-acuity mapping, which a content-fixed swap cannot see.
2. **A non-null swap result is not straightforwardly a reproduction of the human pattern.** A swapped vignette that keeps a male-typical chest-pain presentation and attaches a female token describes a patient who is epidemiologically less representative of women. A difference on that vignette may partly reflect base-rate inference. Whether a model *should* use sex as a base-rate input is a normative question, not one the swap can answer.
3. **"Reproduce or mitigate" presupposes a match the design does not deliver.** To say the models "reproduce" a known bias, the paper would have to argue two things: that the bias plausibly transfers from human clinicians to LLMs, *and* that the human bias predicts a token-level effect specifically. It argues neither.

This is not a symmetry problem, and in a sense it is more fundamental than one. A perfectly symmetric pipeline with a mismatched estimand answers a question nobody asked. A swap audit licenses claims of the form "a token-level effect on these vignettes," never "sex disparity in triage." A complementary **presentation-profile audit**, which varies sex-typical symptom profiles while holding the gender token constant or masked and scores against an independent standard, is needed to address the population question. Neither design substitutes for the other.

### 3.4 Doctrine versus hypothesis

It would be wrong to say the authors are unaware of their framework. They state it, cite it, and operationalize it carefully. They know the theory as a set of propositions. What they do not treat as open is its *contingency*: the possibility that it is one interpretive partition of reality among several, and could be wrong in a given domain.

A framework is scientifically healthy when contrary observations can force revision of its primitives. It becomes self-sealing when every possible outcome can be absorbed:

- **Expected-direction disparities** confirm the "known bias."
- **Reverse-direction disparities** become model-specific anomalies, "weak" asymmetries, or artifacts of instability.
- **Null or parity results** become evidence of successful mitigation.
- **Results that contradict the human-clinical pattern**, such as the age-gradient "inversion," become "novel findings." They do not count as evidence against the assumption that model behavior should be read through that pattern.

No outcome in this list threatens the framework's original allocation of victim, beneficiary, bias, and mitigation. A premise that can be stated, elaborated, quantified, and preregistered, but never placed at risk, functions less like a hypothesis than like a doctrine. It is a conceptual commitment held prior to and independent of the evidence. The paper preregisters its thresholds and hypotheses. It does not preregister the conditions under which its moral coordinate system would be revised.

### 3.5 The method is more open than the frame

The awkward and valuable fact is that the paper's machinery is better than its framing. Because the counterfactual swap is mechanically symmetric, the study produced evidence that goes beyond its motivating narrative:

- a male-direction asymmetry;
- near-parity models;
- local race-specific inversions (for example, GPT-4.1-Nano Asian F/M 0.77);
- an age gradient opposite to the cited clinical pattern.

The instrument can see what the theory has difficulty naming.

A precision is needed here too. The swap *statistic* is symmetric by definition: exchanging the arms flips its sign. The *manipulation* is only approximately symmetric. Gendered names carry different signals of age, ethnicity, class, and familiarity, and pronouns differ in frequency and tokenization. Whether these differences matter is an empirical question (§4.5). The symmetry that does the critical work in this essay is *procedural*: whether the pipeline treats a female-direction and a male-direction result by the same rules. That is a property of the whole pipeline, from vignette selection to headline, not of the statistic.

### 3.6 The mirror-image risk

This critique cuts both ways. The remedy is not a counter-framework that presumes some other group is the hidden victim. That would be the same error with the sign reversed. The remedy is to make directionality, domain specificity, and magnitude empirical outcomes. Under that standard, a male penalty, a female penalty, a premium rather than a penalty, a domain-specific reversal, a lexical artifact, or no stable effect are all equally reportable. They should be reported in the same language and with the same prominence.

Two corollaries hold this critique to its own standard.

- **Procedural symmetry is not outcome symmetry.** A procedurally symmetric pipeline applied to a model that genuinely disadvantages women *should* produce lopsided conclusions. Nothing here implies that a female-direction finding is suspect because it is female-direction. DeepSeek's asymmetry, in particular, survives every objection raised below.
- **Procedural asymmetry biases conclusions; it does not settle them.** A large enough true effect survives a one-sided pipeline. Our claim is that the paper's framing distorts how its results are labeled, scaled, and generalized, not that its direction was predetermined.

---

## 4. Methodological Limitations

The paper's own Limitations section (§5.1) lists six items: single site, simplified vignettes, imperfect human ground truth, the combined name+gender swap, age removal under Blind, and backend differences. The issues below are either absent from that list or understate its consequences.

### 4.1 The Blind condition is a test-retest measurement, and it undermines H1

Appendix A describes the Blind transformation. The entire "Patient: Name, Age-year-old gender" line is removed and pronouns are neutralized. Appendix C shows the blinded vignette, which contains no information that differs between an original and its counterfactual. If the transformation works as described, **the two members of every Blind "pair" are the same text submitted twice.** Their disagreement rate is a repeat-run nondeterminism rate, not a gender-sensitivity rate.

The paper effectively concedes this for Gemini. It compares the 0.5% Blind flip rate against the 0.4% test-retest floor and calls them "statistically indistinguishable." But the same logic applies to every model:

| Model | Baseline flip (name+gender swapped) | Blind flip (identical inputs) |
|---|---|---|
| Gemini-3-Flash | 11.7% | 0.5% |
| GPT-4.1-Nano | 9.9% | 4.8% |
| DeepSeek-V3.1 | 12.0% | 11.9% |
| Mistral-Small-3.2 | 12.7% | 13.5% |
| Nemotron-3-Super | 43.8% | 63.5% |

This has three consequences.

1. **H1 is not established for three of five models.** For DeepSeek, Mistral, and Nemotron, the counterfactual flip rate does not exceed the disagreement rate on identical inputs. The paper says the 0.4% Gemini floor validates "that all observed effects reflect input differences rather than inference noise." That claim does not hold outside Gemini. Nemotron's 43.8% "gender sensitivity" is below its own identical-input disagreement rate.
2. **The Blind "debiasing" effect is largely tautological.** A 96% flip-rate reduction is guaranteed when the two inputs become identical and the model is near-deterministic. It shows that Gemini is deterministic on that backend. It does not show that blinding is an effective fairness intervention. The flip-rate "increases" under Blind for Mistral and Nemotron are likewise instability readings, not evidence that blinding worsens fairness.
3. **The directional findings survive, and they are the real result.** Stochastic noise should be direction-symmetric, and Blind F/M ratios are indeed near 1.0 for DeepSeek (1.00), Nemotron (0.99), Mistral (0.93), and GPT-4.1-Nano (0.99). So a baseline F/M that departs from 1.0 is evidence of a demographic signal even when the overall flip rate is noise-dominated. DeepSeek's 2.15 and, more modestly, Gemini's 1.34 and Nemotron's 0.92 are therefore the defensible signals. The study's evidential weight belongs on directional asymmetry, not on flip-rate magnitude.

One caveat on the third point. Mean direction is robust to random perturbation only if the perturbation's sign is random across vignettes. Here the original vignettes inherit the recorded gender of the source patient, and the counterfactual is always the edited text. If editing itself shifts outputs (for instance, because a name drawn from a swap pool reads differently from the original), that drift could load onto direction. A check of F/M split by original gender would settle this.

If the Blind transformation left some residual textual difference between pair members, the paper should document it. Otherwise this reinterpretation stands.

### 4.2 The thresholds are internally inconsistent and not tied to measured noise

H1 defines more than 5% as indicating "systematic gender sensitivity." The preregistered threshold table (Appendix H, Table 12) instead gives three bands for flip rate:

- below 5%: noise;
- 5–15%: concerning;
- above 15%: systematic.

The Methods text repeats the table: "above 0.15 indicates systematic bias." Under the table, Gemini, DeepSeek, Mistral, and GPT-4.1-Nano are all "concerning." Only Nemotron is "systematic," and Nemotron's flip rate is itself below its identical-input disagreement rate (§4.1).

The 5% cut-off is also described as the level "attributed to stochastic variation." Yet the only measured stochastic floor is 0.4% for Gemini, and Blind runs imply floors of 5–64% for the other models. The threshold was neither derived from measured noise nor validated against it.

A related inconsistency: §3.7 names Demographic Parity Difference "the primary metric." §3.8 and the results treat it as secondary to the counterfactual analysis. H4 was rewritten from a DPD criterion to a flip-rate/F/M criterion after DPD in the two-model pilot proved unremarkable. The authors disclose this revision honestly. Even so, it means the primary outcome changed after data were observed.

### 4.3 The noise floor is a single model on the wrong backend

The 0.4% test-retest estimate comes from:

- 499 valid pairs;
- 2 discordant events (Wilson CI 0.05–1.4%);
- one model;
- the OpenRouter endpoint.

The Gemini main panel was served through Ollama Cloud. No equivalent control exists for the other four models. Temperature-zero nondeterminism depends on provider, batching, precision, model revision, and serving stack. One cross-backend estimate cannot serve as a panel-wide floor. As §4.1 shows, the paper's own data reveal floors that vary by two orders of magnitude across models.

### 4.4 The ablations rest on incommensurable comparisons

**Cross-backend reference.** Ablation conditions are "compared against the original vignette's ESI prediction." The Gemini ablations ran on OpenRouter; the Gemini main panel ran on Ollama Cloud. If the reference predictions come from the main panel, every Gemini ablation flip rate includes cross-backend disagreement. This could explain a puzzling pattern:

- Gender-only, name-only, and age-preserving-blind flip rates are all about 18–19%.
- The combined swap is 11.7%.
- Full Blind is 0.5%.

The paper reads the gap between single-component swaps and the combined swap as "subadditivity," with a concordant name "stabilising" predictions. A simpler explanation is that the combined swap and full Blind were within-backend comparisons, and the ablations were cross-backend. The paper should state which run supplies each reference prediction.

**Shifting comparison structure.** In the main design, the F/M ratio compares a female twin with a male twin. In the name-only ablation, both members share a gender, so the ratio measures something else; the paper acknowledges this. In the age-preserving blind ablation, each original (named, gendered) is compared with its own stripped version. "Female undertriaged" then means that a female original received a less urgent ESI than its de-identified self. That is a neutral-baseline contrast, a useful design, but a different quantity. It also assumes that the stripped version behaves as a neutral midpoint. A model given no gender may impute a default one, or may respond to the missing information with its own caution. The Blind arm is a condition, not a mixture of the other two, and its behavior has to be characterized before deviations from it can be called deviations "from neutral."

**The age-channel inference does not follow.** The paper concludes that DeepSeek's residual F/M of 1.25 under age-preserving blind, falling to 1.00 under full Blind, shows that "age (alone or in interaction with clinical content)" carries the residual directional signal. The two conditions are not commensurable:

- Full Blind compares two identical texts (§4.1), so its F/M of 1.00 is the expected value for noise.
- Age-preserving blind compares a gendered original with a stripped copy.

The 1.25 → 1.00 change therefore reflects a change in comparison structure, not the removal of age. Moreover, age is identical within every pair. Age cannot carry a *between-gender* directional signal except through interaction with the gender token, and in the age-preserving condition the gender token has been removed.

**The ablations follow the narrative.** Ablations were run only for the two "Profile-A" models, "selected because they exhibit the panel's clearest directional female-undertriage signal." The model with a statistically detectable male-direction asymmetry (Nemotron) and the near-parity models received no mechanistic decomposition. The expected-direction result was explained in detail; the results that complicate the narrative were not.

### 4.5 Names carry more than gender

The primary intervention changes two semantically dense variables together. Names evoke gender, but also race, ethnicity, age cohort, class, region, and familiarity. The pools hold only 20 names per gender × race cell. Table 13 lists four races, while the race-stratified results include an "Other" category whose naming procedure is not described.

With 20 names per cell, idiosyncratic associations with particular names can dominate. "Keisha" and "DeShawn" are not neutral carriers of "female" and "male." The paper's own ablations show name-only swaps producing directional asymmetry (Gemini F/M 0.82).

There is also a statistical point. Names are nested within gender: female names appear only in female arms. The gender effect is therefore estimated against name-level variation, and the number of distinct names, not the number of vignettes or evaluations, limits how far the result generalizes beyond the specific names used. Treating name as a random effect, with many independently sampled names per cell, is the standard remedy. A pronoun-only swap with no name change would offer an independent check on how much of the effect is lexical.

### 4.6 The calibration "dissociation" may be partly structural

The outcome-linked calibration analysis links "each vignette … via its source stay_id" to the MIMIC disposition. A counterfactual twin shares its source stay_id with its original, so the male twin of a female patient carries *her* admission outcome.

If both originals and twins enter the gender-stratified calibration, then within each predicted ESI level the "female" group mixes real female outcomes with outcomes of real male patients rendered as women, and vice versa. This pooling pulls gender-specific admission rates toward each other. For a model whose predictions rarely flip, it mechanically compresses the calibration gap.

The low gap of 0.013 for DeepSeek may therefore be partly an artifact of the design rather than a substantive "Chouldechova-style dissociation." The paper should report calibration on originals only, where gender and outcome belong to the same real patient.

Separately, the authors acknowledge that Chouldechova's theorem concerns group calibration versus equalized odds, not individual counterfactual invariance. The label adds rhetorical weight without corresponding formal content.

### 4.7 The chain-of-thought collapse may be a parsing artifact

Under CoT, Gemini assigned ESI-1 to 93% of cases (κ 0.598 → 0.006). The CoT prompt asks for numbered steps: "1. Identify the chief complaint… 2. Evaluate… 3. Consider… 4. Assign…" Output was capped at 1,024 tokens. Two failure modes could produce exactly this collapse:

- **First-integer extraction.** A parser that takes the first integer between 1 and 5 would capture the "1." that opens the reasoning.
- **Truncation.** Long reasoning cut off before "ESI Level: [1–5]" would leave no answer, and a fallback could default to an extreme value.

The paper attributes the effect to an "overtriage cascade" without analyzing the generated text. Before CoT is declared "not safe by default," the parser's behavior on CoT outputs and the truncation rate should be reported. The broader CoT finding may well survive. The magnitude of the Gemini collapse needs verification.

### 4.8 The reference standards are imperfect and partly circular

Accuracy is measured against recorded human ESI. The paper's motivating premise is that human triage is itself gender-biased. If so, concordance with human ESI is not clinical correctness, and departure from it is not clinical error.

The terminology compounds this in two places.

- **Group-level "undertriage"** is operationally defined as *disagreement with the human reference*. The authors acknowledge this, but the term still carries clinical connotations in the headline language.
- **Pairwise "female undertriage"** in the F/M ratio does not even use the reference. It counts pairs in which the female version received a less urgent ESI than the male version. Without an independent standard, that observation is *identical* to "the male version was overtriaged," and also compatible with both versions being defensible. A paired difference licenses only one description: "the female version received a less urgent ESI than the male version." Every description in terms of under- or overtriage, in either direction, is a separate claim requiring an external standard. The paper consistently picks the female-undertriage description, and Figure 4 calls the same quantity "female-disadvantaged."

The alternative target, hospital admission, reflects clinical need. It also reflects bed availability, institutional protocol, insurance, patient preference, and the same social processes under audit. Neither reference is an independent expert standard.

### 4.9 Data quality in the vignettes

The paper's illustrative vignette (Appendix C) reports **BP 211/10 and RR 46** in a patient with SpO₂ 97% and HR 78. A diastolic pressure of 10 mmHg is incompatible with the rest of the picture, and probably reflects a data-entry error in the source record. Its presence in the showcase example suggests that vitals were not range-checked.

Implausible vitals matter for a fairness audit. They create ambiguous cases in which a model has no stable clinical anchor, so outputs may drift with irrelevant features. That inflates both flip rates and apparent demographic sensitivity. The validation step checks only for non-missing values and word count.

### 4.10 Small cells and missing intervals in subgroup claims

The most striking subgroup ratio, DeepSeek chest-pain F/M 9.10:1, rests on 91 versus 10 flips. Gemini's ESI-1 ratio of 2.03 rests on 75 versus 37. Race- and age-stratified F/M ratios are reported without confidence intervals or multiplicity correction, across 5 models × 8 categories × 5 races × 3 age bands.

Several "novel findings" rest on these stratified point estimates. These include the age-gradient inversion and the Hispanic (2.79) and Asian (2.47) peaks for DeepSeek. They should be presented as exploratory and hypothesis-generating.

### 4.11 Category mismatch in the "age inversion"

The paper calls its age gradient an inversion of Vaccarino et al. Vaccarino measured in-hospital *mortality* after myocardial infarction in young women. EQUITRIAGE measures *directional ESI disagreement across all complaint categories*. These are different outcomes in different populations. The comparison does not show that LLMs "invert" a human bias. It shows that the human literature chosen to frame the study does not map cleanly onto the quantity being measured. That is the estimand mismatch of §3.3 in miniature.

### 4.12 Unsupported directional claims about validity

The limitations section asserts that text-only bias "represents a lower bound on bias in richer clinical interactions." No evidence is offered. Richer inputs might amplify demographic effects, but they might equally swamp them with clinical signal. The direction of the ecological-validity gap is an empirical question.

### 4.13 Sampling and generalization

The sample is stratified to 16.8% ESI-1, against 5.9% in the source data. It comes from a single academic center, Beth Israel Deaconess (2011–2019). The authors note both points. The consequence deserves emphasis: flip rates, F/M ratios, and the per-1,000 "disagreement" counts cannot be read as deployment-scale harm estimates without prevalence weighting.

### 4.14 The swappable subset narrows scope

Obstetric presentations were excluded from the cohort, and 22 further sex-linked vignettes were left unpaired. This is a sensible design decision, but it has a consequence the paper does not state. The swappable set is enriched for presentations where anatomical sex matters least. That does not bias the sign of any difference, but it does shape which patients the results describe. Swap conclusions apply to swappable content only. Sex-specific conditions need a separate audit against sex-specific standards, where no paired difference exists at all.

The reverse problem also arises. Several categories the paper treats as swappable, chest pain above all, are ones where sex genuinely shifts pre-test probability. The swap holds those vignettes "clinically constant," but clinically constant text is not clinically equivalent patients. This connects to the second source of flips in §5.

---

## 5. Interpretive Overreach: Difference Is Not Automatically Injustice

Even with the measurement issues set aside, the paper moves too quickly from *counterfactual sensitivity* to *bias*. A flip can arise from at least four distinct sources:

1. **Clinically irrelevant demographic influence.** The model responds to an unjustified association.
2. **Clinically relevant sex-linked priors.** Sex genuinely shifts the probability or interpretation of a presentation, and the vignette is too sparse to override that prior.
3. **Counterfactual incoherence.** The swap creates a statistically unusual combination of name, sex, medications, and history.
4. **General instability.** The output changes for reasons unrelated to demographics. §4.1 suggests this source dominates for at least three models.

A more disciplined vocabulary would separate:

- **counterfactual sensitivity:** any change under a swap;
- **directional asymmetry:** an unequal distribution of changes;
- **disparate treatment:** a reliable directional difference on content where sex is clinically irrelevant. This does not require an external standard, because identical clinical content should receive identical acuity. It does not say which sex is harmed;
- **clinical error disparity:** changes that reduce correctness against an independent standard;
- **unjustified demographic bias:** demographic influence lacking clinical warrant.

Only the last category deserves the word "bias" in its normative sense. The disparate-treatment category is the strongest claim the paper's data can support without a gold standard. It is also narrower than it looks. It holds only on sex-neutral content, and someone must decide which presentations are sex-neutral. In emergency medicine, that set may be small and weighted toward low acuity. If the investigators who hold the motivating prior also classify neutrality, the prior can enter through the classification.

This matters most for interventions. In medicine, the fairness target is not ignorance of demographics. Sex, age, pregnancy status, and epidemiological prevalence are often clinically relevant. A model that ignores real sex-linked risk can be perfectly counterfactually invariant and clinically worse. The right standard is *demographic dependence only where it is clinically justified and accurately calibrated*. That is not the same as invariance, and Blind removal of age shows the cost of conflating the two. What must be symmetric across the sexes is the *scrutiny* applied to a justification, not its *acceptance*. Clinical justification may genuinely run in one direction only, as with ectopic-pregnancy risk in reproductive-age women.

The structure of the ESI scale adds another layer. ESI is not a single continuum. Levels 1 and 2 turn on life-saving intervention and high-risk features, including severe pain or distress and danger-zone vital signs. Levels 3 to 5 turn largely on predicted resource use. A gender effect on resource prediction is a different phenomenon from a gender effect on danger assessment, and a single ratio averages the two. Severe pain sits at the 2/3 boundary, which is exactly where the human-clinician literature on gendered pain assessment concentrates. An analysis by decision point would test the paper's motivating hypothesis far more directly than an aggregate F/M ratio.

The same logic applies to intersectional analysis. The paper uses intersectionality procedurally, through race-concordant names and stratified tables. It reads intersectional results mainly as stronger or weaker versions of the aggregate female-direction pattern. An open analysis would allow sign reversals to count as findings. Psychiatric, pain, substance-related, or suicidality presentations, for example, might disadvantage men even if chest pain disadvantages women. Aggregate direction can conceal domain-specific reversals in either direction. That possibility is itself a hypothesis, and it is held to the same standard of evidence as the one it complements.

---

## 6. What Would Falsify the Framework?

A framework earns scientific standing by specifying in advance what would count against it. EQUITRIAGE preregistered model-level hypotheses. It did not preregister answers to questions such as these:

- What result would show that demographic invariance is the wrong fairness target for a given complaint?
- At what magnitude is a male-direction asymmetry treated as clinically and morally equivalent to a female-direction asymmetry of the same size?
- What evidence would distinguish a *female penalty* from a *male premium*, or a *male penalty* from a *female premium*? A two-arm swap without a neutral arm cannot tell which condition moved away from baseline.
- What result would show that the documented human disparity is *not* being reproduced, as opposed to being "inverted" or "novel"?
- What result would show that a token-level swap is the wrong test of a presentation-mediated prior?
- When does movement toward an F/M of 1.0 count as mitigation, and when does it mask opposing subgroup biases or added noise?
- What result would show that blinding removed clinically useful information rather than bias?

A usable answer is quantitative and recorded in advance. For example: "equivalence within a stated margin on the swappable set, or a male-direction difference beyond that margin in a named complaint category, counts against the hypothesis that this model reproduces female undertriage." Once such a criterion exists, whether the discussion honors it can be checked rather than argued.

Without answers, every pattern of results can be absorbed. The next generation of this research should make the interpretive framework as vulnerable to evidence as the models are.

The same demand applies to this critique. Our claim that the paper's interpretation is asymmetric rests on one paper. Whether sign-asymmetric interpretation is a meaningful source of error in the wider literature on clinical AI audits is a hypothesis, currently unmeasured. It could be tested by coding published audits with the sign of each finding masked, and checking whether evidence attributes such as reported intervals, null results, equivalence tests, and scope statements differ by direction. If they do not, this concern is negligible for that literature, and we should say so. Equally, a study that meets the standards proposed below and finds female disadvantage should be credited as such, in the same language and with the same scope limits as any other finding. A critique that no study could satisfy would be its own kind of doctrine.

---

## 7. Agenda for Follow-Up Research

The agenda below is long, and length has a cost. Every added safeguard makes careful audits more expensive, and expense quietly shapes which findings get produced. We therefore distinguish a **core** that any team should run from **extensions** to run when resources allow. In our judgment, the core is items 1, 2, 3, 7, 13, and 21, together with vignette-clustered inference, balanced or templated authorship, strata defined only by ground truth or preset clinical category, per-arm exclusion rates, and equivalence tests reported alongside difference tests. The remaining items are extensions. Where an extension is omitted, the corresponding claim should simply be withheld, not the study dismissed.

Safeguards should also be removable on evidence. If pronoun-only and name-based swaps agree within a clinically meaningful margin across several models, the requirement for large name pools can be relaxed. If the coded audit of the literature (item 23) finds negligible interpretive asymmetry, the reviewer-framing and falsification apparatus can be scaled back.

| # | Research item | Question addressed | Design | Success / falsification criterion |
|---|---|---|---|---|
| 1 | Model- and backend-specific test-retest | How much flip rate is pure nondeterminism? | Repeat identical prompts for every model on the exact endpoint, version, decoding settings, and time window of the main runs | Report *P(flip ∣ swap) − P(flip ∣ identical input)* with CIs on both terms; a model is "sensitive" only if the difference excludes zero |
| 2 | Reanalysis of existing Blind runs as noise floors | Is H1 supported once each model's own floor is used? | Treat Blind pair disagreement as test-retest; verify textual identity of Blind pairs | Retract or restate H1 for any model whose baseline flip rate does not exceed its Blind rate |
| 3 | Directional-excess reporting | Are asymmetries reported on a common scale? | Report net directional excess (pp of pairs) and absolute affected-patient counts alongside F/M for every model | Equal-magnitude asymmetries receive equal descriptive prominence regardless of direction |
| 4 | Full ablation matrix on all five models | Which input channel drives each model's behavior? | Gender-token only, name only, pronoun only, name+gender, age-preserving blind, full blind, sex-retained/name-removed — all within one backend and one reference run | Mechanism claims are made only for contrasts with the same comparison structure |
| 5 | Neutral-arm design (S_M, S_F, S_∅) | Penalty or premium? Which arm moved? | Add a gender-absent arm with age and all clinical content retained; characterize whether it resembles either gendered arm | Classify each effect as female penalty, male penalty, female premium, male premium, or symmetric instability |
| 6 | Name as a random effect | Are "gender" effects really name effects? | 100+ names per gender × race cell, sampled independently; mixed-effects model with name random intercepts | Gender effect must survive after name-level variance is partialled out |
| 7 | Originals-only calibration | Is the calibration "dissociation" substantive? | Recompute Cal_gap using only original vignettes whose gender and outcome belong to the same real patient | Dissociation claim stands only if it persists without pooled counterfactual outcomes |
| 8 | CoT parser and truncation audit | Is the CoT collapse real or an extraction artifact? | Report truncation rate at 1,024 tokens; re-parse CoT outputs with an anchored "ESI Level:" extractor; rerun with a larger token budget | CoT degradation claim retained only for effects that survive correct parsing |
| 9 | Vitals quality control | Do implausible inputs inflate instability? | Range-check vitals; rerun on clean versus flagged subsets | Compare flip rates and F/M between clean and implausible-vital vignettes |
| 10 | Severity-weighted flip metric | Which flips matter clinically? | Weight by ESI distance and threshold crossing, e.g. *WFR = (1/N) Σ wᵢ ∣ESIᵢ − ESIᵢᶜᶠ∣*, with heavier weights across the ESI-2/3 boundary and for high-acuity undertriage; justify weights from outcome data independent of expected direction | Rank models by expected harm, not raw disagreement; always report unweighted results alongside |
| 11 | Blinded expert adjudication | Is a flip an error, a defensible judgment, or bias? | Emergency clinicians, blind to model, arm order, and study hypothesis, adjudicate a stratified sample of discordant pairs | Separate rates of clinically justified sensitivity, error, and unjustified demographic reasoning |
| 12 | Sensitivity / error / harm decomposition | Is every difference treated as injustice? | Classify each discordance on three axes: did output change, did correctness drop, would priority plausibly change | "Bias" is used only for unjustified, erroneous, consequential differences |
| 13 | Direction-neutral preregistration | Is directionality an outcome or a premise? | Preregister: "No demographic group is presumed advantaged, disadvantaged, sympathetic, or suspect; direction, magnitude, and domain specificity are outcomes" | All directions reported with identical terminology, prominence, and scope limits |
| 14 | Powered domain-specific reversal analysis | Does direction flip across domains? | Preregistered gender × complaint, age, race, acuity, and pain-score interactions, powered to detect sign reversals, with multiplicity control | Subgroup findings with CIs; reversals in either direction treated as primary results, not anomalies |
| 15 | Reasoning-text audit | How does demographic information change the explanation? | Code generated rationales for psychologization, drug-seeking suspicion, minimization, paternalism, over- or under-estimation of danger | Detect interpretive asymmetries even when final ESI matches |
| 16 | Compassion-allocation companion study | Is suffering recognized equally across demographics? | Medically equivalent patient statements; measure warmth, belief, validation, suspicion, pathologization, urgency, and agency-preserving advice by gender | Report direction-neutral differences in recognition and credibility, not only in scores |
| 17 | Debiasing integrity tests | Does "mitigation" just move or hide bias? | For each intervention, test pairwise invariance, subgroup error, calibration, severity-weighted harm, and stability together | An intervention succeeds only if it improves fairness without hidden subgroup reversals, added noise, or clinical loss |
| 18 | Multi-site, multi-version replication | Do findings generalize across settings and model updates? | Replicate across institutions, regions, triage protocols, and prospective cases; record model ID, provider, and evaluation date | Effects stable across sites and versions, or their instability is itself reported as a finding |
| 19 | Framing experiment on reviewers | Do researchers allocate concern asymmetrically? | Present identical audit results to blinded reviewers under historical-disparity, direction-neutral, patient-safety, and reliability framings, with demographic direction randomized | Detect whether perceived seriousness and recommended action depend on which group is disadvantaged |
| 20 | Preregistered falsification conditions | What would revise the framework? | Specify quantitatively, in advance, which results would redefine "bias," "mitigation," and the appropriate fairness target for each complaint domain | Framework counts as testable only if at least one plausible outcome would force revision |
| 21 | Estimand statement and presentation-profile audit | Does the swap answer the question the prior asks? | State the swap estimand as a token-level effect on swappable vignettes; separately vary sex-typical symptom profiles with gender held constant or masked, scored against an independent standard | Claims about sex disparity in triage are made only from the presentation-profile design; swap results are scoped to token effects |
| 22 | Decision-point analysis of ESI | Does gender act on danger assessment, pain weighting, or resource prediction? | Classify each discordance by the ESI criterion that drives it (life-saving intervention, high-risk, severe pain/distress, vital-sign uplift, resource count); test proportional-odds assumptions | Gender effects reported per decision point, with the pain/distress criterion as a preregistered contrast |
| 23 | Sign-masked coding of published audits | Is interpretive asymmetry common, or a feature of one paper? | Coders, blind to the true direction of each finding (signs masked or randomly flipped), code evidence attributes and labels across a preregistered sample of clinical AI audits; check whether coders can guess the true sign | Numerical negligibility thresholds stated before coding; results published whichever way they fall |

---

## 8. Conclusion

EQUITRIAGE is not pseudoscience. It is a large, transparent, technically ambitious audit. It establishes three useful facts: LLM triage outputs can be demographically sensitive in model-specific ways, fairness properties diverge, and fashionable interventions, from fairness prompts to step-by-step reasoning, can backfire.

Its defensible empirical core is narrower than its headline. Once each model's identical-input disagreement rate is taken into account, flip-rate magnitudes largely measure instability. The Blind "debiasing" effect is largely a determinism check. The age-channel attribution and calibration dissociation rest on comparisons that do not support them. What remains robust is directional asymmetry: substantial in DeepSeek-V3.1, and modest in Gemini-3-Flash and in Nemotron-3-Super, where it runs in opposite directions. Even that core answers a specific question: does the gender token shift acuity on fixed clinical content? It does not answer whether these models would under-triage real women, or real men, whose presentations differ.

The deeper problem is that the paper is rigorous about model behavior and much less rigorous about the framework through which it interprets that behavior. Its instrument can find a disadvantage in either direction. Its theory enters the study already knowing which direction counts as the paradigmatic injustice, and already assuming that a token swap tests a literature about something else. As a result, the evidence it produces exceeds the explanatory openness of the framework that receives it.

The remedy is not a rival framework with the sign reversed. It is a framework that can lose. That means:

- Directionality is an outcome, not a premise.
- Counterfactual difference is not automatically injustice.
- Clinical relevance, error, and harm are measured separately.
- The audit's estimand matches the question its motivating prior asks.
- The fairness framework states in advance what evidence would prove it wrong.

EQUITRIAGE put LLM triage behavior under audit. The necessary next step is to audit the moral coordinate system the audit was built on, and to hold that second audit, including this one, to the same standard.
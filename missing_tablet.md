# The Missing Tablet

## On Exponentials, Overgrowth, and the Commandment Moses Dropped

In Mel Brooks's *History of the World, Part I* (1981), Moses comes down from the mountain carrying three stone tablets. "The Lord Jehovah has given unto you these fifteen..." One tablet slips and shatters. He looks at the fragments, then back at the crowd. "...Ten! Ten Commandments!"

It is a perfect joke because it is a perfect premise. Somewhere there were five more rules, and we never got them. This essay proposes, half seriously, that at least one of them concerned finance. More specifically, it said something like this:

> *Thou shalt not separate the one who chooses a risk from the one who bears it.*

Getting there takes a detour. It runs through Moore's Law, the datacenter boom, a weedkiller that makes plants grow themselves to death, the asymmetry hidden inside an ordinary mortgage, and the problem of what insurance actually is. Each stop exposes the same broken circuit. The detour is the argument.

---

## I. The Most Consistent Law That Isn't a Law

Start with a question that sounds like a provocation. Is Moore's Law the most consistent sociological mechanism we have ever observed?

The usual description is technical. Transistor density on integrated circuits roughly doubles on a regular cadence. The original 1965 formulation and the 1975 revision differed, and conventional transistor scaling has slowed in recent years. Still, the trajectory held with uncanny regularity for decades. By the standards of social science, that regularity is bizarre.

The regularity is not the strange part. The strange part is that *everything underneath it changed*. Lithography techniques were replaced. Materials were replaced. Architectures were reinvented. Fabs became enormously more expensive. Firms rose and died. Supply chains globalized. Whole generations of engineers retired. Entirely new markets appeared: personal computers, the internet, mobile phones. The trend also ran through recessions, the end of the Cold War, and massive corporate turnover.

And still the aggregate curve stayed close to smooth.

This is the inverse of how sociological "laws" usually behave. Population growth changes regimes. Fertility transitions change regimes. Productivity growth wanders. Inequality reverses. Political coalitions reorganize. Fashions saturate. Most proposed social regularities dissolve once incentives, institutions, technology or definitions shift. Moore's Law survived because the implementation kept shifting.

### Counterpredictions as evidence

Here is the decisive point. If Moore's Law were mainly a physical scaling law, credible technical forecasts of its end should have come true. Many were made: optical lithography cannot go further, this feature size is a hard floor, heat dissipation will stop us. Yet again and again, the specific mechanism people expected to fail was replaced by another one that kept something close to the trajectory.

That does not erase the physics. It changes what the law describes. When the implementation keeps changing and the target stays fixed, you have found a higher-level invariant. Consider an animal holding its body temperature through sweating, vasodilation, metabolic adjustment, and simply moving into the shade. You would not say sweating *causes* the 37°C setpoint. You would infer a regulatory system that recruits whatever mechanisms are available to hold it.

Moore's Law looks the same. The technical mechanisms are actuators. The trajectory is the setpoint.

The history supports this reading. Gordon Moore and his colleagues actively promoted the law across the microelectronics community. Keeping the curve alive required suppliers of materials and equipment to deliver on schedule. Industry roadmaps were later built explicitly to set the direction and cadence of innovation. The "law" functioned as a benchmark and a target. It was a published expectation that coordinated thousands of actors who watched each other, invested against anticipated capability, and competed so as not to fall behind.

Most social predictions change behavior in ways that destroy their own accuracy. Moore's Law became public knowledge and changed behavior in ways that *increased* its accuracy:

> prediction → norm → coordination target → investment → technical search → fulfillment → stronger belief in the prediction

A self-stabilizing prophecy.

### The simpler model

The obvious temptation is to romanticize this: civilization discovered a clock signal, an exponential control loop, a destiny. A much plainer account explains the persistence better:

*There is always a frontier to explore and grow into. There is a current exploration and investment budget. That's it.*

Spelled out:

1. Somewhere there is a technical frontier where more effort buys improvement.
2. Society commits some fraction of its resources to exploring that frontier.
3. Successful exploration enlarges the economically useful territory.
4. The larger territory produces the surplus from which the next exploration budget is drawn.
5. Competition keeps spending high, because unexplored frontier is frontier a rival can take first.

If the reinvestment fraction and the productivity of exploration stay roughly stable, exponential growth follows almost trivially. Growth becomes proportional to the size of what has already been built. You don't need an exponential technology. You need investment proportional to the existing productive base, plus somewhere worthwhile to put it.

This also explains the failed counterpredictions. "We can't shrink feature X much further" is a claim about one direction across the frontier, not about the frontier as a whole. When the budget hits a wall it spreads sideways into materials, packaging, architecture, parallelism, software, yield, specialization, wherever there is still gradient.

It also gives a real failure condition instead of mystical exponentialism. Growth stalls when the exploration budget collapses, or when the reachable frontier stops paying.

---

## II. When the Frontier Outgrows the Fab

The datacenter hyperscalers make this model almost embarrassingly literal.

In the old story, better transistors produced cheaper computation, which produced more demand. In the hyperscaler story the arrow increasingly runs the other way. Demand and expectation produce capital, and the capital searches every available dimension for more computation. Capital expenditure by the largest cloud and AI operators now runs to hundreds of billions of dollars a year, and the published guidance keeps pointing upward.

The budget does not much care which engineering variable absorbs it. If transistor density pays well, money goes there. When that frontier gets harder, the money moves into larger dies and chiplets, advanced packaging, high-bandwidth memory, custom accelerators, networking, rack density, cooling, power delivery, datacenter topology, site selection, power generation, compilers, model optimization, and scheduling. These are not equivalent improvements. They are *substitutable destinations* for the exploration budget.

The chip was a rectangle, and progress happened inside it. At hyperscale the rectangle dissolves. If one processor can't be made twice as powerful, deploy two. If communication becomes the bottleneck, fix the interconnect. Then memory, then packaging, then cooling, then power. Then build another campus next to cheaper electricity. Power, transformers, grid interconnection and construction have become first-class constraints on computing. Capital itself has become an architectural component.

This invites an elegant inversion. Moore's Law didn't make the hyperscalers possible. The hyperscalers are what the mechanism *underneath* Moore's Law looks like once it no longer fits inside a fab.

That conclusion is flattering to the industry, and that is reason to be suspicious of it.

---

## III. The Weedkiller Test

For a stress test, pick a field where nobody is inclined to hype an exponential destiny: herbicides.

2,4-D was commercialized in the mid-1940s and helped launch the selective herbicide market. It is a synthetic auxin, a molecule that resembles the plant hormone regulating growth closely enough to hijack it. It was a real conceptual breakthrough. It did not poison vegetation crudely. It manipulated the plant's own control system, so broadleaf weeds died while cereal grasses were largely spared.

Agriculture has had a huge, continuous economic incentive to improve weed control for about eighty years. The R&D money has never stopped. Yet there is no Moore's Law of weedkilling. Nobody has seen weeds-killed-per-dollar double every eighteen months.

The first reason is obvious. Weeds evolve. Because 2,4-D acts through an endogenous signaling network, resistance was once thought to be relatively hard to evolve. Decades of intense selection found ways around it anyway, through metabolic detoxification and altered signaling or translocation. Every successful deployment changes the population the next deployment will face. The exploration budget is searching a landscape partly shaped by its own earlier searches.

This exposes a term missing from the frontier-and-budget model. Returns from the frontier have to be set against counterpressure: adaptation, depletion, complexity. Silicon does not notice that you built a smaller transistor and breed resistance to lithography. Weeds do. So the bare primitive, *there is always a frontier and there is always a budget*, does not predict exponential improvement. It predicts persistent exploration. What that exploration produces depends on how the territory responds.

The herbicide teaches something else, though, and it matters more.

### Growing itself to death

A plant treated with a synthetic auxin is not poisoned in the ordinary sense. Nobody is burning its tissue. Its *growth signal* is driven past any useful level. The plant elongates, twists and proliferates. Visibly it is growing furiously, and the growth consumes it.

That is a far better analogy for the datacenter buildout than "bubble."

A bubble is a pricing pathology. Assets come loose from fundamentals and eventually reprice. What the auxin offers is a *morphogenesis* pathology. Real resources are turned into real infrastructure in response to signals that the expansion itself may be generating. Competitors' capital spending becomes evidence that you need capital spending. Forecast demand justifies capacity. New capacity makes compute cheap enough to stimulate usage. Usage validates the forecasts. Financing depends on expectations of even greater future usage.

None of this requires fraud or stupidity. Every cell can behave correctly by its own lights. And when expectations reset, the tissue does not vanish. Substations, transmission lines, fabs, accelerators, fiber, cooling plants, trained workforces and financing obligations stay behind.

There is a further distinction that capability curves hide. Moore-type growth gets more capability from a roughly fixed resource budget. Buildout growth gets more capability from a larger resource budget. The two can produce similar-looking exponential curves while representing almost opposite trends in efficiency. Exploration normally finds ways to do more with the accumulated base. If the exploration budget itself becomes the thing growing without limit, the feedback has moved out of capability and into consumption.

That is the auxin signature: *the signal that normally coordinates productive growth is amplified until growth consumes the organism faster than the new structure improves its fitness.*

### The missing denominator

The two stories can be told apart, but only by asking the right question. Whether compute, square footage, accelerator shipments or capex are growing tells you nothing, because both hypotheses predict growth. The real test is whether *final economic output attributable to the additional compute* grows at least as fast as the *all-in resources* consumed to get it: hardware, energy, grid, water, labor, financing, and externalized costs. And it has to be measured against a counterfactual in which the capacity was never built.

Several traps lie on the way to that number. The buildout itself counts as investment, and so as current GDP. Construction activity cannot prove the downstream value of what is constructed, any more than a tumor's mass proves the organism is thriving. Supplier revenue is not final value either. When a hyperscaler buys accelerators, the chipmaker records revenue, but that is a transfer within the buildout, not evidence that the buildout pays. Fertilizer sales are easy to measure. So is the height of the plant. What is not published is whether each extra kilogram of plant photosynthesizes enough to pay for keeping that kilogram alive.

The evidence we have is mixed in a telling way. AI produces real, measurable gains in bounded tasks. Broad aggregate transformation is still hard to see. Meanwhile financing is spreading outward, beyond internally generated cash, into leases, joint ventures, project debt, private credit and special-purpose vehicles. Much of the asset base is short-lived computing hardware, not century-scale infrastructure.

Most telling of all, the companies disclose a great deal about *inputs*: capex, capacity, backlogs, cloud growth, AI revenue when it flatters them. They do not disclose the number that would settle the matter, the incremental return on incremental AI capital employed. There are innocent reasons. Capacity serves mixed workloads, and attribution is genuinely hard. But at valuations premised on enormous future cash flows, the absence of the most valuation-relevant unit economics is not neutral. A strong, simple number would be published, and its absence is mild evidence that there isn't one.

The leading indicator of poisoning, then, is not falling AI revenue. It is this:

> *capex and resource demand accelerating while marginal attributable output per unit of resource falls.*

Vigorous growth with a falling systemic return on that growth. In that scenario, the visible growth is not evidence against poisoning. It is the symptom.

So why can an organism keep expressing a growth signal while the metabolic cost is pushed elsewhere? The answer is the missing tablet.

---

## IV. What the Tablet Said

Put the datacenter question to one side and ask a more basic one. In a decentralized economy, what does a capital flow *mean*?

Ideally it means this: *someone with resources looked at this project and decided it was worth risking those resources.* That is the information a price, a loan or an investment is supposed to carry. Every capital allocation is a judgment, and the judgment is disciplined because the person making it pays when they are wrong.

Two rules would protect that meaning:

1. **Investments shall not be delegated.** If you choose what to invest in, your own capital should be at stake. You should not make speculative allocations mainly with beneficiaries' money while collecting fees whatever happens.
2. **Loans shall not be transferred.** If you decide a borrower is creditworthy and write the loan, you should stay exposed to that borrower. You should not manufacture loans under one set of incentives and make them someone else's problem.

These look like two separate prohibitions. They are one.

### The duality

Write any financial commitment as a pair: the agent who exercises the *judgment* (J), and the agent whose capital bears the *consequences* (R). In a direct transaction they are the same person. I decide whether to lend my money. I decide whether to invest my money. The feedback loop closes through me.

**Delegated investment** leaves the capital where it is and moves the judgment. The principal's money is at risk while an agent decides how to risk it.

**Loan transfer** leaves the judgment where it is and moves the capital. The originator decided the borrower was good. Someone else now owns the consequences of that decision.

One moves judgment away from capital. The other moves capital away from judgment. Both break the same edge, the link between the one who chooses a risk and the one who bears it. Seen this way, the two commandments are a single commandment applied from opposite sides of a transaction:

> **Risk judgment shall not be separated from risk bearing.**

Everything else is implementation.

Much of sophisticated finance can then be classified by how it breaks this invariant. The critical variable is not complexity, securitization, leverage or "financialization." Those are downstream effects. The critical variable is the *distance* between whoever decides that a risk should exist and whoever's wealth eventually answers for that decision. Direct lending and direct investing have zero distance. Managed money adds distance by moving judgment. Transferable credit adds distance by moving exposure. Chains of funds, securitizers, servicers, guarantors, SPVs and derivatives add more.

As the distance grows, something worse than moral hazard sets in. *Prices increasingly encode agents' ability to place risk rather than principals' willingness to bear it.* An originated loan no longer necessarily means "someone with money decided this was worth their money." It may mean "someone decided someone else could probably be induced to carry this." In aggregate capital-flow statistics the two signals look identical. They are not the same information.

This is how the auxin works in a financial system. When the cells emitting the growth signal are cut off from the metabolic cost of the growth, the signal can strengthen indefinitely. Measured investment volume stops telling you how much wealth people are voluntarily risking on datacenters. It starts telling you how efficiently an institutional structure can mobilize other people's claims on future production.

### The asymmetry inside an ordinary mortgage

Loans show the problem most clearly, because a quiet asymmetry sits at the center of them.

A loan starts as a bilateral judgment. The lender judges the borrower creditworthy. The borrower accepts the lender's price and terms and takes on a long obligation *to that lender*. Afterward, only one side of the relationship stays put.

The borrower cannot say, "I've found a nicer creditor; I'm moving my obligation to them under the same contract." Refinancing is a new transaction, with new underwriting, new costs and someone else's approval. The creditor's claim, on the other hand, can be sold, and sold again. Servicing can move separately from ownership. Borrowers do not choose these transfers. Interest rate and term usually survive a sale, but the counterparty is not economically irrelevant. The servicer handles payments, escrow, records and, crucially, loss mitigation when things go wrong. Transfers have caused enough document and information failures that regulators have issued specific guidance on them.

So the borrower sold a long-duration promise, and the lender acquired a liquid asset. Those sound like descriptions of the same transaction, but economically they are not symmetric.

The asymmetry also destroys the information content of origination. In an originate-and-hold system, bad underwriting produces bad loans, and bad loans cost the originator money. That is clean feedback. The loan officer is not merely deciding whether someone should get $400,000. They are deciding whether *we* should hand over $400,000 and spend thirty years collecting it. Make transfer cheap and the target drifts, from maximizing the probability of repayment toward maximizing the probability that the loan can be originated and profitably sold. The constraint that lending used up the lender's capacity to bear credit risk has been removed.

### Why "meaningful exposure" fails

The standard reform is a compromise: let loans be sold, but require originators to keep "meaningful" exposure. The problem is that *meaningful* is not a stable institutional primitive. Once the rule is "retain a meaningful amount," a political optimization problem appears. What is the smallest amount regulators will certify as meaningful?

The end state is already on the books. U.S. securitization risk-retention rules generally let a sponsor satisfy the requirement by keeping 5% of the credit risk, in vertical, horizontal or combined form, with qualifying exemptions and structures and permitted affiliate holdings. *You made the loan, so it is your risk* has become *you made the loan, so 5% of a prescribed representation of its risk stays yours.* These are entirely different mechanisms.

An absolute rule has an underrated virtue: it has no parameter to negotiate. Regulation tends to evolve by parameter bargaining, from 100% to some α to 5% to 5% with exemptions. "Loans shall not be transferred" offers nothing to bargain over. It works less like a regulation than a conservation law. *Credit judgment creates an inseparable liability.* When I lend you money, I create your obligation to repay me and my obligation to have been right. The second cannot be sold.

A gentler version keeps most of the force. **A creditor may not be substituted without the debtor's consent.** Transfer is not forbidden. It is priced by the person being transferred. One borrower may consent for nothing. Another may want $200, or fifteen basis points off the rate. Another may refuse outright, having chosen a small credit union over a megabank for good reason. Today the system effectively sets the value of the borrower's counterparty preference at zero. Markets did not discover that it is zero. The property right was simply assigned entirely to the creditor. A consent requirement reassigns it, and a lender planning to "originate and dump" must then price what dumping will cost. The friction lands exactly where it belongs: *making a thirty-year credit judgment creates a thirty-year consequence.*

The costs are real. Credit becomes less liquid. Lenders become more conservative. Maturity transformation gets harder. Insolvency, mergers and receivership need continuity rules. But some of those costs are the intended signal. If forcing a lender to keep a thirty-year mortgage makes the lender unwilling to write it, then the transferable system was perhaps never discovering that the mortgage was prudent. It was discovering that someone else could eventually be persuaded to own it.

---

## V. The Snag: Insurance

The tidy version of the commandment, *thou shalt own thy bets*, fails at once against something plainly good: insurance.

Insurance is risk transfer by definition. If transferring risk is the sin, insurance is a sin. Yet pooling risks that individuals cannot efficiently bear alone is one of the most valuable things finance has ever done. A rule that forbids it is a bad rule.

The first repair distinguishes kinds of risk. *Exogenous* risk, such as lightning, illness or shipwreck, was not chosen by anyone, and pooling many roughly independent exposures turns individually catastrophic variance into manageable variance. *Chosen* risk, such as the loan an originator deliberately writes, is a judgment, and its consequences should stay with the one who made it. So: transfer the hazards of fortune freely, but stay answerable for hazards of your own choosing. Deductibles, coinsurance, exclusions for deliberate acts and underwriting all make sense as ways to keep the chooser coupled to whatever part of the loss they control, while the uncontrollable tail is pooled.

That repair helps, but it is not the right one. The right one is about *governance*, not about the nature of the hazard.

### A society, not a transaction

Insurance is not fundamentally "I pay corporation X to assume my risk." It is "we who face a class of risks form a pool, contribute to it, and collectively govern when it pays out." That is a *society* in the old sense: an association formed for a common purpose.

The legitimacy condition is therefore representational. **The body that pays out must be controlled by those who pay for coverage.**

In such a society each member has three things at once: an obligation to contribute, a contingent claim on the pool, and a voice in the institution that sets the rules. The individual's risk is transferred, but it is never cut off from the people who bear its aggregate cost. A payout is not a settlement between opposing parties. It is a collective allocation: *one of us has suffered an event our rules say the pool covers.*

This is not hypothetical. It is the logic of mutual insurance, where policyholders rather than outside shareholders own the company and hold governance rights, and where surplus stays with the members. Compare a stock insurer. There, premiums minus claims minus expenses equals profit, and lower payouts benefit a residual owner *outside* the insured population. The mutual structure closes that loop. It does not guarantee good administration. Members can be apathetic, turnout is often low, and executives can capture effective control. Representation has to be substantive, not ceremonial. But the conceptual line is sharp:

> *Insurance is legitimate delegation because the people bearing the pooled cost also constitute the sovereign body governing the delegation.*

This refines the commandment rather than weakening it. The tablet was never hostile to collective finance. It was hostile to *unrepresentative* financial agency. Pooling is fine. Delegation is fine when the delegators govern the delegate. What is forbidden is *alienated* risk, where someone gains the authority to create or select a risk while arranging for unrelated principals to suffer the downside.

### Echoes

We have reached this point by mechanism design, without religious premises, yet the territory has been surveyed before. Islamic commercial jurisprudence has spent centuries worrying about the same things. *Riba* reflects suspicion of turning a loan itself into a source of return. *Maysir* restricts gambling, meaning payoffs that come from wagering on uncertainty rather than from productive participation. *Gharar* targets excessive contractual uncertainty and the sale of uncertainty itself, while explicitly allowing the ordinary commercial risk that any enterprise carries. And *takaful* replaces the sale of risk to a profit-seeking counterparty with participants contributing to a common fund for mutual assistance. That is strikingly close to "a society, not a transaction."

Takaful does not satisfy the governance requirement perfectly in every implementation, and the secular version derives its rules from feedback and representation rather than from judgments about permissible contract forms. But the overlap is hard to ignore. Two lines of reasoning, one theological and one about control loops, arrive near the same conclusion. *Risk is not the enemy. Risk severed from a legitimate relationship among its bearers is.*

It does make the shattered tablet look suspicious. Perhaps it held the shared financial specification of the Abrahamic traditions, and nobody kept a backup.

---

## VI. Why the Wall Is Hard to See

If the principle is this simple, why does it sound naïve when said aloud?

No conspiracy is needed. Institutions develop vocabularies around what they optimize. Modern finance values liquidity, diversification, capital mobility, specialization and risk distribution, and its language makes those properties prominent. "Asset management," "loan sales," "securitization" and "financial intermediation" name real functions. They also hide the simpler transformation underneath: the chooser and the bearer, once the same person, are now two.

Once whole industries earn their living by performing that separation, a weaker mechanism is enough. A system disproportionately produces expertise, terminology, regulation, scholarship and advocacy that preserve the operations its important institutions depend on. "How should we optimize risk retention in securitized credit markets?" sounds sophisticated. "Why should the person who made the loan be allowed to stop owning it?" sounds unsophisticated. The first question quietly assumes transferable credit is desirable and bargains over the parameters. The second reopens the axiom.

Call it conceptual path dependence. After four floors of machinery have been built on an assumption, respectable debate concerns renovations on floors three and four. Walking into the basement and asking why a particular load-bearing wall is there feels like bad manners.

Sometimes the answer will be that removing it would bring the building down. That is still a better answer than forgetting that someone once chose to put the wall there.

---

## VII. The Building Collapses Anyway

Fortunately, or unfortunately, the building collapses periodically on its own.

The cycle is familiar. Tight coupling of judgment to loss produces prosperity. Prosperity produces financial abstraction. Abstraction separates judgment from loss. Risk accumulates where nobody who chose it can see it. Collapse makes the loss concrete again, painfully and often for the wrong people.

The usual institutional lesson after a collapse is *how do we prevent the next one?* The better question is *what information was the threat of collapse providing?* In a decentralized allocation system, failure is not just damage. It is part of the feedback channel. If you engineer away who feels it, postpone it, spread it onto people who never made the decision, or socialize it after the fact, the underlying error does not go away. What goes away is the mechanism that would have told the decision-maker the decision was wrong.

This brings us back to the datacenters, and to the plant. A synthetic auxin works because the growth signal is cut off from the organism's actual fitness. A financial system that lets judgment be separated from consequence does the same to capital. The signal to build is emitted by people who will not personally absorb the cost of overbuilding, and it can strengthen without limit. Maybe the current buildout is real frontier expansion, the semiconductor story playing out on a continental scale. Maybe it is a plant growing itself to death. We cannot tell yet, partly because the decisive denominator is not disclosed, and partly because the signal we would use to judge, the volume of capital committed, has been corrupted by the very separations described above.

The question that matters is not how much money is flowing into datacenters. It is how much wealth is being risked by the people and institutions who actually decided to risk it.

That is the question the missing tablet would have made unavoidable. Reconstructed, it might read:

> **XI.** Thou shalt not wager that which was entrusted to thee, save by the counsel of those who entrusted it.
>
> **XII.** Thou shalt not sell unto another, without their consent, the risk thou knowingly created.
>
> **XIII.** The hazards of fortune ye may bear together, in fellowship governed by those who bear them.

Or, compressed into a single line suitable for carving in stone and carrying down a mountain:

> **Thou shalt answer for thine own judgment.**

Moses dropped tablet three. A few thousand years later we invented structured finance. That the whole theory traces back to a Mel Brooks gag is, on reflection, entirely fitting. The best jokes are about what was lost, and the punchline is that we are still paying for it.
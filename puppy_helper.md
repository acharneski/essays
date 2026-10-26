# Designing a Puppy App for Humans Who Forget

## Minimum viable cognition for a household with a new dog

We got a new puppy. Within a few days, the household was running on a fragile protocol of shouted questions:

> "Did you feed her?"
> "I thought you did."
> "No, I asked if *you* did."
> "Oh."

This looks like a perfect job for a small app: a phone, tablet, and desktop tool that organizes feeding, potty training, walks, and training. It is also a perfect trap for someone who builds software. My first instinct was a grand design: an append-only event stream, typed records for every bodily function, behavioral prediction from distributions over event deltas, a 24-hour raster view of potty rhythms across weeks. In short, Puppy Datadog.

The correction came quickly and it was right. **The humans learn the routines within a week, and data entry sucks.** An ADHD household doesn't need an observability platform for its dog. It needs a convenient tool that takes over the part of the brain that keeps forgetting.

This document describes that tool. The governing requirement is:

> Help a distractible human take good care of the puppy without making that human the puppy's database administrator.

---

## 1. What the app is actually for

Strip away the feature list and the app has to answer three questions:

1. **What should I do now?**
2. **Did somebody already do it?**
3. **What am I forgetting?**

Everything else is secondary. These aren't questions about the dog. They're questions about the *humans' shared memory of intentions*. Psychologists call this prospective memory: remembering to do something in the future. ADHD hits it hard, and a household of several people makes it worse, because each person assumes someone else is holding the thread.

So this is not really a pet tracker. It is **shared prospective memory, with a puppy as the subject.** That framing produces a much cleaner product than "pet management app," and it rules out a lot of features that would otherwise feel obligatory.

### The design principles

Every decision below follows from five rules:

- **Logging must take less effort than wondering.** If tapping "Fed" is harder than yelling up the stairs, people will yell up the stairs.
- **Never punish failure to use the app.** Ignoring the app for six hours should cost nothing. It recomputes reality; it never accumulates guilt.
- **The app infers; the human confirms.** Time, person, and context are captured silently. The human supplies at most one tap.
- **Detail is optional, always.** Pee vs. poop, cups of kibble, which skill was practiced: available, never required.
- **The success metric is *less* interaction.** The app's KPI is the opposite of engagement: how little the user needs to touch it while the dog is still reliably cared for.

---

## 2. The zero-entry home screen

The home screen is not a dashboard. It is external executive function: a glanceable answer to "is the puppy okay, and is anything mine to do?"

### Layout

~~~
┌─────────────────────────────────────┐
│  🐶 Mochi                    ● synced│
│                                     │
│  You're good. Dinner's next.        │
│                                     │
│  🟢 Potty     Out 40 min ago        │
│  🟡 Food      Dinner around 5:30    │
│  🟢 Walk      Done · Sarah, 2:10    │
│  🔵 Training  Maybe 5 minutes?      │
│                                     │
│ ┌────────┐ ┌────────┐ ┌────────┐    │
│ │   🚽   │ │   🍲   │ │   🦮   │    │
│ │ Potty  │ │  Fed   │ │ Walked │    │
│ └────────┘ └────────┘ └────────┘    │
│ ┌────────┐ ┌────────┐               │
│ │   🎓   │ │   ⋯    │               │
│ │Trained │ │  More  │               │
│ └────────┘ └────────┘               │
└─────────────────────────────────────┘
~~~

There are three zones.

**The headline.** One sentence in plain language summarizing the whole state: *"You're good."* *"Probably time for potty."* *"Medicine is due."* If you read nothing else, this line is enough. It's written the way a calm housemate would say it.

**The status rows.** One row per care domain, each with a color and a short human phrase. The color answers "do I need to act?"; the phrase answers "why?"

| Color | Meaning | Example phrasing |
|---|---|---|
| 🟢 Green | Handled, nothing to do | "Out 40 min ago" |
| 🟡 Yellow | Becoming relevant soon | "Dinner around 5:30" |
| 🔴 Red | Do this now | "Take Mochi out" |
| 🔵 Blue | Optional, nice to do | "Maybe 5 minutes of training?" |

Red is rare by design. If several rows go red at once, the app has misjudged the thresholds; it is not a sign the humans have failed.

**The action buttons.** Huge tap targets, reachable with one thumb, usable with a leash in the other hand and a wriggling puppy under one arm. Each records the obvious default immediately.

### What "zero-entry" means

Tapping **Fed** does exactly one visible thing: the button turns into **✓ Fed just now** and the Food row goes green. There's no form, no confirmation dialog, no quantity picker. Behind the scenes the app records:

- the timestamp,
- who tapped it (from the device's signed-in household member),
- which routine step this satisfies, if any.

Nobody has to record that the dog urinated at 3:07 PM in the southeast quadrant of the backyard under partly cloudy conditions.

### Optional detail, one level deep

For a few seconds after an action, the confirmed button shows small chips:

~~~
✓ Potty done        [Pee] [Poop] [Both] [Accident]   Undo
~~~

Ignoring the chips is the normal case and is fine. Tapping one adds detail to the event that was just recorded. If you want to add detail later, tap the event in today's list. **Undo** is always offered, because a mistaken tap must cost less than a mistaken hesitation. If undo is scary, people stop tapping.

### "Accident" is not a failure state

Accidents happen constantly in potty training. Logging one takes the same single tap, uses neutral language ("Accident logged · cleanup happens"), and quietly resets the potty timer just as a successful trip does. The app records accidents only because they help it tune when to suggest the next trip, not to keep score.

### The handoff, built in

Coordination is the feature that pays for the whole app, so the attribution is right on the status rows: **"Done · Sarah, 2:10."** Anyone in the household can glance at the screen and know what's been done and by whom, without asking.

The home screen also guards against the most expensive coordination failure. If you tap **Fed** shortly after someone else did:

~~~
Sarah fed Mochi 3 minutes ago.
[Oops, never mind]   [Log a second meal]
~~~

The puppy is a shared mutable resource with a strong incentive to exploit replica lag. Two breakfasts is the canonical race condition, and it's the one place where the app adds a moment of friction on purpose.

### Coming back after ignoring it

Open the app after six hours away and you will never see this:

~~~
🚨 7 OVERDUE TASKS
~~~

You'll see this instead:

~~~
Welcome back.
Probably time for potty. Dinner is next.
~~~

The app doesn't keep a backlog. A missed midday potty check isn't an obligation that persists until someone acknowledges it; it's irrelevant now, because the only question that matters is what the puppy needs *right now*. Status is always computed fresh from the last known events plus the current time. Nothing goes stale into an accusation.

---

## 3. Under the hood: just enough data

The original event-stream idea survives, but it moves out of sight. The user never sees a data model; the app needs only enough structure to compute the home screen.

~~~
Event
  id            uuid (generated on device)
  at            timestamp
  kind          potty | food | walk | training | meds | sleep | note
  detail?       e.g. pee | poop | both | accident; or a skill name
  by            household member
  routineStep?  link to the chain step this satisfied
~~~

That's it. Optional quantity and duration fields can exist for people who want them, but nothing in the core experience reads them.

Three concepts are kept strictly separate, even though the user sees them blended into a single status line:

- **Events:** things that happened ("fed at 7:42").
- **Plans:** things the household intends ("breakfast after wake-up," "meds with dinner").
- **Expectations:** things the app thinks will become relevant ("probably needs out around 4:30").

Mixing these up is how pet apps become nagging task managers. "Walk at 3:00" is a plan. "Probably needs to pee soon" is an expectation. They deserve different colors, different language, and different notification behavior.

### Deriving status without machine learning

Each status row is a small function of (last relevant event, routine position, current time, puppy's age). For potty:

- Start with a base interval from age. A commonly cited rule of thumb is roughly one hour of holding capacity per month of age, plus one, capped at a reasonable daytime maximum. The household can adjust this.
- Shorten the interval after triggers that predictably cause potty needs: eating, drinking a lot, waking up, and play.
- Over time, nudge the interval toward what actually happens in this household, using simple statistics such as the median gap between successful trips and the typical delay before accidents.

No model training, no "AI Puppy Insights™." The app quietly gets better at timing because good structured data piles up as a by-product of one-tap logging. If the household never taps the detail chips, the app still works; it just stays closer to the defaults.

---

## 4. Routines as adaptive chains

Households don't run on forty recurring calendar tasks. They run on sequences: *wake up → puppy out → breakfast → puppy out → humans get on with the day.* The app should encode those sequences directly.

### A chain is an ordered list with a cursor

~~~
Morning
  ▸ Outside           ← you are here
    Breakfast
    Outside (after meal)
    Medicine
    Short training
~~~

The app's only job is to remember **where the household is in the chain** and surface the next step. The home screen headline usually just reads the cursor: *"Breakfast is next."*

The starter chains cover most of puppy life:

- **Morning:** outside → breakfast → outside → meds (if any) → a few minutes of training
- **After a meal:** outside within a short window
- **After a nap:** outside right away
- **Evening:** dinner → outside → play → outside
- **Bedtime:** water up → last outside → crate

### Chains start from anchors, not clock times

A chain starts when its **anchor** happens, not at a fixed hour. The first Potty tap of the day anchors Morning. A Fed tap anchors After-a-meal. This is the core of the "routines, not schedules" idea: puppy life is not a calendar, and a routine that started 40 minutes late is still the same routine, just shifted.

Clock times show up only as soft hints ("dinner around 5:30") learned from when the household actually tends to do things.

### Deviation is normal

Every chain step can be:

- **Done:** tap the matching action button; the step completes on its own.
- **Skipped:** swipe or tap Skip. No reason required, no record of guilt.
- **Done out of order:** if you feed before going outside, the Breakfast step completes and the cursor still points at Outside. Steps are matched by kind, not position.
- **Abandoned:** if a chain's window passes (morning chain at 2 PM), it closes silently. The next chain picks up.

Real life overrides the plan every time, and the chain just follows along.

### How chains adapt

"Adaptive" means the chain reshapes itself from what the household does, with the humans approving any structural change:

- **Timing drift.** If breakfast reliably happens 20 minutes after wake-up rather than right away, the hint moves on its own. No prompt needed: hints are expectations, not plans.
- **Steps that are always skipped.** If "short training" in the morning is skipped ten days in a row, the app offers once: *"Morning training keeps getting skipped. Move it to the evening, or drop it?"* One offer, then silence.
- **Steps that are always done unprompted.** If the household always takes Mochi out after meals without the app asking, the step stays but its reminder goes quiet. The app shouldn't nag people about habits they've already formed.
- **Growing up.** As the puppy ages, potty intervals stretch and the after-nap and after-meal chains matter less. The app suggests loosening them at sensible milestones: *"Mochi's been going longer between trips. Stretch daytime potty checks to every 3 hours?"*
- **Graduating.** Eventually, a chain may no longer need the app at all. A chain the household completes reliably for weeks can be "graduated": it stays in history, but stops producing reminders. That's the app succeeding by getting out of the way.

### Editing chains

Editing is a plain list: drag to reorder, tap to rename, swipe to delete, and a short menu to choose an anchor. No recurrence rules, no cron syntax, no "every 2nd Tuesday." If a household needs that much structure for something, it belongs in a real calendar, and the app can link out for it.

---

## 5. Gentle, non-guilting reminders

Notifications are where most care apps go wrong. They create a constant low hum of alarms until the user turns them all off, and then the one important alert gets missed too. This app is deliberately stingy.

### Three levels

| Level | When | Delivery | Example |
|---|---|---|---|
| **FYI** | Something is becoming relevant | In-app only (headline/row color). No push. | "Dinner around 5:30" |
| **Nudge** | Probably ought to happen now | One quiet push, no sound by default | "Mochi probably needs out" |
| **Hey Andrew** | Actually important and time-sensitive | Push with sound; one gentle follow-up | "Mochi's medicine is due" |

Almost everything lives at FYI. Potty checks during housetraining and meal times may reach Nudge. Only things with real consequences, like medication, a vet appointment, or a puppy left in the crate far too long, can be **Hey**, and the household chooses which items get that level.

### Rules for reminders

- **Doing the thing dismisses it.** Tapping the action button clears the notification on every device in the household. No one has to swipe away a reminder for something that has already been handled.
- **Someone else doing it dismisses it for you.** If Sarah takes Mochi out, Andrew's pending nudge disappears. This is shared memory working as intended.
- **No counts, no badges, no red numbers.** The app icon never shows "7." Numbers turn care into a debt.
- **No stacking.** If several nudges would fire close together, they combine into a single message: "Potty and dinner coming up."
- **No repeating for non-critical items.** A nudge fires once. If ignored, the home screen still shows it, but the phone doesn't ask again. Only Hey-level items get a single follow-up.
- **Quiet hours.** Overnight, nothing below Hey gets through, and even Hey respects a per-person schedule.
- **Claiming.** Long-pressing a notification offers "I've got it," which silences it for everyone else for a few minutes. That one gesture replaces "is anyone dealing with the dog?"

### Language

Reminder copy is written as a calm housemate talking, not a compliance system. The test is whether the sentence would feel fine said aloud in the kitchen.

| Don't | Do |
|---|---|
| "OVERDUE: Potty break (2h 14m late)" | "Mochi probably needs out." |
| "You missed lunch feeding!" | "Lunch is next whenever you're ready." |
| "Training streak lost 💔" | "Maybe 5 minutes of training?" |
| "3 tasks incomplete" | "Welcome back. Potty first, then dinner." |

The app never mentions how long ago something *should* have happened. It talks only about what's useful next.

---

## 6. Training, kept light

Training is the domain where the temptation to over-model is strongest: skills, proficiency stages, distraction levels, generalization. All of that is real, and almost none of it belongs in the default flow.

- The **Trained** button logs a session with one tap.
- The follow-up chips show the household's current skills: *Sit · Name · Come · Down · Leave it*. Tapping any of them tags the session. Skills are added once, in settings, as plain words.
- The Training row is always blue (optional) unless the household opts into a goal like "once a day." It suggests and never scolds.
- An optional skill view, tucked under "More," shows a simple per-skill history for people who enjoy it: practiced 12 times this week, last practiced yesterday.

Training progress lives in the dog, not the database. The app's role is to make "we should practice" occur to someone at a convenient moment.

---

## 7. History, tucked away

There's a history screen, but it's one tap deeper, never the landing view. It shows today as a simple horizontal timeline:

~~~
7am     8       9       10      11      noon
 🚽     🍲 🚽          😴      🚽      🦮
~~~

Over longer stretches, a compact day-per-row view makes rhythms obvious at a glance: when accidents cluster, how the gaps between trips lengthen as the puppy grows. It's handy for vet visits ("how often is she going?") and for the occasional curious household member. It's never required, never pushed, and never turned into a score.

---

## 8. Implementation notes for the PWA

This is a strong fit for a progressive web app: one codebase across phone, tablet, and the laptop on the kitchen counter, installable to the home screen, and no app-store friction for adding a partner or dog-sitter.

**Local-first storage.** Every tap writes to IndexedDB on the device immediately and updates the UI right away. Logging must work in the backyard with bad reception, so the network is never in the critical path.

**Sync as a merged log.** Events are immutable and identified by device-generated UUIDs, so syncing is mostly set union: each device sends the events the server doesn't have and pulls the ones it lacks. Undo is itself an event (a tombstone), which keeps merges trivial. Routine cursors and status are *derived* from the merged log on each device, never synced as mutable state, so there's no shared state to conflict over. The only real conflict, two people logging the same meal, is handled in the UI by the duplicate warning described earlier.

**Visible sync state.** A small indicator ("● synced", "◐ syncing", "○ offline, will sync") sits in the corner. Trust in "Fed 2 min ago by Sarah" depends on knowing the data is current.

**Push notifications.** Web Push covers Android and desktop browsers. On iPhone and iPad, web push works only for PWAs that have been added to the home screen (iOS 16.4 and later), so onboarding should guide iOS users through installing early. Notification scheduling is done on the server, since a closed PWA can't reliably wake itself, and that reinforces the server's role as the sync hub.

**Household joining.** One person creates the household; everyone else joins via a share link or QR code. Each device remembers its person, so attribution never requires a login prompt at tap time. A temporary "guest" link with an expiry fits dog-sitters and grandparents.

**Ergonomics.** Large targets, high contrast, one-handed reach, and readable at a glance in the dark at 6 AM. A dark theme is the default after sunset. The home screen should fully render from local data in well under a second, because opening the app should feel faster than shouting a question across the house.

---

## 9. What we're deliberately not building

Scope discipline is a feature here. The app will not have:

- **Streaks, points, or badges.** Gamification turns missed days into losses, which is exactly the guilt loop this design avoids.
- **A dashboard landing page.** Charts are for curiosity, not daily operation.
- **Mandatory fields of any kind.**
- **AI insights on the home screen.** Any intelligence shows up only as better timing and calmer suggestions.
- **Social feeds, sharing, or engagement hooks.**
- **A task backlog.** The past never turns into a to-do list.

---

## 10. Build order

**Version 0, the household fix.** Home screen with five action buttons, attribution, sync, duplicate-feeding guard, undo. Status rows computed from simple time-since rules. This alone solves the "did you feed her?" problem.

**Version 1, routines.** Starter chains with anchors, cursor-driven headline, skip and out-of-order handling, editable chain list.

**Version 2, gentle reminders.** Three notification levels, cross-device dismissal, claiming, quiet hours, combined nudges.

**Version 3, quiet adaptation.** Learned timing hints, age-based potty interval adjustments, one-time suggestions for skipped steps, chain graduation.

**Later, only if wanted.** Training skill history, the history timeline and raster view, multiple dogs, vet export.

---

## Closing

The puppy will be housetrained in a few months. The household will learn its routines in a few weeks. A good version of this app gradually makes itself less necessary: the chains graduate, the nudges go quiet, and the home screen mostly says *"You're good."*

That's the measure of success. Not daily active usage, not events logged, but a well-cared-for dog and a household that has stopped asking each other whether anyone fed her. Minimum viable cognition: the least thinking the humans need to do for the puppy to be reliably okay.
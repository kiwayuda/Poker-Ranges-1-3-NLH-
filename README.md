# Exploit Poker Lab: $1/$3 NLH trainer

A dark, space-themed browser game that drills one preflop decision at a time at a 9-handed $1/$3 table with $300 stacks.

Each hand deals you a seat (UTG through BB), real cards, and the action in front of you, shown on the table and in a "who did what" action log. There are seven spot types:

1. **Unopened pot:** you are first to act (UTG) or everyone folded to you. Open or fold; the SB can also limp.
2. **Limpers:** 1–3 players limped. Iso-raise, overlimp, or fold. In the BB you check or raise.
3. **Facing a raise:** someone opened. 3-bet, call, or fold.
4. **I opened, got 3-bet:** 4-bet, call, or fold.
5. **SB limp, BB raises:** 3-bet, call, or fold.
6. **Open + callers:** someone opens and 1–2 players call. Squeeze, overcall, or fold.
7. **I 3-bet, got 4-bet:** jam, call, or fold.

You pick fold, call/check, or a **specific bet size**. The game grades the action and the size separately, then explains:

- what the range says
- what kind of hand you held
- which leak you showed, if you got it wrong
- correct live sizing

It also shows the full chart with your hand highlighted.

**Play:** open `index.html` in any browser. No install or server needed. When opened as a claude.ai artifact, an **AI coach** box also appears for deeper breakdowns and what-if questions.

- **Keys:** `F` fold · `C` call/limp/check · `1`–`4` raise sizes · `R` raise at the standard size · `Space` (or tap the correct answer again) next hand. Hands never auto-advance, so you can read the explanation first.
- **Standard sizes:** every preflop spot uses the same live $1/$3 sizes (open $15, 3-bet $45, or $60 from the blinds, 4-bet about $110 to $145) so each chart has one price to be built for. See RANGES.md.
- **Chart sets (Ranges tab):** the **Original (exploitative)** set is the PokerCoaching.com full preflop charts and is locked. Make your own named sets from it or from each other (a loose *Fish table*, a tight *Shark table*...). Each set stores only the charts you changed. Pick the set you are playing at the top of the Play tab; it is what gets graded. Rename, duplicate or delete sets, and paint charts by tap or drag, by typing a range like `99+, AJs+`, or by group, with Undo. Any hand you change is always graded as you set it.
- **Hand type drill (Postflop tab):** a flop and your two cards; name the type (can play for stacks, thick value, thin value, showdown value, combo draw, high-equity draw, low-equity draw, air). Each answer explains the rule behind it and lists all eight types with examples. Types you miss come up more often.
- **Outs drill (Postflop tab):** a flop or turn and your cards; count the cards that make a flush, straight, trips (from a pair) or a full house (or quads), then the chance to hit. Pairing a card, two pair and overcards aren't outs. Every answer shows the out cards and the rule-of-4 math.
- **Help tab:** a full rundown of every exercise, how to edit charts, and a glossary of terms.
- **`chart-guide.html`:** a separate quick-reference page for the table (pick your seat and the action, see the chart and bet size). It opens on your active chart set.
- **Stats tab:** action and sizing accuracy by spot and by seat, your leak profile, and recent mistakes.
- **Practice settings:** pick spot types and seats, and focus on close decisions (skip obvious folds).

See [RANGES.md](RANGES.md) for every chart written out and where the ranges come from.

## Postflop tab (out of position)

Drills Hungry Horse's out-of-position flowcharts from "The 3 Questions That Make Poker Feel Easy (Even Out of Position)". You raised preflop and the button or cutoff called. There are three modes:

1. **Flop · your decision:**
   - Will he stab if you check? (wet or dry, static or dynamic, player type)
   - If not, is the SPR over 15?
   - Then bet or check, depending on your hand.
2. **Facing a stab:** you checked and he bet. Is the stab small (under half pot) or big? If small, is the board dynamic/wet or static/dry? Then check-raise, check-call or check-fold.
3. **Turn after calling:**
   - What size did he stab on the flop?
   - Then lead, or check and respond to his barrel.
   - The turn chart isn't shown in the video, so it's rebuilt from his walkthrough. The few cells he doesn't cover are labeled "trainer default".

Walkthrough options:
- **Timed** (default): only the live-table questions (before he acts: wet or dry, static or dynamic, will he stab, SPR over 15, then your decision).
- **Full**: adds static/dynamic and your hand type (can play for stacks, thick, thin, showdown value, combo draw, high- and low-equity draw, air).
- **Quick**: the decision only.

A **decision timer** runs every hand, against a 30-second goal like a live 1/3 table. Each answer is timed, and the Stats tab tracks your average, last-10 and best times plus your accuracy per question. Hands can be his video examples (25 of them, all graded the way he plays them), new random hands, or a mix. A compact table shows every seat, both stacks, his player type, bets and the pot, with a who-did-what log, and it fits one phone screen with the answer buttons. After you answer you get your time, then a step-by-step path through his flowchart (each question, the right answer and why) and what every hand type does at your branch. The full flowchart is one tap away.

## Saved progress

Chart sets, stats and settings are saved in your browser automatically (local storage). **Clear stats** on the Stats tab resets stats. To move chart sets to another browser for now, use **Copy my chart sets** and **Load sets from box** on the Ranges tab (loading only adds sets, it never overwrites).

## Sign-in and cloud save (Firebase)

Tap **Sign in** (top right) to keep chart sets and stats on every device. You can use Google or an email and password. Guests never load Firebase; the code (`cloud.js`) is fetched only when someone taps Sign in or returns signed in.

- **What is stored:** one Firestore document per player at `users/{uid}`: `{ v, rev, updatedAt, json }`, where `json` is the player's snapshot (`sets`, `activeSet`, `stats`, `settings`). Rules in `firestore.rules` allow each player to read and write only their own document.
- **First sign-in on a device:** a new account takes this device's charts and stats. An account with data and an empty device loads the account's data. If both have data you choose: merge (all chart sets, stats from whichever has more hands), use the account, or keep this device.
- **After that:** every change is saved to the account about a second later. Coming back to the tab loads anything newer saved from another device. Offline changes are kept and saved when the connection returns.
- **Shared devices:** each signed-in player has a separate local copy, so signing out returns the device to its own guest charts and the next person never sees yours.
- **Setup in the Firebase console (once):** enable Authentication sign-in methods (Google, Email/Password), add your site's domain under Authentication, Settings, Authorized domains, create a Firestore database, and publish `firestore.rules`. The web config in `firebase-config.js` is public; the rules are what protect the data. Analytics is not used.
- **Code map:** `cloud.js` is the whole feature (sign-in screens, conflict choice, autosave). `index.html` exposes `window.Fishing` (snapshot, apply, profile switching) and fires a `fishing:saved` event when sets, stats or settings change.

## Deploying to Netlify

This is a static site with no build step. `netlify.toml` publishes the repo root.

1. In Netlify: **Add new site → Import an existing project**, then pick this repo and branch.
2. Leave the build command empty; the publish directory is `.`. `netlify.toml` already sets both.
3. Deploy. Stats are saved per site address, so progress from the claude.ai version doesn't carry over to Netlify.

The optional AI coach only works inside claude.ai, so it's hidden on Netlify.

## Tests

The suites serve the page the way Netlify does and run it in a headless browser. Run them from the repo root:

```
node tests/check.js index.html /tmp          # preflop, every postflop mode, timer, stats, phone layout
node tests/chart-sets.js "$PWD/index.html"   # original charts, chart sets, persistence, migration, sync snapshot
node tests/chart-guide.js "$PWD"             # chart guide: original charts and your sets
node tests/standard-sizes.js "$PWD/index.html"  # every spot uses the standard sizes
node tests/dealer-button.js "$PWD/index.html"   # the dealer button never covers cards, chips or seats (both tables)
node tests/cloud.js "$PWD"                   # sign-in and sync against an in-memory Firebase stand-in
node tests/cloud-sdk.js "$PWD" <bundles>/out  # the real Firebase SDK path (see tests/build-sdk-bundles.mjs)
node tests/explain-sets.js "$PWD/index.html"  # preflop explanations follow the active set (correct and wrong answers)
node tests/editor.js "$PWD/index.html"       # chart editor
node tests/tap-again.js "$PWD/index.html"    # tap the right answer again to continue (postflop)
node tests/hand-mode.js "$PWD/index.html"    # hand type drill
node tests/outs-mode.js "$PWD/index.html" /tmp && node tests/outs-engine.js "$PWD/index.html"
node tests/board-reading.js "$PWD/index.html"
```

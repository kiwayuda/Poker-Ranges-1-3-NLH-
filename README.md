# Disciplined Preflop: $1/$3 NLH range trainer

A dark, space-themed browser game that drills one preflop decision at a time at a 9-handed $1/$3 table with $300 stacks and **no ante**.

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
- **Ranges tab:** every chart as a 13×13 grid. Paint any hand as raise, raise as a bluff, call/limp/check or fold. Any hand you change is always graded as you set it, and the 3-bet, 4-bet and SB-limp spots deal from your own ranges. Hand review has an **Edit this chart** button.
- **Stats tab:** action and sizing accuracy by spot and by seat, your leak profile, and recent mistakes.
- **Live 1/3 reads (default on):** big 3-bets and $20–25 opens are treated as strong, the way live 1/3 players actually play, so you fold speculative hands that the balanced charts would call.
- **Practice settings:** switch between the no-ante baseline (default) and the original with-ante PDF charts, pick spot types and seats, skip obvious folds.

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
- **Timed** (default): only the live-table questions.
- **Full**: adds static/dynamic and your hand type (can play for stacks, thick, thin, showdown value, combo draw, high- and low-equity draw, air).
- **Quick**: the decision only.

A **decision timer** runs every hand, against a 30-second goal like a live 1/3 table. Each answer is timed, and the Stats tab tracks your average, last-10 and best times plus your accuracy per question. Hands can be his video examples (25 of them, all graded the way he plays them), new random hands, or a mix. After each hand his flowchart is drawn with your path lit up.

## Saved progress

Stats and custom ranges are saved in your browser automatically (local storage), so nothing is sent anywhere. **Clear stats** on the Stats tab resets them. Clearing site data or switching browsers starts fresh.

## Deploying to Netlify

This is a static site with no build step. `netlify.toml` publishes the repo root.

1. In Netlify: **Add new site → Import an existing project**, then pick this repo and branch.
2. Leave the build command empty; the publish directory is `.`. `netlify.toml` already sets both.
3. Deploy. Stats are saved per site address, so progress from the claude.ai version doesn't carry over to Netlify.

The optional AI coach only works inside claude.ai, so it's hidden on Netlify.

## Tests

`tests/check.js` serves the page the way Netlify does and runs it in a headless browser. It checks preflop answering, every postflop mode, the decision timer, saved stats across a reload, Clear stats, and the phone layout.

```
node tests/check.js "$PWD/index.html" /tmp
```

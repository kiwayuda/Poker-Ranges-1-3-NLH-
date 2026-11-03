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

## Profiles (login) and saved progress

Click your name in the top bar to manage profiles.
- Each profile has its own stats, settings and custom ranges.
- A profile can have a 4–8 digit PIN, which is asked for when the trainer opens.
- Everything is stored in your browser's local storage on that device, so nothing is sent to a server. Clearing site data erases it.
- Use **Copy full backup** / **Restore** to move profiles between devices or browsers.
- A PIN keeps casual users out, but it isn't real security.

## Deploying to Netlify

This is a static site with no build step. `netlify.toml` publishes the repo root.

1. In Netlify: **Add new site → Import an existing project**, then pick this repo and branch.
2. Leave the build command empty; the publish directory is `.`. `netlify.toml` already sets both.
3. Deploy. Your profiles live in the browser for that site's address, so progress saved on the claude.ai artifact doesn't carry over automatically. Use **Copy full backup** there and **Restore** on Netlify.

The optional AI coach only works inside claude.ai, so it's hidden on Netlify.

## Tests

`tests/audit.js` is a Playwright audit. It generates the explanation for every hand, in every chart, for every choice and bet-size tier, under all three settings. It checks:
- range consistency and explanation logic
- that custom-range edits are always graded as set
- that spots deal from your own (custom) open, limp and 3-bet ranges
- profile login, PIN, isolation, persistence and backup/restore through the UI

```
node tests/audit.js "$PWD/index.html"
```

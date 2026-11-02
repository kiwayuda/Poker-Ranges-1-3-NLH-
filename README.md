# Disciplined Preflop: $1/$3 NLH range trainer

A dark, space-themed browser game that drills one preflop decision at a time at a 9-handed $1/$3 table with $300 stacks.

Each hand deals you a seat (UTG through BB), real cards, and the action in front of you, shown on the table and in a "who did what" action log. There are five spot types, adding up to 58,000+ distinct graded spots:

1. **Folded to me:** open or fold. The SB can also limp.
2. **Limpers:** 1–3 players limped. Iso-raise, overlimp, or fold. In the BB you check or raise.
3. **Facing a raise:** someone opened. 3-bet, call, or fold.
4. **I opened, got 3-bet:** 4-bet, call, or fold.
5. **SB limp, BB raises:** 3-bet, call, or fold.

You pick fold, call/check, or a **specific bet size**. The game grades the action and the size separately, then explains:

- what the range says
- what kind of hand you held
- which leak you showed, if you got it wrong
- correct live sizing

It also shows the full chart with your hand highlighted.

**Play:** open `index.html` in any browser. No install or server needed. When opened as a claude.ai artifact, an **AI coach** box also appears for deeper breakdowns and what-if questions.

- **Keys:** `F` fold · `C` call/limp/check · `1`–`4` raise sizes · `R` raise at the standard size · `Space` next hand
- **Ranges tab:** every chart as a 13×13 grid. Paint hands to customize them; grading uses your version right away. Copy and load backups as text.
- **Stats tab:** action and sizing accuracy by spot and by seat, your leak profile, and recent mistakes.
- **Practice settings:** pick spot types and seats, auto-deal after correct answers, skip obvious folds.

See [RANGES.md](RANGES.md) for every chart written out and where the ranges come from.

# Disciplined Preflop: $1/$3 NLH range trainer

A browser game that drills one preflop decision at a time at a 9-handed $1/$3 table.

Each hand deals you a random seat (UTG through BB), then the action in front of you: everyone folds, someone limps, or someone raises. You choose fold / call (limp, check) / raise. The game tells you whether that matches your range and explains why: what the range says, what kind of hand it is, which leak you showed if you got it wrong, and live 1/3 sizing.

**Play:** open `index.html` in any browser. No install or server needed.

- **Play tab:** keyboard shortcuts `F` fold, `C` call/limp/check, `R` raise, `Space` next hand. Practice settings let you pick situations and seats, and skip obvious folds.
- **Ranges tab:** every chart as a 13×13 grid. Paint hands to customize them; the trainer grades against your version right away. Copy and load backups as text.
- **Stats tab:** accuracy by situation and seat, your leak profile (too loose, tight, passive, aggressive), and recent mistakes.

See [RANGES.md](RANGES.md) for the full written ranges and where they come from.

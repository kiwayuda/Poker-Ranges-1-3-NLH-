# Range Guide: $1/$3 NLH, 9-max, no ante

These are the default ranges the trainer grades you against. Change any of them in the game's **Ranges** tab. Edits are saved to your profile in that browser, and any hand you change is always graded exactly as you set it.

## Where they come from

- **Starting point:** the [PokerCoaching.com full preflop charts](https://poker-coaching.s3.amazonaws.com/tools/preflop-charts/full-preflop-charts.pdf), read cell by cell. The combo counts match every chart's legend. These cover unopened-pot opens, facing a raise, opened and got 3-bet, SB vs BB, and SB limp vs BB raise.
- **No-ante adjustment (the default here):** the PDF assumes an ante. Live $1/$3 has none, so the blinds ($4) are the only dead money, and live opens are bigger ($12–15). The trainer trims the weakest hands from each action group of the PDF charts:

| Group | Trimmed |
|---|---|
| Opens | 5% UTG, 6% UTG+1, 7% UTG+2, 8% LJ, 10% HJ, 12% CO, 15% BTN |
| SB vs BB | 40% of bluff-raises, 20% of limps |
| Facing a raise | 40% of 3-bet bluffs, 15% of flat calls (40% in the big blind) |
| Opened and got 3-bet | 40% of 4-bet bluffs, 10% of calls |
| SB limp, BB raises | 40% of 3-bet bluffs, 15% of calls |

  "Weakest" uses a Chen-formula hand score that also credits pairs and suited Aces. Bluff groups drop offsuit hands first, and broadway hands (AQo, KJs, ATs…) are never cut from a 3-bet or 4-bet group. A final consistency pass guarantees no hand folds while a strictly worse hand of the same type is played (suited wheel Aces like A5s are the one deliberate exception). The original with-ante charts are one click away in the game's Practice settings.
- **Limpers in front:** the PDF has no limped-pot charts, so these are a disciplined live 1/3 default: iso-raise hands that win heads-up, overlimp hands that want a cheap multiway flop, fold the rest. The big blind never folds to limps; it checks.
- **Open + callers and I 3-bet, got 4-bet:** also not in the PDF. These are trainer defaults, described below.

## Live 1/3 reads (on by default)

The charts assume balanced opponents. Live $1/$3 players rarely 3-bet or open big as a bluff, and with $300 stacks a big call leaves too little behind for speculative hands, which need roughly 15× the call behind to get paid. So the trainer layers these reads on top of whatever charts you use:

- **You open and get 3-bet:** the answer depends on the size of the 3-bet.

  | 3-bet size | What it usually means at 1/3 | 4-bet | Call | Fold |
  |---|---|---|---|---|
  | Up to $35 (small) | Wide value range, but they rarely fold to a 4-bet | as the chart says | as the chart says, and broadway 4-bet bluffs call instead | chart folds, plus small 4-bet bluffs |
  | $40–45 (standard) | TT+, AQ+, AJs, KQs, few bluffs | AA, KK, QQ, AK | JJ, TT, AQs, AJs, KQs; in position also 99, 88, AQo, KJs, QJs, JTs, ATs | everything else |
  | $50+ (big) | Almost always QQ+ or AK | AA, KK, AK | QQ, JJ, TT, AQs; in position also AJs, KQs, AQo | everything else |

  Speculative hands (small pairs, suited connectors) need about 15× the call behind to get paid. A $45 3-bet against a $15 open leaves 8.5×, and a $60 one leaves 5.3×.
- **Facing a $20–25 open:** standard live opens are $10–15, so a bigger one usually means strength.
  - Bluff 3-bets fold; strong broadway hands such as AQo call instead.
  - Speculative calls fold.
  - Pairs, suited Aces and broadway hands still call.

Opponent opens in the trainer range from $10 to $25. Hands you've painted yourself are never changed by these reads. Turn the reads off in Practice settings to drill the pure charts.

## Multiway and 4-bet spots

- **Open + callers (squeeze):** built from your facing-a-raise chart for the same seats.
  - Value 3-bets become value squeezes.
  - Pairs and suited hands, including the chart's suited 3-bet bluffs, call for the dead money, since callers rarely fold to a bluff.
  - Offsuit hands fold, except AQo and AK.
  - Squeeze size: 3× the open in position (4× out of position), plus 1× for each caller.
- **I 3-bet, got 4-bet:** a live $1/$3 4-bet is almost always KK+ or AK, and with $300 stacks you either get it all in or fold.
  - Default: jam QQ+ and AK; fold everything else.
  - Hands are dealt from your 3-bet range in the facing-a-raise chart.

## Custom ranges

Every chart can be painted with any action: raise, raise as a bluff, call/limp/check, or fold. Any hand you change is graded exactly as you set it, even if the baseline chart or a live read would say otherwise. Hand review names the chart and has an **Edit this chart** button that opens it with your hand outlined.

Spots also follow your own ranges:
- "I opened, got 3-bet" deals from your opening range for that seat.
- "SB limp, BB raises" deals from your SB limp range.
- "I 3-bet, got 4-bet" deals from your 3-bet range.

If you add a hand to your open that a 3-bet chart doesn't cover, it's graded as a fold there until you paint it.

## How to read the notation

- `66+` = 66, 77, … AA
- `A9s+` = A9s, ATs, … AKs (suited)
- `K8s-K6s` = K8s, K7s, K6s
- `AQo+` = AQo, AKo (offsuit)
- Percentages are the share of all 1,326 starting hands.

## Core ideas

1. **Open, don't limp.** When no one has entered the pot, every hand you play is a raise (except the SB, which has a limp strategy against the BB).
2. **Position widens the range.** UTG opens about 9.5% of hands; the button opens about 43%.
3. **Facing a raise, play much tighter than you would open.** With no ante and big live opens, flatting is worse, especially from the big blind.
4. **3-bet bluffs are specific.** Mostly suited wheel Aces (A5s-A2s) and suited connectors, which block strong hands and still play well when called.
5. **SB vs CO/BTN opens is 3-bet or fold.** Flat calling invites the big blind to squeeze.
6. **Facing a 3-bet, let go of the open.** Grey hands in the "I opened, got 3-bet" charts are hands you opened that now fold.

## Sizing (no ante, live $1/$3)

- Open to $12–15 (4–5bb).
- Isolate limpers to $15 + $5 per limper, plus $5 more out of position.
- 3-bet to 3x the open in position, 4x out of position.
- Squeeze the same as a 3-bet, plus 1× the open for each caller.
- 4-bet to 2.25x the 3-bet in position, 2.5x out of position.
- After a 4-bet, a 5-bet is all-in ($300).
- From the SB after the BB raises your limp, 3-bet to 4×.
- 3-bet, squeeze and 4-bet sizes are rounded to the nearest $5.

## All default charts (no ante)

### Unopened · UTG open
- **Raise · 9.5%**: 66+, A9s+, A5s, KTs+, QTs+, JTs, AQo+

### Unopened · UTG+1 open
- **Raise · 13.4%**: 66+, A4s+, KTs+, QTs+, J9s+, T9s, 98s, AJo+, KQo

### Unopened · UTG+2 open
- **Raise · 14.5%**: 55+, A2s+, KTs+, QTs+, J9s+, T9s, 98s, AJo+, KQo

### Unopened · LJ open
- **Raise · 16.7%**: 44+, A2s+, KTs+, Q9s+, J9s+, T9s, 98s, 87s, 76s, AJo+, KJo+

### Unopened · HJ open
- **Raise · 18.9%**: 22+, A2s+, KTs+, Q9s+, J9s+, T8s+, 97s+, 87s, AJo+, KJo+, QJo

### Unopened · CO open
- **Raise · 23.7%**: 22+, A2s+, K9s+, Q9s+, J8s+, T8s+, 97s+, 86s+, 76s, ATo+, KTo+, QTo+, JTo

### Unopened · BTN open
- **Raise · 43.3%**: 22+, A2s+, K2s+, Q8s+, J8s+, T7s+, 96s+, 86s+, 75s+, 64s+, 53s+, 43s, 32s, A2o+, KTo+, Q9o+, J9o+, T8o+, 97o+, 87o, 76o

### Unopened · SB (vs BB)
- **Raise for value · 8.9%**: QQ-88, ATs+, KJs+, QJs, AQo-ATo, KJo+
- **Raise as a bluff · 7.5%**: J4s-J2s, T5s-T4s, 95s-94s, 85s-84s, 74s, 63s, 53s, 43s, K3o-K2o, 96o, 86o
- **Limp · 38.6%**: KK+, 77-22, A9s-A2s, KTs-K2s, QTs-Q2s, J7s+, T7s+, 96s+, 86s+, 75s+, 64s+, 54s, 32s, AKo, A9o-A2o, KTo-K9o, Q9o+, J8o+, T8o+, 97o+, 87o, 76o, 65o

### Facing a raise · UTG+1 vs UTG
- **3-bet for value · 2.6%**: QQ+, AKs, AKo
- **3-bet as a bluff · 1.5%**: ATs, KJs, AQo
- **Call · 2.7%**: JJ-88, AQs-AJs, KQs

### Facing a raise · UTG+2 vs UTG/UTG+1
- **3-bet for value · 2.6%**: QQ+, AKs, AKo
- **3-bet as a bluff · 1.5%**: ATs, KJs, AQo
- **Call · 2.7%**: JJ-88, AQs-AJs, KQs

### Facing a raise · LJ vs UTG/UTG+1
- **3-bet for value · 2.6%**: QQ+, AKs, AKo
- **3-bet as a bluff · 1.5%**: ATs, KJs, AQo
- **Call · 3.2%**: JJ-77, AQs-AJs, KQs

### Facing a raise · LJ vs UTG+2
- **3-bet for value · 2.6%**: QQ+, AKs, AKo
- **3-bet as a bluff · 1.5%**: ATs, KJs, AQo
- **Call · 3.8%**: JJ-77, AQs-AJs, KQs, QJs, JTs

### Facing a raise · HJ vs UTG
- **3-bet for value · 2.6%**: QQ+, AKs, AKo
- **3-bet as a bluff · 1.5%**: ATs, KJs, AQo
- **Call · 3.2%**: JJ-77, AQs-AJs, KQs

### Facing a raise · HJ vs UTG+1
- **3-bet for value · 2.6%**: QQ+, AKs, AKo
- **3-bet as a bluff · 1.5%**: ATs, KJs, AQo
- **Call · 3.8%**: JJ-77, AQs-AJs, KQs, QJs, JTs

### Facing a raise · HJ vs UTG+2
- **3-bet for value · 2.6%**: QQ+, AKs, AKo
- **3-bet as a bluff · 1.8%**: ATs, A5s, KJs, AQo
- **Call · 4.2%**: JJ-66, AQs-AJs, KQs, QJs, JTs

### Facing a raise · HJ vs LJ
- **3-bet for value · 4.4%**: QQ+, AJs+, KQs, AQo+
- **3-bet as a bluff · 2.7%**: AJo-ATo, KQo
- **Call · 4.8%**: JJ-66, ATs, KJs-KTs, QTs+, JTs, T9s

### Facing a raise · CO vs UTG/UTG+1
- **3-bet for value · 2.9%**: QQ+, AQs+, AKo
- **3-bet as a bluff · 1.8%**: AQo-AJo
- **Call · 4.8%**: JJ-66, AJs-ATs, KJs+, QTs+, JTs

### Facing a raise · CO vs UTG+2
- **3-bet for value · 2.9%**: QQ+, AQs+, AKo
- **3-bet as a bluff · 2.1%**: A5s, AQo-AJo
- **Call · 5.1%**: JJ-66, AJs-ATs, KTs+, QTs+, JTs

### Facing a raise · CO vs LJ
- **3-bet for value · 4.4%**: QQ+, AJs+, KQs, AQo+
- **3-bet as a bluff · 2.4%**: A5s-A4s, AJo, KQo
- **Call · 4.8%**: JJ-66, ATs, KJs-KTs, QTs+, JTs, T9s

### Facing a raise · CO vs HJ
- **3-bet for value · 4.4%**: QQ+, AJs+, KQs, AQo+
- **3-bet as a bluff · 3.6%**: A9s-A4s, AJo, KQo
- **Call · 5.3%**: JJ-55, ATs, KJs-KTs, QTs+, JTs, T9s

### Facing a raise · BTN vs UTG
- **3-bet for value · 2.6%**: QQ+, AKs, AKo
- **3-bet as a bluff · 2.7%**: AQo-AJo, KQo
- **Call · 6.6%**: JJ-44, AQs-ATs, KTs+, QTs+, JTs, T9s

### Facing a raise · BTN vs UTG+1
- **3-bet for value · 2.6%**: QQ+, AKs, AKo
- **3-bet as a bluff · 2.7%**: AQo-AJo, KQo
- **Call · 7.4%**: JJ-33, AQs-ATs, KTs+, QTs+, J9s+, T9s

### Facing a raise · BTN vs UTG+2
- **3-bet for value · 3.8%**: QQ+, AQs+, AQo+
- **3-bet as a bluff · 2.1%**: A9s, ATo, KJo
- **Call · 8.4%**: JJ-44, AJs-ATs, KTs+, QTs+, J9s+, T9s, AJo, KQo

### Facing a raise · BTN vs LJ
- **3-bet for value · 3.8%**: QQ+, AQs+, AQo+
- **3-bet as a bluff · 2.7%**: A8s-A6s, ATo, KJo
- **Call · 8.7%**: JJ-44, AJs-A9s, KTs+, QTs+, J9s+, T9s, AJo, KQo

### Facing a raise · BTN vs HJ
- **3-bet for value · 4.1%**: QQ+, AJs+, AQo+
- **3-bet as a bluff · 3.0%**: A8s-A5s, ATo, KJo
- **Call · 9.7%**: JJ-22, ATs-A9s, KTs+, QTs+, J9s+, T9s, 98s, AJo, KQo

### Facing a raise · BTN vs CO
- **3-bet for value · 4.1%**: QQ+, AJs+, AQo+
- **3-bet as a bluff · 3.9%**: A8s-A6s, A3s-A2s, J8s, 86s, KTo, QJo
- **Call · 11.8%**: JJ-22, ATs-A9s, A5s-A4s, KTs+, Q9s+, J9s+, T8s+, 98s, AJo, KJo+

### Facing a raise · SB vs UTG/UTG+1
- **3-bet for value · 1.7%**: QQ+, AKs
- **3-bet as a bluff · 0.3%**: A5s
- **Call · 5.3%**: JJ-77, AQs-ATs, KQs, AQo+

### Facing a raise · SB vs UTG+2
- **3-bet for value · 1.7%**: QQ+, AKs
- **3-bet as a bluff · 0.3%**: A5s
- **Call · 6.6%**: JJ-66, AQs-ATs, KJs+, QJs, JTs, AQo+

### Facing a raise · SB vs LJ
- **3-bet for value · 2.9%**: QQ+, AQs+, AKo
- **3-bet as a bluff · 1.2%**: A5s, AJo
- **Call · 5.7%**: JJ-66, AJs-ATs, KJs+, QTs+, JTs, AQo

### Facing a raise · SB vs HJ
- **3-bet for value · 2.9%**: QQ+, AQs+, AKo
- **3-bet as a bluff · 1.8%**: A9s, A5s-A4s, AJo
- **Call · 6.3%**: JJ-66, AJs-ATs, KTs+, QTs+, JTs, T9s, AQo

### Facing a raise · SB vs CO
- **3-bet for value · 5.6%**: TT+, ATs+, KQs, AQo+
- **3-bet as a bluff · 6.6%**: A9s-A2s, KJs-KTs, QTs+, J9s+, T9s, 98s, AJo, KQo

### Facing a raise · SB vs BTN
- **3-bet for value · 7.7%**: TT+, ATs+, KJs+, AJo+, KQo
- **3-bet as a bluff · 8.1%**: A9s-A2s, KTs, Q9s+, J9s+, T8s+, 98s, 87s, ATo, KJo, QJo

### Facing a raise · BB vs UTG/UTG+1
- **3-bet for value · 2.0%**: QQ+, AQs+
- **3-bet as a bluff · 1.2%**: 86s, 75s+, 65s
- **Call · 13.9%**: JJ-22, AJs-A2s, KTs+, QTs+, J9s+, T9s, 98s, AJo+, KQo

### Facing a raise · BB vs UTG+2
- **3-bet for value · 3.3%**: JJ+, AQs+, AKo
- **3-bet as a bluff · 1.8%**: 86s, 75s+, 64s+, 54s
- **Call · 13.4%**: TT-22, AJs-A2s, KTs+, QTs+, J9s+, T9s, 98s, AQo-AJo, KQo, QJo

### Facing a raise · BB vs LJ
- **3-bet for value · 4.4%**: TT+, AJs+, KQs, AKo
- **3-bet as a bluff · 1.8%**: 75s, 64s+, 53s+, 43s
- **Call · 15.1%**: 99-22, ATs-A2s, KJs-KTs, Q9s+, J9s+, T8s+, 98s, 87s, AQo-AJo, KJo+, QJo, JTo

### Facing a raise · BB vs HJ
- **3-bet for value · 5.3%**: TT+, AJs+, KQs, AQo+
- **3-bet as a bluff · 2.4%**: 75s+, 64s+, 53s+, 43s, 32s
- **Call · 14.5%**: 99-22, ATs-A2s, KJs-KTs, Q9s+, J9s+, T8s+, 97s+, 87s, AJo, KJo+, QJo, JTo

### Facing a raise · BB vs CO
- **3-bet for value · 8.0%**: TT+, ATs+, KJs+, QJs, AJo+, KQo
- **3-bet as a bluff · 3.6%**: 85s, 74s+, 63s+, 53s+, 42s+, 32s
- **Call · 17.2%**: 99-22, A9s-A2s, KTs-K9s, QTs-Q9s, J8s+, T8s+, 97s+, 86s+, ATo, KJo-KTo, QTo+, J9o+, T9o

### Facing a raise · BB vs BTN
- **3-bet for value · 9.4%**: 99+, ATs+, KTs+, QTs+, JTs, AJo+, KQo
- **3-bet as a bluff · 7.5%**: 73s+, 63s+, 52s+, 42s+, 32s, A3o-A2o, 75o, 65o
- **Call · 29.7%**: 88-22, A9s-A2s, K9s-K2s, Q9s-Q8s, J9s-J8s, T7s+, 96s+, 86s+, ATo-A4o, KJo-KTo, Q9o+, J9o+, T8o+, 97o+, 87o, 76o

### Facing a raise · BB vs SB
- **3-bet for value · 9.4%**: 99+, ATs+, KTs+, QTs+, JTs, AJo+, KQo
- **3-bet as a bluff · 7.8%**: J9s, T8s+, 98s, 87s, 76s, 65s, 54s, A2o, 75o+, 64o+, 54o
- **Call · 32.1%**: 88-22, A9s-A2s, K9s-K2s, Q9s-Q7s, J8s-J7s, T7s, 97s-96s, 86s, 75s, 64s, 53s, 43s, 32s, ATo-A3o, KJo-K9o, Q9o+, J8o+, T8o+, 97o+, 87o

### Open + callers · UTG+1 vs UTG
- **Squeeze for value · 2.6%**: QQ+, AKs, AKo
- **Call · 6.0%**: JJ-22, AQs-ATs, KJs+

### Open + callers · UTG+2 vs UTG/UTG+1
- **Squeeze for value · 2.6%**: QQ+, AKs, AKo
- **Call · 6.0%**: JJ-22, AQs-ATs, KJs+

### Open + callers · LJ vs UTG/UTG+1
- **Squeeze for value · 2.6%**: QQ+, AKs, AKo
- **Call · 6.0%**: JJ-22, AQs-ATs, KJs+

### Open + callers · LJ vs UTG+2
- **Squeeze for value · 2.6%**: QQ+, AKs, AKo
- **Call · 6.6%**: JJ-22, AQs-ATs, KJs+, QJs, JTs

### Open + callers · HJ vs UTG
- **Squeeze for value · 2.6%**: QQ+, AKs, AKo
- **Call · 6.0%**: JJ-22, AQs-ATs, KJs+

### Open + callers · HJ vs UTG+1
- **Squeeze for value · 2.6%**: QQ+, AKs, AKo
- **Call · 6.6%**: JJ-22, AQs-ATs, KJs+, QJs, JTs

### Open + callers · HJ vs UTG+2
- **Squeeze for value · 2.6%**: QQ+, AKs, AKo
- **Call · 6.9%**: JJ-22, AQs-ATs, A5s, KJs+, QJs, JTs

### Open + callers · HJ vs LJ
- **Squeeze for value · 4.4%**: QQ+, AJs+, KQs, AQo+
- **Call · 6.6%**: JJ-22, ATs, KJs-KTs, QTs+, JTs, T9s

### Open + callers · CO vs UTG/UTG+1
- **Squeeze for value · 2.9%**: QQ+, AQs+, AKo
- **Call · 6.6%**: JJ-22, AJs-ATs, KJs+, QTs+, JTs

### Open + callers · CO vs UTG+2
- **Squeeze for value · 2.9%**: QQ+, AQs+, AKo
- **Call · 7.2%**: JJ-22, AJs-ATs, A5s, KTs+, QTs+, JTs

### Open + callers · CO vs LJ
- **Squeeze for value · 4.4%**: QQ+, AJs+, KQs, AQo+
- **Call · 7.2%**: JJ-22, ATs, A5s-A4s, KJs-KTs, QTs+, JTs, T9s

### Open + callers · CO vs HJ
- **Squeeze for value · 4.4%**: QQ+, AJs+, KQs, AQo+
- **Call · 8.4%**: JJ-22, ATs-A4s, KJs-KTs, QTs+, JTs, T9s

### Open + callers · BTN vs UTG
- **Squeeze for value · 2.6%**: QQ+, AKs, AKo
- **Call · 7.5%**: JJ-22, AQs-ATs, KTs+, QTs+, JTs, T9s

### Open + callers · BTN vs UTG+1
- **Squeeze for value · 2.6%**: QQ+, AKs, AKo
- **Call · 7.8%**: JJ-22, AQs-ATs, KTs+, QTs+, J9s+, T9s

### Open + callers · BTN vs UTG+2
- **Squeeze for value · 3.8%**: QQ+, AQs+, AQo+
- **Call · 7.8%**: JJ-22, AJs-A9s, KTs+, QTs+, J9s+, T9s

### Open + callers · BTN vs LJ
- **Squeeze for value · 3.8%**: QQ+, AQs+, AQo+
- **Call · 8.7%**: JJ-22, AJs-A6s, KTs+, QTs+, J9s+, T9s

### Open + callers · BTN vs HJ
- **Squeeze for value · 4.1%**: QQ+, AJs+, AQo+
- **Call · 9.0%**: JJ-22, ATs-A5s, KTs+, QTs+, J9s+, T9s, 98s

### Open + callers · BTN vs CO
- **Squeeze for value · 4.1%**: QQ+, AJs+, AQo+
- **Call · 11.5%**: JJ-22, ATs-A2s, KTs+, Q9s+, J8s+, T8s+, 98s, 86s+

### Open + callers · SB vs UTG/UTG+1
- **Squeeze for value · 1.7%**: QQ+, AKs
- **Call · 7.8%**: JJ-22, AQs-ATs, A5s, KQs, AQo+

### Open + callers · SB vs UTG+2
- **Squeeze for value · 1.7%**: QQ+, AKs
- **Call · 8.7%**: JJ-22, AQs-ATs, A5s, KJs+, QJs, JTs, AQo+

### Open + callers · SB vs LJ
- **Squeeze for value · 2.9%**: QQ+, AQs+, AKo
- **Call · 7.8%**: JJ-22, AJs-ATs, A5s, KJs+, QTs+, JTs, AQo

### Open + callers · SB vs HJ
- **Squeeze for value · 2.9%**: QQ+, AQs+, AKo
- **Call · 9.0%**: JJ-22, AJs-A9s, A5s-A4s, KTs+, QTs+, JTs, T9s, AQo

### Open + callers · SB vs CO
- **Squeeze for value · 5.6%**: TT+, ATs+, KQs, AQo+
- **Call · 8.4%**: 99-22, A9s-A2s, KJs-KTs, QTs+, J9s+, T9s, 98s

### Open + callers · SB vs BTN
- **Squeeze for value · 7.7%**: TT+, ATs+, KJs+, AJo+, KQo
- **Call · 9.0%**: 99-22, A9s-A2s, KTs, Q9s+, J9s+, T8s+, 98s, 87s

### Open + callers · BB vs UTG/UTG+1
- **Squeeze for value · 2.0%**: QQ+, AQs+
- **Call · 13.6%**: JJ-22, AJs-A2s, KTs+, QTs+, J9s+, T9s, 98s, 86s+, 75s+, 65s, AQo+

### Open + callers · BB vs UTG+2
- **Squeeze for value · 3.3%**: JJ+, AQs+, AKo
- **Call · 12.8%**: TT-22, AJs-A2s, KTs+, QTs+, J9s+, T9s, 98s, 86s+, 75s+, 64s+, 54s, AQo

### Open + callers · BB vs LJ
- **Squeeze for value · 4.4%**: TT+, AJs+, KQs, AKo
- **Call · 12.7%**: 99-22, ATs-A2s, KJs-KTs, Q9s+, J9s+, T8s+, 98s, 87s, 75s+, 64s+, 53s+, 43s, AQo

### Open + callers · BB vs HJ
- **Squeeze for value · 5.3%**: TT+, AJs+, KQs, AQo+
- **Call · 12.4%**: 99-22, ATs-A2s, KJs-KTs, Q9s+, J9s+, T8s+, 97s+, 87s, 75s+, 64s+, 53s+, 43s, 32s

### Open + callers · BB vs CO
- **Squeeze for value · 8.0%**: TT+, ATs+, KJs+, QJs, AJo+, KQo
- **Call · 13.6%**: 99-22, A9s-A2s, KTs-K9s, QTs-Q9s, J8s+, T8s+, 97s+, 85s+, 74s+, 63s+, 53s+, 42s+, 32s

### Open + callers · BB vs BTN
- **Squeeze for value · 9.4%**: 99+, ATs+, KTs+, QTs+, JTs, AJo+, KQo
- **Call · 15.5%**: 88-22, A9s-A2s, K9s-K2s, Q9s-Q8s, J9s-J8s, T7s+, 96s+, 86s+, 73s+, 63s+, 52s+, 42s+, 32s

### Open + callers · BB vs SB
- **Squeeze for value · 9.4%**: 99+, ATs+, KTs+, QTs+, JTs, AJo+, KQo
- **Call · 14.6%**: 88-22, A9s-A2s, K9s-K2s, Q9s-Q7s, J9s-J7s, T7s+, 96s+, 86s+, 75s+, 64s+, 53s+, 43s, 32s

### Limpers · UTG+1 / UTG+2 / LJ
- **Iso-raise · 8.4%**: 99+, ATs+, KJs+, QJs, AJo+, KQo
- **Overlimp · 7.7%**: 88-22, A9s-A2s, KTs, QTs, JTs, T9s, 98s, 87s, 76s

### Limpers · HJ
- **Iso-raise · 10.9%**: 77+, A9s+, A5s, KTs+, QTs+, JTs, AJo+, KQo
- **Overlimp · 6.5%**: 66-22, A8s-A6s, A4s-A2s, K9s, Q9s, J9s, T9s, 98s, 87s, 76s, 65s

### Limpers · CO
- **Iso-raise · 14.3%**: 66+, A8s+, A5s-A4s, K9s+, QTs+, JTs, T9s, ATo+, KJo+
- **Overlimp · 7.5%**: 55-22, A7s-A6s, A3s-A2s, K8s-K6s, Q9s, J9s, T8s, 97s+, 87s, 76s, 65s, 54s, QJo

### Limpers · BTN
- **Iso-raise · 18.1%**: 55+, A7s+, A5s-A3s, K9s+, Q9s+, J9s+, T9s, 98s, ATo+, KTo+, QJo
- **Overlimp · 8.9%**: 44-22, A6s, A2s, K8s-K5s, Q8s, J8s, T8s, 97s, 86s+, 75s+, 65s, 54s, A9o, QTo, JTo

### Limpers · SB
- **Raise · 8.6%**: 88+, ATs+, KJs+, AJo+, KQo
- **Complete · 18.4%**: 77-22, A9s-A2s, KTs-K6s, Q8s+, J8s+, T8s+, 97s+, 87s, 76s, 65s, 54s, ATo-A8o, KJo-KTo, QTo+, JTo

### Limpers · BB
- **Raise · 5.3%**: TT+, AJs+, KQs, AQo+

### I opened, got 3-bet · UTG vs UTG+1
- **4-bet for value · 2.1%**: KK+, AKs, AKo
- **4-bet as a bluff · 1.2%**: ATs, AQo
- **Call · 2.7%**: QQ-99, AQs-AJs, KQs
- **Fold · 3.5%**: 88-66, A9s, A5s, KJs-KTs, QTs+, JTs

### I opened, got 3-bet · UTG vs UTG+2
- **4-bet for value · 2.1%**: KK+, AKs, AKo
- **4-bet as a bluff · 1.2%**: ATs, AQo
- **Call · 3.2%**: QQ-88, AQs-AJs, KQs
- **Fold · 3.0%**: 77-66, A9s, A5s, KJs-KTs, QTs+, JTs

### I opened, got 3-bet · UTG vs LJ
- **4-bet for value · 2.1%**: KK+, AKs, AKo
- **4-bet as a bluff · 1.2%**: ATs, AQo
- **Call · 3.2%**: QQ-88, AQs-AJs, KQs
- **Fold · 3.0%**: 77-66, A9s, A5s, KJs-KTs, QTs+, JTs

### I opened, got 3-bet · UTG vs HJ
- **4-bet for value · 2.6%**: QQ+, AKs, AKo
- **4-bet as a bluff · 1.2%**: ATs, AQo
- **Call · 3.5%**: JJ-77, AQs-AJs, KQs, QJs
- **Fold · 2.3%**: 66, A9s, A5s, KJs-KTs, QTs, JTs

### I opened, got 3-bet · UTG vs CO/BTN
- **4-bet for value · 2.6%**: QQ+, AKs, AKo
- **4-bet as a bluff · 0.6%**: KTs, QTs
- **Call · 4.7%**: JJ-77, AQs-ATs, KQs, QJs, AQo
- **Fold · 1.7%**: 66, A9s, A5s, KJs, JTs

### I opened, got 3-bet · UTG vs SB/BB
- **4-bet for value · 2.6%**: QQ+, AKs, AKo
- **4-bet as a bluff · 0.6%**: KTs, QTs
- **Call · 5.0%**: JJ-77, AQs-ATs, KJs+, QJs, AQo
- **Fold · 1.4%**: 66, A9s, A5s, JTs

### I opened, got 3-bet · UTG+1 vs UTG+2
- **4-bet for value · 2.1%**: KK+, AKs, AKo
- **4-bet as a bluff · 2.1%**: ATs, AQo-AJo
- **Call · 4.2%**: QQ-77, AQs-AJs, KJs+, QJs
- **Fold · 5.0%**: 66, A9s-A4s, KTs, QTs, J9s+, T9s, 98s, KQo

### I opened, got 3-bet · UTG+1 vs LJ
- **4-bet for value · 2.1%**: KK+, AKs, AKo
- **4-bet as a bluff · 1.5%**: KTs, QTs, AJo
- **Call · 5.4%**: QQ-77, AQs-ATs, KJs+, QJs, AQo
- **Fold · 4.4%**: 66, A9s-A4s, J9s+, T9s, 98s, KQo

### I opened, got 3-bet · UTG+1 vs HJ/CO
- **4-bet for value · 2.1%**: KK+, AKs, AKo
- **4-bet as a bluff · 2.4%**: KTs, QTs, AJo, KQo
- **Call · 5.7%**: QQ-77, AQs-ATs, KJs+, QJs, JTs, AQo
- **Fold · 3.2%**: 66, A9s-A4s, J9s, T9s, 98s

### I opened, got 3-bet · UTG+1 vs BTN
- **4-bet for value · 2.1%**: KK+, AKs, AKo
- **4-bet as a bluff · 1.5%**: KTs, QTs, KQo
- **Call · 6.2%**: QQ-66, AQs-ATs, KJs+, QJs, JTs, AQo
- **Fold · 3.6%**: A9s-A4s, J9s, T9s, 98s, AJo

### I opened, got 3-bet · UTG+1 vs SB/BB
- **4-bet for value · 2.6%**: QQ+, AKs, AKo
- **4-bet as a bluff · 1.2%**: A9s, KQo
- **Call · 6.9%**: JJ-66, AQs-ATs, KJs+, QTs+, JTs, AQo-AJo
- **Fold · 2.7%**: A8s-A4s, KTs, J9s, T9s, 98s

### I opened, got 3-bet · UTG+2 vs LJ
- **4-bet for value · 2.1%**: KK+, AKs, AKo
- **4-bet as a bluff · 1.8%**: AJo, KQo
- **Call · 5.4%**: QQ-77, AQs-ATs, KJs+, QJs, AQo
- **Fold · 5.1%**: 66-55, A9s-A2s, KTs, QTs, J9s+, T9s, 98s

### I opened, got 3-bet · UTG+2 vs HJ
- **4-bet for value · 2.1%**: KK+, AKs, AKo
- **4-bet as a bluff · 1.8%**: AJo, KQo
- **Call · 5.7%**: QQ-77, AQs-ATs, KJs+, QJs, JTs, AQo
- **Fold · 4.8%**: 66-55, A9s-A2s, KTs, QTs, J9s, T9s, 98s

### I opened, got 3-bet · UTG+2 vs CO/BTN
- **4-bet for value · 2.1%**: KK+, AKs, AKo
- **4-bet as a bluff · 2.1%**: A9s, AJo, KQo
- **Call · 6.8%**: QQ-66, AQs-ATs, KTs+, QTs+, JTs, AQo
- **Fold · 3.5%**: 55, A8s-A2s, J9s, T9s, 98s

### I opened, got 3-bet · UTG+2 vs SB/BB
- **4-bet for value · 2.6%**: QQ+, AKs, AKo
- **4-bet as a bluff · 2.1%**: A9s, AJo, KQo
- **Call · 6.6%**: JJ-66, AQs-ATs, KTs+, QTs+, JTs, T9s, AQo
- **Fold · 3.2%**: 55, A8s-A2s, J9s, 98s

### I opened, got 3-bet · LJ vs HJ
- **4-bet for value · 2.6%**: QQ+, AKs, AKo
- **4-bet as a bluff · 2.1%**: A9s, AJo, KQo
- **Call · 5.6%**: JJ-77, AQs-ATs, KJs+, QTs+, JTs, AQo
- **Fold · 6.5%**: 66-44, A8s-A2s, KTs, Q9s, J9s, T9s, 98s, 87s, 76s, KJo

### I opened, got 3-bet · LJ vs CO
- **4-bet for value · 3.0%**: JJ+, AKs, AKo
- **4-bet as a bluff · 2.1%**: A9s, AJo, KQo
- **Call · 5.6%**: TT-66, AQs-ATs, KJs+, QTs+, JTs, AQo
- **Fold · 6.0%**: 55-44, A8s-A2s, KTs, Q9s, J9s, T9s, 98s, 87s, 76s, KJo

### I opened, got 3-bet · LJ vs BTN
- **4-bet for value · 3.0%**: JJ+, AKs, AKo
- **4-bet as a bluff · 2.4%**: A9s-A8s, AJo, KQo
- **Call · 6.2%**: TT-66, AQs-ATs, KTs+, QTs+, JTs, T9s, AQo
- **Fold · 5.1%**: 55-44, A7s-A2s, Q9s, J9s, 98s, 87s, 76s, KJo

### I opened, got 3-bet · LJ vs SB
- **4-bet for value · 3.0%**: JJ+, AKs, AKo
- **4-bet as a bluff · 1.8%**: A9s-A7s, KJo
- **Call · 8.3%**: TT-66, AQs-ATs, KTs+, QTs+, J9s+, T9s, AQo-AJo, KQo
- **Fold · 3.6%**: 55-44, A6s-A2s, Q9s, 98s, 87s, 76s

### I opened, got 3-bet · LJ vs BB
- **4-bet for value · 3.0%**: JJ+, AKs, AKo
- **4-bet as a bluff · 2.4%**: A9s-A8s, AJo, KQo
- **Call · 7.1%**: TT-44, AQs-ATs, KTs+, QTs+, JTs, T9s, AQo
- **Fold · 4.2%**: A7s-A2s, Q9s, J9s, 98s, 87s, 76s, KJo

### I opened, got 3-bet · HJ vs CO
- **4-bet for value · 3.0%**: JJ+, AKs, AKo
- **4-bet as a bluff · 1.8%**: A9s-A7s, KJo
- **Call · 8.3%**: TT-66, AQs-ATs, KTs+, QTs+, J9s+, T9s, AQo-AJo, KQo
- **Fold · 5.7%**: 55-22, A6s-A2s, Q9s, T8s, 97s+, 87s, QJo

### I opened, got 3-bet · HJ vs BTN
- **4-bet for value · 3.0%**: JJ+, AKs, AKo
- **4-bet as a bluff · 1.8%**: A9s-A7s, KJo
- **Call · 8.7%**: TT-55, AQs-ATs, KTs+, QTs+, J9s+, T9s, AQo-AJo, KQo
- **Fold · 5.3%**: 44-22, A6s-A2s, Q9s, T8s, 97s+, 87s, QJo

### I opened, got 3-bet · HJ vs SB
- **4-bet for value · 3.0%**: JJ+, AKs, AKo
- **4-bet as a bluff · 1.8%**: A9s-A7s, KJo
- **Call · 8.7%**: TT-55, AQs-ATs, KTs+, QTs+, J9s+, T9s, AQo-AJo, KQo
- **Fold · 5.3%**: 44-22, A6s-A2s, Q9s, T8s, 97s+, 87s, QJo

### I opened, got 3-bet · HJ vs BB
- **4-bet for value · 3.0%**: JJ+, AKs, AKo
- **4-bet as a bluff · 2.4%**: A9s-A8s, AJo, KQo
- **Call · 6.6%**: TT-55, AQs-ATs, KTs+, QTs+, JTs, T9s, AQo
- **Fold · 6.8%**: 44-22, A7s-A2s, Q9s, J9s, T8s, 97s+, 87s, KJo, QJo

### I opened, got 3-bet · CO vs BTN/SB
- **4-bet for value · 3.5%**: TT+, AKs, AKo
- **4-bet as a bluff · 2.4%**: A8s-A7s, ATo, KJo
- **Call · 10.0%**: 99-44, AQs-A9s, A5s, KTs+, Q9s+, J9s+, T9s, 98s, AQo-AJo, KQo
- **Fold · 7.8%**: 33-22, A6s, A4s-A2s, K9s, J8s, T8s, 97s, 86s+, 76s, KTo, QTo+, JTo

### I opened, got 3-bet · CO vs BB
- **4-bet for value · 3.5%**: TT+, AKs, AKo
- **4-bet as a bluff · 2.1%**: A8s, ATo, KJo
- **Call · 9.7%**: 99-44, AQs-A9s, A5s, KTs+, QTs+, J9s+, T9s, 98s, AQo-AJo, KQo
- **Fold · 8.4%**: 33-22, A7s-A6s, A4s-A2s, K9s, Q9s, J8s, T8s, 97s, 86s+, 76s, KTo, QTo+, JTo

### I opened, got 3-bet · BTN vs SB/BB
- **4-bet for value · 5.4%**: 99+, AJs+, AQo+
- **4-bet as a bluff · 4.2%**: K6s-K4s, 86s, 75s, 64s, 54s, 43s, QTo, JTo
- **Call · 16.4%**: 88-22, ATs-A2s, K9s+, Q9s+, J8s+, T8s+, 97s+, 87s, 76s, 65s, AJo-ATo, KTo+, QJo
- **Fold · 17.2%**: K8s-K7s, K3s-K2s, Q8s, T7s, 96s, 53s, 32s, A9o-A2o, Q9o, J9o, T8o+, 97o+, 87o, 76o

### I opened, got 3-bet · SB vs BB
- **4-bet for value · 2.7%**: QQ-JJ, AJs+, AQo
- **4-bet as a bluff · 1.2%**: J4s, K3o
- **Call · 6.5%**: TT-88, ATs, KJs+, QJs, 43s, AJo-ATo, KJo+
- **Fold · 6.0%**: J3s-J2s, T5s-T4s, 95s-94s, 85s-84s, 74s, 63s, 53s, K2o, 96o, 86o

### I 3-bet, got 4-bet · in position
- **5-bet all-in · 2.6%**: QQ+, AKs, AKo

### I 3-bet, got 4-bet · out of position
- **5-bet all-in · 2.6%**: QQ+, AKs, AKo

### SB limped, BB raised
- **3-bet for value · 1.8%**: KK+, AKo
- **3-bet as a bluff · 0.9%**: A3o
- **Call · 28.7%**: 77-22, A9s-A2s, KTs-K2s, QTs-Q8s, J8s+, T7s+, 97s+, 86s+, 75s+, 64s+, 54s, A9o-A4o, KTo, Q9o+, J9o+, T8o+, 97o+, 87o
- **Fold · 7.2%**: Q7s-Q2s, J7s, 96s, 32s, A2o, K9o, J8o, 76o, 65o


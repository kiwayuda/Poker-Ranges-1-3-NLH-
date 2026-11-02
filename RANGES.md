# Range Guide: $1/$3 NLH, 9-max

These are the default ranges the trainer grades you against. Change any of them in the game's **Ranges** tab; your edits are saved in your browser.

## Where they come from

- **Folded to me, Facing a raise, I opened and got 3-bet, SB vs BB, SB limp vs BB raise:** read cell by cell from the [PokerCoaching.com full preflop charts](https://poker-coaching.s3.amazonaws.com/tools/preflop-charts/full-preflop-charts.pdf). The combo counts match every chart's legend. Those charts assume 100bb stacks and an ante.
- **Limpers in front:** the PDF has no limped-pot charts, so these are a disciplined live 1/3 default: iso-raise hands that win heads-up, overlimp hands that want a cheap multiway flop, fold the rest. The big blind never folds to limps; it checks.

## How to read the notation

- `66+` = 66, 77, … AA
- `A9s+` = A9s, ATs, … AKs (suited)
- `K8s-K6s` = K8s, K7s, K6s
- `AQo+` = AQo, AKo (offsuit)
- Percentages are the share of all 1,326 starting hands.

## Core ideas

1. **Open, don't limp.** When it folds to you, every hand you play is a raise (except the SB, which has a limp strategy against the BB).
2. **Position widens the range.** UTG opens about 10% of hands; the button opens about 51%.
3. **Facing a raise, play much tighter than you would open.** The opener has a strong range, so offsuit hands like KJo, AJo and QJo mostly fold early.
4. **3-bet bluffs are specific.** Suited wheel Aces (A5s-A2s) and some suited Kings and connectors: they block strong hands and still play well when called.
5. **SB vs CO/BTN opens is 3-bet or fold.** Flat calling invites the big blind to squeeze.
6. **Facing a 3-bet, let go of the open.** In "I opened, got 3-bet" charts, grey hands are hands you opened that now fold.

## 1/3 sizing used in the trainer

- Open to $12–15. Isolate limpers to about $15 plus $5 per limper, a bit bigger out of position.
- 3-bet to 3x the open in position, 3.5x out of position.
- 4-bet to 2.5x the 3-bet in position, 2.75x out of position.
- 3-bet and 4-bet sizes are rounded to the nearest $5.

## All default charts

### Folded to me · UTG open
- **Raise · 10.1%**: 66+, A9s+, A5s, KTs+, QTs+, JTs, T9s, 98s, AQo+

### Folded to me · UTG+1 open
- **Raise · 14.3%**: 66+, A4s+, K9s+, Q9s+, J9s+, T9s, 98s, 87s, AJo+, KQo

### Folded to me · UTG+2 open
- **Raise · 15.7%**: 55+, A2s+, K9s+, Q9s+, J9s+, T9s, 98s, 87s, 76s, AJo+, KQo

### Folded to me · LJ open
- **Raise · 18.3%**: 44+, A2s+, K9s+, Q9s+, J9s+, T9s, 98s, 87s, 76s, 65s, ATo+, KJo+

### Folded to me · HJ open
- **Raise · 21.3%**: 22+, A2s+, K8s+, Q9s+, J9s+, T8s+, 97s+, 87s, 76s, 65s, 54s, ATo+, KJo+, QJo

### Folded to me · CO open
- **Raise · 27.0%**: 22+, A2s+, K7s+, Q8s+, J8s+, T8s+, 97s+, 86s+, 75s+, 64s+, 54s, 43s, A9o+, KTo+, QTo+, JTo

### Folded to me · BTN open
- **Raise · 51.1%**: 22+, A2s+, K2s+, Q2s+, J6s+, T6s+, 96s+, 85s+, 74s+, 64s+, 53s+, 43s, 32s, A2o+, K7o+, Q8o+, J8o+, T8o+, 97o+, 87o, 76o

### Folded to me · SB (vs BB)
- **Raise for value · 8.9%**: QQ-88, ATs+, KJs+, QJs, AQo-ATo, KJo+
- **Raise as a bluff · 13.0%**: J4s-J2s, T5s-T4s, 95s-94s, 85s-84s, 74s, 63s, 53s, 43s, K3o-K2o, Q5o-Q2o, J6o, T6o, 96o, 86o
- **Limp · 48.6%**: KK+, 77-22, A9s-A2s, KTs-K2s, QTs-Q2s, J5s+, T6s+, 96s+, 86s+, 75s+, 64s+, 54s, 32s, AKo, A9o-A2o, KTo-K4o, Q6o+, J7o+, T7o+, 97o+, 87o, 76o, 65o

### Facing a raise · UTG+1 vs UTG
- **3-bet for value · 2.6%**: QQ+, AKs, AKo
- **3-bet as a bluff · 1.5%**: ATs, KJs, AQo
- **Call · 3.3%**: JJ-88, AQs-AJs, KQs, QJs, JTs

### Facing a raise · UTG+2 vs UTG/UTG+1
- **3-bet for value · 2.6%**: QQ+, AKs, AKo
- **3-bet as a bluff · 1.5%**: ATs, KJs, AQo
- **Call · 3.3%**: JJ-88, AQs-AJs, KQs, QJs, JTs

### Facing a raise · LJ vs UTG/UTG+1
- **3-bet for value · 2.6%**: QQ+, AKs, AKo
- **3-bet as a bluff · 1.8%**: ATs, A5s, KJs, AQo
- **Call · 4.1%**: JJ-77, AQs-AJs, KQs, QJs, JTs, T9s

### Facing a raise · LJ vs UTG+2
- **3-bet for value · 2.6%**: QQ+, AKs, AKo
- **3-bet as a bluff · 2.4%**: ATs, A5s, KJs, 98s, 87s, AQo
- **Call · 4.5%**: JJ-66, AQs-AJs, KQs, QJs, JTs, T9s

### Facing a raise · HJ vs UTG
- **3-bet for value · 2.6%**: QQ+, AKs, AKo
- **3-bet as a bluff · 1.8%**: ATs, A5s, KJs, AQo
- **Call · 4.1%**: JJ-77, AQs-AJs, KQs, QJs, JTs, T9s

### Facing a raise · HJ vs UTG+1
- **3-bet for value · 2.6%**: QQ+, AKs, AKo
- **3-bet as a bluff · 1.8%**: ATs, A5s, KJs, AQo
- **Call · 4.8%**: JJ-66, AQs-AJs, KQs, QJs, JTs, T9s, 98s

### Facing a raise · HJ vs UTG+2
- **3-bet for value · 2.6%**: QQ+, AKs, AKo
- **3-bet as a bluff · 3.0%**: ATs, A5s-A3s, KJs, 87s, 76s, AQo
- **Call · 5.3%**: JJ-55, AQs-AJs, KQs, QJs, JTs, T9s, 98s

### Facing a raise · HJ vs LJ
- **3-bet for value · 4.4%**: QQ+, AJs+, KQs, AQo+
- **3-bet as a bluff · 4.5%**: A5s-A2s, 76s, 65s, AJo-ATo, KQo
- **Call · 5.9%**: JJ-55, ATs, KJs-KTs, QTs+, JTs, T9s, 98s, 87s

### Facing a raise · CO vs UTG/UTG+1
- **3-bet for value · 2.9%**: QQ+, AQs+, AKo
- **3-bet as a bluff · 2.4%**: A5s-A4s, AQo-AJo
- **Call · 5.7%**: JJ-66, AJs-ATs, KTs+, QTs+, JTs, T9s, 98s

### Facing a raise · CO vs UTG+2
- **3-bet for value · 2.9%**: QQ+, AQs+, AKo
- **3-bet as a bluff · 3.6%**: A5s-A2s, 87s, 76s, AQo-AJo
- **Call · 6.2%**: JJ-55, AJs-ATs, KTs+, QTs+, JTs, T9s, 98s

### Facing a raise · CO vs LJ
- **3-bet for value · 4.4%**: QQ+, AJs+, KQs, AQo+
- **3-bet as a bluff · 4.2%**: A5s-A2s, 87s, 76s, 65s, 54s, AJo, KQo
- **Call · 6.0%**: JJ-44, ATs, KJs-KTs, QTs+, JTs, T9s, 98s

### Facing a raise · CO vs HJ
- **3-bet for value · 4.4%**: QQ+, AJs+, KQs, AQo+
- **3-bet as a bluff · 6.0%**: A9s-A2s, K9s, Q9s, J9s, 76s, 65s, 54s, AJo, KQo
- **Call · 6.3%**: JJ-44, ATs, KJs-KTs, QTs+, JTs, T9s, 98s, 87s

### Facing a raise · BTN vs UTG
- **3-bet for value · 2.6%**: QQ+, AKs, AKo
- **3-bet as a bluff · 3.6%**: A5s-A4s, 76s, AQo-AJo, KQo
- **Call · 8.1%**: JJ-22, AQs-ATs, KTs+, QTs+, JTs, T9s, 98s, 87s

### Facing a raise · BTN vs UTG+1
- **3-bet for value · 2.6%**: QQ+, AKs, AKo
- **3-bet as a bluff · 3.9%**: A5s-A2s, AQo-AJo, KQo
- **Call · 8.7%**: JJ-22, AQs-ATs, KTs+, QTs+, J9s+, T9s, 98s, 87s, 76s

### Facing a raise · BTN vs UTG+2
- **3-bet for value · 3.8%**: QQ+, AQs+, AQo+
- **3-bet as a bluff · 3.9%**: A9s, A5s-A2s, 65s, 54s, ATo, KJo
- **Call · 10.3%**: JJ-22, AJs-ATs, KTs+, QTs+, J9s+, T9s, 98s, 87s, 76s, AJo, KQo

### Facing a raise · BTN vs LJ
- **3-bet for value · 3.8%**: QQ+, AQs+, AQo+
- **3-bet as a bluff · 4.5%**: A8s-A2s, 65s, 54s, ATo, KJo
- **Call · 10.6%**: JJ-22, AJs-A9s, KTs+, QTs+, J9s+, T9s, 98s, 87s, 76s, AJo, KQo

### Facing a raise · BTN vs HJ
- **3-bet for value · 4.1%**: QQ+, AJs+, AQo+
- **3-bet as a bluff · 5.1%**: A8s-A2s, 86s, 75s, 65s, 54s, ATo, KJo
- **Call · 11.5%**: JJ-22, ATs-A9s, K9s+, Q9s+, J9s+, T8s+, 97s+, 87s, 76s, AJo, KQo

### Facing a raise · BTN vs CO
- **3-bet for value · 4.1%**: QQ+, AJs+, AQo+
- **3-bet as a bluff · 6.9%**: A8s-A6s, A3s-A2s, K8s, Q8s, J8s, 86s, 75s, 64s+, 54s, 43s, A9o, KTo, QJo
- **Call · 13.9%**: JJ-22, ATs-A9s, A5s-A4s, K9s+, Q9s+, J9s+, T8s+, 97s+, 87s, 76s, AJo-ATo, KJo+

### Facing a raise · SB vs UTG/UTG+1
- **3-bet for value · 1.7%**: QQ+, AKs
- **3-bet as a bluff · 0.9%**: A5s, 98s, 87s
- **Call · 6.5%**: JJ-77, AQs-ATs, KJs+, QJs, JTs, T9s, AQo+

### Facing a raise · SB vs UTG+2
- **3-bet for value · 1.7%**: QQ+, AKs
- **3-bet as a bluff · 0.9%**: A5s, 87s, 76s
- **Call · 7.8%**: JJ-66, AQs-ATs, KTs+, QTs+, JTs, T9s, 98s, AQo+

### Facing a raise · SB vs LJ
- **3-bet for value · 2.9%**: QQ+, AQs+, AKo
- **3-bet as a bluff · 2.1%**: A5s-A4s, 87s, 76s, AJo
- **Call · 7.1%**: JJ-55, AJs-ATs, KTs+, QTs+, JTs, T9s, 98s, AQo

### Facing a raise · SB vs HJ
- **3-bet for value · 2.9%**: QQ+, AQs+, AKo
- **3-bet as a bluff · 3.0%**: A9s, A5s-A3s, 76s, 65s, 54s, AJo
- **Call · 7.8%**: JJ-44, AJs-ATs, KTs+, QTs+, JTs, T9s, 98s, 87s, AQo

### Facing a raise · SB vs CO
- **3-bet for value · 5.6%**: TT+, ATs+, KQs, AQo+
- **3-bet as a bluff · 11.2%**: 99-44, A9s-A2s, KJs-K9s, Q9s+, J9s+, T9s, 98s, 87s, 76s, 65s, 54s, AJo, KQo
- **Call · 0.0%**: —

### Facing a raise · SB vs BTN
- **3-bet for value · 7.7%**: TT+, ATs+, KJs+, AJo+, KQo
- **3-bet as a bluff · 13.6%**: 99-22, A9s-A2s, KTs-K9s, Q9s+, J9s+, T8s+, 97s+, 86s+, 76s, 65s, 54s, ATo, KJo, QJo
- **Call · 0.0%**: —

### Facing a raise · BB vs UTG/UTG+1
- **3-bet for value · 2.0%**: QQ+, AQs+
- **3-bet as a bluff · 2.1%**: 86s, 75s+, 64s+, 54s, 43s
- **Call · 23.8%**: JJ-22, AJs-A2s, K5s+, Q7s+, J7s+, T7s+, 96s+, 87s, ATo+, KTo+, QTo+, JTo

### Facing a raise · BB vs UTG+2
- **3-bet for value · 3.3%**: JJ+, AQs+, AKo
- **3-bet as a bluff · 3.0%**: 86s-85s, 74s+, 64s+, 53s+, 43s
- **Call · 23.7%**: TT-22, AJs-A2s, K4s+, Q6s+, J6s+, T6s+, 96s+, 87s, AQo-ATo, KTo+, QTo+, JTo

### Facing a raise · BB vs LJ
- **3-bet for value · 4.4%**: TT+, AJs+, KQs, AKo
- **3-bet as a bluff · 3.3%**: 85s, 75s-74s, 64s+, 53s+, 43s, A9o
- **Call · 25.3%**: 99-22, ATs-A2s, KJs-K2s, Q4s+, J5s+, T5s+, 95s+, 86s+, 76s, AQo-ATo, KTo+, QTo+, JTo

### Facing a raise · BB vs HJ
- **3-bet for value · 5.3%**: TT+, AJs+, KQs, AQo+
- **3-bet as a bluff · 4.2%**: 85s, 74s+, 63s+, 53s+, 43s, 32s, A9o
- **Call · 24.1%**: 99-22, ATs-A2s, KJs-K2s, Q4s+, J5s+, T5s+, 95s+, 86s+, AJo-ATo, KTo+, QTo+, JTo

### Facing a raise · BB vs CO
- **3-bet for value · 8.0%**: TT+, ATs+, KJs+, QJs, AJo+, KQo
- **3-bet as a bluff · 6.3%**: 85s-84s, 73s+, 63s+, 52s+, 42s+, 32s, A4o-A3o
- **Call · 29.6%**: 99-22, A9s-A2s, KTs-K2s, QTs-Q4s, J4s+, T4s+, 94s+, 86s+, ATo-A8o, A5o, KJo-K9o, Q9o+, J9o+, T9o, 98o

### Facing a raise · BB vs BTN
- **3-bet for value · 9.4%**: 99+, ATs+, KTs+, QTs+, JTs, AJo+, KQo
- **3-bet as a bluff · 13.0%**: 73s+, 63s+, 52s+, 42s+, 32s, A3o-A2o, K5o-K2o, Q6o-Q5o, 75o, 65o
- **Call · 49.6%**: 88-22, A9s-A2s, K9s-K2s, Q9s-Q2s, J9s-J2s, T2s+, 92s+, 82s+, 72s, 62s, ATo-A4o, KJo-K6o, Q7o+, J6o+, T6o+, 96o+, 86o+, 76o

### Facing a raise · BB vs SB
- **3-bet for value · 9.4%**: 99+, ATs+, KTs+, QTs+, JTs, AJo+, KQo
- **3-bet as a bluff · 14.2%**: J9s, T8s+, 98s, 87s, 76s, 65s, 54s, A2o, K3o-K2o, Q4o-Q2o, J5o, T5o, 75o+, 64o+, 54o
- **Call · 54.8%**: 88-22, A9s-A2s, K9s-K2s, Q9s-Q2s, J8s-J2s, T7s-T2s, 97s-92s, 86s-82s, 75s-72s, 64s-62s, 53s-52s, 42s+, 32s, ATo-A3o, KJo-K4o, Q5o+, J6o+, T6o+, 96o+, 86o+

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
- **Call · 3.3%**: QQ-99, AQs-AJs, KQs, QJs, JTs
- **Fold · 3.5%**: 88-66, A9s, A5s, KJs-KTs, QTs, T9s, 98s

### I opened, got 3-bet · UTG vs UTG+2
- **4-bet for value · 2.1%**: KK+, AKs, AKo
- **4-bet as a bluff · 1.5%**: ATs-A9s, AQo
- **Call · 3.8%**: QQ-88, AQs-AJs, KQs, QJs, JTs
- **Fold · 2.7%**: 77-66, A5s, KJs-KTs, QTs, T9s, 98s

### I opened, got 3-bet · UTG vs LJ
- **4-bet for value · 2.1%**: KK+, AKs, AKo
- **4-bet as a bluff · 1.5%**: ATs-A9s, AQo
- **Call · 4.1%**: QQ-88, AQs-AJs, KQs, QJs, JTs, T9s
- **Fold · 2.4%**: 77-66, A5s, KJs-KTs, QTs, 98s

### I opened, got 3-bet · UTG vs HJ
- **4-bet for value · 2.6%**: QQ+, AKs, AKo
- **4-bet as a bluff · 1.8%**: ATs-A9s, A5s, AQo
- **Call · 4.4%**: JJ-77, AQs-AJs, KJs+, QJs, JTs, T9s
- **Fold · 1.4%**: 66, KTs, QTs, 98s

### I opened, got 3-bet · UTG vs CO/BTN
- **4-bet for value · 2.6%**: QQ+, AKs, AKo
- **4-bet as a bluff · 1.5%**: A9s, A5s, KTs, QTs, 98s
- **Call · 5.6%**: JJ-77, AQs-ATs, KJs+, QJs, JTs, T9s, AQo
- **Fold · 0.5%**: 66

### I opened, got 3-bet · UTG vs SB/BB
- **4-bet for value · 2.6%**: QQ+, AKs, AKo
- **4-bet as a bluff · 1.5%**: A9s, A5s, KTs, QTs, 98s
- **Call · 6.0%**: JJ-66, AQs-ATs, KJs+, QJs, JTs, T9s, AQo
- **Fold · 0.0%**: —

### I opened, got 3-bet · UTG+1 vs UTG+2
- **4-bet for value · 2.1%**: KK+, AKs, AKo
- **4-bet as a bluff · 2.7%**: ATs-A9s, A5s, AQo-AJo
- **Call · 4.8%**: QQ-77, AQs-AJs, KJs+, QJs, JTs, T9s
- **Fold · 5.6%**: 66, A8s-A6s, A4s, KTs-K9s, QTs-Q9s, J9s, 98s, 87s, ATo, KQo

### I opened, got 3-bet · UTG+1 vs LJ
- **4-bet for value · 2.1%**: KK+, AKs, AKo
- **4-bet as a bluff · 2.4%**: A9s, A5s-A4s, KTs, QTs, AJo
- **Call · 6.0%**: QQ-77, AQs-ATs, KJs+, QJs, JTs, T9s, AQo
- **Fold · 4.7%**: 66, A8s-A6s, K9s, Q9s, J9s, 98s, 87s, ATo, KQo

### I opened, got 3-bet · UTG+1 vs HJ/CO
- **4-bet for value · 2.1%**: KK+, AKs, AKo
- **4-bet as a bluff · 3.3%**: A9s, A5s-A4s, KTs, QTs, AJo, KQo
- **Call · 7.1%**: QQ-66, AQs-ATs, KJs+, QJs, JTs, T9s, 98s, 87s, AQo
- **Fold · 2.7%**: A8s-A6s, K9s, Q9s, J9s, ATo

### I opened, got 3-bet · UTG+1 vs BTN
- **4-bet for value · 2.1%**: KK+, AKs, AKo
- **4-bet as a bluff · 3.6%**: A9s, A5s-A4s, KTs, QTs, J9s, ATo, KQo
- **Call · 8.0%**: QQ-66, AQs-ATs, KJs+, QJs, JTs, T9s, 98s, 87s, AQo-AJo
- **Fold · 1.5%**: A8s-A6s, K9s, Q9s

### I opened, got 3-bet · UTG+1 vs SB/BB
- **4-bet for value · 2.6%**: QQ+, AKs, AKo
- **4-bet as a bluff · 3.6%**: A9s-A8s, A5s-A4s, K9s, J9s, ATo, KQo
- **Call · 8.1%**: JJ-66, AQs-ATs, KTs+, QTs+, JTs, T9s, 98s, 87s, AQo-AJo
- **Fold · 0.9%**: A7s-A6s, Q9s

### I opened, got 3-bet · UTG+2 vs LJ
- **4-bet for value · 2.1%**: KK+, AKs, AKo
- **4-bet as a bluff · 3.3%**: A9s, A5s-A2s, AJo, KQo
- **Call · 6.3%**: QQ-77, AQs-ATs, KJs+, QJs, JTs, T9s, 98s, AQo
- **Fold · 3.9%**: 66-55, A8s-A6s, KTs-K9s, QTs-Q9s, J9s, 87s, 76s

### I opened, got 3-bet · UTG+2 vs HJ
- **4-bet for value · 2.1%**: KK+, AKs, AKo
- **4-bet as a bluff · 3.6%**: A9s, A5s-A2s, 87s, AJo, KQo
- **Call · 6.8%**: QQ-66, AQs-ATs, KJs+, QJs, JTs, T9s, 98s, AQo
- **Fold · 3.2%**: 55, A8s-A6s, KTs-K9s, QTs-Q9s, J9s, 76s

### I opened, got 3-bet · UTG+2 vs CO/BTN
- **4-bet for value · 2.1%**: KK+, AKs, AKo
- **4-bet as a bluff · 3.6%**: A9s-A8s, A5s-A2s, AJo, KQo
- **Call · 8.1%**: QQ-55, AQs-ATs, KTs+, QTs+, JTs, T9s, 98s, 87s, AQo
- **Fold · 1.8%**: A7s-A6s, K9s, Q9s, J9s, 76s

### I opened, got 3-bet · UTG+2 vs SB/BB
- **4-bet for value · 2.6%**: QQ+, AKs, AKo
- **4-bet as a bluff · 3.6%**: A9s-A8s, A5s-A2s, AJo, KQo
- **Call · 7.7%**: JJ-55, AQs-ATs, KTs+, QTs+, JTs, T9s, 98s, 87s, AQo
- **Fold · 1.8%**: A7s-A6s, K9s, Q9s, J9s, 76s

### I opened, got 3-bet · LJ vs HJ
- **4-bet for value · 2.6%**: QQ+, AKs, AKo
- **4-bet as a bluff · 3.6%**: A9s-A8s, A5s-A2s, AJo, KQo
- **Call · 6.5%**: JJ-77, AQs-ATs, KTs+, QTs+, JTs, T9s, 98s, AQo
- **Fold · 5.6%**: 66-44, A7s-A6s, K9s, Q9s, J9s, 87s, 76s, 65s, ATo, KJo

### I opened, got 3-bet · LJ vs CO
- **4-bet for value · 3.0%**: JJ+, AKs, AKo
- **4-bet as a bluff · 3.9%**: A9s-A8s, A5s-A2s, 87s, AJo, KQo
- **Call · 6.5%**: TT-66, AQs-ATs, KTs+, QTs+, JTs, T9s, 98s, AQo
- **Fold · 4.8%**: 55-44, A7s-A6s, K9s, Q9s, J9s, 76s, 65s, ATo, KJo

### I opened, got 3-bet · LJ vs BTN
- **4-bet for value · 3.0%**: JJ+, AKs, AKo
- **4-bet as a bluff · 4.2%**: A9s-A7s, A5s-A2s, 76s, AJo, KQo
- **Call · 7.2%**: TT-55, AQs-ATs, KTs+, QTs+, JTs, T9s, 98s, 87s, AQo
- **Fold · 3.8%**: 44, A6s, K9s, Q9s, J9s, 65s, ATo, KJo

### I opened, got 3-bet · LJ vs SB
- **4-bet for value · 3.0%**: JJ+, AKs, AKo
- **4-bet as a bluff · 4.2%**: A9s-A2s, ATo, KJo
- **Call · 9.7%**: TT-55, AQs-ATs, KTs+, QTs+, J9s+, T9s, 98s, 87s, 76s, AQo-AJo, KQo
- **Fold · 1.4%**: 44, K9s, Q9s, 65s

### I opened, got 3-bet · LJ vs BB
- **4-bet for value · 3.0%**: JJ+, AKs, AKo
- **4-bet as a bluff · 4.2%**: A9s-A2s, AJo, KQo
- **Call · 8.0%**: TT-44, AQs-ATs, KTs+, QTs+, JTs, T9s, 98s, 87s, 76s, AQo
- **Fold · 3.0%**: K9s, Q9s, J9s, 65s, ATo, KJo

### I opened, got 3-bet · HJ vs CO
- **4-bet for value · 3.0%**: JJ+, AKs, AKo
- **4-bet as a bluff · 4.5%**: A9s-A2s, 76s, ATo, KJo
- **Call · 10.0%**: TT-55, AQs-ATs, K9s+, Q9s+, J9s+, T9s, 98s, 87s, AQo-AJo, KQo
- **Fold · 3.8%**: 44-22, K8s, T8s, 97s, 65s, 54s, QJo

### I opened, got 3-bet · HJ vs BTN
- **4-bet for value · 3.0%**: JJ+, AKs, AKo
- **4-bet as a bluff · 5.1%**: A9s-A2s, 76s, 65s, 54s, ATo, KJo
- **Call · 10.4%**: TT-44, AQs-ATs, K9s+, Q9s+, J9s+, T9s, 98s, 87s, AQo-AJo, KQo
- **Fold · 2.7%**: 33-22, K8s, T8s, 97s, QJo

### I opened, got 3-bet · HJ vs SB
- **4-bet for value · 3.0%**: JJ+, AKs, AKo
- **4-bet as a bluff · 4.2%**: A9s-A2s, ATo, KJo
- **Call · 10.7%**: TT-44, AQs-ATs, K9s+, Q9s+, J9s+, T9s, 98s, 87s, 76s, AQo-AJo, KQo
- **Fold · 3.3%**: 33-22, K8s, T8s, 97s, 65s, 54s, QJo

### I opened, got 3-bet · HJ vs BB
- **4-bet for value · 3.0%**: JJ+, AKs, AKo
- **4-bet as a bluff · 4.2%**: A9s-A2s, AJo, KQo
- **Call · 8.0%**: TT-44, AQs-ATs, KTs+, QTs+, JTs, T9s, 98s, 87s, 76s, AQo
- **Fold · 6.0%**: 33-22, K9s-K8s, Q9s, J9s, T8s, 97s, 65s, 54s, ATo, KJo, QJo

### I opened, got 3-bet · CO vs BTN/SB
- **4-bet for value · 3.5%**: TT+, AKs, AKo
- **4-bet as a bluff · 4.8%**: A8s-A6s, A4s-A2s, 97s, 86s, 75s, 54s, ATo, KJo
- **Call · 11.5%**: 99-44, AQs-A9s, A5s, K9s+, Q9s+, J9s+, T8s+, 98s, 87s, 76s, 65s, AQo-AJo, KQo
- **Fold · 7.2%**: 33-22, K8s-K7s, Q8s, J8s, 64s, 43s, A9o, KTo, QTo+, JTo

### I opened, got 3-bet · CO vs BB
- **4-bet for value · 3.5%**: TT+, AKs, AKo
- **4-bet as a bluff · 4.2%**: A8s, A4s-A2s, T8s, 97s, 65s, 54s, ATo, KJo
- **Call · 10.9%**: 99-44, AQs-A9s, A5s, K9s+, Q9s+, J9s+, T9s, 98s, 87s, 76s, AQo-AJo, KQo
- **Fold · 8.4%**: 33-22, A7s-A6s, K8s-K7s, Q8s, J8s, 86s, 75s, 64s, 43s, A9o, KTo, QTo+, JTo

### I opened, got 3-bet · BTN vs SB/BB
- **4-bet for value · 5.4%**: 99+, AJs+, AQo+
- **4-bet as a bluff · 9.4%**: K6s-K4s, Q7s, J7s, 86s, 75s, 64s, 54s, 43s, A8o, A5o-A3o, K9o, QTo, JTo
- **Call · 18.6%**: 88-22, ATs-A2s, K7s+, Q8s+, J8s+, T7s+, 97s+, 87s, 76s, 65s, AJo-A9o, KTo+, QJo
- **Fold · 17.8%**: K3s-K2s, Q6s-Q2s, J6s, T6s, 96s, 85s, 74s, 53s, 32s, A7o-A6o, A2o, K8o-K7o, Q9o-Q8o, J9o-J8o, T8o+, 97o+, 87o, 76o

### I opened, got 3-bet · SB vs BB
- **4-bet for value · 2.7%**: QQ-JJ, AJs+, AQo
- **4-bet as a bluff · 3.9%**: J4s, K3o-K2o, Q5o-Q4o
- **Call · 7.4%**: TT-88, ATs, KJs+, QJs, 95s, 85s, 74s, 43s, AJo-ATo, KJo+
- **Fold · 7.8%**: J3s-J2s, T5s-T4s, 94s, 84s, 63s, 53s, Q3o-Q2o, J6o, T6o, 96o, 86o

### SB limped, BB raised
- **3-bet for value · 1.8%**: KK+, AKo
- **3-bet as a bluff · 4.5%**: A3o-A2o, K6o-K5o, Q7o
- **Call · 37.7%**: 77-22, A9s-A2s, KTs-K2s, QTs-Q2s, J5s+, T6s+, 96s+, 86s+, 75s+, 64s+, 54s, 32s, A9o-A4o, KTo-K7o, Q8o+, J8o+, T8o+, 97o+, 87o, 76o
- **Fold · 4.5%**: K4o, Q6o, J7o, T7o, 65o


# Range Guide: $1/$3 NLH, 9-max

These are the charts the trainer grades you against. The **Original (exploitative)** set is locked; make your own sets from it in the game's **Ranges** tab (see below).

## Where they come from

- **Original set:** the [PokerCoaching.com full preflop charts](https://poker-coaching.s3.amazonaws.com/tools/preflop-charts/full-preflop-charts.pdf) (100bb), copied cell by cell and checked against the PDF. They cover unopened-pot opens, facing a raise, opened and got 3-bet, SB vs BB, and SB limp vs BB raise.
- **Limpers in front:** the PDF has no limped-pot charts, so these are a disciplined live 1/3 default: iso-raise hands that win heads-up, overlimp hands that want a cheap multiway flop, fold the rest. The big blind never folds to limps; it checks.
- **Open + callers and I 3-bet, got 4-bet:** also not in the PDF. These are trainer defaults, described below.

## Chart sets

- Make as many sets as you like, each starting from the Original or from another set (for example a loose *Fish table* and a tight *Shark table*).
- A set stores only the charts you changed. Every other chart is the Original.
- The set you pick at the top of the Play tab is what gets graded. The chart guide page opens on it too.
- Any hand you paint in a set is graded exactly as you set it.
- Sets are saved in your browser. Use **Copy my chart sets** and **Load sets from box** to move them to another browser. A Firebase sign-in that syncs them across devices is planned.

Spots also follow your own ranges:
- "I opened, got 3-bet" deals from your opening range for that seat.
- "SB limp, BB raises" deals from your SB limp range.
- "I 3-bet, got 4-bet" deals from your 3-bet range.

If you add a hand to your open that a 3-bet chart doesn't cover, it's graded as a fold there until you paint it.

## Multiway and 4-bet spots

- **Open + callers (squeeze):** built from your facing-a-raise chart for the same seats.
  - Value 3-bets become value squeezes.
  - Pairs and suited hands, including the chart's suited 3-bet bluffs, call for the dead money, since callers rarely fold to a bluff.
  - Offsuit hands fold, except AQo and AK.
  - Squeeze size: 3× the open in position (4× out of position), plus 1× for each caller.
- **I 3-bet, got 4-bet:** a live $1/$3 4-bet is almost always KK+ or AK, and with $300 stacks you either get it all in or fold.
  - Default: jam QQ+ and AK; fold everything else.
  - Hands are dealt from your 3-bet range in the facing-a-raise chart.

## How to read the notation

- `66+` = 66, 77, … AA
- `A9s+` = A9s, ATs, … AKs (suited)
- `K8s-K6s` = K8s, K7s, K6s
- `AQo+` = AQo, AKo (offsuit)
- Percentages are the share of all 1,326 starting hands.

## Sizing (live $1/$3)

- Open to $12–15 (4–5bb).
- Isolate limpers to $15 + $5 per limper, plus $5 more out of position.
- 3-bet to 3x the open in position, 4x out of position.
- Squeeze the same as a 3-bet, plus 1× the open for each caller.
- 4-bet to 2.25x the 3-bet in position, 2.5x out of position.
- After a 4-bet, a 5-bet is all-in ($300).
- From the SB after the BB raises your limp, 3-bet to 4×.
- 3-bet, squeeze and 4-bet sizes are rounded to the nearest $5.

## All original charts

### Unopened · UTG open
- **Raise · 10.1%**: 66+, A9s+, A5s, KTs+, QTs+, JTs, T9s, 98s, AQo+

### Unopened · UTG+1 open
- **Raise · 14.3%**: 66+, A4s+, K9s+, Q9s+, J9s+, T9s, 98s, 87s, AJo+, KQo

### Unopened · UTG+2 open
- **Raise · 15.7%**: 55+, A2s+, K9s+, Q9s+, J9s+, T9s, 98s, 87s, 76s, AJo+, KQo

### Unopened · LJ open
- **Raise · 18.3%**: 44+, A2s+, K9s+, Q9s+, J9s+, T9s, 98s, 87s, 76s, 65s, ATo+, KJo+

### Unopened · HJ open
- **Raise · 21.3%**: 22+, A2s+, K8s+, Q9s+, J9s+, T8s+, 97s+, 87s, 76s, 65s, 54s, ATo+, KJo+, QJo

### Unopened · CO open
- **Raise · 27.0%**: 22+, A2s+, K7s+, Q8s+, J8s+, T8s+, 97s+, 86s+, 75s+, 64s+, 54s, 43s, A9o+, KTo+, QTo+, JTo

### Unopened · BTN open
- **Raise · 51.1%**: 22+, A2s+, K2s+, Q2s+, J6s+, T6s+, 96s+, 85s+, 74s+, 64s+, 53s+, 43s, 32s, A2o+, K7o+, Q8o+, J8o+, T8o+, 97o+, 87o, 76o

### Unopened · SB (vs BB)
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

### Facing a raise · SB vs BTN
- **3-bet for value · 7.7%**: TT+, ATs+, KJs+, AJo+, KQo
- **3-bet as a bluff · 13.6%**: 99-22, A9s-A2s, KTs-K9s, Q9s+, J9s+, T8s+, 97s+, 86s+, 76s, 65s, 54s, ATo, KJo, QJo

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

### Open + callers · UTG+1 vs UTG
- **Squeeze for value · 2.6%**: QQ+, AKs, AKo
- **Call · 6.6%**: JJ-22, AQs-ATs, KJs+, QJs, JTs

### Open + callers · UTG+2 vs UTG/UTG+1
- **Squeeze for value · 2.6%**: QQ+, AKs, AKo
- **Call · 6.6%**: JJ-22, AQs-ATs, KJs+, QJs, JTs

### Open + callers · LJ vs UTG/UTG+1
- **Squeeze for value · 2.6%**: QQ+, AKs, AKo
- **Call · 7.2%**: JJ-22, AQs-ATs, A5s, KJs+, QJs, JTs, T9s

### Open + callers · LJ vs UTG+2
- **Squeeze for value · 2.6%**: QQ+, AKs, AKo
- **Call · 7.8%**: JJ-22, AQs-ATs, A5s, KJs+, QJs, JTs, T9s, 98s, 87s

### Open + callers · HJ vs UTG
- **Squeeze for value · 2.6%**: QQ+, AKs, AKo
- **Call · 7.2%**: JJ-22, AQs-ATs, A5s, KJs+, QJs, JTs, T9s

### Open + callers · HJ vs UTG+1
- **Squeeze for value · 2.6%**: QQ+, AKs, AKo
- **Call · 7.5%**: JJ-22, AQs-ATs, A5s, KJs+, QJs, JTs, T9s, 98s

### Open + callers · HJ vs UTG+2
- **Squeeze for value · 2.6%**: QQ+, AKs, AKo
- **Call · 8.7%**: JJ-22, AQs-ATs, A5s-A3s, KJs+, QJs, JTs, T9s, 98s, 87s, 76s

### Open + callers · HJ vs LJ
- **Squeeze for value · 4.4%**: QQ+, AJs+, KQs, AQo+
- **Call · 9.0%**: JJ-22, ATs, A5s-A2s, KJs-KTs, QTs+, JTs, T9s, 98s, 87s, 76s, 65s

### Open + callers · CO vs UTG/UTG+1
- **Squeeze for value · 2.9%**: QQ+, AQs+, AKo
- **Call · 8.1%**: JJ-22, AJs-ATs, A5s-A4s, KTs+, QTs+, JTs, T9s, 98s

### Open + callers · CO vs UTG+2
- **Squeeze for value · 2.9%**: QQ+, AQs+, AKo
- **Call · 9.4%**: JJ-22, AJs-ATs, A5s-A2s, KTs+, QTs+, JTs, T9s, 98s, 87s, 76s

### Open + callers · CO vs LJ
- **Squeeze for value · 4.4%**: QQ+, AJs+, KQs, AQo+
- **Call · 9.4%**: JJ-22, ATs, A5s-A2s, KJs-KTs, QTs+, JTs, T9s, 98s, 87s, 76s, 65s, 54s

### Open + callers · CO vs HJ
- **Squeeze for value · 4.4%**: QQ+, AJs+, KQs, AQo+
- **Call · 11.5%**: JJ-22, ATs-A2s, KJs-K9s, Q9s+, J9s+, T9s, 98s, 87s, 76s, 65s, 54s

### Open + callers · BTN vs UTG
- **Squeeze for value · 2.6%**: QQ+, AKs, AKo
- **Call · 9.0%**: JJ-22, AQs-ATs, A5s-A4s, KTs+, QTs+, JTs, T9s, 98s, 87s, 76s

### Open + callers · BTN vs UTG+1
- **Squeeze for value · 2.6%**: QQ+, AKs, AKo
- **Call · 10.0%**: JJ-22, AQs-ATs, A5s-A2s, KTs+, QTs+, J9s+, T9s, 98s, 87s, 76s

### Open + callers · BTN vs UTG+2
- **Squeeze for value · 3.8%**: QQ+, AQs+, AQo+
- **Call · 10.6%**: JJ-22, AJs-A9s, A5s-A2s, KTs+, QTs+, J9s+, T9s, 98s, 87s, 76s, 65s, 54s

### Open + callers · BTN vs LJ
- **Squeeze for value · 3.8%**: QQ+, AQs+, AQo+
- **Call · 11.5%**: JJ-22, AJs-A2s, KTs+, QTs+, J9s+, T9s, 98s, 87s, 76s, 65s, 54s

### Open + callers · BTN vs HJ
- **Squeeze for value · 4.1%**: QQ+, AJs+, AQo+
- **Call · 13.0%**: JJ-22, ATs-A2s, K9s+, Q9s+, J9s+, T8s+, 97s+, 86s+, 75s+, 65s, 54s

### Open + callers · BTN vs CO
- **Squeeze for value · 4.1%**: QQ+, AJs+, AQo+
- **Call · 14.5%**: JJ-22, ATs-A2s, K8s+, Q8s+, J8s+, T8s+, 97s+, 86s+, 75s+, 64s+, 54s, 43s

### Open + callers · SB vs UTG/UTG+1
- **Squeeze for value · 1.7%**: QQ+, AKs
- **Call · 9.7%**: JJ-22, AQs-ATs, A5s, KJs+, QJs, JTs, T9s, 98s, 87s, AQo+

### Open + callers · SB vs UTG+2
- **Squeeze for value · 1.7%**: QQ+, AKs
- **Call · 10.6%**: JJ-22, AQs-ATs, A5s, KTs+, QTs+, JTs, T9s, 98s, 87s, 76s, AQo+

### Open + callers · SB vs LJ
- **Squeeze for value · 2.9%**: QQ+, AQs+, AKo
- **Call · 9.7%**: JJ-22, AJs-ATs, A5s-A4s, KTs+, QTs+, JTs, T9s, 98s, 87s, 76s, AQo

### Open + callers · SB vs HJ
- **Squeeze for value · 2.9%**: QQ+, AQs+, AKo
- **Call · 10.9%**: JJ-22, AJs-A9s, A5s-A3s, KTs+, QTs+, JTs, T9s, 98s, 87s, 76s, 65s, 54s, AQo

### Open + callers · SB vs CO
- **Squeeze for value · 5.6%**: TT+, ATs+, KQs, AQo+
- **Call · 10.3%**: 99-22, A9s-A2s, KJs-K9s, Q9s+, J9s+, T9s, 98s, 87s, 76s, 65s, 54s

### Open + callers · SB vs BTN
- **Squeeze for value · 7.7%**: TT+, ATs+, KJs+, AJo+, KQo
- **Call · 10.9%**: 99-22, A9s-A2s, KTs-K9s, Q9s+, J9s+, T8s+, 97s+, 86s+, 76s, 65s, 54s

### Open + callers · BB vs UTG/UTG+1
- **Squeeze for value · 2.0%**: QQ+, AQs+
- **Call · 18.7%**: JJ-22, AJs-A2s, K5s+, Q7s+, J7s+, T7s+, 96s+, 86s+, 75s+, 64s+, 54s, 43s, AQo+

### Open + callers · BB vs UTG+2
- **Squeeze for value · 3.3%**: JJ+, AQs+, AKo
- **Call · 19.5%**: TT-22, AJs-A2s, K4s+, Q6s+, J6s+, T6s+, 96s+, 85s+, 74s+, 64s+, 53s+, 43s, AQo

### Open + callers · BB vs LJ
- **Squeeze for value · 4.4%**: TT+, AJs+, KQs, AKo
- **Call · 20.5%**: 99-22, ATs-A2s, KJs-K2s, Q4s+, J5s+, T5s+, 95s+, 85s+, 74s+, 64s+, 53s+, 43s, AQo

### Open + callers · BB vs HJ
- **Squeeze for value · 5.3%**: TT+, AJs+, KQs, AQo+
- **Call · 20.2%**: 99-22, ATs-A2s, KJs-K2s, Q4s+, J5s+, T5s+, 95s+, 85s+, 74s+, 63s+, 53s+, 43s, 32s

### Open + callers · BB vs CO
- **Squeeze for value · 8.0%**: TT+, ATs+, KJs+, QJs, AJo+, KQo
- **Call · 21.4%**: 99-22, A9s-A2s, KTs-K2s, QTs-Q4s, J4s+, T4s+, 94s+, 84s+, 73s+, 63s+, 52s+, 42s+, 32s

### Open + callers · BB vs BTN
- **Squeeze for value · 9.4%**: 99+, ATs+, KTs+, QTs+, JTs, AJo+, KQo
- **Call · 23.7%**: 88-22, A9s-A2s, K9s-K2s, Q9s-Q2s, J9s-J2s, T2s+, 92s+, 82s+, 72s+, 62s+, 52s+, 42s+, 32s

### Open + callers · BB vs SB
- **Squeeze for value · 9.4%**: 99+, ATs+, KTs+, QTs+, JTs, AJo+, KQo
- **Call · 23.7%**: 88-22, A9s-A2s, K9s-K2s, Q9s-Q2s, J9s-J2s, T2s+, 92s+, 82s+, 72s+, 62s+, 52s+, 42s+, 32s

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

### I 3-bet, got 4-bet · in position
- **5-bet all-in · 2.6%**: QQ+, AKs, AKo

### I 3-bet, got 4-bet · out of position
- **5-bet all-in · 2.6%**: QQ+, AKs, AKo

### SB limped, BB raised
- **3-bet for value · 1.8%**: KK+, AKo
- **3-bet as a bluff · 4.5%**: A3o-A2o, K6o-K5o, Q7o
- **Call · 37.7%**: 77-22, A9s-A2s, KTs-K2s, QTs-Q2s, J5s+, T6s+, 96s+, 86s+, 75s+, 64s+, 54s, 32s, A9o-A4o, KTo-K7o, Q8o+, J8o+, T8o+, 97o+, 87o, 76o
- **Fold · 4.5%**: K4o, Q6o, J7o, T7o, 65o

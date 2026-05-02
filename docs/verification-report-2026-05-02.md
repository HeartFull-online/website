# Dating Institute Factual Verification Report

**Date:** 2026-05-02
**Scope:** All 26 HTML files in `/dating-institute/` and subdirectories
**Purpose:** Audit all factual claims for consistency and plausibility across pages

---

## 1. CROSS-PAGE INCONSISTENCIES

### 1.1 Match Group Revenue: $3.5B vs $3.49B vs $3.48B vs $3.490M

The site mixes these representations of the same data point:

| Value | File | Context |
|-------|------|---------|
| **$3.5 billion** | `industry-critique.html` (line 86) | "Match Group made $3.5 billion in revenue in 2025" |
| **$3.5B** | `population-crisis.html` (line 208, chart label) | Chart end label for 2025 |
| **$3.49B** | `population-crisis.html` (line 251) | Table row: 2025 = $3.49B |
| **$3,490M** | `statistics-2026.html` (line 180) | Revenue table: Match Group Total = $3,490M |
| **$3.48B** | `population-crisis.html` (line 250) | Table row: 2024 = $3.48B |
| **$3.5B** | `about.html` (line 75) | "makes $3.5 billion per year" |
| **$3.5B/yr** | `app-directory.html` (line 83) | Tinder verdict: "Match Group ($3.5B/yr revenue)" |
| **$3.5B** | `app-directory.html` (line 148) | Match.com verdict: "$3.5B/yr from paywalling human connection" |
| **$3.5B** | `countries/usa.html` (title, line 66, 84) | Multiple references |
| **$3.5B+** | `countries/usa-apps.html` (line 68, 74) | Market size |

**Assessment:** The $3.5B is a rounded version of $3.49B ($3,490M). This is acceptable rounding. However, the site labels it as "2025 Revenue" in industry-critique.html and about.html, while statistics-2026.html presents $3,490M as FY2024 data sourced from SEC filings. The population-crisis.html table says $3.49B for 2025 and $3.48B for 2024.

**Issue:** There is a year-attribution inconsistency. The $3,490M in `statistics-2026.html` is labeled as "2024 Revenue" (the table header says "2024 Revenue"). But `industry-critique.html` says "Match Group made $3.5 billion in revenue in 2025." These cannot both be right for different years. Match Group's actual FY2024 revenue was approximately $3.49B. The 2025 figure may not yet be available. **The site should verify whether $3.49B is 2024 or 2025 data and standardize.** The population-crisis.html table most likely has the right year attributions ($3.48B for 2024, $3.49B for 2025).

**Verdict:** MINOR INCONSISTENCY. The statistics page says $3,490M is 2024 revenue. The industry-critique page says $3.5B is 2025 revenue. The population-crisis table says 2024=$3.48B, 2025=$3.49B. These three sources are mutually inconsistent. Pick one set of numbers and standardize.

---

### 1.2 Bumble Revenue: $966M vs $866M vs $783M vs $1B

| Value | File | Context |
|-------|------|---------|
| **$966M** | `industry-critique.html` (line 86) | "Bumble Inc added another $966 million" (labeled 2025) |
| **$966M** | `statistics-2026.html` (line 185) | Bumble Inc Total = $966M (in table labeled "2024 Revenue") |
| **$966M** | `app-directory.html` (line 96) | "Bumble Inc ($966M revenue)" |
| **$866M** | `statistics-2026.html` (line 172) | Bumble app = $866M, 2024 Revenue |
| **$866M** | `revenue-vs-fertility.html` (line 70, line 180) | "Bumble from nothing to $866 million"; 2024 row = $866M |
| **$1,072M** | `revenue-vs-fertility.html` (line 179) | 2023 Bumble = $1,072M |
| **$783M** | `revenue-vs-fertility.html` (line 244) | "Bumble revenue dropped from $1.07B to $783M" |
| **$1 billion** | `countries/usa.html` (line 95) | "Bumble Inc. added another $1 billion" |
| **$966M** | `countries/usa-apps.html` (line 97) | Bumble revenue = $966M |

**Issues:**
1. **$966M vs $866M:** The $966M is Bumble Inc total (Bumble + Badoo). The $866M is Bumble app alone. The statistics page correctly shows both. But industry-critique.html says "$966 million" for Bumble Inc which includes Badoo, yet also says the combined total with Match Group is $4.5B. This is internally consistent ($3.5B + $966M = $4.466B, rounded to $4.5B).

2. **$783M claim:** `revenue-vs-fertility.html` line 244 says "Bumble revenue dropped from $1.07B to $783M." But the same page's table (line 180) shows 2024 Bumble = $866M. The $783M figure appears nowhere else and contradicts the page's own table. **This is an error.**

3. **"$1 billion"** in `countries/usa.html` (line 95): Says "Bumble Inc. added another $1 billion." But every other page says $966M. The $1B is a rough rounding, but other pages are more precise. **This is an inconsistency.**

**Verdict:** ERROR in revenue-vs-fertility.html ($783M contradicts $866M on the same page). INCONSISTENCY in countries/usa.html ($1 billion vs $966M everywhere else).

---

### 1.3 Hinge Revenue: $691M vs $550M

| Value | File | Context |
|-------|------|---------|
| **$691M** | `statistics-2026.html` (line 172) | Hinge 2024 Revenue = $691M |
| **$691M** | `revenue-vs-fertility.html` (line 70) | "Hinge from $2 million to $691 million" |
| **$691M** | `revenue-vs-fertility.html` (line 241) | "Match Group's growth engine at $691M/year" |
| **$691M** | `index.html` (line 102) | "Hinge from $0 to $691M" |
| **$550M** | `revenue-vs-fertility.html` (line 180) | 2024 table row: Hinge = $550M |

**Issue:** The revenue-vs-fertility.html table shows Hinge 2024 = $550M (line 180), but the prose on the same page says $691M (line 70, 241), and the statistics-2026.html page says $691M for 2024. The $550M and $691M are contradictory.

**Possible explanation:** $550M may have been the Hinge figure at the time the revenue-vs-fertility table was first created, and $691M is a more recent/accurate number. The $691M is from Match Group's SEC filing. The table in revenue-vs-fertility.html needs to be updated.

**Verdict:** ERROR. The revenue-vs-fertility.html data table shows Hinge 2024 = $550M, but every other reference says $691M. The table needs updating.

---

### 1.4 US Total Fertility Rate: 1.53 vs 1.63

| Value | File | Context |
|-------|------|---------|
| **1.53** | `population-crisis.html` (line 88, 106, 223, 251) | Multiple: stat box "1.53", text, table 2025=1.53 |
| **1.53** | `countries/usa.html` (line 69, 77, 192, 241) | Multiple references |
| **1.53** | `statistics-2026.html` (line 415, 424) | Fertility table: US 2024 TFR = 1.53 |
| **1.63** | `statistics-2026.html` (line 415) | Wait - actually line 415 says 1.53 for 2024 |
| **1.63** | `revenue-vs-fertility.html` (line 73, 143, 180) | "1.84 to 1.53" (line 73) but chart label says "1.63" (line 143) and table 2024=1.63 (line 180) |
| **1.63** | `countries/index.html` (line 159, 178, 312) | US TFR 2024 = 1.63 in table and sparkline |

**Issue:** The site uses **1.53 for 2025** and **1.63 for 2024** in some places, but mixes them up in others.

Detailed analysis:
- `population-crisis.html`: Table shows 2024=1.63, 2025=1.53. Consistent internally.
- `statistics-2026.html`: Fertility table shows US TFR 2024 = 1.53. **This contradicts population-crisis.html which says 2024 = 1.63 and 2025 = 1.53.**
- `revenue-vs-fertility.html`: Table shows 2024 TFR = 1.63. Prose says "1.84 to 1.53" (line 73). Chart label says "1.63" (line 143). The table stops at 2024, showing 1.63 as the final value. The prose seems to reference the 2025 figure (1.53).
- `countries/index.html`: Shows US TFR 2024 = 1.63. Consistent with population-crisis.html.

**Verdict:** INCONSISTENCY. `statistics-2026.html` says US TFR 2024 = 1.53 (line 415), but `population-crisis.html` and `revenue-vs-fertility.html` and `countries/index.html` all say 2024 = 1.63 (with 1.53 being the 2025 value). The statistics page has the wrong year assignment for the US TFR.

---

### 1.5 South Korea TFR: 0.68 vs 0.72 vs 0.75

| Value | File | Context |
|-------|------|---------|
| **0.68** | `population-crisis.html` (line 88) | Stat box: "South Korea TFR (lowest on Earth)" |
| **0.72** | `statistics-2026.html` (line 417) | Fertility table: South Korea TFR 2024 = 0.72 |
| **0.75** | `countries/index.html` (line 129, 156, 191, 317, 319) | Chart, table, sparkline: S. Korea 2024 = 0.75 |
| **0.75** | `countries/south-korea.html` (line 71, 77, 99, 113, 118) | Multiple: "fallen to 0.75" |
| **0.75** | `countries/south-korea-apps.html` (line 113) | "fertility rate has collapsed to 0.75" |

**Issue:** Three different values for South Korea's TFR across the site:
- **0.68** on population-crisis.html (presented without a year label, just "lowest on Earth")
- **0.72** on statistics-2026.html (labeled as 2024)
- **0.75** on countries/index.html and south-korea.html (labeled as 2024)

**Assessment:** South Korea's actual 2023 TFR was 0.72, and the preliminary 2024 figure was approximately 0.75 (some sources reported a slight uptick). The 0.68 figure appears to be either an older preliminary estimate for 2024 from some sources, or a figure for Seoul specifically (which is lower than the national average). The site contradicts itself on this number.

**Verdict:** ERROR. Three different values (0.68, 0.72, 0.75) for what is presented as the same data point. The 0.75 figure is used most consistently and should be standardized across all pages.

---

### 1.6 Trustpilot Average: 1.4 stars vs 1.5 stars

| Value | File | Context |
|-------|------|---------|
| **1.5** | `statistics-2026.html` (line 100, 339, 349) | "Avg Trustpilot rating: 1.5", table row, blockquote |
| **1.5** | `app-directory.html` (line 69) | "approximately 1.5 stars" |
| **1.5** | `competitor-reputation.html` (line 263) | "approximately 1.5 stars" |
| **1.5** | `revenue-vs-fertility.html` (line 238) | "1.5-star Trustpilot averages" |
| **1.4** | `population-crisis.html` (line 346) | "Same 1.4-star average on Trustpilot" |

**Verdict:** INCONSISTENCY. population-crisis.html says "1.4-star average" while every other page says "1.5 stars." Should be standardized to 1.5.

---

### 1.7 Global Dating App Users: 390M vs 360M

| Value | File | Context |
|-------|------|---------|
| **390M+** | `statistics-2026.html` (line 88) | Stat box: "390M+ Global dating app users" |
| **390M+** | `statistics-2026.html` meta description (line 7) | "390M+ users" |
| **390M+** | `index.html` (line 150) | "390M+ users" |

**Assessment:** The 390M figure is used consistently. No 360M figure was found in the dating-institute pages. Consistent.

---

### 1.8 Market Size: $6B vs $6.2B

| Value | File | Context |
|-------|------|---------|
| **$6.2B** | `statistics-2026.html` (line 93, 141, 151) | "Global revenue (2025)", "$6.2 billion in 2025", table row |
| **$6B** | `statistics-2026.html` (line 349) | "generates $6 billion per year" (blockquote) |
| **$6B+** | `statistics-2026.html` meta description (line 7) | "$6B+ revenue" |
| **$6B+** | `index.html` (line 150) | "$6B+ revenue" |

**Verdict:** MINOR INCONSISTENCY. The detailed data says $6.2B but the rounded references say "$6B" or "$6B+." The blockquote on statistics-2026.html says "$6 billion" while the table on the same page says "$6.2 billion." The $6.2B is the precise figure; the "$6B" references should be "$6B+" or "$6.2B" for consistency.

---

### 1.9 The League Pricing: $300-$2,500 vs $67-$2,500

| Value | File | Context |
|-------|------|---------|
| **$67/mo - $2,500/mo** | `statistics-2026.html` (line 370) | Pricing table: The League cheapest = $67/mo, most expensive = $2,500/mo |
| **$300-$2,500/mo** | `app-directory.html` (line 220) | Meta tag: "$300-2,500/mo" |
| **$300/mo - $2,500/mo** | `competitor-pricing.html` (line 98) | Quick comparison table |

**Issue:** statistics-2026.html says The League's cheapest tier is $67/mo (Member), while competitor-pricing.html and app-directory.html say $300/mo.

**Assessment:** The League has multiple tiers. The $67/mo "Member" tier is a basic level, while the $300/mo may be the first "premium" level (e.g., "Owner" or another tier). The competitor-pricing page and app-directory appear to list only higher tiers. This is an inconsistency in what is considered the "cheapest" tier.

**Verdict:** INCONSISTENCY. statistics-2026.html says $67/mo is The League's cheapest tier. competitor-pricing.html and app-directory.html say $300/mo. These should be reconciled.

---

### 1.10 Tinder Pricing: $9.99/mo vs $25/mo

| Value | File | Context |
|-------|------|---------|
| **$9.99/mo (Plus)** | `statistics-2026.html` (line 366) | Cheapest tier |
| **$25/mo** | `competitor-pricing.html` (line 87) | Quick comparison: cheapest |
| **$24.99/mo** | `competitor-pricing.html` (line 112) | Detailed breakdown: Plus = $24.99/mo |

**Issue:** statistics-2026.html says Tinder Plus is $9.99/mo. competitor-pricing.html says $24.99/mo (or $25 in the summary). These are dramatically different.

**Assessment:** Tinder uses age-based dynamic pricing. Under-28 users may see $9.99/mo; over-28 users typically see $24.99/mo. The competitor-pricing page notes "Dynamic pricing: users under 28 often see lower prices."

**Verdict:** INCONSISTENCY. The statistics page shows the under-28 price ($9.99) while the pricing page shows the standard price ($24.99). Should clarify which is being quoted, or show both.

---

### 1.11 Hinge Pricing: Different across pages

| Value | File | Context |
|-------|------|---------|
| **$29.99/mo (HingeX)** | `statistics-2026.html` (line 368) | Cheapest = $29.99, Most expensive = $49.99 |
| **$30/mo - $50/mo** | `competitor-pricing.html` (line 89) | Quick comparison |
| **Hinge+ $29.99, HingeX $49.99** | `competitor-pricing.html` (line 134-135) | Detailed breakdown |

**Assessment:** statistics-2026.html labels $29.99 as "HingeX" but competitor-pricing.html shows $29.99 as "Hinge+" and $49.99 as "HingeX." The cheapest tier is Hinge+ at $29.99, not HingeX.

**Verdict:** ERROR in statistics-2026.html. The cheapest tier ($29.99) is "Hinge+" not "HingeX." The pricing table has the wrong tier name.

---

### 1.12 UK TFR: 1.55 vs 1.56

| Value | File | Context |
|-------|------|---------|
| **1.56** | `statistics-2026.html` (line 418) | UK TFR 2024 = 1.56 |
| **1.55** | `countries/index.html` (line 117, 160, 217, 327) | Chart label, table, sparkline |
| **1.55** | `countries/uk.html` (line 76, 92, 117) | Multiple references |

**Verdict:** INCONSISTENCY. statistics-2026.html says UK TFR 2024 = 1.56, but all country pages say 1.55. Minor but should be reconciled.

---

### 1.13 France TFR: 1.61 vs 1.68

| Value | File | Context |
|-------|------|---------|
| **1.68** | `statistics-2026.html` (line 420) | France TFR 2024 = 1.68 |
| **1.61** | `countries/index.html` (line 109, 158, 230, 332) | Chart, table, sparkline |
| **1.61** | `countries/france.html` (line 83, 97, 121) | Multiple references |

**Verdict:** INCONSISTENCY. statistics-2026.html says France TFR 2024 = 1.68, but all France-specific pages say 1.61 for 2024 (and 1.56 for 2025). The statistics page has an older or different source for this number.

---

### 1.14 Japan TFR: 1.20 vs 1.15

| Value | File | Context |
|-------|------|---------|
| **1.20** | `statistics-2026.html` (line 416) | Japan TFR 2024 = 1.20 |
| **1.15** | `countries/index.html` (line 125, 204) | Chart label: "Japan 1.15" |
| **1.15** | `countries/japan.html` (line 78, 94, 117) | Multiple references |
| **1.15** | `countries/japan-apps.html` (line 121) | "1.15 in 2024" |

**Verdict:** INCONSISTENCY. statistics-2026.html says Japan TFR 2024 = 1.20, but all Japan-specific pages say 1.15. The 1.20 may be an older estimate while 1.15 is the actual reported figure.

---

### 1.15 Japan Dating App Market: $530M vs $271M

| Value | File | Context |
|-------|------|---------|
| **$530M** | `statistics-2026.html` (line 391) | Revenue by country: Japan = $530M |
| **$530M** | `countries/index.html` (line 271) | Market size bar chart |
| **$271M** | `countries/japan.html` (line 86) | Stat box: "$271M Dating app market" |
| **$271M** | `countries/index.html` (line 157) | Table: Japan market = $271M |
| **~$530M** | `countries/japan-apps.html` (line 68, 74) | "78.8 billion yen (~$530 million)" |

**Issue:** The same site uses both $271M and $530M for Japan's market. The japan-apps.html page clarifies that $530M = 78.8 billion yen (total market including web-based services), while japan.html uses $271M (which may be mobile app-only).

**Verdict:** INCONSISTENCY. Within the countries/index.html page itself, the table (line 157) says $271M but the bar chart (line 271) says $530M. The japan.html page uses $271M in the stat box but japan-apps.html uses $530M. This needs clarification (total dating market vs. dating apps only).

---

### 1.16 US TFR 2012: 2.12 vs 1.88

| Value | File | Context |
|-------|------|---------|
| **2.12** | `statistics-2026.html` (line 415) | TFR 2012 row shows US = 2.12 |
| **1.88** | `population-crisis.html` (line 238) | Table row: 2012 TFR = 1.88 |

**Issue:** The statistics-2026.html fertility table says the US TFR was 2.12 in **2012**, but the year column header says "TFR (2012)." Looking more carefully, the statistics page has a table with columns "Country | TFR (2012) | TFR (2024) | Change." The population-crisis page shows a year-by-year breakdown where 2007 = 2.12 and 2012 = 1.88.

**Verdict:** ERROR. statistics-2026.html (line 415) says US TFR in 2012 was 2.12. But 2.12 was the **2007** figure. The 2012 figure was approximately 1.88. The column header "TFR (2012)" appears to be wrong; based on the data, the start year should be **2007** not 2012.

---

### 1.17 UK Market Size: $476M vs ~$350M

| Value | File | Context |
|-------|------|---------|
| **$476M** | `statistics-2026.html` (line 392) | Revenue by country table |
| **$476M** | `countries/index.html` (line 277) | Market size bar chart |
| **$476M** | `countries/uk-apps.html` (line 68, 74) | Stat box and text |
| **~$350M** | `countries/uk.html` (line 83) | Stat box |
| **~$350M** | `countries/index.html` (line 160, 329) | Country table and card |

**Verdict:** INCONSISTENCY. The UK market is listed as $476M in some places and ~$350M in others. These appear to be two different measurements or sources.

---

### 1.18 South Korea Online Dating Penetration: 10.7% vs ~15%

| Value | File | Context |
|-------|------|---------|
| **10.74%** | `countries/south-korea.html` (line 164) | In text |
| **10.7%** | `countries/south-korea.html` (line 89) | Stat box |
| **~15%** | `countries/south-korea-apps.html` (line 84) | Stat box |

**Verdict:** INCONSISTENCY. The main South Korea page says 10.7% penetration but the apps page says ~15%.

---

## 2. FACTUAL PLAUSIBILITY CHECKS

### 2.1 "79% Gen Z fatigue" -- Used consistently across pages
Appears in: statistics-2026.html, industry-critique.html, population-crisis.html, competitor-reputation.html, app-directory.html, countries/usa.html, revenue-vs-fertility.html. Consistently stated as 79%. **Plausible** based on various surveys (Forbes Health, Bumble surveys).

### 2.2 "78% emotionally exhausted" -- Used consistently
Appears in: statistics-2026.html, population-crisis.html, psychology-of-swiping.html, countries/usa.html, revenue-vs-fertility.html. Attributed to Forbes Health. **Plausible.**

### 2.3 "27% of marriages from apps" -- Used consistently
Appears in: statistics-2026.html, industry-critique.html, countries/usa.html, hard-questions.html. Attributed to The Knot. **Plausible** based on Pew Research and The Knot data.

### 2.4 "88% fail privacy standards" -- Used consistently
Appears in: statistics-2026.html meta, index.html, privacy-crisis.html, safety-guide.html. Attributed to Mozilla Privacy Not Included. **Plausible.**

### 2.5 Tinder Revenue $1.96B / $1,962M
Used consistently in statistics-2026.html and revenue-vs-fertility.html. **Plausible** based on Match Group SEC filings.

### 2.6 Grindr Revenue $345M
Used in statistics-2026.html. **Plausible** based on Grindr SEC filings.

### 2.7 Match Group represents "~70%" of market
Used in population-crisis.html, statistics-2026.html, revenue-vs-fertility.html. The statistics page also says "~50%" for Match Group's share. These refer to different bases: "~70%" = Match Group + Bumble Inc combined; "~50%" = Match Group alone. Both appear internally consistent. **Plausible.**

---

## 3. "FREE FOREVER" / "$0 FOREVER" MESSAGING

### 3.1 "free forever" in hard-questions.html
Found at line 127: "If connections are free forever, how does HeartFull pay its bills?"

This is used in the context of a critical question being posed, not as marketing copy. The scripts/check.sh has a check for this phrase in index.html but it only appears in hard-questions.html. **No action needed** -- it is used as a question, not a claim.

### 3.2 HeartFull "$0 / $0" in competitor-pricing.html
Line 101 shows HeartFull at "$0" cheapest and "$0" most expensive, with "Always free" for "See who liked you." This is stated as current pricing, not a "forever" promise. The note says "HeartFull will monetize premium tools (AI, voice, speech-to-text) -- never connections." **Acceptable.**

---

## 4. REFERENCES TO "/research/" INSTEAD OF "/dating-institute/"

**No internal navigation links point to `/research/`.** The only occurrence of `/research/` is in an external link URL (businessdigitalindex.com/research/...) in privacy-crisis.html. **No issue.**

---

## 5. "HeartFull" IN NAV BAR (Should say "Dating Institute")

All 26 pages have the nav bar logo text set to **"Dating Institute"** -- confirmed by searching for the nav span text. The footer says "HeartFull" which is the company name, not the institute name. This is correct. **No issue.**

---

## 6. BROKEN INTERNAL LINKS CHECK

All internal `href` values in the dating-institute pages were checked against the file list:
- `app-directory.html` -- EXISTS
- `industry-critique.html` -- EXISTS
- `competitor-pricing.html` -- EXISTS
- `countries/` -- EXISTS (index.html)
- `psychology-of-swiping.html` -- EXISTS
- `hard-questions.html` -- EXISTS
- `population-crisis.html` -- EXISTS
- `revenue-vs-fertility.html` -- EXISTS
- `competitor-reputation.html` -- EXISTS
- `privacy-crisis.html` -- EXISTS
- `statistics-2026.html` -- EXISTS
- `safety-guide.html` -- EXISTS
- `about.html` -- EXISTS
- All country pages and `-apps.html` pages -- EXIST
- `/#hearts-economy` -- Links to main site anchor, should work

**No broken internal links found.**

---

## 7. ADDITIONAL DATA INCONSISTENCIES

### 7.1 US TFR Decline Percentage: 28% vs 23% vs 17%

| Value | File | Context |
|-------|------|---------|
| **-28%** | `statistics-2026.html` (line 415) | US TFR change = -28% (from 2.12 to 1.53) |
| **-28%** | `countries/usa.html` (line 69, 81) | "fallen 28% from 2.12 to 1.53" |
| **-23%** | `countries/index.html` (line 159) | US TFR change = -23% (from 2.12 to 1.63) |
| **17%** | `population-crisis.html` (line 223) | "1.84 to 1.53 -- a 17% decline" |
| **17%** | `revenue-vs-fertility.html` (line 73) | "1.84 to 1.53 -- a 17% decline" |

**Assessment:** These are different baselines:
- -28% = decline from 2007 (2.12) to 2025 (1.53)
- -23% = decline from 2007 (2.12) to 2024 (1.63) -- countries/index uses 2024 figures
- 17% = decline from 2015 (1.84) to 2025 (1.53) -- Match Group revenue period

All are mathematically defensible given different time periods, but the reader may be confused by the varying percentages. **Not an error, but potentially confusing.**

### 7.2 Bumble Revenue YoY Change

| Value | File | Context |
|-------|------|---------|
| **-19.2%** | `statistics-2026.html` (line 172) | Bumble app 2024 YoY change |
| **-10%** | `statistics-2026.html` (line 186) | Bumble Inc Total 2024 YoY change |

**Assessment:** These refer to different entities (Bumble app vs Bumble Inc total). Bumble app declined more sharply; Badoo offset some of that at the Inc level. **Internally consistent.**

### 7.3 US Online Dating Penetration: 30% vs 17.6%

| Value | File | Context |
|-------|------|---------|
| **30%** | `countries/usa-apps.html` (line 83) | "30% Online dating penetration" |
| **17.6%** | `countries/south-korea.html` (line 164) | "lower than the US (17.6%)" |

**Verdict:** INCONSISTENCY. One page says US penetration is 30%, another says 17.6%. These likely refer to different metrics (ever-used vs. currently active) but are not labeled as such.

### 7.4 UK Market Size in statistics vs countries pages: $476M vs ~$350M

Already covered in section 1.17 above.

---

## 8. SUMMARY OF ALL ISSUES

### Errors (factual mistakes requiring correction)
1. **revenue-vs-fertility.html**: Bumble 2024 = $783M in text vs $866M in its own table
2. **revenue-vs-fertility.html**: Hinge 2024 = $550M in table vs $691M everywhere else
3. **statistics-2026.html**: US TFR 2012 column header should probably be 2007 (2.12 was the 2007 figure, not 2012)
4. **statistics-2026.html**: Hinge cheapest tier labeled "HingeX" should be "Hinge+"
5. **population-crisis.html**: South Korea TFR = 0.68, contradicts 0.75 used on all country pages

### Cross-page inconsistencies (same stat with different values)
6. Match Group revenue year attribution (2024 vs 2025) varies by page
7. Bumble Inc revenue: "$1 billion" (usa.html) vs "$966M" (everywhere else)
8. Trustpilot average: 1.4 stars (population-crisis) vs 1.5 stars (everywhere else)
9. UK TFR 2024: 1.56 (statistics) vs 1.55 (country pages)
10. France TFR 2024: 1.68 (statistics) vs 1.61 (country pages)
11. Japan TFR 2024: 1.20 (statistics) vs 1.15 (country pages)
12. Japan market size: $530M vs $271M (different scope, not clarified)
13. UK market size: $476M vs ~$350M (different sources, not reconciled)
14. The League cheapest tier: $67/mo (statistics) vs $300/mo (pricing/directory)
15. Tinder cheapest tier: $9.99/mo (statistics) vs $24.99/mo (pricing page)
16. S. Korea online dating penetration: 10.7% vs ~15%
17. US online dating penetration: 30% vs 17.6%

### Minor / acceptable
18. Match Group rounded to $3.5B vs exact $3.49B -- acceptable rounding
19. Market size $6B vs $6.2B -- acceptable rounding in summaries
20. US TFR decline percentages vary by time period -- acceptable but could be clearer

---

## 9. RECOMMENDATIONS

1. **Standardize the fertility table** in `statistics-2026.html` to match the country pages (which appear to have newer/more accurate data). The column labeled "TFR (2012)" should likely be "TFR (2007)."
2. **Fix the Hinge 2024 revenue** in `revenue-vs-fertility.html` table from $550M to $691M.
3. **Fix the Bumble text** in `revenue-vs-fertility.html` from $783M to $866M, or clarify the time period.
4. **Standardize South Korea TFR** to 0.75 across all pages (fix population-crisis.html from 0.68).
5. **Standardize Trustpilot average** to 1.5 stars (fix population-crisis.html from 1.4).
6. **Fix Hinge tier name** in statistics-2026.html from "HingeX" to "Hinge+" for the $29.99 tier.
7. **Clarify Japan market size**: note when $530M (total dating market) vs $271M (app-only) is being used.
8. **Reconcile UK market size**: decide between $476M and ~$350M and use consistently.
9. **Reconcile The League pricing**: clarify that $67/mo is the basic "Member" tier and $300/mo is a higher tier.

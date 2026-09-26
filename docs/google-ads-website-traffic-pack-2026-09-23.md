# Google Ads website-traffic pack — draft for policy review

Status: **draft; do not launch from this document alone.** Last updated
26 September 2026 (route verification, signed-out journey check, display and
video copy). The two-person review and certificate submission are still
outstanding and are human steps; nothing in this pack has been submitted.

This pack is the proposed starting point for HeartFull's General Dating and
Companionship certificate and a later website-traffic campaign. It is not a
way to bypass Google's dating policy: certification must be approved before
the campaign launches.

## Service description

HeartFull is an adult (18+) general dating service. It is not compensated
dating, a sugar-dating service, an escort service, or a comparison/aggregator
of dating services. Ads must not promise a date, match, or relationship
outcome.

## Proposed paid-ad destination

| Use | URL | Status | Notes |
| --- | --- | --- | --- |
| Primary website-traffic destination | `https://heartfull.online/` | Candidate — **decision needed** | Signed out, this redirects to the sign-in screen; see "Signed-out journey check" below before freezing it. |
| Public standards evidence | `https://heartfull.online/advertising-standards/` | Live | Use for Google review or policy evidence, not as a default acquisition landing page. |
| Marketing-site standards evidence | `https://about.heartfull.online/advertising-standards.html` | Live | Mirrors the adult-only, authenticity, safety, and advertising standards. |
| Terms | `https://heartfull.online/terms/` | Live | Supporting policy page. |
| Privacy | `https://heartfull.online/privacy/` | Live; wording follow-up | Supporting policy page. Still says "matched users" / "your matches"; see "Policy-page parity". |
| Child safety | `https://heartfull.online/child-safety/` | Live | Supporting policy page; describes the age gate, in-app Report, and blocking. |
| Account deletion | `https://heartfull.online/delete-account/` | Live | Supporting page, linked from marketing-site support. |
| Support, reporting, and blocking | `https://about.heartfull.online/support.html` | Live | Contact, report-a-user, block-someone, and deletion guidance. |

### Candidate decision register

This is the complete candidate inventory for this website-traffic campaign.
It is deliberately **not** an approval list: the only acquisition URL remains
conditional until the signed-out journey decisions and the named two-person
review below are complete. Supporting URLs are evidence/sitelink candidates,
not substitutes for the acquisition landing page.

| URL group | Campaign use | Route status on 26 September 2026 | Source ownership |
| --- | --- | --- | --- |
| `https://heartfull.online/` | Conditional acquisition candidate | HTTP 200 signed out; redirects to `/#/signin` | HeartFull app repository |
| `https://heartfull.online/advertising-standards/`, `/terms/`, `/privacy/`, `/child-safety/`, `/delete-account/` | Policy/support evidence only | HTTP 200 signed out | HeartFull app repository |
| `https://about.heartfull.online/advertising-standards.html`, `/support.html` | Policy/support evidence or approved sitelink candidate after review | HTTP 200 signed out | This repository |

The public marketing routes in this repository are static GitHub Pages files:
`index.html` (`/`), `advertising-standards.html`, `terms.html`,
`privacy.html`, and `support.html`. `CNAME` assigns these to
`about.heartfull.online`, and `sitemap.xml` publishes each policy/support
route. The same live checks on 26 September returned HTTP 200 for all five.
The `heartfull.online` routes are external to this repository; their status is
validated live, not inferred from a source file here.

## Route verification — 26 September 2026

Every supporting route was fetched signed out (plain HTTPS GET, no cookies)
and returned **HTTP 200** with the expected page title. The destination-table
subset is now repeatable with `npm run check:ad-routes`; its 26 September run
passed for all 8 destinations.

| URL | Result | Content check |
| --- | --- | --- |
| `https://heartfull.online/` | 200 → `/#/signin` | Flutter sign-in screen; see below. |
| `https://heartfull.online/advertising-standards/` | 200 | 18+ onboarding, report and block, `support@` contact. |
| `https://heartfull.online/terms/` | 200 | "at least 18 years old". |
| `https://heartfull.online/privacy/` | 200 | "aged 18 and over"; match wording outstanding. |
| `https://heartfull.online/child-safety/` | 200 | Age gate, Report button, blocking, `support@` contact. |
| `https://heartfull.online/delete-account/` | 200 | Deletion instructions. |
| `https://about.heartfull.online/advertising-standards.html` | 200 | Adults-only, report and block, links to support. |
| `https://about.heartfull.online/support.html` | 200 | Report-a-user and deletion FAQ. |
| `https://about.heartfull.online/terms.html` | 200 | 18+ eligibility. |
| `https://about.heartfull.online/privacy.html` | 200 | Data collection and rights. |

Re-run this check against the frozen destination set on the day of submission;
a deploy between now and then invalidates it.

## Signed-out journey check — 25 September 2026

Checked in a clean browser at desktop (1280×900) and mobile (390×844) sizes,
app build `v1.0.269+276 · 8b51e6a`. A signed-out visit to
`https://heartfull.online/` lands on `/#/signin`, which shows:

- the HeartFull name, logo, and tagline "The ethical dating app — your
  character is your currency";
- phone-number sign-in ("Send code" / "Continue"), defaulting to the +1
  country code;
- links to "About the App", "Become a promoter", Terms, and Privacy Policy;
- a **Get it on Google Play** badge.

Decisions required before this URL can be frozen as the ad destination:

1. **App-store link.** The Google Play badge is part of the landing journey.
   Either include the Google Play app ID in the certificate application, or
   use a destination without the badge. The targeting guardrail below forbids
   app-store links that are not in the certification scope.
2. **Service description and 18+ statement.** The sign-in screen describes the
   service only through its tagline and does not state that HeartFull is for
   adults. Google reviews whether the landing page accurately describes the
   service. Either add a short adults-only service description to the signed-out
   screen (app repository), or choose a different signed-out landing page.
   Do **not** switch to `https://about.heartfull.online/`: its header and footer
   link to Dating Institute and app-comparison pages, which are restricted
   aggregator content.
3. **Default country code.** The initial markets are Australian, but the phone
   field defaults to +1. This is not a policy blocker; changing it would make
   the landing experience match the targeted markets.
4. **Conversion event.** Choose the event that counts as a conversion (for
   example, a completed sign-in or completed onboarding) and confirm it fires
   for a test account before launch.

Do **not** use Dating Institute comparison, ranking, or multi-service review
pages in a General Dating campaign. Google's policy treats those as restricted
dating aggregators, with a different eligibility path.

## Destination exclusions

These must never be a final URL, sitelink, or other ad destination in a General
Dating campaign. `npm test` fails if any appears in the destination table above.

| Excluded | Why |
| --- | --- |
| `https://about.heartfull.online/dating-institute/…` (all pages) | Dating advice, country guides, app directory, and competitor pricing and reputation pages are aggregator/review content. |
| `https://about.heartfull.online/compare/…` (all pages) | Head-to-head comparisons with other dating apps are aggregator content. |
| `https://about.heartfull.online/why-heartfull.html` | Multi-app comparison page. |
| `https://about.heartfull.online/` (marketing home page) | Its header and footer link to Dating Institute and Compare Apps. |
| App-store URLs (Google Play, Apple App Store) | Only if the app ID is in the approved certificate application. |

## Validation

Two checks keep this pack and the live destinations in step:

- **`npm test`** (offline, runs on every change) parses this document. It
  fails if:
  - a destination is off the HeartFull domains, excluded above, or missing
    from this repository;
  - any headline, description, or business name is over its Google Ads
    character limit, or uses outcome, compensated, or sexual framing;
  - the readiness doc stops linking this pack;
  - the privacy, terms, standards, or support links disappear from the home
    footer, standards page, or support page;
  - the corrected privacy/support wording regresses.
- **`npm run check:ad-routes`** (live, needs network) fetches every URL in the
  destination table while signed out. It fails unless each one returns
  HTTP 200 and contains the policy text this pack relies on (for example 18+
  statements, report and block guidance). When adding a destination, add its
  expected text to `MARKERS` in `scripts/check-ad-routes.js`; `npm test`
  enforces that.

Run `npm run check:ad-routes` on the day the destination set is frozen and on
submission day, and paste its output (it ends with a timestamp) into issue #8.

## Proposed targeting guardrails

- Target adults aged 18+ only. Do not use youth-oriented audience segments,
  creative, publishers, or placements.
- Begin with the intended Australian markets (the existing account targets
  Sydney and Melbourne) only after their eligibility is confirmed in the
  certification outcome.
- Use only the certified HeartFull domain and the exact reviewed creative.
- Do not include app-store links or app-promotion assets unless the relevant
  app IDs were included in the certification application and are approved.
- Exclude these countries from every campaign because Google currently lists
  them as ineligible for dating and companionship ads: Algeria, Bahrain, Sri
  Lanka, Palestine, Iraq, Jordan, Kuwait, Lebanon, Libya, Morocco, Oman,
  Nepal, Pakistan, Qatar, Saudi Arabia, Tunisia, Egypt, and Yemen. Recheck the
  [current policy](https://support.google.com/adspolicy/answer/15328393?hl=en)
  in the Ads UI before creation because country availability can change.

## Campaign exclusions

Apply these exclusions before the campaign is enabled. They are a safety and
scope guardrail; they do not replace Google's automated policy enforcement.

### Negative keywords and search themes

Exclude queries seeking compensated dating, escorting, sexual services, or
mental-health treatment. At minimum, add phrase/exact negatives for:

- `sugar daddy`, `sugar mommy`, `sugar dating`, `paid dating`, `paid companion`,
  `compensated companionship`, `financial arrangement`;
- `escort`, `escorting`, `sex worker`, `prostitute`, `hookup`, `one night stand`,
  `casual sex`, `nudes`;
- `therapy`, `therapist`, `counselling`, `counseling`, `mental health support`,
  `crisis hotline`, `suicide help`.

HeartFull must not be positioned as therapy, a crisis service, or a substitute
for professional mental-health care. Review the search-terms report at least
weekly during any pilot; add new excluded variants promptly and do not use
negative keywords to conceal a prohibited campaign intent.

### Placement and inventory exclusions

- Exclude mature/adult, sexually explicit, gambling, violence, tragedy,
  sensational or shocking-content inventory, and any site/app primarily aimed
  at children or teenagers.
- Do not use Dating Institute, comparison/review, app-directory, or competitor
  content as a managed placement, contextual target, destination, or sitelink.
- Exclude user-generated placements that cannot be reviewed for age-appropriate
  context before launch; review the placement report weekly and exclude any
  unsuitable inventory.

### Audience exclusions

- Exclude people under 18; do not use youth, student/minor-oriented, or
  child-directed segments, creatives, or publishers.
- Do not build, upload, or target audiences based on a person's mental-health
  condition, crisis, treatment seeking, sexual activity, or other sensitive
  personal hardship. Do not retarget visitors to safety, crisis, reporting, or
  account-deletion pages.
- Use only age-eligible, country-eligible audiences allowed by Google after
  certification. Disable expansion or automated audience suggestions if they
  would reach excluded countries or unsuitable inventory.

## Draft ad copy

All examples below require final Google Ads editorial and policy review. They
are deliberately factual and must stay matched to the selected landing page.
Search limits: headlines ≤30 characters, descriptions ≤90 characters (the
25 September revision shortened all three descriptions to fit).

### Variant A

- Headline: `Adult Dating on HeartFull`
- Headline: `Meet Adults, Connect Honestly`
- Description: `HeartFull is an 18+ dating service for real connection. Get to know people thoughtfully.`

### Variant B

- Headline: `A Thoughtful Way to Date`
- Headline: `HeartFull Is for Adults 18+`
- Description: `An adult dating service built on respectful connection. No paid companionship.`

### Variant C

- Headline: `Try HeartFull Dating`
- Headline: `Build Real Connections`
- Description: `Join HeartFull, an adult-only dating service. Set up a profile, connect at your own pace.`

### Display (responsive display ad) draft

Use only with a landing page that has passed the signed-out journey decisions
above. Length limits are Google's current responsive display limits; confirm
them in the Ads UI when the campaign is built.

- Business name: `HeartFull`
- Short headlines (≤30 characters):
  - `HeartFull: Dating for Adults`
  - `Message People Nearby, 18+`
  - `No Mutual Swipe Needed`
- Long headline (≤90 characters): `An 18+ dating service where you can message people nearby without a mutual swipe`
- Descriptions (≤90 characters):
  - `Connecting is never paywalled. Earn Hearts by sharing lifestyle photos.`
  - `Attach Hearts to a message to show you mean it. The other person decides.`

Each claim is taken from the live product copy: connections are not
paywalled, people are selected by location and criteria rather than mutual
swipes, and Hearts are earned (never bought) and attached to messages.

### Video draft (15 seconds)

| Time | Picture | Voice-over / on-screen text |
| --- | --- | --- |
| 0–3 s | HeartFull logo on the brand background. | "HeartFull. Dating for adults, 18+." |
| 3–8 s | Product UI walkthrough: nearby-people strip, a lifestyle photo, typing a message. | "See people nearby and message them — no mutual swipe first." |
| 8–12 s | Attaching Hearts to a message and sending it. | "Earn Hearts by sharing your lifestyle. Attach them to show you mean it." |
| 12–15 s | Logo and the certified landing URL. | "HeartFull. Connect at your own pace." |

### Asset requirements

- **People in imagery.** Use only real, consenting adults (licensed stock with
  model releases, or a paid shoot). Fully clothed, everyday settings, no
  suggestive poses, and no one who could be read as under 18.
- **Product UI.** Any UI shown must be the real app. Profiles and messages in
  UI captures must be clearly labelled on screen as illustrative
  (e.g. "Illustrative demo") so they are not presented as real members.
  The animated demo in the `about.heartfull.online` hero phone uses
  illustrative stock profiles; do not reuse it in ads without that label.
- **No outcome imagery.** No couples, weddings, or "match" celebrations that
  imply a guaranteed result.
- **Responsive-display images.** Supply landscape 1.91:1 (recommended
  1200×628; minimum 600×314), square 1:1 (1200×1200; minimum 300×300), and
  vertical 9:16 (900×1600; minimum 600×1067). Use JPG or PNG at 5 MB or less.
  Aim for 5–10 images per ratio; avoid overlaid text, buttons, collages, and
  digital-composite backgrounds.
- **Logos.** Supply a square 1:1 logo (1200×1200 recommended; 128×128 minimum)
  and landscape 4:1 logo (1200×300 recommended; 512×128 minimum), each 5 MB
  or less. Keep the logo simple, centred, and free of small text; a transparent
  background is preferred when the mark remains centred.
- **Video.** Prepare 16:9 (1920×1080), 1:1 (1080×1080), and 9:16
  (1080×1920) masters. The 15-second draft meets the 10–60 second Demand Gen
  guideline and the 10-second minimum commonly required for YouTube in-stream.
  Upload only a public or unlisted YouTube URL when the selected campaign type
  requires it. Include readable captions and preserve safe areas for platform
  UI, since many placements begin muted.
- **Technical source of truth.** Reconfirm asset counts, accepted file types,
  dimensions, and any campaign-type-specific limits in the Google Ads UI on
  upload. The requirements above were checked on 26 September 2026 against
  Google's [responsive-display specifications](https://support.google.com/google-ads/answer/7005917?hl=en),
  [responsive-display best practices](https://support.google.com/google-ads/answer/9823397?hl=en),
  and [Demand Gen specifications](https://support.google.com/google-ads/answer/17091672?hl=en).
- **Record the final assets.** File names and hashes of the frozen assets go
  in the GitHub issue with the two-person review.

## Creative exclusions

- No sexualised, nude, racy, exploitative, or underage-coded imagery.
- No statements that imply guaranteed dates, matches, sex, marriage, or a
  particular relationship outcome.
- No financial, gift, sugar, compensated-companionship, or escort framing.
- No synthetic profiles, chatbot conversations, or generated dating content
  unless conspicuously disclosed and separately cleared through policy review.
- No misleading prices, fake urgency, fake activity, or unsupported claims.

## Policy-page parity — 25 September 2026

Fixed on `about.heartfull.online` (this repository):

- Privacy (EN, ES, AR, VI, ZH): the account-data line said the phone number was
  collected "for verification". It now says it's the phone number or sign-in
  account used to log in, which matches the app's sign-in options. The
  "match you" / "your matches" wording is replaced with showing people nearby
  and messaging the people you talk to, which matches the no-mutual-swipe model.
- Support: added a "How do I block someone?" answer that matches the in-app
  block confirmation, and a link to the Dating & Advertising Standards page.
- Home-page footer (EN, ZH): added a Support & Safety link; the ZH footer also
  gains the Dating & Advertising Standards link.

Outstanding in the app repository (not this website):

- `https://heartfull.online/privacy/` still says "matched users" and "your
  matches". It should say "people you are talking to" before submission, so
  the policy page matches the service.

## Two-person pre-launch review

**Stop point:** everything below needs two named people and must not be ticked
by an automated agent. Do not submit the certificate or enable any campaign
until every item is ticked and the reviewers are recorded in issue #8.

Record the names and date of the two reviewers in the related GitHub issue
before any campaign is enabled.

- [ ] The final landing page returns HTTP 200 while signed out and accurately
  describes the service, including that it is for adults 18+.
- [ ] The signed-out journey decisions above are resolved: Google Play badge
  (app ID in scope, or a destination without it), adults-only service
  description, and the conversion event verified with a test account.
- [ ] `https://heartfull.online/privacy/` no longer says "matched users" or
  "your matches".
- [ ] `npm test` and `npm run check:ad-routes` pass on submission day, and
  the route-check output is pasted into issue #8.
- [ ] The complete signup/onboarding journey is available to the Google
  reviewer using the supplied test access, if sign-in is needed.
- [ ] Every selected asset matches this pack and uses adult, non-sexualised
  presentation.
- [ ] Targeting is adults 18+ and contains only approved countries/markets.
- [ ] Every ineligible country listed in "Proposed targeting guardrails" is
  excluded; location option, language, and any audience expansion are checked
  so they cannot widen the approved scope.
- [ ] Negative-keyword, placement/inventory, and audience exclusions in
  "Campaign exclusions" are applied. The campaign does not present HeartFull
  as therapy, crisis support, or another mental-health service.
- [ ] The application includes every landing domain and any in-scope app ID.
- [ ] The campaign contains no Dating Institute/aggregator destination or any
  other URL from "Destination exclusions", including sitelinks.
- [ ] Final assets are frozen: file names and hashes are recorded in issue #8.
- [ ] Certification approval is recorded before the campaign is enabled.

## Evidence

- Product and policy readiness: `google-ads-certification-readiness-2026-09-22.md`
- Current account status and disapproval: `google-ads-status-2026-09-22.md`
- Google policy: <https://support.google.com/adspolicy/answer/15328393?hl=en>

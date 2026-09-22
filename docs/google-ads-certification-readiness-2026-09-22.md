# Google Ads dating-certification readiness — 22 September 2026

## Decision

**Not ready to submit yet.** HeartFull is eligible in principle for Google's
**General Dating and Companionship Certificate**: it is an adult general-dating
service, not a compensated-dating or sexually focused service. The required
product and policy hardening is implemented in this working copy but must be
released and verified before the application is sent.

The controlling policy is Google's [Dating and Companionship policy](https://support.google.com/adspolicy/answer/15328393?hl=en).
It requires the service to exclude under-18 users, avoid deceptive or
exploitative dating, and provide Google with the applicable app IDs or landing
domains and reviewer access.

## Audit scope

Reviewed on 22 September 2026:

- Google Ads account state and its 21 September policy notice.
- `about.heartfull.online` marketing site and its app/download destinations.
- `heartfull.online` web/PWA legal and child-safety pages.
- Flutter onboarding, Firestore rules, public-profile writes, and related
tests.
- Product copy and source for synthetic-profile/chatbot functionality.

This is a source and configuration audit, not a substitute for a production
review after deployment or for Google's certification decision.

## Findings and disposition

| Requirement | Finding | Status |
| --- | --- | --- |
| General dating service | HeartFull presents a general, consensual dating product; its public terms prohibit explicit, illegal, deceptive, and commercial misuse. | Ready |
| No compensated dating | No source or public product copy promotes sugar dating, escorting, or payment for companionship or sexual activity. | Ready |
| Adult-only access | The UI offered ages 18+ only, but did not require an explicit affirmation and Firestore accepted a forged under-18 age. | Fixed in code; release required |
| Accurate public claims | Child-safety copy overstated the existing control as "age verification"; the app stores an age, not a date of birth. | Fixed in code; release required |
| Synthetic profiles and chatbots | No product code creates dating profiles or messages through an AI service. Existing policies prohibit fake or misleading profiles. | Ready; keep this true |
| Racy or sexually focused content | Terms prohibit sexually explicit or pornographic content. Do not use racy assets or hookup/sexual-outcome framing in ads or landing pages. | Creative review required |
| Safety and reporting | Public child-safety page plus in-app reporting/blocking and photo-review pathways are present. | Ready after release of corrected page |
| Transparent public explanation | New `/advertising-standards.html` explains adult access, prohibited paid companionship, authenticity, safety, and ad-claim limits. | New page; release required |
| Reviewer access | Google may need access beyond the public landing page. No dedicated reviewer test account or access instructions are prepared. | Required before submission |
| Destinations | The certification form needs every service domain and app ID used in the journey. The final paid-ad URL set is not yet frozen. | Required before submission |

## Implemented hardening

1. Onboarding now requires an explicit confirmation that the person is at least
   18 before the profile can be completed.
2. Firestore rules reject any public profile with an age below 18 or above 99,
   including a tampered client write.
3. The public child-safety page now describes the actual age gate rather than
   claiming unsupported age verification.
4. The web/PWA privacy policy now correctly records an age rather than a date
   of birth.
5. Marketing-site terms now describe a supported sign-in method rather than
   incorrectly requiring phone-only identity verification.
6. The marketing site now has an accessible public standards page, linked from
   the home-page footer and sitemap.

## Submission checklist

Before submitting the certificate application:

1. Release the website and the web/PWA hardening, then verify the live pages
   and onboarding flow. Include native releases if the store apps are listed
   as certification destinations.
2. Prepare one Google reviewer test account that can complete the relevant
   journey. Keep credentials out of this repository; provide them only in
   Google's application form.
3. Build the final destination inventory: `about.heartfull.online`,
   `heartfull.online`, any sign-in/redirect domain, and the Google Play/Apple
   App Store IDs if included in the campaign or service journey.
4. Use the **General** certificate for an ordinary HeartFull app campaign or a
   general product landing page. Do not send ads to Dating Institute comparison
   or ranking pages: those are policy-defined dating aggregators and are
   restricted to Search.
5. Review every live ad asset and destination together. The copy must identify
   HeartFull accurately, be 18+ appropriate, avoid racy imagery and outcome
   promises, and match the page a person reaches.
6. Submit the certificate, wait for Google’s decision, then confirm every ad
   group is **Eligible** before interpreting campaign performance.

## Residual risks

- A self-declared age gate does not prove a person's age. It is the current
  product control; do not describe it as identity or document verification.
- Google reviews the live experience, including post-login content. A source
  change without a released surface does not resolve the disapproval.
- Future AI profile, chatbot, sexual-content, or compensated-companionship
  features would require a fresh policy review and may make this certificate
  insufficient or unavailable.

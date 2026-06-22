# Hearts Economy — Complete Guide

The Hearts Economy is HeartFull's core differentiator. It replaces the pay-to-win model used by every other dating app with a merit-based system where your behavior determines your visibility and reach.

## Core Principle

**Payments are completely disconnected from connections.** Matching, messaging, and visibility will never cost money. Hearts can never be purchased — they can only be earned through genuine effort and good behavior.

HeartFull may monetize through optional tools such as AI assistance, speech-to-text, analytics, or workflow enhancements. Core connection features stay outside the paywall: matching, messaging, visibility, voice messages, calls, events, and Hearts.

## Starting Balance

New users receive **100 Hearts** on their first visit. This is enough to start exploring and having conversations, but not enough to spam. It creates a natural incentive to earn more through good behavior.

## How Users Earn Hearts

| Action | Reward | Notes |
|--------|--------|-------|
| Sign up (first visit) | +100 | One-time welcome bonus |
| Upload a photo or video | +20 | Up to the daily upload limit |
| Receive a message | +variable | Hearts transfer from sender (see Dynamic Pricing) |
| Claim a first-message escrow | +1 | When you reply to someone's first message |
| Receive a photo like | +1 | Like transfers a Heart from the liker |
| Verified QR date check-in | +100 each | One verified date reward per pair |
| Referral | +25 to the new user, +25 to the inviter | Promoter invite links can award +50 to the inviter |

## How Users Spend Hearts

### First Message: The Escrow System

When you send your **first message** to someone new:
1. **1 Heart** is placed in **escrow** (not transferred yet)
2. The recipient sees a filled heart indicator on your profile
3. If the recipient **replies**, they claim your escrowed Heart — it transfers to them
4. This proves genuine interest from both sides

The escrow is visible on profile cards:
- **Filled heart (red)**: They have a Heart reserved for you (they reached out first)
- **Outlined heart**: You have a Heart reserved for them (you reached out)

### Follow-up Messages: Anti-Spam Threshold

After the first message:
1. The next **3–5 messages** are free (threshold is randomized to prevent gaming)
2. After the threshold, a **dynamic charge** kicks in
3. The charge is calculated using the **Wealth Ratio** (see below)

This prevents message spam while allowing natural conversation flow.

### Dynamic Pricing: The Wealth Ratio

The cost to send a charged message is based on the **ratio between your Hearts and theirs**:

```
ratio = (your Hearts + 1) / (their Hearts + 1)
```

| Scenario | Ratio | Cost | Why |
|----------|-------|------|-----|
| You have way more Hearts | > 2.0 | 1% of your Hearts | You're established — small relative cost to reach down |
| Similar Heart counts | 0.5 – 2.0 | 1 Heart | Fair exchange between equals |
| They have way more Hearts | < 0.5 | 10% of your Hearts | You're reaching up — shows serious investment |

#### Real examples:

| Your Hearts | Their Hearts | Ratio | Cost |
|------------|-------------|-------|------|
| 1,000 | 100 | 9.9 | 10 Hearts (1%) |
| 100 | 100 | 1.0 | 1 Heart |
| 20 | 1,000 | 0.02 | 2 Hearts (10%) |
| 500 | 200 | 2.5 | 5 Hearts (1%) |
| 50 | 500 | 0.1 | 5 Hearts (10%) |

### Key insight: Hearts transfer from sender to recipient

When you send a message that costs Hearts, those Hearts go to the person you're messaging. It's not a fee to the platform — it's a gift of your earned effort to them. This means:

- **Popular users accumulate more Hearts** from incoming messages
- **Active, kind users naturally rise** in the hierarchy
- **The system is self-sustaining** — no money enters the economy

## The Hierarchy

Hearts create a natural hierarchy based on merit:

```
High Hearts (1000+)
├── Verified, invested users who've earned trust
├── Cost more to approach (protects from inbox flooding)
├── Can easily message anyone (low relative cost)
└── Their attention is valuable and earned

Medium Hearts (100–999)
├── Active users building their reputation
├── Moderate cost to approach high-Hearts users
├── Affordable for newcomers to reach
└── The growing middle — most users live here

Low Hearts (< 100)
├── New users or those who haven't invested yet
├── Cheapest to approach (gives underdogs a chance)
├── Higher relative cost to reach up
└── Incentivized to earn more through good behavior
```

### Why this hierarchy works:

1. **Protects popular users** — Getting lots of messages is flattering but overwhelming. The cost to approach high-Hearts users acts as a natural filter. Only people willing to invest their earned Hearts will reach out, which means higher-quality messages.

2. **Gives newcomers a chance** — Approaching someone new costs very little. Established users can easily discover and connect with newcomers without it feeling like a waste.

3. **Rewards good behavior over time** — Unlike apps where you can buy your way to the top, the only way to accumulate Hearts is through genuine effort: posting photos, being responsive, having real conversations.

4. **Creates meaningful approach signals** — When someone spends 10% of their Hearts to message you, that's a powerful signal of genuine interest. Much more meaningful than a mass-produced "hey" on Tinder.

## Matching System

Matching in HeartFull is automatic based on:
- Gender preferences (mutual)
- Age range overlap (mutual)
- Both users have completed their profile (name + active)
- The user's matching toggle

When matched:
- Both users appear in each other's browsing feed
- Newest matches appear first
- Either user can initiate a conversation (by spending Hearts)
- Matching is periodically refreshed when matching is enabled, rather than reshuffling constantly

## Communication Features

Hearts govern access fairly, but they do not restrict the form of communication. HeartFull supports text messages, voice messages, 1-on-1 video calls, photo likes, event group chat, and online event calls. Calls and voice messages are product features, not purchasable shortcuts to other people.

## Anti-Gaming Protections

- **Randomized thresholds**: The free-message window is 3–5 messages (randomized), preventing users from gaming exact numbers
- **Percentage-based costs**: Charging a percentage of Hearts (not a flat fee) means the cost scales with your balance
- **No purchase path**: Since Hearts can't be bought, there's no shortcut to circumvent the system
- **Transfer economy**: Hearts flow between users, not to the platform, keeping the total supply finite and meaningful

## Why People Prefer This Over Pay-to-Win

| Pay-to-win (other apps) | Merit-based (HeartFull) |
|--------------------------|------------------------|
| $50/mo buys unlimited swipes | Good behavior earns unlimited reach |
| Rich users dominate visibility | Kind users dominate visibility |
| Spam messaging is free | Each message has weight |
| No consequence for ghosting | Ghosting wastes your Heart investment |
| Income determines dating success | Character determines dating success |
| Platform profits from loneliness | Platform has no financial incentive to keep you single |

## Technical Implementation

### Firestore Schema
- `user/{uid}.coinCount` — Heart balance
- `reserveHeart/{from-to}` — Escrow documents for first messages
- `user/{uid}.peopleOrder` — Ordered list of matches (newest first)
- `comm/{uid1:uid2}.messages[].transaction` — Heart cost per message
- `comm/{uid1:uid2}.messages[].fromReserve` — Whether message claims an escrow

### Key Code Locations
- `app/lib/services/user_service.dart` — `calculateCharge()`, `transferCoins()`
- `app/lib/services/messaging_service.dart` — Message cost trigger logic
- `app/lib/features/faces/components/heart_escrow.dart` — Escrow state computation
- `app/lib/features/gallery/upload_service.dart` — Photo/video upload reward (+20)
- `app/lib/features/faces/faces_page.dart` — Welcome bonus (+100)
- `app/lib/features/date_checkin/date_checkin_page.dart` — QR date check-in reward (+100 each)
- `app/lib/features/calls/` and `app/lib/services/webrtc/` — 1-on-1 and event calls

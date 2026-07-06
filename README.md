# The Listing Engine

A clickable, front-end-only demo of a real-estate lead-generation platform,
presented as the live product of a fictional Lagos agency — **Aha Luxury Homes**
(founder: Adaeze Okonkwo). It looks and behaves like a finished, running site:
real photographs, real working links, a real WhatsApp touchpoint, and a public
site + agent dashboard that share **one live data store**. It's built to be
walked through on a client sales call, start to finish, with no dead ends.

> **Still a demo under the hood.** No server or database (state lives in
> `localStorage`), no paid WhatsApp Business API (real click-to-chat instead),
> and a cosmetic login. Everything else is simulated convincingly.

---

## Quick start

```bash
npm install
npm run dev        # http://localhost:5173
```

Production build + local preview of the static output:

```bash
npm run build      # type-checks, then outputs static site to dist/
npm run preview    # serves dist/ locally
```

The build in `dist/` is a fully static site — deploy it to Vercel, Netlify, or
any static host. Point your paid ads at `/lp/:id` (single-property landing) and
`/lp/guide` (lead magnet).

**Tech:** Vite · React · TypeScript · React Router · Tailwind CSS ·
framer-motion · lucide-react.

---

## Demo script (§11 — the guided path)

This is the click-through to run on a client call. Every step works end-to-end
with zero dead ends.

1. **Homepage** `/` — use the hero search (e.g. **Ikoyi · Up to ₦400M · 4 beds**)
   → arrive at a filtered `/listings`.
2. **Property** — open **No. 4 Osborne Foreshore** (`/property/osborne`), scroll
   the real-photo gallery, fill in the booking form and submit. You'll see the
   instant success state, and **WhatsApp opens** with a pre-filled message to
   `2349064787469`.
3. **Ad landing** — open `/lp/osborne` in another tab (this is what a Facebook ad
   would point to) and submit a lead there too.
4. **Agent** — go to `/agent`, log in with **`demo` / `demo`**, land on
   `/agent/dashboard`. Both new leads have already appeared with their sources
   and auto-replies.
5. **Lead thread** — open a lead to show the WhatsApp-style thread (auto-reply +
   follow-ups) and the **Message on WhatsApp** button (opens a real chat to that
   lead).
6. **Add property** — `/agent/properties/new`, add a new property and publish. A
   celebratory toast fires: _"Published. N matching buyers auto-notified 🎉"_,
   naming the matched leads. Open `/listings` to show it's live.
7. **Book a viewing** — on `/agent/leads`, drag a lead into **"Viewing Booked"**
   → it appears on `/agent/viewings` with the reminder badge.

---

## The live loop

Every screen reads and writes one `StoreContext` (Context + reducer, backed by
`localStorage`), so cause and effect is visible across the whole app:

- **Buyer submits any form** → a `Lead` is created and appears instantly in
  `/agent/leads`, the dashboard's recent-leads list, and the live activity feed.
  A simulated **auto-reply** lands in the thread ~1 second later.
- **Agent adds a property** → it publishes to the public `/listings`
  immediately, matching leads are found (area + budget + beds), and a toast
  names the buyers who were auto-notified.
- **Agent moves a lead to "Viewing Booked"** → a `Viewing` is created and shows
  on `/agent/viewings`.

Simulated automations are tagged with a **⚡** badge throughout: instant
auto-response, property-match alerts, the follow-up drip
(`Day 1 sent ✓ · Day 3 scheduled · Day 7 scheduled`), and viewing reminders.

---

## WhatsApp

- **Real click-to-chat.** Buyer form submissions and the agent's "Message on
  WhatsApp" buttons open `https://wa.me/<number>?text=<prefilled message>` in a
  new tab. On a call this genuinely opens WhatsApp — show it live.
- **Simulated auto-reply.** ~1s after a lead is created, an automated message is
  appended to their thread and tagged **⚡ Auto-reply**, to dramatize
  speed-to-lead in the dashboard.

> Fully hands-off, automated WhatsApp _sending_ requires the WhatsApp Business
> API — a later, paid step. This demo uses real click-to-chat plus simulated
> threads, which is enough to sell with and to run calls on.

---

## Reset demo data

`Agent → Dashboard → Reset demo data` (top-right) restores all properties,
leads, and viewings to their seed state and clears anything you added during the
demo. (Under the hood it clears the `listing-engine.v1` key in `localStorage`.)

---

## Swapping in a real agent's photos

Property images are plain files under `public/images/<property>/` and are
referenced by the `images` array on each property in `src/data/seed.ts`.

1. Drop the agent's real photos into a folder, e.g.
   `public/images/osborne/living.jpg`.
2. Update that property's `images: [...]` array in `src/data/seed.ts` to point at
   the new files (keep 5–6 per property: exterior, living, kitchen, primary
   suite, bathroom, pool/terrace/view).
3. Clear demo data (or clear `localStorage`) so the new seed loads.

No hot-linking — always download and serve locally so images load reliably on a
live call. Sources for the demo images are listed in [`CREDITS.md`](./CREDITS.md).

---

## Re-skinning to any real agent (one file)

Everything brand-related — name, tagline, agent, contact details, the WhatsApp
number, colours and fonts — lives in **`src/brand.config.ts`**. Change it there
and the whole site updates; nothing is hard-coded anywhere else.

```ts
export const brand = {
  agencyName: "Aha Luxury Homes",
  tagline: "Lagos' finest addresses, one link away",
  agentName: "Adaeze Okonkwo",
  agentRole: "Founder",
  city: "Lagos",
  whatsappNumber: "2349064787469", // international format, no +
  email: "hello@aha-homes.demo",
  instagram: "@ahaluxuryhomes",
  currency: "₦",
  colors: { pine: "#16342A", /* … */ },
  fonts: { display: "Cormorant Garamond", body: "Jost" },
};
```

To re-skin for a client: set the agency name, agent details, WhatsApp number,
email/Instagram, and (optionally) the colour palette; swap the property data in
`src/data/seed.ts` and the photos as above.

---

## Project structure

```
public/
  images/        real property photos (per property) + agent portrait
  fonts/         self-hosted webfonts (no external CDN calls)
src/
  brand.config.ts   ← ONE file controls the whole brand
  types.ts          shared data models (Property, Lead, Viewing, …)
  data/seed.ts      seed data: 6 properties, 4 leads, 2 viewings
  store/            StoreContext — localStorage-backed Context + reducer
  lib/              formatting, WhatsApp links, lead-matching, ids
  components/       shared UI (nav, footer, cards, forms, gallery, toast…)
  pages/            public site (home, listings, property, /lp/*, about)
  agent/            agent workspace (login, dashboard, properties, leads, viewings)
```

---

## Non-goals

No real backend or database (localStorage only). No paid WhatsApp Business API
(click-to-chat only). No real authentication (cosmetic login). No payment
processing. The goal is a smooth, believable, complete-feeling demo — not
architectural completeness.

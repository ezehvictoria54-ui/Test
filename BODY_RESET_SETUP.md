# The Body Reset — launch setup

The sales page is driven by `src/pages/BodyResetPage.tsx`. Business settings, the FAQ access decision and all 15 testimonial records live in `src/data/bodyReset.ts`.

## Required before launch

1. Set `checkoutUrl`, `supportContact`, `accessDuration`, `metaPixelId` and `canonicalUrl` in `siteConfig`.
2. Replace the three labelled Victoria placeholders in `BodyResetPage.tsx` with approved, compressed responsive images. Recommended source size is 1200 × 1500 (4:5), exported as AVIF and WebP.
3. Add approved media paths and customer display information to the 15 testimonial records in `src/data/bodyReset.ts`. Do not publish a name, location or image without permission. Video posters should be compressed and the video itself should remain click-to-load/no-autoplay.
4. Replace each product mockup placeholder with approved mockups and add the final Open Graph share image.
5. Add real Privacy, Terms and Refund pages or URLs, verified support details and payment-provider security copy.

## Tracking

The lightweight `track()` helper pushes named events into `window.dataLayer`. It covers page view, CTA placements, checkout click, testimonial gallery, FAQs and 25/50/75/90% scroll depth. When a real Meta Pixel ID and loader are configured, CTA clicks may send `InitiateCheckout`.

`Purchase` must only be sent from a verified payment-success page or server integration. It is intentionally never fired on this sales page. UTM values are retained in session storage and appended to the configured checkout URL.

## Integrity controls

- Countdown is disabled and requires a real fixed deadline, timezone, copy and expiry action.
- Purchase notifications are disabled and have no records. Only permissioned, verified records may be supplied.
- No testimonial copy or customer result is fabricated; every proof card is visibly marked as a placeholder.
- The access-duration FAQ remains hidden until the business decision is supplied.

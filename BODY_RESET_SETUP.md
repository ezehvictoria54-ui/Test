# The Body Reset — launch handoff

The finished long-form page is implemented in `src/pages/BodyResetPage.tsx`, its responsive visual system is in `src/index.css`, and every business setting, FAQ and testimonial slot is centralized in `src/data/bodyReset.ts`.

## Replace media

- Replace the labelled Victoria hero, portrait and transformation `Placeholder` components in `BodyResetPage.tsx` with approved responsive `<picture>` assets (AVIF/WebP, with explicit dimensions).
- Replace the labelled product mockup placeholder in the product reveal. The labels identify the phone/tablet, class, guide, calculator and tracker artwork required.
- Populate the 15 records in `testimonials` in `src/data/bodyReset.ts`. Add `mediaSrc`, `posterSrc`, approved display details/caption and set `permissionConfirmed` only after permission is documented. The current UI deliberately shows obvious placeholders and no fabricated quotes.
- When connecting media, render images with responsive sources and `loading="lazy"`; render video only after a click, never autoplay, and add captions/transcript links.

## Business configuration

All launch controls are in `siteConfig` in `src/data/bodyReset.ts`:

- `checkoutUrl`: verified checkout destination. Until supplied, every CTA safely returns to the offer section. UTM parameters are persisted and forwarded.
- `metaPixelId`: real Meta Pixel ID. The page has hooks for `ViewContent` and `InitiateCheckout`; load the approved pixel script only after consent. Fire `Purchase` only from a verified payment-success state, never on a CTA click.
- `accessDuration`: confirmed customer access period.
- `supportContact`: approved support address/channel.
- `countdown`: keep `enabled: false` until a real ISO deadline is supplied. Set its Lagos-time campaign deadline and desired expiry action; it never resets after expiry.
- `purchaseNotifications`: keep disabled until a real backend/data source supplies consented purchase records. The data contract accepts `firstName`, `city`, `purchasedAt` and product; do not seed development names.

## Remaining launch TODOs

Supply legal URLs (Privacy, Terms and Refund), support details, checkout/payment-provider details, access duration, approved Victoria/product imagery, real permissioned testimonials and any real campaign deadline. Confirm the exact delivery instructions shown after successful payment.

## Preview and mobile QA

Run `npm run dev -- --host 0.0.0.0`, open the printed local URL and use browser responsive mode at 320, 360, 375, 390, 414, 430, 768, 1024 and 1440px. At 390px, inspect the whole page first; then test CTA destinations, sticky CTA visibility, every FAQ, proof expansion/lightbox/Escape handling, exit modal, focus order and reduced-motion mode. Verify that countdown and purchase notifications remain absent without real data.

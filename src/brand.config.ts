/**
 * ONE FILE controls the whole brand.
 * Re-skinning The Listing Engine to a real agent is a single-file edit:
 * change the name, contact details, WhatsApp number and colours here and
 * every screen updates. Nothing brand-related is hard-coded anywhere else.
 */
export const brand = {
  agencyName: "Aha Luxury Homes",
  tagline: "Lagos' finest addresses, one link away",
  agentName: "Adaeze Okonkwo",
  agentRole: "Founder",
  agentAvatar: "/images/brand/agent.jpg",
  city: "Lagos",
  whatsappNumber: "2349064787469", // international format, no +
  email: "hello@aha-homes.demo",
  instagram: "@ahaluxuryhomes",
  instagramUrl: "https://instagram.com/ahaluxuryhomes",
  currency: "₦",
  colors: {
    // matches the existing property page palette
    pine: "#16342A",
    pineDeep: "#0D211A",
    stone: "#EDE7DB",
    stoneSoft: "#E2D9C9",
    bone: "#F6F2EA",
    brass: "#AE8747",
    brassBright: "#C9A25E",
    ink: "#1D231E",
    sage: "#7C8B77",
  },
  fonts: { display: "Cormorant Garamond", body: "Jost" },
} as const;

export type Brand = typeof brand;

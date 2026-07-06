import type { Lead, Property, Viewing } from "../types";

/**
 * Seed data loaded into the store on first run (and whenever the demo is
 * reset from dashboard settings). All prices in NGN, in the ₦85M–₦650M band.
 * Every image path points to a real photograph under /public/images.
 */

const DAY = 24 * 60 * 60 * 1000;
const now = Date.now();

export const seedProperties: Property[] = [
  {
    id: "osborne",
    title: "No. 4 Osborne Foreshore",
    area: "Ikoyi",
    type: "Maisonette",
    priceNGN: 380_000_000,
    bedrooms: 4,
    bathrooms: 4.5,
    areaSqm: 385,
    status: "For Sale",
    featured: true,
    shortDesc:
      "A serene waterfront maisonette on Osborne Foreshore — old-money Ikoyi at its quietest and most assured.",
    longDesc:
      "Set behind mature landscaping on the Osborne Foreshore Estate, No. 4 is a four-bedroom maisonette designed for people who value calm over noise. Double-height living volumes open to a private terrace and pool deck with lagoon views. The kitchen is fully fitted in oak and stone, the primary suite reads like a boutique hotel, and every bathroom is finished in book-matched marble. 24-hour estate security, backup power, and a two-car garage complete an address that rarely comes to market.",
    features: [
      "Private pool & lagoon-view terrace",
      "Fitted oak & stone kitchen",
      "En-suite primary with walk-in dressing",
      "Marble bathrooms throughout",
      "24hr estate security & backup power",
      "Two-car garage",
    ],
    images: [
      "/images/osborne/exterior.jpg",
      "/images/osborne/living.jpg",
      "/images/osborne/kitchen.jpg",
      "/images/osborne/primary.jpg",
      "/images/osborne/bathroom.jpg",
      "/images/osborne/pool.jpg",
    ],
    createdAt: now - 6 * DAY,
  },
  {
    id: "banana",
    title: "Sky Penthouse, Banana Island",
    area: "Banana Island",
    type: "Penthouse",
    priceNGN: 650_000_000,
    bedrooms: 5,
    bathrooms: 6,
    areaSqm: 520,
    status: "For Sale",
    featured: true,
    shortDesc:
      "A full-floor penthouse crowning Banana Island, with wrap-around skyline and ocean views.",
    longDesc:
      "Occupying the entire top floor of a boutique Banana Island tower, this five-bedroom penthouse is Lagos living at altitude. Floor-to-ceiling glass frames the Atlantic on one side and the city skyline on the other. Entertain across a 90sqm reception, retreat to a marble-clad primary wing, and end the evening on the private rooftop with an infinity edge over the water. Private lift lobby, staff quarters, and four dedicated parking bays.",
    features: [
      "Full-floor, private lift lobby",
      "Rooftop infinity pool",
      "Floor-to-ceiling ocean & skyline glass",
      "Marble primary wing with dual dressing",
      "Chef's kitchen + prep kitchen",
      "Four dedicated parking bays",
    ],
    images: [
      "/images/banana/exterior.jpg",
      "/images/banana/living.jpg",
      "/images/banana/kitchen.jpg",
      "/images/banana/primary.jpg",
      "/images/banana/bathroom.jpg",
      "/images/banana/pool.jpg",
    ],
    createdAt: now - 12 * DAY,
  },
  {
    id: "lekki",
    title: "The Grove Duplex, Lekki Phase 1",
    area: "Lekki Phase 1",
    type: "Duplex",
    priceNGN: 295_000_000,
    bedrooms: 5,
    bathrooms: 5,
    areaSqm: 450,
    status: "For Sale",
    featured: false,
    shortDesc:
      "A crisp, modern five-bedroom detached duplex with a garden pool in the heart of Lekki Phase 1.",
    longDesc:
      "The Grove is a newly-built detached duplex on a quiet inner street of Lekki Phase 1. Warm minimalism runs throughout — wide oak floors, a double-volume stairwell, and a seamless kitchen-to-garden flow. All five bedrooms are en-suite; the ground floor offers a guest suite and study. Outside, a landscaped garden wraps a private pool. Fully serviced with borehole, treatment plant and inverter backup.",
    features: [
      "Garden pool & landscaped grounds",
      "All bedrooms en-suite",
      "Ground-floor guest suite & study",
      "Wide oak flooring throughout",
      "Borehole + water treatment",
      "Inverter & generator backup",
    ],
    images: [
      "/images/lekki/exterior.jpg",
      "/images/lekki/living.jpg",
      "/images/lekki/kitchen.jpg",
      "/images/lekki/primary.jpg",
      "/images/lekki/bathroom.jpg",
      "/images/lekki/pool.jpg",
    ],
    createdAt: now - 9 * DAY,
  },
  {
    id: "vi",
    title: "Waterside Apartment, Victoria Island",
    area: "Victoria Island",
    type: "Apartment",
    priceNGN: 85_000_000,
    bedrooms: 3,
    bathrooms: 3,
    areaSqm: 210,
    status: "For Rent",
    featured: false,
    shortDesc:
      "A bright three-bedroom apartment moments from the water, in the middle of Victoria Island's business core.",
    longDesc:
      "A well-proportioned three-bedroom apartment in a serviced VI block, walking distance to the marina and the island's best restaurants. Open-plan reception with a compact fitted kitchen, generous bedrooms with fitted wardrobes, and a shared rooftop lounge. Ideal for an executive tenant who wants to step out of the door and into the city. Price quoted per annum.",
    features: [
      "Serviced building, 24hr security",
      "Shared rooftop lounge",
      "Fitted wardrobes throughout",
      "Walk to marina & restaurants",
      "Covered parking",
      "Backup power included",
    ],
    images: [
      "/images/vi/exterior.jpg",
      "/images/vi/living.jpg",
      "/images/vi/kitchen.jpg",
      "/images/vi/primary.jpg",
      "/images/vi/bathroom.jpg",
      "/images/vi/view.jpg",
    ],
    createdAt: now - 4 * DAY,
  },
  {
    id: "ikoyi",
    title: "Bourdillon Sky Residence",
    area: "Ikoyi",
    type: "Apartment",
    priceNGN: 210_000_000,
    bedrooms: 3,
    bathrooms: 4,
    areaSqm: 240,
    status: "For Sale",
    featured: false,
    shortDesc:
      "A refined three-bedroom residence off Bourdillon Road, with a residents' pool and concierge.",
    longDesc:
      "One of just eight residences in a low-density Bourdillon development, this apartment pairs a warm material palette with genuine day-to-day ease. A generous reception opens to a covered balcony; the primary suite has a spa-style bathroom and walk-in dressing. Residents share a landscaped pool deck and enjoy full concierge, valet parking and a private gym.",
    features: [
      "Residents' pool & landscaped deck",
      "Concierge & valet parking",
      "Private residents' gym",
      "Spa-style primary bathroom",
      "Covered balcony",
      "Smart-home lighting & climate",
    ],
    images: [
      "/images/ikoyi/exterior.jpg",
      "/images/ikoyi/living.jpg",
      "/images/ikoyi/kitchen.jpg",
      "/images/ikoyi/primary.jpg",
      "/images/ikoyi/bathroom.jpg",
      "/images/ikoyi/pool.jpg",
    ],
    createdAt: now - 2 * DAY,
  },
  {
    id: "shortlet",
    title: "Palms Short-let, Lekki",
    area: "Lekki Phase 1",
    type: "Short-let",
    priceNGN: 120_000_000,
    bedrooms: 2,
    bathrooms: 2,
    areaSqm: 120,
    status: "For Rent",
    featured: false,
    shortDesc:
      "A styled two-bedroom short-let for executive stays and film shoots — fully furnished, move-in ready.",
    longDesc:
      "A design-led two-bedroom short-let kept in show-home condition for corporate stays, relocations and shoots. Furnished throughout with a curated palette, fast wifi, a fully equipped kitchen and hotel-grade linens. Flexible terms from a week upward; housekeeping and airport pickup can be arranged. Price shown is the indicative annual value; nightly and monthly rates on request.",
    features: [
      "Fully furnished & styled",
      "Fast fibre wifi & smart TV",
      "Hotel-grade linens & housekeeping",
      "Fully equipped kitchen",
      "Flexible weekly / monthly terms",
      "Airport pickup on request",
    ],
    images: [
      "/images/shortlet/exterior.jpg",
      "/images/shortlet/living.jpg",
      "/images/shortlet/kitchen.jpg",
      "/images/shortlet/primary.jpg",
      "/images/shortlet/bathroom.jpg",
      "/images/shortlet/lounge.jpg",
    ],
    createdAt: now - 1 * DAY,
  },
];

export const seedLeads: Lead[] = [
  {
    id: "lead-tunde",
    name: "Tunde Balogun",
    phone: "+234 803 555 0192",
    source: "Property Page",
    interestArea: "Ikoyi",
    maxBudgetNGN: 400_000_000,
    minBedrooms: 4,
    propertyId: "osborne",
    preferredDay: "Saturday",
    status: "Viewing Booked",
    createdAt: now - 3 * DAY,
    autoReplied: true,
    thread: [
      {
        from: "lead",
        text: "Hi Aha Homes, I'd like to book a viewing for No. 4 Osborne Foreshore.",
        at: now - 3 * DAY,
      },
      {
        from: "auto",
        text: "Thanks Tunde! This is Aha Homes — I've got your request for No. 4 Osborne Foreshore and I'll confirm your viewing shortly. 🌿",
        at: now - 3 * DAY + 1500,
      },
      {
        from: "agent",
        text: "Saturday 11am works on my side — shall I lock it in?",
        at: now - 2 * DAY,
      },
      { from: "lead", text: "Perfect, see you then.", at: now - 2 * DAY + 3600_000 },
    ],
  },
  {
    id: "lead-chidinma",
    name: "Chidinma Eze",
    phone: "+234 809 555 0244",
    source: "Ad Landing Page",
    interestArea: "Banana Island",
    maxBudgetNGN: 700_000_000,
    minBedrooms: 5,
    propertyId: "banana",
    status: "Contacted",
    createdAt: now - 2 * DAY,
    autoReplied: true,
    thread: [
      {
        from: "lead",
        text: "Saw your ad — interested in the Banana Island penthouse.",
        at: now - 2 * DAY,
      },
      {
        from: "auto",
        text: "Thanks Chidinma! This is Aha Homes — I've got your interest in the Sky Penthouse, Banana Island and I'll be in touch shortly. 🌿",
        at: now - 2 * DAY + 1400,
      },
      {
        from: "agent",
        text: "Hi Chidinma — it's still available. Would a weekday or weekend viewing suit you better?",
        at: now - 2 * DAY + 7200_000,
      },
    ],
  },
  {
    id: "lead-ade",
    name: "Ade Williams",
    phone: "+234 701 555 0311",
    source: "Lead Magnet",
    interestArea: "Ikoyi",
    maxBudgetNGN: 400_000_000,
    minBedrooms: 3,
    status: "New",
    createdAt: now - 6 * 60 * 60 * 1000,
    autoReplied: true,
    thread: [
      {
        from: "lead",
        text: "Please send the list of 7 Ikoyi homes under ₦400M.",
        at: now - 6 * 60 * 60 * 1000,
      },
      {
        from: "auto",
        text: "Thanks Ade! Your private Ikoyi shortlist is on its way to your WhatsApp now. 🌿 — Aha Homes",
        at: now - 6 * 60 * 60 * 1000 + 1600,
      },
    ],
  },
  {
    id: "lead-ngozi",
    name: "Ngozi Okafor",
    phone: "+234 802 555 0407",
    source: "Website",
    interestArea: "Lekki Phase 1",
    maxBudgetNGN: 300_000_000,
    minBedrooms: 5,
    propertyId: "lekki",
    status: "Won",
    createdAt: now - 15 * DAY,
    autoReplied: true,
    thread: [
      {
        from: "lead",
        text: "We'd love to see The Grove Duplex in Lekki Phase 1.",
        at: now - 15 * DAY,
      },
      {
        from: "auto",
        text: "Thanks Ngozi! This is Aha Homes — I've got your request for The Grove Duplex and I'll confirm your viewing shortly. 🌿",
        at: now - 15 * DAY + 1500,
      },
      {
        from: "agent",
        text: "So glad it was the one. Congratulations again — keys next week! 🎉",
        at: now - 8 * DAY,
      },
    ],
  },
];

export const seedViewings: Viewing[] = [
  {
    id: "view-tunde",
    leadId: "lead-tunde",
    propertyId: "osborne",
    day: "Saturday",
    time: "11:00",
    status: "Confirmed",
  },
  {
    id: "view-ngozi",
    leadId: "lead-ngozi",
    propertyId: "lekki",
    day: "Monday",
    time: "16:00",
    status: "Completed",
  },
];

export type PropertyType =
  | "Apartment"
  | "Duplex"
  | "Maisonette"
  | "Penthouse"
  | "Land"
  | "Short-let";

export type PropertyStatus = "For Sale" | "For Rent" | "Sold";

export type Property = {
  id: string;
  title: string;
  area: string;
  type: PropertyType;
  priceNGN: number;
  bedrooms: number;
  bathrooms: number;
  areaSqm: number;
  status: PropertyStatus;
  shortDesc: string;
  longDesc: string;
  features: string[];
  images: string[]; // local paths under /public/images
  featured: boolean;
  createdAt: number;
};

export type LeadSource =
  | "Website"
  | "Ad Landing Page"
  | "Property Page"
  | "Lead Magnet";

export type LeadStatus =
  | "New"
  | "Contacted"
  | "Viewing Booked"
  | "Won"
  | "Lost";

export type ThreadMessage = {
  from: "lead" | "agent" | "auto";
  text: string;
  at: number;
};

export type Lead = {
  id: string;
  name: string;
  phone: string;
  source: LeadSource;
  interestArea?: string;
  maxBudgetNGN?: number;
  minBedrooms?: number;
  propertyId?: string;
  preferredDay?: string;
  status: LeadStatus;
  createdAt: number;
  autoReplied: boolean;
  thread: ThreadMessage[];
};

export type ViewingStatus = "Requested" | "Confirmed" | "Completed";

export type Viewing = {
  id: string;
  leadId: string;
  propertyId: string;
  day: string;
  time: string;
  status: ViewingStatus;
};

/** An automation event surfaced in the dashboard live activity feed. */
export type ActivityEvent = {
  id: string;
  kind:
    | "lead"
    | "auto-reply"
    | "match"
    | "viewing"
    | "status"
    | "property"
    | "reminder";
  text: string;
  at: number;
};

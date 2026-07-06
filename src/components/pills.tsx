import type { LeadSource, LeadStatus, PropertyStatus } from "../types";

const leadStatusStyles: Record<LeadStatus, string> = {
  New: "bg-brass/15 text-brass",
  Contacted: "bg-sage/20 text-pine",
  "Viewing Booked": "bg-pine/15 text-pine",
  Won: "bg-emerald-100 text-emerald-800",
  Lost: "bg-rose-100 text-rose-700",
};

export function LeadStatusPill({ status }: { status: LeadStatus }) {
  return <span className={`pill ${leadStatusStyles[status]}`}>{status}</span>;
}

const sourceStyles: Record<LeadSource, string> = {
  Website: "bg-stone-soft text-pine",
  "Ad Landing Page": "bg-brass/15 text-brass",
  "Property Page": "bg-pine/10 text-pine",
  "Lead Magnet": "bg-sage/20 text-pine",
};

export function SourcePill({ source }: { source: LeadSource }) {
  return <span className={`pill ${sourceStyles[source]}`}>{source}</span>;
}

const propStatusStyles: Record<PropertyStatus, string> = {
  "For Sale": "bg-pine text-bone",
  "For Rent": "bg-brass text-bone",
  Sold: "bg-ink/70 text-bone",
};

export function PropertyStatusPill({ status }: { status: PropertyStatus }) {
  return <span className={`pill ${propStatusStyles[status]}`}>{status}</span>;
}

/** Small "Automation" / "Auto-reply" tag used across the agent surfaces. */
export function AutomationTag({ label = "Automation" }: { label?: string }) {
  return (
    <span className="pill bg-brass/10 text-brass">
      <span aria-hidden>⚡</span>
      {label}
    </span>
  );
}

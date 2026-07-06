import type { Lead, Property } from "../types";

/**
 * A lead "matches" a newly-published property when:
 *  - the lead's interest area matches the property's area (if specified), and
 *  - the lead's max budget is >= the property price (if specified), and
 *  - the lead's minimum bedrooms is satisfied (if specified).
 * Won/Lost leads are never re-notified.
 */
export function leadMatchesProperty(lead: Lead, p: Property): boolean {
  if (lead.status === "Won" || lead.status === "Lost") return false;

  if (lead.interestArea && !areasMatch(lead.interestArea, p.area)) return false;
  if (lead.maxBudgetNGN != null && p.priceNGN > lead.maxBudgetNGN) return false;
  if (lead.minBedrooms != null && p.bedrooms < lead.minBedrooms) return false;

  return true;
}

function areasMatch(a: string, b: string): boolean {
  const na = a.trim().toLowerCase();
  const nb = b.trim().toLowerCase();
  return na === nb || nb.includes(na) || na.includes(nb);
}

export function matchingLeads(leads: Lead[], p: Property): Lead[] {
  return leads.filter((l) => leadMatchesProperty(l, p));
}

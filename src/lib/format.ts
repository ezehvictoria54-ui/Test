import { brand } from "../brand.config";
import type { Property } from "../types";

/** Format a naira amount compactly, e.g. ₦380M, ₦1.2B, ₦85M. */
export function formatPrice(n: number): string {
  const c = brand.currency;
  if (n >= 1_000_000_000) {
    const b = n / 1_000_000_000;
    return `${c}${trim(b)}B`;
  }
  if (n >= 1_000_000) {
    const m = n / 1_000_000;
    return `${c}${trim(m)}M`;
  }
  if (n >= 1_000) return `${c}${trim(n / 1000)}K`;
  return `${c}${n.toLocaleString()}`;
}

/** Full price with a per-annum / per-night suffix depending on the listing. */
export function formatPriceWithSuffix(p: Property): string {
  const base = formatPrice(p.priceNGN);
  if (p.status === "For Rent" && p.type === "Short-let") return `${base}/yr`;
  if (p.status === "For Rent") return `${base}/yr`;
  return base;
}

function trim(n: number): string {
  // one decimal only when it adds information
  return n % 1 === 0 ? String(n) : n.toFixed(1);
}

/** e.g. "2 days ago", "3 hours ago", "just now". */
export function timeAgo(at: number): string {
  const s = Math.max(0, Math.floor((Date.now() - at) / 1000));
  if (s < 45) return "just now";
  const m = Math.floor(s / 60);
  if (m < 60) return `${m} min${m === 1 ? "" : "s"} ago`;
  const h = Math.floor(m / 60);
  if (h < 24) return `${h} hour${h === 1 ? "" : "s"} ago`;
  const d = Math.floor(h / 24);
  if (d < 30) return `${d} day${d === 1 ? "" : "s"} ago`;
  const mo = Math.floor(d / 30);
  return `${mo} month${mo === 1 ? "" : "s"} ago`;
}

/** Clock time for thread bubbles, e.g. "14:32". */
export function clock(at: number): string {
  return new Date(at).toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });
}

/** Nicely format a bathroom count that may be a half (4.5). */
export function formatBaths(n: number): string {
  return n % 1 === 0 ? String(n) : n.toFixed(1);
}

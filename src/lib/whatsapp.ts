import { brand } from "../brand.config";

/**
 * REAL touchpoint. Builds a wa.me click-to-chat URL to the brand number with
 * a pre-filled, URL-encoded message. Opening this on a live call genuinely
 * launches WhatsApp — no Business API required.
 */
export function waLink(message: string, phone: string = brand.whatsappNumber): string {
  const digits = phone.replace(/[^\d]/g, "");
  return `https://wa.me/${digits}?text=${encodeURIComponent(message)}`;
}

/** Open a click-to-chat window in a new tab. */
export function openWhatsApp(message: string, phone?: string): void {
  window.open(waLink(message, phone), "_blank", "noopener,noreferrer");
}

/** Pre-filled buyer message for a property enquiry. */
export function bookingMessage(propertyTitle: string): string {
  return `Hi ${brand.agencyName}, I'd like to book a viewing for ${propertyTitle}.`;
}

/** Pre-filled buyer message for the lead-magnet guide. */
export function guideMessage(): string {
  return `Hi ${brand.agencyName}, please send me your private list of 7 Ikoyi homes under ₦400M.`;
}

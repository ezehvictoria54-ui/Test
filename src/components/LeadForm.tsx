import { motion } from "framer-motion";
import { CheckCircle2, Loader2, MessageCircle } from "lucide-react";
import { useState } from "react";
import { brand } from "../brand.config";
import { openWhatsApp } from "../lib/whatsapp";
import { useStore } from "../store/StoreContext";
import type { Lead, LeadSource, Property } from "../types";

type Props = {
  source: LeadSource;
  property?: Property;
  /** Optional extra fields for the lead-magnet form. */
  variant?: "booking" | "guide";
  /** Message shown while the WhatsApp tab opens. */
  successNote?: string;
  /** Pre-filled WhatsApp message; falls back to a sensible default. */
  waMessage: string;
  ctaLabel?: string;
  compact?: boolean;
};

const areas = ["Ikoyi", "Lekki Phase 1", "Victoria Island", "Banana Island"];

export default function LeadForm({
  source,
  property,
  variant = "booking",
  successNote,
  waMessage,
  ctaLabel = "Book a viewing",
  compact = false,
}: Props) {
  const { addLead } = useStore();
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [area, setArea] = useState(property?.area ?? "Ikoyi");
  const [budget, setBudget] = useState("");
  const [preferredDay, setPreferredDay] = useState("Saturday");
  const [submitting, setSubmitting] = useState(false);
  const [done, setDone] = useState<Lead | null>(null);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!name.trim() || !phone.trim()) return;
    setSubmitting(true);

    // Small delay so the button state reads as a real submit.
    window.setTimeout(() => {
      const lead = addLead({
        name: name.trim(),
        phone: phone.trim(),
        source,
        interestArea: variant === "guide" ? area : property?.area ?? area,
        maxBudgetNGN: budget ? Number(budget) : property?.priceNGN,
        minBedrooms: property?.bedrooms,
        propertyId: property?.id,
        preferredDay: variant === "booking" ? preferredDay : undefined,
      });
      setSubmitting(false);
      setDone(lead);
      // REAL click-to-chat opens in a new tab.
      openWhatsApp(waMessage);
    }, 550);
  }

  if (done) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        className="rounded-brass bg-pine p-6 text-bone"
      >
        <div className="flex items-center gap-3">
          <CheckCircle2 className="h-8 w-8 text-brass-bright" aria-hidden />
          <div>
            <p className="font-display text-2xl leading-tight">
              {variant === "guide" ? "On its way!" : "Request received!"}
            </p>
            <p className="text-sm text-stone/80">
              {successNote ??
                `Thanks ${done.name.split(" ")[0]} — we've opened WhatsApp so you can send your message to ${brand.agencyName} now.`}
            </p>
          </div>
        </div>
        <div className="mt-4 rounded-brass bg-white/10 p-3 text-sm text-stone/90">
          <span className="inline-flex items-center gap-2">
            <MessageCircle className="h-4 w-4 text-brass-bright" />
            WhatsApp didn't open?{" "}
            <button
              onClick={() => openWhatsApp(waMessage)}
              className="underline decoration-brass/60 underline-offset-2 hover:text-bone"
            >
              Tap here to chat
            </button>
          </span>
        </div>
        <p className="mt-3 text-xs uppercase tracking-[0.14em] text-brass-bright">
          ⚡ Auto-reply on its way to your thread
        </p>
      </motion.div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className={compact ? "space-y-4" : "grid gap-4 sm:grid-cols-2"}>
        <label className="block">
          <span className="field-label">Full name</span>
          <input
            className="field"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="e.g. Tunde Balogun"
            required
            autoComplete="name"
          />
        </label>
        <label className="block">
          <span className="field-label">WhatsApp number</span>
          <input
            className="field"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            placeholder="+234 …"
            required
            inputMode="tel"
            autoComplete="tel"
          />
        </label>
      </div>

      {variant === "guide" && (
        <div className="grid gap-4 sm:grid-cols-2">
          <label className="block">
            <span className="field-label">Preferred area</span>
            <select
              className="field"
              value={area}
              onChange={(e) => setArea(e.target.value)}
            >
              {areas.map((a) => (
                <option key={a}>{a}</option>
              ))}
            </select>
          </label>
          <label className="block">
            <span className="field-label">Max budget (₦)</span>
            <select
              className="field"
              value={budget}
              onChange={(e) => setBudget(e.target.value)}
            >
              <option value="">Any</option>
              <option value="150000000">Up to ₦150M</option>
              <option value="300000000">Up to ₦300M</option>
              <option value="400000000">Up to ₦400M</option>
              <option value="700000000">Up to ₦700M</option>
            </select>
          </label>
        </div>
      )}

      {variant === "booking" && (
        <label className="block">
          <span className="field-label">Preferred viewing day</span>
          <select
            className="field"
            value={preferredDay}
            onChange={(e) => setPreferredDay(e.target.value)}
          >
            {["Saturday", "Sunday", "Weekday morning", "Weekday evening"].map(
              (d) => (
                <option key={d}>{d}</option>
              ),
            )}
          </select>
        </label>
      )}

      <button type="submit" className="btn-brass w-full" disabled={submitting}>
        {submitting ? (
          <>
            <Loader2 className="h-4 w-4 animate-spin" aria-hidden />
            Sending…
          </>
        ) : (
          <>
            <MessageCircle className="h-4 w-4" aria-hidden />
            {ctaLabel}
          </>
        )}
      </button>
      <p className="text-center text-xs text-ink/50">
        Submitting opens WhatsApp to {brand.agencyName}. No spam — just a real
        reply.
      </p>
    </form>
  );
}

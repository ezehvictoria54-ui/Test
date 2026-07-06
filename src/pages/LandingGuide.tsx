import { motion } from "framer-motion";
import { Check, Download, Lock } from "lucide-react";
import { Link } from "react-router-dom";
import { brand } from "../brand.config";
import LeadForm from "../components/LeadForm";
import { guideMessage } from "../lib/whatsapp";

const perks = [
  "7 handpicked Ikoyi homes, all under ₦400M",
  "Honest notes on each — the good and the compromises",
  "Off-market options you won't see on the portals",
  "Delivered to your WhatsApp in under a minute",
];

/** Lead-magnet landing page — the classic "download the guide" funnel. */
export default function LandingGuide() {
  return (
    <div className="min-h-screen bg-stone text-ink">
      <div className="container-edge flex items-center justify-between py-5">
        <Link to="/" className="font-display text-xl text-pine">
          {brand.agencyName}
        </Link>
        <Link to="/listings" className="text-sm text-pine/70 hover:text-pine">
          Browse listings →
        </Link>
      </div>

      <div className="container-edge grid items-center gap-12 py-10 lg:grid-cols-2 lg:py-16">
        <div>
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="eyebrow"
          >
            Free buyer's guide
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.05 }}
            className="mt-2 font-display text-4xl leading-tight text-pine sm:text-5xl"
          >
            Get our private list of{" "}
            <span className="italic text-brass">7 Ikoyi homes under ₦400M</span>
          </motion.h1>
          <p className="mt-4 max-w-md text-lg text-ink/70">
            The shortlist we send serious buyers — beautiful homes in Lagos' most
            established address, curated by {brand.agentName}.
          </p>

          <ul className="mt-7 space-y-3">
            {perks.map((p) => (
              <li key={p} className="flex items-start gap-3">
                <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-brass/15 text-brass">
                  <Check className="h-4 w-4" />
                </span>
                <span className="text-ink/80">{p}</span>
              </li>
            ))}
          </ul>

          <div className="mt-8 hidden items-center gap-3 rounded-brass bg-white p-4 shadow-sm ring-1 ring-pine/5 lg:flex">
            <img
              src={brand.agentAvatar}
              alt={brand.agentName}
              className="h-12 w-12 rounded-full object-cover"
            />
            <p className="text-sm text-ink/70">
              Curated personally by{" "}
              <strong className="text-pine">{brand.agentName}</strong>,{" "}
              {brand.agentRole} of {brand.agencyName}.
            </p>
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="rounded-brass bg-pine p-8 text-bone shadow-2xl"
        >
          <div className="mb-2 flex items-center gap-2 text-brass-bright">
            <Download className="h-5 w-5" />
            <span className="text-xs font-medium uppercase tracking-[0.14em]">
              Instant delivery
            </span>
          </div>
          <h2 className="font-display text-3xl">Send it to my WhatsApp</h2>
          <p className="mt-1 text-sm text-stone/75">
            Enter your details and the shortlist arrives on WhatsApp right away.
          </p>

          <div className="mt-6 rounded-brass bg-bone p-5 text-ink">
            <LeadForm
              source="Lead Magnet"
              variant="guide"
              waMessage={guideMessage()}
              ctaLabel="Send to my WhatsApp"
              successNote="Sending to your WhatsApp now — check your chats! We've opened a message to us so you can grab it instantly."
              compact
            />
          </div>

          <p className="mt-4 flex items-center justify-center gap-2 text-xs text-stone/60">
            <Lock className="h-3.5 w-3.5" /> Your number stays private. No spam,
            ever.
          </p>
        </motion.div>
      </div>
    </div>
  );
}

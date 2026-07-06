import { motion } from "framer-motion";
import { BadgeCheck, Check, Star } from "lucide-react";
import { Link, useParams } from "react-router-dom";
import { brand } from "../brand.config";
import LeadForm from "../components/LeadForm";
import { formatBaths, formatPriceWithSuffix } from "../lib/format";
import { bookingMessage } from "../lib/whatsapp";
import { useStore } from "../store/StoreContext";
import NotFound from "./NotFound";

/**
 * Distraction-free, single-goal ad landing page (the target of a paid
 * Facebook/Instagram ad). No shared nav — one form above the fold.
 */
export default function LandingProperty() {
  const { id } = useParams();
  const { state } = useStore();
  const property = state.properties.find((p) => p.id === id);

  if (!property) return <NotFound />;

  const sellingPoints = property.features.slice(0, 3);

  return (
    <div className="min-h-screen bg-pine-deep text-bone">
      {/* Minimal brand bar */}
      <div className="container-edge flex items-center justify-between py-5">
        <Link to="/" className="font-display text-xl text-bone">
          {brand.agencyName}
        </Link>
        <span className="hidden text-xs uppercase tracking-[0.16em] text-brass-bright sm:block">
          {property.area}, {brand.city}
        </span>
      </div>

      <div className="container-edge grid items-center gap-10 pb-16 lg:grid-cols-2">
        {/* Hero + hook */}
        <div>
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="overflow-hidden rounded-brass shadow-2xl"
          >
            <img
              src={property.images[0]}
              alt={property.title}
              className="aspect-[16/10] w-full object-cover"
            />
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.05 }}
            className="mt-6 font-display text-4xl leading-tight sm:text-5xl"
          >
            {property.status === "For Rent" ? "Live in" : "Own"} {property.title}
            <span className="block text-brass-bright">
              from {formatPriceWithSuffix(property)}
            </span>
          </motion.h1>
          <p className="mt-3 text-lg text-stone/80">{property.shortDesc}</p>

          <ul className="mt-6 space-y-3">
            {sellingPoints.map((pt) => (
              <li key={pt} className="flex items-start gap-3">
                <Check className="mt-0.5 h-5 w-5 shrink-0 text-brass-bright" />
                <span className="text-stone/90">{pt}</span>
              </li>
            ))}
          </ul>

          <div className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-stone/70">
            <span>{property.bedrooms} bedrooms</span>
            <span>{formatBaths(property.bathrooms)} bathrooms</span>
            <span>{property.areaSqm}m²</span>
          </div>

          {/* Social proof */}
          <div className="mt-6 flex items-center gap-3 rounded-brass bg-white/5 p-4 ring-1 ring-white/10">
            <div className="flex text-brass-bright" aria-hidden>
              {Array.from({ length: 5 }).map((_, i) => (
                <Star key={i} className="h-4 w-4 fill-current" />
              ))}
            </div>
            <p className="text-sm text-stone/80">
              “Booked our viewing on a Sunday night and had keys within the month.”
              — a recent {brand.agencyName} buyer
            </p>
          </div>
        </div>

        {/* The one form, above the fold */}
        <div className="lg:sticky lg:top-8">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="rounded-brass bg-bone p-7 text-ink shadow-2xl"
          >
            <div className="mb-1 flex items-center gap-2 text-brass">
              <BadgeCheck className="h-5 w-5" />
              <span className="text-xs font-medium uppercase tracking-[0.14em]">
                Priority viewing
              </span>
            </div>
            <h2 className="font-display text-3xl text-pine">
              Book your private viewing
            </h2>
            <p className="mt-1 text-sm text-ink/60">
              Enter your details — we'll reply on WhatsApp straight away.
            </p>
            <div className="mt-5">
              <LeadForm
                source="Ad Landing Page"
                property={property}
                variant="booking"
                waMessage={bookingMessage(property.title)}
                ctaLabel="Get priority viewing"
                compact
              />
            </div>
          </motion.div>
          <p className="mt-4 text-center text-xs text-stone/50">
            <Link to={`/property/${property.id}`} className="underline hover:text-bone">
              See the full listing →
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

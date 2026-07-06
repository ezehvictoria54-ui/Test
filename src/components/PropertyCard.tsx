import { motion } from "framer-motion";
import { BedDouble, Bath, Maximize, MapPin } from "lucide-react";
import { Link } from "react-router-dom";
import { formatBaths, formatPriceWithSuffix } from "../lib/format";
import type { Property } from "../types";
import { PropertyStatusPill } from "./pills";

export default function PropertyCard({ property }: { property: Property }) {
  return (
    <motion.article
      whileHover={{ y: -4 }}
      transition={{ type: "spring", stiffness: 300, damping: 24 }}
      className="card group flex flex-col"
    >
      <Link
        to={`/property/${property.id}`}
        className="block focus-visible:outline-none"
        aria-label={`${property.title} in ${property.area}`}
      >
        <div className="relative aspect-[4/3] overflow-hidden">
          <img
            src={property.images[0]}
            alt={`${property.title} — ${property.area}`}
            loading="lazy"
            className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
          />
          <div className="absolute left-3 top-3">
            <PropertyStatusPill status={property.status} />
          </div>
          {property.featured && (
            <div className="absolute right-3 top-3">
              <span className="pill bg-brass-bright text-pine-deep">Featured</span>
            </div>
          )}
        </div>
      </Link>

      <div className="flex flex-1 flex-col p-5">
        <div className="flex items-center gap-1.5 text-xs uppercase tracking-[0.12em] text-brass">
          <MapPin className="h-3.5 w-3.5" aria-hidden />
          {property.area} · {property.type}
        </div>
        <h3 className="mt-1.5 font-display text-2xl leading-tight text-pine">
          <Link
            to={`/property/${property.id}`}
            className="transition-colors hover:text-brass"
          >
            {property.title}
          </Link>
        </h3>
        <p className="mt-2 line-clamp-2 text-sm text-ink/70">
          {property.shortDesc}
        </p>

        <div className="mt-4 flex items-center gap-4 border-t border-pine/10 pt-4 text-sm text-ink/70">
          <span className="inline-flex items-center gap-1.5">
            <BedDouble className="h-4 w-4 text-sage" aria-hidden />
            {property.bedrooms} bd
          </span>
          <span className="inline-flex items-center gap-1.5">
            <Bath className="h-4 w-4 text-sage" aria-hidden />
            {formatBaths(property.bathrooms)} ba
          </span>
          <span className="inline-flex items-center gap-1.5">
            <Maximize className="h-4 w-4 text-sage" aria-hidden />
            {property.areaSqm}m²
          </span>
        </div>

        <div className="mt-4 flex items-end justify-between">
          <p className="font-display text-2xl text-pine">
            {formatPriceWithSuffix(property)}
          </p>
          <Link
            to={`/property/${property.id}`}
            className="text-xs font-medium uppercase tracking-[0.14em] text-brass transition-colors hover:text-pine"
          >
            View →
          </Link>
        </div>
      </div>
    </motion.article>
  );
}

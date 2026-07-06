import { motion } from "framer-motion";
import {
  ArrowLeft,
  Bath,
  BedDouble,
  Check,
  Maximize,
  Ruler,
} from "lucide-react";
import { Link, useParams } from "react-router-dom";
import { brand } from "../brand.config";
import Gallery from "../components/Gallery";
import LeadForm from "../components/LeadForm";
import MapBlock from "../components/MapBlock";
import Reveal from "../components/Reveal";
import WhatsAppButton from "../components/WhatsAppButton";
import { PropertyStatusPill } from "../components/pills";
import { formatBaths, formatPriceWithSuffix } from "../lib/format";
import { bookingMessage } from "../lib/whatsapp";
import { useStore } from "../store/StoreContext";
import NotFound from "./NotFound";

export default function PropertyPage() {
  const { id } = useParams();
  const { state } = useStore();
  const property = state.properties.find((p) => p.id === id);

  if (!property) return <NotFound />;

  const stats = [
    { icon: BedDouble, label: "Bedrooms", value: property.bedrooms },
    { icon: Bath, label: "Bathrooms", value: formatBaths(property.bathrooms) },
    { icon: Maximize, label: "Interior", value: `${property.areaSqm}m²` },
    { icon: Ruler, label: "Type", value: property.type },
  ];

  return (
    <article className="bg-bone pb-20">
      {/* Hero */}
      <section className="relative h-[70vh] min-h-[460px] w-full overflow-hidden">
        <img
          src={property.images[0]}
          alt={`${property.title}, ${property.area}`}
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-pine-deep/90 via-pine-deep/30 to-pine-deep/40" />
        <div className="container-edge relative flex h-full flex-col justify-end pb-10 pt-24">
          <Link
            to="/listings"
            className="mb-auto inline-flex w-fit items-center gap-2 rounded-brass bg-black/30 px-3 py-2 text-sm text-bone backdrop-blur transition-colors hover:bg-black/50"
          >
            <ArrowLeft className="h-4 w-4" /> All listings
          </Link>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="mb-3 flex items-center gap-3">
              <PropertyStatusPill status={property.status} />
              <span className="text-sm uppercase tracking-[0.14em] text-brass-bright">
                {property.area} · {property.type}
              </span>
            </div>
            <h1 className="max-w-3xl font-display text-4xl text-bone sm:text-6xl">
              {property.title}
            </h1>
            <p className="mt-4 font-display text-3xl text-brass-bright sm:text-4xl">
              {formatPriceWithSuffix(property)}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Stat strip */}
      <section className="border-b border-pine/10 bg-white">
        <div className="container-edge grid grid-cols-2 gap-6 py-6 sm:grid-cols-4">
          {stats.map((s) => (
            <div key={s.label} className="flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-full bg-stone text-pine">
                <s.icon className="h-5 w-5" aria-hidden />
              </div>
              <div>
                <p className="text-xs uppercase tracking-[0.12em] text-ink/50">
                  {s.label}
                </p>
                <p className="font-display text-xl text-pine">{s.value}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <div className="container-edge grid gap-12 py-14 lg:grid-cols-[1fr_380px]">
        {/* Main column */}
        <div className="space-y-14">
          <Reveal>
            <p className="eyebrow">Overview</p>
            <h2 className="mt-2 font-display text-3xl text-pine">
              About this home
            </h2>
            <p className="mt-4 leading-relaxed text-ink/75">{property.longDesc}</p>
          </Reveal>

          <Reveal>
            <p className="eyebrow">Gallery</p>
            <h2 className="mb-5 mt-2 font-display text-3xl text-pine">
              Take a look inside
            </h2>
            <Gallery images={property.images} title={property.title} />
          </Reveal>

          <Reveal>
            <p className="eyebrow">Features</p>
            <h2 className="mb-5 mt-2 font-display text-3xl text-pine">
              What you'll love
            </h2>
            <ul className="grid gap-3 sm:grid-cols-2">
              {property.features.map((f) => (
                <li
                  key={f}
                  className="flex items-start gap-3 rounded-brass bg-white p-4 ring-1 ring-pine/5"
                >
                  <Check className="mt-0.5 h-5 w-5 shrink-0 text-brass" aria-hidden />
                  <span className="text-sm text-ink/80">{f}</span>
                </li>
              ))}
            </ul>
          </Reveal>

          <Reveal>
            <p className="eyebrow">Location</p>
            <h2 className="mb-5 mt-2 font-display text-3xl text-pine">
              {property.area}, Lagos
            </h2>
            <MapBlock area={property.area} />
          </Reveal>
        </div>

        {/* Sticky booking column */}
        <aside className="lg:sticky lg:top-24 lg:h-fit">
          <div className="rounded-brass bg-white p-6 shadow-lg ring-1 ring-pine/5">
            <p className="font-display text-2xl text-pine">Book a viewing</p>
            <p className="mt-1 text-sm text-ink/60">
              Submit and we'll confirm on WhatsApp — usually within minutes.
            </p>
            <div className="mt-5">
              <LeadForm
                source="Property Page"
                property={property}
                variant="booking"
                waMessage={bookingMessage(property.title)}
                ctaLabel="Book a viewing"
                compact
                successNote={`Thanks — we've opened WhatsApp so you can send your viewing request for ${property.title} straight to ${brand.agencyName}.`}
              />
            </div>
          </div>

          <div className="mt-6 rounded-brass bg-pine p-6 text-bone">
            <div className="flex items-center gap-3">
              <img
                src={brand.agentAvatar}
                alt={brand.agentName}
                className="h-14 w-14 rounded-full object-cover ring-2 ring-brass"
              />
              <div>
                <p className="font-display text-xl">{brand.agentName}</p>
                <p className="text-xs uppercase tracking-[0.12em] text-brass-bright">
                  {brand.agentRole}, {brand.agencyName}
                </p>
              </div>
            </div>
            <p className="mt-4 text-sm text-stone/80">
              Prefer to chat first? Message me directly about {property.title}.
            </p>
            <WhatsAppButton
              message={bookingMessage(property.title)}
              className="mt-4 w-full"
            />
          </div>
        </aside>
      </div>
    </article>
  );
}

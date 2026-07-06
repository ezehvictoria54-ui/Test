import { motion } from "framer-motion";
import { Link as LinkIcon, MessageCircle, ShieldCheck, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { brand } from "../brand.config";
import PropertyCard from "../components/PropertyCard";
import Reveal from "../components/Reveal";
import SearchBar from "../components/SearchBar";
import { useStore } from "../store/StoreContext";

const heroImage = "/images/osborne/pool.jpg";

const valueProps = [
  {
    icon: LinkIcon,
    title: "One link, not 25 photos",
    body: "Every listing is a single, elegant link you can drop into a DM, an ad, or a status. Buyers see the whole home in one place.",
  },
  {
    icon: MessageCircle,
    title: "Instant replies, day & night",
    body: "The moment a buyer enquires, they get a warm WhatsApp reply — even at 2am. Speed-to-lead wins deals.",
  },
  {
    icon: ShieldCheck,
    title: "Never lose a lead",
    body: "Every enquiry lands in one dashboard with its source, budget and follow-ups tracked. Nothing slips through.",
  },
];

export default function Home() {
  const { state } = useStore();
  const featured = state.properties.filter((p) => p.featured).slice(0, 3);
  const fill = state.properties
    .filter((p) => !p.featured)
    .slice(0, Math.max(0, 3 - featured.length));
  const showcase = [...featured, ...fill].slice(0, 3);

  return (
    <div>
      {/* Hero */}
      <section className="relative flex min-h-[92vh] items-center justify-center overflow-hidden">
        <img
          src={heroImage}
          alt="A waterfront luxury home in Lagos at dusk"
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-pine-deep/80 via-pine-deep/45 to-pine-deep/85" />

        <div className="container-edge relative z-10 pt-24 text-center">
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="eyebrow text-brass-bright"
          >
            {brand.city} · Luxury Real Estate
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.05 }}
            className="mx-auto mt-3 max-w-3xl font-display text-5xl leading-[1.05] text-bone sm:text-6xl md:text-7xl"
          >
            {brand.city}' finest addresses,
            <span className="italic text-brass-bright"> one link away</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.12 }}
            className="mx-auto mt-5 max-w-xl text-lg text-stone/85"
          >
            Curated homes in Ikoyi, Lekki, Victoria Island and Banana Island —
            booked, not browsed. Find yours and speak to us on WhatsApp in
            seconds.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="mx-auto mt-8 max-w-3xl"
          >
            <SearchBar />
          </motion.div>
        </div>
      </section>

      {/* Featured listings */}
      <section className="bg-bone py-20">
        <div className="container-edge">
          <Reveal className="mb-10 flex flex-wrap items-end justify-between gap-4">
            <div>
              <p className="eyebrow">Handpicked</p>
              <h2 className="mt-1 font-display text-4xl text-pine">
                Featured residences
              </h2>
            </div>
            <Link
              to="/listings"
              className="inline-flex items-center gap-2 text-sm font-medium uppercase tracking-[0.14em] text-brass hover:text-pine"
            >
              View all listings <ArrowRight className="h-4 w-4" />
            </Link>
          </Reveal>

          <div className="grid gap-6 md:grid-cols-3">
            {showcase.map((p, i) => (
              <Reveal key={p.id} delay={i * 0.08}>
                <PropertyCard property={p} />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* How Aha works for you */}
      <section className="bg-pine py-20 text-bone">
        <div className="container-edge">
          <Reveal className="text-center">
            <p className="eyebrow text-brass-bright">Why {brand.agencyName}</p>
            <h2 className="mx-auto mt-2 max-w-2xl font-display text-4xl">
              How Aha works for you
            </h2>
          </Reveal>
          <div className="mt-12 grid gap-8 md:grid-cols-3">
            {valueProps.map((v, i) => (
              <Reveal key={v.title} delay={i * 0.08}>
                <div className="rounded-brass border border-white/10 bg-white/5 p-7">
                  <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-full bg-brass text-pine-deep">
                    <v.icon className="h-5 w-5" aria-hidden />
                  </div>
                  <h3 className="font-display text-2xl">{v.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-stone/80">
                    {v.body}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Agent strip */}
      <section className="bg-stone py-20">
        <div className="container-edge grid items-center gap-10 md:grid-cols-[280px_1fr]">
          <Reveal>
            <img
              src={brand.agentAvatar}
              alt={brand.agentName}
              className="mx-auto aspect-square w-56 rounded-brass object-cover shadow-xl md:w-full"
            />
          </Reveal>
          <Reveal delay={0.1}>
            <p className="eyebrow">Your agent</p>
            <h2 className="mt-2 font-display text-4xl text-pine">
              {brand.agentName}
            </h2>
            <p className="mt-1 text-sm uppercase tracking-[0.14em] text-brass">
              {brand.agentRole}, {brand.agencyName}
            </p>
            <p className="mt-4 max-w-xl text-ink/75">
              “I built {brand.agencyName} for buyers who value their time. No
              endless photo dumps, no chasing agents — just the right homes,
              beautifully presented, with a real reply on WhatsApp the moment you
              reach out.”
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Link to="/listings" className="btn-outline">
                Browse listings
              </Link>
              <Link to="/lp/guide" className="btn-brass">
                Get the free Ikoyi guide
              </Link>
            </div>
          </Reveal>
        </div>
      </section>
    </div>
  );
}

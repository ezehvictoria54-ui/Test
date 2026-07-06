import { Award, HeartHandshake, MapPin, Timer } from "lucide-react";
import { Link } from "react-router-dom";
import { brand } from "../brand.config";
import Reveal from "../components/Reveal";
import WhatsAppButton from "../components/WhatsAppButton";

const values = [
  {
    icon: Timer,
    title: "Speed to lead",
    body: "We reply in seconds, not days. The best homes move fast — so do we.",
  },
  {
    icon: HeartHandshake,
    title: "Honesty first",
    body: "We tell you the compromises, not just the highlights. Trust closes deals.",
  },
  {
    icon: Award,
    title: "Curated, not endless",
    body: "A tight portfolio of homes we'd happily live in ourselves. No noise.",
  },
];

export default function About() {
  return (
    <div className="bg-bone pb-20 pt-24">
      <div className="container-edge">
        <Reveal className="mx-auto max-w-2xl text-center">
          <p className="eyebrow">About us</p>
          <h1 className="mt-2 font-display text-4xl text-pine sm:text-5xl">
            {brand.tagline}
          </h1>
          <p className="mt-4 text-lg text-ink/70">
            {brand.agencyName} is a boutique {brand.city} agency built on a simple
            idea: buying a beautiful home should feel calm, quick and personal —
            not like a chase.
          </p>
        </Reveal>

        <div className="mx-auto mt-14 grid max-w-4xl items-center gap-10 md:grid-cols-[300px_1fr]">
          <Reveal>
            <img
              src={brand.agentAvatar}
              alt={brand.agentName}
              className="mx-auto aspect-square w-64 rounded-brass object-cover shadow-xl md:w-full"
            />
          </Reveal>
          <Reveal delay={0.1}>
            <p className="eyebrow">Founder</p>
            <h2 className="mt-2 font-display text-3xl text-pine">
              {brand.agentName}
            </h2>
            <p className="mt-4 text-ink/75">
              After a decade selling Lagos' finest addresses, {brand.agentName}{" "}
              founded {brand.agencyName} to do things differently — fewer
              listings, deeper care, and a WhatsApp reply for every single
              enquiry. Every home on this site is one she'd stand behind.
            </p>
            <div className="mt-5 flex items-center gap-2 text-sm text-brass">
              <MapPin className="h-4 w-4" /> Based in {brand.city}, working across
              Ikoyi, Lekki, VI & Banana Island.
            </div>
          </Reveal>
        </div>

        <div className="mt-16 grid gap-6 md:grid-cols-3">
          {values.map((v, i) => (
            <Reveal key={v.title} delay={i * 0.08}>
              <div className="h-full rounded-brass bg-white p-7 ring-1 ring-pine/5">
                <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-full bg-pine text-brass-bright">
                  <v.icon className="h-5 w-5" />
                </div>
                <h3 className="font-display text-2xl text-pine">{v.title}</h3>
                <p className="mt-2 text-sm text-ink/70">{v.body}</p>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal className="mt-16 rounded-brass bg-pine p-10 text-center text-bone">
          <h2 className="font-display text-3xl">Ready to find your address?</h2>
          <p className="mx-auto mt-2 max-w-lg text-stone/80">
            Browse the portfolio or message us directly — we'll help you find the
            right home, fast.
          </p>
          <div className="mt-6 flex flex-wrap justify-center gap-3">
            <Link to="/listings" className="btn-brass">
              Browse listings
            </Link>
            <WhatsAppButton
              message={`Hi ${brand.agencyName}, I'd like some help finding a home.`}
            />
          </div>
        </Reveal>
      </div>
    </div>
  );
}

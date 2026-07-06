import { Instagram, Mail, MessageCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { brand } from "../brand.config";
import { waLink } from "../lib/whatsapp";

export default function Footer() {
  return (
    <footer className="bg-pine-deep text-stone">
      <div className="container-edge grid gap-10 py-14 md:grid-cols-4">
        <div className="md:col-span-2">
          <p className="font-display text-2xl text-bone">{brand.agencyName}</p>
          <p className="mt-2 max-w-sm text-sm text-stone/70">{brand.tagline}</p>
          <p className="mt-4 text-sm text-stone/60">
            {brand.agentName} · {brand.agentRole} · {brand.city}
          </p>
        </div>

        <div>
          <p className="eyebrow mb-3">Explore</p>
          <ul className="space-y-2 text-sm">
            <li>
              <Link to="/listings" className="hover:text-bone">
                All listings
              </Link>
            </li>
            <li>
              <Link to="/lp/guide" className="hover:text-bone">
                Free Ikoyi guide
              </Link>
            </li>
            <li>
              <Link to="/about" className="hover:text-bone">
                About us
              </Link>
            </li>
            <li>
              <Link to="/agent" className="hover:text-bone">
                Agent login
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <p className="eyebrow mb-3">Contact</p>
          <ul className="space-y-3 text-sm">
            <li>
              <a
                href={waLink(`Hi ${brand.agencyName}, I have a question about a listing.`)}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 hover:text-bone"
              >
                <MessageCircle className="h-4 w-4 text-brass" /> WhatsApp
              </a>
            </li>
            <li>
              <a
                href={`mailto:${brand.email}`}
                className="inline-flex items-center gap-2 hover:text-bone"
              >
                <Mail className="h-4 w-4 text-brass" /> {brand.email}
              </a>
            </li>
            <li>
              <a
                href={brand.instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 hover:text-bone"
              >
                <Instagram className="h-4 w-4 text-brass" /> {brand.instagram}
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="container-edge flex flex-col items-center justify-between gap-2 py-5 text-xs text-stone/50 sm:flex-row">
          <p>
            © {new Date().getFullYear()} {brand.agencyName}. Demo system — “The
            Listing Engine”.
          </p>
          <p>Photography for demonstration only · see CREDITS.md</p>
        </div>
      </div>
    </footer>
  );
}

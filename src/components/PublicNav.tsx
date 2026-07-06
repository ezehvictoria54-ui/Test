import { AnimatePresence, motion } from "framer-motion";
import { Menu, X } from "lucide-react";
import { useEffect, useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { brand } from "../brand.config";

const links = [
  { to: "/", label: "Home" },
  { to: "/listings", label: "Listings" },
  { to: "/lp/guide", label: "Free Guide" },
  { to: "/about", label: "About" },
];

export default function PublicNav() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { pathname } = useLocation();

  useEffect(() => setOpen(false), [pathname]);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const solid = scrolled || pathname !== "/";

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-colors duration-300 ${
        solid ? "bg-pine/95 shadow-md backdrop-blur" : "bg-transparent"
      }`}
    >
      <nav className="container-edge flex h-16 items-center justify-between">
        <Link
          to="/"
          className="font-display text-xl text-bone transition-opacity hover:opacity-80"
        >
          {brand.agencyName}
        </Link>

        <div className="hidden items-center gap-1 md:flex">
          {links.map((l) => (
            <NavLink
              key={l.to}
              to={l.to}
              end={l.to === "/"}
              className={({ isActive }) =>
                `rounded-brass px-3 py-2 font-body text-sm tracking-wide transition-colors ${
                  isActive
                    ? "text-brass-bright"
                    : "text-stone/90 hover:text-bone"
                }`
              }
            >
              {l.label}
            </NavLink>
          ))}
          <Link
            to="/agent"
            className="ml-2 rounded-brass border border-brass/60 px-4 py-2 font-body text-xs font-medium uppercase tracking-[0.14em] text-brass-bright transition-colors hover:bg-brass hover:text-pine-deep"
          >
            Agent Login
          </Link>
        </div>

        <button
          className="rounded-brass p-2 text-bone md:hidden"
          onClick={() => setOpen((o) => !o)}
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
        >
          {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </nav>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="overflow-hidden bg-pine md:hidden"
          >
            <div className="container-edge flex flex-col gap-1 py-4">
              {links.map((l) => (
                <NavLink
                  key={l.to}
                  to={l.to}
                  end={l.to === "/"}
                  className={({ isActive }) =>
                    `rounded-brass px-3 py-3 font-body text-base transition-colors ${
                      isActive ? "text-brass-bright" : "text-stone/90"
                    }`
                  }
                >
                  {l.label}
                </NavLink>
              ))}
              <Link
                to="/agent"
                className="mt-2 rounded-brass border border-brass/60 px-4 py-3 text-center font-body text-sm font-medium uppercase tracking-[0.14em] text-brass-bright"
              >
                Agent Login
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

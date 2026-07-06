import { AnimatePresence, motion } from "framer-motion";
import {
  CalendarClock,
  Home,
  LayoutDashboard,
  LogOut,
  Menu,
  PlusCircle,
  Building2,
  Users,
  X,
} from "lucide-react";
import { useEffect, useState } from "react";
import {
  Link,
  NavLink,
  Outlet,
  useLocation,
  useNavigate,
} from "react-router-dom";
import { brand } from "../brand.config";
import { logout } from "./auth";

const nav = [
  { to: "/agent/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { to: "/agent/properties", label: "Properties", icon: Building2 },
  { to: "/agent/properties/new", label: "Add property", icon: PlusCircle },
  { to: "/agent/leads", label: "Leads", icon: Users },
  { to: "/agent/viewings", label: "Viewings", icon: CalendarClock },
];

export default function AgentLayout() {
  const [open, setOpen] = useState(false);
  const { pathname } = useLocation();
  const navigate = useNavigate();

  useEffect(() => setOpen(false), [pathname]);

  function signOut() {
    logout();
    navigate("/agent");
  }

  const SidebarInner = (
    <div className="flex h-full flex-col">
      <div className="px-6 py-6">
        <Link to="/agent/dashboard" className="font-display text-2xl text-bone">
          {brand.agencyName}
        </Link>
        <p className="mt-1 text-xs uppercase tracking-[0.16em] text-brass-bright">
          Agent Workspace
        </p>
      </div>

      <nav className="flex-1 space-y-1 px-3">
        {nav.map(({ to, label, icon: Icon }) => (
          <NavLink
            key={to}
            to={to}
            end={to === "/agent/properties"}
            className={({ isActive }) =>
              `flex items-center gap-3 rounded-brass px-3 py-2.5 font-body text-sm transition-colors ${
                isActive
                  ? "bg-brass text-pine-deep"
                  : "text-stone/80 hover:bg-white/10 hover:text-bone"
              }`
            }
          >
            <Icon className="h-4 w-4" aria-hidden />
            {label}
          </NavLink>
        ))}
      </nav>

      <div className="space-y-1 border-t border-white/10 px-3 py-4">
        <Link
          to="/"
          className="flex items-center gap-3 rounded-brass px-3 py-2.5 font-body text-sm text-stone/80 transition-colors hover:bg-white/10 hover:text-bone"
        >
          <Home className="h-4 w-4" aria-hidden />
          View public site
        </Link>
        <button
          onClick={signOut}
          className="flex w-full items-center gap-3 rounded-brass px-3 py-2.5 font-body text-sm text-stone/80 transition-colors hover:bg-white/10 hover:text-bone"
        >
          <LogOut className="h-4 w-4" aria-hidden />
          Sign out
        </button>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-stone lg:flex">
      {/* Desktop sidebar */}
      <aside className="sticky top-0 hidden h-screen w-64 shrink-0 bg-pine-deep lg:block">
        {SidebarInner}
      </aside>

      {/* Mobile top bar */}
      <div className="flex items-center justify-between bg-pine-deep px-4 py-3 lg:hidden">
        <Link to="/agent/dashboard" className="font-display text-xl text-bone">
          {brand.agencyName}
        </Link>
        <button
          onClick={() => setOpen(true)}
          className="rounded-brass p-2 text-bone"
          aria-label="Open menu"
        >
          <Menu className="h-6 w-6" />
        </button>
      </div>

      {/* Mobile drawer */}
      <AnimatePresence>
        {open && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-40 bg-black/50 lg:hidden"
              onClick={() => setOpen(false)}
            />
            <motion.aside
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "tween", duration: 0.25 }}
              className="fixed inset-y-0 left-0 z-50 w-64 bg-pine-deep lg:hidden"
            >
              <button
                onClick={() => setOpen(false)}
                className="absolute right-3 top-4 rounded p-1 text-stone/70 hover:text-bone"
                aria-label="Close menu"
              >
                <X className="h-6 w-6" />
              </button>
              {SidebarInner}
            </motion.aside>
          </>
        )}
      </AnimatePresence>

      <div className="flex-1">
        <main className="mx-auto max-w-6xl px-5 py-8 sm:px-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
}

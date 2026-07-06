import { motion } from "framer-motion";
import {
  Activity,
  Bell,
  Building2,
  CalendarClock,
  RotateCcw,
  TrendingUp,
  UserPlus,
  Zap,
} from "lucide-react";
import { Link } from "react-router-dom";
import { brand } from "../brand.config";
import Reveal from "../components/Reveal";
import { AutomationTag, LeadStatusPill, SourcePill } from "../components/pills";
import { useToast } from "../components/Toast";
import { formatPrice, timeAgo } from "../lib/format";
import { useStore } from "../store/StoreContext";
import type { ActivityEvent } from "../types";

const WEEK = 7 * 24 * 60 * 60 * 1000;

const activityIcon: Record<ActivityEvent["kind"], typeof Zap> = {
  lead: UserPlus,
  "auto-reply": Zap,
  match: Bell,
  viewing: CalendarClock,
  status: Activity,
  property: Building2,
  reminder: Bell,
};

export default function Dashboard() {
  const { state, resetDemo } = useStore();
  const { toast } = useToast();

  const newThisWeek = state.leads.filter(
    (l) => Date.now() - l.createdAt < WEEK,
  ).length;
  const viewingsBooked = state.viewings.filter(
    (v) => v.status !== "Completed",
  ).length;
  const pipeline = state.leads
    .filter((l) => l.status !== "Lost")
    .reduce((sum, l) => {
      const p = state.properties.find((x) => x.id === l.propertyId);
      return sum + (p?.priceNGN ?? l.maxBudgetNGN ?? 0);
    }, 0);

  const tiles = [
    {
      label: "New leads this week",
      value: newThisWeek,
      icon: UserPlus,
      to: "/agent/leads",
    },
    {
      label: "Total properties",
      value: state.properties.length,
      icon: Building2,
      to: "/agent/properties",
    },
    {
      label: "Viewings booked",
      value: viewingsBooked,
      icon: CalendarClock,
      to: "/agent/viewings",
    },
    {
      label: "Est. pipeline value",
      value: formatPrice(pipeline),
      icon: TrendingUp,
      to: "/agent/leads",
    },
  ];

  const recentLeads = [...state.leads]
    .sort((a, b) => b.createdAt - a.createdAt)
    .slice(0, 5);

  const weekViewings = state.viewings.filter((v) => v.status !== "Completed");

  function handleReset() {
    resetDemo();
    toast({
      tone: "info",
      title: "Demo data reset",
      body: "All properties, leads and viewings are back to their seed state.",
    });
  }

  return (
    <div>
      <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="eyebrow">Workspace</p>
          <h1 className="mt-1 font-display text-4xl text-pine">
            Welcome back, {brand.agentName.split(" ")[0]}
          </h1>
        </div>
        <button
          onClick={handleReset}
          className="inline-flex items-center gap-2 rounded-brass border border-pine/20 px-4 py-2 text-sm text-pine/70 transition-colors hover:border-pine hover:text-pine"
          title="Reset all demo data to its seed state"
        >
          <RotateCcw className="h-4 w-4" /> Reset demo data
        </button>
      </div>

      {/* Stat tiles */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {tiles.map((t, i) => (
          <Reveal key={t.label} delay={i * 0.05}>
            <Link
              to={t.to}
              className="block rounded-brass bg-white p-5 shadow-sm ring-1 ring-pine/5 transition-shadow hover:shadow-lg"
            >
              <div className="flex items-center justify-between">
                <span className="flex h-10 w-10 items-center justify-center rounded-full bg-stone text-pine">
                  <t.icon className="h-5 w-5" />
                </span>
              </div>
              <p className="mt-4 font-display text-3xl text-pine">{t.value}</p>
              <p className="text-xs uppercase tracking-[0.1em] text-ink/50">
                {t.label}
              </p>
            </Link>
          </Reveal>
        ))}
      </div>

      <div className="mt-8 grid gap-6 lg:grid-cols-[1fr_360px]">
        {/* Recent leads */}
        <div className="space-y-6">
          <section className="rounded-brass bg-white p-6 shadow-sm ring-1 ring-pine/5">
            <div className="mb-4 flex items-center justify-between">
              <h2 className="font-display text-2xl text-pine">Recent leads</h2>
              <Link
                to="/agent/leads"
                className="text-xs font-medium uppercase tracking-[0.12em] text-brass hover:text-pine"
              >
                View all →
              </Link>
            </div>
            <ul className="divide-y divide-pine/5">
              {recentLeads.map((l) => (
                <li
                  key={l.id}
                  className="flex flex-wrap items-center justify-between gap-3 py-3"
                >
                  <div>
                    <p className="font-medium text-pine">{l.name}</p>
                    <div className="mt-1 flex flex-wrap items-center gap-2">
                      <SourcePill source={l.source} />
                      {l.autoReplied && <AutomationTag label="Auto-replied" />}
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-xs text-ink/40">
                      {timeAgo(l.createdAt)}
                    </span>
                    <LeadStatusPill status={l.status} />
                  </div>
                </li>
              ))}
            </ul>
          </section>

          {/* This week viewings */}
          <section className="rounded-brass bg-white p-6 shadow-sm ring-1 ring-pine/5">
            <div className="mb-4 flex items-center justify-between">
              <h2 className="font-display text-2xl text-pine">
                This week's viewings
              </h2>
              <Link
                to="/agent/viewings"
                className="text-xs font-medium uppercase tracking-[0.12em] text-brass hover:text-pine"
              >
                View all →
              </Link>
            </div>
            {weekViewings.length === 0 ? (
              <p className="py-6 text-center text-sm text-ink/50">
                No upcoming viewings — move a lead to “Viewing Booked” to create
                one.
              </p>
            ) : (
              <ul className="space-y-3">
                {weekViewings.map((v) => {
                  const lead = state.leads.find((x) => x.id === v.leadId);
                  const prop = state.properties.find(
                    (x) => x.id === v.propertyId,
                  );
                  return (
                    <li
                      key={v.id}
                      className="flex items-center justify-between rounded-brass bg-stone/50 p-3"
                    >
                      <div>
                        <p className="font-medium text-pine">
                          {prop?.title ?? "Property"}
                        </p>
                        <p className="text-xs text-ink/60">
                          {lead?.name} · {v.day} {v.time}
                        </p>
                      </div>
                      <span className="pill bg-brass/15 text-brass">
                        <Bell className="h-3 w-3" /> Reminder set
                      </span>
                    </li>
                  );
                })}
              </ul>
            )}
          </section>
        </div>

        {/* Live activity feed */}
        <aside>
          <section className="rounded-brass bg-pine p-6 text-bone shadow-lg">
            <div className="mb-4 flex items-center gap-2">
              <span className="relative flex h-2.5 w-2.5">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-brass-bright opacity-75" />
                <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-brass-bright" />
              </span>
              <h2 className="font-display text-2xl">Live activity</h2>
            </div>
            <ol className="space-y-4">
              {state.activity.slice(0, 8).map((a) => {
                const Icon = activityIcon[a.kind];
                return (
                  <motion.li
                    key={a.id}
                    initial={{ opacity: 0, x: 8 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="flex gap-3"
                  >
                    <span className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-white/10 text-brass-bright">
                      <Icon className="h-4 w-4" />
                    </span>
                    <div className="min-w-0">
                      <p className="text-sm text-stone/90">{a.text}</p>
                      <p className="text-xs text-stone/50">{timeAgo(a.at)}</p>
                    </div>
                  </motion.li>
                );
              })}
            </ol>
            <p className="mt-5 border-t border-white/10 pt-4 text-xs text-stone/50">
              Automations run continuously — instant replies, match alerts,
              follow-ups and reminders.
            </p>
          </section>
        </aside>
      </div>
    </div>
  );
}

import { Bell, CalendarClock, Check, CheckCheck } from "lucide-react";
import Reveal from "../components/Reveal";
import { AutomationTag } from "../components/pills";
import { useStore } from "../store/StoreContext";
import type { Viewing } from "../types";

const statusStyle: Record<Viewing["status"], string> = {
  Requested: "bg-brass/15 text-brass",
  Confirmed: "bg-pine/10 text-pine",
  Completed: "bg-emerald-100 text-emerald-700",
};

export default function Viewings() {
  const { state, setViewingStatus } = useStore();

  const viewings = [...state.viewings].sort((a, b) => {
    const order = { Requested: 0, Confirmed: 1, Completed: 2 };
    return order[a.status] - order[b.status];
  });

  return (
    <div>
      <div className="mb-8">
        <p className="eyebrow">Schedule</p>
        <h1 className="mt-1 font-display text-4xl text-pine">Viewings</h1>
        <p className="mt-1 text-ink/60">
          Confirm and complete viewings. Reminders auto-send 24h & 2h before.
        </p>
      </div>

      {viewings.length === 0 ? (
        <div className="rounded-brass border border-dashed border-pine/20 bg-white/60 py-20 text-center">
          <CalendarClock className="mx-auto h-10 w-10 text-pine/30" />
          <p className="mt-3 font-display text-2xl text-pine">No viewings yet</p>
          <p className="mt-1 text-sm text-ink/60">
            Move a lead to “Viewing Booked” to schedule one automatically.
          </p>
        </div>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2">
          {viewings.map((v, i) => {
            const lead = state.leads.find((l) => l.id === v.leadId);
            const prop = state.properties.find((p) => p.id === v.propertyId);
            return (
              <Reveal key={v.id} delay={i * 0.05}>
                <div className="rounded-brass bg-white p-5 shadow-sm ring-1 ring-pine/5">
                  <div className="flex items-start gap-4">
                    {prop && (
                      <img
                        src={prop.images[0]}
                        alt=""
                        className="h-16 w-20 shrink-0 rounded object-cover"
                      />
                    )}
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center justify-between gap-2">
                        <p className="truncate font-medium text-pine">
                          {prop?.title ?? "Property"}
                        </p>
                        <span className={`pill ${statusStyle[v.status]}`}>
                          {v.status}
                        </span>
                      </div>
                      <p className="mt-0.5 text-sm text-ink/60">
                        {lead?.name} · {lead?.phone}
                      </p>
                      <p className="mt-2 inline-flex items-center gap-1.5 text-sm text-pine">
                        <CalendarClock className="h-4 w-4 text-brass" />
                        {v.day}, {v.time}
                      </p>
                    </div>
                  </div>

                  <div className="mt-3 flex items-center gap-2 rounded-brass bg-stone/40 px-3 py-2">
                    <AutomationTag label="Reminder" />
                    <span className="text-xs text-ink/60">
                      Auto-sends 24h &amp; 2h before
                    </span>
                  </div>

                  <div className="mt-4 flex gap-2">
                    {v.status === "Requested" && (
                      <button
                        onClick={() => setViewingStatus(v.id, "Confirmed")}
                        className="btn-outline flex-1 py-2"
                      >
                        <Check className="h-4 w-4" /> Confirm
                      </button>
                    )}
                    {v.status === "Confirmed" && (
                      <button
                        onClick={() => setViewingStatus(v.id, "Completed")}
                        className="btn-brass flex-1 py-2"
                      >
                        <CheckCheck className="h-4 w-4" /> Mark completed
                      </button>
                    )}
                    {v.status === "Completed" && (
                      <p className="flex flex-1 items-center justify-center gap-1.5 py-2 text-sm text-emerald-600">
                        <Bell className="h-4 w-4" /> Reminders sent · done
                      </p>
                    )}
                  </div>
                </div>
              </Reveal>
            );
          })}
        </div>
      )}
    </div>
  );
}

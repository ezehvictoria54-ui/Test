import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import { X } from "lucide-react";
import { AutomationTag, SourcePill } from "../components/pills";
import WhatsAppButton from "../components/WhatsAppButton";
import { brand } from "../brand.config";
import { clock, formatPrice, timeAgo } from "../lib/format";
import { useStore } from "../store/StoreContext";
import type { Lead, LeadStatus } from "../types";

const COLUMNS: LeadStatus[] = [
  "New",
  "Contacted",
  "Viewing Booked",
  "Won",
  "Lost",
];

const columnAccent: Record<LeadStatus, string> = {
  New: "border-t-brass",
  Contacted: "border-t-sage",
  "Viewing Booked": "border-t-pine",
  Won: "border-t-emerald-500",
  Lost: "border-t-rose-400",
};

export default function Leads() {
  const { state, setLeadStatus } = useStore();
  const [openLead, setOpenLead] = useState<string | null>(null);
  const [dragId, setDragId] = useState<string | null>(null);
  const [overCol, setOverCol] = useState<LeadStatus | null>(null);

  const lead = state.leads.find((l) => l.id === openLead) ?? null;

  function drop(status: LeadStatus) {
    if (dragId) setLeadStatus(dragId, status);
    setDragId(null);
    setOverCol(null);
  }

  return (
    <div>
      <div className="mb-8">
        <p className="eyebrow">Pipeline</p>
        <h1 className="mt-1 font-display text-4xl text-pine">Leads</h1>
        <p className="mt-1 text-ink/60">
          Drag a card between columns to update its stage — moving to “Viewing
          Booked” creates a viewing automatically.
        </p>
      </div>

      <div className="scroll-slim -mx-2 flex gap-4 overflow-x-auto px-2 pb-4">
        {COLUMNS.map((col) => {
          const leads = state.leads.filter((l) => l.status === col);
          return (
            <div
              key={col}
              onDragOver={(e) => {
                e.preventDefault();
                setOverCol(col);
              }}
              onDragLeave={() => setOverCol((c) => (c === col ? null : c))}
              onDrop={() => drop(col)}
              className={`flex w-72 shrink-0 flex-col rounded-brass border-t-4 bg-white/70 ${
                columnAccent[col]
              } ${overCol === col ? "ring-2 ring-brass" : "ring-1 ring-pine/5"}`}
            >
              <div className="flex items-center justify-between px-4 py-3">
                <h2 className="font-medium text-pine">{col}</h2>
                <span className="rounded-full bg-pine/10 px-2 py-0.5 text-xs text-pine">
                  {leads.length}
                </span>
              </div>
              <div className="flex-1 space-y-3 px-3 pb-4">
                {leads.map((l) => (
                  <LeadCard
                    key={l.id}
                    lead={l}
                    property={state.properties.find(
                      (p) => p.id === l.propertyId,
                    )}
                    onOpen={() => setOpenLead(l.id)}
                    onDragStart={() => setDragId(l.id)}
                    onDragEnd={() => setDragId(null)}
                  />
                ))}
                {leads.length === 0 && (
                  <p className="rounded-brass border border-dashed border-pine/15 py-6 text-center text-xs text-ink/40">
                    Drop leads here
                  </p>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Lead drawer */}
      <AnimatePresence>
        {lead && (
          <LeadDrawer
            lead={lead}
            propertyTitle={
              state.properties.find((p) => p.id === lead.propertyId)?.title
            }
            onClose={() => setOpenLead(null)}
            onStatus={(s) => setLeadStatus(lead.id, s)}
          />
        )}
      </AnimatePresence>
    </div>
  );
}

function LeadCard({
  lead,
  property,
  onOpen,
  onDragStart,
  onDragEnd,
}: {
  lead: Lead;
  property?: { title: string };
  onOpen: () => void;
  onDragStart: () => void;
  onDragEnd: () => void;
}) {
  return (
    <div
      draggable
      onDragStart={onDragStart}
      onDragEnd={onDragEnd}
      onClick={onOpen}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          onOpen();
        }
      }}
      className="cursor-grab rounded-brass bg-white p-3 shadow-sm ring-1 ring-pine/5 transition-shadow hover:shadow-md active:cursor-grabbing"
    >
      <div className="flex items-start justify-between gap-2">
        <p className="font-medium text-pine">{lead.name}</p>
        <span className="text-[0.65rem] text-ink/40">{timeAgo(lead.createdAt)}</span>
      </div>
      <p className="mt-0.5 text-xs text-ink/50">{lead.phone}</p>
      <div className="mt-2 flex flex-wrap gap-1.5">
        <SourcePill source={lead.source} />
        {lead.autoReplied && <AutomationTag label="Auto-replied" />}
      </div>
      <div className="mt-2 space-y-0.5 text-xs text-ink/60">
        {property && <p>Interest: {property.title}</p>}
        {!property && lead.interestArea && <p>Area: {lead.interestArea}</p>}
        {lead.maxBudgetNGN && <p>Budget: {formatPrice(lead.maxBudgetNGN)}</p>}
      </div>
    </div>
  );
}

function LeadDrawer({
  lead,
  propertyTitle,
  onClose,
  onStatus,
}: {
  lead: Lead;
  propertyTitle?: string;
  onClose: () => void;
  onStatus: (s: LeadStatus) => void;
}) {
  return (
    <>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-40 bg-black/40"
        onClick={onClose}
      />
      <motion.aside
        initial={{ x: "100%" }}
        animate={{ x: 0 }}
        exit={{ x: "100%" }}
        transition={{ type: "tween", duration: 0.28 }}
        className="fixed inset-y-0 right-0 z-50 flex w-full max-w-md flex-col bg-bone shadow-2xl"
        role="dialog"
        aria-modal="true"
        aria-label={`Lead: ${lead.name}`}
      >
        <div className="flex items-start justify-between border-b border-pine/10 bg-white p-5">
          <div>
            <h2 className="font-display text-2xl text-pine">{lead.name}</h2>
            <p className="text-sm text-ink/60">{lead.phone}</p>
            <div className="mt-2 flex flex-wrap gap-1.5">
              <SourcePill source={lead.source} />
              {lead.autoReplied && <AutomationTag label="Auto-replied" />}
            </div>
          </div>
          <button
            onClick={onClose}
            className="rounded p-1 text-ink/50 hover:bg-pine/5 hover:text-pine"
            aria-label="Close"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Meta + status control */}
        <div className="grid grid-cols-2 gap-3 border-b border-pine/10 bg-white px-5 py-4 text-sm">
          {propertyTitle && (
            <div className="col-span-2">
              <p className="text-xs uppercase tracking-[0.1em] text-ink/40">
                Interested in
              </p>
              <p className="text-pine">{propertyTitle}</p>
            </div>
          )}
          {lead.interestArea && (
            <div>
              <p className="text-xs uppercase tracking-[0.1em] text-ink/40">Area</p>
              <p className="text-pine">{lead.interestArea}</p>
            </div>
          )}
          {lead.maxBudgetNGN && (
            <div>
              <p className="text-xs uppercase tracking-[0.1em] text-ink/40">
                Budget
              </p>
              <p className="text-pine">{formatPrice(lead.maxBudgetNGN)}</p>
            </div>
          )}
          <label className="col-span-2 mt-1 block">
            <span className="field-label">Stage</span>
            <select
              className="field"
              value={lead.status}
              onChange={(e) => onStatus(e.target.value as LeadStatus)}
            >
              {COLUMNS.map((c) => (
                <option key={c}>{c}</option>
              ))}
            </select>
          </label>
        </div>

        {/* WhatsApp-style thread */}
        <div className="flex-1 space-y-3 overflow-y-auto bg-stone/40 p-5">
          <p className="text-center text-xs uppercase tracking-[0.14em] text-ink/40">
            WhatsApp thread
          </p>
          {lead.thread.map((m, i) => {
            const mine = m.from === "agent" || m.from === "auto";
            return (
              <div
                key={i}
                className={`flex ${mine ? "justify-end" : "justify-start"}`}
              >
                <div
                  className={`max-w-[80%] rounded-2xl px-3.5 py-2 text-sm shadow-sm ${
                    m.from === "lead"
                      ? "rounded-bl-sm bg-white text-ink"
                      : m.from === "auto"
                        ? "rounded-br-sm bg-brass/15 text-pine"
                        : "rounded-br-sm bg-[#DCF8C6] text-ink"
                  }`}
                >
                  {m.from === "auto" && (
                    <span className="mb-0.5 block text-[0.65rem] font-medium uppercase tracking-wide text-brass">
                      ⚡ Auto-reply
                    </span>
                  )}
                  <p>{m.text}</p>
                  <p className="mt-1 text-right text-[0.6rem] text-ink/40">
                    {clock(m.at)}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Follow-up drip status */}
        <div className="border-t border-pine/10 bg-white px-5 py-3 text-xs text-ink/60">
          <p className="mb-2 flex items-center gap-2">
            <AutomationTag label="Follow-up drip" />
          </p>
          <div className="flex flex-wrap gap-x-4 gap-y-1">
            <span className="text-emerald-600">Day 1 sent ✓</span>
            <span>Day 3 scheduled</span>
            <span>Day 7 scheduled</span>
          </div>
        </div>

        <div className="border-t border-pine/10 bg-white p-4">
          <WhatsAppButton
            message={`Hi ${lead.name.split(" ")[0]}, it's ${brand.agentName} from ${brand.agencyName}${
              propertyTitle ? ` about ${propertyTitle}` : ""
            }. When would suit you for a viewing?`}
            phone={lead.phone}
            className="w-full"
          >
            Message on WhatsApp
          </WhatsAppButton>
        </div>
      </motion.aside>
    </>
  );
}

import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useReducer,
  useRef,
  type ReactNode,
} from "react";
import { brand } from "../brand.config";
import { seedLeads, seedProperties, seedViewings } from "../data/seed";
import { uid } from "../lib/id";
import { matchingLeads } from "../lib/match";
import type {
  ActivityEvent,
  Lead,
  LeadStatus,
  Property,
  Viewing,
} from "../types";

const STORAGE_KEY = "listing-engine.v1";

type State = {
  properties: Property[];
  leads: Lead[];
  viewings: Viewing[];
  activity: ActivityEvent[];
};

type Action =
  | { type: "ADD_LEAD"; lead: Lead; activity: ActivityEvent }
  | { type: "AUTO_REPLY"; leadId: string; text: string; activity: ActivityEvent }
  | {
      type: "ADD_PROPERTY";
      property: Property;
      activity: ActivityEvent;
    }
  | {
      type: "SET_LEAD_STATUS";
      leadId: string;
      status: LeadStatus;
      viewing?: Viewing;
      activity: ActivityEvent;
    }
  | { type: "APPEND_MESSAGE"; leadId: string; from: "agent"; text: string }
  | {
      type: "SET_VIEWING_STATUS";
      viewingId: string;
      status: Viewing["status"];
      activity: ActivityEvent;
    }
  | { type: "RESET" };

function freshState(): State {
  return {
    properties: seedProperties.map((p) => ({ ...p })),
    leads: seedLeads.map((l) => ({ ...l, thread: [...l.thread] })),
    viewings: seedViewings.map((v) => ({ ...v })),
    activity: seedActivity(),
  };
}

function seedActivity(): ActivityEvent[] {
  const now = Date.now();
  return [
    {
      id: uid("act-"),
      kind: "auto-reply",
      text: "Instant auto-reply sent to Ade Williams",
      at: now - 6 * 60 * 60 * 1000,
    },
    {
      id: uid("act-"),
      kind: "lead",
      text: "New lead — Chidinma Eze via Ad Landing Page",
      at: now - 2 * 24 * 60 * 60 * 1000,
    },
    {
      id: uid("act-"),
      kind: "viewing",
      text: "Viewing confirmed — Tunde Balogun, No. 4 Osborne Foreshore",
      at: now - 2 * 24 * 60 * 60 * 1000,
    },
    {
      id: uid("act-"),
      kind: "reminder",
      text: "24h reminder scheduled for Saturday 11:00 viewing",
      at: now - 1 * 24 * 60 * 60 * 1000,
    },
  ];
}

function load(): State {
  if (typeof window === "undefined") return freshState();
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return freshState();
    const parsed = JSON.parse(raw) as State;
    if (!parsed.properties || !parsed.leads) return freshState();
    return {
      properties: parsed.properties,
      leads: parsed.leads,
      viewings: parsed.viewings ?? [],
      activity: parsed.activity ?? [],
    };
  } catch {
    return freshState();
  }
}

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case "ADD_LEAD":
      return {
        ...state,
        leads: [action.lead, ...state.leads],
        activity: [action.activity, ...state.activity],
      };

    case "AUTO_REPLY":
      return {
        ...state,
        leads: state.leads.map((l) =>
          l.id === action.leadId
            ? {
                ...l,
                autoReplied: true,
                thread: [
                  ...l.thread,
                  { from: "auto", text: action.text, at: Date.now() },
                ],
              }
            : l,
        ),
        activity: [action.activity, ...state.activity],
      };

    case "ADD_PROPERTY":
      return {
        ...state,
        properties: [action.property, ...state.properties],
        activity: [action.activity, ...state.activity],
      };

    case "SET_LEAD_STATUS":
      return {
        ...state,
        leads: state.leads.map((l) =>
          l.id === action.leadId ? { ...l, status: action.status } : l,
        ),
        viewings: action.viewing
          ? [action.viewing, ...state.viewings]
          : state.viewings,
        activity: [action.activity, ...state.activity],
      };

    case "APPEND_MESSAGE":
      return {
        ...state,
        leads: state.leads.map((l) =>
          l.id === action.leadId
            ? {
                ...l,
                thread: [
                  ...l.thread,
                  { from: action.from, text: action.text, at: Date.now() },
                ],
              }
            : l,
        ),
      };

    case "SET_VIEWING_STATUS":
      return {
        ...state,
        viewings: state.viewings.map((v) =>
          v.id === action.viewingId ? { ...v, status: action.status } : v,
        ),
        activity: [action.activity, ...state.activity],
      };

    case "RESET":
      return freshState();

    default:
      return state;
  }
}

/** Result returned to the caller of addProperty, used to drive the toast. */
export type PublishResult = { property: Property; matched: Lead[] };

type StoreApi = {
  state: State;
  /** Create a buyer lead + schedule the ~1s simulated auto-reply. */
  addLead: (input: NewLeadInput) => Lead;
  /** Publish a property, run the matching pass, return matched leads. */
  addProperty: (input: NewPropertyInput) => PublishResult;
  /** Change a lead's status; moving to "Viewing Booked" creates a Viewing. */
  setLeadStatus: (leadId: string, status: LeadStatus) => void;
  /** Append an agent message to a lead thread. */
  sendAgentMessage: (leadId: string, text: string) => void;
  setViewingStatus: (viewingId: string, status: Viewing["status"]) => void;
  resetDemo: () => void;
};

export type NewLeadInput = {
  name: string;
  phone: string;
  source: Lead["source"];
  interestArea?: string;
  maxBudgetNGN?: number;
  minBedrooms?: number;
  propertyId?: string;
  preferredDay?: string;
};

export type NewPropertyInput = Omit<Property, "id" | "createdAt" | "featured"> & {
  featured?: boolean;
};

const StoreContext = createContext<StoreApi | null>(null);

export function StoreProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(reducer, undefined, load);
  const stateRef = useRef(state);
  stateRef.current = state;

  // Persist to localStorage on every change.
  useEffect(() => {
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    } catch {
      /* storage may be unavailable; demo still runs in-memory */
    }
  }, [state]);

  const api = useMemo<StoreApi>(() => {
    function propertyLabel(propertyId?: string): string {
      const p = stateRef.current.properties.find((x) => x.id === propertyId);
      return p ? p.title : "your enquiry";
    }

    return {
      state,

      addLead(input) {
        const now = Date.now();
        const firstText =
          input.source === "Lead Magnet"
            ? "Please send me your private list of 7 Ikoyi homes under ₦400M."
            : `Hi ${brand.agencyName}, I'd like to book a viewing for ${propertyLabel(
                input.propertyId,
              )}.`;

        const lead: Lead = {
          id: uid("lead-"),
          name: input.name,
          phone: input.phone,
          source: input.source,
          interestArea: input.interestArea,
          maxBudgetNGN: input.maxBudgetNGN,
          minBedrooms: input.minBedrooms,
          propertyId: input.propertyId,
          preferredDay: input.preferredDay,
          status: "New",
          createdAt: now,
          autoReplied: false,
          thread: [{ from: "lead", text: firstText, at: now }],
        };

        dispatch({
          type: "ADD_LEAD",
          lead,
          activity: {
            id: uid("act-"),
            kind: "lead",
            text: `New lead — ${lead.name} via ${lead.source}`,
            at: now,
          },
        });

        // Simulated instant auto-reply (~1s later).
        const propLabel =
          input.source === "Lead Magnet"
            ? "your private Ikoyi shortlist"
            : propertyLabel(input.propertyId);
        const replyText =
          input.source === "Lead Magnet"
            ? `Thanks ${firstName(lead.name)}! Your private Ikoyi shortlist is on its way to your WhatsApp now. 🌿 — ${brand.agencyName}`
            : `Thanks ${firstName(lead.name)}! This is ${brand.agencyName} — I've got your request for ${propLabel} and I'll confirm your viewing shortly. 🌿`;

        window.setTimeout(() => {
          dispatch({
            type: "AUTO_REPLY",
            leadId: lead.id,
            text: replyText,
            activity: {
              id: uid("act-"),
              kind: "auto-reply",
              text: `Instant auto-reply sent to ${lead.name}`,
              at: Date.now(),
            },
          });
        }, 1100);

        return lead;
      },

      addProperty(input) {
        const property: Property = {
          ...input,
          id: uid("prop-"),
          featured: input.featured ?? false,
          createdAt: Date.now(),
        };
        const matched = matchingLeads(stateRef.current.leads, property);

        dispatch({
          type: "ADD_PROPERTY",
          property,
          activity: {
            id: uid("act-"),
            kind: "property",
            text:
              matched.length > 0
                ? `Published “${property.title}” — ${matched.length} matching buyer${
                    matched.length === 1 ? "" : "s"
                  } auto-notified`
                : `Published “${property.title}” to listings`,
            at: Date.now(),
          },
        });

        return { property, matched };
      },

      setLeadStatus(leadId, status) {
        const lead = stateRef.current.leads.find((l) => l.id === leadId);
        let viewing: Viewing | undefined;

        // Moving to "Viewing Booked" spins up a Viewing (if none exists yet).
        if (lead && status === "Viewing Booked" && lead.propertyId) {
          const already = stateRef.current.viewings.some(
            (v) => v.leadId === leadId,
          );
          if (!already) {
            viewing = {
              id: uid("view-"),
              leadId,
              propertyId: lead.propertyId,
              day: lead.preferredDay ?? "Saturday",
              time: "11:00",
              status: "Requested",
            };
          }
        }

        dispatch({
          type: "SET_LEAD_STATUS",
          leadId,
          status,
          viewing,
          activity: {
            id: uid("act-"),
            kind: viewing ? "viewing" : "status",
            text: viewing
              ? `Viewing created — ${lead?.name ?? "lead"}, ${propertyLabel(
                  lead?.propertyId,
                )}`
              : `${lead?.name ?? "Lead"} moved to “${status}”`,
            at: Date.now(),
          },
        });
      },

      sendAgentMessage(leadId, text) {
        dispatch({ type: "APPEND_MESSAGE", leadId, from: "agent", text });
      },

      setViewingStatus(viewingId, status) {
        const v = stateRef.current.viewings.find((x) => x.id === viewingId);
        dispatch({
          type: "SET_VIEWING_STATUS",
          viewingId,
          status,
          activity: {
            id: uid("act-"),
            kind: "viewing",
            text: `Viewing ${status.toLowerCase()} — ${propertyLabel(
              v?.propertyId,
            )}`,
            at: Date.now(),
          },
        });
      },

      resetDemo() {
        dispatch({ type: "RESET" });
      },
    };
  }, [state]);

  return <StoreContext.Provider value={api}>{children}</StoreContext.Provider>;
}

function firstName(full: string): string {
  return full.trim().split(/\s+/)[0] || full;
}

// eslint-disable-next-line react-refresh/only-export-components
export function useStore(): StoreApi {
  const ctx = useContext(StoreContext);
  if (!ctx) throw new Error("useStore must be used within <StoreProvider>");
  return ctx;
}

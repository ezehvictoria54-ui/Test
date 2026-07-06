import { AnimatePresence, motion } from "framer-motion";
import {
  createContext,
  useCallback,
  useContext,
  useState,
  type ReactNode,
} from "react";
import { CheckCircle2, X } from "lucide-react";
import { uid } from "../lib/id";

type Toast = {
  id: string;
  title: string;
  body?: ReactNode;
  tone: "success" | "info";
};

type ToastApi = {
  toast: (t: Omit<Toast, "id">) => void;
};

const ToastContext = createContext<ToastApi | null>(null);

export function ToastProvider({ children }: { children: ReactNode }) {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const remove = useCallback((id: string) => {
    setToasts((ts) => ts.filter((t) => t.id !== id));
  }, []);

  const toast = useCallback(
    (t: Omit<Toast, "id">) => {
      const id = uid("toast-");
      setToasts((ts) => [...ts, { ...t, id }]);
      window.setTimeout(() => remove(id), 6000);
    },
    [remove],
  );

  return (
    <ToastContext.Provider value={{ toast }}>
      {children}
      <div className="pointer-events-none fixed inset-x-0 bottom-0 z-[100] flex flex-col items-center gap-3 p-4 sm:items-end sm:p-6">
        <AnimatePresence>
          {toasts.map((t) => (
            <motion.div
              key={t.id}
              layout
              initial={{ opacity: 0, y: 24, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 12, scale: 0.98 }}
              transition={{ type: "spring", stiffness: 320, damping: 26 }}
              className="pointer-events-auto w-full max-w-sm overflow-hidden rounded-brass bg-pine text-bone shadow-2xl ring-1 ring-black/20"
            >
              <div className="flex items-start gap-3 p-4">
                <CheckCircle2
                  className="mt-0.5 h-5 w-5 shrink-0 text-brass-bright"
                  aria-hidden
                />
                <div className="min-w-0 flex-1">
                  <p className="font-display text-lg leading-tight">{t.title}</p>
                  {t.body ? (
                    <div className="mt-1 text-sm text-stone/90">{t.body}</div>
                  ) : null}
                </div>
                <button
                  onClick={() => remove(t.id)}
                  className="rounded p-1 text-stone/70 transition-colors hover:bg-white/10 hover:text-bone"
                  aria-label="Dismiss notification"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
              <motion.div
                className="h-1 bg-brass"
                initial={{ width: "100%" }}
                animate={{ width: "0%" }}
                transition={{ duration: 6, ease: "linear" }}
              />
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </ToastContext.Provider>
  );
}

// eslint-disable-next-line react-refresh/only-export-components
export function useToast(): ToastApi {
  const ctx = useContext(ToastContext);
  if (!ctx) throw new Error("useToast must be used within <ToastProvider>");
  return ctx;
}

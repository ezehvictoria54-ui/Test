import { MessageCircle } from "lucide-react";
import { waLink } from "../lib/whatsapp";

type Props = {
  message: string;
  phone?: string;
  children?: React.ReactNode;
  className?: string;
};

/**
 * Real click-to-chat link. Renders as an anchor so it works with keyboard,
 * middle-click and "open in new tab" — and genuinely opens WhatsApp live.
 */
export default function WhatsAppButton({
  message,
  phone,
  children = "Message on WhatsApp",
  className = "",
}: Props) {
  return (
    <a
      href={waLink(message, phone)}
      target="_blank"
      rel="noopener noreferrer"
      className={`inline-flex items-center justify-center gap-2 rounded-brass bg-[#25D366] px-5 py-3 font-body text-sm font-medium uppercase tracking-[0.12em] text-white transition-transform duration-200 hover:brightness-105 active:scale-[0.98] ${className}`}
    >
      <MessageCircle className="h-4 w-4" aria-hidden />
      {children}
    </a>
  );
}

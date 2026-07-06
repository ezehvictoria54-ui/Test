import { MapPin } from "lucide-react";

/**
 * Stylised, self-contained map block with a pin — no external map API.
 * Purely cosmetic: evokes location without a network call.
 */
export default function MapBlock({ area }: { area: string }) {
  return (
    <div className="relative h-64 overflow-hidden rounded-brass ring-1 ring-pine/10">
      <svg
        viewBox="0 0 400 260"
        className="h-full w-full"
        role="img"
        aria-label={`Stylised map showing ${area}, Lagos`}
      >
        <rect width="400" height="260" fill="#E2D9C9" />
        {/* lagoon / water */}
        <path
          d="M0 180 Q 120 150 220 190 T 400 175 L400 260 L0 260 Z"
          fill="#7C8B77"
          opacity="0.35"
        />
        {/* roads */}
        <g stroke="#16342A" strokeOpacity="0.16" strokeWidth="6" fill="none">
          <path d="M-10 70 L410 90" />
          <path d="M60 -10 L120 270" />
          <path d="M300 -10 L250 270" />
          <path d="M-10 130 L410 150" />
        </g>
        <g stroke="#16342A" strokeOpacity="0.08" strokeWidth="3" fill="none">
          <path d="M-10 40 L410 55" />
          <path d="M180 -10 L200 270" />
        </g>
        {/* blocks */}
        <g fill="#16342A" opacity="0.06">
          <rect x="140" y="100" width="40" height="26" />
          <rect x="200" y="98" width="34" height="30" />
          <rect x="150" y="40" width="30" height="24" />
          <rect x="230" y="140" width="40" height="24" />
        </g>
      </svg>

      <div className="absolute left-1/2 top-[42%] -translate-x-1/2 -translate-y-1/2">
        <span className="relative flex h-4 w-4">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-brass opacity-60" />
          <MapPin className="relative h-8 w-8 -translate-x-1/2 -translate-y-1/2 fill-brass text-pine-deep drop-shadow" />
        </span>
      </div>

      <div className="absolute bottom-3 left-3 rounded-brass bg-bone/90 px-3 py-1.5 text-xs font-medium uppercase tracking-[0.12em] text-pine shadow">
        {area}, Lagos
      </div>
    </div>
  );
}

import { AnimatePresence, motion } from "framer-motion";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import { useCallback, useEffect, useState } from "react";

/** Real-photo gallery with a lightbox. Keyboard: ←/→ to navigate, Esc closes. */
export default function Gallery({
  images,
  title,
}: {
  images: string[];
  title: string;
}) {
  const [lightbox, setLightbox] = useState<number | null>(null);

  const close = useCallback(() => setLightbox(null), []);
  const step = useCallback(
    (dir: number) =>
      setLightbox((i) =>
        i == null ? i : (i + dir + images.length) % images.length,
      ),
    [images.length],
  );

  useEffect(() => {
    if (lightbox == null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
      if (e.key === "ArrowRight") step(1);
      if (e.key === "ArrowLeft") step(-1);
    };
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [lightbox, close, step]);

  return (
    <>
      <div className="grid grid-cols-2 gap-2 sm:gap-3 md:grid-cols-4">
        {images.map((src, i) => (
          <button
            key={src}
            onClick={() => setLightbox(i)}
            className={`group relative overflow-hidden rounded-brass focus-visible:outline-offset-2 ${
              i === 0 ? "col-span-2 row-span-2 md:col-span-2 md:row-span-2" : ""
            }`}
            aria-label={`Open image ${i + 1} of ${images.length}`}
          >
            <img
              src={src}
              alt={`${title} — view ${i + 1}`}
              loading={i === 0 ? "eager" : "lazy"}
              className="aspect-[4/3] h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
            <span className="absolute inset-0 bg-pine/0 transition-colors group-hover:bg-pine/10" />
          </button>
        ))}
      </div>

      <AnimatePresence>
        {lightbox != null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[110] flex items-center justify-center bg-pine-deep/95 p-4"
            onClick={close}
            role="dialog"
            aria-modal="true"
            aria-label={`${title} image viewer`}
          >
            <button
              onClick={close}
              className="absolute right-4 top-4 rounded-full p-2 text-bone/80 hover:bg-white/10 hover:text-bone"
              aria-label="Close viewer"
            >
              <X className="h-7 w-7" />
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation();
                step(-1);
              }}
              className="absolute left-2 rounded-full p-2 text-bone/80 hover:bg-white/10 hover:text-bone sm:left-6"
              aria-label="Previous image"
            >
              <ChevronLeft className="h-9 w-9" />
            </button>
            <motion.img
              key={lightbox}
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              src={images[lightbox]}
              alt={`${title} — enlarged view ${lightbox + 1}`}
              className="max-h-[85vh] max-w-full rounded-brass object-contain shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            />
            <button
              onClick={(e) => {
                e.stopPropagation();
                step(1);
              }}
              className="absolute right-2 rounded-full p-2 text-bone/80 hover:bg-white/10 hover:text-bone sm:right-6"
              aria-label="Next image"
            >
              <ChevronRight className="h-9 w-9" />
            </button>
            <span className="absolute bottom-5 left-1/2 -translate-x-1/2 rounded-full bg-black/40 px-3 py-1 text-xs text-bone">
              {lightbox + 1} / {images.length}
            </span>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

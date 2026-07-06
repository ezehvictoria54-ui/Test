import { Check, ImagePlus, Loader2, Sparkles } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Reveal from "../components/Reveal";
import { useToast } from "../components/Toast";
import { formatPrice } from "../lib/format";
import { useStore } from "../store/StoreContext";
import type { PropertyStatus, PropertyType } from "../types";

const TYPES: PropertyType[] = [
  "Apartment",
  "Duplex",
  "Maisonette",
  "Penthouse",
  "Land",
  "Short-let",
];
const STATUSES: PropertyStatus[] = ["For Sale", "For Rent", "Sold"];
const AREAS = ["Ikoyi", "Lekki Phase 1", "Victoria Island", "Banana Island"];

/**
 * A ready-made image set the agent can attach with one click, so the "add
 * property" moment produces a real, photo-rich listing during a live demo
 * (no real upload backend required). Also supports real file uploads via
 * object URLs for the current session.
 */
const IMAGE_SETS: { label: string; images: string[] }[] = [
  {
    label: "Modern duplex",
    images: [
      "/images/lekki/exterior.jpg",
      "/images/lekki/living.jpg",
      "/images/lekki/kitchen.jpg",
      "/images/lekki/primary.jpg",
      "/images/lekki/bathroom.jpg",
      "/images/lekki/pool.jpg",
    ],
  },
  {
    label: "City apartment",
    images: [
      "/images/vi/exterior.jpg",
      "/images/vi/living.jpg",
      "/images/vi/kitchen.jpg",
      "/images/vi/primary.jpg",
      "/images/vi/bathroom.jpg",
      "/images/vi/view.jpg",
    ],
  },
  {
    label: "Waterfront penthouse",
    images: [
      "/images/banana/exterior.jpg",
      "/images/banana/living.jpg",
      "/images/banana/kitchen.jpg",
      "/images/banana/primary.jpg",
      "/images/banana/bathroom.jpg",
      "/images/banana/pool.jpg",
    ],
  },
];

export default function PropertyNew() {
  const { addProperty } = useStore();
  const { toast } = useToast();
  const navigate = useNavigate();

  const [title, setTitle] = useState("The Grove II, Lekki Phase 1");
  const [area, setArea] = useState("Lekki Phase 1");
  const [type, setType] = useState<PropertyType>("Duplex");
  const [status, setStatus] = useState<PropertyStatus>("For Sale");
  const [price, setPrice] = useState("290000000");
  const [bedrooms, setBedrooms] = useState("5");
  const [bathrooms, setBathrooms] = useState("5");
  const [areaSqm, setAreaSqm] = useState("440");
  const [shortDesc, setShortDesc] = useState(
    "A brand-new five-bedroom duplex with a private pool on a quiet Lekki Phase 1 street.",
  );
  const [features, setFeatures] = useState(
    "Private pool\nAll bedrooms en-suite\nFitted kitchen\nInverter backup",
  );
  const [images, setImages] = useState<string[]>(IMAGE_SETS[0].images);
  const [featured, setFeatured] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  function handleUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const files = Array.from(e.target.files ?? []);
    if (files.length === 0) return;
    const urls = files.map((f) => URL.createObjectURL(f));
    setImages((prev) => [...urls, ...prev].slice(0, 6));
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!title.trim() || images.length === 0) return;
    setSubmitting(true);

    window.setTimeout(() => {
      const result = addProperty({
        title: title.trim(),
        area,
        type,
        status,
        priceNGN: Number(price) || 0,
        bedrooms: Number(bedrooms) || 0,
        bathrooms: Number(bathrooms) || 0,
        areaSqm: Number(areaSqm) || 0,
        shortDesc: shortDesc.trim(),
        longDesc: shortDesc.trim(),
        features: features
          .split("\n")
          .map((f) => f.trim())
          .filter(Boolean),
        images,
        featured,
      });

      setSubmitting(false);

      const names = result.matched.map((l) => l.name);
      toast({
        tone: "success",
        title:
          result.matched.length > 0
            ? `Published! ${result.matched.length} matching buyer${
                result.matched.length === 1 ? "" : "s"
              } auto-notified 🎉`
            : "Published to listings 🎉",
        body:
          result.matched.length > 0 ? (
            <span>
              We've alerted{" "}
              <strong className="text-bone">{names.join(", ")}</strong> — their
              budget and area match {result.property.title}.
            </span>
          ) : (
            <span>{result.property.title} is now live on the public site.</span>
          ),
      });

      navigate("/agent/properties");
    }, 700);
  }

  return (
    <div>
      <div className="mb-8">
        <p className="eyebrow">The key moment</p>
        <h1 className="mt-1 font-display text-4xl text-pine">Add a property</h1>
        <p className="mt-1 max-w-2xl text-ink/60">
          Publish instantly to the public site. We'll scan your leads and
          auto-notify every buyer whose budget and area match.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="grid gap-8 lg:grid-cols-[1fr_340px]">
        <div className="space-y-6">
          <section className="rounded-brass bg-white p-6 shadow-sm ring-1 ring-pine/5">
            <h2 className="mb-4 font-display text-2xl text-pine">Details</h2>
            <div className="grid gap-4 sm:grid-cols-2">
              <label className="block sm:col-span-2">
                <span className="field-label">Title</span>
                <input
                  className="field"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  required
                />
              </label>
              <label className="block">
                <span className="field-label">Area</span>
                <select
                  className="field"
                  value={area}
                  onChange={(e) => setArea(e.target.value)}
                >
                  {AREAS.map((a) => (
                    <option key={a}>{a}</option>
                  ))}
                </select>
              </label>
              <label className="block">
                <span className="field-label">Type</span>
                <select
                  className="field"
                  value={type}
                  onChange={(e) => setType(e.target.value as PropertyType)}
                >
                  {TYPES.map((t) => (
                    <option key={t}>{t}</option>
                  ))}
                </select>
              </label>
              <label className="block">
                <span className="field-label">Status</span>
                <select
                  className="field"
                  value={status}
                  onChange={(e) => setStatus(e.target.value as PropertyStatus)}
                >
                  {STATUSES.map((s) => (
                    <option key={s}>{s}</option>
                  ))}
                </select>
              </label>
              <label className="block">
                <span className="field-label">Price (₦)</span>
                <input
                  className="field"
                  type="number"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                  min={0}
                />
                <span className="mt-1 block text-xs text-ink/50">
                  = {formatPrice(Number(price) || 0)}
                </span>
              </label>
              <label className="block">
                <span className="field-label">Bedrooms</span>
                <input
                  className="field"
                  type="number"
                  value={bedrooms}
                  onChange={(e) => setBedrooms(e.target.value)}
                  min={0}
                />
              </label>
              <label className="block">
                <span className="field-label">Bathrooms</span>
                <input
                  className="field"
                  type="number"
                  step="0.5"
                  value={bathrooms}
                  onChange={(e) => setBathrooms(e.target.value)}
                  min={0}
                />
              </label>
              <label className="block">
                <span className="field-label">Interior (m²)</span>
                <input
                  className="field"
                  type="number"
                  value={areaSqm}
                  onChange={(e) => setAreaSqm(e.target.value)}
                  min={0}
                />
              </label>
            </div>

            <label className="mt-4 block">
              <span className="field-label">Short description</span>
              <textarea
                className="field min-h-[80px]"
                value={shortDesc}
                onChange={(e) => setShortDesc(e.target.value)}
              />
            </label>
            <label className="mt-4 block">
              <span className="field-label">Features (one per line)</span>
              <textarea
                className="field min-h-[100px]"
                value={features}
                onChange={(e) => setFeatures(e.target.value)}
              />
            </label>
          </section>

          <section className="rounded-brass bg-white p-6 shadow-sm ring-1 ring-pine/5">
            <h2 className="mb-1 font-display text-2xl text-pine">Photos</h2>
            <p className="mb-4 text-sm text-ink/60">
              Attach a ready-made photo set or upload your own — every listing
              ships with real images.
            </p>

            <div className="mb-4 flex flex-wrap gap-2">
              {IMAGE_SETS.map((set) => {
                const active = images[0] === set.images[0];
                return (
                  <button
                    key={set.label}
                    type="button"
                    onClick={() => setImages(set.images)}
                    className={`rounded-brass border px-4 py-2 text-sm transition-colors ${
                      active
                        ? "border-brass bg-brass text-bone"
                        : "border-pine/20 text-pine hover:border-pine"
                    }`}
                  >
                    {set.label}
                  </button>
                );
              })}
              <label className="inline-flex cursor-pointer items-center gap-2 rounded-brass border border-dashed border-pine/30 px-4 py-2 text-sm text-pine hover:border-pine">
                <ImagePlus className="h-4 w-4" /> Upload
                <input
                  type="file"
                  accept="image/*"
                  multiple
                  className="sr-only"
                  onChange={handleUpload}
                />
              </label>
            </div>

            <div className="grid grid-cols-3 gap-2 sm:grid-cols-6">
              {images.map((src, i) => (
                <img
                  key={src + i}
                  src={src}
                  alt={`Selected photo ${i + 1}`}
                  className="aspect-square w-full rounded object-cover ring-1 ring-pine/10"
                />
              ))}
            </div>

            <label className="mt-4 flex items-center gap-2 text-sm text-ink/70">
              <input
                type="checkbox"
                checked={featured}
                onChange={(e) => setFeatured(e.target.checked)}
                className="h-4 w-4 rounded border-pine/30 text-brass focus:ring-brass"
              />
              Feature this on the homepage
            </label>
          </section>
        </div>

        {/* Publish panel */}
        <aside className="lg:sticky lg:top-24 lg:h-fit">
          <Reveal>
            <div className="rounded-brass bg-pine p-6 text-bone shadow-lg">
              <div className="mb-3 flex items-center gap-2 text-brass-bright">
                <Sparkles className="h-5 w-5" />
                <span className="text-xs font-medium uppercase tracking-[0.14em]">
                  Auto-match on publish
                </span>
              </div>
              <p className="text-sm text-stone/80">
                The instant you publish, {area && `${area} `}buyers in your lead
                list whose budget covers {formatPrice(Number(price) || 0)} get an
                automated match alert.
              </p>
              <ul className="mt-4 space-y-2 text-sm text-stone/80">
                {[
                  "Publishes to /listings immediately",
                  "Scans every open lead",
                  "Notifies matching buyers",
                ].map((x) => (
                  <li key={x} className="flex items-center gap-2">
                    <Check className="h-4 w-4 text-brass-bright" /> {x}
                  </li>
                ))}
              </ul>

              <button
                type="submit"
                className="btn-brass mt-6 w-full"
                disabled={submitting}
              >
                {submitting ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" /> Publishing…
                  </>
                ) : (
                  <>Publish & notify buyers</>
                )}
              </button>
            </div>
          </Reveal>
        </aside>
      </form>
    </div>
  );
}

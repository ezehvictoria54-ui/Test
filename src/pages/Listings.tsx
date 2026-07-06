import { SlidersHorizontal, X } from "lucide-react";
import { useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";
import PropertyCard from "../components/PropertyCard";
import Reveal from "../components/Reveal";
import type { PropertyStatus, PropertyType } from "../types";
import { useStore } from "../store/StoreContext";

const AREAS = ["Ikoyi", "Lekki Phase 1", "Victoria Island", "Banana Island"];
const TYPES: PropertyType[] = [
  "Apartment",
  "Duplex",
  "Maisonette",
  "Penthouse",
  "Land",
  "Short-let",
];
const STATUSES: PropertyStatus[] = ["For Sale", "For Rent", "Sold"];

type Sort = "newest" | "price-asc" | "price-desc";

export default function Listings() {
  const { state } = useStore();
  const [params, setParams] = useSearchParams();

  const [type, setType] = useState<string>("");
  const [minPrice, setMinPrice] = useState<string>("");
  const [status, setStatus] = useState<string>("");
  const [sort, setSort] = useState<Sort>("newest");
  const [showFilters, setShowFilters] = useState(false);

  // Area / max budget / beds come from URL (set by the homepage search).
  const area = params.get("area") ?? "";
  const maxPrice = params.get("max") ?? "";
  const minBeds = params.get("beds") ?? "";

  function setParam(key: string, value: string) {
    const next = new URLSearchParams(params);
    if (value) next.set(key, value);
    else next.delete(key);
    setParams(next, { replace: true });
  }

  function clearAll() {
    setParams({}, { replace: true });
    setType("");
    setMinPrice("");
    setStatus("");
  }

  const results = useMemo(() => {
    let list = state.properties.filter((p) => {
      if (area && p.area !== area) return false;
      if (type && p.type !== type) return false;
      if (status && p.status !== status) return false;
      if (maxPrice && p.priceNGN > Number(maxPrice)) return false;
      if (minPrice && p.priceNGN < Number(minPrice)) return false;
      if (minBeds && p.bedrooms < Number(minBeds)) return false;
      return true;
    });
    list = [...list].sort((a, b) => {
      if (sort === "price-asc") return a.priceNGN - b.priceNGN;
      if (sort === "price-desc") return b.priceNGN - a.priceNGN;
      return b.createdAt - a.createdAt;
    });
    return list;
  }, [state.properties, area, type, status, maxPrice, minPrice, minBeds, sort]);

  const activeCount =
    (area ? 1 : 0) +
    (type ? 1 : 0) +
    (status ? 1 : 0) +
    (maxPrice ? 1 : 0) +
    (minPrice ? 1 : 0) +
    (minBeds ? 1 : 0);

  const filterControls = (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      <label className="block">
        <span className="field-label">Area</span>
        <select
          className="field"
          value={area}
          onChange={(e) => setParam("area", e.target.value)}
        >
          <option value="">Any area</option>
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
          onChange={(e) => setType(e.target.value)}
        >
          <option value="">Any type</option>
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
          onChange={(e) => setStatus(e.target.value)}
        >
          <option value="">Any status</option>
          {STATUSES.map((s) => (
            <option key={s}>{s}</option>
          ))}
        </select>
      </label>
      <label className="block">
        <span className="field-label">Min price (₦)</span>
        <select
          className="field"
          value={minPrice}
          onChange={(e) => setMinPrice(e.target.value)}
        >
          <option value="">No minimum</option>
          <option value="85000000">₦85M+</option>
          <option value="200000000">₦200M+</option>
          <option value="300000000">₦300M+</option>
          <option value="500000000">₦500M+</option>
        </select>
      </label>
      <label className="block">
        <span className="field-label">Max price (₦)</span>
        <select
          className="field"
          value={maxPrice}
          onChange={(e) => setParam("max", e.target.value)}
        >
          <option value="">No maximum</option>
          <option value="150000000">Up to ₦150M</option>
          <option value="300000000">Up to ₦300M</option>
          <option value="400000000">Up to ₦400M</option>
          <option value="700000000">Up to ₦700M</option>
        </select>
      </label>
      <label className="block">
        <span className="field-label">Min bedrooms</span>
        <select
          className="field"
          value={minBeds}
          onChange={(e) => setParam("beds", e.target.value)}
        >
          <option value="">Any</option>
          {["1", "2", "3", "4", "5"].map((b) => (
            <option key={b}>{b}+</option>
          ))}
        </select>
      </label>
    </div>
  );

  return (
    <div className="bg-bone pb-20 pt-24">
      <div className="container-edge">
        <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="eyebrow">Portfolio</p>
            <h1 className="mt-1 font-display text-4xl text-pine sm:text-5xl">
              Listings
            </h1>
            <p className="mt-2 text-ink/60">
              {results.length} home{results.length === 1 ? "" : "s"}
              {activeCount > 0 ? " matching your filters" : " available now"}
            </p>
          </div>

          <div className="flex items-center gap-3">
            <label className="hidden items-center gap-2 sm:flex">
              <span className="text-xs uppercase tracking-[0.12em] text-pine/60">
                Sort
              </span>
              <select
                className="field w-auto py-2"
                value={sort}
                onChange={(e) => setSort(e.target.value as Sort)}
              >
                <option value="newest">Newest</option>
                <option value="price-asc">Price ↑</option>
                <option value="price-desc">Price ↓</option>
              </select>
            </label>
            <button
              className="btn-outline lg:hidden"
              onClick={() => setShowFilters((s) => !s)}
            >
              <SlidersHorizontal className="h-4 w-4" />
              Filters{activeCount ? ` (${activeCount})` : ""}
            </button>
          </div>
        </div>

        {/* Filter bar */}
        <div
          className={`mb-8 rounded-brass bg-white p-5 shadow-sm ring-1 ring-pine/5 ${
            showFilters ? "block" : "hidden lg:block"
          }`}
        >
          {filterControls}
          <div className="mt-4 flex items-center justify-between">
            <div className="flex items-center gap-2 sm:hidden">
              <span className="text-xs uppercase tracking-[0.12em] text-pine/60">
                Sort
              </span>
              <select
                className="field w-auto py-2"
                value={sort}
                onChange={(e) => setSort(e.target.value as Sort)}
              >
                <option value="newest">Newest</option>
                <option value="price-asc">Price ↑</option>
                <option value="price-desc">Price ↓</option>
              </select>
            </div>
            {activeCount > 0 && (
              <button
                onClick={clearAll}
                className="ml-auto inline-flex items-center gap-1.5 text-sm text-brass hover:text-pine"
              >
                <X className="h-4 w-4" /> Clear filters
              </button>
            )}
          </div>
        </div>

        {/* Results */}
        {results.length > 0 ? (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {results.map((p, i) => (
              <Reveal key={p.id} delay={Math.min(i * 0.05, 0.3)}>
                <PropertyCard property={p} />
              </Reveal>
            ))}
          </div>
        ) : (
          <div className="rounded-brass border border-dashed border-pine/20 bg-white/60 py-20 text-center">
            <p className="font-display text-3xl text-pine">No homes match — yet</p>
            <p className="mx-auto mt-2 max-w-sm text-ink/60">
              Try widening your budget or area. New listings are added often.
            </p>
            <button onClick={clearAll} className="btn-brass mt-6">
              Clear all filters
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

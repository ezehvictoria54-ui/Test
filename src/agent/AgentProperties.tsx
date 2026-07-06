import { Eye, PlusCircle } from "lucide-react";
import { Link } from "react-router-dom";
import Reveal from "../components/Reveal";
import { PropertyStatusPill } from "../components/pills";
import { formatBaths, formatPriceWithSuffix, timeAgo } from "../lib/format";
import { useStore } from "../store/StoreContext";

export default function AgentProperties() {
  const { state } = useStore();
  const properties = [...state.properties].sort(
    (a, b) => b.createdAt - a.createdAt,
  );

  return (
    <div>
      <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="eyebrow">Portfolio</p>
          <h1 className="mt-1 font-display text-4xl text-pine">Properties</h1>
          <p className="mt-1 text-ink/60">
            {properties.length} live listing{properties.length === 1 ? "" : "s"}
          </p>
        </div>
        <Link to="/agent/properties/new" className="btn-brass">
          <PlusCircle className="h-4 w-4" /> Add property
        </Link>
      </div>

      <div className="overflow-hidden rounded-brass bg-white shadow-sm ring-1 ring-pine/5">
        {/* Table on md+, cards on mobile */}
        <div className="hidden md:block">
          <table className="w-full text-left text-sm">
            <thead className="border-b border-pine/10 bg-stone/40 text-xs uppercase tracking-[0.1em] text-pine/60">
              <tr>
                <th className="px-5 py-3 font-medium">Property</th>
                <th className="px-5 py-3 font-medium">Area</th>
                <th className="px-5 py-3 font-medium">Beds/Baths</th>
                <th className="px-5 py-3 font-medium">Price</th>
                <th className="px-5 py-3 font-medium">Status</th>
                <th className="px-5 py-3 font-medium">Added</th>
                <th className="px-5 py-3" />
              </tr>
            </thead>
            <tbody className="divide-y divide-pine/5">
              {properties.map((p) => (
                <tr key={p.id} className="transition-colors hover:bg-stone/20">
                  <td className="px-5 py-3">
                    <div className="flex items-center gap-3">
                      <img
                        src={p.images[0]}
                        alt=""
                        className="h-12 w-16 rounded object-cover"
                      />
                      <span className="font-medium text-pine">{p.title}</span>
                    </div>
                  </td>
                  <td className="px-5 py-3 text-ink/70">{p.area}</td>
                  <td className="px-5 py-3 text-ink/70">
                    {p.bedrooms} / {formatBaths(p.bathrooms)}
                  </td>
                  <td className="px-5 py-3 font-medium text-pine">
                    {formatPriceWithSuffix(p)}
                  </td>
                  <td className="px-5 py-3">
                    <PropertyStatusPill status={p.status} />
                  </td>
                  <td className="px-5 py-3 text-ink/50">{timeAgo(p.createdAt)}</td>
                  <td className="px-5 py-3 text-right">
                    <Link
                      to={`/property/${p.id}`}
                      className="inline-flex items-center gap-1.5 text-brass hover:text-pine"
                    >
                      <Eye className="h-4 w-4" /> View
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="divide-y divide-pine/5 md:hidden">
          {properties.map((p, i) => (
            <Reveal key={p.id} delay={Math.min(i * 0.04, 0.2)}>
              <div className="flex items-center gap-3 p-4">
                <img
                  src={p.images[0]}
                  alt=""
                  className="h-16 w-20 rounded object-cover"
                />
                <div className="min-w-0 flex-1">
                  <p className="truncate font-medium text-pine">{p.title}</p>
                  <p className="text-xs text-ink/60">
                    {p.area} · {p.bedrooms}bd · {formatPriceWithSuffix(p)}
                  </p>
                  <div className="mt-1">
                    <PropertyStatusPill status={p.status} />
                  </div>
                </div>
                <Link
                  to={`/property/${p.id}`}
                  className="text-brass"
                  aria-label={`View ${p.title}`}
                >
                  <Eye className="h-5 w-5" />
                </Link>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </div>
  );
}

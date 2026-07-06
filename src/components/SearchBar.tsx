import { Search } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const areas = ["Any area", "Ikoyi", "Lekki Phase 1", "Victoria Island", "Banana Island"];
const budgets = [
  { label: "Any budget", value: "" },
  { label: "Up to ₦150M", value: "150000000" },
  { label: "Up to ₦300M", value: "300000000" },
  { label: "Up to ₦400M", value: "400000000" },
  { label: "Up to ₦700M", value: "700000000" },
];
const beds = ["Any", "1", "2", "3", "4", "5"];

/** Homepage hero search — routes to /listings with query params applied live. */
export default function SearchBar() {
  const navigate = useNavigate();
  const [area, setArea] = useState("Any area");
  const [budget, setBudget] = useState("");
  const [minBeds, setMinBeds] = useState("Any");

  function submit(e: React.FormEvent) {
    e.preventDefault();
    const params = new URLSearchParams();
    if (area !== "Any area") params.set("area", area);
    if (budget) params.set("max", budget);
    if (minBeds !== "Any") params.set("beds", minBeds);
    navigate(`/listings?${params.toString()}`);
  }

  return (
    <form
      onSubmit={submit}
      className="grid w-full gap-3 rounded-brass bg-bone/95 p-4 shadow-2xl ring-1 ring-black/5 backdrop-blur sm:grid-cols-2 lg:grid-cols-4"
    >
      <label className="block">
        <span className="field-label">Area</span>
        <select
          className="field"
          value={area}
          onChange={(e) => setArea(e.target.value)}
        >
          {areas.map((a) => (
            <option key={a}>{a}</option>
          ))}
        </select>
      </label>
      <label className="block">
        <span className="field-label">Budget</span>
        <select
          className="field"
          value={budget}
          onChange={(e) => setBudget(e.target.value)}
        >
          {budgets.map((b) => (
            <option key={b.label} value={b.value}>
              {b.label}
            </option>
          ))}
        </select>
      </label>
      <label className="block">
        <span className="field-label">Bedrooms</span>
        <select
          className="field"
          value={minBeds}
          onChange={(e) => setMinBeds(e.target.value)}
        >
          {beds.map((b) => (
            <option key={b}>{b}</option>
          ))}
        </select>
      </label>
      <div className="flex items-end">
        <button type="submit" className="btn-brass w-full">
          <Search className="h-4 w-4" aria-hidden />
          Search
        </button>
      </div>
    </form>
  );
}

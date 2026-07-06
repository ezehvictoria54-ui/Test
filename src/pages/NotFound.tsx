import { Link } from "react-router-dom";
import { brand } from "../brand.config";

export default function NotFound() {
  return (
    <div className="flex min-h-[70vh] flex-col items-center justify-center bg-bone px-5 py-24 text-center">
      <p className="eyebrow">Lost the address</p>
      <h1 className="mt-3 font-display text-6xl text-pine">Page not found</h1>
      <p className="mt-3 max-w-md text-ink/60">
        The page you're looking for has moved or never existed. Let's get you back
        to {brand.agencyName}.
      </p>
      <div className="mt-8 flex flex-wrap justify-center gap-3">
        <Link to="/" className="btn-brass">
          Back to homepage
        </Link>
        <Link to="/listings" className="btn-outline">
          Browse listings
        </Link>
      </div>
    </div>
  );
}

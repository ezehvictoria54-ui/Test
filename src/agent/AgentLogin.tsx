import { motion } from "framer-motion";
import { ArrowLeft, Lock } from "lucide-react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { brand } from "../brand.config";
import { isAgentLoggedIn, login } from "./auth";

export default function AgentLogin() {
  const navigate = useNavigate();
  const [user, setUser] = useState("");
  const [pass, setPass] = useState("");
  const [error, setError] = useState(false);

  if (isAgentLoggedIn()) {
    navigate("/agent/dashboard", { replace: true });
  }

  function submit(e: React.FormEvent) {
    e.preventDefault();
    if (login(user, pass)) {
      navigate("/agent/dashboard");
    } else {
      setError(true);
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-pine px-5 py-12">
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-sm"
      >
        <Link
          to="/"
          className="mb-6 inline-flex items-center gap-2 text-sm text-stone/70 hover:text-bone"
        >
          <ArrowLeft className="h-4 w-4" /> Back to site
        </Link>

        <div className="rounded-brass bg-bone p-8 shadow-2xl">
          <div className="mb-6 text-center">
            <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-pine text-brass-bright">
              <Lock className="h-5 w-5" />
            </div>
            <h1 className="font-display text-3xl text-pine">{brand.agencyName}</h1>
            <p className="text-sm text-ink/60">Agent workspace</p>
          </div>

          <form onSubmit={submit} className="space-y-4">
            <label className="block">
              <span className="field-label">Username</span>
              <input
                className="field"
                value={user}
                onChange={(e) => {
                  setUser(e.target.value);
                  setError(false);
                }}
                placeholder="demo"
                autoComplete="username"
              />
            </label>
            <label className="block">
              <span className="field-label">Password</span>
              <input
                type="password"
                className="field"
                value={pass}
                onChange={(e) => {
                  setPass(e.target.value);
                  setError(false);
                }}
                placeholder="demo"
                autoComplete="current-password"
              />
            </label>
            {error && (
              <p className="text-sm text-rose-600">
                Incorrect credentials — hint: demo / demo
              </p>
            )}
            <button type="submit" className="btn-brass w-full">
              Sign in
            </button>
          </form>

          <p className="mt-5 rounded-brass bg-stone-soft px-3 py-2 text-center text-xs text-pine/70">
            Demo login — use <strong>demo</strong> / <strong>demo</strong>
          </p>
        </div>
      </motion.div>
    </div>
  );
}

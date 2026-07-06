import type { ReactNode } from "react";
import { Navigate } from "react-router-dom";
import { isAgentLoggedIn } from "./auth";

export default function RequireAgent({ children }: { children: ReactNode }) {
  if (!isAgentLoggedIn()) {
    return <Navigate to="/agent" replace />;
  }
  return <>{children}</>;
}

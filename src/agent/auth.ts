/** Cosmetic auth only — no real security. Hint on the login screen: demo/demo. */
const KEY = "listing-engine.agent";

export function isAgentLoggedIn(): boolean {
  try {
    return sessionStorage.getItem(KEY) === "1";
  } catch {
    return false;
  }
}

export function login(user: string, pass: string): boolean {
  if (user.trim().toLowerCase() === "demo" && pass === "demo") {
    try {
      sessionStorage.setItem(KEY, "1");
    } catch {
      /* ignore */
    }
    return true;
  }
  return false;
}

export function logout(): void {
  try {
    sessionStorage.removeItem(KEY);
  } catch {
    /* ignore */
  }
}

/**
 * Global auth state — holds the JWT returned by /api/v1/auth/login
 * and exposes login()/logout()/currentUser to the rest of the app.
 * TODO (Day 1 — ROADMAP.md Phase 3): implement against the real
 * /auth/login endpoint once it exists.
 */
import { createContext, useContext, useState } from "react";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [token, setToken] = useState(null);
  const [role, setRole] = useState(null);

  const value = { token, role, setToken, setRole };
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  return useContext(AuthContext);
}

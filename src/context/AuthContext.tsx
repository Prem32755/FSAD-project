// src/contexts/AuthContext.tsx
import React, { createContext, useContext, useEffect, useState } from "react";

type User = { email: string } | null;

interface AuthContextValue {
  user: User;
  isAdmin: boolean;
  login: (email: string, password?: string) => Promise<boolean>;
  logout: () => void;
  getHistory: () => Array<{ email: string; at: string }>;
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

const STORAGE_USER_KEY = "hv_user";
const STORAGE_HISTORY_KEY = "hv_login_history";

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User>(() => {
    try {
      const raw = localStorage.getItem(STORAGE_USER_KEY);
      return raw ? JSON.parse(raw) as User : null;
    } catch {
      return null;
    }
  });

  const isAdmin = user?.email === "admin@homevalue.com";

  useEffect(() => {
    // persist user
    if (user) localStorage.setItem(STORAGE_USER_KEY, JSON.stringify(user));
    else localStorage.removeItem(STORAGE_USER_KEY);
  }, [user]);

  const recordHistory = (email: string) => {
    try {
      const raw = localStorage.getItem(STORAGE_HISTORY_KEY);
      const arr = raw ? JSON.parse(raw) as Array<{ email: string; at: string }> : [];
      arr.unshift({ email, at: new Date().toISOString() });
      // keep last 50
      localStorage.setItem(STORAGE_HISTORY_KEY, JSON.stringify(arr.slice(0, 50)));
    } catch (e) {
      console.error("Failed to record login history", e);
    }
  };

  const login = async (email: string, password?: string) => {
    // MOCK: Accept any non-empty email + password >= 6 chars. Admin checked in admin modal separately.
    // Replace with real API call if available.
    if (!email) return false;
    if (!password || password.length < 6) return false;

    // simulate async
    await new Promise((res) => setTimeout(res, 600));

    const u = { email };
    setUser(u);
    recordHistory(email);
    return true;
  };

  const logout = () => {
    setUser(null);
    // optional: keep history
  };

  const getHistory = () => {
    try {
      const raw = localStorage.getItem(STORAGE_HISTORY_KEY);
      return raw ? (JSON.parse(raw) as Array<{ email: string; at: string }>) : [];
    } catch {
      return [];
    }
  };

  return (
    <AuthContext.Provider value={{ user, isAdmin, login, logout, getHistory }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
};

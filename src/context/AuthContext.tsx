import React, { createContext, useContext, useEffect, useState } from "react";

type UserRole = "admin" | "user";
type User = { email: string; role: UserRole } | null;
type AuthResult = {
  ok: boolean;
  message?: string;
  role?: UserRole;
};

interface AuthContextValue {
  user: User;
  isAdmin: boolean;
  login: (email: string, password?: string) => Promise<AuthResult>;
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
      return raw ? (JSON.parse(raw) as User) : null;
    } catch {
      return null;
    }
  });

  const isAdmin = user?.role === "admin";

  useEffect(() => {
    if (user) localStorage.setItem(STORAGE_USER_KEY, JSON.stringify(user));
    else localStorage.removeItem(STORAGE_USER_KEY);
  }, [user]);

  const recordHistory = (email: string) => {
    try {
      const raw = localStorage.getItem(STORAGE_HISTORY_KEY);
      const arr = raw ? (JSON.parse(raw) as Array<{ email: string; at: string }>) : [];
      arr.unshift({ email, at: new Date().toISOString() });
      localStorage.setItem(STORAGE_HISTORY_KEY, JSON.stringify(arr.slice(0, 50)));
    } catch (e) {
      console.error("Failed to record login history", e);
    }
  };

  const login = async (email: string, password?: string) => {
    if (!email) {
      return { ok: false, message: "Email is required." };
    }
    if (!password || password.length < 6) {
      return { ok: false, message: "Password must be at least 6 characters." };
    }

    try {
      const baseUrl = import.meta.env.VITE_API_BASE_URL || "http://localhost:8080/api";
      const res = await fetch(`${baseUrl}/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      if (!res.ok) {
        const message = (await res.text()) || "Login failed.";
        return { ok: false, message };
      }

      const data = await res.json();
      const nextUser = {
        email: data.email ?? email,
        role: (data.role === "admin" ? "admin" : "user") as UserRole,
      };

      setUser(nextUser);
      recordHistory(nextUser.email);
      return { ok: true, role: nextUser.role };
    } catch (error) {
      console.error(error);
      return {
        ok: false,
        message: "Could not reach the server. Please make sure the backend is running.",
      };
    }
  };

  const logout = () => {
    setUser(null);
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

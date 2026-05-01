"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import { DEFAULT_AVATARS } from "@/data/avatars";

// Simple user type
export type User = {
  name: string;
  email: string;
  image: string;
};

type AuthContextType = {
  user: User | null;
  loading: boolean;
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (name: string, email: string, image: string, password: string) => Promise<void>;
  signOut: () => void;
  signInWithGoogle: () => Promise<void>;
  updateUserProfile: (name: string, image: string) => void;
};

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  // Load user from localStorage on start
  useEffect(() => {
    const saved = localStorage.getItem("qurbanihat_user");
    if (saved) {
      setUser(JSON.parse(saved));
    }
    setLoading(false);
  }, []);

  // Save user to localStorage whenever it changes
  const saveUser = (u: User | null) => {
    setUser(u);
    if (u) {
      localStorage.setItem("qurbanihat_user", JSON.stringify(u));
    } else {
      localStorage.removeItem("qurbanihat_user");
    }
  };

  // Get stored accounts
  const getAccounts = (): Record<string, { password: string; user: User }> => {
    const stored = localStorage.getItem("qurbanihat_accounts");
    return stored ? JSON.parse(stored) : {};
  };

  const saveAccounts = (accounts: Record<string, { password: string; user: User }>) => {
    localStorage.setItem("qurbanihat_accounts", JSON.stringify(accounts));
  };

  // Sign in with email and password
  const signIn = async (email: string, password: string) => {
    const accounts = getAccounts();
    const account = accounts[email];
    if (!account || account.password !== password) {
      throw new Error("Invalid email or password. Please try again.");
    }
    saveUser(account.user);
  };

  // Register a new account
  const signUp = async (name: string, email: string, image: string, password: string) => {
    const accounts = getAccounts();
    if (accounts[email]) {
      throw new Error("An account with this email already exists.");
    }
    const newUser: User = {
      name,
      email,
      image: image || DEFAULT_AVATARS[0].url,
    };
    accounts[email] = { password, user: newUser };
    saveAccounts(accounts);
    // Do not auto-login, redirect to login page
  };

  // Sign out
  const signOut = () => {
    saveUser(null);
  };

  // Google sign in (mock - stores a demo Google user)
  const signInWithGoogle = async () => {
    const googleUser: User = {
      name: "Google User",
      email: "googleuser@gmail.com",
      image: "https://api.dicebear.com/7.x/avataaars/svg?seed=google",
    };
    saveUser(googleUser);
  };

  // Update name and photo
  const updateUserProfile = (name: string, image: string) => {
    if (!user) return;
    const updatedUser: User = { ...user, name, image };
    saveUser(updatedUser);

    // Also update in accounts storage
    const accounts = getAccounts();
    if (accounts[user.email]) {
      accounts[user.email].user = updatedUser;
      saveAccounts(accounts);
    }
  };

  return (
    <AuthContext.Provider
      value={{ user, loading, signIn, signUp, signOut, signInWithGoogle, updateUserProfile }}
    >
      {children}
    </AuthContext.Provider>
  );
}

// Custom hook for easy access
export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used inside AuthProvider");
  return ctx;
}

"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import { authClient } from "@/lib/auth-client";
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
  signOut: () => Promise<void>;
  signInWithGoogle: () => Promise<void>;
  updateUserProfile: (name: string, image: string) => Promise<void>;
};

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const session = authClient.useSession();
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    if (session.data?.user) {
      setUser({
        name: session.data.user.name,
        email: session.data.user.email,
        image: session.data.user.image || "",
      });
    } else {
      setUser(null);
    }
  }, [session.data]);

  // Sign in with email and password
  const signIn = async (email: string, password: string) => {
    const { error } = await authClient.signIn.email({
      email,
      password,
    });
    if (error) throw new Error(error.message || "Failed to sign in");
  };

  // Register a new account
  const signUp = async (name: string, email: string, image: string, password: string) => {
    const { error } = await authClient.signUp.email({
      email,
      password,
      name,
      image: image || DEFAULT_AVATARS[0].url,
    });
    if (error) throw new Error(error.message || "Failed to sign up");
  };


  // Sign out
  const signOut = async () => {
    await authClient.signOut();
  };

  // Google sign in
  const signInWithGoogle = async () => {
    const { error } = await authClient.signIn.social({
      provider: "google",
    });
    if (error) throw new Error(error.message || "Failed to sign in with Google");
  };

  // Update name and photo
  const updateUserProfile = async (name: string, image: string) => {
    const { error } = await authClient.updateUser({
      name,
      image,
    });
    if (error) throw new Error(error.message || "Failed to update profile");
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loading: session.isPending,
        signIn,
        signUp,
        signOut,
        signInWithGoogle,
        updateUserProfile,
      }}
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


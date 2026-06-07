import { createContext, useContext, useState } from "react";
import type { ReactNode } from "react";

type AuthUser = {
  email: string;
};

type AuthContextValue = {
  user: AuthUser | null;
  loginUser: (token: string, email: string) => void;
  logoutUser: () => void;
};

const AuthContext = createContext<AuthContextValue | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(() => {
    const email = localStorage.getItem("authUserEmail");

    return email ? { email } : null;
  });

  function loginUser(token: string, email: string) {
    localStorage.setItem("authToken", token);
    localStorage.setItem("authUserEmail", email);
    setUser({ email });
  }

  function logoutUser() {
    localStorage.removeItem("authToken");
    localStorage.removeItem("authUserEmail");
    setUser(null);
  }

  return (
    <AuthContext.Provider value={{ user, loginUser, logoutUser }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must be used inside AuthProvider");
  }

  return context;
}
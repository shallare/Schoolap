import React, { createContext, useContext, useEffect, useState, useMemo, useCallback } from 'react';
import { authApi, tokenStore, StudentResponse, AdminResponse } from './api';

interface AuthContextType {
  user: StudentResponse | AdminResponse | null;
  role: 'student' | 'admin' | null;
  token: string | null;
  loading: boolean;
  login: (email: string, password: string, isAdmin?: boolean) => Promise<void>;
  register: (data: any) => Promise<void>;
  logout: () => Promise<void>;
  refreshUser: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<StudentResponse | AdminResponse | null>(null);
  const [token, setToken] = useState<string | null>(tokenStore.get());
  const [loading, setLoading] = useState(true);

  // Derive role directly from the user object whenever it changes
  const role = useMemo(() => {
    if (!user) return null;
    if ('role' in user && user.role === 'admin') return 'admin';
    return 'student';
  }, [user]);

  const refreshUser = useCallback(async () => {
    const t = tokenStore.get();
    if (!t) {
      setUser(null);
      setLoading(false);
      return;
    }
    
    try {
      const data = await authApi.me(t);
      setUser(data);
      setToken(t);
    } catch (err: any) {
      // Only clear if it's a 401 (unauthorized)
      // Network errors or other issues shouldn't log the user out
      if (err.status === 401) {
        tokenStore.clear();
        setUser(null);
        setToken(null);
      }
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    refreshUser();
  }, []); // Only run on mount

  const login = async (email: string, password: string, isAdmin = false) => {
    setLoading(true);
    try {
      if (isAdmin) {
        const res = await authApi.loginAdmin(email, password);
        tokenStore.set(res.token);
        setToken(res.token);
        setUser(res.user);
      } else {
        const res = await authApi.loginStudent(email, password);
        tokenStore.set(res.token);
        setToken(res.token);
        setUser(res.student);
      }
    } finally {
      setLoading(false);
    }
  };

  const register = async (data: any) => {
    setLoading(true);
    try {
      const res = await authApi.registerStudent(data);
      tokenStore.set(res.token);
      setToken(res.token);
      setUser(res.student);
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    if (token) {
      try { await authApi.logout(token); } catch (e) {}
    }
    tokenStore.clear();
    setToken(null);
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, token, role, loading, login, register, logout, refreshUser }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within an AuthProvider');
  return context;
}

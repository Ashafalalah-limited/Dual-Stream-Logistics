import { createContext, useCallback, useMemo, useState, type PropsWithChildren } from 'react';

import { internalAdminCredentials } from '@/data/mock-logistics';
import type { SessionUser, UserRole } from '@/types/logistics';

type SignUpPayload = {
  name: string;
  email: string;
  role: UserRole;
};

type AuthContextValue = {
  user: SessionUser | null;
  signIn: (email: string, password: string) => { ok: boolean; message?: string };
  signUp: (payload: SignUpPayload) => void;
  signOut: () => void;
};

export const AuthContext = createContext<AuthContextValue | null>(null);

export function AuthProvider({ children }: PropsWithChildren) {
  const [user, setUser] = useState<SessionUser | null>(null);

  const signIn = useCallback((email: string, password: string) => {
    const normalizedEmail = email.trim().toLowerCase();
    const normalizedPassword = password.trim();

    if (
      normalizedEmail === internalAdminCredentials.email &&
      normalizedPassword === internalAdminCredentials.password
    ) {
      setUser({
        id: 'usr-admin-001',
        name: 'Operations Admin',
        email: normalizedEmail,
        role: 'admin',
      });
      return { ok: true };
    }

    if (normalizedEmail.includes('driver')) {
      setUser({
        id: 'usr-driver-001',
        name: 'Driver Operator',
        email: normalizedEmail,
        role: 'driver',
      });
      return { ok: true };
    }

    if (normalizedEmail.length > 3 && normalizedPassword.length > 3) {
      setUser({
        id: 'usr-customer-001',
        name: 'Customer Operator',
        email: normalizedEmail,
        role: 'customer',
      });
      return { ok: true };
    }

    return { ok: false, message: 'Invalid credentials. Check email/password and try again.' };
  }, []);

  const signUp = useCallback((payload: SignUpPayload) => {
    setUser({
      id: `usr-${Date.now()}`,
      name: payload.name.trim() || 'Dual Stream User',
      email: payload.email.trim().toLowerCase(),
      role: payload.role,
    });
  }, []);

  const signOut = useCallback(() => {
    setUser(null);
  }, []);

  const value = useMemo(
    () => ({
      user,
      signIn,
      signUp,
      signOut,
    }),
    [signIn, signOut, signUp, user]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

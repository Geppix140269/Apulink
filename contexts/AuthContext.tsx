// PATH: contexts/AuthContext.tsx

'use client';

import { createContext, useContext, useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { User } from 'firebase/auth';
import { auth } from '../../lib/firebase/config';  // Go up TWO levels, not one
import firebase from '../lib/firebase/firebase-service';  // FIXED: Using relative path

interface AuthContextType {
  user: User | null;
  loading: boolean;
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (email: string, password: string) => Promise<void>;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const unsubscribe = firebase.auth.onAuthStateChange((user) => {
      setUser(user);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const signIn = async (email: string, password: string) => {
    const result = await firebase.auth.signIn(email, password);
    if (result.error) {
      throw new Error(result.error);
    }
    router.push('/my-apulink');
  };

  const signUp = async (email: string, password: string) => {
    const result = await firebase.auth.signUp(email, password, { role: 'buyer' });
    if (result.error) {
      throw new Error(result.error);
    }
    router.push('/my-apulink');
  };

  const signOut = async () => {
    await firebase.auth.signOut();
    router.push('/');
  };

  return (
    <AuthContext.Provider value={{ user, loading, signIn, signUp, signOut }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}

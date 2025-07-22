// Path: contexts/AuthContext.tsx
// Authentication context for managing user state with role support

'use client';

import { createContext, useContext, useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabase';
import type { User } from '@supabase/supabase-js';

type UserRole = 'buyer' | 'professional' | 'admin' | null;

interface AuthContextType {
  user: User | null;
  role: UserRole;
  loading: boolean;
  signIn: (email: string, password: string) => Promise<{ error: any }>;
  signUp: (email: string, password: string, role: UserRole) => Promise<{ error: any }>;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [role, setRole] = useState<UserRole>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    // Check active sessions and sets the user
    checkUser();

    // Listen for changes on auth state (sign in, sign out, etc.)
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      if (session?.user) {
        setUser(session.user);
        getUserRole(session.user.id);
      } else {
        setUser(null);
        setRole(null);
      }
      setLoading(false);
    });

    return () => subscription.unsubscribe();
  }, []);

  async function checkUser() {
    try {
      const { data: { session } } = await supabase.auth.getSession();
      if (session?.user) {
        setUser(session.user);
        await getUserRole(session.user.id);
      }
    } catch (error) {
      console.error('Error checking user:', error);
    } finally {
      setLoading(false);
    }
  }

  async function getUserRole(userId: string) {
    try {
      // First check if user is a professional
      const { data: professional } = await supabase
        .from('professionals')
        .select('id')
        .eq('user_id', userId)
        .single();

      if (professional) {
        setRole('professional');
        return;
      }

      // Then check if user is a buyer
      const { data: buyer } = await supabase
        .from('buyers')
        .select('id')
        .eq('user_id', userId)
        .single();

      if (buyer) {
        setRole('buyer');
        return;
      }

      // Check user metadata for role
      const { data: { user } } = await supabase.auth.getUser();
      if (user?.user_metadata?.role) {
        setRole(user.user_metadata.role as UserRole);
      } else {
        setRole('buyer'); // Default to buyer if no role found
      }
    } catch (error) {
      console.error('Error getting user role:', error);
      setRole('buyer'); // Default to buyer on error
    }
  }

  const signIn = async (email: string, password: string) => {
    const { error, data } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (!error && data.user) {
      setUser(data.user);
      await getUserRole(data.user.id);
    }

    return { error };
  };

  const signUp = async (email: string, password: string, userRole: UserRole = 'buyer') => {
    const { error, data } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          role: userRole,
        },
      },
    });

    if (!error && data.user) {
      setUser(data.user);
      setRole(userRole);
    }

    return { error };
  };

  const signOut = async () => {
    await supabase.auth.signOut();
    setUser(null);
    setRole(null);
    router.push('/');
  };

  const value = {
    user,
    role,
    loading,
    signIn,
    signUp,
    signOut,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}

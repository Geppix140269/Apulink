// Path: app/contexts/AuthContext.tsx
// Authentication context for managing user sessions

'use client';

import { createContext, useContext, useEffect, useState } from 'react';
import { User, Session } from '@supabase/supabase-js';
import { supabase } from '@/lib/supabase';

export type UserRole = 'buyer' | 'professional' | 'admin';

interface AuthUser extends User {
  role?: UserRole;
  profile?: {
    fullName?: string;
    companyName?: string;
    isVerified?: boolean;
    subscriptionStatus?: 'active' | 'trialing' | 'canceled' | 'none';
  };
}

interface AuthContextType {
  user: AuthUser | null;
  session: Session | null;
  loading: boolean;
  role: UserRole | null;
  signIn: (email: string, password: string) => Promise<{ error: Error | null }>;
  signUp: (email: string, password: string, role: UserRole) => Promise<{ error: Error | null }>;
  signOut: () => Promise<void>;
  resetPassword: (email: string) => Promise<{ error: Error | null }>;
  updateProfile: (updates: any) => Promise<{ error: Error | null }>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);
  const [role, setRole] = useState<UserRole | null>(null);

  // Fetch user profile and role
  const fetchUserProfile = async (userId: string) => {
    try {
      // Check if user is a professional
      const { data: professional } = await supabase
        .from('professionals')
        .select('*')
        .eq('user_id', userId)
        .single();

      if (professional) {
        setRole('professional');
        return {
          role: 'professional' as UserRole,
          profile: {
            fullName: professional.full_name,
            companyName: professional.company_name,
            isVerified: professional.is_verified,
            subscriptionStatus: professional.subscription_status || 'none',
          },
        };
      }

      // Check if user is a buyer
      const { data: buyer } = await supabase
        .from('buyer_profiles')
        .select('*')
        .eq('user_id', userId)
        .single();

      if (buyer) {
        setRole('buyer');
        return {
          role: 'buyer' as UserRole,
          profile: {
            fullName: buyer.full_name,
            isVerified: true,
            subscriptionStatus: buyer.subscription_status || 'none',
          },
        };
      }

      // Check if admin (you might have an admins table)
      // For now, check if email ends with @apulink.com
      const { data: { user: authUser } } = await supabase.auth.getUser();
      if (authUser?.email?.endsWith('@apulink.com')) {
        setRole('admin');
        return {
          role: 'admin' as UserRole,
          profile: {
            fullName: authUser.email.split('@')[0],
            isVerified: true,
          },
        };
      }

      return null;
    } catch (error) {
      console.error('Error fetching user profile:', error);
      return null;
    }
  };

  useEffect(() => {
    // Check active session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      if (session?.user) {
        fetchUserProfile(session.user.id).then((profile) => {
          if (profile) {
            setUser({ ...session.user, ...profile });
          }
        });
      }
      setLoading(false);
    });

    // Listen for auth changes
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(async (_event, session) => {
      setSession(session);
      if (session?.user) {
        const profile = await fetchUserProfile(session.user.id);
        if (profile) {
          setUser({ ...session.user, ...profile });
        }
      } else {
        setUser(null);
        setRole(null);
      }
      setLoading(false);
    });

    return () => subscription.unsubscribe();
  }, []);

  const signIn = async (email: string, password: string) => {
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) throw error;

      if (data.user) {
        const profile = await fetchUserProfile(data.user.id);
        if (profile) {
          setUser({ ...data.user, ...profile });
        }
      }

      return { error: null };
    } catch (error) {
      return { error: error as Error };
    }
  };

  const signUp = async (email: string, password: string, role: UserRole) => {
    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            role,
          },
        },
      });

      if (error) throw error;

      // The user will need to verify their email
      // Profile creation will happen after email verification

      return { error: null };
    } catch (error) {
      return { error: error as Error };
    }
  };

  const signOut = async () => {
    await supabase.auth.signOut();
    setUser(null);
    setRole(null);
  };

  const resetPassword = async (email: string) => {
    try {
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/auth/reset-password`,
      });

      if (error) throw error;

      return { error: null };
    } catch (error) {
      return { error: error as Error };
    }
  };

  const updateProfile = async (updates: any) => {
    try {
      if (!user) throw new Error('No user logged in');

      // Update the appropriate table based on role
      if (role === 'professional') {
        const { error } = await supabase
          .from('professionals')
          .update(updates)
          .eq('user_id', user.id);

        if (error) throw error;
      } else if (role === 'buyer') {
        const { error } = await supabase
          .from('buyer_profiles')
          .update(updates)
          .eq('user_id', user.id);

        if (error) throw error;
      }

      // Refresh user profile
      const profile = await fetchUserProfile(user.id);
      if (profile) {
        setUser({ ...user, ...profile });
      }

      return { error: null };
    } catch (error) {
      return { error: error as Error };
    }
  };

  const value = {
    user,
    session,
    loading,
    role,
    signIn,
    signUp,
    signOut,
    resetPassword,
    updateProfile,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

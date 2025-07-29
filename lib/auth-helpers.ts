// File: /lib/auth-helpers.ts
import { createClient } from './supabase/server'
import type { User } from '@supabase/supabase-js'

// Define types directly in this file
interface BuyerProfile {
  id: string;
  user_id: string;
  email: string;
  full_name?: string;
  phone?: string;
  nationality?: string;
  preferred_language?: string;
  created_at?: string;
  updated_at?: string;
}

interface ProfessionalProfile {
  id: string;
  user_id: string;
  email: string;
  first_name?: string;
  last_name?: string;
  company_name?: string;
  vat_number?: string;
  profession?: string;
  phone?: string;
  website?: string;
  bio?: string;
  service_areas?: string[];
  created_at?: string;
  updated_at?: string;
}

interface UserWithProfile extends User {
  profile?: BuyerProfile | ProfessionalProfile;
  role?: 'buyer' | 'professional';
}

export async function getCurrentUserWithProfile(): Promise<UserWithProfile | null> {
  const supabase = createClient()
  
  try {
    const { data: { user }, error } = await supabase.auth.getUser()
    
    if (error || !user) {
      return null
    }
    
    // First, check if user is a buyer
    const { data: buyerProfile } = await supabase
      .from('buyer_profiles')
      .select('*')
      .eq('user_id', user.id)
      .single()
    
    if (buyerProfile) {
      return {
        ...user,
        profile: buyerProfile as BuyerProfile,
        role: 'buyer'
      }
    }
    
    // If not a buyer, check if professional
    const { data: professionalProfile } = await supabase
      .from('professionals')
      .select('*')
      .eq('user_id', user.id)
      .single()
    
    if (professionalProfile) {
      return {
        ...user,
        profile: professionalProfile as ProfessionalProfile,
        role: 'professional'
      }
    }
    
    // Return user without profile if neither found
    return user as UserWithProfile
  } catch (error) {
    console.error('Error fetching user with profile:', error)
    return null
  }
}

// Helper to get display name
export function getUserDisplayName(profile: BuyerProfile | ProfessionalProfile | undefined): string {
  if (!profile) return 'User'
  
  // For buyer profiles
  if ('full_name' in profile && profile.full_name) {
    return profile.full_name
  }
  
  // For professional profiles
  if ('first_name' in profile && 'last_name' in profile) {
    return `${profile.first_name} ${profile.last_name}`.trim()
  }
  
  return profile.email || 'User'
}

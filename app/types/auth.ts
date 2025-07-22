// File: /app/types/auth.ts

import { User as SupabaseUser } from '@supabase/supabase-js'

export interface BuyerProfile {
  id: string
  email: string
  full_name: string
  phone?: string
  nationality?: string
  current_country?: string
  buyer_type?: string
  timeline?: string
  budget_range?: string
  user_id: string
  // Add other fields as needed
}

export interface ProfessionalProfile {
  id: string
  first_name: string
  last_name: string
  email: string
  phone?: string
  company_name?: string
  profession?: string
  user_id: string
  // Add other fields as needed
}

export interface UserWithProfile extends SupabaseUser {
  profile?: BuyerProfile | ProfessionalProfile
  role?: 'buyer' | 'professional'
}

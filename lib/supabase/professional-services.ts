// PATH: lib/types/professional-services.ts
// Type definitions for professional services

export interface ProfessionalType {
  id: string;
  code: string;
  name: string;
  description?: string;
  icon?: string;
  display_order?: number;
  is_active: boolean;
}

export interface ServiceCategory {
  id: string;
  code: string;
  name: string;
  description?: string;
  icon?: string;
  display_order?: number;
  is_active: boolean;
}

export interface ServiceSubcategory {
  id: string;
  category_id: string;
  code: string;
  name: string;
  description?: string;
  display_order?: number;
  is_active: boolean;
}

export interface Service {
  id: string;
  subcategory_id: string;
  code: string;
  name: string;
  description?: string;
  typical_price_range?: string;
  display_order?: number;
  is_active: boolean;
}

export interface ServiceHierarchy {
  service_id: string;
  service_code: string;
  service_name: string;
  service_description?: string;
  service_active: boolean;
  subcategory_id: string;
  subcategory_code: string;
  subcategory_name: string;
  category_id: string;
  category_code: string;
  category_name: string;
}

export interface ProfessionalService {
  id: string;
  professional_id: string;
  service_id: string;
  pricing_model_id?: string;
  base_price?: number;
  currency: string;
  service_areas?: string[];
  description?: string;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export interface ServiceBundle {
  id: string;
  code: string;
  name: string;
  description?: string;
  included_services?: string[];
  estimated_savings?: number;
  is_featured: boolean;
  is_active: boolean;
}

export interface ServiceBundleView {
  id: string;
  code: string;
  name: string;
  description?: string;
  included_services?: string[];
  estimated_savings?: number;
  is_featured: boolean;
  is_active: boolean;
  service_count?: number;
  total_typical_price?: number;
}

export interface Professional {
  id: string;
  email: string;
  full_name: string;
  company_name?: string;
  professional_type_id: string;
  languages: string[];
  city?: string;
  region?: string;
  phone?: string;
  website?: string;
  bio?: string;
  years_experience?: number;
  is_verified: boolean;
  is_active: boolean;
  rating?: number;
  service_areas?: string[];
  created_at: string;
  updated_at: string;
}

export interface PricingModel {
  id: string;
  code: string;
  name: string;
  description?: string;
  is_active: boolean;
}

export interface ServiceInquiry {
  id: string;
  buyer_name: string;
  buyer_email: string;
  buyer_phone?: string;
  professional_id: string;
  service_id: string;
  project_description: string;
  budget_range?: string;
  timeline?: string;
  location?: string;
  status: 'pending' | 'contacted' | 'in_progress' | 'completed' | 'cancelled';
  created_at: string;
  updated_at: string;
}

export interface MultiServiceInquiry {
  id: string;
  buyer_name: string;
  buyer_email: string;
  buyer_phone?: string;
  service_ids?: string[];
  service_bundle_id?: string;
  project_description: string;
  budget_range?: string;
  timeline?: string;
  preferred_locations?: string[];
  property_type?: string;
  created_at: string;
}

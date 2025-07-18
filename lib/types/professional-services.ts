// Type definitions for the multi-professional service architecture

export interface ProfessionalType {
  id: string;
  code: string;
  name_en: string;
  name_it: string;
  description_en?: string;
  description_it?: string;
  icon: string;
  category: string;
  requires_certification: boolean;
  display_order: number;
  is_active: boolean;
}

export interface ProfessionalCategory {
  id: string;
  code: string;
  name_en: string;
  name_it: string;
  description_en?: string;
  description_it?: string;
  icon: string;
  display_order: number;
  is_active: boolean;
}

export interface ServiceCategory {
  id: string;
  code: string;
  name_en: string;
  name_it: string;
  description_en?: string;
  description_it?: string;
  icon: string;
  display_order: number;
  is_active: boolean;
}

export interface ServiceSubcategory {
  id: string;
  category_id: string;
  code: string;
  name_en: string;
  name_it: string;
  description_en?: string;
  description_it?: string;
  display_order: number;
  is_active: boolean;
}

export interface Service {
  id: string;
  subcategory_id: string;
  code: string;
  name_en: string;
  name_it: string;
  description_en?: string;
  description_it?: string;
  typical_duration_days?: number;
  requires_site_visit: boolean;
  requires_documents: boolean;
  is_active: boolean;
}

export interface PricingModel {
  id: string;
  code: string;
  name_en: string;
  name_it: string;
  unit_en?: string;
  unit_it?: string;
  description_en?: string;
  description_it?: string;
  is_active: boolean;
}

export interface ProfessionalService {
  id: string;
  professional_id: string;
  service_id: string;
  pricing_model_id: string;
  base_price?: number;
  price_unit?: string;
  min_price?: number;
  max_price?: number;
  duration_days?: number;
  experience_years?: number;
  completed_count: number;
  rating?: number;
  is_featured: boolean;
  is_active: boolean;
}

export interface ServiceBundle {
  id: string;
  code: string;
  name_en: string;
  name_it: string;
  description_en?: string;
  description_it?: string;
  typical_price_min?: number;
  typical_price_max?: number;
  discount_percentage: number;
  is_featured: boolean;
  is_active: boolean;
}

export interface BundleService {
  bundle_id: string;
  service_id: string;
  is_required: boolean;
  display_order: number;
  service?: Service;
}

export interface ServiceHierarchy {
  service_id: string;
  service_code: string;
  service_name_en: string;
  service_name_it: string;
  service_description_en?: string;
  service_description_it?: string;
  typical_duration_days?: number;
  requires_site_visit: boolean;
  requires_documents: boolean;
  service_active: boolean;
  subcategory_id: string;
  subcategory_code: string;
  subcategory_name_en: string;
  subcategory_name_it: string;
  category_id: string;
  category_code: string;
  category_name_en: string;
  category_name_it: string;
  category_icon: string;
}

export interface ProfessionalServiceView {
  id: string;
  professional_id: string;
  service_id: string;
  pricing_model_id: string;
  base_price?: number;
  price_unit?: string;
  min_price?: number;
  max_price?: number;
  duration_days?: number;
  experience_years?: number;
  completed_count: number;
  rating?: number;
  is_featured: boolean;
  is_active: boolean;
  // From joins
  first_name: string;
  last_name: string;
  company_name?: string;
  service_areas: string[];
  is_verified: boolean;
  professional_rating?: number;
  professional_type_en: string;
  professional_type_it: string;
  service_name_en: string;
  service_name_it: string;
  pricing_model_en?: string;
  pricing_model_it?: string;
  price_unit_en?: string;
  price_unit_it?: string;
}

export interface ServiceBundleView {
  id: string;
  code: string;
  name_en: string;
  name_it: string;
  description_en?: string;
  description_it?: string;
  typical_price_min?: number;
  typical_price_max?: number;
  discount_percentage: number;
  is_featured: boolean;
  is_active: boolean;
  services: {
    service_id: string;
    service_code: string;
    service_name_en: string;
    service_name_it: string;
    is_required: boolean;
    typical_duration_days?: number;
  }[];
}

// Extended Inquiry type to support multiple services
export interface MultiServiceInquiry {
  id: string;
  buyer_id?: string;
  professional_id?: string;
  property_types: string[];
  budget: string;
  budget_range: string;
  locations: string[];
  preferred_locations: string[];
  timeline?: string;
  purpose?: string;
  purchase_purpose?: string;
  has_visited_puglia: boolean;
  needs_financing: boolean;
  is_survey_request: boolean;
  additional_notes?: string;
  property_address?: string;
  property_city?: string;
  property_province?: string;
  cadastral_details?: string;
  survey_types: string[];
  urgency?: string;
  max_budget?: string;
  status: string;
  priority: string;
  assigned_to?: string;
  // New fields for multi-service support
  service_ids: string[];
  bundle_id?: string;
  estimated_budget?: number;
  created_at: string;
  updated_at: string;
}

export interface InquiryService {
  inquiry_id: string;
  service_id: string;
  quantity: number;
  notes?: string;
}

export interface QuoteService {
  id: string;
  quote_id: string;
  service_id: string;
  pricing_model_id: string;
  quantity: number;
  unit_price: number;
  total_price: number;
  duration_days?: number;
  notes?: string;
}

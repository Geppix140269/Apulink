import { supabase } from './client';
import type {
  ProfessionalType,
  Service,
  ServiceCategory,
  ServiceHierarchy,
  ProfessionalService,
  ServiceBundle,
  ServiceBundleView,
  PricingModel,
  MultiServiceInquiry
} from '@/lib/types/professional-services';

// Professional Types
export async function getProfessionalTypes() {
  const { data, error } = await supabase
    .from('professional_types')
    .select('*')
    .eq('is_active', true)
    .order('display_order');
  
  return { data: data as ProfessionalType[] | null, error };
}

export async function getProfessionalTypeByCode(code: string) {
  const { data, error } = await supabase
    .from('professional_types')
    .select('*')
    .eq('code', code)
    .eq('is_active', true)
    .single();
  
  return { data: data as ProfessionalType | null, error };
}

// Service Categories
export async function getServiceCategories() {
  const { data, error } = await supabase
    .from('service_categories')
    .select('*')
    .eq('is_active', true)
    .order('display_order');
  
  return { data: data as ServiceCategory[] | null, error };
}

// Service Hierarchy
export async function getServiceHierarchy() {
  const { data, error } = await supabase
    .from('v_service_hierarchy')
    .select('*')
    .order('category_code, subcategory_code, service_code');
  
  return { data: data as ServiceHierarchy[] | null, error };
}

export async function getServicesByCategory(categoryCode: string) {
  const { data, error } = await supabase
    .from('v_service_hierarchy')
    .select('*')
    .eq('category_code', categoryCode)
    .eq('service_active', true);
  
  return { data: data as ServiceHierarchy[] | null, error };
}

export async function getServicesForProfessionalType(professionalTypeId: string) {
  const { data, error } = await supabase
    .from('professional_type_services')
    .select(`
      *,
      services!inner (
        *,
        service_subcategories!inner (
          *,
          service_categories!inner (*)
        )
      ),
      pricing_models (*)
    `)
    .eq('professional_type_id', professionalTypeId);
  
  return { data, error };
}

// Service Bundles
export async function getServiceBundles() {
  const { data, error } = await supabase
    .from('v_service_bundles')
    .select('*')
    .eq('is_active', true)
    .order('is_featured desc, code');
  
  return { data: data as ServiceBundleView[] | null, error };
}

export async function getServiceBundleByCode(code: string) {
  const { data, error } = await supabase
    .from('v_service_bundles')
    .select('*')
    .eq('code', code)
    .single();
  
  return { data: data as ServiceBundleView | null, error };
}

// Pricing Models
export async function getPricingModels() {
  const { data, error } = await supabase
    .from('pricing_models')
    .select('*')
    .eq('is_active', true);
  
  return { data: data as PricingModel[] | null, error };
}

// Professional Services
export async function getProfessionalServices(professionalId: string) {
  const { data, error } = await supabase
    .from('v_professional_services')
    .select('*')
    .eq('professional_id', professionalId)
    .eq('is_active', true);
  
  return { data, error };
}

export async function addProfessionalService(service: Partial<ProfessionalService>) {
  const { data, error } = await supabase
    .from('professional_services')
    .insert([service])
    .select()
    .single();
  
  return { data, error };
}

export async function updateProfessionalService(id: string, updates: Partial<ProfessionalService>) {
  const { data, error } = await supabase
    .from('professional_services')
    .update(updates)
    .eq('id', id)
    .select()
    .single();
  
  return { data, error };
}

export async function removeProfessionalService(id: string) {
  const { data, error } = await supabase
    .from('professional_services')
    .update({ is_active: false })
    .eq('id', id);
  
  return { data, error };
}

// Search Functions
export async function searchProfessionalsByService(
  serviceId: string,
  location?: string,
  priceRange?: { min?: number; max?: number }
) {
  let query = supabase
    .from('v_professional_services')
    .select('*')
    .eq('service_id', serviceId)
    .eq('is_active', true)
    .eq('is_verified', true);

  if (location) {
    query = query.contains('service_areas', [location]);
  }

  if (priceRange?.min) {
    query = query.gte('base_price', priceRange.min);
  }

  if (priceRange?.max) {
    query = query.lte('base_price', priceRange.max);
  }

  const { data, error } = await query.order('rating', { ascending: false });
  
  return { data, error };
}

// Multi-Service Inquiry Functions
export async function submitMultiServiceInquiry(inquiry: Partial<MultiServiceInquiry>) {
  try {
    // Insert the main inquiry
    const { data: inquiryData, error: inquiryError } = await supabase
      .from('inquiries')
      .insert([inquiry])
      .select()
      .single();

    if (inquiryError) throw inquiryError;

    // If service_ids are provided, insert into inquiry_services junction table
    if (inquiry.service_ids && inquiry.service_ids.length > 0) {
      const inquiryServices = inquiry.service_ids.map(serviceId => ({
        inquiry_id: inquiryData.id,
        service_id: serviceId,
        quantity: 1
      }));

      const { error: servicesError } = await supabase
        .from('inquiry_services')
        .insert(inquiryServices);

      if (servicesError) throw servicesError;
    }

    return { data: inquiryData, error: null };
  } catch (error) {
    return { data: null, error };
  }
}

export async function getInquiryWithServices(inquiryId: string) {
  const { data, error } = await supabase
    .from('inquiries')
    .select(`
      *,
      inquiry_services (
        *,
        services (
          *,
          service_subcategories (
            *,
            service_categories (*)
          )
        )
      ),
      service_bundles (*)
    `)
    .eq('id', inquiryId)
    .single();
  
  return { data, error };
}

// Match professionals to multi-service inquiries
export async function matchProfessionalsToInquiry(inquiryId: string) {
  // First get the inquiry with its services
  const { data: inquiry, error: inquiryError } = await getInquiryWithServices(inquiryId);
  
  if (inquiryError || !inquiry) {
    return { data: null, error: inquiryError || new Error('Inquiry not found') };
  }

  // Get all service IDs from the inquiry
  const serviceIds = inquiry.inquiry_services.map((is: any) => is.service_id);
  
  // Find professionals who offer ALL requested services in the inquiry location
  const { data: professionals, error: profError } = await supabase
    .from('professionals')
    .select(`
      *,
      professional_types (*),
      professional_services!inner (
        *,
        services (*),
        pricing_models (*)
      )
    `)
    .in('professional_services.service_id', serviceIds)
    .contains('service_areas', inquiry.preferred_locations || [])
    .eq('is_active', true)
    .eq('is_verified', true);

  if (profError) {
    return { data: null, error: profError };
  }

  // Filter to only include professionals who can provide ALL services
  const qualifiedProfessionals = professionals?.filter(prof => {
    const profServiceIds = prof.professional_services.map((ps: any) => ps.service_id);
    return serviceIds.every((id: string) => profServiceIds.includes(id));
  });

  return { data: qualifiedProfessionals, error: null };
}

// Update professional type for existing professionals
export async function updateProfessionalType(professionalId: string, professionalTypeId: string) {
  const { data, error } = await supabase
    .from('professionals')
    .update({ professional_type_id: professionalTypeId })
    .eq('id', professionalId)
    .select()
    .single();
  
  return { data, error };
}

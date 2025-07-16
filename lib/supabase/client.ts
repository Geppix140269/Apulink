// PATH: lib/supabase/client.ts
import { createClient as createSupabaseClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

export const supabase = createSupabaseClient(supabaseUrl, supabaseAnonKey)

// For backward compatibility
export function createClient() {
  return supabase
}

// Helper function to generate anonymous username
function generateAnonymousUsername(city: string): string {
  const code = city.substring(0, 2).toUpperCase()
  const random = Math.floor(Math.random() * 1000).toString().padStart(3, '0')
  return `Surveyor_${code}_${random}`
}

// FIXED: Submit buyer inquiry - matches your EXACT database schema
export async function submitBuyerInquiry(data: any) {
  try {
    console.log('Submitting buyer inquiry with data:', data)
    
    // Step 1: Create or find buyer first (if you want to use buyers table)
    let buyer_id = null
    
    if (data.email) {
      // Try to create buyer record
      const buyerData = {
        first_name: data.first_name || data.firstName,
        last_name: data.last_name || data.lastName,
        email: data.email,
        phone: data.phone,
        nationality: data.nationality,
        preferred_language: data.preferred_language || data.preferredLanguage || 'en',
        created_at: new Date().toISOString()
      }
      
      const { data: buyer, error: buyerError } = await supabase
        .from('buyers')
        .upsert([buyerData], { onConflict: 'email' })
        .select()
        .single()
        
      if (!buyerError && buyer) {
        buyer_id = buyer.id
      }
    }
    
    // Step 2: Create inquiry with ONLY the columns that exist in your table
    const inquiryData = {
      // Reference to buyer (optional)
      buyer_id: buyer_id,
      
      // Property data - using EXACT column names from your schema
      property_types: Array.isArray(data.property_types) ? data.property_types : 
                     Array.isArray(data.propertyType) ? data.propertyType : 
                     data.propertyType ? [data.propertyType] : [],
      
      budget: data.budget_range || data.budget || 'not specified',
      budget_range: data.budget_range || data.budget,
      
      locations: Array.isArray(data.preferred_locations) ? data.preferred_locations :
                Array.isArray(data.locations) ? data.locations :
                data.locations ? [data.locations] : [],
      preferred_locations: Array.isArray(data.preferred_locations) ? data.preferred_locations :
                          Array.isArray(data.locations) ? data.locations :
                          data.locations ? [data.locations] : [],
      
      timeline: data.timeline,
      purpose: data.purchase_purpose || data.purpose,
      purchase_purpose: data.purchase_purpose || data.purpose,
      
      // Boolean fields
      has_visited_puglia: Boolean(data.has_visited_puglia || data.hasVisitedPuglia),
      needs_financing: Boolean(data.needs_financing || data.needsFinancing),
      is_survey_request: Boolean(data.is_survey_request),
      
      // Text fields
      additional_notes: data.additional_notes || data.additionalNotes || '',
      property_address: data.property_address,
      property_city: data.property_city,
      property_province: data.property_province,
      cadastral_details: data.cadastral_details,
      
      // Array fields
      survey_types: Array.isArray(data.survey_types) ? data.survey_types : [],
      
      // Other fields
      urgency: data.urgency,
      max_budget: data.max_budget,
      
      // System fields
      status: 'new',
      priority: 'normal',
      created_at: new Date().toISOString()
    }

    console.log('Prepared inquiry data for your schema:', inquiryData)

    // Insert into inquiries table
    const { data: inquiry, error } = await supabase
      .from('inquiries')
      .insert([inquiryData])
      .select()
      .single()

    if (error) {
      console.error('Supabase error:', error)
      return { success: false, error: error.message }
    }

    console.log('Successfully created inquiry:', inquiry)
    return { success: true, data: inquiry }

  } catch (error) {
    console.error('Error submitting inquiry:', error)
    return { success: false, error: error instanceof Error ? error.message : 'Unknown error' }
  }
}

// Submit professional registration
export async function submitProfessionalRegistration(data: any) {
  try {
    console.log('Submitting professional registration with data:', data)
    
    const professionalData = {
      first_name: data.first_name || data.firstName,
      last_name: data.last_name || data.lastName,
      email: data.email,
      phone: data.phone,
      profession: data.profession || data.profession_type,
      company_name: data.company_name || data.companyName,
      vat_number: data.vat_number || data.vatNumber,
      professional_license: data.professional_license || data.professionalLicense,
      years_experience: data.years_experience || data.yearsExperience,
      website: data.website,
      services: Array.isArray(data.services) ? data.services : 
               Array.isArray(data.services_offered) ? data.services_offered : [],
      languages: Array.isArray(data.languages) ? data.languages : [],
      service_areas: Array.isArray(data.service_areas) ? data.service_areas : 
                    Array.isArray(data.serviceAreas) ? data.serviceAreas : [],
      max_distance: data.max_distance || data.maxDistance || '50',
      clients_served: data.clients_served || data.clientsServed,
      specializations: Array.isArray(data.specializations) ? data.specializations : [],
      bio: data.bio,
      is_surveyor: Boolean(data.is_surveyor),
      survey_types: Array.isArray(data.survey_types) ? data.survey_types : [],
      anonymous_username: data.anonymous_username,
      is_verified: false,
      is_active: true,
      created_at: new Date().toISOString()
    }

    // Generate anonymous username for surveyors
    if (professionalData.is_surveyor && professionalData.service_areas?.length > 0) {
      professionalData.anonymous_username = generateAnonymousUsername(
        professionalData.service_areas[0]
      )
    }

    const { data: professional, error } = await supabase
      .from('professionals')
      .insert([professionalData])
      .select()
      .single()

    if (error) {
      console.error('Error registering professional:', error)
      return { success: false, error: error.message }
    }

    console.log('Successfully registered professional:', professional)
    return { success: true, data: professional }

  } catch (error) {
    console.error('Error in professional registration:', error)
    return { success: false, error: error instanceof Error ? error.message : 'Unknown error' }
  }
}

// Get inquiries (filtered by is_survey_request)
export async function getProfessionalInquiries(professionalId: string, isSurveyor = false) {
  const { data, error } = await supabase
    .from('inquiries')
    .select('*')
    .eq('is_survey_request', isSurveyor)
    .order('created_at', { ascending: false })

  if (error) {
    console.error('Error fetching inquiries:', error)
    throw error
  }

  return data
}

// Submit a quote
export async function submitQuote(data: {
  inquiry_id: string
  professional_id: string
  price: number
  estimated_delivery_days: number
  message?: string
  includes_site_visit: boolean
  includes_cad_drawings: boolean
}) {
  const { data: quote, error } = await supabase
    .from('quotes')
    .insert([{ ...data, created_at: new Date().toISOString() }])
    .select()
    .single()

  if (error) {
    console.error('Error submitting quote:', error)
    throw error
  }

  return quote
}

// Get all quotes for an inquiry
export async function getInquiryQuotes(inquiryId: string) {
  const { data, error } = await supabase
    .from('quotes')
    .select(`
      *,
      professionals (
        anonymous_username,
        years_experience,
        service_areas
      )
    `)
    .eq('inquiry_id', inquiryId)
    .order('price', { ascending: true })

  if (error) {
    console.error('Error fetching quotes:', error)
    throw error
  }

  return data
}

// Basic contact info filter
export function checkForContactInfo(message: string): boolean {
  const emailPattern = /\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}\b/
  const phonePatterns = [
    /\b\d{3}[-.]?\d{3}[-.]?\d{4}\b/,
    /\b\d{10}\b/,
    /\b\+\d{1,3}\s?\d{3,14}\b/,
    /\b\(\d{3}\)\s?\d{3}[-.]?\d{4}\b/
  ]
  const keywords = ['whatsapp', 'telegram', 'skype', 'email me', 'call me', 'contact me', 'reach me', '@gmail', '@yahoo', '@hotmail']

  const text = message.toLowerCase()

  if (emailPattern.test(text)) return true
  if (phonePatterns.some(p => p.test(text))) return true
  if (keywords.some(k => text.includes(k))) return true

  return false
}

// Flag message in DB
export async function flagMessageIfNeeded(messageId: string, content: string) {
  if (!checkForContactInfo(content)) return false

  const { error } = await supabase
    .from('messages')
    .update({ flagged: true, flag_reason: 'Contains contact information' })
    .eq('id', messageId)

  if (error) console.error('Error flagging message:', error)
  return true
}

// Survey-specific compatibility wrappers
export async function submitSurveyRequest(data: any) {
  return submitBuyerInquiry({
    ...data,
    is_survey_request: true,
    first_name: data.firstName,
    last_name: data.lastName,
    property_city: data.city,
    property_province: data.province,
    survey_types: Array.isArray(data.surveyType) ? data.surveyType : [data.surveyType],
    max_budget: data.maxBudget
  })
}

export async function registerSurveyor(data: any) {
  return submitProfessionalRegistration({
    ...data,
    is_surveyor: true,
    first_name: data.firstName,
    last_name: data.lastName,
    profession_type: 'geometra',
    years_experience: data.yearsExperience || '5+',
    company_name: data.companyName,
    services_offered: data.surveyTypes || [],
    service_areas: data.provinces || [],
    survey_types: data.surveyTypes
  })
}

// Get survey requests
export async function getSurveyRequests() {
  const { data, error } = await supabase
    .from('inquiries')
    .select('*')
    .eq('is_survey_request', true)
    .order('created_at', { ascending: false })

  if (error) throw error
  return data
}

// Get registered surveyors
export async function getSurveyors() {
  const { data, error } = await supabase
    .from('professionals')
    .select('*')
    .eq('is_surveyor', true)
    .order('created_at', { ascending: false })

  if (error) throw error
  return data
}

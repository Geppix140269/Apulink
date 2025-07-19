// PATH: app/professional/register/page.tsx
// ONLY SHOWING THE MODIFIED handleSubmit FUNCTION
// Replace the existing handleSubmit function with this one:

const handleSubmit = async () => {
  setIsSubmitting(true)
  
  try {
    // Prepare data for Supabase
    const professionalData = {
      first_name: formData.firstName,
      last_name: formData.lastName,
      email: formData.email,
      phone: formData.phone,
      profession: formData.profession,
      company_name: formData.companyName,
      vat_number: formData.vatNumber,
      professional_license: formData.professionalLicense,
      years_experience: formData.yearsExperience,
      website: formData.website,
      services: formData.services,
      languages: formData.languages,
      service_areas: formData.serviceAreas,
      max_distance: formData.maxDistance,
      clients_served: formData.clientsServed,
      specializations: formData.specializations,
      bio: formData.bio
    }

    console.log('Submitting professional data:', professionalData)

    // Submit to Supabase
    const { success, error, data } = await submitProfessionalRegistration(professionalData)
    
    console.log('Registration result:', { success, error, data })
    
    if (success) {
      // Send notification email (API route)
      try {
        await fetch('/api/notifications/professional-registration', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            ...professionalData,
            preferred_language: language
          })
        })
      } catch (emailError) {
        console.error('Email notification failed:', emailError)
        // Don't block the user if email fails
      }
      
      // Redirect to success page
      router.push('/professional/register/success')
    } else {
      // Show detailed error message
      const errorMessage = error || 'Unknown error occurred'
      console.error('Registration failed:', errorMessage)
      
      alert(language === 'it' 
        ? `Errore durante la registrazione: ${errorMessage}\n\nPer favore, contatta support@apulink.com per assistenza.` 
        : `Registration error: ${errorMessage}\n\nPlease contact support@apulink.com for assistance.`
      )
    }
  } catch (error) {
    console.error('Unexpected error:', error)
    alert(language === 'it' 
      ? `Errore inaspettato: ${error}\n\nPer favore, contatta support@apulink.com per assistenza.` 
      : `Unexpected error: ${error}\n\nPlease contact support@apulink.com for assistance.`
    )
  } finally {
    setIsSubmitting(false)
  }
}

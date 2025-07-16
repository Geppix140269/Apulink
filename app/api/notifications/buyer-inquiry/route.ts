// PATH: app/api/notifications/buyer-inquiry/route.ts
import { NextResponse } from 'next/server'

// Using Resend as it's simpler than SendGrid for MVP
// Install: npm install resend

export async function POST(request: Request) {
  try {
    const data = await request.json()
    
    // For MVP, just log to console
    // In production, use Resend or SendGrid
    console.log('New buyer inquiry received:', {
      name: `${data.first_name} ${data.last_name}`,
      email: data.email,
      budget: data.budget_range,
      locations: data.preferred_locations.join(', ')
    })

    // Basic email setup with Resend (when ready)
    // const resend = new Resend(process.env.RESEND_API_KEY)
    
    // Send to admin
    // await resend.emails.send({
    //   from: 'Apulink <noreply@apulink.com>',
    //   to: 'admin@apulink.com',
    //   subject: 'New Buyer Inquiry',
    //   html: `
    //     <h2>New Buyer Inquiry</h2>
    //     <p><strong>Name:</strong> ${data.first_name} ${data.last_name}</p>
    //     <p><strong>Email:</strong> ${data.email}</p>
    //     <p><strong>Budget:</strong> ${data.budget_range}</p>
    //     <p><strong>Locations:</strong> ${data.preferred_locations.join(', ')}</p>
    //     <p><strong>Timeline:</strong> ${data.timeline}</p>
    //   `
    // })

    // Send to buyer
    // await resend.emails.send({
    //   from: 'Apulink <hello@apulink.com>',
    //   to: data.email,
    //   subject: data.preferred_language === 'it' 
    //     ? 'Abbiamo ricevuto la tua richiesta' 
    //     : 'We received your inquiry',
    //   html: data.preferred_language === 'it' 
    //     ? `<h2>Ciao ${data.first_name}!</h2><p>Grazie per il tuo interesse...</p>`
    //     : `<h2>Hello ${data.first_name}!</h2><p>Thank you for your interest...</p>`
    // })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Error sending notification:', error)
    return NextResponse.json(
      { error: 'Failed to send notification' },
      { status: 500 }
    )
  }
}

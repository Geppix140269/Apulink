// PATH: app/api/notifications/professional-registration/route.ts
import { NextResponse } from 'next/server'

export async function POST(request: Request) {
  try {
    const data = await request.json()
    
    // For MVP, just log to console
    console.log('New professional registration:', {
      name: `${data.first_name} ${data.last_name}`,
      email: data.email,
      profession: data.profession,
      company: data.company_name,
      areas: data.service_areas.join(', ')
    })

    // When ready, implement email sending here
    // Similar to buyer inquiry but for professionals

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Error sending notification:', error)
    return NextResponse.json(
      { error: 'Failed to send notification' },
      { status: 500 }
    )
  }
}

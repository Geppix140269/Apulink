// PATH: app/api/emails/test/route.ts
import { NextResponse } from 'next/server'
import { 
  sendBuyerConfirmation, 
  sendAdminAlert, 
  sendSurveyorNotification,
  testEmailConnection 
} from '@/lib/email/service'

export async function POST(request: Request) {
  try {
    const { type, email } = await request.json()

    if (!email) {
      return NextResponse.json({ error: 'Email address required' }, { status: 400 })
    }

    let result;

    switch (type) {
      case 'buyer':
        result = await sendBuyerConfirmation({
          buyer_name: 'Test Buyer',
          buyer_email: email,
          request_id: 'TEST123',
          property_address: 'Via Roma 123, Bari, BA',
          property_type: 'Apartment',
          survey_types: 'Structural, Electrical',
          budget_range: '800-1200',
          timeline: '2 weeks'
        })
        break

      case 'admin':
        // Override ADMIN_EMAIL for testing
        process.env.ADMIN_EMAIL = email
        result = await sendAdminAlert({
          request_id: 'TEST123',
          submission_time: new Date().toLocaleString(),
          buyer_name: 'Test Buyer',
          buyer_email: 'testbuyer@example.com',
          property_address: 'Via Roma 123, Bari, BA',
          property_type: 'Apartment',
          survey_types: 'Structural, Electrical',
          budget_range: '800-1200',
          timeline: '2 weeks',
          matched_count: 3,
          city: 'Bari'
        })
        break

      case 'surveyor':
        result = await sendSurveyorNotification({
          surveyor_name: 'Test Surveyor',
          surveyor_email: email,
          city: 'Bari',
          property_type: 'Apartment',
          survey_types: 'Structural, Electrical',
          budget_range: '800-1200',
          timeline: '2 weeks',
          bidding_deadline: new Date(Date.now() + 48 * 60 * 60 * 1000).toLocaleDateString(),
          request_id: 'TEST123',
          anonymous_handle: 'Surveyor_BA_001'
        })
        break

      case 'test':
        // Override ADMIN_EMAIL for testing
        process.env.ADMIN_EMAIL = email
        result = await testEmailConnection()
        break

      default:
        return NextResponse.json({ error: 'Invalid email type' }, { status: 400 })
    }

    if (result.success) {
      return NextResponse.json({ 
        success: true, 
        message: 'Email sent successfully',
        data: result.data 
      })
    } else {
      return NextResponse.json({ 
        error: 'Failed to send email',
        details: result.error 
      }, { status: 500 })
    }

  } catch (error: any) {
    console.error('Email test error:', error)
    return NextResponse.json({ 
      error: 'Server error',
      details: error.message 
    }, { status: 500 })
  }
}

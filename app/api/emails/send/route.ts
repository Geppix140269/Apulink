// PATH: app/api/emails/send/route.ts
import { NextResponse } from 'next/server'
import { Resend } from 'resend'

const resend = new Resend(process.env.RESEND_API_KEY)

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { type, data } = body

    let emailHtml = ''
    let subject = ''
    let to = ''

    switch (type) {
      case 'buyer_confirmation':
        to = data.buyer_email
        subject = 'Survey Request Confirmed - Apulink'
        emailHtml = getBuyerConfirmationEmail(data)
        break
      
      case 'admin_notification':
        to = 'admin@apulink.com' // CHANGE THIS TO YOUR EMAIL
        subject = `New Survey Request #${data.request_id}`
        emailHtml = getAdminNotificationEmail(data)
        break
      
      case 'surveyor_notification':
        to = data.surveyor_email
        subject = 'New Survey Opportunity - Apulink'
        emailHtml = getSurveyorNotificationEmail(data)
        break
    }

    const { data: emailData, error } = await resend.emails.send({
      from: 'Apulink <noreply@yourdomain.com>', // CHANGE TO YOUR VERIFIED DOMAIN
      to,
      subject,
      html: emailHtml,
    })

    if (error) {
      return NextResponse.json({ error }, { status: 400 })
    }

    return NextResponse.json({ success: true, id: emailData?.id })
  } catch (error) {
    return NextResponse.json({ error: 'Failed to send email' }, { status: 500 })
  }
}

function getBuyerConfirmationEmail(data: any) {
  return `
    <!DOCTYPE html>
    <html>
    <head>
        <meta charset="UTF-8">
        <title>Survey Request Confirmed</title>
    </head>
    <body style="margin: 0; padding: 0; font-family: Arial, sans-serif; background-color: #f5f5f5;">
        <div style="max-width: 600px; margin: 0 auto; background-color: #ffffff;">
            <div style="background-color: #E2725B; padding: 40px 20px; text-align: center;">
                <h1 style="color: #ffffff; margin: 0; font-size: 28px; letter-spacing: 2px;">APULINK</h1>
                <p style="color: #ffffff; margin: 10px 0 0 0; font-size: 12px; letter-spacing: 1px; opacity: 0.9;">PROPERTY SURVEY SYSTEM</p>
            </div>
            <div style="padding: 40px 20px;">
                <h2 style="color: #333; margin-bottom: 20px;">Hello ${data.buyer_name},</h2>
                <p style="color: #666; line-height: 1.6; margin-bottom: 20px;">Your property survey request has been successfully submitted. We are now matching you with qualified surveyors in Puglia who specialize in your property type.</p>
                
                <div style="background-color: #f8f8f8; padding: 20px; margin: 20px 0; border-left: 4px solid #E2725B;">
                    <h3 style="color: #333; margin-top: 0;">Survey Request Details:</h3>
                    <table style="width: 100%;">
                        <tr><td style="padding: 5px 0; color: #666;"><strong>Property Location:</strong></td><td>${data.property_address}</td></tr>
                        <tr><td style="padding: 5px 0; color: #666;"><strong>Property Type:</strong></td><td>${data.property_type}</td></tr>
                        <tr><td style="padding: 5px 0; color: #666;"><strong>Survey Types:</strong></td><td>${data.survey_types}</td></tr>
                        <tr><td style="padding: 5px 0; color: #666;"><strong>Budget Range:</strong></td><td>${data.budget_range}</td></tr>
                        <tr><td style="padding: 5px 0; color: #666;"><strong>Timeline:</strong></td><td>${data.timeline}</td></tr>
                        <tr><td style="padding: 5px 0; color: #666;"><strong>Request ID:</strong></td><td>#${data.request_id}</td></tr>
                    </table>
                </div>

                <h3 style="color: #333; margin-top: 30px;">What Happens Next?</h3>
                <ol style="color: #666; line-height: 1.8;">
                    <li>Your request is being sent to qualified surveyors</li>
                    <li>You will receive competitive bids within 24-48 hours</li>
                    <li>Compare bids and ask questions anonymously</li>
                    <li>Select your surveyor and begin your project</li>
                </ol>
                
                <div style="text-align: center; margin: 40px 0;">
                    <a href="https://apulink.com/dashboard" style="background-color: #E2725B; color: white; padding: 12px 30px; text-decoration: none; border-radius: 5px; display: inline-block;">View Your Dashboard</a>
                </div>

                <p style="color: #999; font-size: 14px; text-align: center; margin-top: 40px;">
                    If you have any questions, contact us at support@apulink.com
                </p>
            </div>
        </div>
    </body>
    </html>
  `
}

function getAdminNotificationEmail(data: any) {
  return `
    <!DOCTYPE html>
    <html>
    <head>
        <meta charset="UTF-8">
        <title>New Survey Request</title>
    </head>
    <body style="margin: 0; padding: 0; font-family: Arial, sans-serif;">
        <div style="max-width: 600px; margin: 0 auto; background-color: #ffffff; border: 1px solid #ddd;">
            <div style="background-color: #2c3e50; padding: 20px; text-align: center;">
                <h1 style="color: #ffffff; margin: 0; font-size: 24px;">🚨 New Survey Request #${data.request_id}</h1>
            </div>
            <div style="padding: 30px;">
                <div style="background-color: #e8f4f8; border-left: 4px solid #3498db; padding: 15px; margin-bottom: 20px;">
                    <p style="margin: 0; color: #2c3e50;"><strong>Submitted:</strong> ${new Date().toLocaleString()}</p>
                </div>

                <h2 style="color: #2c3e50; font-size: 20px; margin-bottom: 15px;">Buyer Information</h2>
                <table style="width: 100%; margin-bottom: 30px;">
                    <tr><td style="padding: 8px 0; color: #555;"><strong>Name:</strong></td><td>${data.buyer_name}</td></tr>
                    <tr><td style="padding: 8px 0; color: #555;"><strong>Email:</strong></td><td><a href="mailto:${data.buyer_email}" style="color: #3498db;">${data.buyer_email}</a></td></tr>
                    <tr><td style="padding: 8px 0; color: #555;"><strong>Phone:</strong></td><td>${data.buyer_phone}</td></tr>
                    <tr><td style="padding: 8px 0; color: #555;"><strong>Language:</strong></td><td>${data.preferred_language || 'English'}</td></tr>
                </table>

                <h2 style="color: #2c3e50; font-size: 20px; margin-bottom: 15px;">Survey Details</h2>
                <table style="width: 100%; margin-bottom: 30px;">
                    <tr><td style="padding: 8px 0; color: #555;"><strong>Property Location:</strong></td><td>${data.property_address}</td></tr>
                    <tr><td style="padding: 8px 0; color: #555;"><strong>Property Type:</strong></td><td>${data.property_type}</td></tr>
                    <tr><td style="padding: 8px 0; color: #555;"><strong>Survey Types:</strong></td><td>${data.survey_types}</td></tr>
                    <tr><td style="padding: 8px 0; color: #555;"><strong>Budget Range:</strong></td><td>${data.budget_range}</td></tr>
                    <tr><td style="padding: 8px 0; color: #555;"><strong>Timeline:</strong></td><td>${data.timeline}</td></tr>
                    <tr><td style="padding: 8px 0; color: #555;"><strong>Documents:</strong></td><td>${data.document_count || '0'} files uploaded</td></tr>
                </table>

                ${data.additional_notes ? `
                <div style="background-color: #fff3cd; border: 1px solid #ffeaa7; border-radius: 5px; padding: 15px; margin: 20px 0;">
                    <h3 style="color: #856404; margin-top: 0;">Additional Notes:</h3>
                    <p style="color: #856404; margin: 0;">${data.additional_notes}</p>
                </div>
                ` : ''}

                <h3 style="color: #2c3e50;">System Information</h3>
                <ul style="color: #666;">
                    <li>Matched Surveyors: ${data.matched_surveyor_count || '0'}</li>
                    <li>Property City: ${data.property_city}</li>
                    <li>Property Province: ${data.property_province}</li>
                </ul>
            </div>
        </div>
    </body>
    </html>
  `
}

function getSurveyorNotificationEmail(data: any) {
  return `
    <!DOCTYPE html>
    <html>
    <head>
        <meta charset="UTF-8">
        <title>New Survey Opportunity</title>
    </head>
    <body style="margin: 0; padding: 0; font-family: Arial, sans-serif; background-color: #f5f5f5;">
        <div style="max-width: 600px; margin: 0 auto; background-color: #ffffff;">
            <div style="background-color: #27ae60; padding: 40px 20px; text-align: center;">
                <h1 style="color: #ffffff; margin: 0; font-size: 28px; letter-spacing: 2px;">APULINK</h1>
                <p style="color: #ffffff; margin: 10px 0 0 0; font-size: 12px; letter-spacing: 1px; opacity: 0.9;">PROPERTY SURVEY SYSTEM</p>
                <h2 style="color: #ffffff; margin: 20px 0 0 0; font-size: 24px; font-weight: normal;">New Survey Opportunity!</h2>
            </div>
            <div style="padding: 40px 20px;">
                <h2 style="color: #333; margin-bottom: 20px;">Hello ${data.surveyor_name},</h2>
                <p style="color: #666; line-height: 1.6; margin-bottom: 20px;">A new survey request matching your expertise has been posted. Submit your bid now to win this project!</p>
                
                <div style="background-color: #e8f8f0; border: 2px solid #27ae60; border-radius: 10px; padding: 20px; margin: 20px 0;">
                    <h3 style="color: #27ae60; margin-top: 0; text-align: center;">Survey Opportunity Details</h3>
                    <table style="width: 100%; color: #333;">
                        <tr><td style="padding: 8px 0;"><strong>📍 Location:</strong></td><td>${data.property_city}, ${data.property_province}</td></tr>
                        <tr><td style="padding: 8px 0;"><strong>🏠 Property Type:</strong></td><td>${data.property_type}</td></tr>
                        <tr><td style="padding: 8px 0;"><strong>📋 Survey Types:</strong></td><td>${data.survey_types}</td></tr>
                        <tr><td style="padding: 8px 0;"><strong>💰 Budget Range:</strong></td><td>${data.budget_range}</td></tr>
                        <tr><td style="padding: 8px 0;"><strong>⏱️ Timeline:</strong></td><td>${data.timeline}</td></tr>
                        <tr><td style="padding: 8px 0;"><strong>📄 Documents:</strong></td><td>${data.document_count || '0'} files available</td></tr>
                    </table>
                </div>

                <div style="background-color: #fff3cd; border-left: 4px solid #ffc107; padding: 15px; margin: 20px 0;">
                    <p style="color: #856404; margin: 0;">
                        <strong>⏰ Time Sensitive:</strong> Submit your bid quickly to increase your chances of selection.
                    </p>
                </div>

                <div style="text-align: center; margin: 40px 0;">
                    <a href="https://apulink.com/surveyor/dashboard" style="background-color: #27ae60; color: white; padding: 15px 40px; text-decoration: none; border-radius: 5px; display: inline-block; font-size: 18px;">Submit Your Bid Now</a>
                </div>

                <p style="color: #999; font-size: 14px; text-align: center; margin-top: 40px;">
                    Remember: All communication remains anonymous until the buyer selects a bid.
                </p>
            </div>
        </div>
    </body>
    </html>
  `
}

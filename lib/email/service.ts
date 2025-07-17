// PATH: lib/email/service.ts
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

// Email template functions that return HTML strings
function getBuyerConfirmationHTML(data: {
  buyer_name: string;
  buyer_email: string;  // ADD THIS LINE
  request_id: string;
  property_address: string;
  property_type: string;
  survey_types: string;
  budget_range: string;
  timeline: string;
}): string {
  return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <title>Survey Request Confirmed</title>
</head>
<body style="margin: 0; padding: 0; font-family: Arial, sans-serif; background-color: #f3f4f6;">
  <div style="max-width: 600px; margin: 0 auto; background-color: #ffffff;">
    <!-- Header -->
    <div style="background-color: #2563eb; padding: 40px 20px; text-align: center;">
      <h1 style="color: #ffffff; margin: 0; font-size: 32px; font-weight: bold;">SurvEYES™</h1>
      <p style="color: #ffffff; margin: 10px 0 0; font-size: 16px; opacity: 0.9;">
        Property Surveys in Puglia - Transparent Bidding, Trusted Results
      </p>
    </div>
    
    <!-- Content -->
    <div style="padding: 40px 30px;">
      <h2 style="color: #1f2937; font-size: 24px; margin: 0 0 20px;">Ciao ${data.buyer_name}!</h2>
      
      <p style="color: #4b5563; font-size: 16px; line-height: 1.6; margin: 0 0 20px;">
        Your survey request has been successfully submitted and is now being reviewed by our network of verified surveyors in Puglia.
      </p>
      
      <!-- Property Details Box -->
      <div style="background-color: #f8fafc; padding: 25px; border-radius: 8px; margin: 25px 0; border-left: 4px solid #2563eb;">
        <h3 style="color: #374151; font-size: 18px; margin: 0 0 15px;">📍 Your Survey Request Details</h3>
        <table style="width: 100%;">
          <tr><td style="padding: 5px 0; color: #6b7280;"><strong>Request ID:</strong></td><td>#${data.request_id}</td></tr>
          <tr><td style="padding: 5px 0; color: #6b7280;"><strong>Property Address:</strong></td><td>${data.property_address}</td></tr>
          <tr><td style="padding: 5px 0; color: #6b7280;"><strong>Property Type:</strong></td><td>${data.property_type}</td></tr>
          <tr><td style="padding: 5px 0; color: #6b7280;"><strong>Survey Types:</strong></td><td>${data.survey_types}</td></tr>
          <tr><td style="padding: 5px 0; color: #6b7280;"><strong>Budget Range:</strong></td><td>€${data.budget_range}</td></tr>
          <tr><td style="padding: 5px 0; color: #6b7280;"><strong>Timeline:</strong></td><td>${data.timeline}</td></tr>
        </table>
      </div>
      
      <!-- Next Steps -->
      <div style="background-color: #dbeafe; padding: 25px; border-radius: 8px; margin: 25px 0;">
        <h3 style="color: #374151; font-size: 18px; margin: 0 0 15px;">🎯 What happens next?</h3>
        <p style="color: #4b5563; margin: 0 0 12px;"><strong>Within 24 hours:</strong> Qualified surveyors will submit anonymous bids</p>
        <p style="color: #4b5563; margin: 0 0 12px;"><strong>Review period:</strong> Compare bids, ask questions anonymously</p>
        <p style="color: #4b5563; margin: 0 0 12px;"><strong>Selection:</strong> Choose your preferred surveyor and pay a small deposit</p>
        <p style="color: #4b5563; margin: 0;"><strong>Contact exchange:</strong> Connect directly with your chosen surveyor</p>
      </div>
      
      <p style="color: #4b5563; font-size: 16px; line-height: 1.6; margin: 20px 0;">
        We'll notify you as soon as the first bids start coming in. You can track your request and review bids at any time:
      </p>
      
      <!-- CTA Button -->
      <div style="text-align: center; margin: 30px 0;">
        <a href="https://apulink.com/request/${data.request_id}" style="background-color: #2563eb; color: #ffffff; padding: 14px 28px; text-decoration: none; border-radius: 6px; display: inline-block; font-size: 16px; font-weight: 600;">
          View Your Request
        </a>
      </div>
      
      <p style="color: #4b5563; font-size: 16px; line-height: 1.6; margin: 20px 0;">
        <strong>Need help?</strong> Reply to this email or contact us at info@apulink.com
      </p>
      
      <p style="color: #4b5563; font-size: 16px; line-height: 1.6;">
        Grazie for choosing SurvEYES™!<br>
        The Apulink Team
      </p>
    </div>
    
    <!-- Footer -->
    <div style="text-align: center; padding: 30px 20px; border-top: 1px solid #e5e7eb;">
      <p style="color: #6b7280; font-size: 13px; margin: 0 0 5px;">
        SurvEYES™ by Apulink | Property Surveys in Puglia, Italy
      </p>
      <p style="color: #6b7280; font-size: 13px; margin: 0;">
        This email was sent to ${data.buyer_email || 'you'} regarding request #${data.request_id}
      </p>
    </div>
  </div>
</body>
</html>
  `;
}

function getAdminAlertHTML(data: {
  request_id: string;
  submission_time: string;
  buyer_name: string;
  buyer_email: string;
  property_address: string;
  property_type: string;
  survey_types: string;
  budget_range: string;
  timeline: string;
  matched_count: number;
  city: string;
}): string {
  return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <title>New Survey Request Alert</title>
</head>
<body style="margin: 0; padding: 0; font-family: Arial, sans-serif;">
  <div style="max-width: 600px; margin: 0 auto; background-color: #ffffff;">
    <!-- Header -->
    <div style="background-color: #dc2626; padding: 30px 20px; text-align: center;">
      <h1 style="color: #ffffff; margin: 0; font-size: 24px;">🚨 ADMIN ALERT</h1>
      <p style="color: #ffffff; margin: 10px 0 0; font-size: 16px;">New RFP #${data.request_id} - ${data.property_type} in ${data.city}</p>
    </div>
    
    <!-- Content -->
    <div style="background-color: #fef2f2; padding: 40px 30px;">
      <h2 style="color: #1f2937; font-size: 24px; margin: 0 0 20px;">New Survey Request Received</h2>
      
      <!-- RFP Details -->
      <div style="background-color: #ffffff; padding: 25px; border-radius: 8px; margin: 25px 0; border-left: 4px solid #dc2626;">
        <h3 style="color: #374151; font-size: 18px; margin: 0 0 15px;">📋 RFP Details</h3>
        <table style="width: 100%;">
          <tr><td style="padding: 5px 0; color: #6b7280;"><strong>Request ID:</strong></td><td>#${data.request_id}</td></tr>
          <tr><td style="padding: 5px 0; color: #6b7280;"><strong>Submitted:</strong></td><td>${data.submission_time}</td></tr>
          <tr><td style="padding: 5px 0; color: #6b7280;"><strong>Buyer:</strong></td><td>${data.buyer_name} (${data.buyer_email})</td></tr>
          <tr><td style="padding: 5px 0; color: #6b7280;"><strong>Property:</strong></td><td>${data.property_address}</td></tr>
          <tr><td style="padding: 5px 0; color: #6b7280;"><strong>Type:</strong></td><td>${data.property_type}</td></tr>
          <tr><td style="padding: 5px 0; color: #6b7280;"><strong>Survey Types:</strong></td><td>${data.survey_types}</td></tr>
          <tr><td style="padding: 5px 0; color: #6b7280;"><strong>Budget:</strong></td><td>€${data.budget_range}</td></tr>
          <tr><td style="padding: 5px 0; color: #6b7280;"><strong>Timeline:</strong></td><td>${data.timeline}</td></tr>
        </table>
      </div>
      
      <!-- Stats -->
      <div style="background-color: #fee2e2; padding: 25px; border-radius: 8px; margin: 25px 0;">
        <h3 style="color: #374151; font-size: 18px; margin: 0 0 15px;">📊 Matching Stats</h3>
        <p style="color: #4b5563; margin: 0 0 8px;"><strong>Matched Surveyors:</strong> ${data.matched_count}</p>
        <p style="color: #4b5563; margin: 0;"><strong>Service Area:</strong> ${data.city} Metro</p>
      </div>
      
      <!-- CTA Button -->
      <div style="text-align: center; margin: 30px 0;">
        <a href="https://apulink.com/admin/rfp/${data.request_id}" style="background-color: #dc2626; color: #ffffff; padding: 14px 28px; text-decoration: none; border-radius: 6px; display: inline-block; font-size: 16px; font-weight: 600;">
          Review RFP
        </a>
      </div>
      
      <div style="background-color: #fef2f2; border: 2px solid #dc2626; padding: 20px; border-radius: 8px; text-align: center;">
        <p style="color: #dc2626; font-size: 16px; font-weight: 600; margin: 0;">
          <strong>Action Required:</strong> Monitor for first bids within 24 hours
        </p>
      </div>
    </div>
  </div>
</body>
</html>
  `;
}

function getSurveyorNotificationHTML(data: {
  surveyor_name: string;
  city: string;
  property_type: string;
  survey_types: string;
  budget_range: string;
  timeline: string;
  bidding_deadline: string;
  request_id: string;
  anonymous_handle: string;
}): string {
  return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <title>New Survey Opportunity</title>
</head>
<body style="margin: 0; padding: 0; font-family: Arial, sans-serif;">
  <div style="max-width: 600px; margin: 0 auto; background-color: #ffffff;">
    <!-- Header -->
    <div style="background-color: #059669; padding: 30px 20px; text-align: center;">
      <h1 style="color: #ffffff; margin: 0; font-size: 28px;">SurvEYES™</h1>
      <p style="color: #ffffff; margin: 10px 0 0; font-size: 18px;">New Survey Opportunity in ${data.city}</p>
    </div>
    
    <!-- Content -->
    <div style="background-color: #f0fdfa; padding: 40px 30px;">
      <h2 style="color: #1f2937; font-size: 24px; margin: 0 0 20px;">Ciao ${data.surveyor_name}!</h2>
      
      <p style="color: #4b5563; font-size: 16px; line-height: 1.6; margin: 0 0 20px;">
        A new survey request matching your specialization and service area has been submitted. This could be a great opportunity for you!
      </p>
      
      <!-- Opportunity Details -->
      <div style="background-color: #ffffff; padding: 25px; border-radius: 8px; margin: 25px 0; border-left: 4px solid #059669;">
        <h3 style="color: #374151; font-size: 18px; margin: 0 0 15px;">🎯 Survey Opportunity</h3>
        <table style="width: 100%;">
          <tr><td style="padding: 5px 0; color: #6b7280;"><strong>Location:</strong></td><td>${data.city}, Puglia</td></tr>
          <tr><td style="padding: 5px 0; color: #6b7280;"><strong>Property Type:</strong></td><td>${data.property_type}</td></tr>
          <tr><td style="padding: 5px 0; color: #6b7280;"><strong>Survey Types Required:</strong></td><td>${data.survey_types}</td></tr>
          <tr><td style="padding: 5px 0; color: #6b7280;"><strong>Client Budget Range:</strong></td><td>€${data.budget_range}</td></tr>
          <tr><td style="padding: 5px 0; color: #6b7280;"><strong>Desired Timeline:</strong></td><td>${data.timeline}</td></tr>
        </table>
      </div>
      
      <!-- Timeline Box -->
      <div style="background-color: #fef3c7; padding: 25px; border-radius: 8px; margin: 25px 0; border-left: 4px solid #f59e0b;">
        <h3 style="color: #374151; font-size: 18px; margin: 0 0 15px;">⏰ Timeline</h3>
        <p style="color: #4b5563; margin: 0;"><strong>Bidding Deadline:</strong> ${data.bidding_deadline}</p>
      </div>
      
      <!-- Important Notes -->
      <div style="background-color: #fee2e2; padding: 25px; border-radius: 8px; margin: 25px 0;">
        <h3 style="color: #374151; font-size: 18px; margin: 0 0 15px;">⚠️ Important Reminders</h3>
        <p style="color: #4b5563; margin: 0 0 8px;">• Do not share personal contact information in your bid</p>
        <p style="color: #4b5563; margin: 0 0 8px;">• All communication must go through the platform</p>
        <p style="color: #4b5563; margin: 0 0 8px;">• Competitive pricing increases your selection chances</p>
        <p style="color: #4b5563; margin: 0;">• Include delivery time and what's included in your service</p>
      </div>
      
      <!-- CTA Button -->
      <div style="text-align: center; margin: 30px 0;">
        <a href="https://apulink.com/surveyor/bid/${data.request_id}" style="background-color: #059669; color: #ffffff; padding: 14px 28px; text-decoration: none; border-radius: 6px; display: inline-block; font-size: 16px; font-weight: 600;">
          View Details & Submit Bid
        </a>
      </div>
      
      <!-- Handle Box -->
      <div style="background-color: #e0f2fe; padding: 20px; border-radius: 8px; text-align: center;">
        <p style="color: #0369a1; font-size: 15px; font-weight: 600; margin: 0 0 8px;">
          <strong>Your Anonymous Handle:</strong> ${data.anonymous_handle}
        </p>
        <p style="color: #0369a1; font-size: 15px; font-weight: 600; margin: 0;">
          <strong>Deadline:</strong> Submit your bid within 48 hours
        </p>
      </div>
      
      <p style="color: #4b5563; font-size: 16px; line-height: 1.6; margin: 20px 0 0;">
        Good luck with your bid!<br>
        The SurvEYES™ Team
      </p>
    </div>
  </div>
</body>
</html>
  `;
}

// Main email sending functions
export async function sendBuyerConfirmation(data: {
  buyer_name: string;
  buyer_email: string;
  request_id: string;
  property_address: string;
  property_type: string;
  survey_types: string;
  budget_range: string;
  timeline: string;
}) {
  try {
    const htmlContent = getBuyerConfirmationHTML(data);
    
    const { data: emailData, error } = await resend.emails.send({
      from: `${process.env.RESEND_FROM_NAME || 'SurvEYES™'} <${process.env.RESEND_FROM_EMAIL || 'noreply@apulink.com'}>`,
      to: [data.buyer_email],
      subject: `Your Survey Request #${data.request_id} has been submitted`,
      html: htmlContent,
    });

    if (error) {
      console.error('Error sending buyer confirmation:', error);
      return { success: false, error };
    }

    return { success: true, data: emailData };
  } catch (error) {
    console.error('Error sending buyer confirmation:', error);
    return { success: false, error };
  }
}

export async function sendAdminAlert(data: {
  request_id: string;
  submission_time: string;
  buyer_name: string;
  buyer_email: string;
  property_address: string;
  property_type: string;
  survey_types: string;
  budget_range: string;
  timeline: string;
  matched_count: number;
  city: string;
}) {
  try {
    const htmlContent = getAdminAlertHTML(data);
    
    const { data: emailData, error } = await resend.emails.send({
      from: `${process.env.RESEND_FROM_NAME || 'SurvEYES™'} <${process.env.RESEND_FROM_EMAIL || 'noreply@apulink.com'}>`,
      to: [process.env.ADMIN_EMAIL || 'admin@apulink.com'],
      subject: `🚨 New RFP #${data.request_id} - ${data.property_type} in ${data.city}`,
      html: htmlContent,
    });

    if (error) {
      console.error('Error sending admin alert:', error);
      return { success: false, error };
    }

    return { success: true, data: emailData };
  } catch (error) {
    console.error('Error sending admin alert:', error);
    return { success: false, error };
  }
}

export async function sendSurveyorNotification(data: {
  surveyor_name: string;
  surveyor_email: string;
  city: string;
  property_type: string;
  survey_types: string;
  budget_range: string;
  timeline: string;
  bidding_deadline: string;
  request_id: string;
  anonymous_handle: string;
}) {
  try {
    const htmlContent = getSurveyorNotificationHTML(data);
    
    const { data: emailData, error } = await resend.emails.send({
      from: `${process.env.RESEND_FROM_NAME || 'SurvEYES™'} <${process.env.RESEND_FROM_EMAIL || 'noreply@apulink.com'}>`,
      to: [data.surveyor_email],
      subject: `New Survey Opportunity in ${data.city} - ${data.property_type}`,
      html: htmlContent,
    });

    if (error) {
      console.error('Error sending surveyor notification:', error);
      return { success: false, error };
    }

    return { success: true, data: emailData };
  } catch (error) {
    console.error('Error sending surveyor notification:', error);
    return { success: false, error };
  }
}

// Test function
export async function testEmailConnection() {
  try {
    const { data, error } = await resend.emails.send({
      from: `${process.env.RESEND_FROM_NAME || 'SurvEYES™'} <${process.env.RESEND_FROM_EMAIL || 'noreply@apulink.com'}>`,
      to: [process.env.ADMIN_EMAIL || 'test@example.com'],
      subject: 'Test Email - SurvEYES™ System',
      html: '<h1>Test Email</h1><p>If you receive this, the email system is working!</p>',
    });

    return { success: !error, data, error };
  } catch (error) {
    return { success: false, error };
  }
}

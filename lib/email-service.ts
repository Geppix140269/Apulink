// 5. CREATE: lib/email-service.ts
import { Resend } from 'resend';
import BuyerConfirmationEmail from '../emails/buyer-confirmation';
import AdminAlertEmail from '../emails/admin-alert';
import SurveyorNotificationEmail from '../emails/surveyor-notification';

const resend = new Resend(process.env.RESEND_API_KEY);

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
    const { data: emailData, error } = await resend.emails.send({
      from: `${process.env.RESEND_FROM_NAME} <${process.env.RESEND_FROM_EMAIL}>`,
      to: [data.buyer_email],
      subject: `Your Survey Request #${data.request_id} has been submitted`,
      react: BuyerConfirmationEmail(data),
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
  notifications_sent: number;
  service_area: string;
  city: string;
}) {
  try {
    const { data: emailData, error } = await resend.emails.send({
      from: `${process.env.RESEND_FROM_NAME} <${process.env.RESEND_FROM_EMAIL}>`,
      to: [process.env.ADMIN_EMAIL!],
      subject: `🚨 New RFP #${data.request_id} - ${data.property_type} in ${data.city}`,
      react: AdminAlertEmail(data),
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
  region: string;
  property_type: string;
  survey_types: string;
  budget_range: string;
  timeline: string;
  site_visit_required: string;
  bidding_deadline: string;
  selection_date: string;
  completion_date: string;
  request_id: string;
  anonymous_handle: string;
}) {
  try {
    const { data: emailData, error } = await resend.emails.send({
      from: `${process.env.RESEND_FROM_NAME} <${process.env.RESEND_FROM_EMAIL}>`,
      to: [data.surveyor_email],
      subject: `New Survey Opportunity in ${data.city} - ${data.property_type}`,
      react: SurveyorNotificationEmail(data),
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

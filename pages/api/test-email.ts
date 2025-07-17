// 6. CREATE: pages/api/test-email.ts (Test API Route)
import { NextApiRequest, NextApiResponse } from 'next';
import { sendBuyerConfirmation, sendAdminAlert, sendSurveyorNotification } from '../../lib/email-service';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const { email_type, test_email } = req.body;

  if (!email_type || !test_email) {
    return res.status(400).json({ message: 'Missing email_type or test_email' });
  }

  try {
    let result;

    switch (email_type) {
      case 'buyer_confirmation':
        result = await sendBuyerConfirmation({
          buyer_name: 'Marco Rossi',
          buyer_email: test_email,
          request_id: 'TEST001',
          property_address: 'Via Roma 123, Bari, BA',
          property_type: 'Apartment',
          survey_types: 'Structural, Electrical',
          budget_range: '800-1200',
          timeline: '2 weeks'
        });
        break;

      case 'admin_alert':
        result = await sendAdminAlert({
          request_id: 'TEST001',
          submission_time: new Date().toISOString(),
          buyer_name: 'Marco Rossi',
          buyer_email: 'marco@example.com',
          property_address: 'Via Roma 123, Bari, BA',
          property_type: 'Apartment',
          survey_types: 'Structural, Electrical',
          budget_range: '800-1200',
          timeline: '2 weeks',
          matched_count: 3,
          notifications_sent: 3,
          service_area: 'Bari Metro',
          city: 'Bari'
        });
        break;

      case 'surveyor_notification':
        result = await sendSurveyorNotification({
          surveyor_name: 'Giuseppe Bianchi',
          surveyor_email: test_email,
          city: 'Bari',
          region: 'Puglia',
          property_type: 'Apartment',
          survey_types: 'Structural, Electrical',
          budget_range: '800-1200',
          timeline: '2 weeks',
          site_visit_required: 'Yes',
          bidding_deadline: 'January 19, 2025',
          selection_date: 'January 20, 2025',
          completion_date: 'February 3, 2025',
          request_id: 'TEST001',
          anonymous_handle: 'Surveyor_BA_001'
        });
        break;

      default:
        return res.status(400).json({ message: 'Invalid email_type' });
    }

    if (result.success) {
      res.status(200).json({ 
        message: 'Email sent successfully', 
        data: result.data 
      });
    } else {
      res.status(500).json({ 
        message: 'Failed to send email', 
        error: result.error 
      });
    }
  } catch (error) {
    console.error('Error in test-email API:', error);
    res.status(500).json({ 
      message: 'Internal server error', 
      error: error.message 
    });
  }
}

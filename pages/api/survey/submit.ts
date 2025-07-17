// 8. CREATE: pages/api/survey/submit.ts (Example Integration)
import { NextApiRequest, NextApiResponse } from 'next';
import { sendBuyerConfirmation, sendAdminAlert, sendSurveyorNotification } from '../../../lib/email-service';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const {
    buyer_name,
    buyer_email,
    property_address,
    property_type,
    survey_types,
    budget_range,
    timeline,
    // ... other form fields
  } = req.body;

  try {
    // 1. Save to database (your existing logic)
    // const savedRequest = await saveToDatabase(req.body);
    
    // 2. Generate request ID
    const request_id = `RFP${Date.now()}`;
    
    // 3. Send buyer confirmation email
    const buyerEmailResult = await sendBuyerConfirmation({
      buyer_name,
      buyer_email,
      request_id,
      property_address,
      property_type,
      survey_types,
      budget_range,
      timeline,
    });

    // 4. Send admin alert email
    const adminEmailResult = await sendAdminAlert({
      request_id,
      submission_time: new Date().toISOString(),
      buyer_name,
      buyer_email,
      property_address,
      property_type,
      survey_types,
      budget_range,
      timeline,
      matched_count: 3, // This would come from your matching logic
      notifications_sent: 3,
      service_area: 'Bari Metro', // Extract from property_address
      city: 'Bari', // Extract from property_address
    });

    // 5. Find matching surveyors and send notifications
    // const matchedSurveyors = await findMatchingSurveyors(req.body);
    
    // Example: Send to one surveyor (you'd loop through all matched)
    const surveyorEmailResult = await sendSurveyorNotification({
      surveyor_name: 'Giuseppe Bianchi',
      surveyor_email: 'giuseppe@example.com',
      city: 'Bari',
      region: 'Puglia',
      property_type,
      survey_types,
      budget_range,
      timeline,
      site_visit_required: 'Yes',
      bidding_deadline: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000).toLocaleDateString(),
      selection_date: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000).toLocaleDateString(),
      completion_date: new Date(Date.now() + 17 * 24 * 60 * 60 * 1000).toLocaleDateString(),
      request_id,
      anonymous_handle: 'Surveyor_BA_001',
    });

    // 6. Return success response
    res.status(200).json({
      message: 'Survey request submitted successfully',
      request_id,
      emails_sent: {
        buyer_confirmation: buyerEmailResult.success,
        admin_alert: adminEmailResult.success,
        surveyor_notifications: surveyorEmailResult.success,
      },
    });

  } catch (error) {
    console.error('Error submitting survey request:', error);
    res.status(500).json({
      message: 'Failed to submit survey request',
      error: error.message,
    });
  }
}

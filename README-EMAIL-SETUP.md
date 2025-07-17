// 9. CREATE: README-EMAIL-SETUP.md (Documentation)
# SurvEYES™ Email System Setup

## Overview
This email system uses **React Email** with **Resend** to send beautiful, responsive emails for the SurvEYES™ bidding marketplace.

## Files Created

### Email Templates
- `emails/buyer-confirmation.tsx` - Sent to buyers when RFP is submitted
- `emails/admin-alert.tsx` - Sent to admin when new RFP is received
- `emails/surveyor-notification.tsx` - Sent to matching surveyors

### Services
- `lib/email-service.ts` - Email sending functions
- `pages/api/test-email.ts` - Test API endpoint
- `pages/email-test.tsx` - Test page for emails

### Integration Example
- `pages/api/survey/submit.ts` - Example of how to integrate emails

## Setup Instructions

### 1. Install Dependencies
```bash
npm install react-email @react-email/components resend
```

### 2. Environment Variables
Make sure these are set in Netlify:
```
RESEND_API_KEY=re_your_api_key
RESEND_FROM_EMAIL=noreply@apulink.com
RESEND_FROM_NAME=SurvEYES™
ADMIN_EMAIL=admin@apulink.com
```

### 3. Test the System
1. Deploy to Netlify
2. Visit `/email-test` on your site
3. Send test emails to verify everything works

## Email Types

### Buyer Confirmation
- **Trigger**: When survey request is submitted
- **Recipients**: Buyer
- **Purpose**: Confirm submission and explain next steps

### Admin Alert
- **Trigger**: When new RFP is received
- **Recipients**: Admin team
- **Purpose**: Alert about new request requiring attention

### Surveyor Notification
- **Trigger**: When RFP matches surveyor profile
- **Recipients**: Matching surveyors
- **Purpose**: Notify about bidding opportunity

## Usage Example

```typescript
import { sendBuyerConfirmation } from '../lib/email-service';

// In your form submission handler
const result = await sendBuyerConfirmation({
  buyer_name: 'Marco Rossi',
  buyer_email: 'marco@example.com',
  request_id: 'RFP001',
  property_address: 'Via Roma 123, Bari, BA',
  property_type: 'Apartment',
  survey_types: 'Structural, Electrical',
  budget_range: '800-1200',
  timeline: '2 weeks'
});

if (result.success) {
  console.log('Email sent successfully');
} else {
  console.error('Email failed:', result.error);
}
```

## Design Features

- 📱 **Mobile responsive** - Works on all devices
- 🎨 **Beautiful design** - Professional and warm styling
- 🏷️ **Branded** - SurvEYES™ branding throughout
- 🇮🇹 **Italian touches** - Ciao, Grazie for local feel
- 🔒 **Anonymous system** - Supports surveyor anonymity
- ✅ **Accessible** - Proper contrast and semantic HTML

## Next Steps

1. Test all email templates
2. Integrate with your survey submission form
3. Set up surveyor matching algorithm
4. Add email tracking/analytics if needed

## Support

For issues or questions about the email system, check:
- Resend dashboard for delivery status
- Netlify function logs for errors
- Email test page for debugging

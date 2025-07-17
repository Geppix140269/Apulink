import * as React from 'react';
import {
  Body,
  Container,
  Head,
  Heading,
  Html,
  Link,
  Preview,
  Section,
  Text,
} from '@react-email/components';

interface SurveyorNotificationProps {
  surveyor_name: string;
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
  surveyor_email: string;
}

export default function SurveyorNotificationEmail({
  surveyor_name = 'Giuseppe',
  city = 'Bari',
  region = 'Puglia',
  property_type = 'Apartment',
  survey_types = 'Structural, Electrical',
  budget_range = '800-1200',
  timeline = '2 weeks',
  site_visit_required = 'Yes',
  bidding_deadline = 'January 19, 2025',
  selection_date = 'January 20, 2025',
  completion_date = 'February 3, 2025',
  request_id = 'RFP001',
  anonymous_handle = 'Surveyor_BA_001',
  surveyor_email = 'giuseppe@example.com'
}: SurveyorNotificationProps) {
  return (
    <Html>
      <Head />
      <Preview>New Survey Opportunity in {city} - {property_type}</Preview>
      <Body style={main}>
        <Container style={container}>
          {/* Header */}
          <Section style={surveyorHeader}>
            <Heading style={surveyorHeaderTitle}>SurvEYES™</Heading>
            <Text style={headerSubtitle}>New Survey Opportunity</Text>
          </Section>

          {/* Main Content */}
          <Section style={surveyorContent}>
            <Heading style={h2}>Ciao {surveyor_name}!</Heading>
            
            <Text style={text}>
              A new survey request matching your specialization and service area has been 
              submitted. This could be a great opportunity for you!
            </Text>

            {/* Opportunity Details */}
            <Section style={opportunity}>
              <Heading style={h3}>🎯 Survey Opportunity</Heading>
              <Text style={detailText}><strong>Location:</strong> {city}, {region}</Text>
              <Text style={detailText}><strong>Property Type:</strong> {property_type}</Text>
              <Text style={detailText}><strong>Survey Types Required:</strong> {survey_types}</Text>
              <Text style={detailText}><strong>Client Budget Range:</strong> €{budget_range}</Text>
              <Text style={detailText}><strong>Desired Timeline:</strong> {timeline}</Text>
              <Text style={detailText}><strong>Site Visit Required:</strong> {site_visit_required}</Text>
            </Section>

            {/* Timeline */}
            <Section style={timelineBox}>
              <Heading style={h3}>⏰ Timeline</Heading>
              <Text style={detailText}><strong>Bidding Deadline:</strong> {bidding_deadline}</Text>
              <Text style={detailText}><strong>Selection Expected:</strong> {selection_date}</Text>
              <Text style={detailText}><strong>Survey Completion:</strong> {completion_date}</Text>
            </Section>

            {/* Bid Info */}
            <Section style={bidInfo}>
              <Heading style={h3}>💰 Bidding Information</Heading>
              <Text style={stepText}>
                <strong>Anonymous bidding:</strong> Your identity stays private until selected
              </Text>
              <Text style={stepText}>
                <strong>Competitive process:</strong> Multiple surveyors will bid
              </Text>
              <Text style={stepText}>
                <strong>Direct communication:</strong> Ask questions anonymously
              </Text>
              <Text style={stepText}>
                <strong>Secure payment:</strong> Deposit held by platform
              </Text>
            </Section>

            {/* Warning */}
            <Section style={warning}>
              <Heading style={h3}>⚠️ Important Reminders</Heading>
              <Text style={stepText}>
                • Do not share personal contact information in your bid
              </Text>
              <Text style={stepText}>
                • All communication must go through the platform
              </Text>
              <Text style={stepText}>
                • Competitive pricing increases your selection chances
              </Text>
              <Text style={stepText}>
                • Include delivery time and what's included in your service
              </Text>
            </Section>

            <Section style={buttonSection}>
              <Link href={`https://apulink.com/surveyor/bid/${request_id}`} style={surveyorButton}>
                View Details & Submit Bid
              </Link>
            </Section>

            <Section style={handleBox}>
              <Text style={handleText}>
                <strong>Your Anonymous Handle:</strong> {anonymous_handle}
              </Text>
              <Text style={handleText}>
                <strong>Deadline:</strong> Submit your bid within 48 hours
              </Text>
            </Section>

            <Text style={text}>
              Good luck with your bid!<br/>
              The SurvEYES™ Team
            </Text>
          </Section>

          {/* Footer */}
          <Section style={footer}>
            <Text style={footerText}>
              SurvEYES™ by Apulink | <Link href="https://apulink.com/surveyor/dashboard" style={footerLink}>Surveyor Dashboard</Link>
            </Text>
            <Text style={footerText}>
              This email was sent to {surveyor_email}
            </Text>
          </Section>
        </Container>
      </Body>
    </Html>
  );
}

const surveyorHeader = {
  backgroundColor: '#059669',
  padding: '30px 20px',
  borderRadius: '8px 8px 0 0',
  textAlign: 'center' as const,
};

const surveyorHeaderTitle = {
  color: '#ffffff',
  fontSize: '28px',
  fontWeight: 'bold',
  margin: '0 0 10px 0',
  letterSpacing: '0.5px',
};

const surveyorContent = {
  backgroundColor: '#f0fdfa',
  padding: '40px 30px',
  borderRadius: '0 0 8px 8px',
};

const opportunity = {
  backgroundColor: '#ffffff',
  padding: '25px',
  borderRadius: '8px',
  margin: '25px 0',
  borderLeft: '4px solid #059669',
  boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
};

const timelineBox = {
  backgroundColor: '#fef3c7',
  padding: '25px',
  borderRadius: '8px',
  margin: '25px 0',
  borderLeft: '4px solid #f59e0b',
  border: '1px solid #fde68a',
};

const bidInfo = {
  backgroundColor: '#ecfdf5',
  padding: '25px',
  borderRadius: '8px',
  margin: '25px 0',
  border: '1px solid #a7f3d0',
};

const warning = {
  backgroundColor: '#fee2e2',
  padding: '25px',
  borderRadius: '8px',
  margin: '25px 0',
  borderLeft: '4px solid #dc2626',
  border: '1px solid #fecaca',
};

const surveyorButton = {
  backgroundColor: '#059669',
  color: '#ffffff',
  padding: '14px 28px',
  textDecoration: 'none',
  borderRadius: '6px',
  display: 'inline-block',
  fontSize: '16px',
  fontWeight: '600',
  boxShadow: '0 2px 4px rgba(5, 150, 105, 0.2)',
};

const handleBox = {
  backgroundColor: '#e0f2fe',
  padding: '20px',
  borderRadius: '8px',
  margin: '25px 0',
  textAlign: 'center' as const,
  border: '1px solid #bae6fd',
};

const handleText = {
  color: '#0369a1',
  fontSize: '15px',
  fontWeight: '600',
  margin: '0 0 8px 0',
};

const footerLink = {
  color: '#059669',
  textDecoration: 'none',
};

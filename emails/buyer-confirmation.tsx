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

interface BuyerConfirmationProps {
  buyer_name: string;
  request_id: string;
  property_address: string;
  property_type: string;
  survey_types: string;
  budget_range: string;
  timeline: string;
  buyer_email: string;
}

export default function BuyerConfirmationEmail({
  buyer_name = 'Marco',
  request_id = 'RFP001',
  property_address = 'Via Roma 123, Bari, BA',
  property_type = 'Apartment',
  survey_types = 'Structural, Electrical',
  budget_range = '800-1200',
  timeline = '2 weeks',
  buyer_email = 'buyer@example.com'
}: BuyerConfirmationProps) {
  return (
    <Html>
      <Head />
      <Preview>Your survey request #{request_id} has been submitted successfully</Preview>
      <Body style={main}>
        <Container style={container}>
          {/* Header */}
          <Section style={header}>
            <Heading style={headerTitle}>SurvEYES™</Heading>
            <Text style={headerSubtitle}>
              Property Surveys in Puglia - Transparent Bidding, Trusted Results
            </Text>
          </Section>

          {/* Main Content */}
          <Section style={content}>
            <Heading style={h2}>Ciao {buyer_name}!</Heading>
            
            <Text style={text}>
              Your survey request has been successfully submitted and is now being 
              reviewed by our network of verified surveyors in Puglia.
            </Text>

            {/* Property Info Box */}
            <Section style={propertyInfo}>
              <Heading style={h3}>📍 Your Survey Request Details</Heading>
              <Text style={detailText}><strong>Request ID:</strong> #{request_id}</Text>
              <Text style={detailText}><strong>Property Address:</strong> {property_address}</Text>
              <Text style={detailText}><strong>Property Type:</strong> {property_type}</Text>
              <Text style={detailText}><strong>Survey Types:</strong> {survey_types}</Text>
              <Text style={detailText}><strong>Budget Range:</strong> €{budget_range}</Text>
              <Text style={detailText}><strong>Timeline:</strong> {timeline}</Text>
            </Section>

            {/* Next Steps */}
            <Section style={nextSteps}>
              <Heading style={h3}>🎯 What happens next?</Heading>
              <Text style={stepText}>
                <strong>Within 24 hours:</strong> Qualified surveyors will submit anonymous bids
              </Text>
              <Text style={stepText}>
                <strong>Review period:</strong> Compare bids, ask questions anonymously
              </Text>
              <Text style={stepText}>
                <strong>Selection:</strong> Choose your preferred surveyor and pay a small deposit
              </Text>
              <Text style={stepText}>
                <strong>Contact exchange:</strong> Connect directly with your chosen surveyor
              </Text>
            </Section>

            <Text style={text}>
              We'll notify you as soon as the first bids start coming in. You can track 
              your request and review bids at any time:
            </Text>

            <Section style={buttonSection}>
              <Link href={`https://apulink.com/request/${request_id}`} style={button}>
                View Your Request
              </Link>
            </Section>

            <Text style={text}>
              <strong>Need help?</strong> Reply to this email or contact us at info@apulink.com
            </Text>

            <Text style={text}>
              Grazie for choosing SurvEYES™!<br/>
              The Apulink Team
            </Text>
          </Section>

          {/* Footer */}
          <Section style={footer}>
            <Text style={footerText}>
              SurvEYES™ by Apulink | Property Surveys in Puglia, Italy
            </Text>
            <Text style={footerText}>
              This email was sent to {buyer_email}
            </Text>
          </Section>
        </Container>
      </Body>
    </Html>
  );
}

// Shared styles
const main = {
  backgroundColor: '#ffffff',
  fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen-Sans, Ubuntu, Cantarell, "Helvetica Neue", sans-serif',
  margin: '0',
  padding: '0',
};

const container = {
  margin: '0 auto',
  padding: '20px',
  maxWidth: '600px',
};

const header = {
  backgroundColor: '#2563eb',
  padding: '30px 20px',
  borderRadius: '8px 8px 0 0',
  textAlign: 'center' as const,
};

const headerTitle = {
  color: '#ffffff',
  fontSize: '28px',
  fontWeight: 'bold',
  margin: '0 0 10px 0',
  letterSpacing: '0.5px',
};

const headerSubtitle = {
  color: '#ffffff',
  fontSize: '16px',
  margin: '0',
  opacity: '0.9',
};

const content = {
  backgroundColor: '#f8fafc',
  padding: '40px 30px',
  borderRadius: '0 0 8px 8px',
};

const h2 = {
  color: '#1f2937',
  fontSize: '24px',
  fontWeight: '600',
  margin: '0 0 20px 0',
};

const h3 = {
  color: '#374151',
  fontSize: '18px',
  fontWeight: '600',
  margin: '0 0 15px 0',
};

const text = {
  color: '#4b5563',
  fontSize: '16px',
  lineHeight: '1.6',
  margin: '0 0 20px 0',
};

const stepText = {
  color: '#4b5563',
  fontSize: '15px',
  lineHeight: '1.6',
  margin: '0 0 12px 0',
};

const detailText = {
  color: '#374151',
  fontSize: '15px',
  lineHeight: '1.5',
  margin: '0 0 8px 0',
};

const propertyInfo = {
  backgroundColor: '#ffffff',
  padding: '25px',
  borderRadius: '8px',
  margin: '25px 0',
  borderLeft: '4px solid #2563eb',
  boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
};

const nextSteps = {
  backgroundColor: '#dbeafe',
  padding: '25px',
  borderRadius: '8px',
  margin: '25px 0',
  border: '1px solid #bfdbfe',
};

const buttonSection = {
  textAlign: 'center' as const,
  margin: '30px 0',
};

const button = {
  backgroundColor: '#2563eb',
  color: '#ffffff',
  padding: '14px 28px',
  textDecoration: 'none',
  borderRadius: '6px',
  display: 'inline-block',
  fontSize: '16px',
  fontWeight: '600',
  boxShadow: '0 2px 4px rgba(37, 99, 235, 0.2)',
};

const footer = {
  textAlign: 'center' as const,
  padding: '30px 20px',
  borderTop: '1px solid #e5e7eb',
  marginTop: '20px',
};

const footerText = {
  color: '#6b7280',
  fontSize: '13px',
  lineHeight: '1.4',
  margin: '0 0 5px 0',
};

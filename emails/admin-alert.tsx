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

interface AdminAlertProps {
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
}

export default function AdminAlertEmail({
  request_id = 'RFP001',
  submission_time = '2025-01-17 14:30',
  buyer_name = 'Marco Rossi',
  buyer_email = 'marco@example.com',
  property_address = 'Via Roma 123, Bari, BA',
  property_type = 'Apartment',
  survey_types = 'Structural, Electrical',
  budget_range = '800-1200',
  timeline = '2 weeks',
  matched_count = 3,
  notifications_sent = 3,
  service_area = 'Bari Metro',
  city = 'Bari'
}: AdminAlertProps) {
  return (
    <Html>
      <Head />
      <Preview>🚨 New RFP #{request_id} - {property_type} in {city}</Preview>
      <Body style={main}>
        <Container style={container}>
          {/* Header */}
          <Section style={adminHeader}>
            <Heading style={adminHeaderTitle}>🚨 ADMIN ALERT</Heading>
            <Text style={headerSubtitle}>New RFP Submitted</Text>
          </Section>

          {/* Main Content */}
          <Section style={adminContent}>
            <Heading style={h2}>New Survey Request Received</Heading>
            
            {/* RFP Details */}
            <Section style={rfpDetails}>
              <Heading style={h3}>📋 RFP Details</Heading>
              <Text style={detailText}><strong>Request ID:</strong> #{request_id}</Text>
              <Text style={detailText}><strong>Submitted:</strong> {submission_time}</Text>
              <Text style={detailText}><strong>Buyer:</strong> {buyer_name} ({buyer_email})</Text>
              <Text style={detailText}><strong>Property:</strong> {property_address}</Text>
              <Text style={detailText}><strong>Type:</strong> {property_type}</Text>
              <Text style={detailText}><strong>Survey Types:</strong> {survey_types}</Text>
              <Text style={detailText}><strong>Budget:</strong> €{budget_range}</Text>
              <Text style={detailText}><strong>Timeline:</strong> {timeline}</Text>
            </Section>

            {/* Stats */}
            <Section style={stats}>
              <Heading style={h3}>📊 Matching Stats</Heading>
              <Text style={detailText}><strong>Matched Surveyors:</strong> {matched_count}</Text>
              <Text style={detailText}><strong>Notifications Sent:</strong> {notifications_sent}</Text>
              <Text style={detailText}><strong>Service Area:</strong> {service_area}</Text>
            </Section>

            <Section style={buttonSection}>
              <Link href={`https://apulink.com/admin/rfp/${request_id}`} style={adminButton}>
                Review RFP
              </Link>
            </Section>

            <Section style={urgentBox}>
              <Text style={urgentText}>
                <strong>Action Required:</strong> Monitor for first bids within 24 hours
              </Text>
            </Section>
          </Section>
        </Container>
      </Body>
    </Html>
  );
}

const adminHeader = {
  backgroundColor: '#dc2626',
  padding: '30px 20px',
  borderRadius: '8px 8px 0 0',
  textAlign: 'center' as const,
};

const adminHeaderTitle = {
  color: '#ffffff',
  fontSize: '24px',
  fontWeight: 'bold',
  margin: '0 0 10px 0',
};

const adminContent = {
  backgroundColor: '#fef2f2',
  padding: '40px 30px',
  borderRadius: '0 0 8px 8px',
};

const rfpDetails = {
  backgroundColor: '#ffffff',
  padding: '25px',
  borderRadius: '8px',
  margin: '25px 0',
  borderLeft: '4px solid #dc2626',
  boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
};

const stats = {
  backgroundColor: '#fee2e2',
  padding: '25px',
  borderRadius: '8px',
  margin: '25px 0',
  border: '1px solid #fecaca',
};

const adminButton = {
  backgroundColor: '#dc2626',
  color: '#ffffff',
  padding: '14px 28px',
  textDecoration: 'none',
  borderRadius: '6px',
  display: 'inline-block',
  fontSize: '16px',
  fontWeight: '600',
  boxShadow: '0 2px 4px rgba(220, 38, 38, 0.2)',
};

const urgentBox = {
  backgroundColor: '#fef2f2',
  border: '2px solid #dc2626',
  padding: '20px',
  borderRadius: '8px',
  margin: '25px 0',
  textAlign: 'center' as const,
};

const urgentText = {
  color: '#dc2626',
  fontSize: '16px',
  fontWeight: '600',
  margin: '0',
};

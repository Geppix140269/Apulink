// 7. CREATE: pages/email-test.tsx (Test Page)
import { useState } from 'react';
import Head from 'next/head';

export default function EmailTest() {
  const [emailType, setEmailType] = useState('buyer_confirmation');
  const [testEmail, setTestEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setResult(null);

    try {
      const response = await fetch('/api/test-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email_type: emailType,
          test_email: testEmail,
        }),
      });

      const data = await response.json();
      setResult(data);
    } catch (error) {
      setResult({ message: 'Error sending email', error: error.message });
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Head>
        <title>Email Test - SurvEYES™</title>
      </Head>
      <div style={containerStyle}>
        <div style={cardStyle}>
          <h1 style={titleStyle}>📧 SurvEYES™ Email Test</h1>
          <p style={subtitleStyle}>Test your email templates</p>
          
          <form onSubmit={handleSubmit} style={formStyle}>
            <div style={fieldStyle}>
              <label style={labelStyle}>Email Type:</label>
              <select 
                value={emailType} 
                onChange={(e) => setEmailType(e.target.value)}
                style={selectStyle}
              >
                <option value="buyer_confirmation">Buyer Confirmation</option>
                <option value="admin_alert">Admin Alert</option>
                <option value="surveyor_notification">Surveyor Notification</option>
              </select>
            </div>

            <div style={fieldStyle}>
              <label style={labelStyle}>Test Email Address:</label>
              <input
                type="email"
                value={testEmail}
                onChange={(e) => setTestEmail(e.target.value)}
                placeholder="your@email.com"
                required
                style={inputStyle}
              />
            </div>

            <button 
              type="submit" 
              disabled={loading}
              style={loading ? { ...buttonStyle, ...disabledButtonStyle } : buttonStyle}
            >
              {loading ? 'Sending...' : 'Send Test Email'}
            </button>
          </form>

          {result && (
            <div style={result.error ? errorStyle : successStyle}>
              <h3>Result:</h3>
              <pre>{JSON.stringify(result, null, 2)}</pre>
            </div>
          )}
        </div>
      </div>
    </>
  );
}

const containerStyle = {
  minHeight: '100vh',
  backgroundColor: '#f3f4f6',
  padding: '40px 20px',
  fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
};

const cardStyle = {
  maxWidth: '600px',
  margin: '0 auto',
  backgroundColor: '#ffffff',
  borderRadius: '12px',
  padding: '40px',
  boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
};

const titleStyle = {
  color: '#1f2937',
  fontSize: '32px',
  fontWeight: '700',
  margin: '0 0 10px 0',
  textAlign: 'center' as const,
};

const subtitleStyle = {
  color: '#6b7280',
  fontSize: '16px',
  margin: '0 0 40px 0',
  textAlign: 'center' as const,
};

const formStyle = {
  display: 'flex',
  flexDirection: 'column' as const,
  gap: '20px',
};

const fieldStyle = {
  display: 'flex',
  flexDirection: 'column' as const,
  gap: '8px',
};

const labelStyle = {
  color: '#374151',
  fontSize: '14px',
  fontWeight: '600',
};

const inputStyle = {
  padding: '12px 16px',
  border: '1px solid #d1d5db',
  borderRadius: '8px',
  fontSize: '16px',
  outline: 'none',
  transition: 'border-color 0.2s',
};

const selectStyle = {
  padding: '12px 16px',
  border: '1px solid #d1d5db',
  borderRadius: '8px',
  fontSize: '16px',
  outline: 'none',
  backgroundColor: '#ffffff',
};

const buttonStyle = {
  backgroundColor: '#2563eb',
  color: '#ffffff',
  padding: '14px 28px',
  border: 'none',
  borderRadius: '8px',
  fontSize: '16px',
  fontWeight: '600',
  cursor: 'pointer',
  transition: 'background-color 0.2s',
  marginTop: '10px',
};

const disabledButtonStyle = {
  backgroundColor: '#9ca3af',
  cursor: 'not-allowed',
};

const successStyle = {
  backgroundColor: '#f0fdf4',
  border: '1px solid #86efac',
  borderRadius: '8px',
  padding: '20px',
  marginTop: '20px',
  color: '#15803d',
};

const errorStyle = {
  backgroundColor: '#fef2f2',
  border: '1px solid #fca5a5',
  borderRadius: '8px',
  padding: '20px',
  marginTop: '20px',
  color: '#dc2626',
};

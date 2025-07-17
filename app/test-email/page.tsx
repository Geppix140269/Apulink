// PATH: app/test-email/page.tsx
'use client'
import { useState } from 'react'

export default function TestEmailPage() {
  const [emailType, setEmailType] = useState('buyer')
  const [testEmail, setTestEmail] = useState('')
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState<any>(null)

  const sendTestEmail = async () => {
    setLoading(true)
    setResult(null)

    try {
      const response = await fetch('/api/emails/test', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          type: emailType,
          email: testEmail
        })
      })

      const data = await response.json()
      setResult(data)
    } catch (error) {
      setResult({ error: 'Failed to send email' })
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-2xl mx-auto px-4">
        <div className="bg-white rounded-lg shadow-lg p-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-8 text-center">
            📧 SurvEYES™ Email Test
          </h1>
          
          <div className="space-y-6">
            {/* Email Type Selection */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Email Type
              </label>
              <select
                value={emailType}
                onChange={(e) => setEmailType(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="buyer">Buyer Confirmation</option>
                <option value="admin">Admin Alert</option>
                <option value="surveyor">Surveyor Notification</option>
                <option value="test">Simple Test</option>
              </select>
            </div>

            {/* Test Email Input */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Test Email Address
              </label>
              <input
                type="email"
                value={testEmail}
                onChange={(e) => setTestEmail(e.target.value)}
                placeholder="your@email.com"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                required
              />
            </div>

            {/* Send Button */}
            <button
              onClick={sendTestEmail}
              disabled={loading || !testEmail}
              className={`w-full py-3 px-4 rounded-lg font-medium transition-colors ${
                loading || !testEmail
                  ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                  : 'bg-blue-600 text-white hover:bg-blue-700'
              }`}
            >
              {loading ? 'Sending...' : 'Send Test Email'}
            </button>

            {/* Result Display */}
            {result && (
              <div className={`p-4 rounded-lg ${
                result.error 
                  ? 'bg-red-50 border border-red-200' 
                  : 'bg-green-50 border border-green-200'
              }`}>
                <h3 className={`font-semibold mb-2 ${
                  result.error ? 'text-red-800' : 'text-green-800'
                }`}>
                  {result.error ? 'Error' : 'Success'}
                </h3>
                <pre className="text-sm overflow-x-auto">
                  {JSON.stringify(result, null, 2)}
                </pre>
              </div>
            )}
          </div>

          {/* Info Box */}
          <div className="mt-8 p-4 bg-blue-50 rounded-lg">
            <h3 className="font-semibold text-blue-900 mb-2">📌 Test Information</h3>
            <ul className="text-sm text-blue-800 space-y-1">
              <li>• <strong>Buyer Confirmation:</strong> Sent after survey request submission</li>
              <li>• <strong>Admin Alert:</strong> Notifies admin of new requests</li>
              <li>• <strong>Surveyor Notification:</strong> Alerts matching surveyors</li>
              <li>• <strong>Simple Test:</strong> Basic connectivity test</li>
            </ul>
          </div>

          {/* Environment Status */}
          <div className="mt-6 p-4 bg-gray-100 rounded-lg">
            <h3 className="font-semibold text-gray-700 mb-2">Environment Status</h3>
            <div className="text-sm space-y-1">
              <p>✅ Domain: apulink.com (verified in Resend)</p>
              <p>✅ From: noreply@apulink.com</p>
              <p>✅ API Key: {process.env.NEXT_PUBLIC_RESEND_API_KEY ? 'Configured' : 'Missing'}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

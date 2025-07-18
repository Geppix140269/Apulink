// PATH: app/test-openai/page.tsx
'use client'
import { useState } from 'react'

export default function TestOpenAI() {
  const [result, setResult] = useState<any>(null)
  const [loading, setLoading] = useState(false)

  const testAPI = async () => {
    setLoading(true)
    setResult(null)
    
    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          messages: [{ role: 'user', content: 'Hello, can you hear me?' }],
          language: 'en'
        }),
      })

      const data = await response.json()
      setResult({
        status: response.status,
        data: data
      })
    } catch (error) {
      setResult({
        error: error instanceof Error ? error.message : 'Unknown error'
      })
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold mb-4">Test OpenAI Integration</h1>
        
        <div className="bg-white rounded-lg shadow p-6 mb-6">
          <h2 className="text-xl font-semibold mb-4">API Connection Test</h2>
          
          <button
            onClick={testAPI}
            disabled={loading}
            className="bg-blue-500 text-white px-6 py-3 rounded hover:bg-blue-600 disabled:bg-gray-400 transition-colors"
          >
            {loading ? 'Testing...' : 'Test Chat API'}
          </button>
        </div>

        {result && (
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="font-bold mb-3 text-lg">Result:</h3>
            
            {result.status && (
              <div className="mb-3">
                <span className="font-semibold">Status Code:</span> 
                <span className={`ml-2 ${result.status === 200 ? 'text-green-600' : 'text-red-600'}`}>
                  {result.status}
                </span>
              </div>
            )}
            
            <div className="bg-gray-100 rounded p-4">
              <pre className="whitespace-pre-wrap text-sm overflow-auto">
                {JSON.stringify(result.data || result, null, 2)}
              </pre>
            </div>

            {result.data?.debug && (
              <div className="mt-4 p-4 bg-yellow-50 rounded-lg border border-yellow-200">
                <h4 className="font-semibold text-yellow-800 mb-2">Debug Info:</h4>
                <ul className="text-sm space-y-1">
                  <li><strong>Has API Key:</strong> {result.data.debug.hasApiKey ? 'Yes' : 'No'}</li>
                  <li><strong>Key Prefix:</strong> {result.data.debug.apiKeyPrefix}</li>
                  <li><strong>Error:</strong> {result.data.debug.error}</li>
                </ul>
              </div>
            )}
          </div>
        )}

        <div className="mt-8 bg-blue-50 rounded-lg p-6">
          <h3 className="font-bold mb-3">Troubleshooting Checklist:</h3>
          <ul className="space-y-2 text-sm">
            <li className="flex items-start">
              <span className="text-blue-600 mr-2">1.</span>
              <span>Is OPENAI_API_KEY added to Netlify environment variables?</span>
            </li>
            <li className="flex items-start">
              <span className="text-blue-600 mr-2">2.</span>
              <span>Did you redeploy after adding the environment variable?</span>
            </li>
            <li className="flex items-start">
              <span className="text-blue-600 mr-2">3.</span>
              <span>Does the API key start with &quot;sk-proj-&quot;?</span>
            </li>
            <li className="flex items-start">
              <span className="text-blue-600 mr-2">4.</span>
              <span>Is the key active in your OpenAI dashboard?</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  )
}

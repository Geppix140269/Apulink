// PATH: app/api/chat/route.ts
import { NextResponse } from 'next/server'

const OPENAI_API_KEY = process.env.OPENAI_API_KEY

interface ChatMessage {
  role: 'user' | 'assistant' | 'system';
  content: string;
}

// System prompt for Trullo
const SYSTEM_PROMPT = `You are Trullo, a friendly and knowledgeable AI assistant for Apulink, a platform connecting foreign property buyers with local professionals in Puglia, Italy.

Your personality:
- Warm, helpful, and professional
- Knowledgeable about Puglia real estate
- Encouraging but honest about challenges
- Use emojis sparingly for friendliness (🏠 🌿 ☀️ 🇮🇹)

Your expertise includes:
- Property types in Puglia (trulli, masserie, villas, apartments)
- Buying process and legal requirements in Italy
- Typical costs and taxes (IMU, registration tax, notary fees)
- Areas in Puglia (Ostuni, Alberobello, Polignano a Mare, Lecce, etc.)
- Renovation considerations and typical costs
- Working with local professionals (geometra, notary, architect, lawyer)
- Italian bureaucracy and documentation needs

Always:
- Be concise but thorough (max 150 words per response unless asked for details)
- Suggest connecting with Apulink verified professionals when appropriate
- Mention that Apulink can help match them with English-speaking professionals
- Ask follow-up questions to understand their needs better
- Provide practical, actionable advice with rough cost estimates
- Be encouraging about their Italian property dreams

Never:
- Give specific legal or tax advice (suggest consulting professionals)
- Quote exact prices without ranges
- Make promises about specific properties
- Share personal contact information
- Use apostrophes - use "do not" instead of "don't"`;

export async function POST(request: Request) {
  let language: string = 'en'; // Default language
  
  // Debug logging
  console.log('Chat API called');
  console.log('API Key exists:', !!OPENAI_API_KEY);
  console.log('API Key starts with:', OPENAI_API_KEY?.substring(0, 7));
  
  try {
    if (!OPENAI_API_KEY) {
      console.error('OpenAI API key not configured');
      return NextResponse.json(
        { 
          message: 'I apologize, but I am temporarily unable to connect. Please email info@apulink.com for assistance.',
          debug: {
            error: 'API key not found',
            hasApiKey: false
          }
        },
        { status: 500 }
      )
    }

    const body = await request.json()
    const { messages } = body
    language = body.language || 'en'; // Extract language from body

    // Prepare messages for OpenAI
    const openAIMessages: ChatMessage[] = [
      { 
        role: 'system', 
        content: SYSTEM_PROMPT + (language === 'it' ? '\n\nPlease respond in Italian.' : '\n\nPlease respond in English.')
      },
      ...messages
    ]

    // Call OpenAI API
    const openAIResponse = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${OPENAI_API_KEY}`
      },
      body: JSON.stringify({
        model: 'gpt-3.5-turbo',
        messages: openAIMessages,
        temperature: 0.7,
        max_tokens: 300,
        presence_penalty: 0.1,
        frequency_penalty: 0.1
      })
    })

    if (!openAIResponse.ok) {
      const error = await openAIResponse.text()
      console.error('OpenAI API error:', error)
      console.error('Response status:', openAIResponse.status)
      
      return NextResponse.json({
        message: 'I apologize, I am experiencing technical difficulties. Please try again or contact us at info@apulink.com for immediate assistance.',
        debug: {
          error: `OpenAI API error: ${openAIResponse.status}`,
          details: error,
          hasApiKey: true,
          apiKeyPrefix: OPENAI_API_KEY.substring(0, 10) + '...'
        }
      })
    }

    const data = await openAIResponse.json()
    const assistantMessage = data.choices[0]?.message?.content || 'I apologize, I could not generate a response.'

    return NextResponse.json({ message: assistantMessage })

  } catch (error) {
    console.error('Chat API error:', error)
    
    // More detailed error response for debugging
    const errorDetails = {
      message: language === 'it' 
        ? 'Mi dispiace, sto avendo problemi tecnici. Per favore riprova o contattaci a info@apulink.com per assistenza immediata.'
        : 'I apologize, I am experiencing technical difficulties. Please try again or contact us at info@apulink.com for immediate assistance.',
      debug: {
        error: error instanceof Error ? error.message : 'Unknown error',
        hasApiKey: !!OPENAI_API_KEY,
        apiKeyPrefix: OPENAI_API_KEY ? OPENAI_API_KEY.substring(0, 10) + '...' : 'not set'
      }
    }
    
    return NextResponse.json(errorDetails)
  }
}

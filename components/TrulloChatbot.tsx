// PATH: components/TrulloChatbot.tsx
'use client'
import React, { useState, useRef, useEffect } from 'react';

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

interface TrulloChatbotProps {
  language?: 'en' | 'it';
}

// System prompt for Trullo
const SYSTEM_PROMPT = `You are Trullo, a friendly and knowledgeable AI assistant for Apulink, a platform connecting foreign property buyers with local professionals in Puglia, Italy.

Your personality:
- Warm, helpful, and professional
- Knowledgeable about Puglia real estate
- Encouraging but honest about challenges
- Use emojis sparingly for friendliness

Your expertise includes:
- Property types in Puglia (trulli, masserie, villas, apartments)
- Buying process and legal requirements
- Typical costs and taxes
- Areas in Puglia (Ostuni, Alberobello, Polignano a Mare, etc.)
- Renovation considerations
- Working with local professionals (geometra, notary, architect)

Always:
- Be concise but thorough
- Suggest connecting with verified professionals when appropriate
- Mention Apulink's services naturally when relevant
- Ask follow-up questions to understand needs better
- Provide practical, actionable advice

Never:
- Give specific legal or financial advice
- Quote exact prices without ranges
- Make promises about specific properties
- Share contact information in messages`;

export default function TrulloChatbot({ language = 'en' }: TrulloChatbotProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      role: 'assistant',
      content: language === 'en' 
        ? `Ciao! I'm Trullo, your Puglia property assistant 🏠 How can I help you today?`
        : `Ciao! Sono Trullo, il tuo assistente immobiliare per la Puglia 🏠 Come posso aiutarti?`,
      timestamp: new Date()
    }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || isTyping) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: input,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsTyping(true);

    try {
      // Call our API route
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          messages: [...messages, userMessage].map(m => ({
            role: m.role,
            content: m.content
          })),
          language: language
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to get response');
      }

      const data = await response.json();

      const assistantMessage: Message = {
        id: Date.now().toString(),
        role: 'assistant',
        content: data.message,
        timestamp: new Date()
      };

      setMessages(prev => [...prev, assistantMessage]);
    } catch (error) {
      console.error('Chat error:', error);
      
      const errorMessage: Message = {
        id: Date.now().toString(),
        role: 'assistant',
        content: language === 'en' 
          ? `I'm having trouble connecting right now. Please try again in a moment, or contact us directly at info@apulink.com`
          : `Ho problemi di connessione al momento. Riprova tra poco o contattaci direttamente a info@apulink.com`,
        timestamp: new Date()
      };
      
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsTyping(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <>
      {/* Chat Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`fixed bottom-8 right-8 z-50 p-4 rounded-full shadow-xl transition-all duration-300 ${
          isOpen 
            ? 'bg-stone-600 hover:bg-stone-700' 
            : 'bg-gradient-to-r from-terracotta to-terracotta-dark hover:shadow-2xl hover:scale-110'
        }`}
        aria-label={isOpen ? 'Close chat' : 'Open chat'}
      >
        {isOpen ? (
          <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        ) : (
          <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
          </svg>
        )}
      </button>

      {/* Chat Window */}
      {isOpen && (
        <div className="fixed bottom-28 right-8 z-50 w-96 h-[600px] bg-white rounded-2xl shadow-2xl flex flex-col overflow-hidden animate-in slide-in-from-bottom-5 duration-300">
          {/* Header */}
          <div className="bg-gradient-to-r from-terracotta to-terracotta-dark p-6 text-white">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
                <span className="text-2xl">🏠</span>
              </div>
              <div>
                <h3 className="font-bold text-lg">Trullo</h3>
                <p className="text-sm text-white/80">
                  {language === 'en' ? 'Your Puglia Property Assistant' : 'Il tuo assistente immobiliare'}
                </p>
              </div>
            </div>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[80%] rounded-2xl px-4 py-3 ${
                    message.role === 'user'
                      ? 'bg-sea text-white'
                      : 'bg-stone-100 text-stone-800'
                  }`}
                >
                  <p className="text-sm whitespace-pre-wrap">{message.content}</p>
                  <p className={`text-xs mt-1 ${
                    message.role === 'user' ? 'text-sea-light' : 'text-stone-500'
                  }`}>
                    {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </p>
                </div>
              </div>
            ))}
            {isTyping && (
              <div className="flex justify-start">
                <div className="bg-stone-100 rounded-2xl px-4 py-3">
                  <div className="flex space-x-2">
                    <div className="w-2 h-2 bg-stone-400 rounded-full animate-bounce" />
                    <div className="w-2 h-2 bg-stone-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }} />
                    <div className="w-2 h-2 bg-stone-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }} />
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <div className="border-t border-stone-200 p-4">
            <div className="flex items-center space-x-2">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder={language === 'en' ? 'Type your message...' : 'Scrivi il tuo messaggio...'}
                className="flex-1 px-4 py-2 border border-stone-300 rounded-full focus:outline-none focus:border-terracotta"
                disabled={isTyping}
              />
              <button
                onClick={handleSend}
                disabled={!input.trim() || isTyping}
                className={`p-2 rounded-full transition-colors ${
                  input.trim() && !isTyping
                    ? 'bg-terracotta text-white hover:bg-terracotta-dark'
                    : 'bg-stone-200 text-stone-400 cursor-not-allowed'
                }`}
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                </svg>
              </button>
            </div>
            <p className="text-xs text-stone-500 mt-2 text-center">
              {language === 'en' 
                ? 'Powered by AI • Available 24/7' 
                : 'Powered by AI • Disponibile 24/7'
              }
            </p>
          </div>
        </div>
      )}
    </>
  );
}

export { SYSTEM_PROMPT };

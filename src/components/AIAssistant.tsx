import { useState, useRef, useEffect } from 'react';
import { GoogleGenAI } from '@google/genai';
import ReactMarkdown from 'react-markdown';
import { X, Send, Sparkles, Mic, Palmtree, Copy, Check } from 'lucide-react';
import { CHALIYAM_CONNECT_SYSTEM_PROMPT } from '../ai-prompt';

declare global {
  interface Window {
    SpeechRecognition: any;
    webkitSpeechRecognition: any;
  }
}

export default function AIAssistant() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<{ role: 'user' | 'model', text: string }[]>([
    { role: 'model', text: 'Namaskaram! 🙏 I am Chaliyam Connect AI. How can I help you today with local information, bus timings, or emergency contacts?' }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);
  
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const supportsVoice = typeof window !== 'undefined' && !!(window.SpeechRecognition || window.webkitSpeechRecognition);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isOpen, isLoading]);

  useEffect(() => {
    if (isOpen) {
      // Small delay to ensure transition completes before focusing
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, [isOpen]);

  const startListening = () => {
    if (!supportsVoice) return;
    
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    const recognition = new SpeechRecognition();
    
    recognition.continuous = false;
    recognition.interimResults = true;
    recognition.lang = 'en-IN'; // Good default for Indian English + Malayalam mix (Manglish)

    recognition.onstart = () => setIsListening(true);
    
    recognition.onresult = (event: any) => {
      const transcript = Array.from(event.results)
        .map((result: any) => result[0])
        .map((result) => result.transcript)
        .join('');
      
      setInput(transcript);
    };

    recognition.onerror = (event: any) => {
      console.error("Speech recognition error", event.error);
      setIsListening(false);
    };

    recognition.onend = () => {
      setIsListening(false);
    };

    recognition.start();
  };

  const handleCopy = (text: string, index: number) => {
    navigator.clipboard.writeText(text);
    setCopiedIndex(index);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage = input.trim();
    setInput('');
    setMessages(prev => [...prev, { role: 'user', text: userMessage }]);
    setIsLoading(true);

    try {
      const apiKey = process.env.GEMINI_API_KEY;
      if (!apiKey) {
        setMessages(prev => [...prev, { role: 'model', text: "⚠️ **Configuration Error:** The Gemini API key is missing. Please check your environment variables and ensure `GEMINI_API_KEY` is set correctly." }]);
        setIsLoading(false);
        return;
      }

      const ai = new GoogleGenAI({ apiKey });
      
      // Include all messages from the current session (excluding the initial greeting to avoid API errors about first message role)
      const apiHistory = messages.slice(1).map(msg => ({
        role: msg.role === 'model' ? 'model' : 'user',
        parts: [{ text: msg.text }]
      }));

      const contents = [
        ...apiHistory,
        { role: 'user', parts: [{ text: userMessage }] }
      ];

      const response = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: contents,
        config: {
          systemInstruction: CHALIYAM_CONNECT_SYSTEM_PROMPT,
          temperature: 0.4,
          tools: [{ googleSearch: {} }, { googleMaps: {} }],
          toolConfig: { includeServerSideToolInvocations: true }
        }
      });

      if (response.text && response.text.trim() !== '') {
        setMessages(prev => [...prev, { role: 'model', text: response.text! }]);
      } else {
        setMessages(prev => [...prev, { role: 'model', text: "I'm sorry, I didn't quite catch that or couldn't find the information. Could you please rephrase your question?" }]);
      }

    } catch (error: any) {
      console.error("AI Error:", error);
      let errorMessage = "Sorry, I'm having trouble connecting right now. Please check your internet connection or try again later.";
      if (error.message?.includes("API key not valid") || error.message?.includes("API_KEY_INVALID")) {
        errorMessage = "⚠️ **Authentication Error:** The provided Gemini API key is invalid. Please check your environment variables and update the `GEMINI_API_KEY`.";
      }
      setMessages(prev => [...prev, { role: 'model', text: errorMessage }]);
    } finally {
      setIsLoading(false);
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  };

  return (
    <>
      {/* Floating Button */}
      <button
        onClick={() => setIsOpen(true)}
        className={`fixed bottom-20 md:bottom-6 right-6 w-14 h-14 bg-gradient-to-br from-gold to-gold-light rounded-full flex items-center justify-center text-white shadow-[0_4px_20px_rgba(201,148,26,0.4)] transition-transform hover:scale-110 z-50 ${isOpen ? 'hidden' : 'flex'}`}
      >
        <Sparkles size={24} />
      </button>

      {/* Chat Window */}
      {isOpen && (
        <div className="fixed bottom-20 md:bottom-6 right-6 w-[calc(100vw-48px)] md:w-[380px] h-[550px] max-h-[calc(100vh-120px)] bg-white/95 dark:bg-[#1a2e20]/95 backdrop-blur-xl rounded-2xl shadow-[0_12px_40px_rgba(0,0,0,0.2)] flex flex-col overflow-hidden z-50 border border-white/40 dark:border-green-deep/40">
          {/* Header */}
          <div className="bg-gradient-to-r from-green-deep to-green-mid p-4 flex items-center justify-between text-white shadow-sm z-10">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 bg-white/20 rounded-full flex items-center justify-center text-lg shadow-inner">
                <Palmtree size={20} />
              </div>
              <div>
                <h3 className="font-yatra text-[18px] leading-tight text-gold-light">Chaliyam AI</h3>
                <p className="text-[11px] opacity-90 font-medium tracking-wide">Your local assistant</p>
              </div>
            </div>
            <button 
              onClick={() => setIsOpen(false)}
              className="w-8 h-8 flex items-center justify-center rounded-full bg-white/10 text-white/90 hover:bg-white/20 hover:text-white transition-all border-none cursor-pointer"
            >
              <X size={18} />
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-5 bg-cream/50 dark:bg-[#0a140e]/50 flex flex-col gap-5 scroll-smooth">
            {messages.map((msg, idx) => (
              <div 
                key={idx} 
                className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div 
                  className={`max-w-[85%] px-4 py-3 text-[14px] leading-relaxed shadow-sm relative group ${
                    msg.role === 'user' 
                      ? 'bg-green-deep dark:bg-[#2d7a4f] text-white rounded-2xl rounded-br-sm' 
                      : 'bg-white dark:bg-[#143321] text-text-dark dark:text-white border border-green-deep/5 dark:border-gold/10 rounded-2xl rounded-bl-sm'
                  }`}
                >
                  {msg.role === 'model' ? (
                    <>
                      <div className="markdown-body prose prose-sm max-w-none prose-p:my-1 prose-ul:my-1 prose-li:my-0 prose-strong:text-green-deep dark:prose-strong:text-gold-light dark:text-white">
                        <ReactMarkdown>{msg.text}</ReactMarkdown>
                      </div>
                      <button
                        onClick={() => handleCopy(msg.text, idx)}
                        className="absolute -right-8 top-2 p-1.5 rounded-md bg-white dark:bg-[#1a2e20] text-text-light hover:text-green-deep dark:hover:text-gold shadow-sm border border-gray-100 dark:border-gold/10 opacity-0 group-hover:opacity-100 transition-opacity"
                        title="Copy response"
                      >
                        {copiedIndex === idx ? <Check size={14} className="text-green-500" /> : <Copy size={14} />}
                      </button>
                    </>
                  ) : (
                    msg.text
                  )}
                </div>
              </div>
            ))}
            
            {/* Typing Indicattor */}
            {isLoading && (
              <div className="flex justify-start">
                <div className="bg-white dark:bg-[#143321] border border-green-deep/5 dark:border-gold/10 rounded-2xl rounded-bl-sm px-4 py-4 shadow-sm flex items-center gap-1.5 w-fit">
                  <div className="w-1.5 h-1.5 bg-green-mid/60 dark:bg-gold-light/60 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                  <div className="w-1.5 h-1.5 bg-green-mid/60 dark:bg-gold-light/60 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                  <div className="w-1.5 h-1.5 bg-green-mid/60 dark:bg-gold-light/60 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <div className="p-3 bg-white/80 dark:bg-[#1a2e20]/80 backdrop-blur-md border-t border-green-deep/10 dark:border-gold/10">
            <form 
              onSubmit={(e) => { e.preventDefault(); handleSend(); }}
              className="flex items-center gap-2 bg-green-pale/50 dark:bg-[#0f2919]/50 border border-green-deep/15 dark:border-gold/20 rounded-2xl p-1.5 transition-colors focus-within:border-green-mid dark:focus-within:border-gold focus-within:bg-white dark:focus-within:bg-[#143321] shadow-inner"
            >
              <input
                ref={inputRef}
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                disabled={isLoading}
                placeholder={isLoading ? "Typing..." : "Ask about buses, spots..."}
                className="flex-1 bg-transparent px-3 py-2 text-[14px] outline-none text-text-dark dark:text-white min-h-[40px] disabled:opacity-50"
              />
              
              <div className="flex items-center gap-1 pr-1">
                {supportsVoice && (
                  <button
                    type="button"
                    onClick={startListening}
                    disabled={isLoading}
                    className={`w-9 h-9 rounded-full flex items-center justify-center transition-all border-none cursor-pointer disabled:opacity-50 ${
                      isListening 
                        ? 'bg-red-100 text-red-500 animate-pulse' 
                        : 'bg-transparent text-green-deep/60 dark:text-gold/60 hover:bg-green-deep/10 dark:hover:bg-gold/10 hover:text-green-deep dark:hover:text-gold'
                    }`}
                    title="Voice Input"
                  >
                    <Mic size={18} />
                  </button>
                )}
                
                <button
                  type="submit"
                  disabled={!input.trim() || isLoading}
                  className="w-9 h-9 bg-green-deep dark:bg-gold text-white dark:text-[#1a2e20] rounded-full flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed hover:bg-green-mid dark:hover:bg-gold-light transition-all shrink-0 shadow-sm border-none cursor-pointer"
                >
                  <Send size={16} className="ml-0.5" />
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}

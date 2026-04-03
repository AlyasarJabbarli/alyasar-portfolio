"use client";

import { useChat } from '@ai-sdk/react';
import { DefaultChatTransport } from 'ai';
import { useState, useRef, useEffect } from 'react';
import { MessageSquare, X, Send, Bot, Loader2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function AIChat() {
  const [isOpen, setIsOpen] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  
  // NEW v5+ standard: Manual input state
  const [input, setInput] = useState('');

  // NEW v5+ standard: useChat with transport architecture
  const { messages, sendMessage, status } = useChat({
    transport: new DefaultChatTransport({
      api: '/api/chat',
    }),
  });

  // Auto-scroll to bottom
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  // NEW v5+ standard: Custom submit handler
  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || status === 'submitted' || status === 'streaming') return;
    
    sendMessage({ text: input });
    setInput(''); // Clear input after sending
  };

  const isGenerating = status === 'submitted' || status === 'streaming';

  return (
    <div className="fixed bottom-24 right-6 z-[100] font-sans">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            className="mb-4 w-[350px] md:w-[400px] h-[500px] bg-[var(--color-obsidian)] border border-[var(--color-snow)]/10 rounded-2xl shadow-2xl flex flex-col overflow-hidden backdrop-blur-xl"
          >
            {/* Header */}
            <div className="p-4 border-b border-[var(--color-snow)]/10 bg-[var(--color-snow)]/5 flex justify-between items-center">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-[var(--color-electric-cyan)]/20 flex items-center justify-center">
                  <Bot className="w-4 h-4 text-[var(--color-electric-cyan)]" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-[var(--color-snow)]">Alyasar AI</h3>
                  <p className="text-[10px] text-gray-400">Ask about his tech stack or experience</p>
                </div>
              </div>
              <button onClick={() => setIsOpen(false)} className="text-gray-400 hover:text-white transition-colors">
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Messages */}
            <div ref={scrollRef} className="flex-1 overflow-y-auto p-4 space-y-4 scrollbar-thin scrollbar-thumb-white/10">
              {messages.length === 0 && (
                <div className="text-center py-10">
                  <Bot className="w-10 h-10 text-gray-600 mx-auto mb-3" />
                  <p className="text-xs text-gray-500 px-8">"How did Alyasar reduce load times by 40% at Inci Group?"</p>
                </div>
              )}
              {messages.map((m) => (
                <div key={m.id} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`max-w-[80%] p-3 rounded-xl text-sm ${
                    m.role === 'user' 
                      ? 'bg-[var(--color-electric-cyan)] text-black font-medium' 
                      : 'bg-[var(--color-snow)]/5 text-gray-200 border border-[var(--color-snow)]/10'
                  }`}>
                    {/* Render message parts natively for the new v5 structure */}
                    {m.parts?.map((part, index) => 
                      part.type === 'text' ? <span key={index}>{part.text}</span> : null
                    )}
                  </div>
                </div>
              ))}
              {isGenerating && (
                <div className="flex justify-start">
                  <div className="bg-[var(--color-snow)]/5 p-3 rounded-xl">
                    <Loader2 className="w-4 h-4 animate-spin text-[var(--color-electric-cyan)]" />
                  </div>
                </div>
              )}
            </div>

            {/* Input */}
            <form onSubmit={handleFormSubmit} className="p-4 border-t border-[var(--color-snow)]/10 bg-[var(--color-snow)]/5">
              <div className="relative">
                <input
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Type a message..."
                  disabled={isGenerating}
                  className="w-full bg-[var(--color-obsidian)] border border-[var(--color-snow)]/20 rounded-lg py-2 pl-4 pr-10 text-sm text-[var(--color-snow)] focus:outline-none focus:border-[var(--color-electric-cyan)] transition-colors disabled:opacity-50"
                />
                <button 
                  type="submit" 
                  disabled={isGenerating || !input.trim()}
                  className="absolute right-2 top-1.5 text-gray-400 hover:text-[var(--color-electric-cyan)] transition-colors disabled:opacity-0"
                >
                  <Send className="w-5 h-5" />
                </button>
              </div>
            </form>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Toggle Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-14 h-14 rounded-full bg-[var(--color-electric-cyan)] text-black shadow-[0_0_20px_rgba(0,240,255,0.4)] flex items-center justify-center hover:scale-110 transition-transform active:scale-95"
      >
        {isOpen ? <X className="w-6 h-6" /> : <MessageSquare className="w-6 h-6" />}
      </button>
    </div>
  );
}
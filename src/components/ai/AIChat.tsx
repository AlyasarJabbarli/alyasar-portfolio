"use client";

import { useChat } from '@ai-sdk/react';
import { DefaultChatTransport, isTextUIPart } from 'ai';
import type { UIMessage } from 'ai';
import { useState, useRef, useEffect } from 'react';
import { MessageSquare, X, Send, Bot, Loader2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const STARTER_PROMPTS = [
  'What did Alyasar build at Inci Group?',
  'Tell me about his ML research',
  'Is he available for new roles?',
];

export default function AIChat() {
  const [isOpen, setIsOpen] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  
  const [input, setInput] = useState('');

  const { messages, sendMessage, status } = useChat({
    transport: new DefaultChatTransport({
      api: '/api/chat',
    }),
  });

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || status === 'submitted' || status === 'streaming') return;
    
    sendMessage({ text: input });
    setInput('');
  };

  const isGenerating = status === 'submitted' || status === 'streaming';

  return (
    <div className="fixed bottom-24 right-4 md:right-6 z-[100] font-sans">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            className="mb-4 h-[70dvh] max-h-[500px] w-[calc(100vw-2rem)] max-w-[400px] bg-[var(--color-obsidian)] border border-[var(--color-snow)]/10 rounded-2xl shadow-2xl flex flex-col overflow-hidden backdrop-blur-xl"
          >
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
              <button
                type="button"
                onClick={() => setIsOpen(false)}
                className="min-h-11 min-w-11 inline-flex items-center justify-center text-gray-400 hover:text-white transition-colors"
                aria-label="Close chat"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div
              ref={scrollRef}
              role="log"
              aria-live="polite"
              aria-label="Chat conversation"
              className="flex-1 overflow-y-auto p-4 space-y-4 scrollbar-thin scrollbar-thumb-white/10"
            >
              {messages.length === 0 && (
                <div className="text-center py-10 space-y-4">
                  <Bot className="w-10 h-10 text-gray-600 mx-auto mb-3" />
                  <div className="flex flex-col gap-2 px-4">
                    {STARTER_PROMPTS.map((prompt) => (
                      <button
                        key={prompt}
                        type="button"
                        onClick={() => sendMessage({ text: prompt })}
                        className="rounded-full border border-[var(--color-electric-cyan)]/30 text-xs text-gray-400 px-3 py-1.5 hover:border-[var(--color-electric-cyan)] hover:text-[var(--color-electric-cyan)] transition-colors text-left w-full"
                      >
                        {prompt}
                      </button>
                    ))}
                  </div>
                </div>
              )}
              {messages.map((m: UIMessage) => (
                <div key={m.id} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`max-w-[80%] p-3 rounded-xl text-sm ${
                    m.role === 'user' 
                      ? 'bg-[var(--color-electric-cyan)] text-black font-medium' 
                      : 'bg-[var(--color-snow)]/5 text-gray-200 border border-[var(--color-snow)]/10'
                  }`}>
                    {m.parts?.map((part, index) => 
                      isTextUIPart(part) ? <span key={index}>{part.text}</span> : null
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

            <form onSubmit={handleFormSubmit} className="p-4 border-t border-[var(--color-snow)]/10 bg-[var(--color-snow)]/5">
              <div className="relative">
                <input
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Type a message..."
                  aria-label="Message input"
                  disabled={isGenerating}
                  className="w-full bg-[var(--color-obsidian)] border border-[var(--color-snow)]/20 rounded-lg py-2 pl-4 pr-10 text-sm text-[var(--color-snow)] focus:outline-none focus:border-[var(--color-electric-cyan)] transition-colors disabled:opacity-50"
                />
                <button 
                  type="submit" 
                  disabled={isGenerating || !input.trim()}
                  className="absolute right-1 top-1/2 -translate-y-1/2 min-h-11 min-w-11 inline-flex items-center justify-center text-gray-400 hover:text-[var(--color-electric-cyan)] transition-colors disabled:opacity-50"
                  aria-label="Send message"
                >
                  <Send className="w-5 h-5" />
                </button>
              </div>
            </form>
          </motion.div>
        )}
      </AnimatePresence>

      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        aria-label={isOpen ? 'Close AI chat' : 'Open AI chat'}
        aria-expanded={isOpen}
        className="w-14 h-14 rounded-full bg-[var(--color-electric-cyan)] text-black shadow-[0_0_20px_rgba(0,240,255,0.4)] flex items-center justify-center hover:scale-110 transition-transform active:scale-95"
      >
        {isOpen ? <X className="w-6 h-6" /> : <MessageSquare className="w-6 h-6" />}
      </button>
    </div>
  );
}

import { google } from '@ai-sdk/google';
import { streamText } from 'ai';

export const maxDuration = 30;

export async function POST(req: Request) {
  // 1. Properly await the incoming JSON payload
  const { messages } = await req.json();

  const normalizedMessages = messages.map((msg: any) => ({
    role: msg.role,
    content: msg.parts
      ?.filter((p: any) => p.type === 'text')
      .map((p: any) => p.text)
      .join('') || '',
  }));


  // 2. In ai@latest, streamText is synchronous and handles the message array natively
  const result = streamText({
    model: google('gemini-2.5-flash'), 
    system: `
      You are the AI version of Alyasar Jabbarli's Portfolio. Your goal is to help recruiters and managers understand his value.
      
      TONE: Professional, technically deep, but approachable. Use "Alyasar" or "He" to refer to him.
      
      KEY FACTS:
      - Background: Software Engineer and Data Scientist based in Budapest (from Azerbaijan).
      - Core Value: Bridges the gap between high-performance Frontend (React/Next.js) and Data Science (LLM Research).
      - Experience: Technical Project Lead at Inci Group (scaled platforms by 40% performance). 
      - Research: Authored a survey on LLM vulnerabilities (implemented PGD, GCG attacks in PyTorch).
      - Honors: Two-time "Realize Your Idea" Grant Recipient for teaching Frontend fundamentals.
      - Portfolio Tech: Next.js 16, Tailwind v4, Three.js particles, D3.js physics networks.

      INSTRUCTIONS:
      - If asked about contact info, refer them to the contact form or his email (alyasar.jabbarli@gmail.com).
      - If asked about technical experience, highlight his ability to manage 60fps animations alongside heavy data processing.
      - Keep responses concise and focused on professional impact.
    `,
    messages: normalizedMessages,
  });

  // 3. This method now perfectly exists and streams instantly
  return result.toUIMessageStreamResponse();

  }
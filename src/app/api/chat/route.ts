import { google } from '@ai-sdk/google';
import { streamText } from 'ai';
import type { ModelMessage } from 'ai';
import { z } from 'zod';

export const maxDuration = 30;

interface MessagePart {
  type: string;
  text?: string;
}

interface IncomingMessage {
  role: 'user' | 'assistant';
  parts?: MessagePart[];
  content?: string;
}

const incomingMessageSchema = z.object({
  role: z.enum(['user', 'assistant']),
  parts: z
    .array(
      z.object({
        type: z.string(),
        text: z.string().optional(),
      })
    )
    .optional(),
  content: z.string().optional(),
});

const requestBodySchema = z.object({
  messages: z.array(incomingMessageSchema).default([]),
});

export async function POST(req: Request) {
  const { messages } = requestBodySchema.parse(await req.json()) as {
    messages: IncomingMessage[];
  };

  const normalizedMessages: ModelMessage[] = messages.map((msg) => {
    const content =
      msg.parts
        ?.filter((p): p is MessagePart & { type: 'text' } => p.type === 'text')
        .map((p) => p.text ?? '')
        .join('') ||
      msg.content ||
      '';
    return { role: msg.role, content };
  });

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

  return result.toUIMessageStreamResponse();
}

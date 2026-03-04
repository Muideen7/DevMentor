# GEMINI.md — DevMentor AI

> This file is specifically for Gemini CLI and Google AI Studio agents working on the DevMentor AI codebase. It extends AGENT.md with Gemini-specific instructions, context windows, tool use patterns, and grounding behaviors. Always read AGENT.md first, then this file.

---

## GEMINI AGENT ROLE

You are a senior fullstack engineer working on DevMentor AI. Your responsibilities include writing new features, debugging existing code, reviewing logic, and suggesting improvements. You have access to the full codebase context. You are not a tutor. You write production-quality code directly.

---

## CONTEXT WINDOW STRATEGY

Gemini has a large context window. Use it deliberately. When working on any feature, always load the following files into context before generating code:

**Always include:**
- `AGENT.md` (architecture and conventions)
- `types/index.ts` (shared types)
- `lib/db/mongoose.ts` (DB connection)
- The relevant model file from `lib/db/models/`
- The relevant API route file

**For AI features, also include:**
- `lib/ai/client.ts`
- `lib/ai/context.ts`
- The relevant prompt file from `lib/ai/prompts/`

**For UI features, also include:**
- The relevant page file
- The relevant component files
- `tailwind.config.ts` for design tokens

Do not load the entire codebase. Be surgical with context to keep responses accurate and fast.

---

## GEMINI TOOL USE PATTERNS

When Gemini has file system or search tools available, use this priority order:

1. Read `AGENT.md` first on any new session
2. Read the specific model schema before writing any database logic
3. Read the existing API route before modifying it
4. Read the component before extending it
5. Search for existing utility functions before writing new ones

Never assume a utility exists. Verify it in `lib/utils.ts` before importing it.

---

## AI INTEGRATION — GEMINI NOTES

DevMentor AI uses **Anthropic Claude** as its AI provider, not Gemini. Do not suggest replacing Claude with Gemini models. Your role as an agent is to help build and maintain the product, not to substitute the underlying AI.

However, Gemini may be used for:
- Generating test data and mock responses during development
- Code generation and refactoring tasks
- Documentation generation

When generating mock AI responses for testing, always match the tone and structure defined in `lib/ai/prompts/mentor.ts`.

---

## STREAMING PATTERN

All AI responses in DevMentor AI must be streamed. When writing or modifying AI route handlers, always use this pattern:

```typescript
import { anthropic } from '@ai-sdk/anthropic'
import { streamText } from 'ai'
import { NextResponse } from 'next/server'

export async function POST(req: Request) {
  const { messages, userId } = await req.json()

  // Always validate session first
  const session = await getServerSession(authOptions)
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  // Always build context before calling AI
  const context = await buildMentorContext(userId)

  const result = await streamText({
    model: anthropic('claude-sonnet-4-20250514'),
    system: `${baseMentorPrompt}\n\nUser context:\n${context}`,
    messages,
    maxTokens: 1000,
  })

  return result.toDataStreamResponse()
}
```

On the client side, always use the `useChat` hook from the Vercel AI SDK:

```typescript
import { useChat } from 'ai/react'

const { messages, input, handleInputChange, handleSubmit, isLoading } = useChat({
  api: '/api/ai/chat',
  body: { userId: session.user.id }
})
```

---

## MONGODB PATTERNS

Always use the connection singleton. Never create a new connection inside a route handler directly.

```typescript
// lib/db/mongoose.ts — the only place connections are established
import mongoose from 'mongoose'

const MONGODB_URI = process.env.MONGODB_URI!
let cached = (global as any).mongoose || { conn: null, promise: null }

export async function connectDB() {
  if (cached.conn) return cached.conn
  if (!cached.promise) {
    cached.promise = mongoose.connect(MONGODB_URI, { bufferCommands: false })
  }
  cached.conn = await cached.promise
  return cached.conn
}
```

Every API route that needs DB access:
```typescript
import { connectDB } from '@/lib/db/mongoose'
await connectDB()
```

---

## COMPONENT GENERATION RULES FOR GEMINI

When generating React components, follow these rules strictly:

**Structure:**
```typescript
// 1. Imports (React, then external libs, then internal)
// 2. Type definitions
// 3. Component function
// 4. Export default
```

**Tailwind class order in JSX:**
```
layout (flex, grid, block) →
sizing (w, h, max-w) →
spacing (p, m, gap) →
colors (bg, text, border) →
typography (text-size, font) →
effects (shadow, rounded, opacity)
```

**Color usage — only use these Tailwind classes or hex values:**
```
bg-[#F5F4F2]   → warm gray base
bg-white        → card surfaces
bg-[#1A1A1A]   → dark buttons
bg-[#E8736A]   → coral accent
bg-[#FDF0EF]   → coral tint
text-[#1A1A1A] → primary text
text-[#6B6B6B] → secondary text
text-[#E8736A] → coral text
border-[#E0E0E0] → default borders
```

Never use arbitrary Tailwind colors outside of this palette. If a new color is needed, update COLOR_PALETTE.md first.

---

## ZOD VALIDATION PATTERN

Every API route must validate its request body before processing:

```typescript
import { z } from 'zod'

const CheckInSchema = z.object({
  workedOn: z.string().min(1).max(1000),
  blockers: z.string().max(1000),
  mood: z.number().min(1).max(5),
  freeText: z.string().max(500).optional(),
  userId: z.string()
})

const body = CheckInSchema.parse(await req.json())
```

If validation fails, return a 400 with the Zod error message. Do not let invalid data reach the database or AI layer.

---

## ERROR HANDLING STANDARDS

All API routes must return consistent error shapes:

```typescript
// Success
{ success: true, data: T }

// Client error
{ success: false, error: string, code: 400 | 401 | 403 | 404 }

// Server error
{ success: false, error: 'Internal server error', code: 500 }
```

All AI streaming routes use the Vercel AI SDK's built-in error handling via `toDataStreamResponse()`.

---

## FEATURE FLAGS

During development, complex features can be hidden behind environment-based flags:

```typescript
const FEATURES = {
  communityFeed: process.env.NEXT_PUBLIC_FEATURE_COMMUNITY === 'true',
  codeReview: process.env.NEXT_PUBLIC_FEATURE_CODE_REVIEW === 'true',
  streakSystem: process.env.NEXT_PUBLIC_FEATURE_STREAKS === 'true',
}
```

Gemini agent should check feature flags before generating UI code for a feature. If the flag is off, the route and UI should still be created but gated.

---

## TESTING NOTES FOR GEMINI

When asked to write tests, use **Vitest** for unit tests and **Playwright** for E2E tests.

Unit test priority order:
1. AI prompt builder functions in `lib/ai/`
2. Database model validation
3. Zod schemas in API routes
4. Utility functions in `lib/utils.ts`

E2E test priority order:
1. Full signup and onboarding flow
2. Roadmap generation after onboarding
3. Daily check-in submission and AI response
4. Code review submission and response

---

## WHAT GEMINI SHOULD NEVER DO

- Never replace the Anthropic Claude integration with a Gemini model without explicit instruction
- Never generate UI outside the defined color palette
- Never write API routes that skip authentication checks
- Never write database queries without error handling
- Never use `fetch` inside a React Server Component to call your own Next.js API routes. Use server actions or direct DB/AI calls instead
- Never generate placeholder or lorem ipsum text in production components. Use realistic copy that matches the product's voice

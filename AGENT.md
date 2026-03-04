# AGENT.md — DevMentor AI

> This file defines how any AI coding agent (Cursor, GitHub Copilot, Claude, Gemini CLI, etc.) should understand, navigate, and contribute to the DevMentor AI codebase. Read this entire file before writing a single line of code.

---

## PROJECT IDENTITY

**Name:** DevMentor AI
**Type:** Fullstack SaaS Web Application
**Purpose:** An AI-powered mentorship platform for self-taught developers. The platform generates personalized learning roadmaps, reviews code, answers concept questions, tracks daily progress through journaled check-ins, and provides a community layer — all powered by a persistent AI mentor that remembers each user's learning history.
**Target User:** Self-taught developers in emerging markets (Nigeria, Ghana, Kenya, India) who have no access to senior developers, mentors, or structured bootcamp environments.

---

## TECH STACK

| Layer | Technology | Version |
|---|---|---|
| Framework | Next.js | 16 (latest, App Router) |
| Styling | Tailwind CSS + ShadCN UI | latest |
| Database | MongoDB via Mongoose | latest |
| Auth | NextAuth.js | v5 (latest) |
| AI Integration | Google Gemini API (free tier) | gemini-2.5-flash |
| AI SDK | Vercel AI SDK + @ai-sdk/google | latest |
| State Management | Zustand | latest |
| File Uploads | Uploadthing | latest |
| Email | Resend | latest |
| Deployment | Vercel | — |
| Package Manager | npm | — |

> **Critical:** This project uses **npm** exclusively. Never suggest pnpm or yarn commands. Always use `npm install`, `npm run dev`, `npm run build`.

> **Critical:** This project runs on **Next.js 16**. Never reference Next.js 15 or earlier APIs, behaviors, or documentation.

> **Critical:** Always generate appropriate metatags and og images for the project.

---

## WHY GOOGLE GEMINI API

DevMentor AI uses the **Google Gemini API** because it has the most generous free tier of any major AI provider:

- **Model used:** `gemini-1.5-flash`
- **Free tier:** 15 requests per minute, 1 million tokens per minute, 1,500 requests per day
- **No credit card required** to obtain an API key
- **Cost when scaling:** $0.075 per 1 million input tokens (extremely affordable)
- **Get your key:** https://aistudio.google.com/app/apikey

This covers the entire development phase and early user growth at zero cost. When revenue justifies upgrading, the Vercel AI SDK abstracts the provider cleanly, so switching to Claude or GPT-4o requires minimal prompt changes.

---

## GETTING STARTED

```bash
# Clone the repo
git clone https://github.com/yourusername/devmentor-ai.git
cd devmentor-ai

# Install all dependencies
npm install

# Copy environment variables template
cp .env.example .env.local
# Then fill in your values in .env.local

# Start development server
npm run dev

# Build for production
npm run build

# Start production server
npm start
```

---

## REPOSITORY STRUCTURE

```
devmentor-ai/
├── app/
│   ├── (auth)/
│   │   ├── login/page.tsx
│   │   ├── signup/page.tsx
│   │   └── layout.tsx              # Two-col split layout, no sidebar
│   ├── (onboarding)/
│   │   ├── onboarding/
│   │   │   ├── step-1/page.tsx     # Goal collection
│   │   │   ├── step-2/page.tsx     # Level + stack collection
│   │   │   └── step-3/page.tsx     # Availability + roadmap generation trigger
│   │   └── layout.tsx
│   ├── (dashboard)/
│   │   ├── dashboard/page.tsx
│   │   ├── roadmap/page.tsx        # Server Component — fetches roadmap from DB directly
│   │   ├── code-review/page.tsx
│   │   ├── check-in/page.tsx
│   │   ├── concepts/page.tsx
│   │   ├── community/page.tsx
│   │   ├── progress/page.tsx
│   │   └── layout.tsx              # Sidebar + right panel layout
│   ├── api/
│   │   ├── auth/[...nextauth]/route.ts
│   │   ├── ai/
│   │   │   ├── roadmap/route.ts    # POST — generates roadmap, sets onboardingComplete: true
│   │   │   ├── review/route.ts
│   │   │   ├── checkin/route.ts
│   │   │   └── chat/route.ts
│   │   ├── roadmap/
│   │   │   ├── route.ts            # GET — fetch existing roadmap
│   │   │   └── week/[weekId]/complete/route.ts   # PATCH — mark week complete, unlock next
│   │   ├── onboarding/complete/route.ts   # POST — save profile (does NOT set onboardingComplete)
│   │   ├── users/route.ts
│   │   └── community/route.ts
│   ├── globals.css
│   └── layout.tsx
├── components/
│   ├── ui/                         # ShadCN primitives — do not modify directly
│   ├── layout/
│   │   ├── Sidebar.tsx
│   │   ├── RightPanel.tsx
│   │   └── TopBar.tsx
│   ├── dashboard/
│   │   ├── FocusCard.tsx
│   │   ├── SummaryCards.tsx
│   │   └── RecentConversations.tsx
│   ├── roadmap/
│   │   ├── RoadmapTimeline.tsx     # Client — overall progress + phase list, handles optimistic updates
│   │   ├── PhaseBlock.tsx          # Client — one phase header + its week cards
│   │   └── WeekCard.tsx            # Client — locked/active/complete with expand/collapse
│   ├── code-review/
│   │   ├── CodeEditor.tsx
│   │   └── ReviewResponse.tsx
│   ├── check-in/
│   │   ├── CheckInForm.tsx
│   │   └── MoodSelector.tsx
│   ├── community/
│   │   ├── PostCard.tsx
│   │   ├── PostComposer.tsx
│   │   └── Leaderboard.tsx
│   └── shared/
│       ├── AIMentorCard.tsx
│       ├── ProgressRing.tsx
│       └── CoralBadge.tsx
├── lib/
│   ├── db/
│   │   ├── mongoose.ts             # Connection singleton — only place DB connects
│   │   └── models/
│   │       ├── User.ts
│   │       ├── Roadmap.ts
│   │       ├── Conversation.ts
│   │       ├── CheckIn.ts
│   │       ├── CodeReview.ts
│   │       └── Post.ts
│   ├── ai/
│   │   ├── client.ts               # Gemini client via Vercel AI SDK (gemini-2.0-flash)
│   │   ├── context.ts              # Builds user context for every AI call
│   │   └── prompts/
│   │       ├── mentor.ts           # Base mentor personality prompt
│   │       ├── roadmap.ts          # Roadmap generation prompt
│   │       ├── code-review.ts      # Code review structured prompt
│   │       └── check-in.ts         # Daily check-in response prompt
│   ├── auth.ts                     # NextAuth v5 config
│   └── utils.ts
├── hooks/
│   ├── useStream.ts
│   ├── useRoadmap.ts
│   └── useCheckIn.ts
├── stores/
│   └── useAppStore.ts              # Zustand global store
├── types/
│   ├── roadmap.ts                  # Roadmap, RoadmapPhase, RoadmapWeek types
│   └── next-auth.d.ts              # NextAuth session augmentation
├── proxy.ts                        # Route protection middleware (Next.js 16 proxy.ts convention)
├── middleware.ts                   # Re-exports from proxy.ts (required by older Next.js convention)
├── .env.local                      # Never commit
├── .env.example                    # Commit this with empty values
├── next.config.ts
└── package.json
```

---

## ENVIRONMENT VARIABLES

`.env.example` — commit this file with empty values:
```env
# Database
MONGODB_URI=

# Auth
NEXTAUTH_SECRET=
NEXTAUTH_URL=
GOOGLE_CLIENT_ID=
GOOGLE_CLIENT_SECRET=

# AI — Get free key at https://aistudio.google.com/app/apikey
GEMINI_API_KEY=

# Email
RESEND_API_KEY=

# Uploads
UPLOADTHING_SECRET=
UPLOADTHING_APP_ID=
```

Never commit `.env.local`. Never hardcode any secret in source files.

---

## AI INTEGRATION — GOOGLE GEMINI

### Installation
```bash
npm install ai @ai-sdk/google
```

### Client Setup
```typescript
// lib/ai/client.ts
import { createGoogleGenerativeAI } from '@ai-sdk/google'

export const google = createGoogleGenerativeAI({
  apiKey: process.env.GEMINI_API_KEY!,
})

export const geminiFlash = google('gemini-1.5-flash')
```

### Streaming API Route Pattern
```typescript
// app/api/ai/chat/route.ts
import { streamText } from 'ai'
import { geminiFlash } from '@/lib/ai/client'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { buildMentorContext } from '@/lib/ai/context'
import { baseMentorPrompt } from '@/lib/ai/prompts/mentor'
import { NextResponse } from 'next/server'

export async function POST(req: Request) {
  const session = await getServerSession(authOptions)
  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const { messages, userId } = await req.json()

  const context = await buildMentorContext(userId)

  const result = await streamText({
    model: geminiFlash,
    system: `${baseMentorPrompt}\n\nUser context:\n${context}`,
    messages,
    maxTokens: 1000,
  })

  return result.toDataStreamResponse()
}
```

### Client-Side Streaming
```typescript
'use client'
import { useChat } from 'ai/react'
import { useSession } from 'next-auth/react'

export function MentorChat() {
  const { data: session } = useSession()
  const { messages, input, handleInputChange, handleSubmit, isLoading } = useChat({
    api: '/api/ai/chat',
    body: { userId: session?.user?.id }
  })
  // render messages and form...
}
```

### Context Injection — Required on Every AI Call
```typescript
// lib/ai/context.ts
import { connectDB } from '@/lib/db/mongoose'
import User from '@/lib/db/models/User'
import Roadmap from '@/lib/db/models/Roadmap'
import CheckIn from '@/lib/db/models/CheckIn'

export async function buildMentorContext(userId: string): Promise<string> {
  await connectDB()

  const [user, roadmap, recentCheckIns] = await Promise.all([
    User.findById(userId).select('goal currentLevel stack hoursPerWeek plan'),
    Roadmap.findOne({ userId }).select('currentWeek totalWeeks phases'),
    CheckIn.find({ userId }).sort({ date: -1 }).limit(5).select('workedOn blockers mood')
  ])

  const activeWeek = roadmap?.phases
    ?.flatMap((p: any) => p.weeks)
    ?.find((w: any) => w.status === 'active')

  return `
User goal: ${user?.goal}
Current level: ${user?.currentLevel}
Preferred stack: ${user?.stack?.join(', ')}
Hours available per week: ${user?.hoursPerWeek}
Roadmap progress: Week ${roadmap?.currentWeek} of ${roadmap?.totalWeeks}
Current topic: ${activeWeek?.title ?? 'Not started'}
Recent check-ins: ${recentCheckIns?.map((c: any) => `"${c.workedOn}" (mood: ${c.mood}/5)`).join(' | ')}
  `.trim()
}
```

### Free Tier Rate Limiting
Enforce daily message limits for free plan users before calling Gemini:

```typescript
const todayStart = new Date()
todayStart.setHours(0, 0, 0, 0)

const todayCount = await Conversation.countDocuments({
  userId,
  type: 'mentor',
  createdAt: { $gte: todayStart }
})

if (todayCount >= 10 && user.plan === 'free') {
  return NextResponse.json({
    success: false,
    error: 'Daily message limit reached. Upgrade to Mentor plan for unlimited messages.',
    code: 429
  }, { status: 429 })
}
```

---

## DATABASE MODELS

### User
```typescript
{
  _id: ObjectId,
  name: string,
  email: string,
  image: string,
  password?: string,           // bcrypt hashed, credentials auth only
  goal: string,                // onboarding step 1
  currentLevel: string,        // onboarding step 2
  stack: string[],             // onboarding step 2
  hoursPerWeek: number,        // onboarding step 3
  plan: 'free' | 'pro' | 'team',
  onboardingComplete: boolean,
  createdAt: Date,
  updatedAt: Date
}
```

### Roadmap
```typescript
{
  _id: ObjectId,
  userId: ObjectId,
  phases: [{
    phaseNumber: number,
    title: string,
    status: 'locked' | 'active' | 'complete',
    weeks: [{
      weekNumber: number,
      title: string,
      topics: string[],
      resources: string[],
      status: 'locked' | 'active' | 'complete',
      estimatedHours: number
    }]
  }],
  totalWeeks: number,
  currentWeek: number,
  generatedAt: Date,
  lastUpdated: Date
}
```

### Conversation
```typescript
{
  _id: ObjectId,
  userId: ObjectId,
  type: 'mentor' | 'code-review' | 'concept' | 'check-in',
  title: string,
  messages: [{
    role: 'user' | 'assistant',
    content: string,
    timestamp: Date
  }],
  createdAt: Date,
  updatedAt: Date
}
```

### CheckIn
```typescript
{
  _id: ObjectId,
  userId: ObjectId,
  date: Date,
  workedOn: string,
  blockers: string,
  mood: 1 | 2 | 3 | 4 | 5,
  freeText: string,
  aiResponse: string,
  streakDay: number
}
```

### CodeReview
```typescript
{
  _id: ObjectId,
  userId: ObjectId,
  language: string,
  originalCode: string,
  issue: string,
  explanation: string,
  fixedCode: string,
  concept: string,
  createdAt: Date
}
```

### Post
```typescript
{
  _id: ObjectId,
  userId: ObjectId,
  content: string,
  codeSnippet?: string,
  language?: string,
  topic: string,
  likes: ObjectId[],
  replies: [{
    userId: ObjectId,
    content: string,
    createdAt: Date
  }],
  createdAt: Date
}
```

---

## MONGODB CONNECTION SINGLETON

```typescript
// lib/db/mongoose.ts
import mongoose from 'mongoose'

const MONGODB_URI = process.env.MONGODB_URI!

if (!MONGODB_URI) {
  throw new Error('MONGODB_URI is not defined in .env.local')
}

let cached = (global as any).mongoose ?? { conn: null, promise: null }

export async function connectDB() {
  if (cached.conn) return cached.conn
  if (!cached.promise) {
    cached.promise = mongoose.connect(MONGODB_URI, { bufferCommands: false })
  }
  cached.conn = await cached.promise
  return cached.conn
}
```

Every API route that uses the database must call `await connectDB()` before any model operations.

---

## ZOD VALIDATION PATTERN

Every API route validates its body before touching the database or AI:

```typescript
import { z } from 'zod'

const CheckInSchema = z.object({
  workedOn: z.string().min(1).max(1000),
  blockers: z.string().max(1000).optional(),
  mood: z.number().min(1).max(5),
  freeText: z.string().max(500).optional(),
  userId: z.string()
})

const body = CheckInSchema.parse(await req.json())
```

Return a 400 with the Zod error message if validation fails.

---

## CONSISTENT ERROR RESPONSE SHAPE

```typescript
// Success
{ success: true, data: T }

// Client error
{ success: false, error: string, code: 400 | 401 | 403 | 404 | 429 }

// Server error
{ success: false, error: 'Internal server error', code: 500 }
```

---

## ROUTE PROTECTION

```typescript
// middleware.ts behavior:
// 1. Unauthenticated user hits any /dashboard/* route → redirect to /login
// 2. Authenticated user with onboardingComplete: false → redirect to /onboarding/step-1
// 3. Authenticated user hitting /login or /signup → redirect to /dashboard
// 4. All /api/ai/* routes enforce auth via getServerSession before processing
```

---

## CODING CONVENTIONS

- TypeScript strict mode. No `any` unless documented with a comment explaining why.
- Use React Server Components by default. Add `'use client'` only when interactivity requires it.
- ShadCN components in `@/components/ui`. Never modify ShadCN source. Extend via Tailwind only.
- Tailwind class order: layout, sizing, spacing, colors, typography, effects.
- All colors must match hex values in `COLOR_PALETTE.md`. No arbitrary colors.
- All plan and billing checks are server-side only. Never trust the client on plan status.

---

## WHAT THIS AGENT MUST NEVER DO

- Never use `pnpm` or `yarn`. **npm only.**
- Never reference Next.js 15 or any version below 16.
- Never expose `GEMINI_API_KEY` on the client. All AI calls go through API routes only.
- Never store plaintext passwords. Bcrypt, cost factor 12 minimum.
- Never skip loading and error states in UI components.
- Never make an AI call without first calling `buildMentorContext()`.
- Never create a new Mongoose connection per request. Always use the singleton.
- Never suggest replacing Gemini with a paid provider without explicit instruction from the developer.
- Never use `console.log` in production paths.

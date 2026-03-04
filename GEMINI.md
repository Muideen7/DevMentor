# GEMINI.md — DevMentor AI (v6 Standard)

> This file contains the architecture standards for **Vercel AI SDK v6**.

---

## SDK v6 CORE PATTERNS

### 1. Server-Side: UI Message Streams
Routes must return specialized UI message streams for compatibility with the new `useChat` hook.

```typescript
// app/api/ai/example/route.ts
import { streamText, createUIMessageStreamResponse } from 'ai'

export async function POST(req: Request) {
  const { messages } = await req.json()
  const result = await streamText({
    model: mentorModel,
    messages,
    // ...
  })

  return createUIMessageStreamResponse({
    stream: result.toUIMessageStream()
  })
}
```

### 2. Client-Side: Agent UI Hook
The `useChat` hook in v6 uses `api` for the endpoint but returns `sendMessage` and `status`.

```typescript
'use client'
import { useState } from 'react'
import { useChat } from '@ai-sdk/react'

export function ChatComponent() {
  const [input, setInput] = useState('')
  
  const { messages, status, sendMessage } = useChat({
    api: '/api/ai/example'
  })

  const handleSubmit = async (e) => {
    e.preventDefault()
    await sendMessage({ text: input })
    setInput('')
  }

  // status: 'ready' | 'submitted' | 'streaming' | 'error'
  const isStreaming = status === 'streaming'
}
```

---

## IMPORTANT CHANGES
- **Input State**: Manage manually with `useState`.
- **Method**: Use `sendMessage({ text: '...' })` instead of `append`.
- **Rendering**: Loop over `message.parts`. Each part has a `type` (usually 'text').
- **Status**: Use `status` to track progress; `isLoading` is removed.
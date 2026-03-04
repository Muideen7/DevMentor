import { createGoogleGenerativeAI } from '@ai-sdk/google'
import { createAnthropic } from '@ai-sdk/anthropic'

export const google = createGoogleGenerativeAI({
  apiKey: process.env.GEMINI_API_KEY!,
})

export const anthropic = createAnthropic({
  apiKey: process.env.ANTHROPIC_API_KEY!,
})

// Primary models
export const googleModel = google('gemini-1.5-flash')
export const mentorModel = google('gemini-1.5-flash')

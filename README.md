# DevMentor AI

> The AI mentor every self-taught developer deserves but never had.

![DevMentor AI Banner](https://placehold.co/1280x640/F2B8C6/1A1A1A?text=DevMentor+AI)

---

## What Is This

DevMentor AI is a fullstack SaaS web application that gives self-taught developers a personalized AI mentor that actually knows them. It generates a week-by-week learning roadmap based on your goal, reviews your code and explains what went wrong and why, answers concept questions until they click, and tracks your progress through daily check-ins that it responds to like a real mentor would.

The product was born from a simple truth: most people learning to code in emerging markets have no senior developer to ask, no bootcamp cohort to lean on, and no structured path to follow. Just them, a browser tab, and hope. DevMentor exists to change that.

---

## The Problem It Solves

Self-taught developers face three compounding failures that kill momentum before it builds:

**No structure.** You jump between tutorials without knowing if you are learning the right things in the right order. You finish courses without building anything real.

**No feedback.** You write code and submit it into a void. Nobody tells you what is wrong, why it happened, or what concept you need to understand so it stops happening again.

**No accountability.** Without a cohort, a teacher, or a deadline, motivation arrives in waves and disappears just as fast. There is nothing to return to. No memory of your progress. No one who noticed you were gone.

DevMentor addresses all three.

---

## Features

### Personalized Roadmap Generator
Answer three onboarding questions about your goal, current level, and available hours. DevMentor generates a structured, phase-based learning roadmap tailored specifically to you, not a generic curriculum. Roadmaps are regeneratable any time your situation changes.

### AI Code Review
Paste any code snippet. DevMentor returns three things: what the issue is in plain English at your skill level, why it happened and what underlying concept is involved, and a corrected version with the changed lines highlighted. Hit "Explain it differently" if it does not click the first time.

### Daily Check-In
A short daily log where you tell your mentor what you worked on, what blocked you, and how you feel. DevMentor responds like a real mentor reviewing a student's journal entry. It acknowledges your progress, addresses your blocker with a specific suggestion, and gives you one clear action for tomorrow. Consecutive check-ins build a streak.

### Concept Explainer
A focused chat interface for understanding programming concepts. DevMentor always uses at least one analogy or real-world example and adjusts explanations based on what your roadmap says you should currently know.

### Progress Memory
DevMentor remembers your history across sessions. It knows what week you are on, what you struggled with last week, and what your mood trend has been. Every AI response is informed by your full learning arc, not just what you said in the current message.

### Community Feed *(Phase 2)*
Share wins, ask questions, post code snippets, and encourage other learners. A weekly leaderboard tracks top streaks. Topic tags filter the feed by what is relevant to your roadmap.

---

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | Next.js 16 (App Router) |
| Styling | Tailwind CSS + ShadCN UI |
| Database | MongoDB via Mongoose |
| Auth | NextAuth.js v5 |
| AI | Google Gemini API (gemini-1.5-flash) |
| AI SDK | Vercel AI SDK + @ai-sdk/google |
| State | Zustand |
| Email | Resend |
| Uploads | Uploadthing |
| Deployment | Vercel |
| Package Manager | npm |

---

## Getting Started

### Prerequisites

- Node.js 20 or higher
- A MongoDB connection string (MongoDB Atlas free tier works)
- A Google Gemini API key — free at [aistudio.google.com/app/apikey](https://aistudio.google.com/app/apikey)
- A Google OAuth app for authentication — set up at [console.cloud.google.com](https://console.cloud.google.com)

### Installation

```bash
# Clone the repository
git clone https://github.com/yourusername/devmentor-ai.git
cd devmentor-ai

# Install dependencies
npm install

# Set up your environment variables
cp .env.example .env.local
```

Open `.env.local` and fill in your values:

```env
# Database
MONGODB_URI=your_mongodb_connection_string

# Auth
NEXTAUTH_SECRET=your_nextauth_secret
NEXTAUTH_URL=http://localhost:3000
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret

# AI — free at https://aistudio.google.com/app/apikey
GEMINI_API_KEY=your_gemini_api_key

# Email
RESEND_API_KEY=your_resend_api_key

# Uploads
UPLOADTHING_SECRET=your_uploadthing_secret
UPLOADTHING_APP_ID=your_uploadthing_app_id
```

```bash
# Start the development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

---

## Project Structure

```
devmentor-ai/
├── app/
│   ├── (auth)/              # Login and signup pages
│   ├── (onboarding)/        # Three-step onboarding flow
│   ├── (dashboard)/         # All authenticated app pages
│   └── api/                 # API routes including all AI endpoints
├── components/
│   ├── ui/                  # ShadCN UI primitives
│   ├── layout/              # Sidebar, RightPanel, TopBar
│   ├── dashboard/           # Dashboard-specific components
│   ├── roadmap/             # Roadmap timeline components
│   ├── code-review/         # Code editor and review response
│   ├── check-in/            # Check-in form and mood selector
│   ├── community/           # Feed, composer, leaderboard
│   └── shared/              # Reusable cross-feature components
├── lib/
│   ├── db/                  # Mongoose connection singleton and models
│   ├── ai/                  # Gemini client, context builder, prompts
│   └── auth.ts              # NextAuth configuration
├── hooks/                   # Custom React hooks
├── stores/                  # Zustand global state
├── types/                   # Shared TypeScript types
└── middleware.ts             # Route protection
```

---

## How the AI Works

DevMentor uses Google Gemini 1.5 Flash via the Vercel AI SDK with streaming enabled on all user-facing responses.

The key mechanism that makes it feel like a real mentor rather than a generic chatbot is **context injection**. Before every AI call, the system fetches the user's goal, current level, preferred stack, roadmap week, and the last five check-in entries from MongoDB and injects them into the system prompt. The AI always knows who it is talking to.

```
User goal → injected
Current level → injected
Stack preference → injected
Roadmap week and topic → injected
Recent check-in mood trend → injected
```

This means the AI never asks "what are you trying to learn?" It already knows.

---

## Design System

The UI uses a warm, approachable design language built around soft gradients and a coral accent color.

| Token | Hex | Usage |
|---|---|---|
| Coral Primary | `#E8736A` | Accent, CTAs, active states, progress bars |
| Gradient Pink | `#F2B8C6` | Hero and auth left column gradient start |
| Gradient Peach | `#F5C4A8` | Hero and auth left column gradient end |
| Warm Gray Base | `#F5F4F2` | Page backgrounds |
| Surface White | `#FFFFFF` | Cards, sidebar, inputs |
| Near Black | `#1A1A1A` | Primary buttons, headlines |
| Text Secondary | `#6B6B6B` | Body text, descriptions |
| Border Default | `#E0E0E0` | Input borders, card borders |

Full palette with all states, shadows, and code syntax colors is documented in `COLOR_PALETTE.md`.

---

## Pricing

| | Free | Pro ($12/mo) | Team ($29/mo) |
|---|---|---|---|
| Roadmap generations | 1 | Unlimited | Unlimited |
| AI messages per day | 10 | Unlimited | Unlimited |
| Code reviews | 3 per week | Unlimited | Unlimited |
| Daily check-ins | Yes | Yes | Yes |
| Conversation memory | 7 days | Full history | Full history |
| Community access | Yes | Yes | Yes |
| Team members | 1 | 1 | Up to 5 |
| Shared roadmaps | No | No | Yes |

Free plan is permanently free. No credit card required to sign up.

---

## Roadmap

### Phase 1 — MVP (Current)
- [x] Auth (Google OAuth + email/password)
- [x] Three-step onboarding flow
- [x] AI roadmap generation and display
- [x] Daily check-in with AI response
- [x] Code review with structured AI feedback
- [x] Concept explainer chat
- [ ] Streak system and milestone nudges
- [ ] Free plan message limits

### Phase 2 — Growth
- [ ] Community feed with code posts
- [ ] Progress heatmap and mood trend charts
- [ ] Pro plan with Stripe billing
- [ ] Email notifications and weekly digest
- [ ] Mobile-responsive polish pass

### Phase 3 — Scale
- [ ] Team and cohort plan
- [ ] Shared roadmaps for bootcamp leads
- [ ] Team analytics dashboard
- [ ] Public profile pages
- [ ] Roadmap template marketplace

---

## Contributing

Contributions are welcome. If you find a bug or want to suggest a feature, open an issue first so we can discuss it before you build.

```bash
# Fork the repository
# Create your feature branch
git checkout -b feature/your-feature-name

# Commit your changes
git commit -m "add: brief description of what you did"

# Push to your branch
git push origin feature/your-feature-name

# Open a pull request
```

Please read `AGENT.md` before contributing. It covers every convention this project follows including TypeScript rules, color palette restrictions, AI integration patterns, and things you must never do.

---

## Environment Notes

This project uses the **Google Gemini API free tier** as its AI provider. The free tier gives 1,500 requests per day and requires no credit card. Get your key at [aistudio.google.com/app/apikey](https://aistudio.google.com/app/apikey).

There is no paid API dependency to run this project locally or for early-stage deployment.

---

## License

MIT License. See `LICENSE` for details.

---

## Acknowledgment

Built for every self-taught developer who ever felt completely alone at 2am, staring at an error they could not Google their way out of. You deserved better tools. This is an attempt at that.
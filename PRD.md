# PRD.md — DevMentor AI
## Product Requirements Document

**Version:** 1.0
**Author:** DevMentor AI Team
**Status:** Active Development
**Last Updated:** March 2026

---

## 1. EXECUTIVE SUMMARY

DevMentor AI is a fullstack SaaS web application that provides AI-powered mentorship for self-taught developers. It generates personalized learning roadmaps, reviews code submissions, answers concept questions, tracks daily progress through journaled check-ins, and offers a community feed for peer connection.

The core product promise is simple: every self-taught developer deserves a senior developer in their corner. DevMentor AI is that developer, available 24 hours a day, remembering everything about the user's journey, and adapting its guidance as the user grows.

The primary market is self-taught developers in emerging economies (Nigeria, Ghana, Kenya, India, Latin America) where access to bootcamps, senior mentors, and structured learning environments is scarce or prohibitively expensive.

---

## 2. PROBLEM STATEMENT

### 2.1 The Core Problem

Self-taught development is the dominant path to tech careers in emerging markets. But it is characterized by three compounding failures:

**No structure.** Learners jump between free tutorials without a coherent sequence. They learn React before understanding JavaScript. They complete courses without building anything. They never know if they are learning the right things in the right order.

**No feedback.** Code is written and submitted into a void. Nobody explains what is wrong, why it is wrong, or what concept needs to be understood before it stops happening again. Stack Overflow answers are too terse. ChatGPT fixes code without teaching.

**No accountability.** Without a cohort, a teacher, or a deadline, self-taught learners abandon their goals. Motivation operates in cycles of intense effort followed by long disappearances. There is nothing to return to, no memory of progress, no one who noticed the absence.

### 2.2 Why Existing Solutions Fail

| Existing Solution | Why It Fails |
|---|---|
| ChatGPT / Claude | No memory of the user's journey. No structure. Responds to isolated queries only. |
| Promptopia / Prompt libraries | Passive tools. No personalization. No accountability. |
| Coursera / Udemy | Generic curricula. No feedback. No mentorship. High abandonment rates. |
| Twitter/X communities | Passive consumption. No one-on-one guidance. Not structured. |
| Paid bootcamps | Inaccessible price point for emerging markets. Time-bound. |

---

## 3. PRODUCT VISION

**Mission:** Give every self-taught developer the experience of having a senior developer who knows them, remembers their journey, and is always available.

**Vision statement:** A world where your geographic location or financial situation does not determine whether you have access to mentorship.

**Success in 12 months:**
- 10,000 registered users
- 3,000 weekly active users
- 65% of free users who complete onboarding return within 7 days
- 8% free-to-paid conversion rate
- Average session length of 18 minutes

---

## 4. USER PERSONAS

### Persona 1 — Tunde (Primary)
- 23 years old, Lagos, Nigeria
- University graduate, non-CS degree
- Taught himself HTML, CSS, and some JavaScript from YouTube
- Has never shipped a complete project
- Works part-time and codes in the evenings
- Pain: Doesn't know what to learn next. Feels stuck and directionless after every tutorial
- Goal: Get a remote frontend developer job within 12 months

### Persona 2 — Priya (Secondary)
- 27 years old, Bangalore, India
- Working as a data entry clerk, wants to switch careers
- Completed two Udemy courses but stopped
- Pain: Nobody to review her code. Doesn't know if she's ready to apply for jobs
- Goal: Build a portfolio and become a junior fullstack developer

### Persona 3 — Marcus (Secondary)
- 19 years old, Accra, Ghana
- Still in secondary school, coding on weekends
- Very motivated but isolated, no coding community nearby
- Pain: Needs community, structured direction, and someone who notices when he's consistent
- Goal: Build something he can show to universities or employers

---

## 5. FEATURE REQUIREMENTS

### 5.1 Onboarding (MVP — Required)

**Description:** A three-step flow that collects enough information to generate a personalized roadmap. This is the most important UX moment in the product.

**Step 1 — Goal**
- User describes their learning goal in a free-text field
- Optional: select from preset goal categories (Web Apps, Mobile, AI/ML, Backend)
- Input is stored in `user.goal`

**Step 2 — Current Level**
- User selects their current experience level: Complete Beginner, Know the Basics, Built Small Projects, Intermediate
- User selects their preferred stack or interest area
- Stored in `user.currentLevel` and `user.stack`

**Step 3 — Availability**
- User selects hours available per week: 5 to 10, 10 to 20, 20 to 30, 30 or more
- Stored in `user.hoursPerWeek`

**Completion action:** On Step 3 submission, trigger the roadmap generation API call immediately. Show a loading state ("Your mentor is building your roadmap...") and redirect to the dashboard upon completion.

**Acceptance criteria:**
- All three steps must be completed before the user can access the dashboard
- If a user closes mid-onboarding, their progress is saved and they resume from the last incomplete step
- Roadmap generation must complete within 15 seconds

---

### 5.2 Personalized Roadmap (MVP — Required)

**Description:** A structured, week-by-week learning plan generated by Claude based on the user's onboarding data. The roadmap is the spine of the product. Every other feature references it.

**Generation:**
- Claude receives the user's goal, current level, stack preference, and availability
- Output is a JSON structure of phases, each containing weeks, each containing topics, resources, and estimated hours
- Stored in the `Roadmap` collection

**Display:**
- Visual timeline with phase groupings
- Each week shows title, topics, status (locked/active/complete), and estimated hours
- Progress bar at the top showing overall percentage complete
- Users can mark weeks complete manually or through check-in activity

**Regeneration:**
- Users can request a roadmap update at any time with a free-text prompt ("I want to focus more on backend" or "I got a new job and need to learn Vue")
- Claude regenerates only the remaining phases, preserving completed weeks
- Regeneration counts against monthly AI message limits on the free plan

**Acceptance criteria:**
- Roadmap generates successfully for all valid onboarding inputs
- Timeline renders correctly for roadmaps up to 48 weeks
- Locked weeks are visually distinct and non-interactive
- Week completion updates the progress bar and dashboard summary card in real time

---

### 5.3 AI Code Review (MVP — Required)

**Description:** User pastes code into an editor. Claude returns structured feedback: what the issue is, why it happened, what concept is involved, and the corrected code.

**Input:**
- Code editor with syntax highlighting (using CodeMirror or Monaco Editor)
- Language selector dropdown (JavaScript, TypeScript, Python, HTML/CSS, other)
- Submit button triggers API call

**Output structure (always three sections):**
- Issue Found: plain English description of the problem at the user's skill level
- Why This Happened: the underlying concept that caused the bug
- Here's The Fix: corrected code block with the changed lines highlighted

**Additional interactions:**
- "This makes sense" button — logs positive feedback, closes review
- "Explain it differently" button — triggers a new AI call asking for an alternative explanation
- Review is saved to `CodeReview` collection with the original code, the response, and the timestamp

**Acceptance criteria:**
- Streaming response starts within 3 seconds of submission
- All three sections always present in output (enforced by prompt structure)
- Syntax highlighting works for all supported languages
- User can view all past reviews in a history list

---

### 5.4 Daily Check-In (MVP — Required)

**Description:** A short daily journaling form where users log what they worked on, what blocked them, and how they feel. Claude responds like a mentor reviewing a student's daily log.

**Form fields:**
- What did you work on today? (required, multiline text)
- What blocked you or felt confusing? (optional, multiline text)
- How are you feeling about your progress? (required, mood scale 1 to 5)
- Anything else on your mind? (optional, short text)

**AI response:**
- Claude receives the form data plus the user's recent check-in history (last 5 days) and roadmap position
- Response acknowledges the day's progress, addresses the blocker with a specific suggestion, and ends with one clear action for tomorrow
- Stored as the `aiResponse` field on the `CheckIn` document

**Streak system:**
- Consecutive daily check-ins build a streak counter
- Streak displayed on dashboard and sidebar
- Streak resets if user misses a day
- Streak milestone nudges at 7 days, 30 days, 100 days

**Acceptance criteria:**
- User can only submit one check-in per calendar day
- AI response is always specific, not generic (enforced by injecting user context)
- Check-in history shows last 7 days as a horizontal scroll of day cards
- Yesterday's AI response is displayed on the check-in page for reference

---

### 5.5 Concept Explainer (MVP — Required)

**Description:** A focused chat interface where users ask about specific programming concepts. Claude explains them in multiple ways until they click.

**Interface:**
- Standard chat UI with message history
- Pre-filled suggested concepts based on current roadmap week
- "Explain it differently" action button appears after each explanation
- Conversation saved to `Conversation` collection with type `concept`

**Acceptance criteria:**
- Conversation history persists between sessions
- Suggested concepts update as roadmap week advances
- Response always uses at least one analogy or real-world example (enforced by prompt)

---

### 5.6 Community Feed (Post-MVP — Phase 2)

**Description:** A social layer where users share wins, ask questions, post code snippets, and encourage each other.

**Post types:**
- Text posts (wins, reflections, questions)
- Code posts (text + embedded code block with language tag)

**Interactions:**
- Like, Reply, Share
- Topic tags (Async JS, React, Career, etc.)

**Leaderboard:**
- Weekly top learners by check-in streak
- Displayed in the right panel of the Community page

**Acceptance criteria:**
- Posts are paginated (20 per load, infinite scroll)
- Code blocks render with syntax highlighting
- Reported posts are hidden pending review
- Users cannot post more than 10 times per day (rate limit)

---

### 5.7 Progress History (Post-MVP — Phase 2)

**Description:** A visual timeline of the user's entire learning journey. Check-ins, completed weeks, code reviews, and mood trends displayed over time.

**Views:**
- Calendar heatmap (GitHub contribution graph style, in coral)
- Mood trend line chart (last 30 days)
- Completed topics list with dates
- AI messages used this month

---

## 6. PRICING AND PLANS

| Feature | Free (Starter) | Pro (Mentor) $12/mo | Team (Cohort) $29/mo |
|---|---|---|---|
| Roadmap generations | 1 | Unlimited | Unlimited |
| AI messages per day | 10 | Unlimited | Unlimited |
| Code reviews | 3/week | Unlimited | Unlimited |
| Daily check-ins | Yes | Yes | Yes |
| Conversation memory | 7 days | Full history | Full history |
| Community access | Yes | Yes | Yes |
| Priority AI responses | No | Yes | Yes |
| Team members | 1 | 1 | Up to 5 |
| Shared roadmaps | No | No | Yes |
| Team progress dashboard | No | No | Yes |

Free plan is permanently free. No credit card required to sign up. Upgrade prompts appear when free plan limits are reached, not before.

---

## 7. NON-FUNCTIONAL REQUIREMENTS

### Performance
- Page load time under 2 seconds on 4G connection
- AI streaming response starts within 3 seconds of submission
- Dashboard loads within 1.5 seconds for returning users with cached data

### Security
- All routes requiring authentication are protected at the middleware level
- Passwords hashed with bcrypt, minimum cost factor 12
- API keys never exposed to the client
- Rate limiting on all AI endpoints: 60 requests per hour per user on Pro, 10 per hour on Free
- Input sanitization on all user-generated content before storage

### Reliability
- MongoDB connection uses singleton pattern to avoid connection pool exhaustion
- All AI calls wrapped in try/catch with graceful fallback UI
- Vercel deployment with automatic rollback on failed deployments

### Accessibility
- All interactive elements keyboard navigable
- Color contrast ratio minimum 4.5:1 for all text
- Screen reader friendly landmark structure on all pages

---

## 8. SUCCESS METRICS

### North Star Metric
**Weekly Active Learners:** Users who complete at least one check-in or AI interaction per week.

### Supporting Metrics
| Metric | Target (Month 3) | Target (Month 6) |
|---|---|---|
| Registered users | 500 | 3,000 |
| Onboarding completion rate | 70% | 75% |
| Day 7 retention | 40% | 50% |
| Free to Pro conversion | 5% | 8% |
| Daily check-in streak (avg) | 4 days | 7 days |
| NPS score | 45 | 60 |

---

## 9. LAUNCH PHASES

### Phase 1 — MVP (Weeks 1 to 8)
- Auth (Google + email/password)
- Onboarding flow (3 steps)
- Roadmap generation and display
- Daily check-in with AI response
- Code review
- Basic concept explainer chat
- Free plan only

### Phase 2 — Growth (Weeks 9 to 16)
- Community feed
- Progress history and heatmap
- Pro plan + Stripe billing
- Email notifications (streak reminders, weekly digest)
- Mobile-responsive polish pass

### Phase 3 — Scale (Weeks 17 to 24)
- Team/Cohort plan
- Shared roadmaps for bootcamp leads
- Analytics dashboard for team admins
- Roadmap template marketplace (community-contributed)
- Public profile pages

---

## 10. OUT OF SCOPE (V1)

- Mobile native apps (iOS/Android)
- Video content or embedded video player
- Live chat with human mentors
- Job board or employer connections
- Certificate generation
- Peer code review (human-to-human)

---

## 11. RISKS AND MITIGATIONS

| Risk | Likelihood | Impact | Mitigation |
|---|---|---|---|
| AI responses feel generic | High | High | Always inject user context. Test prompts extensively before launch. |
| High AI API costs at scale | Medium | High | Implement token budgets per plan tier. Cache common concept explanations. |
| Low Day 7 retention | Medium | High | Streak system + email reminders + onboarding completion gate |
| MongoDB connection issues under load | Low | High | Use connection pooling, singleton pattern, and Vercel's serverless-friendly config |
| Users abandon during onboarding | Medium | Medium | Auto-save per step. Show roadmap preview during onboarding to create anticipation. |

---

## 12. OPEN QUESTIONS

1. Should roadmap weeks be manually completable or only completable through check-in activity?
2. Should the Community feed be visible to unauthenticated users as a marketing surface?
3. What is the token budget per AI interaction on the free plan?
4. Should the AI mentor have a name and persona beyond "DevMentor"?
5. How should the product handle users whose goals shift dramatically mid-roadmap?

# RULES.md — DevMentor AI Agent Rules

> This file is the highest priority instruction file in the entire repository. Every AI agent, coding assistant, or automated tool working on this codebase must read and follow every rule in this file before taking any action. These rules override convenience, speed, and assumptions.

---

## THE PRIME DIRECTIVES

These three rules sit above everything else. If you are unsure about anything, come back to these.

**1. Never overwrite a file without showing the diff and receiving explicit permission first.**

**2. Always validate that previous changes are working before introducing new ones.**

**3. When in doubt, ask. Do not assume. Do not guess. Do not proceed silently.**

---

## SECTION 1 — FILE MODIFICATION RULES

### 1.1 Never Overwrite Without Permission

Before modifying any existing file, you must:

- Show the current state of the relevant section
- Show exactly what you intend to change and why
- Wait for the developer to confirm before writing anything

Do not say "here is the updated file" and replace the entire content without this process. Even if you are confident the change is correct.

```
WRONG:
Agent: "Here is your updated route.ts" → replaces entire file

CORRECT:
Agent: "In your route.ts, line 12 currently reads X. I need to change it to Y because Z. Should I proceed?"
Developer: "Yes"
Agent: → makes only that change
```

### 1.2 Surgical Edits Over Full Rewrites

Always make the smallest possible change that solves the problem. If only one function needs updating, only show and update that function. Never rewrite an entire file to fix a two-line issue.

If a full rewrite is genuinely necessary, explicitly state why a surgical edit is not sufficient before proceeding.

### 1.3 Never Delete Code Without Flagging It

If a change requires removing existing code, highlight exactly what is being removed and why. The developer must confirm deletions separately from additions. Removal is irreversible without version control.

### 1.4 New Files Are Always Safe, Existing Files Are Not

Creating a brand new file requires no special permission. Modifying or deleting any existing file always requires explicit confirmation from the developer first.

### 1.5 One File at a Time

Do not batch-modify multiple files in a single response unless the developer has explicitly asked for a multi-file update. Each file change is its own conversation step so the developer can review and approve each one individually.

---

## SECTION 2 — VALIDATION RULES

### 2.1 Validate Before Building Forward

Before implementing any new feature or change, confirm that the previous change is working correctly. If the developer has not confirmed the previous fix worked, ask before proceeding:

```
"Before I implement the roadmap generation route, can you confirm the 
MongoDB connection issue from the last step is resolved? I want to make 
sure the foundation is stable before we build on top of it."
```

### 2.2 Always Identify the Root Cause First

When debugging an error, identify and state the root cause before writing any fix. Do not suggest code changes until you understand exactly what is failing and why. A wrong fix applied confidently is worse than no fix at all.

```
WRONG:
Agent: "Try changing this line" → guesses without explaining why

CORRECT:
Agent: "The error is caused by X because Y. The fix is to change Z. 
Here is why that works: ..."
```

### 2.3 Check Dependencies Before Recommending Them

Before suggesting any new package or library, verify:
- It is compatible with Next.js 16
- It is actively maintained (last publish within 12 months)
- It does not conflict with existing packages in `package.json`
- The install command uses `npm install`, never `pnpm` or `yarn`

### 2.4 Never Assume the Previous Step Worked

Do not chain multiple fixes together assuming each one succeeded. After suggesting a fix, wait for the developer to confirm it resolved the issue before moving to the next step. Especially true for:
- Database connection issues
- Authentication configuration
- Environment variable changes
- Deployment failures

### 2.5 Test Paths Before Declaring a Fix Complete

After suggesting a fix, explicitly tell the developer how to verify it worked. Do not just say "that should fix it." Give a concrete verification step:

```
"After deploying, visit /api/og directly in your browser. 
If you see the 1200x630 image render, the fix worked."
```

---

## SECTION 3 — CODE QUALITY RULES

### 3.1 TypeScript Strictness

- No `any` types unless absolutely unavoidable
- If `any` must be used, add an inline comment explaining why
- All function parameters and return types must be explicitly typed
- Never use `// @ts-ignore` without a documented reason

### 3.2 No Dead Code

Do not leave unused imports, commented-out code blocks, or placeholder functions in files. If something is disabled temporarily, add a `// TODO:` comment explaining what it is waiting for.

### 3.3 No Console Logs in Production Paths

`console.log` is only acceptable inside development-only utilities. All API routes, server actions, and production components must use proper error handling, not console logging. Always remove debug logs before declaring a fix complete.

### 3.4 Error Handling Is Not Optional

Every `async` function that touches a database, external API, or file system must have a `try/catch`. Every API route must return a consistent error shape. Unhandled promise rejections are never acceptable.

### 3.5 Environment Variables Are Sacred

- Never hardcode values that belong in `.env.local`
- Never expose server-side env variables to the client
- Any variable prefixed with `NEXT_PUBLIC_` is visible to the browser — treat it accordingly
- When adding a new env variable, always update `.env.example` at the same time

### 3.6 Keep Components Focused

A component should do one thing. If a component is handling data fetching, rendering, and business logic simultaneously, flag it for refactoring. Server components fetch data. Client components handle interaction. They do not swap roles without a documented reason.

---

## SECTION 4 — COMMUNICATION RULES

### 4.1 Always Explain Before You Fix

Before showing any code, explain in plain English what the problem is, why it is happening, and what the fix will do. This gives the developer a chance to catch wrong assumptions before any code is written.

### 4.2 Flag Side Effects

If a proposed change will affect other parts of the codebase beyond the file being modified, say so explicitly before proceeding:

```
"Changing the User model to add this field will also require updating 
the onboarding/complete API route and the session type definition. 
Should I flag those files as well?"
```

### 4.3 Distinguish Between Confirmed Facts and Assumptions

If you are certain about something, state it directly. If you are making an educated guess based on partial information, say so:

```
WRONG: "The issue is in your middleware.ts"
CORRECT: "Based on the error message, the most likely cause is in 
middleware.ts, but I would need to see that file to confirm."
```

### 4.4 Never Gaslight the Developer

If a previous suggestion was wrong, own it directly. Do not reframe the error as something the developer did. Do not pretend the previous suggestion was always intended to be a stepping stone. Just state what was wrong and why the new approach is correct.

### 4.5 Separate What Is Broken From What Is Just Suboptimal

When reviewing code, clearly separate:
- **Bugs** — things that will cause errors or incorrect behavior
- **Warnings** — things that may cause problems in certain conditions
- **Suggestions** — improvements that are not urgent but worth noting

Do not present suggestions with the same urgency as bugs. The developer needs to prioritise correctly.

---

## SECTION 5 — PROJECT-SPECIFIC RULES

### 5.1 Stack is Fixed

This project uses:
- Next.js 16 (App Router)
- npm (never pnpm or yarn)
- MongoDB via Mongoose (singleton connection pattern only)
- Google Gemini API via Vercel AI SDK (never call Gemini from the client)
- NextAuth v5
- Tailwind CSS v4 with `@import "tailwindcss"` syntax (never `@tailwind` directives)

Do not suggest replacing any of these without a critical reason and explicit developer approval.

### 5.2 Color Palette Is Fixed

All UI changes must use hex values defined in `COLOR_PALETTE.md`. Do not introduce new colors. If a design requirement genuinely needs a new color, propose it to the developer and update `COLOR_PALETTE.md` first before using it in any component.

### 5.3 AI Calls Are Always Server-Side

The `GEMINI_API_KEY` must never appear in or be accessible from client-side code. All calls to the Gemini API go through Next.js API routes only. If a client component needs AI output, it calls an API route, which calls Gemini, which returns the result.

### 5.4 User Context Must Always Be Injected

No AI call is ever made without first calling `buildMentorContext(userId)` and injecting the result into the system prompt. A context-free AI call is a product failure, not just a code smell.

### 5.5 Onboarding Gate Must Be Respected

No feature, shortcut, or debug path should allow a user to reach `/dashboard` without completing onboarding and having a roadmap generated. The middleware enforces this and must not be bypassed even in development testing shortcuts.

---

## SECTION 6 — PULL REQUEST AND COMMIT RULES

### 6.1 Commit Message Format

```
type: short description of what changed

Types:
add:    new feature or file
fix:    bug fix
update: modification to existing feature
remove: deletion of code or file
docs:   documentation only changes
style:  formatting, no logic change
refactor: code restructure, no behavior change
```

Examples:
```
fix: remove anthropic import crashing client.ts on missing env var
add: POST route for roadmap generation using Gemini
update: step-3 onboarding to move session update after roadmap success
```

### 6.2 One Concern Per Commit

Do not bundle unrelated changes into a single commit. A fix for the OG image and an update to the roadmap route are two separate commits. This makes rollbacks clean and history readable.

### 6.3 Never Commit Directly to Main Without Review

All changes go through a branch and are reviewed before merging to main. Even solo projects benefit from this discipline because it creates a natural pause before irreversible changes hit production.

---

## SECTION 7 — WHAT THIS AGENT MUST NEVER DO

- Never overwrite a file without showing the change and getting confirmation
- Never suggest a fix without explaining the root cause first
- Never chain multiple fixes without waiting for confirmation that each one worked
- Never use `pnpm` or `yarn`
- Never reference Next.js 15 or earlier
- Never make AI calls from client-side code
- Never hardcode environment variables
- Never use `@tailwind base/components/utilities` directives (this is Tailwind v4)
- Never introduce a new dependency without checking compatibility first
- Never delete existing code without explicitly flagging the deletion for approval
- Never declare a fix complete without telling the developer how to verify it
- Never gaslight the developer when a previous suggestion was wrong
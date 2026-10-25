# AI Collaboration Evidence Log

| Tool | Prompt | Output Used | Output Rejected | Verification | Commit |
|------|--------|-------------|-----------------|--------------|--------|
| ChatGPT | Help me complete the Week 1 assignment step by step | Next.js homepage with Property Listings, Neighborhood Sponsors, and Voice Help cards | None | Local website displayed correctly; hot reload worked; npm run lint passed; npm run build passed with exit code 0 | 58ba136 |
| Gemini | Explain the Next.js, TypeScript, Tailwind CSS, Git/GitHub, and Vercel stack for a Neighborhood Listing Platform | Explained the purpose of each technology using beginner-friendly examples and analogies | Claims that Next.js guarantees instant loading and TypeScript makes code bug-free | Compared explanations with ChatGPT; verified the local Next.js app, lint, and production build | 88c4591 |
| Google AI Studio | App Shell Architect: Propose a minimal Next.js App Router, TypeScript, and Tailwind starter with commands, file plan, accessibility requirements, and verification checklist | Used the file plan and accessibility recommendations as guidance for reviewing the app | Rejected creating another Next.js project and adding unnecessary components or links to unbuilt pages | Compared recommendations against the existing homepage; previous lint and production build tests passed; no additional AI Studio code applied | 88c4591 |
## ChatGPT vs. Gemini Comparison

### Difference 1: Explanation Style
ChatGPT guided me through the actual setup process one step at a time, including installing Node.js, using GitHub, creating the Next.js app, and testing it. Gemini focused more on explaining each technology using simple comparisons, such as Git being a time machine and TypeScript being a safety belt.

### Difference 2: Verification and Accuracy
ChatGPT helped me verify commands using real terminal outputs, including successful lint and production build tests. Gemini focused more on the benefits of the technologies but made some exaggerated claims about instant page loading and bug-free code.

### Reflection
I found ChatGPT more useful for hands-on development because I could test each instruction before continuing. Gemini was helpful for understanding why the technologies are used together.

## Week 2 Lab 2 — ChatGPT vs. Gemini Critique

Date: October 25, 2026

### ChatGPT

- Context: Step-by-step development and review of the PropertyCard,
  SponsorBanner, SearchFilters, and PropertyExplorer components.
- Strength identified: Semantic HTML, labeled controls, descriptive
  image text, visible focus indicators, and responsive layouts.
- Risk identified: Sponsor content and images are still placeholders.
- Recommendation: Verify sponsor assets and permission requirements
  before final submission.
- Decision: Accepted the recommendation for follow-up. Sponsor
  verification has not yet been completed.

### Gemini

- Prompt: Critique the Next.js, TypeScript, and Tailwind real-estate
  listing components using an implementation summary. Give one
  strength, one risk, and one specific testable recommendation.
- Strength identified: Semantic HTML, keyboard accessibility,
  and explicit ARIA state management.
- Risk identified: Dynamic filtered results might not be
  announced to screen-reader users.
- Recommendation: Add aria-live="polite" and verify that a
  screen reader announces the updated result count.
- Decision: Rejected adding another live region because
  PropertyExplorer.tsx already contains role="status" and
  aria-live="polite". Accepted the recommendation to perform
  a manual screen-reader test.

### Comparison and Verification

ChatGPT focused on implementation and sponsor-content readiness.
Gemini focused on screen-reader notifications.

The live-region implementation was verified directly using:
grep -n -C 3 'aria-live' src/components/PropertyExplorer.tsx

ESLint passed. Lighthouse Snapshot passed 25 of 25 automated
accessibility checks. Manual screen-reader testing remains pending.

## Week 2 Lab 2 — Google AI Studio TypeScript Interface Review

Date: October 25, 2026

### Prompt
Review the TypeScript prop interfaces for PropertyCard,
SponsorBanner, and SearchFilters. Provide required versus optional
props, one type-safety issue, and a verification checklist.
Do not generate complete components.

### Suggestions Accepted
- PropertyCard requires property: Property.
- SponsorBanner requires sponsor: Sponsor.
- SearchFilters requires an onApplyFilters callback.
- Check Property ID types and filter callback compatibility.

### Suggestions Rejected or Not Applied
- Optional isSaved and onToggleSave props were unnecessary because
  PropertyCard manages its Save state internally.
- Optional className, priority, and initialFilters props were not
  required for the current component architecture.
- AI Studio proposed a location field, but the actual filter
  contract uses query and propertyType.
- Image fields in the existing types are named imageUrl.

### Verification
Inspected src/types/index.ts and the existing component interfaces.
Property.id is typed as string.
PropertyCardProps requires property: Property.
SponsorBannerProps requires sponsor: Sponsor.
SearchFiltersProps requires a callback accepting query and
propertyType strings.

No AI-generated code was copied into the application.

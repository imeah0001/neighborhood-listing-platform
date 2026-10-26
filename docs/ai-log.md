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

## Lab 3: JSON Schemas and Runtime Validation

Date: October 25, 2026

### Google AI Studio

Prompt goal:
Generate five fictional property listings using the required
Property JSON Schema fields.

Output used:
- Five structured JSON property listings.
- Property IDs property-002 through property-006.
- Prices, property types, amenities, and sponsor references.

Changes and limitations:
- The generated image and listing URLs used example.org placeholders.
- Those URLs were not treated as real property information.
- A local SVG illustration was used for unavailable photographs.
- The original generated JSON was preserved for verification.

Verification:
- All five records passed Ajv runtime validation.
- Seven automated generated-property tests passed.
- Property IDs were checked for uniqueness.

### ChatGPT

Prompt goal:
Build strict data contracts, test AI-generated records,
and connect them safely to the existing Next.js website.

Output used:
- Property, Sponsor, and PropertySponsor JSON Schemas.
- Ajv validation and automated tests.
- A validated property loader for the Next.js homepage.
- Property filter updates and placeholder-image handling.
- Architecture Decision Record documentation.

Changes and decisions:
- Preserved the existing Lab 2 website components.
- Mapped JSON field names to the existing TypeScript interface.
- Changed the dropdown to support house, condo,
  townhouse, and apartment.
- Rejected displaying unvalidated records in the UI.

Verification:
- Five property-validation tests passed.
- Seven generated-property tests passed.
- ESLint passed.
- Next.js production build and TypeScript checks passed.
- The House filter displayed exactly two properties.
- Local property illustrations rendered successfully.

### Reflection

Google AI Studio was useful for generating structured sample
data, but its output still required independent verification.

ChatGPT helped turn the data into working application code
and repeatable tests.

The important lesson was that valid JSON syntax, TypeScript
types, and working URLs are different guarantees. Runtime
validation is still necessary before displaying external data.

Lab 3 commit: Pending.

## Lab 4: Discovery and Product Requirements
Date: October 26, 2026
Team: E - Echo

### AI Prompts and Tasks
The following are prompt summaries, not verbatim transcripts.

1. ChatGPT: Draft eight neutral stakeholder interview questions
   covering workflow, audience, approvals, success, and accessibility.
2. Gemini: Critique the questions for bias, leading assumptions,
   double-barreled wording, and privacy concerns.
3. Google AI Studio: Analyze simulated notes N1-N8, identify themes,
   cite source notes, and suggest candidate requirements.
4. ChatGPT: Help organize hypothetical personas, user stories,
   acceptance criteria, MVP planning, and approval workflow.

### Useful Outputs and Human Decisions
- Revised questions 3, 5, and 6 after Gemini's critique.
- Retained five AI-identified themes with source-note references.
- Created two hypothetical personas and eight proposed user stories.
- Documented high-priority Given/When/Then scenarios.
- Proposed a Week 8 MVP and content approval process.

### Rejected or Qualified Suggestions
- Rejected treating simulated notes as real interviews.
- Rejected claiming an analytics dashboard was directly requested.
- Did not assume automated synchronization was needed.
- Did not accept logging, notifications, or approval roles
  as verified stakeholder requirements.

### Human Verification
- Compared AI themes against simulated notes N1-N8.
- Labeled all personas and requirements as hypothetical.
- Kept unresolved questions visible in the discovery documents.
- No real stakeholder interviews have occurred.
- Instructor approval for simulated discovery remains pending.
- No outreach will occur without instructor approval and consent.

### Evidence
See docs/discovery/ai-theme-audit.md,
docs/discovery/interview-guide.md,
docs/discovery/user-stories.md, and
docs/discovery/acceptance-criteria.md.

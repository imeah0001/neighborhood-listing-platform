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

## CIS 3610 Midterm Practical Examination — Version B

The entries below summarize AI-assisted midterm work. Prompt summaries are not represented as verbatim quotations where the original wording was not retained. All technical results listed as verified were checked through Terminal, GitHub, the application, or Supabase.

| Step / Tool | Prompt Summary | Model Output Used | Model Output Rejected & Rationale | Verification Method | Associated Git Commit |
|---|---|---|---|---|---|
| Requirements / ChatGPT | Guide the implementation of the local merchant services and booking midterm one step at a time | Three user stories with Given/When/Then acceptance criteria and database/API traceability | No specific rejected model output recorded | Reviewed requirements against the examination specification | 6b84fe4 |
| Database / ChatGPT | Help implement the required Supabase relational schema and security policies | Versioned SQL migration for five tables, constraints, and RLS policies | Did not treat SQL generation as proof that permissions worked; database execution and security checks were required | Migration executed in Supabase; five tables and RLS policies inspected; unauthorized insertion rejected with SQLSTATE 42501 | 42a25c9 |
| Application / ChatGPT | Guide development of approved service discovery and appointment booking | Accessible service cards, services explorer, booking form, and Next.js API integration | Did not rely on a successful build alone as evidence of booking persistence | Approved listing appeared on the website; booking submitted successfully and matching database row verified | 7849c0b |
| Validation / ChatGPT | Add strict Zod service validation and required server-only configuration without disrupting the existing API | src/schemas/service.ts, src/lib/supabaseServer.ts, and structured validation errors | Retired the earlier manual service-payload validation in favor of a reusable strict Zod contract | npm run lint and npm run build both passed after the update | 2dcb250 |
| Security audit / ChatGPT | Document actual positive and negative authorization test outcomes | docs/security-audit.md with role-based test matrix and recorded evidence | Rejected presenting unperformed role tests as passing; unverified scenarios remain explicitly marked NOT TESTED | Compared the audit entries with Supabase test results, saved booking records, and GitHub CI evidence | 2dcb250 |

### AI Verification and Limitations

- AI-generated code and explanations were reviewed through local builds, Supabase checks, and GitHub results.
- Successful lint and build checks do not by themselves prove security or accessibility.
- The end-to-end appointment booking was independently verified in the Supabase bookings table.
- Provider isolation, booking read isolation, and administrator-role tests remain incomplete where indicated in docs/security-audit.md.
- Exact historical prompt text should be added from original conversation records when available rather than reconstructed as invented quotations.
- The Gemini and Google AI Studio entries above this section describe earlier laboratory work; they are not claimed as additional midterm interactions.

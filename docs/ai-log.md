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

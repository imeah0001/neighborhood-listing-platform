# Week 2 Lab 2 — Testing Results

## Code Validation

- ESLint: Passed with no reported errors or warnings.
- Next.js production build: Passed.
- TypeScript validation: Passed during the production build.

## Responsive Design Testing

Tested in Chrome DevTools on October 25, 2026.

| Viewport | Expected Layout | Observed Result |
|---|---|---|
| 375px mobile | One property card per row | Passed |
| 768px tablet | Two property cards per row | Passed |
| 1280px desktop | Three property cards per row | Passed |

The search form and sponsored banner were also visually checked
at mobile width. No horizontal overflow was observed.

## Functional Testing

- Save button: Clicking changed "Save" to "Saved". Passed.
- Property search: Searching for "Minorca" reduced the results
  from three properties to one matching property. Passed.
- Clearing the search and applying filters restored three properties.
  Passed.

## Keyboard Accessibility Testing

- Tab navigation through search controls: Passed.
- Enter activation of Apply filters: Passed.
- Tab navigation to the sponsor link: Passed.
- Shift + Tab reverse navigation: Passed.
- Tab navigation to the property Save button: Passed.
- Space activation of the Save button: Passed.
- Tab navigation to the property listing link: Passed.
- Visible keyboard focus indicators: Observed.

After these tests, the Save button's accessible name was updated
to remain constant while aria-pressed reports its toggle state.

## Lighthouse Accessibility Audit

Date: October 25, 2026
Browser: Google Chrome
Audit mode: Snapshot
Category: Accessibility

Result: 25 of 25 automated accessibility checks passed.

Follow-up Lighthouse Navigation audit on the live Vercel preview:
Accessibility score: 100/100 (October 25, 2026).

A previous Navigation-mode audit did not produce a valid result
because of a browser-cache timeout and a NO_FCP error.

The Snapshot result is not a standard Lighthouse 100-point score.
Lighthouse also identified 10 items requiring manual review.

## Remaining Verification

- Recheck the updated Save button with keyboard and screen-reader tools.
- Repeat the accessibility audit after the final code changes.
- Numerical Lighthouse accessibility score recorded: 100/100.
- Complete partner review before merging the pull request.

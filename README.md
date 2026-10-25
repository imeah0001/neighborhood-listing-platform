# Neighborhood Listing Platform

An AI-assisted neighborhood property listing platform built with Next.js, TypeScript, and Tailwind CSS.

## Project Purpose

This project provides a foundation for helping residents discover local properties, connect with neighborhood businesses, and access helpful community information.

## Homepage Features

- **Property Listings:** Explore properties in your neighborhood.
- **Neighborhood Sponsors:** Discover businesses supporting the local community.
- **Voice Help:** Preview the concept of accessible voice assistance.

These cards introduce planned platform features; the current version is an application shell.

## Technology Stack

- Next.js (App Router)
- TypeScript
- Tailwind CSS
- ESLint
- Git and GitHub
- GitHub Actions
- Vercel

## Live Website

https://neighborhood-listing-platform-flax.vercel.app

## Run Locally

Install dependencies:

npm install

Start the development server:

npm run dev

Open http://localhost:3000 in your browser.

## Verification

Run the automated checks:

npm run lint
npm run build

GitHub Actions also runs lint and build checks.

## AI Collaboration

See [docs/ai-log.md](docs/ai-log.md) for documented use of ChatGPT, Gemini, and Google AI Studio.

## Development Workflow

Development was completed on the `setup/app-shell` feature branch and submitted through GitHub Pull Request #1.

## Week 2 Lab 2 — Component Hierarchy

The homepage uses semantic HTML and reusable React components.

```text
Home Page (src/app/page.tsx)
└── main
    ├── header
    │   ├── h1: Neighborhood Listing Platform
    │   ├── Introduction
    │   └── Sample-data disclaimer
    │
    ├── PropertyExplorer
    │   ├── SearchFilters
    │   │   └── section
    │   │       ├── h2: Search properties
    │   │       └── form
    │   │           ├── Labeled location input
    │   │           ├── Labeled property-type select
    │   │           └── Apply filters button
    │   │
    │   ├── SponsorBanner
    │   │   └── aside
    │   │       ├── Sponsored disclosure
    │   │       ├── Sponsor image and business name
    │   │       └── Sponsor website link
    │   │
    │   └── Property Listings
    │       └── section
    │           ├── h2: Available properties
    │           ├── Live results count
    │           └── Responsive listing grid
    │               └── PropertyCard (repeated)
    │                   └── article
    │                       ├── Descriptive property image
    │                       ├── Save toggle button
    │                       ├── Price
    │                       ├── h3: Property title
    │                       ├── address
    │                       ├── Property facts list
    │                       └── View listing link
    │
    └── More Platform Features
        └── section
            ├── Property Listings
            ├── Neighborhood Sponsors
            └── Voice Help
```

### Responsive Layout

The property listing grid uses these Tailwind CSS classes:

- Mobile (375px): `grid-cols-1` — one column.
- Tablet (768px): `md:grid-cols-2` — two columns.
- Desktop (1280px): `lg:grid-cols-3` — three columns.

### Testing Evidence

See [Lab 2 Testing Results](docs/lab2-testing.md) for responsive,
functional, keyboard-accessibility, and Lighthouse testing evidence.

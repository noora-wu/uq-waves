# UQ Waves

A mobile-style campus community app for University of Queensland students. Browse discussions, rate courses, and manage a local profile, with light and dark mode.

The interface is a Vite + React single-page app. Sign-in is simulated, and posts, ratings, and profile data live in the browser via Zustand.

## Features

- Onboarding and guest sign-in
- Discussion board with search, category filters, likes, and post details
- Course and teacher ratings
- Profile with a dark mode toggle
- Lost & found, second-hand, and campus activity screens (built, not wired into the main tabs)

## Stack

- React 18 and TypeScript
- Vite
- Tailwind CSS
- Radix UI
- Zustand

## Run locally

Requires Node.js 18+.

```bash
npm install
npm run dev
```

Open the URL Vite prints (default `http://localhost:3000`).

```bash
npm run build
```

## Project structure

```
src/
├── screens/          # Full pages: onboarding, login, home, ratings, profile
├── components/
│   ├── layout/       # Bottom navigation and floating action button
│   ├── posts/        # Post detail and composer
│   ├── subjects/     # Rating dialog
│   └── ui/           # Shared controls (button, card, dialog, ...)
├── data/             # Mock campus content
├── store/            # Zustand app state
├── types/            # Shared TypeScript types
├── lib/              # Small helpers
├── App.tsx
└── main.tsx
```

Course notes from the original assignment are in `docs/`.

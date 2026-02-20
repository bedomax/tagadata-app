# tagadata — Mobile App

> Real-time news aggregator for Latin America. Crawls top media sources every 15 minutes, clusters articles by topic, and ranks them by relevance score.

Available on the App Store for iOS.

---

## What it does

tagadata pulls articles from the biggest news outlets in Chile and Ecuador, groups stories covering the same topic into clusters, and assigns each cluster a **score** based on how many sources are covering it. The higher the score, the more outlets are reporting on the same story — making it a reliable signal of what's actually trending, not just what's being promoted.

### Score tiers

| Tier | Score | Visual |
|------|-------|--------|
| **HOT** | 60+ | Large card, orange accent, HOT badge |
| **multi** | 1–59 | Medium card, multi-source badge |
| **compact** | 0 | Small card, single source |

---

## Features

- **Infinite scroll feed** — offset-based pagination, loads 20 articles at a time
- **Country filter** — Chile 🇨🇱 and Ecuador 🇪🇨 (more coming: Argentina, México, Colombia, Perú)
- **Tag filtering** — browse by topic keyword extracted from article clusters
- **Sort modes**
  - `recientes` — most recent first
  - `trending` — sorted by score (most covered stories)
  - `▶ videos` — YouTube-only articles, filtered client-side
- **In-app browser** — WebView with tagadata branding bar, progress indicator, back/reload/open-in-Safari controls
- **Dark / light theme** — auto-detected by time of day (6am–6pm = light), toggleable manually
- **About modal** — project description, flow diagram, score explanation, social links

---

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Framework | React Native + Expo (TypeScript) |
| Data fetching | TanStack Query v5 (`useInfiniteQuery`) |
| HTTP client | Axios |
| Navigation | React Navigation v7 (Native Stack) |
| In-app browser | react-native-webview |
| Safe area | react-native-safe-area-context |
| Build & deploy | EAS Build + EAS Submit |

---

## Architecture

Follows **Atomic Design** principles:

```
src/
├── components/
│   ├── atoms/          # Text, Button, Card, LiveDot
│   ├── molecules/      # ArticleCard
│   └── organisms/      # Header, TagsBar, ArticleList, AboutModal
├── screens/            # HomeScreen, ArticleDetailScreen
├── navigation/         # RootNavigator, types
├── services/           # api.ts (Axios client), articles.ts (TanStack Query hooks)
├── theme/              # colors, spacing, typography, ThemeContext, sourceColors
└── types/              # API response types
```

### Key files

- `src/services/articles.ts` — `useArticles` hook, infinite pagination, videos filter
- `src/components/molecules/ArticleCard.tsx` — 3-tier card system based on score
- `src/components/organisms/Header.tsx` — country selector bottom sheet, live dot
- `src/theme/ThemeContext.tsx` — global dark/light theme context
- `src/theme/sourceColors.ts` — per-source brand color map

---

## API

Powered by the tagadata backend at `https://tagadata.com`.

```
GET /api/news
  ?limit=20
  &offset=0
  &country=cl        # cl | ec
  &tag=política      # optional topic filter
  &sort=date         # date | score | videos
```

Response:
```json
{
  "articles": [...],
  "count": 1642,
  "country": "cl",
  "last_updated": "2026-02-20T01:30:21.440Z",
  "tags": [{ "tag": "política", "count": 34 }]
}
```

**Note:** `sort=videos` returns articles with YouTube URLs mixed with regular ones. The app filters client-side using URL pattern matching (`youtube.com` / `youtu.be`).

---

## Getting Started

### Prerequisites

- Node.js v18+ (use `nvm use stable`)
- Expo CLI
- iOS Simulator (Xcode) or physical device with Expo Go

### Install

```bash
git clone https://github.com/bedomax/tagadata-app.git
cd tagadata-app
npm install
```

### Run

```bash
npx expo start --port 8082
```

Press `i` to open in iOS Simulator, or scan the QR code with Expo Go.

---

## Building for Production

Uses [EAS Build](https://docs.expo.dev/build/introduction/) (Expo Application Services).

```bash
# Install EAS CLI
npm install -g eas-cli

# Login
eas login

# Build for iOS (App Store)
eas build --platform ios --profile production

# Submit to App Store Connect
eas submit --platform ios
```

---

## Design

- **Color palette** — black `#0a0a0a` background, orange `#f97316` accent, monospace typography throughout
- **App icon** — white T-shape on dark background with orange live dot, minimal and readable at any size
- **Source colors** — each news outlet has a unique brand color dot for quick visual scanning

---

## Author

Built by **Bedo** ([@bedomax](https://x.com/bedomax)) — indie developer based in Latin America.

The tagadata project started 12 years ago as a personal news dashboard. It was rebuilt from scratch in 2026 using AI-assisted development.

- X: [@bedomax](https://x.com/bedomax)
- Instagram: [@bedomax](https://instagram.com/bedomax)
- Web: [tagadata.com](https://tagadata.com)

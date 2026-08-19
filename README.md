# 🐰 GitRabbit — Frontend

> **AI-powered code review platform.** GitRabbit is a full-stack SaaS product inspired by CodeRabbit, built with a modern Next.js 16 frontend featuring a complete dashboard, documentation portal, blog, pricing page, and AI feature previews.

---

## 📌 Project Overview

GitRabbit is an intelligent code review assistant that integrates directly into your Git workflow. This repository contains the **frontend application** — a fully functional, production-quality Next.js app with:

- 🏠 **Marketing Landing Page** — Hero section, features, workflow demos, logo bar, stats
- 📊 **User Dashboard** — Full analytics dashboard with 10+ tab views (protected by access token)
- 📄 **Documentation Portal** — 30+ documentation pages (reviews, CLI, integrations, API, etc.)
- 💰 **Pricing Page** — Plans and Rabbit Coins pricing
- 📝 **Blog** — Dynamic blog with route-based articles (`/blog/[id]`)
- 📋 **Changelog** — Product update history page
- 🔐 **Auth Pages** — Login and Signup UI

> ⚠️ **Demo Note:** The backend is not deployed. The dashboard is protected by an access token. Contact the developer for access.

---

## 🗂️ Project Structure

```
gitrabbit_frontend/
├── app/                        # Next.js App Router pages
│   ├── page.tsx                # Landing page (/)
│   ├── layout.tsx              # Root layout with providers
│   ├── globals.css             # Global CSS variables & design tokens
│   ├── login/                  # /login
│   ├── signup/                 # /signup
│   ├── pricing/                # /pricing
│   ├── blog/                   # /blog & /blog/[id]
│   ├── changelog/              # /changelog
│   ├── docs/                   # /docs — 30+ documentation pages
│   └── user/
│       └── dashboard/          # /user/dashboard (token-protected)
│
├── components/
│   ├── HeroSection.tsx         # Landing hero
│   ├── FeaturesSection.tsx     # Feature highlights
│   ├── WorkflowSection.tsx     # Workflow walkthrough
│   ├── Navbar.tsx              # Top navigation
│   ├── Footer.tsx              # Site footer
│   ├── LogoBar.tsx             # Partner/integration logos
│   ├── StatsSection.tsx        # Stats display
│   ├── InteractiveWorkflow.tsx # Animated workflow demo
│   ├── ProjectIntroSection.tsx # Project intro block
│   ├── DocPage.tsx             # Reusable documentation page layout
│   ├── PageLoader.tsx          # Full-screen page loading animation
│   ├── backend-required-modal.tsx  # Modal shown for backend-locked features
│   ├── v2-announcement-modal.tsx   # V2 announcement modal
│   ├── Icons.tsx               # Shared SVG icon components
│   ├── dashboard/              # Dashboard-specific components
│   │   ├── Header.tsx
│   │   ├── Sidebar.tsx
│   │   ├── StatsSection.tsx
│   │   ├── AnalyticsSection.tsx
│   │   ├── RecentPRs.tsx
│   │   ├── SidebarExtras.tsx
│   │   ├── InsightsHealth.tsx
│   │   └── tabs/               # 10 dashboard tab components
│   │       ├── RepositoriesTab.tsx
│   │       ├── PullRequestsTab.tsx
│   │       ├── ReviewsTab.tsx
│   │       ├── SuggestionsTab.tsx
│   │       ├── AnalyticsTab.tsx
│   │       ├── ReportsTab.tsx
│   │       ├── IntegrationsTab.tsx
│   │       ├── TeamTab.tsx
│   │       ├── ChatTab.tsx
│   │       └── SettingsTab.tsx
│   └── ui/                     # Shared UI primitives (Button, Modal, etc.)
│
├── context/
│   ├── ThemeContext.tsx         # Light/dark theme state + CSS variable injection
│   └── BackendRequiredContext.tsx  # Global modal trigger for backend-locked features
│
├── hooks/
│   └── useBackendRequired.ts   # Hook to trigger backend-required modal
│
├── lib/                        # Utility functions & shared helpers
├── public/                     # Static assets (images, logos, icons)
├── next.config.ts              # Next.js configuration
├── tsconfig.json               # TypeScript configuration
└── package.json
```

---

## 🛠️ Tech Stack

| Technology | Purpose |
|:---|:---|
| **Next.js 16.2** | Full-stack React framework with App Router & Turbopack |
| **React 19** | UI component library |
| **TypeScript 5** | Static typing throughout |
| **Tailwind CSS v4** | Utility-first styling with CSS variable tokens |
| **Framer Motion 12** | Animations, transitions, and micro-interactions |
| **Lucide React** | Icon library |
| **ESLint 9** | Linting with Next.js config |

---

## 🚀 Getting Started

### Prerequisites
- Node.js 18+
- npm / yarn

### Installation

```bash
# Clone the repository
git clone <repo-url>
cd gitrabbit/frontend/gitrabbit_frontend

# Install dependencies
npm install
```

### Development

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Production Build

```bash
npm run build
npm run start
```

---

## 💻 Available Commands

| Command | Description |
|:---|:---|
| `npm run dev` | Start development server with Turbopack |
| `npm run build` | Build optimized production bundle |
| `npm run start` | Start production server |
| `npm run lint` | Run ESLint checks |

---

## 🔐 Dashboard Access

The dashboard at `/user/dashboard` is protected by an **access token**.

Enter the token when prompted to unlock the full dashboard experience. Contact the developer to get the access token.

---

## 📄 Pages & Routes

| Route | Description |
|:---|:---|
| `/` | Marketing landing page |
| `/login` | Login page |
| `/signup` | Signup page |
| `/pricing` | Pricing & Rabbit Coins |
| `/blog` | Blog listing |
| `/blog/[id]` | Dynamic blog article |
| `/changelog` | Product changelog |
| `/docs` | Documentation hub |
| `/docs/quickstart` | Getting started guide |
| `/docs/reviews` | Code review features |
| `/docs/cli` | Pre-commit CLI |
| `/docs/ide` | IDE integrations |
| `/docs/slack-agent` | Slack notifications |
| `/docs/api` | API reference |
| `/docs/security` | Security & SAST |
| `/docs/test-gen` | Unit test generation |
| `/docs/docstrings` | Docstring generation |
| `/docs/code-graph` | Code graph analysis |
| `/docs/analytics` | Analytics & reporting |
| `/docs/agentic-chat` | AI chat feature |
| `/docs/github` | GitHub integration |
| `/docs/gitlab` | GitLab integration |
| `/docs/bitbucket` | Bitbucket integration |
| `/user/dashboard` | User dashboard (token-protected) |

---

## 🎛️ Dashboard Tabs

The user dashboard includes **10 full-featured tabs**:

| Tab | Description |
|:---|:---|
| **Overview** | Key metrics, analytics charts, recent PRs, insights |
| **Repositories** | Connected repository management |
| **Pull Requests** | PR list, status, and AI review triggers |
| **Reviews** | Detailed AI review history and insights |
| **Suggestions** | AI improvement suggestions (Rabbit Coins powered) |
| **Analytics** | In-depth usage and review analytics |
| **Reports** | Generated project reports |
| **Integrations** | VS Code, Cursor, Windsurf, Slack, CLI setup |
| **Team** | Team collaboration, members, shared workspaces |
| **Chat** | Agentic AI chat interface |
| **Settings** | Account, notifications, billing settings |

---

## 🎨 Design System

The app uses a CSS variable-based design token system defined in `globals.css` and managed by `ThemeContext`:

- **Colors:** `--bg-primary`, `--bg-secondary`, `--text-primary`, `--border-primary`, `--brand-yellow`, etc.
- **Themes:** Light and Dark modes, toggled globally via `ThemeContext`
- **Typography:** Outfit, JetBrains Mono (via Google Fonts)
- **Animations:** Framer Motion for all transitions, modals, and micro-interactions

---

## 🐾 Key Features (Frontend Preview)

- ✅ Responsive across all screen sizes
- ✅ Dark/light theme toggle
- ✅ 10-tab fully designed dashboard
- ✅ 30+ documentation pages
- ✅ Rabbit Coins virtual currency simulation
- ✅ Animated hero, workflow, and feature sections
- ✅ V2 announcement modal
- ✅ Token-gated dashboard access
- ✅ Production build verified (Next.js static + dynamic routes)
- ✅ Turbopack-powered fast refresh in dev

---

## 👨‍💻 Developer

**Shakib**
- WhatsApp: [+880 1771-659336](https://wa.me/8801771659336)

---

## 📜 License

This project is a private demo/portfolio project. All rights reserved.

# AutoHub – Premium Automotive Marketplace

> **Drive Your Dream.** A modern, high-performance automotive discovery, comparison, and garage management mobile application. Recreated with faithful visual fidelity from modern luxury automotive design specifications.

---

## 🌟 Overview

**AutoHub** is a production-grade automotive marketplace web application designed for mobile-first touch ergonomics and responsive desktop experiences. Built with deep midnight navy aesthetics, electric cyan/blue neon accents, and subtle glassmorphic surfaces, it empowers vehicle buyers to discover, compare, and connect directly with certified luxury and electric vehicle dealers.

---

## ✨ Features

- **📱 Welcome & Onboarding Screen**:
  - AutoHub aerodynamic sports car silhouette branding with glow accents.
  - Interactive multi-slide walkthrough highlighting verified inspections, transparent pricing, and instant dealer communication.
  - Quick entry point to account registration and direct access to the marketplace.

- **🏠 Home Dashboard**:
  - Live vehicle search with real-time query feedback.
  - Interactive notification center with unread counters and price-drop alerts.
  - Featured banner highlighting certified flagship models.
  - Quick action category icons: *New Cars, Used Cars, Compare, Favorites, Deals*.
  - Horizontal brand showcase featuring custom vector emblems for **Tesla, BMW, Mercedes-Benz, Audi, and Toyota**.
  - Popular category selector: *SUV, Sedan, Hatchback, Coupe, Electric*.

- **🔍 Find Your Car / Advanced Search & Filters**:
  - Dynamic category pills and filter chips.
  - Bottom-sheet filter modal with price range slider ($30k – $200k+), condition filters (New/Used), fuel systems (Electric, Hybrid, Gasoline), transmission types, and minimum year selector.
  - Instant sorting by Popularity, Price (Low to High / High to Low), and Newest Year.
  - Live result counters with resilient listing cards.

- **⚡ Car Details Screen (Tesla Model 3 Long Range AWD)**:
  - High-resolution hero vehicle view on a futuristic neon pedestal ring floor.
  - 4 core benchmark spec cards: **Range (580 km)**, **Top Speed (233 km/h)**, **0–100 km/h (4.4 sec)**, and **Power (346 HP)**.
  - Interactive exterior paint finish selector.
  - Tabbed technical breakdowns for vehicle overview, full powertrain specifications, standard equipment checkmarks, and verified dealer contact details.
  - Sticky *"Contact Dealer"* action that initializes a direct chat pre-filled with vehicle data.

- **⚖️ Side-by-Side Car Comparison**:
  - Head-to-head benchmarking for up to 3 vehicles simultaneously.
  - Automated winner highlighting for **Fastest Acceleration**, **Highest Horsepower**, and **Best Value Price**.
  - Quick-add cards to slot other vehicles into comparison.

- **❤️ Saved Favorites**:
  - Persistent collection of saved dream cars backed by browser `localStorage`.
  - Real-time wishlist aggregate valuation calculation.
  - Quick-action dealer contact and 1-click removal.

- **🏢 My Garage**:
  - Personal vehicle fleet tracker.
  - Odometer logger with `+500 km` quick-log and service-date tracker.
  - Status indicators (*Active, In Service, Stored*).
  - Add/remove vehicle modal with custom nicknames and service notes.

- **💬 Real-Time Dealer Messaging**:
  - Dealer conversation inbox with verified dealer badges and unread counts.
  - Interactive chat interface with message stream.
  - Automated intelligent response simulation confirming viewing availability.

- **📱 Progressive Web App (PWA) Mobile Experience**:
  - Direct installation to Android home screen via native `beforeinstallprompt` flow.
  - Guided 4-step iOS Safari installation modal.
  - Offline asset precaching and runtime caching via Workbox and `vite-plugin-pwa`.
  - Non-intrusive offline connectivity indicator when network drops.
  - In-app service worker update prompt (*"New AutoHub Update Available"*) with safe refresh.
  - Dismissable installation banner on Home screen and permanent Install option in Profile & Drawer.

- **👤 User Profile & Settings**:
  - Member verification badge, membership duration, and contact details.
  - Editable profile modal.
  - Notification preference toggle and currency display.
  - **3 Viewport Presentation Modes**:
    1. **Phone Frame**: Realistic mobile phone chassis with glossy bevel, notch, and status bar.
    2. **Responsive**: Full responsive expansion for desktop and tablet screens.
    3. **4-Screen Reference Matrix**: Interactive side-by-side view of all four core mobile screens.

---

## 🛠️ Technology Stack

- **Framework**: [React 19](https://react.dev/) + [TypeScript 5](https://www.typescriptlang.org/)
- **Bundler & Dev Server**: [Vite 8](https://vitejs.dev/) with native ES module loading
- **PWA Tooling**: [vite-plugin-pwa](https://vite-pwa-org.netlify.app/) + [Workbox](https://developer.chrome.com/docs/workbox/)
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com/) with custom dark navy glass design tokens
- **Icons**: [Lucide React](https://lucide.dev/)
- **Animations**: [Motion](https://motion.dev/)
- **State Management**: React Context (`AppContext`) with persistent `localStorage` synchronization
- **Deployment Target**: [Vercel](https://vercel.com/) / [GitHub](https://github.com/)

---

## 🚀 Getting Started

### Prerequisites

- **Node.js**: v18.0.0 or later (v20+ recommended)
- **npm**: v9.0.0 or later (or `pnpm` / `yarn` / `bun`)

### 1. Clone the Repository

```bash
git clone https://github.com/your-username/autohub.git
cd autohub
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Environment Setup

Copy the example environment template:

```bash
cp .env.example .env.local
```

Configure any optional variables in `.env.local`:

```env
VITE_APP_URL="http://localhost:3000"
VITE_MARKETPLACE_NAME="AutoHub"
```

### 4. Run Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 📦 Production Build

To test and compile the production-ready bundle:

```bash
# Type check and build
npm run lint
npm run build
```

The compiled static files are generated in the `/dist` directory.

To preview the production build locally:

```bash
npm run preview
```

---

## 🌐 Deploying to Vercel

AutoHub is pre-configured for zero-configuration deployment on **Vercel** via `vercel.json`.

### Option A: Via GitHub Integration (Recommended)

1. Push your repository to **GitHub** (see instructions below).
2. Go to [https://vercel.com/](https://vercel.com/) and sign in with GitHub.
3. Click **Add New Project** &rarr; **Project**.
4. Import your `autohub` repository.
5. Vercel automatically detects the **Vite** framework preset:
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
   - **Install Command**: `npm install`
6. Click **Deploy**. Your site will be live on a `*.vercel.app` domain with automated deployments on every `git push` to your default branch.

### Option B: Via Vercel CLI

```bash
# Install Vercel CLI globally
npm i -g vercel

# Login to your Vercel account
vercel login

# Deploy to preview
vercel

# Deploy directly to production
vercel --prod
```

---

## 🐙 GitHub Repository Setup

To initialize and push this project to a new GitHub repository:

```bash
# 1. Initialize git (if not already done)
git init

# 2. Stage all production files
git add .

# 3. Commit the initial release
git commit -m "Initial production-ready AutoHub marketplace release"

# 4. Rename main branch
git branch -M main

# 5. Add your GitHub remote repository
git remote add origin https://github.com/<YOUR-GITHUB-USERNAME>/autohub.git

# 6. Push to GitHub
git push -u origin main
```

---

## 🔒 Security & Data Privacy

- **No Secret Leaks**: No secret keys, API credentials, or private keys are bundled into client code.
- **Git Exclusions**: `.gitignore` strictly excludes `.env*`, `.vercel`, `dist`, and `node_modules`.
- **Zero Sensitive Storage**: `localStorage` only retains UI preferences (saved favorites, garage nicknames, and view layout), never passwords or authentication tokens.
- **Input Validation**: All forms (authentication, search queries, mileage updates, and dealer chat) implement client-side sanitization and length validation.

---

## 📄 License

This project is licensed under the Apache-2.0 License.

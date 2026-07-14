# LA Contractors (Brooksville)

Brooksville's premier local Site Development and Pipe Installation company website, refactored into a high-performance React + TypeScript + Tailwind CSS application, fully integrated and ready for deployment to **GitHub Pages**.

## 🛠️ Tech Stack & Key Integrations

- **Framework**: [React 18](https://react.dev/) + [Vite](https://vitejs.dev/) (Hot Module Replacement, ultra-fast bundling)
- **Language**: [TypeScript](https://www.typescriptlang.org/) (Strict type-safety, modular interface declarations)
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com/) (Atomic utility class modeling) paired with our customized **Prestige Design stylesheet**
- **Animations**: [Framer Motion / Motion](https://motion.dev/) (Fluid entrance fade transitions, tab states, and carousel slides)
- **Icons**: [Lucide React](https://lucide.dev/) (Dynamic vector-based SVG graphics)
- **CI/CD Pipeline**: [GitHub Actions](https://github.com/features/actions) (`.github/workflows/deploy.yml` for automated GitHub Pages static builds)

---

## 🗂️ Project Structure

The project has been refactored into a highly maintainable, modular structure:

```bash
├── .github/
│   └── workflows/
│       └── deploy.yml        # CI/CD automated pipeline for GitHub Pages
├── src/
│   ├── components/
│   │   ├── Header.tsx        # Sticky navigation drawer with GitHub repo link
│   │   ├── Hero.tsx          # Dynamic heading with subtle entrance animations
│   │   ├── About.tsx         # Meet LA contractors panel with interactive values tabs
│   │   ├── Services.tsx      # Services details cards and modal detailed spec grids
│   │   ├── Pricing.tsx       # Live Cost Estimator slider engine (site clearing/pipe-laying)
│   │   ├── Work.tsx          # Filterable completed project portfolio & auto testimonials carousel
│   │   ├── Contact.tsx       # Booking proposal submission form with success tracking badges
│   │   └── Footer.tsx        # Legal licensing footer (Lic #CUC1224558) and shortcuts
│   ├── App.tsx               # Root app controller orchestrating smooth-scrolling & estimate bindings
│   ├── main.tsx              # Main application entry mounting into the DOM
│   ├── index.css             # Tailwind library config entry
│   └── types.ts              # Declarations of typescript objects
├── index.html                # App bundle container entrypoint
├── style.css                 # Global custom brand stylesheet
├── vite.config.ts            # Vite compiler adjustments
├── tsconfig.json             # TypeScript configurations
└── package.json              # App metadata, node dependencies, & run scripts
```

---

## 🚀 How to Run Locally

### 1. Prerequisite
Ensure you have [Node.js](https://nodejs.org/) (version 18 or newer) installed.

### 2. Install Dependencies
```bash
npm install
```

### 3. Run Development Server
Spins up a local development server with active HMR:
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your web browser.

### 4. Code Quality & Linter
Verifies TypeScript types and syntax validity:
```bash
npm run lint
```

### 5. Build for Production
Compiles types, styles, and scripts into a self-contained static `dist/` directory:
```bash
npm run build
```

---

## 🌐 Deployment to GitHub Pages

This repository comes pre-equipped with an automated GitHub Actions workflow to deploy the compiled application to GitHub Pages on every push to your default branch (`main` or `master`).

1. **Push your code** to your public/private GitHub repository:
   ```bash
   git init
   git add .
   git commit -m "Initialize modular React app"
   git remote add origin https://github.com/YOUR_USERNAME/la-contractors.git
   git branch -M main
   git push -u origin main
   ```
2. Navigate to your repository's **Settings > Pages**.
3. Under **Build and deployment > Source**, select **GitHub Actions**.
4. The `.github/workflows/deploy.yml` workflow will automatically run, build, and deploy your site to:
   `https://YOUR_USERNAME.github.io/la-contractors/`

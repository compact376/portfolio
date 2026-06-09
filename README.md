# Mission Architect — Backend Systems & Secure Payloads

A cinematic 3D portfolio showcasing backend engineering expertise in authentication, payments, APIs, data systems, and cloud infrastructure.

## Tech Stack

- **React 18** with TypeScript
- **Vite** for fast builds
- **Three.js** with React Three Fiber for 3D graphics
- **Tailwind CSS** with custom HUD design system
- **Framer Motion** for animations

## Getting Started

```bash
npm install
npm run dev
```

## Build for Production

```bash
npm run build:prod
npm run preview
```

## Project Structure

```
src/
├── components/
│   ├── three/        # 3D scene components (Rocket, Satellites, Environment)
│   ├── ui/           # Shadcn UI components
│   └── Sections.tsx  # Main page sections
├── lib/
│   └── missionData.ts # Static content data
├── pages/
│   ├── Index.tsx     # Home page
│   └── NotFound.tsx
└── hooks/
    └── useScrollProgress.ts # Scroll tracking hook
```

## Features

- **Immersive 3D experience** with dynamic camera paths
- **Mission-themed UI** with HUD aesthetics
- **Mobile responsive** design optimized for phones and tablets
- **Performance optimized** with code splitting and asset loading
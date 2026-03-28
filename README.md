# 360 View Design

A monorepo containing multiple applications built with React, TypeScript, and Vite.

## Applications

- **Mockup Sandbox** (`/artifacts/mockup-sandbox`) - A React application for creating and previewing mockups
- **Saiemaas Restaurant** (`/artifacts/saiemaas-restaurant`) - A restaurant website application
- **API Server** (`/artifacts/api-server`) - Express.js backend API

## Development

### Prerequisites

- Node.js (v18+)
- pnpm package manager

### Installation

```bash
pnpm install
```

### Development

```bash
# Start all applications in development mode
pnpm run dev

# Start individual applications
pnpm --filter @workspace/mockup-sandbox run dev
pnpm --filter @workspace/saiemaas-restaurant run dev
pnpm --filter @workspace/api-server run dev
```

### Build

```bash
# Build all applications
pnpm run build

# Build individual applications
pnpm --filter @workspace/mockup-sandbox run build
pnpm --filter @workspace/saiemaas-restaurant run build
pnpm --filter @workspace/api-server run build
```

## Deployment to Vercel

### Prerequisites

- Vercel CLI installed: `npm i -g vercel`
- Vercel account

### Automatic Deployment

1. Connect your repository to Vercel
2. Vercel will automatically detect the configuration and deploy

### Manual Deployment

1. Login to Vercel:
   ```bash
   vercel login
   ```

2. Deploy to production:
   ```bash
   pnpm run deploy
   ```

3. Deploy to preview:
   ```bash
   vercel
   ```

### Environment Variables

The following environment variables are configured for Vercel:

- `NODE_ENV`: production
- `PORT`: 3000
- `BASE_PATH`: /

### Application Routes

- **Root** (`/`): Mockup Sandbox application
- **Mockup** (`/mockup/*`): Mockup Sandbox static files
- **Restaurant** (`/restaurant/*`): Saiemaas Restaurant application
- **API** (`/api/*`): API Server endpoints

### Vercel Configuration

The `vercel.json` file handles:

- Build commands for the monorepo
- Route rewrites for different applications
- Function configuration for the API server
- Environment variable setup

## Project Structure

```
├── artifacts/
│   ├── api-server/          # Express.js API
│   ├── mockup-sandbox/      # React mockup tool
│   └── saiemaas-restaurant/ # Restaurant website
├── lib/                     # Shared libraries
├── scripts/                 # Build and utility scripts
├── package.json             # Root package configuration
├── pnpm-workspace.yaml     # PNPM workspace configuration
└── vercel.json             # Vercel deployment configuration
```

## Technology Stack

- **Frontend**: React 19, TypeScript, Vite, Tailwind CSS
- **Backend**: Express.js, Node.js
- **Database**: Drizzle ORM
- **UI Components**: Radix UI, shadcn/ui
- **Build Tool**: Vite
- **Package Manager**: pnpm

# Customer Management System - Frontend

A modern, responsive React application for managing customer accounts with a clean and intuitive interface.

## Features

-  **Responsive Design** - Mobile-first approach with Tailwind CSS
-  **Dual View Modes** - Switch between Table and Card layouts
-  **CRUD Operations** - Create, Read, Update, Delete customers
-  **Form Validation** - Zod schema validation with real-time feedback
-  **Modal Dialogs** - Clean UX for forms and confirmations
-  **Loading States** - Smooth loading indicators
-  **Error Handling** - Comprehensive error messages with toast notifications
-  **Code Splitting** - Lazy loading for optimal performance
-  **TypeScript** - Full type safety
-  **ESLint & Prettier** - Code quality and formatting

##  Tech Stack

- **React 19** - UI library
- **TypeScript** - Type safety
- **Vite** - Build tool and dev server
- **Tailwind CSS** - Styling
- **Zod** - Schema validation
- **Axios** - HTTP client
- **React Hot Toast** - Notifications
- **Lucide React** - Icons

##  Installation

### Prerequisites
- Node.js >= 19.0.0
- npm >= 10.0.0

### Setup

```bash
# Create frontend directory
mkdir frontend
cd frontend

# Initialize project
npm create vite@latest . -- --template react-ts

# Install dependencies
npm install

# Install additional packages
npm install axios zod lucide-react clsx react-hot-toast
npm install -D tailwindcss postcss autoprefixer prettier prettier-plugin-tailwindcss

# Initialize Tailwind CSS
npx tailwindcss init -p
```

##  Development

### Start Development Server

```bash
npm run dev
```

The application will be available at `http://localhost:3001`

### Build for Production

```bash
npm run build
```

### Preview Production Build

```bash
npm run preview
```

##  Code Quality

### Lint Code

```bash
npm run lint
```

### Fix Lint Issues

```bash
npm run lint:fix
```

### Format Code

```bash
npm run format
```

### Check Formatting

```bash
npm run format:check
```

##  Project Structure

```
frontend/
├── src/
│   ├── components/
│   │   ├── ui/                   # Reusable UI components
│   │   │   ├── Button.tsx
│   │   │   ├── Input.tsx
│   │   │   ├── Modal.tsx
│   │   │   ├── ConfirmDialog.tsx
│   │   │   ├── LoadingSpinner.tsx
│   │   │   └── EmptyState.tsx
│   │   ├── CustomerForm.tsx      # Customer form component
│   │   ├── CustomerTable.tsx     # Table view component
│   │   └── CustomerCards.tsx     # Card view component
│   ├── hooks/
│   │   ├── useCustomers.ts       # Customer data management
│   │   └── useFormValidation.ts  # Form validation hook
│   ├── schemas/
│   │   └── customerSchema.ts     # Zod validation schemas
│   ├── services/
│   │   └── api.ts                # API client and endpoints
│   ├── types/
│   │   └── customer.ts           # TypeScript types
│   ├── App.tsx                   # Main app component
│   ├── main.tsx                  # Entry point
│   └── index.css                 # Global styles
├── public/
├── index.html
├── vite.config.ts
├── tsconfig.json
├── .eslint.config.js
├── .prettierrc
├── .prettierignore
└── package.json
```

##  Component Architecture

### UI Components
All reusable UI components are in `src/components/ui/`:
- **Button** - Versatile button with variants (primary, secondary, danger, ghost)
- **Input** - Form input with label, error, and helper text
- **Modal** - Accessible modal dialog
- **ConfirmDialog** - Confirmation dialog for destructive actions
- **LoadingSpinner** - Loading indicator
- **EmptyState** - Empty state placeholder

### Feature Components
- **CustomerForm** - Reusable form for create/edit operations
- **CustomerTable** - Desktop-optimized table view
- **CustomerCards** - Mobile-friendly card grid

##  Configuration

### Environment Variables

Create a `.env` file in the root:

```env
VITE_API_URL=http://localhost:5000
```

### API Proxy (Development)

Vite dev server proxies API requests to avoid CORS issues:

```typescript
// vite.config.ts
server: {
  proxy: {
    '/api': {
      target: 'http://localhost:5000',
      changeOrigin: true,
    },
  },
}
```

##  Responsive Design

The application is fully responsive with breakpoints:
- **Mobile**: < 640px
- **Tablet**: 640px - 1024px
- **Desktop**: > 1024px

### View Modes
- **Table View**: Best for desktop (shows all information in columns)
- **Card View**: Best for mobile/tablet (compact cards with key information)

##  Features in Detail

### Form Validation

Real-time validation using Zod schemas:

```typescript
// Required fields
- First Name: 2-50 chars, alphabetic only
- Last Name: 2-50 chars, alphabetic only
- Email: Valid email format

// Optional fields
- Phone Number: Valid format, min 10 digits
- Address: Max 200 chars
- City, State, Country: Max 50 chars each
```

### Error Handling

Comprehensive error handling with:
- Toast notifications for user feedback
- Inline form errors
- API error messages
- Loading states

### Code Splitting

Lazy loading for view components:

```typescript
const CustomerTable = lazy(() => import('./CustomerTable'));
const CustomerCards = lazy(() => import('./CustomerCards'));
```

Benefits:
- Smaller initial bundle
- Faster first paint
- Better performance

##  Best Practices

### TypeScript
- Strict mode enabled
- No implicit any
- Full type coverage

### React
- Functional components only
- Custom hooks for logic reuse
- Proper key props for lists
- Optimized re-renders

### Styling
- Tailwind utility classes
- Consistent design system
- Dark mode ready (extend theme)

### Performance
- Code splitting
- Lazy loading
- Memoization where needed
- Optimized images

##  Testing (Optional Setup)

```bash
# Install testing libraries
npm install -D vitest @testing-library/react @testing-library/jest-dom @testing-library/user-event

# Add test script to package.json
"test": "vitest"

# Run tests
npm test
```

##  Build Optimization

The production build includes:
- **Minification** - Compressed JavaScript/CSS
- **Tree Shaking** - Removes unused code
- **Code Splitting** - Separate chunks for vendors
- **Asset Optimization** - Optimized images and fonts

### Bundle Analysis

```bash
npm run build
# Check dist/ folder size

# Install bundle analyzer (optional)
npm install -D rollup-plugin-visualizer
```

##  Deployment

### Build for Production

```bash
npm run build
```

Output: `dist/` directory

### Deploy to Vercel

```bash
npm install -g vercel
vercel
```

### Deploy to Netlify

```bash
npm install -g netlify-cli
netlify deploy
```

### Deploy to GitHub Pages

```bash
# Install gh-pages
npm install -D gh-pages

# Add to package.json
"homepage": "https://username.github.io/repo-name",
"scripts": {
  "predeploy": "npm run build",
  "deploy": "gh-pages -d dist"
}

# Deploy
npm run deploy
```

##  Debugging

### React DevTools

Install React DevTools browser extension for debugging.

### Vite DevTools

Development server includes:
- Hot Module Replacement (HMR)
- Error overlay
- Source maps

### Network Tab

Monitor API calls in browser DevTools:
- Request/response inspection
- Network timing
- Error debugging


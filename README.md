# ModeroIQ - Next.js 15 & MongoDB Production Starter Template

A reusable, production-ready full-stack template built on **Next.js 15 (App Router)** with **MongoDB Authentication (Auth.js v5)**, strict **TypeScript**, **Tailwind CSS**, and hydration-safe **Dark/Light mode**.

---

## 🚀 Tech Stack

- **Framework**: Next.js 15+ (App Router, Turbopack, Partial Prerendering)
- **Language**: TypeScript (Strict mode, zero `any` types)
- **Database**: MongoDB (Native driver with singleton caching and `@auth/mongodb-adapter`)
- **Authentication**: Auth.js (NextAuth v5 beta) with Credentials provider (Email/Password) and JWT strategy
- **Password Hashing**: `bcryptjs`
- **Validation**: `zod` runtime schemas for all boundary inputs
- **Theming**: `next-themes` (hydration-safe, zero cascading re-renders via `useSyncExternalStore`)
- **UI & Styling**: Tailwind CSS, `class-variance-authority` (cva), `clsx`, `tailwind-merge` (`cn`), and `lucide-react`

---

## 🏛️ Core Architectural Principles

1. **Page Wrapper Pattern**:
   All `app/**/page.tsx` files are strictly thin wrappers (<20 lines) delegating layout and logic to corresponding components in `components/`.
2. **Strict TypeScript & Zod Validation**:
   No `any` types allowed. All server actions, API routes, and hooks feature explicit return types. All form inputs and API payloads are validated via Zod schemas at runtime boundaries.
3. **Standardized Server Responses**:
   Server actions return `{ success: boolean; data?: T; error?: string }`. Database error details are logged server-side and never leaked to the client.
4. **Server Components First**:
   Data is read on the server using Server Components with zero client-side `useEffect` data fetching leaks. Interactive UI state is pushed down to leaf components and custom hooks (`hooks/useLoginForm.ts`, `hooks/useSignupForm.ts`).
5. **Component Decomposition**:
   All UI components remain small, focused, and under 100 lines of code.

---

## 📁 File Structure

```text
modero-iq/
├── actions/
│   └── auth.ts                      # Server actions (signupUser, logoutUser)
├── app/
│   ├── api/
│   │   └── auth/[...nextauth]/
│   │       └── route.ts             # Auth.js API route handlers
│   ├── dashboard/
│   │   └── page.tsx                 # Protected route (Thin wrapper)
│   ├── login/
│   │   └── page.tsx                 # Login route (Thin wrapper)
│   ├── signup/
│   │   └── page.tsx                 # Signup route (Thin wrapper)
│   ├── globals.css                  # Tailwind styles and theme CSS variables
│   ├── layout.tsx                   # Root layout with ThemeProvider, Navbar, Footer
│   └── page.tsx                     # Landing page (Thin wrapper)
├── auth.ts                          # NextAuth v5 configuration and provider setup
├── components/
│   ├── dashboard/                   # Dashboard components (Header, Stats, Loader, Skeleton)
│   ├── home/                        # Landing page content and Feature cards
│   ├── login/                       # LoginForm and LoginPageContent
│   ├── shared/                      # Navbar, Footer, ThemeToggle, AuthNav
│   ├── signup/                      # SignupForm and SignupPageContent
│   └── ui/                          # Reusable CVA primitives (Button, Input)
├── hooks/
│   ├── useLoginForm.ts              # Form state and submission hook for login
│   └── useSignupForm.ts             # Form state and submission hook for signup
├── lib/
│   ├── db.ts                        # MongoDB connection pooling & singleton caching
│   ├── utils.ts                     # cn() class merger
│   └── validations/
│       └── auth.ts                  # Zod schemas for signup and login
├── providers/
│   ├── AuthProvider.tsx             # NextAuth SessionProvider wrapper
│   └── ThemeProvider.tsx            # next-themes Provider wrapper
├── types/
│   ├── index.ts                     # ActionResponse<T> and SafeUser types
│   └── next-auth.d.ts               # NextAuth type augmentations
├── .env.example                     # Environment template
└── .env.local                       # Local environment variables
```

---

## ⚙️ Environment Variables Setup

Create a `.env.local` file in the `modero-iq` root directory:

```env
# MongoDB Connection String
MONGODB_URI="mongodb://localhost:27017/moderoiq"

# Auth.js / NextAuth Secret
AUTH_SECRET="your-secure-random-32-char-secret-key"

# Application Base URL
AUTH_URL="http://localhost:3000"
NEXTAUTH_URL="http://localhost:3000"
```

---

## 🏃 Getting Started

### 1. Install Dependencies
```bash
npm install
```

### 2. Start the Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) to view the application.

### 3. Check Types & Linter
```bash
npx tsc --noEmit
npm run lint
```

### 4. Build for Production
```bash
npm run build
npm start
```

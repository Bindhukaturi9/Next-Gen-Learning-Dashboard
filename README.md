# LearnOS — Student Dashboard

A futuristic learning dashboard built with Next.js 15, Supabase, Framer Motion, and Tailwind CSS v4.

![Dashboard Preview](./preview.png)

---

## Tech Stack

| Tool | Purpose |
|------|---------|
| **Next.js 15** (App Router) | Framework, Server Components, routing |
| **Supabase** | PostgreSQL database + auth-ready BaaS |
| **Framer Motion** | Spring-physics animations, layoutId, stagger |
| **Tailwind CSS v4** | Utility styling |
| **Lucide React** | Icons dynamically mapped from DB `icon_name` |
| **TypeScript** | Full type safety across components and data |

---

## Architecture Decisions

### Server / Client Component Split

- **`app/dashboard/page.tsx`** — Server Component. Calls `getCourses()` which connects to Supabase using `@supabase/ssr` and the Next.js cookies API. Zero client JS involved in data fetching.
- **`components/dashboard/BentoGrid.tsx`** — Client Component (`"use client"`). Receives already-fetched data as props, handles Framer Motion animations.
- **`components/dashboard/Sidebar.tsx`** — Client Component. Manages collapse state and Framer Motion `layoutId` for active nav indicator.
- **`components/dashboard/CourseCard.tsx`** — Client Component. Animates the progress bar from 0 → `course.progress` on mount.

### Why `@supabase/ssr`?

`@supabase/ssr` properly integrates with Next.js cookie handling for both server and client contexts. It avoids the deprecated `@supabase/auth-helpers-nextjs` and works correctly in Server Components using `await cookies()`.

### Suspense + Loading Skeletons

`app/dashboard/loading.tsx` is automatically used by Next.js as the Suspense boundary for the `/dashboard` route segment. It renders shimmer skeleton tiles that match the real layout to eliminate content layout shift.

### Error Handling

`lib/data.ts` wraps all Supabase calls in try/catch. If the DB is unreachable or credentials are wrong, the dashboard falls back to hardcoded demo data and shows an `<ErrorTile>` alert at the top — the app never crashes.

---

## Setup

### 1. Clone & install

```bash
git clone https://github.com/your-username/learndash.git
cd learndash
npm install
```

### 2. Create a Supabase project

1. Go to [supabase.com](https://supabase.com) and create a free project.
2. In the SQL editor, paste and run the contents of **`supabase-seed.sql`**.
3. Go to **Project Settings → API** and copy your Project URL and anon key.

### 3. Set environment variables

```bash
cp .env.example .env.local
```

Edit `.env.local`:

```
NEXT_PUBLIC_SUPABASE_URL=https://your-project-ref.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key-here
```

### 4. Run locally

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) — it redirects to `/dashboard`.

---

## Deployment (Vercel)

1. Push to GitHub.
2. Import the repo in [vercel.com](https://vercel.com).
3. Add `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_ANON_KEY` as environment variables in the Vercel project settings.
4. Deploy.

---

## Responsive Breakpoints

| Breakpoint | Sidebar | Bento Grid |
|------------|---------|------------|
| > 1024px | Full with labels | 3-column |
| 768–1024px | Collapsed (icons only) | 2-column |
| < 768px | Bottom nav / hamburger | Single column |

---

## Animation Details

All animations use Framer Motion spring physics (`type: "spring", stiffness: 300, damping: 20`) to avoid linear easing.

- **Page load**: Bento tiles stagger in with `staggerChildren: 0.08`
- **Card hover**: `scale: 1.015` with border glow reveal
- **Progress bars**: Animate from `width: 0` to `width: course.progress%` on mount with staggered delay
- **Sidebar active pill**: `layoutId="sidebar-active"` snaps between nav items
- **Streak badge**: Spring hover scale on the flame badge
- **Activity cells**: Staggered scale-in from 0.5 → 1.0

---

*Made for the Frontend Intern Challenge*

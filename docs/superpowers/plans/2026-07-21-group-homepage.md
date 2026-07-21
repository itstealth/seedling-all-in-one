# Seedling Group Homepage Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build the Seedling Group of Schools homepage (`app/page.tsx`) as a set of composed section components that showcase SPS, SMHS, and Cambridge, and link out to each school's own site.

**Architecture:** Next.js 16 App Router, single route (`/`), composed from six presentational components under `app/components/home/`. Static content only — no data fetching, no CMS. Tailwind 4 for styling. Vitest + React Testing Library for lightweight render/smoke tests (new to this project — set up in Task 1).

**Tech Stack:** Next.js 16.2.10, React 19.2.4, TypeScript, Tailwind CSS 4, Vitest, @testing-library/react, @testing-library/dom, jsdom, @vitejs/plugin-react, vite-tsconfig-paths.

## Global Constraints

- Spec: `docs/superpowers/specs/2026-07-21-group-homepage-design.md`
- Scope is the homepage ONLY — do not add About/Alumni/Admissions/Academics pages.
- Do not fabricate biographical/experience copy for Dr. Sandeep Bakshi or Dr. Preeti Bakshi — use only the designations confirmed from seedlingschools.com/about-us.php (CEO & Director / Executive Director, Seedling Group of Institutions).
- The three school subdomains use a single "s": `sps.seedlingschools.com`, `smhs.seedlingschools.com`, `seedlingschools.com` (NOT `seedlingsschools.com`, which does not resolve). The Cambridge site is `seedling-international-academy.vercel.app`.
- External links to the three schools use `target="_blank" rel="noopener noreferrer"`.
- Logo files already downloaded to `public/logos/`: `sps-logo.png`, `smhs-logo.webp`, `cambridge-shield.webp`.

---

### Task 1: Test tooling setup (Vitest + React Testing Library)

**Files:**
- Modify: `package.json`
- Create: `vitest.config.mts`
- Create: `vitest.setup.ts`
- Create: `app/page.test.tsx`

**Interfaces:**
- Produces: `npm test` script that runs Vitest once (CI-friendly); `npm run test:watch` for watch mode. All later tasks' tests use `render`/`screen` from `@testing-library/react` and `test`/`expect` from `vitest`.

- [ ] **Step 1: Install test dependencies**

Run:
```bash
npm install -D vitest @vitejs/plugin-react jsdom @testing-library/react @testing-library/dom @testing-library/jest-dom vite-tsconfig-paths
```
Expected: packages added to `devDependencies` in `package.json`, `package-lock.json` (or equivalent) updated.

- [ ] **Step 2: Create Vitest config**

Create `vitest.config.mts`:
```ts
import { defineConfig } from 'vitest/config'
import react from '@vitejs/plugin-react'
import tsconfigPaths from 'vite-tsconfig-paths'

export default defineConfig({
  plugins: [tsconfigPaths(), react()],
  test: {
    environment: 'jsdom',
    setupFiles: ['./vitest.setup.ts'],
  },
})
```

- [ ] **Step 3: Create Vitest setup file**

Create `vitest.setup.ts`:
```ts
import '@testing-library/jest-dom/vitest'
```

- [ ] **Step 4: Add test scripts to package.json**

Modify `package.json` `scripts` block to add:
```json
"test": "vitest run",
"test:watch": "vitest"
```

- [ ] **Step 5: Write a failing smoke test against the current scaffold page**

Create `app/page.test.tsx`:
```tsx
import { expect, test } from 'vitest'
import { render, screen } from '@testing-library/react'
import Page from './page'

test('renders the group homepage headline', () => {
  render(<Page />)
  expect(
    screen.getByRole('heading', { name: /the journey from nursery to university/i })
  ).toBeInTheDocument()
})
```

- [ ] **Step 6: Run test to verify it fails**

Run: `npm test`
Expected: FAIL — the current scaffold `app/page.tsx` (default create-next-app content) has no such heading.

- [ ] **Step 7: Commit test tooling**

```bash
git add package.json package-lock.json vitest.config.mts vitest.setup.ts app/page.test.tsx
git commit -m "test: add Vitest + React Testing Library tooling"
```

---

### Task 2: Nav component

**Files:**
- Create: `app/components/home/Nav.tsx`
- Test: `app/components/home/Nav.test.tsx`

**Interfaces:**
- Produces: `Nav` — default export, no props, renders a `<nav>` with links to SPS, SMHS, Cambridge, and Alumni.

- [ ] **Step 1: Write the failing test**

Create `app/components/home/Nav.test.tsx`:
```tsx
import { expect, test } from 'vitest'
import { render, screen } from '@testing-library/react'
import Nav from './Nav'

test('links to all three schools and the alumni page', () => {
  render(<Nav />)
  expect(screen.getByRole('link', { name: /sps/i })).toHaveAttribute(
    'href',
    'https://sps.seedlingschools.com'
  )
  expect(screen.getByRole('link', { name: /smhs/i })).toHaveAttribute(
    'href',
    'https://smhs.seedlingschools.com'
  )
  expect(screen.getByRole('link', { name: /cambridge/i })).toHaveAttribute(
    'href',
    'https://seedling-international-academy.vercel.app'
  )
  expect(screen.getByRole('link', { name: /alumni/i })).toHaveAttribute(
    'href',
    'https://seedlingschools.com/alumni.php'
  )
})
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npm test -- Nav`
Expected: FAIL with "Cannot find module './Nav'"

- [ ] **Step 3: Write the implementation**

Create `app/components/home/Nav.tsx`:
```tsx
export default function Nav() {
  return (
    <nav className="flex items-center justify-between px-6 py-4 md:px-12">
      <span className="text-lg font-semibold tracking-tight">
        Seedling Group of Schools
      </span>
      <ul className="flex items-center gap-6 text-sm font-medium">
        <li>
          <a
            href="https://sps.seedlingschools.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            SPS
          </a>
        </li>
        <li>
          <a
            href="https://smhs.seedlingschools.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            SMHS
          </a>
        </li>
        <li>
          <a
            href="https://seedling-international-academy.vercel.app"
            target="_blank"
            rel="noopener noreferrer"
          >
            Cambridge
          </a>
        </li>
        <li>
          <a
            href="https://seedlingschools.com/alumni.php"
            target="_blank"
            rel="noopener noreferrer"
          >
            Alumni
          </a>
        </li>
      </ul>
    </nav>
  )
}
```

- [ ] **Step 4: Run test to verify it passes**

Run: `npm test -- Nav`
Expected: PASS

- [ ] **Step 5: Commit**

```bash
git add app/components/home/Nav.tsx app/components/home/Nav.test.tsx
git commit -m "feat: add group homepage Nav component"
```

---

### Task 3: Hero component

**Files:**
- Create: `app/components/home/Hero.tsx`
- Test: `app/components/home/Hero.test.tsx`

**Interfaces:**
- Produces: `Hero` — default export, no props, renders an `<h1>` headline "The Journey From Nursery to University" and three CTA links to the school sites.

- [ ] **Step 1: Write the failing test**

Create `app/components/home/Hero.test.tsx`:
```tsx
import { expect, test } from 'vitest'
import { render, screen } from '@testing-library/react'
import Hero from './Hero'

test('renders the headline and three school CTAs', () => {
  render(<Hero />)
  expect(
    screen.getByRole('heading', { level: 1, name: /the journey from nursery to university/i })
  ).toBeInTheDocument()
  expect(screen.getAllByRole('link')).toHaveLength(3)
})
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npm test -- Hero`
Expected: FAIL with "Cannot find module './Hero'"

- [ ] **Step 3: Write the implementation**

Create `app/components/home/Hero.tsx`:
```tsx
export default function Hero() {
  return (
    <section className="px-6 py-16 text-center md:px-12 md:py-24">
      <h1 className="text-4xl font-bold tracking-tight md:text-6xl">
        The Journey From Nursery to University
      </h1>
      <p className="mx-auto mt-6 max-w-2xl text-lg text-gray-600">
        Seedling Group of Schools takes every child through a single,
        connected path — from SPS, to SMHS, to the Cambridge programme —
        under one educational vision.
      </p>
      <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
        <a
          href="https://sps.seedlingschools.com"
          target="_blank"
          rel="noopener noreferrer"
          className="rounded-full bg-black px-6 py-3 text-sm font-semibold text-white"
        >
          Explore SPS
        </a>
        <a
          href="https://smhs.seedlingschools.com"
          target="_blank"
          rel="noopener noreferrer"
          className="rounded-full border border-black px-6 py-3 text-sm font-semibold"
        >
          Explore SMHS
        </a>
        <a
          href="https://seedling-international-academy.vercel.app"
          target="_blank"
          rel="noopener noreferrer"
          className="rounded-full border border-black px-6 py-3 text-sm font-semibold"
        >
          Explore Cambridge
        </a>
      </div>
    </section>
  )
}
```

- [ ] **Step 4: Run test to verify it passes**

Run: `npm test -- Hero`
Expected: PASS

- [ ] **Step 5: Commit**

```bash
git add app/components/home/Hero.tsx app/components/home/Hero.test.tsx
git commit -m "feat: add group homepage Hero component"
```

---

### Task 4: SchoolsShowcase component

**Files:**
- Create: `app/components/home/SchoolsShowcase.tsx`
- Test: `app/components/home/SchoolsShowcase.test.tsx`
- Uses: `public/logos/sps-logo.png`, `public/logos/smhs-logo.webp`, `public/logos/cambridge-shield.webp` (already present)

**Interfaces:**
- Produces: `SchoolsShowcase` — default export, no props, renders three cards (SPS, SMHS, Cambridge), each with a `next/image` logo, a description, and an outbound link.

- [ ] **Step 1: Write the failing test**

Create `app/components/home/SchoolsShowcase.test.tsx`:
```tsx
import { expect, test } from 'vitest'
import { render, screen } from '@testing-library/react'
import SchoolsShowcase from './SchoolsShowcase'

test('renders a card with logo and link for each school', () => {
  render(<SchoolsShowcase />)
  expect(screen.getByAltText('SPS logo')).toBeInTheDocument()
  expect(screen.getByAltText('SMHS logo')).toBeInTheDocument()
  expect(screen.getByAltText('Cambridge shield logo')).toBeInTheDocument()
  expect(screen.getByRole('link', { name: /visit sps/i })).toHaveAttribute(
    'href',
    'https://sps.seedlingschools.com'
  )
  expect(screen.getByRole('link', { name: /visit smhs/i })).toHaveAttribute(
    'href',
    'https://smhs.seedlingschools.com'
  )
  expect(screen.getByRole('link', { name: /visit cambridge/i })).toHaveAttribute(
    'href',
    'https://seedling-international-academy.vercel.app'
  )
})
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npm test -- SchoolsShowcase`
Expected: FAIL with "Cannot find module './SchoolsShowcase'"

- [ ] **Step 3: Write the implementation**

Create `app/components/home/SchoolsShowcase.tsx`:
```tsx
import Image from 'next/image'

const SCHOOLS = [
  {
    name: 'SPS',
    logoSrc: '/logos/sps-logo.png',
    logoAlt: 'SPS logo',
    description: 'The foundation years — early learning that builds curiosity and confidence.',
    href: 'https://sps.seedlingschools.com',
  },
  {
    name: 'SMHS',
    logoSrc: '/logos/smhs-logo.webp',
    logoAlt: 'SMHS logo',
    description: 'Middle and senior schooling that carries students toward board and career readiness.',
    href: 'https://smhs.seedlingschools.com',
  },
  {
    name: 'Cambridge',
    logoSrc: '/logos/cambridge-shield.webp',
    logoAlt: 'Cambridge shield logo',
    description: 'An internationally benchmarked Cambridge curriculum pathway.',
    href: 'https://seedling-international-academy.vercel.app',
  },
] as const

export default function SchoolsShowcase() {
  return (
    <section className="grid gap-8 px-6 py-16 md:grid-cols-3 md:px-12">
      {SCHOOLS.map((school) => (
        <div
          key={school.name}
          className="flex flex-col items-center rounded-2xl border border-gray-200 p-8 text-center"
        >
          <div className="relative h-16 w-40">
            <Image
              src={school.logoSrc}
              alt={school.logoAlt}
              fill
              className="object-contain"
            />
          </div>
          <p className="mt-6 text-sm text-gray-600">{school.description}</p>
          <a
            href={school.href}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-6 text-sm font-semibold underline"
          >
            Visit {school.name}
          </a>
        </div>
      ))}
    </section>
  )
}
```

- [ ] **Step 4: Run test to verify it passes**

Run: `npm test -- SchoolsShowcase`
Expected: PASS

- [ ] **Step 5: Commit**

```bash
git add app/components/home/SchoolsShowcase.tsx app/components/home/SchoolsShowcase.test.tsx
git commit -m "feat: add group homepage SchoolsShowcase component"
```

---

### Task 5: Leadership component

**Files:**
- Create: `app/components/home/Leadership.tsx`
- Test: `app/components/home/Leadership.test.tsx`

**Interfaces:**
- Produces: `Leadership` — default export, no props, renders Dr. Sandeep Bakshi and Dr. Preeti Bakshi with their confirmed designations only (no fabricated experience copy).

- [ ] **Step 1: Write the failing test**

Create `app/components/home/Leadership.test.tsx`:
```tsx
import { expect, test } from 'vitest'
import { render, screen } from '@testing-library/react'
import Leadership from './Leadership'

test('renders both leaders with their designations', () => {
  render(<Leadership />)
  expect(screen.getByText('Dr. Sandeep Bakshi')).toBeInTheDocument()
  expect(screen.getByText('CEO & Director, Seedling Group of Institutions')).toBeInTheDocument()
  expect(screen.getByText('Dr. Preeti Bakshi')).toBeInTheDocument()
  expect(screen.getByText('Executive Director, Seedling Group of Institutions')).toBeInTheDocument()
})
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npm test -- Leadership`
Expected: FAIL with "Cannot find module './Leadership'"

- [ ] **Step 3: Write the implementation**

Create `app/components/home/Leadership.tsx`:
```tsx
const LEADERS = [
  {
    name: 'Dr. Sandeep Bakshi',
    designation: 'CEO & Director, Seedling Group of Institutions',
  },
  {
    name: 'Dr. Preeti Bakshi',
    designation: 'Executive Director, Seedling Group of Institutions',
  },
] as const

export default function Leadership() {
  return (
    <section className="px-6 py-16 md:px-12">
      <h2 className="text-center text-2xl font-bold tracking-tight md:text-3xl">
        Our Leadership
      </h2>
      <div className="mt-10 grid gap-8 md:grid-cols-2">
        {LEADERS.map((leader) => (
          <div
            key={leader.name}
            className="rounded-2xl border border-gray-200 p-8 text-center"
          >
            <p className="text-lg font-semibold">{leader.name}</p>
            <p className="mt-2 text-sm text-gray-600">{leader.designation}</p>
          </div>
        ))}
      </div>
    </section>
  )
}
```

- [ ] **Step 4: Run test to verify it passes**

Run: `npm test -- Leadership`
Expected: PASS

- [ ] **Step 5: Commit**

```bash
git add app/components/home/Leadership.tsx app/components/home/Leadership.test.tsx
git commit -m "feat: add group homepage Leadership component"
```

---

### Task 6: AlumniSpotlight component

**Files:**
- Create: `app/components/home/AlumniSpotlight.tsx`
- Test: `app/components/home/AlumniSpotlight.test.tsx`

**Interfaces:**
- Produces: `AlumniSpotlight` — default export, no props, renders the three named alumni and a link to the full alumni page.

- [ ] **Step 1: Write the failing test**

Create `app/components/home/AlumniSpotlight.test.tsx`:
```tsx
import { expect, test } from 'vitest'
import { render, screen } from '@testing-library/react'
import AlumniSpotlight from './AlumniSpotlight'

test('renders the three named alumni and a link to the full alumni page', () => {
  render(<AlumniSpotlight />)
  expect(screen.getByText(/harshil mathur/i)).toBeInTheDocument()
  expect(screen.getByText(/abhishek tripathi/i)).toBeInTheDocument()
  expect(screen.getByText(/shashank jain/i)).toBeInTheDocument()
  expect(screen.getByRole('link', { name: /see more alumni/i })).toHaveAttribute(
    'href',
    'https://seedlingschools.com/alumni.php'
  )
})
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npm test -- AlumniSpotlight`
Expected: FAIL with "Cannot find module './AlumniSpotlight'"

- [ ] **Step 3: Write the implementation**

Create `app/components/home/AlumniSpotlight.tsx`:
```tsx
const ALUMNI = [
  { name: 'Harshil Mathur', title: 'CEO, Razorpay' },
  { name: 'Abhishek Tripathi', title: 'Wing Commander' },
  { name: 'Shashank Jain', title: 'Head of Architecture & Design' },
] as const

export default function AlumniSpotlight() {
  return (
    <section className="px-6 py-16 text-center md:px-12">
      <h2 className="text-2xl font-bold tracking-tight md:text-3xl">
        The Pride of Seedling
      </h2>
      <div className="mt-10 grid gap-8 md:grid-cols-3">
        {ALUMNI.map((alum) => (
          <div key={alum.name} className="rounded-2xl border border-gray-200 p-8">
            <p className="text-lg font-semibold">{alum.name}</p>
            <p className="mt-2 text-sm text-gray-600">{alum.title}</p>
          </div>
        ))}
      </div>
      <a
        href="https://seedlingschools.com/alumni.php"
        target="_blank"
        rel="noopener noreferrer"
        className="mt-10 inline-block text-sm font-semibold underline"
      >
        See more alumni
      </a>
    </section>
  )
}
```

- [ ] **Step 4: Run test to verify it passes**

Run: `npm test -- AlumniSpotlight`
Expected: PASS

- [ ] **Step 5: Commit**

```bash
git add app/components/home/AlumniSpotlight.tsx app/components/home/AlumniSpotlight.test.tsx
git commit -m "feat: add group homepage AlumniSpotlight component"
```

---

### Task 7: Footer component

**Files:**
- Create: `app/components/home/Footer.tsx`
- Test: `app/components/home/Footer.test.tsx`

**Interfaces:**
- Produces: `Footer` — default export, no props, renders links to SPS/SMHS/Cambridge/Alumni/About Us and a copyright line.

- [ ] **Step 1: Write the failing test**

Create `app/components/home/Footer.test.tsx`:
```tsx
import { expect, test } from 'vitest'
import { render, screen } from '@testing-library/react'
import Footer from './Footer'

test('renders links to each property and a copyright line', () => {
  render(<Footer />)
  expect(screen.getByRole('link', { name: /^sps$/i })).toHaveAttribute(
    'href',
    'https://sps.seedlingschools.com'
  )
  expect(screen.getByRole('link', { name: /^smhs$/i })).toHaveAttribute(
    'href',
    'https://smhs.seedlingschools.com'
  )
  expect(screen.getByRole('link', { name: /cambridge/i })).toHaveAttribute(
    'href',
    'https://seedling-international-academy.vercel.app'
  )
  expect(screen.getByRole('link', { name: /alumni/i })).toHaveAttribute(
    'href',
    'https://seedlingschools.com/alumni.php'
  )
  expect(screen.getByRole('link', { name: /about us/i })).toHaveAttribute(
    'href',
    'https://seedlingschools.com/about-us.php'
  )
  expect(screen.getByText(/seedling group of schools/i)).toBeInTheDocument()
})
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npm test -- Footer`
Expected: FAIL with "Cannot find module './Footer'"

- [ ] **Step 3: Write the implementation**

Create `app/components/home/Footer.tsx`:
```tsx
export default function Footer() {
  return (
    <footer className="border-t border-gray-200 px-6 py-10 md:px-12">
      <ul className="flex flex-wrap justify-center gap-6 text-sm font-medium">
        <li>
          <a
            href="https://sps.seedlingschools.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            SPS
          </a>
        </li>
        <li>
          <a
            href="https://smhs.seedlingschools.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            SMHS
          </a>
        </li>
        <li>
          <a
            href="https://seedling-international-academy.vercel.app"
            target="_blank"
            rel="noopener noreferrer"
          >
            Cambridge
          </a>
        </li>
        <li>
          <a
            href="https://seedlingschools.com/alumni.php"
            target="_blank"
            rel="noopener noreferrer"
          >
            Alumni
          </a>
        </li>
        <li>
          <a
            href="https://seedlingschools.com/about-us.php"
            target="_blank"
            rel="noopener noreferrer"
          >
            About Us
          </a>
        </li>
      </ul>
      <p className="mt-6 text-center text-xs text-gray-500">
        &copy; {new Date().getFullYear()} Seedling Group of Schools. All rights reserved.
      </p>
    </footer>
  )
}
```

- [ ] **Step 4: Run test to verify it passes**

Run: `npm test -- Footer`
Expected: PASS

- [ ] **Step 5: Commit**

```bash
git add app/components/home/Footer.tsx app/components/home/Footer.test.tsx
git commit -m "feat: add group homepage Footer component"
```

---

### Task 8: Compose the homepage

**Files:**
- Modify: `app/page.tsx`
- Modify: `app/page.test.tsx` (from Task 1 — already asserts the headline; extend it)

**Interfaces:**
- Consumes: `Nav`, `Hero`, `SchoolsShowcase`, `Leadership`, `AlumniSpotlight`, `Footer` (all default exports from Task 2–7).
- Produces: `Page` — default export from `app/page.tsx`, the composed homepage.

- [ ] **Step 1: Extend the page test to check full composition**

Modify `app/page.test.tsx` to:
```tsx
import { expect, test } from 'vitest'
import { render, screen } from '@testing-library/react'
import Page from './page'

test('renders the group homepage headline', () => {
  render(<Page />)
  expect(
    screen.getByRole('heading', { level: 1, name: /the journey from nursery to university/i })
  ).toBeInTheDocument()
})

test('renders all homepage sections', () => {
  render(<Page />)
  expect(screen.getByRole('navigation')).toBeInTheDocument()
  expect(screen.getByRole('heading', { name: /our leadership/i })).toBeInTheDocument()
  expect(screen.getByRole('heading', { name: /the pride of seedling/i })).toBeInTheDocument()
  expect(screen.getByRole('contentinfo')).toBeInTheDocument()
})
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npm test -- page.test`
Expected: FAIL — current `app/page.tsx` is still the create-next-app scaffold, has none of these sections.

- [ ] **Step 3: Rewrite app/page.tsx to compose the sections**

Modify `app/page.tsx`, replacing its full contents with:
```tsx
import Nav from './components/home/Nav'
import Hero from './components/home/Hero'
import SchoolsShowcase from './components/home/SchoolsShowcase'
import Leadership from './components/home/Leadership'
import AlumniSpotlight from './components/home/AlumniSpotlight'
import Footer from './components/home/Footer'

export default function Page() {
  return (
    <main>
      <Nav />
      <Hero />
      <SchoolsShowcase />
      <Leadership />
      <AlumniSpotlight />
      <Footer />
    </main>
  )
}
```

- [ ] **Step 4: Run test to verify it passes**

Run: `npm test -- page.test`
Expected: PASS

- [ ] **Step 5: Run the full test suite**

Run: `npm test`
Expected: All tests PASS (Nav, Hero, SchoolsShowcase, Leadership, AlumniSpotlight, Footer, page).

- [ ] **Step 6: Commit**

```bash
git add app/page.tsx app/page.test.tsx
git commit -m "feat: compose group homepage from section components"
```

---

### Task 9: Configure allowed remote image host and verify production build

**Files:**
- Modify: `next.config.ts`

**Interfaces:**
- Produces: no new exports — this task only ensures `next build` succeeds since `SchoolsShowcase` uses local images from `public/logos/` (no remote host config is actually required for local images, but this task verifies the build end-to-end).

- [ ] **Step 1: Run production build**

Run: `npm run build`
Expected: Build succeeds with no errors. If it fails on image handling, inspect the error — since all three logos are local files under `public/logos/`, no `remotePatterns` config should be needed; fix any reported issue (e.g. missing `width`/`height` — already provided via the `fill` prop and parent `relative` sizing in `SchoolsShowcase.tsx`).

- [ ] **Step 2: Run the dev server and manually verify in a browser**

Run: `npm run dev`, open `http://localhost:3000`, and confirm:
- Headline "The Journey From Nursery to University" is visible.
- All three school logos render (SPS, SMHS, Cambridge shield).
- Clicking each school link (Nav, SchoolsShowcase, Footer) opens the correct external site in a new tab.
- Leadership section shows both names with their designations.
- Alumni section shows all three names and the "See more alumni" link.

- [ ] **Step 3: Commit only if next.config.ts changed**

If Step 1 required a `next.config.ts` change:
```bash
git add next.config.ts
git commit -m "fix: configure image handling for group homepage build"
```
If no change was needed, skip this commit — there is nothing to commit.

---

## Post-plan follow-ups (not in this plan's scope)

- Group-level About Us, Alumni, Admissions, Academics pages — separate specs/plans.
- Leadership photos — omitted for v1 per spec; add later if the user supplies images.
- Revisit Dr. Preeti Bakshi's designation if the user later confirms updated Principal titles for SPS/SMHS.

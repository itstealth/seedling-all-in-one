# Seedling Group of Schools — Group Portal Homepage

## Purpose

`seedling_all_in_one` becomes the umbrella "group portal" for Seedling Group of
Schools, in the spirit of gla.ac.in for GLA University. It tells the group-level
story ("The Journey From Nursery to University") and links out to the three
existing/independent properties:

- **SPS** — sps.seedlingsschools.com
- **SMHS** — smhs.seedlingsschools.com
- **Cambridge** (Seedling International Academy) — seedling-international-academy.vercel.app

The individual school sites are NOT being replaced or rebuilt — this is a new,
separate parent site that sits above them and drives traffic to each.

## Scope (v1)

Homepage only (`app/page.tsx`). No About, Alumni, Admissions, or Academics pages
in this round — those are deferred to later specs. The homepage links out to
`seedlingschools.com/alumni.php` and `seedlingschools.com/about-us.php` for
deeper content rather than reproducing it.

## Architecture

- Route: `app/page.tsx`, composed of section components under
  `app/components/home/`: `Nav`, `Hero`, `SchoolsShowcase`, `Leadership`,
  `AlumniSpotlight`, `Footer`.
- Each component is presentational, static content for v1 — no CMS or data
  fetching layer.
- Assets: `public/logos/` (SPS, SMHS, Cambridge shield logos, sourced from
  their respective live sites) and `public/leadership/` (photos, if available;
  omit gracefully if not).
- Styling: Tailwind 4 (already present in the scaffold). Visual language takes
  cues from gla.ac.in's "university group" homepage pattern — bold hero,
  card grid for the constituent institutions, clean informational footer —
  adapted for a K-12 group rather than a university.

## Section content

### Nav
Seedling Group wordmark. Links: SPS, SMHS, Cambridge (external, `target=_blank`),
Alumni (→ `seedlingschools.com/alumni.php`).

### Hero
Headline: "The Journey From Nursery to University". Supporting line describing
the three-institution continuum (SPS → SMHS → Cambridge). CTA buttons linking
out to the three school sites.

### SchoolsShowcase
Three cards — one per institution (SPS, SMHS, Cambridge) — each with its logo,
a one-line description, and an outbound link to that school's site.

### Leadership
- **Dr. Sandeep Bakshi** — CEO & Director, Seedling Group of Institutions
- **Dr. Preeti Bakshi** — Executive Director, Seedling Group of Institutions

Designations match what is currently live on seedlingschools.com/about-us.php.
No experience/background copy is included since none exists on the source
page — avoid fabricating biographical detail.

### AlumniSpotlight
"The Pride of Seedling" — three named alumni pulled from
seedlingschools.com/alumni.php:
- Harshil Mathur — CEO, Razorpay
- Abhishek Tripathi — Wing Commander
- Shashank Jain — Head of Architecture & Design

"See more alumni" link → `seedlingschools.com/alumni.php`.

### Footer
Links to SPS / SMHS / Cambridge / Alumni / About Us (external, to
seedlingschools.com). Contact/social placeholders. Copyright line.

## Out of scope / deferred

- Group-level About Us, Alumni, Admissions, Academics pages (separate specs).
- CMS or dynamic content — all copy is static for v1.
- Downloading/optimizing actual logo image files is an implementation-time
  task (fetch from the three source sites, or request assets from the user if
  they aren't cleanly fetchable).
- Leadership photos — include only if available from the source site;
  otherwise the section ships text-only.

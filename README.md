<div align="center">

<img src="public/logo.png" alt="VEDIK Logo" width="100" />

# VEDIK School Management ERP

**The complete solution for modern school management.**

### &rarr; [Launch the live demo](https://vedik-demo.netlify.app) &larr;

No signup. No password. Pick a persona and explore all 18 modules with realistic data.

[![Netlify](https://img.shields.io/badge/Deployed%20on-Netlify-00C7B7?style=flat-square&logo=netlify&logoColor=white)](https://vedik-demo.netlify.app)
[![Next.js](https://img.shields.io/badge/Next.js-16-black?style=flat-square&logo=next.js&logoColor=white)](https://nextjs.org)
[![License](https://img.shields.io/badge/Licence-Proprietary-blue?style=flat-square)](#pricing-plans)

[Features](#features) · [Modules](#modules) · [Pricing](#pricing-plans) · [Getting Started](#getting-started)

</div>

---

## What is VEDIK?

VEDIK School ERP is a powerful, all-in-one management system designed to streamline every aspect of school administration — from student admissions to fee collection, teacher management to academic reporting.

Everything you need to run your school efficiently, in one place.

---

## Features

- **30+ Fully Functional Pages** — Every module built with realistic data and complete workflows
- **Beautiful Glassmorphism Design** — Modern, clean interface that's a pleasure to use
- **Dark & Light Mode** — Switch themes instantly to match your preference
- **Print-Ready Documents** — Fee receipts, payslips, certificates, and ID cards with your school branding
- **Works Everywhere** — Responsive design that looks great on desktop, tablet, and mobile
- **Role-Based Access** — Different views for administrators, teachers, and staff

---

## Modules

### Student & Academics
| Module | What It Does |
|--------|--------------|
| Dashboard | At-a-glance overview with charts, stats, and quick actions |
| Students | Admissions, profiles, promotions, ID cards, and search |
| Teachers | Profiles, subject assignments, and salary management |
| Attendance | Daily tracking, class-wise reports, and export |
| Academics | Classes, sections, subjects, and timetable |
| Exams | Schedule creation and status tracking |
| Marks | Student-wise marks, grade distribution, and analytics |
| Homework | Assignment creation, submission tracking, and grading |

### Finance & Operations
| Module | What It Does |
|--------|--------------|
| Fees | Collection, receipt generation, pending tracking, and overdue alerts |
| Finance | Income, expenses, profit/loss tracking with charts |
| Payroll | Salary slips, allowances, deductions, and print/download |
| Library | Book inventory, availability tracking, and issue/return |
| Transport | Fleet management, route tracking, and capacity |
| Hostel | Room management, occupancy tracking, and warden info |
| Inventory | Stock management, low-stock alerts, and restocking |

### Communication & Reports
| Module | What It Does |
|--------|--------------|
| Communication | Announcements, circulars, and priority messaging |
| Certificates | 9 types: Bonafide, Study, Character, Transfer, and more |
| Reports | Student, attendance, fee, financial, and exam reports with export |
| Staff | Non-teaching staff management |
| Leave | Staff leave requests and approval workflow |
| Settings | School profile, theme customization, and notifications |

---

## Why Schools Love VEDIK

| Benefit | Description |
|---------|-------------|
| **Save Time** | Automate routine tasks like attendance, fee collection, and report generation |
| **Reduce Errors** | Eliminate manual data entry with smart forms and validation |
| **Stay Organized** | Centralized dashboard gives you complete visibility |
| **Look Professional** | Beautiful receipts, certificates, and ID cards with your school branding |
| **Make Better Decisions** | Real-time charts and analytics for data-driven management |
| **Work From Anywhere** | Access your school data from any device |

---

## Pricing Plans

VEDIK offers flexible plans to fit schools of all sizes.

| Plan | Students | What's Included |
|------|----------|-----------------|
| **Trial** | 50 | 8 core modules — free for 14 days |
| **Lite** | 200 | 11 modules |
| **Essential** | 1,000 | 13 modules |
| **Pro** | 5,000 | 18 modules |
| **Enterprise** | Unlimited | All 18 modules |

---

## Getting Started

> **Production URL** — <https://vedik-demo.netlify.app>
>
> `src/lib/site.ts` falls back to that host when `NEXT_PUBLIC_SITE_URL` is
> absent, so the deployed canonical URLs, `sitemap.xml` and `robots.txt` are
> correct out of the box. Set `NEXT_PUBLIC_SITE_URL` in Netlify
> (Site settings → Environment variables) only when deploying to a preview or
> custom domain. Never leave it pointing at `localhost` in production: every
> absolute URL the site emits is built from it.

### Option 1: Quick Launch (Windows)

1. Double-click `START.bat`
2. Open your browser to `http://localhost:3000`
3. That's it — you're ready to explore!

### Option 2: Manual Setup

```bash
git clone https://github.com/your-username/school-erp-demo.git
cd school-erp-demo
npm install
npm run dev
```

Then open `http://localhost:3000` in your browser.

---

## Deployment

The app is a **fully static export** (`output: "export"` in `next.config.ts`),
so it builds to an `out/` directory of plain HTML, CSS and JS with no server
runtime. It currently deploys to **Netlify** via `netlify.toml`, and the same
`out/` folder can be hosted on Vercel, GitHub Pages, S3 or any static host.

```bash
npm run build   # emits out/
```

Notes for a static host:

- `trailingSlash: true`, so routes are real files: `out/classes/index.html`.
  No rewrite rules are needed.
- `images.unoptimized` is on because the default image optimiser needs a
  server. Ship pre-sized images in `public/` instead.
- Metadata route handlers (`sitemap.xml`, `robots.txt`,
  `manifest.webmanifest`, `icon.svg`, `apple-icon.png`) are generated at build
  time into `out/`. The social card is a static `public/og-image.png`.
- Every route handler needs `export const dynamic = "force-static"` — without
  it the build fails under `output: "export"`.
- Do **not** add `@netlify/plugin-nextjs`. It runs the Next.js serverless
  runtime, which a static export does not use.

---

## What's Inside

> All data comes pre-loaded with realistic information — 15 students, 8 teachers, 5 classes, 15 subjects, and much more — so you can see exactly how VEDIK works for your school.

### Project structure

```
src/
├── app/
│   ├── page.tsx              Marketing landing page (server, with JSON-LD)
│   ├── layout.tsx            Root layout: fonts + site-wide metadata
│   ├── sitemap.ts robots.ts manifest.ts
│   ├── icon.svg apple-icon.png
│   ├── not-found.tsx error.tsx global-error.tsx
│   ├── (auth)/login/         Persona picker
│   └── (dashboard)/<module>/ page.tsx       <- server shell: metadata + JSON-LD
│                                page-client.tsx  <- the interactive UI
├── components/
│   ├── charts/               Shared Recharts primitives (lazily loaded)
│   ├── landing/              Marketing landing page
│   ├── seo/                  JSON-LD + module explainer (server)
│   ├── layout/               Sidebar, topnav
│   └── ui/                   Button, card, table, modal, tabs, toast, ...
└── lib/
    ├── site.ts               Brand, routes, pricing, metadata builders
    ├── og-image.tsx          Social card renderer
    ├── auth.ts               Demo personas and localStorage persona state
    └── mock-data/            All demo data
```

`page.tsx` is a thin **server** component and `page-client.tsx` holds the
interactive UI. That split is what allows each route to export its own
`metadata` and JSON-LD — a `"use client"` module is not allowed to export
`metadata`.

### SEO

- Per-route `<title>`, meta description, canonical, Open Graph and Twitter tags
- `sitemap.xml` covering all 29 indexable routes with tiered priorities
- `robots.txt`, `manifest.webmanifest`, and a 1200×630 social card at
  `public/og-image.png` (regenerate with `python scripts/generate-og-image.py`)
- JSON-LD: `Organization`, `WebSite`, `SoftwareApplication`, `FAQPage`,
  `BreadcrumbList` on every route, and `Product` with `Offer` pricing on
  `/license`
- All page content is server-rendered, so it is present in the static HTML


---

## Supported Browsers

Chrome | Firefox | Safari | Edge

---

## Contact

Interested in the full VEDIK School ERP system for your institution?

**Reach out to our team** for a personalized demo and pricing details.

---

<div align="center">

**VEDIK School Management ERP** | v2.5 | 2026

*Empowering schools with smart management*

</div>

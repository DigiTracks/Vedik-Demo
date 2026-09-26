import type { ReactNode } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  ArrowRight,
  CheckCircle,
  Sparkles,
  ShieldCheck,
  GraduationCap,
  Users,
  IndianRupee,
  Printer,
  FileSpreadsheet,
  Clock,
} from "lucide-react";
import { SITE, MODULES, PLANS, formatINR } from "@/lib/site";
import { LOGO_PATH } from "@/lib/utils";

const GROUP_LABELS: Record<string, string> = {
  Academics: "Academics & Assessment",
  People: "People & Communication",
  Finance: "Finance & Fees",
  Operations: "Operations & Facilities",
};

const GROUP_ICONS: Record<string, ReactNode> = {
  Academics: <GraduationCap className="h-5 w-5" />,
  People: <Users className="h-5 w-5" />,
  Finance: <IndianRupee className="h-5 w-5" />,
  Operations: <ShieldCheck className="h-5 w-5" />,
};

const GROUP_STYLES: Record<string, string> = {
  Academics: "bg-blue-600",
  People: "bg-emerald-600",
  Finance: "bg-purple-600",
  Operations: "bg-amber-500",
};

const PAIN_POINTS = [
  {
    icon: <FileSpreadsheet className="h-5 w-5" />,
    title: "The attendance register",
    body: "A paper register cannot tell a principal which section has dropped below 75% attendance this month, or which student has been absent three weeks running. VEDIK replaces it with a daily grid and live class-wise percentages.",
  },
  {
    icon: <IndianRupee className="h-5 w-5" />,
    title: "The fee collection table",
    body: "Chasing tuition fees means a spreadsheet, a receipt book and a bank deposit slip that only match at month end. VEDIK tracks paid, partial, pending and overdue per student and prints a branded receipt on the spot.",
  },
  {
    icon: <Clock className="h-5 w-5" />,
    title: "The payroll guesswork",
    body: "Reconstructing last month's salary from memory is how mistakes happen. VEDIK keeps basic pay, allowances and deductions per employee per month, and generates the payslip for you.",
  },
  {
    icon: <Users className="h-5 w-5" />,
    title: "The parent WhatsApp group",
    body: "Circulars get lost, and nobody can prove what was announced. VEDIK records announcements, notices and circulars with an audience and a priority, so the record actually exists.",
  },
];

const ROLES = [
  {
    name: "Principal",
    tone: "blue",
    points: [
      "Whole-school KPIs with trend charts",
      "Fee collection and dues at a glance",
      "Staff, teacher and student directories",
      "Exports for inspections and board reporting",
    ],
  },
  {
    name: "Teacher",
    tone: "emerald",
    points: [
      "Only your classes, sections and subjects",
      "Mark attendance for your period",
      "Assign homework and grade submissions",
      "Enter marks against your own subjects",
    ],
  },
  {
    name: "Student",
    tone: "purple",
    points: [
      "Weekly timetable and homework",
      "Marks and grades per subject",
      "Fee status and receipts",
      "Announcements targeted at you",
    ],
  },
];

const TONE_RING: Record<string, string> = {
  blue: "border-blue-200 bg-blue-50",
  emerald: "border-emerald-200 bg-emerald-50",
  purple: "border-purple-200 bg-purple-50",
};

const TONE_TEXT: Record<string, string> = {
  blue: "text-blue-700",
  emerald: "text-emerald-700",
  purple: "text-purple-700",
};

const FAQS = [
  {
    q: "Is the VEDIK demo free and do I need an account?",
    a: "Yes. The demo is completely free and requires no signup, no password and no email address. Open the live demo, pick one of three personas — principal, teacher or student — and every module is immediately interactive with realistic sample data.",
  },
  {
    q: "What modules does VEDIK School ERP cover?",
    a: "VEDIK groups 18 modules into four areas. Academics and assessment covers dashboard, classes, sections, subjects, timetable, exams, marks and homework. People covers students, teachers, staff, communication, leave, users and roles. Finance covers fees, income and expenses, and payroll. Operations covers library, transport, hostel and inventory.",
  },
  {
    q: "How much does VEDIK cost?",
    a: "Plans are priced in Indian rupees and start with a free 14-day trial covering 8 modules and 50 students. Lite is ₹4,999 per year, Essential is ₹12,999, Pro is ₹24,999, and Enterprise is ₹49,999 with unlimited students. Half-yearly and lifetime pricing is also available, and every plan can be upgraded as the school grows.",
  },
  {
    q: "Can different staff see different parts of the system?",
    a: "Yes. Access is role-based. A principal sees the whole school, a teacher is scoped to their own classes and subjects, and a student sees only their timetable, marks, fees and announcements. Navigation and data are both filtered, so a teacher cannot reach the payroll module at all.",
  },
  {
    q: "Does VEDIK generate receipts, payslips and certificates?",
    a: "Yes, and it carries your school branding. Fee receipts, staff payslips, student ID cards and nine certificate types are generated with a live preview and then printed or downloaded. The school name and logo configured in Settings flow through to every one of them.",
  },
  {
    q: "Is VEDIK built for Indian schools specifically?",
    a: "Yes. Currency is INR throughout, phone numbers, PIN codes and dates are validated against Indian formats, and the academic year model, class structure and fee terms follow Indian school conventions rather than a generic Western template.",
  },
  {
    q: "Can I try a role before deciding?",
    a: "The demo lets you switch between the principal, teacher and student personas at any time from the top navigation, so you can evaluate every role's view without a sales call.",
  },
  {
    q: "How do I get started with the full product?",
    a: "Start with the free 14-day trial to cover eight modules and 50 students. When you are ready to go live, contact the VEDIK team for a personalised walkthrough and a quote sized to your school.",
  },
];

export function LandingPage() {
  const groups = Object.keys(GROUP_LABELS);

  return (
    <div className="min-h-screen bg-white text-slate-900">
      {/* ================= HEADER ================= */}
      <header className="sticky top-0 z-40 border-b border-slate-200 bg-white/90 backdrop-blur">
        <div className="mx-auto flex h-16 max-w-6xl items-center gap-3 px-4 sm:px-6">
          <Image
            src={LOGO_PATH}
            alt="VEDIK School ERP"
            width={32}
            height={32}
            className="h-8 w-8"
            priority
          />
          <span className="text-base font-black tracking-wide text-slate-900">
            VEDIK <span className="font-semibold text-blue-600">ERP</span>
          </span>
          <nav
            aria-label="Primary"
            className="ml-auto hidden items-center gap-7 text-sm font-medium text-slate-600 md:flex"
          >
            <a href="#modules" className="hover:text-blue-600">
              Modules
            </a>
            <a href="#roles" className="hover:text-blue-600">
              Role views
            </a>
            <a href="#pricing" className="hover:text-blue-600">
              Pricing
            </a>
            <a href="#faq" className="hover:text-blue-600">
              FAQ
            </a>
            <Link
              href="/license"
              className="hover:text-blue-600"
            >
              Plans
            </Link>
          </nav>
          <Link
            href="/login"
            className="ml-auto inline-flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-blue-700 md:ml-0"
          >
            Launch demo
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </header>

      {/* ================= HERO ================= */}
      <section className="bg-gradient-to-b from-slate-50 to-white">
        <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-24">
          <div className="grid items-center gap-12 lg:grid-cols-2">
            <div>
              <p className="inline-flex items-center gap-2 rounded-full border border-blue-200 bg-blue-50 px-3 py-1 text-xs font-semibold text-blue-700">
                <Sparkles className="h-3.5 w-3.5" />
                No signup required &middot; {MODULES.length} modules live
              </p>
              <h1 className="mt-5 text-4xl font-extrabold leading-tight tracking-tight text-slate-900 sm:text-5xl">
                Run your entire school
                <span className="block text-blue-600">
                  from a single dashboard
                </span>
              </h1>
              <p className="mt-5 text-lg leading-relaxed text-slate-600">
                VEDIK School ERP brings attendance, examinations, fees, payroll,
                library, transport and hostel management into one system. Built
                for Indian schools, priced in rupees, and ready to explore right
                now with realistic sample data.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <Link
                  href="/login"
                  className="inline-flex items-center gap-2 rounded-xl bg-blue-600 px-6 py-3.5 text-base font-semibold text-white shadow-lg shadow-blue-500/25 transition-all hover:bg-blue-700"
                >
                  Launch the live demo
                  <ArrowRight className="h-5 w-5" />
                </Link>
                <Link
                  href="/license"
                  className="inline-flex items-center gap-2 rounded-xl border border-slate-300 bg-white px-6 py-3.5 text-base font-semibold text-slate-700 transition-colors hover:border-slate-400 hover:bg-slate-50"
                >
                  See pricing
                </Link>
              </div>
              <p className="mt-4 text-sm text-slate-500">
                Free, no account, no credit card. Pick a persona and start
                clicking.
              </p>
            </div>

            {/* Stat card */}
            <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-xl shadow-slate-200/60">
              <div className="grid grid-cols-2 gap-4">
                {[
                  { value: String(MODULES.length), label: "Modules" },
                  { value: "18", label: "Core modules in Pro" },
                  { value: "3", label: "Role-based views" },
                  { value: "9", label: "Certificate types" },
                  { value: "INR", label: "Pricing & currency" },
                  { value: "0", label: "Signup required" },
                ].map((stat) => (
                  <div
                    key={stat.label}
                    className="rounded-xl bg-slate-50 p-4 text-center"
                  >
                    <p className="text-2xl font-extrabold text-slate-900">
                      {stat.value}
                    </p>
                    <p className="mt-1 text-xs font-medium text-slate-500">
                      {stat.label}
                    </p>
                  </div>
                ))}
              </div>
              <div className="mt-6 rounded-xl border border-blue-100 bg-blue-50 p-4">
                <p className="text-sm text-blue-900">
                  <strong>Try it as three different people.</strong> Switch
                  between the principal, teacher and student persona at any time
                  to see exactly what each role is allowed to reach.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ================= PAIN POINTS ================= */}
      <section className="border-y border-slate-200 bg-slate-50 py-16">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <h2 className="text-3xl font-bold tracking-tight text-slate-900">
            Replace the spreadsheets and registers
          </h2>
          <p className="mt-3 max-w-3xl text-lg text-slate-600">
            Most schools still run on a paper attendance register, a fee
            collection spreadsheet, a reconstructed payroll and a WhatsApp group.
            Here is what each of those turns into with VEDIK.
          </p>
          <div className="mt-10 grid gap-6 sm:grid-cols-2">
            {PAIN_POINTS.map((point) => (
              <div
                key={point.title}
                className="rounded-2xl border border-slate-200 bg-white p-6"
              >
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
                  {point.icon}
                </div>
                <h3 className="mt-4 text-lg font-bold text-slate-900">
                  {point.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-600">
                  {point.body}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ================= MODULES ================= */}
      <section id="modules" className="scroll-mt-20 py-16">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <h2 className="text-3xl font-bold tracking-tight text-slate-900">
            Every module, all connected
          </h2>
          <p className="mt-3 max-w-3xl text-lg text-slate-600">
            {MODULES.length} screens across four areas of school operations.
            Every one is live in the demo with realistic data &mdash; click
            through to any of them.
          </p>
          <div className="mt-10 grid gap-8 lg:grid-cols-2">
            {groups.map((group) => (
              <div key={group}>
                <div className="flex items-center gap-2">
                  <span
                    className={`flex h-8 w-8 items-center justify-center rounded-lg text-white ${GROUP_STYLES[group]}`}
                  >
                    {GROUP_ICONS[group]}
                  </span>
                  <h3 className="text-lg font-bold text-slate-900">
                    {GROUP_LABELS[group]}
                  </h3>
                </div>
                <ul className="mt-4 grid gap-2 sm:grid-cols-2">
                  {MODULES.filter((m) => m.group === group).map((module) => (
                    <li key={module.path}>
                      <Link
                        href={module.path}
                        className="group flex h-full flex-col rounded-xl border border-slate-200 bg-white p-3 transition-all hover:border-blue-300 hover:shadow-md"
                      >
                        <span className="flex items-center gap-1.5 text-sm font-semibold text-slate-900 group-hover:text-blue-600">
                          {module.name}
                          <ArrowRight className="h-3.5 w-3.5 opacity-0 transition-opacity group-hover:opacity-100" />
                        </span>
                        <span className="mt-1 text-xs leading-snug text-slate-500">
                          {module.summary}
                        </span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ================= ROLES ================= */}
      <section id="roles" className="scroll-mt-20 border-y border-slate-200 bg-slate-50 py-16">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <h2 className="text-3xl font-bold tracking-tight text-slate-900">
            One system, three points of view
          </h2>
          <p className="mt-3 max-w-3xl text-lg text-slate-600">
            Navigation and data are both scoped by role, so nobody sees a screen
            that is not theirs. Switch persona in the demo to compare them.
          </p>
          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {ROLES.map((role) => (
              <div
                key={role.name}
                className={`rounded-2xl border p-6 ${TONE_RING[role.tone]}`}
              >
                <h3 className={`text-xl font-bold ${TONE_TEXT[role.tone]}`}>
                  {role.name}
                </h3>
                <ul className="mt-4 space-y-2.5">
                  {role.points.map((point) => (
                    <li key={point} className="flex items-start gap-2 text-sm text-slate-700">
                      <CheckCircle className="mt-0.5 h-4 w-4 shrink-0 text-emerald-600" />
                      {point}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ================= PRICING ================= */}
      <section id="pricing" className="scroll-mt-20 py-16">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <h2 className="text-3xl font-bold tracking-tight text-slate-900">
            Pricing in Indian rupees
          </h2>
          <p className="mt-3 max-w-3xl text-lg text-slate-600">
            Start free for 14 days. Upgrade as your school grows &mdash; every
            plan adds modules and student capacity, and all plans can be
            converted between billing periods.
          </p>
          <div className="mt-10 overflow-x-auto">
            <table className="w-full min-w-[640px] border-collapse text-sm">
              <caption className="sr-only">
                VEDIK School ERP plan pricing, module coverage and student
                limits
              </caption>
              <thead>
                <tr className="border-b-2 border-slate-300">
                  <th scope="col" className="px-4 py-3 text-left font-semibold text-slate-900">
                    Plan
                  </th>
                  <th scope="col" className="px-4 py-3 text-left font-semibold text-slate-900">
                    Yearly
                  </th>
                  <th scope="col" className="px-4 py-3 text-left font-semibold text-slate-900">
                    Half-yearly
                  </th>
                  <th scope="col" className="px-4 py-3 text-left font-semibold text-slate-900">
                    Lifetime
                  </th>
                  <th scope="col" className="px-4 py-3 text-left font-semibold text-slate-900">
                    Modules
                  </th>
                  <th scope="col" className="px-4 py-3 text-left font-semibold text-slate-900">
                    Students
                  </th>
                </tr>
              </thead>
              <tbody>
                {PLANS.map((plan) => (
                  <tr
                    key={plan.name}
                    className={`border-b border-slate-200 ${
                      plan.popular ? "bg-purple-50/60" : ""
                    }`}
                  >
                    <th scope="row" className="px-4 py-3 text-left font-semibold text-slate-900">
                      {plan.name}
                      {plan.popular && (
                        <span className="ml-2 rounded-full bg-purple-600 px-2 py-0.5 text-[10px] font-bold text-white">
                          POPULAR
                        </span>
                      )}
                      <span className="mt-0.5 block text-xs font-normal text-slate-500">
                        {plan.tagline}
                      </span>
                    </th>
                    <td className="px-4 py-3 font-bold text-slate-900">
                      {plan.prices.yearly === null
                        ? "—"
                        : plan.prices.yearly === 0
                          ? "Free"
                          : formatINR(plan.prices.yearly)}
                    </td>
                    <td className="px-4 py-3 text-slate-700">
                      {plan.prices.halfYearly === null
                        ? "—"
                        : plan.prices.halfYearly === 0
                          ? "Free (14d)"
                          : formatINR(plan.prices.halfYearly)}
                    </td>
                    <td className="px-4 py-3 text-slate-700">
                      {plan.prices.lifetime === null
                        ? "—"
                        : formatINR(plan.prices.lifetime)}
                    </td>
                    <td className="px-4 py-3 text-slate-700">{plan.modules}</td>
                    <td className="px-4 py-3 text-slate-700">
                      {plan.students === null ? "Unlimited" : plan.students.toLocaleString("en-IN")}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="mt-4 text-sm text-slate-500">
            Prices exclude GST. Need a custom quote, a multi-school licence or
            on-site setup?{" "}
            <Link href="/license" className="font-semibold text-blue-600 hover:underline">
              Contact the VEDIK team
            </Link>
            .
          </p>
        </div>
      </section>

      {/* ================= DOCUMENTS ================= */}
      <section className="border-y border-slate-200 bg-slate-50 py-16">
        <div className="mx-auto grid max-w-6xl items-center gap-10 px-4 sm:px-6 lg:grid-cols-2">
          <div>
            <h2 className="text-3xl font-bold tracking-tight text-slate-900">
              Documents that carry your branding
            </h2>
            <p className="mt-3 text-lg text-slate-600">
              The school name and logo you set in Settings flow automatically
              into every generated document, so nothing has to be retyped before
              a parent walks in.
            </p>
            <ul className="mt-6 grid gap-3 sm:grid-cols-2">
              {[
                "Fee receipts",
                "Staff payslips",
                "Student ID cards",
                "9 certificate types",
                "Exam report cards",
                "CSV & Excel exports",
              ].map((item) => (
                <li
                  key={item}
                  className="flex items-center gap-2 rounded-lg border border-slate-200 bg-white px-4 py-2.5 text-sm font-medium text-slate-700"
                >
                  <Printer className="h-4 w-4 text-blue-600" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-lg">
            <div className="flex items-center gap-3 border-b border-dashed border-slate-300 pb-4">
              <Image
                src={LOGO_PATH}
                alt="VEDIK School"
                width={40}
                height={40}
                className="h-10 w-10"
              />
              <div>
                <p className="font-bold text-slate-900">VEDIK School</p>
                <p className="text-xs text-slate-500">
                  123 Education Lane, Knowledge City
                </p>
              </div>
              <span className="ml-auto rounded bg-emerald-100 px-2 py-1 text-[10px] font-bold text-emerald-700">
                PAID
              </span>
            </div>
            <dl className="mt-4 space-y-2 text-sm">
              {[
                ["Receipt No", "RCP2607150042"],
                ["Student", "Aarav Patel (S001)"],
                ["Class", "Class 10 - A"],
                ["Fee type", "Tuition Fee"],
                ["Amount paid", "₹45,000"],
              ].map(([label, value]) => (
                <div key={label} className="flex justify-between">
                  <dt className="text-slate-500">{label}</dt>
                  <dd className="font-semibold text-slate-900">{value}</dd>
                </div>
              ))}
            </dl>
            <p className="mt-4 border-t border-dashed border-slate-300 pt-3 text-center text-[11px] text-slate-400">
              Sample fee receipt generated by VEDIK School ERP
            </p>
          </div>
        </div>
      </section>

      {/* ================= FAQ ================= */}
      <section id="faq" className="scroll-mt-20 py-16">
        <div className="mx-auto max-w-3xl px-4 sm:px-6">
          <h2 className="text-3xl font-bold tracking-tight text-slate-900">
            Frequently asked questions
          </h2>
          <div className="mt-8 space-y-3">
            {FAQS.map((faq) => (
              <details
                key={faq.q}
                className="group rounded-xl border border-slate-200 bg-white px-5 py-4 open:border-blue-200 open:bg-blue-50/40"
              >
                <summary className="flex cursor-pointer items-center justify-between gap-4 text-sm font-semibold text-slate-900 marker:content-none">
                  {faq.q}
                  <span className="shrink-0 text-blue-600 transition-transform group-open:rotate-45">
                    +
                  </span>
                </summary>
                <p className="mt-3 text-sm leading-relaxed text-slate-600">
                  {faq.a}
                </p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* ================= FINAL CTA ================= */}
      <section className="bg-gradient-to-br from-blue-700 to-indigo-800 py-16">
        <div className="mx-auto max-w-3xl px-4 text-center sm:px-6">
          <h2 className="text-3xl font-bold tracking-tight text-white">
            Explore all {MODULES.length} modules right now
          </h2>
          <p className="mt-3 text-lg text-blue-100">
            No signup, no password, no sales call. Pick a persona and click
            through the whole system in about two minutes.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Link
              href="/login"
              className="inline-flex items-center gap-2 rounded-xl bg-white px-7 py-3.5 text-base font-bold text-blue-700 shadow-xl transition-transform hover:scale-[1.02]"
            >
              Launch the live demo
              <ArrowRight className="h-5 w-5" />
            </Link>
            <a
              href={`mailto:${SITE.contactEmail}?subject=${encodeURIComponent("VEDIK School ERP - Product enquiry")}`}
              className="inline-flex items-center gap-2 rounded-xl border-2 border-white/40 px-7 py-3.5 text-base font-bold text-white transition-colors hover:bg-white/10"
            >
              {SITE.contactEmail}
            </a>
          </div>
        </div>
      </section>

      {/* ================= FOOTER ================= */}
      <footer className="border-t border-slate-200 bg-white py-12">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            <div>
              <div className="flex items-center gap-2">
                <Image
                  src={LOGO_PATH}
                  alt="VEDIK School ERP"
                  width={28}
                  height={28}
                  className="h-7 w-7"
                />
                <span className="font-black tracking-wide text-slate-900">
                  VEDIK <span className="font-semibold text-blue-600">ERP</span>
                </span>
              </div>
              <p className="mt-3 text-sm leading-relaxed text-slate-600">
                {SITE.tagline}. {SITE.description}
              </p>
            </div>
            {groups.slice(0, 3).map((group) => (
              <div key={group}>
                <h3 className="text-sm font-bold text-slate-900">
                  {GROUP_LABELS[group]}
                </h3>
                <ul className="mt-3 space-y-1.5">
                  {MODULES.filter((m) => m.group === group)
                    .slice(0, 6)
                    .map((module) => (
                      <li key={module.path}>
                        <Link
                          href={module.path}
                          className="text-sm text-slate-600 hover:text-blue-600"
                        >
                          {module.name}
                        </Link>
                      </li>
                    ))}
                </ul>
              </div>
            ))}
          </div>
          <div className="mt-10 flex flex-col items-center justify-between gap-3 border-t border-slate-200 pt-6 sm:flex-row">
            <p className="text-xs text-slate-500">
              &copy; {new Date().getFullYear()} {SITE.name} v{SITE.version}.
              Built by {SITE.organization}.
            </p>
            <div className="flex gap-4 text-xs">
              <Link href="/login" className="text-slate-500 hover:text-blue-600">
                Live demo
              </Link>
              <Link href="/license" className="text-slate-500 hover:text-blue-600">
                Pricing
              </Link>
              <a
                href={`mailto:${SITE.contactEmail}`}
                className="text-slate-500 hover:text-blue-600"
              >
                Contact
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

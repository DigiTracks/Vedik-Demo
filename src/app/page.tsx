import type { Metadata } from "next";
import { LandingPage } from "@/components/landing/landing-page";
import { JsonLd } from "@/components/seo/json-ld";
import {
  SITE,
  SITE_KEYWORDS,
  OG_IMAGE,
  siteUrl,
  organizationSchema,
  webSiteSchema,
  softwareApplicationSchema,
  faqSchema,
} from "@/lib/site";

/**
 * Marketing landing page.
 *
 * This replaces the previous `redirect("/dashboard")`, which under
 * `output: "export"` produced a blank HTML body and a client-side meta refresh.
 * A real server-rendered page is the only reliable option for a static host.
 */

const FAQS = [
  {
    question: "Is the VEDIK demo free and do I need an account?",
    answer:
      "Yes. The demo is completely free and requires no signup, no password and no email address. Open the live demo, pick one of three personas — principal, teacher or student — and every module is immediately interactive with realistic sample data.",
  },
  {
    question: "What modules does VEDIK School ERP cover?",
    answer:
      "VEDIK groups 18 modules into four areas. Academics and assessment covers dashboard, classes, sections, subjects, timetable, exams, marks and homework. People covers students, teachers, staff, communication, leave, users and roles. Finance covers fees, income and expenses, and payroll. Operations covers library, transport, hostel and inventory.",
  },
  {
    question: "How much does VEDIK cost?",
    answer:
      "Plans are priced in Indian rupees and start with a free 14-day trial covering 8 modules and 50 students. Lite is ₹4,999 per year, Essential is ₹12,999, Pro is ₹24,999, and Enterprise is ₹49,999 with unlimited students. Half-yearly and lifetime pricing is also available, and every plan can be upgraded as the school grows.",
  },
  {
    question: "Can different staff see different parts of the system?",
    answer:
      "Yes. Access is role-based. A principal sees the whole school, a teacher is scoped to their own classes and subjects, and a student sees only their timetable, marks, fees and announcements. Navigation and data are both filtered, so a teacher cannot reach the payroll module at all.",
  },
  {
    question: "Does VEDIK generate receipts, payslips and certificates?",
    answer:
      "Yes, and it carries your school branding. Fee receipts, staff payslips, student ID cards and nine certificate types are generated with a live preview and then printed or downloaded.",
  },
  {
    question: "Is VEDIK built for Indian schools specifically?",
    answer:
      "Yes. Currency is INR throughout, phone numbers, PIN codes and dates are validated against Indian formats, and the academic year model, class structure and fee terms follow Indian school conventions.",
  },
  {
    question: "Can I try a role before deciding?",
    answer:
      "The demo lets you switch between the principal, teacher and student personas at any time from the top navigation, so you can evaluate every role's view without a sales call.",
  },
  {
    question: "How do I get started with the full product?",
    answer:
      "Start with the free 14-day trial to cover eight modules and 50 students. When you are ready to go live, contact the VEDIK team for a personalised walkthrough and a quote sized to your school.",
  },
];

const TITLE = "School Management ERP Software for Indian Schools";
const DESCRIPTION =
  "VEDIK School ERP runs admissions, attendance, exams, fees, payroll, library, transport and hostel management in one dashboard. Explore the live demo of all 18 modules.";

export const metadata: Metadata = {
  title: { absolute: `${SITE.name} — ${SITE.tagline}` },
  description: DESCRIPTION,
  keywords: [...SITE_KEYWORDS],
  alternates: { canonical: siteUrl("/") },
  openGraph: {
    type: "website",
    siteName: SITE.name,
    locale: SITE.locale,
    url: siteUrl("/"),
    title: TITLE,
    description: DESCRIPTION,
    images: [
      {
        url: OG_IMAGE.url,
        width: OG_IMAGE.width,
        height: OG_IMAGE.height,
        alt: OG_IMAGE.alt,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: TITLE,
    description: DESCRIPTION,
    images: [
      {
        url: OG_IMAGE.twitterUrl,
        width: OG_IMAGE.width,
        height: OG_IMAGE.height,
        alt: OG_IMAGE.alt,
      },
    ],
  },
};

export default function HomePage() {
  return (
    <>
      <JsonLd
        data={[
          { ...organizationSchema(), "@id": `${siteUrl("/")}#organization` },
          { ...webSiteSchema(), "@id": `${siteUrl("/")}#website` },
          {
            ...softwareApplicationSchema(),
            "@id": `${siteUrl("/")}#software`,
          },
          faqSchema(FAQS),
        ]}
      />
      <LandingPage />
    </>
  );
}

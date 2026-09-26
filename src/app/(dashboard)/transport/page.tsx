import type { Metadata } from "next";
import PageClient from "./page-client";
import { breadcrumbSchema, buildMetadata, faqSchema } from "@/lib/site";
import { JsonLd } from "@/components/seo/json-ld";
import { ModuleExplainer } from "@/components/seo/module-explainer";

export const metadata: Metadata = buildMetadata("transport");

const FAQS = [
  {
    question: "How is vehicle load calculated?",
    answer:
      "Assigned students are compared against the vehicle's rated capacity, and VEDIK shows that as both a count and a proportion bar. A vehicle running near its rated capacity is a planning signal, because it leaves no room for a substitution or a temporary enrolment.",
  },
  {
    question: "Why does a vehicle status matter for capacity?",
    answer:
      "A vehicle under maintenance still counts towards total fleet capacity but is not available to run, so its students need reallocating. VEDIK keeps status on the vehicle record so an unavailable bus is visible in the same view as the load figures rather than in a separate maintenance log.",
  },
  {
    question: "Does VEDIK track bus routes and stops?",
    answer:
      "Yes. Each vehicle is assigned to a named route, and the full product models routes with their individual stops and student allocations. The demo shows the route name per vehicle, which is what most schools need to answer a parent's question at pickup.",
  },
];

export default function Page() {
  return (
    <>
      <JsonLd data={breadcrumbSchema("transport")} />
      <JsonLd data={faqSchema(FAQS)} />
      <PageClient />
      <ModuleExplainer
        intro="School transport is a capacity-planning problem before it is a vehicle-management problem. The number that matters is not how many buses you own, it is how many students each bus is carrying against what it is legally and safely rated for. VEDIK surfaces both on the same screen."
        sections={[
          {
            heading: "What VEDIK tracks per vehicle",
            paragraphs: [
              "Each vehicle record carries its registration number, type, assigned route, named driver, rated capacity, how many students are currently allocated to it, and its operational status. The load figure is shown as a count against capacity with a proportion bar, so an over-loaded bus is visible at a glance.",
              "Status matters as much as capacity here. A vehicle under maintenance still counts towards fleet capacity but is not available to run, so its students need reallocating. Keeping status on the same record as the load figures means an unavailable bus is visible where the planning happens, not buried in a maintenance log.",
            ],
            points: [
              "Registration number and vehicle type",
              "Assigned route and driver",
              "Rated capacity per vehicle",
              "Student allocation with load bar",
              "Active or maintenance status",
              "Fleet-wide totals across all vehicles",
            ],
          },
          {
            heading: "Planning a route change",
            paragraphs: [
              "When a route changes, the first question is whether the remaining vehicles on that route can absorb the displaced students. VEDIK's per-vehicle load figures answer that directly, because a route running at 90% on one bus and 40% on another has a very different answer from one running at 90% on both.",
              "The demo fleet shows five vehicles across four routes plus a local drop, with one under maintenance. That maintenance entry is deliberately visible in the load summary, since a bus off the road is a capacity problem before it is a mechanical one.",
            ],
          },
        ]}
        faqs={FAQS}
        related={[
          {
            href: "/students",
            label: "Students",
            description: "See which students are allocated to a route.",
          },
          {
            href: "/staff",
            label: "Staff",
              description: "Driver records live alongside other staff.",
          },
          {
            href: "/hostel",
            label: "Hostel",
            description: "The other residential facility module.",
          },
        ]}
      />
    </>
  );
}

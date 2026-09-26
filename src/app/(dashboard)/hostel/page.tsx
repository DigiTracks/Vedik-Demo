import type { Metadata } from "next";
import PageClient from "./page-client";
import { breadcrumbSchema, buildMetadata, faqSchema } from "@/lib/site";
import { JsonLd } from "@/components/seo/json-ld";
import { ModuleExplainer } from "@/components/seo/module-explainer";

export const metadata: Metadata = buildMetadata("hostel");

const FAQS = [
  {
    question: "Should boys and girls hostels be separate blocks?",
    answer:
      "In most Indian schools, yes, and VEDIK records the hostel type on each block so the split is explicit. The demo school runs two boys hostels and one girls hostel. Recording the type on the block rather than inferring it from occupants keeps the allocation unambiguous when a block is part-filled.",
  },
  {
    question: "How is occupancy percentage calculated?",
    answer:
      "Occupancy is the ratio of occupied rooms to total rooms on that block. VEDIK shows it alongside the separate bed capacity, because a block can be 80% full by rooms while still having spare beds, depending on how many students share each room.",
  },
  {
    question: "Who is a warden responsible for?",
    answer:
      "The warden is the member of staff accountable for a hostel block, covering roll call, maintenance requests and the welfare of the residents. VEDIK attaches one warden per block so escalation is unambiguous when a student or parent calls after hours.",
  },
];

export default function Page() {
  return (
    <>
      <JsonLd data={breadcrumbSchema("hostel")} />
      <JsonLd data={faqSchema(FAQS)} />
      <PageClient />
      <ModuleExplainer
        intro="For schools that run residential accommodation, the hostel is a separate operation with its own capacity, staffing and safety obligations. VEDIK keeps it as its own module rather than folding beds into the classroom view, so wardens and occupancy are tracked on the same system as everything else."
        sections={[
          {
            heading: "What VEDIK tracks per hostel block",
            paragraphs: [
              "Each block records its name, whether it is a boys or girls hostel, the total room count, how many of those rooms are currently occupied, the named warden, and the bed capacity. Occupancy is shown as a percentage with a colour band, so a block approaching full capacity is obvious without opening a spreadsheet.",
              "Keeping the warden on the block record matters more than it looks. When a parent calls at seven in the evening about a student, the question the office has to answer is always the same one, and VEDIK has it on screen rather than in someone's memory.",
            ],
            points: [
              "Block name and boys/girls type",
              "Total and occupied room counts",
              "Bed capacity per block",
              "Occupancy percentage with thresholds",
              "Named warden per block",
              "Aggregate totals across all blocks",
            ],
          },
          {
            heading: "Planning capacity across an academic year",
            paragraphs: [
              "Hostel demand is seasonal. Admissions for the coming year decide how many beds are needed, and a block that is 84% full with two weeks to admissions is a planning signal, not a crisis. Watching occupancy per block across the year is how a school decides whether to open another block or lease accommodation nearby.",
              "The demo data shows three blocks at 80%, 84% and 75% occupancy, which is a realistic spread for a school that has grown steadily and is now close to needing additional capacity.",
            ],
          },
        ]}
        faqs={FAQS}
        related={[
          {
            href: "/students",
            label: "Students",
            description: "The register hostelled students are drawn from.",
          },
          {
            href: "/inventory",
            label: "Inventory",
            description: "Track hostel furniture and supplies.",
          },
          {
            href: "/staff",
            label: "Staff",
            description: "Manage the warden and support staff records.",
          },
        ]}
      />
    </>
  );
}

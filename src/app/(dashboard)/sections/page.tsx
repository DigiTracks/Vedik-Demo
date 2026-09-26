import type { Metadata } from "next";
import PageClient from "./page-client";
import { breadcrumbSchema, buildMetadata, faqSchema } from "@/lib/site";
import { JsonLd } from "@/components/seo/json-ld";
import { ModuleExplainer } from "@/components/seo/module-explainer";

export const metadata: Metadata = buildMetadata("sections");

const FAQS = [
  {
    question: "Why split a class into sections?",
    answer:
      "Sections exist for practical reasons: a room holds a limited number of students, a school may run parallel streams for the same year group, and a class teacher needs a manageable group to be responsible for. VEDIK lets a class carry any number of sections, each with its own headcount and class teacher.",
  },
  {
    question: "Is a section the same as a house?",
    answer:
      "No. A section is an academic grouping for teaching, timetabling and attendance. A house is a competition grouping used for sports and annual days. A student sits in exactly one section and one house, and VEDIK tracks the two independently.",
  },
  {
    question: "How does VEDIK split students across sections?",
    answer:
      "VEDIK does not create students for you. Admissions allocate a student to a class and a section, and the section headcount shown here is derived from those allocations, so it is always consistent with the student register rather than a separately maintained number.",
  },
];

export default function Page() {
  return (
    <>
      <JsonLd data={breadcrumbSchema("sections")} />
      <JsonLd data={faqSchema(FAQS)} />
      <PageClient />
      <ModuleExplainer
        intro="Sections are the level at which a school actually teaches. A class says which year group a student belongs to; a section says exactly who sits in front of the teacher at 8:30. VEDIK treats the section as the default unit for attendance, timetabling and marks entry."
        sections={[
          {
            heading: "Why the section is the important unit",
            paragraphs: [
              "Attendance is marked per section, not per class. A student absent from Class 10-A on a Tuesday is a fact about that section, and the class-wise percentage VEDIK reports is calculated from section-level records. Timetable periods are allocated to sections too, which is how a substitution for one section does not disturb the rest of the year group.",
              "Because a section carries its own class teacher, staff accountability is unambiguous. When a parent asks why their child missed three periods, the section and its teacher are the first thing you look up.",
            ],
            points: [
              "Section-level attendance marking",
              "Weekly periods per section",
              "Marks entry scoped to the section",
              "Named class teacher per section",
              "Headcount derived from admissions",
              "Feeds class-wise reporting",
            ],
          },
          {
            heading: "Planning section sizes",
            paragraphs: [
              "A useful sanity check before each academic year is the ratio of section headcount to available classrooms. VEDIK surfaces the headcount on every section card so an over-loaded section is visible without exporting anything.",
              "If you are splitting a section mid-year, remember that existing attendance and marks history stays attached to the section the student was in at the time. Creating a new section affects future records only, which is the behaviour most schools want for a mid-year split.",
            ],
          },
        ]}
        faqs={FAQS}
        related={[
          {
            href: "/classes",
            label: "Classes",
            description: "The year groups that sections belong to.",
          },
          {
            href: "/timetable",
            label: "Timetable",
            description: "Allocate periods to individual sections.",
          },
          {
            href: "/attendance",
            label: "Attendance",
            description: "Mark and report attendance per section.",
          },
        ]}
      />
    </>
  );
}

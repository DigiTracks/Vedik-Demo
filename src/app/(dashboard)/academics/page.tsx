import type { Metadata } from "next";
import PageClient from "./page-client";
import { breadcrumbSchema, buildMetadata, faqSchema } from "@/lib/site";
import { JsonLd } from "@/components/seo/json-ld";
import { ModuleExplainer } from "@/components/seo/module-explainer";

export const metadata: Metadata = buildMetadata("academics");

const FAQS = [
  {
    question: "What does the Academics module include?",
    answer:
      "Four sub-modules: Classes, Sections, Subjects and Timetable. Classes define the year groups, Sections define the groups within them, Subjects maps the curriculum to classes and teachers, and Timetable allocates weekly periods. Exams, marks and homework sit alongside these in VEDIK.",
  },
  {
    question: "In what order should I set up Academics?",
    answer:
      "Classes first, then Sections, then Subjects, then Timetable. Subjects need a class to map against, the timetable needs both classes and subjects, and exam scheduling needs all three. Setting them up in that order means nothing has to be re-keyed later.",
  },
  {
    question: "How many periods does a VEDIK timetable week hold?",
    answer:
      "Whatever your school runs. The demo timetable shows a standard five-day week with up to eight periods a day, which is the common Indian school pattern. Nothing in VEDIK assumes a particular number of periods, days or working hours.",
  },
];

export default function Page() {
  return (
    <>
      <JsonLd data={breadcrumbSchema("academics")} />
      <JsonLd data={faqSchema(FAQS)} />
      <PageClient />
      <ModuleExplainer
        intro="Academics is where VEDIK holds the structure of what your school teaches: which year groups exist, how they are split, which subjects run in each, and when each of those subjects meets. Set this up once and attendance, examinations, marks and reporting all inherit it."
        sections={[
          {
            heading: "The four building blocks",
            paragraphs: [
              "Classes are your year groups, from Nursery through Class 12. Sections are the actual groups of students inside a class. Subjects are the curriculum entries mapped to a class and to the teacher who takes them. The Timetable assigns those subjects to periods across the week.",
              "These four are deliberately separate rather than one big form. A school that runs a streamed Class 10 keeps two sections with different subject sets; a school that adds a subject mid-year changes one subject record rather than rebuilding every timetable entry.",
            ],
            points: [
              "Classes: year groups and class teachers",
              "Sections: student groups within a class",
              "Subjects: curriculum mapped to class and teacher",
              "Timetable: weekly period allocation",
            ],
          },
          {
            heading: "How academics feeds the rest of VEDIK",
            paragraphs: [
              "Once the structure is set, everything downstream stops being manual. A teacher's login is scoped to the sections they are timetabled against, so they mark attendance and enter marks only for their own students. Examination windows are scheduled per class. Fee structures attach to a class, so a Class 10 student is charged differently from a Class 6 student without anyone maintaining a spreadsheet.",
              "The practical order is Classes, then Sections, then Subjects, then Timetable. Subjects need a class to map to, the timetable needs both, and exam scheduling needs all three. Following that sequence means nothing has to be re-keyed at the end of the year.",
            ],
          },
          {
            heading: "Working with a new academic year",
            paragraphs: [
              "Rolling into a new year mostly means promoting students from one class to the next and updating the academic year label. VEDIK keeps history, so last year's attendance, marks and fee records stay attached to the class they were recorded under, while the students themselves move up.",
            ],
          },
        ]}
        faqs={FAQS}
        related={[
          {
            href: "/classes",
            label: "Classes",
            description: "Define the year groups and class teachers.",
          },
          {
            href: "/sections",
            label: "Sections",
            description: "Manage student groups within each class.",
          },
          {
            href: "/timetable",
            label: "Timetable",
            description: "Build the weekly period allocation.",
          },
        ]}
      />
    </>
  );
}

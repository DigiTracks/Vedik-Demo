import type { Metadata } from "next";
import PageClient from "./page-client";
import { breadcrumbSchema, buildMetadata, faqSchema } from "@/lib/site";
import { JsonLd } from "@/components/seo/json-ld";
import { ModuleExplainer } from "@/components/seo/module-explainer";

export const metadata: Metadata = buildMetadata("classes");

const FAQS = [
  {
    question: "What is the difference between a class and a section?",
    answer:
      "A class is a year group such as Class 10. A section is an actual group of students within that class, for example Class 10-A. VEDIK records the class once and creates its sections underneath, so you set the class teacher and total strength once and manage the sections that make it up.",
  },
  {
    question: "How many students can a section hold?",
    answer:
      "There is no fixed limit in VEDIK. The practical ceiling is your timetable, your physical rooms and your state board's regulations, typically 30 to 40 students per section. The demo school runs two to three sections per class with roughly 25 to 40 students each.",
  },
  {
    question: "Who is a class teacher?",
    answer:
      "The class teacher is the member of staff responsible for a class as a whole, as distinct from a subject teacher who teaches one subject across many classes. VEDIK attaches a class teacher to each class, which is who reports on that group's attendance and welfare.",
  },
];

export default function Page() {
  return (
    <>
      <JsonLd data={breadcrumbSchema("classes")} />
      <JsonLd data={faqSchema(FAQS)} />
      <PageClient />
      <ModuleExplainer
        intro="Classes are the backbone of the academic structure in VEDIK. Every student, teacher assignment, subject, timetable slot, exam and fee record ultimately resolves back to a class, so getting this right at the start saves a lot of rework later."
        sections={[
          {
            heading: "What class management in VEDIK gives you",
            paragraphs: [
              "Each class card shows the three things a principal needs at a glance: total enrolment, how many sections the class is split into, and which member of staff owns it as class teacher. Those three numbers answer most of the questions that come out of a staff meeting.",
              "Because sections hang off the class, promoting a whole year at the end of the academic year is a single operation rather than a per-section edit. Any change to a class, such as splitting a section or reassigning the class teacher, is reflected immediately across attendance, exams and reports.",
            ],
            points: [
              "Total enrolment per class",
              "Section count and names",
              "Class teacher assignment",
              "One-click view into sections",
              "Feeds attendance and exams",
              "Drives fee structure per class",
            ],
          },
          {
            heading: "How classes connect to the rest of VEDIK",
            paragraphs: [
              "Subjects are mapped to a class rather than to the whole school, which is how a teacher ends up seeing only the sections they actually teach. The weekly timetable allocates periods per class, so a clash in a class shows up as a clash for that class specifically, not as a school-wide ambiguity.",
              "Fee structures are also defined per class. A Class 10 student and a Class 6 student do not pay the same tuition, and VEDIK keeps that difference in one place instead of leaving the accountant to remember it.",
            ],
          },
        ]}
        faqs={FAQS}
        related={[
          {
            href: "/sections",
            label: "Sections",
            description: "Manage the student groups inside each class.",
          },
          {
            href: "/subjects",
            label: "Subjects",
            description: "Map the curriculum to classes and teachers.",
          },
          {
            href: "/timetable",
            label: "Timetable",
            description: "Allocate weekly periods per class.",
          },
        ]}
      />
    </>
  );
}

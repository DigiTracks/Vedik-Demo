import Link from "next/link";
import { ChevronRight } from "lucide-react";

/**
 * Server-rendered explanatory content for a module screen.
 *
 * Rendered from the page's server shell (`page.tsx`), so this text is in the
 * static HTML with no client JavaScript. It gives each module real H2/H3
 * structure, an FAQ block, and crawlable internal links instead of leaving the
 * page as a bare data grid.
 */

export interface ExplainerSection {
  heading: string;
  paragraphs: string[];
  points?: string[];
}

export interface ExplainerProps {
  /** Short lead-in shown above the first H2. */
  intro: string;
  sections: ExplainerSection[];
  faqs: { question: string; answer: string }[];
  related: { href: string; label: string; description: string }[];
}

export function ModuleExplainer({
  intro,
  sections,
  faqs,
  related,
}: ExplainerProps) {
  return (
    <div className="mt-10 space-y-8 border-t border-slate-200 pt-8">
      <p className="max-w-3xl text-base leading-relaxed text-slate-600">
        {intro}
      </p>

      {sections.map((section) => (
        <section key={section.heading}>
          <h2 className="text-xl font-bold text-slate-900">{section.heading}</h2>
          {section.paragraphs.map((paragraph) => (
            <p
              key={paragraph.slice(0, 40)}
              className="mt-3 max-w-3xl text-sm leading-relaxed text-slate-600"
            >
              {paragraph}
            </p>
          ))}
          {section.points && (
            <ul className="mt-4 grid max-w-3xl gap-2 sm:grid-cols-2">
              {section.points.map((point) => (
                <li
                  key={point}
                  className="flex items-start gap-2 rounded-lg border border-slate-200 bg-white px-4 py-2.5 text-sm text-slate-700"
                >
                  <ChevronRight className="mt-0.5 h-4 w-4 shrink-0 text-blue-600" />
                  {point}
                </li>
              ))}
            </ul>
          )}
        </section>
      ))}

      {faqs.length > 0 && (
        <section>
          <h2 className="text-xl font-bold text-slate-900">
            Frequently asked questions
          </h2>
          <div className="mt-4 space-y-2">
            {faqs.map((faq) => (
              <details
                key={faq.question}
                className="rounded-xl border border-slate-200 bg-white px-5 py-3.5 open:border-blue-200 open:bg-blue-50/40"
              >
                <summary className="cursor-pointer text-sm font-semibold text-slate-900 marker:content-none">
                  {faq.question}
                </summary>
                <p className="mt-2.5 text-sm leading-relaxed text-slate-600">
                  {faq.answer}
                </p>
              </details>
            ))}
          </div>
        </section>
      )}

      {related.length > 0 && (
        <section>
          <h2 className="text-xl font-bold text-slate-900">Related modules</h2>
          <ul className="mt-4 grid gap-3 sm:grid-cols-3">
            {related.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="block h-full rounded-xl border border-slate-200 bg-white p-4 transition-all hover:border-blue-300 hover:shadow-md"
                >
                  <span className="flex items-center gap-1 text-sm font-semibold text-slate-900">
                    {item.label}
                    <ChevronRight className="h-3.5 w-3.5 text-blue-600" />
                  </span>
                  <span className="mt-1 block text-xs leading-snug text-slate-500">
                    {item.description}
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </section>
      )}
    </div>
  );
}

import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { Home, LayoutDashboard, Search } from "lucide-react";
import { SITE, SITE_KEYWORDS, siteUrl } from "@/lib/site";
import { LOGO_PATH } from "@/lib/utils";

/**
 * A 404 is a dead end, not content: it is kept out of the index but still
 * links onward to the pages a lost visitor is most likely to want.
 */
export const metadata: Metadata = {
  title: { absolute: `Page not found | ${SITE.name}` },
  description:
    "That page is not part of VEDIK School ERP. Head back to the product home page or jump straight into the live demo of all modules.",
  keywords: [...SITE_KEYWORDS],
  alternates: { canonical: siteUrl("/") },
  robots: { index: false, follow: true },
};

const SUGGESTIONS = [
  { href: "/dashboard", label: "Dashboard", description: "School-wide overview and charts" },
  { href: "/students", label: "Students", description: "The full student register" },
  { href: "/fees", label: "Fees", description: "Collections, dues and receipts" },
  { href: "/license", label: "Pricing", description: "Plans and module coverage" },
];

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-slate-50 px-4 py-16 text-center">
      <div className="w-full max-w-2xl">
        <Image
          src={LOGO_PATH}
          alt="VEDIK School ERP"
          width={48}
          height={48}
          className="mx-auto h-12 w-12"
        />
        <p className="mt-6 text-sm font-semibold uppercase tracking-widest text-blue-600">
          404 &middot; Page not found
        </p>
        <h1 className="mt-3 text-4xl font-extrabold tracking-tight text-slate-900 sm:text-5xl">
          This page is not in the system
        </h1>
        <p className="mx-auto mt-4 max-w-lg text-lg text-slate-600">
          The address you followed does not match any screen in VEDIK School ERP.
          It may have been renamed, or the link that brought you here may be
          out of date.
        </p>

        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <Link
            href="/"
            className="inline-flex items-center gap-2 rounded-xl bg-blue-600 px-5 py-3 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-blue-700"
          >
            <Home className="h-4 w-4" />
            Back to home
          </Link>
          <Link
            href="/login"
            className="inline-flex items-center gap-2 rounded-xl border border-slate-300 bg-white px-5 py-3 text-sm font-semibold text-slate-700 transition-colors hover:bg-slate-50"
          >
            <LayoutDashboard className="h-4 w-4" />
            Launch the live demo
          </Link>
        </div>

        <div className="mt-12 text-left">
          <h2 className="flex items-center justify-center gap-2 text-sm font-bold uppercase tracking-wide text-slate-500">
            <Search className="h-4 w-4" />
            Popular screens
          </h2>
          <ul className="mt-4 grid gap-3 sm:grid-cols-2">
            {SUGGESTIONS.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="block rounded-xl border border-slate-200 bg-white p-4 transition-all hover:border-blue-300 hover:shadow-md"
                >
                  <span className="block text-sm font-semibold text-slate-900">
                    {item.label}
                  </span>
                  <span className="mt-1 block text-xs text-slate-500">
                    {item.description}
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

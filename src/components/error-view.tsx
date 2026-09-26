"use client";

import { useEffect } from "react";
import Link from "next/link";
import { AlertTriangle, RotateCcw, Home } from "lucide-react";

/**
 * Shared error presentation used by both `app/error.tsx` and
 * `app/global-error.tsx`. Rendered inside an existing document, so it emits no
 * <html>/<body> of its own.
 */
export function ErrorView({
  error,
  reset,
  title = "Something went wrong",
  scope,
}: {
  error: Error & { digest?: string };
  reset: () => void;
  title?: string;
  scope?: string;
}) {
  useEffect(() => {
    // Static export has no server to log to, so the console is the only sink.
    console.error(error);
  }, [error]);

  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center px-4 text-center">
      <div className="max-w-lg">
        <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-red-100">
          <AlertTriangle className="h-7 w-7 text-red-600" />
        </div>
        <h1 className="mt-5 text-3xl font-extrabold tracking-tight text-slate-900">
          {title}
        </h1>
        <p className="mt-3 text-slate-600">
          {scope
            ? `An unexpected error interrupted ${scope}. Retrying usually clears it. If it keeps happening, the demo data for this module may be the cause.`
            : "An unexpected error interrupted this screen. Retrying usually clears it. If it keeps happening, the demo data for this module may be the cause."}
        </p>
        {error.digest && (
          <p className="mt-2 font-mono text-xs text-slate-400">
            Reference: {error.digest}
          </p>
        )}
        <div className="mt-7 flex flex-wrap justify-center gap-3">
          <button
            onClick={reset}
            className="inline-flex items-center gap-2 rounded-xl bg-blue-600 px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-blue-700"
          >
            <RotateCcw className="h-4 w-4" />
            Try again
          </button>
          <Link
            href="/"
            className="inline-flex items-center gap-2 rounded-xl border border-slate-300 bg-white px-5 py-3 text-sm font-semibold text-slate-700 transition-colors hover:bg-slate-50"
          >
            <Home className="h-4 w-4" />
            Back to home
          </Link>
        </div>
      </div>
    </div>
  );
}

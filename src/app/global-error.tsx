"use client";

import { ErrorView } from "@/components/error-view";

/**
 * Catches failures in the root layout itself, so it must supply its own
 * <html> and <body> and cannot rely on any app styling being loaded.
 */
export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <html lang="en">
      <body style={{ margin: 0, fontFamily: "system-ui, sans-serif" }}>
        <ErrorView error={error} reset={reset} />
      </body>
    </html>
  );
}

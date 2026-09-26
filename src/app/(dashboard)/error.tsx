"use client";

import { ErrorView } from "@/components/error-view";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <ErrorView
      error={error}
      reset={reset}
      title="This screen failed to load"
      scope="this module"
    />
  );
}

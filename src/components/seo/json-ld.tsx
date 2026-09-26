import { jsonLdPayload } from "@/lib/site";

/**
 * Inline JSON-LD structured data.
 *
 * Rendered as a native `<script type="application/ld+json">` rather than via
 * `next/script`: structured data is not executable, and the native tag is the
 * pattern the Next.js JSON-LD guide recommends.
 *
 * `<` is escaped by `jsonLdPayload` so no value can terminate the script tag.
 */
export function JsonLd({ data }: { data: unknown }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: jsonLdPayload(data) }}
    />
  );
}

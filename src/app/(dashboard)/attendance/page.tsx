import type { Metadata } from "next";
import PageClient from "./page-client";
import { breadcrumbSchema, buildMetadata } from "@/lib/site";
import { JsonLd } from "@/components/seo/json-ld";

export const metadata: Metadata = buildMetadata("attendance");

export default function Page() {
  return (
    <>
      <JsonLd data={breadcrumbSchema("attendance")} />
      <PageClient />
    </>
  );
}

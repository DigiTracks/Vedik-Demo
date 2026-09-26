import type { Metadata } from "next";
import PageClient from "./page-client";
import { breadcrumbSchema, buildMetadata } from "@/lib/site";
import { JsonLd } from "@/components/seo/json-ld";

export const metadata: Metadata = buildMetadata("fees");

export default function Page() {
  return (
    <>
      <JsonLd data={breadcrumbSchema("fees")} />
      <PageClient />
    </>
  );
}

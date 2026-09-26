import type { Metadata } from "next";
import PageClient from "./page-client";
import {
  breadcrumbSchema,
  buildMetadata,
  productSchema,
} from "@/lib/site";
import { JsonLd } from "@/components/seo/json-ld";

export const metadata: Metadata = buildMetadata("license");

export default function Page() {
  return (
    <>
      <JsonLd data={productSchema()} />
      <JsonLd data={breadcrumbSchema("license")} />
      <PageClient />
    </>
  );
}

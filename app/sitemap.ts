import type { MetadataRoute } from "next";
import { createClient } from "@/lib/supabase/server";

const BASE_URL = "https://andresgarzong.com";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const entries: MetadataRoute.Sitemap = [
    {
      url: BASE_URL,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1,
    },
  ];

  try {
    const supabase = await createClient();
    const { data: offerings } = await supabase
      .from("offerings")
      .select("slug")
      .not("slug", "is", null)
      .in("status", ["planned", "active"]);

    for (const offering of offerings ?? []) {
      if (!offering.slug) continue;
      entries.push({
        url: `${BASE_URL}/events/${offering.slug}`,
        lastModified: new Date(),
        changeFrequency: "weekly",
        priority: 0.8,
      });
    }
  } catch {
    // DB hiccup — fall back to just the homepage entry above.
  }

  return entries;
}

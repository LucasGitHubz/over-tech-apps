import type { MarkdownInstance } from "astro";

export interface GuideMetadata {
  title: string;
  description: string;
  slug: string;
  date_proposee: string;
}

const guides = Object.values(import.meta.glob<MarkdownInstance<GuideMetadata>>(
  "../content/solemate-guides/*.md", { eager: true },
));

export function availableGuides() {
  // The override is for checking a future release locally. Production uses today.
  const cutoff = process.env.SOLEMATE_GUIDE_DATE || new Date().toISOString().slice(0, 10);
  return guides
    .filter((guide) => import.meta.env.DEV || guide.frontmatter.date_proposee <= cutoff)
    .sort((a, b) => a.frontmatter.date_proposee.localeCompare(b.frontmatter.date_proposee));
}

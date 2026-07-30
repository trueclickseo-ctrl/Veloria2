import { z } from 'astro:content';

// Define site-specific frontmatter fields here.
// For the Magazine niche, no additional fields are needed yet.
// Future niches can add custom fields, e.g.:
// attribution: z.string().optional() for Poetry, or
// platform: z.string().optional() for Captions.
export const frontmatterExtension = z.object({
  // Empty for Magazine, but custom fields can go here.
});

export interface SiteConfig {
  siteName: string;
  siteUrl: string;
  tagline: string;
  description: string;
  logo: {
    src: string;
    alt: string;
    width: number;
    height: number;
  };
  favicon: string;
  themeColors: {
    primary: string;       // Hex or CSS color
    primaryHover: string;
    secondary: string;
    accent: string;
    background: string;
    text: string;
    textMuted: string;
    surface: string;
    border: string;
  };
  socialLinks: {
    twitter?: string;
    facebook?: string;
    instagram?: string;
    github?: string;
  };
  navigation: {
    header: Array<{ label: string; href: string }>;
    footer: Array<{ label: string; href: string }>;
  };
  organizationInfo: {
    name: string;
    logo: string;
    url: string;
    sameAs: string[];
  };
  defaultImage: string;
  defaultAuthorId: string;
  categories: Record<string, { label: string; description: string; color?: string }>;
  enabledSchemaTypes: string[];
}

export const siteConfig: SiteConfig = {
  siteName: "Veloria Magazine",
  siteUrl: "https://veloriamag.com",
  tagline: "Insights into Health, Finance, Tech, Beauty, and Travel",
  description: "Your ultimate destination for curated advice and in-depth articles on wellness, finance, beauty secrets, emerging tech, and wanderlust.",
  logo: {
    src: "/assets/logo.svg",
    alt: "Veloria Magazine Logo",
    width: 180,
    height: 40,
  },
  favicon: "/favicon.svg",
  themeColors: {
    primary: "#111111",        // Deep charcoal/black
    primaryHover: "#2d2d2d",   // Soft charcoal
    secondary: "#78350f",      // Warm amber/brown
    accent: "#881337",         // Deep editorial rose/burgundy
    background: "#fbfbf9",     // Elegant warm cream paper tone
    text: "#1c1917",           // Stone-900 high contrast dark gray-black for reading
    textMuted: "#44403c",      // Stone-700 muted text
    surface: "#ffffff",        // White cards
    border: "#d6d3d1",         // Stone-300 clean subtle lines
  },
  socialLinks: {
    twitter: "https://twitter.com/veloriamag",
    facebook: "https://facebook.com/veloriamag",
    instagram: "https://instagram.com/veloriamag",
  },
  navigation: {
    header: [
      { label: "Home", href: "/" },
      { label: "Health", href: "/health" },
      { label: "Beauty", href: "/beauty" },
      { label: "Finance", href: "/finance" },
      { label: "Technology", href: "/technology" },
      { label: "Travel", href: "/travel" },
      { label: "Celebrity", href: "/celebrity" },
    ],
    footer: [
      { label: "Privacy Policy", href: "/privacy" },
      { label: "Terms of Service", href: "/terms" },
      { label: "Contact Us", href: "/contact" },
      { label: "Search", href: "/search" },
    ],
  },
  organizationInfo: {
    name: "Veloria Publishing Group",
    logo: "https://veloriamag.com/assets/logo.png",
    url: "https://veloriamag.com",
    sameAs: [
      "https://twitter.com/veloriamag",
      "https://facebook.com/veloriamag",
    ],
  },
  defaultImage: "/assets/default-share.jpg",
  defaultAuthorId: "veloria-editors",
  categories: {
    health: { label: "Health", description: "Expert insights, wellness guides, and health advice for clean living.", color: "#10b981" },
    beauty: { label: "Beauty", description: "Skincare routines, fashion tips, and beauty trends you need to know.", color: "#ec4899" },
    finance: { label: "Finance", description: "Smart money tips, investing advice, and personal finance strategies.", color: "#3b82f6" },
    technology: { label: "Technology", description: "Breaking news, gadgets, and analysis on emerging tech frontiers.", color: "#8b5cf6" },
    travel: { label: "Travel", description: "Destination guides, travel hacks, and global exploration stories.", color: "#f59e0b" },
    celebrity: { label: "Celebrity", description: "Exclusives, profiles, and deep dives into pop culture and stars.", color: "#ef4444" },
  },
  enabledSchemaTypes: ["Article", "DefinedTerm", "CreativeWork"],
};

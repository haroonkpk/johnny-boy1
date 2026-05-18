// ── Default content values for the home page sections ──
// Shared between actions, API route, and components

export const CONTENT_DEFAULTS = {
  heroContent:
    "Smooth hits. Bold flavors. Crafted for a premium vaping experience.",

  badge: "ENGINEERING",
  bgText: "Beyond",
  title: "Beyond Ordinary Vapor.",
  subtitle:
    "Our flavors are not just about taste, they are an experience. In every puff, you get the perfect balance of premium quality nicotine and natural extracts.",
  stat1Label: "Intensity",
  stat1Value: "85%",
  stat2Label: "Smoothness",
  stat2Value: "95%",
  stat3Label: "Freshness",
  stat3Value: "70%",

  ultraTitle: "CHERRY SODA",
  ultraDesc:
    "Infused with dark cherry essence and Mesh V2 heating for a bold cloud experience.",
  ultraBgText: "Integrated Power Bank for unyielding performance.",

  customerTitle: "What our customers say",
  customerSubtitle: "Real stories from real people who bought our product",
  customerBadge: "Testimonials",

  ctaBadge: "Wholesale Program",
  ctaTitle: "Interested in carrying our product?",
  ctaDesc:
    "JOHNNY BOY provides certain retailers across the country the opportunity to carry its products subject to requirements.",

  sectionOrder: [
    "hero",
    "techSpecs",
    "features",
    "movement",
    "happyCustomers",
    "homeCta",
  ],
  hiddenSections: [] as string[],
};

export const DEFAULT_SECTION_ORDER = CONTENT_DEFAULTS.sectionOrder;

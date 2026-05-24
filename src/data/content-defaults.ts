

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
  // product
  productBadge: "Collection",
   productTitle: "Explore Our Products",
   productSubtitle: "Choose from our premium local and regular series.",
   productBgText: "PREMIUM VAPES",

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
    "deviceHighlights",
  ],
  hiddenSections: [] as string[],

  localseriesTitle: 'Johnny Boy',
  localseriesSubtitle: "Premium clouds ultimate flavor. Explore the exclusive JohnnyBoy collection where cutting-edge tech meets bold aesthetics.",
  localseriesBadge: "Products",

  regularseriesTitle: 'Johnny Boy',
  regularseriesSubtitle: "Premium clouds ultimate flavor. Explore the exclusive JohnnyBoy collection where cutting-edge tech meets bold aesthetics.",
  regularseriesBadge: "Products",

  contactTitle: 'Contact Us',
  contactSubtitle: "Have a question or want to get in touch? We'd love to hear from you.",
  contactBadge: "Get in Touch",

  reviewTitle: 'Trusted by Visionaries.',
  reviewSubtitle: "Real stories from real people who bought our products.",
  reviewBadge: "Reviews",
  // device highlight

highlightTitle: "Device Highlights",
highlightSubtitle: "Experience the ultimate vaping technology with our cutting-edge features.",
highlightsList: [
  { id: 1, name: 'Dual Mesh Coil', iconUrl: '/images/icons-dual-mesh-coil.svg' },
  { id: 2, name: 'E-Liquid Display', iconUrl: '/images/icons-adjustable-airflow.svg' },
  { id: 3, name: 'Power Display', iconUrl: '/images/icons-usb-type-c.svg' },
  { id: 4, name: 'Adjustable Airflow', iconUrl: '/images/icons-power-display.svg' },
  { id: 5, name: 'USB Type-C', iconUrl: '/images/icons-e-liquid-display.svg' },
],

// ── Footer Content ──
// CONTENT_DEFAULTS mein ye add karein
footerDesc: "Beyond Ordinary Vapor. Crafted for a premium vaping experience.",
footerAddress: "Your Address Here",
footerPhone: "+123 456 7890",
footerEmail: "info@johnnyboy.com",
footerFacebook: "#",
footerYoutube: "#",
footerInstagram: "#",
footerNewsTitle: "Latest updates coming soon.",
};

export const DEFAULT_SECTION_ORDER = CONTENT_DEFAULTS.sectionOrder;

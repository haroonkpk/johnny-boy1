import mongoose, { Schema, Document } from "mongoose";

export interface ISiteContent extends Document {
  configId: string;

  // Hero Section
  heroContent: string;

  // Flavor Aroma Section
  badge: string;
  bgText: string;
  title: string;
  subtitle: string;
  stat1Label: string;
  stat1Value: string;
  stat2Label: string;
  stat2Value: string;
  stat3Label: string;
  stat3Value: string;

  // products section

  productBadge: string;
  productTitle: string;
  productSubtitle: string;
  productBgText: string;
  // Cherry Soda Section
  ultraTitle: string;
  ultraDesc: string;
  ultraBgText: string;

  // Happy Customers Section
  customerTitle: string;
  customerSubtitle: string;
  customerBadge: string;

  // Wholesale CTA Section
  ctaBadge: string;
  ctaTitle: string;
  ctaDesc: string;
  // ISiteContent interface ke andar add karein
highlightTitle: string;
highlightSubtitle: string;
highlightsList: { iconUrl: string; name: string }[];
// ===============================
// REGULAR PAGE SECTION
// ===============================
regularHeroTitle: string;
regularHeroSubtitle: string;
regularHeroBadge: string;

regularFlavourLabel: string;
regularEmptyMessage: string;
  // Section Order (for home page)
  sectionOrder: string[];
  hiddenSections: string[];

  // Local Series Page Hero
  localseriesTitle: string;
  localseriesSubtitle: string;
  localseriesBadge: string;

  // Regular Series Page Hero
  regularseriesTitle: string;
  regularseriesSubtitle: string;
  regularseriesBadge: string;

  // Contact Page Hero
  contactTitle: string;
  contactSubtitle: string;
  contactBadge: string;

  // Review Page Hero
  reviewTitle: string;
  reviewSubtitle: string;
  reviewBadge: string;
  // Footer Fields
  footerDesc: string;
  footerAddress: string;
  footerPhone: string;
  footerEmail: string;
  footerFacebook: string;
  footerYoutube: string;
  footerInstagram: string;
  footerNewsTitle: string;
}
const SiteContentSchema = new Schema<ISiteContent>(
  {
    configId: { type: String, default: "main", unique: true },

    // Hero
    heroContent: { type: String, default: "" },

    // Flavor Aroma
    badge: { type: String, default: "" },
    bgText: { type: String, default: "" },
    title: { type: String, default: "" },
    subtitle: { type: String, default: "" },
    stat1Label: { type: String, default: "" },
    stat1Value: { type: String, default: "" },
    stat2Label: { type: String, default: "" },
    stat2Value: { type: String, default: "" },
    stat3Label: { type: String, default: "" },
    stat3Value: { type: String, default: "" },
    // product
    productBadge: { type: String, default: "" },
    productTitle: { type: String, default: "" },
    productSubtitle: { type: String, default: "" },
    productBgText: { type: String, default: "" },

    // Cherry Soda
    ultraTitle: { type: String, default: "" },
    ultraDesc: { type: String, default: "" },
    ultraBgText: { type: String, default: "" },

    // Happy Customers
    customerTitle: { type: String, default: "" },
    customerSubtitle: { type: String, default: "" },
    customerBadge: { type: String, default: "" },

    // Wholesale CTA
    ctaBadge: { type: String, default: "" },
    ctaTitle: { type: String, default: "" },
    ctaDesc: { type: String, default: "" },
    // SiteContentSchema definition ke andar add karein
highlightTitle: { type: String, default: "" },
highlightSubtitle: { type: String, default: "" },
highlightsList: { 
  type: [{ 
    iconUrl: String, 
    name: String 
  }], 
  default: [] 
},

    // ===============================
// REGULAR PAGE SECTION
// ===============================
// REGULAR PAGE SECTION
regularHeroTitle: { type: String, default: "" },
regularHeroSubtitle: { type: String, default: "" },
regularHeroBadge: { type: String, default: "" },

regularFlavourLabel: { type: String, default: "Flavours" },
regularEmptyMessage: { type: String, default: "No products found" },
    // Section Order
    sectionOrder: {
      type: [String],
      default: [
        "hero",
        "techSpecs",
        "features",
        "movement",
        "happyCustomers",
        "homeCta",
      ],
    },
    hiddenSections: {
      type: [String],
      default: [],
    },

    // Local Series Page Hero
    localseriesTitle: { type: String, default: "" },
    localseriesSubtitle: { type: String, default: "" },
    localseriesBadge: { type: String, default: "" },

    // Regular Series Page Hero
    regularseriesTitle: { type: String, default: "" },
    regularseriesSubtitle: { type: String, default: "" },
    regularseriesBadge: { type: String, default: "" },

    // Contact Page Hero
    contactTitle: { type: String, default: "" },
    contactSubtitle: { type: String, default: "" },
    contactBadge: { type: String, default: "" },

    // Review Page Hero
    reviewTitle: { type: String, default: "" },
    reviewSubtitle: { type: String, default: "" },
    reviewBadge: { type: String, default: "" },
    // Footer Fields
footerDesc: { type: String, default: "" },
footerAddress: { type: String, default: "" },
footerPhone: { type: String, default: "" },
footerEmail: { type: String, default: "" },
footerFacebook: { type: String, default: "" },
footerYoutube: { type: String, default: "" },
footerInstagram: { type: String, default: "" },
footerNewsTitle: { type: String, default: "" },
  },
  { timestamps: true }
);

if (mongoose.models && mongoose.models.SiteContent) {
  delete (mongoose.models as any).SiteContent;
}

const SiteContent = mongoose.model<ISiteContent>("SiteContent", SiteContentSchema);

export default SiteContent;

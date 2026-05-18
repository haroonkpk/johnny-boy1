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

  // Section Order (for home page)
  sectionOrder: string[];
  hiddenSections: string[];
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
  },
  { timestamps: true }
);

if (mongoose.models && mongoose.models.SiteContent) {
  delete (mongoose.models as any).SiteContent;
}

const SiteContent = mongoose.model<ISiteContent>("SiteContent", SiteContentSchema);

export default SiteContent;

"use server";

import dbConnect from "@/lib/mongodb";
import SiteContent from "@/models/SiteContent";
import { revalidatePath } from "next/cache";
import { CONTENT_DEFAULTS } from "@/data/content-defaults";

// ── Helper: get or create the singleton config 
async function getOrCreateConfig() {
  await dbConnect();
  let config = await SiteContent.findOne({ configId: "main" }).lean();
  if (!config) {
    config = await SiteContent.create({ configId: "main", ...CONTENT_DEFAULTS });
  }
  return JSON.parse(JSON.stringify(config)) as any;
}

export async function getSiteContent() {
  try {
    const config = await getOrCreateConfig();
    const merged: Record<string, any> = {};
    for (const [key, defaultVal] of Object.entries(CONTENT_DEFAULTS)) {
      merged[key] = config[key] || defaultVal;
    }
    return merged;
  } catch (error: any) {
    console.error("getSiteContent Error:", error);
    return { ...CONTENT_DEFAULTS };
  }
}

// ── UPDATE: Hero Section ────────────────────────────────────────
export async function updateHeroSection(data: { heroContent: string }) {
  try {
    await dbConnect();
    await SiteContent.findOneAndUpdate(
      { configId: "main" },
      { heroContent: data.heroContent.trim() },
      { upsert: true, new: true }
    );
    revalidatePath("/");
    return { success: true, message: "Hero section updated successfully" };
  } catch (error: any) {
    console.error("updateHeroSection Error:", error);
    return { error: error.message || "Failed to update hero section" };
  }
}

// ── UPDATE: Flavor Aroma Section ────────────────────────────────
export async function updateFlavorAromaSection(data: {
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
}) {
  try {
    await dbConnect();
    await SiteContent.findOneAndUpdate(
      { configId: "main" },
      {
        badge: data.badge.trim(),
        bgText: data.bgText.trim(),
        title: data.title.trim(),
        subtitle: data.subtitle.trim(),
        stat1Label: data.stat1Label.trim(),
        stat1Value: data.stat1Value.trim(),
        stat2Label: data.stat2Label.trim(),
        stat2Value: data.stat2Value.trim(),
        stat3Label: data.stat3Label.trim(),
        stat3Value: data.stat3Value.trim(),
      },
      { upsert: true, new: true }
    );
    revalidatePath("/");
    return {
      success: true,
      message: "Flavor Aroma section updated successfully",
    };
  } catch (error: any) {
    console.error("updateFlavorAromaSection Error:", error);
    return { error: error.message || "Failed to update flavor aroma section" };
  }
}
// ── UPDATE: Product Explore Section ───────────────────────────────
export async function updateProductSection(data: {
  productBadge: string;
  productTitle: string;
  productSubtitle: string;
  productBgText: string;
}) {
  try {
    await dbConnect();
    await SiteContent.findOneAndUpdate(
      { configId: "main" },
      {
        productBadge: data.productBadge.trim(),
        productTitle: data.productTitle.trim(),
        productSubtitle: data.productSubtitle.trim(),
        productBgText: data.productBgText.trim(),
      },
      { upsert: true, new: true }
    );
    
    revalidatePath("/");
    return {
      success: true,
      message: "Product section updated successfully",
    };
  } catch (error: any) {
    console.error("updateProductSection Error:", error);
    return { error: error.message || "Failed to update product section" };
  }
}

// ── UPDATE: Cherry Soda Section ─────────────────────────────────
export async function updateCherrySodaSection(data: {
  ultraTitle: string;
  ultraDesc: string;
  ultraBgText: string;
}) {
  try {
    await dbConnect();
    await SiteContent.findOneAndUpdate(
      { configId: "main" },
      {
        ultraTitle: data.ultraTitle.trim(),
        ultraDesc: data.ultraDesc.trim(),
        ultraBgText: data.ultraBgText.trim(),
      },
      { upsert: true, new: true }
    );
    revalidatePath("/");
    return {
      success: true,
      message: "Cherry Soda section updated successfully",
    };
  } catch (error: any) {
    console.error("updateCherrySodaSection Error:", error);
    return { error: error.message || "Failed to update cherry soda section" };
  }
}

// ── UPDATE: Happy Customers Section ─────────────────────────────
export async function updateHappyCustomersSection(data: {
  customerTitle: string;
  customerSubtitle: string;
  customerBadge: string;
}) {
  try {
    await dbConnect();
    await SiteContent.findOneAndUpdate(
      { configId: "main" },
      {
        customerTitle: data.customerTitle.trim(),
        customerSubtitle: data.customerSubtitle.trim(),
        customerBadge: data.customerBadge.trim(),
      },
      { upsert: true, new: true }
    );
    revalidatePath("/");
    return {
      success: true,
      message: "Happy Customers section updated successfully",
    };
  } catch (error: any) {
    console.error("updateHappyCustomersSection Error:", error);
    return {
      error: error.message || "Failed to update happy customers section",
    };
  }
}

// ── UPDATE: Wholesale CTA Section ───────────────────────────────
export async function updateWholesaleCtaSection(data: {
  ctaBadge: string;
  ctaTitle: string;
  ctaDesc: string;
}) {
  try {
    await dbConnect();
    await SiteContent.findOneAndUpdate(
      { configId: "main" },
      {
        ctaBadge: data.ctaBadge.trim(),
        ctaTitle: data.ctaTitle.trim(),
        ctaDesc: data.ctaDesc.trim(),
      },
      { upsert: true, new: true }
    );
    revalidatePath("/");
    return {
      success: true,
      message: "Wholesale CTA section updated successfully",
    };
  } catch (error: any) {
    console.error("updateWholesaleCtaSection Error:", error);
    return {
      error: error.message || "Failed to update wholesale CTA section",
    };
  }
}

// ── UPDATE: Section Order & Visibility ───────────────────────────
export async function updateSectionOrder(sectionOrder: string[], hiddenSections: string[]) {
  try {
    await dbConnect();
    await SiteContent.findOneAndUpdate(
      { configId: "main" },
      { sectionOrder, hiddenSections },
      { upsert: true, new: true }
    );
    revalidatePath("/");
    return { success: true, message: "Section layout updated successfully" };
  } catch (error: any) {
    console.error("updateSectionOrder Error:", error);
    return { error: error.message || "Failed to update section layout" };
  }
}

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
// Product Explore Section 
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

// Cherry Soda Section 
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

// Happy Customers Section 
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

// Wholesale CTA Section 
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

//  Section Order & Visibility 
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


//regular page
export async function updateRegularPageSection(data: {
  title: string;
  subtitle: string;
  badge: string;
}) {
  try {
    await dbConnect();

    await SiteContent.findOneAndUpdate(
      { configId: "main" },
      {
        regularHeroTitle: data.title.trim(),
        regularHeroSubtitle: data.subtitle.trim(),
        regularHeroBadge: data.badge.trim(),
      },
      { upsert: true, new: true }
    );

    revalidatePath("/regular");

    return {
      success: true,
      message: "Regular page updated successfully",
    };
  } catch (error: any) {
    return {
      success: false,
      error: error.message || "Failed to update regular page",
    };
  }
}
// local page
export async function updateLocalPageSection(data: {
  title: string;
  subtitle: string;
  badge: string;
}) {
  try {
    await dbConnect();

    await SiteContent.findOneAndUpdate(
      { configId: "main" },
      {
        localHeroTitle: data.title.trim(),
        localHeroSubtitle: data.subtitle.trim(),
        localHeroBadge: data.badge.trim(),
      },
      { upsert: true, new: true }
    );

    revalidatePath("/local");

    return {
      success: true,
      message: "Local page updated successfully",
    };
  } catch (error: any) {
    return {
      success: false,
      error: error.message || "Failed to update local page",
    };
  }
}
// review
export async function updateReviewPageSection(data: {
  title: string;
  subtitle: string;
  badge: string;
}) {
  try {
    await dbConnect();

    await SiteContent.findOneAndUpdate(
      { configId: "main" },
      {
        reviewHeroTitle: data.title.trim(),
        reviewHeroSubtitle: data.subtitle.trim(),
        reviewHeroBadge: data.badge.trim(),
      },
      { upsert: true, new: true }
    );

    revalidatePath("/review");

    return {
      success: true,
      message: "Review page updated successfully",
    };
  } catch (error: any) {
    return {
      success: false,
      error: error.message || "Failed to update review page",
    };
  }
}
// contact
export async function updateContactPageSection(data: {
  title: string;
  subtitle: string;
  badge: string;
}) {
  try {
    await dbConnect();

    await SiteContent.findOneAndUpdate(
      { configId: "main" },
      {
        contactHeroTitle: data.title.trim(),
        contactHeroSubtitle: data.subtitle.trim(),
        contactHeroBadge: data.badge.trim(),
      },
      { upsert: true, new: true }
    );

    revalidatePath("/contact");

    return {
      success: true,
      message: "Contact page updated successfully",
    };
  } catch (error: any) {
    return {
      success: false,
      error: error.message || "Failed to update contact page",
    };
  }
}

//  Local Series Page 
export async function updateLocalSeriesSection(data: {
  localseriesTitle: string;
  localseriesSubtitle: string;
  localseriesBadge: string;
}) {
  try {
    await dbConnect();
    await SiteContent.findOneAndUpdate(
      { configId: "main" },
      {
        localseriesTitle: data.localseriesTitle.trim(),
        localseriesSubtitle: data.localseriesSubtitle.trim(),
        localseriesBadge: data.localseriesBadge.trim(),
      },
      { upsert: true, new: true }
    );
    revalidatePath("/localseries");
    return { success: true, message: "Local Series page content updated successfully" };
  } catch (error: any) {
    console.error("updateLocalSeriesSection Error:", error);
    return { error: error.message || "Failed to update Local Series page content" };
  }
}

//  Regular Series Page 
export async function updateRegularSeriesSection(data: {
  regularseriesTitle: string;
  regularseriesSubtitle: string;
  regularseriesBadge: string;
}) {
  try {
    await dbConnect();
    await SiteContent.findOneAndUpdate(
      { configId: "main" },
      {
        regularseriesTitle: data.regularseriesTitle.trim(),
        regularseriesSubtitle: data.regularseriesSubtitle.trim(),
        regularseriesBadge: data.regularseriesBadge.trim(),
      },
      { upsert: true, new: true }
    );
    revalidatePath("/regularseries");
    return { success: true, message: "Regular Series page content updated successfully" };
  } catch (error: any) {
    console.error("updateRegularSeriesSection Error:", error);
    return { error: error.message || "Failed to update Regular Series page content" };
  }
}

//  Contact Page 
export async function updateContactSection(data: {
  contactTitle: string;
  contactSubtitle: string;
  contactBadge: string;
}) {
  try {
    await dbConnect();
    await SiteContent.findOneAndUpdate(
      { configId: "main" },
      {
        contactTitle: data.contactTitle.trim(),
        contactSubtitle: data.contactSubtitle.trim(),
        contactBadge: data.contactBadge.trim(),
      },
      { upsert: true, new: true }
    );
    revalidatePath("/contact");
    return { success: true, message: "Contact page content updated successfully" };
  } catch (error: any) {
    console.error("updateContactSection Error:", error);
    return { error: error.message || "Failed to update Contact page content" };
  }
}

//  Review Page 
export async function updateReviewSection(data: {
  reviewTitle: string;
  reviewSubtitle: string;
  reviewBadge: string;
}) {
  try {
    await dbConnect();
    await SiteContent.findOneAndUpdate(
      { configId: "main" },
      {
        reviewTitle: data.reviewTitle.trim(),
        reviewSubtitle: data.reviewSubtitle.trim(),
        reviewBadge: data.reviewBadge.trim(),
      },
      { upsert: true, new: true }
    );
    revalidatePath("/review");
    return { success: true, message: "Review page content updated successfully" };
  } catch (error: any) {
    console.error("updateReviewSection Error:", error);
    return { error: error.message || "Failed to update Review page content" };
  }
}

// ── UPDATE: Footer Section ────────────────────────────────
export async function updateFooter(data: {
  footerDesc: string;
  footerAddress: string;
  footerPhone: string;
  footerEmail: string;
  footerFacebook: string;
  footerYoutube: string;
  footerInstagram: string;
  footerNewsTitle: string;
}) {
  try {
    await dbConnect();
    await SiteContent.findOneAndUpdate(
      { configId: "main" },
      {
        footerDesc: data.footerDesc.trim(),
        footerAddress: data.footerAddress.trim(),
        footerPhone: data.footerPhone.trim(),
        footerEmail: data.footerEmail.trim(),
        footerFacebook: data.footerFacebook.trim(),
        footerYoutube: data.footerYoutube.trim(),
        footerInstagram: data.footerInstagram.trim(),
        footerNewsTitle: data.footerNewsTitle.trim(),
      },
      { upsert: true, new: true }
    );
    
   
    revalidatePath("/", "layout"); 
    
    return {
      success: true,
      message: "Footer updated successfully",
    };
  } catch (error: any) {
    console.error("updateFooter Error:", error);
    return { 
      success: false, 
      message: error.message || "Failed to update footer"
    };
  }
}
// ── UPDATE: Device Highlights Section ──────────────────────────
export async function updateDeviceHighlightsSection(data: {
  highlightTitle: string;
  highlightSubtitle: string;
  highlightsList: { id: number; name: string; iconUrl: string }[];
}) {
  try {
    await dbConnect();
    await SiteContent.findOneAndUpdate(
      { configId: "main" },
      {
        highlightTitle: data.highlightTitle.trim(),
        highlightSubtitle: data.highlightSubtitle.trim(),
        highlightsList: data.highlightsList, // Yeh pura array update kar dega
      },
      { upsert: true, new: true }
    );
    
    revalidatePath("/");
    return { 
      success: true, 
      message: "Device Highlights updated successfully" 
    };
  } catch (error: any) {
    console.error("updateDeviceHighlightsSection Error:", error);
    return { 
      success: false, 
      error: error.message || "Failed to update Device Highlights" 
    };
  }
}
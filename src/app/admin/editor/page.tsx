"use client";

import { useEffect, useState } from "react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { getSiteContent } from "@/actions/editor";
import toast from "react-hot-toast";

// ── Custom Editor Sections ──
import HeroSection from "@/components/admin/editor/HeroSection";
import FlavorAromaSection from "@/components/admin/editor/FlavorAromaSection";
import CherrySodaSection from "@/components/admin/editor/CherrySodaSection";
import HappyCustomersSection from "@/components/admin/editor/HappyCustomersSection";
import WholesaleCtaSection from "@/components/admin/editor/WholesaleCtaSection";
import SectionOrderSection from "@/components/admin/editor/SectionOrderSection";
import ProductSection from "@/components/admin/editor/ProductSection";
import LocalSeriesSection from "@/components/admin/editor/LocalSeriesSection";
import RegularSeriesSection from "@/components/admin/editor/RegularSeriesSection";
import ContactSection from "@/components/admin/editor/ContactSection";
import ReviewSection from "@/components/admin/editor/ReviewSection";
import { TabNavigation } from "@/components/shared/TabNavigation";

export default function AdminEditorPage() {
  const [loading, setLoading] = useState(true);
  const [mounted, setMounted] = useState(false);
  const [content, setContent] = useState<any>(null);
  const [activeTab, setActiveTab] = useState("home");

  // ── Mount Guard ──
  useEffect(() => {
    setMounted(true);
  }, []);

  // ── Fetch Initial Data ──
  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getSiteContent();
        if (data) {
          setContent(data);
        }
      } catch (err) {
        console.error("Fetch Error:", err);
        toast.error("Failed to load content");
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  if (!mounted) return null;

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="flex flex-col items-center gap-3">
          <div className="w-8 h-8 border-2 border-black/20 border-t-black rounded-full animate-spin" />
          <p className="text-sm text-gray-500 font-medium">
            Loading Content Manager...
          </p>
        </div>
      </div>
    );
  }

  if (!content) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <p className="text-sm text-red-500 font-medium">
          Failed to load content. Please refresh the page.
        </p>
      </div>
    );
  }

  // ── Prepare isolated initial data packages for sections ──
  const flavorAromaData = {
    badge: content.badge,
    bgText: content.bgText,
    title: content.title,
    subtitle: content.subtitle,
    stat1Label: content.stat1Label,
    stat1Value: content.stat1Value,
    stat2Label: content.stat2Label,
    stat2Value: content.stat2Value,
    stat3Label: content.stat3Label,
    stat3Value: content.stat3Value,
  };
  // product section
  const productSectionData = {
    productBadge: content.productBadge,
    productTitle: content.productTitle,
    productSubtitle: content.productSubtitle,
    productBgText: content.productBgText,
  };

  const cherrySodaData = {
    ultraTitle: content.ultraTitle,
    ultraDesc: content.ultraDesc,
    ultraBgText: content.ultraBgText,
  };

  const happyCustomersData = {
    customerTitle: content.customerTitle,
    customerSubtitle: content.customerSubtitle,
    customerBadge: content.customerBadge,
  };

  const wholesaleCtaData = {
    ctaBadge: content.ctaBadge,
    ctaTitle: content.ctaTitle,
    ctaDesc: content.ctaDesc,
  };
  
  const localseriesData = {
    localseriesTitle: content.localseriesTitle,
    localseriesSubtitle: content.localseriesSubtitle,
    localseriesBadge: content.localseriesBadge,
  };

  const regularseriesData = {
    regularseriesTitle: content.regularseriesTitle,
    regularseriesSubtitle: content.regularseriesSubtitle,
    regularseriesBadge: content.regularseriesBadge,
  };

  const contactData = {
    contactTitle: content.contactTitle,
    contactSubtitle: content.contactSubtitle,
    contactBadge: content.contactBadge,
  };

  const reviewData = {
    reviewTitle: content.reviewTitle,
    reviewSubtitle: content.reviewSubtitle,
    reviewBadge: content.reviewBadge,
  };

  const sectionOrderData = {
    sectionOrder: content.sectionOrder,
    hiddenSections: content.hiddenSections || [],
  };
  const tabs = [
  { id: "home", label: "Home Page" },
  { id: "review", label: "Review Page" },
  { id: "regular", label: "Regular Page" },
  { id: "local", label: "Local Page" },
  { id: "contact", label: "Contact Page" },
];

  return (
    <div className="px-[clamp(1rem,4vw,2rem)] py-[clamp(1.5rem,4vw,2.5rem)] max-w-[900px] mx-auto">
      {/* ── Page Heading ── */}
      <SectionHeading
        title="Content Editor"
        subtitle="Manage your website content. Each section saves independently."
        mode="light"
        className="!mb-[clamp(1.5rem,4vw,2.5rem)]"
      />

      {/* Tabs Navigation */}
      <TabNavigation
        tabs={[
          { id: "home", label: "Home Page" },
          { id: "localseries", label: "Local Series" },
          { id: "regularseries", label: "Regular Series" },
          { id: "contact", label: "Contact Page" },
          { id: "review", label: "Review Page" },
        ]}
        activeTab={activeTab}
        onTabChange={setActiveTab}
        className="mb-[clamp(1.5rem,3vw,2rem)] rounded-2xl border border-gray-100"
      />

      <div className="flex flex-col gap-[clamp(1.5rem,3vw,2rem)]">
        {activeTab === "home" && (
          <>
            {/* Hero Section */}
            <HeroSection initialContent={content.heroContent} />

            {/* Flavor Aroma Section */}
            <FlavorAromaSection initialData={flavorAromaData} />
            {/* EXPLORE OUR PRODUCT */}
            <ProductSection initialData={productSectionData} />

            {/* Cherry Soda Section */}
            <CherrySodaSection initialData={cherrySodaData} />

            {/* Happy Customers Section */}
            <HappyCustomersSection initialData={happyCustomersData} />

            {/* Wholesale CTA Section */}
            <WholesaleCtaSection initialData={wholesaleCtaData} />

            {/* Section Layout & Ordering */}
            <SectionOrderSection initialData={sectionOrderData} />
          </>
        )}

        {activeTab === "localseries" && (
          <LocalSeriesSection initialData={localseriesData} />
        )}

        {activeTab === "regularseries" && (
          <RegularSeriesSection initialData={regularseriesData} />
        )}

        {activeTab === "contact" && (
          <ContactSection initialData={contactData} />
        )}

        {activeTab === "review" && (
          <ReviewSection initialData={reviewData} />
        )}
      </div>
    </div>
  );
}
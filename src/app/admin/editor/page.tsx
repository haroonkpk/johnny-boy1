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
import ReviewPageEditor from "@/components/admin/editor/ReviewPageEditor";
import RegularPageEditor from "@/components/admin/editor/RegularPageEditor";
import LocalPageEditor from "@/components/admin/editor/LocalPageEditor";
import ContactPageEditor from "@/components/admin/editor/ContactPageEditor";

// the 
export default function AdminEditorPage() {
  const [loading, setLoading] = useState(true);
  const [mounted, setMounted] = useState(false);
  const [content, setContent] = useState<any>(null);
  // tab
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
  // Is object ko content check block ke baad aur return statement se pehle rakhein:
  const footerSectionData = {
    description: content.footerDescription,
    showDescription: content.showFooterDesc ?? true, // block out / hide karne ke liye booleans
    address: content.footerAddress,
    phone: content.footerPhone,
    email: content.footerEmail,
    showAddress: content.showFooterAddress ?? true,
    facebookUrl: content.facebookUrl,
    instagramUrl: content.instagramUrl,
    youtubeUrl: content.youtubeUrl,
    snapchatUrl: content.snapchatUrl, // snapchat add karne ke liye
    showSocials: content.showFooterSocials ?? true,
    newsDate: content.footerNewsDate,
    newsTitle: content.footerNewsTitle,
    showNews: content.showFooterNews ?? true,
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
        subtitle="Manage your homepage content. Each section saves independently."
        mode="light"
        className="!mb-[clamp(1.5rem,4vw,2.5rem)]"
      />
    {/* navtab */}
    <div className="w-full overflow-x-auto scrollbar-hide mb-8">
  <div className="flex gap-3 min-w-max pb-2">
    {tabs.map((tab) => (
      <button
        key={tab.id}
        onClick={() => setActiveTab(tab.id)}
        className={`
          px-5 py-2.5 rounded-full text-sm font-medium whitespace-nowrap
          transition-all duration-300 border
          ${
            activeTab === tab.id
              ? "bg-black text-white border-black shadow-md"
              : "bg-white text-gray-700 border-gray-200 hover:border-black"
          }
        `}
      >
        {tab.label}
      </button>
    ))}
  </div>
</div>

      {/* <div className="flex flex-col gap-[clamp(1.5rem,3vw,2rem)]"> */}
      {activeTab === "home" && (
  <div className="flex flex-col gap-[clamp(1.5rem,3vw,2rem)]">
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
      </div>
      )}
 {activeTab === "review" && <ReviewPageEditor />}
{activeTab === "regular" && <RegularPageEditor />}

{activeTab === "local" && <LocalPageEditor />}

{activeTab === "contact" && <ContactPageEditor />}
    </div>
  );
}
"use client";

import { useEffect, useState } from "react";


import Editor from "@/components/Editor";

export default function AdminEditorPage() {
  // section top one
  // section 5
const [heroContent, setHeroContent] = useState<string>("");
  // --- 1. STATES FOR ALL SECTIONS ---

  // Section 1: Flavor Aroma
  const [title, setTitle] = useState<string>("");
  const [subtitle, setSubtitle] = useState<string>("");
  const [badge, setBadge] = useState<string>("");
  const [bgText, setBgText] = useState<string>("");
  // New Stats States for Section 1
  const [stat1Label, setStat1Label] = useState("");
  const [stat1Value, setStat1Value] = useState("");
  const [stat2Label, setStat2Label] = useState("");
  const [stat2Value, setStat2Value] = useState("");
  const [stat3Label, setStat3Label] = useState("");
  const [stat3Value, setStat3Value] = useState("");

  const [ultraTitle, setUltraTitle] = useState<string>("");
  const [ultraDesc, setUltraDesc] = useState<string>("");
  const [ultraBgText, setUltraBgText] = useState<string>("");

  const [customerTitle, setCustomerTitle] = useState<string>("");
  const [customerSubtitle, setCustomerSubtitle] = useState<string>("");
  const [customerBadge, setCustomerBadge] = useState<string>("");

  
  // Section 4 States
  const [ctaBadge, setCtaBadge] = useState<string>("");
  const [ctaTitle, setCtaTitle] = useState<string>("");
  const [ctaDesc, setCtaDesc] = useState<string>("");

  const [loading, setLoading] = useState<boolean>(true);
  const [isSaving, setIsSaving] = useState<boolean>(false);
  const [mounted, setMounted] = useState<boolean>(false);

  // --- 2. DEFAULT VALUES (Original Styles Maintain karne ke liye) ---
  const DEFAULTS = {
    // sectiontop 1
    heroContent: "Smooth hits. Bold flavors. Crafted for a premium vaping experience.",
    badge: "ENGINEERING",
    bgText: "Beyond",
    title: "Beyond OrdinaryVapor.",
    subtitle:
      "Our flavors are not just about taste, they are an experience. In every puff, you get the perfect balance of premium quality nicotine and natural extracts.",
    stat1Label: "Intensity",
    stat1Value: "85%",
    stat2Label: "Smoothness",
    stat2Value: "95%",
    stat3Label: "Freshness",
    stat3Value: "70%",
    // section2
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
  };

  const stripHtml = (html: string) => {
    if (typeof window === "undefined" || !html) return html;
    const doc = new DOMParser().parseFromString(html, "text/html");
    return (doc.body.textContent || "").trim();
  };

  // --- 3. FETCH DATA ---
  useEffect(() => {
    setMounted(true);
    const fetchContent = async () => {
      try {
        const res = await fetch("/api/content", { cache: "no-store" });
        const data = await res.json();

        if (data) {
        // top section
        setHeroContent(data.heroContent || DEFAULTS.heroContent);
          setTitle(data.title || DEFAULTS.title);
          setSubtitle(data.subtitle || DEFAULTS.subtitle);
          setBadge(data.badge || DEFAULTS.badge);
          setBgText(data.bgText || DEFAULTS.bgText);
          setStat1Label(data.stat1Label || DEFAULTS.stat1Label);
          setStat1Value(data.stat1Value || DEFAULTS.stat1Value);
          setStat2Label(data.stat2Label || DEFAULTS.stat2Label);
          setStat2Value(data.stat2Value || DEFAULTS.stat2Value);
          setStat3Label(data.stat3Label || DEFAULTS.stat3Label);
          setStat3Value(data.stat3Value || DEFAULTS.stat3Value);

          setUltraTitle(data.ultraTitle || DEFAULTS.ultraTitle);
          setUltraDesc(data.ultraDesc || DEFAULTS.ultraDesc);
          setUltraBgText(data.ultraBgText || DEFAULTS.ultraBgText);

          setCustomerTitle(data.customerTitle || DEFAULTS.customerTitle);
          setCustomerSubtitle(
            data.customerSubtitle || DEFAULTS.customerSubtitle,
          );
          setCustomerBadge(data.customerBadge || DEFAULTS.customerBadge);
          // section 4
          setCtaBadge(data.ctaBadge || DEFAULTS.ctaBadge);
          setCtaTitle(data.ctaTitle || DEFAULTS.ctaTitle);
          setCtaDesc(data.ctaDesc || DEFAULTS.ctaDesc);
        }
      } catch (error) {
        console.error("Fetch Error:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchContent();
  }, []);

  // --- 4. SAVE DATA ---
  const saveContent = async () => {
    setIsSaving(true);
    try {
      const cleanData = {
        // top section
        heroContent: stripHtml(heroContent), 
        title: stripHtml(title),
        subtitle: stripHtml(subtitle),
        badge: stripHtml(badge),
        bgText: stripHtml(bgText),
        // Add these stats here:
        stat1Label: stat1Label.trim(),
        stat1Value: stat1Value.trim(),
        stat2Label: stat2Label.trim(),
        stat2Value: stat2Value.trim(),
        stat3Label: stat3Label.trim(),
        stat3Value: stat3Value.trim(),

        // Section 2 (Plain Text - Style fixed in frontend code)
        ultraTitle: ultraTitle.trim(),
        ultraDesc: ultraDesc.trim(),
        ultraBgText: ultraBgText.trim(),
        // Section 3 (Plain Text)
        customerTitle: customerTitle.trim(),
        customerSubtitle: customerSubtitle.trim(),
        customerBadge: customerBadge.trim(),
        // section4
        ctaBadge: ctaBadge.trim(),
        ctaTitle: ctaTitle.trim(),
        ctaDesc: ctaDesc.trim(),
      };

      const res = await fetch("/api/content", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(cleanData),
      });

      if (res.ok) alert("Success: All Sections Published!");
      else throw new Error("Save failed");
    } catch (error) {
      alert("Error saving data!");
    } finally {
      setIsSaving(false);
    }
  };
  const resetToDefaults = () => {
  // User se confirm karein taaki galti se reset na ho jaye
  const confirmReset = window.confirm(
    "Are you sure? This will revert all fields to their original default text."
  );

  if (confirmReset) {
    // Section 1 Reset
    setTitle(DEFAULTS.title);
    setSubtitle(DEFAULTS.subtitle);
    setBadge(DEFAULTS.badge);
    setBgText(DEFAULTS.bgText);
    setStat1Label(DEFAULTS.stat1Label);
    setStat1Value(DEFAULTS.stat1Value);
    setStat2Label(DEFAULTS.stat2Label);
    setStat2Value(DEFAULTS.stat2Value);
    setStat3Label(DEFAULTS.stat3Label);
    setStat3Value(DEFAULTS.stat3Value);

    // Section 2 Reset
    setUltraTitle(DEFAULTS.ultraTitle);
    setUltraDesc(DEFAULTS.ultraDesc);
    setUltraBgText(DEFAULTS.ultraBgText);

    // Section 3 Reset
    setCustomerTitle(DEFAULTS.customerTitle);
    setCustomerSubtitle(DEFAULTS.customerSubtitle);
    setCustomerBadge(DEFAULTS.customerBadge);

    // Section 4 Reset
    setCtaBadge(DEFAULTS.ctaBadge);
    setCtaTitle(DEFAULTS.ctaTitle);
    setCtaDesc(DEFAULTS.ctaDesc);

    alert("Fields have been reset. Don't forget to click 'Publish' to save these defaults permanently!");
  }
};

  if (!mounted) return null;
  if (loading)
    return (
      <div className="p-10 text-center font-sans">
        Loading Content Manager...
      </div>
    );

  return (
    <div
      className="admin-container"
      style={{
        padding: "40px 20px",
        maxWidth: "1000px",
        margin: "0 auto",
        fontFamily: "sans-serif",
        color: "#333",
      }}
    >
      {/* HEADER */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "40px",
          paddingBottom: "20px",
          borderBottom: "2px solid #f0f0f0",
        }}
      >
        <div>
          <h1 style={{ margin: 0, fontSize: "28px" }}>
            Website Content Manager
          </h1>
          <p style={{ margin: "5px 0 0", color: "#666" }}>
            Managing dynamic content while keeping original styles.
          </p>
        </div>
       
        <div style={{ display: "flex", gap: "10px" }}> {/* Buttons ko group karne ke liye flex container */}
  
  <button
    onClick={resetToDefaults}
    style={{
      padding: "15px 25px",
      backgroundColor: "transparent",
      color: "#e2bf32", // Red color for Reset
      borderRadius: "8px",
      border: "1px solid #e2bf32",
      cursor: "pointer",
      fontWeight: "bold",
    }}
  >
    Reset Defaults
  </button>

  <button
    onClick={saveContent}
    disabled={isSaving}
    style={{
      padding: "15px 35px",
      backgroundColor: isSaving ? "#94a3b8" : "#030404",
      color: "white",
      borderRadius: "8px",
      border: "none",
      cursor: "pointer",
      fontWeight: "bold",
    }}
  >
    {isSaving ? "Saving..." : "Publish All Changes"}
  </button>
  
</div>
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: "40px" }}>
     
     {/* --- SECTION 0: HERO SECTION --- */}
<section style={{
    padding: "30px",
    border: "2px solid #3ac8ee55",
    borderRadius: "16px",
    backgroundColor: "#f0f9ff",
    marginBottom: "40px"
}}>
    <h2 style={{ marginTop: 0, color: "#3ac8ee", fontSize: "20px" }}>
        0. Hero Section (Home Page Text)
    </h2>
    <div style={{ marginTop: "20px" }}>
        <label style={{ display: "block", marginBottom: "8px", fontWeight: "600" }}>
            Hero Description Text
        </label>
        <Editor value={heroContent} setValue={setHeroContent} />
    </div>
</section>
        {/* --- SECTION 1: FLAVOR AROMA --- */}
        <section
          style={{
            padding: "30px",
            border: "1px solid #e2e8f0",
            borderRadius: "16px",
            backgroundColor: "#f8fafc",
          }}
        >
          <h2 style={{ marginTop: 0, color: "#1e293b", fontSize: "20px" }}>
            1. Flavor Aroma Section
          </h2>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: "20px",
              marginTop: "20px",
            }}
          >
            <input
              value={badge}
              onChange={(e) => setBadge(e.target.value)}
              placeholder="Badge"
              style={{
                width: "100%",
                padding: "12px",
                borderRadius: "8px",
                border: "1px solid #cbd5e1",
              }}
            />
            <input
              value={bgText}
              onChange={(e) => setBgText(e.target.value)}
              placeholder="BG Text"
              style={{
                width: "100%",
                padding: "12px",
                borderRadius: "8px",
                border: "1px solid #cbd5e1",
              }}
            />
          </div>

          {/* Title & Subtitle Editors */}
          <div style={{ marginTop: "20px" }}>
            <label
              style={{
                fontWeight: "600",
                display: "block",
                marginBottom: "8px",
              }}
            >
              Title & Subtitle
            </label>
            <Editor value={title} setValue={setTitle} />
            <div style={{ marginTop: "10px" }}>
              <Editor value={subtitle} setValue={setSubtitle} />
            </div>
          </div>

          {/* --- STATS INPUTS (Intensity, Smoothness, Freshness) --- */}
          <div
            style={{
              marginTop: "30px",
              padding: "20px",
              backgroundColor: "#fff",
              borderRadius: "12px",
              border: "1px dashed #cbd5e1",
            }}
          >
            <h3
              style={{
                margin: "0 0 15px 0",
                fontSize: "16px",
                color: "#334155",
              }}
            >
              Flavor Profile Stats
            </h3>

            <div
              style={{ display: "flex", flexDirection: "column", gap: "15px" }}
            >
              {/* Stat 1: Intensity */}
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "1fr 1fr",
                  gap: "10px",
                }}
              >
                <input
                  value={stat1Label}
                  onChange={(e) => setStat1Label(e.target.value)}
                  placeholder="Label (e.g. Intensity)"
                  style={{
                    padding: "10px",
                    borderRadius: "6px",
                    border: "1px solid #e2e8f0",
                  }}
                />
                <input
                  value={stat1Value}
                  onChange={(e) => setStat1Value(e.target.value)}
                  placeholder="Value (e.g. 85%)"
                  style={{
                    padding: "10px",
                    borderRadius: "6px",
                    border: "1px solid #e2e8f0",
                  }}
                />
              </div>

              {/* Stat 2: Smoothness */}
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "1fr 1fr",
                  gap: "10px",
                }}
              >
                <input
                  value={stat2Label}
                  onChange={(e) => setStat2Label(e.target.value)}
                  placeholder="Label (e.g. Smoothness)"
                  style={{
                    padding: "10px",
                    borderRadius: "6px",
                    border: "1px solid #e2e8f0",
                  }}
                />
                <input
                  value={stat2Value}
                  onChange={(e) => setStat2Value(e.target.value)}
                  placeholder="Value (e.g. 95%)"
                  style={{
                    padding: "10px",
                    borderRadius: "6px",
                    border: "1px solid #e2e8f0",
                  }}
                />
              </div>

              {/* Stat 3: Freshness */}
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "1fr 1fr",
                  gap: "10px",
                }}
              >
                <input
                  value={stat3Label}
                  onChange={(e) => setStat3Label(e.target.value)}
                  placeholder="Label (e.g. Freshness)"
                  style={{
                    padding: "10px",
                    borderRadius: "6px",
                    border: "1px solid #e2e8f0",
                  }}
                />
                <input
                  value={stat3Value}
                  onChange={(e) => setStat3Value(e.target.value)}
                  placeholder="Value (e.g. 70%)"
                  style={{
                    padding: "10px",
                    borderRadius: "6px",
                    border: "1px solid #e2e8f0",
                  }}
                />
              </div>
            </div>
          </div>
        </section>

        {/* --- SECTION 2: ULTRA MODERN (FIXED STYLE) --- */}
        <section
          style={{
            padding: "30px",
            border: "2px solid #ff2d5522",
            borderRadius: "16px",
            backgroundColor: "#fff1f2",
          }}
        >
          <h2 style={{ marginTop: 0, color: "#be123c", fontSize: "20px" }}>
            2. Cherry Soda section
          </h2>
         

          <div style={{ marginTop: "20px" }}>
            <label
              style={{
                display: "block",
                marginBottom: "8px",
                fontWeight: "600",
              }}
            >
              Scrolling Text (Marquee)
            </label>
            <input
              value={ultraBgText}
              onChange={(e) => setUltraBgText(e.target.value)}
              style={{
                width: "100%",
                padding: "12px",
                borderRadius: "8px",
                border: "1px solid #fecdd3",
              }}
            />
          </div>

          <div style={{ marginTop: "20px" }}>
            <label
              style={{
                display: "block",
                marginBottom: "8px",
                fontWeight: "600",
              }}
            >
              Main Title (Plain Text)
            </label>
            <input
              value={ultraTitle}
              onChange={(e) => setUltraTitle(e.target.value)}
              placeholder="e.g. CHERRY SODA"
              style={{
                width: "100%",
                padding: "12px",
                borderRadius: "8px",
                border: "1px solid #fecdd3",
              }}
            />
          </div>

          <div style={{ marginTop: "20px" }}>
            <label
              style={{
                display: "block",
                marginBottom: "8px",
                fontWeight: "600",
              }}
            >
              Description
            </label>
            <textarea
              value={ultraDesc}
              onChange={(e) => setUltraDesc(e.target.value)}
              style={{
                width: "100%",
                padding: "12px",
                borderRadius: "8px",
                border: "1px solid #fecdd3",
                height: "80px",
              }}
            />
          </div>
        </section>

        {/* --- SECTION 3: HAPPY CUSTOMERS --- */}
        <section
          style={{
            padding: "30px",
            border: "1px solid #e5e7eb",
            borderRadius: "16px",
            backgroundColor: "#ffffff",
          }}
        >
          <h2 style={{ marginTop: 0, color: "#111827", fontSize: "20px" }}>
            3. Happy Customers Section
          </h2>
          <div style={{ marginTop: "20px" }}>
            <label
              style={{
                display: "block",
                marginBottom: "8px",
                fontWeight: "600",
              }}
            >
              Title (Last word will be Gradient)
            </label>
            <input
              value={customerTitle}
              onChange={(e) => setCustomerTitle(e.target.value)}
              style={{
                width: "100%",
                padding: "12px",
                borderRadius: "8px",
                border: "1px solid #d1d5db",
              }}
            />
          </div>
          <div style={{ marginTop: "20px" }}>
            <label
              style={{
                display: "block",
                marginBottom: "8px",
                fontWeight: "600",
              }}
            >
              Subtitle
            </label>
            <textarea
              value={customerSubtitle}
              onChange={(e) => setCustomerSubtitle(e.target.value)}
              style={{
                width: "100%",
                padding: "12px",
                borderRadius: "8px",
                border: "1px solid #d1d5db",
                height: "80px",
              }}
            />
          </div>
        </section>
        {/* --- SECTION 4: WHOLESALE CTA --- */}
        <section
          style={{
            padding: "30px",
            border: "1px solid #7A7D8F",
            borderRadius: "16px",
            backgroundColor: "#f0f9ff",
          }}
        >
          <h2 style={{ marginTop: 0, color: "#0369a1", fontSize: "20px" }}>
            4. Wholesale CTA Section
          </h2>
         

          <div style={{ marginTop: "20px" }}>
            <label
              style={{
                display: "block",
                marginBottom: "8px",
                fontWeight: "600",
              }}
            >
              Badge
            </label>
            <input
              value={ctaBadge}
              onChange={(e) => setCtaBadge(e.target.value)}
              style={{
                width: "100%",
                padding: "12px",
                borderRadius: "8px",
                border: "1px solid #bae6fd",
              }}
            />
          </div>

          <div style={{ marginTop: "20px" }}>
            <label
              style={{
                display: "block",
                marginBottom: "8px",
                fontWeight: "600",
              }}
            >
              Main Title
            </label>
            <input
              value={ctaTitle}
              onChange={(e) => setCtaTitle(e.target.value)}
              style={{
                width: "100%",
                padding: "12px",
                borderRadius: "8px",
                border: "1px solid #bae6fd",
              }}
            />
          </div>

          <div style={{ marginTop: "20px" }}>
            <label
              style={{
                display: "block",
                marginBottom: "8px",
                fontWeight: "600",
              }}
            >
              Description
            </label>
            <textarea
              value={ctaDesc}
              onChange={(e) => setCtaDesc(e.target.value)}
              style={{
                width: "100%",
                padding: "12px",
                borderRadius: "8px",
                border: "1px solid #bae6fd",
                height: "80px",
              }}
            />
          </div>
        </section>
      </div>
    </div>
  );
}

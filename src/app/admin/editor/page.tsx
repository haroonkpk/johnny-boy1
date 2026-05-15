"use client";

import { useEffect, useState } from "react";

export default function AdminEditorPage() {
  const [heroContent, setHeroContent] = useState<string>("");
  const [title, setTitle] = useState<string>("");
  const [subtitle, setSubtitle] = useState<string>("");
  const [badge, setBadge] = useState<string>("");
  const [bgText, setBgText] = useState<string>("");
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
  const [ctaBadge, setCtaBadge] = useState<string>("");
  const [ctaTitle, setCtaTitle] = useState<string>("");
  const [ctaDesc, setCtaDesc] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(true);
  const [isSaving, setIsSaving] = useState<boolean>(false);
  const [mounted, setMounted] = useState<boolean>(false);

  const DEFAULTS = {
    heroContent: "Smooth hits. Bold flavors. Crafted for a premium vaping experience.",
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
    ultraDesc: "Infused with dark cherry essence and Mesh V2 heating for a bold cloud experience.",
    ultraBgText: "Integrated Power Bank for unyielding performance.",
    customerTitle: "What our customers say",
    customerSubtitle: "Real stories from real people who bought our product",
    customerBadge: "Testimonials",
    ctaBadge: "Wholesale Program",
    ctaTitle: "Interested in carrying our product?",
    ctaDesc: "JOHNNY BOY provides certain retailers across the country the opportunity to carry its products subject to requirements.",
  };

  useEffect(() => {
    const timeoutId = window.setTimeout(() => {
      setMounted(true);
    }, 0);
    return () => window.clearTimeout(timeoutId);
  }, []);

  useEffect(() => {
    const fetchContent = async () => {
      try {
        const res = await fetch("/api/content", { cache: "no-store" });
        const data = await res.json();
        if (data) {
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
          setCustomerSubtitle(data.customerSubtitle || DEFAULTS.customerSubtitle);
          setCustomerBadge(data.customerBadge || DEFAULTS.customerBadge);
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

  const saveContent = async () => {
    setIsSaving(true);
    try {
      const cleanData = {
        heroContent: heroContent.trim(),
        title: title.trim(),
        subtitle: subtitle.trim(),
        badge: badge.trim(),
        bgText: bgText.trim(),
        stat1Label: stat1Label.trim(),
        stat1Value: stat1Value.trim(),
        stat2Label: stat2Label.trim(),
        stat2Value: stat2Value.trim(),
        stat3Label: stat3Label.trim(),
        stat3Value: stat3Value.trim(),
        ultraTitle: ultraTitle.trim(),
        ultraDesc: ultraDesc.trim(),
        ultraBgText: ultraBgText.trim(),
        customerTitle: customerTitle.trim(),
        customerSubtitle: customerSubtitle.trim(),
        customerBadge: customerBadge.trim(),
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
    } catch {
      alert("Error saving data!");
    } finally {
      setIsSaving(false);
    }
  };

  const resetToDefaults = async () => {
    if (!window.confirm("Are you sure? This will revert all fields to their original default text.")) return;

    setHeroContent(DEFAULTS.heroContent);
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
    setUltraTitle(DEFAULTS.ultraTitle);
    setUltraDesc(DEFAULTS.ultraDesc);
    setUltraBgText(DEFAULTS.ultraBgText);
    setCustomerTitle(DEFAULTS.customerTitle);
    setCustomerSubtitle(DEFAULTS.customerSubtitle);
    setCustomerBadge(DEFAULTS.customerBadge);
    setCtaBadge(DEFAULTS.ctaBadge);
    setCtaTitle(DEFAULTS.ctaTitle);
    setCtaDesc(DEFAULTS.ctaDesc);

    setIsSaving(true);
    try {
      const res = await fetch("/api/content", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(
          Object.fromEntries(
            Object.entries(DEFAULTS).map(([k, v]) => [k, v.trim()])
          )
        ),
      });
      if (res.ok) alert("Defaults restored and saved successfully!");
      else throw new Error("Save failed");
    } catch {
      alert("Reset done but save failed. Please click Publish to save.");
    } finally {
      setIsSaving(false);
    }
  };

  const inputCls =
    "w-full rounded-lg border border-slate-300 bg-white " +
    "px-[clamp(8px,2vw,12px)] py-[clamp(8px,1.5vw,12px)] " +
    "text-[clamp(13px,1.5vw,15px)] outline-none " +
    "focus:border-slate-500 focus:ring-1 focus:ring-slate-400 transition";

  const textareaCls =
    inputCls + " resize-y min-h-[clamp(70px,12vw,90px)]";

  const labelCls =
    "block mb-2 font-semibold text-[clamp(12px,1.4vw,14px)] text-slate-700";

  const sectionPad = "p-[clamp(16px,3vw,30px)]";

  const fieldGap = "mt-[clamp(14px,2.5vw,20px)]";

  if (!mounted) return null;
  if (loading)
    return (
      <div className="p-10 text-center font-sans text-slate-500">
        Loading Content Manager...
      </div>
    );

  return (
    <div className="font-sans text-slate-800 max-w-[1000px] mx-auto px-[clamp(12px,4vw,20px)] py-[clamp(16px,4vw,40px)]">

      <div className="flex flex-wrap items-center justify-between gap-[clamp(10px,2vw,16px)] mb-[clamp(24px,4vw,40px)] pb-[clamp(14px,2.5vw,20px)] border-b-2 border-slate-100">
        <div>
          <h1 className="m-0 font-bold text-[clamp(18px,3.5vw,28px)]">
            Website Content Manager
          </h1>
          <p className="mt-1 text-[clamp(12px,1.5vw,14px)] text-slate-500">
            Managing dynamic content while keeping original styles.
          </p>
        </div>

        <div className="flex items-center gap-[clamp(8px,1.5vw,10px)]">
          <button
            onClick={resetToDefaults}
            disabled={isSaving}
            className="
              whitespace-nowrap rounded-lg border border-[#e2bf32] bg-transparent
              px-[clamp(14px,2.5vw,25px)] py-[clamp(10px,2vw,15px)]
              text-[clamp(12px,1.4vw,14px)] font-bold text-[#e2bf32]
              cursor-pointer hover:bg-[#e2bf3215] transition
              disabled:opacity-50 disabled:cursor-not-allowed
            "
          >
            Reset Defaults
          </button>
          <button
            onClick={saveContent}
            disabled={isSaving}
            className="
              whitespace-nowrap rounded-lg border-none bg-[#030404]
              px-[clamp(18px,3vw,35px)] py-[clamp(10px,2vw,15px)]
              text-[clamp(12px,1.4vw,14px)] font-bold text-white
              cursor-pointer hover:bg-neutral-800 transition
              disabled:bg-slate-400 disabled:cursor-not-allowed
            "
          >
            {isSaving ? "Saving..." : "Publish All Changes"}
          </button>
        </div>
      </div>

      <div className="flex flex-col gap-[clamp(24px,4vw,40px)]">

        <section className={`rounded-2xl border-2 border-[#3ac8ee55] bg-sky-50 ${sectionPad}`}>
          <h2 className="mt-0 font-bold text-[clamp(15px,2.5vw,20px)] text-[#3ac8ee]">
            0. Hero Section (Home Page Text)
          </h2>
          <div className={fieldGap}>
            <label className={labelCls}>Hero Description Text</label>
            <textarea
              value={heroContent}
              onChange={(e) => setHeroContent(e.target.value)}
              className={textareaCls}
              placeholder="Enter hero description text..."
            />
          </div>
        </section>

        <section className={`rounded-2xl border border-slate-200 bg-slate-50 ${sectionPad}`}>
          <h2 className="mt-0 font-bold text-[clamp(15px,2.5vw,20px)] text-slate-800">
            1. Flavor Aroma Section
          </h2>

          <div className={`grid grid-cols-1 sm:grid-cols-2 gap-[clamp(10px,2.5vw,20px)] ${fieldGap}`}>
            <input value={badge} onChange={(e) => setBadge(e.target.value)} placeholder="Badge" className={inputCls} />
            <input value={bgText} onChange={(e) => setBgText(e.target.value)} placeholder="BG Text" className={inputCls} />
          </div>

          <div className={fieldGap}>
            <label className={labelCls}>Title</label>
            <input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Enter title..."
              className={inputCls}
            />
          </div>

          <div className={fieldGap}>
            <label className={labelCls}>Subtitle</label>
            <textarea
              value={subtitle}
              onChange={(e) => setSubtitle(e.target.value)}
              placeholder="Enter subtitle..."
              className={textareaCls}
            />
          </div>

          <div className={`rounded-xl border border-dashed border-slate-300 bg-white p-[clamp(14px,2.5vw,20px)] mt-[clamp(18px,3vw,30px)]`}>
            <h3 className="m-0 mb-[clamp(10px,2vw,15px)] font-semibold text-[clamp(13px,1.6vw,16px)] text-slate-700">
              Flavor Profile Stats
            </h3>
            <div className="flex flex-col gap-[clamp(10px,2vw,15px)]">
              {[
                { label: stat1Label, setLabel: setStat1Label, value: stat1Value, setValue: setStat1Value, ph: "Intensity" },
                { label: stat2Label, setLabel: setStat2Label, value: stat2Value, setValue: setStat2Value, ph: "Smoothness" },
                { label: stat3Label, setLabel: setStat3Label, value: stat3Value, setValue: setStat3Value, ph: "Freshness" },
              ].map((s, i) => (
                <div key={i} className="grid grid-cols-1 sm:grid-cols-2 gap-[clamp(8px,2vw,10px)]">
                  <input value={s.label} onChange={(e) => s.setLabel(e.target.value)} placeholder={`Label (e.g. ${s.ph})`} className={inputCls} />
                  <input value={s.value} onChange={(e) => s.setValue(e.target.value)} placeholder="Value (e.g. 85%)" className={inputCls} />
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className={`rounded-2xl border-2 border-rose-100 bg-rose-50 ${sectionPad}`}>
          <h2 className="mt-0 font-bold text-[clamp(15px,2.5vw,20px)] text-rose-700">
            2. Cherry Soda Section
          </h2>
          <div className={fieldGap}>
            <label className={labelCls}>Scrolling Text (Marquee)</label>
            <input value={ultraBgText} onChange={(e) => setUltraBgText(e.target.value)} className={`${inputCls} !border-rose-200`} />
          </div>
          <div className={fieldGap}>
            <label className={labelCls}>Main Title (Plain Text)</label>
            <input value={ultraTitle} onChange={(e) => setUltraTitle(e.target.value)} placeholder="e.g. CHERRY SODA" className={`${inputCls} !border-rose-200`} />
          </div>
          <div className={fieldGap}>
            <label className={labelCls}>Description</label>
            <textarea value={ultraDesc} onChange={(e) => setUltraDesc(e.target.value)} className={`${textareaCls} !border-rose-200`} />
          </div>
        </section>

        <section className={`rounded-2xl border border-gray-200 bg-white ${sectionPad}`}>
          <h2 className="mt-0 font-bold text-[clamp(15px,2.5vw,20px)] text-gray-900">
            3. Happy Customers Section
          </h2>
          <div className={fieldGap}>
            <label className={labelCls}>Title (Last word will be Gradient)</label>
            <input value={customerTitle} onChange={(e) => setCustomerTitle(e.target.value)} className={inputCls} />
          </div>
          <div className={fieldGap}>
            <label className={labelCls}>Subtitle</label>
            <textarea value={customerSubtitle} onChange={(e) => setCustomerSubtitle(e.target.value)} className={textareaCls} />
          </div>
        </section>

        <section className={`rounded-2xl border border-[#7A7D8F] mb-12 bg-sky-50 ${sectionPad}`}>
          <h2 className="mt-0 font-bold text-[clamp(15px,2.5vw,20px)] text-sky-700">
            4. Wholesale CTA Section
          </h2>
          <div className={fieldGap}>
            <label className={labelCls}>Badge</label>
            <input value={ctaBadge} onChange={(e) => setCtaBadge(e.target.value)} className={`${inputCls} !border-sky-200`} />
          </div>
          <div className={fieldGap}>
            <label className={labelCls}>Main Title</label>
            <input value={ctaTitle} onChange={(e) => setCtaTitle(e.target.value)} className={`${inputCls} !border-sky-200`} />
          </div>
          <div className={fieldGap}>
            <label className={labelCls}>Description</label>
            <textarea value={ctaDesc} onChange={(e) => setCtaDesc(e.target.value)} className={`${textareaCls} !border-sky-200`} />
          </div>
        </section>

      </div>
    </div>
  );
}
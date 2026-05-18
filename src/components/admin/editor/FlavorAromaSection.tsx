"use client";

import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import Button from "@/components/ui/Button";
import { Sparkles } from "lucide-react";
import { updateFlavorAromaSection } from "@/actions/editor";
import toast from "react-hot-toast";

interface FlavorAromaData {
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
}

interface FlavorAromaSectionProps {
  initialData: FlavorAromaData;
}

export default function FlavorAromaSection({ initialData }: FlavorAromaSectionProps) {
  const [badge, setBadge] = useState(initialData.badge || "");
  const [bgText, setBgText] = useState(initialData.bgText || "");
  const [title, setTitle] = useState(initialData.title || "");
  const [subtitle, setSubtitle] = useState(initialData.subtitle || "");
  const [stat1Label, setStat1Label] = useState(initialData.stat1Label || "");
  const [stat1Value, setStat1Value] = useState(initialData.stat1Value || "");
  const [stat2Label, setStat2Label] = useState(initialData.stat2Label || "");
  const [stat2Value, setStat2Value] = useState(initialData.stat2Value || "");
  const [stat3Label, setStat3Label] = useState(initialData.stat3Label || "");
  const [stat3Value, setStat3Value] = useState(initialData.stat3Value || "");

  const [savingFlavor, setSavingFlavor] = useState(false);
  const [originalFlavor, setOriginalFlavor] = useState<FlavorAromaData>(initialData);

  const isFlavorChanged =
    badge !== originalFlavor.badge ||
    bgText !== originalFlavor.bgText ||
    title !== originalFlavor.title ||
    subtitle !== originalFlavor.subtitle ||
    stat1Label !== originalFlavor.stat1Label ||
    stat1Value !== originalFlavor.stat1Value ||
    stat2Label !== originalFlavor.stat2Label ||
    stat2Value !== originalFlavor.stat2Value ||
    stat3Label !== originalFlavor.stat3Label ||
    stat3Value !== originalFlavor.stat3Value;

  const handleSaveFlavor = async () => {
    setSavingFlavor(true);
    const res = await updateFlavorAromaSection({
      badge,
      bgText,
      title,
      subtitle,
      stat1Label,
      stat1Value,
      stat2Label,
      stat2Value,
      stat3Label,
      stat3Value,
    });
    if (res.success) {
      toast.success(res.message);
      setOriginalFlavor({
        badge,
        bgText,
        title,
        subtitle,
        stat1Label,
        stat1Value,
        stat2Label,
        stat2Value,
        stat3Label,
        stat3Value,
      });
    } else {
      toast.error(res.error || "Failed to update Flavor Aroma section");
    }
    setSavingFlavor(false);
  };

  return (
    <Card variant="light" className="!rounded-[clamp(12px,2vw,20px)] !p-0 !shadow-none !border-none bg-white">
      <div className="p-[clamp(1rem,3vw,1.75rem)]">
        <div className="flex items-center gap-2 mb-[clamp(0.75rem,2vw,1.25rem)]">
          <h3 className="text-[clamp(0.9rem,2vw,1.1rem)] font-bold text-gray-900">
            Flavor Aroma Section
          </h3>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-[clamp(0.6rem,2vw,1rem)]">
          <Input
            label="Badge"
            id="badge"
            value={badge}
            onChange={(e) => setBadge(e.target.value)}
            placeholder="e.g. ENGINEERING"
          />
          <Input
            label="Background Text"
            id="bgText"
            value={bgText}
            onChange={(e) => setBgText(e.target.value)}
            placeholder="e.g. Beyond"
          />
        </div>

        <div className="mt-[clamp(0.6rem,2vw,1rem)]">
          <Input
            label="Title"
            id="flavorTitle"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Enter title..."
          />
        </div>

        <div className="mt-[clamp(0.6rem,2vw,1rem)]">
          <Textarea
            label="Subtitle"
            id="flavorSubtitle"
            value={subtitle}
            onChange={(e) => setSubtitle(e.target.value)}
            placeholder="Enter subtitle..."
          />
        </div>

        {/* Stats */}
        <div className="mt-[clamp(0.75rem,2vw,1.25rem)]">
          <p className="text-[clamp(0.7rem,1vw,0.8rem)] font-bold text-[#475569] uppercase tracking-wide mb-[clamp(0.5rem,1vw,0.75rem)]">
            Flavor Profile Stats
          </p>
          <div className="flex flex-col gap-[clamp(0.5rem,1.5vw,0.75rem)]">
            {[
              {
                label: stat1Label,
                setLabel: setStat1Label,
                value: stat1Value,
                setValue: setStat1Value,
                ph: "Intensity",
              },
              {
                label: stat2Label,
                setLabel: setStat2Label,
                value: stat2Value,
                setValue: setStat2Value,
                ph: "Smoothness",
              },
              {
                label: stat3Label,
                setLabel: setStat3Label,
                value: stat3Value,
                setValue: setStat3Value,
                ph: "Freshness",
              },
            ].map((s, i) => (
              <div
                key={i}
                className="grid grid-cols-1 sm:grid-cols-2 gap-[clamp(0.5rem,1.5vw,0.75rem)]"
              >
                <Input
                  value={s.label}
                  onChange={(e) => s.setLabel(e.target.value)}
                  placeholder={`Label (e.g. ${s.ph})`}
                />
                <Input
                  value={s.value}
                  onChange={(e) => s.setValue(e.target.value)}
                  placeholder="Value (e.g. 85%)"
                />
              </div>
            ))}
          </div>
        </div>

        <div className="mt-[clamp(0.75rem,2vw,1rem)]">
          <Button
            variant="secondary"
            className="w-full"
            isLoading={savingFlavor}
            disabled={savingFlavor || !isFlavorChanged}
            onClick={handleSaveFlavor}
          >
            Update Flavor Aroma
          </Button>
        </div>
      </div>
    </Card>
  );
}

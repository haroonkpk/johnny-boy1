"use client";

import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import Button from "@/components/ui/Button";
import { Type } from "lucide-react";
import { updateHeroSection } from "@/actions/editor";
import toast from "react-hot-toast";

interface HeroSectionProps {
  initialContent: string;
}

export default function HeroSection({ initialContent }: HeroSectionProps) {
  const [heroContent, setHeroContent] = useState(initialContent || "");
  const [savingHero, setSavingHero] = useState(false);
  const [originalHero, setOriginalHero] = useState(initialContent || "");

  const isHeroChanged = heroContent !== originalHero;

  const handleSaveHero = async () => {
    setSavingHero(true);
    const res = await updateHeroSection({ heroContent });
    if (res.success) {
      toast.success(res.message);
      setOriginalHero(heroContent);
    } else {
      toast.error(res.error || "Failed to update Hero section");
    }
    setSavingHero(false);
  };

  return (
    <Card variant="light" className="!rounded-[clamp(12px,2vw,20px)] !p-0 !shadow-none !border-none bg-white">
      <div className="p-[clamp(1rem,3vw,1.75rem)]">
        <div className="flex items-center gap-2 mb-[clamp(0.75rem,2vw,1.25rem)]">
          <h3 className="text-[clamp(0.9rem,2vw,1.1rem)] font-bold text-gray-900">
            Hero Section
          </h3>
        </div>

        <Textarea
          label="Hero Description Text"
          id="heroContent"
          value={heroContent}
          onChange={(e) => setHeroContent(e.target.value)}
          placeholder="Enter hero description text..."
        />

        <div className="mt-[clamp(0.75rem,2vw,1rem)]">
          <Button
            variant="secondary"
            className="w-full"
            isLoading={savingHero}
            disabled={savingHero || !isHeroChanged}
            onClick={handleSaveHero}
          >
            Update Hero
          </Button>
        </div>
      </div>
    </Card>
  );
}

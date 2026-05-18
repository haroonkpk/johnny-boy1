"use client";

import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import Button from "@/components/ui/Button";
import { Cherry } from "lucide-react";
import { updateCherrySodaSection } from "@/actions/editor";
import toast from "react-hot-toast";

interface CherrySodaData {
  ultraTitle: string;
  ultraDesc: string;
  ultraBgText: string;
}

interface CherrySodaSectionProps {
  initialData: CherrySodaData;
}

export default function CherrySodaSection({ initialData }: CherrySodaSectionProps) {
  const [ultraTitle, setUltraTitle] = useState(initialData.ultraTitle || "");
  const [ultraDesc, setUltraDesc] = useState(initialData.ultraDesc || "");
  const [ultraBgText, setUltraBgText] = useState(initialData.ultraBgText || "");

  const [savingCherry, setSavingCherry] = useState(false);
  const [originalCherry, setOriginalCherry] = useState<CherrySodaData>(initialData);

  const isCherryChanged =
    ultraTitle !== originalCherry.ultraTitle ||
    ultraDesc !== originalCherry.ultraDesc ||
    ultraBgText !== originalCherry.ultraBgText;

  const handleSaveCherry = async () => {
    setSavingCherry(true);
    const res = await updateCherrySodaSection({
      ultraTitle,
      ultraDesc,
      ultraBgText,
    });
    if (res.success) {
      toast.success(res.message);
      setOriginalCherry({
        ultraTitle,
        ultraDesc,
        ultraBgText,
      });
    } else {
      toast.error(res.error || "Failed to update Cherry Soda section");
    }
    setSavingCherry(false);
  };

  return (
    <Card variant="light" className="!rounded-[clamp(12px,2vw,20px)] !p-0 !shadow-none !border-none bg-white">
      <div className="p-[clamp(1rem,3vw,1.75rem)]">
        <div className="flex items-center gap-2 mb-[clamp(0.75rem,2vw,1.25rem)]">
          <h3 className="text-[clamp(0.9rem,2vw,1.1rem)] font-bold text-gray-900">
            Cherry Soda Section
          </h3>
        </div>

        <div className="flex flex-col gap-[clamp(0.6rem,2vw,1rem)]">
          <Input
            label="Scrolling Text (Marquee)"
            id="ultraBgText"
            value={ultraBgText}
            onChange={(e) => setUltraBgText(e.target.value)}
          />
          <Input
            label="Main Title"
            id="ultraTitle"
            value={ultraTitle}
            onChange={(e) => setUltraTitle(e.target.value)}
            placeholder="e.g. CHERRY SODA"
          />
          <Textarea
            label="Description"
            id="ultraDesc"
            value={ultraDesc}
            onChange={(e) => setUltraDesc(e.target.value)}
          />
        </div>

        <div className="mt-[clamp(0.75rem,2vw,1rem)]">
          <Button
            variant="secondary"
            className="w-full"
            isLoading={savingCherry}
            disabled={savingCherry || !isCherryChanged}
            onClick={handleSaveCherry}
          >
            Update Cherry Soda
          </Button>
        </div>
      </div>
    </Card>
  );
}

"use client";

import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import Button from "@/components/ui/Button";
import { updateLocalSeriesSection } from "@/actions/editor";
import toast from "react-hot-toast";

interface LocalSeriesData {
  localseriesTitle: string;
  localseriesSubtitle: string;
  localseriesBadge: string;
}

interface LocalSeriesSectionProps {
  initialData: LocalSeriesData;
}

export default function LocalSeriesSection({ initialData }: LocalSeriesSectionProps) {
  const [localseriesTitle, setLocalseriesTitle] = useState(initialData.localseriesTitle || "");
  const [localseriesSubtitle, setLocalseriesSubtitle] = useState(initialData.localseriesSubtitle || "");
  const [localseriesBadge, setLocalseriesBadge] = useState(initialData.localseriesBadge || "");

  const [saving, setSaving] = useState(false);
  const [originalData, setOriginalData] = useState<LocalSeriesData>(initialData);

  const isChanged =
    localseriesTitle !== originalData.localseriesTitle ||
    localseriesSubtitle !== originalData.localseriesSubtitle ||
    localseriesBadge !== originalData.localseriesBadge;

  const handleSave = async () => {
    setSaving(true);
    const res = await updateLocalSeriesSection({
      localseriesTitle,
      localseriesSubtitle,
      localseriesBadge,
    });
    if (res.success) {
      toast.success(res.message);
      setOriginalData({
        localseriesTitle,
        localseriesSubtitle,
        localseriesBadge,
      });
    } else {
      toast.error(res.error || "Failed to update Local Series page content");
    }
    setSaving(false);
  };

  return (
    <Card variant="light" className="!rounded-[clamp(12px,2vw,20px)] !p-0 !shadow-none !border-none bg-white">
      <div className="p-[clamp(1rem,3vw,1.75rem)]">
        <div className="flex items-center gap-2 mb-[clamp(0.75rem,2vw,1.25rem)]">
          <h3 className="text-[clamp(0.9rem,2vw,1.1rem)] font-bold text-gray-900">
            Local Series Page Hero
          </h3>
        </div>

        <div className="flex flex-col gap-[clamp(0.6rem,2vw,1rem)]">
          <Input
            label="Badge"
            id="localseriesBadge"
            value={localseriesBadge}
            onChange={(e) => setLocalseriesBadge(e.target.value)}
          />
          <Input
            label="Main Title"
            id="localseriesTitle"
            value={localseriesTitle}
            onChange={(e) => setLocalseriesTitle(e.target.value)}
          />
          <Textarea
            label="Subtitle / Description"
            id="localseriesSubtitle"
            value={localseriesSubtitle}
            onChange={(e) => setLocalseriesSubtitle(e.target.value)}
          />
        </div>

        <div className="mt-[clamp(0.75rem,2vw,1rem)]">
          <Button
            variant="secondary"
            className="w-full"
            isLoading={saving}
            disabled={saving || !isChanged}
            onClick={handleSave}
          >
            Update Local Series Content
          </Button>
        </div>
      </div>
    </Card>
  );
}

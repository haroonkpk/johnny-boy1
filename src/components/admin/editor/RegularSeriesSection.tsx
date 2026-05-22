"use client";

import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import Button from "@/components/ui/Button";
import { updateRegularSeriesSection } from "@/actions/editor";
import toast from "react-hot-toast";

interface RegularSeriesData {
  regularseriesTitle: string;
  regularseriesSubtitle: string;
  regularseriesBadge: string;
}

interface RegularSeriesSectionProps {
  initialData: RegularSeriesData;
}

export default function RegularSeriesSection({ initialData }: RegularSeriesSectionProps) {
  const [regularseriesTitle, setRegularseriesTitle] = useState(initialData.regularseriesTitle || "");
  const [regularseriesSubtitle, setRegularseriesSubtitle] = useState(initialData.regularseriesSubtitle || "");
  const [regularseriesBadge, setRegularseriesBadge] = useState(initialData.regularseriesBadge || "");

  const [saving, setSaving] = useState(false);
  const [originalData, setOriginalData] = useState<RegularSeriesData>(initialData);

  const isChanged =
    regularseriesTitle !== originalData.regularseriesTitle ||
    regularseriesSubtitle !== originalData.regularseriesSubtitle ||
    regularseriesBadge !== originalData.regularseriesBadge;

  const handleSave = async () => {
    setSaving(true);
    const res = await updateRegularSeriesSection({
      regularseriesTitle,
      regularseriesSubtitle,
      regularseriesBadge,
    });
    if (res.success) {
      toast.success(res.message);
      setOriginalData({
        regularseriesTitle,
        regularseriesSubtitle,
        regularseriesBadge,
      });
    } else {
      toast.error(res.error || "Failed to update Regular Series page content");
    }
    setSaving(false);
  };

  return (
    <Card variant="light" className="!rounded-[clamp(12px,2vw,20px)] !p-0 !shadow-none !border-none bg-white">
      <div className="p-[clamp(1rem,3vw,1.75rem)]">
        <div className="flex items-center gap-2 mb-[clamp(0.75rem,2vw,1.25rem)]">
          <h3 className="text-[clamp(0.9rem,2vw,1.1rem)] font-bold text-gray-900">
            Regular Series Page Hero
          </h3>
        </div>

        <div className="flex flex-col gap-[clamp(0.6rem,2vw,1rem)]">
          <Input
            label="Badge"
            id="regularseriesBadge"
            value={regularseriesBadge}
            onChange={(e) => setRegularseriesBadge(e.target.value)}
          />
          <Input
            label="Main Title"
            id="regularseriesTitle"
            value={regularseriesTitle}
            onChange={(e) => setRegularseriesTitle(e.target.value)}
          />
          <Textarea
            label="Subtitle / Description"
            id="regularseriesSubtitle"
            value={regularseriesSubtitle}
            onChange={(e) => setRegularseriesSubtitle(e.target.value)}
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
            Update Regular Series Content
          </Button>
        </div>
      </div>
    </Card>
  );
}

"use client";

import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import Button from "@/components/ui/Button";
import { updateReviewSection } from "@/actions/editor";
import toast from "react-hot-toast";

interface ReviewData {
  reviewTitle: string;
  reviewSubtitle: string;
  reviewBadge: string;
}

interface ReviewSectionProps {
  initialData: ReviewData;
}

export default function ReviewSection({ initialData }: ReviewSectionProps) {
  const [reviewTitle, setReviewTitle] = useState(initialData.reviewTitle || "");
  const [reviewSubtitle, setReviewSubtitle] = useState(initialData.reviewSubtitle || "");
  const [reviewBadge, setReviewBadge] = useState(initialData.reviewBadge || "");

  const [saving, setSaving] = useState(false);
  const [originalData, setOriginalData] = useState<ReviewData>(initialData);

  const isChanged =
    reviewTitle !== originalData.reviewTitle ||
    reviewSubtitle !== originalData.reviewSubtitle ||
    reviewBadge !== originalData.reviewBadge;

  const handleSave = async () => {
    setSaving(true);
    const res = await updateReviewSection({
      reviewTitle,
      reviewSubtitle,
      reviewBadge,
    });
    if (res.success) {
      toast.success(res.message);
      setOriginalData({
        reviewTitle,
        reviewSubtitle,
        reviewBadge,
      });
    } else {
      toast.error(res.error || "Failed to update Review page content");
    }
    setSaving(false);
  };

  return (
    <Card variant="light" className="!rounded-[clamp(12px,2vw,20px)] !p-0 !shadow-none !border-none bg-white">
      <div className="p-[clamp(1rem,3vw,1.75rem)]">
        <div className="flex items-center gap-2 mb-[clamp(0.75rem,2vw,1.25rem)]">
          <h3 className="text-[clamp(0.9rem,2vw,1.1rem)] font-bold text-gray-900">
            Review Page Hero
          </h3>
        </div>

        <div className="flex flex-col gap-[clamp(0.6rem,2vw,1rem)]">
          <Input
            label="Badge"
            id="reviewBadge"
            value={reviewBadge}
            onChange={(e) => setReviewBadge(e.target.value)}
          />
          <Input
            label="Main Title"
            id="reviewTitle"
            value={reviewTitle}
            onChange={(e) => setReviewTitle(e.target.value)}
          />
          <Textarea
            label="Subtitle / Description"
            id="reviewSubtitle"
            value={reviewSubtitle}
            onChange={(e) => setReviewSubtitle(e.target.value)}
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
            Update Review Content
          </Button>
        </div>
      </div>
    </Card>
  );
}

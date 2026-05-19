"use client";

import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import Button from "@/components/ui/Button";
import { updateProductSection } from "@/actions/editor"; 
import toast from "react-hot-toast";

interface ProductSectionData {
  productBadge: string;
  productTitle: string;
  productSubtitle: string;
  productBgText: string;
}

interface ProductSectionProps {
  initialData: ProductSectionData;
}

export default function ProductSection({ initialData }: ProductSectionProps) {
  const [badge, setBadge] = useState(initialData.productBadge || "");
  const [title, setTitle] = useState(initialData.productTitle || "");
  const [subtitle, setSubtitle] = useState(initialData.productSubtitle || "");
  const [bgText, setBgText] = useState(initialData.productBgText || "");

  const [saving, setSaving] = useState(false);
  const [originalData, setOriginalData] = useState<ProductSectionData>(initialData);

  const isChanged =
    badge !== originalData.productBadge ||
    title !== originalData.productTitle ||
    subtitle !== originalData.productSubtitle ||
    bgText !== originalData.productBgText;

  const handleSave = async () => {
    setSaving(true);
    try {
      const res = await updateProductSection({
        productBadge: badge,
        productTitle: title,
        productSubtitle: subtitle,
        productBgText: bgText,
      });

      if (res.success) {
        toast.success(res.message || "Product section updated!");
        setOriginalData({
          productBadge: badge,
          productTitle: title,
          productSubtitle: subtitle,
          productBgText: bgText,
        });
      } else {
        toast.error(res.error || "Failed to update Product section");
      }
    } catch (err) {
      console.error(err);
      toast.error("Something went wrong");
    } finally {
      setSaving(false);
    }
  };

  return (
    <Card variant="light" className="!rounded-[clamp(12px,2vw,20px)] !p-0 !shadow-none !border-none bg-white">
      <div className="p-[clamp(1rem,3vw,1.75rem)]">
        <div className="flex items-center gap-2 mb-[clamp(0.75rem,2vw,1.25rem)]">
          <h3 className="text-[clamp(0.9rem,2vw,1.1rem)] font-bold text-gray-900">
            Explore Products Section
          </h3>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-[clamp(0.6rem,2vw,1rem)]">
          <Input
            label="Badge"
            id="productBadge"
            value={badge}
            onChange={(e) => setBadge(e.target.value)}
            placeholder="e.g. Collection"
          />
          <Input
            label="Moving Background Text"
            id="productBgText"
            value={bgText}
            onChange={(e) => setBgText(e.target.value)}
            placeholder="e.g. PREMIUM VAPES"
          />
        </div>

        <div className="mt-[clamp(0.6rem,2vw,1rem)]">
          <Input
            label="Title"
            id="productTitle"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Enter title (e.g. Explore Our Products)"
          />
        </div>

        <div className="mt-[clamp(0.6rem,2vw,1rem)]">
          <Textarea
            label="Subtitle"
            id="productSubtitle"
            value={subtitle}
            onChange={(e) => setSubtitle(e.target.value)}
            placeholder="Enter subtitle..."
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
            Update Product Section
          </Button>
        </div>
      </div>
    </Card>
  );
}
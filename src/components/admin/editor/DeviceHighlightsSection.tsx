
"use client";

import React, { useState, useMemo } from "react";
import { updateDeviceHighlightsSection } from "@/actions/editor";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import Button from "@/components/ui/Button";
import toast from "react-hot-toast";

export default function DeviceHighlightsSection({ initialData }: { initialData: any }) {
  // 1. Local State
  const [data, setData] = useState({
    highlightTitle: initialData?.highlightTitle || "",
    highlightSubtitle: initialData?.highlightSubtitle || "",
    highlightsList: initialData?.highlightsList || []
  });

  const [saving, setSaving] = useState(false);
  const [originalData] = useState(initialData);

  // 2. Check if data is changed (Same pattern as FlavorAroma)
  const isChanged = useMemo(() => {
    return JSON.stringify(data) !== JSON.stringify(originalData);
  }, [data, originalData]);

  const handleSave = async () => {
    setSaving(true);
    try {
      const res = await updateDeviceHighlightsSection(data);
      if (res.success) {
        // toast.success(res.message);
        toast.success(res.message || "Updated successfully");
        // Note: Yahan aap state update kar sakte hain agar backend se naya data aaye
      } else {
        toast.error(res.error || "Failed to update");
      }
    } catch (e) {
      toast.error("Something went wrong");
    } finally {
      setSaving(false);
    }
  };

  const updateItemName = (index: number, newName: string) => {
    const newItems = [...data.highlightsList];
    newItems[index] = { ...newItems[index], name: newName };
    setData({ ...data, highlightsList: newItems });
  };

  return (
    <Card variant="light" className="!rounded-[clamp(12px,2vw,20px)] !p-0 !shadow-none !border-none bg-white">
      <div className="p-[clamp(1rem,3vw,1.75rem)]">
        <div className="flex items-center gap-2 mb-[clamp(0.75rem,2vw,1.25rem)]">
          <h3 className="text-[clamp(0.9rem,2vw,1.1rem)] font-bold text-gray-900">
            Device Highlights Editor
          </h3>
        </div>

        <div className="space-y-[clamp(0.6rem,2vw,1rem)]">
          <Input
            label="Section Title"
            value={data.highlightTitle}
            onChange={(e) => setData({ ...data, highlightTitle: e.target.value })}
            placeholder="Enter title..."
          />
          <Textarea
            label="Section Subtitle"
            value={data.highlightSubtitle}
            onChange={(e) => setData({ ...data, highlightSubtitle: e.target.value })}
            placeholder="Enter subtitle..."
          />
        </div>

        <div className="mt-[clamp(0.75rem,2vw,1.25rem)]">
          <p className="text-[clamp(0.7rem,1vw,0.8rem)] font-bold text-[#475569] uppercase tracking-wide mb-[clamp(0.5rem,1vw,0.75rem)]">
            Items List
          </p>
          <div className="space-y-[clamp(0.5rem,1.5vw,0.75rem)]">
            {data.highlightsList.map((item: any, index: number) => (
              <div key={index} className="flex gap-3 items-center p-3 bg-gray-50 rounded-[12px] border border-gray-100">
                <div className="w-10 h-10 flex items-center justify-center bg-white border border-gray-200 rounded-lg shrink-0">
                  <img src={item.iconUrl} alt="icon" className="w-6 h-6 object-contain" />
                </div>
                <Input
                  value={item.name}
                  onChange={(e) => updateItemName(index, e.target.value)}
                  placeholder="Item Name"
                  className="bg-white"
                />
              </div>
            ))}
          </div>
        </div>

        <div className="mt-[clamp(0.75rem,2vw,1rem)]">
          <Button
            variant="secondary"
            className="w-full"
            isLoading={saving}
            // Button tabhi enabled hoga jab koi change hoga (isChanged check)
            disabled={saving || !isChanged}
            onClick={handleSave}
          >
            Update Device Highlights
          </Button>
        </div>
      </div>
    </Card>
  );
}

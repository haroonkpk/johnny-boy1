"use client";

import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import Button from "@/components/ui/Button";
import toast from "react-hot-toast";
import { updateRegularPageSection } from "@/actions/editor";

export default function RegularPageEditor({ initialData }: any) {
  const [title, setTitle] = useState(initialData?.regularHeroTitle || "");
  const [subtitle, setSubtitle] = useState(initialData?.regularHeroSubtitle || "");
  const [badge, setBadge] = useState(initialData?.regularHeroBadge || "");

  const [saving, setSaving] = useState(false);

  const handleSave = async () => {
    setSaving(true);

    try {
      const res = await updateRegularPageSection({
        title,
        subtitle,
        badge,
      });

      if (res?.success) {
        toast.success(res?.message || "Updated successfully");
      } else {
        toast.error(res?.error || "Something went wrong");
      }
    } catch (err) {
      toast.error("Network error");
      console.error(err);
    }

    setSaving(false);
  };

  return (
    <Card className="p-5 bg-white">
      <h2 className="text-xl font-bold mb-4">Regular Page Hero Editor</h2>

      <Input label="Badge" value={badge} onChange={(e) => setBadge(e.target.value)} />

      <Input label="Title" value={title} onChange={(e) => setTitle(e.target.value)} />

      <Input label="Subtitle" value={subtitle} onChange={(e) => setSubtitle(e.target.value)} />

      <Button className="mt-4 w-full" onClick={handleSave} isLoading={saving}>
        Update Hero
      </Button>
    </Card>
  );
}
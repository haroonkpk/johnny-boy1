"use client";

import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import Button from "@/components/ui/Button";
import { updateContactSection } from "@/actions/editor";
import toast from "react-hot-toast";

interface ContactData {
  contactTitle: string;
  contactSubtitle: string;
  contactBadge: string;
}

interface ContactSectionProps {
  initialData: ContactData;
}

export default function ContactSection({ initialData }: ContactSectionProps) {
  const [contactTitle, setContactTitle] = useState(initialData.contactTitle || "");
  const [contactSubtitle, setContactSubtitle] = useState(initialData.contactSubtitle || "");
  const [contactBadge, setContactBadge] = useState(initialData.contactBadge || "");

  const [saving, setSaving] = useState(false);
  const [originalData, setOriginalData] = useState<ContactData>(initialData);

  const isChanged =
    contactTitle !== originalData.contactTitle ||
    contactSubtitle !== originalData.contactSubtitle ||
    contactBadge !== originalData.contactBadge;

  const handleSave = async () => {
    setSaving(true);
    const res = await updateContactSection({
      contactTitle,
      contactSubtitle,
      contactBadge,
    });
    if (res.success) {
      toast.success(res.message);
      setOriginalData({
        contactTitle,
        contactSubtitle,
        contactBadge,
      });
    } else {
      toast.error(res.error || "Failed to update Contact page content");
    }
    setSaving(false);
  };

  return (
    <Card variant="light" className="!rounded-[clamp(12px,2vw,20px)] !p-0 !shadow-none !border-none bg-white  mb-20 md:bottom-0">
      <div className="p-[clamp(1rem,3vw,1.75rem)]">
        <div className="flex items-center gap-2 mb-[clamp(0.75rem,2vw,1.25rem)]">
          <h3 className="text-[clamp(0.9rem,2vw,1.1rem)] font-bold text-gray-900">
            Contact Page Hero
          </h3>
        </div>

        <div className="flex flex-col gap-[clamp(0.6rem,2vw,1rem)]">
          <Input
            label="Badge"
            id="contactBadge"
            value={contactBadge}
            onChange={(e) => setContactBadge(e.target.value)}
          />
          <Input
            label="Main Title"
            id="contactTitle"
            value={contactTitle}
            onChange={(e) => setContactTitle(e.target.value)}
          />
          <Textarea
            label="Subtitle / Description"
            id="contactSubtitle"
            value={contactSubtitle}
            onChange={(e) => setContactSubtitle(e.target.value)}
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
            Update Contact Content
          </Button>
        </div>
      </div>
    </Card>
  );
}

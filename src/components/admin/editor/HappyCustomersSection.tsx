"use client";

import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import Button from "@/components/ui/Button";
import { Users } from "lucide-react";
import { updateHappyCustomersSection } from "@/actions/editor";
import toast from "react-hot-toast";

interface HappyCustomersData {
  customerTitle: string;
  customerSubtitle: string;
  customerBadge: string;
}

interface HappyCustomersSectionProps {
  initialData: HappyCustomersData;
}

export default function HappyCustomersSection({ initialData }: HappyCustomersSectionProps) {
  const [customerTitle, setCustomerTitle] = useState(initialData.customerTitle || "");
  const [customerSubtitle, setCustomerSubtitle] = useState(initialData.customerSubtitle || "");
  const [customerBadge, setCustomerBadge] = useState(initialData.customerBadge || "");

  const [savingCustomers, setSavingCustomers] = useState(false);
  const [originalCustomers, setOriginalCustomers] = useState<HappyCustomersData>(initialData);

  const isCustomersChanged =
    customerTitle !== originalCustomers.customerTitle ||
    customerSubtitle !== originalCustomers.customerSubtitle ||
    customerBadge !== originalCustomers.customerBadge;

  const handleSaveCustomers = async () => {
    setSavingCustomers(true);
    const res = await updateHappyCustomersSection({
      customerTitle,
      customerSubtitle,
      customerBadge,
    });
    if (res.success) {
      toast.success(res.message);
      setOriginalCustomers({
        customerTitle,
        customerSubtitle,
        customerBadge,
      });
    } else {
      toast.error(res.error || "Failed to update Customers section");
    }
    setSavingCustomers(false);
  };

  return (
    <Card variant="light" className="!rounded-[clamp(12px,2vw,20px)] !p-0 !shadow-none !border-none bg-white">
      <div className="p-[clamp(1rem,3vw,1.75rem)]">
        <div className="flex items-center gap-2 mb-[clamp(0.75rem,2vw,1.25rem)]">
          <h3 className="text-[clamp(0.9rem,2vw,1.1rem)] font-bold text-gray-900">
            Happy Customers Section
          </h3>
        </div>

        <div className="flex flex-col gap-[clamp(0.6rem,2vw,1rem)]">
          <Input
            label="Badge"
            id="customerBadge"
            value={customerBadge}
            onChange={(e) => setCustomerBadge(e.target.value)}
          />
          <Input
            label="Title (Last word gets gradient)"
            id="customerTitle"
            value={customerTitle}
            onChange={(e) => setCustomerTitle(e.target.value)}
          />
          <Textarea
            label="Subtitle"
            id="customerSubtitle"
            value={customerSubtitle}
            onChange={(e) => setCustomerSubtitle(e.target.value)}
          />
        </div>

        <div className="mt-[clamp(0.75rem,2vw,1rem)]">
          <Button
            variant="secondary"
            className="w-full"
            isLoading={savingCustomers}
            disabled={savingCustomers || !isCustomersChanged}
            onClick={handleSaveCustomers}
          >
            Update Customers
          </Button>
        </div>
      </div>
    </Card>
  );
}

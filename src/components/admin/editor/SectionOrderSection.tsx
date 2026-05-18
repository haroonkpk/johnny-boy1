"use client";

import { useState, useCallback } from "react";
import { Card } from "@/components/ui/card";
import Button from "@/components/ui/Button";
import {
  GripVertical,
  Eye,
  EyeOff,
} from "lucide-react";
import { updateSectionOrder } from "@/actions/editor";
import toast from "react-hot-toast";

// ── Section label map for the reorder panel ──
const SECTION_LABELS: Record<string, { label: string }> = {
  hero: { label: "Hero" },
  techSpecs: { label: "Flavor Aroma" },
  features: { label: "Featured Products" },
  movement: { label: "Cherry Soda" },
  happyCustomers: { label: "Happy Customers" },
  homeCta: { label: "Wholesale CTA" },
};

interface SectionOrderData {
  sectionOrder: string[];
  hiddenSections: string[];
}

interface SectionOrderSectionProps {
  initialData: SectionOrderData;
}

export default function SectionOrderSection({ initialData }: SectionOrderSectionProps) {
  const [sectionOrder, setSectionOrder] = useState<string[]>(initialData.sectionOrder || []);
  const [hiddenSections, setHiddenSections] = useState<string[]>(initialData.hiddenSections || []);
  
  const [savingOrder, setSavingOrder] = useState(false);
  const [originalOrder, setOriginalOrder] = useState<string[]>(initialData.sectionOrder || []);
  const [originalHiddenSections, setOriginalHiddenSections] = useState<string[]>(initialData.hiddenSections || []);

  const [dragIndex, setDragIndex] = useState<number | null>(null);
  const [dragOverIndex, setDragOverIndex] = useState<number | null>(null);
  const [touchStartIndex, setTouchStartIndex] = useState<number | null>(null);
  const [touchCurrentIndex, setTouchCurrentIndex] = useState<number | null>(null);

  const handleDragStart = useCallback((index: number) => {
    setDragIndex(index);
  }, []);

  const handleDragOver = useCallback(
    (e: React.DragEvent, index: number) => {
      e.preventDefault();
      e.dataTransfer.dropEffect = "move";
      if (dragIndex !== null && index !== dragIndex) {
        setDragOverIndex(index);
      }
    },
    [dragIndex]
  );

  const handleDrop = useCallback(
    (e: React.DragEvent, dropIndex: number) => {
      e.preventDefault();
      if (dragIndex === null || dragIndex === dropIndex) {
        setDragIndex(null);
        setDragOverIndex(null);
        return;
      }
      const newOrder = [...sectionOrder];
      const [moved] = newOrder.splice(dragIndex, 1);
      newOrder.splice(dropIndex, 0, moved);
      setSectionOrder(newOrder);
      setDragIndex(null);
      setDragOverIndex(null);
    },
    [dragIndex, sectionOrder]
  );

  const handleDragEnd = useCallback(() => {
    setDragIndex(null);
    setDragOverIndex(null);
  }, []);

  // Touch Support
  const handleTouchStart = useCallback((index: number) => {
    setTouchStartIndex(index);
    setDragIndex(index);
  }, []);

  const handleTouchMove = useCallback(
    (e: React.TouchEvent) => {
      if (touchStartIndex === null) return;
      
      const touch = e.touches[0];
      const element = document.elementFromPoint(touch.clientX, touch.clientY);
      if (!element) return;

      const cardElement = element.closest("[data-section-index]");
      if (cardElement) {
        const targetIndex = parseInt(cardElement.getAttribute("data-section-index") || "", 10);
        if (!isNaN(targetIndex) && targetIndex !== touchStartIndex) {
          setTouchCurrentIndex(targetIndex);
          setDragOverIndex(targetIndex);
        }
      }
    },
    [touchStartIndex]
  );

  const handleTouchEnd = useCallback(() => {
    if (touchStartIndex !== null && touchCurrentIndex !== null && touchStartIndex !== touchCurrentIndex) {
      const newOrder = [...sectionOrder];
      const [moved] = newOrder.splice(touchStartIndex, 1);
      newOrder.splice(touchCurrentIndex, 0, moved);
      setSectionOrder(newOrder);
    }
    setTouchStartIndex(null);
    setTouchCurrentIndex(null);
    setDragIndex(null);
    setDragOverIndex(null);
  }, [touchStartIndex, touchCurrentIndex, sectionOrder]);

  const toggleVisibility = useCallback((sectionId: string) => {
    setHiddenSections((prev) =>
      prev.includes(sectionId)
        ? prev.filter((id) => id !== sectionId)
        : [...prev, sectionId]
    );
  }, []);

  const isOrderChanged =
    JSON.stringify(sectionOrder) !== JSON.stringify(originalOrder) ||
    JSON.stringify(hiddenSections) !== JSON.stringify(originalHiddenSections);

  const handleSaveOrder = async () => {
    setSavingOrder(true);
    const res = await updateSectionOrder(sectionOrder, hiddenSections);
    if (res.success) {
      toast.success(res.message);
      setOriginalOrder(sectionOrder);
      setOriginalHiddenSections(hiddenSections);
    } else {
      toast.error(res.error || "Failed to update layout order");
    }
    setSavingOrder(false);
  };

  return (
    <Card variant="light" className="!rounded-[clamp(12px,2vw,20px)] !p-0 !shadow-none !border-none bg-white">
      <div className="p-[clamp(1rem,3vw,1.75rem)]">
        <div className="flex items-center gap-2 mb-[clamp(0.75rem,2vw,1.25rem)]">
          <h3 className="text-[clamp(0.9rem,2vw,1.1rem)] font-bold text-gray-900">
            Section Order
          </h3>
        </div>
        <p className="text-[clamp(0.7rem,1.2vw,0.8rem)] text-gray-500 mb-[clamp(0.5rem,1.5vw,1rem)]">
          Drag sections to reorder how they appear on the home page
        </p>

        <div className="flex flex-col gap-[clamp(0.35rem,1vw,0.5rem)]">
          {sectionOrder.map((sectionId, index) => {
            const info = SECTION_LABELS[sectionId];
            if (!info) return null;
            const isDragging = dragIndex === index;
            const isDragOver = dragOverIndex === index;
            const isHidden = hiddenSections.includes(sectionId);
            return (
              <Card
                key={sectionId}
                draggable
                data-section-index={index}
                onDragStart={() => handleDragStart(index)}
                onDragOver={(e: React.DragEvent<HTMLDivElement>) => handleDragOver(e, index)}
                onDrop={(e: React.DragEvent<HTMLDivElement>) => handleDrop(e, index)}
                onDragEnd={handleDragEnd}
                onTouchStart={() => handleTouchStart(index)}
                onTouchMove={handleTouchMove}
                onTouchEnd={handleTouchEnd}
                className={`
                  !rounded-[clamp(8px,1.5vw,12px)] !shadow-none !border-none
                  !p-[clamp(0.5rem,1.5vw,0.75rem)]
                  flex items-center gap-[clamp(0.5rem,1.5vw,0.75rem)]
                  transition-all duration-200 select-none
                  ${isDragging ? "opacity-40 scale-[0.97]" : isHidden ? "opacity-60 bg-gray-50/50" : "opacity-100 bg-white/60"}
                  ${isDragOver ? "!border-t-2 !border-t-black/30 bg-black/[0.04]" : ""}
                  cursor-grab active:cursor-grabbing touch-none
                `}
              >
                <GripVertical
                  size={16}
                  className="text-gray-400 shrink-0"
                />
                <span className={`flex-1 text-[clamp(0.8rem,1.5vw,0.9rem)] font-medium ${isHidden ? "text-gray-400" : "text-gray-800"}`}>
                  {info.label}
                  {isHidden && (
                    <span className="ml-2 inline-flex items-center px-1.5 py-0.5 rounded-full text-[10px] font-medium bg-gray-100 text-gray-500 border border-gray-200 select-none">
                      Hidden
                    </span>
                  )}
                </span>
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    toggleVisibility(sectionId);
                  }}
                  className="p-1 rounded-full hover:bg-black/5 active:scale-95 transition-all text-gray-400 hover:text-gray-800 cursor-pointer"
                  title={isHidden ? "Show Section" : "Hide Section"}
                >
                  {isHidden ? (
                    <EyeOff size={16} className="text-gray-400" />
                  ) : (
                    <Eye size={16} className="text-black" />
                  )}
                </button>
              </Card>
            );
          })}
        </div>

        <div className="mt-[clamp(0.75rem,2vw,1rem)]">
          <Button
            variant="secondary"
            className="w-full"
            isLoading={savingOrder}
            disabled={savingOrder || !isOrderChanged}
            onClick={handleSaveOrder}
          >
            Update Order
          </Button>
        </div>
      </div>
    </Card>
  );
}

"use client";

import { useState, useRef, useCallback } from "react";
import { Card } from "@/components/ui/card";
import Button from "@/components/ui/Button";
import { GripVertical, Eye, EyeOff } from "lucide-react";
import { updateSectionOrder } from "@/actions/editor";
import toast from "react-hot-toast";
import { cn } from "@/lib/utils";

// ── Section label map for the reorder panel ──
const SECTION_LABELS: Record<string, { label: string }> = {
  hero: { label: "Hero" },
  techSpecs: { label: "Flavor Aroma" },
  features: { label: "Featured Products" },
  movement: { label: "Cherry Soda" },
  happyCustomers: { label: "Happy Customers" },
  homeCta: { label: "Wholesale CTA" },
  deviceHighlights: { label: "Device Highlights" },
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

  // ─── Pointer drag state 
  const [draggingIndex, setDraggingIndex] = useState<number | null>(null);
  const [overIndex, setOverIndex] = useState<number | null>(null);
  const listRef = useRef<HTMLDivElement>(null);
  const pointerDragIndex = useRef<number | null>(null);

  // ─── Pointer handlers  ────
  const handlePointerDown = (index: number, e: React.PointerEvent) => {
    (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
    pointerDragIndex.current = index;
    setDraggingIndex(index);
    setOverIndex(index);
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    if (pointerDragIndex.current === null || !listRef.current) return;
    const rows = Array.from(listRef.current.querySelectorAll<HTMLElement>("[data-drag-row]"));
    for (let i = 0; i < rows.length; i++) {
      const rect = rows[i].getBoundingClientRect();
      if (e.clientY >= rect.top && e.clientY <= rect.bottom) {
        setOverIndex(i);
        break;
      }
    }
  };

  const handlePointerUp = () => {
    if (pointerDragIndex.current !== null && overIndex !== null && pointerDragIndex.current !== overIndex) {
      const updated = [...sectionOrder];
      const [moved] = updated.splice(pointerDragIndex.current, 1);
      updated.splice(overIndex, 0, moved);
      setSectionOrder(updated);
    }
    pointerDragIndex.current = null;
    setDraggingIndex(null);
    setOverIndex(null);
  };

  // ─── Toggle section visibility ──────────────────────────────────────
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
    <Card variant="light" className="!rounded-[clamp(12px,2vw,20px)] !p-0 !shadow-none !border-none bg-white mb-20 md:bottom-0">
      <div className="p-[clamp(1rem,3vw,1.75rem)]">
        <div className="flex items-center gap-2 mb-[clamp(0.75rem,2vw,1.25rem)]">
          <h3 className="text-[clamp(0.9rem,2vw,1.1rem)] font-bold text-gray-900">
            Section Order
          </h3>
        </div>
        <p className="text-[clamp(0.7rem,1.2vw,0.8rem)] text-gray-500 mb-[clamp(0.5rem,1.5vw,1rem)]">
          Drag the <GripVertical className="inline w-3.5 h-3.5 text-gray-400" /> handle to reorder sections on the home page.
        </p>

        <div
          ref={listRef}
          className="flex flex-col gap-[clamp(0.35rem,1vw,0.5rem)]"
          onPointerMove={handlePointerMove}
          onPointerUp={handlePointerUp}
          onPointerCancel={handlePointerUp}
        >
          {sectionOrder.map((sectionId, index) => {
            const info = SECTION_LABELS[sectionId];
            if (!info) return null;
            const isDragging = draggingIndex === index;
            const isOver = overIndex === index && draggingIndex !== null && draggingIndex !== index;
            const isHidden = hiddenSections.includes(sectionId);

            return (
              <Card
                key={sectionId}
                data-drag-row
                data-section-index={index}
                className={cn(
                  "!rounded-[clamp(8px,1.5vw,12px)]",
                  "!p-[clamp(0.5rem,1.5vw,0.75rem)]",
                  "flex items-center gap-[clamp(0.5rem,1.5vw,0.75rem)]",
                  "transition-all duration-100 select-none",
                  isDragging
                    ? "bg-black/5 !border-black/30 scale-[1.02] shadow-md opacity-80 !shadow-sm"
                    : isOver
                    ? "!border-black !border-dashed bg-blue-50/30 !shadow-none"
                    : isHidden
                    ? "opacity-60 bg-gray-50/50 !border-none !shadow-none"
                    : "bg-white/60 !border-none !shadow-none",
                )}
              >
                {/* Drag handle  */}
                <span
                  onPointerDown={(e) => handlePointerDown(index, e)}
                  style={{ touchAction: "none" }}
                  className={cn(
                    "flex-shrink-0 p-1 -m-1 rounded-md transition-colors",
                    isDragging
                      ? "cursor-grabbing text-black"
                      : "cursor-grab text-gray-300 hover:text-gray-600 hover:bg-gray-100"
                  )}
                >
                  <GripVertical size={18} />
                </span>

                <span className={cn(
                  "flex-1 text-[clamp(0.8rem,1.5vw,0.9rem)] font-medium",
                  isHidden ? "text-gray-400" : "text-gray-800"
                )}>
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

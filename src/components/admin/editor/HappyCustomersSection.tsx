"use client";

import { useState, useEffect, useRef } from "react";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import Button from "@/components/ui/Button";
import { updateHappyCustomersSection, updateSelectedReviewVideos } from "@/actions/editor";
import { getReviewVideos } from "@/actions/review";
import toast from "react-hot-toast";
import { CheckCircle2, Circle } from "lucide-react";
import { cn } from "@/lib/utils";

interface HappyCustomersData {
  customerTitle: string;
  customerSubtitle: string;
  customerBadge: string;
  selectedReviewVideos: string[];
}

interface HappyCustomersSectionProps {
  initialData: HappyCustomersData;
}

interface ReviewVideo {
  _id: string;
  name: string;
  role: string;
  thumbnailUrl?: string;
  videoUrl?: string;
}

export default function HappyCustomersSection({ initialData }: HappyCustomersSectionProps) {
  // ─── Text fields state ───────────────────────────────────────────────
  const [customerTitle, setCustomerTitle] = useState(initialData.customerTitle || "");
  const [customerSubtitle, setCustomerSubtitle] = useState(initialData.customerSubtitle || "");
  const [customerBadge, setCustomerBadge] = useState(initialData.customerBadge || "");
  const [savingCustomers, setSavingCustomers] = useState(false);
  const [originalCustomers, setOriginalCustomers] = useState<HappyCustomersData>(initialData);

  //  Video picker state 
  const [allVideos, setAllVideos] = useState<ReviewVideo[]>([]);
  const [selectedIds, setSelectedIds] = useState<string[]>(initialData.selectedReviewVideos || []);
  const [savingVideos, setSavingVideos] = useState(false);

  const savedIdsRef = useRef<string[]>(initialData.selectedReviewVideos || []);

  useEffect(() => {
    getReviewVideos().then((data) => setAllVideos(data || []));
  }, []);

  // ─── Text field dirty check ──────────────────────────────────────────
  const isCustomersChanged =
    customerTitle !== originalCustomers.customerTitle ||
    customerSubtitle !== originalCustomers.customerSubtitle ||
    customerBadge !== originalCustomers.customerBadge;

  const isVideosChanged =
    JSON.stringify(selectedIds) !== JSON.stringify(savedIdsRef.current);

  //  Save text fields 
  const handleSaveCustomers = async () => {
    setSavingCustomers(true);
    const res = await updateHappyCustomersSection({ customerTitle, customerSubtitle, customerBadge });
    if (res.success) {
      toast.success(res.message ?? "Customers section updated");
      setOriginalCustomers({ customerTitle, customerSubtitle, customerBadge, selectedReviewVideos: selectedIds });
    } else {
      toast.error(res.error || "Failed to update Customers section");
    }
    setSavingCustomers(false);
  };

  //  Save video selection 
  const handleSaveVideos = async () => {
    setSavingVideos(true);
    const idsToSave = [...selectedIds];
    const res = await updateSelectedReviewVideos(idsToSave);
    if (res.success) {
      savedIdsRef.current = idsToSave;
      toast.success(res.message ?? "Video selection saved");
    } else {
      toast.error(res.error || "Failed to save video selection");
    }
    setSavingVideos(false);
  };

  // ─── Toggle video selection 
  const toggleVideo = (id: string) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((v) => v !== id) : [...prev, id]
    );
  };

  const selectedVideos = selectedIds
    .map((id) => allVideos.find((v) => v._id === id))
    .filter(Boolean) as ReviewVideo[];

  const unselectedVideos = allVideos.filter((v) => !selectedIds.includes(v._id));

  return (
    <Card variant="light" className="!rounded-[clamp(12px,2vw,20px)] !p-0 !shadow-none !border-none bg-white">
      <div className="p-[clamp(1rem,3vw,1.75rem)] flex flex-col gap-[clamp(1.25rem,3vw,2rem)]">

        {/* ── Section 1: Text Fields  */}
        <div>
          <div className="flex items-center gap-2 mb-[clamp(0.75rem,2vw,1.25rem)]">
            <h3 className="text-[clamp(0.9rem,2vw,1.1rem)] font-bold text-gray-900">
              Happy Customers Section
            </h3>
          </div>
          <div className="flex flex-col gap-[clamp(0.6rem,2vw,1rem)]">
            <Input label="Badge" id="customerBadge" value={customerBadge} onChange={(e) => setCustomerBadge(e.target.value)} />
            <Input label="Title (Last word gets gradient)" id="customerTitle" value={customerTitle} onChange={(e) => setCustomerTitle(e.target.value)} />
            <Textarea label="Subtitle" id="customerSubtitle" value={customerSubtitle} onChange={(e) => setCustomerSubtitle(e.target.value)} />
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

        {/* ── Section 2: Video Picker  */}
        <div>
          <div className="border-t border-gray-100 pt-[clamp(1rem,2vw,1.5rem)]">
            <div className="mb-4">
              <h4 className="text-[clamp(0.85rem,1.5vw,1rem)] font-bold text-gray-900">
                Select Videos for Home Page
              </h4>
              <p className="text-xs text-gray-400 mt-0.5">
                Click thumbnails to select/deselect videos.
              </p>
            </div>

            {allVideos.length === 0 ? (
              <div className="flex items-center justify-center h-24 rounded-xl bg-gray-50 border border-dashed border-gray-200">
                <p className="text-sm text-gray-400">No review videos uploaded yet.</p>
              </div>
            ) : (
              <>
                {/* ── All videos row  */}
                <div className="flex flex-row gap-3 mb-6 overflow-x-auto pb-2" style={{ scrollbarWidth: "thin", scrollbarColor: "#d1d5db transparent" }}>
                  {allVideos.map((video) => {
                    const isSelected = selectedIds.includes(video._id);
                    const order = selectedIds.indexOf(video._id);
                    return (
                      <button
                        key={video._id}
                        type="button"
                        onClick={() => toggleVideo(video._id)}
                        className={cn(
                          "relative group rounded-lg overflow-hidden border-2 transition-all duration-150 flex-shrink-0 w-20",
                          isSelected
                            ? "border-black "
                            : "border-gray-200 hover:border-gray-400"
                        )}
                      >
                        {/* Thumbnail */}
                        <div className="w-full aspect-video bg-gray-100 overflow-hidden">
                          {video.thumbnailUrl ? (
                            <img
                              src={video.thumbnailUrl}
                              alt={video.name}
                              className="w-full h-full object-cover"
                            />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center bg-gray-200">
                              <span className="text-[9px] text-gray-400">No img</span>
                            </div>
                          )}
                        </div>

                        {/* Selected overlay */}
                        <div className={cn(
                          "absolute inset-0 bg-black/30 flex items-start justify-between p-1 transition-opacity",
                          isSelected ? "opacity-100" : "opacity-0 group-hover:opacity-30"
                        )}>
                          {isSelected ? (
                            <CheckCircle2 size={13} className="text-white fill-black" />
                          ) : (
                            <Circle size={13} className="text-white" />
                          )}
                          {isSelected && order >= 0 && (
                            <span className="text-[9px] font-bold bg-black text-white rounded-full w-4 h-4 flex items-center justify-center">
                              {order + 1}
                            </span>
                          )}
                        </div>
                      </button>
                    );
                  })}
                </div>

                {/* ── Selected list ── */}
                {selectedVideos.length > 0 && (
                  <div className="mb-4">
                    <p className="text-[11px] font-bold text-gray-400 uppercase tracking-widest mb-2">
                      Selected Videos
                    </p>
                    <div className="flex flex-col gap-2">
                      {selectedVideos.map((video, index) => {
                        return (
                          <div
                            key={index}
                            className="flex items-center gap-3 border rounded-xl p-2 select-none bg-gray-50 border-gray-200"
                          >
                            <div className="w-10 h-10 rounded-lg overflow-hidden flex-shrink-0 bg-gray-200">
                              {video.thumbnailUrl ? (
                                <img key={`img-${video._id}`} src={video.thumbnailUrl} alt={video.name} className="w-full h-full object-cover" />
                              ) : (
                                <div key={`no-img-${video._id}`} className="w-full h-full flex items-center justify-center text-gray-400 text-[9px]">IMG</div>
                              )}
                            </div>
                            <div className="flex-1 min-w-0">
                              <p className="text-xs font-semibold text-gray-800 truncate">{video.name}</p>
                              <p className="text-[10px] text-gray-400 truncate">{video.role}</p>
                            </div>
                            <span className="text-[10px] font-bold bg-black text-white rounded-full w-5 h-5 flex items-center justify-center flex-shrink-0">
                              {index + 1}
                            </span>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}
              </>
            )}

            <Button
              variant="secondary"
              className="w-full"
              isLoading={savingVideos}
              disabled={savingVideos || !isVideosChanged}
              onClick={handleSaveVideos}
            >
              Save Video Selection
            </Button>
          </div>
        </div>
      </div>
    </Card>
  );
}

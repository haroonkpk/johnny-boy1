"use client";
import { useState, useRef, useEffect } from "react";
import { addReviewVideoAction } from "@/actions/review"; 
import Button from "@/components/ui/Button";
import { Input } from "@/components/ui/input";
import { X, Plus } from "lucide-react";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface CreateReviewVideoFormProps {
  onSuccess: () => void;
}

export function CreateReviewVideoForm({ onSuccess }: CreateReviewVideoFormProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isUploading, setIsUploading] = useState(false);

  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [selectedThumbnail, setSelectedThumbnail] = useState<File | null>(null);
  const [thumbnailPreviewUrl, setThumbnailPreviewUrl] = useState<string | null>(null);
  const thumbnailInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => { 
    return () => {
      if (previewUrl) URL.revokeObjectURL(previewUrl);
      if (thumbnailPreviewUrl) URL.revokeObjectURL(thumbnailPreviewUrl);
    };
  }, [previewUrl, thumbnailPreviewUrl]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      const url = URL.createObjectURL(file);
      setPreviewUrl(url);
    }
  };

  const handleRemoveVideo = () => {
    setSelectedFile(null);
    if (previewUrl) {
      URL.revokeObjectURL(previewUrl);
      setPreviewUrl(null);
    }
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleThumbnailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedThumbnail(file);
      const url = URL.createObjectURL(file);
      setThumbnailPreviewUrl(url);
    }
  };

  const handleRemoveThumbnail = () => {
    setSelectedThumbnail(null);
    if (thumbnailPreviewUrl) {
      URL.revokeObjectURL(thumbnailPreviewUrl);
      setThumbnailPreviewUrl(null);
    }
    if (thumbnailInputRef.current) {
      thumbnailInputRef.current.value = "";
    }
  };

  const handleUpload = async () => {
    if (!selectedFile || !selectedThumbnail) {
      alert("Please select both a video and a thumbnail!");
      return;
    }

    setIsUploading(true);
    try {
      const formData = new FormData();
      formData.append("file", selectedFile);
      formData.append("thumbnail", selectedThumbnail);
      formData.append("name", selectedFile.name);
      formData.append("role", "");

      const res = await addReviewVideoAction(formData);
      if (res && !res.success) {
        console.error("Server Action upload returned error:", res.error);
        alert(res.error || "Upload failed!");
      } else {
        onSuccess();
        handleRemoveVideo();
        handleRemoveThumbnail();
        setIsOpen(false);
      }
    } catch (error) {
      console.error("Client caught upload exception:", error);
      alert("Upload failed! Check console for details.");
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <Card
      variant="light"
      className={cn(
        "transition-all duration-200 ease-in-out mx-auto w-full",
        isOpen
          ? "p-[clamp(1.5rem,3vw,2.5rem)]"
          : "bg-transparent shadow-none p-3 border-none"
      )}
    >
      <div
        className={cn(
          "flex items-start justify-between w-full border-gray-300",
          isOpen ? "mb-[clamp(1.5rem,3vw,2rem)] border-b pb-5" : "border-b-0 pb-0"
        )}
      >
        <div className={cn(isOpen ? "block" : "hidden")}>
          <h2 className="text-[clamp(1.25rem,2vw,1.5rem)] font-bold text-[#111827] mb-1">
            Add New Review Video
          </h2>
          <p className="text-[#64748B] text-[clamp(0.875rem,1vw,1rem)]">
            Upload review video and thumbnail.
          </p>
        </div>

        <button
          type="button"
          onClick={() => setIsOpen((prev) => !prev)}
          className={cn(
            "flex-shrink-0 flex items-center justify-center ml-auto transition-all duration-150 ease-in-out cursor-pointer",
            isOpen 
              ? "w-[clamp(3.5rem,10vw,4.5rem)] h-[clamp(2.75rem,6vw,3.25rem)] rounded-md text-black hover:bg-gray-100 border border-gray-200" 
              : "w-[clamp(4.5rem,12vw,5.5rem)] h-[clamp(3.25rem,8vw,4rem)] rounded-md bg-black text-white hover:bg-black/80"
          )}
        >
          {isOpen ? (
            <X className="w-[clamp(1.5rem,3vw,2rem)] h-[clamp(1.5rem,3vw,2rem)]" strokeWidth={2.5} />
          ) : (
            <Plus className="w-[clamp(1.75rem,4vw,2.25rem)] h-[clamp(1.75rem,4vw,2.25rem)]" strokeWidth={2.5} />
          )}
        </button>
      </div>

      {/* Expandable creation form */}
      <div className={cn(isOpen ? "block" : "hidden", "mt-6")}>
        <div className="flex flex-col gap-[clamp(1rem,2vw,1.5rem)]">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Video Upload Field */}
            <div className="flex flex-col gap-2">
              {previewUrl && (
                <div className="flex flex-col gap-2">
                  <label className="text-[clamp(0.7rem,1vw,0.8rem)] font-bold text-[#475569] uppercase tracking-wide">
                    Selected Video Preview
                  </label>
                  <div className="relative w-full max-w-md h-64 rounded-xl overflow-hidden border border-slate-200 bg-black flex items-center justify-center">
                    <video src={previewUrl} controls className="w-full h-full object-contain" />
                    <button
                      type="button"
                      onClick={handleRemoveVideo}
                      className="absolute top-2 right-2 bg-white/80 hover:bg-white text-red-500 p-1.5 rounded-full shadow-sm cursor-pointer"
                    >
                      <X size={18} strokeWidth={3} />
                    </button>
                  </div>
                </div>
              )}
              
              {!previewUrl && (
                <Input
                  ref={fileInputRef}
                  id="videoFile"
                  label="Select Video"
                  type="file"
                  accept="video/*"
                  onChange={handleFileChange}
                  className="file:bg-black file:text-white file:rounded-sm file:border-0 file:px-4 file:py-1.5 cursor-pointer"
                />
              )}
            </div>

            {/* Thumbnail Upload Field */}
            <div className="flex flex-col gap-2">
              {thumbnailPreviewUrl && (
                <div className="flex flex-col gap-2">
                  <label className="text-[clamp(0.7rem,1vw,0.8rem)] font-bold text-[#475569] uppercase tracking-wide">
                    Selected Thumbnail Preview
                  </label>
                  <div className="relative w-full max-w-md h-64 rounded-xl overflow-hidden border border-slate-200 bg-black flex items-center justify-center">
                    <img src={thumbnailPreviewUrl} alt="Thumbnail preview" className="w-full h-full object-contain" />
                    <button
                      type="button"
                      onClick={handleRemoveThumbnail}
                      className="absolute top-2 right-2 bg-white/80 hover:bg-white text-red-500 p-1.5 rounded-full shadow-sm cursor-pointer"
                    >
                      <X size={18} strokeWidth={3} />
                    </button>
                  </div>
                </div>
              )}
              
              {!thumbnailPreviewUrl && (
                <Input
                  ref={thumbnailInputRef}
                  id="thumbnailFile"
                  label="Select Thumbnail Image"
                  type="file"
                  accept="image/*"
                  onChange={handleThumbnailChange}
                  className="file:bg-black file:text-white file:rounded-sm file:border-0 file:px-4 file:py-1.5 cursor-pointer"
                />
              )}
            </div>
          </div>

          {/* Upload Button */}
          <Button 
            variant="secondary"
            className="mt-2 w-full flex items-center justify-center gap-2"
            onClick={handleUpload}
            isLoading={isUploading}
            disabled={!selectedFile || !selectedThumbnail}
          >
            Upload Video
          </Button>
        </div>
      </div>
    </Card>
  );
}

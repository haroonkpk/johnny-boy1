"use client";

import { useState, useRef } from "react";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { createProduct } from "@/actions/product";
import { X, Loader2, Plus } from "lucide-react";
import Button from "../ui/Button";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { Card } from "../ui/card";

interface CreateProductFormProps {
  onSuccess: () => void;
}

export function CreateProductForm({ onSuccess }: CreateProductFormProps) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [isOpen, setIsOpen] = useState(false);

  const formRef = useRef<HTMLFormElement>(null);

  const imageInputRef = useRef<HTMLInputElement>(null);
  const fruitsInputRef = useRef<HTMLInputElement>(null);
  const bgInputRef = useRef<HTMLInputElement>(null);

  const [previews, setPreviews] = useState<{
    image: string | null;
    fruits: string | null;
    bg: string | null;
  }>({
    image: null,
    fruits: null,
    bg: null,
  });

  const handleFileChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    field: "image" | "fruits" | "bg"
  ) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        setError(`File ${file.name} is too large. Max 5MB.`);
        e.target.value = "";
        return;
      }
      const url = URL.createObjectURL(file);
      setPreviews((prev) => ({ ...prev, [field]: url }));
      setError("");
    } else {
      setPreviews((prev) => ({ ...prev, [field]: null }));
    }
  };

  const removeImage = (field: "image" | "fruits" | "bg") => {
    setPreviews((prev) => ({ ...prev, [field]: null }));
    const refMap = {
      image: imageInputRef,
      fruits: fruitsInputRef,
      bg: bgInputRef,
    };
    const ref = refMap[field];
    if (ref.current) {
      ref.current.value = "";
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    const formData = new FormData(e.currentTarget);

    // Image validation
    const image = formData.get("image") as File;
    const fruits = formData.get("fruits") as File;
    const bg = formData.get("bg") as File;
    const comingSoon = formData.get("comingSoon") === "true";

    if (!comingSoon && (!image?.size || !fruits?.size || !bg?.size)) {
      setError("Please upload all three required images.");
      setLoading(false);
      return;
    }

    try {
      const result = await createProduct(formData);
      if (result.success) {
        onSuccess();
        formRef.current?.reset();
        setPreviews({ image: null, fruits: null, bg: null });
        setIsOpen(false);
      } else {
        setError(result.error || "Something went wrong");
      }
    } catch (err: any) {
      setError(err.message || "An unexpected error occurred");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card
      variant="light"
      className={cn(
        "transition-all duration-200 ease-in-out mb-20 mx-auto",
        "w-full max-w-6xl 2xl:p-[clamp(1.5rem,3vw,2.5rem)] mt-6",
        isOpen
          ? "w-full p-[clamp(1.5rem,3vw,2.5rem)]"
          : "bg-transparent shadow-none w-full p-3 border-none"
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
            Create New Product
          </h2>
          <p className="text-[#64748B] text-[clamp(0.875rem,1vw,1rem)]">
            Fill in the details below to list your product.
          </p>
        </div>

        <button
          type="button"
          onClick={() => setIsOpen((prev) => !prev)}
          className={cn(
            "flex-shrink-0 flex items-center justify-center ml-auto transition-all duration-150 ease-in-out",
            isOpen 
              ? "w-[clamp(3.5rem,10vw,4.5rem)] h-[clamp(2.75rem,6vw,3.25rem)] rounded-md text-black" 
              : "w-[clamp(4.5rem,12vw,5.5rem)] h-[clamp(3.25rem,8vw,4rem)] rounded-md bg-black text-white"
          )}
        >
          {isOpen ? (
            <X className="w-[clamp(1.5rem,3vw,2rem)] h-[clamp(1.5rem,3vw,2rem)]" strokeWidth={2.5} />
          ) : (
            <Plus className="w-[clamp(1.75rem,4vw,2.25rem)] h-[clamp(1.75rem,4vw,2.25rem)]" strokeWidth={2.5} />
          )}
        </button>
      </div>

      <div className={cn(isOpen ? "block" : "hidden")}>
        <AnimatePresence>
          {error && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="mb-6 bg-red-50 text-red-600 p-4 rounded-2xl text-sm font-semibold border border-red-100 flex items-center gap-3"
            >
              <div className="w-1.5 h-1.5 rounded-full bg-red-600 animate-pulse" />
              {error}
            </motion.div>
          )}
        </AnimatePresence>

        <form ref={formRef} onSubmit={handleSubmit}>
          <div className="flex flex-col gap-[clamp(1rem,2vw,1.5rem)]">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-1.5">
                <label className="text-[11px] font-bold text-gray-400 uppercase tracking-widest ml-1">
                  Product Name
                </label>
                <Input name="name" placeholder="e.g. BLUE RAZE ICE" required />
              </div>

              <div className="space-y-1.5">
                <label className="text-[11px] font-bold text-gray-400 uppercase tracking-widest ml-1">
                  Price
                </label>
                <Input name="price" type="number" step="0.01" placeholder="0.00" required />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-1.5">
                <label className="text-[11px] font-bold text-gray-400 uppercase tracking-widest ml-1">
                  Series
                </label>
                <Select
                  name="series"
                  defaultValue="regular"
                  options={[
                    { label: "Local Series", value: "local" },
                    { label: "Regular Series", value: "regular" },
                  ]}
                  required
                />
              </div>

              <label className="flex items-center gap-3 p-4 bg-gray-50 rounded-xl cursor-pointer hover:bg-gray-100 transition-colors border border-gray-200 self-end">
                <div className="relative">
                  <input type="checkbox" name="comingSoon" value="true" className="peer sr-only" />
                  <div className="w-10 h-6 bg-gray-300 rounded-full peer peer-checked:bg-black transition-colors after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-[20px] after:w-[20px] after:transition-all peer-checked:after:translate-x-4" />
                </div>
                <div>
                  <p className="text-sm font-bold text-gray-900">Coming Soon</p>
                  <p className="text-[10px] text-gray-500 uppercase tracking-tighter">
                    Tag product as upcoming
                  </p>
                </div>
              </label>
            </div>
            
            <div className="space-y-1.5">
              <label className="text-[11px] font-bold text-gray-400 uppercase tracking-widest ml-1">
                Description
              </label>
              <Textarea 
                name="description" 
                placeholder="Describe your product (e.g. flavor notes, technical specs, etc.)" 
                rows={4}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <ImageUploadField
                label="Primary Device"
                name="image"
                preview={previews.image}
                inputRef={imageInputRef}
                onChange={(e) => handleFileChange(e, "image")}
                onRemove={() => removeImage("image")}
              />
              <ImageUploadField
                label="Fruit Ornament"
                name="fruits"
                preview={previews.fruits}
                inputRef={fruitsInputRef}
                onChange={(e) => handleFileChange(e, "fruits")}
                onRemove={() => removeImage("fruits")}
              />
              <ImageUploadField
                label="Card Background"
                name="bg"
                preview={previews.bg}
                inputRef={bgInputRef}
                onChange={(e) => handleFileChange(e, "bg")}
                onRemove={() => removeImage("bg")}
              />
            </div>

            <div className="pt-6 border-t border-gray-100">
              <Button type="submit" variant="secondary" disabled={loading} className="w-full h-12">
                {loading ? (
                  <div className="flex items-center gap-2">
                    <Loader2 className="h-5 w-5 animate-spin" />
                    <span>Publishing...</span>
                  </div>
                ) : (
                  <div className="flex items-center gap-2">
                    <Plus size={20} />
                    <span>Publish Product Listing</span>
                  </div>
                )}
              </Button>
            </div>
          </div>
        </form>
      </div>
    </Card>
  );
}

function ImageUploadField({
  label,
  name,
  preview,
  inputRef,
  onChange,
  onRemove,
}: {
  label: string;
  name: string;
  preview: string | null;
  inputRef: React.RefObject<HTMLInputElement | null>;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onRemove: () => void;
}) {
  return (
    <div className="flex flex-col gap-2">
      {preview && (
        <div className="flex flex-col gap-2">
          <label className="text-sm font-medium text-[#374151]">{label}</label>
          <div className="relative w-full h-36 rounded-xl overflow-hidden border border-slate-200">
            <img src={preview} alt={label} className="w-full h-full object-cover" />
            <button
              type="button"
              onClick={onRemove}
              className="absolute top-2 right-2 text-red-500 p-1.5"
            >
              <X size={18} strokeWidth={3} />
            </button>
          </div>
        </div>
      )}
      <div className={cn(preview ? "hidden" : "block")}>
        <Input
          ref={inputRef}
          id={name}
          name={name}
          label={label}
          type="file"
          accept="image/*"
          onChange={onChange}
          className="file:bg-black file:text-white file:rounded-sm file:border-0 file:px-4 file:py-1.5"
        />
      </div>
    </div>
  );
}

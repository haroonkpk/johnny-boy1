"use client";

import { useMemo } from "react";
import dynamic from "next/dynamic";
import "react-quill-new/dist/quill.snow.css";

// Simple Dynamic Import without complex ref wrapping
const ReactQuill = dynamic(() => import("react-quill-new"), {
  ssr: false,
  loading: () => (
    <div className="h-[300px] w-full bg-gray-100 animate-pulse rounded-md" />
  ),
});

type Props = {
  value: string;
  setValue: (value: string) => void;
};

export default function Editor({ value, setValue }: Props) {
  // Toolbar settings
  const modules = useMemo(
    () => ({
      toolbar: [
        [{ header: [1, 2, 3, false] }],
        ["bold", "italic", "underline", "strike"],
        [{ color: [] }, { background: [] }],
        [{ list: "ordered" }, { list: "bullet" }],
        ["link", "image"],
        ["clean"],
      ],
    }),
    []
  );

  return (
    <div className="bg-white text-black min-h-[350px]">
      <ReactQuill
        theme="snow"
        value={value} // Direct value passing
        onChange={setValue} // Direct state update
        modules={modules}
        style={{ height: "300px" }} // Classname ki jagah inline style zyada stable rehta hai Quill mein
      />
    </div>
  );
}
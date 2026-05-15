"use client";

import { useMemo } from "react";
import dynamic from "next/dynamic";
import "react-quill-new/dist/quill.snow.css";

// Dynamic Import with SSR disabled
const ReactQuill = dynamic(() => import("react-quill-new"), {
  ssr: false,
  loading: () => (
    <div className="h-[350px] w-full bg-gray-100 animate-pulse rounded-md border border-gray-200" />
  ),
});

type Props = {
  value: string;
  setValue: (value: string) => void;
};

export default function Editor({ value, setValue }: Props) {
  // Toolbar settings memoized to prevent re-renders
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
    <div className="quill-editor-wrapper bg-white text-black">
      <style jsx global>{`
        /* Editor ki height fix karne ke liye custom CSS */
        .ql-container {
          min-height: 250px;
          font-size: 16px;
        }
        .ql-editor {
          min-height: 250px;
        }
      `}</style>
      
      <ReactQuill
        theme="snow"
        value={value || ""} // Fallback to empty string to avoid uncontrolled input error
        onChange={setValue}
        modules={modules}
        placeholder="Yahan apna content likhein..."
      />
    </div>
  );
}
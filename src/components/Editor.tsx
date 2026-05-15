"use client";

import { useMemo } from "react";
import dynamic from "next/dynamic";
import "react-quill-new/dist/quill.snow.css";

const ReactQuill = dynamic(() => import("react-quill-new"), {
  ssr: false,
  loading: () => (
    <div className="h-[200px] w-full bg-gray-100 animate-pulse rounded-md border border-gray-200" />
  ),
});

type Props = {
  value: string;
  setValue: (value: string) => void;
};

export default function Editor({ value, setValue }: Props) {
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
        /* ── Toolbar: allow horizontal scroll only if buttons overflow ── */
        .ql-toolbar.ql-snow {
          overflow-x: auto;
          overflow-y: hidden;
          white-space: nowrap;
          -webkit-overflow-scrolling: touch;
          /* Hide scrollbar visually but keep it functional */
          scrollbar-width: none;
        }
        .ql-toolbar.ql-snow::-webkit-scrollbar {
          display: none;
        }

        /* ── Editor body ── */
        .ql-container.ql-snow {
          font-size: clamp(13px, 1.6vw, 16px);
        }

        .ql-editor {
          min-height: clamp(140px, 20vw, 250px);
          font-size: clamp(13px, 1.6vw, 16px);
          /* Prevent editor content from causing x-scroll on the page */
          overflow-wrap: break-word;
          word-break: break-word;
        }

        /* ── Toolbar button sizing on small screens ── */
        @media (max-width: 480px) {
          .ql-toolbar.ql-snow .ql-formats {
            margin-right: 6px;
          }
          .ql-toolbar.ql-snow button {
            width: 24px;
            height: 24px;
            padding: 2px;
          }
          .ql-toolbar.ql-snow .ql-picker {
            font-size: 12px;
          }
        }
      `}</style>

      <ReactQuill
        theme="snow"
        value={value || ""}
        onChange={setValue}
        modules={modules}
        placeholder="Yahan apna content likhein..."
      />
    </div>
  );
}
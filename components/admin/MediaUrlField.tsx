"use client";

import { ImageIcon, Loader2, Upload, X } from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import { uploadMedia } from "@/lib/api";

type MediaUrlFieldProps = {
  value: string;
  onChange: (url: string) => void;
  placeholder?: string;
};

export default function MediaUrlField({ value, onChange, placeholder = "Paste image URL or upload" }: MediaUrlFieldProps) {
  const [uploadStatus, setUploadStatus] = useState<"idle" | "uploading">("idle");
  const [uploadError, setUploadError] = useState("");

  const MAX_BYTES = 10 * 1024 * 1024;

  async function handleUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      setUploadError("Only image files are allowed.");
      return;
    }

    if (file.size > MAX_BYTES) {
      setUploadError("Image too large. Max 10MB.");
      e.target.value = "";
      return;
    }

    setUploadError("");
    e.target.value = "";

    try {
      setUploadStatus("uploading");
      const res = await uploadMedia(file);
      if (res.success) {
        onChange(res.data.url);
      } else {
        setUploadError(res.message || "Upload failed");
      }
    } catch {
      setUploadError("Image upload failed.");
    }
    setUploadStatus("idle");
  }

  const isProcessing = uploadStatus !== "idle";

  return (
    <div className="space-y-2">
      <div className="flex gap-3">
        <div className="relative size-16 shrink-0 overflow-hidden rounded-md border border-[#e2e8f0] bg-[#f8f9fb]">
          {value ? (
            <Image src={value} alt="Preview" fill unoptimized sizes="64px" className="object-contain p-1" />
          ) : (
            <ImageIcon className="absolute inset-0 m-auto size-4 text-gray-300" />
          )}
        </div>
        <div className="flex-1 space-y-2">
          <div className="relative">
            <ImageIcon className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              value={value}
              onChange={(e) => onChange(e.target.value)}
              placeholder={placeholder}
              className="h-10 w-full rounded-md border border-[#e2e8f0] bg-white pl-9 pr-8 text-sm outline-none transition-colors focus:border-[#dc2626] focus:ring-1 focus:ring-[#dc2626]"
            />
            {value && (
              <button type="button" onClick={() => onChange("")} className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 hover:text-red-500">
                <X className="size-3.5" />
              </button>
            )}
          </div>
          <div className="flex items-center gap-2">
            <label className="inline-flex cursor-pointer items-center gap-1.5 rounded-md border border-[#e2e8f0] bg-[#f8f9fb] px-3 py-1.5 text-xs font-medium text-[#1a3a52] transition-colors hover:bg-[#e2e8f0] disabled:pointer-events-none disabled:opacity-50">
              {isProcessing ? <Loader2 className="size-3.5 animate-spin" /> : <Upload className="size-3.5" />}
              {uploadStatus === "uploading" ? "Uploading..." : "Upload"}
              <input type="file" accept="image/*" onChange={handleUpload} className="hidden" disabled={isProcessing} />
            </label>
            {isProcessing && <span className="text-xs text-gray-400">Processing image...</span>}
          </div>
          {uploadError && <p className="text-xs text-red-500">{uploadError}</p>}
        </div>
      </div>
    </div>
  );
}

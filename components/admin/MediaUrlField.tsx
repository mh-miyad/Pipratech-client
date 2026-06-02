"use client";

import { useState } from "react";
import { ImageIcon, Upload, X } from "lucide-react";
import { uploadMedia } from "@/lib/api";

type MediaUrlFieldProps = {
  value: string;
  onChange: (url: string) => void;
  placeholder?: string;
};

export default function MediaUrlField({ value, onChange, placeholder = "Paste image URL or upload" }: MediaUrlFieldProps) {
  const [uploading, setUploading] = useState(false);
  const [uploadError, setUploadError] = useState("");

  async function handleUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    setUploadError("");

    const res = await uploadMedia(file);

    if (res.success) {
      onChange(res.data.url);
    } else {
      setUploadError(res.message || "Upload failed");
    }

    setUploading(false);
    e.target.value = "";
  }

  return (
    <div className="space-y-2">
      <div className="flex gap-2">
        <div className="relative flex-1">
          <ImageIcon className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            value={value}
            onChange={(e) => onChange(e.target.value)}
            placeholder={placeholder}
            className="h-10 w-full rounded-md border border-[#e2e8f0] bg-white pl-9 pr-8 text-sm outline-none transition-colors focus:border-[#dc2626] focus:ring-1 focus:ring-[#dc2626]"
          />
          {value && (
            <button
              type="button"
              onClick={() => onChange("")}
              className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 hover:text-red-500"
            >
              <X className="size-3.5" />
            </button>
          )}
        </div>
        <label className="flex h-10 cursor-pointer items-center gap-1.5 rounded-md border border-[#e2e8f0] bg-[#f8f9fb] px-3 text-sm font-medium text-[#1a3a52] transition-colors hover:bg-[#e2e8f0]">
          <Upload className="size-3.5" />
          {uploading ? "Uploading..." : "Upload"}
          <input type="file" accept="image/*" onChange={handleUpload} className="hidden" disabled={uploading} />
        </label>
      </div>
      {uploadError && <p className="text-xs text-red-500">{uploadError}</p>}
    </div>
  );
}

"use client";

import { X, CheckCircle, AlertCircle } from "lucide-react";
import { useEffect, useState, useCallback } from "react";

type ToastType = "success" | "error";
type ToastData = { type: ToastType; message: string };

let toastId = 0;
const listeners = new Set<(t: ToastData | null) => void>();
let currentToast: ToastData | null = null;

export function showToast(type: ToastType, message: string) {
  currentToast = { type, message };
  listeners.forEach((l) => l(currentToast));
  const id = ++toastId;
  setTimeout(() => {
    if (id === toastId) {
      currentToast = null;
      listeners.forEach((l) => l(null));
    }
  }, 4000);
}

export function AdminToast() {
  const [toast, setToast] = useState<ToastData | null>(null);

  const listener = useCallback((t: ToastData | null) => setToast(t), []);
  useEffect(() => {
    listeners.add(listener);
    return () => { listeners.delete(listener); };
  }, [listener]);

  if (!toast) return null;

  return (
    <div className="fixed right-4 top-20 z-50 max-w-sm rounded-lg border border-[#e2e8f0] bg-white p-4 shadow-xl animate-in slide-in-from-top-4 fade-in duration-300">
      <div className="flex items-start gap-3">
        {toast.type === "success" ? (
          <CheckCircle className="size-5 shrink-0 text-green-500" />
        ) : (
          <AlertCircle className="size-5 shrink-0 text-red-500" />
        )}
        <div className="flex-1 min-w-0">
          <p className="text-sm font-semibold text-[#1a3a52]">{toast.type === "success" ? "Success" : "Error"}</p>
          <p className="mt-1 text-sm text-gray-600">{toast.message}</p>
        </div>
        <button type="button" onClick={() => { currentToast = null; setToast(null); }} className="shrink-0 rounded p-1 text-gray-400 hover:bg-gray-100">
          <X className="size-4" />
        </button>
      </div>
    </div>
  );
}

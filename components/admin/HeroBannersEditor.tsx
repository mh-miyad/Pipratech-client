"use client";

import { useState, useEffect, useCallback } from "react";
import { Plus, Save, Loader2, Trash2, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import AdminTable, { type TableRowData } from "@/components/admin/AdminTable";
import MediaUrlField from "@/components/admin/MediaUrlField";
import { showToast } from "@/components/admin/AdminToast";
import * as heroService from "@/lib/services/hero";
import type { HeroBanner } from "@/lib/services/hero";
import { friendlyError } from "@/lib/format-errors";

export default function HeroBannersEditor() {
  const [banners, setBanners] = useState<HeroBanner[]>([]);
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [deleteConfirmId, setDeleteConfirmId] = useState<string | null>(null);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editForm, setEditForm] = useState({ title: "", subtitle: "", image: "", buttonText: "", buttonLink: "" });

  async function loadBanners() {
    setLoading(true);
    setLoadError(null);
    try {
      const res = await heroService.fetchHeroBanners();
      if (res.success) setBanners(res.data);
      else setLoadError(friendlyError(res.message, res.errors, "load hero banners"));
    } catch { setLoadError("Network error. Could not load banners."); }
    setLoading(false);
  }

  useEffect(() => { loadBanners(); }, []);

  function openCreate() {
    setEditForm({ title: "", subtitle: "", image: "", buttonText: "", buttonLink: "" });
    setEditingId("new");
  }

  function openEdit(banner: HeroBanner) {
    setEditForm({
      title: banner.title || "", subtitle: banner.subtitle || "", image: banner.image || "",
      buttonText: banner.buttonText || "", buttonLink: banner.buttonLink || "",
    });
    setEditingId(banner.id);
  }

  function cancelEdit() { setEditingId(null); }

  async function handleSave() {
    setSaving(true);
    const payload = { ...editForm, status: "ACTIVE" };
    try {
      if (editingId === "new") {
        const res = await heroService.createHeroBanner(payload);
        if (res.success) { showToast("success", "Banner created."); loadBanners(); cancelEdit(); }
        else showToast("error", friendlyError(res.message, res.errors, "create banner"));
      } else if (editingId) {
        const res = await heroService.updateHeroBanner(editingId, payload);
        if (res.success) { showToast("success", "Banner updated."); loadBanners(); cancelEdit(); }
        else showToast("error", friendlyError(res.message, res.errors, "update banner"));
      }
    } catch { showToast("error", "Network error."); }
    setSaving(false);
  }

  function handleDeleteClick(id: string) { setDeleteConfirmId(id); }

  async function handleDeleteConfirm() {
    if (!deleteConfirmId) return;
    const id = deleteConfirmId;
    setDeletingId(id);
    try {
      const res = await heroService.deleteHeroBanner(id);
      if (res.success) { showToast("success", "Banner deleted."); loadBanners(); }
      else showToast("error", friendlyError(res.message, res.errors, "delete banner"));
    } catch { showToast("error", "Network error."); }
    setDeletingId(null);
    setDeleteConfirmId(null);
  }

  const tableData: TableRowData[] = banners.map((b) => ({
    id: b.id, image: b.image, title: b.title || "Untitled", subtitle: b.subtitle, status: b.status, sortOrder: b.sortOrder,
  }));

  return (
    <div className="space-y-6">
      {deleteConfirmId && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="fixed inset-0 bg-black/60" onClick={() => !deletingId && setDeleteConfirmId(null)} />
          <div className="relative w-full max-w-md rounded-xl border border-red-200 bg-white p-6 shadow-2xl">
            <button type="button" onClick={() => setDeleteConfirmId(null)} disabled={!!deletingId} className="absolute right-4 top-4 text-gray-400"><X className="size-4" /></button>
            <div className="flex flex-col items-center text-center space-y-4 pt-2">
              <div className="flex size-14 items-center justify-center rounded-full bg-red-50 text-red-500"><Trash2 className="size-7" /></div>
              <div><h3 className="text-lg font-bold text-[#1a3a52]">Delete Banner</h3><p className="text-sm text-gray-500">This cannot be undone.</p></div>
            </div>
            <div className="mt-6 flex justify-end gap-2 border-t pt-4">
              <Button variant="outline" onClick={() => setDeleteConfirmId(null)} disabled={!!deletingId}>Cancel</Button>
              <Button onClick={handleDeleteConfirm} disabled={!!deletingId} className="bg-red-500 hover:bg-red-600 text-white gap-2">{deletingId ? <Loader2 className="size-4 animate-spin" /> : <Trash2 className="size-4" />}{deletingId ? "Deleting..." : "Yes, Delete"}</Button>
            </div>
          </div>
        </div>
      )}

      <div className="flex items-center justify-between">
        <div><h2 className="text-xl font-semibold text-[#1a3a52]">Hero Banners</h2><p className="mt-1 text-sm text-gray-500">Manage homepage hero slides.</p></div>
        <Button onClick={openCreate} className="flex items-center gap-2 bg-[#dc2626] text-white hover:bg-[#b91c1c]"><Plus className="size-4" />Add Banner</Button>
      </div>

      {loadError && <div className="rounded-md border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">{loadError}</div>}

      {editingId && (
        <div className="rounded-lg border border-[#e2e8f0] bg-white p-6">
          <h3 className="text-lg font-semibold text-[#1a3a52]">{editingId === "new" ? "Create Banner" : "Edit Banner"}</h3>
          <div className="mt-4 space-y-4">
            <div className="space-y-1.5"><label className="text-sm font-medium text-[#1a3a52]">Title</label><input type="text" value={editForm.title} onChange={(e) => setEditForm((p) => ({ ...p, title: e.target.value }))} placeholder="Hero slide heading" className="h-10 w-full rounded-md border border-[#e2e8f0] bg-white px-3 text-sm outline-none focus:border-[#dc2626] focus:ring-1 focus:ring-[#dc2626]" /></div>
            <div className="space-y-1.5"><label className="text-sm font-medium text-[#1a3a52]">Subtitle</label><textarea value={editForm.subtitle} onChange={(e) => setEditForm((p) => ({ ...p, subtitle: e.target.value }))} placeholder="Short description text" rows={3} className="w-full resize-none rounded-md border border-[#e2e8f0] bg-white px-3 py-2 text-sm outline-none focus:border-[#dc2626] focus:ring-1 focus:ring-[#dc2626]" /></div>
            <div className="space-y-1.5"><label className="text-sm font-medium text-[#1a3a52]">Background Image</label><MediaUrlField value={editForm.image} onChange={(url) => setEditForm((p) => ({ ...p, image: url }))} placeholder="Upload or paste image URL" /></div>
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-1.5"><label className="text-sm font-medium text-[#1a3a52]">Button Text</label><input type="text" value={editForm.buttonText} onChange={(e) => setEditForm((p) => ({ ...p, buttonText: e.target.value }))} placeholder="e.g. View Products" className="h-10 w-full rounded-md border border-[#e2e8f0] bg-white px-3 text-sm outline-none focus:border-[#dc2626] focus:ring-1 focus:ring-[#dc2626]" /></div>
              <div className="space-y-1.5"><label className="text-sm font-medium text-[#1a3a52]">Button Link</label><input type="text" value={editForm.buttonLink} onChange={(e) => setEditForm((p) => ({ ...p, buttonLink: e.target.value }))} placeholder="e.g. /products" className="h-10 w-full rounded-md border border-[#e2e8f0] bg-white px-3 text-sm outline-none focus:border-[#dc2626] focus:ring-1 focus:ring-[#dc2626]" /></div>
            </div>
          </div>
          <div className="mt-5 flex gap-3">
            <Button onClick={handleSave} disabled={saving} className="flex items-center gap-2 bg-[#dc2626] text-white hover:bg-[#b91c1c] disabled:opacity-60">{saving ? <Loader2 className="size-4 animate-spin" /> : <Save className="size-4" />}{saving ? "Saving..." : "Save"}</Button>
            <Button type="button" variant="outline" onClick={cancelEdit}>Cancel</Button>
          </div>
        </div>
      )}

      {loading ? <div className="flex items-center justify-center py-12"><Loader2 className="size-6 animate-spin text-[#dc2626]" /></div>
      : <AdminTable data={tableData} itemLabel="Hero Banner" onEdit={openEdit} onDelete={handleDeleteClick} deletingId={deletingId} />}
    </div>
  );
}

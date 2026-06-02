"use client";

import { useState, useEffect, useCallback } from "react";
import { Plus, Save, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import AdminTable, { type TableRowData } from "@/components/admin/AdminTable";
import MediaUrlField from "@/components/admin/MediaUrlField";
import * as heroService from "@/lib/services/hero";
import type { HeroBanner } from "@/lib/services/hero";

export default function HeroBannersEditor() {
  const [banners, setBanners] = useState<HeroBanner[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editForm, setEditForm] = useState({ title: "", subtitle: "", image: "", buttonText: "", buttonLink: "" });
  const [message, setMessage] = useState("");

  const showMessage = useCallback((msg: string) => {
    setMessage(msg);
    setTimeout(() => setMessage(""), 3000);
  }, []);

  async function loadBanners() {
    setLoading(true);
    const res = await heroService.fetchHeroBanners();
    if (res.success) setBanners(res.data);
    setLoading(false);
  }

  useEffect(() => { loadBanners(); }, []);

  function openCreate() {
    setEditForm({ title: "", subtitle: "", image: "", buttonText: "", buttonLink: "" });
    setEditingId("new");
  }

  function openEdit(banner: HeroBanner) {
    setEditForm({
      title: banner.title || "",
      subtitle: banner.subtitle || "",
      image: banner.image || "",
      buttonText: banner.buttonText || "",
      buttonLink: banner.buttonLink || "",
    });
    setEditingId(banner.id);
  }

  function cancelEdit() {
    setEditingId(null);
    setEditForm({ title: "", subtitle: "", image: "", buttonText: "", buttonLink: "" });
  }

  async function handleSave() {
    setSaving(true);
    const payload = { ...editForm, status: "ACTIVE" };

    if (editingId === "new") {
      const res = await heroService.createHeroBanner(payload);
      if (res.success) { showMessage("Hero banner created."); loadBanners(); cancelEdit(); }
      else showMessage(res.message || "Failed to create.");
    } else if (editingId) {
      const res = await heroService.updateHeroBanner(editingId, payload);
      if (res.success) { showMessage("Hero banner updated."); loadBanners(); cancelEdit(); }
      else showMessage(res.message || "Failed to update.");
    }
    setSaving(false);
  }

  async function handleDelete(id: string) {
    setDeletingId(id);
    const res = await heroService.deleteHeroBanner(id);
    if (res.success) { showMessage("Hero banner deleted."); loadBanners(); }
    else showMessage(res.message || "Failed to delete.");
    setDeletingId(null);
  }

  const tableData: TableRowData[] = banners.map((b) => ({
    id: b.id,
    image: b.image,
    title: b.title || "Untitled",
    subtitle: b.subtitle,
    status: b.status,
    sortOrder: b.sortOrder,
  }));

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-semibold text-[#1a3a52]">Hero Banners</h2>
          <p className="mt-1 text-sm text-gray-500">Manage hero banner slides on the homepage.</p>
        </div>
        <Button onClick={openCreate} className="flex items-center gap-2 bg-[#dc2626] text-white hover:bg-[#b91c1c]">
          <Plus className="size-4" /> Add Banner
        </Button>
      </div>

      {message && (
        <div className="rounded-md border border-green-200 bg-green-50 px-4 py-3 text-sm text-green-600">{message}</div>
      )}

      {editingId && (
        <div className="rounded-lg border border-[#e2e8f0] bg-white p-6">
          <h3 className="text-lg font-semibold text-[#1a3a52]">{editingId === "new" ? "Create Banner" : "Edit Banner"}</h3>
          <div className="mt-4 space-y-4">
            <div className="space-y-1.5">
              <label className="text-sm font-medium text-[#1a3a52]">Title</label>
              <input type="text" value={editForm.title} onChange={(e) => setEditForm((p) => ({ ...p, title: e.target.value }))} placeholder="Hero slide heading" className="h-10 w-full rounded-md border border-[#e2e8f0] bg-white px-3 text-sm outline-none focus:border-[#dc2626] focus:ring-1 focus:ring-[#dc2626]" />
            </div>
            <div className="space-y-1.5">
              <label className="text-sm font-medium text-[#1a3a52]">Subtitle</label>
              <textarea value={editForm.subtitle} onChange={(e) => setEditForm((p) => ({ ...p, subtitle: e.target.value }))} placeholder="Short description text" rows={3} className="w-full resize-none rounded-md border border-[#e2e8f0] bg-white px-3 py-2 text-sm outline-none focus:border-[#dc2626] focus:ring-1 focus:ring-[#dc2626]" />
            </div>
            <div className="space-y-1.5">
              <label className="text-sm font-medium text-[#1a3a52]">Background Image</label>
              <MediaUrlField value={editForm.image} onChange={(url) => setEditForm((p) => ({ ...p, image: url }))} placeholder="Upload or paste image URL" />
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-1.5">
                <label className="text-sm font-medium text-[#1a3a52]">Button Text</label>
                <input type="text" value={editForm.buttonText} onChange={(e) => setEditForm((p) => ({ ...p, buttonText: e.target.value }))} placeholder="e.g. View Products" className="h-10 w-full rounded-md border border-[#e2e8f0] bg-white px-3 text-sm outline-none focus:border-[#dc2626] focus:ring-1 focus:ring-[#dc2626]" />
              </div>
              <div className="space-y-1.5">
                <label className="text-sm font-medium text-[#1a3a52]">Button Link</label>
                <input type="text" value={editForm.buttonLink} onChange={(e) => setEditForm((p) => ({ ...p, buttonLink: e.target.value }))} placeholder="e.g. /products" className="h-10 w-full rounded-md border border-[#e2e8f0] bg-white px-3 text-sm outline-none focus:border-[#dc2626] focus:ring-1 focus:ring-[#dc2626]" />
              </div>
            </div>
          </div>
          <div className="mt-5 flex gap-3">
            <Button onClick={handleSave} disabled={saving} className="flex items-center gap-2 bg-[#dc2626] text-white hover:bg-[#b91c1c] disabled:opacity-60">
              {saving ? <Loader2 className="size-4 animate-spin" /> : <Save className="size-4" />} {saving ? "Saving..." : "Save"}
            </Button>
            <Button type="button" variant="outline" onClick={cancelEdit}>Cancel</Button>
          </div>
        </div>
      )}

      {loading ? (
        <div className="flex items-center justify-center py-12"><Loader2 className="size-6 animate-spin text-[#dc2626]" /></div>
      ) : (
        <AdminTable data={tableData} itemLabel="Hero Banner" onEdit={openEdit} onDelete={handleDelete} deletingId={deletingId} />
      )}
    </div>
  );
}

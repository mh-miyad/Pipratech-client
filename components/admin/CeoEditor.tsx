"use client";

import { useState, useEffect, useRef } from "react";
import { Plus, Save, Loader2, Trash2, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import AdminTable, { type TableRowData } from "@/components/admin/AdminTable";
import MediaUrlField from "@/components/admin/MediaUrlField";
import { showToast } from "@/components/admin/AdminToast";
import type { SectionItem } from "@/lib/services/sections";
import * as sectionsService from "@/lib/services/sections";
import { friendlyError } from "@/lib/format-errors";

export default function CeoEditor() {
  const sectionIdRef = useRef<string>("");
  const [items, setItems] = useState<SectionItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [deleteConfirmId, setDeleteConfirmId] = useState<string | null>(null);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editForm, setEditForm] = useState({ title: "", subtitle: "", description: "", image: "" });

  async function loadItems() {
    setLoading(true);
    setLoadError(null);
    try {
      const res = await sectionsService.getSectionByKey("about-ceo");
      if (res.success) { sectionIdRef.current = res.data.id; setItems(res.data.items); }
      else {
        const createRes = await sectionsService.createSection({ key: "about-ceo" });
        if (createRes.success) { sectionIdRef.current = createRes.data.id; setItems([]); }
        else setLoadError(friendlyError(createRes.message, createRes.errors, "load CEO"));
      }
    } catch { setLoadError("Network error."); }
    setLoading(false);
  }

  useEffect(() => { loadItems(); }, []);

  function openCreate() { setEditForm({ title: "", subtitle: "", description: "", image: "" }); setEditingId("new"); }
  function openEdit(item: SectionItem) { setEditForm({ title: item.title || "", subtitle: item.subtitle || "", description: item.description || "", image: (item.image as string) || "" }); setEditingId(item.id || null); }

  async function handleSave() {
    setSaving(true);
    const data: SectionItem = { title: editForm.title, subtitle: editForm.subtitle, description: editForm.description, image: editForm.image };
    try {
      if (editingId === "new") {
        const res = await sectionsService.createSectionItem(sectionIdRef.current, data);
        if (res.success) { showToast("success", "CEO created."); loadItems(); setEditingId(null); }
        else showToast("error", friendlyError(res.message, res.errors, "create CEO"));
      } else if (editingId) {
        const res = await sectionsService.updateSectionItem(editingId, data);
        if (res.success) { showToast("success", "CEO updated."); loadItems(); setEditingId(null); }
        else showToast("error", friendlyError(res.message, res.errors, "update CEO"));
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
      const res = await sectionsService.deleteSectionItem(id);
      if (res.success) { showToast("success", "CEO deleted."); loadItems(); }
      else showToast("error", friendlyError(res.message, res.errors, "delete CEO"));
    } catch { showToast("error", "Network error."); }
    setDeletingId(null);
    setDeleteConfirmId(null);
  }

  const tableData: TableRowData[] = items.map((item) => ({ id: item.id || "", image: (item as any).image as string | undefined, title: item.title || "Untitled", subtitle: item.subtitle || undefined, sortOrder: item.sortOrder }));

  return (
    <div className="space-y-6">
      {deleteConfirmId && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="fixed inset-0 bg-black/60" onClick={() => !deletingId && setDeleteConfirmId(null)} />
          <div className="relative w-full max-w-md rounded-xl border border-red-200 bg-white p-6 shadow-2xl">
            <button type="button" onClick={() => setDeleteConfirmId(null)} disabled={!!deletingId} className="absolute right-4 top-4 text-gray-400"><X className="size-4" /></button>
            <div className="flex flex-col items-center text-center space-y-4 pt-2">
              <div className="flex size-14 items-center justify-center rounded-full bg-red-50 text-red-500"><Trash2 className="size-7" /></div>
              <div><h3 className="text-lg font-bold text-[#1a3a52]">Delete CEO</h3><p className="text-sm text-gray-500">This cannot be undone.</p></div>
            </div>
            <div className="mt-6 flex justify-end gap-2 border-t pt-4"><Button variant="outline" onClick={() => setDeleteConfirmId(null)} disabled={!!deletingId}>Cancel</Button><Button onClick={handleDeleteConfirm} disabled={!!deletingId} className="bg-red-500 hover:bg-red-600 text-white gap-2">{deletingId ? <Loader2 className="size-4 animate-spin" /> : <Trash2 className="size-4" />}{deletingId ? "Deleting..." : "Yes, Delete"}</Button></div>
          </div>
        </div>
      )}

      <div className="flex items-center justify-between">
        <div><h2 className="text-xl font-semibold text-[#1a3a52]">CEO / Founder</h2><p className="mt-1 text-sm text-gray-500">Manage CEO profile shown on About page.</p></div>
        <Button onClick={openCreate} className="flex items-center gap-2 bg-[#dc2626] text-white hover:bg-[#b91c1c]"><Plus className="size-4" />Add CEO</Button>
      </div>

      {loadError && <div className="rounded-md border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">{loadError}</div>}

      {editingId && (
        <div className="rounded-lg border border-[#e2e8f0] bg-white p-6">
          <h3 className="text-lg font-semibold text-[#1a3a52]">{editingId === "new" ? "Add CEO" : "Edit CEO"}</h3>
          <div className="mt-4 space-y-4">
            <div className="space-y-1.5"><label className="text-sm font-medium text-[#1a3a52]">Name</label><input type="text" value={editForm.title} onChange={(e) => setEditForm((p) => ({ ...p, title: e.target.value }))} placeholder="e.g. Md. Saad Hasan Roy" className="h-10 w-full rounded-md border border-[#e2e8f0] bg-white px-3 text-sm outline-none focus:border-[#dc2626] focus:ring-1 focus:ring-[#dc2626]" /></div>
            <div className="space-y-1.5"><label className="text-sm font-medium text-[#1a3a52]">Designation</label><input type="text" value={editForm.subtitle} onChange={(e) => setEditForm((p) => ({ ...p, subtitle: e.target.value }))} placeholder="e.g. Founder & CEO" className="h-10 w-full rounded-md border border-[#e2e8f0] bg-white px-3 text-sm outline-none focus:border-[#dc2626] focus:ring-1 focus:ring-[#dc2626]" /></div>
            <div className="space-y-1.5"><label className="text-sm font-medium text-[#1a3a52]">Bio</label><textarea value={editForm.description} onChange={(e) => setEditForm((p) => ({ ...p, description: e.target.value }))} rows={4} className="w-full resize-none rounded-md border border-[#e2e8f0] bg-white px-3 py-2 text-sm outline-none focus:border-[#dc2626] focus:ring-1 focus:ring-[#dc2626]" /></div>
            <div className="space-y-1.5"><label className="text-sm font-medium text-[#1a3a52]">Photo</label><MediaUrlField value={editForm.image} onChange={(url) => setEditForm((p) => ({ ...p, image: url }))} placeholder="Upload or paste CEO photo URL" /></div>
          </div>
          <div className="mt-5 flex gap-3">
            <Button onClick={handleSave} disabled={saving} className="flex items-center gap-2 bg-[#dc2626] text-white hover:bg-[#b91c1c] disabled:opacity-60">{saving ? <Loader2 className="size-4 animate-spin" /> : <Save className="size-4" />}{saving ? "Saving..." : "Save"}</Button>
            <Button type="button" variant="outline" onClick={() => setEditingId(null)}>Cancel</Button>
          </div>
        </div>
      )}

      {loading ? <div className="flex items-center justify-center py-12"><Loader2 className="size-6 animate-spin text-[#dc2626]" /></div> : <AdminTable data={tableData} itemLabel="CEO" onEdit={openEdit} onDelete={handleDeleteClick} showImage deletingId={deletingId} />}
    </div>
  );
}

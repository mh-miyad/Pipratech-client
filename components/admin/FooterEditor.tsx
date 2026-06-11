"use client";

import { useState, useEffect, useRef } from "react";
import { Plus, Save, Loader2, Trash2, X, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";
import AdminTable, { type TableRowData } from "@/components/admin/AdminTable";
import { showToast } from "@/components/admin/AdminToast";
import { friendlyError } from "@/lib/format-errors";
import * as sectionsService from "@/lib/services/sections";
import type { Section, SectionItem } from "@/lib/services/sections";

type FooterForm = { address: string; phone: string; email: string; description: string; copyright: string };

export default function FooterEditor() {
  const sectionIdRef = useRef<string>("");
  const [footers, setFooters] = useState<SectionItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [deleteConfirmId, setDeleteConfirmId] = useState<string | null>(null);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editForm, setEditForm] = useState<FooterForm>({ address: "", phone: "", email: "", description: "", copyright: "" });

  function extraToForm(item: SectionItem): FooterForm {
    const extra = (item.extra || {}) as any;
    return {
      address: item.subtitle || extra.address || "",
      phone: extra.phone || "",
      email: extra.email || "",
      description: item.description || "",
      copyright: extra.copyright || extra.copyrightText || "",
    };
  }

  function formToExtra(form: FooterForm) {
    return { address: form.address, phone: form.phone, email: form.email, copyright: form.copyright };
  }

  async function loadFooters() {
    setLoading(true);
    setLoadError(null);
    try {
      const res = await sectionsService.getSectionByKey("footer");
      if (res.success) { sectionIdRef.current = res.data.id; setFooters(res.data.items); }
      else {
        const createRes = await sectionsService.createSection({ key: "footer" });
        if (createRes.success) { sectionIdRef.current = createRes.data.id; setFooters([]); }
        else setLoadError(friendlyError(createRes.message, createRes.errors, "load footer"));
      }
    } catch { setLoadError("Network error."); }
    setLoading(false);
  }

  useEffect(() => { loadFooters(); }, []);

  function openCreate() { setEditForm({ address: "", phone: "", email: "", description: "", copyright: "" }); setEditingId("new"); }

  function openEdit(item: SectionItem) { setEditForm(extraToForm(item)); setEditingId(item.id || null); }

  async function handleSave() {
    setSaving(true);
    const data: SectionItem = {
      title: "Footer",
      subtitle: editForm.address,
      description: editForm.description,
      extra: formToExtra(editForm),
    };
    try {
      if (editingId === "new") {
        const res = await sectionsService.createSectionItem(sectionIdRef.current, data);
        if (res.success) { showToast("success", "Footer created."); loadFooters(); setEditingId(null); }
        else showToast("error", friendlyError(res.message, res.errors, "create footer"));
      } else if (editingId) {
        const res = await sectionsService.updateSectionItem(editingId, data);
        if (res.success) { showToast("success", "Footer updated."); loadFooters(); setEditingId(null); }
        else showToast("error", friendlyError(res.message, res.errors, "update footer"));
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
      if (res.success) { showToast("success", "Footer deleted."); loadFooters(); }
      else showToast("error", friendlyError(res.message, res.errors, "delete footer"));
    } catch { showToast("error", "Network error."); }
    setDeletingId(null);
    setDeleteConfirmId(null);
  }

  const tableData: TableRowData[] = footers.map((item) => {
    const ex = (item.extra || {}) as any;
    return { id: item.id || "", title: item.description?.slice(0, 80) || "Footer Entry", subtitle: `${ex.address || item.subtitle || ""} | ${ex.email || ""} | ${ex.phone || ""}`, status: "ACTIVE" };
  });

  return (
    <div className="space-y-6">
      {deleteConfirmId && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="fixed inset-0 bg-black/60" onClick={() => !deletingId && setDeleteConfirmId(null)} />
          <div className="relative w-full max-w-md rounded-xl border border-red-200 bg-white p-6 shadow-2xl">
            <button type="button" onClick={() => setDeleteConfirmId(null)} disabled={!!deletingId} className="absolute right-4 top-4 text-gray-400"><X className="size-4" /></button>
            <div className="flex flex-col items-center text-center space-y-4 pt-2">
              <div className="flex size-14 items-center justify-center rounded-full bg-red-50 text-red-500"><Trash2 className="size-7" /></div>
              <div><h3 className="text-lg font-bold text-[#1a3a52]">Delete Footer</h3><p className="text-sm text-gray-500">This cannot be undone.</p></div>
            </div>
            <div className="mt-6 flex justify-end gap-2 border-t pt-4"><Button variant="outline" onClick={() => setDeleteConfirmId(null)} disabled={!!deletingId}>Cancel</Button><Button onClick={handleDeleteConfirm} disabled={!!deletingId} className="bg-red-500 hover:bg-red-600 text-white gap-2">{deletingId ? <Loader2 className="size-4 animate-spin" /> : <Trash2 className="size-4" />}{deletingId ? "Deleting..." : "Yes, Delete"}</Button></div>
          </div>
        </div>
      )}

      <div className="flex items-center justify-between">
        <div><h2 className="text-xl font-semibold text-[#1a3a52]">Footer</h2><p className="mt-1 text-sm text-gray-500">Manage footer content and contact info.</p></div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" onClick={loadFooters} disabled={loading}><RefreshCw className="size-3.5" /></Button>
          <Button onClick={openCreate} className="flex items-center gap-2 bg-[#dc2626] text-white hover:bg-[#b91c1c]"><Plus className="size-4" />Add Footer</Button>
        </div>
      </div>

      {loadError && <div className="rounded-md border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">{loadError}</div>}

      {editingId && (
        <div className="rounded-lg border border-[#e2e8f0] bg-white p-6">
          <h3 className="text-lg font-semibold text-[#1a3a52]">{editingId === "new" ? "Create Footer" : "Edit Footer"}</h3>
          <div className="mt-4 space-y-4">
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-1.5"><label className="text-sm font-medium text-[#1a3a52]">Phone</label><input type="text" value={editForm.phone} onChange={(e) => setEditForm((p) => ({ ...p, phone: e.target.value }))} className="h-10 w-full rounded-md border border-[#e2e8f0] bg-white px-3 text-sm outline-none focus:border-[#dc2626]" /></div>
              <div className="space-y-1.5"><label className="text-sm font-medium text-[#1a3a52]">Email</label><input type="email" value={editForm.email} onChange={(e) => setEditForm((p) => ({ ...p, email: e.target.value }))} className="h-10 w-full rounded-md border border-[#e2e8f0] bg-white px-3 text-sm outline-none focus:border-[#dc2626]" /></div>
            </div>
            <div className="space-y-1.5"><label className="text-sm font-medium text-[#1a3a52]">Address</label><input type="text" value={editForm.address} onChange={(e) => setEditForm((p) => ({ ...p, address: e.target.value }))} className="h-10 w-full rounded-md border border-[#e2e8f0] bg-white px-3 text-sm outline-none focus:border-[#dc2626]" /></div>
            <div className="space-y-1.5"><label className="text-sm font-medium text-[#1a3a52]">Description</label><textarea value={editForm.description} onChange={(e) => setEditForm((p) => ({ ...p, description: e.target.value }))} rows={3} className="w-full resize-none rounded-md border border-[#e2e8f0] bg-white px-3 py-2 text-sm outline-none focus:border-[#dc2626]" /></div>
            <div className="space-y-1.5"><label className="text-sm font-medium text-[#1a3a52]">Copyright</label><input type="text" value={editForm.copyright} onChange={(e) => setEditForm((p) => ({ ...p, copyright: e.target.value }))} className="h-10 w-full rounded-md border border-[#e2e8f0] bg-white px-3 text-sm outline-none focus:border-[#dc2626]" /></div>
          </div>
          <div className="mt-5 flex gap-3">
            <Button onClick={handleSave} disabled={saving} className="flex items-center gap-2 bg-[#dc2626] text-white hover:bg-[#b91c1c] disabled:opacity-60">{saving ? <Loader2 className="size-4 animate-spin" /> : <Save className="size-4" />}{saving ? "Saving..." : "Save"}</Button>
            <Button type="button" variant="outline" onClick={() => setEditingId(null)}>Cancel</Button>
          </div>
        </div>
      )}

      {loading ? <div className="flex items-center justify-center py-12"><Loader2 className="size-6 animate-spin text-[#dc2626]" /></div> : <AdminTable data={tableData} itemLabel="Footer" onEdit={openEdit} onDelete={handleDeleteClick} showImage={false} deletingId={deletingId} />}
    </div>
  );
}

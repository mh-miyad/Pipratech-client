"use client";

import { useState, useEffect, useRef } from "react";
import { Plus, Save, Loader2, Trash2, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import AdminTable, { type TableRowData } from "@/components/admin/AdminTable";
import MediaUrlField from "@/components/admin/MediaUrlField";
import { showToast } from "@/components/admin/AdminToast";
import type { AdminSection } from "@/components/admin/admin-content-config";
import type { SectionItem } from "@/lib/services/sections";
import * as sectionsService from "@/lib/services/sections";
import { friendlyError } from "@/lib/format-errors";

type SectionEditorProps = { sectionKey: string; sectionConfig: AdminSection };

export default function SectionEditor({ sectionKey, sectionConfig }: SectionEditorProps) {
  const sectionIdRef = useRef<string>("");
  const [items, setItems] = useState<SectionItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [deleteConfirmId, setDeleteConfirmId] = useState<string | null>(null);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editForm, setEditForm] = useState<Record<string, string>>({});

  async function loadItems() {
    setLoading(true);
    setLoadError(null);
    try {
      const res = await sectionsService.getSectionByKey(sectionKey);
      if (res.success) {
        sectionIdRef.current = res.data.id;
        setItems(res.data.items);
      } else {
        const createRes = await sectionsService.createSection({ key: sectionKey });
        if (createRes.success) {
          sectionIdRef.current = createRes.data.id;
          setItems([]);
        } else {
          setLoadError(friendlyError(createRes.message, createRes.errors, `load ${sectionConfig.title}`));
        }
      }
    } catch {
      setLoadError("Network error. Could not load items.");
    }
    setLoading(false);
  }

  useEffect(() => { loadItems(); }, [sectionKey]);

  function openCreate() {
    const defaults: Record<string, string> = {};
    sectionConfig.fields.forEach((f) => { defaults[f.name] = ""; });
    setEditForm(defaults);
    setEditingId("new");
  }

  function openEdit(item: SectionItem) {
    const form: Record<string, string> = {};
    sectionConfig.fields.forEach((f) => { form[f.name] = String(item[f.name] ?? ""); });
    setEditForm(form);
    setEditingId(item.id || "new");
  }

  function cancelEdit() { setEditingId(null); setEditForm({}); }

  async function handleSave() {
    setSaving(true);
    const data: SectionItem = { title: editForm.title || "" };
    sectionConfig.fields.forEach((f) => {
      (data as Record<string, unknown>)[f.name] = editForm[f.name] || "";
    });

    try {
      if (editingId === "new") {
        const res = await sectionsService.createSectionItem(sectionIdRef.current, data);
        if (res.success) { showToast("success", "Item created."); loadItems(); cancelEdit(); }
        else showToast("error", friendlyError(res.message, res.errors, "create item"));
      } else if (editingId) {
        const res = await sectionsService.updateSectionItem(editingId, data);
        if (res.success) { showToast("success", "Item updated."); loadItems(); cancelEdit(); }
        else showToast("error", friendlyError(res.message, res.errors, "update item"));
      }
    } catch {
      showToast("error", "Network error. Please try again.");
    }
    setSaving(false);
  }

  function handleDeleteClick(id: string) { setDeleteConfirmId(id); }

  async function handleDeleteConfirm() {
    if (!deleteConfirmId) return;
    const id = deleteConfirmId;
    setDeletingId(id);
    try {
      const res = await sectionsService.deleteSectionItem(id);
      if (res.success) { showToast("success", "Item deleted."); loadItems(); }
      else showToast("error", friendlyError(res.message, res.errors, "delete item"));
    } catch {
      showToast("error", "Network error. Could not delete.");
    }
    setDeletingId(null);
    setDeleteConfirmId(null);
  }

  const tableData: TableRowData[] = items.map((item) => ({
    id: item.id || "",
    image: item.image as string | undefined,
    title: item.title || "Untitled",
    subtitle: item.description || undefined,
    sortOrder: item.sortOrder,
  }));

  function renderField(field: typeof sectionConfig.fields[number]) {
    if (field.type === "textarea") {
      return <textarea value={editForm[field.name] || ""} onChange={(e) => setEditForm((p) => ({ ...p, [field.name]: e.target.value }))} placeholder={field.placeholder} rows={4} className="w-full resize-none rounded-md border border-[#e2e8f0] bg-white px-3 py-2 text-sm outline-none focus:border-[#dc2626] focus:ring-1 focus:ring-[#dc2626]" />;
    }
    if (field.type === "image") {
      return <MediaUrlField value={editForm[field.name] || ""} onChange={(url) => setEditForm((p) => ({ ...p, [field.name]: url }))} placeholder={field.placeholder} />;
    }
    return <input type="text" value={editForm[field.name] || ""} onChange={(e) => setEditForm((p) => ({ ...p, [field.name]: e.target.value }))} placeholder={field.placeholder} className="h-10 w-full rounded-md border border-[#e2e8f0] bg-white px-3 text-sm outline-none focus:border-[#dc2626] focus:ring-1 focus:ring-[#dc2626]" />;
  }

  return (
    <div className="space-y-6">
      {deleteConfirmId && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="fixed inset-0 bg-black/60" onClick={() => !deletingId && setDeleteConfirmId(null)} />
          <div className="relative w-full max-w-md rounded-xl border border-red-200 bg-white p-6 shadow-2xl">
            <button type="button" onClick={() => setDeleteConfirmId(null)} disabled={!!deletingId} className="absolute right-4 top-4 text-gray-400 hover:text-gray-600"><X className="size-4" /></button>
            <div className="flex flex-col items-center text-center space-y-4 pt-2">
              <div className="flex size-14 items-center justify-center rounded-full bg-red-50 text-red-500"><Trash2 className="size-7" /></div>
              <div><h3 className="text-lg font-bold text-[#1a3a52]">Delete Item</h3><p className="text-sm text-gray-500">Are you sure? This cannot be undone.</p></div>
            </div>
            <div className="mt-6 flex justify-end gap-2 border-t pt-4">
              <Button variant="outline" onClick={() => setDeleteConfirmId(null)} disabled={!!deletingId}>Cancel</Button>
              <Button onClick={handleDeleteConfirm} disabled={!!deletingId} className="bg-red-500 hover:bg-red-600 text-white gap-2">{deletingId ? <Loader2 className="size-4 animate-spin" /> : <Trash2 className="size-4" />}{deletingId ? "Deleting..." : "Yes, Delete"}</Button>
            </div>
          </div>
        </div>
      )}

      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-semibold text-[#1a3a52]">{sectionConfig.title}</h2>
          <p className="mt-1 text-sm text-gray-500">{sectionConfig.description}</p>
        </div>
        <Button type="button" onClick={openCreate} className="flex items-center gap-2 bg-[#dc2626] text-white hover:bg-[#b91c1c]"><Plus className="size-4" />Add Item</Button>
      </div>

      {loadError && <div className="rounded-md border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">{loadError}</div>}

      {editingId && (
        <div className="rounded-lg border border-[#e2e8f0] bg-white p-6">
          <h3 className="text-lg font-semibold text-[#1a3a52]">{editingId === "new" ? "Create New Item" : "Edit Item"}</h3>
          <div className="mt-4 space-y-4">
            {sectionConfig.fields.map((field) => (
              <div key={field.name} className="space-y-1.5"><label className="text-sm font-medium text-[#1a3a52]">{field.label}</label>{renderField(field)}</div>
            ))}
          </div>
          <div className="mt-5 flex gap-3">
            <Button type="button" onClick={handleSave} disabled={saving} className="flex items-center gap-2 bg-[#dc2626] text-white hover:bg-[#b91c1c] disabled:opacity-60">{saving ? <Loader2 className="size-4 animate-spin" /> : <Save className="size-4" />}{saving ? "Saving..." : "Save"}</Button>
            <Button type="button" variant="outline" onClick={cancelEdit}>Cancel</Button>
          </div>
        </div>
      )}

      {loading ? (
        <div className="flex items-center justify-center py-12"><Loader2 className="size-6 animate-spin text-[#dc2626]" /></div>
      ) : (
        <AdminTable data={tableData} itemLabel={sectionConfig.title} onEdit={openEdit} onDelete={handleDeleteClick} showImage={sectionConfig.fields.some((f) => f.type === "image")} deletingId={deletingId} />
      )}
    </div>
  );
}

"use client";

import { useState, useEffect, useCallback } from "react";
import { Plus, Save, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import AdminTable, { type TableRowData } from "@/components/admin/AdminTable";
import MediaUrlField from "@/components/admin/MediaUrlField";
import type { AdminSection } from "@/components/admin/admin-content-config";
import type { SectionItem } from "@/lib/services/sections";
import * as sectionsService from "@/lib/services/sections";

type SectionEditorProps = {
  sectionKey: string;
  sectionConfig: AdminSection;
};

export default function SectionEditor({ sectionKey, sectionConfig }: SectionEditorProps) {
  const [items, setItems] = useState<SectionItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editForm, setEditForm] = useState<Record<string, string>>({});
  const [message, setMessage] = useState("");

  const showMessage = useCallback((msg: string) => {
    setMessage(msg);
    setTimeout(() => setMessage(""), 3000);
  }, []);

  async function loadItems() {
    setLoading(true);
    const res = await sectionsService.fetchSectionItems(sectionKey);
    if (res.success) {
      setItems(res.data);
    } else {
      const createRes = await sectionsService.createSection({ key: sectionKey });
      if (createRes.success) setItems([]);
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

  function cancelEdit() {
    setEditingId(null);
    setEditForm({});
  }

  async function handleSave() {
    setSaving(true);
    const data: SectionItem = { title: editForm.title || "" };
    sectionConfig.fields.forEach((f) => {
      (data as Record<string, unknown>)[f.name] = editForm[f.name] || "";
    });

    if (editingId === "new") {
      const res = await sectionsService.createSectionItem(sectionKey, data);
      if (res.success) {
        showMessage("Item created successfully.");
        loadItems();
        cancelEdit();
      } else {
        showMessage(res.message || "Failed to create.");
      }
    } else if (editingId) {
      const res = await sectionsService.updateSectionItem(sectionKey, editingId, data);
      if (res.success) {
        showMessage("Item updated successfully.");
        loadItems();
        cancelEdit();
      } else {
        showMessage(res.message || "Failed to update.");
      }
    }
    setSaving(false);
  }

  async function handleDelete(id: string) {
    setDeletingId(id);
    const res = await sectionsService.deleteSectionItem(sectionKey, id);
    if (res.success) {
      showMessage("Item deleted.");
      loadItems();
    } else {
      showMessage(res.message || "Failed to delete.");
    }
    setDeletingId(null);
  }

  const tableData: TableRowData[] = items.map((item) => ({
    id: item.id || "",
    image: (item as Record<string, unknown>).image as string | undefined,
    title: item.title || "Untitled",
    subtitle: item.description || undefined,
    sortOrder: item.sortOrder,
  }));

  function renderField(field: typeof sectionConfig.fields[number]) {
    if (field.type === "textarea") {
      return (
        <textarea
          value={editForm[field.name] || ""}
          onChange={(e) => setEditForm((prev) => ({ ...prev, [field.name]: e.target.value }))}
          placeholder={field.placeholder}
          rows={4}
          className="w-full resize-none rounded-md border border-[#e2e8f0] bg-white px-3 py-2 text-sm outline-none focus:border-[#dc2626] focus:ring-1 focus:ring-[#dc2626]"
        />
      );
    }
    if (field.type === "image") {
      return (
        <MediaUrlField
          value={editForm[field.name] || ""}
          onChange={(url) => setEditForm((prev) => ({ ...prev, [field.name]: url }))}
          placeholder={field.placeholder}
        />
      );
    }
    return (
      <input
        type="text"
        value={editForm[field.name] || ""}
        onChange={(e) => setEditForm((prev) => ({ ...prev, [field.name]: e.target.value }))}
        placeholder={field.placeholder}
        className="h-10 w-full rounded-md border border-[#e2e8f0] bg-white px-3 text-sm outline-none focus:border-[#dc2626] focus:ring-1 focus:ring-[#dc2626]"
      />
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-semibold text-[#1a3a52]">{sectionConfig.title}</h2>
          <p className="mt-1 text-sm text-gray-500">{sectionConfig.description}</p>
        </div>
        <Button
          type="button"
          onClick={openCreate}
          className="flex items-center gap-2 bg-[#dc2626] text-white hover:bg-[#b91c1c]"
        >
          <Plus className="size-4" />
          Add Item
        </Button>
      </div>

      {message && (
        <div className="rounded-md border border-green-200 bg-green-50 px-4 py-3 text-sm text-green-600">{message}</div>
      )}

      {editingId && (
        <div className="rounded-lg border border-[#e2e8f0] bg-white p-6">
          <h3 className="text-lg font-semibold text-[#1a3a52]">
            {editingId === "new" ? "Create New Item" : "Edit Item"}
          </h3>
          <div className="mt-4 space-y-4">
            {sectionConfig.fields.map((field) => (
              <div key={field.name} className="space-y-1.5">
                <label className="text-sm font-medium text-[#1a3a52]">{field.label}</label>
                {renderField(field)}
              </div>
            ))}
          </div>
          <div className="mt-5 flex gap-3">
            <Button
              type="button"
              onClick={handleSave}
              disabled={saving}
              className="flex items-center gap-2 bg-[#dc2626] text-white hover:bg-[#b91c1c] disabled:opacity-60"
            >
              {saving ? <Loader2 className="size-4 animate-spin" /> : <Save className="size-4" />}
              {saving ? "Saving..." : "Save"}
            </Button>
            <Button type="button" variant="outline" onClick={cancelEdit}>
              Cancel
            </Button>
          </div>
        </div>
      )}

      {loading ? (
        <div className="flex items-center justify-center py-12">
          <Loader2 className="size-6 animate-spin text-[#dc2626]" />
        </div>
      ) : (
        <AdminTable
          data={tableData}
          itemLabel={sectionConfig.title}
          onEdit={openEdit}
          onDelete={handleDelete}
          showImage={sectionConfig.fields.some((f) => f.type === "image")}
          deletingId={deletingId}
        />
      )}
    </div>
  );
}

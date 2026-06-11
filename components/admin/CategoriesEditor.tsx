"use client";

import { Loader2, Plus, Save, Trash2, X } from "lucide-react";
import { useCallback, useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { showToast } from "@/components/admin/AdminToast";
import { friendlyError } from "@/lib/format-errors";
import {
  getSectionByKey,
  listSectionCategories,
  createSectionCategory,
  updateSectionCategory,
  deleteSectionCategory,
  type SectionCategory,
  type CreateSectionCategoryPayload,
} from "@/lib/services/sections";

type Draft = Omit<CreateSectionCategoryPayload, "sectionId">;

function emptyDraft(): Draft {
  return { name: "", slug: "", description: "", imageUrl: "" };
}

function slugify(value: string): string {
  return value.trim().toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
}

export default function CategoriesEditor({
  sectionKey = "products",
  sectionTitle = "Products",
}: {
  sectionKey?: string;
  sectionTitle?: string;
} = {}) {
  const [sectionId, setSectionId] = useState<string | null>(null);
  const [categories, setCategories] = useState<SectionCategory[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [activeDraft, setActiveDraft] = useState<Draft | null>(null);
  const [activeId, setActiveId] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [deleteConfirmId, setDeleteConfirmId] = useState<string | null>(null);

  const refresh = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      let sectionRes = await getSectionByKey(sectionKey);
      if (!sectionRes.success && (sectionRes.statusCode === 404 || sectionRes.message?.toLowerCase().includes("not found"))) {
        const { createSection } = await import("@/lib/services/sections");
        const createRes = await createSection({ key: sectionKey, slug: sectionKey, title: sectionTitle });
        sectionRes = createRes as any;
      }
      if (!sectionRes.success) {
        setError(friendlyError(sectionRes.message, sectionRes.errors, `load ${sectionKey}`));
        setLoading(false);
        return;
      }
      setSectionId(sectionRes.data.id);
      const res = await listSectionCategories(sectionRes.data.id);
      if (!res.success) {
        setError(friendlyError(res.message, res.errors, "load categories"));
      } else {
        setCategories(res.data);
      }
    } catch {
      setError("Network error.");
    }
    setLoading(false);
  }, [sectionKey, sectionTitle]);

  useEffect(() => { refresh(); }, [refresh]);

  const handleNew = () => { setActiveId(null); setActiveDraft(emptyDraft()); };
  const handleEdit = (cat: SectionCategory) => { setActiveId(cat.id); setActiveDraft({ name: cat.name, slug: cat.slug, description: cat.description ?? "", imageUrl: cat.imageUrl ?? "" }); };
  const handleCancel = () => { setActiveId(null); setActiveDraft(null); };

  const handleDeleteClick = (id: string) => setDeleteConfirmId(id);

  const handleDeleteConfirm = async () => {
    if (!deleteConfirmId) return;
    const id = deleteConfirmId;
    setDeletingId(id);
    const res = await deleteSectionCategory(id);
    if (!res.success) showToast("error", friendlyError(res.message, res.errors, "delete category"));
    else { showToast("success", "Category deleted."); if (activeId === id) { setActiveId(null); setActiveDraft(null); } }
    setDeletingId(null);
    setDeleteConfirmId(null);
    refresh();
  };

  const handleSave = async () => {
    if (!activeDraft || !sectionId) return;
    if (!activeDraft.name.trim()) { showToast("error", "Category name is required."); return; }
    setSaving(true);
    const payload: CreateSectionCategoryPayload = {
      sectionId,
      name: activeDraft.name.trim(),
      slug: activeDraft.slug.trim() || slugify(activeDraft.name),
      description: activeDraft.description?.trim() || undefined,
      imageUrl: activeDraft.imageUrl?.trim() || undefined,
    };
    const res = activeId ? await updateSectionCategory(activeId, payload) : await createSectionCategory(payload);
    setSaving(false);
    if (!res.success) showToast("error", friendlyError(res.message, res.errors, "save category"));
    else { showToast("success", activeId ? "Category updated." : "Category created."); setActiveId(null); setActiveDraft(null); refresh(); }
  };

  const autoSlug = (name: string) => {
    if (!activeDraft) return;
    if (!activeDraft.slug || activeDraft.slug === slugify(activeDraft.name)) {
      setActiveDraft({ ...activeDraft, name, slug: slugify(name) });
    } else {
      setActiveDraft({ ...activeDraft, name });
    }
  };

  return (
    <div className="space-y-6">
      {deleteConfirmId && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="fixed inset-0 bg-black/60" onClick={() => !deletingId && setDeleteConfirmId(null)} />
          <div className="relative w-full max-w-md rounded-xl border border-red-200 bg-white p-6 shadow-2xl">
            <button type="button" onClick={() => setDeleteConfirmId(null)} disabled={!!deletingId} className="absolute right-4 top-4 text-gray-400"><X className="size-4" /></button>
            <div className="flex flex-col items-center text-center space-y-4 pt-2">
              <div className="flex size-14 items-center justify-center rounded-full bg-red-50 text-red-500"><Trash2 className="size-7" /></div>
              <div><h3 className="text-lg font-bold text-[#1a3a52]">Delete Category</h3><p className="text-sm text-gray-500">Products in this category may lose classification.</p></div>
            </div>
            <div className="mt-6 flex justify-end gap-2 border-t pt-4"><Button variant="outline" onClick={() => setDeleteConfirmId(null)} disabled={!!deletingId}>Cancel</Button><Button onClick={handleDeleteConfirm} disabled={!!deletingId} className="bg-red-500 hover:bg-red-600 text-white gap-2">{deletingId ? <Loader2 className="size-4 animate-spin" /> : <Trash2 className="size-4" />}{deletingId ? "Deleting..." : "Yes, Delete"}</Button></div>
          </div>
        </div>
      )}

      <div className="rounded-lg border border-[#e2e8f0] bg-white">
        <div className="flex items-center justify-between border-b px-6 py-4">
          <div><h2 className="text-lg font-semibold text-[#1a3a52]">{sectionTitle} Categories</h2><p className="mt-1 text-sm text-gray-500">Create and manage product categories for filtering.</p></div>
          <div className="flex items-center gap-2">
            <Button type="button" variant="outline" size="sm" onClick={refresh} disabled={loading}>Refresh</Button>
            <Button type="button" size="sm" onClick={handleNew} disabled={!!activeDraft && !activeId} className="gap-2 bg-[#dc2626] text-white hover:bg-[#b91c1c]"><Plus className="size-4" />Add Category</Button>
          </div>
        </div>
        <div className="p-6">
          {loading ? (
            <div className="flex items-center justify-center gap-2 py-8 text-sm text-gray-400"><Loader2 className="size-4 animate-spin" />Loading...</div>
          ) : error ? (
            <div className="rounded-md border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">{error}</div>
          ) : categories.length === 0 ? (
            <div className="rounded-md border border-dashed border-[#e2e8f0] bg-[#f8f9fb] p-8 text-center text-sm text-gray-400">No categories yet. Click <b>Add Category</b> to create.</div>
          ) : (
            <div className="overflow-hidden rounded-md border border-[#e2e8f0]">
              <table className="w-full text-sm">
                <thead className="bg-[#f8f9fb] text-left text-xs font-bold uppercase tracking-wider text-[#1a3a52]">
                  <tr><th className="px-4 py-3">Name</th><th className="px-4 py-3">Slug</th><th className="px-4 py-3">Description</th><th className="px-4 py-3 text-right">Actions</th></tr>
                </thead>
                <tbody className="divide-y divide-[#e2e8f0]">
                  {categories.map((cat) => (
                    <tr key={cat.id} className="hover:bg-[#f8f9fb]/60">
                      <td className="px-4 py-3 font-semibold text-[#1a3a52]">{cat.name}</td>
                      <td className="px-4 py-3 text-xs text-gray-500">{cat.slug}</td>
                      <td className="max-w-xs truncate px-4 py-3 text-xs text-gray-500">{cat.description || "—"}</td>
                      <td className="px-4 py-3 text-right">
                        <div className="flex items-center justify-end gap-1">
                          <Button type="button" size="sm" variant="ghost" onClick={() => handleEdit(cat)} className="h-7 px-2 text-xs text-[#1a3a52]">Edit</Button>
                          <Button type="button" size="icon" variant="ghost" onClick={() => handleDeleteClick(cat.id)} disabled={deletingId === cat.id} className="size-7 text-red-500">{deletingId === cat.id ? <Loader2 className="size-3.5 animate-spin" /> : <Trash2 className="size-3.5" />}</Button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>

      {activeDraft && (
        <div className="rounded-lg border border-[#e2e8f0] bg-white p-6">
          <h3 className="text-lg font-semibold text-[#1a3a52]">{activeId ? `Edit: ${activeDraft.name || "Untitled"}` : "New Category"}</h3>
          <div className="mt-4 space-y-4">
            <div className="space-y-1.5"><label className="text-sm font-medium text-[#1a3a52]">Name *</label><input type="text" value={activeDraft.name} onChange={(e) => autoSlug(e.target.value)} placeholder="e.g. Circuit Protection" className="h-10 w-full rounded-md border border-[#e2e8f0] bg-white px-3 text-sm outline-none focus:border-[#dc2626]" /></div>
            <div className="space-y-1.5"><label className="text-sm font-medium text-[#1a3a52]">Slug *</label><input type="text" value={activeDraft.slug} onChange={(e) => setActiveDraft({ ...activeDraft!, slug: slugify(e.target.value) })} placeholder="e.g. circuit-protection" className="h-10 w-full rounded-md border border-[#e2e8f0] bg-white px-3 text-sm outline-none focus:border-[#dc2626]" /></div>
            <div className="space-y-1.5"><label className="text-sm font-medium text-[#1a3a52]">Description</label><textarea value={activeDraft.description} onChange={(e) => setActiveDraft({ ...activeDraft!, description: e.target.value })} rows={3} className="w-full resize-none rounded-md border border-[#e2e8f0] bg-white px-3 py-2 text-sm outline-none focus:border-[#dc2626]" /></div>
            <div className="flex gap-3 border-t pt-4">
              <Button onClick={handleSave} disabled={saving} className="flex items-center gap-2 bg-[#dc2626] text-white hover:bg-[#b91c1c] disabled:opacity-60">{saving ? <Loader2 className="size-4 animate-spin" /> : <Save className="size-4" />}{saving ? "Saving..." : activeId ? "Update Category" : "Create Category"}</Button>
              <Button type="button" variant="outline" onClick={handleCancel}>Cancel</Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

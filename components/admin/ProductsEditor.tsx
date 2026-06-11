"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { Plus, Save, Loader2, Trash2, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import MediaUrlField from "@/components/admin/MediaUrlField";
import { showToast } from "@/components/admin/AdminToast";
import { friendlyError } from "@/lib/format-errors";
import { listAdminProducts, createAdminProduct, updateAdminProduct, deleteAdminProduct, type AdminProductPayload } from "@/lib/services/products";
import { getSectionByKey, listSectionCategories, type SectionCategory } from "@/lib/services/sections";
import type { Product } from "@/types/product";

export default function ProductsEditor() {
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<SectionCategory[]>([]);
  const [categoriesLoaded, setCategoriesLoaded] = useState(false);
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [deleteConfirmId, setDeleteConfirmId] = useState<string | null>(null);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [draft, setDraft] = useState<AdminProductPayload>({ name: "", slug: "", category: "", shortDescription: "", description: "", images: [], coreAttributes: [], technicalSpecs: [], applications: [], featured: false });
  const [newAttr, setNewAttr] = useState("");
  const [newApp, setNewApp] = useState("");
  const [newSpec, setNewSpec] = useState({ label: "", value: "" });

  async function loadProducts() {
    setLoading(true);
    setLoadError(null);
    try {
      const res = await listAdminProducts();
      if (res.success) setProducts(res.data);
      else setLoadError(friendlyError(res.message, res.errors, "load products"));
    } catch { setLoadError("Network error."); }
    setLoading(false);
  }

  useEffect(() => { loadProducts(); }, []);

  async function loadCategories() {
    try {
      const sectionRes = await getSectionByKey("products");
      if (sectionRes.success) {
        const catRes = await listSectionCategories(sectionRes.data.id);
        if (catRes.success) setCategories(catRes.data);
      }
    } catch { /* silent */ }
    setCategoriesLoaded(true);
  }

  useEffect(() => { loadCategories(); }, []);

  function openCreate() {
    setDraft({ name: "", slug: "", category: categories[0]?.name || "", shortDescription: "", description: "", images: [], coreAttributes: [], technicalSpecs: [], applications: [], featured: false });
    setEditingId("new");
  }

  function openEdit(product: Product) {
    setDraft({ name: product.name, slug: product.slug, category: product.category, shortDescription: product.shortDescription, description: product.description, images: [...product.images], coreAttributes: [...product.coreAttributes], technicalSpecs: [...product.technicalSpecs], applications: [...product.applications], featured: product.featured ?? false });
    setEditingId(product.id);
  }

  async function handleSave() {
    setSaving(true);
    const payload = { ...draft, slug: draft.slug || draft.name.toLowerCase().replace(/[^a-z0-9]+/g, "-") };
    try {
      if (editingId === "new") {
        const res = await createAdminProduct(payload);
        if (res.success) { showToast("success", "Product created."); loadProducts(); setEditingId(null); }
        else showToast("error", friendlyError(res.message, res.errors, "create product"));
      } else if (editingId) {
        const res = await updateAdminProduct(editingId, payload);
        if (res.success) { showToast("success", "Product updated."); loadProducts(); setEditingId(null); }
        else showToast("error", friendlyError(res.message, res.errors, "update product"));
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
      const res = await deleteAdminProduct(id);
      if (res.success) { showToast("success", "Product deleted."); loadProducts(); }
      else showToast("error", friendlyError(res.message, res.errors, "delete product"));
    } catch { showToast("error", "Network error."); }
    setDeletingId(null);
    setDeleteConfirmId(null);
  }

  const addImage = (url: string) => { if (url.trim()) setDraft((p) => ({ ...p, images: [...p.images, url.trim()] })); };
  const removeImage = (i: number) => setDraft((p) => ({ ...p, images: p.images.filter((_, idx) => idx !== i) }));
  const addAttr = () => { if (newAttr.trim()) { setDraft((p) => ({ ...p, coreAttributes: [...p.coreAttributes, newAttr.trim()] })); setNewAttr(""); } };
  const removeAttr = (i: number) => setDraft((p) => ({ ...p, coreAttributes: p.coreAttributes.filter((_, idx) => idx !== i) }));
  const addSpec = () => { if (newSpec.label.trim() && newSpec.value.trim()) { setDraft((p) => ({ ...p, technicalSpecs: [...p.technicalSpecs, { label: newSpec.label.trim(), value: newSpec.value.trim() }] })); setNewSpec({ label: "", value: "" }); } };
  const removeSpec = (i: number) => setDraft((p) => ({ ...p, technicalSpecs: p.technicalSpecs.filter((_, idx) => idx !== i) }));
  const addApp = () => { if (newApp.trim()) { setDraft((p) => ({ ...p, applications: [...p.applications, newApp.trim()] })); setNewApp(""); } };
  const removeApp = (i: number) => setDraft((p) => ({ ...p, applications: p.applications.filter((_, idx) => idx !== i) }));

  return (
    <div className="space-y-6">
      {deleteConfirmId && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="fixed inset-0 bg-black/60" onClick={() => !deletingId && setDeleteConfirmId(null)} />
          <div className="relative w-full max-w-md rounded-xl border border-red-200 bg-white p-6 shadow-2xl">
            <button type="button" onClick={() => setDeleteConfirmId(null)} disabled={!!deletingId} className="absolute right-4 top-4 text-gray-400"><X className="size-4" /></button>
            <div className="flex flex-col items-center text-center space-y-4 pt-2">
              <div className="flex size-14 items-center justify-center rounded-full bg-red-50 text-red-500"><Trash2 className="size-7" /></div>
              <div><h3 className="text-lg font-bold text-[#1a3a52]">Delete Product</h3><p className="text-sm text-gray-500">This cannot be undone.</p></div>
            </div>
            <div className="mt-6 flex justify-end gap-2 border-t pt-4"><Button variant="outline" onClick={() => setDeleteConfirmId(null)} disabled={!!deletingId}>Cancel</Button><Button onClick={handleDeleteConfirm} disabled={!!deletingId} className="bg-red-500 hover:bg-red-600 text-white gap-2">{deletingId ? <Loader2 className="size-4 animate-spin" /> : <Trash2 className="size-4" />}{deletingId ? "Deleting..." : "Yes, Delete"}</Button></div>
          </div>
        </div>
      )}

      <div className="flex items-center justify-between">
        <div><h2 className="text-xl font-semibold text-[#1a3a52]">Products</h2><p className="mt-1 text-sm text-gray-500">Manage product catalogue.</p></div>
        <Button onClick={openCreate} className="flex items-center gap-2 bg-[#dc2626] text-white hover:bg-[#b91c1c]"><Plus className="size-4" />Add Product</Button>
      </div>

      {loadError && <div className="rounded-md border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">{loadError}</div>}

      {editingId && (
        <div className="rounded-lg border border-[#e2e8f0] bg-white p-6">
          <h3 className="text-lg font-semibold text-[#1a3a52]">{editingId === "new" ? "Create Product" : "Edit Product"}</h3>
          <div className="mt-4 space-y-4">
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-1.5"><label className="text-sm font-medium text-[#1a3a52]">Product Name</label><input type="text" value={draft.name} onChange={(e) => setDraft((p) => ({ ...p, name: e.target.value }))} placeholder="e.g. Single Pole MCB" className="h-10 w-full rounded-md border border-[#e2e8f0] bg-white px-3 text-sm outline-none focus:border-[#dc2626]" /></div>
              <div className="space-y-1.5"><label className="text-sm font-medium text-[#1a3a52]">Category</label>
                {categoriesLoaded && categories.length > 0 ? (
                  <div className="flex gap-2">
                    <select value={draft.category} onChange={(e) => setDraft((p) => ({ ...p, category: e.target.value }))} className="h-10 flex-1 rounded-md border border-[#e2e8f0] bg-white px-3 text-sm outline-none focus:border-[#dc2626]">
                      <option value="">-- Select or type --</option>
                      {categories.map((cat) => (
                        <option key={cat.id} value={cat.name}>{cat.name}</option>
                      ))}
                    </select>
                    <input type="text" value={categories.some((c) => c.name === draft.category) ? "" : draft.category} onChange={(e) => setDraft((p) => ({ ...p, category: e.target.value }))} placeholder="Or type custom" className="h-10 w-40 rounded-md border border-[#e2e8f0] bg-white px-3 text-sm outline-none focus:border-[#dc2626]" />
                  </div>
                ) : (
                  <input type="text" value={draft.category} onChange={(e) => setDraft((p) => ({ ...p, category: e.target.value }))} placeholder="e.g. Circuit Protection" className="h-10 w-full rounded-md border border-[#e2e8f0] bg-white px-3 text-sm outline-none focus:border-[#dc2626]" />
                )}
              </div>
            </div>
            <div className="space-y-1.5"><label className="text-sm font-medium text-[#1a3a52]">Short Description</label><textarea value={draft.shortDescription} onChange={(e) => setDraft((p) => ({ ...p, shortDescription: e.target.value }))} rows={2} className="w-full resize-none rounded-md border border-[#e2e8f0] bg-white px-3 py-2 text-sm outline-none focus:border-[#dc2626]" /></div>
            <div className="space-y-1.5"><label className="text-sm font-medium text-[#1a3a52]">Full Description</label><textarea value={draft.description} onChange={(e) => setDraft((p) => ({ ...p, description: e.target.value }))} rows={4} className="w-full resize-none rounded-md border border-[#e2e8f0] bg-white px-3 py-2 text-sm outline-none focus:border-[#dc2626]" /></div>
            <div className="space-y-1.5"><label className="text-sm font-medium text-[#1a3a52]">Images</label>{draft.images.map((url, i) => (<div key={i} className="flex items-center gap-2"><span className="flex-1 truncate rounded border border-[#e2e8f0] bg-[#f8f9fb] px-3 py-2 text-xs text-gray-600">{url}</span><button type="button" onClick={() => removeImage(i)} className="shrink-0 rounded p-1.5 text-red-500 hover:bg-red-50"><Trash2 className="size-3.5" /></button></div>))}<MediaUrlField value="" onChange={addImage} placeholder="Add image URL or upload" /></div>
            <div className="space-y-1.5"><label className="text-sm font-medium text-[#1a3a52]">Core Attributes</label>{draft.coreAttributes.map((attr, i) => (<div key={i} className="flex items-center gap-2"><span className="flex-1 rounded border border-[#e2e8f0] bg-[#f8f9fb] px-3 py-1.5 text-xs text-gray-600">{attr}</span><button type="button" onClick={() => removeAttr(i)} className="shrink-0 rounded p-1.5 text-red-500 hover:bg-red-50"><Trash2 className="size-3.5" /></button></div>))}<div className="flex gap-2"><input type="text" value={newAttr} onChange={(e) => setNewAttr(e.target.value)} onKeyDown={(e) => e.key === "Enter" && (e.preventDefault(), addAttr())} placeholder="Add attribute" className="h-9 flex-1 rounded-md border border-[#e2e8f0] bg-white px-3 text-sm outline-none focus:border-[#dc2626]" /><button type="button" onClick={addAttr} className="shrink-0 rounded-md bg-[#dc2626] px-3 text-xs text-white hover:bg-[#b91c1c]">Add</button></div></div>
            <div className="space-y-1.5"><label className="text-sm font-medium text-[#1a3a52]">Technical Specifications</label>{draft.technicalSpecs.map((spec, i) => (<div key={i} className="flex items-center gap-2"><span className="rounded border border-[#e2e8f0] bg-[#f8f9fb] px-2 py-1 text-xs text-gray-600">{spec.label}: {spec.value}</span><button type="button" onClick={() => removeSpec(i)} className="shrink-0 rounded p-1.5 text-red-500 hover:bg-red-50"><Trash2 className="size-3.5" /></button></div>))}<div className="flex gap-2"><input type="text" value={newSpec.label} onChange={(e) => setNewSpec((p) => ({ ...p, label: e.target.value }))} placeholder="Label" className="h-9 w-1/3 rounded-md border border-[#e2e8f0] bg-white px-3 text-sm outline-none focus:border-[#dc2626]" /><input type="text" value={newSpec.value} onChange={(e) => setNewSpec((p) => ({ ...p, value: e.target.value }))} placeholder="Value" className="h-9 flex-1 rounded-md border border-[#e2e8f0] bg-white px-3 text-sm outline-none focus:border-[#dc2626]" /><button type="button" onClick={addSpec} className="shrink-0 rounded-md bg-[#dc2626] px-3 text-xs text-white hover:bg-[#b91c1c]">Add</button></div></div>
            <div className="space-y-1.5"><label className="text-sm font-medium text-[#1a3a52]">Applications</label>{draft.applications.map((app, i) => (<div key={i} className="flex items-center gap-2"><span className="flex-1 rounded border border-[#e2e8f0] bg-[#f8f9fb] px-3 py-1.5 text-xs text-gray-600">{app}</span><button type="button" onClick={() => removeApp(i)} className="shrink-0 rounded p-1.5 text-red-500 hover:bg-red-50"><Trash2 className="size-3.5" /></button></div>))}<div className="flex gap-2"><input type="text" value={newApp} onChange={(e) => setNewApp(e.target.value)} onKeyDown={(e) => e.key === "Enter" && (e.preventDefault(), addApp())} placeholder="Add application" className="h-9 flex-1 rounded-md border border-[#e2e8f0] bg-white px-3 text-sm outline-none focus:border-[#dc2626]" /><button type="button" onClick={addApp} className="shrink-0 rounded-md bg-[#dc2626] px-3 text-xs text-white hover:bg-[#b91c1c]">Add</button></div></div>
            <label className="flex items-center gap-2 text-sm"><input type="checkbox" checked={draft.featured} onChange={(e) => setDraft((p) => ({ ...p, featured: e.target.checked }))} className="size-4 accent-[#dc2626]" /><span className="text-[#1a3a52]">Featured Product</span></label>
          </div>
          <div className="mt-5 flex gap-3">
            <Button onClick={handleSave} disabled={saving} className="flex items-center gap-2 bg-[#dc2626] text-white hover:bg-[#b91c1c] disabled:opacity-60">{saving ? <Loader2 className="size-4 animate-spin" /> : <Save className="size-4" />}{saving ? "Saving..." : "Save"}</Button>
            <Button type="button" variant="outline" onClick={() => setEditingId(null)}>Cancel</Button>
          </div>
        </div>
      )}

      {loading ? <div className="flex items-center justify-center py-12"><Loader2 className="size-6 animate-spin text-[#dc2626]" /></div> : (
        <div className="w-full overflow-x-auto rounded-lg border border-[#e2e8f0] bg-white shadow-sm">
          <table className="w-full border-collapse text-left text-sm">
            <thead className="border-b border-[#e2e8f0] bg-[#f8f9fb] text-xs font-bold uppercase tracking-wider text-[#1a3a52]"><tr><th className="w-16 px-5 py-3.5 text-center">No.</th><th className="min-w-[200px] px-5 py-3.5">Product</th><th className="w-24 px-5 py-3.5 text-center">Featured</th><th className="w-28 px-5 py-3.5 text-center">Actions</th></tr></thead>
            <tbody className="divide-y divide-[#e2e8f0]">
              {products.length === 0 ? <tr><td colSpan={4} className="px-5 py-10 text-center text-sm text-gray-400">No products found. Click Add to create.</td></tr> : products.map((product, index) => (
                <tr key={product.id} className="hover:bg-[#f8f9fb]/60 group">
                  <td className="px-5 py-4 text-center font-medium text-gray-400">{index + 1}</td>
                  <td className="min-w-0 px-5 py-3"><p className="max-w-sm truncate font-semibold text-[#1a3a52]">{product.name}</p><p className="mt-0.5 text-xs text-gray-500">{product.category}{product.images.length > 0 && ` | ${product.images.length} image(s)`}</p></td>
                  <td className="px-5 py-3 text-center">{product.featured && <span className="rounded-full bg-[#dc2626] px-2 py-0.5 text-[10px] text-white">Featured</span>}</td>
                  <td className="px-5 py-3 text-center"><div className="flex items-center justify-center gap-1.5"><Button type="button" variant="ghost" size="icon" onClick={() => openEdit(product)} className="size-8 text-[#1a3a52] hover:bg-[#1a3a52]/8"><svg className="size-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><path d="M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7" /><path d="M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z" /></svg></Button><Button type="button" variant="ghost" size="icon" onClick={() => handleDeleteClick(product.id)} disabled={deletingId === product.id} className="size-8 text-red-500 hover:bg-red-50"><Trash2 className="size-3.5" /></Button></div></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

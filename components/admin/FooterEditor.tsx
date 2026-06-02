"use client";

import { useState, useEffect, useCallback } from "react";
import { Plus, Save, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import AdminTable, { type TableRowData } from "@/components/admin/AdminTable";
import * as footerService from "@/lib/services/footer";
import type { FooterData } from "@/lib/services/footer";

export default function FooterEditor() {
  const [footers, setFooters] = useState<FooterData[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editForm, setEditForm] = useState({ description: "", address: "", phone: "", email: "", copyright: "" });
  const [message, setMessage] = useState("");

  const showMessage = useCallback((msg: string) => {
    setMessage(msg);
    setTimeout(() => setMessage(""), 3000);
  }, []);

  async function loadFooters() {
    setLoading(true);
    const res = await footerService.fetchFooter();
    if (res.success) setFooters(res.data);
    setLoading(false);
  }

  useEffect(() => { loadFooters(); }, []);

  function openCreate() {
    setEditForm({ description: "", address: "", phone: "", email: "", copyright: "" });
    setEditingId("new");
  }

  function openEdit(footer: FooterData) {
    setEditForm({
      description: footer.description || "",
      address: footer.address || "",
      phone: footer.phone || "",
      email: footer.email || "",
      copyright: footer.copyright || "",
    });
    setEditingId(footer.id || null);
  }

  function cancelEdit() { setEditingId(null); }

  async function handleSave() {
    setSaving(true);
    const payload: FooterData = {
      ...editForm,
      socialLinks: [],
      quickLinks: [],
      status: "ACTIVE",
    };

    if (editingId === "new") {
      const res = await footerService.createFooter(payload);
      if (res.success) { showMessage("Footer created."); loadFooters(); cancelEdit(); }
      else showMessage(res.message || "Failed to create.");
    } else if (editingId) {
      const res = await footerService.updateFooter(editingId, payload);
      if (res.success) { showMessage("Footer updated."); loadFooters(); cancelEdit(); }
      else showMessage(res.message || "Failed to update.");
    }
    setSaving(false);
  }

  async function handleDelete(id: string) {
    setDeletingId(id);
    const res = await footerService.deleteFooter(id);
    if (res.success) { showMessage("Footer deleted."); loadFooters(); }
    else showMessage(res.message || "Failed to delete.");
    setDeletingId(null);
  }

  const tableData: TableRowData[] = footers.map((f) => ({
    id: f.id || "",
    title: f.description?.slice(0, 80) || "Footer Entry",
    subtitle: `${f.address || ""} | ${f.email || ""}`,
    status: f.status,
  }));

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-semibold text-[#1a3a52]">Footer</h2>
          <p className="mt-1 text-sm text-gray-500">Manage footer content and contact info.</p>
        </div>
        <Button onClick={openCreate} className="flex items-center gap-2 bg-[#dc2626] text-white hover:bg-[#b91c1c]">
          <Plus className="size-4" /> Add Footer
        </Button>
      </div>

      {message && (
        <div className="rounded-md border border-green-200 bg-green-50 px-4 py-3 text-sm text-green-600">{message}</div>
      )}

      {editingId && (
        <div className="rounded-lg border border-[#e2e8f0] bg-white p-6">
          <h3 className="text-lg font-semibold text-[#1a3a52]">{editingId === "new" ? "Create Footer" : "Edit Footer"}</h3>
          <div className="mt-4 space-y-4">
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-1.5">
                <label className="text-sm font-medium text-[#1a3a52]">Phone</label>
                <input type="text" value={editForm.phone} onChange={(e) => setEditForm((p) => ({ ...p, phone: e.target.value }))} className="h-10 w-full rounded-md border border-[#e2e8f0] bg-white px-3 text-sm outline-none focus:border-[#dc2626] focus:ring-1 focus:ring-[#dc2626]" />
              </div>
              <div className="space-y-1.5">
                <label className="text-sm font-medium text-[#1a3a52]">Email</label>
                <input type="email" value={editForm.email} onChange={(e) => setEditForm((p) => ({ ...p, email: e.target.value }))} className="h-10 w-full rounded-md border border-[#e2e8f0] bg-white px-3 text-sm outline-none focus:border-[#dc2626] focus:ring-1 focus:ring-[#dc2626]" />
              </div>
            </div>
            <div className="space-y-1.5">
              <label className="text-sm font-medium text-[#1a3a52]">Address</label>
              <input type="text" value={editForm.address} onChange={(e) => setEditForm((p) => ({ ...p, address: e.target.value }))} className="h-10 w-full rounded-md border border-[#e2e8f0] bg-white px-3 text-sm outline-none focus:border-[#dc2626] focus:ring-1 focus:ring-[#dc2626]" />
            </div>
            <div className="space-y-1.5">
              <label className="text-sm font-medium text-[#1a3a52]">Description</label>
              <textarea value={editForm.description} onChange={(e) => setEditForm((p) => ({ ...p, description: e.target.value }))} rows={3} className="w-full resize-none rounded-md border border-[#e2e8f0] bg-white px-3 py-2 text-sm outline-none focus:border-[#dc2626] focus:ring-1 focus:ring-[#dc2626]" />
            </div>
            <div className="space-y-1.5">
              <label className="text-sm font-medium text-[#1a3a52]">Copyright</label>
              <input type="text" value={editForm.copyright} onChange={(e) => setEditForm((p) => ({ ...p, copyright: e.target.value }))} className="h-10 w-full rounded-md border border-[#e2e8f0] bg-white px-3 text-sm outline-none focus:border-[#dc2626] focus:ring-1 focus:ring-[#dc2626]" />
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
        <AdminTable data={tableData} itemLabel="Footer" onEdit={openEdit} onDelete={handleDelete} showImage={false} deletingId={deletingId} />
      )}
    </div>
  );
}

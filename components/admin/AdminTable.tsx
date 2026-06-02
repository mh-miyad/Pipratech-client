"use client";

import Image from "next/image";
import { Edit2, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export type TableRowData = {
  id: string;
  image?: string | null;
  title: string;
  subtitle?: string | null;
  status?: string;
  sortOrder?: number;
};

type AdminTableProps = {
  data: TableRowData[];
  itemLabel: string;
  onEdit: (id: string) => void;
  onDelete: (id: string) => void;
  showImage?: boolean;
  deletingId?: string | null;
};

export default function AdminTable({
  data,
  itemLabel,
  onEdit,
  onDelete,
  showImage = true,
  deletingId = null,
}: AdminTableProps) {
  return (
    <div className="w-full overflow-x-auto rounded-lg border border-[#e2e8f0] bg-white shadow-sm">
      <table className="w-full border-collapse text-left text-sm">
        <thead className="border-b border-[#e2e8f0] bg-[#f8f9fb] text-xs font-bold uppercase tracking-wider text-[#1a3a52]">
          <tr>
            <th className="w-16 px-5 py-3.5 text-center">No.</th>
            {showImage && <th className="w-24 px-5 py-3.5">Image</th>}
            <th className="min-w-[200px] px-5 py-3.5">{itemLabel} Details</th>
            <th className="w-24 px-5 py-3.5 text-center">Order</th>
            <th className="w-28 px-5 py-3.5 text-center">Status</th>
            <th className="w-28 px-5 py-3.5 text-center">Actions</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-[#e2e8f0]">
          {data.length === 0 ? (
            <tr>
              <td colSpan={showImage ? 6 : 5} className="px-5 py-10 text-center text-sm text-gray-400">
                No {itemLabel.toLowerCase()} items found. Click add to create the first one.
              </td>
            </tr>
          ) : (
            data.map((row, index) => {
              const isActive = row.status === "ACTIVE" || row.status === "active" || row.status === undefined;
              const isDeleting = deletingId === row.id;

              return (
                <tr key={row.id} className="transition-colors duration-150 hover:bg-[#f8f9fb]/60 group">
                  <td className="px-5 py-4 text-center font-medium text-gray-400">{index + 1}</td>

                  {showImage && (
                    <td className="px-5 py-3">
                      <div className="relative size-12 overflow-hidden rounded-md border border-[#e2e8f0] bg-gray-50 shadow-sm">
                        {row.image ? (
                          <Image src={row.image} alt="" fill unoptimized className="object-cover" sizes="48px" />
                        ) : (
                          <div className="flex h-full items-center justify-center text-[9px] font-semibold uppercase text-gray-400">
                            No Img
                          </div>
                        )}
                      </div>
                    </td>
                  )}

                  <td className="min-w-0 px-5 py-3">
                    <div className="flex min-w-0 flex-col">
                      <p className="max-w-sm truncate font-semibold text-[#1a3a52] md:max-w-md xl:max-w-lg">
                        {row.title || "Untitled"}
                      </p>
                      {row.subtitle && (
                        <p className="mt-0.5 max-w-sm truncate text-xs text-gray-500 md:max-w-md xl:max-w-lg">
                          {row.subtitle}
                        </p>
                      )}
                    </div>
                  </td>

                  <td className="px-5 py-3 text-center font-medium text-gray-400">#{row.sortOrder ?? 0}</td>

                  <td className="px-5 py-3 text-center">
                    <Badge
                      className={
                        isActive
                          ? "border-none bg-[#dc2626] px-2 py-0.5 text-[10px] text-white hover:bg-[#dc2626]"
                          : "border-none bg-gray-200 px-2 py-0.5 text-[10px] text-gray-500"
                      }
                    >
                      {row.status ?? "ACTIVE"}
                    </Badge>
                  </td>

                  <td className="px-5 py-3 text-center">
                    <div className="flex items-center justify-center gap-1.5">
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        onClick={() => onEdit(row.id)}
                        className="size-8 text-[#1a3a52] hover:bg-[#1a3a52]/8 hover:text-[#1a3a52]"
                        aria-label="Edit item"
                      >
                        <Edit2 className="size-3.5" />
                      </Button>
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        onClick={() => onDelete(row.id)}
                        disabled={isDeleting}
                        className="size-8 text-red-500 hover:bg-red-50 hover:text-red-600"
                        aria-label="Delete item"
                      >
                        <Trash2 className="size-3.5" />
                      </Button>
                    </div>
                  </td>
                </tr>
              );
            })
          )}
        </tbody>
      </table>
    </div>
  );
}

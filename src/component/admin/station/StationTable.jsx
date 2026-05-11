import React, { useMemo, useState } from "react";
import {
  useReactTable,
  getCoreRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  flexRender,
} from "@tanstack/react-table";
import {
  Edit3,
  Trash2,
  Loader2,
  MapPin,
  Inbox,
  ChevronLeft,
  ChevronRight,
  Hash,
  ArrowUpDown,
  ArrowUp,
  ArrowDown
} from "lucide-react";

const StationTable = ({ items, loading, onEdit, onDelete }) => {
  const [sorting, setSorting] = useState([]);

  const columns = useMemo(
    () => [
      {
        header: () => <Hash size={12} className="mx-auto" />,
        accessorKey: "id",
        enableSorting: false,
        cell: (info) => (
          <span className="text-xs font-black text-slate-300">
            {String(info.row.index + 1).padStart(2, "0")}
          </span>
        ),
        meta: { className: "text-center w-16" },
      },
      {
        header: "Station Info",
        accessorKey: "name",
        cell: ({ row }) => {
          const s = row.original;
          return (
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-slate-900 flex items-center justify-center text-white text-[10px] font-black shadow-sm">
                {s.name.substring(0, 2).toUpperCase()}
              </div>
              <div>
                <p className="text-sm font-bold text-slate-900 leading-none mb-1 group-hover:text-emerald-600 transition-colors">
                  {s.name}
                </p>
                <p className="text-[10px] text-slate-400 font-bold tracking-tighter uppercase">
                  Ref: {s._id.slice(-6)}
                </p>
              </div>
            </div>
          );
        },
      },
      {
        header: "Location",
        accessorKey: "location.lat",
        cell: ({ row }) => {
          const loc = row.original.location;
          return (
            <div className="inline-flex items-center gap-1.5 text-slate-500 bg-slate-50 px-2 py-1 rounded-md border border-slate-100">
              <MapPin size={10} className="text-emerald-500" />
              {/* ✅ Crash fix */}
              <span className="text-[11px] font-mono font-bold tracking-tight">
                {loc?.lat?.toFixed(3) || "—"}, {loc?.lng?.toFixed(3) || "—"}
              </span>
            </div>
          );
        },
      },
      {
        header: "Inventory",
        accessorKey: "currentBikesCount",
        cell: ({ row }) => {
          const s = row.original;
          const stockPercent = s.capacity > 0
            ? (s.currentBikesCount / s.capacity) * 100
            : 0;

          const getStatusColor = (percent) => {
            if (percent < 20) return "bg-red-50 text-red-600 border-red-100";
            if (percent < 50) return "bg-amber-50 text-amber-600 border-amber-100";
            return "bg-emerald-50 text-emerald-600 border-emerald-100";
          };

          return (
            <div className="max-w-[140px] space-y-1.5">
              <div className="flex justify-between items-center">
                <span className={`text-[9px] font-black px-1.5 py-0.5 rounded border ${getStatusColor(stockPercent)}`}>
                  {s.currentBikesCount}/{s.capacity} UNIT
                </span>
                <span className="text-[9px] font-black text-slate-400">
                  {Math.round(stockPercent)}%
                </span>
              </div>
              <div className="w-full bg-slate-100 h-1 rounded-full overflow-hidden">
                <div
                  className={`h-full rounded-full transition-all duration-700 ${stockPercent < 20 ? "bg-red-500" : stockPercent < 50 ? "bg-amber-500" : "bg-emerald-500"
                    }`}
                  style={{ width: `${stockPercent}%` }}
                />
              </div>
            </div>
          );
        },
      },
      {
        header: "Actions",
        id: "actions",
        enableSorting: false,
        cell: ({ row }) => (
          <div className="flex justify-end gap-1.5">
            <button
              onClick={() => onEdit(row.original)}
              className="p-2 text-slate-400 hover:text-emerald-600 hover:bg-emerald-50 border border-transparent hover:border-emerald-100 rounded-lg transition-all"
            >
              <Edit3 size={14} />
            </button>
            <button
              onClick={() => onDelete(row.original._id)}
              className="p-2 text-slate-400 hover:text-red-600 hover:bg-red-50 border border-transparent hover:border-red-100 rounded-lg transition-all"
            >
              <Trash2 size={14} />
            </button>
          </div>
        ),
        meta: { className: "text-right" },
      },
    ],
    [onEdit, onDelete]
  );

  const table = useReactTable({
    data: items,
    columns,
    state: { sorting },
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    initialState: { pagination: { pageSize: 8 } },
  });

  return (
    <div className="bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden mt-6">
      <div className="overflow-x-auto">
        <table className="w-full text-left border-separate border-spacing-0">
          <thead>
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id} className="bg-slate-50/50 border-b border-slate-100">
                {headerGroup.headers.map((header) => (
                  <th
                    key={header.id}
                    className={`px-5 py-4 text-[10px] font-black uppercase tracking-wider text-slate-500 ${header.column.columnDef.meta?.className || ""
                      }`}
                  >
                    <div
                      className={`flex items-center gap-2 ${header.column.getCanSort() ? "cursor-pointer select-none" : ""
                        }`}
                      onClick={header.column.getToggleSortingHandler()}
                    >
                      {flexRender(header.column.columnDef.header, header.getContext())}
                      {header.column.getCanSort() && (
                        <div className="text-slate-300">
                          {{
                            asc: <ArrowUp size={10} className="text-emerald-500" />,
                            desc: <ArrowDown size={10} className="text-emerald-500" />,
                          }[header.column.getIsSorted()] ?? <ArrowUpDown size={10} />}
                        </div>
                      )}
                    </div>
                  </th>
                ))}
              </tr>
            ))}
          </thead>

          <tbody className="divide-y divide-slate-50">
            {loading ? (
              <tr>
                <td colSpan={columns.length} className="py-20 text-center">
                  <Loader2 className="animate-spin text-emerald-500 mx-auto" size={28} />
                </td>
              </tr>
            ) : table.getRowModel().rows.length === 0 ? (
              <tr>
                <td colSpan={columns.length} className="py-20 text-center opacity-40">
                  <Inbox size={40} className="mx-auto mb-2 text-slate-300" />
                  <p className="text-sm font-bold text-slate-900">No Stations Found</p>
                </td>
              </tr>
            ) : (
              table.getRowModel().rows.map((row) => (
                <tr key={row.id} className="group hover:bg-slate-50/50 transition-colors">
                  {row.getVisibleCells().map((cell) => (
                    <td
                      key={cell.id}
                      className={`px-5 py-3.5 ${cell.column.columnDef.meta?.className || ""}`}
                    >
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </td>
                  ))}
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="px-5 py-3 bg-slate-50/30 border-t border-slate-100 flex items-center justify-between">
        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
          Sorted by: <span className="text-slate-900">{sorting[0]?.id || "Default"}</span>
        </p>
        <div className="flex items-center gap-1">
          <button
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
            className="p-1.5 border border-slate-200 rounded-lg disabled:opacity-30 bg-white hover:border-emerald-500 transition-all"
          >
            <ChevronLeft size={14} />
          </button>
          <div className="flex gap-1 mx-2">
            {[...Array(table.getPageCount())].map((_, i) => (
              <button
                key={i}
                onClick={() => table.setPageIndex(i)}
                className={`w-7 h-7 text-[10px] font-black rounded-lg transition-all ${table.getState().pagination.pageIndex === i
                    ? "bg-slate-900 text-white"
                    : "text-slate-500 hover:bg-slate-100"
                  }`}
              >
                {i + 1}
              </button>
            ))}
          </div>
          <button
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
            className="p-1.5 border border-slate-200 rounded-lg disabled:opacity-30 bg-white hover:border-emerald-500 transition-all"
          >
            <ChevronRight size={14} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default StationTable;
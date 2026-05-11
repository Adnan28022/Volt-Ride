import React, { useState, useMemo } from "react";
import {
  ExternalLink,
  Copy,
  CheckCircle2,
  Clock,
  ArrowUpDown,
  ArrowUp,
  ArrowDown,
  ChevronLeft,
  ChevronRight,
  Hash,
  CreditCard,
} from "lucide-react";
import {
  useReactTable,
  getCoreRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  getFilteredRowModel,
  flexRender,
} from "@tanstack/react-table";
import moment from "moment";
import toast from "react-hot-toast";

const TransactionTable = ({ rides = [] }) => {
  const [sorting, setSorting] = useState([]);

  // Copy TX ID handler
  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
    toast.success("TX ID Copied!", {
      style: { fontSize: "10px", fontWeight: "bold", borderRadius: "10px" },
    });
  };

  // 1. Column Definitions
  const columns = useMemo(
    () => [
      {
        header: () => <Hash size={12} className="mx-auto" />,
        accessorKey: "index",
        enableSorting: false,
        cell: (info) => (
          <span className="text-xs font-black text-slate-300">
            {String(info.row.index + 1).padStart(2, "0")}
          </span>
        ),
        meta: { className: "text-center w-16" },
      },
      {
        header: "TX ID",
        accessorKey: "_id",
        cell: ({ getValue }) => {
          const id = getValue();
          return (
            <div className="flex items-center gap-2 font-mono text-[10px] text-slate-400 group">
              <span className="bg-slate-50 px-2 py-1 rounded border border-slate-100 uppercase tracking-tighter font-bold">
                #{id.slice(-8).toUpperCase()}
              </span>
              <Copy
                size={12}
                className="cursor-pointer hover:text-blue-500 opacity-0 group-hover:opacity-100 transition-opacity"
                onClick={() => copyToClipboard(id)}
              />
            </div>
          );
        },
      },
      {
        header: "Rider Info",
        accessorKey: "userId.name",
        cell: ({ row }) => (
          <div>
            <p className="text-sm font-black text-slate-800 tracking-tight leading-none mb-1">
              {row.original.userId?.name || "Guest User"}
            </p>
            <p className="text-[10px] text-slate-400 font-bold uppercase tracking-tight">
              {moment(row.original.startTime).format("MMM DD, hh:mm A")}
            </p>
          </div>
        ),
      },
      {
        header: "Amount",
        accessorKey: "totalCost",
        cell: ({ getValue }) => (
          <span className="font-black text-slate-900 text-sm">
            Rs. {getValue() || 0}
          </span>
        ),
      },
      {
        header: "Stripe Fee",
        id: "fee",
        cell: ({ row }) => {
          const fee = row.original.totalCost * 0.029 + 30;
          return (
            <span className="text-[11px] font-bold text-slate-400 italic">
              Rs. {Math.round(fee)}
            </span>
          );
        },
      },
      {
        header: "Status",
        accessorKey: "status",
        cell: ({ getValue }) => {
          const status = getValue();
          const isCompleted = status === "completed";
          const isActive = status === "active";
          return (
            <div
              className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-widest border ${
                isCompleted
                  ? "bg-emerald-50 text-emerald-600 border-emerald-100"
                  : isActive
                  ? "bg-blue-50 text-blue-600 border-blue-100"
                  : "bg-rose-50 text-rose-600 border-rose-100"
              }`}
            >
              {isCompleted ? <CheckCircle2 size={10} /> : <Clock size={10} />}
              {status}
            </div>
          );
        },
        meta: { className: "text-center" },
      },
      {
        id: "actions",
        header: "Invoice",
        enableSorting: false,
        cell: () => (
          <div className="flex justify-end">
            <button className="p-2 bg-slate-50 hover:bg-blue-50 border border-slate-100 hover:border-blue-100 rounded-xl text-slate-400 hover:text-blue-600 transition-all">
              <ExternalLink size={14} />
            </button>
          </div>
        ),
        meta: { className: "text-right" },
      },
    ],
    []
  );

  // 2. Table Instance
  const table = useReactTable({
    data: rides,
    columns,
    state: { sorting },
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    initialState: { pagination: { pageSize: 8 } },
  });

  return (
    <div className="bg-white border border-slate-200 rounded-[2rem] overflow-hidden shadow-sm mt-6">
      {/* Header Section */}
      <div className="p-8 border-b border-slate-100 flex justify-between items-center bg-slate-50/30">
        <div>
          <h3 className="font-black text-slate-800 text-base uppercase tracking-tight">
            Financial Ledger
          </h3>
          <p className="text-[10px] text-slate-400 font-bold uppercase mt-1 tracking-widest flex items-center gap-1.5">
            <CreditCard size={10} className="text-emerald-500" /> Real-time Stripe Invoicing
          </p>
        </div>
        <button className="text-[11px] font-black uppercase tracking-widest text-blue-600 hover:text-blue-700 bg-blue-50 px-4 py-2 rounded-full border border-blue-100 transition-all">
          Stripe Dashboard
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left border-separate border-spacing-0">
          <thead>
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <th
                    key={header.id}
                    className={`px-8 py-5 text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 border-b border-slate-100 ${
                      header.column.columnDef.meta?.className || ""
                    }`}
                  >
                    <div
                      className={`flex items-center gap-2 ${
                        header.column.getCanSort() ? "cursor-pointer select-none" : ""
                      }`}
                      onClick={header.column.getToggleSortingHandler()}
                    >
                      {flexRender(header.column.columnDef.header, header.getContext())}
                      {header.column.getCanSort() && (
                        <div className="text-slate-200">
                          {{
                            asc: <ArrowUp size={12} className="text-blue-500" />,
                            desc: <ArrowDown size={12} className="text-blue-500" />,
                          }[header.column.getIsSorted()] ?? <ArrowUpDown size={12} />}
                        </div>
                      )}
                    </div>
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody className="divide-y divide-slate-50">
            {table.getRowModel().rows.length > 0 ? (
              table.getRowModel().rows.map((row) => (
                <tr key={row.id} className="group hover:bg-slate-50/30 transition-colors">
                  {row.getVisibleCells().map((cell) => (
                    <td
                      key={cell.id}
                      className={`px-8 py-5 ${cell.column.columnDef.meta?.className || ""}`}
                    >
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </td>
                  ))}
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={columns.length} className="px-8 py-20 text-center">
                  <div className="flex flex-col items-center opacity-30">
                    <CreditCard size={40} className="mb-2" />
                    <p className="text-[10px] font-black uppercase tracking-[0.2em]">No transactions logged</p>
                  </div>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Footer Pagination */}
      <div className="px-8 py-4 bg-slate-50/30 border-t border-slate-100 flex items-center justify-between">
        <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">
          Ledger View: <span className="text-slate-900">{rides.length} Entries</span>
        </p>

        <div className="flex items-center gap-1.5">
          <button
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
            className="p-1.5 border border-slate-200 rounded-lg disabled:opacity-30 bg-white hover:border-blue-500 transition-colors text-slate-600"
          >
            <ChevronLeft size={14} />
          </button>

          <div className="flex gap-1 mx-1">
            {[...Array(table.getPageCount())].map((_, i) => (
              <button
                key={i}
                onClick={() => table.setPageIndex(i)}
                className={`w-7 h-7 text-[10px] font-black rounded-lg transition-all ${
                  table.getState().pagination.pageIndex === i
                    ? "bg-slate-900 text-white shadow-lg shadow-slate-200"
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
            className="p-1.5 border border-slate-200 rounded-lg disabled:opacity-30 bg-white hover:border-blue-500 transition-colors text-slate-600"
          >
            <ChevronRight size={14} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default TransactionTable;
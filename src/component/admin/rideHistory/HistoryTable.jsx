import React, { useState, useMemo } from "react";
import {
  Eye,
  ArrowRight,
  Hash,
  ArrowUpDown,
  ArrowUp,
  ArrowDown,
  ChevronLeft,
  ChevronRight,
  Clock,
} from "lucide-react";
import {
  useReactTable,
  getCoreRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  getFilteredRowModel,
  flexRender,
} from "@tanstack/react-table";
import AllRideDetailsModal from "./AllRideDetailsModal";

const HistoryTable = ({ rides = [] }) => {
  const [selectedRide, setSelectedRide] = useState(null);
  const [sorting, setSorting] = useState([]);

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
        header: "Customer & Bike",
        accessorKey: "userId.name",
        cell: ({ row }) => {
          const ride = row.original;
          return (
            <div className="flex items-center gap-3">
              <div className="h-9 w-9 rounded-xl bg-slate-900 flex items-center justify-center text-white font-bold text-xs shadow-sm ring-2 ring-slate-50 uppercase">
                {ride.userId?.name?.charAt(0) || "U"}
              </div>
              <div>
                <p className="text-sm font-bold text-slate-900 leading-none mb-1 group-hover:text-emerald-600 transition-colors">
                  {ride.userId?.name || "Guest User"}
                </p>
                <p className="text-[10px] text-slate-400 font-bold uppercase tracking-tight">
                  Bike: {ride.bikeId?.registration_number || "N/A"}
                </p>
              </div>
            </div>
          );
        },
      },
      {
        header: "Route Journey",
        accessorKey: "startStationId.name",
        cell: ({ row }) => {
          const ride = row.original;
          return (
            <div className="flex items-center gap-2 text-[11px] font-bold text-slate-600">
              <span className="px-2 py-1 bg-slate-100 rounded text-slate-700">
                {ride.startStationId?.name || "Start"}
              </span>
              <ArrowRight size={12} className="text-emerald-500" />
              <span
                className={`px-2 py-1 rounded ${ride.endStationId?.name ? "bg-emerald-50 text-emerald-700" : "bg-orange-50 text-orange-600 animate-pulse"}`}
              >
                {ride.endStationId?.name || "In Progress..."}
              </span>
            </div>
          );
        },
      },
      {
        header: "Status",
        accessorKey: "status",
        cell: ({ getValue }) => {
          const status = getValue();
          const isCompleted = status?.toLowerCase() === "completed";
          return (
            <span
              className={`text-[9px] font-black px-2 py-1 rounded border uppercase tracking-widest ${
                isCompleted
                  ? "bg-emerald-50 text-emerald-600 border-emerald-100"
                  : "bg-orange-50 text-orange-600 border-orange-100"
              }`}
            >
              {status}
            </span>
          );
        },
        meta: { className: "text-center" },
      },
      {
        header: "Total Fare",
        accessorKey: "totalCost",
        cell: ({ getValue }) => (
          <span className="font-black text-slate-900 text-sm">
            Rs. {getValue() || 0}
          </span>
        ),
        meta: { className: "text-right" },
      },
      {
        id: "actions",
        header: "Details",
        enableSorting: false,
        cell: ({ row }) => (
          <div className="flex justify-center">
            <button
              onClick={() => setSelectedRide(row.original)}
              className="p-2 text-slate-400 hover:text-emerald-600 hover:bg-emerald-50 border border-transparent hover:border-emerald-100 rounded-lg transition-all"
            >
              <Eye size={16} />
            </button>
          </div>
        ),
        meta: { className: "text-center" },
      },
    ],
    [],
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
    <div className="relative">
      <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-sm mt-6">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-separate border-spacing-0">
            <thead>
              {table.getHeaderGroups().map((headerGroup) => (
                <tr key={headerGroup.id} className="bg-slate-50/50">
                  {headerGroup.headers.map((header) => (
                    <th
                      key={header.id}
                      className={`px-6 py-4 text-[10px] font-black uppercase tracking-wider text-slate-500 border-b border-slate-100 ${header.column.columnDef.meta?.className || ""}`}
                    >
                      <div
                        className={`flex items-center gap-2 ${header.column.getCanSort() ? "cursor-pointer select-none hover:text-slate-800" : ""}`}
                        onClick={header.column.getToggleSortingHandler()}
                      >
                        {flexRender(
                          header.column.columnDef.header,
                          header.getContext(),
                        )}
                        {header.column.getCanSort() && (
                          <div className="text-slate-300">
                            {{
                              asc: (
                                <ArrowUp
                                  size={12}
                                  className="text-emerald-500"
                                />
                              ),
                              desc: (
                                <ArrowDown
                                  size={12}
                                  className="text-emerald-500"
                                />
                              ),
                            }[header.column.getIsSorted()] ?? (
                              <ArrowUpDown size={12} />
                            )}
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
                  <tr
                    key={row.id}
                    className="group hover:bg-slate-50/30 transition-colors"
                  >
                    {row.getVisibleCells().map((cell) => (
                      <td
                        key={cell.id}
                        className={`px-6 py-4 ${cell.column.columnDef.meta?.className || ""}`}
                      >
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext(),
                        )}
                      </td>
                    ))}
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan={columns.length}
                    className="px-6 py-20 text-center"
                  >
                    <div className="flex flex-col items-center opacity-40">
                      <Clock size={40} className="text-slate-300 mb-2" />
                      <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">
                        No ride history found
                      </p>
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Footer Pagination: Matching Bike/Station Styles */}
        <div className="px-6 py-3.5 bg-slate-50/30 border-t border-slate-100 flex items-center justify-between">
          <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">
            Total Records:{" "}
            <span className="text-slate-900">{rides.length} Rides</span>
          </p>

          <div className="flex items-center gap-1.5">
            <button
              onClick={() => table.previousPage()}
              disabled={!table.getCanPreviousPage()}
              className="p-1.5 border border-slate-200 rounded-lg disabled:opacity-30 bg-white hover:border-emerald-50 transition-colors text-slate-600"
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
              className="p-1.5 border border-slate-200 rounded-lg disabled:opacity-30 bg-white hover:border-emerald-50 transition-colors text-slate-600"
            >
              <ChevronRight size={14} />
            </button>
          </div>
        </div>
      </div>

      {/* Modal Render */}
      {selectedRide && (
        <AllRideDetailsModal
          ride={selectedRide}
          onClose={() => setSelectedRide(null)}
        />
      )}
    </div>
  );
};

export default HistoryTable;

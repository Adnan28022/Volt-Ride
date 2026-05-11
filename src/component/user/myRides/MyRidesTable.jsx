import React, { useMemo, useState } from "react";
import {
  useReactTable,
  getCoreRowModel,
  flexRender,
  getSortedRowModel,
  getPaginationRowModel,
} from "@tanstack/react-table";
import {
  Eye,
  Download,
  FileDown,
  ArrowUpDown,
  ArrowUp,
  ArrowDown,
  ChevronLeft,
  ChevronRight,
  Hash,
  MapPin,
} from "lucide-react";
import moment from "moment";
import jsPDF from "jspdf";
import "jspdf-autotable";
import RideDetailsModal from "../RideDetailsModal";

const MyRidesTable = ({ rides = [] }) => {
  const [selectedRide, setSelectedRide] = useState(null);
  const [sorting, setSorting] = useState([]);

  const downloadPDF = (data, filename = "Ride_History.pdf") => {
    const doc = new jsPDF();
    doc.setFontSize(18);
    doc.text("VoltRide - Journey Report", 14, 20);
    doc.setFontSize(10);
    doc.setTextColor(100);
    doc.text(`Generated on: ${moment().format("LLL")}`, 14, 28);

    const tableData = data.map((ride) => [
      ride._id.slice(-6).toUpperCase(),
      ride.userId?.name || "N/A",
      ride.bikeId?.bikeCode || "N/A",
      `${ride.startStationId?.name || "Start"} to ${ride.endStationId?.name || "Ongoing"}`,
      `Rs. ${ride.totalCost || 0}`,
      ride.status.toUpperCase(),
    ]);

    doc.autoTable({
      head: [["ID", "Rider", "Bike Code", "Route", "Fare", "Status"]],
      body: tableData,
      startY: 35,
      theme: "striped",
      headStyles: { fillColor: [15, 23, 42] },
    });
    doc.save(filename);
  };

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
        header: "Ride Identity",
        accessorKey: "_id",
        cell: ({ row }) => (
          <div className="flex flex-col">
            <span className="text-xs font-bold text-slate-900 leading-none mb-1 group-hover:text-emerald-600 transition-colors">
              #{row.original._id.slice(-6).toUpperCase()}
            </span>
            <span className="text-[10px] text-slate-400 font-bold uppercase tracking-tight">
              {moment(row.original.startTime).format("MMM DD, YYYY")}
            </span>
          </div>
        ),
      },
      {
        header: "Rider & Vehicle",
        accessorKey: "userId.name",
        cell: ({ row }) => (
          <div>
            <p className="text-sm font-black text-slate-800 leading-none mb-1">
              {row.original.userId?.name || "Unknown"}
            </p>
            <p className="text-[10px] text-slate-400 font-bold uppercase flex items-center gap-1">
              Bike: <span className="text-slate-600">{row.original.bikeId?.bikeCode || "N/A"}</span>
            </p>
          </div>
        ),
      },
      {
        header: "Total Fare",
        accessorKey: "totalCost",
        cell: ({ getValue }) => (
          <span className="text-sm font-black text-slate-900 uppercase">
            Rs. {getValue() || 0}
          </span>
        ),
      },
      {
        header: "Status",
        accessorKey: "status",
        cell: ({ getValue }) => {
          const status = getValue();
          // ✅ Teeno status handle kiye
          const statusStyles = {
            completed: "bg-emerald-50 text-emerald-700 border-emerald-100",
            cancelled: "bg-red-50 text-red-700 border-red-100",
            active: "bg-orange-50 text-orange-700 border-orange-100",
          };
          return (
            <span className={`text-[9px] font-black px-2 py-1 rounded border uppercase tracking-widest ${statusStyles[status] || "bg-slate-50 text-slate-700 border-slate-100"
              }`}>
              {status}
            </span>
          );
        },
        meta: { className: "text-center" },
      },
      {
        header: "Actions",
        id: "actions",
        enableSorting: false,
        cell: ({ row }) => (
          <div className="flex justify-end gap-1.5">
            <button
              onClick={() => setSelectedRide(row.original)}
              className="p-2 bg-slate-50 hover:bg-emerald-50 border border-slate-100 hover:border-emerald-100 rounded-xl text-slate-400 hover:text-emerald-600 transition-all"
              title="View Details"
            >
              <Eye size={15} />
            </button>
            <button
              onClick={() => downloadPDF([row.original], `Ride_${row.original._id.slice(-6)}.pdf`)}
              className="p-2 bg-slate-50 hover:bg-slate-900 border border-slate-100 hover:border-slate-900 rounded-xl text-slate-400 hover:text-white transition-all"
              title="Download PDF"
            >
              <Download size={15} />
            </button>
          </div>
        ),
        meta: { className: "text-right" },
      },
    ],
    []
  );

  const table = useReactTable({
    data: rides,
    columns,
    state: { sorting },
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    initialState: { pagination: { pageSize: 7 } },
  });

  return (
    <div className="bg-white border border-slate-200 rounded-[2rem] overflow-hidden shadow-sm mt-6">
      {/* Header */}
      <div className="p-6 border-b border-slate-100 flex justify-between items-center bg-slate-50/30">
        <div>
          <h3 className="font-black text-slate-800 text-sm uppercase tracking-tight">Trip Archive</h3>
          <p className="text-[10px] text-slate-400 font-bold uppercase mt-1 tracking-widest flex items-center gap-1.5">
            <MapPin size={10} className="text-emerald-500" /> Historical Journey Data
          </p>
        </div>
        <button
          onClick={() => downloadPDF(rides, "Full_Ride_History.pdf")}
          className="flex items-center gap-2 px-4 py-2.5 bg-slate-900 text-white rounded-2xl text-[10px] font-black uppercase tracking-widest hover:bg-slate-800 shadow-lg shadow-slate-200 transition-all active:scale-95"
        >
          <FileDown size={14} /> Full Report
        </button>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-left border-separate border-spacing-0">
          <thead>
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <th
                    key={header.id}
                    className={`px-6 py-4 text-[10px] font-black uppercase tracking-wider text-slate-500 border-b border-slate-100 ${header.column.columnDef.meta?.className || ""
                      }`}
                  >
                    <div
                      className={`flex items-center gap-2 ${header.column.getCanSort() ? "cursor-pointer select-none" : ""}`}
                      onClick={header.column.getToggleSortingHandler()}
                    >
                      {flexRender(header.column.columnDef.header, header.getContext())}
                      {header.column.getCanSort() && (
                        <div className="text-slate-300">
                          {{
                            asc: <ArrowUp size={12} className="text-emerald-500" />,
                            desc: <ArrowDown size={12} className="text-emerald-500" />,
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
                      className={`px-6 py-4 ${cell.column.columnDef.meta?.className || ""}`}
                    >
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </td>
                  ))}
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={columns.length} className="px-6 py-20 text-center">
                  <div className="flex flex-col items-center opacity-30">
                    <MapPin size={40} className="mb-2" />
                    <p className="text-[10px] font-black uppercase tracking-widest">No rides discovered</p>
                  </div>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="px-6 py-4 bg-slate-50/30 border-t border-slate-100 flex items-center justify-between">
        <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">
          Entries: <span className="text-slate-900">{rides.length} Journeys</span>
        </p>
        <div className="flex items-center gap-1.5">
          <button
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
            className="p-1.5 border border-slate-200 rounded-lg disabled:opacity-30 bg-white hover:border-emerald-500 transition-colors text-slate-600"
          >
            <ChevronLeft size={14} />
          </button>
          <div className="flex gap-1 mx-1">
            {[...Array(table.getPageCount())].map((_, i) => (
              <button
                key={i}
                onClick={() => table.setPageIndex(i)}
                className={`w-7 h-7 text-[10px] font-black rounded-lg transition-all ${table.getState().pagination.pageIndex === i
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
            className="p-1.5 border border-slate-200 rounded-lg disabled:opacity-30 bg-white hover:border-emerald-500 transition-colors text-slate-600"
          >
            <ChevronRight size={14} />
          </button>
        </div>
      </div>

      {/* Modal */}
      {selectedRide && (
        <RideDetailsModal ride={selectedRide} onClose={() => setSelectedRide(null)} />
      )}
    </div>
  );
};

export default MyRidesTable;
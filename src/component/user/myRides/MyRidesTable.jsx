import React, { useMemo, useState } from "react";
import {
  useReactTable,
  getCoreRowModel,
  flexRender,
  getSortedRowModel,
  getPaginationRowModel,
} from "@tanstack/react-table";
import {
  Eye, Download, FileDown, ArrowUpDown, ArrowUp, ArrowDown,
  ChevronLeft, ChevronRight, Hash, MapPin,
} from "lucide-react";
import moment from "moment";
import jsPDF from "jspdf";
import "jspdf-autotable";
import RideDetailsModal from "../RideDetailsModal";

const MyRidesTable = ({ rides = [] }) => {
  const [selectedRide, setSelectedRide] = useState(null);
  const [sorting, setSorting] = useState([]);

  // ✅ Professional Receipt PDF
  const downloadPDF = (data, filename = "Ride_Receipt.pdf") => {
    const doc = new jsPDF();

    data.forEach((ride, index) => {
      if (index > 0) doc.addPage();

      // Header Background
      doc.setFillColor(15, 23, 42); // slate-900
      doc.rect(0, 0, 210, 40, "F");

      // Logo Text
      doc.setTextColor(255, 255, 255);
      doc.setFontSize(22);
      doc.setFont("helvetica", "bold");
      doc.text("VoltRide", 14, 18);

      doc.setFontSize(10);
      doc.setFont("helvetica", "normal");
      doc.setTextColor(16, 185, 129); // emerald
      doc.text("Electric Bike Rental Service", 14, 26);

      doc.setTextColor(148, 163, 184); // slate-400
      doc.text(`Receipt #${ride._id?.slice(-6).toUpperCase()}`, 14, 34);
      doc.text(`Generated: ${moment().format("MMM DD, YYYY hh:mm A")}`, 120, 34);

      // Divider
      doc.setDrawColor(16, 185, 129);
      doc.setLineWidth(0.5);
      doc.line(14, 44, 196, 44);

      // Ride Info Section
      doc.setTextColor(15, 23, 42);
      doc.setFontSize(13);
      doc.setFont("helvetica", "bold");
      doc.text("Ride Summary", 14, 54);

      doc.setFontSize(9);
      doc.setFont("helvetica", "normal");
      doc.setTextColor(100, 116, 139); // slate-500

      const infoRows = [
        ["Rider Name", ride.userId?.name || "N/A"],
        ["Email", ride.userId?.email || "N/A"],
        ["Bike Model", ride.bikeId?.model_name || "N/A"],
        ["Registration", ride.bikeId?.registration_number || ride.bikeId?.bikeCode || "N/A"],
        ["Start Station", ride.startStationId?.name || "N/A"],
        ["End Station", ride.endStationId?.name || "Ongoing"],
        ["Start Time", ride.startTime ? moment(ride.startTime).format("MMM DD, YYYY hh:mm A") : "N/A"],
        ["End Time", ride.endTime ? moment(ride.endTime).format("MMM DD, YYYY hh:mm A") : "Ongoing"],
        ["Duration", ride.startTime && ride.endTime
          ? `${Math.round((new Date(ride.endTime) - new Date(ride.startTime)) / 60000)} mins`
          : "N/A"],
        ["Status", ride.status?.toUpperCase() || "N/A"],
      ];

      let y = 62;
      infoRows.forEach(([label, value]) => {
        doc.setTextColor(100, 116, 139);
        doc.text(label, 14, y);
        doc.setTextColor(15, 23, 42);
        doc.setFont("helvetica", "bold");
        doc.text(String(value), 80, y);
        doc.setFont("helvetica", "normal");
        y += 8;
      });

      // Payment Section
      doc.setFillColor(241, 245, 249); // slate-100
      doc.roundedRect(14, y + 4, 182, 28, 3, 3, "F");

      doc.setFontSize(10);
      doc.setTextColor(100, 116, 139);
      doc.text("Total Fare", 20, y + 14);

      doc.setFontSize(18);
      doc.setFont("helvetica", "bold");
      doc.setTextColor(16, 185, 129); // emerald
      doc.text(`Rs. ${ride.totalCost || 0}`, 20, y + 26);

      doc.setFontSize(9);
      doc.setFont("helvetica", "normal");
      doc.setTextColor(100, 116, 139);
      doc.text("Payment deducted from VoltWallet", 100, y + 20);

      // Footer
      doc.setFillColor(15, 23, 42);
      doc.rect(0, 272, 210, 25, "F");
      doc.setFontSize(8);
      doc.setTextColor(148, 163, 184);
      doc.text("Thank you for riding with VoltRide!", 14, 282);
      doc.text("support@voltride.com | voltride.com", 14, 288);
      doc.setTextColor(16, 185, 129);
      doc.text("Go Green. Ride Electric. 🌿", 140, 285);
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
        cell: ({ row }) => {
          const bike = row.original.bikeId;
          return (
            <div>
              <p className="text-sm font-black text-slate-800 leading-none mb-1">
                {row.original.userId?.name || "Unknown"}
              </p>
              {/* ✅ Multiple fields check */}
              <p className="text-[10px] text-slate-400 font-bold uppercase flex items-center gap-1">
                Bike:{" "}
                <span className="text-slate-600">
                  {bike?.registration_number || bike?.bikeCode || bike?.model_name || "N/A"}
                </span>
              </p>
            </div>
          );
        },
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
          const statusStyles = {
            Completed: "bg-emerald-50 text-emerald-700 border-emerald-100",
            completed: "bg-emerald-50 text-emerald-700 border-emerald-100",
            Cancelled: "bg-red-50 text-red-700 border-red-100",
            cancelled: "bg-red-50 text-red-700 border-red-100",
            Ongoing: "bg-orange-50 text-orange-700 border-orange-100",
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
            {/* ✅ Receipt download */}
            <button
              onClick={() => downloadPDF([row.original], `Receipt_${row.original._id.slice(-6)}.pdf`)}
              className="p-2 bg-slate-50 hover:bg-slate-900 border border-slate-100 hover:border-slate-900 rounded-xl text-slate-400 hover:text-white transition-all"
              title="Download Receipt"
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
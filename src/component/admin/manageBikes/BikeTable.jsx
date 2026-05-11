import React, { useEffect, useState, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchBikes, deleteBike } from "../../../redux/reducer/bike/bikeSlice";
import { 
  Battery, MapPin, Edit2, Trash2, Eye, X, Zap, 
  ShieldCheck, ArrowUpDown, ArrowUp, ArrowDown, 
  ChevronLeft, ChevronRight, Hash 
} from "lucide-react";
import {
  useReactTable,
  getCoreRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  getFilteredRowModel,
  flexRender,
} from "@tanstack/react-table";

// Leaflet Imports
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

// Marker Fix
import markerIcon from "leaflet/dist/images/marker-icon.png";
import markerShadow from "leaflet/dist/images/marker-shadow.png";
import { FILE_URL } from "../../../utils/ApiUrl";

let DefaultIcon = L.icon({
  iconUrl: markerIcon,
  shadowUrl: markerShadow,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
});
L.Marker.prototype.options.icon = DefaultIcon;

const RecenterMap = ({ lat, lng }) => {
  const map = useMap();
  useEffect(() => {
    if (lat && lng) {
      map.setView([lat, lng]);
    }
  }, [lat, lng, map]);
  return null;
};

const BikeTable = ({ onEdit, searchTerm = "" }) => {
  const dispatch = useDispatch();
  // Safe extraction from Redux
  const { bikes, loading } = useSelector((state) => state.bikes) || { bikes: [], loading: false };
  const [selectedBike, setSelectedBike] = useState(null);
  const [sorting, setSorting] = useState([]);

  useEffect(() => {
    dispatch(fetchBikes());
  }, [dispatch]);

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this bike?")) {
      dispatch(deleteBike(id));
    }
  };

  // Base URL for images - Adjust this to your actual backend domain
  const BASE_URL = FILE_URL;

  const columns = useMemo(() => [
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
      header: "Vehicle Info",
      accessorKey: "registration_number",
      cell: ({ row }) => {
        const bike = row.original;
        // SAFE FIX: Use optional chaining and fallback for slice
        const shortId = bike?._id ? bike._id.slice(-6) : "N/A";
        
        return (
          <div className="flex items-center gap-3">
            <img
              src={bike?.image ? `${BASE_URL}/${bike.image}` : "https://via.placeholder.com/40"}
              className="w-8 h-8 rounded-lg object-cover bg-slate-100 border shadow-sm"
              alt="bike"
              onError={(e) => { e.target.src = "https://via.placeholder.com/40"; }}
            />
            <div>
              <p className="text-sm font-bold text-slate-900 leading-none mb-1 group-hover:text-emerald-600 transition-colors uppercase">
                {bike?.registration_number || "NO-REG"}
              </p>
              <p className="text-[10px] text-slate-400 font-bold tracking-tighter uppercase">
                Ref: {shortId}
              </p>
            </div>
          </div>
        );
      }
    },
    {
      header: "Battery",
      accessorKey: "battery_level",
      cell: ({ getValue }) => {
        const val = getValue() || 0;
        return (
          <div className="max-w-[120px] space-y-1.5">
             <div className="flex justify-between items-center">
                <span className={`text-[9px] font-black px-1.5 py-0.5 rounded border ${val < 20 ? "bg-red-50 text-red-600 border-red-100" : "bg-emerald-50 text-emerald-600 border-emerald-100"}`}>
                  {val}% CHARGE
                </span>
             </div>
             <div className="w-full bg-slate-100 h-1 rounded-full overflow-hidden">
                <div
                  className={`h-full transition-all duration-700 ${val < 20 ? "bg-red-500" : "bg-emerald-500"}`}
                  style={{ width: `${val}%` }}
                />
             </div>
          </div>
        );
      }
    },
    {
      header: "Status",
      accessorKey: "status",
      cell: ({ getValue }) => {
        const status = getValue() || "Unknown";
        return (
          <span className={`text-[9px] font-black px-2 py-1 rounded border uppercase ${
            status === "Available" ? "bg-emerald-50 text-emerald-600 border-emerald-100" : "bg-red-50 text-red-600 border-red-100"
          }`}>
            {status}
          </span>
        );
      }
    },
    {
      header: "Actions",
      id: "actions",
      enableSorting: false,
      cell: ({ row }) => (
        <div className="flex justify-end gap-1.5">
          <button onClick={() => setSelectedBike(row.original)} className="p-2 text-slate-400 hover:text-slate-900 hover:bg-slate-100 border border-transparent hover:border-slate-200 rounded-lg transition-all">
            <Eye size={14} />
          </button>
          <button onClick={() => onEdit(row.original)} className="p-2 text-slate-400 hover:text-emerald-600 hover:bg-emerald-50 border border-transparent hover:border-emerald-100 rounded-lg transition-all">
            <Edit2 size={14} />
          </button>
          <button onClick={() => handleDelete(row.original?._id)} className="p-2 text-slate-400 hover:text-red-600 hover:bg-red-50 border border-transparent hover:border-red-100 rounded-lg transition-all">
            <Trash2 size={14} />
          </button>
        </div>
      ),
      meta: { className: "text-right" }
    }
  ], [onEdit]);

  const table = useReactTable({
    data: Array.isArray(bikes) ? bikes : [],
    columns,
    state: { sorting, globalFilter: searchTerm },
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    initialState: { pagination: { pageSize: 8 } }
  });

  if (loading) return <div className="p-10 text-center text-slate-500 font-black animate-pulse uppercase tracking-widest text-xs">Syncing Fleet Engine...</div>;

  return (
    <div className="relative">
      <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-sm mt-6">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-separate border-spacing-0">
            <thead>
              {table.getHeaderGroups().map(headerGroup => (
                <tr key={headerGroup.id} className="bg-slate-50/50 border-b border-slate-100">
                  {headerGroup.headers.map(header => (
                    <th key={header.id} className={`px-5 py-4 text-[10px] font-black uppercase tracking-wider text-slate-500 ${header.column.columnDef.meta?.className || ""}`}>
                      <div className={`flex items-center gap-2 ${header.column.getCanSort() ? "cursor-pointer select-none" : ""}`} onClick={header.column.getToggleSortingHandler()}>
                        {flexRender(header.column.columnDef.header, header.getContext())}
                        {header.column.getCanSort() && (
                          <div className="text-slate-300">
                            {{ asc: <ArrowUp size={10} className="text-emerald-500" />, desc: <ArrowDown size={10} className="text-emerald-500" /> }[header.column.getIsSorted()] ?? <ArrowUpDown size={10} />}
                          </div>
                        )}
                      </div>
                    </th>
                  ))}
                </tr>
              ))}
            </thead>
            <tbody className="divide-y divide-slate-50">
              {table.getRowModel().rows.map(row => (
                <tr key={row.id} className="group hover:bg-slate-50/50 transition-colors">
                  {row.getVisibleCells().map(cell => (
                    <td key={cell.id} className={`px-5 py-3.5 ${cell.column.columnDef.meta?.className || ""}`}>
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Footer */}
        <div className="px-5 py-3 bg-slate-50/30 border-t border-slate-100 flex items-center justify-between">
          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
            Total Fleet: <span className="text-slate-900">{Array.isArray(bikes) ? bikes.length : 0}</span>
          </p>
          <div className="flex items-center gap-1">
            <button
              onClick={() => table.previousPage()}
              disabled={!table.getCanPreviousPage()}
              className="p-1.5 border border-slate-200 rounded-lg disabled:opacity-30 bg-white hover:border-emerald-500 transition-colors"
            >
              <ChevronLeft size={14} />
            </button>
            <div className="flex gap-1 mx-2">
              {[...Array(table.getPageCount())].map((_, i) => (
                <button
                  key={i}
                  onClick={() => table.setPageIndex(i)}
                  className={`w-7 h-7 text-[10px] font-black rounded-lg transition-all ${
                    table.getState().pagination.pageIndex === i ? "bg-slate-900 text-white shadow-md" : "text-slate-500 hover:bg-slate-100"
                  }`}
                >
                  {i + 1}
                </button>
              ))}
            </div>
            <button
              onClick={() => table.nextPage()}
              disabled={!table.getCanNextPage()}
              className="p-1.5 border border-slate-200 rounded-lg disabled:opacity-30 bg-white hover:border-emerald-500 transition-colors"
            >
              <ChevronRight size={14} />
            </button>
          </div>
        </div>
      </div>

      {/* Detail Modal */}
      {selectedBike && (
         <div className="fixed inset-0 z-[110] flex items-center justify-center p-4">
            <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-md" onClick={() => setSelectedBike(null)} />
            <div className="relative bg-white w-full max-w-6xl rounded-2xl shadow-2xl overflow-hidden flex flex-col md:flex-row">
               <div className="w-full md:w-1/2 p-8 border-r border-slate-100">
                  <div className="flex justify-between mb-6">
                    <div className="p-3 bg-emerald-500 rounded-2xl text-white"><Zap size={20}/></div>
                    <button onClick={() => setSelectedBike(null)} className="md:hidden"><X/></button>
                  </div>
                  <img 
                    src={selectedBike.image ? `${BASE_URL}/${selectedBike.image}` : "https://via.placeholder.com/400"} 
                    className="w-full h-80 object-cover rounded-3xl mb-6 shadow-md" 
                    alt="bike" 
                    onError={(e) => { e.target.src = "https://via.placeholder.com/400"; }}
                  />
                  <h2 className="text-3xl font-black text-slate-900 uppercase tracking-tighter">{selectedBike.registration_number}</h2>
                  <p className="text-emerald-500 font-black text-xs tracking-widest mb-6">{selectedBike.model_name}</p>
                  <div className="grid grid-cols-2 gap-3">
                    <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100">
                      <p className="text-[9px] font-black text-slate-400 uppercase">Battery</p>
                      <p className="text-xl font-black text-slate-800">{selectedBike.battery_level}%</p>
                    </div>
                    <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100">
                      <p className="text-[9px] font-black text-slate-400 uppercase">Rate</p>
                      <p className="text-xl font-black text-slate-800">Rs.{selectedBike.price_per_hour}</p>
                    </div>
                  </div>
               </div>
               <div className="w-full md:w-1/2 bg-slate-50 flex flex-col">
                  <div className="p-6 flex justify-between items-center bg-white border-b border-slate-100">
                    <h3 className="font-black text-xs uppercase tracking-widest flex items-center gap-2"><MapPin className="text-emerald-500" size={14}/> Live Tracker</h3>
                    <button onClick={() => setSelectedBike(null)} className="hidden md:block p-2 text-slate-400 hover:text-red-500"><X size={20}/></button>
                  </div>
                  <div className="flex-1 min-h-[300px]">
                    <MapContainer 
                      center={[selectedBike.liveLocation?.lat || 33.6844, selectedBike.liveLocation?.lng || 73.0479]} 
                      zoom={15} 
                      style={{ height: "100%", width: "100%" }}
                    >
                      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
                      <RecenterMap lat={selectedBike.liveLocation?.lat} lng={selectedBike.liveLocation?.lng} />
                      <Marker position={[selectedBike.liveLocation?.lat || 33.6844, selectedBike.liveLocation?.lng || 73.0479]} />
                    </MapContainer>
                  </div>
                  <div className="p-6 bg-slate-900 text-white flex items-center justify-between">
                    <div>
                      <p className="text-[8px] font-bold text-slate-400 uppercase">Coordinates</p>
                      <p className="text-[10px] font-mono font-bold text-emerald-400">
                        {selectedBike.liveLocation?.lat?.toFixed(5) || "0.000"}, {selectedBike.liveLocation?.lng?.toFixed(5) || "0.000"}
                      </p>
                    </div>
                    <ShieldCheck size={24} className="text-emerald-500" />
                  </div>
               </div>
            </div>
         </div>
      )}
    </div>
  );
};

export default BikeTable;
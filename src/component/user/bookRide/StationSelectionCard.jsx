import React from "react";
import { MapPin, ParkingCircle } from "lucide-react";

const StationSelectionCard = ({ station }) => {
  if (!station) {
    return (
      <div className="bg-white border border-slate-200 rounded-2xl p-8 shadow-sm flex flex-col items-center justify-center text-center space-y-4">
        <div className="p-4 bg-slate-50 rounded-full text-slate-300">
          <MapPin size={40} />
        </div>
        <p className="text-sm font-medium text-slate-500 italic">
          Select a station on the map to see details.
        </p>
      </div>
    );
  }

  const occupancyRate = Math.round(
    (station.currentBikesCount / station.capacity) * 100,
  );
  const availableSlots = station.capacity - station.currentBikesCount;

  return (
    <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm animate-in fade-in slide-in-from-right-4">
      <div className="flex justify-between items-start mb-6">
        <div className="p-3 bg-blue-50 rounded-2xl text-blue-600 border border-blue-100 shadow-sm">
          <ParkingCircle size={24} />
        </div>
        <div className="flex flex-col items-end gap-1">
          <span className={`text-[10px] font-black px-2 py-1 rounded-md uppercase border ${station.currentBikesCount > 0
              ? "bg-green-50 text-green-700 border-green-100"
              : "bg-red-50 text-red-700 border-red-100"
            }`}>
            {station.currentBikesCount} Bikes Available
          </span>
          <span className="text-[9px] font-bold text-slate-400 uppercase tracking-tight">
            {availableSlots} Empty Slots Left
          </span>
        </div>
      </div>

      <div className="space-y-4">
        <div>
          <h4 className="text-lg font-black text-slate-900 uppercase tracking-tight">
            {station.name}
          </h4>
          <p className="text-[11px] text-slate-500 flex items-center gap-1 mt-1 font-medium">
            <MapPin size={12} className="text-slate-400" />
            {/* ✅ Hard-coded city removed */}
            {station.address || station.location?.address || "Location N/A"}
          </p>
        </div>

        <div className="space-y-2">
          <div className="flex justify-between text-[10px] font-bold uppercase text-slate-400">
            <span>Station Load</span>
            <span>{occupancyRate}% Full</span>
          </div>
          <div className="w-full bg-slate-100 h-2.5 rounded-full overflow-hidden border border-slate-50">
            <div
              className={`h-full rounded-full transition-all duration-700 ${occupancyRate > 90 ? "bg-red-500" :
                  occupancyRate > 70 ? "bg-orange-500" : "bg-blue-500"
                }`}
              style={{ width: `${occupancyRate}%` }}
            ></div>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-2 border-y border-slate-100 py-4">
          <div className="text-center border-r border-slate-50">
            <p className="text-[8px] font-black text-slate-400 uppercase tracking-widest mb-1">Bikes</p>
            <p className="text-sm font-black text-slate-900">{station.currentBikesCount}</p>
          </div>
          <div className="text-center border-r border-slate-50">
            <p className="text-[8px] font-black text-slate-400 uppercase tracking-widest mb-1">Free Slots</p>
            <p className="text-sm font-black text-green-600">{availableSlots}</p>
          </div>
          <div className="text-center">
            <p className="text-[8px] font-black text-slate-400 uppercase tracking-widest mb-1">Total</p>
            <p className="text-sm font-black text-slate-900">{station.capacity}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StationSelectionCard;
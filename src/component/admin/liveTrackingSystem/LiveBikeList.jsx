import React, { useState } from "react";
import { Search, Battery, Wifi, Navigation } from "lucide-react";

const LiveBikeList = ({ bikes = [], onSelect }) => {
  const [searchTerm, setSearchTerm] = useState("");

  // Search logic: Bike registration number ya status se search
  const filteredBikes = bikes.filter((bike) =>
    bike.registration_number?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    bike.status?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="bg-white border border-slate-200 rounded-2xl flex flex-col shadow-sm">
      {/* Header & Search */}
      <div className="p-4 border-b border-slate-100 bg-slate-50/50 rounded-t-2xl ">
        <div className="flex justify-between items-center mb-3">
          <h3 className="text-sm font-black text-slate-800 uppercase tracking-tight">
            Live Fleet List
          </h3>
          <span className="bg-green-100 text-green-700 text-[10px] font-bold px-2 py-0.5 rounded-full">
            {bikes.length} Total
          </span>
        </div>
        <div className="relative">
          <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            placeholder="Search registration or status..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-9 pr-4 py-2 bg-white border border-slate-200 rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-green-500/20 focus:border-green-500 transition-all"
          />
        </div>
      </div>

      {/* List Container */}
      <div className="flex-1 overflow-y-auto  p-2 space-y-2 custom-scrollbar">
        {filteredBikes.length > 0 ? (
          filteredBikes.map((bike) => (
            <div
              key={bike._id}
              onClick={() => onSelect && onSelect(bike)}
              className="p-3 hover:bg-slate-50 rounded-xl cursor-pointer transition-all border border-slate-100 hover:border-green-200 group relative"
            >
              <div className="flex justify-between items-start mb-2">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-black text-slate-800 group-hover:text-green-600">
                      {bike.registration_number || "N/A"}
                    </span>
                    {/* Status Badge */}
                    <span className={`text-[9px] px-1.5 py-0.5 rounded font-bold uppercase ${
                      bike.status === 'Ongoing' || bike.status === 'Active' 
                      ? 'bg-green-100 text-green-600' 
                      : 'bg-slate-100 text-slate-500'
                    }`}>
                      {bike.status}
                    </span>
                  </div>
                  <p className="text-[9px] text-slate-400 mt-0.5">ID: {bike._id.slice(-6)}</p>
                </div>
                
                {/* Active Indicator */}
                {(bike.status === 'Ongoing' || bike.status === 'Active') && (
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                  </span>
                )}
              </div>

              <div className="flex justify-between items-center text-[10px] text-slate-500">
                <div className="flex items-center gap-3">
                  {/* Battery Logic: Default 80% if not in API */}
                  <span className={`flex items-center gap-1 font-bold ${
                    (bike.battery_level || 80) < 20 ? 'text-red-500' : 'text-slate-600'
                  }`}>
                    <Battery size={12} /> {bike.battery_level || 80}%
                  </span>
                  
                  <span className="flex items-center gap-1">
                    <Wifi size={12} className="text-slate-400" /> Strong
                  </span>
                </div>
                
                <div className="flex items-center gap-1 text-blue-500 font-medium">
                  <Navigation size={10} />
                  <span>Locate</span>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="py-10 text-center text-slate-400 text-xs">
            No bikes found matching "{searchTerm}"
          </div>
        )}
      </div>
    </div>
  );
};

export default LiveBikeList;
import React from "react";
import { Clock, Circle, MapPin } from "lucide-react";

const TrackingActivityLog = ({ activities = [], onRideClick }) => {
  const activeRides = [...activities]
    .filter((ride) => ride.status === "Ongoing" || ride.status === "ongoing")
    .sort((a, b) => new Date(b.startTime) - new Date(a.startTime));

  return (
    <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-sm h-full flex flex-col">
      <div className="px-4 py-3 border-b border-slate-50 bg-slate-50/50 flex justify-between items-center">
        <h4 className="text-[11px] font-black uppercase text-slate-500 tracking-widest text-nowrap">
          Live Ride Feed
        </h4>
        <span className="flex items-center gap-1 text-[10px] font-bold text-green-600 bg-green-50 px-2 py-0.5 rounded-full">
          <Circle size={6} fill="currentColor" className="animate-pulse" />
          {activeRides.length} Active
        </span>
      </div>

      <div className="divide-y divide-slate-50 overflow-y-auto flex-1 custom-scrollbar">
        {activeRides.map((ride) => (
          <div
            key={ride._id}
            onClick={() => onRideClick(ride)} // Click Event
            className="p-3 hover:bg-blue-50 cursor-pointer transition-colors group border-l-4 border-transparent hover:border-blue-500"
          >
            <div className="flex items-start gap-3">
              <div className="mt-1.5 shrink-0">
                <div className="w-2 h-2 rounded-full bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.6)]"></div>
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex justify-between items-start">
                  <p className="text-[11px] font-black text-slate-800 truncate">
                    {ride.userId?.name || "Guest Rider"}
                  </p>
                  <span className="text-[9px] font-bold text-slate-400 bg-slate-100 px-1.5 rounded uppercase">
                    {ride.bikeId?.registration_number || "BIKE"}
                  </span>
                </div>
                <div className="flex items-center gap-1 mt-1 text-slate-500">
                  <MapPin size={10} />
                  <p className="text-[10px] truncate">
                    Started: {ride.startStationId?.name || "Unknown"}
                  </p>
                </div>
                <div className="text-[9px] mt-2 text-blue-600 font-bold group-hover:translate-x-1 transition-all">
                  Track on Map →
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TrackingActivityLog;

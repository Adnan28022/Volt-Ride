import React from "react";
import { MapPin } from "lucide-react";

const zoneColors = [
  "bg-emerald-500",
  "bg-blue-500",
  "bg-indigo-500",
  "bg-amber-500",
  "bg-rose-500",
];

const PopularZones = ({ rides }) => {
  // API data se zones count karna
  const zoneCounts = {};
  rides.forEach((ride) => {
    const zoneName = ride.startStationId?.name || "Unknown Station";
    zoneCounts[zoneName] = (zoneCounts[zoneName] || 0) + 1;
  });

  const totalRides = rides.length || 1;

  // Object ko array mein badal kar sort karna (Sab se zyada rides pehle)
  const sortedZones = Object.entries(zoneCounts)
    .map(([name, count], idx) => ({
      name,
      count,
      percentage: Math.round((count / totalRides) * 100),
      color: zoneColors[idx % zoneColors.length],
    }))
    .sort((a, b) => b.count - a.count)
    .slice(0, 5); // Top 5 zones dikhane ke liye

  return (
    <div className="bg-white border border-slate-200 rounded-2xl p-5 h-full shadow-sm">
      <h3 className="text-sm font-black text-slate-800 mb-6 flex items-center gap-2 uppercase tracking-tight">
        <MapPin size={16} className="text-emerald-600" /> Top Pickup Zones
      </h3>
      <div className="space-y-6">
        {sortedZones.length > 0 ? (
          sortedZones.map((zone, idx) => (
            <div key={idx} className="space-y-2">
              <div className="flex justify-between items-center text-[11px] font-bold italic">
                <span className="text-slate-600 uppercase">{zone.name}</span>
                <span className="text-slate-900">{zone.percentage}%</span>
              </div>
              <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                <div
                  className={`h-full rounded-full transition-all duration-700 ${zone.color}`}
                  style={{ width: `${zone.percentage}%` }}
                ></div>
              </div>
            </div>
          ))
        ) : (
          <p className="text-xs text-slate-400 text-center py-10">
            No data available
          </p>
        )}
        ss
      </div>
    </div>
  );
};

export default PopularZones;

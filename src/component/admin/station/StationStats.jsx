import React from "react";
import { useSelector } from "react-redux";
import { Plus, MapPin, Bike, Activity } from "lucide-react";

const StationStats = ({ totalStations, onAddClick }) => {
  const { bikes } = useSelector((state) => state.bikes);
  const { items: stations } = useSelector((state) => state.stations);

  // --- Real Calculations ---
  const activeBikes = bikes?.filter((b) =>
    b.status?.toLowerCase() === "riding"
  ).length || 0;

  const totalBikes = bikes?.length || 1;
  const systemLoad = Math.round((activeBikes / totalBikes) * 100);

  const stats = [
    {
      label: "Total Hubs",
      val: totalStations || stations?.length || 0,
      desc: "Live stations",
      icon: <MapPin size={20} />,
      color: "from-emerald-500 to-teal-600",
    },
    {
      label: "Active Fleet",
      val: activeBikes,
      desc: "Bikes in motion",
      icon: <Bike size={20} />,
      color: "from-blue-500 to-indigo-600",
    },
    {
      label: "System Load",
      val: `${systemLoad}%`,
      desc: "Network health",
      icon: <Activity size={20} />,
      color: "from-orange-500 to-red-600",
    },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-slate-100">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <div className="h-6 w-1 bg-emerald-600 rounded-full" />
            <h1 className="text-2xl font-black text-slate-900 tracking-tight">Station Control</h1>
          </div>
          <p className="text-slate-500 text-xs font-medium ml-3">
            Real-time infrastructure management & analytics.
          </p>
        </div>

        <button
          onClick={onAddClick}
          className="group flex items-center gap-2 bg-slate-900 hover:bg-emerald-600 text-white px-5 py-2.5 rounded-xl font-bold transition-all duration-300 shadow-lg shadow-slate-200 active:scale-95"
        >
          <Plus size={18} className="group-hover:rotate-90 transition-transform" />
          <span className="text-sm">Add New Station</span>
        </button>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {stats.map((stat, i) => (
          <div
            key={i}
            className="group relative bg-white border border-slate-200 p-5 rounded-2xl flex items-center gap-4 transition-all duration-300 hover:border-emerald-200 hover:shadow-md overflow-hidden"
          >
            <div className={`flex-shrink-0 w-12 h-12 rounded-xl bg-gradient-to-br ${stat.color} flex items-center justify-center text-white shadow-sm transform group-hover:scale-110 transition-transform`}>
              {stat.icon}
            </div>
            <div className="relative z-10">
              <p className="text-slate-400 text-[10px] font-bold uppercase tracking-widest mb-0.5">
                {stat.label}
              </p>
              <div className="flex items-baseline gap-2">
                <p className="text-xl font-black text-slate-900 tracking-tight">{stat.val}</p>
                <span className="text-[9px] font-bold text-emerald-600 bg-emerald-50 px-1.5 py-0.5 rounded">
                  {stat.desc}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default StationStats;
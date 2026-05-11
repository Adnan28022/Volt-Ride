import { Radio, Navigation, AlertCircle, Zap } from "lucide-react";

const TrackingStats = ({ bikes = [], rides = [] }) => {
  const activeRidesCount = rides.filter(
    (ride) => ride.status === "Ongoing" || ride.status === "ongoing",
  ).length;

  const idleBikesCount = bikes.filter(
    (bike) =>
      bike.status === "Available" ||
      bike.status === "available" ||
      bike.status === "active",
  ).length;

  const lowBatteryCount = bikes.filter((bike) => {
    const level = parseInt(bike.battery_level || bike.batteryLevel || 0);
    return level > 0 && level < 20;
  }).length;

  const outsideZoneCount = bikes.filter(
    (bike) => bike.isOutsideZone === true,
  ).length;

  const stats = [
    {
      label: "Active Rides",
      value: activeRidesCount,
      icon: <Radio size={18} className="animate-pulse" />,
      color: "text-green-600",
      bg: "bg-green-50",
      border: "border-green-100",
    },
    {
      label: "Available Bikes",
      value: idleBikesCount,
      icon: <Navigation size={18} />,
      color: "text-blue-600",
      bg: "bg-blue-50",
      border: "border-blue-100",
    },
    {
      label: "Low Battery",
      value: lowBatteryCount,
      icon: <Zap size={18} />,
      color: "text-orange-600",
      bg: "bg-orange-50",
      border: "border-orange-100",
    },
    {
      label: "Security Alerts",
      value: outsideZoneCount,
      icon: <AlertCircle size={18} />,
      color: "text-red-600",
      bg: "bg-red-50",
      border: "border-red-100",
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      {stats.map((s, i) => (
        <div
          key={i}
          className={`bg-white border ${s.border} p-5 rounded-2xl flex items-center gap-4 shadow-sm hover:shadow-md transition-shadow`}
        >
          <div className={`p-3 rounded-xl ${s.bg} ${s.color}`}>{s.icon}</div>
          <div>
            <p className="text-[10px] uppercase font-black text-slate-400 tracking-widest mb-0.5">
              {s.label}
            </p>
            <div className="flex items-baseline gap-1">
              <p className={`text-2xl font-black ${s.color}`}>{s.value}</p>
              <span className="text-[10px] text-slate-300 font-bold uppercase">
                Units
              </span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default TrackingStats;

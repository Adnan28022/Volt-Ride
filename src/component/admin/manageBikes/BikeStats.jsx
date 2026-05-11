import { useSelector } from "react-redux";
import { Bike, BatteryWarning, Wrench, CheckCircle } from "lucide-react";

const BikeStats = () => {
  // Redux se data nikalte waqt default empty array [] lazmi dein
  const { bikes } = useSelector((state) => state.bikes) || { bikes: [] };

  // Safety check: Agar bikes array nahi hai toh crash na ho
  const safeBikes = Array.isArray(bikes) ? bikes : [];

  // Logic: Ab safeBikes par operations karein
  const totalFleet = safeBikes.length;

  const readyToRide = safeBikes.filter(
    (bike) => bike?.status === "Available",
  ).length;

  const inRepair = safeBikes.filter(
    (bike) => bike?.status === "Maintenance",
  ).length;

  const lowBattery = safeBikes.filter(
    (bike) => (bike?.battery_level || 0) < 20,
  ).length;

  const stats = [
    {
      label: "Total Fleet",
      value: totalFleet,
      icon: <Bike size={18} />,
      color: "text-slate-600",
      bg: "bg-slate-100",
    },
    {
      label: "Ready to Ride",
      value: readyToRide,
      icon: <CheckCircle size={18} />,
      color: "text-green-600",
      bg: "bg-green-100",
    },
    {
      label: "Low Battery",
      value: lowBattery,
      icon: <BatteryWarning size={18} />,
      color: "text-orange-600",
      bg: "bg-orange-100",
    },
    {
      label: "In Repair",
      value: inRepair,
      icon: <Wrench size={18} />,
      color: "text-red-600",
      bg: "bg-red-100",
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      {stats.map((s, i) => (
        <div
          key={i}
          className="bg-white border border-slate-200 p-4 rounded-xl flex items-center gap-4 shadow-sm hover:shadow-md transition-shadow"
        >
          <div className={`p-3 rounded-lg ${s.bg} ${s.color}`}>{s.icon}</div>
          <div>
            <p className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">
              {s.label}
            </p>
            <p className="text-xl font-bold text-slate-900">{s.value}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default BikeStats;

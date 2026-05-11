import { History, Route, Clock, CreditCard } from "lucide-react";

const HistoryStats = ({ rides }) => {
  const totalRides = rides.length;
  const totalRevenue = rides.reduce(
    (acc, ride) => acc + (Number(ride.fare) || 0),
    0,
  );
  const totalDistance = rides.reduce(
    (acc, ride) => acc + (Number(ride.distance) || 0),
    0,
  );

  const stats = [
    {
      label: "Total Rides",
      value: totalRides.toLocaleString(),
      icon: <History size={18} />,
      color: "text-blue-600",
      bg: "bg-blue-100",
    },
    {
      label: "Total Distance",
      value: `${totalDistance} km`,
      icon: <Route size={18} />,
      color: "text-green-600",
      bg: "bg-green-100",
    },
    {
      label: "Avg. Fare",
      value: `Rs. ${totalRides > 0 ? (totalRevenue / totalRides).toFixed(0) : 0}`,
      icon: <Clock size={18} />,
      color: "text-purple-600",
      bg: "bg-purple-100",
    },
    {
      label: "Total Revenue",
      value: `Rs. ${(totalRevenue / 1000000).toFixed(2)}M`,
      icon: <CreditCard size={18} />,
      color: "text-orange-600",
      bg: "bg-orange-100",
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      {stats.map((s, i) => (
        <div
          key={i}
          className="bg-white border border-slate-200 p-5 rounded-2xl flex items-center gap-4 hover:shadow-sm transition-shadow"
        >
          <div className={`p-3 rounded-xl ${s.bg} ${s.color}`}>{s.icon}</div>
          <div>
            <p className="text-[10px] uppercase font-bold text-slate-400 tracking-wider leading-none mb-1">
              {s.label}
            </p>
            <p className="text-xl font-bold text-slate-900 tracking-tight">
              {s.value}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default HistoryStats;

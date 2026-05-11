import React from 'react';
import { Bike, Route, Leaf, CreditCard } from "lucide-react"; // ✅ Clock -> Leaf

const UserRideMetrics = ({ rides = [] }) => {
    const totalRides = rides.length;
    const totalSpent = rides.reduce((sum, ride) => sum + (ride.totalCost || 0), 0);

    const totalDist = rides.reduce((sum, ride) => {
        if (ride.status === 'completed' && ride.startTime && ride.endTime) {
            const diff = (new Date(ride.endTime) - new Date(ride.startTime)) / (1000 * 60 * 60);
            return sum + (diff * 12);
        }
        return sum;
    }, 0);

    const stats = [
        { label: "Total Rides", value: totalRides, icon: <Bike size={18} />, color: "text-blue-600", bg: "bg-blue-100" },
        { label: "Est. Distance", value: `${totalDist.toFixed(1)} km`, icon: <Route size={18} />, color: "text-emerald-600", bg: "bg-emerald-100" },
        { label: "Total Spent", value: `Rs. ${totalSpent.toLocaleString()}`, icon: <CreditCard size={18} />, color: "text-orange-600", bg: "bg-orange-100" },
        { label: "CO2 Saved", value: `${(totalDist * 0.12).toFixed(1)} kg`, icon: <Leaf size={18} />, color: "text-purple-600", bg: "bg-purple-100" }, // ✅ fix
    ];

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {stats.map((s, i) => (
                <div key={i} className="bg-white border border-slate-200 p-4 rounded-2xl flex items-center gap-4 shadow-sm">
                    <div className={`p-3 rounded-xl ${s.bg} ${s.color}`}>{s.icon}</div>
                    <div>
                        <p className="text-[10px] uppercase font-black text-slate-400 tracking-wider">{s.label}</p>
                        <p className="text-xl font-black text-slate-900">{s.value}</p>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default UserRideMetrics;
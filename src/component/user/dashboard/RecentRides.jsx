import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchUserRides } from "../../../redux/reducer/Ride/RideSlice";
import { ExternalLink, Calendar, Bike, Loader2 } from "lucide-react";

const RecentRides = () => {
    const dispatch = useDispatch();
    const { user } = useSelector((state) => state.auth);
    const { userRides, loading } = useSelector((state) => state.rides);

    useEffect(() => {
        if (user?._id) {
            dispatch(fetchUserRides(user._id));
        }
    }, [user, dispatch]);

    // Latest 5 rides
    const recentRides = userRides?.slice(0, 5) || [];

    const formatDate = (dateStr) => {
        if (!dateStr) return "—";
        return new Date(dateStr).toLocaleDateString("en-PK", {
            day: "2-digit", month: "short", year: "numeric"
        });
    };

    return (
        <div className="overflow-x-auto no-scrollbar">
            {loading ? (
                <div className="flex items-center justify-center py-10 text-slate-400">
                    <Loader2 size={20} className="animate-spin mr-2" /> Loading rides...
                </div>
            ) : (
                <table className="w-full text-left border-collapse">
                    <thead className="bg-slate-50/50 text-slate-400 text-[10px] uppercase font-black tracking-[0.15em]">
                        <tr>
                            <th className="px-6 py-4">Trip Details</th>
                            <th className="px-6 py-4">Bike</th>
                            <th className="px-6 py-4">Distance</th>
                            <th className="px-6 py-4">Fare</th>
                            <th className="px-6 py-4 text-right">Details</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-50">
                        {recentRides.map((ride, i) => (
                            <tr key={ride._id || i} className="hover:bg-slate-50/50 transition-colors group">
                                <td className="px-6 py-4">
                                    <div className="flex items-center gap-3">
                                        <div className="p-2 bg-slate-100 rounded-lg text-slate-400 group-hover:text-green-600 transition-colors">
                                            <Calendar size={14} />
                                        </div>
                                        <div className="flex flex-col">
                                            <span className="text-sm font-bold text-slate-900 leading-none mb-1">
                                                {formatDate(ride.startTime || ride.createdAt)}
                                            </span>
                                            <span className="text-[10px] text-slate-400 font-bold uppercase tracking-tighter">
                                                {ride._id?.slice(-6).toUpperCase() || "—"}
                                            </span>
                                        </div>
                                    </div>
                                </td>
                                <td className="px-6 py-4">
                                    <div className="flex items-center gap-2 text-slate-600">
                                        <Bike size={14} className="opacity-50" />
                                        <span className="text-xs font-bold">
                                            {ride.bikeId?.bikeNumber || ride.bikeId || "—"}
                                        </span>
                                    </div>
                                </td>
                                <td className="px-6 py-4">
                                    <span className="text-xs font-black text-slate-700">
                                        {ride.distanceKm ? `${ride.distanceKm} km` : ride.distance ? `${ride.distance} km` : "—"}
                                    </span>
                                </td>
                                <td className="px-6 py-4">
                                    <div className="flex flex-col">
                                        <span className="text-sm font-black text-slate-900">
                                            Rs. {ride.fare || ride.totalCost || ride.cost || "0"}
                                        </span>
                                        <span className={`text-[8px] font-black uppercase tracking-widest ${ride.status === "completed" ? "text-green-500" :
                                                ride.status === "cancelled" ? "text-red-500" :
                                                    "text-yellow-500"
                                            }`}>
                                            {ride.status || "—"}
                                        </span>
                                    </div>
                                </td>
                                <td className="px-6 py-4 text-right">
                                    <button className="p-2 hover:bg-white rounded-xl text-slate-300 hover:text-green-600 border border-transparent hover:border-slate-100 transition-all shadow-sm">
                                        <ExternalLink size={16} />
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}

            {!loading && recentRides.length === 0 && (
                <div className="py-12 text-center">
                    <p className="text-xs font-bold text-slate-400">No recent rides found. Time to explore!</p>
                </div>
            )}
        </div>
    );
};

export default RecentRides;
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllRides } from "../../../redux/reducer/Ride/RideSlice";
import { Link } from "react-router-dom";
import moment from "moment";

const RecentRides = () => {
    const dispatch = useDispatch();
    const { allRides, loading } = useSelector((state) => state.rides);

    useEffect(() => {
        dispatch(fetchAllRides());
    }, [dispatch]);

    // Latest 5 rides
    const recentRides = allRides?.slice(0, 5) || [];

    const statusStyles = {
        active: "bg-green-100 text-green-700",
        completed: "bg-slate-100 text-slate-500",
        cancelled: "bg-red-100 text-red-600",
    };

    return (
        <div className="bg-white border border-slate-200 rounded-xl overflow-hidden">
            <div className="px-5 py-4 border-b border-slate-100 flex justify-between items-center">
                <h3 className="font-bold text-slate-800 text-sm">Recent Activity</h3>
                <Link to="/admin/rides" className="text-green-600 text-xs font-bold hover:text-green-700">
                    View All
                </Link>
            </div>

            {loading ? (
                <div className="py-10 text-center text-xs font-bold text-slate-400">Loading...</div>
            ) : (
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead className="bg-slate-50/50 text-slate-500 text-[11px] uppercase tracking-widest">
                            <tr>
                                <th className="px-5 py-3 font-semibold">ID</th>
                                <th className="px-5 py-3 font-semibold">User</th>
                                <th className="px-5 py-3 font-semibold">Status</th>
                                <th className="px-5 py-3 font-semibold text-right">Amount</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100">
                            {recentRides.length > 0 ? recentRides.map((ride, idx) => (
                                <tr key={idx} className="hover:bg-slate-50/50 transition-colors">
                                    <td className="px-5 py-3.5 text-sm font-medium text-slate-700">
                                        #{ride._id?.slice(-6).toUpperCase()}
                                    </td>
                                    <td className="px-5 py-3.5">
                                        <p className="text-sm text-slate-600 font-medium">
                                            {ride.userId?.name || "—"}
                                        </p>
                                        <p className="text-[10px] text-slate-400">
                                            {moment(ride.startTime || ride.createdAt).format("MMM DD, hh:mm A")}
                                        </p>
                                    </td>
                                    <td className="px-5 py-3.5">
                                        <span className={`text-[10px] font-bold px-2 py-0.5 rounded-md uppercase ${statusStyles[ride.status?.toLowerCase()] || "bg-slate-100 text-slate-500"
                                            }`}>
                                            {ride.status}
                                        </span>
                                    </td>
                                    <td className="px-5 py-3.5 text-sm font-bold text-slate-900 text-right">
                                        Rs. {ride.totalCost || 0}
                                    </td>
                                </tr>
                            )) : (
                                <tr>
                                    <td colSpan={4} className="px-5 py-10 text-center text-xs font-bold text-slate-400">
                                        No rides found
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
};

export default RecentRides;
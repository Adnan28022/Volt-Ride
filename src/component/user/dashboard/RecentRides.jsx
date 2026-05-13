import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchUserRides } from "../../../redux/reducer/Ride/RideSlice";
import moment from "moment";

const RecentRides = () => {
    const dispatch = useDispatch();

    const { user } = useSelector((state) => state.auth);

    const {
        userRides = [],
        loading,
    } = useSelector((state) => state.rides);

    useEffect(() => {
        if (user?._id) {
            dispatch(fetchUserRides(user._id));
        }
    }, [dispatch, user?._id]);

    // Logged in user ki latest 5 rides
    const recentRides = userRides
        ?.filter((ride) => ride.userId === user?._id || ride.userId?._id === user?._id)
        ?.slice(0, 5);

    const statusStyles = {
        ongoing: "bg-orange-100 text-orange-700",
        completed: "bg-slate-100 text-slate-500",
        Completed: "bg-slate-100 text-slate-500",
        cancelled: "bg-red-100 text-red-600",
        Ongoing: "bg-orange-100 text-orange-700",
    };

    return (
        <div className="bg-white border border-slate-200 overflow-hidden">

            {loading ? (
                <div className="py-10 text-center text-xs font-bold text-slate-400">
                    Loading...
                </div>
            ) : (
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead className="bg-slate-50/50 text-slate-500 text-[11px] uppercase tracking-widest">
                            <tr>
                                <th className="px-5 py-3 font-semibold">ID</th>
                                <th className="px-5 py-3 font-semibold">Bike</th>
                                <th className="px-5 py-3 font-semibold">Status</th>
                                <th className="px-5 py-3 font-semibold text-right">Amount</th>
                            </tr>
                        </thead>

                        <tbody className="divide-y divide-slate-100">
                            {recentRides?.length > 0 ? (
                                recentRides.map((ride, idx) => (
                                    <tr
                                        key={idx}
                                        className="hover:bg-slate-50/50 transition-colors"
                                    >
                                        <td className="px-5 py-3.5">
                                            <p className="text-sm font-medium text-slate-700">
                                                #{ride._id?.slice(-6).toUpperCase()}
                                            </p>

                                            <p className="text-[10px] text-slate-400">
                                                {moment(
                                                    ride.startTime || ride.createdAt
                                                ).format("MMM DD, hh:mm A")}
                                            </p>
                                        </td>

                                        <td className="px-5 py-3.5">
                                            <p className="text-sm text-slate-600 font-medium">
                                                {ride.bikeId?.registration_number ||
                                                    ride.bikeId?.model_name ||
                                                    "—"}
                                            </p>

                                            <p className="text-[10px] text-slate-400">
                                                {ride.startStationId?.name || "—"} →
                                                {ride.endStationId?.name || "Ongoing"}
                                            </p>
                                        </td>

                                        <td className="px-5 py-3.5">
                                            <span
                                                className={`text-[10px] font-bold px-2 py-0.5 rounded-md uppercase ${statusStyles[ride.status] ||
                                                    "bg-slate-100 text-slate-500"
                                                    }`}
                                            >
                                                {ride.status}
                                            </span>
                                        </td>

                                        <td className="px-5 py-3.5 text-sm font-bold text-slate-900 text-right">
                                            Rs. {ride.totalCost || 0}
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td
                                        colSpan={4}
                                        className="px-5 py-10 text-center text-xs font-bold text-slate-400"
                                    >
                                        No recent rides found.
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
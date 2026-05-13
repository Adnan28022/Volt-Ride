import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchUserRides } from "../../../redux/reducer/Ride/RideSlice";
import { Bike, Route, Clock, Leaf } from "lucide-react";

const RiderStats = () => {
    const dispatch = useDispatch();
    const { user } = useSelector((state) => state.auth);
    const { userRides, loading } = useSelector((state) => state.rides);

    useEffect(() => {
        if (user?._id) {
            dispatch(fetchUserRides(user._id));
        }
    }, [user, dispatch]);

    // --- Real Calculations ---
    const totalRides = userRides?.length || 0;

    const totalDistance = userRides?.reduce((acc, ride) => {
        return acc + (ride.distanceKm || 0);
    }, 0).toFixed(1);

    const totalHours = userRides?.reduce((acc, ride) => {
        return acc + (ride.durationMinutes || 0);
    }, 0);
    const hoursDisplay = totalHours >= 60
        ? `${Math.floor(totalHours / 60)}h ${totalHours % 60}m`
        : `${totalHours}m`;


    const stats = [
        { label: "Total Rides", value: loading ? "..." : totalRides, icon: <Bike size={20} />, color: "text-blue-600", bg: "bg-blue-50" },
        { label: "Distance (KM)", value: loading ? "..." : totalDistance, icon: <Route size={20} />, color: "text-green-600", bg: "bg-green-50" },
        { label: "Hours Riding", value: loading ? "..." : hoursDisplay, icon: <Clock size={20} />, color: "text-purple-600", bg: "bg-purple-50" },
    ];

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {stats.map((s, i) => (
                <div key={i} className="bg-white border border-slate-200 p-5 rounded-2xl flex flex-col gap-3 shadow-sm hover:border-green-200 transition-all cursor-default">
                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${s.bg} ${s.color}`}>
                        {s.icon}
                    </div>
                    <div>
                        <p className="text-[10px] uppercase font-black text-slate-400 tracking-widest leading-none mb-1">{s.label}</p>
                        <p className="text-2xl font-black text-slate-900 tracking-tight">{s.value}</p>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default RiderStats;
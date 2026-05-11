import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllRides } from "../../../redux/reducer/Ride/RideSlice";
import { fetchBikes } from "../../../redux/reducer/bike/bikeSlice";
import { fetchStations } from "../../../redux/reducer/station/stationSlice";
import { TrendingUp, Users, Bike, DollarSign, ArrowUpRight } from "lucide-react";

const StatsGrid = () => {
    const dispatch = useDispatch();
    const { allRides } = useSelector((state) => state.rides);
    const { bikes } = useSelector((state) => state.bikes);
    const { items: stations } = useSelector((state) => state.stations);

    useEffect(() => {
        dispatch(fetchAllRides());
        dispatch(fetchBikes());
        dispatch(fetchStations());
    }, [dispatch]);

    // --- Real Calculations ---
    const totalRevenue = allRides?.reduce((sum, ride) =>
        ride.status === "completed" ? sum + (ride.totalCost || 0) : sum, 0) || 0;

    // Unique active riders
    const activeRiderIds = new Set(
        allRides?.filter((r) => r.status === "active").map((r) => r.userId?._id || r.userId)
    );
    const activeRiders = activeRiderIds.size;

    const liveRides = allRides?.filter((r) => r.status === "active").length || 0;

    // Bike status "Available" (case insensitive)
    const availableBikes = bikes?.filter((b) =>
        b.status?.toLowerCase() === "available"
    ).length || 0;

    const stats = [
        {
            title: "Total Revenue",
            value: `Rs. ${totalRevenue.toLocaleString()}`,
            icon: <DollarSign size={20} />,
            trend: `${allRides?.length || 0} Rides`,
            color: "text-green-600",
            bg: "bg-green-50"
        },
        {
            title: "Active Riders",
            value: activeRiders.toLocaleString(),
            icon: <Users size={20} />,
            trend: `${allRides?.length || 0} Total`,
            color: "text-blue-600",
            bg: "bg-blue-50"
        },
        {
            title: "Live Rides",
            value: liveRides,
            icon: <TrendingUp size={20} />,
            trend: `${allRides?.filter(r => r.status === "completed").length || 0} Done`,
            color: "text-orange-600",
            bg: "bg-orange-50"
        },
        {
            title: "Bikes Available",
            value: availableBikes,
            icon: <Bike size={20} />,
            trend: `${bikes?.length || 0} Total`,
            color: "text-purple-600",
            bg: "bg-purple-50"
        },
    ];

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {stats.map((item, index) => (
                <div key={index} className="bg-white border border-slate-200 p-5 rounded-xl flex flex-col gap-3">
                    <div className="flex justify-between items-start">
                        <div className={`p-2.5 rounded-lg ${item.bg} ${item.color}`}>
                            {item.icon}
                        </div>
                        <span className="text-[11px] font-bold text-green-600 bg-green-50 px-2 py-0.5 rounded flex items-center gap-1">
                            <ArrowUpRight size={12} /> {item.trend}
                        </span>
                    </div>
                    <div>
                        <p className="text-slate-500 text-xs font-medium uppercase tracking-wider">{item.title}</p>
                        <p className="text-xl font-bold text-slate-900 mt-0.5">{item.value}</p>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default StatsGrid;
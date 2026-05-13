import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllRides } from "../../redux/reducer/Ride/RideSlice";
import { fetchBikes } from "../../redux/reducer/bike/bikeSlice";
import StatsGrid from '../../component/admin/adminStats/StatsGrid';
import RecentRides from '../../component/admin/adminStats/RecentRides';
import UsageChart from '../../component/admin/adminStats/UsageChart';
import FleetStatus from '../../component/admin/adminStats/FleetStatus';
import moment from "moment";

const Dashboard = () => {
  const dispatch = useDispatch();
  const { allRides } = useSelector((state) => state.rides);
  const { bikes } = useSelector((state) => state.bikes);

  useEffect(() => {
    dispatch(fetchAllRides());
    dispatch(fetchBikes());
  }, [dispatch]);

  // --- Today's rides ---
  const todayRides = allRides?.filter((ride) => {
    const rideDate = new Date(ride.startTime || ride.createdAt);
    return rideDate.toDateString() === new Date().toDateString();
  }).length || 0;

  // --- Yesterday's rides ---
  const yesterday = new Date();
  yesterday.setDate(yesterday.getDate() - 1);
  const yesterdayRides = allRides?.filter((ride) => {
    const rideDate = new Date(ride.startTime || ride.createdAt);
    return rideDate.toDateString() === yesterday.toDateString();
  }).length || 0;

  const percentChange = yesterdayRides > 0
    ? Math.round(((todayRides - yesterdayRides) / yesterdayRides) * 100)
    : todayRides > 0 ? 100 : 0;

  return (
    <div className="space-y-6 bg-slate-50/30 min-h-screen">

      {/* Top Stats */}
      <StatsGrid />

      {/* Middle Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <UsageChart />
        </div>
        <div>
          <FleetStatus />
        </div>
      </div>

      {/* Bottom Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <RecentRides />
        </div>

        {/* Today's Rides */}
        <div>
          <div className="bg-green-600 rounded-xl p-5 text-white flex flex-col justify-center items-center text-center gap-2 shadow-lg shadow-green-100">
            <p className="text-xs opacity-80">Today's Total Rides</p>
            <h2 className="text-3xl font-black italic tracking-tighter">{todayRides}</h2>
            <p className="text-[10px] font-bold bg-white/20 px-2 py-1 rounded-full uppercase">
              {percentChange > 0
                ? `+${percentChange}% increase from yesterday`
                : percentChange < 0
                  ? `${percentChange}% decrease from yesterday`
                  : "Same as yesterday"}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
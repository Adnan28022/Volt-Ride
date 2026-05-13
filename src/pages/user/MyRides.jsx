import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Banner from "../../component/admin/Banner";
import UserRideMetrics from "../../component/user/myRides/UserRideMetrics";
import MyRidesTable from "../../component/user/myRides/MyRidesTable";
import { MapPin } from "lucide-react";
import { fetchUserRides } from "../../redux/reducer/Ride/RideSlice";

const MyRides = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const { userRides } = useSelector((state) => state.rides);

  const userId = user?._id || user?.id;

  useEffect(() => {
    if (userId) {
      dispatch(fetchUserRides(userId));
    }
  }, [dispatch, userId]);

  const breadcrumbs = [
    { label: "My Rides", path: "/user/history", active: true },
  ];

  // Logic to get top destinations from real data
  const getTopDestinations = () => {
    const counts = {};
    userRides.forEach((ride) => {
      const name = ride.endStationId?.name || "Ongoing";
      if (name !== "Ongoing") counts[name] = (counts[name] || 0) + 1;
    });
    return Object.entries(counts)
      .map(([name, rides]) => ({ name, rides }))
      .sort((a, b) => b.rides - a.rides)
      .slice(0, 3);
  };

  const topDestinations = getTopDestinations();

  return (
    <div className="p-6 space-y-6 bg-slate-50/30 min-h-screen">
      <Banner
        title="My Rides"
        subtitle="Review your past journeys, track your environmental impact and download receipts."
        breadcrumbs={breadcrumbs}
      />

      <UserRideMetrics rides={userRides} />

      <div className="grid grid-cols-12 gap-6">
        <div className="col-span-12 lg:col-span-8">
          <MyRidesTable rides={userRides} />
        </div>

        <div className="col-span-12 lg:col-span-4 space-y-6">

          <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm">
            <h4 className="text-xs font-black text-slate-900 uppercase tracking-widest mb-4">
              Top Destinations
            </h4>
            <div className="space-y-4">
              {topDestinations.length > 0 ? (
                topDestinations.map((loc, i) => (
                  <div
                    key={i}
                    className="flex justify-between items-center group cursor-default"
                  >
                    <div className="flex items-center gap-2 text-slate-600 group-hover:text-emerald-600 transition-colors">
                      <MapPin size={14} />
                      <span className="text-xs font-medium">{loc.name}</span>
                    </div>
                    <span className="text-[10px] font-black text-slate-400">
                      {loc.rides} rides
                    </span>
                  </div>
                ))
              ) : (
                <p className="text-xs text-slate-400">No data yet</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyRides;

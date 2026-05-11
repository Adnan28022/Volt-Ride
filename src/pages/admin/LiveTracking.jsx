import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchBikes } from "../../redux/reducer/bike/bikeSlice";
import { fetchAllRides } from "../../redux/reducer/Ride/RideSlice";
import { fetchStations } from "../../redux/reducer/station/stationSlice";

import AdminPageHeader from "../../component/admin/Banner";
import TrackingStats from "../../component/admin/liveTrackingSystem/TrackingStats";
import TrackingMap from "../../component/admin/liveTrackingSystem/TrackingMap";
import LiveBikeList from "../../component/admin/liveTrackingSystem/LiveBikeList";
import TrackingActivityLog from "../../component/admin/liveTrackingSystem/TrackingActivityLog";

const LiveTracking = () => {
  const dispatch = useDispatch();
  const [selectedRide, setSelectedRide] = useState(null);

  const { bikes, loading: bikesLoading } = useSelector((state) => state.bikes);
  const { allRides, loading: ridesLoading } = useSelector(
    (state) => state.rides,
  );
  const { items: stations, loading: stationsLoading } = useSelector(
    (state) => state.stations,
  );

  useEffect(() => {
    dispatch(fetchBikes());
    dispatch(fetchAllRides());
    dispatch(fetchStations());
  }, [dispatch]);

  const breadcrumbs = [
    { label: "Live Tracking", path: "/admin/tracking", active: true },
  ];

  // Mobile par bike select hone par map par focus karne ke liye helper
  const handleSelectBike = (bike) => {
    // Agar bike ongoing ride mein hai to usko map par dikhao
    const ride = allRides.find(
      (r) => r.bikeId?._id === bike._id || r.bikeId === bike._id,
    );
    if (ride) {
      setSelectedRide(ride);
    } else {
      // Agar bike ride mein nahi hai, to direct bike coordinate pass karein
      setSelectedRide({ bikeId: bike });
    }
    // Mobile par map upar hai, to select karte hi map par scroll kar sakte hain
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="space-y-4 md:space-y-6 bg-slate-50/30 min-h-screen pb-10">
      <AdminPageHeader
        title="Live Fleet Tracking"
        subtitle="Real-time control center"
        breadcrumbs={breadcrumbs}
      />

      <div className="">
        <TrackingStats bikes={bikes} rides={allRides} />
      </div>

      {/* Main Container: Mobile par grid column 1, Desktop par 4 */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 md:gap-6 lg:h-[750px]">
        {/* Left Side: Map Section */}
        <div className="col-span-1 lg:col-span-3 flex flex-col h-[400px] md:h-[500px] lg:h-full">
          <div className="relative flex-1 rounded-2xl overflow-hidden border border-slate-200 shadow-md">
            <TrackingMap
              bikes={bikes}
              stations={stations}
              rides={allRides}
              selectedRide={selectedRide}
            />
          </div>
        </div>

        {/* Right Side: List & Activity */}
        <div className="col-span-1 flex flex-col gap-4 md:gap-6 h-auto lg:h-full overflow-hidden">
          {/* Live Bike List */}
          <div className="lg:flex-[1.5] lg:h-auto overflow-hidden">
            <LiveBikeList bikes={bikes} onSelect={handleSelectBike} />
          </div>

          {/* Activity Log */}
          <div className="h-[350px] lg:flex-1 lg:h-auto overflow-hidden">
            <TrackingActivityLog
              activities={allRides}
              onRideClick={(ride) => {
                setSelectedRide(ride);
                window.scrollTo({ top: 0, behavior: "smooth" });
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default LiveTracking;

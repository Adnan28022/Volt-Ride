import React, { useState } from "react";
import Banner from "../../component/admin/Banner";
import DiscoveryMap from "../../component/user/bookRide/DiscoveryMap";
import RideInstructions from "../../component/user/bookRide/RideInstructions";
import QuickUnlock from "../../component/user/bookRide/QuickUnlock";
import StationSelectionCard from "../../component/user/bookRide/StationSelectionCard";
import SafetyBanner from "../../component/user/bookRide/SafetyBanner";
import { useSelector } from "react-redux";
import ActiveBikeRide from "../../component/user/bookRide/ActiveBikeRide";

const BookRide = () => {
  const [selectedStation, setSelectedStation] = useState(null);

  // Redux se data nikalna
  const { isRiding, activeRide, loading: rideLoading } = useSelector((state) => state.rides);

  // ✅ SAFE ACCESS: Agar activeRide null hai to crash nahi karega
  // Hum optional chaining (?.) use kar rahe hain
  const activeBikeRideId = activeRide?.bikeId?._id || activeRide?.bikeId;

  console.log("activeBikeRide Main ID:", activeBikeRideId);

  const breadcrumbs = [
    { label: "Book a Ride", path: "/user/find-bikes", active: true },
  ];

  return (
    <div className="p-4 md:p-6 space-y-6 bg-slate-50/50 min-h-screen">
      {/* 1. Top Banner */}
      <Banner
        title="Find your VoltRide"
        subtitle="Locate a bike near you, scan the QR and start your journey instantly."
        breadcrumbs={breadcrumbs}
      />

      {/* 2. Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">

        {/* LEFT COLUMN: Map & Instructions */}
        <div className="lg:col-span-8 flex flex-col gap-6">
          <div className="bg-white rounded-[2.5rem] overflow-hidden shadow-sm border border-slate-200 h-[500px] md:h-[600px]">
            <DiscoveryMap
              onStationSelect={(s) => setSelectedStation(s)}
              externalSelectedId={selectedStation?._id}
            />
          </div>

          <div className="hidden md:block">
            <RideInstructions />
          </div>
        </div>

        {/* RIGHT COLUMN: Controls (Sticky) */}
        <div className="lg:col-span-4 flex flex-col gap-6 lg:sticky lg:top-6">

          {/* A. Quick Unlock (Hamesha dikhega) */}
          <QuickUnlock
            selectedStation={selectedStation}
            onStationChange={(s) => setSelectedStation(s)}
          />

          {/* B. Active Bike Ride (Aapki requirement ke mutabiq hamesha niche show hoga) */}
          <ActiveBikeRide activeBikeId={activeBikeRideId} />

          {/* C. Station Selection Card (Sirf tab dikhega jab station selected ho) */}
          {selectedStation && (
            <div className="transition-all duration-500 opacity-100 scale-100">
              <StationSelectionCard station={selectedStation} />
            </div>
          )}
        </div>

        {/* Instructions for mobile */}
        <div className="col-span-1 md:hidden">
          <RideInstructions />
        </div>
      </div>

      {/* 3. Bottom Full Width Section */}
      <div className="w-full pt-4">
        <SafetyBanner />
      </div>
    </div>
  );
};

export default BookRide;
import React, { useEffect, useRef } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

// Icons setup (same as before)
const stationIcon = new L.DivIcon({
  className: "custom-marker",
  html: `<div class="marker-pin" style="--bg-color: #3b82f6"><div class="marker-icon"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2.5"><path d="M19 18V5a2 2 0 0 0-2-2H7a2 2 0 0 0-2 2v13"/><path d="M3 18h18"/><path d="M12 7v4"/><path d="M9 11h6"/></svg></div></div>`,
  iconSize: [40, 40],
  iconAnchor: [20, 40],
  popupAnchor: [0, -40],
});

const activeRideIcon = new L.DivIcon({
  className: "custom-marker",
  html: `<div class="marker-pin" style="--bg-color: #22c55e"><div class="marker-icon pulse"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2.5"><circle cx="12" cy="12" r="10"/><path d="M12 8v4l3 3"/></svg></div></div>`,
  iconSize: [40, 40],
  iconAnchor: [20, 40],
  popupAnchor: [0, -40],
});

// Naya Control Component for FlyTo
function MapController({ selectedRide }) {
  const map = useMap();

  useEffect(() => {
    if (selectedRide) {
      const lat =
        selectedRide.currentLocation?.lat || selectedRide.bikeId?.location?.lat;
      const lng =
        selectedRide.currentLocation?.lng || selectedRide.bikeId?.location?.lng;

      if (lat && lng) {
        map.flyTo([lat, lng], 16, { duration: 1.5 });
      }
    }
  }, [selectedRide, map]);

  return null;
}

const TrackingMap = ({
  bikes = [],
  stations = [],
  rides = [],
  selectedRide,
}) => {
  const defaultCenter = [32.1886, 74.1804];
  const markerRefs = useRef({}); // Har ride ke marker ka reference store karne ke liye

  const ongoingRides = rides.filter(
    (r) => r.status === "Ongoing" || r.status === "ongoing",
  );

  // Jab selectedRide change ho toh popup open karein
  useEffect(() => {
    if (selectedRide && markerRefs.current[selectedRide._id]) {
      markerRefs.current[selectedRide._id].openPopup();
    }
  }, [selectedRide]);

  return (
    <div className="w-full h-[600px] lg:h-full relative rounded-2xl overflow-hidden border border-slate-200">
      <MapContainer
        center={defaultCenter}
        zoom={13}
        style={{ height: "100%", width: "100%" }}
      >
        <TileLayer url="https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png" />

        <MapController selectedRide={selectedRide} />

        {/* Stations */}
        {stations.map(
          (s) =>
            s.location?.lat && (
              <Marker
                key={s._id}
                position={[s.location.lat, s.location.lng]}
                icon={stationIcon}
              >
                <Popup>
                  <b className="text-blue-600">{s.name}</b>
                  <br />
                  Station
                </Popup>
              </Marker>
            ),
        )}

        {/* Ongoing Rides */}
        {ongoingRides.map((ride) => {
          const lat = ride.currentLocation?.lat || ride.bikeId?.location?.lat;
          const lng = ride.currentLocation?.lng || ride.bikeId?.location?.lng;
          if (!lat || !lng) return null;

          return (
            <Marker
              key={ride._id}
              position={[lat, lng]}
              icon={activeRideIcon}
              ref={(el) => (markerRefs.current[ride._id] = el)} // Store reference
            >
              <Popup>
                <div className="p-1">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
                    <span className="text-[10px] font-bold text-green-600 uppercase">
                      Live Now
                    </span>
                  </div>
                  <h4 className="font-bold text-slate-800 m-0">
                    {ride.userId?.name || "Rider"}
                  </h4>
                  <p className="text-[10px] text-slate-500 m-0">
                    Bike: {ride.bikeId?.registration_number}
                  </p>
                </div>
              </Popup>
            </Marker>
          );
        })}
      </MapContainer>

      {/* Overlay same as before */}
      <div className="absolute top-4 right-4 z-[1000] bg-white/90 p-3 rounded-xl shadow-lg border border-slate-200">
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 bg-green-500 rounded-full"></div>
          <span className="text-xs font-bold">
            {ongoingRides.length} Active Rides
          </span>
        </div>
      </div>

      <style>{`
        .custom-marker { background: transparent !important; }
        .marker-pin { width: 38px; height: 38px; background: var(--bg-color); border-radius: 50% 50% 50% 0; transform: rotate(-45deg); display: flex; align-items: center; justify-content: center; border: 2px solid white; }
        .marker-icon { transform: rotate(45deg); }
        .pulse { animation: p 1.5s infinite; border-radius: 50%; }
        @keyframes p { 0% { box-shadow: 0 0 0 0px rgba(34, 197, 94, 0.4); } 100% { box-shadow: 0 0 0 15px rgba(34, 197, 94, 0); } }
      `}</style>
    </div>
  );
};

export default TrackingMap;

import React, { useEffect, useState, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  useMap,
  CircleMarker,
} from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { fetchStations } from "../../../redux/reducer/station/stationSlice";
import { Loader2, Navigation2, MapPin, Search } from "lucide-react";
import toast from "react-hot-toast";

const createStationIcon = (color) =>
  new L.DivIcon({
    className: "volt-station-marker",
    html: `
      <div class="marker-container" style="--brand-color: ${color}">
        <div class="marker-pulse"></div>
        <div class="marker-icon">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
            <path d="M15 18V7C15 5.89543 14.1046 5 13 5H5C3.89543 5 3 5.89543 3 7V18"/>
            <path d="M2 18H16V20H2V18Z" fill="white"/>
            <path d="M9 11l-2 3h4l-2 3" stroke="white" stroke-width="1.5"/>
          </svg>
        </div>
      </div>`,
    iconSize: [40, 40],
    iconAnchor: [20, 40],
  });

function MapController({ stations, userCoords, flyToCoords }) {
  const map = useMap();
  useEffect(() => {
    if (flyToCoords) {
      map.flyTo(flyToCoords, 16, { animate: true, duration: 1.5 });
    } else if (userCoords) {
      map.setView(userCoords, 14);
    } else if (stations?.length > 0) {
      const bounds = L.latLngBounds(
        stations.map((s) => [s.location.lat, s.location.lng]),
      );
      map.fitBounds(bounds, { padding: [50, 50] });
    }
  }, [stations, userCoords, flyToCoords, map]);
  return null;
}

const DiscoveryMap = ({ onStationSelect, externalSelectedId }) => {
  const dispatch = useDispatch();
  const { items: stations, loading } = useSelector((state) => state.stations);
  const [userLocation, setUserLocation] = useState(null);
  const [flyToCoords, setFlyToCoords] = useState(null);

  useEffect(() => {
    dispatch(fetchStations());
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (pos) => setUserLocation([pos.coords.latitude, pos.coords.longitude]),
        (err) => console.error("Location Error:", err),
      );
    }
  }, [dispatch]);

  const handleNearby = useCallback(() => {
    if (!userLocation) return toast.error("Detecting your location...");
    if (stations.length === 0) return;

    const nearest = stations.reduce((prev, curr) => {
      const getDist = (st) =>
        Math.sqrt(
          Math.pow(st.location.lat - userLocation[0], 2) +
          Math.pow(st.location.lng - userLocation[1], 2),
        );
      return getDist(curr) < getDist(prev) ? curr : prev;
    });

    setFlyToCoords([nearest.location.lat, nearest.location.lng]);
    onStationSelect(nearest);
    toast.success(`Nearest: ${nearest.name}`);
  }, [userLocation, stations, onStationSelect]);

  return (
    <div className="relative h-full w-full bg-slate-100 rounded-3xl overflow-hidden shadow-2xl border border-slate-200">
      {loading && (
        <div className="absolute inset-0 z-[2000] bg-white/40 backdrop-blur-md flex items-center justify-center">
          <Loader2 className="animate-spin text-blue-600" size={40} />
        </div>
      )}

      <div className="absolute top-6 left-6 z-[39] flex flex-col gap-4">
        <div className="bg-white/90 backdrop-blur-md p-2 rounded-2xl shadow-xl border border-white/20 flex items-center gap-3 px-4 w-72">
          <Search size={18} className="text-slate-400" />
          <input
            type="text"
            placeholder="Search area..."
            className="bg-transparent border-none outline-none text-sm w-full font-medium"
          />
        </div>
      </div>

      <div className="absolute bottom-8 right-8 z-[39] flex flex-col gap-3">
        <button
          onClick={handleNearby}
          className="bg-blue-600 hover:bg-blue-700 text-white p-4 rounded-2xl shadow-2xl transition-all active:scale-95 flex items-center gap-2 font-bold text-xs uppercase tracking-widest"
        >
          {/* ✅ Typo fix: "Neaby" -> "Nearby" */}
          <Navigation2 size={20} className="fill-white" /> Nearby
        </button>
        <button
          onClick={() => setFlyToCoords(userLocation)}
          className="bg-white hover:bg-slate-50 text-center text-slate-900 p-4 rounded-2xl shadow-xl transition-all active:scale-95"
        >
          <MapPin size={22} className="text-blue-600" />
        </button>
      </div>

      <MapContainer
        center={[32.1886, 74.1804]}
        zoom={13}
        className="w-full h-full z-0"
        zoomControl={false}
      >
        <TileLayer url="https://{s}.basemaps.cartocdn.com/rastertiles/voyager_labels_under/{z}/{x}/{y}{r}.png" />

        {userLocation && (
          <CircleMarker
            center={userLocation}
            radius={8}
            pathOptions={{
              color: "#fff",
              weight: 3,
              fillColor: "#3b82f6",
              fillOpacity: 1,
            }}
          >
            <Popup>You are here</Popup>
          </CircleMarker>
        )}

        {stations.map((station) => (
          <Marker
            key={station._id}
            position={[station.location.lat, station.location.lng]}
            icon={createStationIcon(
              externalSelectedId === station._id ? "#ef4444" : "#3b82f6",
            )}
            eventHandlers={{ click: () => onStationSelect(station) }}
          >
            <Popup className="volt-premium-popup">
              <div className="p-1">
                <h4 className="font-black text-slate-900 uppercase text-xs">
                  {station.name}
                </h4>
                <p className="text-[10px] text-blue-600 font-bold mt-1 uppercase tracking-tighter">
                  {station.currentBikesCount} Bikes Available
                </p>
              </div>
            </Popup>
          </Marker>
        ))}

        <MapController
          stations={stations}
          userCoords={userLocation}
          flyToCoords={flyToCoords}
        />
      </MapContainer>

      <style>{`
        .marker-container {
          position: relative;
          width: 40px;
          height: 40px;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .marker-icon {
          background: var(--brand-color);
          border: 3px solid white;
          border-radius: 12px;
          padding: 6px;
          z-index: 2;
          box-shadow: 0 4px 15px rgba(0,0,0,0.2);
          transform: translateY(-50%);
        }
        .marker-pulse {
          position: absolute;
          width: 20px;
          height: 20px;
          background: var(--brand-color);
          border-radius: 50%;
          bottom: 0;
          left: 50%;
          transform: translateX(-50%);
          opacity: 0.5;
          animation: marker-pulse 1.5s infinite;
          z-index: 1;
        }
        @keyframes marker-pulse {
          0% { transform: translateX(-50%) scale(0.5); opacity: 0.8; }
          100% { transform: translateX(-50%) scale(2.5); opacity: 0; }
        }
        .volt-premium-popup .leaflet-popup-content-wrapper {
          border-radius: 12px;
          padding: 4px;
        }
      `}</style>
    </div>
  );
};

export default DiscoveryMap;
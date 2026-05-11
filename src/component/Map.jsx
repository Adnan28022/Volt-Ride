import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { useEffect } from "react";

// --- ULTRA-PREMIUM SVG MARKER GENERATOR ---
const createUniqueIcon = (color, type) => {
  // 1. High-Quality Bike SVG
  const bikeSVG = `
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M5.5 19C7.433 19 9 17.433 9 15.5C9 13.567 7.433 12 5.5 12C3.567 12 2 13.567 2 15.5C2 17.433 3.567 19 5.5 19Z" stroke="white" stroke-width="2"/>
      <path d="M18.5 19C20.433 19 22 17.433 22 15.5C22 13.567 20.433 12 18.5 12C16.567 12 15 13.567 15 15.5C15 17.433 16.567 19 18.5 19Z" stroke="white" stroke-width="2"/>
      <path d="M9 15.5L12 9.5H16.5L18.5 12" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
      <path d="M12 9.5L10 5H7.5" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
      <path d="M12 15.5V12.5" stroke="white" stroke-width="2" stroke-linecap="round"/>
    </svg>`;

  // 2. High-Quality Charging SVG
  const chargingSVG = `
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M15 18V7C15 5.89543 14.1046 5 13 5H5C3.89543 5 3 5.89543 3 7V18" stroke="white" stroke-width="2" stroke-linecap="round"/>
      
      <path d="M2 18H16V20H2V18Z" fill="white"/>
      
      <path d="M6 8H12V11H6V8Z" stroke="white" stroke-width="1.2"/>
      <circle cx="8" cy="9.5" r="0.5" fill="white"/>
      <circle cx="10" cy="9.5" r="0.5" fill="white"/>
      
      <path d="M11 13L8 16H12L9 19" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
      
      <path d="M15 11H16.5C17.8807 11 19 12.1193 19 13.5V18" stroke="white" stroke-width="1.5" stroke-linecap="round"/>
      <path d="M17 9V5M17 5H21M17 5L17 4" stroke="white" stroke-width="1.5" stroke-linecap="round"/>
      <path d="M19 9V5" stroke="white" stroke-width="1.5" stroke-linecap="round"/>
    </svg>`;

  return new L.DivIcon({
    className: "volt-unique-marker",
    html: `
      <div class="marker-floating-card" style="--marker-color: ${color}">
        <div class="marker-glow"></div>
        <div class="marker-glass-bg"></div>
        <div class="marker-content">
          ${type === "bike" ? bikeSVG : chargingSVG}
        </div>
        <div class="marker-anchor-point"></div>
      </div>`,
    iconSize: [44, 44],
    iconAnchor: [22, 48],
    popupAnchor: [0, -50],
  });
};

const bikeIcon = createUniqueIcon("#10b981", "bike"); // Green
const chargingIcon = createUniqueIcon("#3b82f6", "charging"); // Blue

function RecenterMap({ coords }) {
  const map = useMap();
  useEffect(() => {
    if (coords) {
      map.flyTo(coords, 15, { duration: 1.5 });
    }
  }, [coords, map]);
  return null;
}

const Map = ({ stations, activeCoords }) => {
  const defaultCenter = [31.5204, 74.3587];

  return (
    <div className="w-full h-full relative">
      <MapContainer
        center={defaultCenter}
        zoom={12}
        className="w-full h-full"
        zoomControl={false}
      >
        {/* Cleaner High-Contrast Map Tiles */}
        <TileLayer
          url="https://{s}.basemaps.cartocdn.com/rastertiles/voyager_labels_under/{z}/{x}/{y}{r}.png"
          attribution="&copy; VoltRide"
        />

        {stations.map((station) => (
          <Marker
            key={station.id}
            position={station.coords}
            icon={station.type === "bike" ? bikeIcon : chargingIcon}
          >
            <Popup className="volt-premium-popup">
              <div className="p-1 min-w-[150px]">
                <p className="font-black text-slate-900 text-[12px] mb-2 uppercase tracking-tighter border-b pb-1">
                  {station.name}
                </p>
                {station.type === "bike" ? (
                  <div className="flex flex-col gap-2">
                    <div className="flex justify-between items-center">
                      <span className="text-green-600 font-extrabold text-[10px]">
                        {station.bikes} UNITS
                      </span>
                      <span className="bg-green-100 text-green-700 px-1.5 py-0.5 rounded text-[9px] font-bold">
                        {station.battery}
                      </span>
                    </div>
                    <div className="w-full bg-slate-100 h-1.5 rounded-full overflow-hidden">
                      <div
                        className="bg-green-500 h-full rounded-full transition-all duration-1000"
                        style={{ width: station.battery }}
                      ></div>
                    </div>
                  </div>
                ) : (
                  <div className="flex items-center justify-between">
                    <p className="text-blue-600 font-black text-[10px] uppercase">
                      Active Ports
                    </p>
                    <span className="flex h-3 w-3 relative">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-3 w-3 bg-blue-500"></span>
                    </span>
                    <span className="text-blue-700 font-black text-[11px]">
                      ${station.slots}
                    </span>
                  </div>
                )}
              </div>
            </Popup>
          </Marker>
        ))}

        <RecenterMap coords={activeCoords} />
      </MapContainer>

      {/* --- STYLES --- */}
      <style>{`
        .volt-unique-marker {
          background: transparent !important;
          border: none !important;
        }

        .marker-floating-card {
          position: relative;
          width: 44px;
          height: 44px;
          display: flex;
          align-items: center;
          justify-content: center;
          filter: drop-shadow(0 10px 10px rgba(0,0,0,0.1));
        }

        .marker-floating-card:hover {
          transform: translateY(-5px) scale(1.05);
          transition: all 0.3s ease;
        }

        .marker-glass-bg {
          position: absolute;
          width: 38px;
          height: 38px;
          background: var(--marker-color);
          border: 3px solid white;
          border-radius: 14px;
          z-index: 1;
        }

        .marker-content {
          position: relative;
          z-index: 3;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .marker-glow {
          position: absolute;
          width: 100%;
          height: 100%;
          background: var(--marker-color);
          border-radius: 50%;
          filter: blur(15px);
          opacity: 0.4;
          z-index: 0;
          animation: marker-glow-pulse 2.5s infinite;
        }

        .marker-anchor-point {
          position: absolute;
          bottom: -6px;
          width: 8px;
          height: 8px;
          background: var(--marker-color);
          border: 2px solid white;
          border-radius: 50%;
          z-index: 4;
        }

        @keyframes marker-glow-pulse {
          0%, 100% { transform: scale(0.8); opacity: 0.3; }
          50% { transform: scale(1.3); opacity: 0.5; }
        }

        .volt-premium-popup .leaflet-popup-content-wrapper {
          border-radius: 14px;
          padding: 8px;
          box-shadow: 0 20px 25px -5px rgb(0 0 0 / 0.1);
          border: 1px solid #f1f5f9;
        }
        
        .volt-premium-popup .leaflet-popup-tip-container {
          display: none;
        }
      `}</style>
    </div>
  );
};

export default Map;

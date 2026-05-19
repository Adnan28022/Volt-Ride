import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchStations } from "../redux/reducer/station/stationSlice";
import * as Lucide from "lucide-react";
import MapComponent from "./Map";

const StationLocator = ({ searchQuery }) => {
  const dispatch = useDispatch();
  const { items: stations, loading } = useSelector((state) => state.stations);
  const [activeTab, setActiveTab] = useState("all");
  const [activeStation, setActiveStation] = useState(null);

  useEffect(() => {
    dispatch(fetchStations());
  }, [dispatch]);

  // ✅ Backend data ko component format mein convert karo
  const allStations = stations?.map((s) => ({
    id: s._id,
    type: "bike",
    name: s.name,
    area: s.address || s.location?.address || "Pakistan",
    distance: "—",
    bikes: s.currentBikesCount || 0,
    slots: s.capacity || 0,
    status: s.currentBikesCount > 0
      ? s.currentBikesCount < 3 ? "Limited" : "Available"
      : "Empty",
    color: s.currentBikesCount > 0
      ? s.currentBikesCount < 3 ? "bg-amber-500" : "bg-green-500"
      : "bg-red-500",
    coords: [s.location?.lat || 31.5204, s.location?.lng || 74.3587],
    battery: "—",
  })) || [];

  // Filter Logic
  const filteredStations = allStations.filter((s) => {
    const matchesSearch =
      s.name.toLowerCase().includes((searchQuery || "").toLowerCase()) ||
      s.area.toLowerCase().includes((searchQuery || "").toLowerCase());
    const matchesTab = activeTab === "all" || s.type === activeTab;
    return matchesSearch && matchesTab;
  });

  return (
    <section className="py-24 bg-white min-h-[80vh]">
      <div className="container mx-auto px-6 lg:px-24">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
          <div className="max-w-xl">
            <h2 className="text-4xl font-black text-slate-900 mb-4">
              Stations Nearby
            </h2>
            <p className="text-slate-500 font-medium">
              Select a tab to switch between Bike Rentals and Charging Stations.
            </p>
          </div>

          {/* Tabs */}
          <div className="flex bg-slate-100 p-2 rounded-3xl border border-slate-200">
            {["all", "bike", "charging"].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-6 py-3 rounded-2xl text-xs font-black uppercase tracking-widest transition-all ${activeTab === tab
                  ? "bg-white text-green-600 shadow-sm"
                  : "text-slate-400 hover:text-slate-600"
                  }`}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-10 h-[750px]">
          {/* Station Cards */}
          <div className="w-full lg:w-1/3 overflow-y-auto space-y-4 pr-4 custom-scrollbar">
            {loading ? (
              <div className="h-full flex items-center justify-center">
                <Lucide.Loader2 size={32} className="animate-spin text-green-500" />
              </div>
            ) : filteredStations.length > 0 ? (
              filteredStations.map((station) => (
                <div
                  key={station.id}
                  onClick={() => setActiveStation(station)}
                  className={`p-8 rounded-[2.5rem] border-2 transition-all duration-300 cursor-pointer group 
                    ${activeStation?.id === station.id
                      ? "border-green-500 bg-green-50 shadow-xl"
                      : "border-slate-50 bg-slate-50 hover:border-slate-200 hover:bg-white"
                    }`}
                >
                  <div className="flex justify-between items-start mb-4">
                    <div className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-tighter text-white ${station.color}`}>
                      {station.status}
                    </div>
                    <span className="text-[10px] font-black text-slate-400 uppercase">
                      {station.distance}
                    </span>
                  </div>

                  <div className="flex items-center gap-2 mb-2">
                    <Lucide.Bike size={16} className="text-green-500" />
                    <h3 className="text-xl font-black text-slate-900 group-hover:text-green-600 leading-tight">
                      {station.name}
                    </h3>
                  </div>

                  <p className="text-[11px] text-slate-400 font-medium mb-3">
                    📍 {station.area}
                  </p>

                  <div className="flex items-center gap-6 mt-4">
                    <div className="flex items-center gap-2">
                      <Lucide.Bike size={18} className="text-slate-400" />
                      <span className="text-sm font-bold text-slate-700">
                        {station.bikes} Available
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Lucide.ParkingSquare size={18} className="text-slate-400" />
                      <span className="text-sm font-bold text-slate-700">
                        {station.slots - station.bikes} Free Slots
                      </span>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="h-full flex flex-col items-center justify-center bg-slate-50 rounded-[3rem] border-2 border-dashed border-slate-200 p-10 text-center">
                <Lucide.MapPinOff size={48} className="text-slate-300 mb-4" />
                <p className="font-bold text-slate-400">No stations found.</p>
              </div>
            )}
          </div>

          {/* Map */}
          <div className="w-full lg:w-2/3 rounded-[3.5rem] overflow-hidden border-[12px] border-slate-50 shadow-2xl relative z-0">
            <MapComponent
              stations={filteredStations}
              activeCoords={activeStation?.coords}
            />
          </div>
        </div>
      </div>

      <style>{`
        .custom-scrollbar::-webkit-scrollbar { width: 6px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: #f1f1f1; border-radius: 10px; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: #10b981; border-radius: 10px; }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover { background: #059669; }
      `}</style>
    </section>
  );
};

export default StationLocator;
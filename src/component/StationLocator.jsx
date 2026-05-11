import { useState } from "react";
import * as Lucide from "lucide-react";
import MapComponent from "./Map";

const StationLocator = ({ searchQuery }) => {
  const [activeTab, setActiveTab] = useState("all"); // all, bikes, charging
  const [allStations] = useState([
    // BIKE HUBS
    {
      id: 1,
      type: "bike",
      name: "Gulberg Main Boulevard",
      area: "Lahore",
      distance: "0.8 km",
      bikes: 12,
      slots: 5,
      status: "Available",
      color: "bg-green-500",
      coords: [31.5115, 74.3436],
      battery: "95%",
    },
    {
      id: 2,
      type: "bike",
      name: "DHA Phase 6 - Raya",
      area: "Lahore",
      distance: "1.2 km",
      bikes: 4,
      slots: 15,
      status: "Limited",
      color: "bg-amber-500",
      coords: [31.4704, 74.4506],
      battery: "80%",
    },
    {
      id: 3,
      type: "bike",
      name: "Model Town C-Block",
      area: "Lahore",
      distance: "2.5 km",
      bikes: 8,
      slots: 10,
      status: "Available",
      color: "bg-green-500",
      coords: [31.4805, 74.3239],
      battery: "90%",
    },
    {
      id: 4,
      type: "bike",
      name: "Liberty Market Square",
      area: "Lahore",
      distance: "3.1 km",
      bikes: 0,
      slots: 20,
      status: "Empty",
      color: "bg-red-500",
      coords: [31.5111, 74.3344],
      battery: "0%",
    },

    // CHARGING STATIONS
    {
      id: 5,
      type: "charging",
      name: "Johar Town Fast-Charge",
      area: "Lahore",
      distance: "4.2 km",
      bikes: 0,
      slots: 10,
      status: "Active",
      color: "bg-blue-500",
      coords: [31.4697, 74.2728],
      battery: "N/A",
    },
    {
      id: 6,
      type: "charging",
      name: "WAPDA Town Hub",
      area: "Lahore",
      distance: "6.1 km",
      bikes: 0,
      slots: 8,
      status: "Active",
      color: "bg-blue-500",
      coords: [31.4345, 74.2724],
      battery: "N/A",
    },

    // MORE LOCATIONS
    {
      id: 7,
      type: "bike",
      name: "Bahria Town - Safari Homes",
      area: "Lahore",
      distance: "5.5 km",
      bikes: 6,
      slots: 8,
      status: "Available",
      color: "bg-green-500",
      coords: [31.3687, 74.1843],
      battery: "75%",
    },
    {
      id: 8,
      type: "bike",
      name: "Lahore Cantt Station",
      area: "Lahore",
      distance: "2.1 km",
      bikes: 15,
      slots: 2,
      status: "High Demand",
      color: "bg-green-500",
      coords: [31.5204, 74.3587],
      battery: "100%",
    },
    {
      id: 9,
      type: "charging",
      name: "Amanah Mall Charging Port",
      area: "Lahore",
      distance: "3.8 km",
      bikes: 0,
      slots: 5,
      status: "Active",
      color: "bg-blue-500",
      coords: [31.4815, 74.303],
      battery: "N/A",
    },
  ]);

  const [activeStation, setActiveStation] = useState(null);

  // Filter Logic: Tabs + Search
  const filteredStations = allStations.filter((s) => {
    const matchesSearch =
      s.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.area.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesTab = activeTab === "all" || s.type === activeTab;
    return matchesSearch && matchesTab;
  });

  return (
    <section className="py-24 bg-white min-h-[80vh]">
      <div className="container mx-auto px-6 lg:px-24">
        {/* Results Header */}
        <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
          <div className="max-w-xl">
            <h2 className="text-4xl font-black text-slate-900 mb-4">
              Stations Nearby
            </h2>
            <p className="text-slate-500 font-medium">
              Select a tab to switch between Bike Rentals and Charging Stations.
            </p>
          </div>

          {/* TAB SYSTEM */}
          <div className="flex bg-slate-100 p-2 rounded-3xl border border-slate-200">
            {["all", "bike", "charging"].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-6 py-3 rounded-2xl text-xs font-black uppercase tracking-widest transition-all ${
                  activeTab === tab
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
          {/* Station Cards List with Custom Scrollbar */}
          <div className="w-full lg:w-1/3 overflow-y-auto space-y-4 pr-4 custom-scrollbar">
            {filteredStations.length > 0 ? (
              filteredStations.map((station) => (
                <div
                  key={station.id}
                  onClick={() => setActiveStation(station)}
                  className={`p-8 rounded-[2.5rem] border-2 transition-all duration-300 cursor-pointer group 
                    ${activeStation?.id === station.id ? "border-green-500 bg-green-50 shadow-xl" : "border-slate-50 bg-slate-50 hover:border-slate-200 hover:bg-white"}`}
                >
                  <div className="flex justify-between items-start mb-4">
                    <div
                      className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-tighter text-white ${station.color}`}
                    >
                      {station.status}
                    </div>
                    <span className="text-[10px] font-black text-slate-400 uppercase">
                      {station.distance}
                    </span>
                  </div>

                  <div className="flex items-center gap-2 mb-2">
                    {station.type === "bike" ? (
                      <Lucide.Bike size={16} className="text-green-500" />
                    ) : (
                      <Lucide.Zap size={16} className="text-blue-500" />
                    )}
                    <h3 className="text-xl font-black text-slate-900 group-hover:text-green-600 leading-tight">
                      {station.name}
                    </h3>
                  </div>

                  <div className="flex items-center gap-6 mt-4">
                    {station.type === "bike" ? (
                      <>
                        <div className="flex items-center gap-2">
                          <Lucide.Bike size={18} className="text-slate-400" />
                          <span className="text-sm font-bold text-slate-700">
                            {station.bikes} Available
                          </span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Lucide.BatteryCharging
                            size={18}
                            className="text-green-500"
                          />
                          <span className="text-sm font-bold text-slate-700">
                            {station.battery}
                          </span>
                        </div>
                      </>
                    ) : (
                      <div className="flex items-center gap-2">
                        <Lucide.Zap size={18} className="text-blue-500" />
                        <span className="text-sm font-bold text-slate-700">
                          {station.slots} Charging Slots
                        </span>
                      </div>
                    )}
                  </div>
                </div>
              ))
            ) : (
              <div className="h-full flex flex-col items-center justify-center bg-slate-50 rounded-[3rem] border-2 border-dashed border-slate-200 p-10 text-center">
                <Lucide.MapPinOff size={48} className="text-slate-300 mb-4" />
                <p className="font-bold text-slate-400">No results found.</p>
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

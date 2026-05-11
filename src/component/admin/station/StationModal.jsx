import React from "react";
import { X, Search } from "lucide-react";
import {
  MapContainer,
  TileLayer,
  Marker,
  useMap,
  useMapEvents,
} from "react-leaflet";

function ChangeView({ center }) {
  const map = useMap();
  map.setView(center, 14);
  return null;
}

const MapEvents = ({ setFormData }) => {
  useMapEvents({
    click(e) {
      setFormData((prev) => ({
        ...prev,
        lat: e.latlng.lat,
        lng: e.latlng.lng,
      }));
    },
  });
  return null;
};

const StationModal = ({
  show,
  onClose,
  onSubmit,
  formData,
  setFormData,
  editId,
  searchQuery,
  setSearchQuery,
  handleSearch,
  mapCenter,
}) => {
  if (!show) return null;

  return (
    <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm flex items-center justify-center p-4 z-[9999]">
      <div className="bg-white w-full max-w-xl rounded-2xl p-8 shadow-2xl relative">
        <button
          onClick={onClose}
          className="absolute top-6 right-6 text-slate-300 hover:text-slate-900"
        >
          <X size={20} />
        </button>
        <h2 className="text-xl font-black text-slate-900 mb-6">
          {editId ? "Update Station" : "New Station"}
        </h2>

        <form onSubmit={onSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <input
              required
              className="w-full bg-slate-50 border border-slate-100 p-3 rounded-lg outline-none focus:border-emerald-500 font-bold"
              placeholder="Name"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            />
            <input
              required
              type="number"
              className="w-full bg-slate-50 border border-slate-100 p-3 rounded-lg outline-none focus:border-emerald-500 font-bold"
              placeholder="Capacity"
              value={formData.capacity}
              onChange={(e) => setFormData({ ...formData, capacity: e.target.value })}
            />
          </div>

          <div className="relative">
            <input
              className="w-full bg-slate-100 p-3 pl-10 rounded-lg text-sm outline-none"
              placeholder="Search address..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && (e.preventDefault(), handleSearch())}
            />
            <Search className="absolute left-3 top-3.5 text-slate-400" size={16} />
            <button
              type="button"
              onClick={handleSearch}
              className="absolute right-2 top-2 bg-emerald-600 text-white text-[10px] px-3 py-1.5 rounded-md font-bold"
            >
              Find
            </button>
          </div>

          <div className="h-[250px] w-full rounded-xl overflow-hidden border border-slate-100">
            <MapContainer
              center={mapCenter}
              zoom={13}
              style={{ height: "100%", width: "100%" }}
            >
              <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
              <ChangeView center={mapCenter} />
              <MapEvents setFormData={setFormData} />
              {/* ✅ Crash fix — undefined lat/lng check */}
              {formData.lat && formData.lng && (
                <Marker position={[formData.lat, formData.lng]} />
              )}
            </MapContainer>
          </div>

          <button
            type="submit"
            className="w-full bg-emerald-600 hover:bg-emerald-700 text-white py-4 rounded-xl font-black transition-all"
          >
            {editId ? "Save Changes" : "Deploy Station"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default StationModal;
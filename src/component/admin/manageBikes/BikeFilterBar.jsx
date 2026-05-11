import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Search, Plus, X, Upload, MapPin, Lock, Info, Zap, Gauge,
} from "lucide-react";
import Swal from "sweetalert2";
import { fetchStations } from "../../../redux/reducer/station/stationSlice";
import { addBike, updateBike } from "../../../redux/reducer/bike/bikeSlice";

const BikeFilterBar = ({ editData, setEditData, searchTerm, setSearchTerm }) => {
  const dispatch = useDispatch();
  const { items: stations } = useSelector((state) => state.stations);
  const { bikes } = useSelector((state) => state.bikes);

  const [isModalOpen, setIsModalOpen] = useState(false);

  const initialState = {
    model_name: "",
    battery_level: 100,
    price_per_hour: "",
    status: "Available",
    registration_number: "",
    currentStationId: "",
    lat: "32.1886",
    lng: "74.1804",
    isLocked: true,
    range: "80km",
    speed: "45km/h",
  };

  const [formData, setFormData] = useState(initialState);

  useEffect(() => {
    dispatch(fetchStations());
  }, [dispatch]);

  useEffect(() => {
    if (editData) {
      setFormData({
        ...editData,
        lat: editData.liveLocation?.lat || "32.1886",
        lng: editData.liveLocation?.lng || "74.1804",
        currentStationId: editData.currentStationId?._id || editData.currentStationId || "",
        range: editData.range || "80km",
        speed: editData.speed || "45km/h",
      });
      setIsModalOpen(true);
    }
  }, [editData]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({ ...formData, [name]: type === "checkbox" ? checked : value });
  };

  const handleStationChange = (e) => {
    const stationId = e.target.value;
    const selectedStation = stations.find((s) => s._id === stationId);
    if (selectedStation) {
      setFormData({
        ...formData,
        currentStationId: stationId,
        lat: selectedStation.location.lat,
        lng: selectedStation.location.lng,
      });
    } else {
      setFormData({ ...formData, currentStationId: "" });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const isDuplicate = bikes.some(
      (bike) =>
        bike.registration_number?.toLowerCase() ===
        formData.registration_number?.toLowerCase() &&
        bike._id !== editData?._id,
    );

    if (isDuplicate) {
      Swal.fire({
        icon: "error",
        title: "Duplicate!",
        text: "Registration number already exists!",
        confirmButtonColor: "#10b981",
      });
      return;
    }

    // ✅ JSON — no FormData
    const bikeData = {
      model_name: formData.model_name,
      registration_number: formData.registration_number,
      battery_level: Number(formData.battery_level),
      price_per_hour: Number(formData.price_per_hour),
      status: formData.status,
      currentStationId: formData.currentStationId || null,
      isLocked: formData.isLocked,
      range: formData.range || "80km",
      speed: formData.speed || "45km/h",
      liveLocation: {
        lat: Number(formData.lat) || 32.1886,
        lng: Number(formData.lng) || 74.1804,
      },
    };

    try {
      if (editData) {
        await dispatch(updateBike({ id: editData._id, bikeData })).unwrap();
      } else {
        await dispatch(addBike(bikeData)).unwrap();
      }
      Swal.fire({
        icon: "success",
        title: "Success!",
        text: editData ? "Bike updated!" : "Bike added!",
        timer: 1500,
        showConfirmButton: false,
      });
      closeModal();
    } catch (err) {
      Swal.fire({ icon: "error", title: "Error", text: err });
    }
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setEditData(null);
    setFormData(initialState);
  };

  return (
    <>
      {/* Filter Bar */}
      <div className="flex flex-col md:flex-row gap-4 justify-between items-center bg-white p-4 border border-slate-200 rounded-xl shadow-sm">
        <div className="relative w-full md:w-96 group">
          <Search
            className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-emerald-600 transition-colors"
            size={18}
          />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search fleet..."
            className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/10 focus:border-emerald-500 transition-all"
          />
        </div>
        <button
          onClick={() => setIsModalOpen(true)}
          className="w-full md:w-auto flex items-center justify-center gap-2 px-6 py-2.5 bg-slate-900 text-white rounded-xl text-sm font-bold hover:bg-emerald-600 active:scale-95 transition-all"
        >
          <Plus size={18} /> Add New Bike
        </button>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-6">
          <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm" onClick={closeModal} />
          <form
            onSubmit={handleSubmit}
            className="relative bg-white w-full max-w-4xl rounded-3xl shadow-2xl overflow-hidden animate-in zoom-in duration-200"
          >
            {/* Header */}
            <div className="px-8 py-5 border-b border-slate-100 flex justify-between items-center bg-slate-50/50">
              <div>
                <h3 className="font-black text-slate-800 text-xl uppercase tracking-tight">
                  {editData ? "Update Vehicle" : "Add New Vehicle"}
                </h3>
                <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest flex items-center gap-1">
                  <Info size={12} /> Fleet Management System
                </p>
              </div>
              <button
                type="button"
                onClick={closeModal}
                className="p-2 hover:bg-slate-200 rounded-full text-slate-400 transition-colors"
              >
                <X size={24} />
              </button>
            </div>

            {/* Body */}
            <div className="p-8 grid grid-cols-1 md:grid-cols-2 gap-8 max-h-[70vh] overflow-y-auto">

              {/* Left Column */}
              <div className="space-y-6">
                {/* Default Image Preview */}
                <div className="space-y-2">
                  <label className="text-[11px] font-black text-slate-500 uppercase tracking-wider ml-1">
                    Vehicle Appearance
                  </label>
                  <div className="border-2 border-dashed border-slate-200 rounded-3xl h-48 flex flex-col items-center justify-center bg-slate-50">
                    <div className="w-16 h-16 bg-white rounded-2xl shadow-sm flex items-center justify-center mx-auto mb-3 text-slate-300">
                      <Upload size={28} />
                    </div>
                    <p className="text-xs font-bold text-slate-400 uppercase tracking-tighter">
                      Default image will be used
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-[11px] font-black text-slate-500 uppercase ml-1">Model Name</label>
                    <input
                      name="model_name"
                      value={formData.model_name}
                      onChange={handleChange}
                      placeholder="e.g. Volt X"
                      className="w-full p-3 bg-slate-50 border border-slate-200 rounded-2xl text-sm focus:border-emerald-500 outline-none font-bold"
                      required
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[11px] font-black text-slate-500 uppercase ml-1">Reg Number</label>
                    <input
                      name="registration_number"
                      value={formData.registration_number}
                      onChange={handleChange}
                      placeholder="PB-0000"
                      className="w-full p-3 bg-slate-50 border border-slate-200 rounded-2xl text-sm focus:border-emerald-500 outline-none font-mono font-bold"
                      required
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-[11px] font-black text-slate-500 uppercase ml-1 flex items-center gap-1">
                      <Zap size={12} className="text-amber-500" /> Max Range
                    </label>
                    <input
                      name="range"
                      value={formData.range}
                      onChange={handleChange}
                      placeholder="e.g. 60km"
                      className="w-full p-3 bg-slate-50 border border-slate-200 rounded-2xl text-sm focus:border-emerald-500 outline-none font-bold"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[11px] font-black text-slate-500 uppercase ml-1 flex items-center gap-1">
                      <Gauge size={12} className="text-blue-500" /> Top Speed
                    </label>
                    <input
                      name="speed"
                      value={formData.speed}
                      onChange={handleChange}
                      placeholder="e.g. 45km/h"
                      className="w-full p-3 bg-slate-50 border border-slate-200 rounded-2xl text-sm focus:border-emerald-500 outline-none font-bold"
                    />
                  </div>
                </div>
              </div>

              {/* Right Column */}
              <div className="space-y-6">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-[11px] font-black text-slate-500 uppercase ml-1">Rate (Rs/hr)</label>
                    <input
                      name="price_per_hour"
                      type="number"
                      value={formData.price_per_hour}
                      onChange={handleChange}
                      className="w-full p-3 bg-slate-50 border border-slate-200 rounded-2xl text-sm font-bold focus:border-emerald-500 outline-none"
                      required
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[11px] font-black text-slate-500 uppercase ml-1">Battery (%)</label>
                    <input
                      name="battery_level"
                      type="number"
                      value={formData.battery_level}
                      onChange={handleChange}
                      className="w-full p-3 bg-slate-50 border border-slate-200 rounded-2xl text-sm font-bold focus:border-emerald-500 outline-none"
                    />
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="text-[11px] font-black text-slate-500 uppercase ml-1">Assigned Station</label>
                  <select
                    name="currentStationId"
                    value={formData.currentStationId}
                    onChange={handleStationChange}
                    className="w-full p-3 bg-slate-50 border border-slate-200 rounded-2xl text-sm font-bold focus:border-emerald-500 outline-none appearance-none cursor-pointer"
                    required
                  >
                    <option value="">Choose a location...</option>
                    {stations.map((s) => (
                      <option key={s._id} value={s._id}>
                        {s.name} ({s.capacity - s.currentBikesCount} Free)
                      </option>
                    ))}
                  </select>
                </div>

                {/* Location Display */}
                <div className="grid grid-cols-2 gap-4 p-4 bg-emerald-50/50 border border-emerald-100 rounded-2xl">
                  <div className="space-y-1">
                    <label className="text-[10px] font-black text-emerald-700 uppercase flex items-center gap-1">
                      <MapPin size={12} /> Lat
                    </label>
                    <input
                      value={formData.lat}
                      readOnly
                      className="w-full bg-transparent border-none p-0 text-sm font-mono text-emerald-900 outline-none"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[10px] font-black text-emerald-700 uppercase flex items-center gap-1">
                      <MapPin size={12} /> Lng
                    </label>
                    <input
                      value={formData.lng}
                      readOnly
                      className="w-full bg-transparent border-none p-0 text-sm font-mono text-emerald-900 outline-none"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-[11px] font-black text-slate-500 uppercase ml-1">Security Lock</label>
                    <label className="flex items-center justify-between p-3 bg-slate-50 border border-slate-200 rounded-2xl cursor-pointer hover:bg-slate-100 transition-colors">
                      <span className="text-xs font-bold text-slate-600 flex items-center gap-2">
                        <Lock size={14} className={formData.isLocked ? "text-emerald-600" : "text-slate-400"} />
                        {formData.isLocked ? "Locked" : "Unlocked"}
                      </span>
                      <input
                        type="checkbox"
                        name="isLocked"
                        checked={formData.isLocked}
                        onChange={handleChange}
                        className="w-4 h-4 accent-emerald-600"
                      />
                    </label>
                  </div>
                  <div className="space-y-1">
                    <label className="text-[11px] font-black text-slate-500 uppercase ml-1">Status</label>
                    <select
                      name="status"
                      value={formData.status}
                      onChange={handleChange}
                      className="w-full p-3 bg-slate-50 border border-slate-200 rounded-2xl text-sm font-bold focus:border-emerald-500 outline-none appearance-none cursor-pointer"
                    >
                      <option>Available</option>
                      <option>Maintenance</option>
                      <option>In Use</option>
                      <option>Out of Service</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>

            {/* Footer */}
            <div className="p-8 bg-slate-50/80 border-t border-slate-100 flex flex-col md:flex-row gap-4">
              <button
                type="button"
                onClick={closeModal}
                className="order-2 md:order-1 flex-1 py-4 bg-white border border-slate-200 text-slate-600 rounded-2xl font-bold hover:bg-slate-100 transition-all"
              >
                Discard Changes
              </button>
              <button
                type="submit"
                className="order-1 md:order-2 flex-[2] py-4 bg-slate-900 text-white rounded-2xl font-bold hover:bg-emerald-600 shadow-xl shadow-slate-200 active:scale-[0.98] transition-all"
              >
                {editData ? "Update Vehicle Record" : "Confirm & Save Vehicle"}
              </button>
            </div>
          </form>
        </div>
      )}
    </>
  );
};

export default BikeFilterBar;
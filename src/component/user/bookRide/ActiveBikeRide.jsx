import React from 'react';
import { useSelector } from 'react-redux';
import { Battery, Bike, Gauge, MapPin, Navigation } from "lucide-react";

const ActiveBikeRide = ({ activeBikeId }) => {
    // Redux state se data nikalna
    const { bikes, loading } = useSelector((state) => state.bikes);

    // Specific bike ki details filter karna
    const bikeDetails = bikes.find((bike) => bike._id === activeBikeId);

    if (loading) return (
        <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm animate-pulse text-center">
            <p className="text-slate-400 font-bold uppercase text-[10px]">Loading Bike Details...</p>
        </div>
    );

    // Agar ride nahi hai to component hide ho jaye
    if (!bikeDetails) return null;

    return (
        <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm animate-in fade-in slide-in-from-right-4 mb-6">
            {/* Header Section */}
            <div className="flex justify-between items-start mb-6">
                <div className="p-3 bg-blue-50 rounded-2xl text-blue-600 border border-blue-100 shadow-sm">
                    <Bike size={24} />
                </div>
                <div className="flex flex-col items-end gap-1">
                    <span className="text-[10px] font-black px-2 py-1 rounded-md uppercase border bg-blue-50 text-blue-700 border-blue-100">
                        Ride in Progress
                    </span>
                    <span className="text-[9px] font-bold text-slate-400 uppercase tracking-tight">
                        Reg: {bikeDetails.registration_number}
                    </span>
                </div>
            </div>

            {/* Bike Info */}
            <div className="space-y-4">
                <div>
                    <h4 className="text-lg font-black text-slate-900 uppercase tracking-tight">
                        {bikeDetails.model_name}
                    </h4>
                    <p className="text-[11px] text-slate-500 flex items-center gap-1 mt-1 font-medium">
                        <Navigation size={12} className="text-slate-400" />
                        Live tracking enabled
                    </p>
                </div>

                {/* Battery Progress Bar */}
                <div className="space-y-2">
                    <div className="flex justify-between text-[10px] font-bold uppercase text-slate-400">
                        <span className="flex items-center gap-1">
                            <Battery size={12} /> Battery Status
                        </span>
                        <span>{bikeDetails.battery_level}%</span>
                    </div>
                    <div className="w-full bg-slate-100 h-2.5 rounded-full overflow-hidden border border-slate-50">
                        <div
                            className={`h-full rounded-full transition-all duration-700 ${bikeDetails.battery_level < 20 ? "bg-red-500" :
                                bikeDetails.battery_level < 50 ? "bg-orange-500" : "bg-green-500"
                                }`}
                            style={{ width: `${bikeDetails.battery_level}%` }}
                        ></div>
                    </div>
                </div>

                {/* Stats Grid */}
                <div className="grid grid-cols-2 gap-2 border-y border-slate-100 py-4">
                    <div className="text-center border-r border-slate-50">
                        <p className="text-[8px] font-black text-slate-400 uppercase tracking-widest mb-1 flex items-center justify-center gap-1">
                            <Gauge size={10} /> Range
                        </p>
                        <p className="text-sm font-black text-slate-900">{bikeDetails.range}</p>
                    </div>
                    <div className="text-center">
                        <p className="text-[8px] font-black text-slate-400 uppercase tracking-widest mb-1 flex items-center justify-center gap-1">
                            Speed
                        </p>
                        <p className="text-sm font-black text-slate-900">{bikeDetails.speed}</p>
                    </div>
                </div>

                {/* Live Location Tag */}
                <div className="mt-2">
                    <div className="bg-slate-50 rounded-xl p-3 flex items-center gap-3 border border-slate-100">
                        <div className="p-2 bg-white rounded-lg text-slate-400 shadow-sm">
                            <MapPin size={14} />
                        </div>
                        <div>
                            <p className="text-[8px] font-black text-slate-400 uppercase tracking-widest">Live Coordinates</p>
                            <p className="text-[10px] font-bold text-slate-700">
                                {bikeDetails.liveLocation?.lat.toFixed(4)}, {bikeDetails.liveLocation?.lng.toFixed(4)}
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ActiveBikeRide;
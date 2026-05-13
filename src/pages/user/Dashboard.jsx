import React from 'react';
import { useSelector } from 'react-redux';
import UserBanner from '../../component/user/dashboard/UserBanner';
import RiderStats from '../../component/user/dashboard/RiderStats';
import RecentRides from '../../component/user/dashboard/RecentRides';
import NearbyStations from '../../component/user/dashboard/NearByStations';
import EnvironmentRewards from '../../component/user/dashboard/EnvironmentRewards';
import { History, ArrowRight, Zap, Navigation } from "lucide-react";

const UserDashboard = () => {
    const { isRiding, activeRide } = useSelector((state) => state.rides);
    const { user } = useSelector((state) => state.auth);

    return (
        <div className="p-6 space-y-6 bg-slate-50/30 min-h-screen">

            {/* 1. Top Banner */}
            <UserBanner />

            {/* 2. Rider Metrics */}
            <RiderStats />

            {/* 3. Content Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

                {/* Left Section */}
                <div className="lg:col-span-2 space-y-6">
                    <div className="bg-white border border-slate-200 rounded-[2rem] overflow-hidden shadow-sm">
                        <div className="p-5 border-b border-slate-100 flex justify-between items-center bg-slate-50/50">
                            <h3 className="text-sm font-bold text-slate-800 uppercase tracking-tight flex items-center gap-2">
                                <History size={16} className="text-slate-400" /> Recent Activity
                            </h3>
                            <a href="/user/my-rides" className="text-green-600 text-xs font-bold hover:text-green-700">
                                View All
                            </a>                        </div>
                        <RecentRides />
                    </div>
                    <EnvironmentRewards />
                </div>

                {/* Right Section */}
                <div className="lg:col-span-1 space-y-6">

                    {/* Active Ride Status — Real Data */}
                    <div className="bg-slate-900 rounded-[2rem] p-6 text-white shadow-xl relative overflow-hidden group">
                        <div className="absolute top-0 right-0 w-32 h-32 bg-green-500/10 rounded-full blur-3xl group-hover:scale-150 transition-all"></div>
                        <div className="relative z-10">
                            <div className="flex items-center gap-2 mb-4 text-slate-400">
                                <div className={`w-2 h-2 rounded-full ${isRiding ? "bg-green-500 animate-ping" : "bg-slate-500"}`}></div>
                                <span className="text-[10px] font-bold uppercase tracking-widest">
                                    {isRiding ? "Ride Active" : "Live Status"}
                                </span>
                            </div>

                            {isRiding && activeRide ? (
                                <>
                                    <h4 className="text-sm font-black italic tracking-tight text-green-400">Ride In Progress</h4>
                                    <div className="mt-3 space-y-1">
                                        <p className="text-[11px] text-slate-400">
                                            Bike: <span className="text-white font-bold">{activeRide.bikeId || "—"}</span>
                                        </p>
                                        <p className="text-[11px] text-slate-400">
                                            Station: <span className="text-white font-bold">{activeRide.startStation || "—"}</span>
                                        </p>
                                        <p className="text-[11px] text-slate-400">
                                            Started: <span className="text-white font-bold">
                                                {activeRide.startTime ? new Date(activeRide.startTime).toLocaleTimeString() : "—"}
                                            </span>
                                        </p>
                                    </div>
                                </>
                            ) : (
                                <h4 className="text-sm font-black italic tracking-tight">No Active Ride Currently</h4>
                            )}

                            <button className="w-full mt-6 py-3.5 bg-green-600 hover:bg-green-700 text-slate-900 font-black rounded-2xl text-xs transition-all flex items-center justify-center gap-2 shadow-lg shadow-green-900/20 active:scale-95">
                                <Navigation size={14} /> {isRiding ? "Track My Ride" : "Find Nearest VoltBike"}
                            </button>
                        </div>
                    </div>

                    {/* Wallet — Abhi wallet slice nahi hai */}
                    <div className="bg-white border border-slate-200 rounded-[2rem] p-6 shadow-sm group hover:border-green-200 transition-all">
                        <div className="flex justify-between items-center mb-4">
                            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Volt Wallet</p>
                            <span className="text-green-500 font-black text-[10px] bg-green-50 px-2 py-1 rounded">PRO</span>
                        </div>
                        <h2 className="text-3xl font-black text-slate-900 italic tracking-tighter">
                            Rs. {user?.walletBalance ?? "0"}
                        </h2>
                        <button className="text-green-600 text-[10px] font-black uppercase mt-4 flex items-center gap-1 hover:underline">
                            Quick Top Up <ArrowRight size={12} />
                        </button>
                    </div>

                    <NearbyStations />
                </div>
            </div>
        </div>
    );
};

export default UserDashboard;
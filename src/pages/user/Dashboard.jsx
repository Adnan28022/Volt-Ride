import React from 'react';
import { useSelector } from 'react-redux';
import UserBanner from '../../component/user/dashboard/UserBanner';
import RiderStats from '../../component/user/dashboard/RiderStats';
import RecentRides from '../../component/user/dashboard/RecentRides';
import NearbyStations from '../../component/user/dashboard/NearByStations';
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
                </div>

                {/* Right Section */}
                <div className="lg:col-span-1 space-y-6">

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
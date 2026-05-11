import React from 'react';
import { Camera, ShieldCheck, Award } from "lucide-react";

const ProfileHero = ({ user }) => {
    // Name se initials nikalne ke liye logic (Ahmed Raza -> AR)
    const getInitials = (name) => {
        if (!name) return "R";
        return name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2);
    };

    return (
        <div className="bg-white border border-slate-200 rounded-[2rem] overflow-hidden shadow-sm">
            {/* Banner Background */}
            <div className="h-40 bg-gradient-to-r from-emerald-600 via-emerald-700 to-slate-900 relative">
                <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')]"></div>
                
                <div className="absolute -bottom-14 left-10 flex items-end gap-6">
                    <div className="relative group">
                        {/* Dynamic Avatar */}
                        <div className="w-32 h-32 bg-white p-1.5 rounded-[2.5rem] shadow-2xl transition-transform group-hover:scale-[1.02]">
                            <div className="w-full h-full bg-slate-900 rounded-[2.2rem] flex items-center justify-center text-4xl font-black text-emerald-400 border-2 border-slate-800 uppercase">
                                {getInitials(user?.name)}
                            </div>
                        </div>
                        <button className="absolute bottom-2 right-2 p-2 bg-slate-900 text-white rounded-xl border-4 border-white hover:bg-emerald-500 hover:scale-110 transition-all shadow-lg">
                            <Camera size={16} />
                        </button>
                    </div>

                    <div className="mb-4">
                        <div className="flex items-center gap-2">
                            <h2 className="text-2xl font-black text-slate-900 tracking-tight">
                                {user?.name || "VoltRide Rider"}
                            </h2>
                            {user?.role === 'admin' ? (
                                <ShieldCheck size={22} className="text-emerald-500" title="Verified Admin" />
                            ) : (
                                <ShieldCheck size={22} className="text-blue-500" title="Verified Rider" />
                            )}
                        </div>
                        <p className="text-[11px] text-slate-500 font-black uppercase tracking-[0.2em] flex items-center gap-2">
                            <Award size={14} className="text-orange-500" /> 
                            {user?.role === 'admin' ? 'Elite Admin' : 'Silver Member'} • 
                            Rider ID: #{user?.id?.slice(-4).toUpperCase() || '0000'}
                        </p>
                    </div>
                </div>
            </div>
            {/* Spacer for the overlapping avatar */}
            <div className="h-20 bg-white"></div>
        </div>
    );
};


export default ProfileHero;
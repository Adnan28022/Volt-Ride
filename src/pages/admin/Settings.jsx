import React from 'react';
import AdminPageHeader from '../../component/admin/Banner';
import { Save, Zap, Globe, HelpCircle } from "lucide-react";
import ProfileSettings from '../../component/admin/settings/ProfileSettings';

const Settings = () => {
    return (
        <div className="space-y-8 bg-slate-50/30 min-h-screen pb-20">

            {/* Header Section */}
            <AdminPageHeader
                title="System Configuration"
                subtitle="Master control for platform rules, operational logic, and security protocols."
                breadcrumbs={[{ label: 'Settings', active: true }]}
            />

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 px-1">

                {/* Left Column */}
                <div className="lg:col-span-8 space-y-6">

                    {/* Main Form Content */}
                    <div className="min-h-[500px] animate-in fade-in slide-in-from-bottom-4 duration-700">
                        <ProfileSettings />
                    </div>

                    {/* Save Bar */}
                    <div className="flex items-center justify-between p-6 bg-white border border-slate-200 rounded-[2rem] shadow-sm sticky bottom-6 z-10">
                        <div className="flex items-center gap-3 text-slate-400">
                            <Zap size={16} className="text-emerald-500 animate-pulse" />
                            <span className="text-[10px] font-bold uppercase tracking-widest">
                                Auto-save is disabled
                            </span>
                        </div>

                        <button className="flex items-center gap-3 px-10 py-4 bg-slate-900 text-white rounded-2xl text-[11px] font-black uppercase tracking-widest hover:bg-emerald-600 transition-all shadow-xl active:scale-95">
                            <Save size={16} /> Update System Node
                        </button>
                    </div>
                </div>

                {/* Right Sidebar */}
                <div className="lg:col-span-4 space-y-6">

                    {/* System Pulse Card */}
                    <div className="bg-slate-950 rounded-[2.5rem] p-8 text-white relative overflow-hidden group shadow-2xl">
                        <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/10 rounded-full -mr-16 -mt-16 blur-3xl group-hover:bg-emerald-500/20 transition-all"></div>

                        <h4 className="text-[11px] font-black text-emerald-400 uppercase tracking-[0.2em] mb-6 flex items-center gap-2">
                            <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse"></div>
                            System Pulse
                        </h4>

                        <div className="space-y-5 relative z-10">
                            <div className="flex justify-between items-center border-b border-white/5 pb-3">
                                <span className="text-[10px] text-slate-400 font-bold uppercase tracking-tight">
                                    Kernal Version
                                </span>
                                <span className="text-xs font-black font-mono tracking-tighter">
                                    v2.4.0-STABLE
                                </span>
                            </div>

                            <div className="flex justify-between items-center border-b border-white/5 pb-3">
                                <span className="text-[10px] text-slate-400 font-bold uppercase tracking-tight">
                                    Last Global Backup
                                </span>
                                <span className="text-xs font-black tracking-tighter uppercase italic">
                                    2h Ago
                                </span>
                            </div>

                            <div className="flex justify-between items-center bg-white/5 p-3 rounded-xl border border-white/5">
                                <span className="text-[9px] uppercase font-black text-slate-400 tracking-widest">
                                    Network Sync
                                </span>

                                <div className="flex items-center gap-1.5 px-2 py-0.5 bg-emerald-500/20 text-emerald-400 rounded-md">
                                    <span className="text-[9px] font-black uppercase tracking-tighter">
                                        Live
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Settings;
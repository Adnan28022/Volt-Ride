import React, { useState } from 'react';
import AdminPageHeader from '../../component/admin/Banner';
// In imports ko apne folder structure ke mutabiq check kar lein
import { Save, Settings as SettingsIcon, Shield, Bike, Globe, Zap, HelpCircle } from "lucide-react";
import ProfileSettings from '../../component/admin/settings/ProfileSettings';
import SystemConfig from '../../component/admin/settings/SystemConfig';
import FleetRules from '../../component/admin/settings/FleetRules';
import SecuritySettings from '../../component/admin/settings/SecuritySettings';

const Settings = () => {
    const [activeTab, setActiveTab] = useState('general');

    const tabs = [
        { id: 'general', label: 'General', icon: <SettingsIcon size={14} /> },
        { id: 'pricing', label: 'Pricing & Rules', icon: <Globe size={14} /> },
        { id: 'fleet', label: 'Fleet Config', icon: <Bike size={14} /> },
        { id: 'security', label: 'Security', icon: <Shield size={14} /> },
    ];

    return (
        <div className="space-y-8 bg-slate-50/30 min-h-screen pb-20">
            {/* 1. Header Section */}
            <AdminPageHeader
                title="System Configuration"
                subtitle="Master control for platform rules, operational logic, and security protocols."
                breadcrumbs={[{ label: 'Settings', active: true }]}
            />

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 px-1">
                
                {/* Left Column: Navigation & Content (8 Columns) */}
                <div className="lg:col-span-8 space-y-6">
                    
                    {/* Tabs Navigation - Premium Style */}
                    <div className="flex p-1.5 bg-white border border-slate-200 w-fit rounded-[1.5rem] shadow-sm">
                        {tabs.map((tab) => (
                            <button
                                key={tab.id}
                                onClick={() => setActiveTab(tab.id)}
                                className={`flex items-center gap-2 px-6 py-3 rounded-[1.2rem] text-[10px] font-black uppercase tracking-[0.15em] transition-all duration-300 ${
                                    activeTab === tab.id
                                    ? 'bg-slate-900 text-emerald-400 shadow-lg'
                                    : 'text-slate-400 hover:text-slate-600 hover:bg-slate-50'
                                }`}
                            >
                                {tab.icon} {tab.label}
                            </button>
                        ))}
                    </div>

                    {/* Main Form Content Area */}
                    <div className="min-h-[500px] animate-in fade-in slide-in-from-bottom-4 duration-700">
                        {activeTab === 'general' && <ProfileSettings />}
                        {activeTab === 'pricing' && <SystemConfig />}
                        {activeTab === 'fleet' && <FleetRules />}
                        {activeTab === 'security' && <SecuritySettings />}
                    </div>

                    {/* Persistent Save Bar */}
                    <div className="flex items-center justify-between p-6 bg-white border border-slate-200 rounded-[2rem] shadow-sm sticky bottom-6 z-10">
                        <div className="flex items-center gap-3 text-slate-400">
                            <Zap size={16} className="text-emerald-500 animate-pulse" />
                            <span className="text-[10px] font-bold uppercase tracking-widest">Auto-save is disabled</span>
                        </div>
                        <button className="flex items-center gap-3 px-10 py-4 bg-slate-900 text-white rounded-2xl text-[11px] font-black uppercase tracking-widest hover:bg-emerald-600 transition-all shadow-xl active:scale-95">
                            <Save size={16} /> Update System Node
                        </button>
                    </div>
                </div>

                {/* Right Column: Sidebar (4 Columns) */}
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
                                <span className="text-[10px] text-slate-400 font-bold uppercase tracking-tight">Kernal Version</span>
                                <span className="text-xs font-black font-mono tracking-tighter">v2.4.0-STABLE</span>
                            </div>
                            <div className="flex justify-between items-center border-b border-white/5 pb-3">
                                <span className="text-[10px] text-slate-400 font-bold uppercase tracking-tight">Last Global Backup</span>
                                <span className="text-xs font-black tracking-tighter uppercase italic">2h Ago</span>
                            </div>
                            <div className="flex justify-between items-center bg-white/5 p-3 rounded-xl border border-white/5">
                                <span className="text-[9px] uppercase font-black text-slate-400 tracking-widest">Network Sync</span>
                                <div className="flex items-center gap-1.5 px-2 py-0.5 bg-emerald-500/20 text-emerald-400 rounded-md">
                                    <span className="text-[9px] font-black uppercase tracking-tighter">Live</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Operational Alert */}
                    <div className="bg-orange-50/50 border border-orange-100 rounded-[2rem] p-7 shadow-sm">
                        <div className="flex items-center gap-3 mb-4">
                            <div className="w-8 h-8 bg-orange-100 text-orange-600 rounded-xl flex items-center justify-center">
                                <span className="text-sm">⚠️</span>
                            </div>
                            <h4 className="text-[11px] font-black text-orange-900 uppercase tracking-widest">Operational Notice</h4>
                        </div>
                        <p className="text-[11px] text-orange-800 leading-[1.6] font-semibold italic">
                            Modified pricing and battery thresholds apply instantly to new sessions. Active riders remain under previous protocol versions.
                        </p>
                    </div>

                    {/* Support Center */}
                    <div className="p-8 bg-white border border-slate-200 rounded-[2.5rem] shadow-sm group hover:border-emerald-200 transition-colors">
                        <div className="w-12 h-12 bg-slate-50 text-slate-400 rounded-2xl flex items-center justify-center mb-6 group-hover:text-emerald-500 group-hover:bg-emerald-50 transition-all">
                            <HelpCircle size={24} />
                        </div>
                        <h4 className="text-[12px] font-black text-slate-900 uppercase tracking-widest mb-3">Developer Documentation</h4>
                        <p className="text-[11px] text-slate-500 mb-6 leading-relaxed">Need advanced API or webhook configuration? Explore our master guides.</p>
                        <button className="text-[10px] font-black text-emerald-600 hover:text-emerald-700 uppercase tracking-[0.2em] flex items-center gap-2">
                            Open API Docs <Globe size={12} />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Settings;
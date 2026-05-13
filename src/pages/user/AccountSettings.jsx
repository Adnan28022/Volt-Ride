import { useState } from 'react';
import { useSelector } from 'react-redux';
import Banner from '../../component/admin/Banner';
import UserProfileSettings from '../../component/user/accountSettings/UserProfileSettings';
import RidePreferences from '../../component/user/accountSettings/RidePreferences';
import { Save, User, Shield, Bell, Trash2 } from "lucide-react";
import moment from "moment";

const AccountSettings = () => {
    const [activeTab, setActiveTab] = useState('profile');
    const { user } = useSelector((state) => state.auth);

    const tabs = [
        { id: 'profile', label: 'Profile', icon: <User size={16} /> },
        { id: 'prefs', label: 'Preferences', icon: <Bell size={16} /> },
    ];

    return (
        <div className="p-6 space-y-6 bg-slate-50/30 min-h-screen">
            <Banner
                title="Account Settings"
                subtitle="Manage your profile, ride preferences and account security."
                breadcrumbs={[{ label: 'Settings', active: true }]}
            />

            {/* Tabs */}
            <div className="flex flex-col md:flex-row gap-2 p-1 bg-white border border-slate-200 w-full md:w-fit rounded-2xl shadow-sm">
                {tabs.map((tab) => (
                    <button
                        key={tab.id}
                        onClick={() => setActiveTab(tab.id)}
                        className={`flex items-center justify-center gap-2 px-6 py-2.5 rounded-xl text-xs font-black uppercase tracking-widest transition-all ${activeTab === tab.id ? 'bg-slate-900 text-white shadow-md' : 'text-slate-400 hover:text-slate-600'
                            }`}
                    >
                        {tab.icon} {tab.label}
                    </button>
                ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2 space-y-6">
                    {activeTab === 'profile' && <UserProfileSettings />}
                    {activeTab === 'prefs' && <RidePreferences />}

                    {/* Danger Zone */}
                    <div className="bg-red-50 border border-red-100 rounded-3xl p-6">
                        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
                            <div>
                                <h4 className="text-sm font-black text-red-900 uppercase">Delete Account</h4>
                                <p className="text-[11px] text-red-700 font-medium">Once deleted, your wallet balance and ride history will be lost forever.</p>
                            </div>
                            <button className="px-6 py-2 bg-red-600 text-white rounded-xl text-xs font-bold hover:bg-red-700 flex items-center gap-2">
                                <Trash2 size={14} /> Delete Forever
                            </button>
                        </div>
                    </div>

                    <div className="flex justify-end pt-4 border-t border-slate-200">
                        <button className="flex items-center gap-2 px-10 py-4 bg-green-600 text-white rounded-2xl text-sm font-black shadow-xl shadow-green-100 hover:bg-green-700 transition-all active:scale-95">
                            <Save size={20} /> Save All Changes
                        </button>
                    </div>
                </div>

                {/* Sidebar — Real user data */}
                <div className="space-y-6">
                    <div className="bg-slate-900 rounded-[2rem] p-8 text-white shadow-xl relative overflow-hidden">
                        <div className="relative z-10 text-center">
                            {/* ✅ Real avatar or initials */}
                            <div className="w-20 h-20 bg-green-500 rounded-3xl mx-auto flex items-center justify-center text-slate-900 text-2xl font-black mb-4 overflow-hidden">
                                {user?.avatar ? (
                                    <img src={user.avatar} alt="avatar" className="w-full h-full object-cover" />
                                ) : (
                                    user?.name?.charAt(0).toUpperCase() || "U"
                                )}
                            </div>
                            {/* ✅ Real name */}
                            <h4 className="text-lg font-black italic tracking-tight">{user?.name || "—"}</h4>
                            {/* ✅ Real role */}
                            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-1">
                                {user?.role || "Member"}
                            </p>

                            <div className="mt-8 pt-8 border-t border-white/10 space-y-3">
                                <div className="flex justify-between text-[10px] font-bold">
                                    <span className="text-slate-500 uppercase">Membership</span>
                                    <span className="text-green-400 uppercase italic">Active</span>
                                </div>
                                <div className="flex justify-between text-[10px] font-bold">
                                    <span className="text-slate-500 uppercase">Member Since</span>
                                    {/* ✅ Real createdAt */}
                                    <span>{user?.createdAt ? moment(user.createdAt).format("MMM YYYY") : "—"}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AccountSettings;
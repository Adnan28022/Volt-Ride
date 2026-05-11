import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import moment from "moment";
import AdminPageHeader from "../../component/admin/Banner";
import ProfileHero from "../../component/admin/adminProfile/ProfileHero";
import ProfileDetails from "../../component/admin/adminProfile/ProfileDetails";
import {
  LogOut,
  ShieldAlert,
  CheckCircle,
  KeyRound,
  Lock,
  ChevronRight,
  ShieldCheck,
  Activity,
} from "lucide-react";
import { logoutUser } from "../../redux/reducer/auth/AuthSlice";
import toast from "react-hot-toast";

const AdminProfile = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);

  const handleLogout = () => {
    dispatch(logoutUser());
    toast.success("Admin session terminated");
    navigate("/login");
  };

  const handleSecurityUpdate = () => {
    toast.loading("Accessing secure layers...");
    setTimeout(() => {
      navigate("/forget-password");
      toast.dismiss();
    }, 800);
  };

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 border-4 border-emerald-500/20 border-t-emerald-500 rounded-full animate-spin"></div>
          <p className="font-black text-slate-400 uppercase tracking-[0.3em] text-xs">
            Authenticating...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8 bg-slate-50/30 min-h-screen pb-16">
      {/* 1. Header Section */}
      <AdminPageHeader
        title="Admin Control Center"
        subtitle="Full system access and personal credentials management."
        breadcrumbs={[{ label: "Profile", active: true }]}
      />

      {/* 2. Hero Section (Includes Z-index fix for Avatar) */}
      <ProfileHero user={user} />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 px-1">
        {/* 3. Main Content: Profile Details (8 Columns) */}
        <div className="lg:col-span-8 space-y-6">
          <div className="relative group">
            <div className="absolute -inset-1 bg-gradient-to-r from-emerald-500/10 to-slate-200/10 rounded-[2.5rem] blur opacity-25 group-hover:opacity-40 transition duration-1000"></div>
            <div className="relative">
              <ProfileDetails user={user} />
            </div>
          </div>
        </div>

        {/* 4. Sidebar: Admin Security (4 Columns) */}
        <div className="lg:col-span-4 space-y-6">
          {/* Admin Integrity Status */}
          <div className="bg-white border border-slate-200 rounded-[2rem] p-7 shadow-sm">
            <h4 className="text-[10px] font-black text-slate-900 uppercase tracking-[0.2em] mb-5 flex items-center gap-2">
              <Activity size={14} className="text-emerald-500" /> System
              Integrity
            </h4>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 bg-emerald-50/50 rounded-2xl border border-emerald-100">
                <div className="flex items-center gap-3">
                  <CheckCircle className="text-emerald-600" size={18} />
                  <span className="text-[11px] font-bold text-emerald-800 uppercase tracking-tight">
                    Root Access Verified
                  </span>
                </div>
                <ShieldCheck size={14} className="text-emerald-500" />
              </div>

              <div className="p-5 bg-slate-950 rounded-2xl text-white relative overflow-hidden group">
                <div className="relative z-10">
                  <p className="text-[9px] uppercase font-black text-slate-500 mb-1 tracking-widest">
                    Current Privilege
                  </p>
                  <p className="text-sm font-black text-emerald-400 uppercase italic tracking-tighter leading-none mb-4">
                    {user?.role === "admin"
                      ? "Super Administrator"
                      : "System Node"}
                  </p>
                  <div className="pt-4 border-t border-white/10 text-[9px] text-slate-400 flex justify-between font-bold uppercase tracking-tighter">
                    <span>Admin Since</span>
                    <span className="text-white italic">
                      {user?.createdAt
                        ? moment(user.createdAt).format("MMM YYYY")
                        : "2024"}
                    </span>
                  </div>
                </div>
                <ShieldAlert
                  className="absolute -right-4 -bottom-4 text-white/5 group-hover:text-emerald-500/10 transition-all duration-700"
                  size={100}
                />
              </div>
            </div>
          </div>

          {/* Admin Command Zone (Security Actions) */}
          <div className="bg-white border border-slate-200 rounded-[2.5rem] p-8 shadow-sm relative overflow-hidden group">
            <h4 className="text-[11px] font-black text-slate-900 uppercase tracking-[0.2em] mb-8 flex items-center gap-2">
              <Lock size={14} className="text-red-500" /> Security Command
            </h4>

            <div className="space-y-4">
              {/* Change Password / Reset Access Key */}
              <button
                onClick={handleSecurityUpdate}
                className="w-full flex items-center justify-between p-4 bg-slate-50 rounded-2xl border border-slate-100 hover:border-emerald-200 hover:bg-emerald-50 transition-all duration-300 group/link"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center border border-slate-200 text-slate-400 group-hover/link:text-emerald-600 group-hover/link:border-emerald-100 shadow-sm transition-all">
                    <KeyRound size={18} />
                  </div>
                  <div className="text-left">
                    <p className="text-[11px] font-black text-slate-800 uppercase tracking-tight">
                      Change Password
                    </p>
                    <p className="text-[9px] text-slate-400 font-bold uppercase tracking-tighter">
                      Change Access Credentials
                    </p>
                  </div>
                </div>
                <ChevronRight
                  size={14}
                  className="text-slate-300 group-hover/link:translate-x-1 group-hover/link:text-emerald-500 transition-all"
                />
              </button>

              <div className="py-2 flex items-center gap-4">
                <div className="h-[1px] flex-1 bg-slate-100"></div>
                <span className="text-[8px] font-black text-slate-300 uppercase tracking-widest">
                  Session Control
                </span>
                <div className="h-[1px] flex-1 bg-slate-100"></div>
              </div>

              {/* Logout Button */}
              <button
                onClick={handleLogout}
                className="w-full group/btn flex items-center justify-center gap-3 px-6 py-4 bg-red-50 text-red-600 rounded-2xl text-[11px] font-black uppercase tracking-[0.15em] border border-red-100 hover:bg-red-600 hover:text-white transition-all duration-300 shadow-sm"
              >
                <LogOut
                  size={16}
                  className="group-hover/btn:-translate-x-1 transition-transform duration-300"
                />
                Terminate Session
              </button>
            </div>

            <div className="mt-8 pt-6 border-t border-slate-50 flex items-center justify-between">
              <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest leading-none">
                Security Protocol
              </span>
              <span className="text-[9px] font-black text-emerald-500 italic bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-100 uppercase">
                AES-256 Active
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminProfile;

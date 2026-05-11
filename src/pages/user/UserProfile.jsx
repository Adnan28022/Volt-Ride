import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import moment from "moment";
import Banner from "../../component/admin/Banner";
import {
  LogOut,
  ShieldAlert,
  CheckCircle,
  KeyRound,
  ChevronRight,
  ShieldCheck,
} from "lucide-react";
import { logoutUser } from "../../redux/reducer/auth/AuthSlice";
import toast from "react-hot-toast";
import UserHero from "../../component/user/user/UserHero";
import RiderBio from "../../component/user/user/RiderBio";

const UserProfile = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);

  const handleLogout = () => {
    dispatch(logoutUser());
    toast.success("Session ended successfully");
    navigate("/login");
  };

  const handleChangePassword = () => {
    // Aap yahan navigation de sakte hain ya modal open kar sakte hain
    toast.success("Redirecting to security settings...");
    navigate("/forget-password");
  };

  return (
    <div className="p-6 space-y-8 bg-slate-50/30 min-h-screen pb-12">
      {/* 1. Page Header Section */}
      <Banner
        title="Account Overview"
        subtitle={`Logged in as ${user?.name || "Member"}. Review your security and profile details.`}
        breadcrumbs={[{ label: "Profile", active: true }]}
      />

      {/* 2. Hero Identity Card */}
      <UserHero user={user} />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* 3. Main Content: Personal Information (8 Columns) */}
        <div className="lg:col-span-8 space-y-6">
          <div className="relative group">
            <div className="absolute -inset-1 bg-gradient-to-r from-emerald-500/20 to-slate-200/20 rounded-[2.5rem] blur opacity-25 group-hover:opacity-40 transition duration-1000"></div>
            <div className="relative">
              <RiderBio user={user} />
            </div>
          </div>
        </div>

        {/* 4. Sidebar: Security & Actions (4 Columns) */}
        <div className="lg:col-span-4 space-y-6">
          {/* Account Status Card */}
          <div className="bg-white border border-slate-200 rounded-[2rem] p-7 shadow-sm">
            <h4 className="text-[10px] font-black text-slate-900 uppercase tracking-[0.2em] mb-5">
              Account Status
            </h4>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 bg-emerald-50/50 rounded-2xl border border-emerald-100">
                <div className="flex items-center gap-3">
                  <CheckCircle className="text-emerald-600" size={18} />
                  <span className="text-[11px] font-bold text-emerald-800 uppercase tracking-tight">
                    Verified Identity
                  </span>
                </div>
                <ShieldCheck size={14} className="text-emerald-500" />
              </div>

              <div className="p-5 bg-slate-950 rounded-2xl text-white relative overflow-hidden group">
                <div className="relative z-10">
                  <p className="text-[9px] uppercase font-black text-slate-500 mb-1 tracking-widest">
                    Access Privilege
                  </p>
                  <p className="text-sm font-black text-emerald-400 uppercase italic tracking-tighter">
                    {user?.role === "admin"
                      ? "Super Administrator"
                      : "Verified Rider"}
                  </p>
                  <div className="mt-5 pt-4 border-t border-white/10 text-[9px] text-slate-400 flex justify-between font-bold uppercase tracking-tighter">
                    <span>Member Since</span>
                    <span className="text-white italic">
                      {user?.createdAt
                        ? moment(user.createdAt).format("MMM YYYY")
                        : "N/A"}
                    </span>
                  </div>
                </div>
                <ShieldAlert
                  className="absolute -right-4 -bottom-4 text-white/5 group-hover:text-emerald-500/5 transition-colors duration-500"
                  size={100}
                />
              </div>
            </div>
          </div>

          {/* Security & Password Zone */}
          <div className="bg-white border border-slate-200 rounded-[2rem] p-7 shadow-sm relative overflow-hidden group">
            <h4 className="text-[10px] font-black text-slate-900 uppercase tracking-[0.2em] mb-6 flex items-center gap-2">
              <KeyRound size={14} className="text-emerald-500" /> Security Zone
            </h4>

            <div className="space-y-3">
              {/* Change/Forget Password Option */}
              <button
                onClick={handleChangePassword}
                className="w-full flex items-center justify-between p-4 bg-slate-50 rounded-2xl border border-slate-100 hover:border-emerald-200 hover:bg-emerald-50/30 transition-all group/item"
              >
                <div className="flex items-center gap-3 text-left">
                  <div className="w-8 h-8 bg-white rounded-xl flex items-center justify-center border border-slate-200 text-slate-400 group-hover/item:text-emerald-600 group-hover/item:border-emerald-100 shadow-sm transition-all">
                    <KeyRound size={16} />
                  </div>
                  <div>
                    <p className="text-[11px] font-black text-slate-800 uppercase tracking-tight">
                      Change Password
                    </p>
                    <p className="text-[9px] text-slate-400 font-bold uppercase">
                      {" "}
                      Change Access Credentials
                    </p>
                  </div>
                </div>
                <ChevronRight
                  size={14}
                  className="text-slate-300 group-hover/item:translate-x-1 group-hover/item:text-emerald-500 transition-all"
                />
              </button>

              <div className="h-[1px] bg-slate-100 my-2"></div>

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

            <div className="mt-8 pt-5 border-t border-slate-50 flex items-center justify-between">
              <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest">
                Protection Level
              </span>
              <span className="text-[9px] font-black text-emerald-500 italic bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-100 uppercase tracking-tighter">
                Elite
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;

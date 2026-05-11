import { useState } from "react";
import {
  Lock, ShieldCheck, Smartphone, Monitor,
  LogOut, AlertTriangle, Key, CheckCircle2,
} from "lucide-react";

const SecuritySettings = () => {
  const [is2FA, setIs2FA] = useState(false);

  // Sessions UI only - real session management needs backend
  const activeSessions = [
    { device: "Current Browser", location: "Your Location", status: "Active Now", ip: "—" },
  ];

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      {/* 1. Change Password */}
      <div className="bg-white border border-slate-200 rounded-[2rem] p-8 shadow-sm relative overflow-hidden">
        <div className="flex items-center gap-4 mb-8">
          <div className="w-12 h-12 bg-slate-900 rounded-2xl flex items-center justify-center text-emerald-400 shadow-lg shadow-slate-200">
            <Key size={22} />
          </div>
          <div>
            <h3 className="text-sm font-black text-slate-900 uppercase tracking-tighter">Update Credentials</h3>
            <p className="text-[10px] text-slate-400 font-bold uppercase tracking-tight">Maintain system integrity with regular password rotations</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            { label: "Current Password", placeholder: "••••••••" },
            { label: "New Password", placeholder: "••••••••" },
            { label: "Confirm Password", placeholder: "••••••••" },
          ].map((field, idx) => (
            <div key={idx} className="space-y-2">
              <label className="text-[9px] font-black uppercase text-slate-400 tracking-[0.2em] ml-1">{field.label}</label>
              <div className="relative group">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-emerald-500 transition-colors" size={16} />
                <input type="password" placeholder={field.placeholder} className="w-full pl-11 pr-4 py-3 bg-slate-50 border border-slate-100 rounded-2xl text-sm focus:bg-white focus:border-emerald-500/50 outline-none transition-all placeholder:text-slate-300 font-medium" />
              </div>
            </div>
          ))}
        </div>

        <div className="mt-8 flex justify-end">
          <button className="px-8 py-3 bg-slate-900 text-white rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-emerald-600 transition-all shadow-md active:scale-95">
            Update Security Keys
          </button>
        </div>
      </div>

      {/* 2. 2FA */}
      <div className="bg-white border border-slate-200 rounded-[2rem] p-7 shadow-sm border-l-4 border-l-emerald-500">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-5">
            <div className="w-14 h-14 bg-emerald-50 text-emerald-600 rounded-[1.2rem] border border-emerald-100 flex items-center justify-center shadow-inner">
              <ShieldCheck size={28} />
            </div>
            <div>
              <h3 className="text-sm font-black text-slate-900 uppercase tracking-tight">Dual-Layer Authentication</h3>
              <p className="text-[11px] text-slate-500 font-medium leading-relaxed max-w-md">
                Secure your node with an extra verification layer via hardware or mobile authenticator.
              </p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-[9px] font-black text-emerald-600 bg-emerald-50 px-3 py-1 rounded-full uppercase tracking-widest border border-emerald-100">
              Highly Recommended
            </span>
            <button
              onClick={() => setIs2FA(!is2FA)}
              className={`w-14 h-7 rounded-full relative transition-all duration-300 ${is2FA ? "bg-emerald-500" : "bg-slate-200"}`}
            >
              <div className={`absolute top-1 w-5 h-5 bg-white rounded-full shadow-md transition-all duration-300 ${is2FA ? "left-8" : "left-1"}`}></div>
            </button>
          </div>
        </div>
      </div>

      {/* 3. Active Sessions */}
      <div className="bg-white border border-slate-200 rounded-[2rem] p-8 shadow-sm">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h3 className="text-sm font-black text-slate-900 uppercase tracking-tight">Active Access Points</h3>
            <p className="text-[10px] text-slate-400 font-bold uppercase tracking-tight mt-1">Currently authenticated devices in your network</p>
          </div>
          <button className="px-4 py-2 bg-red-50 text-[9px] font-black text-red-500 hover:bg-red-500 hover:text-white rounded-lg uppercase tracking-widest flex items-center gap-2 transition-all border border-red-100">
            <LogOut size={12} /> Terminate Other Sessions
          </button>
        </div>

        <div className="grid grid-cols-1 gap-4">
          {activeSessions.map((session, index) => (
            <div key={index} className="flex items-center justify-between p-5 bg-slate-50/50 border border-slate-100 rounded-2xl group hover:bg-white hover:border-emerald-200 hover:shadow-md transition-all duration-300">
              <div className="flex items-center gap-5">
                <div className="w-12 h-12 bg-white rounded-xl text-slate-400 group-hover:text-emerald-500 group-hover:border-emerald-100 border border-slate-100 flex items-center justify-center transition-all shadow-sm">
                  {session.device.includes("iPhone") ? <Smartphone size={22} /> : <Monitor size={22} />}
                </div>
                <div>
                  <p className="text-xs font-black text-slate-800 uppercase tracking-tight">{session.device}</p>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="text-[10px] text-slate-400 font-bold uppercase tracking-tighter">{session.location}</span>
                    <span className="w-1 h-1 bg-slate-300 rounded-full"></span>
                    <span className="text-[10px] font-mono text-emerald-600 bg-emerald-50 px-1.5 py-0.5 rounded leading-none">{session.ip}</span>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-3">
                {session.status === "Active Now" && <CheckCircle2 size={14} className="text-emerald-500 animate-pulse" />}
                <span className={`text-[9px] font-black px-3 py-1.5 rounded-full uppercase tracking-widest ${session.status === "Active Now" ? "bg-emerald-500 text-white" : "bg-slate-200 text-slate-500"
                  }`}>
                  {session.status}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 4. Security Alert */}
      <div className="p-5 bg-slate-900 rounded-[1.5rem] flex gap-4 items-center border border-slate-800 shadow-xl">
        <div className="w-10 h-10 bg-orange-500/10 rounded-xl flex items-center justify-center text-orange-500 shrink-0 border border-orange-500/20">
          <AlertTriangle size={20} />
        </div>
        <p className="text-[11px] text-slate-400 font-bold uppercase tracking-tight leading-relaxed">
          Security Protocol Notice: <span className="text-white italic font-black">Password age exceeds 120 days.</span>{" "}
          Consider a reset to maintain <span className="text-emerald-400">Optimal Protection.</span>
        </p>
      </div>
    </div>
  );
};

export default SecuritySettings;
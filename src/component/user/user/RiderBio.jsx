import React from "react";
import { Mail, Phone, MapPin, Calendar, Hash } from "lucide-react";
import moment from "moment";

const RiderBio = ({ user }) => {
  // Formatting Joining Date
  const joinedDate = user?.createdAt
    ? moment(user.createdAt).format("MMM DD, YYYY")
    : "N/A";

  return (
    <div className="bg-white border border-slate-200 rounded-[2rem] p-8 shadow-sm">
      <div className="flex items-center justify-between mb-8">
        <h3 className="text-sm font-black text-slate-900 uppercase tracking-tight">
          Personal Information
        </h3>
        <span className="text-[10px] font-black bg-slate-900 text-white px-3 py-1 rounded-full uppercase tracking-widest">
          Status: Active
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Email Section */}
        <div className="flex items-center gap-4 group">
          <div className="p-3 bg-slate-50 group-hover:bg-emerald-50 rounded-2xl text-slate-400 group-hover:text-emerald-600 transition-colors">
            <Mail size={20} />
          </div>
          <div>
            <p className="text-[10px] font-black text-slate-400 uppercase tracking-tighter">
              Email Address
            </p>
            <p className="text-sm font-bold text-slate-800 break-all">
              {user?.email || "Not Provided"}
            </p>
          </div>
        </div>

        {/* Phone Section */}
        <div className="flex items-center gap-4 group">
          <div className="p-3 bg-slate-50 group-hover:bg-emerald-50 rounded-2xl text-slate-400 group-hover:text-emerald-600 transition-colors">
            <Phone size={20} />
          </div>
          <div>
            <p className="text-[10px] font-black text-slate-400 uppercase tracking-tighter">
              Phone Number
            </p>
            <p className="text-sm font-bold text-slate-800">
              {user?.phone || "+92 000 0000000"}
            </p>
          </div>
        </div>

        {/* Joining Date Section */}
        <div className="flex items-center gap-4 group">
          <div className="p-3 bg-slate-50 group-hover:bg-emerald-50 rounded-2xl text-slate-400 group-hover:text-emerald-600 transition-colors">
            <Calendar size={20} />
          </div>
          <div>
            <p className="text-[10px] font-black text-slate-400 uppercase tracking-tighter">
              Joining Date
            </p>
            <p className="text-sm font-bold text-slate-800">{joinedDate}</p>
          </div>
        </div>

        {/* Account Type / ID (Extra Info for Professional Look) */}
        <div className="flex items-center gap-4 group md:col-span-2 pt-4 border-t border-slate-50">
          <div className="p-3 bg-slate-50 group-hover:bg-blue-50 rounded-2xl text-slate-400 group-hover:text-blue-600 transition-colors">
            <Hash size={20} />
          </div>
          <div>
            <p className="text-[10px] font-black text-slate-400 uppercase tracking-tighter">
              System Reference
            </p>
            <p className="text-[12px] font-bold text-slate-500 uppercase">
              UID-{user?.id || "VOLT-0000"} •{" "}
              <span className="text-blue-600">{user?.role} Account</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RiderBio;

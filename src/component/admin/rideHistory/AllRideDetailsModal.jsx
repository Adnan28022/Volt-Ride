import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  X,
  Calendar,
  MapPin,
  Bike,
  User,
  Clock,
  Mail,
  Zap,
  CreditCard,
  ChevronRight,
  ShieldCheck,
} from "lucide-react";
import moment from "moment";
import { fetchBikes } from "../../../redux/reducer/bike/bikeSlice";

const AllRideDetailsModal = ({ ride, onClose }) => {
  const dispatch = useDispatch();
  const { bikes } = useSelector((state) => state.bikes);
  const { user: currentUser } = useSelector((state) => state.auth);

  useEffect(() => {
    dispatch(fetchBikes());
  }, [dispatch]);

  // Bike details find karne ki logic
  const bikeDetails = bikes?.find(
    (b) => b._id === (ride.bikeId?._id || ride.bikeId),
  );

  const riderName = ride.userId?.name || currentUser?.name || "Unknown Rider";
  const riderEmail = ride.userId?.email || currentUser?.email || "No Email";

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-900/80 backdrop-blur-md animate-in fade-in duration-300">
      <div className="bg-white w-full max-w-4xl rounded-[3rem] overflow-hidden shadow-2xl animate-in zoom-in-95 duration-300 flex flex-col md:flex-row min-h-[550px]">
        {/* LEFT COLUMN: Rider & Route */}
        <div className="w-full md:w-[45%] bg-slate-900 p-10 text-white flex flex-col justify-between relative overflow-hidden">
          <div className="absolute top-0 left-0 w-64 h-64 bg-emerald-500/10 blur-[80px] rounded-full -translate-x-1/2 -translate-y-1/2"></div>

          <div className="relative z-10">
            <div className="flex justify-between items-start mb-12">
              <div>
                <p className="text-[10px] font-black uppercase text-emerald-400 tracking-[0.3em] mb-2">
                  Journey Segment
                </p>
                <h2 className="text-3xl font-black italic tracking-tight uppercase">
                  #{ride._id.slice(-6)}
                </h2>
              </div>
              <div className="bg-white/10 px-3 py-1 rounded-full backdrop-blur-md">
                <p className="text-[10px] font-bold text-emerald-400 uppercase tracking-widest">
                  {ride.status}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-4 mb-12">
              <div className="h-14 w-14 rounded-2xl bg-gradient-to-br from-emerald-400 to-teal-600 flex items-center justify-center shadow-lg shadow-emerald-500/20">
                <User size={28} className="text-slate-900" />
              </div>
              <div>
                <p className="text-lg font-bold leading-tight">{riderName}</p>
                <p className="text-xs text-slate-400 flex items-center gap-1 mt-1">
                  <Mail size={12} /> {riderEmail}
                </p>
              </div>
            </div>

            {/* Timeline */}
            <div className="space-y-10 relative before:content-[''] before:absolute before:left-[11px] before:top-2 before:bottom-2 before:w-[2px] before:bg-gradient-to-b before:from-emerald-500 before:to-slate-700">
              <div className="relative pl-10">
                <div className="absolute left-0 top-1 w-6 h-6 rounded-full bg-slate-900 border-2 border-emerald-500 flex items-center justify-center z-10">
                  <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></div>
                </div>
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">
                  Origin
                </p>
                <p className="font-bold text-slate-100">
                  {ride.startStationId?.name || "Starting Point"}
                </p>
                <p className="text-[11px] text-slate-500">
                  {moment(ride.startTime).format("ddd, MMM DD • hh:mm A")}
                </p>
              </div>

              <div className="relative pl-10">
                <div className="absolute left-0 top-1 w-6 h-6 rounded-full bg-slate-900 border-2 border-slate-700 flex items-center justify-center z-10 text-rose-500">
                  <MapPin size={12} />
                </div>
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">
                  Destination
                </p>
                <p className="font-bold text-slate-100">
                  {ride.endStationId?.name ||
                    (ride.status === "active"
                      ? "Ongoing Trip..."
                      : "Trip Ended")}
                </p>
                {ride.endTime && (
                  <p className="text-[11px] text-slate-500">
                    {moment(ride.endTime).format("ddd, MMM DD • hh:mm A")}
                  </p>
                )}
              </div>
            </div>
          </div>

          <div className="mt-8 pt-8 border-t border-white/5 flex items-center gap-2 text-slate-500">
            <ShieldCheck size={16} />
            <span className="text-[10px] font-medium tracking-wide italic">
              Verified Ride Log by Volt-26 Systems
            </span>
          </div>
        </div>

        {/* RIGHT COLUMN: Bike & Payment */}
        <div className="w-full md:w-[55%] p-10 flex flex-col relative">
          <button
            onClick={onClose}
            className="absolute top-6 right-6 p-3 bg-slate-100 hover:bg-slate-200 text-slate-500 rounded-full transition-all active:scale-90"
          >
            <X size={20} />
          </button>

          <div className="flex-1 space-y-8 mt-4">
            <section>
              <h3 className="text-xs font-black uppercase text-slate-400 tracking-widest mb-4 flex items-center gap-2">
                <Bike size={16} className="text-emerald-500" /> Vehicle
                Specification
              </h3>
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-slate-50 p-5 rounded-[2rem] border border-slate-100">
                  <p className="text-[10px] font-black text-slate-400 uppercase">
                    Model
                  </p>
                  <p className="text-base font-black text-slate-900">
                    {bikeDetails?.model_name || "Volt-26 Standard"}
                  </p>
                </div>
                <div className="bg-slate-50 p-5 rounded-[2rem] border border-slate-100">
                  <p className="text-[10px] font-black text-slate-400 uppercase">
                    Registration
                  </p>
                  <p className="text-base font-black text-slate-900">
                    {ride.bikeId?.registration_number ||
                      bikeDetails?.registration_number ||
                      "PZ-XXXX"}
                  </p>
                </div>
              </div>
              <div className="mt-4 flex gap-4">
                <div className="flex-1 bg-emerald-50/50 p-4 rounded-2xl flex items-center gap-3">
                  <div className="p-2 bg-emerald-500 rounded-lg text-white">
                    <Zap size={16} fill="currentColor" />
                  </div>
                  <div>
                    <p className="text-[10px] font-bold text-emerald-600 uppercase leading-none">
                      Battery
                    </p>
                    <p className="text-sm font-black text-slate-800">
                      {bikeDetails?.battery_level || 100}%
                    </p>
                  </div>
                </div>
                <div className="flex-1 bg-blue-50/50 p-4 rounded-2xl flex items-center gap-3">
                  <div className="p-2 bg-blue-500 rounded-lg text-white">
                    <CreditCard size={16} />
                  </div>
                  <div>
                    <p className="text-[10px] font-bold text-blue-600 uppercase leading-none">
                      Rate/hr
                    </p>
                    <p className="text-sm font-black text-slate-800">
                      Rs. {bikeDetails?.price_per_hour || 100}
                    </p>
                  </div>
                </div>
              </div>
            </section>

            <section>
              <h3 className="text-xs font-black uppercase text-slate-400 tracking-widest mb-4 flex items-center gap-2">
                <Clock size={16} className="text-emerald-500" /> Financial
                Summary
              </h3>
              <div className="bg-slate-900 rounded-[2.5rem] p-8 text-white relative overflow-hidden">
                <div className="absolute bottom-0 right-0 opacity-10 translate-x-1/4 translate-y-1/4">
                  <CreditCard size={120} />
                </div>
                <div className="flex justify-between items-center mb-6 relative z-10">
                  <span className="text-sm text-slate-400">Ride Duration</span>
                  <span className="text-sm font-bold">
                    {ride.endTime
                      ? `${moment
                          .duration(
                            moment(ride.endTime).diff(moment(ride.startTime)),
                          )
                          .asMinutes()
                          .toFixed(0)} Min`
                      : "Ongoing"}
                  </span>
                </div>
                <div className="border-t border-white/10 pt-6 flex justify-between items-end relative z-10">
                  <div>
                    <p className="text-[10px] font-black text-emerald-400 uppercase mb-1">
                      Grand Total
                    </p>
                    <p className="text-4xl font-black">
                      Rs. {ride.totalCost || 0}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-[10px] text-slate-400 mb-1">Status</p>
                    <div className="flex items-center gap-1 text-emerald-400 font-bold text-xs justify-end">
                      <ChevronRight size={14} /> Confirmed
                    </div>
                  </div>
                </div>
              </div>
            </section>
          </div>

          <button
            onClick={onClose}
            className="mt-8 w-full py-5 bg-slate-900 text-white rounded-[1.5rem] font-black uppercase tracking-widest text-xs hover:bg-emerald-500 transition-all shadow-xl active:scale-95"
          >
            Acknowledge Receipt
          </button>
        </div>
      </div>
    </div>
  );
};

export default AllRideDetailsModal;

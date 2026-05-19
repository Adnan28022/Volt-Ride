import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchBikes } from "../redux/reducer/bike/bikeSlice";
import { useNavigate } from "react-router-dom";
import {
  CircleDollarSign, Zap, ArrowRight, Info,
  CheckCircle2, Bike, Battery, Gauge,
} from "lucide-react";

const Pricing = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isAuthenticated, user } = useSelector((state) => state.auth);
  const { bikes, loading } = useSelector((state) => state.bikes);

  useEffect(() => {
    dispatch(fetchBikes());
  }, [dispatch]);

  const handleStartRiding = () => {
    if (isAuthenticated) {
      navigate(user?.role === "admin" ? "/admin/dashboard" : "/user/book-ride");
    } else {
      navigate("/register");
    }
  };

  return (
    <section className="py-24 bg-slate-50 relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-1/2 bg-white skew-y-3 -translate-y-20 z-0"></div>

      <div className="mx-auto w-full px-4 md:px-24 relative z-10">
        {/* Header */}
        <div className="max-w-2xl mx-auto text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-green-50 border border-green-100 mb-4">
            <CircleDollarSign className="w-3.5 h-3.5 text-green-600" />
            <span className="text-[10px] font-black text-green-700 uppercase tracking-widest">
              Pricing Transparency
            </span>
          </div>
          <h2 className="text-4xl font-black text-slate-900 tracking-tighter italic uppercase mb-4">
            Simple & Honest <span className="text-green-600">Fares.</span>
          </h2>
          <p className="text-slate-500 text-sm font-medium">
            No hidden charges. You only pay for the duration you ride.
          </p>
        </div>

        {/* ✅ Real Bikes Grid */}
        {loading ? (
          <div className="flex justify-center py-20">
            <div className="w-10 h-10 border-4 border-green-500 border-t-transparent rounded-full animate-spin"></div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {bikes?.filter((b) => b.status?.toLowerCase() === "available").map((bike) => (
              <div
                key={bike._id}
                className="relative bg-white rounded-[2.5rem] p-8 border border-slate-100 shadow-xl shadow-slate-200/50 transition-all duration-500 hover:-translate-y-4 group"
              >
                {/* Bike Name */}
                <div className="w-14 h-14 rounded-2xl bg-green-50 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <Bike className="w-7 h-7 text-green-600" />
                </div>

                <h3 className="text-xl font-black text-slate-900 mb-1 uppercase tracking-tight">
                  {bike.model_name}
                </h3>
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-6">
                  {bike.registration_number}
                </p>

                {/* Pricing */}
                <div className="space-y-4 mb-8">
                  <div className="flex justify-between items-center border-b border-slate-50 pb-3">
                    <span className="text-[11px] font-black text-slate-400 uppercase">Rate / Hour</span>
                    <span className="text-lg font-black text-green-600 italic">
                      Rs. {bike.price_per_hour}
                    </span>
                  </div>
                  <div className="flex justify-between items-center border-b border-slate-50 pb-3">
                    <span className="text-[11px] font-black text-slate-400 uppercase flex items-center gap-1">
                      <Battery size={12} /> Battery
                    </span>
                    <span className="text-lg font-black text-slate-900 italic">
                      {bike.battery_level}%
                    </span>
                  </div>
                  <div className="flex justify-between items-center border-b border-slate-50 pb-3">
                    <span className="text-[11px] font-black text-slate-400 uppercase flex items-center gap-1">
                      <Zap size={12} /> Range
                    </span>
                    <span className="text-lg font-black text-slate-900 italic">
                      {bike.range || "80km"}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-[11px] font-black text-slate-400 uppercase flex items-center gap-1">
                      <Gauge size={12} /> Top Speed
                    </span>
                    <span className="text-lg font-black text-slate-900 italic">
                      {bike.speed || "45km/h"}
                    </span>
                  </div>
                </div>

                {/* Features */}
                <div className="space-y-3 mb-10 text-[11px] font-bold text-slate-500">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-3 h-3 text-green-500" /> Free Insurance Covered
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-3 h-3 text-green-500" /> 24/7 Roadside Support
                  </div>
                </div>

                {/* CTA Button */}
                <button
                  onClick={handleStartRiding}
                  className="w-full py-4 rounded-2xl font-black text-[10px] uppercase tracking-[0.2em] transition-all flex items-center justify-center gap-2 bg-slate-900 text-white hover:bg-green-600"
                >
                  {isAuthenticated ? "Book Now" : "Start Riding"}
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
        )}

        {/* Empty State */}
        {!loading && bikes?.filter((b) => b.status?.toLowerCase() === "available").length === 0 && (
          <div className="text-center py-20">
            <Bike size={48} className="text-slate-300 mx-auto mb-4" />
            <p className="text-slate-400 font-bold">No bikes available right now.</p>
          </div>
        )}

        {/* Note */}
        <div className="mt-16 flex flex-col md:flex-row items-center justify-center gap-6 p-8 bg-white/50 backdrop-blur-md rounded-3xl border border-white max-w-4xl mx-auto">
          <div className="w-12 h-12 rounded-full bg-blue-50 flex items-center justify-center shrink-0">
            <Info className="w-5 h-5 text-blue-500" />
          </div>
          <p className="text-slate-500 text-xs font-medium text-center md:text-left leading-relaxed">
            <strong className="text-slate-900">Pro Tip:</strong> We have integrated local digital wallets
            (JazzCash, EasyPaisa) to make your payment process even easier and more secure across Pakistan.
          </p>
        </div>
      </div>
    </section>
  );
};

export default Pricing;
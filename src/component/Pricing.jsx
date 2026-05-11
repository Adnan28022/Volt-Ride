import React from "react";
import {
  CircleDollarSign,
  Zap,
  Clock,
  CreditCard,
  ArrowRight,
  Info,
  CheckCircle2,
} from "lucide-react";

const Pricing = () => {
  const farePlans = [
    {
      type: "Standard Ride",
      unlock: "Rs. 50",
      perMin: "Rs. 5",
      desc: "Perfect for your daily commute.",
      icon: <Zap className="w-5 h-5 text-blue-600" />,
      color: "blue",
      popular: false,
    },
    {
      type: "Day Pass",
      unlock: "Free",
      perMin: "Flat Rs. 500",
      desc: "Unlimited rides for a full 24 hours.",
      icon: <Clock className="w-5 h-5 text-green-600" />,
      color: "green",
      popular: true,
    },
    {
      type: "Corporate",
      unlock: "Custom",
      perMin: "Discounted",
      desc: "Special rates for offices and corporate teams.",
      icon: <CreditCard className="w-5 h-5 text-slate-600" />,
      color: "slate",
      popular: false,
    },
  ];

  return (
    <section className="py-24 bg-slate-50 relative overflow-hidden">
      {/* Decorative Background */}
      <div className="absolute top-0 left-0 w-full h-1/2 bg-white skew-y-3 -translate-y-20 z-0"></div>

      <div className=" mx-auto w-full px-4 md:px-24 relative z-10">
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

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mx-auto">
          {farePlans.map((plan, i) => (
            <div
              key={i}
              className={`relative bg-white rounded-[2.5rem] p-8 border border-slate-100 shadow-xl shadow-slate-200/50 transition-all duration-500 hover:-translate-y-4 group ${plan.popular ? "ring-2 ring-green-500" : ""
                }`}
            >
              {plan.popular && (
                <span className="absolute -top-4 left-1/2 -translate-x-1/2 bg-green-600 text-white text-[10px] font-black uppercase tracking-[0.2em] px-6 py-2 rounded-full shadow-lg animate-pulse">
                  Best Value
                </span>
              )}

              <div
                className={`w-14 h-14 rounded-2xl bg-${plan.color}-50 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}
              >
                {plan.icon}
              </div>

              <h3 className="text-xl font-black text-slate-900 mb-2 uppercase tracking-tight">
                {plan.type}
              </h3>
              <p className="text-slate-400 text-xs font-bold leading-relaxed mb-8">
                {plan.desc}
              </p>

              <div className="space-y-4 mb-8">
                <div className="flex justify-between items-center border-b border-slate-50 pb-3">
                  <span className="text-[11px] font-black text-slate-400 uppercase">
                    Unlock Fee
                  </span>
                  <span className="text-lg font-black text-slate-900 italic">
                    {plan.unlock}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-[11px] font-black text-slate-400 uppercase">
                    Per Minute
                  </span>
                  <span className="text-lg font-black text-slate-900 italic">
                    {plan.perMin}
                  </span>
                </div>
              </div>

              <div className="space-y-3 mb-10 text-[11px] font-bold text-slate-500">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-3 h-3 text-green-500" /> Free
                  Insurance Covered
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-3 h-3 text-green-500" /> 24/7
                  Roadside Support
                </div>
              </div>

              <button
                className={`w-full py-4 rounded-2xl font-black text-[10px] uppercase tracking-[0.2em] transition-all flex items-center justify-center gap-2 ${plan.popular
                    ? "bg-green-600 text-white shadow-lg shadow-green-200 hover:bg-green-700"
                    : "bg-slate-900 text-white hover:bg-slate-800"
                  }`}
              >
                Start Riding <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          ))}
        </div>

        {/* Note Area */}
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
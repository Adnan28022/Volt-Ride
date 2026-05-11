import React from "react";
import {
  MapPin,
  QrCode,
  Zap,
  Lock,
  ArrowRight,
  Smartphone,
  CheckCircle2
} from "lucide-react";

const BookingProcess = () => {
  const steps = [
    {
      id: "01",
      icon: <MapPin className="w-6 h-6" />,
      title: "Locate Bike",
      desc: "Open the Volt app and find the nearest e-bike at a Volt Station in seconds.",
      color: "bg-blue-50 text-blue-600",
      border: "group-hover:border-blue-500/30"
    },
    {
      id: "02",
      icon: <QrCode className="w-6 h-6" />,
      title: "Scan & Unlock",
      desc: "Reach the bike and scan the QR code on the handlebar to unlock instantly.",
      color: "bg-emerald-50 text-emerald-600",
      border: "group-hover:border-emerald-500/30"
    },
    {
      id: "03",
      icon: <Zap className="w-6 h-6" />,
      title: "Enjoy Ride",
      desc: "Cruise through the city with high-torque power and zero carbon emissions.",
      color: "bg-orange-50 text-orange-600",
      border: "group-hover:border-orange-500/30"
    },
    {
      id: "04",
      icon: <Lock className="w-6 h-6" />,
      title: "Park & End",
      desc: "Park at the designated Volt Station and end your ride securely via the app.",
      color: "bg-slate-900 text-white",
      border: "group-hover:border-slate-500/30"
    },
  ];

  return (
    <section className="py-20 bg-white relative overflow-hidden">
      {/* Decorative Background Text */}
      <div className="absolute top-10 left-1/2 -translate-x-1/2 text-[12rem] font-black text-slate-50 select-none uppercase tracking-tighter whitespace-nowrap z-0">
        Rent & Go
      </div>

      <div className="container mx-auto px-6 lg:px-24 relative z-10">

        {/* --- Header Section --- */}
        <div className="flex flex-col items-center text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-green-50 border border-green-100 mb-6">
            <Smartphone className="w-3.5 h-3.5 text-green-600" />
            <span className="text-[10px] font-black text-green-700 uppercase tracking-[0.3em]">Smart Mobility</span>
          </div>

          <h2 className="text-4xl lg:text-5xl font-black text-slate-900 tracking-tighter italic uppercase leading-none mb-6">
            How to <span className="text-blue-600">Volt.</span>
          </h2>

          <p className="text-slate-500 text-sm md:text-base font-medium max-w-md italic uppercase tracking-tighter leading-relaxed">
            Renting a bike has never been easier. No keys, no fuel, just your smartphone.
          </p>
        </div>

        {/* --- Steps Grid --- */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 relative">
          {/* Desktop Connector Line */}
          <div className="hidden lg:block absolute top-[48px] left-0 w-full h-[1px] bg-slate-100 z-0"></div>

          {steps.map((step, idx) => (
            <div
              key={idx}
              className={`group relative z-10 p-8 rounded-[2.5rem] bg-white border border-slate-100 transition-all duration-500 hover:shadow-2xl hover:shadow-slate-200/50 hover:-translate-y-2 ${step.border}`}
            >
              {/* Step Number Badge */}
              <div className="absolute top-4 right-6 text-4xl font-black text-slate-50 group-hover:text-slate-100 transition-colors italic">
                {step.id}
              </div>

              {/* Icon Container */}
              <div
                className={`w-14 h-14 rounded-2xl ${step.color} flex items-center justify-center mb-8 shadow-lg shadow-inherit transition-transform duration-500 group-hover:rotate-[10deg]`}
              >
                {step.icon}
              </div>

              {/* Text Content */}
              <h3 className="text-lg font-black text-slate-900 uppercase tracking-tighter mb-4 italic">
                {step.title}
              </h3>

              <p className="text-[11px] text-slate-400 font-bold uppercase leading-relaxed mb-6">
                {step.desc}
              </p>

              {/* Success Indicator */}
              <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                <CheckCircle2 className="w-4 h-4 text-green-500" />
                <span className="text-[9px] font-black text-green-600 uppercase tracking-widest">Easy Process</span>
              </div>
            </div>
          ))}
        </div>

        {/* --- Bottom CTA Box --- */}
        <div className="mt-16 bg-slate-950 rounded-[3rem] p-1 overflow-hidden group">
          <div className="bg-slate-900/40 rounded-[2.8rem] p-8 md:p-10 flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="max-w-md text-center md:text-left">
              <h4 className="text-xl font-black italic uppercase tracking-tighter text-white mb-2">
                Ready to start your <span className="text-blue-500">First Ride?</span>
              </h4>
              <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest italic">
                Download the app today and enjoy your first 15 minutes for free!
              </p>
            </div>

            <button className="flex items-center gap-4 px-10 py-5 bg-white text-slate-950 rounded-2xl font-black text-[10px] uppercase tracking-widest hover:bg-blue-600 hover:text-white transition-all shadow-xl shadow-white/5 active:scale-95">
              Download App Now <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>

      </div>
    </section>
  );
};

export default BookingProcess;
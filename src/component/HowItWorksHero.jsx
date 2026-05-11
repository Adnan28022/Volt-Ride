import React from "react";
import {
  MapPin,
  QrCode,
  BatteryCharging,
  Power,
  Search,
  ChevronDown,
  Zap,
} from "lucide-react";

const HowItWorksHero = () => {
  return (
    <section className="relative pt-28 pb-20 lg:pt-24 lg:pb-24 overflow-hidden bg-slate-50">
      {/* --- Sophisticated Background --- */}
      <div className="absolute inset-0 z-0 opacity-40">
        <div className="absolute top-0 right-1/3 w-[500px] h-[500px] bg-green-100 rounded-full blur-[140px]"></div>
        <div className="absolute bottom-10 left-1/3 w-[400px] h-[400px] bg-blue-100 rounded-full blur-[120px]"></div>

        {/* Pattern manually created with Tailwind instead of SVG pattern for maximum consistency */}
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-[0.03]"></div>
      </div>

      <div className="container mx-auto px-6 relative z-10">
        {/* --- Header --- */}
        <div className="text-center max-w-4xl mx-auto mb-20">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white shadow-sm border border-slate-100 mb-6 group cursor-default transition-all hover:border-slate-300">
            <Power className="w-3.5 h-3.5 text-green-500 animate-pulse" />
            <span className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em]">
              Smart Mobility Ecosystem
            </span>
          </div>

          <h1 className="text-4xl lg:text-6xl font-black text-slate-900 mb-6 tracking-tighter leading-[0.95]">
            Unlock your{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-600 to-blue-600">
              VoltRide
            </span>
            <br />
            journey in <span className="font-bold">three simple steps.</span>
          </h1>

          <p className="text-slate-500 text-sm md:text-base max-w-xl mx-auto leading-relaxed font-medium">
            VoltRide app open karein, scan karein, aur Pakistan ki sab se
            advance aur pollution-free electric bike service ka hissa banien.
          </p>
        </div>
      </div>
    </section>
  );
};

export default HowItWorksHero;

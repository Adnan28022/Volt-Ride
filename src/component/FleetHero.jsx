import React from "react";
import {
  Zap,
  ShieldCheck,
  Gauge,
  Battery,
  ChevronRight,
  Cpu,
  Navigation
} from "lucide-react";

const FleetHero = () => {
  return (
    <section className="relative overflow-hidden bg-white pt-24 pb-16 lg:pt-32 lg:pb-24">
      {/* Background Subtle Pattern */}
      <div className="absolute inset-0 z-0 opacity-40">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-green-100 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-blue-100 rounded-full blur-3xl animate-pulse"></div>
      </div>

      <div className="container mx-auto px-4 md:px-24 relative z-10">
        <div className="flex flex-col lg:flex-row items-center gap-12">

          {/* Left Side: Content */}
          <div className="flex-1 text-center lg:text-left">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-green-50 border border-green-100 mb-8">
              <Cpu className="w-4 h-4 text-green-600" />
              <span className="text-[10px] font-black text-green-700 uppercase tracking-[0.3em]">Next-Gen EV Technology</span>
            </div>

            <h1 className="text-5xl lg:text-7xl font-black text-slate-900 leading-[0.95] tracking-tighter mb-8 uppercase italic">
              Unleash The <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-600 to-blue-600 not-italic">
                Volt-X1 Elite.
              </span>
            </h1>

            <p className="text-slate-500 text-sm md:text-base font-medium max-w-xl mb-10 leading-relaxed italic mx-auto lg:mx-0">
              "Pakistan's first smart electric bike, engineered for power and comfort. With a long-range battery and seamless smart GPS integration, every journey becomes exceptional."
            </p>

            <div className="flex flex-wrap justify-center lg:justify-start gap-4">
              <button className="px-10 py-4 bg-slate-900 text-white rounded-2xl font-black text-[10px] uppercase tracking-widest hover:bg-green-600 transition-all shadow-xl shadow-slate-200 flex items-center gap-2">
                Reserve Your Ride <ChevronRight className="w-4 h-4" />
              </button>
              <button className="px-10 py-4 border-2 border-slate-100 text-slate-400 rounded-2xl font-black text-[10px] uppercase tracking-widest hover:bg-slate-50 transition-all">
                Specs Sheet
              </button>
            </div>
          </div>

          {/* Right Side: Visual Grid */}
          <div className="flex-1 w-full max-w-lg lg:max-w-none">
            <div className="grid grid-cols-2 gap-4">
              {/* Card 1 */}
              <div className="bg-white p-8 rounded-[2rem] border border-slate-100 shadow-xl shadow-slate-50 transform hover:-translate-y-2 transition-transform">
                <div className="w-12 h-12 bg-blue-600 rounded-2xl flex items-center justify-center text-white mb-6 shadow-lg shadow-blue-200">
                  <Gauge className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-black text-slate-900 uppercase tracking-tight mb-2">High Torque</h3>
                <p className="text-[10px] text-slate-400 font-bold leading-relaxed uppercase">Instant 60Nm torque for city cruising.</p>
              </div>

              {/* Card 2 */}
              <div className="bg-white p-8 rounded-[2rem] border border-slate-100 shadow-xl shadow-slate-50 mt-8 transform hover:-translate-y-2 transition-transform">
                <div className="w-12 h-12 bg-green-500 rounded-2xl flex items-center justify-center text-white mb-6 shadow-lg shadow-green-200">
                  <Battery className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-black text-slate-900 uppercase tracking-tight mb-2">Long Range</h3>
                <p className="text-[10px] text-slate-400 font-bold leading-relaxed uppercase">80km+ range on a single charge.</p>
              </div>

              {/* Card 3 */}
              <div className="bg-white p-8 rounded-[2rem] border border-slate-100 shadow-xl shadow-slate-50 -mt-4 transform hover:-translate-y-2 transition-transform">
                <div className="w-12 h-12 bg-slate-900 rounded-2xl flex items-center justify-center text-white mb-6 shadow-lg shadow-slate-300">
                  <Navigation className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-black text-slate-900 uppercase tracking-tight mb-2">Smart GPS</h3>
                <p className="text-[10px] text-slate-400 font-bold leading-relaxed uppercase">Precision tracking & geofencing.</p>
              </div>

              {/* Card 4 - Trust Badge */}
              <div className="bg-slate-900 p-8 rounded-[2rem] flex flex-col justify-center items-center text-center transform hover:-translate-y-2 transition-transform mt-4">
                <p className="text-green-500 font-black text-4xl mb-1 italic">150KG</p>
                <p className="text-white text-[10px] font-black uppercase tracking-widest leading-none">Max Load <br /> Capacity</p>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default FleetHero;
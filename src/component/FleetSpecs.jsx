import React from "react";
import {
  ListChecks,
  Zap,
  Shield,
  Info,
  Cpu,
  Battery,
  Gauge,
  Clock,
  Weight,
  Disc,
  Navigation,
  Wind
} from "lucide-react";

const FleetSpecs = () => {
  const specs = [
    { label: "Motor Type", value: "250W Brushless DC", sub: "High Efficiency Hub Motor", icon: <Cpu />, color: "text-blue-500" },
    { label: "Battery", value: "48V 20Ah Lithium", sub: "Removable & Fireproof", icon: <Battery />, color: "text-green-500" },
    { label: "Top Speed", value: "45 KM/H", sub: "Electronically Limited", icon: <Gauge />, color: "text-orange-500" },
    { label: "Charge Time", value: "3 - 4 Hours", sub: "Turbo Fast Charging", icon: <Clock />, color: "text-purple-500" },
    { label: "Payload", value: "150 KG", sub: "Heavy Duty Chassis", icon: <Weight />, color: "text-slate-700" },
    { label: "Braking", value: "E-ABS System", sub: "Front Disc & Rear Drum", icon: <Disc />, color: "text-red-500" },
    { label: "Connectivity", value: "Smart GPS", sub: "Real-time App Tracking", icon: <Navigation />, color: "text-indigo-500" },
    { label: "Tire Tech", value: "12\" Tubeless", sub: "All-Terrain Anti-Skid", icon: <Wind />, color: "text-sky-500" },
  ];

  return (
    <section className="py-24 bg-white relative overflow-hidden">
      {/* Background Decorative Text */}
      <div className="absolute top-20 -left-20 text-[200px] font-black text-slate-50/50 uppercase italic leading-none select-none -z-0">
        Specs
      </div>

      <div className="container mx-auto px-6 md:px-24 relative z-10">

        {/* --- Header Section --- */}
        <div className="flex flex-col lg:flex-row items-end justify-between mb-20 gap-8">
          <div className="max-w-2xl text-center lg:text-left">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-lg bg-blue-50 border border-blue-100 mb-6">
              <ListChecks className="w-4 h-4 text-blue-600" />
              <span className="text-[10px] font-black text-blue-700 uppercase tracking-[0.3em]">Technical Blueprint</span>
            </div>
            <h2 className="text-5xl lg:text-7xl font-black text-slate-900 tracking-tighter italic uppercase leading-[0.9]">
              Engineering <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-green-500 not-italic">Excellence.</span>
            </h2>
          </div>
          <p className="text-slate-400 text-sm font-bold uppercase tracking-widest max-w-xs lg:text-right border-l-4 lg:border-l-0 lg:border-r-4 border-blue-600 pl-4 lg:pr-4">
            Every component is precision-engineered for the roads of Pakistan.
          </p>
        </div>

        {/* --- Modern Bento Specs Grid --- */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {specs.map((spec, i) => (
            <div
              key={i}
              className="group relative bg-slate-50 hover:bg-white p-8 rounded-[2.5rem] border border-slate-100 transition-all duration-500 hover:shadow-[0_20px_50px_rgba(0,0,0,0.05)] hover:-translate-y-1 overflow-hidden"
            >
              {/* Icon & Label */}
              <div className="relative z-10">
                <div className={`${spec.color} mb-6 transform group-hover:scale-110 transition-transform duration-500`}>
                  {React.cloneElement(spec.icon, { size: 28, strokeWidth: 2.5 })}
                </div>

                <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-1">
                  {spec.label}
                </h4>

                <div className="flex flex-col">
                  <span className="text-2xl font-black text-slate-900 italic uppercase tracking-tighter leading-none mb-2">
                    {spec.value}
                  </span>
                  <span className="text-[10px] font-bold text-slate-400 uppercase italic">
                    {spec.sub}
                  </span>
                </div>
              </div>

              {/* Decorative Number */}
              <span className="absolute bottom-4 right-8 text-4xl font-black text-slate-200/50 italic group-hover:text-blue-100 transition-colors">
                {i + 1 < 10 ? `0${i + 1}` : i + 1}
              </span>
            </div>
          ))}
        </div>

        {/* --- Bottom Trust Bar --- */}
        <div className="mt-16 pt-10 border-t border-slate-100 flex flex-wrap justify-center lg:justify-between items-center gap-8">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-slate-900 flex items-center justify-center text-white">
              <Shield className="w-6 h-6" />
            </div>
            <div>
              <p className="text-[10px] font-black text-slate-400 uppercase">Warranty</p>
              <p className="text-sm font-black text-slate-900 uppercase italic">1 Year Comprehensive</p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-green-500 flex items-center justify-center text-white">
              <Zap className="w-6 h-6" />
            </div>
            <div>
              <p className="text-[10px] font-black text-slate-400 uppercase">Protection</p>
              <p className="text-sm font-black text-slate-900 uppercase italic">IP67 Water Resistant</p>
            </div>
          </div>

          <button className="px-8 py-4 bg-blue-600 text-white rounded-2xl font-black text-[10px] uppercase tracking-widest hover:bg-slate-900 transition-all flex items-center gap-3">
            Download PDF Specs <Info className="w-4 h-4" />
          </button>
        </div>

      </div>
    </section>
  );
};

export default FleetSpecs;
import React from "react";
import { Zap, Dna, Settings, Eye, CircleDot, Activity } from "lucide-react";

const FleetFeatures = () => {
  const techFeatures = [
    {
      title: "Smart Hub Motor",
      desc: "Waterproof brushless motor that provides a smooth ride in all weather conditions.",
      icon: <Zap className="w-5 h-5" />,
      color: "bg-blue-500",
    },
    {
      title: "Digital Cockpit",
      desc: "LCD display showing speed, battery, and trip data in real-time.",
      icon: <Activity className="w-5 h-5" />,
      color: "bg-green-500",
    },
    {
      title: "Anti-Skid Tires",
      desc: "Special grip tires that maintain excellent balance on rainy and unpaved roads.",
      icon: <CircleDot className="w-5 h-5" />,
      color: "bg-slate-900",
    },
    {
      title: "Fast Charging",
      desc: "Full charge in just 3 hours, ensuring your time is never wasted.",
      icon: <Settings className="w-5 h-5" />,
      color: "bg-orange-500",
    },
  ];

  return (
    <section className="py-24 bg-slate-50 relative overflow-hidden">
      <div className="container mx-auto px-6 md:px-24">
        {/* --- Header: Fully Centered --- */}
        <div className="flex flex-col items-center text-center max-w-3xl mx-auto mb-20">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white border border-slate-100 mb-6 shadow-sm">
            <Dna className="w-3.5 h-3.5 text-blue-600" />
            <span className="text-[10px] font-black text-slate-400 uppercase tracking-[0.3em]">
              Built To Last
            </span>
          </div>

          <h2 className="text-4xl lg:text-6xl font-black text-slate-900 tracking-tighter italic uppercase leading-none mb-6">
            Advanced <span className="text-blue-600">Specs.</span>
          </h2>

          <p className="text-slate-500 text-sm md:text-base font-medium max-w-md italic uppercase tracking-tighter leading-relaxed">
            Every part is meticulously engineered to ensure you get 100% reliability on every journey.
          </p>
        </div>

        {/* --- Features Grid --- */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {techFeatures.map((feature, index) => (
            <div
              key={index}
              className="group bg-white p-10 rounded-[3rem] border border-slate-100 transition-all duration-500 hover:shadow-2xl hover:shadow-blue-100/50 hover:-translate-y-2 flex flex-col items-center text-center"
            >
              <div
                className={`w-14 h-14 ${feature.color} rounded-2xl flex items-center justify-center text-white mb-8 shadow-lg shadow-inherit transform group-hover:rotate-[15deg] transition-transform duration-500`}
              >
                {feature.icon}
              </div>

              <h3 className="text-lg font-black text-slate-900 uppercase tracking-tighter mb-4 italic">
                {feature.title}
              </h3>

              <p className="text-[11px] text-slate-400 font-bold uppercase leading-relaxed">
                {feature.desc}
              </p>
            </div>
          ))}
        </div>

        {/* --- Bottom Detail Label --- */}
        <div className="mt-20 flex justify-center">
          <div className="px-8 py-4 bg-slate-900 rounded-2xl flex items-center gap-6 group cursor-pointer hover:bg-blue-600 transition-all">
            <span className="text-[10px] font-black text-white uppercase tracking-[0.3em]">
              Explore Full Maintenance Guide
            </span>
            <div className="w-8 h-8 rounded-xl bg-white/10 flex items-center justify-center group-hover:rotate-45 transition-transform">
              <Eye className="w-4 h-4 text-white" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FleetFeatures;
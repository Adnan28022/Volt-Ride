import React from "react";
import { 
  Zap, 
  Leaf, 
  Map, 
  Users, 
  TrendingUp 
} from "lucide-react";

const ImpactStats = () => {
  const stats = [
    {
      label: "Eco-Friendly Rides",
      value: "1.2M+",
      desc: "Completed across Pakistan",
      icon: <Zap className="w-5 h-5 text-blue-500" />,
      color: "blue"
    },
    {
      label: "CO2 Saved",
      value: "450 Tons",
      desc: "Reduction in carbon footprint",
      icon: <Leaf className="w-5 h-5 text-green-500" />,
      color: "green"
    },
    {
      label: "Active Hubs",
      value: "85+",
      desc: "Strategic parking stations",
      icon: <Map className="w-5 h-5 text-teal-400" />,
      color: "slate"
    },
    {
      label: "Happy Riders",
      value: "50,000+",
      desc: "Daily commuters & explorers",
      icon: <Users className="w-5 h-5 text-amber-500" />,
      color: "amber"
    }
  ];

  return (
    <section className="py-24 bg-slate-900 relative overflow-hidden">
      {/* Background Decoration */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:20px_20px]"></div>
      </div>

      <div className="container mx-auto px-6 md:px-24 relative z-10">
        
        {/* --- Header: Centered --- */}
        <div className="flex flex-col items-center text-center max-w-3xl mx-auto mb-20">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-white/5 border border-white/10 mb-6 backdrop-blur-md">
            <TrendingUp className="w-3.5 h-3.5 text-green-400" />
            <span className="text-[10px] font-black text-slate-300 uppercase tracking-[0.2em]">Our Growing Footprint</span>
          </div>
          
          <h2 className="text-4xl lg:text-6xl font-black text-white tracking-tighter italic uppercase leading-none mb-6">
            Small Rides, <br />
            <span className="text-green-500">Big Impact.</span>
          </h2>
          
          <p className="text-slate-400 text-sm md:text-base font-medium max-w-md italic">
            Hum sirf bikes nahi provide kar rahay, hum Pakistan ko green aur smart bana rahay hain.
          </p>
        </div>

        {/* --- Stats Grid --- */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, i) => (
            <div 
              key={i} 
              className="flex flex-col items-center text-center p-8 rounded-[2.5rem] bg-white/5 border border-white/10 hover:bg-white/10 transition-all group"
            >
              <div className="w-14 h-14 rounded-2xl bg-white/5 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-500 shadow-xl border border-white/5">
                {stat.icon}
              </div>
              
              <div className="space-y-1">
                <h3 className="text-3xl font-black text-white tracking-tighter italic">
                  {stat.value}
                </h3>
                <p className="text-[11px] font-black text-green-500 uppercase tracking-[0.2em]">
                  {stat.label}
                </p>
                <p className="text-slate-500 text-xs font-medium mt-2 leading-relaxed">
                  {stat.desc}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* --- Trust Badge Area --- */}
        <div className="mt-20 pt-12 border-t border-white/5 flex flex-wrap justify-center items-center gap-12 opacity-40 grayscale transition-all hover:grayscale-0 hover:opacity-100">
           <span className="text-white font-black italic tracking-widest uppercase">Verified Eco-Partner</span>
           <span className="text-white font-black italic tracking-widest uppercase">ISO Certified</span>
           <span className="text-white font-black italic tracking-widest uppercase">PDEA Approved</span>
        </div>
      </div>
    </section>
  );
};

export default ImpactStats;
import { Users, Bike, MapPin, Leaf, ArrowRight } from "lucide-react";

const Statistics = () => {
  const stats = [
    {
      icon: <Users size={24} />,
      value: "50K+",
      label: "Active Riders",
      detail: "Daily commuters across the nation",
      color: "text-blue-600",
      glow: "group-hover:shadow-blue-500/20",
    },
    {
      icon: <Bike size={24} />,
      value: "1,200+",
      label: "Electric Fleet",
      detail: "Modern emission-free vehicles",
      color: "text-green-600",
      glow: "group-hover:shadow-green-500/20",
    },
    {
      icon: <MapPin size={24} />,
      label: "Volt Stations",
      value: "150+",
      detail: "Strategically located citywide",
      color: "text-purple-600",
      glow: "group-hover:shadow-purple-500/20",
    },
    {
      icon: <Leaf size={24} />,
      label: "CO2 Saved",
      value: "200 Tons",
      detail: "Leading the green revolution",
      color: "text-emerald-600",
      glow: "group-hover:shadow-emerald-500/20",
    },
  ];

  return (
    <section className="py-12 bg-white relative overflow-hidden">
      {/* Background Decorative Text */}
      <div className="absolute top-10 left-1/2 -translate-x-1/2 text-[15rem] font-black text-slate-50/50 select-none pointer-events-none uppercase tracking-tighter">
        Impact
      </div>

      <div className="container mx-auto px-6 lg:px-24 relative z-10">

        {/* Section Header */}
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
          <div className="max-w-xl">
            <h2 className="text-sm font-black text-green-600 uppercase tracking-[0.4em] mb-4">Live Data</h2>
            <h3 className="text-4xl md:text-5xl font-black text-slate-900 leading-none">
              The Numbers Behind <br /> Our <span className="text-slate-400 italic font-medium">Revolution</span>
            </h3>
          </div>
          <p className="text-slate-500 font-medium max-w-xs text-sm">
            We are more than just a bike rental; we are a growing community dedicated to sustainable urban mobility.
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, idx) => (
            <div
              key={idx}
              className={`group relative p-8 bg-white rounded-[2rem] border border-slate-100 transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl ${stat.glow}`}
            >
              {/* Animated Floating Icon */}
              <div className={`w-12 h-12 rounded-2xl bg-slate-50 ${stat.color} flex items-center justify-center mb-8 group-hover:scale-110 group-hover:rotate-6 transition-all duration-500 shadow-sm`}>
                {stat.icon}
              </div>

              {/* Text Content */}
              <div className="space-y-2">
                <div className="flex items-baseline gap-1">
                  <h4 className="text-4xl font-black text-slate-900 tracking-tighter">
                    {stat.value}
                  </h4>
                </div>
                <p className="text-xs font-black text-slate-400 uppercase tracking-widest">
                  {stat.label}
                </p>
                <p className="text-xs font-medium text-slate-400 pt-4 border-t border-slate-50 group-hover:text-slate-600 transition-colors">
                  {stat.detail}
                </p>
              </div>

              {/* Number Index Backdrop */}
              <span className="absolute bottom-6 right-8 text-5xl font-black text-slate-50 group-hover:text-slate-100 transition-colors">
                0{idx + 1}
              </span>
            </div>
          ))}
        </div>

        {/* Interactive CTA Banner */}
        <div className="mt-12 p-1 bg-slate-950 rounded-[2.5rem] overflow-hidden group">
          <div className="bg-slate-900/50 rounded-[2.3rem] p-6 md:p-10 flex flex-col md:flex-row items-center justify-between gap-8 transition-all group-hover:bg-slate-900/40">
            <div className="flex items-center gap-6">
              <div className="flex -space-x-4">
                {[1, 2, 3, 4].map((i) => (
                  <div key={i} className="relative group/avatar">
                    <img
                      src={`https://i.pravatar.cc/100?img=${i + 20}`}
                      className="w-12 h-12 rounded-2xl border-4 border-slate-900 shadow-xl transition-transform group-hover/avatar:-translate-y-2"
                      alt="User"
                    />
                  </div>
                ))}
                <div className="w-12 h-12 rounded-2xl border-4 border-slate-900 bg-green-500 flex items-center justify-center text-xs font-black text-slate-900">
                  +10k
                </div>
              </div>
              <div className="space-y-1">
                <p className="text-white font-black text-lg">Join the Movement</p>
                <p className="text-slate-400 text-xs font-medium uppercase tracking-widest">Growing 24% every month</p>
              </div>
            </div>

            <button className="flex items-center gap-3 px-8 py-4 bg-green-500 text-slate-950 rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-white transition-all hover:scale-105 active:scale-95 shadow-lg shadow-green-500/20">
              Find Stations Near Me <ArrowRight size={16} />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Statistics;
import React from "react";
import {
  CircleDollarSign,
  ArrowDown,
  Zap,
  TrendingDown,
  ShieldCheck,
  BarChart3,
} from "lucide-react";

const PricingHero = () => {
  return (
    <section className="relative pt-24 pb-20 lg:pt-24 lg:pb-24 overflow-hidden bg-white">
      {/* --- Tech-Focused Background --- */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute inset-0 bg-[radial-gradient(#e2e8f0_1px,transparent_1px)] [background-size:32px_32px] [mask-image:radial-gradient(ellipse_50%_50%_at_50%_50%,#000_70%,transparent_100%)] opacity-50"></div>
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full bg-[radial-gradient(ellipse_at_top,rgba(59,130,246,0.05),transparent_50%)]"></div>
      </div>

      <div className="mx-auto px-4 md:px-24 relative z-10">
        <div className="flex flex-col items-center text-center mx-auto">
          {/* Industry Badge */}
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-900 mb-8 shadow-lg shadow-slate-200">
            <BarChart3 className="w-3 h-3 text-blue-400" />
            <span className="text-[9px] font-black text-white uppercase tracking-[0.25em]">
              Maximum ROI <span className="text-slate-500 mx-1">|</span> Fleet
              Efficiency
            </span>
          </div>

          {/* Precision Heading */}
          <h1 className="text-5xl lg:text-7xl font-black text-slate-900 tracking-tighter italic uppercase leading-[0.9] mb-8">
            Fuel Your <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-indigo-600 to-emerald-500 not-italic">
              Bottom Line.
            </span>
          </h1>

          {/* Professional Copy */}
          <p className="text-slate-500 text-xs md:text-sm font-bold max-w-lg italic uppercase tracking-tighter leading-relaxed mb-12">
            Eliminate fluctuating fuel overheads. Volt-X1 delivers a
            high-performance electric solution engineered for
            <span className="text-slate-900 font-black">
              {" "}
              long-term capital preservation{" "}
            </span>
            and zero-emission mobility.
          </p>

          {/* Performance Trust Row */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 w-full mb-16">
            {[
              {
                icon: <Zap className="w-4 h-4 fill-current" />,
                label: "Op-Ex",
                value: "90% Lower",
              },
              {
                icon: <CircleDollarSign className="w-4 h-4" />,
                label: "Tax",
                value: "Subsidized",
              },
              {
                icon: <ShieldCheck className="w-4 h-4" />,
                label: "Asset",
                value: "Warranty",
              },
              {
                icon: <TrendingDown className="w-4 h-4" />,
                label: "Inflation",
                value: "Hedge",
              },
            ].map((item, index) => (
              <div
                key={index}
                className="flex flex-col items-center p-4 rounded-2xl border border-slate-100 bg-white/50 backdrop-blur-sm transition-all hover:border-blue-100 hover:shadow-xl hover:shadow-blue-50/50"
              >
                <div className="w-8 h-8 rounded-lg bg-slate-50 flex items-center justify-center text-slate-900 mb-2">
                  {item.icon}
                </div>
                <p className="text-[7px] font-black text-slate-400 uppercase tracking-widest">
                  {item.label}
                </p>
                <p className="text-[10px] font-black text-slate-900 uppercase">
                  {item.value}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default PricingHero;

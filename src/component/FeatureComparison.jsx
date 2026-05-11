import React from "react";
import { Check, Minus, Info, ShieldCheck } from "lucide-react";

// 'export default' ko yahan start mein likh diya hai taake import error na aaye
export default function FeatureComparison() {
  const features = [
    { name: "Top Speed", standard: "65 km/h", pro: "95 km/h" },
    { name: "Range per Charge", standard: "80 km", pro: "140 km" },
    { name: "Battery Type", standard: "Lithium-Ion", pro: "LFP High-Density" },
    { name: "Charging Time", standard: "4-5 Hours", pro: "2.5 Hours (Fast)" },
    {
      name: "Smart App Connectivity",
      standard: "Basic",
      pro: "Advanced + GPS",
    },
    {
      name: "Anti-Theft System",
      standard: <Minus className="w-4 h-4 opacity-20" />,
      pro: <Check className="w-4 h-4 text-emerald-500" />,
    },
    {
      name: "Regenerative Braking",
      standard: <Minus className="w-4 h-4 opacity-20" />,
      pro: <Check className="w-4 h-4 text-emerald-500" />,
    },
    { name: "Warranty", standard: "2 Years", pro: "5 Years" },
  ];

  return (
    <section className="py-24 bg-white">
      <div className="container mx-auto px-4 md:px-24">
        <div className="mx-auto">
          {/* Header */}
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-5xl font-black text-slate-900 tracking-tighter italic uppercase mb-4">
              Technical <span className="text-blue-600 not-italic">Specs.</span>
            </h2>
            <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.4em] italic">
              Side-by-Side Configuration Breakdown
            </p>
          </div>

          {/* Table */}
          <div className="overflow-hidden border border-slate-100 rounded-[2rem] bg-slate-50/30 shadow-sm">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-900 text-white">
                  <th className="p-6 text-[10px] font-black uppercase tracking-widest">
                    Core Features
                  </th>
                  <th className="p-6 text-[10px] font-black uppercase tracking-widest text-center">
                    Standard
                  </th>
                  <th className="p-6 text-[10px] font-black uppercase tracking-widest text-center text-blue-400">
                    Pro Variant
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {features.map((feature, idx) => (
                  <tr
                    key={idx}
                    className="group hover:bg-white transition-colors"
                  >
                    <td className="p-6">
                      <div className="flex items-center gap-2">
                        <span className="text-[11px] font-black text-slate-700 uppercase italic tracking-tight">
                          {feature.name}
                        </span>
                        <Info className="w-3 h-3 text-slate-300 opacity-0 group-hover:opacity-100 transition-opacity cursor-help" />
                      </div>
                    </td>
                    <td className="p-6 text-center text-[11px] font-bold text-slate-500 uppercase">
                      <div className="flex justify-center">
                        {feature.standard}
                      </div>
                    </td>
                    <td className="p-6 text-center text-[11px] font-black text-slate-900 uppercase italic">
                      <div className="flex justify-center">{feature.pro}</div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Trust Footer */}
          <div className="mt-10 p-6 rounded-2xl bg-blue-50 border border-blue-100 flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-blue-600 text-white flex items-center justify-center shadow-lg shadow-blue-200">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <div>
                <p className="text-[10px] font-black text-slate-900 uppercase tracking-tight">
                  PCAA Certified Components
                </p>
                <p className="text-[9px] font-bold text-slate-500 uppercase italic">
                  All parts rigorously tested for Pakistan's terrain.
                </p>
              </div>
            </div>
            <button className="px-6 py-2 bg-slate-900 text-white text-[9px] font-black uppercase tracking-widest rounded-full hover:bg-blue-600 transition-colors">
              Download Full Catalog
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

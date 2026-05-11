import React, { useState } from "react";
import { Calculator, TrendingUp, Fuel, Zap, ArrowRight } from "lucide-react";

const SavingsCalculator = () => {
  const [kms, setKms] = useState(40);
  const petrolPrice = 280; // Current PKR
  const bikeAvg = 40; // km per litre

  const monthlyPetrolCost = ((kms * 30) / bikeAvg) * petrolPrice;
  const voltX1Cost = ((kms * 30) / 80) * 50; // Approx 50 PKR per charge for 80km
  const netSavings = monthlyPetrolCost - voltX1Cost;

  return (
    <section className="py-24 bg-white relative overflow-hidden">
      <div className="container mx-auto px-4 md:px-24 relative z-10">
        <div className="mx-auto">
          {/* Section Header */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
            <div className="max-w-xl">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 border border-blue-100 mb-4">
                <Calculator className="w-3.5 h-3.5 text-blue-600" />
                <span className="text-[10px] font-black text-blue-600 uppercase tracking-widest">
                  Profit Analysis
                </span>
              </div>
              <h2 className="text-4xl lg:text-6xl font-black text-slate-900 tracking-tighter italic uppercase leading-none">
                Calculate Your <br />
                <span className="text-blue-600 not-italic text-outline">
                  ROI.
                </span>
              </h2>
            </div>
            <p className="text-slate-500 text-xs font-bold uppercase italic tracking-tighter max-w-xs">
              Turn your daily travel into savings. See how Volt-X1 boosts your monthly budget and pays for itself.
            </p>
          </div>

          {/* Calculator Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
            {/* Input Side */}
            <div className="lg:col-span-5 p-8 rounded-[2rem] bg-slate-50 border border-slate-100 flex flex-col justify-center">
              <label className="block text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-6">
                Daily Commute:{" "}
                <span className="text-blue-600 text-lg ml-2">{kms} KM</span>
              </label>
              <input
                type="range"
                min="10"
                max="150"
                value={kms}
                onChange={(e) => setKms(e.target.value)}
                className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-blue-600 mb-10"
              />

              <div className="space-y-4">
                <div className="flex justify-between items-center p-4 bg-white rounded-2xl border border-slate-100">
                  <div className="flex items-center gap-3">
                    <Fuel className="w-4 h-4 text-slate-400" />
                    <span className="text-[10px] font-black text-slate-900 uppercase italic">
                      Petrol Price
                    </span>
                  </div>
                  <span className="text-xs font-black text-slate-900">
                    Rs. {petrolPrice}/L
                  </span>
                </div>
                <div className="flex justify-between items-center p-4 bg-white rounded-2xl border border-slate-100">
                  <div className="flex items-center gap-3">
                    <TrendingUp className="w-4 h-4 text-slate-400" />
                    <span className="text-[10px] font-black text-slate-900 uppercase italic">
                      Current Avg
                    </span>
                  </div>
                  <span className="text-xs font-black text-slate-900">
                    {bikeAvg} KM/L
                  </span>
                </div>
              </div>
            </div>

            {/* Results Side */}
            <div className="lg:col-span-7 p-8 rounded-[2.5rem] bg-slate-900 text-white relative overflow-hidden shadow-2xl shadow-blue-100">
              {/* Decorative Glow */}
              <div className="absolute top-0 right-0 w-64 h-64 bg-blue-600/20 rounded-full blur-[80px] -mr-32 -mt-32"></div>

              <div className="relative z-10 h-full flex flex-col">
                <p className="text-[10px] font-black text-blue-400 uppercase tracking-[0.3em] mb-10">
                  Monthly Savings Summary
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-auto">
                  <div>
                    <p className="text-[9px] font-black text-slate-500 uppercase tracking-widest mb-1">
                      Petrol Expense
                    </p>
                    <p className="text-2xl font-black italic tracking-tighter text-slate-300 decoration-red-500/50 line-through">
                      Rs. {Math.round(monthlyPetrolCost).toLocaleString()}
                    </p>
                  </div>
                  <div>
                    <p className="text-[9px] font-black text-blue-400 uppercase tracking-widest mb-1">
                      Volt-X1 Cost
                    </p>
                    <p className="text-2xl font-black italic tracking-tighter">
                      Rs. {Math.round(voltX1Cost).toLocaleString()}
                    </p>
                  </div>
                </div>

                <div className="mt-12 pt-8 border-t border-white/10">
                  <p className="text-[11px] font-black text-emerald-400 uppercase tracking-[0.4em] mb-2">
                    Total Monthly Profit
                  </p>
                  <div className="flex items-baseline gap-2">
                    <span className="text-6xl font-black italic tracking-tighter text-white">
                      Rs. {Math.round(netSavings).toLocaleString()}
                    </span>
                    <span className="text-emerald-400 font-black italic uppercase text-sm">
                      Saved
                    </span>
                  </div>
                </div>

                <button className="mt-10 group flex items-center justify-center gap-3 w-full py-5 bg-blue-600 hover:bg-blue-500 rounded-2xl transition-all shadow-xl shadow-blue-900/20">
                  <span className="text-[11px] font-black uppercase tracking-widest italic">
                    Start Saving Today
                  </span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            </div>
          </div>

          {/* Bottom Insight */}
          <div className="mt-12 flex flex-col md:flex-row items-center justify-center gap-8 text-center md:text-left">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-slate-900 text-white flex items-center justify-center shadow-lg">
                <Zap className="w-4 h-4 fill-current text-blue-400" />
              </div>
              <p className="text-[10px] font-black text-slate-900 uppercase tracking-tight italic leading-snug">
                Pay for your bike <br />{" "}
                <span className="text-blue-600">Through your savings.</span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SavingsCalculator;
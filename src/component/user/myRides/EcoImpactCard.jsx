import React from "react";
import { Leaf, Award } from "lucide-react";

const EcoImpactCard = ({ rides = [] }) => {
  const totalDist = rides.reduce((sum, ride) => {
    if (ride.status === "completed") {
      const diff =
        (new Date(ride.endTime) - new Date(ride.startTime)) / (1000 * 60 * 60);
      return sum + diff * 12;
    }
    return sum;
  }, 0);

  const co2Saved = (totalDist * 0.12).toFixed(1);
  const treesEquivalent = Math.floor(totalDist / 50);

  return (
    <div className="bg-slate-900 rounded-3xl p-6 text-white relative overflow-hidden shadow-xl">
      <div className="relative z-10">
        <div className="flex items-center gap-2 mb-4">
          <Award className="text-emerald-400" size={20} />
          <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">
            Environmental Impact
          </span>
        </div>
        <h3 className="text-2xl font-black italic mb-2 tracking-tight">
          {/* ✅ String to number fix */}
          {parseFloat(co2Saved) > 5 ? "You're a Eco-Hero! 🌿" : "Starting Green! 🌱"}
        </h3>
        <p className="text-xs text-slate-400 leading-relaxed mb-6">
          By choosing VoltRide, you've prevented{" "}
          <span className="text-emerald-400 font-bold">{co2Saved}kg of CO2</span>{" "}
          from entering the atmosphere.
        </p>

        <div className="flex items-center gap-3 bg-white/5 border border-white/10 p-3 rounded-2xl">
          <div className="p-2 bg-emerald-500 rounded-lg text-slate-900">
            <Leaf size={16} />
          </div>
          <div>
            <p className="text-[10px] font-bold text-slate-500 uppercase">Equivalent to</p>
            <p className="text-sm font-black text-white italic">
              {treesEquivalent} Trees Planted
            </p>
          </div>
        </div>
      </div>
      <Leaf
        className="absolute -right-10 -bottom-10 opacity-10 rotate-12 text-emerald-500"
        size={200}
      />
    </div>
  );
};

export default EcoImpactCard;
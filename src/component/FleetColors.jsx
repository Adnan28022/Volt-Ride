import React, { useState } from "react";
import { Palette, Check, ArrowRight } from "lucide-react";

const FleetColors = () => {
  const [activeColor, setActiveColor] = useState(0);

  // Note: These sample images are kept as per your original code.
  // You can replace these with your actual transparent PNGs.
  const variants = [
    {
      id: 1,
      name: "Phantom Black",
      hex: "#0F172A", // Dark Slate/Black
      image: "https://www.cecilscyclery.com/cdn/shop/files/SUPER73-RADVENTURESERIES_PanthroBlue_3_995.jpg?v=1693619322",
      accent: "text-slate-900",
      glow: "from-slate-200"
    },
    {
      id: 2,
      name: "Electric Blue",
      hex: "#2563eb",
      image: "https://www.freeskycycle.com/cdn/shop/files/Ranger-Plus-Blue-1.png?v=1775805100",
      accent: "text-blue-600",
      glow: "from-blue-100"
    },
    {
      id: 3,
      name: "Neon Green",
      hex: "#22c55e",
      image: "https://cdn.powergo.ca/media/catalog/2024/2/a48d6d505bec4752b1851faaca99e328_81c2a9c412fc4ca7892c0d472e3847cc_1000/2024-kawasaki-elektrode-lime-green-0.webp",
      accent: "text-green-500",
      glow: "from-green-100"
    }
  ];

  return (
    <section className="py-24 bg-white relative overflow-hidden">
      <div className="container mx-auto px-6 md:px-24">

        {/* --- Header Section --- */}
        <div className="flex flex-col items-center text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-50 border border-slate-100 mb-6">
            <Palette className="w-3.5 h-3.5 text-slate-900" />
            <span className="text-[10px] font-black text-slate-400 uppercase tracking-[0.3em]">Style Your Ride</span>
          </div>

          <h2 className="text-4xl lg:text-6xl font-black text-slate-900 tracking-tighter italic uppercase leading-none mb-6">
            Pick Your <span className="text-blue-600">Vibe.</span>
          </h2>

          <p className="text-slate-500 text-sm md:text-base font-medium max-w-md italic uppercase tracking-tighter leading-relaxed">
            The Volt-X1 is available in three premium finishes. Choose the one that best reflects your unique style and personality.
          </p>
        </div>

        {/* --- Main Interactive Container --- */}
        <div className="flex flex-col lg:flex-row items-center gap-12 bg-slate-50 rounded-[4rem] p-8 lg:p-16 border border-slate-100 shadow-sm relative overflow-hidden">

          {/* Background Dynamic Glow (Changes with color) */}
          <div className={`absolute top-0 right-0 w-full h-full bg-gradient-to-br ${variants[activeColor].glow} to-transparent opacity-30 transition-all duration-1000`}></div>

          {/* --- Left: Image Preview Container --- */}
          <div className="flex-1 relative w-full h-[300px] lg:h-[450px] flex items-center justify-center z-10">
            {/* Overlay background for depth */}
            <div className="absolute inset-0 bg-white/20 rounded-full blur-[80px] scale-75 animate-pulse"></div>

            {/* The Dynamic Image */}
            <img
              key={activeColor}
              src={variants[activeColor].image}
              alt={variants[activeColor].name}
              className="relative w-full h-full object-cover rounded-[3rem] shadow-2xl transition-all duration-700 ease-out transform animate-in fade-in zoom-in slide-in-from-right-10"
            />
          </div>

          {/* --- Right: Color Selection Interface --- */}
          <div className="flex-1 space-y-10 text-center lg:text-left z-10">
            <div className="space-y-2">
              <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.4em]">Selected Finish</p>
              <h3 className={`text-4xl lg:text-5xl font-black italic uppercase tracking-tighter transition-colors duration-500 ${variants[activeColor].accent}`}>
                {variants[activeColor].name}
              </h3>
            </div>

            {/* Custom Color Switches */}
            <div className="flex flex-wrap justify-center lg:justify-start gap-6">
              {variants.map((color, index) => (
                <button
                  key={color.id}
                  onClick={() => setActiveColor(index)}
                  className={`relative w-14 h-14 rounded-2xl border-4 transition-all duration-500 transform hover:scale-110 active:scale-95 ${activeColor === index
                      ? 'border-white ring-4 ring-slate-900/10 shadow-xl'
                      : 'border-white hover:border-slate-200'
                    }`}
                  style={{ backgroundColor: color.hex }}
                >
                  {/* Selected Indicator Checkmark */}
                  <div className={`absolute -top-3 -right-3 w-6 h-6 rounded-full flex items-center justify-center text-white shadow-lg transition-all duration-500 ${activeColor === index ? 'bg-slate-900 scale-100 opacity-100' : 'bg-slate-300 scale-0 opacity-0'
                    }`}>
                    <Check className="w-3 h-3 stroke-[4px]" />
                  </div>
                </button>
              ))}
            </div>

            {/* CTA Button */}
            <div className="pt-6">
              <button className="group relative px-10 py-5 bg-slate-900 text-white rounded-2xl font-black text-[10px] uppercase tracking-widest overflow-hidden hover:bg-blue-600 transition-all shadow-xl shadow-slate-200">
                <span className="relative z-10 flex items-center gap-4">
                  Check Availability <ArrowRight className="w-4 h-4 group-hover:translate-x-2 transition-transform" />
                </span>
              </button>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};

export default FleetColors;
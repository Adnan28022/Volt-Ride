import React from "react";
import {
  ShieldCheck,
  AlertTriangle,
  HardHat,
  ParkingCircle,
  MinusCircle,
  HeartPulse,
  UserCheck,
} from "lucide-react";

const SafetyRules = () => {
  const rules = [
    {
      title: "Wear a Helmet",
      desc: "Apni hifazat ke liye hamesha helmet ka istemal karein.",
      icon: <HardHat className="w-6 h-6" />,
      color: "bg-blue-500",
      lightColor: "bg-blue-50",
    },
    {
      title: "Ride Solo",
      desc: "E-Bike sirf aik fard ke liye design ki gayi hai.",
      icon: <UserCheck className="w-6 h-6" />,
      color: "bg-green-500",
      lightColor: "bg-green-50",
    },
    {
      title: "Smart Parking",
      desc: "Hamesha designated Volt zones mein hi park karein.",
      icon: <ParkingCircle className="w-6 h-6" />,
      color: "bg-slate-900",
      lightColor: "bg-slate-100",
    },
    {
      title: "Follow Traffic",
      desc: "Traffic signal aur rules ki mukammal pabandi karein.",
      icon: <AlertTriangle className="w-6 h-6" />,
      color: "bg-amber-500",
      lightColor: "bg-amber-50",
    },
  ];

  return (
    <section className="py-24 bg-white relative overflow-hidden">
      <div className="container mx-auto px-4 md:px-24 relative z-10">
        
        {/* --- Fully Centered Header --- */}
        <div className="flex flex-col items-center text-center max-w-3xl mx-auto mb-16">
          <div className="flex items-center gap-3 mb-6">
            <span className="w-6 h-[2px] bg-green-500"></span>
            <span className="text-[10px] font-black text-green-600 uppercase tracking-[0.3em]">
              Safety Protocol
            </span>
            <span className="w-6 h-[2px] bg-green-500"></span>
          </div>
          
          <h2 className="text-4xl lg:text-6xl font-black text-slate-900 tracking-tighter italic uppercase leading-[0.95] mb-6">
            Ride Smart, <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-600 to-blue-600 font-bold not-italic">
              Stay Safe.
            </span>
          </h2>
          
          <p className="text-slate-500 text-sm md:text-base font-medium max-w-md italic leading-relaxed">
            "Aapki hifazat hamari sab se barri priority hai. In asaan rules ko follow karein."
          </p>
        </div>

        {/* Rules Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {rules.map((rule, i) => (
            <div
              key={i}
              className="group p-8 rounded-[2rem] bg-slate-50 border border-slate-100 transition-all duration-500 hover:bg-white hover:shadow-2xl hover:shadow-slate-200 hover:-translate-y-2 flex flex-col items-center text-center"
            >
              <div
                className={`w-14 h-14 ${rule.lightColor} rounded-2xl flex items-center justify-center mb-8 group-hover:scale-110 transition-transform`}
              >
                <div
                  className={`${rule.color} p-2.5 rounded-xl text-white shadow-lg`}
                >
                  {rule.icon}
                </div>
              </div>
              <h3 className="text-lg font-black text-slate-900 uppercase tracking-tight mb-3">
                {rule.title}
              </h3>
              <p className="text-slate-500 text-xs font-bold leading-relaxed">
                {rule.desc}
              </p>
            </div>
          ))}
        </div>

        {/* Emergency Banner */}
        <div className="mt-16 p-1 bg-gradient-to-r from-green-500 via-blue-600 to-slate-900 rounded-[2.5rem]">
          <div className="bg-white rounded-[2.4rem] p-8 lg:p-12 flex flex-col lg:flex-row items-center justify-between gap-8">
            <div className="flex flex-col md:flex-row items-center text-center md:text-left gap-6">
              <div className="w-16 h-16 bg-red-50 rounded-full flex items-center justify-center animate-pulse shrink-0">
                <HeartPulse className="w-8 h-8 text-red-500" />
              </div>
              <div>
                <h4 className="text-xl font-black text-slate-900 uppercase tracking-tight">
                  Emergency Support
                </h4>
                <p className="text-slate-500 text-sm font-medium italic">
                  Kisi bhi maslay ki surat mein hamari team 24/7 haazir hai.
                </p>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <button className="px-8 py-4 bg-slate-900 text-white rounded-2xl font-black text-[10px] uppercase tracking-widest hover:bg-green-600 transition-colors shadow-xl shadow-slate-200">
                Contact SOS
              </button>
              <div className="hidden sm:flex flex-col items-center px-6 border-l border-slate-100">
                <span className="text-[10px] font-black text-slate-300 uppercase tracking-widest">
                  Available
                </span>
                <span className="text-sm font-black text-green-500">
                  24 / 7
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SafetyRules;
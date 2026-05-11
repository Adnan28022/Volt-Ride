import React from "react";
import { Radio, HeartPulse, ShieldCheck, Zap } from "lucide-react";

const SafetyFeatures = () => {
  const features = [
    {
      title: "Real-time GPS Monitoring",
      description:
        "Our live tracking team monitors every bike 24/7. If a bike deviates from the route or any issue arises, we take immediate action.",
      icon: <Radio className="w-7 h-7 text-blue-500" />,
      tag: "Live",
    },
    {
      title: "Health & Impact Sensors",
      description:
        "Bikes come with built-in sensors that detect accidents or heavy impacts, sending an instant emergency alert to our control center.",
      icon: <HeartPulse className="w-7 h-7 text-red-500" />,
      tag: "Critical",
    },
    {
      title: "Auto-Speed Limiter",
      description:
        "VoltRide bikes are programmed according to city speed limits. They automatically regulate speed in congested or sensitive areas.",
      icon: <Zap className="w-7 h-7 text-orange-500" />,
      tag: "Smart",
    },
    {
      title: "Triple Braking System",
      description:
        "A combination of electronic and mechanical brakes providing instant stopping power in all conditions, including rain or steep slopes.",
      icon: <ShieldCheck className="w-7 h-7 text-green-500" />,
      tag: "Hardware",
    },
  ];

  return (
    <section className="py-20 bg-slate-50">
      <div className="container mx-auto px-4 md:px-24">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-5xl font-black text-slate-900 mb-4 tracking-tighter">
            Modern Tech for Secure Rides
          </h2>
          <div className="w-24 h-1.5 bg-green-500 mx-auto rounded-full"></div>
          <p className="text-slate-500 mt-6 max-w-2xl mx-auto font-medium">
            Every bike is equipped with cutting-edge technology to ensure your
            journey on the roads of Pakistan remains relaxed and safe.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((f, i) => (
            <div
              key={i}
              className="group bg-white p-8 rounded-[2.5rem] border border-slate-100 hover:border-green-200 hover:shadow-2xl hover:shadow-green-100/50 transition-all duration-300"
            >
              <div className="flex justify-between items-start mb-6">
                <div className="p-4 bg-slate-50 rounded-2xl group-hover:bg-green-50 group-hover:scale-110 transition-all duration-300">
                  {f.icon}
                </div>
                <span className="text-[10px] font-black uppercase tracking-widest bg-slate-100 text-slate-500 px-3 py-1 rounded-full group-hover:bg-green-500 group-hover:text-white transition-colors">
                  {f.tag}
                </span>
              </div>

              <h3 className="text-xl font-bold text-slate-900 mb-3 leading-tight">
                {f.title}
              </h3>

              <p className="text-slate-500 text-sm leading-relaxed font-medium">
                {f.description}
              </p>
            </div>
          ))}
        </div>

        {/* Bottom CTA for Trust */}
        <div className="mt-16 bg-slate-900 rounded-[3rem] p-8 lg:p-12 flex flex-col lg:flex-row items-center justify-between gap-8">
          <div className="flex items-center gap-6">
            <div className="hidden sm:flex -space-x-4">
              {[1, 2, 3, 4].map((i) => (
                <div
                  key={i}
                  className="w-12 h-12 rounded-full border-4 border-slate-900 bg-slate-700 flex items-center justify-center overflow-hidden"
                >
                  <img
                    src={`https://i.pravatar.cc/150?u=volt${i}`}
                    alt={`Rider ${i}`}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      e.target.src = "https://ui-avatars.com/api/?background=random&color=fff&name=User";
                    }}
                  />
                </div>
              ))}
            </div>
            <div>
              <p className="text-white font-bold text-lg">
                50,000+ Safe Rides Completed
              </p>
              <p className="text-slate-400 text-sm font-medium">
                Joined by thousands of safe riders in Pakistan
              </p>
            </div>
          </div>
          <button className="bg-green-500 hover:bg-green-600 text-white font-black px-10 py-4 rounded-2xl transition-all shadow-lg shadow-green-500/20 whitespace-nowrap uppercase tracking-wider text-sm">
            Start Riding With Us
          </button>
        </div>
      </div>
    </section>
  );
};

export default SafetyFeatures;
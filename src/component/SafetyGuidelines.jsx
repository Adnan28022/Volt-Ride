import React from "react";
import { CheckCircle2, AlertTriangle, Bike, Shield } from "lucide-react";

const SafetyGuidelines = () => {
  const steps = [
    {
      id: "01",
      title: "Check Your Bike",
      desc: "After unlocking the bike via the app, take a moment to check the brakes, tires, and battery level.",
      icon: <Bike className="w-6 h-6 text-green-500" />,
    },
    {
      id: "02",
      title: "Wear a Helmet",
      desc: "Always wear a helmet before starting your journey. Never compromise on your personal safety.",
      icon: <Shield className="w-6 h-6 text-blue-500" />,
    },
    {
      id: "03",
      title: "Follow Traffic Rules",
      desc: "Always stay in the left lane and follow traffic signals. Avoid over-speeding at all costs.",
      icon: <CheckCircle2 className="w-6 h-6 text-orange-500" />,
    },
    {
      id: "04",
      title: "Park Responsibly",
      desc: "After ending your ride, park the bike in the designated parking zone so that the path is not blocked.",
      icon: <AlertTriangle className="w-6 h-6 text-red-500" />,
    },
  ];

  return (
    <section className="py-24 bg-white">
      <div className="container mx-auto px-4 md:px-24">
        <div className="flex flex-col lg:flex-row gap-16 items-center">
          {/* Left Side: Visual Text */}
          <div className="lg:w-1/3">
            <h2 className="text-4xl font-black text-slate-900 leading-tight tracking-tighter mb-6">
              Safe Riding <br />
              <span className="text-green-600">Step-by-Step</span>
            </h2>
            <p className="text-slate-500 font-medium mb-8">
              Becoming a responsible rider is easy. Just follow these 4 basic rules
              to make your journey secure and comfortable.
            </p>
            <div className="p-6 bg-slate-50 rounded-[2rem] border border-dashed border-slate-200">
              <p className="text-sm text-slate-600 italic">
                "Our goal is to make Pakistan pollution-free and safe,
                and your cooperation is essential in this mission."
              </p>
            </div>
          </div>

          {/* Right Side: Step Cards */}
          <div className="lg:w-2/3 grid grid-cols-1 md:grid-cols-2 gap-6">
            {steps.map((step, index) => (
              <div
                key={index}
                className="relative p-8 rounded-[2.5rem] border border-slate-100 bg-white hover:shadow-xl hover:shadow-slate-100 transition-all duration-300 group"
              >
                <span className="absolute top-6 right-8 text-5xl font-black text-slate-50 opacity-10 group-hover:opacity-20 transition-opacity italic">
                  {step.id}
                </span>

                <div className="w-14 h-14 bg-slate-50 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-green-50 transition-colors">
                  {step.icon}
                </div>

                <h3 className="text-xl font-black text-slate-900 mb-3 tracking-tight">
                  {step.title}
                </h3>

                <p className="text-slate-500 text-sm leading-relaxed font-medium">
                  {step.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default SafetyGuidelines;
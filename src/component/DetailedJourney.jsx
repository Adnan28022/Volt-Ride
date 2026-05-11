import React from "react";
import {
  Smartphone,
  QrCode,
  Navigation2,
  CheckCircle2,
  ArrowRight,
  ShieldCheck,
  Clock,
} from "lucide-react";

const DetailedJourney = () => {
  const steps = [
    {
      title: "Find Your Volt",
      point1: "App open karein aur kareebi station dekhein.",
      point2: "Bike ki battery status pehle hi check karein.",
      point3: "10 minute ke liye bike reserve bhi kar sakte hain.",
      icon: <Navigation2 className="w-5 h-5" />,
      color: "blue",
      badge: "Real-time Tracking",
      mockupLabel: "Nearby Stations",
    },
    {
      title: "Scan & Go",
      point1: "Handlebar par maujood QR code scan karein.",
      point2: "Bluetooth automatic connect ho jayega.",
      point3: "Smart lock foran release ho jata hai.",
      icon: <QrCode className="w-5 h-5" />,
      color: "green",
      badge: "Instant Access",
      mockupLabel: "Secure Scanning",
    },
    {
      title: "Park & End Ride",
      point1: "Designated parking zone talash karein.",
      point2: "App mein 'End Ride' button dabayein.",
      point3: "Safar ki summary aur cost foran dekhein.",
      icon: <CheckCircle2 className="w-5 h-5" />,
      color: "slate",
      badge: "Safe Parking",
      mockupLabel: "Ride Summary",
    },
  ];

  return (
    <section className="py-24 bg-white">
      <div className="container mx-auto px-6">
        {/* Section Header */}
        <div className="mb-20">
          <h2 className="text-2xl font-black text-slate-900 tracking-tighter uppercase italic border-l-4 border-green-500 pl-4">
            The Full Experience
          </h2>
          <p className="text-slate-500 text-sm mt-2 font-medium">
            A step-by-step guide to your next sustainable ride.
          </p>
        </div>

        <div className="space-y-40">
          {steps.map((step, i) => (
            <div
              key={i}
              className={`flex flex-col lg:flex-row items-center gap-12 lg:gap-24 ${
                i % 2 !== 0 ? "lg:flex-row-reverse" : ""
              }`}
            >
              {/* --- Content Side --- */}
              <div className="flex-1 space-y-6">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-lg bg-slate-50 border border-slate-100">
                  <span
                    className={`w-2 h-2 rounded-full animate-pulse bg-${step.color}-500`}
                  ></span>
                  <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">
                    {step.badge}
                  </span>
                </div>

                <h3 className="text-4xl font-black text-slate-900 tracking-tighter leading-none">
                  <span className="text-slate-300 mr-4 not-italic">
                    0{i + 1}
                  </span>
                  {step.title}
                </h3>

                <div className="space-y-4">
                  {[step.point1, step.point2, step.point3].map((point, idx) => (
                    <div
                      key={idx}
                      className="group flex items-center gap-4 p-4 rounded-2xl transition-all hover:bg-slate-50 border border-transparent hover:border-slate-100"
                    >
                      <div
                        className={`w-8 h-8 rounded-xl bg-${step.color}-50 flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform`}
                      >
                        {idx === 0 ? (
                          <Smartphone className="w-4 h-4" />
                        ) : idx === 1 ? (
                          <Clock className="w-4 h-4" />
                        ) : (
                          <ShieldCheck className="w-4 h-4" />
                        )}
                      </div>
                      <p className="text-slate-600 text-sm font-semibold leading-snug">
                        {point}
                      </p>
                    </div>
                  ))}
                </div>

                <button className="flex items-center gap-3 text-[11px] font-black uppercase tracking-[0.2em] text-slate-400 hover:text-slate-900 transition-colors group">
                  Detailed Documentation
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-2 transition-transform" />
                </button>
              </div>

              {/* --- Visual Side --- */}
              <div className="flex-1 w-full relative">
                {/* Background Glow */}
                <div
                  className={`absolute inset-0 bg-${step.color}-100/30 blur-[100px] rounded-full`}
                ></div>

                <div className="relative aspect-square lg:aspect-video bg-slate-50 rounded-[3rem] border border-slate-100 shadow-sm flex items-center justify-center overflow-hidden group">
                  {/* Floating Tech Elements */}
                  <div className="absolute top-10 right-10 w-20 h-20 bg-white/40 backdrop-blur-xl rounded-3xl border border-white/50 shadow-xl flex items-center justify-center animate-bounce">
                    <div className={`text-${step.color}-600`}>{step.icon}</div>
                  </div>

                  {/* Minimal Mockup Container */}
                  <div className="w-56 h-[400px] bg-white rounded-[2.5rem] shadow-2xl border-[6px] border-slate-900 p-3 relative transform group-hover:rotate-2 transition-transform duration-700">
                    {/* Notch */}
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-24 h-6 bg-slate-900 rounded-b-2xl z-20 flex items-center justify-center">
                      <div className="w-8 h-1 bg-slate-800 rounded-full"></div>
                    </div>

                    {/* Screen Content */}
                    <div className="h-full w-full bg-slate-50 rounded-[1.8rem] overflow-hidden relative flex flex-col items-center justify-center">
                      <div className="absolute inset-0 opacity-20 bg-[radial-gradient(#e2e8f0_1px,transparent_1px)] [background-size:16px_16px]"></div>
                      <p className="text-[10px] font-black text-slate-300 uppercase tracking-tighter mb-4">
                        {step.mockupLabel}
                      </p>
                      <div
                        className={`w-16 h-16 rounded-2xl bg-${step.color}-500/10 flex items-center justify-center animate-pulse`}
                      >
                        <div
                          className={`w-8 h-8 rounded-lg bg-${step.color}-500/20`}
                        ></div>
                      </div>
                    </div>
                  </div>

                  {/* Bottom Stats Card - Floating */}
                  <div className="absolute bottom-10 left-10 p-5 bg-white/80 backdrop-blur-md rounded-2xl border border-white shadow-xl flex items-center gap-4 animate-pulse">
                    <div className="w-2 h-12 bg-green-500 rounded-full"></div>
                    <div>
                      <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">
                        Efficiency
                      </p>
                      <p className="text-lg font-black text-slate-900 italic">
                        98.4%
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default DetailedJourney;

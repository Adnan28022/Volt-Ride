import { MapPin, Smartphone, Zap, CheckCircle2 } from "lucide-react";

const HowItWorks = () => {
  const steps = [
    {
      icon: <MapPin size={32} />,
      title: "Locate Bike",
      description: "Open the app and find a bike available at your nearest Volt Station.",
      color: "from-blue-500/20 to-cyan-400/20",
      iconColor: "text-blue-600"
    },
    {
      icon: <Smartphone size={32} />,
      title: "Scan & Unlock",
      description: "Scan the QR code on the bike to unlock it instantly.",
      color: "from-green-500/20 to-emerald-400/20",
      iconColor: "text-green-600"
    },
    {
      icon: <Zap size={32} />,
      title: "Ride Electric",
      description: "Enjoy an affordable and pollution-free ride across the city.",
      color: "from-yellow-500/20 to-orange-400/20",
      iconColor: "text-amber-600"
    }
  ];

  return (
    <section className="py-24 bg-white relative overflow-hidden">
      {/* Decorative Background Text - Light version */}
      <div className="absolute top-10 left-1/2 -translate-x-1/2 text-[12rem] font-black text-slate-100/50 select-none uppercase tracking-tighter whitespace-nowrap z-0">
        Volt Process
      </div>

      <div className="container mx-auto px-4 md:px-24 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-20">
          <h2 className="text-sm font-black text-green-600 uppercase tracking-[0.3em] mb-4">
            Simple & Fast
          </h2>
          <h3 className="text-4xl md:text-5xl font-black text-slate-900 mb-6">
            Start Your <span className="text-slate-400 italic font-medium">Journey</span> in 3 Steps
          </h3>
          <p className="text-slate-500 text-lg leading-relaxed">
            Using VoltRide is as easy as sending a message.
            No long paperwork, just scan and you are ready to go.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-12 relative">
          {/* Connecting Line (Desktop Only) - Subtle Light version */}
          <div className="hidden md:block absolute top-[48px] left-0 w-full h-[2px] bg-slate-100 z-0"></div>

          {steps.map((step, idx) => (
            <div key={idx} className="relative group z-10 text-center space-y-6">
              {/* Icon Container */}
              <div className="relative mx-auto w-24 h-24">
                {/* Subtle Glow Backdrop */}
                <div className={`absolute inset-0 bg-gradient-to-br ${step.color} opacity-40 blur-2xl group-hover:opacity-80 transition-opacity rounded-full`}></div>

                <div className="relative w-full h-full flex items-center justify-center bg-white border border-slate-100 rounded-[2rem] shadow-xl shadow-slate-200/50 group-hover:border-green-500/30 transition-all duration-500 group-hover:-translate-y-2">
                  <div className={step.iconColor}>{step.icon}</div>

                  {/* Step Number Badge */}
                  <div className="absolute -top-2 -right-2 w-8 h-8 bg-green-500 text-white text-xs font-black rounded-full flex items-center justify-center shadow-lg border-4 border-white">
                    0{idx + 1}
                  </div>
                </div>
              </div>

              {/* Content */}
              <div className="space-y-3">
                <h4 className="text-2xl font-bold text-slate-900 tracking-tight group-hover:text-green-600 transition-colors">
                  {step.title}
                </h4>
                <p className="text-slate-500 text-sm leading-relaxed max-w-[250px] mx-auto font-medium">
                  {step.description}
                </p>
              </div>

              {/* Success Indicator - Subtle in light mode */}
              <div className="flex justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-500 translate-y-2 group-hover:translate-y-0">
                <CheckCircle2 size={24} className="text-green-500 shadow-sm" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
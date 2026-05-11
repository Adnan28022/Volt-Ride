import { ShieldCheck, CloudLightning, Headphones, Leaf, Wallet, Map } from "lucide-react";

const WhyChooseUs = () => {
  const features = [
    {
      icon: <ShieldCheck size={32} />,
      title: "Full Safety",
      description: "Every ride is insured and our bikes are equipped with a real-time GPS tracking system.",
      color: "bg-blue-50 text-blue-600"
    },
    {
      icon: <CloudLightning size={32} />,
      title: "Fast Charging",
      description: "Volt stations are spread across the city, where bikes can be charged in just 20 minutes.",
      color: "bg-green-50 text-green-600"
    },
    {
      icon: <Wallet size={32} />,
      title: "Cost Effective",
      description: "Escape the rising costs of petrol. Our rides are 60% more affordable.",
      color: "bg-amber-50 text-amber-600"
    },
    {
      icon: <Leaf size={32} />,
      title: "Eco Friendly",
      description: "Join us in making the city clean and pleasant with zero carbon emissions.",
      color: "bg-emerald-50 text-emerald-600"
    },
    {
      icon: <Map size={32} />,
      title: "Smart Navigation",
      description: "The app features optimized routes and real-time traffic updates built right in.",
      color: "bg-purple-50 text-purple-600"
    },
    {
      icon: <Headphones size={32} />,
      title: "24/7 Support",
      description: "If any issue arises on the road, our helpline team is always just a call away.",
      color: "bg-rose-50 text-rose-600"
    }
  ];

  return (
    <section className="py-24 bg-white relative">
      <div className=" mx-auto px-4 md:px-24">

        {/* Section Header - Centered */}
        <div className="text-center max-w-2xl mx-auto mb-20">
          <h2 className="text-sm font-black text-green-600 uppercase tracking-[0.3em] mb-4">
            Advantages
          </h2>
          <h3 className="text-4xl md:text-5xl font-black text-slate-900 mb-6 leading-tight">
            The New Era of <span className="text-green-500 italic">Smart Ride</span>
          </h3>
          <p className="text-slate-500 font-medium leading-relaxed">
            VoltRide is not just a bike, it’s a complete lifestyle. We provide you
            with excellent service and the promise of a peaceful journey.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, idx) => (
            <div
              key={idx}
              className="group p-10 bg-slate-50/50 rounded-[3rem] border border-slate-100 hover:bg-white hover:shadow-2xl hover:shadow-slate-200/50 transition-all duration-500 hover:-translate-y-2"
            >
              {/* Icon Box */}
              <div className={`w-16 h-16 ${feature.color} rounded-2xl flex items-center justify-center mb-8 group-hover:scale-110 transition-transform duration-500 shadow-sm`}>
                {feature.icon}
              </div>

              {/* Text Content */}
              <div className="space-y-4">
                <h4 className="text-2xl font-black text-slate-900 tracking-tight">
                  {feature.title}
                </h4>
                <p className="text-slate-500 text-sm leading-relaxed font-medium">
                  {feature.description}
                </p>
              </div>

              {/* Bottom Decorative Element */}
              <div className="mt-8 pt-6 border-t border-slate-100 flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-green-500 group-hover:w-8 transition-all duration-500"></div>
                <span className="text-[10px] font-black text-slate-300 uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-opacity">
                  Verified
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;
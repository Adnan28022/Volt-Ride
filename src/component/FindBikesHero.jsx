import * as Lucide from "lucide-react";

const FindBikesHero = ({ setSearchQuery }) => {
  return (
    <section className="relative pt-20 pb-20 lg:pt-32 lg:pb-32 bg-slate-50 overflow-hidden">
      {/* Background Abstract Shape */}
      <div className="absolute top-0 right-0 w-1/3 h-full bg-green-500/5 skew-x-12 translate-x-20 z-0 hidden lg:block"></div>

      <div className="container mx-auto px-6 lg:px-24 relative z-10">
        <div className="flex flex-col lg:flex-row items-center gap-16">
          <div className="w-full lg:w-3/5 text-center lg:text-left">
            <div className="inline-flex items-center gap-2 bg-green-100 text-green-700 px-4 py-2 rounded-full mb-8">
              <Lucide.MapPin size={16} className="animate-pulse" />
              <span className="text-xs font-black uppercase tracking-widest">
                150+ Stations Live in Lahore
              </span>
            </div>

            <h1 className="text-5xl md:text-7xl font-black text-slate-900 mb-8 leading-[1.1]">
              Find a{" "}
              <span className="text-green-500 italic underline decoration-slate-200">
                Volt Station
              </span>{" "}
              Near You
            </h1>

            <p className="text-slate-500 text-lg mb-10 max-w-xl mx-auto lg:mx-0 font-medium leading-relaxed">
              Experience the future of urban mobility. Simply enter your area to
              discover available e-bikes and charging hubs around you.
            </p>

            {/* Search Box */}
            <div className="bg-white p-3 rounded-[2.5rem] shadow-2xl shadow-slate-200 border border-slate-100 max-w-3xl">
              <div className="grid md:grid-cols-12 gap-2">
                <div className="md:col-span-7 relative group">
                  <div className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-green-500 transition-colors">
                    <Lucide.Search size={20} />
                  </div>
                  <input
                    type="text"
                    placeholder="Enter area (e.g. Gulberg, DHA...)"
                    className="w-full bg-slate-50 border-none rounded-2xl py-5 pl-14 pr-6 text-sm font-bold focus:ring-2 focus:ring-green-500/20 transition-all outline-none"
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>

                <div className="md:col-span-5">
                  <button className="w-full h-full bg-slate-900 text-white rounded-2xl py-5 md:py-0 font-black uppercase tracking-widest hover:bg-green-600 transition-all shadow-lg flex items-center justify-center gap-3">
                    Search Now
                    <Lucide.ArrowRight size={18} />
                  </button>
                </div>
              </div>
            </div>

            <div className="mt-8 flex flex-wrap justify-center lg:justify-start gap-8 opacity-60">
              <div className="flex items-center gap-2">
                <Lucide.CheckCircle2 size={16} className="text-green-600" />
                <span className="text-[10px] font-black uppercase tracking-widest">
                  No Booking Fees
                </span>
              </div>
              <div className="flex items-center gap-2">
                <Lucide.CheckCircle2 size={16} className="text-green-600" />
                <span className="text-[10px] font-black uppercase tracking-widest">
                  Instant Unlock
                </span>
              </div>
            </div>
          </div>

          <div className="w-full lg:w-2/5 relative">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-green-400/20 rounded-full blur-[80px] z-0"></div>
            <div className="relative z-10 animate-float">
              <img
                src="https://images.olx.com.pk/thumbnails/607622622-400x300.jpeg"
                alt="VoltRide E-Bike"
                className="w-full h-auto rounded-[3rem] shadow-2xl rotate-3 hover:rotate-0 transition-transform duration-700"
              />
            </div>
          </div>
        </div>
      </div>
      <style>{`
        @keyframes float { 0%, 100% { transform: translateY(0px); } 50% { transform: translateY(-20px); } }
        .animate-float { animation: float 6s ease-in-out infinite; }
      `}</style>
    </section>
  );
};

export default FindBikesHero;

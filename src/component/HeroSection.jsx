import { ArrowRight, Bike, ShieldCheck, Zap, Smartphone, ChevronDown } from "lucide-react";

const HeroSection = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center bg-[#0B0F1A] overflow-hidden">
      
      {/* --- Background Architecture --- */}
      <div className="absolute inset-0 z-0">
        {/* Thematic Hero Image with targeted opacity */}
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-40 scale-105"
          style={{ 
            backgroundImage: `url('https://i.dawn.com/large/2026/04/050448194bfb8c9.webp')`,
            animation: 'slow-pan 30s infinite alternate ease-in-out'
          }}
        ></div>
        
        {/* Radial Vignette */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,#0B0F1A_80%)]"></div>
        <div className="absolute inset-0 bg-gradient-to-b from-[#0B0F1A]/80 via-transparent to-[#0B0F1A]"></div>
        
        {/* Subtle Tech Grid */}
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-10 mix-blend-overlay"></div>
        
        {/* Floating Light Orbs */}
        <div className="absolute top-1/4 -left-20 w-96 h-96 bg-green-500/15 rounded-full blur-[120px] animate-pulse"></div>
        <div className="absolute bottom-1/4 -right-20 w-96 h-96 bg-emerald-500/10 rounded-full blur-[120px]"></div>
      </div>

      <div className="container mx-auto px-6 relative z-10 pt-20">
        <div className="max-w-4xl mx-auto text-center space-y-8">
          
          {/* 1. Refined Badge */}
          <div className="inline-flex items-center gap-3 bg-white/5 backdrop-blur-md border border-white/10 px-4 py-2 rounded-full shadow-xl">
            <span className="flex h-2 w-2 rounded-full bg-green-500 animate-pulse"></span>
            <span className="text-[10px] font-black text-slate-300 uppercase tracking-[0.3em]">
              Next-Gen Electric Fleet
            </span>
          </div>

          {/* 2. Balanced Heading */}
          <h1 className="text-5xl md:text-7xl font-black text-white leading-[1.1] tracking-tight">
            Pakistan's Premier <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-400 via-emerald-400 to-green-500">
              E-Mobility Experience
            </span>
          </h1>

          {/* 3. Optimized Description */}
          <p className="text-slate-400 text-base md:text-lg max-w-2xl mx-auto leading-relaxed font-medium">
            Ditch the traffic and embrace the future. VoltRide offers smart, 
            eco-friendly, and affordable electric bike rentals for your daily commute.
          </p>

          {/* 4. Compact & Attractive Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
            <button className="group relative w-full sm:w-auto bg-green-500 px-8 py-4 rounded-xl font-black text-black text-sm transition-all hover:scale-105 active:scale-95 shadow-[0_15px_30px_-10px_rgba(34,197,94,0.4)]">
              <span className="flex items-center justify-center gap-2">
                START RIDING <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
              </span>
            </button>

            <button className="w-full sm:w-auto bg-white/5 backdrop-blur-md border border-white/10 text-white px-8 py-4 rounded-xl font-bold text-sm hover:bg-white/10 transition-all">
              EXPLORE FLEET
            </button>
          </div>

          {/* 5. Minimalist Features Section */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-20 pt-10 border-t border-white/5">
            {[
              { icon: <Zap size={20} />, title: "Quick Charge", desc: "Long range, zero delay." },
              { icon: <ShieldCheck size={20} />, title: "Secure Trip", desc: "Fully insured rides." },
              { icon: <Smartphone size={20} />, title: "App Access", desc: "Tap to unlock instantly." }
            ].map((f, idx) => (
              <div key={idx} className="flex items-center md:justify-center gap-4 p-4">
                <div className="flex-shrink-0 w-10 h-10 rounded-xl bg-green-500/10 flex items-center justify-center text-green-500 border border-green-500/20">
                  {f.icon}
                </div>
                <div className="text-left">
                  <h4 className="text-white font-bold text-sm tracking-tight">{f.title}</h4>
                  <p className="text-slate-500 text-[11px] leading-none mt-1">{f.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 text-slate-500 animate-bounce opacity-50 hidden md:block">
        <ChevronDown size={24} />
      </div>

      {/* Standard Style tag for React - Error Resolved */}
      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes slow-pan {
          0% { transform: scale(1.05) translateX(0); }
          100% { transform: scale(1.15) translateX(-2%); }
        }
      ` }} />
    </section>
  );
};

export default HeroSection;
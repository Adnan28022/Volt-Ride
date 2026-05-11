import React from 'react';
import { ShieldCheck, Lock, Map, Zap } from 'lucide-react'; // Using Lucide icons

const SafetyHero = () => {
  return (
    <section className="relative overflow-hidden bg-white pt-24 pb-16 lg:pt-32 lg:pb-24">
      {/* Background Subtle Pattern */}
      <div className="absolute inset-0 z-0 opacity-40">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-green-100 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-blue-100 rounded-full blur-3xl animate-pulse"></div>
      </div>

      <div className="container mx-auto px-4 md:px-24 relative z-10">
        <div className="flex flex-col lg:flex-row items-center gap-12">

          {/* Left Side: Content */}
          <div className="flex-1 text-center lg:text-left">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-green-50 border border-green-100 mb-6">
              <ShieldCheck className="w-4 h-4 text-green-600" />
              <span className="text-xs font-black text-green-700 uppercase tracking-widest">Safety First, Always</span>
            </div>

            <h1 className="text-4xl lg:text-6xl font-black text-slate-900 leading-[1.1] mb-6">
              Your Safety is <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-600 to-blue-600">
                Our Priority.
              </span>
            </h1>

            <p className="text-slate-500 text-lg max-w-xl mb-10 leading-relaxed font-medium">
              Every journey on VoltRide is secure. We have integrated modern technology and real-time monitoring so you can enjoy your ride without any worries.
            </p>

            <div className="flex flex-wrap justify-center lg:justify-start gap-4">
              <button className="px-8 py-4 bg-slate-900 text-white rounded-2xl font-bold hover:bg-slate-800 transition-all shadow-xl shadow-slate-200">
                View Safety Protocols
              </button>
              <button className="px-8 py-4 border-2 border-slate-100 text-slate-600 rounded-2xl font-bold hover:bg-slate-50 transition-all">
                Help Center
              </button>
            </div>
          </div>

          {/* Right Side: Visual Grid */}
          <div className="flex-1 w-full max-w-lg lg:max-w-none">
            <div className="grid grid-cols-2 gap-4">
              {/* Card 1 */}
              <div className="bg-white p-6 rounded-[2rem] border border-slate-100 shadow-xl shadow-slate-50 transform hover:-translate-y-2 transition-transform">
                <div className="w-12 h-12 bg-green-500 rounded-2xl flex items-center justify-center text-white mb-4 shadow-lg shadow-green-200">
                  <Lock className="w-6 h-6" />
                </div>
                <h3 className="font-bold text-slate-900 mb-2">Smart Lock</h3>
                <p className="text-xs text-slate-400 font-medium">Automatic locking technology enabled after every ride.</p>
              </div>

              {/* Card 2 */}
              <div className="bg-white p-6 rounded-[2rem] border border-slate-100 shadow-xl shadow-slate-50 mt-8 transform hover:-translate-y-2 transition-transform">
                <div className="w-12 h-12 bg-blue-500 rounded-2xl flex items-center justify-center text-white mb-4 shadow-lg shadow-blue-200">
                  <Map className="w-6 h-6" />
                </div>
                <h3 className="font-bold text-slate-900 mb-2">Live Tracking</h3>
                <p className="text-xs text-slate-400 font-medium">24/7 GPS monitoring and advanced incident detection.</p>
              </div>

              {/* Card 3 */}
              <div className="bg-white p-6 rounded-[2rem] border border-slate-100 shadow-xl shadow-slate-50 -mt-4 transform hover:-translate-y-2 transition-transform">
                <div className="w-12 h-12 bg-orange-500 rounded-2xl flex items-center justify-center text-white mb-4 shadow-lg shadow-orange-200">
                  <Zap className="w-6 h-6" />
                </div>
                <h3 className="font-bold text-slate-900 mb-2">Battery Health</h3>
                <p className="text-xs text-slate-400 font-medium">Real-time battery and hardware diagnostics for every bike.</p>
              </div>

              {/* Card 4 - Trust Badge */}
              <div className="bg-slate-900 p-6 rounded-[2rem] flex flex-col justify-center items-center text-center transform hover:-translate-y-2 transition-transform mt-4">
                <p className="text-green-400 font-black text-3xl mb-1">100%</p>
                <p className="text-white text-[10px] font-bold uppercase tracking-widest">Insured Rides</p>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default SafetyHero;
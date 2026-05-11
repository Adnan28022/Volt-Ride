import React from "react";
import {
  PhoneCall,
  MessageSquare,
  AlertCircle,
  ShieldAlert,
} from "lucide-react";

const Support = () => {
  return (
    <section className="py-24 bg-slate-900 relative overflow-hidden">
      {/* Decorative Background Elements */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/10 blur-[100px] rounded-full"></div>
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-red-500/10 blur-[100px] rounded-full"></div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="px-4 md:px-24 mx-auto">
          {/* Header */}
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-red-500/10 border border-red-500/20 mb-6">
              <ShieldAlert className="w-4 h-4 text-red-500" />
              <span className="text-[10px] font-black text-red-400 uppercase tracking-[0.2em]">
                24/7 Assistance
              </span>
            </div>
            <h2 className="text-4xl lg:text-5xl font-black text-white mb-6 tracking-tighter">
              Need Help? We're <span className="text-red-500">Always</span>{" "}
              Here.
            </h2>
            <p className="text-slate-400 text-lg font-medium">
              In case of any incident or if you face any issue on the road,
              don't worry. Our dedicated support team is just a click away.
            </p>
          </div>

          {/* Action Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Helpline Card */}
            <div className="bg-slate-800/50 backdrop-blur-xl p-8 rounded-[2.5rem] border border-slate-700 hover:border-red-500/50 transition-all group">
              <div className="w-14 h-14 bg-red-500 rounded-2xl flex items-center justify-center text-white mb-6 shadow-lg shadow-red-500/20 group-hover:scale-110 transition-transform">
                <PhoneCall className="w-7 h-7" />
              </div>
              <h3 className="text-xl font-bold text-white mb-2">
                Emergency Hotline
              </h3>
              <p className="text-slate-400 text-sm mb-6 leading-relaxed">
                Call us immediately in the event of any accident or emergency.
              </p>
              <a
                href="tel:0800-VOLT"
                className="text-red-500 font-black text-lg hover:underline italic"
              >
                0800-VOLTRIDE
              </a>
            </div>

            {/* Chat Support Card */}
            <div className="bg-slate-800/50 backdrop-blur-xl p-8 rounded-[2.5rem] border border-slate-700 hover:border-blue-500/50 transition-all group">
              <div className="w-14 h-14 bg-blue-500 rounded-2xl flex items-center justify-center text-white mb-6 shadow-lg shadow-blue-500/20 group-hover:scale-110 transition-transform">
                <MessageSquare className="w-7 h-7" />
              </div>
              <h3 className="text-xl font-bold text-white mb-2">
                In-App Support
              </h3>
              <p className="text-slate-400 text-sm mb-6 leading-relaxed">
                Get instant help through the live chat feature within the app.
              </p>
              <button className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white text-xs font-black rounded-full transition-colors uppercase tracking-widest">
                Start Chat
              </button>
            </div>

            {/* Incident Report Card */}
            <div className="bg-slate-800/50 backdrop-blur-xl p-8 rounded-[2.5rem] border border-slate-700 hover:border-orange-500/50 transition-all group">
              <div className="w-14 h-14 bg-orange-500 rounded-2xl flex items-center justify-center text-white mb-6 shadow-lg shadow-orange-500/20 group-hover:scale-110 transition-transform">
                <AlertCircle className="w-7 h-7" />
              </div>
              <h3 className="text-xl font-bold text-white mb-2">
                Report Incident
              </h3>
              <p className="text-slate-400 text-sm mb-6 leading-relaxed">
                Report here if you experience any technical issues with the bike.
              </p>
              <button className="px-6 py-2 bg-slate-700 hover:bg-slate-600 text-white text-xs font-black rounded-full transition-colors uppercase tracking-widest">
                File Report
              </button>
            </div>
          </div>

          {/* Safety Partner Logos */}
          <div className="mt-20 pt-10 border-t border-slate-800 text-center">
            <p className="text-slate-500 text-xs font-bold uppercase tracking-[0.3em] mb-8">
              Official Safety Partners
            </p>
            <div className="flex flex-wrap justify-center gap-12 grayscale opacity-30">
              <span className="text-white font-black text-xl tracking-tighter">
                RESCUE 1122
              </span>
              <span className="text-white font-black text-xl tracking-tighter">
                TRAFFIC POLICE
              </span>
              <span className="text-white font-black text-xl tracking-tighter">
                EFU INSURANCE
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Support;
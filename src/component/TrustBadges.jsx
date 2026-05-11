import React from "react";
import { ShieldCheck, Lock, Globe, Award, CheckCircle } from "lucide-react";

const TrustBadges = () => {
  const badges = [
    {
      icon: <Lock className="w-6 h-6 text-indigo-600" />,
      title: "Secure Payments",
      desc: "SSL Encrypted Transactions",
      color: "bg-indigo-50",
    },
    {
      icon: <ShieldCheck className="w-6 h-6 text-green-600" />,
      title: "Data Privacy",
      desc: "GDPR Compliant Systems",
      color: "bg-green-50",
    },
    {
      icon: <Globe className="w-6 h-6 text-blue-600" />,
      title: "Carbon Neutral",
      desc: "100% Eco-Friendly Rides",
      color: "bg-blue-50",
    },
    {
      icon: <Award className="w-6 h-6 text-orange-600" />,
      title: "Certified Fleet",
      desc: "Regular Quality Audits",
      color: "bg-orange-50",
    },
  ];

  return (
    <section className="py-16 bg-white border-t border-slate-50">
      <div className="container mx-auto px-4 md:px-24">
        {/* Main Badges Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-12">
          {badges.map((badge, i) => (
            <div
              key={i}
              className="flex items-center gap-5 p-4 rounded-3xl transition-all hover:bg-slate-50 group"
            >
              <div
                className={`w-14 h-14 shrink-0 rounded-2xl ${badge.color} flex items-center justify-center group-hover:scale-110 transition-transform`}
              >
                {badge.icon}
              </div>
              <div className="flex flex-col">
                <h4 className="font-black text-slate-900 text-sm uppercase tracking-tight">
                  {badge.title}
                </h4>
                <p className="text-slate-400 text-xs font-medium">
                  {badge.desc}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Floating Trust Bar */}
        <div className="mt-16 flex flex-wrap justify-center items-center gap-8 lg:gap-16 opacity-40 grayscale hover:grayscale-0 transition-all duration-700">
          <div className="flex items-center gap-2">
            <CheckCircle className="w-5 h-5" />
            <span className="font-black text-xl tracking-tighter">PCI-DSS</span>
          </div>
          <div className="flex items-center gap-2">
            <CheckCircle className="w-5 h-5" />
            <span className="font-black text-xl tracking-tighter">
              ISO 27001
            </span>
          </div>
          <div className="flex items-center gap-2">
            <CheckCircle className="w-5 h-5" />
            <span className="font-black text-xl tracking-tighter">
              Verified by VISA
            </span>
          </div>
          <div className="flex items-center gap-2">
            <CheckCircle className="w-5 h-5" />
            <span className="font-black text-xl tracking-tighter">
              Stripe Verified
            </span>
          </div>
        </div>s
      </div>
    </section>
  );
};

export default TrustBadges;

import React from 'react';
import Support from '../component/Support';
import { 
  Search, 
  MessageCircle, 
  Mail, 
  PhoneCall, 
  LifeBuoy, 
  ChevronRight, 
  BookOpen, 
  Zap 
} from 'lucide-react';
import FAQ from '../component/FAQ';

const SupportPage = () => {
  const helpCategories = [
    { title: "Getting Started", icon: <Zap size={20} />, desc: "Learn the basics of our platform." },
    { title: "Account & Security", icon: <LifeBuoy size={20} />, desc: "Manage your profile and safety." },
    { title: "Payments & Pricing", icon: <BookOpen size={20} />, desc: "Everything about billing and rules." },
  ];

  return (
    <div className="min-h-screen bg-slate-50/50 pb-20">
      {/* 1. Hero Section with Search */}
      <div className="bg-slate-900 pt-20 pb-32 px-6 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-500/10 rounded-full -mr-48 -mt-48 blur-3xl"></div>
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <h1 className="text-3xl md:text-5xl font-black text-white uppercase tracking-tighter mb-6">
            How can we <span className="text-emerald-400">help you?</span>
          </h1>
          <div className="relative max-w-2xl mx-auto">
            <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
            <input 
              type="text" 
              placeholder="Search for articles, guides, or keywords..." 
              className="w-full pl-14 pr-6 py-5 bg-white/10 border border-white/10 rounded-[2rem] text-white backdrop-blur-md outline-none focus:bg-white focus:text-slate-900 transition-all shadow-2xl placeholder:text-slate-500"
            />
          </div>
        </div>
      </div>

      {/* 2. Main Content Grid */}
      <div className="px-4 md:px-24 mx-auto -mt-16 relative z-20">
        
        {/* Category Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {helpCategories.map((cat, idx) => (
            <div key={idx} className="bg-white p-8 rounded-[2.5rem] border border-slate-200 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all group cursor-pointer">
              <div className="w-12 h-12 bg-slate-50 rounded-2xl flex items-center justify-center text-slate-400 group-hover:bg-emerald-50 group-hover:text-emerald-500 transition-all mb-6">
                {cat.icon}
              </div>
              <h3 className="text-sm font-black text-slate-900 uppercase tracking-tight mb-2">{cat.title}</h3>
              <p className="text-xs text-slate-500 font-medium leading-relaxed mb-6">{cat.desc}</p>
              <div className="flex items-center gap-2 text-[10px] font-black text-emerald-600 uppercase tracking-widest">
                Browse Guides <ChevronRight size={14} />
              </div>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1  gap-10">
          {/* 3. Left: FAQ / Support Component (8 Columns) */}
          <div className="lg:col-span-8 space-y-8">
            <div className="bg-white rounded-[2.5rem] p-10 border border-slate-200 shadow-sm">
              <div className="flex items-center gap-4 mb-10">
                <div className="w-2 h-10 bg-emerald-500 rounded-full"></div>
                <h2 className="text-xl font-black text-slate-900 uppercase tracking-tighter">Frequently Asked Questions</h2>
              </div>
              
              {/* Aapka Purana Support Component Yahan Render Hoga */}
              <FAQ />
            </div>
          </div>

        
        </div>
      </div>
    </div>
  );
};

export default SupportPage;
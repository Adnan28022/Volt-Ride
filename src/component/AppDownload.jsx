import * as Lucide from "lucide-react";

const AppDownload = () => {
  const steps = [
    {
      icon: <Lucide.Globe size={20} />,
      title: "Visit Website",
      desc: "Open voltride.com in browser",
      color: "bg-blue-50 text-blue-600"
    },
    {
      icon: <Lucide.Share size={20} />,
      title: "Tap Share/Menu",
      desc: "Look for the share icon",
      color: "bg-amber-50 text-amber-600"
    },
    {
      icon: <Lucide.PlusSquare size={20} />,
      title: "Add to Home",
      desc: "Install instantly on phone",
      color: "bg-green-50 text-green-600"
    }
  ];

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-6 lg:px-24">
        <div className="relative bg-slate-50 rounded-[2.5rem] border border-slate-100 p-8 md:p-12 overflow-hidden">

          {/* Animated Background Pulse */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-green-500/5 rounded-full blur-3xl animate-pulse"></div>

          <div className="grid lg:grid-cols-2 gap-12 items-center">

            {/* Left Column: Info */}
            <div className="space-y-6">
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-white border border-slate-200 rounded-full shadow-sm">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                </span>
                <span className="text-[10px] font-black uppercase tracking-widest text-slate-500">PWA Technology</span>
              </div>

              <h2 className="text-3xl md:text-4xl font-black text-slate-900 leading-tight">
                Get the <span className="text-green-600">Volt App</span> <br />
                Without App Store
              </h2>

              <p className="text-slate-500 font-medium text-sm md:text-base max-w-md">
                Don't waste storage. Install our Progressive Web App (PWA) directly from your browser for a faster, lighter experience.
              </p>

              {/* Steps Area */}
              <div className="grid gap-4 mt-8">
                {steps.map((step, i) => (
                  <div
                    key={i}
                    className="group flex items-center gap-4 bg-white p-4 rounded-2xl border border-slate-100 hover:border-green-500/30 hover:shadow-md transition-all duration-300"
                  >
                    <div className={`${step.color} w-10 h-10 rounded-xl flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform`}>
                      {step.icon}
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-slate-900">{step.title}</h4>
                      <p className="text-xs text-slate-400 font-medium">{step.desc}</p>
                    </div>
                    <Lucide.ChevronRight size={16} className="ml-auto text-slate-300 group-hover:text-green-500 group-hover:translate-x-1 transition-all" />
                  </div>
                ))}
              </div>
            </div>

            {/* Right Column: Visual Mockup */}
            <div className="relative flex justify-center">
              {/* Sleek Minimalist Phone */}
              <div className="relative w-[260px] h-[480px] bg-slate-900 rounded-[2.5rem] border-[6px] border-white shadow-2xl shadow-slate-200 overflow-hidden">
                <div className="absolute inset-0 bg-white">
                  {/* Mock App UI */}
                  <div className="p-4 space-y-4">
                    <div className="flex justify-between items-center pt-2">
                      <div className="w-8 h-8 bg-slate-100 rounded-lg"></div>
                      <div className="w-20 h-2 bg-slate-100 rounded-full"></div>
                    </div>
                    <div className="h-40 bg-green-50 rounded-2xl flex items-center justify-center">
                      <Lucide.Bike size={48} className="text-green-600 opacity-40 animate-bounce" />
                    </div>
                    <div className="space-y-2">
                      <div className="h-3 w-full bg-slate-50 rounded-full"></div>
                      <div className="h-3 w-2/3 bg-slate-50 rounded-full"></div>
                    </div>
                    {/* Floating Install Prompt Mockup */}
                    <div className="absolute bottom-6 left-4 right-4 bg-white border border-slate-100 shadow-2xl rounded-2xl p-4 animate-in fade-in slide-in-from-bottom-4 duration-1000">
                      <p className="text-[10px] font-black uppercase text-slate-400 mb-2">Add to Home Screen</p>
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 bg-green-500 rounded-lg flex items-center justify-center text-white font-bold text-xs">V</div>
                        <p className="text-[11px] font-bold text-slate-800">Install Volt App</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Decorative Floating Elements */}
              <div className="absolute -top-4 -right-4 bg-white p-4 rounded-2xl shadow-lg border border-slate-50 flex items-center gap-3 animate-bounce duration-[3000ms]">
                <div className="w-8 h-8 bg-green-50 rounded-full flex items-center justify-center">
                  <Lucide.HardDrive size={16} className="text-green-600" />
                </div>
                <div>
                  <p className="text-[10px] font-bold text-slate-400">STORAGE</p>
                  <p className="text-xs font-black text-slate-800">Only 450 KB</p>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
};

export default AppDownload;
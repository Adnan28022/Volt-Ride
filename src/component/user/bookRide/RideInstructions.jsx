import { Search, QrCode, Bike, Flag } from "lucide-react";

const RideInstructions = () => {
    const steps = [
        { title: "Find", desc: "Locate a bike on map", icon: <Search size={20} /> },
        { title: "Scan", desc: "Unlock with QR code", icon: <QrCode size={20} /> },
        { title: "Ride", desc: "Enjoy your eco-trip", icon: <Bike size={20} /> },
        { title: "Park", desc: "Park in green zones", icon: <Flag size={20} /> },
    ];

    return (
        <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm">
            <h4 className="text-xs font-black text-slate-900 uppercase tracking-widest mb-6">How it works</h4>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                {steps.map((step, i) => (
                    <div key={i} className="flex flex-col items-center text-center group">
                        <div className="w-12 h-12 bg-slate-50 text-slate-400 rounded-full flex items-center justify-center mb-3 group-hover:bg-green-500 group-hover:text-white transition-all shadow-inner">
                            {step.icon}
                        </div>
                        <p className="text-xs font-bold text-slate-900">{step.title}</p>
                        <p className="text-[10px] text-slate-400 font-medium mt-1">{step.desc}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default RideInstructions;
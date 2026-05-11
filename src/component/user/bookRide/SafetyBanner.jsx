import { ShieldCheck, Info } from "lucide-react";

const SafetyBanner = () => (
    <div className="bg-green-50 border border-green-100 rounded-2xl p-6 flex flex-col md:flex-row items-center gap-6">
        <div className="p-4 bg-white rounded-2xl shadow-sm text-green-600 shrink-0">
            <ShieldCheck size={32} />
        </div>
        <div className="flex-1 text-center md:text-left">
            <h4 className="text-sm font-black text-green-900 uppercase tracking-tight">Your Safety is our Priority!</h4>
            <p className="text-xs text-green-700 mt-1 leading-relaxed">
                Always wear a helmet, check brakes before starting, and avoid using your phone while riding.
                Follow traffic rules to ensure a smooth journey for everyone.
            </p>
        </div>
        <button className="bg-green-600 hover:bg-green-700 text-white text-xs font-bold px-6 py-3 rounded-xl transition-all flex items-center gap-2 whitespace-nowrap shadow-lg shadow-green-200">
            <Info size={16} /> Read Full Rules
        </button>
    </div>
);

export default SafetyBanner;
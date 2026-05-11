import { Navigation, Wallet, CreditCard } from "lucide-react";

const RideStatusPanel = () => (
    <div className="space-y-6">
        {/* WALLET CARD - Fintech Style */}
        <div className="bg-slate-900 rounded-[2rem] p-6 text-white shadow-xl group">
            <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-4">Current Balance</p>
            <h2 className="text-3xl font-black italic tracking-tighter">Rs. 1,240.<span className="text-sm opacity-50">50</span></h2>
            <div className="mt-6 flex gap-2">
                <button className="flex-1 bg-green-600 hover:bg-green-700 text-slate-900 text-xs font-black py-3 rounded-xl transition-all flex items-center justify-center gap-2">
                    <CreditCard size={14} /> Top Up
                </button>
                <button className="p-3 bg-white/5 rounded-xl border border-white/10 text-white hover:bg-white/10 transition-all">
                    <Wallet size={16} />
                </button>
            </div>
        </div>

        {/* QUICK DISCOVERY CARD */}
        <div className="bg-white border border-slate-200 rounded-[2rem] p-6 shadow-sm border-dashed border-2 flex flex-col items-center text-center justify-center min-h-[200px]">
            <div className="p-4 bg-slate-50 rounded-full text-slate-400 mb-4 animate-bounce">
                <Navigation size={24} />
            </div>
            <p className="text-xs font-bold text-slate-900">No active ride right now.</p>
            <p className="text-[10px] text-slate-400 mt-1">Unlock a bike to start your mission.</p>
        </div>
    </div>
);

export default RideStatusPanel;
import { useState } from "react";
import { Bell, Receipt, Ticket, Zap } from "lucide-react";

const RidePreferences = () => {
    const [prefs, setPrefs] = useState([
        { title: "Email Receipts", desc: "Receive a PDF receipt after every ride.", icon: <Receipt size={18} />, status: true },
        { title: "Promo Alerts", desc: "Get notified about discounts and offers.", icon: <Ticket size={18} />, status: true },
        { title: "Battery Warnings", desc: "Alert me if my bike battery goes below 20%.", icon: <Zap size={18} />, status: false },
    ]);

    const togglePref = (index) => {
        setPrefs((prev) =>
            prev.map((p, i) => i === index ? { ...p, status: !p.status } : p)
        );
    };

    return (
        <div className="bg-white border border-slate-200 rounded-3xl p-6 shadow-sm">
            <h3 className="text-sm font-black text-slate-900 uppercase tracking-tight mb-6 flex items-center gap-2">
                <Bell size={18} className="text-green-600" /> Ride Notifications
            </h3>
            <div className="space-y-4">
                {prefs.map((p, i) => (
                    <div key={i} className="flex items-center justify-between p-4 bg-slate-50 rounded-2xl border border-slate-100">
                        <div className="flex items-center gap-4">
                            <div className="p-2.5 bg-white rounded-xl text-slate-400">{p.icon}</div>
                            <div>
                                <p className="text-xs font-black text-slate-900">{p.title}</p>
                                <p className="text-[10px] text-slate-500 font-medium">{p.desc}</p>
                            </div>
                        </div>
                        {/* ✅ Toggle working */}
                        <div
                            onClick={() => togglePref(i)}
                            className={`w-12 h-6 rounded-full relative cursor-pointer transition-all ${p.status ? "bg-green-600" : "bg-slate-200"}`}
                        >
                            <div className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-all ${p.status ? "right-1" : "left-1"}`}></div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default RidePreferences;
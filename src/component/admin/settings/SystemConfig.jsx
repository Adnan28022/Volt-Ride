import { useState } from "react";
import { Clock } from "lucide-react";

const SystemConfig = () => {
    const [is24x7, setIs24x7] = useState(true);
    const [pricing, setPricing] = useState({
        baseFare: 50,
        ratePerMinute: 5,
        securityDeposit: 500,
    });

    return (
        <div className="bg-white border border-slate-200 rounded-2xl p-6 space-y-8">
            <div>
                <h3 className="text-sm font-black text-slate-900 uppercase tracking-tight mb-4">Rental Pricing Configuration</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100">
                        <label className="text-[10px] font-black text-slate-500 uppercase block mb-2">Base Fare (PKR)</label>
                        <input
                            type="number"
                            value={pricing.baseFare}
                            onChange={(e) => setPricing({ ...pricing, baseFare: e.target.value })}
                            className="w-full bg-transparent text-xl font-black outline-none text-green-600"
                        />
                    </div>
                    <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100">
                        <label className="text-[10px] font-black text-slate-500 uppercase block mb-2">Rate Per Minute</label>
                        <input
                            type="number"
                            value={pricing.ratePerMinute}
                            onChange={(e) => setPricing({ ...pricing, ratePerMinute: e.target.value })}
                            className="w-full bg-transparent text-xl font-black outline-none text-green-600"
                        />
                    </div>
                    <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100">
                        <label className="text-[10px] font-black text-slate-500 uppercase block mb-2">Security Deposit</label>
                        <input
                            type="number"
                            value={pricing.securityDeposit}
                            onChange={(e) => setPricing({ ...pricing, securityDeposit: e.target.value })}
                            className="w-full bg-transparent text-xl font-black outline-none text-green-600"
                        />
                    </div>
                </div>
            </div>

            <div className="pt-6 border-t border-slate-100">
                <h3 className="text-sm font-black text-slate-900 uppercase tracking-tight mb-4">Operational Settings</h3>
                <div className="flex items-center justify-between p-4 bg-slate-50 rounded-2xl">
                    <div className="flex items-center gap-3">
                        <Clock className="text-slate-400" size={20} />
                        <div>
                            <p className="text-xs font-bold">24/7 Operations</p>
                            <p className="text-[10px] text-slate-500">Allow users to rent bikes at any time.</p>
                        </div>
                    </div>
                    {/* ✅ Toggle working */}
                    <div
                        onClick={() => setIs24x7(!is24x7)}
                        className={`w-12 h-6 rounded-full relative cursor-pointer shadow-inner transition-all ${is24x7 ? "bg-green-500" : "bg-slate-200"}`}
                    >
                        <div className={`absolute top-1 w-4 h-4 bg-white rounded-full shadow-sm transition-all ${is24x7 ? "right-1" : "left-1"}`}></div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SystemConfig;
import { ArrowUpRight, CheckCircle2, Clock } from "lucide-react";

const StripePayouts = () => {
    const payouts = [
        { date: "Apr 20, 2026", amount: "Rs. 45,000", status: "Paid", bank: "HBL - ****4211" },
        { date: "Apr 22, 2026", amount: "Rs. 12,800", status: "Pending", bank: "HBL - ****4211" },
    ];

    return (
        <div className="bg-white border border-slate-200 rounded-2xl p-5 h-full">
            <div className="flex justify-between items-center mb-5">
                <h3 className="text-sm font-bold text-slate-800 uppercase tracking-tight">Recent Payouts</h3>
                <ArrowUpRight size={16} className="text-slate-400" />
            </div>
            <div className="space-y-4">
                {payouts.map((p, i) => (
                    <div key={i} className="flex items-center justify-between p-3 bg-slate-50 rounded-xl border border-slate-100">
                        <div className="flex items-center gap-3">
                            {p.status === "Paid" ? <CheckCircle2 className="text-green-500" size={18} /> : <Clock className="text-orange-500" size={18} />}
                            <div>
                                <p className="text-xs font-bold text-slate-900">{p.amount}</p>
                                <p className="text-[10px] text-slate-500 font-medium">{p.bank}</p>
                            </div>
                        </div>
                        <p className="text-[10px] font-bold text-slate-400">{p.date}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default StripePayouts;
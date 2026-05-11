import { Plus } from "lucide-react";
import toast from "react-hot-toast";

const PaymentMethods = () => {

    const handleAddCard = () => {
        // TODO: Stripe Card Element yahan integrate hoga
        toast("Card integration coming soon!", { icon: "💳" });
    };

    return (
        <div className="bg-white border border-slate-200 rounded-3xl p-6 shadow-sm">
            <div className="flex justify-between items-center mb-4">
                <h4 className="text-xs font-black text-slate-900 uppercase tracking-widest">Saved Cards</h4>
                <button
                    onClick={handleAddCard}
                    className="flex items-center gap-1 text-[10px] font-black text-green-600 hover:underline uppercase tracking-widest"
                >
                    <Plus size={12} /> Add New
                </button>
            </div>

            {/* Saved Card */}
            <div className="flex items-center justify-between p-4 bg-slate-50 rounded-2xl border border-slate-100 group cursor-pointer hover:border-green-200 transition-all">
                <div className="flex items-center gap-4">
                    <div className="w-10 h-7 bg-slate-800 rounded flex items-center justify-center text-[8px] text-white font-bold">
                        VISA
                    </div>
                    <div>
                        <p className="text-xs font-black text-slate-900">**** 4211</p>
                        <p className="text-[10px] text-slate-400 font-bold uppercase">Expires 12/26</p>
                    </div>
                </div>
                <div className="w-4 h-4 rounded-full border-4 border-green-500"></div>
            </div>

            {/* No Cards Empty State */}
            <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest text-center mt-4">
                Stripe integration required for real cards
            </p>
        </div>
    );
};

export default PaymentMethods;
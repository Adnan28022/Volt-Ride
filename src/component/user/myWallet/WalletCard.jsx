import { useSelector } from "react-redux";
import { Wallet, ArrowUpRight } from "lucide-react";

const WalletCard = () => {
    const { user } = useSelector((state) => state.auth);

    console.log("user Wallet", user)

    const balance = user?.walletBalance || 0;

    console.log("balance Wallet", balance)

    const balanceWhole = Math.floor(balance);
    const balanceDecimal = (balance % 1).toFixed(2).slice(2); // "50" from 1240.50

    return (
        <div className="bg-slate-900 rounded-[2rem] p-8 text-white relative overflow-hidden shadow-2xl shadow-slate-200">
            <div className="relative z-10 flex flex-col justify-between h-full">
                <div className="flex justify-between items-center mb-10">
                    <div className="p-3 bg-white/10 backdrop-blur-md rounded-2xl border border-white/10">
                        <Wallet size={24} className="text-green-400" />
                    </div>
                    <span className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">Volt Wallet Premium</span>
                </div>

                <div>
                    <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-1">Total Balance</p>
                    {/* ✅ Real balance from user */}
                    <h2 className="text-4xl font-black tracking-tighter italic">
                        Rs. {balanceWhole.toLocaleString()}.
                        <span className="text-lg opacity-50">{balanceDecimal}</span>
                    </h2>
                </div>

                <div className="flex gap-4 mt-8">
                    <div className="flex items-center gap-2 text-[10px] font-bold bg-green-500/10 text-green-400 px-3 py-1.5 rounded-full border border-green-500/20">
                        <ArrowUpRight size={12} />
                        {balance > 0 ? "Wallet Active" : "Add Funds to Start"}
                    </div>
                </div>
            </div>

            <div className="absolute -right-20 -top-20 w-64 h-64 bg-green-500/10 rounded-full blur-3xl"></div>
            <div className="absolute -left-20 -bottom-20 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl"></div>
        </div>
    );
};

export default WalletCard;
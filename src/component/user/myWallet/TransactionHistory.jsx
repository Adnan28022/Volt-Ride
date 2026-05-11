import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchUserPayments } from "../../../redux/reducer/payment/paymentSlice";
import { Loader2, ArrowUpRight, ArrowDownLeft } from "lucide-react";
import moment from "moment";

const TransactionHistory = () => {
    const dispatch = useDispatch();
    const { user } = useSelector((state) => state.auth);
    const { payments, loading } = useSelector((state) => state.payment);

    useEffect(() => {
        if (user?._id) {
            dispatch(fetchUserPayments(user._id));
        }
    }, [user, dispatch]);

    return (
        <div className="bg-white border border-slate-200 rounded-3xl overflow-hidden shadow-sm">
            <div className="p-6 border-b border-slate-50 flex justify-between items-center">
                <h3 className="font-black text-slate-800 text-sm uppercase tracking-tight">
                    Transaction History
                </h3>
                <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">
                    {payments.length} Records
                </span>
            </div>

            {loading ? (
                <div className="flex items-center justify-center py-10 text-slate-400">
                    <Loader2 size={20} className="animate-spin mr-2" /> Loading...
                </div>
            ) : payments.length === 0 ? (
                <div className="py-12 text-center">
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">
                        No transactions yet
                    </p>
                </div>
            ) : (
                <div className="divide-y divide-slate-50 max-h-[400px] overflow-y-auto">
                    {payments.map((tx, i) => (
                        <div key={i} className="p-5 flex items-center justify-between hover:bg-slate-50 transition-colors">
                            <div className="flex items-center gap-4">
                                <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-xs ${tx.type === "deduction"
                                        ? "bg-red-50 text-red-500"
                                        : "bg-green-50 text-green-500"
                                    }`}>
                                    {tx.type === "deduction"
                                        ? <ArrowDownLeft size={18} />
                                        : <ArrowUpRight size={18} />
                                    }
                                </div>
                                <div>
                                    <p className="text-sm font-black text-slate-900">
                                        {tx.type === "topup" ? "Wallet Top-up" : "Ride Deduction"}
                                    </p>
                                    <p className="text-[10px] text-slate-400 font-bold uppercase">
                                        {moment(tx.createdAt).format("MMM DD, YYYY • hh:mm A")}
                                    </p>
                                </div>
                            </div>
                            <div className="text-right">
                                <p className={`text-sm font-black ${tx.type === "deduction" ? "text-red-600" : "text-green-600"
                                    }`}>
                                    {tx.type === "deduction" ? "-" : "+"}Rs. {tx.amount}
                                </p>
                                <p className="text-[9px] font-black text-slate-400 uppercase tracking-tighter">
                                    Balance: Rs. {tx.balanceAfter}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default TransactionHistory;
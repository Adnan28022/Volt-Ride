import { Zap, Leaf, ShieldCheck } from "lucide-react";
import { useSelector } from "react-redux";

const UserBanner = () => {
    const { user } = useSelector((state) => state.auth);

    return (
        <div className="bg-white border border-slate-200 rounded-2xl p-4 md:p-6 flex flex-col gap-4 shadow-sm">

            {/* Top Row: Icon + Greeting */}
            <div className="flex items-center gap-4">
                <div className="w-12 h-12 md:w-16 md:h-16 bg-green-100 rounded-2xl flex items-center justify-center text-green-600 shrink-0">
                    <Zap size={24} className="fill-green-600 md:w-8 md:h-8" />
                </div>
                <div>
                    <h1 className="text-lg md:text-2xl font-black text-slate-900 tracking-tight">
                        Hello, <span className="text-green-600">{user?.name || "Rider"}!</span>
                    </h1>
                    <p className="text-slate-500 text-[11px] md:text-xs font-medium mt-0.5 leading-relaxed">
                        You've saved{" "}
                        <span className="text-slate-900 font-bold tracking-tight italic">12.4kg of CO2</span>{" "}
                        this month. Keep riding!
                    </p>
                </div>
            </div>

        </div>
    );
};

export default UserBanner;
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchBikes } from "../../../redux/reducer/bike/bikeSlice";

const FleetStatus = () => {
    const dispatch = useDispatch();
    const { bikes, loading } = useSelector((state) => state.bikes);

    useEffect(() => {
        dispatch(fetchBikes());
    }, [dispatch]);

    // --- Real Calculations ---
    const available = bikes?.filter((b) => b.status?.toLowerCase() === "available").length || 0;
    const inUse = bikes?.filter((b) => b.status?.toLowerCase() === "riding").length || 0;
    const maintenance = bikes?.filter((b) => b.status?.toLowerCase() === "maintenance").length || 0;
    const outOfService = bikes?.filter((b) => b.status?.toLowerCase() === "out of service").length || 0;
    const total = bikes?.length || 1;

    const statusData = [
        { label: "Available", count: available, color: "bg-green-500" },
        { label: "In Use", count: inUse, color: "bg-blue-500" },
        { label: "Maintenance", count: maintenance, color: "bg-orange-500" },
        { label: "Out of Service", count: outOfService, color: "bg-red-500" },
    ];

    return (
        <div className="bg-white border border-slate-200 rounded-xl p-5">
            <h3 className="font-bold text-slate-800 text-sm mb-4">Fleet Status</h3>

            {loading ? (
                <div className="h-16 flex items-center justify-center text-slate-400 text-xs font-bold">
                    Loading...
                </div>
            ) : (
                <>
                    {/* Progress Bar */}
                    <div className="flex h-2 rounded-full overflow-hidden mb-5">
                        {statusData.map((s, i) => (
                            <div
                                key={i}
                                className={`${s.color} transition-all duration-700`}
                                style={{ width: `${(s.count / total) * 100}%` }}
                            ></div>
                        ))}
                    </div>

                    {/* Stats Grid */}
                    <div className="grid grid-cols-2 gap-4">
                        {statusData.map((item, idx) => (
                            <div key={idx} className="flex items-center gap-2">
                                <div className={`w-2 h-2 rounded-full ${item.color}`}></div>
                                <div>
                                    <p className="text-[10px] text-slate-400 font-medium leading-none uppercase">{item.label}</p>
                                    <p className="text-sm font-bold text-slate-800">{item.count}</p>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Total */}
                    <div className="mt-4 pt-3 border-t border-slate-50 flex justify-between items-center">
                        <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Total Fleet</span>
                        <span className="text-[11px] font-black text-slate-800">{total} Bikes</span>
                    </div>
                </>
            )}
        </div>
    );
};

export default FleetStatus;
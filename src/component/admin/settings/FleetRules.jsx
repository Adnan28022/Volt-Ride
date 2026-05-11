import { useState } from "react";
import { Zap, Gauge } from "lucide-react";

const FleetRules = () => {
    const [speedLimit, setSpeedLimit] = useState(25);
    const [batteryThreshold, setBatteryThreshold] = useState(15);

    return (
        <div className="bg-white border border-slate-200 rounded-2xl p-6">
            <h3 className="text-sm font-black text-slate-900 uppercase tracking-tight mb-6">Fleet Performance Rules</h3>
            <div className="space-y-6">
                <div className="space-y-4">
                    <div className="flex justify-between items-end">
                        <div className="flex items-center gap-2">
                            <Gauge size={18} className="text-slate-400" />
                            <p className="text-xs font-bold">Maximum Speed Limit (km/h)</p>
                        </div>
                        {/* ✅ Real value */}
                        <span className="text-sm font-black text-green-600">{speedLimit} km/h</span>
                    </div>
                    <input
                        type="range"
                        min={10}
                        max={60}
                        value={speedLimit}
                        onChange={(e) => setSpeedLimit(e.target.value)}
                        className="w-full h-1.5 bg-slate-100 rounded-lg appearance-none cursor-pointer accent-green-600"
                    />
                </div>

                <div className="space-y-4">
                    <div className="flex justify-between items-end">
                        <div className="flex items-center gap-2">
                            <Zap size={18} className="text-slate-400" />
                            <p className="text-xs font-bold">Low Battery Alert Threshold</p>
                        </div>
                        {/* ✅ Real value */}
                        <span className="text-sm font-black text-orange-600">{batteryThreshold}%</span>
                    </div>
                    <input
                        type="range"
                        min={5}
                        max={50}
                        value={batteryThreshold}
                        onChange={(e) => setBatteryThreshold(e.target.value)}
                        className="w-full h-1.5 bg-slate-100 rounded-lg appearance-none cursor-pointer accent-orange-500"
                    />
                </div>
            </div>
        </div>
    );
};

export default FleetRules;
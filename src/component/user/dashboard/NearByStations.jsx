import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchStations } from "../../../redux/reducer/station/stationSlice";
import { MapPin, BatteryMedium, ArrowUpRight, Loader2 } from "lucide-react";

const NearbyStations = () => {
    const dispatch = useDispatch();
    const { items: stations, loading } = useSelector((state) => state.stations);

    useEffect(() => {
        dispatch(fetchStations());
    }, [dispatch]);

    return (
        <div className="bg-white border border-slate-200 rounded-[2rem] overflow-hidden shadow-sm">
            <div className="p-6 border-b border-slate-100 flex justify-between items-center bg-slate-50/50">
                <h3 className="text-sm font-black text-slate-900 uppercase tracking-tight">Stations Nearby</h3>
                <button className="text-[10px] font-black text-green-600 hover:underline">Open Map</button>
            </div>

            {loading ? (
                <div className="flex items-center justify-center py-10 text-slate-400">
                    <Loader2 size={20} className="animate-spin mr-2" /> Loading...
                </div>
            ) : stations?.length === 0 ? (
                <div className="p-6 text-center text-[11px] text-slate-400 font-medium">
                    No stations found nearby.
                </div>
            ) : (
                <div className="divide-y divide-slate-100">
                    {stations?.slice(0, 4).map((st) => (
                        <div key={st._id} className="p-5 flex items-center justify-between hover:bg-slate-50 transition-all cursor-pointer group">
                            <div className="flex items-center gap-4">
                                <div className="w-10 h-10 rounded-xl bg-slate-100 flex items-center justify-center text-slate-400 group-hover:bg-green-100 group-hover:text-green-600 transition-colors">
                                    <MapPin size={20} />
                                </div>
                                <div>
                                    <p className="text-sm font-bold text-slate-900 leading-none mb-1">{st.name}</p>
                                    <p className="text-[10px] text-slate-400 font-medium italic">
                                        {st.location?.address || st.address || "Location N/A"}
                                    </p>
                                </div>
                            </div>
                            <div className="text-right">
                                <div className="flex items-center gap-1.5 justify-end text-xs font-black text-slate-800">
                                    <BatteryMedium
                                        size={14}
                                        className={st.availableBikes > 0 ? "text-green-500" : "text-slate-300"}
                                    />
                                    {st.availableBikes ?? st.bikes ?? 0} Bikes
                                </div>
                                <ArrowUpRight size={14} className="text-slate-300 ml-auto mt-1 opacity-0 group-hover:opacity-100 transition-all" />
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default NearbyStations;
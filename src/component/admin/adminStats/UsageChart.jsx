import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllRides } from "../../../redux/reducer/Ride/RideSlice";
import {
    BarChart, Bar, XAxis, YAxis, CartesianGrid,
    Tooltip, ResponsiveContainer
} from "recharts";

const DAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

const UsageChart = () => {
    const dispatch = useDispatch();
    const { allRides, loading } = useSelector((state) => state.rides);

    useEffect(() => {
        dispatch(fetchAllRides());
    }, [dispatch]);

    const getLast7DaysData = () => {
        const result = [];
        for (let i = 6; i >= 0; i--) {
            const date = new Date();
            date.setDate(date.getDate() - i);
            const dayName = DAYS[date.getDay()];
            const dateStr = date.toDateString();

            const count = allRides?.filter((ride) => {
                const rideDate = new Date(ride.startTime || ride.createdAt);
                return rideDate.toDateString() === dateStr;
            }).length || 0;

            result.push({ day: dayName, rides: count });
        }
        return result;
    };

    const data = getLast7DaysData();
    const totalWeek = data.reduce((sum, d) => sum + d.rides, 0);

    return (
        <div className="bg-white border border-slate-200 rounded-xl p-5 flex flex-col gap-4">
            <div className="flex justify-between items-center">
                <h3 className="font-bold text-slate-800 text-sm">Weekly Usage</h3>
                <span className="text-[11px] bg-slate-50 font-bold text-slate-500 rounded px-2 py-1">
                    Last 7 Days
                </span>
            </div>

            {loading ? (
                <div className="h-40 flex items-center justify-center text-slate-400 text-xs font-bold">
                    Loading chart...
                </div>
            ) : (
                <>
                    <ResponsiveContainer width="100%" height={160}>
                        <BarChart data={data} barSize={28} margin={{ top: 10, right: 0, left: -20, bottom: 0 }}>
                            <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" vertical={false} />
                            <XAxis
                                dataKey="day"
                                tick={{ fontSize: 11, fontWeight: 700, fill: "#94a3b8" }}
                                axisLine={false}
                                tickLine={false}
                            />
                            <YAxis
                                allowDecimals={false}
                                tick={{ fontSize: 10, fill: "#94a3b8" }}
                                axisLine={false}
                                tickLine={false}
                            />
                            <Tooltip
                                cursor={{ fill: "#f0fdf4" }}
                                contentStyle={{
                                    borderRadius: "12px",
                                    border: "1px solid #e2e8f0",
                                    fontSize: "11px",
                                    fontWeight: "700",
                                }}
                                formatter={(value) => [`${value} rides`, "Rides"]}
                            />
                            <Bar
                                dataKey="rides"
                                fill="#22c55e"
                                radius={[6, 6, 0, 0]}
                            />
                        </BarChart>
                    </ResponsiveContainer>

                    <div className="flex justify-between items-center pt-2 border-t border-slate-50">
                        <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                            Total this week
                        </span>
                        <span className="text-[11px] font-black text-green-600">
                            {totalWeek} Rides
                        </span>
                    </div>
                </>
            )}
        </div>
    );
};

export default UsageChart;
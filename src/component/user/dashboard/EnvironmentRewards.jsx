import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { CloudSun, Wind, Trophy, Loader2 } from "lucide-react";

const WEEKLY_GOAL = 7; // 7 rides per week target

const EnvironmentRewards = () => {
    const { userRides } = useSelector((state) => state.rides);
    const { user } = useSelector((state) => state.auth);

    const [weather, setWeather] = useState(null);
    const [weatherLoading, setWeatherLoading] = useState(false);

    // --- Weekly Rides Calculate ---
    const getWeeklyRides = () => {
        if (!userRides?.length) return 0;
        const oneWeekAgo = new Date();
        oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);
        return userRides.filter((ride) => {
            const rideDate = new Date(ride.startTime || ride.createdAt);
            return rideDate >= oneWeekAgo;
        }).length;
    };

    const weeklyRides = getWeeklyRides();
    const goalPercent = Math.min(Math.round((weeklyRides / WEEKLY_GOAL) * 100), 100);
    const ridesLeft = Math.max(WEEKLY_GOAL - weeklyRides, 0);

    // --- Weather API ---
    useEffect(() => {
        const city = user?.city || "Faisalabad";
        setWeatherLoading(true);
        fetch(`https://wttr.in/${city}?format=j1`)
            .then((res) => res.json())
            .then((data) => {
                const current = data.current_condition?.[0];
                setWeather({
                    temp: current?.temp_C || "—",
                    desc: current?.weatherDesc?.[0]?.value || "Clear",
                    aqi: current?.air_quality?.["us-epa-index"] || null,
                });
            })
            .catch(() => setWeather(null))
            .finally(() => setWeatherLoading(false));
    }, [user]);

    const getAQILabel = (aqi) => {
        if (!aqi) return null;
        const index = parseInt(aqi);
        if (index <= 1) return "Excellent";
        if (index <= 2) return "Good";
        if (index <= 3) return "Moderate";
        if (index <= 4) return "Unhealthy";
        return "Hazardous";
    };

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

            {/* Weather Card */}
            <div className="bg-white border border-slate-200 rounded-3xl p-5 shadow-sm flex items-center justify-between group hover:border-green-200 transition-all">
                <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center">
                        <CloudSun size={24} />
                    </div>
                    <div>
                        <p className="text-[10px] font-black uppercase text-slate-400 tracking-widest leading-none mb-1">
                            Riding Weather • {user?.city || "Your City"}
                        </p>
                        {weatherLoading ? (
                            <Loader2 size={16} className="animate-spin text-slate-400 mt-1" />
                        ) : weather ? (
                            <>
                                <h4 className="text-lg font-black text-slate-900">
                                    {weather.temp}°C • {weather.desc}
                                </h4>
                                {weather.aqi && (
                                    <p className="text-[10px] text-slate-500 font-medium flex items-center gap-1 mt-1">
                                        <Wind size={10} className="text-green-500" />
                                        AQI: {weather.aqi} ({getAQILabel(weather.aqi)})
                                    </p>
                                )}
                            </>
                        ) : (
                            <h4 className="text-lg font-black text-slate-900">—</h4>
                        )}
                    </div>
                </div>
            </div>

            {/* Weekly Goal Card */}
            <div className="bg-white border border-slate-200 rounded-3xl p-5 shadow-sm group hover:border-green-200 transition-all">
                <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-2">
                        <Trophy size={16} className="text-orange-500" />
                        <span className="text-[10px] font-black uppercase text-slate-400 tracking-widest">Weekly Goal</span>
                    </div>
                    <span className="text-[10px] font-black text-green-600">{goalPercent}% Done</span>
                </div>
                <div className="space-y-2">
                    <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                        <div
                            className="bg-green-500 h-full rounded-full shadow-[0_0_10px_rgba(34,197,94,0.3)] transition-all duration-700"
                            style={{ width: `${goalPercent}%` }}
                        ></div>
                    </div>
                    <p className="text-[10px] text-slate-500 font-bold italic">
                        {goalPercent >= 100
                            ? "🎉 Weekly goal achieved! Amazing work!"
                            : ridesLeft === 1
                                ? "Just 1 more ride to hit your weekly target!"
                                : `${ridesLeft} more rides to hit your weekly target!`}
                    </p>
                    <p className="text-[10px] text-slate-400 font-medium">
                        {weeklyRides} / {WEEKLY_GOAL} rides this week
                    </p>
                </div>
            </div>
        </div>
    );
};

export default EnvironmentRewards;
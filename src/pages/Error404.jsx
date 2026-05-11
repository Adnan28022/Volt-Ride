import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Bike, ArrowLeft, Home, MapPinOff, Timer } from 'lucide-react';

const Error404 = () => {
    const navigate = useNavigate();
    const [seconds, setSeconds] = useState(5);

    useEffect(() => {
        // Timer logic
        const timer = setInterval(() => {
            setSeconds((prev) => prev - 1);
        }, 1000);

        // 5 seconds baad auto-redirect
        const redirect = setTimeout(() => {
            navigate(-1);
        }, 5000);

        // Clean up
        return () => {
            clearInterval(timer);
            clearTimeout(redirect);
        };
    }, [navigate]);

    return (
        <div className="min-h-screen bg-slate-50 flex items-center justify-center p-6 overflow-hidden relative">

            {/* Background Decorative Elements */}
            <div className="absolute top-[-10%] left-[-10%] w-96 h-96 bg-green-500/5 rounded-full blur-[120px] animate-pulse"></div>
            <div className="absolute bottom-[-10%] right-[-10%] w-96 h-96 bg-blue-500/5 rounded-full blur-[120px]"></div>

            <div className="max-w-2xl w-full text-center relative z-10">

                {/* Animated Illustration Section */}
                <div className="relative mb-12">
                    <h1 className="text-[12rem] md:text-[16rem] font-black text-slate-200 leading-none select-none tracking-tighter">
                        404
                    </h1>

                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full">
                        <div className="relative flex justify-center">
                            <div className="animate-bounce duration-1000">
                                <div className="bg-white p-6 rounded-[2.5rem] shadow-2xl border border-slate-100 relative animate-[move_4s_infinite_linear]">
                                    <Bike size={60} className="text-green-600" />
                                    <div className="absolute -top-1 -right-1">
                                        <span className="flex h-4 w-4 relative">
                                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                                            <span className="relative inline-flex rounded-full h-4 w-4 bg-red-500"></span>
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Text Content */}
                <div className="space-y-4">
                    <div className="flex items-center justify-center gap-3 text-slate-400 font-black uppercase tracking-[0.3em] text-xs">
                        <MapPinOff size={16} /> Out of Service Zone
                    </div>
                    <h2 className="text-3xl md:text-4xl font-black text-slate-900 italic tracking-tight">
                        Oops! You took a <span className="text-green-600">Wrong Turn.</span>
                    </h2>

                    {/* Auto Redirect Info */}
                    <div className="flex flex-col items-center gap-3 mt-4">
                        <p className="text-slate-500 text-sm font-medium flex items-center gap-2 bg-slate-100 px-4 py-2 rounded-full border border-slate-200">
                            <Timer size={14} className="text-green-600 animate-spin" />
                            Redirecting you back in <span className="text-slate-900 font-black">{seconds}s</span>
                        </p>

                        {/* Visual Progress Bar */}
                        <div className="w-48 h-1 bg-slate-200 rounded-full overflow-hidden">
                            <div
                                className="h-full bg-green-500 transition-all duration-1000 ease-linear"
                                style={{ width: `${(seconds / 5) * 100}%` }}
                            ></div>
                        </div>
                    </div>
                </div>

                {/* Action Buttons */}
                <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-10">
                    <button
                        onClick={() => navigate(-1)}
                        className="w-full sm:w-auto flex items-center justify-center gap-2 px-8 py-4 bg-white border border-slate-200 text-slate-600 font-bold rounded-2xl hover:bg-slate-50 transition-all active:scale-95 shadow-sm"
                    >
                        <ArrowLeft size={18} /> Go Back Now
                    </button>

                    <Link
                        to="/admin/dashboard"
                        className="w-full sm:w-auto flex items-center justify-center gap-2 px-8 py-4 bg-slate-900 text-white font-bold rounded-2xl hover:bg-slate-800 transition-all active:scale-95 shadow-xl shadow-slate-200"
                    >
                        <Home size={18} /> Back to Dashboard
                    </Link>
                </div>

                <p className="mt-12 text-[10px] font-bold text-slate-300 uppercase tracking-widest">
                    VoltRide HQ • Navigation Recalibrating...
                </p>
            </div>

            <style>{`
                @keyframes move {
                    0% { transform: translateX(-20px); }
                    50% { transform: translateX(20px); }
                    100% { transform: translateX(-20px); }
                }
            `}</style>
        </div>
    );
};

export default Error404;
const RiderPerformance = () => {
    const metrics = [
        { label: "Total Rides", value: "142", color: "bg-blue-500" },
        { label: "CO2 Saved", value: "12.4kg", color: "bg-green-500" },
        { label: "Reward Points", value: "2,450", color: "bg-orange-500" },
    ];

    return (
        <div className="grid grid-cols-3 gap-6">
            {metrics.map((m, i) => (
                <div key={i} className="bg-white border border-slate-200 p-6 rounded-3xl text-center shadow-sm group hover:border-green-200 transition-all">
                    <p className="text-[10px] uppercase font-black text-slate-400 mb-1 tracking-widest group-hover:text-green-600">{m.label}</p>
                    <p className="text-2xl font-black text-slate-900">{m.value}</p>
                    <div className={`h-1.5 w-10 mx-auto rounded-full mt-3 ${m.color}`}></div>
                </div>
            ))}
        </div>
    );
};

export default RiderPerformance;
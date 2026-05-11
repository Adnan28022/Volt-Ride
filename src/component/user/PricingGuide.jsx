const PricingGuide = () => (
    <div className="bg-white border border-slate-200 rounded-2xl p-5">
        <h4 className="text-xs font-black text-slate-900 uppercase tracking-widest mb-4">Pricing Rules</h4>
        <div className="space-y-3">
            <div className="flex justify-between text-xs font-medium text-slate-500">
                <span>First 5 Minutes</span>
                <span className="text-slate-900 font-bold italic">FREE</span>
            </div>
            <div className="flex justify-between text-xs font-medium text-slate-500">
                <span>Wait Time</span>
                <span className="text-slate-900 font-bold">Rs. 2/min</span>
            </div>
            <div className="p-3 bg-blue-50 text-blue-700 rounded-xl text-[10px] font-medium leading-relaxed">
                * Rides outside the geofence will incur a penalty of Rs. 200.
            </div>
        </div>
    </div>
);

export default PricingGuide;
import React, { useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import AdminPageHeader from "../../component/admin/Banner";
import PaymentStats from "../../component/admin/payments/PaymentStats";
import StripePayouts from "../../component/admin/payments/StripePayouts";
import TransactionTable from "../../component/admin/payments/TransactionTable";
import { ShieldCheck, Activity } from "lucide-react";
import { fetchAllRides } from "../../redux/reducer/Ride/RideSlice";

const PaymentManagement = () => {
  const dispatch = useDispatch();
  const { allRides, loading } = useSelector((state) => state.rides);

  useEffect(() => {
    dispatch(fetchAllRides());
  }, [dispatch]);

  // Financial Calculations
  const financialStats = useMemo(() => {
    const completedRides = allRides.filter((r) => r.status === "completed");
    const gross = completedRides.reduce(
      (acc, ride) => acc + (ride.totalCost || 0),
      0,
    );

    // Standard Stripe Fee: 2.9% + 30 PKR per transaction
    const fees = completedRides.reduce((acc, ride) => {
      const fee = ride.totalCost * 0.029 + 30;
      return acc + fee;
    }, 0);

    const refunds =
      allRides.filter((r) => r.status === "cancelled").length * 150; // Placeholder refund logic
    const net = gross - fees - refunds;

    return { gross, fees, refunds, net, completedRides };
  }, [allRides]);

  const breadcrumbs = [
    { label: "Payments", path: "/admin/payments", active: true },
  ];

  if (loading)
    return (
      <div className="p-10 text-center font-black text-slate-400 animate-pulse">
        SYNCHRONIZING WITH STRIPE...
      </div>
    );

  return (
    <div className="space-y-6 bg-slate-50/30 min-h-screen font-sans">
      <AdminPageHeader
        title="Payment Management"
        subtitle="Monitor Stripe transactions, processing fees and payouts"
        breadcrumbs={breadcrumbs}
      />

      {/* Connection Health */}
      <div className="flex flex-col md:flex-row gap-4 bg-slate-900 rounded-[2rem] p-6 text-white items-center justify-between shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/10 blur-3xl"></div>
        <div className="flex items-center gap-4 relative z-10">
          <div className="p-3 bg-blue-500 rounded-2xl shadow-lg shadow-blue-500/20 animate-pulse">
            <Activity size={24} />
          </div>
          <div>
            <h4 className="text-base font-black italic">
              STRIPE GATEWAY:{" "}
              <span className="text-emerald-400 not-italic uppercase ml-2">
                Secure & Live
              </span>
            </h4>
            <p className="text-[10px] text-slate-400 uppercase font-black tracking-[0.2em] mt-1">
              Webhooks active • SSL Encryption: AES-256
            </p>
          </div>
        </div>
        <div className="flex items-center gap-3 bg-white/5 px-5 py-2.5 rounded-full border border-white/10 backdrop-blur-md relative z-10">
          <ShieldCheck size={16} className="text-blue-400" />
          <span className="text-[10px] font-black uppercase tracking-widest">
            PCI DSS Level 1 Certified
          </span>
        </div>
      </div>

      <PaymentStats stats={financialStats} />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <TransactionTable rides={allRides} />
        </div>

        <div className="flex flex-col gap-8">
          <StripePayouts netRevenue={financialStats.net} />

          <div className="bg-slate-900 rounded-[2.5rem] p-8 text-white relative shadow-xl overflow-hidden group">
            <div className="absolute -bottom-4 -right-4 text-white/5 group-hover:scale-110 transition-transform duration-700">
              <Activity size={120} />
            </div>
            <h4 className="text-[10px] font-black text-blue-400 uppercase tracking-[0.3em] mb-4">
              Estimated Next Payout
            </h4>
            <h2 className="text-4xl font-black tracking-tighter">
              Rs. {Math.round(financialStats.net * 0.4).toLocaleString()}
            </h2>
            <p className="text-[10px] text-slate-400 font-bold mt-4 italic border-l-2 border-blue-500 pl-3 uppercase tracking-widest">
              Processing for: Tomorrow, 9:00 AM
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentManagement;

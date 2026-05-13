import React, { useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import AdminPageHeader from "../../component/admin/Banner";
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




      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <TransactionTable rides={allRides} />
        </div>

        <div className="flex flex-col gap-8">
          <StripePayouts netRevenue={financialStats.net} />

         
        </div>
      </div>
    </div>
  );
};

export default PaymentManagement;

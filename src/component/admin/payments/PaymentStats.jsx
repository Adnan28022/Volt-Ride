import React from "react";
import { DollarSign, Percent, RefreshCcw, CreditCard } from "lucide-react";

const PaymentStats = ({ stats }) => {
  const cards = [
    {
      label: "Gross Revenue",
      value: stats.gross,
      icon: <DollarSign size={20} />,
      color: "text-emerald-600",
      bg: "bg-emerald-50",
      border: "border-emerald-100",
    },
    {
      label: "Stripe Fees",
      value: stats.fees,
      icon: <Percent size={20} />,
      color: "text-blue-600",
      bg: "bg-blue-50",
      border: "border-blue-100",
    },
    {
      label: "Est. Refunds",
      value: stats.refunds,
      icon: <RefreshCcw size={20} />,
      color: "text-rose-600",
      bg: "bg-rose-50",
      border: "border-rose-100",
    },
    {
      label: "Net Earnings",
      value: stats.net,
      icon: <CreditCard size={20} />,
      color: "text-slate-700",
      bg: "bg-slate-100",
      border: "border-slate-200",
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      {cards.map((s, i) => (
        <div
          key={i}
          className={`bg-white border ${s.border} p-6 rounded-[2rem] flex items-center gap-5 shadow-sm hover:shadow-md transition-all`}
        >
          <div className={`p-4 rounded-2xl ${s.bg} ${s.color} shadow-inner`}>
            {s.icon}
          </div>
          <div>
            <p className="text-[10px] uppercase font-black text-slate-400 tracking-widest mb-1">
              {s.label}
            </p>
            <p className="text-xl font-black text-slate-900 tracking-tight">
              Rs. {Math.round(s.value).toLocaleString()}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default PaymentStats;

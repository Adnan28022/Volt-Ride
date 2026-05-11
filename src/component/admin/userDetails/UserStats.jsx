import React from "react";
import { useSelector } from "react-redux";
import { Users, UserCheck, UserPlus, UserX } from "lucide-react";

const UserStats = () => {
  // users ko empty array [] default assign kar den taake undefined ka error na aaye
  const { users = [] } = useSelector((state) => state.auth);

  // Optional chaining use karein users?.length
  const totalUsers = users?.length || 0;
  const admins = users?.filter((u) => u.role === "admin").length || 0;
  const regularUsers = users?.filter((u) => u.role === "user").length || 0;

  const stats = [
    {
      label: "Total Accounts",
      value: totalUsers,
      icon: <Users size={18} />,
      color: "text-blue-600",
      bg: "bg-blue-100",
    },
    {
      label: "Total Admins",
      value: admins,
      icon: <UserCheck size={18} />,
      color: "text-purple-600",
      bg: "bg-purple-100",
    },
    {
      label: "Regular Users",
      value: regularUsers,
      icon: <UserPlus size={18} />,
      color: "text-green-600",
      bg: "bg-green-100",
    },
    {
      label: "Status",
      value: totalUsers > 0 ? "Active" : "No Users",
      icon: <UserX size={18} />,
      color: "text-red-600",
      bg: "bg-red-100",
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      {stats.map((s, i) => (
        <div
          key={i}
          className="bg-white border border-slate-200 p-4 rounded-xl flex items-center gap-4 shadow-sm hover:shadow-md transition-shadow"
        >
          <div className={`p-3 rounded-lg ${s.bg} ${s.color}`}>{s.icon}</div>
          <div>
            <p className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">
              {s.label}
            </p>
            <p className="text-xl font-bold text-slate-900">{s.value}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default UserStats;
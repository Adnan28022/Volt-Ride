import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from "recharts";
import moment from "moment";

const RideTrendChart = ({ rides }) => {
  // 1. Data Processing: Last 7 days ka data nikalna
  const getLast7DaysData = () => {
    const days = {};
    // Last 7 days ke labels initialize karna
    for (let i = 6; i >= 0; i--) {
      const date = moment().subtract(i, "days").format("ddd");
      days[date] = 0;
    }

    // Rides ko unke din ke hisaab se count karna
    rides.forEach((ride) => {
      const rideDay = moment(ride.startTime).format("ddd");
      if (days.hasOwnProperty(rideDay)) {
        days[rideDay] += 1;
      }
    });

    // Object ko array mein convert karna jo Recharts ko chahiye
    return Object.keys(days).map((day) => ({
      name: day,
      rides: days[day],
    }));
  };

  const chartData = getLast7DaysData();

  // Custom Tooltip Design
  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-slate-900 text-white p-3 rounded-xl shadow-xl border border-slate-700 text-[10px]">
          <p className="font-black uppercase tracking-widest mb-1">
            {payload[0].payload.name}
          </p>
          <p className="text-emerald-400 font-bold">
            {payload[0].value} Total Rides
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="bg-white border border-slate-200 rounded-[2rem] p-6 h-[400px] flex flex-col shadow-sm">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h3 className="text-sm font-black text-slate-800 uppercase tracking-tight">
            Rides Analytics
          </h3>
          <p className="text-[10px] text-slate-400 font-bold italic">
            Weekly volume distribution
          </p>
        </div>
        <span className="text-[10px] font-black text-emerald-600 bg-emerald-50 px-3 py-1.5 rounded-full uppercase tracking-widest">
          Live Traffic
        </span>
      </div>

      <div className="flex-1 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={chartData}
            margin={{ top: 0, right: 0, left: -20, bottom: 0 }}
          >
            <CartesianGrid
              strokeDasharray="3 3"
              vertical={false}
              stroke="#f1f5f9"
            />
            <XAxis
              dataKey="name"
              axisLine={false}
              tickLine={false}
              tick={{ fill: "#94a3b8", fontSize: 10, fontWeight: 800 }}
              dy={10}
            />
            <YAxis
              axisLine={false}
              tickLine={false}
              tick={{ fill: "#94a3b8", fontSize: 10, fontWeight: 800 }}
            />
            <Tooltip content={<CustomTooltip />} cursor={{ fill: "#f8fafc" }} />
            <Bar dataKey="rides" radius={[10, 10, 10, 10]} barSize={35}>
              {chartData.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={entry.rides > 0 ? "#10b981" : "#e2e8f0"}
                  className="transition-all duration-500 hover:opacity-80"
                />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default RideTrendChart;

import React from "react";
import { Search, Download } from "lucide-react";

const UserFilterBar = ({ setSearchTerm, setStatusFilter }) => {
  return (
    <div className="flex flex-col md:flex-row gap-4 justify-between items-center bg-white p-4 border border-slate-200 rounded-xl shadow-sm">
      {/* Search Input */}
      <div className="relative w-full md:w-96">
        <Search
          className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
          size={16}
        />
        <input
          type="text"
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search by name, email, or phone..."
          className="w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:outline-none focus:border-green-500 focus:ring-1 focus:ring-green-500 transition-all"
        />
      </div>

      {/* Filters & Export */}
      <div className="flex items-center gap-3 w-full md:w-auto">
        <select
          onChange={(e) => setStatusFilter(e.target.value)}
          className="flex-1 md:flex-none px-4 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm text-slate-600 focus:outline-none focus:border-green-500"
        >
          <option value="All Status">All Status</option>
          <option value="Verified">Verified</option>
          <option value="Pending">Pending</option>
          <option value="Suspended">Suspended</option>
        </select>

        <button className="flex items-center justify-center gap-2 px-4 py-2 border border-slate-200 rounded-lg text-sm font-medium text-slate-600 hover:bg-slate-50 transition-all">
          <Download size={16} /> Export
        </button>
      </div>
    </div>
  );
};

export default UserFilterBar;

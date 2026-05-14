import React from "react";
import { Search, Download } from "lucide-react";
import * as XLSX from "xlsx"; // npm install xlsx lazmi karein

const UserFilterBar = ({ setSearchTerm, setStatusFilter, users = [] }) => {

  const handleExport = () => {
    if (users.length === 0) {
      // Agar koi data na ho to alert dikhayein
      return alert("Download ke liye koi records nahi hain!");
    }

    // 1. Data Formatting: Excel ke columns set karein
    const exportData = users.map((u, index) => ({
      "SR #": index + 1,
      "FULL NAME": u.name || "N/A",
      "EMAIL": u.email || "N/A",
      "PHONE": u.phone || "Not Provided",
      "ACCOUNT STATUS": u.status || "Active",
      "JOINED DATE": u.createdAt ? new Date(u.createdAt).toLocaleDateString() : "N/A",
    }));

    // 2. Excel Sheet Creation
    const worksheet = XLSX.utils.json_to_sheet(exportData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Users_List");

    // 3. Trigger Download
    const fileName = `VoltRide_Users_${new Date().toISOString().split('T')[0]}.xlsx`;
    XLSX.writeFile(workbook, fileName);
  };

  return (
    <div className="flex flex-col md:flex-row gap-4 justify-between items-center bg-white p-4 border border-slate-200 rounded-xl shadow-sm">
      <div className="relative w-full md:w-96">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
        <input
          type="text"
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search by name, email, or phone..."
          className="w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition-all"
        />
      </div>

      <div className="flex items-center gap-3 w-full md:w-auto">
        <select
          onChange={(e) => setStatusFilter(e.target.value)}
          className="flex-1 md:flex-none px-4 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm text-slate-600 focus:outline-none focus:border-emerald-500"
        >
          <option value="All Status">All Status</option>
          <option value="Verified">Verified</option>
          <option value="Pending">Pending</option>
          <option value="Suspended">Suspended</option>
        </select>

        {/* Professional Export Button */}
        <button
          onClick={handleExport}
          className="flex items-center justify-center gap-2 px-4 py-2 border border-slate-200 rounded-lg text-sm font-bold text-slate-600 hover:bg-emerald-50 hover:text-emerald-600 hover:border-emerald-200 transition-all active:scale-95 shadow-sm"
        >
          <Download size={16} />
          Export List
        </button>
      </div>
    </div>
  );
};

export default UserFilterBar;
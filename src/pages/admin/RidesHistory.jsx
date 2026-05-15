import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import HistoryStats from "../../component/admin/rideHistory/HistoryStats";
import HistoryFilters from "../../component/admin/rideHistory/HistoryFilters";
import HistoryTable from "../../component/admin/rideHistory/HistoryTable";
import RideTrendChart from "../../component/admin/rideHistory/RideTrendChart";
import PopularZones from "../../component/admin/rideHistory/PopularZones";
import AdminPageHeader from "../../component/admin/Banner";
import { fetchAllRides } from "../../redux/reducer/Ride/RideSlice";
import { fetchAllUsers } from "../../redux/reducer/auth/AuthSlice";

const RidesHistory = () => {
  const dispatch = useDispatch();
  const { allRides, loading } = useSelector((state) => state.rides);
  const { users } = useSelector((state) => state.auth);

  // Filter States
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");

  useEffect(() => {
    dispatch(fetchAllRides());
    dispatch(fetchAllUsers());
  }, [dispatch]);

  // Is function ko RidesHistory component ke andar return se pehle add karein
  const handleExportCSV = () => {
    if (filteredRides.length === 0) return alert("No data to export");

    // 1. Headers define karein
    const headers = ["Ride ID", "User Name", "Bike Reg", "Start Station", "End Station", "Status", "Fare"];

    // 2. Data rows map karein
    const rows = filteredRides.map(ride => [
      ride._id,
      ride.userId?.name || "Guest",
      ride.bikeId?.registration_number || "N/A",
      ride.startStationId?.name || "N/A",
      ride.endStationId?.name || "N/A",
      ride.status,
      ride.totalCost || 0
    ]);

    // 3. CSV content create karein
    const csvContent = [headers, ...rows].map(e => e.join(",")).join("\n");

    // 4. Download trigger karein
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.setAttribute("href", url);
    link.setAttribute("download", `ride_history_${new Date().toLocaleDateString()}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Filter Logic
  const filteredRides = allRides.filter((ride) => {
    const matchesSearch =
      ride.userId?.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      ride._id?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      ride.bikeId?.registration_number
        ?.toLowerCase()
        .includes(searchTerm.toLowerCase());

    const matchesStatus =
      statusFilter === "All" ||
      ride.status.toLowerCase() === statusFilter.toLowerCase();

    return matchesSearch && matchesStatus;
  });

  const breadcrumbs = [
    { label: "Rides History", path: "/admin/rides", active: true },
  ];

  if (loading && allRides.length === 0) {
    return (
      <div className="p-10 text-center font-bold text-slate-400">
        Loading Rides Data...
      </div>
    );
  }

  return (
    <div className="space-y-6 bg-slate-50/30 min-h-screen">
      <AdminPageHeader
        title="Rides History"
        subtitle="In-depth analysis of past fleet activity"
        breadcrumbs={breadcrumbs}
      />

      <HistoryStats rides={allRides} />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          {/* Trend Chart using all data */}
          <RideTrendChart rides={allRides} />
        </div>
        <div className="lg:col-span-1">
          {/* Popular Zones calculated from API data */}
          <PopularZones rides={allRides} />
        </div>
      </div>

      {/* Filters with state props */}
      <HistoryFilters
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        statusFilter={statusFilter}
        setStatusFilter={setStatusFilter}
        onExport={handleExportCSV} // Yeh add karein
      />

      {/* Table showing filtered results */}
      <HistoryTable rides={filteredRides} users={users} />
    </div>
  );
};

export default RidesHistory;

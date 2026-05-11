import React, { useState } from "react";
import { useSelector } from "react-redux";
import AdminPageHeader from "../../component/admin/Banner";
import UserStats from "../../component/admin/userDetails/UserStats";
import UserFilterBar from "../../component/admin/userDetails/UserFilterBar";
import UserTable from "../../component/admin/userDetails/UserTable";

const UsersList = () => {
  const { users = [] } = useSelector((state) => state.auth);

  // States for filtering
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("All Status");

  const breadcrumbs = [
    { label: "Users List", path: "/admin/users", active: true },
  ];

  // Filter Logic
  const filteredUsers = users.filter((user) => {
    // 1. Pehle Admin ko nikal den
    if (user.role === "admin") return false;

    // 2. Search filter (Name, Email, Phone)
    const matchesSearch =
      user.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.phone?.includes(searchTerm);

    // 3. Status filter (Agar aapke schema mein status hai)
    const matchesStatus =
      statusFilter === "All Status" || user.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  return (
    <div className="space-y-6 bg-slate-50/30 min-h-screen">
      <AdminPageHeader
        title="Users Management"
        subtitle="Manage and verify VoltRide users and their accounts"
        breadcrumbs={breadcrumbs}
      />

      <UserStats />

      <div className="space-y-4">
        <UserFilterBar
          setSearchTerm={setSearchTerm}
          setStatusFilter={setStatusFilter}
        />
        <UserTable filteredUsers={filteredUsers} />
      </div>
    </div>
  );
};

export default UsersList;

import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import AdminPageHeader from "../../component/admin/Banner";
import UserStats from "../../component/admin/userDetails/UserStats";
import UserFilterBar from "../../component/admin/userDetails/UserFilterBar";
import UserTable from "../../component/admin/userDetails/UserTable";
import { fetchAllUsers } from "../../redux/reducer/auth/AuthSlice";

const UsersList = () => {
  const dispatch = useDispatch();
  const { users = [] } = useSelector((state) => state.auth);

  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("All Status");

  // ✅ FIX: Yahan fetch karo taake filteredUsers mein data aaye
  useEffect(() => {
    dispatch(fetchAllUsers());
  }, [dispatch]);

  const breadcrumbs = [
    { label: "Users List", path: "/admin/users", active: true },
  ];

  const filteredUsers = users.filter((user) => {
    if (user.role === "admin") return false;

    const matchesSearch =
      user.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.phone?.includes(searchTerm);

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
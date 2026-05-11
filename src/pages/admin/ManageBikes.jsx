import React, { useState } from 'react';

import AdminPageHeader from '../../component/admin/Banner';
import BikeStats from '../../component/admin/manageBikes/BikeStats';
import BikeFilterBar from '../../component/admin/manageBikes/BikeFilterBar';
import BikeTable from '../../component/admin/manageBikes/BikeTable';




const ManageBikes = () => {
  const [editData, setEditData] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  const breadcrumbs = [
    { label: "Manage Bikes", path: "/admin/bikes", active: true }
  ];

  return (
    <div className="space-y-6 bg-slate-50/30 min-h-screen">
      <AdminPageHeader
        title="Manage Bikes"
        subtitle="Monitor, edit and maintain your e-bike fleet"
        breadcrumbs={breadcrumbs}
      />
      <BikeStats />
      <BikeFilterBar
        editData={editData}
        setEditData={setEditData}
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
      />
      <BikeTable
        onEdit={(bike) => setEditData(bike)}
        searchTerm={searchTerm}
      />
    </div>
  );
};

export default ManageBikes;
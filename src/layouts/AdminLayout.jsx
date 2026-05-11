import { useState } from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "../component/layout/Sidebar";
import AdminHeader from "../component/layout/AdminHeader";

const AdminLayout = () => {
  // isCollapsed state desktop ke liye, sidebarOpen mobile ke liye
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  const toggleSidebar = () => {
    // Agar mobile screen hai to sidebar open/close karein
    if (window.innerWidth < 768) {
      setMobileOpen(!mobileOpen);
    } else {
      // Agar desktop hai to collapse/expand karein
      setIsCollapsed(!isCollapsed);
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-50 overflow-hidden">
      {/* Sidebar Component */}
      <Sidebar 
        isCollapsed={isCollapsed} 
        mobileOpen={mobileOpen} 
        setMobileOpen={setMobileOpen} 
      />

      <div className="flex-1 flex flex-col min-w-0 h-screen transition-all duration-300">
        {/* Header Component */}
        <AdminHeader toggleSidebar={toggleSidebar} isCollapsed={isCollapsed} />

        {/* Content Section */}
        <main className="flex-1 overflow-y-auto p-4 md:p-8">
          <div className="max-w-7xl mx-auto">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
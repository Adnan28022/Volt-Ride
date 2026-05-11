import { useState } from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "../component/layout/Sidebar";
import UserHeader from "../component/layout/UserHeader"; // Naya User Header import kiya

const UserPanelLayout = () => {
    // isCollapsed state desktop ke liye, mobileOpen mobile ke liye
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
        <div className="flex min-h-screen bg-slate-50/50 overflow-hidden">
            {/* Sidebar Component (Ye dynamic hai, /user route par khud user menu dikhayegi) */}
            <Sidebar
                isCollapsed={isCollapsed}
                mobileOpen={mobileOpen}
                setMobileOpen={setMobileOpen}
            />

            <div className="flex-1 flex flex-col min-w-0 h-screen transition-all duration-300">
                {/* User Header Component (Blue Theme wala) */}
                <UserHeader toggleSidebar={toggleSidebar} isCollapsed={isCollapsed} />

                {/* Content Section */}
                <main className="flex-1 overflow-y-auto">
                    {/* 
            Humne AdminLayout mein p-4/p-8 lagaya tha, 
            lekin kyunki humne pages ke andar khud 'p-6' manage kiya hai 
            isliye yahan sirf max-width aur margin auto rakhenge 
          */}
                    <div className="max-w-[1600px] mx-auto">
                        <Outlet />
                    </div>
                </main>
            </div>
        </div>
    );
};

export default UserPanelLayout;
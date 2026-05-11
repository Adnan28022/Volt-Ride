import { Link, useLocation } from "react-router-dom";
import { 
  LayoutDashboard, Bike, Users, History, 
  CreditCard, MapPin, Settings, LogOut, X,
  Wallet, UserCircle, MessageSquare
} from "lucide-react";
import { useSelector } from "react-redux";

const Sidebar = ({ isCollapsed, mobileOpen, setMobileOpen }) => {
  const location = useLocation();
  const { user } = useSelector((state) => state.auth);

  // Role based menu items
  const adminMenu = [
    { name: "Dashboard", path: "/admin/dashboard", icon: <LayoutDashboard size={22} /> },
    { name: "Station Management", path: "/admin/stations", icon: <LayoutDashboard size={22} /> },
    { name: "Manage Bikes", path: "/admin/bikes", icon: <Bike size={22} /> },
    { name: "Users List", path: "/admin/users", icon: <Users size={22} /> },
    { name: "Live Tracking", path: "/admin/tracking", icon: <MapPin size={22} /> },
    { name: "Rides History", path: "/admin/rides", icon: <History size={22} /> },
    { name: "Payments", path: "/admin/payments", icon: <CreditCard size={22} /> },
    { name: "Settings", path: "/admin/settings", icon: <Settings size={22} /> },
  ];

  const userMenu = [
    { name: "User Panel", path: "/user/dashboard", icon: <LayoutDashboard size={22} /> },
    { name: "Book a Ride", path: "/user/book-ride", icon: <Bike size={22} /> },
    { name: "My Rides", path: "/user/my-rides", icon: <History size={22} /> },
    // { name: "My Wallet", path: "/user/wallet", icon: <Wallet size={22} /> },
    { name: "Profile", path: "/user/profile", icon: <UserCircle size={22} /> },
    { name: "Support", path: "/support", icon: <MessageSquare size={22} /> },
    { name: "Settings", path: "/user/settings", icon: <Settings size={22} /> },
  ];

  // Decide which menu to show
  const menuItems = user?.role === "admin" ? adminMenu : userMenu;
  const isAdmin = user?.role === "admin";

  return (
    <>
      {/* Mobile Overlay */}
      {mobileOpen && (
        <div 
          className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-40 md:hidden" 
          onClick={() => setMobileOpen(false)}
        ></div>
      )}

      <aside className={`fixed md:static inset-y-0 left-0 z-50 bg-slate-900 text-white transition-all duration-300 ease-in-out border-r border-slate-800 shadow-2xl flex flex-col
        ${mobileOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"}
        ${isCollapsed ? "md:w-20" : "w-full md:w-64"}`}
      >
        
        {/* Logo Section */}
        <div className="p-4 h-20 flex items-center border-b border-slate-800 overflow-hidden">
          <div className="flex items-center gap-3 min-w-max">
            <div className="bg-green-500 p-2 rounded-xl shrink-0">
              <Bike size={24} className="text-slate-900" />
            </div>
            {!isCollapsed && (
              <span className="text-xl font-bold tracking-tight animate-in fade-in duration-500">
                Volt<span className="text-green-500">Ride</span>
              </span>
            )}
          </div>
          {mobileOpen && (
            <button onClick={() => setMobileOpen(false)} className="md:hidden ml-auto text-slate-400">
              <X size={24} />
            </button>
          )}
        </div>
        
        {/* Navigation Links */}
        <nav className="mt-6 px-3 space-y-1 flex-1 overflow-y-auto no-scrollbar">
          {!isCollapsed && (
            <p className="text-[10px] uppercase tracking-widest text-slate-500 font-bold px-4 mb-4">
              {isAdmin ? "Admin Control" : "User Menu"}
            </p>
          )}
          
          {menuItems.map((item) => {
            const active = location.pathname === item.path;
            return (
              <Link
                key={item.path}
                to={item.path}
                onClick={() => window.innerWidth < 768 && setMobileOpen(false)}
                className={`flex items-center rounded-xl transition-all duration-200 group relative
                  ${isCollapsed ? "justify-center p-3" : "px-4 py-3 gap-4"}
                  ${active ? "bg-green-600 text-white shadow-lg shadow-green-900/20" : "text-slate-400 hover:bg-slate-800 hover:text-white"}`}
              >
                <span className={`${active ? "text-white" : "text-slate-400 group-hover:text-green-500"}`}>
                  {item.icon}
                </span>
                
                {!isCollapsed && (
                  <span className="font-medium whitespace-nowrap animate-in slide-in-from-left-2">
                    {item.name}
                  </span>
                )}

                {/* Tooltip for Collapsed State */}
                {isCollapsed && (
                  <div className="absolute left-16 bg-slate-800 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity whitespace-nowrap z-50 shadow-xl border border-slate-700">
                    {item.name}
                  </div>
                )}
              </Link>
            );
          })}
        </nav>

        {/* Exit/Back to Home */}
        <div className="p-3 border-t border-slate-800">
          <Link 
            to="/" 
            className={`flex items-center rounded-xl text-slate-400 hover:bg-red-500/10 hover:text-red-400 transition-all 
              ${isCollapsed ? "justify-center p-3" : "px-4 py-3 gap-4"}`}
          >
            <LogOut size={20} />
            {!isCollapsed && <span className="font-medium">{isAdmin ? "Exit Admin" : "Back to Home"}</span>}
          </Link>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
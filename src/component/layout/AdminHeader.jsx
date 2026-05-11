import { useState, useEffect, useRef } from "react";
import { 
  Menu, 
  Bell, 
  Calendar, 
  ChevronDown, 
  User, 
  PanelLeftClose, 
  PanelLeftOpen,
  LogOut,
  Settings,
  Mail,
  ShieldCheck,
  ExternalLink
} from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logoutUser } from "../../redux/reducer/auth/AuthSlice";

const AdminHeader = ({ toggleSidebar, isCollapsed }) => {
  const [showUserDropdown, setShowUserDropdown] = useState(false);
  const [showNotifDropdown, setShowNotifDropdown] = useState(false);
  
  const userRef = useRef(null);
  const notifRef = useRef(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { user } = useSelector((state) => state.auth);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (userRef.current && !userRef.current.contains(event.target)) setShowUserDropdown(false);
      if (notifRef.current && !notifRef.current.contains(event.target)) setShowNotifDropdown(false);
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = async () => {
    try {
      await dispatch(logoutUser()).unwrap();
      setShowUserDropdown(false);
      navigate("/login");
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  const today = new Date().toLocaleDateString('en-US', { 
    weekday: 'short', year: 'numeric', month: 'short', day: 'numeric' 
  });

  return (
    <header className="h-20 bg-white/80 backdrop-blur-md border-b border-slate-200 sticky top-0 z-40 px-4 md:px-8 flex items-center justify-between transition-all duration-300">
      
      {/* Left Section: Sidebar Toggle */}
      <div className="flex items-center gap-4">
        <button 
          onClick={toggleSidebar}
          className="p-2.5 bg-slate-50 hover:bg-green-50 text-slate-600 hover:text-green-600 rounded-xl border border-slate-200 transition-all shadow-sm group"
        >
          <span className="hidden md:block transition-transform group-active:scale-90">
            {isCollapsed ? <PanelLeftOpen size={22} /> : <PanelLeftClose size={22} />}
          </span>
          <span className="md:hidden">
            <Menu size={22} />
          </span>
        </button>
        
        <h2 className="font-bold text-slate-800 text-lg hidden sm:block italic tracking-tight">
          Volt<span className="text-green-600">Ride</span> <span className="font-light text-slate-400">HQ</span>
        </h2>
      </div>

      {/* Right Section */}
      <div className="flex items-center gap-3 md:gap-6">
        
        {/* View Site Link */}
        <Link 
          to="/" 
          className="hidden md:flex items-center gap-2 text-xs font-bold text-slate-500 hover:text-green-600 transition-colors bg-slate-50 px-3 py-2 rounded-xl border border-slate-100"
        >
          <ExternalLink size={14} />
          View Site
        </Link>

        {/* Date Display */}
        <div className="hidden lg:flex items-center gap-2 text-slate-500 bg-slate-50 px-4 py-2 rounded-xl border border-slate-100">
          <Calendar size={16} />
          <span className="text-xs font-semibold">{today}</span>
        </div>

        {/* Notifications Dropdown */}
        <div className="relative" ref={notifRef}>
          <button 
            onClick={() => setShowNotifDropdown(!showNotifDropdown)}
            className={`relative p-2.5 rounded-xl transition-all ${showNotifDropdown ? 'bg-green-100 text-green-600' : 'text-slate-500 hover:bg-slate-100'}`}
          >
            <Bell size={20} />
            <span className="absolute top-2.5 right-2.5 w-2.5 h-2.5 bg-red-500 rounded-full border-2 border-white"></span>
          </button>

          {showNotifDropdown && (
            <div className="absolute right-0 mt-3 w-80 bg-white border border-slate-100 rounded-2xl shadow-xl shadow-slate-200/50 py-3 z-50 animate-in fade-in zoom-in-95 duration-200">
              <div className="px-4 pb-2 border-b border-slate-50 flex justify-between items-center">
                <span className="font-bold text-slate-800">Notifications</span>
                <span className="text-[10px] bg-green-100 text-green-600 px-2 py-0.5 rounded-full font-bold">4 New</span>
              </div>
              <div className="max-h-60 overflow-y-auto">
                {[1, 2].map((n) => (
                  <div key={n} className="px-4 py-3 hover:bg-slate-50 cursor-pointer transition-colors border-b border-slate-50 last:border-0">
                    <p className="text-sm text-slate-700 font-medium">Bike ID #402 Battery Low</p>
                    <p className="text-[10px] text-slate-400 mt-0.5">2 minutes ago</p>
                  </div>
                ))}
              </div>
              <button className="w-full mt-2 text-center text-xs text-green-600 font-bold hover:underline">View All Notifications</button>
            </div>
          )}
        </div>

        <div className="h-8 w-[1px] bg-slate-200 mx-1 hidden sm:block"></div>

        {/* User Profile Dropdown */}
        <div className="relative" ref={userRef}>
          <button 
            onClick={() => setShowUserDropdown(!showUserDropdown)}
            className="flex items-center gap-3 p-1 pr-3 hover:bg-slate-50 rounded-2xl transition-all group"
          >
            <div className="w-10 h-10 bg-gradient-to-tr from-slate-800 to-slate-900 rounded-xl flex items-center justify-center text-white font-bold shadow-md overflow-hidden italic">
              {user?.avatar ? (
                <img src={user.avatar} alt="Admin" className="w-full h-full object-cover" />
              ) : (
                user?.name?.charAt(0).toUpperCase() || <User size={20} />
              )}
            </div>
            <div className="text-left hidden sm:block">
              <p className="text-sm font-bold text-slate-900 group-hover:text-green-600 transition-colors truncate max-w-[100px]">
                {user?.name || "Admin"}
              </p>
              <p className="text-[10px] text-slate-500 font-medium tracking-tight uppercase">Super Admin</p>
            </div>
            <ChevronDown size={14} className={`text-slate-400 transition-transform duration-300 ${showUserDropdown ? 'rotate-180' : ''}`} />
          </button>

          {showUserDropdown && (
            <div className="absolute right-0 mt-3 w-56 bg-white border border-slate-100 rounded-2xl shadow-xl shadow-slate-200/50 py-2 z-50 animate-in fade-in zoom-in-95 duration-200">
              <div className="px-4 py-2 border-b border-slate-50 mb-1">
                <p className="text-xs text-slate-400">Signed in as</p>
                <p className="text-sm font-bold text-slate-800 truncate">{user?.email || "admin@voltride.com"}</p>
              </div>
              
              <Link to="/" className="md:hidden flex items-center gap-3 px-4 py-2.5 text-sm text-slate-600 hover:bg-slate-50 hover:text-green-600 transition-colors">
                <ExternalLink size={18} /> View Site
              </Link>
              <Link to="/admin/profile" className="flex items-center gap-3 px-4 py-2.5 text-sm text-slate-600 hover:bg-slate-50 hover:text-green-600 transition-colors">
                <ShieldCheck size={18} /> My Profile
              </Link>
              <Link to="/admin/settings" className="flex items-center gap-3 px-4 py-2.5 text-sm text-slate-600 hover:bg-slate-50 hover:text-green-600 transition-colors">
                <Settings size={18} /> Account Settings
              </Link>
              <Link to="/support" className="flex items-center gap-3 px-4 py-2.5 text-sm text-slate-600 hover:bg-slate-50 hover:text-green-600 transition-colors">
                <Mail size={18} /> Support Box
              </Link>
              
              <div className="h-[1px] bg-slate-50 my-1 mx-2"></div>
              
              <button 
                onClick={handleLogout}
                className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-red-500 hover:bg-red-50 transition-colors font-bold uppercase tracking-wider"
              >
                <LogOut size={18} /> Log Out
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default AdminHeader;
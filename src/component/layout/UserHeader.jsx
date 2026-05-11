import { useState, useEffect, useRef } from "react";
import {
    Menu, Bell, Calendar, ChevronDown, User,
    PanelLeftClose, PanelLeftOpen, LogOut, Settings,
    HelpCircle, Wallet, ExternalLink
} from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logoutUser } from "../../redux/reducer/auth/AuthSlice";

const UserHeader = ({ toggleSidebar, isCollapsed }) => {
    const [showUserDropdown, setShowUserDropdown] = useState(false);
    const [showNotifDropdown, setShowNotifDropdown] = useState(false);

    const userRef = useRef(null);
    const notifRef = useRef(null);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const { user } = useSelector((state) => state.auth);
    const { userRides } = useSelector((state) => state.rides);

    // Real notifications rides se
    const notifications = userRides?.slice(0, 3).map((ride) => ({
        message: `Ride #${ride._id?.slice(-6).toUpperCase()} — ${ride.status}`,
        time: ride.endTime || ride.startTime,
    })) || [];

    // Wallet balance
    const walletBalance = user?.walletBalance || 0;

    // Low balance check
    const isLowBalance = walletBalance < 100;

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

    const timeAgo = (dateStr) => {
        if (!dateStr) return "";
        const diff = Math.floor((new Date() - new Date(dateStr)) / 60000);
        if (diff < 1) return "Just now";
        if (diff < 60) return `${diff} min ago`;
        if (diff < 1440) return `${Math.floor(diff / 60)} hr ago`;
        return `${Math.floor(diff / 1440)} days ago`;
    };

    return (
        <header className="h-20 bg-white/80 backdrop-blur-md border-b border-slate-200 sticky top-0 z-40 px-4 md:px-8 flex items-center justify-between transition-all duration-300">

            {/* Left Section */}
            <div className="flex items-center gap-4">
                <button
                    onClick={toggleSidebar}
                    className="p-2.5 bg-slate-50 hover:bg-green-50 text-slate-600 hover:text-green-600 rounded-xl border border-slate-200 transition-all shadow-sm group"
                >
                    <span className="hidden md:block transition-transform group-active:scale-90">
                        {isCollapsed ? <PanelLeftOpen size={22} /> : <PanelLeftClose size={22} />}
                    </span>
                    <span className="md:hidden"><Menu size={22} /></span>
                </button>
                <h2 className="font-bold text-slate-800 text-lg hidden sm:block italic tracking-tight">
                    Volt<span className="text-green-600">Ride</span> <span className="font-light text-slate-400">User</span>
                </h2>
            </div>

            {/* Right Section */}
            <div className="flex items-center gap-3 md:gap-6">

                <Link to="/" className="hidden md:flex items-center gap-2 text-xs font-bold text-slate-500 hover:text-green-600 transition-colors bg-slate-50 px-3 py-2 rounded-xl border border-slate-100">
                    <ExternalLink size={14} /> View Site
                </Link>

                <div className="hidden lg:flex items-center gap-2 text-slate-500 bg-slate-50 px-4 py-2 rounded-xl border border-slate-100">
                    <Calendar size={16} />
                    <span className="text-xs font-semibold">{today}</span>
                </div>

                {/* Notifications */}
                <div className="relative" ref={notifRef}>
                    <button
                        onClick={() => setShowNotifDropdown(!showNotifDropdown)}
                        className={`relative p-2.5 rounded-xl transition-all ${showNotifDropdown ? 'bg-green-100 text-green-600' : 'text-slate-500 hover:bg-slate-100'}`}
                    >
                        <Bell size={20} />
                        {/* ✅ Real notifications count */}
                        {(notifications.length > 0 || isLowBalance) && (
                            <span className="absolute top-2.5 right-2.5 w-2.5 h-2.5 bg-green-500 rounded-full border-2 border-white"></span>
                        )}
                    </button>

                    {showNotifDropdown && (
                        <div className="absolute right-0 mt-3 w-80 bg-white border border-slate-100 rounded-2xl shadow-xl shadow-slate-200/50 py-3 z-50 animate-in fade-in zoom-in-95 duration-200">
                            <div className="px-4 pb-2 border-b border-slate-50 flex justify-between items-center">
                                <span className="font-bold text-slate-800">Alerts</span>
                                <span className="text-[10px] bg-green-100 text-green-600 px-2 py-0.5 rounded-full font-bold">
                                    {notifications.length + (isLowBalance ? 1 : 0)} New
                                </span>
                            </div>
                            <div className="max-h-60 overflow-y-auto">
                                {/* Low balance alert */}
                                {isLowBalance && (
                                    <div className="px-4 py-3 hover:bg-red-50 cursor-pointer transition-colors border-b border-slate-50">
                                        <p className="text-sm text-red-600 font-medium">
                                            Low Wallet Balance: Rs. {walletBalance} left
                                        </p>
                                        <p className="text-[10px] text-slate-400 mt-0.5">Tap to top up</p>
                                    </div>
                                )}
                                {/* Ride notifications */}
                                {notifications.length > 0 ? notifications.map((notif, i) => (
                                    <div key={i} className="px-4 py-3 hover:bg-slate-50 cursor-pointer transition-colors border-b border-slate-50">
                                        <p className="text-sm text-slate-700 font-medium">{notif.message}</p>
                                        <p className="text-[10px] text-slate-400 mt-0.5">{timeAgo(notif.time)}</p>
                                    </div>
                                )) : (
                                    <div className="px-4 py-6 text-center">
                                        <p className="text-[10px] font-bold text-slate-400 uppercase">No new alerts</p>
                                    </div>
                                )}
                            </div>
                            <Link to="/user/my-rides" className="block w-full mt-2 text-center text-xs text-green-600 font-bold hover:underline pb-1">
                                View All Activities
                            </Link>
                        </div>
                    )}
                </div>

                <div className="h-8 w-[1px] bg-slate-200 mx-1 hidden sm:block"></div>

                {/* User Dropdown */}
                <div className="relative" ref={userRef}>
                    <button
                        onClick={() => setShowUserDropdown(!showUserDropdown)}
                        className="flex items-center gap-3 p-1 pr-3 hover:bg-slate-50 rounded-2xl transition-all group"
                    >
                        <div className="w-10 h-10 bg-gradient-to-tr from-green-600 to-emerald-700 rounded-xl flex items-center justify-center text-white font-bold shadow-md overflow-hidden">
                            {user?.avatar ? (
                                <img src={user.avatar} alt="User" className="w-full h-full object-cover" />
                            ) : (
                                user?.name?.charAt(0).toUpperCase() || <User size={20} />
                            )}
                        </div>
                        <div className="text-left hidden sm:block">
                            {/* ✅ Real user name */}
                            <p className="text-sm font-bold text-slate-900 group-hover:text-green-600 transition-colors truncate max-w-[100px]">
                                {user?.name || "Rider"}
                            </p>
                            <p className="text-[10px] text-slate-500 font-medium tracking-tight uppercase">
                                {user?.role || "Member"}
                            </p>
                        </div>
                        <ChevronDown size={14} className={`text-slate-400 transition-transform duration-300 ${showUserDropdown ? 'rotate-180' : ''}`} />
                    </button>

                    {showUserDropdown && (
                        <div className="absolute right-0 mt-3 w-56 bg-white border border-slate-100 rounded-2xl shadow-xl shadow-slate-200/50 py-2 z-50 animate-in fade-in zoom-in-95 duration-200">
                            <div className="px-4 py-2 border-b border-slate-50 mb-1">
                                <p className="text-xs text-slate-400">Logged in as</p>
                                {/* ✅ Real email */}
                                <p className="text-sm font-bold text-slate-800 truncate">{user?.email || "—"}</p>
                            </div>

                            <Link to="/" className="md:hidden flex items-center gap-3 px-4 py-2.5 text-sm text-slate-600 hover:bg-slate-50 hover:text-green-600 transition-colors">
                                <ExternalLink size={18} /> View Site
                            </Link>
                            <Link to="/user/profile" className="flex items-center gap-3 px-4 py-2.5 text-sm text-slate-600 hover:bg-slate-50 hover:text-green-600 transition-colors">
                                <User size={18} /> My Profile
                            </Link>
                            {/* ✅ Real wallet balance */}
                            <Link to="/user/wallet" className="flex items-center gap-3 px-4 py-2.5 text-sm text-slate-600 hover:bg-slate-50 hover:text-green-600 transition-colors">
                                <Wallet size={18} /> Wallet (Rs. {walletBalance.toLocaleString()})
                            </Link>
                            <Link to="/user/settings" className="flex items-center gap-3 px-4 py-2.5 text-sm text-slate-600 hover:bg-slate-50 hover:text-green-600 transition-colors">
                                <Settings size={18} /> Settings
                            </Link>
                            <Link to="/support" className="flex items-center gap-3 px-4 py-2.5 text-sm text-slate-600 hover:bg-slate-50 hover:text-green-600 transition-colors">
                                <HelpCircle size={18} /> Help & Support
                            </Link>

                            <div className="h-[1px] bg-slate-50 my-1 mx-2"></div>

                            <button
                                onClick={handleLogout}
                                className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-red-500 hover:bg-red-50 transition-colors font-bold uppercase tracking-wider"
                            >
                                <LogOut size={18} /> Logout
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </header>
    );
};

export default UserHeader;
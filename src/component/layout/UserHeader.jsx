import { useState, useEffect, useRef } from "react";
import {
    Menu, Bell, Calendar, ChevronDown, User,
    PanelLeftClose, PanelLeftOpen, LogOut, Settings,

    // ✅ ICONS ADD KIYE HAIN
    HelpCircle, Wallet, ExternalLink, AlertTriangle, Bike, CheckCircle2
} from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logoutUser } from "../../redux/reducer/auth/AuthSlice";
import { onMessageListener } from "../../config/firebase";
import toast from "react-hot-toast";

const UserHeader = ({ toggleSidebar, isCollapsed }) => {
    const [showUserDropdown, setShowUserDropdown] = useState(false);
    const [showNotifDropdown, setShowNotifDropdown] = useState(false);
    const [firebaseNotifs, setFirebaseNotifs] = useState([]);

    const userRef = useRef(null);
    const notifRef = useRef(null);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const { user } = useSelector((state) => state.auth);
    const { userRides } = useSelector((state) => state.rides);

    const walletBalance = user?.walletBalance || 0;
    const isLowBalance = walletBalance < 100;

    useEffect(() => {
        if (user?.role !== "user") return;

        const unsubscribe = onMessageListener((payload) => {
            const newNotif = {
                id: Date.now(),
                title: payload.notification?.title || "Notification",
                message: payload.notification?.body || "",
                time: new Date(),
                type: payload.data?.type || "general",
            };
            setFirebaseNotifs((prev) => [newNotif, ...prev].slice(0, 5));
            toast.success(`${newNotif.title}\n${newNotif.message}`, {
                duration: 5000,
                // ✅ EMOJI KI JAGAH ICON
                icon: <Bell size={18} className="text-green-600" />,
            });
        });

        return () => unsubscribe && unsubscribe();
    }, [user]);

    const rideNotifs = userRides?.slice(0, 3).map((ride) => ({
        id: ride._id,
        message: `Ride #${ride._id?.slice(-6).toUpperCase()} — ${ride.status}`,
        time: ride.endTime || ride.startTime,
        type: "ride",
    })) || [];

    const allNotifications = [...firebaseNotifs, ...rideNotifs];
    const notifCount = allNotifications.length + (isLowBalance ? 1 : 0);

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

    // ✅ YEH FUNCTION UPDATE KIYA HAI - AB JSX RETURN KAREGA
    const getNotifIcon = (type) => {
        const iconProps = { size: 18, className: "shrink-0" };
        switch (type) {
            case "ride_start":
                return <Bike {...iconProps} className="text-blue-500" />;
            case "ride_complete":
                return <CheckCircle2 {...iconProps} className="text-green-500" />;
            case "wallet_topup":
                return <Wallet {...iconProps} className="text-amber-500" />;
            default:
                return <Bell {...iconProps} className="text-slate-500" />;
        }
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
                        {notifCount > 0 && (
                            <span className="absolute top-2.5 right-2.5 w-2.5 h-2.5 bg-green-500 rounded-full border-2 border-white animate-pulse"></span>
                        )}
                    </button>

                    {showNotifDropdown && (
                        <div className="absolute right-0 mt-3 w-80 bg-white border border-slate-100 rounded-2xl shadow-xl shadow-slate-200/50 py-3 z-50 animate-in fade-in zoom-in-95 duration-200">
                            <div className="px-4 pb-2 border-b border-slate-50 flex justify-between items-center">
                                <span className="font-bold text-slate-800">Notifications</span>
                                <span className="text-[10px] bg-green-100 text-green-600 px-2 py-0.5 rounded-full font-bold">
                                    {notifCount} New
                                </span>
                            </div>
                            <div className="max-h-64 overflow-y-auto">
                                {/* ✅ Low balance alert - EMOJI REMOVED */}
                                {isLowBalance && (
                                    <div className="px-4 py-3 hover:bg-red-50 cursor-pointer transition-colors border-b border-slate-50">
                                        <p className="flex items-start gap-2 text-sm text-red-600 font-medium">
                                            <AlertTriangle size={16} className="shrink-0 mt-0.5" />
                                            <span>Low Wallet Balance: Rs. {walletBalance}</span>
                                        </p>
                                        <p className="text-[10px] text-slate-400 mt-0.5 pl-6">Tap to top up</p>
                                    </div>
                                )}

                                {/* ✅ Firebase notifications - EMOJI REMOVED */}
                                {firebaseNotifs.map((notif) => (
                                    <div key={notif.id} className="px-4 py-3 hover:bg-green-50 cursor-pointer transition-colors border-b border-slate-50">
                                        <div className="flex items-start gap-3">
                                            {getNotifIcon(notif.type)}
                                            <div>
                                                <p className="text-sm text-slate-700 font-bold">{notif.title}</p>
                                                <p className="text-[11px] text-slate-500 mt-0.5">{notif.message}</p>
                                                <p className="text-[10px] text-slate-400 mt-1">{timeAgo(notif.time)}</p>
                                            </div>
                                        </div>
                                    </div>
                                ))}

                                {/* ✅ Ride notifications - EMOJI REMOVED */}
                                {rideNotifs.map((notif) => (
                                    <div key={notif.id} className="px-4 py-3 hover:bg-slate-50 cursor-pointer transition-colors border-b border-slate-50">
                                        <div className="flex items-start gap-3">
                                            <Bike size={18} className="text-slate-500 shrink-0" />
                                            <div>
                                                <p className="text-sm text-slate-700 font-medium">{notif.message}</p>
                                                <p className="text-[10px] text-slate-400 mt-1">{timeAgo(notif.time)}</p>
                                            </div>
                                        </div>
                                    </div>
                                ))}

                                {allNotifications.length === 0 && !isLowBalance && (
                                    <div className="px-4 py-6 text-center">
                                        <p className="text-[10px] font-bold text-slate-400 uppercase">No new notifications</p>
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
                                <p className="text-sm font-bold text-slate-800 truncate">{user?.email || "—"}</p>
                            </div>

                            <Link to="/" className="md:hidden flex items-center gap-3 px-4 py-2.5 text-sm text-slate-600 hover:bg-slate-50 hover:text-green-600 transition-colors">
                                <ExternalLink size={18} /> View Site
                            </Link>
                            <Link to="/user/profile" className="flex items-center gap-3 px-4 py-2.5 text-sm text-slate-600 hover:bg-slate-50 hover:text-green-600 transition-colors">
                                <User size={18} /> My Profile
                            </Link>
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
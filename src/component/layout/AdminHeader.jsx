import { useState, useEffect, useRef, useMemo } from "react";
import {
  Bell, Bike, Wallet, ArrowDownRight, User, Menu,
  PanelLeftClose, PanelLeftOpen, ChevronDown, LogOut,
  MapPin, PlusCircle, ShieldCheck, Settings, Mail
} from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import { fetchAllRides } from "../../redux/reducer/Ride/RideSlice";
import { fetchBikes } from "../../redux/reducer/bike/bikeSlice";
import { fetchStations } from "../../redux/reducer/station/stationSlice";
import { logoutUser } from "../../redux/reducer/auth/AuthSlice";
import { onMessageListener } from "../../config/firebase";
import Swal from 'sweetalert2';
import toast from "react-hot-toast";

const AdminHeader = ({ toggleSidebar, isCollapsed }) => {
  const [showNotifDropdown, setShowNotifDropdown] = useState(false);
  const [showProfileDropdown, setShowProfileDropdown] = useState(false);
  // ✅ Firebase notifications state
  const [firebaseNotifs, setFirebaseNotifs] = useState([]);

  const notifRef = useRef(null);
  const profileRef = useRef(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { user } = useSelector((state) => state.auth);
  const { allRides = [] } = useSelector((state) => state.rides);
  const { bikes = [] } = useSelector((state) => state.bikes);

  useEffect(() => {
    dispatch(fetchAllRides());
    dispatch(fetchBikes());
    dispatch(fetchStations());
  }, [dispatch]);

  // ✅ Firebase foreground notifications
  useEffect(() => {
    if (user?.role !== "admin") return;

    const unsubscribe = onMessageListener((payload) => {
      const newNotif = {
        id: Date.now(),
        title: payload.notification?.title || "Notification",
        desc: payload.notification?.body || "",
        time: new Date(),
        type: payload.data?.type || "general",
        icon: getIcon(payload.data?.type),
        color: getColor(payload.data?.type),
      };
      setFirebaseNotifs((prev) => [newNotif, ...prev].slice(0, 5));
      toast.success(`${newNotif.title}\n${newNotif.desc}`, {
        duration: 5000,
        // ✅ YAHAN EMOJI KO ICON SE REPLACE KIYA HAI
        icon: <Bell size={18} className="text-green-600" />,
      });
    });

    return () => unsubscribe && unsubscribe();
  }, [user]);

  const getIcon = (type) => {
    if (type === "admin_ride_complete") return <Bike size={16} className="text-blue-500" />;
    if (type === "wallet_topup") return <Wallet size={16} className="text-emerald-500" />;
    if (type === "ride_start") return <MapPin size={16} className="text-green-500" />;
    return <Bell size={16} className="text-slate-500" />;
  };

  const getColor = (type) => {
    if (type === "admin_ride_complete") return "bg-blue-50";
    if (type === "wallet_topup") return "bg-emerald-50";
    if (type === "ride_start") return "bg-green-50";
    return "bg-slate-50";
  };

  const handleLogout = async () => {
    try {
      await dispatch(logoutUser()).unwrap();
      setShowProfileDropdown(false);
      navigate("/login");
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (notifRef.current && !notifRef.current.contains(event.target)) setShowNotifDropdown(false);
      if (profileRef.current && !profileRef.current.contains(event.target)) setShowProfileDropdown(false);
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // ✅ Ride based notifications (completed rides)
  const rideNotifs = useMemo(() => {
    return (Array.isArray(allRides) ? allRides : [])
      .filter((ride) => ride.status?.toLowerCase() === "completed")
      .slice(0, 3)
      .map((ride) => ({
        id: `ride-${ride._id}`,
        title: "🏁 Ride Completed",
        desc: `${ride.userId?.name || "User"} — Rs. ${ride.totalCost || 0} | ID: ${ride._id?.slice(-6).toUpperCase()}`,
        time: new Date(ride.updatedAt || ride.endTime || Date.now()),
        icon: <Bike size={16} className="text-blue-500" />,
        color: "bg-blue-50",
      }));
  }, [allRides]);

  // ✅ All notifications merge
  const allNotifications = [...firebaseNotifs, ...rideNotifs].slice(0, 6);

  const handleNotificationClick = (notification) => {
    setShowNotifDropdown(false);
    Swal.fire({
      title: notification.title,
      text: notification.desc,
      icon: "info",
      confirmButtonText: "Got It",
      confirmButtonColor: "#10B981",
    });
  };

  const timeAgo = (dateStr) => {
    if (!dateStr) return "";
    const diff = Math.floor((new Date() - new Date(dateStr)) / 60000);
    if (diff < 1) return "Just now";
    if (diff < 60) return `${diff} min ago`;
    if (diff < 1440) return `${Math.floor(diff / 60)} hr ago`;
    return `${Math.floor(diff / 1440)} days ago`;
  };

  return (
    <header className="h-20 bg-white border-b flex items-center justify-between px-8 sticky top-0 z-40">
      <div className="flex items-center gap-4">
        <button onClick={toggleSidebar} className="p-2 bg-slate-50 rounded-lg">
          {isCollapsed ? <PanelLeftOpen /> : <PanelLeftClose />}
        </button>
        <h2 className="font-bold">VoltRide HQ</h2>
      </div>

      <div className="flex items-center gap-6">

        {/* Notifications */}
        <div className="relative" ref={notifRef}>
          <button
            onClick={() => setShowNotifDropdown(!showNotifDropdown)}
            className={`p-2.5 rounded-xl relative ${showNotifDropdown ? 'bg-green-100 text-green-600' : 'text-slate-500 hover:bg-slate-100'}`}
          >
            <Bell size={20} />
            {allNotifications.length > 0 && (
              <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border-2 border-white animate-pulse"></span>
            )}
          </button>

          {showNotifDropdown && (
            <div className="absolute right-0 mt-3 w-80 bg-white border border-slate-100 rounded-2xl shadow-xl z-50 overflow-hidden">
              <div className="px-4 py-3 border-b bg-slate-50/50 flex justify-between items-center">
                <span className="font-bold text-slate-800 text-sm">Recent Activity</span>
                <span className="text-[10px] bg-green-500 text-white px-2 py-0.5 rounded-full uppercase">
                  {allNotifications.length} Live
                </span>
              </div>
              <div className="max-h-[400px] overflow-y-auto">
                {allNotifications.length > 0 ? allNotifications.map((n, i) => (
                  <div
                    key={n.id || i}
                    className="px-4 py-3 hover:bg-slate-50 border-b border-slate-50 flex gap-3 cursor-pointer transition-colors"
                    onClick={() => handleNotificationClick(n)}
                  >
                    <div className={`w-9 h-9 rounded-xl ${n.color} flex items-center justify-center shrink-0`}>
                      {n.icon}
                    </div>
                    <div className="flex-1">
                      <p className="text-[12px] font-bold text-slate-800">{n.title}</p>
                      <p className="text-[11px] text-slate-500 line-clamp-1">{n.desc}</p>
                      <p className="text-[10px] text-slate-400 mt-0.5">{timeAgo(n.time)}</p>
                    </div>
                  </div>
                )) : (
                  <div className="px-4 py-8 text-center">
                    <p className="text-[10px] font-bold text-slate-400 uppercase">No notifications</p>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>

        {/* Profile Dropdown */}
        <div className="relative" ref={profileRef}>
          <button
            onClick={() => setShowProfileDropdown(!showProfileDropdown)}
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
            <ChevronDown size={14} className={`text-slate-400 transition-transform duration-300 ${showProfileDropdown ? 'rotate-180' : ''}`} />
          </button>

          {showProfileDropdown && (
            <div className="absolute right-0 mt-3 w-56 bg-white border border-slate-100 rounded-2xl shadow-xl py-2 z-50 animate-in fade-in zoom-in-95 duration-200">
              <div className="px-4 py-2 border-b border-slate-50 mb-1">
                <p className="text-xs text-slate-400">Signed in as</p>
                <p className="text-sm font-bold text-slate-800 truncate">{user?.email || "—"}</p>
              </div>
              <Link to="/admin/settings" className="flex items-center gap-3 px-4 py-2.5 text-sm text-slate-600 hover:bg-slate-50 hover:text-green-600 transition-colors">
                <ShieldCheck size={18} /> My Profile
              </Link>
              <Link to="/admin/settings" className="flex items-center gap-3 px-4 py-2.5 text-sm text-slate-600 hover:bg-slate-50 hover:text-green-600 transition-colors">
                <Settings size={18} /> Settings
              </Link>
              <Link to="/support" className="flex items-center gap-3 px-4 py-2.5 text-sm text-slate-600 hover:bg-slate-50 hover:text-green-600 transition-colors">
                <Mail size={18} /> Support
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
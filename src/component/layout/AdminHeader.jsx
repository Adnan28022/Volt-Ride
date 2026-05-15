import { useState, useEffect, useRef, useMemo } from "react";
import {
  Bell, Bike, Wallet, ArrowDownRight, User, Menu,
  PanelLeftClose, PanelLeftOpen, ChevronDown, LogOut,
  MapPin, PlusCircle, Edit2, Info, ExternalLink, ShieldCheck, Settings, Mail
} from "lucide-react"; // Added missing icons here
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import { fetchAllRides } from "../../redux/reducer/Ride/RideSlice";
import { fetchBikes } from "../../redux/reducer/bike/bikeSlice";
import { fetchStations } from "../../redux/reducer/station/stationSlice";
import { logoutUser } from "../../redux/reducer/auth/AuthSlice";
import Swal from 'sweetalert2';

const AdminHeader = ({ toggleSidebar, isCollapsed }) => {
  const [showNotifDropdown, setShowNotifDropdown] = useState(false);
  const [showProfileDropdown, setShowProfileDropdown] = useState(false);
  const notifRef = useRef(null);
  const profileRef = useRef(null); // Yeh profileRef hai
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { user } = useSelector((state) => state.auth);
  const { allRides = [] } = useSelector((state) => state.rides);
  const { payments = [] } = useSelector((state) => state.payment);
  const { bikes = [] } = useSelector((state) => state.bikes);
  const { items: stations = [] } = useSelector((state) => state.stations);

  useEffect(() => {
    dispatch(fetchAllRides());
    dispatch(fetchBikes());
    dispatch(fetchStations());
  }, [dispatch]);

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

  // --- AAPKA ORIGINAL NOTIFICATION LOGIC ---
  const notifications = useMemo(() => {
    let allNotifications = [];
    const rideNotifs = (Array.isArray(allRides) ? allRides : []).filter(ride => ride.status === 'completed').map(ride => ({
      id: `ride-${ride._id}`,
      title: "Ride Completed",
      desc: `User ${ride.user?.name || 'N/A'} completed Ride ID ${ride._id?.slice(-5)} costing $${ride.totalCost?.toFixed(2)}.`,
      time: new Date(ride.updatedAt || Date.now()),
      icon: <Bike size={16} className="text-blue-500" />,
      color: "bg-blue-50",
      type: 'ride',
      data: ride
    }));
    allNotifications.push(...rideNotifs);

    const payNotifs = (Array.isArray(payments) ? payments : []).map(pay => ({
      id: `pay-${pay._id}`,
      title: pay.type === 'deduction' ? "Payment Deducted" : "Wallet Top-up",
      desc: `$${pay.amount?.toFixed(2)} ${pay.type === 'deduction' ? 'deducted from' : 'added to'} ${pay.user?.name || 'N/A'}'s wallet.`,
      time: new Date(pay.createdAt || Date.now()),
      icon: pay.type === 'deduction' ? <ArrowDownRight size={16} className="text-red-500" /> : <Wallet size={16} className="text-emerald-500" />,
      color: pay.type === 'deduction' ? "bg-red-50" : "bg-emerald-50",
      type: 'payment',
      data: pay
    }));
    allNotifications.push(...payNotifs);

    const bikeNotifs = (Array.isArray(bikes) ? bikes : []).flatMap(bike => {
      return [{
        id: `bike-add-${bike._id}`,
        title: "New Bike Added",
        desc: `Bike ${bike.bikeCode} (${bike.model}) added at ${bike.currentStation?.name || 'N/A'}.`,
        time: new Date(bike.createdAt || Date.now()),
        icon: <PlusCircle size={16} className="text-purple-500" />,
        color: "bg-purple-50",
        type: 'bike-added',
        data: bike
      }];
    });
    allNotifications.push(...bikeNotifs);

    return allNotifications.sort((a, b) => b.time - a.time).slice(0, 5);
  }, [allRides, payments, bikes, stations]);

  const handleNotificationClick = (notification) => {
    setShowNotifDropdown(false);
    let htmlContent = `<p><strong>Details:</strong> ${notification.desc}</p>`;
    Swal.fire({
      title: notification.title,
      icon: 'info',
      html: `<div class="text-left">${htmlContent}</div>`,
      confirmButtonText: 'Got It',
      confirmButtonColor: '#10B981',
    });
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
          <button onClick={() => setShowNotifDropdown(!showNotifDropdown)} className={`p-2.5 rounded-xl relative ${showNotifDropdown ? 'bg-green-100 text-green-600' : 'text-slate-500 hover:bg-slate-100'}`}>
            <Bell size={20} />
            {notifications.length > 0 && <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></span>}
          </button>
          {showNotifDropdown && (
            <div className="absolute right-0 mt-3 w-80 bg-white border border-slate-100 rounded-2xl shadow-xl z-50 overflow-hidden text-left">
              <div className="px-4 py-3 border-b bg-slate-50/50 flex justify-between items-center italic">
                <span className="font-bold text-slate-800 text-sm">Recent Activity</span>
                <span className="text-[10px] bg-green-500 text-white px-2 py-0.5 rounded-full uppercase">Live</span>
              </div>
              <div className="max-h-[400px] overflow-y-auto">
                {notifications.map((n) => (
                  <div key={n.id} className="px-4 py-3 hover:bg-slate-50 border-b border-slate-50 flex gap-3 cursor-pointer" onClick={() => handleNotificationClick(n)}>
                    <div className={`w-9 h-9 rounded-xl ${n.color} flex items-center justify-center shrink-0`}>{n.icon}</div>
                    <div className="flex-1"><p className="text-[12px] font-bold text-slate-800">{n.title}</p><p className="text-[11px] text-slate-500 line-clamp-1">{n.desc}</p></div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Profile Dropdown */}
        <div className="relative" ref={profileRef}> {/* Fixed: used profileRef instead of userRef */}
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
                <p className="text-sm font-bold text-slate-800 truncate">{user?.email || "admin@voltride.com"}</p>
              </div>

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
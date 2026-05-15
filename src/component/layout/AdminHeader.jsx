import { useState, useEffect, useRef, useMemo } from "react";
import {
  Bell, Bike, Wallet, ArrowDownRight, User, Menu,
  PanelLeftClose, PanelLeftOpen, ChevronDown, LogOut,
  MapPin, PlusCircle, Edit2, Info
} from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllRides } from "../../redux/reducer/Ride/RideSlice";
import { fetchBikes } from "../../redux/reducer/Bike/BikeSlice";
import { fetchStations } from "../../redux/reducer/Station/StationSlice";
import Swal from 'sweetalert2'; // Import sweetalert2

const AdminHeader = ({ toggleSidebar, isCollapsed }) => {
  const [showNotifDropdown, setShowNotifDropdown] = useState(false);
  const [showProfileDropdown, setShowProfileDropdown] = useState(false);
  const notifRef = useRef(null);
  const profileRef = useRef(null);
  const dispatch = useDispatch();

  // Redux States
  const { user } = useSelector((state) => state.auth);
  const { allRides = [] } = useSelector((state) => state.rides);
  const { payments = [] } = useSelector((state) => state.payment);
  const { bikes = [] } = useSelector((state) => state.bikes);
  const { items: stations = [] } = useSelector((state) => state.stations);

  // 1. Data Fetching
  useEffect(() => {
    dispatch(fetchAllRides());
    dispatch(fetchBikes());
    dispatch(fetchStations());
  }, [dispatch]);

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (notifRef.current && !notifRef.current.contains(event.target)) {
        setShowNotifDropdown(false);
      }
      if (profileRef.current && !profileRef.current.contains(event.target)) {
        setShowProfileDropdown(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // 2. Notifications Logic
  const notifications = useMemo(() => {
    let allNotifications = [];

    // Rides Mapping (Only completed rides)
    const rideNotifs = (Array.isArray(allRides) ? allRides : [])
      .filter(ride => ride.status === 'completed')
      .map(ride => ({
        id: `ride-${ride._id}`,
        title: "Ride Completed",
        desc: `User ${ride.user?.name || 'N/A'} completed Ride ID ${ride._id?.slice(-5)} costing $${ride.totalCost?.toFixed(2)}.`,
        time: new Date(ride.updatedAt || Date.now()),
        icon: <Bike size={16} className="text-blue-500" />,
        color: "bg-blue-50",
        type: 'ride',
        data: ride // Store full ride data
      }));
    allNotifications.push(...rideNotifs);

    // Payments Mapping (Deduction & Top-up)
    const payNotifs = (Array.isArray(payments) ? payments : []).map(pay => ({
      id: `pay-${pay._id}`,
      title: pay.type === 'deduction' ? "Payment Deducted" : "Wallet Top-up",
      desc: `$${pay.amount?.toFixed(2)} ${pay.type === 'deduction' ? 'deducted from' : 'added to'} ${pay.user?.name || 'N/A'}'s wallet.`,
      time: new Date(pay.createdAt || Date.now()),
      icon: pay.type === 'deduction' ? <ArrowDownRight size={16} className="text-red-500" /> : <Wallet size={16} className="text-emerald-500" />,
      color: pay.type === 'deduction' ? "bg-red-50" : "bg-emerald-50",
      type: 'payment',
      data: pay // Store full payment data
    }));
    allNotifications.push(...payNotifs);

    // Bike Notifications (New Additions, Updates)
    const bikeNotifs = (Array.isArray(bikes) ? bikes : []).flatMap(bike => {
      const bikeEvents = [];
      // New Bike Added
      bikeEvents.push({
        id: `bike-add-${bike._id}`,
        title: "New Bike Added",
        desc: `Bike ${bike.bikeCode} (${bike.model}) was added at station ${bike.currentStation?.name || 'N/A'}.`,
        time: new Date(bike.createdAt || Date.now()),
        icon: <PlusCircle size={16} className="text-purple-500" />,
        color: "bg-purple-50",
        type: 'bike-added',
        data: bike
      });

      // Bike Updated (Simplified: if updatedAt is distinct from createdAt)
      if (new Date(bike.updatedAt).getTime() - new Date(bike.createdAt).getTime() > 1000) { // If updated more than 1 second after creation
        bikeEvents.push({
          id: `bike-update-${bike._id}`,
          title: "Bike Updated",
          desc: `Bike ${bike.bikeCode} (${bike.model}) info updated. Status: ${bike.status}.`,
          time: new Date(bike.updatedAt || Date.now()),
          icon: <Edit2 size={16} className="text-yellow-500" />,
          color: "bg-yellow-50",
          type: 'bike-updated',
          data: bike
        });
      }
      return bikeEvents;
    });
    allNotifications.push(...bikeNotifs);

    // Station Notifications (New Additions, Updates)
    const stationNotifs = (Array.isArray(stations) ? stations : []).flatMap(station => {
      const stationEvents = [];
      // New Station Added
      stationEvents.push({
        id: `station-add-${station._id}`,
        title: "New Station Added",
        desc: `Station "${station.name}" (Capacity: ${station.capacity}) was added.`,
        time: new Date(station.createdAt || Date.now()),
        icon: <MapPin size={16} className="text-orange-500" />,
        color: "bg-orange-50",
        type: 'station-added',
        data: station
      });

      // Station Updated
      if (new Date(station.updatedAt).getTime() - new Date(station.createdAt).getTime() > 1000) {
        stationEvents.push({
          id: `station-update-${station._id}`,
          title: "Station Updated",
          desc: `Station "${station.name}" info updated. Bikes: ${(station.bikes || []).length}/${station.capacity}.`, // FIX APPLIED HERE
          time: new Date(station.updatedAt || Date.now()),
          icon: <Edit2 size={16} className="text-teal-500" />,
          color: "bg-teal-50",
          type: 'station-updated',
          data: station
        });
      }
      return stationEvents;
    });
    allNotifications.push(...stationNotifs);

    // Merge and Sort by time (most recent first), then take top 5
    return allNotifications
      .sort((a, b) => b.time - a.time)
      .slice(0, 5);
  }, [allRides, payments, bikes, stations]);

  // Handle Notification Click - Show SweetAlert
  const handleNotificationClick = (notification) => {
    setShowNotifDropdown(false); // Close dropdown immediately

    let htmlContent = '';
    let title = notification.title;
    const timeString = notification.time.toLocaleString();

    switch (notification.type) {
      case 'ride':
        const ride = notification.data;
        title = `Ride Details: ${ride._id?.slice(-5)}`;
        htmlContent = `
          <p><strong>Status:</strong> ${ride.status}</p>
          <p><strong>User:</strong> ${ride.user?.name || 'N/A'} (ID: ${ride.user?._id?.slice(-5) || 'N/A'})</p>
          <p><strong>Bike:</strong> ${ride.bike?.bikeCode || 'N/A'} (Model: ${ride.bike?.model || 'N/A'})</p>
          <p><strong>Start Station:</strong> ${ride.startStation?.name || 'N/A'}</p>
          <p><strong>End Station:</strong> ${ride.endStation?.name || 'N/A'}</p>
          <p><strong>Total Distance:</strong> ${ride.distance?.toFixed(2) || 'N/A'} km</p>
          <p><strong>Total Cost:</strong> $${ride.totalCost?.toFixed(2) || 'N/A'}</p>
          <p><strong>Started At:</strong> ${new Date(ride.startTime).toLocaleString()}</p>
          <p><strong>Ended At:</strong> ${new Date(ride.endTime).toLocaleString()}</p>
          <p class="text-xs text-gray-500 mt-2">Notification generated at: ${timeString}</p>
        `;
        break;

      case 'payment':
        const payment = notification.data;
        title = `${payment.type === 'deduction' ? 'Payment Deduction' : 'Wallet Top-up'}`;
        htmlContent = `
          <p><strong>Transaction ID:</strong> ${payment._id?.slice(-8)}</p>
          <p><strong>User:</strong> ${payment.user?.name || 'N/A'} (ID: ${payment.user?._id?.slice(-5) || 'N/A'})</p>
          <p><strong>Type:</strong> ${payment.type}</p>
          <p><strong>Amount:</strong> $${payment.amount?.toFixed(2)}</p>
          ${payment.ride ? `<p><strong>Associated Ride:</strong> ${payment.ride?.slice(-5)}</p>` : ''}
          <p><strong>Date:</strong> ${new Date(payment.createdAt).toLocaleString()}</p>
          <p class="text-xs text-gray-500 mt-2">Notification generated at: ${timeString}</p>
        `;
        break;

      case 'bike-added':
      case 'bike-updated':
        const bike = notification.data;
        title = `${notification.type === 'bike-added' ? 'New Bike Added' : 'Bike Information Updated'}`;
        htmlContent = `
          <p><strong>Bike Code:</strong> ${bike.bikeCode}</p>
          <p><strong>Model:</strong> ${bike.model}</p>
          <p><strong>Status:</strong> ${bike.status}</p>
          <p><strong>Current Station:</strong> ${bike.currentStation?.name || 'N/A'}</p>
          <p><strong>Battery Level:</strong> ${bike.batteryLevel}%</p>
          <p><strong>Added On:</strong> ${new Date(bike.createdAt).toLocaleString()}</p>
          ${notification.type === 'bike-updated' ? `<p><strong>Last Updated:</strong> ${new Date(bike.updatedAt).toLocaleString()}</p>` : ''}
          <p class="text-xs text-gray-500 mt-2">Notification generated at: ${timeString}</p>
        `;
        break;

      case 'station-added':
      case 'station-updated':
        const station = notification.data;
        title = `${notification.type === 'station-added' ? 'New Station Added' : 'Station Information Updated'}`;
        htmlContent = `
          <p><strong>Station Name:</strong> ${station.name}</p>
          <p><strong>Address:</strong> ${station.address}</p>
          <p><strong>Capacity:</strong> ${station.capacity}</p>
          <p><strong>Bikes Available:</strong> ${(station.bikes || []).length} / ${station.capacity}</p> <!-- FIX APPLIED HERE -->
          <p><strong>Added On:</strong> ${new Date(station.createdAt).toLocaleString()}</p>
          ${notification.type === 'station-updated' ? `<p><strong>Last Updated:</strong> ${new Date(station.updatedAt).toLocaleString()}</p>` : ''}
          <p class="text-xs text-gray-500 mt-2">Notification generated at: ${timeString}</p>
        `;
        break;

      default:
        htmlContent = `<p>${notification.desc}</p><p class="text-xs text-gray-500 mt-2">Notification generated at: ${timeString}</p>`;
        break;
    }

    Swal.fire({
      title: title,
      icon: 'info', // You can change icon based on type if needed
      html: `<div class="text-left">${htmlContent}</div>`, // Align text left inside SweetAlert
      confirmButtonText: 'Got It',
      customClass: {
        popup: 'w-[400px]', // Custom width for the popup
        title: 'text-xl font-bold',
        htmlContainer: 'text-sm'
      },
      showCloseButton: true,
      buttonsStyling: false, // Disable default styling to use Tailwind classes
      confirmButtonAriaLabel: 'Close notification details',
      confirmButtonColor: '#10B981', // Tailwind green-500
      didOpen: () => {
        // Optional: add any post-render logic here
      }
    });
  };

  return (
    <header className="h-20 bg-white border-b flex items-center justify-between px-8 sticky top-0 z-40">
      <div className="flex items-center gap-4">
        {/* Sidebar Toggle */}
        <button onClick={toggleSidebar} className="p-2 bg-slate-50 rounded-lg">
          {isCollapsed ? <PanelLeftOpen /> : <PanelLeftClose />}
        </button>
        <h2 className="font-bold">VoltRide HQ</h2>
      </div>

      <div className="flex items-center gap-6">
        {/* Notifications Dropdown */}
        <div className="relative" ref={notifRef}>
          <button
            onClick={() => setShowNotifDropdown(!showNotifDropdown)}
            className={`p-2.5 rounded-xl relative ${showNotifDropdown ? 'bg-green-100 text-green-600' : 'text-slate-500 hover:bg-slate-100'}`}
          >
            <Bell size={20} />
            {notifications.length > 0 && (
              <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></span>
            )}
          </button>

          {showNotifDropdown && (
            <div className="absolute right-0 mt-3 w-80 bg-white border border-slate-100 rounded-2xl shadow-xl z-50 overflow-hidden">
              <div className="px-4 py-3 border-b bg-slate-50/50 flex justify-between items-center">
                <span className="font-bold text-slate-800 text-sm">Recent Activity</span>
                <span className="text-[10px] bg-green-500 text-white px-2 py-0.5 rounded-full uppercase">Live</span>
              </div>

              <div className="max-h-[400px] overflow-y-auto">
                {notifications.length > 0 ? (
                  notifications.map((n) => (
                    <div
                      key={n.id}
                      className="px-4 py-3 hover:bg-slate-50 border-b border-slate-50 last:border-0 flex gap-3 transition-colors cursor-pointer"
                      onClick={() => handleNotificationClick(n)}
                    >
                      <div className={`w-9 h-9 rounded-xl ${n.color} flex items-center justify-center shrink-0`}>
                        {n.icon}
                      </div>
                      <div className="flex-1">
                        <div className="flex justify-between items-start">
                          <p className="text-[12px] font-bold text-slate-800">{n.title}</p>
                          <span className="text-[9px] text-slate-400 font-medium">
                            {n.time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                          </span>
                        </div>
                        <p className="text-[11px] text-slate-500 mt-0.5 leading-relaxed">{n.desc}</p>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="p-10 text-center">
                    <Bell className="mx-auto text-slate-200 mb-2" size={32} />
                    <p className="text-xs text-slate-400">No new notifications</p>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>

        {/* Profile Section with Dropdown */}
        <div className="relative" ref={profileRef}>
          <button
            onClick={() => setShowProfileDropdown(!showProfileDropdown)}
            className="flex items-center gap-2 text-slate-500 hover:text-slate-800 transition-colors"
          >
            <div className="w-10 h-10 bg-slate-800 rounded-xl flex items-center justify-center text-white font-bold">
              {user?.name?.charAt(0) || "A"}
            </div>
            <ChevronDown size={16} className={`transition-transform ${showProfileDropdown ? 'rotate-180' : ''}`} />
          </button>

          {showProfileDropdown && (
            <div className="absolute right-0 mt-3 w-48 bg-white border border-slate-100 rounded-2xl shadow-xl z-50 overflow-hidden">
              <div className="px-4 py-3 border-b bg-slate-50/50">
                <p className="font-bold text-slate-800 text-sm">{user?.name || "Admin"}</p>
                <p className="text-xs text-slate-500">{user?.email || "admin@example.com"}</p>
              </div>
              <div className="py-2">
                <a
                  href="#"
                  className="flex items-center gap-3 px-4 py-2 text-sm text-slate-700 hover:bg-slate-50"
                  onClick={() => { /* Handle profile view */ setShowProfileDropdown(false); }}
                >
                  <User size={16} /> My Profile
                </a>
                <a
                  href="#"
                  className="flex items-center gap-3 px-4 py-2 text-sm text-red-600 hover:bg-red-50"
                  onClick={() => { /* Handle logout */ setShowProfileDropdown(false); alert("Logging out!"); }}
                >
                  <LogOut size={16} /> Logout
                </a>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default AdminHeader;
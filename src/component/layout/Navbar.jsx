import { useState, useEffect, useRef } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logoutUser } from "../../redux/reducer/auth/AuthSlice";
import { 
  User, 
  LayoutDashboard, 
  LogOut, 
  ChevronDown, 
  Bike, 
  Menu, 
  X,
  ShieldCheck,
  Home,
  Settings
} from "lucide-react";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  
  const dropdownRef = useRef(null);
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { isAuthenticated, user } = useSelector((state) => state.auth);

  // --- Professional Global Scrollbar Styling ---
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);

    const style = document.createElement('style');
    style.innerHTML = `
      ::-webkit-scrollbar {
        width: 8px;
      }
      ::-webkit-scrollbar-track {
        background: #f8fafc;
      }
      ::-webkit-scrollbar-thumb {
        background: #cbd5e1;
        border-radius: 10px;
        border: 2px solid #f8fafc;
      }
      ::-webkit-scrollbar-thumb:hover {
        background: #10b981;
      }
      /* For Firefox */
      * {
        scrollbar-width: thin;
        scrollbar-color: #cbd5e1 #f8fafc;
      }
    `;
    document.head.appendChild(style);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      document.head.removeChild(style);
    };
  }, []);

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsProfileOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Prevent background scroll when mobile menu is open
  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "unset";
  }, [isOpen]);

  const isActive = (path) => location.pathname === path;

  const handleLogout = async () => {
    try {
      await dispatch(logoutUser()).unwrap();
      setIsProfileOpen(false);
      setIsOpen(false);
      navigate("/login");
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  const navLinks = [
    { name: "Home", path: "/", icon: <Home className="w-5 h-5" /> },
    { name: "Bikes", path: "/find-bikes", icon: <Bike className="w-5 h-5" /> },
    { name: "Safety", path: "/safety", icon: <ShieldCheck className="w-5 h-5" /> },
    { name: "Fleet", path: "/fleet", icon: <LayoutDashboard className="w-5 h-5" /> },
    { name: "Pricing", path: "/pricing", icon: <Settings className="w-5 h-5" /> },
  ];

  const dashboardPath = user?.role === "admin" ? "/admin/dashboard" : "/user/dashboard";

  return (
    <>
      <nav
        className={`fixed w-full z-[100] transition-all duration-700 ${
          scrolled
            ? "bg-white/75 backdrop-blur-md border-b border-slate-200/50 py-3 shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07)]"
            : "bg-transparent py-6"
        }`}
      >
        <div className="max-w-[1400px] mx-auto px-6 lg:px-10">
          <div className="flex justify-between items-center">
            
            {/* --- Logo Section --- */}
            <div className="flex items-center gap-4">
              <button 
                onClick={() => setIsOpen(true)} 
                className="md:hidden p-2.5 bg-slate-100 rounded-xl text-slate-900 active:scale-95 transition-all"
              >
                <Menu className="w-6 h-6" />
              </button>
              
              <Link to="/" className="flex items-center gap-3 group">
                <div className="relative bg-gradient-to-br from-emerald-500 to-emerald-700 p-2.5 rounded-2xl shadow-lg shadow-emerald-200 group-hover:-rotate-6 transition-transform duration-500">
                  <Bike className="w-5 h-5 text-white" />
                </div>
                <span className="text-2xl font-black tracking-tight text-slate-900 hidden sm:block">
                  Volt<span className="text-emerald-600">Ride</span>
                </span>
              </Link>
            </div>

            {/* --- Desktop Navigation --- */}
            <div className="hidden md:flex items-center gap-1 bg-slate-50/80 border border-slate-200/60 p-1.5 rounded-[20px] backdrop-blur-sm">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  to={link.path}
                  className={`px-5 py-2 text-[13px] font-bold tracking-wide transition-all duration-300 rounded-2xl ${
                    isActive(link.path)
                      ? "text-emerald-600 bg-white shadow-sm ring-1 ring-slate-200"
                      : "text-slate-500 hover:text-slate-900"
                  }`}
                >
                  {link.name}
                </Link>
              ))}
            </div>

            {/* --- Profile & Action Section --- */}
            <div className="flex items-center gap-3">
              {!isAuthenticated ? (
                <div className="hidden md:flex items-center gap-4">
                  <Link to="/login" className="text-sm font-bold text-slate-600 hover:text-emerald-600 transition-colors">
                    Sign In
                  </Link>
                  <Link
                    to="/register"
                    className="bg-slate-900 text-white px-7 py-3 rounded-2xl text-[13px] font-bold shadow-xl shadow-slate-200 hover:bg-emerald-600 hover:-translate-y-0.5 active:scale-95 transition-all duration-300"
                  >
                    Start Riding
                  </Link>
                </div>
              ) : (
                <div className="relative" ref={dropdownRef}>
                  <button
                    onClick={() => setIsProfileOpen(!isProfileOpen)}
                    className="flex items-center gap-3 p-1 rounded-2xl bg-slate-50 border border-slate-200 hover:bg-white transition-all duration-300 shadow-sm"
                  >
                    <div className="w-9 h-9 bg-emerald-600 rounded-xl flex items-center justify-center text-white font-black overflow-hidden shadow-inner italic">
                      {user?.name?.charAt(0).toUpperCase()}
                    </div>
                    <ChevronDown className={`w-4 h-4 text-slate-400 mr-2 transition-transform duration-500 ${isProfileOpen ? 'rotate-180' : ''}`} />
                  </button>

                  {/* Desktop Dropdown (Model Styling) */}
                  {isProfileOpen && (
                    <div className="absolute right-0 mt-4 w-64 bg-white/95 backdrop-blur-xl rounded-[28px] shadow-[0_20px_40px_-15px_rgba(0,0,0,0.15)] border border-slate-100 p-2.5 overflow-hidden transform origin-top-right transition-all duration-300 animate-in fade-in zoom-in duration-200">
                      <div className="px-4 py-4 bg-slate-50/50 rounded-2xl mb-2">
                        <div className="flex items-center gap-2 mb-1">
                          <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.1em]">Signed in as</p>
                          {user?.role === "admin" && (
                            <span className="bg-emerald-100 text-emerald-700 text-[8px] font-black px-1.5 py-0.5 rounded uppercase">Admin</span>
                          )}
                        </div>
                        <p className="text-sm font-bold text-slate-900 truncate">{user?.name}</p>
                        <p className="text-[11px] text-slate-500 truncate font-medium">{user?.email}</p>
                      </div>
                      
                      <div className="space-y-1">
                        <Link
                          to={dashboardPath}
                          className="flex items-center gap-3 px-4 py-3 text-sm text-slate-600 hover:bg-emerald-50 hover:text-emerald-700 rounded-xl font-bold transition-all"
                          onClick={() => setIsProfileOpen(false)}
                        >
                          {user?.role === "admin" ? <ShieldCheck className="w-4 h-4" /> : <LayoutDashboard className="w-4 h-4" />}
                          {user?.role === "admin" ? "Admin Panel" : "Dashboard"}
                        </Link>
                        <Link
                          to="/profile"
                          className="flex items-center gap-3 px-4 py-3 text-sm text-slate-600 hover:bg-emerald-50 hover:text-emerald-700 rounded-xl font-bold transition-all"
                          onClick={() => setIsProfileOpen(false)}
                        >
                          <User className="w-4 h-4" /> My Profile
                        </Link>
                      </div>

                      <div className="mt-2 pt-2 border-t border-slate-100 px-1">
                        <button
                          onClick={handleLogout}
                          className="flex items-center gap-3 w-full px-4 py-3 text-sm text-red-500 hover:bg-red-50 rounded-xl font-black uppercase tracking-wider transition-all"
                        >
                          <LogOut className="w-4 h-4" /> Logout
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </nav>

      {/* --- LEFT SIDE OFF-CANVAS (MOBILE) --- */}
      <div 
        className={`fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-[150] transition-opacity duration-500 ${
          isOpen ? "opacity-100 visible" : "opacity-0 invisible"
        }`}
        onClick={() => setIsOpen(false)}
      />

      <aside 
        className={`fixed top-0 left-0 h-full w-full bg-white z-[160] shadow-2xl transition-transform duration-500 ease-[cubic-bezier(0.4,0,0.2,1)] ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex flex-col h-full">
          {/* Drawer Header */}
          <div className="p-6 border-b border-slate-100 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-emerald-600 rounded-lg flex items-center justify-center text-white">
                <Bike className="w-4 h-4" />
              </div>
              <span className="font-black text-slate-900 tracking-tighter italic">VOLTRIDE</span>
            </div>
            <button onClick={() => setIsOpen(false)} className="p-2 hover:bg-slate-100 rounded-full transition-colors">
              <X className="w-5 h-5 text-slate-400" />
            </button>
          </div>

          {/* User Section (Mobile) */}
          {isAuthenticated && (
            <div className="mx-4 mt-6 p-4 bg-emerald-600 rounded-[24px] text-white shadow-xl shadow-emerald-100">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-white/20 backdrop-blur-md rounded-xl flex items-center justify-center text-xl font-black italic">
                  {user?.name?.charAt(0).toUpperCase()}
                </div>
                <div className="overflow-hidden">
                  <p className="font-bold truncate text-sm">{user?.name}</p>
                  <p className="text-[10px] opacity-80 uppercase tracking-widest">{user?.role}</p>
                </div>
              </div>
            </div>
          )}

          {/* Menu Links (Mobile) */}
          <div className="flex-1 overflow-y-auto px-4 py-6 space-y-1">
            <p className="px-4 text-[11px] font-bold text-slate-400 uppercase tracking-[0.2em] mb-4">Main Menu</p>
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                onClick={() => setIsOpen(false)}
                className={`flex items-center gap-4 px-4 py-4 rounded-2xl font-bold transition-all ${
                  isActive(link.path) 
                    ? "bg-emerald-50 text-emerald-700" 
                    : "text-slate-600 hover:bg-slate-50"
                }`}
              >
                <span className={isActive(link.path) ? "text-emerald-600" : "text-slate-400"}>
                  {link.icon}
                </span>
                <span className="flex-1">{link.name}</span>
              </Link>
            ))}
          </div>

          {/* Bottom Actions (Mobile) */}
          <div className="p-6 border-t border-slate-50 space-y-3">
            {isAuthenticated ? (
              <div className="grid grid-cols-2 gap-3">
                <Link 
                  to={dashboardPath} 
                  onClick={() => setIsOpen(false)}
                  className="flex flex-col items-center justify-center gap-1 p-4 bg-slate-900 text-white rounded-2xl font-bold text-xs"
                >
                  <LayoutDashboard className="w-4 h-4" /> Dashboard
                </Link>
                <button 
                  onClick={handleLogout}
                  className="flex flex-col items-center justify-center gap-1 p-4 bg-red-50 text-red-600 rounded-2xl font-bold text-xs"
                >
                  <LogOut className="w-4 h-4" /> Logout
                </button>
              </div>
            ) : (
              <div className="space-y-3">
                <Link to="/login" onClick={() => setIsOpen(false)} className="block w-full py-4 text-center font-bold text-slate-900 bg-slate-100 rounded-2xl">Login</Link>
                <Link to="/register" onClick={() => setIsOpen(false)} className="block w-full py-4 text-center font-bold bg-emerald-600 text-white rounded-2xl shadow-lg">Get Started</Link>
              </div>
            )}
          </div>
        </div>
      </aside>
    </>
  );
};

export default Navbar;
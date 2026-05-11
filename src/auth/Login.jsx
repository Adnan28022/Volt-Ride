import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { loginUser, clearErrors, clearMessages } from "../redux/reducer/auth/AuthSlice";
import { Mail, Lock, ArrowRight, Zap, Fingerprint, ChevronLeft, Eye, EyeOff, Loader2 } from "lucide-react";
import toast from "react-hot-toast";

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { loading, error, isAuthenticated, user } = useSelector((state) => state.auth);

  const [showPassword, setShowPassword] = useState(false);
  const [formSubmitted, setFormSubmitted] = useState(false); // <-- Yeh add kiya
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setFormSubmitted(true); // <-- Track karo ke form submit hua
    dispatch(loginUser(formData));
  };

  useEffect(() => {
    // Sirf tab run karo jab form submit hua ho
    if (!formSubmitted) return;

    if (error) {
      toast.error(error);
      dispatch(clearErrors());
      setFormSubmitted(false);
    }

    if (isAuthenticated && user) {
      toast.success(`Access Authorized: Welcome ${user.name}`);
      const targetPath = user.role === "admin" ? "/admin/dashboard" : "/user/dashboard";
      setTimeout(() => {
        navigate(targetPath);
        dispatch(clearMessages());
        setFormSubmitted(false);
      }, 500);
    }
  }, [error, isAuthenticated, user, formSubmitted, dispatch, navigate]);

  // Already logged in hai toh redirect karo
  useEffect(() => {
    if (isAuthenticated && user && !loading) {
      const targetPath = user.role === "admin" ? "/admin/dashboard" : "/user/dashboard";
      navigate(targetPath);
    }
  }, []); // Sirf mount par

  return (
    <div className="min-h-screen w-full bg-white flex flex-col lg:flex-row overflow-hidden font-sans">

      {/* Left Side: Brand Visuals */}
      <div className="hidden lg:flex lg:w-5/12 bg-emerald-950 text-white flex-col justify-between p-16 relative">
        <div className="absolute inset-0 opacity-30 bg-[url('https://blue-bike.be/wp-content/uploads/2023/12/GLARE-AGENCY-X-BLUEBIKE-PRESS-MOMENT-SEPTEMBER-2024-62-1.webp')] bg-cover bg-center"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-emerald-950 via-emerald-950/80 to-transparent"></div>

        <div className="relative z-20">
          <Link to="/" className="flex items-center gap-2 text-emerald-400 text-[10px] font-black uppercase tracking-[0.2em] mb-12 hover:text-white transition-colors">
            <ChevronLeft size={16} /> Back to Home
          </Link>
          <div className="flex items-center gap-3 mb-12">
            <div className="w-10 h-10 bg-emerald-500 rounded-2xl flex items-center justify-center shadow-lg"><Zap className="w-6 h-6 fill-current" /></div>
            <span className="text-2xl font-black italic tracking-tighter uppercase">Volt-X Series</span>
          </div>
          <h2 className="text-6xl xl:text-7xl font-black italic uppercase tracking-tighter leading-[0.9] mb-8">Welcome <br /> Back.</h2>
        </div>

        <div className="relative z-20 p-6 rounded-3xl bg-white/5 border border-white/10 backdrop-blur-md inline-flex items-center gap-4">
          <Fingerprint className="w-10 h-10 text-emerald-400" />
          <div>
            <p className="text-[11px] font-black uppercase tracking-widest">Biometric Security</p>
            <p className="text-[10px] font-bold text-emerald-300/60 uppercase italic">Session monitoring active.</p>
          </div>
        </div>
      </div>

      {/* Right Side: Login Form */}
      <div className="flex-1 flex flex-col justify-center items-center p-8 lg:p-20 relative">
        <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[radial-gradient(#000_1px,transparent_1px)] bg-[size:20px_20px]"></div>

        <div className="relative z-20 w-full max-w-md">
          <div className="mb-14 text-center lg:text-left">
            <h3 className="text-4xl font-black text-slate-900 italic uppercase tracking-tighter">Sign In</h3>
            <p className="text-[11px] font-black text-slate-400 uppercase tracking-[0.3em] mt-3">Enter credentials to manage your account.</p>
          </div>

          <form className="space-y-7" onSubmit={handleSubmit}>
            <div className="group">
              <label className="block text-[10px] font-black text-slate-500 uppercase tracking-widest mb-2 ml-1">Email Identifier</label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-300 group-focus-within:text-emerald-600 transition-colors" />
                <input
                  name="email"
                  type="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="USER@VOLTX.COM"
                  className="w-full pl-12 pr-4 py-5 bg-slate-50 border border-slate-100 rounded-2xl text-xs font-bold focus:bg-white focus:border-emerald-600 outline-none transition-all"
                />
              </div>
            </div>

            <div className="group">
              <label className="block text-[10px] font-black text-slate-500 uppercase tracking-widest mb-2 ml-1">Access Key</label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-300 group-focus-within:text-emerald-600 transition-colors" />
                <input
                  name="password"
                  type={showPassword ? "text" : "password"}
                  required
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="••••••••"
                  className="w-full pl-12 pr-12 py-5 bg-slate-50 border border-slate-100 rounded-2xl text-xs font-bold focus:bg-white focus:border-emerald-600 outline-none transition-all"
                />
                <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-300 hover:text-emerald-600">
                  {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading && formSubmitted} // <-- Sirf form submit hone par disable
              className="w-full py-6 bg-slate-900 text-white rounded-2xl font-black uppercase tracking-widest text-xs italic transition-all hover:bg-emerald-600 shadow-2xl shadow-slate-200 flex items-center justify-center gap-3 active:scale-[0.98]"
            >
              {loading && formSubmitted ? <Loader2 className="animate-spin" /> : "Authorize & Enter"}
              {!(loading && formSubmitted) && <ArrowRight size={18} />}
            </button>
          </form>

          <div className="mt-14 text-center lg:text-left border-t border-slate-50 pt-10">
            <p className="text-[11px] font-bold text-slate-400 uppercase tracking-widest italic">
              New to Volt-X? <Link to="/register" className="text-emerald-600 hover:underline ml-1">Register Profile</Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
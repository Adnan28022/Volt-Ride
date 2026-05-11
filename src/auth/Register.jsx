import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  registerUser,
  clearErrors,
  clearMessages,
} from "../redux/reducer/auth/AuthSlice";
import {
  User,
  Mail,
  Lock,
  Phone,
  ArrowRight,
  ShieldCheck,
  Zap,
  Eye,
  EyeOff,
  Loader2,
} from "lucide-react";

const Register = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // Redux state se loading, error aur message le rahe hain
  const { loading, error, message } = useSelector((state) => state.auth);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  // --- NAYA EFFECT: Page load hote hi purani errors aur states saaf karne ke liye ---
  useEffect(() => {
    dispatch(clearErrors());
    dispatch(clearMessages());
    // Agar aapke slice mein 'reset' action hai to wo bhi call kar sakte hain
  }, [dispatch]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match!");
      return;
    }
    dispatch(
      registerUser({
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        password: formData.password,
        role: "user",
      }),
    );
  };

  useEffect(() => {
    if (error) {
      alert(error);
      dispatch(clearErrors());
    }
    if (message) {
      alert(message);
      dispatch(clearMessages());
      navigate("/verify-otp", { state: { email: formData.email } });
    }
  }, [error, message, dispatch, navigate, formData.email]);

  return (
    <div className="min-h-screen w-full bg-white flex flex-col lg:flex-row overflow-hidden">
      {/* --- Left Side: Full Height Brand Experience --- */}
      <div className="hidden lg:flex lg:w-5/12 bg-emerald-950 text-white flex-col justify-between p-16 relative">
        <div className="absolute inset-0 opacity-20 bg-[url('https://blue-bike.be/wp-content/uploads/2023/12/GLARE-AGENCY-X-BLUEBIKE-PRESS-MOMENT-SEPTEMBER-2024-62-1.webp')] bg-cover bg-center z-0"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_10%_20%,rgba(16,185,129,0.3)_0%,transparent_100%)] z-10"></div>

        <div className="relative z-20">
          <div className="flex items-center gap-3 mb-20">
            <div className="w-10 h-10 bg-emerald-500 rounded-2xl flex items-center justify-center shadow-lg shadow-emerald-500/20">
              <Zap className="w-6 h-6 fill-current text-white" />
            </div>
            <span className="text-2xl font-black italic tracking-tighter uppercase">
              Volt-X Series
            </span>
          </div>

          <h2 className="text-6xl xl:text-7xl font-black italic uppercase tracking-tighter leading-[0.9] mb-8">
            Empower <br />
            Your <br />
            <span className="text-emerald-400 not-italic">Drive.</span>
          </h2>
          <p className="text-emerald-200 text-sm font-medium leading-relaxed max-w-sm italic opacity-80">
            Petrol ke kharche se azadi payein. Join the movement towards
            sustainable and cost-effective mobility in Pakistan.
          </p>
        </div>

        <div className="relative z-20 flex items-center gap-5 p-6 rounded-3xl bg-white/5 border border-white/10 backdrop-blur-md">
          <div className="w-12 h-12 rounded-2xl bg-emerald-500 flex items-center justify-center text-white shadow-xl shadow-emerald-500/20">
            <ShieldCheck className="w-7 h-7" />
          </div>
          <div>
            <p className="text-[11px] font-black uppercase tracking-widest text-white">
              Encrypted Registration
            </p>
            <p className="text-[10px] font-bold text-emerald-300 uppercase leading-tight mt-0.5">
              Your personal data is 100% secured with end-to-end encryption.
            </p>
          </div>
        </div>
      </div>

      {/* --- Right Side: Full Height Form --- */}
      <div className="flex-1 flex flex-col justify-center items-center p-8 lg:p-20 bg-white relative">
        <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[radial-gradient(#000_1px,transparent_1px)] bg-[size:20px_20px]"></div>

        <div className="relative z-20 w-full max-w-xl">
          <div className="mb-14 text-center lg:text-left">
            <h3 className="text-4xl font-black text-slate-900 italic uppercase tracking-tighter">
              Create Account
            </h3>
            <p className="text-[11px] font-black text-slate-400 uppercase tracking-[0.3em] mt-3">
              Enter your details to join the Volt ecosystem
            </p>
          </div>

          <form className="space-y-6" onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="group">
                <label className="block text-[10px] font-black text-slate-500 uppercase tracking-widest mb-2 ml-1">
                  Full Name
                </label>
                <div className="relative">
                  <User className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-300 group-focus-within:text-emerald-600 transition-colors" />
                  <input
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    type="text"
                    required
                    placeholder="Volt Rider"
                    className="w-full pl-12 pr-4 py-5 bg-slate-50 border border-slate-100 rounded-2xl text-xs font-bold outline-none focus:bg-white focus:border-emerald-600 focus:ring-4 focus:ring-emerald-50 transition-all"
                  />
                </div>
              </div>

              <div className="group">
                <label className="block text-[10px] font-black text-slate-500 uppercase tracking-widest mb-2 ml-1">
                  Phone Number
                </label>
                <div className="relative">
                  <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-300 group-focus-within:text-emerald-600 transition-colors" />
                  <input
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    type="tel"
                    required
                    placeholder="+92 3XX XXXXXXX"
                    className="w-full pl-12 pr-4 py-5 bg-slate-50 border border-slate-100 rounded-2xl text-xs font-bold outline-none focus:bg-white focus:border-emerald-600 focus:ring-4 focus:ring-emerald-50 transition-all"
                  />
                </div>
              </div>
            </div>

            <div className="group">
              <label className="block text-[10px] font-black text-slate-500 uppercase tracking-widest mb-2 ml-1">
                Email Address
              </label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-300 group-focus-within:text-emerald-600 transition-colors" />
                <input
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  type="email"
                  required
                  placeholder="hello@voltx.com"
                  className="w-full pl-12 pr-4 py-5 bg-slate-50 border border-slate-100 rounded-2xl text-xs font-bold outline-none focus:bg-white focus:border-emerald-600 focus:ring-4 focus:ring-emerald-50 transition-all"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="group">
                <label className="block text-[10px] font-black text-slate-500 uppercase tracking-widest mb-2 ml-1">
                  Password
                </label>
                <div className="relative">
                  <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-300 group-focus-within:text-emerald-600 transition-colors" />
                  <input
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    type={showPassword ? "text" : "password"}
                    required
                    placeholder="••••••••"
                    className="w-full pl-12 pr-12 py-5 bg-slate-50 border border-slate-100 rounded-2xl text-xs font-bold outline-none focus:bg-white focus:border-emerald-600 focus:ring-4 focus:ring-emerald-50 transition-all"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-300 hover:text-emerald-600"
                  >
                    {showPassword ? (
                      <EyeOff className="w-4 h-4" />
                    ) : (
                      <Eye className="w-4 h-4" />
                    )}
                  </button>
                </div>
              </div>

              <div className="group">
                <label className="block text-[10px] font-black text-slate-500 uppercase tracking-widest mb-2 ml-1">
                  Confirm
                </label>
                <div className="relative">
                  <ShieldCheck className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-300 group-focus-within:text-emerald-600 transition-colors" />
                  <input
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    type={showConfirmPassword ? "text" : "password"}
                    required
                    placeholder="••••••••"
                    className="w-full pl-12 pr-12 py-5 bg-slate-50 border border-slate-100 rounded-2xl text-xs font-bold outline-none focus:bg-white focus:border-emerald-600 focus:ring-4 focus:ring-emerald-50 transition-all"
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-300 hover:text-emerald-600"
                  >
                    {showConfirmPassword ? (
                      <EyeOff className="w-4 h-4" />
                    ) : (
                      <Eye className="w-4 h-4" />
                    )}
                  </button>
                </div>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="group relative w-full py-6 bg-slate-900 text-white rounded-2xl font-black uppercase tracking-widest text-xs italic transition-all hover:bg-emerald-600 shadow-2xl shadow-slate-200 disabled:opacity-70 disabled:cursor-not-allowed"
            >
              <span className="relative z-10 flex items-center justify-center gap-3">
                Registration
              </span>
            </button>
          </form>

          <div className="mt-12 text-center lg:text-left">
            <p className="text-[11px] font-bold text-slate-400 uppercase tracking-widest italic">
              Already have an account?{" "}
              <Link
                to="/login"
                className="text-emerald-600 hover:underline ml-1"
              >
                Log In Here
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;

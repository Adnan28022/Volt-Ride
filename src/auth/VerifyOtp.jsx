import React, { useState, useEffect, useRef } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { verifyOTP, resendOTP, clearErrors, clearMessages } from "../redux/reducer/auth/AuthSlice";
import {
  ShieldCheck,
  Zap,
  ArrowRight,
  RefreshCw,
  Loader2,
  ChevronLeft
} from "lucide-react";

const VerifyOtp = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();
  const email = location.state?.email || "";

  const { loading, error, message } = useSelector((state) => state.auth);
  
  // 6 digit OTP state
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const inputRefs = useRef([]);

  const handleChange = (element, index) => {
    if (isNaN(element.value)) return false;

    setOtp([...otp.map((d, idx) => (idx === index ? element.value : d))]);

    // Move to next input
    if (element.value !== "" && index < 5) {
      inputRefs.current[index + 1].focus();
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputRefs.current[index - 1].focus();
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const finalOtp = otp.join("");
    if (finalOtp.length !== 6) {
      alert("Please enter all 6 digits");
      return;
    }
    dispatch(verifyOTP({ email, otp: finalOtp }));
  };

  const handleResend = () => {
    if (email) dispatch(resendOTP(email));
  };

  useEffect(() => {
    if (!email) navigate("/register");
    if (error) {
      alert(error);
      dispatch(clearErrors());
    }
    if (message && message.includes("verified")) {
      alert(message);
      dispatch(clearMessages());
      navigate("/login");
    }
  }, [error, message, dispatch, navigate, email]);

  return (
    <div className="min-h-screen w-full bg-white flex flex-col lg:flex-row overflow-hidden">
      
      {/* --- Left Side: Full Height Brand Experience --- */}
      <div className="hidden lg:flex lg:w-5/12 bg-emerald-950 text-white flex-col justify-between p-16 relative">
        <div className="absolute inset-0 opacity-20 bg-[url('https://blue-bike.be/wp-content/uploads/2023/12/GLARE-AGENCY-X-BLUEBIKE-PRESS-MOMENT-SEPTEMBER-2024-62-1.webp')] bg-cover bg-center z-0"></div>
        
        <div className="relative z-20">
          <Link to="/register" className="inline-flex items-center gap-2 text-emerald-400 text-[10px] font-black uppercase tracking-widest hover:text-white transition-colors mb-20">
            <ChevronLeft className="w-4 h-4" />
            Back to Register
          </Link>

          <div className="flex items-center gap-3 mb-10">
            <div className="w-10 h-10 bg-emerald-500 rounded-2xl flex items-center justify-center shadow-lg shadow-emerald-500/20">
              <Zap className="w-6 h-6 fill-current text-white" />
            </div>
            <span className="text-2xl font-black italic tracking-tighter uppercase">Volt-X Series</span>
          </div>

          <h2 className="text-6xl xl:text-7xl font-black italic uppercase tracking-tighter leading-[0.9] mb-8">
            Verify <br />
            Your <br />
            <span className="text-emerald-400 not-italic">Identity.</span>
          </h2>
          <p className="text-emerald-200 text-sm font-medium leading-relaxed max-w-sm italic opacity-80">
            Humne aapke email <span className="text-white font-bold">{email}</span> par security code bheja hai. Isse enter kar ke apna account activate karein.
          </p>
        </div>

        <div className="relative z-20 flex items-center gap-5 p-6 rounded-3xl bg-white/5 border border-white/10 backdrop-blur-md">
          <div className="w-12 h-12 rounded-2xl bg-emerald-500 flex items-center justify-center text-white shadow-xl shadow-emerald-500/20">
            <ShieldCheck className="w-7 h-7" />
          </div>
          <div>
            <p className="text-[11px] font-black uppercase tracking-widest text-white">Secure Verification</p>
            <p className="text-[10px] font-bold text-emerald-300 uppercase leading-tight mt-0.5">End-to-end encrypted auth system.</p>
          </div>
        </div>
      </div>

      {/* --- Right Side: Full Height Form --- */}
      <div className="flex-1 flex flex-col justify-center items-center p-8 lg:p-20 bg-white relative">
        {/* Background Subtle Grid for Full Screen feel */}
        <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[radial-gradient(#000_1px,transparent_1px)] bg-[size:20px_20px]"></div>

        <div className="relative z-20 w-full max-w-md">
          <div className="mb-14 text-center lg:text-left">
            <h3 className="text-4xl font-black text-slate-900 italic uppercase tracking-tighter">Enter OTP</h3>
            <p className="text-[11px] font-black text-slate-400 uppercase tracking-[0.3em] mt-3">6-digit code sent to your inbox</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-10">
            {/* Individual OTP Inputs */}
            <div className="flex justify-between gap-2 md:gap-4">
              {otp.map((data, index) => (
                <input
                  key={index}
                  type="text"
                  maxLength="1"
                  ref={(el) => (inputRefs.current[index] = el)}
                  value={data}
                  onChange={(e) => handleChange(e.target, index)}
                  onKeyDown={(e) => handleKeyDown(e, index)}
                  className="w-12 h-16 md:w-16 md:h-20 bg-slate-50 border-2 border-slate-100 rounded-2xl text-2xl font-black text-center focus:bg-white focus:border-emerald-600 focus:ring-4 focus:ring-emerald-50 outline-none transition-all text-slate-800"
                />
              ))}
            </div>

            <button
              type="submit"
              disabled={loading}
              className="group relative w-full py-6 bg-slate-900 text-white rounded-2xl font-black uppercase tracking-widest text-xs italic transition-all hover:bg-emerald-600 shadow-2xl shadow-slate-200 disabled:opacity-70"
            >
              <span className="relative z-10 flex items-center justify-center gap-3">
                {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : "Verify & Continue"}
                {!loading && <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />}
              </span>
            </button>
          </form>

          <div className="mt-12 flex flex-col items-center gap-6">
            <button
              onClick={handleResend}
              disabled={loading}
              className="flex items-center gap-2 text-[11px] font-black text-slate-400 uppercase tracking-[0.2em] hover:text-emerald-600 transition-colors group"
            >
              <RefreshCw className={`w-4 h-4 ${loading ? "animate-spin" : "group-hover:rotate-180 transition-transform duration-500"}`} />
              Resend Verification Code
            </button>

            <p className="text-[11px] font-bold text-slate-300 uppercase tracking-widest italic">
              Wrong email address?{" "}
              <Link to="/register" className="text-emerald-600 hover:underline ml-1">
                Change Email
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VerifyOtp;
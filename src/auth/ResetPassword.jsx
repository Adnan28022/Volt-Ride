import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { resetPassword, clearErrors, clearMessages } from "../redux/reducer/auth/AuthSlice";
import { Lock, ArrowRight, Loader2, Eye, EyeOff, ShieldAlert } from "lucide-react";
import Swal from 'sweetalert2';

const ResetPassword = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { loading, error, message } = useSelector((state) => state.auth);

    const [showPassword, setShowPassword] = useState(false);
    const [newPassword, setNewPassword] = useState("");

    // Forgot Password page se data nikalna
    const email = location.state?.email;
    const otp = location.state?.otp;

    useEffect(() => {
        // Agar koi direct is link par aye bina OTP/Email ke, toh wapis bhej do
        if (!email || !otp) {
            navigate('/forgot-password');
        }
    }, [email, otp, navigate]);

    const handleSubmit = (e) => {
        e.preventDefault();
        // Backend Controller (resetPassword) requirement: { email, otp, newPassword }
        dispatch(resetPassword({ email, otp, newPassword }));
    };

    useEffect(() => {
        if (error) {
            Swal.fire({
                icon: 'error',
                title: 'Reset Failed',
                text: error || "Invalid OTP or Session Expired"
            }).then(() => {
                // Agar OTP galat hai toh wapis email page par bhej sakte hain
                navigate('/forgot-password');
            });
            dispatch(clearErrors());
        }
        if (message) {
            Swal.fire({
                icon: 'success',
                title: 'Success!',
                text: 'Your password has been reset successfully.'
            }).then(() => {
                navigate('/login');
            });
            dispatch(clearMessages());
        }
    }, [error, message, navigate, dispatch]);

    return (
        <div className="min-h-screen flex items-center justify-center bg-slate-50 p-6 font-sans">
            <div className="w-full max-w-md bg-white p-10 rounded-[2.5rem] shadow-2xl border border-slate-100">
                <div className="mb-10 text-center">
                    <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
                        <ShieldAlert size={32} />
                    </div>
                    <h3 className="text-3xl font-black italic uppercase text-slate-900 tracking-tighter">New Access Key</h3>
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em] mt-2">
                        Setting new password for: <span className="text-emerald-600">{email}</span>
                    </p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="group">
                        <label className="block text-[10px] font-black text-slate-500 uppercase tracking-widest mb-2 ml-1">New Secure Password</label>
                        <div className="relative">
                            <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-emerald-600 transition-colors" />
                            <input
                                type={showPassword ? "text" : "password"}
                                required
                                value={newPassword}
                                onChange={(e) => setNewPassword(e.target.value)}
                                placeholder="••••••••"
                                className="w-full pl-12 pr-12 py-5 bg-slate-50 border border-slate-100 rounded-2xl text-xs font-bold focus:bg-white focus:border-emerald-600 outline-none transition-all"
                            />
                            <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-300 hover:text-emerald-600"
                            >
                                {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                            </button>
                        </div>
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full py-6 bg-slate-900 text-white rounded-2xl font-black uppercase text-xs italic tracking-widest flex items-center justify-center gap-3 hover:bg-emerald-600 transition-all shadow-xl active:scale-95"
                    >
                        {loading ? <Loader2 className="animate-spin" /> : "Update Password & Login"}
                        {!loading && <ArrowRight size={18} />}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default ResetPassword;
import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { forgotPassword, verifyOTP, clearErrors, clearMessages } from "../redux/reducer/auth/AuthSlice";
import { Mail, ArrowRight, ChevronLeft, Loader2, Key } from "lucide-react";
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';

const MySwal = withReactContent(Swal);

const ForgotPassword = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { loading, error, message } = useSelector((state) => state.auth);
    const [email, setEmail] = useState("");
    const [formSubmitted, setFormSubmitted] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        setFormSubmitted(true);
        dispatch(forgotPassword(email));
    };

    useEffect(() => {
        if (!formSubmitted) return;

        if (error) {
            MySwal.fire({ icon: 'error', title: 'Error!', text: error });
            dispatch(clearErrors());
            setFormSubmitted(false);
        }

        if (message) {
            // Hum OTP verify nahi karenge, sirf collect karenge
            MySwal.fire({
                title: 'Check Your Email',
                text: `Enter the 6-digit code sent to ${email}`,
                input: 'text',
                inputPlaceholder: 'Enter OTP here...',
                inputAttributes: { maxlength: 6, textAlign: 'center' },
                showCancelButton: true,
                confirmButtonText: 'Continue to Reset',
                customClass: {
                    confirmButton: 'bg-emerald-600 text-white font-bold py-2 px-6 rounded-xl mx-2',
                    cancelButton: 'bg-slate-200 text-slate-700 font-bold py-2 px-6 rounded-xl mx-2'
                },
                buttonsStyling: false,
            }).then((result) => {
                if (result.isConfirmed && result.value) {
                    // OTP aur Email dono ko Reset Password page par bhej rahe hain
                    navigate('/reset-password', {
                        state: { email, otp: result.value }
                    });
                }
            });

            dispatch(clearMessages());
            setFormSubmitted(false);
        }
    }, [error, message, formSubmitted, dispatch, navigate, email]);

    return (
        <div className="min-h-screen w-full bg-white flex flex-col lg:flex-row overflow-hidden font-sans">
            {/* Left Side: Brand Visuals */}
            <div className="hidden lg:flex lg:w-5/12 bg-emerald-950 text-white flex-col justify-between p-16 relative">
                <div className="absolute inset-0 opacity-30 bg-[url('https://blue-bike.be/wp-content/uploads/2023/12/GLARE-AGENCY-X-BLUEBIKE-PRESS-MOMENT-SEPTEMBER-2024-62-1.webp')] bg-cover bg-center"></div>
                <div className="absolute inset-0 bg-gradient-to-t from-emerald-950 via-emerald-950/80 to-transparent"></div>

                <div className="relative z-20">
                    <Link to="/login" className="flex items-center gap-2 text-emerald-400 text-[10px] font-black uppercase tracking-[0.2em] mb-12 hover:text-white transition-colors">
                        <ChevronLeft size={16} /> Back to Login
                    </Link>
                    <div className="flex items-center gap-3 mb-12">
                        <div className="w-10 h-10 bg-emerald-500 rounded-2xl flex items-center justify-center shadow-lg"><Key className="w-6 h-6 fill-current" /></div>
                        <span className="text-2xl font-black italic tracking-tighter uppercase">Identity Recovery</span>
                    </div>
                    <h2 className="text-6xl xl:text-7xl font-black italic uppercase tracking-tighter leading-[0.9] mb-8">Secure <br /> Access <br /> Reset.</h2>
                </div>
            </div>

            {/* Right Side Form */}
            <div className="flex-1 flex flex-col justify-center items-center p-8 lg:p-20 relative">
                <div className="relative z-20 w-full max-w-md">
                    <div className="mb-14">
                        <h3 className="text-4xl font-black text-slate-900 italic uppercase tracking-tighter">Forgot Password</h3>
                        <p className="text-[11px] font-black text-slate-400 uppercase tracking-[0.3em] mt-3">We'll send a 6-digit verification code to your email.</p>
                    </div>

                    <form className="space-y-7" onSubmit={handleSubmit}>
                        <div className="group">
                            <label className="block text-[10px] font-black text-slate-500 uppercase tracking-widest mb-2 ml-1">Registered Email</label>
                            <div className="relative">
                                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-300 group-focus-within:text-emerald-600 transition-colors" />
                                <input
                                    name="email"
                                    type="email"
                                    required
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    placeholder="USER@VOLTX.COM"
                                    className="w-full pl-12 pr-4 py-5 bg-slate-50 border border-slate-100 rounded-2xl text-xs font-bold focus:bg-white focus:border-emerald-600 outline-none transition-all"
                                />
                            </div>
                        </div>

                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full py-6 bg-slate-900 text-white rounded-2xl font-black uppercase tracking-widest text-xs italic transition-all hover:bg-emerald-600 shadow-2xl flex items-center justify-center gap-3"
                        >
                            {loading ? <Loader2 className="animate-spin" /> : "Request Verification Code"}
                            {!loading && <ArrowRight size={18} />}
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default ForgotPassword;
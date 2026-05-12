import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loadStripe } from "@stripe/stripe-js";
import {
    Elements,
    CardElement,
    useStripe,
    useElements,
} from "@stripe/react-stripe-js";
import { Plus, CreditCard, Loader2, CheckCircle, AlertCircle } from "lucide-react";
import toast from "react-hot-toast";
import axios from "axios";
import { API_BASE_URL, STRIPE_PUBLIC_KEY } from "../../../utils/ApiUrl";
import { confirmWalletTopup } from "../../../redux/reducer/auth/AuthSlice";

const stripePromise = loadStripe(STRIPE_PUBLIC_KEY);

// =====================
// Stripe Card Form
// =====================
const CheckoutForm = ({ amount, onSuccess }) => {
    const stripe = useStripe();
    const elements = useElements();
    const dispatch = useDispatch();
    const { user } = useSelector((state) => state.auth);
    const [loading, setLoading] = useState(false);

    console.log("user", user)

    const handlePay = async (e) => {
        e.preventDefault();
        if (!stripe || !elements) return;

        // Safety check — user must be logged in
        if (!user?.id) {
            toast.error("Session expired. Please log in again.");
            return;
        }

        setLoading(true);
        try {
            // 1. Get client secret from backend
            const { data } = await axios.post(
                `${API_BASE_URL}/payment/create-intent`,
                { amount, userId: user.id },
                { withCredentials: true }
            );

            // 2. Confirm card payment with Stripe
            const { error, paymentIntent } = await stripe.confirmCardPayment(
                data.clientSecret,
                {
                    payment_method: {
                        card: elements.getElement(CardElement),
                        billing_details: { name: user?.name || "User" },
                    },
                }
            );

            if (error) {
                toast.error(error.message);
                return;
            }

            // 3. Confirm with backend — wallet gets updated
            await dispatch(confirmWalletTopup({
                paymentIntentId: paymentIntent.id,
                userId: user.id,
                amount,
            })).unwrap();

            toast.success(`Rs. ${amount} wallet mein add ho gaye!`);
            onSuccess();
        } catch (err) {
            toast.error(err?.message || "Payment failed. Try again!");
        } finally {
            setLoading(false);
        }
    };

    // Show warning if user is not in Redux state
    if (!user?.id) {
        return (
            <div className="flex items-center gap-2 p-4 bg-red-50 border border-red-100 rounded-2xl">
                <AlertCircle size={16} className="text-red-500 shrink-0" />
                <p className="text-xs font-bold text-red-500">
                    Session expired. Please log out and log in again.
                </p>
            </div>
        );
    }

    return (
        <form onSubmit={handlePay} className="space-y-4">
            <div className="p-4 bg-slate-50 border border-slate-200 rounded-2xl">
                <CardElement
                    options={{
                        style: {
                            base: {
                                fontSize: "14px",
                                fontFamily: "monospace",
                                color: "#0f172a",
                                "::placeholder": { color: "#94a3b8" },
                            },
                        },
                    }}
                />
            </div>
            <button
                type="submit"
                disabled={loading || !stripe}
                className="w-full bg-slate-900 disabled:bg-slate-400 text-white font-black py-4 rounded-2xl flex items-center justify-center gap-3 shadow-xl transition-all active:scale-95"
            >
                {loading ? (
                    <Loader2 size={18} className="animate-spin" />
                ) : (
                    <>
                        <CreditCard size={18} />
                        Pay Rs. {amount}
                    </>
                )}
            </button>
        </form>
    );
};

// =====================
// Main AddFunds Component
// =====================
const AddFunds = () => {
    const presets = ["500", "1000", "2000", "2500"];
    const [amount, setAmount] = useState("");
    const [showCard, setShowCard] = useState(false);
    const [paid, setPaid] = useState(false);

    const handlePreset = (value) => {
        setAmount(value);
        setShowCard(false);
        setPaid(false);
    };

    const handleProceed = () => {
        if (!amount || Number(amount) < 100) {
            toast.error("Minimum amount is Rs. 100");
            return;
        }
        setShowCard(true);
    };

    const handleSuccess = () => {
        setPaid(true);
        setShowCard(false);
        setAmount("");
    };

    return (
        <div className="bg-white border border-slate-200 rounded-3xl p-6 shadow-sm">
            <h4 className="text-xs font-black text-slate-900 uppercase tracking-widest mb-6 flex items-center gap-2">
                <Plus size={16} className="text-green-600" /> Add Funds
            </h4>

            {paid ? (
                <div className="flex flex-col items-center gap-3 py-6">
                    <CheckCircle size={40} className="text-green-500" />
                    <p className="text-sm font-black text-slate-900">Payment Successful!</p>
                    <button
                        onClick={() => setPaid(false)}
                        className="text-xs font-bold text-green-600 hover:underline"
                    >
                        Add More Funds
                    </button>
                </div>
            ) : (
                <>
                    {/* Preset Amounts */}
                    <div className="grid grid-cols-2 gap-3 mb-4">
                        {presets.map((preset) => (
                            <button
                                key={preset}
                                onClick={() => handlePreset(preset)}
                                className={`py-3 border rounded-2xl text-sm font-black transition-all ${amount === preset
                                    ? "bg-green-600 text-white border-green-600"
                                    : "border-slate-100 bg-slate-50 hover:bg-green-600 hover:text-white"
                                    }`}
                            >
                                Rs. {preset}
                            </button>
                        ))}
                    </div>

                    {/* Custom Amount */}
                    <input
                        type="number"
                        placeholder="Enter custom amount"
                        value={amount}
                        onChange={(e) => {
                            setAmount(e.target.value);
                            setShowCard(false);
                        }}
                        min="100"
                        className="w-full bg-slate-50 border border-slate-100 rounded-2xl px-5 py-3 text-sm focus:outline-none focus:border-green-500 font-bold mb-4"
                    />

                    {/* Proceed Button */}
                    {!showCard && (
                        <button
                            onClick={handleProceed}
                            disabled={!amount}
                            className="w-full bg-slate-900 disabled:bg-slate-400 text-white font-black py-4 rounded-2xl flex items-center justify-center gap-3 shadow-xl transition-all active:scale-95 mb-4"
                        >
                            <CreditCard size={18} />
                            {amount ? `Proceed — Rs. ${amount}` : "Enter Amount"}
                        </button>
                    )}

                    {/* Stripe Card Form */}
                    {showCard && (
                        <Elements stripe={stripePromise}>
                            <CheckoutForm amount={Number(amount)} onSuccess={handleSuccess} />
                        </Elements>
                    )}
                </>
            )}
        </div>
    );
};

export default AddFunds;
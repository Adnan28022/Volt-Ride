import React, { useState, useEffect, useMemo, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deductWalletBalance } from "../../../redux/reducer/auth/AuthSlice";
import {
  QrCode, Zap, Loader2, X, Lock, MapPin, ChevronRight, Navigation,
} from "lucide-react";
import {
  unlockBike, lockBike, fetchBikes, updateBikeLocation,
} from "../../../redux/reducer/bike/bikeSlice";
import { getActiveRide } from "../../../redux/reducer/Ride/RideSlice";
import { recordDeduction } from "../../../redux/reducer/payment/paymentSlice";
import toast from "react-hot-toast";
import Swal from "sweetalert2";

const QuickUnlock = ({ selectedStation, onStationChange }) => {
  const dispatch = useDispatch();
  const trackingTimer = useRef(null);

  const { user } = useSelector((state) => state.auth);
  const { bikes, loading: bikeLoading } = useSelector((state) => state.bikes);
  const { isRiding, activeRide, loading: rideLoading } = useSelector((state) => state.rides);
  const { items: stations } = useSelector((state) => state.stations);

  const [isManual, setIsManual] = useState(false);
  const [bikeCode, setBikeCode] = useState("");
  const [elapsedTime, setElapsedTime] = useState("00:00:00");
  const [totalCost, setTotalCost] = useState(0);
  const [localLoading, setLocalLoading] = useState(false);

  // ✅ Always get userId safely
  const userId = user?._id || user?.id;

  // --- 1 MINUTE TRACKING ---
  useEffect(() => {

    if (isRiding && activeRide) {
      trackingTimer.current = setInterval(() => {
        if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition(
            (position) => {
              dispatch(updateBikeLocation({
                rideId: activeRide._id,
                bikeId: activeRide.bikeId?._id || activeRide.bikeId,
                lat: position.coords.latitude,
                lng: position.coords.longitude,
              }));
            },
            (err) => console.error("Location Tracking Error:", err),
            { enableHighAccuracy: true },
          );
        }
      }, 60000);
    }
    return () => {
      if (trackingTimer.current) clearInterval(trackingTimer.current);
    };
  }, [isRiding, activeRide, dispatch]);

  // --- FETCH USER DATA ---
  useEffect(() => {
    if (userId) {
      dispatch(getActiveRide(userId));
      dispatch(fetchBikes());
    }
  }, [dispatch, userId]);

  const currentBikeData = useMemo(() => {
    if (!isRiding || !activeRide || !bikes || bikes.length === 0) return null;
    const activeId = activeRide.bikeId?._id || activeRide.bikeId;
    return bikes.find((b) => b._id === activeId);
  }, [isRiding, activeRide, bikes]);

  const RATE_PER_HOUR = currentBikeData?.price_per_hour || 0;

  // --- TIMER & COST ---
  useEffect(() => {
    let interval = null;
    if (isRiding && activeRide?.startTime) {
      interval = setInterval(() => {
        const start = new Date(activeRide.startTime).getTime();
        const now = new Date().getTime();
        const diff = now - start;
        if (diff > 0) {
          const hours = Math.floor(diff / (1000 * 60 * 60));
          const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
          const seconds = Math.floor((diff % (1000 * 60)) / 1000);
          setElapsedTime(
            `${hours.toString().padStart(2, "0")}:${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`,
          );
          setTotalCost(((diff / (1000 * 60 * 60)) * RATE_PER_HOUR).toFixed(2));
        }
      }, 1000);
    } else {
      setElapsedTime("00:00:00");
      setTotalCost(0);
    }
    return () => { if (interval) clearInterval(interval); };
  }, [isRiding, activeRide, RATE_PER_HOUR]);

  // --- UNLOCK ---
  const handleUnlock = async (e) => {
    e.preventDefault();
    if (!userId) return toast.error("Please login first!");
    if (!bikeCode) return toast.error("Enter bike code!");
    setLocalLoading(true);
    if (!navigator.geolocation) {
      setLocalLoading(false);
      return toast.error("GPS not supported by your browser");
    }
    navigator.geolocation.getCurrentPosition(
      async (position) => {
        try {
          await dispatch(unlockBike({
            bikeCode: bikeCode.trim().toUpperCase(),
            userId,
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          })).unwrap();
          toast.success("Ride Started!");
          setBikeCode("");
          setIsManual(false);
          await dispatch(getActiveRide(userId));
        } catch (err) {
          toast.error(err || "Failed to unlock");
        } finally {
          setLocalLoading(false);
        }
      },
      () => {
        setLocalLoading(false);
        toast.error("Please enable Location to start ride");
      },
      { enableHighAccuracy: true },
    );
  };

  // --- LOCK ---
  const handleLock = async () => {
    if (!userId) return toast.error("Session expired. Please login again.");

    if (!selectedStation) {
      return Swal.fire({
        title: "Station Required",
        text: "Please select a drop-off station.",
        icon: "info",
        confirmButtonColor: "#10b981",
        background: "#0f172a",
        color: "#fff",
      });
    }

    // ✅ Wallet balance check
    const walletBalance = user?.walletBalance || 0;
    if (walletBalance < totalCost) {
      return Swal.fire({
        title: "Insufficient Balance!",
        html: `
          <p class="text-slate-300 text-sm">Wallet mein Rs. <b class="text-white">${walletBalance}</b> hain lekin ride ka cost Rs. <b class="text-red-400">${totalCost}</b> hai.</p>
          <p class="text-slate-400 text-xs mt-2">Pehle wallet top-up karein.</p>
        `,
        icon: "warning",
        confirmButtonText: "Top Up Wallet",
        confirmButtonColor: "#10b981",
        background: "#0f172a",
        color: "#fff",
      });
    }

    const result = await Swal.fire({
      title: "End Ride & Pay",
      html: `
        <div class="space-y-3 text-left bg-slate-800/50 p-4 rounded-xl border border-white/10 mt-4">
          <div class="flex justify-between text-white"><span>Duration:</span><span class="font-mono text-green-400">${elapsedTime}</span></div>
          <div class="flex justify-between text-white"><span>Rate:</span><span>Rs. ${RATE_PER_HOUR}/hr</span></div>
          <div class="flex justify-between text-white"><span>Wallet Balance:</span><span class="text-blue-400">Rs. ${walletBalance}</span></div>
          <div class="border-t border-white/10 pt-2 flex justify-between text-xl font-bold text-green-500">
            <span>Total:</span><span>Rs. ${totalCost}</span>
          </div>
        </div>`,
      showCancelButton: true,
      confirmButtonText: "Confirm Payment",
      confirmButtonColor: "#10b981",
      background: "#0f172a",
      color: "#fff",
    });

    if (result.isConfirmed) {
      setLocalLoading(true);
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          try {
            const rideId = activeRide._id;
            const bikeId = activeRide.bikeId?._id || activeRide.bikeId;

            // ✅ Step 1: Lock the bike
            await dispatch(lockBike({
              bikeId,
              stationId: selectedStation._id,
              userId,
              totalCost,
              lat: position.coords.latitude,
              lng: position.coords.longitude,
            })).unwrap();

            // ✅ Step 2: Deduct from backend wallet + save payment record
            await dispatch(recordDeduction({
              userId,
              amount: Number(totalCost),
              rideId,
            })).unwrap();

            // ✅ Step 3: Update Redux wallet balance locally for instant UI update
            dispatch(deductWalletBalance(Number(totalCost)));

            toast.success(`Ride Ended. Rs. ${totalCost} wallet se deduct!`);
            onStationChange(null);
            if (trackingTimer.current) clearInterval(trackingTimer.current);
            await dispatch(getActiveRide(userId));
            await dispatch(fetchBikes());
          } catch (err) {
            toast.error(err || "Failed to end ride");
          } finally {
            setLocalLoading(false);
          }
        },
        () => {
          setLocalLoading(false);
          toast.error("Need location to end ride");
        },
      );
    }
  };

  const isGlobalLoading = bikeLoading || rideLoading || localLoading;

  return (
    <div className="relative overflow-hidden bg-slate-900 border border-white/10 rounded-[2.5rem] p-8 shadow-2xl h-full flex flex-col justify-between transition-all duration-500 min-h-full">
      <div className="absolute -top-24 -right-24 w-64 h-64 blur-[80px] rounded-full transition-colors duration-1000 bg-green-500/20"></div>

      {isRiding && activeRide ? (
        <div className="relative z-10 flex flex-col h-full animate-in fade-in duration-500">
          <div className="flex justify-between items-start">
            <div className="space-y-1">
              <div className="flex items-center gap-2 px-3 py-1 bg-green-500/10 border border-green-500/20 rounded-full w-fit">
                <div className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse"></div>
                <span className="text-[10px] font-black text-green-500 uppercase tracking-widest">In Progress</span>
              </div>
              <h3 className="text-2xl font-bold text-white tracking-tight">Active Journey</h3>
            </div>
            <div className="p-3 bg-white/5 rounded-2xl border border-white/10">
              <Navigation size={20} className="text-green-400" />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4 my-8">
            <div className="bg-white/5 p-4 rounded-3xl border border-white/5">
              <p className="text-[10px] uppercase font-bold text-slate-400 mb-1">Time</p>
              <p className="text-xl font-mono font-bold text-white">{elapsedTime}</p>
            </div>
            <div className="bg-white/5 p-4 rounded-3xl border border-white/5">
              <p className="text-[10px] uppercase font-bold text-slate-400 mb-1">Cost</p>
              <p className="text-xl font-bold text-green-400">Rs. {totalCost}</p>
            </div>
          </div>

          {/* Wallet balance */}
          <div className="bg-white/5 px-4 py-3 rounded-2xl border border-white/5 mb-4 flex justify-between items-center">
            <p className="text-[10px] uppercase font-bold text-slate-400">Wallet Balance</p>
            <p className={`text-sm font-black ${(user?.walletBalance || 0) < totalCost ? "text-red-400" : "text-blue-400"}`}>
              Rs. {user?.walletBalance || 0}
            </p>
          </div>

          <div className="flex-1 space-y-3">
            <label className="text-[11px] font-bold text-slate-400 uppercase tracking-widest ml-2">Drop-off Point</label>
            <div className="relative group">
              <div className="absolute left-4 top-1/2 -translate-y-1/2 text-green-400 pointer-events-none">
                <MapPin size={18} />
              </div>
              <select
                value={selectedStation?._id || ""}
                onChange={(e) => onStationChange(stations.find((s) => s._id === e.target.value))}
                className="w-full bg-slate-800 border border-white/10 rounded-2xl pl-12 pr-10 py-4 text-sm font-semibold text-white outline-none focus:ring-2 ring-green-500/20 transition-all appearance-none cursor-pointer"
              >
                <option value="" className="text-white bg-slate-900">Select Station</option>
                {stations.map((s) => (
                  <option key={s._id} value={s._id} className="text-white bg-slate-900">{s.name}</option>
                ))}
              </select>
              <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-slate-500">
                <ChevronRight size={16} className="rotate-90" />
              </div>
            </div>
          </div>

          <button
            onClick={handleLock}
            disabled={isGlobalLoading}
            className="w-full mt-6 bg-green-600 hover:bg-green-700 disabled:bg-slate-700 text-white rounded-2xl py-5 font-bold transition-all shadow-lg shadow-green-500/20 active:scale-[0.98]"
          >
            <div className="flex items-center justify-center gap-3">
              {isGlobalLoading
                ? <Loader2 className="animate-spin" size={24} />
                : <><Lock size={20} /><span className="text-lg">End My Ride</span></>
              }
            </div>
          </button>
        </div>
      ) : (
        <div className="relative z-10 animate-in slide-in-from-right-4 duration-500">
          <Zap size={24} className="text-green-500 fill-green-500 mb-6" />
          <h3 className="text-3xl font-bold text-white mb-2">Start Journey</h3>
          <p className="text-slate-400 text-sm mb-10 leading-relaxed">
            Scan the QR code or enter bike ID manually to unlock.
          </p>
          <div className="space-y-4">
            {!isManual ? (
              <>
                <button
                  onClick={() => setIsManual(true)}
                  disabled={isGlobalLoading}
                  className="w-full bg-green-600 hover:bg-green-700 disabled:bg-slate-700 text-white rounded-3xl py-5 font-bold flex items-center justify-center gap-3 shadow-xl shadow-green-500/20 transition-all active:scale-[0.98]"
                >
                  <QrCode size={22} /> {isGlobalLoading ? "Processing..." : "Scan QR Code"}
                </button>
                <button
                  onClick={() => setIsManual(true)}
                  className="w-full bg-white/5 border border-white/10 text-white rounded-3xl py-5 font-bold hover:bg-white/10 transition-all"
                >
                  Enter Code Manually
                </button>
              </>
            ) : (
              <form onSubmit={handleUnlock} className="space-y-4">
                <div className="relative">
                  <input
                    type="text"
                    placeholder="BIKE CODE"
                    value={bikeCode}
                    onChange={(e) => setBikeCode(e.target.value)}
                    className="w-full bg-slate-800 border border-white/10 rounded-3xl py-6 text-center font-mono text-2xl uppercase text-white outline-none focus:border-green-500 transition-all"
                    autoFocus
                  />
                  <button
                    type="button"
                    onClick={() => setIsManual(false)}
                    className="absolute -top-3 -right-2 bg-slate-800 p-1 rounded-full border border-white/10 text-slate-400 hover:text-white"
                  >
                    <X size={16} />
                  </button>
                </div>
                <button
                  type="submit"
                  disabled={isGlobalLoading || !bikeCode}
                  className="w-full bg-green-600 hover:bg-green-700 disabled:bg-slate-700 text-white rounded-3xl py-5 font-bold transition-all shadow-lg shadow-green-500/10"
                >
                  {isGlobalLoading ? <Loader2 className="animate-spin mx-auto" /> : "Unlock Now"}
                </button>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default QuickUnlock;
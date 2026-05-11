import React, { useEffect, useState, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  Zap,
  Battery,
  Gauge,
  ArrowUpRight,
  Loader2,
  ChevronDown,
  ShieldCheck,
  ShieldAlert,
  UserCheck,
} from "lucide-react";
import { fetchBikes } from "../redux/reducer/bike/bikeSlice";
import { FILE_URL } from "../utils/ApiUrl";

const OurFleet = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Redux state selection with safety checks
  const bikeState = useSelector((state) => state.bikes || {});
  const { loading } = bikeState;
  
  // Ensure bikes is always an array even if the state structure is nested
  const bikes = Array.isArray(bikeState.bikes) ? bikeState.bikes : [];
  
  const { user } = useSelector((state) => state.auth || {});

  const [visibleCount, setVisibleCount] = useState(3);
  const fleetRef = useRef(null);

  useEffect(() => {
    dispatch(fetchBikes());
  }, [dispatch]);

  const getImageUrl = (imagePath) => {
    if (!imagePath)
      return "https://images.unsplash.com/photo-1591637333184-19aa84b3e01f?q=80&w=800";
    if (imagePath.startsWith("http")) return imagePath;
    return `${FILE_URL}/${imagePath.replace(/\\/g, "/")}`;
  };

  const handleShowMore = () => {
    setVisibleCount((prev) => prev + 3);
    setTimeout(() => {
      window.scrollBy({ top: 400, behavior: "smooth" });
    }, 100);
  };

  const handleAction = (bikeId) => {
    if (user) {
      // Navigating with bike ID for booking
      navigate(`/user/book-ride`, { state: { bikeId } });
    } else {
      navigate("/login");
    }
  };

  if (loading) {
    return (
      <div className="py-32 flex flex-col items-center justify-center bg-gray-50 min-h-[500px]">
        <Loader2 className="w-10 h-10 text-emerald-500 animate-spin mb-4" />
        <p className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-400">
          Syncing Fleet Nodes...
        </p>
      </div>
    );
  }

  return (
    <section
      className="py-24 bg-[#f8fafc] relative overflow-hidden"
      ref={fleetRef}
    >
      {/* Background Decor */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-100/50 rounded-full blur-3xl -mr-48 -mt-48"></div>
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-blue-100/50 rounded-full blur-3xl -ml-48 -mb-48"></div>

      <div className="container mx-auto px-4 md:px-24 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-20">
          <h2 className="text-[11px] font-black text-emerald-600 uppercase tracking-[0.5em] mb-4">
            Next-Gen Mobility
          </h2>
          <h3 className="text-4xl md:text-6xl font-black text-slate-900 mb-6 tracking-tighter leading-tight">
            Our Elite <span className="text-emerald-500 italic">Volt</span>{" "}
            Fleet
          </h3>
          <p className="text-slate-500 font-medium text-lg">
            High-performance electric units engineered for urban exploration.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {bikes && bikes.length > 0 ? (
            bikes.slice(0, visibleCount).map((bike) => (
              <div
                key={bike._id}
                className="group bg-white rounded-[2.5rem] overflow-hidden border border-slate-200/60 hover:border-emerald-200 hover:shadow-[0_20px_50px_rgba(16,185,129,0.12)] transition-all duration-500 flex flex-col"
              >
                <div className="relative h-[260px] bg-slate-100 overflow-hidden">
                  <img
                    src={getImageUrl(bike.image)}
                    alt={bike.model_name}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute top-5 right-5">
                    <div
                      className={`px-4 py-1.5 rounded-full backdrop-blur-md border text-[9px] font-black uppercase tracking-widest ${
                        bike.status === "Available"
                          ? "bg-emerald-500/10 border-emerald-500/20 text-emerald-600"
                          : "bg-orange-500/10 border-orange-500/20 text-orange-600"
                      }`}
                    >
                      {bike.status}
                    </div>
                  </div>
                  <div className="absolute bottom-5 left-5 bg-slate-900/90 text-[8px] font-black text-white px-3 py-1 rounded-lg tracking-tighter">
                    {bike.registration_number}
                  </div>
                </div>

                <div className="p-8 flex flex-col flex-grow">
                  <div className="flex justify-between items-start mb-6">
                    <div>
                      <h4 className="text-2xl font-black text-slate-900 uppercase tracking-tighter">
                        {bike.model_name}
                      </h4>
                      <p className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em] mt-1">
                        Electric Series V4
                      </p>
                    </div>
                    <div className="text-right">
                      <span className="text-2xl font-black text-emerald-600 tracking-tighter">
                        Rs.{bike.price_per_hour}
                      </span>
                      <p className="text-[8px] font-bold text-slate-400 uppercase">
                        / hour
                      </p>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-y-6 gap-x-4 py-6 border-y border-slate-50 mb-8">
                    <div className="flex items-center gap-3">
                      <div className="p-2.5 bg-slate-50 rounded-xl group-hover:bg-emerald-50 transition-colors">
                        <Battery
                          size={18}
                          className="text-slate-400 group-hover:text-emerald-500"
                        />
                      </div>
                      <div>
                        <p className="text-[8px] font-black text-slate-400 uppercase">
                          Battery
                        </p>
                        <p className="text-sm font-black text-slate-800">
                          {bike.battery_level}%
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="p-2.5 bg-slate-50 rounded-xl group-hover:bg-emerald-50 transition-colors">
                        <Gauge
                          size={18}
                          className="text-slate-400 group-hover:text-emerald-500"
                        />
                      </div>
                      <div>
                        <p className="text-[8px] font-black text-slate-400 uppercase">
                          Top Speed
                        </p>
                        <p className="text-sm font-black text-slate-800">
                          {bike.speed || "45 km/h"}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="p-2.5 bg-slate-50 rounded-xl group-hover:bg-emerald-50 transition-colors">
                        <Zap
                          size={18}
                          className="text-slate-400 group-hover:text-emerald-500"
                        />
                      </div>
                      <div>
                        <p className="text-[8px] font-black text-slate-400 uppercase">
                          Range
                        </p>
                        <p className="text-sm font-black text-slate-800">
                          {bike.range || "80 km"}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="p-2.5 bg-slate-50 rounded-xl group-hover:bg-emerald-50 transition-colors">
                        {bike.isLocked ? (
                          <ShieldCheck size={18} className="text-emerald-500" />
                        ) : (
                          <ShieldAlert size={18} className="text-orange-500" />
                        )}
                      </div>
                      <div>
                        <p className="text-[8px] font-black text-slate-400 uppercase">
                          Security
                        </p>
                        <p className="text-sm font-black text-slate-800">
                          {bike.isLocked ? "Locked" : "Active"}
                        </p>
                      </div>
                    </div>
                  </div>

                  <button
                    onClick={() => handleAction(bike._id)}
                    disabled={bike.status !== "Available"}
                    className={`mt-auto w-full py-4 rounded-2xl font-black text-[10px] uppercase tracking-[0.2em] transition-all duration-300 flex items-center justify-center gap-2 ${
                      bike.status === "Available"
                        ? "bg-slate-900 text-white hover:bg-emerald-500 hover:shadow-[0_10px_25px_rgba(16,185,129,0.3)]"
                        : "bg-slate-100 text-slate-400 cursor-not-allowed border border-slate-200"
                    }`}
                  >
                    {bike.status === "Available" ? (
                      user ? (
                        <>
                          Book Ride Session <ArrowUpRight size={14} />
                        </>
                      ) : (
                        <>
                          Login to Ride <UserCheck size={14} />
                        </>
                      )
                    ) : (
                      "Currently In Use"
                    )}
                  </button>
                </div>
              </div>
            ))
          ) : (
            <div className="col-span-full py-20 text-center bg-white rounded-[3rem] border border-dashed border-slate-200">
              <p className="text-slate-400 font-black uppercase tracking-widest text-sm">
                Scanning for available nodes...
              </p>
            </div>
          )}
        </div>

        {bikes && bikes.length > visibleCount && (
          <div className="mt-20 text-center">
            <button
              onClick={handleShowMore}
              className="group inline-flex items-center gap-3 px-10 py-5 bg-white border-2 border-slate-900 rounded-full font-black text-[11px] uppercase tracking-[0.3em] hover:bg-slate-900 hover:text-white transition-all duration-500"
            >
              Discover More Units
              <ChevronDown
                size={18}
                className="group-hover:translate-y-1 transition-transform"
              />
            </button>
          </div>
        )}
      </div>
    </section>
  );
};

export default OurFleet;
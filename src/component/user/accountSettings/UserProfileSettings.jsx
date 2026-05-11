import { useSelector } from "react-redux";
import { Camera, User, Mail, Phone, MapPin } from "lucide-react";

const UserProfileSettings = () => {
    const { user } = useSelector((state) => state.auth);

    return (
        <div className="bg-white border border-slate-200 rounded-3xl p-6 shadow-sm">
            <div className="flex items-center gap-6 mb-8">
                <div className="relative">
                    <div className="w-24 h-24 bg-green-600 rounded-3xl flex items-center justify-center text-white text-3xl font-black shadow-lg shadow-green-100 overflow-hidden">
                        {user?.avatar ? (
                            <img src={user.avatar} alt="avatar" className="w-full h-full object-cover" />
                        ) : (
                            user?.name?.charAt(0).toUpperCase() || "U"
                        )}
                    </div>
                    <button className="absolute -bottom-2 -right-2 p-2 bg-slate-900 text-white rounded-xl border-4 border-white hover:bg-slate-800 transition-all">
                        <Camera size={16} />
                    </button>
                </div>
                <div>
                    <h3 className="text-lg font-black text-slate-900">Personal Details</h3>
                    <p className="text-xs text-slate-500 font-medium">Update your profile info and how others see you.</p>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase text-slate-400 tracking-widest">Full Name</label>
                    <div className="relative">
                        <User className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
                        <input type="text" defaultValue={user?.name || ""} className="w-full pl-12 pr-4 py-3 bg-slate-50 border border-slate-100 rounded-2xl text-sm font-bold focus:border-green-500 outline-none transition-all" />
                    </div>
                </div>
                <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase text-slate-400 tracking-widest">Email Address</label>
                    <div className="relative">
                        <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
                        <input type="email" defaultValue={user?.email || ""} className="w-full pl-12 pr-4 py-3 bg-slate-50 border border-slate-100 rounded-2xl text-sm font-bold focus:border-green-500 outline-none transition-all" />
                    </div>
                </div>
                <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase text-slate-400 tracking-widest">Phone Number</label>
                    <div className="relative">
                        <Phone className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
                        <input type="text" defaultValue={user?.phone || ""} className="w-full pl-12 pr-4 py-3 bg-slate-50 border border-slate-100 rounded-2xl text-sm font-bold focus:border-green-500 outline-none transition-all" />
                    </div>
                </div>
                <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase text-slate-400 tracking-widest">City</label>
                    <div className="relative">
                        <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
                        <input type="text" defaultValue={user?.city || ""} className="w-full pl-12 pr-4 py-3 bg-slate-50 border border-slate-100 rounded-2xl text-sm font-bold focus:border-green-500 outline-none transition-all" />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default UserProfileSettings;
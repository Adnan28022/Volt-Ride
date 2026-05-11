import { useSelector } from "react-redux";
import { Camera, User, Mail } from "lucide-react";

const ProfileSettings = () => {
    const { user } = useSelector((state) => state.auth);

    return (
        <div className="bg-white border border-slate-200 rounded-2xl p-6">
            <div className="flex items-center gap-6 mb-8">
                <div className="relative">
                    <div className="w-24 h-24 bg-slate-900 rounded-2xl flex items-center justify-center text-white text-3xl font-black overflow-hidden">
                        {user?.avatar ? (
                            <img src={user.avatar} alt="avatar" className="w-full h-full object-cover" />
                        ) : (
                            user?.name?.charAt(0).toUpperCase() || "A"
                        )}
                    </div>
                    <button className="absolute -bottom-2 -right-2 p-2 bg-green-600 text-white rounded-lg border-4 border-white hover:bg-green-700 transition-all">
                        <Camera size={16} />
                    </button>
                </div>
                <div>
                    <h3 className="text-lg font-black text-slate-900">Admin Profile</h3>
                    <p className="text-xs text-slate-500 font-medium">Update your photo and personal details here.</p>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase text-slate-400 tracking-widest">Full Name</label>
                    <div className="relative">
                        <User className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
                        {/* ✅ Real name */}
                        <input type="text" defaultValue={user?.name || ""} className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:border-green-500 outline-none transition-all" />
                    </div>
                </div>
                <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase text-slate-400 tracking-widest">Email Address</label>
                    <div className="relative">
                        <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
                        {/* ✅ Real email */}
                        <input type="email" defaultValue={user?.email || ""} className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:border-green-500 outline-none transition-all" />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProfileSettings;
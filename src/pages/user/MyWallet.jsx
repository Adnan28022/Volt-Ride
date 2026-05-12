import React from 'react';
import Banner from '../../component/admin/Banner';
import WalletCard from '../../component/user/myWallet/WalletCard';
import AddFunds from '../../component/user/myWallet/AddFunds';

const MyWallet = () => {
    const breadcrumbs = [{ label: "My Wallet", path: "/user/wallet", active: true }];

    return (
        <div className="p-6 space-y-6 bg-slate-50/30 min-h-screen">
            {/* Header Banner */}
            <Banner
                title="My Wallet"
                subtitle="Manage your balance, top-up using Stripe and track your spending."
                breadcrumbs={breadcrumbs}
            />

            <div className="grid grid-cols-12 gap-6">

                {/* Left Side: Wallet & Transactions (Takes 8 columns) */}
                <div className="col-span-12 lg:col-span-8 space-y-6">
                    <WalletCard />
                </div>

                {/* Right Side: Add Funds & Methods (Takes 4 columns) */}
                <div className="col-span-12 lg:col-span-4 space-y-6">
                    <AddFunds />

                    {/* Extra Info Card */}
                    <div className="bg-slate-900 rounded-3xl p-6 text-white shadow-xl">
                        <h4 className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] mb-4">Refer & Earn</h4>
                        <p className="text-xs text-slate-300 leading-relaxed font-medium">
                            Share your code <span className="text-green-400 font-black">VOLT50</span> with friends and get Rs. 50 on their first ride!
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MyWallet;
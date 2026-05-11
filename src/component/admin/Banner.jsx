import React from 'react';
import { ChevronRight, Home } from "lucide-react";
import { Link } from "react-router-dom";

const AdminPageHeader = ({ title, subtitle, breadcrumbs }) => {
    return (
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
            {/* Title & Subtitle */}
            <div>
                <h1 className="text-xl font-bold text-slate-900 tracking-tight">{title}</h1>
                {subtitle && <p className="text-slate-500 text-xs mt-0.5">{subtitle}</p>}
            </div>

            {/* Breadcrumbs */}
            <nav className="flex items-center gap-2 text-[11px] font-bold uppercase tracking-wider">
                <Link
                    to="/admin/dashboard"
                    className="text-slate-400 hover:text-green-600 transition-colors flex items-center gap-1"
                >
                    <Home size={14} />
                    Home
                </Link>

                {breadcrumbs && breadcrumbs.map((crumb, index) => (
                    <div key={index} className="flex items-center gap-2 text-slate-400">
                        <ChevronRight size={12} className="text-slate-300" />
                        {crumb.active ? (
                            <span className="text-green-600">{crumb.label}</span>
                        ) : (
                            <Link to={crumb.path} className="hover:text-green-600 transition-colors">
                                {crumb.label}
                            </Link>
                        )}
                    </div>
                ))}
            </nav>
        </div>
    );
};

export default AdminPageHeader;
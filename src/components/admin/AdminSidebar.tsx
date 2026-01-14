"use client";

import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { LayoutDashboard, FileText, Star, Settings, Shield, Contact } from 'lucide-react';

export default function AdminSidebar() {
    const searchParams = useSearchParams();
    const currentTab = searchParams.get('tab') || 'dashboard';

    const menuItems = [
        { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
        { id: 'services', label: 'Services', icon: Shield },
        { id: 'content', label: 'Hero Content', icon: FileText },
        { id: 'featured', label: 'Featured Post', icon: Star },
        { id: 'leads', label: 'Leads', icon: Contact },
        { id: 'contact', label: 'Contact Info', icon: Settings },
        { id: 'settings', label: 'Settings', icon: Settings },
    ];

    return (
        <aside className="w-64 bg-slate-900 border-r border-slate-800 hidden md:flex flex-col">
            <div className="p-6 border-b border-slate-800 mb-6">
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-emerald-400 to-cyan-500 flex items-center justify-center shadow-lg shadow-emerald-500/20">
                        <span className="text-black font-bold text-xl">P</span>
                    </div>
                    <div>
                        <h1 className="text-white font-bold text-lg leading-tight">Prime Admin</h1>
                        <span className="text-xs text-slate-500 font-medium">Finance Hub</span>
                    </div>
                </div>
            </div>

            <nav className="flex-1 px-4 space-y-2">
                {menuItems.map((item) => {
                    const isActive = currentTab === item.id;
                    return (
                        <Link
                            key={item.id}
                            href={`/admin?tab=${item.id}`}
                            className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 group relative overflow-hidden ${isActive
                                ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
                                : 'text-slate-400 hover:text-white hover:bg-white/5'
                                }`}
                        >
                            {isActive && (
                                <div className="absolute left-0 top-0 bottom-0 w-1 bg-emerald-500 rounded-r-full"></div>
                            )}
                            <item.icon size={20} className={isActive ? 'text-emerald-400' : 'text-slate-500 group-hover:text-emerald-400 transition-colors'} />
                            <span className="font-medium">{item.label}</span>
                        </Link>
                    );
                })}
            </nav>

            <div className="p-6 border-t border-slate-800">
                <div className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-xl p-4 border border-slate-700/50">
                    <div className="flex items-center gap-3 mb-2">
                        <div className="w-8 h-8 rounded-full bg-emerald-500/20 flex items-center justify-center text-emerald-400">
                            <Shield size={16} />
                        </div>
                        <span className="text-xs font-semibold text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded">Admin</span>
                    </div>
                    <p className="text-xs text-slate-500">Logged in securely via local access.</p>
                </div>
            </div>
        </aside>
    );
}

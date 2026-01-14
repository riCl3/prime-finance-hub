import ServiceManager from '@/components/admin/ServiceManager';
import HeroEditor from '@/components/admin/HeroEditor';
import FeaturedPostEditor from '@/components/admin/FeaturedPostEditor';
import ContactEditor from '@/components/admin/ContactEditor';
import dbConnect from '@/lib/db';
import Service from '@/models/Service';
import Inquiry from '@/models/Inquiry';
import { LayoutDashboard, Users, ArrowUpRight, DollarSign } from 'lucide-react';

// Force dynamic rendering
export const dynamic = 'force-dynamic';

async function getServices() {
    await dbConnect();
    const services = await Service.find({}).sort({ createdAt: -1 }).lean();
    return services.map(s => ({
        ...s,
        _id: s._id.toString(),
        createdAt: s.createdAt?.toISOString(),
        updatedAt: s.updatedAt?.toISOString()
    }));
}

export default async function AdminPage({
    searchParams,
}: {
    searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}) {
    const resolvedParams = await searchParams;
    const tab = typeof resolvedParams.tab === 'string' ? resolvedParams.tab : 'dashboard';
    const services = await getServices();

    // Get real stats
    const inquiryCount = await Inquiry.countDocuments({});
    const totalServices = services.length;

    return (
        <div className="space-y-6">
            {tab === 'dashboard' && (
                <div className="space-y-8 animate-in fade-in duration-500">
                    <div>
                        <h2 className="text-2xl font-bold text-white mb-2">Dashboard Overview</h2>
                        <p className="text-slate-400">Welcome back, Admin.</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        <div className="glass-card p-6 border-l-4 border-emerald-500">
                            <div className="flex items-center justify-between mb-4">
                                <div className="p-3 bg-emerald-500/10 rounded-lg text-emerald-400">
                                    <LayoutDashboard size={24} />
                                </div>
                                <span className="text-xs font-semibold text-emerald-400 bg-emerald-500/10 px-2 py-1 rounded">Live</span>
                            </div>
                            <h3 className="text-3xl font-bold text-white mb-1">{totalServices}</h3>
                            <p className="text-sm text-slate-400">Active Services</p>
                        </div>

                        <div className="glass-card p-6 border-l-4 border-cyan-500">
                            <div className="flex items-center justify-between mb-4">
                                <div className="p-3 bg-cyan-500/10 rounded-lg text-cyan-400">
                                    <Users size={24} />
                                </div>
                                <span className="text-xs font-semibold text-cyan-400 bg-cyan-500/10 px-2 py-1 rounded">+5%</span>
                            </div>
                            <h3 className="text-3xl font-bold text-white mb-1">1.2k</h3>
                            <p className="text-sm text-slate-400">Total Visits</p>
                        </div>

                        <div className="glass-card p-6 border-l-4 border-blue-500">
                            <div className="flex items-center justify-between mb-4">
                                <div className="p-3 bg-blue-500/10 rounded-lg text-blue-400">
                                    <ArrowUpRight size={24} />
                                </div>
                                <span className="text-xs font-semibold text-blue-400 bg-blue-500/10 px-2 py-1 rounded">Total</span>
                            </div>
                            <h3 className="text-3xl font-bold text-white mb-1">{inquiryCount}</h3>
                            <p className="text-sm text-slate-400">Inquiries Received</p>
                        </div>

                        <div className="glass-card p-6 border-l-4 border-purple-500">
                            <div className="flex items-center justify-between mb-4">
                                <div className="p-3 bg-purple-500/10 rounded-lg text-purple-400">
                                    <DollarSign size={24} />
                                </div>
                            </div>
                            <h3 className="text-3xl font-bold text-white mb-1">High</h3>
                            <p className="text-sm text-slate-400">Revenue Stream</p>
                        </div>
                    </div>
                </div>
            )}

            {tab === 'content' && <HeroEditor />}

            {tab === 'featured' && <FeaturedPostEditor />}

            {tab === 'contact' && <ContactEditor />}

            {tab === 'services' && <ServiceManager services={services} />}

            {tab === 'settings' && (
                <div className="text-center py-20">
                    <div className="w-16 h-16 bg-slate-800 rounded-full flex items-center justify-center mx-auto mb-4">
                        <SettingsIcon />
                    </div>
                </div>
            )}
        </div>
    );
}

function SettingsIcon() {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-slate-500"><path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.1a2 2 0 0 1-1-1.72v-.51a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z" /><circle cx="12" cy="12" r="3" /></svg>
    )
}

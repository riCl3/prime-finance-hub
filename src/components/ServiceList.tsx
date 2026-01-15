"use client";

import { Trash2 } from 'lucide-react';
import { useRouter } from 'next/navigation';

import { Service } from '@/components/home/Services';

export default function ServiceList({ services, onEdit }: { services: Service[], onEdit: (service: Service) => void }) {
    const router = useRouter();

    const handleDelete = async (id: string) => {
        if (!confirm('Are you sure you want to delete this service?')) return;

        try {
            const res = await fetch(`/api/services/${id}`, {
                method: 'DELETE',
            });
            if (res.ok) {
                router.refresh();
            } else {
                alert('Failed to delete');
            }
        } catch (e) {
            console.error(e);
            alert('Error deleting');
        }
    };

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between mb-8">
                <h2 className="text-2xl font-bold text-white flex items-center gap-3">
                    <span className="w-2 h-8 bg-gradient-to-b from-emerald-400 to-cyan-400 rounded-full"></span>
                    Existing Services
                    <span className="text-sm font-normal text-slate-500 bg-slate-900 px-2 py-1 rounded-md border border-slate-800">
                        {services.length} Total
                    </span>
                </h2>
            </div>

            <div className="grid gap-5">
                {services.length === 0 && (
                    <div className="glass-card p-12 text-center border-dashed border-slate-700">
                        <div className="w-16 h-16 bg-slate-800/50 rounded-full flex items-center justify-center mx-auto mb-4 text-slate-600">
                            <span className="text-3xl">📭</span>
                        </div>
                        <p className="text-slate-400 text-lg mb-2">No services found</p>
                        <p className="text-slate-600 text-sm">Create your first service using the form.</p>
                    </div>
                )}

                {services.map((service) => (
                    <div
                        key={service._id}
                        className="group glass-card p-5 flex items-center justify-between hover:border-emerald-500/30 transition-all duration-300 bg-gradient-to-r from-white/5 to-transparent hover:from-white/10"
                    >
                        <div className="flex items-center gap-5">
                            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-slate-800 to-slate-900 border border-slate-700 flex items-center justify-center text-xl shadow-inner">
                                {service.category === 'Loans' ? '💰' : '🛡️'}
                            </div>

                            <div>
                                <h4 className="font-bold text-lg text-slate-200 group-hover:text-emerald-400 transition-colors">
                                    {service.title}
                                </h4>
                                <div className="flex items-center gap-3 mt-1">
                                    <span className="text-xs font-semibold px-2 py-0.5 rounded bg-slate-800 text-slate-400 border border-slate-700 uppercase tracking-wide">
                                        {service.type}
                                    </span>
                                    <span className="text-xs text-slate-500 flex items-center gap-1">
                                        <span className="w-1 h-1 rounded-full bg-slate-600"></span>
                                        ₹{service.discountedPrice?.toLocaleString() ?? 0}
                                    </span>
                                </div>
                            </div>
                        </div>

                        <div className="flex items-center gap-4">
                            <div className="text-right mr-4 hidden sm:block">
                                <div className="text-xs text-slate-500 mb-1">Created</div>
                                <div className="text-sm text-slate-400 font-mono">
                                    {service.createdAt ? new Date(service.createdAt).toLocaleDateString() : 'N/A'}
                                </div>
                            </div>

                            <button
                                onClick={() => onEdit(service)}
                                className="w-10 h-10 rounded-full flex items-center justify-center text-slate-500 hover:text-cyan-400 hover:bg-cyan-500/10 border border-transparent hover:border-cyan-500/20 transition-all mr-2"
                                title="Edit Service"
                            >
                                <div className="w-4 h-4">✏️</div>
                            </button>

                            <button
                                onClick={() => handleDelete(service._id)}
                                className="w-10 h-10 rounded-full flex items-center justify-center text-slate-500 hover:text-red-400 hover:bg-red-500/10 border border-transparent hover:border-red-500/20 transition-all"
                                title="Delete Service"
                            >
                                <Trash2 size={18} />
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

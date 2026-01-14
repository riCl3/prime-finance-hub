'use client';

import { useState } from 'react';
import AdminForm from '@/components/AdminForm';
import ServiceList from '@/components/ServiceList';

export default function ServiceManager({ services }: { services: any[] }) {
    const [editingService, setEditingService] = useState<any | null>(null);

    const handleEdit = (service: any) => {
        setEditingService(service);
        // Scroll to form
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const handleCancelEdit = () => {
        setEditingService(null);
    };

    return (
        <div className="space-y-8 animate-in fade-in duration-500">
            <div>
                <h2 className="text-2xl font-bold text-white mb-2">Service Management</h2>
                <p className="text-slate-400">Add, edit, or remove financial services.</p>
            </div>

            <div className="grid xl:grid-cols-[1.2fr_1fr] gap-8 items-start">
                <section>
                    <AdminForm
                        initialData={editingService}
                        onCancel={handleCancelEdit}
                        key={editingService ? editingService._id : 'new'} // proper reset on switch
                    />
                </section>

                <section className="sticky top-6">
                    <ServiceList services={services} onEdit={handleEdit} />
                </section>
            </div>
        </div>
    );
}

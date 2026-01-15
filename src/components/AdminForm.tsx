"use client";

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Plus, X } from 'lucide-react';

const MAIN_CATEGORIES = ['Loans', 'Life Insurance'];

const SERVICE_TYPES_BY_CATEGORY: Record<string, string[]> = {
    'Loans': ['Personal Loan', 'Business Loan', 'Instant Loan'],
    'Life Insurance': ['Life Insurance', 'Health Insurance', 'General Insurance', 'Mutual Fund', 'Cibil Recover']
};

import { Service } from '@/components/home/Services';

export default function AdminForm({ initialData, onCancel }: { initialData?: Partial<Service>, onCancel?: () => void }) {
    const router = useRouter();
    const [loading, setLoading] = useState(false);

    // Check if we are in edit mode
    const isEditing = !!initialData;

    const [formData, setFormData] = useState({
        title: '',
        category: 'Loans',
        type: 'Personal Loan',
        description: '',
        benefits: [''] as string[],
        actualPrice: '',
        discountedPrice: '',
        discountPercentage: 0
    });

    // Load initial data if editing
    useEffect(() => {
        if (initialData) {
            setFormData({
                title: initialData.title || '',
                category: initialData.category || 'Loans',
                type: initialData.type || 'Personal Loan',
                description: initialData.description || '',
                benefits: initialData.benefits?.length ? initialData.benefits : [''],
                actualPrice: initialData.actualPrice?.toString() || '',
                discountedPrice: initialData.discountedPrice?.toString() || '',
                discountPercentage: initialData.discountPercentage || 0
            });
        }
    }, [initialData]);

    // Update available types when category changes
    useEffect(() => {
        const firstType = SERVICE_TYPES_BY_CATEGORY[formData.category][0];
        setFormData(prev => ({ ...prev, type: firstType }));
    }, [formData.category]);

    // Auto-calculate percentage
    useEffect(() => {
        const actual = parseFloat(formData.actualPrice);
        const discounted = parseFloat(formData.discountedPrice);

        if (actual > 0 && discounted >= 0) {
            const discount = ((actual - discounted) / actual) * 100;
            setFormData(prev => ({ ...prev, discountPercentage: Math.round(discount) }));
        } else {
            setFormData(prev => ({ ...prev, discountPercentage: 0 }));
        }
    }, [formData.actualPrice, formData.discountedPrice]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleBenefitChange = (index: number, value: string) => {
        const newBenefits = [...formData.benefits];
        newBenefits[index] = value;
        setFormData(prev => ({ ...prev, benefits: newBenefits }));
    };

    const addBenefit = () => {
        setFormData(prev => ({ ...prev, benefits: [...prev.benefits, ''] }));
    };

    const removeBenefit = (index: number) => {
        const newBenefits = formData.benefits.filter((_, i) => i !== index);
        setFormData(prev => ({ ...prev, benefits: newBenefits }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        try {
            // Filter out empty benefits
            const cleanedData = {
                ...formData,
                benefits: formData.benefits.filter(b => b.trim() !== ''),
                actualPrice: parseFloat(formData.actualPrice),
                discountedPrice: parseFloat(formData.discountedPrice)
            };

            const url = isEditing ? `/api/services/${initialData._id}` : '/api/services';
            const method = isEditing ? 'PUT' : 'POST';

            const res = await fetch(url, {
                method,
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(cleanedData),
            });

            const data = await res.json();
            if (!res.ok || !data.success) {
                throw new Error(data.error || (isEditing ? 'Failed to update service' : 'Failed to create service'));
            }

            router.refresh();

            if (isEditing) {
                if (onCancel) onCancel();
                alert('Service updated successfully!');
            } else {
                setFormData({
                    title: '',
                    category: 'Loans',
                    type: 'Personal Loan',
                    description: '',
                    benefits: [''],
                    actualPrice: '',
                    discountedPrice: '',
                    discountPercentage: 0
                });
                alert('Service added successfully!');
            }
        } catch (error) {
            console.error(error);
            console.error(error);
            const msg = error instanceof Error ? error.message : 'Error creating service';
            alert(`Failed: ${msg}`);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="glass-card p-10 max-w-3xl mx-auto shadow-2xl relative overflow-hidden">
            {/* Background Glow Effect */}
            <div className="absolute -top-20 -right-20 w-64 h-64 bg-emerald-500/20 rounded-full blur-3xl pointer-events-none"></div>

            <h2 className="text-3xl font-bold mb-8 text-gradient relative z-10 flex items-center gap-3">
                <span className="p-2 bg-emerald-500/10 rounded-lg border border-emerald-500/20 text-emerald-400">
                    {isEditing ? <div className="w-6 h-6">✏️</div> : <Plus size={24} />}
                </span>
                {isEditing ? 'Edit Service' : 'Add New Service'}
            </h2>

            <form onSubmit={handleSubmit} className="space-y-6 relative z-10">
                {/* Category Selection */}
                <div className="grid grid-cols-2 gap-6">
                    <div className="space-y-2">
                        <label className="text-sm font-medium text-slate-400 uppercase tracking-wider">Category</label>
                        <div className="relative">
                            <select
                                name="category"
                                value={formData.category}
                                onChange={handleChange}
                                className="w-full bg-slate-900/50 border border-slate-700/50 rounded-xl px-4 py-3 text-slate-200 focus:outline-none focus:border-emerald-500/50 focus:ring-1 focus:ring-emerald-500/50 transition-all appearance-none cursor-pointer hover:bg-slate-900/70"
                            >
                                {MAIN_CATEGORIES.map(c => <option key={c} value={c} className="bg-slate-900 text-slate-200">{c}</option>)}
                            </select>
                            <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-slate-500">
                                <svg width="12" height="8" viewBox="0 0 12 8" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M1 1.5L6 6.5L11 1.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
                            </div>
                        </div>
                    </div>
                    <div className="space-y-2">
                        <label className="text-sm font-medium text-slate-400 uppercase tracking-wider">Service Type</label>
                        <div className="relative">
                            <select
                                name="type"
                                value={formData.type}
                                onChange={handleChange}
                                className="w-full bg-slate-900/50 border border-slate-700/50 rounded-xl px-4 py-3 text-slate-200 focus:outline-none focus:border-emerald-500/50 focus:ring-1 focus:ring-emerald-500/50 transition-all appearance-none cursor-pointer hover:bg-slate-900/70"
                            >
                                {SERVICE_TYPES_BY_CATEGORY[formData.category]?.map(t => (
                                    <option key={t} value={t} className="bg-slate-900 text-slate-200">{t}</option>
                                ))}
                            </select>
                            <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-slate-500">
                                <svg width="12" height="8" viewBox="0 0 12 8" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M1 1.5L6 6.5L11 1.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="space-y-2">
                    <label className="text-sm font-medium text-slate-400 uppercase tracking-wider">Service Title</label>
                    <input
                        type="text"
                        name="title"
                        required
                        value={formData.title}
                        onChange={handleChange}
                        placeholder="e.g. Premium Business Loan"
                        className="w-full bg-slate-900/50 border border-slate-700/50 rounded-xl px-4 py-3 text-slate-200 placeholder-slate-600 focus:outline-none focus:border-emerald-500/50 focus:ring-1 focus:ring-emerald-500/50 transition-all"
                    />
                </div>

                <div className="space-y-2">
                    <label className="text-sm font-medium text-slate-400 uppercase tracking-wider">Description</label>
                    <textarea
                        name="description"
                        required
                        rows={3}
                        value={formData.description}
                        onChange={handleChange}
                        placeholder="Describe the key features and eligibility..."
                        className="w-full bg-slate-900/50 border border-slate-700/50 rounded-xl px-4 py-3 text-slate-200 placeholder-slate-600 focus:outline-none focus:border-emerald-500/50 focus:ring-1 focus:ring-emerald-500/50 transition-all resize-none"
                    />
                </div>

                {/* Pricing Section */}
                <div className="p-6 bg-gradient-to-br from-slate-900/50 to-slate-800/20 rounded-2xl border border-slate-700/30">
                    <h3 className="text-sm font-semibold mb-4 text-slate-300 uppercase tracking-wider flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
                        Pricing Configuration
                    </h3>
                    <div className="grid grid-cols-3 gap-6">
                        <div className="space-y-2">
                            <label className="text-xs text-slate-500 block">Original Price (₹)</label>
                            <input
                                type="number"
                                name="actualPrice"
                                required
                                value={formData.actualPrice}
                                onChange={handleChange}
                                placeholder="0.00"
                                className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-slate-300 focus:border-emerald-500/30 focus:outline-none transition-colors"
                            />
                        </div>
                        <div className="space-y-2">
                            <label className="text-xs text-slate-500 block">Discounted Price (₹)</label>
                            <input
                                type="number"
                                name="discountedPrice"
                                required
                                value={formData.discountedPrice}
                                onChange={handleChange}
                                placeholder="0.00"
                                className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-emerald-400 font-medium focus:border-emerald-500/30 focus:outline-none transition-colors"
                            />
                        </div>
                        <div className="space-y-2">
                            <label className="text-xs text-slate-500 block">Savings</label>
                            <div className="h-[42px] bg-emerald-500/10 border border-emerald-500/20 rounded-lg flex items-center justify-center text-emerald-400 font-bold text-sm">
                                {formData.discountPercentage}% OFF
                            </div>
                        </div>
                    </div>
                </div>

                {/* Benefits Section */}
                <div className="space-y-3">
                    <label className="flex justify-between items-center">
                        <span className="text-sm font-medium text-slate-400 uppercase tracking-wider">Benefits & Features</span>
                        <button
                            type="button"
                            onClick={addBenefit}
                            className="text-xs bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-400 border border-emerald-500/20 px-3 py-1.5 rounded-lg flex items-center gap-1.5 transition-all font-medium"
                        >
                            <Plus size={14} /> Add Feature
                        </button>
                    </label>
                    <div className="space-y-2.5">
                        {formData.benefits.map((benefit, index) => (
                            <div key={index} className="flex gap-3 group">
                                <div className="relative flex-1">
                                    <div className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-600 pointer-events-none group-focus-within:text-emerald-500/70 transition-colors">
                                        <div className="w-1.5 h-1.5 rounded-full bg-current"></div>
                                    </div>
                                    <input
                                        type="text"
                                        value={benefit}
                                        onChange={(e) => handleBenefitChange(index, e.target.value)}
                                        placeholder={`Benefit point ${index + 1}`}
                                        className="w-full bg-slate-900/30 border border-slate-700/30 rounded-lg pl-8 pr-4 py-2.5 text-sm text-slate-300 focus:bg-slate-900/50 focus:border-emerald-500/30 focus:outline-none transition-all"
                                    />
                                </div>
                                {formData.benefits.length > 1 && (
                                    <button
                                        type="button"
                                        onClick={() => removeBenefit(index)}
                                        className="text-slate-500 hover:text-red-400 hover:bg-red-400/10 p-2.5 rounded-lg transition-all border border-transparent hover:border-red-400/20"
                                    >
                                        <X size={18} />
                                    </button>
                                )}
                            </div>
                        ))}
                    </div>
                </div>

                <div className="pt-4">
                    <button
                        type="submit"
                        disabled={loading}
                        className="btn-gradient w-full py-4 rounded-xl text-lg shadow-lg hover:shadow-emerald-500/20 transform hover:-translate-y-0.5 active:translate-y-0 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {loading ? (
                            <span className="flex items-center justify-center gap-2">
                                <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></span>
                                {isEditing ? 'Updating...' : 'Creating...'}
                            </span>
                        ) : (isEditing ? 'Update Service' : 'Create New Service')}
                    </button>

                    {isEditing && (
                        <button
                            type="button"
                            onClick={onCancel}
                            className="w-full mt-3 py-3 rounded-xl text-slate-400 hover:text-white hover:bg-white/5 transition-all"
                        >
                            Cancel Editing
                        </button>
                    )}
                </div>
            </form>
        </div>
    );
}

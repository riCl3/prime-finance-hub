"use client";

import { useState, useEffect } from 'react';
import { Save, Loader2, Mail, Phone, MapPin, Clock, Facebook, Twitter, Linkedin, Instagram } from 'lucide-react';

export default function ContactEditor() {
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [formData, setFormData] = useState({
        email: '',
        phone: '',
        address: '',
        hours: '',
        socials: {
            facebook: '',
            twitter: '',
            linkedin: '',
            instagram: ''
        },
        copyrightText: ''
    });

    // Fetch existing content
    useEffect(() => {
        fetch('/api/content')
            .then(res => res.json())
            .then(data => {
                if (data.contactInfo) {
                    setFormData(data.contactInfo);
                } else {
                    // Defaults if missing
                    setFormData({
                        email: 'info@primefinancehub.com',
                        phone: '+91 1234567890',
                        address: 'Mumbai, Maharashtra, India',
                        hours: 'Mon - Sat: 9 AM - 6 PM',
                        socials: { facebook: '#', twitter: '#', linkedin: '#', instagram: '#' },
                        copyrightText: '© 2026 Prime Finance Hub. All rights reserved.'
                    });
                }
                setLoading(false);
            })
            .catch(err => {
                console.error(err);
                setLoading(false);
            });
    }, []);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setSaving(true);
        try {
            // First fetch current full content to avoid overwriting other sections
            const currentRes = await fetch('/api/content');
            const currentData = await currentRes.json();

            const updatedData = {
                ...currentData,
                contactInfo: formData
            };

            const res = await fetch('/api/content', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(updatedData)
            });

            if (!res.ok) throw new Error('Failed to update');
            alert('Contact info updated successfully!');
        } catch (error) {
            console.error(error);
            alert('Error updating contact info');
        } finally {
            setSaving(false);
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSocialChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({
            ...formData,
            socials: { ...formData.socials, [e.target.name]: e.target.value }
        });
    };

    if (loading) return <div className="text-white">Loading configuration...</div>;

    return (
        <div className="glass-card p-8 animate-in fade-in duration-500 max-w-4xl mx-auto">
            <div className="flex items-center justify-between mb-8">
                <div>
                    <h2 className="text-2xl font-bold text-white mb-2">Global Contact Settings</h2>
                    <p className="text-slate-400">Manage contact details visible in the Footer and Contact page.</p>
                </div>
                <button
                    onClick={handleSubmit}
                    disabled={saving}
                    className="btn-gradient px-6 py-2.5 rounded-xl font-semibold flex items-center gap-2 disabled:opacity-50"
                >
                    {saving ? <Loader2 className="animate-spin" size={18} /> : <Save size={18} />}
                    {saving ? 'Saving...' : 'Save Changes'}
                </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-8">
                {/* Contact Basics */}
                <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                        <h3 className="text-lg font-semibold text-emerald-400 flex items-center gap-2">
                            <Mail size={18} /> Contact Details
                        </h3>
                        <div className="space-y-3">
                            <div>
                                <label className="text-xs text-slate-500 uppercase tracking-wider block mb-1">Email Address</label>
                                <div className="relative">
                                    <Mail className="absolute left-3 top-3 text-slate-500" size={16} />
                                    <input
                                        name="email"
                                        value={formData.email}
                                        onChange={handleChange}
                                        className="w-full bg-slate-950 border border-slate-800 rounded-lg pl-10 pr-4 py-2.5 text-slate-200 focus:border-emerald-500/50 focus:outline-none"
                                    />
                                </div>
                            </div>
                            <div>
                                <label className="text-xs text-slate-500 uppercase tracking-wider block mb-1">Phone Number</label>
                                <div className="relative">
                                    <Phone className="absolute left-3 top-3 text-slate-500" size={16} />
                                    <input
                                        name="phone"
                                        value={formData.phone}
                                        onChange={handleChange}
                                        className="w-full bg-slate-950 border border-slate-800 rounded-lg pl-10 pr-4 py-2.5 text-slate-200 focus:border-emerald-500/50 focus:outline-none"
                                    />
                                </div>
                            </div>
                            <div>
                                <label className="text-xs text-slate-500 uppercase tracking-wider block mb-1">Office Address</label>
                                <div className="relative">
                                    <MapPin className="absolute left-3 top-3 text-slate-500" size={16} />
                                    <input
                                        name="address"
                                        value={formData.address}
                                        onChange={handleChange}
                                        className="w-full bg-slate-950 border border-slate-800 rounded-lg pl-10 pr-4 py-2.5 text-slate-200 focus:border-emerald-500/50 focus:outline-none"
                                    />
                                </div>
                            </div>
                            <div>
                                <label className="text-xs text-slate-500 uppercase tracking-wider block mb-1">Business Hours</label>
                                <div className="relative">
                                    <Clock className="absolute left-3 top-3 text-slate-500" size={16} />
                                    <input
                                        name="hours"
                                        value={formData.hours}
                                        onChange={handleChange}
                                        className="w-full bg-slate-950 border border-slate-800 rounded-lg pl-10 pr-4 py-2.5 text-slate-200 focus:border-emerald-500/50 focus:outline-none"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Social Links */}
                    <div className="space-y-4">
                        <h3 className="text-lg font-semibold text-blue-400 flex items-center gap-2">
                            <Facebook size={18} /> Social Media Links
                        </h3>
                        <div className="space-y-3">
                            <div>
                                <label className="text-xs text-slate-500 uppercase tracking-wider block mb-1">Facebook URL</label>
                                <div className="relative">
                                    <Facebook className="absolute left-3 top-3 text-slate-500" size={16} />
                                    <input
                                        name="facebook"
                                        value={formData.socials?.facebook || ''}
                                        onChange={handleSocialChange}
                                        placeholder="#"
                                        className="w-full bg-slate-950 border border-slate-800 rounded-lg pl-10 pr-4 py-2.5 text-slate-200 focus:border-blue-500/50 focus:outline-none"
                                    />
                                </div>
                            </div>
                            <div>
                                <label className="text-xs text-slate-500 uppercase tracking-wider block mb-1">Twitter (X) URL</label>
                                <div className="relative">
                                    <Twitter className="absolute left-3 top-3 text-slate-500" size={16} />
                                    <input
                                        name="twitter"
                                        value={formData.socials?.twitter || ''}
                                        onChange={handleSocialChange}
                                        placeholder="#"
                                        className="w-full bg-slate-950 border border-slate-800 rounded-lg pl-10 pr-4 py-2.5 text-slate-200 focus:border-blue-500/50 focus:outline-none"
                                    />
                                </div>
                            </div>
                            <div>
                                <label className="text-xs text-slate-500 uppercase tracking-wider block mb-1">LinkedIn URL</label>
                                <div className="relative">
                                    <Linkedin className="absolute left-3 top-3 text-slate-500" size={16} />
                                    <input
                                        name="linkedin"
                                        value={formData.socials?.linkedin || ''}
                                        onChange={handleSocialChange}
                                        placeholder="#"
                                        className="w-full bg-slate-950 border border-slate-800 rounded-lg pl-10 pr-4 py-2.5 text-slate-200 focus:border-blue-500/50 focus:outline-none"
                                    />
                                </div>
                            </div>
                            <div>
                                <label className="text-xs text-slate-500 uppercase tracking-wider block mb-1">Instagram URL</label>
                                <div className="relative">
                                    <Instagram className="absolute left-3 top-3 text-slate-500" size={16} />
                                    <input
                                        name="instagram"
                                        value={formData.socials?.instagram || ''}
                                        onChange={handleSocialChange}
                                        placeholder="#"
                                        className="w-full bg-slate-950 border border-slate-800 rounded-lg pl-10 pr-4 py-2.5 text-slate-200 focus:border-blue-500/50 focus:outline-none"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="pt-6 border-t border-slate-700/50">
                    <label className="text-xs text-slate-500 uppercase tracking-wider block mb-1">Footer Copyright Text</label>
                    <input
                        name="copyrightText"
                        value={formData.copyrightText}
                        onChange={handleChange}
                        className="w-full bg-slate-950 border border-slate-800 rounded-lg px-4 py-2.5 text-slate-200 focus:border-emerald-500/50 focus:outline-none"
                    />
                </div>
            </form>
        </div>
    );
}

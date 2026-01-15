"use client";

import { useState } from 'react';
import { Send, Loader2 } from 'lucide-react';

interface InquiryFormProps {
    serviceId?: string;
    serviceName?: string;
}

export default function InquiryForm({ serviceId, serviceName }: InquiryFormProps = {}) {
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        message: '',
        serviceId: serviceId || '',
        serviceName: serviceName || ''
    });

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        try {
            // Simulate API call or implement real one if API exists
            await new Promise(resolve => setTimeout(resolve, 1500));

            // Reset form
            setFormData({
                name: '',
                email: '',
                phone: '',
                message: '',
                serviceId: serviceId || '',
                serviceName: serviceName || ''
            });
            alert('Message sent successfully! We will get back to you soon.');
        } catch (error) {
            alert('Failed to send message.');
        } finally {
            setLoading(false);
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    return (
        <div className="glass-card p-8 md:p-10 relative overflow-hidden group">
            {/* Ambient Glow */}
            <div className="absolute -top-20 -right-20 w-80 h-80 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none group-hover:bg-emerald-500/15 transition-all duration-700"></div>

            <h3 className="text-2xl font-bold text-white mb-2">Send us a Message</h3>
            <p className="text-slate-400 mb-8">Fill out the form below and our team will reach out.</p>

            <form onSubmit={handleSubmit} className="space-y-6 relative z-10">
                <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                        <label className="text-sm font-medium text-slate-400 uppercase tracking-wider pl-1">Full Name</label>
                        <input
                            type="text"
                            name="name"
                            required
                            value={formData.name}
                            onChange={handleChange}
                            placeholder="John Doe"
                            className="w-full bg-slate-900/40 border border-slate-700/50 rounded-xl px-5 py-4 text-slate-200 placeholder-slate-600 focus:outline-none focus:border-emerald-500/50 focus:ring-1 focus:ring-emerald-500/50 transition-all hover:bg-slate-900/60"
                        />
                    </div>
                    <div className="space-y-2">
                        <label className="text-sm font-medium text-slate-400 uppercase tracking-wider pl-1">Email Address</label>
                        <input
                            type="email"
                            name="email"
                            required
                            value={formData.email}
                            onChange={handleChange}
                            placeholder="john@example.com"
                            className="w-full bg-slate-900/40 border border-slate-700/50 rounded-xl px-5 py-4 text-slate-200 placeholder-slate-600 focus:outline-none focus:border-emerald-500/50 focus:ring-1 focus:ring-emerald-500/50 transition-all hover:bg-slate-900/60"
                        />
                    </div>
                </div>

                <div className="space-y-2">
                    <label className="text-sm font-medium text-slate-400 uppercase tracking-wider pl-1">Phone Number</label>
                    <input
                        type="tel"
                        name="phone"
                        required
                        value={formData.phone}
                        onChange={handleChange}
                        placeholder="+91 98765 43210"
                        className="w-full bg-slate-900/40 border border-slate-700/50 rounded-xl px-5 py-4 text-slate-200 placeholder-slate-600 focus:outline-none focus:border-emerald-500/50 focus:ring-1 focus:ring-emerald-500/50 transition-all hover:bg-slate-900/60"
                    />
                </div>

                <div className="space-y-2">
                    <label className="text-sm font-medium text-slate-400 uppercase tracking-wider pl-1">Your Message</label>
                    <textarea
                        name="message"
                        required
                        rows={5}
                        value={formData.message}
                        onChange={handleChange}
                        placeholder="Tell us about your requirements..."
                        className="w-full bg-slate-900/40 border border-slate-700/50 rounded-xl px-5 py-4 text-slate-200 placeholder-slate-600 focus:outline-none focus:border-emerald-500/50 focus:ring-1 focus:ring-emerald-500/50 transition-all resize-none hover:bg-slate-900/60"
                    />
                </div>

                <button
                    type="submit"
                    disabled={loading}
                    className="btn-gradient w-full py-5 rounded-xl text-lg font-bold shadow-lg hover:shadow-emerald-500/25 transform hover:-translate-y-0.5 active:translate-y-0 transition-all flex items-center justify-center gap-3 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    {loading ? (
                        <>
                            <Loader2 className="animate-spin" /> Sending...
                        </>
                    ) : (
                        <>
                            Send Message <Send size={20} />
                        </>
                    )}
                </button>
            </form>
        </div>
    );
}

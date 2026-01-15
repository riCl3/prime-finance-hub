"use client";

import { useState } from 'react';
import { X, Lock, Phone, User, CheckCircle, Loader2, ArrowRight } from 'lucide-react';
import { useRouter } from 'next/navigation';

interface LeadCaptureModalProps {
    isOpen: boolean;
    onClose: () => void;
    triggerUrl?: string; // Where to go after success, or just close
}

export default function LeadCaptureModal({ isOpen, onClose, triggerUrl }: LeadCaptureModalProps) {
    const [step, setStep] = useState<'input' | 'otp' | 'success'>('input');
    const [loading, setLoading] = useState(false);
    const [leadId, setLeadId] = useState<string | null>(null);
    const [formData, setFormData] = useState({ name: '', phone: '' });
    const [otp, setOtp] = useState('');
    const [error, setError] = useState('');
    const router = useRouter();

    if (!isOpen) return null;

    const handleSendOtp = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        try {
            const res = await fetch('/api/leads', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData)
            });
            const data = await res.json();

            if (!res.ok) throw new Error(data.error);

            setLeadId(data.leadId);
            setStep('otp');
            // For demo purposes, we might alert the OTP if it's returned in debug mode
            if (data.debugOtp) console.log("Demo OTP:", data.debugOtp);

        } catch (err) {
            setError((err as Error).message || 'Failed to send OTP');
        } finally {
            setLoading(false);
        }
    };

    const handleVerifyOtp = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        try {
            const res = await fetch('/api/leads/verify', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ leadId, otp })
            });
            const data = await res.json();

            if (!res.ok) throw new Error(data.error);

            setStep('success');
            setTimeout(() => {
                onClose();
                if (triggerUrl) router.push(triggerUrl);
            }, 2000);

        } catch (err) {
            setError((err as Error).message || 'Invalid OTP');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            {/* Blurred Backdrop */}
            <div
                className="absolute inset-0 bg-black/60 backdrop-blur-md transition-opacity"
                onClick={onClose}
            />

            {/* Modal Content */}
            <div className="relative w-full max-w-md bg-[#0f172a] border border-white/10 rounded-2xl shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-300">
                {/* Header */}
                <div className="p-6 border-b border-white/5 bg-white/5 flex items-center justify-between">
                    <h3 className="text-xl font-bold text-white">
                        {step === 'input' && 'Get Started'}
                        {step === 'otp' && 'Verify Phone'}
                        {step === 'success' && 'Verified!'}
                    </h3>
                    <button
                        onClick={onClose}
                        className="text-slate-400 hover:text-white transition-colors p-1 rounded-lg hover:bg-white/10"
                    >
                        <X size={20} />
                    </button>
                </div>

                <div className="p-8">
                    {step === 'input' && (
                        <form onSubmit={handleSendOtp} className="space-y-6">
                            <p className="text-slate-400 text-sm mb-4">
                                Enter your details to proceed. We'll send a verification code to your phone.
                            </p>

                            <div className="space-y-4">
                                <div className="space-y-1">
                                    <label className="text-xs font-semibold text-slate-500 uppercase">Full Name</label>
                                    <div className="relative">
                                        <User className="absolute left-3 top-3 text-slate-500" size={18} />
                                        <input
                                            required
                                            type="text"
                                            value={formData.name}
                                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                            className="w-full bg-slate-900 border border-slate-700 rounded-xl py-3 pl-10 pr-4 text-white focus:outline-none focus:border-emerald-500 transition-colors"
                                            placeholder="John Doe"
                                        />
                                    </div>
                                </div>
                                <div className="space-y-1">
                                    <label className="text-xs font-semibold text-slate-500 uppercase">Phone Number</label>
                                    <div className="relative">
                                        <Phone className="absolute left-3 top-3 text-slate-500" size={18} />
                                        <input
                                            required
                                            type="tel"
                                            value={formData.phone}
                                            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                                            className="w-full bg-slate-900 border border-slate-700 rounded-xl py-3 pl-10 pr-4 text-white focus:outline-none focus:border-emerald-500 transition-colors"
                                            placeholder="+1 234 567 8900"
                                        />
                                    </div>
                                </div>
                            </div>

                            {error && <p className="text-red-400 text-sm bg-red-500/10 p-2 rounded-lg text-center">{error}</p>}

                            <button
                                type="submit"
                                disabled={loading}
                                className="w-full btn-gradient py-3 rounded-xl font-bold text-black shadow-lg shadow-emerald-500/20 flex items-center justify-center gap-2"
                            >
                                {loading ? <Loader2 className="animate-spin" /> : <>Next <ArrowRight size={18} /></>}
                            </button>
                        </form>
                    )}

                    {step === 'otp' && (
                        <form onSubmit={handleVerifyOtp} className="space-y-6">
                            <div className="text-center mb-6">
                                <div className="w-16 h-16 bg-emerald-500/10 rounded-full flex items-center justify-center mx-auto mb-4 text-emerald-400">
                                    <Lock size={32} />
                                </div>
                                <p className="text-slate-400 text-sm">
                                    Enter the 6-digit code sent to <span className="text-white font-medium">{formData.phone}</span>
                                </p>
                            </div>

                            <div className="space-y-1">
                                <input
                                    required
                                    type="text"
                                    maxLength={6}
                                    value={otp}
                                    onChange={(e) => setOtp(e.target.value.replace(/\D/g, ''))} // Only numbers
                                    className="w-full bg-slate-900 border border-slate-700 rounded-xl py-4 text-center text-2xl tracking-[0.5em] font-mono text-white focus:outline-none focus:border-emerald-500 transition-colors"
                                    placeholder="000000"
                                    autoFocus
                                />
                            </div>

                            {error && <p className="text-red-400 text-sm bg-red-500/10 p-2 rounded-lg text-center">{error}</p>}

                            <button
                                type="submit"
                                disabled={loading || otp.length < 6}
                                className="w-full btn-gradient py-3 rounded-xl font-bold text-black shadow-lg shadow-emerald-500/20 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                {loading ? <Loader2 className="animate-spin" /> : 'Verify & Continue'}
                            </button>

                            <button
                                type="button"
                                onClick={() => setStep('input')}
                                className="w-full text-sm text-slate-500 hover:text-emerald-400 mt-4"
                            >
                                Change Phone Number
                            </button>
                        </form>
                    )}

                    {step === 'success' && (
                        <div className="text-center py-8">
                            <div className="w-20 h-20 bg-green-500/10 rounded-full flex items-center justify-center mx-auto mb-6 text-green-500 animate-in zoom-in duration-300">
                                <CheckCircle size={40} />
                            </div>
                            <h3 className="text-2xl font-bold text-white mb-2">Verified Successfully!</h3>
                            <p className="text-slate-400">Redirecting you to details...</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

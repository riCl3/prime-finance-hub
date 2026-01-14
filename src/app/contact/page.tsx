import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import InquiryForm from '@/components/InquiryForm';
import { Mail, Phone, MapPin, Clock } from 'lucide-react';
import fs from 'fs';
import path from 'path';

async function getContactData() {
    try {
        const filePath = path.join(process.cwd(), 'public/data/content.json');
        if (!fs.existsSync(filePath)) return null;
        const fileContents = fs.readFileSync(filePath, 'utf8');
        return JSON.parse(fileContents);
    } catch (e) {
        return null;
    }
}

export default async function ContactPage() {
    const data = await getContactData();
    const contact = data?.contactInfo || {
        email: 'info@primefinancehub.com',
        phone: '+91 1234567890',
        address: 'Mumbai, Maharashtra, India',
        hours: 'Mon - Sat: 9 AM - 6 PM'
    };

    return (
        <div className="min-h-screen bg-[#0B1120] text-slate-300 selection:bg-emerald-500/30 overflow-x-hidden">
            <Navbar />

            {/* Background Gradients */}
            <div className="fixed inset-0 pointer-events-none z-0">
                <div className="absolute top-[20%] left-[-10%] w-[600px] h-[600px] bg-emerald-500/5 rounded-full blur-[120px]" />
                <div className="absolute bottom-[10%] right-[-5%] w-[500px] h-[500px] bg-cyan-500/5 rounded-full blur-[100px]" />
            </div>

            <main className="container mx-auto pt-32 px-6 pb-20 relative z-10">
                {/* Header */}
                <div className="text-center mb-16 animate-in fade-in slide-in-from-bottom-8 duration-700">
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 mb-6 backdrop-blur-sm">
                        <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                        <span className="text-sm font-medium text-emerald-300">We're here to help</span>
                    </div>
                    <h1 className="text-5xl md:text-6xl font-bold text-white mb-6 tracking-tight">
                        Get In <span className="text-gradient">Touch</span>
                    </h1>
                    <p className="text-xl text-slate-400 max-w-2xl mx-auto leading-relaxed">
                        Have questions about our loans or insurance plans? Reach out to our expert team for personalized assistance.
                    </p>
                </div>

                <div className="grid lg:grid-cols-3 gap-8 lg:gap-12 max-w-7xl mx-auto">
                    {/* Contact Form */}
                    <div className="lg:col-span-2 animate-in fade-in slide-in-from-left-8 duration-700 delay-100">
                        <InquiryForm />
                    </div>

                    {/* Contact Information */}
                    <div className="space-y-8 animate-in fade-in slide-in-from-right-8 duration-700 delay-200">
                        <div className="glass-card p-8 border-l-4 border-emerald-500">
                            <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
                                Contact Information
                            </h3>

                            <div className="space-y-6">
                                <InfoItem
                                    icon={<Mail size={20} />}
                                    label="Email Us"
                                    value={contact.email}
                                    href={`mailto:${contact.email}`}
                                />
                                <InfoItem
                                    icon={<Phone size={20} />}
                                    label="Call Us"
                                    value={contact.phone}
                                    href={`tel:${contact.phone}`}
                                />
                                <InfoItem
                                    icon={<MapPin size={20} />}
                                    label="Visit Us"
                                    value={contact.address}
                                />
                                <InfoItem
                                    icon={<Clock size={20} />}
                                    label="Business Hours"
                                    value={contact.hours}
                                />
                            </div>
                        </div>

                        <div className="glass-card p-8 bg-gradient-to-br from-indigo-900/20 to-purple-900/20 border-l-4 border-purple-500">
                            <h4 className="font-bold text-white mb-3 text-lg">Quick Response Promise</h4>
                            <p className="text-slate-400 text-sm leading-relaxed mb-4">
                                We value your time. Our team typically responds to all digital inquiries within <span className="text-white font-semibold">2 hours</span> during business days.
                            </p>
                            <p className="text-slate-400 text-sm">
                                For urgent matters, please call our support line directly.
                            </p>
                        </div>
                    </div>
                </div>
            </main>

            <Footer />
        </div>
    );
}

function InfoItem({ icon, label, value, href }: { icon: React.ReactNode, label: string, value: string, href?: string }) {
    const Content = (
        <div className="flex items-start gap-4 group">
            <div className="p-3 bg-white/5 rounded-xl border border-white/10 text-emerald-400 group-hover:bg-emerald-500 group-hover:text-black group-hover:border-emerald-500 transition-all duration-300">
                {icon}
            </div>
            <div>
                <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1 group-hover:text-emerald-400 transition-colors">{label}</div>
                <div className="text-white font-medium text-lg">{value}</div>
            </div>
        </div>
    );

    if (href) {
        return <a href={href} className="block">{Content}</a>;
    }

    return Content;
}

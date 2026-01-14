import Link from 'next/link';
import fs from 'fs';
import path from 'path';
import { Mail, Phone, MapPin, Facebook, Twitter, Linkedin, Instagram } from 'lucide-react';

async function getFooterData() {
    try {
        const filePath = path.join(process.cwd(), 'public/data/content.json');
        if (!fs.existsSync(filePath)) return null;
        const fileContents = fs.readFileSync(filePath, 'utf8');
        return JSON.parse(fileContents);
    } catch (e) {
        return null;
    }
}

export default async function Footer() {
    const data = await getFooterData();
    const contact = data?.contactInfo || {
        email: 'info@primefinancehub.com',
        phone: '+91 1234567890',
        address: 'Mumbai, Maharashtra, India',
        socials: { facebook: '#', twitter: '#', linkedin: '#', instagram: '#' },
        copyrightText: '© 2026 Prime Finance Hub. All rights reserved.'
    };

    return (
        <footer className="border-t border-white/5 bg-black/50 backdrop-blur-lg mt-20 relative z-10">
            <div className="container px-4 py-12 mx-auto">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-8">
                    {/* Brand Section */}
                    <div className="col-span-1 md:col-span-2">
                        <div className="flex items-center gap-2 mb-4">
                            <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-emerald-400 to-cyan-500 flex items-center justify-center shadow-lg shadow-emerald-500/20">
                                <span className="text-black font-bold text-lg">P</span>
                            </div>
                            <span className="font-bold text-xl text-white">Prime Finance Hub</span>
                        </div>
                        <p className="text-gray-400 mb-6 max-w-md leading-relaxed">
                            Your trusted partner for all financial needs. We provide premium loans and insurance services tailored to secure your future.
                        </p>
                        <div className="flex gap-3">
                            <SocialLink href={contact.socials?.facebook} icon={<Facebook size={18} />} />
                            <SocialLink href={contact.socials?.twitter} icon={<Twitter size={18} />} />
                            <SocialLink href={contact.socials?.linkedin} icon={<Linkedin size={18} />} />
                            <SocialLink href={contact.socials?.instagram} icon={<Instagram size={18} />} />
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h4 className="font-bold text-white mb-6 flex items-center gap-2">
                            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                            Quick Navigation
                        </h4>
                        <ul className="space-y-3">
                            <li><FooterLink href="/">Home</FooterLink></li>
                            <li><FooterLink href="/about">About Us</FooterLink></li>
                            <li><FooterLink href="/contact">Contact Support</FooterLink></li>
                            <li><FooterLink href="/admin">Admin Portal</FooterLink></li>
                        </ul>
                    </div>

                    {/* Contact Info */}
                    <div>
                        <h4 className="font-bold text-white mb-6 flex items-center gap-2">
                            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                            Contact Us
                        </h4>
                        <ul className="space-y-4">
                            <li className="flex items-start gap-3 text-slate-300 text-sm group">
                                <span className="p-2 rounded-lg bg-emerald-500/10 text-emerald-400 group-hover:bg-emerald-500 group-hover:text-black transition-all duration-300">
                                    <Mail size={16} />
                                </span>
                                <span className="mt-1.5">{contact.email}</span>
                            </li>
                            <li className="flex items-start gap-3 text-slate-300 text-sm group">
                                <span className="p-2 rounded-lg bg-emerald-500/10 text-emerald-400 group-hover:bg-emerald-500 group-hover:text-black transition-all duration-300">
                                    <Phone size={16} />
                                </span>
                                <span className="mt-1.5">{contact.phone}</span>
                            </li>
                            <li className="flex items-start gap-3 text-slate-300 text-sm group">
                                <span className="p-2 rounded-lg bg-emerald-500/10 text-emerald-400 group-hover:bg-emerald-500 group-hover:text-black transition-all duration-300">
                                    <MapPin size={16} />
                                </span>
                                <span className="mt-1.5 leading-relaxed">{contact.address}</span>
                            </li>
                        </ul>
                    </div>
                </div>

                <div className="border-t border-white/5 pt-8 text-center">
                    <p className="text-slate-500 text-sm">{contact.copyrightText}</p>
                </div>
            </div>
        </footer>
    );
}

function SocialLink({ href, icon }: { href?: string; icon: React.ReactNode }) {
    if (!href || href === '#') return null;
    return (
        <a
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center text-slate-400 hover:text-white hover:bg-emerald-500 transition-all duration-300 hover:-translate-y-1"
        >
            {icon}
        </a>
    );
}

function FooterLink({ href, children }: { href: string; children: React.ReactNode }) {
    return (
        <Link
            href={href}
            className="text-slate-400 hover:text-emerald-400 transition-colors flex items-center gap-2 group"
        >
            <span className="w-0 group-hover:w-2 h-[1px] bg-emerald-500 transition-all duration-300"></span>
            {children}
        </Link>
    );
}

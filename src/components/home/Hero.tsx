"use client";

import Link from 'next/link';
import { ArrowRight, CheckCircle } from 'lucide-react';

interface HeroProps {
    content?: {
        hero: {
            tagline: string;
            titlePrefix: string;
            titleHighlight: string;
            description: string;
            primaryButtonText: string;
            secondaryButtonText: string;
        };
        stats: { id: string; value: string; label: string }[];
    };
}

export default function Hero({ content }: HeroProps) {
    // Default fallback values
    const hero = content?.hero || {
        tagline: 'Trusted by 10,000+ customers',
        titlePrefix: 'Build Your Financial',
        titleHighlight: 'Future',
        description: 'Get instant access to personalized loans and comprehensive insurance plans. Fast approvals, competitive rates, and dedicated support.',
        primaryButtonText: 'Get Started',
        secondaryButtonText: 'Learn More'
    };

    const stats = content?.stats || [
        { id: '1', label: 'Loans Disbursed', value: '₹500Cr+' },
        { id: '2', label: 'Success Rate', value: '98%' },
        { id: '3', label: 'Years of Service', value: '15+' }
    ];

    return (
        <section className="relative pt-20 pb-32 flex flex-col items-center justify-center text-center px-6">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 mb-8 backdrop-blur-sm">
                <CheckCircle size={16} className="text-emerald-400" />
                <span className="text-sm font-medium text-emerald-300">{hero.tagline}</span>
            </div>

            <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 tracking-tight max-w-4xl leading-[1.1]">
                {hero.titlePrefix}{' '}
                <br className="hidden md:block" />
                <span className="text-gradient">
                    {hero.titleHighlight}
                </span>
            </h1>

            <p className="text-lg md:text-xl text-slate-400 mb-10 max-w-2xl leading-relaxed">
                {hero.description}
            </p>

            <div className="flex flex-col sm:flex-row items-center gap-4 mb-20">
                <Link href="/contact" className="btn-gradient px-8 py-4 rounded-full text-lg font-semibold flex items-center gap-2 hover:gap-3 transition-all group shadow-lg shadow-emerald-500/20">
                    {hero.primaryButtonText} <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Link>
                <Link href="/about" className="px-8 py-4 rounded-full text-lg font-semibold text-white bg-white/5 border border-white/10 hover:bg-white/10 backdrop-blur-md transition-all">
                    {hero.secondaryButtonText}
                </Link>
            </div>

            {/* Stats Row */}
            <div className="w-full max-w-5xl mx-auto border-t border-white/5 pt-12">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
                    {stats.map((stat) => (
                        <div key={stat.id} className="relative group">
                            <div className="text-3xl md:text-4xl font-bold text-white mb-2 group-hover:text-emerald-400 transition-colors">
                                {stat.value}
                            </div>
                            <div className="text-sm text-slate-400 uppercase tracking-wider font-medium">
                                {stat.label}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}

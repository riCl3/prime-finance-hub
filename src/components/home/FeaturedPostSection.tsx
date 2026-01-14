"use client";

import Link from 'next/link';
import { ArrowRight, Star } from 'lucide-react';

interface FeaturedPostProps {
    post?: {
        enabled: boolean;
        title: string;
        badge: string;
        content: string;
        linkText: string;
        linkUrl: string;
    };
}

import LeadCaptureModal from '@/components/LeadCaptureModal';
import { useState } from 'react';

export default function FeaturedPostSection({ post }: FeaturedPostProps) {
    const [showModal, setShowModal] = useState(false);

    if (!post?.enabled) return null;

    return (
        <section className="relative z-20 -mt-8 mb-8 container px-6">
            <div className="glass-card p-6 md:p-8 flex flex-col md:flex-row items-center justify-between gap-6 border-l-4 border-l-emerald-500 bg-gradient-to-r from-emerald-900/10 to-transparent">
                <div className="flex-1 text-center md:text-left">
                    <div className="flex items-center justify-center md:justify-start gap-3 mb-2">
                        <span className="bg-emerald-500 text-black text-xs font-bold px-2 py-1 rounded uppercase tracking-wider">
                            {post.badge}
                        </span>
                        <div className="flex text-yellow-400 gap-0.5">
                            <Star size={14} fill="currentColor" />
                            <Star size={14} fill="currentColor" />
                            <Star size={14} fill="currentColor" />
                        </div>
                    </div>
                    <h3 className="text-xl md:text-2xl font-bold text-white mb-2">
                        {post.title}
                    </h3>
                    <p className="text-slate-300 max-w-2xl">
                        {post.content}
                    </p>
                </div>

                <button
                    onClick={() => setShowModal(true)}
                    className="btn-gradient px-8 py-3 rounded-xl font-semibold flex items-center gap-2 shadow-lg shadow-emerald-500/10 whitespace-nowrap hover:scale-105 transition-transform"
                >
                    {post.linkText || 'Learn More'} <ArrowRight size={18} />
                </button>
            </div>

            <LeadCaptureModal
                isOpen={showModal}
                onClose={() => setShowModal(false)}
                triggerUrl={post.linkUrl}
            />
        </section>
    );
}

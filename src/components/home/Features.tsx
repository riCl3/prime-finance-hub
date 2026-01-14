"use client";

import { Zap, Shield, Clock, TrendingUp } from 'lucide-react';

export default function Features() {
    const features = [
        {
            icon: Zap,
            title: 'Instant Approval',
            description: 'Get loan approvals in minutes with our streamlined digital process'
        },
        {
            icon: Shield,
            title: 'Secure & Trusted',
            description: 'Bank-level security and 15+ years of trusted service'
        },
        {
            icon: Clock,
            title: '24/7 Support',
            description: 'Round-the-clock customer support for all your queries'
        },
        {
            icon: TrendingUp,
            title: 'Best Rates',
            description: 'Competitive interest rates and flexible repayment options'
        }
    ];

    return (
        <section className="section">
            <div className="container">
                <div className="text-center" style={{ marginBottom: 'var(--space-3xl)' }}>
                    <h2 style={{ marginBottom: 'var(--space-md)' }}>
                        Why Choose Us
                    </h2>
                    <p style={{
                        fontSize: 'var(--font-size-lg)',
                        maxWidth: '600px',
                        margin: '0 auto'
                    }}>
                        We make financial services simple, fast, and accessible for everyone
                    </p>
                </div>

                <div className="grid grid-4">
                    {features.map((feature, idx) => {
                        const Icon = feature.icon;
                        return (
                            <div key={idx} className="glass-panel" style={{ padding: 'var(--space-xl)' }}>
                                <div className="glass-panel" style={{
                                    width: '56px',
                                    height: '56px',
                                    borderRadius: 'var(--radius-md)',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    marginBottom: 'var(--space-lg)',
                                    background: 'rgba(0, 255, 136, 0.1)',
                                    borderColor: 'var(--color-primary)'
                                }}>
                                    <Icon size={28} style={{ color: 'var(--color-primary)' }} />
                                </div>
                                <h3 style={{
                                    fontSize: 'var(--font-size-xl)',
                                    fontWeight: 600,
                                    marginBottom: 'var(--space-md)'
                                }}>
                                    {feature.title}
                                </h3>
                                <p style={{
                                    color: 'var(--color-text-secondary)',
                                    lineHeight: 1.6,
                                    margin: 0
                                }}>
                                    {feature.description}
                                </p>
                            </div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}

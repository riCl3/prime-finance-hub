"use client";

import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

export default function CTA() {
    return (
        <section className="section">
            <div className="container">
                <div className="glass-panel" style={{
                    padding: 'var(--space-4xl)',
                    background: 'linear-gradient(135deg, rgba(0, 255, 136, 0.1), rgba(0, 170, 255, 0.1))',
                    textAlign: 'center',
                    borderColor: 'var(--color-primary)'
                }}>
                    <h2 style={{ marginBottom: 'var(--space-md)' }}>
                        Ready to Get Started?
                    </h2>
                    <p style={{
                        fontSize: 'var(--font-size-xl)',
                        marginBottom: 'var(--space-2xl)',
                        maxWidth: '700px',
                        margin: '0 auto var(--space-2xl)'
                    }}>
                        Join thousands of satisfied customers who trust us with their financial future
                    </p>
                    <Link href="/contact" className="btn btn-primary btn-lg">
                        Apply Now <ArrowRight size={20} />
                    </Link>
                </div>
            </div>
        </section>
    );
}

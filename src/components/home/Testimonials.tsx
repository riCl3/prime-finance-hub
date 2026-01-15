"use client";

import { Star, Quote } from 'lucide-react';

export default function Testimonials() {
    const testimonials = [
        {
            name: 'Rajesh Kumar',
            role: 'Business Owner',
            content: 'Prime Finance Hub made getting a business loan incredibly easy. The entire process was completed in just 2 days!',
            rating: 5,
            image: 'RK'
        },
        {
            name: 'Priya Sharma',
            role: 'IT Professional',
            content: 'Their life insurance plans are comprehensive and affordable. The team guided me through every step.',
            rating: 5,
            image: 'PS'
        },
        {
            name: 'Amit Patel',
            role: 'Entrepreneur',
            content: 'Best rates in the market and exceptional customer service. Highly recommend for any financial needs.',
            rating: 5,
            image: 'AP'
        }
    ];

    return (
        <section className="section">
            <div className="container">
                <div className="text-center" style={{ marginBottom: 'var(--space-3xl)' }}>
                    <h2 style={{ marginBottom: 'var(--space-md)' }}>
                        What Our Clients Say
                    </h2>
                    <p style={{
                        fontSize: 'var(--font-size-lg)',
                        maxWidth: '600px',
                        margin: '0 auto'
                    }}>
                        Real stories from satisfied customers
                    </p>
                </div>

                <div className="grid grid-3">
                    {testimonials.map((testimonial, idx) => (
                        <div key={idx} className="glass-panel" style={{ padding: 'var(--space-xl)', position: 'relative' }}>
                            <Quote
                                size={32}
                                style={{
                                    position: 'absolute',
                                    top: 'var(--space-lg)',
                                    right: 'var(--space-lg)',
                                    color: 'rgba(0, 255, 136, 0.1)'
                                }}
                            />

                            {/* Rating */}
                            <div style={{
                                display: 'flex',
                                gap: 'var(--space-xs)',
                                marginBottom: 'var(--space-md)'
                            }}>
                                {[...Array(testimonial.rating)].map((_, i) => (
                                    <Star
                                        key={i}
                                        size={16}
                                        style={{ fill: 'var(--color-primary)', color: 'var(--color-primary)' }}
                                    />
                                ))}
                            </div>

                            <p style={{
                                fontSize: 'var(--font-size-base)',
                                marginBottom: 'var(--space-lg)',
                                fontStyle: 'italic',
                                lineHeight: 1.7
                            }}>
                                &quot;{testimonial.content}&quot;
                            </p>

                            <div style={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: 'var(--space-md)',
                                paddingTop: 'var(--space-lg)',
                                borderTop: '1px solid var(--glass-border)'
                            }}>
                                <div style={{
                                    width: '48px',
                                    height: '48px',
                                    borderRadius: '50%',
                                    background: 'linear-gradient(135deg, var(--color-primary), var(--color-accent))',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    color: '#000',
                                    fontWeight: 600,
                                    fontSize: 'var(--font-size-base)'
                                }}>
                                    {testimonial.image}
                                </div>
                                <div>
                                    <div style={{
                                        fontWeight: 600,
                                        marginBottom: '2px'
                                    }}>
                                        {testimonial.name}
                                    </div>
                                    <div style={{
                                        fontSize: 'var(--font-size-sm)',
                                        color: 'var(--color-text-tertiary)'
                                    }}>
                                        {testimonial.role}
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}

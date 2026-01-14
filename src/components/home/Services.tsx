"use client";

import { useState } from 'react';
import Link from 'next/link';
import { Check, ArrowRight } from 'lucide-react';

interface Service {
    _id: string;
    title: string;
    category: string;
    type: string;
    description: string;
    benefits: string[];
    actualPrice: number;
    discountedPrice: number;
    discountPercentage: number;
}

export default function Services({ services }: { services: Service[] }) {
    const [activeTab, setActiveTab] = useState<'Loans' | 'Life Insurance'>('Loans');

    const filteredServices = services.filter(s => s.category === activeTab);

    return (
        <section className="section">
            <div className="container">
                <div className="text-center" style={{ marginBottom: 'var(--space-3xl)' }}>
                    <h2 style={{ marginBottom: 'var(--space-md)' }}>
                        Our Services
                    </h2>
                    }}>
                    Choose from our comprehensive range of financial products
                </p>

                {/* Tabs */}
                <div style={{
                    display: 'inline-flex',
                    gap: 'var(--space-sm)',
                    padding: '4px',
                    backgroundColor: 'var(--color-surface)',
                    borderRadius: 'var(--radius-md)',
                    marginBottom: 'var(--space-2xl)'
                }}>
                    {(['Loans', 'Life Insurance'] as const).map((tab) => (
                        <button
                            key={tab}
                            onClick={() => setActiveTab(tab)}
                            style={{
                                padding: '12px 32px',
                                fontSize: 'var(--font-size-base)',
                                fontWeight: 600,
                                border: 'none',
                                borderRadius: 'var(--radius-md)',
                                backgroundColor: activeTab === tab ? 'white' : 'transparent',
                                color: activeTab === tab ? 'var(--color-primary)' : 'var(--color-text-secondary)',
                                cursor: 'pointer',
                                transition: 'all var(--transition-fast)',
                                boxShadow: activeTab === tab ? 'var(--shadow-sm)' : 'none'
                            }}
                        >
                            {tab}
                        </button>
                    ))}
                </div>
            </div>

            {/* Services Grid */}
            <div className="grid grid-3" style={{ gap: 'var(--space-xl)' }}>
                {filteredServices.length > 0 ? (
                    filteredServices.map((service) => (
                        <Link
                            key={service._id}
                            href={`/services/${service._id}`}
                            style={{ textDecoration: 'none' }}
                        >
                            <div
                                style={{
                                    height: '100%',
                                    padding: 'var(--space-xl)',
                                    backgroundColor: 'white',
                                    border: '1px solid var(--color-border)',
                                    borderRadius: 'var(--radius-lg)',
                                    transition: 'all var(--transition-base)',
                                    cursor: 'pointer'
                                }}
                                onMouseEnter={(e) => {
                                    e.currentTarget.style.transform = 'translateY(-4px)';
                                    e.currentTarget.style.boxShadow = 'var(--shadow-lg)';
                                    e.currentTarget.style.borderColor = 'var(--color-primary)';
                                }}
                                onMouseLeave={(e) => {
                                    e.currentTarget.style.transform = 'translateY(0)';
                                    e.currentTarget.style.boxShadow = 'none';
                                    e.currentTarget.style.borderColor = 'var(--color-border)';
                                }}
                            >
                                {/* Header */}
                                <div style={{
                                    display: 'flex',
                                    justifyContent: 'space-between',
                                    alignItems: 'flex-start',
                                    marginBottom: 'var(--space-lg)'
                                }}>
                                    <span className="badge badge-primary">{service.type}</span>
                                    {service.discountPercentage > 0 && (
                                        <span style={{
                                            padding: '4px 8px',
                                            fontSize: 'var(--font-size-xs)',
                                            fontWeight: 600,
                                            borderRadius: 'var(--radius-sm)',
                                            backgroundColor: 'var(--color-primary)',
                                            color: 'white'
                                        }}>
                                            {service.discountPercentage}% OFF
                                        </span>
                                    )}
                                </div>

                                <h3 style={{
                                    fontSize: 'var(--font-size-2xl)',
                                    fontWeight: 600,
                                    marginBottom: 'var(--space-md)',
                                    color: 'var(--color-text-primary)'
                                }}>
                                    {service.title}
                                </h3>

                                <p style={{
                                    color: 'var(--color-text-secondary)',
                                    marginBottom: 'var(--space-lg)',
                                    lineHeight: 1.6
                                }}>
                                    {service.description}
                                </p>

                                {/* Pricing */}
                                <div style={{
                                    display: 'flex',
                                    alignItems: 'baseline',
                                    gap: 'var(--space-md)',
                                    marginBottom: 'var(--space-lg)',
                                    paddingBottom: 'var(--space-lg)',
                                    borderBottom: '1px solid var(--color-border)'
                                }}>
                                    <span style={{
                                        fontSize: 'var(--font-size-3xl)',
                                        fontWeight: 700,
                                        color: 'var(--color-primary)'
                                    }}>
                                        ₹{service.discountedPrice.toLocaleString()}
                                    </span>
                                    {service.discountPercentage > 0 && (
                                        <span style={{
                                            fontSize: 'var(--font-size-lg)',
                                            color: 'var(--color-text-tertiary)',
                                            textDecoration: 'line-through'
                                        }}>
                                            ₹{service.actualPrice.toLocaleString()}
                                        </span>
                                    )}
                                </div>

                                {/* Benefits */}
                                <ul style={{
                                    listStyle: 'none',
                                    padding: 0,
                                    marginBottom: 'var(--space-lg)'
                                }}>
                                    {service.benefits.slice(0, 3).map((benefit, idx) => (
                                        <li key={idx} style={{
                                            display: 'flex',
                                            gap: 'var(--space-sm)',
                                            alignItems: 'flex-start',
                                            marginBottom: 'var(--space-sm)',
                                            fontSize: 'var(--font-size-sm)',
                                            color: 'var(--color-text-secondary)'
                                        }}>
                                            <Check size={16} style={{
                                                color: 'var(--color-primary)',
                                                flexShrink: 0,
                                                marginTop: '2px'
                                            }} />
                                            {benefit}
                                        </li>
                                    ))}
                                </ul>

                                {/* CTA */}
                                <div style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: 'var(--space-sm)',
                                    color: 'var(--color-primary)',
                                    fontSize: 'var(--font-size-base)',
                                    fontWeight: 600
                                }}>
                                    View Details <ArrowRight size={18} />
                                </div>
                            </div>
                        </Link>
                    ))
                ) : (
                    <div style={{
                        gridColumn: '1 / -1',
                        textAlign: 'center',
                        padding: 'var(--space-3xl)',
                        color: 'var(--color-text-tertiary)'
                    }}>
                        No services available in this category yet.
                    </div>
                )}
            </div>
        </div>
        </section >
    );
}

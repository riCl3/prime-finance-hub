"use client";

import Link from 'next/link';
import { Mail, Phone, MapPin, Facebook, Twitter, Linkedin, Instagram } from 'lucide-react';

export default function Footer() {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="glass-panel" style={{
            borderRadius: 0,
            borderLeft: 'none',
            borderRight: 'none',
            borderBottom: 'none',
            marginTop: 'var(--space-4xl)'
        }}>
            <div className="container" style={{ padding: 'var(--space-4xl) var(--space-lg)' }}>
                <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
                    gap: 'var(--space-3xl)',
                    marginBottom: 'var(--space-3xl)'
                }}>
                    {/* Company Info */}
                    <div>
                        <div style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: 'var(--space-md)',
                            marginBottom: 'var(--space-lg)'
                        }}>
                            <div style={{
                                width: '40px',
                                height: '40px',
                                borderRadius: 'var(--radius-md)',
                                background: 'linear-gradient(135deg, var(--color-primary), var(--color-accent))',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                color: '#000',
                                fontWeight: 700,
                                fontSize: '20px'
                            }}>
                                P
                            </div>
                            <span style={{ fontSize: 'var(--font-size-lg)', fontWeight: 600, color: 'var(--color-text-primary)' }}>
                                Prime Finance Hub
                            </span>
                        </div>
                        <p style={{ color: 'var(--color-text-secondary)', marginBottom: 'var(--space-lg)', lineHeight: 1.6 }}>
                            Your trusted partner for loans and insurance solutions.
                        </p>
                        <div style={{ display: 'flex', gap: 'var(--space-md)' }}>
                            {[Facebook, Twitter, Linkedin, Instagram].map((Icon, idx) => (
                                <a
                                    key={idx}
                                    href="#"
                                    className="glass-panel"
                                    style={{
                                        width: '40px',
                                        height: '40px',
                                        borderRadius: 'var(--radius-md)',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        color: 'var(--color-text-secondary)',
                                        padding: 0
                                    }}
                                >
                                    <Icon size={18} />
                                </a>
                            ))}
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h4 style={{ fontWeight: 600, marginBottom: 'var(--space-lg)', color: 'var(--color-text-primary)' }}>
                            Quick Links
                        </h4>
                        <ul style={{ listStyle: 'none', padding: 0 }}>
                            {[
                                { label: 'Home', href: '/' },
                                { label: 'About', href: '/about' },
                                { label: 'Contact', href: '/contact' }
                            ].map((item) => (
                                <li key={item.label} style={{ marginBottom: 'var(--space-md)' }}>
                                    <Link
                                        href={item.href}
                                        style={{
                                            color: 'var(--color-text-secondary)',
                                            textDecoration: 'none',
                                            transition: 'color var(--transition-fast)'
                                        }}
                                    >
                                        {item.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Contact Info */}
                    <div>
                        <h4 style={{ fontWeight: 600, marginBottom: 'var(--space-lg)', color: 'var(--color-text-primary)' }}>
                            Contact Us
                        </h4>
                        <ul style={{ listStyle: 'none', padding: 0 }}>
                            {[
                                { icon: Mail, text: 'info@primefinancehub.com' },
                                { icon: Phone, text: '+91 1234567890' },
                                { icon: MapPin, text: 'Mumbai, India' }
                            ].map((item, idx) => {
                                const Icon = item.icon;
                                return (
                                    <li key={idx} style={{
                                        display: 'flex',
                                        gap: 'var(--space-md)',
                                        marginBottom: 'var(--space-md)',
                                        color: 'var(--color-text-secondary)',
                                        alignItems: 'flex-start'
                                    }}>
                                        <Icon size={18} style={{ color: 'var(--color-primary)', flexShrink: 0, marginTop: '2px' }} />
                                        <span style={{ fontSize: 'var(--font-size-sm)' }}>{item.text}</span>
                                    </li>
                                );
                            })}
                        </ul>
                    </div>
                </div>

                <div style={{
                    borderTop: '1px solid var(--glass-border)',
                    paddingTop: 'var(--space-xl)',
                    textAlign: 'center',
                    color: 'var(--color-text-tertiary)',
                    fontSize: 'var(--font-size-sm)'
                }}>
                    © {currentYear} Prime Finance Hub. All rights reserved.
                </div>
            </div>
        </footer>
    );
}

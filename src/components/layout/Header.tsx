"use client";

import Link from 'next/link';
import { useState } from 'react';
import { Menu, X } from 'lucide-react';

export default function Header() {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    const navLinks = [
        { href: '/', label: 'Home' },
        { href: '/about', label: 'About' },
        { href: '/contact', label: 'Contact' },
    ];

    return (
        <header className="glass-panel" style={{
            position: 'sticky',
            top: 0,
            zIndex: 50,
            borderRadius: 0,
            borderLeft: 'none',
            borderRight: 'none',
            borderTop: 'none'
        }}>
            <div className="container" style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                height: '80px'
            }}>
                {/* Logo */}
                <Link href="/" style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 'var(--space-md)',
                    textDecoration: 'none'
                }}>
                    <div style={{
                        width: '44px',
                        height: '44px',
                        borderRadius: 'var(--radius-md)',
                        background: 'linear-gradient(135deg, var(--color-primary), var(--color-accent))',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: '#000',
                        fontWeight: 700,
                        fontSize: '22px',
                        boxShadow: '0 0 20px rgba(0, 255, 136, 0.3)'
                    }}>
                        P
                    </div>
                    <span style={{
                        fontSize: 'var(--font-size-xl)',
                        fontWeight: 700,
                        color: 'var(--color-text-primary)',
                        whiteSpace: 'nowrap'
                    }}>
                        Prime Finance Hub
                    </span>
                </Link>

                {/* Desktop Navigation */}
                <nav style={{
                    display: 'none',
                    gap: 'var(--space-2xl)',
                    alignItems: 'center'
                }} className="desktop-nav">
                    {navLinks.map((link) => (
                        <Link
                            key={link.href}
                            href={link.href}
                            style={{
                                fontSize: 'var(--font-size-base)',
                                fontWeight: 500,
                                color: 'var(--color-text-secondary)',
                                transition: 'color var(--transition-fast)',
                                textDecoration: 'none'
                            }}
                        >
                            {link.label}
                        </Link>
                    ))}
                    <Link href="/contact" className="btn btn-primary">
                        Get Started
                    </Link>
                </nav>

                {/* Mobile Menu Button */}
                <button
                    onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                    style={{
                        display: 'flex',
                        padding: 'var(--space-sm)',
                        background: 'rgba(255, 255, 255, 0.05)',
                        border: '1px solid var(--glass-border)',
                        borderRadius: 'var(--radius-md)',
                        cursor: 'pointer',
                        color: 'var(--color-text-primary)',
                        transition: 'all var(--transition-fast)'
                    }}
                    className="mobile-menu-btn"
                >
                    {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
                </button>
            </div>

            {/* Mobile Menu */}
            {mobileMenuOpen && (
                <div style={{
                    borderTop: '1px solid var(--glass-border)',
                    padding: 'var(--space-lg)'
                }} className="mobile-menu">
                    <nav style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-md)' }}>
                        {navLinks.map((link) => (
                            <Link
                                key={link.href}
                                href={link.href}
                                onClick={() => setMobileMenuOpen(false)}
                                style={{
                                    padding: 'var(--space-md)',
                                    fontSize: 'var(--font-size-lg)',
                                    color: 'var(--color-text-secondary)',
                                    textDecoration: 'none',
                                    borderRadius: 'var(--radius-md)',
                                    transition: 'all var(--transition-fast)',
                                    background: 'rgba(255, 255, 255, 0.03)'
                                }}
                            >
                                {link.label}
                            </Link>
                        ))}
                        <Link
                            href="/contact"
                            className="btn btn-primary"
                            onClick={() => setMobileMenuOpen(false)}
                            style={{ width: '100%', marginTop: 'var(--space-md)' }}
                        >
                            Get Started
                        </Link>
                    </nav>
                </div>
            )}

            <style jsx>{`
        @media (min-width: 769px) {
          .desktop-nav {
            display: flex !important;
          }
          .mobile-menu-btn {
            display: none !important;
          }
        }
      `}</style>
        </header>
    );
}

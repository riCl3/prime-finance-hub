"use client";

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
    const loanServices = services.filter(s => s.category === 'Loans');
    const insuranceServices = services.filter(s => s.category === 'Life Insurance');

    // Helper to render a service card (to avoid duplication)
    const ServiceCard = ({ service }: { service: Service }) => (
        <Link
            key={service._id}
            href={`/services/${service._id}`}
            className="group relative bg-white/5 rounded-2xl border border-white/10 p-8 hover:-translate-y-1 hover:shadow-xl hover:shadow-emerald-500/10 hover:border-emerald-500/50 transition-all duration-300"
        >
            {/* Header */}
            <div className="flex justify-between items-start mb-6">
                <span className="px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-400 text-xs font-semibold border border-emerald-500/20">
                    {service.type}
                </span>
                {service.discountPercentage > 0 && (
                    <span className="px-3 py-1 rounded-full bg-red-500/10 text-red-400 text-xs font-bold border border-red-500/20">
                        {service.discountPercentage}% OFF
                    </span>
                )}
            </div>

            <h3 className="text-xl font-bold text-white mb-3 group-hover:text-emerald-400 transition-colors">
                {service.title}
            </h3>

            <p className="text-slate-400 text-sm mb-6 line-clamp-3 leading-relaxed">
                {service.description}
            </p>

            {/* Pricing */}
            <div className="flex items-baseline gap-3 mb-6 pb-6 border-b border-white/10">
                <span className="text-3xl font-bold text-white">
                    ₹{service.discountedPrice.toLocaleString()}
                </span>
                {service.discountPercentage > 0 && (
                    <span className="text-sm text-slate-500 line-through">
                        ₹{service.actualPrice.toLocaleString()}
                    </span>
                )}
            </div>

            {/* Benefits */}
            <ul className="space-y-3 mb-8">
                {service.benefits.slice(0, 3).map((benefit, idx) => (
                    <li key={idx} className="flex items-start gap-3 text-sm text-slate-400 group-hover:text-slate-300 transition-colors">
                        <Check className="w-5 h-5 text-emerald-500 shrink-0" />
                        <span>{benefit}</span>
                    </li>
                ))}
            </ul>

            {/* CTA */}
            <div className="flex items-center gap-2 text-emerald-400 font-semibold group-hover:gap-3 transition-all">
                View Details <ArrowRight className="w-4 h-4" />
            </div>
        </Link>
    );

    const renderSection = (title: string, subtitle: string, items: Service[], id: string) => (
        <section id={id} className="py-20 relative border-t border-white/5 bg-white/[0.02]">
            <div className="container mx-auto px-6">
                <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                        {title}
                    </h2>
                    <p className="text-slate-400 max-w-2xl mx-auto">
                        {subtitle}
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {items.length > 0 ? (
                        items.map((service) => <ServiceCard key={service._id} service={service} />)
                    ) : (
                        <div className="col-span-full text-center py-12 text-slate-500 bg-white/5 rounded-2xl border border-white/10 border-dashed">
                            No services available in this category yet.
                        </div>
                    )}
                </div>
            </div>
        </section>
    );

    return (
        <div id="services-container">
            {/* Loan Solutions Section */}
            {renderSection(
                "Loan Solutions",
                "Flexible loan solutions tailored to your financial needs with competitive rates and quick approval.",
                loanServices,
                "loans"
            )}

            {/* Life Insurance Section */}
            {renderSection(
                "Life Insurance Plans",
                "Comprehensive insurance coverage to protect you and your loved ones with peace of mind.",
                insuranceServices,
                "life-insurance"
            )}
        </div>
    );
}

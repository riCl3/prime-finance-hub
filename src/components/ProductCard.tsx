import { Check, ArrowRight } from 'lucide-react';
import Link from 'next/link';

interface ProductCardProps {
    title: string;
    description: string;
    benefits: string[];
    actualPrice: number;
    discountedPrice: number;
    discountPercentage: number;
    category: 'Loans' | 'Life Insurance';
}

export default function ProductCard({
    title,
    description,
    benefits,
    actualPrice,
    discountedPrice,
    discountPercentage,
    category
}: ProductCardProps) {
    const isLoan = category === 'Loans';

    return (
        <div className="glass-card p-6 group hover:border-white/20 transition-all duration-300 flex flex-col h-full">
            {/* Header with Discount Badge */}
            <div className="flex items-start justify-between mb-4">
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center transition-colors ${isLoan
                        ? 'bg-emerald-500/10 group-hover:bg-emerald-500/20'
                        : 'bg-cyan-500/10 group-hover:bg-cyan-500/20'
                    }`}>
                    <span className="text-2xl">
                        {isLoan ? '💰' : '🛡️'}
                    </span>
                </div>
                {discountPercentage > 0 && (
                    <div className={`px-3 py-1 rounded-full text-sm font-bold ${isLoan
                            ? 'bg-emerald-500/20 border border-emerald-500/50 text-emerald-400'
                            : 'bg-cyan-500/20 border border-cyan-500/50 text-cyan-400'
                        }`}>
                        {discountPercentage}% OFF
                    </div>
                )}
            </div>

            {/* Title & Description */}
            <h3 className="text-xl font-bold text-white mb-2">{title}</h3>
            <p className="text-slate-400 text-sm leading-relaxed mb-4 flex-grow">
                {description}
            </p>

            {/* Benefits */}
            {benefits.length > 0 && (
                <div className="mb-6 space-y-2">
                    {benefits.slice(0, 4).map((benefit, index) => (
                        <div key={index} className="flex items-start gap-2">
                            <Check className={`w-4 h-4 mt-0.5 flex-shrink-0 ${isLoan ? 'text-emerald-400' : 'text-cyan-400'
                                }`} />
                            <span className="text-slate-300 text-sm">{benefit}</span>
                        </div>
                    ))}
                </div>
            )}

            {/* Pricing */}
            <div className="mb-4 pb-4 border-t border-white/10 pt-4">
                <div className="flex items-baseline gap-3">
                    {actualPrice !== discountedPrice && (
                        <span className="text-slate-500 line-through text-lg">
                            ₹{actualPrice.toLocaleString('en-IN')}
                        </span>
                    )}
                    <span className={`text-2xl font-bold ${isLoan ? 'text-emerald-400' : 'text-cyan-400'
                        }`}>
                        ₹{discountedPrice.toLocaleString('en-IN')}
                    </span>
                </div>
            </div>

            {/* CTA Button */}
            <Link
                href="/contact"
                className="btn-gradient px-6 py-3 rounded-lg text-center font-semibold flex items-center justify-center gap-2 group-hover:gap-3 transition-all"
            >
                Apply Now <ArrowRight className="w-4 h-4" />
            </Link>
        </div>
    );
}

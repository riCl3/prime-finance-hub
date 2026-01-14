import {
    Briefcase, Zap, Heart, Activity, TrendingUp, Shield, FileWarning, Wallet, CircleDollarSign, Check
} from 'lucide-react';

interface ServiceCardProps {
    service: {
        _id: string;
        title: string;
        category: string;
        type: string;
        description: string;
        benefits: string[];
        actualPrice: number;
        discountedPrice: number;
        discountPercentage: number;
    };
}

const iconMap: Record<string, any> = {
    'Personal Loan': Wallet,
    'Business Loan': Briefcase,
    'Instant Loan': Zap,
    'Life Insurance': Heart,
    'Health Insurance': Activity,
    'Mutual Fund': TrendingUp,
    'General Insurance': Shield,
    'Cibil Recover': FileWarning,
    'Default': CircleDollarSign
};

export default function ServiceCard({ service }: ServiceCardProps) {
    const IconComponent = iconMap[service.type] || iconMap['Default'];

    return (
        <div className="glass-panel p-6 h-full flex flex-col group relative overflow-hidden cursor-pointer hover:scale-[1.02] transition-all duration-300">
            {/* Discount Badge */}
            {service.discountPercentage > 0 && (
                <div className="absolute top-0 right-0 bg-green-500 text-black text-xs font-bold px-3 py-1 rounded-bl-lg z-10">
                    {service.discountPercentage}% OFF
                </div>
            )}

            <div className="flex items-center justify-between mb-4 mt-2">
                <div className="p-3 rounded-full bg-white/5 group-hover:bg-green-500/20 transition-colors">
                    <IconComponent className="text-green-400 group-hover:text-white transition-colors" size={28} />
                </div>
                <span className="text-xs font-mono text-white/40 uppercase tracking-widest border border-white/10 px-2 py-1 rounded">
                    {service.type}
                </span>
            </div>

            <h3 className="text-xl font-bold mb-2 text-white group-hover:text-green-300 transition-colors">
                {service.title}
            </h3>

            <p className="text-gray-400 text-sm mb-4 leading-relaxed line-clamp-2">
                {service.description}
            </p>

            {/* Pricing */}
            <div className="flex items-end gap-2 mb-6">
                <span className="text-2xl font-bold text-white">₹{service.discountedPrice.toLocaleString()}</span>
                {service.discountPercentage > 0 && (
                    <span className="text-sm text-gray-500 line-through mb-1">₹{service.actualPrice.toLocaleString()}</span>
                )}
            </div>

            {/* Benefits List */}
            <div className="mt-auto space-y-2 border-t border-white/5 pt-4">
                {service.benefits?.slice(0, 3).map((benefit, idx) => (
                    <div key={idx} className="flex items-start gap-2 text-sm text-gray-300">
                        <Check size={16} className="text-green-400 mt-0.5 shrink-0" />
                        <span className="line-clamp-1">{benefit}</span>
                    </div>
                ))}
                {service.benefits?.length > 3 && (
                    <p className="text-xs text-center text-gray-500 mt-2">+ {service.benefits.length - 3} more benefits</p>
                )}
            </div>

            <div className="w-full mt-6 py-2 rounded-lg border border-white/10 group-hover:bg-green-500 group-hover:text-black group-hover:border-transparent transition-all text-sm font-semibold text-center">
                View Details
            </div>
        </div>
    );
}

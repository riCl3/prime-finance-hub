import { Users, Award, TrendingUp, ShieldCheck } from 'lucide-react';

export default function Stats() {
    const stats = [
        { icon: Users, label: 'Happy Customers', value: '10,000+' },
        { icon: Award, label: 'Years Experience', value: '15+' },
        { icon: TrendingUp, label: 'Loans Disbursed', value: '₹500Cr+' },
        { icon: ShieldCheck, label: 'Success Rate', value: '98%' }
    ];

    return (
        <section className="py-16 mb-20">
            <div className="text-center mb-12">
                <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                    Trusted by <span className="text-green-400">Thousands</span>
                </h2>
                <p className="text-gray-400">Numbers that speak for our excellence</p>
            </div>

            <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
                {stats.map((stat, idx) => {
                    const Icon = stat.icon;
                    return (
                        <div key={idx} className="glass-panel p-6 text-center group hover:scale-105 transition-transform">
                            <div className="inline-flex p-4 rounded-full bg-green-500/10 group-hover:bg-green-500/20 transition-colors mb-4">
                                <Icon className="text-green-400" size={32} />
                            </div>
                            <div className="text-3xl font-bold text-white mb-2">{stat.value}</div>
                            <div className="text-gray-400 text-sm">{stat.label}</div>
                        </div>
                    );
                })}
            </div>
        </section>
    );
}

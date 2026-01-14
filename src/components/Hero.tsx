import { ArrowRight, Sparkles } from 'lucide-react';
import Link from 'next/link';

export default function Hero() {
    return (
        <div className="text-center mb-20 max-w-5xl mx-auto pt-8">
            <div className="inline-flex items-center gap-2 mb-6 px-4 py-2 rounded-full glass-panel bg-white/5 border border-white/10">
                <Sparkles size={16} className="text-green-400" />
                <span className="text-green-400 font-medium tracking-wide text-sm uppercase">
                    Financial Freedom Starts Here
                </span>
            </div>

            <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
                Transform Your Financial <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-400 via-emerald-400 to-blue-500">
                    Future Today
                </span>
            </h1>

            <p className="text-xl text-gray-400 mb-10 max-w-2xl mx-auto leading-relaxed">
                Access premium financial services with competitive rates, instant approvals, and personalized support. Your success is our mission.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/contact" className="btn-primary flex items-center gap-2 justify-center">
                    Get Started <ArrowRight size={20} />
                </Link>
                <Link href="/about" className="bg-white/5 hover:bg-white/10 text-white border border-white/10 px-8 py-3 rounded-full font-semibold transition-all">
                    Learn More
                </Link>
            </div>

            {/* Animation handled by Tailwind */}
        </div>
    );
}

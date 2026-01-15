import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Target, Users, Award, TrendingUp } from 'lucide-react';
import Link from 'next/link';

// Cache this page for 1 hour (static content)
export const revalidate = 3600;

export default function AboutPage() {
    return (
        <div className="min-h-screen">
            <Navbar />

            <main className="container pt-32 px-4 pb-20">
                {/* Header */}
                <div className="text-center mb-16">
                    <h1 className="text-5xl font-bold text-white mb-4">About Prime Finance Hub</h1>
                    <p className="text-xl text-gray-400 max-w-3xl mx-auto">
                        Your trusted financial partner, committed to helping you achieve your dreams through accessible and innovative financial solutions.
                    </p>
                </div>

                {/* Story Section */}
                <div className="glass-panel p-10 mb-16">
                    <h2 className="text-3xl font-bold text-white mb-6">Our Story</h2>
                    <div className="space-y-4 text-gray-400 leading-relaxed">
                        <p>
                            Founded in 2011, Prime Finance Hub was born from a simple vision: to make quality financial services accessible to everyone.
                            We recognized that traditional banking often created unnecessary barriers, and we set out to change that.
                        </p>
                        <p>
                            Over the past 15 years, we&apos;ve grown from a small team of financial enthusiasts to a trusted institution serving over 10,000
                            satisfied customers across India. Our success is built on three pillars: transparency, speed, and personalized service.
                        </p>
                        <p>
                            Today, we offer comprehensive loan and insurance solutions designed to meet the diverse needs of modern India.
                            Whether you&apos;re a first-time borrower or a seasoned investor, we&apos;re here to guide you every step of the way.
                        </p>
                    </div>
                </div>

                {/* Values Grid */}
                <div className="mb-16">
                    <h2 className="text-3xl font-bold text-white text-center mb-10">Our Core Values</h2>
                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {[
                            {
                                icon: Target,
                                title: 'Customer First',
                                description: 'Every decision we make prioritizes your financial well-being and success.'
                            },
                            {
                                icon: Users,
                                title: 'Trust & Transparency',
                                description: 'We believe in clear communication with no hidden fees or surprises.'
                            },
                            {
                                icon: Award,
                                title: 'Excellence',
                                description: 'We constantly innovate to provide the best financial solutions in the market.'
                            },
                            {
                                icon: TrendingUp,
                                title: 'Growth Together',
                                description: 'Your success is our success. We grow by helping you achieve your goals.'
                            }
                        ].map((value, idx) => {
                            const Icon = value.icon;
                            return (
                                <div key={idx} className="glass-panel p-6 text-center group hover:scale-105 transition-transform">
                                    <div className="inline-flex p-4 rounded-full bg-green-500/10 group-hover:bg-green-500/20 transition-colors mb-4">
                                        <Icon className="text-green-400" size={32} />
                                    </div>
                                    <h3 className="text-xl font-bold text-white mb-2">{value.title}</h3>
                                    <p className="text-gray-400 text-sm">{value.description}</p>
                                </div>
                            );
                        })}
                    </div>
                </div>

                {/* Mission & Vision */}
                <div className="grid md:grid-cols-2 gap-8 mb-16">
                    <div className="glass-panel p-8">
                        <h3 className="text-2xl font-bold text-white mb-4">Our Mission</h3>
                        <p className="text-gray-400 leading-relaxed">
                            To democratize access to financial services by providing fast, fair, and flexible solutions that empower individuals
                            and businesses to achieve their dreams. We strive to remove traditional banking barriers and create a seamless
                            financial experience for all.
                        </p>
                    </div>

                    <div className="glass-panel p-8">
                        <h3 className="text-2xl font-bold text-white mb-4">Our Vision</h3>
                        <p className="text-gray-400 leading-relaxed">
                            To become India&apos;s most trusted and innovative financial services platform, recognized for our customer-centric
                            approach, technological excellence, and unwavering commitment to financial inclusion. We envision a future where
                            every Indian has access to quality financial products.
                        </p>
                    </div>
                </div>

                {/* CTA */}
                <div className="glass-panel p-12 text-center">
                    <h2 className="text-3xl font-bold text-white mb-4">Join Our Journey</h2>
                    <p className="text-gray-400 mb-8 max-w-2xl mx-auto">
                        Be part of our growing community of satisfied customers. Let&apos;s build your financial future together.
                    </p>
                    <Link href="/contact" className="btn-primary inline-flex items-center gap-2">
                        Get Started Today
                    </Link>
                </div>
            </main>

            <Footer />
        </div>
    );
}

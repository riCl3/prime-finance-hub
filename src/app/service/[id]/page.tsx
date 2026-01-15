import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import InquiryForm from '@/components/InquiryForm';
import ServiceCard from '@/components/ServiceCard';
import dbConnect from '@/lib/db';
import Service from '@/models/Service';
import { Check, ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import { Service as ServiceType } from '@/components/home/Services';
import { notFound } from 'next/navigation';

async function getService(id: string) {
    await dbConnect();
    const service = await Service.findById(id).lean();
    if (!service) return null;

    return {
        ...service,
        _id: service._id.toString(),
        createdAt: service.createdAt?.toISOString(),
        updatedAt: service.updatedAt?.toISOString()
    };
}

async function getRelatedServices(category: string, currentId: string) {
    await dbConnect();
    const services = await Service.find({
        category,
        _id: { $ne: currentId }
    }).limit(3).lean();

    return services.map(s => ({
        ...s,
        _id: s._id.toString(),
        createdAt: s.createdAt?.toISOString(),
        updatedAt: s.updatedAt?.toISOString()
    }));
}

export default async function ServiceDetailPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    const service = await getService(id);

    if (!service) {
        notFound();
    }

    const relatedServices = await getRelatedServices(service.category, id);

    return (
        <div className="min-h-screen">
            <Navbar />

            <main className="container pt-32 px-4 pb-20">
                <Link href="/" className="inline-flex items-center gap-2 text-gray-400 hover:text-green-400 mb-8 transition-colors">
                    <ArrowLeft size={20} />
                    Back to Home
                </Link>

                <div className="grid lg:grid-cols-3 gap-10">
                    {/* Service Details - Left Column (2/3) */}
                    <div className="lg:col-span-2">
                        <div className="glass-panel p-8">
                            {/* Header */}
                            <div className="mb-6">
                                <span className="text-xs font-mono text-white/40 uppercase tracking-widest border border-white/10 px-3 py-1 rounded">
                                    {service.type}
                                </span>
                                {service.discountPercentage > 0 && (
                                    <span className="ml-2 bg-green-500 text-black text-xs font-bold px-3 py-1 rounded">
                                        {service.discountPercentage}% OFF
                                    </span>
                                )}
                            </div>

                            <h1 className="text-4xl font-bold text-white mb-4">{service.title}</h1>

                            {/* Pricing */}
                            <div className="flex items-end gap-3 mb-8 pb-6 border-b border-white/10">
                                <span className="text-4xl font-bold text-green-400">₹{service.discountedPrice.toLocaleString()}</span>
                                {service.discountPercentage > 0 && (
                                    <span className="text-xl text-gray-500 line-through mb-1">₹{service.actualPrice.toLocaleString()}</span>
                                )}
                            </div>

                            {/* Description */}
                            <div className="mb-8">
                                <h3 className="text-xl font-semibold text-white mb-3">About This Service</h3>
                                <p className="text-gray-400 leading-relaxed">{service.description}</p>
                            </div>

                            {/* Benefits */}
                            <div>
                                <h3 className="text-xl font-semibold text-white mb-4">Key Benefits</h3>
                                <div className="grid md:grid-cols-2 gap-3">
                                    {service.benefits?.map((benefit: string, idx: number) => (
                                        <div key={idx} className="flex items-start gap-3 p-4 bg-white/5 rounded-lg border border-white/5 hover:border-green-500/30 transition-colors">
                                            <Check size={20} className="text-green-400 shrink-0 mt-0.5" />
                                            <span className="text-gray-300">{benefit}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Additional Info */}
                            <div className="mt-8 p-6 bg-green-500/5 border border-green-500/20 rounded-lg">
                                <h4 className="font-semibold text-white mb-2">Why Choose This Plan?</h4>
                                <p className="text-gray-400 text-sm">
                                    This {service.category.toLowerCase()} plan is designed to provide maximum value with minimal hassle.
                                    Our team ensures quick processing and personalized support throughout your journey.
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Inquiry Form - Right Column (1/3) */}
                    <div className="lg:col-span-1">
                        <div className="sticky top-24">
                            <InquiryForm serviceId={service._id} serviceName={service.title} />
                        </div>
                    </div>
                </div>

                {/* Related Services */}
                {relatedServices.length > 0 && (
                    <section className="mt-20">
                        <h2 className="text-3xl font-bold text-white mb-8">Related Services</h2>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            {relatedServices.map((relatedService) => (
                                <Link key={relatedService._id} href={`/service/${relatedService._id}`} className="block">
                                    <ServiceCard service={relatedService as ServiceType} />
                                </Link>
                            ))}
                        </div>
                    </section>
                )}
            </main>

            <Footer />
        </div>
    );
}

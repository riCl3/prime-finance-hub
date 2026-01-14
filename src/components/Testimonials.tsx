import { Star, Quote } from 'lucide-react';

export default function Testimonials() {
    const testimonials = [
        {
            name: 'Rajesh Kumar',
            role: 'Business Owner',
            content: 'Prime Finance Hub helped me secure a business loan within 48 hours. The process was smooth and the rates were excellent!',
            rating: 5
        },
        {
            name: 'Priya Sharma',
            role: 'IT Professional',
            content: 'Their life insurance plans are comprehensive and affordable. The team was very helpful in choosing the right plan for my family.',
            rating: 5
        },
        {
            name: 'Amit Patel',
            role: 'Entrepreneur',
            content: 'Fast approval, minimal documentation, and great customer service. Highly recommend for anyone looking for quick financial solutions.',
            rating: 5
        }
    ];

    return (
        <section className="py-16 mb-20">
            <div className="text-center mb-12">
                <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                    What Our <span className="text-green-400">Clients Say</span>
                </h2>
                <p className="text-gray-400">Real experiences from real people</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {testimonials.map((testimonial, idx) => (
                    <div key={idx} className="glass-panel p-6 relative">
                        <Quote className="text-green-500/20 absolute top-4 right-4" size={48} />

                        <div className="flex gap-1 mb-4">
                            {[...Array(testimonial.rating)].map((_, i) => (
                                <Star key={i} size={16} className="fill-green-400 text-green-400" />
                            ))}
                        </div>

                        <p className="text-gray-300 mb-6 leading-relaxed italic">
                            "{testimonial.content}"
                        </p>

                        <div className="border-t border-white/10 pt-4">
                            <div className="font-semibold text-white">{testimonial.name}</div>
                            <div className="text-sm text-gray-500">{testimonial.role}</div>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
}

import ProductCard from './ProductCard';

interface Product {
    _id: string;
    title: string;
    category: 'Loans' | 'Life Insurance';
    description: string;
    benefits: string[];
    actualPrice: number;
    discountedPrice: number;
    discountPercentage: number;
}

interface ProductSectionProps {
    title: string;
    products: Product[];
    category: 'Loans' | 'Life Insurance';
    icon?: React.ReactNode;
}

export default function ProductSection({ title, products, category, icon }: ProductSectionProps) {
    if (products.length === 0) {
        return null; // Don't render section if no products
    }

    return (
        <section id={category.toLowerCase().replace(' ', '-')} className="py-20 px-6 relative">
            <div className="container mx-auto">
                {/* Section Header */}
                <div className="text-center mb-12">
                    <div className="flex items-center justify-center gap-3 mb-4">
                        {icon && <span className="text-4xl">{icon}</span>}
                        <h2 className="text-3xl md:text-4xl font-bold text-white">{title}</h2>
                    </div>
                    <p className="text-slate-400 max-w-2xl mx-auto">
                        {category === 'Loans'
                            ? 'Flexible loan solutions tailored to your financial needs with competitive rates and quick approval.'
                            : 'Comprehensive insurance coverage to protect you and your loved ones with peace of mind.'}
                    </p>
                </div>

                {/* Products Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {products.map((product) => (
                        <ProductCard
                            key={product._id}
                            title={product.title}
                            description={product.description}
                            benefits={product.benefits}
                            actualPrice={product.actualPrice}
                            discountedPrice={product.discountedPrice}
                            discountPercentage={product.discountPercentage}
                            category={category}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
}

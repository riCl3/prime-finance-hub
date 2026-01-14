import Link from "next/link";
import { ChevronRight } from "lucide-react";
import ProductSection from "@/components/ProductSection";
import dbConnect from "@/lib/db";
import Service from "@/models/Service";

import Hero from "@/components/home/Hero";
import FeaturedPostSection from "@/components/home/FeaturedPostSection";
import Footer from "@/components/Footer";
import fs from 'fs';
import path from 'path';

// Force dynamic rendering
export const dynamic = 'force-dynamic';

async function getContent() {
  const dataFilePath = path.join(process.cwd(), 'public/data/content.json');
  if (fs.existsSync(dataFilePath)) {
    const fileContents = fs.readFileSync(dataFilePath, 'utf8');
    return JSON.parse(fileContents);
  }
  return null;
}

async function getProducts() {
  await dbConnect();
  const products = await Service.find({}).sort({ createdAt: -1 }).lean();
  return products.map(p => ({
    ...p,
    _id: p._id.toString(),
    createdAt: p.createdAt?.toISOString(),
    updatedAt: p.updatedAt?.toISOString()
  }));
}

export default async function Home() {
  const allProducts = await getProducts();
  const content = await getContent();

  // Filter products by category
  const loanProducts = allProducts.filter(p => p.category === 'Loans');
  const insuranceProducts = allProducts.filter(p => p.category === 'Life Insurance');

  return (
    <div className="min-h-screen flex flex-col relative overflow-hidden bg-[#0B1120] text-slate-300 selection:bg-emerald-500/30">

      {/* Background Gradients */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-emerald-500/10 rounded-full blur-[100px]" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[500px] h-[500px] bg-cyan-500/10 rounded-full blur-[100px]" />
      </div>

      {/* Navbar */}
      <nav className="sticky top-0 z-50 glass-nav transition-all duration-300">
        <div className="container mx-auto px-6 h-20 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-emerald-500 to-cyan-500 flex items-center justify-center">
              <span className="text-white font-bold text-lg">P</span>
            </div>
            <span className="text-xl font-bold text-white tracking-tight">Prime Finance Hub</span>
          </div>

          <div className="hidden md:flex items-center gap-8">
            <Link href="#loans" className="hover:text-white transition-colors text-sm font-medium">Loans</Link>
            <Link href="#life-insurance" className="hover:text-white transition-colors text-sm font-medium">Insurance</Link>
            <Link href="/contact" className="hover:text-white transition-colors text-sm font-medium">Contact</Link>
          </div>

          <div className="flex items-center gap-4">
            <Link href="/admin" className="hidden md:block hover:text-white transition-colors text-sm font-medium">Admin</Link>
            <Link href="/contact" className="btn-gradient px-5 py-2.5 rounded-full text-sm font-medium shadow-lg shadow-emerald-500/20 hover:shadow-emerald-500/30 hover:-translate-y-0.5 transition-all">
              Get Started
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <main className="flex-grow flex flex-col z-10">
        <Hero content={content} />

        <FeaturedPostSection post={content?.featuredPost} />

        {/* Dynamic Loans Section */}
        <ProductSection
          title="Loan Solutions"
          products={loanProducts}
          category="Loans"
          icon="💰"
        />

        {/* Dynamic Life Insurance Section */}
        <ProductSection
          title="Insurance Plans"
          products={insuranceProducts}
          category="Life Insurance"
          icon="🛡️"
        />

        {/* Stats Section */}
        <section className="py-20 border-t border-white/5 bg-white/[0.02]">
          <div className="container mx-auto px-6">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
              <div>
                <div className="text-4xl font-bold text-white mb-2">$500M+</div>
                <div className="text-sm text-slate-400 uppercase tracking-wider">Processed</div>
              </div>
              <div>
                <div className="text-4xl font-bold text-white mb-2">50k+</div>
                <div className="text-sm text-slate-400 uppercase tracking-wider">Happy Users</div>
              </div>
              <div>
                <div className="text-4xl font-bold text-white mb-2">99.9%</div>
                <div className="text-sm text-slate-400 uppercase tracking-wider">Uptime</div>
              </div>
              <div>
                <div className="text-4xl font-bold text-white mb-2">24/7</div>
                <div className="text-sm text-slate-400 uppercase tracking-wider">Support</div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}

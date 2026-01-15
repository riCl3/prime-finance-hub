import Link from "next/link";

import dbConnect from "@/lib/db";
import Service from "@/models/Service";

import Hero from "@/components/home/Hero";
import FeaturedPostSection from "@/components/home/FeaturedPostSection";
import Services from "@/components/home/Services";
import Stats from "@/components/Stats";
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
  try {
    await dbConnect();
    const products = await Service.find({}).sort({ createdAt: -1 }).lean();
    return products.map(p => ({
      ...p,
      _id: p._id.toString(),
      createdAt: p.createdAt?.toISOString(),
      updatedAt: p.updatedAt?.toISOString()
    }));
  } catch {
    console.error('Failed to fetch products (DB Connection Error)');
    return [];
  }
}

export default async function Home() {
  const allProducts = await getProducts();
  const content = await getContent();

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

        {/* Services Section (Loans & Insurance) */}
        <div id="services">
          <Services services={allProducts} />
        </div>

        {/* Stats Section */}
        <Stats />
      </main>

      {/* Footer */}
      <footer className="py-12 border-t border-white/10 bg-[#0B1120] relative z-10">
        <div className="container mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded bg-gradient-to-br from-emerald-500 to-cyan-500 flex items-center justify-center">
              <span className="text-white font-bold text-xs">P</span>
            </div>
            <span className="text-lg font-bold text-white">Prime Finance Hub</span>
          </div>
          <div className="text-slate-500 text-sm">
            &copy; {new Date().getFullYear()} Prime Finance Hub. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
}

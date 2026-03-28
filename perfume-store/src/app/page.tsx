import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Sparkles, Truck, RotateCcw, Shield } from "lucide-react";
import { products } from "@/data/products";
import ProductCard from "@/components/ProductCard";

const featuredProducts = products.filter((p) => p.featured);

const categories = [
  {
    title: "For Her",
    href: "/products?category=women",
    image:
      "https://images.unsplash.com/photo-1541643600914-78b084683702?w=800&q=80",
    count: products.filter((p) => p.category === "women").length,
  },
  {
    title: "For Him",
    href: "/products?category=men",
    image:
      "https://images.unsplash.com/photo-1585386959984-a4155224a1ad?w=800&q=80",
    count: products.filter((p) => p.category === "men").length,
  },
  {
    title: "Unisex",
    href: "/products?category=unisex",
    image:
      "https://images.unsplash.com/photo-1523293182086-7651a899d37f?w=800&q=80",
    count: products.filter((p) => p.category === "unisex").length,
  },
];

const perks = [
  { icon: Truck, label: "Free Shipping", desc: "On orders over €150" },
  { icon: RotateCcw, label: "30-Day Returns", desc: "Hassle-free returns" },
  { icon: Shield, label: "Authentic Only", desc: "100% genuine products" },
  { icon: Sparkles, label: "Expert Curation", desc: "Hand-selected fragrances" },
];

export default function HomePage() {
  return (
    <>
      {/* Hero */}
      <section className="relative h-[85vh] min-h-[560px] flex items-center overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="https://images.unsplash.com/photo-1594035910387-fea47794261f?w=1600&q=85"
            alt="Luxury perfume"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-r from-stone-900/80 via-stone-900/50 to-transparent" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-xl">
            <p className="text-xs tracking-[0.4em] uppercase text-stone-300 mb-4 font-medium">
              New Collection 2026
            </p>
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-light text-white leading-tight tracking-tight">
              The Art of
              <br />
              <em className="not-italic font-semibold">Fragrance</em>
            </h1>
            <p className="mt-6 text-stone-300 text-lg font-light leading-relaxed max-w-sm">
              Discover our curated collection of luxury perfumes from the world&apos;s most
              prestigious maisons.
            </p>
            <div className="flex flex-wrap gap-4 mt-10">
              <Link
                href="/products"
                className="inline-flex items-center gap-2 bg-white text-stone-900 text-sm font-medium tracking-[0.1em] uppercase px-8 py-4 hover:bg-stone-100 transition-colors"
              >
                Shop Now
                <ArrowRight size={16} />
              </Link>
              <Link
                href="/products?badge=new"
                className="inline-flex items-center gap-2 border border-white/40 text-white text-sm font-medium tracking-[0.1em] uppercase px-8 py-4 hover:border-white hover:bg-white/10 transition-colors"
              >
                New Arrivals
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Perks Bar */}
      <section className="bg-stone-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="grid grid-cols-2 sm:grid-cols-4 divide-x divide-stone-700">
            {perks.map(({ icon: Icon, label, desc }) => (
              <div
                key={label}
                className="flex items-center gap-3 px-6 py-3 first:pl-0 last:pr-0"
              >
                <Icon size={18} className="text-stone-400 flex-shrink-0" />
                <div>
                  <p className="text-xs font-semibold tracking-wider uppercase">{label}</p>
                  <p className="text-[11px] text-stone-400 mt-0.5">{desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="flex items-end justify-between mb-10">
          <div>
            <p className="text-xs tracking-[0.3em] uppercase text-stone-400 mb-2">
              Hand-Selected
            </p>
            <h2 className="text-3xl font-light text-stone-900 tracking-tight">
              Featured Fragrances
            </h2>
          </div>
          <Link
            href="/products"
            className="hidden sm:flex items-center gap-2 text-sm text-stone-500 hover:text-stone-900 transition-colors"
          >
            View All
            <ArrowRight size={14} />
          </Link>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          {featuredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        <div className="mt-8 sm:hidden text-center">
          <Link
            href="/products"
            className="inline-flex items-center gap-2 text-sm text-stone-500 hover:text-stone-900 transition-colors"
          >
            View All Fragrances
            <ArrowRight size={14} />
          </Link>
        </div>
      </section>

      {/* Categories */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
        <div className="text-center mb-10">
          <p className="text-xs tracking-[0.3em] uppercase text-stone-400 mb-2">Explore</p>
          <h2 className="text-3xl font-light text-stone-900 tracking-tight">Shop by Category</h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {categories.map((cat) => (
            <Link
              key={cat.title}
              href={cat.href}
              className="group relative overflow-hidden rounded-lg aspect-[4/3]"
            >
              <Image
                src={cat.image}
                alt={cat.title}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-stone-900/70 to-stone-900/20 group-hover:from-stone-900/80 transition-colors" />
              <div className="absolute inset-0 flex flex-col items-center justify-end pb-8 text-white">
                <h3 className="text-xl font-light tracking-[0.1em]">{cat.title}</h3>
                <p className="text-sm text-stone-300 mt-1">{cat.count} fragrances</p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Banner */}
      <section className="bg-stone-50 border-y border-stone-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
          <p className="text-xs tracking-[0.4em] uppercase text-stone-400 mb-3">
            Signature Experience
          </p>
          <h2 className="text-3xl sm:text-4xl font-light text-stone-900 tracking-tight max-w-xl mx-auto">
            Every scent tells a story.{" "}
            <span className="italic">What&apos;s yours?</span>
          </h2>
          <p className="mt-4 text-stone-500 max-w-md mx-auto text-sm leading-relaxed">
            Our expert perfumers have curated a collection that spans continents and cultures,
            bringing you only the most exceptional fragrances in the world.
          </p>
          <Link
            href="/products"
            className="inline-flex items-center gap-2 mt-8 bg-stone-900 text-white text-sm font-medium tracking-[0.1em] uppercase px-8 py-4 hover:bg-stone-800 transition-colors"
          >
            Explore Collection
            <ArrowRight size={16} />
          </Link>
        </div>
      </section>
    </>
  );
}

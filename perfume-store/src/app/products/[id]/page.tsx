"use client";

import { useParams, notFound } from "next/navigation";
import { products } from "@/data/products";
import Image from "next/image";
import { useState } from "react";
import { ShoppingBag, Star, ChevronLeft, Plus, Minus } from "lucide-react";
import { useCartStore } from "@/store/cartStore";
import Link from "next/link";
import ProductCard from "@/components/ProductCard";

export default function ProductDetailPage() {
  const params = useParams();
  const product = products.find((p) => p.id === params.id);

  const { addItem, openCart } = useCartStore();

  const [selectedSize, setSelectedSize] = useState(
    product ? product.sizes[1] ?? product.sizes[0] : null
  );
  const [quantity, setQuantity] = useState(1);
  const [activeImage, setActiveImage] = useState(0);
  const [addedToCart, setAddedToCart] = useState(false);

  if (!product || !selectedSize) {
    notFound();
  }

  const related = products
    .filter((p) => p.id !== product.id && p.category === product.category)
    .slice(0, 4);

  const handleAddToCart = () => {
    for (let i = 0; i < quantity; i++) {
      addItem(product, selectedSize);
    }
    setAddedToCart(true);
    setTimeout(() => setAddedToCart(false), 2000);
    openCart();
  };

  const badgeStyles: Record<string, string> = {
    new: "bg-emerald-50 text-emerald-700 border-emerald-200",
    bestseller: "bg-amber-50 text-amber-700 border-amber-200",
    sale: "bg-red-50 text-red-600 border-red-200",
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 mb-8 text-sm text-stone-400">
        <Link href="/" className="hover:text-stone-900 transition-colors">Home</Link>
        <span>/</span>
        <Link href="/products" className="hover:text-stone-900 transition-colors">Fragrances</Link>
        <span>/</span>
        <span className="text-stone-900">{product.name}</span>
      </nav>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
        {/* Images */}
        <div className="space-y-4">
          <div className="relative aspect-square rounded-lg overflow-hidden bg-stone-50">
            <Image
              src={product.images[activeImage]}
              alt={product.name}
              fill
              className="object-cover"
              priority
            />
            {product.badge && (
              <span
                className={`absolute top-4 left-4 text-[10px] font-semibold tracking-[0.15em] uppercase px-2 py-1 rounded border ${badgeStyles[product.badge]}`}
              >
                {product.badge}
              </span>
            )}
          </div>
          {product.images.length > 1 && (
            <div className="flex gap-3">
              {product.images.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveImage(idx)}
                  className={`relative w-20 h-20 rounded overflow-hidden flex-shrink-0 border-2 transition-colors ${
                    activeImage === idx ? "border-stone-900" : "border-transparent"
                  }`}
                >
                  <Image src={img} alt={`${product.name} ${idx + 1}`} fill className="object-cover" />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Details */}
        <div>
          <p className="text-xs tracking-[0.3em] uppercase text-stone-400 mb-1">
            {product.brand}
          </p>
          <h1 className="text-4xl font-light text-stone-900 tracking-tight">{product.name}</h1>

          <div className="flex items-center gap-2 mt-3">
            <div className="flex items-center gap-0.5">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star
                  key={i}
                  size={14}
                  className={
                    i < Math.floor(product.rating)
                      ? "fill-amber-400 text-amber-400"
                      : "text-stone-200"
                  }
                />
              ))}
            </div>
            <span className="text-sm text-stone-500">
              {product.rating} ({product.reviews} reviews)
            </span>
          </div>

          <p className="mt-5 text-stone-600 leading-relaxed">{product.longDescription}</p>

          {/* Price */}
          <div className="flex items-center gap-3 mt-6">
            <span className="text-3xl font-light text-stone-900">€{selectedSize.price}</span>
            {product.originalPrice && (
              <span className="text-lg text-stone-400 line-through">€{product.originalPrice}</span>
            )}
          </div>

          {/* Size Selector */}
          <div className="mt-6">
            <p className="text-xs font-semibold tracking-[0.2em] uppercase text-stone-900 mb-3">
              Size
            </p>
            <div className="flex gap-3">
              {product.sizes.map((size) => (
                <button
                  key={size.ml}
                  onClick={() => setSelectedSize(size)}
                  className={`px-4 py-2.5 text-sm border transition-colors rounded-sm ${
                    selectedSize.ml === size.ml
                      ? "border-stone-900 bg-stone-900 text-white"
                      : "border-stone-200 text-stone-700 hover:border-stone-400"
                  }`}
                >
                  {size.ml} ml
                  <span className="block text-xs mt-0.5 opacity-70">€{size.price}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Quantity */}
          <div className="mt-6">
            <p className="text-xs font-semibold tracking-[0.2em] uppercase text-stone-900 mb-3">
              Quantity
            </p>
            <div className="flex items-center gap-3 border border-stone-200 rounded-sm w-fit">
              <button
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                className="p-3 text-stone-500 hover:text-stone-900 transition-colors"
              >
                <Minus size={16} />
              </button>
              <span className="text-sm font-medium w-8 text-center">{quantity}</span>
              <button
                onClick={() => setQuantity(quantity + 1)}
                className="p-3 text-stone-500 hover:text-stone-900 transition-colors"
              >
                <Plus size={16} />
              </button>
            </div>
          </div>

          {/* Add to Cart */}
          <button
            onClick={handleAddToCart}
            className={`mt-6 w-full flex items-center justify-center gap-3 py-4 text-sm font-medium tracking-[0.1em] uppercase transition-all ${
              addedToCart
                ? "bg-emerald-600 text-white"
                : "bg-stone-900 text-white hover:bg-stone-800"
            }`}
          >
            <ShoppingBag size={16} />
            {addedToCart ? "Added to Cart!" : "Add to Cart"}
          </button>

          <Link
            href="/checkout"
            onClick={() => {
              for (let i = 0; i < quantity; i++) {
                addItem(product, selectedSize);
              }
            }}
            className="mt-3 w-full flex items-center justify-center gap-3 py-4 text-sm font-medium tracking-[0.1em] uppercase border border-stone-200 text-stone-700 hover:border-stone-400 hover:text-stone-900 transition-colors"
          >
            Buy Now
          </Link>

          {/* Notes */}
          <div className="mt-10 pt-8 border-t border-stone-100">
            <h2 className="text-xs font-semibold tracking-[0.2em] uppercase text-stone-900 mb-5">
              Fragrance Notes
            </h2>
            <div className="grid grid-cols-3 gap-4">
              {(["top", "heart", "base"] as const).map((note) => (
                <div key={note}>
                  <p className="text-xs text-stone-400 uppercase tracking-wider mb-2 capitalize">
                    {note}
                  </p>
                  <ul className="space-y-1">
                    {product.notes[note].map((n) => (
                      <li key={n} className="text-sm text-stone-700">
                        {n}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Related Products */}
      {related.length > 0 && (
        <section className="mt-20">
          <div className="flex items-end justify-between mb-8">
            <h2 className="text-2xl font-light text-stone-900 tracking-tight">
              You May Also Like
            </h2>
            <Link
              href="/products"
              className="flex items-center gap-1 text-sm text-stone-500 hover:text-stone-900 transition-colors"
            >
              <ChevronLeft size={14} />
              Back to All
            </Link>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-6">
            {related.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}

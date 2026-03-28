"use client";

import { Product } from "@/types";
import Image from "next/image";
import Link from "next/link";
import { ShoppingBag, Star } from "lucide-react";
import { useCartStore } from "@/store/cartStore";

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const { addItem, openCart } = useCartStore();

  const handleQuickAdd = (e: React.MouseEvent) => {
    e.preventDefault();
    const defaultSize = product.sizes[1] ?? product.sizes[0];
    addItem(product, defaultSize);
    openCart();
  };

  const badgeStyles: Record<string, string> = {
    new: "bg-emerald-50 text-emerald-700 border-emerald-200",
    bestseller: "bg-amber-50 text-amber-700 border-amber-200",
    sale: "bg-red-50 text-red-600 border-red-200",
  };

  return (
    <Link href={`/products/${product.id}`} className="group block">
      <div className="relative overflow-hidden rounded-lg bg-stone-50 aspect-[3/4]">
        <Image
          src={product.images[0]}
          alt={product.name}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />

        {product.badge && (
          <span
            className={`absolute top-3 left-3 text-[10px] font-semibold tracking-[0.15em] uppercase px-2 py-1 rounded border ${badgeStyles[product.badge]}`}
          >
            {product.badge}
          </span>
        )}

        {product.originalPrice && (
          <span className="absolute top-3 right-3 text-[10px] font-semibold bg-red-600 text-white px-2 py-1 rounded">
            -{Math.round((1 - product.price / product.originalPrice) * 100)}%
          </span>
        )}

        {/* Quick add overlay */}
        <div className="absolute inset-x-0 bottom-0 p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
          <button
            onClick={handleQuickAdd}
            className="w-full bg-white/95 backdrop-blur text-stone-900 text-xs font-medium tracking-[0.15em] uppercase py-3 flex items-center justify-center gap-2 hover:bg-stone-900 hover:text-white transition-colors rounded-sm"
          >
            <ShoppingBag size={14} />
            Quick Add
          </button>
        </div>
      </div>

      <div className="mt-3 px-1">
        <p className="text-[11px] tracking-[0.2em] text-stone-400 uppercase">{product.brand}</p>
        <h3 className="text-sm font-medium text-stone-900 mt-0.5">{product.name}</h3>

        <div className="flex items-center gap-1 mt-1">
          <Star size={11} className="fill-amber-400 text-amber-400" />
          <span className="text-xs text-stone-500">
            {product.rating} ({product.reviews})
          </span>
        </div>

        <div className="flex items-center gap-2 mt-2">
          <span className="text-sm font-semibold text-stone-900">€{product.price}</span>
          {product.originalPrice && (
            <span className="text-xs text-stone-400 line-through">€{product.originalPrice}</span>
          )}
        </div>
      </div>
    </Link>
  );
}

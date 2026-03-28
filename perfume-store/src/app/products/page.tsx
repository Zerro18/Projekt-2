"use client";

import { useSearchParams } from "next/navigation";
import { products, brands, categories } from "@/data/products";
import ProductCard from "@/components/ProductCard";
import { useState, useMemo, Suspense } from "react";
import { SlidersHorizontal, X } from "lucide-react";

function ProductsContent() {
  const searchParams = useSearchParams();
  const initialCategory = searchParams.get("category") ?? "all";
  const initialBadge = searchParams.get("badge") ?? "";

  const [selectedCategory, setSelectedCategory] = useState(initialCategory);
  const [selectedBrand, setSelectedBrand] = useState("All");
  const [sortBy, setSortBy] = useState("featured");
  const [showFilters, setShowFilters] = useState(false);

  const filtered = useMemo(() => {
    let result = [...products];

    if (selectedCategory !== "all" && selectedCategory !== "All") {
      result = result.filter((p) => p.category === selectedCategory.toLowerCase());
    }

    if (selectedBrand !== "All") {
      result = result.filter((p) => p.brand === selectedBrand);
    }

    if (initialBadge) {
      result = result.filter((p) => p.badge === initialBadge);
    }

    switch (sortBy) {
      case "price-asc":
        result.sort((a, b) => a.price - b.price);
        break;
      case "price-desc":
        result.sort((a, b) => b.price - a.price);
        break;
      case "rating":
        result.sort((a, b) => b.rating - a.rating);
        break;
      case "featured":
      default:
        result.sort((a, b) => (b.featured ? 1 : 0) - (a.featured ? 1 : 0));
    }

    return result;
  }, [selectedCategory, selectedBrand, sortBy, initialBadge]);

  const activeFiltersCount = [
    selectedCategory !== "all" && selectedCategory !== "All",
    selectedBrand !== "All",
  ].filter(Boolean).length;

  const resetFilters = () => {
    setSelectedCategory("all");
    setSelectedBrand("All");
    setSortBy("featured");
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      {/* Page Header */}
      <div className="mb-8">
        <p className="text-xs tracking-[0.3em] uppercase text-stone-400 mb-1">Our Collection</p>
        <h1 className="text-3xl font-light text-stone-900 tracking-tight">All Fragrances</h1>
        <p className="text-sm text-stone-500 mt-1">{filtered.length} products</p>
      </div>

      {/* Mobile filter toggle */}
      <div className="flex items-center justify-between mb-6 sm:hidden">
        <button
          onClick={() => setShowFilters(!showFilters)}
          className="flex items-center gap-2 text-sm text-stone-700 border border-stone-200 px-4 py-2 rounded-sm"
        >
          <SlidersHorizontal size={14} />
          Filters
          {activeFiltersCount > 0 && (
            <span className="bg-stone-900 text-white text-[10px] rounded-full w-4 h-4 flex items-center justify-center">
              {activeFiltersCount}
            </span>
          )}
        </button>
        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
          className="text-sm border border-stone-200 px-3 py-2 rounded-sm text-stone-700 bg-white"
        >
          <option value="featured">Featured</option>
          <option value="price-asc">Price: Low to High</option>
          <option value="price-desc">Price: High to Low</option>
          <option value="rating">Top Rated</option>
        </select>
      </div>

      <div className="flex gap-8">
        {/* Sidebar Filters */}
        <aside
          className={`w-56 flex-shrink-0 hidden sm:block ${showFilters ? "block" : ""}`}
        >
          <div className="sticky top-24 space-y-8">
            <div>
              <h3 className="text-xs font-semibold tracking-[0.2em] uppercase text-stone-900 mb-3">
                Sort By
              </h3>
              <div className="space-y-2">
                {[
                  { value: "featured", label: "Featured" },
                  { value: "price-asc", label: "Price: Low to High" },
                  { value: "price-desc", label: "Price: High to Low" },
                  { value: "rating", label: "Top Rated" },
                ].map((option) => (
                  <button
                    key={option.value}
                    onClick={() => setSortBy(option.value)}
                    className={`block w-full text-left text-sm py-1 transition-colors ${
                      sortBy === option.value
                        ? "text-stone-900 font-medium"
                        : "text-stone-500 hover:text-stone-900"
                    }`}
                  >
                    {option.label}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <h3 className="text-xs font-semibold tracking-[0.2em] uppercase text-stone-900 mb-3">
                Category
              </h3>
              <div className="space-y-2">
                {categories.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setSelectedCategory(cat.toLowerCase())}
                    className={`block w-full text-left text-sm py-1 transition-colors ${
                      selectedCategory === cat.toLowerCase()
                        ? "text-stone-900 font-medium"
                        : "text-stone-500 hover:text-stone-900"
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <h3 className="text-xs font-semibold tracking-[0.2em] uppercase text-stone-900 mb-3">
                Brand
              </h3>
              <div className="space-y-2">
                {brands.map((brand) => (
                  <button
                    key={brand}
                    onClick={() => setSelectedBrand(brand)}
                    className={`block w-full text-left text-sm py-1 transition-colors ${
                      selectedBrand === brand
                        ? "text-stone-900 font-medium"
                        : "text-stone-500 hover:text-stone-900"
                    }`}
                  >
                    {brand}
                  </button>
                ))}
              </div>
            </div>

            {activeFiltersCount > 0 && (
              <button
                onClick={resetFilters}
                className="flex items-center gap-1 text-xs text-stone-500 hover:text-stone-900 transition-colors"
              >
                <X size={12} />
                Clear Filters
              </button>
            )}
          </div>
        </aside>

        {/* Product Grid */}
        <div className="flex-1">
          {/* Desktop sort */}
          <div className="hidden sm:flex justify-end mb-6">
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="text-sm border border-stone-200 px-3 py-2 rounded-sm text-stone-700 bg-white"
            >
              <option value="featured">Featured</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
              <option value="rating">Top Rated</option>
            </select>
          </div>

          {filtered.length === 0 ? (
            <div className="text-center py-20">
              <p className="text-stone-400 mb-3">No fragrances match your filters.</p>
              <button
                onClick={resetFilters}
                className="text-sm underline text-stone-600 hover:text-stone-900"
              >
                Clear all filters
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filtered.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default function ProductsPage() {
  return (
    <Suspense fallback={<div className="flex items-center justify-center py-20 text-stone-400">Loading...</div>}>
      <ProductsContent />
    </Suspense>
  );
}

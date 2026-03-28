import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-stone-900 text-stone-300 mt-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          {/* Brand */}
          <div className="md:col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <span className="text-xl font-light tracking-[0.2em] text-white uppercase">
                Parfum
              </span>
              <span className="w-px h-5 bg-stone-600" />
              <span className="text-xs tracking-[0.3em] text-stone-400 uppercase font-medium">
                Élite
              </span>
            </div>
            <p className="text-sm leading-relaxed text-stone-400 max-w-xs">
              Curating the world&apos;s most exceptional fragrances. Each bottle tells a story,
              each scent creates a memory.
            </p>
          </div>

          {/* Navigation */}
          <div>
            <h3 className="text-xs tracking-[0.2em] uppercase text-white font-medium mb-4">
              Collections
            </h3>
            <ul className="space-y-2">
              {[
                { href: "/products", label: "All Fragrances" },
                { href: "/products?category=women", label: "Women" },
                { href: "/products?category=men", label: "Men" },
                { href: "/products?category=unisex", label: "Unisex" },
              ].map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-stone-400 hover:text-white transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Info */}
          <div>
            <h3 className="text-xs tracking-[0.2em] uppercase text-white font-medium mb-4">
              Information
            </h3>
            <ul className="space-y-2">
              {["About Us", "Shipping", "Returns", "Privacy Policy", "Contact"].map((item) => (
                <li key={item}>
                  <span className="text-sm text-stone-400 hover:text-white transition-colors cursor-pointer">
                    {item}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="border-t border-stone-800 mt-12 pt-8 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-xs text-stone-500">
            © 2026 Parfum Élite. All rights reserved.
          </p>
          <p className="text-xs text-stone-500 tracking-wider uppercase">
            Free shipping on orders over €150
          </p>
        </div>
      </div>
    </footer>
  );
}

"use client";

import { X, Plus, Minus, ShoppingBag } from "lucide-react";
import { useCartStore } from "@/store/cartStore";
import Image from "next/image";
import Link from "next/link";

export default function CartSidebar() {
  const { items, isOpen, closeCart, removeItem, updateQuantity, total, itemCount } =
    useCartStore();

  const count = itemCount();
  const cartTotal = total();

  return (
    <>
      {/* Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/40 z-40 backdrop-blur-sm"
          onClick={closeCart}
        />
      )}

      {/* Sidebar */}
      <div
        className={`fixed top-0 right-0 h-full w-full sm:w-[420px] bg-white z-50 shadow-2xl transform transition-transform duration-300 ease-in-out flex flex-col ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-stone-100">
          <div className="flex items-center gap-3">
            <ShoppingBag size={20} className="text-stone-700" />
            <span className="font-medium tracking-wider text-stone-900 uppercase text-sm">
              Your Cart
            </span>
            {count > 0 && (
              <span className="bg-stone-900 text-white text-xs font-medium px-2 py-0.5 rounded-full">
                {count}
              </span>
            )}
          </div>
          <button
            onClick={closeCart}
            className="p-2 text-stone-400 hover:text-stone-900 transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        {/* Items */}
        <div className="flex-1 overflow-y-auto px-6 py-4">
          {items.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-center gap-4">
              <ShoppingBag size={48} className="text-stone-200" />
              <p className="text-stone-400 text-sm">Your cart is empty</p>
              <button
                onClick={closeCart}
                className="text-sm underline text-stone-600 hover:text-stone-900"
              >
                Continue Shopping
              </button>
            </div>
          ) : (
            <ul className="space-y-6">
              {items.map((item) => (
                <li
                  key={`${item.product.id}-${item.selectedSize.ml}`}
                  className="flex gap-4"
                >
                  <div className="relative w-20 h-20 rounded-lg overflow-hidden bg-stone-50 flex-shrink-0">
                    <Image
                      src={item.product.images[0]}
                      alt={item.product.name}
                      fill
                      className="object-cover"
                    />
                  </div>

                  <div className="flex-1 min-w-0">
                    <p className="text-xs text-stone-400 uppercase tracking-wider">
                      {item.product.brand}
                    </p>
                    <p className="text-sm font-medium text-stone-900 mt-0.5">
                      {item.product.name}
                    </p>
                    <p className="text-xs text-stone-500 mt-0.5">{item.selectedSize.ml} ml</p>

                    <div className="flex items-center justify-between mt-3">
                      <div className="flex items-center gap-2 border border-stone-200 rounded-full px-2 py-1">
                        <button
                          onClick={() =>
                            updateQuantity(
                              item.product.id,
                              item.selectedSize.ml,
                              item.quantity - 1
                            )
                          }
                          className="text-stone-500 hover:text-stone-900 transition-colors"
                        >
                          <Minus size={12} />
                        </button>
                        <span className="text-xs font-medium w-4 text-center">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() =>
                            updateQuantity(
                              item.product.id,
                              item.selectedSize.ml,
                              item.quantity + 1
                            )
                          }
                          className="text-stone-500 hover:text-stone-900 transition-colors"
                        >
                          <Plus size={12} />
                        </button>
                      </div>
                      <span className="text-sm font-medium text-stone-900">
                        €{(item.selectedSize.price * item.quantity).toFixed(2)}
                      </span>
                    </div>
                  </div>

                  <button
                    onClick={() => removeItem(item.product.id, item.selectedSize.ml)}
                    className="self-start p-1 text-stone-300 hover:text-stone-600 transition-colors"
                  >
                    <X size={16} />
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Footer */}
        {items.length > 0 && (
          <div className="border-t border-stone-100 px-6 py-6 space-y-4">
            <div className="flex justify-between text-sm">
              <span className="text-stone-500">Subtotal</span>
              <span className="font-medium text-stone-900">€{cartTotal.toFixed(2)}</span>
            </div>
            {cartTotal < 150 && (
              <p className="text-xs text-stone-400 text-center">
                Add €{(150 - cartTotal).toFixed(2)} more for free shipping
              </p>
            )}
            {cartTotal >= 150 && (
              <p className="text-xs text-emerald-600 text-center font-medium">
                ✓ You qualify for free shipping
              </p>
            )}
            <Link
              href="/checkout"
              onClick={closeCart}
              className="block w-full bg-stone-900 text-white text-sm font-medium tracking-wider uppercase py-4 text-center hover:bg-stone-800 transition-colors rounded-sm"
            >
              Checkout — €{cartTotal.toFixed(2)}
            </Link>
            <button
              onClick={closeCart}
              className="block w-full text-center text-sm text-stone-500 hover:text-stone-900 transition-colors"
            >
              Continue Shopping
            </button>
          </div>
        )}
      </div>
    </>
  );
}

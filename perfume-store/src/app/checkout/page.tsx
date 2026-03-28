"use client";

import { useCartStore } from "@/store/cartStore";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { ArrowLeft, CheckCircle, Lock } from "lucide-react";

type Step = "shipping" | "payment" | "confirmation";

export default function CheckoutPage() {
  const { items, total, clearCart } = useCartStore();
  const [step, setStep] = useState<Step>("shipping");
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    postalCode: "",
    country: "Germany",
    cardNumber: "",
    cardName: "",
    expiry: "",
    cvv: "",
  });

  const cartTotal = total();
  const shipping = cartTotal >= 150 ? 0 : 9.9;
  const orderTotal = cartTotal + shipping;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmitShipping = (e: React.FormEvent) => {
    e.preventDefault();
    setStep("payment");
  };

  const handleSubmitPayment = (e: React.FormEvent) => {
    e.preventDefault();
    setStep("confirmation");
    clearCart();
  };

  if (items.length === 0 && step !== "confirmation") {
    return (
      <div className="max-w-2xl mx-auto px-4 py-20 text-center">
        <p className="text-stone-400 mb-4">Your cart is empty.</p>
        <Link
          href="/products"
          className="inline-flex items-center gap-2 text-sm font-medium text-stone-900 underline"
        >
          <ArrowLeft size={14} />
          Continue Shopping
        </Link>
      </div>
    );
  }

  if (step === "confirmation") {
    return (
      <div className="max-w-2xl mx-auto px-4 py-20 text-center">
        <div className="flex flex-col items-center gap-6">
          <CheckCircle size={64} className="text-emerald-500" />
          <div>
            <h1 className="text-3xl font-light text-stone-900 tracking-tight">
              Order Confirmed!
            </h1>
            <p className="text-stone-500 mt-2">
              Thank you, {form.firstName}. Your order has been placed successfully.
            </p>
          </div>
          <div className="bg-stone-50 rounded-lg p-6 w-full text-left">
            <p className="text-xs tracking-[0.2em] uppercase text-stone-400 mb-2">
              Order Details
            </p>
            <p className="text-sm text-stone-600">
              A confirmation email has been sent to <strong>{form.email}</strong>
            </p>
            <p className="text-sm text-stone-600 mt-1">
              Estimated delivery: <strong>3–5 business days</strong>
            </p>
          </div>
          <Link
            href="/"
            className="bg-stone-900 text-white text-sm font-medium tracking-[0.1em] uppercase px-8 py-4 hover:bg-stone-800 transition-colors"
          >
            Back to Home
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <Link
        href="/products"
        className="flex items-center gap-2 text-sm text-stone-500 hover:text-stone-900 transition-colors mb-8"
      >
        <ArrowLeft size={14} />
        Continue Shopping
      </Link>

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-12">
        {/* Form */}
        <div className="lg:col-span-3">
          {/* Steps */}
          <div className="flex items-center gap-4 mb-8">
            {(["shipping", "payment"] as Step[]).map((s, idx) => (
              <div key={s} className="flex items-center gap-2">
                <div
                  className={`w-6 h-6 rounded-full text-xs font-medium flex items-center justify-center ${
                    step === s
                      ? "bg-stone-900 text-white"
                      : idx === 0 && step === "payment"
                      ? "bg-emerald-500 text-white"
                      : "bg-stone-100 text-stone-400"
                  }`}
                >
                  {idx === 0 && step === "payment" ? "✓" : idx + 1}
                </div>
                <span
                  className={`text-sm capitalize ${
                    step === s ? "text-stone-900 font-medium" : "text-stone-400"
                  }`}
                >
                  {s}
                </span>
                {idx === 0 && <span className="text-stone-200">—</span>}
              </div>
            ))}
          </div>

          {step === "shipping" && (
            <form onSubmit={handleSubmitShipping} className="space-y-6">
              <h2 className="text-xl font-light text-stone-900 tracking-tight">
                Shipping Information
              </h2>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-stone-700 mb-1 uppercase tracking-wider">
                    First Name *
                  </label>
                  <input
                    required
                    name="firstName"
                    value={form.firstName}
                    onChange={handleChange}
                    className="w-full border border-stone-200 px-3 py-2.5 text-sm focus:outline-none focus:border-stone-400 rounded-sm"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-stone-700 mb-1 uppercase tracking-wider">
                    Last Name *
                  </label>
                  <input
                    required
                    name="lastName"
                    value={form.lastName}
                    onChange={handleChange}
                    className="w-full border border-stone-200 px-3 py-2.5 text-sm focus:outline-none focus:border-stone-400 rounded-sm"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-stone-700 mb-1 uppercase tracking-wider">
                  Email Address *
                </label>
                <input
                  required
                  type="email"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  className="w-full border border-stone-200 px-3 py-2.5 text-sm focus:outline-none focus:border-stone-400 rounded-sm"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-stone-700 mb-1 uppercase tracking-wider">
                  Phone
                </label>
                <input
                  name="phone"
                  value={form.phone}
                  onChange={handleChange}
                  className="w-full border border-stone-200 px-3 py-2.5 text-sm focus:outline-none focus:border-stone-400 rounded-sm"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-stone-700 mb-1 uppercase tracking-wider">
                  Street Address *
                </label>
                <input
                  required
                  name="address"
                  value={form.address}
                  onChange={handleChange}
                  className="w-full border border-stone-200 px-3 py-2.5 text-sm focus:outline-none focus:border-stone-400 rounded-sm"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-stone-700 mb-1 uppercase tracking-wider">
                    City *
                  </label>
                  <input
                    required
                    name="city"
                    value={form.city}
                    onChange={handleChange}
                    className="w-full border border-stone-200 px-3 py-2.5 text-sm focus:outline-none focus:border-stone-400 rounded-sm"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-stone-700 mb-1 uppercase tracking-wider">
                    Postal Code *
                  </label>
                  <input
                    required
                    name="postalCode"
                    value={form.postalCode}
                    onChange={handleChange}
                    className="w-full border border-stone-200 px-3 py-2.5 text-sm focus:outline-none focus:border-stone-400 rounded-sm"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-stone-700 mb-1 uppercase tracking-wider">
                  Country *
                </label>
                <select
                  name="country"
                  value={form.country}
                  onChange={handleChange}
                  className="w-full border border-stone-200 px-3 py-2.5 text-sm focus:outline-none focus:border-stone-400 rounded-sm bg-white"
                >
                  {["Germany", "Austria", "Switzerland", "France", "Netherlands", "Belgium"].map(
                    (c) => (
                      <option key={c}>{c}</option>
                    )
                  )}
                </select>
              </div>

              <button
                type="submit"
                className="w-full bg-stone-900 text-white text-sm font-medium tracking-[0.1em] uppercase py-4 hover:bg-stone-800 transition-colors"
              >
                Continue to Payment
              </button>
            </form>
          )}

          {step === "payment" && (
            <form onSubmit={handleSubmitPayment} className="space-y-6">
              <h2 className="text-xl font-light text-stone-900 tracking-tight">
                Payment Details
              </h2>

              <div className="flex items-center gap-2 text-xs text-stone-400 bg-stone-50 px-4 py-3 rounded-sm">
                <Lock size={12} />
                Your payment is encrypted and secure
              </div>

              <div>
                <label className="block text-xs font-medium text-stone-700 mb-1 uppercase tracking-wider">
                  Card Number *
                </label>
                <input
                  required
                  name="cardNumber"
                  value={form.cardNumber}
                  onChange={handleChange}
                  placeholder="1234 5678 9012 3456"
                  maxLength={19}
                  className="w-full border border-stone-200 px-3 py-2.5 text-sm focus:outline-none focus:border-stone-400 rounded-sm"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-stone-700 mb-1 uppercase tracking-wider">
                  Cardholder Name *
                </label>
                <input
                  required
                  name="cardName"
                  value={form.cardName}
                  onChange={handleChange}
                  className="w-full border border-stone-200 px-3 py-2.5 text-sm focus:outline-none focus:border-stone-400 rounded-sm"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-stone-700 mb-1 uppercase tracking-wider">
                    Expiry Date *
                  </label>
                  <input
                    required
                    name="expiry"
                    value={form.expiry}
                    onChange={handleChange}
                    placeholder="MM / YY"
                    maxLength={7}
                    className="w-full border border-stone-200 px-3 py-2.5 text-sm focus:outline-none focus:border-stone-400 rounded-sm"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-stone-700 mb-1 uppercase tracking-wider">
                    CVV *
                  </label>
                  <input
                    required
                    name="cvv"
                    value={form.cvv}
                    onChange={handleChange}
                    placeholder="123"
                    maxLength={4}
                    type="password"
                    className="w-full border border-stone-200 px-3 py-2.5 text-sm focus:outline-none focus:border-stone-400 rounded-sm"
                  />
                </div>
              </div>

              <div className="flex gap-3">
                <button
                  type="button"
                  onClick={() => setStep("shipping")}
                  className="flex-1 border border-stone-200 text-stone-700 text-sm font-medium tracking-[0.1em] uppercase py-4 hover:border-stone-400 transition-colors"
                >
                  Back
                </button>
                <button
                  type="submit"
                  className="flex-[2] bg-stone-900 text-white text-sm font-medium tracking-[0.1em] uppercase py-4 hover:bg-stone-800 transition-colors"
                >
                  Place Order — €{orderTotal.toFixed(2)}
                </button>
              </div>
            </form>
          )}
        </div>

        {/* Order Summary */}
        <div className="lg:col-span-2">
          <div className="bg-stone-50 rounded-lg p-6 sticky top-24">
            <h2 className="text-sm font-semibold tracking-[0.2em] uppercase text-stone-900 mb-5">
              Order Summary
            </h2>

            <ul className="space-y-4 mb-6">
              {items.map((item) => (
                <li
                  key={`${item.product.id}-${item.selectedSize.ml}`}
                  className="flex gap-3 items-start"
                >
                  <div className="relative w-14 h-14 rounded overflow-hidden bg-white flex-shrink-0">
                    <Image
                      src={item.product.images[0]}
                      alt={item.product.name}
                      fill
                      className="object-cover"
                    />
                    <span className="absolute -top-1 -right-1 bg-stone-900 text-white text-[9px] rounded-full w-4 h-4 flex items-center justify-center">
                      {item.quantity}
                    </span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs text-stone-400">{item.product.brand}</p>
                    <p className="text-sm font-medium text-stone-900 truncate">
                      {item.product.name}
                    </p>
                    <p className="text-xs text-stone-500">{item.selectedSize.ml} ml</p>
                  </div>
                  <span className="text-sm font-medium text-stone-900 flex-shrink-0">
                    €{(item.selectedSize.price * item.quantity).toFixed(2)}
                  </span>
                </li>
              ))}
            </ul>

            <div className="border-t border-stone-200 pt-4 space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-stone-500">Subtotal</span>
                <span className="text-stone-900">€{cartTotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-stone-500">Shipping</span>
                <span className="text-stone-900">
                  {shipping === 0 ? (
                    <span className="text-emerald-600">Free</span>
                  ) : (
                    `€${shipping.toFixed(2)}`
                  )}
                </span>
              </div>
              <div className="flex justify-between text-sm font-semibold pt-2 border-t border-stone-200">
                <span className="text-stone-900">Total</span>
                <span className="text-stone-900">€{orderTotal.toFixed(2)}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

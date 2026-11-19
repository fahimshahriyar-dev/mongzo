"use client";
import React, { useState, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import {
  FaArrowLeft,
  FaCheckCircle,
  FaInfoCircle,
} from "react-icons/fa";
import {
  SiMastercard,
  SiPaypal,
} from "react-icons/si";
import Navbar from "../../client_dashboard/components/Navbar";
import Footer from "../../client_dashboard/components/Footer";
import NavServiceBar from "../../client_dashboard/components/NavServiceBar";

const TARIFF_INFO: Record<string, { name: string; coverage: string; basePrice: number }> = {
  econom: { name: "Econom", coverage: "35 000 USD", basePrice: 60 },
  standard: { name: "Standard", coverage: "250 000 USD", basePrice: 113 },
  million: { name: "Million", coverage: "1 000 000 USD", basePrice: 162 },
};

function TravelInsurancePaymentContent() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const plan = searchParams?.get("plan") || "econom";
  const currentTariff = TARIFF_INFO[plan.toLowerCase()] || TARIFF_INFO.econom;

  const lastName = searchParams?.get("lastName") || "";
  const firstName = searchParams?.get("firstName") || "";
  const dob = searchParams?.get("dob") || "";
  const email = searchParams?.get("email") || "";
  const total = searchParams?.get("total") || currentTariff.basePrice.toString();
  const promo = searchParams?.get("promo") || "SUN3";

  const skiing = searchParams?.get("skiing") || "no";
  const surfing = searchParams?.get("surfing") || "no";
  const diving = searchParams?.get("diving") || "no";
  const luggage = searchParams?.get("luggage") || "no";
  const liability = searchParams?.get("liability") || "no";

  const [paymentMethod, setPaymentMethod] = useState<"card" | "paypal">("card");
  const [promoCode, setPromoCode] = useState(promo);

  const tariffLabels: Record<string, string> = {
    econom: "Econom (35 000 USD)",
    standard: "Standard (250 000 USD)",
    million: "Million (1 000 000 USD)",
  };

  const handleGoBack = () => {
    router.back();
  };

  const handleGoToPayment = () => {
    alert("Redirecting to secure payment gateway...");
  };

  return (
    <div className="min-h-screen bg-[#FFFFFF] text-neutral-800 flex flex-col font-sans">
      <Navbar />

      <main className="flex-1 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-28 pb-16">
        <NavServiceBar active="insurance" />
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* ================= LEFT COLUMN ================= */}
          <div className="lg:col-span-8 space-y-6">
            {/* Top Payment Card */}
            <div className="bg-[#f5f5f5] rounded-2xl border border-neutral-200/60 p-6 sm:p-8 shadow-sm">
              {/* Back & Title */}
              <div className="flex items-center gap-3 mb-6">
                <button
                  type="button"
                  onClick={handleGoBack}
                  className="text-neutral-500 hover:text-neutral-900 transition-colors p-1 -ml-1"
                >
                  <FaArrowLeft className="text-base" />
                </button>
                <h1 className="text-2xl sm:text-3xl font-light text-neutral-800">
                  Payment
                </h1>
              </div>

              {/* Payment Option 1: Card */}
              <div
                onClick={() => setPaymentMethod("card")}
                className={`flex items-center justify-between p-4 rounded-xl border cursor-pointer transition-all mb-4 bg-white ${
                  paymentMethod === "card"
                    ? "border-[#2563eb] shadow-sm ring-1 ring-[#2563eb]"
                    : "border-neutral-200/90 hover:border-neutral-300"
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className="w-5 h-5 rounded-full border-2 flex items-center justify-center border-[#2563eb]">
                    {paymentMethod === "card" && (
                      <span className="w-2.5 h-2.5 rounded-full bg-[#2563eb]" />
                    )}
                  </div>
                  <span className="text-sm font-semibold text-neutral-800">
                    Card
                  </span>
                </div>

                {/* Card Brands */}
                <div className="flex items-center gap-2">
                  <span className="px-2 py-1 rounded bg-[#00579f] text-white text-[10px] font-black tracking-widest">
                    VISA
                  </span>
                  <div className="px-1.5 py-1 rounded bg-white border border-neutral-200 text-[#eb001b] flex items-center gap-0.5">
                    <SiMastercard className="text-base" />
                  </div>
                  <span className="px-2 py-1 rounded bg-[#006fcf] text-white text-[10px] font-bold">
                    AMEX
                  </span>
                  <span className="px-1.5 py-1 rounded bg-[#d62828] text-white text-[9px] font-extrabold">
                    UnionPay
                  </span>
                </div>
              </div>

              {/* Payment Option 2: PayPal */}
              <div
                onClick={() => setPaymentMethod("paypal")}
                className={`flex items-center justify-between p-4 rounded-xl border cursor-pointer transition-all mb-8 bg-white ${
                  paymentMethod === "paypal"
                    ? "border-[#2563eb] shadow-sm ring-1 ring-[#2563eb]"
                    : "border-neutral-200/90 hover:border-neutral-300"
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className="w-5 h-5 rounded-full border-2 flex items-center justify-center border-neutral-300">
                    {paymentMethod === "paypal" && (
                      <span className="w-2.5 h-2.5 rounded-full bg-[#2563eb]" />
                    )}
                  </div>
                  <span className="text-sm font-semibold text-neutral-800">
                    PayPal
                  </span>
                </div>

                <div className="flex items-center gap-1.5 text-[#003087]">
                  <SiPaypal className="text-lg text-[#0079C1]" />
                  <span className="text-sm font-extrabold italic text-[#003087]">
                    PayPal
                  </span>
                </div>
              </div>

              {/* Action: Go to payment */}
              <div className="flex flex-col items-center">
                <button
                  type="button"
                  onClick={handleGoToPayment}
                  className="px-16 py-3.5 rounded-full bg-[#2563eb] hover:bg-[#1d4ed8] text-white font-bold text-sm tracking-wide transition-all active:scale-95 shadow-md shadow-blue-500/25 mb-4"
                >
                  Go to payment
                </button>
                <p className="text-[11px] text-neutral-400 text-center max-w-md">
                  I have read and agree with{" "}
                  <span className="text-[#2563eb] hover:underline cursor-pointer">
                    Terms of Use
                  </span>
                  ,{" "}
                  <span className="text-[#2563eb] hover:underline cursor-pointer">
                    Privacy Policy
                  </span>{" "}
                  and{" "}
                  <span className="text-[#2563eb] hover:underline cursor-pointer">
                    Insurance terms
                  </span>
                  .
                </p>
              </div>
            </div>

            {/* Bottom Guarantee & Stripe Trust Card */}
            <div className="bg-[#f5f5f5] rounded-2xl border border-neutral-200/60 p-6 shadow-sm">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 items-center">
                {/* Left: 3-day refund */}
                <div className="flex items-start gap-3">
                  <div className="text-neutral-700 text-lg mt-0.5">
                    <FaCheckCircle className="text-neutral-500" />
                  </div>
                  <div>
                    <p className="text-xs font-medium text-neutral-700 leading-snug">
                      Full refund within 3 days after purchase
                    </p>
                  </div>
                </div>

                {/* Right: Stripe */}
                <div className="sm:border-l sm:border-neutral-200/70 sm:pl-6 flex items-start gap-3">
                  <div>
                    <div className="flex items-center gap-1 mb-0.5">
                      <span className="text-lg font-black tracking-tighter text-[#635bff]">
                        stripe
                      </span>
                    </div>
                    <p className="text-xs text-neutral-500">
                      Secure payment via payment gateway
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* ================= RIGHT COLUMN: SUMMARY SIDEBAR ================= */}
          <div className="lg:col-span-4 sticky top-24">
            <div className="bg-[#f5f5f5] rounded-2xl border border-neutral-200/70 shadow-sm p-5 text-xs space-y-3">
              {/* Tariff */}
              <div className="flex items-center justify-between">
                <span className="text-neutral-400">Tariff</span>
                <div className="flex items-center gap-1">
                  <span className="font-semibold text-[#2563eb]">
                    {tariffLabels[plan] || tariffLabels.econom}
                  </span>
                  <FaInfoCircle className="text-[10px] text-neutral-300" />
                </div>
              </div>

              {/* Territory */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1 text-neutral-400">
                  <span>Territory</span>
                  <FaInfoCircle className="text-[10px] text-neutral-300" />
                </div>
                <span className="font-medium text-neutral-700">Italy</span>
              </div>

              {/* Departure */}
              <div className="flex items-center justify-between">
                <span className="text-neutral-400">Departure</span>
                <span className="font-medium text-neutral-700">18 november 2026</span>
              </div>

              {/* Return */}
              <div className="flex items-center justify-between">
                <span className="text-neutral-400">Return</span>
                <span className="font-medium text-neutral-700">30 november 2026</span>
              </div>

              {/* Days */}
              <div className="flex items-center justify-between">
                <span className="text-neutral-400">Days</span>
                <span className="font-medium text-neutral-700">13</span>
              </div>

              {/* Insured */}
              <div className="flex items-center justify-between">
                <span className="text-neutral-400">Insured</span>
                <span className="font-medium text-neutral-700">1</span>
              </div>

              {/* Traveler name & DOB */}
              {(lastName || firstName) && (
                <div className="flex items-center justify-between">
                  <span className="font-medium text-neutral-700">
                    {lastName} {firstName}
                  </span>
                  <span className="text-neutral-400">{dob}</span>
                </div>
              )}

              {/* Email */}
              {email && (
                <div className="flex items-center justify-between">
                  <span className="text-neutral-400">Email</span>
                  <span className="font-medium text-neutral-700 max-w-[170px] truncate">
                    {email}
                  </span>
                </div>
              )}

              <div className="border-t border-neutral-200/60 my-2" />

              {/* Skiing */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1 text-neutral-400">
                  <span className="max-w-[170px] truncate">Mountain skiing and snowboarding</span>
                  <FaInfoCircle className="text-[10px] text-neutral-300 shrink-0" />
                </div>
                <span className={`font-semibold ${skiing === "yes" ? "text-[#2563eb]" : "text-neutral-400"}`}>
                  {skiing}
                </span>
              </div>

              {/* Surfing */}
              <div className="flex items-center justify-between">
                <span className="text-neutral-400">Surfing and windsurfing</span>
                <span className={`font-semibold ${surfing === "yes" ? "text-[#2563eb]" : "text-neutral-400"}`}>
                  {surfing}
                </span>
              </div>

              {/* Diving */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1 text-neutral-400">
                  <span className="max-w-[170px] truncate">Diving with an instructor</span>
                  <FaInfoCircle className="text-[10px] text-neutral-300 shrink-0" />
                </div>
                <span className={`font-semibold ${diving === "yes" ? "text-[#2563eb]" : "text-neutral-400"}`}>
                  {diving}
                </span>
              </div>

              {/* Luggage */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1 text-neutral-400">
                  <span>Luggage</span>
                  <FaInfoCircle className="text-[10px] text-neutral-300 shrink-0" />
                </div>
                <span className={`font-semibold ${luggage === "yes" ? "text-[#2563eb]" : "text-neutral-400"}`}>
                  {luggage}
                </span>
              </div>

              {/* Liability */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1 text-neutral-400">
                  <span>Personal liability</span>
                  <FaInfoCircle className="text-[10px] text-neutral-300 shrink-0" />
                </div>
                <span className={`font-semibold ${liability === "yes" ? "text-[#2563eb]" : "text-neutral-400"}`}>
                  {liability}
                </span>
              </div>

              {/* Deductible */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1 text-neutral-400">
                  <span>Deductible</span>
                  <FaInfoCircle className="text-[10px] text-neutral-300 shrink-0" />
                </div>
                <span className="font-semibold text-neutral-700">yes</span>
              </div>

              <div className="border-t border-neutral-200/80 my-3" />

              {/* Total Price Section */}
              <div className="flex items-end justify-between pt-1">
                <span className="text-neutral-500 font-medium pb-1">Total</span>
                <div className="text-right">
                  <div className="text-3xl font-extrabold text-[#2563eb] leading-none">
                    ${total}
                  </div>
                  <span className="text-[11px] text-[#2563eb] border-b border-dotted border-[#2563eb] cursor-pointer">
                    Promo
                  </span>
                </div>
              </div>

              {/* Promo code input row */}
              <div className="flex items-center gap-2 pt-2">
                <input
                  type="text"
                  value={promoCode}
                  onChange={(e) => setPromoCode(e.target.value.toUpperCase())}
                  placeholder="PROMO"
                  className="flex-1 px-3 py-2 text-xs font-semibold border border-neutral-300 rounded-lg focus:outline-none focus:border-[#2563eb] uppercase bg-white"
                />
                <button
                  type="button"
                  className="px-4 py-2 bg-[#2563eb] hover:bg-[#1d4ed8] text-white font-bold text-xs rounded-lg uppercase tracking-wider transition-all"
                >
                  OK
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}

export default function TravelInsurancePaymentPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-white flex items-center justify-center text-sm text-neutral-500">
          Loading payment...
        </div>
      }
    >
      <TravelInsurancePaymentContent />
    </Suspense>
  );
}

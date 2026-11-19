"use client";
import React from "react";
import Link from "next/link";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import { FiArrowRight, FiCheckCircle } from "react-icons/fi";
import {
  FaHotel,
  FaPlane,
  FaCar,
  FaBuilding,
  FaShieldAlt,
  FaHeadset,
  FaTags,
  FaArrowRight,
  FaSuitcase,
  FaStar,
} from "react-icons/fa";

export default function About() {
  return (
    <div className="min-h-screen bg-white text-neutral-900 font-Poppins flex flex-col selection:bg-blue-100 selection:text-blue-900">
      <Navbar />

      <main className="flex-1">
        {/* ========================================================= */}
        {/* 1. HERO SECTION (Clean White Background with Blue Accents) */}
        {/* ========================================================= */}
        <section className="relative bg-gradient-to-b from-blue-50/60 via-white to-white overflow-hidden pt-28 pb-16 md:pt-36 md:pb-24 border-b border-neutral-100">
          {/* Subtle Ambient Blue Radial Glows */}
          <div className="pointer-events-none absolute -top-24 right-[-5%] w-[500px] h-[500px] bg-blue-400/10 rounded-full blur-[120px]" />
          <div className="pointer-events-none absolute bottom-0 left-[-5%] w-[450px] h-[450px] bg-sky-300/15 rounded-full blur-[100px]" />

          <div className="container-page relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
            {/* Left Content */}
            <div className="lg:col-span-7 space-y-6">
              {/* Badge */}
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-50 border border-blue-200/60 shadow-sm">
                <span className="w-2 h-2 rounded-full bg-[#2563eb] animate-pulse" />
                <span className="text-xs uppercase font-bold tracking-wider text-[#2563eb]">
                  About Mongzo
                </span>
              </div>

              {/* Title */}
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-[54px] font-extrabold text-neutral-900 tracking-tight leading-[1.12]">
                Every trip you take, <br className="hidden sm:block" />
                booked in{" "}
                <span className="text-[#2563eb]">
                  one place.
                </span>
              </h1>

              {/* Subtitle */}
              <p className="text-neutral-600 text-sm sm:text-base leading-relaxed max-w-xl font-normal">
                Mongzo brings hotels, apartments, flights and cars together,
                with 24/7 dedicated support from travel experts who know Bangladesh
                and the destinations you dream of exploring.
              </p>

              {/* Action Buttons */}
              <div className="pt-2 flex flex-wrap items-center gap-4">
                <Link
                  href="/hotels"
                  className="inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-full bg-[#2563eb] hover:bg-[#1d4ed8] active:scale-95 text-white font-bold text-sm transition-all shadow-md shadow-blue-500/25"
                >
                  <span>Find a stay</span>
                  <FaArrowRight size={13} />
                </Link>
                <Link
                  href="/flights"
                  className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full bg-white hover:bg-neutral-50 border border-neutral-300 text-neutral-800 font-semibold text-sm transition-all shadow-sm"
                >
                  Explore flights
                </Link>
              </div>

              {/* Quick Trust Badges */}
              <div className="pt-6 flex flex-wrap items-center gap-6 text-xs font-medium text-neutral-500 border-t border-neutral-200/70">
                <div className="flex items-center gap-1.5">
                  <FiCheckCircle className="text-[#2563eb] text-sm" />
                  <span>Verified Hotels & Stays</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <FiCheckCircle className="text-[#2563eb] text-sm" />
                  <span>Real-time Flight Tracking</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <FiCheckCircle className="text-[#2563eb] text-sm" />
                  <span>Instant Local Confirmation</span>
                </div>
              </div>
            </div>

            {/* Right Arch Image with Blue Path */}
            <div className="lg:col-span-5 flex justify-center lg:justify-end">
              <div className="relative w-full max-w-[420px]">
                {/* Soft glow shadow behind arch */}
                <div className="absolute -inset-2 rounded-t-[210px] rounded-b-3xl bg-blue-500/10 blur-xl -z-10" />

                {/* Arch-shaped container */}
                <div className="relative aspect-[4/4.2] rounded-t-[200px] rounded-b-3xl overflow-hidden border-4 border-white shadow-xl bg-white">
                  <img
                    src="https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=1200&q=80"
                    alt="Luxury Travel Experience"
                    className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
                  />
                  {/* Subtle clean gradient at bottom */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent pointer-events-none" />

                  {/* Curving dashed journey path + Blue locator pin */}
                  <svg
                    className="absolute inset-0 w-full h-full pointer-events-none"
                    viewBox="0 0 400 400"
                    fill="none"
                  >
                    <path
                      d="M 100 320 Q 230 200 300 100"
                      stroke="#2563eb"
                      strokeWidth="3"
                      strokeDasharray="6 6"
                      strokeLinecap="round"
                    />
                    <circle cx="300" cy="100" r="8" fill="#2563eb" />
                    <circle cx="300" cy="100" r="16" stroke="#2563eb" strokeWidth="2" opacity="0.3" className="animate-ping" />
                    <circle cx="100" cy="320" r="6" fill="#2563eb" />
                  </svg>

                  {/* Floating Trust Pill */}
                  <div className="absolute bottom-4 left-4 right-4 bg-white/95 backdrop-blur-md rounded-2xl p-3 border border-neutral-100 shadow-md flex items-center justify-between">
                    <div className="flex items-center gap-2.5">
                      <div className="w-8 h-8 rounded-full bg-blue-100 text-[#2563eb] flex items-center justify-center font-bold text-xs">
                        M
                      </div>
                      <div>
                        <p className="text-xs font-bold text-neutral-900 leading-none">Mongzo Travel</p>
                        <p className="text-[11px] text-neutral-500 mt-0.5">Top-rated agency in BD</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-1 text-[#2563eb] font-bold text-xs">
                      <FaStar className="text-amber-400" />
                      <span>4.9 / 5</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ========================================================= */}
        {/* 2. STATS BAR (Light Card Grid)                             */}
        {/* ========================================================= */}
        <section className="py-12 bg-white">
          <div className="container-page">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
              <div className="bg-[#f5f5f5] rounded-2xl p-6 border border-neutral-200/60 shadow-sm text-center md:text-left transition-all hover:bg-white hover:border-[#2563eb]/40 hover:shadow-md">
                <p className="text-3xl sm:text-4xl font-extrabold text-[#2563eb]">100K+</p>
                <p className="text-xs sm:text-sm font-semibold text-neutral-800 mt-1">Travelers booked</p>
                <p className="text-[11px] text-neutral-500 mt-0.5">Across domestic & global journeys</p>
              </div>

              <div className="bg-[#f5f5f5] rounded-2xl p-6 border border-neutral-200/60 shadow-sm text-center md:text-left transition-all hover:bg-white hover:border-[#2563eb]/40 hover:shadow-md">
                <p className="text-3xl sm:text-4xl font-extrabold text-[#2563eb]">500+</p>
                <p className="text-xs sm:text-sm font-semibold text-neutral-800 mt-1">Curated destinations</p>
                <p className="text-[11px] text-neutral-500 mt-0.5">Handpicked hotels & verified stays</p>
              </div>

              <div className="bg-[#f5f5f5] rounded-2xl p-6 border border-neutral-200/60 shadow-sm text-center md:text-left transition-all hover:bg-white hover:border-[#2563eb]/40 hover:shadow-md">
                <p className="text-3xl sm:text-4xl font-extrabold text-[#2563eb]">24/7</p>
                <p className="text-xs sm:text-sm font-semibold text-neutral-800 mt-1">Live customer support</p>
                <p className="text-[11px] text-neutral-500 mt-0.5">Assistance in Bangla & English</p>
              </div>

              <div className="bg-[#f5f5f5] rounded-2xl p-6 border border-neutral-200/60 shadow-sm text-center md:text-left transition-all hover:bg-white hover:border-[#2563eb]/40 hover:shadow-md">
                <p className="text-3xl sm:text-4xl font-extrabold text-[#2563eb]">4.9 / 5</p>
                <p className="text-xs sm:text-sm font-semibold text-neutral-800 mt-1">Guest rating score</p>
                <p className="text-[11px] text-neutral-500 mt-0.5">Based on 15,000+ guest reviews</p>
              </div>
            </div>
          </div>
        </section>

        {/* ========================================================= */}
        {/* 3. WHY WE STARTED MONGZO (Clean Story Section)             */}
        {/* ========================================================= */}
        <section className="py-16 md:py-24 bg-white border-t border-neutral-100">
          <div className="container-page grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-start">
            {/* Left Title & Hook */}
            <div className="lg:col-span-5">
              <span className="text-xs uppercase font-bold text-[#2563eb] tracking-wider block mb-2">
                Our Purpose
              </span>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-neutral-900 tracking-tight leading-tight">
                Why we started Mongzo
              </h2>

              <div className="mt-6 pl-5 border-l-4 border-[#2563eb] bg-[#eff6ff] py-4 pr-5 rounded-r-2xl">
                <p className="text-base sm:text-lg font-semibold text-[#1d4ed8] leading-snug">
                  Planning a trip should not need ten open browser tabs and three phone calls.
                </p>
              </div>
            </div>

            {/* Right Story Paragraphs */}
            <div className="lg:col-span-7 space-y-5 text-neutral-600 text-sm sm:text-base leading-relaxed">
              <p>
                Travelers in Bangladesh have long faced fragmented experiences: comparing flights
                on one platform, messaging hotels on WhatsApp to confirm basic amenities, arranging
                car rentals with unknown reliability, and still worrying whether a reservation will
                be honored upon arrival.
              </p>
              <p>
                Mongzo was born to eliminate that friction. We engineered a single, reliable hub
                where flights, hotels, apartments, and cars are integrated into one transparent
                account. No unexpected fees, no guesswork, and always backed by real human support
                who speak your language.
              </p>
            </div>
          </div>
        </section>

        {/* ========================================================= */}
        {/* 4. WHAT YOU CAN BOOK WITH US                               */}
        {/* ========================================================= */}
        <section className="py-16 md:py-20 bg-[#f5f5f5] border-t border-b border-neutral-200/60">
          <div className="container-page">
            <div className="max-w-2xl mb-12">
              <span className="text-xs uppercase font-bold text-[#2563eb] tracking-wider block mb-1">
                All-In-One Platform
              </span>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-neutral-900 tracking-tight">
                What you can book with us
              </h2>
              <p className="text-sm text-neutral-500 mt-2 font-medium">
                Four travel essentials. One account. One dedicated support team.
              </p>
            </div>

            {/* List Table / Rows */}
            <div className="divide-y divide-neutral-200 bg-white rounded-3xl border border-neutral-200/80 shadow-sm overflow-hidden px-6 sm:px-10">
              {/* Hotels */}
              <div className="py-6 flex flex-col md:flex-row md:items-center justify-between gap-4 group">
                <div className="md:w-1/4 flex items-center gap-4">
                  <div className="w-12 h-12 rounded-2xl bg-blue-50 text-[#2563eb] flex items-center justify-center transition-colors group-hover:bg-[#2563eb] group-hover:text-white">
                    <FaHotel size={20} />
                  </div>
                  <div>
                    <span className="text-base font-bold text-neutral-900 block">Hotels</span>
                    <span className="text-xs text-neutral-400">10,000+ properties</span>
                  </div>
                </div>
                <div className="md:w-1/2">
                  <p className="text-sm text-neutral-600">
                    Resorts, boutique stays and city hotels with free cancellation on many rooms.
                  </p>
                </div>
                <div className="md:w-1/4 md:text-right">
                  <Link
                    href="/hotels"
                    className="inline-flex items-center gap-2 text-sm font-bold text-[#2563eb] hover:text-[#1d4ed8] transition-colors"
                  >
                    <span>Browse hotels</span>
                    <FiArrowRight size={15} />
                  </Link>
                </div>
              </div>

              {/* Apartments */}
              <div className="py-6 flex flex-col md:flex-row md:items-center justify-between gap-4 group">
                <div className="md:w-1/4 flex items-center gap-4">
                  <div className="w-12 h-12 rounded-2xl bg-blue-50 text-[#2563eb] flex items-center justify-center transition-colors group-hover:bg-[#2563eb] group-hover:text-white">
                    <FaBuilding size={20} />
                  </div>
                  <div>
                    <span className="text-base font-bold text-neutral-900 block">Apartments</span>
                    <span className="text-xs text-neutral-400">Family & long stays</span>
                  </div>
                </div>
                <div className="md:w-1/2">
                  <p className="text-sm text-neutral-600">
                    Furnished places with kitchens and private amenities, ideal for family vacations or extended work trips.
                  </p>
                </div>
                <div className="md:w-1/4 md:text-right">
                  <Link
                    href="/hotels"
                    className="inline-flex items-center gap-2 text-sm font-bold text-[#2563eb] hover:text-[#1d4ed8] transition-colors"
                  >
                    <span>Browse apartments</span>
                    <FiArrowRight size={15} />
                  </Link>
                </div>
              </div>

              {/* Flights */}
              <div className="py-6 flex flex-col md:flex-row md:items-center justify-between gap-4 group">
                <div className="md:w-1/4 flex items-center gap-4">
                  <div className="w-12 h-12 rounded-2xl bg-blue-50 text-[#2563eb] flex items-center justify-center transition-colors group-hover:bg-[#2563eb] group-hover:text-white">
                    <FaPlane size={20} />
                  </div>
                  <div>
                    <span className="text-base font-bold text-neutral-900 block">Flights</span>
                    <span className="text-xs text-neutral-400">Domestic & global</span>
                  </div>
                </div>
                <div className="md:w-1/2">
                  <p className="text-sm text-neutral-600">
                    Compare airfares in real-time across top airlines for domestic and international routes with zero hidden fees.
                  </p>
                </div>
                <div className="md:w-1/4 md:text-right">
                  <Link
                    href="/flights"
                    className="inline-flex items-center gap-2 text-sm font-bold text-[#2563eb] hover:text-[#1d4ed8] transition-colors"
                  >
                    <span>Search flights</span>
                    <FiArrowRight size={15} />
                  </Link>
                </div>
              </div>

              {/* Cars */}
              <div className="py-6 flex flex-col md:flex-row md:items-center justify-between gap-4 group">
                <div className="md:w-1/4 flex items-center gap-4">
                  <div className="w-12 h-12 rounded-2xl bg-blue-50 text-[#2563eb] flex items-center justify-center transition-colors group-hover:bg-[#2563eb] group-hover:text-white">
                    <FaCar size={20} />
                  </div>
                  <div>
                    <span className="text-base font-bold text-neutral-900 block">Cars</span>
                    <span className="text-xs text-neutral-400">Airport & city rentals</span>
                  </div>
                </div>
                <div className="md:w-1/2">
                  <p className="text-sm text-neutral-600">
                    Reliable vehicles with or without professional drivers, ready and waiting right where you land.
                  </p>
                </div>
                <div className="md:w-1/4 md:text-right">
                  <Link
                    href="/cars"
                    className="inline-flex items-center gap-2 text-sm font-bold text-[#2563eb] hover:text-[#1d4ed8] transition-colors"
                  >
                    <span>Find a car</span>
                    <FiArrowRight size={15} />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ========================================================= */}
        {/* 5. WHAT YOU GET WHEN YOU BOOK WITH MONGZO                  */}
        {/* ========================================================= */}
        <section className="py-16 md:py-24 bg-white">
          <div className="container-page">
            <div className="max-w-2xl mb-12">
              <span className="text-xs uppercase font-bold text-[#2563eb] tracking-wider block mb-1">
                The Mongzo Promise
              </span>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-neutral-900 tracking-tight">
                What you get when you book with Mongzo
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
              {/* Feature 1 */}
              <div className="p-7 rounded-2xl bg-[#f5f5f5] border border-neutral-200/70 hover:border-[#2563eb]/40 transition-colors">
                <div className="w-11 h-11 rounded-xl bg-white text-[#2563eb] flex items-center justify-center shadow-sm mb-4">
                  <FaTags size={18} />
                </div>
                <h3 className="text-base sm:text-lg font-bold text-neutral-900">Clear prices upfront</h3>
                <p className="text-xs sm:text-sm text-neutral-600 mt-2 leading-relaxed">
                  The price you see includes all verified taxes and service fees. Promotional deals display the original price directly beside the discounted rate.
                </p>
              </div>

              {/* Feature 2 */}
              <div className="p-7 rounded-2xl bg-[#f5f5f5] border border-neutral-200/70 hover:border-[#2563eb]/40 transition-colors">
                <div className="w-11 h-11 rounded-xl bg-white text-[#2563eb] flex items-center justify-center shadow-sm mb-4">
                  <FiCheckCircle size={20} />
                </div>
                <h3 className="text-base sm:text-lg font-bold text-neutral-900">Free cancellation on many stays</h3>
                <p className="text-xs sm:text-sm text-neutral-600 mt-2 leading-relaxed">
                  Look for the free cancellation badge on hotels and cars. Changing your schedule or destination should never penalize your wallet.
                </p>
              </div>

              {/* Feature 3 */}
              <div className="p-7 rounded-2xl bg-[#f5f5f5] border border-neutral-200/70 hover:border-[#2563eb]/40 transition-colors">
                <div className="w-11 h-11 rounded-xl bg-white text-[#2563eb] flex items-center justify-center shadow-sm mb-4">
                  <FaHeadset size={18} />
                </div>
                <h3 className="text-base sm:text-lg font-bold text-neutral-900">Support in your language</h3>
                <p className="text-xs sm:text-sm text-neutral-600 mt-2 leading-relaxed">
                  Reach real human travel assistants in Bangla or English at any hour of the day, before departure and throughout your trip.
                </p>
              </div>

              {/* Feature 4 */}
              <div className="p-7 rounded-2xl bg-[#f5f5f5] border border-neutral-200/70 hover:border-[#2563eb]/40 transition-colors">
                <div className="w-11 h-11 rounded-xl bg-white text-[#2563eb] flex items-center justify-center shadow-sm mb-4">
                  <FaShieldAlt size={18} />
                </div>
                <h3 className="text-base sm:text-lg font-bold text-neutral-900">Secure & local payment</h3>
                <p className="text-xs sm:text-sm text-neutral-600 mt-2 leading-relaxed">
                  Pay smoothly in BDT, USD or EUR through verified payment channels including bKash, Nagad, Visa, Mastercard, and international cards.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ========================================================= */}
        {/* 6. THE PEOPLE BEHIND MONGZO                                */}
        {/* ========================================================= */}
        <section className="py-16 md:py-24 bg-[#f5f5f5] border-t border-neutral-200/70">
          <div className="container-page">
            <div className="text-center max-w-2xl mx-auto mb-14">
              <span className="text-xs uppercase font-bold text-[#2563eb] tracking-wider block mb-1">
                Our Team
              </span>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-neutral-900 tracking-tight">
                The people behind Mongzo
              </h2>
              <p className="text-sm text-neutral-500 mt-2 font-medium">
                A dedicated, hands-on team that answers your messages and cares for your journey.
              </p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8">
              {/* Member A */}
              <div className="flex flex-col items-center text-center p-6 rounded-2xl bg-white border border-neutral-200/80 shadow-sm transition-transform hover:-translate-y-1">
                <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-full bg-blue-50 text-[#2563eb] flex items-center justify-center text-2xl font-bold shadow-inner mb-4 border-2 border-blue-200">
                  F
                </div>
                <h4 className="text-base font-bold text-neutral-900">Fahim</h4>
                <p className="text-xs text-[#2563eb] font-semibold mt-0.5">Founder & CEO</p>
              </div>

              {/* Member B */}
              <div className="flex flex-col items-center text-center p-6 rounded-2xl bg-white border border-neutral-200/80 shadow-sm transition-transform hover:-translate-y-1">
                <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-full bg-blue-50 text-[#2563eb] flex items-center justify-center text-2xl font-bold shadow-inner mb-4 border-2 border-blue-200">
                  T
                </div>
                <h4 className="text-base font-bold text-neutral-900">Tanvir</h4>
                <p className="text-xs text-[#2563eb] font-semibold mt-0.5">Head of Operations</p>
              </div>

              {/* Member C */}
              <div className="flex flex-col items-center text-center p-6 rounded-2xl bg-white border border-neutral-200/80 shadow-sm transition-transform hover:-translate-y-1">
                <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-full bg-blue-50 text-[#2563eb] flex items-center justify-center text-2xl font-bold shadow-inner mb-4 border-2 border-blue-200">
                  A
                </div>
                <h4 className="text-base font-bold text-neutral-900">Arif</h4>
                <p className="text-xs text-[#2563eb] font-semibold mt-0.5">Lead Engineer</p>
              </div>

              {/* Member D */}
              <div className="flex flex-col items-center text-center p-6 rounded-2xl bg-white border border-neutral-200/80 shadow-sm transition-transform hover:-translate-y-1">
                <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-full bg-blue-50 text-[#2563eb] flex items-center justify-center text-2xl font-bold shadow-inner mb-4 border-2 border-blue-200">
                  S
                </div>
                <h4 className="text-base font-bold text-neutral-900">Sabrina</h4>
                <p className="text-xs text-[#2563eb] font-semibold mt-0.5">Customer Support Lead</p>
              </div>
            </div>
          </div>
        </section>

        {/* ========================================================= */}
        {/* 7. AIRLINES, HOTELS AND PAYMENT PARTNERS                   */}
        {/* ========================================================= */}
        <section className="py-14 bg-white border-t border-neutral-200/70">
          <div className="container-page">
            <h2 className="text-xl sm:text-2xl font-bold text-neutral-900 tracking-tight mb-6">
              Airlines, hotels and payment partners
            </h2>

            <div className="flex flex-wrap items-center gap-3 sm:gap-4 text-xs sm:text-sm text-neutral-700 font-medium">
              <span className="px-4 py-2.5 rounded-xl bg-[#f5f5f5] border border-neutral-200/80 hover:border-blue-400 transition-colors">
                ✈️ Biman Bangladesh
              </span>
              <span className="px-4 py-2.5 rounded-xl bg-[#f5f5f5] border border-neutral-200/80 hover:border-blue-400 transition-colors">
                ✈️ US-Bangla Airlines
              </span>
              <span className="px-4 py-2.5 rounded-xl bg-[#f5f5f5] border border-neutral-200/80 hover:border-blue-400 transition-colors">
                ✈️ Emirates
              </span>
              <span className="px-4 py-2.5 rounded-xl bg-[#f5f5f5] border border-neutral-200/80 hover:border-blue-400 transition-colors">
                ✈️ Qatar Airways
              </span>
              <span className="px-4 py-2.5 rounded-xl bg-[#f5f5f5] border border-neutral-200/80 hover:border-blue-400 transition-colors">
                💳 bKash
              </span>
              <span className="px-4 py-2.5 rounded-xl bg-[#f5f5f5] border border-neutral-200/80 hover:border-blue-400 transition-colors">
                💳 Nagad
              </span>
              <span className="px-4 py-2.5 rounded-xl bg-[#f5f5f5] border border-neutral-200/80 hover:border-blue-400 transition-colors">
                💳 Visa & Mastercard
              </span>
            </div>
          </div>
        </section>

        {/* ========================================================= */}
        {/* 8. BOTTOM CTA BANNER (Blue Theme on White/Light Base)      */}
        {/* ========================================================= */}
        <section className="py-16 md:py-20 bg-white border-t border-neutral-200">
          <div className="container-page">
            <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-[#1d4ed8] to-[#2563eb] p-8 sm:p-12 md:p-16 text-white shadow-xl shadow-blue-500/15 flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
              {/* Subtle light bubble */}
              <div className="pointer-events-none absolute -right-20 -bottom-20 w-80 h-80 bg-white/10 rounded-full blur-2xl" />

              <div className="relative z-10 max-w-xl">
                <span className="inline-block px-3 py-1 rounded-full bg-white/20 text-white text-xs font-semibold uppercase tracking-wider mb-3">
                  Start Exploring
                </span>
                <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-white tracking-tight leading-tight">
                  Ready to plan your next trip?
                </h2>
                <p className="text-blue-100 text-sm mt-2 font-normal">
                  Find the best deals on flights, stays, cars and insurance worldwide with instant booking.
                </p>
              </div>

              <div className="relative z-10 flex flex-wrap items-center gap-4">
                <Link
                  href="/hotels"
                  className="inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-full bg-white hover:bg-neutral-100 active:scale-95 text-[#2563eb] font-bold text-sm transition-all shadow-md"
                >
                  <span>Find a stay</span>
                  <FaArrowRight size={13} />
                </Link>
                <Link
                  href="/flights"
                  className="inline-flex items-center justify-center px-6 py-3.5 rounded-full bg-white/10 hover:bg-white/20 border border-white/30 text-white font-medium text-sm transition-all backdrop-blur-sm"
                >
                  Book Flights
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}

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
} from "react-icons/fa";

export default function About() {
  return (
    <div className="min-h-screen bg-white text-mongzo-dark font-Poppins flex flex-col selection:bg-mongzo-green/20 selection:text-mongzo-dark">
      <Navbar />

      <main className="flex-1">
        {/* ========================================================= */}
        {/* 1. HERO SECTION (Mongzo Dark Theme with Neon Green Glow)  */}
        {/* ========================================================= */}
        <section className="relative bg-mongzo-dark text-white overflow-hidden pt-32 pb-20 md:pt-40 md:pb-28">
          {/* Ambient Brand Glows */}
          <div className="pointer-events-none absolute -top-32 right-[-10%] w-[550px] h-[550px] bg-mongzo-green/10 rounded-full blur-[130px]" />
          <div className="pointer-events-none absolute bottom-[-15%] left-[-10%] w-[500px] h-[500px] bg-blue-500/10 rounded-full blur-[130px]" />

          <div className="container-page relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
            {/* Left Content */}
            <div className="lg:col-span-6 space-y-6">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/5 border border-white/10 backdrop-blur-md">
                <span className="w-2 h-2 rounded-full bg-mongzo-green animate-pulse" />
                <span className="text-xs uppercase font-semibold tracking-wider text-slate-300">
                  About Mongzo
                </span>
              </div>

              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-[56px] font-bold text-white tracking-tight leading-[1.12]">
                Every trip you take, <br className="hidden sm:block" />
                booked in{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-mongzo-green to-emerald-400">
                  one place.
                </span>
              </h1>

              <p className="text-slate-300 text-sm sm:text-base leading-relaxed max-w-lg font-light">
                Mongzo brings hotels, apartments, flights and cars together,
                with 24/7 dedicated support from travel experts who know Bangladesh
                and the destinations you dream of exploring.
              </p>

              <div className="pt-2 flex flex-wrap items-center gap-4">
                <Link
                  href="/hotels"
                  className="inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-xl bg-mongzo-green hover:bg-mongzo-greenDark active:scale-[0.98] text-mongzo-dark font-bold text-sm transition-all shadow-lg shadow-mongzo-green/25"
                >
                  <span>Find a stay</span>
                  <FaArrowRight size={13} />
                </Link>
                <Link
                  href="/flights"
                  className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-white/10 hover:bg-white/15 border border-white/15 text-white font-medium text-sm transition-all backdrop-blur-sm"
                >
                  Explore flights
                </Link>
              </div>
            </div>

            {/* Right Arch Image with Travel Journey Curve */}
            <div className="lg:col-span-6 flex justify-center lg:justify-end">
              <div className="relative w-full max-w-[480px]">
                {/* Outer Glow Halo */}
                <div className="absolute -inset-1 rounded-t-[204px] rounded-b-3xl bg-gradient-to-b from-mongzo-green/30 to-transparent blur-md -z-10" />

                {/* Arch-shaped container */}
                <div className="relative aspect-[4/3.9] rounded-t-[200px] rounded-b-3xl overflow-hidden border border-white/15 shadow-2xl bg-neutral-900">
                  <img
                    src="https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=1200&q=80"
                    alt="Mongzo Luxury Resort and Pool"
                    className="w-full h-full object-cover scale-105 hover:scale-100 transition-transform duration-700"
                  />
                  {/* Vignette Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-mongzo-dark/80 via-transparent to-black/20 pointer-events-none" />

                  {/* Curving dashed journey path + Neon Green locator pin */}
                  <svg
                    className="absolute inset-0 w-full h-full pointer-events-none"
                    viewBox="0 0 400 380"
                    fill="none"
                  >
                    <path
                      d="M 110 310 Q 230 190 300 95"
                      stroke="#00ED64"
                      strokeWidth="2.5"
                      strokeDasharray="6 6"
                      strokeLinecap="round"
                      opacity="0.9"
                    />
                    <circle cx="300" cy="95" r="7" fill="#00ED64" />
                    <circle cx="300" cy="95" r="14" stroke="#00ED64" strokeWidth="2" opacity="0.35" className="animate-ping" />
                    <circle cx="110" cy="310" r="5" fill="#00ED64" />
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ========================================================= */}
        {/* 2. WHY WE STARTED MONGZO (Clean White Story Section)       */}
        {/* ========================================================= */}
        <section className="py-20 md:py-28 bg-white border-b border-neutral-100">
          <div className="container-page grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-start">
            {/* Left Title & Hook */}
            <div className="lg:col-span-5">
              <span className="text-xs uppercase font-bold text-mongzo-greenDark tracking-wider block mb-2">
                Our Mission
              </span>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-mongzo-dark tracking-tight leading-tight">
                Why we started Mongzo
              </h2>

              <div className="mt-6 pl-5 border-l-4 border-mongzo-green bg-mongzo-mist py-3.5 pr-4 rounded-r-2xl">
                <p className="text-base sm:text-lg font-medium text-mongzo-dark leading-snug">
                  Planning a trip should not need ten tabs and three phone calls.
                </p>
              </div>
            </div>

            {/* Right Story Paragraphs */}
            <div className="lg:col-span-7 space-y-5 text-neutral-600 text-sm sm:text-base leading-relaxed">
              <p>
                Travelers in Bangladesh and beyond have long had to navigate fragmented portals
                just to compare domestic flights, negotiate with hotels via individual WhatsApp
                chats, find safe airport transfers, and then still make calls to verify bookings.
              </p>
              <p>
                We built Mongzo to unify every component of your travel into one seamless,
                transparent ecosystem. Whether you are reserving a flight to Cox&apos;s Bazar,
                booking a weekend villa in Sylhet, or planning a multi-city global itinerary,
                Mongzo offers verified properties, clear upfront pricing with zero hidden fees,
                and round-the-clock local assistance.
              </p>
            </div>
          </div>
        </section>

        {/* ========================================================= */}
        {/* 3. WHAT YOU CAN BOOK WITH US (Cards & Table)               */}
        {/* ========================================================= */}
        <section className="py-20 bg-mongzo-mist">
          <div className="container-page">
            <div className="max-w-2xl mb-12">
              <span className="text-xs uppercase font-bold text-mongzo-greenDark tracking-wider block mb-1">
                Ecosystem
              </span>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-mongzo-dark tracking-tight">
                What you can book with us
              </h2>
              <p className="text-sm text-neutral-500 mt-2 font-medium">
                Four essentials. One account. One dedicated support team.
              </p>
            </div>

            {/* List Table / Rows */}
            <div className="divide-y divide-neutral-200/80 border border-neutral-200/80 bg-white rounded-3xl shadow-sm overflow-hidden px-6 sm:px-10">
              {/* Hotels */}
              <div className="py-7 flex flex-col md:flex-row md:items-center justify-between gap-4 group">
                <div className="md:w-1/4 flex items-center gap-3.5">
                  <div className="w-11 h-11 rounded-2xl bg-mongzo-green/10 text-mongzo-greenDark flex items-center justify-center transition-colors group-hover:bg-mongzo-green group-hover:text-mongzo-dark">
                    <FaHotel size={18} />
                  </div>
                  <div>
                    <span className="text-base font-bold text-mongzo-dark block">Hotels</span>
                    <span className="text-xs text-neutral-400">10,000+ stays</span>
                  </div>
                </div>
                <div className="md:w-1/2">
                  <p className="text-sm text-neutral-600">
                    Resorts, boutique stays and city hotels with free cancellation on select rooms.
                  </p>
                </div>
                <div className="md:w-1/4 md:text-right">
                  <Link
                    href="/hotels"
                    className="inline-flex items-center gap-2 text-sm font-semibold text-mongzo-dark hover:text-mongzo-greenDark transition-colors"
                  >
                    <span>Browse hotels</span>
                    <FiArrowRight size={15} />
                  </Link>
                </div>
              </div>

              {/* Apartments */}
              <div className="py-7 flex flex-col md:flex-row md:items-center justify-between gap-4 group">
                <div className="md:w-1/4 flex items-center gap-3.5">
                  <div className="w-11 h-11 rounded-2xl bg-sky-50 text-sky-600 flex items-center justify-center transition-colors group-hover:bg-sky-500 group-hover:text-white">
                    <FaBuilding size={18} />
                  </div>
                  <div>
                    <span className="text-base font-bold text-mongzo-dark block">Apartments</span>
                    <span className="text-xs text-neutral-400">Long & short stays</span>
                  </div>
                </div>
                <div className="md:w-1/2">
                  <p className="text-sm text-neutral-600">
                    Fully furnished spaces with kitchens, designed for longer trips or family stays.
                  </p>
                </div>
                <div className="md:w-1/4 md:text-right">
                  <Link
                    href="/hotels"
                    className="inline-flex items-center gap-2 text-sm font-semibold text-mongzo-dark hover:text-mongzo-greenDark transition-colors"
                  >
                    <span>Browse apartments</span>
                    <FiArrowRight size={15} />
                  </Link>
                </div>
              </div>

              {/* Flights */}
              <div className="py-7 flex flex-col md:flex-row md:items-center justify-between gap-4 group">
                <div className="md:w-1/4 flex items-center gap-3.5">
                  <div className="w-11 h-11 rounded-2xl bg-amber-50 text-amber-600 flex items-center justify-center transition-colors group-hover:bg-amber-500 group-hover:text-white">
                    <FaPlane size={18} />
                  </div>
                  <div>
                    <span className="text-base font-bold text-mongzo-dark block">Flights</span>
                    <span className="text-xs text-neutral-400">Domestic & global</span>
                  </div>
                </div>
                <div className="md:w-1/2">
                  <p className="text-sm text-neutral-600">
                    Compare airfares in real-time across top airlines for domestic and international routes.
                  </p>
                </div>
                <div className="md:w-1/4 md:text-right">
                  <Link
                    href="/flights"
                    className="inline-flex items-center gap-2 text-sm font-semibold text-mongzo-dark hover:text-mongzo-greenDark transition-colors"
                  >
                    <span>Search flights</span>
                    <FiArrowRight size={15} />
                  </Link>
                </div>
              </div>

              {/* Cars */}
              <div className="py-7 flex flex-col md:flex-row md:items-center justify-between gap-4 group">
                <div className="md:w-1/4 flex items-center gap-3.5">
                  <div className="w-11 h-11 rounded-2xl bg-indigo-50 text-indigo-600 flex items-center justify-center transition-colors group-hover:bg-indigo-500 group-hover:text-white">
                    <FaCar size={18} />
                  </div>
                  <div>
                    <span className="text-base font-bold text-mongzo-dark block">Cars</span>
                    <span className="text-xs text-neutral-400">Airport & city rentals</span>
                  </div>
                </div>
                <div className="md:w-1/2">
                  <p className="text-sm text-neutral-600">
                    Vehicles with or without a verified driver, ready and waiting where you land.
                  </p>
                </div>
                <div className="md:w-1/4 md:text-right">
                  <Link
                    href="/cars"
                    className="inline-flex items-center gap-2 text-sm font-semibold text-mongzo-dark hover:text-mongzo-greenDark transition-colors"
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
        {/* 4. STATS METRICS (Mongzo Dark Accent Strip)                */}
        {/* ========================================================= */}
        <section className="bg-mongzo-dark text-white py-14 md:py-16 border-t border-neutral-800">
          <div className="container-page grid grid-cols-2 md:grid-cols-4 gap-8 text-center md:text-left">
            <div className="border-l-2 border-mongzo-green/60 pl-4 md:pl-6">
              <p className="text-3xl sm:text-4xl md:text-5xl font-bold text-mongzo-green tracking-tight font-Poppins">
                100K+
              </p>
              <p className="text-xs sm:text-sm text-slate-300 mt-1 font-medium">
                Travelers booked
              </p>
            </div>

            <div className="border-l-2 border-mongzo-green/60 pl-4 md:pl-6">
              <p className="text-3xl sm:text-4xl md:text-5xl font-bold text-mongzo-green tracking-tight font-Poppins">
                500+
              </p>
              <p className="text-xs sm:text-sm text-slate-300 mt-1 font-medium">
                Curated destinations
              </p>
            </div>

            <div className="border-l-2 border-white/40 pl-4 md:pl-6">
              <p className="text-3xl sm:text-4xl md:text-5xl font-bold text-white tracking-tight font-Poppins">
                24/7
              </p>
              <p className="text-xs sm:text-sm text-slate-300 mt-1 font-medium">
                Support in Bangla & English
              </p>
            </div>

            <div className="border-l-2 border-mongzo-green/60 pl-4 md:pl-6">
              <p className="text-3xl sm:text-4xl md:text-5xl font-bold text-mongzo-green tracking-tight font-Poppins">
                4.9/5
              </p>
              <p className="text-xs sm:text-sm text-slate-300 mt-1 font-medium">
                Average traveler rating
              </p>
            </div>
          </div>
        </section>

        {/* ========================================================= */}
        {/* 5. WHAT YOU GET WHEN YOU BOOK WITH MONGZO                  */}
        {/* ========================================================= */}
        <section className="py-20 md:py-28 bg-white">
          <div className="container-page">
            <div className="max-w-2xl mb-14">
              <span className="text-xs uppercase font-bold text-mongzo-greenDark tracking-wider block mb-1">
                Why Choose Us
              </span>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-mongzo-dark tracking-tight">
                What you get when you book with Mongzo
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10">
              {/* Feature 1 */}
              <div className="p-8 rounded-3xl bg-[#f5f5f5] border border-neutral-200/70 hover:border-mongzo-green/40 transition-colors">
                <div className="w-12 h-12 rounded-2xl bg-white text-mongzo-greenDark flex items-center justify-center shadow-sm mb-5">
                  <FaTags size={20} />
                </div>
                <h3 className="text-lg font-bold text-mongzo-dark">Clear & Transparent Prices</h3>
                <p className="text-sm text-neutral-600 mt-2 leading-relaxed">
                  The price you see is the price you pay. All taxes and booking fees are disclosed
                  upfront, and discounted deals show clear price comparisons.
                </p>
              </div>

              {/* Feature 2 */}
              <div className="p-8 rounded-3xl bg-[#f5f5f5] border border-neutral-200/70 hover:border-mongzo-green/40 transition-colors">
                <div className="w-12 h-12 rounded-2xl bg-white text-mongzo-greenDark flex items-center justify-center shadow-sm mb-5">
                  <FiCheckCircle size={22} />
                </div>
                <h3 className="text-lg font-bold text-mongzo-dark">Free Cancellation Options</h3>
                <p className="text-sm text-neutral-600 mt-2 leading-relaxed">
                  Look for the free cancellation badge on hotels and cars. Changing plans or adjusting
                  dates shouldn&apos;t penalize you.
                </p>
              </div>

              {/* Feature 3 */}
              <div className="p-8 rounded-3xl bg-[#f5f5f5] border border-neutral-200/70 hover:border-mongzo-green/40 transition-colors">
                <div className="w-12 h-12 rounded-2xl bg-white text-mongzo-greenDark flex items-center justify-center shadow-sm mb-5">
                  <FaHeadset size={20} />
                </div>
                <h3 className="text-lg font-bold text-mongzo-dark">Support in Your Language</h3>
                <p className="text-sm text-neutral-600 mt-2 leading-relaxed">
                  Connect with real human agents in Bangla or English via live chat, email, or direct
                  phone call at any point before, during, or after your trip.
                </p>
              </div>

              {/* Feature 4 */}
              <div className="p-8 rounded-3xl bg-[#f5f5f5] border border-neutral-200/70 hover:border-mongzo-green/40 transition-colors">
                <div className="w-12 h-12 rounded-2xl bg-white text-mongzo-greenDark flex items-center justify-center shadow-sm mb-5">
                  <FaShieldAlt size={20} />
                </div>
                <h3 className="text-lg font-bold text-mongzo-dark">Trusted & Secure Payments</h3>
                <p className="text-sm text-neutral-600 mt-2 leading-relaxed">
                  Pay with confidence in BDT, USD or EUR using bKash, Nagad, Visa, Mastercard, or
                  international debit/credit cards with bank-grade encryption.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ========================================================= */}
        {/* 6. THE PEOPLE BEHIND MONGZO                                */}
        {/* ========================================================= */}
        <section className="py-20 md:py-28 bg-mongzo-mist border-t border-neutral-200/70">
          <div className="container-page">
            <div className="text-center max-w-2xl mx-auto mb-16">
              <span className="text-xs uppercase font-bold text-mongzo-greenDark tracking-wider block mb-1">
                Our Team
              </span>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-mongzo-dark tracking-tight">
                The people behind Mongzo
              </h2>
              <p className="text-sm text-neutral-500 mt-2 font-medium">
                A dedicated, hands-on team committed to crafting your best journey.
              </p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {/* Member A */}
              <div className="flex flex-col items-center text-center p-6 rounded-3xl bg-white border border-neutral-200/80 shadow-sm transition-transform hover:-translate-y-1">
                <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-full bg-mongzo-dark text-mongzo-green flex items-center justify-center text-2xl font-bold shadow-md shadow-mongzo-dark/15 mb-4 border-2 border-mongzo-green/30">
                  F
                </div>
                <h4 className="text-base font-bold text-mongzo-dark">Fahim</h4>
                <p className="text-xs text-mongzo-greenDark font-semibold mt-0.5">Founder & CEO</p>
              </div>

              {/* Member B */}
              <div className="flex flex-col items-center text-center p-6 rounded-3xl bg-white border border-neutral-200/80 shadow-sm transition-transform hover:-translate-y-1">
                <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-full bg-mongzo-dark text-mongzo-green flex items-center justify-center text-2xl font-bold shadow-md shadow-mongzo-dark/15 mb-4 border-2 border-mongzo-green/30">
                  T
                </div>
                <h4 className="text-base font-bold text-mongzo-dark">Tanvir</h4>
                <p className="text-xs text-mongzo-greenDark font-semibold mt-0.5">Head of Operations</p>
              </div>

              {/* Member C */}
              <div className="flex flex-col items-center text-center p-6 rounded-3xl bg-white border border-neutral-200/80 shadow-sm transition-transform hover:-translate-y-1">
                <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-full bg-mongzo-dark text-mongzo-green flex items-center justify-center text-2xl font-bold shadow-md shadow-mongzo-dark/15 mb-4 border-2 border-mongzo-green/30">
                  A
                </div>
                <h4 className="text-base font-bold text-mongzo-dark">Arif</h4>
                <p className="text-xs text-mongzo-greenDark font-semibold mt-0.5">Lead Engineer</p>
              </div>

              {/* Member D */}
              <div className="flex flex-col items-center text-center p-6 rounded-3xl bg-white border border-neutral-200/80 shadow-sm transition-transform hover:-translate-y-1">
                <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-full bg-mongzo-dark text-mongzo-green flex items-center justify-center text-2xl font-bold shadow-md shadow-mongzo-dark/15 mb-4 border-2 border-mongzo-green/30">
                  S
                </div>
                <h4 className="text-base font-bold text-mongzo-dark">Sabrina</h4>
                <p className="text-xs text-mongzo-greenDark font-semibold mt-0.5">Customer Support Lead</p>
              </div>
            </div>
          </div>
        </section>

        {/* ========================================================= */}
        {/* 7. AIRLINES, HOTELS AND PAYMENT PARTNERS                   */}
        {/* ========================================================= */}
        <section className="py-16 bg-white border-t border-neutral-200/70">
          <div className="container-page">
            <span className="text-xs uppercase font-bold text-neutral-400 tracking-wider block mb-2 text-center md:text-left">
              Partners & Integrations
            </span>
            <h2 className="text-xl sm:text-2xl font-bold text-mongzo-dark tracking-tight mb-8 text-center md:text-left">
              Airlines, hotels and payment partners
            </h2>

            <div className="flex flex-wrap items-center justify-center md:justify-start gap-3 sm:gap-4 text-xs sm:text-sm text-neutral-700 font-medium">
              <span className="px-4 py-2.5 rounded-xl bg-mongzo-mist border border-neutral-200/80 hover:border-mongzo-green/50 transition-colors">
                ✈️ Biman Bangladesh
              </span>
              <span className="px-4 py-2.5 rounded-xl bg-mongzo-mist border border-neutral-200/80 hover:border-mongzo-green/50 transition-colors">
                ✈️ US-Bangla Airlines
              </span>
              <span className="px-4 py-2.5 rounded-xl bg-mongzo-mist border border-neutral-200/80 hover:border-mongzo-green/50 transition-colors">
                ✈️ Emirates
              </span>
              <span className="px-4 py-2.5 rounded-xl bg-mongzo-mist border border-neutral-200/80 hover:border-mongzo-green/50 transition-colors">
                ✈️ Qatar Airways
              </span>
              <span className="px-4 py-2.5 rounded-xl bg-mongzo-mist border border-neutral-200/80 hover:border-mongzo-green/50 transition-colors">
                💳 bKash
              </span>
              <span className="px-4 py-2.5 rounded-xl bg-mongzo-mist border border-neutral-200/80 hover:border-mongzo-green/50 transition-colors">
                💳 Nagad
              </span>
              <span className="px-4 py-2.5 rounded-xl bg-mongzo-mist border border-neutral-200/80 hover:border-mongzo-green/50 transition-colors">
                💳 Visa & Mastercard
              </span>
            </div>
          </div>
        </section>

        {/* ========================================================= */}
        {/* 8. BOTTOM CTA BANNER (Mongzo Signature Green / Dark)       */}
        {/* ========================================================= */}
        <section className="relative bg-mongzo-dark text-white py-16 md:py-20 overflow-hidden">
          {/* Subtle green ambient accent */}
          <div className="pointer-events-none absolute -bottom-20 right-0 w-[400px] h-[400px] bg-mongzo-green/15 rounded-full blur-[100px]" />

          <div className="container-page relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
            <div>
              <span className="inline-block px-3 py-1 rounded-full bg-mongzo-green/10 text-mongzo-green text-xs font-semibold uppercase tracking-wider mb-3 border border-mongzo-green/20">
                Start Exploring
              </span>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white tracking-tight leading-tight">
                Ready to plan your next trip?
              </h2>
              <p className="text-slate-300 text-sm mt-2 font-light">
                Find the best deals on flights, stays, cars and insurance worldwide.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-4">
              <Link
                href="/hotels"
                className="inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-xl bg-mongzo-green hover:bg-mongzo-greenDark active:scale-95 text-mongzo-dark font-bold text-sm transition-all shadow-lg shadow-mongzo-green/30"
              >
                <span>Find a stay</span>
                <FaArrowRight size={13} />
              </Link>
              <Link
                href="/flights"
                className="inline-flex items-center justify-center px-6 py-3.5 rounded-xl bg-white/10 hover:bg-white/15 border border-white/20 text-white font-medium text-sm transition-all"
              >
                Book Flights
              </Link>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}

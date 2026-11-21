"use client";
import React from "react";
import Link from "next/link";
import Image from "next/image";
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
                    src="https://images.unsplash.com/photo-1505228395891-9a51e7e86bf6?auto=format&fit=crop&w=1200&q=80"
                    alt="Tropical beach destination with Mongzo"
                    className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
                  />
                  {/* Subtle clean gradient at bottom */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent pointer-events-none" />

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

            <div className="max-w-5xl mx-auto space-y-8">
              {/* Member A — image left, content right */}
              <div className="grid grid-cols-1 lg:grid-cols-2 overflow-hidden rounded-3xl bg-white border border-neutral-200/80 shadow-sm">
                <div className="relative order-1 min-h-[320px] sm:min-h-[420px] lg:min-h-[480px]">
                  <Image
                    src="/assets/images/owner.jpeg"
                    alt="Mohammad Hanif"
                    fill
                    sizes="(max-width: 1024px) 100vw, 50vw"
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent pointer-events-none" />
                  <span className="absolute bottom-5 left-5 inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/95 backdrop-blur-md text-[11px] font-bold uppercase tracking-wider text-[#2563eb] shadow-sm">
                    Founder &amp; CEO
                  </span>
                </div>

                <div className="order-2 flex flex-col justify-center p-8 sm:p-10 lg:p-12">
                  <span className="text-xs uppercase font-bold text-[#2563eb] tracking-wider">
                    Leadership
                  </span>
                  <h3 className="text-2xl sm:text-3xl font-bold text-neutral-900 tracking-tight mt-1">
                    Mohammad Hanif
                  </h3>
                  <p className="text-sm sm:text-base text-[#2563eb] font-semibold mt-1">
                    Founder &amp; Ceo of Mongzo
                  </p>

                  <div className="mt-6 pl-5 border-l-2 border-[#2563eb]/30 space-y-3 text-sm sm:text-base text-neutral-600 leading-relaxed">
                    <p>
                      Mohammad Hanif is the Founder &amp; CEO of Mongzo.
                    </p>
                    <p>
                      With a clear vision and strong leadership, he built Mongzo
                      from an idea into a trusted brand.
                    </p>
                    <p>
                      He believes in honest work, quality service, and creating
                      real value for every customer. Under his guidance, Mongzo
                      Tours continues to grow with trust, innovation, and a
                      passion for creating unforgettable travel experiences.
                    </p>
                  </div>
                </div>
              </div>

              {/* Member B — content left, image right */}
              <div className="grid grid-cols-1 lg:grid-cols-2 overflow-hidden rounded-3xl bg-white border border-neutral-200/80 shadow-sm">
                <div className="relative order-1 lg:order-2 min-h-[320px] sm:min-h-[420px] lg:min-h-[480px]">
                  <Image
                    src="/assets/images/head_of_operations.jpeg"
                    alt="Kawsar Ahmed"
                    fill
                    sizes="(max-width: 1024px) 100vw, 50vw"
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent pointer-events-none" />
                  <span className="absolute bottom-5 left-5 inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/95 backdrop-blur-md text-[11px] font-bold uppercase tracking-wider text-[#2563eb] shadow-sm">
                    Head of Operation
                  </span>
                </div>

                <div className="order-2 lg:order-1 flex flex-col justify-center p-8 sm:p-10 lg:p-12">
                  <span className="text-xs uppercase font-bold text-[#2563eb] tracking-wider">
                    Operations
                  </span>
                  <h3 className="text-2xl sm:text-3xl font-bold text-neutral-900 tracking-tight mt-1">
                    Kawsar Ahmed
                  </h3>
                  <p className="text-sm sm:text-base text-[#2563eb] font-semibold mt-1">
                    Head of Operation
                  </p>

                  <div className="mt-6 pl-5 border-l-2 border-[#2563eb]/30 space-y-3 text-sm sm:text-base text-neutral-600 leading-relaxed">
                    <p>
                      Kawsar Ahmed is the Owner of Webgen IT and the person
                      behind the complete maintenance of Mongzo Website.
                    </p>
                    <p>
                      He manages the full structure, planning, and day-to-day
                      operations.
                    </p>
                    <p>
                      He ensures everything runs smoothly, deciding what is
                      needed now and what can wait.
                    </p>
                  </div>
                </div>
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
        {/* 8. BOTTOM CTA BANNER (Clean Light/Neutral Container)       */}
        {/* ========================================================= */}
        <section className="py-16 md:py-20 bg-white border-t border-neutral-100">
          <div className="container-page">
            <div className="relative overflow-hidden rounded-[28px] sm:rounded-[36px] bg-[#f5f5f5] border border-neutral-200/80 p-8 sm:p-12 md:p-14 shadow-sm flex flex-col md:flex-row items-start md:items-center justify-between gap-8 transition-all">
              <div className="max-w-xl">
                <span className="inline-block px-3 py-1 rounded-full bg-blue-50 text-[#2563eb] border border-blue-200/60 text-xs font-bold uppercase tracking-wider mb-3">
                  Start Exploring
                </span>
                <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-neutral-900 tracking-tight leading-tight">
                  Ready to plan your next trip?
                </h2>
                <p className="text-neutral-600 text-sm mt-2 font-normal">
                  Find the best deals on flights, stays, cars and insurance worldwide with instant booking.
                </p>
              </div>

              <div className="flex flex-wrap items-center gap-3.5">
                <Link
                  href="/hotels"
                  className="inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-full bg-[#2563eb] hover:bg-[#1d4ed8] active:scale-95 text-white font-bold text-sm transition-all shadow-md shadow-blue-500/20"
                >
                  <span>Find a stay</span>
                  <FaArrowRight size={13} />
                </Link>
                <Link
                  href="/flights"
                  className="inline-flex items-center justify-center px-6 py-3.5 rounded-full bg-white hover:bg-neutral-50 border border-neutral-300 text-neutral-800 font-semibold text-sm transition-all shadow-sm"
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

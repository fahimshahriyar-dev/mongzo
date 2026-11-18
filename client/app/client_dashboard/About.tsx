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
  FaRegCreditCard,
  FaTags,
} from "react-icons/fa";

export default function About() {
  return (
    <div className="min-h-screen bg-[#FDFCFB] text-slate-800 font-Poppins flex flex-col selection:bg-amber-100 selection:text-amber-900">
      <Navbar />

      <main className="flex-1">
        {/* ========================================================= */}
        {/* 1. HERO SECTION (Dark Blue / Deep Teal background) */}
        {/* ========================================================= */}
        <section className="relative bg-[#0d2a33] text-white overflow-hidden pt-28 pb-16 md:pt-36 md:pb-24">
          {/* Subtle radial ambient glow */}
          <div className="pointer-events-none absolute -top-40 right-0 w-[550px] h-[550px] bg-sky-500/10 rounded-full blur-3xl" />
          <div className="pointer-events-none absolute bottom-0 left-0 w-[450px] h-[450px] bg-emerald-500/10 rounded-full blur-3xl" />

          <div className="container-page relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 items-center">
            {/* Left Content */}
            <div className="lg:col-span-6 space-y-6">
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-[54px] font-bold text-white tracking-tight leading-[1.12]">
                Every trip you <br className="hidden sm:block" />
                take, booked in <br className="hidden sm:block" />
                one place.
              </h1>

              <p className="text-slate-300 text-sm sm:text-base leading-relaxed max-w-lg">
                Mongzo brings hotels, apartments, flights and cars together,
                with support from people who know Bangladesh and the places you want to go.
              </p>

              <div className="pt-2">
                <Link
                  href="/hotels"
                  className="inline-flex items-center justify-center px-6 py-3.5 rounded-xl bg-[#F4B436] hover:bg-[#e2a42b] active:scale-[0.98] text-slate-950 font-semibold text-sm transition-all shadow-lg shadow-amber-500/20"
                >
                  Find a stay
                </Link>
              </div>
            </div>

            {/* Right Arch Image with Travel Pin Dot */}
            <div className="lg:col-span-6 flex justify-center lg:justify-end">
              <div className="relative w-full max-w-[480px]">
                {/* Arch-shaped container */}
                <div className="relative aspect-[4/3.8] rounded-t-[200px] rounded-b-2xl overflow-hidden border border-white/10 shadow-2xl bg-slate-900">
                  <img
                    src="https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=1200&q=80"
                    alt="Luxury Resort and Pool"
                    className="w-full h-full object-cover"
                  />
                  {/* Subtle lighting overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent pointer-events-none" />

                  {/* Curving dashed journey path + amber locator dot */}
                  <svg
                    className="absolute inset-0 w-full h-full pointer-events-none"
                    viewBox="0 0 400 380"
                    fill="none"
                  >
                    <path
                      d="M 120 300 Q 240 180 300 100"
                      stroke="#F4B436"
                      strokeWidth="2.5"
                      strokeDasharray="6 6"
                      strokeLinecap="round"
                      opacity="0.85"
                    />
                    <circle cx="300" cy="100" r="7" fill="#F4B436" />
                    <circle cx="300" cy="100" r="13" stroke="#F4B436" strokeWidth="2" opacity="0.4" />
                    <circle cx="120" cy="300" r="5" fill="#F4B436" />
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ========================================================= */}
        {/* 2. WHY WE STARTED MONGZO */}
        {/* ========================================================= */}
        <section className="py-16 md:py-24 bg-white border-b border-slate-100">
          <div className="container-page grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14">
            {/* Left Title & Hook */}
            <div className="lg:col-span-5">
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-slate-900 tracking-tight">
                Why we started Mongzo
              </h2>

              <div className="mt-5 pl-4 border-l-4 border-[#F4B436]">
                <p className="text-base sm:text-lg font-medium text-slate-700 leading-snug">
                  Planning a trip should not need ten tabs and three phone calls.
                </p>
              </div>
            </div>

            {/* Right Story Paragraphs */}
            <div className="lg:col-span-7 space-y-5 text-slate-600 text-sm sm:text-base leading-relaxed">
              <p>
                Travelers in Bangladesh have long had to juggle disparate websites to compare
                flights, message multiple hotel properties directly, check car rentals, and still
                make phone calls just to verify a reservation.
              </p>
              <p>
                We built Mongzo to unify the entire journey under one clean, transparent platform.
                Whether you need a quick domestic flight, a serene retreat in Sylhet or Cox&apos;s
                Bazar, or a seamless international itinerary, Mongzo provides verified properties,
                upfront rates without surprise fees, and local human customer support ready to assist
                at every step.
              </p>
            </div>
          </div>
        </section>

        {/* ========================================================= */}
        {/* 3. WHAT YOU CAN BOOK WITH US */}
        {/* ========================================================= */}
        <section className="py-16 md:py-20 bg-[#F4F7F9]">
          <div className="container-page">
            <div className="mb-10">
              <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
                What you can book with us
              </h2>
              <p className="text-sm text-slate-500 mt-1 font-medium">
                Four things, one account, one support team.
              </p>
            </div>

            {/* List Table / Rows */}
            <div className="divide-y divide-slate-200/80 border-y border-slate-200/80 bg-white rounded-2xl shadow-sm px-6 sm:px-8">
              {/* Hotels */}
              <div className="py-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div className="md:w-1/4 flex items-center gap-3">
                  <div className="w-9 h-9 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center">
                    <FaHotel size={16} />
                  </div>
                  <span className="text-base font-bold text-slate-900">Hotels</span>
                </div>
                <div className="md:w-1/2">
                  <p className="text-sm text-slate-600">
                    Resorts, boutique stays and city hotels with free cancellation on many rooms.
                  </p>
                </div>
                <div className="md:w-1/4 md:text-right">
                  <Link
                    href="/hotels"
                    className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#0d2a33] hover:text-[#00B84E] transition-colors"
                  >
                    <span>Browse hotels</span>
                    <FiArrowRight size={14} />
                  </Link>
                </div>
              </div>

              {/* Apartments */}
              <div className="py-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div className="md:w-1/4 flex items-center gap-3">
                  <div className="w-9 h-9 rounded-lg bg-sky-50 text-sky-600 flex items-center justify-center">
                    <FaBuilding size={16} />
                  </div>
                  <span className="text-base font-bold text-slate-900">Apartments</span>
                </div>
                <div className="md:w-1/2">
                  <p className="text-sm text-slate-600">
                    Furnished places with a kitchen, for longer trips or family stays.
                  </p>
                </div>
                <div className="md:w-1/4 md:text-right">
                  <Link
                    href="/hotels"
                    className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#0d2a33] hover:text-[#00B84E] transition-colors"
                  >
                    <span>Browse apartments</span>
                    <FiArrowRight size={14} />
                  </Link>
                </div>
              </div>

              {/* Flights */}
              <div className="py-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div className="md:w-1/4 flex items-center gap-3">
                  <div className="w-9 h-9 rounded-lg bg-amber-50 text-amber-600 flex items-center justify-center">
                    <FaPlane size={16} />
                  </div>
                  <span className="text-base font-bold text-slate-900">Flights</span>
                </div>
                <div className="md:w-1/2">
                  <p className="text-sm text-slate-600">
                    Compare fares across airlines for domestic and international routes.
                  </p>
                </div>
                <div className="md:w-1/4 md:text-right">
                  <Link
                    href="/flights"
                    className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#0d2a33] hover:text-[#00B84E] transition-colors"
                  >
                    <span>Search flights</span>
                    <FiArrowRight size={14} />
                  </Link>
                </div>
              </div>

              {/* Cars */}
              <div className="py-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div className="md:w-1/4 flex items-center gap-3">
                  <div className="w-9 h-9 rounded-lg bg-indigo-50 text-indigo-600 flex items-center justify-center">
                    <FaCar size={16} />
                  </div>
                  <span className="text-base font-bold text-slate-900">Cars</span>
                </div>
                <div className="md:w-1/2">
                  <p className="text-sm text-slate-600">
                    Cars with or without a driver, picked up where you land.
                  </p>
                </div>
                <div className="md:w-1/4 md:text-right">
                  <Link
                    href="/cars"
                    className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#0d2a33] hover:text-[#00B84E] transition-colors"
                  >
                    <span>Find a car</span>
                    <FiArrowRight size={14} />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ========================================================= */}
        {/* 4. STATS BANNER (Dark Strip) */}
        {/* ========================================================= */}
        <section className="bg-[#0d2a33] text-white py-12 md:py-14 border-t border-slate-800">
          <div className="container-page grid grid-cols-2 md:grid-cols-4 gap-8 text-center md:text-left">
            <div>
              <p className="text-3xl sm:text-4xl font-bold text-[#F4B436] tracking-tight">
                100K+
              </p>
              <p className="text-xs sm:text-sm text-slate-300 mt-1 font-medium">
                Travelers booked
              </p>
            </div>

            <div>
              <p className="text-3xl sm:text-4xl font-bold text-[#F4B436] tracking-tight">
                500+
              </p>
              <p className="text-xs sm:text-sm text-slate-300 mt-1 font-medium">
                Destinations
              </p>
            </div>

            <div>
              <p className="text-3xl sm:text-4xl font-bold text-white tracking-tight">
                24/7
              </p>
              <p className="text-xs sm:text-sm text-slate-300 mt-1 font-medium">
                Support, in Bangla and English
              </p>
            </div>

            <div>
              <p className="text-3xl sm:text-4xl font-bold text-[#F4B436] tracking-tight">
                4.9
              </p>
              <p className="text-xs sm:text-sm text-slate-300 mt-1 font-medium">
                Average guest rating
              </p>
            </div>
          </div>
        </section>

        {/* ========================================================= */}
        {/* 5. WHAT YOU GET WHEN YOU BOOK WITH MONGZO */}
        {/* ========================================================= */}
        <section className="py-16 md:py-24 bg-white">
          <div className="container-page">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-slate-900 tracking-tight mb-12">
              What you get when you book with Mongzo
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-10">
              {/* Feature 1 */}
              <div className="space-y-2">
                <div className="flex items-center gap-2.5">
                  <FaTags className="text-[#00B84E]" />
                  <h3 className="text-lg font-bold text-slate-900">Clear prices</h3>
                </div>
                <p className="text-sm text-slate-600 leading-relaxed pl-6">
                  The price you see includes the fees we know about. Deals show the original price next to the new one.
                </p>
              </div>

              {/* Feature 2 */}
              <div className="space-y-2">
                <div className="flex items-center gap-2.5">
                  <FiCheckCircle className="text-[#00B84E]" />
                  <h3 className="text-lg font-bold text-slate-900">Free cancellation on many stays</h3>
                </div>
                <p className="text-sm text-slate-600 leading-relaxed pl-6">
                  Look for the label on each room. Changing plans should not cost you.
                </p>
              </div>

              {/* Feature 3 */}
              <div className="space-y-2">
                <div className="flex items-center gap-2.5">
                  <FaHeadset className="text-[#00B84E]" />
                  <h3 className="text-lg font-bold text-slate-900">Support in your language</h3>
                </div>
                <p className="text-sm text-slate-600 leading-relaxed pl-6">
                  Reach us in Bangla or English at any hour, before and during your trip.
                </p>
              </div>

              {/* Feature 4 */}
              <div className="space-y-2">
                <div className="flex items-center gap-2.5">
                  <FaShieldAlt className="text-[#00B84E]" />
                  <h3 className="text-lg font-bold text-slate-900">Secure payment</h3>
                </div>
                <p className="text-sm text-slate-600 leading-relaxed pl-6">
                  Pay in BDT, USD or EUR through trusted payment partners including bKash, Nagad, Visa and Mastercard.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ========================================================= */}
        {/* 6. THE PEOPLE BEHIND MONGZO */}
        {/* ========================================================= */}
        <section className="py-16 md:py-24 bg-[#F2F7FA] border-t border-slate-100">
          <div className="container-page">
            <div className="mb-12">
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-slate-900 tracking-tight">
                The people behind Mongzo
              </h2>
              <p className="text-sm text-slate-500 mt-2 font-medium">
                A dedicated team that answers your messages.
              </p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {/* Member A */}
              <div className="flex flex-col items-center text-center">
                <div className="w-28 h-28 sm:w-32 sm:h-32 rounded-full bg-[#0d2a33] text-[#F4B436] flex items-center justify-center text-2xl font-bold shadow-lg shadow-slate-900/10 mb-4 transition-transform hover:scale-105">
                  F
                </div>
                <h4 className="text-base font-bold text-slate-900">Fahim</h4>
                <p className="text-xs text-slate-500 font-medium mt-0.5">Founder & CEO</p>
              </div>

              {/* Member B */}
              <div className="flex flex-col items-center text-center">
                <div className="w-28 h-28 sm:w-32 sm:h-32 rounded-full bg-[#0d2a33] text-[#F4B436] flex items-center justify-center text-2xl font-bold shadow-lg shadow-slate-900/10 mb-4 transition-transform hover:scale-105">
                  T
                </div>
                <h4 className="text-base font-bold text-slate-900">Tanvir</h4>
                <p className="text-xs text-slate-500 font-medium mt-0.5">Head of Operations</p>
              </div>

              {/* Member C */}
              <div className="flex flex-col items-center text-center">
                <div className="w-28 h-28 sm:w-32 sm:h-32 rounded-full bg-[#0d2a33] text-[#F4B436] flex items-center justify-center text-2xl font-bold shadow-lg shadow-slate-900/10 mb-4 transition-transform hover:scale-105">
                  A
                </div>
                <h4 className="text-base font-bold text-slate-900">Arif</h4>
                <p className="text-xs text-slate-500 font-medium mt-0.5">Lead Engineer</p>
              </div>

              {/* Member D */}
              <div className="flex flex-col items-center text-center">
                <div className="w-28 h-28 sm:w-32 sm:h-32 rounded-full bg-[#0d2a33] text-[#F4B436] flex items-center justify-center text-2xl font-bold shadow-lg shadow-slate-900/10 mb-4 transition-transform hover:scale-105">
                  S
                </div>
                <h4 className="text-base font-bold text-slate-900">Sabrina</h4>
                <p className="text-xs text-slate-500 font-medium mt-0.5">Customer Support Lead</p>
              </div>
            </div>
          </div>
        </section>

        {/* ========================================================= */}
        {/* 7. AIRLINES, HOTELS AND PAYMENT PARTNERS */}
        {/* ========================================================= */}
        <section className="py-14 bg-white border-t border-slate-100">
          <div className="container-page">
            <h2 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight mb-6">
              Airlines, hotels and payment partners
            </h2>

            <div className="flex flex-wrap items-center gap-4 sm:gap-8 text-sm text-slate-500 font-medium">
              <span className="px-3.5 py-1.5 rounded-lg bg-slate-100 text-slate-700">Biman Bangladesh</span>
              <span className="px-3.5 py-1.5 rounded-lg bg-slate-100 text-slate-700">US-Bangla</span>
              <span className="px-3.5 py-1.5 rounded-lg bg-slate-100 text-slate-700">Emirates</span>
              <span className="px-3.5 py-1.5 rounded-lg bg-slate-100 text-slate-700">Qatar Airways</span>
              <span className="px-3.5 py-1.5 rounded-lg bg-slate-100 text-slate-700">bKash</span>
              <span className="px-3.5 py-1.5 rounded-lg bg-slate-100 text-slate-700">Nagad</span>
              <span className="px-3.5 py-1.5 rounded-lg bg-slate-100 text-slate-700">Visa / Mastercard</span>
            </div>
          </div>
        </section>

        {/* ========================================================= */}
        {/* 8. BOTTOM CTA BANNER (Amber Yellow Theme) */}
        {/* ========================================================= */}
        <section className="bg-[#F4B436] py-14 md:py-16">
          <div className="container-page flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <div>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-slate-950 tracking-tight">
                Ready to plan your next <br className="hidden sm:block" />
                trip?
              </h2>
            </div>

            <Link
              href="/hotels"
              className="inline-flex items-center justify-center px-7 py-3.5 rounded-xl bg-[#0d2a33] hover:bg-[#081e25] text-white font-semibold text-sm transition-all shadow-md active:scale-95"
            >
              Find a stay
            </Link>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}

"use client";

import React, { useState } from "react";
import Link from "next/link";
import Navbar from "../../client_dashboard/components/Navbar";
import Footer from "../../client_dashboard/components/Footer";

interface DestinationItem {
  city: string;
  country: string;
}

const CATEGORIES = [
  "Popular",
  "Arts & culture",
  "Beach",
  "Mountains",
] as const;

type CategoryType = (typeof CATEGORIES)[number];

const DESTINATIONS_DATA: Record<CategoryType, DestinationItem[]> = {
  Popular: [
    { city: "Paris", country: "France" },
    { city: "Tokyo", country: "Japan" },
  ],
  "Arts & culture": [
    { city: "Rome", country: "Italy" },
    { city: "Kyoto", country: "Japan" },
  ],
  Beach: [
    { city: "Cox's Bazar", country: "Bangladesh" },
    { city: "Maldives", country: "Maldives" },
  ],
  Mountains: [
    { city: "Zermatt", country: "Switzerland" },
    { city: "Aspen", country: "United States" },
  ],
};

export default function Suggestions() {
  const [activeTab, setActiveTab] = useState<CategoryType>("Popular");

  const currentList = DESTINATIONS_DATA[activeTab] || [];

  return (
    <div className="min-h-screen bg-white text-neutral-900 font-Poppins flex flex-col selection:bg-blue-100 selection:text-blue-900">
      <Navbar />

      <main className="flex-1 pt-24 pb-20">
        <div className="container-page">
          {/* Section Heading */}
          <div className="pt-8 pb-4">
            <h1 className="text-xl sm:text-2xl font-bold text-neutral-900 tracking-tight">
              Inspiration for future getaways
            </h1>
          </div>

          {/* Navigation Category Tabs */}
          <div className="border-b border-neutral-200">
            <div className="flex items-center gap-6 sm:gap-8 overflow-x-auto no-scrollbar py-2 text-sm">
              {CATEGORIES.map((cat) => {
                const isActive = activeTab === cat;
                return (
                  <button
                    key={cat}
                    onClick={() => setActiveTab(cat)}
                    className={`whitespace-nowrap pb-3 text-sm transition-colors relative font-medium ${
                      isActive
                        ? "text-neutral-900 font-semibold"
                        : "text-neutral-500 hover:text-neutral-800"
                    }`}
                  >
                    {cat}
                    {isActive && (
                      <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-neutral-900 rounded-full" />
                    )}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Destinations Grid (City name on top, Country name directly below it) */}
          <div className="pt-8">
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-x-8 gap-y-6 text-sm">
              {currentList.map((item, idx) => {
                const targetHref =
                  item.city.toLowerCase().includes("cox")
                    ? `/travel-guides/city?destination=${encodeURIComponent(item.city)}&country=${encodeURIComponent(item.country)}`
                    : `/hotels?destination=${encodeURIComponent(item.city)}`;

                return (
                  <Link
                    key={`${item.city}-${idx}`}
                    href={targetHref}
                    className="group block"
                  >
                    <p className="font-semibold text-neutral-900 group-hover:text-[#2563eb] transition-colors leading-tight">
                      {item.city}
                    </p>
                    <p className="text-xs text-neutral-500 mt-1 leading-snug">
                      {item.country}
                    </p>
                  </Link>
                );
              })}
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}

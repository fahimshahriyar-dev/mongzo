"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import Navbar from "../../client_dashboard/components/Navbar";
import Footer from "../../client_dashboard/components/Footer";
import { FaSearch, FaTimes } from "react-icons/fa";

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
  const [searchQuery, setSearchQuery] = useState("");

  const currentList = DESTINATIONS_DATA[activeTab] || [];

  // Filter based on search query (matches city name or country name)
  const filteredList = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    if (!q) return currentList;
    return currentList.filter(
      (item) =>
        item.city.toLowerCase().includes(q) ||
        item.country.toLowerCase().includes(q)
    );
  }, [currentList, searchQuery]);

  return (
    <div className="min-h-screen bg-white text-neutral-900 font-Poppins flex flex-col selection:bg-blue-100 selection:text-blue-900">
      <Navbar />

      <main className="flex-1 pt-24 pb-20">
        <div className="container-page">
          {/* Section Heading & Search Bar */}
          <div className="pt-8 pb-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <h1 className="text-xl sm:text-2xl font-bold text-neutral-900 tracking-tight">
                Inspiration for future getaways
              </h1>
              <p className="text-xs text-neutral-500 mt-1 font-normal">
                Discover curated destinations, vacation stays, and iconic travel spots
              </p>
            </div>

            {/* Search Bar */}
            <div className="relative w-full md:w-80">
              <FaSearch className="absolute left-3.5 top-1/2 -translate-y-1/2 text-neutral-400 text-sm" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search city or country..."
                className="w-full pl-10 pr-9 py-2.5 rounded-full border border-neutral-200 bg-[#f5f5f5] focus:bg-white text-xs sm:text-sm text-neutral-900 placeholder-neutral-400 outline-none focus:border-[#2563eb] focus:ring-2 focus:ring-[#2563eb]/15 transition-all shadow-sm"
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery("")}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-neutral-600 text-xs"
                >
                  <FaTimes />
                </button>
              )}
            </div>
          </div>

          {/* Navigation Category Tabs */}
          <div className="border-b border-neutral-200">
            <div className="flex items-center gap-6 sm:gap-8 overflow-x-auto no-scrollbar py-2 text-sm">
              {CATEGORIES.map((cat) => {
                const isActive = activeTab === cat;
                return (
                  <button
                    key={cat}
                    onClick={() => {
                      setActiveTab(cat);
                    }}
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

          {/* Destinations Grid */}
          <div className="pt-8">
            {filteredList.length === 0 ? (
              <div className="py-12 text-center text-neutral-400 text-sm">
                No destinations found in {activeTab} matching &quot;{searchQuery}&quot;
              </div>
            ) : (
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-x-8 gap-y-6 text-sm">
                {filteredList.map((item, idx) => {
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
            )}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}

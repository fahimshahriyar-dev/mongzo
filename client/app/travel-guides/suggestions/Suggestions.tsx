"use client";

import React, { useState } from "react";
import Link from "next/link";
import Navbar from "../../client_dashboard/components/Navbar";
import Footer from "../../client_dashboard/components/Footer";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";

interface DestinationItem {
  city: string;
  type: string;
  href?: string;
}

const CATEGORIES = [
  "Popular",
  "Arts & culture",
  "Beach",
  "Mountains",
  "Outdoors",
  "Things to do",
  "Travel tips & inspiration",
  "Airbnb-friendly apartments",
] as const;

type CategoryType = (typeof CATEGORIES)[number];

const DESTINATIONS_DATA: Record<CategoryType, DestinationItem[]> = {
  Popular: [
    { city: "Dallas", type: "House rentals" },
    { city: "Raleigh", type: "House rentals" },
    { city: "Milan", type: "Monthly Rentals" },
    { city: "San Juan", type: "Apartment rentals" },
    { city: "West Palm Beach", type: "Apartment rentals" },
    { city: "Florida Keys", type: "Vacation rentals" },
    { city: "San Jose", type: "Apartment rentals" },
    { city: "Santo Domingo", type: "Condo rentals" },
    { city: "Pittsburgh", type: "Apartment rentals" },
    { city: "Chicago", type: "Apartment rentals" },
    { city: "Memphis", type: "Apartment rentals" },
    { city: "Athens", type: "Condo rentals" },
    { city: "Sacramento", type: "House rentals" },
    { city: "Jersey City", type: "House rentals" },
    { city: "St. Petersburg", type: "Apartment rentals" },
    { city: "London", type: "Villa rentals" },
    { city: "Charlotte", type: "Monthly Rentals" },
    // Expanded items
    { city: "Orlando", type: "Villa rentals" },
    { city: "Austin", type: "Cabin rentals" },
    { city: "Houston", type: "House rentals" },
    { city: "Tokyo", type: "Apartment rentals" },
    { city: "Barcelona", type: "Flat rentals" },
    { city: "Paris", type: "Apartment rentals" },
  ],
  "Arts & culture": [
    { city: "Florence", type: "Apartment rentals" },
    { city: "Rome", type: "Villa rentals" },
    { city: "Vienna", type: "House rentals" },
    { city: "Prague", type: "Condo rentals" },
    { city: "Amsterdam", type: "Canal house rentals" },
    { city: "Berlin", type: "Loft rentals" },
    { city: "Kyoto", type: "Machiya stays" },
    { city: "Edinburgh", type: "Townhouse rentals" },
    { city: "Santa Fe", type: "Adobe stays" },
    { city: "Mexico City", type: "Apartment rentals" },
    { city: "Barcelona", type: "Historic apartments" },
    { city: "Seville", type: "Patio homes" },
  ],
  Beach: [
    { city: "Cox's Bazar", type: "Beachfront hotels" },
    { city: "Cancun", type: "Resort rentals" },
    { city: "Maldives", type: "Overwater villas" },
    { city: "Phuket", type: "Pool villas" },
    { city: "Bali", type: "Luxury beach retreats" },
    { city: "Maui", type: "Condo rentals" },
    { city: "Mykonos", type: "Sea-view villas" },
    { city: "Santorini", type: "Cliffside suites" },
    { city: "Gold Coast", type: "Apartment rentals" },
    { city: "Dubai", type: "Beach resort stays" },
    { city: "Punta Cana", type: "All-inclusive stays" },
    { city: "Nice", type: "French Riviera rentals" },
  ],
  Mountains: [
    { city: "Zermatt", type: "Chalet rentals" },
    { city: "Aspen", type: "Ski chalets" },
    { city: "Banff", type: "Mountain lodges" },
    { city: "Interlaken", type: "Alpine cabins" },
    { city: "Whistler", type: "Resort condos" },
    { city: "Lake Tahoe", type: "Cabin rentals" },
    { city: "Chamonix", type: "Alpine chalets" },
    { city: "Queenstown", type: "Lake & mountain stays" },
    { city: "Park City", type: "Ski-in ski-out homes" },
    { city: "Darjeeling", type: "Hill station estates" },
    { city: "Pokhara", type: "Himalayan retreats" },
    { city: "Bariloche", type: "Lakeside cabins" },
  ],
  Outdoors: [
    { city: "Yellowstone", type: "Cabin rentals" },
    { city: "Yosemite", type: "Lodge stays" },
    { city: "Grand Canyon", type: "Camp & lodge" },
    { city: "Sedona", type: "Red rock retreats" },
    { city: "Moab", type: "Desert villas" },
    { city: "Reykjavik", type: "Northern lights cottages" },
    { city: "Queenstown", type: "Adventure lodges" },
    { city: "Patagonia", type: "Eco-domes" },
    { city: "Kruger", type: "Safari lodges" },
    { city: "Sylhet", type: "Tea garden resorts" },
    { city: "Srimangal", type: "Forest eco-resorts" },
    { city: "Bandarban", type: "Hill cottages" },
  ],
  "Things to do": [
    { city: "Tokyo", type: "Food & culture tours" },
    { city: "Bangkok", type: "Night market guides" },
    { city: "Singapore", type: "Attraction tickets" },
    { city: "New York", type: "Broadway & skyline" },
    { city: "London", type: "Museums & palaces" },
    { city: "Dubai", type: "Desert safaris" },
    { city: "Istanbul", type: "Bosphorus cruises" },
    { city: "Cairo", type: "Pyramid expeditions" },
    { city: "Las Vegas", type: "Shows & experiences" },
    { city: "Orlando", type: "Theme park passes" },
    { city: "Kuala Lumpur", type: "Skybridge visits" },
    { city: "Dhaka", type: "Heritage walking tours" },
  ],
  "Travel tips & inspiration": [
    { city: "Family Vacations", type: "Planning checklists" },
    { city: "Solo Travel", type: "Safety & city guides" },
    { city: "Budget Travel", type: "Cheap flight hacks" },
    { city: "Luxury Escapes", type: "VIP concierge perks" },
    { city: "Packing Guides", type: "Carry-on essentials" },
    { city: "Visa Requirements", type: "Country entry rules" },
    { city: "Digital Nomads", type: "Top remote work hubs" },
    { city: "Road Trips", type: "Scenic highway routes" },
    { city: "Weekend Breaks", type: "Quick 48h itineraries" },
    { city: "Travel Insurance", type: "Emergency coverage" },
  ],
  "Airbnb-friendly apartments": [
    { city: "Miami", type: "Part-time hosting buildings" },
    { city: "Austin", type: "Downtown loft buildings" },
    { city: "Phoenix", type: "Resort-style complexes" },
    { city: "Nashville", type: "Music row condos" },
    { city: "Atlanta", type: "Beltline apartments" },
    { city: "Denver", type: "LoDo urban lofts" },
    { city: "Houston", type: "Galleria high-rises" },
    { city: "Seattle", type: "South Lake Union flats" },
    { city: "San Diego", type: "Gaslamp residences" },
    { city: "Tampa", type: "Waterfront apartments" },
    { city: "Dallas", type: "Uptown residences" },
    { city: "Charlotte", type: "South End apartments" },
  ],
};

export default function Suggestions() {
  const [activeTab, setActiveTab] = useState<CategoryType>("Popular");
  const [isExpanded, setIsExpanded] = useState(false);

  const currentList = DESTINATIONS_DATA[activeTab] || [];
  // Initially show up to 17 items (leaving slot 18 for "Show more")
  const displayedItems = isExpanded ? currentList : currentList.slice(0, 17);
  const hasMore = currentList.length > 17;

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

          {/* Navigation Category Tabs with horizontal scrollbar if needed */}
          <div className="border-b border-neutral-200">
            <div className="flex items-center gap-6 sm:gap-8 overflow-x-auto no-scrollbar py-2 text-sm">
              {CATEGORIES.map((cat) => {
                const isActive = activeTab === cat;
                return (
                  <button
                    key={cat}
                    onClick={() => {
                      setActiveTab(cat);
                      setIsExpanded(false);
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

          {/* Destinations Grid (6 columns on desktop matching the image layout) */}
          <div className="pt-8">
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-x-6 gap-y-6 text-sm">
              {displayedItems.map((item, idx) => (
                <Link
                  key={`${item.city}-${idx}`}
                  href={`/hotels?destination=${encodeURIComponent(item.city)}`}
                  className="group block"
                >
                  <p className="font-semibold text-neutral-900 group-hover:text-[#2563eb] transition-colors leading-tight">
                    {item.city}
                  </p>
                  <p className="text-xs text-neutral-500 mt-0.5 leading-snug">
                    {item.type}
                  </p>
                </Link>
              ))}

              {/* "Show more" / "Show less" Toggle button */}
              {hasMore && (
                <button
                  type="button"
                  onClick={() => setIsExpanded(!isExpanded)}
                  className="text-left font-semibold text-neutral-900 hover:text-[#2563eb] transition-colors flex items-center gap-1.5 self-start group pt-0.5"
                >
                  <span>{isExpanded ? "Show less" : "Show more"}</span>
                  {isExpanded ? (
                    <FaChevronUp size={11} className="text-neutral-600 group-hover:text-[#2563eb] transition-colors" />
                  ) : (
                    <FaChevronDown size={11} className="text-neutral-600 group-hover:text-[#2563eb] transition-colors" />
                  )}
                </button>
              )}
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}

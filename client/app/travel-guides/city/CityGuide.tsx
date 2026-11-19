"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import Navbar from "../../client_dashboard/components/Navbar";
import Footer from "../../client_dashboard/components/Footer";
import {
  FaSearch,
  FaMapMarkerAlt,
  FaStar,
  FaCalendarAlt,
  FaUserFriends,
  FaExchangeAlt,
  FaChevronRight,
  FaTimes,
  FaCheck,
  FaArrowRight,
} from "react-icons/fa";
import { IoSparklesOutline } from "react-icons/io5";

// All 4 categories & data from Suggestions page for the Change Location modal
const SUGGESTIONS_CATEGORIES = [
  "Popular",
  "Arts & culture",
  "Beach",
  "Mountains",
] as const;

type CategoryType = (typeof SUGGESTIONS_CATEGORIES)[number];

const SUGGESTIONS_DATA: Record<CategoryType, { city: string; country: string }[]> = {
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

// Top hotels in Cox's Bazar
const COX_HOTELS = [
  {
    id: 101,
    name: "Sayeman Beach Resort",
    stars: 5,
    area: "Marine Drive, Kolatoli",
    rating: 9.1,
    reviews: 1420,
    price: 110,
    originalPrice: 135,
    tag: "Best Seller",
    image:
      "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=700&q=80",
    features: ["Infinity Pool", "Ocean View", "Free Breakfast", "Private Beach"],
  },
  {
    id: 102,
    name: "Long Beach Hotel",
    stars: 5,
    area: "Kolatoli Beach Road",
    rating: 8.8,
    reviews: 980,
    price: 85,
    originalPrice: 105,
    tag: "Free Cancellation",
    image:
      "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=700&q=80",
    features: ["Indoor Pool", "Free Airport Shuttle", "Spa", "Breakfast Included"],
  },
  {
    id: 103,
    name: "Ocean Paradise Hotel & Resort",
    stars: 4,
    area: "New Beach Road",
    rating: 8.6,
    reviews: 1120,
    price: 72,
    originalPrice: 90,
    tag: "Top Rated",
    image:
      "https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?auto=format&fit=crop&w=700&q=80",
    features: ["Sea View Rooms", "BBQ Facility", "Gym", "Free Wi-Fi"],
  },
  {
    id: 104,
    name: "Mermaid Beach Resort",
    stars: 4,
    area: "Pechuardip, Marine Drive",
    rating: 9.0,
    reviews: 760,
    price: 125,
    originalPrice: 150,
    tag: "Romantic Getaway",
    image:
      "https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=700&q=80",
    features: ["Private Bungalows", "Beachfront Dining", "Eco Resort", "Breakfast"],
  },
  {
    id: 105,
    name: "Royal Tulip Sea Pearl Beach Resort",
    stars: 5,
    area: "Inani Beach",
    rating: 9.2,
    reviews: 2150,
    price: 140,
    originalPrice: 175,
    tag: "Luxury Resort",
    image:
      "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?auto=format&fit=crop&w=700&q=80",
    features: ["Water Park", "Private Beach", "Multiple Pools", "Fine Dining"],
  },
  {
    id: 106,
    name: "Hotel Sea Crown",
    stars: 3,
    area: "Kolatoli Beach",
    rating: 8.1,
    reviews: 640,
    price: 45,
    originalPrice: 55,
    tag: "Budget Friendly",
    image:
      "https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&w=700&q=80",
    features: ["Direct Beach Access", "Family Rooms", "Restaurant", "24/7 Desk"],
  },
  {
    id: 107,
    name: "Praasad Paradise",
    stars: 3,
    area: "North Beach",
    rating: 8.0,
    reviews: 430,
    price: 40,
    originalPrice: 50,
    tag: "Value Stay",
    image:
      "https://images.unsplash.com/photo-1591088398332-8a7791972843?auto=format&fit=crop&w=700&q=80",
    features: ["Garden Area", "Beach Front", "Room Service", "Free Parking"],
  },
  {
    id: 108,
    name: "Grace Cox Smart Hotel",
    stars: 4,
    area: "Sugandha Point",
    rating: 8.7,
    reviews: 820,
    price: 68,
    originalPrice: 85,
    tag: "Modern",
    image:
      "https://images.unsplash.com/photo-1618773928121-c32242e63f39?auto=format&fit=crop&w=700&q=80",
    features: ["Smart Tech Rooms", "Rooftop Cafe", "Free Wi-Fi", "Continental Breakfast"],
  },
];

// Other popular tourist cities in Bangladesh
const BANGLADESH_CITIES = [
  {
    name: "Dhaka",
    subtitle: "Historic capital, vibrant culture & riverside monuments",
    hotelsCount: "140+ properties",
    image:
      "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=600&q=80",
  },
  {
    name: "Sylhet",
    subtitle: "Lush rolling tea gardens, waterfalls & tranquil lakes",
    hotelsCount: "65+ properties",
    image:
      "https://images.unsplash.com/photo-1507652313519-d4e9174996dd?auto=format&fit=crop&w=600&q=80",
  },
  {
    name: "Sreemangal",
    subtitle: "Tea capital of Bangladesh, rain forest & scenic greenery",
    hotelsCount: "42+ properties",
    image:
      "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&w=600&q=80",
  },
  {
    name: "Chittagong",
    subtitle: "Port city, scenic naval beaches & coastal hill tracks",
    hotelsCount: "80+ properties",
    image:
      "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=600&q=80",
  },
  {
    name: "Bandarban",
    subtitle: "Highest peaks, tribal villages & misty cloud viewpoints",
    hotelsCount: "35+ properties",
    image:
      "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=600&q=80",
  },
  {
    name: "Rangamati",
    subtitle: "Kaptai lake cruising, hanging bridge & green landscapes",
    hotelsCount: "28+ properties",
    image:
      "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=600&q=80",
  },
  {
    name: "Kuakata",
    subtitle: "Daughter of the sea with sunset & sunrise beach views",
    hotelsCount: "40+ properties",
    image:
      "https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?auto=format&fit=crop&w=600&q=80",
  },
  {
    name: "Sundarbans (Khulna)",
    subtitle: "World largest mangrove forest & Royal Bengal tiger haven",
    hotelsCount: "22+ eco-lodges",
    image:
      "https://images.unsplash.com/photo-1448375240586-882707db888b?auto=format&fit=crop&w=600&q=80",
  },
];

export default function CityGuide() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const cityParam = searchParams?.get("destination") || "Cox's Bazar";
  const countryParam = searchParams?.get("country") || "Bangladesh";

  // Booking Tab state - PRESET destination only, other fillups empty
  const [destinationInput, setDestinationInput] = useState(cityParam);
  const [checkInDate, setCheckInDate] = useState("");
  const [checkOutDate, setCheckOutDate] = useState("");
  const [guests, setGuests] = useState("");

  // Change location modal state
  const [isLocationModalOpen, setIsLocationModalOpen] = useState(false);
  const [modalTab, setModalTab] = useState<CategoryType>("Popular");

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const params = new URLSearchParams();
    params.set("destination", destinationInput);
    if (checkInDate) params.set("checkIn", checkInDate);
    if (checkOutDate) params.set("checkOut", checkOutDate);
    router.push(`/hotels?${params.toString()}`);
  };

  const handleSelectNewCity = (newCity: string, newCountry: string) => {
    setDestinationInput(newCity);
    setIsLocationModalOpen(false);
    router.push(
      `/travel-guides/city?destination=${encodeURIComponent(newCity)}&country=${encodeURIComponent(newCountry)}`
    );
  };

  return (
    <div className="min-h-screen bg-white text-neutral-900 font-Poppins flex flex-col selection:bg-blue-100 selection:text-blue-900">
      <Navbar />

      <main className="flex-1 pt-24 pb-20">
        <div className="container-page">
          {/* Top Header Row with Top-Right Buttons (Change Location & Travel Guide) */}
          <div className="pt-6 pb-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-neutral-100">
            <div>
              <div className="flex items-center gap-2 text-xs text-neutral-500 font-medium mb-1">
                <Link href="/travel-guides/suggestions" className="hover:text-[#2563eb] transition-colors">
                  Travel Guides
                </Link>
                <span>/</span>
                <span className="text-neutral-800 font-semibold">{cityParam}</span>
              </div>
              <h1 className="text-2xl sm:text-3xl font-extrabold text-neutral-900 tracking-tight">
                {cityParam}, <span className="text-neutral-500 font-normal">{countryParam}</span>
              </h1>
            </div>

            {/* Top-Right Action Buttons: CL (Change Location) & TG (Travel Guide) */}
            <div className="flex items-center gap-2.5 self-end sm:self-auto">
              <button
                type="button"
                onClick={() => setIsLocationModalOpen(true)}
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-neutral-100 hover:bg-neutral-200 text-neutral-800 text-xs sm:text-sm font-semibold transition-all active:scale-95 shadow-sm"
              >
                <FaExchangeAlt size={12} className="text-[#2563eb]" />
                <span>Change location</span>
              </button>

              <button
                type="button"
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-neutral-100 text-neutral-600 text-xs sm:text-sm font-semibold cursor-default opacity-85"
              >
                <span>Travel guide</span>
              </button>
            </div>
          </div>

          {/* ========================================================= */}
          {/* 1. BOOKING TAB (Booking.com style, preset destination)    */}
          {/* ========================================================= */}
          <div className="pt-8 pb-12">
            <div className="bg-[#f5f5f5] rounded-3xl border border-neutral-200/80 p-5 sm:p-7 shadow-sm">
              <div className="mb-4 flex items-center justify-between">
                <h2 className="text-base sm:text-lg font-bold text-neutral-900">
                  Search stays in {cityParam}
                </h2>
                <span className="text-xs text-neutral-500 font-medium hidden sm:inline-block">
                  Best rates guaranteed
                </span>
              </div>

              <form onSubmit={handleSearchSubmit} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-12 gap-3">
                  {/* Preset Destination Input */}
                  <div className="md:col-span-5 bg-white rounded-2xl border border-neutral-300 p-3 flex items-center gap-3 focus-within:border-[#2563eb] focus-within:ring-2 focus-within:ring-[#2563eb]/20 transition-all">
                    <FaMapMarkerAlt className="text-[#2563eb] text-lg shrink-0 ml-1" />
                    <div className="flex-1 min-w-0">
                      <label className="block text-[10px] font-bold uppercase tracking-wider text-neutral-400 leading-none mb-1">
                        Destination
                      </label>
                      <input
                        type="text"
                        value={destinationInput}
                        onChange={(e) => setDestinationInput(e.target.value)}
                        placeholder="City or property"
                        className="w-full text-sm font-bold text-neutral-900 outline-none bg-transparent"
                      />
                    </div>
                  </div>

                  {/* Dates (Empty fillups) */}
                  <div className="md:col-span-4 bg-white rounded-2xl border border-neutral-300 p-3 flex items-center gap-3 focus-within:border-[#2563eb] focus-within:ring-2 focus-within:ring-[#2563eb]/20 transition-all">
                    <FaCalendarAlt className="text-neutral-400 text-base shrink-0 ml-1" />
                    <div className="flex-1 min-w-0 grid grid-cols-2 gap-2">
                      <div>
                        <label className="block text-[10px] font-bold uppercase tracking-wider text-neutral-400 leading-none mb-1">
                          Check-in
                        </label>
                        <input
                          type="date"
                          value={checkInDate}
                          onChange={(e) => setCheckInDate(e.target.value)}
                          className="w-full text-xs font-semibold text-neutral-800 outline-none bg-transparent"
                        />
                      </div>
                      <div>
                        <label className="block text-[10px] font-bold uppercase tracking-wider text-neutral-400 leading-none mb-1">
                          Check-out
                        </label>
                        <input
                          type="date"
                          value={checkOutDate}
                          onChange={(e) => setCheckOutDate(e.target.value)}
                          className="w-full text-xs font-semibold text-neutral-800 outline-none bg-transparent"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Guests (Empty fillup) */}
                  <div className="md:col-span-3 bg-white rounded-2xl border border-neutral-300 p-3 flex items-center gap-3 focus-within:border-[#2563eb] focus-within:ring-2 focus-within:ring-[#2563eb]/20 transition-all">
                    <FaUserFriends className="text-neutral-400 text-base shrink-0 ml-1" />
                    <div className="flex-1 min-w-0">
                      <label className="block text-[10px] font-bold uppercase tracking-wider text-neutral-400 leading-none mb-1">
                        Guests & Rooms
                      </label>
                      <input
                        type="text"
                        value={guests}
                        onChange={(e) => setGuests(e.target.value)}
                        placeholder="2 adults · 0 children · 1 room"
                        className="w-full text-xs font-semibold text-neutral-800 outline-none bg-transparent placeholder-neutral-400"
                      />
                    </div>
                  </div>
                </div>

                <div className="flex justify-end pt-1">
                  <button
                    type="submit"
                    className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-9 py-3 rounded-xl bg-[#2563eb] hover:bg-[#1d4ed8] active:scale-95 text-white font-bold text-sm transition-all shadow-md shadow-blue-500/20"
                  >
                    <FaSearch size={13} />
                    <span>Search Stays</span>
                  </button>
                </div>
              </form>
            </div>
          </div>

          {/* ========================================================= */}
          {/* 2. BEST SUGGESTIONS (Top Hotels of Cox's Bazar)           */}
          {/* ========================================================= */}
          <div className="pt-6 pb-16 border-t border-neutral-200">
            <div className="flex items-center justify-between mb-8">
              <div>
                <h2 className="text-xl sm:text-2xl font-extrabold text-neutral-900 tracking-tight">
                  Best Suggestions
                </h2>
                <p className="text-xs sm:text-sm text-neutral-500 mt-1">
                  Top-rated hotels, beach resorts & luxury retreats in {cityParam}
                </p>
              </div>

              <Link
                href={`/hotels?destination=${encodeURIComponent(cityParam)}`}
                className="hidden sm:inline-flex items-center gap-1.5 text-xs sm:text-sm font-bold text-[#2563eb] hover:underline"
              >
                <span>View all stays</span>
                <FaArrowRight size={11} />
              </Link>
            </div>

            {/* Hotels Grid: 4 columns x 2 rows = 8 hotels */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {COX_HOTELS.map((hotel) => (
                <Link
                  key={hotel.id}
                  href={`/hotels?destination=${encodeURIComponent(cityParam)}&hotel=${encodeURIComponent(hotel.name)}`}
                  className="group bg-white rounded-3xl border border-neutral-200/80 overflow-hidden shadow-sm hover:shadow-xl hover:border-[#2563eb]/40 transition-all flex flex-col"
                >
                  {/* Hotel Image with Badge */}
                  <div className="relative aspect-[4/3] w-full overflow-hidden bg-neutral-100">
                    <img
                      src={hotel.image}
                      alt={hotel.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute top-3 left-3 bg-[#2563eb] text-white text-[10px] font-bold px-2.5 py-1 rounded-full shadow-sm">
                      {hotel.tag}
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-5 flex-1 flex flex-col justify-between">
                    <div>
                      {/* Rating & Stars */}
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center text-amber-400 text-xs">
                          {Array.from({ length: hotel.stars }).map((_, i) => (
                            <FaStar key={i} />
                          ))}
                        </div>
                        <div className="flex items-center gap-1.5">
                          <span className="text-[11px] font-semibold text-neutral-500">
                            ({hotel.reviews})
                          </span>
                          <span className="bg-blue-50 text-[#2563eb] font-bold text-xs px-2 py-0.5 rounded-lg border border-blue-200/60">
                            {hotel.rating}
                          </span>
                        </div>
                      </div>

                      <h3 className="font-bold text-neutral-900 group-hover:text-[#2563eb] transition-colors leading-snug line-clamp-1">
                        {hotel.name}
                      </h3>
                      <p className="text-xs text-neutral-500 mt-1 flex items-center gap-1">
                        <FaMapMarkerAlt size={10} className="text-neutral-400 shrink-0" />
                        <span className="truncate">{hotel.area}</span>
                      </p>

                      {/* Amenities pills */}
                      <div className="flex flex-wrap gap-1.5 mt-3">
                        {hotel.features.slice(0, 2).map((feat, i) => (
                          <span
                            key={i}
                            className="text-[10px] bg-neutral-100 text-neutral-600 font-medium px-2 py-0.5 rounded-md"
                          >
                            {feat}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Price & Booking action */}
                    <div className="pt-4 mt-4 border-t border-neutral-100 flex items-center justify-between">
                      <div>
                        <span className="text-[10px] text-neutral-400 block line-through">
                          ${hotel.originalPrice}
                        </span>
                        <div className="flex items-baseline gap-1">
                          <span className="text-base font-extrabold text-neutral-900">
                            ${hotel.price}
                          </span>
                          <span className="text-[10px] text-neutral-500">/ night</span>
                        </div>
                      </div>

                      <span className="px-3.5 py-1.5 rounded-xl bg-[#eff6ff] group-hover:bg-[#2563eb] text-[#2563eb] group-hover:text-white font-bold text-xs transition-colors shadow-sm">
                        Book Stay
                      </span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>

          {/* ========================================================= */}
          {/* 3. SELECTED COUNTRY'S ALL CITIES (Bangladesh Destinations) */}
          {/* ========================================================= */}
          <div className="pt-10 pb-8 border-t border-neutral-200">
            <div className="mb-8">
              <h2 className="text-xl sm:text-2xl font-extrabold text-neutral-900 tracking-tight">
                Selected country&apos;s all cities
              </h2>
              <p className="text-xs sm:text-sm text-neutral-500 mt-1">
                Other popular cities and tourist destinations across {countryParam}
              </p>
            </div>

            {/* 8 City Cards Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {BANGLADESH_CITIES.map((city) => (
                <Link
                  key={city.name}
                  href={`/travel-guides/city?destination=${encodeURIComponent(city.name)}&country=${encodeURIComponent(countryParam)}`}
                  className="group block bg-[#f5f5f5] rounded-3xl overflow-hidden border border-neutral-200/80 hover:bg-white hover:border-[#2563eb]/40 hover:shadow-lg transition-all"
                >
                  <div className="aspect-[16/10] w-full overflow-hidden relative">
                    <img
                      src={city.image}
                      alt={city.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />
                    <div className="absolute bottom-3 left-3 text-white">
                      <span className="text-xs font-semibold opacity-90 block">
                        {city.hotelsCount}
                      </span>
                      <h3 className="text-lg font-bold leading-none">{city.name}</h3>
                    </div>
                  </div>
                  <div className="p-4">
                    <p className="text-xs text-neutral-600 line-clamp-2 leading-relaxed">
                      {city.subtitle}
                    </p>
                    <div className="mt-3 flex items-center justify-between text-xs font-bold text-[#2563eb]">
                      <span>Explore city</span>
                      <FaChevronRight size={10} className="group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </main>

      {/* ========================================================= */}
      {/* 4. CHANGE LOCATION MODAL (Pops up with Suggestions.tsx)   */}
      {/* ========================================================= */}
      {isLocationModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="relative w-full max-w-2xl bg-white rounded-3xl shadow-2xl border border-neutral-200 p-6 sm:p-8 max-h-[85vh] overflow-y-auto">
            {/* Modal Header */}
            <div className="flex items-center justify-between pb-4 border-b border-neutral-100">
              <div>
                <h3 className="text-lg font-bold text-neutral-900">Change Location</h3>
                <p className="text-xs text-neutral-500 mt-0.5">
                  Select a getaway destination from popular categories
                </p>
              </div>
              <button
                type="button"
                onClick={() => setIsLocationModalOpen(false)}
                className="w-8 h-8 rounded-full bg-neutral-100 hover:bg-neutral-200 text-neutral-600 flex items-center justify-center transition-colors"
              >
                <FaTimes size={14} />
              </button>
            </div>

            {/* Category Tabs */}
            <div className="flex items-center gap-4 sm:gap-6 border-b border-neutral-200 overflow-x-auto no-scrollbar py-3 mt-2">
              {SUGGESTIONS_CATEGORIES.map((cat) => {
                const isActive = modalTab === cat;
                return (
                  <button
                    key={cat}
                    type="button"
                    onClick={() => setModalTab(cat)}
                    className={`whitespace-nowrap pb-2 text-xs sm:text-sm font-semibold transition-colors relative ${
                      isActive ? "text-[#2563eb]" : "text-neutral-500 hover:text-neutral-800"
                    }`}
                  >
                    {cat}
                    {isActive && (
                      <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#2563eb] rounded-full" />
                    )}
                  </button>
                );
              })}
            </div>

            {/* Cities in Selected Category */}
            <div className="grid grid-cols-2 gap-4 pt-6">
              {SUGGESTIONS_DATA[modalTab].map((item, idx) => {
                const isCurrent =
                  item.city.toLowerCase() === destinationInput.toLowerCase();

                return (
                  <button
                    key={`${item.city}-${idx}`}
                    type="button"
                    onClick={() => handleSelectNewCity(item.city, item.country)}
                    className={`text-left p-4 rounded-2xl border transition-all ${
                      isCurrent
                        ? "bg-[#eff6ff] border-[#2563eb] ring-1 ring-[#2563eb]"
                        : "bg-neutral-50 hover:bg-white border-neutral-200 hover:border-neutral-300"
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <p className="font-bold text-neutral-900">{item.city}</p>
                      {isCurrent && <FaCheck size={12} className="text-[#2563eb]" />}
                    </div>
                    <p className="text-xs text-neutral-500 mt-1">{item.country}</p>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
}

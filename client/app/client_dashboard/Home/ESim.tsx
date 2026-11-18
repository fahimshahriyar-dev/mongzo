"use client";
import React, { useState, useMemo } from "react";
import { useRouter } from "next/navigation";
import {
  FaHeart,
  FaRegHeart,
  FaStar,
  FaChevronDown,
  FaCalendarAlt,
  FaMapMarkerAlt,
} from "react-icons/fa";
import { FiCheck } from "react-icons/fi";
import { MdClose } from "react-icons/md";
import { ESIM_PRODUCTS, ESimProduct } from "./ESimSection";

export const ESIM_DESTINATIONS = [
  "Global",
  "China",
  "Japan",
  "Korea",
  "South Eastern Asia",
  "Middle East/South Asia",
  "Europe",
  "America",
  "Oceania",
  "Africa",
];

interface ESimProps {
  initialDestination?: string;
}

export default function ESim({ initialDestination = "Global" }: ESimProps) {
  const router = useRouter();

  // Destination state (same styling & structure as Booking.tsx)
  const [selectedDestination, setSelectedDestination] = useState(
    initialDestination || "Global"
  );
  const [isDestDropdownOpen, setIsDestDropdownOpen] = useState(false);
  const [destSearchQuery, setDestSearchQuery] = useState("");

  // Left sidebar filter states
  const [bookToday, setBookToday] = useState(false);
  const [bookTomorrow, setBookTomorrow] = useState(false);
  const [travelDate, setTravelDate] = useState<"today" | "tomorrow" | "custom" | "">("");
  const [customDate, setCustomDate] = useState("");
  const [travelerRating, setTravelerRating] = useState<number | null>(null);
  const [instantConfirmation, setInstantConfirmation] = useState(false);
  const [freeCancellation, setFreeCancellation] = useState(false);

  // Favorites wishlist state
  const [favorites, setFavorites] = useState<Record<string, boolean>>({});

  const toggleFavorite = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setFavorites((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const clearAllFilters = () => {
    setBookToday(false);
    setBookTomorrow(false);
    setTravelDate("");
    setCustomDate("");
    setTravelerRating(null);
    setInstantConfirmation(false);
    setFreeCancellation(false);
  };

  const hasActiveFilters =
    bookToday ||
    bookTomorrow ||
    travelDate !== "" ||
    customDate !== "" ||
    travelerRating !== null ||
    instantConfirmation ||
    freeCancellation;

  // Filtered products logic
  const filteredProducts = useMemo(() => {
    return ESIM_PRODUCTS.filter((product: ESimProduct) => {
      // 1. Destination filter
      if (
        selectedDestination !== "Global" &&
        product.region.toLowerCase() !== selectedDestination.toLowerCase()
      ) {
        return false;
      }

      // 2. Quick filters (Book now for today)
      if (bookToday) {
        const hasToday = product.features.some((f: string) =>
          f.toLowerCase().includes("book now for today")
        );
        if (!hasToday) return false;
      }

      // 3. Traveler rating
      if (travelerRating !== null && product.rating < travelerRating) {
        return false;
      }

      // 4. Free cancellation
      if (freeCancellation) {
        const hasFreeCancel = product.features.some((f: string) =>
          f.toLowerCase().includes("free cancellation")
        );
        if (!hasFreeCancel) return false;
      }

      return true;
    });
  }, [
    selectedDestination,
    bookToday,
    bookTomorrow,
    travelerRating,
    freeCancellation,
  ]);

  return (
    <div className="min-h-screen bg-[#FFFFFF] pt-24 pb-20">
      <div className="container-page space-y-6">
        {/* Top Destination Filter Search Box - Exact replica of Booking.tsx */}
        <div className="bg-[#F5F5F5] rounded-2xl border border-neutral-200 shadow-sm p-4 sm:p-6 transition-all">
          {/* Header Row: Title */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-5">
            <h2 className="text-base sm:text-lg font-medium text-neutral-800">
              Where do you need data connectivity?
            </h2>
            <div className="flex items-center gap-3">
              <span className="text-xs font-semibold px-3 py-1.5 bg-blue-50 text-blue-600 rounded-full w-fit">
                {filteredProducts.length} plans available
              </span>
              {hasActiveFilters && (
                <button
                  type="button"
                  onClick={clearAllFilters}
                  className="text-xs text-blue-600 hover:text-blue-700 font-semibold underline"
                >
                  Reset filters
                </button>
              )}
            </div>
          </div>

          {/* Main Inputs Bar */}
          <div className="relative">
            {/* Destination Input Box */}
            <div className="w-full relative">
              <div
                onClick={() => setIsDestDropdownOpen(!isDestDropdownOpen)}
                className={`border rounded-xl px-4 py-2.5 cursor-pointer bg-white transition-all ${
                  isDestDropdownOpen
                    ? "border-[#2563eb] ring-1 ring-[#2563eb]"
                    : "border-neutral-200 hover:border-neutral-300"
                }`}
              >
                <span className="block text-[11px] text-neutral-400 font-medium leading-tight">
                  Destination
                </span>
                <div className="flex items-center justify-between mt-0.5">
                  <span className="text-sm font-semibold text-neutral-900 truncate">
                    {selectedDestination || "Global"}
                  </span>
                  <FaChevronDown
                    className={`text-xs text-neutral-400 transition-transform duration-200 ${
                      isDestDropdownOpen ? "rotate-180 text-blue-600" : ""
                    }`}
                  />
                </div>
              </div>

              {/* Destination Dropdown Popup matching Booking.tsx */}
              {isDestDropdownOpen && (
                <div className="absolute top-full left-0 mt-2 w-full sm:w-[480px] z-50 bg-white rounded-2xl shadow-2xl border border-neutral-200/80 p-5 animate-in fade-in zoom-in-95 duration-150">
                  {/* Search Input inside popover */}
                  <div className="relative mb-4">
                    <div className="border border-[#2563eb] rounded-xl px-3.5 py-2.5 flex items-center justify-between bg-white ring-1 ring-[#2563eb]">
                      <div className="w-full">
                        <label className="block text-[11px] text-neutral-400 leading-none mb-1">
                          Search Destination or Region
                        </label>
                        <input
                          type="text"
                          placeholder="Type to filter..."
                          value={destSearchQuery}
                          onChange={(e) => setDestSearchQuery(e.target.value)}
                          autoFocus
                          className="w-full text-sm font-bold text-neutral-900 outline-none bg-transparent"
                        />
                      </div>
                      {destSearchQuery && (
                        <button
                          type="button"
                          onClick={() => setDestSearchQuery("")}
                          className="text-neutral-400 hover:text-neutral-600 p-1"
                        >
                          <MdClose className="text-base" />
                        </button>
                      )}
                    </div>
                  </div>

                  {/* Destination options list */}
                  <div className="max-h-60 overflow-y-auto space-y-1 pr-1">
                    {ESIM_DESTINATIONS.filter((item) =>
                      item.toLowerCase().includes(destSearchQuery.toLowerCase())
                    ).map((dest) => {
                      const isSelected = selectedDestination === dest;
                      return (
                        <button
                          key={dest}
                          type="button"
                          onClick={() => {
                            setSelectedDestination(dest);
                            setIsDestDropdownOpen(false);
                            setDestSearchQuery("");
                            router.replace(`/esim?destination=${encodeURIComponent(dest)}`, {
                              scroll: false,
                            });
                          }}
                          className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-left text-sm font-medium transition-colors ${
                            isSelected
                              ? "bg-[#eff6ff] text-[#2563eb] font-semibold"
                              : "hover:bg-neutral-50 text-neutral-700"
                          }`}
                        >
                          <span className="flex items-center gap-2.5">
                            <FaMapMarkerAlt
                              className={`text-xs ${
                                isSelected ? "text-blue-600" : "text-neutral-400"
                              }`}
                            />
                            {dest}
                          </span>
                          {isSelected && (
                            <FiCheck className="text-sm text-blue-600 stroke-[3]" />
                          )}
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Main Layout: Left Filter Sidebar + Right SIM Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* ============ LEFT FILTER SIDEBAR ============ */}
          <aside className="lg:col-span-3 bg-[#F5F5F5] rounded-2xl border border-neutral-200/90 p-5 shadow-sm space-y-6">
            {/* 1. Filters Header & Checkboxes */}
            <div>
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-sm font-bold text-neutral-900">Filters</h3>
                {hasActiveFilters && (
                  <button
                    type="button"
                    onClick={clearAllFilters}
                    className="text-xs text-blue-600 hover:text-blue-700 font-medium"
                  >
                    Clear
                  </button>
                )}
              </div>

              <div className="space-y-2.5 text-xs text-neutral-700">
                <label className="flex items-center gap-2.5 cursor-pointer select-none">
                  <input
                    type="checkbox"
                    checked={bookToday}
                    onChange={(e) => setBookToday(e.target.checked)}
                    className="w-4 h-4 rounded border-neutral-300 text-blue-600 focus:ring-blue-500 rounded-sm"
                  />
                  <span>Book now for today</span>
                </label>
                <label className="flex items-center gap-2.5 cursor-pointer select-none">
                  <input
                    type="checkbox"
                    checked={bookTomorrow}
                    onChange={(e) => setBookTomorrow(e.target.checked)}
                    className="w-4 h-4 rounded border-neutral-300 text-blue-600 focus:ring-blue-500 rounded-sm"
                  />
                  <span>Book now for tomorrow</span>
                </label>
              </div>
            </div>

            <hr className="border-neutral-100" />

            {/* 2. Travel date */}
            <div>
              <h4 className="text-xs font-bold text-neutral-900 mb-3">Travel date</h4>
              <div className="space-y-2.5 text-xs text-neutral-700 mb-3">
                <label className="flex items-center gap-2.5 cursor-pointer select-none">
                  <input
                    type="radio"
                    name="travelDate"
                    checked={travelDate === "today"}
                    onChange={() => setTravelDate("today")}
                    className="w-4 h-4 text-blue-600 focus:ring-blue-500 border-neutral-300"
                  />
                  <span>Today</span>
                </label>
                <label className="flex items-center gap-2.5 cursor-pointer select-none">
                  <input
                    type="radio"
                    name="travelDate"
                    checked={travelDate === "tomorrow"}
                    onChange={() => setTravelDate("tomorrow")}
                    className="w-4 h-4 text-blue-600 focus:ring-blue-500 border-neutral-300"
                  />
                  <span>Tomorrow</span>
                </label>
              </div>

              {/* Select Date input */}
              <div className="relative">
                <div className="flex items-center gap-2 px-3 py-2 border border-neutral-200 hover:border-neutral-300 rounded-xl bg-white text-xs text-neutral-600 cursor-pointer">
                  <FaCalendarAlt className="text-neutral-400 text-xs shrink-0" />
                  <input
                    type="date"
                    value={customDate}
                    onChange={(e) => {
                      setCustomDate(e.target.value);
                      setTravelDate("custom");
                    }}
                    className="w-full bg-transparent outline-none text-xs text-neutral-800 cursor-pointer"
                    placeholder="Select date"
                  />
                </div>
              </div>
            </div>

            <hr className="border-neutral-100" />

            {/* 3. Traveler rating */}
            <div>
              <h4 className="text-xs font-bold text-neutral-900 mb-3">Traveler rating</h4>
              <div className="space-y-2.5 text-xs text-neutral-700">
                <label className="flex items-center gap-2.5 cursor-pointer select-none">
                  <input
                    type="radio"
                    name="travelerRating"
                    checked={travelerRating === 4.0}
                    onChange={() => setTravelerRating(travelerRating === 4.0 ? null : 4.0)}
                    className="w-4 h-4 text-blue-600 focus:ring-blue-500 border-neutral-300"
                  />
                  <span>4.0+</span>
                </label>
                <label className="flex items-center gap-2.5 cursor-pointer select-none">
                  <input
                    type="radio"
                    name="travelerRating"
                    checked={travelerRating === 4.5}
                    onChange={() => setTravelerRating(travelerRating === 4.5 ? null : 4.5)}
                    className="w-4 h-4 text-blue-600 focus:ring-blue-500 border-neutral-300"
                  />
                  <span>4.5+</span>
                </label>
              </div>
            </div>

            <hr className="border-neutral-100" />

            {/* 4. Service guarantee */}
            <div>
              <h4 className="text-xs font-bold text-neutral-900 mb-3">Service guarantee</h4>
              <div className="space-y-2.5 text-xs text-neutral-700">
                <label className="flex items-center gap-2.5 cursor-pointer select-none">
                  <input
                    type="checkbox"
                    checked={instantConfirmation}
                    onChange={(e) => setInstantConfirmation(e.target.checked)}
                    className="w-4 h-4 rounded border-neutral-300 text-blue-600 focus:ring-blue-500 rounded-sm"
                  />
                  <span>Instant confirmation</span>
                </label>
                <label className="flex items-center gap-2.5 cursor-pointer select-none">
                  <input
                    type="checkbox"
                    checked={freeCancellation}
                    onChange={(e) => setFreeCancellation(e.target.checked)}
                    className="w-4 h-4 rounded border-neutral-300 text-blue-600 focus:ring-blue-500 rounded-sm"
                  />
                  <span>Free cancellation</span>
                </label>
              </div>
            </div>
          </aside>

          {/* ============ RIGHT SIM CARDS GRID ============ */}
          <main className="lg:col-span-9">
            {filteredProducts.length === 0 ? (
              <div className="bg-[#F5F5F5] rounded-2xl border border-neutral-200 p-12 text-center shadow-sm">
                <p className="text-base font-semibold text-neutral-700">
                  No eSIM plans found matching your active filters.
                </p>
                <p className="text-xs text-neutral-400 mt-1 mb-4">
                  Try clearing some filter criteria to see available packages.
                </p>
                <button
                  type="button"
                  onClick={clearAllFilters}
                  className="px-5 py-2 rounded-full bg-blue-600 text-white font-semibold text-xs hover:bg-blue-700 transition-colors shadow-sm"
                >
                  Clear all filters
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5">
                {filteredProducts.map((card: ESimProduct) => {
                  const isFav = !!favorites[card.id];
                  return (
                    <div
                      key={card.id}
                      onClick={() => router.push(`/esim/payment?id=${encodeURIComponent(card.id)}`)}
                      className="group bg-[#F5F5F5] rounded-2xl border border-neutral-200/90 hover:border-neutral-300 hover:shadow-xl transition-all duration-300 overflow-hidden flex flex-col cursor-pointer"
                    >
                      {/* Image Banner Header */}
                      <div className="relative h-44 w-full overflow-hidden bg-neutral-100">
                        <img
                          src={card.imageUrl}
                          alt={card.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />

                        {/* Top badges & heart button */}
                        <div className="absolute top-3 left-3 right-3 flex items-start justify-between gap-2 z-10">
                          {card.badgeLabel ? (
                            <span className="bg-[#ff4d4f] text-white text-[10px] font-semibold px-2 py-0.5 rounded shadow-sm">
                              {card.badgeLabel}
                            </span>
                          ) : (
                            <div />
                          )}

                          <button
                            type="button"
                            onClick={(e) => toggleFavorite(card.id, e)}
                            className="w-7 h-7 rounded-full bg-white/90 hover:bg-white text-neutral-600 hover:text-red-500 flex items-center justify-center transition-all shadow-md ml-auto"
                            aria-label="Add to wishlist"
                          >
                            {isFav ? (
                              <FaHeart className="text-red-500 text-xs" />
                            ) : (
                              <FaRegHeart className="text-neutral-600 text-xs" />
                            )}
                          </button>
                        </div>

                        {/* Region pill */}
                        <div className="absolute bottom-2.5 left-3">
                          <span className="text-[11px] font-bold text-white bg-black/45 backdrop-blur-sm px-2 py-0.5 rounded-md">
                            ⚡ 5G eSIM • {card.region}
                          </span>
                        </div>
                      </div>

                      {/* Content Body */}
                      <div className="p-4 flex flex-col flex-1 justify-between gap-3">
                        <div>
                          <h4 className="text-[13px] font-semibold text-neutral-900 leading-snug line-clamp-2 group-hover:text-blue-600 transition-colors">
                            {card.title}
                          </h4>

                          {/* Ratings & reviews */}
                          <div className="flex items-center gap-1.5 mt-2 text-xs flex-wrap">
                            <span className="font-bold text-blue-600 flex items-center gap-1">
                              <FaStar className="text-amber-400 text-[10px]" />
                              {card.rating.toFixed(1)}/5
                            </span>
                            <span className="text-neutral-500">{card.reviewCount}</span>
                            <span className="text-neutral-300">|</span>
                            <span className="text-neutral-500">{card.bookedCount}</span>
                          </div>

                          {/* Features */}
                          <div className="flex items-center gap-1.5 mt-2 flex-wrap">
                            {card.features.map((feat: string, i: number) => (
                              <span
                                key={i}
                                className="text-[10px] font-medium text-neutral-500 bg-neutral-100 px-2 py-0.5 rounded"
                              >
                                {feat}
                              </span>
                            ))}
                          </div>

                          {/* Recommend note */}
                          {card.recommendNote && (
                            <p className="text-[11px] font-medium text-teal-600 mt-2">
                              {card.recommendNote}
                            </p>
                          )}
                        </div>

                        {/* Price footer */}
                        <div className="pt-2 border-t border-neutral-100 flex flex-col items-end">
                          <div className="flex items-baseline gap-1.5">
                            <span className="text-xs text-neutral-400 line-through">
                              {card.originalPrice}
                            </span>
                            <span className="text-xs text-neutral-600 font-medium">From</span>
                            <span className="text-base font-extrabold text-blue-600">
                              {card.price}
                            </span>
                          </div>
                          <span className="text-[10px] font-medium text-pink-600 bg-pink-50 px-2 py-0.5 rounded mt-0.5">
                            {card.discountBadge}
                          </span>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </main>
        </div>
      </div>
    </div>
  );
}

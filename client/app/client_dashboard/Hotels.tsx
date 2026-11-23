"use client";

import { useState, useRef, useEffect, Suspense } from "react";
import { useRouter } from "next/navigation";
import {
  FaSearch,
  FaMapMarkerAlt,
  FaStar,
  FaCheck,
  FaTimes,
  FaHeart,
  FaRegHeart,
  FaChevronDown,
  FaPlus,
  FaMinus,
  FaFilter,
  FaBars,
  FaSortAmountDown,
  FaSlidersH,
  FaExpand,
  FaCompress,
} from "react-icons/fa";
import { FiCheck, FiChevronLeft, FiChevronRight } from "react-icons/fi";
import { IoSparklesOutline } from "react-icons/io5";
import { LuUser } from "react-icons/lu";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import NavServiceBar, {
  MobileServiceDropdown,
  type BookingServiceType,
} from "./components/NavServiceBar";

// ─── Interfaces ─────────────────────────────────────────────────────────────
export interface RoomBooking {
  adults: number;
  children: number;
  childAge?: number;
}

export interface HotelItem {
  id: number;
  name: string;
  stars: number;
  area: string;
  distanceFromCenter: string;
  images: string[];
  breakfastIncluded: boolean;
  positiveFeatures: string[];
  negativeFeatures?: string[];
  ratingScore: number;
  ratingLabel: string;
  reviewsCount: number;
  pricePerNight: number;
  originalPrice?: number;
  dealTag?: string;
  priceWentUp?: boolean;
  lat: number;
  lng: number;
  facilities: string[];
}

const POPULAR_DESTINATIONS = [
  "Dhaka, Bangladesh",
  "Cox's Bazar, Bangladesh",
  "Sylhet, Bangladesh",
  "Chattogram, Bangladesh",
  "Bangkok, Thailand",
  "Dubai, United Arab Emirates",
  "Singapore",
  "Kuala Lumpur, Malaysia",
];

export const INITIAL_HOTELS: HotelItem[] = [
  {
    id: 1,
    name: "Hotel D Palace",
    stars: 3,
    area: "Dhaka City Center",
    distanceFromCenter: "4.59 km to city centre",
    images: [
      "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=600&q=80",
      "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=600&q=80",
      "https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&w=600&q=80",
      "https://images.unsplash.com/photo-1566665797739-1674de7a421a?auto=format&fit=crop&w=600&q=80",
    ],
    breakfastIncluded: true,
    positiveFeatures: [
      "Comfortable Beds",
      "Tasty Breakfast",
      "Clean Rooms",
      "Good Location",
      "Friendly Staff",
    ],
    negativeFeatures: [],
    ratingScore: 5.1,
    ratingLabel: "Fair",
    reviewsCount: 16,
    pricePerNight: 12,
    priceWentUp: true,
    lat: 23.8103,
    lng: 90.4125,
    facilities: [
      "Free Wi-Fi",
      "Breakfast",
      "Air Conditioning",
      "24h Front Desk",
    ],
  },
  {
    id: 2,
    name: "Hotel Sarina",
    stars: 5,
    area: "Banani",
    distanceFromCenter: "2.07 km to city centre",
    images: [
      "https://images.unsplash.com/photo-1578683010236-d716f9a3f461?auto=format&fit=crop&w=600&q=80",
      "https://images.unsplash.com/photo-1591088398332-8a7791972843?auto=format&fit=crop&w=600&q=80",
      "https://images.unsplash.com/photo-1584132967334-10e028bd69f7?auto=format&fit=crop&w=600&q=80",
      "https://images.unsplash.com/photo-1618773928121-c32242e63f39?auto=format&fit=crop&w=600&q=80",
    ],
    breakfastIncluded: true,
    positiveFeatures: [
      "Tasty Breakfast",
      "Clean Facilities",
      "Good Location",
      "Comfortable Rooms",
    ],
    negativeFeatures: ["High Prices"],
    ratingScore: 8.0,
    ratingLabel: "Good",
    reviewsCount: 2988,
    pricePerNight: 96,
    originalPrice: 103,
    dealTag: "WEGOFRIDAY26 7%",
    lat: 23.7937,
    lng: 90.4043,
    facilities: [
      "Swimming Pool",
      "Spa & Wellness",
      "Free Wi-Fi",
      "Airport Shuttle",
      "Breakfast",
    ],
  },
  {
    id: 3,
    name: "The Westin Dhaka",
    stars: 5,
    area: "Gulshan-2",
    distanceFromCenter: "1.4 km to city centre",
    images: [
      "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=600&q=80",
      "https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?auto=format&fit=crop&w=600&q=80",
      "https://images.unsplash.com/photo-1564501049412-61c2a3083791?auto=format&fit=crop&w=600&q=80",
      "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?auto=format&fit=crop&w=600&q=80",
    ],
    breakfastIncluded: true,
    positiveFeatures: [
      "Luxurious Spa",
      "Infinity Pool",
      "Outstanding Dining",
      "Prime Gulshan Location",
    ],
    ratingScore: 8.8,
    ratingLabel: "Excellent",
    reviewsCount: 4210,
    pricePerNight: 165,
    originalPrice: 185,
    dealTag: "SAVE 11%",
    lat: 23.7925,
    lng: 90.4158,
    facilities: [
      "Swimming Pool",
      "Fitness Center",
      "Spa",
      "Free Wi-Fi",
      "Restaurant",
      "Bar",
    ],
  },
  {
    id: 4,
    name: "InterContinental Dhaka",
    stars: 5,
    area: "Shahbagh",
    distanceFromCenter: "0.8 km to city centre",
    images: [
      "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=600&q=80",
      "https://images.unsplash.com/photo-1571896349842-33c89424de2d?auto=format&fit=crop&w=600&q=80",
      "https://images.unsplash.com/photo-1582719508461-905c673771fd?auto=format&fit=crop&w=600&q=80",
      "https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?auto=format&fit=crop&w=600&q=80",
    ],
    breakfastIncluded: true,
    positiveFeatures: [
      "Heritage Architecture",
      "Spacious Gardens",
      "Heated Pool",
      "Superb Staff",
    ],
    ratingScore: 8.9,
    ratingLabel: "Fabulous",
    reviewsCount: 3512,
    pricePerNight: 142,
    lat: 23.7423,
    lng: 90.3986,
    facilities: [
      "Heated Pool",
      "Garden",
      "Free Parking",
      "Fine Dining",
      "Airport Shuttle",
    ],
  },
  {
    id: 5,
    name: "Renaissance Dhaka Gulshan Hotel",
    stars: 5,
    area: "Gulshan-1",
    distanceFromCenter: "1.9 km to city centre",
    images: [
      "https://images.unsplash.com/photo-1578683010236-d716f9a3f461?auto=format&fit=crop&w=600&q=80",
      "https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&w=600&q=80",
      "https://images.unsplash.com/photo-1566665797739-1674de7a421a?auto=format&fit=crop&w=600&q=80",
    ],
    breakfastIncluded: true,
    positiveFeatures: [
      "Rooftop Infinity Pool",
      "Modern Interior",
      "Exceptional Cocktails",
      "Fast Room Service",
    ],
    ratingScore: 9.1,
    ratingLabel: "Wonderful",
    reviewsCount: 1845,
    pricePerNight: 178,
    originalPrice: 198,
    dealTag: "MEMBER DEAL 10%",
    lat: 23.7781,
    lng: 90.4172,
    facilities: [
      "Rooftop Pool",
      "Cocktail Bar",
      "Free Wi-Fi",
      "Spa",
      "Fitness Center",
    ],
  },
];

interface HotelsProps {
  initialDestination?: string;
  initialCheckIn?: string;
  initialCheckOut?: string;
  initialRooms?: number;
  initialAdults?: number;
  initialChildren?: number;
}

export default function Hotels({
  initialDestination = "Dhaka, Bangladesh",
  initialCheckIn,
  initialCheckOut,
  initialRooms = 1,
  initialAdults = 2,
  initialChildren = 0,
}: HotelsProps) {
  const router = useRouter();

  // ── Search State ──────────────────────────────────────────────────────────
  const [destination, setDestination] = useState(initialDestination);
  const [isDestOpen, setIsDestOpen] = useState(false);
  const [isCalendarOpen, setIsCalendarOpen] = useState(false);
  const [isGuestsOpen, setIsGuestsOpen] = useState(false);

  const [checkInDate, setCheckInDate] = useState<Date>(
    initialCheckIn ? new Date(initialCheckIn) : new Date(2026, 10, 18),
  );
  const [checkOutDate, setCheckOutDate] = useState<Date>(
    initialCheckOut ? new Date(initialCheckOut) : new Date(2026, 10, 19),
  );
  const [calendarViewDate, setCalendarViewDate] = useState<Date>(
    initialCheckIn ? new Date(initialCheckIn) : new Date(2026, 10, 1),
  );

  const [rooms, setRooms] = useState<RoomBooking[]>([
    { adults: initialAdults, children: initialChildren },
  ]);
  const [freeCancellation, setFreeCancellation] = useState(false);

  // ── Secondary Filter States (matching Image) ───────────────────────────────
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState<
    "recommended" | "price_low" | "price_high" | "rating"
  >("recommended");
  const [isSortOpen, setIsSortOpen] = useState(false);
  const [priceRangeFilter, setPriceRangeFilter] = useState<string>("all");
  const [isPriceOpen, setIsPriceOpen] = useState(false);
  const [starRatingFilter, setStarRatingFilter] = useState<number | null>(null);
  const [isStarOpen, setIsStarOpen] = useState(false);
  const [districtFilter, setDistrictFilter] = useState<string>("all");
  const [isDistrictOpen, setIsDistrictOpen] = useState(false);
  const [reviewScoreFilter, setReviewScoreFilter] = useState<number | null>(
    null,
  );
  const [isReviewOpen, setIsReviewOpen] = useState(false);
  const [facilitiesFilter, setFacilitiesFilter] = useState<string[]>([]);
  const [isFacilitiesOpen, setIsFacilitiesOpen] = useState(false);
  const [isMobileControlsOpen, setIsMobileControlsOpen] = useState(false);

  const [favorites, setFavorites] = useState<number[]>([]);
  const [activeHotelMap, setActiveHotelMap] = useState<HotelItem>(
    INITIAL_HOTELS[0],
  );

  const toggleFavorite = (id: number) => {
    setFavorites((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id],
    );
  };

  // Close popovers on click outside
  const filterRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (filterRef.current && !filterRef.current.contains(e.target as Node)) {
        setIsDestOpen(false);
        setIsCalendarOpen(false);
        setIsGuestsOpen(false);
        setIsSortOpen(false);
        setIsPriceOpen(false);
        setIsStarOpen(false);
        setIsDistrictOpen(false);
        setIsReviewOpen(false);
        setIsFacilitiesOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const totalAdults = rooms.reduce((acc, r) => acc + r.adults, 0);
  const totalChildren = rooms.reduce((acc, r) => acc + r.children, 0);
  const totalGuests = totalAdults + totalChildren;

  const guestsSummary = `${totalAdults} Adult${totalAdults > 1 ? "s" : ""} in ${rooms.length} room${
    rooms.length > 1 ? "s" : ""
  }`;

  // Date formatters
  const formatDisplayDate = (d: Date) => {
    const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    const months = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];
    return `${days[d.getDay()]}, ${d.getDate()} ${months[d.getMonth()]} ${d.getFullYear()}`;
  };

  // Calendar helpers
  const handleDateSelect = (d: Date) => {
    if (!checkInDate || (checkInDate && checkOutDate)) {
      setCheckInDate(d);
      setCheckOutDate(new Date(d.getTime() + 86400000));
    } else if (d > checkInDate) {
      setCheckOutDate(d);
      setIsCalendarOpen(false);
    } else {
      setCheckInDate(d);
    }
  };

  const renderMonthCalendar = (date: Date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const monthName = date.toLocaleString("en-US", {
      month: "long",
      year: "numeric",
    });
    const firstDay = new Date(year, month, 1).getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();

    const days = [];
    for (let i = 0; i < firstDay; i++) {
      days.push(<div key={`empty-${i}`} className="h-8" />);
    }
    for (let day = 1; day <= daysInMonth; day++) {
      const current = new Date(year, month, day);
      const isCheckIn =
        checkInDate && current.toDateString() === checkInDate.toDateString();
      const isCheckOut =
        checkOutDate && current.toDateString() === checkOutDate.toDateString();
      const isInRange =
        checkInDate &&
        checkOutDate &&
        current > checkInDate &&
        current < checkOutDate;

      days.push(
        <button
          key={day}
          type="button"
          onClick={() => handleDateSelect(current)}
          className={`h-8 w-8 mx-auto text-xs font-semibold rounded-lg flex items-center justify-center transition-colors ${
            isCheckIn || isCheckOut
              ? "bg-[#2563eb] text-white shadow-sm"
              : isInRange
                ? "bg-[#eff6ff] text-[#2563eb]"
                : "text-neutral-800 hover:bg-neutral-100"
          }`}
        >
          {day}
        </button>,
      );
    }

    return (
      <div className="w-full">
        <h4 className="text-xs font-bold text-neutral-800 text-center mb-3">
          {monthName}
        </h4>
        <div className="grid grid-cols-7 gap-1 text-[11px] font-medium text-neutral-400 text-center mb-1">
          <span>Su</span>
          <span>Mo</span>
          <span>Tu</span>
          <span>We</span>
          <span>Th</span>
          <span>Fr</span>
          <span>Sa</span>
        </div>
        <div className="grid grid-cols-7 gap-1">{days}</div>
      </div>
    );
  };

  // Re-search handler
  const handleSearch = () => {
    const params = new URLSearchParams();
    if (destination) params.set("destination", destination);
    params.set("checkIn", checkInDate.toISOString());
    params.set("checkOut", checkOutDate.toISOString());
    params.set("rooms", String(rooms.length));
    params.set("adults", String(totalAdults));
    params.set("children", String(totalChildren));
    router.push(`/hotels?${params.toString()}`);
  };

  const handleMobileServiceSelect = (serviceId: BookingServiceType) => {
    try {
      sessionStorage.setItem("mongzo-booking-tab", serviceId);
    } catch {}
    window.dispatchEvent(
      new CustomEvent("mongzo-set-booking-tab", {
        detail: { tab: serviceId },
      }),
    );
    router.push(`/booking?tab=${serviceId}`);
  };

  // Filtered & Sorted Hotels
  const filteredHotels = INITIAL_HOTELS.filter((hotel) => {
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      const matchName = hotel.name.toLowerCase().includes(q);
      const matchArea = hotel.area.toLowerCase().includes(q);
      if (!matchName && !matchArea) return false;
    }
    if (starRatingFilter !== null && hotel.stars !== starRatingFilter)
      return false;
    if (
      districtFilter !== "all" &&
      !hotel.area.toLowerCase().includes(districtFilter.toLowerCase())
    )
      return false;
    if (reviewScoreFilter !== null && hotel.ratingScore < reviewScoreFilter)
      return false;
    if (priceRangeFilter === "under50" && hotel.pricePerNight >= 50)
      return false;
    if (
      priceRangeFilter === "50to100" &&
      (hotel.pricePerNight < 50 || hotel.pricePerNight > 100)
    )
      return false;
    if (priceRangeFilter === "above100" && hotel.pricePerNight <= 100)
      return false;
    if (
      facilitiesFilter.length &&
      !facilitiesFilter.every((f) => hotel.facilities.includes(f))
    ) {
      return false;
    }
    return true;
  }).sort((a, b) => {
    if (sortBy === "price_low") return a.pricePerNight - b.pricePerNight;
    if (sortBy === "price_high") return b.pricePerNight - a.pricePerNight;
    if (sortBy === "rating") return b.ratingScore - a.ratingScore;
    return a.id - b.id;
  });

  return (
    <div className="min-h-screen bg-[#FFFFFF] text-neutral-900 flex flex-col font-sans">
      <Navbar />

      <main className="flex-1 pt-[var(--nav-h)] md:pt-24 pb-12" ref={filterRef}>
        <div className="hidden lg:block">
          <Suspense fallback={null}>
            <NavServiceBar active="hotels" />
          </Suspense>
        </div>
        {/* ── Sticky Top Controls (Search Bar & Filters) ─────────── */}
        <div className="sticky top-[var(--nav-h)] bg-white/95 backdrop-blur-md border-b border-neutral-200/80 shadow-sm z-30 py-2 md:py-3 mb-6">
          <div className="container-page flex flex-col gap-3">
            <div className="hidden md:flex lg:hidden items-center gap-3">
              <Suspense fallback={null}>
                <NavServiceBar
                  active="hotels"
                  className="flex-1 min-w-0 !w-auto !justify-start !py-0"
                />
              </Suspense>
              <button
                type="button"
                aria-expanded={isMobileControlsOpen}
                aria-controls="hotel-search-widget hotel-filter-bar"
                onClick={() => setIsMobileControlsOpen((open) => !open)}
                className="shrink-0 flex items-center justify-between gap-5 px-3 py-2.5 rounded-xl border border-neutral-300 bg-white text-sm font-semibold text-neutral-800 shadow-sm"
              >
                <span className="flex items-center gap-2">
                  <FaBars className="text-neutral-500" />
                  <span>Search &amp; filters</span>
                </span>
                <FaChevronDown
                  className={`text-xs text-neutral-500 transition-transform ${
                    isMobileControlsOpen ? "rotate-180" : ""
                  }`}
                />
              </button>
            </div>
            <div className="md:hidden grid grid-cols-2 items-center gap-2">
              <MobileServiceDropdown
                active="hotels"
                onSelect={handleMobileServiceSelect}
                align="left"
                className="w-full"
              />
              <button
                type="button"
                aria-expanded={isMobileControlsOpen}
                aria-controls="hotel-search-widget hotel-filter-bar"
                onClick={() => setIsMobileControlsOpen((open) => !open)}
                className="w-full flex items-center justify-between gap-2 px-3 py-2.5 rounded-xl border border-neutral-300 bg-white text-sm font-semibold text-neutral-800 shadow-sm"
              >
                <span className="flex items-center gap-2">
                  <FaBars className="text-neutral-500" />
                  <span>Search &amp; filters</span>
                </span>
                <FaChevronDown
                  className={`text-xs text-neutral-500 transition-transform ${
                    isMobileControlsOpen ? "rotate-180" : ""
                  }`}
                />
              </button>
            </div>
            {/* Top Hotel Search Widget */}
            <div
              id="hotel-search-widget"
              className={`${isMobileControlsOpen ? "block" : "hidden"} lg:block bg-[#F5F5F5] rounded-xl border border-neutral-200 p-2.5 sm:p-3 shadow-sm`}
            >
              <div className="grid grid-cols-1 md:grid-cols-12 gap-2 relative items-center">
                {/* Destination */}
                <div className="md:col-span-4 relative">
                  <div
                    onClick={() => {
                      setIsDestOpen(!isDestOpen);
                      setIsCalendarOpen(false);
                      setIsGuestsOpen(false);
                    }}
                    className={`border rounded-lg px-3 py-1.5 cursor-pointer bg-white transition-all ${
                      isDestOpen
                        ? "border-[#2563eb] ring-1 ring-[#2563eb]"
                        : "border-neutral-200 hover:border-neutral-300"
                    }`}
                  >
                    <span className="block text-[10px] text-neutral-400 font-medium leading-tight">
                      Destination
                    </span>
                    <span className="block text-xs sm:text-[13px] font-semibold text-neutral-900 mt-0.5 truncate">
                      {destination || "Search city or destination"}
                    </span>
                  </div>

                  {/* Destination Dropdown */}
                  {isDestOpen && (
                    <div className="absolute top-full left-0 mt-2 w-full sm:w-[420px] z-[100] bg-white rounded-2xl shadow-2xl border border-neutral-200 p-4 animate-in fade-in zoom-in-95 duration-150">
                      <div className="relative mb-3">
                        <div className="border border-[#2563eb] rounded-xl px-3 py-2 flex items-center justify-between bg-white ring-1 ring-[#2563eb]">
                          <input
                            type="text"
                            value={destination}
                            placeholder="Search destination..."
                            onChange={(e) => setDestination(e.target.value)}
                            autoFocus
                            className="w-full text-sm font-semibold text-neutral-900 outline-none bg-transparent"
                          />
                          {destination && (
                            <button
                              type="button"
                              onClick={() => setDestination("")}
                              className="text-neutral-400 hover:text-neutral-600 text-xs ml-2"
                            >
                              <FaTimes />
                            </button>
                          )}
                        </div>
                      </div>

                      <div className="text-[11px] font-bold text-neutral-400 uppercase tracking-wider mb-2">
                        Popular Destinations
                      </div>
                      <div className="space-y-1 max-h-48 overflow-y-auto">
                        {POPULAR_DESTINATIONS.map((dest) => (
                          <button
                            key={dest}
                            type="button"
                            onClick={() => {
                              setDestination(dest);
                              setIsDestOpen(false);
                            }}
                            className="w-full text-left px-3 py-2 text-xs font-semibold text-neutral-700 hover:bg-[#eff6ff] hover:text-[#2563eb] rounded-lg transition-colors flex items-center gap-2"
                          >
                            <FaMapMarkerAlt className="text-neutral-400 text-xs flex-shrink-0" />
                            <span>{dest}</span>
                          </button>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                {/* Check In & Check Out split */}
                <div className="md:col-span-4 relative">
                  <div
                    onClick={() => {
                      setIsCalendarOpen(!isCalendarOpen);
                      setIsDestOpen(false);
                      setIsGuestsOpen(false);
                    }}
                    className={`grid grid-cols-2 border rounded-lg bg-white cursor-pointer transition-all overflow-hidden ${
                      isCalendarOpen
                        ? "border-[#2563eb] ring-1 ring-[#2563eb]"
                        : "border-neutral-200 hover:border-neutral-300"
                    }`}
                  >
                    <div className="px-3 py-1.5 border-r border-neutral-200">
                      <span className="block text-[10px] text-neutral-400 font-medium leading-tight">
                        Check In
                      </span>
                      <span className="block text-xs font-semibold text-neutral-900 mt-0.5 truncate">
                        {formatDisplayDate(checkInDate)}
                      </span>
                    </div>
                    <div className="px-3 py-1.5">
                      <span className="block text-[10px] text-neutral-400 font-medium leading-tight">
                        Check Out
                      </span>
                      <span className="block text-xs font-semibold text-neutral-900 mt-0.5 truncate">
                        {formatDisplayDate(checkOutDate)}
                      </span>
                    </div>
                  </div>

                  {/* Calendar Dropdown */}
                  {isCalendarOpen && (
                    <div className="absolute top-full left-0 md:-left-12 mt-2 z-[100] bg-white rounded-2xl shadow-2xl border border-neutral-200 p-5 w-[92vw] max-w-[560px] animate-in fade-in zoom-in-95 duration-150">
                      <div className="flex items-center justify-between mb-4">
                        <button
                          type="button"
                          onClick={() =>
                            setCalendarViewDate(
                              new Date(
                                calendarViewDate.getFullYear(),
                                calendarViewDate.getMonth() - 1,
                                1,
                              ),
                            )
                          }
                          className="p-1.5 rounded-lg border border-neutral-200 hover:bg-neutral-50 text-neutral-600"
                        >
                          <FiChevronLeft />
                        </button>
                        <button
                          type="button"
                          onClick={() =>
                            setCalendarViewDate(
                              new Date(
                                calendarViewDate.getFullYear(),
                                calendarViewDate.getMonth() + 1,
                                1,
                              ),
                            )
                          }
                          className="p-1.5 rounded-lg border border-neutral-200 hover:bg-neutral-50 text-neutral-600"
                        >
                          <FiChevronRight />
                        </button>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {renderMonthCalendar(calendarViewDate)}
                        {renderMonthCalendar(
                          new Date(
                            calendarViewDate.getFullYear(),
                            calendarViewDate.getMonth() + 1,
                            1,
                          ),
                        )}
                      </div>
                    </div>
                  )}
                </div>

                {/* Guests & Rooms */}
                <div className="md:col-span-3 relative">
                  <div
                    onClick={() => {
                      setIsGuestsOpen(!isGuestsOpen);
                      setIsDestOpen(false);
                      setIsCalendarOpen(false);
                    }}
                    className={`border rounded-lg px-3 py-1.5 cursor-pointer bg-white transition-all ${
                      isGuestsOpen
                        ? "border-[#2563eb] ring-1 ring-[#2563eb]"
                        : "border-neutral-200 hover:border-neutral-300"
                    }`}
                  >
                    <span className="block text-[10px] text-neutral-400 font-medium leading-tight">
                      Guests &amp; Rooms
                    </span>
                    <div className="flex items-center justify-between mt-0.5">
                      <span className="text-xs font-semibold text-neutral-900 truncate">
                        {guestsSummary}
                      </span>
                      <FaChevronDown
                        className={`text-[9px] text-neutral-400 transition-transform duration-200 ${
                          isGuestsOpen ? "rotate-180 text-blue-600" : ""
                        }`}
                      />
                    </div>
                  </div>

                  {/* Guests Popover */}
                  {isGuestsOpen && (
                    <div className="absolute top-full right-0 mt-2 z-[100] bg-white rounded-2xl shadow-2xl border border-neutral-200 p-4 w-72 animate-in fade-in zoom-in-95 duration-150">
                      {rooms.map((room, roomIdx) => (
                        <div
                          key={roomIdx}
                          className="space-y-3 pb-3 border-b border-neutral-100 mb-3"
                        >
                          <div className="text-xs font-bold text-neutral-900">
                            Room {roomIdx + 1}
                          </div>
                          {/* Adults */}
                          <div className="flex items-center justify-between text-xs">
                            <span className="text-neutral-700">
                              Adults (&gt;12 yrs)
                            </span>
                            <div className="flex items-center gap-2">
                              <button
                                type="button"
                                disabled={room.adults <= 1}
                                onClick={() => {
                                  const copy = [...rooms];
                                  copy[roomIdx].adults = Math.max(
                                    1,
                                    copy[roomIdx].adults - 1,
                                  );
                                  setRooms(copy);
                                }}
                                className="w-6 h-6 rounded bg-[#2563eb] text-white flex items-center justify-center disabled:opacity-40"
                              >
                                <FaMinus className="text-[9px]" />
                              </button>
                              <span className="font-bold w-4 text-center">
                                {room.adults}
                              </span>
                              <button
                                type="button"
                                onClick={() => {
                                  const copy = [...rooms];
                                  copy[roomIdx].adults += 1;
                                  setRooms(copy);
                                }}
                                className="w-6 h-6 rounded bg-[#2563eb] text-white flex items-center justify-center"
                              >
                                <FaPlus className="text-[9px]" />
                              </button>
                            </div>
                          </div>

                          {/* Children */}
                          <div className="flex items-center justify-between text-xs">
                            <span className="text-neutral-700">
                              Children (&le;12 yrs)
                            </span>
                            <div className="flex items-center gap-2">
                              <button
                                type="button"
                                disabled={room.children <= 0}
                                onClick={() => {
                                  const copy = [...rooms];
                                  copy[roomIdx].children = Math.max(
                                    0,
                                    copy[roomIdx].children - 1,
                                  );
                                  setRooms(copy);
                                }}
                                className="w-6 h-6 rounded bg-[#2563eb] text-white flex items-center justify-center disabled:opacity-40"
                              >
                                <FaMinus className="text-[9px]" />
                              </button>
                              <span className="font-bold w-4 text-center">
                                {room.children}
                              </span>
                              <button
                                type="button"
                                onClick={() => {
                                  const copy = [...rooms];
                                  copy[roomIdx].children += 1;
                                  setRooms(copy);
                                }}
                                className="w-6 h-6 rounded bg-[#2563eb] text-white flex items-center justify-center"
                              >
                                <FaPlus className="text-[9px]" />
                              </button>
                            </div>
                          </div>
                        </div>
                      ))}

                      <div className="flex items-center justify-between pt-1">
                        <button
                          type="button"
                          onClick={() =>
                            setRooms([...rooms, { adults: 1, children: 0 }])
                          }
                          className="text-xs font-bold text-[#2563eb] hover:underline"
                        >
                          + Add Room
                        </button>
                        <button
                          type="button"
                          onClick={() => setIsGuestsOpen(false)}
                          className="bg-[#2563eb] text-white text-xs font-bold px-4 py-1.5 rounded-lg hover:bg-[#1d4ed8]"
                        >
                          Apply
                        </button>
                      </div>
                    </div>
                  )}
                </div>

                {/* Search button */}
                <div className="md:col-span-1">
                  <button
                    type="button"
                    onClick={handleSearch}
                    className="w-full bg-[#2563eb] hover:bg-[#1d4ed8] active:scale-95 text-white h-[40px] rounded-lg flex items-center justify-center transition-all shadow-md shadow-blue-500/20"
                  >
                    <FaSearch className="text-sm" />
                  </button>
                </div>
              </div>
            </div>

            {/* Filter Bar */}
            <div
              id="hotel-filter-bar"
              className={`${isMobileControlsOpen ? "flex" : "hidden"} lg:flex flex-wrap items-center gap-2 text-xs`}
            >
              {/* All Filters */}
              <button
                type="button"
                className="hidden lg:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-neutral-300 bg-white hover:bg-neutral-50 text-neutral-800 font-semibold shadow-sm transition-colors"
              >
                <FaSlidersH className="text-neutral-500 text-[10px]" />
                <span>All Filters</span>
              </button>

              {/* Sort by */}
              <div className="relative">
                <button
                  type="button"
                  onClick={() => setIsSortOpen(!isSortOpen)}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-neutral-800 bg-white text-neutral-900 font-bold shadow-sm hover:bg-neutral-50"
                >
                  <FaSortAmountDown className="text-neutral-500 text-[10px]" />
                  <span>
                    Sort by:{" "}
                    {sortBy === "recommended"
                      ? "Recommended"
                      : sortBy === "price_low"
                        ? "Price (Low to High)"
                        : sortBy === "price_high"
                          ? "Price (High to Low)"
                          : "Review Score"}
                  </span>
                  <FaChevronDown className="text-[9px] text-neutral-500 ml-1" />
                </button>
                {isSortOpen && (
                  <div className="absolute top-full left-0 mt-1 w-52 bg-white rounded-xl shadow-xl border border-neutral-200 py-1 z-[100]">
                    {(
                      [
                        { id: "recommended", label: "Recommended" },
                        { id: "price_low", label: "Price (Low to High)" },
                        { id: "price_high", label: "Price (High to Low)" },
                        { id: "rating", label: "Review Score" },
                      ] as const
                    ).map((opt) => (
                      <button
                        key={opt.id}
                        type="button"
                        onClick={() => {
                          setSortBy(opt.id);
                          setIsSortOpen(false);
                        }}
                        className={`w-full text-left px-3.5 py-2 text-xs transition-colors hover:bg-neutral-50 ${
                          sortBy === opt.id
                            ? "text-[#2563eb] font-bold bg-[#eff6ff]"
                            : "text-neutral-700"
                        }`}
                      >
                        {opt.label}
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* Price Range */}
              <div className="relative">
                <button
                  type="button"
                  onClick={() => setIsPriceOpen(!isPriceOpen)}
                  className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg border border-neutral-300 bg-white hover:bg-neutral-50 text-neutral-700 font-medium"
                >
                  <span>Price Range (USD)</span>
                  <FaChevronDown className="text-[9px] text-neutral-400" />
                </button>
                {isPriceOpen && (
                  <div className="absolute top-full left-0 mt-1 w-44 bg-white rounded-xl shadow-xl border border-neutral-200 py-1 z-[100]">
                    {[
                      { id: "all", label: "All Prices" },
                      { id: "under50", label: "Under $50" },
                      { id: "50to100", label: "$50 - $100" },
                      { id: "above100", label: "Above $100" },
                    ].map((p) => (
                      <button
                        key={p.id}
                        type="button"
                        onClick={() => {
                          setPriceRangeFilter(p.id);
                          setIsPriceOpen(false);
                        }}
                        className={`w-full text-left px-3.5 py-2 text-xs hover:bg-neutral-50 ${
                          priceRangeFilter === p.id
                            ? "text-[#2563eb] font-bold bg-[#eff6ff]"
                            : "text-neutral-700"
                        }`}
                      >
                        {p.label}
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* Review Score */}
              <div className="relative">
                <button
                  type="button"
                  onClick={() => setIsReviewOpen(!isReviewOpen)}
                  className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg border border-neutral-300 bg-white hover:bg-neutral-50 text-neutral-700 font-medium"
                >
                  <span>Review Score</span>
                  <FaChevronDown className="text-[9px] text-neutral-400" />
                </button>
                {isReviewOpen && (
                  <div className="absolute top-full left-0 mt-1 w-44 bg-white rounded-xl shadow-xl border border-neutral-200 py-1 z-[100]">
                    {[
                      { score: null, label: "Any Score" },
                      { score: 8.0, label: "8+ Excellent" },
                      { score: 7.0, label: "7+ Very Good" },
                      { score: 5.0, label: "5+ Fair" },
                    ].map((item, idx) => (
                      <button
                        key={idx}
                        type="button"
                        onClick={() => {
                          setReviewScoreFilter(item.score);
                          setIsReviewOpen(false);
                        }}
                        className={`w-full text-left px-3.5 py-2 text-xs hover:bg-neutral-50 ${
                          reviewScoreFilter === item.score
                            ? "text-[#2563eb] font-bold bg-[#eff6ff]"
                            : "text-neutral-700"
                        }`}
                      >
                        {item.label}
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* Star Rating */}
              <div className="relative">
                <button
                  type="button"
                  onClick={() => setIsStarOpen(!isStarOpen)}
                  className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg border border-neutral-300 bg-white hover:bg-neutral-50 text-neutral-700 font-medium"
                >
                  <span>Star Rating</span>
                  <FaChevronDown className="text-[9px] text-neutral-400" />
                </button>
                {isStarOpen && (
                  <div className="absolute top-full left-0 mt-1 w-40 bg-white rounded-xl shadow-xl border border-neutral-200 py-1 z-[100]">
                    <button
                      type="button"
                      onClick={() => {
                        setStarRatingFilter(null);
                        setIsStarOpen(false);
                      }}
                      className="w-full text-left px-3.5 py-2 text-xs text-neutral-700 hover:bg-neutral-50"
                    >
                      All Stars
                    </button>
                    {[5, 4, 3].map((stars) => (
                      <button
                        key={stars}
                        type="button"
                        onClick={() => {
                          setStarRatingFilter(stars);
                          setIsStarOpen(false);
                        }}
                        className={`w-full text-left px-3.5 py-2 text-xs flex items-center gap-1 hover:bg-neutral-50 ${
                          starRatingFilter === stars
                            ? "text-[#2563eb] font-bold bg-[#eff6ff]"
                            : "text-neutral-700"
                        }`}
                      >
                        <span>{stars} Stars</span>
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* Districts / Areas */}
              <div className="relative">
                <button
                  type="button"
                  onClick={() => setIsDistrictOpen(!isDistrictOpen)}
                  className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg border border-neutral-300 bg-white hover:bg-neutral-50 text-neutral-700 font-medium"
                >
                  <span>Districts/Areas</span>
                  <FaChevronDown className="text-[9px] text-neutral-400" />
                </button>
                {isDistrictOpen && (
                  <div className="absolute top-full left-0 mt-1 w-44 bg-white rounded-xl shadow-xl border border-neutral-200 py-1 z-[100]">
                    {[
                      "all",
                      "Gulshan",
                      "Banani",
                      "Shahbagh",
                      "City Center",
                    ].map((d) => (
                      <button
                        key={d}
                        type="button"
                        onClick={() => {
                          setDistrictFilter(d);
                          setIsDistrictOpen(false);
                        }}
                        className={`w-full text-left px-3.5 py-2 text-xs hover:bg-neutral-50 ${
                          districtFilter === d
                            ? "text-[#2563eb] font-bold bg-[#eff6ff]"
                            : "text-neutral-700"
                        }`}
                      >
                        {d === "all" ? "All Areas" : d}
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* Hotel Facilities */}
              <div className="relative">
                <button
                  type="button"
                  onClick={() => setIsFacilitiesOpen(!isFacilitiesOpen)}
                  className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg border border-neutral-300 bg-white hover:bg-neutral-50 text-neutral-700 font-medium"
                >
                  <span>Hotel Facilities</span>
                  <FaChevronDown className="text-[9px] text-neutral-400" />
                </button>
                {isFacilitiesOpen && (
                  <div className="absolute top-full left-0 mt-1 w-48 bg-white rounded-xl shadow-xl border border-neutral-200 p-2 z-[100] space-y-1">
                    {[
                      "Free Wi-Fi",
                      "Swimming Pool",
                      "Breakfast",
                      "Spa & Wellness",
                    ].map((fac) => {
                      const checked = facilitiesFilter.includes(fac);
                      return (
                        <label
                          key={fac}
                          className="flex items-center gap-2 px-2 py-1.5 rounded hover:bg-neutral-50 cursor-pointer text-xs"
                        >
                          <input
                            type="checkbox"
                            checked={checked}
                            onChange={() => {
                              setFacilitiesFilter((prev) =>
                                checked
                                  ? prev.filter((x) => x !== fac)
                                  : [...prev, fac],
                              );
                            }}
                            className="accent-[#2563eb]"
                          />
                          <span className="text-neutral-700">{fac}</span>
                        </label>
                      );
                    })}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* ── Main Content Area: Hotel List (Left) & Sticky Map (Right) ── */}
        <div className="container-page">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
            {/* Left 7 Cols: Hotel Cards */}
            <div className="lg:col-span-7 flex flex-col gap-4">
              {/* Properties count + Price format */}
              <div className="flex items-center justify-between text-xs text-neutral-600">
                <span className="font-semibold">
                  {filteredHotels.length} Properties Found
                </span>
                <div className="flex items-center gap-1">
                  <span>Show price as:</span>
                  <span className="font-semibold text-neutral-900 border border-neutral-300 rounded px-2 py-1 bg-white">
                    Price per night (incl. taxes)
                  </span>
                </div>
              </div>

              {/* In-list Search Bar */}
              <div className="relative">
                <div className="bg-[#F5F5F5] border border-neutral-200 rounded-xl px-4 py-2.5 flex items-center gap-2.5">
                  <FaSearch className="text-neutral-400 text-xs flex-shrink-0" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search by hotel name, brand, address or district"
                    className="w-full text-xs text-neutral-900 placeholder:text-neutral-400 outline-none bg-transparent"
                  />
                  {searchQuery && (
                    <button
                      type="button"
                      onClick={() => setSearchQuery("")}
                      className="text-neutral-400 hover:text-neutral-600 text-xs"
                    >
                      <FaTimes />
                    </button>
                  )}
                </div>
              </div>

              {/* Sign In Promo Banner (Matches Image) */}
              <div className="bg-[#F5F5F5] border border-neutral-200 rounded-2xl p-4 flex items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <span className="text-2xl">🎁</span>
                  <div>
                    <p className="text-sm font-bold text-neutral-900">
                      Sign in, save up to 50%!
                    </p>
                    <p className="text-xs text-neutral-600">
                      Enjoy exclusive rates in{" "}
                      {destination.split(",")[0] || "Dhaka"} just for Mongzo
                      members.
                    </p>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => router.push("/signin")}
                  className="bg-[#2563eb] hover:bg-[#1d4ed8] text-white text-xs font-bold px-5 py-2 rounded-xl transition-all shadow-sm flex-shrink-0"
                >
                  Login
                </button>
              </div>

              {/* Hotel Cards List */}
              <div className="flex flex-col gap-4">
                {filteredHotels.length === 0 ? (
                  <div className="bg-[#F5F5F5] rounded-2xl border border-neutral-200 p-12 text-center">
                    <p className="text-neutral-500 font-medium">
                      No hotels found matching your criteria.
                    </p>
                  </div>
                ) : (
                  filteredHotels.map((hotel) => {
                    const isFav = favorites.includes(hotel.id);
                    const isSelectedOnMap = activeHotelMap.id === hotel.id;

                    return (
                      <div
                        key={hotel.id}
                        onMouseEnter={() => setActiveHotelMap(hotel)}
                        onClick={() => {
                          const params = new URLSearchParams();
                          params.set("id", String(hotel.id));
                          params.set("destination", destination);
                          params.set("checkIn", checkInDate.toISOString());
                          params.set("checkOut", checkOutDate.toISOString());
                          params.set("rooms", String(rooms.length));
                          params.set("adults", String(totalAdults));
                          params.set("children", String(totalChildren));
                          router.push(`/hotels/payment?${params.toString()}`);
                        }}
                        className={`bg-[#F5F5F5] rounded-2xl border transition-all overflow-hidden cursor-pointer hover:shadow-lg ${
                          isSelectedOnMap
                            ? "border-[#2563eb] ring-1 ring-[#2563eb]"
                            : "border-neutral-200 hover:border-neutral-300"
                        }`}
                      >
                        <div className="p-4 sm:p-5 flex flex-col md:flex-row gap-4">
                          {/* Image Thumbnail Grid */}
                          <div className="w-full md:w-56 flex-shrink-0 flex flex-col gap-1.5">
                            <div className="relative w-full h-36 rounded-xl overflow-hidden bg-white">
                              <img
                                src={hotel.images[0]}
                                alt={hotel.name}
                                className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                              />
                              <button
                                type="button"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  toggleFavorite(hotel.id);
                                }}
                                className="absolute top-2 right-2 w-7 h-7 bg-white/90 backdrop-blur rounded-full flex items-center justify-center text-neutral-700 hover:text-red-500 transition-colors shadow-sm"
                              >
                                {isFav ? (
                                  <FaHeart className="text-red-500 text-xs" />
                                ) : (
                                  <FaRegHeart className="text-xs" />
                                )}
                              </button>
                            </div>

                            {/* Small sub-images */}
                            <div className="grid grid-cols-3 gap-1">
                              {hotel.images.slice(1, 4).map((img, i) => (
                                <div
                                  key={i}
                                  className="h-10 rounded-lg overflow-hidden bg-white relative"
                                >
                                  <img
                                    src={img}
                                    alt=""
                                    className="w-full h-full object-cover"
                                  />
                                  {i === 2 && (
                                    <div className="absolute inset-0 bg-black/40 flex items-center justify-center text-[10px] text-white font-bold">
                                      See all
                                    </div>
                                  )}
                                </div>
                              ))}
                            </div>
                          </div>

                          {/* Hotel Info & Price */}
                          <div className="flex-1 flex flex-col justify-between">
                            <div>
                              {/* Header title & stars */}
                              <div className="flex items-start justify-between gap-2 mb-1">
                                <div>
                                  <h3 className="text-base font-bold text-neutral-900 inline-flex items-center gap-1.5">
                                    <span>{hotel.name}</span>
                                    <span className="flex text-amber-400 text-xs">
                                      {Array.from({ length: hotel.stars }).map(
                                        (_, idx) => (
                                          <FaStar key={idx} />
                                        ),
                                      )}
                                    </span>
                                  </h3>
                                  <div className="flex items-center gap-1.5 text-xs text-neutral-500 mt-0.5">
                                    <FaMapMarkerAlt className="text-neutral-400 text-[11px]" />
                                    <span>{hotel.area}</span>
                                    <span>•</span>
                                    <span>{hotel.distanceFromCenter}</span>
                                  </div>
                                </div>

                                {/* Review score badge */}
                                <div className="text-right flex items-center gap-2 flex-shrink-0">
                                  <div>
                                    <div className="text-xs font-bold text-neutral-900 leading-tight">
                                      {hotel.ratingLabel}
                                    </div>
                                    <div className="text-[10px] text-neutral-400">
                                      {hotel.reviewsCount} Reviews
                                    </div>
                                  </div>
                                  <div className="bg-[#2563eb] text-white text-xs font-bold px-2 py-1 rounded-lg">
                                    {hotel.ratingScore.toFixed(1)}
                                  </div>
                                </div>
                              </div>

                              {/* Breakfast included tag */}
                              {hotel.breakfastIncluded && (
                                <div className="text-xs font-semibold text-[#2563eb] mb-2">
                                  Breakfast Included
                                </div>
                              )}

                              {/* Features bullet points */}
                              <div className="grid grid-cols-2 gap-x-3 gap-y-1 text-xs text-neutral-700 mb-2">
                                {hotel.positiveFeatures.map((feat, idx) => (
                                  <div
                                    key={idx}
                                    className="flex items-center gap-1.5"
                                  >
                                    <FaCheck className="text-[#2563eb] text-[10px] flex-shrink-0" />
                                    <span>{feat}</span>
                                  </div>
                                ))}
                                {hotel.negativeFeatures?.map((feat, idx) => (
                                  <div
                                    key={idx}
                                    className="flex items-center gap-1.5 text-red-500"
                                  >
                                    <FaTimes className="text-[10px] flex-shrink-0" />
                                    <span>{feat}</span>
                                  </div>
                                ))}
                              </div>
                            </div>

                            {/* Price Bottom Row */}
                            <div className="flex items-end justify-between pt-3 border-t border-neutral-200 mt-2">
                              <div>
                                {hotel.priceWentUp && (
                                  <span className="text-[11px] font-semibold text-red-500">
                                    * Price went up
                                  </span>
                                )}
                                {hotel.dealTag && (
                                  <span className="inline-block bg-[#2563eb] text-white text-[10px] font-bold px-2 py-0.5 rounded">
                                    {hotel.dealTag}
                                  </span>
                                )}
                              </div>

                              <div className="text-right">
                                {hotel.originalPrice && (
                                  <span className="text-xs text-neutral-400 line-through mr-1.5">
                                    US${hotel.originalPrice}
                                  </span>
                                )}
                                <span className="text-xl font-extrabold text-neutral-900">
                                  US${hotel.pricePerNight}
                                </span>
                                <div className="text-[10px] text-neutral-400 leading-tight">
                                  includes taxes and fees
                                </div>
                                <div className="text-[10px] text-neutral-500 font-medium">
                                  per night
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })
                )}
              </div>
            </div>

            {/* Right 5 Cols: Google Map (Sticky & Fits neatly under 100vh) */}
            <div className="lg:col-span-5 sticky top-[215px] self-start">
              <div className="bg-[#F5F5F5] rounded-2xl border border-neutral-200 p-2 shadow-sm overflow-hidden h-[calc(100vh-235px)] min-h-[420px] flex flex-col relative">
                {/* Search on Map Pill Button (Matches Image) */}
                <div className="absolute top-4 left-1/2 -translate-x-1/2 z-10">
                  <button
                    type="button"
                    className="bg-white hover:bg-neutral-50 text-neutral-800 text-xs font-bold px-4 py-2 rounded-full shadow-md border border-neutral-200 flex items-center gap-1.5 transition-all"
                  >
                    <FaSearch className="text-[#2563eb] text-xs" />
                    <span>Search on Map</span>
                  </button>
                </div>

                {/* Google Map Iframe */}
                <div className="flex-1 w-full rounded-xl overflow-hidden relative">
                  <iframe
                    title="Hotel location map"
                    src={`https://www.google.com/maps?q=${activeHotelMap.lat},${activeHotelMap.lng}&z=14&output=embed`}
                    className="w-full h-full border-0 rounded-xl"
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                  />
                </div>

                {/* Bottom preview overlay of selected hotel */}
                <div className="p-3 bg-white rounded-xl mt-2 border border-neutral-200 flex items-center justify-between flex-shrink-0">
                  <div>
                    <p className="text-xs font-bold text-neutral-900">
                      {activeHotelMap.name}
                    </p>
                    <p className="text-[11px] text-neutral-500">
                      {activeHotelMap.area}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-extrabold text-[#2563eb]">
                      US${activeHotelMap.pricePerNight}
                      <span className="text-[10px] text-neutral-400 font-normal">
                        {" "}
                        /night
                      </span>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}

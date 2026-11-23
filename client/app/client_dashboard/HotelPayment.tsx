"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  FaStar,
  FaMapMarkerAlt,
  FaHeart,
  FaRegHeart,
  FaWifi,
  FaTv,
  FaBath,
  FaUtensils,
  FaParking,
  FaBan,
  FaCheck,
  FaChevronRight,
  FaChevronDown,
  FaSuitcase,
  FaCalendarAlt,
  FaUserFriends,
  FaShareAlt,
} from "react-icons/fa";
import { FiCheck } from "react-icons/fi";
import Navbar from "./components/Navbar";
import NavServiceBar from "./components/NavServiceBar";
import Footer from "./components/Footer";
import { INITIAL_HOTELS, HotelItem } from "./Hotels";

interface RoomOption {
  id: string;
  name: string;
  bedType: string;
  image: string;
  photosCount: number;
  breakfastIncluded: boolean;
  refundable: boolean;
  pricePerNight: number;
  originalPrice: number;
  bestDeal: boolean;
  facilities: string[];
}

const ROOM_OPTIONS: RoomOption[] = [
  {
    id: "deluxe_twin",
    name: "Deluxe Room with Twin Bed",
    bedType: "1 × Twin Bed",
    image:
      "https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&w=600&q=80",
    photosCount: 2,
    breakfastIncluded: true,
    refundable: false,
    pricePerNight: 12,
    originalPrice: 34,
    bestDeal: true,
    facilities: [
      "Air conditioning",
      "Television",
      "Private Bathroom",
      "Free toiletries",
      "Bathrobes provided",
      "Slippers provided",
    ],
  },
  {
    id: "deluxe_double",
    name: "Deluxe Double Room",
    bedType: "1 × King Bed",
    image:
      "https://images.unsplash.com/photo-1566665797739-1674de7a421a?auto=format&fit=crop&w=600&q=80",
    photosCount: 9,
    breakfastIncluded: true,
    refundable: false,
    pricePerNight: 12,
    originalPrice: 34,
    bestDeal: true,
    facilities: [
      "Air conditioning",
      "Television",
      "Private Bathroom",
      "Free toiletries",
      "Bathrobes provided",
      "Slippers provided",
    ],
  },
];

interface ReviewItem {
  id: string;
  author: string;
  type: string;
  rating: number;
  comment: string;
  source: string;
}

const REVIEWS: ReviewItem[] = [
  {
    id: "1",
    author: "Md Shafikul Islam",
    type: "Family With Children",
    rating: 1.0,
    comment:
      "Hotel is workable but the staff is helpful through online portals. Rooms are accessible and close to the airport.",
    source: "Booking.com",
  },
  {
    id: "2",
    author: "Bipu",
    type: "Solo Traveller",
    rating: 1.0,
    comment:
      "The location is very convenient near the railway station and market with easy transport connectivity.",
    source: "Booking.com",
  },
  {
    id: "3",
    author: "Nazmul Huda",
    type: "Solo Traveller",
    rating: 10.0,
    comment:
      "Rooms are big and comfortable and manager was very helpful with airport drop and check-in.",
    source: "Booking.com",
  },
];

interface NearbyHotel {
  id: number;
  name: string;
  stars: number;
  distance: string;
  ratingScore: number;
  image: string;
  price: number;
  originalPrice?: number;
  discountBadge?: string;
  breakfastIncluded?: boolean;
}

const NEARBY_HOTELS: NearbyHotel[] = [
  {
    id: 101,
    name: "Hotel Moon Light",
    stars: 3,
    distance: "Dhaka City Center • 104 m away",
    ratingScore: 6.6,
    image:
      "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=600&q=80",
    price: 32,
    originalPrice: 40,
    discountBadge: "-22%",
  },
  {
    id: 102,
    name: "Holiday Xpress",
    stars: 3,
    distance: "Dhaka City Center • 100 m away",
    ratingScore: 6.6,
    image:
      "https://images.unsplash.com/photo-1591088398332-8a7791972843?auto=format&fit=crop&w=600&q=80",
    price: 57,
    breakfastIncluded: true,
  },
  {
    id: 103,
    name: "Hotel The Sylhet Int.",
    stars: 3,
    distance: "Dhaka City Center • 976 m away",
    ratingScore: 4.6,
    image:
      "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=600&q=80",
    price: 24,
  },
  {
    id: 104,
    name: "Nagar Valley Hotel",
    stars: 3,
    distance: "Uttara • 1.21 km away from Hotel",
    ratingScore: 6.7,
    image:
      "https://images.unsplash.com/photo-1564501049412-61c2a3083791?auto=format&fit=crop&w=600&q=80",
    price: 27,
    breakfastIncluded: true,
  },
];

interface HotelPaymentProps {
  hotelId?: number;
  destination?: string;
  checkIn?: string;
  checkOut?: string;
  rooms?: number;
  adults?: number;
  childCount?: number;
}

export default function HotelPayment({
  hotelId = 1,
  destination = "Dhaka, Bangladesh",
  checkIn,
  checkOut,
  rooms = 1,
  adults = 2,
  childCount = 0,
}: HotelPaymentProps) {
  const router = useRouter();

  // Find hotel or default
  const hotel: HotelItem =
    INITIAL_HOTELS.find((h) => h.id === hotelId) || INITIAL_HOTELS[0];

  const [activeTab, setActiveTab] = useState<
    "rooms" | "location" | "reviews" | "facilities" | "policy" | "nearby"
  >("rooms");

  const [isFavorite, setIsFavorite] = useState(false);
  const [selectedRoom, setSelectedRoom] = useState<string>("deluxe_twin");

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="min-h-screen bg-[#FFFFFF] text-neutral-900 flex flex-col font-sans">
      <Navbar />

      <main className="flex-1 pt-[var(--nav-h)] md:pt-24 pb-20">
        <NavServiceBar active="hotels" />
        <div className="container-page max-w-6xl mx-auto space-y-6">
          {/* Top Header Card */}
          <div className="bg-[#F5F5F5] rounded-2xl border border-neutral-200 p-5 sm:p-6 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-2xl font-bold text-neutral-900">{hotel.name}</h1>
                <div className="flex text-amber-400 text-sm">
                  {Array.from({ length: hotel.stars }).map((_, i) => (
                    <FaStar key={i} />
                  ))}
                </div>
              </div>
              <p className="text-xs text-neutral-500 mt-1 flex items-center gap-1.5 flex-wrap">
                <FaMapMarkerAlt className="text-neutral-400" />
                <span>
                  Ashkona, Hajj Camp, Dakshinkhan, 403, Haji Komoruddin Tower, 1230,
                  Dhaka
                </span>
                <button
                  type="button"
                  onClick={() => scrollToSection("hotel-location")}
                  className="text-[#2563eb] hover:underline font-semibold ml-1"
                >
                  View on map
                </button>
              </p>
            </div>

            <div className="flex items-center gap-4">
              <button
                type="button"
                onClick={() => setIsFavorite(!isFavorite)}
                className="w-10 h-10 rounded-full border border-neutral-300 bg-white flex items-center justify-center text-neutral-700 hover:text-red-500 hover:border-red-300 transition-colors shadow-sm"
              >
                {isFavorite ? (
                  <FaHeart className="text-red-500 text-sm" />
                ) : (
                  <FaRegHeart className="text-sm" />
                )}
              </button>

              <div className="text-right">
                <p className="text-[11px] text-neutral-500">
                  Per night, {adults} guests from
                </p>
                <p className="text-2xl font-extrabold text-neutral-900">
                  US${hotel.pricePerNight}
                </p>
              </div>

              <button
                type="button"
                onClick={() => scrollToSection("hotel-rooms")}
                className="bg-[#2563eb] hover:bg-[#1d4ed8] active:scale-95 text-white font-bold text-sm px-6 py-3 rounded-xl transition-all shadow-md shadow-blue-500/20"
              >
                Choose Room
              </button>
            </div>
          </div>

          {/* Photo Gallery Grid (Matches Image 1) */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-3">
            {/* Big Main Image (8 cols) */}
            <div className="md:col-span-8 h-80 sm:h-96 rounded-2xl overflow-hidden bg-white border border-neutral-200">
              <img
                src={hotel.images[0]}
                alt={hotel.name}
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
              />
            </div>

            {/* 4-Image Grid (4 cols) */}
            <div className="md:col-span-4 grid grid-cols-2 gap-3">
              <div className="relative rounded-xl overflow-hidden bg-white border border-neutral-200 h-40 sm:h-[186px]">
                <img
                  src={hotel.images[1] || hotel.images[0]}
                  alt="Rooms"
                  className="w-full h-full object-cover"
                />
                <span className="absolute bottom-2 left-2 bg-black/60 backdrop-blur text-white text-[11px] font-semibold px-2 py-0.5 rounded">
                  Rooms
                </span>
              </div>
              <div className="relative rounded-xl overflow-hidden bg-white border border-neutral-200 h-40 sm:h-[186px]">
                <img
                  src={hotel.images[2] || hotel.images[0]}
                  alt="Bathrooms"
                  className="w-full h-full object-cover"
                />
                <span className="absolute bottom-2 left-2 bg-black/60 backdrop-blur text-white text-[11px] font-semibold px-2 py-0.5 rounded">
                  Bathrooms
                </span>
              </div>
              <div className="relative rounded-xl overflow-hidden bg-white border border-neutral-200 h-40 sm:h-[186px]">
                <img
                  src={hotel.images[3] || hotel.images[0]}
                  alt="Exterior"
                  className="w-full h-full object-cover"
                />
                <span className="absolute bottom-2 left-2 bg-black/60 backdrop-blur text-white text-[11px] font-semibold px-2 py-0.5 rounded">
                  Exterior
                </span>
              </div>
              <div className="relative rounded-xl overflow-hidden bg-white border border-neutral-200 h-40 sm:h-[186px]">
                <img
                  src={hotel.images[0]}
                  alt="More photos"
                  className="w-full h-full object-cover"
                />
                <span className="absolute bottom-2 left-2 bg-black/60 backdrop-blur text-white text-[11px] font-semibold px-2 py-0.5 rounded">
                  +37 photos
                </span>
              </div>
            </div>
          </div>

          {/* Description & Favorite Facilities Pill bar */}
          <div className="bg-[#F5F5F5] rounded-2xl border border-neutral-200 p-5 sm:p-6 shadow-sm flex flex-col md:flex-row justify-between items-start gap-6">
            <div className="flex-1 space-y-3">
              <p className="text-xs sm:text-sm text-neutral-700 leading-relaxed">
                Comfortable Accommodations {hotel.name} in Dhaka offers family rooms
                with air-conditioning, private bathrooms, and free WiFi. Each room
                includes a work desk, TV, and complimentary toiletries...
                <button
                  type="button"
                  className="text-[#2563eb] hover:underline ml-1 font-semibold"
                >
                  Read more
                </button>
              </p>

              <div>
                <span className="text-xs font-bold text-neutral-800 block mb-2">
                   Guest&apos;s favorite facilities:
                </span>
                <div className="flex flex-wrap gap-2 text-xs text-neutral-700">
                  <span className="bg-white border border-neutral-200 rounded-lg px-3 py-1.5 flex items-center gap-1.5">
                    <FaParking className="text-[#2563eb]" /> Parking Available
                  </span>
                  <span className="bg-white border border-neutral-200 rounded-lg px-3 py-1.5 flex items-center gap-1.5">
                    <FaWifi className="text-[#2563eb]" /> Highspeed Internet
                  </span>
                  <span className="bg-white border border-neutral-200 rounded-lg px-3 py-1.5 flex items-center gap-1.5">
                    <FaCheck className="text-[#2563eb]" /> Airconditioning
                  </span>
                </div>
              </div>
            </div>

            {/* Rating badge */}
            <div className="flex items-center gap-3 bg-white border border-neutral-200 rounded-xl p-3 flex-shrink-0">
              <div className="text-right">
                <span className="text-xs font-bold text-neutral-900 block">
                  {hotel.ratingLabel}
                </span>
                <span className="text-[10px] text-neutral-400">
                  {hotel.reviewsCount} reviews
                </span>
              </div>
              <div className="w-10 h-10 rounded-xl bg-[#2563eb] text-white flex items-center justify-center font-extrabold text-sm shadow-sm">
                {hotel.ratingScore.toFixed(1)}
              </div>
            </div>
          </div>

          {/* Navigation Sub-Tabs Bar (Matches Image 2) */}
          <div className="-mx-4 sm:-mx-8 md:-mx-8 lg:mx-0 border-b border-neutral-200 sticky top-[var(--nav-h)] bg-white/95 backdrop-blur z-40 md:py-1 lg:py-2">
            <div className="px-1 sm:container-page sm:px-8 md:px-8 lg:px-0 grid grid-cols-6 items-center gap-0 sm:overflow-x-auto no-scrollbar text-[8.5px] sm:text-xs font-bold tracking-tight sm:tracking-wider uppercase text-neutral-600 py-1 sm:py-2">
              {[
                { id: "rooms", label: "Rooms" },
                { id: "location", label: "Location" },
                { id: "reviews", label: "Reviews" },
                { id: "facilities", label: "Facilities" },
                { id: "policy", label: "Policy" },
                { id: "nearby", label: "Nearby Hotels" },
              ].map((tab) => (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => {
                    setActiveTab(tab.id as any);
                    scrollToSection(`hotel-${tab.id}`);
                  }}
                  className={`block w-full pb-2 whitespace-nowrap text-center sm:text-left transition-colors relative px-0.5 overflow-hidden text-ellipsis ${
                    activeTab === tab.id
                      ? "text-[#2563eb]"
                      : "text-neutral-500 hover:text-neutral-900"
                  }`}
                >
                  {tab.label}
                  {activeTab === tab.id && (
                    <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#2563eb] rounded-full" />
                  )}
                </button>
              ))}
            </div>
          </div>

          {/* ── Section: Room Options (Matches Images 2 & 3) ─────────────── */}
          <div id="hotel-rooms" className="[scroll-margin-top:calc(var(--nav-h)+48px)] space-y-4">
            <div className="bg-[#F5F5F5] rounded-2xl border border-neutral-200 p-6 shadow-sm">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h2 className="text-xl font-bold text-neutral-900">Room Options</h2>
                  <p className="text-xs text-neutral-500 mt-1">2 Rooms available</p>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-xs text-neutral-600">Show price as:</span>
                  <span className="text-xs font-semibold text-neutral-900 bg-white border border-neutral-200 rounded px-2.5 py-1">
                    Price per night (incl. taxes)
                  </span>
                </div>
              </div>

              {/* Room Cards List */}
              <div className="space-y-4">
                {ROOM_OPTIONS.map((room) => {
                  const isSelected = selectedRoom === room.id;
                  return (
                    <div
                      key={room.id}
                      className="bg-white rounded-2xl border border-neutral-200 p-5 shadow-sm hover:border-neutral-300 transition-all"
                    >
                      <div className="flex flex-col md:flex-row gap-5 items-start">
                        {/* Room Image */}
                        <div className="w-full md:w-64 h-44 rounded-xl overflow-hidden relative flex-shrink-0 bg-neutral-100">
                          <img
                            src={room.image}
                            alt={room.name}
                            className="w-full h-full object-cover"
                          />
                          <span className="absolute bottom-2 right-2 bg-black/60 text-white text-[10px] font-semibold px-2 py-0.5 rounded">
                            📷 {room.photosCount}
                          </span>
                        </div>

                        {/* Room details & specs */}
                        <div className="flex-1 flex flex-col justify-between h-full space-y-4">
                          <div>
                            <div className="flex items-start justify-between gap-4">
                              <div>
                                <h3 className="text-base font-bold text-neutral-900">
                                  {room.name}
                                </h3>
                                <p className="text-xs text-neutral-500 mt-0.5">
                                  {room.bedType}
                                </p>
                              </div>

                              <div className="text-right">
                                <span className="text-[10px] text-neutral-400 block">
                                  Includes taxes and fees
                                </span>
                                <div className="flex items-baseline justify-end gap-1.5 mt-0.5">
                                  <span className="text-xs text-neutral-400 line-through">
                                    US${room.originalPrice}
                                  </span>
                                  <span className="text-2xl font-extrabold text-neutral-900">
                                    US${room.pricePerNight}
                                  </span>
                                </div>
                              </div>
                            </div>

                            <p className="text-[11px] text-neutral-500 mt-1">
                              Price per night for {rooms} room, {adults} guests
                            </p>

                            <div className="mt-3 flex flex-wrap items-center gap-3 text-xs">
                              {room.breakfastIncluded && (
                                <span className="inline-flex items-center gap-1 text-[#2563eb] font-semibold">
                                  <FaUtensils className="text-xs" /> Breakfast Included
                                </span>
                              )}
                              {!room.refundable && (
                                <span className="inline-flex items-center gap-1 text-neutral-500">
                                  <FaBan className="text-xs" /> Non-refundable
                                </span>
                              )}
                              {room.bestDeal && (
                                <span className="bg-red-500 text-white text-[10px] font-bold px-2 py-0.5 rounded">
                                  Best Deal
                                </span>
                              )}
                            </div>
                          </div>

                          {/* Facilities tags & Book button */}
                          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 pt-3 border-t border-neutral-100">
                            <div>
                              <span className="text-[11px] font-bold text-neutral-600 block mb-1.5">
                                Facilities
                              </span>
                              <div className="flex flex-wrap gap-1.5 text-[11px] text-neutral-600">
                                {room.facilities.map((fac, idx) => (
                                  <span
                                    key={idx}
                                    className="bg-neutral-50 border border-neutral-200 rounded px-2 py-0.5"
                                  >
                                    {fac}
                                  </span>
                                ))}
                              </div>
                            </div>

                            <button
                              type="button"
                              onClick={() => setSelectedRoom(room.id)}
                              className="bg-[#2563eb] hover:bg-[#1d4ed8] active:scale-95 text-white font-bold text-xs px-6 py-2.5 rounded-xl transition-all shadow-md shadow-blue-500/20 flex-shrink-0"
                            >
                              Book Now
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* ── Section: Location (Matches Image 4) ───────────────────────── */}
          <div id="hotel-location" className="[scroll-margin-top:calc(var(--nav-h)+48px)]">
            <div className="bg-[#F5F5F5] rounded-2xl border border-neutral-200 p-6 shadow-sm space-y-4">
              <h2 className="text-xl font-bold text-neutral-900">Location</h2>

              <div className="h-72 rounded-2xl overflow-hidden border border-neutral-200 bg-white">
                <iframe
                  title="Hotel location"
                  src={`https://www.google.com/maps?q=${hotel.lat},${hotel.lng}&z=14&output=embed`}
                  className="w-full h-full border-0"
                  loading="lazy"
                />
              </div>

              <div className="text-xs text-neutral-600 flex items-center gap-1.5">
                <FaMapMarkerAlt className="text-[#2563eb] flex-shrink-0" />
                <span>
                  Ashkona, Hajj Camp, Dakshinkhan, 403, Haji Komoruddin Tower, 1230,
                  Dhaka, Dhaka Division
                </span>
              </div>

              <div className="border-t border-neutral-200 pt-3">
                <h3 className="text-xs font-bold text-neutral-800 mb-2">What&apos;s Nearby</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs text-neutral-700">
                  <div className="flex items-center justify-between bg-white border border-neutral-200 rounded-xl p-3">
                    <span>City centre (Dhaka)</span>
                    <span className="font-semibold text-neutral-900">4.59 km</span>
                  </div>
                  <div className="flex items-center justify-between bg-white border border-neutral-200 rounded-xl p-3">
                    <span>Dhaka Hazrat Shahjalal Intl (DAC)</span>
                    <span className="font-semibold text-neutral-900">1.86 km</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* ── Section: Guest Reviews (Matches Image 5) ───────────────────── */}
          <div id="hotel-reviews" className="[scroll-margin-top:calc(var(--nav-h)+48px)]">
            <div className="bg-[#F5F5F5] rounded-2xl border border-neutral-200 p-6 shadow-sm space-y-4">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-bold text-neutral-900">Guest Reviews</h2>
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold text-neutral-700">
                    {hotel.ratingLabel}
                  </span>
                  <span className="bg-[#2563eb] text-white text-xs font-bold px-2 py-0.5 rounded">
                    {hotel.ratingScore.toFixed(1)}
                  </span>
                </div>
              </div>

              {/* Review Filter Pills */}
              <div className="flex flex-wrap gap-2 text-xs">
                {[
                  "Room",
                  "Service",
                  "Breakfast",
                  "Wifi",
                  "Location",
                  "Clean",
                  "Noise",
                  "Parking",
                ].map((tag) => (
                  <button
                    key={tag}
                    type="button"
                    className="bg-white border border-neutral-200 text-neutral-700 hover:border-[#2563eb] px-3 py-1 rounded-lg font-medium transition-colors"
                  >
                    {tag}
                  </button>
                ))}
              </div>

              {/* Reviews Cards Grid */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {REVIEWS.map((rev) => (
                  <div
                    key={rev.id}
                    className="bg-white rounded-xl border border-neutral-200 p-4 flex flex-col justify-between shadow-sm space-y-3"
                  >
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <div>
                          <div className="text-xs font-bold text-neutral-900">
                            {rev.author}
                          </div>
                          <div className="text-[10px] text-neutral-400">
                            {rev.type}
                          </div>
                        </div>
                        <span className="text-xs font-bold border border-neutral-300 rounded px-1.5 py-0.5 text-neutral-800">
                          {rev.rating.toFixed(1)}
                        </span>
                      </div>
                      <p className="text-xs text-neutral-600 leading-relaxed">
                        {rev.comment}
                      </p>
                    </div>

                    <div className="text-[10px] text-neutral-400 border-t border-neutral-100 pt-2">
                      Reviewed from{" "}
                      <span className="font-bold text-neutral-700">
                        {rev.source}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* ── Section: Facilities (Matches Image 6) ──────────────────────── */}
          <div id="hotel-facilities" className="[scroll-margin-top:calc(var(--nav-h)+48px)]">
            <div className="bg-[#F5F5F5] rounded-2xl border border-neutral-200 p-6 shadow-sm space-y-4">
              <h2 className="text-xl font-bold text-neutral-900">Facilities</h2>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-xs text-neutral-700">
                {/* Connectivity */}
                <div className="space-y-2">
                  <h3 className="font-bold text-sm text-neutral-900 flex items-center gap-1.5">
                    <FaWifi className="text-[#2563eb]" /> Connectivity
                  </h3>
                  <p className="flex items-center gap-1.5">
                    <FaCheck className="text-[#2563eb] text-[10px]" /> Highspeed
                    Internet
                  </p>
                </div>

                {/* Food & Drinks */}
                <div className="space-y-2">
                  <h3 className="font-bold text-sm text-neutral-900 flex items-center gap-1.5">
                    <FaUtensils className="text-[#2563eb]" /> Food &amp; Drinks
                  </h3>
                  <p className="flex items-center gap-1.5">
                    <FaCheck className="text-[#2563eb] text-[10px]" /> Restaurant
                  </p>
                  <p className="flex items-center gap-1.5">
                    <FaCheck className="text-[#2563eb] text-[10px]" /> Snack Bar
                  </p>
                </div>

                {/* Transportation */}
                <div className="space-y-2">
                  <h3 className="font-bold text-sm text-neutral-900 flex items-center gap-1.5">
                    <FaSuitcase className="text-[#2563eb]" /> Transportation
                  </h3>
                  <p className="flex items-center gap-1.5">
                    <FaCheck className="text-[#2563eb] text-[10px]" /> Airport
                    Shuttle
                  </p>
                  <p className="flex items-center gap-1.5">
                    <FaCheck className="text-[#2563eb] text-[10px]" /> Car Rental
                  </p>
                  <p className="flex items-center gap-1.5">
                    <FaCheck className="text-[#2563eb] text-[10px]" /> Shuttle
                    Service
                  </p>
                </div>

                {/* Facilities & Services */}
                <div className="space-y-2">
                  <h3 className="font-bold text-sm text-neutral-900 flex items-center gap-1.5">
                    <FaCheck className="text-[#2563eb]" /> Facilities &amp;
                    Services
                  </h3>
                  <p className="flex items-center gap-1.5">
                    <FaCheck className="text-[#2563eb] text-[10px]" /> Airconditioning
                  </p>
                  <p className="flex items-center gap-1.5">
                    <FaCheck className="text-[#2563eb] text-[10px]" /> Room Service
                  </p>
                  <p className="flex items-center gap-1.5">
                    <FaCheck className="text-[#2563eb] text-[10px]" /> Non-smoking
                    Rooms
                  </p>
                </div>

                {/* Parking */}
                <div className="space-y-2">
                  <h3 className="font-bold text-sm text-neutral-900 flex items-center gap-1.5">
                    <FaParking className="text-[#2563eb]" /> Parking
                  </h3>
                  <p className="flex items-center gap-1.5">
                    <FaCheck className="text-[#2563eb] text-[10px]" /> Parking
                    Available
                  </p>
                </div>

                {/* Property Policies */}
                <div className="space-y-2">
                  <h3 className="font-bold text-sm text-neutral-900 flex items-center gap-1.5">
                    <FaCheck className="text-[#2563eb]" /> Property Policies
                  </h3>
                  <p className="flex items-center gap-1.5">
                    <FaCheck className="text-[#2563eb] text-[10px]" /> Pet-friendly
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* ── Section: Property Policies (Matches Image 6) ────────────────── */}
          <div id="hotel-policy" className="[scroll-margin-top:calc(var(--nav-h)+48px)]">
            <div className="bg-[#F5F5F5] rounded-2xl border border-neutral-200 p-6 shadow-sm space-y-4">
              <h2 className="text-xl font-bold text-neutral-900">Property Policies</h2>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-xs text-neutral-700">
                <div className="flex items-start gap-3">
                  <FaCalendarAlt className="text-neutral-400 text-lg mt-0.5" />
                  <div>
                    <span className="font-bold text-neutral-900 block">Check-in time</span>
                    <span className="text-neutral-600">1:00 PM</span>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <FaCalendarAlt className="text-neutral-400 text-lg mt-0.5" />
                  <div>
                    <span className="font-bold text-neutral-900 block">Check-out time</span>
                    <span className="text-neutral-600">12:00 PM</span>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <FaCheck className="text-neutral-400 text-lg mt-0.5" />
                  <div>
                    <span className="font-bold text-neutral-900 block">Contact number</span>
                    <span className="text-neutral-600">8801894782070</span>
                  </div>
                </div>
              </div>

              <div className="border-t border-neutral-200 pt-3">
                <span className="text-xs font-bold text-neutral-800 block mb-2">
                  Accepted payment methods
                </span>
                <div className="flex flex-wrap items-center gap-2">
                  <span className="bg-white border border-neutral-200 rounded px-2.5 py-1 text-[11px] font-bold text-emerald-600">
                    Cash
                  </span>
                  <span className="bg-white border border-neutral-200 rounded px-2.5 py-1 text-[11px] font-bold text-blue-700">
                    VISA
                  </span>
                  <span className="bg-white border border-neutral-200 rounded px-2.5 py-1 text-[11px] font-bold text-red-600">
                    MasterCard
                  </span>
                  <span className="bg-white border border-neutral-200 rounded px-2.5 py-1 text-[11px] font-bold text-neutral-700">
                    AMEX
                  </span>
                  <span className="bg-white border border-neutral-200 rounded px-2.5 py-1 text-[11px] font-bold text-neutral-700">
                    Discover
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* ── Section: Nearby Similar Hotels (Matches Image 7) ────────────── */}
          <div id="hotel-nearby" className="[scroll-margin-top:calc(var(--nav-h)+48px)]">
            <div className="bg-[#F5F5F5] rounded-2xl border border-neutral-200 p-6 shadow-sm space-y-4">
              <h2 className="text-xl font-bold text-neutral-900">
                Nearby Similar Hotels
              </h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {NEARBY_HOTELS.map((item) => (
                  <div
                    key={item.id}
                    onClick={() => {
                      const params = new URLSearchParams();
                      params.set("id", String(item.id));
                      router.push(`/hotels/payment?${params.toString()}`);
                    }}
                    className="bg-white rounded-2xl border border-neutral-200 overflow-hidden shadow-sm hover:shadow-md cursor-pointer transition-all flex flex-col justify-between"
                  >
                    <div>
                      <div className="relative h-36 w-full bg-neutral-100">
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                        />
                        <span className="absolute top-2 right-2 bg-black/60 backdrop-blur text-white text-[11px] font-bold px-2 py-0.5 rounded">
                          {item.ratingScore}
                        </span>
                      </div>

                      <div className="p-3.5 space-y-1">
                        <h4 className="font-bold text-xs text-neutral-900 truncate">
                          {item.name}
                        </h4>
                        <div className="flex text-amber-400 text-[10px]">
                          {Array.from({ length: item.stars }).map((_, i) => (
                            <FaStar key={i} />
                          ))}
                        </div>
                        <p className="text-[10px] text-neutral-500 truncate">
                          {item.distance}
                        </p>
                        {item.breakfastIncluded && (
                          <p className="text-[10px] font-semibold text-[#2563eb]">
                            ✓ Breakfast Included
                          </p>
                        )}
                      </div>
                    </div>

                    <div className="p-3.5 pt-0 text-right border-t border-neutral-50">
                      {item.discountBadge && (
                        <span className="bg-red-500 text-white text-[9px] font-bold px-1.5 py-0.5 rounded mr-1">
                          {item.discountBadge}
                        </span>
                      )}
                      {item.originalPrice && (
                        <span className="text-[10px] text-neutral-400 line-through mr-1">
                          US${item.originalPrice}
                        </span>
                      )}
                      <span className="text-sm font-extrabold text-neutral-900">
                        US${item.price}
                      </span>
                      <p className="text-[9px] text-neutral-400">including taxes &amp; fees</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}

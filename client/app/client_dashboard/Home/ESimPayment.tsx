"use client";
import React, { useState, useMemo } from "react";
import { useRouter } from "next/navigation";
import {
  FaHeart,
  FaRegHeart,
  FaStar,
  FaChevronRight,
  FaCheckCircle,
  FaShieldAlt,
  FaCalendarAlt,
  FaMinus,
  FaPlus,
  FaInfoCircle,
} from "react-icons/fa";
import { FiCheck } from "react-icons/fi";
import { ESIM_PRODUCTS, ESimProduct } from "./ESimSection";
import NavServiceBar from "../components/NavServiceBar";

const DAYS_OPTIONS = [
  "1 day",
  "2 days",
  "3 days",
  "4 days",
  "5 days",
  "6 days",
  "7 days",
  "8 days",
  "9 days",
  "10 days",
  "11 days",
  "12 days",
  "13 days",
  "14 days",
  "15 days",
  "16 days",
  "17 days",
  "18 days",
  "19 days",
  "20 days",
  "25 days",
  "30 days",
];

interface PlanTier {
  id: string;
  label: string;
  basePrice: number; // in USD per day
}

const PLAN_TIERS: PlanTier[] = [
  { id: "daily_0_5gb", label: "Daily 0.5GB", basePrice: 0.08 },
  { id: "daily_1gb", label: "Daily 1GB", basePrice: 0.15 },
  { id: "daily_2gb", label: "Daily 2GB", basePrice: 0.28 },
  { id: "daily_3gb", label: "Daily 3GB", basePrice: 0.39 },
  { id: "daily_100gb_10mbps", label: "Daily 100GB (Capped at 10Mbps)", basePrice: 0.65 },
  { id: "daily_100gb_unrestricted", label: "Daily 100GB (Unrestricted Speed)", basePrice: 0.95 },
  { id: "total_1gb", label: "Total 1GB", basePrice: 0.8 },
  { id: "total_3gb", label: "Total 3GB", basePrice: 2.1 },
  { id: "total_5gb", label: "Total 5GB", basePrice: 3.4 },
  { id: "total_10gb", label: "Total 10GB", basePrice: 5.9 },
  { id: "total_15gb", label: "Total 15GB", basePrice: 8.2 },
  { id: "total_20gb", label: "Total 20GB", basePrice: 10.5 },
  { id: "total_30gb", label: "Total 30GB", basePrice: 14.9 },
  { id: "total_50gb", label: "Total 50GB", basePrice: 22.0 },
];

interface ESimPaymentProps {
  productId?: string;
}

export default function ESimPayment({ productId }: ESimPaymentProps) {
  const router = useRouter();

  // Find product by id, fallback to first product
  const product: ESimProduct = useMemo(() => {
    const found = ESIM_PRODUCTS.find((p: ESimProduct) => p.id === productId);
    return (
      found ||
      ESIM_PRODUCTS[0] || {
        id: "1",
        region: "China",
        imageUrl:
          "https://images.unsplash.com/photo-1508804185872-d7badad00f7d?auto=format&fit=crop&w=1200&q=80",
        title:
          "Mainland China/Hong Kong/Macau 5G eSIM | 5 Carriers | Day Pass/Total Data Package | 24-Hour Billing | QR Code",
        rating: 4.6,
        reviewCount: "24,583 reviews",
        bookedCount: "699.8k booked",
        features: ["Free cancellation", "Book now for today"],
        originalPrice: "US$0.18",
        price: "US$0.08",
        discountBadge: "Limited-time sale | 52% off",
      }
    );
  }, [productId]);

  // Wishlist toggle
  const [isFav, setIsFav] = useState(false);
  const [claimedPromotion, setClaimedPromotion] = useState(false);

  // Configuration selections (unselected by default)
  const [selectedDay, setSelectedDay] = useState<string>("");
  const [selectedPlanId, setSelectedPlanId] = useState<string>("");
  const [quantity, setQuantity] = useState(1);
  const [bookingSuccess, setBookingSuccess] = useState(false);

  // Calculate dynamic price
  const isConfigured = Boolean(selectedDay && selectedPlanId);
  const dayNumber = parseInt(selectedDay) || 1;
  const currentPlan = PLAN_TIERS.find((p) => p.id === selectedPlanId);
  const unitPrice = currentPlan
    ? currentPlan.label.startsWith("Total")
      ? currentPlan.basePrice
      : currentPlan.basePrice * dayNumber
    : 0;

  const discountMultiplier = claimedPromotion ? 0.5 : 1;
  const totalPrice = isConfigured
    ? (unitPrice * quantity * discountMultiplier).toFixed(2)
    : "--";

  const handleSelectPackageScroll = () => {
    const el = document.getElementById("package-selection");
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleBookNow = () => {
    // Booking action will be implemented later
  };

  return (
    <div className="min-h-screen bg-white pt-24 pb-20">
      <div className="container-page space-y-6 max-w-6xl">
        <NavServiceBar active="esim" />
        {/* ================= CARD 1: PRODUCT HEADER ================= */}
        <div className="bg-[#F5F5F5] rounded-3xl border border-neutral-200/90 shadow-sm overflow-hidden">
          {/* Banner Image */}
          <div className="relative h-64 sm:h-80 md:h-96 w-full overflow-hidden bg-neutral-100">
            <img
              src={product.imageUrl}
              alt={product.title}
              className="w-full h-full object-cover"
            />
            {/* Overlay Gradient */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />

            {/* Favorite Heart Button */}
            <button
              type="button"
              onClick={() => setIsFav(!isFav)}
              className="absolute top-4 right-4 w-9 h-9 rounded-full bg-white/90 hover:bg-white text-neutral-600 hover:text-red-500 flex items-center justify-center transition-all shadow-md z-10"
              aria-label="Wishlist"
            >
              {isFav ? (
                <FaHeart className="text-red-500 text-base" />
              ) : (
                <FaRegHeart className="text-neutral-700 text-base" />
              )}
            </button>

            {/* Title / Badge Graphic in Image Center */}
            <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none p-4">
              <span className="text-white text-xl sm:text-3xl font-black drop-shadow-lg text-center tracking-wide">
                ⚡ 5G eSIM • {product.region}
              </span>
              <span className="text-white/90 text-xs sm:text-sm font-semibold drop-shadow mt-1">
                Instant Digital Delivery • High-Speed Connectivity
              </span>
            </div>
          </div>

          {/* Product Details Header */}
          <div className="p-6 sm:p-8 space-y-4">
            <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-5">
              {/* Left Column: Title & Policies */}
              <div className="space-y-3 flex-1">
                <h1 className="text-lg sm:text-xl md:text-2xl font-bold text-neutral-900 leading-snug">
                  {product.title}
                </h1>

                {/* Promotion Tag */}
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="text-xs font-semibold px-2 py-0.5 rounded bg-pink-50 text-pink-600 border border-pink-100">
                    Promotion
                  </span>
                  <span className="text-xs text-neutral-600 font-medium">
                    Book a designated package and save 50% | Up to US$4 off
                  </span>
                  <button
                    type="button"
                    onClick={() => setClaimedPromotion(!claimedPromotion)}
                    className={`text-xs font-bold px-3 py-0.5 rounded transition-colors ${
                      claimedPromotion
                        ? "bg-emerald-500 text-white"
                        : "bg-blue-600 text-white hover:bg-blue-700"
                    }`}
                  >
                    {claimedPromotion ? "Claimed ✓" : "Claim"}
                  </button>
                </div>

                {/* Booking policy checklist */}
                <div className="space-y-1.5 text-xs text-neutral-600 pt-1">
                  <div className="flex items-center gap-2">
                    <span className="w-4 h-4 rounded-full bg-neutral-100 flex items-center justify-center text-neutral-500">
                      ✓
                    </span>
                    <span>Book now for today</span>
                    <span className="text-neutral-300">|</span>
                    <span className="text-blue-600 hover:underline cursor-pointer flex items-center gap-1 font-medium">
                      Booking confirmation <FaChevronRight className="text-[9px]" />
                    </span>
                  </div>

                  <div className="flex items-center gap-2 text-teal-600 font-medium">
                    <span className="w-4 h-4 rounded-full bg-teal-50 flex items-center justify-center text-teal-600 text-[10px]">
                      ✓
                    </span>
                    <span className="hover:underline cursor-pointer flex items-center gap-1">
                      Free cancellation by 00:00, 1 day before the expiration date{" "}
                      <FaChevronRight className="text-[9px]" />
                    </span>
                  </div>
                </div>

                {/* Review score and bookings */}
                <div className="flex items-center gap-2 pt-2 text-xs">
                  <span className="bg-blue-600 text-white font-bold px-2 py-0.5 rounded text-xs flex items-center gap-1">
                    {product.rating.toFixed(1)}/5
                  </span>
                  <span className="font-bold text-neutral-900">Good</span>
                  <span className="text-blue-600 underline cursor-pointer">
                    ({product.reviewCount || "24,583 reviews"})
                  </span>
                  <span className="text-neutral-300">|</span>
                  <span className="text-neutral-500">
                    {product.bookedCount || "699.8k booked"}
                  </span>
                </div>
              </div>

              {/* Right Column: Pricing & Select Package Action */}
              <div className="flex flex-col lg:items-end gap-2 lg:text-right shrink-0">
                <div className="flex items-baseline gap-1.5">
                  <FaInfoCircle className="text-xs text-neutral-400" />
                  <span className="text-xs text-neutral-500 font-medium">From</span>
                  <span className="text-2xl sm:text-3xl font-extrabold text-blue-600">
                    {product.price}
                  </span>
                </div>
                <span className="text-[11px] font-semibold text-pink-600 bg-pink-50 px-2 py-0.5 rounded w-fit lg:ml-auto">
                  {product.discountBadge || "Limited-time sale | 52% off"}
                </span>

                <button
                  type="button"
                  onClick={handleSelectPackageScroll}
                  className="mt-3 bg-blue-600 hover:bg-blue-700 active:scale-95 text-white font-bold text-sm px-7 py-3 rounded-xl transition-all shadow-md hover:shadow-lg"
                >
                  Select package
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* ================= CARD 2: PACKAGE AND PRICE CONFIGURATION ================= */}
        <div
          id="package-selection"
          className="bg-[#F5F5F5] rounded-3xl border border-neutral-200/90 shadow-sm p-6 sm:p-8 space-y-6"
        >
          <div className="border-b border-neutral-100 pb-4">
            <h2 className="text-lg sm:text-xl font-bold text-neutral-900">
              Package and price
            </h2>
          </div>

          <div className="space-y-6">
            {/* Note alert */}
            <div className="flex items-center gap-2 text-xs text-neutral-500">
              <FaInfoCircle className="text-neutral-400 text-sm shrink-0" />
              <span>Please select a package to view details</span>
            </div>

            {/* Date of use */}
            <div>
              <h3 className="text-sm font-bold text-neutral-900">Date of use</h3>
              <p className="text-xs text-neutral-500 mt-1">
                Valid for 30 days from the booking date
              </p>
            </div>

            {/* Day Selector Pill Grid */}
            <div>
              <label className="block text-xs font-bold text-neutral-800 uppercase tracking-wider mb-2">
                Day
              </label>
              <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-7 gap-2">
                {DAYS_OPTIONS.map((day) => {
                  const isSelected = selectedDay === day;
                  return (
                    <button
                      key={day}
                      type="button"
                      onClick={() => setSelectedDay(day)}
                      className={`py-2 px-2.5 rounded-lg text-xs font-semibold text-center transition-all ${
                        isSelected
                          ? "border-2 border-blue-600 text-blue-600 bg-blue-50/50 shadow-sm"
                          : "border border-neutral-200 hover:border-neutral-300 text-neutral-700 bg-white"
                      }`}
                    >
                      {day}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Plan Details Selector Grid */}
            <div>
              <label className="block text-xs font-bold text-neutral-800 uppercase tracking-wider mb-2">
                Plan Details
              </label>
              <div className="flex flex-wrap gap-2">
                {PLAN_TIERS.map((tier) => {
                  const isSelected = selectedPlanId === tier.id;
                  return (
                    <button
                      key={tier.id}
                      type="button"
                      onClick={() => setSelectedPlanId(tier.id)}
                      className={`py-2 px-3.5 rounded-lg text-xs font-medium transition-all ${
                        isSelected
                          ? "border-2 border-blue-600 text-blue-600 bg-blue-50/50 font-bold shadow-sm"
                          : "border border-neutral-200 hover:border-neutral-300 text-neutral-700 bg-neutral-50 hover:bg-white"
                      }`}
                    >
                      {tier.label}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Quantity Selector Bar */}
            <div className="space-y-2">
              <label className="block text-xs font-bold text-neutral-800 uppercase tracking-wider">
                Quantity
              </label>
              <div className="flex items-center justify-between border border-neutral-200 rounded-xl px-4 py-3 bg-white">
                <span className="text-sm font-medium text-neutral-800">
                  Quantity
                </span>
                <div className="flex items-center gap-3">
                  <button
                    type="button"
                    disabled={quantity <= 1}
                    onClick={() => setQuantity((prev) => Math.max(1, prev - 1))}
                    className="w-7 h-7 rounded-full border border-neutral-300 flex items-center justify-center text-neutral-600 hover:bg-neutral-100 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
                  >
                    <FaMinus className="text-[10px]" />
                  </button>
                  <span className="text-sm font-bold text-neutral-900 w-6 text-center">
                    {quantity}
                  </span>
                  <button
                    type="button"
                    onClick={() => setQuantity((prev) => prev + 1)}
                    className="w-7 h-7 rounded-full border border-neutral-300 flex items-center justify-center text-neutral-600 hover:bg-neutral-100 transition-colors"
                  >
                    <FaPlus className="text-[10px]" />
                  </button>
                </div>
              </div>
            </div>

            {/* Bottom Final Checkout Action Row */}
            <div className="pt-4 border-t border-neutral-100 flex flex-col sm:flex-row items-center justify-end gap-5">
              <div className="flex items-baseline gap-2">
                <span className="text-xs text-neutral-400">Total Price:</span>
                <span className="text-2xl font-black text-blue-600">
                  US${totalPrice}
                </span>
              </div>

              <button
                type="button"
                onClick={handleBookNow}
                disabled={bookingSuccess}
                className="w-full sm:w-auto bg-blue-600 hover:bg-blue-700 active:scale-95 disabled:bg-blue-400 text-white font-bold text-sm px-10 py-3.5 rounded-xl transition-all shadow-md hover:shadow-lg flex items-center justify-center gap-2"
              >
                {bookingSuccess ? "Processing..." : "Book now"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

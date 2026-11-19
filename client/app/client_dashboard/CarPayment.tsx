"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  FaCheck,
  FaUser,
  FaDoorOpen,
  FaSuitcase,
  FaCog,
  FaGasPump,
  FaInfoCircle,
  FaPlus,
  FaMinus,
  FaShieldAlt,
  FaStar,
  FaArrowLeft,
  FaEdit,
  FaChevronRight,
} from "react-icons/fa";
import { FiCheck } from "react-icons/fi";
import Navbar from "./components/Navbar";
import NavServiceBar from "./components/NavServiceBar";
import Footer from "./components/Footer";
import { CAR_DATA, CarItem } from "./Cars";

interface ProtectionPlan {
  id: "cover" | "medium" | "standard";
  name: string;
  badge?: string;
  price: number;
  liability: string;
  features: string[];
}

const PROTECTION_PLANS: ProtectionPlan[] = [
  {
    id: "cover",
    name: "Cover The Car (LDW)",
    badge: "Recommended",
    price: 120.89,
    liability: "$0 financial liability",
    features: [
      "$0 financial liability",
      "Super Plus Loss Damage Waiver",
      "Windshield & wheels protection",
      "Personal accident insurance",
      "Personal Belongings Protection",
      "Taxes and fees",
    ],
  },
  {
    id: "medium",
    name: "Medium",
    price: 119.25,
    liability: "$494.45 financial liability",
    features: [
      "$494.45 financial liability",
      "Super Loss Damage Waiver",
      "Windshield & wheels protection",
      "Personal accident insurance",
      "Taxes and fees",
    ],
  },
  {
    id: "standard",
    name: "Standard",
    price: 0,
    liability: "$1,153.71 financial liability",
    features: [
      "$1,153.71 financial liability",
      "Loss damage waiver",
      "Taxes and fees",
    ],
  },
];

interface AddonItem {
  id: string;
  name: string;
  price: number;
  description: string;
}

const ADDONS: AddonItem[] = [
  {
    id: "additional_driver",
    name: "Additional driver",
    price: 62.89,
    description: "Add an extra driver on to the policy so you can share driving responsibility",
  },
  {
    id: "child_booster_seat",
    name: "Child booster seat",
    price: 77.86,
    description: "Child booster seat with extra protection 15-30kg, 33lb-66lb (4-7 years)",
  },
  {
    id: "snow_chains",
    name: "Snow chains",
    price: 65.38,
    description: "Winterization product to enable car to drive in snow",
  },
  {
    id: "young_driver",
    name: "Young driver",
    price: 70.87,
    description: "There are age restrictions and charges for drivers under a certain age",
  },
];

interface CarPaymentProps {
  carId?: number;
  location?: string;
  pickupDate?: string;
  pickupTime?: string;
  dropoffDate?: string;
  dropoffTime?: string;
}

export default function CarPayment({
  carId = 1,
  location = "Hamburg Main Station, Germany",
  pickupDate,
  pickupTime = "10:00 AM",
  dropoffDate,
  dropoffTime = "10:00 AM",
}: CarPaymentProps) {
  const router = useRouter();

  // Selected car
  const selectedCar = CAR_DATA.find((c) => c.id === carId) || CAR_DATA[0];

  // Protection plan selection (default: "standard" like in reference, or user can toggle)
  const [selectedPlan, setSelectedPlan] = useState<"cover" | "medium" | "standard">("standard");

  // Add-ons count state
  const [addonCounts, setAddonCounts] = useState<Record<string, number>>({
    additional_driver: 0,
    child_booster_seat: 0,
    snow_chains: 0,
    young_driver: 0,
  });

  const handleAddonDelta = (id: string, delta: number) => {
    setAddonCounts((prev) => {
      const current = prev[id] || 0;
      const next = Math.max(0, current + delta);
      return { ...prev, [id]: next };
    });
  };

  // Calculate pricing
  const baseCarPrice = selectedCar.priceTotal;
  const planObj = PROTECTION_PLANS.find((p) => p.id === selectedPlan);
  const planPrice = planObj ? planObj.price : 0;

  const addonsTotal = ADDONS.reduce((acc, addon) => {
    const qty = addonCounts[addon.id] || 0;
    return acc + addon.price * qty;
  }, 0);

  const grandTotal = baseCarPrice + planPrice + addonsTotal;

  // Format dates
  const pDate = pickupDate ? new Date(pickupDate) : new Date(2026, 10, 18);
  const dDate = dropoffDate ? new Date(dropoffDate) : new Date(2026, 10, 23);

  const formatHeaderDate = (d: Date, t: string) => {
    const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    return `${d.getDate()} ${months[d.getMonth()]} ${t}`;
  };

  const formatTripDate = (d: Date, t: string) => {
    const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    return `${days[d.getDay()]} ${d.getDate()} ${months[d.getMonth()]}, ${t}`;
  };

  return (
    <div className="min-h-screen bg-[#FFFFFF] text-neutral-900 flex flex-col font-sans">
      <Navbar />

      <main className="flex-1 pt-24 pb-20">
        <NavServiceBar active="cars" />
        <div className="container-page">
          {/* Top Destination & Date Bar */}
          <div className="bg-[#F5F5F5] rounded-2xl border border-neutral-200 px-6 py-4 mb-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <h1 className="text-lg font-bold text-neutral-900">
                {location || "Hamburg, Germany"}
              </h1>
              <p className="text-xs text-neutral-500 font-medium mt-0.5">
                {formatHeaderDate(pDate, pickupTime)} - {formatHeaderDate(dDate, dropoffTime)}
              </p>
            </div>

            <button
              type="button"
              onClick={() => router.back()}
              className="inline-flex items-center gap-2 bg-white hover:bg-neutral-100 border border-neutral-300 text-neutral-800 text-xs font-semibold px-4 py-2 rounded-xl transition-all shadow-sm"
            >
              <FaEdit className="text-neutral-500 text-xs" />
              Edit
            </button>
          </div>

          {/* Stepper & Back Navigation */}
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2 text-xs">
              <button
                type="button"
                onClick={() => router.back()}
                className="text-[#2563eb] hover:underline font-medium"
              >
                Back to search results
              </button>
              <span className="text-neutral-400">/</span>
              <span className="text-neutral-500">Next, checkout</span>
            </div>
            <span className="text-xs font-bold text-neutral-700">1/3</span>
          </div>

          <div className="flex items-center justify-between mb-2">
            <h2 className="text-2xl font-bold text-neutral-900">Your rental</h2>
          </div>

          {/* Stepper bar */}
          <div className="w-full grid grid-cols-3 gap-2 mb-8">
            <div className="h-1.5 rounded-full bg-[#2563eb]" />
            <div className="h-1.5 rounded-full bg-neutral-200" />
            <div className="h-1.5 rounded-full bg-neutral-200" />
          </div>

          {/* Main 2-Column Content */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Left 8 Cols: Car details, Protection options, Add-ons, Supplier section */}
            <div className="lg:col-span-8 flex flex-col gap-8">
              {/* Selected Car Box */}
              <div className="bg-[#F5F5F5] rounded-2xl border border-neutral-200 p-6 shadow-sm">
                <div className="flex flex-col md:flex-row items-center justify-between gap-6">
                  {/* Left specs */}
                  <div className="flex-1">
                    <h3 className="text-lg font-bold text-neutral-900 mb-4">
                      {selectedCar.name}{" "}
                      <span className="text-sm font-normal text-neutral-500">
                        or similar {selectedCar.category}
                      </span>
                    </h3>

                    <div className="grid grid-cols-2 gap-y-2 gap-x-4 text-xs text-neutral-700 mb-4">
                      <div className="flex items-center gap-2">
                        <FaUser className="text-[#2563eb]" />
                        <span>{selectedCar.seats} seats</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <FaCheck className="text-[#2563eb]" />
                        <span>{selectedCar.mileage}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <FaDoorOpen className="text-[#2563eb]" />
                        <span>{selectedCar.doors} doors</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <FaSuitcase className="text-[#2563eb]" />
                        <span>
                          {selectedCar.bags} {selectedCar.bags === 1 ? "bag" : "bags"}
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <FaCog className="text-[#2563eb]" />
                        <span>{selectedCar.transmission}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <FaGasPump className="text-[#2563eb]" />
                        <span>{selectedCar.fuel}</span>
                      </div>
                    </div>

                    <p className="text-xs text-neutral-600 mb-2">• {selectedCar.pickupPolicy}</p>
                    <p className="text-xs font-semibold text-[#2563eb] flex items-center gap-1.5">
                      <FaCheck /> Free cancellation
                    </p>
                  </div>

                  {/* Car image */}
                  <div className="w-full md:w-64 h-40 bg-white rounded-xl overflow-hidden border border-neutral-200 flex-shrink-0 flex items-center justify-center p-2 shadow-inner">
                    <img
                      src={selectedCar.image}
                      alt={selectedCar.name}
                      className="w-full h-full object-cover rounded-lg"
                    />
                  </div>
                </div>
              </div>

              {/* Protection Options */}
              <div>
                <h3 className="text-xl font-bold text-neutral-900 mb-4">
                  Protection Option(s)
                </h3>

                <div className="flex flex-col gap-4">
                  {PROTECTION_PLANS.map((plan) => {
                    const isSelected = selectedPlan === plan.id;
                    return (
                      <div
                        key={plan.id}
                        onClick={() => setSelectedPlan(plan.id)}
                        className={`bg-[#F5F5F5] rounded-2xl border p-5 cursor-pointer transition-all ${
                          isSelected
                            ? "border-[#2563eb] ring-2 ring-[#2563eb]/20 shadow-sm"
                            : "border-neutral-200 hover:border-neutral-300"
                        }`}
                      >
                        <div className="flex items-start justify-between gap-4 mb-4">
                          <div className="flex items-center gap-2">
                            <FaShieldAlt
                              className={`text-base ${
                                isSelected ? "text-[#2563eb]" : "text-neutral-400"
                              }`}
                            />
                            <span className="font-bold text-base text-neutral-900">
                              {plan.name}
                            </span>
                          </div>

                          <div className="flex items-center gap-3">
                            {plan.price > 0 ? (
                              <span className="text-lg font-bold text-neutral-900">
                                ${plan.price.toFixed(2)}
                              </span>
                            ) : (
                              <span className="text-sm font-semibold text-neutral-500">
                                Included
                              </span>
                            )}

                            {/* Radio indicator */}
                            <div
                              className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all ${
                                isSelected
                                  ? "border-[#2563eb] bg-[#2563eb]"
                                  : "border-neutral-300 bg-white"
                              }`}
                            >
                              {isSelected && <div className="w-2 h-2 rounded-full bg-white" />}
                            </div>
                          </div>
                        </div>

                        {/* Plan Features */}
                        <div className="border-t border-neutral-200/80 pt-3 grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-neutral-700">
                          {plan.features.map((feat, idx) => (
                            <div key={idx} className="flex items-center gap-2">
                              <FaCheck className="text-[#2563eb] text-[10px] flex-shrink-0" />
                              <span>{feat}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Add-ons */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-xl font-bold text-neutral-900">Add-ons</h3>
                  <button
                    type="button"
                    className="text-xs font-semibold text-[#2563eb] hover:underline"
                  >
                    + Show more
                  </button>
                </div>
                <p className="text-xs text-neutral-500 mb-4">GPS, booster seat, and more.</p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {ADDONS.map((addon) => {
                    const count = addonCounts[addon.id] || 0;
                    return (
                      <div
                        key={addon.id}
                        className="bg-[#F5F5F5] rounded-2xl border border-neutral-200 p-4 flex flex-col justify-between shadow-sm"
                      >
                        <div className="mb-4">
                          <div className="flex items-start justify-between gap-2 mb-1">
                            <span className="font-bold text-sm text-neutral-900">
                              {addon.name}
                            </span>
                            <span className="font-bold text-sm text-neutral-900 whitespace-nowrap">
                              ${addon.price.toFixed(2)}
                            </span>
                          </div>
                          <p className="text-xs text-neutral-600 leading-relaxed">
                            {addon.description}
                          </p>
                        </div>

                        <div className="flex items-center justify-end">
                          <div className="inline-flex items-center gap-3 bg-white border border-neutral-200 rounded-xl px-2.5 py-1">
                            <button
                              type="button"
                              onClick={() => handleAddonDelta(addon.id, -1)}
                              disabled={count === 0}
                              className={`text-neutral-600 hover:text-neutral-900 transition-colors p-1 ${
                                count === 0 ? "opacity-30 cursor-not-allowed" : ""
                              }`}
                            >
                              <FaMinus className="text-[10px]" />
                            </button>
                            <span className="text-xs font-bold text-neutral-900 min-w-[14px] text-center">
                              {count}
                            </span>
                            <button
                              type="button"
                              onClick={() => handleAddonDelta(addon.id, 1)}
                              className="text-[#2563eb] hover:text-[#1d4ed8] transition-colors p-1"
                            >
                              <FaPlus className="text-[10px]" />
                            </button>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Supplied by Section */}
              <div className="bg-[#F5F5F5] rounded-2xl border border-neutral-200 p-6 shadow-sm">
                <div className="flex items-center gap-3 mb-4">
                  <span className="px-3 py-1 bg-[#2563eb] text-white text-xs font-bold rounded">
                    {selectedCar.supplier}
                  </span>
                  <h4 className="text-base font-bold text-neutral-900">
                    Supplied by {selectedCar.supplier} for you
                  </h4>
                </div>

                <div className="flex flex-col sm:flex-row gap-6 items-center">
                  <div className="w-full sm:w-48 h-32 bg-white rounded-xl overflow-hidden border border-neutral-200 flex-shrink-0">
                    <img
                      src="https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=600&q=80"
                      alt="Car interior"
                      className="w-full h-full object-cover"
                    />
                  </div>

                  <div className="flex-1 space-y-3 text-xs text-neutral-700">
                    <div className="flex items-start gap-2.5">
                      <FaCheck className="text-[#2563eb] mt-0.5 flex-shrink-0" />
                      <div>
                        <span className="font-bold text-neutral-900">$1,153.71 financial liability</span>
                        <p className="text-neutral-500 mt-0.5">Basic excess apply on damage</p>
                      </div>
                    </div>

                    <div className="flex items-start gap-2.5">
                      <FaCheck className="text-[#2563eb] mt-0.5 flex-shrink-0" />
                      <div>
                        <span className="font-bold text-neutral-900">Loss damage waiver</span>
                        <p className="text-neutral-500 mt-0.5">
                          Loss damage waiver, also known as LDW, waives your financial responsibility for any loss or damage incurred to the rental vehicle.
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start gap-2.5">
                      <FaCheck className="text-[#2563eb] mt-0.5 flex-shrink-0" />
                      <div>
                        <span className="font-bold text-neutral-900">Taxes and fees</span>
                        <p className="text-neutral-500 mt-0.5">No hidden charges at the desk</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mt-4 pt-4 border-t border-neutral-200 flex items-center justify-between">
                  <button
                    type="button"
                    className="inline-flex items-center gap-1.5 text-xs text-[#2563eb] hover:underline font-semibold"
                  >
                    <FaInfoCircle /> Important info
                  </button>
                </div>
              </div>
            </div>

            {/* Right 4 Cols: Order Summary Sidebar (Sticky) */}
            <div className="lg:col-span-4 sticky top-24 flex flex-col gap-4">
              <div className="bg-[#F5F5F5] rounded-2xl border border-neutral-200 p-6 shadow-sm">
                <div className="flex items-center justify-between pb-4 border-b border-neutral-200">
                  <h3 className="text-base font-bold text-neutral-900">Pick-up &amp; drop-off</h3>
                  <button
                    type="button"
                    className="text-xs font-semibold text-[#2563eb] hover:underline"
                  >
                    Map &rarr;
                  </button>
                </div>

                {/* Timeline pick-up & drop-off */}
                <div className="relative py-4 space-y-6">
                  {/* Vertical line connecting the two dots */}
                  <div className="absolute left-[7px] top-[26px] bottom-[26px] w-[2px] bg-[#2563eb]" />

                  {/* Pick up */}
                  <div className="flex items-start gap-3 relative z-10">
                    <div className="w-4 h-4 rounded-full bg-white border-2 border-[#2563eb] flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="text-xs font-semibold text-neutral-900">
                        {formatTripDate(pDate, pickupTime)}
                      </p>
                      <p className="text-xs text-neutral-600 mt-0.5">{location}</p>
                    </div>
                  </div>

                  {/* Drop off */}
                  <div className="flex items-start gap-3 relative z-10">
                    <div className="w-4 h-4 rounded-full bg-white border-2 border-[#2563eb] flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="text-xs font-semibold text-neutral-900">
                        {formatTripDate(dDate, dropoffTime)}
                      </p>
                      <p className="text-xs text-neutral-600 mt-0.5">{location}</p>
                    </div>
                  </div>
                </div>

                {/* Your rental breakdown */}
                <div className="pt-4 border-t border-neutral-200 space-y-3">
                  <h4 className="text-sm font-bold text-neutral-900">Your rental</h4>
                  <p className="text-xs text-neutral-600">
                    {selectedCar.name} or similar
                  </p>

                  <div className="flex items-center justify-between text-xs">
                    <span className="text-neutral-700">Price for 5 days</span>
                    <div className="text-right">
                      <span className="text-neutral-400 line-through mr-1.5">
                        ${selectedCar.originalPrice.toFixed(2)}
                      </span>
                      <span className="font-bold text-neutral-900">
                        ${baseCarPrice.toFixed(2)}
                      </span>
                    </div>
                  </div>

                  {planPrice > 0 && (
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-neutral-700">{planObj?.name}</span>
                      <span className="font-bold text-neutral-900">
                        +${planPrice.toFixed(2)}
                      </span>
                    </div>
                  )}

                  {addonsTotal > 0 && (
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-neutral-700">Selected Add-ons</span>
                      <span className="font-bold text-neutral-900">
                        +${addonsTotal.toFixed(2)}
                      </span>
                    </div>
                  )}

                  <button
                    type="button"
                    className="text-xs text-[#2563eb] hover:underline font-semibold flex items-center gap-1"
                  >
                    <FaInfoCircle className="text-[10px]" /> View price details
                  </button>
                </div>

                {/* Total */}
                <div className="pt-4 mt-4 border-t border-neutral-200 flex items-baseline justify-between">
                  <span className="text-base font-bold text-neutral-900">Total</span>
                  <span className="text-2xl font-extrabold text-neutral-900">
                    ${grandTotal.toFixed(2)}
                  </span>
                </div>

                {/* Pickup note */}
                <div className="mt-4 bg-white border border-neutral-200 rounded-xl p-3 text-[11px] text-neutral-600 flex items-start gap-2">
                  <FaInfoCircle className="text-[#2563eb] text-sm mt-0.5 flex-shrink-0" />
                  <span>
                    Please note the amount payable on pickup will be charged in EUR. (~€
                    {(grandTotal * 0.91).toFixed(2)})
                  </span>
                </div>

                {/* Continue to checkout button */}
                <button
                  type="button"
                  className="w-full mt-5 bg-[#2563eb] hover:bg-[#1d4ed8] active:scale-[0.98] text-white font-bold text-sm py-3.5 rounded-xl transition-all shadow-md shadow-blue-500/20"
                >
                  Continue to checkout
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}

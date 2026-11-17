"use client";
import React, { useState, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import {
  FaPlus,
  FaInfoCircle,
  FaQuestionCircle,
  FaSuitcase,
  FaHome,
  FaTrash,
} from "react-icons/fa";
import { FaPersonSkiing } from "react-icons/fa6";
import { TbSurfing, TbScubaMask } from "react-icons/tb";
import Navbar from "../client_dashboard/components/Navbar";
import Footer from "../client_dashboard/components/Footer";

interface Traveler {
  id: string;
  lastName: string;
  firstName: string;
  dob: string;
  isPurchaser: boolean;
}

const TARIFF_INFO: Record<string, { name: string; coverage: string; basePrice: number }> = {
  econom: { name: "Econom", coverage: "35 000 USD", basePrice: 60 },
  standard: { name: "Standard", coverage: "250 000 USD", basePrice: 113 },
  million: { name: "Million", coverage: "1 000 000 USD", basePrice: 162 },
};

function TravelInsuranceContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const planKey = (searchParams?.get("plan") || "econom").toLowerCase();
  const currentTariff = TARIFF_INFO[planKey] || TARIFF_INFO.econom;

  // Travelers state: Empty by default, Purchaser unselected
  const [travelers, setTravelers] = useState<Traveler[]>([
    {
      id: "1",
      lastName: "",
      firstName: "",
      dob: "",
      isPurchaser: false,
    },
  ]);

  // Purchaser state: Empty by default
  const [purchaser, setPurchaser] = useState({
    lastName: "",
    firstName: "",
    dob: "",
    phone: "",
    email: "",
  });

  // Useful options state
  const [options, setOptions] = useState({
    skiing: false,      // +$13
    surfing: false,     // +$13
    diving: false,      // +$13
    luggage: false,     // +$4
    liability: false,   // +$6
  });

  // Promo code state
  const [promoCode, setPromoCode] = useState("SUN3");
  const [promoApplied, setPromoApplied] = useState(true);

  // Add traveler
  const addTraveler = () => {
    const nextId = (travelers.length + 1).toString();
    setTravelers((prev) => [
      ...prev,
      {
        id: nextId,
        lastName: "",
        firstName: "",
        dob: "",
        isPurchaser: false,
      },
    ]);
  };

  const removeTraveler = (id: string) => {
    if (travelers.length <= 1) return;
    setTravelers((prev) => prev.filter((t) => t.id !== id));
  };

  // Toggle or select purchaser from a traveler
  const handleTogglePurchaser = (travelerId: string) => {
    setTravelers((prev) => {
      const target = prev.find((t) => t.id === travelerId);
      const willBePurchaser = !target?.isPurchaser;

      const nextTravelers = prev.map((t) => ({
        ...t,
        isPurchaser: t.id === travelerId ? willBePurchaser : false,
      }));

      if (willBePurchaser && target) {
        setPurchaser((p) => ({
          ...p,
          lastName: target.lastName,
          firstName: target.firstName,
          dob: target.dob,
        }));
      }

      return nextTravelers;
    });
  };

  const updateTraveler = (id: string, field: keyof Traveler, value: any) => {
    setTravelers((prev) =>
      prev.map((t) => {
        if (t.id === id) {
          const updated = { ...t, [field]: value };
          // If this traveler is selected as purchaser, auto-sync fields to the purchaser box
          if (updated.isPurchaser) {
            setPurchaser((p) => ({
              ...p,
              [field]: value,
            }));
          }
          return updated;
        }
        return t;
      })
    );
  };

  // Toggle options
  const toggleOption = (key: keyof typeof options) => {
    setOptions((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  // Pricing calculation based on selected package price
  const optionsTotal =
    (options.skiing ? 13 : 0) +
    (options.surfing ? 13 : 0) +
    (options.diving ? 13 : 0) +
    (options.luggage ? 4 : 0) +
    (options.liability ? 6 : 0);

  const basePrice = currentTariff.basePrice * travelers.length;
  const totalPrice = basePrice + optionsTotal;

  // Handle navigation
  const handleBack = () => {
    if (window.history.length > 1) {
      router.back();
    } else {
      router.push("/booking?tab=insurance");
    }
  };

  const handleNext = () => {
    const params = new URLSearchParams({
      plan: planKey,
      lastName: purchaser.lastName,
      firstName: purchaser.firstName,
      dob: purchaser.dob,
      email: purchaser.email,
      phone: purchaser.phone,
      skiing: options.skiing ? "yes" : "no",
      surfing: options.surfing ? "yes" : "no",
      diving: options.diving ? "yes" : "no",
      luggage: options.luggage ? "yes" : "no",
      liability: options.liability ? "yes" : "no",
      promo: promoApplied ? promoCode : "",
      total: totalPrice.toString(),
    });
    router.push(`/travelInsurance/payment?${params.toString()}`);
  };

  return (
    <div className="min-h-screen bg-[#FFFFFF] text-neutral-800 flex flex-col font-sans">
      <Navbar />

      <main className="flex-1 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-28 pb-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* ================= LEFT COLUMN: FORMS ================= */}
          <div className="lg:col-span-8 space-y-6">
            {/* CARD 1: Travelers (insured) */}
            <div className="bg-[#f5f5f5] rounded-2xl border border-neutral-200/60 p-6 sm:p-7 shadow-sm">
              <h2 className="text-2xl font-light text-neutral-800 tracking-tight">
                Travelers (insured)
              </h2>
              <p className="text-xs text-neutral-400 mt-1 mb-4">
                Travelers data in Latin letters
              </p>
              <div className="border-b border-neutral-200/70 mb-5" />

              {/* Labels header */}
              <div className="hidden sm:grid grid-cols-12 gap-3 mb-2 text-xs text-neutral-400 font-normal px-1">
                <div className="col-span-1" />
                <div className="col-span-4">Last name</div>
                <div className="col-span-4">First name</div>
                <div className="col-span-2">Date of birth</div>
                <div className="col-span-1 text-center">Purchaser</div>
              </div>

              {/* Travelers rows */}
              <div className="space-y-3">
                {travelers.map((traveler, index) => (
                  <div
                    key={traveler.id}
                    className="grid grid-cols-1 sm:grid-cols-12 gap-3 items-center"
                  >
                    {/* Index number */}
                    <div className="sm:col-span-1 flex items-center justify-between sm:justify-start">
                      <span className="text-sm font-bold text-[#8b5cf6]">
                        {index + 1}
                      </span>
                      {travelers.length > 1 && (
                        <button
                          type="button"
                          onClick={() => removeTraveler(traveler.id)}
                          className="sm:hidden text-red-400 hover:text-red-600 text-xs p-1"
                        >
                          <FaTrash />
                        </button>
                      )}
                    </div>

                    {/* Last name */}
                    <div className="sm:col-span-4">
                      <label className="sm:hidden text-[11px] text-neutral-400 block mb-1">
                        Last name
                      </label>
                      <input
                        type="text"
                        value={traveler.lastName}
                        onChange={(e) =>
                          updateTraveler(traveler.id, "lastName", e.target.value.toUpperCase())
                        }
                        placeholder="MUGDHO"
                        className="w-full px-3.5 py-2.5 text-xs sm:text-sm font-medium uppercase border border-neutral-200 rounded-lg focus:outline-none focus:border-[#8b5cf6] focus:ring-1 focus:ring-[#8b5cf6] transition-all bg-white"
                      />
                    </div>

                    {/* First name */}
                    <div className="sm:col-span-4">
                      <label className="sm:hidden text-[11px] text-neutral-400 block mb-1">
                        First name
                      </label>
                      <input
                        type="text"
                        value={traveler.firstName}
                        onChange={(e) =>
                          updateTraveler(traveler.id, "firstName", e.target.value.toUpperCase())
                        }
                        placeholder="FAHIM"
                        className="w-full px-3.5 py-2.5 text-xs sm:text-sm font-medium uppercase border border-neutral-200 rounded-lg focus:outline-none focus:border-[#8b5cf6] focus:ring-1 focus:ring-[#8b5cf6] transition-all bg-white"
                      />
                    </div>

                    {/* Date of birth */}
                    <div className="sm:col-span-2">
                      <label className="sm:hidden text-[11px] text-neutral-400 block mb-1">
                        Date of birth
                      </label>
                      <input
                        type="text"
                        value={traveler.dob}
                        onChange={(e) =>
                          updateTraveler(traveler.id, "dob", e.target.value)
                        }
                        placeholder="12.12.2006"
                        className="w-full px-3 py-2.5 text-xs sm:text-sm font-medium border border-neutral-200 rounded-lg focus:outline-none focus:border-[#8b5cf6] focus:ring-1 focus:ring-[#8b5cf6] transition-all bg-white text-center"
                      />
                    </div>

                    {/* Purchaser Radio */}
                    <div className="sm:col-span-1 flex items-center justify-center">
                      <button
                        type="button"
                        onClick={() => handleTogglePurchaser(traveler.id)}
                        className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all bg-white ${
                          traveler.isPurchaser ? "border-[#8b5cf6]" : "border-neutral-300 hover:border-neutral-400"
                        }`}
                        title="Mark as purchaser"
                      >
                        {traveler.isPurchaser && (
                          <span className="w-2.5 h-2.5 rounded-full bg-[#8b5cf6]" />
                        )}
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              {/* Add traveler CTA + disclaimer text */}
              <div className="mt-6 flex flex-col sm:flex-row sm:items-center gap-4">
                <button
                  type="button"
                  onClick={addTraveler}
                  className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-lg bg-[#f6effd] hover:bg-[#ede3fb] text-[#8b5cf6] text-xs font-semibold tracking-wide transition-all self-start whitespace-nowrap active:scale-95"
                >
                  <FaPlus className="text-[10px]" />
                  <span>Add a traveler</span>
                </button>
                <p className="text-[11px] text-neutral-400 leading-snug max-w-md">
                  We do not need the international passport number. We will define the insured by the insurance certificate number, name, surname and date of birth.
                </p>
              </div>
            </div>

            {/* CARD 2: Purchaser (policyholder) */}
            <div className="bg-[#f5f5f5] rounded-2xl border border-neutral-200/60 p-6 sm:p-7 shadow-sm">
              <h2 className="text-2xl font-light text-neutral-800 tracking-tight">
                Purchaser (policyholder)
              </h2>
              <p className="text-xs text-neutral-400 mt-1 mb-4 leading-relaxed">
                Data of the person subscribing and paying for the policy in Latin letters. The policyholder can be anyone above 18, not necessarily one of the insured persons.
              </p>
              <div className="border-b border-neutral-200/70 mb-5" />

              {/* Row 1: Name & DOB */}
              <div className="grid grid-cols-1 sm:grid-cols-12 gap-3 mb-4">
                <div className="sm:col-span-4">
                  <label className="text-xs text-neutral-400 block mb-1.5 font-normal">
                    Last name
                  </label>
                  <input
                    type="text"
                    value={purchaser.lastName}
                    onChange={(e) =>
                      setPurchaser((p) => ({ ...p, lastName: e.target.value.toUpperCase() }))
                    }
                    placeholder="MUGDHO"
                    className="w-full px-3.5 py-2.5 text-xs sm:text-sm font-medium uppercase border border-neutral-200 rounded-lg focus:outline-none focus:border-[#8b5cf6] focus:ring-1 focus:ring-[#8b5cf6] transition-all bg-white"
                  />
                </div>

                <div className="sm:col-span-4">
                  <label className="text-xs text-neutral-400 block mb-1.5 font-normal">
                    First name
                  </label>
                  <input
                    type="text"
                    value={purchaser.firstName}
                    onChange={(e) =>
                      setPurchaser((p) => ({ ...p, firstName: e.target.value.toUpperCase() }))
                    }
                    placeholder="FAHIM"
                    className="w-full px-3.5 py-2.5 text-xs sm:text-sm font-medium uppercase border border-neutral-200 rounded-lg focus:outline-none focus:border-[#8b5cf6] focus:ring-1 focus:ring-[#8b5cf6] transition-all bg-white"
                  />
                </div>

                <div className="sm:col-span-4">
                  <label className="text-xs text-neutral-400 block mb-1.5 font-normal">
                    Date of birth
                  </label>
                  <input
                    type="text"
                    value={purchaser.dob}
                    onChange={(e) =>
                      setPurchaser((p) => ({ ...p, dob: e.target.value }))
                    }
                    placeholder="12.12.2006"
                    className="w-full px-3.5 py-2.5 text-xs sm:text-sm font-medium border border-neutral-200 rounded-lg focus:outline-none focus:border-[#8b5cf6] focus:ring-1 focus:ring-[#8b5cf6] transition-all bg-white"
                  />
                </div>
              </div>

              {/* Row 2: Phone & Email inside soft background box */}
              <div className="bg-white rounded-xl p-3 sm:p-4 border border-neutral-200/60">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="text-[11px] text-neutral-500 block mb-1 font-normal">
                      Phone number
                    </label>
                    <input
                      type="text"
                      value={purchaser.phone}
                      onChange={(e) =>
                        setPurchaser((p) => ({ ...p, phone: e.target.value }))
                      }
                      placeholder="+ 1 (484) 585-0216"
                      className="w-full px-3.5 py-2 text-xs sm:text-sm font-medium border border-neutral-200 rounded-lg bg-neutral-50/50 focus:bg-white focus:outline-none focus:border-[#8b5cf6] focus:ring-1 focus:ring-[#8b5cf6] transition-all"
                    />
                  </div>

                  <div>
                    <label className="text-[11px] text-neutral-500 block mb-1 font-normal">
                      E-mail to send a policy
                    </label>
                    <input
                      type="email"
                      value={purchaser.email}
                      onChange={(e) =>
                        setPurchaser((p) => ({ ...p, email: e.target.value }))
                      }
                      placeholder="fahimshahryarmugdho@gmail.com"
                      className="w-full px-3.5 py-2 text-xs sm:text-sm font-medium border border-neutral-200 rounded-lg bg-neutral-50/50 focus:bg-white focus:outline-none focus:border-[#8b5cf6] focus:ring-1 focus:ring-[#8b5cf6] transition-all"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* CARD 3: Useful options (Image 2) */}
            <div className="bg-[#f5f5f5] rounded-2xl border border-neutral-200/60 p-6 sm:p-7 shadow-sm">
              <h2 className="text-2xl font-light text-neutral-800 tracking-tight">
                Useful options
              </h2>
              <p className="text-xs text-neutral-400 mt-1 mb-4">
                We recommend to include insurance in order to improve your policy.
              </p>
              <div className="border-b border-neutral-200/70 mb-5" />

              {/* Grid of options */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5">
                {/* Option 1: Skiing */}
                <div
                  onClick={() => toggleOption("skiing")}
                  className={`p-4 rounded-2xl border cursor-pointer transition-all flex items-start gap-3.5 ${
                    options.skiing
                      ? "bg-[#f5eefb] border-[#c084fc] shadow-sm ring-1 ring-[#c084fc]"
                      : "bg-white hover:bg-neutral-50 border-neutral-200/70"
                  }`}
                >
                  <div className="text-2xl text-[#8b5cf6] shrink-0 mt-0.5">
                    <FaPersonSkiing />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-1">
                      <span className="text-xs font-semibold text-neutral-800 leading-snug">
                        Mountain skiing and snowboarding
                      </span>
                      <FaQuestionCircle className="text-[10px] text-neutral-300 shrink-0" />
                    </div>
                    <span className="block mt-1.5 text-xs font-bold text-[#8b5cf6]">
                      +$13
                    </span>
                  </div>
                </div>

                {/* Option 2: Surfing */}
                <div
                  onClick={() => toggleOption("surfing")}
                  className={`p-4 rounded-2xl border cursor-pointer transition-all flex items-start gap-3.5 ${
                    options.surfing
                      ? "bg-[#f5eefb] border-[#c084fc] shadow-sm ring-1 ring-[#c084fc]"
                      : "bg-white hover:bg-neutral-50 border-neutral-200/70"
                  }`}
                >
                  <div className="text-2xl text-[#8b5cf6] shrink-0 mt-0.5">
                    <TbSurfing />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-1">
                      <span className="text-xs font-semibold text-neutral-800 leading-snug">
                        Surfing and windsurfing
                      </span>
                    </div>
                    <span className="block mt-1.5 text-xs font-bold text-[#8b5cf6]">
                      +$13
                    </span>
                  </div>
                </div>

                {/* Option 3: Diving */}
                <div
                  onClick={() => toggleOption("diving")}
                  className={`p-4 rounded-2xl border cursor-pointer transition-all flex items-start gap-3.5 ${
                    options.diving
                      ? "bg-[#f5eefb] border-[#c084fc] shadow-sm ring-1 ring-[#c084fc]"
                      : "bg-white hover:bg-neutral-50 border-neutral-200/70"
                  }`}
                >
                  <div className="text-2xl text-[#8b5cf6] shrink-0 mt-0.5">
                    <TbScubaMask />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-1">
                      <span className="text-xs font-semibold text-neutral-800 leading-snug">
                        Diving with an instructor
                      </span>
                      <FaQuestionCircle className="text-[10px] text-neutral-300 shrink-0" />
                    </div>
                    <span className="block mt-1.5 text-xs font-bold text-[#8b5cf6]">
                      +$13
                    </span>
                  </div>
                </div>

                {/* Option 4: Luggage */}
                <div
                  onClick={() => toggleOption("luggage")}
                  className={`p-4 rounded-2xl border cursor-pointer transition-all flex items-start gap-3.5 ${
                    options.luggage
                      ? "bg-[#f5eefb] border-[#c084fc] shadow-sm ring-1 ring-[#c084fc]"
                      : "bg-white hover:bg-neutral-50 border-neutral-200/70"
                  }`}
                >
                  <div className="text-2xl text-[#8b5cf6] shrink-0 mt-0.5">
                    <FaSuitcase />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-1">
                      <span className="text-xs font-semibold text-neutral-800 leading-snug">
                        Luggage insurance for 500 $
                      </span>
                      <FaQuestionCircle className="text-[10px] text-neutral-300 shrink-0" />
                    </div>
                    <span className="block mt-1.5 text-xs font-bold text-[#8b5cf6]">
                      +$4
                    </span>
                  </div>
                </div>

                {/* Option 5: Liability */}
                <div
                  onClick={() => toggleOption("liability")}
                  className={`p-4 rounded-2xl border cursor-pointer transition-all flex items-start gap-3.5 ${
                    options.liability
                      ? "bg-[#f5eefb] border-[#c084fc] shadow-sm ring-1 ring-[#c084fc]"
                      : "bg-white hover:bg-neutral-50 border-neutral-200/70"
                  }`}
                >
                  <div className="text-2xl text-[#8b5cf6] shrink-0 mt-0.5">
                    <FaHome />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-1">
                      <span className="text-xs font-semibold text-neutral-800 leading-snug">
                        Personal liability for 20,000 $
                      </span>
                      <FaQuestionCircle className="text-[10px] text-neutral-300 shrink-0" />
                    </div>
                    <span className="block mt-1.5 text-xs font-bold text-[#8b5cf6]">
                      +$6
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Bottom Actions: Back & Next Buttons */}
            <div className="flex items-center justify-center gap-4 pt-4 pb-8">
              <button
                type="button"
                onClick={handleBack}
                className="px-12 py-3.5 rounded-full bg-[#f4ecfa] hover:bg-[#ecdaf7] text-[#8b5cf6] font-semibold text-sm transition-all active:scale-95 shadow-sm"
              >
                Back
              </button>
              <button
                type="button"
                onClick={handleNext}
                className="px-16 py-3.5 rounded-full bg-[#ffcc00] hover:bg-[#e6b800] text-neutral-900 font-bold text-sm tracking-wide transition-all active:scale-95 shadow-md shadow-amber-300/40"
              >
                Next
              </button>
            </div>
          </div>

          {/* ================= RIGHT COLUMN: SUMMARY SIDEBAR ================= */}
          <div className="lg:col-span-4 sticky top-24">
            <div className="bg-[#f5f5f5] rounded-2xl border border-neutral-200/70 shadow-sm p-5 text-xs space-y-3">
              {/* Tariff */}
              <div className="flex items-center justify-between">
                <span className="text-neutral-400">Tariff</span>
                <div className="flex items-center gap-1">
                  <span className="font-semibold text-[#8b5cf6]">
                    {currentTariff.name} ({currentTariff.coverage})
                  </span>
                  <FaInfoCircle className="text-[10px] text-neutral-300" />
                </div>
              </div>

              {/* Territory */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1 text-neutral-400">
                  <span>Territory</span>
                  <FaInfoCircle className="text-[10px] text-neutral-300" />
                </div>
                <span className="font-medium text-neutral-700">Italy</span>
              </div>

              {/* Departure */}
              <div className="flex items-center justify-between">
                <span className="text-neutral-400">Departure</span>
                <span className="font-medium text-neutral-700">18 november 2026</span>
              </div>

              {/* Return */}
              <div className="flex items-center justify-between">
                <span className="text-neutral-400">Return</span>
                <span className="font-medium text-neutral-700">30 november 2026</span>
              </div>

              {/* Days */}
              <div className="flex items-center justify-between">
                <span className="text-neutral-400">Days</span>
                <span className="font-medium text-neutral-700">13</span>
              </div>

              {/* Skiing */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1 text-neutral-400">
                  <span className="max-w-[170px] truncate">Mountain skiing and snowboarding</span>
                  <FaInfoCircle className="text-[10px] text-neutral-300 shrink-0" />
                </div>
                <span className={`font-semibold ${options.skiing ? "text-[#8b5cf6]" : "text-neutral-400"}`}>
                  {options.skiing ? "yes" : "no"}
                </span>
              </div>

              {/* Surfing */}
              <div className="flex items-center justify-between">
                <span className="text-neutral-400">Surfing and windsurfing</span>
                <span className={`font-semibold ${options.surfing ? "text-[#8b5cf6]" : "text-neutral-400"}`}>
                  {options.surfing ? "yes" : "no"}
                </span>
              </div>

              {/* Diving */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1 text-neutral-400">
                  <span className="max-w-[170px] truncate">Diving with an instructor</span>
                  <FaInfoCircle className="text-[10px] text-neutral-300 shrink-0" />
                </div>
                <span className={`font-semibold ${options.diving ? "text-[#8b5cf6]" : "text-neutral-400"}`}>
                  {options.diving ? "yes" : "no"}
                </span>
              </div>

              {/* Luggage */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1 text-neutral-400">
                  <span>Luggage</span>
                  <FaInfoCircle className="text-[10px] text-neutral-300 shrink-0" />
                </div>
                <span className={`font-semibold ${options.luggage ? "text-[#8b5cf6]" : "text-neutral-400"}`}>
                  {options.luggage ? "yes" : "no"}
                </span>
              </div>

              {/* Liability */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1 text-neutral-400">
                  <span>Personal liability</span>
                  <FaInfoCircle className="text-[10px] text-neutral-300 shrink-0" />
                </div>
                <span className={`font-semibold ${options.liability ? "text-[#8b5cf6]" : "text-neutral-400"}`}>
                  {options.liability ? "yes" : "no"}
                </span>
              </div>

              {/* Deductible */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1 text-neutral-400">
                  <span>Deductible</span>
                  <FaInfoCircle className="text-[10px] text-neutral-300 shrink-0" />
                </div>
                <span className="font-semibold text-neutral-700">yes</span>
              </div>

              <div className="border-t border-neutral-200/80 my-3" />

              {/* Total Price Section */}
              <div className="flex items-end justify-between pt-1">
                <span className="text-neutral-500 font-medium pb-1">Total</span>
                <div className="text-right">
                  <div className="text-3xl font-extrabold text-[#8b5cf6] leading-none">
                    ${totalPrice}
                  </div>
                  <span className="text-[11px] text-[#8b5cf6] border-b border-dotted border-[#8b5cf6] cursor-pointer">
                    Promo
                  </span>
                </div>
              </div>

              {/* Promo code input row */}
              <div className="flex items-center gap-2 pt-2">
                <input
                  type="text"
                  value={promoCode}
                  onChange={(e) => setPromoCode(e.target.value.toUpperCase())}
                  placeholder="PROMO"
                  className="flex-1 px-3 py-2 text-xs font-semibold border border-neutral-300 rounded-lg focus:outline-none focus:border-[#8b5cf6] uppercase bg-white"
                />
                <button
                  type="button"
                  onClick={() => setPromoApplied(true)}
                  className="px-4 py-2 bg-[#ffcc00] hover:bg-[#e6b800] text-neutral-900 font-bold text-xs rounded-lg uppercase tracking-wider transition-all"
                >
                  OK
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

export default function TravelInsurancePage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-white flex items-center justify-center text-sm text-neutral-500">
          Loading travel insurance...
        </div>
      }
    >
      <TravelInsuranceContent />
    </Suspense>
  );
}

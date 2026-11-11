"use client";
import React, { useState, useEffect, useMemo, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Link from "next/link";
import {
  FaPlane,
  FaArrowRight,
  FaExchangeAlt,
  FaChevronDown,
  FaChevronUp,
  FaMoon,
  FaSun,
  FaSearch,
  FaTimes,
  FaCheck,
  FaBell,
  FaSlidersH,
  FaExternalLinkAlt,
} from "react-icons/fa";
import { FiCheck } from "react-icons/fi";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

// Popular cities list for From/To popover
const POPULAR_CITIES = [
  "Dhaka (All)", "Jeddah (All)", "Chittagong (CGP)", "Riyadh (RUH)",
  "Dubai (DXB)", "Doha (DOH)", "Medina (MED)", "Kuwait City (KWI)",
  "Muscat (MCT)", "Sylhet (ZYL)", "Kuala Lumpur (KUL)", "Singapore (SIN)",
  "Cox's Bazar (CXB)", "Bangkok (BKK)", "London (LHR)", "New York (JFK)"
];

// 10 Detailed Flight Mock Data Items
export interface FlightItem {
  id: string;
  isSponsored?: boolean;
  sponsorTitle?: string;
  sponsorSubtitle?: string;
  outbound: {
    airline: string;
    airlineCode: string;
    aircraft: string;
    departTime: string;
    departAirport: string;
    arriveTime: string;
    arriveAirport: string;
    duration: string;
    stops: number;
    stopAirport?: string;
    nextDay?: string;
    hasMoon?: boolean;
    logoColor: string;
    logoText: string;
  };
  inbound?: {
    airline: string;
    airlineCode: string;
    aircraft: string;
    departTime: string;
    departAirport: string;
    arriveTime: string;
    arriveAirport: string;
    duration: string;
    stops: number;
    stopAirport?: string;
    nextDay?: string;
    hasMoon?: boolean;
    logoColor: string;
    logoText: string;
  };
  price: number;
  seller: string;
  badge?: "Best Value" | "Cheapest" | "Cheapest Direct" | "Fastest" | "Sponsored";
  checkedBagPrice?: number;
}

const DEMO_FLIGHTS: FlightItem[] = [
  {
    id: "f1",
    isSponsored: true,
    sponsorTitle: "Over 170 destinations worldwide",
    sponsorSubtitle: "Plan ahead and save on extra baggage, seats and more add-ons before you fly.",
    outbound: {
      airline: "Qatar Airways",
      airlineCode: "QR",
      aircraft: "A351, B787-8",
      departTime: "03:25",
      departAirport: "DAC",
      arriveTime: "10:05",
      arriveAirport: "JED",
      duration: "9h 40m",
      stops: 1,
      stopAirport: "DOH",
      logoColor: "bg-[#5c0632]",
      logoText: "QR",
    },
    inbound: {
      airline: "Qatar Airways",
      airlineCode: "QR",
      aircraft: "B787-8, B777-300",
      departTime: "22:05",
      departAirport: "JED",
      arriveTime: "09:15",
      arriveAirport: "DAC",
      duration: "8h 10m",
      stops: 1,
      stopAirport: "DOH",
      nextDay: "+1",
      hasMoon: true,
      logoColor: "bg-[#5c0632]",
      logoText: "QR",
    },
    price: 356464,
    seller: "Qatar Airways",
    badge: "Sponsored",
    checkedBagPrice: 159706,
  },
  {
    id: "f2",
    outbound: {
      airline: "Air Arabia",
      airlineCode: "G9",
      aircraft: "A321",
      departTime: "08:00",
      departAirport: "DAC",
      arriveTime: "16:15",
      arriveAirport: "JED",
      duration: "11h 15m",
      stops: 1,
      stopAirport: "SHJ",
      logoColor: "bg-[#e21836]",
      logoText: "AirArabia",
    },
    inbound: {
      airline: "Biman Bangladesh Airlines",
      airlineCode: "BG",
      aircraft: "B777-300",
      departTime: "06:20",
      departAirport: "JED",
      arriveTime: "15:45",
      arriveAirport: "DAC",
      duration: "6h 25m",
      stops: 0,
      stopAirport: "Direct",
      logoColor: "bg-[#006a4e]",
      logoText: "Biman",
    },
    price: 121604,
    seller: "Wego",
    badge: "Best Value",
    checkedBagPrice: 159706,
  },
  {
    id: "f3",
    outbound: {
      airline: "Air Arabia",
      airlineCode: "G9",
      aircraft: "A321",
      departTime: "09:05",
      departAirport: "DAC",
      arriveTime: "23:55",
      arriveAirport: "JED",
      duration: "17h 50m",
      stops: 1,
      stopAirport: "SHJ",
      logoColor: "bg-[#e21836]",
      logoText: "AirArabia",
    },
    inbound: {
      airline: "Biman Bangladesh Airlines",
      airlineCode: "BG",
      aircraft: "B777-300",
      departTime: "06:20",
      departAirport: "JED",
      arriveTime: "15:45",
      arriveAirport: "DAC",
      duration: "6h 25m",
      stops: 0,
      stopAirport: "Direct",
      logoColor: "bg-[#006a4e]",
      logoText: "Biman",
    },
    price: 121105,
    seller: "Wego",
    badge: "Cheapest",
    checkedBagPrice: 159706,
  },
  {
    id: "f4",
    outbound: {
      airline: "Saudia",
      airlineCode: "SV",
      aircraft: "B777-300",
      departTime: "13:35",
      departAirport: "DAC",
      arriveTime: "18:10",
      arriveAirport: "JED",
      duration: "7h 35m",
      stops: 0,
      stopAirport: "Direct",
      logoColor: "bg-[#185c37]",
      logoText: "Saudia",
    },
    inbound: {
      airline: "Biman Bangladesh Airlines",
      airlineCode: "BG",
      aircraft: "B777-300",
      departTime: "06:20",
      departAirport: "JED",
      arriveTime: "15:45",
      arriveAirport: "DAC",
      duration: "6h 25m",
      stops: 0,
      stopAirport: "Direct",
      logoColor: "bg-[#006a4e]",
      logoText: "Biman",
    },
    price: 140469,
    seller: "Wego",
    badge: "Cheapest Direct",
    checkedBagPrice: 159706,
  },
  {
    id: "f5",
    outbound: {
      airline: "Air Arabia",
      airlineCode: "G9",
      aircraft: "A321",
      departTime: "09:05",
      departAirport: "DAC",
      arriveTime: "16:15",
      arriveAirport: "JED",
      duration: "10h 10m",
      stops: 1,
      stopAirport: "SHJ",
      logoColor: "bg-[#e21836]",
      logoText: "AirArabia",
    },
    inbound: {
      airline: "Biman Bangladesh Airlines",
      airlineCode: "BG",
      aircraft: "B777-300",
      departTime: "06:20",
      departAirport: "JED",
      arriveTime: "15:45",
      arriveAirport: "DAC",
      duration: "6h 25m",
      stops: 0,
      stopAirport: "Direct",
      logoColor: "bg-[#006a4e]",
      logoText: "Biman",
    },
    price: 121604,
    seller: "Wego",
    checkedBagPrice: 159706,
  },
  {
    id: "f6",
    outbound: {
      airline: "Air Arabia",
      airlineCode: "G9",
      aircraft: "A321",
      departTime: "22:50",
      departAirport: "DAC",
      arriveTime: "09:55",
      arriveAirport: "JED",
      duration: "14h 05m",
      stops: 1,
      stopAirport: "SHJ",
      nextDay: "+1",
      logoColor: "bg-[#e21836]",
      logoText: "AirArabia",
    },
    inbound: {
      airline: "Biman Bangladesh Airlines",
      airlineCode: "BG",
      aircraft: "B777-300",
      departTime: "06:20",
      departAirport: "JED",
      arriveTime: "15:45",
      arriveAirport: "DAC",
      duration: "6h 25m",
      stops: 0,
      stopAirport: "Direct",
      logoColor: "bg-[#006a4e]",
      logoText: "Biman",
    },
    price: 125468,
    seller: "Wego",
    checkedBagPrice: 159706,
  },
  {
    id: "f7",
    isSponsored: true,
    sponsorTitle: "Over 170 destinations worldwide",
    sponsorSubtitle: "Plan ahead and save on extra baggage, seats and more add-ons before you fly.",
    outbound: {
      airline: "Qatar Airways",
      airlineCode: "QR",
      aircraft: "A359, B777-300",
      departTime: "17:00",
      departAirport: "JED",
      arriveTime: "09:15",
      arriveAirport: "DAC",
      duration: "13h 15m",
      stops: 1,
      stopAirport: "DOH",
      nextDay: "+1",
      hasMoon: true,
      logoColor: "bg-[#5c0632]",
      logoText: "QR",
    },
    inbound: {
      airline: "Qatar Airways",
      airlineCode: "QR",
      aircraft: "B787-8",
      departTime: "22:05",
      departAirport: "JED",
      arriveTime: "09:15",
      arriveAirport: "DAC",
      duration: "8h 10m",
      stops: 1,
      stopAirport: "DOH",
      nextDay: "+1",
      hasMoon: true,
      logoColor: "bg-[#5c0632]",
      logoText: "QR",
    },
    price: 356464,
    seller: "Qatar Airways",
    badge: "Sponsored",
    checkedBagPrice: 159706,
  },
  {
    id: "f8",
    outbound: {
      airline: "Saudia",
      airlineCode: "SV",
      aircraft: "B777, A330",
      departTime: "15:40",
      departAirport: "DAC",
      arriveTime: "04:55",
      arriveAirport: "JED",
      duration: "16h 15m",
      stops: 1,
      stopAirport: "MED",
      nextDay: "+1",
      logoColor: "bg-[#185c37]",
      logoText: "Saudia",
    },
    inbound: {
      airline: "Biman Bangladesh Airlines",
      airlineCode: "BG",
      aircraft: "B777-300",
      departTime: "06:20",
      departAirport: "JED",
      arriveTime: "15:45",
      arriveAirport: "DAC",
      duration: "6h 25m",
      stops: 0,
      stopAirport: "Direct",
      logoColor: "bg-[#006a4e]",
      logoText: "Biman",
    },
    price: 122774,
    seller: "Wego",
    checkedBagPrice: 159706,
  },
  {
    id: "f9",
    outbound: {
      airline: "Saudia",
      airlineCode: "SV",
      aircraft: "A330, A320",
      departTime: "00:30",
      departAirport: "DAC",
      arriveTime: "14:15",
      arriveAirport: "JED",
      duration: "16h 45m",
      stops: 1,
      stopAirport: "DMM",
      logoColor: "bg-[#185c37]",
      logoText: "Saudia",
    },
    inbound: {
      airline: "Biman Bangladesh Airlines",
      airlineCode: "BG",
      aircraft: "B777-300",
      departTime: "06:20",
      departAirport: "JED",
      arriveTime: "15:45",
      arriveAirport: "DAC",
      duration: "6h 25m",
      stops: 0,
      stopAirport: "Direct",
      logoColor: "bg-[#006a4e]",
      logoText: "Biman",
    },
    price: 122473,
    seller: "Wego",
    checkedBagPrice: 159706,
  },
  {
    id: "f10",
    outbound: {
      airline: "Emirates",
      airlineCode: "EK",
      aircraft: "B777-300ER",
      departTime: "01:40",
      departAirport: "DAC",
      arriveTime: "09:30",
      arriveAirport: "JED",
      duration: "10h 50m",
      stops: 1,
      stopAirport: "DXB",
      logoColor: "bg-[#d71921]",
      logoText: "Emirates",
    },
    inbound: {
      airline: "Emirates",
      airlineCode: "EK",
      aircraft: "B777-300ER",
      departTime: "20:20",
      departAirport: "JED",
      arriveTime: "08:15",
      arriveAirport: "DAC",
      duration: "8h 55m",
      stops: 1,
      stopAirport: "DXB",
      nextDay: "+1",
      logoColor: "bg-[#d71921]",
      logoText: "Emirates",
    },
    price: 194332,
    seller: "Emirates",
    checkedBagPrice: 159706,
  },
];

const FlightPageContent = () => {
  const searchParams = useSearchParams();
  const router = useRouter();

  // Read URL query params
  const initialTripType = (searchParams.get("tripType") as "oneway" | "roundtrip" | "multicity") || "roundtrip";
  const initialOrigin = searchParams.get("origin") || "";
  const initialDestination = searchParams.get("destination") || "";
  const initialDepartDateStr = searchParams.get("departDate");
  const initialReturnDateStr = searchParams.get("returnDate");
  const initialAdults = Number(searchParams.get("adults")) || 1;
  const initialChildren = Number(searchParams.get("children")) || 0;
  const initialInfants = Number(searchParams.get("infants")) || 0;
  const initialCabinClass = searchParams.get("cabinClass") || "Economy";
  const initialPaymentTypes = searchParams.get("paymentTypes") || "4 Payment Types";
  const initialDirectOnly = searchParams.get("directOnly") === "true";

  // Top Search Filter Box State
  const [tripType, setTripType] = useState<"oneway" | "roundtrip" | "multicity">(initialTripType);
  const [origin, setOrigin] = useState(initialOrigin);
  const [destination, setDestination] = useState(initialDestination);
  const [departDate, setDepartDate] = useState<Date | null>(
    initialDepartDateStr ? new Date(initialDepartDateStr) : null
  );
  const [returnDate, setReturnDate] = useState<Date | null>(
    initialReturnDateStr ? new Date(initialReturnDateStr) : null
  );
  const [adults, setAdults] = useState(initialAdults);
  const [children, setChildren] = useState(initialChildren);
  const [infants, setInfants] = useState(initialInfants);
  const [cabinClass, setCabinClass] = useState(initialCabinClass);
  const [paymentTypes, setPaymentTypes] = useState(initialPaymentTypes);
  const [directOnly, setDirectOnly] = useState(initialDirectOnly);

  // Popover controls
  const [openFromPopover, setOpenFromPopover] = useState(false);
  const [openToPopover, setOpenToPopover] = useState(false);
  const [openPassengers, setOpenPassengers] = useState(false);
  const [openCabinClass, setOpenCabinClass] = useState(false);
  const [openPaymentTypes, setOpenPaymentTypes] = useState(false);
  const [openCalendar, setOpenCalendar] = useState<"depart" | "return" | null>(null);

  // Filter Sidebar State
  const [selectedStops, setSelectedStops] = useState<string[]>([]);
  const [selectedAirlines, setSelectedAirlines] = useState<string[]>([]);
  const [maxPrice, setMaxPrice] = useState<number>(608831);
  const [minPrice] = useState<number>(121766);
  const [sortOption, setSortOption] = useState<"recommended" | "cheapest" | "fastest">("recommended");
  const [compareSiteEmirates, setCompareSiteEmirates] = useState(true);
  const [checkedBagFilter, setCheckedBagFilter] = useState(false);
  const [noOvernightFilter, setNoOvernightFilter] = useState(false);

  // Update when URL changes
  useEffect(() => {
    const qOrigin = searchParams.get("origin");
    const qDestination = searchParams.get("destination");
    const qDepart = searchParams.get("departDate");
    const qReturn = searchParams.get("returnDate");
    const qTrip = searchParams.get("tripType") as "oneway" | "roundtrip" | "multicity" | null;

    if (qOrigin !== null) setOrigin(qOrigin);
    if (qDestination !== null) setDestination(qDestination);
    if (qDepart) setDepartDate(new Date(qDepart));
    if (qReturn) setReturnDate(new Date(qReturn));
    if (qTrip) setTripType(qTrip);
  }, [searchParams]);

  // Date formatter
  const formatDate = (date: Date | null, fallback = "Select date") => {
    if (!date) return fallback;
    const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    return `${days[date.getDay()]}, ${String(date.getDate()).padStart(2, "0")} ${months[date.getMonth()]} ${date.getFullYear()}`;
  };

  // Swap Origin and Destination
  const handleSwap = () => {
    const temp = origin;
    setOrigin(destination);
    setDestination(temp);
  };

  // Filtered & Sorted Flights
  const filteredFlights = useMemo(() => {
    let result = [...DEMO_FLIGHTS];

    // Stops filter
    if (selectedStops.length > 0) {
      result = result.filter((f) => {
        if (selectedStops.includes("direct") && f.outbound.stops === 0) return true;
        if (selectedStops.includes("1stop") && f.outbound.stops === 1) return true;
        if (selectedStops.includes("2stops") && f.outbound.stops >= 2) return true;
        return false;
      });
    }

    // Direct only filter from top bar
    if (directOnly) {
      result = result.filter((f) => f.outbound.stops === 0 && (!f.inbound || f.inbound.stops === 0));
    }

    // Airline filter
    if (selectedAirlines.length > 0) {
      result = result.filter((f) => selectedAirlines.includes(f.outbound.airline) || (f.inbound && selectedAirlines.includes(f.inbound.airline)));
    }

    // Max Price
    result = result.filter((f) => f.price <= maxPrice);

    // Sorting
    if (sortOption === "cheapest") {
      result.sort((a, b) => a.price - b.price);
    } else if (sortOption === "fastest") {
      result.sort((a, b) => a.id.localeCompare(b.id)); // keep simple or sort by duration
    }

    return result;
  }, [selectedStops, selectedAirlines, maxPrice, sortOption, directOnly]);

  const totalPassengers = adults + children + infants;

  return (
    <div className="min-h-screen bg-[#f7f7f9] text-neutral-800">
      <Navbar />

      {/* Main Container */}
      <div className="pt-24 pb-16 container-page">
        {/* ========================================================= */}
        {/* TOP SEARCH BAR WIDGET (Image 1, 2, 3)                     */}
        {/* ========================================================= */}
        <div className="bg-white/95 backdrop-blur-xl rounded-2xl shadow-sm border border-neutral-200/90 p-4 sm:p-5 mb-5 transition-all">
          {/* Top Options Row: Trip Type Pills + Passenger / Cabin / Payment dropdown triggers */}
          <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-neutral-100">
            {/* Trip Type Pills */}
            <div className="flex items-center gap-1.5 bg-neutral-100/70 backdrop-blur-md p-1 rounded-xl text-xs font-semibold border border-neutral-200/60">
              <button
                type="button"
                onClick={() => setTripType("oneway")}
                className={`px-3.5 py-1.5 rounded-lg transition-all duration-200 ${
                  tripType === "oneway"
                    ? "bg-[#eff6ff]/90 backdrop-blur-md text-[#1d4ed8] border border-[#bfdbfe] font-bold shadow-sm"
                    : "text-neutral-600 hover:text-neutral-900 hover:bg-white/60"
                }`}
              >
                One-way
              </button>
              <button
                type="button"
                onClick={() => setTripType("roundtrip")}
                className={`px-3.5 py-1.5 rounded-lg transition-all duration-200 ${
                  tripType === "roundtrip"
                    ? "bg-[#eff6ff]/90 backdrop-blur-md text-[#1d4ed8] border border-[#bfdbfe] font-bold shadow-sm"
                    : "text-neutral-600 hover:text-neutral-900 hover:bg-white/60"
                }`}
              >
                Round-trip
              </button>
              <button
                type="button"
                onClick={() => setTripType("multicity")}
                className={`px-3.5 py-1.5 rounded-lg transition-all duration-200 ${
                  tripType === "multicity"
                    ? "bg-[#eff6ff]/90 backdrop-blur-md text-[#1d4ed8] border border-[#bfdbfe] font-bold shadow-sm"
                    : "text-neutral-600 hover:text-neutral-900 hover:bg-white/60"
                }`}
              >
                Multi-city
              </button>
            </div>

            {/* Passengers, Class, Payment type triggers */}
            <div className="flex items-center gap-4 text-xs font-semibold text-neutral-700 relative">
              {/* Passengers Dropdown */}
              <div className="relative">
                <button
                  type="button"
                  onClick={() => setOpenPassengers(!openPassengers)}
                  className="flex items-center gap-1.5 hover:text-neutral-950 py-1"
                >
                  <span>{totalPassengers} Passenger{totalPassengers > 1 ? "s" : ""}</span>
                  <FaChevronDown className={`text-[10px] text-neutral-400 transition-transform ${openPassengers ? "rotate-180" : ""}`} />
                </button>
                {openPassengers && (
                  <div className="absolute right-0 top-full mt-2 w-64 bg-white/95 backdrop-blur-xl border border-neutral-200 rounded-2xl shadow-2xl p-4 z-50 space-y-3">
                    <div className="flex items-center justify-between text-xs">
                      <div>
                        <p className="font-bold text-neutral-900">Adults</p>
                        <p className="text-neutral-400 text-[10px]">12+ years</p>
                      </div>
                      <div className="flex items-center gap-2.5">
                        <button
                          type="button"
                          onClick={() => setAdults(Math.max(1, adults - 1))}
                          className="w-6 h-6 rounded-full border border-neutral-300 flex items-center justify-center text-xs hover:bg-neutral-100"
                        >-</button>
                        <span className="font-bold w-4 text-center">{adults}</span>
                        <button
                          type="button"
                          onClick={() => setAdults(adults + 1)}
                          className="w-6 h-6 rounded-full border border-neutral-300 flex items-center justify-center text-xs hover:bg-neutral-100"
                        >+</button>
                      </div>
                    </div>
                    <div className="flex items-center justify-between text-xs">
                      <div>
                        <p className="font-bold text-neutral-900">Children</p>
                        <p className="text-neutral-400 text-[10px]">2-11 years</p>
                      </div>
                      <div className="flex items-center gap-2.5">
                        <button
                          type="button"
                          onClick={() => setChildren(Math.max(0, children - 1))}
                          className="w-6 h-6 rounded-full border border-neutral-300 flex items-center justify-center text-xs hover:bg-neutral-100"
                        >-</button>
                        <span className="font-bold w-4 text-center">{children}</span>
                        <button
                          type="button"
                          onClick={() => setChildren(children + 1)}
                          className="w-6 h-6 rounded-full border border-neutral-300 flex items-center justify-center text-xs hover:bg-neutral-100"
                        >+</button>
                      </div>
                    </div>
                    <button
                      type="button"
                      onClick={() => setOpenPassengers(false)}
                      className="w-full mt-2 bg-[#2563eb] text-white font-bold py-1.5 rounded-lg text-xs"
                    >
                      Done
                    </button>
                  </div>
                )}
              </div>

              {/* Cabin Class Dropdown */}
              <div className="relative">
                <button
                  type="button"
                  onClick={() => setOpenCabinClass(!openCabinClass)}
                  className="flex items-center gap-1.5 hover:text-neutral-950 py-1"
                >
                  <span>{cabinClass}</span>
                  <FaChevronDown className={`text-[10px] text-neutral-400 transition-transform ${openCabinClass ? "rotate-180" : ""}`} />
                </button>
                {openCabinClass && (
                  <div className="absolute right-0 top-full mt-2 w-48 bg-white/95 backdrop-blur-xl border border-neutral-200 rounded-2xl shadow-2xl py-2 z-50">
                    {["Economy", "Premium Economy", "Business", "First Class"].map((c) => (
                      <button
                        key={c}
                        type="button"
                        onClick={() => { setCabinClass(c); setOpenCabinClass(false); }}
                        className={`w-full text-left px-3.5 py-2 text-xs transition-colors flex items-center justify-between hover:bg-neutral-50 ${cabinClass === c ? "text-[#2563eb] font-bold" : "text-neutral-700"}`}
                      >
                        <span>{c}</span>
                        {cabinClass === c && <FiCheck className="text-[#2563eb]" />}
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* Payment Types Dropdown */}
              <div className="relative">
                <button
                  type="button"
                  onClick={() => setOpenPaymentTypes(!openPaymentTypes)}
                  className="flex items-center gap-1.5 hover:text-neutral-950 py-1"
                >
                  <span>{paymentTypes}</span>
                  <FaChevronDown className={`text-[10px] text-neutral-400 transition-transform ${openPaymentTypes ? "rotate-180" : ""}`} />
                </button>
                {openPaymentTypes && (
                  <div className="absolute right-0 top-full mt-2 w-52 bg-white/95 backdrop-blur-xl border border-neutral-200 rounded-2xl shadow-2xl py-2 z-50">
                    {["4 Payment Types", "Credit Card", "Mobile Banking (bKash/Nagad)", "Bank Transfer"].map((p) => (
                      <button
                        key={p}
                        type="button"
                        onClick={() => { setPaymentTypes(p); setOpenPaymentTypes(false); }}
                        className={`w-full text-left px-3.5 py-2 text-xs transition-colors flex items-center justify-between hover:bg-neutral-50 ${paymentTypes === p ? "text-[#2563eb] font-bold" : "text-neutral-700"}`}
                      >
                        <span>{p}</span>
                        {paymentTypes === p && <FiCheck className="text-[#2563eb]" />}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Main Search Inputs Grid (From, To, Depart Date, Return Date, Search Button) */}
          <div className="mt-3 grid grid-cols-1 md:grid-cols-12 gap-2.5 items-center">
            {/* From & To Combined Strip */}
            <div className="md:col-span-6 flex items-center border border-neutral-200 rounded-xl bg-white/90 backdrop-blur-md relative focus-within:ring-2 focus-within:ring-inset focus-within:ring-[#2563eb]">
              {/* From Input */}
              <div className="flex-1 px-4 py-2.5 relative">
                <span className="block text-[10px] text-neutral-400 font-medium">From</span>
                <input
                  type="text"
                  placeholder="Where from?"
                  value={origin}
                  onChange={(e) => setOrigin(e.target.value)}
                  onFocus={() => { setOpenFromPopover(true); setOpenToPopover(false); }}
                  className="w-full text-xs sm:text-sm font-semibold text-neutral-900 outline-none bg-transparent placeholder:text-neutral-400"
                />
                {origin && (
                  <button
                    type="button"
                    onClick={() => setOrigin("")}
                    className="absolute right-2 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-neutral-600 text-xs"
                  >
                    <FaTimes />
                  </button>
                )}
                {/* Popular Cities Popover */}
                {openFromPopover && (
                  <div className="absolute top-full left-0 mt-2 w-72 bg-white/95 backdrop-blur-2xl border border-neutral-200/90 rounded-2xl shadow-2xl p-3 z-50">
                    <p className="text-[11px] font-bold text-neutral-400 uppercase tracking-wider mb-2">Popular Cities</p>
                    <div className="grid grid-cols-2 gap-1.5 max-h-48 overflow-y-auto">
                      {POPULAR_CITIES.map((c) => (
                        <button
                          key={c}
                          type="button"
                          onClick={() => { setOrigin(c); setOpenFromPopover(false); }}
                          className="text-left text-xs text-neutral-700 hover:text-[#2563eb] hover:bg-neutral-50 px-2 py-1.5 rounded truncate"
                        >
                          {c}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Swap Button */}
              <button
                type="button"
                onClick={handleSwap}
                className="w-8 h-8 rounded-full border border-neutral-200 bg-white hover:bg-neutral-50 flex items-center justify-center text-neutral-500 hover:text-neutral-800 transition-colors shadow-sm -mx-2 z-10"
              >
                <FaExchangeAlt className="text-xs" />
              </button>

              {/* To Input */}
              <div className="flex-1 px-4 py-2.5 relative">
                <span className="block text-[10px] text-neutral-400 font-medium">To</span>
                <input
                  type="text"
                  placeholder="Where to?"
                  value={destination}
                  onChange={(e) => setDestination(e.target.value)}
                  onFocus={() => { setOpenToPopover(true); setOpenFromPopover(false); }}
                  className="w-full text-xs sm:text-sm font-semibold text-neutral-900 outline-none bg-transparent placeholder:text-neutral-400"
                />
                {destination && (
                  <button
                    type="button"
                    onClick={() => setDestination("")}
                    className="absolute right-2 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-neutral-600 text-xs"
                  >
                    <FaTimes />
                  </button>
                )}
                {/* Popular Cities Popover */}
                {openToPopover && (
                  <div className="absolute top-full right-0 mt-2 w-72 bg-white/95 backdrop-blur-2xl border border-neutral-200/90 rounded-2xl shadow-2xl p-3 z-50">
                    <p className="text-[11px] font-bold text-neutral-400 uppercase tracking-wider mb-2">Popular Cities</p>
                    <div className="grid grid-cols-2 gap-1.5 max-h-48 overflow-y-auto">
                      {POPULAR_CITIES.map((c) => (
                        <button
                          key={c}
                          type="button"
                          onClick={() => { setDestination(c); setOpenToPopover(false); }}
                          className="text-left text-xs text-neutral-700 hover:text-[#2563eb] hover:bg-neutral-50 px-2 py-1.5 rounded truncate"
                        >
                          {c}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Depart & Return Date Boxes */}
            <div className="md:col-span-5 flex items-center border border-neutral-200 rounded-xl bg-white overflow-hidden">
              {/* Depart Date */}
              <div
                onClick={() => setOpenCalendar(openCalendar === "depart" ? null : "depart")}
                className="flex-1 px-4 py-2.5 cursor-pointer hover:bg-neutral-50 transition-colors border-r border-neutral-100 relative"
              >
                <span className="block text-[10px] text-neutral-400 font-medium">Depart</span>
                <div className="flex items-center justify-between">
                  <span className="text-xs sm:text-[13px] font-bold text-neutral-800">
                    {formatDate(departDate, "Depart Date")}
                  </span>
                  <div className="flex items-center text-neutral-400 text-xs gap-1">
                    <IoIosArrowBack />
                    <IoIosArrowForward />
                  </div>
                </div>
              </div>

              {/* Return Date (only if round-trip) */}
              {tripType === "roundtrip" ? (
                <div
                  onClick={() => setOpenCalendar(openCalendar === "return" ? null : "return")}
                  className="flex-1 px-4 py-2.5 cursor-pointer hover:bg-neutral-50 transition-colors relative"
                >
                  <span className="block text-[10px] text-neutral-400 font-medium">Return</span>
                  <div className="flex items-center justify-between">
                    <span className="text-xs sm:text-[13px] font-bold text-neutral-800">
                      {formatDate(returnDate, "Return Date")}
                    </span>
                    <div className="flex items-center text-neutral-400 text-xs gap-1">
                      <IoIosArrowBack />
                      <IoIosArrowForward />
                    </div>
                  </div>
                </div>
              ) : (
                <div className="flex-1 px-4 py-2.5 text-neutral-400 text-xs italic">
                  One-way only
                </div>
              )}
            </div>

            {/* Green Search Action Button */}
            <div className="md:col-span-1 flex items-center">
              <button
                type="button"
                className="w-full h-11 bg-[#2563eb] hover:bg-[#1d4ed8] active:scale-95 text-white font-bold rounded-xl flex items-center justify-center transition-all shadow-md"
              >
                <FaSearch className="text-sm" />
              </button>
            </div>
          </div>

          {/* Quick Checkbox: Compare with Emirates */}
          <div className="mt-3 pt-2.5 border-t border-neutral-100 flex items-center gap-2 text-xs text-neutral-600">
            <span>Compare Mongzo vs. these sites:</span>
            <label className="flex items-center gap-1.5 cursor-pointer select-none font-medium text-neutral-800">
              <input
                type="checkbox"
                checked={compareSiteEmirates}
                onChange={(e) => setCompareSiteEmirates(e.target.checked)}
                className="accent-[#2563eb] rounded w-3.5 h-3.5"
              />
              <span className="bg-[#d71921] text-white text-[10px] font-bold px-1 rounded">Emirates</span>
              <span>Emirates</span>
            </label>
          </div>
        </div>

        {/* ========================================================= */}
        {/* LOWER SECTION: FILTER SIDEBAR + FLIGHT CARDS RESULTS      */}
        {/* ========================================================= */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* ========================================= */}
          {/* LEFT COLUMN: FILTERS SIDEBAR (Image 1, 2, 3) */}
          {/* ========================================= */}
          <div className="lg:col-span-3 space-y-4">
            {/* Notify Me If Price Drops Banner */}
            <div className="bg-white/90 backdrop-blur-lg rounded-2xl border border-neutral-200/90 p-3.5 flex items-center justify-between shadow-sm cursor-pointer hover:border-[#2563eb] hover:bg-white transition-all">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-[#2563eb] text-white flex items-center justify-center">
                  <FaBell className="text-sm" />
                </div>
                <div>
                  <p className="text-xs font-bold text-neutral-900 leading-tight">Notify me if price drops</p>
                </div>
              </div>
              <IoIosArrowForward className="text-neutral-400 text-sm" />
            </div>

            {/* Filter Card Container */}
            <div className="bg-white/95 backdrop-blur-xl rounded-2xl border border-neutral-200/90 p-4 sm:p-5 shadow-sm space-y-5">
              <div className="flex items-center justify-between pb-3 border-b border-neutral-100">
                <span className="text-xs font-semibold text-neutral-600">
                  {filteredFlights.length} results
                </span>
                <button
                  type="button"
                  onClick={() => {
                    setSelectedStops([]);
                    setSelectedAirlines([]);
                    setMaxPrice(608831);
                    setCheckedBagFilter(false);
                    setNoOvernightFilter(false);
                    setDirectOnly(false);
                  }}
                  className="text-xs text-[#2563eb] font-bold hover:underline"
                >
                  Clear
                </button>
              </div>

              {/* BAGGAGE */}
              <div>
                <div className="flex items-center justify-between text-xs font-bold text-neutral-800 uppercase tracking-wider mb-2.5">
                  <span>Baggage</span>
                  <FaChevronUp className="text-[10px] text-neutral-400" />
                </div>
                <label className="flex items-center justify-between text-xs text-neutral-700 cursor-pointer">
                  <div className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      checked={checkedBagFilter}
                      onChange={(e) => setCheckedBagFilter(e.target.checked)}
                      className="accent-[#2563eb] rounded"
                    />
                    <span>Checked Bag</span>
                  </div>
                  <span className="text-neutral-400 text-[11px]">৳159,706</span>
                </label>
              </div>

              {/* STOPS */}
              <div className="pt-3 border-t border-neutral-100">
                <div className="flex items-center justify-between text-xs font-bold text-neutral-800 uppercase tracking-wider mb-2.5">
                  <span>Stops</span>
                  <FaChevronUp className="text-[10px] text-neutral-400" />
                </div>
                <div className="space-y-2">
                  {[
                    { id: "direct", label: "Direct", price: "৳140,469" },
                    { id: "1stop", label: "1 stop", price: "৳121,105" },
                    { id: "2stops", label: "2+ stops", price: "৳136,746" },
                  ].map((s) => (
                    <label key={s.id} className="flex items-center justify-between text-xs text-neutral-700 cursor-pointer">
                      <div className="flex items-center gap-2">
                        <input
                          type="checkbox"
                          checked={selectedStops.includes(s.id)}
                          onChange={(e) => {
                            if (e.target.checked) setSelectedStops([...selectedStops, s.id]);
                            else setSelectedStops(selectedStops.filter((x) => x !== s.id));
                          }}
                          className="accent-[#2563eb] rounded"
                        />
                        <span>{s.label}</span>
                      </div>
                      <span className="text-neutral-400 text-[11px]">{s.price}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* PRICE SLIDER */}
              <div className="pt-3 border-t border-neutral-100">
                <div className="flex items-center justify-between text-xs font-bold text-neutral-800 uppercase tracking-wider mb-2.5">
                  <span>Price</span>
                  <FaChevronUp className="text-[10px] text-neutral-400" />
                </div>
                <div className="flex items-center justify-between text-xs font-semibold text-neutral-700 mb-2">
                  <div className="border border-neutral-200 rounded px-2 py-1 text-[11px]">
                    ৳{minPrice.toLocaleString()}
                  </div>
                  <span className="text-neutral-400">-</span>
                  <div className="border border-neutral-200 rounded px-2 py-1 text-[11px]">
                    ৳{maxPrice.toLocaleString()}
                  </div>
                </div>
                <input
                  type="range"
                  min={minPrice}
                  max={608831}
                  step={5000}
                  value={maxPrice}
                  onChange={(e) => setMaxPrice(Number(e.target.value))}
                  className="w-full accent-[#2563eb] cursor-pointer"
                />
              </div>

              {/* FLIGHT EXPERIENCE */}
              <div className="pt-3 border-t border-neutral-100">
                <div className="flex items-center justify-between text-xs font-bold text-neutral-800 uppercase tracking-wider mb-2.5">
                  <span>Flight Experience</span>
                  <FaChevronUp className="text-[10px] text-neutral-400" />
                </div>
                <div className="space-y-2">
                  <label className="flex items-center gap-2 text-xs text-neutral-700 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={noOvernightFilter}
                      onChange={(e) => setNoOvernightFilter(e.target.checked)}
                      className="accent-[#2563eb] rounded"
                    />
                    <span>No overnight flights</span>
                  </label>
                  <label className="flex items-center gap-2 text-xs text-neutral-700 cursor-pointer">
                    <input type="checkbox" className="accent-[#2563eb] rounded" />
                    <span>No long stop-overs (up to 4hrs)</span>
                  </label>
                  <label className="flex items-center gap-2 text-xs text-neutral-700 cursor-pointer">
                    <input type="checkbox" className="accent-[#2563eb] rounded" />
                    <span>No self-transfer</span>
                  </label>
                </div>
              </div>

              {/* FLIGHT TIMES (4 Quad matrix as in Image 2) */}
              <div className="pt-3 border-t border-neutral-100">
                <div className="flex items-center justify-between text-xs font-bold text-neutral-800 uppercase tracking-wider mb-2">
                  <span>Flight Times</span>
                  <FaChevronUp className="text-[10px] text-neutral-400" />
                </div>
                <p className="text-[11px] font-semibold text-neutral-700 mb-2">
                  {origin || "Dhaka"} → {destination || "Jeddah"}
                </p>
                <div className="grid grid-cols-2 gap-1.5 text-center text-xs">
                  <div className="border border-neutral-200 rounded-lg p-2 hover:border-[#2563eb] cursor-pointer">
                    <FaMoon className="mx-auto text-neutral-400 text-xs mb-1" />
                    <p className="text-[10px] font-bold text-neutral-800">00:00 - 06:00</p>
                    <p className="text-[9px] text-neutral-400">৳122,473</p>
                  </div>
                  <div className="border border-neutral-200 rounded-lg p-2 hover:border-[#2563eb] cursor-pointer">
                    <FaSun className="mx-auto text-amber-500 text-xs mb-1" />
                    <p className="text-[10px] font-bold text-neutral-800">06:00 - 12:00</p>
                    <p className="text-[9px] text-neutral-400">৳121,105</p>
                  </div>
                  <div className="border border-neutral-200 rounded-lg p-2 hover:border-[#2563eb] cursor-pointer">
                    <FaSun className="mx-auto text-amber-500 text-xs mb-1" />
                    <p className="text-[10px] font-bold text-neutral-800">12:00 - 18:00</p>
                    <p className="text-[9px] text-neutral-400">৳122,774</p>
                  </div>
                  <div className="border border-neutral-200 rounded-lg p-2 hover:border-[#2563eb] cursor-pointer">
                    <FaMoon className="mx-auto text-neutral-400 text-xs mb-1" />
                    <p className="text-[10px] font-bold text-neutral-800">18:00 - 24:00</p>
                    <p className="text-[9px] text-neutral-400">৳125,254</p>
                  </div>
                </div>
              </div>

              {/* AIRLINES / ALLIANCES */}
              <div className="pt-3 border-t border-neutral-100">
                <div className="flex items-center justify-between text-xs font-bold text-neutral-800 uppercase tracking-wider mb-2.5">
                  <span>Airlines</span>
                  <FaChevronUp className="text-[10px] text-neutral-400" />
                </div>
                <div className="space-y-2">
                  {[
                    { name: "Air Arabia", price: "৳134,753" },
                    { name: "Biman Bangladesh Airlines", price: "৳226,620" },
                    { name: "Emirates", price: "৳194,332" },
                    { name: "Etihad Airways", price: "৳233,064" },
                    { name: "Qatar Airways", price: "৳251,898" },
                    { name: "Saudia", price: "৳140,469" },
                  ].map((a) => (
                    <label key={a.name} className="flex items-center justify-between text-xs text-neutral-700 cursor-pointer">
                      <div className="flex items-center gap-2">
                        <input
                          type="checkbox"
                          checked={selectedAirlines.includes(a.name)}
                          onChange={(e) => {
                            if (e.target.checked) setSelectedAirlines([...selectedAirlines, a.name]);
                            else setSelectedAirlines(selectedAirlines.filter((x) => x !== a.name));
                          }}
                          className="accent-[#2563eb] rounded"
                        />
                        <span className="truncate max-w-[120px]">{a.name}</span>
                      </div>
                      <span className="text-neutral-400 text-[11px]">{a.price}</span>
                    </label>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* ========================================= */}
          {/* RIGHT COLUMN: FLIGHT LISTINGS RESULTS     */}
          {/* ========================================= */}
          <div className="lg:col-span-9 space-y-4">
            {/* Top Sort Bar (Recommended, Cheapest, Fastest, Sort By Dropdown) */}
            <div className="bg-white/95 backdrop-blur-xl rounded-2xl border border-neutral-200/90 p-2 shadow-sm flex items-center justify-between overflow-x-auto">
              <div className="flex items-center divide-x divide-neutral-200">
                {/* Recommended */}
                <button
                  type="button"
                  onClick={() => setSortOption("recommended")}
                  className={`px-5 py-2 text-left transition-colors ${
                    sortOption === "recommended"
                      ? "border-b-2 border-blue-600 font-bold text-blue-600"
                      : "text-neutral-600 hover:text-neutral-900"
                  }`}
                >
                  <p className="text-xs">Recommended</p>
                  <p className="text-xs font-bold text-[#2563eb]">৳121,604</p>
                </button>

                {/* Cheapest */}
                <button
                  type="button"
                  onClick={() => setSortOption("cheapest")}
                  className={`px-5 py-2 text-left transition-colors ${
                    sortOption === "cheapest"
                      ? "border-b-2 border-[#2563eb] font-bold text-neutral-900"
                      : "text-neutral-600 hover:text-neutral-900"
                  }`}
                >
                  <p className="text-xs">Cheapest</p>
                  <p className="text-xs font-bold text-neutral-500">৳121,105</p>
                </button>

                {/* Fastest */}
                <button
                  type="button"
                  onClick={() => setSortOption("fastest")}
                  className={`px-5 py-2 text-left transition-colors ${
                    sortOption === "fastest"
                      ? "border-b-2 border-[#2563eb] font-bold text-neutral-900"
                      : "text-neutral-600 hover:text-neutral-900"
                  }`}
                >
                  <p className="text-xs">Fastest</p>
                  <p className="text-xs font-bold text-neutral-500">৳167,695</p>
                </button>
              </div>

              {/* Sort By Departure Time */}
              <div className="pr-3 flex items-center gap-1.5 text-xs text-neutral-600 cursor-pointer">
                <span>Sort By Departure Time</span>
                <FaChevronDown className="text-[10px] text-neutral-400" />
              </div>
            </div>

            {/* FLIGHT CARDS LIST */}
            <div className="space-y-3.5">
              {filteredFlights.length === 0 ? (
                <div className="bg-white rounded-2xl border border-neutral-200 p-12 text-center">
                  <FaPlane className="text-3xl text-neutral-300 mx-auto mb-3" />
                  <p className="text-base font-bold text-neutral-800">No flights found</p>
                  <p className="text-xs text-neutral-500 mt-1">Try relaxing some of your filter criteria.</p>
                </div>
              ) : (
                filteredFlights.map((flight) => (
                  <div
                    key={flight.id}
                    className={`rounded-2xl border transition-all duration-200 overflow-hidden shadow-sm hover:shadow-lg bg-white/95 backdrop-blur-lg hover:border-neutral-300 ${
                      flight.isSponsored
                        ? "border-[#5c0632]/40 ring-1 ring-[#5c0632]/20"
                        : "border-neutral-200"
                    }`}
                  >
                    {/* Sponsored Header Banner (as in Image 1 & 3) */}
                    {flight.isSponsored && (
                      <div className="bg-[#5c0632] text-white px-5 py-2.5 flex items-center justify-between text-xs">
                        <div className="flex items-center gap-3">
                          <span className="font-bold tracking-wider text-sm">QATAR</span>
                          <div>
                            <p className="font-bold leading-tight">{flight.sponsorTitle}</p>
                            <p className="text-white/80 text-[10px]">{flight.sponsorSubtitle}</p>
                          </div>
                        </div>
                        <span className="text-[10px] uppercase font-semibold text-white/70">Sponsored</span>
                      </div>
                    )}

                    {/* Card Content Row */}
                    <div className="p-4 sm:p-5 flex flex-col md:flex-row items-stretch justify-between gap-6">
                      {/* Left: Flight Segments (Outbound + Inbound) */}
                      <div className="flex-1 space-y-4">
                        {/* Outbound Segment */}
                        <div className="flex items-center gap-4 text-xs">
                          {/* Airline Logo & Name */}
                          <div className="w-28 flex-shrink-0 flex items-center gap-2">
                            <div className={`w-7 h-7 rounded-full flex items-center justify-center text-white text-[10px] font-bold ${flight.outbound.logoColor}`}>
                              {flight.outbound.logoText.slice(0, 3)}
                            </div>
                            <div>
                              <p className="font-bold text-neutral-900 leading-tight truncate">{flight.outbound.airline}</p>
                              <p className="text-[10px] text-neutral-400">{flight.outbound.aircraft}</p>
                            </div>
                          </div>

                          {/* Time & Route Graphic */}
                          <div className="flex-1 flex items-center justify-between gap-3 px-2">
                            {/* Depart */}
                            <div className="text-left">
                              <p className="text-sm font-bold text-neutral-900">{flight.outbound.departTime}</p>
                              <p className="text-[11px] text-neutral-500 font-semibold">{flight.outbound.departAirport}</p>
                            </div>

                            {/* Duration & Stop Indicator Graphic */}
                            <div className="flex-1 max-w-[200px] text-center">
                              <span className="text-[10px] text-neutral-400 block mb-0.5">{flight.outbound.duration}</span>
                              <div className="relative flex items-center">
                                <div className="w-2 h-2 rounded-full border border-neutral-400 bg-white" />
                                <div className="flex-1 h-[1.5px] bg-neutral-300" />
                                {flight.outbound.stops > 0 && (
                                  <div className="w-2 h-2 rounded-full bg-neutral-400 -mx-1" />
                                )}
                                <div className="flex-1 h-[1.5px] bg-neutral-300" />
                                <div className="w-2 h-2 rounded-full border border-neutral-400 bg-neutral-600" />
                              </div>
                              <span className="text-[10px] text-neutral-500 block mt-0.5 font-medium">
                                {flight.outbound.stops === 0 ? "Direct" : flight.outbound.stopAirport}
                              </span>
                            </div>

                            {/* Arrive */}
                            <div className="text-right">
                              <div className="flex items-center justify-end gap-1">
                                <span className="text-sm font-bold text-neutral-900">{flight.outbound.arriveTime}</span>
                                {flight.outbound.nextDay && (
                                  <span className="text-[10px] text-red-500 font-bold">{flight.outbound.nextDay}</span>
                                )}
                              </div>
                              <p className="text-[11px] text-neutral-500 font-semibold">{flight.outbound.arriveAirport}</p>
                            </div>
                          </div>
                        </div>

                        {/* Inbound Segment (if round-trip exists) */}
                        {flight.inbound && (
                          <div className="flex items-center gap-4 text-xs pt-3 border-t border-neutral-100">
                            {/* Airline Logo & Name */}
                            <div className="w-28 flex-shrink-0 flex items-center gap-2">
                              <div className={`w-7 h-7 rounded-full flex items-center justify-center text-white text-[10px] font-bold ${flight.inbound.logoColor}`}>
                                {flight.inbound.logoText.slice(0, 3)}
                              </div>
                              <div>
                                <p className="font-bold text-neutral-900 leading-tight truncate">{flight.inbound.airline}</p>
                                <p className="text-[10px] text-neutral-400">{flight.inbound.aircraft}</p>
                              </div>
                            </div>

                            {/* Time & Route Graphic */}
                            <div className="flex-1 flex items-center justify-between gap-3 px-2">
                              {/* Depart */}
                              <div className="text-left">
                                <p className="text-sm font-bold text-neutral-900">{flight.inbound.departTime}</p>
                                <p className="text-[11px] text-neutral-500 font-semibold">{flight.inbound.departAirport}</p>
                              </div>

                              {/* Duration & Stop Indicator Graphic */}
                              <div className="flex-1 max-w-[200px] text-center">
                                <span className="text-[10px] text-neutral-400 block mb-0.5">{flight.inbound.duration}</span>
                                <div className="relative flex items-center">
                                  <div className="w-2 h-2 rounded-full border border-neutral-400 bg-white" />
                                  <div className="flex-1 h-[1.5px] bg-neutral-300" />
                                  {flight.inbound.stops > 0 && (
                                    <div className="w-2 h-2 rounded-full bg-neutral-400 -mx-1" />
                                  )}
                                  <div className="flex-1 h-[1.5px] bg-neutral-300" />
                                  <div className="w-2 h-2 rounded-full border border-neutral-400 bg-neutral-600" />
                                </div>
                                <span className="text-[10px] text-neutral-500 block mt-0.5 font-medium">
                                  {flight.inbound.stops === 0 ? "Direct" : flight.inbound.stopAirport}
                                </span>
                              </div>

                              {/* Arrive */}
                              <div className="text-right">
                                <div className="flex items-center justify-end gap-1">
                                  <span className="text-sm font-bold text-neutral-900">{flight.inbound.arriveTime}</span>
                                  {flight.inbound.nextDay && (
                                    <span className="text-[10px] text-red-500 font-bold">{flight.inbound.nextDay}</span>
                                  )}
                                  {flight.inbound.hasMoon && (
                                    <FaMoon className="text-[10px] text-neutral-500" />
                                  )}
                                </div>
                                <p className="text-[11px] text-neutral-500 font-semibold">{flight.inbound.arriveAirport}</p>
                              </div>
                            </div>
                          </div>
                        )}
                      </div>

                      {/* Right: Price & Seller Box */}
                      <div className="w-full md:w-44 flex-shrink-0 flex md:flex-col items-center md:items-end justify-between border-t md:border-t-0 md:border-l border-neutral-100 pt-3 md:pt-0 md:pl-5 text-right">
                        <div>
                          {flight.badge && (
                            <span
                              className={`inline-block text-[10px] font-bold px-2 py-0.5 rounded-full mb-1 ${
                                flight.badge === "Best Value"
                                  ? "bg-amber-100 text-amber-800"
                                  : flight.badge === "Cheapest"
                                  ? "bg-blue-100 text-blue-800"
                                  : flight.badge === "Cheapest Direct"
                                  ? "bg-sky-100 text-sky-800"
                                  : "bg-neutral-100 text-neutral-700"
                              }`}
                            >
                              {flight.badge}
                            </span>
                          )}
                          <p className="text-[11px] text-neutral-400">{flight.seller}</p>
                          <p className="text-xl font-bold text-neutral-900">৳{flight.price.toLocaleString()}</p>
                          <p className="text-[10px] text-neutral-400">Per person</p>
                        </div>

                        <button
                          type="button"
                          className="mt-2 bg-[#2563eb] hover:bg-[#1d4ed8] active:scale-95 text-white font-bold text-xs px-5 py-2.5 rounded-xl transition-all shadow-sm"
                        >
                          Select Flight
                        </button>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default function FlightPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-[#f7f7f9] flex items-center justify-center">Loading flights...</div>}>
      <FlightPageContent />
    </Suspense>
  );
}

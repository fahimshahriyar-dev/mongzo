"use client";
import React, { useState, useEffect, useMemo, Suspense, useRef } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import {
  FaPlane,
  FaExchangeAlt,
  FaChevronDown,
  FaChevronUp,
  FaMoon,
  FaSun,
  FaBell,
  FaMapMarkerAlt,
  FaPlus,
  FaMinus,
  FaBaby,
} from "react-icons/fa";
import { FiCheck, FiChevronLeft, FiChevronRight } from "react-icons/fi";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import { IoSparklesOutline } from "react-icons/io5";
import { LuUser } from "react-icons/lu";
import { MdClose } from "react-icons/md";
import Navbar from "./components/Navbar";
import NavServiceBar from "./components/NavServiceBar";
import Footer from "./components/Footer";

// Popular flight cities list for From/To popover
const FLIGHT_POPULAR_CITIES = [
  "Dhaka", "Jeddah", "Chittagong", "Riyadh",
  "Doha", "Al Madinah", "Dubai", "Muscat",
  "Dammam", "Kuwait City", "Sylhet", "Kuala Lumpur",
  "Chennai", "Cairo", "Kolkata", "New Delhi",
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
  badge?:
    | "Best Value"
    | "Cheapest"
    | "Cheapest Direct"
    | "Fastest"
    | "Sponsored";
  checkedBagPrice?: number;
}

const DEMO_FLIGHTS: FlightItem[] = [
  {
    id: "f1",
    isSponsored: true,
    sponsorTitle: "Over 170 destinations worldwide",
    sponsorSubtitle:
      "Plan ahead and save on extra baggage, seats and more add-ons before you fly.",
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
    sponsorSubtitle:
      "Plan ahead and save on extra baggage, seats and more add-ons before you fly.",
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
  const initialTripType =
    (searchParams.get("tripType") as "oneway" | "roundtrip" | "multicity") ||
    "roundtrip";
  const initialOrigin = searchParams.get("origin") || "";
  const initialDestination = searchParams.get("destination") || "";
  const initialDepartDateStr = searchParams.get("departDate");
  const initialReturnDateStr = searchParams.get("returnDate");
  const initialAdults = Number(searchParams.get("adults")) || 1;
  const initialChildren = Number(searchParams.get("children")) || 0;
  const initialInfants = Number(searchParams.get("infants")) || 0;
  const initialCabinClass = searchParams.get("cabinClass") || "Economy";
  const initialPaymentTypes =
    searchParams.get("paymentTypes") || "4 Payment Types";
  const initialDirectOnly = searchParams.get("directOnly") === "true";

  // Flight search widget state (mirrors Booking.tsx flights tab)
  const [flightTripType, setFlightTripType] = useState<
    "oneway" | "roundtrip" | "multicity"
  >(initialTripType);
  const [flightOrigin, setFlightOrigin] = useState(initialOrigin);
  const [flightDestination, setFlightDestination] = useState(initialDestination);
  const [flightDepartDate, setFlightDepartDate] = useState<Date>(
    initialDepartDateStr ? new Date(initialDepartDateStr) : new Date(2026, 10, 5),
  );
  const [flightReturnDate, setFlightReturnDate] = useState<Date | null>(
    initialReturnDateStr ? new Date(initialReturnDateStr) : null,
  );
  const [flightAdults, setFlightAdults] = useState(initialAdults);
  const [flightChildren, setFlightChildren] = useState(initialChildren);
  const [flightInfants, setFlightInfants] = useState(initialInfants);
  const [flightCabinClass, setFlightCabinClass] = useState(initialCabinClass);
  const [flightPaymentTypes, setFlightPaymentTypes] =
    useState(initialPaymentTypes);
  const [flightDirectOnly, setFlightDirectOnly] = useState(initialDirectOnly);

  // Multi-city flight rows
  const [multiCityFlights, setMultiCityFlights] = useState([
    { from: "", to: "", departDate: new Date(2026, 10, 5) as Date | null },
    { from: "", to: "", departDate: null as Date | null },
    { from: "", to: "", departDate: null as Date | null },
  ]);

  // Flight popovers state
  const [isFlightFromOpen, setIsFlightFromOpen] = useState(false);
  const [isFlightToOpen, setIsFlightToOpen] = useState(false);
  const [multiCityActiveInput, setMultiCityActiveInput] = useState<{
    rowIdx: number;
    field: "from" | "to";
  } | null>(null);
  const [multiCityDateIdx, setMultiCityDateIdx] = useState<number | null>(null);
  const [isFlightDateOpen, setIsFlightDateOpen] = useState(false);
  const [isFlightPassengersOpen, setIsFlightPassengersOpen] = useState(false);
  const [isFlightClassOpen, setIsFlightClassOpen] = useState(false);
  const [isFlightPaymentOpen, setIsFlightPaymentOpen] = useState(false);
  const [calendarViewDate, setCalendarViewDate] = useState<Date>(
    new Date(2026, 10, 1),
  );

  // Filter Sidebar State
  const [selectedStops, setSelectedStops] = useState<string[]>([]);
  const [selectedAirlines, setSelectedAirlines] = useState<string[]>([]);
  const [maxPrice, setMaxPrice] = useState<number>(608831);
  const [minPrice] = useState<number>(121766);
  const [sortOption, setSortOption] = useState<
    "recommended" | "cheapest" | "fastest"
  >("recommended");
  const [checkedBagFilter, setCheckedBagFilter] = useState(false);
  const [noOvernightFilter, setNoOvernightFilter] = useState(false);

  // Click outside listener for flight popovers
  const filterWrapperRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        filterWrapperRef.current &&
        !filterWrapperRef.current.contains(e.target as Node)
      ) {
        setIsFlightFromOpen(false);
        setIsFlightToOpen(false);
        setMultiCityActiveInput(null);
        setMultiCityDateIdx(null);
        setIsFlightDateOpen(false);
        setIsFlightPassengersOpen(false);
        setIsFlightClassOpen(false);
        setIsFlightPaymentOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Update when URL changes
  useEffect(() => {
    const qOrigin = searchParams.get("origin");
    const qDestination = searchParams.get("destination");
    const qDepart = searchParams.get("departDate");
    const qReturn = searchParams.get("returnDate");
    const qTrip = searchParams.get("tripType") as
      | "oneway"
      | "roundtrip"
      | "multicity"
      | null;

    if (qOrigin !== null) setFlightOrigin(qOrigin);
    if (qDestination !== null) setFlightDestination(qDestination);
    if (qDepart) setFlightDepartDate(new Date(qDepart));
    if (qReturn) setFlightReturnDate(new Date(qReturn));
    if (qTrip) setFlightTripType(qTrip);
  }, [searchParams]);

  const handleFlightSearch = () => {
    const params = new URLSearchParams();
    params.set("tripType", flightTripType);
    if (flightTripType === "multicity") {
      params.set("multiCity", JSON.stringify(multiCityFlights));
    } else {
      params.set("origin", flightOrigin);
      params.set("destination", flightDestination);
      if (flightDepartDate)
        params.set("departDate", flightDepartDate.toISOString());
      if (flightReturnDate)
        params.set("returnDate", flightReturnDate.toISOString());
    }
    params.set("adults", String(flightAdults));
    params.set("children", String(flightChildren));
    params.set("infants", String(flightInfants));
    params.set("cabinClass", flightCabinClass);
    params.set("paymentTypes", flightPaymentTypes);
    if (flightDirectOnly) params.set("directOnly", "true");

    router.push(`/flights?${params.toString()}`);
  };

  const totalFlightPassengers =
    flightAdults + flightChildren + flightInfants;
  const flightPassengersLabel = `${totalFlightPassengers} passenger${
    totalFlightPassengers > 1 ? "s" : ""
  }`;

  const formatDisplayDate = (d: Date) => {
    const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fr", "Sa"];
    const months = [
      "Jan", "Feb", "Mar", "Apr", "May", "Jun",
      "Jul", "Aug", "Sep", "Oct", "Nov", "Dec",
    ];
    return `${days[d.getDay()]}, ${String(d.getDate()).padStart(2, "0")} ${months[d.getMonth()]} ${d.getFullYear()}`;
  };

  const getDaysInMonth = (year: number, month: number) =>
    new Date(year, month + 1, 0).getDate();

  const getFirstDayOfMonth = (year: number, month: number) =>
    new Date(year, month, 1).getDay();

  const isSameDay = (d1: Date, d2: Date) =>
    d1.getFullYear() === d2.getFullYear() &&
    d1.getMonth() === d2.getMonth() &&
    d1.getDate() === d2.getDate();

  const isInRange = (d: Date, start: Date, end: Date) => {
    const t = d.getTime();
    const s = new Date(
      start.getFullYear(),
      start.getMonth(),
      start.getDate(),
    ).getTime();
    const e = new Date(
      end.getFullYear(),
      end.getMonth(),
      end.getDate(),
    ).getTime();
    return t > s && t < e;
  };

  const handleFlightDateClick = (dayDate: Date) => {
    if (flightTripType === "roundtrip") {
      if (
        !flightReturnDate ||
        dayDate < flightDepartDate ||
        isSameDay(dayDate, flightDepartDate)
      ) {
        setFlightDepartDate(dayDate);
        setFlightReturnDate(null);
      } else {
        setFlightReturnDate(dayDate);
      }
    } else {
      setFlightDepartDate(dayDate);
    }
  };

  const renderMonthCalendar = (monthOffset: number) => {
    const targetMonthDate = new Date(
      calendarViewDate.getFullYear(),
      calendarViewDate.getMonth() + monthOffset,
      1,
    );
    const year = targetMonthDate.getFullYear();
    const month = targetMonthDate.getMonth();
    const monthNames = [
      "January", "February", "March", "April", "May", "June",
      "July", "August", "September", "October", "November", "December",
    ];
    const daysInMonth = getDaysInMonth(year, month);
    const firstDay = getFirstDayOfMonth(year, month);
    const prevMonthDays = getDaysInMonth(year, month - 1);

    const cells: { day: number; isCurrentMonth: boolean; date: Date }[] = [];
    for (let i = firstDay - 1; i >= 0; i--) {
      cells.push({
        day: prevMonthDays - i,
        isCurrentMonth: false,
        date: new Date(year, month - 1, prevMonthDays - i),
      });
    }
    for (let i = 1; i <= daysInMonth; i++) {
      cells.push({ day: i, isCurrentMonth: true, date: new Date(year, month, i) });
    }

    return (
      <div className="flex-1 min-w-[250px]">
        <div className="text-center font-bold text-neutral-800 text-sm mb-3">
          {monthNames[month]} {year}
        </div>
        <div className="grid grid-cols-7 gap-y-1 text-center text-xs text-neutral-400 font-medium mb-1.5">
          <span>Su</span>
          <span>Mo</span>
          <span>Tu</span>
          <span>We</span>
          <span>Th</span>
          <span>Fr</span>
          <span>Sa</span>
        </div>
        <div className="grid grid-cols-7 gap-y-1 text-center text-xs">
          {cells.map((cell, idx) => {
            const isDepart =
              cell.isCurrentMonth && isSameDay(cell.date, flightDepartDate);
            const isReturn =
              !!flightReturnDate &&
              cell.isCurrentMonth &&
              isSameDay(cell.date, flightReturnDate);
            const inRange =
              cell.isCurrentMonth &&
              !!flightReturnDate &&
              isInRange(cell.date, flightDepartDate, flightReturnDate);
            const isNewYearsEve =
              cell.isCurrentMonth && month === 11 && cell.day === 31;

            let bgClass = "hover:bg-neutral-100 text-neutral-700";
            if (!cell.isCurrentMonth) {
              bgClass = "text-neutral-300 pointer-events-none";
            } else if (isDepart) {
              bgClass = "bg-[#2563eb] text-white font-bold rounded-l-md shadow-sm";
            } else if (isReturn) {
              bgClass = "bg-[#2563eb] text-white font-bold rounded-r-md shadow-sm";
            } else if (inRange) {
              bgClass = "bg-[#a3e892]/60 text-neutral-900";
            }

            return (
              <button
                key={idx}
                type="button"
                disabled={!cell.isCurrentMonth}
                onClick={() => cell.isCurrentMonth && handleFlightDateClick(cell.date)}
                className={`h-8 flex items-center justify-center transition-colors relative text-xs ${bgClass}`}
              >
                <span>{cell.day}</span>
                {isNewYearsEve && !isDepart && !isReturn && (
                  <span className="text-red-500 font-semibold absolute top-1 right-1 text-[9px] leading-none">
                    *
                  </span>
                )}
              </button>
            );
          })}
        </div>
      </div>
    );
  };

  // Reusable Flight City Popover (opens under any From or To input box)
  const renderFlightCityPopover = (
    placeholder: string,
    currentValue: string,
    onSelect: (city: string) => void,
    onClose: () => void,
    alignRight = false,
  ) => {
    return (
      <div
        className={`absolute top-full mt-2 w-full sm:w-[460px] z-50 bg-white rounded-2xl shadow-2xl border border-neutral-200/80 p-5 animate-in fade-in zoom-in-95 duration-150 ${
          alignRight ? "right-0" : "left-0"
        }`}
      >
        <div className="border border-[#2563eb] rounded-xl px-4 py-3 mb-5 ring-1 ring-[#2563eb] bg-white">
          <input
            type="text"
            placeholder={placeholder}
            defaultValue={currentValue}
            autoFocus
            className="w-full text-sm font-semibold text-neutral-900 outline-none bg-transparent placeholder:text-neutral-400"
          />
        </div>

        <div>
          <h4 className="text-xs font-bold text-neutral-800 mb-3 tracking-wide">
            Popular cities
          </h4>
          <div className="grid grid-cols-4 gap-y-3.5 gap-x-2 text-xs font-medium text-neutral-700">
            {FLIGHT_POPULAR_CITIES.map((city) => {
              const isChittagong = city === "Chittagong";
              return (
                <button
                  key={city}
                  type="button"
                  onClick={() => {
                    onSelect(city);
                    onClose();
                  }}
                  className={`text-left py-1 px-2 rounded-lg transition-colors truncate ${
                    isChittagong
                      ? "bg-[#eff6ff] text-[#1d4ed8] font-semibold"
                      : "hover:bg-neutral-100 hover:text-neutral-950"
                  }`}
                >
                  {city}
                </button>
              );
            })}
          </div>
        </div>
      </div>
    );
  };

  // Filtered & Sorted Flights
  const filteredFlights = useMemo(() => {
    let result = [...DEMO_FLIGHTS];

    // Stops filter
    if (selectedStops.length > 0) {
      result = result.filter((f) => {
        if (selectedStops.includes("direct") && f.outbound.stops === 0)
          return true;
        if (selectedStops.includes("1stop") && f.outbound.stops === 1)
          return true;
        if (selectedStops.includes("2stops") && f.outbound.stops >= 2)
          return true;
        return false;
      });
    }

    // Direct only filter from top bar
    if (flightDirectOnly) {
      result = result.filter(
        (f) => f.outbound.stops === 0 && (!f.inbound || f.inbound.stops === 0),
      );
    }

    // Airline filter
    if (selectedAirlines.length > 0) {
      result = result.filter(
        (f) =>
          selectedAirlines.includes(f.outbound.airline) ||
          (f.inbound && selectedAirlines.includes(f.inbound.airline)),
      );
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
  }, [selectedStops, selectedAirlines, maxPrice, sortOption, flightDirectOnly]);

  return (
    <div className="min-h-screen bg-[#FFFFFF] text-neutral-800">
      <Navbar />

      {/* Main Container */}
      <div className="pt-24 pb-16 container-page">
        <NavServiceBar active="flights" />
        {/* ========================================================= */}
        {/* TOP SEARCH BAR WIDGET                                     */}
        {/* ========================================================= */}
        <div
          ref={filterWrapperRef}
          className="bg-[#F5F5F5] rounded-2xl border border-neutral-200 shadow-sm p-4 sm:p-6 mb-5 transition-all"
        >
          {/* Top Row: Trip Types & "Search with AI" */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-5">
            <div className="inline-flex items-center gap-1.5 bg-neutral-100/80 p-1 rounded-xl">
              <button
                type="button"
                onClick={() => setFlightTripType("oneway")}
                className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                  flightTripType === "oneway"
                    ? "bg-[#eff6ff] text-[#1d4ed8] border border-[#bfdbfe] font-bold"
                    : "text-neutral-600 hover:text-neutral-900"
                }`}
              >
                One-way
              </button>
              <button
                type="button"
                onClick={() => setFlightTripType("roundtrip")}
                className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                  flightTripType === "roundtrip"
                    ? "bg-[#eff6ff] text-[#1d4ed8] border border-[#bfdbfe] font-bold"
                    : "text-neutral-600 hover:text-neutral-900"
                }`}
              >
                Round-trip
              </button>
              <button
                type="button"
                onClick={() => setFlightTripType("multicity")}
                className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                  flightTripType === "multicity"
                    ? "bg-[#eff6ff] text-[#1d4ed8] border border-[#bfdbfe] font-bold"
                    : "text-neutral-600 hover:text-neutral-900"
                }`}
              >
                Multi-city
              </button>
            </div>

            <button
              type="button"
              className="inline-flex items-center gap-2 self-start sm:self-auto px-4 py-2 rounded-xl border border-neutral-200/90 hover:border-neutral-300 bg-white hover:bg-neutral-50 text-xs sm:text-[13px] font-medium text-neutral-700 shadow-sm transition-all"
            >
              <IoSparklesOutline className="text-sm text-neutral-600" />
              <span>Search with AI</span>
              <span className="bg-[#ff6a00] text-white text-[10px] font-bold px-1.5 py-0.5 rounded-md leading-none">
                New
              </span>
            </button>
          </div>

          {/* Main Inputs: Switches layout between Round-trip / One-way and Multi-city */}
          {flightTripType === "multicity" ? (
            /* Multi-City Layout */
            <div className="space-y-3 mb-5">
              {multiCityFlights.map((flightRow, fIdx) => (
                <div key={fIdx} className="flex items-center gap-2">
                  <div className="flex-1 grid grid-cols-1 lg:grid-cols-12 gap-3 relative">
                    {/* From / To Container */}
                    <div className="lg:col-span-8 relative flex items-center border border-neutral-200 rounded-xl bg-white">
                      {/* From Field */}
                      <div
                        onClick={() => {
                          setMultiCityActiveInput(
                            multiCityActiveInput?.rowIdx === fIdx && multiCityActiveInput?.field === "from"
                              ? null
                              : { rowIdx: fIdx, field: "from" },
                          );
                          setIsFlightDateOpen(false);
                        }}
                        className={`flex-1 px-4 py-3 border-r border-neutral-200/80 cursor-pointer rounded-l-xl transition-all ${
                          multiCityActiveInput?.rowIdx === fIdx && multiCityActiveInput?.field === "from"
                            ? "ring-2 ring-inset ring-[#2563eb] bg-white"
                            : "hover:bg-neutral-50/50"
                        }`}
                      >
                        <span className={`text-xs sm:text-sm font-semibold truncate block ${flightRow.from ? "text-neutral-900" : "text-neutral-400"}`}>
                          {flightRow.from || "From"}
                        </span>
                      </div>

                      {/* Swap Button */}
                      <button
                        type="button"
                        onClick={() => {
                          const updated = [...multiCityFlights];
                          const temp = updated[fIdx].from;
                          updated[fIdx].from = updated[fIdx].to;
                          updated[fIdx].to = temp;
                          setMultiCityFlights(updated);
                        }}
                        className="w-7 h-7 rounded-full border border-neutral-200 bg-white text-neutral-500 hover:text-neutral-800 hover:bg-neutral-50 flex items-center justify-center -mx-3.5 z-20 shrink-0 shadow-sm transition-colors"
                      >
                        <FaExchangeAlt className="text-[10px]" />
                      </button>

                      {/* To Field */}
                      <div
                        onClick={() => {
                          setMultiCityActiveInput(
                            multiCityActiveInput?.rowIdx === fIdx && multiCityActiveInput?.field === "to"
                              ? null
                              : { rowIdx: fIdx, field: "to" },
                          );
                          setIsFlightDateOpen(false);
                        }}
                        className={`flex-1 px-4 py-3 cursor-pointer rounded-r-xl transition-all ${
                          multiCityActiveInput?.rowIdx === fIdx && multiCityActiveInput?.field === "to"
                            ? "ring-2 ring-inset ring-[#2563eb] bg-white"
                            : "hover:bg-neutral-50/50"
                        }`}
                      >
                        <span className={`text-xs sm:text-sm font-semibold truncate block ${flightRow.to ? "text-neutral-900" : "text-neutral-400"}`}>
                          {flightRow.to || "To"}
                        </span>
                      </div>

                      {/* Multi-city Popover for From */}
                      {multiCityActiveInput?.rowIdx === fIdx && multiCityActiveInput?.field === "from" &&
                        renderFlightCityPopover(
                          "From",
                          flightRow.from,
                          (selectedCity) => {
                            const updated = [...multiCityFlights];
                            updated[fIdx].from = selectedCity;
                            setMultiCityFlights(updated);
                          },
                          () => setMultiCityActiveInput(null),
                        )}

                      {/* Multi-city Popover for To */}
                      {multiCityActiveInput?.rowIdx === fIdx && multiCityActiveInput?.field === "to" &&
                        renderFlightCityPopover(
                          "To",
                          flightRow.to,
                          (selectedCity) => {
                            const updated = [...multiCityFlights];
                            updated[fIdx].to = selectedCity;
                            setMultiCityFlights(updated);
                          },
                          () => setMultiCityActiveInput(null),
                          true,
                        )}
                    </div>

                    {/* Depart Date Container */}
                    <div className="lg:col-span-4 relative">
                      <div
                        onClick={() => {
                          setMultiCityDateIdx(multiCityDateIdx === fIdx ? null : fIdx);
                          setMultiCityActiveInput(null);
                        }}
                        className={`border rounded-xl bg-white px-4 py-3 flex items-center justify-between cursor-pointer transition-all ${
                          multiCityDateIdx === fIdx ? "border-[#2563eb] ring-1 ring-[#2563eb]" : "border-neutral-200"
                        }`}
                      >
                        {flightRow.departDate ? (
                          <span className="text-xs sm:text-[13px] font-bold text-neutral-800">
                            {formatDisplayDate(flightRow.departDate)}
                          </span>
                        ) : (
                          <span
                            onClick={(e) => {
                              e.stopPropagation();
                              const updated = [...multiCityFlights];
                              const d = new Date(flightDepartDate);
                              d.setDate(d.getDate() + fIdx * 3);
                              updated[fIdx].departDate = d;
                              setMultiCityFlights(updated);
                              setMultiCityDateIdx(fIdx);
                            }}
                            className="text-xs sm:text-[13px] font-medium text-neutral-400 cursor-pointer hover:text-neutral-600"
                          >
                            Depart
                          </span>
                        )}

                        {flightRow.departDate && (
                          <div className="flex items-center gap-1 text-neutral-400">
                            <button
                              type="button"
                              onClick={(e) => {
                                e.stopPropagation();
                                const updated = [...multiCityFlights];
                                if (updated[fIdx].departDate) {
                                  const d = new Date(updated[fIdx].departDate!);
                                  d.setDate(d.getDate() - 1);
                                  updated[fIdx].departDate = d;
                                  setMultiCityFlights(updated);
                                }
                              }}
                              className="p-1 hover:text-neutral-700 hover:bg-neutral-100 rounded transition-colors"
                            >
                              <FiChevronLeft className="text-xs" />
                            </button>
                            <button
                              type="button"
                              onClick={(e) => {
                                e.stopPropagation();
                                const updated = [...multiCityFlights];
                                if (updated[fIdx].departDate) {
                                  const d = new Date(updated[fIdx].departDate!);
                                  d.setDate(d.getDate() + 1);
                                  updated[fIdx].departDate = d;
                                  setMultiCityFlights(updated);
                                }
                              }}
                              className="p-1 hover:text-neutral-700 hover:bg-neutral-100 rounded transition-colors"
                            >
                              <FiChevronRight className="text-xs" />
                            </button>
                          </div>
                        )}
                      </div>

                      {/* Multi-city Calendar Popover */}
                      {multiCityDateIdx === fIdx && (
                        <div className="absolute top-full right-0 mt-2 z-50 bg-white rounded-2xl shadow-2xl border border-neutral-200/80 p-5 w-[95vw] max-w-[620px] animate-in fade-in zoom-in-95 duration-150">
                          <div className="border border-[#2563eb] rounded-xl overflow-hidden mb-4 p-3 bg-neutral-50/50">
                            <span className="block text-xs sm:text-sm font-bold text-neutral-900">
                              {flightRow.departDate ? formatDisplayDate(flightRow.departDate) : "Select date"}
                            </span>
                          </div>

                          <div className="relative mb-3">
                            <div className="flex items-center justify-between mb-2 px-1">
                              <button
                                type="button"
                                onClick={() =>
                                  setCalendarViewDate(
                                    new Date(calendarViewDate.getFullYear(), calendarViewDate.getMonth() - 1, 1),
                                  )
                                }
                                className="w-7 h-7 rounded-full flex items-center justify-center text-neutral-500 hover:bg-neutral-100 transition-colors"
                              >
                                <IoIosArrowBack />
                              </button>
                              <button
                                type="button"
                                onClick={() =>
                                  setCalendarViewDate(
                                    new Date(calendarViewDate.getFullYear(), calendarViewDate.getMonth() + 1, 1),
                                  )
                                }
                                className="w-7 h-7 rounded-full flex items-center justify-center text-neutral-500 hover:bg-neutral-100 transition-colors"
                              >
                                <IoIosArrowForward />
                              </button>
                            </div>

                            <div className="flex flex-col sm:flex-row gap-6">
                              {renderMonthCalendar(0)}
                              {renderMonthCalendar(1)}
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Delete row button */}
                  <button
                    type="button"
                    onClick={() => {
                      if (multiCityFlights.length > 2) {
                        setMultiCityFlights(multiCityFlights.filter((_, i) => i !== fIdx));
                      } else {
                        const updated = [...multiCityFlights];
                        updated[fIdx] = { from: "", to: "", departDate: null };
                        setMultiCityFlights(updated);
                      }
                    }}
                    className="w-7 h-7 rounded-full bg-neutral-500/80 hover:bg-neutral-600 text-white flex items-center justify-center shrink-0 transition-colors"
                  >
                    <MdClose className="text-xs" />
                  </button>
                </div>
              ))}

              {/* + Add flight button */}
              <div className="pt-1">
                <button
                  type="button"
                  onClick={() =>
                    setMultiCityFlights([
                      ...multiCityFlights,
                      { from: "", to: "", departDate: null },
                    ])
                  }
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl border border-[#2563eb] text-[#1d4ed8] hover:bg-[#eff6ff]/50 text-xs sm:text-[13px] font-bold transition-all"
                >
                  <FaPlus className="text-[11px]" />
                  <span>Add flight</span>
                </button>
              </div>
            </div>
          ) : (
            /* One-way and Round-trip Layout */
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-3 mb-5 relative">
              {/* Origin & Destination Container */}
              <div className="lg:col-span-6 relative flex items-center border border-neutral-200 rounded-xl bg-white">
                {/* From Field */}
                <div
                  onClick={() => {
                    setIsFlightFromOpen(!isFlightFromOpen);
                    setIsFlightToOpen(false);
                    setIsFlightDateOpen(false);
                    setIsFlightPassengersOpen(false);
                    setIsFlightClassOpen(false);
                    setIsFlightPaymentOpen(false);
                  }}
                  className={`flex-1 flex items-center gap-2 px-3.5 py-3 border-r border-neutral-200/80 cursor-pointer rounded-l-xl transition-all ${
                    isFlightFromOpen
                      ? "ring-2 ring-inset ring-[#2563eb] bg-white"
                      : "hover:bg-neutral-50/50"
                  }`}
                >
                  {flightOrigin ? (
                    <div className="inline-flex items-center gap-1.5 bg-neutral-100 hover:bg-neutral-200/80 px-2.5 py-1 rounded-md text-xs font-bold text-neutral-800 transition-colors">
                      <FaMapMarkerAlt className="text-neutral-500 text-[11px]" />
                      <span>{flightOrigin}</span>
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          setFlightOrigin("");
                        }}
                        className="text-neutral-400 hover:text-neutral-700 ml-0.5"
                      >
                        <MdClose className="text-xs" />
                      </button>
                    </div>
                  ) : (
                    <span className="text-xs sm:text-sm font-medium text-neutral-400">
                      From
                    </span>
                  )}
                </div>

                {/* Swap Button */}
                <button
                  type="button"
                  onClick={() => {
                    const temp = flightOrigin;
                    setFlightOrigin(flightDestination);
                    setFlightDestination(temp);
                  }}
                  className="w-7 h-7 rounded-full border border-neutral-200 bg-white text-neutral-500 hover:text-neutral-800 hover:bg-neutral-50 flex items-center justify-center -mx-3.5 z-20 shrink-0 shadow-sm transition-colors"
                >
                  <FaExchangeAlt className="text-[10px]" />
                </button>

                {/* To Field */}
                <div
                  onClick={() => {
                    setIsFlightToOpen(!isFlightToOpen);
                    setIsFlightFromOpen(false);
                    setIsFlightDateOpen(false);
                    setIsFlightPassengersOpen(false);
                    setIsFlightClassOpen(false);
                    setIsFlightPaymentOpen(false);
                  }}
                  className={`flex-1 flex items-center px-4 py-3 cursor-pointer rounded-r-xl transition-all ${
                    isFlightToOpen
                      ? "ring-2 ring-inset ring-[#2563eb] bg-white"
                      : "hover:bg-neutral-50/50"
                  }`}
                >
                  {flightDestination ? (
                    <div className="inline-flex items-center gap-1.5 bg-neutral-100 hover:bg-neutral-200/80 px-2.5 py-1 rounded-md text-xs font-bold text-neutral-800 transition-colors">
                      <FaPlane className="text-neutral-500 text-[11px]" />
                      <span>{flightDestination}</span>
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          setFlightDestination("");
                        }}
                        className="text-neutral-400 hover:text-neutral-700 ml-0.5"
                      >
                        <MdClose className="text-xs" />
                      </button>
                    </div>
                  ) : (
                    <span className="text-xs sm:text-sm font-medium text-neutral-400">
                      To
                    </span>
                  )}
                </div>

                {/* "From" Dropdown Popup (Popular cities 4x4) */}
                {isFlightFromOpen &&
                  renderFlightCityPopover(
                    "From",
                    flightOrigin,
                    (city) => setFlightOrigin(city),
                    () => setIsFlightFromOpen(false),
                  )}

                {/* "To" Dropdown Popup (Popular cities 4x4) */}
                {isFlightToOpen &&
                  renderFlightCityPopover(
                    "To",
                    flightDestination,
                    (city) => setFlightDestination(city),
                    () => setIsFlightToOpen(false),
                    true,
                  )}
              </div>

              {/* Depart & Return Dates Container */}
              <div className="lg:col-span-6 relative">
                {flightTripType === "oneway" ? (
                  /* One-way Single Date Box */
                  <div
                    onClick={() => {
                      setIsFlightDateOpen(!isFlightDateOpen);
                      setIsFlightFromOpen(false);
                      setIsFlightToOpen(false);
                      setIsFlightPassengersOpen(false);
                      setIsFlightClassOpen(false);
                      setIsFlightPaymentOpen(false);
                    }}
                    className={`border rounded-xl bg-white overflow-hidden cursor-pointer px-4 py-3 flex items-center justify-between transition-all ${
                      isFlightDateOpen ? "border-[#2563eb] ring-1 ring-[#2563eb]" : "border-neutral-200"
                    }`}
                  >
                    <span className="text-xs sm:text-[13px] font-bold text-neutral-800 truncate">
                      {formatDisplayDate(flightDepartDate)}
                    </span>
                    <div className="flex items-center gap-1 text-neutral-400 shrink-0 ml-2">
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          const d = new Date(flightDepartDate);
                          d.setDate(d.getDate() - 1);
                          setFlightDepartDate(d);
                        }}
                        className="p-1 hover:text-neutral-700 hover:bg-neutral-100 rounded transition-colors"
                      >
                        <FiChevronLeft className="text-xs" />
                      </button>
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          const d = new Date(flightDepartDate);
                          d.setDate(d.getDate() + 1);
                          setFlightDepartDate(d);
                        }}
                        className="p-1 hover:text-neutral-700 hover:bg-neutral-100 rounded transition-colors"
                      >
                        <FiChevronRight className="text-xs" />
                      </button>
                    </div>
                  </div>
                ) : (
                  /* Round-trip Dual Date Box */
                  <div
                    onClick={() => {
                      setIsFlightDateOpen(!isFlightDateOpen);
                      setIsFlightFromOpen(false);
                      setIsFlightToOpen(false);
                      setIsFlightPassengersOpen(false);
                      setIsFlightClassOpen(false);
                      setIsFlightPaymentOpen(false);
                    }}
                    className={`grid grid-cols-2 border rounded-xl bg-white overflow-hidden cursor-pointer ${
                      isFlightDateOpen ? "border-[#2563eb] ring-1 ring-[#2563eb]" : "border-neutral-200"
                    }`}
                  >
                    {/* Depart Date */}
                    <div className="flex items-center justify-between px-3.5 py-3 border-r border-neutral-200/80">
                      <span className="text-xs sm:text-[13px] font-bold text-neutral-800 truncate">
                        {formatDisplayDate(flightDepartDate)}
                      </span>
                      <div className="flex items-center gap-1 text-neutral-400 shrink-0 ml-2">
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            const d = new Date(flightDepartDate);
                            d.setDate(d.getDate() - 1);
                            setFlightDepartDate(d);
                          }}
                          className="p-1 hover:text-neutral-700 hover:bg-neutral-100 rounded transition-colors"
                        >
                          <FiChevronLeft className="text-xs" />
                        </button>
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            const d = new Date(flightDepartDate);
                            d.setDate(d.getDate() + 1);
                            setFlightDepartDate(d);
                          }}
                          className="p-1 hover:text-neutral-700 hover:bg-neutral-100 rounded transition-colors"
                        >
                          <FiChevronRight className="text-xs" />
                        </button>
                      </div>
                    </div>

                    {/* Return Date */}
                    <div className="flex items-center px-4 py-3">
                      {flightReturnDate ? (
                        <span className="text-xs sm:text-[13px] font-bold text-neutral-800">
                          {formatDisplayDate(flightReturnDate)}
                        </span>
                      ) : (
                        <span
                          onClick={(e) => {
                            e.stopPropagation();
                            const d = new Date(flightDepartDate);
                            d.setDate(d.getDate() + 4);
                            setFlightReturnDate(d);
                          }}
                          className="text-xs sm:text-[13px] font-medium text-neutral-400 hover:text-neutral-600 transition-colors"
                        >
                          Return
                        </span>
                      )}
                    </div>
                  </div>
                )}

                {/* Flight Date Calendar Popover */}
                {isFlightDateOpen && (
                  <div className="absolute top-full right-0 sm:left-[-100px] mt-2 z-50 bg-white rounded-2xl shadow-2xl border border-neutral-200/80 p-5 w-[95vw] max-w-[620px] animate-in fade-in zoom-in-95 duration-150">
                    {/* Active Selection Header */}
                    <div className={`grid ${flightTripType === "oneway" ? "grid-cols-1" : "grid-cols-2"} border border-[#2563eb] rounded-xl overflow-hidden mb-4`}>
                      <div className="p-3 border-r border-[#2563eb]/30 bg-neutral-50/50">
                        <span className="block text-xs sm:text-sm font-bold text-neutral-900">
                          {formatDisplayDate(flightDepartDate)}
                        </span>
                      </div>
                      {flightTripType !== "oneway" && (
                        <div className="p-3 bg-white">
                          <span className="block text-xs sm:text-sm font-medium text-neutral-400">
                            {flightReturnDate ? formatDisplayDate(flightReturnDate) : "Return"}
                          </span>
                        </div>
                      )}
                    </div>

                    {/* Month Navigation & Two Months Display */}
                    <div className="relative mb-3">
                      <div className="flex items-center justify-between mb-2 px-1">
                        <button
                          type="button"
                          onClick={() =>
                            setCalendarViewDate(
                              new Date(calendarViewDate.getFullYear(), calendarViewDate.getMonth() - 1, 1),
                            )
                          }
                          className="w-7 h-7 rounded-full flex items-center justify-center text-neutral-500 hover:bg-neutral-100 transition-colors"
                        >
                          <IoIosArrowBack />
                        </button>
                        <button
                          type="button"
                          onClick={() =>
                            setCalendarViewDate(
                              new Date(calendarViewDate.getFullYear(), calendarViewDate.getMonth() + 1, 1),
                            )
                          }
                          className="w-7 h-7 rounded-full flex items-center justify-center text-neutral-500 hover:bg-neutral-100 transition-colors"
                        >
                          <IoIosArrowForward />
                        </button>
                      </div>

                      <div className="flex flex-col sm:flex-row gap-6">
                        {renderMonthCalendar(0)}
                        {renderMonthCalendar(1)}
                      </div>
                    </div>

                    {/* Public Holidays Legend */}
                    <div className="border-t border-neutral-100 pt-3 mt-3">
                      <span className="block text-[10px] font-bold text-neutral-400 uppercase tracking-wider mb-1.5">
                        *Public Holidays
                      </span>
                      <div className="inline-flex items-center gap-2 bg-neutral-50 px-2.5 py-1 rounded-md text-xs">
                        <span className="text-red-500 font-bold">31 Dec</span>
                        <span className="text-neutral-600">New Year&apos;s Eve</span>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Bottom Row: Direct Only (hidden in multi-city), Passengers, Class, Payments & Search */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-2 relative">
            {/* Direct Only Checkbox (shown only for One-way / Round-trip) */}
            {flightTripType !== "multicity" ? (
              <label className="flex items-center gap-2.5 cursor-pointer select-none text-xs sm:text-sm font-medium text-neutral-700">
                <div
                  onClick={() => setFlightDirectOnly(!flightDirectOnly)}
                  className={`w-5 h-5 rounded border flex items-center justify-center transition-colors ${
                    flightDirectOnly
                      ? "bg-[#2563eb] border-[#2563eb] text-white"
                      : "border-neutral-300 bg-white"
                  }`}
                >
                  {flightDirectOnly && <FiCheck className="text-xs stroke-[3]" />}
                </div>
                <span onClick={() => setFlightDirectOnly(!flightDirectOnly)}>
                  Direct Only
                </span>
              </label>
            ) : (
              <div />
            )}

            {/* Dropdown Filters & Search Button */}
            <div className="flex flex-wrap items-center gap-4 sm:gap-6 self-stretch sm:self-auto justify-between sm:justify-end">
              <div className="flex items-center gap-4 text-xs font-semibold text-neutral-700">
                {/* Passengers Dropdown */}
                <div className="relative">
                  <div
                    onClick={() => {
                      setIsFlightPassengersOpen(!isFlightPassengersOpen);
                      setIsFlightClassOpen(false);
                      setIsFlightPaymentOpen(false);
                    }}
                    className="flex items-center gap-1 cursor-pointer hover:text-neutral-950 py-1 select-none"
                  >
                    <span>{flightPassengersLabel}</span>
                    <FaChevronDown
                      className={`text-[9px] text-neutral-500 transition-transform duration-200 ${
                        isFlightPassengersOpen ? "rotate-180" : ""
                      }`}
                    />
                  </div>

                  {/* Passengers Popover (opens at bottom) */}
                  {isFlightPassengersOpen && (
                    <div className="absolute top-full mt-2 right-0 w-[300px] z-50 bg-white rounded-2xl shadow-2xl border border-neutral-200/80 p-5 animate-in fade-in zoom-in-95 duration-150">
                      <div className="space-y-4">
                        {/* Adults */}
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <LuUser className="text-xl text-neutral-600" />
                            <div>
                              <div className="text-xs font-bold text-neutral-800">Adults</div>
                              <div className="text-[10px] text-neutral-400">&gt;12 years</div>
                            </div>
                          </div>
                          <div className="flex items-center gap-3">
                            <button
                              type="button"
                              disabled={flightAdults <= 1}
                              onClick={() => setFlightAdults(Math.max(1, flightAdults - 1))}
                              className="w-7 h-7 rounded-full border border-neutral-300 flex items-center justify-center text-neutral-700 disabled:opacity-30 hover:border-neutral-500"
                            >
                              <FaMinus className="text-[9px]" />
                            </button>
                            <span className="w-4 text-center text-xs font-bold text-neutral-800">
                              {flightAdults}
                            </span>
                            <button
                              type="button"
                              onClick={() => setFlightAdults(flightAdults + 1)}
                              className="w-7 h-7 rounded-full border border-neutral-300 flex items-center justify-center text-neutral-700 hover:border-neutral-500"
                            >
                              <FaPlus className="text-[9px]" />
                            </button>
                          </div>
                        </div>

                        {/* Children */}
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <LuUser className="text-xl text-neutral-600" />
                            <div>
                              <div className="text-xs font-bold text-neutral-800">Children</div>
                              <div className="text-[10px] text-neutral-400">2-12 years</div>
                            </div>
                          </div>
                          <div className="flex items-center gap-3">
                            <button
                              type="button"
                              disabled={flightChildren <= 0}
                              onClick={() => setFlightChildren(Math.max(0, flightChildren - 1))}
                              className="w-7 h-7 rounded-full border border-neutral-300 flex items-center justify-center text-neutral-700 disabled:opacity-30 hover:border-neutral-500"
                            >
                              <FaMinus className="text-[9px]" />
                            </button>
                            <span className="w-4 text-center text-xs font-bold text-neutral-800">
                              {flightChildren}
                            </span>
                            <button
                              type="button"
                              onClick={() => setFlightChildren(flightChildren + 1)}
                              className="w-7 h-7 rounded-full border border-neutral-300 flex items-center justify-center text-neutral-700 hover:border-neutral-500"
                            >
                              <FaPlus className="text-[9px]" />
                            </button>
                          </div>
                        </div>

                        {/* Infants */}
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <FaBaby className="text-xl text-neutral-600" />
                            <div>
                              <div className="text-xs font-bold text-neutral-800">Infants</div>
                              <div className="text-[10px] text-neutral-400">&lt;2 years</div>
                            </div>
                          </div>
                          <div className="flex items-center gap-3">
                            <button
                              type="button"
                              disabled={flightInfants <= 0}
                              onClick={() => setFlightInfants(Math.max(0, flightInfants - 1))}
                              className="w-7 h-7 rounded-full border border-neutral-300 flex items-center justify-center text-neutral-700 disabled:opacity-30 hover:border-neutral-500"
                            >
                              <FaMinus className="text-[9px]" />
                            </button>
                            <span className="w-4 text-center text-xs font-bold text-neutral-800">
                              {flightInfants}
                            </span>
                            <button
                              type="button"
                              onClick={() => setFlightInfants(flightInfants + 1)}
                              className="w-7 h-7 rounded-full border border-neutral-300 flex items-center justify-center text-neutral-700 hover:border-neutral-500"
                            >
                              <FaPlus className="text-[9px]" />
                            </button>
                          </div>
                        </div>
                      </div>

                      <div className="border-t border-neutral-100 pt-3 mt-4 flex justify-end">
                        <button
                          type="button"
                          onClick={() => setIsFlightPassengersOpen(false)}
                          className="text-xs font-bold text-[#2563eb] hover:text-[#1d4ed8] px-2 py-1"
                        >
                          Apply
                        </button>
                      </div>
                    </div>
                  )}
                </div>

                {/* Cabin Class Dropdown */}
                <div className="relative">
                  <div
                    onClick={() => {
                      setIsFlightClassOpen(!isFlightClassOpen);
                      setIsFlightPassengersOpen(false);
                      setIsFlightPaymentOpen(false);
                    }}
                    className="flex items-center gap-1 cursor-pointer hover:text-neutral-950 py-1 select-none"
                  >
                    <span>{flightCabinClass}</span>
                    <FaChevronDown
                      className={`text-[9px] text-neutral-500 transition-transform duration-200 ${
                        isFlightClassOpen ? "rotate-180" : ""
                      }`}
                    />
                  </div>

                  {/* Cabin Class Popover (opens at bottom) */}
                  {isFlightClassOpen && (
                    <div className="absolute top-full mt-2 right-0 w-[200px] z-50 bg-white rounded-2xl shadow-2xl border border-neutral-200/80 p-2 animate-in fade-in zoom-in-95 duration-150">
                      {[
                        "Economy",
                        "Premium Economy",
                        "Business Class",
                        "First Class",
                      ].map((item) => (
                        <div
                          key={item}
                          onClick={() => {
                            setFlightCabinClass(item);
                            setIsFlightClassOpen(false);
                          }}
                          className={`flex items-center justify-between px-3 py-2.5 rounded-xl cursor-pointer text-xs font-medium transition-colors ${
                            flightCabinClass === item
                              ? "text-neutral-900 font-bold bg-neutral-50"
                              : "text-neutral-700 hover:bg-neutral-50 hover:text-neutral-950"
                          }`}
                        >
                          <span>{item}</span>
                          {flightCabinClass === item && (
                            <FiCheck className="text-[#2563eb] text-sm stroke-[3]" />
                          )}
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {/* 4 Payment Types dropdown */}
                <div className="relative">
                  <div
                    onClick={() => {
                      setIsFlightPaymentOpen(!isFlightPaymentOpen);
                      setIsFlightPassengersOpen(false);
                      setIsFlightClassOpen(false);
                    }}
                    className="flex items-center gap-1 cursor-pointer hover:text-neutral-950 py-1 select-none"
                  >
                    <span>{flightPaymentTypes}</span>
                    <FaChevronDown
                      className={`text-[9px] text-neutral-500 transition-transform duration-200 ${
                        isFlightPaymentOpen ? "rotate-180" : ""
                      }`}
                    />
                  </div>

                  {/* Payment Types Popover (opens at bottom) */}
                  {isFlightPaymentOpen && (
                    <div className="absolute top-full mt-2 right-0 w-[220px] z-50 bg-white rounded-2xl shadow-2xl border border-neutral-200/80 p-2 animate-in fade-in zoom-in-95 duration-150">
                      {[
                        "4 Payment Types",
                        "Credit / Debit Card",
                        "Mobile Banking (bKash/Nagad)",
                        "Net Banking",
                      ].map((type) => (
                        <div
                          key={type}
                          onClick={() => {
                            setFlightPaymentTypes(type);
                            setIsFlightPaymentOpen(false);
                          }}
                          className={`flex items-center justify-between px-3 py-2 rounded-xl cursor-pointer text-xs font-medium transition-colors ${
                            flightPaymentTypes === type
                              ? "text-neutral-900 font-bold bg-neutral-50"
                              : "text-neutral-700 hover:bg-neutral-50"
                          }`}
                        >
                          <span>{type}</span>
                          {flightPaymentTypes === type && (
                            <FiCheck className="text-[#2563eb] text-xs" />
                          )}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              <button
                type="button"
                onClick={handleFlightSearch}
                className="bg-[#2563eb] hover:bg-[#1d4ed8] active:scale-95 text-white font-bold text-sm px-10 py-3 rounded-full transition-all duration-200 shadow-md hover:shadow-lg"
              >
                Search
              </button>
            </div>
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
            <div className="bg-[#F5F5F5] backdrop-blur-lg rounded-2xl border border-neutral-200/90 p-3.5 flex items-center justify-between shadow-sm cursor-pointer hover:border-[#2563eb] hover:bg-white transition-all">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-[#2563eb] text-white flex items-center justify-center">
                  <FaBell className="text-sm" />
                </div>
                <div>
                  <p className="text-xs font-bold text-neutral-900 leading-tight">
                    Notify me if price drops
                  </p>
                </div>
              </div>
              <IoIosArrowForward className="text-neutral-400 text-sm" />
            </div>

            {/* Filter Card Container */}
            <div className="bg-[#F5F5F5] backdrop-blur-xl rounded-2xl border border-neutral-200/90 p-4 sm:p-5 shadow-sm space-y-5">
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
                    setFlightDirectOnly(false);
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
                    <label
                      key={s.id}
                      className="flex items-center justify-between text-xs text-neutral-700 cursor-pointer"
                    >
                      <div className="flex items-center gap-2">
                        <input
                          type="checkbox"
                          checked={selectedStops.includes(s.id)}
                          onChange={(e) => {
                            if (e.target.checked)
                              setSelectedStops([...selectedStops, s.id]);
                            else
                              setSelectedStops(
                                selectedStops.filter((x) => x !== s.id),
                              );
                          }}
                          className="accent-[#2563eb] rounded"
                        />
                        <span>{s.label}</span>
                      </div>
                      <span className="text-neutral-400 text-[11px]">
                        {s.price}
                      </span>
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
                    <input
                      type="checkbox"
                      className="accent-[#2563eb] rounded"
                    />
                    <span>No long stop-overs (up to 4hrs)</span>
                  </label>
                  <label className="flex items-center gap-2 text-xs text-neutral-700 cursor-pointer">
                    <input
                      type="checkbox"
                      className="accent-[#2563eb] rounded"
                    />
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
                  {flightOrigin || "Dhaka"} → {flightDestination || "Jeddah"}
                </p>
                <div className="grid grid-cols-2 gap-1.5 text-center text-xs">
                  <div className="border border-neutral-200 rounded-lg p-2 hover:border-[#2563eb] cursor-pointer">
                    <FaMoon className="mx-auto text-neutral-400 text-xs mb-1" />
                    <p className="text-[10px] font-bold text-neutral-800">
                      00:00 - 06:00
                    </p>
                    <p className="text-[9px] text-neutral-400">৳122,473</p>
                  </div>
                  <div className="border border-neutral-200 rounded-lg p-2 hover:border-[#2563eb] cursor-pointer">
                    <FaSun className="mx-auto text-amber-500 text-xs mb-1" />
                    <p className="text-[10px] font-bold text-neutral-800">
                      06:00 - 12:00
                    </p>
                    <p className="text-[9px] text-neutral-400">৳121,105</p>
                  </div>
                  <div className="border border-neutral-200 rounded-lg p-2 hover:border-[#2563eb] cursor-pointer">
                    <FaSun className="mx-auto text-amber-500 text-xs mb-1" />
                    <p className="text-[10px] font-bold text-neutral-800">
                      12:00 - 18:00
                    </p>
                    <p className="text-[9px] text-neutral-400">৳122,774</p>
                  </div>
                  <div className="border border-neutral-200 rounded-lg p-2 hover:border-[#2563eb] cursor-pointer">
                    <FaMoon className="mx-auto text-neutral-400 text-xs mb-1" />
                    <p className="text-[10px] font-bold text-neutral-800">
                      18:00 - 24:00
                    </p>
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
                    <label
                      key={a.name}
                      className="flex items-center justify-between text-xs text-neutral-700 cursor-pointer"
                    >
                      <div className="flex items-center gap-2">
                        <input
                          type="checkbox"
                          checked={selectedAirlines.includes(a.name)}
                          onChange={(e) => {
                            if (e.target.checked)
                              setSelectedAirlines([
                                ...selectedAirlines,
                                a.name,
                              ]);
                            else
                              setSelectedAirlines(
                                selectedAirlines.filter((x) => x !== a.name),
                              );
                          }}
                          className="accent-[#2563eb] rounded"
                        />
                        <span className="truncate max-w-[120px]">{a.name}</span>
                      </div>
                      <span className="text-neutral-400 text-[11px]">
                        {a.price}
                      </span>
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
            <div className="bg-[#F5F5F5] backdrop-blur-xl rounded-2xl border border-neutral-200/90 p-2 shadow-sm flex items-center justify-between overflow-x-auto">
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
                <div className="bg-[#F5F5F5] rounded-2xl border border-neutral-200 p-12 text-center">
                  <FaPlane className="text-3xl text-neutral-300 mx-auto mb-3" />
                  <p className="text-base font-bold text-neutral-800">
                    No flights found
                  </p>
                  <p className="text-xs text-neutral-500 mt-1">
                    Try relaxing some of your filter criteria.
                  </p>
                </div>
              ) : (
                filteredFlights.map((flight) => (
                  <div
                    key={flight.id}
                    className={`rounded-2xl border transition-all duration-200 overflow-hidden shadow-sm hover:shadow-lg bg-[#F5F5F5] backdrop-blur-lg hover:border-neutral-300 ${
                      flight.isSponsored
                        ? "border-[#5c0632]/40 ring-1 ring-[#5c0632]/20"
                        : "border-neutral-200"
                    }`}
                  >
                    {/* Sponsored Header Banner (as in Image 1 & 3) */}
                    {flight.isSponsored && (
                      <div className="bg-[#5c0632] text-white px-5 py-2.5 flex items-center justify-between text-xs">
                        <div className="flex items-center gap-3">
                          <span className="font-bold tracking-wider text-sm">
                            QATAR
                          </span>
                          <div>
                            <p className="font-bold leading-tight">
                              {flight.sponsorTitle}
                            </p>
                            <p className="text-white/80 text-[10px]">
                              {flight.sponsorSubtitle}
                            </p>
                          </div>
                        </div>
                        <span className="text-[10px] uppercase font-semibold text-white/70">
                          Sponsored
                        </span>
                      </div>
                    )}

                    {/* Card Content Row */}
                    <div className="p-4 sm:p-5 flex flex-col md:flex-row items-stretch justify-between gap-6">
                      {/* Left: Flight Segments (Outbound + Inbound) */}
                      <div className="flex-1 space-y-4">
                        {/* Outbound Segment */}
                        <div className="flex items-center gap-4 text-xs">
                          {/* Airline Logo & Name */}
                          <div className="w-28 flex-shrink-0 flex items-center gap-2 min-w-0">
                            <div
                              className={`w-7 h-7 rounded-full flex-shrink-0 flex items-center justify-center text-white text-[10px] font-bold ${flight.outbound.logoColor}`}
                            >
                              {flight.outbound.logoText.slice(0, 3)}
                            </div>
                            <div className="min-w-0 overflow-hidden">
                              <p className="font-bold text-neutral-900 leading-tight truncate max-w-[80px]">
                                {flight.outbound.airline}
                              </p>
                              <p className="text-[10px] text-neutral-400 truncate">
                                {flight.outbound.aircraft}
                              </p>
                            </div>
                          </div>

                          {/* Time & Route Graphic */}
                          <div className="flex-1 flex items-center justify-between gap-3 px-2">
                            {/* Depart */}
                            <div className="text-left">
                              <p className="text-sm font-bold text-neutral-900">
                                {flight.outbound.departTime}
                              </p>
                              <p className="text-[11px] text-neutral-500 font-semibold">
                                {flight.outbound.departAirport}
                              </p>
                            </div>

                            {/* Duration & Stop Indicator Graphic */}
                            <div className="flex-1 max-w-[200px] text-center">
                              <span className="text-[10px] text-neutral-400 block mb-0.5">
                                {flight.outbound.duration}
                              </span>
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
                                {flight.outbound.stops === 0
                                  ? "Direct"
                                  : flight.outbound.stopAirport}
                              </span>
                            </div>

                            {/* Arrive */}
                            <div className="text-right">
                              <div className="flex items-center justify-end gap-1">
                                <span className="text-sm font-bold text-neutral-900">
                                  {flight.outbound.arriveTime}
                                </span>
                                {flight.outbound.nextDay && (
                                  <span className="text-[10px] text-red-500 font-bold">
                                    {flight.outbound.nextDay}
                                  </span>
                                )}
                              </div>
                              <p className="text-[11px] text-neutral-500 font-semibold">
                                {flight.outbound.arriveAirport}
                              </p>
                            </div>
                          </div>
                        </div>

                        {/* Inbound Segment (if round-trip exists) */}
                        {flight.inbound && (
                          <div className="flex items-center gap-4 text-xs pt-3 border-t border-neutral-100">
                            {/* Airline Logo & Name */}
                            <div className="w-28 flex-shrink-0 flex items-center gap-2 min-w-0">
                              <div
                                className={`w-7 h-7 rounded-full flex-shrink-0 flex items-center justify-center text-white text-[10px] font-bold ${flight.inbound.logoColor}`}
                              >
                                {flight.inbound.logoText.slice(0, 3)}
                              </div>
                              <div className="min-w-0 overflow-hidden">
                                <p className="font-bold text-neutral-900 leading-tight truncate max-w-[80px]">
                                  {flight.inbound.airline}
                                </p>
                                <p className="text-[10px] text-neutral-400 truncate">
                                  {flight.inbound.aircraft}
                                </p>
                              </div>
                            </div>

                            {/* Time & Route Graphic */}
                            <div className="flex-1 flex items-center justify-between gap-3 px-2">
                              {/* Depart */}
                              <div className="text-left">
                                <p className="text-sm font-bold text-neutral-900">
                                  {flight.inbound.departTime}
                                </p>
                                <p className="text-[11px] text-neutral-500 font-semibold">
                                  {flight.inbound.departAirport}
                                </p>
                              </div>

                              {/* Duration & Stop Indicator Graphic */}
                              <div className="flex-1 max-w-[200px] text-center">
                                <span className="text-[10px] text-neutral-400 block mb-0.5">
                                  {flight.inbound.duration}
                                </span>
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
                                  {flight.inbound.stops === 0
                                    ? "Direct"
                                    : flight.inbound.stopAirport}
                                </span>
                              </div>

                              {/* Arrive */}
                              <div className="text-right">
                                <div className="flex items-center justify-end gap-1">
                                  <span className="text-sm font-bold text-neutral-900">
                                    {flight.inbound.arriveTime}
                                  </span>
                                  {flight.inbound.nextDay && (
                                    <span className="text-[10px] text-red-500 font-bold">
                                      {flight.inbound.nextDay}
                                    </span>
                                  )}
                                  {flight.inbound.hasMoon && (
                                    <FaMoon className="text-[10px] text-neutral-500" />
                                  )}
                                </div>
                                <p className="text-[11px] text-neutral-500 font-semibold">
                                  {flight.inbound.arriveAirport}
                                </p>
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
                          <p className="text-[11px] text-neutral-400">
                            {flight.seller}
                          </p>
                          <p className="text-xl font-bold text-neutral-900">
                            ৳{flight.price.toLocaleString()}
                          </p>
                          <p className="text-[10px] text-neutral-400">
                            Per person
                          </p>
                        </div>

                        <button
                          type="button"
                          className="mt-2 bg-[#2563eb] hover:bg-[#1d4ed8] active:scale-95 text-white font-bold text-xs px-5 py-2.5 rounded-xl transition-all shadow-sm"
                          onClick={() =>
                            router.push(
                              `/flights/payment?id=${flight.id}&origin=${encodeURIComponent(flightOrigin)}&destination=${encodeURIComponent(flightDestination)}&tripType=${flightTripType}&passengers=${totalFlightPassengers}`
                            )
                          }
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
    <Suspense
      fallback={
        <div className="min-h-screen bg-[#FFFFFF] flex items-center justify-center">
          Loading flights...
        </div>
      }
    >
      <FlightPageContent />
    </Suspense>
  );
}

"use client";
import React from "react";
import {
  FaCheck,
  FaShuttleVan,
  FaUtensils,
  FaWifi,
  FaPlug,
  FaPlane,
} from "react-icons/fa";
import { MdLuggage, MdOutlineLuggage } from "react-icons/md";

interface FlightSegment {
  logoColor: string;
  logoText: string;
  airline: string;
  flightNumber: string;
  aircraft: string;
  departTime: string;
  arriveTime: string;
  departAirport: string;
  arriveAirport: string;
  departCity: string;
  arriveCity: string;
  departFull: string;
  arriveFull: string;
  date: string;
  duration: string;
  stops: number;
  cabinClass: string;
  amenities?: string[];
}

interface BookingOption {
  id: string;
  logo: string;
  logoColor: string;
  logoTextColor: string;
  name: string;
  badge?: string;
  pricePerPerson: number;
  priceTotal: number;
}

interface FlightPaymentProps {
  flightId?: string;
  origin?: string;
  destination?: string;
  tripType?: string;
  passengers?: number;
  outbound?: FlightSegment;
  inbound?: FlightSegment;
  bookingOptions?: BookingOption[];
}

// Default flight data
const DEFAULT_OUTBOUND: FlightSegment = {
  logoColor: "bg-[#2563eb]",
  logoText: "BG",
  airline: "US-Bangla Airlines",
  flightNumber: "217",
  aircraft: "Narrow-body jet",
  departTime: "9:30 am",
  arriveTime: "1:10 pm",
  departAirport: "DAC",
  arriveAirport: "BKK",
  departCity: "Dhaka",
  arriveCity: "Bangkok",
  departFull: "Hazrat Shahjalal Intl (DAC)",
  arriveFull: "Suvarnabhumi (BKK)",
  date: "Tue, Nov 24",
  duration: "2h 40m",
  stops: 0,
  cabinClass: "Economy",
  amenities: ["video", "meal", "usb"],
};

const DEFAULT_INBOUND: FlightSegment = {
  logoColor: "bg-[#006a4e]",
  logoText: "Bim",
  airline: "Biman Bangladesh Airlines",
  flightNumber: "389",
  aircraft: "Narrow-body jet",
  departTime: "4:15 pm",
  arriveTime: "6:00 pm",
  departAirport: "BKK",
  arriveAirport: "DAC",
  departCity: "Bangkok",
  arriveCity: "Dhaka",
  departFull: "Suvarnabhumi (BKK)",
  arriveFull: "Hazrat Shahjalal Intl (DAC)",
  date: "Tue, Nov 24",
  duration: "2h 45m",
  stops: 0,
  cabinClass: "Economy",
  amenities: ["video", "meal", "wifi"],
};

const DEFAULT_BOOKING_OPTIONS: BookingOption[] = [
  {
    id: "booking",
    logo: "B.",
    logoColor: "bg-blue-600",
    logoTextColor: "text-white",
    name: "Booking.com",
    badge: "Lowest price",
    pricePerPerson: 50075,
    priceTotal: 100149,
  },
  {
    id: "gotogate",
    logo: "GTG",
    logoColor: "bg-transparent",
    logoTextColor: "text-[#00a651]",
    name: "Gotogate",
    pricePerPerson: 51909,
    priceTotal: 103818,
  },
  {
    id: "mytrip",
    logo: "mytrip",
    logoColor: "bg-transparent",
    logoTextColor: "text-[#ff6600]",
    name: "Mytrip",
    pricePerPerson: 52949,
    priceTotal: 105897,
  },
];

function FlightSegmentCard({
  segment,
  direction,
}: {
  segment: FlightSegment;
  direction: "outbound" | "inbound";
}) {
  return (
    <div className="border border-neutral-200 rounded-xl p-4 space-y-3 bg-white">
      {/* Header: Route + Date */}
      <div className="flex items-center justify-between flex-wrap gap-2">
        <div className="flex items-center gap-2 text-sm font-bold text-neutral-900">
          <span>{segment.departAirport}</span>
          <FaPlane className="text-blue-500 text-xs" />
          <span>{segment.arriveAirport}</span>
        </div>
        <span className="text-xs font-semibold text-neutral-600">{segment.date}</span>
      </div>

      {/* Nonstop row */}
      <div className="flex items-center gap-2 text-xs text-neutral-500">
        <span className="font-medium">
          {segment.stops === 0 ? "Nonstop" : `${segment.stops} stop`}
        </span>
        <span className="text-neutral-300">•</span>
        <span>{segment.duration}</span>
      </div>

      {/* Times row */}
      <div className="text-sm font-bold text-neutral-900">
        {segment.departTime} – {segment.arriveTime} ({segment.duration})
      </div>

      {/* Airports full names */}
      <div className="text-xs text-neutral-500 leading-relaxed">
        {segment.departFull} – {segment.arriveFull}
      </div>

      {/* Airline, flight number, class */}
      <div className="text-xs text-neutral-600 space-y-0.5">
        <p>
          {segment.airline} {segment.flightNumber}
        </p>
        <p>{segment.cabinClass}</p>
        <p>{segment.aircraft}</p>
      </div>

      {/* Airline logo pill */}
      <div className="flex items-center gap-2">
        <div
          className={`w-7 h-7 rounded-full flex items-center justify-center text-white text-[10px] font-bold ${segment.logoColor}`}
        >
          {segment.logoText}
        </div>
        {/* Amenity icons */}
        <div className="flex items-center gap-1.5 ml-1 text-neutral-500">
          {segment.amenities?.includes("video") && (
            <span title="In-flight entertainment" className="text-xs">▶</span>
          )}
          {segment.amenities?.includes("meal") && (
            <FaUtensils title="Meal" className="text-[10px]" />
          )}
          {segment.amenities?.includes("wifi") && (
            <FaWifi title="Wi-Fi" className="text-[10px]" />
          )}
          {segment.amenities?.includes("usb") && (
            <FaPlug title="USB / Power" className="text-[10px]" />
          )}
        </div>
      </div>
    </div>
  );
}

export default function FlightPayment({
  origin = "Dhaka",
  destination = "Bangkok",
  tripType = "Round-trip",
  passengers = 2,
  outbound = DEFAULT_OUTBOUND,
  inbound = DEFAULT_INBOUND,
  bookingOptions = DEFAULT_BOOKING_OPTIONS,
}: FlightPaymentProps) {
  return (
    <div className="min-h-screen bg-white pt-24 pb-20">
      <div className="container-page">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start max-w-6xl mx-auto">
          {/* ===================== LEFT: Fare Review + Book ===================== */}
          <div className="lg:col-span-8 space-y-8">
            {/* ---- Step 1: Review fare ---- */}
            <section>
              <h2 className="text-lg sm:text-xl font-bold text-neutral-900 mb-1">
                Step 1: Review what&apos;s included in your fare
              </h2>
              <p className="text-xs text-neutral-500 mb-5 leading-relaxed">
                <span className="text-blue-600 underline cursor-pointer">
                  See baggage size and weight limit.
                </span>{" "}
                Total prices may include estimated baggage fees and flexibility. Some options may
                require added baggage or flexibility when checking out. Check terms and conditions
                on the booking site.
              </p>

              <div className="bg-[#F5F5F5] rounded-2xl p-5 space-y-4">
                {/* Cabin header */}
                <div>
                  <p className="text-sm font-bold text-neutral-900">Economy Cabin</p>
                  <p className="text-sm text-neutral-600 mt-0.5">
                    ৳{bookingOptions[0]?.pricePerPerson?.toLocaleString() ?? "50,075"}
                  </p>
                </div>

                {/* Included items */}
                <div className="space-y-2.5">
                  <div className="flex items-center gap-2.5 text-sm text-neutral-700">
                    <FaCheck className="text-emerald-500 text-xs shrink-0" />
                    <span>1 carry-on bag</span>
                  </div>
                  <div className="flex items-center gap-2.5 text-sm text-neutral-700">
                    <FaCheck className="text-emerald-500 text-xs shrink-0" />
                    <span>1 checked bag</span>
                  </div>
                </div>

                <p className="text-[11px] text-neutral-400 pt-1 border-t border-neutral-200">
                  Fare and baggage fees apply to the entire trip.
                </p>
              </div>
            </section>

            {/* ---- Step 2: Choose where to book ---- */}
            <section>
              <h2 className="text-lg sm:text-xl font-bold text-neutral-900 mb-1">
                Step 2: Choose where to book
              </h2>
              <p className="text-xs text-neutral-500 mb-5">
                Booking.com compares hundreds of travel sites at once to show prices available for
                your trip.
              </p>

              <div className="bg-[#F5F5F5] rounded-2xl divide-y divide-neutral-200/80 overflow-hidden">
                {bookingOptions.map((option) => (
                  <div
                    key={option.id}
                    className="flex items-center justify-between gap-4 px-5 py-4 hover:bg-neutral-100/70 transition-colors"
                  >
                    {/* Provider Info */}
                    <div className="flex items-center gap-3 min-w-0">
                      <div
                        className={`w-9 h-9 rounded-lg flex items-center justify-center text-xs font-black border border-neutral-200 ${option.logoColor} ${option.logoTextColor} shrink-0`}
                      >
                        {option.logo}
                      </div>
                      <div className="min-w-0">
                        <div className="flex items-center gap-2 flex-wrap">
                          <span className="text-sm font-bold text-neutral-900">
                            {option.name}
                          </span>
                          {option.badge && (
                            <span className="text-[10px] font-semibold px-2 py-0.5 rounded border border-neutral-300 text-neutral-600 bg-white">
                              {option.badge}
                            </span>
                          )}
                        </div>
                      </div>
                    </div>

                    {/* Price */}
                    <div className="text-right shrink-0">
                      <div className="flex items-center gap-1 justify-end text-sm font-bold text-neutral-900">
                        <span className="text-[11px] text-neutral-400 font-normal">৳</span>
                        <span>{option.pricePerPerson.toLocaleString()}</span>
                        <span className="text-[11px] text-neutral-400 font-normal">/ person</span>
                      </div>
                      <p className="text-[11px] text-neutral-500">
                        ৳{option.priceTotal.toLocaleString()} total
                      </p>
                    </div>

                    {/* Book Button — disabled (will be wired later) */}
                    <button
                      type="button"
                      disabled
                      className="shrink-0 bg-[#2563eb] text-white font-bold text-sm px-6 py-2.5 rounded-xl opacity-80 cursor-not-allowed select-none"
                    >
                      Book
                    </button>
                  </div>
                ))}
              </div>
            </section>
          </div>

          {/* ===================== RIGHT: Flight Summary Card ===================== */}
          <aside className="lg:col-span-4 space-y-4 sticky top-24">
            <div className="bg-[#F5F5F5] rounded-2xl p-5 space-y-5">
              {/* Summary header */}
              <div>
                <h3 className="text-base font-bold text-neutral-900">
                  {origin} to {destination}
                </h3>
                <p className="text-xs text-neutral-500 mt-0.5">
                  {tripType}, {passengers} Traveler{passengers > 1 ? "s" : ""}
                </p>
              </div>

              {/* Outbound segment */}
              <FlightSegmentCard segment={outbound} direction="outbound" />

              {/* Inbound segment (round-trip only) */}
              {inbound && tripType !== "One-way" && (
                <FlightSegmentCard segment={inbound} direction="inbound" />
              )}
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}

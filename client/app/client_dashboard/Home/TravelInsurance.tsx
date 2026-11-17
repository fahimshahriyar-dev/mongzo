"use client";
import React, { useState, useEffect, useRef } from "react";
import {
  FaChevronDown,
  FaChevronUp,
  FaStar,
  FaStarHalfAlt,
  FaInfoCircle,
} from "react-icons/fa";

interface Review {
  date: string;
  name: string;
  stars: number;
  text: string;
}

const REVIEWS: Review[] = [
  {
    date: "04.10.26",
    name: "Yury I.",
    stars: 5,
    text: "I was in Pattaya and had a leg injury. I called the insurance company and within 20 minutes was on my way to the hospital. They were waiting for me and treated me swiftly.",
  },
  {
    date: "15.02.26",
    name: "Natalia P.",
    stars: 5,
    text: "Thank you very much to the company who were involved in organizing medical assistance for me during my trip. Everything was arranged quickly and professionally.",
  },
  {
    date: "12.10.26",
    name: "Andrei S.",
    stars: 4,
    text: "We were on vacation in Phuket and decided to travel around the island on a motorbike. We were looking for insurance companies online and found this one. Very satisfied!",
  },
  {
    date: "08.07.26",
    name: "Maria K.",
    stars: 5,
    text: "Had a sudden illness abroad and the insurance covered everything — hospital, medicines, and even the return flight. Highly recommend for anyone traveling to Schengen countries.",
  },
  {
    date: "21.09.26",
    name: "Alex T.",
    stars: 5,
    text: "Bought the Standard plan for a 2-week trip to Europe. Flight was delayed 6 hours and I got reimbursed without any hassle. The process was seamless.",
  },
];

interface CoverageRow {
  id: string;
  title: string;
  hasInfo?: boolean;
  details: string[];
  econom: string;
  standard: string;
  million: string;
  type?: "currency" | "boolean" | "deductible" | "checkbox";
}

const COVERAGE_DATA: CoverageRow[] = [
  {
    id: "medical",
    title: "Medical expenses",
    hasInfo: true,
    details: [
      "Expenses for hospital stay and treatment, payment for medicines and basic fixation devices",
      "Expenses for outpatient visits",
      "Expenses for managing allergy flare-ups, except for sun allergies",
      "Expenses for treating the effects of bites from dogs, monkeys, and other animals",
      "Expenses for transportation to a hospital by an ambulance or taxi",
      "Expenses for evacuation to your permanent residence if surgery is required due to a sudden illness or injury",
      "Repatriation of Remains",
    ],
    econom: "$35 000",
    standard: "$250 000",
    million: "$1 000 000",
    type: "currency",
  },
  {
    id: "dental",
    title: "Emergency dental care",
    details: [
      "Coverage includes pain relief treatments for natural teeth in cases of damage or inflammation, including fillings",
    ],
    econom: "$200",
    standard: "$250",
    million: "$450",
    type: "currency",
  },
  {
    id: "pre_existing",
    title: "Pre-existing conditions",
    details: [
      "Emergency assistance for exacerbations of chronic diseases aimed at life-saving measures or alleviating acute conditions",
    ],
    econom: "$3 000",
    standard: "$3 000",
    million: "$3 000",
    type: "currency",
  },
  {
    id: "covid_dengue",
    title: "COVID-19, Dengue, and other viruses",
    details: [
      "Emergency assistance for coronavirus, including expenses for the insured's quarantine",
      "Emergency care for Dengue, Coxsackie, Zika, malaria, monkeypox, and other viruses",
      "Particularly dangerous infections and viruses from the WHO list, such as Ebola, Marburg fever, Lassa fever, typhoid, cholera, plague, and similar diseases, are not covered",
    ],
    econom: "$35 000",
    standard: "$100 000",
    million: "$100 000",
    type: "currency",
  },
  {
    id: "third_party",
    title: "Third party travel cost",
    details: [
      "Payment for a round air ticket of an economy class for a relative or close one to visit the patient and care for him/her",
    ],
    econom: "",
    standard: "$1 000",
    million: "$1 500",
    type: "currency",
  },
  {
    id: "early_return",
    title: "Early return",
    details: [
      "Expenses for an air ticket to return from abroad in case of death or emergency hospitalization of a close relative, as well as in case of significant damage or destruction of property of the insured in the country (region) of principal residence",
    ],
    econom: "",
    standard: "$750",
    million: "$1 500",
    type: "currency",
  },
  {
    id: "flight_delay",
    title: "Flight delay",
    details: [
      "Refund in case of regular flight delays of more than 4 hours. Expenses are covered for food, drinks and hotel.",
    ],
    econom: "",
    standard: "$500",
    million: "$500",
    type: "currency",
  },
  {
    id: "motorbike",
    title: "Motorbike Accidents",
    details: [
      "Injuries sustained in an accident (collision or fall) while riding a motorbike or driving another vehicle (car, motorcycle), as long as the driver is sober, has a valid license, and wears a helmet (for motorbikes)",
      "Vehicle damage and liability are not covered by the policy",
    ],
    econom: "yes",
    standard: "yes",
    million: "yes",
    type: "boolean",
  },
  {
    id: "telemedicine",
    title: "Telemedicine",
    details: [
      "Instant access to an online doctor through chat or video call in our app with no limits on the number of consultations",
    ],
    econom: "yes",
    standard: "yes",
    million: "yes",
    type: "boolean",
  },
  {
    id: "deductible",
    title: "Deductible",
    details: [
      "Deductible - the amount the insured pays out-of-pocket for each incident. For example, if the clinic bill is 500 USD, we will pay 450 USD, and you will pay 50 USD",
      "Deductible can be removed (reduced to 0), but the policy cost will increase",
      "Term based deductible: for the country where the insured person is located at the time of purchase, the policy will take effect on the 6th day",
    ],
    econom: "$50",
    standard: "$50",
    million: "no",
    type: "deductible",
  },
  {
    id: "personal_liability",
    title: "Personal liability",
    details: [
      "Coverage of damage to a third-party property or health of other people, except for the damage arising as a result of driving auto, moto, water, air transport. For example, it can be damage caused to a third party at a ski slope",
    ],
    econom: "$20 000",
    standard: "$20 000",
    million: "$50 000",
    type: "checkbox",
  },
  {
    id: "luggage_loss",
    title: "Loss or damage of luggage",
    details: [
      "Disappearance, loss or damage of the luggage registered with the insured, during its transportation by the air company or other carrier",
    ],
    econom: "$500",
    standard: "$500",
    million: "$750",
    type: "checkbox",
  },
  {
    id: "active_leisure",
    title: "Active leisure",
    details: [
      "Water skiing, surfing, windsurfing, jet-skiing, rafting, yachting, kiting, recreational diving to the depth under 12 meters and accompanied by instructor, (competitive) fishing, hunting, alpine skiing, snowboarding, snowmobile rides, ice hockey games, mountain biking, trips on horseback",
    ],
    econom: "add",
    standard: "add",
    million: "add",
    type: "checkbox",
  },
];

export const TravelInsurance = () => {
  const [expandedRows, setExpandedRows] = useState<Record<string, boolean>>({});
  const [deductibleEconom, setDeductibleEconom] = useState("$50");
  const [deductibleStandard, setDeductibleStandard] = useState("$50");
  const [deductibleMillion, setDeductibleMillion] = useState("no");
  const [openDeductible, setOpenDeductible] = useState<"econom" | "standard" | "million" | null>(null);
  const [addons, setAddons] = useState<Record<string, boolean>>({});
  const [reviewIndex, setReviewIndex] = useState(0);
  const [reviewFading, setReviewFading] = useState(false);

  const DEDUCTIBLE_OPTIONS = ["$50", "No"];

  // Auto-slide reviews every 3.5 seconds with fade transition
  useEffect(() => {
    const timer = setInterval(() => {
      setReviewFading(true);
      setTimeout(() => {
        setReviewIndex((prev) => (prev + 1) % REVIEWS.length);
        setReviewFading(false);
      }, 300);
    }, 3500);
    return () => clearInterval(timer);
  }, []);

  const toggleRow = (id: string) => {
    setExpandedRows((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const toggleAddon = (key: string) => {
    setAddons((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const handleSelectPlan = (plan: "econom" | "standard" | "million") => {
    // Route can be plugged in here in the future:
    // router.push(`/booking/insurance/checkout?plan=${plan}`);
  };

  return (
    <div className="w-full mt-4 bg-white rounded-3xl border border-neutral-200/90 shadow-sm p-4 sm:p-6 lg:p-8">
      <div className="overflow-x-auto">
        <div className="min-w-[900px]">
          {/* Table with separated columns creating independent column cards with white gutters */}
          <table className="w-full border-separate [border-spacing:14px_0] table-fixed">
            <colgroup>
              <col className="w-[28%]" />
              <col className="w-[24%]" />
              <col className="w-[24%]" />
              <col className="w-[24%]" />
            </colgroup>

            <thead>
              <tr>
                {/* Reviews Header Box — Auto-sliding carousel */}
                <th className="pb-0 text-left font-normal align-top">
                  <div className="bg-[#fafafa] rounded-2xl p-4 border border-neutral-200/70 flex flex-col h-[220px]">
                    {/* Header: Rating */}
                    <div className="flex items-center justify-between mb-1.5">
                      <span className="text-xs font-bold text-neutral-800">Reviews</span>
                      <button type="button" className="text-xs font-semibold text-[#0284c7] hover:underline">
                        all &gt;
                      </button>
                    </div>
                    <div className="flex items-center gap-1.5 mb-3">
                      <span className="text-xs font-bold text-neutral-800">4,7</span>
                      <div className="flex text-amber-400 text-xs gap-0.5">
                        <FaStar /><FaStar /><FaStar /><FaStar /><FaStarHalfAlt />
                      </div>
                    </div>

                    {/* Sliding review card */}
                    <div className="border-t border-neutral-200/80 pt-3 flex-1 overflow-hidden">
                      <div
                        className="transition-all duration-300 ease-in-out"
                        style={{ opacity: reviewFading ? 0 : 1, transform: reviewFading ? "translateY(6px)" : "translateY(0)" }}
                      >
                        {/* Date + Name */}
                        <div className="flex items-center justify-between text-[10px] text-neutral-400 mb-1">
                          <span>{REVIEWS[reviewIndex].date}</span>
                          <span className="font-semibold text-neutral-700">{REVIEWS[reviewIndex].name}</span>
                        </div>
                        {/* Stars */}
                        <div className="flex text-amber-400 text-[10px] gap-0.5 mb-2">
                          {Array.from({ length: REVIEWS[reviewIndex].stars }).map((_, i) => (
                            <FaStar key={i} />
                          ))}
                        </div>
                        {/* Review text */}
                        <p className="text-[11px] text-neutral-600 leading-relaxed line-clamp-3">
                          {REVIEWS[reviewIndex].text}
                        </p>
                      </div>
                    </div>

                    {/* Dot indicators */}
                    <div className="flex items-center justify-center gap-1.5 mt-2">
                      {REVIEWS.map((_, i) => (
                        <button
                          key={i}
                          type="button"
                          onClick={() => { setReviewFading(true); setTimeout(() => { setReviewIndex(i); setReviewFading(false); }, 300); }}
                          className={`rounded-full transition-all duration-300 ${
                            i === reviewIndex
                              ? "w-4 h-1.5 bg-[#0284c7]"
                              : "w-1.5 h-1.5 bg-neutral-300 hover:bg-neutral-400"
                          }`}
                        />
                      ))}
                    </div>
                  </div>
                </th>

                {/* Plan 1 Header: Econom (Sky Blue Shade) — border+bg on th itself, no inner div wrapper */}
                <th className="pb-5 font-normal align-top rounded-t-2xl border border-b-0 bg-[#f0f9ff] border-[#bae6fd] px-5 pt-6 text-center">
                  <h3 className="text-base sm:text-lg font-bold text-neutral-900 mb-1">
                    Econom
                  </h3>
                  {/* Price with discount: cutted price on top, discounted price below */}
                  <div className="flex flex-col items-center justify-center">
                    <span className="text-xs text-[#7dd3fc] line-through font-semibold leading-tight">
                      $62
                    </span>
                    <span className="text-2xl font-extrabold text-[#0284c7] leading-none mt-1">
                      $60
                    </span>
                  </div>
                  <button
                    type="button"
                    onClick={() => handleSelectPlan("econom")}
                    className="w-full py-2.5 px-4 rounded-xl font-bold text-xs uppercase tracking-wider bg-[#0284c7] hover:bg-[#0369a1] text-white transition-all active:scale-95 shadow-md shadow-sky-500/20 my-4"
                  >
                    SELECT
                  </button>
                  {/* Text after select button */}
                  <p className="text-xs text-neutral-500 leading-snug text-center">
                    Minimum insurance complying with visa requirements
                  </p>
                </th>

                {/* Plan 2 Header: Standard (Royal Blue Shade) */}
                <th className="pb-5 font-normal align-top rounded-t-2xl border border-b-0 bg-[#eff6ff] border-[#bfdbfe] px-5 pt-6 text-center">
                  <h3 className="text-base sm:text-lg font-bold text-neutral-900 mb-1">
                    Standard
                  </h3>
                  {/* Price with discount */}
                  <div className="flex flex-col items-center justify-center">
                    <span className="text-xs text-[#93c5fd] line-through font-semibold leading-tight">
                      $116
                    </span>
                    <span className="text-2xl font-extrabold text-[#2563eb] leading-none mt-1">
                      $113
                    </span>
                  </div>
                  <button
                    type="button"
                    onClick={() => handleSelectPlan("standard")}
                    className="w-full py-2.5 px-4 rounded-xl font-bold text-xs uppercase tracking-wider bg-[#2563eb] hover:bg-[#1d4ed8] text-white transition-all active:scale-95 shadow-md shadow-blue-500/20 my-4"
                  >
                    SELECT
                  </button>
                  {/* Text after select button */}
                  <p className="text-xs text-neutral-500 leading-snug text-center">
                    + extended limit
                    <br />+ advanced coverage
                  </p>
                </th>

                {/* Plan 3 Header: Million (Indigo / Deep Blue Shade) */}
                <th className="pb-5 font-normal align-top rounded-t-2xl border border-b-0 bg-[#eef2ff] border-[#c7d2fe] px-5 pt-6 text-center">
                  <h3 className="text-base sm:text-lg font-bold text-neutral-900 mb-1">
                    Million
                  </h3>
                  {/* Price with discount */}
                  <div className="flex flex-col items-center justify-center">
                    <span className="text-xs text-[#a5b4fc] line-through font-semibold leading-tight">
                      $167
                    </span>
                    <span className="text-2xl font-extrabold text-[#4338ca] leading-none mt-1">
                      $162
                    </span>
                  </div>
                  <button
                    type="button"
                    onClick={() => handleSelectPlan("million")}
                    className="w-full py-2.5 px-4 rounded-xl font-bold text-xs uppercase tracking-wider bg-[#4338ca] hover:bg-[#3730a3] text-white transition-all active:scale-95 shadow-md shadow-indigo-500/20 my-4"
                  >
                    SELECT
                  </button>
                  {/* Text after select button — each line separate */}
                  <p className="text-xs text-neutral-500 leading-snug text-center">
                    + maximum limit
                    <br />+ civilLiability
                    <br />+ luggage
                  </p>
                </th>
              </tr>
            </thead>

            {/* Table Body: Perfectly Synchronized Rows */}
            <tbody>
              {COVERAGE_DATA.map((row, idx) => {
                const isExpanded = !!expandedRows[row.id];

                return (
                  <tr key={row.id} className="group">
                    {/* Left Column: Title & Expandable Details */}
                    <td className="relative py-5 align-top">
                      <button
                        type="button"
                        onClick={() => toggleRow(row.id)}
                        className="w-full flex items-center justify-between text-left group"
                      >
                        <div className="flex items-center gap-2.5">
                          <span className="text-neutral-500 text-xs transition-transform duration-200">
                            {isExpanded ? (
                              <FaChevronUp className="text-[11px] text-neutral-800" />
                            ) : (
                              <FaChevronDown className="text-[11px] text-neutral-500 group-hover:text-neutral-900" />
                            )}
                          </span>
                          <span className="text-[13px] sm:text-sm font-semibold text-neutral-900 group-hover:text-[#2563eb] transition-colors leading-tight">
                            {row.title}
                          </span>
                          {row.hasInfo && (
                            <FaInfoCircle className="text-neutral-400 text-xs flex-shrink-0" />
                          )}
                        </div>
                      </button>

                      {/* Smooth Slide Animation Container */}
                      <div
                        className={`grid transition-all duration-300 ease-in-out ${
                          isExpanded
                            ? "grid-rows-[1fr] opacity-100 mt-3"
                            : "grid-rows-[0fr] opacity-0"
                        }`}
                      >
                        <div className="overflow-hidden pl-5 space-y-2">
                          {row.details.map((bullet, bi) => (
                            <div
                              key={bi}
                              className="flex items-start gap-2 text-xs text-neutral-500 leading-relaxed"
                            >
                              <span className="text-neutral-400 select-none mt-0.5">
                                •
                              </span>
                              <span>{bullet}</span>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Bottom Border aligned with row baseline */}
                      <div className="absolute bottom-0 left-0 right-0 border-b border-neutral-200/80" />
                    </td>

                    {/* Column 2: Econom Value */}
                    <td className="relative px-5 py-5 border-l border-r border-[#bae6fd] text-center align-top bg-[#f0f9ff]">
                      <div className="flex items-center justify-center pt-0.5 min-h-[24px]">
                        {row.type === "deductible" ? (
                          <div className="relative">
                            <button
                              type="button"
                              onClick={() => setOpenDeductible(openDeductible === "econom" ? null : "econom")}
                              className="inline-flex items-center gap-1.5 px-3 py-1 bg-white border border-neutral-200 rounded-lg text-xs font-bold text-neutral-800 shadow-sm hover:border-neutral-300"
                            >
                              <span>{deductibleEconom}</span>
                              <FaChevronDown className={`text-[9px] text-neutral-400 transition-transform duration-200 ${openDeductible === "econom" ? "rotate-180" : ""}`} />
                            </button>
                            {openDeductible === "econom" && (
                              <div className="absolute top-full left-1/2 -translate-x-1/2 mt-1 bg-white border border-neutral-200 rounded-lg shadow-lg z-20 min-w-[72px] overflow-hidden">
                                {DEDUCTIBLE_OPTIONS.map((opt) => (
                                  <button
                                    key={opt}
                                    type="button"
                                    onClick={() => { setDeductibleEconom(opt); setOpenDeductible(null); }}
                                    className={`w-full px-4 py-2 text-xs font-semibold text-left hover:bg-neutral-50 transition-colors ${deductibleEconom === opt ? "text-[#0284c7]" : "text-neutral-700"}`}
                                  >
                                    {opt}
                                  </button>
                                ))}
                              </div>
                            )}
                          </div>
                        ) : row.type === "checkbox" ? (
                          <label className="flex items-center gap-2 cursor-pointer select-none text-[13px] sm:text-sm font-bold text-neutral-800">
                            <input
                              type="checkbox"
                              checked={!!addons[`econom_${row.id}`]}
                              onChange={() => toggleAddon(`econom_${row.id}`)}
                              className="w-4 h-4 rounded border-neutral-300 text-[#0284c7] focus:ring-[#0284c7]"
                            />
                            <span>{row.econom}</span>
                          </label>
                        ) : (
                          <span className="text-[13px] sm:text-sm font-bold text-neutral-800">
                            {row.econom}
                          </span>
                        )}
                      </div>

                      {/* Inset Bottom Border */}
                      <div className="absolute bottom-0 left-5 right-5 border-b border-neutral-200/70" />
                    </td>

                    {/* Column 3: Standard Value */}
                    <td className="relative px-5 py-5 border-l border-r border-[#bfdbfe] text-center align-top bg-[#eff6ff]">
                      <div className="flex items-center justify-center pt-0.5 min-h-[24px]">
                        {row.type === "deductible" ? (
                          <div className="relative">
                            <button
                              type="button"
                              onClick={() => setOpenDeductible(openDeductible === "standard" ? null : "standard")}
                              className="inline-flex items-center gap-1.5 px-3 py-1 bg-white border border-neutral-200 rounded-lg text-xs font-bold text-neutral-800 shadow-sm hover:border-neutral-300"
                            >
                              <span>{deductibleStandard}</span>
                              <FaChevronDown className={`text-[9px] text-neutral-400 transition-transform duration-200 ${openDeductible === "standard" ? "rotate-180" : ""}`} />
                            </button>
                            {openDeductible === "standard" && (
                              <div className="absolute top-full left-1/2 -translate-x-1/2 mt-1 bg-white border border-neutral-200 rounded-lg shadow-lg z-20 min-w-[72px] overflow-hidden">
                                {DEDUCTIBLE_OPTIONS.map((opt) => (
                                  <button
                                    key={opt}
                                    type="button"
                                    onClick={() => { setDeductibleStandard(opt); setOpenDeductible(null); }}
                                    className={`w-full px-4 py-2 text-xs font-semibold text-left hover:bg-neutral-50 transition-colors ${deductibleStandard === opt ? "text-[#2563eb]" : "text-neutral-700"}`}
                                  >
                                    {opt}
                                  </button>
                                ))}
                              </div>
                            )}
                          </div>
                        ) : row.type === "checkbox" ? (
                          <label className="flex items-center gap-2 cursor-pointer select-none text-[13px] sm:text-sm font-bold text-neutral-800">
                            <input
                              type="checkbox"
                              checked={!!addons[`standard_${row.id}`]}
                              onChange={() => toggleAddon(`standard_${row.id}`)}
                              className="w-4 h-4 rounded border-neutral-300 text-[#2563eb] focus:ring-[#2563eb]"
                            />
                            <span>{row.standard}</span>
                          </label>
                        ) : (
                          <span className="text-[13px] sm:text-sm font-bold text-neutral-800">
                            {row.standard}
                          </span>
                        )}
                      </div>

                      {/* Inset Bottom Border */}
                      <div className="absolute bottom-0 left-5 right-5 border-b border-neutral-200/70" />
                    </td>

                    {/* Column 4: Million Value */}
                    <td className="relative px-5 py-5 border-l border-r border-[#c7d2fe] text-center align-top bg-[#eef2ff]">
                      <div className="flex items-center justify-center pt-0.5 min-h-[24px]">
                        {row.type === "deductible" ? (
                          <div className="relative">
                            <button
                              type="button"
                              onClick={() => setOpenDeductible(openDeductible === "million" ? null : "million")}
                              className="inline-flex items-center gap-1.5 px-3 py-1 bg-white border border-neutral-200 rounded-lg text-xs font-bold text-neutral-800 shadow-sm hover:border-neutral-300"
                            >
                              <span>{deductibleMillion}</span>
                              <FaChevronDown className={`text-[9px] text-neutral-400 transition-transform duration-200 ${openDeductible === "million" ? "rotate-180" : ""}`} />
                            </button>
                            {openDeductible === "million" && (
                              <div className="absolute top-full left-1/2 -translate-x-1/2 mt-1 bg-white border border-neutral-200 rounded-lg shadow-lg z-20 min-w-[72px] overflow-hidden">
                                {DEDUCTIBLE_OPTIONS.map((opt) => (
                                  <button
                                    key={opt}
                                    type="button"
                                    onClick={() => { setDeductibleMillion(opt); setOpenDeductible(null); }}
                                    className={`w-full px-4 py-2 text-xs font-semibold text-left hover:bg-neutral-50 transition-colors ${deductibleMillion === opt ? "text-[#4338ca]" : "text-neutral-700"}`}
                                  >
                                    {opt}
                                  </button>
                                ))}
                              </div>
                            )}
                          </div>
                        ) : row.type === "checkbox" ? (
                          <label className="flex items-center gap-2 cursor-pointer select-none text-[13px] sm:text-sm font-bold text-neutral-800">
                            <input
                              type="checkbox"
                              checked={!!addons[`million_${row.id}`]}
                              onChange={() => toggleAddon(`million_${row.id}`)}
                              className="w-4 h-4 rounded border-neutral-300 text-[#4338ca] focus:ring-[#4338ca]"
                            />
                            <span>{row.million}</span>
                          </label>
                        ) : (
                          <span className="text-[13px] sm:text-sm font-bold text-neutral-800">
                            {row.million}
                          </span>
                        )}
                      </div>

                      {/* Inset Bottom Border */}
                      <div className="absolute bottom-0 left-5 right-5 border-b border-neutral-200/70" />
                    </td>
                  </tr>
                );
              })}

              {/* Bottom Sticky Card Price & CTA Footer Row */}
              <tr>
                <td className="pt-6 pb-2" />
                {/* Econom Footer */}
                <td className="px-4 pt-6 pb-5 rounded-b-2xl text-center border border-t-0 bg-[#f0f9ff] border-[#bae6fd]">
                  <div className="text-2xl font-extrabold text-[#0284c7] mb-3">
                    $60
                  </div>
                  <button
                    type="button"
                    onClick={() => handleSelectPlan("econom")}
                    className="w-full py-2.5 px-4 rounded-xl font-bold text-xs uppercase tracking-wider bg-[#0284c7] hover:bg-[#0369a1] text-white transition-all active:scale-95 shadow-md shadow-sky-500/20"
                  >
                    SELECT
                  </button>
                </td>

                {/* Standard Footer */}
                <td className="px-4 pt-6 pb-5 rounded-b-2xl text-center border border-t-0 bg-[#eff6ff] border-[#bfdbfe]">
                  <div className="text-2xl font-extrabold text-[#2563eb] mb-3">
                    $113
                  </div>
                  <button
                    type="button"
                    onClick={() => handleSelectPlan("standard")}
                    className="w-full py-2.5 px-4 rounded-xl font-bold text-xs uppercase tracking-wider bg-[#2563eb] hover:bg-[#1d4ed8] text-white transition-all active:scale-95 shadow-md shadow-blue-500/20"
                  >
                    SELECT
                  </button>
                </td>

                {/* Million Footer */}
                <td className="px-4 pt-6 pb-5 rounded-b-2xl text-center border border-t-0 bg-[#eef2ff] border-[#c7d2fe]">
                  <div className="text-2xl font-extrabold text-[#4338ca] mb-3">
                    $162
                  </div>
                  <button
                    type="button"
                    onClick={() => handleSelectPlan("million")}
                    className="w-full py-2.5 px-4 rounded-xl font-bold text-xs uppercase tracking-wider bg-[#4338ca] hover:bg-[#3730a3] text-white transition-all active:scale-95 shadow-md shadow-indigo-500/20"
                  >
                    SELECT
                  </button>
                </td>
              </tr>
            </tbody>
          </table>

          {/* Visa compliance note — full width, right-aligned to match right box border */}
          <div className="mt-4 w-full flex justify-end pr-[14px]">
            <p className="text-[11px] text-neutral-400 text-right whitespace-nowrap">
              All insurance programs comply with the visa requirements of the Schengen countries, Great Britain, Canada, Australia etc.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
export default TravelInsurance;

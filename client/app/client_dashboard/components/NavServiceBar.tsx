"use client";

import React, { useRef, useState, useEffect } from "react";
import { useRouter, usePathname, useSearchParams } from "next/navigation";
import { FaPlane, FaHotel, FaCar, FaSimCard, FaShieldAlt } from "react-icons/fa";

export type BookingServiceType = "hotels" | "flights" | "cars" | "esim" | "insurance";

interface NavServiceBarProps {
  active?: BookingServiceType;
  className?: string;
}

const TABS: { id: BookingServiceType; label: string; icon: any }[] = [
  { id: "hotels", label: "Hotels", icon: FaHotel },
  { id: "flights", label: "Flights", icon: FaPlane },
  { id: "cars", label: "Cars", icon: FaCar },
  { id: "esim", label: "E-Sim", icon: FaSimCard },
  { id: "insurance", label: "Travel Insurance", icon: FaShieldAlt },
];

export default function NavServiceBar({ active, className = "" }: NavServiceBarProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  // Determine current active tab automatically if not passed directly
  const computedActive = (): BookingServiceType => {
    if (active) return active;
    if (pathname.startsWith("/hotel")) return "hotels";
    if (pathname.startsWith("/flight")) return "flights";
    if (pathname.startsWith("/car")) return "cars";
    if (pathname.startsWith("/esim")) return "esim";
    if (pathname.toLowerCase().includes("insurance")) return "insurance";
    const tabParam = searchParams?.get("tab");
    if (tabParam && ["hotels", "flights", "cars", "esim", "insurance"].includes(tabParam)) {
      return tabParam as BookingServiceType;
    }
    return "hotels";
  };

  const currentTab = computedActive();
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const sliderRef = useRef<HTMLDivElement | null>(null);
  const [sliderReady, setSliderReady] = useState(false);

  useEffect(() => {
    const idx = TABS.findIndex((t) => t.id === currentTab);
    const btn = tabRefs.current[idx];
    if (btn && sliderRef.current) {
      sliderRef.current.style.left = `${btn.offsetLeft}px`;
      sliderRef.current.style.width = `${btn.offsetWidth}px`;
      setSliderReady(true);
    }
  }, [currentTab]);

  const handleSelectTab = (tabId: BookingServiceType) => {
    // If user clicks a tab, take them back to booking.tsx (or /booking?tab=...)
    try {
      sessionStorage.setItem("mongzo-booking-tab", tabId);
    } catch {}

    // Dispatch global event in case Home page booking panel is open
    if (typeof window !== "undefined") {
      window.dispatchEvent(
        new CustomEvent("mongzo-set-booking-tab", { detail: { tab: tabId } })
      );
    }

    router.push(`/booking?tab=${tabId}`);
  };

  return (
    <div className={`w-full flex justify-center py-3 overflow-x-auto no-scrollbar ${className}`}>
      <div className="relative inline-flex items-center shrink-0 bg-sky-500/10 backdrop-blur-md p-1.5 rounded-full border border-sky-300/30 shadow-inner">
        {/* Sliding active pill */}
        <div
          ref={sliderRef}
          className={`absolute top-1.5 bottom-1.5 rounded-full bg-white shadow-md pointer-events-none transition-all duration-300 ease-out ${
            sliderReady ? "opacity-100" : "opacity-0"
          }`}
          style={{ left: 6, width: 0 }}
        />

        {TABS.map((tab, idx) => {
          const Icon = tab.icon;
          const isActive = currentTab === tab.id;
          return (
            <button
              key={tab.id}
              type="button"
              ref={(el) => {
                tabRefs.current[idx] = el;
              }}
              onClick={() => handleSelectTab(tab.id)}
              className={`relative z-10 flex items-center gap-2 px-4 sm:px-6 py-2 rounded-full text-xs sm:text-sm font-semibold whitespace-nowrap transition-colors duration-200 select-none ${
                isActive
                  ? `text-[#2563eb] font-bold ${sliderReady ? "" : "bg-white shadow-md"}`
                  : "text-neutral-600 hover:text-neutral-900"
              }`}
            >
              <Icon
                className={`text-sm sm:text-base transition-transform duration-200 ${
                  isActive ? "scale-110 text-[#2563eb]" : "text-neutral-500"
                }`}
              />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}

"use client";

import React, { useId, useRef, useState, useEffect } from "react";
import { useRouter, usePathname, useSearchParams } from "next/navigation";
import { FaPlane, FaHotel, FaCar, FaSimCard, FaShieldAlt, FaChevronDown } from "react-icons/fa";
import type { IconType } from "react-icons";

export type BookingServiceType = "hotels" | "flights" | "cars" | "esim" | "insurance";

interface NavServiceBarProps {
  active?: BookingServiceType;
  className?: string;
}

export const BOOKING_SERVICE_TABS: {
  id: BookingServiceType;
  label: string;
  icon: IconType;
}[] = [
  { id: "hotels", label: "Hotels", icon: FaHotel },
  { id: "flights", label: "Flights", icon: FaPlane },
  { id: "cars", label: "Cars", icon: FaCar },
  { id: "esim", label: "E-Sim", icon: FaSimCard },
  { id: "insurance", label: "Travel Insurance", icon: FaShieldAlt },
];

interface MobileServiceDropdownProps {
  active: BookingServiceType;
  onSelect: (serviceId: BookingServiceType) => void;
  align?: "left" | "right";
  className?: string;
}

export function MobileServiceDropdown({
  active,
  onSelect,
  align = "right",
  className = "",
}: MobileServiceDropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const menuId = useId();
  const currentService = BOOKING_SERVICE_TABS.find(
    (service) => service.id === active,
  );

  useEffect(() => {
    if (!isOpen) return;
    const handlePointerDown = (event: PointerEvent) => {
      if (
        event.target instanceof Node &&
        !dropdownRef.current?.contains(event.target)
      ) {
        setIsOpen(false);
      }
    };
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setIsOpen(false);
    };
    document.addEventListener("pointerdown", handlePointerDown);
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("pointerdown", handlePointerDown);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen]);

  if (!currentService) return null;
  const ActiveIcon = currentService.icon;

  return (
    <div ref={dropdownRef} className={`relative min-w-0 ${className}`}>
      <button
        type="button"
        className="w-full min-h-11 inline-flex items-center justify-center gap-1.5 rounded-xl border border-neutral-300 bg-white px-2.5 text-neutral-700 shadow-sm"
        onClick={() => setIsOpen((open) => !open)}
        aria-label={`Current service: ${currentService.label}`}
        aria-haspopup="menu"
        aria-expanded={isOpen}
        aria-controls={menuId}
      >
        <ActiveIcon className="shrink-0 text-sm text-[#2563eb]" />
        <span className="max-w-[82px] truncate text-xs font-semibold">
          {currentService.label}
        </span>
        <FaChevronDown
          size={13}
          className={`shrink-0 transition-transform ${
            isOpen ? "rotate-180" : ""
          }`}
        />
      </button>
      {isOpen && (
        <div
          id={menuId}
          role="menu"
          aria-label="Choose a service"
          className={`absolute top-full z-[70] mt-2 w-56 rounded-2xl border border-neutral-200 bg-white p-2 shadow-xl ${
            align === "left" ? "left-0" : "right-0"
          }`}
        >
          {BOOKING_SERVICE_TABS.map((service) => {
            const ServiceIcon = service.icon;
            return (
              <button
                key={service.id}
                type="button"
                role="menuitem"
                onClick={() => {
                  setIsOpen(false);
                  onSelect(service.id);
                }}
                className={`flex min-h-11 w-full items-center gap-3 rounded-xl px-3 text-left text-sm ${
                  service.id === currentService.id
                    ? "bg-blue-50 font-semibold text-[#2563eb]"
                    : "text-neutral-700 hover:bg-neutral-50"
                }`}
              >
                <ServiceIcon className="shrink-0" />
                <span>{service.label}</span>
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}

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
    const idx = BOOKING_SERVICE_TABS.findIndex((t) => t.id === currentTab);
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
    <div className={`hidden md:flex w-full justify-center py-3 overflow-x-auto no-scrollbar ${className}`}>
      <div className="relative mx-auto w-max max-w-full md:mx-auto inline-flex items-center bg-sky-500/10 backdrop-blur-md p-1.5 rounded-full border border-sky-300/30 shadow-inner">
        {/* Sliding active pill */}
        <div
          ref={sliderRef}
          className={`absolute top-1.5 bottom-1.5 rounded-full bg-white shadow-md pointer-events-none transition-all duration-300 ease-out ${
            sliderReady ? "opacity-100" : "opacity-0"
          }`}
          style={{ left: 6, width: 0 }}
        />

        {BOOKING_SERVICE_TABS.map((tab, idx) => {
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
              className={`relative z-10 flex min-h-11 md:min-h-10 items-center gap-2 px-3 sm:px-4 md:px-5 lg:px-6 py-2 rounded-full text-[13px] md:text-sm font-semibold whitespace-nowrap transition-colors duration-200 select-none ${
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

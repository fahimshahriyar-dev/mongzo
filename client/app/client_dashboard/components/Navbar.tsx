"use client";
import Link from "next/link";
import Image from "next/image";
import { useRouter, usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { HiOutlineBars3BottomRight, HiOutlineChevronDown } from "react-icons/hi2";
import { IoMdClose } from "react-icons/io";
import CurrencyModal, { CurrencyItem } from "./CurrencyModal";
import {
  BOOKING_SERVICE_TABS,
  type BookingServiceType,
} from "./NavServiceBar";
import toast from "react-hot-toast";
import { useSignOutMutation } from "@/redux/features/auth/authApi";

const navLinks = [
  { label: "About", href: "/about" },
  {
    label: "Transport",
    children: [
      { label: "Hotels", href: "/hotels" },
      { label: "Flights", href: "/flights" },
      { label: "Cars", href: "/cars" },
      { label: "E-Sim", href: "/esim" },
      {
        label: "Travel Insurance",
        href: "/travelInsurance",
      },
    ],
  },
  { label: "Travel Guides", href: "/travel-guides" },
];

const Navbar = () => {
  const pathname = usePathname();
  const isHomePage = pathname === "/";
  const [bookingTab, setBookingTab] = useState<BookingServiceType | null>(null);
  const isRouteActive = (href: string) =>
    pathname === href || pathname.startsWith(`${href}/`);
  const isTransportActive =
    navLinks[1].children?.some((child) => isRouteActive(child.href)) ||
    pathname === "/booking";
  const routeServiceId: BookingServiceType | null =
    pathname.startsWith("/hotels")
      ? "hotels"
      : pathname.startsWith("/flights")
        ? "flights"
        : pathname.startsWith("/cars")
          ? "cars"
          : pathname.startsWith("/esim")
            ? "esim"
            : pathname.toLowerCase().startsWith("/travelinsurance")
              ? "insurance"
              : null;
  const activeServiceId =
    routeServiceId ?? (pathname === "/booking" ? bookingTab : null);
  const activeService = BOOKING_SERVICE_TABS.find(
    (service) => service.id === activeServiceId,
  );
  const { user } = useSelector((state: any) => state.auth);
  const [openSidebar, setOpenSidebar] = useState(false);
  const [openTransport, setOpenTransport] = useState(false);
  const [serviceDropdownOpen, setServiceDropdownOpen] = useState(false);
  const drawerRef = useRef<HTMLDivElement>(null);
  const serviceDropdownRef = useRef<HTMLDivElement>(null);
  const [signOut, { isSuccess }] = useSignOutMutation();
  const router = useRouter();

  // Currency modal state
  const [openCurrencyModal, setOpenCurrencyModal] = useState(false);
  const [selectedCurrency, setSelectedCurrency] = useState<CurrencyItem>(() => {
    if (typeof window !== "undefined") {
      try {
        const saved = localStorage.getItem("mongzo_currency");
        if (saved) return JSON.parse(saved);
      } catch (err) {}
    }
    return {
      name: "United States dollar",
      code: "USD",
      symbol: "$",
      country: "United States",
    };
  });

  const handleCurrencySelect = (cur: CurrencyItem) => {
    setSelectedCurrency(cur);
    if (typeof window !== "undefined") {
      try {
        localStorage.setItem("mongzo_currency", JSON.stringify(cur));
        window.dispatchEvent(new CustomEvent("mongzo-currency-change", { detail: cur }));
      } catch (err) {}
    }
  };

  useEffect(() => {
    const handleGlobalCurrencyChange = (e: any) => {
      if (e.detail) {
        setSelectedCurrency(e.detail);
      }
    };
    window.addEventListener("mongzo-currency-change", handleGlobalCurrencyChange);
    return () => {
      window.removeEventListener("mongzo-currency-change", handleGlobalCurrencyChange);
    };
  }, []);

  // Tracks whether the home Booking panel is open so the brand can close it.
  const [bookingOpen, setBookingOpen] = useState(false);
  const transparentNav = isHomePage && !bookingOpen;

  useEffect(() => {
    if (!openSidebar) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    drawerRef.current?.querySelector<HTMLElement>("button, a")?.focus();

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpenSidebar(false);
      if (event.key !== "Tab" || !drawerRef.current) return;
      const focusable = drawerRef.current.querySelectorAll<HTMLElement>(
        'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])'
      );
      if (!focusable.length) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [openSidebar]);

  useEffect(() => {
    if (!serviceDropdownOpen) return;
    const handlePointerDown = (event: PointerEvent) => {
      if (
        event.target instanceof Node &&
        !serviceDropdownRef.current?.contains(event.target)
      ) {
        setServiceDropdownOpen(false);
      }
    };
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setServiceDropdownOpen(false);
    };
    document.addEventListener("pointerdown", handlePointerDown);
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("pointerdown", handlePointerDown);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [serviceDropdownOpen]);

  useEffect(() => {
    setOpenSidebar(false);
    setOpenTransport(false);
    setServiceDropdownOpen(false);
  }, [pathname]);

  useEffect(() => {
    const updateBookingTab = () => {
      const requestedTab = new URLSearchParams(window.location.search).get("tab");
      const validTab = BOOKING_SERVICE_TABS.find(
        (service) => service.id === requestedTab,
      );
      setBookingTab(pathname === "/booking" ? validTab?.id ?? null : null);
    };
    const handleBookingTabChange = (event: Event) => {
      const tab = (event as CustomEvent<{ tab?: BookingServiceType }>).detail?.tab;
      setBookingTab(
        BOOKING_SERVICE_TABS.some((service) => service.id === tab)
          ? tab ?? null
          : null,
      );
    };
    updateBookingTab();
    window.addEventListener("popstate", updateBookingTab);
    window.addEventListener("mongzo-set-booking-tab", handleBookingTabChange);
    return () => {
      window.removeEventListener("popstate", updateBookingTab);
      window.removeEventListener("mongzo-set-booking-tab", handleBookingTabChange);
    };
  }, [pathname]);

  useEffect(() => {
    if (!isHomePage) return;
    const handleBookingState = (e: any) => {
      setBookingOpen(Boolean(e.detail?.open));
    };
    window.addEventListener("mongzo-booking-open", handleBookingState);
    return () => {
      window.removeEventListener("mongzo-booking-open", handleBookingState);
    };
  }, [isHomePage]);

  useEffect(() => {
    if (isSuccess) {
      toast.success("Logged out successfully!");
      setOpenSidebar(false);
      router.push("/");
    }
  }, [isSuccess, router]);

  const handleSignOut = () => {
    signOut();
  };

  const handleServiceSelect = (tabId: BookingServiceType) => {
    setServiceDropdownOpen(false);
    try {
      sessionStorage.setItem("mongzo-booking-tab", tabId);
    } catch {}
    window.dispatchEvent(
      new CustomEvent("mongzo-set-booking-tab", { detail: { tab: tabId } }),
    );
    router.push(`/booking?tab=${tabId}`);
  };

  const desktopLinkClass = (active: boolean) =>
    `text-sm lg:text-base tracking-wide font-medium transition-colors ${
      transparentNav
        ? active
          ? "text-white font-semibold underline decoration-2 underline-offset-8"
          : "text-white/90 hover:text-white"
        : active
        ? "text-[#2563eb] font-semibold"
        : "text-neutral-700 hover:text-neutral-950"
    }`;

  const childLinkClass = (active: boolean) =>
    `px-3 py-2 rounded-lg text-sm lg:text-base transition-colors ${
      active
        ? "text-[#2563eb] font-semibold bg-blue-50"
        : "text-neutral-700 hover:text-neutral-950 hover:bg-neutral-100"
    }`;

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 ${
          transparentNav
            ? "bg-transparent"
            : "bg-white/95 backdrop-blur-md border-b border-neutral-200/90 shadow-sm"
        }`}
      >
        <div className="container-page h-16 md:h-[72px] lg:h-20 flex items-center justify-between py-2 md:py-3 lg:py-4">
          {/* Left Navigation Links & Brand */}
          <div className="flex items-center gap-8 lg:gap-12">
            <Link
              href="/"
              onClick={(e) => {
                if (isHomePage && bookingOpen) {
                  e.preventDefault();
                  window.dispatchEvent(new CustomEvent("mongzo-close-booking"));
                }
              }}
              aria-label="Mongzo home"
            >
              <Image
                src={
                  transparentNav
                    ? "/assets/images/mongzo_logo_white.png"
                    : "/assets/images/mongzo_logo_black.png"
                }
                alt="Mongzo"
                width={2172}
                height={724}
                priority
                className="h-[30px] sm:h-[34px] w-auto"
              />
            </Link>

            <nav className="hidden lg:flex items-center gap-7 xl:gap-10 pt-2.5">
              {navLinks.map((link) =>
                link.children ? (
                  <div key={link.label} className="relative group">
                    <button
                      className={`flex items-center gap-1 ${desktopLinkClass(
                        isTransportActive
                      )}`}
                    >
                      {link.label}
                      <HiOutlineChevronDown
                        size={14}
                        className="transition-transform duration-200 group-hover:rotate-180"
                      />
                    </button>
                    <div className="absolute left-0 top-full pt-3 opacity-0 invisible translate-y-1 group-hover:opacity-100 group-hover:visible group-hover:translate-y-0 transition-all duration-200">
                      <div
                        className="min-w-[170px] rounded-xl p-2 shadow-xl flex flex-col border bg-white border-neutral-200"
                      >
                        {link.children.map((child: any) => (
                          <Link
                            key={child.label}
                            href={child.href}
                            onClick={(e) => {
                              if (child.tab && isHomePage) {
                                e.preventDefault();
                                window.dispatchEvent(
                                  new CustomEvent("mongzo-open-booking", {
                                    detail: { tab: child.tab },
                                  })
                                );
                              }
                            }}
                            className={childLinkClass(isRouteActive(child.href))}
                          >
                            {child.label}
                          </Link>
                        ))}
                      </div>
                    </div>
                  </div>
                ) : (
                  <Link
                    key={link.label}
                    href={link.href}
                    className={desktopLinkClass(isRouteActive(link.href))}
                  >
                    {link.label}
                  </Link>
                )
              )}
            </nav>
          </div>

          {/* Right Locale & Auth Controls */}
          <div
            className={`hidden lg:flex items-center gap-5 lg:gap-7 pt-2.5 text-sm lg:text-base tracking-wide ${
              transparentNav ? "text-white/90" : "text-neutral-700"
            }`}
          >
            {/* Currency Button (Clicking opens Choose a Currency modal) */}
            <button
              type="button"
              onClick={() => setOpenCurrencyModal(true)}
              className={`flex items-center gap-1.5 font-medium ${
                transparentNav ? "hover:text-white" : "hover:text-neutral-950"
              }`}
            >
              <span className="font-semibold">{selectedCurrency.code}</span>
              <span className={transparentNav ? "text-white/40" : "text-neutral-300"}>•</span>
              <span>{selectedCurrency.country}</span>
            </button>

            <div
              className={`flex items-center gap-3 pl-5 border-l ${
                transparentNav ? "border-white/20" : "border-neutral-200"
              }`}
            >
              {user ? (
                <>
                  <span className={`font-medium ${transparentNav ? "text-white/80" : "text-neutral-800"}`}>
                    Hi, {user.name}
                  </span>
                  <button
                    onClick={handleSignOut}
                    className={`px-3.5 py-1 rounded-full border text-sm ${
                      transparentNav
                        ? "border-white/30 text-white hover:bg-white hover:text-neutral-900"
                        : "border-neutral-300 text-neutral-800 hover:bg-neutral-100"
                    }`}
                  >
                    Logout
                  </button>
                </>
              ) : (
                <>
                  <Link
                    href="/signin"
                    className={`${
                      transparentNav
                        ? "text-white/80 hover:text-white"
                        : "text-neutral-700 hover:text-neutral-950"
                    }`}
                  >
                    Sign in
                  </Link>
                  <Link
                    href="/signup"
                    className="px-3.5 py-1 rounded-full font-medium text-sm bg-blue-600 text-white hover:bg-blue-700 shadow-md shadow-blue-500/20"
                  >
                    Sign up
                  </Link>
                </>
              )}
            </div>
          </div>

          <div className="lg:hidden flex items-center gap-1.5">
            {activeService && (
              <div ref={serviceDropdownRef} className="relative md:hidden">
                <button
                  type="button"
                  className="min-h-11 max-w-[140px] inline-flex items-center gap-1.5 rounded-full border border-sky-300/40 bg-sky-500/10 px-2.5 text-neutral-700"
                  onClick={() => setServiceDropdownOpen((open) => !open)}
                  aria-label={`Current service: ${activeService.label}`}
                  aria-haspopup="menu"
                  aria-expanded={serviceDropdownOpen}
                  aria-controls="mobile-service-menu"
                >
                  <activeService.icon className="shrink-0 text-sm text-[#2563eb]" />
                  <span className="max-w-[82px] truncate text-xs font-semibold">
                    {activeService.label}
                  </span>
                  <HiOutlineChevronDown
                    size={13}
                    className={`shrink-0 transition-transform ${
                      serviceDropdownOpen ? "rotate-180" : ""
                    }`}
                  />
                </button>
                {serviceDropdownOpen && (
                  <div
                    id="mobile-service-menu"
                    role="menu"
                    aria-label="Choose a service"
                    className="absolute right-0 top-full z-[70] mt-2 w-56 rounded-2xl border border-neutral-200 bg-white p-2 shadow-xl"
                  >
                    {BOOKING_SERVICE_TABS.map((service) => (
                      <button
                        key={service.id}
                        type="button"
                        role="menuitem"
                        onClick={() => handleServiceSelect(service.id)}
                        className={`flex min-h-11 w-full items-center gap-3 rounded-xl px-3 text-left text-sm ${
                          service.id === activeService.id
                            ? "bg-blue-50 font-semibold text-[#2563eb]"
                            : "text-neutral-700 hover:bg-neutral-50"
                        }`}
                      >
                        <service.icon className="shrink-0" />
                        <span>{service.label}</span>
                      </button>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* Mobile Hamburger Button */}
            <button
              className={`lg:hidden min-h-11 min-w-11 inline-flex items-center justify-center rounded-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 ${
                transparentNav
                  ? "text-white hover:text-white/80"
                  : "text-neutral-800 hover:text-neutral-950"
              }`}
              onClick={() => setOpenSidebar(!openSidebar)}
              aria-label="Toggle navigation menu"
              aria-expanded={openSidebar}
              aria-controls="mobile-navigation"
            >
              {openSidebar ? <IoMdClose size={26} /> : <HiOutlineBars3BottomRight size={26} />}
            </button>
          </div>
        </div>

        {/* Mobile Drawer Menu */}
        {openSidebar && (
          <div
            className="fixed inset-0 z-[60] lg:hidden"
            role="presentation"
            onMouseDown={(event) => {
              if (event.target === event.currentTarget) setOpenSidebar(false);
            }}
          >
            <div className="absolute inset-0 bg-neutral-950/30" />
            <div
              id="mobile-navigation"
              ref={drawerRef}
              role="dialog"
              aria-modal="true"
              aria-label="Navigation menu"
              className="absolute right-0 top-0 h-[100dvh] w-[min(88vw,420px)] bg-white px-5 pb-[max(1.25rem,env(safe-area-inset-bottom))] pt-[env(safe-area-inset-top)] overflow-y-auto shadow-2xl"
            >
            <div className="h-16 md:h-[72px] flex items-center justify-between border-b border-neutral-200">
              <Image src="/assets/images/mongzo_logo_black.png" alt="Mongzo" width={2172} height={724} className="h-8 w-auto" />
              <button type="button" className="min-h-11 min-w-11 inline-flex items-center justify-center rounded-full text-neutral-800" onClick={() => setOpenSidebar(false)} aria-label="Close navigation menu">
                <IoMdClose size={26} />
              </button>
            </div>
            <nav className="flex flex-col gap-1 py-4">
              {navLinks.map((link) =>
                link.children ? (
                  <div key={link.label} className="flex flex-col">
                    <button
                      className={`flex min-h-11 items-center justify-between text-base font-medium transition-colors ${
                        isTransportActive
                          ? "text-[#2563eb]"
                          : "text-neutral-800"
                      }`}
                      onClick={() => setOpenTransport(!openTransport)}
                      aria-expanded={openTransport}
                      aria-controls="transport-submenu"
                    >
                      {link.label}
                      <HiOutlineChevronDown
                        size={16}
                        className={`transition-transform duration-200 ${
                          openTransport ? "rotate-180" : ""
                        }`}
                      />
                    </button>
                    {openTransport && (
                      <div id="transport-submenu" className="flex flex-col gap-1 pb-2 pl-4">
                        {link.children.map((child: any) => (
                          <Link
                            key={child.label}
                            href={child.href}
                            className={`text-base transition-colors ${
                              isRouteActive(child.href)
                                ? "text-[#2563eb] font-semibold"
                                : "text-neutral-600 hover:text-neutral-900"
                            }`}
                            onClick={(e) => {
                              setOpenSidebar(false);
                              if (child.tab && isHomePage) {
                                e.preventDefault();
                                window.dispatchEvent(
                                  new CustomEvent("mongzo-open-booking", {
                                    detail: { tab: child.tab },
                                  })
                                );
                              }
                            }}
                          >
                            {child.label}
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                ) : (
                  <Link
                    key={link.label}
                    href={link.href}
                    className={`text-base font-medium transition-colors ${
                      isRouteActive(link.href)
                        ? "text-[#2563eb]"
                        : "text-neutral-800 hover:text-neutral-950"
                    }`}
                    onClick={() => setOpenSidebar(false)}
                  >
                    {link.label}
                  </Link>
                )
              )}
            </nav>

            <button
              type="button"
              onClick={() => {
                setOpenSidebar(false);
                setOpenCurrencyModal(true);
              }}
              className="mt-2 min-h-11 border-t border-neutral-200 flex items-center justify-between text-base text-neutral-700 hover:text-neutral-950 text-left"
            >
              <div className="flex items-center gap-1.5">
                <span className="font-semibold">{selectedCurrency.code}</span>
                <span className="text-neutral-400">•</span>
                <span>{selectedCurrency.country}</span>
              </div>
              <span className="text-sm text-blue-600 font-semibold">Change</span>
            </button>

            <div className="mt-2 pt-3 border-t border-neutral-200 flex flex-col sm:flex-row items-stretch gap-3">
              {user ? (
                <>
                  <span className="text-sm text-neutral-800">Hi, {user.name}</span>
                  <button
                    onClick={handleSignOut}
                    className="w-full py-1.5 rounded-full border border-neutral-300 text-center text-sm text-neutral-800 hover:bg-neutral-100"
                  >
                    Logout
                  </button>
                </>
              ) : (
                <>
                  <Link
                    href="/signin"
                    className="min-h-11 sm:w-1/2 flex items-center justify-center rounded-full border border-neutral-300 text-center text-sm text-neutral-800 hover:bg-neutral-100"
                    onClick={() => setOpenSidebar(false)}
                  >
                    Sign in
                  </Link>
                  <Link
                    href="/signup"
                    className="min-h-11 sm:w-1/2 flex items-center justify-center rounded-full bg-blue-600 text-center text-sm font-semibold text-white hover:bg-blue-700 shadow-md shadow-blue-500/20"
                    onClick={() => setOpenSidebar(false)}
                  >
                    Sign up
                  </Link>
                </>
              )}
            </div>
            </div>
          </div>
        )}
      </header>

      <CurrencyModal
        open={openCurrencyModal}
        onClose={() => setOpenCurrencyModal(false)}
        selected={selectedCurrency}
        onSelect={handleCurrencySelect}
      />
    </>
  );
};

export default Navbar;

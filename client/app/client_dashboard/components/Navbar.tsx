"use client";
import Link from "next/link";
import Image from "next/image";
import { useRouter, usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { HiOutlineBars3BottomRight, HiOutlineChevronDown } from "react-icons/hi2";
import { IoMdClose } from "react-icons/io";
import CurrencyModal, { CurrencyItem } from "./CurrencyModal";
import toast from "react-hot-toast";
import { useSignOutMutation } from "@/redux/features/auth/authApi";

const navLinks = [
  { label: "About", href: "/about" },
  {
    label: "Transport",
    children: [
      { label: "Hotel", href: "/hotels" },
      { label: "Flight", href: "/flights" },
      { label: "Car", href: "/cars" },
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
  const { user } = useSelector((state: any) => state.auth);
  const [openSidebar, setOpenSidebar] = useState(false);
  const [openTransport, setOpenTransport] = useState(false);
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
  // On the hero, keep the navbar transparent; once the white Booking panel
  // slides up (or on any other page) switch to the solid light design.
  const transparentNav = isHomePage && !bookingOpen;

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

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 ${
          transparentNav
            ? "bg-transparent"
            : "bg-white/95 backdrop-blur-md border-b border-neutral-200/90 shadow-sm"
        }`}
      >
        <div className="container-page h-20 flex items-center justify-between py-4">
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

            <nav className="hidden md:flex items-center gap-7 lg:gap-10 pt-2.5">
              {navLinks.map((link) =>
                link.children ? (
                  <div key={link.label} className="relative group">
                    <button
                      className={`flex items-center gap-1 text-sm lg:text-base tracking-wide font-medium ${
                        transparentNav
                          ? "text-white/90 hover:text-white"
                          : "text-neutral-700 hover:text-neutral-950"
                      }`}
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
                            className="px-3 py-2 rounded-lg text-sm lg:text-base text-neutral-700 hover:text-neutral-950 hover:bg-neutral-100 transition-colors"
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
                    className={`text-sm lg:text-base tracking-wide font-medium ${
                      transparentNav
                        ? "text-white/90 hover:text-white"
                        : "text-neutral-700 hover:text-neutral-950"
                    }`}
                  >
                    {link.label}
                  </Link>
                )
              )}
            </nav>
          </div>

          {/* Right Locale & Auth Controls */}
          <div
            className={`hidden md:flex items-center gap-5 lg:gap-7 pt-2.5 text-sm lg:text-base tracking-wide ${
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

          {/* Mobile Hamburger Button */}
          <button
            className={`md:hidden p-1 focus:outline-none ${
              transparentNav
                ? "text-white hover:text-white/80"
                : "text-neutral-800 hover:text-neutral-950"
            }`}
            onClick={() => setOpenSidebar(!openSidebar)}
            aria-label="Toggle navigation menu"
          >
            {openSidebar ? <IoMdClose size={26} /> : <HiOutlineBars3BottomRight size={26} />}
          </button>
        </div>

        {/* Mobile Drawer Menu */}
        {openSidebar && (
          <div className="md:hidden bg-white/95 backdrop-blur-md border-b border-neutral-200 px-6 py-6 flex flex-col gap-4 text-neutral-900 shadow-lg">
            <nav className="flex flex-col gap-3.5">
              {navLinks.map((link) =>
                link.children ? (
                  <div key={link.label} className="flex flex-col gap-2">
                    <button
                      className="flex items-center justify-between text-base font-medium text-neutral-800"
                      onClick={() => setOpenTransport(!openTransport)}
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
                      <div className="flex flex-col gap-2 pl-4">
                        {link.children.map((child: any) => (
                          <Link
                            key={child.label}
                            href={child.href}
                            className="text-base text-neutral-600 hover:text-neutral-900"
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
                    className="text-base font-medium text-neutral-800 hover:text-neutral-950"
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
              className="pt-3 border-t border-neutral-200 flex items-center justify-between text-base text-neutral-700 hover:text-neutral-950 text-left"
            >
              <div className="flex items-center gap-1.5">
                <span className="font-semibold">{selectedCurrency.code}</span>
                <span className="text-neutral-400">•</span>
                <span>{selectedCurrency.country}</span>
              </div>
              <span className="text-sm text-blue-600 font-semibold">Change</span>
            </button>

            <div className="pt-3 border-t border-neutral-200 flex items-center gap-3">
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
                    className="w-1/2 py-2 rounded-full border border-neutral-300 text-center text-sm text-neutral-800 hover:bg-neutral-100"
                    onClick={() => setOpenSidebar(false)}
                  >
                    Sign in
                  </Link>
                  <Link
                    href="/signup"
                    className="w-1/2 py-2 rounded-full bg-blue-600 text-center text-sm font-semibold text-white hover:bg-blue-700 shadow-md shadow-blue-500/20"
                    onClick={() => setOpenSidebar(false)}
                  >
                    Sign up
                  </Link>
                </>
              )}
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

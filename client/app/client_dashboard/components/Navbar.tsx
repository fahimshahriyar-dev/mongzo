"use client";
import Link from "next/link";
import Image from "next/image";
import { useRouter, usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { HiOutlineBars3BottomRight, HiOutlineChevronDown } from "react-icons/hi2";
import { IoMdClose } from "react-icons/io";
import { FaTimes } from "react-icons/fa";
import toast from "react-hot-toast";
import { useSignOutMutation } from "@/redux/features/auth/authApi";

const navLinks = [
  { label: "About", href: "/#about" },
  {
    label: "Transport",
    children: [
      { label: "Hotel", href: "/booking?tab=hotels", tab: "hotels" },
      { label: "Apartment", href: "/booking?tab=apartments", tab: "apartments" },
      { label: "Flight", href: "/flights" },
      { label: "Car", href: "/booking?tab=cars", tab: "cars" },
    ],
  },
  { label: "Travel Guides", href: "/travel-guides" },
];

interface CurrencyItem {
  name: string;
  code: string;
  symbol: string;
  country: string;
}

const CURRENCIES: CurrencyItem[] = [
  { name: "Peruvian sol", code: "PEN", symbol: "S/", country: "Peru" },
  { name: "Australian dollar", code: "AUD", symbol: "$", country: "Australia" },
  { name: "Brazilian real", code: "BRL", symbol: "R$", country: "Brazil" },
  { name: "Bulgarian lev", code: "BGN", symbol: "лв.", country: "Bulgaria" },
  { name: "Canadian dollar", code: "CAD", symbol: "$", country: "Canada" },
  { name: "Chilean peso", code: "CLP", symbol: "$", country: "Chile" },
  { name: "Chinese yuan", code: "CNY", symbol: "¥", country: "China" },
  { name: "Colombian peso", code: "COP", symbol: "$", country: "Colombia" },
  { name: "Costa Rican colon", code: "CRC", symbol: "₡", country: "Costa Rica" },
  { name: "Czech koruna", code: "CZK", symbol: "Kč", country: "Czech Republic" },
  { name: "Danish krone", code: "DKK", symbol: "kr", country: "Denmark" },
  { name: "Egyptian pound", code: "EGP", symbol: "ج.م", country: "Egypt" },
  { name: "Emirati dirham", code: "AED", symbol: "د.إ", country: "United Arab Emirates" },
  { name: "Euro", code: "EUR", symbol: "€", country: "European Union" },
  { name: "Ghanaian cedi", code: "GHS", symbol: "GH₵", country: "Ghana" },
  { name: "Hong Kong dollar", code: "HKD", symbol: "$", country: "Hong Kong" },
  { name: "Hungarian forint", code: "HUF", symbol: "Ft", country: "Hungary" },
  { name: "Indian rupee", code: "INR", symbol: "₹", country: "India" },
  { name: "Indonesian rupiah", code: "IDR", symbol: "Rp", country: "Indonesia" },
  { name: "Israeli new shekel", code: "ILS", symbol: "₪", country: "Israel" },
  { name: "Japanese yen", code: "JPY", symbol: "¥", country: "Japan" },
  { name: "Kazakhstani tenge", code: "KZT", symbol: "₸", country: "Kazakhstan" },
  { name: "Kenyan shilling", code: "KES", symbol: "KSh", country: "Kenya" },
  { name: "Malaysian ringgit", code: "MYR", symbol: "RM", country: "Malaysia" },
  { name: "Mexican peso", code: "MXN", symbol: "$", country: "Mexico" },
  { name: "Moroccan dirham", code: "MAD", symbol: "MAD", country: "Morocco" },
  { name: "New Taiwan dollar", code: "TWD", symbol: "$", country: "Taiwan" },
  { name: "New Zealand dollar", code: "NZD", symbol: "$", country: "New Zealand" },
  { name: "Norwegian krone", code: "NOK", symbol: "kr", country: "Norway" },
  { name: "Philippine peso", code: "PHP", symbol: "₱", country: "Philippines" },
  { name: "Polish zloty", code: "PLN", symbol: "zł", country: "Poland" },
  { name: "Pound sterling", code: "GBP", symbol: "£", country: "United Kingdom" },
  { name: "Qatari riyal", code: "QAR", symbol: "ر.ق", country: "Qatar" },
  { name: "Romanian leu", code: "RON", symbol: "lei", country: "Romania" },
  { name: "Saudi Arabian riyal", code: "SAR", symbol: "SR", country: "Saudi Arabia" },
  { name: "Singapore dollar", code: "SGD", symbol: "$", country: "Singapore" },
  { name: "South African rand", code: "ZAR", symbol: "R", country: "South Africa" },
  { name: "South Korean won", code: "KRW", symbol: "₩", country: "South Korea" },
  { name: "Swedish krona", code: "SEK", symbol: "kr", country: "Sweden" },
  { name: "Swiss franc", code: "CHF", symbol: "CHF", country: "Switzerland" },
  { name: "Thai baht", code: "THB", symbol: "฿", country: "Thailand" },
  { name: "Turkish lira", code: "TRY", symbol: "₺", country: "Turkey" },
  { name: "Ugandan shilling", code: "UGX", symbol: "USh", country: "Uganda" },
  { name: "Ukrainian hryvnia", code: "UAH", symbol: "₴", country: "Ukraine" },
  { name: "United States dollar", code: "USD", symbol: "$", country: "United States" },
  { name: "Uruguayan peso", code: "UYU", symbol: "$U", country: "Uruguay" },
  { name: "Vietnamese dong", code: "VND", symbol: "₫", country: "Vietnam" },
  { name: "Bangladeshi taka", code: "BDT", symbol: "৳", country: "Bangladesh" },
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
  const [selectedCurrency, setSelectedCurrency] = useState<CurrencyItem>({
    name: "United States dollar",
    code: "USD",
    symbol: "$",
    country: "United States",
  });

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

  // Lock background scroll when currency modal is open
  useEffect(() => {
    if (openCurrencyModal) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [openCurrencyModal]);

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
        <div className="container-page h-20 flex items-end justify-between pb-4">
          {/* Left Navigation Links & Brand */}
          <div className="flex items-end gap-8 lg:gap-12">
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

            <nav className="hidden md:flex items-center gap-7 lg:gap-10">
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
                        className={`min-w-[170px] rounded-xl p-2 shadow-xl flex flex-col border ${
                          transparentNav
                            ? "bg-neutral-950/95 backdrop-blur-md border-white/10"
                            : "bg-white border-neutral-200"
                        }`}
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
                            className={`px-3 py-2 rounded-lg text-sm lg:text-base transition-colors ${
                              transparentNav
                                ? "text-white/80 hover:text-white hover:bg-white/10"
                                : "text-neutral-700 hover:text-neutral-950 hover:bg-neutral-100"
                            }`}
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
            className={`hidden md:flex items-end gap-5 lg:gap-7 text-sm lg:text-base tracking-wide ${
              transparentNav ? "text-white/90" : "text-neutral-700"
            }`}
          >
            {/* Currency Button (Clicking opens Choose a Currency modal) */}
            <button
              type="button"
              onClick={() => setOpenCurrencyModal(true)}
              className={`flex items-center gap-1.5 font-medium px-2.5 py-1.5 rounded-lg hover:bg-black/5 ${
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

      {/* ========================================================= */}
      {/* CHOOSE A CURRENCY MODAL (Matching Provided Image)         */}
      {/* ========================================================= */}
      {openCurrencyModal && (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 sm:p-6 md:p-8">
          {/* Frosted / Dim Backdrop */}
          <div
            onClick={() => setOpenCurrencyModal(false)}
            className="absolute inset-0 bg-black/50 backdrop-blur-md transition-opacity"
          />

          {/* Modal Container */}
          <div className="relative w-full max-w-5xl bg-white/95 backdrop-blur-2xl rounded-3xl shadow-2xl border border-neutral-200/90 overflow-hidden flex flex-col max-h-[88vh] z-10 animate-in fade-in zoom-in-95 duration-200">
            {/* Modal Header */}
            <div className="px-6 sm:px-8 pt-6 pb-4 border-b border-neutral-100 flex items-center justify-between">
              <div>
                <button
                  type="button"
                  onClick={() => setOpenCurrencyModal(false)}
                  className="w-8 h-8 rounded-full text-neutral-500 hover:text-neutral-900 hover:bg-neutral-100 flex items-center justify-center transition-colors mb-2"
                >
                  <FaTimes className="text-sm" />
                </button>
                <h2 className="text-xl sm:text-2xl font-bold text-neutral-900 tracking-tight">
                  Choose a currency
                </h2>
              </div>
            </div>

            {/* Scrollable Grid of Currencies (5 Columns like image) */}
            <div className="px-6 sm:px-8 py-6 overflow-y-auto scrollbar-thin scrollbar-thumb-neutral-300 scrollbar-track-transparent">
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3.5">
                {CURRENCIES.map((cur) => {
                  const isSelected = selectedCurrency.code === cur.code;
                  return (
                    <button
                      key={cur.code}
                      type="button"
                      onClick={() => {
                        setSelectedCurrency(cur);
                        setOpenCurrencyModal(false);
                      }}
                      className={`text-left p-3.5 rounded-2xl border transition-all duration-150 flex flex-col justify-between ${
                        isSelected
                          ? "border-blue-600 bg-blue-50/70 shadow-sm ring-1 ring-blue-600"
                          : "border-neutral-200/80 hover:border-blue-400/80 hover:bg-neutral-50/80 hover:shadow-sm"
                      }`}
                    >
                      <span className="text-xs font-semibold text-neutral-900 leading-tight">
                        {cur.name}
                      </span>
                      <span className="text-[11px] text-neutral-500 font-medium mt-1">
                        {cur.code} - {cur.symbol}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Navbar;

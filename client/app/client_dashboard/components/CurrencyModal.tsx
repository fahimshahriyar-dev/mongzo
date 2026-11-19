"use client";
import { useEffect, useState, useMemo } from "react";
import { createPortal } from "react-dom";
import { FaTimes, FaSearch } from "react-icons/fa";

export interface CurrencyItem {
  name: string;
  code: string;
  symbol: string;
  country: string;
}

export const CURRENCIES: CurrencyItem[] = [
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

interface CurrencyModalProps {
  open: boolean;
  onClose: () => void;
  selected: CurrencyItem;
  onSelect: (currency: CurrencyItem) => void;
}

const CurrencyModal = ({ open, onClose, selected, onSelect }: CurrencyModalProps) => {
  const [mounted, setMounted] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
      setSearchQuery("");
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [open]);

  const filteredCurrencies = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    if (!q) return CURRENCIES;
    return CURRENCIES.filter(
      (c) =>
        c.name.toLowerCase().includes(q) ||
        c.code.toLowerCase().includes(q) ||
        c.country.toLowerCase().includes(q) ||
        c.symbol.toLowerCase().includes(q)
    );
  }, [searchQuery]);

  if (!open || !mounted) return null;

  return createPortal(
    <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 sm:p-6 md:p-8">
      {/* Frosted / Dim Backdrop */}
      <div
        onClick={onClose}
        className="absolute inset-0 bg-black/50 backdrop-blur-md transition-opacity"
      />

      {/* Modal Container */}
      <div className="relative w-full max-w-5xl bg-white/95 backdrop-blur-2xl rounded-3xl shadow-2xl border border-neutral-200/90 overflow-hidden flex flex-col max-h-[88vh] z-10 animate-in fade-in zoom-in-95 duration-200">
        {/* Modal Header */}
        <div className="px-6 sm:px-8 pt-6 pb-4 border-b border-neutral-100 flex flex-col gap-4">
          <div className="flex items-center justify-between">
            <div>
              <button
                type="button"
                onClick={onClose}
                className="w-8 h-8 rounded-full text-neutral-500 hover:text-neutral-900 hover:bg-neutral-100 flex items-center justify-center transition-colors mb-2"
              >
                <FaTimes className="text-sm" />
              </button>
              <h2 className="text-xl sm:text-2xl font-bold text-neutral-900 tracking-tight">
                Choose a currency
              </h2>
            </div>
          </div>

          {/* Search bar */}
          <div className="relative w-full max-w-md">
            <FaSearch className="absolute left-3.5 top-1/2 -translate-y-1/2 text-neutral-400 text-sm" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by currency name, code (e.g. USD, BDT), or country..."
              className="w-full pl-10 pr-9 py-2.5 rounded-xl border border-neutral-200/90 bg-neutral-50/80 focus:bg-white text-xs sm:text-sm text-neutral-900 placeholder-neutral-400 outline-none focus:border-[#2563eb] focus:ring-2 focus:ring-[#2563eb]/15 transition-all"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery("")}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-neutral-600 text-xs"
              >
                <FaTimes />
              </button>
            )}
          </div>
        </div>

        {/* Scrollable Grid of Currencies */}
        <div className="px-6 sm:px-8 py-6 overflow-y-auto scrollbar-thin scrollbar-thumb-neutral-300 scrollbar-track-transparent">
          {filteredCurrencies.length === 0 ? (
            <div className="py-12 text-center text-neutral-400 text-sm">
              No currencies found matching &quot;{searchQuery}&quot;
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3.5">
              {filteredCurrencies.map((cur) => {
                const isSelected = selected.code === cur.code;
                return (
                  <button
                    key={cur.code}
                    type="button"
                    onClick={() => {
                      onSelect(cur);
                      onClose();
                    }}
                    className={`text-left p-3.5 rounded-2xl border transition-all duration-150 flex flex-col justify-between ${
                      isSelected
                        ? "border-[#2563eb] bg-blue-50/70 shadow-sm ring-1 ring-[#2563eb]"
                        : "border-neutral-200/80 hover:border-[#2563eb]/60 hover:bg-neutral-50/80 hover:shadow-sm"
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
          )}
        </div>
      </div>
    </div>,
    document.body
  );
};

export default CurrencyModal;

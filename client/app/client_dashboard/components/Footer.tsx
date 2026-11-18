"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  FaFacebookF,
  FaInstagram,
  FaXTwitter,
  FaYoutube,
  FaLinkedinIn,
} from "react-icons/fa6";
import { FaPhoneAlt, FaEnvelope, FaMapMarkerAlt } from "react-icons/fa";
import CurrencyModal, { CurrencyItem } from "./CurrencyModal";
import LanguageModal from "./LanguageModal";

const companyLinks = [
  { label: "About Us", href: "/about" },
  { label: "Our Services", href: "/booking" },
  { label: "Flights", href: "/flights" },
  { label: "Hotels & Stays", href: "/booking?tab=hotels" },
  { label: "Travel Guides", href: "/travel-guides" },
];

const legalLinks = [
  { label: "Terms and conditions", href: "#" },
  { label: "Privacy policy", href: "#" },
  { label: "Refund policy", href: "#" },
  { label: "Cookie policy", href: "#" },
];

const socialLinks = [
  { icon: FaFacebookF, href: "https://facebook.com", label: "Facebook" },
  { icon: FaInstagram, href: "https://instagram.com", label: "Instagram" },
  { icon: FaXTwitter, href: "https://twitter.com", label: "X" },
  { icon: FaYoutube, href: "https://youtube.com", label: "YouTube" },
  { icon: FaLinkedinIn, href: "https://linkedin.com", label: "LinkedIn" },
];

const Footer = () => {
  const [language, setLanguage] = useState("English");
  const [openLanguageModal, setOpenLanguageModal] = useState(false);
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

  return (
    <footer className="w-full bg-white py-10 sm:py-14">
      {/* Floating Card Container */}
      <div className="container-page">
      <div className="w-full bg-[#f5f5f5] rounded-[28px] sm:rounded-[36px] border border-neutral-100 p-8 sm:p-12 lg:p-14 transition-all duration-300">
        
        {/* Main Content Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-8 items-start">
          
          {/* Brand & Description (4 Cols) */}
          <div className="lg:col-span-4 space-y-4 pr-0 lg:pr-6">
            <Link href="/" className="inline-flex items-center gap-2">
              <Image
                src="/assets/images/mongzo_logo_black.png"
                alt="Mongzo Logo"
                width={130}
                height={38}
                className="h-8 sm:h-9 w-auto object-contain"
                priority
              />
            </Link>
            <p className="text-neutral-600 text-xs sm:text-sm leading-relaxed max-w-sm">
              Mongzo is a bespoke luxury travel agency. From private escapes to
              seamless flights and luxury stays, we craft every journey with care,
              comfort, and unmatched style.
            </p>

            {/* Social Links */}
            <div className="flex items-center gap-2 pt-2">
              {socialLinks.map((social, idx) => {
                const Icon = social.icon;
                return (
                  <a
                    key={idx}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={social.label}
                    className="w-8 h-8 rounded-full border border-neutral-200 bg-neutral-50/80 flex items-center justify-center text-neutral-600 hover:text-blue-600 hover:border-blue-500 hover:bg-blue-50/50 transition-all text-xs"
                  >
                    <Icon />
                  </a>
                );
              })}
            </div>
          </div>

          {/* Right Side Links */}
          <div className="lg:col-span-8 flex flex-col sm:flex-row sm:justify-end gap-10 lg:gap-16">
            {/* Company Links */}
            <div>
              <h4 className="text-[11px] sm:text-xs font-bold text-neutral-900 uppercase tracking-[0.16em] mb-4">
                Company
              </h4>
              <ul className="space-y-2.5">
                {companyLinks.map((item, idx) => (
                  <li key={idx}>
                    <Link
                      href={item.href}
                      className="text-xs sm:text-sm text-neutral-600 hover:text-black transition-colors"
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Legal Links */}
            <div>
              <h4 className="text-[11px] sm:text-xs font-bold text-neutral-900 uppercase tracking-[0.16em] mb-4">
                Legal
              </h4>
              <ul className="space-y-2.5">
                {legalLinks.map((item, idx) => (
                  <li key={idx}>
                    <Link
                      href={item.href}
                      className="text-xs sm:text-sm text-neutral-600 hover:text-black transition-colors"
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact Us */}
            <div className="space-y-3 sm:max-w-xs">
            <h4 className="text-[11px] sm:text-xs font-bold text-neutral-900 uppercase tracking-[0.16em] mb-4">
              Contact Us
            </h4>

            {/* Email */}
            <div className="space-y-1">
              <a
                href="mailto:concierge@mongzo.com"
                className="flex items-center gap-2 text-xs sm:text-sm text-neutral-600 hover:text-blue-600 transition-colors"
              >
                <FaEnvelope className="text-neutral-400 text-xs shrink-0" />
                <span>concierge@mongzo.com</span>
              </a>
              <a
                href="mailto:support@mongzo.com"
                className="flex items-center gap-2 text-xs sm:text-sm text-neutral-600 hover:text-blue-600 transition-colors"
              >
                <FaEnvelope className="text-neutral-400 text-xs shrink-0 opacity-0" />
                <span>support@mongzo.com</span>
              </a>
            </div>

            {/* Phone */}
            <div className="space-y-1 pt-1">
              <p className="flex items-center gap-2 text-xs sm:text-sm text-neutral-600">
                <FaPhoneAlt className="text-neutral-400 text-xs shrink-0" />
                <span>+880 1711-426173</span>
              </p>
              <p className="text-xs sm:text-sm text-neutral-600 pl-5">
                +880 1971-426173
              </p>
            </div>

            {/* Address */}
            <div className="pt-2 flex items-start gap-2">
              <FaMapMarkerAlt className="text-neutral-400 text-xs shrink-0 mt-0.5" />
              <p className="text-xs sm:text-sm text-neutral-600 leading-relaxed">
                Eastern Mansion, Room # 3/7 (3rd Floor),
                <br />
                67/9 Pioneer Road, Kakrail,
                <br />
                Dhaka-1000, Bangladesh
              </p>
            </div>
            </div>
          </div>

        </div>

        {/* Bottom Bar: Copyright & Settings */}
        <div className="mt-12 pt-6 border-t border-neutral-100 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-neutral-500">
          <p>© {new Date().getFullYear()} Mongzo. All Rights Reserved.</p>

          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => setOpenLanguageModal(true)}
              className="flex items-center gap-1.5 text-xs font-medium text-neutral-500 hover:text-neutral-800 transition-colors"
            >
              <span>{language}</span>
            </button>

            <button
              type="button"
              onClick={() => setOpenCurrencyModal(true)}
              className="flex items-center gap-1.5 text-xs font-medium text-neutral-500 hover:text-neutral-800 transition-colors"
            >
              <span className="font-semibold">{selectedCurrency.code}</span>
              <span className="text-neutral-300">•</span>
              <span>{selectedCurrency.country}</span>
            </button>
          </div>
        </div>

      </div>
      </div>
      <LanguageModal
        open={openLanguageModal}
        onClose={() => setOpenLanguageModal(false)}
        selected={language}
        onSelect={(lang) => setLanguage(lang.label)}
      />
      <CurrencyModal
        open={openCurrencyModal}
        onClose={() => setOpenCurrencyModal(false)}
        selected={selectedCurrency}
        onSelect={handleCurrencySelect}
      />
    </footer>
  );
};

export default Footer;

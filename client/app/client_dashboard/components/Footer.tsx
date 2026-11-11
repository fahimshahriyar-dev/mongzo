"use client";
import React, { useState } from "react";
import Link from "next/link";
import { FaFacebookF, FaInstagram, FaXTwitter, FaYoutube, FaLinkedinIn } from "react-icons/fa6";
import { FaApple, FaGooglePlay } from "react-icons/fa";

const topDestinations = [
  { label: "Hotels in Bangladesh", href: "#" },
  { label: "Hotels in Cox's Bazar", href: "#" },
  { label: "Hotels in Dhaka", href: "#" },
  { label: "Hotels in Sylhet", href: "#" },
  { label: "Hotels in Chattogram", href: "#" },
  { label: "Hotels in Sajek Valley", href: "#" },
  { label: "Hotels in Bandarban", href: "#" },
  { label: "Hotels in Saint Martin", href: "#" },
];

const supportLinks = [
  { label: "Your bookings", href: "#" },
  { label: "Cancel booking", href: "#" },
  { label: "Refund policy", href: "#" },
  { label: "FAQs", href: "#" },
  { label: "Contact us", href: "#" },
  { label: "Review a property", href: "#" },
];

const companyLinks = [
  { label: "About us", href: "#" },
  { label: "Careers", href: "#" },
  { label: "Press", href: "#" },
  { label: "Travel blog", href: "#" },
  { label: "Deals and offers", href: "#" },
];

const partnerLinks = [
  { label: "List your property", href: "#" },
  { label: "Partner login", href: "#" },
  { label: "Affiliate program", href: "#" },
  { label: "Corporate travel", href: "#" },
];

const legalLinks = [
  { label: "Terms and conditions", href: "#" },
  { label: "Privacy policy", href: "#" },
  { label: "Cookie policy", href: "#" },
  { label: "Accessibility", href: "#" },
  { label: "Sitemap", href: "#" },
];

const socialLinks = [
  { icon: FaFacebookF, href: "https://facebook.com", label: "Facebook" },
  { icon: FaInstagram, href: "https://instagram.com", label: "Instagram" },
  { icon: FaXTwitter, href: "https://twitter.com", label: "X" },
  { icon: FaYoutube, href: "https://youtube.com", label: "YouTube" },
  { icon: FaLinkedinIn, href: "https://linkedin.com", label: "LinkedIn" },
];

const Footer = () => {
  const [email, setEmail] = useState("");
  const [language, setLanguage] = useState("English");
  const [currency, setCurrency] = useState("BDT ৳");

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    alert("Thank you for subscribing!");
    setEmail("");
  };

  return (
    <footer className="w-full bg-[#f8f6f0] text-neutral-800 pt-16 pb-12 border-t border-[#ebe6dc]">
      <div className="container-page">
        {/* Top 5-Column Navigation Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8 lg:gap-10 pb-12">
          {/* Top destinations */}
          <div>
            <h4 className="text-sm font-semibold text-neutral-900 mb-4 tracking-tight">
              Top destinations
            </h4>
            <ul className="space-y-2.5">
              {topDestinations.map((item, idx) => (
                <li key={idx}>
                  <Link
                    href={item.href}
                    className="text-xs text-neutral-700 hover:text-black hover:underline transition-colors"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* 24/7 support */}
          <div>
            <h4 className="text-sm font-semibold text-neutral-900 mb-4 tracking-tight">
              24/7 support
            </h4>
            <ul className="space-y-2.5">
              {supportLinks.map((item, idx) => (
                <li key={idx}>
                  <Link
                    href={item.href}
                    className="text-xs text-neutral-700 hover:text-black hover:underline transition-colors"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="text-sm font-semibold text-neutral-900 mb-4 tracking-tight">
              Company
            </h4>
            <ul className="space-y-2.5">
              {companyLinks.map((item, idx) => (
                <li key={idx}>
                  <Link
                    href={item.href}
                    className="text-xs text-neutral-700 hover:text-black hover:underline transition-colors"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* For partners */}
          <div>
            <h4 className="text-sm font-semibold text-neutral-900 mb-4 tracking-tight">
              For partners
            </h4>
            <ul className="space-y-2.5">
              {partnerLinks.map((item, idx) => (
                <li key={idx}>
                  <Link
                    href={item.href}
                    className="text-xs text-neutral-700 hover:text-black hover:underline transition-colors"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 className="text-sm font-semibold text-neutral-900 mb-4 tracking-tight">
              Legal
            </h4>
            <ul className="space-y-2.5">
              {legalLinks.map((item, idx) => (
                <li key={idx}>
                  <Link
                    href={item.href}
                    className="text-xs text-neutral-700 hover:text-black hover:underline transition-colors"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Middle Bar: Newsletter Subscribe, App Store buttons, Social Icons */}
        <div className="pt-8 pb-8 border-t border-[#e2dcd2] flex flex-col lg:flex-row items-center justify-between gap-6">
          {/* Newsletter Input */}
          <form onSubmit={handleSubscribe} className="flex items-center w-full sm:w-auto">
            <input
              type="email"
              placeholder="Your email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="px-4 py-2 text-xs sm:text-sm bg-white border border-neutral-300 rounded-l-md outline-none w-64 sm:w-72 focus:border-neutral-500 text-neutral-800 placeholder:text-neutral-400"
            />
            <button
              type="submit"
              className="bg-blue-600 hover:bg-blue-700 shadow-sm shadow-blue-500/20 text-white text-xs sm:text-sm font-semibold px-5 py-2 rounded-r-md transition-colors"
            >
              Subscribe
            </button>
          </form>

          {/* App download buttons */}
          <div className="flex items-center gap-3">
            <button
              type="button"
              className="flex items-center gap-2 px-3.5 py-1.5 border border-neutral-400/80 rounded-md bg-transparent hover:bg-neutral-200/50 text-xs font-medium text-neutral-800 transition-colors"
            >
              <FaApple className="text-sm" />
              <span>App Store</span>
            </button>
            <button
              type="button"
              className="flex items-center gap-2 px-3.5 py-1.5 border border-neutral-400/80 rounded-md bg-transparent hover:bg-neutral-200/50 text-xs font-medium text-neutral-800 transition-colors"
            >
              <FaGooglePlay className="text-xs" />
              <span>Google Play</span>
            </button>
          </div>

          {/* Social Icons (Circles) */}
          <div className="flex items-center gap-2.5">
            {socialLinks.map((social, idx) => {
              const Icon = social.icon;
              return (
                <a
                  key={idx}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.label}
                  className="w-7 h-7 rounded-full border border-neutral-400 flex items-center justify-center text-neutral-700 hover:text-black hover:border-black transition-colors text-xs"
                >
                  <Icon />
                </a>
              );
            })}
          </div>
        </div>

        {/* Bottom Bar: Copyright & Language / Currency Dropdowns */}
        <div className="pt-6 border-t border-[#e2dcd2] flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-neutral-500">
          <p>© 2026 Mongzo. All rights reserved.</p>

          <div className="flex items-center gap-3">
            <select
              value={language}
              onChange={(e) => setLanguage(e.target.value)}
              className="bg-transparent border border-neutral-300 rounded px-2.5 py-1 text-xs text-neutral-700 outline-none cursor-pointer hover:border-neutral-400"
            >
              <option value="English">English</option>
              <option value="Bengali">বাংলা</option>
              <option value="Arabic">العربية</option>
            </select>

            <select
              value={currency}
              onChange={(e) => setCurrency(e.target.value)}
              className="bg-transparent border border-neutral-300 rounded px-2.5 py-1 text-xs text-neutral-700 outline-none cursor-pointer hover:border-neutral-400"
            >
              <option value="BDT ৳">BDT ৳</option>
              <option value="USD $">USD $</option>
              <option value="EUR €">EUR €</option>
            </select>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;


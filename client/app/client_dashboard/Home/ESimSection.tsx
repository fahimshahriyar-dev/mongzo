"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { FaHeart, FaRegHeart, FaStar } from "react-icons/fa";

export interface ESimProduct {
  id: string;
  region: string;
  tag?: string;
  title: string;
  rating: number;
  reviewCount: string;
  bookedCount: string;
  features: string[];
  recommendNote?: string;
  originalPrice: string;
  price: string;
  discountBadge: string;
  imageUrl: string;
  badgeLabel?: string;
}

export const ESIM_PRODUCTS: ESimProduct[] = [
  {
    id: "1",
    region: "China",
    badgeLabel: "Fast-selling Wi-Fi & SIM cards",
    imageUrl: "https://images.unsplash.com/photo-1508804185872-d7badad00f7d?auto=format&fit=crop&w=600&q=80",
    title: "Mainland China 5G eSIM | Day Pass/Total Data Package | ChatGPT Available",
    rating: 4.6,
    reviewCount: "76.2k reviews",
    bookedCount: "2.3mil booked",
    features: ["Free cancellation", "Book now for today"],
    originalPrice: "$0.18",
    price: "$ 0.09",
    discountBadge: "Limited-time sale | 50% off",
  },
  {
    id: "2",
    region: "China",
    imageUrl: "https://images.unsplash.com/photo-1547981609-4b6bfe67ca0b?auto=format&fit=crop&w=600&q=80",
    title: "Mainland China 5G eSIM | Supports Google Maps / ChatGPT | Daily/Total Data",
    rating: 4.6,
    reviewCount: "34.7k reviews",
    bookedCount: "1mil booked",
    features: ["Free cancellation", "Book now for today"],
    recommendNote: "90.7% of travelers recommend",
    originalPrice: "$0.18",
    price: "$ 0.09",
    discountBadge: "Limited-time sale | 50% off",
  },
  {
    id: "3",
    region: "Europe",
    badgeLabel: "Fast-selling Wi-Fi & SIM cards",
    imageUrl: "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?auto=format&fit=crop&w=600&q=80",
    title: "European universal 5G/4G eSIM | Multi-network support, supports 45 countries",
    rating: 4.6,
    reviewCount: "13.3k reviews",
    bookedCount: "531.8k booked",
    features: ["Free cancellation", "Book now for today"],
    originalPrice: "$0.17",
    price: "$ 0.08",
    discountBadge: "Limited-time sale | 52% off",
  },
  {
    id: "4",
    region: "Korea",
    badgeLabel: "Fast-selling Wi-Fi & SIM cards",
    imageUrl: "https://images.unsplash.com/photo-1538485399081-7191377e8241?auto=format&fit=crop&w=600&q=80",
    title: "South Korea 5G eSIM | ChatGPT Available | Day Pass/Total Data Package",
    rating: 4.6,
    reviewCount: "15.3k reviews",
    bookedCount: "509.4k booked",
    features: ["Free cancellation", "Book now for today"],
    originalPrice: "$0.18",
    price: "$ 0.09",
    discountBadge: "Limited-time sale | 50% off",
  },
  {
    id: "5",
    region: "Japan",
    badgeLabel: "Fast-selling Wi-Fi & SIM cards",
    imageUrl: "https://images.unsplash.com/photo-1503899036084-c55cdd92da26?auto=format&fit=crop&w=600&q=80",
    title: "Japan SoftBank 5G Local eSIM | Japan IP • All AI & TikTok | Day Pass/Total Data",
    rating: 4.7,
    reviewCount: "13.6k reviews",
    bookedCount: "525.8k booked",
    features: ["Free cancellation", "Book now for today"],
    originalPrice: "$0.58",
    price: "$ 0.29",
    discountBadge: "Limited-time sale | 50% off",
  },
  {
    id: "6",
    region: "South Eastern Asia",
    imageUrl: "https://images.unsplash.com/photo-1552465011-b4e21bf6e79a?auto=format&fit=crop&w=600&q=80",
    title: "Thailand 5G eSIM | Supports Google Maps / ChatGPT | Daily/Total Data Package",
    rating: 4.6,
    reviewCount: "16.2k reviews",
    bookedCount: "498.1k booked",
    features: ["Free cancellation", "Book now for today"],
    recommendNote: "91.7% of travelers recommend",
    originalPrice: "$0.17",
    price: "$ 0.08",
    discountBadge: "Limited-time sale | 52% off",
  },
  {
    id: "7",
    region: "Europe",
    imageUrl: "https://images.unsplash.com/photo-1467269204594-9661b134dd2b?auto=format&fit=crop&w=600&q=80",
    title: "Europe 4G/5G eSIM | All AI & TikTok | Day Pass/Total Data Package | 43 Countries",
    rating: 4.6,
    reviewCount: "8.3k reviews",
    bookedCount: "225.9k booked",
    features: ["Free cancellation", "Book now for today"],
    recommendNote: "91.5% of travelers recommend",
    originalPrice: "$0.17",
    price: "$ 0.08",
    discountBadge: "Limited-time sale | 52% off",
  },
  {
    id: "8",
    region: "China",
    imageUrl: "https://images.unsplash.com/photo-1513622470522-26c3c8a854bc?auto=format&fit=crop&w=600&q=80",
    title: "Mainland China/Hong Kong/Macau/Taiwan 5G/4G eSIM | Supports Google Maps",
    rating: 4.5,
    reviewCount: "12.3k reviews",
    bookedCount: "374.8k booked",
    features: ["Free cancellation", "Book now for today"],
    recommendNote: "24 consecutive positive reviews",
    originalPrice: "$0.21",
    price: "$ 0.10",
    discountBadge: "Limited-time sale | 52% off",
  },
  {
    id: "9",
    region: "China",
    imageUrl: "https://images.unsplash.com/photo-1474181487882-5abf3f0ba6c2?auto=format&fit=crop&w=600&q=80",
    title: "Mainland China 5G eSIM | 3 Carriers • All AI & TikTok | 1–365 Days | High Speed",
    rating: 4.6,
    reviewCount: "10.3k reviews",
    bookedCount: "279.3k booked",
    features: ["Free cancellation", "Book now for today"],
    recommendNote: "11.438k bookings in 7 days",
    originalPrice: "$0.16",
    price: "$ 0.08",
    discountBadge: "Limited-time sale | 50% off",
  },
  {
    id: "10",
    region: "South Eastern Asia",
    imageUrl: "https://images.unsplash.com/photo-1596422846543-75c6fc197f07?auto=format&fit=crop&w=600&q=80",
    title: "Malaysia 5G eSIM | All 3 Major Networks • All AI | Day Pass / Total Data Package",
    rating: 4.5,
    reviewCount: "4.8k reviews",
    bookedCount: "177.1k booked",
    features: ["Free cancellation", "Book now for today"],
    recommendNote: "4.036k bookings in 7 days",
    originalPrice: "$0.17",
    price: "$ 0.08",
    discountBadge: "Limited-time sale | 52% off",
  },
  {
    id: "11",
    region: "China",
    imageUrl: "https://images.unsplash.com/photo-1548013146-72479768bada?auto=format&fit=crop&w=600&q=80",
    title: "Mainland China • Hong Kong • Macau 5G eSIM | 6 Carriers • All AI & TikTok",
    rating: 4.5,
    reviewCount: "7.9k reviews",
    bookedCount: "230.1k booked",
    features: ["Free cancellation", "Book now for today"],
    recommendNote: "8.56k bookings in 7 days",
    originalPrice: "$0.16",
    price: "$ 0.08",
    discountBadge: "Limited-time sale | 50% off",
  },
  {
    id: "12",
    region: "China",
    imageUrl: "https://images.unsplash.com/photo-1508248467877-aec1b08de376?auto=format&fit=crop&w=600&q=80",
    title: "Taiwan 5G eSIM | Dual Network • All AI & TikTok | 24-Hour Billing | 1-30 Days",
    rating: 4.7,
    reviewCount: "6.3k reviews",
    bookedCount: "210.6k booked",
    features: ["Free cancellation", "Book now for today"],
    recommendNote: "92.3% of travelers recommend",
    originalPrice: "$0.19",
    price: "$ 0.09",
    discountBadge: "Limited-time sale | 52% off",
  },
];

interface ESimSectionProps {
  selectedDestination: string;
}

export default function ESimSection({ selectedDestination }: ESimSectionProps) {
  const router = useRouter();
  const [favorites, setFavorites] = useState<Record<string, boolean>>({});

  const toggleFavorite = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setFavorites((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const filteredProducts =
    selectedDestination === "Global"
      ? ESIM_PRODUCTS
      : ESIM_PRODUCTS.filter(
          (p) => p.region.toLowerCase() === selectedDestination.toLowerCase()
        );

  return (
    <div className="mt-8 space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
        <div>
          <h3 className="text-xl sm:text-2xl font-bold text-neutral-900 tracking-tight">
            Popular eSIM Data Plans
          </h3>
          <p className="text-sm text-neutral-500 mt-1">
            Stay connected anywhere in the world with instant digital delivery & high-speed 5G/4G data.
          </p>
        </div>
        <span className="text-xs font-semibold px-3 py-1.5 bg-blue-50 text-blue-600 rounded-full w-fit">
          {filteredProducts.length} plans available
        </span>
      </div>

      {filteredProducts.length === 0 ? (
        <div className="bg-white rounded-2xl border border-neutral-200 p-12 text-center">
          <p className="text-neutral-500 font-medium">
            No eSIM packages currently found for &quot;{selectedDestination}&quot;.
          </p>
          <p className="text-neutral-400 text-xs mt-1">
            Try switching back to &quot;Global&quot; to see all packages.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {filteredProducts.map((card) => {
            const isFav = !!favorites[card.id];
            return (
              <div
                key={card.id}
                onClick={() => router.push(`/esim/payment?id=${encodeURIComponent(card.id)}`)}
                className="group bg-white rounded-2xl border border-neutral-200/90 hover:border-neutral-300 hover:shadow-xl transition-all duration-300 overflow-hidden flex flex-col cursor-pointer"
              >
                {/* Image Banner Header */}
                <div className="relative h-48 w-full overflow-hidden bg-neutral-100">
                  <img
                    src={card.imageUrl}
                    alt={card.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  {/* Subtle gradient overlay to make text pop */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />

                  {/* Top badges & heart button */}
                  <div className="absolute top-3 left-3 right-3 flex items-start justify-between gap-2 z-10">
                    {card.badgeLabel ? (
                      <span className="bg-[#ff4d4f] text-white text-[11px] font-semibold px-2.5 py-1 rounded-md shadow-sm">
                        {card.badgeLabel}
                      </span>
                    ) : (
                      <div />
                    )}

                    <button
                      type="button"
                      onClick={(e) => toggleFavorite(card.id, e)}
                      className="w-8 h-8 rounded-full bg-white/90 hover:bg-white text-neutral-600 hover:text-red-500 flex items-center justify-center transition-all shadow-md ml-auto"
                      aria-label="Add to wishlist"
                    >
                      {isFav ? (
                        <FaHeart className="text-red-500 text-sm" />
                      ) : (
                        <FaRegHeart className="text-neutral-600 text-sm" />
                      )}
                    </button>
                  </div>

                  {/* Visual region tag overlay on bottom-left of image */}
                  <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between">
                    <span className="text-xs font-bold text-white bg-black/40 backdrop-blur-md px-2.5 py-1 rounded-lg">
                      ⚡ 5G eSIM • {card.region}
                    </span>
                  </div>
                </div>

                {/* Content Body */}
                <div className="p-4 flex flex-col flex-1 justify-between gap-3">
                  <div>
                    {/* Title */}
                    <h4 className="text-[14px] font-semibold text-neutral-900 leading-snug line-clamp-2 group-hover:text-blue-600 transition-colors">
                      {card.title}
                    </h4>

                    {/* Rating & Reviews row */}
                    <div className="flex items-center gap-1.5 mt-2 text-xs flex-wrap">
                      <span className="font-bold text-blue-600 flex items-center gap-1">
                        <FaStar className="text-amber-400 text-[11px]" />
                        {card.rating.toFixed(1)}/5
                      </span>
                      <span className="text-neutral-500">{card.reviewCount}</span>
                      <span className="text-neutral-300">|</span>
                      <span className="text-neutral-500">{card.bookedCount}</span>
                    </div>

                    {/* Feature tags */}
                    <div className="flex items-center gap-2 mt-2 flex-wrap">
                      {card.features.map((feat, i) => (
                        <span
                          key={i}
                          className="text-[11px] font-medium text-neutral-500 bg-neutral-100/80 px-2 py-0.5 rounded"
                        >
                          {feat}
                        </span>
                      ))}
                    </div>

                    {/* Travelers recommend note */}
                    {card.recommendNote && (
                      <p className="text-[11px] font-medium text-teal-600 mt-2">
                        {card.recommendNote}
                      </p>
                    )}
                  </div>

                  {/* Pricing footer */}
                  <div className="pt-2 border-t border-neutral-100 flex flex-col items-end">
                    <div className="flex items-baseline gap-1.5">
                      <span className="text-xs text-neutral-400 line-through">
                        {card.originalPrice}
                      </span>
                      <span className="text-xs text-neutral-600 font-medium">From</span>
                      <span className="text-lg font-extrabold text-blue-600">
                        {card.price}
                      </span>
                    </div>
                    <span className="text-[11px] font-medium text-pink-600 bg-pink-50 px-2 py-0.5 rounded mt-0.5">
                      {card.discountBadge}
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

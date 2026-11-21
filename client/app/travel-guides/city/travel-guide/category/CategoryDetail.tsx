"use client";

import React from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import Navbar from "../../../../client_dashboard/components/Navbar";
import Footer from "../../../../client_dashboard/components/Footer";
import { FaArrowLeft } from "react-icons/fa";
import { ALL_CATEGORIES, getCategory } from "../categories";

const PLACE_IMAGES = [
  "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=900&q=80",
  "https://images.unsplash.com/photo-1505228395891-9a51e7e86bf6?auto=format&fit=crop&w=900&q=80",
  "https://images.unsplash.com/photo-1514282401047-d79a71a590e8?auto=format&fit=crop&w=900&q=80",
  "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=900&q=80",
  "https://images.unsplash.com/photo-1502680390469-be75c86b636f?auto=format&fit=crop&w=900&q=80",
  "https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?auto=format&fit=crop&w=900&q=80",
  "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?auto=format&fit=crop&w=900&q=80",
  "https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&w=900&q=80",
  "https://images.unsplash.com/photo-1445019980597-93fa8acb246c?auto=format&fit=crop&w=900&q=80",
  "https://images.unsplash.com/photo-1530053969600-caed2596d242?auto=format&fit=crop&w=900&q=80",
  "https://images.unsplash.com/photo-1540541338287-41700207dee6?auto=format&fit=crop&w=900&q=80",
  "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=900&q=80",
];

export default function CategoryDetail() {
  const searchParams = useSearchParams();

  const cityParam = searchParams?.get("destination") || "Cox's Bazar";
  const countryParam = searchParams?.get("country") || "Bangladesh";
  const slug = searchParams?.get("category") || "";
  const category = getCategory(slug);

  const travelGuideHref = `/travel-guides/city/travel-guide?destination=${encodeURIComponent(
    cityParam
  )}&country=${encodeURIComponent(countryParam)}`;

  const categoryHref = (categorySlug: string) =>
    `/travel-guides/city/travel-guide/category?category=${encodeURIComponent(
      categorySlug
    )}&destination=${encodeURIComponent(cityParam)}&country=${encodeURIComponent(
      countryParam
    )}`;

  return (
    <div className="min-h-screen bg-white text-neutral-900 font-Poppins flex flex-col selection:bg-blue-100 selection:text-blue-900">
      <Navbar />

      <main className="flex-1 pt-24 pb-20">
        <div className="container-page">
          <div className="pt-6">
            <Link
              href={travelGuideHref}
              className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-neutral-500 hover:text-[#2563eb] transition-colors"
            >
              <FaArrowLeft size={11} />
              <span>Back to travel guide</span>
            </Link>
          </div>

          {!category ? (
            <div className="mt-10 rounded-3xl border border-neutral-200 bg-[#f5f5f5] p-10 text-center">
              <h1 className="text-xl sm:text-2xl font-extrabold text-neutral-900">
                Category not found
              </h1>
              <p className="mt-2 text-sm text-neutral-500">
                The category you are looking for does not exist or has moved.
              </p>
              <Link
                href={travelGuideHref}
                className="mt-6 inline-flex items-center gap-2 rounded-xl bg-[#2563eb] hover:bg-[#1d4ed8] px-5 py-2.5 text-sm font-bold text-white transition-all active:scale-95"
              >
                <FaArrowLeft size={11} />
                <span>Back to travel guide</span>
              </Link>
            </div>
          ) : (
            <>
              {/* Title & Sub-Title */}
              <div className="mx-auto max-w-2xl pt-8 sm:pt-10 text-center">
                <h1 className="text-3xl sm:text-4xl font-extrabold text-neutral-900 tracking-tight">
                  {category.title}
                </h1>
                <p className="mt-2 text-sm sm:text-base font-semibold text-neutral-500">
                  {category.subtitle}
                </p>
              </div>

              {/* Category pills */}
              <div className="mt-8 flex flex-wrap items-center justify-center gap-2.5 sm:gap-3">
                {ALL_CATEGORIES.map((item) => {
                  const isActive = item.slug === category.slug;
                  return (
                    <Link
                      key={item.slug}
                      href={categoryHref(item.slug)}
                      className={`rounded-full px-4 py-2 text-xs sm:text-sm font-semibold transition-all active:scale-95 ${
                        isActive
                          ? "bg-[#2563eb] text-white shadow-md shadow-blue-500/20"
                          : "bg-neutral-100 text-neutral-600 hover:bg-neutral-200 hover:text-neutral-900"
                      }`}
                    >
                      {item.title}
                    </Link>
                  );
                })}
              </div>

              {/* Places: alternating text / image rows */}
              <div className="mt-12 sm:mt-16 space-y-12 sm:space-y-16">
                {category.places.map((place, idx) => {
                  const imageFirst = idx % 2 === 1;

                  const textBlock = (
                    <div className="w-full md:w-1/2">
                      <h2 className="text-xl sm:text-2xl font-extrabold text-neutral-900 tracking-tight leading-snug">
                        {place.title}
                      </h2>
                      <p className="mt-3 text-sm sm:text-base text-neutral-600 leading-relaxed">
                        {place.description}
                      </p>
                    </div>
                  );

                  const imageBlock = (
                    <div className="w-full md:w-1/2">
                      <div className="relative aspect-[16/10] sm:aspect-[4/3] w-full overflow-hidden rounded-2xl border border-neutral-200/80 bg-neutral-100 shadow-sm">
                        <img
                          src={PLACE_IMAGES[idx % PLACE_IMAGES.length]}
                          alt={place.title}
                          loading="lazy"
                          className="h-full w-full object-cover"
                        />
                      </div>
                    </div>
                  );

                  return (
                    <div
                      key={place.title}
                      className={`flex flex-col items-center gap-6 md:gap-12 ${
                        imageFirst ? "md:flex-row-reverse" : "md:flex-row"
                      }`}
                    >
                      {textBlock}
                      {imageBlock}
                    </div>
                  );
                })}
              </div>
            </>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}

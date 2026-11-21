"use client";

import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import Navbar from "../../../client_dashboard/components/Navbar";
import Footer from "../../../client_dashboard/components/Footer";
import {
  FaArrowLeft,
  FaChevronLeft,
  FaChevronRight,
  FaMapMarkerAlt,
} from "react-icons/fa";
import {
  EXPLORE_CATEGORIES,
  MARKET_CATEGORY,
  WHAT_TO_BUY_CATEGORY,
} from "./categories";

const HERO_IMAGE =
  "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1800&q=80";

const SEE_AND_DO = EXPLORE_CATEGORIES.map((category) => ({
  title: category.title,
  subtitle: category.subtitle,
  count: String(category.places.length),
  image: category.image,
  slug: category.slug,
}));

const FOODS = [
  {
    title: "Loitta Fry (Bombay Duck Fry)",
    description:
      "Loitta is a soft, delicate fish with a mild flavor. It is cut into pieces, coated in spiced batter or rice flour, and fried until crispy outside and tender inside. It is a popular beachside snack in Cox's Bazar, often served with a squeeze of lemon or chili sauce.",
    image:
      "https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?auto=format&fit=crop&w=900&q=80",
  },
  {
    title: "Chhuri Shutki (Ribbonfish Dry Fish)",
    description:
      "Chhuri is a long, thin ribbonfish that is sun-dried and then cooked with onions, garlic, green chilies, and spices. It has a strong, pungent aroma and an intense savory taste. Dried fish is a specialty of the Cox's Bazar coast, and chhuri shutki is one of its best-known local dishes.",
    image:
      "https://images.unsplash.com/photo-1476224203421-9ac39bcb3327?auto=format&fit=crop&w=900&q=80",
  },
  {
    title: "Koral Grill (Grilled Coral Fish)",
    description:
      "Koral (a type of sea perch or sea bass) is a firm, white-fleshed fish. It is marinated in spices, lemon, and herbs, then grilled over charcoal. The result is a smoky, juicy fish with a lightly charred skin, and it is a favorite at seaside restaurants.",
    image:
      "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?auto=format&fit=crop&w=900&q=80",
  },
  {
    title: "Crab Fry and Curry",
    description:
      "Fresh sea crabs from the Bay of Bengal are either fried with spices until crispy or simmered in a rich, spicy onion and tomato gravy. The sweet, tender crab meat pairs well with steamed rice, though eating it can be a messy, hands-on experience.",
    image:
      "https://images.unsplash.com/photo-1565680018434-b513d5e5fd47?auto=format&fit=crop&w=900&q=80",
  },
  {
    title: "Rupchanda Gravy (Pomfret Curry)",
    description:
      "Rupchanda (pomfret) is a prized flat fish with soft, mildly sweet flesh and few bones. It is cooked in a flavorful gravy of mustard, onion, and spices, and is usually served with plain rice. It is considered one of the finest fish in Bangladesh.",
    image:
      "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=900&q=80",
  },
  {
    title: "Daab Chingri (Prawns in Green Coconut)",
    description:
      "Fresh prawns are cooked with coconut milk, mustard, and spices inside a green coconut shell. The slow steaming gives a creamy, aromatic, slightly sweet curry with a distinctive coconut fragrance. It is a festive dish found at many restaurants in Cox's Bazar.",
    image:
      "https://images.unsplash.com/photo-1615141982883-c7ad0e69fd62?auto=format&fit=crop&w=900&q=80",
  },
  {
    title: "Lobster",
    description:
      "Cox's Bazar is known for fresh lobster, which is usually grilled, fried, or cooked in butter, garlic, or a spicy masala. The meat is sweet, juicy, and rich. It is a premium dish compared to other local seafood, so it is typically ordered for special meals.",
    image:
      "https://images.unsplash.com/photo-1559737558-2f5a35f4523b?auto=format&fit=crop&w=900&q=80",
  },
  {
    title: "Shutki Bhorta (Dry Fish Mash)",
    description:
      "Dried fish is roasted or fried, then mashed with onions, garlic, green chilies, and mustard oil. This spicy, earthy side dish has a bold flavor that goes very well with hot rice. It is a traditional comfort food of coastal Bangladesh.",
    image:
      "https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=900&q=80",
  },
  {
    title: "Surma Fish Curry (Seer Fish Curry)",
    description:
      "Surma (also called seer or king mackerel) is a meaty, firm fish with a rich flavor. It is cut into steaks and cooked in a thick, spiced gravy with onion, garlic, ginger, and turmeric. It is hearty and filling, and is best enjoyed with rice.",
    image:
      "https://images.unsplash.com/photo-1467003909585-2f8a72700288?auto=format&fit=crop&w=900&q=80",
  },
];

const SHOPPING = [
  {
    title: "Where to shop",
    subtitle: MARKET_CATEGORY.subtitle,
    count: String(MARKET_CATEGORY.places.length),
    image: MARKET_CATEGORY.image,
    slug: MARKET_CATEGORY.slug,
  },
  {
    title: "What to buy",
    subtitle: WHAT_TO_BUY_CATEGORY.subtitle,
    count: String(WHAT_TO_BUY_CATEGORY.places.length),
    image: WHAT_TO_BUY_CATEGORY.image,
    slug: WHAT_TO_BUY_CATEGORY.slug,
  },
];

const USEFUL_INFO = [
  {
    title: "Best Time to Visit",
    subtitle:
      "November to March is the best time to visit. Days are comfortable at 22°C to 28°C, humidity is low, and the sea is calm for boat trips to Maheshkhali and Saint Martin's Island.",
    count: "",
    image:
      "https://images.unsplash.com/photo-1470252649378-9c29740c9fa8?auto=format&fit=crop&w=800&q=80",
  },
  {
    title: "Local Transportation",
    subtitle:
      "Getting around is mainly by CNG auto-rickshaw, motorbike or Jeep along Marine Drive, and by boat to islands such as Maheshkhali and Kutubdia.",
    count: "",
    image:
      "https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?auto=format&fit=crop&w=800&q=80",
  },
  {
    title: "Beach Safety",
    subtitle:
      "Strong undercurrents and sudden rip tides are common. Swim only in flagged zones watched by Sea Safe Lifeguards, and never enter the water when a red flag is up.",
    count: "",
    image:
      "https://images.unsplash.com/photo-1530053969600-caed2596d242?auto=format&fit=crop&w=800&q=80",
  },
  {
    title: "Photography Tips",
    subtitle:
      "Sunrise and sunset give the best light, and Himchari and Inani are especially scenic. Ask permission before photographing locals, and protect your gear from sand and salt spray.",
    count: "",
    image:
      "https://images.unsplash.com/photo-1452780212940-6f5c0d14d848?auto=format&fit=crop&w=800&q=80",
  },
  {
    title: "Cash & Connectivity",
    subtitle:
      "Major hotels and upscale restaurants accept cards and mobile payments. Carry small BDT notes for street food, Tomtoms and markets. 4G works reliably in town and along most of Marine Drive.",
    count: "",
    image:
      "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?auto=format&fit=crop&w=800&q=80",
  },
  {
    title: "Taking Fresh Fish Home",
    subtitle:
      "Buy fish from Fishery Ghat, ask the seller to clean it, and pack it in an airtight Styrofoam box layered with ice. Buy your fish last, just before departure.",
    count: "",
    image:
      "https://images.unsplash.com/photo-1534483509719-3feaee7c30da?auto=format&fit=crop&w=800&q=80",
  },
  {
    title: "Quick Packing Checklist",
    subtitle:
      "Pack sunscreen, sunglasses, a hat, light cotton clothes, swimwear, a quick-dry towel, sandals, a power bank and a rain jacket or umbrella.",
    count: "",
    image:
      "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=800&q=80",
  },
  {
    title: "Final Tips",
    subtitle:
      "Make the most of your trip with a relaxed, flexible plan. Compare prices before buying, check the weather and sea conditions before boat trips, and drink plenty of water.",
    count: "",
    image:
      "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=800&q=80",
  },
  {
    title: "Mistakes People Make",
    subtitle:
      "Avoid swimming outside flagged zones, not agreeing on fares first, buying without comparing prices, and booking hotels late for winter weekends and holidays.",
    count: "",
    image:
      "https://images.unsplash.com/photo-1508672019048-805c876b67e2?auto=format&fit=crop&w=800&q=80",
  },
];

interface SquareCardItem {
  title: string;
  subtitle: string;
  count: string;
  image: string;
  slug?: string;
}

const ITEMS_PER_ROW = 4;
const INITIAL_ROWS = 2;

function SquareCardsGrid({
  items,
  city,
  country,
}: {
  items: SquareCardItem[];
  city: string;
  country: string;
}) {
  const [visibleRows, setVisibleRows] = useState(INITIAL_ROWS);

  const visibleCount = visibleRows * ITEMS_PER_ROW;
  const visibleItems = items.slice(0, visibleCount);
  const hasMore = items.length > visibleCount;

  return (
    <>
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        {visibleItems.map((item) => {
          const card = (
            <div className="group relative aspect-square overflow-hidden rounded-2xl border border-neutral-200/80 shadow-sm hover:shadow-lg hover:border-[#2563eb]/40 transition-all">
              <img
                src={item.image}
                alt={item.title}
                loading="lazy"
                className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/45 to-black/20" />

              <div className="relative z-10 flex h-full flex-col justify-between p-4 sm:p-5 text-white">
                <div>
                  <h3 className="text-sm sm:text-base lg:text-lg font-bold leading-snug">
                    {item.title}
                  </h3>
                  <p className="mt-1.5 text-[11px] sm:text-xs leading-relaxed text-white/85 line-clamp-3">
                    {item.subtitle}
                  </p>
                </div>

                <div className="mt-4 flex items-end justify-between gap-2">
                  {item.count ? (
                    <span className="text-lg sm:text-xl font-extrabold leading-none text-white">
                      {item.count}
                    </span>
                  ) : (
                    <span />
                  )}
                  <span className="shrink-0 rounded-full bg-white/95 group-hover:bg-white px-3 py-1.5 text-[10px] sm:text-xs font-bold text-[#2563eb] transition-colors">
                    View details
                  </span>
                </div>
              </div>
            </div>
          );

          if (!item.slug) {
            return <div key={item.title}>{card}</div>;
          }

          return (
            <Link
              key={item.title}
              href={`/travel-guides/city/travel-guide/category?category=${encodeURIComponent(
                item.slug
              )}&destination=${encodeURIComponent(city)}&country=${encodeURIComponent(
                country
              )}`}
              className="block"
            >
              {card}
            </Link>
          );
        })}
      </div>

      {hasMore && (
        <div className="mt-8 flex justify-center">
          <button
            type="button"
            onClick={() => setVisibleRows((rows) => rows + 2)}
            className="inline-flex items-center justify-center px-6 py-2.5 rounded-full bg-[#2563eb] hover:bg-[#1d4ed8] text-white text-sm font-semibold transition-all active:scale-95 shadow-md shadow-blue-500/20"
          >
            See more
          </button>
        </div>
      )}
    </>
  );
}

const SectionHeading = ({
  eyebrow,
  title,
  subtitle,
}: {
  eyebrow: string;
  title: string;
  subtitle: string;
}) => (
  <div className="max-w-3xl mx-auto text-center mb-8">
    <span className="text-xs uppercase font-bold text-[#2563eb] tracking-wider block mb-1">
      {eyebrow}
    </span>
    <h2 className="text-2xl sm:text-3xl font-extrabold text-neutral-900 tracking-tight">
      {title}
    </h2>
    <p className="text-sm sm:text-base text-neutral-500 mt-2 leading-relaxed">
      {subtitle}
    </p>
  </div>
);

export default function TravelGuide() {
  const searchParams = useSearchParams();

  const cityParam = searchParams?.get("destination") || "Cox's Bazar";
  const countryParam = searchParams?.get("country") || "Bangladesh";

  const foodScrollerRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);

  const updateFoodScrollState = () => {
    const scroller = foodScrollerRef.current;
    if (!scroller) return;

    setCanScrollLeft(scroller.scrollLeft > 1);
    setCanScrollRight(
      scroller.scrollLeft + scroller.clientWidth < scroller.scrollWidth - 1
    );
  };

  useEffect(() => {
    updateFoodScrollState();
    window.addEventListener("resize", updateFoodScrollState);
    return () => window.removeEventListener("resize", updateFoodScrollState);
  }, []);

  const scrollFoods = (direction: "left" | "right") => {
    const scroller = foodScrollerRef.current;
    if (!scroller) return;

    const card = scroller.querySelector<HTMLElement>("[data-food-card]");
    const step = card ? card.offsetWidth + 24 : Math.round(scroller.clientWidth * 0.85);

    scroller.scrollBy({
      left: direction === "left" ? -step : step,
      behavior: "smooth",
    });
  };

  return (
    <div className="min-h-screen bg-white text-neutral-900 font-Poppins flex flex-col selection:bg-blue-100 selection:text-blue-900">
      <Navbar />

      <main className="flex-1 pt-24 pb-20">
        <div className="container-page">
          {/* Breadcrumb & back link */}
          <div className="pt-6 pb-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
            <div className="flex items-center gap-2 text-xs text-neutral-500 font-medium">
              <Link
                href="/travel-guides/suggestions"
                className="hover:text-[#2563eb] transition-colors"
              >
                Travel Guides
              </Link>
              <span>/</span>
              <span>{cityParam}</span>
              <span>/</span>
              <span className="text-neutral-800 font-semibold">Travel Guide</span>
            </div>

            <Link
              href={`/travel-guides/city?destination=${encodeURIComponent(
                cityParam
              )}&country=${encodeURIComponent(countryParam)}`}
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-neutral-100 hover:bg-neutral-200 text-neutral-800 text-xs sm:text-sm font-semibold transition-all active:scale-95"
            >
              <FaArrowLeft size={11} className="text-[#2563eb]" />
              <span>Back to {cityParam}</span>
            </Link>
          </div>

          {/* ========================================================= */}
          {/* 1. HERO                                                    */}
          {/* ========================================================= */}
          <section className="relative overflow-hidden rounded-[28px] sm:rounded-[36px] border border-neutral-200/80 shadow-sm">
            <img
              src={HERO_IMAGE}
              alt={`${cityParam} travel guide`}
              className="absolute inset-0 h-full w-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-black/75 via-black/50 to-black/25" />

            <div className="relative flex min-h-[420px] sm:min-h-[500px] items-center justify-center px-6 py-16 text-center">
              <div className="max-w-2xl text-white">
                <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/15 border border-white/30 backdrop-blur-md text-[11px] font-bold uppercase tracking-wider">
                  <FaMapMarkerAlt size={10} />
                  <span>{countryParam}</span>
                </span>
                <h1 className="mt-5 text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight leading-tight">
                  {cityParam}
                </h1>
                <p className="mt-2 text-sm sm:text-base font-semibold text-white/90">
                  Where the world&apos;s longest sea beach meets the Bay of Bengal
                </p>
                <p className="mt-5 text-sm sm:text-base leading-relaxed text-white/85">
                  Cox&apos;s Bazar is one of the best places to visit in Bangladesh
                  and home to one of the longest natural sea beaches in the world,
                  stretching over 100 km. This travel guide covers the best
                  beaches, hills, temples, beach activities, local food, shopping
                  and practical tips, so you can enjoy sunsets, fresh seafood and
                  easy beach stays on a family or group trip.
                </p>
              </div>
            </div>
          </section>

          {/* ========================================================= */}
          {/* 2. WHAT TO SEE & DO                                        */}
          {/* ========================================================= */}
          <section className="pt-14">
            <SectionHeading
              eyebrow="Explore"
              title={`What to see & do in ${cityParam}`}
              subtitle="From golden sands and rolling hills to wildlife and watersports, the coast is packed with experiences for every kind of traveler."
            />

            <SquareCardsGrid
              items={SEE_AND_DO}
              city={cityParam}
              country={countryParam}
            />
          </section>

          {/* ========================================================= */}
          {/* 3. WHAT TO EAT                                             */}
          {/* ========================================================= */}
          <section className="pt-14 mt-14 border-t border-neutral-200">
            <SectionHeading
              eyebrow="Taste the coast"
              title={`What to eat in ${cityParam}`}
              subtitle="Fresh from the Bay of Bengal — seafood, dry fish and coastal classics you should not leave without trying."
            />

            <div className="relative px-8 sm:px-12">
              <button
                type="button"
                onClick={() => scrollFoods("left")}
                disabled={!canScrollLeft}
                aria-label="Previous foods"
                className="absolute left-0 top-1/2 z-20 -translate-y-1/2 flex h-10 w-10 items-center justify-center rounded-full bg-white text-[#2563eb] border border-neutral-200 shadow-md hover:bg-[#2563eb] hover:text-white transition-all active:scale-95 disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:bg-white disabled:hover:text-[#2563eb] disabled:active:scale-100"
              >
                <FaChevronLeft size={14} />
              </button>

              <div
                ref={foodScrollerRef}
                onScroll={updateFoodScrollState}
                className="flex gap-6 overflow-x-auto snap-x snap-mandatory scroll-smooth no-scrollbar pb-2"
              >
                {FOODS.map((food, idx) => {
                  const imageFirst = idx % 2 === 1;

                  const imageBlock = (
                    <div className="relative aspect-[4/3] w-full overflow-hidden bg-neutral-100">
                      <img
                        src={food.image}
                        alt={food.title}
                        loading="lazy"
                        className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                    </div>
                  );

                  const textBlock = (
                    <div className="p-6 flex-1">
                      <h3 className="text-base sm:text-lg font-bold text-neutral-900 leading-snug">
                        {food.title}
                      </h3>
                      <p className="text-xs sm:text-sm text-neutral-600 mt-2 leading-relaxed">
                        {food.description}
                      </p>
                    </div>
                  );

                  return (
                    <div
                      key={food.title}
                      data-food-card
                      className="group flex w-[85%] shrink-0 snap-start flex-col overflow-hidden rounded-3xl bg-white border border-neutral-200/80 shadow-sm hover:shadow-lg hover:border-[#2563eb]/30 transition-all sm:w-[48%] lg:w-[38%] xl:w-[31%]"
                    >
                      {imageFirst ? (
                        <>
                          {imageBlock}
                          {textBlock}
                        </>
                      ) : (
                        <>
                          {textBlock}
                          {imageBlock}
                        </>
                      )}
                    </div>
                  );
                })}
              </div>

              <button
                type="button"
                onClick={() => scrollFoods("right")}
                disabled={!canScrollRight}
                aria-label="Next foods"
                className="absolute right-0 top-1/2 z-20 -translate-y-1/2 flex h-10 w-10 items-center justify-center rounded-full bg-white text-[#2563eb] border border-neutral-200 shadow-md hover:bg-[#2563eb] hover:text-white transition-all active:scale-95 disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:bg-white disabled:hover:text-[#2563eb] disabled:active:scale-100"
              >
                <FaChevronRight size={14} />
              </button>
            </div>
          </section>

          {/* ========================================================= */}
          {/* 4. WHERE TO SHOP & WHAT TO BUY                             */}
          {/* ========================================================= */}
          <section className="pt-14 mt-14 border-t border-neutral-200">
            <SectionHeading
              eyebrow="Take a piece home"
              title={`Where to shop & what to buy in ${cityParam}`}
              subtitle="Markets and beachside stalls are full of local character — here is where to look and what is worth bringing back."
            />

            <SquareCardsGrid
              items={SHOPPING}
              city={cityParam}
              country={countryParam}
            />
          </section>

          {/* ========================================================= */}
          {/* 5. USEFUL INFORMATION                                      */}
          {/* ========================================================= */}
          <section className="pt-14 mt-14 border-t border-neutral-200">
            <SectionHeading
              eyebrow="Before you go"
              title="Useful Information"
              subtitle="Practical tips to help you travel smarter, safer and easier around Cox's Bazar."
            />

            <SquareCardsGrid
              items={USEFUL_INFO}
              city={cityParam}
              country={countryParam}
            />
          </section>
        </div>
      </main>

      <Footer />
    </div>
  );
}

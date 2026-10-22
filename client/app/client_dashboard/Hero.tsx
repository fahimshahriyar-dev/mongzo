"use client";
import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const FRAME_COUNT = 300;

const frameSrc = (index: number) =>
  `/assets/scroll_animation/ezgif-frame-${String(index + 1).padStart(3, "0")}.jpg`;

const Hero = () => {
  const sectionRef = useRef<HTMLElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const centerBrandRef = useRef<HTMLDivElement | null>(null);
  const topLeftRef = useRef<HTMLDivElement | null>(null);
  const topRightRef = useRef<HTMLDivElement | null>(null);
  const bottomLeftRef = useRef<HTMLDivElement | null>(null);
  const bottomRightRef = useRef<HTMLDivElement | null>(null);
  const actionButtonRef = useRef<HTMLDivElement | null>(null);

  // Stage 2 (Travel Agency Paragraph & Features)
  const stage2Ref = useRef<HTMLDivElement | null>(null);

  // Stage 3 (Bottom blurred destination cards)
  const stage3Ref = useRef<HTMLDivElement | null>(null);

  // Search widget tabs
  const [activeTab, setActiveTab] = useState<"flights" | "packages" | "hotels" | "cars">("flights");

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const section = sectionRef.current;
    const canvas = canvasRef.current;
    if (!section || !canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    ctx.imageSmoothingEnabled = true;
    ctx.imageSmoothingQuality = "high";

    const frames: HTMLImageElement[] = Array.from({ length: FRAME_COUNT }, (_, index) => {
      const image = new Image();
      image.src = frameSrc(index);
      return image;
    });

    let currentFrame = 0;

    const draw = (index: number) => {
      const image = frames[index];
      if (!image?.complete || image.naturalWidth === 0) return;

      const canvasWidth = canvas.width;
      const canvasHeight = canvas.height;
      const imageRatio = image.naturalWidth / image.naturalHeight;
      const canvasRatio = canvasWidth / canvasHeight;

      let drawWidth = canvasWidth;
      let drawHeight = canvasHeight;
      let offsetX = 0;
      let offsetY = 0;

      if (imageRatio > canvasRatio) {
        drawWidth = canvasHeight * imageRatio;
        offsetX = (canvasWidth - drawWidth) / 2;
      } else {
        drawHeight = canvasWidth / imageRatio;
        offsetY = (canvasHeight - drawHeight) / 2;
      }

      ctx.clearRect(0, 0, canvasWidth, canvasHeight);
      ctx.drawImage(
        image,
        Math.round(offsetX),
        Math.round(offsetY),
        Math.round(drawWidth),
        Math.round(drawHeight)
      );
    };

    const resize = () => {
      const dpr = window.devicePixelRatio || 1;
      canvas.width = Math.round(window.innerWidth * dpr);
      canvas.height = Math.round(window.innerHeight * dpr);
      draw(currentFrame);
    };

    frames.forEach((image, index) => {
      image.addEventListener(
        "load",
        () => {
          if (index === currentFrame) draw(index);
        },
        { once: true }
      );
    });

    resize();
    window.addEventListener("resize", resize);

    const playhead = { frame: 0 };
    const tween = gsap.to(playhead, {
      frame: FRAME_COUNT - 1,
      ease: "none",
      scrollTrigger: {
        trigger: section,
        start: "top top",
        end: "bottom bottom",
        scrub: 0.8,
      },
      onUpdate: () => {
        const frame = Math.round(playhead.frame);
        if (frame !== currentFrame) {
          currentFrame = frame;
          draw(frame);
        }
      },
    });

    // MASTER OVERLAY TIMELINE (0 to 100% of section scroll)
    const masterTl = gsap.timeline({
      scrollTrigger: {
        trigger: section,
        start: "top top",
        end: "bottom bottom",
        scrub: 0.8,
      },
    });

    // ==========================================
    // STAGE 1 (0% -> 25%): Hero elements fly out
    // ==========================================
    if (centerBrandRef.current) {
      masterTl.to(
        centerBrandRef.current,
        {
          y: () => -(window.innerHeight * 0.5 - 40),
          scale: 0.88,
          opacity: 1,
          ease: "power2.out",
          duration: 0.22,
        },
        0
      );
    }

    if (topLeftRef.current) {
      masterTl.to(
        topLeftRef.current,
        {
          x: "-120vw",
          scale: 1.25,
          opacity: 0,
          ease: "power2.inOut",
          duration: 0.22,
        },
        0
      );
    }

    if (topRightRef.current) {
      masterTl.to(
        topRightRef.current,
        {
          x: "120vw",
          scale: 1.25,
          opacity: 0,
          ease: "power2.inOut",
          duration: 0.22,
        },
        0
      );
    }

    if (bottomLeftRef.current) {
      masterTl.to(
        bottomLeftRef.current,
        {
          x: "-120vw",
          scale: 1.2,
          opacity: 0,
          ease: "power2.inOut",
          duration: 0.22,
        },
        0
      );
    }

    if (bottomRightRef.current) {
      masterTl.to(
        bottomRightRef.current,
        {
          x: "120vw",
          scale: 1.15,
          opacity: 0,
          ease: "power2.inOut",
          duration: 0.22,
        },
        0
      );
    }

    if (actionButtonRef.current) {
      masterTl.to(
        actionButtonRef.current,
        {
          y: "200px",
          opacity: 0,
          ease: "power2.inOut",
          duration: 0.18,
        },
        0
      );
    }

    // ==========================================
    // STAGE 2 (25% -> 58%): Clouds & Travel Agency Statement
    // ==========================================
    if (stage2Ref.current) {
      // Fade in & slide up into view
      masterTl.fromTo(
        stage2Ref.current,
        { y: 70, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.14, ease: "power2.out" },
        0.26
      );

      // Stay visible for a moment
      masterTl.to(
        stage2Ref.current,
        { y: -80, opacity: 0, duration: 0.14, ease: "power2.in" },
        0.48
      );
    }

    // ==========================================
    // STAGE 3 (58% -> 100%): Burj Khalifa + White Blur Destination Cards
    // ==========================================
    if (stage3Ref.current) {
      masterTl.fromTo(
        stage3Ref.current,
        { y: "115%", opacity: 0 },
        { y: "0%", opacity: 1, duration: 0.28, ease: "power2.out" },
        0.60
      );
    }

    return () => {
      tween.scrollTrigger?.kill();
      tween.kill();
      masterTl.scrollTrigger?.kill();
      masterTl.kill();
      window.removeEventListener("resize", resize);
    };
  }, []);

  const destinations = [
    {
      name: "Burj Khalifa & Downtown",
      country: "Dubai, UAE",
      rating: "4.9",
      tag: "Iconic Skyline",
      price: "$1,850",
      image:
        "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&w=700&q=80",
    },
    {
      name: "Santorini Caldera",
      country: "Cyclades, Greece",
      rating: "5.0",
      tag: "Island Retreat",
      price: "$2,400",
      image:
        "https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?auto=format&fit=crop&w=700&q=80",
    },
    {
      name: "Amalfi Coastline",
      country: "Campania, Italy",
      rating: "4.8",
      tag: "Mediterranean",
      price: "$2,150",
      image:
        "https://images.unsplash.com/photo-1533105079780-92b9be482077?auto=format&fit=crop&w=700&q=80",
    },
    {
      name: "Mount Fuji & Five Lakes",
      country: "Honshu, Japan",
      rating: "4.9",
      tag: "Nature & Zen",
      price: "$2,800",
      image:
        "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&w=700&q=80",
    },
    {
      name: "Maldives Private Atolls",
      country: "Maldives",
      rating: "5.0",
      tag: "Luxury Overwater",
      price: "$3,600",
      image:
        "https://images.unsplash.com/photo-1514282401047-d79a71a590e8?auto=format&fit=crop&w=700&q=80",
    },
    {
      name: "Swiss Alpine Valleys",
      country: "Zermatt, Switzerland",
      rating: "4.9",
      tag: "Glacier Peak",
      price: "$2,950",
      image:
        "https://images.unsplash.com/photo-1530122037265-a5f1f91d3b99?auto=format&fit=crop&w=700&q=80",
    },
    {
      name: "Bali Jungle Sanctuary",
      country: "Ubud, Indonesia",
      rating: "4.9",
      tag: "Tropical Haven",
      price: "$1,450",
      image:
        "https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=700&q=80",
    },
    {
      name: "Cappadocia Hot Air Balloon",
      country: "Nevsehir, Turkey",
      rating: "4.8",
      tag: "Fairy Chimneys",
      price: "$1,720",
      image:
        "https://images.unsplash.com/photo-1507652313519-d4e9174996dd?auto=format&fit=crop&w=700&q=80",
    },
  ];

  return (
    <section ref={sectionRef} className="relative h-[480vh] bg-[#1a1410]">
      <div className="sticky top-0 h-screen w-full overflow-hidden bg-[#18130f] select-none">
        {/* Background Canvas for Airplane Window Scroll Animation */}
        <canvas ref={canvasRef} className="absolute inset-0 h-full w-full object-cover" />

        {/* Ambient Vignette & Gradient Overlays */}
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/45 via-transparent to-black/30" />
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_40%,rgba(20,15,12,0.45)_90%)]" />

        {/* Center Airplane Window Branding: Mongzo (animates up to navbar center) */}
        <div
          ref={centerBrandRef}
          className="absolute inset-0 z-30 flex items-center justify-center pointer-events-none origin-center"
        >
          <span className="font-orbitron text-xs sm:text-sm md:text-[15px] tracking-[0.25em] text-white/90 font-medium uppercase drop-shadow-[0_2px_10px_rgba(0,0,0,0.7)]">
            Mongzo
          </span>
        </div>

        {/* ================= STAGE 1: INITIAL HERO OVERLAY ================= */}
        <div className="absolute inset-0 z-10 pointer-events-none px-6 md:px-12 lg:px-16 xl:px-20">
          {/* Top-Left Title: "We are movement" */}
          <div
            ref={topLeftRef}
            className="absolute top-[18%] md:top-[19%] left-6 md:left-12 lg:left-16 xl:left-20 max-w-[280px] sm:max-w-md md:max-w-lg lg:max-w-xl origin-top-left will-change-transform"
          >
            <h1 className="font-orbitron text-[34px] sm:text-[46px] md:text-[56px] lg:text-[68px] xl:text-[76px] font-bold text-white leading-[0.94] tracking-tight drop-shadow-lg">
              We are<br />movement
            </h1>
          </div>

          {/* Lower-Right Title: "We are distinction" */}
          <div
            ref={topRightRef}
            className="absolute top-[57%] md:top-[58%] right-6 md:right-12 lg:right-16 xl:right-20 text-right max-w-[280px] sm:max-w-md md:max-w-lg lg:max-w-xl origin-top-right will-change-transform"
          >
            <h2 className="font-orbitron text-[34px] sm:text-[46px] md:text-[56px] lg:text-[68px] xl:text-[76px] font-bold text-white leading-[0.94] tracking-tight drop-shadow-lg">
              We are<br />distinction
            </h2>
          </div>

          {/* Bottom-Left: "Your freedom to enjoy life" */}
          <div
            ref={bottomLeftRef}
            className="absolute bottom-8 sm:bottom-10 md:bottom-12 left-6 md:left-12 lg:left-16 xl:left-20 max-w-[220px] sm:max-w-[260px] md:max-w-[310px] text-left origin-bottom-left will-change-transform"
          >
            <h3 className="font-orbitron text-sm sm:text-base md:text-[18px] lg:text-[21px] font-bold text-white leading-[1.25] tracking-tight mb-3">
              Your<br />freedom to<br />enjoy life
            </h3>
            <div className="w-6 sm:w-8 h-[1px] bg-white/50 mb-3" />
            <p className="text-white/75 text-[10px] sm:text-[11px] md:text-xs leading-[1.5] font-light">
              Every flight is designed around your comfort, time, and ambitions — so you can focus on what truly matters, while we take care of everything else.
            </p>
          </div>

          {/* Bottom-Right: Scroll Down / To Start The Journey */}
          <div
            ref={bottomRightRef}
            className="absolute bottom-8 sm:bottom-10 md:bottom-12 right-6 md:right-12 lg:right-16 xl:right-20 flex flex-col items-end text-right origin-bottom-right will-change-transform"
          >
            <div className="flex items-center gap-3 sm:gap-4 text-[9px] sm:text-[10px] md:text-[11px] tracking-[0.2em] text-white/90 uppercase font-orbitron">
              <div className="flex items-center gap-1.5 opacity-90">
                <span className="text-[10px] animate-bounce">↓</span>
                <span>Scroll Down</span>
              </div>
              <span className="opacity-30">|</span>
              <span className="text-white/60">To Start The Journey</span>
            </div>
            <div className="w-56 sm:w-72 md:w-80 h-[1px] bg-white/25 mt-2.5" />
          </div>
        </div>

        {/* Floating Center-Bottom Action Pill Button */}
        <div
          ref={actionButtonRef}
          className="absolute bottom-6 sm:bottom-8 left-1/2 -translate-x-1/2 z-20 pointer-events-auto will-change-transform"
        >
          <button className="flex items-center gap-3 bg-white hover:bg-neutral-100 text-neutral-900 rounded-full pl-5 pr-1.5 py-1.5 font-orbitron text-[11px] sm:text-xs font-semibold tracking-wide shadow-2xl hover:shadow-white/10 hover:scale-105 active:scale-95 transition-all duration-300">
            <span>Book the Flight</span>
            <span className="w-6 h-6 sm:w-7 sm:h-7 rounded-full bg-neutral-900 text-white flex items-center justify-center text-[10px] sm:text-xs">
              ✈
            </span>
          </button>
        </div>

        {/* ================= STAGE 2: CLOUDS & TRAVEL AGENCY STATEMENT ================= */}
        <div
          ref={stage2Ref}
          className="absolute inset-0 z-20 flex flex-col justify-between px-6 md:px-14 lg:px-20 pt-28 pb-12 opacity-0 pointer-events-none select-none"
        >
          {/* Main Large Statement */}
          <div className="max-w-5xl mt-6 md:mt-12">
            <h2 className="font-orbitron text-2xl sm:text-4xl md:text-5xl lg:text-[3.4rem] font-bold text-white leading-[1.18] tracking-tight drop-shadow-[0_4px_16px_rgba(0,0,0,0.6)]">
              <span className="text-white">Mongzo</span>
              <sup className="text-xs sm:text-sm md:text-base ml-1.5 border border-white/60 rounded-full px-1.5 py-0.5 align-top">
                ®
              </sup>{" "}
              is a bespoke luxury travel agency and private aviation network with
              over 12,000 journeys curated across 160+ countries. From private island escapes to seamless transcontinental voyages, our travelers trust us to deliver extraordinary experiences, every time.
            </h2>
          </div>

          {/* Bottom Features Row matching 2nd image */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-8 border-t border-white/20">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full border border-white/40 flex items-center justify-center text-white text-xs">
                🌐
              </div>
              <div>
                <p className="font-orbitron text-[11px] sm:text-xs font-semibold text-white uppercase tracking-wider">
                  Mongzo Travel
                </p>
                <p className="text-[10px] sm:text-[11px] text-white/70">
                  Global Curated Journeys
                </p>
              </div>
            </div>

            <div>
              <p className="font-orbitron text-[11px] sm:text-xs font-semibold text-white uppercase tracking-wider mb-1">
                Direct Access To World
              </p>
              <p className="text-[10px] sm:text-[11px] text-white/70 leading-relaxed">
                Exclusive villas, private aircraft & round-the-clock concierge.
              </p>
            </div>

            <div>
              <p className="font-orbitron text-[11px] sm:text-xs font-semibold text-white uppercase tracking-wider mb-1">
                Your Freedom to Enjoy Life
              </p>
              <p className="text-[10px] sm:text-[11px] text-white/70 leading-relaxed">
                Bespoke itineraries crafted around your passions and pace.
              </p>
            </div>
          </div>
        </div>

        {/* ================= STAGE 3: BURJ KHALIFA & WHITE BLUR DESTINATION CARDS ================= */}
        <div
          ref={stage3Ref}
          className="absolute inset-x-0 bottom-0 z-30 px-3 sm:px-6 md:px-10 lg:px-12 pb-5 sm:pb-8 opacity-0 pointer-events-auto"
        >
          {/* Larger White Frosted Glass Panel */}
          <div className="bg-white/85 backdrop-blur-2xl border border-white/90 rounded-[28px] sm:rounded-[36px] p-5 sm:p-7 md:p-8 shadow-[0_25px_70px_rgba(0,0,0,0.35)] text-neutral-900 transition-all duration-300">
            {/* Top Search Widget Header Tabs matching user screenshot */}
            <div className="flex flex-col gap-4 pb-5 border-b border-neutral-200/80">
              {/* Category Navigation (Flights, Packages, Hotels, Cars) */}
              <div className="flex items-center justify-center gap-8 sm:gap-12 border-b border-neutral-200/60 pb-3">
                <button
                  type="button"
                  onClick={() => setActiveTab("flights")}
                  className={`flex flex-col items-center gap-1 text-xs font-semibold tracking-wide transition-all relative pb-2 ${
                    activeTab === "flights"
                      ? "text-blue-600 font-bold"
                      : "text-neutral-500 hover:text-neutral-900"
                  }`}
                >
                  <span className="text-lg">✈</span>
                  <span>Flights</span>
                  {activeTab === "flights" && (
                    <span className="absolute bottom-0 w-8 h-[2.5px] bg-blue-600 rounded-full" />
                  )}
                </button>

                <button
                  type="button"
                  onClick={() => setActiveTab("packages")}
                  className={`flex flex-col items-center gap-1 text-xs font-semibold tracking-wide transition-all relative pb-2 ${
                    activeTab === "packages"
                      ? "text-blue-600 font-bold"
                      : "text-neutral-500 hover:text-neutral-900"
                  }`}
                >
                  <span className="text-lg">🏖</span>
                  <span>Packages</span>
                  {activeTab === "packages" && (
                    <span className="absolute bottom-0 w-8 h-[2.5px] bg-blue-600 rounded-full" />
                  )}
                </button>

                <button
                  type="button"
                  onClick={() => setActiveTab("hotels")}
                  className={`flex flex-col items-center gap-1 text-xs font-semibold tracking-wide transition-all relative pb-2 ${
                    activeTab === "hotels"
                      ? "text-blue-600 font-bold"
                      : "text-neutral-500 hover:text-neutral-900"
                  }`}
                >
                  <span className="text-lg">🏨</span>
                  <span>Hotels</span>
                  {activeTab === "hotels" && (
                    <span className="absolute bottom-0 w-8 h-[2.5px] bg-blue-600 rounded-full" />
                  )}
                </button>

                <button
                  type="button"
                  onClick={() => setActiveTab("cars")}
                  className={`flex flex-col items-center gap-1 text-xs font-semibold tracking-wide transition-all relative pb-2 ${
                    activeTab === "cars"
                      ? "text-blue-600 font-bold"
                      : "text-neutral-500 hover:text-neutral-900"
                  }`}
                >
                  <span className="text-lg">🚗</span>
                  <span>Cars</span>
                  {activeTab === "cars" && (
                    <span className="absolute bottom-0 w-8 h-[2.5px] bg-blue-600 rounded-full" />
                  )}
                </button>
              </div>

              {/* Sub-Filters: Round-trip, 1 Traveler, Economy */}
              <div className="flex flex-wrap items-center gap-5 text-xs text-neutral-600 font-medium px-2">
                <div className="flex items-center gap-1 cursor-pointer hover:text-neutral-900">
                  <span>Round-trip</span>
                  <span className="text-[10px]">▼</span>
                </div>
                <div className="flex items-center gap-1 cursor-pointer hover:text-neutral-900">
                  <span>👤 1 Traveler</span>
                  <span className="text-[10px]">▼</span>
                </div>
                <div className="flex items-center gap-1 cursor-pointer hover:text-neutral-900">
                  <span>Economy</span>
                  <span className="text-[10px]">▼</span>
                </div>
              </div>

              {/* Pill Search Input Bar */}
              <div className="flex flex-col lg:flex-row items-stretch lg:items-center gap-2 bg-white rounded-2xl lg:rounded-full border border-neutral-200/90 p-2 shadow-sm">
                {/* From Field */}
                <div className="flex-1 flex items-center gap-3 px-4 py-2 hover:bg-neutral-50 rounded-full transition-colors">
                  <span className="text-neutral-400 text-sm">🛫</span>
                  <div className="flex flex-col text-left">
                    <span className="text-[11px] text-neutral-400 font-medium leading-none">From</span>
                    <input
                      type="text"
                      defaultValue="DAC - Dhaka, Bangladesh"
                      className="text-xs sm:text-[13px] font-semibold text-neutral-800 bg-transparent outline-none w-full"
                    />
                  </div>
                </div>

                {/* Swap Icon */}
                <button
                  type="button"
                  aria-label="Swap locations"
                  className="w-8 h-8 rounded-full border border-neutral-200 flex items-center justify-center text-xs text-neutral-600 hover:bg-neutral-100 transition-colors mx-auto lg:mx-0 shrink-0"
                >
                  ⇄
                </button>

                {/* To Field */}
                <div className="flex-1 flex items-center gap-3 px-4 py-2 hover:bg-neutral-50 rounded-full transition-colors">
                  <span className="text-neutral-400 text-sm">🛬</span>
                  <div className="flex flex-col text-left">
                    <span className="text-[11px] text-neutral-400 font-medium leading-none">To</span>
                    <input
                      type="text"
                      placeholder="Where to? (e.g. Dubai, Tokyo, Rome)"
                      className="text-xs sm:text-[13px] font-semibold text-neutral-800 bg-transparent outline-none placeholder:text-neutral-400 w-full"
                    />
                  </div>
                </div>

                <div className="hidden lg:block w-[1px] h-8 bg-neutral-200" />

                {/* Depart & Return Dates */}
                <div className="flex items-center gap-3 px-4 py-2 hover:bg-neutral-50 rounded-full transition-colors">
                  <span className="text-neutral-400 text-sm">📅</span>
                  <div className="flex items-center gap-2 text-xs sm:text-[13px] font-semibold text-neutral-700">
                    <span>Depart</span>
                    <span className="text-neutral-300">—</span>
                    <span>Return</span>
                  </div>
                </div>

                {/* Search Button */}
                <button
                  type="button"
                  className="bg-blue-600 hover:bg-blue-700 active:scale-95 text-white font-semibold text-xs sm:text-sm px-8 py-3 rounded-full transition-all duration-200 shadow-md hover:shadow-lg shrink-0"
                >
                  Search
                </button>
              </div>
            </div>

            {/* Destination Grid Title */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between pt-5 pb-4 gap-2">
              <div>
                <span className="text-[10px] sm:text-[11px] tracking-[0.2em] text-blue-600 font-bold uppercase font-orbitron">
                  Mongzo Curated Escapes
                </span>
                <h3 className="font-orbitron text-base sm:text-lg md:text-xl font-bold text-neutral-900 tracking-tight">
                  Featured Destinations & Private Journeys
                </h3>
              </div>
              <span className="text-neutral-500 text-xs font-medium">
                8 hand-picked global retreats
              </span>
            </div>

            {/* 8 Tourist Spots Grid (4 Columns x 2 Rows) */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3.5 max-h-[360px] md:max-h-[380px] overflow-y-auto pr-1">
              {destinations.map((place, idx) => (
                <div
                  key={idx}
                  className="group relative overflow-hidden rounded-2xl bg-white/90 border border-neutral-200/70 hover:border-blue-400/80 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl cursor-pointer"
                >
                  {/* Photo */}
                  <div className="relative h-32 sm:h-36 w-full overflow-hidden">
                    <img
                      src={place.image}
                      alt={place.name}
                      className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

                    {/* Tag badge */}
                    <span className="absolute top-2.5 left-2.5 bg-white/90 backdrop-blur-md text-neutral-900 text-[9px] font-orbitron font-semibold px-2 py-0.5 rounded-full shadow-sm">
                      {place.tag}
                    </span>

                    {/* Rating badge */}
                    <span className="absolute top-2.5 right-2.5 bg-black/70 backdrop-blur-md text-amber-300 text-[10px] font-bold px-1.5 py-0.5 rounded-full flex items-center gap-1">
                      ★ {place.rating}
                    </span>
                  </div>

                  {/* Destination Info */}
                  <div className="p-3 text-left">
                    <h4 className="font-orbitron text-xs sm:text-[13px] font-bold text-neutral-900 group-hover:text-blue-600 transition-colors truncate">
                      {place.name}
                    </h4>
                    <p className="text-neutral-500 text-[11px] mt-0.5 flex items-center gap-1">
                      <span>📍</span>
                      <span className="truncate">{place.country}</span>
                    </p>
                    <div className="mt-2.5 pt-2 border-t border-neutral-100 flex items-center justify-between text-[11px]">
                      <span className="font-bold text-neutral-900">{place.price}</span>
                      <span className="font-orbitron text-[10px] font-semibold text-blue-600 group-hover:underline">
                        Book Now →
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;

"use client";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const FRAME_COUNT = 300;

const frameSrc = (index: number) =>
  `/assets/scroll_animation/ezgif-frame-${String(index + 1).padStart(3, "0")}.jpg`;

// Splits each line into words so GSAP can reveal them one by one
const RevealLines = ({ lines }: { lines: string[] }) => (
  <>
    {lines.map((line, li) => (
      <span key={li} className="block">
        {line.split(" ").map((word, wi) => (
          <span
            key={wi}
            className="reveal-word inline-block opacity-0 mr-[0.25em] last:mr-0 will-change-[filter,opacity]"
          >
            {word}
          </span>
        ))}
      </span>
    ))}
  </>
);

const Hero = () => {
  const sectionRef = useRef<HTMLElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const topLeftRef = useRef<HTMLDivElement | null>(null);
  const topRightRef = useRef<HTMLDivElement | null>(null);
  const bottomLeftRef = useRef<HTMLDivElement | null>(null);
  const bottomRightRef = useRef<HTMLDivElement | null>(null);

  // Stage 2 (Travel Agency Paragraph & Features)
  const stage2Ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const section = sectionRef.current;
    const canvas = canvasRef.current;
    if (!section || !canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    ctx.imageSmoothingEnabled = true;
    ctx.imageSmoothingQuality = "high";

    // ==========================================
    // INTRO: Cloudy word-by-word blur reveal
    // Top-left and lower-right titles reveal at the same time
    // ==========================================
    const introTl = gsap.timeline({ delay: 0.3 });

    if (topLeftRef.current) {
      introTl.fromTo(
        topLeftRef.current.querySelectorAll(".reveal-word"),
        { opacity: 0, filter: "blur(16px)" },
        {
          opacity: 1,
          filter: "blur(0px)",
          duration: 0.9,
          ease: "power2.out",
          stagger: 0.16,
          clearProps: "filter",
        },
        0
      );
    }

    if (topRightRef.current) {
      introTl.fromTo(
        topRightRef.current.querySelectorAll(".reveal-word"),
        { opacity: 0, filter: "blur(16px)" },
        {
          opacity: 1,
          filter: "blur(0px)",
          duration: 0.9,
          ease: "power2.out",
          stagger: 0.16,
          clearProps: "filter",
        },
        0 // both titles start together
      );
    }

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

    // MASTER TIMELINE (0 to 100% of section scroll)
    // The frame sequence and the text overlays share one ScrollTrigger, so
    // they start and progress together as soon as the user scrolls.
    // The frame tween fixes the timeline duration to 1, so every position
    // below maps directly to scroll progress (0 = top, 1 = bottom).
    const masterTl = gsap.timeline({
      scrollTrigger: {
        trigger: section,
        start: "top top",
        end: "bottom bottom",
        scrub: 0.8,
      },
    });

    masterTl.to(
      playhead,
      {
        frame: FRAME_COUNT - 1,
        ease: "none",
        duration: 1,
        onUpdate: () => {
          const frame = Math.round(playhead.frame);
          if (frame !== currentFrame) {
            currentFrame = frame;
            draw(frame);
          }
        },
      },
      0
    );

    // ==========================================
    // STAGE 1 (0% -> 32%): Hero elements recede into corners
    // ==========================================
    // Each hero block drifts diagonally into its own corner and fades away.
    if (topLeftRef.current) {
      masterTl.to(
        topLeftRef.current,
        {
          x: "-5vw",
          y: "-10vh",
          scale: 0.6,
          opacity: 0,
          ease: "power2.inOut",
          duration: 0.32,
        },
        0
      );
    }

    if (topRightRef.current) {
      masterTl.to(
        topRightRef.current,
        {
          x: "5vw",
          y: "28vh",
          scale: 0.6,
          opacity: 0,
          ease: "power2.inOut",
          duration: 0.32,
        },
        0
      );
    }

    if (bottomLeftRef.current) {
      masterTl.to(
        bottomLeftRef.current,
        {
          x: "-5vw",
          y: "6vh",
          scale: 0.6,
          opacity: 0,
          ease: "power2.inOut",
          duration: 0.32,
        },
        0
      );
    }

    if (bottomRightRef.current) {
      masterTl.to(
        bottomRightRef.current,
        {
          x: "5vw",
          y: "6vh",
          scale: 0.6,
          opacity: 0,
          ease: "power2.inOut",
          duration: 0.32,
        },
        0
      );
    }

    // ==========================================
    // STAGE 2: Appears when cloud cavity & plane wing arrives (Image 2)
    // Word-by-word animated from bottom to top (staggered)
    // ==========================================
    if (stage2Ref.current) {
      const words = stage2Ref.current.querySelectorAll(".stage2-word");
      const bottomRow = stage2Ref.current.querySelector(".stage2-bottom-row");

      // Container becomes active
      masterTl.set(stage2Ref.current, { opacity: 1 }, 0.32);

      // Words emerge from bottom to top, word by word
      masterTl.fromTo(
        words,
        { y: 60, opacity: 0, filter: "blur(8px)" },
        {
          y: 0,
          opacity: 1,
          filter: "blur(0px)",
          duration: 0.28,
          stagger: 0.009,
          ease: "power3.out",
          clearProps: "filter",
        },
        0.32
      );

      // Bottom features row slides up slightly after words start
      if (bottomRow) {
        masterTl.fromTo(
          bottomRow,
          { y: 40, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.18, ease: "power2.out" },
          0.46
        );
      }

      // Keep fully visible during the clouds scene, then gently fade & slide out
      masterTl.to(
        stage2Ref.current,
        { y: -60, opacity: 0, duration: 0.12, ease: "power2.in" },
        0.7
      );
    }

    return () => {
      introTl.kill();
      masterTl.scrollTrigger?.kill();
      masterTl.kill();
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <section ref={sectionRef} className="relative h-[500vh] bg-[#1a1410]">
      {/* Sticky container that stays in viewport while scrolling the 500vh track.
          After the last frame, Home.tsx slides the Booking panel up over it. */}
      <div className="sticky top-0 z-0 h-screen w-full overflow-hidden bg-[#18130f] select-none">
        {/* Background Canvas for Airplane Window Scroll Animation */}
        <canvas ref={canvasRef} className="absolute inset-0 h-full w-full object-cover" />

        {/* Ambient Vignette & Gradient Overlays */}
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/45 via-transparent to-black/30" />
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_40%,rgba(20,15,12,0.45)_90%)]" />

        {/* ================= STAGE 1: INITIAL HERO OVERLAY ================= */}
        <div className="container-page absolute inset-0 z-10 pointer-events-none">
          {/* Top-Left Title: "book your dream flight" */}
          <div
            ref={topLeftRef}
            className="absolute top-[18%] md:top-[19%] left-6 md:left-12 lg:left-16 xl:left-20 max-w-[280px] sm:max-w-md md:max-w-lg lg:max-w-xl origin-top-left will-change-transform"
          >
            <h1 className="font-orbitron text-[34px] sm:text-[46px] md:text-[56px] lg:text-[68px] xl:text-[76px] font-bold text-white leading-[0.94] tracking-tight drop-shadow-lg">
              <RevealLines lines={["Book your", "dream flight"]} />
            </h1>
          </div>

          {/* Lower-Right Title: "All bookings, one place" */}
          <div
            ref={topRightRef}
            className="absolute top-[57%] md:top-[58%] right-6 md:right-12 lg:right-16 xl:right-20 text-right max-w-[280px] sm:max-w-md md:max-w-lg lg:max-w-xl origin-bottom-right will-change-transform"
          >
            <h2 className="font-orbitron text-[34px] sm:text-[46px] md:text-[56px] lg:text-[68px] xl:text-[76px] font-bold text-white leading-[0.94] tracking-tight drop-shadow-lg">
              <RevealLines lines={["All bookings,", "one place"]} />
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

        {/* ================= STAGE 2: CLOUDS & TRAVEL AGENCY STATEMENT ================= */}
        <div
          ref={stage2Ref}
          className="container-page absolute inset-0 z-20 flex flex-col justify-between pt-16 pb-6 md:pt-20 md:pb-8 opacity-0 pointer-events-none select-none"
        >
          {/* Main Large Statement */}
          <div className="max-w-[1044px] mt-[100px]">
            <h2 className="font-monte-carlo text-4xl sm:text-5xl md:text-[4.2rem] lg:text-[5rem] xl:text-[5.4rem] font-normal text-white leading-[1.08] tracking-tight drop-shadow-[0_4px_20px_rgba(0,0,0,0.7)]">
              {[
                "Mongzo is a bespoke luxury travel agency.",
                "From private escapes to",
                "seamless flights and hotels, we craft",
                "every journey with care, comfort and",
                "style."
              ].map((line, li) => (
                <span key={li} className="block py-0.5">
                  {line.split(" ").map((w, wi) => (
                    <span
                      key={wi}
                      className="stage2-word inline-block mr-[0.22em] last:mr-0 opacity-0 translate-y-12 will-change-transform"
                    >
                      {w}
                    </span>
                  ))}
                </span>
              ))}
            </h2>
          </div>

          {/* Bottom Features Row matching 2nd image */}
          <div className="stage2-bottom-row grid grid-cols-1 md:grid-cols-3 gap-6 pt-8 border-t border-white/20 opacity-0">
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

      </div>
    </section>
  );
};

export default Hero;
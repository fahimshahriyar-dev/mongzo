"use client";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import Hero from "./Hero";
import Booking from "./Booking";
import Footer from "../components/Footer";

const SLIDE_DURATION = 1.8;
const SLIDE_EASE = "power3.inOut";

const Home = () => {
  const panelRef = useRef<HTMLDivElement>(null);
  const isOpenRef = useRef(false);
  const isAnimatingRef = useRef(false);

  useEffect(() => {
    let touchStartY = 0;
    let touchStartPanelTop = 0;

    // Hero is finished when the page can't scroll any further
    const isHeroAtEnd = () =>
      window.scrollY >=
      document.documentElement.scrollHeight - window.innerHeight - 5;

    const panelAtTop = () => (panelRef.current?.scrollTop ?? 0) <= 0;

    const slideTo = (open: boolean) => {
      const panel = panelRef.current;
      if (!panel || isAnimatingRef.current || isOpenRef.current === open) return;

      isAnimatingRef.current = true;
      if (open) panel.scrollTop = 0;

      // When CLOSING: notify Navbar immediately so it hides right away
      // When OPENING: only notify AFTER animation finishes (booking fully visible)
      if (!open) {
        window.dispatchEvent(
          new CustomEvent("mongzo-booking-open", { detail: { open: false } })
        );
      }

      gsap.to(panel, {
        y: open ? "-100%" : "0%",
        duration: SLIDE_DURATION,
        ease: SLIDE_EASE,
        onComplete: () => {
          isAnimatingRef.current = false;
          isOpenRef.current = open;
          // Only fire open:true when booking panel has fully slid into view
          if (open) {
            window.dispatchEvent(
              new CustomEvent("mongzo-booking-open", { detail: { open: true } })
            );
          }
        },
      });
    };

    const handleOpenBooking = (e?: any) => {
      slideTo(true);
      if (e?.detail?.tab) {
        window.dispatchEvent(
          new CustomEvent("mongzo-set-booking-tab", { detail: { tab: e.detail.tab } })
        );
      }
    };

    const handleCloseBooking = () => {
      slideTo(false);
    };

    window.addEventListener("mongzo-open-booking", handleOpenBooking);
    window.addEventListener("mongzo-close-booking", handleCloseBooking);

    const handleWheel = (e: WheelEvent) => {
      // Block everything while the slide is running
      if (isAnimatingRef.current) {
        e.preventDefault();
        return;
      }

      if (!isOpenRef.current) {
        // Hero -> Booking
        if (e.deltaY > 15 && isHeroAtEnd()) {
          e.preventDefault();
          slideTo(true);
        }
      } else {
        // Booking -> Hero (only when Booking is scrolled to its top)
        if (e.deltaY < -15 && panelAtTop()) {
          e.preventDefault();
          slideTo(false);
        }
      }
    };

    const handleTouchStart = (e: TouchEvent) => {
      touchStartY = e.touches[0].clientY;
      touchStartPanelTop = panelRef.current?.scrollTop ?? 0;
    };

    const handleTouchEnd = (e: TouchEvent) => {
      if (isAnimatingRef.current) return;
      const diffY = touchStartY - e.changedTouches[0].clientY;

      if (!isOpenRef.current) {
        if (diffY > 50 && isHeroAtEnd()) slideTo(true);
      } else {
        // only if the swipe STARTED at the top, so normal scrolling up
        // inside Booking doesn't accidentally close it
        if (diffY < -50 && touchStartPanelTop <= 0 && panelAtTop()) slideTo(false);
      }
    };

    window.addEventListener("wheel", handleWheel, { passive: false });
    window.addEventListener("touchstart", handleTouchStart, { passive: true });
    window.addEventListener("touchend", handleTouchEnd, { passive: true });

    return () => {
      window.removeEventListener("wheel", handleWheel);
      window.removeEventListener("touchstart", handleTouchStart);
      window.removeEventListener("touchend", handleTouchEnd);
      window.removeEventListener("mongzo-open-booking", handleOpenBooking);
      window.removeEventListener("mongzo-close-booking", handleCloseBooking);
    };
  }, []);

  return (
    <>
      <Hero />

      {/* Booking + Footer slide-up panel.
          Sits just below the viewport (top-full) and GSAP moves it to top-0. */}
      <div
        ref={panelRef}
        id="booking-section"
        className="fixed top-full left-0 z-40 h-screen w-full overflow-y-auto overflow-x-hidden overscroll-contain bg-white"
        style={{ transform: "translate3d(0px, 0px, 0px)" }}
      >
        <Booking />
        <Footer />
      </div>
    </>
  );
};

export default Home;
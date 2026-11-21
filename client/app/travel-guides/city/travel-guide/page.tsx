import { Suspense } from "react";
import { Metadata } from "next";
import TravelGuide from "./TravelGuide";

export const metadata: Metadata = {
  title: "Complete Travel Guide | Mongzo",
  description:
    "Discover what to see, eat and buy in Cox's Bazar, plus useful travel tips for a smooth coastal holiday.",
};

export default function TravelGuidePage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-white flex items-center justify-center text-sm text-neutral-400">
          Loading travel guide...
        </div>
      }
    >
      <TravelGuide />
    </Suspense>
  );
}

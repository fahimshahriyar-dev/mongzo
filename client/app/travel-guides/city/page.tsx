import { Suspense } from "react";
import { Metadata } from "next";
import CityGuide from "./CityGuide";

export const metadata: Metadata = {
  title: "City Travel Guide & Hotel Suggestions | Mongzo",
  description:
    "Explore top hotels, beach resorts, search stays, and discover all tourist cities of the selected country.",
};

export default function CityGuidePage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-white flex items-center justify-center text-sm text-neutral-400">
          Loading travel guide...
        </div>
      }
    >
      <CityGuide />
    </Suspense>
  );
}

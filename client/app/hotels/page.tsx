import { Suspense } from "react";
import HotelsClientPage from "./HotelsClientPage";

export const metadata = {
  title: "Hotels - Search & Compare Cheap Hotel Deals | Mongzo",
  description: "Find and compare best hotel deals across top destinations worldwide.",
};

export default function HotelsPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-[#FFFFFF] flex items-center justify-center text-neutral-400">
          Loading hotels...
        </div>
      }
    >
      <HotelsClientPage />
    </Suspense>
  );
}

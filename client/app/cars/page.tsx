import { Suspense } from "react";
import CarsClientPage from "./CarsClientPage";

export default function CarsPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-[#1a1a2e] flex items-center justify-center text-neutral-400">
          Loading cars...
        </div>
      }
    >
      <CarsClientPage />
    </Suspense>
  );
}

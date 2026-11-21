import { Suspense } from "react";
import { Metadata } from "next";
import CategoryDetail from "./CategoryDetail";

export const metadata: Metadata = {
  title: "Travel Guide Category | Mongzo",
  description:
    "Browse beaches, hills, activities, markets and more with Mongzo travel guides.",
};

export default function CategoryPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-white flex items-center justify-center text-sm text-neutral-400">
          Loading category...
        </div>
      }
    >
      <CategoryDetail />
    </Suspense>
  );
}

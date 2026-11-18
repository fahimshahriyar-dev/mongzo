import React, { Suspense } from "react";
import Navbar from "../client_dashboard/components/Navbar";
import Footer from "../client_dashboard/components/Footer";
import ESimClientPage from "./ESimClientPage";

export default function ESimPage() {
  return (
    <div className="min-h-screen bg-white flex flex-col">
      <Navbar />
      <main className="flex-1">
        <Suspense
          fallback={
            <div className="h-[60vh] w-full flex items-center justify-center text-neutral-500 font-medium">
              Loading eSIM plans...
            </div>
          }
        >
          <ESimClientPage />
        </Suspense>
      </main>
      <Footer />
    </div>
  );
}

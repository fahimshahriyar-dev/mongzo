import Navbar from "../../client_dashboard/components/Navbar";
import Footer from "../../client_dashboard/components/Footer";
import FlightPaymentClient from "./FlightPaymentClient";
import { Suspense } from "react";

export default function FlightPaymentPage() {
  return (
    <div className="min-h-screen bg-white flex flex-col">
      <Navbar />
      <main className="flex-1">
        <Suspense fallback={<div className="flex items-center justify-center min-h-[60vh] text-neutral-400">Loading...</div>}>
          <FlightPaymentClient />
        </Suspense>
      </main>
      <Footer />
    </div>
  );
}

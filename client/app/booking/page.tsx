import { Suspense } from "react";
import Navbar from "../client_dashboard/components/Navbar";
import Booking from "../client_dashboard/Home/Booking";
import Footer from "../client_dashboard/components/Footer";

export default function BookingPage() {
  return (
    <div className="min-h-screen bg-white flex flex-col">
      <Navbar theme="light" />
      <main className="flex-1">
        <Suspense fallback={<div className="h-screen w-full bg-white flex items-center justify-center">Loading...</div>}>
          <Booking />
        </Suspense>
      </main>
      <Footer />
    </div>
  );
}


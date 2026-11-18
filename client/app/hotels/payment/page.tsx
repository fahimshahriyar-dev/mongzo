import { Suspense } from "react";
import HotelPaymentClient from "./HotelPaymentClient";

export const metadata = {
  title: "Hotel Reservation & Room Booking | Mongzo",
  description: "Select room options, review guest facilities, policies, and complete your reservation.",
};

export default function HotelPaymentPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-[#FFFFFF] flex items-center justify-center text-neutral-400">
          Loading hotel details...
        </div>
      }
    >
      <HotelPaymentClient />
    </Suspense>
  );
}

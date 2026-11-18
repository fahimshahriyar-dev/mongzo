import { Suspense } from "react";
import CarPaymentClient from "./CarPaymentClient";

export const metadata = {
  title: "Car Rental Checkout | Mongzo",
  description: "Review your car rental details, protection options, and add-ons.",
};

export default function CarPaymentPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-[#FFFFFF] flex items-center justify-center text-neutral-400">
          Loading checkout...
        </div>
      }
    >
      <CarPaymentClient />
    </Suspense>
  );
}

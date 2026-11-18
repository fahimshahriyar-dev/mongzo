"use client";

import { useSearchParams } from "next/navigation";
import CarPayment from "../../client_dashboard/CarPayment";

export default function CarPaymentClient() {
  const searchParams = useSearchParams();

  const idParam = searchParams.get("id");
  const carId = idParam ? Number(idParam) : 1;
  const location = searchParams.get("location") ?? "Hamburg Main Station, Germany";
  const pickupDate = searchParams.get("pickupDate") ?? undefined;
  const pickupTime = searchParams.get("pickupTime") ?? "10:00 AM";
  const dropoffDate = searchParams.get("dropoffDate") ?? undefined;
  const dropoffTime = searchParams.get("dropoffTime") ?? "10:00 AM";

  return (
    <CarPayment
      carId={carId}
      location={location}
      pickupDate={pickupDate}
      pickupTime={pickupTime}
      dropoffDate={dropoffDate}
      dropoffTime={dropoffTime}
    />
  );
}

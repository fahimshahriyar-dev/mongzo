"use client";

import { useSearchParams } from "next/navigation";
import Cars from "../client_dashboard/Cars";

export default function CarsClientPage() {
  const searchParams = useSearchParams();

  const location = searchParams.get("location") ?? "";
  const dropoffLocation = searchParams.get("dropoffLocation") ?? "";
  const pickupDate = searchParams.get("pickupDate") ?? undefined;
  const pickupTime = searchParams.get("pickupTime") ?? "10:00";
  const dropoffDate = searchParams.get("dropoffDate") ?? undefined;
  const dropoffTime = searchParams.get("dropoffTime") ?? "10:00";
  const country = searchParams.get("country") ?? "Bangladesh";
  const diffLocation = searchParams.get("diffLocation") === "1";

  return (
    <Cars
      initialLocation={location}
      initialDropOffLocation={dropoffLocation}
      initialPickUpDate={pickupDate}
      initialPickUpTime={pickupTime}
      initialDropOffDate={dropoffDate}
      initialDropOffTime={dropoffTime}
      initialCountry={country}
      initialDiffLocation={diffLocation}
    />
  );
}

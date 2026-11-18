"use client";

import { useSearchParams } from "next/navigation";
import FlightPayment from "../../client_dashboard/FlightPayment";

export default function FlightPaymentClient() {
  const searchParams = useSearchParams();

  const flightId = searchParams.get("id") ?? undefined;
  const origin = searchParams.get("origin") ?? undefined;
  const destination = searchParams.get("destination") ?? undefined;
  const tripType = searchParams.get("tripType") ?? undefined;
  const passengers = searchParams.get("passengers")
    ? Number(searchParams.get("passengers"))
    : undefined;

  return (
    <FlightPayment
      flightId={flightId}
      origin={origin}
      destination={destination}
      tripType={tripType}
      passengers={passengers}
    />
  );
}

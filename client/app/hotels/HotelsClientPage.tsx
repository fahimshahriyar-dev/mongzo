"use client";

import { useSearchParams } from "next/navigation";
import Hotels from "../client_dashboard/Hotels";

export default function HotelsClientPage() {
  const searchParams = useSearchParams();

  const destination = searchParams.get("destination") ?? "Dhaka, Bangladesh";
  const checkIn = searchParams.get("checkIn") ?? undefined;
  const checkOut = searchParams.get("checkOut") ?? undefined;
  const rooms = searchParams.get("rooms") ? Number(searchParams.get("rooms")) : 1;
  const adults = searchParams.get("adults") ? Number(searchParams.get("adults")) : 2;
  const children = searchParams.get("children") ? Number(searchParams.get("children")) : 0;

  return (
    <Hotels
      initialDestination={destination}
      initialCheckIn={checkIn}
      initialCheckOut={checkOut}
      initialRooms={rooms}
      initialAdults={adults}
      initialChildren={children}
    />
  );
}

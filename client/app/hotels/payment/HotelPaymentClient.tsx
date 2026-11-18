"use client";

import { useSearchParams } from "next/navigation";
import HotelPayment from "../../client_dashboard/HotelPayment";

export default function HotelPaymentClient() {
  const searchParams = useSearchParams();

  const idParam = searchParams.get("id");
  const hotelId = idParam ? Number(idParam) : 1;
  const destination = searchParams.get("destination") ?? "Dhaka, Bangladesh";
  const checkIn = searchParams.get("checkIn") ?? undefined;
  const checkOut = searchParams.get("checkOut") ?? undefined;
  const rooms = searchParams.get("rooms") ? Number(searchParams.get("rooms")) : 1;
  const adults = searchParams.get("adults") ? Number(searchParams.get("adults")) : 2;
  const children = searchParams.get("children") ? Number(searchParams.get("children")) : 0;

  return (
    <HotelPayment
      hotelId={hotelId}
      destination={destination}
      checkIn={checkIn}
      checkOut={checkOut}
      rooms={rooms}
      adults={adults}
      childCount={children}
    />
  );
}

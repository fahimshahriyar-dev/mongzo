"use client";
import React from "react";
import { useSearchParams } from "next/navigation";
import ESim from "../client_dashboard/Home/ESim";

export default function ESimClientPage() {
  const searchParams = useSearchParams();
  const destination = searchParams?.get("destination") || "Global";

  return <ESim initialDestination={destination} />;
}

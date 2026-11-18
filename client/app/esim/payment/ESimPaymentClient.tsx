"use client";
import React from "react";
import { useSearchParams } from "next/navigation";
import ESimPayment from "../../client_dashboard/Home/ESimPayment";

export default function ESimPaymentClient() {
  const searchParams = useSearchParams();
  const id = searchParams?.get("id") || "1";

  return <ESimPayment productId={id} />;
}

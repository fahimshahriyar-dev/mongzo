"use client";

import dynamic from "next/dynamic";

const About = dynamic(() => import("../client_dashboard/About"), {
  ssr: true,
  loading: () => (
    <div className="min-h-screen bg-[#FDFCFB] flex items-center justify-center text-slate-400">
      Loading...
    </div>
  ),
});

export default function AboutPage() {
  return <About />;
}

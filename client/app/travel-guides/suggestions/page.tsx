import { Metadata } from "next";
import Suggestions from "./Suggestions";

export const metadata: Metadata = {
  title: "Inspiration for Future Getaways - Travel Guides | Mongzo",
  description:
    "Explore popular destinations, house rentals, apartment stays, beach getaways, and travel inspiration with Mongzo.",
};

export default function SuggestionsPage() {
  return <Suggestions />;
}

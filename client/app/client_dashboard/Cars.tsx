"use client";

import { useState, useRef, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import {
  FaChevronDown, FaCar, FaMapMarkerAlt, FaCheck, FaUser,
  FaDoorOpen, FaSuitcase, FaCog, FaGasPump, FaTag, FaInfoCircle,
  FaFilter, FaSearch, FaSort, FaExchangeAlt
} from "react-icons/fa";
import { FiCheck } from "react-icons/fi";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import Navbar from "./components/Navbar";
import NavServiceBar from "./components/NavServiceBar";
import Footer from "./components/Footer";

// ─── Countries ───────────────────────────────────────────────────────────────
const COUNTRIES = [
  "Afghanistan","Albania","Algeria","Andorra","Angola","Argentina","Armenia",
  "Australia","Austria","Azerbaijan","Bahamas","Bahrain","Bangladesh","Belarus",
  "Belgium","Belize","Benin","Bhutan","Bolivia","Bosnia and Herzegovina",
  "Botswana","Brazil","Brunei","Bulgaria","Burkina Faso","Burundi","Cambodia",
  "Cameroon","Canada","Cape Verde","Central African Republic","Chad","Chile",
  "China","Colombia","Comoros","Congo","Costa Rica","Croatia","Cuba","Cyprus",
  "Czech Republic","Denmark","Djibouti","Dominican Republic","Ecuador","Egypt",
  "El Salvador","Estonia","Ethiopia","Fiji","Finland","France","Gabon","Gambia",
  "Georgia","Germany","Ghana","Greece","Guatemala","Guinea","Haiti","Honduras",
  "Hungary","Iceland","India","Indonesia","Iran","Iraq","Ireland","Israel",
  "Italy","Jamaica","Japan","Jordan","Kazakhstan","Kenya","Kuwait","Kyrgyzstan",
  "Laos","Latvia","Lebanon","Lesotho","Liberia","Libya","Liechtenstein",
  "Lithuania","Luxembourg","Madagascar","Malawi","Malaysia","Maldives","Mali",
  "Malta","Mauritania","Mauritius","Mexico","Moldova","Monaco","Mongolia",
  "Montenegro","Morocco","Mozambique","Myanmar","Namibia","Nepal","Netherlands",
  "New Zealand","Nicaragua","Niger","Nigeria","North Korea","North Macedonia",
  "Norway","Oman","Pakistan","Palestine","Panama","Papua New Guinea","Paraguay",
  "Peru","Philippines","Poland","Portugal","Qatar","Romania","Russia","Rwanda",
  "Saudi Arabia","Senegal","Serbia","Sierra Leone","Singapore","Slovakia",
  "Slovenia","Somalia","South Africa","South Korea","South Sudan","Spain",
  "Sri Lanka","Sudan","Sweden","Switzerland","Syria","Taiwan","Tajikistan",
  "Tanzania","Thailand","Togo","Trinidad and Tobago","Tunisia","Turkey",
  "Turkmenistan","Uganda","Ukraine","United Arab Emirates","United Kingdom",
  "United States","Uruguay","Uzbekistan","Venezuela","Vietnam","Yemen",
  "Zambia","Zimbabwe",
];

// ─── Car Data ─────────────────────────────────────────────────────────────────
export interface CarItem {
  id: number;
  name: string;
  category: string; // e.g. "compact", "economy", "mini"
  image: string;    // placeholder color / emoji
  seats: number;
  doors: number;
  bags: number;
  transmission: "Manual" | "Automatic";
  fuel: "Gas" | "Diesel" | "Hybrid" | "Electric";
  mileage: string;  // e.g. "2000 free kilometres"
  mileageExtra: string; // e.g. "€0.40 per additional kilometre"
  mileageType: "unlimited" | "2000km" | "1500km" | "1000km";
  pickupPolicy: string;
  location: string;
  supplier: string;
  supplierColor: string;
  priceTotal: number;
  priceDay: number;
  originalPrice: number;
  discount: number; // percent
  badge?: string;
  carType: "4-5 Door" | "Wagon/Estate" | "Minivan" | "SUV" | "Coupe" | "Crossover";
}

export const CAR_DATA: CarItem[] = [
  {
    id: 1, name: "Skoda Scala", category: "compact",
    image: "https://images.unsplash.com/photo-1541899481282-d53bffe3c35d?auto=format&fit=crop&w=600&q=80",
    seats: 5, doors: 5, bags: 3,
    transmission: "Manual", fuel: "Gas",
    mileage: "2000 free kilometres", mileageExtra: "€0.40 per additional kilometre",
    mileageType: "2000km", pickupPolicy: "Pick up full, return full",
    location: "Hamburg Main Station", supplier: "Europcar", supplierColor: "bg-[#2563eb]",
    priceTotal: 293.46, priceDay: 58.69, originalPrice: 326.07, discount: 10,
    carType: "4-5 Door",
  },
  {
    id: 2, name: "Hyundai i10", category: "mini",
    image: "https://images.unsplash.com/photo-1549399542-7e3f8b79c341?auto=format&fit=crop&w=600&q=80",
    seats: 4, doors: 5, bags: 1,
    transmission: "Manual", fuel: "Gas",
    mileage: "2000 free kilometres", mileageExtra: "€0.38 per additional kilometre",
    mileageType: "2000km", pickupPolicy: "Pick up full, return full",
    location: "Hamburg Main Station", supplier: "Europcar", supplierColor: "bg-[#2563eb]",
    priceTotal: 264.05, priceDay: 52.81, originalPrice: 293.39, discount: 10,
    carType: "4-5 Door",
  },
  {
    id: 3, name: "Volkswagen Polo", category: "economy",
    image: "https://images.unsplash.com/photo-1502877338535-766e1452684a?auto=format&fit=crop&w=600&q=80",
    seats: 5, doors: 5, bags: 2,
    transmission: "Manual", fuel: "Gas",
    mileage: "2000 free kilometres", mileageExtra: "€0.38 per additional kilometre",
    mileageType: "2000km", pickupPolicy: "Pick up full, return full",
    location: "Hamburg Main Station", supplier: "Europcar", supplierColor: "bg-[#2563eb]",
    priceTotal: 264.05, priceDay: 52.81, originalPrice: 293.39, discount: 10,
    carType: "4-5 Door",
  },
  {
    id: 4, name: "Hyundai i10", category: "mini",
    image: "https://images.unsplash.com/photo-1549399542-7e3f8b79c341?auto=format&fit=crop&w=600&q=80",
    seats: 4, doors: 5, bags: 1,
    transmission: "Manual", fuel: "Gas",
    mileage: "2000 free kilometres", mileageExtra: "€0.38 per additional kilometre",
    mileageType: "2000km", pickupPolicy: "Pick up full, return full • Railway Station",
    location: "Hamburg Mainstation", supplier: "Europcar", supplierColor: "bg-[#2563eb]",
    priceTotal: 265.31, priceDay: 53.06, originalPrice: 294.79, discount: 10,
    carType: "4-5 Door",
  },
  {
    id: 5, name: "Volkswagen Polo", category: "economy",
    image: "https://images.unsplash.com/photo-1502877338535-766e1452684a?auto=format&fit=crop&w=600&q=80",
    seats: 5, doors: 5, bags: 2,
    transmission: "Manual", fuel: "Gas",
    mileage: "2000 free kilometres", mileageExtra: "€0.38 per additional kilometre",
    mileageType: "2000km", pickupPolicy: "Pick up full, return full • Railway Station",
    location: "Hamburg Mainstation", supplier: "Europcar", supplierColor: "bg-[#2563eb]",
    priceTotal: 265.31, priceDay: 53.06, originalPrice: 294.79, discount: 10,
    carType: "4-5 Door",
  },
  {
    id: 6, name: "Toyota Aygo", category: "mini elite",
    image: "https://images.unsplash.com/photo-1590362891991-f776e747a588?auto=format&fit=crop&w=600&q=80",
    seats: 4, doors: 2, bags: 1,
    transmission: "Manual", fuel: "Gas",
    mileage: "1500 km included", mileageExtra: "",
    mileageType: "1500km", pickupPolicy: "Pick up full, return full",
    location: "Hamburg Amsinckstrasse", supplier: "Enterprise", supplierColor: "bg-[#1e40af]",
    priceTotal: 285.20, priceDay: 57.04, originalPrice: 316.89, discount: 10,
    carType: "4-5 Door",
  },
  {
    id: 7, name: "Opel Corsa", category: "economy",
    image: "https://images.unsplash.com/photo-1552519507-da3b142c6e3d?auto=format&fit=crop&w=600&q=80",
    seats: 5, doors: 5, bags: 2,
    transmission: "Manual", fuel: "Gas",
    mileage: "1500 km included", mileageExtra: "",
    mileageType: "1500km", pickupPolicy: "Pick up full, return full",
    location: "Hamburg Amsinckstrasse", supplier: "Enterprise", supplierColor: "bg-[#1e40af]",
    priceTotal: 291.02, priceDay: 58.20, originalPrice: 323.36, discount: 10,
    carType: "4-5 Door",
  },
  {
    id: 8, name: "Mystery Car Compact or Larger", category: "compact",
    image: "https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?auto=format&fit=crop&w=600&q=80",
    seats: 4, doors: 4, bags: 2,
    transmission: "Manual", fuel: "Gas",
    mileage: "1500 km included", mileageExtra: "",
    mileageType: "1500km", pickupPolicy: "Pick up full, return full",
    location: "Hamburg Amsinckstrasse", supplier: "Enterprise", supplierColor: "bg-[#1e40af]",
    priceTotal: 295.60, priceDay: 59.12, originalPrice: 328.44, discount: 10,
    carType: "4-5 Door",
  },
  {
    id: 9, name: "Ford Puma", category: "compact",
    image: "https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?auto=format&fit=crop&w=600&q=80",
    seats: 5, doors: 5, bags: 2,
    transmission: "Manual", fuel: "Gas",
    mileage: "2000 free kilometres", mileageExtra: "€0.42 per additional kilometre",
    mileageType: "2000km", pickupPolicy: "Pick up full, return full",
    location: "Hamburg Central Train Station", supplier: "Sixt", supplierColor: "bg-orange-500",
    priceTotal: 310.40, priceDay: 62.08, originalPrice: 344.89, discount: 10,
    carType: "4-5 Door",
  },
  {
    id: 10, name: "VW Tiguan", category: "suv",
    image: "https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=600&q=80",
    seats: 5, doors: 5, bags: 3,
    transmission: "Automatic", fuel: "Diesel",
    mileage: "1000 km included", mileageExtra: "",
    mileageType: "1000km", pickupPolicy: "Pick up full, return full",
    location: "Hamburg Airport", supplier: "Avis", supplierColor: "bg-red-600",
    priceTotal: 420.00, priceDay: 84.00, originalPrice: 466.67, discount: 10,
    badge: "Best Value",
    carType: "SUV",
  },
  {
    id: 11, name: "BMW 3 Series", category: "premium",
    image: "https://images.unsplash.com/photo-1555215695-3004980ad54e?auto=format&fit=crop&w=600&q=80",
    seats: 5, doors: 4, bags: 2,
    transmission: "Automatic", fuel: "Gas",
    mileage: "2000 free kilometres", mileageExtra: "€0.55 per additional kilometre",
    mileageType: "2000km", pickupPolicy: "Pick up full, return full",
    location: "Hamburg Main Station", supplier: "Sixt", supplierColor: "bg-orange-500",
    priceTotal: 490.00, priceDay: 98.00, originalPrice: 544.44, discount: 10,
    carType: "4-5 Door",
  },
  {
    id: 12, name: "Mercedes C-Class", category: "luxury",
    image: "https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?auto=format&fit=crop&w=600&q=80",
    seats: 5, doors: 4, bags: 2,
    transmission: "Automatic", fuel: "Hybrid",
    mileage: "Unlimited Miles", mileageExtra: "",
    mileageType: "unlimited", pickupPolicy: "Pick up full, return full",
    location: "Hamburg Central Train Station", supplier: "Budget", supplierColor: "bg-red-700",
    priceTotal: 560.00, priceDay: 112.00, originalPrice: 622.22, discount: 10,
    carType: "4-5 Door",
  },
];

// ─── Filter sections ──────────────────────────────────────────────────────────
const CAR_CATEGORIES = ["Mini","Economy","Compact","Compact Elite","Intermediate","Standard","Standard Elite","Fullsize","Fullsize Elite","Premium","Luxury","Special","Mini Elite"];
const CAR_TYPES = ["4-5 Door","Wagon/Estate","Minivan","SUV","Special","Coupe","Crossover"];
const SUPPLIERS = ["Avis","Budget","Enterprise","Europcar","Sixt"];
const FUEL_TYPES = ["Diesel","Gas","Hybrid","Electric"];
const TRANSMISSIONS = ["Manual","Automatic"];
const MILEAGE_OPTIONS = ["Unlimited Miles","2000 km included","1500 km included","1000 km included"];
const SEAT_OPTIONS = [4, 5, 7, 8, 9];

// ─── Helper: format date ──────────────────────────────────────────────────────
function fmtDate(d: Date) {
  const days = ["Sun","Mon","Tue","Wed","Thu","Fri","Sat"];
  const months = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
  return `${days[d.getDay()]}, ${months[d.getMonth()]} ${d.getDate()}`;
}

function fmtDateFull(d: Date) {
  const days = ["Sun","Mon","Tue","Wed","Thu","Fri","Sat"];
  const months = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
  return `${days[d.getDay()]}, ${String(d.getDate()).padStart(2, "0")} ${months[d.getMonth()]} ${d.getFullYear()}`;
}

function getDaysInMonth(year: number, month: number) {
  return new Date(year, month + 1, 0).getDate();
}

function getFirstDayOfMonth(year: number, month: number) {
  return new Date(year, month, 1).getDay();
}

function isSameDay(d1: Date, d2: Date) {
  return (
    d1.getFullYear() === d2.getFullYear() &&
    d1.getMonth() === d2.getMonth() &&
    d1.getDate() === d2.getDate()
  );
}

function isInRange(d: Date, start: Date, end: Date) {
  const t = d.getTime();
  const s = new Date(start.getFullYear(), start.getMonth(), start.getDate()).getTime();
  const e = new Date(end.getFullYear(), end.getMonth(), end.getDate()).getTime();
  return t > s && t < e;
}

// ─── Supplier badge component ─────────────────────────────────────────────────
function SupplierBadge({ supplier, color }: { supplier: string; color: string }) {
  return (
    <span className={`inline-flex items-center px-2 py-0.5 rounded text-white text-[10px] font-bold ${color}`}>
      {supplier}
    </span>
  );
}

// ─── Checkbox filter item ──────────────────────────────────────────────────────
function CheckboxItem({ label, checked, onChange }: { label: string; checked: boolean; onChange: () => void }) {
  return (
    <label className="flex items-center gap-2 cursor-pointer select-none group mb-1">
      <div
        onClick={onChange}
        className={`w-4 h-4 rounded border-2 flex items-center justify-center transition-colors flex-shrink-0 ${
          checked ? "bg-[#2563eb] border-[#2563eb] text-white" : "border-neutral-400 bg-white group-hover:border-[#2563eb]"
        }`}
      >
        {checked && <FiCheck className="text-[8px] stroke-[3]" />}
      </div>
      <span className="text-sm text-neutral-700">{label}</span>
    </label>
  );
}

// ─── Collapsible filter section ────────────────────────────────────────────────
function FilterSection({ title, children }: { title: string; children: React.ReactNode }) {
  const [open, setOpen] = useState(true);
  return (
    <div className="border-t border-neutral-200 pt-4 mb-4">
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className="flex items-center justify-between w-full mb-3"
      >
        <span className="text-sm font-bold text-neutral-900">{title}</span>
        <FaChevronDown className={`text-neutral-400 text-xs transition-transform duration-200 ${open ? "rotate-180" : ""}`} />
      </button>
      {open && <div>{children}</div>}
    </div>
  );
}

// ─── Main Cars Component ───────────────────────────────────────────────────────
interface CarsProps {
  initialLocation?: string;
  initialDropOffLocation?: string;
  initialPickUpDate?: string;
  initialPickUpTime?: string;
  initialDropOffDate?: string;
  initialDropOffTime?: string;
  initialCountry?: string;
  initialDiffLocation?: boolean;
}

export default function Cars({
  initialLocation = "",
  initialDropOffLocation = "",
  initialPickUpDate,
  initialPickUpTime = "10:00",
  initialDropOffDate,
  initialDropOffTime = "10:00",
  initialCountry = "Bangladesh",
  initialDiffLocation = false,
}: CarsProps) {
  const router = useRouter();

  // ── Search bar state ─────────────────────────────────────────────────────
  const [carLocation, setCarLocation] = useState(initialLocation);
  const [carDropOffLocation, setCarDropOffLocation] = useState(
    initialDropOffLocation || (initialDiffLocation ? "" : initialLocation)
  );
  const [carPickUpDate, setCarPickUpDate] = useState<Date>(
    initialPickUpDate ? new Date(initialPickUpDate) : new Date(2026, 10, 5)
  );
  const [carPickUpTime, setCarPickUpTime] = useState(initialPickUpTime);
  const [carDropOffDate, setCarDropOffDate] = useState<Date>(
    initialDropOffDate ? new Date(initialDropOffDate) : new Date(2026, 10, 10)
  );
  const [carDropOffTime, setCarDropOffTime] = useState(initialDropOffTime);
  const [carDriverAgeChecked, setCarDriverAgeChecked] = useState(true);
  const [carResidentCountry, setCarResidentCountry] = useState(initialCountry);
  const [isCarCountryOpen, setIsCarCountryOpen] = useState(false);
  const [carCountrySearch, setCarCountrySearch] = useState("");
  const [isCarPickUpTimeOpen, setIsCarPickUpTimeOpen] = useState(false);
  const [isCarDropOffTimeOpen, setIsCarDropOffTimeOpen] = useState(false);
  const [isCarPickUpDateOpen, setIsCarPickUpDateOpen] = useState(false);
  const [isCarDropOffDateOpen, setIsCarDropOffDateOpen] = useState(false);
  const [carCalendarViewDate, setCarCalendarViewDate] = useState<Date>(
    new Date(2026, 10, 1)
  );

  // ── Sidebar filter state ─────────────────────────────────────────────────
  const [pickupLocations, setPickupLocations] = useState<string[]>([]);
  const [selCategories, setSelCategories] = useState<string[]>([]);
  const [selCarTypes, setSelCarTypes] = useState<string[]>([]);
  const [priceMin, setPriceMin] = useState(200);
  const [priceMax, setPriceMax] = useState(1500);
  const [selSeats, setSelSeats] = useState<number[]>([]);
  const [selSuppliers, setSelSuppliers] = useState<string[]>([]);
  const [selFuels, setSelFuels] = useState<string[]>([]);
  const [selTransmissions, setSelTransmissions] = useState<string[]>([]);
  const [selMileage, setSelMileage] = useState<string[]>([]);

  // ── Sort state ───────────────────────────────────────────────────────────
  const [sortBy, setSortBy] = useState<"recommended" | "price_low" | "price_high">("recommended");
  const [isSortOpen, setIsSortOpen] = useState(false);
  const [isCarFilterPanelOpen, setIsCarFilterPanelOpen] = useState(false);
  const [isCarSearchOpen, setIsCarSearchOpen] = useState(false);

  // ── Close dropdowns on outside click ────────────────────────────────────
  const wrapperRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    function handleClick(e: MouseEvent) {
      const clickedCarSearchToggle =
        e.target instanceof Element && e.target.closest("[data-car-search-toggle]");
      const clickedCarFilterDropdown =
        e.target instanceof Element && e.target.closest("[data-car-filter-dropdown]");
      const clickedSortDropdown =
        e.target instanceof Element && e.target.closest("[data-car-sort-dropdown]");
      if (
        wrapperRef.current &&
        !wrapperRef.current.contains(e.target as Node) &&
        !clickedCarSearchToggle
      ) {
        setIsCarCountryOpen(false);
        setIsCarPickUpTimeOpen(false);
        setIsCarDropOffTimeOpen(false);
        setIsCarPickUpDateOpen(false);
        setIsCarDropOffDateOpen(false);
        setIsCarSearchOpen(false);
      }
      if (!clickedSortDropdown) setIsSortOpen(false);
      if (!clickedCarFilterDropdown) setIsCarFilterPanelOpen(false);
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  // ── Toggle helpers ───────────────────────────────────────────────────────
  function toggleArr<T>(arr: T[], val: T): T[] {
    return arr.includes(val) ? arr.filter(x => x !== val) : [...arr, val];
  }

  // ── Unique pickup locations from data ────────────────────────────────────
  const allLocations = Array.from(new Set(CAR_DATA.map(c => c.location)));

  // ── Filtered & sorted cars ───────────────────────────────────────────────
  const filteredCars = CAR_DATA
    .filter(car => {
      if (pickupLocations.length && !pickupLocations.includes(car.location)) return false;
      if (selCategories.length && !selCategories.some(c => car.category.toLowerCase().includes(c.toLowerCase()))) return false;
      if (selCarTypes.length && !selCarTypes.includes(car.carType)) return false;
      if (car.priceTotal < priceMin || car.priceTotal > priceMax) return false;
      if (selSeats.length && !selSeats.includes(car.seats)) return false;
      if (selSuppliers.length && !selSuppliers.includes(car.supplier)) return false;
      if (selFuels.length && !selFuels.includes(car.fuel)) return false;
      if (selTransmissions.length && !selTransmissions.includes(car.transmission)) return false;
      if (selMileage.length) {
        const mLabel = selMileage;
        const mapType: Record<string, string> = {
          "Unlimited Miles": "unlimited",
          "2000 km included": "2000km",
          "1500 km included": "1500km",
          "1000 km included": "1000km",
        };
        const selTypes = mLabel.map(l => mapType[l]).filter(Boolean);
        if (selTypes.length && !selTypes.includes(car.mileageType)) return false;
      }
      return true;
    })
    .sort((a, b) => {
      if (sortBy === "price_low") return a.priceTotal - b.priceTotal;
      if (sortBy === "price_high") return b.priceTotal - a.priceTotal;
      return a.id - b.id;
    });

  // ── Search (re-route with new params) ───────────────────────────────────
  function handleSearch() {
    const params = new URLSearchParams();
    if (carLocation) params.set("location", carLocation);
    params.set("pickupDate", carPickUpDate.toISOString());
    params.set("pickupTime", carPickUpTime);
    params.set("dropoffDate", carDropOffDate.toISOString());
    params.set("dropoffTime", carDropOffTime);
    params.set("country", carResidentCountry);
    if (carDropOffLocation && carDropOffLocation !== carLocation) {
      params.set("dropoffLocation", carDropOffLocation);
      params.set("diffLocation", "1");
    }
    router.push(`/cars?${params.toString()}`);
  }

  // ── Time slot generator ──────────────────────────────────────────────────
  const timeSlots = Array.from({ length: 48 }, (_, i) => {
    const h = String(Math.floor(i / 2)).padStart(2, "0");
    const m = i % 2 === 0 ? "00" : "30";
    return `${h}:${m}`;
  });

  const handleCarDateClick = (dayDate: Date, field: "pickup" | "dropoff") => {
    if (field === "pickup") {
      setCarPickUpDate(dayDate);
      if (dayDate >= carDropOffDate) {
        const next = new Date(dayDate);
        next.setDate(next.getDate() + 1);
        setCarDropOffDate(next);
      }
    } else if (dayDate > carPickUpDate) {
      setCarDropOffDate(dayDate);
    }
  };

  const renderCarMonthCalendar = (
    monthOffset: number,
    activeField: "pickup" | "dropoff"
  ) => {
    const targetMonthDate = new Date(
      carCalendarViewDate.getFullYear(),
      carCalendarViewDate.getMonth() + monthOffset,
      1
    );
    const year = targetMonthDate.getFullYear();
    const month = targetMonthDate.getMonth();
    const monthNames = [
      "January","February","March","April","May","June",
      "July","August","September","October","November","December",
    ];
    const daysInMonth = getDaysInMonth(year, month);
    const firstDay = getFirstDayOfMonth(year, month);
    const prevMonthDays = getDaysInMonth(year, month - 1);

    const cells: { day: number; isCurrentMonth: boolean; date: Date }[] = [];
    for (let i = firstDay - 1; i >= 0; i--) {
      cells.push({
        day: prevMonthDays - i,
        isCurrentMonth: false,
        date: new Date(year, month - 1, prevMonthDays - i),
      });
    }
    for (let i = 1; i <= daysInMonth; i++) {
      cells.push({ day: i, isCurrentMonth: true, date: new Date(year, month, i) });
    }

    return (
      <div className="flex-1 min-w-[250px]">
        <div className="text-center font-bold text-neutral-800 text-sm mb-3">
          {monthNames[month]} {year}
        </div>
        <div className="grid grid-cols-7 gap-y-1 text-center text-xs text-neutral-400 font-medium mb-1.5">
          <span>Su</span><span>Mo</span><span>Tu</span><span>We</span>
          <span>Th</span><span>Fr</span><span>Sa</span>
        </div>
        <div className="grid grid-cols-7 gap-y-1 text-center text-xs">
          {cells.map((cell, idx) => {
            const isPickup =
              cell.isCurrentMonth && isSameDay(cell.date, carPickUpDate);
            const isDropoff =
              cell.isCurrentMonth && isSameDay(cell.date, carDropOffDate);
            const inRange =
              cell.isCurrentMonth &&
              isInRange(cell.date, carPickUpDate, carDropOffDate);
            const isNewYearsEve =
              cell.isCurrentMonth && month === 11 && cell.day === 31;

            let bgClass = "hover:bg-neutral-100 text-neutral-700";
            if (!cell.isCurrentMonth) {
              bgClass = "text-neutral-300 pointer-events-none";
            } else if (isPickup) {
              bgClass = "bg-[#2563eb] text-white font-bold rounded-l-md shadow-sm";
            } else if (isDropoff) {
              bgClass = "bg-[#2563eb] text-white font-bold rounded-r-md shadow-sm";
            } else if (inRange) {
              bgClass = "bg-[#a3e892]/60 text-neutral-900";
            }

            return (
              <button
                key={idx}
                type="button"
                disabled={!cell.isCurrentMonth}
                onClick={() =>
                  cell.isCurrentMonth && handleCarDateClick(cell.date, activeField)
                }
                className={`h-8 flex items-center justify-center transition-colors relative text-xs ${bgClass}`}
              >
                <span>{cell.day}</span>
                {isNewYearsEve && !isPickup && !isDropoff && (
                  <span className="text-red-500 font-semibold absolute top-1 right-1 text-[9px] leading-none">
                    *
                  </span>
                )}
              </button>
            );
          })}
        </div>
      </div>
    );
  };

  const renderCarDatePopover = (activeField: "pickup" | "dropoff") => (
    <div onClick={(e) => e.stopPropagation()} className="absolute top-full right-0 mt-2 z-[100] bg-white rounded-2xl shadow-2xl border border-neutral-200/80 p-5 w-[95vw] max-w-[620px] animate-in fade-in zoom-in-95 duration-150">
      <div className="grid grid-cols-2 border border-[#2563eb] rounded-xl overflow-hidden mb-4">
        <div className="p-3 border-r border-[#2563eb]/30 bg-neutral-50/50">
          <span className="block text-[10px] font-bold uppercase tracking-wider text-neutral-400 mb-0.5">
            Pick-up
          </span>
          <span className="block text-xs sm:text-sm font-bold text-neutral-900">
            {fmtDateFull(carPickUpDate)}
          </span>
        </div>
        <div className="p-3 bg-white">
          <span className="block text-[10px] font-bold uppercase tracking-wider text-neutral-400 mb-0.5">
            Drop-off
          </span>
          <span className="block text-xs sm:text-sm font-bold text-neutral-900">
            {fmtDateFull(carDropOffDate)}
          </span>
        </div>
      </div>

      <div className="relative mb-3">
        <div className="flex items-center justify-between mb-2 px-1">
          <button
            type="button"
            onClick={() =>
              setCarCalendarViewDate(
                new Date(
                  carCalendarViewDate.getFullYear(),
                  carCalendarViewDate.getMonth() - 1,
                  1
                )
              )
            }
            className="w-7 h-7 rounded-full flex items-center justify-center text-neutral-500 hover:bg-neutral-100 transition-colors"
          >
            <IoIosArrowBack />
          </button>
          <button
            type="button"
            onClick={() =>
              setCarCalendarViewDate(
                new Date(
                  carCalendarViewDate.getFullYear(),
                  carCalendarViewDate.getMonth() + 1,
                  1
                )
              )
            }
            className="w-7 h-7 rounded-full flex items-center justify-center text-neutral-500 hover:bg-neutral-100 transition-colors"
          >
            <IoIosArrowForward />
          </button>
        </div>

        <div className="flex flex-col sm:flex-row gap-6">
          {renderCarMonthCalendar(0, activeField)}
          {renderCarMonthCalendar(1, activeField)}
        </div>
      </div>

      <div className="border-t border-neutral-100 pt-3 mt-3">
        <span className="block text-[10px] font-bold text-neutral-400 uppercase tracking-wider mb-1.5">
          *Public Holidays
        </span>
        <div className="inline-flex items-center gap-2 bg-neutral-50 px-2.5 py-1 rounded-md text-xs">
          <span className="text-red-500 font-bold">31 Dec</span>
          <span className="text-neutral-600">New Year&apos;s Eve</span>
        </div>
      </div>
    </div>
  );

  const sortLabels = { recommended: "Recommended", price_low: "Price (low to high)", price_high: "Price (high to low)" };

  const renderCarFilters = () => (
    <div className="space-y-5">
      <h2 className="text-base font-bold text-neutral-900">Filters</h2>

      <div className="relative h-36 overflow-hidden rounded-xl border border-neutral-200 bg-white">
        <iframe
          title="Pick-up location map"
          src={`https://www.google.com/maps?q=${encodeURIComponent(carLocation || "Hamburg, Germany")}&z=12&output=embed`}
          className="h-full w-full border-0"
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          allowFullScreen
        />
        <a
          href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(carLocation || "Hamburg, Germany")}`}
          target="_blank"
          rel="noopener noreferrer"
          className="absolute bottom-3 left-3 z-10 rounded-full bg-[#2563eb] px-3 py-1.5 text-xs font-bold text-white shadow transition-colors hover:bg-[#1d4ed8]"
        >
          Show on map
        </a>
      </div>

      <FilterSection title="Pick-up location">
        {allLocations.map(loc => (
          <CheckboxItem key={loc} label={loc}
            checked={pickupLocations.includes(loc)}
            onChange={() => setPickupLocations(toggleArr(pickupLocations, loc))}
          />
        ))}
      </FilterSection>

      <FilterSection title="Car category">
        {CAR_CATEGORIES.map(cat => (
          <CheckboxItem key={cat} label={cat}
            checked={selCategories.includes(cat)}
            onChange={() => setSelCategories(toggleArr(selCategories, cat))}
          />
        ))}
      </FilterSection>

      <FilterSection title="Car type">
        {CAR_TYPES.map(t => (
          <CheckboxItem key={t} label={t}
            checked={selCarTypes.includes(t)}
            onChange={() => setSelCarTypes(toggleArr(selCarTypes, t))}
          />
        ))}
      </FilterSection>

      <FilterSection title="Price range">
        <div className="mb-2 text-xs text-neutral-700">
          ${priceMin} - ${priceMax.toLocaleString()}
        </div>
        <input type="range" min={200} max={1500} step={10}
          value={priceMax}
          onChange={e => setPriceMax(Number(e.target.value))}
          className="w-full accent-[#2563eb]"
        />
      </FilterSection>

      <FilterSection title="Seats">
        <div className="flex flex-wrap gap-2">
          {SEAT_OPTIONS.map(s => (
            <button key={s} type="button"
              onClick={() => setSelSeats(toggleArr(selSeats, s))}
              className={`w-9 h-9 rounded-lg border text-sm font-bold transition-colors ${
                selSeats.includes(s)
                  ? "bg-[#2563eb] border-[#2563eb] text-white"
                  : "border-neutral-200 text-neutral-700 hover:border-[#2563eb]"
              }`}
            >{s}</button>
          ))}
        </div>
      </FilterSection>

      <FilterSection title="Supplier">
        {SUPPLIERS.map(s => (
          <CheckboxItem key={s} label={s}
            checked={selSuppliers.includes(s)}
            onChange={() => setSelSuppliers(toggleArr(selSuppliers, s))}
          />
        ))}
      </FilterSection>

      <FilterSection title="Fuel type">
        {FUEL_TYPES.map(f => (
          <CheckboxItem key={f} label={f}
            checked={selFuels.includes(f)}
            onChange={() => setSelFuels(toggleArr(selFuels, f))}
          />
        ))}
      </FilterSection>

      <FilterSection title="Transmission">
        {TRANSMISSIONS.map(t => (
          <CheckboxItem key={t} label={t}
            checked={selTransmissions.includes(t)}
            onChange={() => setSelTransmissions(toggleArr(selTransmissions, t))}
          />
        ))}
      </FilterSection>

      <FilterSection title="Mileage">
        {MILEAGE_OPTIONS.map(m => (
          <CheckboxItem key={m} label={m}
            checked={selMileage.includes(m)}
            onChange={() => setSelMileage(toggleArr(selMileage, m))}
          />
        ))}
      </FilterSection>
    </div>
  );

  return (
    <div className="min-h-screen bg-[#FFFFFF] text-neutral-800 flex flex-col">
      <Navbar />

      <main className="flex-1 pt-[var(--nav-h)] pb-20 md:pt-24">
        <NavServiceBar active="cars" />
        {/* ── Search Bar ────────────────────────────────────────────────── */}
        <div className="container-page">
          <div className="relative">
            <div className="sticky top-[var(--nav-h)] z-30 -mx-4 border-b border-neutral-200/80 bg-white/95 px-4 py-2 shadow-sm backdrop-blur-md md:-mx-8 md:px-8 md:py-3 lg:hidden">
              <div className="grid grid-cols-2 gap-3">
                <button
                  type="button"
                  data-car-search-toggle
                  onClick={() => {
                    setIsCarSearchOpen((open) => !open);
                    setIsCarFilterPanelOpen(false);
                    setIsSortOpen(false);
                  }}
                  className="flex w-full items-center justify-center gap-2 rounded-xl border border-neutral-200 bg-white px-4 py-3 text-sm font-semibold text-neutral-800 transition-colors hover:border-neutral-300"
                >
                  <FaSearch className="text-sm text-neutral-500" />
                  <span>Search</span>
                  <FaChevronDown
                    className={`text-xs text-neutral-500 transition-transform duration-200 ${isCarSearchOpen ? "rotate-180" : ""}`}
                  />
                </button>

                <div className="relative" data-car-filter-dropdown>
                  <button
                    type="button"
                    onClick={() => {
                      setIsCarFilterPanelOpen((open) => !open);
                      setIsCarSearchOpen(false);
                      setIsSortOpen(false);
                    }}
                    className="flex w-full items-center justify-center gap-2 rounded-xl border border-neutral-200 bg-white px-4 py-3 text-sm font-semibold text-neutral-800 transition-colors hover:border-neutral-300"
                  >
                    <FaFilter className="text-sm text-neutral-500" />
                    <span>Filters</span>
                    <FaChevronDown
                      className={`text-xs text-neutral-500 transition-transform duration-200 ${isCarFilterPanelOpen ? "rotate-180" : ""}`}
                    />
                  </button>
                  {isCarFilterPanelOpen && (
                    <div className="absolute right-0 top-full z-[100] mt-2 w-[calc(100vw-2rem)] max-w-md rounded-xl border border-neutral-200 bg-white p-3 shadow-xl">
                      <div className="max-h-[calc(100vh-12rem)] overflow-y-auto rounded-lg bg-[#F5F5F5] p-4">
                        {renderCarFilters()}
                      </div>
                    </div>
                  )}
                </div>

                <div className="relative col-span-2" data-car-sort-dropdown>
                  <button
                    type="button"
                    onClick={() => {
                      setIsSortOpen((open) => !open);
                      setIsCarSearchOpen(false);
                      setIsCarFilterPanelOpen(false);
                    }}
                    className="flex w-full items-center justify-between gap-2 rounded-xl border border-neutral-200 bg-white px-4 py-2.5 text-sm font-medium text-neutral-800 transition-colors hover:border-neutral-300"
                  >
                    <span className="flex min-w-0 items-center gap-2">
                      <FaSort className="shrink-0 text-xs text-neutral-400" />
                      <span className="shrink-0">Sort by</span>
                      <span className="truncate font-semibold text-[#2563eb]">{sortLabels[sortBy]}</span>
                    </span>
                    <FaChevronDown
                      className={`shrink-0 text-[9px] text-neutral-400 transition-transform duration-200 ${isSortOpen ? "rotate-180" : ""}`}
                    />
                  </button>
                  {isSortOpen && (
                    <div className="absolute left-0 right-0 top-full z-[100] mt-1 overflow-hidden rounded-xl border border-neutral-200 bg-white shadow-xl">
                      {(["recommended", "price_low", "price_high"] as const).map((opt) => (
                        <button
                          key={opt}
                          type="button"
                          onClick={() => {
                            setSortBy(opt);
                            setIsSortOpen(false);
                          }}
                          className={`w-full px-4 py-3 text-left text-sm transition-colors hover:bg-neutral-100 ${sortBy === opt ? "bg-[#eff6ff] font-semibold text-[#2563eb]" : "text-neutral-700"}`}
                        >
                          {sortLabels[opt]}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>

            <div ref={wrapperRef} className={`${isCarSearchOpen ? "block" : "hidden"} lg:block`}>
              <div className="bg-[#F5F5F5] rounded-2xl border border-neutral-200 shadow-sm p-4 sm:p-5">
            {/* Main inputs strip */}
            <div className="flex flex-col lg:flex-row border border-neutral-200 rounded-xl overflow-visible mb-4">
              {/* Pick up & Drop off locations (From/To style) */}
              <div className="flex-1 flex items-center relative border-b lg:border-b-0 lg:border-r border-neutral-200 bg-white rounded-t-xl lg:rounded-t-none lg:rounded-l-xl">
                {/* Pick up */}
                <div className="flex-1 px-4 py-2.5 focus-within:ring-2 focus-within:ring-inset focus-within:ring-[#2563eb] rounded-t-xl lg:rounded-t-none lg:rounded-l-xl">
                  <span className="block text-[11px] text-neutral-400 font-medium leading-tight mb-0.5">
                    Pick up
                  </span>
                  <input
                    type="text"
                    placeholder="Search for location..."
                    value={carLocation}
                    onChange={(e) => setCarLocation(e.target.value)}
                    className="w-full text-[13px] font-semibold text-neutral-900 placeholder:text-neutral-400 outline-none bg-transparent"
                  />
                </div>

                {/* Swap Button */}
                <button
                  type="button"
                  onClick={() => {
                    const temp = carLocation;
                    setCarLocation(carDropOffLocation);
                    setCarDropOffLocation(temp);
                  }}
                  className="w-7 h-7 rounded-full border border-neutral-200 bg-white text-neutral-500 hover:text-neutral-800 hover:bg-neutral-50 flex items-center justify-center -mx-3.5 z-20 shrink-0 shadow-sm transition-colors"
                >
                  <FaExchangeAlt className="text-[10px]" />
                </button>

                {/* Drop off */}
                <div className="flex-1 px-4 py-2.5 focus-within:ring-2 focus-within:ring-inset focus-within:ring-[#2563eb]">
                  <span className="block text-[11px] text-neutral-400 font-medium leading-tight mb-0.5">
                    Drop off
                  </span>
                  <input
                    type="text"
                    placeholder="Search for location..."
                    value={carDropOffLocation}
                    onChange={(e) => setCarDropOffLocation(e.target.value)}
                    className="w-full text-[13px] font-semibold text-neutral-900 placeholder:text-neutral-400 outline-none bg-transparent"
                  />
                </div>
              </div>

              {/* Pick-up date */}
              <div
                onClick={() => {
                  setIsCarPickUpDateOpen(!isCarPickUpDateOpen);
                  setIsCarDropOffDateOpen(false);
                  setIsCarPickUpTimeOpen(false);
                  setIsCarDropOffTimeOpen(false);
                  setIsCarCountryOpen(false);
                }}
                className={`relative px-4 py-2.5 border-b lg:border-b-0 lg:border-r border-neutral-200 min-w-[130px] cursor-pointer bg-white transition-all ${
                  isCarPickUpDateOpen ? "ring-2 ring-inset ring-[#2563eb]" : ""
                }`}
              >
                <span className="block text-[11px] text-neutral-400 font-medium leading-tight mb-0.5">Pick-up date</span>
                <span className="block text-[13px] font-bold text-neutral-900 whitespace-nowrap">{fmtDate(carPickUpDate)}</span>
                {isCarPickUpDateOpen && renderCarDatePopover("pickup")}
              </div>

              {/* Pick-up time */}
              <div className="relative px-4 py-2.5 border-b lg:border-b-0 lg:border-r border-neutral-200 min-w-[90px] bg-white">
                <span className="block text-[11px] text-neutral-400 font-medium leading-tight mb-0.5">Time</span>
                <button
                  type="button"
                  onClick={() => { setIsCarPickUpTimeOpen(!isCarPickUpTimeOpen); setIsCarDropOffTimeOpen(false); setIsCarCountryOpen(false); }}
                  className="flex items-center gap-1 text-[13px] font-bold text-neutral-900 outline-none bg-transparent cursor-pointer"
                >
                  {carPickUpTime}
                  <FaChevronDown className={`text-[9px] text-neutral-400 transition-transform duration-200 ${isCarPickUpTimeOpen ? "rotate-180" : ""}`} />
                </button>
                {isCarPickUpTimeOpen && (
                  <div className="absolute top-full left-0 mt-1 w-28 bg-white border border-neutral-200 rounded-xl shadow-xl z-[100] overflow-hidden">
                    <div className="overflow-y-auto max-h-52 py-1">
                      {timeSlots.map(slot => (
                        <button key={slot} type="button"
                          onClick={() => { setCarPickUpTime(slot); setIsCarPickUpTimeOpen(false); }}
                          className={`w-full text-left px-4 py-2 text-sm transition-colors hover:bg-neutral-100 ${carPickUpTime === slot ? "text-[#2563eb] font-semibold bg-[#eff6ff]" : "text-neutral-700"}`}
                        >{slot}</button>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Drop-off date */}
              <div
                onClick={() => {
                  setIsCarDropOffDateOpen(!isCarDropOffDateOpen);
                  setIsCarPickUpDateOpen(false);
                  setIsCarPickUpTimeOpen(false);
                  setIsCarDropOffTimeOpen(false);
                  setIsCarCountryOpen(false);
                }}
                className={`relative px-4 py-2.5 border-b lg:border-b-0 lg:border-r border-neutral-200 min-w-[130px] cursor-pointer bg-white transition-all ${
                  isCarDropOffDateOpen ? "ring-2 ring-inset ring-[#2563eb]" : ""
                }`}
              >
                <span className="block text-[11px] text-neutral-400 font-medium leading-tight mb-0.5">Drop-off date</span>
                <span className="block text-[13px] font-bold text-neutral-900 whitespace-nowrap">{fmtDate(carDropOffDate)}</span>
                {isCarDropOffDateOpen && renderCarDatePopover("dropoff")}
              </div>

              {/* Drop-off time */}
              <div className="relative px-4 py-2.5 rounded-b-xl lg:rounded-b-none lg:rounded-r-xl min-w-[90px] bg-white">
                <span className="block text-[11px] text-neutral-400 font-medium leading-tight mb-0.5">Time</span>
                <button
                  type="button"
                  onClick={() => { setIsCarDropOffTimeOpen(!isCarDropOffTimeOpen); setIsCarPickUpTimeOpen(false); setIsCarCountryOpen(false); }}
                  className="flex items-center gap-1 text-[13px] font-bold text-neutral-900 outline-none bg-transparent cursor-pointer"
                >
                  {carDropOffTime}
                  <FaChevronDown className={`text-[9px] text-neutral-400 transition-transform duration-200 ${isCarDropOffTimeOpen ? "rotate-180" : ""}`} />
                </button>
                {isCarDropOffTimeOpen && (
                  <div className="absolute top-full right-0 mt-1 w-28 bg-white border border-neutral-200 rounded-xl shadow-xl z-[100] overflow-hidden">
                    <div className="overflow-y-auto max-h-52 py-1">
                      {timeSlots.map(slot => (
                        <button key={slot} type="button"
                          onClick={() => { setCarDropOffTime(slot); setIsCarDropOffTimeOpen(false); }}
                          className={`w-full text-left px-4 py-2 text-sm transition-colors hover:bg-neutral-100 ${carDropOffTime === slot ? "text-[#2563eb] font-semibold bg-[#eff6ff]" : "text-neutral-700"}`}
                        >{slot}</button>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Bottom row: age check, country, search */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <label className="flex items-center gap-2.5 cursor-pointer select-none text-xs sm:text-sm font-medium text-neutral-700">
                <div
                  onClick={() => setCarDriverAgeChecked(!carDriverAgeChecked)}
                  className={`w-[18px] h-[18px] rounded border-2 flex items-center justify-center transition-colors flex-shrink-0 ${
                    carDriverAgeChecked ? "bg-[#2563eb] border-[#2563eb] text-white" : "border-neutral-300 bg-white"
                  }`}
                >
                  {carDriverAgeChecked && <FiCheck className="text-[10px] stroke-[3]" />}
                </div>
                <span onClick={() => setCarDriverAgeChecked(!carDriverAgeChecked)}>Driver aged between 30 - 69</span>
              </label>

              <div className="flex items-center gap-3 self-stretch sm:self-auto justify-between sm:justify-end">
                {/* I live in dropdown */}
                <div className="relative">
                  <button
                    type="button"
                    onClick={() => { setIsCarCountryOpen(!isCarCountryOpen); setIsCarPickUpTimeOpen(false); setIsCarDropOffTimeOpen(false); }}
                    className="flex items-center gap-1.5 text-xs sm:text-sm font-medium text-neutral-700 hover:text-neutral-900 transition-colors"
                  >
                    <span>I live in <span className="text-[#2563eb] font-semibold">{carResidentCountry}</span></span>
                    <FaChevronDown className={`text-[10px] text-neutral-400 transition-transform duration-200 ${isCarCountryOpen ? "rotate-180" : ""}`} />
                  </button>
                  {isCarCountryOpen && (
                    <div className="absolute bottom-full right-0 mb-2 w-72 bg-white border border-neutral-200 rounded-xl shadow-xl z-[100] overflow-hidden">
                      <div className="p-3 border-b border-neutral-200">
                        <div className="flex items-center border-2 border-[#2563eb] rounded-lg px-3 py-2 gap-2">
                          <input
                            type="text"
                            placeholder="Search for country"
                            value={carCountrySearch}
                            onChange={(e) => setCarCountrySearch(e.target.value)}
                            className="flex-1 text-sm text-neutral-900 placeholder:text-neutral-400 outline-none bg-transparent"
                            autoFocus
                          />
                          <svg className="w-4 h-4 text-neutral-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                          </svg>
                        </div>
                      </div>
                      <div className="overflow-y-auto max-h-48">
                        {COUNTRIES.filter(c => c.toLowerCase().includes(carCountrySearch.toLowerCase())).map(country => (
                          <button
                            key={country} type="button"
                            onClick={() => { setCarResidentCountry(country); setIsCarCountryOpen(false); setCarCountrySearch(""); }}
                            className={`w-full text-left px-4 py-2.5 text-sm transition-colors hover:bg-neutral-100 ${carResidentCountry === country ? "text-[#2563eb] font-semibold bg-[#eff6ff]" : "text-neutral-700"}`}
                          >{country}</button>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                {/* Search button */}
                <button
                  type="button"
                  onClick={handleSearch}
                  className="bg-[#2563eb] hover:bg-[#1d4ed8] active:scale-95 text-white font-bold text-sm px-8 py-2.5 rounded-full transition-all duration-200 shadow-md hover:shadow-lg"
                >
                  Search
                </button>
              </div>
            </div>
          </div>
            </div>

        {/* ── Main Content: Sidebar + Car List ──────────────────────────── */}
          <div className="flex flex-col gap-6 lg:flex-row">

            {/* ── Left Sidebar ──────────────────────────────────────────── */}
            <aside className="hidden w-56 flex-shrink-0 lg:block">
              <div className="sticky top-24 rounded-2xl border border-neutral-200 bg-[#F5F5F5] p-4">
                {renderCarFilters()}
              </div>
            </aside>

            {/* ── Right: Car List ───────────────────────────────────────── */}
            <div className="flex-1 min-w-0">
              {/* Header row */}
              <div className="flex items-center justify-between mb-4">
                <div className="hidden lg:block">
                  <h1 className="text-xl font-bold text-neutral-900">Choose your car</h1>
                  <p className="text-sm text-neutral-400 mt-0.5">{filteredCars.length} results</p>
                </div>
                {/* Sort */}
                <div className="relative ml-auto hidden lg:block" data-car-sort-dropdown>
                  <button
                    type="button"
                    onClick={() => setIsSortOpen(!isSortOpen)}
                    className="flex items-center gap-2 bg-white border border-neutral-200 rounded-xl px-4 py-2.5 text-sm font-medium text-neutral-800 hover:border-neutral-300 transition-colors"
                  >
                    <FaSort className="text-neutral-400 text-xs" />
                    Sort by
                    <span className="text-[#2563eb] font-semibold">{sortLabels[sortBy]}</span>
                    <FaChevronDown className={`text-[9px] text-neutral-400 transition-transform duration-200 ${isSortOpen ? "rotate-180" : ""}`} />
                  </button>
                  {isSortOpen && (
                    <div className="absolute top-full right-0 mt-1 w-56 bg-white border border-neutral-200 rounded-xl shadow-xl z-[100] overflow-hidden">
                      {(["recommended","price_low","price_high"] as const).map(opt => (
                        <button key={opt} type="button"
                          onClick={() => { setSortBy(opt); setIsSortOpen(false); }}
                          className={`w-full text-left px-4 py-3 text-sm transition-colors hover:bg-neutral-100 ${sortBy === opt ? "text-[#2563eb] font-semibold bg-[#eff6ff]" : "text-neutral-700"}`}
                        >{sortLabels[opt]}</button>
                      ))}
                    </div>
                  )}
                </div>
                </div>
              </div>

              {/* Car cards */}
              <div className="flex flex-col gap-4">
                {filteredCars.length === 0 ? (
                  <div className="bg-[#F5F5F5] rounded-2xl border border-neutral-200 p-12 text-center">
                    <FaCar className="text-5xl text-neutral-300 mx-auto mb-4" />
                    <p className="text-neutral-400 text-lg font-medium">No cars match your filters.</p>
                    <p className="text-neutral-500 text-sm mt-1">Try adjusting or clearing some filters.</p>
                  </div>
                ) : filteredCars.map(car => (
                  <div key={car.id} className="bg-[#F5F5F5] border border-neutral-200 rounded-2xl overflow-hidden hover:border-neutral-300 transition-all">
                    {/* Inner layout */}
                    <div className="p-5">
                      <div className="flex flex-col sm:flex-row gap-4">
                        {/* Car image */}
                        <div className="flex-shrink-0 flex items-center justify-center w-full sm:w-48 h-32 bg-white rounded-xl overflow-hidden border border-neutral-100">
                          <img
                            src={car.image}
                            alt={car.name}
                            className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                          />
                        </div>

                        {/* Middle: details */}
                        <div className="flex-1 min-w-0">
                          {/* Title row */}
                          <div className="flex items-start justify-between gap-2 mb-3">
                            <div>
                              <h3 className="text-base font-bold text-neutral-900 leading-tight">
                                {car.name}
                                <span className="ml-2 text-xs font-normal text-neutral-400">or similar {car.category}</span>
                              </h3>
                            </div>
                            {car.discount > 0 && (
                              <span className="flex-shrink-0 bg-red-500 text-white text-xs font-bold px-2 py-0.5 rounded">
                                {car.discount}% off
                              </span>
                            )}
                          </div>

                          {/* Specs grid */}
                          <div className="grid grid-cols-2 gap-x-6 gap-y-1 mb-3">
                            <div className="flex items-center gap-2 text-xs text-neutral-700">
                              <FaUser className="text-[#2563eb] flex-shrink-0" />
                              <span>{car.seats} seats</span>
                            </div>
                            <div className="flex items-center gap-2 text-xs text-[#2563eb]">
                              <FaCheck className="flex-shrink-0" />
                              <span className="text-neutral-700">{car.mileage}{car.mileageExtra ? ` – ${car.mileageExtra}` : ""}</span>
                            </div>
                            <div className="flex items-center gap-2 text-xs text-neutral-700">
                              <FaDoorOpen className="text-[#2563eb] flex-shrink-0" />
                              <span>{car.doors} doors</span>
                            </div>
                            <div className="flex items-center gap-2 text-xs text-neutral-700">
                              <FaSuitcase className="text-[#2563eb] flex-shrink-0" />
                              <span>{car.bags} {car.bags === 1 ? "bag" : "bags"}</span>
                            </div>
                            <div className="flex items-center gap-2 text-xs text-neutral-700">
                              <FaCog className="text-[#2563eb] flex-shrink-0" />
                              <span>{car.transmission}</span>
                            </div>
                            <div className="flex items-center gap-2 text-xs text-neutral-700">
                              <FaGasPump className="text-[#2563eb] flex-shrink-0" />
                              <span>{car.fuel}</span>
                            </div>
                          </div>

                          {/* Pickup policy */}
                          <p className="text-xs text-neutral-400 mb-2">
                            • {car.pickupPolicy}
                          </p>

                          {/* Free cancellation + price */}
                          <div className="flex items-end justify-between mt-2">
                            <div>
                              <p className="text-[#2563eb] text-xs font-semibold flex items-center gap-1 mb-1">
                                <FaCheck /> Free cancellation
                              </p>
                              <div className="flex items-center gap-2 text-xs text-neutral-400">
                                <FaMapMarkerAlt className="text-neutral-500" />
                                <span>{car.location}</span>
                              </div>
                            </div>
                            <div className="text-right">
                              <p className="text-xs text-neutral-500 line-through">${car.originalPrice.toFixed(2)}</p>
                              <p className="text-2xl font-extrabold text-neutral-900">${car.priceTotal.toFixed(2)}<span className="text-sm font-normal text-neutral-400"> total</span></p>
                              <p className="text-xs text-neutral-400">${car.priceDay.toFixed(2)} /day</p>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Footer: supplier + view deal */}
                      <div className="mt-4 flex flex-col gap-3 border-t border-neutral-200 pt-4 sm:flex-row sm:items-center sm:justify-between">
                        <div className="flex flex-wrap items-center gap-3">
                          <SupplierBadge supplier={car.supplier} color={car.supplierColor} />
                          <span className="text-xs text-neutral-400">Supplied by {car.supplier}</span>
                          <button className="flex items-center gap-1 text-xs text-[#2563eb] hover:text-[#1d4ed8] transition-colors">
                            <FaInfoCircle className="text-[10px]" /> Important info
                          </button>
                        </div>
                        <button
                          type="button"
                          onClick={() => {
                            const params = new URLSearchParams();
                            params.set("id", String(car.id));
                            if (carLocation) params.set("location", carLocation);
                            params.set("pickupDate", carPickUpDate.toISOString());
                            params.set("pickupTime", carPickUpTime);
                            params.set("dropoffDate", carDropOffDate.toISOString());
                            params.set("dropoffTime", carDropOffTime);
                            router.push(`/cars/payment?${params.toString()}`);
                          }}
                          className="w-full whitespace-nowrap rounded-full bg-[#2563eb] px-4 py-2.5 text-sm font-bold text-white shadow-md transition-all hover:bg-[#1d4ed8] active:scale-95 sm:w-auto sm:px-6"
                        >
                          View deal
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}

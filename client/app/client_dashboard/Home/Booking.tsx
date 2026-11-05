"use client";
import { useEffect, useRef, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { FaPlane, FaHotel, FaCar, FaPlus, FaMinus, FaChevronDown, FaMapMarkerAlt, FaExchangeAlt, FaBaby } from "react-icons/fa";
import { MdApartment, MdClose } from "react-icons/md";
import { IoSparklesOutline } from "react-icons/io5";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import { FiCheck, FiChevronRight, FiChevronLeft } from "react-icons/fi";
import { LuUser } from "react-icons/lu";

const POPULAR_CITIES = [
  "Makkah", "Cox's Bazar", "Al Madinah", "Kolkata",
  "Dhaka", "Singapore", "Phuket", "Bangkok",
  "Krabi", "Darjeeling", "Phi Phi Don", "Kuala Lumpur",
  "Guangzhou", "New Delhi", "Kathmandu", "Sylhet"
];

const COUNTRIES = [
  "Afghanistan", "Albania", "Algeria", "American Samoa", "Andorra", "Angola",
  "Antigua and Barbuda", "Argentina", "Armenia", "Australia", "Austria",
  "Azerbaijan", "Bahamas", "Bahrain", "Bangladesh", "Barbados", "Belarus",
  "Belgium", "Belize", "Benin", "Bhutan", "Bolivia", "Bosnia and Herzegovina",
  "Botswana", "Brazil", "Brunei", "Bulgaria", "Burkina Faso", "Burundi",
  "Cabo Verde", "Cambodia", "Cameroon", "Canada", "Central African Republic",
  "Chad", "Chile", "China", "Colombia", "Comoros", "Congo", "Costa Rica",
  "Croatia", "Cuba", "Cyprus", "Czech Republic", "Denmark", "Djibouti",
  "Dominica", "Dominican Republic", "Ecuador", "Egypt", "El Salvador",
  "Equatorial Guinea", "Eritrea", "Estonia", "Eswatini", "Ethiopia", "Fiji",
  "Finland", "France", "Gabon", "Gambia", "Georgia", "Germany", "Ghana",
  "Greece", "Grenada", "Guatemala", "Guinea", "Guinea-Bissau", "Guyana",
  "Haiti", "Honduras", "Hungary", "Iceland", "India", "Indonesia", "Iran",
  "Iraq", "Ireland", "Israel", "Italy", "Jamaica", "Japan", "Jordan",
  "Kazakhstan", "Kenya", "Kiribati", "Kuwait", "Kyrgyzstan", "Laos",
  "Latvia", "Lebanon", "Lesotho", "Liberia", "Libya", "Liechtenstein",
  "Lithuania", "Luxembourg", "Madagascar", "Malawi", "Malaysia", "Maldives",
  "Mali", "Malta", "Marshall Islands", "Mauritania", "Mauritius", "Mexico",
  "Micronesia", "Moldova", "Monaco", "Mongolia", "Montenegro", "Morocco",
  "Mozambique", "Myanmar", "Namibia", "Nauru", "Nepal", "Netherlands",
  "New Zealand", "Nicaragua", "Niger", "Nigeria", "North Korea",
  "North Macedonia", "Norway", "Oman", "Pakistan", "Palau", "Palestine",
  "Panama", "Papua New Guinea", "Paraguay", "Peru", "Philippines", "Poland",
  "Portugal", "Qatar", "Romania", "Russia", "Rwanda", "Saint Kitts and Nevis",
  "Saint Lucia", "Saint Vincent and the Grenadines", "Samoa", "San Marino",
  "Sao Tome and Principe", "Saudi Arabia", "Senegal", "Serbia", "Seychelles",
  "Sierra Leone", "Singapore", "Slovakia", "Slovenia", "Solomon Islands",
  "Somalia", "South Africa", "South Korea", "South Sudan", "Spain",
  "Sri Lanka", "Sudan", "Suriname", "Sweden", "Switzerland", "Syria",
  "Taiwan", "Tajikistan", "Tanzania", "Thailand", "Timor-Leste", "Togo",
  "Tonga", "Trinidad and Tobago", "Tunisia", "Turkey", "Turkmenistan",
  "Tuvalu", "Uganda", "Ukraine", "United Arab Emirates", "United Kingdom",
  "United States", "Uruguay", "Uzbekistan", "Vanuatu", "Vatican City",
  "Venezuela", "Vietnam", "Yemen", "Zambia", "Zimbabwe",
];

const FLIGHT_POPULAR_CITIES = [
  "Dhaka", "Jeddah", "Chittagong", "Riyadh",
  "Doha", "Al Madinah", "Dubai", "Muscat",
  "Dammam", "Kuwait City", "Sylhet", "Kuala Lumpur",
  "Chennai", "Cairo", "Kolkata", "New Delhi"
];

const TABS = [
  { id: "hotels" as const, label: "Hotels", icon: FaHotel },
  { id: "apartments" as const, label: "Apartments", icon: MdApartment },
  { id: "flights" as const, label: "Flights", icon: FaPlane },
  { id: "cars" as const, label: "Cars", icon: FaCar },
];

const destinations = [
  {
    name: "Burj Khalifa & Downtown",
    country: "Dubai, UAE",
    rating: "4.9",
    tag: "Iconic Skyline",
    price: "$1,850",
    image:
      "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&w=700&q=80",
  },
  {
    name: "Santorini Caldera",
    country: "Cyclades, Greece",
    rating: "5.0",
    tag: "Island Retreat",
    price: "$2,400",
    image:
      "https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?auto=format&fit=crop&w=700&q=80",
  },
  {
    name: "Amalfi Coastline",
    country: "Campania, Italy",
    rating: "4.8",
    tag: "Mediterranean",
    price: "$2,150",
    image:
      "https://images.unsplash.com/photo-1533105079780-92b9be482077?auto=format&fit=crop&w=700&q=80",
  },
  {
    name: "Mount Fuji & Five Lakes",
    country: "Honshu, Japan",
    rating: "4.9",
    tag: "Nature & Zen",
    price: "$2,800",
    image:
      "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&w=700&q=80",
  },
  {
    name: "Maldives Private Atolls",
    country: "Maldives",
    rating: "5.0",
    tag: "Luxury Overwater",
    price: "$3,600",
    image:
      "https://images.unsplash.com/photo-1514282401047-d79a71a590e8?auto=format&fit=crop&w=700&q=80",
  },
  {
    name: "Swiss Alpine Valleys",
    country: "Zermatt, Switzerland",
    rating: "4.9",
    tag: "Glacier Peak",
    price: "$2,950",
    image:
      "https://images.unsplash.com/photo-1530122037265-a5f1f91d3b99?auto=format&fit=crop&w=700&q=80",
  },
  {
    name: "Bali Jungle Sanctuary",
    country: "Ubud, Indonesia",
    rating: "4.9",
    tag: "Tropical Haven",
    price: "$1,450",
    image:
      "https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=700&q=80",
  },
  {
    name: "Cappadocia Hot Air Balloon",
    country: "Nevsehir, Turkey",
    rating: "4.8",
    tag: "Fairy Chimneys",
    price: "$1,720",
    image:
      "https://images.unsplash.com/photo-1507652313519-d4e9174996dd?auto=format&fit=crop&w=700&q=80",
  },
];

const Booking = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [activeTab, setActiveTab] = useState<"hotels" | "apartments" | "flights" | "cars">("hotels");
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const sliderRef = useRef<HTMLDivElement | null>(null);

  // Sync activeTab from URL search params or custom events
  useEffect(() => {
    const tabParam = searchParams?.get("tab");
    if (tabParam && ["hotels", "apartments", "flights", "cars"].includes(tabParam)) {
      setActiveTab(tabParam as any);
    }
  }, [searchParams]);

  useEffect(() => {
    const handleSetTab = (e: any) => {
      const tab = e?.detail?.tab;
      if (tab && ["hotels", "apartments", "flights", "cars"].includes(tab)) {
        setActiveTab(tab);
      }
    };
    window.addEventListener("mongzo-set-booking-tab", handleSetTab);
    return () => {
      window.removeEventListener("mongzo-set-booking-tab", handleSetTab);
    };
  }, []);

  // Stays & Apartments Filter States
  const [destination, setDestination] = useState("Dhaka, Bangladesh");
  const [isDestOpen, setIsDestOpen] = useState(false);
  const [isCalendarOpen, setIsCalendarOpen] = useState(false);
  const [isGuestsOpen, setIsGuestsOpen] = useState(false);
  const [freeCancellation, setFreeCancellation] = useState(false);

  // Calendar Date State (defaults: 4 Nov 2026 to 5 Nov 2026 as in mockup)
  const [checkInDate, setCheckInDate] = useState<Date>(new Date(2026, 10, 4));
  const [checkOutDate, setCheckOutDate] = useState<Date>(new Date(2026, 10, 5));
  const [calendarViewDate, setCalendarViewDate] = useState<Date>(new Date(2026, 10, 1));

  // Guests & Rooms State
  const [rooms, setRooms] = useState([
    { adults: 2, children: 0, childAge: 12 },
  ]);

  // Flights Filter States (Image 1 - 5)
  const [flightTripType, setFlightTripType] = useState<"oneway" | "roundtrip" | "multicity">("roundtrip");
  const [flightOrigin, setFlightOrigin] = useState("Dhaka (All)");
  const [flightDestination, setFlightDestination] = useState("");
  const [flightDepartDate, setFlightDepartDate] = useState<Date>(new Date(2026, 10, 5));
  const [flightReturnDate, setFlightReturnDate] = useState<Date | null>(null);
  const [flightDirectOnly, setFlightDirectOnly] = useState(false);

  // Multi-city Flights rows (Image 2)
  const [multiCityFlights, setMultiCityFlights] = useState([
    { from: "", to: "", departDate: new Date(2026, 10, 5) },
    { from: "", to: "", departDate: null as Date | null },
    { from: "", to: "", departDate: null as Date | null },
  ]);

  // Flights Popups state
  const [isFlightFromOpen, setIsFlightFromOpen] = useState(false);
  const [isFlightToOpen, setIsFlightToOpen] = useState(false);
  const [multiCityActiveInput, setMultiCityActiveInput] = useState<{ rowIdx: number; field: "from" | "to" } | null>(null);
  const [multiCityDateIdx, setMultiCityDateIdx] = useState<number | null>(null);
  const [isFlightDateOpen, setIsFlightDateOpen] = useState(false);
  const [isFlightPassengersOpen, setIsFlightPassengersOpen] = useState(false);
  const [isFlightClassOpen, setIsFlightClassOpen] = useState(false);
  const [isFlightPaymentOpen, setIsFlightPaymentOpen] = useState(false);

  // Flights Passengers state
  const [flightAdults, setFlightAdults] = useState(2);
  const [flightChildren, setFlightChildren] = useState(1);
  const [flightInfants, setFlightInfants] = useState(1);
  const [flightCabinClass, setFlightCabinClass] = useState("Economy");
  const [flightPaymentTypes, setFlightPaymentTypes] = useState("4 Payment Types");


  const handleFlightSearch = () => {
    const params = new URLSearchParams();
    params.set("tripType", flightTripType);
    if (flightTripType === "multicity") {
      params.set("multiCity", JSON.stringify(multiCityFlights));
    } else {
      params.set("origin", flightOrigin);
      params.set("destination", flightDestination);
      if (flightDepartDate) params.set("departDate", flightDepartDate.toISOString());
      if (flightReturnDate) params.set("returnDate", flightReturnDate.toISOString());
    }
    params.set("adults", String(flightAdults));
    params.set("children", String(flightChildren));
    params.set("infants", String(flightInfants));
    params.set("cabinClass", flightCabinClass);
    params.set("paymentTypes", flightPaymentTypes);
    if (flightDirectOnly) params.set("directOnly", "true");

    router.push(`/flights?${params.toString()}`);
  };

  const totalFlightPassengers = flightAdults + flightChildren + flightInfants;
  const flightPassengersLabel = `${totalFlightPassengers} passenger${totalFlightPassengers > 1 ? "s" : ""}`;

  // Cars Filter States (Image 2)
  const [carDiffLocation, setCarDiffLocation] = useState(false);
  const [carLocation, setCarLocation] = useState("");
  const [carPickUpDate, setCarPickUpDate] = useState<Date>(new Date(2026, 10, 5));
  const [carPickUpTime, setCarPickUpTime] = useState("10:00");
  const [carDropOffDate, setCarDropOffDate] = useState<Date>(new Date(2026, 10, 10));
  const [carDropOffTime, setCarDropOffTime] = useState("10:00");
  const [carDriverAgeChecked, setCarDriverAgeChecked] = useState(true);
  const [carResidentCountry, setCarResidentCountry] = useState("Bangladesh");
  const [isCarCountryOpen, setIsCarCountryOpen] = useState(false);
  const [carCountrySearch, setCarCountrySearch] = useState("");
  const [isCarPickUpTimeOpen, setIsCarPickUpTimeOpen] = useState(false);
  const [isCarDropOffTimeOpen, setIsCarDropOffTimeOpen] = useState(false);

  // Click outside listener for dropdowns
  const filterWrapperRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (filterWrapperRef.current && !filterWrapperRef.current.contains(e.target as Node)) {
        setIsDestOpen(false);
        setIsCalendarOpen(false);
        setIsGuestsOpen(false);
        setIsFlightFromOpen(false);
        setIsFlightToOpen(false);
        setMultiCityActiveInput(null);
        setMultiCityDateIdx(null);
        setIsFlightDateOpen(false);
        setIsFlightPassengersOpen(false);
        setIsFlightClassOpen(false);
        setIsFlightPaymentOpen(false);
        setIsCarCountryOpen(false);
        setIsCarPickUpTimeOpen(false);
        setIsCarDropOffTimeOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const totalAdults = rooms.reduce((acc, r) => acc + r.adults, 0);
  const totalChildren = rooms.reduce((acc, r) => acc + r.children, 0);
  const guestsSummary = `${totalAdults} Adult${totalAdults > 1 ? "s" : ""}${
    totalChildren > 0 ? `, ${totalChildren} Child${totalChildren > 1 ? "ren" : ""}` : ""
  } in ${rooms.length} Room${rooms.length > 1 ? "s" : ""}`;

  const formatDisplayDate = (d: Date) => {
    const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fr", "Sa"];
    const months = [
      "Jan", "Feb", "Mar", "Apr", "May", "Jun",
      "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
    ];
    const dayName = days[d.getDay()];
    const dateNum = String(d.getDate()).padStart(2, "0");
    const mon = months[d.getMonth()];
    const yr = d.getFullYear();
    return `${dayName}, ${dateNum} ${mon} ${yr}`;
  };

  const getDaysInMonth = (year: number, month: number) => {
    return new Date(year, month + 1, 0).getDate();
  };

  const getFirstDayOfMonth = (year: number, month: number) => {
    return new Date(year, month, 1).getDay();
  };

  const isSameDay = (d1: Date, d2: Date) => {
    return (
      d1.getFullYear() === d2.getFullYear() &&
      d1.getMonth() === d2.getMonth() &&
      d1.getDate() === d2.getDate()
    );
  };

  const isInRange = (d: Date, start: Date, end: Date) => {
    const t = d.getTime();
    const s = new Date(start.getFullYear(), start.getMonth(), start.getDate()).getTime();
    const e = new Date(end.getFullYear(), end.getMonth(), end.getDate()).getTime();
    return t > s && t < e;
  };

  const handleDateClick = (dayDate: Date) => {
    if (dayDate < checkInDate || (isSameDay(dayDate, checkInDate) && checkOutDate)) {
      setCheckInDate(dayDate);
      const nextDay = new Date(dayDate);
      nextDay.setDate(nextDay.getDate() + 1);
      setCheckOutDate(nextDay);
    } else if (isSameDay(dayDate, checkOutDate)) {
      // Keep as checkout
    } else if (dayDate > checkInDate) {
      setCheckOutDate(dayDate);
    }
  };

  const renderMonthCalendar = (monthOffset: number) => {
    const targetMonthDate = new Date(
      calendarViewDate.getFullYear(),
      calendarViewDate.getMonth() + monthOffset,
      1
    );
    const year = targetMonthDate.getFullYear();
    const month = targetMonthDate.getMonth();
    const monthNames = [
      "January", "February", "March", "April", "May", "June",
      "July", "August", "September", "October", "November", "December"
    ];
    const daysInMonth = getDaysInMonth(year, month);
    const firstDay = getFirstDayOfMonth(year, month);
    const prevMonthDays = getDaysInMonth(year, month - 1);

    const cells = [];
    // Prev month days
    for (let i = firstDay - 1; i >= 0; i--) {
      cells.push({
        day: prevMonthDays - i,
        isCurrentMonth: false,
        date: new Date(year, month - 1, prevMonthDays - i),
      });
    }
    // Current month days
    for (let i = 1; i <= daysInMonth; i++) {
      cells.push({
        day: i,
        isCurrentMonth: true,
        date: new Date(year, month, i),
      });
    }

    return (
      <div className="flex-1 min-w-[250px]">
        <div className="text-center font-bold text-neutral-800 text-sm mb-3">
          {monthNames[month]} {year}
        </div>
        <div className="grid grid-cols-7 gap-y-1 text-center text-xs text-neutral-400 font-medium mb-1.5">
          <span>Su</span>
          <span>Mo</span>
          <span>Tu</span>
          <span>We</span>
          <span>Th</span>
          <span>Fr</span>
          <span>Sa</span>
        </div>
        <div className="grid grid-cols-7 gap-y-1 text-center text-xs">
          {cells.map((cell, idx) => {
            const isCheckIn = cell.isCurrentMonth && isSameDay(cell.date, checkInDate);
            const isCheckOut = cell.isCurrentMonth && isSameDay(cell.date, checkOutDate);
            const inRange = cell.isCurrentMonth && isInRange(cell.date, checkInDate, checkOutDate);
            const isNewYearsEve = cell.isCurrentMonth && month === 11 && cell.day === 31;

            let bgClass = "hover:bg-neutral-100 text-neutral-700";
            if (!cell.isCurrentMonth) {
              bgClass = "text-neutral-300 pointer-events-none";
            } else if (isCheckIn) {
              bgClass = "bg-[#2563eb] text-white font-bold rounded-l-md shadow-sm";
            } else if (isCheckOut) {
              bgClass = "bg-[#2563eb] text-white font-bold rounded-r-md shadow-sm";
            } else if (inRange) {
              bgClass = "bg-[#a3e892]/60 text-neutral-900";
            }

            return (
              <button
                key={idx}
                type="button"
                disabled={!cell.isCurrentMonth}
                onClick={() => cell.isCurrentMonth && handleDateClick(cell.date)}
                className={`h-8 flex items-center justify-center transition-colors relative text-xs ${bgClass}`}
              >
                <span>{cell.day}</span>
                {isNewYearsEve && !isCheckIn && !isCheckOut && (
                  <span className="text-red-500 font-semibold absolute top-1 right-1 text-[9px] leading-none">*</span>
                )}
              </button>
            );
          })}
        </div>
      </div>
    );
  };

  // Reusable Flight City Popover (opens under any From or To input box)
  const renderFlightCityPopover = (
    placeholder: string,
    currentValue: string,
    onSelect: (city: string) => void,
    onClose: () => void,
    alignRight = false
  ) => {
    return (
      <div
        className={`absolute top-full mt-2 w-full sm:w-[460px] z-50 bg-white rounded-2xl shadow-2xl border border-neutral-200/80 p-5 animate-in fade-in zoom-in-95 duration-150 ${
          alignRight ? "right-0" : "left-0"
        }`}
      >
        {/* Top Input Box with Green Border */}
        <div className="border border-[#2563eb] rounded-xl px-4 py-3 mb-5 ring-1 ring-[#2563eb] bg-white">
          <input
            type="text"
            placeholder={placeholder}
            defaultValue={currentValue}
            autoFocus
            className="w-full text-sm font-semibold text-neutral-900 outline-none bg-transparent placeholder:text-neutral-400"
          />
        </div>

        {/* Popular Cities 4x4 Grid */}
        <div>
          <h4 className="text-xs font-bold text-neutral-800 mb-3 tracking-wide">
            Popular cities
          </h4>
          <div className="grid grid-cols-4 gap-y-3.5 gap-x-2 text-xs font-medium text-neutral-700">
            {FLIGHT_POPULAR_CITIES.map((city) => {
              const isChittagong = city === "Chittagong";
              return (
                <button
                  key={city}
                  type="button"
                  onClick={() => {
                    onSelect(city);
                    onClose();
                  }}
                  className={`text-left py-1 px-2 rounded-lg transition-colors truncate ${
                    isChittagong
                      ? "bg-[#eff6ff] text-[#1d4ed8] font-semibold"
                      : "hover:bg-neutral-100 hover:text-neutral-950"
                  }`}
                >
                  {city}
                </button>
              );
            })}
          </div>
        </div>
      </div>
    );
  };

  useEffect(() => {
    const activeIndex = TABS.findIndex((tab) => tab.id === activeTab);
    const activeEl = tabRefs.current[activeIndex];
    const slider = sliderRef.current;
    if (activeEl && slider) {
      slider.style.left = `${activeEl.offsetLeft}px`;
      slider.style.width = `${activeEl.offsetWidth}px`;
      slider.style.height = `${activeEl.offsetHeight}px`;
    }
  }, [activeTab]);



  return (
    <section className="relative z-10 w-full bg-white pt-24 pb-8">
      <div className="mx-auto w-full max-w-[1500px] p-4 sm:p-6 md:p-8 lg:p-10 text-neutral-900">
            {/* Top Search Widget Header Tabs */}
            <div className="flex flex-col gap-4 pb-5 border-b border-neutral-200/80">
              {/* Category Navigation (Hotels, Apartments, Flights, Cars) with Sliding Active Pill */}
              <div className="flex justify-center pb-2">
                <div className="relative inline-flex items-center bg-sky-500/10 backdrop-blur-md p-1.5 rounded-full border border-sky-300/30 shadow-inner">
                  {/* Sliding active pill indicator */}
                  <div
                    ref={sliderRef}
                    className="absolute top-1.5 bottom-1.5 rounded-full bg-white shadow-md transition-all duration-300 ease-out pointer-events-none"
                    style={{ left: 6, width: 0 }}
                  />

                  {TABS.map((tab, idx) => {
                    const Icon = tab.icon;
                    const isActive = activeTab === tab.id;
                    return (
                      <button
                        key={tab.id}
                        type="button"
                        ref={(el) => {
                          tabRefs.current[idx] = el;
                        }}
                        onClick={() => setActiveTab(tab.id)}
                        className={`relative z-10 flex items-center gap-2 px-5 sm:px-7 py-2.5 rounded-full text-xs sm:text-sm font-semibold transition-colors duration-200 select-none ${
                          isActive
                            ? "text-blue-600 font-bold"
                            : "text-neutral-600 hover:text-neutral-900"
                        }`}
                      >
                        <Icon className={`text-base sm:text-lg transition-transform duration-200 ${isActive ? "scale-110 text-blue-600" : "text-neutral-500"}`} />
                        <span>{tab.label}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Top Filter Content: Switches between Hotels/Apartments, Flights, and Cars */}
              {activeTab === "hotels" || activeTab === "apartments" ? (
                <div
                  ref={filterWrapperRef}
                  className="bg-white rounded-2xl border border-neutral-200 shadow-sm p-4 sm:p-6 transition-all"
                >
                  {/* Header Row: Title & "Search with AI" button */}
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-5">
                    <h2 className="text-base sm:text-lg font-medium text-neutral-800">
                      Where would you like to stay?
                    </h2>
                    <button
                      type="button"
                      className="inline-flex items-center gap-2 self-start sm:self-auto px-4 py-2 rounded-xl border border-neutral-200/90 hover:border-neutral-300 bg-white hover:bg-neutral-50 text-xs sm:text-[13px] font-medium text-neutral-700 shadow-sm transition-all"
                    >
                      <IoSparklesOutline className="text-sm text-neutral-600" />
                      <span>Search with AI</span>
                      <span className="bg-[#ff6a00] text-white text-[10px] font-bold px-1.5 py-0.5 rounded-md leading-none">
                        New
                      </span>
                      <span className="w-1.5 h-1.5 rounded-full bg-[#ff6a00] inline-block" />
                    </button>
                  </div>

                  {/* Main Inputs Bar */}
                  <div className="grid grid-cols-1 md:grid-cols-12 gap-3 relative">
                    {/* Destination Input Box */}
                    <div className="md:col-span-4 relative">
                      <div
                        onClick={() => {
                          setIsDestOpen(!isDestOpen);
                          setIsCalendarOpen(false);
                          setIsGuestsOpen(false);
                        }}
                        className={`border rounded-xl px-4 py-2.5 cursor-pointer bg-white transition-all ${
                          isDestOpen
                            ? "border-[#2563eb] ring-1 ring-[#2563eb]"
                            : "border-neutral-200 hover:border-neutral-300"
                        }`}
                      >
                        <span className="block text-[11px] text-neutral-400 font-medium leading-tight">
                          Destination
                        </span>
                        <span className="block text-sm font-semibold text-neutral-900 mt-0.5 truncate">
                          {destination || "Search city or destination"}
                        </span>
                      </div>

                      {/* Destination Dropdown Popup (Image 2) */}
                      {isDestOpen && (
                        <div className="absolute top-full left-0 mt-2 w-full sm:w-[480px] z-50 bg-white rounded-2xl shadow-2xl border border-neutral-200/80 p-5 animate-in fade-in zoom-in-95 duration-150">
                          {/* Search Input inside popover */}
                          <div className="relative mb-5">
                            <div className="border border-[#2563eb] rounded-xl px-3.5 py-2.5 flex items-center justify-between bg-white ring-1 ring-[#2563eb]">
                              <div className="w-full">
                                <label className="block text-[11px] text-neutral-400 leading-none mb-1">
                                  Search By City, District, Region, Hotel Name
                                </label>
                                <input
                                  type="text"
                                  value={destination}
                                  onChange={(e) => setDestination(e.target.value)}
                                  autoFocus
                                  className="w-full text-sm font-bold text-neutral-900 outline-none bg-transparent"
                                />
                              </div>
                              {destination && (
                                <button
                                  type="button"
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    setDestination("");
                                  }}
                                  className="w-5 h-5 rounded-full bg-neutral-500 text-white flex items-center justify-center hover:bg-neutral-600 transition-colors ml-2 shrink-0"
                                >
                                  <MdClose className="text-xs" />
                                </button>
                              )}
                            </div>
                          </div>

                          {/* Popular Cities Grid */}
                          <div>
                            <h4 className="text-xs font-bold text-neutral-800 mb-3 tracking-wide">
                              Popular cities
                            </h4>
                            <div className="grid grid-cols-2 sm:grid-cols-4 gap-y-3 gap-x-2 text-xs font-medium text-neutral-700">
                              {POPULAR_CITIES.map((city) => (
                                <button
                                  key={city}
                                  type="button"
                                  onClick={() => {
                                    setDestination(`${city}, ${city === "Dhaka" || city === "Cox's Bazar" || city === "Sylhet" ? "Bangladesh" : ""}`.replace(/,\s*$/, ""));
                                    setIsDestOpen(false);
                                  }}
                                  className="text-left py-1 px-2 hover:bg-neutral-100 hover:text-neutral-950 rounded-lg transition-colors truncate"
                                >
                                  {city}
                                </button>
                              ))}
                            </div>
                          </div>
                        </div>
                      )}
                    </div>

                    {/* Dates Container (Check-in & Check-out in split border) */}
                    <div className="md:col-span-4 relative">
                      <div
                        onClick={() => {
                          setIsCalendarOpen(!isCalendarOpen);
                          setIsDestOpen(false);
                          setIsGuestsOpen(false);
                        }}
                        className={`grid grid-cols-2 border rounded-xl bg-white cursor-pointer transition-all overflow-hidden ${
                          isCalendarOpen
                            ? "border-[#2563eb] ring-1 ring-[#2563eb]"
                            : "border-neutral-200 hover:border-neutral-300"
                        }`}
                      >
                        {/* Check In Box */}
                        <div className="px-3.5 py-2.5 border-r border-neutral-200">
                          <span className="block text-[11px] text-neutral-400 font-medium leading-tight">
                            Check In
                          </span>
                          <span className="block text-xs sm:text-[13px] font-semibold text-neutral-900 mt-0.5 truncate">
                            {formatDisplayDate(checkInDate)}
                          </span>
                        </div>

                        {/* Check Out Box */}
                        <div className="px-3.5 py-2.5">
                          <span className="block text-[11px] text-neutral-400 font-medium leading-tight">
                            Check Out
                          </span>
                          <span className="block text-xs sm:text-[13px] font-semibold text-neutral-900 mt-0.5 truncate">
                            {formatDisplayDate(checkOutDate)}
                          </span>
                        </div>
                      </div>

                      {/* Calendar Dropdown Popup (Image 3) */}
                      {isCalendarOpen && (
                        <div className="absolute top-full left-0 md:-left-16 mt-2 z-50 bg-white rounded-2xl shadow-2xl border border-neutral-200/80 p-5 w-[95vw] max-w-[620px] animate-in fade-in zoom-in-95 duration-150">
                          {/* Active Selection Header */}
                          <div className="grid grid-cols-2 border border-[#2563eb] rounded-xl overflow-hidden mb-4">
                            <div className="p-3 border-r border-[#2563eb]/30 bg-neutral-50/50">
                              <span className="block text-[11px] text-neutral-400 font-medium leading-tight">
                                Check In
                              </span>
                              <span className="block text-xs sm:text-sm font-bold text-neutral-900 mt-0.5">
                                {formatDisplayDate(checkInDate)}
                              </span>
                            </div>
                            <div className="p-3 bg-white">
                              <span className="block text-[11px] text-neutral-400 font-medium leading-tight">
                                Check Out
                              </span>
                              <span className="block text-xs sm:text-sm font-bold text-neutral-900 mt-0.5">
                                {formatDisplayDate(checkOutDate)}
                              </span>
                            </div>
                          </div>

                          {/* Month Navigation & Two Months Display */}
                          <div className="relative mb-3">
                            <div className="flex items-center justify-between mb-2 px-1">
                              <button
                                type="button"
                                onClick={() =>
                                  setCalendarViewDate(
                                    new Date(calendarViewDate.getFullYear(), calendarViewDate.getMonth() - 1, 1)
                                  )
                                }
                                className="w-7 h-7 rounded-full flex items-center justify-center text-neutral-500 hover:bg-neutral-100 transition-colors"
                              >
                                <IoIosArrowBack />
                              </button>
                              <button
                                type="button"
                                onClick={() =>
                                  setCalendarViewDate(
                                    new Date(calendarViewDate.getFullYear(), calendarViewDate.getMonth() + 1, 1)
                                  )
                                }
                                className="w-7 h-7 rounded-full flex items-center justify-center text-neutral-500 hover:bg-neutral-100 transition-colors"
                              >
                                <IoIosArrowForward />
                              </button>
                            </div>

                            <div className="flex flex-col sm:flex-row gap-6">
                              {renderMonthCalendar(0)}
                              {renderMonthCalendar(1)}
                            </div>
                          </div>

                          {/* Public Holidays Legend */}
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
                      )}
                    </div>

                    {/* Guests & Rooms Box */}
                    <div className="md:col-span-4 relative">
                      <div
                        onClick={() => {
                          setIsGuestsOpen(!isGuestsOpen);
                          setIsDestOpen(false);
                          setIsCalendarOpen(false);
                        }}
                        className={`flex items-center justify-between border rounded-xl px-4 py-2.5 cursor-pointer bg-white transition-all ${
                          isGuestsOpen
                            ? "border-[#2563eb] ring-1 ring-[#2563eb]"
                            : "border-neutral-200 hover:border-neutral-300"
                        }`}
                      >
                        <div className="truncate pr-2">
                          <span className="block text-[11px] text-neutral-400 font-medium leading-tight">
                            Guests & Rooms
                          </span>
                          <span className="block text-xs sm:text-[13px] font-semibold text-neutral-900 mt-0.5 truncate">
                            {guestsSummary}
                          </span>
                        </div>
                        <FaChevronDown className="text-neutral-400 text-xs shrink-0" />
                      </div>

                      {/* Guests & Rooms Dropdown Popup (Image 4) */}
                      {isGuestsOpen && (
                        <div className="absolute top-full right-0 mt-2 w-full sm:w-[420px] z-50 bg-white rounded-2xl shadow-2xl border border-neutral-200/80 p-5 animate-in fade-in zoom-in-95 duration-150">
                          {rooms.map((room, roomIdx) => (
                            <div key={roomIdx} className="mb-4">
                              <div className="flex items-center justify-between mb-3">
                                <h4 className="text-sm font-bold text-neutral-900">
                                  Room {roomIdx + 1}
                                </h4>
                                {rooms.length > 1 && (
                                  <button
                                    type="button"
                                    onClick={() => setRooms(rooms.filter((_, idx) => idx !== roomIdx))}
                                    className="text-xs text-red-500 hover:underline font-semibold"
                                  >
                                    Remove
                                  </button>
                                )}
                              </div>

                              <div className="grid grid-cols-2 gap-4">
                                {/* Adults Counter */}
                                <div className="flex items-center justify-between bg-neutral-50/70 p-2.5 rounded-xl border border-neutral-100">
                                  <div className="flex items-center gap-2">
                                    <LuUser className="text-xl text-neutral-600" />
                                    <div>
                                      <div className="text-xs font-bold text-neutral-800">Adults</div>
                                      <div className="text-[10px] text-neutral-400">&gt;12 years</div>
                                    </div>
                                  </div>
                                  <div className="flex items-center gap-2">
                                    <button
                                      type="button"
                                      disabled={room.adults <= 1}
                                      onClick={() => {
                                        const newRooms = [...rooms];
                                        newRooms[roomIdx].adults = Math.max(1, newRooms[roomIdx].adults - 1);
                                        setRooms(newRooms);
                                      }}
                                      className="w-6 h-6 rounded-md bg-[#2563eb] text-white flex items-center justify-center disabled:opacity-40 hover:bg-[#1d4ed8] transition-colors"
                                    >
                                      <FaMinus className="text-[10px]" />
                                    </button>
                                    <span className="w-5 text-center text-xs font-bold text-neutral-800">
                                      {room.adults}
                                    </span>
                                    <button
                                      type="button"
                                      onClick={() => {
                                        const newRooms = [...rooms];
                                        newRooms[roomIdx].adults += 1;
                                        setRooms(newRooms);
                                      }}
                                      className="w-6 h-6 rounded-md bg-[#2563eb] text-white flex items-center justify-center hover:bg-[#1d4ed8] transition-colors"
                                    >
                                      <FaPlus className="text-[10px]" />
                                    </button>
                                  </div>
                                </div>

                                {/* Children Counter */}
                                <div className="flex items-center justify-between bg-neutral-50/70 p-2.5 rounded-xl border border-neutral-100">
                                  <div className="flex items-center gap-2">
                                    <LuUser className="text-xl text-neutral-600" />
                                    <div>
                                      <div className="text-xs font-bold text-neutral-800">Children</div>
                                      <div className="text-[10px] text-neutral-400">&le;12 years</div>
                                    </div>
                                  </div>
                                  <div className="flex items-center gap-2">
                                    <button
                                      type="button"
                                      disabled={room.children <= 0}
                                      onClick={() => {
                                        const newRooms = [...rooms];
                                        newRooms[roomIdx].children = Math.max(0, newRooms[roomIdx].children - 1);
                                        setRooms(newRooms);
                                      }}
                                      className="w-6 h-6 rounded-md bg-[#2563eb] text-white flex items-center justify-center disabled:opacity-40 hover:bg-[#1d4ed8] transition-colors"
                                    >
                                      <FaMinus className="text-[10px]" />
                                    </button>
                                    <span className="w-5 text-center text-xs font-bold text-neutral-800">
                                      {room.children}
                                    </span>
                                    <button
                                      type="button"
                                      onClick={() => {
                                        const newRooms = [...rooms];
                                        newRooms[roomIdx].children += 1;
                                        setRooms(newRooms);
                                      }}
                                      className="w-6 h-6 rounded-md bg-[#2563eb] text-white flex items-center justify-center hover:bg-[#1d4ed8] transition-colors"
                                    >
                                      <FaPlus className="text-[10px]" />
                                    </button>
                                  </div>
                                </div>
                              </div>

                              {/* Age of Children dropdown if children > 0 */}
                              {room.children > 0 && (
                                <div className="mt-4">
                                  <label className="block text-xs font-bold text-neutral-800 mb-1.5">
                                    Age of Children
                                  </label>
                                  <select
                                    value={room.childAge}
                                    onChange={(e) => {
                                      const newRooms = [...rooms];
                                      newRooms[roomIdx].childAge = Number(e.target.value);
                                      setRooms(newRooms);
                                    }}
                                    className="border border-neutral-200 rounded-lg px-3 py-1.5 text-xs font-semibold text-neutral-800 bg-white outline-none focus:border-[#2563eb]"
                                  >
                                    {[...Array(13)].map((_, i) => (
                                      <option key={i} value={i}>
                                        {i}
                                      </option>
                                    ))}
                                  </select>
                                  <p className="text-[11px] text-neutral-400 mt-2 leading-relaxed">
                                    We preset your children&apos;s ages to 12 years old. You might get a better price if you enter their actual age.
                                  </p>
                                </div>
                              )}
                            </div>
                          ))}

                          {/* Footer with Add Room & Apply */}
                          <div className="border-t border-neutral-100 pt-3 flex items-center justify-between mt-3">
                            <button
                              type="button"
                              onClick={() =>
                                setRooms([...rooms, { adults: 1, children: 0, childAge: 12 }])
                              }
                              className="flex items-center gap-1.5 text-xs font-bold text-[#2563eb] hover:text-[#1d4ed8] transition-colors"
                            >
                              <FaPlus className="text-xs" />
                              <span>Add Room</span>
                            </button>
                            <button
                              type="button"
                              onClick={() => setIsGuestsOpen(false)}
                              className="text-xs font-bold text-[#2563eb] hover:text-[#1d4ed8] transition-colors px-3 py-1"
                            >
                              Apply
                            </button>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Bottom Row: Free cancellation Checkbox & Green Search Button */}
                  <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mt-5 pt-3">
                    <label className="flex items-center gap-2.5 cursor-pointer select-none text-xs sm:text-sm font-medium text-neutral-700">
                      <div
                        onClick={() => setFreeCancellation(!freeCancellation)}
                        className={`w-5 h-5 rounded border flex items-center justify-center transition-colors ${
                          freeCancellation
                            ? "bg-[#2563eb] border-[#2563eb] text-white"
                            : "border-neutral-300 bg-white"
                        }`}
                      >
                        {freeCancellation && <FiCheck className="text-xs stroke-[3]" />}
                      </div>
                      <span onClick={() => setFreeCancellation(!freeCancellation)}>
                        Free cancellation
                      </span>
                    </label>

                    <button
                      type="button"
                      className="w-full sm:w-auto bg-[#2563eb] hover:bg-[#1d4ed8] active:scale-95 text-white font-bold text-sm px-10 py-3 rounded-full transition-all duration-200 shadow-md hover:shadow-lg"
                    >
                      Search
                    </button>
                  </div>
                </div>
              ) : activeTab === "flights" ? (
                /* Flights Search Box (Images 1 - 5) */
                <div
                  ref={filterWrapperRef}
                  className="bg-white rounded-2xl border border-neutral-200 shadow-sm p-4 sm:p-6 transition-all"
                >
                  {/* Top Row: Trip Types & "Search with AI" */}
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-5">
                    <div className="inline-flex items-center gap-1.5 bg-neutral-100/80 p-1 rounded-xl">
                      <button
                        type="button"
                        onClick={() => setFlightTripType("oneway")}
                        className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                          flightTripType === "oneway"
                            ? "bg-[#eff6ff] text-[#1d4ed8] border border-[#bfdbfe] font-bold"
                            : "text-neutral-600 hover:text-neutral-900"
                        }`}
                      >
                        One-way
                      </button>
                      <button
                        type="button"
                        onClick={() => setFlightTripType("roundtrip")}
                        className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                          flightTripType === "roundtrip"
                            ? "bg-[#eff6ff] text-[#1d4ed8] border border-[#bfdbfe] font-bold"
                            : "text-neutral-600 hover:text-neutral-900"
                        }`}
                      >
                        Round-trip
                      </button>
                      <button
                        type="button"
                        onClick={() => setFlightTripType("multicity")}
                        className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                          flightTripType === "multicity"
                            ? "bg-[#eff6ff] text-[#1d4ed8] border border-[#bfdbfe] font-bold"
                            : "text-neutral-600 hover:text-neutral-900"
                        }`}
                      >
                        Multi-city
                      </button>
                    </div>

                    <button
                      type="button"
                      className="inline-flex items-center gap-2 self-start sm:self-auto px-4 py-2 rounded-xl border border-neutral-200/90 hover:border-neutral-300 bg-white hover:bg-neutral-50 text-xs sm:text-[13px] font-medium text-neutral-700 shadow-sm transition-all"
                    >
                      <IoSparklesOutline className="text-sm text-neutral-600" />
                      <span>Search with AI</span>
                      <span className="bg-[#ff6a00] text-white text-[10px] font-bold px-1.5 py-0.5 rounded-md leading-none">
                        New
                      </span>
                    </button>
                  </div>

                  {/* Main Inputs: Switches layout between Round-trip / One-way and Multi-city */}
                  {flightTripType === "multicity" ? (
                    /* Multi-City Layout (Image 2) */
                    <div className="space-y-3 mb-5">
                      {multiCityFlights.map((flightRow, fIdx) => (
                        <div key={fIdx} className="flex items-center gap-2">
                          <div className="flex-1 grid grid-cols-1 lg:grid-cols-12 gap-3 relative">
                            {/* From / To Container */}
                            <div className="lg:col-span-8 relative flex items-center border border-neutral-200 rounded-xl bg-white">
                              {/* From Field */}
                              <div
                                onClick={() => {
                                  setMultiCityActiveInput(
                                    multiCityActiveInput?.rowIdx === fIdx && multiCityActiveInput?.field === "from"
                                      ? null
                                      : { rowIdx: fIdx, field: "from" }
                                  );
                                  setIsFlightDateOpen(false);
                                }}
                                className={`flex-1 px-4 py-3 border-r border-neutral-200/80 cursor-pointer rounded-l-xl transition-all ${
                                  multiCityActiveInput?.rowIdx === fIdx && multiCityActiveInput?.field === "from"
                                    ? "ring-2 ring-inset ring-[#2563eb] bg-white"
                                    : "hover:bg-neutral-50/50"
                                }`}
                              >
                                <span className={`text-xs sm:text-sm font-semibold truncate block ${flightRow.from ? "text-neutral-900" : "text-neutral-400"}`}>
                                  {flightRow.from || "From"}
                                </span>
                              </div>

                              {/* Swap Button */}
                              <button
                                type="button"
                                onClick={() => {
                                  const updated = [...multiCityFlights];
                                  const temp = updated[fIdx].from;
                                  updated[fIdx].from = updated[fIdx].to;
                                  updated[fIdx].to = temp;
                                  setMultiCityFlights(updated);
                                }}
                                className="w-7 h-7 rounded-full border border-neutral-200 bg-white text-neutral-500 hover:text-neutral-800 hover:bg-neutral-50 flex items-center justify-center -mx-3.5 z-20 shrink-0 shadow-sm transition-colors"
                              >
                                <FaExchangeAlt className="text-[10px]" />
                              </button>

                              {/* To Field */}
                              <div
                                onClick={() => {
                                  setMultiCityActiveInput(
                                    multiCityActiveInput?.rowIdx === fIdx && multiCityActiveInput?.field === "to"
                                      ? null
                                      : { rowIdx: fIdx, field: "to" }
                                  );
                                  setIsFlightDateOpen(false);
                                }}
                                className={`flex-1 px-4 py-3 cursor-pointer rounded-r-xl transition-all ${
                                  multiCityActiveInput?.rowIdx === fIdx && multiCityActiveInput?.field === "to"
                                    ? "ring-2 ring-inset ring-[#2563eb] bg-white"
                                    : "hover:bg-neutral-50/50"
                                }`}
                              >
                                <span className={`text-xs sm:text-sm font-semibold truncate block ${flightRow.to ? "text-neutral-900" : "text-neutral-400"}`}>
                                  {flightRow.to || "To"}
                                </span>
                              </div>

                              {/* Multi-city Popover for From */}
                              {multiCityActiveInput?.rowIdx === fIdx && multiCityActiveInput?.field === "from" &&
                                renderFlightCityPopover(
                                  "From",
                                  flightRow.from,
                                  (selectedCity) => {
                                    const updated = [...multiCityFlights];
                                    updated[fIdx].from = selectedCity;
                                    setMultiCityFlights(updated);
                                  },
                                  () => setMultiCityActiveInput(null)
                                )}

                              {/* Multi-city Popover for To */}
                              {multiCityActiveInput?.rowIdx === fIdx && multiCityActiveInput?.field === "to" &&
                                renderFlightCityPopover(
                                  "To",
                                  flightRow.to,
                                  (selectedCity) => {
                                    const updated = [...multiCityFlights];
                                    updated[fIdx].to = selectedCity;
                                    setMultiCityFlights(updated);
                                  },
                                  () => setMultiCityActiveInput(null),
                                  true
                                )}
                            </div>

                            {/* Depart Date Container */}
                            <div className="lg:col-span-4 relative">
                              <div
                                onClick={() => {
                                  setMultiCityDateIdx(multiCityDateIdx === fIdx ? null : fIdx);
                                  setMultiCityActiveInput(null);
                                }}
                                className={`border rounded-xl bg-white px-4 py-3 flex items-center justify-between cursor-pointer transition-all ${
                                  multiCityDateIdx === fIdx ? "border-[#2563eb] ring-1 ring-[#2563eb]" : "border-neutral-200"
                                }`}
                              >
                                {flightRow.departDate ? (
                                  <span className="text-xs sm:text-[13px] font-bold text-neutral-800">
                                    {formatDisplayDate(flightRow.departDate)}
                                  </span>
                                ) : (
                                  <span
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      const updated = [...multiCityFlights];
                                      const d = new Date(flightDepartDate);
                                      d.setDate(d.getDate() + fIdx * 3);
                                      updated[fIdx].departDate = d;
                                      setMultiCityFlights(updated);
                                      setMultiCityDateIdx(fIdx);
                                    }}
                                    className="text-xs sm:text-[13px] font-medium text-neutral-400 cursor-pointer hover:text-neutral-600"
                                  >
                                    Depart
                                  </span>
                                )}

                                {flightRow.departDate && (
                                  <div className="flex items-center gap-1 text-neutral-400">
                                    <button
                                      type="button"
                                      onClick={(e) => {
                                        e.stopPropagation();
                                        const updated = [...multiCityFlights];
                                        if (updated[fIdx].departDate) {
                                          const d = new Date(updated[fIdx].departDate!);
                                          d.setDate(d.getDate() - 1);
                                          updated[fIdx].departDate = d;
                                          setMultiCityFlights(updated);
                                        }
                                      }}
                                      className="p-1 hover:text-neutral-700 hover:bg-neutral-100 rounded transition-colors"
                                    >
                                      <FiChevronLeft className="text-xs" />
                                    </button>
                                    <button
                                      type="button"
                                      onClick={(e) => {
                                        e.stopPropagation();
                                        const updated = [...multiCityFlights];
                                        if (updated[fIdx].departDate) {
                                          const d = new Date(updated[fIdx].departDate!);
                                          d.setDate(d.getDate() + 1);
                                          updated[fIdx].departDate = d;
                                          setMultiCityFlights(updated);
                                        }
                                      }}
                                      className="p-1 hover:text-neutral-700 hover:bg-neutral-100 rounded transition-colors"
                                    >
                                      <FiChevronRight className="text-xs" />
                                    </button>
                                  </div>
                                )}
                              </div>

                              {/* Multi-city Calendar Popover */}
                              {multiCityDateIdx === fIdx && (
                                <div className="absolute top-full right-0 mt-2 z-50 bg-white rounded-2xl shadow-2xl border border-neutral-200/80 p-5 w-[95vw] max-w-[620px] animate-in fade-in zoom-in-95 duration-150">
                                  <div className="border border-[#2563eb] rounded-xl overflow-hidden mb-4 p-3 bg-neutral-50/50">
                                    <span className="block text-xs sm:text-sm font-bold text-neutral-900">
                                      {flightRow.departDate ? formatDisplayDate(flightRow.departDate) : "Select date"}
                                    </span>
                                  </div>

                                  <div className="relative mb-3">
                                    <div className="flex items-center justify-between mb-2 px-1">
                                      <button
                                        type="button"
                                        onClick={() =>
                                          setCalendarViewDate(
                                            new Date(calendarViewDate.getFullYear(), calendarViewDate.getMonth() - 1, 1)
                                          )
                                        }
                                        className="w-7 h-7 rounded-full flex items-center justify-center text-neutral-500 hover:bg-neutral-100 transition-colors"
                                      >
                                        <IoIosArrowBack />
                                      </button>
                                      <button
                                        type="button"
                                        onClick={() =>
                                          setCalendarViewDate(
                                            new Date(calendarViewDate.getFullYear(), calendarViewDate.getMonth() + 1, 1)
                                          )
                                        }
                                        className="w-7 h-7 rounded-full flex items-center justify-center text-neutral-500 hover:bg-neutral-100 transition-colors"
                                      >
                                        <IoIosArrowForward />
                                      </button>
                                    </div>

                                    <div className="flex flex-col sm:flex-row gap-6">
                                      {renderMonthCalendar(0)}
                                      {renderMonthCalendar(1)}
                                    </div>
                                  </div>
                                </div>
                              )}
                            </div>
                          </div>

                          {/* Delete row button (gray circular icon with Ã—) */}
                          <button
                            type="button"
                            onClick={() => {
                              if (multiCityFlights.length > 2) {
                                setMultiCityFlights(multiCityFlights.filter((_, i) => i !== fIdx));
                              } else {
                                const updated = [...multiCityFlights];
                                updated[fIdx] = { from: "", to: "", departDate: null };
                                setMultiCityFlights(updated);
                              }
                            }}
                            className="w-7 h-7 rounded-full bg-neutral-500/80 hover:bg-neutral-600 text-white flex items-center justify-center shrink-0 transition-colors"
                          >
                            <MdClose className="text-xs" />
                          </button>
                        </div>
                      ))}

                      {/* + Add flight button */}
                      <div className="pt-1">
                        <button
                          type="button"
                          onClick={() =>
                            setMultiCityFlights([
                              ...multiCityFlights,
                              { from: "", to: "", departDate: null },
                            ])
                          }
                          className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl border border-[#2563eb] text-[#1d4ed8] hover:bg-[#eff6ff]/50 text-xs sm:text-[13px] font-bold transition-all"
                        >
                          <FaPlus className="text-[11px]" />
                          <span>Add flight</span>
                        </button>
                      </div>
                    </div>
                  ) : (
                    /* One-way and Round-trip Layout */
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-3 mb-5 relative">
                      {/* Origin & Destination Container */}
                      <div className="lg:col-span-6 relative flex items-center border border-neutral-200 rounded-xl bg-white">
                        {/* From Field */}
                        <div
                          onClick={() => {
                            setIsFlightFromOpen(!isFlightFromOpen);
                            setIsFlightToOpen(false);
                            setIsFlightDateOpen(false);
                            setIsFlightPassengersOpen(false);
                            setIsFlightClassOpen(false);
                            setIsFlightPaymentOpen(false);
                          }}
                          className={`flex-1 flex items-center gap-2 px-3.5 py-3 border-r border-neutral-200/80 cursor-pointer rounded-l-xl transition-all ${
                            isFlightFromOpen
                              ? "ring-2 ring-inset ring-[#2563eb] bg-white"
                              : "hover:bg-neutral-50/50"
                          }`}
                        >
                          {flightOrigin ? (
                            <div className="inline-flex items-center gap-1.5 bg-neutral-100 hover:bg-neutral-200/80 px-2.5 py-1 rounded-md text-xs font-bold text-neutral-800 transition-colors">
                              <FaMapMarkerAlt className="text-neutral-500 text-[11px]" />
                              <span>{flightOrigin}</span>
                              <button
                                type="button"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  setFlightOrigin("");
                                }}
                                className="text-neutral-400 hover:text-neutral-700 ml-0.5"
                              >
                                <MdClose className="text-xs" />
                              </button>
                            </div>
                          ) : (
                            <span className="text-xs sm:text-sm font-medium text-neutral-400">
                              From
                            </span>
                          )}
                        </div>

                        {/* Swap Button */}
                        <button
                          type="button"
                          onClick={() => {
                            const temp = flightOrigin;
                            setFlightOrigin(flightDestination);
                            setFlightDestination(temp);
                          }}
                          className="w-7 h-7 rounded-full border border-neutral-200 bg-white text-neutral-500 hover:text-neutral-800 hover:bg-neutral-50 flex items-center justify-center -mx-3.5 z-20 shrink-0 shadow-sm transition-colors"
                        >
                          <FaExchangeAlt className="text-[10px]" />
                        </button>

                        {/* To Field */}
                        <div
                          onClick={() => {
                            setIsFlightToOpen(!isFlightToOpen);
                            setIsFlightFromOpen(false);
                            setIsFlightDateOpen(false);
                            setIsFlightPassengersOpen(false);
                            setIsFlightClassOpen(false);
                            setIsFlightPaymentOpen(false);
                          }}
                          className={`flex-1 flex items-center px-4 py-3 cursor-pointer rounded-r-xl transition-all ${
                            isFlightToOpen
                              ? "ring-2 ring-inset ring-[#2563eb] bg-white"
                              : "hover:bg-neutral-50/50"
                          }`}
                        >
                          {flightDestination ? (
                            <div className="inline-flex items-center gap-1.5 bg-neutral-100 hover:bg-neutral-200/80 px-2.5 py-1 rounded-md text-xs font-bold text-neutral-800 transition-colors">
                              <FaPlane className="text-neutral-500 text-[11px]" />
                              <span>{flightDestination}</span>
                              <button
                                type="button"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  setFlightDestination("");
                                }}
                                className="text-neutral-400 hover:text-neutral-700 ml-0.5"
                              >
                                <MdClose className="text-xs" />
                              </button>
                            </div>
                          ) : (
                            <span className="text-xs sm:text-sm font-medium text-neutral-400">
                              To
                            </span>
                          )}
                        </div>

                        {/* "From" Dropdown Popup (Popular cities 4x4) */}
                        {isFlightFromOpen &&
                          renderFlightCityPopover(
                            "From",
                            flightOrigin,
                            (city) => setFlightOrigin(city),
                            () => setIsFlightFromOpen(false)
                          )}

                        {/* "To" Dropdown Popup (Popular cities 4x4) */}
                        {isFlightToOpen &&
                          renderFlightCityPopover(
                            "To",
                            flightDestination,
                            (city) => setFlightDestination(city),
                            () => setIsFlightToOpen(false),
                            true
                          )}
                      </div>

                      {/* Depart & Return Dates Container */}
                      <div className="lg:col-span-6 relative">
                        {flightTripType === "oneway" ? (
                          /* One-way Single Date Box (Image 1) */
                          <div
                            onClick={() => {
                              setIsFlightDateOpen(!isFlightDateOpen);
                              setIsFlightFromOpen(false);
                              setIsFlightToOpen(false);
                              setIsFlightPassengersOpen(false);
                              setIsFlightClassOpen(false);
                              setIsFlightPaymentOpen(false);
                            }}
                            className={`border rounded-xl bg-white overflow-hidden cursor-pointer px-4 py-3 flex items-center justify-between transition-all ${
                              isFlightDateOpen ? "border-[#2563eb] ring-1 ring-[#2563eb]" : "border-neutral-200"
                            }`}
                          >
                            <span className="text-xs sm:text-[13px] font-bold text-neutral-800 truncate">
                              {formatDisplayDate(flightDepartDate)}
                            </span>
                            <div className="flex items-center gap-1 text-neutral-400 shrink-0 ml-2">
                              <button
                                type="button"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  const d = new Date(flightDepartDate);
                                  d.setDate(d.getDate() - 1);
                                  setFlightDepartDate(d);
                                }}
                                className="p-1 hover:text-neutral-700 hover:bg-neutral-100 rounded transition-colors"
                              >
                                <FiChevronLeft className="text-xs" />
                              </button>
                              <button
                                type="button"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  const d = new Date(flightDepartDate);
                                  d.setDate(d.getDate() + 1);
                                  setFlightDepartDate(d);
                                }}
                                className="p-1 hover:text-neutral-700 hover:bg-neutral-100 rounded transition-colors"
                              >
                                <FiChevronRight className="text-xs" />
                              </button>
                            </div>
                          </div>
                        ) : (
                          /* Round-trip Dual Date Box */
                          <div
                            onClick={() => {
                              setIsFlightDateOpen(!isFlightDateOpen);
                              setIsFlightFromOpen(false);
                              setIsFlightToOpen(false);
                              setIsFlightPassengersOpen(false);
                              setIsFlightClassOpen(false);
                              setIsFlightPaymentOpen(false);
                            }}
                            className={`grid grid-cols-2 border rounded-xl bg-white overflow-hidden cursor-pointer ${
                              isFlightDateOpen ? "border-[#2563eb] ring-1 ring-[#2563eb]" : "border-neutral-200"
                            }`}
                          >
                            {/* Depart Date */}
                            <div className="flex items-center justify-between px-3.5 py-3 border-r border-neutral-200/80">
                              <span className="text-xs sm:text-[13px] font-bold text-neutral-800 truncate">
                                {formatDisplayDate(flightDepartDate)}
                              </span>
                              <div className="flex items-center gap-1 text-neutral-400 shrink-0 ml-2">
                                <button
                                  type="button"
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    const d = new Date(flightDepartDate);
                                    d.setDate(d.getDate() - 1);
                                    setFlightDepartDate(d);
                                  }}
                                  className="p-1 hover:text-neutral-700 hover:bg-neutral-100 rounded transition-colors"
                                >
                                  <FiChevronLeft className="text-xs" />
                                </button>
                                <button
                                  type="button"
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    const d = new Date(flightDepartDate);
                                    d.setDate(d.getDate() + 1);
                                    setFlightDepartDate(d);
                                  }}
                                  className="p-1 hover:text-neutral-700 hover:bg-neutral-100 rounded transition-colors"
                                >
                                  <FiChevronRight className="text-xs" />
                                </button>
                              </div>
                            </div>

                            {/* Return Date */}
                            <div className="flex items-center px-4 py-3">
                              {flightReturnDate ? (
                                <span className="text-xs sm:text-[13px] font-bold text-neutral-800">
                                  {formatDisplayDate(flightReturnDate)}
                                </span>
                              ) : (
                                <span
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    const d = new Date(flightDepartDate);
                                    d.setDate(d.getDate() + 4);
                                    setFlightReturnDate(d);
                                  }}
                                  className="text-xs sm:text-[13px] font-medium text-neutral-400 hover:text-neutral-600 transition-colors"
                                >
                                  Return
                                </span>
                              )}
                            </div>
                          </div>
                        )}

                        {/* Flight Date Calendar Popover */}
                        {isFlightDateOpen && (
                          <div className="absolute top-full right-0 sm:left-[-100px] mt-2 z-50 bg-white rounded-2xl shadow-2xl border border-neutral-200/80 p-5 w-[95vw] max-w-[620px] animate-in fade-in zoom-in-95 duration-150">
                            {/* Active Selection Header */}
                            <div className={`grid ${flightTripType === "oneway" ? "grid-cols-1" : "grid-cols-2"} border border-[#2563eb] rounded-xl overflow-hidden mb-4`}>
                              <div className="p-3 border-r border-[#2563eb]/30 bg-neutral-50/50">
                                <span className="block text-xs sm:text-sm font-bold text-neutral-900">
                                  {formatDisplayDate(flightDepartDate)}
                                </span>
                              </div>
                              {flightTripType !== "oneway" && (
                                <div className="p-3 bg-white">
                                  <span className="block text-xs sm:text-sm font-medium text-neutral-400">
                                    {flightReturnDate ? formatDisplayDate(flightReturnDate) : "Return"}
                                  </span>
                                </div>
                              )}
                            </div>

                            {/* Month Navigation & Two Months Display */}
                            <div className="relative mb-3">
                              <div className="flex items-center justify-between mb-2 px-1">
                                <button
                                  type="button"
                                  onClick={() =>
                                    setCalendarViewDate(
                                      new Date(calendarViewDate.getFullYear(), calendarViewDate.getMonth() - 1, 1)
                                    )
                                  }
                                  className="w-7 h-7 rounded-full flex items-center justify-center text-neutral-500 hover:bg-neutral-100 transition-colors"
                                >
                                  <IoIosArrowBack />
                                </button>
                                <button
                                  type="button"
                                  onClick={() =>
                                    setCalendarViewDate(
                                      new Date(calendarViewDate.getFullYear(), calendarViewDate.getMonth() + 1, 1)
                                    )
                                  }
                                  className="w-7 h-7 rounded-full flex items-center justify-center text-neutral-500 hover:bg-neutral-100 transition-colors"
                                >
                                  <IoIosArrowForward />
                                </button>
                              </div>

                              <div className="flex flex-col sm:flex-row gap-6">
                                {renderMonthCalendar(0)}
                                {renderMonthCalendar(1)}
                              </div>
                            </div>

                            {/* Public Holidays Legend */}
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
                        )}
                      </div>
                    </div>
                  )}

                  {/* Bottom Row: Direct Only (hidden in multi-city), Passengers, Class, Payments & Search */}
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-2 relative">
                    {/* Direct Only Checkbox (shown only for One-way / Round-trip) */}
                    {flightTripType !== "multicity" ? (
                      <label className="flex items-center gap-2.5 cursor-pointer select-none text-xs sm:text-sm font-medium text-neutral-700">
                        <div
                          onClick={() => setFlightDirectOnly(!flightDirectOnly)}
                          className={`w-5 h-5 rounded border flex items-center justify-center transition-colors ${
                            flightDirectOnly
                              ? "bg-[#2563eb] border-[#2563eb] text-white"
                              : "border-neutral-300 bg-white"
                          }`}
                        >
                          {flightDirectOnly && <FiCheck className="text-xs stroke-[3]" />}
                        </div>
                        <span onClick={() => setFlightDirectOnly(!flightDirectOnly)}>
                          Direct Only
                        </span>
                      </label>
                    ) : (
                      <div />
                    )}

                    {/* Dropdown Filters & Search Button */}
                    <div className="flex flex-wrap items-center gap-4 sm:gap-6 self-stretch sm:self-auto justify-between sm:justify-end">
                      <div className="flex items-center gap-4 text-xs font-semibold text-neutral-700">
                        {/* Passengers Dropdown (Image 4) */}
                        <div className="relative">
                          <div
                            onClick={() => {
                              setIsFlightPassengersOpen(!isFlightPassengersOpen);
                              setIsFlightClassOpen(false);
                              setIsFlightPaymentOpen(false);
                            }}
                            className="flex items-center gap-1 cursor-pointer hover:text-neutral-950 py-1 select-none"
                          >
                            <span>{flightPassengersLabel}</span>
                            <span
                              className={`text-[9px] text-neutral-500 inline-block transition-transform duration-200 ${
                                isFlightPassengersOpen ? "rotate-180" : ""
                              }`}
                            >
                              â–¼
                            </span>
                          </div>

                          {/* Passengers Popover (opens at bottom) */}
                          {isFlightPassengersOpen && (
                            <div className="absolute top-full mt-2 right-0 w-[300px] z-50 bg-white rounded-2xl shadow-2xl border border-neutral-200/80 p-5 animate-in fade-in zoom-in-95 duration-150">
                              <div className="space-y-4">
                                {/* Adults */}
                                <div className="flex items-center justify-between">
                                  <div className="flex items-center gap-3">
                                    <LuUser className="text-xl text-neutral-600" />
                                    <div>
                                      <div className="text-xs font-bold text-neutral-800">Adults</div>
                                      <div className="text-[10px] text-neutral-400">&gt;12 years</div>
                                    </div>
                                  </div>
                                  <div className="flex items-center gap-3">
                                    <button
                                      type="button"
                                      disabled={flightAdults <= 1}
                                      onClick={() => setFlightAdults(Math.max(1, flightAdults - 1))}
                                      className="w-7 h-7 rounded-full border border-neutral-300 flex items-center justify-center text-neutral-700 disabled:opacity-30 hover:border-neutral-500"
                                    >
                                      <FaMinus className="text-[9px]" />
                                    </button>
                                    <span className="w-4 text-center text-xs font-bold text-neutral-800">
                                      {flightAdults}
                                    </span>
                                    <button
                                      type="button"
                                      onClick={() => setFlightAdults(flightAdults + 1)}
                                      className="w-7 h-7 rounded-full border border-neutral-300 flex items-center justify-center text-neutral-700 hover:border-neutral-500"
                                    >
                                      <FaPlus className="text-[9px]" />
                                    </button>
                                  </div>
                                </div>

                                {/* Children */}
                                <div className="flex items-center justify-between">
                                  <div className="flex items-center gap-3">
                                    <LuUser className="text-xl text-neutral-600" />
                                    <div>
                                      <div className="text-xs font-bold text-neutral-800">Children</div>
                                      <div className="text-[10px] text-neutral-400">2-12 years</div>
                                    </div>
                                  </div>
                                  <div className="flex items-center gap-3">
                                    <button
                                      type="button"
                                      disabled={flightChildren <= 0}
                                      onClick={() => setFlightChildren(Math.max(0, flightChildren - 1))}
                                      className="w-7 h-7 rounded-full border border-neutral-300 flex items-center justify-center text-neutral-700 disabled:opacity-30 hover:border-neutral-500"
                                    >
                                      <FaMinus className="text-[9px]" />
                                    </button>
                                    <span className="w-4 text-center text-xs font-bold text-neutral-800">
                                      {flightChildren}
                                    </span>
                                    <button
                                      type="button"
                                      onClick={() => setFlightChildren(flightChildren + 1)}
                                      className="w-7 h-7 rounded-full border border-neutral-300 flex items-center justify-center text-neutral-700 hover:border-neutral-500"
                                    >
                                      <FaPlus className="text-[9px]" />
                                    </button>
                                  </div>
                                </div>

                                {/* Infants */}
                                <div className="flex items-center justify-between">
                                  <div className="flex items-center gap-3">
                                    <FaBaby className="text-xl text-neutral-600" />
                                    <div>
                                      <div className="text-xs font-bold text-neutral-800">Infants</div>
                                      <div className="text-[10px] text-neutral-400">&lt;2 years</div>
                                    </div>
                                  </div>
                                  <div className="flex items-center gap-3">
                                    <button
                                      type="button"
                                      disabled={flightInfants <= 0}
                                      onClick={() => setFlightInfants(Math.max(0, flightInfants - 1))}
                                      className="w-7 h-7 rounded-full border border-neutral-300 flex items-center justify-center text-neutral-700 disabled:opacity-30 hover:border-neutral-500"
                                    >
                                      <FaMinus className="text-[9px]" />
                                    </button>
                                    <span className="w-4 text-center text-xs font-bold text-neutral-800">
                                      {flightInfants}
                                    </span>
                                    <button
                                      type="button"
                                      onClick={() => setFlightInfants(flightInfants + 1)}
                                      className="w-7 h-7 rounded-full border border-neutral-300 flex items-center justify-center text-neutral-700 hover:border-neutral-500"
                                    >
                                      <FaPlus className="text-[9px]" />
                                    </button>
                                  </div>
                                </div>
                              </div>

                              <div className="border-t border-neutral-100 pt-3 mt-4 flex justify-end">
                                <button
                                  type="button"
                                  onClick={() => setIsFlightPassengersOpen(false)}
                                  className="text-xs font-bold text-[#2563eb] hover:text-[#1d4ed8] px-2 py-1"
                                >
                                  Apply
                                </button>
                              </div>
                            </div>
                          )}
                        </div>

                        {/* Cabin Class Dropdown (Image 5) */}
                        <div className="relative">
                          <div
                            onClick={() => {
                              setIsFlightClassOpen(!isFlightClassOpen);
                              setIsFlightPassengersOpen(false);
                              setIsFlightPaymentOpen(false);
                            }}
                            className="flex items-center gap-1 cursor-pointer hover:text-neutral-950 py-1 select-none"
                          >
                            <span>{flightCabinClass}</span>
                            <span
                              className={`text-[9px] text-neutral-500 inline-block transition-transform duration-200 ${
                                isFlightClassOpen ? "rotate-180" : ""
                              }`}
                            >
                              â–¼
                            </span>
                          </div>

                          {/* Cabin Class Popover (opens at bottom) */}
                          {isFlightClassOpen && (
                            <div className="absolute top-full mt-2 right-0 w-[200px] z-50 bg-white rounded-2xl shadow-2xl border border-neutral-200/80 p-2 animate-in fade-in zoom-in-95 duration-150">
                              {[
                                "Economy",
                                "Premium Economy",
                                "Business Class",
                                "First Class",
                              ].map((item) => (
                                <div
                                  key={item}
                                  onClick={() => {
                                    setFlightCabinClass(item);
                                    setIsFlightClassOpen(false);
                                  }}
                                  className={`flex items-center justify-between px-3 py-2.5 rounded-xl cursor-pointer text-xs font-medium transition-colors ${
                                    flightCabinClass === item
                                      ? "text-neutral-900 font-bold bg-neutral-50"
                                      : "text-neutral-700 hover:bg-neutral-50 hover:text-neutral-950"
                                  }`}
                                >
                                  <span>{item}</span>
                                  {flightCabinClass === item && (
                                    <FiCheck className="text-[#2563eb] text-sm stroke-[3]" />
                                  )}
                                </div>
                              ))}
                            </div>
                          )}
                        </div>

                        {/* 4 Payment Types dropdown */}
                        <div className="relative">
                          <div
                            onClick={() => {
                              setIsFlightPaymentOpen(!isFlightPaymentOpen);
                              setIsFlightPassengersOpen(false);
                              setIsFlightClassOpen(false);
                            }}
                            className="flex items-center gap-1 cursor-pointer hover:text-neutral-950 py-1 select-none"
                          >
                            <span>{flightPaymentTypes}</span>
                            <span
                              className={`text-[9px] text-neutral-500 inline-block transition-transform duration-200 ${
                                isFlightPaymentOpen ? "rotate-180" : ""
                              }`}
                            >
                              â–¼
                            </span>
                          </div>

                          {/* Payment Types Popover (opens at bottom) */}
                          {isFlightPaymentOpen && (
                            <div className="absolute top-full mt-2 right-0 w-[220px] z-50 bg-white rounded-2xl shadow-2xl border border-neutral-200/80 p-2 animate-in fade-in zoom-in-95 duration-150">
                              {[
                                "4 Payment Types",
                                "Credit / Debit Card",
                                "Mobile Banking (bKash/Nagad)",
                                "Net Banking",
                              ].map((type) => (
                                <div
                                  key={type}
                                  onClick={() => {
                                    setFlightPaymentTypes(type);
                                    setIsFlightPaymentOpen(false);
                                  }}
                                  className={`flex items-center justify-between px-3 py-2 rounded-xl cursor-pointer text-xs font-medium transition-colors ${
                                    flightPaymentTypes === type
                                      ? "text-neutral-900 font-bold bg-neutral-50"
                                      : "text-neutral-700 hover:bg-neutral-50"
                                  }`}
                                >
                                  <span>{type}</span>
                                  {flightPaymentTypes === type && (
                                    <FiCheck className="text-[#2563eb] text-xs" />
                                  )}
                                </div>
                              ))}
                            </div>
                          )}
                        </div>
                      </div>

                      <button
                        type="button"
                        onClick={handleFlightSearch}
                        className="bg-[#2563eb] hover:bg-[#1d4ed8] active:scale-95 text-white font-bold text-sm px-10 py-3 rounded-full transition-all duration-200 shadow-md hover:shadow-lg"
                      >
                        Search
                      </button>
                    </div>
                  </div>
                </div>
              ) : (
                /* Cars Search Box */
                <div className="bg-white rounded-2xl border border-neutral-200 shadow-sm p-4 sm:p-5 transition-all">
                  {/* Top Checkbox: Drop off car at a different location */}
                  <div className="mb-4">
                    <label className="inline-flex items-center gap-2.5 cursor-pointer select-none text-xs sm:text-sm font-medium text-neutral-800">
                      <div
                        onClick={() => setCarDiffLocation(!carDiffLocation)}
                        className={`w-[18px] h-[18px] rounded border-2 flex items-center justify-center transition-colors flex-shrink-0 ${
                          carDiffLocation
                            ? "bg-[#2563eb] border-[#2563eb] text-white"
                            : "border-neutral-300 bg-white"
                        }`}
                      >
                        {carDiffLocation && <FiCheck className="text-[10px] stroke-[3]" />}
                      </div>
                      <span onClick={() => setCarDiffLocation(!carDiffLocation)}>
                        Drop off car at a different location
                      </span>
                    </label>
                  </div>

                  {/* Main Inputs Strip: single bordered row */}
                  <div className="flex flex-col lg:flex-row border border-neutral-200 rounded-xl overflow-visible mb-4">
                    {/* Pick-up & drop-off location */}
                    <div className="flex-1 px-4 py-2.5 border-b lg:border-b-0 lg:border-r border-neutral-200 focus-within:ring-2 focus-within:ring-inset focus-within:ring-[#2563eb] rounded-t-xl lg:rounded-t-none lg:rounded-l-xl">
                      <span className="block text-[11px] text-neutral-400 font-medium leading-tight mb-0.5">
                        Pick-up &amp; drop-off location
                      </span>
                      <input
                        type="text"
                        placeholder="Search for location..."
                        value={carLocation}
                        onChange={(e) => setCarLocation(e.target.value)}
                        className="w-full text-[13px] font-semibold text-neutral-900 placeholder:text-neutral-400 outline-none bg-transparent"
                      />
                    </div>

                    {/* Pick-up date */}
                    <div className="px-4 py-2.5 border-b lg:border-b-0 lg:border-r border-neutral-200 min-w-[130px] cursor-pointer">
                      <span className="block text-[11px] text-neutral-400 font-medium leading-tight mb-0.5">
                        Pick-up date
                      </span>
                      <span className="block text-[13px] font-bold text-neutral-800 whitespace-nowrap">
                        {(() => {
                          const d = carPickUpDate;
                          const days = ["Sun","Mon","Tue","Wed","Thu","Fri","Sat"];
                          const months = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
                          return `${days[d.getDay()]}, ${months[d.getMonth()]} ${d.getDate()}`;
                        })()}
                      </span>
                    </div>

                    {/* Pick-up time */}
                    <div className="relative px-4 py-2.5 border-b lg:border-b-0 lg:border-r border-neutral-200 min-w-[90px]">
                      <span className="block text-[11px] text-neutral-400 font-medium leading-tight mb-0.5">
                        Time
                      </span>
                      <button
                        type="button"
                        onClick={() => { setIsCarPickUpTimeOpen(!isCarPickUpTimeOpen); setIsCarDropOffTimeOpen(false); }}
                        className="flex items-center gap-1 text-[13px] font-bold text-neutral-800 outline-none bg-transparent cursor-pointer"
                      >
                        {carPickUpTime}
                        <FaChevronDown className={`text-[9px] text-neutral-400 transition-transform duration-200 ${isCarPickUpTimeOpen ? "rotate-180" : ""}`} />
                      </button>
                      {isCarPickUpTimeOpen && (
                        <div className="absolute top-full left-0 mt-1 w-28 bg-white border border-neutral-200 rounded-xl shadow-xl z-50 overflow-hidden">
                          <div className="overflow-y-auto max-h-52 py-1 scrollbar-thin">
                            {Array.from({ length: 48 }, (_, i) => {
                              const h = String(Math.floor(i / 2)).padStart(2, "0");
                              const m = i % 2 === 0 ? "00" : "30";
                              const slot = `${h}:${m}`;
                              return (
                                <button
                                  key={slot}
                                  type="button"
                                  onClick={() => { setCarPickUpTime(slot); setIsCarPickUpTimeOpen(false); }}
                                  className={`w-full text-left px-4 py-2 text-sm transition-colors hover:bg-[#eff6ff] ${
                                    carPickUpTime === slot ? "text-[#2563eb] font-semibold bg-[#eff6ff]" : "text-neutral-700"
                                  }`}
                                >
                                  {slot}
                                </button>
                              );
                            })}
                          </div>
                        </div>
                      )}
                    </div>

                    {/* Drop-off date */}
                    <div className="px-4 py-2.5 border-b lg:border-b-0 lg:border-r border-neutral-200 min-w-[130px] cursor-pointer">
                      <span className="block text-[11px] text-neutral-400 font-medium leading-tight mb-0.5">
                        Drop-off date
                      </span>
                      <span className="block text-[13px] font-bold text-neutral-800 whitespace-nowrap">
                        {(() => {
                          const d = carDropOffDate;
                          const days = ["Sun","Mon","Tue","Wed","Thu","Fri","Sat"];
                          const months = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
                          return `${days[d.getDay()]}, ${months[d.getMonth()]} ${d.getDate()}`;
                        })()}
                      </span>
                    </div>

                    {/* Drop-off time */}
                    <div className="relative px-4 py-2.5 rounded-b-xl lg:rounded-b-none lg:rounded-r-xl min-w-[90px]">
                      <span className="block text-[11px] text-neutral-400 font-medium leading-tight mb-0.5">
                        Time
                      </span>
                      <button
                        type="button"
                        onClick={() => { setIsCarDropOffTimeOpen(!isCarDropOffTimeOpen); setIsCarPickUpTimeOpen(false); }}
                        className="flex items-center gap-1 text-[13px] font-bold text-neutral-800 outline-none bg-transparent cursor-pointer"
                      >
                        {carDropOffTime}
                        <FaChevronDown className={`text-[9px] text-neutral-400 transition-transform duration-200 ${isCarDropOffTimeOpen ? "rotate-180" : ""}`} />
                      </button>
                      {isCarDropOffTimeOpen && (
                        <div className="absolute top-full right-0 mt-1 w-28 bg-white border border-neutral-200 rounded-xl shadow-xl z-50 overflow-hidden">
                          <div className="overflow-y-auto max-h-52 py-1 scrollbar-thin">
                            {Array.from({ length: 48 }, (_, i) => {
                              const h = String(Math.floor(i / 2)).padStart(2, "0");
                              const m = i % 2 === 0 ? "00" : "30";
                              const slot = `${h}:${m}`;
                              return (
                                <button
                                  key={slot}
                                  type="button"
                                  onClick={() => { setCarDropOffTime(slot); setIsCarDropOffTimeOpen(false); }}
                                  className={`w-full text-left px-4 py-2 text-sm transition-colors hover:bg-[#eff6ff] ${
                                    carDropOffTime === slot ? "text-[#2563eb] font-semibold bg-[#eff6ff]" : "text-neutral-700"
                                  }`}
                                >
                                  {slot}
                                </button>
                              );
                            })}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Bottom Row: Driver age checkbox, "I live in" popover, and Search button */}
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                    {/* Driver aged between 30 - 69 */}
                    <label className="flex items-center gap-2.5 cursor-pointer select-none text-xs sm:text-sm font-medium text-neutral-800">
                      <div
                        onClick={() => setCarDriverAgeChecked(!carDriverAgeChecked)}
                        className={`w-[18px] h-[18px] rounded border-2 flex items-center justify-center transition-colors flex-shrink-0 ${
                          carDriverAgeChecked
                            ? "bg-[#2563eb] border-[#2563eb] text-white"
                            : "border-neutral-300 bg-white"
                        }`}
                      >
                        {carDriverAgeChecked && <FiCheck className="text-[10px] stroke-[3]" />}
                      </div>
                      <span onClick={() => setCarDriverAgeChecked(!carDriverAgeChecked)}>
                        Driver aged between 30 - 69
                      </span>
                    </label>

                    {/* "I live in" + Search Button */}
                    <div className="flex items-center gap-3 self-stretch sm:self-auto justify-between sm:justify-end">
                      {/* I live in dropdown */}
                      <div className="relative">
                        <button
                          type="button"
                          onClick={() => setIsCarCountryOpen(!isCarCountryOpen)}
                          className="flex items-center gap-1.5 text-xs sm:text-sm font-medium text-neutral-700 hover:text-neutral-950 transition-colors"
                        >
                          <span>I live in</span>
                          <FaChevronDown
                            className={`text-[10px] text-neutral-400 transition-transform duration-200 ${isCarCountryOpen ? "rotate-180" : ""}`}
                          />
                        </button>

                        {/* Country dropdown popover */}
                        {isCarCountryOpen && (
                          <div className="absolute top-full right-0 mt-2 w-72 bg-white border border-neutral-200 rounded-xl shadow-xl z-50 overflow-hidden">
                            {/* Search input */}
                            <div className="p-3 border-b border-neutral-100">
                              <div className="flex items-center border-2 border-[#2563eb] rounded-lg px-3 py-2 gap-2">
                                <input
                                  type="text"
                                  placeholder="Search for country"
                                  value={carCountrySearch}
                                  onChange={(e) => setCarCountrySearch(e.target.value)}
                                  className="flex-1 text-sm text-neutral-800 placeholder:text-neutral-400 outline-none bg-transparent"
                                  autoFocus
                                />
                                <svg className="w-4 h-4 text-neutral-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                                </svg>
                              </div>
                            </div>
                            {/* Country list */}
                            <div className="overflow-y-auto max-h-48">
                              {COUNTRIES.filter(c =>
                                c.toLowerCase().includes(carCountrySearch.toLowerCase())
                              ).map((country) => (
                                <button
                                  key={country}
                                  type="button"
                                  onClick={() => {
                                    setCarResidentCountry(country);
                                    setIsCarCountryOpen(false);
        setIsCarPickUpTimeOpen(false);
        setIsCarDropOffTimeOpen(false);
                                    setCarCountrySearch("");
                                  }}
                                  className={`w-full text-left px-4 py-2.5 text-sm transition-colors hover:bg-[#eff6ff] ${
                                    carResidentCountry === country
                                      ? "text-[#2563eb] font-semibold bg-[#eff6ff]"
                                      : "text-neutral-700"
                                  }`}
                                >
                                  {country}
                                </button>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>

                      <button
                        type="button"
                        className="bg-[#2563eb] hover:bg-[#1d4ed8] active:scale-95 text-white font-bold text-sm px-8 py-2.5 rounded-full transition-all duration-200 shadow-md hover:shadow-lg"
                      >
                        Search
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* ============ HOTELS / APARTMENTS: Property Cards ============ */}
            {(activeTab === "hotels" || activeTab === "apartments") && (
              <div className="mt-8 space-y-8">
                {/* Section 1 — Top Unique Properties */}
                <div>
                  <h3 className="text-lg sm:text-xl font-bold text-neutral-900 mb-0.5">
                    Stay at our top unique properties
                  </h3>
                  <p className="text-sm text-neutral-500 mb-4">
                    From castles and villas to boats and igloos, we have it all
                  </p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                    {[
                      { image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=600&q=80", type: "Resort", stars: 5, name: "Panviman Chiang Mai Spa Resort", location: "Chiang Mai, Thailand", score: 9.1, label: "Wonderful", reviews: 727 },
                      { image: "https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?auto=format&fit=crop&w=600&q=80", type: "Hotel", stars: 5, name: "The Dwarika's", location: "Kathmandu, Nepal", score: 9.4, label: "Wonderful", reviews: 265 },
                      { image: "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?auto=format&fit=crop&w=600&q=80", type: "Resort", stars: 5, name: "Temple Tree Resort & Spa, Pokhara", location: "Pokhara, Nepal", score: 9.2, label: "Wonderful", reviews: 172 },
                      { image: "https://images.unsplash.com/photo-1582719508461-905c673771fd?auto=format&fit=crop&w=600&q=80", type: "Hotel", stars: 4, name: "Hotel Shanker-Palatial Heritage Kathmandu", location: "Kathmandu, Nepal", score: 9.0, label: "Wonderful", reviews: 677 },
                      { image: "https://images.unsplash.com/photo-1571896349842-33c89424de2d?auto=format&fit=crop&w=600&q=80", type: "Villa", stars: 5, name: "Anantara Veli Maldives Resort", location: "South Male Atoll, Maldives", score: 9.5, label: "Exceptional", reviews: 1104 },
                      { image: "https://images.unsplash.com/photo-1540541338287-41700207dee6?auto=format&fit=crop&w=600&q=80", type: "Resort", stars: 5, name: "Six Senses Yao Noi", location: "Phang-Nga Bay, Thailand", score: 9.6, label: "Exceptional", reviews: 843 },
                      { image: "https://images.unsplash.com/photo-1445019980597-93fa8acb246c?auto=format&fit=crop&w=600&q=80", type: "Hotel", stars: 4, name: "Radisson Blu Dhaka Water Garden", location: "Dhaka, Bangladesh", score: 8.4, label: "Very Good", reviews: 2341 },
                      { image: "https://images.unsplash.com/photo-1506059612708-99d6128a11f3?auto=format&fit=crop&w=600&q=80", type: "Ryokan", stars: 5, name: "Hoshino Resorts KAI Nikko", location: "Nikko, Japan", score: 9.3, label: "Wonderful", reviews: 419 },
                    ].map((p, i) => (
                      <div key={i} className="group bg-white rounded-2xl border border-neutral-200 hover:shadow-lg transition-all duration-300 cursor-pointer overflow-hidden">
                        <div className="relative h-44 overflow-hidden">
                          <img src={p.image} alt={p.name} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
                          <button className="absolute top-2.5 right-2.5 w-7 h-7 rounded-full bg-white/90 flex items-center justify-center shadow hover:scale-110 transition-transform">
                            <svg className="w-3.5 h-3.5 text-neutral-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" /></svg>
                          </button>
                        </div>
                        <div className="p-3">
                          <div className="flex items-center gap-2 mb-1.5 flex-wrap">
                            <span className="text-[11px] text-neutral-500 font-medium">{p.type}</span>
                            <div className="flex items-center gap-0.5">
                              {Array.from({ length: p.stars }).map((_, si) => (
                                <svg key={si} className="w-2.5 h-2.5 text-amber-400 fill-current" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" /></svg>
                              ))}
                            </div>
                            <span className="text-[10px] font-bold text-white bg-blue-700 px-1.5 py-0.5 rounded">Genius</span>
                          </div>
                          <h4 className="text-sm font-bold text-neutral-900 leading-tight mb-0.5 group-hover:text-blue-600 transition-colors line-clamp-2">{p.name}</h4>
                          <p className="text-[11px] text-neutral-500 mb-2">{p.location}</p>
                          <div className="flex items-center gap-2">
                            <span className="text-xs font-bold text-white bg-blue-700 rounded px-1.5 py-0.5">{p.score}</span>
                            <div>
                              <span className="text-xs font-semibold text-neutral-800">{p.label}</span>
                              <span className="text-[11px] text-neutral-400 ml-1">{p.reviews} reviews</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Section 2 — Deals for this weekend */}
                <div>
                  <h3 className="text-lg sm:text-xl font-bold text-neutral-900 mb-0.5">
                    Deals for this weekend
                  </h3>
                  <p className="text-sm text-neutral-500 mb-4">
                    Save on stays for November 6 &ndash; November 8
                  </p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                    {[
                      { image: "https://images.unsplash.com/photo-1529290130-4ca3753253ae?auto=format&fit=crop&w=600&q=80", name: "Hotel Green Garden Residential", location: "Dhaka, Bangladesh", score: 6.2, label: "Review score", reviews: 10, nights: 2, originalPrice: "BDT 2,612", finalPrice: "BDT 2,351", deal: null },
                      { image: "https://images.unsplash.com/photo-1455587734955-081b22074882?auto=format&fit=crop&w=600&q=80", name: "Hotel Grand Pacific", location: "Cox's Bazar, Bangladesh", score: 7.9, label: "Good", reviews: 29, nights: 2, originalPrice: "BDT 13,525", finalPrice: "BDT 12,173", deal: null },
                      { image: "https://images.unsplash.com/photo-1631049307264-da0ec9d70304?auto=format&fit=crop&w=600&q=80", name: "Hotel Farmis Garden", location: "Sylhet, Bangladesh", score: 6.5, label: "Review score", reviews: 113, nights: 2, originalPrice: "BDT 3,471", finalPrice: "BDT 3,019", deal: null },
                      { image: "https://images.unsplash.com/photo-1611892440504-42a792e24d32?auto=format&fit=crop&w=600&q=80", name: "Hotel New Royal Palace Dhanmondi", location: "Dhaka, Bangladesh", score: 6.3, label: "Review score", reviews: 28, nights: 2, originalPrice: "BDT 3,234", finalPrice: "BDT 2,426", deal: "Late Escape Deal" },
                      { image: "https://images.unsplash.com/photo-1562790351-d273a961e0e9?auto=format&fit=crop&w=600&q=80", name: "Ocean Paradise Hotel & Resort", location: "Cox's Bazar, Bangladesh", score: 7.2, label: "Good", reviews: 456, nights: 2, originalPrice: "BDT 8,200", finalPrice: "BDT 7,380", deal: "Early Bird" },
                      { image: "https://images.unsplash.com/photo-1573552987-c2f7b1f42c5a?auto=format&fit=crop&w=600&q=80", name: "Sayeman Beach Resort", location: "Cox's Bazar, Bangladesh", score: 8.1, label: "Very Good", reviews: 189, nights: 2, originalPrice: "BDT 11,000", finalPrice: "BDT 9,350", deal: null },
                      { image: "https://images.unsplash.com/photo-1584132915807-fd1f5fbc078f?auto=format&fit=crop&w=600&q=80", name: "Pan Pacific Sonargaon Dhaka", location: "Dhaka, Bangladesh", score: 8.6, label: "Fabulous", reviews: 1872, nights: 2, originalPrice: "BDT 22,000", finalPrice: "BDT 18,700", deal: "Weekend Deal" },
                      { image: "https://images.unsplash.com/photo-1521401830884-6c03c1c87ebb?auto=format&fit=crop&w=600&q=80", name: "LAKESHORE Hotel & Apartments", location: "Gulshan, Dhaka", score: 7.8, label: "Good", reviews: 324, nights: 2, originalPrice: "BDT 7,500", finalPrice: "BDT 6,375", deal: "Late Escape Deal" },
                    ].map((p, i) => (
                      <div key={i} className="group bg-white rounded-2xl border border-neutral-200 hover:shadow-lg transition-all duration-300 cursor-pointer overflow-hidden">
                        <div className="relative h-44 overflow-hidden">
                          <img src={p.image} alt={p.name} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
                          <button className="absolute top-2.5 right-2.5 w-7 h-7 rounded-full bg-white/90 flex items-center justify-center shadow hover:scale-110 transition-transform">
                            <svg className="w-3.5 h-3.5 text-neutral-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" /></svg>
                          </button>
                          <span className="absolute top-2.5 left-2.5 text-[10px] font-bold text-white bg-blue-700 px-1.5 py-0.5 rounded">Genius</span>
                        </div>
                        <div className="p-3">
                          <h4 className="text-sm font-bold text-neutral-900 leading-tight mb-0.5 group-hover:text-blue-600 transition-colors line-clamp-2">{p.name}</h4>
                          <p className="text-[11px] text-neutral-500 mb-2">{p.location}</p>
                          <div className="flex items-center gap-2 mb-3">
                            <span className="text-xs font-bold text-white bg-blue-700 rounded px-1.5 py-0.5">{p.score}</span>
                            <div>
                              <span className="text-xs font-semibold text-neutral-800">{p.label}</span>
                              <span className="text-[11px] text-neutral-400 ml-1">{p.reviews} reviews</span>
                            </div>
                          </div>
                          <div className="flex items-end justify-between pt-2 border-t border-neutral-100">
                            <div>
                              <p className="text-[11px] text-neutral-400">{p.nights} nights</p>
                              {p.deal && (
                                <span className="inline-block text-[10px] font-semibold text-white bg-[#2563eb] px-2 py-0.5 rounded mt-0.5">{p.deal}</span>
                              )}
                            </div>
                            <div className="text-right">
                              <p className="text-[11px] text-neutral-400 line-through">{p.originalPrice}</p>
                              <p className="text-sm font-bold text-neutral-900">{p.finalPrice}</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* ============ FLIGHTS / CARS: Promotional Banner ============ */}
            {(activeTab === "flights" || activeTab === "cars") && (
              <div className="mt-8 space-y-6">
                <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-[#0f3460] via-[#16213e] to-[#1a1a2e] text-white p-8 sm:p-12 flex flex-col sm:flex-row items-center justify-between gap-6">
                  <div className="absolute -top-16 -right-16 w-64 h-64 rounded-full bg-white/5 pointer-events-none" />
                  <div className="absolute -bottom-10 -left-10 w-48 h-48 rounded-full bg-white/5 pointer-events-none" />
                  <div className="relative z-10 max-w-lg">
                    <span className="inline-block text-[11px] font-bold uppercase tracking-widest text-[#2563eb] mb-3">
                      {activeTab === "flights" ? "✈ Flights" : "🚗 Car Rentals"}
                    </span>
                    <h3 className="font-orbitron text-2xl sm:text-3xl font-bold leading-snug mb-3">
                      {activeTab === "flights" ? "Flights for any kind of trip" : "Car rentals for any kind of trip"}
                    </h3>
                    <p className="text-white/70 text-sm leading-relaxed mb-5">
                      {activeTab === "flights"
                        ? "Whether it's a quick weekend getaway or a round-the-world adventure, Mongzo finds you the best fares across hundreds of airlines — with flexible dates, seat options, and instant booking."
                        : "From compact city cars to spacious SUVs, pick up the perfect vehicle for your journey. Thousands of locations worldwide, transparent pricing, and free cancellation on most bookings."}
                    </p>
                    <div className="flex flex-wrap gap-3">
                      {(activeTab === "flights"
                        ? ["One-way deals", "Round-trip", "Multi-city", "Business class"]
                        : ["Economy cars", "SUVs & 4x4s", "Luxury vehicles", "Vans & minibuses"]
                      ).map((tag) => (
                        <span key={tag} className="text-xs font-medium border border-white/20 rounded-full px-3 py-1 text-white/80 hover:bg-white/10 cursor-pointer transition-colors">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div className="relative z-10 text-center sm:text-right flex-shrink-0">
                    <div className="text-5xl sm:text-7xl mb-3 select-none">
                      {activeTab === "flights" ? "✈️" : "🚗"}
                    </div>
                    <button className="bg-[#2563eb] hover:bg-[#1d4ed8] text-white font-bold text-sm px-7 py-3 rounded-full transition-all duration-200 shadow-lg hover:shadow-xl active:scale-95">
                      {activeTab === "flights" ? "Search Flights" : "Find a Car"}
                    </button>
                  </div>
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                  {(activeTab === "flights"
                    ? [
                        { icon: "🌍", value: "500+", label: "Airlines" },
                        { icon: "🛫", value: "10,000+", label: "Routes worldwide" },
                        { icon: "💰", value: "Best", label: "Price guarantee" },
                        { icon: "⚡", value: "Instant", label: "Booking & e-ticket" },
                      ]
                    : [
                        { icon: "📍", value: "50,000+", label: "Pickup locations" },
                        { icon: "🚘", value: "900+", label: "Car suppliers" },
                        { icon: "🔄", value: "Free", label: "Cancellation" },
                        { icon: "🛡️", value: "Full", label: "Insurance options" },
                      ]
                  ).map((s) => (
                    <div key={s.label} className="bg-white border border-neutral-200 rounded-2xl p-4 text-center hover:shadow-md transition-shadow">
                      <div className="text-2xl mb-1">{s.icon}</div>
                      <p className="text-lg font-bold text-neutral-900">{s.value}</p>
                      <p className="text-xs text-neutral-500">{s.label}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
      </div>
    </section>
  );
};

export default Booking;

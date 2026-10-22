"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { HiOutlineBars3BottomRight } from "react-icons/hi2";
import { IoMdClose } from "react-icons/io";
import toast from "react-hot-toast";
import { useSignOutMutation } from "@/redux/features/auth/authApi";

const navLinks = [
  { label: "About", href: "/#about" },
  { label: "Our Fleet", href: "/#fleet" },
  { label: "Advantages", href: "/#advantages" },
  { label: "Global", href: "/#global" },
];

const Navbar = () => {
  const { user } = useSelector((state: any) => state.auth);
  const [openSidebar, setOpenSidebar] = useState(false);
  const [signOut, { isSuccess }] = useSignOutMutation();
  const router = useRouter();

  useEffect(() => {
    if (isSuccess) {
      toast.success("Logged out successfully!");
      setOpenSidebar(false);
      router.push("/");
    }
  }, [isSuccess, router]);

  const handleSignOut = () => {
    signOut();
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 transition-colors duration-300">
      <div className="w-full px-8 md:px-16 lg:px-24 xl:px-28 h-20 flex items-center justify-between">
        {/* Left Navigation Links */}
        <nav className="hidden md:flex items-center gap-7 lg:gap-10">
          {navLinks.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              className="text-xs lg:text-[13px] tracking-wide text-white/90 hover:text-white transition-colors duration-200 font-medium"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Center Desktop Brand: Mongzo */}
        <div className="hidden md:flex absolute left-1/2 -translate-x-1/2 items-center pointer-events-none">
          <Link
            id="navbar-mongzo-logo"
            href="/"
            className="font-orbitron text-sm lg:text-[15px] tracking-[0.25em] text-white font-medium uppercase pointer-events-auto opacity-0 transition-opacity duration-300 drop-shadow-md"
          >
            Mongzo
          </Link>
        </div>

        {/* Mobile Brand / Fallback Logo */}
        <Link
          href="/"
          className="md:hidden font-orbitron text-sm tracking-[0.2em] text-white uppercase"
        >
          Mongzo
        </Link>

        {/* Right Contact Info & Auth Controls */}
        <div className="hidden md:flex items-center gap-6 lg:gap-8 text-xs lg:text-[13px] tracking-wide text-white/90">
          <a
            href="tel:+971544325050"
            className="hover:text-white transition-colors duration-200 font-medium"
          >
            +971 54 432 5050
          </a>
          <a
            href="mailto:info@jeskojets.com"
            className="hover:text-white transition-colors duration-200 font-medium"
          >
            info@jeskojets.com
          </a>

          {/* User Auth */}
          <div className="flex items-center gap-3 pl-2 border-l border-white/20">
            {user ? (
              <>
                <span className="text-white/80 font-medium">Hi, {user.name}</span>
                <button
                  onClick={handleSignOut}
                  className="px-3.5 py-1 rounded-full border border-white/30 text-white hover:bg-white hover:text-neutral-900 transition-all text-xs"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link
                  href="/signin"
                  className="text-white/80 hover:text-white transition-colors"
                >
                  Sign in
                </Link>
                <Link
                  href="/signup"
                  className="px-3.5 py-1 rounded-full bg-white text-neutral-950 font-medium hover:bg-neutral-200 transition-all text-xs"
                >
                  Sign up
                </Link>
              </>
            )}
          </div>
        </div>

        {/* Mobile Hamburger Button */}
        <button
          className="md:hidden text-white p-1 focus:outline-none"
          onClick={() => setOpenSidebar(!openSidebar)}
          aria-label="Toggle navigation menu"
        >
          {openSidebar ? <IoMdClose size={26} /> : <HiOutlineBars3BottomRight size={26} />}
        </button>
      </div>

      {/* Mobile Drawer Menu */}
      {openSidebar && (
        <div className="md:hidden bg-neutral-950/95 backdrop-blur-md border-b border-white/10 px-6 py-6 flex flex-col gap-4 text-white">
          <nav className="flex flex-col gap-3.5">
            {navLinks.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                className="text-sm font-medium text-white/80 hover:text-white"
                onClick={() => setOpenSidebar(false)}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="pt-4 border-t border-white/10 flex flex-col gap-2.5 text-xs text-white/70">
            <a href="tel:+971544325050" className="hover:text-white">
              +971 54 432 5050
            </a>
            <a href="mailto:info@jeskojets.com" className="hover:text-white">
              info@jeskojets.com
            </a>
          </div>

          <div className="pt-3 border-t border-white/10 flex items-center gap-3">
            {user ? (
              <>
                <span className="text-xs text-white/80">Hi, {user.name}</span>
                <button
                  onClick={handleSignOut}
                  className="w-full py-1.5 rounded-full border border-white/30 text-center text-xs"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link
                  href="/signin"
                  className="w-1/2 py-2 rounded-full border border-white/20 text-center text-xs text-white"
                  onClick={() => setOpenSidebar(false)}
                >
                  Sign in
                </Link>
                <Link
                  href="/signup"
                  className="w-1/2 py-2 rounded-full bg-white text-center text-xs font-semibold text-neutral-950"
                  onClick={() => setOpenSidebar(false)}
                >
                  Sign up
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;

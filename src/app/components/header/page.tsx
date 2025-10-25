"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { Menu, X } from "lucide-react"; // lightweight, modern icons

const Header = ({ variant = "transparent" }) => {
  const routes = [
    { id: 1, text: "Our mission", url: "/about" },
    { id: 2, text: "Services", url: "/services" },
    { id: 3, text: "Volunteer", url: "/volunteer" },
    { id: 4, text: "Blog", url: "/blog" },
    { id: 5, text: "Contact", url: "/contact" },
  ];

  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const isSolid = isScrolled || variant === "solid";

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isSolid ? "bg-white shadow-md" : "bg-transparent"
      }`}
    >
      <div className="flex justify-between items-center max-w-[1230px] mx-auto px-4 py-3">
        {/* Logo */}
        <div className="flex items-center">
          <Link href="/" className="flex items-center">
            <Image
              src="/logo.svg"
              alt="Logo"
              width={160}
              height={40}
              priority
            />
          </Link>
        </div>

        {/* Desktop Nav */}
        <nav className="block max-[860px]:hidden flex-1 justify-center">
          <ul className="flex items-center justify-center gap-6">
            {routes.map((item) => (
              <li
                key={item.id}
                className={`transition-colors ${
                  isSolid
                    ? "text-gray-700 hover:text-[#85c83f]"
                    : "text-white hover:text-[#c0bebe]"
                }`}
              >
                <Link href={item.url}>{item.text}</Link>
              </li>
            ))}
          </ul>
        </nav>

        {/* CTA Button */}
        <div className="block max-[860px]:hidden">
          <Link href="/donate">
            <button
              className={`cursor-pointer transition-all duration-300 ${
                isSolid
                  ? "bg-[#9bdd55] text-black font-medium py-2 px-9 rounded-[8px] hover:rounded-[60px] shadow-md hover:bg-[#85c83f]"
                  : "bg-white text-black font-medium py-2 px-9 shadow-md rounded-[8px] hover:rounded-[60px] hover:bg-[#eeeded] duration-[1000ms] ease-in-out"
              }`}
            >
              Donate now
            </button>
          </Link>
        </div>

        {/* Mobile Menu Toggle */}
        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className={`hidden max-[860px]:block z-50 transition-colors ${
            isSolid ? "text-black" : "text-[#dbdbdbef]"
          }`}
          aria-label="Toggle menu"
        >
          {isMenuOpen ? <X size={26} /> : <Menu size={26} />}
        </button>
      </div>

      {/* Mobile Dropdown Menu */}
      <div
        className={`hidden max-[860px]:flex fixed top-0 left-0 right-0 h-full bg-white z-40 flex-col items-center justify-center pt-6 gap-6 transition-all duration-500 ease-in-out ${
          isMenuOpen ? "opacity-100 visible" : "opacity-0 invisible"
        }`}
      >
        {routes.map((item) => (
          <Link
            key={item.id}
            href={item.url}
            onClick={() => setIsMenuOpen(false)}
            className="text-3xl italic text-gray-800 hover:text-green-600 font-medium"
          >
            {item.text}
          </Link>
        ))}

        <Link href="/donate" onClick={() => setIsMenuOpen(false)}>
          <button className="bg-[#9bdd55] text-black font-medium py-3 px-10 rounded-[60px] shadow-md hover:bg-[#85c83f] transition-all text-3xl">
            Donate now
          </button>
        </Link>
      </div>
    </header>
  );
};

export default Header;

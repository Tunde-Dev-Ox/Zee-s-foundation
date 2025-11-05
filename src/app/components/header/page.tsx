"use client";
import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const Header = ({ variant = "transparent" }) => {
  const routes = [
    { id: 1, text: "Our mission", url: "/our-mission" },
    { id: 3, text: "Volunteer", url: "/volunteer" },
    { id: 4, text: "Blog", url: "/blog" },
    { id: 5, text: "Contact", url: "/contact" },
  ];

  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Prevent body scroll when menu is open and handle focus trap
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = "hidden";
      
      // Focus trap: Get all focusable elements in menu
      const focusableElements = menuRef.current?.querySelectorAll(
        'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])'
      );
      const firstElement = focusableElements?.[0] as HTMLElement;
      const lastElement = focusableElements?.[focusableElements.length - 1] as HTMLElement;
      
      // Focus first element
      setTimeout(() => firstElement?.focus(), 100);
      
      // Handle ESC key
      const handleEscape = (e: KeyboardEvent) => {
        if (e.key === 'Escape') {
          setIsMenuOpen(false);
        }
      };
      
      // Handle Tab key for focus trap
      const handleTab = (e: KeyboardEvent) => {
        if (e.key !== 'Tab' || !focusableElements) return;
        
        if (e.shiftKey) {
          // Shift + Tab
          if (document.activeElement === firstElement) {
            e.preventDefault();
            lastElement?.focus();
          }
        } else {
          // Tab
          if (document.activeElement === lastElement) {
            e.preventDefault();
            firstElement?.focus();
          }
        }
      };
      
      document.addEventListener('keydown', handleEscape);
      document.addEventListener('keydown', handleTab);
      
      return () => {
        document.body.style.overflow = "unset";
        document.removeEventListener('keydown', handleEscape);
        document.removeEventListener('keydown', handleTab);
        // Return focus to menu button
        setTimeout(() => menuButtonRef.current?.focus(), 100);
      };
    } else {
      document.body.style.overflow = "unset";
    }
  }, [isMenuOpen]);

  const isSolid = isScrolled || variant === "solid";

  const menuVariants = {
    hidden: {
      opacity: 0,
      y: -20,
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.3,
        staggerChildren: 0.1,
        delayChildren: 0.2,
      }
    },
    exit: {
      opacity: 0,
      y: -20,
      transition: {
        duration: 0.2,
      }
    }
  };

  const itemVariants = {
    hidden: {
      opacity: 0,
      x: -30,
    },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.4,
      }
    }
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all h-[75px] flex duration-300 ${
          isSolid ? "bg-white border-b border-gray-200" : "bg-transparent"
        }`}
      >
        <div className="flex justify-between items-center max-w-[1200px] mx-auto px-5 py-3 w-full">
          {/* Logo */}
          <div className="flex items-center">
            <Link href="/" className="flex items-center" aria-label="Zee's Foundation - Return to homepage">
              {/* <Image
                src="/logo.svg"
                alt="Zee's Foundation logo"
                width={160}
                height={40}
                priority
              /> */}
              <span className="text-[#9bdd55] text-[24px]">
                Zirachi Foundation
              </span>
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
            <Link
              href="/become-a-member"
              className={`inline-block cursor-pointer transition-all duration-300 ${
                isSolid
                  ? "border-[#9bdd55] border-2 text-green-900 font-medium py-2 px-9 rounded-[24px] hover:rounded-[24px] shadow-md hover:bg-[#85c83f] hover:text-white"
                  : "text-white border-2 border-white py-2 px-9 shadow-md rounded-[24px] font-semibold hover:rounded-[24px] hover:bg-[#eeeded] hover:text-green-900 duration-[1000ms] ease-in-out"
              }`}
            >
              Become a member
            </Link>
          </div>

          {/* Mobile Menu Toggle */}
          <motion.button
            ref={menuButtonRef}
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                setIsMenuOpen(!isMenuOpen);
              }
            }}
            whileTap={{ scale: 0.9 }}
            className={`hidden max-[860px]:block z-50 transition-colors ${
              isSolid ? "text-black" : "text-[#dbdbdbef]"
            }`}
            aria-label={isMenuOpen ? "Close menu" : "Open menu"}
            aria-expanded={isMenuOpen}
            aria-controls="mobile-menu"
          >
            <AnimatePresence mode="wait">
              {isMenuOpen ? (
                <motion.div
                  key="close"
                  initial={{ rotate: -90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: 90, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <X size={26} />
                </motion.div>
              ) : (
                <motion.div
                  key="open"
                  initial={{ rotate: 90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: -90, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <Menu size={26} />
                </motion.div>
              )}
            </AnimatePresence>
          </motion.button>
        </div>
      </header>

      {/* Mobile Dropdown Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            id="mobile-menu"
            role="dialog"
            aria-modal="true"
            aria-labelledby="menu-title"
            ref={menuRef}
            variants={menuVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="hidden max-[860px]:flex fixed top-0 left-0 right-0 h-screen bg-white z-40 flex-col items-center justify-center pt-6 gap-6 overflow-hidden"
          >
            <h2 id="menu-title" className="sr-only">Navigation Menu</h2>
            {/* Decorative background element */}
            <motion.div
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 0.05 }}
              exit={{ scale: 0, opacity: 0 }}
              transition={{ duration: 0.5 }}
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#9bdd55] rounded-full blur-3xl hidden"
              aria-hidden="true"
            />

            {/* Menu Items */}
            {routes.map((item) => (
              <motion.div
                key={item.id}
                variants={itemVariants}
                whileHover={{ scale: 1.05, x: 10 }}
                whileTap={{ scale: 0.95 }}
              >
                <Link
                  href={item.url}
                  onClick={() => setIsMenuOpen(false)}
                  className="text-3xl italic text-gray-800 hover:text-green-600 font-medium transition-colors relative group"
                >
                  {item.text}
                  {/* Underline effect */}
                  <motion.div
                    className="absolute bottom-0 left-0 h-0.5 bg-green-600"
                    initial={{ width: 0 }}
                    whileHover={{ width: "100%" }}
                    transition={{ duration: 0.3 }}
                  />
                </Link>
              </motion.div>
            ))}

            {/* Donate Button */}
            <motion.div
              variants={itemVariants}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
                <Link
                  href="/donate"
                  onClick={() => setIsMenuOpen(false)}
                  className="bg-[#9bdd55] text-black font-medium py-2 px-10 rounded-[24px] shadow-md hover:bg-[#85c83f] transition-all text-3xl inline-block"
                >
                  Donate now
                </Link>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Backdrop overlay */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={() => setIsMenuOpen(false)}
            className="hidden max-[860px]:block fixed inset-0 bg-black/20 z-30 backdrop-blur-sm"
          />
        )}
      </AnimatePresence>
    </>
  );
};

export default Header;
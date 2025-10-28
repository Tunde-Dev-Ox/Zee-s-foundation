"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { FaFacebook, FaTiktok, FaYoutube } from "react-icons/fa";

const footerLinks = [
  {
    title: "About",
    links: [
      { text: "Our mission", href: "/" },
      { text: "Meet the team", href: "/" },
    ],
  },
  {
    title: "Get involved",
    links: [
      { text: "Donate", href: "/" },
      { text: "Volunteer", href: "/" },
      { text: "Become a member", href: "/" },
    ],
  },
  {
    title: "Get help",
    links: [
      { text: "Blog", href: "/" },
      { text: "Contact", href: "/" },
      { text: "Privacy policy", href: "/" },
    ],
  },
];

const Footer = () => {
  return (
    <footer className="bg-gray-100 text-black border-t border-gray-200">
      <div className="max-w-[1200px] mx-auto px-6">
        {/* Top links */}
        <div className="grid grid-cols-3 gap-8 max-[768px]:grid-cols-2 mb-12 pt-10">
          {footerLinks.map((section, i) => (
            <motion.div
              key={section.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.2, duration: 0.6 }}
              viewport={{ once: false }}
            >
              <h4 className="font-semibold text-lg mb-4 text-green-800">
                {section.title}
              </h4>
              <ul className="space-y-3">
                {section.links.map((link) => (
                  <li key={link.text}>
                    <Link
                      href={link.href}
                      className="text-gray-700 hover:text-green-800 transition-colors duration-300"
                    >
                      {link.text}
                    </Link>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>

        {/* Divider */}
        <div className="border-t border-gray-200 mb-8"></div>

        {/* Bottom row */}
        <div className="flex justify-between flex-wrap items-center gap-4 pb-4">
          <p className="text-sm text-gray-600">
            &copy; 2025 Zee&apos;s Foundation. All rights reserved.
          </p>

          <div className="flex gap-6 text-xl text-gray-700">
            <motion.a
              href="/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Facebook"
              whileHover={{ scale: 1.2, color: "#166534" }}
            >
              <FaFacebook />
            </motion.a>
            <motion.a
              href="/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="TikTok"
              whileHover={{ scale: 1.2, color: "#166534" }}
            >
              <FaTiktok />
            </motion.a>
            <motion.a
              href="/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="YouTube"
              whileHover={{ scale: 1.2, color: "#166534" }}
            >
              <FaYoutube />
            </motion.a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

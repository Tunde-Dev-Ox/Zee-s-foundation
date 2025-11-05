"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { FaFacebook, FaTiktok, FaYoutube } from "react-icons/fa";

const footerLinks = [
  {
    title: "About",
    links: [
      { text: "Our mission", href: "/our-mission" },
      { text: "Meet the team", href: "/the-team" },
    ],
  },
  {
    title: "Get involved",
    links: [
      { text: "Donate", href: "/donate" },
      { text: "Volunteer", href: "/volunteer" },
      { text: "Become a member", href: "/become-a-member" },
    ],
  },
  {
    title: "Get help",
    links: [
      { text: "Blog", href: "/blog" },
      { text: "Contact", href: "/contact" },
      { text: "Privacy policy", href: "/privacy-policy" },
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
            &copy; 2025 Zirachi Foundation. All rights reserved.
          </p>

          <div className="flex gap-6 text-xl text-gray-700" role="list">
            <motion.a
              href="/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Visit our Facebook page (opens in new tab)"
              whileHover={{ scale: 1.2, color: "#166534" }}
              role="listitem"
            >
              <FaFacebook aria-hidden="true" />
            </motion.a>
            <motion.a
              href="/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Visit our TikTok page (opens in new tab)"
              whileHover={{ scale: 1.2, color: "#166534" }}
              role="listitem"
            >
              <FaTiktok aria-hidden="true" />
            </motion.a>
            <motion.a
              href="/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Visit our YouTube channel (opens in new tab)"
              whileHover={{ scale: 1.2, color: "#166534" }}
              role="listitem"
            >
              <FaYoutube aria-hidden="true" />
            </motion.a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

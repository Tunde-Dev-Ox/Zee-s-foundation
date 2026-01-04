'use client';

import Link from 'next/link';
import Header from './components/header/Header';
import Footer from './components/footer/Footer';
import { motion } from 'framer-motion';

export default function NotFound() {
  return (
    <div className="bg-white overflow-x-hidden min-h-screen flex flex-col">
      <Header variant="solid" />
      <main id="main-content" className="flex-grow flex items-center justify-center px-5 pt-52 pb-20 max-[768px]:pt-32">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-2xl mx-auto text-center"
        >
          {/* 404 Number */}
          <motion.h1
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="text-9xl font-black text-green-600 mb-4 leading-none"
            aria-label="404"
          >
            404
          </motion.h1>

          {/* Error Message */}
          <motion.h2
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="text-4xl md:text-5xl font-bold text-gray-900 mb-4"
          >
            Page Not Found
          </motion.h2>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="text-lg text-gray-600 mb-8 max-w-md mx-auto"
          >
            Sorry, we couldn&apos;t find the page you&apos;re looking for. The page might have been moved, deleted, or the URL might be incorrect.
          </motion.p>

          {/* Action Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center"
          >
            <Link
              href="/"
              className="bg-[#9bdd55] text-white font-semibold px-8 py-3 rounded-full hover:bg-[#89cc4e] transition-all duration-300 shadow-lg hover:shadow-xl"
            >
              Go to Homepage
            </Link>
            <Link
              href="/blog"
              className="border-2 border-[#9bdd55] text-[#9bdd55] font-semibold px-8 py-3 rounded-full hover:bg-[#9bdd55] hover:text-white transition-all duration-300"
            >
              Read Our Blog
            </Link>
          </motion.div>

          {/* Quick Links */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
            className="mt-12 pt-8 border-t border-gray-200"
          >
            <p className="text-sm text-gray-500 mb-4">Popular Pages:</p>
            <nav aria-label="Popular pages" className="flex flex-wrap justify-center gap-4">
              <Link href="/our-mission" className="text-green-700 hover:text-green-800 underline">
                Our Mission
              </Link>
              <Link href="/donate" className="text-green-700 hover:text-green-800 underline">
                Donate
              </Link>
              <Link href="/volunteer" className="text-green-700 hover:text-green-800 underline">
                Volunteer
              </Link>
              <Link href="/contact" className="text-green-700 hover:text-green-800 underline">
                Contact
              </Link>
            </nav>
          </motion.div>
        </motion.div>
      </main>
      <Footer />
    </div>
  );
}


'use client';

import { useEffect } from 'react';
import Link from 'next/link';
import Header from './components/header/page';
import Footer from './components/footer/page';
import { motion } from 'framer-motion';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log error to error reporting service (Sentry, LogRocket, etc.)
    console.error('Application error:', error);
    
    // In production, send to error tracking service
    // Example: Sentry.captureException(error);
  }, [error]);

  return (
    <div className="bg-white overflow-x-hidden min-h-screen flex flex-col">
      <Header variant="solid" />
      <main id="main-content" className="flex-grow flex items-center justify-center px-5 py-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-2xl mx-auto text-center"
        >
          {/* Error Icon */}
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="mb-6"
          >
            <svg
              className="w-24 h-24 mx-auto text-red-500"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
              />
            </svg>
          </motion.div>

          {/* Error Message */}
          <motion.h1
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="text-4xl md:text-5xl font-bold text-gray-900 mb-4"
          >
            Something went wrong!
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="text-lg text-gray-600 mb-8 max-w-md mx-auto"
          >
            We encountered an unexpected error. Our team has been notified and is working to fix it.
          </motion.p>

          {/* Error Details (only in development) */}
          {process.env.NODE_ENV === 'development' && error.message && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8 }}
              className="mb-8 p-4 bg-red-50 border border-red-200 rounded-lg text-left"
            >
              <p className="text-sm font-semibold text-red-800 mb-2">Error Details (Development Only):</p>
              <p className="text-sm text-red-700 font-mono break-words">{error.message}</p>
              {error.digest && (
                <p className="text-xs text-red-600 mt-2">Error ID: {error.digest}</p>
              )}
            </motion.div>
          )}

          {/* Action Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1 }}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center"
          >
            <button
              onClick={reset}
              className="bg-[#9bdd55] text-white font-semibold px-8 py-3 rounded-full hover:bg-[#89cc4e] transition-all duration-300 shadow-lg hover:shadow-xl"
              aria-label="Try again"
            >
              Try Again
            </button>
            <Link
              href="/"
              className="border-2 border-[#9bdd55] text-[#9bdd55] font-semibold px-8 py-3 rounded-full hover:bg-[#9bdd55] hover:text-white transition-all duration-300"
            >
              Go to Homepage
            </Link>
          </motion.div>

          {/* Support Link */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2 }}
            className="mt-8"
          >
            <p className="text-sm text-gray-500">
              If the problem persists, please{' '}
              <Link href="/contact" className="text-green-700 hover:text-green-800 underline">
                contact our support team
              </Link>
              .
            </p>
          </motion.div>
        </motion.div>
      </main>
      <Footer />
    </div>
  );
}


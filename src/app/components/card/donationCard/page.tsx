"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  containerVariants,
  fadeInUp,
  cardVariants,
  viewportSettings,
  baseTransition,
} from "@/lib/utils/motionConfig";

const DonationCard = () => {
  const [selectedAmount, setSelectedAmount] = useState<number | null>(null);
  const [customAmount, setCustomAmount] = useState("");
  const [frequency, setFrequency] = useState("one-time");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string>("");

  const handleSelectAmount = (amount: number) => {
    setSelectedAmount(amount);
    setCustomAmount("");
  };

  const handleDonateClick = async () => {
    setError("");
    const amount = selectedAmount || parseFloat(customAmount);
    if (!amount || amount <= 0) {
      setError("Please select or enter a valid amount");
      return;
    }

    setLoading(true);
    try {
      const res = await fetch("/api/stripe/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ amount, frequency }),
      });
      const data = await res.json();

      if (data.url) {
        window.location.href = data.url;
      } else {
        setError(data.error || "Something went wrong. Please try again.");
      }
    } catch (err) {
      console.error(err);
      setError("Error connecting to payment gateway. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="pt-10 bg-white">
      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={viewportSettings}
        className="max-w-[650px] mx-auto px-5"
      >
        {/* Header */}
        <motion.div variants={fadeInUp} className="text-center mb-12">
          <motion.div
            variants={fadeInUp}
            className="inline-block mb-4 px-5 py-2 bg-green-100 rounded-full"
          >
            <span className="text-sm font-semibold text-green-700 uppercase tracking-wide">
              Make an Impact
            </span>
          </motion.div>

          <motion.h2
            variants={fadeInUp}
            className="text-4xl md:text-5xl font-bold mb-4 text-gray-900"
          >
            Help children with special needs thrive
          </motion.h2>

          <motion.p
            variants={fadeInUp}
            className="text-lg text-gray-600 max-w-[500px] mx-auto"
          >
            Every contribution helps a child access the care, education, and
            support they deserve.
          </motion.p>
        </motion.div>

        {/* Donation Card */}
        <motion.div
          variants={cardVariants}
          className="bg-white border-1 border-gray-200 p-8 rounded-[24px] transition-shadow duration-300 max-w-[450px] m-auto"
        >
          {/* Frequency Toggle */}
          <fieldset className="mb-8">
            <legend className="sr-only">Select donation frequency</legend>
            <motion.div
              variants={fadeInUp}
              className="flex justify-center gap-3"
              role="radiogroup"
            >
              {["one-time", "monthly"].map((option) => (
                <motion.button
                  key={option}
                  onClick={() => setFrequency(option)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault();
                      setFrequency(option);
                    }
                  }}
                  role="radio"
                  aria-checked={frequency === option}
                  aria-label={`${option === "one-time" ? "One-time" : "Monthly"} donation`}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className={`px-4 py-3 cursor-pointer rounded-full font-semibold border-1 transition-all duration-300 ${
                    frequency === option
                      ? "bg-[#9bdd55] text-white border-[#9bdd55] shadow-lg ring-2 ring-green-500"
                      : "border-gray-300 text-gray-700 hover:border-[#9bdd55]"
                  }`}
                >
                  {option === "one-time" ? "One-time" : "Monthly"}
                </motion.button>
              ))}
            </motion.div>
          </fieldset>

          {/* Amount Buttons */}
          <fieldset className="mb-6">
            <legend className="sr-only">Select donation amount</legend>
            <motion.div variants={fadeInUp} className="grid grid-cols-2 gap-4">
              {[10, 25, 50, 100].map((amount, index) => (
                <motion.button
                  key={amount}
                  onClick={() => handleSelectAmount(amount)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault();
                      handleSelectAmount(amount);
                    }
                  }}
                  aria-pressed={selectedAmount === amount}
                  aria-label={`Donate $${amount}`}
                  whileHover={{ scale: 1.05, y: -3 }}
                  whileTap={{ scale: 0.95 }}
                  transition={{ ...baseTransition, delay: index * 0.05 }}
                  className={`py-4 rounded-xl font-bold text-lg border-1 cursor-pointer transition-all duration-300 ${
                    selectedAmount === amount
                      ? "bg-[#9bdd55] text-white border-[#9bdd55] shadow-lg ring-2 ring-green-500"
                      : "bg-white text-gray-800 border-gray-300 hover:border-[#9bdd55] hover:shadow-md"
                  }`}
                >
                  ${amount}
                </motion.button>
              ))}
            </motion.div>
          </fieldset>

          {/* Custom Amount */}
          <motion.div variants={fadeInUp} className="mb-8 relative">
            <label htmlFor="custom-amount" className="sr-only">
              Enter custom donation amount in US dollars
            </label>
            <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 font-semibold text-lg" aria-hidden="true">
              $
            </div>
            <input
              id="custom-amount"
              type="number"
              min="1"
              max="100000"
              step="0.01"
              placeholder="Enter custom amount"
              value={customAmount}
              onChange={(e) => {
                setCustomAmount(e.target.value);
                setSelectedAmount(null);
                setError("");
              }}
              aria-describedby={error ? "amount-error" : "amount-help"}
              aria-invalid={error ? "true" : "false"}
              className={`border-1 pl-8 pr-4 py-4 rounded-xl text-center text-lg font-semibold w-full transition-all duration-300 ${
                error
                  ? "border-red-500 focus:border-red-500 focus:ring-2 focus:ring-red-500/20"
                  : "border-gray-300 focus:border-[#9bdd55] focus:ring-2 focus:ring-[#9bdd55]/20"
              }`}
            />
            <span id="amount-help" className="sr-only">
              Enter a custom donation amount between $1 and $100,000
            </span>
            {error && (
              <div
                id="amount-error"
                role="alert"
                aria-live="polite"
                className="mt-2 text-sm text-red-600"
              >
                {error}
              </div>
            )}
          </motion.div>

          {/* Donate Button */}
          <motion.button
            onClick={handleDonateClick}
            onKeyDown={(e) => {
              if ((e.key === 'Enter' || e.key === ' ') && !loading) {
                e.preventDefault();
                handleDonateClick();
              }
            }}
            disabled={loading}
            aria-busy={loading}
            aria-label={loading ? "Processing donation" : `${frequency === "monthly" ? "Make monthly donation" : "Make one-time donation"}`}
            whileHover={{ scale: loading ? 1 : 1.02 }}
            whileTap={{ scale: loading ? 1 : 0.98 }}
            transition={baseTransition}
            className="bg-[#9bdd55] text-white font-bold text-lg py-4 px-12 rounded-full cursor-pointer hover:bg-[#89cc4e] transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed w-full shadow-lg hover:shadow-xl relative overflow-hidden group"
          >
            <AnimatePresence mode="wait">
              {loading ? (
                <motion.span
                  key="loading"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="flex items-center justify-center gap-2"
                >
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                    className="w-5 h-5 border-2 border-white border-t-transparent rounded-full"
                  />
                  Processing...
                </motion.span>
              ) : (
                <motion.span
                  key="donate"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                >
                  {frequency === "monthly" ? "Donate Monthly" : "Donate Now"}
                </motion.span>
              )}
            </AnimatePresence>

            {/* Hover shine effect */}
            <motion.div
              className="absolute inset-0 bg-white/20"
              initial={{ x: "-100%" }}
              whileHover={{ x: "100%" }}
              transition={{ duration: 0.6 }}
            />
          </motion.button>
        </motion.div>

        {/* Impact Badge */}
        <motion.div
          variants={fadeInUp}
          className="mt-8 bg-green-950 text-white p-6 rounded-2xl flex items-center justify-center gap-6 shadow-xl max-[580px]:flex-col"
        >
          <motion.div
            variants={fadeInUp}
            className="bg-[#9bdd55] px-6 py-4 rounded-xl"
          >
            <p className="text-4xl font-black text-green-950">100%</p>
          </motion.div>
          <p className="max-w-[350px] text-left text-base leading-relaxed max-[580px]:text-center">
            of your donation goes{" "}
            <span className="font-bold text-[#9bdd55]">directly</span> to
            supporting families and children in need.
          </p>
        </motion.div>

        {/* Trust Indicators */}
        <motion.div
          variants={fadeInUp}
          className="mt-6 flex justify-center items-center gap-8 text-sm text-gray-500"
        >
          <div className="flex items-center gap-2">
            <svg
              className="w-5 h-5 text-green-600"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fillRule="evenodd"
                d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                clipRule="evenodd"
              />
            </svg>
            <span className="font-medium">Secure Payment</span>
          </div>
          <div className="flex items-center gap-2">
            <svg
              className="w-5 h-5 text-green-600"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fillRule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                clipRule="evenodd"
              />
            </svg>
            <span className="font-medium">Tax Deductible</span>
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default DonationCard;
"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const DonationCard = () => {
  const [selectedAmount, setSelectedAmount] = useState<number | null>(null);
  const [customAmount, setCustomAmount] = useState("");
  const [frequency, setFrequency] = useState("one-time");
  const [loading, setLoading] = useState(false);

  type Amount = number;

  interface IHandleSelect {
    (amount: Amount): void;
  }

  const handleSelectAmount: IHandleSelect = (amount) => {
    setSelectedAmount(amount);
    setCustomAmount("");
  };

  const handleDonateClick = async () => {
    const amount = selectedAmount || parseFloat(customAmount);
    if (!amount || amount <= 0) {
      alert("Please select or enter a valid amount");
      return;
    }

    setLoading(true);
    try {
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ amount, frequency }),
      });
      const data = await res.json();

      if (data.url) {
        window.location.href = data.url;
      } else {
        alert("Something went wrong. Please try again.");
      }
    } catch (err) {
      console.error(err);
      alert("Error connecting to payment gateway.");
    } finally {
      setLoading(false);
    }
  };

  const containerVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        staggerChildren: 0.1,
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.4 }
    }
  };

  return (
    <section className="pt-10 bg-white">
      <motion.div 
        initial="hidden"
        whileInView="visible"
        viewport={{ once: false, amount: 0.3 }}
        variants={containerVariants}
        className="max-w-[650px] mx-auto px-5"
      >
        {/* Header */}
        <motion.div variants={itemVariants} className="text-center mb-12">
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="inline-block mb-4 px-5 py-2 bg-green-100 rounded-full"
          >
            <span className="text-sm font-semibold text-green-700 uppercase tracking-wide">
              Make an Impact
            </span>
          </motion.div>

          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-gray-900">
            Help children with special needs thrive
          </h2>
          <p className="text-lg text-gray-600 max-w-[500px] mx-auto">
            Every contribution helps a child access the care, education, and
            support they deserve.
          </p>
        </motion.div>

        {/* Donation Card */}
        <motion.div 
          variants={itemVariants}
          className="bg-white border-2 border-gray-200 p-8 rounded-[24px] transition-shadow duration-300 max-w-[450px] m-auto"
        >
          {/* Frequency Toggle */}
          <div className="flex justify-center gap-3 mb-8">
            {["one-time", "monthly"].map((option) => (
              <motion.button
                key={option}
                onClick={() => setFrequency(option)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={`px-4 py-3 cursor-pointer rounded-full font-semibold border-2 transition-all duration-300 ${
                  frequency === option
                    ? "bg-[#9bdd55] text-white border-[#9bdd55] shadow-lg"
                    : "border-gray-300 text-gray-700 hover:border-[#9bdd55]"
                }`}
              >
                {option === "one-time" ? "One-time" : "Monthly"}
              </motion.button>
            ))}
          </div>

          {/* Amount Buttons */}
          <div className="grid grid-cols-2 gap-4 mb-6">
            {[10, 25, 50, 100].map((amount, index) => (
              <motion.button
                key={amount}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.05 }}
                onClick={() => handleSelectAmount(amount)}
                whileHover={{ scale: 1.05, y: -3 }}
                whileTap={{ scale: 0.95 }}
                className={`py-4 rounded-xl cursor-pointer font-bold text-lg border-2 transition-all duration-300 ${
                  selectedAmount === amount
                    ? "bg-[#9bdd55] text-white border-[#9bdd55] shadow-lg"
                    : "bg-white text-gray-800 border-gray-300 hover:border-[#9bdd55] hover:shadow-md"
                }`}
              >
                ${amount}
              </motion.button>
            ))}
          </div>

          {/* Custom Amount */}
          <motion.div 
            variants={itemVariants}
            className="mb-8 relative"
          >
            <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 font-semibold text-lg">
              $
            </div>
            <input
              type="number"
              placeholder="Enter custom amount"
              value={customAmount}
              onChange={(e) => {
                setCustomAmount(e.target.value);
                setSelectedAmount(null);
              }}
              className="border-2 border-gray-300 pl-8 pr-4 py-4 rounded-xl text-center text-lg font-semibold focus:outline-none focus:border-[#9bdd55] focus:ring-2 focus:ring-[#9bdd55]/20 w-full transition-all duration-300"
            />
          </motion.div>

          {/* Donate Button */}
          <motion.button
            onClick={handleDonateClick}
            disabled={loading}
            whileHover={{ scale: loading ? 1 : 1.02 }}
            whileTap={{ scale: loading ? 1 : 0.98 }}
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
          variants={itemVariants}
          whileHover={{ scale: 1.02 }}
          className="mt-8 bg-green-950 text-white p-6 rounded-2xl flex items-center justify-center gap-6 shadow-xl max-[580px]:flex-col"
        >
          <motion.div
            initial={{ scale: 0 }}
            whileInView={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 200, delay: 0.3 }}
            className="bg-[#9bdd55] px-6 py-4 rounded-xl"
          >
            <p className="text-4xl font-black text-green-950">100%</p>
          </motion.div>
          <p className="max-w-[350px] text-left text-base leading-relaxed max-[580px]:text-center">
            of your donation goes <span className="font-bold text-[#9bdd55]">directly</span> to supporting families and children in need.
          </p>
        </motion.div>

        {/* Trust Indicators */}
        <motion.div
          variants={itemVariants}
          className="mt-6 flex justify-center items-center gap-8 text-sm text-gray-500"
        >
          <div className="flex items-center gap-2">
            <svg className="w-5 h-5 text-green-600" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            </svg>
            <span className="font-medium">Secure Payment</span>
          </div>
          <div className="flex items-center gap-2">
            <svg className="w-5 h-5 text-green-600" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            </svg>
            <span className="font-medium">Tax Deductible</span>
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default DonationCard;
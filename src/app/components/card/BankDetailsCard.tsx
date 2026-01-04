"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Copy, Check, Building2, CreditCard, Globe } from "lucide-react";

// You can move these to a config file later if needed
const BANK_DETAILS = {
    bankName: "Zenith Bank",
    accountName: "Zirachi Care Foundation",
    accountNumber: "1017409489", // Replace with actual number
    currency: "NGN",
    swiftCode: "ZENITHNGN", // Optional
};

const BankDetailsCard = () => {
    const [copied, setCopied] = useState(false);

    const handleCopy = async () => {
        try {
            await navigator.clipboard.writeText(BANK_DETAILS.accountNumber);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        } catch (err) {
            console.error("Failed to copy text: ", err);
        }
    };

    const containerVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.6,
                staggerChildren: 0.1,
            },
        },
    };

    const itemVariants = {
        hidden: { opacity: 0, x: -20 },
        visible: { opacity: 1, x: 0 },
    };

    return (
        <section className="py-16 bg-gradient-to-b from-white to-gray-50">
            <div className="max-w-[1000px] mx-auto px-6">
                <motion.div
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    variants={containerVariants}
                    className="text-center mb-12"
                >
                    <motion.span
                        variants={itemVariants}
                        className="inline-block py-1 px-3 rounded-full bg-green-100 text-green-800 text-sm font-semibold mb-4 tracking-wide"
                    >
                        DIRECT TRANSFER
                    </motion.span>
                    <motion.h2 variants={itemVariants} className="text-4xl md:text-5xl font-bold mb-4 text-gray-900">
                        Support Our Mission
                    </motion.h2>
                    <motion.p variants={itemVariants} className="text-lg text-gray-600 max-w-2xl mx-auto">
                        Your generous contributions directly support children with special needs.
                        Please make a transfer to our official bank account below.
                    </motion.p>
                </motion.div>

                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    className="relative max-w-xl mx-auto"
                >
                    {/* Decorative Elements */}
                    <div className="absolute -top-10 -left-10 w-40 h-40 bg-green-200 rounded-full blur-3xl opacity-30 animate-pulse"></div>
                    <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-blue-200 rounded-full blur-3xl opacity-30 animate-pulse" style={{ animationDelay: "1s" }}></div>

                    {/* Main Card */}
                    <div className="relative bg-white rounded-3xl shadow-xl border border-gray-100 overflow-hidden">
                        {/* Top Banner */}
                        <div className="bg-[#166534] p-6 text-white text-center relative overflow-hidden">
                            <div className="absolute top-0 left-0 w-full h-full opacity-10 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]"></div>
                            <h3 className="font-bold text-2xl relative z-10">Bank Details</h3>
                            <p className="text-green-100 text-sm relative z-10">Official Account</p>
                        </div>

                        <div className="p-8 space-y-6">
                            {/* Bank Name */}
                            <div className="flex items-start space-x-4 p-4 rounded-xl bg-gray-50 border border-gray-50 hover:border-[#9bdd55] transition-colors duration-300">
                                <div className="p-3 bg-white rounded-lg shadow-sm text-[#166534]">
                                    <Building2 className="w-6 h-6" />
                                </div>
                                <div>
                                    <p className="text-sm text-gray-500 font-medium">Bank Name</p>
                                    <p className="text-xl font-bold text-gray-900">{BANK_DETAILS.bankName}</p>
                                </div>
                            </div>

                            {/* Account Name */}
                            <div className="flex items-start space-x-4 p-4 rounded-xl bg-gray-50 border border-gray-50 hover:border-[#9bdd55] transition-colors duration-300">
                                <div className="p-3 bg-white rounded-lg shadow-sm text-[#166534]">
                                    <Globe className="w-6 h-6" />
                                </div>
                                <div>
                                    <p className="text-sm text-gray-500 font-medium">Account Name</p>
                                    <p className="text-xl font-bold text-gray-900 break-words">{BANK_DETAILS.accountName}</p>
                                </div>
                            </div>

                            {/* Account Number (Copyable) */}
                            <div className="relative group">
                                <div
                                    className="flex items-center justify-between p-5 rounded-xl bg-[#F0FDF4] border-2 border-[#9bdd55] cursor-pointer group-hover:shadow-md transition-all duration-300"
                                    onClick={handleCopy}
                                >
                                    <div className="flex items-center space-x-4">
                                        <div className="p-3 bg-white rounded-lg shadow-sm text-[#166534]">
                                            <CreditCard className="w-6 h-6" />
                                        </div>
                                        <div>
                                            <p className="text-sm text-green-700 font-medium mb-1">Account Number</p>
                                            <p className="text-2xl md:text-3xl font-mono font-bold text-[#166534] tracking-wider">
                                                {BANK_DETAILS.accountNumber}
                                            </p>
                                        </div>
                                    </div>

                                    <button
                                        className="ml-4 p-3 rounded-full hover:bg-green-100 transition-colors text-[#166534]"
                                        aria-label="Copy account number"
                                    >
                                        {copied ? <Check className="w-6 h-6" /> : <Copy className="w-6 h-6" />}
                                    </button>
                                </div>

                                <AnimatePresence>
                                    {copied && (
                                        <motion.div
                                            initial={{ opacity: 0, y: 10 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            exit={{ opacity: 0, y: 10 }}
                                            className="absolute left-1/2 -translate-x-1/2 -top-12 bg-gray-900 text-white text-xs font-bold py-2 px-4 rounded-lg shadow-lg whitespace-nowrap"
                                        >
                                            Copied to clipboard!
                                            <div className="absolute -bottom-1 left-1/2 -ml-1 w-2 h-2 bg-gray-900 rotate-45"></div>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>

                            <p className="text-center text-sm text-gray-500 pt-4">
                                Thank you for your support. Please reference your name when making the transfer.
                            </p>

                        </div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
};

export default BankDetailsCard;

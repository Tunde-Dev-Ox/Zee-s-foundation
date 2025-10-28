'use client';
import { motion } from "framer-motion";
import { FaEnvelope, FaPhone, FaMapMarkerAlt } from 'react-icons/fa';
import Header from '../components/header/page';
import Footer from '../components/footer/page';
import Link from "next/link";
import type { Variants } from "framer-motion";

const Contact = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.1,
      }
    }
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeInOut" as const },
    },
  };
  

  const cardVariants: Variants = {
    hidden: { 
      opacity: 0, 
      scale: 0.8,
      y: 20
    },
    visible: { 
      opacity: 1, 
      scale: 1,
      y: 0,
      transition: {
        type: "spring" as const,
        damping: 15,
        stiffness: 100,
      }
    }
  };

  const contactMethods = [
    {
      icon: FaPhone,
      title: "Call Us",
      value: "+234 901 234 5678",
      href: "tel:+2349012345678",
      color: "from-blue-500 to-blue-600"
    },
    {
      icon: FaEnvelope,
      title: "Email Us",
      value: "info@momspecialstories.org",
      href: "mailto:info@momspecialstories.org",
      color: "from-green-500 to-green-600"
    },
    {
      icon: FaMapMarkerAlt,
      title: "Location",
      value: "Across Africa",
      href: "#",
      color: "from-purple-500 to-purple-600"
    }
  ];

  return (
    <div className="overflow-x-hidden">
      <Header variant='solid' />
      <main className='bg-gradient-to-b from-gray-50 to-white min-h-screen flex flex-col justify-center items-center py-32 px-5'>
        <motion.section 
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="max-w-5xl mx-auto w-full"
        >
          {/* Badge */}
          <motion.div
            variants={itemVariants}
            className="flex justify-center mb-6"
          >
            <div className="inline-block px-6 py-2 bg-green-100 rounded-full">
              <span className="text-sm font-semibold text-green-700 uppercase tracking-wide">
                Get In Touch
              </span>
            </div>
          </motion.div>

          {/* Heading */}
          <motion.h1 
            variants={itemVariants}
            className="text-4xl md:text-5xl lg:text-6xl font-bold text-center text-gray-900 mb-6"
          >
            Contact Us
          </motion.h1>

          {/* Description */}
          <motion.p 
            variants={itemVariants}
            className="text-center text-gray-600 text-lg max-w-[700px] mx-auto mb-12 leading-relaxed px-4"
          >
            Get in touch with us for any inquiries, support, or feedback. We&apos;d love to hear from you!
          </motion.p>

          {/* Contact Cards */}
          <motion.div 
            variants={containerVariants}
            className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12"
          >
            {contactMethods.map((method, index) => (
              <motion.a
                key={index}
                href={method.href}
                variants={cardVariants}
                whileHover={{ 
                  y: -10,
                  scale: 1.03,
                  transition: { duration: 0.3 }
                }}
                whileTap={{ scale: 0.98 }}
                className="bg-green-950 p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 border-2 border-gray-100 hover:border-green-200 cursor-pointer group"
              >
                {/* Icon with gradient background */}
                <motion.div
                  whileHover={{ rotate: 360 }}
                  transition={{ duration: 0.6 }}
                  className={`w-16 h-16 mx-auto mb-4 rounded-xl flex items-center justify-center`}
                >
                  <method.icon className="text-white text-4xl" />
                </motion.div>

                {/* Title */}
                <h3 className="text-xl font-bold text-white text-center mb-2">
                  {method.title}
                </h3>

                {/* Value */}
                <p className="text-gray-400 text-center group-hover:text-green-600 transition-colors break-words">
                  {method.value}
                </p>
              </motion.a>
            ))}
          </motion.div>

          {/* Note Section */}
          <motion.div
            variants={itemVariants}
            className="bg-amber-50 border-2 border-amber-200 rounded-2xl p-8 max-w-3xl mx-auto px-4"
          >
            <div className="flex items-start gap-4">
              <div className="flex-shrink-0">
                <svg className="w-6 h-6 text-amber-600 mt-1" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                </svg>
              </div>
              <div>
                <h4 className="font-bold text-amber-900 mb-2 text-lg">Important Note</h4>
                <p className="text-amber-800 leading-relaxed">
                  Zee&apos;s Foundation is a non-profit platform dedicated to empowering families of children with special needs across Africa. We do not offer commercial services or accept unsolicited funding requests.
                </p>
              </div>
            </div>
          </motion.div>

          {/* Additional CTA */}
          <motion.div
            variants={itemVariants}
            className="text-center mt-12"
          >
            <p className="text-gray-600 mb-6 text-lg">
              Want to make a difference?
            </p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="font-bold text-lg py-4 px-10 rounded-full border-2 border-[#89cc4e] text-gray-600 cursor-pointer hover:bg-[#89cc4e] transition-all duration-300 hover:shadow-xl"
            >
              <Link href="/volunteer">
                Join as a Volunteer 
              </Link>
            </motion.button>
          </motion.div>
        </motion.section>
      </main>
      <Footer />
    </div>
  );
};

export default Contact;
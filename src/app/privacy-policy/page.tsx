'use client';
import { motion } from "framer-motion";
import Header from "../components/header/Header";
import Footer from "../components/footer/Footer";
import {
  containerVariants,
  fadeInUp,
  viewportSettings,
} from "@/lib/utils/motionConfig";

const PrivacyPolicy = () => {
  const sections = [
    {
      title: "1. Information We Collect",
      content: [
        "We collect information that you provide directly to us when you:",
        "• Register for our programs or services",
        "• Make a donation through our platform",
        "• Subscribe to our newsletter or updates",
        "• Fill out contact forms or volunteer applications",
        "• Participate in surveys or provide feedback",
        "The types of personal information we may collect include your name, email address, postal address, phone number, payment information (processed securely through third-party payment processors), and any other information you choose to provide.",
      ],
    },
    {
      title: "2. How We Use Your Information",
      content: [
        "We use the information we collect to:",
        "• Process donations and manage your contributions",
        "• Send you updates about our programs and impact",
        "• Respond to your inquiries and provide support",
        "• Improve our services and website functionality",
        "• Comply with legal obligations and protect our rights",
        "• Send you newsletters and communications (with your consent, which you can withdraw at any time)",
      ],
    },
    {
      title: "3. Information Sharing",
      content: [
        "We respect your privacy and do not sell, trade, or rent your personal information to third parties. We may share your information only in the following circumstances:",
        "• With trusted service providers who assist us in operating our website, processing donations, or conducting our operations (these providers are contractually obligated to protect your information)",
        "• When required by law or to protect our rights and safety",
        "• With your explicit consent",
        "• In connection with a merger, acquisition, or sale of assets (with appropriate notice)",
      ],
    },
    {
      title: "4. Data Security",
      content: [
        "We implement appropriate technical and organizational security measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction. However, no method of transmission over the Internet or electronic storage is 100% secure, and we cannot guarantee absolute security.",
        "All payment transactions are processed through secure, PCI-compliant payment processors. We do not store your full credit card information on our servers.",
      ],
    },
    {
      title: "5. Your Rights and Choices",
      content: [
        "You have the right to:",
        "• Access and receive a copy of your personal data",
        "• Correct inaccurate or incomplete information",
        "• Request deletion of your personal information (subject to legal and operational requirements)",
        "• Object to or restrict certain processing activities",
        "• Withdraw consent for marketing communications at any time",
        "• Opt-out of cookies and tracking technologies (see our Cookie Policy)",
        "To exercise these rights, please contact us using the information provided in the 'Contact Us' section below.",
      ],
    },
    {
      title: "6. Children's Privacy",
      content: [
        "Our website and services are designed to support children with special needs and their families. We are committed to protecting the privacy of children. We do not knowingly collect personal information from children under the age of 13 without parental consent. If you believe we have collected information from a child without proper consent, please contact us immediately.",
      ],
    },
    {
      title: "7. Cookies and Tracking Technologies",
      content: [
        "We use cookies and similar tracking technologies to enhance your experience on our website, analyze usage patterns, and improve our services. You can control cookie preferences through your browser settings. For more detailed information, please see our Cookie Policy.",
      ],
    },
    {
      title: "8. Third-Party Links",
      content: [
        "Our website may contain links to third-party websites or services. We are not responsible for the privacy practices of these external sites. We encourage you to review the privacy policies of any third-party sites you visit.",
      ],
    },
    {
      title: "9. International Data Transfers",
      content: [
        "As an organization operating across Africa, your information may be transferred to and processed in countries outside your country of residence. We take appropriate safeguards to ensure your information is protected in accordance with this Privacy Policy, regardless of where it is processed.",
      ],
    },
    {
      title: "10. Updates to This Policy",
      content: [
        "We may update this Privacy Policy from time to time to reflect changes in our practices or for other operational, legal, or regulatory reasons. We will notify you of any material changes by posting the new Privacy Policy on this page and updating the 'Last Updated' date. Your continued use of our website after such changes constitutes acceptance of the updated policy.",
      ],
    },
  ];

  return (
    <div className="bg-white overflow-x-hidden">
      <Header variant="solid" />

      <main id="main-content">
        {/* Hero Section */}
        <section className="pt-52 pb-20 bg-gradient-to-b from-gray-50 to-white max-[768px]:pt-32">
          <motion.div
            className="max-w-[1200px] m-auto px-5 text-center"
            variants={fadeInUp}
            initial="hidden"
            animate="visible"
            viewport={viewportSettings}
          >
            <div className="inline-block mb-6 px-6 bg-green-100 rounded-full">
              <span className="text-sm font-semibold text-green-700 uppercase tracking-wide">
                Privacy & Security
              </span>
            </div>

            <motion.h1
              className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6"
              variants={fadeInUp}
            >
              Privacy Policy
            </motion.h1>

            <motion.p
              className="text-lg text-gray-600 max-w-[700px] m-auto leading-relaxed mb-8"
              variants={fadeInUp}
            >
              At Zira Childcare Foundation, we are committed to protecting your privacy and ensuring the security of your personal information. This policy explains how we collect, use, and safeguard your data.
            </motion.p>

            <motion.p
              className="text-sm text-gray-500"
              variants={fadeInUp}
            >
              Last Updated: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
            </motion.p>
          </motion.div>
        </section>

        {/* Privacy Policy Content */}
        <section className="py-20 bg-white">
          <motion.div
            variants={containerVariants}
            animate="visible"
            viewport={viewportSettings}
            className="max-w-[900px] m-auto px-6"
          >
            <motion.div
              variants={fadeInUp}
              className="mb-12"
            >
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                Introduction
              </h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                Welcome to Zira Childcare Foundation. We respect your privacy and are committed to protecting your personal data. This privacy policy will inform you about how we look after your personal information when you visit our website, make a donation, volunteer, or engage with our programs, and tell you about your privacy rights and how the law protects you.
              </p>
              <p className="text-gray-700 leading-relaxed">
                This policy applies to all information collected through our website, donation platform, and any related services, communications, and programs operated by Zira Childcare Foundation.
              </p>
            </motion.div>

            {sections.map((section, index) => (
              <motion.div
                key={index}
                variants={fadeInUp}
                className="mb-12 pb-8 border-b border-gray-200 last:border-b-0"
              >
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                  {section.title}
                </h2>
                <div className="space-y-3">
                  {section.content.map((paragraph, pIndex) => (
                    <p
                      key={pIndex}
                      className={`text-gray-700 leading-relaxed ${
                        paragraph.startsWith('•') ? 'pl-4' : ''
                      }`}
                    >
                      {paragraph}
                    </p>
                  ))}
                </div>
              </motion.div>
            ))}

            {/* Contact Section */}
            <motion.div
              variants={fadeInUp}
              className="mt-12 p-8 bg-green-50 rounded-2xl border border-green-100"
            >
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                Contact Us
              </h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                If you have any questions, concerns, or requests regarding this Privacy Policy or our data practices, please contact us:
              </p>
              <div className="space-y-2 text-gray-700">
                <p>
                  <strong>Email:</strong>info@zirachifoundation.org
                </p>
                <p>
                  <strong>Phone:</strong> Available through our contact page
                </p>
                <p>
                  <strong>Address:</strong> Contact information available on our website
                </p>
              </div>
              <p className="text-gray-700 leading-relaxed mt-4">
                We will respond to your inquiry within 30 days of receipt.
              </p>
            </motion.div>

            {/* Consent Section */}
            <motion.div
              variants={fadeInUp}
              className="mt-8 text-center"
            >
              <p className="text-gray-600 text-sm leading-relaxed">
                By using our website and services, you acknowledge that you have read and understood this Privacy Policy and agree to the collection, use, and disclosure of your information as described herein.
              </p>
            </motion.div>
          </motion.div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default PrivacyPolicy;


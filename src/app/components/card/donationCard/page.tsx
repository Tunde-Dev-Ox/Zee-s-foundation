"use client";
import { useState } from "react";

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
        window.location.href = data.url; // Redirect to Stripe
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

  return (
    <section className="py-20 bg-[#f9fafb]">
      <div className="max-w-[600px] mx-auto px-6 text-center">
        <h2 className="text-5xl font-semibold mb-4">
          Help children with special needs thrive
        </h2>
        <p className="text-gray-600 mb-10">
          Every contribution helps a child access the care, education, and
          support they deserve.
        </p>
        
        <div className="border-[#cacaca] border-[1px] p-4 rounded-2xl max-w-[350px] mx-auto">
        {/* Frequency toggle */}
        <div className="flex justify-center gap-4 mb-8">
          {["one-time", "monthly"].map((option) => (
            <button
              key={option}
              onClick={() => setFrequency(option)}
              className={`px-6 py-2 cursor-pointer rounded-full font-medium border transition-all duration-300 ${
                frequency === option
                  ? "bg-[#9bdd55] text-white border-[#9bdd55]"
                  : "border-gray-300 text-gray-700 hover:border-[#9bdd55]"
              }`}
            >
              {option === "one-time" ? "One-time" : "Monthly"}
            </button>
          ))}
        </div>

        {/* Amount buttons */}
        <div className="grid grid-cols-2 sm:grid-cols-2 gap-4 mb-6">
          {[10, 25, 50, 100].map((amount) => (
            <button
              key={amount}
              onClick={() => handleSelectAmount(amount)}
              className={`py-3 rounded-lg cursor-pointer font-semibold border transition-all duration-300 ${
                selectedAmount === amount
                  ? "bg-[#9bdd55] text-white border-[#9bdd55]"
                  : "bg-white text-gray-800 border-gray-300 hover:border-[#9bdd55]"
              }`}
            >
              ${amount}
            </button>
          ))}
        </div>

        {/* Custom amount */}
        <div className="flex items-center justify-center mb-8 w-full">
          <input
            type=""
            placeholder="Other amount"
            value={customAmount}
            onChange={(e) => {
              setCustomAmount(e.target.value);
              setSelectedAmount(null);
            }}
            className="border border-gray-300 px-4 py-2 rounded-md text-center focus:outline-none focus:border-[#9bdd55] w-full"
          />
        </div>

        {/* Donate button */}
        <button
          onClick={handleDonateClick}
          disabled={loading}
          className="bg-[#9bdd55] text-white font-semibold py-3 px-12 rounded-lg hover:bg-[#89cc4e] transition-all duration-300 disabled:opacity-50 w-full"
        >
          {loading
            ? "Processing..."
            : frequency === "monthly"
            ? "Donate Monthly"
            : "Donate Now"}
        </button>
        </div>

        <div className="mt-10 bg-green-950 text-white p-6 rounded-lg flex items-center justify-center gap-4">
          <p className="bg-[#9bdd55] p-4 rounded-lg text-2xl font-bold">100%</p>
          <p className="max-w-[400px] text-left">
            of your donation goes directly to supporting families and children in
            need.
          </p>
        </div>
      </div>
    </section>
  );
};

export default DonationCard;

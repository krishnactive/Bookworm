import React, { useState } from "react";
import { FaBook, FaChalkboardTeacher, FaTags, FaRegCopy, FaCheck } from "react-icons/fa";

const coupons = [
  {
    id: 1,
    title: "20% OFF on All Books",
    code: "BOOKWORM20",
    description: "Get 20% off on your next purchase of any book.",
    expires: "Expires: 30th June 2025",
    icon: <FaBook className="text-rose-600 text-xl" />,
  },
  {
    id: 2,
    title: "Flat ₹500 OFF on Courses",
    code: "LEARN500",
    description: "Enjoy ₹500 off on any premium course.",
    expires: "Expires: 15th July 2025",
    icon: <FaChalkboardTeacher className="text-indigo-600 text-xl" />,
  },
  {
    id: 3,
    title: "Buy 2 Get 1 Free",
    code: "B2G1FREE",
    description: "Applicable on select book collections.",
    expires: "Expires: 10th June 2025",
    icon: <FaTags className="text-yellow-500 text-xl" />,
  },
];

const Coupons = () => {
  const [copiedCode, setCopiedCode] = useState(null);

  const handleCopy = (code) => {
    navigator.clipboard.writeText(code);
    setCopiedCode(code);
    setTimeout(() => setCopiedCode(null), 2000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 to-rose-50 dark:from-gray-900 dark:to-gray-800 py-20 px-4">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-3xl md:text-4xl font-bold text-center mb-8 text-gray-800 dark:text-white">
          🎉 Exclusive Coupons & Offers
        </h1>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {coupons.map((coupon) => (
            <div
              key={coupon.id}
              className="bg-white dark:bg-gray-700 border border-gray-200 dark:border-gray-600 p-6 rounded-2xl shadow-md hover:shadow-lg transition"
            >
              <div className="flex items-center gap-3 mb-4">
                {coupon.icon}
                <h2 className="text-lg font-semibold text-gray-800 dark:text-white">
                  {coupon.title}
                </h2>
              </div>
              <p className="text-gray-600 dark:text-gray-300 text-sm mb-2">
                {coupon.description}
              </p>

              <div className="flex items-center justify-between bg-rose-100 dark:bg-rose-900 px-3 py-1 rounded-lg text-sm font-mono text-rose-600 mb-3">
                <span>{coupon.code}</span>
                <button
                  onClick={() => handleCopy(coupon.code)}
                  className="ml-2 text-xs text-rose-600 hover:text-rose-800 dark:hover:text-white transition"
                >
                  {copiedCode === coupon.code ? (
                    <span className="flex items-center gap-1">
                      <FaCheck /> Copied!
                    </span>
                  ) : (
                    <span className="flex items-center gap-1">
                      <FaRegCopy /> Copy
                    </span>
                  )}
                </button>
              </div>

              <p className="text-xs text-gray-500 dark:text-gray-400">{coupon.expires}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Coupons;

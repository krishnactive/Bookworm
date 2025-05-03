import React from "react";
import { FaGift, FaBookOpen, FaGraduationCap } from "react-icons/fa";

const GiftCard = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-rose-100 to-rose-300 dark:from-gray-800 dark:to-gray-900 py-20 px-4 flex items-center justify-center">
      <div className="max-w-4xl w-full bg-white dark:bg-gray-800 rounded-3xl shadow-2xl p-8 md:p-12">
        <div className="flex items-center gap-4 mb-8">
          <FaGift className="text-rose-500 text-4xl" />
          <h1 className="text-3xl md:text-4xl font-bold text-gray-800 dark:text-white">
            The Perfect Gift for Every Book & Course Lover
          </h1>
        </div>
        <p className="text-lg text-gray-600 dark:text-gray-300 mb-10">
          Send a digital gift card to someone special. Let them explore thousands of books, audio
          reads, and premium courses — all in one place.
        </p>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
          {[{ amount: 250 }, { amount: 500 }, { amount: 1000 }].map(({ amount }) => (
            <div
              key={amount}
              className="bg-gradient-to-tr from-white to-rose-100 dark:from-gray-700 dark:to-gray-800 p-6 rounded-2xl shadow-md border border-rose-200 dark:border-gray-600 hover:scale-105 transition-transform"
            >
              <h3 className="text-2xl font-semibold text-rose-600 dark:text-white">
                ₹{amount} Gift Card
              </h3>
              <p className="text-gray-500 dark:text-gray-300 mt-2">
                Great for birthdays, holidays or just because!
              </p>
              <div className="mt-4 flex gap-2 text-rose-400 dark:text-rose-300">
                <FaBookOpen />
                <FaGraduationCap />
              </div>
            </div>
          ))}
        </div>
        <div className="text-center">
          <button className="inline-block px-6 py-3 bg-rose-600 hover:bg-rose-700 text-white rounded-full text-lg font-medium transition">
            🎁 Send a Gift Card Now
          </button>
          <p className="mt-4 text-sm text-gray-500 dark:text-gray-400">
            Instant delivery · No expiry · Usable on any purchase
          </p>
        </div>
      </div>
    </div>
  );
};

export default GiftCard;

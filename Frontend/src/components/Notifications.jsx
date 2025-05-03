import React from "react";
import { FaBookOpen, FaTags, FaClock } from "react-icons/fa";

const notifications = {
  offers: [
    {
      id: 1,
      icon: <FaTags />,
      title: "Flat 50% Off on Data Science Courses!",
      message: "Grab this limited-time deal on top-rated Data Science programs.",
      time: "2 hours ago",
    },
    {
      id: 2,
      icon: <FaTags />,
      title: "Summer Reading Sale!",
      message: "Up to 70% off on bestsellers and academic books.",
      time: "1 day ago",
    },
  ],
  arrivals: [
    {
      id: 3,
      icon: <FaBookOpen />,
      title: "New Book: 'AI Revolution 2025'",
      message: "Explore the future of Artificial Intelligence with this just-launched book.",
      time: "5 hours ago",
    },
    {
      id: 4,
      icon: <FaBookOpen />,
      title: "New Course: 'Mastering MERN Stack'",
      message: "Learn full-stack development with this comprehensive new course.",
      time: "1 day ago",
    },
  ],
};

const NotificationCard = ({ icon, title, message, time }) => (
  <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow flex items-start gap-4 hover:scale-[1.01] transition">
    <div className="text-blue-500 text-lg">{icon}</div>
    <div>
      <h3 className="font-semibold text-gray-800 dark:text-white">{title}</h3>
      <p className="text-sm text-gray-600 dark:text-gray-300">{message}</p>
      <div className="text-xs text-gray-400 dark:text-gray-500 mt-1 flex items-center gap-1">
        <FaClock className="inline-block" /> {time}
      </div>
    </div>
  </div>
);

export default function NotificationPage() {
  return (
    <div className="min-h-screen pt-20 px-4 md:px-20 bg-gray-100 dark:bg-gray-900 transition-colors">
      <h1 className="text-2xl font-bold text-blue-600 dark:text-blue-400 mb-6">📢 Notifications</h1>

      <section className="mb-10">
        <h2 className="text-lg font-semibold text-gray-700 dark:text-gray-200 mb-4">🎁 Offers</h2>
        <div className="space-y-4">
          {notifications.offers.map((note) => (
            <NotificationCard key={note.id} {...note} />
          ))}
        </div>
      </section>

      <section>
        <h2 className="text-lg font-semibold text-gray-700 dark:text-gray-200 mb-4">📚 New Arrivals</h2>
        <div className="space-y-4">
          {notifications.arrivals.map((note) => (
            <NotificationCard key={note.id} {...note} />
          ))}
        </div>
      </section>
    </div>
  );
}

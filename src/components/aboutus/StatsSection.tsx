// components/StatsSection.tsx
import { FaSmile, FaTrophy, FaThumbsUp, FaUserAlt } from "react-icons/fa";

const stats = [
  { icon: <FaSmile className="text-yellow-400" />, value: "1.6k+", label: "Happy Traveler" },
  { icon: <FaTrophy className="text-yellow-400" />, value: "1.2k+", label: "Tours Success" },
  { icon: <FaThumbsUp className="text-yellow-400" />, value: "98%", label: "Positive Review" },
  { icon: <FaUserAlt className="text-yellow-400" />, value: "20", label: "Travel Guide" },
];

export default function StatsSection() {
  return (
    <section className="bg-gray-100 text-gray-800 py-10">
      <div className="max-w-7xl mx-auto flex flex-wrap gap-6 justify-center">
        {stats.map(({ icon, value, label }, i) => (
          <div key={i} className="flex items-center bg-white shadow rounded-lg p-4 w-44">
            <div className="text-3xl mr-3">{icon}</div>
            <div>
              <div className="text-xl font-bold">{value}</div>
              <div className="text-sm">{label}</div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

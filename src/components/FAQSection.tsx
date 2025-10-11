"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";

const faqs = [
  {
    question: "Where will I be picked up?",
    answer:
      "Pickup is available from selected hotels and central locations in the city. During the booking process, you’ll be able to choose your preferred pickup point. Exact details, including the time and location, will be provided in your confirmation email. If you’re staying outside the designated pickup areas, alternative meeting points may be arranged.",
  },
  {
    question: "What time will I be back?",
    answer:
      "Return times vary depending on traffic and tour duration. Your guide will inform you of the estimated return time on the day of the tour.",
  },
  {
    question: "What is the lunch and drinks menu?",
    answer:
      "Lunch includes local dishes and soft drinks. Vegetarian and vegan options are available upon request.",
  },
  {
    question: "Is there an extra charge?",
    answer:
      "All main tour costs are included in your booking. Optional add-ons like souvenirs or personal expenses are not included.",
  },
  {
    question: "When should I book?",
    answer:
      "We recommend booking at least 24 hours in advance to guarantee availability.",
  },
  {
    question: "What should I bring?",
    answer:
      "Please bring comfortable shoes, sunscreen, your ID, and a bottle of water.",
  },
  {
    question: "What accessibility options do you offer?",
    answer:
      "Some tours are wheelchair-accessible. Please contact our support team before booking to confirm availability.",
  },
];

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className=" py-12 px-4">
      <h2 className="text-2xl font-semibold mb-6">Frequently Asked Questions</h2>

      <div className="space-y-3">
        {faqs.map((faq, index) => (
          <div
            key={index}
            className="bg-gray-100 rounded-lg overflow-hidden transition-all"
          >
            <button
              onClick={() => toggle(index)}
              className="flex justify-between items-center w-full text-left px-5 py-4 font-medium hover:bg-gray-200"
            >
              <span>{faq.question}</span>
              <ChevronDown
                className={`h-5 w-5 transition-transform ${
                  openIndex === index ? "rotate-180" : ""
                }`}
              />
            </button>

            <div
              className={`px-5 transition-all duration-300 ${
                openIndex === index ? "max-h-96 py-3" : "max-h-0 py-0"
              } overflow-hidden text-gray-700`}
            >
              {faq.answer}
            </div>
          </div>
        ))}
      </div>

      <p className="text-sm text-gray-600 mt-6 text-center">
        For more questions,{" "}
        <span className="text-rose-500 font-medium cursor-pointer hover:underline">
          contact
        </span>{" "}
        our support team
      </p>
    </section>
  );
}

'use client';

import { useState } from 'react';
import { ChevronDown } from 'lucide-react';

const faqs = [
 {
    question: "Where will I be picked up?",
    answer:
      "Pickup is available from selected hotels and central locations in the city. During the booking process, you’ll be able to choose your preferred pickup point. Exact details, including the time and location, will be provided in your confirmation email. If you’re staying outside the designated pickup areas, alternative meeting points may be arranged.",
  },
  {
    question: "What time will I be back?",
    answer:
      "The tour typically concludes around 4:30 PM, after which you will be transferred back to your hotel. Exact return times can vary slightly depending on traffic and drop-off locations.",
  },
  {
    question: "What is the lunch and drinks menu?",
    answer:
      "Lunch includes traditional Dominican cuisine at a local restaurant. This typically features rice, beans, a meat dish (chicken or pork), and a salad. Drinks usually include water and a soft drink. Alcoholic beverages are not included but can often be purchased separately.",
  },
  {
    question: "Is there an extra charge?",
    answer:
      "All entrance fees and lunch are included in the tour price. Personal expenses, souvenirs, and alcoholic beverages are not included and would be an extra charge if desired.",
  },
  {
    question: "When should I book?",
    answer:
      "We recommend booking at least 24 hours in advance to ensure availability, especially during peak season.",
  },
  {
    question: "What should I bring?",
    answer:
      "Besides the essentials, you may wish to bring some local currency (Dominican Pesos) for personal purchases or gratuities.",
  },
  {
    question: "What accessibility options do you offer?",
    answer:
      "Our tour is generally accessible, but specific needs should be communicated in advance. Some historical sites may have limited accessibility. Please contact our support team for detailed information on accessibility for your specific requirements.",
  }
];

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="mb-12 flex flex-col gap-4">
      <h3 className="text-[20px] font-medium text-[#191919] mb-4">Frequently Asked Questions</h3>

      <div className="flex flex-col gap-3">
        {faqs.map((faq, index) => (
          <div
            key={index}
            className="bg-[#EFF2F880] border border-gray-200 rounded-xl overflow-hidden"
          >
            {/* Question button */}
            <button
              onClick={() => toggleFAQ(index)}
              className="flex justify-between items-center w-full px-5 py-4 text-left text-[14px] font-normal text-[#191919]"
            >
              {faq.question}
              <ChevronDown
                className={`w-4 h-4 text-gray-500 transition-transform duration-300 ${
                  openIndex === index ? 'rotate-180' : ''
                }`}
              />
            </button>

            {/* Answer, visible only if open */}
            {openIndex === index && (
              <p className="px-5 pb-4 text-[13px] text-[#878D97]">{faq.answer}</p>
            )}
          </div>
        ))}
      </div>
      <p className="text-[13px] text-[#878D97] mt-4">
        For more questions,{' '}
        <span className="text-[#EE2552] font-semibold hover:underline cursor-pointer">
          contact
        </span>{' '}
        our support team.
      </p>
    </section>
  );
}

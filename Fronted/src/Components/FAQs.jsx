import { useState } from "react";

export default function FAQs() {
  const [openIndex, setOpenIndex] = useState(null);

  const faqs = [
    {
      question: "Is opting for substitutes safe?",
      answer:
        "Yes, substitutes are safe as long as they have the same active ingredient, strength, and dosage form. All substitutes we list are approved by regulatory authorities.",
    },
    {
      question: "How do I know if I am choosing the right substitute?",
      answer:
        "You should always check with your doctor or pharmacist before switching. Our platform highlights substitutes only when they match your prescribed medicine’s active ingredient.",
    },
    {
      question: "Is there a guarantee on the quality of substitutes?",
      answer:
        "Absolutely. All medicines, whether branded or substitutes, are sourced from licensed pharmacies and manufacturers who follow strict quality standards.",
    },
    {
      question: "How can I save on medicines?",
      answer:
        "You can save by opting for affordable substitutes, availing seasonal offers, or using discount coupons available on our platform.",
    },
    {
      question: "How are substitutes different from branded medicines?",
      answer:
        "Substitutes (also called generics) contain the same active ingredient as branded medicines but are often sold at lower prices. The difference is usually in the brand name, packaging, or inactive ingredients.",
    },
    {
      question: "How can I avail free delivery?",
      answer:
        "Free delivery is available for orders above a minimum value (e.g., ₹500). We also run special promotions where free delivery is offered on all orders.",
    },
  ];

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="bg-gradient-to-b from-white to-blue-50 py-12 px-4 sm:px-6 lg:px-8">
      <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">
        Frequently Asked Questions
      </h2>
      <div className="bg-white rounded-3xl p-6 max-w-3xl mx-auto shadow-lg">
        {faqs.map((faq, index) => (
          <div
            key={index}
            className={`border-b border-gray-200 last:border-none transition-all ${
              openIndex === index ? "bg-blue-50 rounded-xl" : ""
            }`}
          >
            <button
              className="flex justify-between items-center w-full py-4 px-2 text-left text-gray-800 font-medium focus:outline-none hover:bg-blue-50 rounded-xl transition"
              onClick={() => toggleFAQ(index)}
            >
              <span className="pr-4">{faq.question}</span>
              {/* Chevron Icon */}
              <svg
                className={`h-6 w-6 transform transition-transform duration-300 ${
                  openIndex === index
                    ? "rotate-180 text-blue-600"
                    : "text-gray-500"
                }`}
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </button>

            <div
              className={`overflow-hidden transition-all duration-300 ease-in-out ${
                openIndex === index ? "max-h-40 py-3 px-2" : "max-h-0"
              }`}
            >
              <p className="text-gray-600 leading-relaxed">{faq.answer}</p>
            </div>
          </div>
        ))}

        <div className="flex justify-center mt-8">
          <button className="border border-blue-600 text-blue-600 px-8 py-2 rounded-full font-medium hover:bg-blue-600 hover:text-white transition duration-300 shadow-sm">
            View More
          </button>
        </div>
      </div>
    </div>
  );
}

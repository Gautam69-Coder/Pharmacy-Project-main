import React, { useState } from 'react';
import { ChevronDown, ShoppingBag, Beaker, Truck, Star, Shield } from 'lucide-react';

const PharmEasyPlus = () => {
  const [activeAccordion, setActiveAccordion] = useState(null);
  const [spendingAmount, setSpendingAmount] = useState(3000);

  const toggleAccordion = (index) => {
    setActiveAccordion(activeAccordion === index ? null : index);
  };

  const calculateSavings = (amount) => {
    const medicineCredits = Math.floor(amount * 0.05);
    const labTestCredits = 500; // Fixed for quarterly lab test
    const shippingCharges = 300; // Fixed convenience fee savings
    return {
      medicineCredits,
      labTestCredits,
      shippingCharges,
      total: medicineCredits + labTestCredits + shippingCharges
    };
  };

  const savings = calculateSavings(spendingAmount);

  const faqData = [
    "What are the benefits of PharmEasy Plus?",
    "Do the Plus PharmEasy Credits apply to healthcare products as well?",
    "How long is my PharmEasy Plus membership valid for?",
    "When will I get the PharmEasy Credits?",
    "What is the validity of the PharmEasy Credits?",
    "Is there a cap on the maximum PharmEasy Credits amount that can be used on medicine orders?",
    "Is there a cap on the maximum PharmEasy Credits amount that can be used on lab tests?",
    "Can I get a faster delivery through PharmEasy Plus?",
    "Can I buy Plus Membership via Cash On Delivery (COD)?",
    "Can I use the PharmEasy Credits for lab tests in all cities?",
    "Are there any products where PharmEasy Credits are not eligible?",
    "Can PharmEasy revoke my membership at any time?",
    "Will I get a refund if PharmEasy revokes my membership?",
    "Can my membership expire sooner than its expiry date?"
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      

      {/* Hero Section */}
      <div className="relative bg-gradient-to-br from-purple-400 via-purple-500 to-purple-600 overflow-hidden min-h-[600px]">
        {/* Decorative circles */}
        <div className="absolute top-20 right-20 w-32 h-32 bg-white/10 rounded-full"></div>
        <div className="absolute bottom-40 left-10 w-20 h-20 bg-white/10 rounded-full"></div>
        <div className="absolute top-40 left-1/4 w-16 h-16 bg-white/5 rounded-full"></div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="grid lg:grid-cols-2 gap-12 items-center min-h-[500px]">
            <div className="text-white">
              <div className="flex items-center mb-6">
                <h1 className="text-5xl md:text-6xl font-bold">PharmEasy</h1>
                <div className="ml-3 flex items-center">
                  <div className="bg-yellow-400 rounded-lg p-1 mr-2">
                    <div className="w-4 h-4 bg-yellow-500 rounded"></div>
                  </div>
                  <span className="text-yellow-400 text-2xl font-bold">Plus</span>
                </div>
              </div>
              
              <p className="text-xl mb-8 font-medium">Reduce your medical expenses with Plus</p>
              
              <div className="bg-white/20 backdrop-blur-sm rounded-2xl p-6 mb-8 max-w-md">
                <p className="text-lg mb-2 opacity-90">Enjoy benefits worth</p>
                <div className="text-4xl font-bold">₹1500</div>
              </div>

              <div className="mb-8">
                <p className="text-xl mb-6 font-medium">Get exclusive access to</p>
              </div>
            </div>
            
            {/* Right side - Family image */}
            <div className="hidden lg:block relative">
              <div className="relative">
                {/* Family image placeholder */}
                <div className="w-full h-[400px] bg-white/10 backdrop-blur-sm rounded-2xl flex items-center justify-center">
                  <div className="text-center text-white">
                    <div className="bg-white/20 rounded-full p-8 mb-4 inline-block">
                      <div className="w-16 h-16 bg-white/30 rounded-full"></div>
                    </div>
                    <p className="text-sm opacity-75">Family Image Goes Here</p>
                  </div>
                </div>
                
                {/* "Start saving more!" bubble */}
                <div className="absolute -top-4 right-8 bg-white text-purple-600 px-4 py-2 rounded-full text-sm font-medium shadow-lg">
                  Start saving more! 😊
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Benefits cards section - overlapping the hero */}
        <div className="absolute -bottom-20 left-0 right-0">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="bg-white rounded-3xl shadow-xl p-8">
              <div className="grid md:grid-cols-3 gap-8">
                <div className="flex items-start space-x-4">
                  <div className="bg-green-100 rounded-xl p-3 flex-shrink-0">
                    <ShoppingBag className="h-8 w-8 text-green-600" />
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900 text-lg mb-2">5% Extra PharmEasy Credits</h3>
                    <p className="text-gray-600 text-sm">Applicable on medicines and healthcare products</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-4">
                  <div className="bg-blue-100 rounded-xl p-3 flex-shrink-0">
                    <Beaker className="h-8 w-8 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900 text-lg mb-2">50% Extra PharmEasy Credits</h3>
                    <p className="text-gray-600 text-sm">Applicable on 1st lab test</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-4">
                  <div className="bg-cyan-100 rounded-xl p-3 flex-shrink-0">
                    <Truck className="h-8 w-8 text-cyan-600" />
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900 text-lg mb-2">FREE Delivery</h3>
                    <p className="text-gray-600 text-sm">Enjoy free delivery on medicine and healthcare orders above ₹499</p>
                  </div>
                </div>
              </div>
              
              <div className="mt-8 pt-8 border-t border-gray-100">
                <h3 className="font-bold text-gray-900 text-lg mb-4">Additional Benefits</h3>
                <div className="flex items-center">
                  <div className="bg-purple-100 rounded-lg p-2 mr-3">
                    <Shield className="h-5 w-5 text-purple-600" />
                  </div>
                  <span className="text-gray-700 font-medium">Zero Convenience Fees</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* CTA Button Section */}
      <div className="pt-32 pb-16 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <button className="bg-purple-600 hover:bg-purple-700 text-white font-bold py-4 px-12 rounded-2xl text-lg transition-colors shadow-lg">
            Get PharmEasy PLUS
          </button>
        </div>
      </div>

      {/* Savings Calculator */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <h2 className="text-2xl font-bold text-center text-gray-900 mb-12">Calculate your savings for yourself</h2>
        
        <div className="bg-white rounded-2xl shadow-lg p-8 mb-12">
          <div className="grid lg:grid-cols-2 gap-12">
            <div className="text-center">
              <p className="text-gray-600 mb-6">As a Plus member you will save upto</p>
              <div className="text-4xl font-bold text-blue-600 mb-6">₹{savings.total}</div>
              <p className="text-gray-500 mb-8">if your spending on medicine is</p>
              
              <div className="mb-8">
                <input
                  type="range"
                  min="2000"
                  max="4000"
                  step="500"
                  value={spendingAmount}
                  onChange={(e) => setSpendingAmount(parseInt(e.target.value))}
                  className="w-full h-2 bg-blue-200 rounded-lg appearance-none cursor-pointer slider"
                />
                <div className="flex justify-between text-sm text-gray-500 mt-2">
                  <span>₹2000<br/>/month</span>
                  <span>₹3000<br/>/month</span>
                  <span>₹4000<br/>/month</span>
                </div>
              </div>
            </div>
            
            <div className="space-y-4">
              <h3 className="font-bold text-gray-900 mb-6">Break down</h3>
              
              <div className="bg-blue-50 rounded-lg p-4 flex justify-between items-center">
                <span className="text-gray-700">5% PharmEasy Credits on Medicines</span>
                <span className="font-bold text-blue-600">₹{savings.medicineCredits}</span>
              </div>
              
              <div className="bg-blue-50 rounded-lg p-4 flex justify-between items-center">
                <span className="text-gray-700">50% PharmEasy Credits on 1st Lab Test*</span>
                <span className="font-bold text-blue-600">₹{savings.labTestCredits}</span>
              </div>
              
              <div className="bg-blue-50 rounded-lg p-4 flex justify-between items-center">
                <span className="text-gray-700">Savings on Shipping & Convenience Charges</span>
                <span className="font-bold text-blue-600">₹{savings.shippingCharges}</span>
              </div>
              
              <div className="bg-blue-100 rounded-lg p-4 flex justify-between items-center font-bold">
                <span className="text-gray-900">Total 3 Months Savings</span>
                <span className="text-blue-600">₹{savings.total}</span>
              </div>
              
              <p className="text-xs text-gray-500 mt-4">*Assuming you get a lab test done every 3 months</p>
            </div>
          </div>
        </div>

        {/* Testimonial */}
        <div className="text-center mb-16">
          <p className="text-gray-600 mb-2">Still not sure?</p>
          <p className="text-lg font-medium text-gray-900 mb-8">Hear from some of our PLUS members</p>
          
          <div className="bg-gray-50 rounded-2xl p-8 max-w-2xl mx-auto">
            <div className="mb-4">
              <h4 className="font-bold text-gray-900">Paridhi Gupta</h4>
              <p className="text-blue-600 font-medium">Saved ₹1764 in 3 months</p>
            </div>
            
            <div className="relative">
              <p className="text-gray-700 italic">
                "I have been loyal to PharmEasy since its launch and had an incredible experience. The service levels are exceptional, with prompt delivery and enticing offers. The Plus membership has significantly impacted my monthly savings."
              </p>
              <div className="text-blue-500 text-4xl absolute -bottom-2 -right-2">"</div>
            </div>
          </div>
        </div>

        {/* FAQ Section */}
        <div className="mb-16">
          <h2 className="text-2xl font-bold text-center text-gray-900 mb-8">Frequently Asked Questions</h2>
          
          <div className="space-y-4">
            {faqData.map((question, index) => (
              <div key={index} className="border border-gray-200 rounded-lg">
                <button
                  onClick={() => toggleAccordion(index)}
                  className="w-full px-6 py-4 text-left flex justify-between items-center hover:bg-gray-50"
                >
                  <span className="font-medium text-gray-900">{question}</span>
                  <ChevronDown 
                    className={`h-5 w-5 text-gray-500 transform transition-transform ${
                      activeAccordion === index ? 'rotate-180' : ''
                    }`} 
                  />
                </button>
                {activeAccordion === index && (
                  <div className="px-6 py-4 border-t border-gray-200 bg-gray-50">
                    <p className="text-gray-600">
                      This is a placeholder answer for the FAQ. You can replace this with the actual answer content.
                    </p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Terms & Conditions */}
        <div className="text-center">
          <a href="#" className="text-gray-500 hover:text-blue-600 underline">Terms & Conditions</a>
        </div>
      </div>
    </div>
  );
};

export default PharmEasyPlus;
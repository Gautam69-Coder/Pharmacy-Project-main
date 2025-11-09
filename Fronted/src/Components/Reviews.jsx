import React from "react";

const Reviews = () => {
  return (
    <div className="mx-4 md:mx-14 my-8 px-4 md:px-8 rounded-2xl">
      <h1 className="text-center font-bold text-3xl mb-6 text-teal-700">
        Customer Reviews
      </h1>

      <div className="flex flex-wrap gap-6 justify-between">
        {/* Review 1 */}
        <div className="bg-[#dbfcf5] border border-teal-300 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-transform hover:scale-[1.02] flex-1 min-w-[300px]">
          <div className="flex justify-between items-center mb-4">
            <div className="flex flex-col">
              <h2 className="font-semibold text-xl text-gray-800">Gautam</h2>
              <p className="text-sm text-gray-500">29/05/2025</p>
              <div className="flex gap-1">
                {[...Array(4)].map((_, index) => (
                   "⭐"
                ))}
              </div>
            </div>
            <img
              src="https://i.pravatar.cc/100?img=4"
              alt="person"
              className="w-14 h-14 rounded-full border border-teal-400"
            />
          </div>

          <div className="text-gray-700 leading-relaxed">
            <div className="bg-white border border-gray-200 p-4 rounded-xl text-justify shadow-sm">
              Fast delivery and clear medicine labels — saved me a trip to the
              clinic. The checkout was simple and the support team answered my
              query quickly.
            </div>
          </div>
        </div>

        {/* Review 2 */}
        <div className="bg-[#dbfcf5] border border-teal-300 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-transform hover:scale-[1.02] flex-1 min-w-[300px]">
          <div className="flex justify-between items-center mb-4">
            <div className="flex flex-col">
              <h2 className="font-semibold text-xl text-gray-800">Anjali</h2>
              <p className="text-sm text-gray-500">02/06/2025</p>
              <div className="flex gap-1">
                {[...Array(5)].map((_, index) => (
                  "⭐"
                ))}
              </div>
            </div>
            <img
              src="https://i.pravatar.cc/100?img=3"
              alt="person"
              className="w-14 h-14 rounded-full border border-teal-400"
            />
          </div>

          <div className="text-gray-700 leading-relaxed">
            <div className="bg-white border border-gray-200 p-4 rounded-xl text-justify shadow-sm">
              Great variety of trusted brands and the website made refilling
              prescriptions effortless. Perfect for busy days!
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Reviews;

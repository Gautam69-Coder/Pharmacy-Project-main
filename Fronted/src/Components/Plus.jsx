import React from "react";
import { useNavigate } from "react-router-dom";

const PlusMemberBanner = () => {
const navigate=useNavigate();

  return (

    <div className="flex justify-center w-full my-4">
      <div className="flex items-center justify-between bg-gradient-to-r w-[93%] from-purple-400 to-purple-600 p-6 rounded-lg shadow-md">
        {/* Left Section */}
        <div className="flex flex-col space-y-2 max-w-xl">
          <div className="flex items-center text-white text-xl font-semibold">
            <span>Become a</span>
            <span className="flex items-center mx-2">
              <span className="bg-yellow-400 rounded-full p-1 mr-1">✚</span>
              <span className="text-yellow-300">Plus</span>
            </span>
            <span>member</span>
          </div>
          <span className="text-purple-100 text-sm">
            And enjoy extra bachat on every order
          </span>
          <hr className="border-t-2 border-yellow-300 w-36 mt-1 mb-2" />
          <span className="text-white text-sm">
            Save 5% on medicines, 50% on 1st lab test & get FREE delivery with PLUS membership&nbsp;
            <span className="underline cursor-pointer">Know more &gt;</span>
          </span>
          <button
          onClick={()=>{
            navigate('/PLUS')
          }}
           className="bg-yellow-400 hover:bg-yellow-500 text-purple-900 font-bold px-5 py-2 rounded w-40 mt-3 text-sm flex items-center justify-center">
            Explore Now &nbsp; <span>➔</span>
          </button>
        </div>
        {/* Right Section: Family Image */}
        <div className="flex-shrink-0">
          {/* Replace src with your family image path */}
          <img
            src="src/assets/Features_images/PlusFamily.png"
            alt="Family"
            className="w-64 h-[180px] object-cover   shadow-lg"
          />
        </div>
      </div>
    </div>
  );
};

export default PlusMemberBanner;

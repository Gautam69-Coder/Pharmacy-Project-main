import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Menubar = () => {
  const navigate = useNavigate();
  const [showCategories, setShowCategories] = useState(false);

  const menuItems = ['Home', 'Doctor Consult', 'PLUS', 'Blogs'];
  const Categories = [
    'Must Haves',
    'Skin Care',
    'Ayurvedic Care',
    'Sports Nutrition',
    'Diabetes Essentials',
    'Health Care Devices',
    'Health Care',
    'Viatmins',
    'Personal Care',
    'Health Food and Drinks'
  ];

  const toggleCategories = () => {
    setShowCategories(!showCategories);
  };

  return (
    <div className="relative w-full">
      <div
        className="flex justify-center items-center px-2 sm:px-6 py-2"
        style={{
          position: 'absolute',
          width: '100%',
          zIndex: 100,
        }}
      >
        {/* Menu wrapper */}
        <div className="flex flex-wrap gap-2 sm:gap-4 justify-center sm:justify-start text-sm font-medium text-black p-3 border border-[#e0e0e0] shadow rounded-xl items-center backdrop-blur-sm bg-white max-w-full overflow-x-auto sm:overflow-visible">
          
          {/* Medicines */}
          <span
            className="cursor-pointer px-3 py-1 border border-transparent rounded-lg transition-all duration-300 
              hover:bg-gradient-to-r hover:from-blue-50 hover:to-purple-50 hover:text-blue-700 
              hover:border-blue-200 hover:shadow-sm hover:-translate-y-0.5 hover:scale-105 active:scale-95"
            onClick={() => navigate(`/Medicines`)}
          >
            Medicines
          </span>

          {/* Categories with dropdown */}
          <div className="relative inline-block text-left">
            <div className="flex items-center">
              <div
                className="cursor-pointer px-3 py-1 border border-transparent rounded-lg transition-all duration-300 
                  hover:bg-gradient-to-r hover:from-blue-50 hover:to-purple-50 hover:text-blue-700 
                  hover:border-blue-200 hover:shadow-sm hover:-translate-y-0.5 hover:scale-105 active:scale-95 flex items-center gap-2"
                onClick={() => navigate('/Category')}
              >
                Categories
              </div>
              <img
                className="w-6 h-6 hover:bg-cyan-200 rounded-full p-1 cursor-pointer"
                onClick={toggleCategories}
                src="/src/assets/icons/down.svg"
                alt="Dropdown Arrow"
              />
            </div>

            {/* Category dropdown */}
            {showCategories && (
              <div className="absolute z-10 left-0 mt-2 w-[90vw] sm:w-[480px] max-h-[50vh] overflow-y-auto rounded-lg bg-white border border-gray-200 shadow-md transition-all duration-300">
                <div className="text-sm text-gray-700 py-2 px-2 grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {Categories.map((m, index) => (
                    <div
                      key={index}
                      className="px-2 py-1 hover:bg-blue-50 cursor-pointer"
                      onClick={() => navigate(`/Category/${m.replace(/ /g, '')}`)}
                    >
                      {m}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Other menu items */}
          {menuItems.map((item, index) => (
            <span
              key={index}
              className="cursor-pointer px-3 py-1 border border-transparent rounded-lg transition-all duration-300 
                hover:bg-gradient-to-r hover:from-blue-50 hover:to-purple-50 hover:text-blue-700 
                hover:border-blue-200 hover:shadow-sm hover:-translate-y-0.5 hover:scale-105 active:scale-95"
              onClick={() => navigate(`/${item.replace(/\s+/g, '')}`)}
            >
              {item}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Menubar;

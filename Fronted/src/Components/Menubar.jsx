import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Menubar = () => {
  const navigate = useNavigate();
  const [showCategories, setShowCategories] = useState(false);
  const [isOpen, setIsOpen] = useState(false); // Hamburger menu toggle

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

  const toggleCategories = () => setShowCategories(!showCategories);

  return (
    <div className="relative w-full">
      {/* Top bar container */}
      <div
        className="flex justify-center items-center px-2 sm:px-6 py-2"
        style={{
          position: 'absolute',
          width: '100%',
          zIndex: 100,
        }}
      >
        {/* Hamburger icon (mobile only) */}
        <button
          className="sm:hidden absolute left-4 top-2 z-50"
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Open menu"
        >
          <svg className="w-7 h-7 text-black" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            {isOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>
        
        {/* Main horizontal menu, hidden on mobile */}
        <div className="hidden sm:flex flex-wrap gap-2 sm:gap-4 justify-center sm:justify-start text-sm font-medium text-black p-3 border border-[#e0e0e0] shadow rounded-xl items-center backdrop-blur-sm bg-white max-w-full overflow-x-auto sm:overflow-visible"
          style={{ WebkitOverflowScrolling: 'touch' }}
        >   
          {/* Medicines */}
          <span
            className="cursor-pointer px-3 py-1 border border-transparent rounded-lg transition-all duration-300 
            hover:bg-gradient-to-r hover:from-blue-50 hover:to-purple-50 hover:text-blue-700 
            hover:border-blue-200 hover:shadow-sm hover:-translate-y-0.5 hover:scale-105 active:scale-95"
            tabIndex={0}
            onClick={() => navigate(`/Medicines`)}
            aria-label="Go to Medicines"
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
                tabIndex={0}
                aria-label="Open Categories Dropdown"
                onClick={() => navigate('/Category')}
              >
                Categories
              </div>
              <img
                className="w-6 h-6 hover:bg-cyan-200 rounded-full p-1 cursor-pointer"
                onClick={toggleCategories}
                src="/src/assets/icons/down.svg"
                alt="Dropdown Arrow"
                tabIndex={0}
              />
            </div>
            {/* Category dropdown */}
            {showCategories && (
              <div className="absolute z-10 left-0 mt-2 w-[95vw] sm:w-[480px] max-h-[50vh] overflow-y-auto rounded-lg bg-white border border-gray-200 shadow-md transition-all duration-300">
                <div className="text-sm text-gray-700 py-2 px-2 grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {Categories.map((m, index) => (
                    <div
                      key={index}
                      className="px-2 py-1 hover:bg-blue-50 cursor-pointer rounded-md"
                      onClick={() => navigate(`/Category/${m.replace(/ /g, '')}`)}
                      tabIndex={0}
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
              tabIndex={0}
              onClick={() => navigate(`/${item.replace(/\s+/g, '')}`)}
              aria-label={`Go to ${item}`}
            >
              {item}
            </span>
          ))}
        </div>
      </div>

      {/* Mobile vertical drawer/menu */}
      {isOpen && (
        <div className="sm:hidden top-0 left-0 w-full h-full bg-white z-[999] overflow-y-auto flex flex-col p-4 border-r shadow-xl animate-slideIn">
          <button
            className="self-end mb-4"
            onClick={() => setIsOpen(false)}
            aria-label="Close menu"
          >
            {/* X Icon */}
            <svg className="w-7 h-7 text-black" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>

          <span
            className="cursor-pointer px-3 py-2 border-b border-gray-200"
            onClick={() => { navigate('/Medicines'); setIsOpen(false); }}
          >
            Medicines
          </span>
          <div className="relative">
            <div
              className="cursor-pointer px-3 py-2 border-b border-gray-200 flex items-center gap-2"
              onClick={() => setShowCategories(!showCategories)}
            >
              Categories
              <img
                className="w-5 h-5"
                src="/src/assets/icons/down.svg"
                alt="Dropdown Arrow"
              />
            </div>
            {showCategories && (
              <div className="pl-4 flex flex-col gap-1 my-2">
                {Categories.map((m, idx) => (
                  <span
                    key={idx}
                    className="cursor-pointer px-2 py-1 rounded hover:bg-blue-50"
                    onClick={() => { navigate(`/Category/${m.replace(/ /g, '')}`); setIsOpen(false); }}
                  >
                    {m}
                  </span>
                ))}
              </div>
            )}
          </div>
          {menuItems.map((item, index) => (
            <span
              key={index}
              className="cursor-pointer px-3 py-2 border-b border-gray-200"
              onClick={() => { navigate(`/${item.replace(/\s+/g, '')}`); setIsOpen(false); }}
            >
              {item}
            </span>
          ))}
        </div>
      )}
    </div>
  );
};

export default Menubar;

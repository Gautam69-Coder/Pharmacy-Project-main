import React from 'react';
import { Carousel } from 'antd';
import { useNavigate } from 'react-router-dom';
import Navbar from '/src/Components/Navbar'
import OneImage from '/src/assets/SilderBar_Images/1stimage.jpg'; // adjust path as needed
import FourthImage from '/src/assets/SilderBar_Images/4thimage.jpg'; // adjust path as needed
import FivthImage from '/src/assets/SilderBar_Images/5th.jpg'; // adjust path as needed
import SixthImage from '/src/assets/SilderBar_Images/6th.png'; // adjust path as needed



const slideImageStyle1 = {
  width: '60vw',
  height: '360px',
  borderRadius: '20px',
  boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
  backgroundImage: `url(${FivthImage})`,
  backgroundSize: 'cover',
  backgroundPosition: 'center',
  backgroundRepeat: 'no-repeat',
  margin: '0 auto',
};

const slideImageStyle2 = {
  width: '60vw',
  height: '360px',
  borderRadius: '20px',
  boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
  backgroundImage: `url(${FourthImage})`,
  backgroundSize: 'cover',
  backgroundPosition: 'center',
  backgroundRepeat: 'no-repeat',
  margin: '0 auto',
};

const slideImageStyle3 = {
  width: '60vw',
  height: '360px',
  borderRadius: '20px',
  boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
  backgroundImage: `url(${OneImage})`,
  backgroundSize: 'cover',
  backgroundPosition: 'center',
  backgroundRepeat: 'no-repeat',
  margin: '0 auto',
};

const slideImageStyle4 = {
  width: '60vw',
  height: '360px',
  borderRadius: '20px',
  boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
  backgroundImage: `url(${SixthImage})`,
  backgroundSize: 'cover',
  backgroundPosition: 'center',
  backgroundRepeat: 'no-repeat',
  margin: '0 auto',
};

const categories = [
  {
    label: "Must Haves",
    image: "https://cdn01.pharmeasy.in/dam/discovery/categoryImages/f10917087a483040b557e4b18204312c.png?f=png?dim=128x128&q=75", // Replace with your image paths
    offer: "Upto 45% off",
  },
  {
    label: "Diabetes Essentials",
    image: "https://cdn01.pharmeasy.in/dam/discovery/categoryImages/a06a357fd54e3e298a40214387082957.png?f=png?dim=128x128&q=75",
    offer: "Upto 65% off",
  },
  {
    label: "Viatmins",
    image: "https://cdn01.pharmeasy.in/dam/discovery/categoryImages/b37a29c09398322ab7a144297669fc10.jpg?f=jpg?dim=128x128&q=75",
    offer: "Upto 80% off",
  },
  {
    label: "Health Care Devices",
    image: "https://cdn01.pharmeasy.in/dam/discovery/categoryImages/9cc9a28ea4513009966cae794114eefd.png?f=png?dim=128x128&q=75",
    offer: "Upto 25% off",
  },
  {
    label: "Health Care",
    image: "https://cdn01.pharmeasy.in/dam/discovery/categoryImages/5a4fa9318fbb3b7daa2cfa6d293bea87.png?f=png?dim=128x128&q=75",
    offer: "Upto 67% off",
  },
  {
    label: "Ayurvedic Care",
    image: "https://cdn01.pharmeasy.in/dam/discovery/categoryImages/6517ad5aaeca38e69936298d3e677a3a.png?f=png?dim=128x128&q=75",
    offer: "Upto 70% off",
  },
  {
    label: "Sports Nutrition",
    image: "https://cdn01.pharmeasy.in/dam/discovery/categoryImages/c8ecf5cf2ca834288603b299f57d1688.png?f=png?dim=128x128&q=75",
    offer: "Upto 46% off",
  },
  {
    label: "Skin Care",
    image: "https://cdn01.pharmeasy.in/dam/discovery/categoryImages/9e6c4266111e37f18570504c1d852e0a.png?f=png?dim=128x128&q=75",
    offer: "Upto 50% off",
  },

  {
    label: "Health Food and Drinks",
    image: "https://cdn01.pharmeasy.in/dam/discovery/categoryImages/015cb472a6c830d3a08da0c37363196a.png?f=png?dim=128x128&q=75 ",
    offer: "Upto 57% off",
  },

  {
    label: "Personal Care",
    image: "https://cdn01.pharmeasy.in/dam/discovery/categoryImages/d3363660c0c8340487b25a9fc98732b6.png?f=png?dim=128x128&q=75",
    offer: "Upto 80% off",
  },
];


function CategoryCard({ title }) {
  return (
    <div className="max-w-sm rounded-lg overflow-hidden shadow-lg bg-white p-6 m-4 hover:shadow-2xl transition-shadow duration-300 flex items-center justify-center">
      <h3 className="text-xl font-bold text-gray-800">{title}</h3>
    </div>
  );
}


const App = () => {

  const navigate = useNavigate()

  return (
  <div>
  <div className="w-full max-w-full overflow-hidden">
    <Navbar />
    
    {/* Carousel - Responsive */}
    <div className="px-3 sm:px-6 md:px-8 lg:px-12 xl:px-16 py-4 sm:py-6 md:py-8 mt-16 sm:mt-20 md:mt-24">
      <Carousel 
        autoplay 
        autoplaySpeed={3000}
        className="rounded-lg sm:rounded-xl md:rounded-2xl overflow-hidden"
      >
        <div>
          <div 
            style={{
              ...slideImageStyle1,
              height: '200px',
              '@media (min-width: 640px)': { height: '300px' },
              '@media (min-width: 768px)': { height: '400px' },
              '@media (min-width: 1024px)': { height: '500px' }
            }}
            className="h-48 sm:h-64 md:h-80 lg:h-96"
          ></div>
        </div>
        <div>
          <div style={slideImageStyle2} className="h-48 sm:h-64 md:h-80 lg:h-96"></div>
        </div>
        <div>
          <div style={slideImageStyle3} className="h-48 sm:h-64 md:h-80 lg:h-96"></div>
        </div>
        <div>
          <div style={slideImageStyle4} className="h-48 sm:h-64 md:h-80 lg:h-96"></div>
        </div>
      </Carousel>
    </div>
  </div>

  {/* Category Section - Responsive */}
  <div className="w-full px-3 sm:px-6 md:px-8">
    {/* Category Title */}
    <div className="flex justify-center mb-6 sm:mb-8 md:mb-10">
      <h1 className="text-center text-xl sm:text-2xl md:text-3xl lg:text-4xl px-4 sm:px-6 md:px-8 py-2 sm:py-3 md:py-4 rounded-xl sm:rounded-2xl border-2 sm:border-[3px] border-teal-600 font-bold text-teal-700 shadow-sm hover:shadow-md transition-shadow">
        Categories
      </h1>
    </div>

    {/* Category Grid - Fully Responsive */}
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 md:gap-6 max-w-6xl mx-auto mb-12 sm:mb-16 md:mb-20 lg:mb-24">
      {categories.map((cat, idx) => (
        <div
          key={cat.label}
          className="flex items-center justify-between border-[1.5px] sm:border-2 border-[#dfe3e6] rounded-lg sm:rounded-xl md:rounded-2xl p-3 sm:p-4 md:p-5 transition-all duration-300 bg-white min-h-[70px] sm:min-h-[80px] md:min-h-[90px] hover:shadow-lg hover:scale-[1.02] cursor-pointer"
          onClick={() => {
            navigate(`${cat.label.replace(/ /g, '')}`);
          }}
        >
          <div className="flex items-center flex-1">
            <img
              src={cat.image}
              alt={cat.label}
              className="w-8 h-10 sm:w-10 sm:h-12 md:w-12 md:h-14 object-contain mr-3 sm:mr-4 flex-shrink-0"
            />
            <span className="font-medium text-sm sm:text-base md:text-lg text-gray-800">
              {cat.label}
            </span>
          </div>
          {cat.offer && (
            <span className="text-green-600 text-xs sm:text-sm md:text-base font-semibold ml-2 whitespace-nowrap">
              {cat.offer}
            </span>
          )}
        </div>
      ))}
    </div>
  </div>
</div>

  );
};

export default App;

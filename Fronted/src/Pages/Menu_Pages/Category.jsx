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

  return (<div>
    <div style={{ maxWidth: '100vw', boxSizing: 'border-box' }}>
      <Navbar />
      <div className="m-[6%]">
        <Carousel autoplay autoplaySpeed={3000}>
          <div>
            <div style={slideImageStyle1}></div>
          </div>
          <div>
            <div style={slideImageStyle2}></div>
          </div>
          <div>
            <div style={slideImageStyle3}></div>
          </div>
          <div>
            <div style={slideImageStyle4}></div>
          </div>
        </Carousel>
      </div>
    </div>

    {/* Category */}
    <div className='flex justify-center '>
      <h1 className='text-center text-3xl p-4 rounded-2xl mb-4 border w-[200px] font-bold text-teal-700'>Category</h1>
    </div>
    <div className="grid grid-cols-3 gap-4 p-4  max-w-5xl mx-auto mb-20 ">
      {categories.map((cat, idx) => (
        <div
          key={cat.label}
          className={`flex items-center justify-between border-[1.5px] border-[#dfe3e6] rounded-xl p-4 transition-normal  border-gray-200"
            } bg-white min-h-[80px] hover:shadow-[0px_0px_8px_0px_rgba(0,0,0,0.5)]`}

        >
          <div className="flex items-center"
            onClick={() => {
              navigate(`${cat.label.replace(/ /g,'')}`)
            }}>
            <img
              src={cat.image}
              alt={cat.label}
              className="w-10 h-12 object-contain mr-4"
            />
            <span className="font-medium">{cat.label}</span>
          </div>
          {cat.offer && (
            <span className="text-green-600 text-sm font-semibold ml-2 w-[70px]">
              {cat.offer}
            </span>
          )}
        </div>
      ))}
    </div>
  </div>);
};

export default App;

import React, { useState, useEffect } from 'react';
import Logo2 from '../assets/logo/logo2.png';
import Trending from '../Components/Trending.jsx';
import Prescription from '../Components/Prescrition.jsx';
import New_Lunches from '../Components/New_Lunches.jsx';
import './css/home.css';
import PlusMemberBanner from '../Components/Plus.jsx';
import Health_Articles from '../Components/Health_Articles.jsx';
import searchIcon from '../assets/icons/search.svg';
import personIcon from '../assets/icons/person.png';
import offerIcon from '../assets/icons/offer.png';
import cartIcon from '../assets/icons/cart.png';
import New_Launches from '../Components/New_Lunches.jsx';
import Reviews from '../Components/Reviews.jsx';
import Navbar from '../Components/Navbar.jsx';
import FAQs from '../Components/FAQs.jsx';
import Logo from "../assets/logo/logo.png"
import Twitter from "../assets/logo/twitter.svg"
import Insta from "../assets/logo/insta.svg"
import Facebook from "../assets/logo/facebook.svg"
import Youtube from "../assets/logo/youtube.svg"
import Vitamin from "../assets/vitamin.jpeg"
import Fitness from "../assets/fitness.jpeg"
import Skincare from "../assets/skincare.jpeg"
import Landing from "../assets/landing.png"
import { useNavigate } from 'react-router-dom';

const ImageCarousel = () => {
  const [current, setCurrent] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [imageError, setImageError] = useState({});
  const [isPaused, setIsPaused] = useState(false);

  // Define your images array
  const images = [
    {
      src: 'src/assets/SilderBar_Images/1stimage.jpg',
      alt: 'Medicine delivery at your doorstep',
      title: 'Fast Medicine Delivery'
    },
    {
      src: 'src/assets/SilderBar_Images/2ndimage.jpg',
      alt: 'Health and wellness products',
      title: 'Health & Wellness'
    },
    {
      src: 'src/assets/SilderBar_Images/1stimage.jpg',
      alt: 'Online pharmacy services',
      title: 'Online Pharmacy'
    }
  ];

  const prevSlide = () => {
    setCurrent((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const nextSlide = () => {
    setCurrent((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  const goToSlide = (index) => {
    setCurrent(index);
  };

  const handleImageLoad = () => {
    setIsLoading(false);
  };

  const handleImageError = (index) => {
    setImageError(prev => ({ ...prev, [index]: true }));
  };

  
  useEffect(() => {
    if (isPaused) return;
    const timer = setInterval(() => {
      nextSlide();
    }, 3000);
    return () => clearInterval(timer);
  }, [isPaused, current]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'ArrowLeft') prevSlide();
      if (e.key === 'ArrowRight') nextSlide();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <div
      className="relative w-full max-w-6xl mx-auto overflow-hidden rounded-2xl shadow-2xl p-0 m-0 cursor-pointer"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-200 z-10 p-0 m-0">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
        </div>
      )}
      <div
        className="flex transition-transform duration-700 ease-in-out p-0 m-0"
        style={{
          transform: `translateX(-${current * 100}%)`,
          willChange: 'transform'
        }}
      >
        {images.map((img, index) => (
          <div key={index} className="w-full flex-shrink-0 relative p-0 m-0">
            {imageError[index] ? (
              <div className="w-full h-96 bg-gray-200 flex items-center justify-center p-0 m-0">
                <span className="text-gray-500">Image failed to load</span>
              </div>
            ) : (
              <img
                src={img.src}
                alt={img.alt}
                className="w-full object-cover h-96 p-0 m-0"
                onLoad={handleImageLoad}
                onError={() => handleImageError(index)}
              />
            )}
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent text-white px-6 py-4 m-0">
              <h3 className="text-2xl font-bold p-0 m-0">{img.title}</h3>
            </div>
          </div>
        ))}
      </div>

      <button
        onClick={prevSlide}
        className="absolute top-1/2 left-6 transform -translate-y-1/2 bg-white/90 backdrop-blur-sm text-gray-800 p-4 m-0 rounded-full font-medium shadow-lg hover:bg-white hover:shadow-xl transition-all duration-300 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 cursor-pointer"
        aria-label="Previous slide"
      >
        <span className="flex items-center space-x-2 p-0 m-0">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </span>
      </button>

      <button
        onClick={nextSlide}
        className="absolute top-1/2 right-6 transform -translate-y-1/2 bg-white/90 backdrop-blur-sm text-gray-800 p-4 m-0 rounded-full font-medium shadow-lg hover:bg-white hover:shadow-xl transition-all duration-300 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 cursor-pointer"
        aria-label="Next slide"
      >
        <span className="flex items-center space-x-2 p-0 m-0">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </span>
      </button>

      <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex space-x-3 p-0 m-0 gap-2">
        {images.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`w-4 h-4 rounded-full transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-blue-400 cursor-pointer ${index === current ? 'bg-white scale-110 shadow-lg' : 'bg-white/50 hover:bg-white/75'
              }`}
            aria-label={`Go to slide ${index + 1}`}
            style={{ padding: 0, margin: 0 }}
          />
        ))}
      </div>
    </div>
  );
};

const Home = () => {
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate()

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    // Handle search functionality here
    console.log('Search query:', searchQuery);
  };

  const navItems = [
    { icon: personIcon, label: "Login", onClick: () => console.log('Login clicked') },
    { icon: offerIcon, label: "Offers", onClick: () => console.log('Offers clicked') },
    { icon: cartIcon, label: "Cart", onClick: () => console.log('Cart clicked') }
  ];

  const menuItems = [
    "All Medicines",
    "Doctor Consult",
    "Home",
    "Store Locator",
    "PLUS",
    "Blogs"
  ];

  const products = [
    {
      name: "Diataal Nutripop Multivitamin Hair & Skin",
      image: "src/assets/logo/insta.svg",
      mrp: 240,
      price: 120,
      discount: "50% OFF"
    },
    {
      name: "Happi Kidz Gummies",
      image: "src/assets/logo/insta.svg",
      mrp: 400,
      price: 320,
      discount: "20% OFF"
    },
    // Add more products as needed
  ];

  return (
    <div className="w-full  p-0 m-0 mt-[6%] ">
      {/* Carousel Section */}
      <div className="px-6 py-6 animate-fade-in-up animation-delay-200 p-0 m-0 ">
        <ImageCarousel />
      </div>
      <hr className='p-0 m-0 bg-gray-200 border-none' />

      {/* Features */}
      <div className='flex gap-16 justify-center p-0 m-0 flex-wrap'>
        <div className="flex justify-center mt-4 p-0 m-0 cursor-pointer"
          onClick={() => {
            navigate('/Medicines')
          }}>
          <div className="w-[150px] rounded-2xl shadow-lg bg-white hover:shadow-xl transition-shadow duration-300 flex flex-col items-center p-2 m-0 hover:scale-105 transform transition-transform">
            <img src="src/assets/Features_images/medicine.webp" className="w-24 h-24 object-contain p-0 m-0" alt="Medicine" />
            <div className="w-full flex justify-center my-1 p-0 m-0">
              <div className="w-[60%] h-0.5 bg-gray-200 p-0 m-0"></div>
            </div>
            <div className="text-center p-0 m-0">
              <div className="font-semibold text-base p-0 m-0">Medicine</div>
              <div className="text-xs font-bold text-green-500 p-0 m-0">SAVE 25%</div>
            </div>
          </div>
        </div>

        <div className="flex justify-center mt-4 p-0 m-0 cursor-pointer"
          onClick={() => {
            navigate('/DoctorConsult')
          }}>
          <div className="w-[150px] rounded-2xl shadow-lg bg-white hover:shadow-xl transition-shadow duration-300 flex flex-col items-center p-2 m-0 hover:scale-105 transform transition-transform">
            <img src="src/assets/Features_images/doctor.webp" className="w-24 h-24 object-contain p-0 m-0" alt="Doctor" />
            <div className="w-full flex justify-center my-1 p-0 m-0">
              <div className="w-[60%] h-0.5 bg-gray-200 p-0 m-0"></div>
            </div>
            <div className="text-center p-0 m-0">
              <div className="font-semibold text-base p-0 m-0">Doctor Consult</div>
              <div className="text-xs font-bold text-green-500 p-0 m-0">SAVE 25%</div>
            </div>
          </div>
        </div>

        <div className="flex justify-center mt-4 p-0 m-0 cursor-pointer"
          onClick={() => {
            navigate('/Blogs')
          }}>
          <div className="w-[150px] rounded-2xl shadow-lg bg-white hover:shadow-xl transition-shadow duration-300 flex flex-col items-center p-2 m-0 hover:scale-105 transform transition-transform">
            <img src="src/assets/Features_images/health_blogs.webp" className="w-24 h-24 object-contain p-0 m-0" alt="Health Blog" />
            <div className="w-full flex justify-center my-1 p-0 m-0">
              <div className="w-[60%] h-0.5 bg-gray-200 p-0 m-0"></div>
            </div>
            <div className="text-center p-0 m-0">
              <div className="font-semibold text-base p-0 m-0">Health Blog</div>
              <div className="text-xs font-bold text-green-500 p-0 m-0">SAVE 25%</div>
            </div>
          </div>
        </div>

        <div className="flex justify-center mt-4 p-0 m-0 cursor-pointer"
          onClick={() => {
            navigate('/Category/HealthCare')
          }}>
          <div className="w-[150px] rounded-2xl shadow-lg bg-white hover:shadow-xl  duration-300 flex flex-col items-center p-2 m-0 hover:scale-105 transform transition-transform">
            <img src="src/assets/Features_images/healthcare.webp" className="w-24 h-24 object-contain p-0 m-0" alt="Healthcare" />
            <div className="w-full flex justify-center my-1 p-0 m-0">
              <div className="w-[60%] h-0.5 bg-gray-200 p-0 m-0"></div>
            </div>
            <div className="text-center p-0 m-0">
              <div className="font-semibold text-base p-0 m-0">Healthcare</div>
              <div className="text-xs font-bold text-green-500 p-0 m-0">SAVE 25%</div>
            </div>
          </div>
        </div>

        <div className="flex justify-center mt-4 p-0 m-0 cursor-pointer"
          onClick={() => {
            navigate('/PLUS')
          }}>
          <div className="w-[150px] rounded-2xl shadow-lg bg-white hover:shadow-xl  duration-300 flex flex-col items-center p-2 m-0 hover:scale-105 transform transition-transform">
            <img src="src/assets/Features_images/plus.webp" className="w-24 h-24 object-contain p-0 m-0" alt="Plus" />
            <div className="w-full flex justify-center my-1 p-0 m-0">
              <div className="w-[60%] h-0.5 bg-gray-200 p-0 m-0"></div>
            </div>
            <div className="text-center p-0 m-0">
              <div className="font-semibold text-base p-0 m-0">Plus</div>
              <div className="text-xs font-bold text-green-500 p-0 m-0">SAVE 25%</div>
            </div>
          </div>
        </div>
      </div>

      {/* Card Items Sections: Horizontal Scroll Slider */}
      {/* Trending */}
      <div className="mt-2  mx-auto relative w-full p-2 m-0">
        <Trending products={products} />
      </div>

      {/* New Launches */}
      <div className="mt-2  mx-auto relative p-2 m-0">
        <New_Launches />
      </div>

      

      {/* Health_Care_Tips */}
      <div className='flex   p-0 m-0'>
        <Health_Articles />
      </div>

      {/* Reviews */}
      <div>
        <Reviews />
      </div>

      {/* {FAQs} */}
      <div>
        <FAQs />
      </div>

      {/* Footer */}
      <footer className="bg-slate-800 py-16 px-6 text-white">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-5 gap-10">
          <div className="space-y-4">
            <h1 className="text-xl font-bold mb-6 text-indigo-300">Company</h1>
            <ul className="space-y-3">
              <li className="hover:text-indigo-300 cursor-pointer transition-colors">About Us</li>
              <li className="hover:text-indigo-300 cursor-pointer transition-colors">Careers</li>
              <li className="hover:text-indigo-300 cursor-pointer transition-colors">Blog</li>
              <li className="hover:text-indigo-300 cursor-pointer transition-colors">Partner with Us</li>
            </ul>
          </div>

          <div className="space-y-4">
            <h1 className="text-xl font-bold mb-6 text-indigo-300">Featured Categories</h1>
            <ul className="space-y-3">
              <li className="hover:text-indigo-300 cursor-pointer transition-colors">Must Haves</li>
              <li className="hover:text-indigo-300 cursor-pointer transition-colors">Diabetes Essentials</li>
              <li className="hover:text-indigo-300 cursor-pointer transition-colors">Vitamins & Supplements</li>
              <li className="hover:text-indigo-300 cursor-pointer transition-colors">Heart Care</li>
              <li className="hover:text-indigo-300 cursor-pointer transition-colors">Ayurvedic Care</li>
              <li className="hover:text-indigo-300 cursor-pointer transition-colors">Sports Nutrition</li>
              <li className="hover:text-indigo-300 cursor-pointer transition-colors">Skin Care</li>
            </ul>
          </div>

          <div className="space-y-4">
            <h1 className="text-xl font-bold mb-6 text-indigo-300">Need Help</h1>
            <ul className="space-y-3">
              <li className="hover:text-indigo-300 cursor-pointer transition-colors">Browse All Medicines</li>
              <li className="hover:text-indigo-300 cursor-pointer transition-colors">Browse All Molecules</li>
              <li className="hover:text-indigo-300 cursor-pointer transition-colors">Browse All Cities</li>
              <li className="hover:text-indigo-300 cursor-pointer transition-colors">FAQs</li>
            </ul>
          </div>

          <div className="space-y-4">
            <h1 className="text-xl font-bold mb-6 text-indigo-300">Policy Info</h1>
            <ul className="space-y-3">
              <li className="hover:text-indigo-300 cursor-pointer transition-colors">Privacy Policy</li>
              <li className="hover:text-indigo-300 cursor-pointer transition-colors">Terms and Conditions</li>
              <li className="hover:text-indigo-300 cursor-pointer transition-colors">Return Policy</li>
              <li className="hover:text-indigo-300 cursor-pointer transition-colors">Customer Support</li>
            </ul>
          </div>

          <div className="space-y-4">
            <h1 className="text-xl font-bold mb-6 text-indigo-300 text-center md:text-left">Follow Us</h1>
            <div className="flex justify-center md:justify-start gap-6">
              <img src={Insta} alt="Instagram" className="w-10 h-10 hover:scale-110 transition-transform cursor-pointer" />
              <img src={Twitter} alt="Twitter" className="w-10 h-10 hover:scale-110 transition-transform cursor-pointer" />
              <img src={Facebook} alt="Facebook" className="w-10 h-10 hover:scale-110 transition-transform cursor-pointer" />
              <img src={Youtube} alt="Youtube" className="w-10 h-10 hover:scale-110 transition-transform cursor-pointer" />
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto mt-12 pt-8 border-t border-slate-700 text-center">
          <p className="text-slate-400">© 2025 TonicHub Pharmacy. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default Home;

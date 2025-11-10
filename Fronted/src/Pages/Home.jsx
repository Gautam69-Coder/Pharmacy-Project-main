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
      className="relative w-full max-w-6xl mx-auto overflow-hidden rounded-lg sm:rounded-2xl shadow-xl sm:shadow-2xl"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-200 z-10">
          <div className="animate-spin rounded-full h-8 w-8 sm:h-12 sm:w-12 border-b-2 border-blue-500"></div>
        </div>
      )}
      <div
        className="flex transition-transform duration-700 ease-in-out"
        style={{
          transform: `translateX(-${current * 100}%)`,
          willChange: 'transform'
        }}
      >
        {images.map((img, index) => (
          <div key={index} className="w-full flex-shrink-0 relative">
            {imageError[index] ? (
              <div className="w-full h-48 sm:h-64 md:h-80 lg:h-96 bg-gray-200 flex items-center justify-center">
                <span className="text-gray-500 text-sm sm:text-base">Image failed to load</span>
              </div>
            ) : (
              <img
                src={img.src}
                alt={img.alt}
                className="w-full object-cover h-48 sm:h-64 md:h-80 lg:h-96"
                onLoad={handleImageLoad}
                onError={() => handleImageError(index)}
              />
            )}
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent text-white px-3 py-2 sm:px-6 sm:py-4">
              <h3 className="text-base sm:text-xl md:text-2xl font-bold">{img.title}</h3>
            </div>
          </div>
        ))}
      </div>

      {/* Navigation Buttons - Hidden on mobile, visible on tablet+ */}
      <button
        onClick={prevSlide}
        className="hidden sm:block absolute top-1/2 left-2 sm:left-4 md:left-6 transform -translate-y-1/2 bg-white/90 backdrop-blur-sm text-gray-800 p-2 sm:p-3 md:p-4 rounded-full shadow-lg hover:bg-white hover:shadow-xl transition-all duration-300 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-500"
        aria-label="Previous slide"
      >
        <svg className="w-3 h-3 sm:w-4 sm:h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
      </button>

      <button
        onClick={nextSlide}
        className="hidden sm:block absolute top-1/2 right-2 sm:right-4 md:right-6 transform -translate-y-1/2 bg-white/90 backdrop-blur-sm text-gray-800 p-2 sm:p-3 md:p-4 rounded-full shadow-lg hover:bg-white hover:shadow-xl transition-all duration-300 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-500"
        aria-label="Next slide"
      >
        <svg className="w-3 h-3 sm:w-4 sm:h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </button>

      {/* Dot Indicators */}
      <div className="absolute bottom-3 sm:bottom-6 left-1/2 transform -translate-x-1/2 flex space-x-2 sm:space-x-3">
        {images.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`w-2 h-2 sm:w-3 sm:h-3 md:w-4 md:h-4 rounded-full transition-all duration-300 focus:outline-none ${
              index === current ? 'bg-white scale-110 shadow-lg' : 'bg-white/50 hover:bg-white/75'
            }`}
            aria-label={`Go to slide ${index + 1}`}
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
  ];

  return (
    <div className="w-full min-h-screen bg-gray-50 mt-12 sm:mt-16 md:mt-20 lg:mt-24">
      {/* Carousel Section */}
      <div className="px-3 sm:px-6 md:px-8 py-4 sm:py-6 animate-fade-in-up">
        <ImageCarousel />
      </div>
      
      <hr className='bg-gray-200 border-none h-px my-4' />

      {/* Features Grid - Responsive */}
      <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 sm:gap-4 md:gap-4 lg:gap-4 xl:gap-4 justify-items-center px-3 sm:px-6 md:px-8 py-4 sm:py-6'>
        {[
          { img: "src/assets/Features_images/medicine.webp", label: "Medicine", path: "/Medicines" },
          { img: "src/assets/Features_images/doctor.webp", label: "Doctor Consult", path: "/DoctorConsult" },
          { img: "src/assets/Features_images/health_blogs.webp", label: "Health Blog", path: "/Blogs" },
          { img: "src/assets/Features_images/healthcare.webp", label: "Healthcare", path: "/Category/HealthCare" },
          { img: "src/assets/Features_images/plus.webp", label: "Plus", path: "/PLUS" }
        ].map((feature, idx) => (
          <div key={idx} className="flex justify-center cursor-pointer" onClick={() => navigate(feature.path)}>
            <div className="w-32 sm:w-36 md:w-40 lg:w-44 xl:w-[150px] rounded-xl sm:rounded-2xl shadow-md sm:shadow-lg bg-white hover:shadow-xl transition-all duration-300 flex flex-col items-center p-2 sm:p-3 hover:scale-105 transform">
              <img src={feature.img} className="w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 object-contain" alt={feature.label} />
              <div className="w-full flex justify-center my-1 sm:my-2">
                <div className="w-[60%] h-0.5 bg-gray-200"></div>
              </div>
              <div className="text-center">
                <div className="font-semibold text-xs sm:text-sm md:text-base">{feature.label}</div>
                <div className="text-[10px] sm:text-xs font-bold text-green-500">SAVE 25%</div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Card Items Sections: Horizontal Scroll Slider */}
      {/* Trending */}
      <div className="mt-4 sm:mt-6 md:mt-8 mx-auto relative w-full px-2 sm:px-4 md:px-6">
        <Trending products={products} />
      </div>

      {/* New Launches */}
      <div className="mt-4 sm:mt-6 md:mt-8 mx-auto relative px-2 sm:px-4 md:px-6">
        <New_Launches />
      </div>

      {/* Health_Care_Tips */}
      <div className='flex px-2 sm:px-4 md:px-6 py-4 sm:py-6'>
        <Health_Articles />
      </div>

      {/* Reviews */}
      <div className="px-2 sm:px-4 md:px-6">
        <Reviews />
      </div>

      {/* FAQs */}
      <div className="px-2 sm:px-4 md:px-6">
        <FAQs />
      </div>

      {/* Footer - Responsive */}
      <footer className="bg-slate-800 py-8 sm:py-12 md:py-16 px-4 sm:px-6 md:px-8 text-white mt-8 sm:mt-12">
        <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 sm:gap-8 md:gap-10">
          {/* Company */}
          <div className="space-y-3 sm:space-y-4">
            <h1 className="text-lg sm:text-xl font-bold mb-4 sm:mb-6 text-indigo-300">Company</h1>
            <ul className="space-y-2 sm:space-y-3 text-sm sm:text-base">
              <li className="hover:text-indigo-300 cursor-pointer transition-colors">About Us</li>
              <li className="hover:text-indigo-300 cursor-pointer transition-colors">Careers</li>
              <li className="hover:text-indigo-300 cursor-pointer transition-colors">Blog</li>
              <li className="hover:text-indigo-300 cursor-pointer transition-colors">Partner with Us</li>
            </ul>
          </div>

          {/* Featured Categories */}
          <div className="space-y-3 sm:space-y-4">
            <h1 className="text-lg sm:text-xl font-bold mb-4 sm:mb-6 text-indigo-300">Featured Categories</h1>
            <ul className="space-y-2 sm:space-y-3 text-sm sm:text-base">
              <li className="hover:text-indigo-300 cursor-pointer transition-colors">Must Haves</li>
              <li className="hover:text-indigo-300 cursor-pointer transition-colors">Diabetes Essentials</li>
              <li className="hover:text-indigo-300 cursor-pointer transition-colors">Vitamins & Supplements</li>
              <li className="hover:text-indigo-300 cursor-pointer transition-colors">Heart Care</li>
              <li className="hover:text-indigo-300 cursor-pointer transition-colors">Ayurvedic Care</li>
              <li className="hover:text-indigo-300 cursor-pointer transition-colors">Sports Nutrition</li>
              <li className="hover:text-indigo-300 cursor-pointer transition-colors">Skin Care</li>
            </ul>
          </div>

          {/* Need Help */}
          <div className="space-y-3 sm:space-y-4">
            <h1 className="text-lg sm:text-xl font-bold mb-4 sm:mb-6 text-indigo-300">Need Help</h1>
            <ul className="space-y-2 sm:space-y-3 text-sm sm:text-base">
              <li className="hover:text-indigo-300 cursor-pointer transition-colors">Browse All Medicines</li>
              <li className="hover:text-indigo-300 cursor-pointer transition-colors">Browse All Molecules</li>
              <li className="hover:text-indigo-300 cursor-pointer transition-colors">Browse All Cities</li>
              <li className="hover:text-indigo-300 cursor-pointer transition-colors">FAQs</li>
            </ul>
          </div>

          {/* Policy Info */}
          <div className="space-y-3 sm:space-y-4">
            <h1 className="text-lg sm:text-xl font-bold mb-4 sm:mb-6 text-indigo-300">Policy Info</h1>
            <ul className="space-y-2 sm:space-y-3 text-sm sm:text-base">
              <li className="hover:text-indigo-300 cursor-pointer transition-colors">Privacy Policy</li>
              <li className="hover:text-indigo-300 cursor-pointer transition-colors">Terms and Conditions</li>
              <li className="hover:text-indigo-300 cursor-pointer transition-colors">Return Policy</li>
              <li className="hover:text-indigo-300 cursor-pointer transition-colors">Customer Support</li>
            </ul>
          </div>

          {/* Follow Us */}
          <div className="space-y-3 sm:space-y-4">
            <h1 className="text-lg sm:text-xl font-bold mb-4 sm:mb-6 text-indigo-300 text-center sm:text-left">Follow Us</h1>
            <div className="flex justify-center sm:justify-start gap-4 sm:gap-6">
              <img src={Insta} alt="Instagram" className="w-8 h-8 sm:w-10 sm:h-10 hover:scale-110 transition-transform cursor-pointer" />
              <img src={Twitter} alt="Twitter" className="w-8 h-8 sm:w-10 sm:h-10 hover:scale-110 transition-transform cursor-pointer" />
              <img src={Facebook} alt="Facebook" className="w-8 h-8 sm:w-10 sm:h-10 hover:scale-110 transition-transform cursor-pointer" />
              <img src={Youtube} alt="Youtube" className="w-8 h-8 sm:w-10 sm:h-10 hover:scale-110 transition-transform cursor-pointer" />
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="max-w-7xl mx-auto mt-8 sm:mt-12 pt-6 sm:pt-8 border-t border-slate-700 text-center">
          <p className="text-slate-400 text-xs sm:text-sm md:text-base">© 2025 TonicHub Pharmacy. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default Home;

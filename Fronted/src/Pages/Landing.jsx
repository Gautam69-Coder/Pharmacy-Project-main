import React from "react";
import './css/landing.css'
import { Link } from 'react-router-dom'
import Logo from "../assets/logo/logo.png"
import Twitter from "../assets/logo/twitter.svg"
import Insta from "../assets/logo/insta.svg"
import Facebook from "../assets/logo/facebook.svg"
import Youtube from "../assets/logo/youtube.svg"
import Vitamin from "../assets/vitamin.jpeg"
import Fitness from "../assets/fitness.jpeg"
import Skincare from "../assets/skincare.jpeg"
import Landing from "../assets/landing.png"

const PharmacyHome = () => {
  return (
    <div className="relative flex min-h-screen flex-col bg-slate-50 group/design-root overflow-x-hidden font-sans">

      <header className="flex items-center justify-between border-b border-slate-200 px-1 sm:px-8 py-4 h-14 sm:h-16 bg-white shadow-sm ">
        <div className="flex items-center sm:gap-4 gap-1">
          <div className="rounded-lg p-1 sm:p-2">
            <img src={Logo} alt="TonicHub Logo" className="w-10 h-9" />
          </div>
          <h1 className="sm:text-xl font-bold text-slate-800 text-sm">TonicHub Pharmacy</h1>
        </div>


        <nav className="hidden md:flex gap-8 text-sm font-medium text-slate-700">
          <Link to='/Home'>
            <button className="px-4 py-2 rounded-xl hover:text-indigo-600 hover:bg-indigo-50 transition-all duration-200">Home</button>
          </Link>

          <Link to='/about'>
            <button className="px-4 py-2 rounded-xl hover:text-indigo-600 hover:bg-indigo-50 transition-all duration-200">About Us</button>
          </Link>

          <a href="#" className="px-4 py-2 rounded-xl hover:text-indigo-600 hover:bg-indigo-50 transition-all duration-200">Services</a>
          <Link to='/Home/ContactUs/'>
            <button className="px-4 py-2 rounded-xl hover:text-indigo-600 hover:bg-indigo-50 transition-all duration-200">Contact US</button>
          </Link>
          
        </nav>


        <div className="flex items-center gap-2 sm:gap-4 text-sm">
          <Link to='/signin'>
            <button className=" px-2 sm:px-6 py-2.5 text-slate-700 font-medium border border-slate-300 rounded-lg hover:text-slate-900 hover:border-slate-400 hover:shadow-sm transition-all duration-200 g-shadow-k">
              Sign In
            </button>
          </Link>

          <Link to='/signup'>
            <button className="rounded-lg bg-indigo-600  px-2 sm:px-6 py-2.5 hover:bg-indigo-700 font-medium shadow-sm hover:shadow-md transition-all duration-200 g-shadow-k-c
          ">
              Create Account
            </button>
          </Link>
        </div>
      </header>


      <section className="relative flex h-[85vh] w-full items-center justify-center overflow-hidden bg-black">
        <img
          src={Landing}
          alt="Pharmacy Hero Background"
          className="absolute inset-0 h-full w-full object-cover opacity-60"
        />
        <div className="relative z-10 max-w-4xl text-center text-white px-6 py-12">
          <h2 className="text-5xl font-bold sm:text-6xl lg:text-7xl mb-6 leading-tight">
            Your Health, Our Priority
          </h2>
          <p className="mt-6 text-xl sm:text-2xl max-w-2xl mx-auto leading-relaxed opacity-90">
            Trusted care, expert advice, and quality products—all in one place.
          </p>
          <div className="mt-10 flex flex-col sm:flex-row justify-center gap-6">
            <Link to='/Home'>
              <button className="rounded-xl bg-indigo-600 px-8 py-4 text-lg font-semibold text-white hover:bg-indigo-700 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105">
                Shop Now
              </button>
            </Link>
            <button className="rounded-xl border-2 border-white px-8 py-4 text-lg font-semibold hover:bg-white hover:text-indigo-600 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105">
              Prescription Refills
            </button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 px-6 bg-white">
        <div className="max-w-7xl mx-auto">
          <h3 className="text-3xl font-bold text-center mb-12 text-slate-800">
            Featured Products & Offers
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Vitamins Card */}
            <div className="rounded-2xl overflow-hidden bg-white shadow-lg hover:shadow-2xl hover:scale-105 transition-all duration-300">
              <div
                className="h-56 bg-cover bg-center"
                style={{
                  backgroundImage: `url(${Vitamin})`
                }}
              />
              <div className="p-6">
                <h4 className="font-bold text-xl mb-2 text-slate-800">Vitamins</h4>
                <p className="text-slate-600 leading-relaxed">
                  Save up to 20% on our premium vitamin collection.
                </p>
              </div>
            </div>


            <div className="rounded-2xl overflow-hidden bg-white shadow-lg hover:shadow-2xl hover:scale-105 transition-all duration-300">
              <div
                className="h-56 bg-cover bg-center"
                style={{
                  backgroundImage: `url(${Skincare})`
                }}
              />
              <div className="p-6">
                <h4 className="font-bold text-xl mb-2 text-slate-800">Skin Care</h4>
                <p className="text-slate-600 leading-relaxed">
                  Professional skincare solutions for healthy, glowing skin.
                </p>
              </div>
            </div>


            <div className="rounded-2xl overflow-hidden bg-white shadow-lg hover:shadow-2xl hover:scale-105 transition-all duration-300">
              <div
                className="h-56 bg-cover bg-center"
                style={{
                  backgroundImage: `url(${Fitness})`
                }}
              />
              <div className="p-6">
                <h4 className="font-bold text-xl mb-2 text-slate-800">Fitness</h4>
                <p className="text-slate-600 leading-relaxed">
                  Sports nutrition and fitness supplements for peak performance.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-slate-100 py-16 px-6">
        <div className="max-w-6xl mx-auto">
          <h3 className="text-3xl font-bold text-center mb-12 text-slate-800">
            What Our Customers Say
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300">
              <div className="flex items-center gap-5 mb-4">
                <img
                  className="w-14 h-14 rounded-full border-2 border-indigo-100"
                  src="https://randomuser.me/api/portraits/women/68.jpg"
                  alt="Reviewer"
                />
                <div>
                  <h5 className="font-semibold text-lg text-slate-800">Priya Sharma</h5>
                  <p className="text-slate-500">Mumbai, India</p>
                </div>
              </div>
              <div className="flex items-center gap-1 text-yellow-500 mb-4">
                {Array(5).fill(0).map((_, i) => (
                  <svg key={i} fill="currentColor" viewBox="0 0 24 24" className="w-5 h-5">
                    <path d="M12 2L15 8h6l-5 4 2 6-5-4-5 4 2-6-5-4h6z" />
                  </svg>
                ))}
              </div>
              <p className="text-slate-700 leading-relaxed text-lg">
                "Fast delivery and authentic medicine. The consultation feature is incredibly helpful!"
              </p>
            </div>

            <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300">
              <div className="flex items-center gap-5 mb-4">
                <img
                  className="w-14 h-14 rounded-full border-2 border-indigo-100"
                  src="https://randomuser.me/api/portraits/men/68.jpg"
                  alt="Reviewer"
                />
                <div>
                  <h5 className="font-semibold text-lg text-slate-800">Shivay Oberoi</h5>
                  <p className="text-slate-500">Kolkata, India</p>
                </div>
              </div>
              <div className="flex items-center gap-1 text-yellow-500 mb-4">
                {Array(4).fill(0).map((_, i) => (
                  <svg key={i} fill="currentColor" viewBox="0 0 24 24" className="w-5 h-5">
                    <path d="M12 2L15 8h6l-5 4 2 6-5-4-5 4 2-6-5-4h6z" />
                  </svg>
                ))}
              </div>
              <p className="text-slate-700 leading-relaxed text-lg">
                "Excellent service and quality products. Highly recommend for all health needs!"
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-16 px-6 bg-white">
        <div className="max-w-6xl mx-auto">
          <h3 className="text-3xl font-bold text-center mb-12 text-slate-800">
            Our Services
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { title: "Easy Refills", icon: "💊", desc: "Quick and convenient prescription refills" },
              { title: "Online Consults", icon: "📱", desc: "Connect with healthcare professionals anytime" },
              { title: "Wellness Tips", icon: "🌿", desc: "Expert advice for your health journey" }
            ].map((service, i) => (
              <div key={i} className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 text-center border border-slate-100">
                <div className="text-6xl mb-4">{service.icon}</div>
                <h4 className="text-xl font-bold mb-3 text-slate-800">{service.title}</h4>
                <p className="text-slate-600 leading-relaxed">
                  {service.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer Section */}
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

export default PharmacyHome;

import React from "react";
import './css/landing.css'
import { Link } from 'react-router-dom'
import Logo from "../assets/logo/logo.png"
import Twitter from "../assets/logo/twitter.svg"
import Insta from "../assets/logo/insta.svg"
import Facebook from "../assets/logo/facebook.svg"
import Youtube from "../assets/logo/youtube.svg"

const PharmacyAboutUs = () => {
  return (
    <div className="relative flex min-h-screen flex-col bg-slate-50 overflow-x-hidden font-sans">

      <header className="flex items-center justify-between border-b border-slate-200 px-1 sm:px-8 py-4 h-14 sm:h-16 bg-white shadow-sm ">
        <div className="flex items-center sm:gap-4 gap-1">
          <div className="rounded-lg p-1 sm:p-2">
            <img src={Logo} alt="TonicHub Logo" className="w-10 h-9" />
          </div>
          <h1 className="sm:text-xl font-bold text-slate-800 text-sm">TonicHub Pharmacy</h1>
        </div>

        <nav className="hidden md:flex gap-8 text-sm font-medium text-slate-700">
          <Link to='/'>
            <button className="px-4 py-2 rounded-xl hover:text-indigo-600 hover:bg-indigo-50 transition-all duration-200">
              Home
            </button>
          </Link>
          <Link to='/about-us'>
            <button className="px-4 py-2 rounded-xl bg-indigo-100 text-indigo-700 cursor-default">
              About Us
            </button>
          </Link>
          <a href="#" className="px-4 py-2 rounded-xl hover:text-indigo-600 hover:bg-indigo-50 transition-all duration-200">Services</a>
          <Link to='/Home/ContactUs/'>
            <button className="px-4 py-2 rounded-xl hover:text-indigo-600 hover:bg-indigo-50 transition-all duration-200">Contact Us</button>
          </Link>
        </nav>

        <div className="flex items-center gap-2 sm:gap-4 text-sm">
          <Link to='/signin'>
            <button className="px-2 sm:px-6 py-2.5 text-slate-700 font-medium border border-slate-300 rounded-lg hover:text-slate-900 hover:border-slate-400 hover:shadow-sm transition-all duration-200 g-shadow-k">
              Sign In
            </button>
          </Link>

          <Link to='/signup'>
            <button className="rounded-lg bg-indigo-600 px-2 sm:px-6 py-2.5 hover:bg-indigo-700 font-medium shadow-sm hover:shadow-md transition-all duration-200 g-shadow-k-c">
              Create Account
            </button>
          </Link>
        </div>
      </header>

      {/* About Us Main Content with color theme */}
      <section className="py-20 px-6 bg-gradient-to-r from-blue-50 via-teal-50 to-blue-50 max-w-5xl mx-auto rounded-3xl shadow-lg mt-12">
        <h2 className="text-4xl font-extrabold text-center text-blue-800 mb-8">
          About TonicHub Pharmacy
        </h2>
        <p className="text-center text-blue-700 text-lg max-w-3xl mx-auto leading-relaxed mb-12">
          At TonicHub Pharmacy, your health and wellbeing are at the heart of what we do. We are committed to delivering high-quality pharmaceutical care with compassion and integrity. Our expert team is here to support your health journey every step of the way.
        </p>
        <div className="grid gap-12 md:grid-cols-3 text-center">
          <div className="bg-white rounded-xl shadow-md p-6 hover:shadow-xl transition-shadow duration-300">
            <h3 className="text-xl font-semibold text-teal-700 mb-3">Our Mission</h3>
            <p className="text-teal-600">
              To empower our community with accessible, affordable, and trusted healthcare solutions.
            </p>
          </div>
          <div className="bg-white rounded-xl shadow-md p-6 hover:shadow-xl transition-shadow duration-300">
            <h3 className="text-xl font-semibold text-teal-700 mb-3">Our Vision</h3>
            <p className="text-teal-600">
              To be the most reliable pharmacy destination recognized for care, expertise, and innovation.
            </p>
          </div>
          <div className="bg-white rounded-xl shadow-md p-6 hover:shadow-xl transition-shadow duration-300">
            <h3 className="text-xl font-semibold text-teal-700 mb-3">Our Values</h3>
            <ul className="list-disc list-inside text-teal-600 text-left max-w-xs mx-auto">
              <li>Compassionate Service</li>
              <li>Professional Integrity</li>
              <li>Customer Focus</li>
              <li>Continuous Improvement</li>
            </ul>
          </div>
        </div>
        <div className="mt-16 text-center text-blue-700">
          <h3 className="text-3xl font-bold mb-4 text-blue-800">Meet Our Dedicated Team</h3>
          <p className="max-w-4xl mx-auto">
            Our pharmacists and healthcare professionals bring passion and expertise, committed to delivering the best personalized care and advice to ensure your longest and healthiest life.
          </p>
        </div>
      </section>

      {/* Footer Section */}
      <footer className="bg-slate-800 py-16 px-6 text-white mt-20">
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

export default PharmacyAboutUs;

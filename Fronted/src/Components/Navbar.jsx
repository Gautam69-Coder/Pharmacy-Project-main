import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Dropdown } from 'antd';
import { Menu, X } from 'lucide-react';

import searchIcon from '../assets/icons/search.svg';
import personIcon from '../assets/icons/person.png';
import cartIcon from '../assets/icons/cart.png';
import logo from '../assets/logo/logo.png';
import Menubar from './Menubar';

// Helper: get initials from user name
const getInitials = (name) => {
  if (!name) return '';
  const parts = name.trim().split(' ').filter(Boolean);
  if (parts.length === 1) return parts[0][0].toUpperCase();
  return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
};

const Navbar = () => {
  const navigate = useNavigate();
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [userName, setUserName] = useState('');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const url = "https://pharmacy-project-main.onrender.com";

  // Dropdown menu items
  const getDropdownItems = () => [
    {
      key: '0',
      label: (
        <div className="flex items-center gap-2 px-2 py-2 hover:bg-gray-50 rounded-md transition-colors">
          <span className="text-gray-700">📋</span>
          <span>Order History</span>
        </div>
      ),
      onClick: () => navigate('/Home/Order'),
    },
    {
      key: '1',
      label: (
        <div className="flex items-center gap-2 px-2 py-2 hover:bg-gray-50 rounded-md transition-colors">
          <span>🧑‍⚕️</span>
          <span>Your Doctors</span>
        </div>
      ),
      onClick: () => navigate('/Doctors'),
    },
    {
      key: '2',
      label: (
        <div className="flex items-center gap-2 px-2 py-2 hover:bg-red-50 rounded-md transition-colors text-red-600">
          <span>🚪</span>
          <span>Logout</span>
        </div>
      ),
      onClick: () => {
        localStorage.removeItem('userName');
        setUserName('');
        navigate('/signin');
      },
    },
  ];

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 30);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const stored = localStorage.getItem('userName');
    if (stored) setUserName(stored);
  }, []);

  const navItems = [
    {
      icon: personIcon,
      label: 'User Account',
      onClick: () => navigate('/signin'),
      isUser: true,
    },
    {
      icon: cartIcon,
      label: 'Cart',
      onClick: () => navigate('/cart'),
    },
  ];

  const handleSearch = async (searchQuery) => {
    try {
      const res = await axios.get(`${url}/Home/search`, {
        params: { searchQuery }
      });
      navigate(`/searchpro?search=${searchQuery}`);
    } catch (err) {
      console.error(err);
    }
  };

  // Avatar color utility
  const avatarColors = [
    'bg-emerald-100 text-emerald-700 ring-emerald-200',
    'bg-blue-100 text-blue-700 ring-blue-200',
    'bg-purple-100 text-purple-700 ring-purple-200',
    'bg-amber-100 text-amber-700 ring-amber-200',
    'bg-rose-100 text-rose-700 ring-rose-200',
    'bg-cyan-100 text-cyan-700 ring-cyan-200',
  ];

  const getAvatarStyle = (name) => {
    if (!name) return avatarColors[0];
    const sum = [...name].reduce((acc, char) => acc + char.charCodeAt(0), 0);
    return avatarColors[sum % avatarColors.length];
  };

  return (
    <div className="relative">
      {/* Top Navbar */}
      {!isScrolled && (
        <div className="bg-white/98 backdrop-blur-md border-b border-gray-100 sticky top-0 z-50 shadow-sm">
          <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-6">
            <div className="flex items-center justify-between h-16 sm:h-18 md:h-20 gap-3">
              
              {/* Logo */}
              <div className="flex items-center flex-shrink-0">
                <img
                  src={logo}
                  alt="Logo"
                  className="h-7 sm:h-8 md:h-10 transition-transform hover:scale-105 cursor-pointer"
                  onClick={() => navigate('/')}
                />
              </div>

              {/* Search Bar - Desktop & Tablet */}
              <form
                className="hidden sm:flex flex-1 max-w-2xl mx-4"
                onSubmit={(e) => {
                  e.preventDefault();
                  handleSearch(searchQuery);
                }}
              >
                <div
                  className={`relative flex items-center w-full h-11 md:h-12 rounded-xl px-4 bg-white border-2 transition-all duration-300 ${
                    isSearchFocused
                      ? 'border-blue-500 shadow-lg ring-2 ring-blue-100'
                      : 'border-gray-300 hover:border-gray-400 shadow-sm'
                  }`}
                >
                  <svg
                    className={`w-5 h-5 flex-shrink-0 transition-colors ${
                      isSearchFocused ? 'text-blue-600' : 'text-gray-400'
                    }`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                    />
                  </svg>
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search medicines, health products..."
                    className="flex-1 px-3 text-sm md:text-base outline-none bg-transparent placeholder-gray-400"
                    onFocus={() => setIsSearchFocused(true)}
                    onBlur={() => setIsSearchFocused(false)}
                  />
                  {searchQuery && (
                    <button
                      type="button"
                      onClick={() => setSearchQuery('')}
                      className="flex-shrink-0 p-1.5 text-gray-400 hover:text-gray-700 hover:bg-gray-100 rounded-full transition-all"
                      aria-label="Clear search"
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
                  )}
                </div>
              </form>

              {/* Right Nav Items - Desktop */}
              <div className="hidden md:flex items-center gap-2">
                {navItems.map((item, idx) => {
                  const isUser = item.isUser;
                  const firstName = userName ? userName.split(' ')[0] : '';
                  const initials = userName ? getInitials(userName) : null;
                  const avatarStyle = userName ? getAvatarStyle(userName) : '';

                  if (isUser && userName) {
                    return (
                      <Dropdown
                        key={idx}
                        menu={{
                          items: getDropdownItems(),
                          onClick: ({ key }) => {
                            const clickedItem = getDropdownItems().find(item => item.key === key);
                            if (clickedItem?.onClick) clickedItem.onClick();
                          }
                        }}
                        placement="bottomRight"
                        trigger={['click']}
                      >
                        <div
                          className="group cursor-pointer rounded-xl px-3 py-2 hover:bg-gradient-to-r hover:from-blue-50 hover:to-indigo-50 transition-all duration-200"
                          role="button"
                          tabIndex={0}
                        >
                          <div className="flex items-center gap-2.5">
                            <div className={`inline-flex items-center justify-center rounded-full w-9 h-9 text-sm font-semibold ring-2 ${avatarStyle}`}>
                              {initials}
                            </div>
                            <span className="font-medium text-gray-800 group-hover:text-blue-700 text-sm">
                              Hi, {firstName}
                            </span>
                            <svg className="w-4 h-4 text-gray-400" viewBox="0 0 20 20" fill="currentColor">
                              <path fillRule="evenodd" d="M5.23 7.21a.75.75 0 011.06.02L10 10.94l3.71-3.71a.75.75 0 111.06 1.06l-4.24 4.24a.75.75 0 01-1.06 0L5.21 8.29a.75.75 0 01.02-1.08z" clipRule="evenodd" />
                            </svg>
                          </div>
                        </div>
                      </Dropdown>
                    );
                  }

                  return (
                    <div
                      key={idx}
                      className="group cursor-pointer rounded-xl px-3 py-2 hover:bg-gradient-to-r hover:from-blue-50 hover:to-indigo-50 transition-all"
                      onClick={item.onClick}
                    >
                      <div className="flex items-center gap-2">
                        <img src={item.icon} alt="" className="w-6 h-6" />
                        <span className="font-medium text-gray-700 group-hover:text-blue-700 text-sm">
                          {isUser ? 'Login' : item.label}
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Mobile Menu Icons */}
              <div className="flex md:hidden items-center gap-2">
                <button
                  onClick={() => navigate('/cart')}
                  className="p-2 rounded-lg hover:bg-gray-100 transition-colors relative"
                >
                  <img src={cartIcon} alt="Cart" className="w-6 h-6" />
                </button>
                <button
                  onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                  className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
                  aria-label="Toggle menu"
                >
                  {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                </button>
              </div>
            </div>

            {/* Mobile Search Bar */}
            <div className="sm:hidden pb-3">
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  handleSearch(searchQuery);
                }}
              >
                <div className={`relative flex items-center h-10 rounded-lg px-3 bg-white border-2 transition-all ${
                  isSearchFocused ? 'border-blue-500 shadow-md ring-2 ring-blue-50' : 'border-gray-300'
                }`}>
                  <svg className="w-4 h-4 text-gray-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search medicines..."
                    className="flex-1 px-2 text-sm outline-none bg-transparent"
                    onFocus={() => setIsSearchFocused(true)}
                    onBlur={() => setIsSearchFocused(false)}
                  />
                  {searchQuery && (
                    <button type="button" onClick={() => setSearchQuery('')} className="p-1 text-gray-400">
                      ×
                    </button>
                  )}
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* Mobile Dropdown Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden fixed inset-0 top-16 bg-white z-40 overflow-y-auto shadow-lg">
          <div className="p-4 space-y-3">
            {userName ? (
              <>
                <div className="flex items-center gap-3 p-3 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg">
                  <div className={`inline-flex items-center justify-center rounded-full w-12 h-12 text-base font-semibold ring-2 ${getAvatarStyle(userName)}`}>
                    {getInitials(userName)}
                  </div>
                  <div>
                    <p className="font-semibold text-gray-800">Hi, {userName.split(' ')[0]}</p>
                    <p className="text-xs text-gray-600">Welcome back!</p>
                  </div>
                </div>
                {getDropdownItems().map((item) => (
                  <button
                    key={item.key}
                    onClick={() => {
                      item.onClick();
                      setIsMobileMenuOpen(false);
                    }}
                    className="w-full text-left p-3 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    {item.label}
                  </button>
                ))}
              </>
            ) : (
              <button
                onClick={() => {
                  navigate('/signin');
                  setIsMobileMenuOpen(false);
                }}
                className="w-full flex items-center gap-3 p-3 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors"
              >
                <img src={personIcon} alt="" className="w-6 h-6" />
                <span className="font-medium text-blue-700">Login / Sign Up</span>
              </button>
            )}
          </div>
        </div>
      )}

      {/* Menubar */}
      <div
        className={`w-full z-40 transition-all duration-500 ${
          isScrolled
            ? 'fixed top-0 bg-white/95 backdrop-blur-md shadow-lg border-b border-gray-100'
            : 'relative bg-white'
        }`}
      >
        <Menubar />
      </div>
    </div>
  );
};

export default Navbar;

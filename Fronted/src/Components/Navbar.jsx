import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios'
import { DownOutlined } from '@ant-design/icons';
import { Dropdown, Space } from 'antd';

import searchIcon from '../assets/icons/search.svg';
import personIcon from '../assets/icons/person.png';
import offerIcon from '../assets/icons/offer.png';
import cartIcon from '../assets/icons/cart.png';
import logo from '../assets/logo/logo.png';
import Menubar from './Menubar';
import { Button } from 'antd';



// Helper: get initials from user name
const getInitials = (name) => {
  if (!name) return '';
  const parts = name.trim().split(' ').filter(Boolean);
  if (parts.length === 1) return parts[0][0].toUpperCase();
  return (parts + parts[parts.length - 1]).toUpperCase();
};

const items = [
  {
    key: '1',
    label: (
      <a target="_blank" rel="noopener noreferrer" href="https://www.antgroup.com">
        1st menu item
      </a>
    ),
  }
];

const Navbar = () => {
  const navigate = useNavigate();
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [userName, setUserName] = useState('');

  // Dropdown menu items with history button
  const getDropdownItems = () => [
    {
      key: '0',
      label: (
        <div className="flex items-center gap-2 px-2 py-1 hover:bg-gray-50 rounded-md transition-colors">
          <span className="text-gray-700">📋</span>
          <span>Order History</span>
        </div>
      ),
      onClick: () => navigate('/Home/Order'),
    },
    
    {
      key: '1',
      label: (
        <div className="flex items-center gap-2 px-2 py-1  rounded-md transition-colors ">
          <span>🧑‍⚕️</span>
          <span>Your Doctors</span>
        </div>
      ),
      onClick: () => {
        navigate('/Doctors')
      },
    },
    {
      key: '2',
      label: (
        <div className="flex items-center gap-2 px-2 py-1 hover:bg-red-50 rounded-md transition-colors text-red-600">
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

  const url="http://localhost:3000"

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
    console.log(searchQuery)
    try {
      const res = await axios.get(`${url}/Home/search`, {
        params: { searchQuery }
      });
      console.log(res.data);
      navigate(`/searchpro?search=${searchQuery}`)
    } catch (err) {
      console.error(err);
    }
  };

  // Avatar color utility for consistency
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
        <div className="flex flex-wrap sm:flex-nowrap justify-between items-center px-3 sm:px-4 py-2 h-auto sm:h-16 bg-white/98 backdrop-blur-md border-b border-gray-100 sticky top-0 z-50 shadow-sm gap-2 sm:gap-0">

          {/* Logo */}
          <div className="flex items-center flex-shrink-0">
            <img
              src={logo}
              alt="Logo"
              className="h-6 sm:h-8 transition-transform hover:scale-105 cursor-pointer "
              onClick={() => navigate('/')}
            />
          </div>

          {/* Location & Language */}
          <div className="flex gap-1 sm:gap-2 items-center order-3 sm:order-none w-full sm:w-auto justify-between sm:justify-start">
            
            <button
              onClick={() => {
                navigate('/Home/ContactUs/')
              }}
              className="hidden sm:block bg-white border border-blue-200 hover:border-blue-400 rounded-full px-3 py-1.5 shadow-sm">
              Contact us
            </button>
          </div>

          {/* Search Bar */}
          <form
            className="flex-1 min-w-full sm:min-w-[250px] md:max-w-xl mx-0 sm:mx-6 order-2 sm:order-none "
            style={{ marginRight: '75px' }}
            onSubmit={(e) => {
              e.preventDefault();
              handleSearch(searchQuery);
            }}
          >
            <div
              className={`relative flex items-center h-9 sm:h-10 rounded-xl px-2 sm:px-3  bg-white border shadow-sm transition-all text-sm ${isSearchFocused
                ? 'border-blue-400 shadow-md ring-2 ring-blue-50 scale-105'
                : 'border-gray-200 hover:border-gray-300'
                }`}
            >
              <img src={searchIcon} alt="search" className="w-4 h-4 text-gray-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search medicines, health products..."
                className="w-full pl-2 text-xs outline-none bg-transparent placeholder-gray-400"
                onFocus={() => setIsSearchFocused(true)}
                onBlur={() => setIsSearchFocused(false)}
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery('')}
                  className="text-gray-400 hover:text-gray-600 ml-1 p-1 rounded-full hover:bg-gray-100 transition-colors"
                  aria-label="Clear search"
                >
                  ✕
                </button>
              )}
            </div>
          </form>

          {/* Right Nav Items */}
          <div className="flex items-center gap-1">
            {navItems.map((item, idx) => {
              const isUser = item.isUser;
              const firstName = userName ? userName.split(' ')[0] : '';
              const initials = userName ? getInitials(userName) : null;
              const avatarStyle = userName ? getAvatarStyle(userName) : '';

              // If user is logged in and this is the user account item, wrap with dropdown
              if (isUser && userName) {
                return (
                  <Dropdown
                    key={idx}
                    menu={{
                      items: getDropdownItems(),
                      onClick: ({ key }) => {
                        const clickedItem = getDropdownItems().find(item => item.key === key);
                        if (clickedItem?.onClick) {
                          clickedItem.onClick();
                        }
                      }
                    }}
                    placement="bottomRight"
                    trigger={['click']}
                    overlayClassName="min-w-[200px]"
                  >
                    <div
                      className={`group relative cursor-pointer overflow-hidden rounded-xl transition-all duration-200
                        hover:bg-gradient-to-r hover:from-blue-50 hover:to-indigo-50 hover:shadow-md
                        focus-within:ring-2 focus-within:ring-blue-200 focus-within:ring-opacity-50
                        ${isUser ? 'px-3 py-2' : 'px-2 py-1.5'}`}
                      role="button"
                      tabIndex={0}
                      aria-label={`Account: ${userName}`}
                      title={userName}
                    >
                      <div className="flex items-center gap-2.5">
                        <div className={`inline-flex items-center justify-center rounded-full ring-1 transition-all duration-200 
                          w-8 h-8 text-sm font-semibold group-hover:scale-105 group-hover:shadow-sm ${avatarStyle}`}>
                          {initials}
                        </div>

                        <div className="flex items-center gap-1.5">
                          <span
                            className="font-medium transition-colors duration-200 text-gray-800 group-hover:text-blue-700 text-sm hidden sm:block max-w-[120px] truncate"
                          >
                            {`Hi, ${firstName}`}
                          </span>

                          {/* Smaller dropdown SVG */}
                          <svg
                            className="w-3 h-3 text-gray-400 group-hover:text-blue-600 transition-colors duration-200 hidden sm:block"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                            aria-hidden="true"
                          >
                            <path fillRule="evenodd" d="M5.23 7.21a.75.75 0 011.06.02L10 10.94l3.71-3.71a.75.75 0 111.06 1.06l-4.24 4.24a.75.75 0 01-1.06 0L5.21 8.29a.75.75 0 01.02-1.08z" clipRule="evenodd" />
                          </svg>
                        </div>
                      </div>

                      {/* Animated Underline */}
                      <div className="absolute bottom-0 left-1/2 w-0 h-0.5 bg-gradient-to-r from-blue-500 to-indigo-500 
                        group-hover:w-4/5 group-hover:left-[10%] transition-all duration-300 rounded-full"></div>
                    </div>
                  </Dropdown>
                );
              }

              // For non-user items or when user is not logged in
              return (
                <div
                  key={idx}
                  className={`group relative cursor-pointer overflow-hidden rounded-xl transition-all duration-200
                    hover:bg-gradient-to-r hover:from-blue-50 hover:to-indigo-50 hover:shadow-md
                    focus-within:ring-2 focus-within:ring-blue-200 focus-within:ring-opacity-50
                    ${isUser ? 'px-3 py-2' : 'px-2 py-1.5'}`}
                  onClick={item.onClick}
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault();
                      item.onClick();
                    }
                  }}
                  aria-label={isUser ? 'Login to account' : item.label}
                  title={isUser ? 'Login to your account' : item.label}
                >
                  <div className="flex items-center gap-2.5">
                    <div className="relative">
                      <img
                        src={item.icon}
                        alt=""
                        className="w-6 h-6 opacity-80 group-hover:opacity-100 transition-all duration-200"
                      />
                      {isUser && (
                        <div className="absolute -top-1 -right-1 w-3 h-3 bg-blue-500 rounded-full animate-pulse"></div>
                      )}
                    </div>

                    <div className="flex items-center gap-1.5">
                      <span
                        className={`font-medium transition-colors duration-200 ${isUser
                          ? 'text-gray-800 group-hover:text-blue-700 text-sm hidden sm:block max-w-[120px] truncate'
                          : 'text-gray-700 group-hover:text-blue-700 text-xs hidden sm:block'
                          }`}
                      >
                        {isUser ? 'Login' : item.label}
                      </span>
                    </div>
                  </div>

                  {/* Animated Underline */}
                  <div className="absolute bottom-0 left-1/2 w-0 h-0.5 bg-gradient-to-r from-blue-500 to-indigo-500 
                    group-hover:w-4/5 group-hover:left-[10%] transition-all duration-300 rounded-full"></div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Menubar */}
      <div
        className={`w-full z-40 transition-all duration-500 ${isScrolled
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

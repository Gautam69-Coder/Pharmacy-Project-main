import { useState } from 'react';
import Logo from "../assets/logo/logo.png";
import { useNavigate, Link } from 'react-router-dom';
import { FaPills, FaEye, FaEyeSlash } from 'react-icons/fa';
import axios from 'axios';

import { message } from 'antd';

const SignUpPage = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const [messageApi, contextHolder] = message.useMessage();

  const url="http://localhost:3000"
  
  const validateEmail = (email) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };


  const handleSubmit = (e) => {
    e.preventDefault();
    localStorage.setItem("email", email)

    if (!validateEmail(email)) {
      messageApi.open({
        type: 'error',
        content: 'Please enter valid email address',
      });
      return;
    }

    if (password.length < 8) {
      messageApi.open({
        type: 'error',
        content: 'Password must be 8 letters',
      });
      return;
    }

    if (confirmPassword !== password) {
      messageApi.open({
        type: 'error',
        content: 'Password does not Match',
      });
      setPassword('');
      setConfirmPassword('');
      return;
    }

    axios.post(`${url}/signup`, { name, email, password, confirmPassword })
      .then(() => {
        messageApi.open({
          type: 'success',
          content: 'Register Sucessfull',
        });
        setName('');
        setEmail('');
        setPassword('');
        setConfirmPassword('');
        setRememberMe(false);
        setShowPassword(false);
        setTimeout(() => {
          navigate('/signin');
        }, 1000);
      })
      .catch(err => {
        if (err.response && err.response.status === 409) {
          console.log('User already exists. Please sign in or use a different email.');
        } else {
          console.log('An error occurred during signup. Please try again.', err);
        }
      });
  };

  return (
    <div className="min-h-screen bg-white">
      {contextHolder}

      {/* Header */}
      <header className="flex items-center justify-between border-b border-slate-200 px-2 md:px-8 py-4 h-16 bg-white shadow-sm mb-10">
        <div className="flex items-center gap-1 md:gap-4">
          <div className="rounded-lg p-1 md:p-2">
            <img src={Logo} alt="TonicHub Logo" className="w-10 h-9" />
          </div>
          <h1 className="md:text-xl font-bold text-slate-800 text-sm">TonicHub Pharmacy</h1>
        </div>

        <nav className="hidden md:flex gap-8 text-sm font-medium text-slate-700">
          <a href="#" className="px-4 py-2 rounded-xl hover:text-indigo-600 hover:bg-indigo-50 transition-colors cursor-pointer">Home</a>
          <a href="#" className="px-4 py-2 rounded-xl hover:text-indigo-600 hover:bg-indigo-50 transition-colors cursor-pointer">About Us</a>
          <a href="#" className="px-4 py-2 rounded-xl hover:text-indigo-600 hover:bg-indigo-50 transition-colors cursor-pointer">Services</a>
          <a href="#" className="px-4 py-2 rounded-xl hover:text-indigo-600 hover:bg-indigo-50 transition-colors cursor-pointer">Contact Us</a>
        </nav>

        <div className="flex items-center gap-4 text-sm">
          <Link to="/signin">
            <button className="rounded-lg bg-[#4f39f6] text-white px-2 sm:px-6 py-2.5  font-medium shadow-sm hover:shadow-md transition-colors cursor-pointer">
              Sign In
            </button>
          </Link>
        </div>
      </header>

      {/* Main */}
      <div className="relative flex items-center justify-center p-4">
        {/* Background pattern */}
        <div
          className="absolute inset-0 opacity-10 pointer-events-none bg-no-repeat bg-cover"
          aria-hidden="true"
        ></div>

        <div className="relative z-10 w-full max-w-4xl bg-white rounded-xl shadow-lg">
          <div className="p-6 sm:p-8">
            <div className="flex flex-col items-center mb-8 text-center">
              <div className="bg-teal-100 rounded-full p-2 mb-3">
                <FaPills className="text-teal-700 text-xl" />
              </div>
              <div className="text-lg font-bold text-teal-700 mb-1">TonicHub Pharmacy</div>
              <h1 className="text-2xl font-bold text-slate-800 mb-1">Create your Account</h1>
              <p className="text-sm text-gray-500">Join your Pharmacy Community today</p>
            </div>

            <form onSubmit={handleSubmit} className="flex flex-col gap-6">
              {/* Name + Email */}
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div>
                  <label htmlFor="username" className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                  <input
                    id="username"
                    name="username"
                    type="text"
                    autoComplete="name"
                    required
                    value={name}
                    onChange={e => setName(e.target.value)}
                    placeholder="Your Name"
                    className="w-full border border-gray-300 rounded-lg px-4 py-3 text-base focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    required
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    placeholder="your@email.com"
                    className="w-full border border-gray-300 rounded-lg px-4 py-3 text-base focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
                  />
                </div>
              </div>

              {/* Password + Confirm */}
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div>
                  <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">Password</label>
                  <div className="relative">
                    <input
                      id="password"
                      name="password"
                      type={showPassword ? 'text' : 'password'}
                      required
                      value={password}
                      onChange={e => setPassword(e.target.value)}
                      placeholder="••••••••"
                      className="w-full border border-gray-300 rounded-lg px-4 py-3 pr-10 text-base focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
                    />
                    <button
                      type="button"
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-teal-700 transition-colors cursor-pointer"
                      onClick={() => setShowPassword(!showPassword)}
                      tabIndex={-1}
                      aria-label={showPassword ? "Hide password" : "Show password"}
                    >
                      {showPassword ? <FaEyeSlash /> : <FaEye />}
                    </button>
                  </div>
                </div>

                <div>
                  <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-1">Confirm Password</label>
                  <input
                    id="confirmPassword"
                    name="confirmPassword"
                    type={showPassword ? 'text' : 'password'}
                    autoComplete="new-password"
                    required
                    value={confirmPassword}
                    onChange={e => setConfirmPassword(e.target.value)}
                    placeholder="••••••••"
                    className="w-full border border-gray-300 rounded-lg px-4 py-3 text-base focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
                  />
                </div>
              </div>

              {/* Remember / Forgot */}
              <div className="flex items-center justify-between text-sm">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={rememberMe}
                    onChange={e => setRememberMe(e.target.checked)}
                    className="w-4 h-4 text-teal-600 border-gray-300 rounded focus:ring-teal-500 cursor-pointer"
                  />
                  <span className="text-gray-700 select-none">Remember me</span>
                </label>
                <button
                  onClick={() => { navigate("/forgetpassword") }}
                  className="text-teal-700 font-medium hover:text-teal-800 cursor-pointer"
                >
                  Forgot password?
                </button>
              </div>

              {/* Submit */}
              <button
                type="submit"
                className="w-full bg-teal-700 hover:bg-teal-800 text-white font-semibold rounded-lg py-3 transition-colors cursor-pointer"
              >
                Create Account
              </button>
            </form>

            {/* Sign in link */}
            <div className="mt-6 text-center text-sm text-gray-500">
              Already have an account?{' '}
              <Link to="/signin" className="text-teal-700 font-medium hover:text-teal-800 cursor-pointer">Sign In</Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUpPage;

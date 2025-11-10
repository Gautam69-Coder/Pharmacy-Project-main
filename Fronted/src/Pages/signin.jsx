import { useState } from 'react';
import Logo from "../assets/logo/logo.png"
import { FaPills, FaEye, FaEyeSlash } from 'react-icons/fa';
import './css/Signin.css';
import axios from 'axios'
import { useNavigate, Link } from 'react-router-dom';
import { Button, message, Space } from 'antd';

const SignInPage = () => {
  const [messageApi, contextHolder] = message.useMessage();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    if (password.length < 8) {
      messageApi.open({
        type: 'error',
        content: 'Password must be 8 letters',
      });
      return; // Prevents further execution
    }

    const url = "https://pharmacy-project-main.onrender.com"
    axios.post(`${url}/signin`, { email, password })
      .then(result => {
        if (result.data === 'Login Successful' || result.data.message === 'Login Successful') {
          localStorage.setItem("userName", result.data.name);
          localStorage.setItem("userId", result.data.userId);
          messageApi.open({
            type: 'success',
            content: 'Register Sucessfull',
          });
          setTimeout(() => {
            navigate('/Home');
          }, 1000);
        } else {
          messageApi.open({
            type: 'error',
            content: 'Account is not Register',
          });
          return
        }
      })
      .catch(err => {
        console.log(err);
      });

    setEmail('');
    setPassword('');
    setRememberMe(false);
    setShowPassword(false);
  };

  const handleEmail = (e) => {
    setEmail(e.target.value);
  }

  const handlePassword = (e) => {
    setPassword(e.target.value);
  }

  return (
    <div>
      {contextHolder}

      <header className="flex items-center justify-between border-b border-slate-200 px-2 md:px-8 py-4 h-16 bg-white shadow-sm mb-10">
        <div className="flex items-center gap-1 md:gap-4">
          <div className="rounded-lg p-1 md:p-2">
            <img src={Logo} alt="TonicHub Logo" className="w-10 h-9" />
          </div>
          <h1 className="md:text-xl font-bold text-slate-800 text-sm">TonicHub Pharmacy</h1>
        </div>

        <nav className="hidden md:flex gap-8 text-sm font-medium text-slate-700">
          <a href="#" className="px-4 py-2 rounded-xl hover:text-indigo-600 hover:bg-indigo-50 transition-all duration-200">Home</a>
          <a href="#" className="px-4 py-2 rounded-xl hover:text-indigo-600 hover:bg-indigo-50 transition-all duration-200">About Us</a>
          <a href="#" className="px-4 py-2 rounded-xl hover:text-indigo-600 hover:bg-indigo-50 transition-all duration-200">Services</a>
          <a href="#" className="px-4 py-2 rounded-xl hover:text-indigo-600 hover:bg-indigo-50 transition-all duration-200">Contact Us</a>
        </nav>

        <div className="flex items-center gap-4 text-sm">
          <Link to='/signup'>
            <button className="rounded-lg bg-indigo-600 text-white px-2 sm:px-6 py-2.5 hover:bg-indigo-700 font-medium shadow-sm hover:shadow-md transition-all duration-200">
              Create Account
            </button>
          </Link>
        </div>
      </header>

      <div className="signin-container">
        <div className="background-pattern"></div>
        <div className="signin-card">
          <div className="signin-content">
            <div className="signin-header">
              <div className="logo-container">
                <FaPills className="logo-icon" />
              </div>
              <h1>Welcome to TonicHub Pharmacy</h1>
              <p className="subtitle">Please sign in to continue</p>
            </div>

            <form onSubmit={handleSubmit} className="signin-form">
              <div className="form-group">
                <label htmlFor="email">Email Address</label>
                <div className="input-container">
                  <input
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    required
                    value={email}
                    onChange={handleEmail}
                    placeholder="your@email.com"
                  />
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="password">Password</label>
                <div className="input-container">
                  <input
                    id="password"
                    name="password"
                    type={showPassword ? 'text' : 'password'}
                    autoComplete="current-password"
                    required
                    value={password}
                    onChange={handlePassword}
                    placeholder="••••••••"
                  />
                  <button
                    type="button"
                    className="password-toggle"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <FaEyeSlash /> : <FaEye />}
                  </button>
                </div>
              </div>

              <div className="form-options">
                <div className="remember-me">
                  <input
                    id="remember-me"
                    name="remember-me"
                    type="checkbox"
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                  />
                  <label htmlFor="remember-me">Remember me</label>
                </div>
                <Link to='/forgetpassword'>
                  <div className="forgot-password">
                    <a href="#">Forgot password?</a>
                  </div>
                </Link>
              </div>


              <button type="submit" className="signin-button">
                Sign In
              </button>

            </form>

            <div className="signin-footer">
              Don't have an account? <Link to='/signup'>Create Account</Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignInPage;
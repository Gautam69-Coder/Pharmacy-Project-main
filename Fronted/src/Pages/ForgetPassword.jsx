import { useState, useEffect } from 'react';
import Logo from "../assets/logo/logo.png"
import { FaPills, FaEye, FaEyeSlash } from 'react-icons/fa';
import { useNavigate, Link, } from 'react-router-dom';
import { Steps, message } from "antd";
import axios from "axios"

const ForgetPassword = () => {
    const [showPassword, setShowPassword] = useState(false);
    const navigate = useNavigate();
    const [messageApi, contextHolder] = message.useMessage();
    const [Confirm, setConfirm] = useState()


    const [email, setEmail] = useState("");
    const [otp, setOtp] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    useEffect(() => {
        setEmail(localStorage.getItem('email'))
    }, [])

    const url = "https://pharmacy-project-main.onrender.com"


    const handleSubmit = async () => {
        await axios.post(`${url}/forget-password`, {
            email: email,
            password: password,
        })
            .then((res) => {
                console.log(res.data)
                messageApi.success("Password Updated SuccessFully");
                navigate("/signin")
                localStorage.removeItem('email')
            })
            .catch((err) => {
                console.log(err.data)
                messageApi.success("Please create your account");
            })

    }

    const sendOTP = async () => {
        if (!email) {
            messageApi.error("Please enter your email first");
            return;
        }
        try {
            const res = await axios.post(`${url}/send-otp`, { email });
            if (res.data.success) {
                messageApi.success("OTP sent to your email");

            } else {
                messageApi.error("Failed to send OTP");

            }
        } catch (err) {
            messageApi.error("Server error while sending OTP");
        }
    };

    const verifyOTP = async () => {
        if (!otp) {
            messageApi.error("Enter OTP first");
            return;
        }
        try {
            const res = await axios.post(`${url}/verify-otp`, {
                email,
                otp,
            });
            if (res.data.success) {
                messageApi.success("OTP verified");
                setConfirm(1)
            } else {
                messageApi.error("Invalid OTP");

            }
        } catch (err) {
            messageApi.error("Server error while verifying OTP");
        }
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
                    <Link to='/signup'>
                        <button className="rounded-lg bg-indigo-600 text-white px-2 sm:px-6 py-2.5 hover:bg-indigo-700 font-medium shadow-sm hover:shadow-md transition-colors cursor-pointer">
                            Create Account
                        </button>
                    </Link>
                </div>
            </header>

            {/* Main Sign In Section */}
            <div className="flex items-center justify-center px-4">
                <div className=" w-[50vw] bg-white rounded-xl shadow-lg p-6 sm:p-8">
                    <div className="flex flex-col items-center mb-8 text-center">
                        <div className="bg-teal-100 rounded-full p-3 mb-3">
                            <FaPills className="text-teal-700 text-2xl" />
                        </div>
                        <h1 className="text-xl font-bold text-slate-800">Welcome to TonicHub Pharmacy</h1>
                        <p className="text-sm text-gray-500">Sign in to your account</p>
                    </div>

                    <div className="flex flex-col gap-6">
                        <div className='flex justify-between'>
                            {/* Email + Send OTP */}
                            <div className='flex gap-2 items-end'>
                                <div className="flex-1">
                                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
                                    <input
                                        id="email"
                                        name="email"
                                        type="email"
                                        value={email}
                                        onChange={(e) => {
                                            setEmail(e.target.value)
                                        }}
                                        placeholder="your@email.com"
                                        className="w-[18vw] border border-gray-300 rounded-lg px-4 py-3 text-base focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
                                    />
                                </div>
                                <button
                                    onClick={() => {
                                        console.log(email)
                                        sendOTP()
                                    }}
                                    type="button"
                                    className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-lg px-2 py-3 transition cursor-pointer"
                                >
                                    Send OTP
                                </button>
                            </div>

                            {/* OTP + Verify */}
                            <div className='flex gap-2 items-end'>
                                <div className="flex-1">
                                    <label htmlFor="otp" className="block text-sm font-medium text-gray-700 mb-1">Enter OTP</label>
                                    <input
                                        id="otp"
                                        name="otp"
                                        type="text"
                                        value={otp}
                                        onChange={(e) => setOtp(e.target.value)}
                                        placeholder="Enter OTP"
                                        className="w-full border border-gray-300 rounded-lg px-4 py-3 text-base focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
                                    />
                                </div>
                                <button
                                    type="button"
                                    onClick={() => {
                                        verifyOTP()
                                    }}
                                    className="bg-teal-600 hover:bg-teal-700 text-white font-semibold rounded-lg px-3 py-3 transition cursor-pointer"
                                >
                                    Verify
                                </button>
                            </div>
                        </div>


                        {/* Password */}
                        <div>
                            <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">Password</label>
                            <div className="relative">
                                <input
                                    id="password"
                                    name="password"
                                    type={showPassword ? 'text' : 'password'}
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    placeholder="••••••••"
                                    disabled={!Confirm}
                                    className={`w-full border ${Confirm ? "" : "bg-gray-200 cursor-not-allowed"} border-gray-300 rounded-lg px-4 py-3 pr-10 text-base focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500`}
                                />
                                <button
                                    type="button"
                                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-teal-700 transition-colors cursor-pointer"
                                    onClick={() => setShowPassword(!showPassword)}
                                >
                                    {showPassword ? <FaEyeSlash /> : <FaEye />}
                                </button>
                            </div>
                        </div>

                        {/* Confirm Password */}
                        <div>
                            <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-1">Confirm Password</label>
                            <input
                                id="confirmPassword"
                                name="confirmPassword"
                                type={showPassword ? 'text' : 'password'}
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                placeholder="••••••••"
                                disabled={!Confirm}
                                className={`w-full border ${Confirm ? "" : "bg-gray-200 cursor-not-allowed"} border-gray-300 rounded-lg px-4 py-3 pr-10 text-base focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500`}

                            />
                        </div>




                        <button
                            type="submit"
                            className="w-full bg-teal-700 hover:bg-teal-800 text-white font-semibold rounded-lg py-3 transition-colors cursor-pointer"
                            onClick={() => {
                                handleSubmit()
                            }}
                        >
                            Forget Password
                        </button>
                    </div>


                    <div className="mt-6 text-center text-sm text-gray-500">
                        Don't have an account?{' '}
                        <Link to='/signup' className="text-teal-700 font-medium hover:text-teal-800 cursor-pointer">Create Account</Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ForgetPassword;

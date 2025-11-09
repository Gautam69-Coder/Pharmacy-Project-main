import React, { useState } from 'react';
import axios from 'axios'
import {
  MapPinIcon,
  PhoneIcon,
  EnvelopeIcon,
  ClockIcon,
  UserIcon,
  ChatBubbleLeftRightIcon,
  PaperAirplaneIcon
} from '@heroicons/react/24/outline';
import { Button, Drawer, message } from 'antd';
import { SmileOutlined } from '@ant-design/icons';
import { notification } from 'antd';


const ContactUs = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });

 const url = "https://pharmacy-project-main.onrender.com"

  const [api, contextHolder] = notification.useNotification();

  const [orderdata, setorderdata] = useState([])
  const [accept, setaccept] = useState(0)



  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const openNotification = () => {
    api.open({
      message: 'FeedBack',
      description:
        'Thank you for your feedback! We really appreciate your time and effort in helping us improve.', showProgress: true,
      icon: <SmileOutlined style={{ color: '#108ee9' }} />,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('Form submitted:', formData);

    await axios.get(`${url}/feedback`, {
      params: {
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        subject: formData.subject,
        message: formData.message,
      }
    }
    )
      .then(res => console.log(res.data))
      .catch(err => console.log(err.data))
  };

  const [open, setOpen] = useState(false);
  const showDrawer = () => {
    setOpen(true);
  };
  const onClose = () => {
    setOpen(false);
  };


  const handleOrder = async () => {
    await axios.get(`${url}/orderdata`)
      .then(res => { setorderdata(res.data),console.log(res.data) })
      .catch(err => { console.log(err) })
  }

  const handleProduct = () => {
    console.log('Product')
  }

  const handleDelivery = () => {
    console.log('Delivery')
  }

  const handleSupport = () => {
    console.log('Supprot')
  }

  return (
    <div className="min-h-screen bg-gradient-to-br py-12 px-4 sm:px-6 lg:px-8 mt-[6%]">
      {contextHolder}
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Contact <span className="text-blue-600">TonicHub Pharmacy</span>
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            We're here to help with all your healthcare needs. Get in touch with us for any queries or assistance.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Contact Information */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow-lg p-6 h-fit">
              <div className='mb-8'>
                <h2 className="text-2xl font-semibold text-gray-900 mb-6">Get in Touch</h2>
                <Button type="primary" onClick={showDrawer}
                >
                  <span><img src="/src/assets/icons/help-desk.png" className='w-4' alt="" /></span>
                  <span>Chat Help</span>
                </Button>
              </div>

              <Drawer
  title="Customer Support"
  closable={{ 'aria-label': 'Close Help' }}
  onClose={onClose}
  open={open}
  width={520}
  className="pharmacy-help-drawer"
>
  <div className="flex flex-col h-full">
    {/* Header Section */}
    <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-4 mb-6 border border-blue-100">
      <div className="flex items-center gap-3 mb-3">
        <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center">
          <span className="text-white font-bold text-lg">T</span>
        </div>
        <div>
          <h3 className="font-semibold text-gray-800 text-lg">TonicHub Support</h3>
          <p className="text-sm text-gray-600">We're here to help you 24/7</p>
        </div>
      </div>
      <div className="bg-white rounded-lg p-3 shadow-sm border-l-4 border-l-blue-500">
        <p className="text-gray-700 font-medium">Hello! Welcome to TonicHub Pharmacy. How can I assist you today?</p>
      </div>
    </div>

    {/* Main Content Area */}
    <div className="flex-1 bg-gray-50 rounded-xl p-4 mb-6 overflow-y-auto">
      {/* Quick Help Options */}
      <div className="grid grid-cols-2 gap-3 mb-6">
        <button 
          onClick={() => { handleOrder(); setaccept(1); }}
          className="bg-white hover:bg-blue-50 border border-gray-200 hover:border-blue-300 rounded-lg p-4 text-left transition-all duration-200 group"
        >
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center group-hover:bg-blue-200 transition-colors">
              <span className="text-xl">📦</span>
            </div>
            <div>
              <h4 className="font-semibold text-gray-800 text-sm">Order Status</h4>
              <p className="text-xs text-gray-500">Track your orders</p>
            </div>
          </div>
        </button>

        <button 
          onClick={() => { handleDelivery(); }}
          className="bg-white hover:bg-green-50 border border-gray-200 hover:border-green-300 rounded-lg p-4 text-left transition-all duration-200 group"
        >
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center group-hover:bg-green-200 transition-colors">
              <span className="text-xl">🗺️</span>
            </div>
            <div>
              <h4 className="font-semibold text-gray-800 text-sm">Delivery Info</h4>
              <p className="text-xs text-gray-500">Shipping details</p>
            </div>
          </div>
        </button>

        <button 
          onClick={() => { handleProduct(); }}
          className="bg-white hover:bg-purple-50 border border-gray-200 hover:border-purple-300 rounded-lg p-4 text-left transition-all duration-200 group"
        >
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center group-hover:bg-purple-200 transition-colors">
              <span className="text-xl">🔍</span>
            </div>
            <div>
              <h4 className="font-semibold text-gray-800 text-sm">Product Enquiry</h4>
              <p className="text-xs text-gray-500">Medicine details</p>
            </div>
          </div>
        </button>

        <button 
          onClick={() => { handleSupport(); }}
          className="bg-white hover:bg-orange-50 border border-gray-200 hover:border-orange-300 rounded-lg p-4 text-left transition-all duration-200 group"
        >
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-orange-100 rounded-lg flex items-center justify-center group-hover:bg-orange-200 transition-colors">
              <span className="text-xl">💬</span>
            </div>
            <div>
              <h4 className="font-semibold text-gray-800 text-sm">General Support</h4>
              <p className="text-xs text-gray-500">Other questions</p>
            </div>
          </div>
        </button>
      </div>

      {/* Dynamic Content Area */}
      {accept == 1 && (
        <div className="bg-white rounded-lg border border-gray-200 p-4 mb-4">
          <h5 className="font-semibold text-gray-800 mb-3 flex items-center gap-2">
            <span className="text-blue-500">📋</span>
            Your Orders
          </h5>
          <div className="space-y-2">
            {orderdata.map((order, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div>
                  <p className="font-medium text-gray-800">{order.name}</p>
                  <p className="text-sm text-gray-500">Order ID: #{order.id || `ORD${index + 1}`}</p>
                </div>
                <span className="px-2 py-1 bg-green-100 text-green-700 text-xs rounded-full font-medium">
                  In Transit
                </span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Status Update */}
      <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-lg border border-green-200 p-4">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
            <span className="text-white text-sm">✓</span>
          </div>
          <div>
            <h5 className="font-semibold text-green-800">Order Update</h5>
            <p className="text-green-700 text-sm">Your order is on the way and will be delivered soon!</p>
          </div>
        </div>
      </div>
    </div>

    {/* Footer Section */}
    <div className="bg-white border-t border-gray-200 p-4 rounded-b-xl">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2 text-sm text-gray-600">
          <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
          Support team online
        </div>
        <button className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg text-sm font-medium transition-colors">
          Chat with Agent
        </button>
      </div>
    </div>
  </div>
</Drawer>


              {/* Address */}
              <div className="flex items-start space-x-4 mb-6">
                <div className="flex-shrink-0">
                  <MapPinIcon className="h-6 w-6 text-blue-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">Address</h3>
                  <p className="text-gray-600 mt-1">
                    Shop No. 15, Ground Floor<br />
                    Andheri West, Mumbai<br />
                    Maharashtra, India - 400058
                  </p>
                </div>
              </div>

              {/* Phone */}
              <div className="flex items-start space-x-4 mb-6">
                <div className="flex-shrink-0">
                  <PhoneIcon className="h-6 w-6 text-blue-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">Phone</h3>
                  <p className="text-gray-600 mt-1">+91 98765 43210</p>
                  <p className="text-gray-600">+91 22 2674 8901</p>
                </div>
              </div>

              {/* Email */}
              <div className="flex items-start space-x-4 mb-6">
                <div className="flex-shrink-0">
                  <EnvelopeIcon className="h-6 w-6 text-blue-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">Email</h3>
                  <p className="text-gray-600 mt-1">info@tonichubpharmacy.com</p>
                  <p className="text-gray-600">orders@tonichubpharmacy.com</p>
                </div>
              </div>

              {/* Operating Hours */}
              <div className="flex items-start space-x-4 mb-6">
                <div className="flex-shrink-0">
                  <ClockIcon className="h-6 w-6 text-blue-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">Operating Hours</h3>
                  <div className="text-gray-600 mt-1 space-y-1">
                    <p>Monday - Saturday: 8:00 AM - 10:00 PM</p>
                    <p>Sunday: 9:00 AM - 9:00 PM</p>
                    <p className="text-green-600 font-medium">24/7 Emergency Services Available</p>
                  </div>
                </div>
              </div>

              {/* Emergency Notice */}
              <div className="bg-red-50 border border-red-200 rounded-lg p-4 mt-6">
                <h4 className="font-semibold text-red-800">Emergency Services</h4>
                <p className="text-red-700 text-sm mt-1">
                  For urgent medicine requirements, call our emergency hotline:
                  <span className="font-semibold"> +91 98765 00000</span>
                </p>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-xl shadow-lg p-8">
              <div className="flex items-center space-x-3 mb-6">
                <ChatBubbleLeftRightIcon className="h-7 w-7 text-blue-600" />
                <h2 className="text-2xl font-semibold text-gray-900">Send us a Message</h2>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                      Full Name *
                    </label>
                    <div className="relative">
                      <input
                        type="text"
                        id="name"
                        name="name"
                        required
                        value={formData.name}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 pl-12 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                        placeholder="Enter your full name"
                      />
                      <UserIcon className="h-5 w-5 text-gray-400 absolute left-4 top-4" />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                      Email Address *
                    </label>
                    <div className="relative">
                      <input
                        type="email"
                        id="email"
                        name="email"
                        required
                        value={formData.email}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 pl-12 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                        placeholder="Enter your email"
                      />
                      <EnvelopeIcon className="h-5 w-5 text-gray-400 absolute left-4 top-4" />
                    </div>
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
                      Phone Number
                    </label>
                    <div className="relative">
                      <input
                        type="tel"
                        id="phone"
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 pl-12 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                        placeholder="+91 98765 43210"
                      />
                      <PhoneIcon className="h-5 w-5 text-gray-400 absolute left-4 top-4" />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-2">
                      Subject *
                    </label>
                    <select
                      id="subject"
                      name="subject"
                      required
                      value={formData.subject}
                      onChange={handleInputChange}
                      className="w-full px-2  py-3  border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                    >
                      <option value="">Select a subject</option>
                      <option value="prescription">Prescription Inquiry</option>
                      <option value="product">Product Availability</option>
                      <option value="delivery">Home Delivery</option>
                      <option value="insurance">Insurance Claims</option>
                      <option value="complaint">Complaint</option>
                      <option value="general">General Inquiry</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                    Message *
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    required
                    rows={6}
                    value={formData.message}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 resize-none"
                    placeholder="Please describe your inquiry in detail..."
                  ></textarea>
                </div>

                <button
                  type="submit"
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors duration-200 flex items-center justify-center space-x-2 shadow-lg hover:shadow-xl"
                >
                  <PaperAirplaneIcon className="h-5 w-5" />
                  <span onClick={() => {
                    openNotification()
                  }}>Send Message</span>
                </button>
              </form>
            </div>
          </div>
        </div>

        {/* Additional Services */}
        <div className="mt-12 grid md:grid-cols-3 gap-6">
          <div className="bg-white rounded-lg shadow-md p-6 text-center">
            <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <PhoneIcon className="h-6 w-6 text-blue-600" />
            </div>
            <h3 className="font-semibold text-gray-900 mb-2">Phone Orders</h3>
            <p className="text-gray-600 text-sm">Call us to place your medicine orders over the phone</p>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6 text-center">
            <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <MapPinIcon className="h-6 w-6 text-green-600" />
            </div>
            <h3 className="font-semibold text-gray-900 mb-2">Home Delivery</h3>
            <p className="text-gray-600 text-sm">Free home delivery for orders above ₹500 in Mumbai</p>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6 text-center">
            <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <ClockIcon className="h-6 w-6 text-purple-600" />
            </div>
            <h3 className="font-semibold text-gray-900 mb-2">Quick Service</h3>
            <p className="text-gray-600 text-sm">Average response time of 2 hours for all inquiries</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactUs;

import React from 'react'
import { Route, Routes, useLocation } from 'react-router-dom'
import Landing from './Pages/Landing'
import SignIn from './Pages/Signin'
import SignUp from './Pages/Signup'
import Home from './Pages/Home'
import Category from './Pages/Menu_Pages/Category'
import Practice from './Pages/Practice'
import Medicines from './Pages/Medicine'
import Navbar from './Components/Navbar'
import Must_Have from './Pages/Menu_Pages/Category_Pages/Must_Have'
import Skin_Care from './Pages/Menu_Pages/Category_Pages/Skin_Care'
import Ayurvedic from './Pages/Menu_Pages/Category_Pages/Ayurvedic'
import Sport from './Pages/Menu_Pages/Category_Pages/Sport_Nutrition'
import Diabetes_Essential from './Pages/Menu_Pages/Category_Pages/Diabetes_Essentials'
import Health_Care_Devices from './Pages/Menu_Pages/Category_Pages/Health_Care_Devices'
import Health_Care from './Pages/Menu_Pages/Category_Pages/Health_Care'
import Vitamin from './Pages/Menu_Pages/Category_Pages/Vitamin'
import Personal_Care from './Pages/Menu_Pages/Category_Pages/Personal_Care'
import Food_Drinks from './Pages/Menu_Pages/Category_Pages/Food_Drinks'
import Cart from './Pages/cart'
import ProductDetails from './Pages/ProductPage/ProductDetials'
import MedicalBlog from './Pages/Menu_Pages/Blogs'
import PharmEasyPlusPage from './Pages/Menu_Pages/Plus'
import Searchpro from './Components/searchpro'
import Address from './Pages/Address'
import Contactus from './Components/Contactus'
import OrderHistory from './Pages/OrderHistory'
import DoctorConsult from './Pages/Menu_Pages/DoctorConsul'
import Success from './Pages/Success'
import OrderDetail from './Pages/OrderDetail'
import ForgetPassword from './Pages/ForgetPassword'
import Doctors from './Pages/Menu_Pages/Doctors'
import PharmacyAboutUs from './Pages/About'

const App = () => {
  const location = useLocation();
  const showNavbar = ['/Home', '/Medicines','/Blogs','/PLUS','/DoctorConsult','/searchpro','/cart/address/','/Home/ContactUs/','/Home/Order',
    '/Doctors'
  ].includes(location.pathname);

  return (
    <div style={{ fontFamily: 'Poppins,sans-serif' }}
    
    >
      <Routes>
        <Route path='/' element={<Landing />} />
        <Route path='/signin' element={<SignIn />} />
        <Route path='/signup' element={<SignUp />} />
        <Route path='/forgetpassword' element={<ForgetPassword />} />
        <Route path='/practice' element={<Practice />} />
        <Route path='/about' element={<PharmacyAboutUs />} />
      </Routes>

      {showNavbar && <Navbar />}

      <Routes>
        {/* Navbar Routes */}
        <Route path='/cart' element={<Cart />} />
        <Route path='/cart/address/' element={<Address />} />
        <Route path='/Home/ContactUs/' element={<Contactus />} />
        <Route path='/Home/Order' element={<OrderHistory />} />
        <Route path='/Doctors' element={<Doctors />} />


        {/* Menubar Routes */}
        <Route path='/Home' element={<Home />} />
        <Route path='/Medicines' element={<Medicines />} />
        <Route path='/Blogs' element={<MedicalBlog />} />
        <Route path='/PLUS' element={<PharmEasyPlusPage />} />
        <Route path='/DoctorConsult' element={<DoctorConsult />} />

        {/* Category Routes */}
        <Route path='/Category' element={<Category />} />
        <Route path='/Category/MustHaves' element={<Must_Have />} />
        <Route path='/Category/SkinCare' element={<Skin_Care />} />
        <Route path='/Category/AyurvedicCare' element={<Ayurvedic />} />
        <Route path='/Category/SportsNutrition' element={<Sport />} />
        <Route path='/Category/DiabetesEssentials' element={<Diabetes_Essential />} />
        <Route path='/Category/HealthCareDevices' element={<Health_Care_Devices />} />
        <Route path='/Category/HealthCare' element={<Health_Care />} />
        <Route path='/Category/Viatmins' element={<Vitamin />} />
        <Route path='/Category/PersonalCare' element={<Personal_Care />} />
        <Route path='/Category/HealthFoodandDrinks' element={<Food_Drinks />} />

        {/* Product Detail Page */}
        <Route path='/product/:id' element={<ProductDetails />} />
        <Route path='/orderdetail/:id' element={<OrderDetail />} />

        {/* search */}
        <Route path='/searchpro' element={<Searchpro/>} />


        {/* Payment Route */}
        <Route path='/success' element={<Success/>} />
      </Routes>
    </div>
  );
};

export default App

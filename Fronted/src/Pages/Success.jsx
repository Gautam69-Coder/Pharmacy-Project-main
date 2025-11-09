import React, { useEffect, useState } from "react";
import Lottie from "lottie-react";
import animationData from "../assets/shopping_cart.json";
import Success_Animation from "../assets/Success.json";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Success = () => {
  const [showCartAnimation, setShowCartAnimation] = useState(true);
  const navigate = useNavigate();
  const [order, setorder] = useState([]);



  useEffect(() => {
    const timer = setTimeout(() => {
      setShowCartAnimation(false);
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

 const url="http://localhost:3000"
  useEffect(() => {
    axios
      .get(`${url}/prodata`)
      .then((res) => {
        setorder(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const Send_Order = async () => {
    try {
      const now = new Date();

      const date = now.toISOString().slice(0, 10) //use foe current date
      const time = now.toTimeString().slice(0, 8)

      console.log(typeof (date))
      console.log(typeof (time))

      localStorage.setItem("your_time", time)
      localStorage.setItem("your_date", date)
      const payment = localStorage.getItem('MOD')
      console.log(payment)
      const fullname = localStorage.getItem("fullname")
      const phonenumber = localStorage.getItem("phonenumber")
      const pincode = localStorage.getItem("pincode")
      const email = localStorage.getItem("email")
      const address = localStorage.getItem("address")
      const city = localStorage.getItem("city")
      const state = localStorage.getItem("state")
      const total = localStorage.getItem("finalprice")
      const coupon = localStorage.getItem("Coupon")
      const devliverdate = localStorage.getItem("DeliveryDate")
      console.log(devliverdate)
      // const username=localStorage.getItem("userName")

      console.log(state)

      const update = order.map((o) => ({
        ...o,
        date,
        time,
        payment,
        fullname,
        phonenumber,
        pincode,
        email,
        address,
        city,
        state,
        total,
        coupon,
        devliverdate
        // username         
      }))
      const res = await axios.post(`${url}/orders`, {
        orders: update,
      });
      console.log(res.data);
    } catch (err) {
      console.log(err.message);
    }
  };





  useEffect(() => {
    if (!showCartAnimation && order.length > 0) {
      const timer = setTimeout(async () => {
        try {
          await Send_Order();
        } catch (err) {
          console.log("Order failed, but redirecting...", err.message);
        } finally {
          navigate("/Home");
        }
      }, 2300);
      return () => clearTimeout(timer);
    }
  }, [showCartAnimation, order]);

  return (
    <div className="flex flex-col justify-center items-center h-[90vh] text-2xl font-bold">
      {showCartAnimation ? (
        <div className="w-[40vw] ">
          <Lottie animationData={animationData} />
        </div>
      ) : (
        <div className="flex flex-col justify-center items-center">
          <div className="w-[30vw]">
            <Lottie animationData={Success_Animation} loop={false} />
          </div>
        </div>
      )}
    </div>
  );
};

export default Success;

import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import Navbar from '../Components/Navbar.jsx';
import { Steps } from 'antd';
const description = 'This is a description.';


const OrderDetail = () => {
  const [order, setOrder] = useState(null);
  const { id } = useParams();
  const [FormateDate, setFormateDate] = useState()
  const [Shipped, setShipped] = useState()
  const [Deliverd, setDeliverd] = useState()
  const [address, setaddress] = useState([])
  const randomNumber = Math.floor(Math.random() * 3) + 1;



  useEffect(() => {
    const fetchOrder = async () => {
      try {
        const res = await axios.get(`${url}/orderdata/${id}`);
        setOrder(res.data);
        const date = new Date(res.data.date);
        date.setDate(date.getDate() + 0);
        const FormateDat = date.toLocaleDateString("en-US", {
          month: "long",
          day: "numeric"
        });
        setFormateDate(FormateDat)
        const shippeddate = new Date(FormateDat);
        shippeddate.setDate(shippeddate.getDate() + 3);
        const ShippedDate = shippeddate.toLocaleDateString("en-US", {
          month: "long",
          day: "numeric"
        });
        setShipped(ShippedDate)
        const deliverd = new Date(ShippedDate);
        deliverd.setDate(deliverd.getDate() + 3);
        const Delivery = deliverd.toLocaleDateString("en-US", {
          month: "long",
          day: "numeric"
        });
        setDeliverd(Delivery)
      } catch (err) {
        console.error("Error fetching order details:", err);
      }
    };
    fetchOrder();
  }, [id]);



  if (!order) {
    return (
      <div className="text-center text-gray-500 mt-20">
        Loading order details...
      </div>
    );
  }

  return (

    <div>
      <Navbar />
      <div className="max-w-5xl mx-auto p-6 mt-16 space-y-6">
        {/* Order Status */}
        <div className="bg-white rounded-xl shadow-md border border-gray-200 p-6">
          <h2 className="text-lg font-bold text-gray-800">Order Status</h2>
          <div className="flex items-center justify-between mt-4">
            <Steps
              current={2}
              items={[
                {
                  title: 'Order Confirmed',
                  description: FormateDate
                },
                {
                  title: 'Shipped',
                  description: Shipped

                },
                {
                  title: 'Deliveried Date',
                  description: Deliverd,
                },
              ]}
            />
          </div>
        </div>

        {/* Order Summary */}
        <div className="bg-white rounded-xl shadow-md border border-gray-200 p-6">
          <h2 className="text-lg font-bold text-gray-800">Order Summary</h2>
          <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-gray-700">
            <p>
              <strong>Order ID:</strong> #{order._id}
            </p>
            <p>
              <strong>Date:</strong> {order.date}
            </p>
            <p>
              <strong>Time:</strong> {order.time}
            </p>
            <p>
              <strong>Payment Method:</strong> {order.payment}
            </p>
            <p>
              <strong>Total Amount:</strong> ₹{order.price + 49}
            </p>
          </div>
        </div>

        {/* Delivery Address */}
        <div className="bg-white rounded-xl shadow-md border border-gray-200 p-6">
          <h2 className="text-lg font-bold text-gray-800">Delivery Address</h2>
          <div className="mt-4 text-sm text-gray-700">
            <p>{order.fullname}</p>
            <p>{order.pincode}</p>
            <p>
              {order.city}, {order.state} -{" "}
              {order.address}
            </p>
            <p>Phone: {order.phonenumber}</p>
          </div>
        </div>

        {/* Ordered Items */}
        <div className="bg-white rounded-xl shadow-md border border-gray-200 p-6">
          <h2 className="text-lg font-bold text-gray-800">Ordered Items</h2>
          <div className="mt-4 divide-y">

            <div
              className="flex flex-col md:flex-row bg-white rounded-lg shadow-md transition-all hover:scale-102  p-4 "
            >
              <div className="w-24 h-24 border-cyan-50 rounded-md overflow-hidden bg-gray-50">
                <img
                  src={order.image}
                  alt={order.name}
                  className="w-full h-full object-contain"
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src =
                      "https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/1aaf6ee4-6a23-4201-9f19-15223e1f10c0.png";
                  }}
                />
              </div>

              {/* Product Details */}
              <div className="flex-1 md:ml-4 flex flex-col justify-between">
                <div>
                  <h3 className="text-lg font-semibold">{order.name}</h3>
                  <p className="text-sm text-gray-500">
                    {order.description || "No description"}
                  </p>
                </div>

                <div className="flex items-center space-x-4 mt-3">
                  <span className="text-lg font-semibold text-gray-900">
                    ₹{(order.price)}
                  </span>
                  <span className="line-through text-gray-400">
                    ₹{order.previous_mrp}
                  </span>
                  <span className="text-green-600 font-semibold">
                    {order.discount} OFF
                  </span>
                </div>
              </div>

              {/* Quantity & Remove */}
              <div className="mt-4 md:mt-0 flex flex-col justify-between items-end">
                <button
                  
                  className="text-gray-400 hover:text-red-500"
                  aria-label="Remove"
                >
                 
                </button>
                
              </div>
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="bg-white rounded-xl shadow-md border border-gray-200 p-6 flex flex-wrap gap-4">
          <button className="px-4 py-2 text-sm bg-green-600 text-white rounded-lg hover:bg-green-700">
            Reorder
          </button>
          <button className="px-4 py-2 text-sm border rounded-lg hover:bg-gray-100">
            Download Invoice
          </button>
          {order.status === "Delivered" && (
            <button className="px-4 py-2 text-sm border rounded-lg text-red-600 hover:bg-red-50">
              Return / Replace
            </button>
          )}
          {order.status !== "Cancelled" && order.status !== "Delivered" && (
            <button className="px-4 py-2 text-sm border rounded-lg text-red-600 hover:bg-red-50">
              Cancel Order
            </button>
          )}
        </div>
      </div>

    </div>
  );
};

export default OrderDetail;

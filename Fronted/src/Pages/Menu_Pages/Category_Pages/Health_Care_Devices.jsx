import React, { useState, useEffect } from "react";
import Navbar from "../../../Components/Navbar";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { message } from "antd";

const Health_Care_Devices = () => {
  const navigate = useNavigate();
  const [must_have, setMust_Have] = useState([]);
  const [addedItems, setAddedItems] = useState({});
  const [messageApi, contextHolder] = message.useMessage();
  const url = "https://pharmacy-project-main.onrender.com"

  // Fetch products and check already added cart items
  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch products
        const productsRes = await axios.get(
          `${url}/health_care_devices`
        );
        setMust_Have(productsRes.data);

        const username = localStorage.getItem("userName");
        if (!username) return;

        // Fetch cart
        const cartRes = await axios.get(
          `${url}/cart?username=${username}`
        );

        const addedMap = {};
        cartRes.data.forEach((item) => {
          const index = productsRes.data.findIndex((p) => p.name === item.name);
          if (index !== -1) {
            addedMap[index] = true;
          }
        });

        setAddedItems(addedMap);
      } catch (err) {
        console.error(err);
        messageApi.open({
          type: "error",
          content: "Failed to load products or cart.",
        });
      }
    };

    fetchData();
  }, []);

  // Add a product to the cart
  const handleAddToCart = (index) => {
    const product = must_have[index];
    const cartItem = {
      id: product.id,
      username: localStorage.getItem("userName"),
      name: product.name,
      price: product.price,
      description: product.description,
      discount: product.discount,
      previous_mrp: product.previous_mrp,
      image: product.image,
    };

    axios
      .post(`${url}/qty`, cartItem)
      .then((res) => {
        if (res.data.message === "Item already in cart") {
          messageApi.open({
            type: "error",
            content: "Item already added to cart",
          });
          return;
        }
        setAddedItems((prev) => ({ ...prev, [index]: true }));
        messageApi.open({
          type: "success",
          content: "Item added to cart",
        });
      })
      .catch(() => {
        messageApi.open({
          type: "error",
          content: "Failed to add item to cart. Please try again.",
        });
      });
  };

  // Navigate to product page
  const handleItemClick = (id) => {
    navigate(`/product/${id}`);
  };

  return (
    <div>
      {contextHolder}
      <Navbar />

      <div className="mt-[6%] mb-[6%] flex flex-col items-center justify-center">
        <div className="flex justify-center p-2 text-3xl font-bold">
          <div className="p-4 mb-8 w-80 text-center text-[#1447e6]">
            Health Care Devices
          </div>
        </div>

        <div className="flex flex-wrap w-[70vw] justify-center gap-20">
          {must_have.map((p, index) => (
            <div
              key={index}
              onClick={() => handleItemClick(p.id)}
              className="min-w-[260px] max-w-[260px] bg-white rounded-2xl shadow-md hover:shadow-xl transform hover:scale-105 transition-all duration-300 cursor-pointer flex flex-col select-none relative"
            >
              {/* Discount Badge */}
              <div className="absolute top-3 left-3 z-10 bg-emerald-600 text-white px-3 py-1 rounded-tr-xl rounded-bl-xl text-xs font-semibold shadow">
                {p.discount}
              </div>

              {/* Product Image */}
              <div className="relative h-40 flex justify-center items-center p-4   rounded-t-2xl">
                <img
                  src={p.image}
                  alt={p.name}
                  className="w-[160px] h-[160px] object-contain"
                />
              </div>

              {/* Product Details */}
              <div className="flex flex-col flex-grow p-4">
                <div className="h-[85px]">
                  <h3 className="text-lg font-semibold text-gray-800 mb-2 leading-snug">
                    {p.name}
                  </h3>
                </div>

                <hr className="my-2 border-gray-200" />

                <div className="text-sm text-teal-600 font-medium mb-3">
                  MRP{" "}
                  <span className="line-through text-gray-400">
                    ₹{p.previous_mrp}
                  </span>
                </div>

                <div className="mt-auto flex justify-between items-center">
                  <span className="text-xl font-bold text-gray-900">
                    ₹{p.price}
                  </span>

                  {!addedItems[index] ? (
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleAddToCart(index);
                      }}
                      className="text-[#1B69DE] bg-[#E7F6FF] border border-[#1B69DE] px-5 py-2 rounded-full font-semibold transition-colors duration-300 hover:bg-[#1B69DE] hover:text-white"
                    >
                      Add to Cart
                    </button>
                  ) : (
                    <button
                      onClick={(e) => e.stopPropagation()}
                      className="text-white bg-[#1B69DE] border border-[#1B69DE] px-5 py-2 rounded-full font-semibold"
                    >
                      Item added
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Health_Care_Devices;

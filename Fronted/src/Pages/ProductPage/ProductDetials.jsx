import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { message } from "antd";
import { useRef } from 'react';
import { useNavigate } from "react-router-dom";
import { Star } from "lucide-react";
import Navbar from '../../Components/Navbar'

function Trending() {
  const { id } = useParams();
  const shortID = id.slice(0, 3)
  const [CID, setCID] = useState(shortID)
  const [Category, setCategory] = useState("")
  const scrollRef = useRef(null);
  const [CrousalCategory, setCrousalCategory] = useState("")

  //Product Carsoul
  const scroll = (direction) => {
    const amount = 300;
    if (scrollRef.current) {
      scrollRef.current.scrollBy({
        left: direction === "left" ? -amount : amount,
        behavior: "smooth",
      });
    }
  };

  const navigate = useNavigate();
  const [newlaunches, setNew_Launches] = useState([]);
  const [addedItems, setAddedItems] = useState({});
  const [messageApi, contextHolder] = message.useMessage();

  useEffect(() => {
    if (CID === "HCD") {
      setCategory("health_care_devices")
      setCrousalCategory("Health Care Devies")

    }
    else if (CID === "MH0") {
      setCategory("must_have")
      setCrousalCategory("Must Have")

    }
    else if (CID === "SC0") {
      setCategory("skin_care")
      setCrousalCategory("Skin Care")

    }
    else if (CID === "SN0") {
      setCategory("sport_nutrition")
      setCrousalCategory("Sport Nutrition")

    }
    else if (CID === "AY0") {
      setCategory("ayurvedic")
      setCrousalCategory("Ayurvedic")

    }
    else if (CID === "DE0") {
      setCategory("diabetes_essentials")
      setCrousalCategory("Diabetes Essential")

    }
    else if (CID === "HC0") {
      setCategory("health_care")
      setCrousalCategory("Health Care ")

    }
    else if (CID === "VIT") {
      setCategory("vitamin")
      setCrousalCategory("Vitamin")

    }
    else if (CID === "PC0") {
      setCategory("personal_care")
      setCrousalCategory("Personal Cre")

    }
    else if (CID === "FD0") {
      setCategory("food_drinks")
      setCrousalCategory("Food Drink")

    }
  }, [CID])

  useEffect(() => {
    if (Category) {
      console.log("Category set:", Category);
    }
  }, [Category]);



  const url = "http://localhost:3000"


  //Item Added Button show if already item in cart
  useEffect(() => {


    const fetchData = async () => {
      try {

        const productsRes = await axios.get(`${url}/${Category}`);
        console.log(`This is ${Category}`)
        setNew_Launches(productsRes.data);

        const username = localStorage.getItem("userName");
        if (!username) return;

        const cartRes = await axios.get(
          `${url}/cart?username=${username}`
        );

        const addedMap = {};
        cartRes.data.forEach((item) => {
          const index = productsRes.data.findIndex(
            (p) => p.name === item.name
          );
          if (index !== -1) {
            addedMap[index] = true;
          }
        });

        setAddedItems(addedMap);
      }
      catch (err) {
        console.error(err);
      }
    };

    fetchData();
  }, [Category]);



  //Added item in cart
  const handleAddToCart = (index) => {
    const product = newlaunches[index];
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
      })
      .catch((err) => {
        messageApi.open({
          type: "error",
          content: "Failed to add item to cart. Please try again.",
        });
      });
  };

  //Go to that product page use id
  const handleItemClick = (id) => {
    navigate(`/product/${id}`);
  };

  return (
    <div>
      {contextHolder}
      <div className="mb-2">
        <h1 className="text-2xl mx-14 mt-5 font-bold p-0 m-0">{CrousalCategory}</h1>
      </div>
      <div className="flex justify-center">
        <div className="relative w-[96%]">
          {/* Left Scroll Button */}
          <button
            onClick={() => scroll("left")}
            aria-label="Scroll Left"
            className="absolute -left-6 top-1/2 z-30 -translate-y-1/2 bg-white shadow-md w-12 h-12 rounded-full text-gray-600 flex items-center justify-center transition-transform duration-300 hover:scale-110 hover:bg-gray-100"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
              viewBox="0 0 24 24"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <polyline points="15 18 9 12 15 6" />
            </svg>
          </button>

          {/* Left blur */}
          <div
            className="pointer-events-none absolute left-0 top-0 h-full w-10 z-20"
            style={{
              background:
                "  ",
            }}
          />

          {/* Scrollable container */}
          <div
            ref={scrollRef}
            className="flex overflow-x-auto scroll-smooth gap-6 p-3 no-scrollbar mx-7"
          >
            {newlaunches.map((nl, index) => (
              <div
                key={nl.id}
                onClick={() => handleItemClick(nl.id)}
                className="min-w-[260px] max-w-[260px] bg-white rounded-2xl shadow-md hover:shadow-xl transform hover:scale-105 transition-all duration-300 cursor-pointer flex flex-col select-none relative"
              >
                {/* Discount Badge */}
                <div className="absolute top-3 left-3 z-10 bg-emerald-600 text-white px-3 py-1 rounded-tr-xl rounded-bl-xl text-xs font-semibold shadow">
                  {nl.discount}
                </div>

                {/* Product Image */}
                <div className="relative h-40 flex justify-center items-center p-4   rounded-t-2xl">
                  <img
                    src={nl.image}
                    alt={nl.name}
                    className="w-[160px] h-[160px] object-contain"
                  />
                </div>

                {/* Product Content */}
                <div className="flex flex-col flex-grow p-4">
                  <div className="h-[85px]">
                    <h3 className="text-lg font-semibold text-gray-800 mb-2 leading-snug">
                      {nl.name}
                    </h3>
                  </div>

                  <hr className="my-2 border-gray-200" />

                  <div className="text-sm text-teal-600 font-medium mb-3">
                    MRP{" "}
                    <span className="line-through text-gray-400">
                      ₹{nl.previous_mrp}
                    </span>
                  </div>

                  <div className="mt-auto flex justify-between items-center">
                    <span className="text-xl font-bold text-gray-900">
                      ₹{nl.price}
                    </span>

                    {!addedItems[index] ? (
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleAddToCart(index);
                        }}
                        className="w-28 h-10 text-[#1B69DE] bg-[#E7F6FF] border border-[#1B69DE] rounded-full font-semibold transition-all duration-300 hover:bg-[#1B69DE] hover:text-white"
                      >
                        Add to Cart
                      </button>
                    ) : (
                      <button
                        className="w-28 h-10 text-white border border-[#1B69DE] rounded-full font-semibold transition-all duration-300 bg-[#1B69DE]"
                        onClick={(e) => {
                          e.stopPropagation();
                        }}
                      >
                        Item added
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Right blur */}
          <div
            className="pointer-events-none absolute right-0 top-0 h-full w-12 z-20"
            style={{
              background:
                "   ",
            }}
          />

          {/* Right Scroll Button */}
          <button
            onClick={() => scroll("right")}
            aria-label="Scroll Right"
            className="absolute -right-6 top-1/2 z-30 -translate-y-1/2 bg-white shadow-md w-12 h-12 rounded-full text-gray-600 flex items-center justify-center transition-transform duration-300 hover:scale-110 hover:bg-gray-100"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
              viewBox="0 0 24 24"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <polyline points="9 18 15 12 9 6" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}

export default function ProductDetails() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [keyBenefits, setKeyBenefits] = useState([]);
  const [faqs, setFaqs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [addedItems, setAddedItems] = useState({});
  const [messageApi, contextHolder] = message.useMessage();

  const paymentPartners = [
    { name: "GPay", logo: "https://uxwing.com/wp-content/themes/uxwing/download/brands-and-social-media/google-pay-icon.png" },
    { name: "Paytm", logo: "https://uxwing.com/wp-content/themes/uxwing/download/brands-and-social-media/paytm-icon.png" },
    { name: "Amazon Pay", logo: "https://uxwing.com/wp-content/themes/uxwing/download/brands-and-social-media/amazon-pay-icon.png" },
    { name: "PhonePe", logo: "https://uxwing.com/wp-content/themes/uxwing/download/brands-and-social-media/phonepe-icon.png", },
    { name: "VISA", logo: "https://upload.wikimedia.org/wikipedia/commons/4/41/Visa_Logo.png" },
    { name: "Mastercard", logo: "https://upload.wikimedia.org/wikipedia/commons/0/04/Mastercard-logo.png" },
  ];


  const [reviews, setReviews] = useState([
    {
      rating: 5,
      title: "Must buy!",
      comment:
        "Got the camera at 37000 in big billion days. For this price, its superb worth!! And does magic when paired to RF50mm lens.",
      user: "Mohamed Asain",
      verified: true,
      location: "Kangeyam",
      date: "10 months ago",
      likes: 29,
      dislikes: 2,
      images: [
        "https://via.placeholder.com/50",
        "https://via.placeholder.com/50",
      ],
    },
    {
      rating: 5,
      title: "Wonderful",
      comment:
        "A good mirrorless camera, exposure under sunlight is so beautiful! Eye capture of the camera is the + point!",
      user: "Priya Singh",
      verified: true,
      location: "Delhi",
      date: "6 months ago",
      likes: 15,
      dislikes: 1,
      images: [],
    },
  ]);

  const totalRatings = 1433;
  const ratingCounts = [68, 24, 68, 315, 958]; // 1★ to 5★

  const avgRating = (
    (5 * 970 + 5 * 210 + 3 * 68 + 2 * 24 + 1 * 68) /
    totalRatings
  ).toFixed(1);

  const url = "https://pharmacy-project-main.onrender.com"

  // Fetch Product
  useEffect(() => {
    setLoading(true);
    axios
      .get(`${url}/api/products/${id}`)
      .then((res) => {
        console.log("API Response:", res.data); // Debugging
        const data = res.data;

        setProduct(data.product || data);
        setKeyBenefits(data.product?.key_benefits || []);
        setFaqs(data.product?.faqs || []);
      })
      .catch((err) => setError(err.message || "Something went wrong"))
      .finally(() => setLoading(false));
  }, [id]);

  // Fetch Cart Data
  useEffect(() => {
    const fetchCart = async () => {
      try {
        const username = localStorage.getItem("userName");
        if (!username) return;

        const cartRes = await axios.get(
          `${url}/cart?username=${username}`
        );

        const addedMap = {};
        cartRes.data.forEach((item) => {
          addedMap[item.name] = true;
        });
        setAddedItems(addedMap);
      } catch (err) {
        console.error(err);
      }
    };
    fetchCart();
  }, [id]);

  // Add to Cart
  const handleAddToCart = () => {
    if (!product) return;

    const cartItem = {
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
          messageApi.error("Item already added to cart");
          return;
        }
        setAddedItems((prev) => ({ ...prev, [product.name]: true }));
        messageApi.success("Item added to cart");
      })
      .catch(() => {
        messageApi.error("Failed to add item to cart. Please try again.");
      });
  };

  if (loading) return <div className="p-6">Loading product details...</div>;
  if (error) return <div className="p-6 text-red-600">Error: {error}</div>;
  if (!product) return <div className="p-6">No product found.</div>;



  return (
    <div>
      <Navbar />


      <div className="min-h-screen p-6 mt-10">
        {contextHolder}
        <div className="max-w-6xl mx-auto bg-white rounded-2xl shadow-lg p-8 grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Product Image */}
          <div className="flex justify-center items-center">
            <img
              src={product.image}
              alt={product.name}
              className="max-h-[400px] rounded-xl shadow-md object-contain"
            />
          </div>

          {/* Product Details */}
          <div>
            <h1 className="text-3xl font-bold text-gray-800">{product.name}</h1>
            <p className="text-sm text-gray-500 mt-1">
              Brand: <span className="font-semibold">{product.brand || "Tonic Hub"}</span>
            </p>
            <p className="text-green-600 mt-2">{product.pack_size}</p>

            {/* Price Section */}
            <div className="bg-orange-50 p-4 rounded-lg mt-4 flex items-center gap-4">
              <span className="text-2xl font-bold text-orange-600">₹{product.price}</span>
              <span className="line-through text-gray-400">₹{product.previous_mrp}</span>
              <span className="text-green-600 font-semibold">{product.discount} OFF</span>
            </div>

            {/* Description */}
            <p className="mt-4 text-gray-700">{product.description}</p>

            {/* Dosage */}
            <div className="mt-6 border-t pt-4">
              <h2 className="text-lg font-semibold text-gray-800">Dosage Information</h2>
              <p className="text-gray-600">{product.dosage || "Consult your doctor before use."}</p>
            </div>

            {/* Add to Cart */}
            <div className="mt-6">
              {!addedItems[product.name] ? (
                <button
                  onClick={() => {
                    handleAddToCart()
                  }}
                  className="px-6 py-3 w-full md:w-48 text-lg font-semibold text-white bg-gradient-to-r from-green-500 to-teal-500 rounded-full shadow-lg hover:scale-105 transition-transform"
                >
                  Add to Cart
                </button>
              ) : (
                <button
                  disabled
                  className="px-6 py-3 w-full md:w-48 text-lg font-semibold text-white bg-gray-400 rounded-full shadow-md"
                >
                  Item Added
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Key Benefits */}
        <div className="max-w-6xl mx-auto mt-8 bg-white rounded-xl shadow-md p-6">
          <h2 className="text-xl font-bold mb-4 text-gray-800">Key Benefits</h2>
          <ul className="space-y-2">
            {keyBenefits.length > 0 ? (
              keyBenefits.map((benefit, idx) => (
                <li key={idx} className="flex items-start">
                  <span className="mr-2">✅</span>
                  <span>{benefit}</span>
                </li>
              ))
            ) : (
              <p>No key benefits listed.</p>
            )}
          </ul>
        </div>

        <div className="max-w-6xl mx-auto mt-8 bg-white rounded-xl shadow-md p-6">

          <Trending />
        </div>

        {/* FAQs */}
        {faqs.length > 0 && (
          <div className="max-w-6xl mx-auto mt-8 bg-white rounded-xl shadow-md p-6">
            <h2 className="text-xl font-bold mb-4 text-gray-800">FAQs</h2>
            {faqs.map((faq, idx) => (
              <div key={idx} className="mb-4 border-b pb-2">
                <p className="font-semibold text-gray-700">Q{idx + 1}: {faq.question}</p>
                <p className="text-gray-600">Ans: {faq.answer}</p>
              </div>
            ))}
          </div>
        )}

        <div className="max-w-6xl mx-auto mt-8 bg-white rounded-xl shadow-md p-6">
          {/* Summary */}
          <div className="max-w-6xl mx-auto  bg-white rounded-xl">
            {/* Top Section: Average Rating */}
            <div className="flex justify-between items-start mb-6">
              <div>
                <h2 className="text-2xl font-bold">Ratings & Reviews</h2>
                <p className="text-gray-500 mt-1">
                  {totalRatings} Ratings & {reviews.length} Reviews
                </p>
                <div className="flex items-center mt-2">
                  <span className="text-4xl font-bold">{avgRating}</span>
                  <Star className="w-6 h-6 text-yellow-400 ml-2" />
                </div>
              </div>
              <button className="px-4 py-2 bg-white border rounded shadow hover:bg-gray-50">
                Rate Product
              </button>
            </div>

            {/* Rating Bars */}
            <div className="mb-6">
              {ratingCounts
                .slice()
                .reverse()
                .map((count, i) => {
                  const star = 5 - i;
                  const percent = (count / totalRatings) * 100;
                  return (
                    <div key={star} className="flex items-center mb-1 gap-2">
                      <span className="w-6 text-sm font-medium">{star}★</span>
                      <div className="flex-1 h-2 bg-gray-200 rounded">
                        <div
                          className="h-2 bg-green-500 rounded"
                          style={{ width: `${percent}%` }}
                        ></div>
                      </div>
                      <span className="w-10 text-sm text-gray-600">{count}</span>
                    </div>
                  );
                })}
            </div>

            {/* Image Thumbnails */}
            <div className="flex gap-2 overflow-x-auto mb-6">
              {reviews
                .flatMap((r) => r.images)
                .map((img, idx) => (
                  <img
                    key={idx}
                    src={img}
                    alt={`review-img-${idx}`}
                    className="w-16 h-16 object-cover rounded border"
                  />
                ))}
              {reviews.flatMap((r) => r.images).length > 8 && (
                <div className="w-16 h-16 flex items-center justify-center bg-gray-200 rounded text-sm font-semibold">
                  +{reviews.flatMap((r) => r.images).length - 8}
                </div>
              )}
            </div>

            {/* Individual Reviews */}
            <div className="space-y-6">
              {reviews.map((rev, idx) => (
                <div key={idx} className="border-b pb-4">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="flex items-center gap-1">
                      <span className="px-2 py-1 text-white bg-green-500 rounded text-sm font-semibold">
                        {rev.rating}★
                      </span>
                      <h3 className="font-semibold">{rev.title}</h3>
                    </div>
                  </div>
                  <p className="text-gray-700 mb-2">{rev.comment}</p>
                  <p className="text-gray-500 text-sm">
                    {rev.user}{" "}
                    {rev.verified && (
                      <span className="px-1.5 py-0.5 bg-green-100 text-green-700 text-xs rounded-full">
                        Certified Buyer
                      </span>
                    )}
                    , {rev.location} · {rev.date}
                  </p>
                  <div className="flex items-center gap-4 mt-2 text-gray-500 text-sm">
                    <button>👍 {rev.likes}</button>
                    <button>👎 {rev.dislikes}</button>
                  </div>
                </div>
              ))}
            </div>
          </div>


        </div>

        {/* Payment Partners */}
        <div className="max-w-6xl mx-auto mt-8 bg-blue-50 p-6 rounded-xl shadow-md">
          <h2 className="text-lg font-semibold mb-4 text-gray-800">Our Payment Partners</h2>
          <div className="grid grid-cols-3 md:grid-cols-6 gap-4 items-center justify-center">
            {paymentPartners.map((partner, idx) => (
              <img
                key={idx}
                src={partner.logo}
                alt={partner.name}
                className=" w-15 mx-auto object-contain"
              />
            ))}
          </div>
        </div>


      </div>

    </div>
  );
}

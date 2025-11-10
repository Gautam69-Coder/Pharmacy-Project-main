import React, { useEffect, useState, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { message } from "antd";
import { Star, ShoppingCart, Shield, Truck, BadgeCheck, Heart } from "lucide-react";
import Navbar from '../../Components/Navbar';

// Trending Component with Responsive Design
function Trending() {
  const { id } = useParams();
  const shortID = id.slice(0, 3);
  const [CID, setCID] = useState(shortID);
  const [Category, setCategory] = useState("");
  const scrollRef = useRef(null);
  const [CrousalCategory, setCrousalCategory] = useState("");
  const navigate = useNavigate();
  const [newlaunches, setNew_Launches] = useState([]);
  const [addedItems, setAddedItems] = useState({});
  const [messageApi, contextHolder] = message.useMessage();

  const scroll = (direction) => {
    const amount = 300;
    if (scrollRef.current) {
      scrollRef.current.scrollBy({
        left: direction === "left" ? -amount : amount,
        behavior: "smooth",
      });
    }
  };

  useEffect(() => {
    const categoryMap = {
      HCD: { name: "health_care_devices", display: "Health Care Devices" },
      MH0: { name: "must_have", display: "Must Have" },
      SC0: { name: "skin_care", display: "Skin Care" },
      SN0: { name: "sport_nutrition", display: "Sport Nutrition" },
      AY0: { name: "ayurvedic", display: "Ayurvedic" },
      DE0: { name: "diabetes_essentials", display: "Diabetes Essentials" },
      HC0: { name: "health_care", display: "Health Care" },
      VIT: { name: "vitamin", display: "Vitamins" },
      PC0: { name: "personal_care", display: "Personal Care" },
      FD0: { name: "food_drinks", display: "Food & Drinks" },
    };

    const cat = categoryMap[CID];
    if (cat) {
      setCategory(cat.name);
      setCrousalCategory(cat.display);
    }
  }, [CID]);

  const url = "http://localhost:3000";

  useEffect(() => {
    if (!Category) return;

    const fetchData = async () => {
      try {
        const productsRes = await axios.get(`${url}/${Category}`);
        setNew_Launches(productsRes.data);

        const username = localStorage.getItem("userName");
        if (!username) return;

        const cartRes = await axios.get(`${url}/cart?username=${username}`);
        const addedMap = {};
        cartRes.data.forEach((item) => {
          const index = productsRes.data.findIndex((p) => p.name === item.name);
          if (index !== -1) addedMap[index] = true;
        });
        setAddedItems(addedMap);
      } catch (err) {
        console.error(err);
      }
    };

    fetchData();
  }, [Category]);

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
          messageApi.error("Item already added to cart");
          return;
        }
        setAddedItems((prev) => ({ ...prev, [index]: true }));
      })
      .catch(() => messageApi.error("Failed to add item to cart"));
  };

  const handleItemClick = (id) => navigate(`/product/${id}`);

  return (
    <div className="w-full">
      {contextHolder}
      <div className="mb-4 sm:mb-6">
        <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-800 px-4 sm:px-8">
          Similar Products in {CrousalCategory}
        </h2>
      </div>
      <div className="flex justify-center px-2 sm:px-4">
        <div className="relative w-full max-w-[1400px]">
          {/* Scroll Buttons - Hidden on mobile */}
          <button
            onClick={() => scroll("left")}
            className="hidden md:flex absolute -left-4 lg:-left-6 top-1/2 z-30 -translate-y-1/2 bg-white shadow-lg w-10 h-10 lg:w-12 lg:h-12 rounded-full text-gray-600 items-center justify-center hover:scale-110 transition-transform"
          >
            <svg className="w-5 h-5 lg:w-6 lg:h-6" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
              <polyline points="15 18 9 12 15 6" />
            </svg>
          </button>

          <div
            ref={scrollRef}
            className="flex overflow-x-auto scroll-smooth gap-3 sm:gap-4 md:gap-6 p-2 sm:p-3 no-scrollbar"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none', WebkitOverflowScrolling: 'touch' }}
          >
            {newlaunches.map((nl, index) => (
              <div
                key={nl.id}
                onClick={() => handleItemClick(nl.id)}
                className="min-w-[200px] max-w-[200px] sm:min-w-[220px] sm:max-w-[220px] md:min-w-[260px] md:max-w-[260px] bg-white rounded-xl sm:rounded-2xl shadow-md hover:shadow-xl transform hover:scale-105 transition-all duration-300 cursor-pointer flex flex-col"
              >
                <div className="absolute top-2 sm:top-3 left-2 sm:left-3 z-10 bg-emerald-600 text-white px-2 py-0.5 sm:px-3 sm:py-1 rounded-lg text-[10px] sm:text-xs font-semibold">
                  {nl.discount}
                </div>
                <div className="relative h-32 sm:h-36 md:h-40 flex justify-center items-center p-3 sm:p-4">
                  <img src={nl.image} alt={nl.name} className="w-28 h-28 sm:w-36 sm:h-36 md:w-40 md:h-40 object-contain" />
                </div>
                <div className="flex flex-col flex-grow p-3 sm:p-4">
                  <div className="h-16 sm:h-20 md:h-[85px]">
                    <h3 className="text-sm sm:text-base md:text-lg font-semibold text-gray-800 mb-1 sm:mb-2 leading-snug line-clamp-3">
                      {nl.name}
                    </h3>
                  </div>
                  <hr className="my-1.5 sm:my-2 border-gray-200" />
                  <div className="text-xs sm:text-sm text-teal-600 font-medium mb-2 sm:mb-3">
                    MRP <span className="line-through text-gray-400">₹{nl.previous_mrp}</span>
                  </div>
                  <div className="mt-auto flex justify-between items-center gap-2">
                    <span className="text-lg sm:text-xl font-bold text-gray-900">₹{nl.price}</span>
                    {!addedItems[index] ? (
                      <button
                        onClick={(e) => { e.stopPropagation(); handleAddToCart(index); }}
                        className="w-20 h-8 sm:w-24 sm:h-9 md:w-28 md:h-10 text-xs sm:text-sm text-[#1B69DE] bg-[#E7F6FF] border border-[#1B69DE] rounded-full font-semibold hover:bg-[#1B69DE] hover:text-white transition-all"
                      >
                        Add
                      </button>
                    ) : (
                      <button
                        className="w-20 h-8 sm:w-24 sm:h-9 md:w-28 md:h-10 text-xs sm:text-sm text-white bg-[#1B69DE] border border-[#1B69DE] rounded-full font-semibold"
                        onClick={(e) => e.stopPropagation()}
                      >
                        Added
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>

          <button
            onClick={() => scroll("right")}
            className="hidden md:flex absolute -right-4 lg:-right-6 top-1/2 z-30 -translate-y-1/2 bg-white shadow-lg w-10 h-10 lg:w-12 lg:h-12 rounded-full text-gray-600 items-center justify-center hover:scale-110 transition-transform"
          >
            <svg className="w-5 h-5 lg:w-6 lg:h-6" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
              <polyline points="9 18 15 12 9 6" />
            </svg>
          </button>
        </div>
      </div>
      <style jsx>{`
        .no-scrollbar::-webkit-scrollbar { display: none; }
        .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>
    </div>
  );
}

// Main Product Details Component
export default function ProductDetails() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [keyBenefits, setKeyBenefits] = useState([]);
  const [faqs, setFaqs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [addedItems, setAddedItems] = useState({});
  const [messageApi, contextHolder] = message.useMessage();
  const [isFavorite, setIsFavorite] = useState(false);

  const paymentPartners = [
    { name: "GPay", logo: "https://uxwing.com/wp-content/themes/uxwing/download/brands-and-social-media/google-pay-icon.png" },
    { name: "Paytm", logo: "https://uxwing.com/wp-content/themes/uxwing/download/brands-and-social-media/paytm-icon.png" },
    { name: "Amazon Pay", logo: "https://uxwing.com/wp-content/themes/uxwing/download/brands-and-social-media/amazon-pay-icon.png" },
    { name: "PhonePe", logo: "https://uxwing.com/wp-content/themes/uxwing/download/brands-and-social-media/phonepe-icon.png" },
    { name: "VISA", logo: "https://upload.wikimedia.org/wikipedia/commons/4/41/Visa_Logo.png" },
    { name: "Mastercard", logo: "https://upload.wikimedia.org/wikipedia/commons/0/04/Mastercard-logo.png" },
  ];

  const [reviews, setReviews] = useState([
    {
      rating: 5,
      title: "Must buy!",
      comment: "Got the product at great price. Highly recommended!",
      user: "Mohamed Asain",
      verified: true,
      location: "Kangeyam",
      date: "10 months ago",
      likes: 29,
      dislikes: 2,
      images: [],
    },
    {
      rating: 5,
      title: "Wonderful",
      comment: "Excellent quality and fast delivery!",
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
  const ratingCounts = [68, 24, 68, 315, 958];
  const avgRating = ((5 * 970 + 4 * 210 + 3 * 68 + 2 * 24 + 1 * 68) / totalRatings).toFixed(1);

  const url = "https://pharmacy-project-main.onrender.com";

  useEffect(() => {
    setLoading(true);
    axios
      .get(`${url}/api/products/${id}`)
      .then((res) => {
        const data = res.data;
        setProduct(data.product || data);
        setKeyBenefits(data.product?.key_benefits || []);
        setFaqs(data.product?.faqs || []);
      })
      .catch((err) => setError(err.message || "Something went wrong"))
      .finally(() => setLoading(false));
  }, [id]);

  useEffect(() => {
    const fetchCart = async () => {
      try {
        const username = localStorage.getItem("userName");
        if (!username) return;
        const cartRes = await axios.get(`${url}/cart?username=${username}`);
        const addedMap = {};
        cartRes.data.forEach((item) => { addedMap[item.name] = true; });
        setAddedItems(addedMap);
      } catch (err) {
        console.error(err);
      }
    };
    fetchCart();
  }, [id]);

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
      .catch(() => messageApi.error("Failed to add item"));
  };

  if (loading) return <div className="flex items-center justify-center min-h-screen"><div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div></div>;
  if (error) return <div className="p-6 text-red-600 text-center">Error: {error}</div>;
  if (!product) return <div className="p-6 text-center">No product found.</div>;

  return (
    <div className="bg-gray-50 min-h-screen">
      <Navbar />
      {contextHolder}

      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 py-6 sm:py-8 mt-16 sm:mt-20">
        {/* Product Main Section */}
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 p-4 sm:p-6 lg:p-8">
            {/* Image Section */}
            <div className="relative flex items-center justify-center bg-gradient-to-br from-blue-50 to-purple-50 rounded-xl p-6 sm:p-8">
              <button
                onClick={() => setIsFavorite(!isFavorite)}
                className="absolute top-4 right-4 p-2 bg-white rounded-full shadow-md hover:scale-110 transition-transform"
              >
                <Heart className={`w-5 h-5 sm:w-6 sm:h-6 ${isFavorite ? 'fill-red-500 text-red-500' : 'text-gray-400'}`} />
              </button>
              <img
                src={product.image}
                alt={product.name}
                className="max-h-[250px] sm:max-h-[350px] md:max-h-[400px] w-auto object-contain drop-shadow-2xl"
              />
            </div>

            {/* Details Section */}
            <div className="flex flex-col justify-between">
              <div>
                <div className="inline-block px-3 py-1 bg-green-100 text-green-700 text-xs sm:text-sm font-semibold rounded-full mb-3">
                  In Stock
                </div>
                <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-2">{product.name}</h1>
                <p className="text-sm sm:text-base text-gray-600 mb-4">
                  Brand: <span className="font-semibold text-blue-600">{product.brand || "Tonic Hub"}</span>
                </p>

                {/* Rating */}
                <div className="flex items-center gap-2 mb-4">
                  <div className="flex items-center bg-green-500 text-white px-2 py-1 rounded text-sm font-semibold">
                    {avgRating} <Star className="w-3 h-3 ml-1 fill-white" />
                  </div>
                  <span className="text-sm text-gray-600">{totalRatings} ratings</span>
                </div>

                {/* Price */}
                <div className="bg-gradient-to-r from-orange-50 to-red-50 p-4 sm:p-6 rounded-xl mb-6">
                  <div className="flex items-baseline gap-3 flex-wrap">
                    <span className="text-3xl sm:text-4xl font-bold text-orange-600">₹{product.price}</span>
                    <span className="text-lg sm:text-xl line-through text-gray-400">₹{product.previous_mrp}</span>
                    <span className="px-3 py-1 bg-green-500 text-white text-sm font-bold rounded-full">{product.discount} OFF</span>
                  </div>
                  <p className="text-xs sm:text-sm text-gray-600 mt-2">Inclusive of all taxes</p>
                </div>

                {/* Description */}
                <p className="text-sm sm:text-base text-gray-700 leading-relaxed mb-6">{product.description}</p>

                {/* Features */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4 mb-6">
                  <div className="flex items-center gap-2 text-sm">
                    <Truck className="w-5 h-5 text-blue-600" />
                    <span className="text-gray-700">Free Delivery</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <Shield className="w-5 h-5 text-green-600" />
                    <span className="text-gray-700">Secure Payment</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <BadgeCheck className="w-5 h-5 text-purple-600" />
                    <span className="text-gray-700">100% Authentic</span>
                  </div>
                </div>
              </div>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-3">
                {!addedItems[product.name] ? (
                  <button
                    onClick={handleAddToCart}
                    className="flex-1 flex items-center justify-center gap-2 px-6 py-3 sm:py-4 text-base sm:text-lg font-semibold text-white bg-gradient-to-r from-blue-600 to-blue-700 rounded-xl shadow-lg hover:shadow-xl hover:scale-105 transition-all"
                  >
                    <ShoppingCart className="w-5 h-5" />
                    Add to Cart
                  </button>
                ) : (
                  <button
                    disabled
                    className="flex-1 px-6 py-3 sm:py-4 text-base sm:text-lg font-semibold text-white bg-gray-400 rounded-xl shadow-md"
                  >
                    Item Added ✓
                  </button>
                )}
                <button className="flex-1 px-6 py-3 sm:py-4 text-base sm:text-lg font-semibold text-blue-600 bg-blue-50 border-2 border-blue-600 rounded-xl hover:bg-blue-100 transition-all">
                  Buy Now
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Key Benefits */}
        {keyBenefits.length > 0 && (
          <div className="bg-white rounded-2xl shadow-lg p-4 sm:p-6 lg:p-8 mt-6 sm:mt-8">
            <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4 sm:mb-6 flex items-center gap-2">
              <BadgeCheck className="w-6 h-6 text-green-600" />
              Key Benefits
            </h2>
            <ul className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4">
              {keyBenefits.map((benefit, idx) => (
                <li key={idx} className="flex items-start gap-3 bg-green-50 p-3 sm:p-4 rounded-lg">
                  <span className="text-green-600 text-lg">✓</span>
                  <span className="text-sm sm:text-base text-gray-700">{benefit}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Similar Products */}
        <div className="bg-white rounded-2xl shadow-lg p-4 sm:p-6 lg:p-8 mt-6 sm:mt-8">
          <Trending />
        </div>

        {/* FAQs */}
        {faqs.length > 0 && (
          <div className="bg-white rounded-2xl shadow-lg p-4 sm:p-6 lg:p-8 mt-6 sm:mt-8">
            <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4 sm:mb-6">Frequently Asked Questions</h2>
            <div className="space-y-4">
              {faqs.map((faq, idx) => (
                <div key={idx} className="border-l-4 border-blue-500 pl-4 py-2">
                  <p className="font-semibold text-sm sm:text-base text-gray-800 mb-2">Q{idx + 1}: {faq.question}</p>
                  <p className="text-sm sm:text-base text-gray-600">A: {faq.answer}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Ratings & Reviews */}
        <div className="bg-white rounded-2xl shadow-lg p-4 sm:p-6 lg:p-8 mt-6 sm:mt-8">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
            <div>
              <h2 className="text-xl sm:text-2xl font-bold text-gray-900">Ratings & Reviews</h2>
              <p className="text-sm sm:text-base text-gray-600 mt-1">{totalRatings} Ratings & {reviews.length} Reviews</p>
              <div className="flex items-center gap-2 mt-3">
                <span className="text-3xl sm:text-4xl font-bold text-gray-900">{avgRating}</span>
                <Star className="w-6 h-6 sm:w-8 sm:h-8 text-yellow-400 fill-yellow-400" />
              </div>
            </div>
            <button className="px-4 sm:px-6 py-2 sm:py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all text-sm sm:text-base">
              Rate Product
            </button>
          </div>

          {/* Rating Bars */}
          <div className="mb-6 sm:mb-8">
            {ratingCounts.slice().reverse().map((count, i) => {
              const star = 5 - i;
              const percent = (count / totalRatings) * 100;
              return (
                <div key={star} className="flex items-center gap-2 sm:gap-3 mb-2">
                  <span className="w-8 sm:w-10 text-xs sm:text-sm font-medium text-gray-700">{star}★</span>
                  <div className="flex-1 h-2 sm:h-3 bg-gray-200 rounded-full overflow-hidden">
                    <div className="h-full bg-gradient-to-r from-green-400 to-green-600 rounded-full transition-all" style={{ width: `${percent}%` }}></div>
                  </div>
                  <span className="w-10 sm:w-12 text-xs sm:text-sm text-gray-600">{count}</span>
                </div>
              );
            })}
          </div>

          {/* Reviews */}
          <div className="space-y-4 sm:space-y-6">
            {reviews.map((rev, idx) => (
              <div key={idx} className="border-b pb-4 sm:pb-6 last:border-0">
                <div className="flex items-start gap-3 mb-3">
                  <span className="px-2 sm:px-3 py-1 bg-green-500 text-white rounded text-xs sm:text-sm font-bold">{rev.rating}★</span>
                  <div className="flex-1">
                    <h3 className="font-semibold text-sm sm:text-base text-gray-900">{rev.title}</h3>
                    <p className="text-xs sm:text-sm text-gray-700 mt-2">{rev.comment}</p>
                    <div className="flex flex-wrap items-center gap-2 mt-2 text-xs sm:text-sm text-gray-500">
                      <span className="font-medium">{rev.user}</span>
                      {rev.verified && <span className="px-2 py-0.5 bg-green-100 text-green-700 rounded-full text-xs">✓ Certified Buyer</span>}
                      <span>• {rev.location}</span>
                      <span>• {rev.date}</span>
                    </div>
                    <div className="flex items-center gap-4 mt-3 text-xs sm:text-sm">
                      <button className="flex items-center gap-1 text-gray-600 hover:text-blue-600">👍 {rev.likes}</button>
                      <button className="flex items-center gap-1 text-gray-600 hover:text-red-600">👎 {rev.dislikes}</button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Payment Partners */}
        <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl shadow-lg p-4 sm:p-6 lg:p-8 mt-6 sm:mt-8">
          <h2 className="text-lg sm:text-xl font-bold text-gray-900 mb-4 sm:mb-6 text-center">Our Payment Partners</h2>
          <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-4 sm:gap-6 items-center">
            {paymentPartners.map((partner, idx) => (
              <div key={idx} className="bg-white p-2 sm:p-3 rounded-lg shadow-sm hover:shadow-md transition-shadow">
                <img src={partner.logo} alt={partner.name} className="h-8 sm:h-10 w-auto mx-auto object-contain" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

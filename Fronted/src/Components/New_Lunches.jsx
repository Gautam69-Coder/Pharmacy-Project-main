import { useRef, useState, useEffect } from "react";
import axios from "axios";
import { message } from "antd";
import { useNavigate } from "react-router-dom";

function Trending() {
  const scrollRef = useRef(null);
  const [data, setdata] = useState();

  //Product Carousel
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

  const url = "https://pharmacy-project-main.onrender.com";

  //Item Added Button show if already item in cart
  useEffect(() => {
    const fetchData = async () => {
      try {
        const productsRes = await axios.get(`${url}/skin_care`);
        setNew_Launches(productsRes.data);

        const username = localStorage.getItem("userName");
        if (!username) return;

        const cartRes = await axios.get(`${url}/cart?username=${username}`);

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
      }
    };

    fetchData();
  }, []);

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
    <div className="w-full">
      {contextHolder}
      
      {/* Title - Responsive */}
      <div className="mb-3 sm:mb-4 md:mb-6">
        <h1 className="text-xl sm:text-2xl md:text-3xl mx-4 sm:mx-8 md:mx-14 mt-3 sm:mt-4 md:mt-5 font-bold">
          Trending
        </h1>
      </div>

      {/* Carousel Container - Responsive */}
      <div className="flex justify-center px-2 sm:px-4 md:px-6">
        <div className="relative w-full max-w-[1400px]">
          {/* Left Scroll Button - Hidden on mobile */}
          <button
            onClick={() => scroll("left")}
            aria-label="Scroll Left"
            className="hidden md:flex absolute -left-4 lg:-left-6 top-1/2 z-30 -translate-y-1/2 bg-white shadow-lg w-10 h-10 lg:w-12 lg:h-12 rounded-full text-gray-600 items-center justify-center transition-transform duration-300 hover:scale-110 hover:bg-gray-100"
          >
            <svg
              className="w-5 h-5 lg:w-6 lg:h-6"
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

          {/* Scrollable container - Responsive */}
          <div
            ref={scrollRef}
            className="flex overflow-x-auto scroll-smooth gap-3 sm:gap-4 md:gap-6 p-2 sm:p-3 no-scrollbar"
            style={{
              scrollbarWidth: 'none',
              msOverflowStyle: 'none',
              WebkitOverflowScrolling: 'touch'
            }}
          >
            {newlaunches.map((nl, index) => (
              <div
                key={nl.id}
                onClick={() => {
                  handleItemClick(nl.id);
                  console.log(nl.id);
                }}
                className="min-w-[200px] max-w-[200px] sm:min-w-[220px] sm:max-w-[220px] md:min-w-[260px] md:max-w-[260px] bg-white rounded-xl sm:rounded-2xl shadow-md hover:shadow-xl transform hover:scale-105 transition-all duration-300 cursor-pointer flex flex-col select-none relative"
              >
                {/* Discount Badge - Responsive */}
                <div className="absolute top-2 sm:top-3 left-2 sm:left-3 z-10 bg-emerald-600 text-white px-2 py-0.5 sm:px-3 sm:py-1 rounded-tr-lg sm:rounded-tr-xl rounded-bl-lg sm:rounded-bl-xl text-[10px] sm:text-xs font-semibold shadow">
                  {nl.discount}
                </div>

                {/* Product Image - Responsive */}
                <div className="relative h-32 sm:h-36 md:h-40 flex justify-center items-center p-3 sm:p-4 rounded-t-xl sm:rounded-t-2xl">
                  <img
                    src={nl.image}
                    alt={nl.name}
                    className="w-28 h-28 sm:w-36 sm:h-36 md:w-40 md:h-40 object-contain"
                  />
                </div>

                {/* Product Content - Responsive */}
                <div className="flex flex-col flex-grow p-3 sm:p-4">
                  <div className="h-16 sm:h-20 md:h-[85px]">
                    <h3 className="text-sm sm:text-base md:text-lg font-semibold text-gray-800 mb-1 sm:mb-2 leading-snug line-clamp-3">
                      {nl.name}
                    </h3>
                  </div>

                  <hr className="my-1.5 sm:my-2 border-gray-200" />

                  <div className="text-xs sm:text-sm text-teal-600 font-medium mb-2 sm:mb-3">
                    MRP{" "}
                    <span className="line-through text-gray-400">
                      ₹{nl.previous_mrp}
                    </span>
                  </div>

                  {/* Price and Button - Responsive */}
                  <div className="mt-auto flex justify-between items-center gap-2">
                    <span className="text-lg sm:text-xl font-bold text-gray-900">
                      ₹{nl.price}
                    </span>

                    {!addedItems[index] ? (
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleAddToCart(index);
                        }}
                        className="w-20 h-8 sm:w-24 sm:h-9 md:w-28 md:h-10 text-xs sm:text-sm text-[#1B69DE] bg-[#E7F6FF] border border-[#1B69DE] rounded-full font-semibold transition-all duration-300 hover:bg-[#1B69DE] hover:text-white"
                      >
                        Add
                      </button>
                    ) : (
                      <button
                        className="w-20 h-8 sm:w-24 sm:h-9 md:w-28 md:h-10 text-xs sm:text-sm text-white border border-[#1B69DE] rounded-full font-semibold transition-all duration-300 bg-[#1B69DE]"
                        onClick={(e) => {
                          e.stopPropagation();
                        }}
                      >
                        Added
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Right Scroll Button - Hidden on mobile */}
          <button
            onClick={() => scroll("right")}
            aria-label="Scroll Right"
            className="hidden md:flex absolute -right-4 lg:-right-6 top-1/2 z-30 -translate-y-1/2 bg-white shadow-lg w-10 h-10 lg:w-12 lg:h-12 rounded-full text-gray-600 items-center justify-center transition-transform duration-300 hover:scale-110 hover:bg-gray-100"
          >
            <svg
              className="w-5 h-5 lg:w-6 lg:h-6"
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

      {/* Add CSS to hide scrollbar */}
      <style jsx>{`
        .no-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .no-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </div>
  );
}

export default Trending;

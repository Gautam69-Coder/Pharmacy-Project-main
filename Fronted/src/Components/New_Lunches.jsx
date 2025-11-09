import { useRef, useState, useEffect } from "react";
import axios from "axios";
import { message } from "antd";
import { useNavigate } from "react-router-dom";

function Trending() {

  const scrollRef = useRef(null);
  const navigate = useNavigate();

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



  const [newlaunches, setNew_Launches] = useState([]);
  const [addedItems, setAddedItems] = useState({});
  const [messageApi, contextHolder] = message.useMessage();

  const url = "https://pharmacy-project-main.onrender.com"

  //Item Added Button show if already item in cart
  useEffect(() => {
    const fetchData = async () => {
      try {
        const productsRes = await axios.get(`${url}/skin_care`); //get data from backend
        setNew_Launches(productsRes.data);

        const username = localStorage.getItem("userName");
        if (!username) return;

        const cartRes = await axios.get(
          `${url}/cart?username=${username}` //send data to backend only username
        );

        const addedMap = {};
        cartRes.data.forEach((item) => {
          const index = productsRes.data.findIndex(
            (p) => p.name === item.name //checking name of product 
          );
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
        console.error(err);
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
        <h1 className="text-2xl mx-14 mt-5 font-bold p-0 m-0">Trending</h1>
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
                <div className="relative h-40 flex justify-center items-center p-4 rounded-t-2xl">
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
                          e.stopPropagation(); // iska matlab hai jis button pe click kiya srif usi buuton ko use karga na ki uske parent wale button pe   
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

export default Trending;

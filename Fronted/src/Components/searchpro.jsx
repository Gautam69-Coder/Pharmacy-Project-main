import { useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';
import axios from 'axios'
import { message } from "antd";
import { useNavigate } from "react-router-dom";

const Searchpro = () => {

  const location = useLocation(); //That gives current url 
  const searchParams = new URLSearchParams(location.search);  //reading query string
  const query = searchParams.get('search'); // search product

  const [data, setData] = useState([]);

  const url="http://localhost:3000"

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(`${url}/Home/search`, {
          params: { searchQuery: query }
        });
        console.log(res.data);
        setData(res.data.data || []);
      } catch (err) {
        console.log(err);
      }
    };
    if (query) fetchData();
  }, [query]);

  const navigate = useNavigate();
  const [addedItems, setAddedItems] = useState({});
  const [newlaunches, setNew_Launches] = useState([]);
  const [messageApi, contextHolder] = message.useMessage();


  useEffect(() => {
    const fetchData = async () => {
      try {
        const productsRes = await axios.get(`${url}/ayurvedic`);
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
      } catch (err) {
        console.error(err);
      }
    };

    fetchData();
  }, []);

  //Added item in cart
  const handleAddToCart = (id) => {
    const product = newlaunches[id];
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
    <div className='mt-[6%]'>
      {contextHolder}
      <div className='flex-col items-center'>
        <div className='flex justify-center'>
          <h2>Search Results</h2>
        </div>
        {data.length > 0 ? (

          <div className='mt-5'>
            <div className='flex justify-center flex-col items-center gap-6'>
              {data.map((item, index) => (
                <div
                  key={item.id}
                  onClick={() => {
                    handleItemClick(item.id);
                    console.log(item.id)
                  }}
                  className="
                     bg-white border border-gray-200 w-[40vw] rounded-lg p-4 shadow-sm
                        hover:shadow-lg hover:scale-105
                        transform transition duration-300 ease-out
                      "
                >
                  <div className="flex items-end justify-between">

                    <div className="flex items-start space-x-4 w-[100%]">

                      <div className="flex-shrink-0">
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-24 h-24 object-contain rounded-md border border-gray-100"
                        />
                      </div>


                      <div className="flex-1">
                        <h2 className="text-lg font-medium text-gray-900 mb-1 hover:text-blue-600 cursor-pointer">
                          {item.name}
                        </h2>
                        <p className="text-gray-600 text-sm mb-2">
                          Tonic Hub
                        </p>
                        <p className="text-gray-600 text-sm mb-3">
                          {item.stock}
                        </p>


                        <div className="flex items-center space-x-2 flex-wrap">
                          <span className="text-2xl font-bold text-gray-900">
                            ₹{item.price}
                          </span>
                          <span className="text-gray-500 text-sm line-through">
                            MRP ₹{item.previous_mrp}
                          </span>
                          <span className="bg-green-100 text-green-800 text-xs font-medium px-2 py-1 rounded">
                            {item.discount} OFF
                          </span>
                        </div>
                      </div>
                    </div>


                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <p>No results found.</p>
        )}
      </div>
    </div>
  );
};

export default Searchpro
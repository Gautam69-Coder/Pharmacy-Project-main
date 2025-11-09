import React, { useState, useEffect } from "react";
import { Steps, message } from "antd";
import axios from "axios";
const { Step } = Steps;
import { useNavigate } from "react-router-dom";




const AddressPage = () => {
  const navigate = useNavigate();
  const [current, setCurrent] = useState(0);
  const [messageApi, contextHolder] = message.useMessage();
  const [total, setTotal] = useState(0);
  const [FinalTotal, setFinalTotal] = useState()
  const [qty, setQty] = useState([]);
  const [PaymentMOD, setPaymentMOD] = useState("")
  const [prodata, setprodata] = useState([])
  const [random, setrandom] = useState()
  const [value, setValue] = useState("Select Payment Methods");
  const [coupon, setCoupon] = useState(0);
  const [formData, setFormData] = useState({
    name: "",
    phonenumber: "",
    mobile: "",
    pincode: "",
    state: "",
    city: "",
    address: "",
    email: "",
  });

  // Handle input changes
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const url="http://localhost:3000"

  // Go to next step only if form valid
  const handleNext = () => {
    if (
      !formData.name ||
      !formData.pincode ||
      !formData.phonenumber ||
      !formData.state ||
      !formData.city ||
      !formData.address ||
      !formData.email
    ) {
      messageApi.error("Please fill all fields ");
      return;
    }
    messageApi.success("Address saved!");
    setCurrent(1);
    setCoupon(localStorage.getItem("Coupon") || 0);

    axios
      .get(`${url}/address`, {
        params: {
          fullname: formData.name,
          pincode: formData.pincode,
          phonenumber: formData.phonenumber,
          email: formData.email,
          state: formData.state,
          city: formData.city,
          address: formData.address,
        },
      })


      .then((res) => {
        console.log(res.data);
        localStorage.setItem("fullname", formData.name)
        localStorage.setItem("pincode", formData.pincode)
        localStorage.setItem("phonenumber", formData.phonenumber)
        localStorage.setItem("email", formData.email)
        localStorage.setItem("state", formData.state)
        localStorage.setItem("city", formData.city)
        localStorage.setItem("address", formData.address)
      })
      .catch((err) => {
        console.log("Error:", err);
      });
  };

  const DeliveryDate = () => {
    let today = new Date();
    today.setDate(today.getDate() + Math.floor(Math.random() * 10))
    let mydate = today.toDateString();
    console.log(mydate)
    localStorage.setItem("DeliveryDate", mydate);
  }


  // Send OTP
  // const sendOTP = async () => {
  //   if (!email) {
  //     messageApi.error("Please enter your email first");
  //     return;
  //   }
  //   try {
  //     const res = await axios.post("http://localhost:3000/send-otp", { email });
  //     if (res.data.success) {
  //       messageApi.success("OTP sent to your email");
  //       setOk(1);
  //     } else {
  //       messageApi.error("Failed to send OTP");
  //       setOk(0);
  //     }
  //   } catch (err) {
  //     messageApi.error("Server error while sending OTP");
  //   }
  // };

  useEffect(() => {
    axios
      .get(`${url}/prodata`)
      .then((res) => {
        setQty(res.data);
        const sum = res.data.reduce((acc, product) => acc + product.price * product.qty, 0);
        setTotal(sum);
        console.log(res.data);
        setprodata(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);


  // Verify OTP
  // const verifyOTP = async () => {
  //   if (!otp) {
  //     messageApi.error("Enter OTP first");
  //     return;
  //   }
  //   try {
  //     const res = await axios.post("http://localhost:3000/verify-otp", {
  //       email,
  //       otp,
  //     });
  //     if (res.data.success) {
  //       messageApi.success("OTP verified");
  //       setO(1);
  //       setVerify(0);
  //     } else {
  //       messageApi.error("Invalid OTP");
  //       setO(0);
  //     }
  //   } catch (err) {
  //     messageApi.error("Server error while verifying OTP");
  //   }
  // };


  const checkout = async () => {
    try {
      const coupon = localStorage.getItem("Coupon");
      const res = await axios.post(`${url}/checkout`, {
        items: prodata.map(p => ({
          id: p._id,
          name: p.name,
          price: p.price,
          qty: p.qty
        })),
        coupon: coupon
      })
      console.log(res.data)

      window.location = res.data.url;

    }
    catch (err) {
      console.log(err)
    }
  }

  let f = total + 49 - coupon
  localStorage.setItem('finalprice', f)
  console.log(f)







  const steps = [
    {
      title: "Address",
      content: (
        <div className="address-form">
          {/* Your existing address form code remains the same */}
          <div className="flex justify-between">
            <div className="w-[50vw]">
              <div className="mb-1">Full Name</div>
              <input
                type="text"
                name="name"
                placeholder="Full Name*"
                value={formData.name}
                onChange={handleChange}
                className="w-[25vw] p-2 border border-gray-300 rounded-md focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-300 ease-in-out"
              />
            </div>
            <div className="">
              <div className="mb-1">Phone number</div>
              <input
                type="text"
                name="phonenumber"
                placeholder="Phone number*"
                value={formData.phonenumber}
                onChange={handleChange}
                className="w-[25vw] p-2 border border-gray-300 rounded-md focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-300 ease-in-out"
              />
            </div>
          </div>

          <div className="flex justify-between mt-2 mb-2">
            <div className="">
              <div className="mb-1">Email</div>
              <div className="flex">
                <input
                  type="text"
                  name="email"
                  placeholder="Email*"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-[25vw] p-2 border border-gray-300 rounded-md focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-300 ease-in-out"
                />
              </div>
            </div>

            <div>
              <div className="mb-2">Pincode</div>
              <div className="flex">
                <input
                  type="text"
                  name="pincode"
                  placeholder="Enter Pincode*"
                  value={formData.pincode}
                  onChange={handleChange}

                  className="w-[25vw] p-2 border border-gray-300 rounded-md focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-300 ease-in-out"
                />
              </div>
            </div>
          </div>

          <div>
            <div className="mb-2">
              <label className="mt-4 font-medium text-gray-700 ml-1">State</label>
              <select
                name="state"
                value={formData.state}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded-md bg-white focus:border-blue-500 focus:ring-2 focus:ring-blue-200 hover:border-gray-400 transition-all duration-300 ease-in-out cursor-pointer appearance-none"
              >
                <option value="">Select state </option>
                <option value="Gujarat">Gujarat</option>
                <option value="Maharashtra">Maharashtra</option>
                <option value="Delhi">Delhi</option>
                <option value="Karnataka">Karnataka</option>
                <option value="Tamil Nadu">Tamil Nadu</option>
                <option value="West Bengal">West Bengal</option>
                <option value="Rajasthan">Rajasthan</option>
                <option value="Uttar Pradesh">Uttar Pradesh</option>
              </select>
            </div>

            <div className="mb-2">
              <label className="font-medium text-gray-700 ml-1">City</label>
              <input
                type="text"
                name="city"
                placeholder=" City (Required)*"
                value={formData.city}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded-md focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-300 ease-in-out"
              />
            </div>

            <div>
              <label className="font-medium text-gray-700 ml-1">Address</label>
              <textarea
                name="address"
                placeholder=" Address (Required)*"
                rows={3}
                value={formData.address}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded-md focus:border-blue-500 focus:ring-2 focus:ring-blue-200 resize-none transition-all duration-300 ease-in-out"
              ></textarea>
            </div>

            <button
              className="mt-4 px-6 py-3 w-full bg-blue-500 text-white rounded-lg font-semibold hover:bg-blue-600 hover:scale-102 hover:shadow-lg active:scale-100 transition-all duration-200 ease-in-out"
              onClick={() => {
                handleNext();
                DeliveryDate();
              }}
            >
              Save & Continue
            </button>
          </div>
        </div>
      ),
    },
    {
      title: "Bill",
      content: (
        <div className="mx-auto bg-white/80 backdrop-blur-xl shadow-lg rounded-2xl p-6 border border-gray-200">
          {/* Your existing bill content */}
          <h3 className="text-2xl font-bold mb-6 text-center text-gray-800">
            🧾 Invoice
          </h3>

          {/* Customer Info */}
          <div className="mb-6 text-sm text-gray-600">
            <div className="flex justify-between">
              <p>
                <span className="font-semibold">Customer:</span> {formData.name}
              </p>
              <p>
                <span className="font-semibold">Date:</span>{" "}
                {new Date().toLocaleDateString()}
              </p>
            </div>
            <p className="mt-1">
              <span className="font-semibold">Bill No:</span> #INV-10234
            </p>
          </div>

          {/* Product Details */}
          <div className="mb-6 rounded-xl overflow-hidden border border-gray-200">
            <table className="w-full text-sm">
              <thead className="bg-gray-100 text-gray-700">
                <tr>
                  <th className="p-3 text-left">Product</th>
                  <th className="p-3 text-center">Quantity</th>
                  <th className="p-3 text-center">Price</th>
                  <th className="p-3 text-center text-green-600">Discount</th>
                  <th className="p-3 text-center">Total</th>
                </tr>
              </thead>
              <tbody className="divide-y">
                {qty.map((q, index) => (
                  <tr key={index}>
                    <td className="p-3">{q.name}</td>
                    <td className="p-3 text-center">{q.qty}</td>
                    <td className="p-3 text-center">{q.previous_mrp}</td>
                    <td className="p-3 text-center text-green-600">{q.discount}</td>
                    <td className="p-3 text-center">{q.price * q.qty}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {/* Price Summary */}
          <div className="space-y-2 text-gray-700">
            <div className="flex justify-between">
              <span>Subtotal</span>
              <span>₹{total}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-green-600">Applied Coupon</span>
              <span className="text-green-600">-₹{coupon}</span>
            </div>
            <div className="flex justify-between">
              <span>Delivery</span> <span>+₹49</span>
            </div>
            <div className="flex justify-between text-lg font-bold text-gray-900 border-t pt-3">
              <span>Total</span>{" "}
              <span className="text-blue-600">₹{total + 49 - coupon}</span>
            </div>
          </div>

          {/* Payment Button */}
          <button
            className="mt-6 w-full px-6 py-3 bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-xl font-semibold shadow-lg hover:scale-102 hover:shadow-xl active:scale-100 transition-all duration-300 ease-in-out"
            onClick={() => {
              setCurrent(2)
              setFinalTotal(total + 49 - coupon)
            }}
          >
            Proceed to Payment →
          </button>

          {/* Footer */}
          <p className="text-xs text-center mt-6 text-gray-400">
            Thank you for trusting our pharmacy 💊
          </p>
        </div>
      ),
    },
    {
      title: "Payment",
      content: (
        <div className="p-6">
          {/* Payment Summary */}
          <div className="mb-6 rounded-xl overflow-hidden border border-gray-200">
            <table className="w-full text-sm">
              <thead className="bg-gray-100 text-gray-700">
                <tr>
                  <th className="p-3 text-left">Product</th>
                  <th className="p-3 text-center">Price</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="p-3">Product({qty.length})</td>
                  <td className="p-3 text-center">₹{total}</td>
                </tr>
                <tr>
                  <td className="p-3">Applied Coupon</td>
                  <td className="p-3 text-center">-₹{coupon}</td>
                </tr>
                <tr>
                  <td className="p-3">Delivery Charges</td>
                  <td className="p-3 text-center">₹49</td>
                </tr>
                <tr>
                  <td className="p-3 border-t font-semibold">Total</td>
                  <td className="p-3 text-center border-t font-semibold">
                    ₹{total - coupon + 49}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* Payment Methods */}
          <div>
            <div className="text-lg font-semibold mb-4">Payment Methods</div>

            <div className="flex gap-4 mb-6">
              <label className="flex items-center gap-3 p-4 border-2 border-gray-200 rounded-lg cursor-pointer transition-all duration-200 hover:border-blue-500 hover:bg-blue-50 flex-1">
                <input
                  type="radio"
                  name="payment"
                  value="cod"
                  className="w-5 h-5 text-blue-600"
                  onChange={(e) => setValue(e.target.value)}
                />
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
                    <span className="text-white text-sm">₹</span>
                  </div>
                  <span className="font-medium">Cash on Delivery</span>
                </div>
              </label>

              <label className="flex items-center gap-3 p-4 border-2 border-gray-200 rounded-lg cursor-pointer transition-all duration-200 hover:border-blue-500 hover:bg-blue-50 flex-1">
                <input
                  type="radio"
                  name="payment"
                  value="online"
                  className="w-5 h-5 text-blue-600"
                  onChange={(e) => setValue(e.target.value)}
                />
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
                    <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M4 4a2 2 0 00-2 2v1h16V6a2 2 0 00-2-2H4zM18 9H2v5a2 2 0 002 2h12a2 2 0 002-2V9z" />
                    </svg>
                  </div>
                  <span className="font-medium">Online Payment</span>
                </div>
              </label>
            </div>

            {/* Payment Content */}
            {value === "Select Payment Methods" && (
              <div className="text-center py-8 text-gray-500">
                <p>Please select your payment method</p>
              </div>
            )}

            {value === "cod" && (
              <div className="flex justify-center items-center mt-8">
                <button
                  onClick={
                    () => {
                      setPaymentMOD("Cash on Delivery")
                      localStorage.removeItem('MOD')
                      localStorage.setItem('MOD', "Cash on Delivery")
                      console.log(PaymentMOD)
                      navigate("/success")
                    }
                  }
                  className="px-8 py-3 rounded-xl text-lg font-semibold text-white bg-gradient-to-r from-green-500 to-green-600 shadow-xl hover:shadow-green-400/60 hover:scale-105 transition-all duration-300 ease-in-out focus:outline-none focus:ring-4 focus:ring-green-300"
                >
                  Place Order (COD)
                </button>
              </div>
            )}

            {value === "online" && (
              <div className=" rounded-xl  flex justify-center items-center">
                <h3 className="text-xl font-semibold mb-2 text-center">
                  <button
                    onClick={() => {
                      checkout()
                      setPaymentMOD("Cash on Delivery")
                      localStorage.removeItem('MOD')
                      localStorage.setItem('MOD', "Online")
                    }
                    }
                    className="px-8 py-3 rounded-xl text-lg font-semibold text-white bg-gradient-to-r from-green-500 to-green-600 shadow-xl hover:shadow-green-400/60 hover:scale-105 transition-all duration-300 ease-in-out focus:outline-none focus:ring-4 focus:ring-green-300"
                  >
                    Go Payment
                  </button>
                </h3>

              </div>
            )}
          </div>
        </div>
      ),
    },
  ];

  return (
    <div>
      {contextHolder}
      <div className="w-4/5 max-w-4xl mx-auto mt-20  p-6 rounded-2xl bg-white shadow-lg">
        <Steps current={current} className="mb-8">
          {steps.map((item, index) => (
            <Step key={index} title={item.title} />
          ))}
        </Steps>

        <div className="min-h-[400px] p-6  rounded-2xl">
          {steps[current].content}
        </div>
      </div>
    </div>
  );
};

export default AddressPage;

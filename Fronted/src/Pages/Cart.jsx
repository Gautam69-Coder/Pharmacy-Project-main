import React, { useState, useEffect } from "react";
import Navbar from "../Components/Navbar";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Button, Drawer, Input, Tag, Space, Divider } from 'antd';
import { PercentageOutlined, GiftOutlined, CloseOutlined } from '@ant-design/icons';


const Cart = () => {
  // const stripe = useStripe();
  // const elements = useElements();
  const navigate = useNavigate();
  const [prodata, setProdata] = useState([]);
  const [open, setOpen] = useState(false);
  const [couponCode, setCouponCode] = useState('');
  const [appliedCoupon, setAppliedCoupon] = useState(null);
  const [couponDiscount, setCouponDiscount] = useState(0);


  const availableCoupons = [
    { code: 'SAVE10', discount: 10, minOrder: 500, type: 'percentage', description: '10% off on orders above ₹500' },
    { code: 'FLAT50', discount: 50, minOrder: 200, type: 'fixed', description: '₹50 off on orders above ₹200' },
    { code: 'WELCOME20', discount: 20, minOrder: 0, type: 'percentage', description: '20% off for new users' },
    { code: 'HEALTH100', discount: 100, minOrder: 1000, type: 'fixed', description: '₹100 off on orders above ₹1000' }
  ];

  // Delivery Charges
  const deliveryChargeOriginal = 149;
  const deliveryChargeDiscounted = 49;
  const deliverySavingThreshold = 99;
  const deliverySavingAmount = 49;

  const showDrawer = () => {
    setOpen(true);
  };

  const onClose = () => {
    setOpen(false);
    setCouponCode('');
  };

  // Apply coupon function
  const applyCoupon = (coupon) => {
    const totalPrice = prodata.reduce((sum, item) => sum + item.price * item.quantity, 0);

    if (totalPrice < coupon.minOrder) {
      alert(`Minimum order value should be ₹${coupon.minOrder} to apply this coupon`);
      return;
    }

    let discount = 0;
    if (coupon.type === 'percentage') {
      discount = (totalPrice * coupon.discount) / 100;
    } else {
      discount = coupon.discount;
    }

    setAppliedCoupon(coupon);
    setCouponDiscount(discount);
    setOpen(false);
    setCouponCode('');
  };

  // Remove applied coupon
  const removeCoupon = () => {
    setAppliedCoupon(null);
    setCouponDiscount(0);
  };

  // Apply coupon by code
  const handleApplyCouponCode = () => {
    const coupon = availableCoupons.find(c => c.code.toLowerCase() === couponCode.toLowerCase());
    if (coupon) {
      applyCoupon(coupon);
    } else {
      alert('Invalid coupon code');
    }
  };

  const url="http://localhost:3000"

  // Fetch cart products
  useEffect(() => {
    axios
      .get(`${url}/prodata`)
      .then((res) =>
        setProdata(
          res.data.map((item) => ({
            ...item,
            quantity: item.quantity || 1,
            price: item.price || 0,
            previous_mrp: item.previous_mrp || item.mrp || item.price || 0,
            discount: item.discount || "10%",
            description: item.description,
            id: item.id
          }))
        )
      )
      .catch((err) => console.log(err));
  }, []);

  // Quantity Change
  const handleQuantityChange = async(index, value,id) => {
    setProdata((prev) =>
      prev.map((item, idx) =>
        idx === index ? { ...item, quantity: parseInt(value) } : item,
      )
    );

    

    await axios.get(`${url}/qty`,{params:{
      qty:value,
      index:index
    }})  
        .then((res)=>{
          console.log(res.data)
        })
        .catch((err)=>{
          console.log(err.data)
        })
      };
      

  // Remove item
  const removeItem = (index) => {
    axios.delete(`${url}/cart/${index}`)
      .then(() => {
        setProdata(prev => prev.filter((_, i) => i !== index));
      })
      .catch(err => console.log(err));
  };



  // Navigations & Alerts
  const handleAddMoreMedicines = () => navigate("/Home");
  const handleAddAddress = () => {
    navigate('/cart/address/')
    console.log(couponDiscount)
    localStorage.setItem('Coupon',couponDiscount)
  }

  // Totals
  const totalMRP = prodata.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const totalPrice = prodata.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const discountAmount = totalMRP - totalPrice;
  const finalPrice = totalPrice - couponDiscount;
  const estimatedPayable = finalPrice + deliveryChargeDiscounted;

  // const stripePromise = loadStripe(
  //   "pk_test_51Rx3XKF97VbwJCIQYXforXnnQ8CjGbb1w9AZ0segEw6jDcytkm92cR25FusS8y52cvHlyK9mp0KqKKeLDT0sF3My00mQKyHkEV"
  // );

  return (
    <div>
      <div className="bg-gray-50 min-h-screen">
        <Navbar />
        <div className="max-w-7xl mx-auto py-8 px-4 mt-[6%]">
          {prodata.length === 0 ? (
            // Empty Cart Design
            <div className="text-center">
              <h2 className="text-xl font-semibold text-gray-700 mb-4">
                Your cart is empty
              </h2>
              <img
                className="w-72 mx-auto mb-6"
                src="https://assets.truemeds.in/Images/website-assets/icons/status/empty-cart-new.svg?width=320"
                alt="Empty Cart"
              />
              <button
                onClick={() => navigate("/Home")}
                className="bg-green-500 text-white px-6 py-3 rounded-lg text-lg hover:bg-green-600 transition-all"
              >
                Add Medicine
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

              <div className="lg:col-span-2 space-y-6">
                {prodata.map((product, index) => (
                  <div
                    key={index}
                    className="flex flex-col md:flex-row bg-white rounded-lg shadow-md transition-all hover:scale-102  p-4 "
                  >
                    <div className="w-24 h-24 border-cyan-50 rounded-md overflow-hidden bg-gray-50">
                      <img
                        src={product.image}
                        alt={product.name}
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
                        <h3 className="text-lg font-semibold">{product.name}</h3>
                        <p className="text-sm text-gray-500">
                          {product.description || "No description"}
                        </p>
                      </div>

                      <div className="flex items-center space-x-4 mt-3">
                        <span className="text-lg font-semibold text-gray-900">
                          ₹{(product.price * product.quantity).toFixed(2)}
                        </span>
                        <span className="line-through text-gray-400">
                          ₹{(product.previous_mrp * product.quantity).toFixed(2)}
                        </span>
                        <span className="text-green-600 font-semibold">
                          {product.discount} OFF
                        </span>
                      </div>
                    </div>

                    {/* Quantity & Remove */}
                    <div className="mt-4 md:mt-0 flex flex-col justify-between items-end">
                      <button
                        onClick={() => removeItem(index)}
                        className="text-gray-400 hover:text-red-500"
                        aria-label="Remove"
                      >
                        <CloseOutlined className="text-lg" />
                      </button>
                      <select
                        value={product.quantity}
                        onChange={(e) => {
                          handleQuantityChange(index, e.target.value,prodata.id)
                        }
                        }
                        className="border border-blue-600 rounded-md px-2 py-1 text-blue-700 font-semibold focus:outline-none focus:ring-2 focus:ring-blue-500"
                      >

                        <option>1</option>
                        <option>2</option>
                        <option>3</option>
                        <option>4</option>

                      </select>
                    </div>
                  </div>
                ))}

                <button
                  onClick={handleAddMoreMedicines}
                  className="w-full border border-blue-600 text-blue-600 px-4 py-3 rounded-lg font-semibold hover:bg-blue-50 transition"
                >
                  + Add More Medicines
                </button>
              </div>

              <div className="bg-white rounded-lg shadow p-6">
                {/* Apply Coupon Button */}
                {!appliedCoupon ? (
                  <Button
                    onClick={showDrawer}
                    icon={<GiftOutlined />}
                    className="w-full h-12 border-2 border-blue-600 text-blue-600 font-semibold rounded-lg mb-6 hover:bg-blue-50 transition-all duration-300"
                    size="large"
                  >
                    Apply Coupon
                  </Button>
                ) : (
                  <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg">
                    <div className="flex justify-between items-center">
                      <div className="flex items-center space-x-2">
                        <GiftOutlined className="text-green-600" />
                        <span className="font-semibold text-green-700">
                          {appliedCoupon.code}
                        </span>
                        <Tag color="green">Applied</Tag>
                      </div>
                      <Button
                        type="text"
                        size="small"
                        icon={<CloseOutlined />}
                        onClick={removeCoupon}
                        className="text-gray-500 hover:text-red-500"
                      />
                    </div>
                    <p className="text-sm text-green-600 mt-1">
                      You saved ₹{couponDiscount.toFixed(2)}
                    </p>
                  </div>
                )}

                <h3 className="font-semibold text-xl mb-4">Bill Details</h3>

                <div className="flex justify-between text-gray-600 text-sm mb-2">
                  <span>MRP</span>
                  <span>₹{totalMRP.toFixed(2)}</span>
                </div>
                
                {appliedCoupon && (
                  <div className="flex justify-between text-green-600 text-sm font-semibold mb-2">
                    <span>Coupon Discount ({appliedCoupon.code})</span>
                    <span>-₹{couponDiscount.toFixed(2)}</span>
                  </div>
                )}
                <div className="flex justify-between items-center text-gray-600 text-sm mb-2">
                  <span>Delivery charge</span>
                  <span>
                    <span className="line-through mr-1">
                      ₹{deliveryChargeOriginal}
                    </span>
                    ₹{deliveryChargeDiscounted}
                  </span>
                </div>
                {totalPrice < deliverySavingThreshold && (
                  <p className="text-green-600 text-xs mb-4">
                    Add items worth ₹
                    {(deliverySavingThreshold - totalPrice).toFixed(2)} to save ₹
                    {deliverySavingAmount} on delivery
                  </p>
                )}

                <hr className="my-4" />

                <div className="flex justify-between font-semibold text-lg">
                  <span>Estimated Payable</span>
                  <span>₹{estimatedPayable.toFixed(2)}</span>
                </div>
                <p className="text-gray-400 text-xs mb-6">
                  Inclusive of all taxes
                </p>

                <button
                  onClick={handleAddAddress}
                  className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition"
                >
                  Add Address
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Coupon Drawer */}
        <Drawer
          title={
            <div className="flex items-center space-x-2">
              <GiftOutlined className="text-blue-600" />
              <span className="text-lg font-semibold">Apply Coupon</span>
            </div>
          }
          placement="right"
          onClose={onClose}
          open={open}
          width={400}
          className="coupon-drawer"
        >
          <div className="space-y-6">
            {/* Enter Coupon Code Section */}
            <div>
              <h4 className="font-semibold mb-3">Enter Coupon Code</h4>
              <Space.Compact style={{ width: '100%' }}>
                <Input
                  placeholder="Enter coupon code"
                  value={couponCode}
                  onChange={(e) => setCouponCode(e.target.value.toUpperCase())}
                  className="h-8"
                />
                <Button
                  type="primary"
                  onClick={handleApplyCouponCode}
                  className="h-10 px-6"
                  disabled={!couponCode.trim()}
                >
                  Apply
                </Button>
              </Space.Compact>
            </div>

            <Divider />

            {/* Available Coupons */}
            <div>
              <h4 className="font-semibold mb-4">Available Coupons</h4>
              <div className="space-y-4">
                {availableCoupons.map((coupon, index) => (
                  <div
                    key={index}
                    className="border border-gray-200 rounded-lg p-4 hover:border-blue-300 transition-colors"
                  >
                    <div className="flex justify-between items-start mb-2">
                      <div className="flex items-center space-x-2">
                        <PercentageOutlined className="text-blue-600" />
                        <span className="font-bold text-blue-600">{coupon.code}</span>
                      </div>
                      <Button
                        size="small"
                        type="primary"
                        onClick={() => applyCoupon(coupon)}
                        disabled={totalPrice < coupon.minOrder}
                      >
                        Apply
                      </Button>
                    </div>
                    <p className="text-sm text-gray-600 mb-2">{coupon.description}</p>
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-green-600 font-semibold">
                        Save {coupon.type === 'percentage' ? `${coupon.discount}%` : `₹${coupon.discount}`}
                      </span>
                      {coupon.minOrder > 0 && (
                        <span className="text-gray-500">
                          Min order: ₹{coupon.minOrder}
                        </span>
                      )}
                    </div>
                    {totalPrice < coupon.minOrder && (
                      <p className="text-red-500 text-xs mt-1">
                        Add ₹{(coupon.minOrder - totalPrice).toFixed(2)} more to use this coupon
                      </p>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </Drawer>
      </div>
    </div>
  );
};

export default Cart;

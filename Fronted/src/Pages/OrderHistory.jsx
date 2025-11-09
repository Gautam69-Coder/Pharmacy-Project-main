import React, { useState, useEffect } from "react";
import axios from "axios";
import { Accordion, AccordionItem } from "@heroui/react";
import { Steps } from 'antd';

const OrderHistory = () => {
  const [groupedOrders, setGroupedOrders] = useState([]);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const res = await axios.get("http://localhost:3000/orderdata");

        let groups = {};

        res.data.forEach((order) => {
          const key = `${order.date}-${order.time.slice(0, 5)}`;

          if (!groups[key]) {
            groups[key] = {
              _id: order._id,
              date: order.date,
              time: order.time.slice(0, 5),
              items: [],
            };
          }
          groups[key].items.push(order);
        });

        setGroupedOrders(Object.values(groups));
      } catch (err) {
        console.log(err);
      }
    };

    fetchOrders();
  }, []);

  return (
    <div className="max-w-4xl mx-auto p-6 mt-20">
      {groupedOrders.map((group, index) => (
        <div
          key={index}
          className="mb-6 py-2 bg-white rounded-lg shadow-sm border border-gray-300 transition-all hover:shadow-md hover:scale-102"
        >
          {/* Preview Section with dropdown */}
          {group.items.length > 0 && (
            <Accordion variant="splitted">
              <AccordionItem
                key={`products-${index}`}
                aria-label="Products"
                title={
                  <div className="flex w-full items-center gap-3 cursor-pointer">
                    <div className="w-40 flex justify-center">
                      <img
                        src={group.items[0].image}
                        alt="Product"
                        className="w-20 h-20 rounded-md bg-gray-50"
                      />
                      {group.items[1] && (
                        <img
                          src={group.items[1].image}
                          alt="Product"
                          className="w-20 h-20 rounded-md bg-gray-50"
                        />
                      )}
                    </div>
                    <div className="flex-1">
                      <h2 className="text-base font-medium text-black">
                        Delivered on{" "}
                        <span className="text-green-600 font-bold">
                          {group.items[0].devliverdate}
                        </span>
                      </h2>
                      <p className="text-sm font-medium text-gray-700">
                        Medicines Basket ({group.items.length})
                      </p>
                    </div>
                  </div>
                }
              >
                {/* Full Products List */}

                <div className="w-full mx-auto space-y-4 mb-3">
                  {/* Order Status */}
                  <div className="bg-white rounded-xl shadow-md border border-gray-200 p-6">
                    <h2 className="text-lg font-bold text-gray-800">
                      Order Status
                    </h2>
                    <div className="flex items-center justify-between mt-4">
                      <Steps
                        current={2}
                        items={[
                          {
                            title: "Order Confirmed",
                            description: group.items[0].date,
                          },
                          {
                            title: "Shipped",
                            description: group.items[0].shipmentdate || "-",
                          },
                          {
                            title: "Deliveried Date",
                            description: group.items[0].devliverdate || "-",
                          },
                        ]}
                      />
                    </div>
                  </div>

                  {/* Order Summary */}
                  <div className="bg-white rounded-xl shadow-md border border-gray-200 p-6">
                    <h2 className="text-lg font-bold text-gray-800">
                      Order Summary
                    </h2>
                    <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-gray-700">
                      <div>
                        <p>
                          <strong>Order ID:</strong> #{group.items[0]._id}
                        </p>
                        <p>
                          <strong>Date:</strong> {group.items[0].date}
                        </p>
                        <p>
                          <span className="font-semibold "> Delivery Date:</span>{" "}
                          <span className="text-green-600 font-medium">
                            {group.items[0].devliverdate}
                          </span>
                        </p>
                        <p>
                          <strong>Time:</strong> {group.items[0].time}
                        </p>
                        <p>
                          <strong>Payment Method:</strong> {group.items[0].payment}
                        </p>
                        <p>
                          <strong>Total Amount:</strong> ₹
                          {group.items[0].total || group.items[0].price}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Delivery Address */}
                  <div className="bg-white rounded-xl shadow-md border border-gray-200 p-6">
                    <h2 className="text-lg font-bold text-gray-800">
                      Delivery Address
                    </h2>
                    <div className="mt-4 text-sm text-gray-700">
                      <p>{group.items[0].fullname}</p>
                      <p>{group.items[0].pincode}</p>
                      <p>
                        {group.items[0].city}, {group.items[0].state} -{" "}
                        {group.items[0].address}
                      </p>
                      <p>Phone: {group.items[0].phonenumber}</p>
                    </div>
                  </div>

                  {/* Ordered Items */}
                  <div className="bg-white rounded-xl shadow-md border border-gray-200 p-4">
                    <div className="mt-4 divide-y">
                      <div className="mx-auto bg-white/80 backdrop-blur-xl rounded-2xl">
                        {/* Invoice */}
                        <h3 className="text-2xl font-bold mb-6 text-center text-gray-800">
                          🧾 Invoice
                        </h3>

                        {/* Customer Info */}
                        <div className="mb-6 text-sm text-gray-600">
                          <div className="flex justify-between">
                            <p>
                              <span className="font-semibold">Customer:</span>{" "}
                              {group.items[0].fullname}
                            </p>
                            <p>
                              <span className="font-semibold">Date:</span>{" "}
                              {group.date}
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
                                <th className="p-3 text-center text-green-600">
                                  Discount
                                </th>
                                <th className="p-3 text-center">Total</th>
                              </tr>
                            </thead>
                            <tbody className="divide-y">
                              {group.items.map((q, idx) => (
                                <tr key={idx}>
                                  <td className="p-3">{q.name}</td>
                                  <td className="p-3 text-center">{q.qty}</td>
                                  <td className="p-3 text-center">{q.previous_mrp}</td>
                                  <td className="p-3 text-center text-green-600">
                                    {q.discount}
                                  </td>
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
                            <span>₹{group.items[0].total + (group.items[0].coupon || 0) - 49}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-green-600">Applied Coupon</span>
                            <span className="text-green-600">-₹{group.items[0].coupon || 0}</span>
                          </div>
                          <div className="flex justify-between">
                            <span>Delivery</span> <span>+₹49</span>
                          </div>
                          <div className="flex justify-between text-lg font-bold text-gray-900 border-t pt-3">
                            <span>Total</span>{" "}
                            <span className="text-blue-600">₹{group.items[0].total}</span>
                          </div>
                        </div>

                        {/* Footer */}
                        <p className="text-xs text-center mt-6 text-gray-400">
                          Thank you for trusting our pharmacy 💊
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="bg-white rounded-xl shadow-md border border-gray-200 p-6 flex flex-wrap gap-4">
                    <button className="px-4 py-2 text-sm bg-green-600 text-white rounded-lg hover:bg-green-700 cursor-pointer">
                      Reorder
                    </button>
                    <button className="px-4 py-2 text-sm border rounded-lg hover:bg-gray-100 cursor-pointer">
                      Download Invoice
                    </button>
                    {group.items[0].status === "Delivered" && (
                      <button className="px-4 py-2 text-sm border rounded-lg text-red-600 hover:bg-red-50 cursor-pointer">
                        Return / Replace
                      </button>
                    )}
                    {group.items[0].status !== "Cancelled" &&
                      group.items[0].status !== "Delivered" && (
                        <button className="px-4 py-2 text-sm border rounded-lg text-red-600 hover:bg-red-50 cursor-pointer">
                          Cancel Order
                        </button>
                      )}
                  </div>
                </div>
              </AccordionItem>
            </Accordion>
          )}
        </div>
      ))}
    </div>
  );
};

export default OrderHistory;

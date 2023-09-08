import React, { useEffect, useState } from "react";
import axios from "axios";
import "./CurrentOrder.css";

axios.defaults.baseURL = process.env.REACT_APP_BASE_URL;

const beepSound = new Audio("beep-09.mp3"); // Replace with the path to your audio file

const CurrentOrder = () => {
  const [orders, setOrders] = useState([]);
  const [hasNewOrders, setHasNewOrders] = useState(false);

  const [formData, setFormData] = useState({
    deliveryTime: "",
    acceptance: "Accept", // Default value
  });

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleFormSubmit = async (e, orderId) => {
    e.preventDefault();
    try {
      // Include status and deliveryTime in the request body
      const requestData = {
        orderStatus: formData.acceptance, // Assuming acceptance represents orderStatus
        deliveryTime: formData.deliveryTime,
      };
  
      const res=await axios.put(`/api/orders/${orderId}/status/deliverytime`, requestData);
      console.log("after click the button of accept",res.data.orderStatus);
      if(res.data && res.data.res.data.orderStatus){

      }

    } catch (error) {
      console.error("Error updating order:", error);
    }
  };
  useEffect(() => {
    const getOrders = async () => {
      try {
        const res = await axios.get("/api/orders");
        console.log(res.data);

        const newOrders = res.data;

        const filteredOrders = newOrders.filter((newOrder) => {
          return !orders.some(
            (existingOrder) => existingOrder._id === newOrder._id
          );
        });

        if (filteredOrders.length > 0) {
          setHasNewOrders(true);
          beepSound.play();
        } else {
          setHasNewOrders(false);
        }

        setOrders((prevOrders) => [...prevOrders, ...filteredOrders]);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    const intervalId = setInterval(() => {
      getOrders();
    }, 200);

    // Clear the interval when the component unmounts
    return () => clearInterval(intervalId);
  }, [orders]);

  return (
    <div className="container order-container">
      {/* start */}
      {orders.map((order, index) => (
        <div className="order-details" key={order._id}>
          <div className="customer-name">Name: {order.customerName}</div>
          <div className="customer-address">
            Address1: {order.addressLine1} <br />
            Address2: {order.addressLine2}
          </div>
          <div className="customer-contact">Contact No: {order.mobile}</div>
          <div className="order-time">
            Date: {formatDate(order.orderTime)} <br />
            {formatTime(order.orderTime)}
          </div>
          <div className="order-price">Price: {order.totalPrice} ₹</div>
          <div className="order-status">Status: {order.orderStatus}</div>
          <br />
          <div className="confirm-details">
          <form onSubmit={(e) => handleFormSubmit(e, order._id)}>
              <div className="delivery-time">
                <input
                  type="time"
                  name="deliveryTime"
                  className="form-control"
                  value={formData.deliveryTime}
                  onChange={handleFormChange}
                />
              </div>
              <br />
              <div className="acceptance">
                <select
                  className="form-control"
                  name="acceptance"
                  value={formData.acceptance}
                  onChange={handleFormChange}
                >
                  <option value="Accept">Accept</option>
                  <option value="Reject">Reject</option>
                </select>
              </div>
              <br />
              <div className="update-customer">
                <button className="btn btn-block btn-success" type="submit">
                  Update Customer
                </button>
              </div>
            </form>
          </div>
          <br />
        </div>
      ))}
    </div>
  );
};





// Function to format date as "Date: Month Day, Year"
const formatDate = (dateString) => {
  const dateObject = new Date(dateString);
  const options = { year: "numeric", month: "long", day: "numeric" };
  return `Date: ${dateObject.toLocaleDateString(undefined, options)}`;
};

// Function to format time in 24-hour format "HH:MM:SS"
const formatTime = (dateString) => {
  const dateObject = new Date(dateString);
  const options = { hour: "2-digit", minute: "2-digit", hour12: true };
  return `Time: ${dateObject.toLocaleTimeString("en-US", options)}`;
};


export default CurrentOrder;

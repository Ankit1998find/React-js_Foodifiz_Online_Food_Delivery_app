import React, { useEffect, useState } from "react";
import axios from "axios";
import "./ConfirmOrder.css";
import Circle from "./Circle";
import { useLocation } from 'react-router-dom';

axios.defaults.baseURL = process.env.REACT_APP_BASE_URL;

const ConfirmOrder = () => {
  const location = useLocation();
  const orderId = location.state.orderId;
  const [orderData, setOrderData] = useState({}); // Use an object to store order data

  useEffect(() => {
    const getStatusTime = async () => {
      try {
        const res = await axios.get(`/api/orders/${orderId}`);
        console.log("response accept from kitchen", res.data);
        setOrderData(res.data); // Store the order data in the state
      } catch (error) {
        console.error('Error updating order:', error);
      }
    };

    // Call the getStatusTime function when the component mounts

   

    setInterval(() => {
      getStatusTime();
    }, 500);

  }, [orderId]);

  return (
    <div className="container m-auto">
      <div className="row">
        <div className="col-md-11 col-12">
          <div className="Confirm-Order card">
            <div className="confirm-message">
              <p>Your order has been successfully placed</p>
              <span>Wait For Kitchen Response</span>
            </div>
            {/* Access orderStatus and deliveryTime directly */}
            <p>Order Status:{orderData.orderStatus}</p>
           <p>Deliver By :{orderData.deliveryTime}</p>

            <div className="animated-circle">
              <Circle />
            </div>

            <a href="upi://pay?pa=UPIID@oksbi&amp;pn=FNAME SNAME K&amp;cu=INR">
              Pay Now !
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConfirmOrder;

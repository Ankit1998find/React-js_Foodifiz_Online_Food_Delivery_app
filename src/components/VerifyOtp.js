import React, { useState } from "react";
import axios from "axios";
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import './VerifyOtp.css'
import {toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

axios.defaults.baseURL = process.env.REACT_APP_BASE_URL;

const VerifyOtp = () => {
    
   const navigate = useNavigate();

    const location = useLocation();

    const otpFromState = location.state?.otp;

    const phoneNumber = location.state?.phoneNumber;

    const [enteredOtp, setEnteredOtp] = useState("");

    const [verificationStatus, setVerificationStatus] = useState(null);

    const notify = () => toast("Wait For Otp");
  
    const handleOtpChange = (event) => {
      const inputOtp = event.target.value;
      setEnteredOtp(inputOtp);
    };
  
    const handleVerify = async (event) => {
      alert("Wait For OTP");
      event.preventDefault();
     
      
  
      try {
        const response = await axios.post("/api/user/signup/verify", {
          number: phoneNumber,
          otp: otpFromState
        });
         console.log("all response",response.data);
         console.log("datmessage",response.data.message);
         console.log("createAt",response.data.data.createdAt);
         console.log("ID",response.data.data._id);

         console.log(enteredOtp);

         setVerificationStatus("Verification Successful");
         localStorage.setItem('token',response.data.token);
         localStorage.setItem('userid',response.data.data._id);
         localStorage.setItem('contact',response.data.data.number);
         

       

         navigate("/Products");

        

       
      

        // Handle further actions if needed
      } catch (error) {
      if (error.response && error.response.data) {
        setVerificationStatus(error.response.data); 
      } else {
        setVerificationStatus("Verification Failed");
      }
      }
    };

  

  return (
    <section className="Auth-container">
      <div className="container">
        <div className="row">
          <div className="col-md-12 col-12">
            <div className="auth-header">
              <h1>India's #1 Cloud Kitchen App</h1>
            </div>

            <div className="auth-line">
            <div className="otp-box">
            <p className="verification-status">{verificationStatus}</p>
           
            </div>
             

            
            </div>

            <div className="auth-input">
          
             
              <form onSubmit={handleVerify}>
                <div className="input">
              
                  <div>
                
                  </div>
                  <input
                    type="text"
                    value={otpFromState}
                    onChange={handleOtpChange}
                    maxLength={6}
                    placeholder="Enter OTP"
                  />
                </div>
                <div className="login-btn">
                  <button type="submit" onClick={notify} className="btn btn-danger btn-block">
                   VERIFY
                  </button>
                
             
                </div>
              </form>
             
            </div>

            {/* 
          here */}
          </div>
        </div>
      </div>
    </section>
  );
};

export default VerifyOtp;

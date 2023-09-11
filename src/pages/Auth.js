import React, { useState } from "react";
import axios from "axios";
import "./Auth.css";
import { useNavigate } from "react-router-dom";




axios.defaults.baseURL = process.env.REACT_APP_BASE_URL;

const Auth = () => {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [otp, setOtp] = useState("");
  const [error, setError] = useState(null);
  
  const navigate = useNavigate();

  const handlePhoneNumberChange = (event) => {
    const inputNumber = event.target.value;

    if (/^\d*$/.test(inputNumber) && inputNumber.length <= 10) {
      setPhoneNumber(inputNumber);
    }
  };

  const handleContinue = async (event) => {
    event.preventDefault();

    try {
      const response = await axios.post("/api/user/signup", {
        number: phoneNumber,
      });

      setOtp(response.data.otp);
      setError(null);
    } catch (error) {
      console.error("Error sending request:", error);
      setError(error.response ? error.response.data : "An error occurred");
    }
  };

  return (
    <>
      <section className="Auth-container">
        <div className="container">
          <div className="row">
            <div className="col-md-12 col-12">
              <div className="auth-header">
                <h1>India's #1 Cloud Kitchen App</h1>
              </div>

              <div className="auth-line">
                <span>Log in or sign In</span>
                <p className="error-message">{error && error.message}</p>
                <div className="otp-box">
                  {otp && (
                    <div className="otp-container">
                      <p>
                        OTP Received: {otp}{" "}
                        {otp ? (
                          <span
                            onClick={() =>
                              navigate("/verify", { state: { otp, phoneNumber } })
                            }
                          >
                            <br />
                            <button className="btn btn-success mt-2">Verify</button>
                          </span>
                        ) : (
                          "OTP Not Received"
                        )}
                      </p>
                    </div>
                  )}
                </div>
              </div>

              <div className="auth-input">
                <div className="flag-container">
                  <img src="/india.png" alt="" />
                </div>
                <form onSubmit={handleContinue}>
                  <div className="input">
                    <div>
                      <span>+91</span>
                    </div>
                    <input
                      type="text"
                      value={phoneNumber}
                      onChange={handlePhoneNumberChange}
                      maxLength={10}
                      placeholder="Mobile Number"
                      pattern="[0-9]*"
                      inputMode="numeric"
                    />
                  </div>
                  <div className="login-btn">
                    <button type="submit" className="btn btn-danger btn-block">
                      Continue
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>
  
  
    </>
  
  );
};

export default Auth;

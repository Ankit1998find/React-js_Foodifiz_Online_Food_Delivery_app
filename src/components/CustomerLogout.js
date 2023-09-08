import React, { useEffect, useCallback, useState } from 'react';
import axios from 'axios';

axios.defaults.baseURL = process.env.REACT_APP_BASE_URL;
export const CustomerLogout = () => {
  
  const userId = localStorage.getItem('userid');
  const [responseReceived, setResponseReceived] = useState(false);

  const HandleLogOut = useCallback(async () => {
    try {
      const response = await axios.delete(`/api/user/deleteUser/${userId}`);
      console.log(response.data);
      const token = localStorage.getItem('token');
      console.log('token', token);
      if (response.data) {
        localStorage.removeItem('token');
        setResponseReceived(true); // Set the response received flag
      }
    } catch (error) {
      console.log(error);
    }
  }, [userId]);

  useEffect(() => {
    HandleLogOut();
  }, [HandleLogOut]);

  useEffect(() => {
    if (responseReceived) {
      // Redirect to login immediately using window.location.replace()
      window.location.replace('/');
    }
  }, [responseReceived]);

  return (
    <div>CustomerLogout</div>
  );
};

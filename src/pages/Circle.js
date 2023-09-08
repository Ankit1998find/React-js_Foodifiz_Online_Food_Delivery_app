import React, { useState, useEffect } from 'react';
import './Circle.css';

const Circle = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setIsLoading(false);
    }, 5000);

    return () => {
      clearTimeout(timeout);
    };
  }, []);

  return (
    <div className="circle">
      {isLoading ? <div className="loader"></div> : <p></p>}
    </div>
  );
};

export default Circle;

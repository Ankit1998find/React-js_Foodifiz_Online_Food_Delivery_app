import React, { useEffect, useState } from "react";
import axios from "axios";
import "./FoodMenu.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { useNavigate } from "react-router-dom";
import ProductFilter from "./ProductFilter";


import HeroSection from "./HeroSection";

import "./Accordion.css";

axios.defaults.baseURL = process.env.REACT_APP_BASE_URL;


const ProductList = ({ setProductId }) => {

  const [products, setProducts] = useState([]);

  console.log("products", products);

  const navigate = useNavigate();

 
    const getProducts = async (queryParams) => {
      try {
        const res = await axios.get("/products",{ params: queryParams });
        setProducts(res.data);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };
   
    useEffect(() => {
      getProducts();
    }, []);
 

  
  const handleProductClick = (Id) => {
    setProductId(Id);

    navigate("/Single-Product");
  };

  const handleSort = (e) => {
    const field = e.target.value.split('.');
    const queryParams = {};

    if (field[0] === 'category') {
      queryParams.category = field[1];
    } else {
      queryParams.sort = field[0];
      queryParams.order = field[1];
    }

    getProducts(queryParams);
  };

  
  return (
    <>
      <HeroSection />

      <ProductFilter handleSort={handleSort} />

      <div className="container">
      
        <div className="row">
          {products.map((product, index) => (
            <div className="col-md-3">
              <div class="card menucard"  key={index}
                onClick={() => handleProductClick(product._id)}>
                <div class="card-header">
                  <div className="image">
                    <img src={product.thumbnail} alt="" />
                  </div>
                </div>
                <div class="card-body">
                  <div className="title">
                    <p>{product.foodHeading}</p>
                  </div>
                </div>
                <div class="card-footer">
                  <div className="food-price">
                    <span>₹</span> {product.price}
                  </div>
                  <div className="order-btn-menu"><span className="fa fa-star checked"></span> {product.rating}</div>
                </div>
                <div className="rating">
                  <span className="fa fa-star checked"></span>
                  <span className="fa fa-star checked"></span>
                  <span className="fa fa-star checked"></span>
                  <span className="fa fa-star"></span>
                  <span className="fa fa-star"></span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default ProductList;

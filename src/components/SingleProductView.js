import React, { useEffect, useState } from "react";
// import { useParams } from "react-router-dom";
import axios from "axios";
import './SingleProductView.css'

import "bootstrap/dist/css/bootstrap.min.css";

import "./FadeInComponent.css";

import { Link } from "react-router-dom";

import ProductFilter from "./ProductFilter";




axios.defaults.baseURL = process.env.REACT_APP_BASE_URL;



const SingleProductView = ({productId,getCard}) => {
  
  const [products, setProducts] = useState(null);

  console.log("singleproduct",products);

  //State  for Fade In

  const [isVisible, setIsVisible] = useState(false);

  //onclick cart product is to be set



  const [cart, setCart] = useState([]);

  const user_id = localStorage.getItem('userid');


 

  useEffect(() => {
    const saveCart = async () => {
      try {
        const formattedCart = cart.map((item) => ({
          product: {
            productId: item._id,
            name: item.foodHeading,
          },
          quantity: item.quantity,
        }));
  
        const cartData = {
          userId: user_id,
          items: formattedCart,
        };
        
      console.log("going data",cartData)

        const response = await axios.post('/api/cart', cartData);
        console.log('cart added', response.data);
      } catch (error) {
        console.error('Error adding cart:', error);
      }
    };

   saveCart();
   
  }, [cart, user_id]);



  





 



 
//send the updated card to app.js
  const [allproducts, setallProducts] = useState([]);

  useEffect(()=>{
    getCard(cart);
  });



  



  const getProductsall = async (queryParams) => {
    try {
      const res = await axios.get("/products",{ params: queryParams });
      setallProducts(res.data);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };
 
  useEffect(() => {
    getProductsall();
  }, []);

  const handleSort = (e) => {
    const field = e.target.value.split('.');
    const queryParams = {};

    if (field[0] === 'category') {
      queryParams.category = field[1];
    } else {
      queryParams.sort = field[0];
      queryParams.order = field[1];
    }

    getProductsall(queryParams);
  };

  // this code for getting all products end

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await axios.get(`/products/${productId}`);
        const responseData = Array.isArray(res.data) ? res.data : [res.data];
        setProducts(responseData);
      } catch (error) {
        console.error("Error fetching product:", error);
      }
    };
    fetchProduct();
  }, [productId]);

  if (!products) {
    return <div>Loading...</div>;
  }

  //handle fadeIn when Button Is Clicked

  const handleFadeIn = (product) => {
    setIsVisible(true);
    setCart( (prevCart) => [...prevCart, { ...product, quantity: 1 }]);

   
  
    
  };


const handleRemove = (indexToRemove) => {
  const updatedCart = cart.filter((_, index) => index !== indexToRemove);
  setCart(updatedCart);
  getCard(updatedCart);
};




  


  return (

   
      <>
   
      <div className="container">
        
      <div className="row">
          {products.map((product, index) => (
            <div className="col-md-8 mb-5">
              <div class="card single-card"  key={index}
                >
                <div class="card-header single-card-header">
                  <div className="single-image">
                    <img src={product.thumbnail} alt="" />
                  </div>
                </div>
                <div class="card-body single-card-body">
                  <div className="food-description single-food-description">
                  <span>
                    <b>{product.foodHeading}</b><br />
                    <hr />
                    {product.foodDescription}
                    </span>
                  </div>
                
                 <div className="food-price single-food-price">
                 <span>{product.kitchenName}</span><span>{product.price} ₹</span>
                 </div>

                 <div className="food-rating single-food-rating">
                  <span>Rating: {product.rating}</span>
                   <span><button className="btn btn-danger" onClick={() => handleFadeIn(product)}>ADD +</button></span>
                 </div>
                 
                 
                </div>
             

               

              </div>
            </div>
          ))}
 {cart.length > 0 && (
          <div className="col-md-4 col-12">
          <div
              className={`fade-in-element ${isVisible ? "visible card" : ""}`}
            >
              {cart.map((cartItem, cartindex) => (
                <div className="single-cart-data-fade" key={cartindex}>
                  <div className="single-cart-description">{cartItem.foodHeading}</div>
                  <div className="single-cart-quantity">
                    <span className="single-incdescr">
                      <button
                        className="btn btn-danger btn-sm"
                        onClick={() => {
                          const updatedCart = cart.map((item, index) =>
                            cartindex === index
                              ? {
                                  ...item,
                                  quantity:
                                    item.quantity > 0 ? item.quantity - 1 : 0,
                                }
                              : item
                          );
                          setCart(updatedCart);
                        }}
                      >
                        -
                      </button>
                    </span>

                    <span>{cartItem.quantity}</span>

                    <span className="single-incdescr">
                      <button
                        className="btn btn-success btn-sm"
                        onClick={() => {
                          const updatedCart = cart.map((item, index) =>
                            cartindex === index
                              ? { ...item, quantity: item.quantity + 1 }
                              : item
                          );
                          setCart(updatedCart);
                        }}
                      >
                        +
                      </button>
                    </span>
                  </div>
                  <div className="single-cart-price">
                    Rs. {cartItem.price * cartItem.quantity}
                  </div>

                  <div className="remove-btn">
                    <button
                      className="btn btn-danger"
                      onClick={() => handleRemove(cartindex)}
                    >
                      Remove
                    </button>
                  </div>
                </div>
              ))}

              <div className="single-cart-totalprice">
              
                <span>
                  TOTAL:{" "}
                  <b>
                    {cart.reduce(
                      (total, item) =>
                        total + parseFloat(item.price * item.quantity) || 0,
                      0
                    )}
                  </b>
                </span>
                 <Link to="/placeorder" >
                 <button className="btn btn-success orderbtnSingle">Select Address at next step</button>
                 </Link>
                


              </div>
            </div>
          </div>

)}
        </div>
      </div>
    
{/* show all product below */}
<br />
<br />
<br />
<br />
<ProductFilter  handleSort={handleSort} />

<div className="container mt-5">
 
      
      <div className="row">
        {allproducts.map((product, index) => (
          <div className="col-md-3">
            <div class="card menucard"  key={index}
            >
              <div class="card-header">
                <div className="image singlemenu">
                  <img src={product.thumbnail} alt="" />
                </div>
              </div>
              <div class="single-card-body">
                <div className="single-title">
                  <p>{product.foodHeading}</p><hr />
                  <p>{product.foodDescription}</p>
                </div>
              </div>
              <div class="card-footer">
                <div className="food-price">
                  <span>₹</span> {product.price}
                </div>
                <button className="btn btn-danger mt-4" onClick={()=>handleFadeIn(product)}>ADD +</button>
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

export default SingleProductView;



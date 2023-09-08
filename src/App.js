
import './App.css';

import 'bootstrap/dist/css/bootstrap.min.css';

import CustomNavbar from './components/CustomNavbar';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Footer from './components/Footer';
import SingleProductView from './components/SingleProductView';
import ProductList from './components/FoodMenu';

import { useState } from 'react';
import ShopCart from './components/ShopCart';

import Auth from './pages/Auth';

import PlaceOrder from './components/PlaceOrder';
import CartContext from "./components/CartContext";
import VerifyOtp from './components/VerifyOtp';
import ConfirmOrder from './pages/ConfirmOrder';
import Associates from './pages/Associates';
import { CustomerLogout } from './components/CustomerLogout';






function App() {

   const [productId, setProductId] =useState(null);

   const [Cart,getCard]=useState([]);

  

   const token = localStorage.getItem('token');
   console.log("tokenapp", token)



  


                
   console.log(token);
   
   
  return (
    
     <Router>

      <CartContext.Provider value={Cart}>

      <CustomNavbar token={token}  />

      

      <Routes>
      <Route exact path='/associate' element={<Associates />}></Route>
      <Route exact path='/Confirm-Order' element={<ConfirmOrder />} ></Route>
      <Route exact path='/customer' element={<CustomerLogout />} ></Route>

      

     
        
      {token ? (
          // User has a token, allow access
          <Route path="/"  element={<ProductList  setProductId={setProductId}  />} />
        ) : (
          // User doesn't have a token, show authentication flow
          <Route exact path='/' element={<Auth />}></Route>
        )}
        

         <Route exact path='/verify' element={<VerifyOtp  />} ></Route>

         <Route exact path='/Products' element={<ProductList  setProductId={setProductId}  />}></Route>

         <Route exact path='/Single-Product' element={< SingleProductView  productId={productId} getCard={getCard}  />}></Route>

         <Route exact path='/ShopCart' element={<ShopCart />} ></Route>

     

         <Route exact path='/placeorder' element={< PlaceOrder cart={Cart}/>}></Route>

         


       
 
       
         </Routes>

         

         <Footer />

         </CartContext.Provider>
      </Router>

  );
}

export default App;

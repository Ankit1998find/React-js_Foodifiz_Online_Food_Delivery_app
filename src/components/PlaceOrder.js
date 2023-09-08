import React, { useContext } from 'react';
import CartContext from './CartContext';
import { useEffect } from 'react';
import { useState } from 'react';
import axios from 'axios';
import './ShopCart.css'
import { useNavigate } from 'react-router-dom';


axios.defaults.baseURL = process.env.REACT_APP_BASE_URL;

const ShopCart = () => {
  const cart = useContext(CartContext);
  
  const navigate = useNavigate();
  

  const [items, setItems] = useState([]);
  console.log("items kitchenid",items);

  useEffect(() => {
    setItems(cart);
    localStorage.setItem('cart', JSON.stringify(cart)); // Store cart data when cart items change
  }, [cart]);

  
  
   
  const totalPrice = items.reduce((total, cartItem) => total + cartItem.price *cartItem.quantity, 0);
  const initialContact = localStorage.getItem('contact');

  const [contact, setContact] = useState(initialContact);

  

  // const token = localStorage.getItem('token');

  // const userid = localStorage.getItem('userid');

 

  const [FormData,setFormData]=useState({
    customerName:'',
    mobile:  initialContact,// Pre-filled mobile number
    addressLine1: '',
    addressLine2: '',
    cart: cart,
    totalPrice: totalPrice,// Pre-filled total price
   


   });

   console.log("allvalue",FormData);

  const handleSubmit=async(e)=>{
    e.preventDefault();

    try{
      const formattedCart = cart.map((item) => ({
        product: {
          productId: item._id, 
          name: item.foodHeading,
          kitchenName:item.kitchenName,
          kitchenId:item.kitchenId
          
          
        },
        quantity: item.quantity,
      }));

      const orderData = {
        customerName: FormData.customerName,
        mobile: FormData.mobile,
        addressLine1: FormData.addressLine1,
        addressLine2: FormData.addressLine2,
        cart:formattedCart,
        totalPrice:totalPrice,
      };

      const response = await axios.post('/api/orders', orderData);
      console.log('order created', response.data._id);
      if(response){
        setItems([]); // Clear the cart in the component state
        localStorage.removeItem('cart'); 
        navigate('/Confirm-Order', { state: { orderId: response.data._id } });

      }

    }catch(error){
      console.error('Error creating order:', error);
      
    }
  }


   const handleChange=(e)=>{

    const {name,value}=e.target;
     // If changing the contact field, update both the contact state and FormData
     if (name === "mobile") {
      setContact(value);
      setFormData({ ...FormData, [name]: value });
    }

    else{
      setFormData({...FormData,[name]:value})
    }
   }

   


  

  const cartItems = JSON.parse(localStorage.getItem('cart')) || [];

  console.log("cartitmlocal",cartItems);


  return (
    <div className="container cart-container">
    <div className="row">
      {cartItems.length > 0 && ( // Only render if cart has products
        <div className="col-md-12 col-12 ">
          {cartItems.map((cartItem, cartindex) => (
            <div className="cart-data" key={cartindex}>
              <div className="cart-description">{cartItem.foodHeading}</div>
              <div className="cart-price">{cartItem.price}</div>
            </div>
          ))}

          <div>
            <div className="address-form">
              <span className='mt-4'>1.Checkout<br/>2.Delivery Address <br/> 3. Make Payment</span>
              {/* <p>Who are you ordering for?</p> */}
              <br />
              
              
               <form onSubmit={handleSubmit}>
                 
                 <input type='text' name="customerName" value={FormData.value} onChange={handleChange} placeholder='Your Name' /> <br />
                 <input type='text' name="mobile" value={contact}  onChange={handleChange} placeholder='Enter Mobile Number'/><br />
                 <input type='text' name="addressLine1" value={FormData.value}  onChange={handleChange} placeholder='Enter Address Line 1'/><br />
                 <input type='text' name="addressLine2" value={FormData.value}  onChange={handleChange} placeholder='Enter Address Line 2'/><br />
                 <button type='submit' className="btn btn-success" >Confirm & Payment</button>

                 <div className="" style={{ padding: "10px" }}>
                  Total Price: RS{totalPrice.toFixed(2)} {/* Display total price */}
                </div>

                
               </form>
              
            </div>
          </div>

         
        </div>
      )}
     
    </div>
  </div>
  );
}

export default ShopCart;
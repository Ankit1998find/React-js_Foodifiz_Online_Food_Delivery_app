import React, { useEffect, useState } from "react";
import axios from "axios";
import './SubmitMenu.css'

axios.defaults.baseURL = process.env.REACT_APP_BASE_URL;

const FoodForm = () => {
  const [formData, setFormData] = useState({
    kitchenId: null,
    kitchenName: "",
    foodHeading: "",
    foodDescription: "",
    price: "",
    thumbnail: "",
    category: "Veg",
    rating: 1,
  });

  useEffect(() => {
    // Check if KitchenID exists in local storage
    // const KitchenID = localStorage.getItem('KitchenId');

    const KitchenID = localStorage.getItem('KitchenId');

    console.log("localstorageid",KitchenID);
    
   
   
    if (!KitchenID) {
      // Generate a random kitchenId starting with "ff" when not found
      const randomId = "ff" + Math.random().toString(36).substr(2, 10);
      console.log('randomidgenerate',randomId)
      localStorage.setItem('KitchenId', randomId);
      setFormData({ ...formData, kitchenId: randomId });
    } else {
      // Use the existing KitchenID as a string
      setFormData({ ...formData, kitchenId: KitchenID });
    }
  }, []);// The empty dependency array ensures this effect runs only once on component mount

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

 




  const handleSubmit = (e) => {
    e.preventDefault();

    // Assuming you have a backend API endpoint for saving data
    axios
      .post("/products", formData)
      .then((response) => {
        console.log("Data saved successfully:", response.data);
        // Clear the form
        setFormData({
          kitchenName: "",
          foodHeading: "",
          foodDescription: "",
          price: "",
          thumbnail: "",
          category: "Veg",
          rating: 1,
        });
      })
      .catch((error) => {
        console.error("Error saving data:", error);
      });
  };

  return (
    <div>
      <h2>Food Form</h2>
      
      <div className="container form-container">
      <form onSubmit={handleSubmit}>
      
      <div className="mb-3">
          <label for="Kitchen Id" class="form-label">
            Kitchen Id
          </label>
          <input
            type="text"
            name="kitchenId"
            value={formData.kitchenId}
            className="form-control"
            onChange={handleChange}
            required
            readOnly
          />
        </div>


        <div className="mb-3">
          <label for="Kitchen Name" class="form-label">
            Kitchen Name
          </label>
          <input
            type="text"
            name="kitchenName"
            value={formData.kitchenName}
            className="form-control"
            onChange={handleChange}
            required
          />
        </div>

        <div className="mb-3">
          <label for="Food Heading" class="form-label">
          Food Heading
          </label>
          <input type="text" name="foodHeading" placeholder="example:Kaju Gajrawa , Chicken Combo , Egg Combo etc..." value={formData.foodHeading} className="form-control" onChange={handleChange} required />
        </div>

        <div className="mb-3">
          <label for="Food Description" class="form-label">
          Food Description
          </label>
          <textarea name="foodDescription" placeholder=" Description will be Maximum Of 100 Characters long" value={formData.foodDescription} className="form-control" onChange={handleChange} required />
        </div>

        <div className="mb-3">
          <label for="Price" class="form-label">
          Price
          </label>
          <input type="number" name="price" value={formData.price}  className="form-control" onChange={handleChange} required />
        </div>

        <div className="mb-3">
          <label for="Food Image URL:" class="form-label">
          Food Image URL
          </label>
          <input type="url" name="thumbnail" placeholder="Search on google copy image address and Paste here" value={formData.thumbnail}  className="form-control" onChange={handleChange} required />
        </div>

        <div className="mb-3">
          <label for="Category" class="form-label">
          Category
          </label>
       <select name="category" className="form-control" value={formData.category} onChange={handleChange}>
            <option value="Veg">Veg</option>
            <option value="NonVeg">NonVeg</option>
            <option value="Fruits">Fruits</option>
            <option value="Sweets">Sweets</option>
            <option value="Dairy products">Dairy products</option>

       </select>
        </div>

        <div className="mb-3">
          <label for="Rating" class="form-label">
          Rating
          </label>
          <input type="number" name="rating" value={formData.rating} className="form-control" onChange={handleChange} required />
        </div>

        <button className="btn btn-lg btn-success" type="submit">Submit</button>
      </form>
      </div>
     
    </div>
  );
};

export default FoodForm;

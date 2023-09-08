import React from 'react'
import './ProductFilter.css'

const ProductFilter = ({handleSort}) => {
  return (
    <div className="container text-center mt-5">
      <div className="row product-filter">
        <div className="col-md-3 col-12">
          <select
            class="custom-select"
            id="inputGroupSelect01"
            onChange={handleSort}
          >
            <option> </option>
            <option value="price.desc">Price High to Low</option>
            <option value="price.asc">Price Low to High</option>
          </select>
        </div>
        <div className="col-md-3 col-12">
        <select
            class="custom-select"
            id="inputGroupSelect01"
            onChange={handleSort}
          >
            <option> </option>
            <option value="rating.desc">Rating High to Low</option>
            <option value="raing.asc">Rating Low to High</option>
          </select>
        </div>
        <div className="col-md-3 col-12">
        <select
            class="custom-select"
            id="inputGroupSelect01"
            onChange={handleSort}
          >
            <option>All</option>
            <option value="category.veg">Veg</option>
            <option value="category.nonveg">Nonveg</option>
          </select>
        </div>
        <div className="col-md-3 col-12">
         <div className="search-filter">
          <input type='text'  placeholder='Search Food/Kitchen' />

         </div>
        </div>
      </div>
    </div>
  );
}

export default ProductFilter
import React from 'react'

import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import './HeroSection.css';



const HeroSection = () => {
  return (
   <>
   <section className='carousel'>
    <div className="carousel-container">
    <Carousel autoPlay={true} interval={1000} showThumbs={false} infiniteLoop={true}>
      <div>
        <img src="images/Menu.png" alt=" " />
       
      </div>
      <div>
        <img src="images/Menu.png" alt="" />
       
      </div>
      <div>
        <img src="images/Menu.png" alt="" />
     
      </div>
    </Carousel>
  </div>
   </section>
   </>
  )
}

export default HeroSection
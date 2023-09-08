import React, { useState } from 'react'

import './FadeInComponent.css'





const FadeInComponent = () => {

    const [isVisible, setIsVisible] = useState(false);

    const handleFadeIn = () => {
      setIsVisible(true);
    };



  return (
    <div>
      <button onClick={handleFadeIn}>Fade In</button>
      <div className={`fade-in-element ${isVisible ? 'visible' : ''}`}>
        {/* Content to fade in */}
        Content that will fade in.
      </div>
    </div>
  )
}

export default FadeInComponent
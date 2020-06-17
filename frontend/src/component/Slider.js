import React, { useRef, useEffect, useState } from 'react';
import "../styles/Slider.scss";


const Slider = () => {

 

const carouselEl = useRef(null);

const sliderEl = useRef(null);

let direction;
useEffect(() => {

sliderEl.current.addEventListener('transitionend', function() {
    // get the last element and append it to the front
    
    if (direction === 1) {
        sliderEl.current.prepend(sliderEl.current.lastElementChild);
    } else {
        sliderEl.current.appendChild(sliderEl.current.firstElementChild);
    }
    
    sliderEl.current.style.transition = 'none';
    sliderEl.current.style.transform = 'translate(0)';
    setTimeout(() => {
        sliderEl.current.style.transition = 'all 0.5s';
    })
  }, false);
}, []);


const next=() => {
    direction = -1;
    carouselEl.current.style.justifyContent = 'flex-start';
    sliderEl.current.style.transform = 'translate(-20%)';  

}

const prev=() => {
    if (direction === -1) {
        direction = 1;
        sliderEl.current.appendChild(sliderEl.current.firstElementChild);
      }
      carouselEl.current.style.justifyContent = 'flex-end';    
      sliderEl.current.style.transform = 'translate(20%)';  
}


return(
<>
<div className="container">
  <div className="h5">Circular carousel (infinite)</div>
  <div className="carousel" ref={carouselEl}>
    <div className="slider" ref={sliderEl}>
     <div className="carousel_slide">
     <img  src="./images/slide1.jpg" alt="img" />
     </div>
     <div lassName="carousel_slide">
     <img  src="./images/slide1.jpg" alt="img" />
     </div>
     <div lassName="carousel_slide">
     <img  src="./images/slide1.jpg" alt="img" />
     </div>
    </div>
    <div className="controls">
      <button className="next" onClick={next}><i className="material-icons">
      {">"}
</i></button>
      <button className="prev" onClick={prev}><i className="material-icons">
{"<"}
</i></button>
    </div>
  </div>
</div>
</>

)

}

export default Slider;
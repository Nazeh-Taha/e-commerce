import React from "react";

const Carousel = () => {
  return (
    <>
      <div className="carousel">
        <button className="carousel_button"></button>
        <div className="carousel_track_container">
          <ul className="carousel_track">
              <li className="carousel_slide"><img src="./images/slide1.jpg" alt="img"/></li>
              <li className="carousel_slide"><img src="./images/slide2.jpg" alt="img"/></li>
              <li className="carousel_slide"><img src="./images/slide3.jpg" alt="img"/></li>
          </ul>
        </div>
        <button className="carousel_button"></button>
      </div>
    </>
  );
};

export default Carousel;

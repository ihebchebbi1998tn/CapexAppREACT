import React, { useState, useEffect } from 'react';

const Carousel = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  const handlePrev = () => {
    setActiveIndex(activeIndex - 1 < 0 ? 2 : activeIndex - 1);
  };

  const handleNext = () => {
    setActiveIndex((activeIndex + 1) % 3);
  };

  // Use the useEffect hook to trigger `handleNext` every 5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      handleNext();
    }, 5000); // 5000 milliseconds = 5 seconds

    return () => {
      clearInterval(interval); // Clean up the interval when the component unmounts
    };
  }, [activeIndex]);

  return (
    <div id="carouselExampleIndicators" className="carousel slide" data-ride="carousel">
      <ol className="carousel-indicators">
        <li data-target="#carouselExampleIndicators" data-slide-to="0" className={activeIndex === 0 ? 'active' : ''}></li>
        <li data-target="#carouselExampleIndicators" data-slide-to="1" className={activeIndex === 1 ? 'active' : ''}></li>
        <li data-target="#carouselExampleIndicators" data-slide-to="2" className={activeIndex === 2 ? 'active' : ''}></li>
      </ol>
      <div className="carousel-inner">
        <div className={`carousel-item ${activeIndex === 0 ? 'active' : ''}`}>
          <img className="d-block w-100" src="../assets/images/profile/carousel1.jpg" width="45" height="140" alt="First slide" />
        </div>
        <div className={`carousel-item ${activeIndex === 1 ? 'active' : ''}`}>
          <img className="d-block w-100" src="../assets/images/profile/carousel2.jpg" width="45" height="140" alt="Second slide" />
        </div>
        <div className={`carousel-item ${activeIndex === 2 ? 'active' : ''}`}>
          <img className="d-block w-100" src="../assets/images/profile/carousel3.jpg" alt="Third slide" />
        </div>
      </div>
      <a className="carousel-control-prev" href="#carouselExampleIndicators" role="button" data-slide="prev" onClick={handlePrev}>
        <span className="carousel-control-prev-icon" aria-hidden="true"></span>
        <span className="sr-only">Previous</span>
      </a>
      <a className="carousel-control-next" href="#carouselExampleIndicators" role="button" data-slide="next" onClick={handleNext}>
        <span className="carousel-control-next-icon" aria-hidden="true"></span>
        <span className="sr-only">Next</span>
      </a>
    </div>
  );
};

export default Carousel;

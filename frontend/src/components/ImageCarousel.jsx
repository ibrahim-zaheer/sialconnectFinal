// components/ImageCarousel.jsx

import React, { useState } from "react";

const ImageCarousel = ({ images = [], className = "" }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  if (!images.length) {
    return (
      <div className="w-full h-64 bg-gray-200 rounded-lg flex items-center justify-center text-gray-500">
        No images available
      </div>
    );
  }

  const handleNext = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === images.length - 1 ? 0 : prevIndex + 1
    );
  };

  const handlePrev = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  };

  return (
    <div className={`relative ${className}`}>
      <img
        src={images[currentIndex]}
        alt={`Image ${currentIndex + 1}`}
        className="object-cover rounded-lg w-full h-64"
      />

      {images.length > 1 && (
        <>
          {/* Left arrow */}
          <button
            onClick={handlePrev}
            className="absolute top-1/2 left-2 transform -translate-y-1/2 bg-gray-700 text-white p-1 rounded-full shadow-md hover:bg-gray-800"
          >
            &#8592;
          </button>

          {/* Right arrow */}
          <button
            onClick={handleNext}
            className="absolute top-1/2 right-2 transform -translate-y-1/2 bg-gray-700 text-white p-1 rounded-full shadow-md hover:bg-gray-800"
          >
            &#8594;
          </button>

          {/* Image count */}
          <p className="absolute bottom-2 right-3 text-white bg-black bg-opacity-50 px-2 py-1 text-sm rounded-lg">
            {currentIndex + 1} / {images.length}
          </p>
        </>
      )}
    </div>
  );
};

export default ImageCarousel;

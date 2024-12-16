import React from "react";
import "../assets/css/landingPage.css";
import ProductImage from "../assets/images/image-1.jpg";

export default function LandingPage() {
  return (
    <>
      <div className="text-[#1b263b] w-[80vw] mx-auto mt-16">
        <div className="hero h-[90vh] w-full flex flex-col gap-8 justify-center items-center">
          <h1 className="text-6xl font-bold leading-tight w-[60%] text-center">
            Streamline Your Sourcing with SialConnect Today
          </h1>
          <p className="w-[50%] text-xl text-center">
            SialConnect bridges the gap between exporters and suppliers, making
            sourcing effortless and efficient. Experience competitive deals and
            seamless transaction with our user-friendly platform.
          </p>
          <div className="flex gap-2">
            <input
              className="w-80 p-3 border border-[#1b263b]"
              type="text"
              placeholder="Search Product"
            />
            <button className="bg-[#1b263b] text-[#e0e1dd] hover:bg-[#415a77] transition-all duration-300 px-5">
              Seach
            </button>
          </div>
        </div>

        <div className="selling">
          <h1>Best Selling</h1>
          <p>
            Get in on the trend with our curated selection of best-selling
            styles.
          </p>

          <div className="cards flex flex-wrap justify-between items-center gap-5">
            <div className="mx-auto rounded-lg shadow-lg overflow-hidden bg-[#1b263b]">
              {/* Image Section */}
              <img
                src={ProductImage} // Replace this with your actual image path
                alt="Product"
                className="w-full h-64 object-cover object-top"
              />

              {/* Product Details */}
              <div className="p-4 text-[#e0e1dd]">
                {/* Product Name */}
                <h3 className="text-center text-lg font-semibold">
                  Regular Fit Long Sleeve Top
                </h3>

                {/* Price and Rating */}
                <div className="flex justify-between items-center mt-2">
                  <span className="text-lg font-bold">$38.99</span>
                  <div className="flex items-center">
                    <span className="text-sm mr-1">5.0</span>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="w-4 h-4 text-yellow-500"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.974a1 1 0 00.95.69h4.202c.969 0 1.371 1.24.588 1.81l-3.404 2.473a1 1 0 00-.364 1.118l1.286 3.974c.3.921-.755 1.688-1.54 1.118l-3.404-2.473a1 1 0 00-1.176 0l-3.404 2.473c-.785.57-1.84-.197-1.54-1.118l1.286-3.974a1 1 0 00-.364-1.118L2.215 9.401c-.783-.57-.38-1.81.588-1.81h4.202a1 1 0 00.95-.69l1.286-3.974z" />
                    </svg>
                  </div>
                </div>
              </div>
            </div>

            <div className="mx-auto rounded-lg shadow-lg overflow-hidden bg-white">
              {/* Image Section */}
              <img
                src={ProductImage} // Replace this with your actual image path
                alt="Product"
                className="w-full h-64 object-cover object-top"
              />

              {/* Product Details */}
              <div className="p-4">
                {/* Product Name */}
                <h3 className="text-center text-lg font-semibold text-gray-800">
                  Regular Fit Long Sleeve Top
                </h3>

                {/* Price and Rating */}
                <div className="flex justify-between items-center mt-2">
                  <span className="text-lg font-bold text-gray-800">
                    $38.99
                  </span>
                  <div className="flex items-center">
                    <span className="text-sm text-gray-600 mr-1">5.0</span>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="w-4 h-4 text-yellow-500"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.974a1 1 0 00.95.69h4.202c.969 0 1.371 1.24.588 1.81l-3.404 2.473a1 1 0 00-.364 1.118l1.286 3.974c.3.921-.755 1.688-1.54 1.118l-3.404-2.473a1 1 0 00-1.176 0l-3.404 2.473c-.785.57-1.84-.197-1.54-1.118l1.286-3.974a1 1 0 00-.364-1.118L2.215 9.401c-.783-.57-.38-1.81.588-1.81h4.202a1 1 0 00.95-.69l1.286-3.974z" />
                    </svg>
                  </div>
                </div>
              </div>
            </div>

            <div className="mx-auto rounded-lg shadow-lg overflow-hidden bg-white">
              {/* Image Section */}
              <img
                src={ProductImage} // Replace this with your actual image path
                alt="Product"
                className="w-full h-64 object-cover object-top"
              />

              {/* Product Details */}
              <div className="p-4">
                {/* Product Name */}
                <h3 className="text-center text-lg font-semibold text-gray-800">
                  Regular Fit Long Sleeve Top
                </h3>

                {/* Price and Rating */}
                <div className="flex justify-between items-center mt-2">
                  <span className="text-lg font-bold text-gray-800">
                    $38.99
                  </span>
                  <div className="flex items-center">
                    <span className="text-sm text-gray-600 mr-1">5.0</span>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="w-4 h-4 text-yellow-500"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.974a1 1 0 00.95.69h4.202c.969 0 1.371 1.24.588 1.81l-3.404 2.473a1 1 0 00-.364 1.118l1.286 3.974c.3.921-.755 1.688-1.54 1.118l-3.404-2.473a1 1 0 00-1.176 0l-3.404 2.473c-.785.57-1.84-.197-1.54-1.118l1.286-3.974a1 1 0 00-.364-1.118L2.215 9.401c-.783-.57-.38-1.81.588-1.81h4.202a1 1 0 00.95-.69l1.286-3.974z" />
                    </svg>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div>
            <button>
              See All <i className="ri-arrow-right-line"></i>
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

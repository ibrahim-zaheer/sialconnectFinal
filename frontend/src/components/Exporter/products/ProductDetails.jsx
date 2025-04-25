import React, { useState, useEffect } from "react";
import { useParams, Link, useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import { useSelector } from "react-redux";
import Chat from "../../Chat/Chat";
import WriteReview from "../../reviews/WriteReviews";
import AverageReviewBySupplier from "../../reviews/averageReviewBySuppliers";
import CreateOffer from "../../offer/createOffer";
import ImageCarousel from "../../ImageCarousel";

const ProductDetails = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [error, setError] = useState("");
  const [showOfferPopup, setShowOfferPopup] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  
  // Get the active tab from URL
  const queryParams = new URLSearchParams(location.search);
  const activeTab = queryParams.get('tab') || 'your-products';

  const user = useSelector((state) => state.user);
  const userId = user?.id;
  const role = user?.role;

  useEffect(() => {
    const fetchProductDetails = async () => {
      try {
        const response = await axios.get(`/api/supplier/product/${id}`);
        setProduct(response.data);
      } catch (err) {
        setError("Error fetching product details.");
        console.error("Error fetching product details:", err);
      }
    };
    fetchProductDetails();
  }, [id]);

  const handleBackClick = () => {
    navigate(`/SupplierProducts?tab=${activeTab}`);
  };

  const handleSendOffer = () => {
    if (product) {
      navigate(`/createOffers`, {
        state: {
          supplierId: product.supplier?._id,
          productId: product._id,
          price: product.price,
        },
      });
    }
  };

  if (error) {
    return <div className="container mt-4 text-center">{error}</div>;
  }

  return (
    <div className="w-[80vw] min-h-[80vh] mx-auto mt-24 bg-gray-50 p-6 rounded-lg">
      {product ? (
        <div className="">
          {/* Product Details Section */}
          <div className="flex flex-col md:flex-row gap-8">
            <div className="flex-1">
              <ImageCarousel images={product.image} className="w-96" />
            </div>
            
            <div className="flex-1 p-6">
              <div>
                <h1 className="text-4xl font-bold">{product.name}</h1>
                <span className="block my-1 text-sm font-bold">
                  Category: {product.category || "Other"}
                </span>
                <p className="text-gray-500 text-xl my-2">
                  {product.description}
                </p>
                <p className="text-gray-700 mb-2">Price: {product.price} Rs</p>
              </div>

              {/* Product Info */}
              <div className="space-y-6 mt-6">
                <div>
                  <h1 className="text-3xl font-bold text-neutral-900">{product.name}</h1>
                  <p className="text-primary-600 font-medium text-xl mt-2">
                    Rs {product.price.toLocaleString()} per piece
                  </p>
                  <div className="mt-4">
                    <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${
                      product.inStock ? 'bg-secondary-100 text-secondary-800' : 'bg-neutral-100 text-neutral-800'
                    }`}>
                      {product.inStock ? 'In Stock' : 'Out of Stock'}
                    </span>
                  </div>
                  <p className="text-neutral-600 mt-4">{product.description}</p>
                </div>

                {/* Supplier Info */}
                <div className="border-t border-neutral-200 pt-6">
                  <h2 className="text-xl font-semibold text-neutral-900 mb-4">Supplier Information</h2>
                  <div className="flex items-center gap-4">
                    {product.supplier?.profilePicture ? (
                      <img
                        src={product.supplier.profilePicture}
                        alt="Supplier Logo"
                        className="w-16 h-16 object-cover rounded-full border-2 border-primary-200"
                      />
                    ) : (
                      <div className="w-16 h-16 rounded-full bg-neutral-200 flex items-center justify-center">
                        <svg
                          className="w-8 h-8 text-neutral-400"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                          />
                        </svg>
                      </div>
                    )}
                    <div>
                      <p className="font-medium text-neutral-900">{product.supplier?.name || "Unknown Supplier"}</p>
                      {/* <p className="text-neutral-500 text-sm">{product.supplier?.email || "Email not available"}</p> */}
                      {product.supplier?._id && (
                        <Link
                          to={`/reviews/supplier/${product.supplier._id}`}
                          className="inline-block mt-2 text-primary-600 hover:text-primary-800"
                        >
                          <AverageReviewBySupplier
                            supplierId={product.supplier._id}
                          />
                        </Link>
                      )}
                    </div>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex flex-wrap gap-4 pt-4">
                  {role === "exporter" && (
                    <Link
                      to={`/chat?supplierId=${product.supplier?._id}`}
                      className="inline-flex items-center px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors"
                    >
                      <svg
                        className="w-5 h-5 mr-2"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                        />
                      </svg>
                      Chat with Supplier
                    </Link>
                  )}
                  {role === "exporter" && (
                    <button
                      onClick={() => setShowOfferPopup(true)}
                      className="inline-flex items-center px-4 py-2 bg-secondary-600 text-white rounded-lg hover:bg-secondary-700 transition-colors"
                    >
                      <svg
                        className="w-5 h-5 mr-2"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                      </svg>
                      Send Offer
                    </button>
                  )}
                </div>

                <div className="text-sm text-neutral-500">
                  <p>Posted on: {new Date(product.createdAt).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                  })}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Write Review Section */}
          <div className="border-t border-neutral-200 p-8 mt-8">
            <h2 className="text-2xl font-semibold text-neutral-900 mb-6">Write a Review</h2>
            <WriteReview supplierId={product.supplier?._id} />
          </div>
        </div>
      ) : (
        <div className="bg-white rounded-lg shadow p-8 text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-500 mx-auto"></div>
          <p className="mt-4 text-neutral-600">Loading product details...</p>
          <button
            onClick={handleBackClick}
            className="mt-4 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-primary-600 hover:bg-primary-700"
          >
            Back to Products
          </button>
        </div>
      )}

      {/* Offer Popup */}
      {showOfferPopup && product && (
        <div className="fixed inset-0 flex items-center justify-center bg-neutral-900 bg-opacity-50 z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold text-neutral-900">Create Offer</h3>
              <button 
                onClick={() => setShowOfferPopup(false)}
                className="text-neutral-400 hover:text-neutral-600"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <CreateOffer 
              supplierId={product.supplier?._id}
              productId={product._id}
              price={product.price}
              onClose={() => setShowOfferPopup(false)}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductDetails;
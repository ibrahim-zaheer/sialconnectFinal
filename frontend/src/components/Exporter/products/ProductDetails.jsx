// import React, { useState, useEffect } from "react";
// import { useParams, Link, useNavigate, useLocation } from "react-router-dom";
// import axios from "axios";
// import { useSelector } from "react-redux";
// import Chat from "../../Chat/Chat";
// import WriteReview from "../../reviews/WriteReviews";
// import AverageReviewBySupplier from "../../reviews/averageReviewBySuppliers";
// import CreateOffer from "../../offer/createOffer";
// import ImageCarousel from "../../ImageCarousel";
// import  BackButton from "../../BackButton"


// const ProductDetails = () => {
//   const { id } = useParams();
//   const [product, setProduct] = useState(null);
//   const [error, setError] = useState("");
//   const [showOfferPopup, setShowOfferPopup] = useState(false);
//   const navigate = useNavigate();
//   const location = useLocation();
  
//   // Get the active tab from URL
//   const queryParams = new URLSearchParams(location.search);
//   const activeTab = queryParams.get('tab') || 'your-products';

//   const user = useSelector((state) => state.user);
//   const userId = user?.id;
//   const role = user?.role;

//   useEffect(() => {
//     const fetchProductDetails = async () => {
//       try {
//         const response = await axios.get(`/api/supplier/product/${id}`);
//         setProduct(response.data);
//       } catch (err) {
//         setError("Error fetching product details.");
//         console.error("Error fetching product details:", err);
//       }
//     };
//     fetchProductDetails();
//   }, [id]);

//   const handleBackClick = () => {
//     navigate(`/SupplierProducts?tab=${activeTab}`);
//   };

//   const handleSendOffer = () => {
//     if (product) {
//       navigate(`/createOffers`, {
//         state: {
//           supplierId: product.supplier?._id,
//           productId: product._id,
//           price: product.price,
//         },
//       });
//     }
//   };

//   if (error) {
//     return <div className="container mt-4 text-center">{error}</div>;
//   }

//   return (
//     <div className="w-[80vw] min-h-[80vh] mx-auto mt-24 bg-gray-50 p-6 rounded-lg">
//       {product ? (
//         <div className="">
//           {/* Product Details Section */}
//           <div className="flex flex-col md:flex-row gap-8">
//             <div className="flex-1">
//               <ImageCarousel images={product.image} className="w-96" />
//             </div>
            
//             <div className="flex-1 p-6">
//               <div>
//                 <BackButton/>
//                 <h1 className="text-4xl font-bold">{product.name}</h1>
//                 <span className="block my-1 text-sm font-bold">
//                   Category: {product.category || "Other"}
//                 </span>
//                 <p className="text-gray-500 text-xl my-2">
//                   {product.description}
//                 </p>
//                 <p className="text-gray-700 mb-2">Price: {product.price} Rs</p>
//               </div>

//               {/* Product Info */}
//               <div className="space-y-6 mt-6">
//                 <div>
//                   <h1 className="text-3xl font-bold text-neutral-900">{product.name}</h1>
//                   <p className="text-primary-600 font-medium text-xl mt-2">
//                     Rs {product.price.toLocaleString()} per piece
//                   </p>
//                   <div className="mt-4">
//                     <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${
//                       product.inStock ? 'bg-secondary-100 text-secondary-800' : 'bg-neutral-100 text-neutral-800'
//                     }`}>
//                       {product.inStock ? 'In Stock' : 'Out of Stock'}
//                     </span>
//                   </div>
//                   <p className="text-neutral-600 mt-4">{product.description}</p>
//                 </div>

//                 {/* Supplier Info */}
//                 <div className="border-t border-neutral-200 pt-6">
//                   <h2 className="text-xl font-semibold text-neutral-900 mb-4">Supplier Information</h2>
//                   <div className="flex items-center gap-4">
//                     {product.supplier?.profilePicture ? (
//                       <img
//                         src={product.supplier.profilePicture}
//                         alt="Supplier Logo"
//                         className="w-16 h-16 object-cover rounded-full border-2 border-primary-200"
//                       />
//                     ) : (
//                       <div className="w-16 h-16 rounded-full bg-neutral-200 flex items-center justify-center">
//                         <svg
//                           className="w-8 h-8 text-neutral-400"
//                           fill="none"
//                           stroke="currentColor"
//                           viewBox="0 0 24 24"
//                           xmlns="http://www.w3.org/2000/svg"
//                         >
//                           <path
//                             strokeLinecap="round"
//                             strokeLinejoin="round"
//                             strokeWidth={2}
//                             d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
//                           />
//                         </svg>
//                       </div>
//                     )}
//                     <div>
//                       <p className="font-medium text-neutral-900">{product.supplier?.name || "Unknown Supplier"}</p>
//                       {/* <p className="text-neutral-500 text-sm">{product.supplier?.email || "Email not available"}</p> */}
//                       {product.supplier?._id && (
//                         <Link
//                           to={`/reviews/supplier/${product.supplier._id}`}
//                           className="inline-block mt-2 text-primary-600 hover:text-primary-800"
//                         >
//                           <AverageReviewBySupplier
//                             supplierId={product.supplier._id}
//                           />
//                         </Link>
//                       )}
//                     </div>
//                   </div>
//                 </div>

//                 {/* Action Buttons */}
//                 <div className="flex flex-wrap gap-4 pt-4">
//                   {role === "exporter" && (
//                     <Link
//                       to={`/chat?supplierId=${product.supplier?._id}`}
//                       className="inline-flex items-center px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors"
//                     >
//                       <svg
//                         className="w-5 h-5 mr-2"
//                         fill="none"
//                         stroke="currentColor"
//                         viewBox="0 0 24 24"
//                         xmlns="http://www.w3.org/2000/svg"
//                       >
//                         <path
//                           strokeLinecap="round"
//                           strokeLinejoin="round"
//                           strokeWidth={2}
//                           d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
//                         />
//                       </svg>
//                       Chat with Supplier
//                     </Link>
//                   )}
//                   {role === "exporter" && (
//                     <button
//                       onClick={() => setShowOfferPopup(true)}
//                       className="inline-flex items-center px-4 py-2 bg-secondary-600 text-white rounded-lg hover:bg-secondary-700 transition-colors"
//                     >
//                       <svg
//                         className="w-5 h-5 mr-2"
//                         fill="none"
//                         stroke="currentColor"
//                         viewBox="0 0 24 24"
//                         xmlns="http://www.w3.org/2000/svg"
//                       >
//                         <path
//                           strokeLinecap="round"
//                           strokeLinejoin="round"
//                           strokeWidth={2}
//                           d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
//                         />
//                       </svg>
//                       Send Offer
//                     </button>
//                   )}
//                 </div>

//                 <div className="text-sm text-neutral-500">
//                   <p>Posted on: {new Date(product.createdAt).toLocaleDateString('en-US', {
//                     year: 'numeric',
//                     month: 'long',
//                     day: 'numeric'
//                   })}</p>
//                 </div>
//               </div>
//             </div>
//           </div>

//           {/* Write Review Section */}
//           {/* <div className="border-t border-neutral-200 p-8 mt-8">
//             <h2 className="text-2xl font-semibold text-neutral-900 mb-6">Write a Review</h2>
//             <WriteReview supplierId={product.supplier?._id} />
//           </div> */}
//         </div>
//       ) : (
//         <div className="bg-white rounded-lg shadow p-8 text-center">
//           <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-500 mx-auto"></div>
//           <p className="mt-4 text-neutral-600">Loading product details...</p>
//           <button
//             onClick={handleBackClick}
//             className="mt-4 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-primary-600 hover:bg-primary-700"
//           >
//             Back to Products
//           </button>
//         </div>
//       )}

//       {/* Offer Popup */}
//       {showOfferPopup && product && (
//         <div className="fixed inset-0 flex items-center justify-center bg-neutral-900 bg-opacity-50 z-50">
//           <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
//             <div className="flex justify-between items-center mb-4">
//               <h3 className="text-lg font-semibold text-neutral-900">Create Offer</h3>
//               <button 
//                 onClick={() => setShowOfferPopup(false)}
//                 className="text-neutral-400 hover:text-neutral-600"
//               >
//                 <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
//                 </svg>
//               </button>
//             </div>
//             <CreateOffer 
//               supplierId={product.supplier?._id}
//               productId={product._id}
//               price={product.price}
//               onClose={() => setShowOfferPopup(false)}
//             />
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default ProductDetails;

import React, { useState, useEffect } from "react";
import { useParams, Link, useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import { useSelector } from "react-redux";
import Chat from "../../Chat/Chat";
// import WriteReview from "../../reviews/WriteReview";
import AverageReviewBySupplier from "../../reviews/averageReviewBySuppliers";
import CreateOffer from "../../offer/createOffer";
import BackButton from "../../BackButton";
import RelatedProducts from "./RelatedProducts";
import { ProductPrice } from "../../../pages/Exporter/components/ProductPrice";

const ProductDetails = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [error, setError] = useState("");
  const [showOfferPopup, setShowOfferPopup] = useState(false);
  const [showOrderPopup, setShowOrderPopup] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const navigate = useNavigate();
  const location = useLocation();
  
  const queryParams = new URLSearchParams(location.search);
  const activeTab = queryParams.get('tab') || 'your-products';

  const user = useSelector((state) => state.user);
  const userId = user?.id;
  const role = user?.role;
  const subscription = user?.subscription.plan;

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
   // Handle delete functionality
   const handleDelete = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.delete(`/api/supplier/product/delete/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      alert(response.data.message);
      navigate(`/SupplierProducts?tab=${activeTab}`);
    } catch (error) {
      console.error(
        "Error deleting product:",
        error.response?.data || error.message
      );
      alert(
        error.response?.data?.message ||
          "Failed to delete product. Please try again."
      );
    }
  };

  const handleThumbnailClick = (index) => {
    setCurrentImageIndex(index);
  };

  const handleNextImage = () => {
    setCurrentImageIndex(prev => 
      prev === product.image.length - 1 ? 0 : prev + 1
    );
  };

  const handlePrevImage = () => {
    setCurrentImageIndex(prev => 
      prev === 0 ? product.image.length - 1 : prev - 1
    );
  };
  const handleRatingClick = (supplierId) => {
    navigate(`/reviews/supplier/${supplierId}`);
  };

  const handleReviewsClick = (supplierId) => {
    navigate(`/reviews/supplier/${supplierId}`);
  };
  

  if (error) {
    return (
      <div className="container mx-auto mt-8 p-6 max-w-6xl">
        <div className="bg-white rounded-lg shadow p-8 text-center">
          <div className="text-red-500 mb-4">
            <svg className="w-12 h-12 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
          </div>
          <h3 className="text-xl font-semibold text-gray-800 mb-2">{error}</h3>
          <button
            onClick={handleBackClick}
            className="mt-4 inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
          >
            Back to Products
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-6 max-w-6xl mt-20">
      {product ? (
        <div className="bg-white rounded-xl shadow-md overflow-hidden">
          {/* Product Details Section */}
          <div className="flex flex-col lg:flex-row gap-8 p-6">
            {/* Image Gallery Section */}
            <div className="lg:w-1/2">
                <BackButton className="mb-4 bg-primary-800 text-white hover:bg-primary-600" />
              <div className="sticky top-6">
                
                {/* Main Image */}
                <div className="relative bg-gray-100 rounded-lg overflow-hidden mb-4" style={{ paddingBottom: '100%' }}>
                  {product.image?.length > 0 ? (
                    <img
                      src={product.image[currentImageIndex]}
                      alt={product.name}
                      className="absolute inset-0 w-full h-full object-contain p-16"
                    />
                  ) : (
                    <div className="absolute inset-0 flex items-center justify-center bg-gray-200">
                      <svg className="w-20 h-20 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                    </div>
                  )}
                  
                  {/* Navigation Arrows */}
                  {product.image?.length > 1 && (
                    <>
                      <button 
                        onClick={handlePrevImage}
                        className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-80 rounded-full p-2 shadow-md hover:bg-opacity-100 transition-all"
                      >
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                        </svg>
                      </button>
                      <button 
                        onClick={handleNextImage}
                        className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-80 rounded-full p-2 shadow-md hover:bg-opacity-100 transition-all"
                      >
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      </button>
                    </>
                  )}
                </div>
                
                {/* Thumbnail Gallery */}
                {product.image?.length > 1 && (
                  <div className="flex space-x-2 overflow-x-auto py-2">
                    {product.image.map((img, index) => (
                      <button
                        key={index}
                        onClick={() => handleThumbnailClick(index)}
                        className={`flex-shrink-0 w-16 h-16 border-2 rounded-md overflow-hidden ${currentImageIndex === index ? 'border-blue-500' : 'border-transparent'}`}
                      >
                        <img
                          src={img}
                          alt={`Thumbnail ${index + 1}`}
                          className="w-full h-full object-cover"
                        />
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>
            
            {/* Product Info Section */}
            <div className="lg:w-1/2 pt-10">
              <div className="space-y-6">
                <div>
                  <h1 className="text-3xl font-bold text-gray-900">{product.name}</h1>
                  {/* <h1 className="text-3xl font-bold text-gray-900">{subscription}</h1> */}

                  {/* <div className="flex items-center mt-2">
                    <span className="text-2xl font-semibold text-blue-600">
                      Rs {product.price.toLocaleString()}
                    </span>
                   
                    <span className="ml-2 text-gray-500">per piece</span>
                  </div> */}
                  <div className="flex items-center mt-2">
  <div className="text-2xl font-semibold text-blue-600">
    <ProductPrice product={product} user={user} />
  </div>
  <span className="ml-2 text-gray-500">per piece</span>
</div>
                  
                  <div className="mt-4 flex items-center">
              
                    {product.category && (
                      <span className="ml-2 px-3 py-1 bg-gray-100 text-gray-800 rounded-full text-sm">
                        {product.category}
                      </span>
                    )}
                  </div>
                </div>
                
                
                <div className="border-t border-gray-200 pt-4">
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">Description</h3>
                  <p className="text-gray-600 whitespace-pre-line">{product.description}</p>
                </div>
                
                {/* Supplier Info */}
                <div className="border-t border-gray-200 pt-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Supplier Information</h3>
                  <div className="flex items-center space-x-4">
                    {product.supplier?.profilePicture ? (
                      <img
                        src={product.supplier.profilePicture}
                        alt="Supplier"
                        className="w-16 h-16 rounded-full object-cover border-2 border-blue-100"
                      />
                    ) : (
                      <div className="w-16 h-16 rounded-full bg-gray-200 flex items-center justify-center">
                        <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                        </svg>
                      </div>
                    )}
                    <div>
                      <h4 className="font-medium text-gray-900">{product.supplier?.name || "Unknown Supplier"}</h4>
                      {/* <h4 className="font-medium text-gray-900">{product.supplier?.adminVerified || "Unknown Supplier"}</h4> */}
                          
                           {/* Show admin verification status */}
      {/* {product.supplier?.adminVerified === "approved" && (
        <span className="inline-block mt-1 px-3 py-1 bg-green-100 text-green-800 text-xs rounded-full font-semibold">
          Admin Verified ✔
        </span>
      )} */}

      {product.supplier?.adminVerified === "approved" && (
  <span 
    className="inline-block mt-1 px-3 py-1 bg-green-100 text-green-800 text-xs rounded-full font-semibold relative group"
    title="This supplier has been verified by our admin team"
  >
    Admin Verified ✔
    {/* Tooltip */}
    <span className="absolute invisible group-hover:visible bg-gray-800 text-white text-xs rounded py-1 px-2 bottom-full mb-2 left-1/2 transform -translate-x-1/2 whitespace-nowrap z-10">
      The supplier business details has been provided and verified by our admin team but we do not take responsibility of the supplier
      <svg className="absolute text-gray-800 h-2 w-full left-0 top-full" x="0px" y="0px" viewBox="0 0 255 255">
        <polygon className="fill-current" points="0,0 127.5,127.5 255,0"/>
      </svg>
    </span>
  </span>
)}
                      {product.supplier?._id && (
                        <div className="mt-1">
                          <AverageReviewBySupplier supplierId={product.supplier._id} />
                        </div>
                      )}
                    </div>
                       {/* Reviews Button Section */}
                   <div className="mt-4">
                  <button
                    onClick={() => handleReviewsClick(product.supplier?._id)} // Navigate to Reviews page
                    className="inline-flex items-center px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                    </svg>
                    View Supplier Reviews
                  </button>
                </div>
                  </div>
                </div>
                <div>
                {role === "supplier" && (
                <>
                </>
                  )}
                  
                </div>
                
                {/* Action Buttons */}
                <div className="flex flex-wrap gap-4 pt-4">
                  {/* {role === "exporter" && (
                    <Link
                      to={`/chat?supplierId=${product.supplier?._id}`}
                      className="inline-flex items-center px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                    >
                      <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                      </svg>
                      Chat with Supplier
                    </Link>
                  )} */}
                  
                  {role === "exporter" && (
                    <button
                      onClick={() => setShowOfferPopup(true)}
                      className="inline-flex items-center px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                    >
                      <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      Send Offer
                    </button>
                  )}
                  {role === "exporter" && (
  <button
    onClick={() => setShowOrderPopup(true)}
    className="inline-flex items-center px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
  >
    <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
    </svg>
    Send Order
  </button>
)}
                </div>
                
                <div className="text-sm text-gray-500 pt-2">
                  <p>Posted on: {new Date(product.createdAt).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                  })}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="bg-white rounded-lg shadow p-8 text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading product details...</p>
        </div>
      )}

      {/* Offer Popup */}
      {showOfferPopup && product && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50 p-4">
          <div className="bg-white rounded-xl shadow-xl w-full max-w-md">
            <div className="flex justify-between items-center border-b p-4">
              <h3 className="text-lg font-semibold text-gray-900">Create Offer</h3>
              <button 
                onClick={() => setShowOfferPopup(false)}
                className="text-gray-400 hover:text-gray-600 rounded-full p-1"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            {/* <div className="p-6">
              <CreateOffer 
                supplierId={product.supplier?._id}
                productId={product._id}
                price={product.price}
                onClose={() => setShowOfferPopup(false)}
              />
            </div> */}
            <div className="p-6">
  <CreateOffer 
    supplierId={product.supplier?._id}
    productId={product._id}
    price={
      user?.subscription?.plan === 'pro' && 
      product.discounts?.length > 0 
        ? product.discounts[0].discountedPrice 
        : product.price
    }
    onClose={() => setShowOfferPopup(false)}
    // isOrder={true}
  />
</div>
          </div>
        </div>
      )}


{showOrderPopup && product && (
  <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50 p-4">
    <div className="bg-white rounded-xl shadow-xl w-full max-w-md">
      <div className="flex justify-between items-center border-b p-4">
        <h3 className="text-lg font-semibold text-gray-900">Create Order</h3>
        <button 
          onClick={() => setShowOrderPopup(false)}
          className="text-gray-400 hover:text-gray-600 rounded-full p-1"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>
      {/* <div className="p-6">
        <CreateOffer 
          supplierId={product.supplier?._id}
          productId={product._id}
          price={product.price}
          onClose={() => setShowOrderPopup(false)}
          isOrder={true} // This prop will make price uneditable
        />
      </div> */}
      <div className="p-6">
  <CreateOffer 
    supplierId={product.supplier?._id}
    productId={product._id}
    price={
      user?.subscription?.plan === 'pro' && 
      product.discounts?.length > 0 
        ? product.discounts[0].discountedPrice 
        : product.price
    }
    onClose={() => setShowOrderPopup(false)}
    isOrder={true}
  />
</div>
    </div>
  </div>
  
)}
      {product && (
  <RelatedProducts 
    currentProductId={product._id} 
    currentCategory={product.category} 
  />
)}
    </div>
  );
};

export default ProductDetails;  

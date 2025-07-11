// // // src/components/UserProfile.js
// // import React,{useState} from "react";
// // import { useSelector } from "react-redux";
// // import ProfilePictureUpdate from "./Supplier/products/ProfilePictureUpdate";
// // import LogoutButton from "./LogoutButton";
// // import { useEffect } from "react";
// // import { useAuthStore } from "../store/useAuthStore";
// // import SendOTP from "./otp/send-otp";

// // import VerifyEmailButton from "./VerifyEmailButton";
// // import ProfileUpdateForm from "./profile/ProfileUpdateForm";

// // const UserProfile = () => {
// //   const user = useSelector((state) => state.user); // Access the user data from the Redux store

// //   const averageRating = useSelector((state) => state.averageRating.value);

// //   const { connectSocket } = useAuthStore();

// //   // State to control the visibility of the ProfileUpdateForm
// //   const [showProfileUpdateForm, setShowProfileUpdateForm] = useState(false);
// //   useEffect(() => {
// //     // Call connectSocket when the component is mounted
// //     connectSocket();
// //   }, [connectSocket]); // Dependency array ensures it runs once on mount
// //   return (
// //     <>
// //       <div className="mt-24">
// //         {user.role === "supplier" ? (
// //           <>

// //             <div className="mt-4">
// //               <h3 className="text-lg font-semibold">
// //                 Average Rating: {averageRating} ⭐
// //               </h3>
// //             </div>
// //           </>
// //         ) : (
// //           <></>
// //         )}

// //         <div className="flex flex-col gap-3 items-center justify-center mb-3">
// //           {/* <h3>Profile Picture</h3> */}
// //           <img
// //             src={
// //               user.profilePicture ||
// //               "https://th.bing.com/th/id/OIP.mpXg7tyCFEecqgUsoW9eQwHaHk?w=206&h=210&c=7&r=0&o=5&pid=1.7"
// //             }
// //             alt={`${user.name}'s profile`}
// //             style={{ width: "150px", height: "150px", borderRadius: "50%" }}
// //           />
// //           <ProfilePictureUpdate />
// //         </div>
// //         <div className="w-[20vw] mx-auto flex justify-end mt-8">
// //           <span>
// //             <i
// //               className="ri-edit-2-line cursor-pointer bg-gray-300 p-1 rounded-full text-[#1b263b] text-xl"
// //               // onClick={() => setShowProfileUpdateForm(true)} // Show the form when clicked
// //               onClick={() => setShowProfileUpdateForm(prev => !prev)}
// //             ></i>
// //           </span>
// //         </div>
// //           {/* Conditionally show the form */}
// //       {/* {showProfileUpdateForm && (
// //         <ProfileUpdateForm
// //           onClose={() => setShowProfileUpdateForm(false)}
// //         />
// //       )} */}

// //         {/* Conditionally Render ProfileUpdateForm */}
// //         {showProfileUpdateForm && (
// //           <ProfileUpdateForm onClose={() => setShowProfileUpdateForm(false)} />
// //         )}
// //         {/* <h1>User Profile</h1> */}
// //         <div className="flex flex-col mt-0 p-5 items-center justify-center gap-4 text-[#1b263b]">
// //           <p className="w-[20vw] flex justify-between items-center">
// //             <span className="font-semibold">
// //               Name:
// //               <span className="ms-10 font-normal">{user.name || "Guest"}</span>
// //             </span>
// //           </p>

// //           <p className="min-w-[20vw] flex justify-between items-center">
// //             <span className="font-semibold">
// //               Email:
// //               <span className="ms-11 font-normal">
// //                 {user.email || "No Email Available"}
// //               </span>
// //             </span>
// //           </p>

// //           {/* <p className="w-[20vw] flex justify-between items-center">
// //             <span className="font-semibold">
// //               Age:
// //               <span className="ms-14 font-normal">{user.dateOfBirth || "No date of Birth"}</span>
// //             </span>
// //           </p> */}
// // <p className="w-[20vw] flex justify-between items-center">
// //   <span className="font-semibold">
// //     Age:
// //     <span className="ms-14 font-normal">
// //       {user.dateOfBirth
// //         ? new Date().getFullYear() - new Date(user.dateOfBirth).getFullYear()
// //         : "No date of Birth"}
// //     </span>
// //   </span>
// // </p>

// //           <p className="w-[20vw] flex justify-between items-center">
// //             <span className="font-semibold">
// //               Role:{" "}
// //               <span className="ms-12 font-normal">
// //                 {user.role || "No Role Available"}
// //               </span>
// //             </span>
// //           </p>

// //           <p className="w-[20vw] flex justify-between items-center">
// //             <span className="font-semibold">
// //               Address:
// //               <span className="ms-7 font-normal">
// //               {user.businessAddress || "No Address"}
// //               </span>
// //             </span>
// //           </p>

// //           <p className="w-[20vw] flex justify-between items-center">
// //             <span className="font-semibold">
// //               City:
// //               <span className="ms-5 font-normal">
// //               {user.city || "No City"}
// //               </span>
// //             </span>
// //             <span></span>
// //           </p>
// //         </div>
// //         {/* <p>ProfilePicture: {user.profilePicture || "No Picture Available"}</p> */}
// //         <div className="flex w-[25vw] mx-auto">
// //           <VerifyEmailButton />
// //           <LogoutButton />
// //         </div>

// //         {/* <VerifyEmail/> */}
// //       </div>
// //     </>
// //   );
// // };

// // export default UserProfile;

// // import React, { useState, useEffect } from "react";
// // import { useSelector,useDispatch } from "react-redux";
// // import LogoutButton from "./LogoutButton";
// // import { useAuthStore } from "../store/useAuthStore";
// // import VerifyEmailButton from "./VerifyEmailButton";
// // import ProfileUpdateForm from "./profile/ProfileUpdateForm";
// // import { motion } from "framer-motion";
// // import ProfilePictureUpdate from "./Supplier/products/ProfilePictureUpdate";
// // // import { motion } from "framer-motion";
// // import { toast } from "react-toastify";
// // // import ProfilePictureUpdate from "./Supplier/products/ProfilePictureUpdate";

// // const UserProfile = () => {
// //   const user = useSelector((state) => state.user);
// //   const averageRating = useSelector((state) => state.averageRating.value);
// //   const { connectSocket } = useAuthStore();
// //   const [showProfileUpdateForm, setShowProfileUpdateForm] = useState(false);

// //   const [isUploading, setIsUploading] = useState(false);
// //   const dispatch = useDispatch();

// //   useEffect(() => {
// //     connectSocket();
// //   }, [connectSocket]);

// //   const containerVariants = {
// //     hidden: { opacity: 0 },
// //     visible: {
// //       opacity: 1,
// //       transition: {
// //         staggerChildren: 0.1,
// //         delayChildren: 0.2,
// //       },
// //     },
// //   };

// //   const itemVariants = {
// //     hidden: { y: 20, opacity: 0 },
// //     visible: {
// //       y: 0,
// //       opacity: 1,
// //       transition: {
// //         duration: 0.5,
// //       },
// //     },
// //   };

// //   return (
// //     <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 pt-24 pb-12 px-4">
// //       <motion.div initial="hidden" animate="visible" variants={containerVariants} className="max-w-5xl mx-auto">
// //         <motion.div
// //           variants={itemVariants}
// //           className="bg-white rounded-2xl shadow-xl overflow-hidden transform transition-all hover:shadow-2xl"
// //         >
// //           {/* Top header with picture and gradient */}
// //           <div className="relative h-48 bg-gradient-to-r from-indigo-600 to-purple-600">
// //             <div className="absolute -bottom-16 left-6 flex flex-col items-center">
// //               <img
// //                 src={user.profilePicture || "https://cdn-icons-png.flaticon.com/512/3135/3135715.png"}
// //                 alt={`${user.name}'s profile`}
// //                 className="w-32 h-32 rounded-full border-4 border-white shadow-lg object-cover"
// //               />
// //               {/* Replace upload logic with custom upload component */}
// //               <div className="mt-4">
// //                 <ProfilePictureUpdate />
// //               </div>
// //             </div>
// //           </div>

// //           {/* Main content area */}
// //           <div className="pt-32 px-8 pb-8">
// //             <div className="flex justify-between items-start mb-6">
// //               <div>
// //                 <motion.h1 variants={itemVariants} className="text-3xl font-bold text-gray-800">
// //                   {user.name || "Guest"}
// //                 </motion.h1>
// //                 <motion.p variants={itemVariants} className="text-indigo-600 font-medium">
// //                   {user.role || "No Role Available"}
// //                 </motion.p>

// //                 {user.role === "supplier" && (
// //                   <motion.div variants={itemVariants} className="flex items-center mt-2">
// //                     <div className="flex items-center bg-yellow-50 px-3 py-1 rounded-full">
// //                       <span className="text-yellow-500 text-lg font-bold mr-1">{averageRating}</span>
// //                       <div className="flex">
// //                         {[...Array(5)].map((_, i) => (
// //                           <svg
// //                             key={i}
// //                             className={`w-4 h-4 ${i < Math.floor(averageRating) ? "text-yellow-400" : "text-gray-300"}`}
// //                             fill="currentColor"
// //                             viewBox="0 0 20 20"
// //                           >
// //                             <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.974a1 1 0 00.95.69h4.202c.969 0 1.371 1.24.588 1.81l-3.404 2.473a1 1 0 00-.364 1.118l1.286 3.974c.3.921-.755 1.688-1.54 1.118l-3.404-2.473a1 1 0 00-1.176 0l-3.404 2.473c-.785.57-1.84-.197-1.54-1.118l1.286-3.974a1 1 0 00-.364-1.118L2.215 9.401c-.783-.57-.38-1.81.588-1.81h4.202a1 1 0 00.95-.69l1.286-3.974z" />
// //                           </svg>
// //                         ))}
// //                       </div>
// //                     </div>
// //                     <span className="ml-2 text-sm text-gray-500">Average Rating</span>
// //                   </motion.div>
// //                 )}
// //               </div>
// //             </div>

// //             {showProfileUpdateForm && <ProfileUpdateForm onClose={() => setShowProfileUpdateForm(false)} />}

// //             {/* Optional: Add more profile info, edit buttons, etc. here */}

// //             {/* Buttons */}
// //             <motion.div variants={itemVariants} className="mt-10 flex flex-wrap justify-center gap-4">
// //               <VerifyEmailButton className="px-6 py-3 bg-green-500 text-white rounded-lg" />
// //               <LogoutButton className="px-6 py-3 bg-gray-300 text-gray-800 rounded-lg" />
// //             </motion.div>
// //           </div>
// //         </motion.div>
// //       </motion.div>
// //     </div>
// //   );
// // };

// // export default UserProfile;

// import React, { useState, useEffect } from "react";
// import { useSelector, useDispatch } from "react-redux";
// import LogoutButton from "./LogoutButton";
// import { useAuthStore } from "../store/useAuthStore";
// import VerifyEmailButton from "./VerifyEmailButton";
// import ProfileUpdateForm from "./profile/ProfileUpdateForm";
// import { motion } from "framer-motion";
// import { toast } from "react-toastify";
// import ProfilePictureUpdate from "./Supplier/products/ProfilePictureUpdate";

// const UserProfile = () => {
//   const user = useSelector((state) => state.user);
//   const averageRating = useSelector((state) => state.averageRating.value);
//   const { connectSocket } = useAuthStore();
//   const [showProfileUpdateForm, setShowProfileUpdateForm] = useState(false);
//   const [isUploading, setIsUploading] = useState(false);
//   const dispatch = useDispatch();

//   useEffect(() => {
//     connectSocket();
//   }, [connectSocket]);

//   // Animation variants
//   const containerVariants = {
//     hidden: { opacity: 0 },
//     visible: {
//       opacity: 1,
//       transition: {
//         staggerChildren: 0.1,
//         delayChildren: 0.2
//       }
//     }
//   };

//   const itemVariants = {
//     hidden: { y: 20, opacity: 0 },
//     visible: {
//       y: 0,
//       opacity: 1,
//       transition: {
//         duration: 0.5
//       }
//     }
//   };

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 pt-24 pb-12 px-4">
//       <motion.div
//         initial="hidden"
//         animate="visible"
//         variants={containerVariants}
//         className="max-w-5xl mx-auto"
//       >
//         {/* Profile Card */}
//         <motion.div
//           variants={itemVariants}
//           className="bg-white rounded-2xl shadow-xl overflow-hidden transform transition-all hover:shadow-2xl"
//         >
//           {/* Gradient Header */}
//           <div className="relative h-48 bg-gradient-to-r from-indigo-600 to-purple-600">
//             <div className="absolute -bottom-16 left-6">
//               <div className="relative group">
//                 <img
//                   src={
//                     user.profilePicture ||
//                     "https://cdn-icons-png.flaticon.com/512/3135/3135715.png"
//                   }
//                   alt={`${user.name}'s profile`}
//                   className="w-32 h-32 rounded-full border-4 border-white shadow-lg transition-transform duration-300 group-hover:scale-105 object-cover"
//                 />
//                 <div className="absolute bottom-0 right-0">
//                   <ProfilePictureUpdate />
//                 </div>
//               </div>
//             </div>
//           </div>

//           {/* Profile Content */}
//           <div className="pt-20 px-8 pb-8">
//             <div className="flex justify-between items-start mb-6">
//               <div>
//                 <motion.h1
//                   variants={itemVariants}
//                   className="text-3xl font-bold text-gray-800"
//                 >
//                   {user.name || "Guest"}
//                 </motion.h1>
//                 <motion.p
//                   variants={itemVariants}
//                   className="text-indigo-600 font-medium"
//                 >
//                   {user.role || "No Role Available"}
//                 </motion.p>
//                 {user.role === "supplier" && (
//                   <motion.div
//                     variants={itemVariants}
//                     className="flex items-center mt-2"
//                   >
//                     <div className="flex items-center bg-yellow-50 px-3 py-1 rounded-full">
//                       <span className="text-yellow-500 text-lg font-bold mr-1">
//                         {averageRating}
//                       </span>
//                       <div className="flex">
//                         {[...Array(5)].map((_, i) => (
//                           <svg
//                             key={i}
//                             className={`w-4 h-4 ${i < Math.floor(averageRating) ? 'text-yellow-400' : 'text-gray-300'}`}
//                             fill="currentColor"
//                             viewBox="0 0 20 20"
//                           >
//                             <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.974a1 1 0 00.95.69h4.202c.969 0 1.371 1.24.588 1.81l-3.404 2.473a1 1 0 00-.364 1.118l1.286 3.974c.3.921-.755 1.688-1.54 1.118l-3.404-2.473a1 1 0 00-1.176 0l-3.404 2.473c-.785.57-1.84-.197-1.54-1.118l1.286-3.974a1 1 0 00-.364-1.118L2.215 9.401c-.783-.57-.38-1.81.588-1.81h4.202a1 1 0 00.95-.69l1.286-3.974z"/>
//                           </svg>
//                         ))}
//                       </div>
//                     </div>
//                     <span className="ml-2 text-sm text-gray-500">Average Rating</span>
//                   </motion.div>
//                 )}
//               </div>

//               <motion.button
//                 variants={itemVariants}
//                 whileHover={{ scale: 1.05 }}
//                 whileTap={{ scale: 0.95 }}
//                 onClick={() => setShowProfileUpdateForm(prev => !prev)}
//                 className="flex items-center px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg transition-all shadow-md"
//               >
//                 <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
//                 </svg>
//                 Edit Profile
//               </motion.button>
//             </div>

//             {/* Profile Update Form */}
//             {showProfileUpdateForm && (
//               <ProfileUpdateForm onClose={() => setShowProfileUpdateForm(false)} />
//             )}

//             {/* Profile Details */}
//             <motion.div
//               variants={containerVariants}
//               className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8"
//             >
//               {/* Personal Info Card */}
//               <motion.div
//                 variants={itemVariants}
//                 className="bg-gradient-to-br from-white to-gray-50 p-6 rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow"
//               >
//                 <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
//                   <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-indigo-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
//                   </svg>
//                   Personal Information
//                 </h2>
//                 <div className="space-y-4">
//                   <div className="flex justify-between items-center py-2 border-b border-gray-100">
//                     <span className="text-gray-600 flex items-center">
//                       <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
//                       </svg>
//                       Email:
//                     </span>
//                     <span className="font-medium text-gray-800 text-right">
//                       {user.email || "Not specified"}
//                     </span>
//                   </div>
//                   <div className="flex justify-between items-center py-2 border-b border-gray-100">
//                     <span className="text-gray-600 flex items-center">
//                       <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
//                       </svg>
//                       Age:
//                     </span>
//                     <span className="font-medium text-gray-800">
//                       {user.dateOfBirth
//                         ? new Date().getFullYear() - new Date(user.dateOfBirth).getFullYear()
//                         : "Not specified"}
//                     </span>
//                   </div>
//                 </div>
//               </motion.div>

//               {/* Business Info Card */}
//               <motion.div
//                 variants={itemVariants}
//                 className="bg-gradient-to-br from-white to-gray-50 p-6 rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow"
//               >
//                 <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
//                   <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-indigo-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
//                   </svg>
//                   Business Information
//                 </h2>
//                 <div className="space-y-4">
//                   <div className="flex justify-between items-center py-2 border-b border-gray-100">
//                     <span className="text-gray-600 flex items-center">
//                       <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
//                         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
//                       </svg>
//                       Address:
//                     </span>
//                     <span className="font-medium text-gray-800 text-right">
//                       {user.businessAddress || "Not specified"}
//                     </span>
//                   </div>
//                   <div className="flex justify-between items-center py-2">
//                     <span className="text-gray-600 flex items-center">
//                       <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
//                       </svg>
//                       City:
//                     </span>
//                     <span className="font-medium text-gray-800">
//                       {user.city || "Not specified"}
//                     </span>
//                   </div>
//                 </div>
//               </motion.div>
//             </motion.div>

//             {/* Action Buttons */}
//             <motion.div
//               variants={itemVariants}
//               className="mt-10 flex flex-wrap justify-center gap-4"
//             >
//               <VerifyEmailButton className="px-6 py-3 bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white rounded-lg transition-all shadow-md hover:shadow-lg flex items-center" />
//               <LogoutButton className="px-6 py-3 bg-gradient-to-r from-gray-200 to-gray-300 hover:from-gray-300 hover:to-gray-400 text-gray-800 rounded-lg transition-all shadow-md hover:shadow-lg flex items-center" />
//             </motion.div>
//           </div>
//         </motion.div>
//       </motion.div>
//     </div>
//   );
// };

// export default UserProfile;

import React, { useState } from "react";
import { useSelector } from "react-redux";
import { motion } from "framer-motion";
import ProfileSidebar from "./profiles/ProfileSidebar";
import ProfileContent from "./profiles/ProfileContent";

const UserProfile = () => {
  const [activeTab, setActiveTab] = useState("profile");
  const user = useSelector((state) => state.user);

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  return (
    <div className="min-h-screen bg-neutral-100 pt-16 pb-5">
      {/* Main Container */}
      <div className="flex">
        {/* Fixed Sidebar */}
        <div className="hidden lg:block fixed left-0 top-16 bottom-0 w-64 border-r border-neutral-200 bg-surface z-10">
          <ProfileSidebar
            activeTab={activeTab}
            setActiveTab={setActiveTab}
            user={user}
          />
        </div>

        {/* Scrollable Content Area */}
        <motion.div
          initial="hidden"
          animate="visible"
          variants={containerVariants}
          className="flex-1 lg:ml-64"
        >
          <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="bg-surface rounded-xl shadow-sm overflow-hidden">
              <ProfileContent activeTab={activeTab} user={user} />
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default UserProfile;

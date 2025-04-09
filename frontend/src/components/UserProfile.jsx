// // src/components/UserProfile.js
// import React,{useState} from "react";
// import { useSelector } from "react-redux";
// import ProfilePictureUpdate from "./Supplier/products/ProfilePictureUpdate";
// import LogoutButton from "./LogoutButton";
// import { useEffect } from "react";
// import { useAuthStore } from "../store/useAuthStore";
// import SendOTP from "./otp/send-otp";

// import VerifyEmailButton from "./VerifyEmailButton";
// import ProfileUpdateForm from "./profile/ProfileUpdateForm";

// const UserProfile = () => {
//   const user = useSelector((state) => state.user); // Access the user data from the Redux store

//   const averageRating = useSelector((state) => state.averageRating.value);

//   const { connectSocket } = useAuthStore();

  

//   // State to control the visibility of the ProfileUpdateForm
//   const [showProfileUpdateForm, setShowProfileUpdateForm] = useState(false);
//   useEffect(() => {
//     // Call connectSocket when the component is mounted
//     connectSocket();
//   }, [connectSocket]); // Dependency array ensures it runs once on mount
//   return (
//     <>
//       <div className="mt-24">
//         {user.role === "supplier" ? (
//           <>
          
//             <div className="mt-4">
//               <h3 className="text-lg font-semibold">
//                 Average Rating: {averageRating} ⭐
//               </h3>
//             </div>
//           </>
//         ) : (
//           <></>
//         )}

//         <div className="flex flex-col gap-3 items-center justify-center mb-3">
//           {/* <h3>Profile Picture</h3> */}
//           <img
//             src={
//               user.profilePicture ||
//               "https://th.bing.com/th/id/OIP.mpXg7tyCFEecqgUsoW9eQwHaHk?w=206&h=210&c=7&r=0&o=5&pid=1.7"
//             }
//             alt={`${user.name}'s profile`}
//             style={{ width: "150px", height: "150px", borderRadius: "50%" }}
//           />
//           <ProfilePictureUpdate />
//         </div>
//         <div className="w-[20vw] mx-auto flex justify-end mt-8">
//           <span>
//             <i
//               className="ri-edit-2-line cursor-pointer bg-gray-300 p-1 rounded-full text-[#1b263b] text-xl"
//               // onClick={() => setShowProfileUpdateForm(true)} // Show the form when clicked
//               onClick={() => setShowProfileUpdateForm(prev => !prev)}
//             ></i>
//           </span>
//         </div>
//           {/* Conditionally show the form */}
//       {/* {showProfileUpdateForm && (
//         <ProfileUpdateForm 
//           onClose={() => setShowProfileUpdateForm(false)}
//         />
//       )} */}

//         {/* Conditionally Render ProfileUpdateForm */}
//         {showProfileUpdateForm && (
//           <ProfileUpdateForm onClose={() => setShowProfileUpdateForm(false)} />
//         )}
//         {/* <h1>User Profile</h1> */}
//         <div className="flex flex-col mt-0 p-5 items-center justify-center gap-4 text-[#1b263b]">
//           <p className="w-[20vw] flex justify-between items-center">
//             <span className="font-semibold">
//               Name:
//               <span className="ms-10 font-normal">{user.name || "Guest"}</span>
//             </span>
//           </p>

//           <p className="min-w-[20vw] flex justify-between items-center">
//             <span className="font-semibold">
//               Email:
//               <span className="ms-11 font-normal">
//                 {user.email || "No Email Available"}
//               </span>
//             </span>
//           </p>

//           {/* <p className="w-[20vw] flex justify-between items-center">
//             <span className="font-semibold">
//               Age:
//               <span className="ms-14 font-normal">{user.dateOfBirth || "No date of Birth"}</span>
//             </span>
//           </p> */}
// <p className="w-[20vw] flex justify-between items-center">
//   <span className="font-semibold">
//     Age:
//     <span className="ms-14 font-normal">
//       {user.dateOfBirth 
//         ? new Date().getFullYear() - new Date(user.dateOfBirth).getFullYear() 
//         : "No date of Birth"}
//     </span>
//   </span>
// </p>

//           <p className="w-[20vw] flex justify-between items-center">
//             <span className="font-semibold">
//               Role:{" "}
//               <span className="ms-12 font-normal">
//                 {user.role || "No Role Available"}
//               </span>
//             </span>
//           </p>

//           <p className="w-[20vw] flex justify-between items-center">
//             <span className="font-semibold">
//               Address:
//               <span className="ms-7 font-normal">
//               {user.businessAddress || "No Address"}
//               </span>
//             </span>
//           </p>

//           <p className="w-[20vw] flex justify-between items-center">
//             <span className="font-semibold">
//               City:
//               <span className="ms-5 font-normal">
//               {user.city || "No City"}
//               </span>
//             </span>
//             <span></span>
//           </p>
//         </div>
//         {/* <p>ProfilePicture: {user.profilePicture || "No Picture Available"}</p> */}
//         <div className="flex w-[25vw] mx-auto">
//           <VerifyEmailButton />
//           <LogoutButton />
//         </div>

//         {/* <VerifyEmail/> */}
//       </div>
//     </>
//   );
// };

// export default UserProfile;





import React, { useState, useEffect } from "react";
import { useSelector,useDispatch } from "react-redux";
import LogoutButton from "./LogoutButton";
import { useAuthStore } from "../store/useAuthStore";
import VerifyEmailButton from "./VerifyEmailButton";
import ProfileUpdateForm from "./profile/ProfileUpdateForm";
import { motion } from "framer-motion";
import ProfilePictureUpdate from "./Supplier/products/ProfilePictureUpdate";
// import { motion } from "framer-motion";
import { toast } from "react-toastify";
// import ProfilePictureUpdate from "./Supplier/products/ProfilePictureUpdate";

const UserProfile = () => {
  const user = useSelector((state) => state.user);
  const averageRating = useSelector((state) => state.averageRating.value);
  const { connectSocket } = useAuthStore();
  const [showProfileUpdateForm, setShowProfileUpdateForm] = useState(false);

  const [isUploading, setIsUploading] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    connectSocket();
  }, [connectSocket]);

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

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5,
      },
    },
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 pt-24 pb-12 px-4">
      <motion.div initial="hidden" animate="visible" variants={containerVariants} className="max-w-5xl mx-auto">
        <motion.div
          variants={itemVariants}
          className="bg-white rounded-2xl shadow-xl overflow-hidden transform transition-all hover:shadow-2xl"
        >
          {/* Top header with picture and gradient */}
          <div className="relative h-48 bg-gradient-to-r from-indigo-600 to-purple-600">
            <div className="absolute -bottom-16 left-6 flex flex-col items-center">
              <img
                src={user.profilePicture || "https://cdn-icons-png.flaticon.com/512/3135/3135715.png"}
                alt={`${user.name}'s profile`}
                className="w-32 h-32 rounded-full border-4 border-white shadow-lg object-cover"
              />
              {/* Replace upload logic with custom upload component */}
              <div className="mt-4">
                <ProfilePictureUpdate />
              </div>
            </div>
          </div>

          {/* Main content area */}
          <div className="pt-32 px-8 pb-8">
            <div className="flex justify-between items-start mb-6">
              <div>
                <motion.h1 variants={itemVariants} className="text-3xl font-bold text-gray-800">
                  {user.name || "Guest"}
                </motion.h1>
                <motion.p variants={itemVariants} className="text-indigo-600 font-medium">
                  {user.role || "No Role Available"}
                </motion.p>

                {user.role === "supplier" && (
                  <motion.div variants={itemVariants} className="flex items-center mt-2">
                    <div className="flex items-center bg-yellow-50 px-3 py-1 rounded-full">
                      <span className="text-yellow-500 text-lg font-bold mr-1">{averageRating}</span>
                      <div className="flex">
                        {[...Array(5)].map((_, i) => (
                          <svg
                            key={i}
                            className={`w-4 h-4 ${i < Math.floor(averageRating) ? "text-yellow-400" : "text-gray-300"}`}
                            fill="currentColor"
                            viewBox="0 0 20 20"
                          >
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.974a1 1 0 00.95.69h4.202c.969 0 1.371 1.24.588 1.81l-3.404 2.473a1 1 0 00-.364 1.118l1.286 3.974c.3.921-.755 1.688-1.54 1.118l-3.404-2.473a1 1 0 00-1.176 0l-3.404 2.473c-.785.57-1.84-.197-1.54-1.118l1.286-3.974a1 1 0 00-.364-1.118L2.215 9.401c-.783-.57-.38-1.81.588-1.81h4.202a1 1 0 00.95-.69l1.286-3.974z" />
                          </svg>
                        ))}
                      </div>
                    </div>
                    <span className="ml-2 text-sm text-gray-500">Average Rating</span>
                  </motion.div>
                )}
              </div>
            </div>

            {showProfileUpdateForm && <ProfileUpdateForm onClose={() => setShowProfileUpdateForm(false)} />}

            {/* Optional: Add more profile info, edit buttons, etc. here */}

            {/* Buttons */}
            <motion.div variants={itemVariants} className="mt-10 flex flex-wrap justify-center gap-4">
              <VerifyEmailButton className="px-6 py-3 bg-green-500 text-white rounded-lg" />
              <LogoutButton className="px-6 py-3 bg-gray-300 text-gray-800 rounded-lg" />
            </motion.div>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default UserProfile;
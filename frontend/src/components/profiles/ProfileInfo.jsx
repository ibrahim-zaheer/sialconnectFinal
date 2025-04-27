import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import LogoutButton from "../LogoutButton";
import { useAuthStore } from "../../store/useAuthStore";
// import VerifyEmailButton from "../../../../../src/components/VerifyEmailButton";
import VerifyEmail from "../verifyEmail";
import VerifyEmailButton from "../VerifyEmailButton";

import ProfileUpdateForm from "../profile/ProfileUpdateForm";
import { motion } from "framer-motion";
import { toast } from "react-toastify";
import ProfilePictureUpdate from "../Supplier/products/ProfilePictureUpdate";

const ProfileInfo = () => {
  const user = useSelector((state) => state.user);
  const averageRating = useSelector((state) => state.averageRating.value);
  const { connectSocket } = useAuthStore();
  const [showProfileUpdateForm, setShowProfileUpdateForm] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    connectSocket();
  }, [connectSocket]);

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5
      }
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-12 px-4">
      <motion.div 
        initial="hidden"
        animate="visible"
        variants={containerVariants}
        className="max-w-5xl mx-auto"
      >
        {/* Profile Card */}
        <motion.div 
          variants={itemVariants}
          className="bg-white rounded-2xl shadow-xl overflow-hidden transform transition-all hover:shadow-2xl"
        >
          {/* Gradient Header */}
          <div className="relative h-48 bg-gradient-to-r from-indigo-600 to-purple-600">
            <div className="absolute -bottom-16 left-6">
              <div className="relative group">
                <img
                  src={
                    user.profilePicture ||
                    "https://cdn-icons-png.flaticon.com/512/3135/3135715.png"
                  }
                  alt={`${user.name}'s profile`}
                  className="w-32 h-32 rounded-full border-4 border-white shadow-lg transition-transform duration-300 group-hover:scale-105 object-cover"
                />
                <div className="absolute bottom-0 right-0">
                  <ProfilePictureUpdate />
                </div>
              </div>
            </div>
          </div>

          {/* Profile Content */}
          <div className="pt-20 px-8 pb-8">
            <div className="flex justify-between items-start mb-6">
              <div>
                <motion.h1 
                  variants={itemVariants}
                  className="text-3xl font-bold text-gray-800"
                >
                  {user.name || "Guest"}
                </motion.h1>
                <motion.p 
                  variants={itemVariants}
                  className="text-indigo-600 font-medium"
                >
                  {user.role || "No Role Available"}
                </motion.p>
                {user.role === "supplier" && (
                  <motion.div 
                    variants={itemVariants}
                    className="flex items-center mt-2"
                  >
                    <div className="flex items-center bg-yellow-50 px-3 py-1 rounded-full">
                      <span className="text-yellow-500 text-lg font-bold mr-1">
                        {averageRating}
                      </span>
                      <div className="flex">
                        {[...Array(5)].map((_, i) => (
                          <svg
                            key={i}
                            className={`w-4 h-4 ${i < Math.floor(averageRating) ? 'text-yellow-400' : 'text-gray-300'}`}
                            fill="currentColor"
                            viewBox="0 0 20 20"
                          >
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.974a1 1 0 00.95.69h4.202c.969 0 1.371 1.24.588 1.81l-3.404 2.473a1 1 0 00-.364 1.118l1.286 3.974c.3.921-.755 1.688-1.54 1.118l-3.404-2.473a1 1 0 00-1.176 0l-3.404 2.473c-.785.57-1.84-.197-1.54-1.118l1.286-3.974a1 1 0 00-.364-1.118L2.215 9.401c-.783-.57-.38-1.81.588-1.81h4.202a1 1 0 00.95-.69l1.286-3.974z"/>
                          </svg>
                        ))}
                      </div>
                    </div>
                    <span className="ml-2 text-sm text-gray-500">Average Rating</span>
                  </motion.div>
                )}
              </div>

              <motion.button
                variants={itemVariants}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setShowProfileUpdateForm(prev => !prev)}
                className="flex items-center px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg transition-all shadow-md"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                </svg>
                Edit Profile
              </motion.button>
            </div>

            {/* Profile Update Form */}
            {showProfileUpdateForm && (
              <ProfileUpdateForm onClose={() => setShowProfileUpdateForm(false)} />
            )}

            {/* Profile Details */}
            <motion.div 
              variants={containerVariants}
              className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8"
            >
              {/* Personal Info Card */}
              <motion.div 
                variants={itemVariants}
                className="bg-gradient-to-br from-white to-gray-50 p-6 rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow"
              >
                <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-indigo-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                  Personal Information
                </h2>
                <div className="space-y-4">
                  <div className="flex justify-between items-center py-2 border-b border-gray-100">
                    <span className="text-gray-600 flex items-center">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                      Email:
                    </span>
                    <span className="font-medium text-gray-800 text-right">
                      {user.email || "Not specified"}
                    </span>
                  </div>
                  <div className="flex justify-between items-center py-2 border-b border-gray-100">
                    <span className="text-gray-600 flex items-center">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                      Age:
                    </span>
                    <span className="font-medium text-gray-800">
                      {user.dateOfBirth 
                        ? new Date().getFullYear() - new Date(user.dateOfBirth).getFullYear() 
                        : "Not specified"}
                    </span>
                  </div>
                </div>
              </motion.div>

              {/* Business Info Card */}
              <motion.div 
                variants={itemVariants}
                className="bg-gradient-to-br from-white to-gray-50 p-6 rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow"
              >
                <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-indigo-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                  </svg>
                  Business Information
                </h2>
                <div className="space-y-4">
                  <div className="flex justify-between items-center py-2 border-b border-gray-100">
                    <span className="text-gray-600 flex items-center">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                      Address:
                    </span>
                    <span className="font-medium text-gray-800 text-right">
                      {user.businessAddress || "Not specified"}
                    </span>
                  </div>
                  <div className="flex justify-between items-center py-2">
                    <span className="text-gray-600 flex items-center">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                      </svg>
                      City:
                    </span>
                    <span className="font-medium text-gray-800">
                      {user.city || "Not specified"}
                    </span>
                  </div>
                </div>
              </motion.div>
            </motion.div>

            {/* Action Buttons */}
            <motion.div 
              variants={itemVariants}
              className="mt-10 flex flex-wrap justify-between items-center gap-4"
            >
              {/* <VerifyEmailButton className="px-6 py-3 bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white rounded-lg transition-all shadow-md hover:shadow-lg flex items-center" /> */}
              {!user.emailVerified && (
          <VerifyEmailButton className="px-6 py-3 bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white rounded-lg transition-all shadow-md hover:shadow-lg flex items-center" />
        )}
            
              <LogoutButton className="px-6 py-3 bg-gradient-to-r from-gray-200 to-gray-300 hover:from-gray-300 hover:to-gray-400 text-gray-800 rounded-lg transition-all shadow-md hover:shadow-lg flex items-center" />
              {user.emailVerified && (
        <div className="flex items-center mt-1">
          <span className="text-xs text-green-600 bg-green-100 px-2 py-1 rounded-full flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 mr-1" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
            </svg>
            Email Verified
          </span>
        </div>
      )}
            </motion.div>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default ProfileInfo;
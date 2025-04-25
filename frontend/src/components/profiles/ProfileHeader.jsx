import React from "react";
import { motion } from "framer-motion";
import ProfileUpdateForm from "../profile/ProfileUpdateForm";
import ProfilePictureUpdate from "../Supplier/products/ProfilePictureUpdate";

const ProfileHeader = ({ user }) => {
  return (
    <motion.div
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.3 }}
      className="bg-white rounded-2xl shadow-sm overflow-hidden mb-6"
    >
      <div className="relative h-40 bg-gradient-to-r from-indigo-500 to-purple-600">
        <div className="absolute -bottom-12 left-6">
          <div className="relative group">
            <img
              src={user.profilePicture || "https://cdn-icons-png.flaticon.com/512/3135/3135715.png"}
              alt={`${user.name}'s profile`}
              className="w-24 h-24 rounded-full border-4 border-white shadow-lg object-cover"
            />
            <div className="absolute bottom-0 right-0">
              <ProfilePictureUpdate />
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default ProfileHeader;
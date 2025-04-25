import React from "react";
import VerifyEmailButton from "../VerifyEmailButton";
import LogoutButton from "../LogoutButton";
const ProfileInfo = ({ user }) => {
  return (
    <div className="p-6">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-2">{user.name || "Guest"}</h2>
        <p className="text-indigo-600 font-medium">{user.role || "No Role"}</p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        {/* Personal Info */}
        <div className="bg-gray-50 p-5 rounded-xl">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Personal Information</h3>
          <div className="space-y-3">
            <div className="flex justify-between">
              <span className="text-gray-600">Email:</span>
              <span className="font-medium">{user.email || "Not specified"}</span>
            </div>
            {/* Add more personal info fields */}
          </div>
        </div>
        
        {/* Business Info */}
        <div className="bg-gray-50 p-5 rounded-xl">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Business Information</h3>
          <div className="space-y-3">
            <div className="flex justify-between">
              <span className="text-gray-600">Address:</span>
              <span className="font-medium">{user.businessAddress || "Not specified"}</span>
            </div>
            {/* Add more business info fields */}
          </div>
        </div>
      </div>
      
      <div className="flex flex-wrap gap-4">
        <VerifyEmailButton className="px-5 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors" />
        <LogoutButton className="px-5 py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 transition-colors" />
        
      </div>
    </div>
  );
};

export default ProfileInfo;
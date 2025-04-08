import React, { useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { updateProfilePicture } from "../../../redux/reducers/userSlice";
import { toast } from "react-toastify";

const ProfilePictureUpdate = () => {
  const [file, setFile] = useState(null);
  const [isUploading, setIsUploading] = useState(false);
  const dispatch = useDispatch();

  const handleFileChange = async (e) => {
    const selectedFile = e.target.files[0];
    if (!selectedFile) return;

    // Validate file
    if (!selectedFile.type.match("image.*")) {
      toast.error("Only image files are allowed (JPEG, PNG)");
      return;
    }
    if (selectedFile.size > 5 * 1024 * 1024) {
      toast.error("File size must be less than 5MB");
      return;
    }

    setFile(selectedFile);
    
    // Immediately upload when file is selected (removed separate upload button)
    await handleUpload(selectedFile);
  };

  const handleUpload = async (fileToUpload) => {
    const formData = new FormData();
    formData.append("image", fileToUpload || file);

    try {
      setIsUploading(true);
      const { data } = await axios.put("/api/auth/profile-picture", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      dispatch(updateProfilePicture(data.profilePicture));
      toast.success("Profile picture updated successfully!");
    } catch (error) {
      console.error("Upload error:", error);
      toast.error(error.response?.data?.message || "Failed to upload profile picture");
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <label className="cursor-pointer group relative">
      <input 
        type="file" 
        accept="image/*" 
        onChange={handleFileChange}
        className="hidden"
        disabled={isUploading}
      />
      {isUploading ? (
        <div className="w-8 h-8 flex items-center justify-center">
          <svg className="animate-spin h-5 w-5 text-indigo-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
        </div>
      ) : (
        <div className="p-2 bg-white rounded-full shadow-md group-hover:bg-indigo-100 transition-colors">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
        </div>
      )}
    </label>
  );
};

export default ProfilePictureUpdate;
import React, { useState } from "react";
import axios from "axios";

import { useDispatch } from "react-redux";

import { updateProfilePicture } from "../../../redux/reducers/userSlice";

const ProfilePictureUpdate = () => {
  const [file, setFile] = useState(null);
  const [message, setMessage] = useState("");
  const [preview, setPreview] = useState(null);
  const dispatch = useDispatch(); // Hook to dispatch actions

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    setFile(selectedFile);

    // Show a preview of the selected image
    const reader = new FileReader();
    reader.onloadend = () => setPreview(reader.result);
    reader.readAsDataURL(selectedFile);
  };

  const handleUpload = async () => {
    if (!file) {
      setMessage("Please select a file.");
      return;
    }

    const formData = new FormData();
    formData.append("image", file);

    try {
      const { data } = await axios.put("/api/auth/profile-picture", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${localStorage.getItem("token")}`, // Assuming JWT token is stored in localStorage
        },
      });

      setMessage(data.message);
      dispatch(updateProfilePicture(data.profilePicture));
    } catch (error) {
      setMessage("Error uploading profile picture.");
    }
  };

  return (
    <div className="flex flex-col justify-center items-center gap-2">
      <h1 className="text-2xl">Update Profile Picture</h1>
      <div>
        <input type="file" accept="image/*" onChange={handleFileChange} />
        {/* {preview && (
          <img
            src={preview}
            alt="Preview"
            style={{ width: "150px", borderRadius: "50%" }}
          />
        )} */}

        <button
          className="mt-2 border-1 px-5 py-1 rounded-lg bg-[#1b263b] text-white hover:bg-[#415a77] transition-all duration-300"
          onClick={handleUpload}
        >
          Upload
        </button>
      </div>
      {message && <p>{message}</p>}
    </div>
  );
};

export default ProfilePictureUpdate;

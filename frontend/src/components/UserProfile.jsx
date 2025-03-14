// src/components/UserProfile.js
import React,{useState} from "react";
import { useSelector } from "react-redux";
import ProfilePictureUpdate from "./Supplier/products/ProfilePictureUpdate";
import LogoutButton from "./LogoutButton";
import { useEffect } from "react";
import { useAuthStore } from "../store/useAuthStore";
import SendOTP from "./otp/send-otp";

import VerifyEmailButton from "./VerifyEmailButton";
import ProfileUpdateForm from "./profile/ProfileUpdateForm";

const UserProfile = () => {
  const user = useSelector((state) => state.user); // Access the user data from the Redux store

  const averageRating = useSelector((state) => state.averageRating.value);

  const { connectSocket } = useAuthStore();

  

  // State to control the visibility of the ProfileUpdateForm
  const [showProfileUpdateForm, setShowProfileUpdateForm] = useState(false);
  useEffect(() => {
    // Call connectSocket when the component is mounted
    connectSocket();
  }, [connectSocket]); // Dependency array ensures it runs once on mount
  return (
    <>
      <div className="mt-24">
        {user.role === "supplier" ? (
          <>
          
            <div className="mt-4">
              <h3 className="text-lg font-semibold">
                Average Rating: {averageRating} ⭐
              </h3>
            </div>
          </>
        ) : (
          <></>
        )}

        <div className="flex flex-col gap-3 items-center justify-center mb-3">
          {/* <h3>Profile Picture</h3> */}
          <img
            src={
              user.profilePicture ||
              "https://th.bing.com/th/id/OIP.mpXg7tyCFEecqgUsoW9eQwHaHk?w=206&h=210&c=7&r=0&o=5&pid=1.7"
            }
            alt={`${user.name}'s profile`}
            style={{ width: "150px", height: "150px", borderRadius: "50%" }}
          />
          <ProfilePictureUpdate />
        </div>
        <div className="w-[20vw] mx-auto flex justify-end mt-8">
          <span>
            <i
              className="ri-edit-2-line cursor-pointer bg-gray-300 p-1 rounded-full text-[#1b263b] text-xl"
              // onClick={() => setShowProfileUpdateForm(true)} // Show the form when clicked
              onClick={() => setShowProfileUpdateForm(prev => !prev)}
            ></i>
          </span>
        </div>
          {/* Conditionally show the form */}
      {/* {showProfileUpdateForm && (
        <ProfileUpdateForm 
          onClose={() => setShowProfileUpdateForm(false)}
        />
      )} */}

        {/* Conditionally Render ProfileUpdateForm */}
        {showProfileUpdateForm && (
          <ProfileUpdateForm onClose={() => setShowProfileUpdateForm(false)} />
        )}
        {/* <h1>User Profile</h1> */}
        <div className="flex flex-col mt-0 p-5 items-center justify-center gap-4 text-[#1b263b]">
          <p className="w-[20vw] flex justify-between items-center">
            <span className="font-semibold">
              Name:
              <span className="ms-10 font-normal">{user.name || "Guest"}</span>
            </span>
          </p>

          <p className="min-w-[20vw] flex justify-between items-center">
            <span className="font-semibold">
              Email:
              <span className="ms-11 font-normal">
                {user.email || "No Email Available"}
              </span>
            </span>
          </p>

          {/* <p className="w-[20vw] flex justify-between items-center">
            <span className="font-semibold">
              Age:
              <span className="ms-14 font-normal">{user.dateOfBirth || "No date of Birth"}</span>
            </span>
          </p> */}
<p className="w-[20vw] flex justify-between items-center">
  <span className="font-semibold">
    Age:
    <span className="ms-14 font-normal">
      {user.dateOfBirth 
        ? new Date().getFullYear() - new Date(user.dateOfBirth).getFullYear() 
        : "No date of Birth"}
    </span>
  </span>
</p>

          <p className="w-[20vw] flex justify-between items-center">
            <span className="font-semibold">
              Role:{" "}
              <span className="ms-12 font-normal">
                {user.role || "No Role Available"}
              </span>
            </span>
          </p>

          <p className="w-[20vw] flex justify-between items-center">
            <span className="font-semibold">
              Address:
              <span className="ms-7 font-normal">
              {user.businessAddress || "No Address"}
              </span>
            </span>
          </p>

          <p className="w-[20vw] flex justify-between items-center">
            <span className="font-semibold">
              City:
              <span className="ms-5 font-normal">
              {user.city || "No City"}
              </span>
            </span>
            <span></span>
          </p>
        </div>
        {/* <p>ProfilePicture: {user.profilePicture || "No Picture Available"}</p> */}
        <div className="flex w-[25vw] mx-auto">
          <VerifyEmailButton />
          <LogoutButton />
        </div>

        {/* <VerifyEmail/> */}
      </div>
    </>
  );
};

export default UserProfile;

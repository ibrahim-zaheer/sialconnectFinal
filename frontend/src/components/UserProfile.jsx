// src/components/UserProfile.js
import React from "react";
import { useSelector } from "react-redux";
import ProfilePictureUpdate from "./Supplier/products/ProfilePictureUpdate";
import LogoutButton from "./LogoutButton";

import SendOTP from "./otp/send-otp";



import VerifyEmailButton from "./VerifyEmailButton";



const UserProfile = () => {
  const user = useSelector((state) => state.user); // Access the user data from the Redux store

  return (
    <>
      <div className="mt-24">
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
        <div className="w-[20vw] mx-auto flex justify-end">
        <span>
              <i className="ri-edit-2-line cursor-pointer bg-gray-300 p-1 rounded-full text-blue-600"></i>
        </span>
        </div>
        {/* <h1>User Profile</h1> */}
        <div className="flex flex-col p-5 items-center justify-center gap-4 text-[#1b263b]">
          <p className="w-[20vw] flex justify-between items-center">
            <span className="font-semibold">
              Name:
              <span className="ms-10 font-normal">{user.name || "Guest"}</span>
            </span>
            <span>
              <i className="ri-edit-2-line cursor-pointer"></i>
            </span>
          </p>
          <p className="w-[20vw] flex justify-between items-center">
            <span className="font-semibold">
              Email:
              <span className="ms-11 font-normal">
                {user.email || "No Email Available"}
              </span>
            </span>
            <span>
              <i className="ri-edit-2-line cursor-pointer"></i>
            </span>
          </p>

          <p className="w-[20vw] flex justify-between items-center">
            <span className="font-semibold">
              Age:
              <span className="ms-14 font-normal">22</span>
            </span>
            <span></span>
          </p>

          <p className="w-[20vw] flex justify-between items-center">
            <span className="font-semibold">
              Gender:
              <span className="ms-8 font-normal">Male</span>
            </span>
            <span></span>
          </p>

          <p className="w-[20vw] flex justify-between items-center">
            <span className="font-semibold">
              Role:{" "}
              <span className="ms-12 font-normal">
                {user.role || "No Role Available"}
              </span>
            </span>
            <span>
              <i className="ri-edit-2-line cursor-pointer"></i>
            </span>
          </p>

          <p className="w-[20vw] flex justify-between items-center">
            <span className="font-semibold">
              Address:
              <span className="ms-7 font-normal">Fateh Garh Sialkot</span>
            </span>
            <span>
              <i className="ri-edit-2-line cursor-pointer"></i>
            </span>
          </p>

          <p className="w-[20vw] flex justify-between items-center">
            <span className="font-semibold">
              Join Date:
              <span className="ms-5 font-normal">Dec 12, 2024</span>
            </span>
            <span></span>
          </p>
        </div>
        {/* <p>ProfilePicture: {user.profilePicture || "No Picture Available"}</p> */}
        <LogoutButton />
        <VerifyEmailButton/>


{/* <VerifyEmail/> */}
      </div>






    </>
  );
};

export default UserProfile;

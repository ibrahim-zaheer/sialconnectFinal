import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateProfile } from "../../redux/reducers/userSlice";
import axios from "axios";


const getMaxDate = () => {
  const date = new Date();
  date.setFullYear(date.getFullYear() - 18);
  return date.toISOString().split("T")[0];
};
export default function ProfileUpdateForm() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const [formData, setFormData] = useState({
    city: user.city || "",
    cnic: user.cnic || "",
    phoneNumber: user.phoneNumber || "",
    businessName: user.businessName || "",
    businessAddress: user.businessAddress || "",
    postalCode: user.postalCode || "",
    bio: user.bio || "",
    dateOfBirth: user.dateOfBirth ? new Date(user.dateOfBirth).toISOString().split("T")[0] : "",
  });

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    // Validate form data
    const validationErrors = {};

    const today = new Date();
    const minDate = new Date();
    minDate.setFullYear(today.getFullYear() - 18);
  
    if (!formData.city) {
      validationErrors.city = 'City is required';
    }
  
    if (formData.cnic && !/^\d{5}-\d{7}-\d{1}$/.test(formData.cnic)) {
      validationErrors.cnic = 'CNIC must be in the format 12345-6789012-3';
    }
  
    if (formData.phoneNumber && !/^\+?\d{10,15}$/.test(formData.phoneNumber)) {
      validationErrors.phoneNumber = 'Phone number must be between 10 and 15 digits';
    }
  
    if (formData.postalCode && !/^\d{5}$/.test(formData.postalCode)) {
      validationErrors.postalCode = 'Postal code must be 5 digits';
    }
  
    if (formData.dateOfBirth) {
      const birthDate = new Date(formData.dateOfBirth);
      if (birthDate > minDate) {
        validationErrors.dateOfBirth = "You must be at least 18 years old";
      }
    }
    // If there are validation errors, stop submission
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
  
    // Clear previous errors
    setErrors({});
  
    // Start loading
    setIsLoading(true);
  
    try {
      // Make an API call using Axios
      const response = await axios.put('/api/auth//update-profile', formData, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`, // Include the user's token
        },
      });
  
      // Dispatch the updateProfile action with the updated form data
      dispatch(updateProfile(response.data.user));
  
      // Show success message
      setIsSuccess(true);
  
      // Clear success message after 3 seconds
      setTimeout(() => setIsSuccess(false), 3000);
    } catch (error) {
      console.error('Error updating profile:', error);
  
      // Handle API errors
      if (error.response) {
        // Server responded with an error (e.g., 400, 500)
        alert(error.response.data.message || 'Failed to update profile. Please try again.');
      } else if (error.request) {
        // No response received (e.g., network error)
        alert('Network error. Please check your connection and try again.');
      } else {
        // Something went wrong in the request setup
        alert('An error occurred. Please try again.');
      }
    } finally {
      // Stop loading
      setIsLoading(false);
    }
  };

  return (
    <div className="profile-update-form w-[60vw] bg-red-50 rounded-lg p-10 mx-auto flex flex-col items-center justify-center my-16">
      <h2 className="text-2xl font-bold my-4">Update Your Profile</h2>
      <form className="w-[60%]" onSubmit={handleSubmit}>
        {/* City */}
        <div className="form-group flex justify-evenly mt-3">
          <label htmlFor="city">City: </label>
          <input
          className="border px-2 py-1 rounded-lg"
            type="text"
            id="city"
            name="city"
            value={formData.city}
            onChange={handleChange}
            placeholder="Enter your city"
          />
          {errors.city && <span className="error">{errors.city}</span>}
        </div>

        {/* CNIC */}
        <div className="form-group flex justify-evenly mt-3">
          <label htmlFor="cnic">CNIC</label>
          <input
          className="border px-2 py-1 rounded-lg"
            type="text"
            id="cnic"
            name="cnic"
            value={formData.cnic}
            onChange={handleChange}
            placeholder="Enter your CNIC (e.g., 12345-6789012-3)"
          />
          {errors.cnic && <span className="error">{errors.cnic}</span>}
        </div>

        {/* Phone Number */}
        <div className="form-group flex justify-evenly mt-3">
          <label htmlFor="phoneNumber">Phone Number</label>
          <input
          className="border px-2 py-1 rounded-lg"
            type="text"
            id="phoneNumber"
            name="phoneNumber"
            value={formData.phoneNumber}
            onChange={handleChange}
            placeholder="Enter your phone number (e.g., +1234567890)"
          />
          {errors.phoneNumber && <span className="error">{errors.phoneNumber}</span>}
        </div>

        {/* Business Name */}
        <div className="form-group flex justify-evenly mt-3">
          <label htmlFor="businessName">Business Name</label>
          <input
          className="border px-2 py-1 rounded-lg"
            type="text"
            id="businessName"
            name="businessName"
            value={formData.businessName}
            onChange={handleChange}
            placeholder="Enter your business name"
          />
        </div>

        {/* Business Address */}
        <div className="form-group flex justify-evenly mt-3">
          <label htmlFor="businessAddress">Business Address</label>
          <input
          className="border px-2 py-1 rounded-lg"
            type="text"
            id="businessAddress"
            name="businessAddress"
            value={formData.businessAddress}
            onChange={handleChange}
            placeholder="Enter your business address"
          />
        </div>

        {/* Postal Code */}
        <div className="form-group flex justify-evenly mt-3">
          <label htmlFor="postalCode">Postal Code</label>
          <input
          className="border px-2 py-1 rounded-lg"
            type="text"
            id="postalCode"
            name="postalCode"
            value={formData.postalCode}
            onChange={handleChange}
            placeholder="Enter your postal code (e.g., 12345)"
          />
          {errors.postalCode && <span className="error">{errors.postalCode}</span>}
        </div>

        {/* Bio */}
        <div className="form-group flex justify-evenly mt-3">
          <label htmlFor="bio">Bio</label>
          <textarea
          className="border px-2 py-1 rounded-lg"
            id="bio"
            name="bio"
            value={formData.bio}
            onChange={handleChange}
            placeholder="Tell us about yourself"
            rows="4"
          />
        </div>

          {/* Date Of Birth */}
          <div className="form-group flex justify-evenly mt-3">
          <label htmlFor="dateOfBirth">Date of Birth</label>
          <input
          className="border px-2 py-1 rounded-lg"
            // type="date"
            type="date"
            id="dateOfBirth"
            name="dateOfBirth"
            value={formData.dateOfBirth}
            onChange={handleChange}
            max={getMaxDate()}
            min="1900-01-01" 
          />
          {errors.dateOfBirth && (
            <span className="error">{errors.dateOfBirth}</span>
          )}
        </div>

        <div className="w-full flex justify-center items-center mt-6">
          {/* Submit Button */}
        <button type="submit" className="submit-button p-3 border rounded-lg" disabled={isLoading}>
          {isLoading ? 'Updating...' : 'Update Profile'}
        </button>
        </div>
      </form>

      {/* Success Message */}
      {isSuccess && (
        <div className="success-message">
          Profile updated successfully!
        </div>
      )}
    </div>
  );
}

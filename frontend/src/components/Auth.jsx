


// import React, { useState } from "react";
// import axios from "axios";
// import OAuth from "./OAuth";
// import { useNavigate } from "react-router-dom";
// import { useDispatch } from "react-redux";
// import { setUser } from "../redux/reducers/userSlice";
// import ForgotPasswordFlow from "./ForgotPassword/ForgotPasswordFlow";
// const Auth = () => {
//   const [isRegister, setIsRegister] = useState(false); // Toggle between register and login forms
//   const [showForgotPassword, setShowForgotPassword] = useState(false); // Toggle for forgot password flow
//   const [formData, setFormData] = useState({
//     name: "",
//     email: "",
//     password: "",
//     role: "",
//   });
//   const [showPassword, setShowPassword] = useState(false);
//   const [message, setMessage] = useState(""); // Success or error message
//   const dispatch = useDispatch();
//   const navigate = useNavigate();

//   // Handle form input changes
//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   // Handle form submission
//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const url = isRegister ? "/api/auth/register" : "/api/auth/login";
//       const { data } = await axios.post(url, formData);

//       setMessage(
//         data.message ||
//           (isRegister ? "Registration successful!" : "Login successful!")
//       );

//       if (isRegister) {
//         // After successful registration, switch to login view
//         setIsRegister(false);
//         setMessage("Registration successful! Please login.");
//       } else {
//         // After login, store user and token data
//         const userData = {
//           id: data.id,
//           name: data.name,
//           email: data.email,
//           role: data.role,
//           profilePicture: data.profilePicture,
//           // Additional fields fetched on login
//           dateOfBirth: data.dateOfBirth,
//           phoneNumber: data.phoneNumber,
//           businessName: data.businessName,
//           businessAddress: data.businessAddress,
//           city: data.city,
//           cnic: data.cnic,
//           postalCode: data.postalCode,
//           bio: data.bio,
//         };
//         dispatch(setUser(userData));
//         localStorage.setItem("user", JSON.stringify(userData));
//         localStorage.setItem("token", data.token);
        
//         // Redirect based on role
//         if (data.role === "admin") {
//           navigate("/admin");
//         } else if (data.role === "supplier") {
//           navigate("/profile");
//         } else {
//           navigate("/home");
//         }
//       }
//     } catch (error) {
//       setMessage(error.response?.data?.message || "An error occurred");
//     }
//   };

//   // Handle back to login from forgot password
//   const handleBackToLogin = () => {
//     setShowForgotPassword(false);
//     setMessage("");
//   };

//   return (
//     <>
//       <div className="min-h-screen bg-gradient-to-br from-primary-50 to-neutral-50 flex items-center justify-center p-4">
//         <div className="w-full max-w-md bg-white rounded-xl shadow-lg p-8 border border-neutral-200">
//           {showForgotPassword ? (
//             <>
//               <div className="text-center mb-8">
//                 <h1 className="text-primary-700 font-bold text-3xl mb-2">
//                   SialConnect
//                 </h1>
//                 <p className="text-neutral-500 text-sm mb-4">
//                   Your Export Journey Starts Here
//                 </p>
//                 <h2 className="text-xl font-semibold text-neutral-800 mt-4 mb-0">
//                   Reset Your Password
//                 </h2>
//               </div>
              
//               <ForgotPasswordFlow />
              
//               <button
//                 onClick={handleBackToLogin}
//                 className="w-full mt-4 py-2 px-4 text-primary-700 hover:text-primary-800 font-medium rounded-lg transition-colors duration-300"
//               >
//                 ← Back to Login
//               </button>
//             </>
//           ) : (
//             <>
//               <div className="text-center mb-8">
//                 <h1 className="text-primary-700 font-bold text-3xl mb-2">
//                   SialConnect
//                 </h1>
//                 <p className="text-neutral-500 text-sm mb-4">
//                   Your Export Journey Starts Here
//                 </p>
//                 <h2 className="text-xl font-semibold text-neutral-800 mt-4 mb-0">
//                   {isRegister ? "Create Your Account" : "Welcome Back"}
//                 </h2>
//               </div>

//               {/* Auth Form */}
//               <form className="space-y-5" onSubmit={handleSubmit}>
//                 {isRegister && (
//                   <>
//                     {/* Name Input (only for Register) */}
//                     <div className="space-y-2">
//                       <label className="block text-neutral-700 text-sm font-medium">
//                         Full Name <span className="text-error">*</span>
//                       </label>
//                       <input
//                         placeholder="Enter your name"
//                         className="w-full px-4 py-3 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 bg-neutral-50"
//                         type="text"
//                         name="name"
//                         onChange={handleChange}
//                         required
//                       />
//                     </div>

//                     {/* Role Select (only for Register) */}
//                     <div className="space-y-2">
//                       <label className="block text-neutral-700 text-sm font-medium">
//                         Account Type <span className="text-error">*</span>
//                       </label>
//                       <select
//                         className="w-full px-4 py-3 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 bg-neutral-50 text-neutral-800"
//                         name="role"
//                         value={formData.role}
//                         onChange={handleChange}
//                         required
//                       >
//                         <option value="" className="text-neutral-400" disabled>
//                           Select your account type
//                         </option>
//                         <option value="exporter">
//                           Exporter (Looking for Suppliers)
//                         </option>
//                         <option value="supplier">
//                           Supplier (Offering Products)
//                         </option>
//                       </select>
//                     </div>
//                   </>
//                 )}

//                 {/* Email Input */}
//                 <div className="space-y-2">
//                   <label className="block text-neutral-700 text-sm font-medium">
//                     Email Address <span className="text-error">*</span>
//                   </label>
//                   <input
//                     placeholder="your@email.com"
//                     className="w-full px-4 py-3 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 bg-neutral-50"
//                     type="email"
//                     name="email"
//                     onChange={handleChange}
//                     required
//                   />
//                 </div>

//                 {/* Password Input */}
//                 <div className="space-y-2">
//                   <label className="block text-neutral-700 text-sm font-medium">
//                     Password <span className="text-error">*</span>
//                   </label>
//                   <div className="relative">
//                     <input
//                       placeholder="Enter Password"
//                       className="w-full px-4 py-3 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 bg-neutral-50"
//                       type={showPassword ? "text" : "password"}
//                       name="password"
//                       onChange={handleChange}
//                       required
//                     />
//                     <button
//                       type="button"
//                       onClick={() => setShowPassword(!showPassword)}
//                       className="absolute inset-y-0 right-0 flex items-center px-3 text-neutral-600 hover:text-primary-700"
//                     >
//                       {showPassword ? (
//                         <svg
//                           xmlns="http://www.w3.org/2000/svg"
//                           className="h-5 w-5"
//                           fill="none"
//                           viewBox="0 0 24 24"
//                           stroke="currentColor"
//                         >
//                           <path
//                             strokeLinecap="round"
//                             strokeLinejoin="round"
//                             strokeWidth={2}
//                             d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21"
//                           />
//                         </svg>
//                       ) : (
//                         <svg
//                           xmlns="http://www.w3.org/2000/svg"
//                           className="h-5 w-5"
//                           fill="none"
//                           viewBox="0 0 24 24"
//                           stroke="currentColor"
//                         >
//                           <path
//                             strokeLinecap="round"
//                             strokeLinejoin="round"
//                             strokeWidth={2}
//                             d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
//                           />
//                           <path
//                             strokeLinecap="round"
//                             strokeLinejoin="round"
//                             strokeWidth={2}
//                             d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
//                           />
//                         </svg>
//                       )}
//                     </button>
//                   </div>
//                 </div>

//                 {/* Forgot Password Link (only for Login) */}
//                 {!isRegister && (
//                   <div className="text-right">
//                     <button
//                       type="button"
//                       onClick={() => setShowForgotPassword(true)}
//                       className="text-sm text-primary-700 hover:text-primary-800 font-medium"
//                     >
//                       Forgot Password?
//                     </button>
//                   </div>
//                 )}

//                 {/* Submit Button */}
//                 <button
//                   type="submit"
//                   className="w-full bg-primary-700 hover:bg-primary-800 text-white py-3 px-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 transition-colors duration-300 mt-6 font-medium shadow-md"
//                 >
//                   {isRegister ? "Create Account" : "Sign In"}
//                 </button>
//               </form>

//               {/* Divider */}
//               <div className="relative flex items-center my-6">
//                 <div className="flex-grow border-t border-neutral-300"></div>
//                 <span className="flex-shrink mx-4 text-neutral-500 text-sm">
//                   or
//                 </span>
//                 <div className="flex-grow border-t border-neutral-300"></div>
//               </div>

//               {/* Switch Auth Mode */}
//               <button
//                 className="w-full py-3 px-4 border border-primary-600 text-primary-700 hover:text-primary-800 hover:bg-primary-50 font-medium rounded-lg transition-colors duration-300 mb-4"
//                 onClick={() => setIsRegister(!isRegister)}
//               >
//                 {isRegister
//                   ? "Already have an account? Sign In"
//                   : "Need an account? Register"}
//               </button>

//               {/* OAuth Login (only for Login view) */}
//               {!isRegister && <OAuth />}

//               {/* Status Message */}
//               {message && (
//                 <div
//                   className={`mt-6 p-4 rounded-lg text-center text-sm font-medium ${
//                     message.toLowerCase().includes("success")
//                       ? "bg-secondary-100 text-secondary-800 border border-secondary-300"
//                       : "bg-error/10 text-error border border-error/20"
//                   }`}
//                 >
//                   {message}
//                 </div>
//               )}
//             </>
//           )}
//         </div>
//       </div>
//     </>
//   );
// };

// export default Auth;


// import React, { useState } from "react";
// import axios from "axios";
// import OAuth from "./OAuth";
// import { useNavigate } from "react-router-dom";
// import { useDispatch } from "react-redux";
// import { setUser } from "../redux/reducers/userSlice";
// import ForgotPasswordFlow from "./ForgotPassword/ForgotPasswordFlow";
// const Auth = () => {
//   const [isRegister, setIsRegister] = useState(false); // Toggle between register and login forms
//   const [showForgotPassword, setShowForgotPassword] = useState(false); // Toggle for forgot password flow
//   const [formData, setFormData] = useState({
//     name: "",
//     email: "",
//     password: "",
//     confirmPassword: "",
//     role: "",
//   });
//   const [showPassword, setShowPassword] = useState(false);
//   const [showConfirmPassword, setShowConfirmPassword] = useState(false);
//   const [message, setMessage] = useState(""); // Success or error message
//   const dispatch = useDispatch();
//   const navigate = useNavigate();

//   // Handle form input changes
//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   // Handle form submission
//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       // Check if passwords match during registration
//       if (isRegister && formData.password !== formData.confirmPassword) {
//         setMessage("Passwords do not match");
//         return;
//       }

//       const url = isRegister ? "/api/auth/register" : "/api/auth/login";
//       // Don't send confirmPassword to the backend
//       const { confirmPassword, ...dataToSend } = formData;
//       const { data } = await axios.post(url, dataToSend);

//       setMessage(
//         data.message ||
//           (isRegister ? "Registration successful!" : "Login successful!")
//       );

//       if (isRegister) {
//         // After successful registration, switch to login view
//         setIsRegister(false);
//         setMessage("Registration successful! Please login.");
//       } else {
//         // After login, store user and token data
//         const userData = {
//           id: data.id,
//           name: data.name,
//           email: data.email,
//           role: data.role,
//           profilePicture: data.profilePicture,
//           // Additional fields fetched on login
//           dateOfBirth: data.dateOfBirth,
//           phoneNumber: data.phoneNumber,
//           businessName: data.businessName,
//           businessAddress: data.businessAddress,
//           city: data.city,
//           cnic: data.cnic,
//           postalCode: data.postalCode,
//           bio: data.bio,
//         };
//         dispatch(setUser(userData));
//         localStorage.setItem("user", JSON.stringify(userData));
//         localStorage.setItem("token", data.token);
        
//         // Redirect based on role
//         if (data.role === "admin") {
//           navigate("/admin");
//         } else if (data.role === "supplier") {
//           navigate("/profile");
//         } else {
//           navigate("/home");
//         }
//       }
//     } catch (error) {
//       setMessage(error.response?.data?.message || "An error occurred");
//     }
//   };

//   // Handle back to login from forgot password
//   const handleBackToLogin = () => {
//     setShowForgotPassword(false);
//     setMessage("");
//   };

//   return (
//     <>
//       <div className="min-h-screen bg-gradient-to-br from-primary-50 to-neutral-50 flex items-center justify-center p-4">
//         <div className="w-full max-w-md bg-white rounded-xl shadow-lg p-8 border border-neutral-200">
//           {showForgotPassword ? (
//             <>
//               <div className="text-center mb-8">
//                 <h1 className="text-primary-700 font-bold text-3xl mb-2">
//                   SialConnect
//                 </h1>
//                 <p className="text-neutral-500 text-sm mb-4">
//                   Your Export Journey Starts Here
//                 </p>
//                 <h2 className="text-xl font-semibold text-neutral-800 mt-4 mb-0">
//                   Reset Your Password
//                 </h2>
//               </div>
              
//               <ForgotPasswordFlow />
              
//               <button
//                 onClick={handleBackToLogin}
//                 className="w-full mt-4 py-2 px-4 text-primary-700 hover:text-primary-800 font-medium rounded-lg transition-colors duration-300"
//               >
//                 ← Back to Login
//               </button>
//             </>
//           ) : (
//             <>
//               <div className="text-center mb-8">
//                 <h1 className="text-primary-700 font-bold text-3xl mb-2">
//                   SialConnect
//                 </h1>
//                 <p className="text-neutral-500 text-sm mb-4">
//                   Your Export Journey Starts Here
//                 </p>
//                 <h2 className="text-xl font-semibold text-neutral-800 mt-4 mb-0">
//                   {isRegister ? "Create Your Account" : "Welcome Back"}
//                 </h2>
//               </div>

//               {/* Auth Form */}
//               <form className="space-y-5" onSubmit={handleSubmit}>
//                 {isRegister && (
//                   <>
//                     {/* Name Input (only for Register) */}
//                     <div className="space-y-2">
//                       <label className="block text-neutral-700 text-sm font-medium">
//                         Full Name <span className="text-error">*</span>
//                       </label>
//                       <input
//                         placeholder="Enter your name"
//                         className="w-full px-4 py-3 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 bg-neutral-50"
//                         type="text"
//                         name="name"
//                         onChange={handleChange}
//                         required
//                       />
//                     </div>

//                     {/* Role Select (only for Register) */}
//                     <div className="space-y-2">
//                       <label className="block text-neutral-700 text-sm font-medium">
//                         Account Type <span className="text-error">*</span>
//                       </label>
//                       <select
//                         className="w-full px-4 py-3 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 bg-neutral-50 text-neutral-800"
//                         name="role"
//                         value={formData.role}
//                         onChange={handleChange}
//                         required
//                       >
//                         <option value="" className="text-neutral-400" disabled>
//                           Select your account type
//                         </option>
//                         <option value="exporter">
//                           Exporter (Looking for Suppliers)
//                         </option>
//                         <option value="supplier">
//                           Supplier (Offering Products)
//                         </option>
//                       </select>
//                     </div>
//                   </>
//                 )}

//                 {/* Email Input */}
//                 <div className="space-y-2">
//                   <label className="block text-neutral-700 text-sm font-medium">
//                     Email Address <span className="text-error">*</span>
//                   </label>
//                   <input
//                     placeholder="your@email.com"
//                     className="w-full px-4 py-3 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 bg-neutral-50"
//                     type="email"
//                     name="email"
//                     onChange={handleChange}
//                     required
//                   />
//                 </div>

//                 {/* Password Input */}
//                 <div className="space-y-2">
//                   <label className="block text-neutral-700 text-sm font-medium">
//                     Password <span className="text-error">*</span>
//                   </label>
//                   <div className="relative">
//                     <input
//                       placeholder="Enter Password"
//                       className="w-full px-4 py-3 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 bg-neutral-50"
//                       type={showPassword ? "text" : "password"}
//                       name="password"
//                       onChange={handleChange}
//                       required
//                     />
//                     <button
//                       type="button"
//                       onClick={() => setShowPassword(!showPassword)}
//                       className="absolute inset-y-0 right-0 flex items-center px-3 text-neutral-600 hover:text-primary-700"
//                     >
//                       {showPassword ? (
//                         <svg
//                           xmlns="http://www.w3.org/2000/svg"
//                           className="h-5 w-5"
//                           fill="none"
//                           viewBox="0 0 24 24"
//                           stroke="currentColor"
//                         >
//                           <path
//                             strokeLinecap="round"
//                             strokeLinejoin="round"
//                             strokeWidth={2}
//                             d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21"
//                           />
//                         </svg>
//                       ) : (
//                         <svg
//                           xmlns="http://www.w3.org/2000/svg"
//                           className="h-5 w-5"
//                           fill="none"
//                           viewBox="0 0 24 24"
//                           stroke="currentColor"
//                         >
//                           <path
//                             strokeLinecap="round"
//                             strokeLinejoin="round"
//                             strokeWidth={2}
//                             d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
//                           />
//                           <path
//                             strokeLinecap="round"
//                             strokeLinejoin="round"
//                             strokeWidth={2}
//                             d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
//                           />
//                         </svg>
//                       )}
//                     </button>
//                   </div>
//                 </div>

//                 {/* Confirm Password Input (only for Register) */}
//                 {isRegister && (
//                   <div className="space-y-2">
//                     <label className="block text-neutral-700 text-sm font-medium">
//                       Confirm Password <span className="text-error">*</span>
//                     </label>
//                     <div className="relative">
//                       <input
//                         placeholder="Confirm Password"
//                         className="w-full px-4 py-3 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 bg-neutral-50"
//                         type={showConfirmPassword ? "text" : "password"}
//                         name="confirmPassword"
//                         onChange={handleChange}
//                         required
//                       />
//                       <button
//                         type="button"
//                         onClick={() => setShowConfirmPassword(!showConfirmPassword)}
//                         className="absolute inset-y-0 right-0 flex items-center px-3 text-neutral-600 hover:text-primary-700"
//                       >
//                         {showConfirmPassword ? (
//                           <svg
//                             xmlns="http://www.w3.org/2000/svg"
//                             className="h-5 w-5"
//                             fill="none"
//                             viewBox="0 0 24 24"
//                             stroke="currentColor"
//                           >
//                             <path
//                               strokeLinecap="round"
//                               strokeLinejoin="round"
//                               strokeWidth={2}
//                               d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21"
//                             />
//                           </svg>
//                         ) : (
//                           <svg
//                             xmlns="http://www.w3.org/2000/svg"
//                             className="h-5 w-5"
//                             fill="none"
//                             viewBox="0 0 24 24"
//                             stroke="currentColor"
//                           >
//                             <path
//                               strokeLinecap="round"
//                               strokeLinejoin="round"
//                               strokeWidth={2}
//                               d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
//                             />
//                             <path
//                               strokeLinecap="round"
//                               strokeLinejoin="round"
//                               strokeWidth={2}
//                               d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
//                             />
//                           </svg>
//                         )}
//                       </button>
//                     </div>
//                   </div>
//                 )}

//                 {/* Forgot Password Link (only for Login) */}
//                 {!isRegister && (
//                   <div className="text-right">
//                     <button
//                       type="button"
//                       onClick={() => setShowForgotPassword(true)}
//                       className="text-sm text-primary-700 hover:text-primary-800 font-medium"
//                     >
//                       Forgot Password?
//                     </button>
//                   </div>
//                 )}

//                 {/* Submit Button */}
//                 <button
//                   type="submit"
//                   className="w-full bg-primary-700 hover:bg-primary-800 text-white py-3 px-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 transition-colors duration-300 mt-6 font-medium shadow-md"
//                 >
//                   {isRegister ? "Create Account" : "Sign In"}
//                 </button>
//               </form>

//               {/* Divider */}
//               <div className="relative flex items-center my-6">
//                 <div className="flex-grow border-t border-neutral-300"></div>
//                 <span className="flex-shrink mx-4 text-neutral-500 text-sm">
//                   or
//                 </span>
//                 <div className="flex-grow border-t border-neutral-300"></div>
//               </div>

//               {/* Switch Auth Mode */}
//               <button
//                 className="w-full py-3 px-4 border border-primary-600 text-primary-700 hover:text-primary-800 hover:bg-primary-50 font-medium rounded-lg transition-colors duration-300 mb-4"
//                 onClick={() => setIsRegister(!isRegister)}
//               >
//                 {isRegister
//                   ? "Already have an account? Sign In"
//                   : "Need an account? Register"}
//               </button>

//               {/* OAuth Login (only for Login view) */}
//               {!isRegister && <OAuth />}

//               {/* Status Message */}
//               {message && (
//                 <div
//                   className={`mt-6 p-4 rounded-lg text-center text-sm font-medium ${
//                     message.toLowerCase().includes("success")
//                       ? "bg-secondary-100 text-secondary-800 border border-secondary-300"
//                       : "bg-error/10 text-error border border-error/20"
//                   }`}
//                 >
//                   {message}
//                 </div>
//               )}
//             </>
//           )}
//         </div>
//       </div>
//     </>
//   );
// };

// export default Auth;

import React, { useState } from "react";
import axios from "axios";
import OAuth from "./OAuth";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setUser } from "../redux/reducers/userSlice";
import ForgotPasswordFlow from "./ForgotPassword/ForgotPasswordFlow";

const Auth = () => {
  const [isRegister, setIsRegister] = useState(false);
  const [showForgotPassword, setShowForgotPassword] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    role: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [message, setMessage] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [nameError, setNameError] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Validate password strength
  const validatePassword = (password) => {
    // Minimum 6 characters, at least one letter, one number and one special character
    const regex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{6,}$/;
    if (!regex.test(password)) {
      setPasswordError(
        "Password must be at least 6 characters with a combination of letters, numbers, and special characters"
      );
      return false;
    }
    setPasswordError("");
    return true;
  };

    // Validate name input (only letters and spaces)
  const validateName = (name) => {
    const regex = /^[a-zA-Z\s]*$/;
    if (!regex.test(name)) {
      setNameError("Name can only contain letters and spaces");
      return false;
    }
    if (name.trim().split(/\s+/).length < 2) {
      setNameError("Please enter both first and last name");
      return false;
    }
    setNameError("");
    return true;
  };
  // Handle form input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    
    // Validate password in real-time
    // if (name === "password") {
    //   validatePassword(value);
    // }
     if (isRegister && name === "password") {
    validatePassword(value);
  }

    if (name === "name") {
      validateName(value);
    }
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Validate password during registration
      if (isRegister) {
         if (!validateName(formData.name)) {
          return;
        }
        if (!validatePassword(formData.password)) {
          return;
        }
        if (formData.password !== formData.confirmPassword) {
          setMessage("Passwords do not match");
          return;
        }
      }

      const url = isRegister ? "/api/auth/register" : "/api/auth/login";
      const { confirmPassword, ...dataToSend } = formData;
      const { data } = await axios.post(url, dataToSend);

      setMessage(
        data.message ||
          (isRegister ? "Registration successful!" : "Login successful!")
      );

      if (isRegister) {
        setIsRegister(false);
        setMessage("Registration successful! Please login.");
      } else {
        const userData = {
          id: data.id,
          name: data.name,
          email: data.email,
          role: data.role,
          profilePicture: data.profilePicture,
          dateOfBirth: data.dateOfBirth,
          phoneNumber: data.phoneNumber,
          businessName: data.businessName,
          businessAddress: data.businessAddress,
          city: data.city,
          cnic: data.cnic,
          postalCode: data.postalCode,
          bio: data.bio,
            subscription: data.subscription || { plan: 'free', expiryDate: null, paymentProviderId: null }
        };
        dispatch(setUser(userData));
        localStorage.setItem("user", JSON.stringify(userData));
        localStorage.setItem("token", data.token);
        
        if (data.role === "admin") {
          navigate("/admin");
        } else if (data.role === "supplier") {
          navigate("/profile");
        } else {
          navigate("/home");
        }
      }
    } catch (error) {
      setMessage(error.response?.data?.message || "An error occurred");
    }
  };

  const handleBackToLogin = () => {
    setShowForgotPassword(false);
    setMessage("");
  };

  return (
    <>
      <div className="min-h-screen bg-gradient-to-br from-primary-50 to-neutral-50 flex items-center justify-center p-4">
        <div className="w-full max-w-md bg-white rounded-xl shadow-lg p-8 border border-neutral-200">
          {showForgotPassword ? (
            <>
              <div className="text-center mb-8">
                <h1 className="text-primary-700 font-bold text-3xl mb-2">
                  SialConnect
                </h1>
                <p className="text-neutral-500 text-sm mb-4">
                  Your Export Journey Starts Here
                </p>
                <h2 className="text-xl font-semibold text-neutral-800 mt-4 mb-0">
                  Reset Your Password
                </h2>
              </div>
              
              <ForgotPasswordFlow />
              
              <button
                onClick={handleBackToLogin}
                className="w-full mt-4 py-2 px-4 text-primary-700 hover:text-primary-800 font-medium rounded-lg transition-colors duration-300"
              >
                ← Back to Login
              </button>
            </>
          ) : (
            <>
              <div className="text-center mb-8">
                <h1 className="text-primary-700 font-bold text-3xl mb-2">
                  SialConnect
                </h1>
                <p className="text-neutral-500 text-sm mb-4">
                  Your Export Journey Starts Here
                </p>
                <h2 className="text-xl font-semibold text-neutral-800 mt-4 mb-0">
                  {isRegister ? "Create Your Account" : "Welcome Back"}
                </h2>
              </div>

              <form className="space-y-5" onSubmit={handleSubmit}>
                {isRegister && (
                  <>
                    {/* Name Input (only for Register) */}
                    <div className="space-y-2">
                      <label className="block text-neutral-700 text-sm font-medium">
                        Full Name <span className="text-error">*</span>
                      </label>
                      <input
                        placeholder="Enter your name"
                        className="w-full px-4 py-3 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 bg-neutral-50"
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                         pattern="[a-zA-Z\s]+"
                        title="Please enter a valid name (letters and spaces only)"
                      />
                         {nameError && (
                        <p className="text-error text-xs mt-1">{nameError}</p>
                      )}
                    </div>

                    {/* Role Select (only for Register) */}
                    <div className="space-y-2">
                      <label className="block text-neutral-700 text-sm font-medium">
                        Account Type <span className="text-error">*</span>
                      </label>
                      <select
                        className="w-full px-4 py-3 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 bg-neutral-50 text-neutral-800"
                        name="role"
                        value={formData.role}
                        onChange={handleChange}
                        required
                      >
                        <option value="" className="text-neutral-400" disabled>
                          Select your account type
                        </option>
                        <option value="exporter">
                          Exporter (Looking for Suppliers)
                        </option>
                        <option value="supplier">
                          Supplier (Offering Products)
                        </option>
                      </select>
                    </div>
                  </>
                )}

                {/* Email Input */}
                <div className="space-y-2">
                  <label className="block text-neutral-700 text-sm font-medium">
                    Email Address <span className="text-error">*</span>
                  </label>
                  <input
                    placeholder="your@email.com"
                    className="w-full px-4 py-3 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 bg-neutral-50"
                    type="email"
                    name="email"
                    onChange={handleChange}
                    required
                  />
                </div>

                {/* Password Input */}
                <div className="space-y-2">
                  <label className="block text-neutral-700 text-sm font-medium">
                    Password <span className="text-error">*</span>
                  </label>
                  <div className="relative">
                  {/* <input */}
                      {/* placeholder="At least 6 characters with letters, numbers, and special chars" */}
                      {/* className={`w-full px-4 py-3 border ${ */}
                        {/* passwordError ? "border-error" : "border-neutral-300" */}
                      {/* } rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 bg-neutral-50`} */}
                      {/* type={showPassword ? "text" : "password"} */}
                      {/* name="password" */}
                      {/* value={formData.password} */}
                      {/* onChange={handleChange} */}
                      {/* required */}
                      {/* pattern="^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{6,}$" */}
                      {/* title="Password must be at least 6 characters with a combination of letters, numbers, and special characters" */}
                    {/* /> */}
                    
<input
  placeholder={isRegister ? "At least 6 characters with letters, numbers, and special chars" : "Enter your password"}
  className={`w-full px-4 py-3 border ${
    passwordError && isRegister ? "border-error" : "border-neutral-300"
  } rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 bg-neutral-50`}
  type={showPassword ? "text" : "password"}
  name="password"
  value={formData.password}
  onChange={handleChange}
  required
  pattern={isRegister ? "^(?=.*[A-Za-z])(?=.*\\d)(?=.*[@$!%*#?&])[A-Za-z\\d@$!%*#?&]{6,}$" : undefined}
  title={isRegister ? "Password must be at least 6 characters with a combination of letters, numbers, and special characters" : undefined}
/>
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute inset-y-0 right-0 flex items-center px-3 text-neutral-600 hover:text-primary-700"
                    >
                      {showPassword ? (
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-5 w-5"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21"
                          />
                        </svg>
                      ) : (
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-5 w-5"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                          />
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                          />
                        </svg>
                      )}
                    </button>
                  </div>
                  {passwordError && (
                    <p className="text-error text-xs mt-1">{passwordError}</p>
                  )}
                  {isRegister && (
                    <p className="text-neutral-500 text-xs mt-1">
                      Password must be at least 6 characters and include:
                      <ul className="list-disc pl-5">
                        <li>At least one letter</li>
                        <li>At least one number</li>
                        <li>At least one special character (@$!%*#?&)</li>
                      </ul>
                    </p>
                  )}
                </div>

                {/* Confirm Password Input (only for Register) */}
                {isRegister && (
                  <div className="space-y-2">
                    <label className="block text-neutral-700 text-sm font-medium">
                      Confirm Password <span className="text-error">*</span>
                    </label>
                    <div className="relative">
                      <input
                        placeholder="Confirm Password"
                        className="w-full px-4 py-3 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 bg-neutral-50"
                        type={showConfirmPassword ? "text" : "password"}
                        name="confirmPassword"
                        onChange={handleChange}
                        required
                      />
                      <button
                        type="button"
                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                        className="absolute inset-y-0 right-0 flex items-center px-3 text-neutral-600 hover:text-primary-700"
                      >
                        {showConfirmPassword ? (
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-5 w-5"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21"
                            />
                          </svg>
                        ) : (
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-5 w-5"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                            />
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                            />
                          </svg>
                        )}
                      </button>
                    </div>
                  </div>
                )}

                {/* Forgot Password Link (only for Login) */}
                {!isRegister && (
                  <div className="text-right">
                    <button
                      type="button"
                      onClick={() => setShowForgotPassword(true)}
                      className="text-sm text-primary-700 hover:text-primary-800 font-medium"
                    >
                      Forgot Password?
                    </button>
                  </div>
                )}

                {/* Submit Button */}
                <button
                  type="submit"
                  className="w-full bg-primary-700 hover:bg-primary-800 text-white py-3 px-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 transition-colors duration-300 mt-6 font-medium shadow-md"
                >
                  {isRegister ? "Create Account" : "Sign In"}
                </button>
              </form>

              {/* Divider */}
              <div className="relative flex items-center my-6">
                <div className="flex-grow border-t border-neutral-300"></div>
                <span className="flex-shrink mx-4 text-neutral-500 text-sm">
                  or
                </span>
                <div className="flex-grow border-t border-neutral-300"></div>
              </div>

              {/* Switch Auth Mode */}
              <button
                className="w-full py-3 px-4 border border-primary-600 text-primary-700 hover:text-primary-800 hover:bg-primary-50 font-medium rounded-lg transition-colors duration-300 mb-4"
                onClick={() => setIsRegister(!isRegister)}
              >
                {isRegister
                  ? "Already have an account? Sign In"
                  : "Need an account? Register"}
              </button>

              {/* OAuth Login (only for Login view) */}
              {!isRegister && <OAuth />}

              {/* Status Message */}
              {message && (
                <div
                  className={`mt-6 p-4 rounded-lg text-center text-sm font-medium ${
                    message.toLowerCase().includes("success")
                      ? "bg-secondary-100 text-secondary-800 border border-secondary-300"
                      : "bg-error/10 text-error border border-error/20"
                  }`}
                >
                  {message}
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default Auth;
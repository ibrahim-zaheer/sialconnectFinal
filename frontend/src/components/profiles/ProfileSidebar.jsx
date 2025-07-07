

// import React from "react";
// import { motion } from "framer-motion";
// import { NavLink } from "react-router-dom";
// import { useSelector } from "react-redux";

// const ProfileSidebar = ({ activeTab, setActiveTab, user }) => {
//   const currentUser = useSelector((state) => state.user);
//   const userRole = currentUser?.role || user?.role;

//   // Base menu items
//   const baseMenuItems = [
//     { id: "profile", label: "Profile", icon: "user" },
//     { id: "offers", label: "Offers", icon: "briefcase" },
//     { id: "reviews", label: "Reviews", icon: "star" },
//   ];

//   // Additional menu items for non-exporters
//   const additionalMenuItems = userRole !== "exporter" ? [
//     { id: "payments", label: "Payments", icon: "credit-card" },
//     // { id: "reviews", label: "Reviews", icon: "star" },
//   ] : [];

//   // Combine menu items based on user role
//   const menuItems = [...baseMenuItems, ...additionalMenuItems];

//   return (
//     <motion.div
//       initial={{ x: -20, opacity: 0 }}
//       animate={{ x: 0, opacity: 1 }}
//       transition={{ duration: 0.3 }}
//       className="h-full"
//     >
//       <div className="h-full flex flex-col bg-surface rounded-xl shadow-sm overflow-hidden">
//         {/* User Profile Section */}
//         <div className="p-6 border-b border-neutral-200">
//           <div className="flex items-center space-x-4">
//             <div className="relative">
//               <img
//                 src={user.profilePicture || "https://cdn-icons-png.flaticon.com/512/3135/3135715.png"}
//                 alt={`${user.name}'s profile`}
//                 className="w-14 h-14 rounded-full object-cover border-4 border-primary-100 shadow-md"
//               />
//             </div>
//             <div>
//               <h3 className="font-semibold text-text-primary">{user.name || "Guest"}</h3>
//               <p className="text-sm text-primary-600">{user.role || "No Role"}</p>
//             </div>
//           </div>
//         </div>
        
//         {/* Navigation Menu */}
//         <nav className="flex-1 p-4 overflow-y-auto">
//           <ul className="space-y-2">
//             {menuItems.map((item) => (
//               <li key={item.id}>
//                 <button
//                   onClick={() => setActiveTab(item.id)}
//                   className={`w-full flex items-center px-4 py-3 text-base font-medium rounded-lg transition-all ${
//                     activeTab === item.id
//                       ? "bg-primary-50 text-primary-700 shadow-inner"
//                       : "text-neutral-600 hover:bg-neutral-50 hover:text-neutral-900"
//                   }`}
//                 >
//                   <span className={`mr-3 ${
//                     activeTab === item.id ? "text-primary-500" : "text-neutral-400"
//                   }`}>
//                     <IconComponent icon={item.icon} />
//                   </span>
//                   {item.label}
//                 </button>
//               </li>
//             ))}
//           </ul>
//         </nav>

//         {/* Footer (optional) */}
//         <div className="p-4 border-t border-neutral-200">
//           <p className="text-xs text-neutral-500">© {new Date().getFullYear()} Your App</p>
//         </div>
//       </div>
//     </motion.div>
//   );
// };

// // Icon component remains the same
// const IconComponent = ({ icon }) => {
//   const iconClasses = "w-5 h-5";
  
//   switch (icon) {
//     case "user":
//       return (
//         <svg className={iconClasses} fill="none" stroke="currentColor" viewBox="0 0 24 24">
//           <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
//         </svg>
//       );
//     case "briefcase":
//       return (
//         <svg className={iconClasses} fill="none" stroke="currentColor" viewBox="0 0 24 24">
//           <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
//         </svg>
//       );
//     case "credit-card":
//       return (
//         <svg className={iconClasses} fill="none" stroke="currentColor" viewBox="0 0 24 24">
//           <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
//         </svg>
//       );
//     case "star":
//       return (
//         <svg className={iconClasses} fill="none" stroke="currentColor" viewBox="0 0 24 24">
//           <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
//         </svg>
//       );
//     default:
//       return null;
//   }
// };

// export default ProfileSidebar;

import React from "react";
import { motion } from "framer-motion";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import { useTranslation } from "react-i18next"; // Import the hook for translation
import LogoutButton from "../LogoutButton";


const ProfileSidebar = ({ activeTab, setActiveTab, user }) => {
  const { t } = useTranslation();  // Initialize the useTranslation hook
  const currentUser = useSelector((state) => state.user);
  const userRole = currentUser?.role || user?.role;

  // Base menu items
  const baseMenuItems = [
    { id: "profile", label: t("profile:profile_sidebar.profile"), icon: "user" },
    { id: "offers", label: t("profile:profile_sidebar.offers"), icon: "briefcase" },
    { id: "reviews", label: t("profile:profile_sidebar.reviews"), icon: "star" },
  ];

  // Additional menu items for non-exporters
  const additionalMenuItems = userRole !== "exporter" ? [
    { id: "payments", label: t("profile:profile_sidebar.payments"), icon: "credit-card" },
  ] : [];

  // Combine menu items based on user role
  const menuItems = [...baseMenuItems, ...additionalMenuItems];

  return (
    <motion.div
      initial={{ x: -20, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ duration: 0.3 }}
      className="h-full"
    >
      <div className="h-full flex flex-col bg-surface rounded-xl shadow-sm overflow-hidden">
        {/* User Profile Section */}
        <div className="p-6 border-b border-neutral-200">
          <div className="flex items-center space-x-4">
            <div className="relative">
              <img
                src={user.profilePicture || "https://cdn-icons-png.flaticon.com/512/3135/3135715.png"}
                alt={`${user.name}'s profile`}
                className="w-14 h-14 rounded-full object-cover border-4 border-primary-100 shadow-md"
              />
              <LogoutButton />
              {/* <LogoutButton/> */}
              {!localStorage.getItem("token") && <LogoutButton />}
            </div>
            <div>
              <h3 className="font-semibold text-text-primary">{user.name || t("profile_sidebar.guest")}</h3>
              <p className="text-sm text-primary-600">{user.role || t("profile_sidebar.no_role")}</p>
            </div>
          </div>
        </div>
        
        {/* Navigation Menu */}
        <nav className="flex-1 p-4 overflow-y-auto">
          <ul className="space-y-2">
            {menuItems.map((item) => (
              <li key={item.id}>
                <button
                  onClick={() => setActiveTab(item.id)}
                  className={`w-full flex items-center px-4 py-3 text-base font-medium rounded-lg transition-all ${
                    activeTab === item.id
                      ? "bg-primary-50 text-primary-700 shadow-inner"
                      : "text-neutral-600 hover:bg-neutral-50 hover:text-neutral-900"
                  }`}
                >
                  <span className={`mr-3 ${
                    activeTab === item.id ? "text-primary-500" : "text-neutral-400"
                  }`}>
                    <IconComponent icon={item.icon} />
                  </span>
                  {item.label}
                </button>
              </li>
            ))}
          </ul>
        </nav>

        {/* Footer (optional) */}
        <div className="p-4 border-t border-neutral-200">
          {/* <p className="text-xs text-neutral-500">{t("profile_sidebar.footer_text")} {new Date().getFullYear()}</p> */}
        </div>
      </div>
    </motion.div>
  );
};

// Icon component remains the same
const IconComponent = ({ icon }) => {
  const iconClasses = "w-5 h-5";
  
  switch (icon) {
    case "user":
      return (
        <svg className={iconClasses} fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
        </svg>
      );
    case "briefcase":
      return (
        <svg className={iconClasses} fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
        </svg>
      );
    case "credit-card":
      return (
        <svg className={iconClasses} fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
        </svg>
      );
    case "star":
      return (
        <svg className={iconClasses} fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
        </svg>
      );
    default:
      return null;
  }
};

export default ProfileSidebar;

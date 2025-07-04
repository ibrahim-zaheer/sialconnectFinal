// import React from "react";
// import Footer from "./footer";
// import {
//   RiShieldCheckFill,
//   RiGroupFill,
//   RiHandHeartFill,
//   RiBarChartFill,
//   RiBuildingFill,
//   RiCodeSSlashFill,
// } from "react-icons/ri";

// const About = () => {
//   // Team data
//   const team = [
//     {
//       name: "Ali Hassan",
//       role: "Team Lead",
//       letter: "A",
//       icon: <RiCodeSSlashFill className="text-primary-600 text-2xl" />,
//     },
//     {
//       name: "Ibrahim Zaheer",
//       role: "Backend Developer",
//       letter: "I",
//       contributions: ["UI/UX Design", "Frontend Development"],
//       icon: <RiShieldCheckFill className="text-primary-600 text-2xl" />,
//     },
//   ];

//   // Features data
//   const features = [
//     {
//       icon: <RiShieldCheckFill className="text-primary-600 text-3xl" />,
//       title: "Verified Suppliers",
//       description:
//         "Rigorous verification process ensures only qualified suppliers join our network",
//     },
//     {
//       icon: <RiGroupFill className="text-primary-600 text-3xl" />,
//       title: "Direct Connections",
//       description:
//         "Eliminate intermediaries and communicate directly with manufacturers",
//     },
//     {
//       icon: <RiHandHeartFill className="text-primary-600 text-3xl" />,
//       title: "Smart Matching",
//       description: "AI-powered recommendations connect you with ideal partners",
//     },
//     {
//       icon: <RiBarChartFill className="text-primary-600 text-3xl" />,
//       title: "Order Tracking",
//       description: "Real-time updates from production to delivery",
//     },
//   ];

//   return (
//     <div className="bg-neutral-100 min-h-screen pt-24">
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//         {/* Hero Section */}
//         <div className="text-center mb-16">
//           <span className="inline-block bg-primary-100 text-primary-600 font-semibold px-4 py-1 rounded-full text-sm mb-6">
//             About Platform
//           </span>
//           <h1 className="text-4xl sm:text-5xl font-bold text-neutral-900 mb-4 leading-tight">
//             Transforming Pakistan's Export Industry
//           </h1>
//           <p className="text-neutral-600 max-w-2xl mx-auto text-lg leading-relaxed">
//             Connecting exporters with trusted suppliers through our secure
//             digital marketplace
//           </p>
//         </div>

//         {/* Mission Section */}
//         <div className="bg-white rounded-xl shadow-sm overflow-hidden mb-16">
//           <div className="p-8 sm:p-10">
//             <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
//               <div>
//                 <h2 className="text-2xl font-semibold text-neutral-900 mb-6">
//                   Our Mission
//                 </h2>
//                 <p className="text-neutral-600 mb-6 leading-relaxed">
//                   To revolutionize Pakistan's export supply chain by creating
//                   transparent, efficient connections between exporters and
//                   verified suppliers.
//                 </p>
//                 <p className="text-neutral-600 leading-relaxed">
//                   We're committed to eliminating traditional barriers through
//                   technology, enabling businesses to thrive in the global
//                   marketplace.
//                 </p>
//               </div>
//               <div className="bg-primary-100 rounded-xl p-8 flex flex-col justify-center">
//                 <RiBuildingFill className="text-primary-600 text-5xl mx-auto mb-6" />
//                 <h3 className="text-xl font-semibold text-primary-600 text-center leading-snug">
//                   "Building digital bridges for Pakistan's export economy"
//                 </h3>
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* Features Section */}
//         <div className="mb-16">
//           <h2 className="text-2xl font-semibold text-neutral-900 mb-12 text-center">
//             Key Features
//           </h2>
//           <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//             {features.map((feature, index) => (
//               <div
//                 key={index}
//                 className="bg-white rounded-xl shadow-sm overflow-hidden transition-transform hover:-translate-y-1 h-full"
//               >
//                 <div className="p-6 flex items-start">
//                   <div className="bg-primary-100 rounded-full w-14 h-14 flex items-center justify-center mr-5 flex-shrink-0">
//                     {feature.icon}
//                   </div>
//                   <div>
//                     <h3 className="text-xl font-semibold text-neutral-900 mb-2">
//                       {feature.title}
//                     </h3>
//                     <p className="text-neutral-600 leading-relaxed">
//                       {feature.description}
//                     </p>
//                   </div>
//                 </div>
//               </div>
//             ))}
//           </div>
//         </div>

//         {/* Team Section */}
//         <div className="mb-16">
//           <h2 className="text-2xl font-semibold text-neutral-900 mb-12 text-center">
//             Development Team
//           </h2>
//           <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//             {team.map((member, index) => (
//               <div
//                 key={index}
//                 className="bg-white rounded-xl shadow-sm overflow-hidden"
//               >
//                 <div className="p-6">
//                   <div className="flex items-center mb-6">
//                     <div className="w-20 h-20 rounded-full border-2 border-primary-500 mr-5 bg-primary-600 text-white flex items-center justify-center text-2xl font-bold">
//                       {member.letter}
//                     </div>
//                     <div>
//                       <h3 className="text-xl font-semibold text-neutral-900">
//                         {member.name}
//                       </h3>
//                       <p className="text-primary-600 font-medium">
//                         {member.role}
//                       </p>
//                     </div>
//                   </div>
                  
//                 </div>
//               </div>
//             ))}
//           </div>
//         </div>

        
//       </div>
//       <Footer />
//     </div>
//   );
// };

// export default About;

import React from "react";
import { useTranslation } from "react-i18next";  // Import the hook for translation
import Footer from "./footer";
import {
  RiShieldCheckFill,
  RiGroupFill,
  RiHandHeartFill,
  RiBarChartFill,
  RiBuildingFill,
  RiCodeSSlashFill,
} from "react-icons/ri";

const About = () => {
  const { t } = useTranslation();  // Initialize the useTranslation hook

  // Team data
  const team = [
    {
      name: "Ali Hassan",
      role: "Team Lead",
      letter: "A",
      icon: <RiCodeSSlashFill className="text-primary-600 text-2xl" />,
    },
    {
      name: "Ibrahim Zaheer",
      role: "Backend Developer",
      letter: "I",
      contributions: ["UI/UX Design", "Frontend Development"],
      icon: <RiShieldCheckFill className="text-primary-600 text-2xl" />,
    },
  ];

  // Features data
  const features = [
    {
      icon: <RiShieldCheckFill className="text-primary-600 text-3xl" />,
      title: t("about:verified_suppliers"),  // Use translation keys from the 'about' namespace
      description: t("about:verified_suppliers_description"),
    },
    {
      icon: <RiGroupFill className="text-primary-600 text-3xl" />,
      title: t("about:direct_connections"),
      description: t("about:direct_connections_description"),
    },
    {
      icon: <RiHandHeartFill className="text-primary-600 text-3xl" />,
      title: t("about:smart_matching"),
      description: t("about:smart_matching_description"),
    },
    {
      icon: <RiBarChartFill className="text-primary-600 text-3xl" />,
      title: t("about:order_tracking"),
      description: t("about:order_tracking_description"),
    },
  ];

  return (
    <div className="bg-neutral-100 min-h-screen pt-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <span className="inline-block bg-primary-100 text-primary-600 font-semibold px-4 py-1 rounded-full text-sm mb-6">
            {t("about:about_platform")}  {/* Using translation from 'about' namespace */}
          </span>
          <h1 className="text-4xl sm:text-5xl font-bold text-neutral-900 mb-4 leading-tight">
            {t("about:transforming_pakistan_export")}
          </h1>
          <p className="text-neutral-600 max-w-2xl mx-auto text-lg leading-relaxed">
            {t("about:connecting_exporters")}
          </p>
        </div>

        {/* Mission Section */}
        <div className="bg-white rounded-xl shadow-sm overflow-hidden mb-16">
          <div className="p-8 sm:p-10">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h2 className="text-2xl font-semibold text-neutral-900 mb-6">
                  {t("about:our_mission")}
                </h2>
                <p className="text-neutral-600 mb-6 leading-relaxed">
                  {t("about:mission_description")}
                </p>
              </div>
              <div className="bg-primary-100 rounded-xl p-8 flex flex-col justify-center">
                <RiBuildingFill className="text-primary-600 text-5xl mx-auto mb-6" />
                <h3 className="text-xl font-semibold text-primary-600 text-center leading-snug">
                  {t("about:building_digital_bridges")}
                </h3>
              </div>
            </div>
          </div>
        </div>

        {/* Features Section */}
        <div className="mb-16">
          <h2 className="text-2xl font-semibold text-neutral-900 mb-12 text-center">
            {t("about:key_features")}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {features.map((feature, index) => (
              <div
                key={index}
                className="bg-white rounded-xl shadow-sm overflow-hidden transition-transform hover:-translate-y-1 h-full"
              >
                <div className="p-6 flex items-start">
                  <div className="bg-primary-100 rounded-full w-14 h-14 flex items-center justify-center mr-5 flex-shrink-0">
                    {feature.icon}
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-neutral-900 mb-2">
                      {feature.title}
                    </h3>
                    <p className="text-neutral-600 leading-relaxed">
                      {feature.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Team Section */}
        <div className="mb-16">
          <h2 className="text-2xl font-semibold text-neutral-900 mb-12 text-center">
            {t("about:development_team")}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {team.map((member, index) => (
              <div
                key={index}
                className="bg-white rounded-xl shadow-sm overflow-hidden"
              >
                <div className="p-6">
                  <div className="flex items-center mb-6">
                    <div className="w-20 h-20 rounded-full border-2 border-primary-500 mr-5 bg-primary-600 text-white flex items-center justify-center text-2xl font-bold">
                      {member.letter}
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold text-neutral-900">
                        {member.name}
                      </h3>
                      <p className="text-primary-600 font-medium">
                        {member.role}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default About;

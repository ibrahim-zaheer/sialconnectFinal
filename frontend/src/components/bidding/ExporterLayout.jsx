// // 

// import React, { useState, useEffect } from "react";
// import { Link, Outlet, useLocation } from "react-router-dom";
// import { FaBox, FaGavel, FaPlus, FaSearch, FaUser } from "react-icons/fa";

// const ExporterLayout = () => {
//   const location = useLocation();
//   // Set "auctions" as the default active tab
//   const [activeTab, setActiveTab] = useState("auctions");
//   const [searchQuery, setSearchQuery] = useState("");

//   useEffect(() => {
//     const path = location.pathname.split("/").pop();
//     // Only update if there's a valid path (not empty)
//     if (path) {
//       setActiveTab(path);
//     }
//   }, [location]);

//   return (
//     <div className="flex h-screen bg-gray-50">
//       {/* Sidebar */}
//       <div className="w-64 bg-white shadow-md fixed h-full">
//         <div className="p-4 border-b border-gray-200">
//           <h1 className="text-xl font-bold text-gray-800">Exporter Dashboard</h1>
//         </div>
        
//         <div className="p-4">
//           <div className="relative mb-6">
//             <input
//               type="text"
//               placeholder="Search..."
//               value={searchQuery}
//               onChange={(e) => setSearchQuery(e.target.value)}
//               className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
//             />
//             <FaSearch className="absolute left-3 top-3 text-gray-400" />
//           </div>

//           <nav>
//             <ul className="space-y-2">
//               <li>
//                 <Link
//                   to="/exporter"
//                   className={`flex items-center p-3 rounded-lg ${activeTab === "exporter" ? "bg-blue-100 text-blue-700" : "text-gray-700 hover:bg-gray-100"}`}
//                 >
//                   <FaBox className="mr-3" />
//                   <span>Products</span>
//                 </Link>
//               </li>
//               <li>
//                 <Link
//                   to="/exporter/auctions"
//                   className={`flex items-center p-3 rounded-lg ${activeTab === "auctions" ? "bg-blue-100 text-blue-700" : "text-gray-700 hover:bg-gray-100"}`}
//                 >
//                   <FaGavel className="mr-3" />
//                   <span>Auctions</span>
//                 </Link>
//               </li>
//               <li>
//                 <Link
//                   to="/exporter/create-auction"
//                   className={`flex items-center p-3 rounded-lg ${activeTab === "create-auction" ? "bg-blue-100 text-blue-700" : "text-gray-700 hover:bg-gray-100"}`}
//                 >
//                   <FaPlus className="mr-3" />
//                   <span>Create Auction</span>
//                 </Link>
//               </li>
//             </ul>
//           </nav>
//         </div>
//       </div>

//       {/* Main Content */}
//       <div className="flex-1 ml-64 p-8 overflow-y-auto">
//         <div className="mb-6">
//           <h1 className="text-2xl font-bold text-gray-800 capitalize">
//             {activeTab === "exporter" && "Your Products"}
//             {activeTab === "auctions" && "Your Auctions"}
//             {activeTab === "create-auction" && "Create New Auction"}
//           </h1>
//           <div className="border-b border-gray-200 mt-2"></div>
//         </div>
        
//         <Outlet />
//       </div>
//     </div>
//   );
// };

// export default ExporterLayout;


import React, { useState, useEffect } from "react";
import { Link, Outlet, useLocation } from "react-router-dom";
import { FaGavel, FaPlus, FaSearch } from "react-icons/fa";

const ExporterLayout = () => {
  const location = useLocation();
  const [activeTab, setActiveTab] = useState("auctions");
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const path = location.pathname.split("/").pop();
    if (path) {
      setActiveTab(path);
    }
  }, [location]);

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      <div className="w-64 bg-white shadow-md fixed h-full mt-16">
        <div className="p-4 border-b border-gray-200">
          <h1 className="text-xl font-bold text-gray-800">Exporter Dashboard</h1>
        </div>
        
        <div className="p-4">
          {/* <div className="relative mb-6">
            <input
              type="text"
              placeholder="Search..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <FaSearch className="absolute left-3 top-3 text-gray-400" />
          </div> */}

          <nav>
            <ul className="space-y-2">
              <li>
                <Link
                  to="/exporter/auctions"
                  className={`flex items-center p-3 rounded-lg ${activeTab === "auctions" ? "bg-blue-100 text-blue-700" : "text-gray-700 hover:bg-gray-100"}`}
                >
                  <FaGavel className="mr-3" />
                  <span>Auctions</span>
                </Link>
              </li>
              <li>
                <Link
                  to="/exporter/create-auction"
                  className={`flex items-center p-3 rounded-lg ${activeTab === "create-auction" ? "bg-blue-100 text-blue-700" : "text-gray-700 hover:bg-gray-100"}`}
                >
                  <FaPlus className="mr-3" />
                  <span>Create Auction</span>
                </Link>
              </li>
            </ul>
          </nav>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 ml-64 p-8 overflow-y-auto">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-800 capitalize">
            {activeTab === "auctions" && "Your Auctions"}
            {activeTab === "create-auction" && "Create New Auction"}
          </h1>
          <div className="border-b border-gray-200 mt-2"></div>
        </div>
        
        <Outlet />
      </div>
    </div>
  );
};

export default ExporterLayout;
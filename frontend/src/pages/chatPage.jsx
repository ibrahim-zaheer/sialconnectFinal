// import React from "react";
// import Sidebar from "../components/Chat/Sidebar";
// import NoChatSelected from "../components/Chat/NoChatSelected";
// import ChatContainer from "../components/Chat/ChatContainer";
// import { useChatStore } from "../store/useChatStore";

// const ChatPage = ()=>{
//     const { selectedUser } = useChatStore();
//     return (
//         <div className="h-screen bg-base-200">
//           <div className="flex items-center justify-center pt-20 px-4">
//             <div className="bg-base-100 rounded-lg shadow-cl w-full max-w-6xl h-[calc(100vh-8rem)]">
//               <div className="flex h-full rounded-lg overflow-hidden">
//                 <Sidebar />
            
//                 {!selectedUser ? <NoChatSelected /> : <ChatContainer />}
//               </div>
//             </div>
//           </div>
//         </div>
//       );
// };

// export default ChatPage;









// import React, { useEffect } from "react";
// import { useLocation } from "react-router-dom";
// import Sidebar from "../components/Chat/Sidebar";
// import NoChatSelected from "../components/Chat/NoChatSelected";
// import ChatContainer from "../components/Chat/ChatContainer";
// import { useChatStore } from "../store/useChatStore";
// import axios from "axios";

// const ChatPage = () => {
//   const location = useLocation();
//   const queryParams = new URLSearchParams(location.search);
//   const supplierId = queryParams.get("supplierId"); // Get supplier ID from URL

//   const { selectedUser, users, setSelectedUser, getUsers, isUsersLoading } = useChatStore();

//   // Fetch users initially
//   useEffect(() => {
//     getUsers(); // Ensure chat users are loaded
//   }, [getUsers]);

 

//   // useEffect(() => {
//   //   if (supplierId && users.length > 0) {
//   //     const supplier = users.find((user) => user._id === supplierId);
//   //     if (supplier) {
//   //       setSelectedUser(supplier);
//   //     } else {
//   //       // NEW: Fetch supplier manually and set as selected
//   //       const fetchSupplier = async () => {
//   //         try {
//   //           const { data } = await axios.get(`/api/message/users/${supplierId}`);
//   //           setSelectedUser(data); // Add to selectedUser
//   //         } catch (err) {
//   //           console.error("Failed to fetch supplier details", err);
//   //         }
//   //       };
//   //       fetchSupplier();
//   //     }
//   //   }
//   // }, [supplierId, users, setSelectedUser]);

//   useEffect(() => {
//     const trySetSelectedSupplier = async () => {
//       if (!supplierId) return;
  
//       const supplierFromList = users.find((u) => u._id === supplierId);
//       if (supplierFromList) {
//         setSelectedUser(supplierFromList);
//       } else {
//         try {
//           const { data } = await axios.get(`/api/message/users/${supplierId}`);
//           setSelectedUser(data);
//         } catch (err) {
//           console.error("Failed to fetch supplier", err);
//         }
//       }
//     };
  
//     // Run only after users are fetched or supplierId changes
//     if (users.length > 0 || supplierId) {
//       trySetSelectedSupplier();
//     }
//   }, [supplierId, users]);
  
  

//   return (
//     <div className="h-screen bg-base-200">
//       <div className="flex items-center justify-center pt-20 px-4">
//         <div className="bg-base-100 rounded-lg shadow-cl w-full max-w-6xl h-[calc(100vh-8rem)]">
//           <div className="flex h-full rounded-lg overflow-hidden">
//             <Sidebar />
//             {isUsersLoading ? (
//               <div className="flex-1 flex items-center justify-center">
//                 <p>Loading chat...</p>
//               </div>
//             ) : !selectedUser ? (
//               <NoChatSelected />
//             ) : (
//               <ChatContainer />
//             )}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ChatPage;

// ChatPage.jsx
// import React, { useEffect } from "react";
// import { useLocation } from "react-router-dom";
// import Sidebar from "../components/Chat/Sidebar";
// import NoChatSelected from "../components/Chat/NoChatSelected";
// import ChatContainer from "../components/Chat/ChatContainer";
// import { useChatStore } from "../store/useChatStore";
// import axios from "axios";

// const ChatPage = () => {
//   const location = useLocation();
//   const queryParams = new URLSearchParams(location.search);
//   const supplierId = queryParams.get("supplierId");

//   const { selectedUser, users, setSelectedUser, getUsers, isUsersLoading } = useChatStore();

//   useEffect(() => {
//     getUsers();
//   }, [getUsers]);

//   useEffect(() => {
//     const trySetSelectedSupplier = async () => {
//       if (!supplierId) return;
  
//       const supplierFromList = users.find((u) => u._id === supplierId);
//       if (supplierFromList) {
//         setSelectedUser(supplierFromList);
//       } else {
//         try {
//           const { data } = await axios.get(`/api/message/users/${supplierId}`);
//           setSelectedUser(data);
//         } catch (err) {
//           console.error("Failed to fetch supplier", err);
//         }
//       }
//     };
  
//     if (users.length > 0 || supplierId) {
//       trySetSelectedSupplier();
//     }
//   }, [supplierId, users]);
  
//   return (
//     <div className="flex h-screen bg-gray-100 mt-16">
//       {/* Sidebar area - fixed width */}
//       <div className="w-20 md:w-80 border-r border-gray-300 bg-white flex-shrink-0">
//         <Sidebar />
//       </div>
      
//       {/* Main chat area */}
//       <div className="flex-1 flex flex-col">
//         {isUsersLoading ? (
//           <div className="flex-1 flex items-center justify-center bg-gray-50">
//             <div className="text-center p-6">
//               <div className="inline-block animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500 mb-2"></div>
//               <p className="text-gray-600">Loading chat...</p>
//             </div>
//           </div>
//         ) : !selectedUser ? (
//           <NoChatSelected />
//         ) : (
//           <ChatContainer />
//         )}
//       </div>
//     </div>
//   );
// };

// export default ChatPage;

import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";
import Sidebar from "../components/Chat/Sidebar";
import NoChatSelected from "../components/Chat/NoChatSelected";
import ChatContainer from "../components/Chat/ChatContainer";
import { useChatStore } from "../store/useChatStore";
import axios from "axios";

const ChatPage = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const supplierId = queryParams.get("supplierId");

  const { selectedUser, users, setSelectedUser, getUsers, isUsersLoading } = useChatStore();

  useEffect(() => {
    getUsers();
  }, [getUsers]);

  useEffect(() => {
    const trySetSelectedSupplier = async () => {
      if (!supplierId) return;
  
      const supplierFromList = users.find((u) => u._id === supplierId);
      if (supplierFromList) {
        setSelectedUser(supplierFromList);
      } else {
        try {
          const { data } = await axios.get(`/api/message/users/${supplierId}`);
          setSelectedUser(data);
        } catch (err) {
          console.error("Failed to fetch supplier", err);
        }
      }
    };
  
    if (users.length > 0 || supplierId) {
      trySetSelectedSupplier();
    }
  }, [supplierId, users]);
  
  return (
    <div className="flex h-[calc(100vh-4rem)] bg-neutral-100 mt-16">
      {/* Sidebar area */}
      <div className="w-20 md:w-80 border-r border-neutral-200 bg-surface flex-shrink-0 flex flex-col h-full">
        <Sidebar />
      </div>
      
      {/* Main chat area */}
      <div className="flex-1 flex flex-col h-full bg-neutral-50">
        {isUsersLoading ? (
          <div className="flex-1 flex items-center justify-center bg-surface">
            <div className="text-center p-6">
              <div className="inline-block animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-primary-500 mb-2"></div>
              <p className="text-neutral-600">Loading chat...</p>
            </div>
          </div>
        ) : !selectedUser ? (
          <NoChatSelected />
        ) : (
          <ChatContainer />
        )}
      </div>
    </div>
  );
};

export default ChatPage;
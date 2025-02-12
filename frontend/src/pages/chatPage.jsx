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









import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";
import Sidebar from "../components/Chat/Sidebar";
import NoChatSelected from "../components/Chat/NoChatSelected";
import ChatContainer from "../components/Chat/ChatContainer";
import { useChatStore } from "../store/useChatStore";

const ChatPage = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const supplierId = queryParams.get("supplierId"); // Get supplier ID from URL

  const { selectedUser, users, setSelectedUser, getUsers, isUsersLoading } = useChatStore();

  // Fetch users initially
  useEffect(() => {
    getUsers(); // Ensure chat users are loaded
  }, [getUsers]);

  // Ensure supplier is selected when users are available
  useEffect(() => {
    if (supplierId && users.length > 0) {
      const supplier = users.find((user) => user._id === supplierId);
      if (supplier) {
        setSelectedUser(supplier);
      }
    }
  }, [supplierId, users, setSelectedUser]); // Runs when users change

  return (
    <div className="h-screen bg-base-200">
      <div className="flex items-center justify-center pt-20 px-4">
        <div className="bg-base-100 rounded-lg shadow-cl w-full max-w-6xl h-[calc(100vh-8rem)]">
          <div className="flex h-full rounded-lg overflow-hidden">
            <Sidebar />
            {isUsersLoading ? (
              <div className="flex-1 flex items-center justify-center">
                <p>Loading chat...</p>
              </div>
            ) : !selectedUser ? (
              <NoChatSelected />
            ) : (
              <ChatContainer />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatPage;

import { useChatStore } from "../../store/useChatStore";
import { useAuthStore } from "../../store/useAuthStore";

import { useEffect,useRef } from "react";
import ChatHeader from "./ChatHeader";
import MessageInput from "./MessageInput";
import MessageSkeleton from "../skeletons/MessageSkeleton";
import { formatMessageTime } from "../../lib/utils";





const ChatContainer = () => {
  const { messages, getMessages, isMessagesLoading, selectedUser, subscribeToMessages,unsubscribeFromMessages} =
    useChatStore();
const {authUser,checkAuth} = useAuthStore();

const messageEndRef = useRef(null);

// useEffect(() => {
//   if (selectedUser && useAuthStore.getState().socket?.connected) {
//     subscribeToMessages();
//     return () => unsubscribeFromMessages();
//   }
// }, [selectedUser]);

useEffect(() => {
  if (selectedUser?._id && useAuthStore.getState().socket?.connected) {
    getMessages(selectedUser._id);
    subscribeToMessages();
    return () => unsubscribeFromMessages();
  }
}, [selectedUser, getMessages, subscribeToMessages, unsubscribeFromMessages]);

// useEffect(() => {
//   if (selectedUser?._id) {
//     getMessages(selectedUser._id);
//     subscribeToMessages();
//     return () => unsubscribeFromMessages();
//   }
// }, [selectedUser, getMessages, subscribeToMessages, unsubscribeFromMessages]);



useEffect(() => {
  checkAuth();
}, [checkAuth]);
useEffect(() => {
  console.log("Messages:", messages); // Log messages whenever they change
}, [messages]);



if (!selectedUser) {
  return <div>Please select a user to chat with.</div>;
}

  if (isMessagesLoading) return(
    <div className="flex-1 flex flex-col overflow-auto">
        <ChatHeader />
        <MessageSkeleton />
        <MessageInput />
      </div>
  );

  return (
    <div className="flex-1 flex flex-col overflow-auto">
      <ChatHeader />
      
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((message) => (
          <div
            key={message._id}
            className={`chat ${message.senderId === authUser?._id  ? "chat-end" : "chat-start"}`}
            ref={messageEndRef}
          >
            <div className=" chat-image avatar">
              <div className="size-10 rounded-full border">
                <img
                  src={
                    message.senderId === authUser?._id
                      ? authUser.profilePicture || "https://media.istockphoto.com/id/619400810/photo/mr-who.jpg?s=1024x1024&w=is&k=20&c=qDFp7p4f3PzMLr3x4j9VA4lTI6fdUDWDVhP6wU9S0Kg="
                      : selectedUser.profilePicture || "https://media.istockphoto.com/id/619400810/photo/mr-who.jpg?s=1024x1024&w=is&k=20&c=qDFp7p4f3PzMLr3x4j9VA4lTI6fdUDWDVhP6wU9S0Kg="
                  }
                  alt="profile pic"
                />
              </div>
            </div>
            <div className="chat-header mb-1">
              <time className="text-xs opacity-50 ml-1">
                {formatMessageTime(message.createdAt)}
              </time>
            </div>
            <div className="chat-bubble flex flex-col">
              {message.image && (
                <img
                  src={message.image}
                  alt="Attachment"
                  className="sm:max-w-[200px] rounded-md mb-2"
                />
              )}
              {message.text && <p>{message.text}</p>}
            </div>
          </div>
        ))}
      </div>

      <MessageInput />
    </div>
  );
};

export default ChatContainer;






// import { useChatStore } from "../../store/useChatStore";
// import { useAuthStore } from "../../store/useAuthStore";
// import { useEffect, useRef } from "react";
// import ChatHeader from "./ChatHeader";
// import MessageInput from "./MessageInput";
// import MessageSkeleton from "../skeletons/MessageSkeleton";
// import { formatMessageTime } from "../../lib/utils";
// import { useSelector } from "react-redux";

// const ChatContainer = () => {
//   const { messages, getMessages, isMessagesLoading, selectedUser } = useChatStore();
//   const { authUser } = useAuthStore();
//   const user = useSelector((state) => state.user);
//   const messageEndRef = useRef(null);

//   useEffect(() => {
//     if (selectedUser && selectedUser._id) {
//       getMessages(selectedUser._id);
//     }
//   }, [selectedUser, getMessages]);

//   useEffect(() => {
//     console.log("Messages:", messages); // Log messages whenever they change
//   }, [messages]);

//   if (!selectedUser) {
//     return <div>Please select a user to chat with.</div>;
//   }

//   if (isMessagesLoading) {
//     return (
//       <div className="flex-1 flex flex-col overflow-auto">
//         <ChatHeader />
//         <MessageSkeleton />
//         <MessageInput />
//       </div>
//     );
//   }

//   return (
//     <div className="flex-1 flex flex-col overflow-auto">
//       <ChatHeader />
//       <div className="flex-1 overflow-y-auto p-4 space-y-4">
//         {messages.map((message) => (
//           <div
//             key={message._id}
//             className={`chat ${message.senderId === authUser?._id ? "chat-end" : "chat-start"}`}
//             ref={messageEndRef}
//           >
//             <div className="chat-image avatar">
//               <div className="size-10 rounded-full border">
//                 <img
//                   src={
//                     message.senderId === authUser?._id
//                       ? authUser.profilePicture ||
//                         "https://media.istockphoto.com/id/619400810/photo/mr-who.jpg?s=1024x1024&w=is&k=20&c=qDFp7p4f3PzMLr3x4j9VA4lTI6fdUDWDVhP6wU9S0Kg="
//                       : selectedUser.profilePicture ||
//                         "https://media.istockphoto.com/id/619400810/photo/mr-who.jpg?s=1024x1024&w=is&k=20&c=qDFp7p4f3PzMLr3x4j9VA4lTI6fdUDWDVhP6wU9S0Kg="
//                   }
//                   alt="profile pic"
//                 />
//               </div>
//             </div>
//             <div className="chat-header mb-1">
//               <time className="text-xs opacity-50 ml-1">
//                 {formatMessageTime(message.createdAt)}
//               </time>
//             </div>
//             <div className="chat-bubble flex flex-col">
//               {message.image && (
//                 <img
//                   src={message.image}
//                   alt="Attachment"
//                   className="sm:max-w-[200px] rounded-md mb-2"
//                 />
//               )}
//               {message.text && <p>{message.text}</p>}
//             </div>
//           </div>
//         ))}
//       </div>
//       <MessageInput />
//     </div>
//   );
// };

// export default ChatContainer;

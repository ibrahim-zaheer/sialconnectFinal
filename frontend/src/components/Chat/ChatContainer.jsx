// import { useChatStore } from "../../store/useChatStore";
// import { useAuthStore } from "../../store/useAuthStore";
// import { useEffect, useRef } from "react";
// import ChatHeader from "./ChatHeader";
// import MessageInput from "./MessageInput";
// import MessageSkeleton from "../skeletons/MessageSkeleton";
// import { formatMessageTime } from "../../lib/utils";
// import VoiceMessagePlayer from './VoiceMessagePlayer';

// const ChatContainer = () => {
//   const {
//     messages,
//     getMessages,
//     isMessagesLoading,
//     selectedUser,
//     subscribeToMessages,
//     unsubscribeFromMessages,
//   } = useChatStore();
//   const { authUser, checkAuth } = useAuthStore();

//   const messageEndRef = useRef(null);

//   useEffect(() => {
//     if (selectedUser?._id && useAuthStore.getState().socket?.connected) {
//       getMessages(selectedUser._id);
//       subscribeToMessages();
//       return () => unsubscribeFromMessages();
//     }
//   }, [selectedUser, getMessages, subscribeToMessages, unsubscribeFromMessages]);

//   useEffect(() => {
//     if (!selectedUser?._id) return;

//     const socket = useAuthStore.getState().socket;

//     const loadChat = async () => {
//       await getMessages(selectedUser._id);
//       if (socket?.connected) {
//         subscribeToMessages();
//       }
//     };

//     loadChat();

//     return () => {
//       unsubscribeFromMessages();
//     };
//   }, [selectedUser?._id]);

//   useEffect(() => {
//     checkAuth();
//   }, [checkAuth]);

//   useEffect(() => {
//     console.log("Messages:", messages);
//   }, [messages]);

//   if (!selectedUser) {
//     return (
//       <div className="flex items-center justify-center h-full bg-neutral-100 text-neutral-600">
//         <div className="text-center p-6 bg-white rounded-lg shadow-sm border border-neutral-200">
//           <svg 
//             className="mx-auto h-12 w-12 text-neutral-400" 
//             fill="none" 
//             stroke="currentColor" 
//             viewBox="0 0 24 24"
//           >
//             <path 
//               strokeLinecap="round" 
//               strokeLinejoin="round" 
//               strokeWidth={2} 
//               d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
//             />
//           </svg>
//           <h3 className="mt-2 text-lg font-medium text-neutral-900">
//             Select a user to start chatting
//           </h3>
//         </div>
//       </div>
//     );
//   }

//   if (isMessagesLoading) {
//     return (
//       <div className="flex-1 flex flex-col bg-neutral-100">
//         <ChatHeader />
//         <div className="flex-1 overflow-y-auto p-4">
//           <MessageSkeleton />
//         </div>
//         <MessageInput />
//       </div>
//     );
//   }

//   return (
//     <div className="flex-1 flex flex-col bg-neutral-100">
//       <ChatHeader />

//       <div className="flex-1 overflow-y-auto p-4 space-y-4">
//         {messages.map((message) => (
//           <div
//             key={message._id}
//             className={`chat ${
//               message.senderId === authUser?._id ? "chat-end" : "chat-start"
//             }`}
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
//             <div className="chat-bubble flex flex-col gap-2">
//               {message.image && (
//                 <img
//                   src={message.image}
//                   alt="Attachment"
//                   className="sm:max-w-[200px] rounded-md mb-2"
//                 />
//               )}

//               {message.text && <p>{message.text}</p>}

//               {message.voiceMessage && (
//                 <VoiceMessagePlayer
//                   url={message.voiceMessage}
//                   duration={message.duration}
//                 />
//               )}
//             </div>
//           </div>
//         ))}
//         <div ref={messageEndRef} />
//       </div>

//       <MessageInput />
//     </div>
//   );
// };

// export default ChatContainer;

// ChatContainer.jsx
// import { useChatStore } from "../../store/useChatStore";
// import { useAuthStore } from "../../store/useAuthStore";
// import { useEffect, useRef } from "react";
// import ChatHeader from "./ChatHeader";
// import MessageInput from "./MessageInput";
// import MessageSkeleton from "../skeletons/MessageSkeleton";
// import { formatMessageTime } from "../../lib/utils";
// import VoiceMessagePlayer from './VoiceMessagePlayer';

// const ChatContainer = () => {
//   const {
//     messages,
//     getMessages,
//     isMessagesLoading,
//     selectedUser,
//     subscribeToMessages,
//     unsubscribeFromMessages,
//   } = useChatStore();
//   const { authUser, checkAuth } = useAuthStore();

//   const messageEndRef = useRef(null);

//   useEffect(() => {
//     if (selectedUser?._id && useAuthStore.getState().socket?.connected) {
//       getMessages(selectedUser._id);
//       subscribeToMessages();
//       return () => unsubscribeFromMessages();
//     }
//   }, [selectedUser, getMessages, subscribeToMessages, unsubscribeFromMessages]);

//   useEffect(() => {
//     if (!selectedUser?._id) return;
//     const socket = useAuthStore.getState().socket;

//     const loadChat = async () => {
//       await getMessages(selectedUser._id);
//       if (socket?.connected) {
//         subscribeToMessages();
//       }
//     };

//     loadChat();

//     return () => {
//       unsubscribeFromMessages();
//     };
//   }, [selectedUser?._id]);

//   useEffect(() => {
//     checkAuth();
//   }, [checkAuth]);

//   // Auto-scroll to bottom when messages change
//   useEffect(() => {
//     messageEndRef.current?.scrollIntoView({ behavior: "smooth" });
//   }, [messages]);

//   if (!selectedUser) {
//     return (
//       <div className="flex-1 flex flex-col items-center justify-center bg-gray-50">
//         <div className="text-center p-6 max-w-md">
//           <div className="mx-auto size-16 bg-gray-200 rounded-full flex items-center justify-center mb-4">
//             <svg className="size-8 text-gray-400" fill="currentColor" viewBox="0 0 24 24">
//               <path d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
//             </svg>
//           </div>
//           <h3 className="text-lg font-medium text-gray-900 mb-2">
//             Select a chat to start messaging
//           </h3>
//           <p className="text-gray-500 text-sm">
//             Choose a contact from the sidebar to view your conversation history
//           </p>
//         </div>
//       </div>
//     );
//   }

//   if (isMessagesLoading) {
//     return (
//       <div className="flex-1 flex flex-col bg-gray-50">
//         <ChatHeader />
//         <div className="flex-1 overflow-y-auto p-4">
//           <MessageSkeleton />
//         </div>
//         <MessageInput />
//       </div>
//     );
//   }

//   return (
//     <div className="flex-1 flex flex-col bg-gray-50">
//       <ChatHeader />

//       {/* Messages area with subtle background pattern */}
//       <div className="flex-1 overflow-y-auto p-4 bg-[#e5ddd5] bg-opacity-30 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI0MDAiIGhlaWdodD0iNDAwIj48ZmlsdGVyIGlkPSJhIiB4PSIwIiB5PSIwIj48ZmVUdXJidWxlbmNlIGJhc2VGcmVxdWVuY3k9Ii43IiBudW1PY3RhdmVzPSIxIiBzdGl0Y2hUaWxlcz0ic3RpdGNoIi8+PGZlQ29sb3JNYXRyaXggdmFsdWVzPSIxIDAgMCAwIDAgMCAxIDAgMCAwIDAgMCAxIDAgMCAwIDAgMCAuMiAwIi8+PC9maWx0ZXI+PHBhdGggZmlsdGVyPSJ1cmwoI2EpIiBvcGFjaXR5PSIuMDUiIGQ9Ik0wIDBoNDAwdjQwMEgweiIvPjwvc3ZnPg==')]">
//         <div className="space-y-2">
//           {messages.map((message) => (
//             <div
//               key={message._id}
//               className={`flex ${message.senderId === authUser?._id ? "justify-end" : "justify-start"}`}
//             >
//               <div
//                 className={`max-w-xs md:max-w-md lg:max-w-lg rounded-lg px-4 py-2 ${
//                   message.senderId === authUser?._id
//                     ? "bg-green-100 rounded-tr-none"
//                     : "bg-white rounded-tl-none"
//                 } shadow-sm`}
//               >
//                 {message.image && (
//                   <img
//                     src={message.image}
//                     alt="Attachment"
//                     className="max-w-full rounded-md mb-1"
//                   />
//                 )}

//                 {message.text && <p className="text-gray-800">{message.text}</p>}

//                 {message.voiceMessage && (
//                   <VoiceMessagePlayer
//                     url={message.voiceMessage}
//                     duration={message.duration}
//                     isCurrentUser={message.senderId === authUser?._id}
//                   />
//                 )}

//                 <div className="text-right mt-1">
//                   <span className="text-xs text-gray-500">
//                     {formatMessageTime(message.createdAt)}
//                   </span>
//                 </div>
//               </div>
//             </div>
//           ))}
//           <div ref={messageEndRef} />
//         </div>
//       </div>

//       <MessageInput />
//     </div>
//   );
// };

// export default ChatContainer;

import { useChatStore } from "../../store/useChatStore";
import { useAuthStore } from "../../store/useAuthStore";
import { useEffect, useRef } from "react";
import ChatHeader from "./ChatHeader";
import MessageInput from "./MessageInput";
import MessageSkeleton from "../skeletons/MessageSkeleton";
import { formatMessageTime } from "../../lib/utils";
import VoiceMessagePlayer from './VoiceMessagePlayer';

const ChatContainer = () => {
  const {
    messages,
    getMessages,
    isMessagesLoading,
    selectedUser,
    subscribeToMessages,
    unsubscribeFromMessages,
  } = useChatStore();
  const { authUser, checkAuth } = useAuthStore();

  const messageEndRef = useRef(null);

  useEffect(() => {
    if (selectedUser?._id && useAuthStore.getState().socket?.connected) {
      getMessages(selectedUser._id);
      subscribeToMessages();
      return () => unsubscribeFromMessages();
    }
  }, [selectedUser, getMessages, subscribeToMessages, unsubscribeFromMessages]);

  useEffect(() => {
    if (!selectedUser?._id) return;
    const socket = useAuthStore.getState().socket;

    const loadChat = async () => {
      await getMessages(selectedUser._id);
      if (socket?.connected) {
        subscribeToMessages();
      }
    };

    loadChat();

    return () => {
      unsubscribeFromMessages();
    };
  }, [selectedUser?._id]);

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  useEffect(() => {
    messageEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  if (!selectedUser) {
    return (
      <div className="flex-1 flex flex-col items-center justify-center bg-gray-50">
        <div className="text-center p-6 max-w-md">
          <div className="mx-auto size-16 bg-gray-200 rounded-full flex items-center justify-center mb-4">
            <svg className="size-8 text-gray-400" fill="currentColor" viewBox="0 0 24 24">
              <path d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
            </svg>
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">
            Select a chat to start messaging
          </h3>
          <p className="text-gray-500 text-sm">
            Choose a contact from the sidebar to view your conversation history
          </p>
        </div>
      </div>
    );
  }

  if (isMessagesLoading) {
    return (
      <div className="flex-1 flex flex-col bg-gray-50">
        <ChatHeader />
        <div className="flex-1 overflow-y-auto p-4">
          <MessageSkeleton />
        </div>
        <div className="sticky bottom-0 bg-white border-t border-gray-200 p-3">
          <MessageInput />
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1 flex flex-col h-full">
      {/* Fixed header */}
      <ChatHeader />

      {/* Scrollable messages area with WhatsApp-like background */}
      <div className="flex-1 overflow-y-auto bg-[#e5ddd5] bg-opacity-30 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI0MDAiIGhlaWdodD0iNDAwIj48ZmlsdGVyIGlkPSJhIiB4PSIwIiB5PSIwIj48ZmVUdXJidWxlbmNlIGJhc2VGcmVxdWVuY3k9Ii43IiBudW1PY3RhdmVzPSIxIiBzdGl0Y2hUaWxlcz0ic3RpdGNoIi8+PGZlQ29sb3JNYXRyaXggdmFsdWVzPSIxIDAgMCAwIDAgMCAxIDAgMCAwIDAgMCAxIDAgMCAwIDAgMCAuMiAwIi8+PC9maWx0ZXI+PHBhdGggZmlsdGVyPSJ1cmwoI2EpIiBvcGFjaXR5PSIuMDUiIGQ9Ik0wIDBoNDAwdjQwMEgweiIvPjwvc3ZnPg==')]">
        <div className="px-2 pt-2 pb-16 space-y-2">
          {messages.map((message) => (
            <div
              key={message._id}
              className={`flex ${message.senderId === authUser?._id ? "justify-end" : "justify-start"}`}
              ref={messageEndRef}
            >
              <div
                className={`max-w-xs md:max-w-md lg:max-w-lg rounded-lg px-3 py-2 ${
                  message.senderId === authUser?._id
                    ? "bg-[#d9fdd3] rounded-tr-none"
                    : "bg-white rounded-tl-none"
                } shadow-sm`}
              >
                {message.image && (
                  <img
                    src={message.image}
                    alt="Attachment"
                    className="max-w-full rounded-md mb-1"
                  />
                )}

                {message.text && <p className="text-gray-800">{message.text}</p>}

                {message.voiceMessage && (
                  <VoiceMessagePlayer
                    url={message.voiceMessage}
                    duration={message.duration}
                    isCurrentUser={message.senderId === authUser?._id}
                  />
                )}

                <div className="flex justify-end items-center mt-1 space-x-1">
                  <span className="text-xs text-gray-500">
                    {formatMessageTime(message.createdAt)}
                  </span>
                  {message.senderId === authUser?._id && (
                    <span className="text-xs text-gray-500">
                      ✓✓
                    </span>
                  )}
                </div>
              </div>
            </div>
          ))}
          <div ref={messageEndRef} />
        </div>
      </div>

      {/* Fixed message input at bottom */}
      <div className="sticky bottom-0 bg-white border-t border-gray-200 p-3">
        <MessageInput />
      </div>
    </div>
  );
};

export default ChatContainer;
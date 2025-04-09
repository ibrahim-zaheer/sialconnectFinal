import { useChatStore } from "../../store/useChatStore";
import { useAuthStore } from "../../store/useAuthStore";
import { useEffect,  useRef } from "react";
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
      return (
      <div className="flex items-center justify-center h-full bg-neutral-100 text-neutral-600">
        <div className="text-center p-6 bg-white rounded-lg shadow-sm border border-neutral-200">
          <svg 
            className="mx-auto h-12 w-12 text-neutral-400" 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth={2} 
              d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
            />
          </svg>
          <h3 className="mt-2 text-lg font-medium text-neutral-900">
            Select a user to start chatting
          </h3>
        </div>
      </div>
    );
    }

  if (isMessagesLoading)
    {
    return  (
        <div className="flex-1 flex flex-col bg-neutral-100">
        <ChatHeader />
        <div className="flex-1 overflow-y-auto p-4">
          <MessageSkeleton />
        </div>
        <MessageInput />
      </div>
      );
  }

  return (
    <div className="flex-1 flex flex-col bg-neutral-100">
      <ChatHeader />

      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((message) => (
          <div
            key={message._id}
            className={`chat ${
              message.senderId === authUser?._id ? "chat-end" : "chat-start"
            }`}
            ref={messageEndRef}
          >
            <div className=" chat-image avatar">
              <div className="size-10 rounded-full border">
                <img
                  src={
                    message.senderId === authUser?._id
                      ? authUser.profilePicture ||
                        "https://media.istockphoto.com/id/619400810/photo/mr-who.jpg?s=1024x1024&w=is&k=20&c=qDFp7p4f3PzMLr3x4j9VA4lTI6fdUDWDVhP6wU9S0Kg="
                      : selectedUser.profilePicture ||
                        "https://media.istockphoto.com/id/619400810/photo/mr-who.jpg?s=1024x1024&w=is&k=20&c=qDFp7p4f3PzMLr3x4j9VA4lTI6fdUDWDVhP6wU9S0Kg="
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
            <div className="chat-bubble flex flex-col gap-2">
              {message.image && (
                <img
                  src={message.image}
                  alt="Attachment"
                  className="sm:max-w-[200px] rounded-md mb-2"
                />
              )}

              {message.text && <p>{message.text}</p>}

              {/* {message.voiceMessage && (
                <div className="flex items-center gap-2">
                  <audio controls className="w-full">
                    <source src={message.voiceMessage} type="audio/webm" />
                    Your browser does not support the audio element.
                  </audio>
                  {message.duration && (
                    <span className="text-xs text-gray-500">
                      {message.duration}s
                    </span>
                  )}
                </div>
              )} */}
              {message.voiceMessage && (
  <VoiceMessagePlayer
    url={message.voiceMessage}
    duration={message.duration}
  />
)}

            </div>
          ))
        )}
        <div ref={messageEndRef} />
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

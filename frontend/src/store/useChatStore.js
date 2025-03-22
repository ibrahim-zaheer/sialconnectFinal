// import { create } from "zustand";
// import toast from "react-hot-toast";
// import axios from "axios";

// export const useChatStore = create((set,get)=>({
//     messages: [],
//     users: [],
//     selectedUser: null,
//     isUsersLoading: false,
//     isMessagesLoading: false,

//     getUsers: async () => {
//         set({ isUsersLoading: true });
//         try {
//           const res = await axios.get("/message/users");
//           set({ users: res.data });
//         } catch (error) {
//           toast.error(error.response.data.message);
//         } finally {
//           set({ isUsersLoading: false });
//         }
//       },

//       getMessages: async (userId) => {
//         set({ isMessagesLoading: true });
//         try {
//           const res = await axios.get(`/message/${userId}`);
//           set({ messages: res.data });
//         } catch (error) {
//           toast.error(error.response.data.message);
//         } finally {
//           set({ isMessagesLoading: false });
//         }
//       },


//       sendMessage: async (messageData) => {
//         const { selectedUser, messages } = get();
//         try {
//           const res = await axios.post(`/message/send/${selectedUser._id}`, messageData);
//           set({ messages: [...messages, res.data] });
//         } catch (error) {
//           toast.error(error.response.data.message);
//         }
//       },

//       setSelectedUser: (selectedUser)=> set({selectedUser}),
// }));




// import { create } from "zustand";
// import toast from "react-hot-toast";
// import axios from "axios";
// import {useAuthStore} from "./useAuthStore"

// export const useChatStore = create((set, get) => ({
//   messages: [],
//   users: [],
//   selectedUser: null,
//   isUsersLoading: false,
//   isMessagesLoading: false,

//   getUsers: async () => {
//     set({ isUsersLoading: true });
//     try {
//       const token = localStorage.getItem("token"); // Retrieve token from localStorage or your preferred storage
//       const res = await axios.get("/message/users", {
//         headers: {
//           Authorization: `Bearer ${token}`, // Include token in the Authorization header
//         },
//       });
//       set({ users: res.data });
//     } catch (error) {
//       toast.error(error.response?.data?.message || "Failed to load users");
//     } finally {
//       set({ isUsersLoading: false });
//     }
//   },

//   getMessages: async (userId) => {
//     set({ isMessagesLoading: true });
//     try {
//       // const token = localStorage.getItem("token");

//       const token = localStorage.getItem("token");
// if (!token) {
//   toast.error("No token found, please log in.");
//   return;
// }

//       const res = await axios.get(`/message/${userId}`, {
//         headers: {
//           Authorization: `Bearer ${token}`,
//         },
//       });
//       set({ messages: res.data });
//       console.log('UserID passed:', userId);  // Check the userId before the API call

//     } catch (error) {
//       toast.error(error.response?.data?.message || "Failed to load messages");
//     } finally {
//       set({ isMessagesLoading: false });
//     }
//   },

//   sendMessage: async (messageData) => {
//     const { selectedUser, messages } = get();
//     try {
//       const token = localStorage.getItem("token");
//       if (!token) {
//         console.error("Token is missing in localStorage");
//         return;
//       }
//       const res = await axios.post(
//         `/message/send/${selectedUser._id}`,
//         messageData,
//         {
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         }
//       );
//       set({ messages: [...messages, res.data] });
//     } catch (error) {
//       toast.error(error.response?.data?.message || "Failed to send message");
//     }
//   },
//   // subscribeToMessages: () => {
//   //   const { selectedUser } = get();
//   //   if (!selectedUser) return;

//   //   const socket = useAuthStore.getState().socket;
//   //   if (!socket) {
//   //     console.error("Socket is not initialized what are you doing");
//   //     return;
//   //   }

//   //   socket.on("newMessage", (newMessage) => {
//   //     const isMessageSentFromSelectedUser = newMessage.senderId === selectedUser._id;
//   //     if (!isMessageSentFromSelectedUser) return;

//   //     set({
//   //       messages: [...get().messages, newMessage],
//   //     });
//   //   });
//   // },

//   subscribeToMessages: () => {
//     const { selectedUser } = get();
//     if (!selectedUser) return;
  
//     const socket = useAuthStore.getState().socket;
//     if (!socket || !socket.connected) {
//       console.error("Socket is not initialized or not connected yet");
//       // Optionally, you can reconnect or retry subscribing after some time
//       setTimeout(get().subscribeToMessages, 1000); // Retry after 1 second (if you prefer automatic retries)
//       return;
//     }
  
//     socket.on("newMessage", (newMessage) => {
//       const isMessageSentFromSelectedUser = newMessage.senderId === selectedUser._id;
//       if (!isMessageSentFromSelectedUser) return;
  
//       set({
//         messages: [...get().messages, newMessage],
//       });
//     });
//   },
  
//   unsubscribeFromMessages: () => {
//     const socket = useAuthStore.getState().socket;
//     socket.off("newMessage");
//   },


//   setSelectedUser: (selectedUser) => set({ selectedUser }),
// }));






















import { create } from "zustand";
import toast from "react-hot-toast";
import axios from "axios";
import { useAuthStore } from "./useAuthStore";

// const { authUser } = useAuthStore.getState();

export const useChatStore = create((set, get) => ({
  messages: [],
  users: [],
  selectedUser: null,
  isUsersLoading: false,
  isMessagesLoading: false,

  getUsers: async () => {
    set({ isUsersLoading: true });
    try {
      const token = localStorage.getItem("token"); // Retrieve token from localStorage or your preferred storage
      const res = await axios.get("/api/message/users", {
        headers: {
          Authorization: `Bearer ${token}`, // Include token in the Authorization header
        },
      });
      set({ users: res.data });
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to load users");
    } finally {
      set({ isUsersLoading: false });
    }
  },

  getMessages: async (userId) => {
    set({ isMessagesLoading: true });
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        toast.error("No token found, please log in.");
        return;
      }

      const res = await axios.get(`/api/message/${userId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      set({ messages: res.data });
      console.log('UserID passed:', userId);  // Check the userId before the API call

    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to load messages");
    } finally {
      set({ isMessagesLoading: false });
    }
  },

  sendMessage: async (messageData) => {
    const { selectedUser, messages } = get();
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        console.error("Token is missing in localStorage");
        return;
      }
      const res = await axios.post(
        `/api/message/send/${selectedUser._id}`,
        messageData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      set({ messages: [...messages, res.data] });
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to send message");
    }
  },

  // subscribeToMessages: () => {
  //   const { selectedUser } = get();
  //   if (!selectedUser) return;
  
  //   const socket = useAuthStore.getState().socket;
    
  //   if (!socket || !socket.connected) {
  //     console.error("Socket is not initialized or not connected yet");
      
  //     return;
  //   }
  //   if (socket || socket.connected) {
  //     console.log("Socket is connected");
      
  //     return;
  //   }
    
  //   socket.on("newMessage", (newMessage) => {
  //     const isMessageSentFromSelectedUser = newMessage.senderId === selectedUser._id;
  //     if (!isMessageSentFromSelectedUser) return;
  
  //     set({
  //       messages: [...get().messages, newMessage],
  //     });
  //   });
  // },

  // In useChatStore.js
// subscribeToMessages: () => {
//   const { selectedUser } = get();
//   const socket = useAuthStore.getState().socket; 
//   const authUser = useAuthStore.getState().authUser;
//   if (!selectedUser) {
//     console.error("selectedUser is missing.");
//     return;
//   }
//   if (!socket || !socket.connected) {
//     console.error("Socket is not connected yet.");
//     return;
//   }

//   console.log("Subscribing to messages for user:", selectedUser._id);

//   // socket.on("newMessage", (newMessage) => {
//   //   // Make sure the message is from the selected user
//   //   if (newMessage.senderId !== selectedUser._id) return;

//   //   set({
//   //     messages: [...get().messages, newMessage],
//   //   });
//   // });
//   socket.on("newMessage", (newMessage) => {
//     const isSenderMe = newMessage.sender === authUser._id || newMessage.senderId === authUser._id;
//     const isReceiverMe = newMessage.receiver === authUser._id || newMessage.receiverId === authUser._id;

//     if (!isSenderMe && !isReceiverMe) return;

//     console.log("📩 Real-time message received:", newMessage);

//     set((state) => ({
//       messages: [...state.messages, newMessage],
//     }));
//   });
// },

subscribeToMessages: () => {
  const { selectedUser } = get();
  const socket = useAuthStore.getState().socket;
  const authUser = useAuthStore.getState().authUser;

  if (!selectedUser || !authUser) {
    console.error("selectedUser or authUser is missing.");
    return;
  }

  if (!socket || !socket.connected) {
    console.error("Socket is not connected yet.");
    return;
  }

  // Avoid attaching multiple listeners
  socket.off("newMessage");

  console.log("✅ Subscribing to real-time messages for user:", selectedUser._id);

  socket.on("newMessage", (newMessage) => {
    const isSenderOrReceiver =
      newMessage.sender === selectedUser._id ||
      newMessage.senderId === selectedUser._id ||
      newMessage.receiver === selectedUser._id ||
      newMessage.receiverId === selectedUser._id;

    if (!isSenderOrReceiver) return;

    console.log("📩 Real-time message received:", newMessage);

    set((state) => ({
      messages: [...state.messages, newMessage],
    }));
  });
},


  
  unsubscribeFromMessages: () => {
    const socket = useAuthStore.getState().socket;
    socket?.off("newMessage");
  },
  

  

  setSelectedUser: (selectedUser) => set({ selectedUser }),
}));

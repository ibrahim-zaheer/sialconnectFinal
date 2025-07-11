// import { create } from "zustand";
// import toast from "react-hot-toast";
// import { io } from "socket.io-client";
// import axios from "axios";
// // import { axiosInstance } from "../lib/axios";

// const BASE_URL =
//   import.meta.env.MODE === "development" ? "http://localhost:5000" : "/";
// export const useAuthStore = create((set, get) => ({
//   authUser: null,
//   isSigningUp: false,
//   isLoggingIn: false,
//   isUpdatingProfile: false,
//   isCheckingAuth: true,
//   onlineUsers: [],
//   socket: null,

  

//   checkAuth: async () => {
//     try {
//       const token = localStorage.getItem("token"); // or wherever the token is stored
//       console.log("Token:", token); // Log token to see if it's retrieved correctly
  
//       // Making the request
//       const res = await axios.get("/api/auth/check", {
//         headers: { Authorization: `Bearer ${token}` },
//       });
  
//       // Log success response
//       console.log("Auth check successful:", res.data);
  
//       set({ authUser: res.data });
  
//       // Now, after the auth check is successful, initialize the socket
//       if (get().authUser) {
//         get().connectSocket();
//       }
      
  
//     } catch (error) {
//       // Log error if request fails
//       console.log("Error in checkAuth:", error);
//       set({ authUser: null });
//     } finally {
//       set({ isCheckingAuth: false });
//     }
//   },
  

//   connectSocket: () => {
//     const { authUser } = get();
//     if (!authUser || get().socket?.connected) return;

//     const socket = io(BASE_URL, {
//       query: {
//         userId: authUser._id,
//       },
//     });
//     socket.connect();

//     set({ socket: socket });

//     socket.on("getOnlineUsers", (userIds) => {
//       set({ onlineUsers: userIds });
//       console.log("List of all Users");
//       console.log("Online users:", userIds);
//     });
//   },
//   disconnectSocket: () => {
//     if (get().socket?.connected) get().socket.disconnect();
//   },
// }));









import { create } from "zustand";
import toast from "react-hot-toast";
import { io } from "socket.io-client";
import axios from "axios";

import { useChatStore } from "./useChatStore"; 


// const BASE_URL =
//   import.meta.env.MODE === "development" ? "http://localhost:5000" : "/";

const BASE_URL = import.meta.env.MODE === "development"
  ? import.meta.env.VITE_API_URL_LOCAL
  : import.meta.env.VITE_API_URL;
export const useAuthStore = create((set, get) => ({
  authUser: null,
  isSigningUp: false,
  isLoggingIn: false,
  isUpdatingProfile: false,
  isCheckingAuth: true,
  onlineUsers: [],
  socket: null,


  checkAuth: async () => {
    try {
      const token = localStorage.getItem("token"); 
      console.log("Token:", token);
  
      const res = await axios.get("/api/auth/check", {
        headers: { Authorization: `Bearer ${token}` },
      });
      console.log("Auth check successful:", res.data);
  
      set({ authUser: res.data });
  
      // // Ensure socket is connected right after authentication
      // get().connectSocket(); // Move the socket connection outside of the condition
      // Ensure authUser exists before connecting the socket
    get().connectSocket();
  
    } catch (error) {
      console.log("Error in checkAuth:", error);
      set({ authUser: null });
    } finally {
      set({ isCheckingAuth: false });
    }
  },
  
  // connectSocket: () => {
  //   const { authUser, socket } = get();
  //   if (!authUser || (socket && socket.connected)) return; // Check if socket is already connected
  
  //   const socketInstance = io(BASE_URL, {
  //     query: {
  //       userId: authUser._id,
  //     },
  //   });
  
  //   socketInstance.connect();
  //   set({ socket: socketInstance });
  
  //   socketInstance.on("getOnlineUsers", (userIds) => {
  //     set({ onlineUsers: userIds });
  //     console.log("Online users:", userIds);
  //   });

  //   socketInstance.on("connect", () => {
  //     console.log("Socket connected:", socketInstance.id); // Log the socket ID
  //   });
    
  // },
  connectSocket: () => {
    const { authUser } = get();
    if (!authUser || get().socket?.connected) return;

    const socket = io(BASE_URL, {
      query: {
        userId: authUser._id,
      },
    });
    

    set({ socket: socket });
    socket.connect();

    // socket.on("connect", () => {
    //   console.log("Socket connected:", socket.id); // Log the socket ID
    //   toast.success("Socket connected successfully!");
    //   useChatStore.getState().subscribeToMessages(); 
    // });
    socket.on("connect", () => {
      console.log("Socket connected:", socket.id);
      useChatStore.getState().subscribeToMessages(); // ✅ correct
    });
    
    socket.on("getOnlineUsers", (userIds) => {
      set({ onlineUsers: userIds });
    });
  },
    disconnectSocket: () => {
    if (get().socket?.connected) get().socket.disconnect();
  },
  // sendMessage: (receiver, message) => {
  //   const { authUser, socket } = get();
  //   if (!authUser || !socket) return;

  //   socket.emit("sendMessage", { sender: authUser._id, receiver, message });

  //   // Optimistically update the UI
  //   set((state) => ({
  //     messages: [...state.messages, { sender: authUser._id, receiver, message }],
  //   }));
  // },
  sendMessage: (receiver, message) => {
    const { authUser, socket } = get();
    if (!authUser || !socket) return;

    // Optimistic update for real-time experience
    set((state) => ({
      messages: [...state.messages, { sender: authUser._id, receiver, message }],
    }));

    socket.emit("sendMessage", { sender: authUser._id, receiver, message });
},

}));
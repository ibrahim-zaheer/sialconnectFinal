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




import { create } from "zustand";
import toast from "react-hot-toast";
import axios from "axios";


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
      const res = await axios.get("/message/users", {
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
      const res = await axios.get(`/message/${userId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      set({ messages: res.data });
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
      const res = await axios.post(
        `/message/send/${selectedUser._id}`,
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

  setSelectedUser: (selectedUser) => set({ selectedUser }),
}));

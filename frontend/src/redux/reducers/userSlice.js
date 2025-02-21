import { createSlice } from '@reduxjs/toolkit';

// Load initial user data from localStorage, if available
const initialState = JSON.parse(localStorage.getItem("user")) || {id:null, name: '', email: '', role: '', profilePicture: '' };

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.id = action.payload.id
      state.name = action.payload.name;
      state.email = action.payload.email;
      state.role = action.payload.role;
      state.profilePicture = action.payload.profilePicture;


      state.fcmToken = action.payload.fcmToken || '';
    },
    clearUser: (state) => {
      
      state.name = '';
      state.email = '';
      state.role = '';
      state.profilePicture = '';

      state.fcmToken = '';
      localStorage.removeItem("user"); // Clear from localStorage on logout
    },
    updateProfilePicture: (state, action) => {
      state.profilePicture = action.payload; // Update profile picture with the new URL
    },
    changerole:(state,action)=>{
     state.role = action.payload;
    },
    updateFcmToken: (state, action) => {
      state.fcmToken = action.payload;
      localStorage.setItem("user", JSON.stringify(state)); // Update localStorage with the new token
    },

  },
});

// Create a selector to access the user data from Redux store
export const selectUser = (state) => state.user;

export const { setUser, clearUser, updateProfilePicture,changerole,updateFcmToken } = userSlice.actions;
export default userSlice.reducer;

import { createSlice } from '@reduxjs/toolkit';

// Load initial user data from localStorage, if available
const initialState = JSON.parse(localStorage.getItem("user")) || { name: '', email: '', role: '', profilePicture: '' };

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.name = action.payload.name;
      state.email = action.payload.email;
      state.role = action.payload.role;
      state.profilePicture = action.payload.profilePicture;
    },
    clearUser: (state) => {
      state.name = '';
      state.email = '';
      state.role = '';
      state.profilePicture = '';
      localStorage.removeItem("user"); // Clear from localStorage on logout
    },
    updateProfilePicture: (state, action) => {
      state.profilePicture = action.payload; // Update profile picture with the new URL
    },
    changerole:(state,action)=>{
     state.role = action.payload;
    },
  },
});

export const { setUser, clearUser, updateProfilePicture,changerole } = userSlice.actions;
export default userSlice.reducer;

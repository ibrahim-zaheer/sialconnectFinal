// import { createSlice } from '@reduxjs/toolkit';

// // Load initial user data from localStorage, if available
// const initialState = JSON.parse(localStorage.getItem("user")) || {id:null, name: '', email: '', role: '', profilePicture: '' };

// const userSlice = createSlice({
//   name: 'user',
//   initialState,
//   reducers: {
//     setUser: (state, action) => {
//       state.id = action.payload.id
//       state.name = action.payload.name;
//       state.email = action.payload.email;
//       state.role = action.payload.role;
//       state.profilePicture = action.payload.profilePicture;


//       state.fcmToken = action.payload.fcmToken || '';
//     },
//     clearUser: (state) => {
      
//       state.name = '';
//       state.email = '';
//       state.role = '';
//       state.profilePicture = '';

//       state.fcmToken = '';
//       localStorage.removeItem("user"); // Clear from localStorage on logout
//     },
//     updateProfilePicture: (state, action) => {
//       state.profilePicture = action.payload; // Update profile picture with the new URL
//     },
//     changerole:(state,action)=>{
//      state.role = action.payload;
//     },
//     updateFcmToken: (state, action) => {
//       state.fcmToken = action.payload;
//       localStorage.setItem("user", JSON.stringify(state)); // Update localStorage with the new token
//     },

//   },
// });

// // Create a selector to access the user data from Redux store
// export const selectUser = (state) => state.user;

// export const { setUser, clearUser, updateProfilePicture,changerole,updateFcmToken } = userSlice.actions;
// export default userSlice.reducer;




import { createSlice } from '@reduxjs/toolkit';

// Load initial user data from localStorage, if available
const initialState = JSON.parse(localStorage.getItem("user")) || {
  id: null,
  name: '',
  email: '',
  role: '',
  profilePicture: '',
  fcmToken: '',
  city: '',
  cnic: '',
  phoneNumber: '',
  businessName: '',
  businessAddress: '',
  postalCode: '',
  bio: '',
  dateOfBirth:'',
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action) => {
      // Update all fields from the action payload
      state.id = action.payload.id;
      state.name = action.payload.name;
      state.email = action.payload.email;
      state.role = action.payload.role;
      state.profilePicture = action.payload.profilePicture;
      state.fcmToken = action.payload.fcmToken || '';

      // New fields
      state.city = action.payload.city || '';
      state.cnic = action.payload.cnic || '';
      state.phoneNumber = action.payload.phoneNumber || '';
      state.businessName = action.payload.businessName || '';
      state.businessAddress = action.payload.businessAddress || '';
      state.postalCode = action.payload.postalCode || '';
      state.bio = action.payload.bio || '';
      state.dateOfBirth = action.payload.dateOfBirth || '';

      // Save updated user data to localStorage
      localStorage.setItem("user", JSON.stringify(state));
    },
    clearUser: (state) => {
      // Reset all fields to initial state
      state.id = null;
      state.name = '';
      state.email = '';
      state.role = '';
      state.profilePicture = '';
      state.fcmToken = '';
      state.city = '';
      state.cnic = '';
      state.phoneNumber = '';
      state.businessName = '';
      state.businessAddress = '';
      state.postalCode = '';
      state.bio = '';
      state.dateOfBirth = '';

      // Clear from localStorage on logout
      localStorage.removeItem("user");
    },
    updateProfilePicture: (state, action) => {
      state.profilePicture = action.payload; // Update profile picture with the new URL
      localStorage.setItem("user", JSON.stringify(state)); // Update localStorage
    },
    changerole: (state, action) => {
      state.role = action.payload;
      localStorage.setItem("user", JSON.stringify(state)); // Update localStorage
    },
    updateFcmToken: (state, action) => {
      state.fcmToken = action.payload;
      localStorage.setItem("user", JSON.stringify(state)); // Update localStorage
    },
    updateProfile: (state, action) => {
      // Update profile fields
      state.city = action.payload.city || state.city;
      state.cnic = action.payload.cnic || state.cnic;
      state.phoneNumber = action.payload.phoneNumber || state.phoneNumber;
      state.businessName = action.payload.businessName || state.businessName;
      state.businessAddress = action.payload.businessAddress || state.businessAddress;
      state.postalCode = action.payload.postalCode || state.postalCode;
      state.bio = action.payload.bio || state.bio;
    state. dateOfBirth = action.payload.dateOfBirth || state.dateOfBirth;

      // Save updated user data to localStorage
      localStorage.setItem("user", JSON.stringify(state));
    },
  },
});

// Create a selector to access the user data from Redux store
export const selectUser = (state) => state.user;

export const {
  setUser,
  clearUser,
  updateProfilePicture,
  changerole,
  updateFcmToken,
  updateProfile, // New action for updating profile fields
} = userSlice.actions;

export default userSlice.reducer;